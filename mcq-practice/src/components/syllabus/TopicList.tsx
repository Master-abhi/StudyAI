import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Play, CheckCircle, RefreshCcw, 
  ChevronDown, ChevronUp, CheckSquare, Square 
} from 'lucide-react';
import type { Chapter, TopicProgress } from './syllabusData';

interface TopicListProps {
  chapter: Chapter;
  topicProgress: Record<string, TopicProgress>;
  onToggleActivity: (topicId: string, activityType: 'notesRead' | 'mcqCompleted' | 'videoWatched') => void;
  onMarkRevised: (topicId: string) => void;
}

export const TopicList: React.FC<TopicListProps> = ({
  chapter,
  topicProgress,
  onToggleActivity,
  onMarkRevised
}) => {
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopicId(expandedTopicId === topicId ? null : topicId);
  };

  return (
    <div className="flex flex-col gap-3 pl-3 border-l border-border/80">
      {chapter.topics.map(topic => {
        const progress = topicProgress[topic.id] || {
          topicId: topic.id,
          status: 'Not Started',
          notesRead: false,
          mcqCompleted: false,
          videoWatched: false,
          accuracy: 0,
          revisionCount: 0,
          lastStudied: '',
          nextRevisionDate: ''
        };

        const isExpanded = expandedTopicId === topic.id;

        // Custom styling for topic progress states
        const stateConfig = {
          'Not Started': {
            label: 'Not Started',
            style: 'bg-bg-s3 text-text-muted border-border/60',
            indicator: 'bg-text-muted'
          },
          'In Progress': {
            label: 'In Progress',
            style: 'bg-saffron-dim text-saffron border-saffron-border/30 shadow-[0_0_10px_rgba(255,153,51,0.03)]',
            indicator: 'bg-saffron'
          },
          'Revised': {
            label: 'Revised (Mastered)',
            style: 'bg-purpleL/10 text-purpleL border-purpleL/25',
            indicator: 'bg-purpleL'
          },
          'Completed': {
            label: 'Completed',
            style: 'bg-greenL/10 text-greenL border-greenL/20',
            indicator: 'bg-greenL'
          },
          'Weak Area': {
            label: 'Weak Area',
            style: 'bg-redL/10 text-redL border-redL/20 shadow-[0_0_10px_rgba(255,71,87,0.03)]',
            indicator: 'bg-redL'
          }
        }[progress.status];

        const isCompleted = progress.status === 'Completed' || progress.status === 'Revised';

        return (
          <div 
            key={topic.id} 
            className={`border rounded-lg transition-all duration-200 overflow-hidden ${
              isExpanded 
                ? 'bg-bg-s3/40 border-saffron-border/30 shadow-[0_4px_12px_rgba(255,153,51,0.02)]' 
                : 'bg-bg-s3/20 border-border/80 hover:bg-bg-s3/30'
            }`}
          >
            {/* Header / Summary row */}
            <div className="p-2.5 sm:p-3 flex items-center justify-between gap-2.5 select-none">
              
              {/* Left Side: Expand Toggle, Topic Titles & Status Badge */}
              <div 
                className="flex items-start gap-2 cursor-pointer flex-1 min-w-0"
                onClick={() => toggleTopicExpand(topic.id)}
              >
                <div className="mt-1 shrink-0 text-text-muted">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-saffron" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-xs font-bold text-text group-hover:text-saffron transition-colors leading-tight">
                    {topic.nameHi}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[10px] text-text-muted leading-tight">{topic.name}</span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 border rounded uppercase tracking-wider ${stateConfig.style} flex items-center gap-1 shrink-0`}>
                      <span className={`w-1 h-1 rounded-full ${stateConfig.indicator}`} />
                      <span>{stateConfig.label}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Simplified Toggle Checkbox */}
              <div className="flex items-center shrink-0 pl-1">
                {/* Main Checkbox */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const targetVal = !isCompleted;
                    if (progress.notesRead !== targetVal) onToggleActivity(topic.id, 'notesRead');
                    if (progress.videoWatched !== targetVal) onToggleActivity(topic.id, 'videoWatched');
                    if (progress.mcqCompleted !== targetVal) onToggleActivity(topic.id, 'mcqCompleted');
                  }}
                  className="p-1.5 rounded hover:bg-bg-s2 text-saffron transition-all cursor-pointer"
                  title={isCompleted ? "Mark Incomplete" : "Mark Completed"}
                >
                  {isCompleted ? (
                    <CheckSquare className="w-5.5 h-5.5 text-saffron fill-saffron/10" />
                  ) : (
                    <Square className="w-5.5 h-5.5 text-text-muted hover:text-text" />
                  )}
                </button>
              </div>

            </div>

            {/* Expanded section (subtopics list & detailed statistics) */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-border/50 bg-bg-s3/60 overflow-hidden"
                >
                  <div className="p-3.5 sm:p-4 flex flex-col gap-3.5 sm:gap-4">

                    {/* Interactive Sub-activities Checklist */}
                    <div className="flex flex-col gap-2.5 bg-bg-s2 border border-border/85 p-3 sm:p-3.5 rounded-lg">
                      <span className="text-[10px] font-black uppercase text-saffron tracking-wider">Required Tasks</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mt-1.5">
                        
                        {/* Task 1: Notes */}
                        <button
                          onClick={() => onToggleActivity(topic.id, 'notesRead')}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            progress.notesRead
                              ? 'bg-saffron-dim/10 border-saffron/30 text-saffron'
                              : 'bg-bg-s3 border-border text-text-muted hover:text-text hover:bg-bg-s3/80'
                          }`}
                        >
                          <BookOpen className="w-4 h-4 shrink-0" />
                          <div className="flex flex-col items-start leading-tight">
                            <span>Read PDF Notes</span>
                            <span className="text-[8px] font-normal opacity-75">Study Material</span>
                          </div>
                          <span className="ml-auto text-xs">{progress.notesRead ? '✓' : '○'}</span>
                        </button>

                        {/* Task 2: Video */}
                        <button
                          onClick={() => onToggleActivity(topic.id, 'videoWatched')}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            progress.videoWatched
                              ? 'bg-saffron-dim/10 border-saffron/30 text-saffron'
                              : 'bg-bg-s3 border-border text-text-muted hover:text-text hover:bg-bg-s3/80'
                          }`}
                        >
                          <Play className="w-4 h-4 shrink-0" />
                          <div className="flex flex-col items-start leading-tight">
                            <span>Watch Lectures</span>
                            <span className="text-[8px] font-normal opacity-75">Video Class</span>
                          </div>
                          <span className="ml-auto text-xs">{progress.videoWatched ? '✓' : '○'}</span>
                        </button>

                        {/* Task 3: MCQs */}
                        <button
                          onClick={() => onToggleActivity(topic.id, 'mcqCompleted')}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            progress.mcqCompleted
                              ? 'bg-saffron-dim/10 border-saffron/30 text-saffron'
                              : 'bg-bg-s3 border-border text-text-muted hover:text-text hover:bg-bg-s3/80'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <div className="flex flex-col items-start leading-tight">
                            <span>Solve Practice MCQs</span>
                            <span className="text-[8px] font-normal opacity-75">Practice Test</span>
                          </div>
                          <span className="ml-auto text-xs">{progress.mcqCompleted ? '✓' : '○'}</span>
                        </button>

                      </div>

                      {/* Spaced Repetition Level Up Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-border/40 pt-2.5 mt-1 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-text-muted">Spaced Revision Scale</span>
                          <span className="text-[9px] text-text-muted mt-0.5">Increases memory retention by revising in intervals</span>
                        </div>
                        <button
                          onClick={() => onMarkRevised(topic.id)}
                          className={`px-3 py-2 text-[10px] font-black uppercase rounded-lg border flex items-center justify-center sm:justify-start gap-1.5 transition-all cursor-pointer self-stretch sm:self-auto ${
                            progress.status === 'Revised'
                              ? 'bg-purpleL/25 border-purpleL/30 text-purpleL'
                              : 'bg-bg-s3 border-border text-text-muted hover:text-text hover:bg-bg-s2'
                          }`}
                        >
                          <RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" />
                          <span>Revision Level {progress.revisionCount}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
