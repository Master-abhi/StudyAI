const express = require('express');
const ytSearch = require('yt-search');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { extractTextFromPDF } = require('../services/syllabusParser');
const { parseSyllabus } = require('../services/aiManager');
const { db } = require('../firebase-admin');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');
const { aiRateLimiter } = require('../middleware/rateLimiter');
const { createSignedPdfUrl } = require('../services/supabaseStorage');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'text/plain', 'text/csv'];
  const allowedExts = ['.pdf', '.txt', '.csv', '.text'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, TXT, and CSV files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/parse', verifyFirebaseToken, aiRateLimiter, upload.single('syllabusFile'), async (req, res) => {
  try {
    let text;

    if (req.file) {
      if (req.file.mimetype === 'application/pdf') {
        console.log(`[Syllabus] Parsing uploaded PDF: ${req.file.originalname}`);
        text = await extractTextFromPDF(req.file.buffer);
      } else {
        text = req.file.buffer.toString('utf-8');
      }
    } else if (req.body.text) {
      text = req.body.text;
    } else {
      return res.status(400).json({ error: 'Please upload a file or provide syllabus text.' });
    }

    const result = await parseSyllabus(text);

    const name = req.body.name || req.file?.originalname?.replace(/\.[^.]+$/, '') || 'Custom Syllabus';

    res.json({
      name: name,
      subjects: result.subjects,
      totalTopics: result.subjects.reduce((sum, s) => sum + s.topics.length, 0)
    });
  } catch (err) {
    console.error('[Syllabus Parse Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to parse syllabus.' });
  }
});

// GET /api/syllabus/custom - Retrieve all custom syllabi stored in Firestore
router.get('/custom', async (req, res) => {
  try {
    const snapshot = await db.collection('syllabi').get();
    const syllabi = [];
    snapshot.forEach(doc => {
      syllabi.push(doc.data());
    });
    res.json(syllabi);
  } catch (err) {
    console.error('[Get Custom Syllabi Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve custom syllabi.' });
  }
});

// GET /api/syllabus/topic-pdf-url - Get time-limited signed URL for a topic PDF (Students must be logged in)
router.get('/topic-pdf-url', verifyFirebaseToken, async (req, res) => {
  try {
    const { examId, topicId } = req.query;
    if (!examId || !topicId) {
      return res.status(400).json({ error: 'examId and topicId are required' });
    }

    // 1. Look up exam in Firestore 'syllabi'
    let docSnap = await db.collection('syllabi').doc(examId).get();
    let examData = docSnap.exists ? docSnap.data() : null;

    // If not found by examId directly, search all custom syllabi for this topicId
    if (!examData) {
      const allSyllabiSnap = await db.collection('syllabi').get();
      allSyllabiSnap.forEach(doc => {
        const d = doc.data();
        if (d && Array.isArray(d.subjects)) {
          for (const sub of d.subjects) {
            if (Array.isArray(sub.chapters)) {
              for (const chap of sub.chapters) {
                if (Array.isArray(chap.topics)) {
                  if (chap.topics.some(t => t.id === topicId)) {
                    examData = d;
                    break;
                  }
                }
              }
            }
          }
        }
      });
    }

    if (!examData) {
      return res.status(404).json({ error: 'Syllabus not found' });
    }
    let targetTopic = null;

    if (Array.isArray(examData.subjects)) {
      for (const sub of examData.subjects) {
        if (Array.isArray(sub.chapters)) {
          for (const chap of sub.chapters) {
            if (Array.isArray(chap.topics)) {
              for (const top of chap.topics) {
                if (top.id === topicId) {
                  targetTopic = top;
                  break;
                }
              }
            }
            if (targetTopic) break;
          }
        }
        if (targetTopic) break;
      }
    }

    if (!targetTopic || !targetTopic.pdfPath) {
      return res.status(404).json({ error: 'No PDF notes attached to this topic yet.' });
    }

    // 2. Generate signed URL from Supabase Storage (valid for 1 hour = 3600 seconds)
    // Short-lived signed URL (5 minutes) for in-app viewing only
    const signedUrl = await createSignedPdfUrl(targetTopic.pdfPath, 300);

    res.json({
      success: true,
      signedUrl,
      pdfName: targetTopic.pdfName || `${targetTopic.name || 'Notes'}.pdf`,
      topicName: targetTopic.nameHi || targetTopic.name,
      expiresIn: 300
    });
  } catch (err) {
    console.error('[Get Topic PDF URL Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to generate secure PDF link.' });
  }
});


// GET /api/syllabus/topic-lectures - Curated precision YouTube search for exact topics
router.get('/topic-lectures', async (req, res) => {
  try {
    const { query, topicName, topicNameHi, subjectName, examName } = req.query;

    // 1. Build hyper-focused exact search terms
    // If the user typed a custom search query, prioritize it
    let primaryQuery = '';
    if (query && query.trim()) {
      primaryQuery = query.trim();
    } else {
      // Prioritize Hindi topic name for CGPSC/State exams, combined with exact topic
      const cleanHi = (topicNameHi || '').trim();
      const cleanEn = (topicName || '').trim();
      const cleanSub = (subjectName || '').trim();

      // Precision structure: "छत्तीसगढ़ का इतिहास" + subject + exam
      const topicPart = cleanHi || cleanEn;
      const subPart = cleanSub && !topicPart.toLowerCase().includes(cleanSub.toLowerCase()) ? cleanSub : '';
      primaryQuery = `${topicPart} ${subPart} class lecture`.trim();
    }

    console.log(`[Syllabus Lectures] Curated Precision Search: "${primaryQuery}"`);

    const searchResult = await ytSearch({ query: primaryQuery, pageStart: 1, pageEnd: 1 });
    let rawVideos = searchResult.videos || [];

    // If query returned few results and we have Hindi/English alternates, try fallback search
    if (rawVideos.length < 3 && topicName && topicNameHi) {
      const altQuery = `${topicName} ${subjectName || ''} lecture`.trim();
      const altResult = await ytSearch({ query: altQuery, pageStart: 1, pageEnd: 1 });
      if (altResult.videos && altResult.videos.length > 0) {
        // Merge without duplicates
        const seenIds = new Set(rawVideos.map(v => v.videoId));
        for (const v of altResult.videos) {
          if (!seenIds.has(v.videoId)) {
            rawVideos.push(v);
            seenIds.add(v.videoId);
          }
        }
      }
    }

    // 2. Curate & Filter Videos:
    // Remove ultra-short shorts (< 60s) unless no long videos exist
    // Score videos based on keyword match in title
    const searchWords = (primaryQuery || '').toLowerCase().split(/\s+/).filter(w => w.length > 2);

    const scoredVideos = rawVideos.map(v => {
      const titleLower = (v.title || '').toLowerCase();
      let score = 0;

      // Check keyword occurrences
      searchWords.forEach(w => {
        if (titleLower.includes(w)) score += 3;
      });

      // Bonus for educational terms
      if (/lecture|class|complete|full|revision|tricks|analysis|marathon/i.test(titleLower)) {
        score += 2;
      }
      // Bonus for substantial duration (longer than 10 mins = comprehensive class)
      if (v.seconds && v.seconds >= 600) {
        score += 2;
      }
      // Penalize youtube shorts (< 90 seconds)
      if (v.seconds && v.seconds < 90) {
        score -= 5;
      }

      return { ...v, matchScore: score };
    });

    // Sort by best relevancy score
    scoredVideos.sort((a, b) => b.matchScore - a.matchScore);

    const curatedVideos = scoredVideos.slice(0, 15).map(v => ({
      videoId: v.videoId,
      title: v.title,
      author: v.author?.name || 'Education Channel',
      duration: v.timestamp || '',
      views: v.views ? (v.views > 1000000 ? (v.views / 1000000).toFixed(1) + 'M' : v.views > 1000 ? Math.round(v.views / 1000) + 'K' : v.views) : '',
      ago: v.ago || '',
      thumbnail: v.thumbnail || `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${v.videoId}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0`
    }));

    res.json({
      success: true,
      searchTerm: primaryQuery,
      total: curatedVideos.length,
      lectures: curatedVideos
    });
  } catch (err) {
    console.error('[Topic Lectures Search Error]:', err.message);
    res.status(500).json({ error: 'Failed to find video lectures.' });
  }
});


// GET /api/syllabus/topic-tests - Search available Quizzes/Mock tests for a specific topic
router.get('/topic-tests', async (req, res) => {
  try {
    const { topicName, topicNameHi, subjectName, examId } = req.query;

    const keywords = [
      (topicNameHi || '').trim().toLowerCase(),
      (topicName || '').trim().toLowerCase(),
      (subjectName || '').trim().toLowerCase()
    ].filter(Boolean);

    if (keywords.length === 0) {
      return res.json({ success: true, tests: [] });
    }

    // Fetch tests from Firestore
    const snapshot = await db.collection('tests').get();
    const matchingTests = [];

    snapshot.forEach(doc => {
      const t = doc.data();
      if (!t) return;

      const title = (t.title || '').toLowerCase();
      const subject = (t.subject || '').toLowerCase();
      const examMatch = !examId || t.examId === examId || (Array.isArray(t.examIds) && t.examIds.includes(examId));

      let matched = false;
      let matchScore = 0;

      // Match topic name in title, subject, or questions
      for (const kw of keywords) {
        if (!kw || kw.length < 2) continue;
        if (title.includes(kw)) {
          matched = true;
          matchScore += 10;
        }
        if (subject.includes(kw)) {
          matched = true;
          matchScore += 5;
        }
      }

      // If not yet matched, check questions array for topic relevance
      if (!matched && Array.isArray(t.questions)) {
        for (const q of t.questions) {
          const qText = (q.question || '').toLowerCase();
          const qExp = (q.explanation || '').toLowerCase();
          for (const kw of keywords) {
            if (qText.includes(kw) || qExp.includes(kw)) {
              matched = true;
              matchScore += 3;
              break;
            }
          }
          if (matched) break;
        }
      }

      if (matched && examMatch) {
        matchingTests.push({
          id: t.id,
          title: t.title || `${t.subject || 'Practice'} ${t.mode === 'mock' ? 'Mock Test' : t.mode === 'pyq' ? 'PYQ Paper' : 'Quiz'}`,
          subject: t.subject || 'General Knowledge',
          mode: t.mode || 'quiz',
          totalQuestions: t.questions ? t.questions.length : (t.pattern?.totalQuestions || 5),
          durationMinutes: t.pattern?.durationMinutes || (t.mode === 'mock' ? 120 : 15),
          totalMarks: t.pattern?.totalMarks || (t.questions ? t.questions.length : 5),
          createdAt: t.createdAt,
          matchScore
        });
      }
    });

    // Sort by highest match score and newest
    matchingTests.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      total: matchingTests.length,
      tests: matchingTests
    });
  } catch (err) {
    console.error('[Topic Tests Search Error]:', err.message);
    res.status(500).json({ error: 'Failed to search topic tests.' });
  }
});

module.exports = router;
