import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, CheckCircle, RefreshCcw, 
  ChevronDown, ChevronUp, CheckSquare, Square, FileText, BookOpen, Lock
} from 'lucide-react';
import type { Chapter, TopicProgress, Topic } from './syllabusData';

interface TopicListProps {
  chapter: Chapter;
  topicProgress: Record<string, TopicProgress>;
  unlockedTopicIds?: Set<string>;
  userPlan?: 'free' | 'paid';
  onOpenUpgrade?: (topicName?: string) => void;
  onToggleActivity: (topicId: string, activityType: 'notesRead' | 'mcqCompleted' | 'videoWatched') => void;
  onMarkRevised: (topicId: string) => void;
  onOpenPdf?: (topic: Topic) => void;
  onOpenNotes?: (topic: Topic) => void;
  onOpenLectures?: (topic: Topic) => void;
  onOpenPracticeMcqs?: (topic: Topic) => void;
  onOpen3DMap?: (stateId?: string) => void;
}

export const TopicList: React.FC<TopicListProps> = ({
  chapter,
  topicProgress,
  unlockedTopicIds,
  userPlan = 'free',
  onOpenUpgrade,
  onToggleActivity,
  onMarkRevised,
  onOpenPdf,
  onOpenNotes,
  onOpenLectures,
  onOpenPracticeMcqs,
  onOpen3DMap
}) => {
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopicId(expandedTopicId === topicId ? null : topicId);
  };

  const topics = Array.isArray(chapter?.topics) ? chapter.topics : [];

  return (
    <div className="flex flex-col gap-3 pl-3 border-l border-border/80">
      {topics.map(topic => {
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
        const isLocked = Boolean(unlockedTopicIds && !unlockedTopicIds.has(topic.id) && userPlan !== 'paid');

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
        const hasInteractiveNotes = Boolean(topic.hasStudyNotes || topic.studyNotes);
        const hasPdfNotes = Boolean(topic.pdfPath);
        const hasUploadedNotes = hasInteractiveNotes || hasPdfNotes;

        return (
          <div 
            key={topic.id} 
            className={`border rounded-lg transition-all duration-200 overflow-hidden ${
              isExpanded 
                ? 'bg-bg-s3/40 border-saffron-border/30 shadow-[0_4px_12px_rgba(255,153,51,0.02)]' 
                : hasUploadedNotes
                  ? 'bg-emerald-500/[0.04] border-emerald-500/25 hover:bg-emerald-500/[0.08]'
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
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-text group-hover:text-saffron transition-colors leading-tight">
                      {topic.nameHi}
                    </span>
                    {isLocked && (
                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-0.5 shrink-0">
                        <Lock className="w-2.5 h-2.5" />
                        <span>PRO LOCK</span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[10px] text-text-muted leading-tight">{topic.name}</span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 border rounded uppercase tracking-wider ${stateConfig.style} flex items-center gap-1 shrink-0`}>
                      <span className={`w-1 h-1 rounded-full ${stateConfig.indicator}`} />
                      <span>{stateConfig.label}</span>
                    </span>
                    {hasInteractiveNotes && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isLocked) {
                            if (onOpenUpgrade) onOpenUpgrade(topic.nameHi || topic.name);
                            else alert('यह टॉपिक Pro Pass में उपलब्ध है।');
                            return;
                          }
                          if (onOpenNotes) onOpenNotes(topic);
                          else if (topic.pdfPath && onOpenPdf) onOpenPdf(topic);
                        }}
                        className={`text-[8px] font-black px-1.5 py-0.5 rounded border flex items-center gap-1 shrink-0 shadow-sm cursor-pointer ${
                          isLocked 
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                            : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                        }`}
                        title={isLocked ? "Pro Plan Required" : "Open Interactive Study Notes"}
                      >
                        {isLocked ? <Lock className="w-2.5 h-2.5" /> : <BookOpen className="w-2.5 h-2.5" />}
                        <span>{isLocked ? 'NOTES (LOCKED)' : 'STUDY NOTES'}</span>
                      </button>
                    )}
                    {hasPdfNotes && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isLocked) {
                            if (onOpenUpgrade) onOpenUpgrade(topic.nameHi || topic.name);
                            else alert('यह टॉपिक Pro Pass में उपलब्ध है।');
                            return;
                          }
                          if (onOpenPdf) onOpenPdf(topic);
                        }}
                        className={`text-[8px] font-black px-1.5 py-0.5 rounded border flex items-center gap-1 shrink-0 shadow-sm cursor-pointer ${
                          isLocked
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                            : 'bg-saffron/15 text-saffron border-saffron/30 hover:bg-saffron/25'
                        }`}
                        title={isLocked ? "Pro Plan Required" : "Open Attached PDF Notes"}
                      >
                        {isLocked ? <Lock className="w-2.5 h-2.5" /> : <FileText className="w-2.5 h-2.5" />}
                        <span>{isLocked ? 'PDF (LOCKED)' : 'PDF NOTES'}</span>
                      </button>
                    )}
                    {(topic.id === 'geo-ind-3d-map' || topic.name.toLowerCase().includes('3d')) && onOpen3DMap && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpen3DMap();
                        }}
                        className="text-[8px] font-black px-1.5 py-0.5 rounded border flex items-center gap-1 shrink-0 shadow-sm cursor-pointer bg-gradient-to-r from-saffron/20 to-sky-500/20 text-saffron border-saffron/40 hover:bg-saffron/30"
                        title="Open 3D India Map Explorer"
                      >
                        <span>🗺️ 3D MAP EXPLORER</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Simplified Toggle Checkbox */}
              <div className="flex items-center shrink-0 pl-1">
                {/* Main Checkbox */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isLocked) {
                      if (onOpenUpgrade) onOpenUpgrade(topic.nameHi || topic.name);
                      return;
                    }
                    const targetVal = !isCompleted;
                    if (progress.notesRead !== targetVal) onToggleActivity(topic.id, 'notesRead');
                    if (progress.videoWatched !== targetVal) onToggleActivity(topic.id, 'videoWatched');
                    if (progress.mcqCompleted !== targetVal) onToggleActivity(topic.id, 'mcqCompleted');
                  }}
                  className="p-1.5 rounded hover:bg-bg-s2 text-saffron transition-all cursor-pointer"
                  title={isLocked ? "Pro Plan Required" : isCompleted ? "Mark Incomplete" : "Mark Completed"}
                >
                  {isLocked ? (
                    <Lock className="w-4 h-4 text-amber-400" />
                  ) : isCompleted ? (
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
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-saffron tracking-wider">Required Tasks</span>
                        {isLocked && (
                          <span className="text-[9px] font-bold text-amber-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>Pro Pass में अनलॉक होगा</span>
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mt-1.5">
                        
                        {/* Task 1: Notes (Opens Interactive Notes Reader Modal or PDF) */}
                        <button
                          onClick={() => {
                            if (isLocked) {
                              if (onOpenUpgrade) onOpenUpgrade(topic.nameHi || topic.name);
                              else alert('यह टॉपिक Pro Pass में उपलब्ध है।');
                              return;
                            }
                            if ((topic.hasStudyNotes || topic.studyNotes) && onOpenNotes) {
                              onOpenNotes(topic);
                            } else if (topic.pdfPath && onOpenPdf) {
                              onOpenPdf(topic);
                            } else if (onOpenNotes) {
                              onOpenNotes(topic);
                            } else {
                              onToggleActivity(topic.id, 'notesRead');
                            }
                          }}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            isLocked
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                              : progress.notesRead
                                ? 'bg-saffron-dim/10 border-saffron/30 text-saffron'
                                : (topic.hasStudyNotes || topic.studyNotes)
                                  ? 'bg-emerald-500/10 border-emerald-500/40 text-text hover:bg-emerald-500/20'
                                  : topic.pdfPath 
                                    ? 'bg-saffron/10 border-saffron/40 text-text hover:bg-saffron/20'
                                    : 'bg-bg-s3 border-border text-text-muted hover:text-text hover:bg-bg-s3/80'
                          }`}
                        >
                          {isLocked ? (
                            <Lock className="w-4 h-4 shrink-0 text-amber-400" />
                          ) : topic.hasStudyNotes || topic.studyNotes ? (
                            <BookOpen className="w-4 h-4 shrink-0 text-emerald-400" />
                          ) : (
                            <FileText className={`w-4 h-4 shrink-0 ${topic.pdfPath ? 'text-saffron' : ''}`} />
                          )}
                          <div className="flex flex-col items-start leading-tight min-w-0">
                            <span className="truncate">
                              {isLocked ? 'Notes (Pro Locked)' : (topic.hasStudyNotes || topic.studyNotes) ? 'Read Study Notes' : topic.pdfPath ? 'Read PDF Notes' : 'Mark Notes Read'}
                            </span>
                            <span className="text-[8px] font-normal opacity-75 truncate">
                              {isLocked ? 'Upgrade to Unlock' : (topic.hasStudyNotes || topic.studyNotes) ? 'Interactive Reader' : topic.pdfPath ? (topic.pdfName || 'Attached PDF') : 'Study Material'}
                            </span>
                          </div>
                          <span className="ml-auto text-xs shrink-0">
                            {isLocked ? '🔒' : progress.notesRead ? '✓' : (topic.hasStudyNotes || topic.studyNotes || topic.pdfPath) ? '📖' : '○'}
                          </span>
                        </button>

                        {/* Task 2: Video Lectures (Curated YouTube Classes) */}
                        <button
                          onClick={() => {
                            if (onOpenLectures) {
                              onOpenLectures(topic);
                            } else {
                              onToggleActivity(topic.id, 'videoWatched');
                            }
                          }}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            progress.videoWatched
                              ? 'bg-red-500/10 border-red-500/30 text-red-500'
                              : 'bg-bg-s3 border-border text-text-muted hover:text-text hover:bg-bg-s3/80 hover:border-red-500/30'
                          }`}
                        >
                          <Play className={`w-4 h-4 shrink-0 ${progress.videoWatched ? 'text-red-500' : 'text-red-500/80'}`} />
                          <div className="flex flex-col items-start leading-tight min-w-0">
                            <span>Watch Lectures</span>
                            <span className="text-[8px] font-normal opacity-75">YouTube Video Class</span>
                          </div>
                          <span className="ml-auto text-xs shrink-0">{progress.videoWatched ? '✓' : '▶'}</span>
                        </button>

                        {/* Task 3: Topic Practice MCQs */}
                        <button
                          onClick={() => {
                            if (isLocked) {
                              if (onOpenUpgrade) onOpenUpgrade(topic.nameHi || topic.name);
                              else alert('यह टॉपिक Pro Pass में उपलब्ध है।');
                              return;
                            }
                            if (onOpenPracticeMcqs) {
                              onOpenPracticeMcqs(topic);
                            } else {
                              onToggleActivity(topic.id, 'mcqCompleted');
                            }
                          }}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                            isLocked
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                              : progress.mcqCompleted
                                ? 'bg-saffron-dim/10 border-saffron/30 text-saffron'
                                : 'bg-bg-s3 border-border text-text-muted hover:text-text hover:bg-bg-s3/80 hover:border-saffron/40'
                          }`}
                        >
                          {isLocked ? (
                            <Lock className="w-4 h-4 shrink-0 text-amber-400" />
                          ) : (
                            <CheckCircle className={`w-4 h-4 shrink-0 ${progress.mcqCompleted ? 'text-saffron' : ''}`} />
                          )}
                          <div className="flex flex-col items-start leading-tight min-w-0">
                            <span>{isLocked ? 'Practice MCQs (Locked)' : 'Solve Practice MCQs'}</span>
                            <span className="text-[8px] font-normal opacity-75">{isLocked ? 'Upgrade to Unlock' : 'Topic Tests & Quizzes'}</span>
                          </div>
                          <span className="ml-auto text-xs shrink-0">{isLocked ? '🔒' : progress.mcqCompleted ? '✓' : '🎯'}</span>
                        </button>

                        {/* Task 4: 3D Map Explorer for Geography & 3D Topics */}
                        {(topic.id === 'geo-ind-3d-map' || topic.name.toLowerCase().includes('3d')) && onOpen3DMap && (
                          <button
                            onClick={() => onOpen3DMap()}
                            className="col-span-1 sm:col-span-3 flex items-center justify-between p-2.5 sm:p-3 rounded-lg border border-saffron/40 bg-gradient-to-r from-saffron/15 via-amber-500/10 to-sky-500/15 text-saffron hover:from-saffron/25 hover:to-sky-500/25 transition-all cursor-pointer shadow-sm"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg sm:text-xl">🗺️</span>
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-black text-white">3D Interactive Map: भारत एवं छत्तीसगढ़ 3D मानचित्र एक्सप्लोरर</span>
                                <span className="text-[10px] text-slate-300">Survey of India 2020 सीमाएं, 3D नदियां, पर्वतमालाएं एवं 33 जिले</span>
                              </div>
                            </div>
                            <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-gradient-to-r from-saffron to-amber-500 text-slate-950 shadow shrink-0">
                              3D खोलें ↗
                            </span>
                          </button>
                        )}

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
