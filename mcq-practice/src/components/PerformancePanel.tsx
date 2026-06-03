import React from 'react';
import { Target, CheckCircle2, XCircle, AlertCircle, Flame } from 'lucide-react';

interface PerformancePanelProps {
  answers: (number | null)[];
  correctAnswersCount: number;
  wrongAnswersCount: number;
  skippedQuestionsCount: number;
  streak: number;
}

export const PerformancePanel: React.FC<PerformancePanelProps> = ({
  answers,
  correctAnswersCount,
  wrongAnswersCount,
  skippedQuestionsCount,
  streak,
}) => {
  const answeredCount = answers.filter(a => a !== null).length;
  
  // Calculate accuracy
  const accuracy = answeredCount > 0 
    ? Math.round((correctAnswersCount / answeredCount) * 100) 
    : 0;

  // For the SVG circle
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="w-full bg-bg-s2 border border-border/80 rounded-lg p-5 shadow-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Target className="w-4 h-4 text-saffron" />
        <h2 className="text-sm font-black uppercase tracking-wider text-text">Performance Analysis</h2>
      </div>

      {/* Grid with metrics */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 items-center">
        {/* Accuracy Gauge */}
        <div className="flex flex-col items-center justify-center p-3 bg-bg-s3/40 rounded-md border border-border/40 relative">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-bg-s3 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-saffron fill-none transition-all duration-500 ease-out"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-lg font-black text-text">{accuracy}%</span>
              <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">Accuracy</span>
            </div>
          </div>
        </div>

        {/* Breakdown Stats */}
        <div className="flex flex-col gap-2.5">
          {/* Streak */}
          <div className="flex items-center justify-between p-2 rounded bg-orange-500/5 border border-orange-500/10">
            <div className="flex items-center gap-1.5 text-orange-400 font-bold text-xs">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span>Current Streak</span>
            </div>
            <span className="text-sm font-black text-orange-400">{streak} 🔥</span>
          </div>

          {/* Detailed Counts */}
          <div className="flex flex-col gap-1.5 text-xs text-text-muted">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-greenL" />
                <span>Correct Answers</span>
              </div>
              <span className="font-bold text-text">{correctAnswersCount}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-redL" />
                <span>Wrong Answers</span>
              </div>
              <span className="font-bold text-text">{wrongAnswersCount}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-text-muted" />
                <span>Skipped / Unattempted</span>
              </div>
              <span className="font-bold text-text">{skippedQuestionsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational message */}
      <div className="text-[10px] text-center text-text-muted border-t border-border pt-3">
        {accuracy >= 80 
          ? "🌟 Outstanding! You have mastered this topic." 
          : accuracy >= 50 
            ? "👍 Good job! Review the explanation for wrong questions to improve."
            : answeredCount === 0 
              ? "🎯 Start answering questions to check your performance metrics."
              : "💪 Keep practicing! Read the study notes and explanations carefully."}
      </div>
    </div>
  );
};
