const express = require('express');
const router = express.Router();
const ytSearch = require('yt-search');
const { db } = require('../firebase-admin');
const { summarizeTopicExtracted, summarizeVideoTranscript } = require('../services/aiManager');

const MATERIALS_COL = db.collection('materials');

// Route: Get notes on a specific topic using admin uploaded materials
router.post('/topic-notes', async (req, res) => {
  try {
    const { topicName, language } = req.body;
    if (!topicName) return res.status(400).json({ error: 'Topic name required' });

    // Fetch study/syllabus materials from Firestore
    const snapshot = await MATERIALS_COL
      .where('type', 'in', ['study', 'syllabus'])
      .get();

    if (snapshot.empty) {
      return res.json({ notes: 'No study materials uploaded by Admin yet.' });
    }

    const allText = snapshot.docs
      .map(doc => doc.data().extractedText || '')
      .join('\n\n')
      .substring(0, 20000);

    const summary = await summarizeTopicExtracted(topicName, allText, language || 'english');
    res.json({ notes: summary });
  } catch (err) {
    console.error('[Study Notes Error]:', err.message);
    res.status(500).json({ error: 'Failed to generate topics notes.' });
  }
});

// Route: Search Youtube and summarize video
router.post('/youtube-learn', async (req, res) => {
  try {
    const { topicName, language } = req.body;
    if (!topicName) return res.status(400).json({ error: 'Topic name required' });

    // 1. Search YouTube
    const searchResult = await ytSearch(topicName + ' educational explainer ' + (language === 'hindi' ? 'in hindi' : ''));
    const videos = searchResult.videos.slice(0, 1);

    if (videos.length === 0) {
      return res.json({ error: 'No relevant YouTube videos found.' });
    }

    const video = videos[0];

    // 2. Fetch Transcript
    let transcriptText = '';
    try {
      const ytTransMod = await import('youtube-transcript');
      const YoutubeTranscript = ytTransMod.YoutubeTranscript;
      const transcript = await YoutubeTranscript.fetchTranscript(video.url);
      transcriptText = transcript.map(t => t.text).join(' ');
    } catch (e) {
      console.warn('[YouTube Transcript API failed] falling back to description', e.message);
      transcriptText = `Title: ${video.title}\nDescription: ${video.description}`;
    }

    // 3. Summarize using AI
    const summary = await summarizeVideoTranscript(topicName, transcriptText, language || 'english');

    res.json({
      videoInfo: { title: video.title, url: video.url, thumbnail: video.image },
      summary
    });
  } catch (err) {
    console.error('[YouTube Learn Error]:', err.message);
    res.status(500).json({ error: 'Failed to generate YouTube video summary.' });
  }
});

module.exports = router;
