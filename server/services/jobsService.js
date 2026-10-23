const { db } = require('../firebase-admin');
const fs = require('fs');
const path = require('path');

const JOBS_CACHE_DOC = db.collection('jobs').doc('cache');
const LOCAL_JOBS_CACHE_PATH = path.join(__dirname, '../cache/jobs-cache.json');

// In-memory cache for jobs to protect Firestore quota
let inMemoryJobsCache = null;
let lastJobsFetchTime = 0;
const JOBS_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function setInMemoryJobsCache(data) {
  if (data && typeof data === 'object') {
    inMemoryJobsCache = data;
    lastJobsFetchTime = Date.now();
    try {
      const cacheDir = path.dirname(LOCAL_JOBS_CACHE_PATH);
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      fs.writeFileSync(LOCAL_JOBS_CACHE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (_) {}
  }
}

function getMemoryJobsCache() {
  return inMemoryJobsCache;
}

function getFallbackJobs() {
  return [
    {
      id: "cg_vyapam_sample_job",
      title: "Chhattisgarh Vyapam Patwari & Revenue Inspector Recruitment 2026",
      title_hi: "छत्तीसगढ़ व्यापम पटवारी एवं राजस्व निरीक्षक भर्ती 2026",
      category: "jobs",
      department: "CG Revenue & Disaster Management Department",
      totalPosts: "350 Posts",
      qualification: "Graduate + DCA / PGDCA",
      qualification_hi: "मान्यता प्राप्त विश्वविद्यालय से स्नातक + 1 वर्षीय कंप्यूटर डिप्लोमा",
      lastDate: "2026-10-15",
      salary: "Level 6 (₹25,300 - ₹80,500)",
      ageLimit: "18 to 35/40 Years",
      fee: "Exempted for CG State Residents",
      selectionProcess: "Written OMR Exam -> Document Verification",
      details: "Official notification for Patwari and Revenue Inspector vacancies across districts in Chhattisgarh.",
      source: "CG Vyapam",
      url: "https://vyapam.cgstate.gov.in"
    }
  ];
}

/**
 * Reads cached jobs from memory/Firestore.
 */
async function getCachedJobs(forceRefresh = false) {
  const now = Date.now();

  // 1. Return in-memory cache if fresh
  if (!forceRefresh && inMemoryJobsCache && (now - lastJobsFetchTime < JOBS_CACHE_TTL_MS)) {
    return inMemoryJobsCache;
  }

  // 2. Try Firestore jobs cache doc
  try {
    const firestorePromise = JOBS_CACHE_DOC.get();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firestore read timeout')), 3000)
    );

    const doc = await Promise.race([firestorePromise, timeoutPromise]);
    if (doc && doc.exists && doc.data()?.articles?.length > 0) {
      const data = doc.data();
      setInMemoryJobsCache(data);
      return data;
    }
  } catch (err) {
    const isQuota = err.message && (err.message.includes('RESOURCE_EXHAUSTED') || err.message.includes('Quota exceeded') || err.code === 8);
    if (isQuota) {
      console.warn('[Jobs Quota Shield] Firestore quota exceeded. Using in-memory/disk cache.');
    } else {
      console.error('[JobsService] Error reading Firestore cache:', err.message);
    }
  }

  // 3. Fallback to existing in-memory cache
  if (inMemoryJobsCache && Array.isArray(inMemoryJobsCache.articles) && inMemoryJobsCache.articles.length > 0) {
    return inMemoryJobsCache;
  }

  // 4. Fallback to local disk cache
  try {
    if (fs.existsSync(LOCAL_JOBS_CACHE_PATH)) {
      const raw = fs.readFileSync(LOCAL_JOBS_CACHE_PATH, 'utf-8');
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.articles) && data.articles.length > 0) {
        setInMemoryJobsCache(data);
        return data;
      }
    }
  } catch (fsErr) {
    console.error('[JobsService] Error reading local disk cache fallback:', fsErr.message);
  }

  return { lastUpdated: null, articles: getFallbackJobs() };
}

/**
 * Recompiles jobs cache from 'job_alerts' collection in Firestore and memory
 */
async function updateJobsCacheInFirestore() {
  try {
    const timestamp = new Date().toISOString();
    let allStored = [];
    try {
      const snap = await db.collection('job_alerts').orderBy('createdAt', 'desc').limit(300).get();
      allStored = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (readErr) {
      console.warn('[Update Jobs Cache Firestore read fail]:', readErr.message);
    }

    allStored.sort((a, b) => {
      const dateA = a.lastDate || a.pubDate || a.date || '';
      const dateB = b.lastDate || b.pubDate || b.date || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      const createA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime()) : 0;
      const createB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime()) : 0;
      return createB - createA;
    });

    const cacheArticles = allStored.map(art => ({
      ...art,
      category: 'jobs',
      date: art.date || art.pubDate || timestamp.split('T')[0],
      pubDate: art.pubDate || art.date || timestamp.split('T')[0]
    }));

    const cacheData = {
      lastUpdated: timestamp,
      totalArticles: cacheArticles.length,
      articles: cacheArticles
    };

    setInMemoryJobsCache(cacheData);

    try {
      await JOBS_CACHE_DOC.set(cacheData);
    } catch (writeErr) {
      console.warn('[Update Jobs Cache Firestore write fail]:', writeErr.message);
    }

    return cacheData;
  } catch (err) {
    console.error('[Update Jobs Cache Error]:', err.message);
  }
}

module.exports = {
  getCachedJobs,
  setInMemoryJobsCache,
  getMemoryJobsCache,
  getFallbackJobs,
  updateJobsCacheInFirestore
};
