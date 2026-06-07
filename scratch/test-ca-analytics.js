// Mock data simulation for News Analytics logic test
const mockInteractions = [
  // Article 1: Read multiple times, MCQ attempted twice (latest is better score)
  {
    activityType: 'read',
    articleId: 'article_1',
    articleTitle: 'CGPSC Notification Update',
    timeSpentSeconds: 30,
    timestamp: { toMillis: () => 1700000000000 }
  },
  {
    activityType: 'read',
    articleId: 'article_1',
    articleTitle: 'CGPSC Notification Update',
    timeSpentSeconds: 40,
    timestamp: { toMillis: () => 1700000100000 }
  },
  {
    activityType: 'mcq_attempt',
    articleId: 'article_1',
    articleTitle: 'CGPSC Notification Update',
    timeSpentSeconds: 60,
    mcqScore: { correct: 1, total: 3 },
    timestamp: { toMillis: () => 1700000200000 }
  },
  {
    activityType: 'mcq_attempt',
    articleId: 'article_1',
    articleTitle: 'CGPSC Notification Update',
    timeSpentSeconds: 50,
    mcqScore: { correct: 3, total: 3 }, // Latest attempt (perfect score)
    timestamp: { toMillis: () => 1700000300000 }
  },

  // Article 2: Bookmarked, flashcards revised twice
  {
    activityType: 'bookmark',
    articleId: 'article_2',
    articleTitle: 'Tribal Welfare Policies',
    timeSpentSeconds: 5,
    timestamp: { toMillis: () => 1700000400000 }
  },
  {
    activityType: 'bookmark',
    articleId: 'article_2',
    articleTitle: 'Tribal Welfare Policies',
    timeSpentSeconds: 5,
    timestamp: { toMillis: () => 1700000500000 }
  },
  {
    activityType: 'flashcard_revise',
    articleId: 'article_2',
    articleTitle: 'Tribal Welfare Policies',
    timeSpentSeconds: 15,
    timestamp: { toMillis: () => 1700000600000 }
  },
  {
    activityType: 'flashcard_revise',
    articleId: 'article_2',
    articleTitle: 'Tribal Welfare Policies',
    timeSpentSeconds: 10,
    timestamp: { toMillis: () => 1700000700000 }
  },
];

// Logic extracted from news.js
function calculateAnalytics(docs) {
  const uniqueReads = new Set();
  const uniqueBookmarks = new Set();
  const uniqueFlashcards = new Set();
  const mcqLatestScoreMap = new Map();
  let totalTimeSpent = 0;

  docs.forEach(doc => {
    const data = doc; // In firestore this is doc.data()
    totalTimeSpent += data.timeSpentSeconds || 0;
    
    const articleKey = data.articleId || data.articleTitle;
    if (!articleKey) return;
    
    if (data.activityType === 'read') {
      uniqueReads.add(articleKey);
    } else if (data.activityType === 'bookmark') {
      uniqueBookmarks.add(articleKey);
    } else if (data.activityType === 'mcq_attempt') {
      let timestampMs = 0;
      if (data.timestamp) {
        if (typeof data.timestamp.toMillis === 'function') {
          timestampMs = data.timestamp.toMillis();
        } else if (data.timestamp.seconds !== undefined) {
          timestampMs = data.timestamp.seconds * 1000;
        } else if (data.timestamp instanceof Date) {
          timestampMs = data.timestamp.getTime();
        } else if (typeof data.timestamp === 'string') {
          timestampMs = Date.parse(data.timestamp) || 0;
        } else if (typeof data.timestamp === 'number') {
          timestampMs = data.timestamp;
        }
      }
      
      const existing = mcqLatestScoreMap.get(articleKey);
      if (!existing || timestampMs > existing.timestampMs) {
        mcqLatestScoreMap.set(articleKey, {
          correct: data.mcqScore?.correct || 0,
          total: data.mcqScore?.total || 0,
          timestampMs
        });
      }
    } else if (data.activityType === 'flashcard_revise') {
      uniqueFlashcards.add(articleKey);
    }
  });

  const readCount = uniqueReads.size;
  const bookmarkCount = uniqueBookmarks.size;
  const mcqAttempts = mcqLatestScoreMap.size;
  const flashcardsRevised = uniqueFlashcards.size;
  
  let mcqCorrectSum = 0;
  let mcqTotalSum = 0;
  
  for (const score of mcqLatestScoreMap.values()) {
    mcqCorrectSum += score.correct;
    mcqTotalSum += score.total;
  }
  
  const masteryScore = mcqTotalSum > 0 ? Math.round((mcqCorrectSum / mcqTotalSum) * 100) : 70;
  const retentionScore = Math.min(100, Math.max(30, Math.round(50 + (readCount * 2) + (flashcardsRevised * 5) - (bookmarkCount * 1.5))));
  const revisionCoverageScore = bookmarkCount > 0 ? Math.min(100, Math.round((flashcardsRevised / bookmarkCount) * 100)) : 80;
  const readinessScore = Math.round(0.4 * masteryScore + 0.3 * retentionScore + 0.3 * revisionCoverageScore);

  return {
    readCount,
    bookmarkCount,
    mcqAttempts,
    flashcardsRevised,
    totalTimeSpent,
    metrics: {
      masteryScore,
      retentionScore,
      revisionCoverageScore,
      readinessScore
    }
  };
}

const result = calculateAnalytics(mockInteractions);
console.log('Resulting Analytics:', JSON.stringify(result, null, 2));

// Assertions to verify correctness
console.log('\n--- VERIFICATION ASSERTIONS ---');
console.log('1. Read count should be 1 (unique article_1):', result.readCount === 1 ? 'PASS ✅' : 'FAIL ❌');
console.log('2. Bookmark count should be 1 (unique article_2):', result.bookmarkCount === 1 ? 'PASS ✅' : 'FAIL ❌');
console.log('3. MCQ attempts should be 1 (unique article_1):', result.mcqAttempts === 1 ? 'PASS ✅' : 'FAIL ❌');
console.log('4. Flashcard revised should be 1 (unique article_2):', result.flashcardsRevised === 1 ? 'PASS ✅' : 'FAIL ❌');
console.log('5. Total time spent should sum all items (30+40+60+50+5+5+15+10 = 215):', result.totalTimeSpent === 215 ? 'PASS ✅' : 'FAIL ❌');
console.log('6. Mastery score should be 100% (since article_1 latest MCQ attempt is 3/3):', result.metrics.masteryScore === 100 ? 'PASS ✅' : 'FAIL ❌');
console.log('7. Retention score calculation matches formula:', result.metrics.retentionScore === 56 ? 'PASS ✅' : 'FAIL ❌'); // 50 + 1*2 + 1*5 - 1*1.5 = 55.5 -> round = 56
console.log('8. Revision coverage score is 100% (flashcardsRevised / bookmarkCount = 1 / 1):', result.metrics.revisionCoverageScore === 100 ? 'PASS ✅' : 'FAIL ❌');
console.log('9. Readiness score calculation matches weightage (40% * 100 + 30% * 56 + 30% * 100 = 40 + 16.8 + 30 = 86.8 -> round = 87):', result.metrics.readinessScore === 87 ? 'PASS ✅' : 'FAIL ❌');
