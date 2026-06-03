import React from 'react';
import { motion } from 'framer-motion';
import { Library, FileText } from 'lucide-react';
import type { Question } from '../types';

interface ExplanationCardProps {
  question: Question;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  question,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full bg-green-500/[0.03] border border-greenL/20 rounded-lg p-5 flex flex-col gap-4 shadow-md mt-2"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-greenL/10 pb-3">
        <div className="flex items-center gap-2 text-greenL font-black text-xs uppercase tracking-widest">
          <FileText className="w-4 h-4" />
          <span>Detailed Explanation / स्पष्टीकरण</span>
        </div>

        {question.examRelevance && (
          <span className="text-[10px] font-black uppercase text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded flex items-center gap-1">
            <Library className="w-3 h-3" />
            {question.examRelevance}
          </span>
        )}
      </div>

      {/* Explanation text */}
      <div className="text-sm text-text/90 leading-relaxed font-medium space-y-2 select-text font-hindi">
        {question.explanation.split('\n\n').map((paragraph, pIdx) => (
          <p key={pIdx}>{paragraph}</p>
        ))}
      </div>
    </motion.div>
  );
};
