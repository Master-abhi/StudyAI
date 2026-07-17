import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, BookOpen, ChevronRight, Trophy, Zap, Landmark, Home, Shield, Bot, Sparkles,
  CheckCircle2, Circle, Award, Newspaper, RefreshCw, Target
} from 'lucide-react';
import { ProgressRing } from './syllabus/ProgressRing';

interface DashboardTabProps {
  userName: string;
  streak: number;
  xp: number;
  completedTopicsCount: number;
  totalTopicsCount: number;
  testsGivenCount: number;
  testHistory?: any[];
  activeExam: any;
  exams: any[];
  onSelectExam: (examId: string) => void;
  onNavigateToTab: (tabId: string) => void;
  onStartPracticeMode: (mode: 'quiz' | 'mock' | 'pyq') => void;
  topicProgress: Record<string, any>;
  tabVisibility?: Record<string, boolean>;
  currentUser?: any;
  getApiUrl: (path: string) => string;
  onSelectArticle?: (article: any) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  userName,
  streak,
  xp,
  completedTopicsCount,
  totalTopicsCount,
  testsGivenCount,
  testHistory = [],
  activeExam,
  exams,
  onSelectExam,
  onNavigateToTab,
  onStartPracticeMode,
  topicProgress,
  tabVisibility,
  currentUser,
  getApiUrl,
  onSelectArticle
}) => {
  const [showExamSelector, setShowExamSelector] = useState<boolean>(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState<boolean>(true);

  const todayKey = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchHomeNews = async () => {
      try {
        let res;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          res = await fetch(getApiUrl('/api/news/recommended'), {
            headers: { 'Authorization': `Bearer ${token}` }
          });
        }
        if (!res || !res.ok) {
          res = await fetch(getApiUrl('/api/news'));
        }
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.articles)) {
            setArticles(data.articles.slice(0, 3));
          }
        }
      } catch (err) {
        console.warn('Failed to load home news:', err);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchHomeNews();
  }, [currentUser]);

  const getExamIcon = (iconStr: string) => {
    switch (iconStr) {
      case '🏛️':
        return <Landmark className="w-5 h-5 text-saffron" />;
      case '🏘️':
        return <Home className="w-5 h-5 text-saffron" />;
      case '👮':
        return <Shield className="w-5 h-5 text-saffron" />;
      default:
        return <Landmark className="w-5 h-5 text-saffron" />;
    }
  };

  // Compute stats
  const completionPercent = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;
  const level = Math.max(1, Math.floor(xp / 100) + 1);

  // STRICT AUTOMATIC MONITORING LOGIC FOR THE 5 DAILY TASKS (PREVENTS CHEATING)

  // Task 1: 10 Mixed Quiz Questions Attempted Today
  const todayQsSolved = Number(localStorage.getItem(`cg_qs_solved_${todayKey}`) || 0);
  const todayQuizQsFromHistory = (testHistory || [])
    .filter(h => h.timestamp && h.timestamp.split('T')[0] === todayKey)
    .reduce((sum, h) => sum + ((h.correct || 0) + (h.wrong || 0) + (h.skipped || 0)), 0);
  const task1ProgressCount = Math.min(10, Math.max(todayQsSolved, todayQuizQsFromHistory));
  const isTask1Done = task1ProgressCount >= 10;

  // Task 2: Complete 1 Syllabus Topic Today
  const isTask2Done = Object.values(topicProgress || {}).some((tp: any) => 
    (tp?.status === 'Completed' || tp?.notesRead || tp?.mcqCompleted) && 
    (tp?.lastStudied?.startsWith(todayKey) || tp?.lastUpdated?.startsWith(todayKey))
  ) || Boolean(localStorage.getItem(`cg_topic_completed_${todayKey}`));

  // Task 3: 1 Mock Test Attempted Today
  const isTask3Done = (testHistory || []).some(h => 
    h.mode === 'mock' && h.timestamp && h.timestamp.split('T')[0] === todayKey
  );

  // Task 4: Read at least 3 News Articles from Current Date
  const readArticlesToday = JSON.parse(localStorage.getItem(`cg_read_articles_${todayKey}`) || '[]');
  const task4ProgressCount = Array.isArray(readArticlesToday) ? Math.min(3, readArticlesToday.length) : 0;
  const isTask4Done = task4ProgressCount >= 3;

  // Task 5: Revise a Topic Studied on a Previous Date
  const isTask5Done = Object.values(topicProgress || {}).some((tp: any) => 
    tp?.status === 'Revised' && 
    (tp?.lastStudied?.startsWith(todayKey) || tp?.lastUpdated?.startsWith(todayKey) || tp?.revisedDate?.startsWith(todayKey))
  ) || Boolean(localStorage.getItem(`cg_topic_revised_${todayKey}`));

  const dailyTasksList = [
    { id: 't1', isDone: isTask1Done, title: '10 Mixed Quiz Questions', titleHi: `10 मिश्रित प्रश्न हल करें (${task1ProgressCount}/10)`, icon: Target, action: () => onStartPracticeMode('quiz') },
    { id: 't2', isDone: isTask2Done, title: 'Complete 1 Syllabus Topic', titleHi: 'सिलेबस से 1 टॉपिक पूरा करें', icon: BookOpen, action: () => onNavigateToTab('syllabus') },
    { id: 't3', isDone: isTask3Done, title: 'Attempt 1 Mock Test', titleHi: '1 मॉक टेस्ट दिलाएं', icon: Trophy, action: () => onStartPracticeMode('mock') },
    { id: 't4', isDone: isTask4Done, title: 'Read 3 News Articles Today', titleHi: `आज की कम से कम 3 न्यूज पढ़ें (${task4ProgressCount}/3)`, icon: Newspaper, action: () => onNavigateToTab('news') },
    { id: 't5', isDone: isTask5Done, title: 'Revise 1 Previous Topic', titleHi: 'पिछले दिनों का 1 टॉपिक रिवाइज करें', icon: RefreshCw, action: () => onNavigateToTab('syllabus') }
  ];

  const completedCount = dailyTasksList.filter(t => t.isDone).length;
  const allTasksCompleted = completedCount === 5;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-lg md:max-w-5xl mx-auto pb-10">
      
      {/* Left Column: Greet, Target Exam, Daily Tasks */}
      <div className="flex flex-col gap-6 md:col-span-7">
        {/* 1. Hero Greet Panel */}
        <div className="p-6 bg-gradient-to-br from-bg-s2 to-bg-s1 border border-border rounded-xl shadow-lg relative overflow-hidden flex flex-col gap-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
                <span>Namaste</span>
                <Sparkles className="w-3.5 h-3.5 text-saffron" />
              </span>
              <h2 className="text-xl font-black text-text mt-0.5 truncate max-w-[200px]">
                {userName || 'Aspirant'}
              </h2>
            </div>
            
            <div className="w-10 h-10 bg-saffron hover:bg-orange-500 rounded-full flex items-center justify-center font-black text-bg-s1 select-none shadow">
              {(userName ? userName[0] : 'A').toUpperCase()}
            </div>
          </div>

          {/* Dynamic Streak Badge Card */}
          <div className="flex items-center justify-between bg-bg-s3 border border-border/80 p-3.5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded border border-orange-500/25 flex items-center justify-center">
                <Flame className="w-5.5 h-5.5 text-orange-500 fill-orange-500/15" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-text leading-tight">{streak} Days</span>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Day Streak</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-sm font-black text-saffron">{xp + (allTasksCompleted ? 20 : 0)} XP</span>
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Level {level}</span>
            </div>
          </div>
        </div>

        {/* 2. Selected Target Exam Card */}
        <button
          onClick={() => setShowExamSelector(true)}
          className="w-full p-4 bg-bg-s2 hover:bg-bg-s2/90 border border-border rounded-xl flex items-center justify-between text-left shadow-md transition-all group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-saffron-dim/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-bg-s3 rounded-lg border border-border flex items-center justify-center select-none text-saffron shrink-0">
              {getExamIcon(activeExam?.icon || '🏛️')}
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wide">Target Exam</h3>
              <span className="text-sm font-black text-text group-hover:text-saffron transition-colors leading-tight">
                {activeExam?.name || 'Select Target Exam'}
              </span>
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                {activeExam ? `${activeExam.daysRemaining} days remaining` : 'Tap to select'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[10px] font-black uppercase text-saffron-border group-hover:translate-x-0.5 transition-transform">
            <span>Change</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* 3. Interactive Daily Tasks Widget (Replaces Daily Quiz) */}
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-2xl pointer-events-none" />
          
          {/* Daily Tasks Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-saffron/10 border border-saffron-border/30 rounded-lg flex items-center justify-center text-saffron shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xs font-black uppercase text-text tracking-wider">Daily Tasks</h3>
                <span className="text-[10px] text-text-muted font-bold">Complete all 5 daily goals to claim bonus XP</span>
              </div>
            </div>

            {/* Completion & Bonus XP Badge */}
            <div className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 shrink-0 ${
              allTasksCompleted 
                ? 'bg-greenL/15 border-greenL/40 text-greenL font-black' 
                : 'bg-saffron/10 border-saffron-border/30 text-saffron font-bold'
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-black">
                {allTasksCompleted ? '+20 XP Claimed! 🎉' : `${completedCount}/5 Done (+20 XP)`}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-bg-s3 border border-border/60 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${allTasksCompleted ? 'bg-greenL shadow-sm shadow-greenL/50' : 'bg-saffron'}`}
              style={{ width: `${(completedCount / 5) * 100}%` }}
            />
          </div>

          {/* 5 Tasks List */}
          <div className="flex flex-col gap-2 pt-1">
            {dailyTasksList.map((task) => {
              const TaskIcon = task.icon;
              return (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-all ${
                    task.isDone
                      ? 'bg-greenL/5 border-greenL/25 text-text'
                      : 'bg-bg-s3/60 border-border/80 text-text hover:border-saffron-border/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="shrink-0 select-none" title={task.isDone ? 'Automatically verified: Completed' : 'Pending completion'}>
                      {task.isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-greenL fill-greenL/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-text-muted/40" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 min-w-0">
                      <TaskIcon className={`w-4 h-4 shrink-0 ${task.isDone ? 'text-greenL' : 'text-saffron'}`} />
                      <div className="flex flex-col min-w-0">
                        <span className={`text-xs font-bold truncate leading-tight ${task.isDone ? 'line-through opacity-70 text-text-muted' : 'text-text'}`}>
                          {task.titleHi}
                        </span>
                        <span className="text-[9.5px] text-text-muted font-semibold truncate">
                          {task.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={task.action}
                    className="px-2.5 py-1 bg-bg-s2 hover:bg-saffron hover:text-bg-s1 border border-border rounded text-[10px] font-black uppercase text-saffron tracking-wider shrink-0 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    <span>Start</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Quick Action Options Grid */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[10px] font-black uppercase text-text-muted tracking-wider">Quick Shortcuts</h4>
          <div className="grid grid-cols-3 gap-3">
            {tabVisibility?.practice !== false && (
              <button
                onClick={() => onStartPracticeMode('mock')}
                className="p-3.5 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/15 rounded-xl text-left flex flex-col gap-1 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <Trophy className="w-5 h-5 text-saffron" />
                <span className="text-xs font-bold text-text mt-0.5">Mock Test</span>
                <span className="text-[9px] text-text-muted font-bold leading-tight truncate">Full Pattern</span>
              </button>
            )}

            {tabVisibility?.chat !== false && (
              <button
                onClick={() => onNavigateToTab('chat')}
                className="p-3.5 bg-green-500/5 hover:bg-green-500/10 border border-green-500/15 rounded-xl text-left flex flex-col gap-1 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <Bot className="w-5 h-5 text-saffron" />
                <span className="text-xs font-bold text-text mt-0.5">AI Tutor</span>
                <span className="text-[9px] text-text-muted font-bold leading-tight truncate">Doubt Solver</span>
              </button>
            )}

            {tabVisibility?.syllabus !== false && (
              <button
                onClick={() => onNavigateToTab('syllabus')}
                className="p-3.5 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/15 rounded-xl text-left flex flex-col gap-1 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-saffron" />
                <span className="text-xs font-bold text-text mt-0.5">Syllabus</span>
                <span className="text-[9px] text-text-muted font-bold leading-tight truncate">Tracker</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Stats summaries & Subject progress lists */}
      <div className="flex flex-col gap-6 md:col-span-5">
        {/* 3. Circular Stats Summary Grid */}
        <div className="grid grid-cols-3 gap-3.5">
          <div className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden">
            <ProgressRing percentage={completionPercent} size={60} strokeWidth={6} />
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider mt-3">Completed</span>
          </div>

          <div className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col items-center justify-center text-center shadow-md">
            <Trophy className="w-6.5 h-6.5 text-saffron fill-saffron/10 mb-1" />
            <span className="text-base font-black text-text mt-1">{testsGivenCount}</span>
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider mt-0.5">Tests Given</span>
          </div>

          <div className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col items-center justify-center text-center shadow-md">
            <BookOpen className="w-6.5 h-6.5 text-greenL fill-greenL/10 mb-1" />
            <span className="text-base font-black text-text mt-1">{completedTopicsCount}</span>
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider mt-0.5">Topics Done</span>
          </div>
        </div>

        {/* 5. Subject Syllabus Completion list cards */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[10px] font-black uppercase text-text-muted tracking-wider">Subject Progress</h4>
          <div className="flex flex-col gap-3">
            {activeExam?.subjects?.map((sub: any) => {
              // Count total topics vs completed ones for this subject
              let total = 0;
              let completed = 0;
              sub.chapters.forEach((chap: any) => {
                chap.topics.forEach((topic: any) => {
                  total++;
                  const status = topicProgress[topic.id]?.status;
                  if (status === 'Completed' || status === 'Revised') completed++;
                });
              });

              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div key={sub.id} className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col gap-2 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-text leading-tight">{sub.name}</span>
                      <span className="text-[9px] text-text-muted mt-0.5 font-bold uppercase">{completed} / {total} Topics</span>
                    </div>
                    <span className="text-xs font-black text-saffron">{pct}%</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-bg-s3 border border-border/40 rounded-full overflow-hidden">
                    <div className="h-full bg-saffron rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Affairs / GK Section */}
        {tabVisibility?.news !== false && (
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black uppercase text-text-muted tracking-wider">Current Affairs</h4>
              <button 
                onClick={() => onNavigateToTab('news')}
                className="text-[9px] font-black uppercase text-saffron hover:text-orange-500 cursor-pointer transition-all border border-border bg-bg-s3/80 hover:bg-bg-s3 px-2.5 py-0.5 rounded shadow-sm"
              >
                Show More
              </button>
            </div>

            {loadingNews ? (
              <div className="flex flex-col gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-bg-s2 border border-border rounded-xl animate-pulse" />
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="p-4 bg-bg-s2 border border-border rounded-xl text-center text-xs text-text-muted">
                No current affairs articles found.
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {articles.map((art, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectArticle ? onSelectArticle(art) : onNavigateToTab('news')}
                    className="p-3 bg-bg-s2 hover:bg-bg-s2/90 border border-border rounded-xl text-left shadow-sm transition-all hover:scale-[1.005] cursor-pointer flex flex-col gap-1.5 relative overflow-hidden group"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-saffron" />
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black uppercase text-saffron bg-saffron-dim/30 border border-saffron-border/30 px-1.5 py-0.2 rounded leading-none">
                        {art.category}
                      </span>
                      <span className="text-[8px] text-text-muted font-bold">
                        {art.date || 'Today'}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-text group-hover:text-saffron transition-colors leading-snug line-clamp-1">
                      {art.title_hi || art.title}
                    </h5>
                    <p className="text-xs text-text-muted leading-normal">
                      {art.description_hi || art.summary_hi || art.description || art.title}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Exam Selector Drawer/Overlay Modal */}
      <AnimatePresence>
        {showExamSelector && (
          <div className="fixed inset-0 bg-bg-s0/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-bg-s2 border border-border rounded-xl shadow-2xl p-5"
            >
              <div className="flex justify-between items-center border-b border-border pb-2.5 mb-3.5">
                <h3 className="text-sm font-black uppercase text-text flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-saffron" />
                  <span>Select Target Exam</span>
                </h3>
                <button
                  onClick={() => setShowExamSelector(false)}
                  className="text-xs text-text-muted hover:text-text cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                {exams.map((ex: any) => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      onSelectExam(ex.id);
                      setShowExamSelector(false);
                    }}
                    className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer group ${
                      activeExam?.id === ex.id
                        ? 'bg-saffron-dim/20 border-saffron text-saffron'
                        : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="select-none flex items-center justify-center shrink-0">
                        {getExamIcon(ex.icon)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight group-hover:text-saffron transition-colors">
                          {ex.name}
                        </span>
                        <span className="text-[9px] text-text-muted mt-0.5 uppercase font-bold tracking-wider">
                          {ex.stage} • {ex.daysRemaining} days remaining
                        </span>
                      </div>
                    </div>
                    {activeExam?.id === ex.id && (
                      <span className="text-xs font-black">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
