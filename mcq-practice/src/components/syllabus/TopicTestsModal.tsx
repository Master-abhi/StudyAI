import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle2, Play, Clock, 
  Sparkles, Loader2, BookOpen, Award
} from 'lucide-react';

export interface TopicTestItem {
  id: string;
  title: string;
  subject: string;
  mode: 'quiz' | 'mock' | 'pyq';
  totalQuestions: number;
  durationMinutes: number;
  totalMarks?: number;
  createdAt?: string;
}

interface TopicTestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicName: string;
  topicNameHi?: string;
  subjectName?: string;
  examId?: string;
  onStartTest: (testId: string, mode: 'quiz' | 'mock' | 'pyq', subject: string) => void;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export const TopicTestsModal: React.FC<TopicTestsModalProps> = ({
  isOpen,
  onClose,
  topicName,
  topicNameHi,
  subjectName,
  examId,
  onStartTest,
  onMarkComplete,
  isCompleted
}) => {
  const [tests, setTests] = useState<TopicTestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getApiUrl = (p: string) => {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' || 
                    hostname === '[::1]' ||
                    hostname.startsWith('192.168.');
    if (isLocal && window.location.port !== '3000') {
      return `http://localhost:3000${p}`;
    }
    if (hostname.endsWith('.web.app') || hostname.endsWith('.firebaseapp.com')) {
      return `https://study-ai-olive.vercel.app${p}`;
    }
    return p;
  };

  const fetchTopicTests = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (topicName) params.append('topicName', topicName);
      if (topicNameHi) params.append('topicNameHi', topicNameHi);
      if (subjectName) params.append('subjectName', subjectName);
      if (examId) params.append('examId', examId);

      const res = await fetch(getApiUrl(`/api/syllabus/topic-tests?${params.toString()}`));
      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.tests)) {
        setTests(data.tests);
      } else {
        throw new Error(data.error || 'Failed to search topic tests.');
      }
    } catch (err: any) {
      console.error('[Fetch Topic Tests Error]:', err);
      setError(err.message || 'Could not load tests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTopicTests();
    }
  }, [isOpen, topicName]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in select-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="bg-bg-s2 border border-border rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-sans"
        >
          {/* Header Bar */}
          <div className="px-4 py-3 sm:px-6 sm:py-4 bg-bg-s3 border-b border-border flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-saffron/15 border border-saffron-border/30 flex items-center justify-center text-saffron shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-xs sm:text-sm font-black text-text truncate leading-tight">
                  {topicNameHi || topicName}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-text-muted mt-0.5">
                  <span className="text-saffron font-bold">{subjectName || 'Practice MCQs'}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-[9px] bg-saffron/10 text-saffron border border-saffron/25 px-1.5 py-0.2 rounded font-black uppercase">
                    Topic Tests
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Mark Done & Close */}
            <div className="flex items-center gap-2 shrink-0">
              {onMarkComplete && (
                <button
                  type="button"
                  onClick={onMarkComplete}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black uppercase cursor-pointer transition-all ${
                    isCompleted 
                      ? 'bg-greenL/20 border-greenL/40 text-greenL' 
                      : 'bg-bg-s2 border-border text-text-muted hover:text-text hover:border-saffron'
                  }`}
                  title="Mark topic MCQs as completed"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 bg-bg-s2 hover:bg-red-500/20 border border-border hover:border-red-500/40 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-colors"
                title="Close Window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Test List Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-3">
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center gap-2.5 text-text-muted">
                <Loader2 className="w-7 h-7 animate-spin text-saffron" />
                <span className="text-xs font-bold uppercase tracking-wider text-saffron">
                  Searching Topic Practice Tests...
                </span>
                <span className="text-[10px] text-text-muted">Scanning quizzes and mock tests</span>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl text-xs text-center flex flex-col gap-2">
                <span>{error}</span>
                <button
                  onClick={fetchTopicTests}
                  className="px-3 py-1 bg-saffron text-bg-s1 rounded font-bold self-center cursor-pointer"
                >
                  Retry
                </button>
              </div>
            ) : tests.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-text-muted px-1">
                  <span>Available Tests for this Topic ({tests.length})</span>
                  <span className="text-[9px] text-greenL uppercase font-black">Live & Ready</span>
                </div>

                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="p-3.5 sm:p-4 rounded-xl border border-border bg-bg-s3/40 hover:bg-bg-s3 hover:border-saffron-border/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-text group-hover:text-saffron transition-colors leading-tight">
                          {test.title}
                        </span>
                        <span className={`text-[8.5px] font-black px-1.5 py-0.5 rounded border uppercase ${
                          test.mode === 'mock' 
                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' 
                            : test.mode === 'pyq'
                              ? 'bg-purpleL/15 text-purpleL border-purpleL/30'
                              : 'bg-saffron/10 text-saffron border-saffron/30'
                        }`}>
                          {test.mode === 'mock' ? 'Mock Test' : test.mode === 'pyq' ? 'PYQ Paper' : 'Quiz'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[10px] text-text-muted mt-1">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-saffron" />
                          <span>{test.totalQuestions} Questions</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{test.durationMinutes} Mins</span>
                        </span>
                        {test.totalMarks && (
                          <>
                            <span>•</span>
                            <span>{test.totalMarks} Marks</span>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onStartTest(test.id, test.mode, test.subject);
                        onClose();
                      }}
                      className="px-4 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-bg-s1" />
                      <span>Start Test</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Coming Soon Placeholder when no tests exist for topic */
              <div className="py-12 px-4 rounded-xl border border-dashed border-border bg-bg-s3/20 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex flex-col gap-1 max-w-sm">
                  <h4 className="text-sm font-black uppercase text-text tracking-wide">
                    Coming Soon! 🚀
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Is topic <span className="text-saffron font-bold">"{topicNameHi || topicName}"</span> ke liye dedicated MCQ practice tests jaldi hi add kiye ja rahe hain.
                  </p>
                </div>
                <span className="text-[10px] font-bold bg-bg-s3 border border-border px-3 py-1 rounded-full text-text-muted">
                  Stay Tuned • Quality Questions Under Preparation
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-bg-s3 border-t border-border flex items-center justify-between text-xs shrink-0">
            <span className="text-[10px] text-text-muted">Tip: Complete notes & lectures before testing</span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-bg-s2 hover:bg-bg-s1 border border-border text-[10px] font-black uppercase text-text rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
