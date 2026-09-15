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

// Helper to restore sanitized Firestore data (reconstructing table rows: { __isRow: true, cells: [...] } back to raw arrays)
function desanitizeFromFirestore(val) {
  if (val === null || val === undefined) return val;
  if (Array.isArray(val)) {
    return val.map(item => {
      if (item && typeof item === 'object' && item.__isRow === true && Array.isArray(item.cells)) {
        return item.cells;
      }
      return desanitizeFromFirestore(item);
    });
  }
  if (typeof val === 'object') {
    if (val.__isRow === true && Array.isArray(val.cells)) {
      return val.cells;
    }
    const res = {};
    for (const [k, v] of Object.entries(val)) {
      res[k] = desanitizeFromFirestore(v);
    }
    return res;
  }
  return val;
}

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

const { safeFirestoreQuery } = require('../services/firestoreCache');

// GET /api/syllabus/custom - Retrieve all custom syllabi stored in Firestore (cached)
router.get('/custom', async (req, res) => {
  try {
    const syllabi = await safeFirestoreQuery('syllabi_custom_all', async () => {
      const snapshot = await db.collection('syllabi').get();
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      return list;
    }, [], 24 * 60 * 60 * 1000); // 24-hour cache TTL
    res.json(syllabi || []);
  } catch (err) {
    console.error('[Get Custom Syllabi Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve custom syllabi.' });
  }
});

// GET /api/syllabus/topic-pdf-url - Get time-limited signed URL for a topic PDF (Students must be logged in)
router.get('/topic-pdf-url', verifyFirebaseToken, async (req, res) => {
  try {
    const { examId, topicId, topicName, topicNameHi } = req.query;
    if (!topicId && !topicName) {
      return res.status(400).json({ error: 'topicId or topicName is required' });
    }

    let targetTopic = null;

    // Helper to find topic within an exam object
    const findTopicInExam = (examObj) => {
      if (!examObj || !Array.isArray(examObj.subjects)) return null;
      for (const sub of examObj.subjects) {
        if (Array.isArray(sub.chapters)) {
          for (const chap of sub.chapters) {
            if (Array.isArray(chap.topics)) {
              for (const top of chap.topics) {
                if (top.id === topicId) return top;
                if (topicName && top.name && top.name.toLowerCase() === topicName.toLowerCase()) return top;
                if (topicNameHi && top.nameHi && top.nameHi === topicNameHi) return top;
              }
            }
          }
        }
        if (Array.isArray(sub.topics)) {
          for (const top of sub.topics) {
            if (top.id === topicId) return top;
            if (topicName && top.name && top.name.toLowerCase() === topicName.toLowerCase()) return top;
            if (topicNameHi && top.nameHi && top.nameHi === topicNameHi) return top;
          }
        }
      }
      return null;
    };

    // 1. Look up exam in Firestore 'syllabi'
    if (examId) {
      let docSnap = await db.collection('syllabi').doc(examId).get();
      if (docSnap.exists) {
        targetTopic = findTopicInExam(docSnap.data());
      }
    }

    // 2. Fallback: Check CG VYAPAM BASICS ('cgv_master') for the matching topic
    if (!targetTopic || !targetTopic.pdfPath) {
      try {
        const masterSnap = await db.collection('syllabi').doc('cgv_master').get();
        if (masterSnap.exists) {
          const masterTopic = findTopicInExam(masterSnap.data());
          if (masterTopic && masterTopic.pdfPath) {
            targetTopic = masterTopic;
          }
        }
      } catch (_) {}
    }

    // 3. Fallback: Search all custom syllabi for this topicId
    if (!targetTopic || !targetTopic.pdfPath) {
      const allSyllabiSnap = await db.collection('syllabi').get();
      allSyllabiSnap.forEach(doc => {
        if (targetTopic && targetTopic.pdfPath) return;
        const candidate = findTopicInExam(doc.data());
        if (candidate && candidate.pdfPath) {
          targetTopic = candidate;
        }
      });
    }

    if (!targetTopic || !targetTopic.pdfPath) {
      return res.status(404).json({ error: 'No PDF notes attached to this topic yet.' });
    }

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

// GET /api/syllabus/topic-notes - Get formatted interactive study notes for a topic
router.get('/topic-notes', async (req, res) => {
  try {
    const { examId, topicId, topicName, topicNameHi } = req.query;
    if (!topicId && !topicName && !topicNameHi) {
      return res.status(400).json({ error: 'topicId or topicName is required' });
    }

    const cacheKey = `topic_notes_${examId || 'all'}_${topicId || topicName || 'unknown'}`;
    const result = await safeFirestoreQuery(cacheKey, async () => {
      // 1. Fast lookup: Check specified exam first
      if (examId && topicId) {
        const cachedSnap = await db.collection('topic_study_notes').doc(`${examId}_${topicId}`).get();
        if (cachedSnap.exists) {
          const data = cachedSnap.data();
          if (data && data.studyNotes) {
            return {
              success: true,
              studyNotes: desanitizeFromFirestore(data.studyNotes),
              topicId,
              examId
            };
          }
        }
      }

      // 2. Automatic Cross-Exam Access: Check CG VYAPAM BASICS ('cgv_master') by topicId
      if (topicId) {
        try {
          const masterSnap = await db.collection('topic_study_notes').doc(`cgv_master_${topicId}`).get();
          if (masterSnap.exists) {
            const data = masterSnap.data();
            if (data && data.studyNotes) {
              return {
                success: true,
                studyNotes: desanitizeFromFirestore(data.studyNotes),
                topicId,
                examId: 'cgv_master',
                inheritedFrom: 'CG VYAPAM BASICS'
              };
            }
          }
        } catch (_) {}
      }

      // 3. Fallback: Search topic_study_notes by topicId across all exams
      if (topicId) {
        try {
          const topicNotesQuery = await db.collection('topic_study_notes').where('topicId', '==', topicId).limit(1).get();
          if (!topicNotesQuery.empty) {
            const data = topicNotesQuery.docs[0].data();
            if (data && data.studyNotes) {
              return {
                success: true,
                studyNotes: desanitizeFromFirestore(data.studyNotes),
                topicId,
                examId: data.examId || examId
              };
            }
          }
        } catch (qErr) {
          console.warn('[topic_study_notes query warn]:', qErr.message);
        }
      }

      // 4. Fallback to syllabus collection in Firestore
      let targetTopic = null;
      let foundExamId = examId;

      const findTopicInDoc = (examObj) => {
        if (!examObj || !Array.isArray(examObj.subjects)) return null;
        for (const sub of examObj.subjects) {
          if (Array.isArray(sub.chapters)) {
            for (const chap of sub.chapters) {
              if (Array.isArray(chap.topics)) {
                for (const top of chap.topics) {
                  if (top.id === topicId) return top;
                  if (topicName && top.name && top.name.toLowerCase() === topicName.toLowerCase()) return top;
                  if (topicNameHi && top.nameHi && top.nameHi === topicNameHi) return top;
                }
              }
            }
          }
          if (Array.isArray(sub.topics)) {
            for (const top of sub.topics) {
              if (top.id === topicId) return top;
              if (topicName && top.name && top.name.toLowerCase() === topicName.toLowerCase()) return top;
              if (topicNameHi && top.nameHi && top.nameHi === topicNameHi) return top;
            }
          }
        }
        return null;
      };

      if (examId) {
        const docSnap = await db.collection('syllabi').doc(examId).get();
        if (docSnap.exists) {
          targetTopic = findTopicInDoc(docSnap.data());
        }
      }

      // 5. Automatic CG VYAPAM BASICS check in syllabi collection
      if (!targetTopic || !targetTopic.studyNotes) {
        try {
          const masterSnap = await db.collection('syllabi').doc('cgv_master').get();
          if (masterSnap.exists) {
            const masterCandidate = findTopicInDoc(masterSnap.data());
            if (masterCandidate && masterCandidate.studyNotes) {
              targetTopic = masterCandidate;
              foundExamId = 'cgv_master';
            }
          }
        } catch (_) {}
      }

      if (!targetTopic || !targetTopic.studyNotes) {
        return null;
      }

      return {
        success: true,
        studyNotes: desanitizeFromFirestore(targetTopic.studyNotes),
        topicId: targetTopic.id || topicId,
        examId: foundExamId
      };
    }, null, 60 * 60 * 1000); // 1 hour TTL

    if (!result) {
      return res.status(404).json({ error: 'No formatted study notes found for this topic.' });
    }

    res.json(result);
  } catch (err) {
    console.error('[Get Topic Study Notes Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to retrieve study notes.' });
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

    // Fetch tests from Firestore (with fallback/supplement from cached files)
    const rawTests = [];
    try {
      const snapshot = await db.collection('tests').get();
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data) rawTests.push({ ...data, id: data.id || doc.id });
      });
    } catch (dbErr) {
      console.warn('[topic-tests DB Warning]:', dbErr.message);
    }

    // Load from local tests cache for CG VYAPAM BASICS and all tests
    const fs = require('fs');
    const path = require('path');
    const cacheFiles = [
      path.join(__dirname, '../data_cache/tests_cgv_master.json'),
      path.join(__dirname, '../data_cache/tests_all.json')
    ];
    for (const cf of cacheFiles) {
      if (fs.existsSync(cf)) {
        try {
          const cached = JSON.parse(fs.readFileSync(cf, 'utf8'));
          if (Array.isArray(cached)) {
            for (const ct of cached) {
              if (ct && !rawTests.some(t => t.id === ct.id)) {
                rawTests.push(ct);
              }
            }
          }
        } catch (_) {}
      }
    }

    const matchingTests = [];

    rawTests.forEach(t => {
      if (!t) return;

      const title = (t.title || '').toLowerCase();
      const subject = (t.subject || '').toLowerCase();
      
      // Automatic cross-exam access: CG VYAPAM BASICS ('cgv_master') tests are accessible to all exams!
      const examMatch = !examId || 
        t.examId === examId || 
        (Array.isArray(t.examIds) && t.examIds.includes(examId)) ||
        t.examId === 'cgv_master' || 
        t.examName === 'CG VYAPAM BASICS' ||
        (Array.isArray(t.examIds) && (t.examIds.includes('cgv_master') || t.examIds.includes('CG VYAPAM BASICS')));

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
          const qTopic = (q.topic || '').toLowerCase();
          for (const kw of keywords) {
            if (qText.includes(kw) || qExp.includes(kw) || qTopic.includes(kw)) {
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
