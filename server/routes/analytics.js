const express = require('express');
const router = express.Router();
const { admin, db } = require('../firebase-admin');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');

router.use(verifyFirebaseToken);

const MAX_RECORD_TOTAL = 100;
const MAX_STUDY_SECONDS = 60 * 60;

function clampInteger(value, min, max) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.min(Math.max(Math.trunc(value), min), max);
}

function cleanDocId(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.trim().replace(/[\/#?[\]]/g, ' ').replace(/\s+/g, ' ').slice(0, 120);
  return cleaned || fallback;
}

function cleanRecordInput(body) {
  const explicitTotal = clampInteger(body.total, 0, MAX_RECORD_TOTAL);
  const explicitCorrect = clampInteger(body.correct, 0, explicitTotal ?? MAX_RECORD_TOTAL);
  const hasBooleanResult = typeof body.isCorrect === 'boolean';
  const total = explicitTotal ?? (hasBooleanResult ? 1 : 0);
  const correct = Math.min(explicitCorrect ?? (body.isCorrect === true ? 1 : 0), total);
  const studyTime = clampInteger(body.studyTime ?? body.timeTaken, 0, MAX_STUDY_SECONDS) ?? 0;

  return {
    subject: cleanDocId(body.subject, 'General'),
    topic: cleanDocId(body.topic, ''),
    total,
    correct,
    studyTime
  };
}

router.get('/overview', async (req, res) => {
  try {
    const userId = req.user.uid;

    let data = {
      overallAccuracy: 0,
      totalAttempted: 0,
      totalStudyTime: 0,
      currentStreak: 0,
      weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
    };

    try {
      const doc = await db.collection('analytics').doc(userId).get();
      if (doc.exists) {
        data = { ...data, ...doc.data() };
      }
    } catch (e) {
      console.error('[Analytics] Firestore read error:', e.message);
    }

    res.json(data);
  } catch (err) {
    console.error('[Analytics Overview Error]:', err.message);
    res.status(500).json({ error: 'Failed to load analytics overview' });
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const userId = req.user.uid;
    let subjects = [];

    try {
      const snapshot = await db.collection('analytics')
        .doc(userId)
        .collection('subjects')
        .get();
      subjects = snapshot.docs.map(d => {
        const s = d.data();
        return {
          id: d.id,
          name: d.id,
          total: s.total || 0,
          correct: s.correct || 0,
          accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
          status: s.total > 0 ? (s.correct / s.total >= 0.75 ? 'strong' : s.correct / s.total < 0.5 ? 'weak' : 'average') : 'average',
          ...s
        };
      });
    } catch (e) {
      console.error('[Analytics] Subjects read error:', e.message);
    }

    res.json(subjects);
  } catch (err) {
    console.error('[Analytics Subjects Error]:', err.message);
    res.status(500).json({ error: 'Failed to load subject analytics' });
  }
});

router.get('/topics', async (req, res) => {
  try {
    const userId = req.user.uid;
    const subject = req.query.subject;
    let topics = [];

    if (subject) {
      try {
        const snapshot = await db.collection('analytics')
          .doc(userId)
          .collection('subjects')
          .doc(subject)
          .collection('topics')
          .get();
        topics = snapshot.docs.map(d => {
          const t = d.data();
          return {
            name: d.id,
            total: t.total || 0,
            correct: t.correct || 0,
            accuracy: t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0,
            status: t.total > 0 ? (t.correct / t.total >= 0.75 ? 'strong' : t.correct / t.total < 0.5 ? 'weak' : 'average') : 'average',
            ...t
          };
        });
      } catch (e) {
        console.error('[Analytics] Topics read error:', e.message);
      }
    }

    res.json(topics);
  } catch (err) {
    console.error('[Analytics Topics Error]:', err.message);
    res.status(500).json({ error: 'Failed to load topic analytics' });
  }
});

router.post('/record', async (req, res) => {
  try {
    const userId = req.user.uid;
    const record = cleanRecordInput(req.body);

    if (record.total === 0 && record.studyTime === 0) {
      return res.json({ success: true, skipped: true });
    }

    try {
      const recordRef = db.collection('analytics').doc(userId);
      const subjRef = db.collection('analytics').doc(userId).collection('subjects').doc(record.subject);
      const topicRef = record.topic ? subjRef.collection('topics').doc(record.topic) : null;

      const batch = db.batch();
      batch.set(recordRef, {
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        totalStudyTime: admin.firestore.FieldValue.increment(record.studyTime),
        totalAttempted: admin.firestore.FieldValue.increment(record.total),
      }, { merge: true });

      if (record.subject) {
        batch.set(subjRef, {
          total: admin.firestore.FieldValue.increment(record.total),
          correct: admin.firestore.FieldValue.increment(record.correct),
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
      }

      if (topicRef) {
        batch.set(topicRef, {
          total: admin.firestore.FieldValue.increment(record.total),
          correct: admin.firestore.FieldValue.increment(record.correct),
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
      }

      await batch.commit();
    } catch (e) {
      console.error('[Analytics] Record write error:', e.message);
    }

    res.json({ success: true });
  } catch (err) {
    console.error('[Analytics Record Error]:', err.message);
    res.status(500).json({ error: 'Failed to record analytics' });
  }
});

router.get('/improvement-plan', async (req, res) => {
  try {
    const userId = req.user.uid;
    const lang = req.query.lang || 'hindi';

    let totalStudyTime = 0;
    let overallAccuracy = 0;
    let currentStreak = 0;

    try {
      const doc = await db.collection('analytics').doc(userId).get();
      if (doc.exists) {
        const o = doc.data();
        totalStudyTime = o.totalStudyTime || 0;
        overallAccuracy = o.overallAccuracy || 0;
        currentStreak = o.currentStreak || 0;
      }
    } catch (e) {
      console.error('[Analytics] Firestore overview read error:', e.message);
    }

    const subjectScores = {};
    try {
      const snapshot = await db.collection('analytics')
        .doc(userId)
        .collection('subjects')
        .get();
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const total = data.total || 0;
        const correct = data.correct || 0;
        subjectScores[doc.id] = {
          accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
          total: total
        };
      });
    } catch (e) {
      console.error('[Analytics] Firestore subjects read error:', e.message);
    }

    const ai = require('../services/aiManager');
    const plan = await ai.generateImprovementPlan(subjectScores, totalStudyTime, overallAccuracy, currentStreak, lang);

    res.json({ recommendation: plan });
  } catch (err) {
    console.error('[Analytics Improvement Plan Error]:', err.message);
    res.status(500).json({ error: 'Failed to generate improvement plan' });
  }
});

router.post('/improvement-plan', async (req, res) => {
  try {
    const userId = req.user.uid;
    const lang = req.body.lang || 'hindi';

    let totalStudyTime = 0;
    let overallAccuracy = 0;
    let currentStreak = 0;

    try {
      const doc = await db.collection('analytics').doc(userId).get();
      if (doc.exists) {
        const o = doc.data();
        totalStudyTime = o.totalStudyTime || 0;
        overallAccuracy = o.overallAccuracy || 0;
        currentStreak = o.currentStreak || 0;
      }
    } catch (e) {
      console.error('[Analytics] Firestore overview read error:', e.message);
    }

    const subjectScores = {};
    try {
      const snapshot = await db.collection('analytics')
        .doc(userId)
        .collection('subjects')
        .get();
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const total = data.total || 0;
        const correct = data.correct || 0;
        subjectScores[doc.id] = {
          accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
          total: total
        };
      });
    } catch (e) {
      console.error('[Analytics] Firestore subjects read error:', e.message);
    }

    const ai = require('../services/aiManager');
    const plan = await ai.generateImprovementPlan(subjectScores, totalStudyTime, overallAccuracy, currentStreak, lang);

    res.json({
      recommendation: plan,
      focusAreas: Object.keys(subjectScores).slice(0, 2),
      dailyGoal: 'Study 2 hours daily'
    });
  } catch (err) {
    console.error('[Analytics Improvement Plan Error]:', err.message);
    res.status(500).json({ error: 'Failed to generate improvement plan' });
  }
});

module.exports = router;
