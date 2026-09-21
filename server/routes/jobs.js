const express = require('express');
const router = express.Router();
const { db } = require('../firebase-admin');
const { getCachedJobs, setInMemoryJobsCache, updateJobsCacheInFirestore, getFallbackJobs } = require('../services/jobsService');
const { verifyStaffOrAdmin } = require('../middleware/verifyFirebaseToken');

// Helper to assign job priority scores for ordering
function getJobPriority(job) {
  const cat = (job.category || '').toLowerCase();
  const isCG = (cat === 'cgpsc' || cat === 'cgvyapam' || cat === 'chhattisgarh' || job.state === 'CG');
  
  if (isCG) return 5;
  if (cat === 'railway') return 4;
  if (cat === 'banking') return 3;
  if (cat === 'ssc') return 2;
  if (cat === 'upsc') return 1;
  return 0;
}

function isStructuredJob(job) {
  if (!job) return false;
  const title = (job.title || '').toLowerCase() + ' ' + (job.title_hi || '').toLowerCase();
  if (title.includes('एसबीआई क्लर्क') || title.includes('बिहान') || title.includes('sbi clerk') || title.includes('bihan')) {
    return false;
  }
  return Boolean(
    job.department || job.dept || job.organization || job.board || 
    job.totalPosts || job.posts || job.vacancies || job.post || job.total_posts || 
    job.qualification || job.eligibility || job.education || job.qualification_hi || 
    job.lastDate || job.last_date || job.deadline || 
    job.salary || job.payScale || job.pay_scale || job.stipend || 
    job.details || job.job_details
  );
}

// GET /api/jobs - fetch jobs from dedicated jobs database/cache
router.get('/', async (req, res) => {
  try {
    const { category, state, limit = 50, admin: isAdminView } = req.query;

    const cachedData = await getCachedJobs();
    let jobs = Array.isArray(cachedData?.articles) ? cachedData.articles : [];

    // Filter by category
    if (category && category !== 'all' && category !== 'jobs') {
      jobs = jobs.filter(j => (j.category || '').toLowerCase() === category.toLowerCase());
    }

    // Filter by state
    if (state && state !== 'all') {
      jobs = jobs.filter(j => (j.state || 'CG').toLowerCase() === state.toLowerCase());
    }

    // Sort jobs based on custom priority and last date
    jobs.sort((a, b) => {
      const prioA = getJobPriority(a);
      const prioB = getJobPriority(b);
      if (prioA !== prioB) return prioB - prioA;

      const dateA = a.lastDate || a.pubDate || a.date || '';
      const dateB = b.lastDate || b.pubDate || b.date || '';
      if (dateA !== dateB) return dateB.localeCompare(dateA);

      return (b.title || '').localeCompare(a.title || '');
    });

    const limitNum = parseInt(limit, 10) || 50;
    const paginatedJobs = jobs.slice(0, limitNum);

    // Set Edge CDN and Browser caching headers to shield Firestore
    if (isAdminView !== 'true') {
      res.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=1200');
    } else {
      res.set('Cache-Control', 'no-cache');
    }

    res.json({
      lastUpdated: cachedData?.lastUpdated || new Date().toISOString(),
      totalJobs: jobs.length,
      jobs: paginatedJobs,
      articles: paginatedJobs // backwards compatibility with components reading data.articles
    });
  } catch (err) {
    console.error('[Jobs Route Error]:', err.message);
    const fallback = getFallbackJobs();
    res.json({
      lastUpdated: null,
      totalJobs: fallback.length,
      jobs: fallback,
      articles: fallback
    });
  }
});

// GET /api/jobs/:id - fetch single job details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cachedData = await getCachedJobs();
    const jobs = Array.isArray(cachedData?.articles) ? cachedData.articles : [];
    const job = jobs.find(j => j.id === id || j.url === id || j.title === id);

    if (job) {
      return res.json(job);
    }

    // Fallback: check Firestore directly
    const doc = await db.collection('job_alerts').doc(id).get();
    if (doc.exists) {
      return res.json({ id: doc.id, ...doc.data() });
    }

    res.status(404).json({ error: 'Job opening not found' });
  } catch (err) {
    console.error('[Get Job Details Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});

module.exports = router;
