const express = require('express');
const router = express.Router();
const { admin, db } = require('../firebase-admin');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');

// Import calculations engine
const {
  calculateTopicMastery,
  checkIsGuess,
  calculateSpacedRepetition,
  calculateExamReadiness,
  predictExamOutcomes
} = require('../services/studyProgressIntelligence');

const { runDailyPipelineJob } = require('../services/dailySchedulerJob');

// Expose public cron / scheduler webhook before global verifyFirebaseToken middleware
router.post('/run-daily-job', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const clientSecret = req.query.secret || (authHeader && authHeader.split(' ')[1]);
    const serverSecret = process.env.CRON_SECRET || 'super-secret-cron-key-1234';

    if (clientSecret !== serverSecret) {
      return res.status(401).json({ error: 'Unauthorized: Invalid cron secret' });
    }

    console.log('[API Scheduler Hook] Executing daily pipeline job manually via endpoint...');
    await runDailyPipelineJob();
    res.json({ success: true, message: 'Daily pipeline job executed successfully' });
  } catch (err) {
    console.error('[API Scheduler Hook Error]:', err.message);
    res.status(500).json({ error: 'Failed to run daily pipeline job' });
  }
});

router.use(verifyFirebaseToken);

/**
 * Endpoint: Log general activity events (opened topic, read notes, watched video)
 */
router.post('/log-event', async (req, res) => {
  try {
    const userId = req.user.uid;
    const { examId, activityType, subjectId, topicId, timeSpentSeconds } = req.body;

    if (!examId || !activityType || !subjectId || !topicId) {
      return res.status(400).json({ error: 'Missing required event fields' });
    }

    const duration = parseInt(timeSpentSeconds) || 0;
    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    // 1. Log detailed history event
    const logRef = db.collection('activity_logs').doc();
    const batch = db.batch();
    batch.set(logRef, {
      userId,
      examId,
      activityType,
      subjectId,
      topicId,
      timeSpentSeconds: duration,
      timestamp
    });

    // 2. Increment topic progress totals
    const masteryRef = db.collection('topic_mastery').doc(`${userId}_${topicId}`);
    const updatePayload = {
      userId,
      examId,
      subjectId,
      topicId,
      lastUpdated: timestamp
    };

    if (activityType === 'read_notes') {
      updatePayload.notesReadCount = admin.firestore.FieldValue.increment(1);
    } else if (activityType === 'watch_video') {
      updatePayload.videosWatchedCount = admin.firestore.FieldValue.increment(1);
    }

    batch.set(masteryRef, updatePayload, { merge: true });

    // Commit updates
    await batch.commit();

    // 3. Re-evaluate topic status and recalculate mastery
    const currentDoc = await masteryRef.get();
    const cur = currentDoc.exists ? currentDoc.data() : {};
    
    const accuracy = cur.accuracy || 0;
    const notesCount = (cur.notesReadCount || 0) + (activityType === 'read_notes' ? 1 : 0);
    const videoCount = (cur.videosWatchedCount || 0) + (activityType === 'watch_video' ? 1 : 0);
    const mcqsCount = cur.totalMcqsAttempted || 0;
    const avgResponseTime = cur.averageResponseTimeMs || 0;
    const revisionCount = cur.revisionCount || 0;
    const guessingAttempts = cur.guessingAttemptsCount || 0;
    const guessingRatio = mcqsCount > 0 ? guessingAttempts / mcqsCount : 0;

    const newMastery = calculateTopicMastery(
      accuracy,
      notesCount > 0,
      videoCount > 0,
      mcqsCount > 0,
      avgResponseTime,
      revisionCount,
      guessingRatio
    );

    // Calculate new status
    let status = 'In Progress';
    if (newMastery >= 75) status = 'Completed';
    else if (newMastery < 50 && mcqsCount >= 5) status = 'Weak Area';

    await masteryRef.update({
      masteryScore: newMastery,
      status
    });

    res.json({ success: true, masteryScore: newMastery, status });
  } catch (err) {
    console.error('[Event Log Error]:', err.message);
    res.status(500).json({ error: 'Failed to log activity event' });
  }
});

/**
 * Endpoint: Log MCQ Attempt metrics (correctness, response time, guesses)
 */
router.post('/log-mcq-attempt', async (req, res) => {
  try {
    const userId = req.user.uid;
    const {
      examId, subjectId, topicId, questionId,
      difficulty, answerSelected, correctIndex,
      isCorrect, responseTimeMs, attemptCount
    } = req.body;

    if (!examId || !topicId || !questionId) {
      return res.status(400).json({ error: 'Missing attempt parameters' });
    }

    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    const isGuess = checkIsGuess(responseTimeMs, isCorrect);

    // 1. Log attempt
    const attemptRef = db.collection('mcq_attempts').doc();
    const batch = db.batch();
    batch.set(attemptRef, {
      userId,
      examId,
      subjectId,
      topicId,
      questionId,
      difficulty,
      answerSelected,
      correctIndex,
      isCorrect,
      responseTimeMs: responseTimeMs || 0,
      attemptCount: attemptCount || 1,
      isGuess,
      timestamp
    });

    // 2. Fetch current mastery aggregates
    const masteryRef = db.collection('topic_mastery').doc(`${userId}_${topicId}`);
    const doc = await masteryRef.get();
    const cur = doc.exists ? doc.data() : {};

    // Calculate new averages
    const prevAttempted = cur.totalMcqsAttempted || 0;
    const prevCorrect = cur.mcqsCorrect || 0;
    
    const newAttempted = prevAttempted + 1;
    const newCorrect = prevCorrect + (isCorrect ? 1 : 0);
    const newAccuracy = Math.round((newCorrect / newAttempted) * 100);

    const prevAvgTime = cur.averageResponseTimeMs || 0;
    const newAvgTime = Math.round(((prevAvgTime * prevAttempted) + (responseTimeMs || 0)) / newAttempted);

    const prevGuesses = cur.guessingAttemptsCount || 0;
    const newGuesses = prevGuesses + (isGuess ? 1 : 0);

    // Calculate updated mastery
    const notesRead = (cur.notesReadCount || 0) > 0;
    const videoWatched = (cur.videosWatchedCount || 0) > 0;
    const revisionCount = cur.revisionCount || 0;
    const guessingRatio = newGuesses / newAttempted;

    const newMastery = calculateTopicMastery(
      newAccuracy,
      notesRead,
      videoWatched,
      true, // MCQ attempted is true
      newAvgTime,
      revisionCount,
      guessingRatio
    );

    // Determine status
    let status = 'In Progress';
    if (newMastery >= 75) status = 'Completed';
    else if (newMastery < 50 && newAttempted >= 5) status = 'Weak Area';

    batch.set(masteryRef, {
      userId,
      examId,
      subjectId,
      topicId,
      totalMcqsAttempted: newAttempted,
      mcqsCorrect: newCorrect,
      accuracy: newAccuracy,
      averageResponseTimeMs: newAvgTime,
      guessingAttemptsCount: newGuesses,
      masteryScore: newMastery,
      status,
      lastUpdated: timestamp
    }, { merge: true });

    await batch.commit();

    res.json({
      success: true,
      masteryScore: newMastery,
      accuracy: newAccuracy,
      status,
      isGuess
    });
  } catch (err) {
    console.error('[MCQ Log Error]:', err.message);
    res.status(500).json({ error: 'Failed to log MCQ attempt details' });
  }
});

/**
 * Endpoint: Register Revision Checkpoint (Spaced Repetition Trigger)
 */
router.post('/log-revision', async (req, res) => {
  try {
    const userId = req.user.uid;
    const { topicId, subjectId, recentAccuracy } = req.body;

    if (!topicId || !subjectId) {
      return res.status(400).json({ error: 'Missing topic or subject reference' });
    }

    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    const srRef = db.collection('spaced_repetition').doc(`${userId}_${topicId}`);
    const srDoc = await srRef.get();
    const sr = srDoc.exists ? srDoc.data() : {};

    const repCount = (sr.repetitionCount || 0) + 1;
    const prevEase = sr.easeFactor || 2.5;
    const prevHalfLife = sr.halfLifeHours || 24;

    const { easeFactor, halfLifeHours, nextRevisionDate } = calculateSpacedRepetition(
      repCount,
      prevEase,
      prevHalfLife,
      recentAccuracy || 80
    );

    const batch = db.batch();
    batch.set(srRef, {
      userId,
      topicId,
      subjectId,
      lastRevisionDate: timestamp,
      nextRevisionDate: admin.firestore.Timestamp.fromDate(nextRevisionDate),
      easeFactor,
      halfLifeHours,
      repetitionCount: repCount,
      forgettingProbability: 0.1, // Reset probability since just revised
      lastUpdated: timestamp
    }, { merge: true });

    // Update revision factor in Topic Mastery
    const masteryRef = db.collection('topic_mastery').doc(`${userId}_${topicId}`);
    const masteryDoc = await masteryRef.get();
    const cur = masteryDoc.exists ? masteryDoc.data() : {};

    const prevRevisions = cur.revisionCount || 0;
    const newRevisions = prevRevisions + 1;

    const newMastery = calculateTopicMastery(
      cur.accuracy || 0,
      (cur.notesReadCount || 0) > 0,
      (cur.videosWatchedCount || 0) > 0,
      (cur.totalMcqsAttempted || 0) > 0,
      cur.averageResponseTimeMs || 0,
      newRevisions,
      (cur.guessingAttemptsCount || 0) / (cur.totalMcqsAttempted || 1)
    );

    batch.set(masteryRef, {
      revisionCount: newRevisions,
      masteryScore: newMastery,
      status: 'Revised',
      lastUpdated: timestamp
    }, { merge: true });

    await batch.commit();

    res.json({
      success: true,
      masteryScore: newMastery,
      nextRevision: nextRevisionDate
    });
  } catch (err) {
    console.error('[Revision Log Error]:', err.message);
    res.status(500).json({ error: 'Failed to record spaced repetition checkpoint' });
  }
});

/**
 * Endpoint: Get Student Analytics overview (Calculates readiness, predictions and classifies profile)
 */
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.user.uid;
    const selectedExamId = req.query.examId || 'cgpsc_sse';

    // 1. Fetch user data (streak, logs)
    const userDoc = await db.collection('users').doc(userId).get();
    const user = userDoc.exists ? userDoc.data() : {};
    const streak = user.streak?.count || 0;

    // 2. Fetch all topic masteries for this exam
    const masterySnap = await db.collection('topic_mastery')
      .where('userId', '==', userId)
      .where('examId', '==', selectedExamId)
      .get();

    const masteries = masterySnap.docs.map(d => d.data());

    // Merge historical progress from users collection to avoid missing completed topics
    const historicalProgress = user.progress?.[selectedExamId] || {};
    const masteryMap = {};
    masteries.forEach(m => {
      masteryMap[m.topicId] = m;
    });

    Object.entries(historicalProgress).forEach(([topicId, completed]) => {
      if (completed === true) {
        if (!masteryMap[topicId]) {
          const migratedMastery = {
            userId,
            examId: selectedExamId,
            topicId,
            status: 'Completed',
            notesReadCount: 1,
            videosWatchedCount: 1,
            totalMcqsAttempted: 1,
            accuracy: 80,
            averageResponseTimeMs: 25000,
            guessingAttemptsCount: 0,
            masteryScore: 80,
            lastUpdated: new Date().toISOString()
          };
          masteries.push(migratedMastery);
          masteryMap[topicId] = migratedMastery;
        } else {
          const existing = masteryMap[topicId];
          if (existing.status !== 'Completed' && existing.status !== 'Revised') {
            existing.status = 'Completed';
            existing.notesReadCount = Math.max(existing.notesReadCount || 0, 1);
            existing.videosWatchedCount = Math.max(existing.videosWatchedCount || 0, 1);
            existing.totalMcqsAttempted = Math.max(existing.totalMcqsAttempted || 0, 1);
            existing.accuracy = Math.max(existing.accuracy || 0, 80);
            existing.masteryScore = Math.max(existing.masteryScore || 0, 80);
          }
        }
      }
    });

    // Fetch true total topics in the exam's syllabus (from Firestore 'syllabi' or default fallback)
    let totalTopicsCount = 0;
    try {
      const syllabusDoc = await db.collection('syllabi').doc(selectedExamId).get();
      if (syllabusDoc.exists) {
        const syllabusData = syllabusDoc.data();
        if (syllabusData.subjects && Array.isArray(syllabusData.subjects)) {
          syllabusData.subjects.forEach(sub => {
            if (sub.chapters && Array.isArray(sub.chapters)) {
              sub.chapters.forEach(chap => {
                if (chap.topics && Array.isArray(chap.topics)) {
                  totalTopicsCount += chap.topics.length;
                }
              });
            } else if (sub.topics && Array.isArray(sub.topics)) {
              totalTopicsCount += sub.topics.length;
            }
          });
        }
      }
    } catch (e) {
      console.warn('[Dashboard Metrics] Error querying syllabi collection:', e.message);
    }

    // Fallback default counts if not found in db
    if (totalTopicsCount === 0) {
      if (selectedExamId === 'cgpsc_sse') {
        totalTopicsCount = 29;
      } else if (selectedExamId === 'cgv_patwari') {
        totalTopicsCount = 4;
      } else if (selectedExamId === 'cgv_master') {
        totalTopicsCount = 385;
      } else if (selectedExamId === 'cg_police_si') {
        totalTopicsCount = 1;
      } else {
        totalTopicsCount = Math.max(1, masteries.length); // fallback
      }
    }

    const completedTopicsCount = masteries.filter(m => m.status === 'Completed' || m.status === 'Revised').length;
    const weakTopicsCount = masteries.filter(m => m.status === 'Weak Area').length;
    
    let accuracySum = 0;
    let accuracyCount = 0;
    let masterySum = 0;

    masteries.forEach(m => {
      masterySum += m.masteryScore || 0;
      if (m.accuracy && m.accuracy > 0) {
        accuracySum += m.accuracy;
        accuracyCount++;
      }
    });

    const completionRate = totalTopicsCount > 0 ? (completedTopicsCount / totalTopicsCount) * 100 : 0;
    const averageMastery = totalTopicsCount > 0 ? (masterySum / totalTopicsCount) : 0;
    const averageAccuracy = accuracyCount > 0 ? (accuracySum / accuracyCount) : 70;

    // Mock test average accuracy
    const mockResults = (user.testResults || []).filter(r => r.exam === selectedExamId && r.mode === 'mock');
    const mockAccuracy = mockResults.length > 0
      ? Math.round(mockResults.reduce((sum, r) => sum + r.percent, 0) / mockResults.length)
      : averageAccuracy;

    // Revision coverage
    const revSnap = await db.collection('spaced_repetition')
      .where('userId', '==', userId)
      .get();
    const totalRevised = revSnap.docs.length;
    const revisionCoverage = totalTopicsCount > 0 ? (totalRevised / totalTopicsCount) * 100 : 0;

    // Consistency Index (streak based)
    const consistencyIndex = Math.min(100, Math.max(10, streak * 10));

    // Calculate overall readiness
    const ERS = calculateExamReadiness(
      completionRate,
      averageMastery,
      mockAccuracy,
      consistencyIndex,
      revisionCoverage
    );

    // Get predictions
    const predictions = predictExamOutcomes(
      ERS,
      selectedExamId,
      totalTopicsCount || 50,
      completedTopicsCount,
      averageAccuracy
    );

    // Calculate weekly MCQ volume (last 7 rolling calendar days, index 0 is 6 days ago, index 6 is today)
    const weeklyMcqVolume = [0, 0, 0, 0, 0, 0, 0];
    const daysMap = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().split('T')[0];
      daysMap[dateStr] = i;
    }

    try {
      const mcqSnap = await db.collection('mcq_attempts')
        .where('userId', '==', userId)
        .get();

      mcqSnap.docs.forEach(doc => {
        const data = doc.data();
        if (!data.timestamp) return;
        const attemptDate = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
        const dateStr = attemptDate.toISOString().split('T')[0];
        if (daysMap[dateStr] !== undefined) {
          weeklyMcqVolume[daysMap[dateStr]]++;
        }
      });
    } catch (e) {
      console.error('[Dashboard Metrics] Weekly MCQ volume read error:', e.message);
    }

    // Profile Classification
    const profileDoc = await db.collection('student_profiles').doc(userId).get();
    const currentProfile = profileDoc.exists ? profileDoc.data() : {};

    res.json({
      metrics: {
        readinessScore: ERS,
        completionRate: parseFloat(completionRate.toFixed(2)),
        averageMastery: parseFloat(averageMastery.toFixed(2)),
        averageAccuracy,
        revisionCoverage: parseFloat(revisionCoverage.toFixed(2)),
        consistencyIndex,
        completedCount: completedTopicsCount,
        weakCount: weakTopicsCount,
        totalTopics: totalTopicsCount,
        weeklyMcqVolume
      },
      weeklyMcqVolume,
      predictions,
      profileClassification: currentProfile.learningClassification || 'regular_learner',
      dailyStudyPlan: currentProfile.dailyStudyPlan || null,
      masteries,
      spacedRepetitions: revSnap.docs.map(d => d.data())
    });
  } catch (err) {
    console.error('[Dashboard Metrics Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve progress dashboard' });
  }
});

module.exports = router;
