const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const testRoutes = require('./routes/test');
const newsRoutes = require('./routes/news');
const syllabusRoutes = require('./routes/syllabus');
const { scrapeAll } = require('./services/scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/chat', chatRoutes);
app.use('/api/generate-test', testRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/parse-syllabus', syllabusRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your-api-key-here'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.message);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum size is 10MB.' });
  }

  if (err.message && err.message.includes('Only PDF')) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error. Please try again.' });
});

// Schedule scraper to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('[Cron] Running scheduled news scrape...');
  try {
    await scrapeAll();
  } catch (err) {
    console.error('[Cron] Scraper failed:', err);
  }
});

// Run initial scrape on startup if cache is old or missing
setTimeout(async () => {
  try {
    const { getCachedNews } = require('./services/scraper');
    const cached = getCachedNews();
    if (!cached.lastUpdated || (Date.now() - new Date(cached.lastUpdated).getTime() > 2 * 60 * 60 * 1000)) {
       console.log('[Startup] Cache outdated or missing, running initial scrape...');
       await scrapeAll();
    }
  } catch (err) {
    console.error('[Startup] Initial scrape failed:', err);
  }
}, 5000); // Wait 5 seconds after startup

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
