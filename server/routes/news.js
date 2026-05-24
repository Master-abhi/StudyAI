const express = require('express');
const router = express.Router();
const { getCachedNews, scrapeAll } = require('../services/scraper');
const ai = require('../services/aiManager');

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
