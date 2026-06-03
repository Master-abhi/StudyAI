import React, { useState } from 'react';
import { 
  Flame, Trophy, Award, Star, Clock, 
  CheckCircle2, AlertCircle, History, Sparkles, BookOpen, ChevronRight 
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
  onOpenAdmin
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

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto pb-16 font-sans">
      
      {/* 1. Profile Badge Banner */}
      <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-lg relative overflow-hidden flex items-center gap-4">
        <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-dim/10 rounded-full blur-2xl pointer-events-none" />
        <div className="w-14 h-14 bg-saffron-dim/30 border border-saffron-border/30 rounded-full flex items-center justify-center text-2xl select-none text-saffron shrink-0">
          👤
        </div>
        <div className="flex flex-col gap-1 truncate">
          <h3 className="text-base font-black text-text truncate leading-tight">{userName || 'Guest User'}</h3>
          <span className="text-[10px] text-text-muted font-bold tracking-wide truncate">{userEmail || 'guest@studyworld.app'}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[9px] font-black uppercase text-bg-s1 bg-saffron px-1.5 py-0.5 rounded">
              {classLabels[classification] || 'Aspirant'}
            </span>
          </div>
        </div>
      </div>

      {/* Admin Panel Entry Link */}
      {isAdmin && onOpenAdmin && (
        <button
          onClick={onOpenAdmin}
          className="p-5 bg-gradient-to-br from-bg-s2 to-bg-s3 border border-saffron-border/30 hover:border-saffron/50 rounded-xl shadow-lg flex items-center justify-between text-left cursor-pointer transition-all hover:scale-[1.015] duration-200 group relative overflow-hidden shrink-0"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-dim/15 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-saffron/10 border border-saffron-border/30 rounded-lg flex items-center justify-center text-xl text-saffron shrink-0 group-hover:bg-saffron group-hover:text-bg-s1 transition-all duration-300">
              ⚙️
            </div>
            <div className="flex flex-col gap-0.5 truncate">
              <h4 className="text-xs font-black uppercase text-text leading-snug tracking-wider">Admin Control Panel</h4>
              <span className="text-[10px] text-text-muted font-bold truncate">Manage tests, news updates, syllabus parses & AI</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-saffron group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      )}

      {/* 2. Core Stats Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <div className="p-3 bg-bg-s2 border border-border rounded-lg text-center flex flex-col items-center justify-between shadow-sm">
          <Flame className="w-5.5 h-5.5 text-orange-500 fill-orange-500/10 mb-1" />
          <span className="text-sm font-black text-text mt-0.5">{streak}</span>
          <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider mt-0.5">Streak</span>
        </div>

        <div className="p-3 bg-bg-s2 border border-border rounded-lg text-center flex flex-col items-center justify-between shadow-sm">
          <Trophy className="w-5.5 h-5.5 text-saffron fill-saffron/10 mb-1" />
          <span className="text-sm font-black text-text mt-0.5">{testsGivenCount}</span>
          <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider mt-0.5">Mock Tests</span>
        </div>

        <div className="p-3 bg-bg-s2 border border-border rounded-lg text-center flex flex-col items-center justify-between shadow-sm">
          <Award className="w-5.5 h-5.5 text-greenL fill-greenL/10 mb-1" />
          <span className="text-sm font-black text-text mt-0.5">{solvedMcqsCount}</span>
          <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider mt-0.5">MCQs</span>
        </div>

        <div className="p-3 bg-bg-s2 border border-border rounded-lg text-center flex flex-col items-center justify-between shadow-sm">
          <Star className="w-5.5 h-5.5 text-blue-400 fill-blue-400/10 mb-1" />
          <span className="text-sm font-black text-text mt-0.5">{xp}</span>
          <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider mt-0.5">XP</span>
        </div>
      </div>

      {/* 3. Syllabus completion lists */}
      <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-3">
        <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-saffron" />
          <span>Syllabus Completion Tracker</span>
        </h4>
        
        <div className="flex flex-col gap-3.5 mt-1">
          {subjectProgressList.map((item, idx) => {
            const pct = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
            return (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-text truncate max-w-[200px]">{item.name}</span>
                  <span className="text-text-muted">{item.completed} / {item.total} topics ({pct})%</span>
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

      {/* 4. Time and Performance meters */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-bg-s2 border border-border rounded-xl flex items-center gap-3.5 shadow-md">
          <ProgressRing percentage={overallAccuracy} size={50} strokeWidth={4.5} />
          <div className="flex flex-col truncate">
            <span className="text-[8px] font-black uppercase text-saffron tracking-wider">ACCURACY RATE</span>
            <span className="text-xs font-black text-text mt-0.5">{overallAccuracy}%</span>
            <span className="text-[9px] text-text-muted">Avg test score</span>
          </div>
        </div>

        <div className="p-4 bg-bg-s2 border border-border rounded-xl flex items-center gap-3 shadow-md">
          <div className="p-2 bg-blue-500/10 border border-blue-500/25 rounded text-blue-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase text-blue-400 tracking-wider">STUDY MINUTES</span>
            <span className="text-xs font-black text-text mt-0.5">
              {Math.max(15, Math.round(solvedMcqsCount * 1.5 + testsGivenCount * 20))} mins
            </span>
            <span className="text-[9px] text-text-muted">Logged practice</span>
          </div>
        </div>
      </div>

      {/* 5. Weekly Practice chart */}
      <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-3">
        <h4 className="text-xs font-black uppercase text-text-muted tracking-wider">Weekly MCQ Volume</h4>
        <div className="flex items-end justify-between h-28 border-b border-border/50 pb-2 pt-4 px-3">
          {weeklyVolume.map((val: number, idx: number) => {
            const h = (val / maxWeeklyValue) * 100;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end flex-1">
                <div 
                  className="w-4 bg-saffron hover:bg-orange-500 rounded-t transition-all duration-300 relative group cursor-pointer"
                  style={{ height: `${Math.max(4, h)}%` }}
                >
                  {/* Tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-bg-s1 border border-border text-[9px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-bold text-saffron whitespace-nowrap z-10 pointer-events-none">
                    {val} Qs
                  </span>
                </div>
                <span className="text-[9px] font-bold text-text-muted">{daysOfWeek[idx]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Diagnostics: Strong & Weak Areas */}
      <div className="grid grid-cols-2 gap-4">
        {/* Strong Areas */}
        <div className="p-4 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-2.5">
          <h5 className="text-[10px] font-black uppercase text-greenL flex items-center gap-1 border-b border-border/40 pb-1.5 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Strong subjects</span>
          </h5>
          <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
            {strongSubjects.map((name, idx) => (
              <span key={idx} className="text-xs font-medium text-text bg-green-500/5 px-2 py-1 rounded border border-green-500/10 truncate" title={name}>
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Focus Areas */}
        <div className="p-4 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-2.5">
          <h5 className="text-[10px] font-black uppercase text-redL flex items-center gap-1 border-b border-border/40 pb-1.5 shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Focus subjects</span>
          </h5>
          <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
            {focusSubjects.map((name, idx) => (
              <span key={idx} className="text-xs font-medium text-text bg-red-500/5 px-2 py-1 rounded border border-red-500/10 truncate" title={name}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Detailed Performance Mock History */}
      <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-3">
        <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
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
              {normalizedHistory.slice(0, showHistoryLimit).map((log, idx) => (
                <div key={idx} className="p-3 bg-bg-s3 border border-border rounded-lg flex items-center justify-between text-xs font-semibold gap-3">
                  <div className="flex flex-col truncate">
                    <span className="text-text truncate leading-tight">{log.subject}</span>
                    <span className="text-[9px] text-text-muted mt-0.5 font-bold uppercase tracking-wider leading-none">
                      {log.mode} • C:{log.correct} W:{log.wrong} S:{log.skipped}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
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
                </div>
              ))}
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

      {/* 8. AI Recommendations Coaching tips */}
      <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-3">
        <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-saffron animate-pulse" />
          <span>AI Study Recommendations</span>
        </h4>
        
        <div className="p-4 bg-bg-s3 border border-border/80 rounded-lg text-xs leading-relaxed text-text flex flex-col gap-2 relative">
          <span className="text-[8px] font-black uppercase text-saffron tracking-widest">PERSONAL COACH INSIGHT</span>
          <p className="leading-relaxed tracking-wide">
            {normalizedHistory.length > 0 
              ? `Your average score is ${overallAccuracy}%. Analyzing your conceptual response metrics indicates high efficiency in general knowledge. However, to maximize qualification probability for ${activeExam?.name || 'CGPSC'}, focus on spaced repetition revision timelines in ${focusSubjects[0] || 'Polity'} to secure key marks.`
              : `To kickstart your smart preparation for ${activeExam?.name || 'CGPSC'}, take a quick practice quiz in Chhattisgarh General Knowledge (CG GK) to map your current accuracy baseline. Our AI model will immediately classify your learning persona.`
            }
          </p>
        </div>
      </div>

      {/* Settings Action triggers */}
      <button 
        onClick={onClearProgress}
        className="w-full py-3 border border-red-500/20 text-redL hover:bg-red-500/10 text-xs font-black uppercase rounded-lg cursor-pointer transition-all"
      >
        Clear All Local Progress
      </button>

    </div>
  );
};
