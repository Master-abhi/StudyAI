if (typeof global.File === 'undefined') {
  global.File = class File {};
}

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize Firebase Admin SDK at startup
require('./firebase-admin');

const chatRoutes = require('./routes/chat');
const testRoutes = require('./routes/test');
const newsRoutes = require('./routes/news');
const syllabusRoutes = require('./routes/syllabus');
const adminRoutes = require('./routes/admin');
const studyRoutes = require('./routes/study');
// NOTE: auth routes removed — authentication is now handled by Firebase Auth client SDK
const analyticsRoutes = require('./routes/analytics');
const userRoutes = require('./routes/user');

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
app.use('/api/admin', adminRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/user', userRoutes);

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

// Schedule scraper runs via GitHub Action: .github/workflows/refresh-news.yml
// On Vercel (serverless), node-cron does NOT work — the Action calls POST /api/news/refresh

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
