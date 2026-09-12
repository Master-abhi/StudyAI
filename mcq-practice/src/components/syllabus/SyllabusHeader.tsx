import React from 'react';
import type { Exam } from './syllabusData';

interface SyllabusHeaderProps {
  exams?: Exam[];
  activeExam: Exam;
  onSelectExam?: (examId: string) => void;
  onBack?: () => void;
  targetExamDate?: string;
  onTargetDateChange?: (date: string) => void;
}

export const SyllabusHeader: React.FC<SyllabusHeaderProps> = ({
  activeExam
}) => {
  return (
    <div className="flex flex-col gap-4 border-b border-border/80 pb-3">
      {/* Selected Exam Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bg-s2 border border-border px-5 py-4 rounded-lg relative overflow-hidden shadow">
        <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-dim/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-3">
          <div className="p-3 bg-saffron-dim border border-saffron-border/30 text-saffron rounded-md">
            <span className="text-xl leading-none">{activeExam.icon}</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-black text-text tracking-wide uppercase leading-tight">
              {activeExam.fullName}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-text-muted font-bold uppercase tracking-wider">
              <span className="bg-bg-s3 border border-border px-1.5 py-0.5 rounded text-saffron">
                Stage: {activeExam.stage}
              </span>
              <span>•</span>
              <span>Total Marks: {activeExam.totalMarks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
