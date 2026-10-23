import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, BrainCircuit, RefreshCw, BarChart3, 
  Lightbulb, Search, Filter, HelpCircle,
  Map, Globe, Compass, ChevronDown, ChevronUp, Sparkles
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
import { TopicNotesReaderModal } from './TopicNotesReaderModal';
import { IndiaMap3DModal } from './IndiaMap3DModal';
import type { Exam, Subject, Chapter, Topic } from './syllabusData';

// Helper to look up topic across exams
export const findTopicInAllExams = (
  examsList: Exam[],
  targetTopicId: string,
  preferredExamId?: string
): { topic: Topic; subjectName: string; examId: string; subjectId: string } | null => {
  if (!targetTopicId || !Array.isArray(examsList)) return null;

  const preferred = preferredExamId ? examsList.find(e => e.id === preferredExamId) : null;
  const list = preferred ? [preferred, ...examsList.filter(e => e.id !== preferredExamId)] : examsList;

  for (const ex of list) {
    for (const sub of ex.subjects || []) {
      for (const chap of sub.chapters || []) {
        for (const top of chap.topics || []) {
          if (top.id === targetTopicId) {
            return { topic: top, subjectName: sub.name, examId: ex.id, subjectId: sub.id };
          }
        }
      }
    }
  }
  return null;
};

interface SyllabusPageProps {
  exams: Exam[];
  activeExamId: string;
  onSelectExam: (examId: string) => void;
  topicProgress: Record<string, any>;
  serverAnalytics: any;
  onToggleActivity: (topicId: string, activityType: 'notesRead' | 'mcqCompleted' | 'videoWatched') => void;
  onMarkRevised: (topicId: string) => void;
  streak: number;
  onStartPractice: (subjectName: string, testId?: string, mode?: 'quiz' | 'mock' | 'pyq') => void | Promise<void>;
  onGoBack: () => void;
  tabVisibility?: Record<string, boolean>;
  targetExamDate: string;
  onTargetDateChange: (date: string) => void;
  currentUser?: any;
  onOpenAuth?: () => void;
  userPlan?: 'free' | 'paid';
  onOpenUpgrade?: (reason?: string, topicName?: string) => void;
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
  onOpenAuth,
  userPlan = 'free',
  onOpenUpgrade
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

  // Formatted In-App Study Notes Reader State - initialize from URL query params (notes or topicId)
  const [selectedNotesTopic, setSelectedNotesTopic] = useState<{ topic: Topic; subjectName: string } | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const targetTopicId = params.get('notes') || params.get('topicId');
    if (!targetTopicId) return null;

    const found = findTopicInAllExams(exams, targetTopicId, activeExamId);
    if (found) {
      return { topic: found.topic, subjectName: found.subjectName };
    }
    return {
      topic: {
        id: targetTopicId,
        name: 'अध्ययन नोट्स',
        nameHi: 'अध्ययन नोट्स',
        subtopics: [],
        importanceScore: 5
      },
      subjectName: 'सामान्य अध्ययन'
    };
  });

  // Sync selectedNotesTopic if URL has notes and exams load or update
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const targetTopicId = params.get('notes') || params.get('topicId');
    if (!targetTopicId) return;

    if (!selectedNotesTopic || selectedNotesTopic.topic.id !== targetTopicId || selectedNotesTopic.topic.name === 'अध्ययन नोट्स') {
      const found = findTopicInAllExams(exams, targetTopicId, activeExamId);
      if (found) {
        setSelectedNotesTopic({ topic: found.topic, subjectName: found.subjectName });
        if (found.subjectId && !expandedSubjectId) {
          setExpandedSubjectId(found.subjectId);
        }
        if (found.examId && found.examId !== activeExamId && onSelectExam) {
          onSelectExam(found.examId);
        }
      }
    }
  }, [exams, activeExamId]);

  // Handle browser Back / Forward popstate navigation for notes modal
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlNotesId = params.get('notes') || params.get('topicId');

      if (urlNotesId) {
        if (!selectedNotesTopic || selectedNotesTopic.topic.id !== urlNotesId) {
          const found = findTopicInAllExams(exams, urlNotesId, activeExamId);
          if (found) {
            setSelectedNotesTopic({ topic: found.topic, subjectName: found.subjectName });
            if (found.subjectId) {
              setExpandedSubjectId(found.subjectId);
            }
          } else {
            setSelectedNotesTopic({
              topic: {
                id: urlNotesId,
                name: 'अध्ययन नोट्स',
                nameHi: 'अध्ययन नोट्स',
                subtopics: [],
                importanceScore: 5
              },
              subjectName: 'सामान्य अध्ययन'
            });
          }
        }
      } else {
        if (selectedNotesTopic) {
          setSelectedNotesTopic(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [exams, activeExamId, selectedNotesTopic]);

  // 3D Map Explorer State
  const [is3DMapOpen, setIs3DMapOpen] = useState<boolean>(false);
  const [initialMapStateId, setInitialMapStateId] = useState<string | undefined>(undefined);
  const [isMapsSectionOpen, setIsMapsSectionOpen] = useState<boolean>(false);

  const handleOpen3DMap = (stateId?: string) => {
    setInitialMapStateId(stateId);
    setIs3DMapOpen(true);
  };

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
    const fbUser = currentUser || (window as any).firebase?.auth()?.currentUser;
    if (!fbUser) {
      if (onOpenAuth) onOpenAuth();
      else alert('Please log in or sign up to access topic tests.');
      return;
    }
    setSelectedTopicForTests({ topic, subjectName });
  };

  const handleOpenLectures = (topic: Topic, subjectName: string) => {
    const fbUser = currentUser || (window as any).firebase?.auth()?.currentUser;
    if (!fbUser) {
      if (onOpenAuth) onOpenAuth();
      else alert('Please log in or sign up to watch video lectures.');
      return;
    }
    setSelectedLectureTopic({ topic, subjectName });
  };

  const handleOpenStudyNotes = (topic: Topic, subjectName: string) => {
    const isGuest = localStorage.getItem('cg_is_guest') === 'true';
    const fbUser = currentUser || (window as any).firebase?.auth()?.currentUser;
    if (!fbUser && !isGuest && !localStorage.getItem('cg_has_visited')) {
      if (onOpenAuth) onOpenAuth();
      else alert('Please log in or sign up to read study notes.');
      return;
    }
    setSelectedNotesTopic({ topic, subjectName });

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', 'syllabus');
      url.searchParams.set('notes', topic.id);
      url.searchParams.delete('topicId');
      if (activeExamId) {
        url.searchParams.set('examId', activeExamId);
      }
      const newSearch = url.searchParams.toString();
      const newRelativePath = url.pathname + (newSearch ? '?' + newSearch : '') + url.hash;
      window.history.pushState({ tab: 'syllabus', notes: topic.id, examId: activeExamId }, '', newRelativePath);
    }
  };

  const handleCloseStudyNotes = () => {
    setSelectedNotesTopic(null);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.has('notes') || url.searchParams.has('topicId')) {
        url.searchParams.delete('notes');
        url.searchParams.delete('topicId');
        const newSearch = url.searchParams.toString();
        const newRelativePath = url.pathname + (newSearch ? '?' + newSearch : '') + url.hash;
        window.history.pushState({ tab: 'syllabus', examId: activeExamId }, '', newRelativePath);
      }
    }
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

  const fallbackExam: Exam = {
    id: activeExamId || '',
    name: 'Syllabus',
    fullName: 'Exam Syllabus',
    icon: '📚',
    stage: 'Prelims',
    daysRemaining: 0,
    totalMarks: 0,
    subjects: []
  };

  const activeExam = (exams && exams.length > 0 ? exams.find(e => e.id === activeExamId) || exams[0] : null) || fallbackExam;

  const handleQuickAction = (actionText: string, subjectId: string, topicId: string) => {
    const fbUser = currentUser || (window as any).firebase?.auth()?.currentUser;
    if (!fbUser) {
      if (onOpenAuth) onOpenAuth();
      else alert('Please log in or sign up to use syllabus study features.');
      return;
    }

    const subjects = Array.isArray(activeExam?.subjects) ? activeExam.subjects : [];
    const subject = subjects.find((s: Subject) => s.id === subjectId);
    const subjectName = subject ? subject.name : (activeExam?.name || '');
    
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
    if (!activeExam || !Array.isArray(activeExam.subjects)) return [];
    return activeExam.subjects.map((subject: Subject) => {
      const chapters = Array.isArray(subject?.chapters) ? subject.chapters : [];
      const filteredChapters = chapters.map((chapter: Chapter) => {
        const topics = Array.isArray(chapter?.topics) ? chapter.topics : [];
        const filteredTopics = topics.filter((topic: Topic) => {
          if (!topic) return false;
          const progress = topicProgress[topic.id];
          const status = progress ? progress.status : 'Not Started';
          
          const topicName = (topic.name || '').toLowerCase();
          const topicNameHi = (topic.nameHi || '').toLowerCase();
          const query = (searchQuery || '').toLowerCase();

          const matchesSearch = 
            topicName.includes(query) ||
            topicNameHi.includes(query);

          const matchesFilter = statusFilter === 'all' || status === statusFilter;

          return matchesSearch && matchesFilter;
        });

        return { ...chapter, topics: filteredTopics };
      }).filter((chapter: Chapter) => (chapter.topics?.length || 0) > 0);

      return { ...subject, chapters: filteredChapters };
    }).filter((subject: Subject) => (subject.chapters?.length || 0) > 0);
  };

  const filteredSubjects = getFilteredSubjects();

  // Aggregate stats for dashboard cards
  let totalTopicsCount = 0;
  let completedTopicsCount = 0;
  let accuracySum = 0;
  let accuracyCount = 0;

  if (activeExam && Array.isArray(activeExam.subjects)) {
    activeExam.subjects.forEach((subject: Subject) => {
      if (Array.isArray(subject?.chapters)) {
        subject.chapters.forEach((chapter: Chapter) => {
          if (Array.isArray(chapter?.topics)) {
            chapter.topics.forEach((topic: Topic) => {
              if (!topic) return;
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
          }
        });
      }
    });
  }

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
                  {/* 🗺️ 'मानचित्र' (3D Maps Explorer) Section - Positioned right above CG GK */}
                  {(!searchQuery || 'मानचित्र map maps भूगोल geography 3d chhattisgarh cg india भारत'.toLowerCase().includes(searchQuery.toLowerCase().trim())) && (
                    <motion.div 
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-2 border-saffron/30 hover:border-saffron/60 bg-gradient-to-r from-bg-s2 via-saffron/5 to-bg-s2 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      {/* Header: Clickable to toggle map section */}
                      <button
                        onClick={() => setIsMapsSectionOpen(!isMapsSectionOpen)}
                        className="w-full px-4 py-3.5 flex items-center justify-between text-left transition-colors cursor-pointer group hover:bg-saffron/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron to-amber-500 flex items-center justify-center font-black text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                            <Map className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm sm:text-base font-black text-text tracking-wide group-hover:text-saffron transition-colors">
                                मानचित्र (Maps Explorer)
                              </h3>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-saffron/15 text-saffron border border-saffron/30 flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                3D Interactive
                              </span>
                            </div>
                            <p className="text-[11px] text-text-muted mt-0.5 font-medium">
                              भारत एवं छत्तीसगढ़ के उच्च परिशुद्धता 3D व विषयवार मानचित्र
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-bold text-saffron hidden sm:inline">
                            {isMapsSectionOpen ? 'बंद करें' : 'क्लिक करें व देखें'}
                          </span>
                          <div className="p-1.5 rounded-lg bg-bg-s3 border border-border group-hover:border-saffron transition-colors">
                            {isMapsSectionOpen ? (
                              <ChevronUp className="w-4 h-4 text-saffron" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-text-muted group-hover:text-saffron" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Expandable Body */}
                      <AnimatePresence>
                        {isMapsSectionOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-t border-border/60 p-3 bg-bg-s3/40 space-y-2.5"
                          >
                            {/* 1. India 3D Map Card */}
                            <div className="px-3.5 py-3 bg-bg-s2 hover:bg-bg-s1 border border-sky-500/25 hover:border-sky-500/50 rounded-xl flex items-center justify-between gap-3 shadow-xs transition-all">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
                                  <Globe className="w-4 h-4" />
                                </div>
                                <div className="flex items-center gap-2 flex-wrap min-w-0">
                                  <span className="text-xs sm:text-sm font-bold text-text">
                                    🇮🇳 भारत 3D मानचित्र
                                  </span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-700 dark:text-sky-300 font-mono font-bold">
                                    Survey 2020
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleOpen3DMap()}
                                className="px-3.5 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow-sky-500/30 hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                              >
                                <Globe className="w-3.5 h-3.5" />
                                <span>मैप खोलें</span>
                              </button>
                            </div>

                            {/* 2. Chhattisgarh Map Card */}
                            <div className="px-3.5 py-3 bg-bg-s2 hover:bg-bg-s1 border border-saffron/30 hover:border-saffron/60 rounded-xl flex items-center justify-between gap-3 shadow-xs transition-all">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="p-2 rounded-lg bg-saffron/10 text-saffron shrink-0">
                                  <Compass className="w-4 h-4" />
                                </div>
                                <div className="flex items-center gap-2 flex-wrap min-w-0">
                                  <span className="text-xs sm:text-sm font-bold text-text">
                                    🗺️ छत्तीसगढ़ 3D मानचित्र (Seahorse Shape)
                                  </span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-saffron/15 text-saffron font-bold">
                                    33 जिले
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleOpen3DMap('CG')}
                                className="px-3.5 py-1.5 bg-gradient-to-r from-saffron to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-sm hover:shadow-saffron/30 hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                              >
                                <Compass className="w-3.5 h-3.5 text-slate-950" />
                                <span>मैप खोलें</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject: Subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        topicProgress={topicProgress}
                        isExpanded={expandedSubjectId === subject.id}
                        userPlan={userPlan}
                        onOpenUpgrade={(topicName) => onOpenUpgrade && onOpenUpgrade('syllabus_locked', topicName)}
                        onToggleExpand={() => setExpandedSubjectId(expandedSubjectId === subject.id ? null : subject.id)}
                        onToggleActivity={onToggleActivity}
                        onMarkRevised={onMarkRevised}
                        onOpenPdf={handleOpenPdf}
                        onOpenNotes={handleOpenStudyNotes}
                        onOpenLectures={handleOpenLectures}
                        onOpenPracticeMcqs={handleOpenPracticeMcqs}
                        onOpen3DMap={handleOpen3DMap}
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
        topicId={selectedTopicForTests?.topic.id}
        examId={activeExamId}
        subtopics={selectedTopicForTests?.topic.subtopics}
        onStartTest={async (testId, mode, subject) => {
          await onStartPractice(subject, testId, mode);
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

      {/* Interactive Formatted Study Notes Reader Modal */}
      <TopicNotesReaderModal
        isOpen={Boolean(selectedNotesTopic)}
        onClose={handleCloseStudyNotes}
        topic={selectedNotesTopic?.topic || null}
        subjectName={selectedNotesTopic?.subjectName}
        examName={activeExam?.name}
        examId={activeExamId}
        getApiUrl={getApiUrl}
        onMarkComplete={() => {
          if (selectedNotesTopic) {
            onToggleActivity(selectedNotesTopic.topic.id, 'notesRead');
          }
        }}
        isCompleted={Boolean(selectedNotesTopic && topicProgress[selectedNotesTopic.topic.id]?.notesRead)}
        onOpenPdf={handleOpenPdf}
        onOpen3DMap={handleOpen3DMap}
      />

      {/* 3D Interactive Map of India (Survey of India 2020) Modal */}
      <IndiaMap3DModal
        isOpen={is3DMapOpen}
        onClose={() => setIs3DMapOpen(false)}
        initialStateId={initialMapStateId}
      />

    </div>
  );
};
