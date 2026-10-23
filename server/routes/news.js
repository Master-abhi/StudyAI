const express = require('express');
const router = express.Router();
const { getCachedNews } = require('../services/newsService');
const ai = require('../services/aiManager');
const { admin, db } = require('../firebase-admin');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');
const crypto = require('crypto');

function verifyRefreshSecret(req, res, next) {
  const configuredSecret = process.env.NEWS_REFRESH_SECRET;
  const providedSecret = req.get('x-refresh-secret');

  if (!configuredSecret && process.env.NODE_ENV !== 'production') {
    return next();
  }

  if (!configuredSecret) {
    return res.status(503).json({ error: 'News refresh secret is not configured' });
  }

  if (providedSecret !== configuredSecret) {
    return res.status(401).json({ error: 'Unauthorized: Invalid refresh secret' });
  }

  next();
}

// In-memory caches to prevent burning Firestore 50k reads quota
const intelligenceMemoryCache = new Map();
const userRecsCache = new Map();       // userId -> { articles, timestamp }
const userAnalyticsCache = new Map();  // userId -> { data, timestamp }

// GET /api/news — reads cache from memory/Firestore with CDN edge caching
router.get('/', async (req, res) => {
  try {
    const { category, includeJobs, admin: isAdminView } = req.query;

    if (isAdminView === 'true') {
      let adminArticles = [];
      try {
        const snap = await db.collection('news_articles').orderBy('createdAt', 'desc').limit(500).get();
        adminArticles = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (dbErr) {
        console.warn('[Admin News DB read fail]:', dbErr.message);
      }
      if (!adminArticles || adminArticles.length === 0) {
        const cached = await getCachedNews(true);
        adminArticles = cached.articles || [];
      }
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.json({
        lastUpdated: new Date().toISOString(),
        totalArticles: adminArticles.length,
        articles: adminArticles
      });
    }

    const cached = await getCachedNews(false);
    let articles = cached.articles || [];

    const isJobCategory = (cat) => {
      const c = (cat || '').toLowerCase();
      return c === 'jobs' || c === 'job' || c === 'job_alert' || c === 'recruitment';
    };

    const isStructuredJob = (a) => {
      const title = (a.title || '').toLowerCase() + ' ' + (a.title_hi || '').toLowerCase();
      if (title.includes('एसबीआई क्लर्क') || title.includes('बिहान') || title.includes('sbi clerk') || title.includes('bihan')) {
        return false;
      }
      return Boolean(
        a.department || a.dept || a.organization || a.board || a.totalPosts || a.posts || a.vacancies || a.qualification || a.eligibility || a.lastDate || a.salary || a.details
      );
    };

    if (category && category !== 'all') {
      articles = articles.filter(a => {
        const catMatch = (a.category || '').toLowerCase() === category.toLowerCase();
        if (category.toLowerCase() === 'jobs') {
          return catMatch && isStructuredJob(a);
        }
        return catMatch;
      });
    } else if (includeJobs !== 'true') {
      articles = articles.filter(a => !isJobCategory(a.category));
    }

    // Set Edge CDN and Browser caching headers to shield Firestore
    if (isAdminView === 'true' || articles.length <= 1) {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else {
      res.set('Cache-Control', 'public, max-age=60, s-maxage=120, stale-while-revalidate=300');
    }

    res.json({
      lastUpdated: cached.lastUpdated,
      totalArticles: articles.length,
      articles
    });
  } catch (err) {
    console.error('[News Error]:', err.message);
    const fallback = getCachedNews ? (await getCachedNews().catch(() => ({ articles: [] }))) : { articles: [] };
    res.set('Cache-Control', 'no-cache');
    res.json({
      lastUpdated: null,
      totalArticles: (fallback.articles || []).length,
      articles: fallback.articles || []
    });
  }
});

// GET /api/news/intelligence — reads or generates AI news intelligence (cached)
router.get('/intelligence', async (req, res) => {
  try {
    const { title, description, category, source } = req.query;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const docId = crypto.createHash('md5').update(title).digest('hex');

    // 1. Check in-memory cache first
    if (intelligenceMemoryCache.has(docId)) {
      res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      return res.json(intelligenceMemoryCache.get(docId));
    }

    const docRef = db.collection('news_intelligence').doc(docId);
    
    let existingData = null;
    try {
      const doc = await docRef.get();
      if (doc.exists) {
        existingData = doc.data();
      }
    } catch (readErr) {
      console.warn('[News Intelligence Firestore read fail (quota?)]:', readErr.message);
    }

    if (existingData) {
      intelligenceMemoryCache.set(docId, existingData);
      res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      return res.json(existingData);
    }

    console.log(`[News Intelligence] Generating intelligence for: ${title}`);
    const intel = await ai.generateNewsIntelligence(title, description, category, source);

    const fullIntel = {
      ...intel,
      title,
      description: description || '',
      source: source || 'Google News',
      category: category || 'affairs',
      createdAt: new Date().toISOString()
    };

    intelligenceMemoryCache.set(docId, fullIntel);

    try {
      await docRef.set(fullIntel);
    } catch (writeErr) {
      console.warn('[News Intelligence Firestore write fail]:', writeErr.message);
    }

    res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.json(fullIntel);
  } catch (err) {
    console.error('[News Intelligence Error]:', err.message);
    res.status(500).json({ error: 'Failed to generate news intelligence' });
  }
});

// GET /api/news/recommended — returns ranked news based on weak areas & exam (cached per user)
router.get('/recommended', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const now = Date.now();

    const cached = await getCachedNews();
    let articles = (cached.articles || []).filter(a => {
      const c = (a.category || '').toLowerCase();
      return c !== 'jobs' && c !== 'job' && c !== 'job_alert' && c !== 'recruitment';
    });

    // Check user recommendations cache (10 min TTL, but invalidate if article pool changed or was a 1-article glitch)
    if (userRecsCache.has(userId)) {
      const entry = userRecsCache.get(userId);
      if (now - entry.timestamp < 10 * 60 * 1000 && entry.articles && entry.articles.length >= articles.length && entry.articles.length > 1) {
        res.set('Cache-Control', 'private, max-age=120');
        return res.json({ articles: entry.articles });
      }
    }

    let user = {};
    const weakSubjects = new Set();
    
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (userDoc.exists) user = userDoc.data();

      const weakTopicsSnap = await db.collection('topic_mastery')
        .where('userId', '==', userId)
        .where('status', '==', 'Weak Area')
        .get();
      
      weakTopicsSnap.docs.forEach(doc => {
        const data = doc.data();
        if (data.subjectId) weakSubjects.add(data.subjectId.toLowerCase());
      });
    } catch (dbErr) {
      console.warn('[News Recommended Firestore query fail]:', dbErr.message);
    }

    const targetExam = (user.targetExam || 'cgpsc').toLowerCase();

    const categoryToSubjectMap = {
      'polity': ['polity', 'indian constitution'],
      'economy': ['economy', 'budget', 'reports & indexes'],
      'budget': ['economy', 'budget'],
      'agriculture': ['agriculture', 'geography'],
      'environment': ['environment', 'science & technology', 'geography'],
      'science & technology': ['science & technology', 'general science'],
      'chhattisgarh': ['chhattisgarh gk', 'chhattisgarh history', 'chhattisgarh geography', 'chhattisgarh administration'],
      'chhattisgarh current affairs': ['chhattisgarh gk', 'chhattisgarh history', 'chhattisgarh geography', 'chhattisgarh administration']
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const scoredArticles = articles.map(art => {
      let relevanceScore = 50;
      const artCat = (art.category || '').toLowerCase();
      
      if (targetExam.includes('cgpsc') || targetExam.includes('vyapam')) {
        if (artCat === 'chhattisgarh current affairs' || artCat.includes('chhattisgarh') || artCat === 'government schemes' || artCat === 'scheme') {
          relevanceScore += 40;
        }
      }

      for (const [cat, subjs] of Object.entries(categoryToSubjectMap)) {
        if (artCat === cat || artCat.includes(cat)) {
          const matchesWeak = subjs.some(subj => weakSubjects.has(subj));
          if (matchesWeak) {
            relevanceScore += 35;
          }
        }
      }

      // Blended Recency decay / freshness weight
      let recencyWeight = 0;
      if (art.date || art.pubDate) {
        const artDate = new Date(art.date || art.pubDate);
        artDate.setHours(0, 0, 0, 0);
        const diffTime = today.getTime() - artDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) {
          recencyWeight = 100; // Today
        } else if (diffDays === 1) {
          recencyWeight = 85;  // Yesterday
        } else if (diffDays <= 3) {
          recencyWeight = 60;  // 2-3 days old
        } else if (diffDays <= 7) {
          recencyWeight = 30;  // Within a week
        } else if (diffDays > 30) {
          recencyWeight = -100; // Over a month old
        } else if (diffDays > 14) {
          recencyWeight = -40;  // Over 2 weeks old
        }
      }

      const totalScore = relevanceScore + recencyWeight;

      return { 
        ...art, 
        recommendationScore: relevanceScore, 
        totalScore 
      };
    });

    scoredArticles.sort((a, b) => b.totalScore - a.totalScore);
    
    // Cache result in memory
    userRecsCache.set(userId, { articles: scoredArticles, timestamp: now });
    res.set('Cache-Control', 'private, max-age=120');

    res.json({ articles: scoredArticles });
  } catch (err) {
    console.error('[News Recommended Error]:', err.message);
    // Fallback: return unpersonalized news instead of failing
    try {
      const cached = await getCachedNews();
      const articles = (cached.articles || []).filter(a => {
        const c = (a.category || '').toLowerCase();
        return c !== 'jobs' && c !== 'job' && c !== 'job_alert' && c !== 'recruitment';
      });
      res.json({ articles });
    } catch (_) {
      res.json({ articles: [] });
    }
  }
});

// POST /api/news/log-interaction — tracks reader metrics (graceful fallback)
router.post('/log-interaction', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { title, activityType, timeSpentSeconds, mcqScore } = req.body;
    
    if (!title || !activityType) {
      return res.status(400).json({ error: 'Title and activityType are required' });
    }
    
    const articleId = crypto.createHash('md5').update(title).digest('hex');
    
    // Invalidate cached analytics for this user so next fetch is fresh
    userAnalyticsCache.delete(userId);

    try {
      const interactionRef = db.collection('user_current_affairs_interactions').doc();
      await interactionRef.set({
        userId,
        articleId,
        articleTitle: title,
        activityType,
        timeSpentSeconds: parseInt(timeSpentSeconds) || 0,
        mcqScore: mcqScore || null,
        timestamp: new Date().toISOString()
      });
    } catch (writeErr) {
      console.warn('[Log News Interaction Firestore write fail (quota?)]:', writeErr.message);
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error('[Log News Interaction Error]:', err.message);
    res.json({ success: true, savedLocally: true });
  }
});

// GET /api/news/analytics — calculated CA Readiness, Mastery, Retention and Revision Coverage (cached)
router.get('/analytics', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const now = Date.now();

    // Check user analytics in-memory cache (5 min TTL)
    if (userAnalyticsCache.has(userId)) {
      const entry = userAnalyticsCache.get(userId);
      if (now - entry.timestamp < 5 * 60 * 1000) {
        return res.json(entry.data);
      }
    }
    
    let docs = [];
    try {
      const snap = await db.collection('user_current_affairs_interactions')
        .where('userId', '==', userId)
        .get();
      docs = snap.docs;
    } catch (dbErr) {
      console.warn('[News Analytics Firestore query fail (quota?)]:', dbErr.message);
    }
      
    const uniqueReads = new Set();
    const uniqueBookmarks = new Set();
    const uniqueFlashcards = new Set();
    const mcqLatestScoreMap = new Map();
    let totalTimeSpent = 0;
    
    docs.forEach(doc => {
      const data = doc.data();
      totalTimeSpent += data.timeSpentSeconds || 0;
      
      const articleKey = data.articleId || data.articleTitle;
      if (!articleKey) return;
      
      if (data.activityType === 'read') {
        uniqueReads.add(articleKey);
      } else if (data.activityType === 'bookmark') {
        uniqueBookmarks.add(articleKey);
      } else if (data.activityType === 'mcq_attempt') {
        let timestampMs = 0;
        if (data.timestamp) {
          if (typeof data.timestamp.toMillis === 'function') {
            timestampMs = data.timestamp.toMillis();
          } else if (data.timestamp.seconds !== undefined) {
            timestampMs = data.timestamp.seconds * 1000;
          } else if (data.timestamp instanceof Date) {
            timestampMs = data.timestamp.getTime();
          } else if (typeof data.timestamp === 'string') {
            timestampMs = Date.parse(data.timestamp) || 0;
          } else if (typeof data.timestamp === 'number') {
            timestampMs = data.timestamp;
          }
        }
        
        const existing = mcqLatestScoreMap.get(articleKey);
        if (!existing || timestampMs > existing.timestampMs) {
          mcqLatestScoreMap.set(articleKey, {
            correct: data.mcqScore?.correct || 0,
            total: data.mcqScore?.total || 0,
            timestampMs
          });
        }
      } else if (data.activityType === 'flashcard_revise') {
        uniqueFlashcards.add(articleKey);
      }
    });
    
    const readCount = uniqueReads.size;
    const bookmarkCount = uniqueBookmarks.size;
    const mcqAttempts = mcqLatestScoreMap.size;
    const flashcardsRevised = uniqueFlashcards.size;
    
    let mcqCorrectSum = 0;
    let mcqTotalSum = 0;
    
    for (const score of mcqLatestScoreMap.values()) {
      mcqCorrectSum += score.correct;
      mcqTotalSum += score.total;
    }
    
    const masteryScore = mcqTotalSum > 0 ? Math.round((mcqCorrectSum / mcqTotalSum) * 100) : 70;
    const retentionScore = Math.min(100, Math.max(30, Math.round(50 + (readCount * 2) + (flashcardsRevised * 5) - (bookmarkCount * 1.5))));
    const revisionCoverageScore = bookmarkCount > 0 ? Math.min(100, Math.round((flashcardsRevised / bookmarkCount) * 100)) : 80;
    const readinessScore = Math.round(0.4 * masteryScore + 0.3 * retentionScore + 0.3 * revisionCoverageScore);
    
    const resultPayload = {
      readCount,
      bookmarkCount,
      mcqAttempts,
      flashcardsRevised,
      totalTimeSpent,
      metrics: {
        masteryScore,
        retentionScore,
        revisionCoverageScore,
        readinessScore
      }
    };

    userAnalyticsCache.set(userId, { data: resultPayload, timestamp: now });
    res.json(resultPayload);
  } catch (err) {
    console.error('[News Analytics Error]:', err.message);
    res.json({
      readCount: 0,
      bookmarkCount: 0,
      mcqAttempts: 0,
      flashcardsRevised: 0,
      totalTimeSpent: 0,
      metrics: {
        masteryScore: 70,
        retentionScore: 60,
        revisionCoverageScore: 80,
        readinessScore: 70
      }
    });
  }
});

// GET /api/news/capsules — divides news into Daily, Weekly, Monthly, and Yearly buckets
router.get('/capsules', async (req, res) => {
  try {
    const cached = await getCachedNews();
    const articles = (cached.articles || []).filter(a => {
      const c = (a.category || '').toLowerCase();
      return c !== 'jobs' && c !== 'job' && c !== 'job_alert' && c !== 'recruitment';
    });
    
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    
    const daily = [];
    const weekly = [];
    const monthly = [];
    
    articles.forEach(art => {
      const artDate = new Date(art.date || new Date());
      const diffDays = Math.round(Math.abs((today - artDate) / oneDay));
      
      if (diffDays <= 1) {
        daily.push(art);
      }
      if (diffDays <= 7) {
        weekly.push(art);
      }
      if (diffDays <= 30) {
        monthly.push(art);
      }
    });
    
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=1200');
    res.json({
      daily,
      weekly,
      monthly,
      yearly: articles
    });
  } catch (err) {
    console.error('[News Capsules Error]:', err.message);
    res.set('Cache-Control', 'public, max-age=60');
    res.json({
      daily: [],
      weekly: [],
      monthly: [],
      yearly: []
    });
  }
});

// POST /api/news/summarize — generates on-the-fly summary of an article
router.post('/summarize', async (req, res) => {
  try {
    const { title, category, source, language } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const summary = await ai.summarizeNews(title, category, source, language);
    res.json({ summary });
  } catch (err) {
    console.error('[News Summarize Error]:', err.message);
    res.status(500).json({ error: 'Failed to generate news summary.' });
  }
});

// POST /api/news/refresh — (Automated Scraper disabled as requested by admin)
router.post('/refresh', verifyRefreshSecret, async (req, res) => {
  res.json({
    message: 'Automated news scraper is disabled. News updates are managed manually via Admin Panel.',
    disabled: true
  });
});

router.clearUserRecsCache = () => {
  userRecsCache.clear();
};

module.exports = router;
