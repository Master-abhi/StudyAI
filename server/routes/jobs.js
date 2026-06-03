const express = require('express');
const router = express.Router();
const { db } = require('../firebase-admin');
const { scrapeAllJobs } = require('../services/jobScraper');
const { verifyAdmin } = require('../middleware/verifyFirebaseToken');

/**
 * Middleware: Verify request secret or check if user is an admin.
 */
async function verifyAdminOrRefreshSecret(req, res, next) {
  const configuredSecret = process.env.NEWS_REFRESH_SECRET;
  const providedSecret = req.get('x-refresh-secret');

  if (providedSecret && configuredSecret && providedSecret === configuredSecret) {
    return next();
  }
  
  if (!configuredSecret && process.env.NODE_ENV !== 'production' && providedSecret) {
    return next();
  }

  // Fallback to checking Firebase Admin ID Token
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return verifyAdmin(req, res, next);
  }

  return res.status(401).json({ error: 'Unauthorized: Access denied' });
}

// GET /api/jobs - fetch jobs with category and state filters, pagination, and sorting
router.get('/', async (req, res) => {
  try {
    const { category, state, limit = 20, lastDocId } = req.query;

    // Fetch the most recent jobs
    const snap = await db.collection('jobs').orderBy('scrapedAt', 'desc').limit(300).get();
    let jobs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Apply filtering in memory
    if (category && category !== 'all') {
      jobs = jobs.filter(j => j.category === category);
    }
    if (state && state !== 'all') {
      jobs = jobs.filter(j => j.state === state);
    }

    // Pagination in memory
    let startIndex = 0;
    if (lastDocId) {
      const idx = jobs.findIndex(j => j.id === lastDocId);
      if (idx !== -1) {
        startIndex = idx + 1;
      }
    }

    const limitNum = parseInt(limit, 10) || 20;
    const paginatedJobs = jobs.slice(startIndex, startIndex + limitNum);

    res.json({
      totalJobs: jobs.length,
      jobs: paginatedJobs,
      lastDocId: paginatedJobs.length > 0 ? paginatedJobs[paginatedJobs.length - 1].id : null
    });
  } catch (err) {
    console.error('[Jobs Route Error]:', err.message);
    
    // Fallback if orderBy fails due to Firestore indexes
    try {
      const snap = await db.collection('jobs').limit(300).get();
      let jobs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      jobs.sort((a, b) => new Date(b.scrapedAt || 0) - new Date(a.scrapedAt || 0));

      if (category && category !== 'all') {
        jobs = jobs.filter(j => j.category === category);
      }
      if (state && state !== 'all') {
        jobs = jobs.filter(j => j.state === state);
      }

      let startIndex = 0;
      if (lastDocId) {
        const idx = jobs.findIndex(j => j.id === lastDocId);
        if (idx !== -1) {
          startIndex = idx + 1;
        }
      }

      const limitNum = parseInt(limit, 10) || 20;
      const paginatedJobs = jobs.slice(startIndex, startIndex + limitNum);

      res.json({
        totalJobs: jobs.length,
        jobs: paginatedJobs,
        lastDocId: paginatedJobs.length > 0 ? paginatedJobs[paginatedJobs.length - 1].id : null
      });
    } catch (fallbackErr) {
      console.error('[Jobs Fallback Error]:', fallbackErr.message);
      res.status(500).json({ error: 'Failed to fetch jobs.' });
    }
  }
});

// POST /api/jobs/refresh - trigger jobs scraping
router.post('/refresh', verifyAdminOrRefreshSecret, async (req, res) => {
  try {
    const jobs = await scrapeAllJobs();
    res.json({
      success: true,
      message: 'Jobs refreshed successfully',
      totalScraped: jobs.length
    });
  } catch (err) {
    console.error('[Jobs Refresh Route Error]:', err.message);
    res.status(500).json({ error: 'Failed to refresh jobs.' });
  }
});

module.exports = router;
