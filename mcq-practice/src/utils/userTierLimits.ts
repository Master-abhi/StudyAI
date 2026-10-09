export interface DailyUsage {
  date: string; // YYYY-MM-DD
  mockTestsCount: number;
  mcqsCount: number;
  aiQuestionsCount: number;
}

export const FREE_LIMITS = {
  MAX_DAILY_MOCK_TESTS: 3,
  MAX_DAILY_MCQS: 30,
  MAX_DAILY_AI_QUESTIONS: 3,
  MAX_TOPICS_PER_SUBJECT: 3,
} as const;

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const STORAGE_KEY = 'cgguru_daily_usage_v1';

export function getDailyUsage(): DailyUsage {
  const today = getTodayDateString();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: DailyUsage = JSON.parse(raw);
      if (parsed.date === today) {
        return {
          date: today,
          mockTestsCount: Number(parsed.mockTestsCount) || 0,
          mcqsCount: Number(parsed.mcqsCount) || 0,
          aiQuestionsCount: Number(parsed.aiQuestionsCount) || 0
        };
      }
    }
  } catch (e) {
    console.warn('[userTierLimits] Failed to read daily usage:', e);
  }

  const fresh: DailyUsage = {
    date: today,
    mockTestsCount: 0,
    mcqsCount: 0,
    aiQuestionsCount: 0
  };
  saveDailyUsage(fresh);
  return fresh;
}

export function saveDailyUsage(usage: DailyUsage): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  } catch (e) {
    console.warn('[userTierLimits] Failed to save daily usage:', e);
  }
}

export function incrementDailyMockTests(): DailyUsage {
  const usage = getDailyUsage();
  usage.mockTestsCount += 1;
  saveDailyUsage(usage);
  return usage;
}

export function incrementDailyMcqs(count: number = 1): DailyUsage {
  const usage = getDailyUsage();
  usage.mcqsCount += count;
  saveDailyUsage(usage);
  return usage;
}

export function incrementDailyAiQuestions(): DailyUsage {
  const usage = getDailyUsage();
  usage.aiQuestionsCount += 1;
  saveDailyUsage(usage);
  return usage;
}

export function canTakeMockTest(plan: 'free' | 'paid'): boolean {
  if (plan === 'paid') return true;
  const usage = getDailyUsage();
  return usage.mockTestsCount < FREE_LIMITS.MAX_DAILY_MOCK_TESTS;
}

export function getRemainingMockTests(plan: 'free' | 'paid'): number {
  if (plan === 'paid') return Infinity;
  const usage = getDailyUsage();
  return Math.max(0, FREE_LIMITS.MAX_DAILY_MOCK_TESTS - usage.mockTestsCount);
}

export function canSolveMcq(plan: 'free' | 'paid'): boolean {
  if (plan === 'paid') return true;
  const usage = getDailyUsage();
  return usage.mcqsCount < FREE_LIMITS.MAX_DAILY_MCQS;
}

export function getRemainingMcqs(plan: 'free' | 'paid'): number {
  if (plan === 'paid') return Infinity;
  const usage = getDailyUsage();
  return Math.max(0, FREE_LIMITS.MAX_DAILY_MCQS - usage.mcqsCount);
}

export function canAskAiQuestion(plan: 'free' | 'paid'): boolean {
  if (plan === 'paid') return true;
  const usage = getDailyUsage();
  return usage.aiQuestionsCount < FREE_LIMITS.MAX_DAILY_AI_QUESTIONS;
}

export function getRemainingAiQuestions(plan: 'free' | 'paid'): number {
  if (plan === 'paid') return Infinity;
  const usage = getDailyUsage();
  return Math.max(0, FREE_LIMITS.MAX_DAILY_AI_QUESTIONS - usage.aiQuestionsCount);
}

export function isTopicUnlocked(topicIndexInSubject: number, plan: 'free' | 'paid'): boolean {
  if (plan === 'paid') return true;
  return topicIndexInSubject < FREE_LIMITS.MAX_TOPICS_PER_SUBJECT;
}
