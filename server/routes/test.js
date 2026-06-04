const express = require('express');
const router = express.Router();
const { db } = require('../firebase-admin');
const ai = require('../services/aiManager');

// GET /api/tests - list generated tests for current exam
router.get('/', async (req, res) => {
  try {
    const { examId } = req.query;
    const snapshot = await db.collection('tests').get();
    let tests = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: d.id,
        examId: d.examId,
        examIds: d.examIds || (d.examId ? [d.examId] : []),
        examName: d.examName,
        examNames: d.examNames || (d.examName ? [d.examName] : []),
        subject: d.subject,
        mode: d.mode,
        language: d.language,
        totalQuestions: d.questions ? d.questions.length : 0,
        createdAt: d.createdAt
      };
    });

    if (examId) {
      tests = tests.filter(t => t.examId === examId || (Array.isArray(t.examIds) && t.examIds.includes(examId)));
    }

    // Sort in-memory to avoid requiring a Firestore composite index
    tests.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : 0;
      const dateB = b.createdAt ? new Date(b.createdAt) : 0;
      return dateB - dateA;
    });

    res.json(tests);
  } catch (err) {
    console.error('[Get Tests Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch tests.' });
  }
});

// GET /api/tests/:id - get questions of a specific test
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('tests').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.json(doc.data());
  } catch (err) {
    console.error('[Get Test Details Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch test details.' });
  }
});

// POST /api/tests/generate - generate a test for a user on-demand
router.post('/generate', async (req, res) => {
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

    const result = await ai.generateTest(examId, examName, subjectName, testMode, questionCount, lang, examSubjects);

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
