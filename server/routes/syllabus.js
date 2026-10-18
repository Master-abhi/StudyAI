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

const { safeFirestoreQuery, invalidateCache } = require('../services/firestoreCache');

// GET /api/syllabus/custom - Retrieve all custom syllabi stored in Firestore (cached)
router.get('/custom', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    if (req.query.force === 'true' || req.query.refresh === 'true') {
      invalidateCache('syllabi_custom_all');
    }
    const syllabi = await safeFirestoreQuery('syllabi_custom_all', async () => {
      const [snapshot, notesSnap] = await Promise.all([
        db.collection('syllabi').get(),
        db.collection('topic_study_notes').select('topicId', 'examId').get()
      ]);

      const notesTopicIds = new Set();
      notesSnap.forEach(d => {
        const data = d.data() || {};
        if (data.topicId) notesTopicIds.add(String(data.topicId));
        notesTopicIds.add(d.id);
        const idx = d.id.indexOf('_');
        if (idx !== -1) {
          notesTopicIds.add(d.id.substring(idx + 1));
        }
      });

      const list = [];
      snapshot.forEach(doc => {
        const d = doc.data() || {};
        const examObj = { id: doc.id, ...d };
        if (Array.isArray(examObj.subjects)) {
          examObj.subjects.forEach(sub => {
            if (Array.isArray(sub.chapters)) {
              sub.chapters.forEach(chap => {
                if (Array.isArray(chap.topics)) {
                  chap.topics.forEach(top => {
                    if (top && (notesTopicIds.has(String(top.id)) || notesTopicIds.has(`${doc.id}_${top.id}`))) {
                      top.hasStudyNotes = true;
                    }
                  });
                }
              });
            }
            if (Array.isArray(sub.topics)) {
              sub.topics.forEach(top => {
                if (top && (notesTopicIds.has(String(top.id)) || notesTopicIds.has(`${doc.id}_${top.id}`))) {
                  top.hasStudyNotes = true;
                }
              });
            }
          });
        }
        list.push(examObj);
      });
      return list;
    }, [], 5 * 60 * 1000); // 5-minute cache TTL with instant invalidation on changes
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
    const { examId, topicId, topicName, topicNameHi, refresh } = req.query;
    if (!topicId && !topicName && !topicNameHi) {
      return res.status(400).json({ error: 'topicId or topicName is required' });
    }

    const cacheKey = `topic_notes_${examId || 'all'}_${topicId || topicName || 'unknown'}`;
    if (refresh === 'true') {
      invalidateCache(cacheKey);
      if (topicId) invalidateCache(topicId);
    }

    let result = await safeFirestoreQuery(cacheKey, async () => {
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

    if (result && result.studyNotes && !result.studyNotes.overview && topicId) {
      try {
        const directSnap = await db.collection('topic_study_notes').doc(`cgv_master_${topicId}`).get();
        if (directSnap.exists && directSnap.data()?.studyNotes?.overview) {
          result.studyNotes.overview = desanitizeFromFirestore(directSnap.data().studyNotes.overview);
          const { saveCache } = require('../services/firestoreCache');
          saveCache(cacheKey, result);
        }
      } catch (_) {}
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
    const { topicName, topicNameHi, subjectName, examId, topicId, subtopics } = req.query;

    const norm = str => (str || '')
      .toLowerCase()
      .replace(/[\/—\-–:|\(\)\[\],;]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const rawHi = (topicNameHi || '').trim();
    const rawEn = (topicName || '').trim();

    // Generic words to exclude if they appear alone
    const stopWords = new Set([
      'test', 'mock', 'quiz', 'paper', 'questions', 'mcqs',
      'and', 'the', 'for', 'part', 'class', 'series', 'exam',
      'का', 'की', 'के', 'में', 'पर', 'एवं', 'तथा', 'और', 'से', 'भाग', 'प्रश्न'
    ]);

    // Extract specific topic parts if separated by dash/hyphen/commas/parentheses
    const hiParts = rawHi.split(/[—\-–|:,\(\)\[\]]/).map(p => p.trim()).filter(Boolean);
    const enParts = rawEn.split(/[—\-–|:,\(\)\[\]]/).map(p => p.trim()).filter(Boolean);

    // Build target search phrases for the specific topic
    const targetPhrases = new Set();
    [rawHi, rawEn, ...hiParts, ...enParts].forEach(p => {
      const n = norm(p);
      if (n.length >= 2 && !stopWords.has(n)) {
        targetPhrases.add(n);
      }
    });

    // Also include subtopics if provided
    if (subtopics) {
      const subList = Array.isArray(subtopics) ? subtopics : String(subtopics).split(',');
      subList.forEach(st => {
        const parts = String(st).split(/[—\-–|:,\(\)\[\]]/).map(p => p.trim()).filter(Boolean);
        [st, ...parts].forEach(p => {
          const n = norm(p);
          if (n.length >= 2 && !stopWords.has(n)) {
            targetPhrases.add(n);
          }
        });
      });
    }

    if (targetPhrases.size === 0 && !topicId) {
      return res.json({ success: true, tests: [] });
    }

    // 1. Ultra-fast Catalog Loading with 30-min in-memory & disk cache
    const rawTests = await safeFirestoreQuery('topic_tests_catalog', async () => {
      const fs = require('fs');
      const path = require('path');
      const cacheDir = path.join(__dirname, '../data_cache');
      const catalogMap = new Map();

      // Read pre-cached test lists from disk first (takes ~3ms)
      if (fs.existsSync(cacheDir)) {
        try {
          const baseFiles = fs.readdirSync(cacheDir).filter(f => 
            (f.startsWith('tests_base_') || f.startsWith('admin_tests_meta') || f.startsWith('tests_')) && 
            f.endsWith('.json')
          );
          for (const cf of baseFiles) {
            try {
              const cached = JSON.parse(fs.readFileSync(path.join(cacheDir, cf), 'utf8'));
              if (Array.isArray(cached)) {
                for (const ct of cached) {
                  if (ct && ct.id && !catalogMap.has(ct.id)) {
                    catalogMap.set(ct.id, {
                      id: ct.id,
                      title: ct.title || '',
                      topic: ct.topic || ct.topicName || ct.topicNameHi || ct.subTopic || '',
                      topicId: ct.topicId || '',
                      topicIds: ct.topicIds || [],
                      examId: ct.examId || (ct.examIds && ct.examIds[0]) || '',
                      examIds: ct.examIds || (ct.examId ? [ct.examId] : []),
                      examName: ct.examName || '',
                      subject: ct.subject || 'General Knowledge',
                      mode: ct.mode || 'quiz',
                      totalQuestions: ct.questions ? ct.questions.length : (ct.totalQuestions || 10),
                      durationMinutes: ct.durationMinutes || (ct.mode === 'mock' ? 120 : 15),
                      totalMarks: ct.totalMarks || (ct.questions ? ct.questions.length : 10),
                      createdAt: ct.createdAt || ''
                    });
                  }
                }
              }
            } catch (_) {}
          }
        } catch (_) {}
      }

      if (catalogMap.size > 0) {
        return Array.from(catalogMap.values());
      }

      // Fallback: lightweight field projection from Firestore (avoids downloading questions)
      try {
        const snapshot = await db.collection('tests').select(
          'id', 'title', 'topic', 'topicId', 'topicIds', 'topicName', 'topicNameHi', 
          'subject', 'mode', 'examId', 'examIds', 'examName', 'totalQuestions', 
          'durationMinutes', 'totalMarks', 'createdAt'
        ).get();
        snapshot.forEach(doc => {
          const d = doc.data() || {};
          catalogMap.set(d.id || doc.id, {
            id: d.id || doc.id,
            title: d.title || '',
            topic: d.topic || d.topicName || d.topicNameHi || d.subTopic || '',
            topicId: d.topicId || '',
            topicIds: d.topicIds || [],
            examId: d.examId || (d.examIds && d.examIds[0]) || '',
            examIds: d.examIds || (d.examId ? [d.examId] : []),
            examName: d.examName || '',
            subject: d.subject || 'General Knowledge',
            mode: d.mode || 'quiz',
            totalQuestions: d.totalQuestions || 10,
            durationMinutes: d.durationMinutes || (d.mode === 'mock' ? 120 : 15),
            totalMarks: d.totalMarks || 10,
            createdAt: d.createdAt || ''
          });
        });
      } catch (dbErr) {
        console.warn('[topic-tests DB Warning]:', dbErr.message);
      }

      return Array.from(catalogMap.values());
    }, [], 30 * 60 * 1000);

    const matchingTests = [];

    rawTests.forEach(t => {
      if (!t) return;

      const titleNorm = norm(t.title);
      const testTopicNorm = norm(t.topic || t.topicName || t.topicNameHi || t.subTopic);
      const testTopicId = (t.topicId || '').trim();

      // Exam scope filter
      const examMatch = !examId || 
        t.examId === examId || 
        (Array.isArray(t.examIds) && t.examIds.includes(examId)) ||
        t.examId === 'cgv_master' || 
        t.examName === 'CG VYAPAM BASICS' ||
        (Array.isArray(t.examIds) && (t.examIds.includes('cgv_master') || t.examIds.includes('CG VYAPAM BASICS')));

      if (!examMatch) return;

      // EXCLUDE generic mixed tests from topic tests
      if (titleNorm.startsWith('mixed subjects') || titleNorm.startsWith('full syllabus') || titleNorm.startsWith('grand mock')) {
        return;
      }

      let matched = false;
      let matchScore = 0;

      // 1. Exact Topic ID match
      if (topicId && (testTopicId === topicId || (Array.isArray(t.topicIds) && t.topicIds.includes(topicId)))) {
        matched = true;
        matchScore += 50;
      }

      // 2. Match topic field or test title
      if (!matched) {
        for (const phrase of targetPhrases) {
          // If test has explicit topic field
          if (testTopicNorm) {
            if (testTopicNorm === phrase) {
              matched = true;
              matchScore += 40;
              break;
            }
            if (testTopicNorm.includes(phrase) || phrase.includes(testTopicNorm)) {
              matched = true;
              matchScore += 30;
              break;
            }
          }

          // If test title matches topic phrase
          if (titleNorm.includes(phrase)) {
            matched = true;
            matchScore += 20;
            break;
          }
        }
      }

      // 3. If questions array exists, check question topic tags (strictly q.topic, NOT generic text match)
      if (!matched && Array.isArray(t.questions) && t.questions.length > 0) {
        let matchingQCount = 0;
        for (const q of t.questions) {
          const qTopic = norm(q.topic || q.subTopic);
          if (qTopic) {
            for (const phrase of targetPhrases) {
              if (qTopic === phrase || qTopic.includes(phrase)) {
                matchingQCount++;
                break;
              }
            }
          }
        }
        // If at least 40% of questions belong to this topic
        if (matchingQCount >= Math.max(1, Math.floor(t.questions.length * 0.4))) {
          matched = true;
          matchScore += 15;
        }
      }

      if (matched) {
        matchingTests.push({
          id: t.id,
          title: t.title || `${t.subject || 'Practice'} ${t.mode === 'mock' ? 'Mock Test' : t.mode === 'pyq' ? 'PYQ Paper' : 'Quiz'}`,
          subject: t.subject || 'General Knowledge',
          mode: t.mode || 'quiz',
          totalQuestions: t.questions ? t.questions.length : (t.totalQuestions || t.pattern?.totalQuestions || 10),
          durationMinutes: t.durationMinutes || t.pattern?.durationMinutes || (t.mode === 'mock' ? 120 : 15),
          totalMarks: t.totalMarks || t.pattern?.totalMarks || (t.questions ? t.questions.length : 10),
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
