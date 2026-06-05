import React, { useState } from 'react';
import { 
  Flame, Trophy, Award, Star, Clock, 
  CheckCircle2, AlertCircle, History, Sparkles, BookOpen, ChevronRight,
  ArrowRight, Target
} from 'lucide-react';
import { ProgressRing } from './syllabus/ProgressRing';

interface PerformanceLog {
  testId?: string;
  subject?: string;
  exam?: string;
  mode: 'quiz' | 'mock' | 'pyq';
  correct?: number;
  wrong?: number;
  skipped?: number;
  score?: number;
  total?: number;
  percent: number;
  timestamp?: string;
  date?: string;
  questions?: any[];
  userAnswers?: (number | null)[];
}

interface ProfileTabProps {
  userName: string;
  userEmail: string;
  streak: number;
  xp: number;
  testsGivenCount: number;
  solvedMcqsCount: number;
  activeExam: any;
  topicProgress: any;
  testHistory: PerformanceLog[];
  serverAnalytics: any;
  onClearProgress: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
  isStaff?: boolean;
  onOpenStaff?: () => void;
  onNavigateToTab?: (tabId: string) => void;
  onReviewTest?: (questions: any[], answers: (number | null)[], subject: string, mode: 'quiz' | 'mock' | 'pyq') => void;
  rankingData?: any;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userName,
  userEmail,
  streak,
  xp,
  testsGivenCount,
  solvedMcqsCount,
  activeExam,
  topicProgress,
  testHistory = [],
  serverAnalytics,
  onClearProgress,
  isAdmin = false,
  onOpenAdmin,
  isStaff = false,
  onOpenStaff,
  onNavigateToTab,
  onReviewTest,
  rankingData
}) => {
  const [showHistoryLimit, setShowHistoryLimit] = useState<number>(5);

  // Normalize test history records to gracefully support both old and new schema fields from Firestore
  const normalizedHistory = (testHistory || []).map((log: any) => {
    const subject = log.subject || log.exam || 'Practice Session';
    const correct = log.correct !== undefined ? log.correct : (log.score !== undefined ? log.score : 0);
    const total = log.total !== undefined ? log.total : (log.correct !== undefined && log.wrong !== undefined ? (log.correct + log.wrong + (log.skipped || 0)) : 5);
    const wrong = log.wrong !== undefined ? log.wrong : (log.score !== undefined ? (total - log.score) : 0);
    const skipped = log.skipped !== undefined ? log.skipped : 0;
    const percent = log.percent !== undefined ? log.percent : (total > 0 ? Math.round((correct / total) * 100) : 0);
    const timestamp = log.timestamp || log.date || new Date().toISOString();
    
    return {
      ...log,
      subject,
      correct,
      wrong,
      skipped,
      percent,
      timestamp
    };
  });

  // 1. Calculate accuracy and study time
  let overallAccuracy = 72; // default
  if (normalizedHistory.length > 0) {
    const totalPercent = normalizedHistory.reduce((sum, log) => sum + log.percent, 0);
    overallAccuracy = Math.round(totalPercent / normalizedHistory.length);
  }

  // Calculate subject completion rates
  const subjectProgressList: { name: string; completed: number; total: number }[] = [];
  let totalTopics = 0;
  let completedTopics = 0;

  if (activeExam?.subjects) {
    activeExam.subjects.forEach((sub: any) => {
      let subTotal = 0;
      let subCompleted = 0;
      sub.chapters?.forEach((chap: any) => {
        chap.topics?.forEach((topic: any) => {
          subTotal++;
          totalTopics++;
          const progress = topicProgress[topic.id];
          if (progress && (progress.status === 'Completed' || progress.status === 'Revised')) {
            subCompleted++;
            completedTopics++;
          }
        });
      });
      // Handle flat topics (legacy subjects from older schemas)
      if (subTotal === 0 && sub.topics) {
        sub.topics.forEach((topic: any) => {
          subTotal++;
          totalTopics++;
          const progress = topicProgress[topic.id];
          if (progress && (progress.status === 'Completed' || progress.status === 'Revised')) {
            subCompleted++;
            completedTopics++;
          }
        });
      }
      subjectProgressList.push({
        name: sub.name,
        completed: subCompleted,
        total: subTotal
      });
    });
  }

  // Define student classifications matching the intelligence service
  const classification = serverAnalytics?.profileClassification || 'regular_learner';
  const classLabels: Record<string, string> = {
    highly_consistent: '🔥 Highly Consistent Student',
    fast_learner: '⚡ Fast Learner',
    slow_learner: '🐢 Steady & Persistent Learner',
    revision_focused: '🔄 Revision-Focused Learner',
    practice_focused: '📝 Practice-Focused Learner',
    at_risk: '⚠️ At-Risk Student',
    regular_learner: '🎓 Regular Learner'
  };

  // 2. Compute Strong vs Weak Subjects from Test History
  const subjectAccuracyMap: Record<string, { sum: number; count: number }> = {};
  normalizedHistory.forEach(log => {
    if (!subjectAccuracyMap[log.subject]) {
      subjectAccuracyMap[log.subject] = { sum: 0, count: 0 };
    }
    subjectAccuracyMap[log.subject].sum += log.percent;
    subjectAccuracyMap[log.subject].count += 1;
  });

  const strongSubjects: string[] = [];
  const focusSubjects: string[] = [];

  Object.entries(subjectAccuracyMap).forEach(([name, data]) => {
    const avg = data.sum / data.count;
    if (avg >= 75) strongSubjects.push(name);
    else if (avg < 55) focusSubjects.push(name);
  });

  // Seed default strong/weak subjects if history is thin
  if (normalizedHistory.length === 0 && activeExam?.subjects) {
    strongSubjects.push(activeExam.subjects[0]?.name || 'General Studies');
    if (activeExam.subjects[1]) {
      focusSubjects.push(activeExam.subjects[1].name);
    }
  }

  // 3. Weekly MCQ practice volume (rolling last 7 calendar days ending today)
  const localWeeklyData = [0, 0, 0, 0, 0, 0, 0];
  const localDaysMap: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    localDaysMap[dateStr] = i;
  }

  normalizedHistory.forEach((log: any) => {
    if (!log.timestamp) return;
    try {
      const dateStr = new Date(log.timestamp).toISOString().split('T')[0];
      if (localDaysMap[dateStr] !== undefined) {
        const qCount = (log.correct || 0) + (log.wrong || 0) + (log.skipped || 0);
        localWeeklyData[localDaysMap[dateStr]] += qCount > 0 ? qCount : (log.total || 0);
      }
    } catch (err) {
      console.warn('Error parsing log timestamp for weekly volume:', err);
    }
  });

  // Prioritize server analytics weekly volume, fallback to local test history calculations
  const weeklyVolume = serverAnalytics?.weeklyMcqVolume || serverAnalytics?.metrics?.weeklyMcqVolume || localWeeklyData;
  const maxWeeklyValue = Math.max(...weeklyVolume, 1);

  // Generate day names dynamically for a rolling 7-day view (ending today)
  const daysOfWeek: string[] = [];
  const daysLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    daysOfWeek.push(daysLetters[d.getDay()]);
  }

  // Rank calculation logic
  const getRankInfo = (userXp: number) => {
    if (userXp < 100) {
      return {
        title: 'Novice Aspirant / नवसिखिया',
        nextTitle: 'Dedicated Explorer / खोजकर्ता',
        minXp: 0,
        maxXp: 100,
        badge: '🌱'
      };
    } else if (userXp < 500) {
      return {
        title: 'Dedicated Explorer / खोजकर्ता',
        nextTitle: 'Scholarly Mind / विद्वान',
        minXp: 100,
        maxXp: 500,
        badge: '🔍'
      };
    } else if (userXp < 1500) {
      return {
        title: 'Scholarly Mind / विद्वान',
        nextTitle: 'MCQ Master / मास्टर',
        minXp: 500,
        maxXp: 1500,
        badge: '🎓'
      };
    } else if (userXp < 3000) {
      return {
        title: 'MCQ Master / मास्टर',
        nextTitle: 'Guru Acharya / आचार्य',
        minXp: 1500,
        maxXp: 3000,
        badge: '👑'
      };
    } else {
      return {
        title: 'Guru Acharya / आचार्य',
        nextTitle: 'Ultimate Legend',
        minXp: 3000,
        maxXp: 100000,
        badge: '✨'
      };
    }
  };

  const rankInfo = getRankInfo(xp);
  const rankProgress = rankInfo.maxXp === 100000 ? 100 : Math.round(((xp - rankInfo.minXp) / (rankInfo.maxXp - rankInfo.minXp)) * 100);

  // Achievements/Badges mapping
  const achievements = [
    {
      id: 'first_step',
      name: 'First Step / पहला कदम',
      desc: 'Complete your first practice test.',
      unlocked: testsGivenCount > 0,
      icon: '🚀',
      color: 'from-blue-500/15 to-indigo-500/15 border-blue-500/25 text-blue-400'
    },
    {
      id: 'streak_3',
      name: 'Consistency King / निरंतरता सम्राट',
      desc: 'Maintain a study streak of 3+ days.',
      unlocked: streak >= 3,
      icon: '🔥',
      color: 'from-orange-500/15 to-red-500/15 border-orange-500/25 text-orange-400'
    },
    {
      id: 'mcq_50',
      name: 'Practice Guru / अभ्यास गुरु',
      desc: 'Solve 50 or more practice questions.',
      unlocked: solvedMcqsCount >= 50,
      icon: '📚',
      color: 'from-amber-500/15 to-yellow-500/15 border-amber-500/25 text-yellow-400'
    },
    {
      id: 'accuracy_75',
      name: 'Accuracy Master / सटीकता मास्टर',
      desc: 'Achieve over 75% average test accuracy.',
      unlocked: overallAccuracy >= 75 && testsGivenCount >= 1,
      icon: '🎯',
      color: 'from-emerald-500/15 to-teal-500/15 border-emerald-500/25 text-emerald-400'
    },
    {
      id: 'syllabus_50',
      name: 'Scholar / विद्वान',
      desc: 'Acquire 500+ XP points in study sessions.',
      unlocked: xp >= 500,
      icon: '🎓',
      color: 'from-purple-500/15 to-pink-500/15 border-purple-500/25 text-purple-400'
    }
  ];

  // Leaderboard data resolution
  const isGuest = userEmail === 'guest@studyworld.app';
  const resolvedRank = rankingData?.rank || (isGuest ? 15 : 1);
  const resolvedTotalUsers = rankingData?.totalUsers || (isGuest ? 140 : 1);
  
  const defaultLeaderboard = [
    { displayName: 'Ramesh Patel', points: 340 },
    { displayName: 'Chitra Sahu', points: 280 },
    { displayName: 'Aman Dewangan', points: 210 },
    { displayName: 'Rina Sen', points: 150 },
    { displayName: 'Rahul Verma', points: 95 }
  ];

  let leaderboardList: any[] = [];
  if (rankingData?.leaderboard && rankingData.leaderboard.length > 0) {
    leaderboardList = [...rankingData.leaderboard];
    if (leaderboardList.length < 5) {
      const remainingCount = 5 - leaderboardList.length;
      let added = 0;
      for (const defUsr of defaultLeaderboard) {
        if (added >= remainingCount) break;
        if (!leaderboardList.some(u => u.displayName.toLowerCase() === defUsr.displayName.toLowerCase())) {
          const lastPoints = leaderboardList[leaderboardList.length - 1]?.points || 0;
          leaderboardList.push({
            ...defUsr,
            points: Math.min(defUsr.points, lastPoints > 0 ? lastPoints - 10 : defUsr.points)
          });
          added++;
        }
      }
    }
  } else {
    leaderboardList = defaultLeaderboard;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-lg md:max-w-5xl mx-auto pb-16 font-sans">
      
      {/* 1. Enhanced Profile Header Hero (Spans full width of the desktop dashboard grid) */}
      <div className="md:col-span-12 p-6 md:p-8 bg-gradient-to-br from-bg-s2 via-[#161d2d] to-[#121620] border border-border rounded-xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4.5">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-saffron to-orange-500 border border-saffron-border/30 rounded-full flex items-center justify-center text-2xl font-black select-none text-bg-s1 shrink-0 shadow-lg">
            {(userName || 'Guest')[0].toUpperCase()}
          </div>
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-base md:text-xl font-black text-text leading-tight truncate">{userName || 'Guest User'}</h3>
              <span className="text-[9px] font-black uppercase text-bg-s1 bg-saffron px-2.5 py-0.5 rounded shadow-sm leading-none flex items-center justify-center">
                {classLabels[classification] || 'Aspirant'}
              </span>
            </div>
            <span className="text-xs text-text-muted font-medium tracking-wide truncate">{userEmail || 'guest@studyworld.app'}</span>
            
            {/* Gamified Rank Progress bar */}
            <div className="mt-2.5 flex flex-col gap-1.5 w-64 sm:w-80">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-saffron flex items-center gap-1">
                  <span>{rankInfo.badge}</span>
                  <span className="uppercase tracking-wider">{rankInfo.title}</span>
                </span>
                {rankInfo.maxXp !== 100000 && (
                  <span className="text-text-muted">{rankProgress}%</span>
                )}
              </div>
              {rankInfo.maxXp !== 100000 && (
                <div className="w-full h-1.5 bg-bg-s1/65 rounded-full overflow-hidden border border-border/20 mt-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-saffron to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${rankProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Streak/XP Metrics sidepanel inside hero (Shown only on desktop) */}
        <div className="hidden md:flex items-center gap-6 border-l border-border/80 pl-6 shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-orange-500 leading-none">🔥 {streak} Days</span>
            <span className="text-[8px] font-black text-text-muted uppercase tracking-wider mt-2">Active Streak</span>
          </div>
          <div className="w-px h-8 bg-border/60" />
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-saffron leading-none">✨ {xp}</span>
            <span className="text-[8px] font-black text-text-muted uppercase tracking-wider mt-2">Earned XP</span>
          </div>
          <div className="w-px h-8 bg-border/60" />
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-greenL leading-none">🎯 {overallAccuracy}%</span>
            <span className="text-[8px] font-black text-text-muted uppercase tracking-wider mt-2">Accuracy</span>
          </div>
        </div>
      </div>

      {/* Left Column: Admin Entry, Core Stats, Meters, Diagnostics, Achievements, Settings */}
      <div className="flex flex-col gap-6 md:col-span-7">
        
        {/* Admin Panel Entry Link */}
        {isAdmin && onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="p-4 bg-gradient-to-br from-bg-s2 to-bg-s3 border border-saffron-border/30 hover:border-saffron/50 rounded-xl shadow-lg flex items-center justify-between text-left cursor-pointer transition-all hover:scale-[1.015] duration-200 group relative overflow-hidden shrink-0"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-dim/15 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-saffron/10 border border-saffron-border/30 rounded-lg flex items-center justify-center text-xl text-saffron shrink-0 group-hover:bg-saffron group-hover:text-bg-s1 transition-all duration-300">
                ⚙️
              </div>
              <div className="flex flex-col gap-0.5 truncate">
                <h4 className="text-xs font-black uppercase text-text leading-snug tracking-wider">Admin Control Panel</h4>
                <span className="text-[9px] text-text-muted font-bold truncate">Manage tests, news updates, syllabus parses & AI</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-saffron group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        )}

        {/* Staff Panel Entry Link */}
        {isStaff && onOpenStaff && (
          <button
            onClick={onOpenStaff}
            className="p-4 bg-gradient-to-br from-bg-s2 to-bg-s3 border border-saffron-border/30 hover:border-saffron/50 rounded-xl shadow-lg flex items-center justify-between text-left cursor-pointer transition-all hover:scale-[1.015] duration-200 group relative overflow-hidden shrink-0"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-dim/15 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-saffron/10 border border-saffron-border/30 rounded-lg flex items-center justify-center text-xl text-saffron shrink-0 group-hover:bg-saffron group-hover:text-bg-s1 transition-all duration-300">
                🛡️
              </div>
              <div className="flex flex-col gap-0.5 truncate">
                <h4 className="text-xs font-black uppercase text-text leading-snug tracking-wider">Staff Workspace Panel</h4>
                <span className="text-[9px] text-text-muted font-bold truncate">Manage assigned exam practice sets, syllabus note PDFs & news boards</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-saffron group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        )}

        {/* 2. Core Stats Grid with hover lift and glowing colors */}
        <div className="grid grid-cols-4 gap-3">
          <div className="p-4 bg-bg-s2 border border-border rounded-xl text-center flex flex-col items-center justify-between shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-orange-500/35 hover:shadow-orange-500/5 hover:bg-orange-500/[0.01] group">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500/10 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-base font-black text-text leading-none">{streak}</span>
            <span className="text-[8px] font-black text-text-muted uppercase tracking-widest mt-1.5">Streak</span>
          </div>

          <div className="p-4 bg-bg-s2 border border-border rounded-xl text-center flex flex-col items-center justify-between shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-saffron/35 hover:shadow-saffron/5 hover:bg-saffron/[0.01] group">
            <Trophy className="w-6 h-6 text-saffron fill-saffron/10 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-base font-black text-text leading-none">{testsGivenCount}</span>
            <span className="text-[8px] font-black text-text-muted uppercase tracking-widest mt-1.5">Tests</span>
          </div>

          <div className="p-4 bg-bg-s2 border border-border rounded-xl text-center flex flex-col items-center justify-between shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-greenL/35 hover:shadow-greenL/5 hover:bg-greenL/[0.01] group">
            <Award className="w-6 h-6 text-greenL fill-greenL/10 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-base font-black text-text leading-none">{solvedMcqsCount}</span>
            <span className="text-[8px] font-black text-text-muted uppercase tracking-widest mt-1.5">MCQs</span>
          </div>

          <div className="p-4 bg-bg-s2 border border-border rounded-xl text-center flex flex-col items-center justify-between shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-blue-400/35 hover:shadow-blue-400/5 hover:bg-blue-400/[0.01] group">
            <Star className="w-6 h-6 text-blue-400 fill-blue-400/10 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-base font-black text-text leading-none">{xp}</span>
            <span className="text-[8px] font-black text-text-muted uppercase tracking-widest mt-1.5">XP Points</span>
          </div>
        </div>

        {/* 4. Time and Performance meters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-bg-s2 border border-border rounded-xl flex items-center gap-4 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-saffron-dim/10 rounded-full blur-xl pointer-events-none" />
            <ProgressRing percentage={overallAccuracy} size={50} strokeWidth={4.5} />
            <div className="flex flex-col truncate">
              <span className="text-[8px] font-black uppercase text-saffron tracking-wider">ACCURACY RATE</span>
              <span className="text-sm font-black text-text mt-1">{overallAccuracy}%</span>
              <span className="text-[9px] text-text-muted mt-0.5">Avg test score</span>
            </div>
          </div>

          <div className="p-4 bg-bg-s2 border border-border rounded-xl flex items-center gap-4 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/25 rounded-lg text-blue-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-[8px] font-black uppercase text-blue-400 tracking-wider">STUDY MINUTES</span>
              <span className="text-sm font-black text-text mt-1">
                {Math.max(15, Math.round(solvedMcqsCount * 1.5 + testsGivenCount * 20))} mins
              </span>
              <span className="text-[9px] text-text-muted mt-0.5">Logged practice</span>
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5 border-b border-border pb-2.5">
            <Award className="w-4 h-4 text-saffron" />
            <span>Unlocked Badges & Achievements / उपलब्धियां</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {achievements.map((ach) => (
              <div 
                key={ach.id}
                className={`p-3 border rounded-xl flex items-center gap-3 transition-all duration-300 relative overflow-hidden ${
                  ach.unlocked 
                    ? `bg-gradient-to-br ${ach.color} hover:scale-[1.02] shadow` 
                    : 'bg-bg-s3/40 border-border/30 opacity-40 grayscale select-none'
                }`}
              >
                {ach.unlocked && (
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/5 rounded-full blur-md" />
                )}
                
                <span className="text-2xl shrink-0 filter drop-shadow">{ach.icon}</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-black text-text uppercase tracking-wide truncate">{ach.name}</span>
                  <span className="text-[9px] text-text-muted mt-0.5 leading-snug">{ach.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Diagnostics: Strong & Weak Areas */}
        <div className="grid grid-cols-2 gap-4">
          {/* Strong Areas */}
          <div className="p-4 bg-[#121c17] border border-greenL/15 rounded-xl shadow-md flex flex-col gap-2.5">
            <h5 className="text-[10px] font-black uppercase text-greenL flex items-center gap-1.5 border-b border-greenL/10 pb-1.5 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-greenL" />
              <span>Strong subjects</span>
            </h5>
            <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
              {strongSubjects.map((name, idx) => (
                <span key={idx} className="text-xs font-bold text-greenL bg-greenL/5 px-2 py-1.5 rounded border border-greenL/10 truncate" title={name}>
                  ✓ {name}
                </span>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div className="p-4 bg-[#201316] border border-redL/15 rounded-xl shadow-md flex flex-col gap-2.5">
            <h5 className="text-[10px] font-black uppercase text-redL flex items-center gap-1.5 border-b border-redL/10 pb-1.5 shrink-0">
              <AlertCircle className="w-3.5 h-3.5 text-redL" />
              <span>Focus subjects</span>
            </h5>
            <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
              {focusSubjects.map((name, idx) => (
                <span key={idx} className="text-xs font-bold text-redL bg-redL/5 px-2 py-1.5 rounded border border-redL/10 truncate" title={name}>
                  ⚠ {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Action card */}
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-3">
          <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5 border-b border-border pb-2.5">
            <span>Account Settings / सेटिंग्स</span>
          </h4>
          <p className="text-[10px] text-text-muted leading-relaxed">
            Purging local progress will clear your Streak, earned XP points, and locally stored test performance histories. This cannot be undone.
          </p>
          <button 
            onClick={onClearProgress}
            className="w-full mt-1.5 py-3 border border-red-500/25 hover:border-red-500 text-redL hover:bg-red-500/10 text-xs font-black uppercase rounded-lg cursor-pointer transition-all duration-200"
          >
            Clear All Local Progress
          </button>
        </div>
      </div>

      {/* Right Column: Syllabus Progress, Chart, Leaderboard, Test History, AI Coach */}
      <div className="flex flex-col gap-6 md:col-span-5">
        
        {/* 3. Syllabus completion lists */}
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-3">
          <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5 border-b border-border pb-2.5">
            <BookOpen className="w-4 h-4 text-saffron" />
            <span>Syllabus Completion Tracker</span>
          </h4>
          
          <div className="flex flex-col gap-3.5 mt-1">
            {subjectProgressList.map((item, idx) => {
              const pct = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
              return (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-text truncate max-w-[180px]">{item.name}</span>
                    <span className="text-text-muted">{item.completed}/{item.total} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-bg-s3 rounded-full overflow-hidden border border-border/40">
                    <div 
                      className="h-full bg-saffron rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Weekly Practice chart (Enhanced with gridlines and gradients) */}
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-dim/5 rounded-full blur-2xl pointer-events-none" />
          <h4 className="text-xs font-black uppercase text-text-muted tracking-wider">Weekly MCQ Volume</h4>
          
          <div className="relative h-32 mt-2">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="w-full border-t border-border/50" />
              <div className="w-full border-t border-border/30" />
              <div className="w-full border-t border-border/20" />
              <div className="w-full border-b border-border/60" />
            </div>

            {/* Bar Chart Container */}
            <div className="absolute inset-0 flex items-end justify-between px-3">
              {weeklyVolume.map((val: number, idx: number) => {
                const h = (val / maxWeeklyValue) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end flex-1 z-10">
                    <div 
                      className="w-5 bg-gradient-to-t from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron rounded-t transition-all duration-300 relative group cursor-pointer shadow-sm hover:shadow-orange-500/20"
                      style={{ height: `${Math.max(4, h)}%` }}
                    >
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-bg-s1 border border-border text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-1.5 font-bold text-saffron whitespace-nowrap z-20 pointer-events-none shadow-xl">
                        {val} MCQs
                      </span>
                    </div>
                    <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">{daysOfWeek[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global Leaderboard Card */}
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-dim/5 rounded-full blur-2xl pointer-events-none" />
          <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5 border-b border-border pb-2.5">
            <Trophy className="w-4 h-4 text-saffron" />
            <span>Aspirants Leaderboard / रैंकिंग</span>
          </h4>

          <div className="flex flex-col bg-[#121620] border border-saffron-border/10 p-3 rounded-lg text-center items-center justify-center shrink-0">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Your Global Rank</span>
            <span className="text-xl font-black text-saffron mt-1">
              🏆 Rank {resolvedRank} of {resolvedTotalUsers}
            </span>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            {leaderboardList.map((usr: any, idx: number) => {
              const isSelf = usr.displayName === userName || (idx + 1 === resolvedRank && usr.points === xp);
              return (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                    isSelf 
                      ? 'bg-saffron/10 border border-saffron-border/30 font-bold text-saffron' 
                      : 'bg-bg-s3/45 border border-border/40 text-text-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-black uppercase shrink-0 ${
                      idx === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/25' :
                      idx === 1 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/25' :
                      idx === 2 ? 'bg-amber-600/20 text-amber-500 border border-amber-600/25' :
                      'bg-bg-s1 border border-border'
                    }`}>
                      #{idx + 1}
                    </span>
                    <span className="truncate">{usr.displayName}</span>
                  </div>
                  <span className="font-bold shrink-0">{usr.points} XP</span>
                </div>
              );
            })}

            {/* If user is not in top 5, render their rank row at the bottom */}
            {resolvedRank > leaderboardList.length && (
              <>
                <div className="text-center text-text-muted text-[10px] py-0.5 tracking-wider font-bold">•••</div>
                <div className="p-2.5 rounded-lg flex items-center justify-between text-xs bg-saffron/10 border border-saffron-border/30 font-bold text-saffron">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black bg-saffron text-bg-s1 shrink-0">
                      #{resolvedRank}
                    </span>
                    <span className="truncate">{userName}</span>
                  </div>
                  <span className="font-bold shrink-0">{xp} XP</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 7. Detailed Performance Mock History */}
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-3">
          <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5 border-b border-border pb-2.5">
            <History className="w-4 h-4 text-saffron" />
            <span>Detailed Performance History</span>
          </h4>

          {normalizedHistory.length === 0 ? (
            <div className="text-center py-6 text-xs text-text-muted">
              No test attempts completed yet. Take practice quizzes to populate history log.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                {normalizedHistory.slice(0, showHistoryLimit).map((log, idx) => {
                  const hasQuestions = log.questions && log.questions.length > 0;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (hasQuestions && onReviewTest) {
                          onReviewTest(log.questions, log.userAnswers || [], log.subject, log.mode);
                        } else if (!hasQuestions) {
                          alert("This legacy test log does not have saved question data for review.");
                        }
                      }}
                      disabled={!hasQuestions}
                      className={`w-full text-left p-3 bg-bg-s3 border border-border rounded-lg flex items-center justify-between text-xs font-semibold gap-3 transition-all ${
                        hasQuestions 
                          ? 'hover:bg-bg-s2 hover:border-saffron-border/60 hover:scale-[1.01] cursor-pointer' 
                          : 'opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex flex-col truncate">
                        <span className="text-text truncate leading-tight flex items-center gap-1.5">
                          {log.subject}
                          {hasQuestions && (
                            <span className="text-[8px] bg-saffron-dim/40 text-saffron border border-saffron-border/30 px-1 py-0.2 rounded font-black uppercase">
                              Review
                            </span>
                          )}
                        </span>
                        <span className="text-[9px] text-text-muted mt-1.5 font-bold uppercase tracking-wider leading-none">
                          {log.mode} • C:{log.correct} W:{log.wrong} S:{log.skipped}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`font-black ${
                          log.percent >= 75 ? 'text-greenL' :
                          log.percent >= 55 ? 'text-saffron' :
                          'text-redL'
                        }`}>
                          {log.percent}%
                        </span>
                        <span className="text-[9px] text-text-muted font-normal">
                          {new Date(log.timestamp).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short'
                          })}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {(normalizedHistory.length > showHistoryLimit || showHistoryLimit > 5) && (
                <div className="flex gap-2 w-full">
                  {normalizedHistory.length > showHistoryLimit && (
                    <button
                      onClick={() => setShowHistoryLimit(prev => prev + 5)}
                      className="flex-1 text-center py-2 bg-bg-s3 border border-border text-[9px] font-black uppercase text-text-muted hover:text-text rounded cursor-pointer transition-colors"
                    >
                      Show More Logs
                    </button>
                  )}
                  {showHistoryLimit > 5 && (
                    <button
                      onClick={() => setShowHistoryLimit(5)}
                      className="flex-1 text-center py-2 bg-bg-s3 border border-border text-[9px] font-black uppercase text-text-muted hover:text-text rounded cursor-pointer transition-colors"
                    >
                      Show Less
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 8. AI Recommendations Coaching tips (Premium Glowing Overhaul) */}
        <div className="p-6 bg-gradient-to-br from-bg-s2 via-[#161d2d] to-[#121620] border border-saffron-border/30 rounded-2xl shadow-2xl flex flex-col gap-4 relative overflow-hidden">
          {/* Glowing background circles for modern premium appearance */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-saffron-dim/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-center border-b border-border/60 pb-3 shrink-0">
            <h4 className="text-xs font-black uppercase text-text tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saffron animate-pulse" />
              <span>AI Study Intelligence Coach</span>
            </h4>
            <span className="text-[9px] font-black uppercase text-saffron bg-saffron-dim/20 px-2 py-0.5 rounded border border-saffron-border/20">
              Active Analysis
            </span>
          </div>
          
          {/* Main Persona Banner */}
          <div className="p-4 bg-bg-s3/80 border border-saffron-border/10 rounded-xl flex flex-col gap-2 relative">
            <span className="text-[8px] font-black uppercase text-saffron tracking-widest flex items-center gap-1">
              <span>🤖</span>
              <span>Personal Coach Insight</span>
            </span>
            <p className="leading-relaxed text-xs text-text-muted">
              {normalizedHistory.length > 0 
                ? `Your average score is ${overallAccuracy}%. Based on your recent responses, you show excellent dedication! However, to secure top ranks in ${activeExam?.name || 'CGPSC'}, focus on weak topics. We have created a custom list of study plans for you below.`
                : `To start your personalized smart preparation path for ${activeExam?.name || 'CGPSC'}, take a quick practice quiz. This helps our AI tutor map your learning persona and design custom revision intervals for you.`
              }
            </p>
          </div>

          {/* Detailed Action Steps */}
          <div className="flex flex-col gap-3.5 mt-2">
            <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">Actionable Next Steps</span>
            
            {/* Recommendation 1: Weak Subject Practice */}
            {focusSubjects.length > 0 && (
              <div className="p-4 bg-bg-s3/40 hover:bg-bg-s3/65 border border-border hover:border-saffron-border/30 rounded-xl transition-all hover:scale-[1.01] duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-redL/15 border border-redL/20 rounded-lg flex items-center justify-center shrink-0 text-redL font-bold">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-text uppercase">Strengthen Focus Subject</span>
                      <span className="text-[8px] font-black text-redL bg-redL/10 px-1.5 py-0.5 rounded uppercase leading-none">High Priority</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      Your average accuracy in <strong className="text-text">{focusSubjects[0]}</strong> is below 55%. Complete a focused practice test to build confidence.
                    </p>
                  </div>
                </div>
                {onNavigateToTab && (
                  <button 
                    onClick={() => onNavigateToTab('practice')}
                    className="px-3.5 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors shadow flex items-center gap-1 self-start sm:self-center shrink-0"
                  >
                    <span>Practice Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Recommendation 2: Spaced Repetition */}
            <div className="p-4 bg-bg-s3/40 hover:bg-bg-s3/65 border border-border hover:border-saffron-border/30 rounded-xl transition-all hover:scale-[1.01] duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-500/15 border border-blue-500/20 rounded-lg flex items-center justify-center shrink-0 text-blue-400 font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-text uppercase">Active Recall Revision</span>
                    <span className="text-[8px] font-black text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded uppercase leading-none">Recommended</span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    Prevent forgetting! Go to the Syllabus page to view topics currently scheduled for spaced repetition review.
                  </p>
                </div>
              </div>
              {onNavigateToTab && (
                <button 
                  onClick={() => onNavigateToTab('syllabus')}
                  className="px-3.5 py-2 bg-bg-s1 hover:bg-bg-s1/90 border border-border text-text text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors flex items-center gap-1 self-start sm:self-center shrink-0"
                >
                  <span>View Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5 text-saffron" />
                </button>
              )}
            </div>

            {/* Recommendation 3: Daily Streak consistency */}
            <div className="p-4 bg-bg-s3/40 hover:bg-bg-s3/65 border border-border hover:border-saffron-border/30 rounded-xl transition-all hover:scale-[1.01] duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-orange-500/15 border border-orange-500/20 rounded-lg flex items-center justify-center shrink-0 text-orange-400 font-bold">
                  <Flame className="w-5 h-5 fill-orange-500/10" />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-text uppercase">Daily Consistency Booster</span>
                    <span className="text-[8px] font-black text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded uppercase leading-none">Daily Goal</span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    {streak > 0 
                      ? `You are on a beautiful ${streak}-day study streak! Complete any topic activity or practice test today to extend it.` 
                      : `Start your daily revision habits. Complete any study activity or practice test today to establish a study streak!`
                    }
                  </p>
                </div>
              </div>
              {onNavigateToTab && (
                <button 
                  onClick={() => onNavigateToTab('chat')}
                  className="px-3.5 py-2 bg-bg-s1 hover:bg-bg-s1/90 border border-border text-text text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors flex items-center gap-1 self-start sm:self-center shrink-0"
                >
                  <span>Ask AI Guru</span>
                  <ArrowRight className="w-3.5 h-3.5 text-saffron" />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
