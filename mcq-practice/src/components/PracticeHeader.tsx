import React from 'react';
import { ArrowLeft, Timer, LayoutGrid, Clock, Share2 } from 'lucide-react';

interface PracticeHeaderProps {
  subjectName: string;
  currentIndex: number;
  totalQuestions: number;
  elapsedTime: number;
  testDuration?: number; // dynamic test duration in seconds
  mode: 'quiz' | 'mock' | 'pyq';
  onBack: () => void;
  onTogglePalette: () => void;
}

export const PracticeHeader: React.FC<PracticeHeaderProps> = ({
  subjectName,
  currentIndex,
  totalQuestions,
  elapsedTime,
  testDuration = 30 * 60, // default to 30 mins
  mode,
  onBack,
  onTogglePalette,
}) => {
  const formatTime = (seconds: number) => {
    if (mode === 'mock' || mode === 'pyq') {
      const remaining = Math.max(0, testDuration - seconds);
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    } else {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
  };

  const isMock = mode === 'mock' || mode === 'pyq';
  const isTimeUrgent = isMock && (testDuration - elapsedTime) < 5 * 60;

  return (
    <header className="sticky top-0 z-40 w-full bg-bg-s2/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg bg-bg-s3 hover:bg-saffron-dim hover:text-saffron border border-border transition-colors cursor-pointer"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xs text-text-muted font-bold uppercase tracking-wider">
            {mode === 'mock' ? '🏆 Mock Test' : mode === 'pyq' ? '📚 PYQ Practice' : '⚡ Quick Quiz'}
          </h1>
          <p className="text-sm font-bold text-text max-w-[140px] xs:max-w-[200px] truncate">
            {subjectName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Timer */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
          isTimeUrgent 
            ? 'bg-red-500/10 border-red-500/30 text-red-400' 
            : 'bg-bg-s3 border-border text-saffron'
        }`}>
          {isMock ? <Timer className="w-3.5 h-3.5 animate-pulse" /> : <Clock className="w-3.5 h-3.5" />}
          <span>{formatTime(elapsedTime)}</span>
        </div>

        {/* Question Counter */}
        <div className="text-xs font-extrabold bg-bg-s3 px-2.5 py-1.5 border border-border rounded-lg text-text-muted">
          Q <span className="text-text">{currentIndex + 1}</span>/{totalQuestions}
        </div>

        {/* Toggle Palette Button */}
        <button
          onClick={onTogglePalette}
          className="p-1.5 rounded-lg bg-bg-s3 border border-border hover:border-saffron-border hover:bg-saffron-dim text-text hover:text-saffron transition-all cursor-pointer"
          title="Toggle Question Palette"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>

        {/* Share Test Button */}
        <button
          onClick={async () => {
            const shareText = `📝 CG Guru Practice Test:\nSubject: ${subjectName}\nMode: ${mode === 'mock' ? 'Mock Test' : mode === 'pyq' ? 'PYQ Paper' : 'Quick Quiz'} (${totalQuestions} Questions)\n\nPractice now on CG Guru!`;
            try {
              if (navigator.share) {
                await navigator.share({
                  title: `CG Guru - ${subjectName}`,
                  text: shareText,
                  url: window.location.origin
                });
              } else {
                await navigator.clipboard.writeText(shareText + '\n' + window.location.origin);
                alert('Test details copied to clipboard! 📋');
              }
            } catch (err) {
              console.warn('Share error:', err);
            }
          }}
          className="p-1.5 rounded-lg bg-bg-s3 border border-border hover:border-saffron-border hover:bg-saffron-dim text-text hover:text-saffron transition-all cursor-pointer"
          title="Share Test"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
