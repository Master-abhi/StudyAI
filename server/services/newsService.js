const { db } = require('../firebase-admin');
const fs = require('fs');
const path = require('path');

const NEWS_DOC = db.collection('news').doc('cache');
const LOCAL_CACHE_PATH = path.join(__dirname, '../cache/news-cache.json');

// In-Memory cache to shield Firestore from 50k daily read limit exhaustion
let inMemoryNewsCache = null;
let lastNewsFetchTime = 0;
const NEWS_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache in memory

// Immediately load disk cache on module startup so cold starts are never empty
try {
  if (fs.existsSync(LOCAL_CACHE_PATH)) {
    const raw = fs.readFileSync(LOCAL_CACHE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.articles) && parsed.articles.length > 0) {
      inMemoryNewsCache = parsed;
      lastNewsFetchTime = Date.now();
      console.log(`[NewsService] Preloaded ${parsed.articles.length} news articles from local disk cache ✅`);
    }
  }
} catch (loadErr) {
  console.warn('[NewsService] Initial disk cache load error:', loadErr.message);
}

function setInMemoryNewsCache(data) {
  if (data && typeof data === 'object') {
    inMemoryNewsCache = data;
    lastNewsFetchTime = Date.now();
    try {
      const cacheDir = path.dirname(LOCAL_CACHE_PATH);
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      fs.writeFileSync(LOCAL_CACHE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (_) {}
  }
}

function getMemoryNewsCache() {
  return inMemoryNewsCache;
}

function getFallbackNews() {
  // If local disk cache is available, return its articles as fallback
  try {
    if (fs.existsSync(LOCAL_CACHE_PATH)) {
      const raw = fs.readFileSync(LOCAL_CACHE_PATH, 'utf-8');
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.articles) && data.articles.length > 0) {
        return data.articles;
      }
    }
  } catch (_) {}

  return [
    {
      title: "Chhattisgarh Government Launches Month-Long Seva Sankalp Abhiyan Across All Districts",
      title_hi: "छत्तीसगढ़ सरकार ने सभी जिलों में महीने भर चलने वाले 'सेवा संकल्प अभियान' का किया शुभारंभ",
      description: "State-wide public grievance redressal and welfare saturation mission initiated across all 33 districts.",
      category: "governance",
      source: "DPR Chhattisgarh",
      url: "https://dprcg.gov.in",
      date: new Date().toISOString().split('T')[0],
      icon: "🏛️",
      lang: "hi"
    }
  ];
}

/**
 * Reads cached news from memory/Firestore.
 * Prioritizes in-memory cache to prevent burning Firestore read quota.
 */
async function getCachedNews(forceRefresh = false) {
  const now = Date.now();

  // 1. Return in-memory cache if valid (avoids Firestore read completely)
  if (!forceRefresh && inMemoryNewsCache && (now - lastNewsFetchTime < NEWS_CACHE_TTL_MS)) {
    return inMemoryNewsCache;
  }

  // 2. Fetch from Firestore with timeout
  try {
    const firestorePromise = NEWS_DOC.get();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firestore read timeout')), 8000)
    );

    const doc = await Promise.race([firestorePromise, timeoutPromise]);
    if (doc && doc.exists && doc.data()?.articles?.length > 0) {
      const data = doc.data();
      // Ensure only news articles (no jobs) in news cache
      if (Array.isArray(data.articles)) {
        data.articles = data.articles.filter(a => {
          const c = (a.category || '').toLowerCase();
          return c !== 'jobs' && c !== 'job' && c !== 'job_alert' && c !== 'recruitment';
        });
      }
      setInMemoryNewsCache(data);
      return data;
    }
  } catch (err) {
    const isQuota = err.message && (err.message.includes('RESOURCE_EXHAUSTED') || err.message.includes('Quota exceeded') || err.code === 8);
    if (isQuota) {
      console.warn('[News Quota Shield] Firestore quota exceeded. Using in-memory/disk cache.');
    } else {
      console.error('[NewsService] Error reading Firestore cache:', err.message);
    }
  }

  // 3. Fallback to existing in-memory cache even if older than TTL
  if (inMemoryNewsCache && Array.isArray(inMemoryNewsCache.articles) && inMemoryNewsCache.articles.length > 0) {
    return inMemoryNewsCache;
  }

  // 4. Fallback to local disk cache if Firestore quota is exceeded
  try {
    if (fs.existsSync(LOCAL_CACHE_PATH)) {
      const raw = fs.readFileSync(LOCAL_CACHE_PATH, 'utf-8');
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.articles) && data.articles.length > 0) {
        setInMemoryNewsCache(data);
        return data;
      }
    }
  } catch (fsErr) {
    console.error('[NewsService] Error reading local disk cache fallback:', fsErr.message);
  }

  return { lastUpdated: null, articles: getFallbackNews() };
}

/**
 * Recompiles news cache in Firestore and memory
 */
async function updateNewsCacheInFirestore() {
  try {
    const timestamp = new Date().toISOString();
    let allStored = [];
    try {
      const snap = await db.collection('news_articles').orderBy('createdAt', 'desc').limit(500).get();
      allStored = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (readErr) {
      console.warn('[Update News Cache Firestore read fail]:', readErr.message);
    }

    // Merge with any existing in-memory / local disk cache articles to prevent dropping
    if (inMemoryNewsCache && Array.isArray(inMemoryNewsCache.articles)) {
      const existingMap = new Map();
      allStored.forEach(a => existingMap.set(a.id || a.url || a.title, a));
      inMemoryNewsCache.articles.forEach(a => {
        const key = a.id || a.url || a.title;
        if (!existingMap.has(key)) {
          allStored.push(a);
          existingMap.set(key, a);
        }
      });
    }

    // Filter out any accidentally mixed job articles
    allStored = allStored.filter(a => {
      const c = (a.category || '').toLowerCase();
      return c !== 'jobs' && c !== 'job' && c !== 'job_alert' && c !== 'recruitment';
    });

    allStored.sort((a, b) => {
      const dateA = a.pubDate || a.date || '';
      const dateB = b.pubDate || b.date || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      const createA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime()) : 0;
      const createB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime()) : 0;
      return createB - createA;
    });

    // Clean up redundant fields so each article stays compact and hundreds fit cleanly
    const cleanedArticles = allStored.map(art => ({
      id: art.id,
      title: art.title,
      title_hi: art.title_hi || art.title,
      description: art.description || art.summary || '',
      description_hi: art.description_hi || art.summary_hi || '',
      summary: art.summary || art.description || '',
      summary_hi: art.summary_hi || art.description_hi || '',
      history: art.history || art.historicalContext || '',
      history_hi: art.history_hi || art.historicalContext_hi || '',
      source: art.source || 'News',
      category: art.category || 'general',
      state: art.state || 'CG',
      pubDate: art.pubDate || art.date || timestamp.split('T')[0],
      date: art.date || art.pubDate || timestamp.split('T')[0],
      url: art.url || '',
      examRelevance: art.examRelevance || true,
      icon: art.icon || '📰',
      lang: art.lang || 'hi',
      intelligence: art.intelligence || null,
      createdAt: art.createdAt || null
    }));

    // In-memory and local disk cache holds ALL articles without any 50-article cap
    const fullCacheData = {
      lastUpdated: timestamp,
      totalArticles: cleanedArticles.length,
      articles: cleanedArticles
    };
    setInMemoryNewsCache(fullCacheData);

    // Prepare Firestore cache doc ensuring it never exceeds Firestore 1MB binary limit
    // Full intelligence for every article is stored in news_intelligence collection & local disk cache
    let firestoreArticles = cleanedArticles.map((art, idx) => {
      if (idx >= 25 && art.intelligence) {
        const { intelligence, ...rest } = art;
        return rest;
      }
      return art;
    });

    while (JSON.stringify({ lastUpdated: timestamp, articles: firestoreArticles }).length > 700000 && firestoreArticles.length > 50) {
      firestoreArticles = firestoreArticles.slice(0, firestoreArticles.length - 10);
    }

    const firestoreCacheData = {
      lastUpdated: timestamp,
      totalArticles: firestoreArticles.length,
      articles: firestoreArticles
    };

    try {
      await NEWS_DOC.set(firestoreCacheData);
    } catch (writeErr) {
      console.warn('[Update News Cache Firestore write fail]:', writeErr.message);
    }

    return fullCacheData;
  } catch (err) {
    console.error('[Update News Cache Error]:', err.message);
  }
}

module.exports = {
  getCachedNews,
  setInMemoryNewsCache,
  getMemoryNewsCache,
  getFallbackNews,
  updateNewsCacheInFirestore
};
