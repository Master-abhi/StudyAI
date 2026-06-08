const express = require('express');
const router = express.Router();
const { getCachedNews } = require('../services/scraper');
const { scrapeAllNews } = require('../services/newsScraper');
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

// GET /api/news — reads cache from Firestore
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const cached = await getCachedNews();

    let articles = cached.articles || [];

    if (category && category !== 'all') {
      articles = articles.filter(a => a.category === category);
    }

    res.json({
      lastUpdated: cached.lastUpdated,
      totalArticles: articles.length,
      articles
    });
  } catch (err) {
    console.error('[News Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
});

// GET /api/news/intelligence — reads or generates AI news intelligence
router.get('/intelligence', async (req, res) => {
  try {
    const { title, description, category, source } = req.query;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const docId = crypto.createHash('md5').update(title).digest('hex');
    const docRef = db.collection('news_intelligence').doc(docId);
    const doc = await docRef.get();

    if (doc.exists) {
      return res.json(doc.data());
    }

    console.log(`[News Intelligence] Generating intelligence for: ${title}`);
    const intel = await ai.generateNewsIntelligence(title, description, category, source);

    const fullIntel = {
      ...intel,
      title,
      description: description || '',
      source: source || 'Google News',
      category: category || 'affairs',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await docRef.set(fullIntel);
    res.json(fullIntel);
  } catch (err) {
    console.error('[News Intelligence Error]:', err.message);
    res.status(500).json({ error: 'Failed to generate news intelligence' });
  }
});

// GET /api/news/recommended — returns ranked news based on weak areas & exam
router.get('/recommended', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const cached = await getCachedNews();
    let articles = cached.articles || [];

    const userDoc = await db.collection('users').doc(userId).get();
    const user = userDoc.exists ? userDoc.data() : {};
    const targetExam = (user.targetExam || 'cgpsc').toLowerCase();

    const weakTopicsSnap = await db.collection('topic_mastery')
      .where('userId', '==', userId)
      .where('status', '==', 'Weak Area')
      .get();
    
    const weakSubjects = new Set();
    weakTopicsSnap.docs.forEach(doc => {
      const data = doc.data();
      if (data.subjectId) weakSubjects.add(data.subjectId.toLowerCase());
    });

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
          recencyWeight = -100; // Over a month old (heavily deprioritized)
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
    res.json({ articles: scoredArticles });
  } catch (err) {
    console.error('[News Recommended Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch recommendations.' });
  }
});

// POST /api/news/log-interaction — tracks reader metrics
router.post('/log-interaction', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { title, activityType, timeSpentSeconds, mcqScore } = req.body;
    
    if (!title || !activityType) {
      return res.status(400).json({ error: 'Title and activityType are required' });
    }
    
    const articleId = crypto.createHash('md5').update(title).digest('hex');
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    const interactionRef = db.collection('user_current_affairs_interactions').doc();
    await interactionRef.set({
      userId,
      articleId,
      articleTitle: title,
      activityType,
      timeSpentSeconds: parseInt(timeSpentSeconds) || 0,
      mcqScore: mcqScore || null,
      timestamp
    });
    
    res.json({ success: true });
  } catch (err) {
    console.error('[Log News Interaction Error]:', err.message);
    res.status(500).json({ error: 'Failed to log news interaction.' });
  }
});

// GET /api/news/analytics — calculated CA Readiness, Mastery, Retention and Revision Coverage
router.get('/analytics', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const snap = await db.collection('user_current_affairs_interactions')
      .where('userId', '==', userId)
      .get();
      
    const uniqueReads = new Set();
    const uniqueBookmarks = new Set();
    const uniqueFlashcards = new Set();
    const mcqLatestScoreMap = new Map();
    let totalTimeSpent = 0;
    
    snap.docs.forEach(doc => {
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
    
    res.json({
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
    });
  } catch (err) {
    console.error('[News Analytics Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch news analytics.' });
  }
});

// GET /api/news/capsules — divides news into Daily, Weekly, Monthly, and Yearly buckets
router.get('/capsules', async (req, res) => {
  try {
    const cached = await getCachedNews();
    const articles = cached.articles || [];
    
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
    
    res.json({
      daily,
      weekly,
      monthly,
      yearly: articles
    });
  } catch (err) {
    console.error('[News Capsules Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch news capsules.' });
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

// POST /api/news/refresh — triggers a fresh scrape and updates Firestore
router.post('/refresh', verifyRefreshSecret, async (req, res) => {
  try {
    const result = await scrapeAllNews();
    res.json({
      message: 'News refreshed successfully',
      lastUpdated: result.lastUpdated,
      totalArticles: result.articles.length
    });
  } catch (err) {
    console.error('[News Refresh Error]:', err.message);
    res.status(500).json({ error: 'Failed to refresh news.' });
  }
});

module.exports = router;
