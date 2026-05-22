const express = require('express');
const router = express.Router();
const { admin, db } = require('../firebase-admin');

function getUserId(req) {
  const uid = req.headers['x-user-id'];
  return uid || 'anonymous';
}

router.get('/overview', async (req, res) => {
  try {
    const userId = getUserId(req);

    let data = {
      overallAccuracy: 0,
      totalAttempted: 0,
      totalStudyTime: 0,
      currentStreak: 0,
      weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
    };

    if (userId !== 'anonymous') {
      try {
        const doc = await db.collection('analytics').doc(userId).get();
        if (doc.exists) {
          data = { ...data, ...doc.data() };
        }
      } catch (e) {
        console.error('[Analytics] Firestore read error:', e.message);
      }
    }

    res.json(data);
  } catch (err) {
    console.error('[Analytics Overview Error]:', err.message);
    res.status(500).json({ error: 'Failed to load analytics overview' });
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const userId = getUserId(req);
    let subjects = [];

    if (userId !== 'anonymous') {
      try {
        const snapshot = await db.collection('analytics')
          .doc(userId)
          .collection('subjects')
          .get();
        subjects = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) {
        console.error('[Analytics] Subjects read error:', e.message);
      }
    }

    res.json(subjects);
  } catch (err) {
    console.error('[Analytics Subjects Error]:', err.message);
    res.status(500).json({ error: 'Failed to load subject analytics' });
  }
});

router.get('/topics', async (req, res) => {
  try {
    const userId = getUserId(req);
    const subject = req.query.subject;
    let topics = [];

    if (userId !== 'anonymous' && subject) {
      try {
        const snapshot = await db.collection('analytics')
          .doc(userId)
          .collection('subjects')
          .doc(subject)
          .collection('topics')
          .get();
        topics = snapshot.docs.map(d => ({ name: d.id, ...d.data() }));
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
    const userId = getUserId(req);
    const { subject, topic, correct, total, studyTime } = req.body;

    if (userId !== 'anonymous') {
      try {
        const ref = db.collection('analytics').doc(userId);
        await ref.set({
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
          totalStudyTime: admin.firestore.FieldValue.increment(studyTime || 0),
          totalAttempted: admin.firestore.FieldValue.increment(total || 0),
        }, { merge: true });
      } catch (e) {
        console.error('[Analytics] Record write error:', e.message);
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('[Analytics Record Error]:', err.message);
    res.status(500).json({ error: 'Failed to record analytics' });
  }
});

router.post('/improvement-plan', async (req, res) => {
  try {
    const userId = getUserId(req);
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
