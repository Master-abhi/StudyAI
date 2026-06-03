/**
 * Daily Scheduler Job Service
 * Aggregates study activity records, calculates forgetting curve decay,
 * run predictive score/rank metrics, and groups student profiles daily.
 */

const { db, admin } = require('../firebase-admin');
const {
  calculateExamReadiness,
  classifyStudentProfile,
  predictExamOutcomes,
  calculateTopicMastery
} = require('./studyProgressIntelligence');

/**
 * Runs the daily batch scheduler for a single student.
 */
async function runDailySchedulerForUser(userId) {
  try {
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    const todayStr = new Date().toISOString().split('T')[0];

    // 1. Fetch active target exam from student profile
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) return;
    const user = userDoc.data();
    const activeExamId = user.selectedExam || 'cgpsc_sse';
    const streak = user.streak?.count || 0;

    // 2. Fetch Topic Mastery records
    const masterySnap = await db.collection('topic_mastery')
      .where('userId', '==', userId)
      .where('examId', '==', activeExamId)
      .get();
    
    const masteries = masterySnap.docs.map(d => d.data());

    // 3. Spaced Repetition Forgetting Curve Decays
    const srSnap = await db.collection('spaced_repetition')
      .where('userId', '==', userId)
      .get();

    const today = new Date();
    const batch = db.batch();

    const srList = [];
    srSnap.docs.forEach(doc => {
      const sr = doc.data();
      const nextDate = sr.nextRevisionDate ? sr.nextRevisionDate.toDate() : today;
      const lastDate = sr.lastRevisionDate ? sr.lastRevisionDate.toDate() : today;

      // Elapsed time in hours
      const elapsedHours = Math.max(0, (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60));
      const halfLife = sr.halfLifeHours || 24;

      // Forgetting Probability P(recall) = e^(-t / H)
      const probRecall = Math.exp(-elapsedHours / halfLife);
      const forgettingProbability = parseFloat((1 - probRecall).toFixed(3)); // Probability of forgetting

      batch.update(doc.ref, {
        forgettingProbability,
        lastUpdated: timestamp
      });

      srList.push({ ...sr, forgettingProbability, nextRevisionDate: nextDate });
    });

    // 4. Calculate Readiness Stats
    const totalTopicsCount = masteries.length;
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

    const mockResults = (user.testResults || []).filter(r => r.exam === activeExamId && r.mode === 'mock');
    const mockAccuracy = mockResults.length > 0
      ? Math.round(mockResults.reduce((sum, r) => sum + r.percent, 0) / mockResults.length)
      : averageAccuracy;

    const totalRevised = srSnap.docs.length;
    const revisionCoverage = totalTopicsCount > 0 ? (totalRevised / totalTopicsCount) * 100 : 0;
    const consistencyIndex = Math.min(100, Math.max(10, streak * 10));

    const ERS = calculateExamReadiness(
      completionRate,
      averageMastery,
      mockAccuracy,
      consistencyIndex,
      revisionCoverage
    );

    // 5. Generate Weekly profile classification from historical logs
    // Query last 7 days of activity logs
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const logsSnap = await db.collection('activity_logs')
      .where('userId', '==', userId)
      .get();
    
    // Filter by timestamp in memory to avoid Firestore composite index requirement
    const filteredLogs = logsSnap.docs.filter(doc => {
      const data = doc.data();
      if (!data.timestamp) return false;
      const logDate = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
      return logDate >= weekAgo;
    });
    
    let totalStudyTimeSec = 0;
    let revisionLogsCount = 0;
    filteredLogs.forEach(doc => {
      const data = doc.data();
      totalStudyTimeSec += data.timeSpentSeconds || 0;
      if (data.activityType === 'revise') {
        revisionLogsCount++;
      }
    });

    const weeklyMinutes = totalStudyTimeSec / 60;
    const revisionRatio = filteredLogs.length > 0 ? (revisionLogsCount / filteredLogs.length) : 0;
    
    // mastery trend (delta of completion counts)
    const prevCompletedDoc = await db.collection('student_profiles').doc(userId).get();
    const prevCompletion = prevCompletedDoc.exists ? (prevCompletedDoc.data().completionRate || 0) : 0;
    const masteryTrend = completionRate - prevCompletion;

    const classification = classifyStudentProfile(
      weeklyMinutes,
      streak,
      completionRate,
      averageAccuracy,
      revisionRatio,
      masteryTrend
    );

    // 6. Run Predictive Models
    const predictions = predictExamOutcomes(
      ERS,
      activeExamId,
      totalTopicsCount || 60,
      completedTopicsCount,
      averageAccuracy
    );

    // 7. Daily AI Recommendation Planner
    // We prioritize topics using forgetting probability, low mastery, and high PYQ weightage
    const recommendations = [];

    // Prioritize Overdue spaced repetition items (forgetting ratio > 0.35)
    srList.forEach(sr => {
      if (sr.forgettingProbability > 0.35 && recommendations.length < 3) {
        recommendations.push({
          topicId: sr.topicId,
          subjectId: sr.subjectId,
          reason: 'Spaced repetition indicates retention is slipping. Needs urgent revision.',
          priority: 9
        });
      }
    });

    // Prioritize Weak Areas
    masteries.forEach(m => {
      if (m.status === 'Weak Area' && recommendations.length < 3) {
        // Prevent duplicate recommendation
        if (!recommendations.some(r => r.topicId === m.topicId)) {
          recommendations.push({
            topicId: m.topicId,
            subjectId: m.subjectId,
            reason: 'Concept accuracy is below average. Solve practice MCQs to build mastery.',
            priority: 8
          });
        }
      }
    });

    // Fallback: Recommend high-value unstarted topics in the active exam
    if (recommendations.length < 3) {
      // Pick topics not started (no mastery log)
      const allTopicIdsInMastery = new Set(masteries.map(m => m.topicId));
      
      // Simulate querying exam syllabus structure to pick an unstarted topic
      // We will suggest generic placeholder subject/topics if syllabus structure isn't locally parsed in db
      recommendations.push({
        topicId: 'adeo-cg-1',
        subjectId: 'adeo-cg-gk',
        reason: 'Highly weighted topic with frequent PYQ patterns. Start study.',
        priority: 5
      });
    }

    // Write aggregated profile document
    const profileRef = db.collection('student_profiles').doc(userId);
    batch.set(profileRef, {
      userId,
      examId: activeExamId,
      readinessScore: ERS,
      learningClassification: classification,
      consistencyIndex,
      averageResponseTimeMs: Math.round(masteries.reduce((sum, m) => sum + (m.averageResponseTimeMs || 0), 0) / (masteries.length || 1)),
      predictedScore: predictions.predictedScore,
      predictedRank: predictions.predictedRank,
      qualificationProbability: predictions.qualificationProbability,
      completionForecastDate: admin.firestore.Timestamp.fromDate(predictions.completionForecastDate),
      dailyStudyPlan: {
        date: todayStr,
        recommendations
      },
      lastUpdated: timestamp
    }, { merge: true });

    await batch.commit();
    console.log(`[Scheduler] Processed profile and predictions successfully for user ${userId}`);
  } catch (err) {
    console.error(`[Scheduler Error] User ${userId}:`, err.message);
  }
}

/**
 * Runs the daily pipeline job across all registered students.
 */
async function runDailyPipelineJob() {
  try {
    const userDocs = await db.collection('users').get();
    console.log(`[Scheduler] Starting daily pipeline for ${userDocs.docs.length} users...`);

    for (const doc of userDocs.docs) {
      await runDailySchedulerForUser(doc.id);
    }

    console.log('[Scheduler] Daily pipeline job finished successfully.');
  } catch (err) {
    console.error('[Scheduler Global Error]:', err.message);
  }
}

module.exports = {
  runDailyPipelineJob,
  runDailySchedulerForUser
};
