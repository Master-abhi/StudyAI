const express = require('express');
const router = express.Router();
const { admin, db } = require('../firebase-admin');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');

router.use(verifyFirebaseToken);

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

      res.json(topics);
  } catch (err) {
    console.error('[Analytics Topics Error]:', err.message);
    res.status(500).json({ error: 'Failed to load topic analytics' });
  }
});

router.post('/record', async (req, res) => {
  try {
    const userId = req.user.uid;
    const { subject, topic, examId, questionId, isCorrect, timeTaken, correct, total, studyTime } = req.body;

    try {
      const recordRef = db.collection('analytics').doc(userId);
      const subjRef = db.collection('analytics').doc(userId).collection('subjects').doc(subject || 'General');
      const topicRef = subjRef.collection('topics').doc(topic || 'General');

      const batch = db.batch();
      batch.set(recordRef, {
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        totalStudyTime: admin.firestore.FieldValue.increment(studyTime || timeTaken || 0),
        totalAttempted: admin.firestore.FieldValue.increment(total || (isCorrect !== undefined ? 1 : 0)),
      }, { merge: true });

      if (subject) {
        batch.set(subjRef, {
          total: admin.firestore.FieldValue.increment(total || (isCorrect !== undefined ? 1 : 0)),
          correct: admin.firestore.FieldValue.increment(correct || (isCorrect ? 1 : 0)),
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
      }

      if (topic) {
        batch.set(topicRef, {
          total: admin.firestore.FieldValue.increment(total || (isCorrect !== undefined ? 1 : 0)),
          correct: admin.firestore.FieldValue.increment(correct || (isCorrect ? 1 : 0)),
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

router.post('/improvement-plan', async (req, res) => {
  try {
    const userId = req.user.uid;
    const plan = {
      focusAreas: ['General Awareness', 'Quantitative Aptitude'],
      dailyGoal: 'Study 2 hours daily',
      recommendation: 'Focus on weak subjects identified in your analytics',
    };

    res.json(plan);
  } catch (err) {
    console.error('[Analytics Improvement Plan Error]:', err.message);
    res.status(500).json({ error: 'Failed to generate improvement plan' });
  }
});

module.exports = router;
