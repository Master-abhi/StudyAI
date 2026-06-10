import React from 'react';
import { HelpCircle, Bookmark } from 'lucide-react';
import type { Question } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

const cleanPrefix = (str: string): string => {
  if (!str) return '';
  // Match prefixes like (a), (A), (1), (I), (क), (ख) or a., A., 1., क., etc.
  return str.replace(/^\s*(?:\([^)]+\)|[a-zA-Z0-9\u0900-\u097F]+\.|[a-zA-Z0-9\u0900-\u097F]+\))\s*/, '');
};

const stripMarkdownTable = (text: string): string => {
  if (!text) return '';
  const lines = text.split('\n');
  const cleanedLines = lines.filter(line => {
    const trimmed = line.trim();
    // Remove separator lines like |---|---|
    if (/^\|?\s*:?-+:?\s*\|(?:\s*:?-+:?\s*\|?)*$/.test(trimmed)) {
      return false;
    }
    // Remove rows starting with |
    if (trimmed.startsWith('|')) {
      return false;
    }
    return true;
  });
  return cleanedLines.join('\n').trim();
};

export const stripAssertionReason = (text: string): string => {
  if (!text) return '';
  // Matches newlines followed by markers like **कथन [As] :, **कारण [R] :, Assertion [As] :, As :, R :, etc.
  const regex = /\n+(?:\*\*)?(?:कथन|कारण|Assertion|Reason|\[As\]|\[R\])\s*(?:\[[^\]]+\])?\s*(?::|：)?/i;
  const match = text.match(regex);
  if (match && match.index !== undefined) {
    return text.substring(0, match.index).trim();
  }
  return text;
};

export const stripStatements = (text: string): string => {
  if (!text) return '';
  // Match a newline followed by label like (1), 1., (A), A., (a), etc.
  const regex = /\n+(?:\)?)?(?:\()?[a-zA-Z0-9\u0900-\u097F]+(?:\.|\))\s+/i;
  const match = text.match(regex);
  if (match && match.index !== undefined) {
    return text.substring(0, match.index).trim();
  }
  return text;
};


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

        {question.qType === 'assertion_reason' || (question.assertion?.trim() && question.reason?.trim()) ? (
          <div className="flex flex-col gap-4 mt-1">
            {question.question && (
              <MarkdownRenderer 
                content={(() => {
                  const cleaned = stripAssertionReason(question.question);
                  return cleaned.trim() ? cleaned : 'नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए:';
                })()}
                className="text-base sm:text-lg font-bold text-text font-hindi"
                pClassName="text-base sm:text-lg font-bold text-text leading-relaxed font-hindi"
              />
            )}
            <div className="grid grid-cols-1 gap-3">
              {/* Assertion Box */}
              {question.assertion && (
                <div className="bg-bg-s3/40 border-l-4 border-saffron rounded-r-xl p-4 flex flex-col gap-2 shadow-sm">
                  <span className="text-[9px] font-black uppercase text-saffron tracking-wider select-none">
                    कथन [Assertion - As]
                  </span>
                  <MarkdownRenderer 
                    content={question.assertion}
                    className="text-sm sm:text-base font-semibold text-text font-hindi"
                    pClassName="text-sm sm:text-base font-semibold text-text leading-relaxed font-hindi"
                  />
                </div>
              )}

              {/* Reason Box */}
              {question.reason && (
                <div className="bg-bg-s3/40 border-l-4 border-blue-500 rounded-r-xl p-4 flex flex-col gap-2 shadow-sm">
                  <span className="text-[9px] font-black uppercase text-blue-400 tracking-wider select-none">
                    कारण [Reason - R]
                  </span>
                  <MarkdownRenderer 
                    content={question.reason}
                    className="text-sm sm:text-base font-semibold text-text font-hindi"
                    pClassName="text-sm sm:text-base font-semibold text-text leading-relaxed font-hindi"
                  />
                </div>
              )}
            </div>
          </div>
        ) : question.qType === 'match_column' || (question.columnI && question.columnI.length > 0 && question.columnII && question.columnII.length > 0) ? (
          <div className="flex flex-col gap-4 mt-1">
            {question.question && (
              <MarkdownRenderer 
                content={(() => {
                  const cleaned = stripMarkdownTable(question.question);
                  return cleaned.trim() ? cleaned : 'निम्नलिखित को सुमेलित कीजिए-';
                })()}
                className="text-base sm:text-lg font-bold text-text font-hindi"
                pClassName="text-base sm:text-lg font-bold text-text leading-relaxed font-hindi"
              />
            )}
            <div className="overflow-hidden border border-border rounded-xl bg-bg-s3/20 shadow-md max-w-full font-sans">
              <div className="grid grid-cols-2 bg-bg-s3/80 border-b border-border/80 text-[10px] font-black uppercase text-text-muted select-none">
                <div className="px-4 py-3 border-r border-border/60">कॉलम-I</div>
                <div className="px-4 py-3">कॉलम-II</div>
              </div>
              <div className="divide-y divide-border/40 font-hindi">
                {Array.from({ length: Math.max(question.columnI?.length || 0, question.columnII?.length || 0) }).map((_, i) => (
                  <div key={i} className="grid grid-cols-2 hover:bg-bg-s3/30 transition-colors">
                    <div className="px-4 py-3.5 text-xs sm:text-sm text-text border-r border-border/40 font-semibold select-text leading-relaxed whitespace-pre-wrap flex items-start gap-2">
                      <span className="text-saffron font-black select-none shrink-0 bg-saffron/10 px-1.5 py-0.5 rounded text-[10px]">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {question.columnI?.[i] && (
                        <MarkdownRenderer 
                          content={cleanPrefix(question.columnI[i])}
                          className="text-xs sm:text-sm font-semibold text-text font-hindi"
                          pClassName="text-xs sm:text-sm font-semibold text-text leading-relaxed font-hindi inline-block"
                        />
                      )}
                    </div>
                    <div className="px-4 py-3.5 text-xs sm:text-sm text-text font-semibold select-text leading-relaxed whitespace-pre-wrap flex items-start gap-2">
                      <span className="text-blue-400 font-black select-none shrink-0 bg-blue-500/10 px-1.5 py-0.5 rounded text-[10px]">
                        {i + 1}
                      </span>
                      {question.columnII?.[i] && (
                        <MarkdownRenderer 
                          content={cleanPrefix(question.columnII[i])}
                          className="text-xs sm:text-sm font-semibold text-text font-hindi"
                          pClassName="text-xs sm:text-sm font-semibold text-text leading-relaxed font-hindi inline-block"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (question.qType === 'ordering' || question.qType === 'multi_statement' || (question.statements && question.statements.length > 0)) ? (
          <div className="flex flex-col gap-4 mt-1">
            {question.question && (
              <MarkdownRenderer 
                content={(() => {
                  const cleaned = stripStatements(question.question);
                  return cleaned.trim() ? cleaned : 'नीचे दिए गए कथनों को पढ़िए और सही विकल्प चुनिए:';
                })()}
                className="text-base sm:text-lg font-bold text-text font-hindi"
                pClassName="text-base sm:text-lg font-bold text-text leading-relaxed font-hindi"
              />
            )}
            <div className="flex flex-col gap-2.5 font-hindi">
              {question.statements?.map((stmt, i) => {
                if (!stmt) return null;
                const label = question.statementLabels?.[i] || `${i + 1}`;
                return (
                  <div key={i} className="flex items-center gap-3 bg-bg-s3/30 border border-border/50 rounded-xl px-4 py-3 shadow-sm hover:border-saffron-border/30 transition-all">
                    <span className="w-7 h-7 bg-bg-s3 border border-border/80 rounded-lg flex items-center justify-center text-[10px] font-black text-saffron select-none shrink-0">
                      {label}
                    </span>
                    <MarkdownRenderer 
                      content={stmt}
                      className="text-xs sm:text-sm font-semibold text-text font-hindi"
                      pClassName="text-xs sm:text-sm font-semibold text-text leading-relaxed font-hindi inline-block"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          question.question && (
            <MarkdownRenderer 
              content={question.question}
              className="text-base sm:text-lg font-bold text-text font-hindi"
              pClassName="text-base sm:text-lg font-bold text-text leading-relaxed font-hindi"
            />
          )
        )}
      </div>

      {/* Subtle bottom design stroke */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-saffron to-gold" />
    </div>
  );
};
