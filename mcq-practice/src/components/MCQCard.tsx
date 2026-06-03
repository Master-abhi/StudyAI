import React from 'react';
import { HelpCircle, Bookmark } from 'lucide-react';
import type { Question } from '../types';

interface MCQCardProps {
  question: Question;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onReport: () => void;
}

export const MCQCard: React.FC<MCQCardProps> = ({
  question,
  index,
  isBookmarked,
  onToggleBookmark,
  onReport,
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy':
        return 'text-greenL bg-green-500/10 border-green-500/25';
      case 'hard':
        return 'text-redL bg-red-500/10 border-red-500/25';
      case 'medium':
      default:
        return 'text-gold bg-gold/10 border-gold/25';
    }
  };

  return (
    <div className="w-full bg-bg-s2 border border-border/80 rounded-lg p-5 shadow-lg relative flex flex-col gap-4 overflow-hidden">
      {/* Top row with badges and action buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Difficulty Badge */}
          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border ${
            getDifficultyColor(question.difficulty || 'medium')
          }`}>
            {question.difficulty || 'Medium'}
          </span>

          {/* Tag Badges */}
          {question.isCgSpecific && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border bg-saffron-dim border-saffron-border/30 text-saffron">
              📍 CG Specific
            </span>
          )}

          {question.weightage === 'high' && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border bg-purple-500/10 border-purple-500/20 text-purple-400">
              🔥 High Weight
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 text-text-muted">
          <button
            onClick={onToggleBookmark}
            className={`p-1.5 rounded-lg hover:bg-bg-s3 transition-colors cursor-pointer ${
              isBookmarked ? 'text-saffron' : 'hover:text-text'
            }`}
            title="Bookmark Question"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-saffron' : ''}`} />
          </button>
          <button
            onClick={onReport}
            className="p-1.5 rounded-lg hover:bg-bg-s3 hover:text-text transition-colors cursor-pointer"
            title="Report Error"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main question content */}
      <div className="flex flex-col gap-2">
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-saffron" />
          <span>Question {index + 1}</span>
        </div>
        <p className="text-base sm:text-lg font-bold text-text leading-relaxed select-text font-hindi">
          {question.question}
        </p>
      </div>

      {/* Subtle bottom design stroke */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-saffron to-gold" />
    </div>
  );
};
