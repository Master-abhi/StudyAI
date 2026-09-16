const express = require('express');
const router = express.Router();
const { db } = require('../firebase-admin');
const ai = require('../services/aiManager');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');
const { aiRateLimiter } = require('../middleware/rateLimiter');

const { safeFirestoreQuery, invalidateCache } = require('../services/firestoreCache');

function getCanonicalSubject(rawSubject) {
  if (!rawSubject || typeof rawSubject !== 'string') return 'General Knowledge';
  let trimmed = rawSubject.trim().replace(/\s+/g, ' ');
  if (!trimmed) return 'General Knowledge';
  
  const lower = trimmed.toLowerCase();
  
  if (lower === 'all' || lower === 'all subjects' || lower === 'mixed' || lower === 'full syllabus') {
    return 'Full Syllabus / All Subjects';
  }
  
  // Standardize common subject cased variations
  if (lower === 'cg gk' || lower === 'cggk' || lower === 'cg general knowledge' || lower === 'chhattisgarh gk') return 'CG GK';
  if (lower === 'cg geography' || lower === 'chhattisgarh geography') return 'CG Geography';
  if (lower === 'cg history' || lower === 'chhattisgarh history') return 'CG History';
  if (lower === 'cg polity' || lower === 'cg admin' || lower === 'chhattisgarh polity') return 'CG Polity & Governance';
  if (lower === 'cg economy' || lower === 'chhattisgarh economy') return 'CG Economy';
  if (lower === 'cg culture' || lower === 'cg culture & tribe' || lower === 'cg tribe' || lower === 'chhattisgarh culture') return 'CG Culture & Tribes';
  if (lower === 'general knowledge' || lower === 'gk' || lower === 'general studies' || lower === 'gs') return 'General Knowledge';
  if (lower === 'indian history' || lower === 'history of india' || lower === 'history') return 'Indian History';
  if (lower === 'indian polity' || lower === 'indian constitution' || lower === 'polity') return 'Indian Polity';
  if (lower === 'indian geography' || lower === 'geography') return 'Indian Geography';
  if (lower === 'indian economy' || lower === 'economy') return 'Indian Economy';
  if (lower === 'general science' || lower === 'science') return 'General Science';
  if (lower === 'aptitude' || lower === 'maths' || lower === 'mathematics' || lower === 'quant') return 'Aptitude & Maths';
  if (lower === 'reasoning' || lower === 'logical reasoning') return 'Reasoning';
  if (lower === 'hindi' || lower === 'hindi language') return 'Hindi Language';
  if (lower === 'chhattisgarhi' || lower === 'chhattisgarhi language') return 'Chhattisgarhi Language';
  if (lower === 'english' || lower === 'english language') return 'English Language';
  if (lower === 'current affairs' || lower === 'ca') return 'Current Affairs';

  if (trimmed === trimmed.toLowerCase() || trimmed === trimmed.toUpperCase()) {
    return trimmed.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }
  
  return trimmed;
}

// GET /api/tests/subjects - list subject folders and test counts (lightweight for fast tab load)
router.get('/subjects', async (req, res) => {
  try {
    const { examId, mode } = req.query;
    const cacheKey = `test_subjects_${examId || 'all'}_${mode || 'all'}`;

    const subjects = await safeFirestoreQuery(cacheKey, async () => {
      // Reuse cached full test list
      const testsCacheKey = `tests_base_${examId || 'all'}`;
      const allTests = await safeFirestoreQuery(testsCacheKey, async () => {
        const snapshot = await db.collection('tests').get();
        let list = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: d.id,
            title: d.title || '',
            examId: d.examId,
            examIds: d.examIds || (d.examId ? [d.examId] : []),
            examName: d.examName,
            examNames: d.examNames || (d.examName ? [d.examName] : []),
            subject: d.subject || 'General Knowledge',
            mode: d.mode || 'quiz',
            language: d.language || 'hindi',
            totalQuestions: d.questions ? d.questions.length : 0,
            createdAt: d.createdAt
          };
        });

        if (examId) {
          list = list.filter(t => t.examId === examId || (Array.isArray(t.examIds) && t.examIds.includes(examId)));
        }

        return list;
      }, []);

      const counts = {};
      allTests.forEach(t => {
        if (mode && t.mode !== mode) return;
        const sub = getCanonicalSubject(t.subject || 'General Knowledge');
        if (!counts[sub]) {
          counts[sub] = { subject: sub, count: 0, totalQuestions: 0, modes: new Set() };
        }
        counts[sub].count += 1;
        counts[sub].totalQuestions += (t.totalQuestions || 0);
        counts[sub].modes.add(t.mode);
      });

      return Object.values(counts).map(c => ({
        ...c,
        modes: Array.from(c.modes)
      })).sort((a, b) => b.count - a.count);
    }, []);

    res.json(subjects || []);
  } catch (err) {
    console.error('[Get Test Subjects Error]:', err.message);
    res.json([]);
  }
});

// GET /api/tests - list generated tests for current exam / subject
router.get('/', async (req, res) => {
  try {
    const { examId, subject, mode } = req.query;
    const cacheKey = `tests_${examId || 'all'}_${subject || 'all'}_${mode || 'all'}`;

    const tests = await safeFirestoreQuery(cacheKey, async () => {
      const testsCacheKey = `tests_base_${examId || 'all'}`;
      let list = await safeFirestoreQuery(testsCacheKey, async () => {
        const snapshot = await db.collection('tests').get();
        return snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: d.id,
            title: d.title || '',
            examId: d.examId,
            examIds: d.examIds || (d.examId ? [d.examId] : []),
            examName: d.examName,
            examNames: d.examNames || (d.examName ? [d.examName] : []),
            subject: d.subject || 'General Knowledge',
            mode: d.mode || 'quiz',
            language: d.language || 'hindi',
            totalQuestions: d.questions ? d.questions.length : 0,
            createdAt: d.createdAt
          };
        });
      }, []);

      if (examId) {
        list = list.filter(t => t.examId === examId || (Array.isArray(t.examIds) && t.examIds.includes(examId)));
      }

      if (mode) {
        list = list.filter(t => t.mode === mode);
      }

      if (subject && subject !== 'All') {
        const canonicalTarget = getCanonicalSubject(subject).toLowerCase();
        const subLower = subject.toLowerCase();
        list = list.filter(t => {
          const testSub = (t.subject || '').toLowerCase();
          const testCanonical = getCanonicalSubject(t.subject || '').toLowerCase();
          return testSub === subLower || testCanonical === canonicalTarget || testCanonical === subLower || testSub === canonicalTarget;
        });
      }

      // Sort in-memory to avoid requiring a Firestore composite index
      list.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : 0;
        const dateB = b.createdAt ? new Date(b.createdAt) : 0;
        return dateB - dateA;
      });

      return list;
    }, []);

    res.json(tests || []);
  } catch (err) {
    console.error('[Get Tests Error]:', err.message);
    res.json([]);
  }
});

// GET /api/tests/:id - get questions of a specific test (cached)
router.get('/:id', async (req, res) => {
  try {
    const testId = req.params.id;
    const testData = await safeFirestoreQuery(`test_detail_${testId}`, async () => {
      const doc = await db.collection('tests').doc(testId).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    }, null, 60 * 60 * 1000); // 1 hour TTL for immutable test questions

    if (!testData) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.json(testData);
  } catch (err) {
    console.error('[Get Test Details Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch test details.' });
  }
});

const { fetchExamSyllabusContext } = require('../services/syllabusHelper');

// POST /api/tests/generate - generate a test for a user on-demand
router.post('/generate', verifyFirebaseToken, aiRateLimiter, async (req, res) => {
  try {
    const { examId, examName, subject, mode, language, subjects } = req.body;

    if (!examId || !examName) {
      return res.status(400).json({ error: 'examId and examName are required' });
    }

    const testMode = mode || 'quiz';
    const questionCount = testMode === 'mock' ? 25 : 5;
    const subjectName = subject || 'all';
    const lang = language || 'english';
    const examSubjects = subjects || [];

    console.log(`[User Test Gen] Generating ${testMode} (${questionCount} Qs) for ${examName} - ${subjectName}`);

    const syllabusContext = await fetchExamSyllabusContext(examId, subjectName);
    const result = await ai.generateTest(examId, examName, subjectName, testMode, questionCount, lang, examSubjects, syllabusContext);

    const timestamp = new Date().toISOString();
    const enrichedQuestions = result.questions.map((q, index) => {
      return {
        ...q,
        timestamp,
        subject: q.subject || subjectName || 'General Knowledge'
      };
    });

    const testId = `test_${Date.now()}`;
    const newTest = {
      id: testId,
      examId,
      examName,
      examIds: [examId],
      examNames: [examName],
      subject: subjectName,
      mode: testMode,
      language: lang,
      questions: enrichedQuestions,
      pattern: {
        totalQuestions: enrichedQuestions.length,
        totalMarks: enrichedQuestions.length * ((testMode === 'mock' || testMode === 'pyq') ? 2 : 1),
        durationMinutes: (testMode === 'mock' || testMode === 'pyq') ? 120 : 10,
        markingScheme: (testMode === 'mock' || testMode === 'pyq') ? '+2 for correct, -0.66 for incorrect' : '+1 for correct, 0 for incorrect'
      },
      createdAt: timestamp
    };

    // Save test to Firestore 'tests' collection
    await db.collection('tests').doc(testId).set(newTest);
    console.log(`[User Test Gen] Generated and saved test ${testId} ✅`);

    // Continuously save all generated questions to the 'questions' collection on the server
    const batch = db.batch();
    enrichedQuestions.forEach((q, index) => {
      const questionId = `q_${testId}_${index}`;
      const qRef = db.collection('questions').doc(questionId);
      batch.set(qRef, {
        id: questionId,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        subject: q.subject,
        timestamp: q.timestamp,
        examId,
        examName,
        examIds: [examId],
        examNames: [examName],
        testId,
        mode: testMode,
        language: lang
      });
    });
    await batch.commit();
    console.log(`[User Test Gen] Saved ${enrichedQuestions.length} individual questions to questions collection ✅`);

    res.json({
      success: true,
      test: newTest
    });
  } catch (err) {
    console.error('[User Test Gen Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to generate test questions. Please try again.' });
  }
});

module.exports = router;
