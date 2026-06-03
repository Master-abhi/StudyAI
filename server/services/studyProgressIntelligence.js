/**
 * Syllabus & Study Progress Intelligence calculations engine
 * Handles scoring formulas, spaced repetition schedules, profile classifiers, and predictive metrics.
 */

const { admin, db } = require('../firebase-admin');

// Constant configurations matching our system design
const TARGET_GK_RESPONSE_TIME_MS = 45 * 1000; // 45 seconds target for general knowledge
const GUESSING_TIME_THRESHOLD_MS = 4 * 1000;   // 4 seconds threshold for guessing behavior detection

/**
 * Calculates the Topic Mastery Score (TMS).
 * TMS = 0.50 * Accuracy + 0.25 * Coverage + 0.15 * SpeedFactor + 0.10 * RevisionFactor
 */
function calculateTopicMastery(accuracy, notesRead, videoWatched, mcqsAttempted, averageResponseTimeMs, revisionCount, guessingRatio) {
  // 1. Accuracy (0 to 100)
  const accScore = accuracy || 0;

  // 2. Material Coverage (0 to 100)
  const notesWeight = notesRead ? 40 : 0;
  const videoWeight = videoWatched ? 30 : 0;
  const mcqWeight = mcqsAttempted ? 30 : 0;
  const coverageScore = notesWeight + videoWeight + mcqWeight;

  // 3. Speed Factor (0 to 100)
  let speedScore = 100;
  if (averageResponseTimeMs && averageResponseTimeMs > 0) {
    const diff = Math.abs(averageResponseTimeMs - TARGET_GK_RESPONSE_TIME_MS);
    speedScore = Math.max(0, (1 - diff / TARGET_GK_RESPONSE_TIME_MS) * 100);
  }

  // Devaluate speed score if guessing behavior ratio is high (e.g. >20% of attempts are guesses)
  if (guessingRatio > 0.2) {
    speedScore = speedScore * (1 - guessingRatio);
  }

  // 4. Revision Factor (0 to 100)
  const revisionScore = Math.min(100, (revisionCount || 0) * 25);

  // Overall weighted score
  const finalTMS = (0.50 * accScore) + (0.25 * coverageScore) + (0.15 * speedScore) + (0.10 * revisionScore);
  return Math.min(100, Math.max(0, Math.round(finalTMS)));
}

/**
 * Checks for guessing behavior on a single MCQ attempt.
 */
function checkIsGuess(responseTimeMs, isCorrect) {
  // If user solves a question in less than 4 seconds, they are likely guessing
  return responseTimeMs < GUESSING_TIME_THRESHOLD_MS;
}

/**
 * Calculates spaced repetition parameters using an SM-2 inspired Ebbinghaus algorithm.
 * Returns { easeFactor, halfLifeHours, nextRevisionDate }
 */
function calculateSpacedRepetition(currentRepetitionCount, prevEaseFactor, prevHalfLifeHours, recentAccuracy) {
  let easeFactor = prevEaseFactor || 2.5;
  let halfLifeHours = prevHalfLifeHours || 24; // 24 hours initial

  // Map accuracy to quality grade (q) on a scale of 0 to 5
  let q = 0;
  if (recentAccuracy >= 90) q = 5;
  else if (recentAccuracy >= 75) q = 4;
  else if (recentAccuracy >= 60) q = 3;
  else if (recentAccuracy >= 50) q = 2;
  else if (recentAccuracy >= 30) q = 1;

  // Adjust Ease Factor (EF)
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  easeFactor = Math.min(3.0, Math.max(1.3, easeFactor)); // Clamp

  // Calculate new half-life (H)
  if (q >= 3) {
    // Success: scale interval
    if (currentRepetitionCount === 0) {
      halfLifeHours = 24; // 1 day
    } else if (currentRepetitionCount === 1) {
      halfLifeHours = 72; // 3 days
    } else {
      halfLifeHours = Math.round(prevHalfLifeHours * easeFactor);
    }
  } else {
    // Failure: decay interval
    halfLifeHours = Math.max(12, Math.round(prevHalfLifeHours * 0.5));
  }

  // Calculate next revision date
  const nextDate = new Date();
  nextDate.setHours(nextDate.getHours() + halfLifeHours);

  return {
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    halfLifeHours,
    nextRevisionDate: nextDate
  };
}

/**
 * Calculates Exam Readiness Score (ERS).
 * ERS = 0.35 * SyllabusCompletion + 0.30 * AverageMastery + 0.20 * MockTestAccuracy + 0.10 * ConsistencyIndex + 0.05 * RevisionCoverage
 */
function calculateExamReadiness(completionRate, averageMastery, mockTestAccuracy, consistencyIndex, revisionCoverage) {
  const comp = completionRate || 0;
  const mastery = averageMastery || 0;
  const mock = mockTestAccuracy || 60; // fallback default
  const consistency = consistencyIndex || 50; // fallback default
  const rev = revisionCoverage || 0;

  const score = (0.35 * comp) + (0.30 * mastery) + (0.20 * mock) + (0.10 * consistency) + (0.05 * rev);
  return Math.min(100, Math.max(0, Math.round(score)));
}

/**
 * Classifies the student study profile based on their learning metrics.
 */
function classifyStudentProfile(weeklyMinutes, studyStreak, completionRate, averageAccuracy, revisionRatio, masteryTrend) {
  // Highly consistent learner
  if (studyStreak >= 7 && weeklyMinutes >= 300) {
    return 'highly_consistent';
  }
  
  // At-Risk student (idle and low performance)
  if (studyStreak === 0 && averageAccuracy < 50 && completionRate > 0) {
    return 'at_risk';
  }

  // Revision-focused (regular recap attempts)
  if (revisionRatio > 0.5) {
    return 'revision_focused';
  }

  // Practice-focused (solves lots of MCQs relative to learning materials)
  if (revisionRatio < 0.15 && averageAccuracy > 0) {
    return 'practice_focused';
  }

  // Fast learner (rapidly increases mastery trend with steady accuracy)
  if (masteryTrend > 15 && averageAccuracy >= 75) {
    return 'fast_learner';
  }

  // Slow learner (takes time to build mastery, but maintains progress)
  if (masteryTrend > 0 && masteryTrend <= 5 && averageAccuracy >= 60) {
    return 'slow_learner';
  }

  return 'regular_learner';
}

/**
 * Run predictions for the student profile:
 * Expected score, rank, qualification probability, and completion forecast.
 */
function predictExamOutcomes(readinessScore, selectedExamId, totalTopicsCount, completedTopicsCount, historicalAccuracy) {
  const accuracy = historicalAccuracy || 60;
  
  // 1. Qualification Probability
  let qualProb = 0.1 + (readinessScore / 100) * 0.85;
  if (accuracy > 75) qualProb += 0.05;
  qualProb = Math.min(0.99, Math.max(0.01, qualProb));

  // 2. Expected Score (e.g. out of 200 marks)
  const maxScore = selectedExamId === 'cgpsc_sse' ? 200 : 150;
  let expScore = maxScore * (accuracy / 100) * (0.8 + 0.2 * (completedTopicsCount / totalTopicsCount));
  expScore = Math.min(maxScore, Math.max(0, Math.round(expScore)));

  // 3. Expected Rank (Simulated based on readinessScore percentiles)
  // Higher readiness gives lower rank numbers (meaning 1st, 10th rank)
  let expRank = 50000;
  if (readinessScore > 90) {
    expRank = Math.round(1 + (100 - readinessScore) * 15); // Rank 1 to 150
  } else if (readinessScore > 75) {
    expRank = Math.round(151 + (90 - readinessScore) * 60); // Rank 151 to 1050
  } else if (readinessScore > 50) {
    expRank = Math.round(1051 + (75 - readinessScore) * 200); // Rank 1051 to 6000
  } else {
    expRank = Math.round(6001 + (50 - readinessScore) * 1000);
  }

  // 4. Forecast Date for syllabus completion (in days)
  const remaining = totalTopicsCount - completedTopicsCount;
  const studyPace = completedTopicsCount > 0 ? (completedTopicsCount / 10) : 1; // topics completed per day average
  const daysToComplete = Math.max(1, Math.round(remaining / Math.max(0.5, studyPace)));

  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + daysToComplete);

  return {
    qualificationProbability: parseFloat(qualProb.toFixed(2)),
    predictedScore: expScore,
    predictedRank: expRank,
    completionForecastDate: completionDate
  };
}

module.exports = {
  calculateTopicMastery,
  checkIsGuess,
  calculateSpacedRepetition,
  calculateExamReadiness,
  classifyStudentProfile,
  predictExamOutcomes
};
