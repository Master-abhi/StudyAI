import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface QuestionPaletteProps {
  isOpen: boolean;
  totalQuestions: number;
  currentIndex: number;
  answers: (number | null)[];
  markedForReview: boolean[];
  visited: boolean[];
  onSelectIndex: (idx: number) => void;
  onClose: () => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  isOpen,
  totalQuestions,
  currentIndex,
  answers,
  markedForReview,
  visited,
  onSelectIndex,
  onClose,
}) => {
  const getStatusColor = (idx: number) => {
    if (idx === currentIndex) {
      return 'bg-saffron text-bg-s1 ring-2 ring-saffron ring-offset-2 ring-offset-bg-s2 font-black';
    }
    if (markedForReview[idx]) {
      return 'bg-purple-600 text-text border border-purple-400/40 font-bold';
    }
    if (answers[idx] !== null) {
      return 'bg-greenL text-bg-s1 font-bold';
    }
    if (visited[idx]) {
      return 'bg-bg-s3 text-text-muted border border-border font-medium';
    }
    return 'bg-[#0B0E14] text-text-muted border border-border/60 opacity-60';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="absolute left-0 top-[56px] w-full bg-bg-s2 border-b border-border/80 p-4 shadow-xl z-30"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
            <div className="flex items-center gap-1.5 text-text-muted font-bold text-xs uppercase tracking-wider">
              <span>📋 Question Navigator</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded bg-bg-s3 text-text-muted hover:text-text cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Numbers Grid */}
          <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 gap-2.5 max-h-[160px] overflow-y-auto pr-1">
            {Array.from({ length: totalQuestions }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectIndex(idx);
                  onClose();
                }}
                className={`h-9 rounded-md flex items-center justify-center text-xs transition-all duration-150 cursor-pointer ${
                  getStatusColor(idx)
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 xs:grid-cols-4 gap-2 text-[10px] text-text-muted font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-saffron" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-greenL" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-purple-600" />
              <span>Review</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-bg-s3 border border-border" />
              <span>Not Answered</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
