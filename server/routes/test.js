const express = require('express');
const router = express.Router();
const claude = require('../services/groq');

router.post('/', async (req, res) => {
  try {
    const { examId, examName, subject, mode, language } = req.body;

    if (!examId || !examName) {
      return res.status(400).json({ error: 'examId and examName are required' });
    }

    const testMode = mode || 'quiz';
    const questionCount = testMode === 'mock' ? 25 : 5;
    const subjectName = subject || 'all';
    const lang = language || 'english';

    console.log(`[Test] Generating ${testMode} (${questionCount} Qs) for ${examName} - ${subjectName}`);

    const result = await claude.generateTest(examId, examName, subjectName, testMode, questionCount, lang);

    res.json({
      mode: testMode,
      examId: examId,
      subject: subjectName,
      totalQuestions: result.questions.length,
      questions: result.questions
    });
  } catch (err) {
    console.error('[Test Generation Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to generate test questions. Please try again.' });
  }
});

module.exports = router;
