const express = require('express');
const router = express.Router();
const { admin, db } = require('../firebase-admin');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');

router.use(verifyFirebaseToken);

router.get('/data', async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.user.uid).get();
    res.json(doc.exists ? doc.data() : {});
  } catch (err) {
    console.error('[User Data] Read error:', err.message);
    res.json({});
  }
});

router.post('/sync', async (req, res) => {
  try {
    const { testResults, points, mcqsSolved, streak, subjects, progress } = req.body;

    // Build update object — only overwrite fields that have real data
    // This prevents an empty local state from wiping out existing server data
    const update = {};

    if (Array.isArray(testResults) && testResults.length > 0) update.testResults = testResults;
    if (typeof points === 'number' && points > 0) update.points = points;
    if (typeof mcqsSolved === 'number' && mcqsSolved > 0) update.mcqsSolved = mcqsSolved;
    if (streak && streak.count > 0) update.streak = streak;
    if (subjects && Object.keys(subjects).length > 0) update.subjects = subjects;
    if (progress && Object.keys(progress).length > 0) update.progress = progress;

    update.updatedAt = admin.firestore.FieldValue.serverTimestamp();

    if (Object.keys(update).length <= 1) {
      // Only updatedAt — nothing meaningful to sync
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
