const express = require('express');
const router = express.Router();
const { getCachedNews, scrapeAll } = require('../services/scraper');

// GET /api/news — reads cache from Firestore
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const cached = await getCachedNews(); // now async — reads from Firestore

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

// POST /api/news/refresh — triggers a fresh scrape and updates Firestore
router.post('/refresh', async (req, res) => {
  try {
    const result = await scrapeAll();
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
