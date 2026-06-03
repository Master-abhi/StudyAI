import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

interface ProgressBarSectionProps {
  totalQuestions: number;
  answers: (number | null)[];
  xp: number;
  streak: number;
  floatingXp: number | null;
}

export const ProgressBarSection: React.FC<ProgressBarSectionProps> = ({
  totalQuestions,
  answers,
  xp,
  streak,
  floatingXp,
}) => {
  const answeredCount = answers.filter(a => a !== null).length;
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <div className="w-full bg-[#121620] px-4 py-3 flex flex-col gap-2 relative">
      <div className="flex items-center justify-between">
        {/* XP and Streak display */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-saffron-dim border border-saffron-border/30 px-2.5 py-1 rounded-full text-xs font-black text-saffron relative">
            <Zap className="w-3.5 h-3.5 fill-saffron" />
            <span>{xp} XP</span>
            <AnimatePresence>
              {floatingXp !== null && (
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.5 }}
                  animate={{ opacity: 1, y: -20, scale: 1.2 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 font-extrabold text-saffron bg-[#0B0E14] border border-saffron px-1.5 py-0.5 rounded text-[10px] pointer-events-none"
                >
                  +{floatingXp} XP
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black transition-all ${
            streak > 0 
              ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400' 
              : 'bg-bg-s3 border border-border text-text-muted'
          }`}>
            <span>🔥</span>
            <span>{streak} Streak</span>
          </div>
        </div>

        {/* Progress Tracker text */}
        <div className="text-[11px] font-semibold text-text-muted">
          Progress: <span className="text-saffron font-extrabold">{answeredCount}</span>/{totalQuestions}
        </div>
      </div>

      {/* Progress Track */}
      <div className="h-2 w-full bg-bg-s3 rounded-full overflow-hidden border border-border/50">
        <motion.div
          className="h-full bg-gradient-to-r from-saffron to-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
