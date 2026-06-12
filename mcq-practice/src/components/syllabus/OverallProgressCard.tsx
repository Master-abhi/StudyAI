import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Award } from 'lucide-react';

interface OverallProgressCardProps {
  completedTopics: number;
  totalTopics: number;
  streak: number;
}

export const OverallProgressCard: React.FC<OverallProgressCardProps> = ({
  completedTopics,
  totalTopics,
  streak
}) => {
  const completionPercent = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
  const remaining = totalTopics - completedTopics;

  // Calculate dynamic completion date based on study pace
  const studyPace = streak >= 5 ? 1.5 : 1.0; // topics per day
  const daysToComplete = Math.max(1, Math.ceil(remaining / studyPace));
  
  const today = new Date();
  const completionDate = new Date();
  completionDate.setDate(today.getDate() + daysToComplete);
  
  const formattedCompletionDate = completionDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-bg-s2 border border-saffron-border/30 rounded-lg p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between gap-6"
    >
      {/* Premium Glassmorphic glowing backgrounds */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-dim/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Left side: Stats & Completion numbers */}
      <div className="flex-1 flex flex-col gap-4 z-10">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-saffron" />
          <span className="text-[10px] font-black uppercase text-saffron tracking-widest">OVERALL EXAM PREPARATION</span>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-text tracking-wide leading-none">
            {Math.round(completionPercent)}% Syllabus Completed
          </h2>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            Automatic tracking updates this percentage as you read study notes, watch lectures, and solve mock practices.
          </p>
        </div>

        {/* Detailed counts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-muted uppercase">Topics Completed</span>
            <span className="text-lg font-black text-text">{completedTopics}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-muted uppercase">Topics Remaining</span>
            <span className="text-lg font-black text-text">{remaining}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-muted uppercase">Learning Pace</span>
            <span className="text-lg font-black text-greenL">{studyPace.toFixed(1)} <span className="text-[10px] text-text-muted font-normal">/ day</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-muted uppercase">Target Finish</span>
            <span className="text-xs font-black text-saffron mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedCompletionDate}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Circular progress indicator */}
      <div className="flex flex-col justify-center items-center shrink-0 min-w-[140px] z-10 bg-bg-s3/40 border border-border/80 px-5 py-4 rounded-md">
        <div className="relative flex items-center justify-center w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="transparent"
              stroke="var(--bg-s1, #121620)"
              strokeWidth="8"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="transparent"
              stroke="url(#progress-gradient)"
              strokeWidth="8"
              strokeDasharray={251.2}
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (completionPercent / 100) * 251.2 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
              style={{
                filter: completionPercent > 0 ? 'drop-shadow(0px 0px 6px rgba(255, 153, 51, 0.4))' : 'none'
              }}
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb84d" />
                <stop offset="100%" stopColor="#ff9933" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
            <span className="text-lg font-black text-text">{Math.round(completionPercent)}%</span>
            <span className="text-[8px] text-text-muted font-bold uppercase mt-1">Ready</span>
          </div>
        </div>
        
        <span className="text-[9px] text-text-muted font-black uppercase mt-3 tracking-widest text-center flex items-center gap-1.5 bg-bg-s3 border border-border px-2 py-0.5 rounded">
          <Award className="w-3 h-3 text-saffron" />
          <span>Prep Score Card</span>
        </span>
      </div>
      
    </motion.div>
  );
};
