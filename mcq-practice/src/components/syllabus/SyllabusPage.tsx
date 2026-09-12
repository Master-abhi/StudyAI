import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, BrainCircuit, RefreshCw, BarChart3, 
  Lightbulb, Search, Filter, HelpCircle
} from 'lucide-react';

import { SyllabusHeader } from './SyllabusHeader';
import { SubjectCard } from './SubjectCard';
import { AIStudyPlanner } from './AIStudyPlanner';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { RevisionPlanner } from './RevisionPlanner';
import { ExamStrategyCard } from './ExamStrategyCard';
import { MilestoneTracker } from './MilestoneTracker';
import { PdfViewerModal } from './PdfViewerModal';
import { LecturesModal } from './LecturesModal';
import { TopicTestsModal } from './TopicTestsModal';
import type { Topic } from './syllabusData';

import type { Exam } from './syllabusData';

interface SyllabusPageProps {
  exams: Exam[];
  activeExamId: string;
  onSelectExam: (examId: string) => void;
  topicProgress: Record<string, any>;
  serverAnalytics: any;
  onToggleActivity: (topicId: string, activityType: 'notesRead' | 'mcqCompleted' | 'videoWatched') => void;
  onMarkRevised: (topicId: string) => void;
  streak: number;
  onStartPractice: (subjectName: string, testId?: string) => void;
  onGoBack: () => void;
  tabVisibility?: Record<string, boolean>;
  targetExamDate: string;
  onTargetDateChange: (date: string) => void;
  currentUser?: any;
  onOpenAuth?: () => void;
}

type ActiveTab = 'tracker' | 'ai_planner' | 'revision' | 'analytics' | 'strategy';

export const SyllabusPage: React.FC<SyllabusPageProps> = ({
  exams,
  activeExamId,
  onSelectExam,
  topicProgress,
  serverAnalytics,
  onToggleActivity,
  onMarkRevised,
  streak,
  onStartPractice,
  onGoBack,
  tabVisibility,
  targetExamDate,
  onTargetDateChange,
  currentUser,
  onOpenAuth
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tracker');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Completed' | 'In Progress' | 'Weak Area' | 'Not Started'>('all');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);
  // Topic Practice Tests State
  const [selectedTopicForTests, setSelectedTopicForTests] = useState<{ topic: Topic; subjectName: string } | null>(null);

  // Lectures State
  const [selectedLectureTopic, setSelectedLectureTopic] = useState<{ topic: Topic; subjectName: string } | null>(null);

  // PDF Notes State
  const [selectedPdfTopic, setSelectedPdfTopic] = useState<Topic | null>(null);
  const [pdfSignedUrl, setPdfSignedUrl] = useState<string | null>(null);

  const getApiUrl = (p: string) => {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' || 
                    hostname === '[::1]' ||
                    hostname.startsWith('192.168.');
    if (isLocal && window.location.port !== '3000') {
      return `http://localhost:3000${p}`;
    }
    if (hostname.endsWith('.web.app') || hostname.endsWith('.firebaseapp.com')) {
      return `https://study-ai-olive.vercel.app${p}`;
    }
    return p;
  };

  const handleOpenPracticeMcqs = (topic: Topic, subjectName: string) => {
    setSelectedTopicForTests({ topic, subjectName });
  };

  const handleOpenLectures = (topic: Topic, subjectName: string) => {
    setSelectedLectureTopic({ topic, subjectName });
  };

  const handleOpenPdf = async (topic: Topic) => {
    // Check prop currentUser or window.firebase currentUser
    const fbUser = currentUser || (window as any).firebase?.auth()?.currentUser;
    if (!fbUser) {
      if (onOpenAuth) onOpenAuth();
      else alert('Please log in to read topic PDF notes.');
      return;
    }

    try {
      // loading
      
      setSelectedPdfTopic(topic);

      const token = await fbUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/syllabus/topic-pdf-url?examId=${encodeURIComponent(activeExamId)}&topicId=${encodeURIComponent(topic.id)}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok && data.signedUrl) {
        setPdfSignedUrl(data.signedUrl);
      } else {
        throw new Error(data.error || 'Failed to load PDF notes.');
      }
    } catch (err: any) {
      console.error('[Open PDF Error]:', err);
      
      alert(err.message || 'Could not load PDF notes.');
      setSelectedPdfTopic(null);
      setPdfSignedUrl(null);
    } finally {
      // done
    }
  };

  
  const [showTip, setShowTip] = useState<boolean>(() => {
    try {
      return localStorage.getItem('hide_syllabus_tip') !== 'true';
    } catch {
      return true;
    }
  });

  const dismissTip = () => {
    setShowTip(false);
    try {
      localStorage.setItem('hide_syllabus_tip', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  // Check if current active tab is visible, if not, fallback to tracker
  const isTabVisible = (tabId: string) => {
    if (tabId === 'tracker') return true;
    const configKey = tabId === 'ai_planner' ? 'syllabus_ai_planner' : `syllabus_${tabId}`;
    return tabVisibility?.[configKey] !== false;
  };

  const resolvedActiveTab = isTabVisible(activeTab) ? activeTab : 'tracker';

  const activeExam = exams.find(e => e.id === activeExamId) || exams[0];

  const handleQuickAction = (actionText: string, subjectId: string, topicId: string) => {
    const subject = activeExam.subjects.find(s => s.id === subjectId);
    const subjectName = subject ? subject.name : activeExam.name;
    
    if (actionText === 'Practice MCQs' || actionText === 'Start MCQ Practice') {
      onStartPractice(subjectName, topicId || undefined);
    } else if (actionText === 'Start Revision') {
      onMarkRevised(topicId);
    } else {
      const activityType = actionText.includes('Notes') ? 'notesRead' : 'videoWatched';
      onToggleActivity(topicId, activityType);
    }
  };

  const getFilteredSubjects = () => {
    return activeExam.subjects.map(subject => {
      const filteredChapters = subject.chapters.map(chapter => {
        const filteredTopics = chapter.topics.filter(topic => {
          const progress = topicProgress[topic.id];
          const status = progress ? progress.status : 'Not Started';
          
          const matchesSearch = 
            topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.nameHi.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesFilter = statusFilter === 'all' || status === statusFilter;

          return matchesSearch && matchesFilter;
        });

        return { ...chapter, topics: filteredTopics };
      }).filter(chapter => chapter.topics.length > 0);

      return { ...subject, chapters: filteredChapters };
    }).filter(subject => subject.chapters.length > 0);
  };

  const filteredSubjects = getFilteredSubjects();

  // Aggregate stats for dashboard cards
  let totalTopicsCount = 0;
  let completedTopicsCount = 0;
  let accuracySum = 0;
  let accuracyCount = 0;

  activeExam.subjects.forEach(subject => {
    subject.chapters.forEach(chapter => {
      chapter.topics.forEach(topic => {
        totalTopicsCount++;
        const progress = topicProgress[topic.id];
        if (progress) {
          if (progress.status === 'Completed' || progress.status === 'Revised') {
            completedTopicsCount++;
          }
          if (progress.accuracy > 0) {
            accuracySum += progress.accuracy;
            accuracyCount++;
          }
        }
      });
    });
  });

  const averageAccuracy = accuracyCount > 0 ? Math.round(accuracySum / accuracyCount) : 70;

  return (
    <div className="flex flex-col gap-4 w-full mx-auto py-2 font-sans">
      
      {/* 1. Header with Exam Selector */}
      <SyllabusHeader 
        exams={exams}
        activeExam={activeExam}
        onSelectExam={onSelectExam}
        onBack={onGoBack}
        targetExamDate={targetExamDate}
        onTargetDateChange={onTargetDateChange}
      />

      {/* 3. Modern Premium Sub-Tabs (Rendered only if extra AI/revision tabs are enabled) */}
      {[
        { id: 'ai_planner', label: 'AI Study Planner', shortLabel: 'AI Planner', icon: BrainCircuit, configKey: 'syllabus_ai_planner' },
        { id: 'revision', label: 'Spaced Revision', shortLabel: 'Revision', icon: RefreshCw, configKey: 'syllabus_revision' },
        { id: 'analytics', label: 'Analytics Dashboard', shortLabel: 'Analytics', icon: BarChart3, configKey: 'syllabus_analytics' },
        { id: 'strategy', label: 'Exam Strategy', shortLabel: 'Strategy', icon: Lightbulb, configKey: 'syllabus_strategy' }
      ].some(tab => !tab.configKey || tabVisibility?.[tab.configKey] !== false) && (
      <div className="relative border-b border-border/80 pb-0.5">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-bg-s1 to-transparent pointer-events-none z-10 sm:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-bg-s1 to-transparent pointer-events-none z-10 sm:hidden" />
        
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-4 sm:px-0">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap shrink-0 ${
              resolvedActiveTab === 'tracker'
                ? 'border-saffron text-saffron bg-saffron-dim/30' 
                : 'border-transparent text-text-muted hover:text-text hover:border-border'
            }`}
          >
            <BookOpen className={`w-3.5 h-3.5 ${resolvedActiveTab === 'tracker' ? 'text-saffron' : 'text-text-muted'}`} />
            <span>Topics</span>
          </button>
          {[
            { id: 'ai_planner', label: 'AI Study Planner', shortLabel: 'AI Planner', icon: BrainCircuit, configKey: 'syllabus_ai_planner' },
            { id: 'revision', label: 'Spaced Revision', shortLabel: 'Revision', icon: RefreshCw, configKey: 'syllabus_revision' },
            { id: 'analytics', label: 'Analytics Dashboard', shortLabel: 'Analytics', icon: BarChart3, configKey: 'syllabus_analytics' },
            { id: 'strategy', label: 'Exam Strategy', shortLabel: 'Strategy', icon: Lightbulb, configKey: 'syllabus_strategy' }
          ].filter(tab => !tab.configKey || tabVisibility?.[tab.configKey] !== false).map(tab => {
            const Icon = tab.icon;
            const isSelected = resolvedActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected 
                    ? 'border-saffron text-saffron bg-saffron-dim/30' 
                    : 'border-transparent text-text-muted hover:text-text hover:border-border'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-saffron' : 'text-text-muted'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="inline sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
      )}

      {/* 4. Tab Views Panel */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedActiveTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {/* View: Syllabus Tracker */}
            {resolvedActiveTab === 'tracker' && (
              <div className="flex flex-col gap-5">
                
                {/* Onboarding Tip Banner */}
                {showTip && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-saffron-dim/10 border border-saffron-border/30 p-3.5 rounded-lg flex items-start justify-between gap-3 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-saffron/5 rounded-full blur-lg pointer-events-none" />
                    <div className="flex gap-2.5">
                      <span className="text-base mt-0.5">💡</span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-black uppercase text-saffron tracking-wider">Quick Guide:</span>
                        <p className="text-xs text-text-muted leading-relaxed">
                          To track your syllabus: Tap on a <strong>Subject</strong> to see chapters, then expand a topic to log your study progress. You can check off <strong>Read PDF Notes</strong>, <strong>Watch Lectures</strong>, and <strong>Solve MCQs</strong> directly.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={dismissTip}
                      className="text-[10px] font-bold text-text-muted hover:text-text bg-bg-s3 border border-border/80 px-2 py-1 rounded transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap shrink-0"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}

                {/* Search and Filters Bar */}
                <div className="flex flex-col gap-3 bg-bg-s2 border border-border p-4 rounded-lg shadow">
                  {/* Search Bar */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Search chapters or topics (e.g. History, Tribes, संधि)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-10 pr-4 py-2.5 outline-none transition-colors"
                    />
                    <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Filter Select Buttons - Horizontal scrollable on mobile */}
                  <div className="relative w-full overflow-hidden">
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 pt-0.5 flex-nowrap w-full">
                      <span className="text-[10px] text-text-muted font-bold uppercase mr-1 flex items-center gap-1 shrink-0">
                        <Filter className="w-3.5 h-3.5 text-saffron" />
                        <span>Filter:</span>
                      </span>
                      {(['all', 'Completed', 'In Progress', 'Weak Area', 'Not Started'] as const).map(f => {
                        const labels = {
                          all: 'All',
                          Completed: 'Completed',
                          'In Progress': 'In Progress',
                          'Weak Area': 'Weak Area',
                          'Not Started': 'Not Started'
                        };
                        return (
                          <button
                            key={f}
                            onClick={() => setStatusFilter(f)}
                            className={`px-3 py-2 text-[10px] font-black uppercase rounded border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                              statusFilter === f
                                ? 'bg-saffron text-bg-s1 border-saffron shadow-sm'
                                : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted hover:text-text'
                            }`}
                          >
                            {labels[f]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* List of Subjects */}
                <div className="flex flex-col gap-4">
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map(subject => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        topicProgress={topicProgress}
                        isExpanded={expandedSubjectId === subject.id}
                        onToggleExpand={() => setExpandedSubjectId(expandedSubjectId === subject.id ? null : subject.id)}
                        onToggleActivity={onToggleActivity}
                        onMarkRevised={onMarkRevised}
                        onOpenPdf={handleOpenPdf}
                        onOpenLectures={handleOpenLectures}
                        onOpenPracticeMcqs={handleOpenPracticeMcqs}
                      />
                    ))
                  ) : (
                    <div className="bg-bg-s2 border border-border p-12 text-center rounded-lg flex flex-col items-center justify-center text-text-muted">
                      <HelpCircle className="w-10 h-10 text-saffron-border/60 mb-2 animate-bounce" />
                      <span className="text-sm font-bold text-text">No Topics Match Your Search/Filters</span>
                      <span className="text-xs text-text-muted mt-1 leading-relaxed max-w-[280px]">
                        Try clearing queries or changing active status filters.
                      </span>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* View: AI Study Planner */}
            {resolvedActiveTab === 'ai_planner' && (
              <AIStudyPlanner 
                exam={activeExam}
                topicProgress={topicProgress}
                onQuickAction={handleQuickAction}
                serverRecommendations={serverAnalytics?.dailyStudyPlan?.recommendations || null}
              />
            )}

            {/* View: Spaced Revision Planner */}
            {resolvedActiveTab === 'revision' && (
              <RevisionPlanner 
                exam={activeExam}
                topicProgress={topicProgress}
                onMarkRevised={onMarkRevised}
              />
            )}

            {/* View: Analytics & Streak Dashboard */}
            {resolvedActiveTab === 'analytics' && (
              <div className="flex flex-col gap-6">
                <AnalyticsDashboard 
                  exam={activeExam}
                  topicProgress={topicProgress}
                  serverAnalytics={serverAnalytics}
                />
                
                {/* Embedded Streak & Milestone Achievements */}
                <MilestoneTracker 
                  streak={streak}
                  completedTopicsCount={completedTopicsCount}
                  accuracy={averageAccuracy}
                />
              </div>
            )}

            {/* View: Exam Strategy */}
            {resolvedActiveTab === 'strategy' && (
              <ExamStrategyCard 
                exam={activeExam}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Topic Practice Tests Modal (Quiz / Mock list & Coming Soon) */}
      <TopicTestsModal
        isOpen={Boolean(selectedTopicForTests)}
        onClose={() => setSelectedTopicForTests(null)}
        topicName={selectedTopicForTests?.topic.name || ''}
        topicNameHi={selectedTopicForTests?.topic.nameHi}
        subjectName={selectedTopicForTests?.subjectName}
        examId={activeExamId}
        onStartTest={(testId, _mode, subject) => {
          onStartPractice(subject, testId);
        }}
        onMarkComplete={() => {
          if (selectedTopicForTests) {
            onToggleActivity(selectedTopicForTests.topic.id, 'mcqCompleted');
          }
        }}
        isCompleted={Boolean(selectedTopicForTests && topicProgress[selectedTopicForTests.topic.id]?.mcqCompleted)}
      />

      {/* Curated YouTube Video Lectures Modal */}
      <LecturesModal
        isOpen={Boolean(selectedLectureTopic)}
        onClose={() => setSelectedLectureTopic(null)}
        topicName={selectedLectureTopic?.topic.name || ''}
        topicNameHi={selectedLectureTopic?.topic.nameHi}
        subjectName={selectedLectureTopic?.subjectName}
        onMarkComplete={() => {
          if (selectedLectureTopic) {
            onToggleActivity(selectedLectureTopic.topic.id, 'videoWatched');
          }
        }}
        isCompleted={Boolean(selectedLectureTopic && topicProgress[selectedLectureTopic.topic.id]?.videoWatched)}
      />

      {/* Secure Supabase PDF Notes Viewer Modal */}
      <PdfViewerModal
        isOpen={Boolean(selectedPdfTopic && pdfSignedUrl)}
        onClose={() => {
          setSelectedPdfTopic(null);
          setPdfSignedUrl(null);
        }}
        pdfUrl={pdfSignedUrl}
        title={selectedPdfTopic ? (selectedPdfTopic.nameHi || selectedPdfTopic.name) : 'Study Material'}
        fileName={selectedPdfTopic?.pdfName}
        onMarkComplete={() => {
          if (selectedPdfTopic) {
            onToggleActivity(selectedPdfTopic.id, 'notesRead');
          }
        }}
        isCompleted={Boolean(selectedPdfTopic && topicProgress[selectedPdfTopic.id]?.notesRead)}
      />

    </div>
  );
};
