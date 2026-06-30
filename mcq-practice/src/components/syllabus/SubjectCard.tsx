import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { TopicList } from './TopicList';
import type { Subject, TopicProgress } from './syllabusData';

interface SubjectCardProps {
  subject: Subject;
  topicProgress: Record<string, TopicProgress>;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleActivity: (topicId: string, activityType: 'notesRead' | 'mcqCompleted' | 'videoWatched') => void;
  onMarkRevised: (topicId: string) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  topicProgress,
  isExpanded,
  onToggleExpand,
  onToggleActivity,
  onMarkRevised
}) => {
  // Count total topics and completed topics in this subject
  let totalTopics = 0;
  let completedTopics = 0;
  let remainingTopics = 0;

  subject.chapters.forEach(chapter => {
    chapter.topics.forEach(topic => {
      totalTopics++;
      const progress = topicProgress[topic.id];
      if (progress && (progress.status === 'Completed' || progress.status === 'Revised')) {
        completedTopics++;
      } else {
        remainingTopics++;
      }
    });
  });

  const completionPercent = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  // Visual styling for importance levels
  const importanceStyles = {
    Highest: 'bg-redL/10 text-redL border-redL/30',
    High: 'bg-saffron-dim text-saffron border-saffron-border/30',
    Medium: 'bg-amberL/10 text-amberL border-amberL/25',
    Low: 'bg-bg-s3 text-text-muted border-border'
  }[subject.importance];

  return (
    <div className={`bg-bg-s2 border rounded-lg shadow-md transition-all duration-300 ${
      isExpanded 
        ? 'border-saffron-border/40 shadow-[0_4px_20px_rgba(0,0,0,0.25)]' 
        : 'border-border hover:border-saffron-border/20'
    }`}>
      
      {/* Subject Header Row */}
      <div 
        className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none relative"
        onClick={onToggleExpand}
      >
        {/* Glow effect when expanded */}
        {isExpanded && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron to-amber-500" />
        )}

        {/* Left Section: Subject Info & Badges */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center flex-wrap gap-2">
            <h3 className="text-sm font-black text-text leading-tight group-hover:text-saffron transition-colors">
              {subject.name}
            </h3>
            
            {subject.isCgSpecific && (
              <span className="text-[8px] font-black bg-saffron text-bg-s1 px-1.5 py-0.5 rounded shadow shrink-0">
                CG STATE GK
              </span>
            )}
            
            <span className={`text-[8px] font-black px-2 py-0.5 border rounded uppercase tracking-wider shrink-0 ${importanceStyles}`}>
              {subject.importance} Priority
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-text-muted font-semibold mt-0.5">
            <span>Est. Weightage: <strong className="text-text font-bold">{subject.weightage} Marks</strong></span>
            <span>•</span>
            <span>Completed: <strong className="text-text font-bold">{completedTopics}</strong>/{totalTopics}</span>
            <span>•</span>
            <span>Remaining: <strong className="text-text font-bold">{remainingTopics}</strong></span>
          </div>
        </div>

        {/* Right Section: Progress & Expand Icon */}
        <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-5 shrink-0 w-full md:w-auto border-t border-border/20 md:border-none pt-2.5 md:pt-0 mt-1 md:mt-0">
          <div className="flex flex-col items-start md:items-end gap-1 flex-1 md:flex-initial md:min-w-[120px]">
            <div className="flex justify-between w-full text-[10px] sm:text-xs font-black text-text">
              <span className="text-text-muted font-normal">Progress</span>
              <span>{Math.round(completionPercent)}%</span>
            </div>
            
            {/* Custom animated progress bar */}
            <div className="w-full bg-bg-s3 h-1.5 sm:h-2 rounded-full overflow-hidden border border-border/80">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-saffron h-full rounded-full"
              />
            </div>
          </div>

          <div className="p-1.5 bg-bg-s3 border border-border rounded text-text-muted group-hover:text-text transition-colors shrink-0">
            {isExpanded ? <ChevronUp className="w-4 h-4 text-saffron" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

      </div>

      {/* Expanded Chapters & Topics List */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/60 bg-bg-s3/40"
          >
            <div className="p-3.5 sm:p-5 flex flex-col gap-4 sm:gap-5">
              {subject.chapters.map(chapter => (
                <div key={chapter.id} className="flex flex-col gap-2">
                  
                  {/* Chapter Header */}
                  <h4 className="text-xs font-black text-saffron uppercase tracking-wide flex items-center gap-1.5 pl-1">
                    <Layers className="w-3.5 h-3.5 text-saffron/70" />
                    <span>{chapter.name}</span>
                  </h4>

                  {/* Render Topic list */}
                  <TopicList 
                    chapter={chapter}
                    topicProgress={topicProgress}
                    onToggleActivity={onToggleActivity}
                    onMarkRevised={onMarkRevised}
                  />

                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
