import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface OptionListProps {
  options: string[];
  correctIndex: number;
  selectedIndex: number | null;
  answered: boolean;
  onSelectOption: (optIdx: number) => void;
  showFeedback?: boolean;
}

export const OptionList: React.FC<OptionListProps> = ({
  options,
  correctIndex,
  selectedIndex,
  answered,
  onSelectOption,
  showFeedback = true,
}) => {
  const letters = ['A', 'B', 'C', 'D'];

  const getOptionClasses = (optIdx: number) => {
    let classes = 'w-full bg-bg-s2 border rounded-md p-4 flex items-center justify-between gap-3 text-left cursor-pointer transition-all duration-200 select-none ';

    if (answered && showFeedback) {
      if (optIdx === correctIndex) {
        classes += 'border-greenL bg-green-500/5 text-greenL';
      } else if (optIdx === selectedIndex && optIdx !== correctIndex) {
        classes += 'border-redL bg-red-500/5 text-redL';
      } else {
        classes += 'border-border/50 opacity-40 text-text-muted';
      }
    } else {
      if (optIdx === selectedIndex) {
        classes += 'border-saffron bg-saffron-dim/40 text-saffron font-bold';
      } else {
        classes += 'border-border hover:border-saffron-border/60 hover:bg-bg-s3/40 text-text';
      }
    }

    return classes;
  };

  const getLetterClasses = (optIdx: number) => {
    let classes = 'w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs flex-shrink-0 ';

    if (answered && showFeedback) {
      if (optIdx === correctIndex) {
        classes += 'bg-greenL border-greenL text-bg-s1';
      } else if (optIdx === selectedIndex && optIdx !== correctIndex) {
        classes += 'bg-redL border-redL text-text';
      } else {
        classes += 'bg-bg-s3 border-border/50 text-text-muted';
      }
    } else {
      if (optIdx === selectedIndex) {
        classes += 'bg-saffron border-saffron text-bg-s1';
      } else {
        classes += 'bg-bg-s3 border-border text-text-muted';
      }
    }

    return classes;
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {options.map((option, optIdx) => {
        const isCorrect = optIdx === correctIndex;
        const isWrong = optIdx === selectedIndex && !isCorrect;

        return (
          <motion.button
            key={optIdx}
            disabled={answered && showFeedback}
            onClick={() => onSelectOption(optIdx)}
            className={getOptionClasses(optIdx)}
            whileHover={!answered ? { scale: 1.015, y: -1 } : {}}
            whileTap={!answered ? { scale: 0.985 } : {}}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            layout
          >
            <div className="flex items-center gap-3">
              {/* Option Letter */}
              <div className={getLetterClasses(optIdx)}>
                {letters[optIdx]}
              </div>

              {/* Option Text */}
              <span className="text-sm font-medium leading-relaxed font-hindi whitespace-pre-wrap">
                {option}
              </span>
            </div>

            {/* Answer outcome icons */}
            {answered && showFeedback && (
              <div className="flex-shrink-0">
                {isCorrect && (
                  <div className="p-1 rounded-full bg-greenL/25 border border-greenL/25 text-greenL">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                {isWrong && (
                  <div className="p-1 rounded-full bg-redL/25 border border-redL/25 text-redL">
                    <X className="w-4 h-4" />
                  </div>
                )}
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
