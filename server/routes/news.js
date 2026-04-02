const express = require('express');
const router = express.Router();
const { getCachedNews, scrapeAll } = require('../services/scraper');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const cached = getCachedNews();

    let articles = cached.articles || [];

    if (category && category !== 'all') {
      articles = articles.filter(a => a.category === category);
    }

    res.json({
      lastUpdated: cached.lastUpdated,
      totalArticles: articles.length,
      articles: articles
    });
  } catch (err) {
    console.error('[News Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
});

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
