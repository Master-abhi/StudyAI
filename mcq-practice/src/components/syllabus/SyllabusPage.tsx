import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, BrainCircuit, RefreshCw, BarChart3, 
  Lightbulb, Search, Filter, HelpCircle
} from 'lucide-react';

import { SyllabusHeader } from './SyllabusHeader';
import { OverallProgressCard } from './OverallProgressCard';
import { SubjectCard } from './SubjectCard';
import { AIStudyPlanner } from './AIStudyPlanner';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { RevisionPlanner } from './RevisionPlanner';
import { ExamStrategyCard } from './ExamStrategyCard';
import { MilestoneTracker } from './MilestoneTracker';

import { 
  EXAMS_DATA
} from './syllabusData';

interface SyllabusPageProps {
  activeExamId: string;
  onSelectExam: (examId: string) => void;
  topicProgress: Record<string, any>;
  serverAnalytics: any;
  onToggleActivity: (topicId: string, activityType: 'notesRead' | 'mcqCompleted' | 'videoWatched') => void;
  onMarkRevised: (topicId: string) => void;
  streak: number;
  onStartPractice: (subjectName: string, testId?: string) => void;
  onGoBack: () => void;
}

type ActiveTab = 'tracker' | 'ai_planner' | 'revision' | 'analytics' | 'strategy';

export const SyllabusPage: React.FC<SyllabusPageProps> = ({
  activeExamId,
  onSelectExam,
  topicProgress,
  serverAnalytics,
  onToggleActivity,
  onMarkRevised,
  streak,
  onStartPractice,
  onGoBack
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tracker');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Completed' | 'In Progress' | 'Weak Area' | 'Not Started'>('all');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  const activeExam = EXAMS_DATA.find(e => e.id === activeExamId) || EXAMS_DATA[0];

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
        exams={EXAMS_DATA}
        activeExam={activeExam}
        onSelectExam={onSelectExam}
        onBack={onGoBack}
      />

      {/* 2. Overall Hero progress card */}
      <OverallProgressCard 
        completedTopics={completedTopicsCount}
        totalTopics={totalTopicsCount}
        streak={streak}
      />

      {/* 3. Modern Premium Sub-Tabs */}
      <div className="flex items-center gap-1 border-b border-border/80 pb-0.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'tracker', label: 'Syllabus Tracker', icon: BookOpen },
          { id: 'ai_planner', label: 'AI Study Planner', icon: BrainCircuit },
          { id: 'revision', label: 'Spaced Revision', icon: RefreshCw },
          { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
          { id: 'strategy', label: 'Exam Strategy', icon: Lightbulb }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                isSelected 
                  ? 'border-saffron text-saffron bg-saffron-dim/30' 
                  : 'border-transparent text-text-muted hover:text-text hover:border-border'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-saffron' : 'text-text-muted'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Views Panel */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {/* View: Syllabus Tracker */}
            {activeTab === 'tracker' && (
              <div className="flex flex-col gap-5">
                
                {/* Search and Filters Bar */}
                <div className="flex flex-col sm:flex-row gap-3 bg-bg-s2 border border-border p-4 rounded-lg shadow">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search chapters or topics (e.g. History, Tribes, संधि)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-10 pr-4 py-2.5 outline-none transition-colors"
                    />
                    <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Filter Select Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-text-muted font-bold uppercase mr-1 flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5 text-saffron" />
                      <span>Filter:</span>
                    </span>
                    {(['all', 'Completed', 'In Progress', 'Weak Area', 'Not Started'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setStatusFilter(f)}
                        className={`px-3 py-2 text-[10px] font-black uppercase rounded border transition-all cursor-pointer ${
                          statusFilter === f
                            ? 'bg-saffron text-bg-s1 border-saffron shadow-sm'
                            : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted hover:text-text'
                        }`}
                      >
                        {f === 'all' ? 'All' : f}
                      </button>
                    ))}
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
            {activeTab === 'ai_planner' && (
              <AIStudyPlanner 
                exam={activeExam}
                topicProgress={topicProgress}
                onQuickAction={handleQuickAction}
                serverRecommendations={serverAnalytics?.dailyStudyPlan?.recommendations || null}
              />
            )}

            {/* View: Spaced Revision Planner */}
            {activeTab === 'revision' && (
              <RevisionPlanner 
                exam={activeExam}
                topicProgress={topicProgress}
                onMarkRevised={onMarkRevised}
              />
            )}

            {/* View: Analytics & Streak Dashboard */}
            {activeTab === 'analytics' && (
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
            {activeTab === 'strategy' && (
              <ExamStrategyCard 
                exam={activeExam}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
