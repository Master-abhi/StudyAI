const express = require('express');
const router = express.Router();
const { admin, db } = require('../firebase-admin');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');

router.use(verifyFirebaseToken);

const MAX_TEST_RESULTS = 50;
const MAX_POINTS = 1000000;
const MAX_MCQS_SOLVED = 1000000;
const MAX_STREAK = 5000;
const MAX_EXAMS = 100;
const MAX_ITEMS_PER_EXAM = 2000;

function clampInteger(value, min, max) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.min(Math.max(Math.trunc(value), min), max);
}

function cleanString(value, maxLength) {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  if (!cleaned) return null;
  return cleaned.slice(0, maxLength);
}

function cleanExamId(value) {
  const cleaned = cleanString(value, 80);
  if (!cleaned || !/^[a-zA-Z0-9_-]+$/.test(cleaned)) return null;
  return cleaned;
}

function cleanStreak(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const count = clampInteger(value.count, 0, MAX_STREAK);
  const lastDate = cleanString(value.lastDate, 10);
  if (count === null) return null;
  return {
    count,
    lastDate: lastDate && /^\d{4}-\d{2}-\d{2}$/.test(lastDate) ? lastDate : ''
  };
}

function cleanTestResults(value) {
  if (!Array.isArray(value)) return null;
  return value.slice(-MAX_TEST_RESULTS).map((result) => {
    if (!result || typeof result !== 'object' || Array.isArray(result)) return null;
    const correct = clampInteger(result.correct, 0, 1000);
    const wrong = clampInteger(result.wrong, 0, 1000);
    const skipped = clampInteger(result.skipped, 0, 1000);
    const percent = clampInteger(result.percent, 0, 100);
    
    // calculate total and score defaults if missing
    let total = clampInteger(result.total, 0, 1000);
    if (total === null && correct !== null && wrong !== null) {
      total = correct + wrong + (skipped ?? 0);
    }
    let score = clampInteger(result.score, 0, total ?? 1000);
    if (score === null && correct !== null) {
      score = correct;
    }

    const dateStr = cleanString(result.date, 50) || cleanString(result.timestamp, 50) || new Date().toISOString();
    const examId = cleanString(result.exam, 100) || '';
    const subjectName = cleanString(result.subject, 100) || '';
    const studyMode = cleanString(result.mode, 30) || 'quiz';

    return {
      date: dateStr,
      timestamp: dateStr,
      exam: examId,
      subject: subjectName,
      mode: studyMode,
      score: score ?? 0,
      correct: correct ?? score ?? 0,
      wrong: wrong ?? 0,
      skipped: skipped ?? 0,
      total: total ?? 0,
      percent: percent ?? 0
    };
  }).filter(Boolean);
}

function cleanNestedObject(value, leafCleaner) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;

  const output = {};
  for (const [examId, examValue] of Object.entries(value).slice(0, MAX_EXAMS)) {
    const cleanId = cleanExamId(examId);
    if (!cleanId || !examValue || typeof examValue !== 'object' || Array.isArray(examValue)) continue;

    const cleanExamValue = {};
    for (const [key, itemValue] of Object.entries(examValue).slice(0, MAX_ITEMS_PER_EXAM)) {
      const cleanKey = cleanString(key, 120);
      if (!cleanKey) continue;
      const cleanedItem = leafCleaner(itemValue);
      if (cleanedItem !== null) cleanExamValue[cleanKey] = cleanedItem;
    }

    output[cleanId] = cleanExamValue;
  }

  return output;
}

function cleanSubjectScore(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const count = clampInteger(value.count, 0, 10000) ?? 0;
  const totalScore = clampInteger(value.totalScore, 0, count * 100) ?? 0;
  const lastScore = clampInteger(value.lastScore, 0, 100) ?? 0;
  const bestScore = clampInteger(value.bestScore, 0, 100) ?? 0;
  const worstScore = clampInteger(value.worstScore, 0, 100) ?? 0;
  const recentScores = Array.isArray(value.recentScores)
    ? value.recentScores
      .map((score) => clampInteger(score, 0, 100))
      .filter((score) => score !== null)
      .slice(-5)
    : [];

  return {
    totalScore,
    count,
    lastScore,
    bestScore,
    worstScore,
    recentScores
  };
}

router.get('/data', async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.user.uid).get();
    res.json(doc.exists ? doc.data() : {});
  } catch (err) {
    console.error('[User Data] Read error:', err.message);
    res.status(500).json({ error: 'Failed to load user data' });
  }
});

router.post('/sync', async (req, res) => {
  try {
    const { testResults, points, mcqsSolved, streak, subjects, progress, selectedExam, mobile } = req.body;

    const update = {};
    const cleanResults = cleanTestResults(testResults);
    const cleanPoints = clampInteger(points, 0, MAX_POINTS);
    const cleanMcqsSolved = clampInteger(mcqsSolved, 0, MAX_MCQS_SOLVED);
    const cleanStreakValue = cleanStreak(streak);
    const cleanSubjects = cleanNestedObject(subjects, cleanSubjectScore);
    const cleanProgress = cleanNestedObject(progress, (value) => value === true ? true : null);
    const cleanSelectedExam = cleanExamId(selectedExam);
    const cleanMobile = cleanString(mobile, 20);

    if (cleanResults) update.testResults = cleanResults;
    if (cleanPoints !== null) update.points = cleanPoints;
    if (cleanMcqsSolved !== null) update.mcqsSolved = cleanMcqsSolved;
    if (cleanStreakValue) update.streak = cleanStreakValue;
    if (cleanSubjects) update.subjects = cleanSubjects;
    if (cleanProgress) update.progress = cleanProgress;
    if (cleanSelectedExam) update.selectedExam = cleanSelectedExam;
    if (cleanMobile) update.mobile = cleanMobile;

    update.updatedAt = admin.firestore.FieldValue.serverTimestamp();

    if (Object.keys(update).length <= 1) {
      return res.json({ success: true, skipped: true });
    }

    await db.collection('users').doc(req.user.uid).set(update, { merge: true });
    res.json({ success: true });
  } catch (err) {
    console.error('[User Sync] Error:', err.message);
    res.status(500).json({ error: 'Sync failed' });
  }
});

module.exports = router;
