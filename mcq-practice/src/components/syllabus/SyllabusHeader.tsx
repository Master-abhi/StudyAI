import { Calendar, ArrowLeft, ChevronDown } from 'lucide-react';
import type { Exam } from './syllabusData';

interface SyllabusHeaderProps {
  exams: Exam[];
  activeExam: Exam;
  onSelectExam: (examId: string) => void;
  onBack: () => void;
}

export const SyllabusHeader: React.FC<SyllabusHeaderProps> = ({
  exams,
  activeExam,
  onSelectExam,
  onBack
}) => {
  return (
    <div className="flex flex-col gap-4 border-b border-border/80 pb-5">
      {/* Upper row: Back Button & Exam Dropdown Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black uppercase text-text-muted hover:text-saffron transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4 text-saffron" />
          <span>Back to Panel</span>
        </button>

        {/* Dropdown switch selector */}
        <div className="relative flex items-center gap-2">
          <span className="text-xs text-text-muted font-semibold hidden md:inline">Target Exam:</span>
          <div className="relative group">
            <select
              value={activeExam.id}
              onChange={(e) => onSelectExam(e.target.value)}
              className="appearance-none bg-bg-s2 text-xs font-black uppercase text-text pl-4 pr-10 py-2.5 border border-saffron-border/30 rounded-md outline-none cursor-pointer focus:border-saffron focus:ring-1 focus:ring-saffron transition-all w-full max-w-[220px] sm:max-w-xs truncate"
            >
              {exams.map(exam => (
                <option key={exam.id} value={exam.id}>
                  {exam.icon} {exam.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-saffron">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

      </div>

      {/* Lower row: Selected Exam Details & Estimated countdown */}
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

        {/* Estimated Days Remaining Badge */}
        <div className="shrink-0 flex items-center gap-2 bg-saffron-dim/80 border border-saffron-border/40 px-3.5 py-2 rounded-md self-start sm:self-auto shadow-sm">
          <Calendar className="w-4 h-4 text-saffron animate-pulse" />
          <div className="flex flex-col leading-none">
            <span className="text-xs font-black text-text uppercase">
              {activeExam.daysRemaining} Days Left
            </span>
            <span className="text-[8px] text-text-muted font-bold mt-0.5 uppercase tracking-wider">
              Estimated Exam Date
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
