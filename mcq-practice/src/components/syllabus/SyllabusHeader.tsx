import { Calendar } from 'lucide-react';
import type { Exam } from './syllabusData';

interface SyllabusHeaderProps {
  exams?: Exam[];
  activeExam: Exam;
  onSelectExam?: (examId: string) => void;
  onBack?: () => void;
  targetExamDate: string;
  onTargetDateChange: (date: string) => void;
}

export const SyllabusHeader: React.FC<SyllabusHeaderProps> = ({
  activeExam,
  targetExamDate,
  onTargetDateChange
}) => {
  return (
    <div className="flex flex-col gap-4 border-b border-border/80 pb-5">


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

        {/* Estimated Days Remaining Badge & Date Picker */}
        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          <div className="shrink-0 flex items-center gap-2 bg-saffron-dim/80 border border-saffron-border/40 px-3.5 py-2 rounded-md shadow-sm">
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
          
          <input
            type="date"
            value={targetExamDate}
            onChange={(e) => onTargetDateChange(e.target.value)}
            className="px-2 py-1.5 bg-bg-s3/80 hover:bg-bg-s3 text-[10px] text-text font-bold border border-border/80 focus:border-saffron focus:ring-1 focus:ring-saffron/20 rounded-md outline-none transition-all cursor-pointer shadow-sm min-h-[36px]"
            title="Choose target exam date"
          />
        </div>

      </div>
    </div>
  );
};
