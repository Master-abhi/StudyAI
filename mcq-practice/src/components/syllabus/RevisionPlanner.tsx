import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, AlertCircle, CheckCircle2, Clock, Hourglass } from 'lucide-react';
import type { Exam, TopicProgress } from './syllabusData';

interface RevisionPlannerProps {
  exam: Exam;
  topicProgress: Record<string, TopicProgress>;
  onMarkRevised: (topicId: string) => void;
}

interface RevisionTask {
  topicId: string;
  topicName: string;
  topicNameHi: string;
  subjectName: string;
  subjectId: string;
  accuracy: number;
  dueDate: Date;
  isOverdue: boolean;
  revisionCount: number;
}

export const RevisionPlanner: React.FC<RevisionPlannerProps> = ({
  exam,
  topicProgress,
  onMarkRevised
}) => {
  const today = new Date();
  
  // Find all subjects, chapters, and topics
  const overdueTasks: RevisionTask[] = [];
  const upcomingTasks: RevisionTask[] = [];

  exam.subjects.forEach(subject => {
    subject.chapters.forEach(chapter => {
      chapter.topics.forEach(topic => {
        const progress = topicProgress[topic.id];
        
        // Only completed or revised topics participate in spaced repetition
        if (progress && (progress.status === 'Completed' || progress.status === 'Revised' || progress.status === 'Weak Area')) {
          if (progress.nextRevisionDate) {
            const dueDate = new Date(progress.nextRevisionDate);
            const timeDiff = dueDate.getTime() - today.getTime();
            const isOverdue = dueDate <= today;

            const task: RevisionTask = {
              topicId: topic.id,
              topicName: topic.name,
              topicNameHi: topic.nameHi,
              subjectName: subject.name,
              subjectId: subject.id,
              accuracy: progress.accuracy,
              dueDate,
              isOverdue,
              revisionCount: progress.revisionCount
            };

            if (isOverdue) {
              overdueTasks.push(task);
            } else if (timeDiff <= 7 * 24 * 60 * 60 * 1000) { // next 7 days
              upcomingTasks.push(task);
            }
          }
        }
      });
    });
  });

  // Sort overdue tasks: oldest first
  overdueTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  // Sort upcoming tasks: earliest first
  upcomingTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  // Define important milestones and calculate countdowns
  // Current simulated date is 2026-06-02
  const targetMilestones = [
    {
      title: 'Complete CG History Revision',
      targetDate: '2026-06-15T00:00:00Z',
      category: 'History'
    },
    {
      title: 'Finish Indian Polity Revision',
      targetDate: '2026-06-22T00:00:00Z',
      category: 'Polity'
    },
    {
      title: 'Wrap-up Economy & Schemes',
      targetDate: '2026-07-05T00:00:00Z',
      category: 'Economy'
    }
  ];

  const getDaysRemaining = (targetStr: string) => {
    const target = new Date(targetStr);
    const diff = target.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Target Milestone Countdowns */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
          <Hourglass className="w-3.5 h-3.5 text-saffron" />
          <span>Important Revision Milestones</span>
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {targetMilestones.map((milestone, idx) => {
            const days = getDaysRemaining(milestone.targetDate);
            let color = 'from-saffron/10 to-transparent border-saffron-border/30';
            if (days <= 7) color = 'from-red-500/10 to-transparent border-red-500/35';
            else if (days >= 20) color = 'from-green-500/10 to-transparent border-green-500/25';

            return (
              <div 
                key={idx}
                className={`p-4 bg-gradient-to-br ${color} bg-bg-s2 border rounded-lg flex justify-between items-center shadow-md relative overflow-hidden`}
              >
                <div className="flex flex-col gap-0.5 z-10">
                  <span className="text-[9px] uppercase font-black text-text-muted">{milestone.category}</span>
                  <span className="text-xs font-bold text-text leading-tight">{milestone.title}</span>
                </div>
                <div className="flex flex-col items-center shrink-0 z-10 bg-bg-s3/90 border border-border px-2.5 py-1.5 rounded">
                  <span className={`text-lg font-black leading-none ${days <= 7 ? 'text-redL' : 'text-saffron'}`}>
                    {days}
                  </span>
                  <span className="text-[8px] font-bold text-text-muted uppercase mt-0.5">Days Left</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spaced Repetition Revision Worklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Overdue Revisions */}
        <div className="bg-bg-s2 border border-border rounded-lg p-5 shadow-lg flex flex-col gap-4">
          <div className="flex justify-between items-center pb-2 border-b border-border/40">
            <h5 className="text-xs font-black text-redL uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Overdue Revisions ({overdueTasks.length})</span>
            </h5>
            <span className="text-[9px] bg-red-500/10 border border-red-500/25 text-redL px-1.5 py-0.5 rounded font-black uppercase">
              Action Required
            </span>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[280px] pr-1">
            <AnimatePresence mode="popLayout">
              {overdueTasks.length > 0 ? (
                overdueTasks.map(task => (
                  <motion.div
                    key={task.topicId}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="p-3 bg-bg-s3/70 hover:bg-bg-s3 border border-border hover:border-red-500/25 rounded flex items-center justify-between gap-3 transition-colors group"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-text flex items-center gap-1.5 group-hover:text-redL transition-colors">
                        {task.topicNameHi}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] text-text-muted leading-tight">
                        <span className="truncate max-w-[100px]">{task.subjectName}</span>
                        <span>•</span>
                        <span className="text-redL font-bold">Accuracy: {task.accuracy}%</span>
                        <span>•</span>
                        <span>Lvl {task.revisionCount}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onMarkRevised(task.topicId)}
                      className="px-2.5 py-1 bg-redL hover:bg-greenL text-bg-s1 hover:text-bg-s1 text-[9px] font-black uppercase rounded flex items-center gap-1 transition-all cursor-pointer shadow-md"
                      title="Mark as Revised"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Revise</span>
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center text-text-muted">
                  <CheckCircle2 className="w-8 h-8 text-greenL mb-2 animate-bounce" />
                  <span className="text-xs font-bold text-text">All Caught Up!</span>
                  <span className="text-[10px] text-text-muted mt-0.5">No overdue topics on your revision board.</span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Upcoming Revisions */}
        <div className="bg-bg-s2 border border-border rounded-lg p-5 shadow-lg flex flex-col gap-4">
          <div className="flex justify-between items-center pb-2 border-b border-border/40">
            <h5 className="text-xs font-black text-saffron uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Upcoming (Next 7 Days) ({upcomingTasks.length})</span>
            </h5>
            <span className="text-[9px] bg-bg-s3 border border-border text-text-muted px-1.5 py-0.5 rounded font-bold uppercase">
              Schedule
            </span>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[280px] pr-1">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map(task => {
                const diffTime = task.dueDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return (
                  <div
                    key={task.topicId}
                    className="p-3 bg-bg-s3/40 border border-border/80 rounded flex items-center justify-between gap-3 group"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-text group-hover:text-saffron transition-colors">
                        {task.topicNameHi}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] text-text-muted leading-tight">
                        <span className="truncate max-w-[100px]">{task.subjectName}</span>
                        <span>•</span>
                        <span className="text-greenL font-bold">Accuracy: {task.accuracy}%</span>
                        <span>•</span>
                        <span>Lvl {task.revisionCount}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-bg-s3 border border-border px-2 py-1 rounded text-[9px] text-text-muted font-bold whitespace-nowrap">
                      <Clock className="w-3 h-3 text-saffron" />
                      <span>{diffDays === 0 ? 'Today' : `in ${diffDays}d`}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center text-text-muted">
                <Hourglass className="w-8 h-8 text-text-muted/40 mb-2" />
                <span className="text-xs font-bold text-text-muted">Nothing Scheduled</span>
                <span className="text-[10px] text-text-muted mt-0.5">No upcoming revision tasks. Keep studying new topics!</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
