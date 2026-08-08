import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, AlertCircle, Play, Bookmark, Trash2, ChevronRight, ChevronLeft, Zap, BookOpen, Search, SlidersHorizontal, X, Keyboard, Download, CheckCircle2, HardDriveDownload, Loader2, Share2, FolderOpen, Layers } from 'lucide-react';
import type { Question } from '../types';
import { TypingTest } from './TypingTest';

interface ServerTest {
  id: string;
  examId: string;
  examIds?: string[];
  examName?: string;
  examNames?: string[];
  subject: string;
  mode: 'quiz' | 'mock' | 'pyq';
  language: string;
  totalQuestions: number;
  createdAt: string;
}

interface PracticeTabProps {
  activeExam: any;
  onStartPracticeSession: (questions: Question[], mode: 'quiz' | 'mock' | 'pyq', subject: string, durationMinutes?: number, testId?: string) => void;
  bookmarkedQuestions?: Question[];
  onToggleBookmark?: (question: Question) => void;
  testHistory?: any[];
  currentUser?: any;
  onSaveTypingResults?: (netWpm: number, grossWpm: number, accuracy: number, correctChars: number, incorrectChars: number, language: string, duration: number, topicId: string, topicTitle: string) => void;
  tabVisibility?: Record<string, boolean>;
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  activeExam,
  onStartPracticeSession,
  bookmarkedQuestions = [],
  onToggleBookmark,
  testHistory = [],
  currentUser,
  onSaveTypingResults,
  tabVisibility
}) => {
  const [activeMode, setActiveMode] = useState<'quiz' | 'mock' | 'pyq' | 'offline' | 'typing' | 'saved'>('quiz');
  const [tests, setTests] = useState<ServerTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSavedQuestion, setSelectedSavedQuestion] = useState<Question | null>(null);

  // If pyq is disabled in tab visibility settings, default activeMode to quiz
  useEffect(() => {
    if (activeMode === 'pyq' && tabVisibility?.practice_pyq === false) {
      setActiveMode('quiz');
    }
  }, [activeMode, tabVisibility]);

  const [testProgress, setTestProgress] = useState<{ [testId: string]: { answers: (number | null)[]; completed: boolean } }>({});

  // Internal App Offline Tests Storage
  const [offlineTests, setOfflineTests] = useState<{ [testId: string]: any }>({});
  const [downloadingTestId, setDownloadingTestId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleShareTest = async (testSubject: string, mode: string, totalQuestions: number, language: string, e?: React.MouseEvent, testId?: string) => {
    if (e) e.stopPropagation();
    const shareUrl = testId 
      ? `${window.location.origin}${window.location.pathname}?tab=practice&testId=${encodeURIComponent(testId)}`
      : window.location.href;
    const shareText = `📝 CG Guru Practice Test:\nSubject: ${testSubject}\nMode: ${mode.toUpperCase()} (${totalQuestions} Questions, ${language})\n\nPractice now on CG Guru!`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `CG Guru - ${testSubject}`,
          text: shareText,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareText + '\n' + shareUrl);
        showToast('Test link copied to clipboard! 📋');
      }
    } catch (err) {
      console.warn('Share cancelled or failed:', err);
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('examprep_test_progress');
      if (stored) {
        setTestProgress(JSON.parse(stored));
      }
      const storedOffline = localStorage.getItem('examprep_offline_tests_v1');
      if (storedOffline) {
        setOfflineTests(JSON.parse(storedOffline));
      }
    } catch (e) {
      console.error('[PracticeTab] Error loading initial storage:', e);
    }
  }, []);

  const handleSaveTestOffline = async (testSummary: ServerTest, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadingTestId(testSummary.id);
    try {
      const res = await fetch(getApiUrl(`/api/tests/${testSummary.id}`));
      if (!res.ok) throw new Error('Could not download test content from server.');
      const fullData = await res.json();
      if (!fullData || !Array.isArray(fullData.questions) || fullData.questions.length === 0) {
        throw new Error('Test has no questions available to download.');
      }

      const offlineRecord = {
        ...testSummary,
        ...fullData,
        downloadedAt: new Date().toISOString()
      };

      const updated = { ...offlineTests, [testSummary.id]: offlineRecord };
      setOfflineTests(updated);
      localStorage.setItem('examprep_offline_tests_v1', JSON.stringify(updated));
      showToast(`"${testSummary.subject}" saved offline inside app! 💾`);
    } catch (err: any) {
      console.error('[Save Test Offline Error]:', err);
      alert(err.message || 'Failed to download test for offline practice.');
    } finally {
      setDownloadingTestId(null);
    }
  };

  const handleRemoveOfflineTest = (testId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = { ...offlineTests };
    const deletedSubject = updated[testId]?.subject || 'Test';
    delete updated[testId];
    setOfflineTests(updated);
    localStorage.setItem('examprep_offline_tests_v1', JSON.stringify(updated));
    showToast(`"${deletedSubject}" removed from offline storage. 🗑️`);
  };

  const isGenericTestId = (id?: string) => {
    if (!id) return true;
    const genericIds = ['cgpsc-daily-quiz', 'cgpsc-mock-test', 'cgpsc-pyq-paper', 'saved-questions'];
    return genericIds.includes(id);
  };

  // Auto-migrate legacy logs to assign unique test IDs and bind them to matching server tests
  useEffect(() => {
    if (!tests || tests.length === 0 || !testHistory || testHistory.length === 0) return;

    try {
      const storedProgressRaw = localStorage.getItem('examprep_test_progress');
      const progressStore: Record<string, { answers: any[]; completed: boolean }> = storedProgressRaw ? JSON.parse(storedProgressRaw) : {};

      let historyChanged = false;
      let progressChanged = false;
      const boundTestIds = new Set<string>();

      // First pass: collect explicitly bound testIds
      testHistory.forEach((log: any) => {
        if (log && log.testId && !isGenericTestId(log.testId)) {
          boundTestIds.add(log.testId);
          if (!progressStore[log.testId]?.completed) {
            progressStore[log.testId] = { answers: log.userAnswers || [], completed: true };
            progressChanged = true;
          }
        }
      });

      // Second pass: migrate legacy/generic logs and pair with unbound matching tests
      const updatedHistory = testHistory.map((log: any, idx: number) => {
        if (!log) return log;

        if (log.testId && !isGenericTestId(log.testId)) {
          return log;
        }

        const logSub = (log.subject || '').trim().toLowerCase();
        const logMode = log.mode || 'quiz';
        const logTotal = log.total !== undefined ? log.total : (log.questions ? log.questions.length : 0);

        // Find the first unbound server test matching subject, mode, and question count
        const match = tests.find(t => {
          if (!t || !t.id || boundTestIds.has(t.id)) return false;
          const tSub = (t.subject || '').trim().toLowerCase();
          if (tSub !== logSub) return false;
          if (t.mode && t.mode !== logMode) return false;
          if (logTotal > 0 && t.totalQuestions && t.totalQuestions !== logTotal) return false;
          return true;
        });

        if (match) {
          boundTestIds.add(match.id);
          historyChanged = true;
          if (!progressStore[match.id]?.completed) {
            progressStore[match.id] = { answers: log.userAnswers || [], completed: true };
            progressChanged = true;
          }
          return {
            ...log,
            testId: match.id
          };
        } else {
          // Assign a unique isolated testId to prevent cross-contamination
          const uniqueId = `legacy_${logSub.replace(/[^a-z0-9]/g, '_')}_${log.timestamp || idx}_${idx}`;
          historyChanged = true;
          return {
            ...log,
            testId: uniqueId
          };
        }
      });

      if (progressChanged) {
        setTestProgress(progressStore);
        localStorage.setItem('examprep_test_progress', JSON.stringify(progressStore));
      }

      if (historyChanged) {
        localStorage.setItem('examprep_testResults', JSON.stringify(updatedHistory));
      }
    } catch (e) {
      console.warn('[PracticeTab] Migration effect error:', e);
    }
  }, [tests, testHistory]);

  const getTestProgressInfo = (test: ServerTest) => {
    if (!test || !test.id) return null;

    // 1. Check in-progress map in localStorage by test ID
    if (testProgress && testProgress[test.id]) {
      const saved = testProgress[test.id];
      const answers = Array.isArray(saved.answers) ? saved.answers : [];
      const attempted = answers.filter(a => a !== null).length;
      return {
        attemptedCount: attempted,
        totalQuestions: test.totalQuestions || answers.length || 5,
        completed: Boolean(saved.completed)
      };
    }

    // 2. Check in testHistory prop strictly by test ID
    if (testHistory && Array.isArray(testHistory)) {
      const match = testHistory.find((log: any) => log && log.testId === test.id);
      if (match) {
        const correct = match.correct !== undefined ? match.correct : 0;
        const wrong = match.wrong !== undefined ? match.wrong : 0;
        const total = match.total !== undefined ? match.total : (test.totalQuestions || 5);
        const attempted = correct + wrong;
        return {
          attemptedCount: attempted,
          totalQuestions: total,
          completed: true
        };
      }
    }

    return null;
  };

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedLength, setSelectedLength] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Reset filters when mode or active exam changes
  useEffect(() => {
    setSearchQuery('');
    setSelectedLanguage('All');
    setSelectedLength('All');
    setSortBy('newest');
    setSelectedSubject(null);
  }, [activeMode, activeExam]);

  const getSubjectProgress = (subjectTests: ServerTest[]) => {
    let completed = 0;
    let inProgress = 0;
    subjectTests.forEach(test => {
      const prog = getTestProgressInfo(test);
      if (prog) {
        if (prog.completed) completed++;
        else if (prog.attemptedCount > 0) inProgress++;
      }
    });
    return { completed, inProgress, total: subjectTests.length };
  };

  const getApiUrl = (path: string) => {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' || 
                    hostname === '[::1]' ||
                    hostname.startsWith('192.168.');
    if (isLocal && window.location.port !== '3000') {
      return `http://localhost:3000${path}`;
    }
    if (hostname.endsWith('.web.app') || hostname.endsWith('.firebaseapp.com')) {
      return `https://study-ai-olive.vercel.app${path}`;
    }
    return path;
  };

  const fetchTests = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/tests'));
      if (res.ok) {
        const data = await res.json();
        console.log('[PracticeTab] Loaded educator tests from server:', data);
        if (Array.isArray(data)) {
          setTests(data);
        }
      }
    } catch (err) {
      console.warn('Failed to load educator tests from server:', err);
      // Fallback: populate tests from offline storage if server is unreachable
      try {
        const storedOffline = localStorage.getItem('examprep_offline_tests_v1');
        if (storedOffline) {
          const offlineMap = JSON.parse(storedOffline);
          const offlineList: ServerTest[] = Object.values(offlineMap).map((t: any) => ({
            id: t.id,
            examId: t.examId || '',
            examIds: t.examIds || [],
            examName: t.examName || '',
            subject: t.subject || 'Offline Test',
            mode: t.mode || 'quiz',
            language: t.language || 'hindi',
            totalQuestions: t.totalQuestions || t.questions?.length || 0,
            createdAt: t.createdAt || new Date().toISOString()
          }));
          if (offlineList.length > 0) {
            setTests(offlineList);
          }
        }
      } catch (_) {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleStartEducatorTest = async (testId: string, testMode: 'quiz' | 'mock' | 'pyq', subject: string) => {
    // Check internal app offline storage first
    if (offlineTests[testId] && Array.isArray(offlineTests[testId].questions) && offlineTests[testId].questions.length > 0) {
      const offlineItem = offlineTests[testId];
      onStartPracticeSession(
        offlineItem.questions,
        testMode,
        subject,
        offlineItem.pattern?.durationMinutes || offlineItem.durationMinutes,
        testId
      );
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(getApiUrl(`/api/tests/${testId}`));
      if (!res.ok) throw new Error('Failed to load test details');
      const data = await res.json();
      if (data && data.questions && data.questions.length > 0) {
        onStartPracticeSession(data.questions, testMode, subject, data.pattern?.durationMinutes || data.durationMinutes, testId);
      }
    } catch (err) {
      console.error(err);
      alert('Could not start this test. Please check your internet connection or download tests for offline practice.');
    } finally {
      setLoading(false);
    }
  };



  // 1. Filter by mode and exam first (Base list matching the active mode and exam context)
  console.log('[PracticeTab] activeExamId:', activeExam?.id, 'activeMode:', activeMode);
  const baseFilteredTests = tests.filter(t => 
    t.mode === activeMode && 
    (t.examId === activeExam?.id || (Array.isArray(t.examIds) && t.examIds.includes(activeExam?.id)))
  );

  // 2. Extract unique languages dynamically from base tests
  const availableLanguages = Array.from(new Set(baseFilteredTests.map(t => t.language).filter(Boolean)));

  // 3. Extract unique subjects and group tests subject-wise
  const subjectsMap = React.useMemo(() => {
    const map: Record<string, ServerTest[]> = {};
    baseFilteredTests.forEach(t => {
      let rawSub = (t.subject || 'General Knowledge').trim();
      if (rawSub.toLowerCase() === 'all' || rawSub.toLowerCase() === 'all subjects') {
        rawSub = 'Full Syllabus / All Subjects';
      }
      if (!map[rawSub]) {
        map[rawSub] = [];
      }
      map[rawSub].push(t);
    });
    return map;
  }, [baseFilteredTests]);

  const availableSubjects = Object.keys(subjectsMap).sort();

  // 4. Apply active filters
  let filteredTests = baseFilteredTests.filter(t => {
    const matchesSearch = searchQuery 
      ? t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (t.examName && t.examName.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    const matchesLanguage = selectedLanguage && selectedLanguage !== 'All'
      ? t.language === selectedLanguage
      : true;

    let matchesLength = true;
    if (selectedLength === 'short') {
      matchesLength = t.totalQuestions < 20;
    } else if (selectedLength === 'medium') {
      matchesLength = t.totalQuestions >= 20 && t.totalQuestions <= 50;
    } else if (selectedLength === 'long') {
      matchesLength = t.totalQuestions > 50;
    }

    const testSubj = (t.subject || 'General Knowledge').trim();
    const normalizedTestSubj = (testSubj.toLowerCase() === 'all' || testSubj.toLowerCase() === 'all subjects')
      ? 'Full Syllabus / All Subjects'
      : testSubj;

    const matchesSubject = selectedSubject
      ? normalizedTestSubj.toLowerCase() === selectedSubject.toLowerCase()
      : true;

    return matchesSearch && matchesLanguage && matchesLength && matchesSubject;
  });

  // 4. Sort filtered results
  filteredTests = [...filteredTests].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === 'questions-desc') {
      return b.totalQuestions - a.totalQuestions;
    } else if (sortBy === 'questions-asc') {
      return a.totalQuestions - b.totalQuestions;
    }
    return 0;
  });

  console.log('[PracticeTab] Filtered tests count:', filteredTests.length);

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg md:max-w-5xl mx-auto pb-12 font-sans">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Trophy className="w-5.5 h-5.5 text-saffron" />
          <div className="flex flex-col">
            <h3 className="text-sm font-black uppercase text-text leading-tight">Practice Tests</h3>
            <span className="text-[9px] text-text-muted font-bold tracking-wider">Mock Exams & Quizzes</span>
          </div>
        </div>
      </div>

      {/* 2. Unified Mode selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 shrink-0">
        {[
          { id: 'quiz', label: 'Quizzes', icon: <Zap className="w-5 h-5 text-saffron" />, desc: 'Educator tests' },
          { id: 'mock', label: 'Mock Exams', icon: <Trophy className="w-5 h-5 text-saffron" />, desc: 'Full length tests' },
          { id: 'pyq', label: 'PYQ Papers', icon: <BookOpen className="w-5 h-5 text-saffron" />, desc: 'Previous papers', configKey: 'practice_pyq' },
          { id: 'offline', label: 'Offline Tests', icon: <HardDriveDownload className="w-5 h-5 text-saffron" />, desc: `Downloaded (${Object.keys(offlineTests).length})` },
          { id: 'typing', label: 'Typing Test', icon: <Keyboard className="w-5 h-5 text-saffron" />, desc: 'Speed & Accuracy' },
          { id: 'saved', label: 'Saved MCQs', icon: <Bookmark className="w-5 h-5 text-saffron" />, desc: `Saved (${bookmarkedQuestions.length})` }
        ].filter(m => !m.configKey || (tabVisibility?.[m.configKey] !== false && tabVisibility?.[m.id] !== false)).map(m => (
          <button
            key={m.id}
            onClick={() => setActiveMode(m.id as any)}
            className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
              activeMode === m.id
                ? 'bg-saffron-dim/20 border-saffron text-saffron font-black'
                : 'bg-bg-s2 border-border hover:bg-bg-s2/85 text-text-muted'
            }`}
          >
            <span className="mb-1 select-none flex items-center justify-center h-6 w-6">
              {m.icon}
            </span>
            <span className="text-xs font-bold leading-tight">{m.label}</span>
            <span className="text-[8px] opacity-75 mt-0.5">{m.desc}</span>
          </button>
        ))}
      </div>

      {/* 3. Mode panels details */}
      <div className="min-h-[220px]">
        {loading ? (
          <div className="h-28 bg-bg-s2 border border-border rounded-xl flex items-center justify-center animate-pulse text-xs text-text-muted">
            Loading tests...
          </div>
        ) : activeMode === 'typing' ? (
          <TypingTest currentUser={currentUser} onSaveResults={onSaveTypingResults} />
        ) : activeMode === 'pyq' ? (
          /* Uploaded PYQ list */
          <div className="flex flex-col gap-6">

            {/* List of uploaded PYQ Papers */}
            <div className="flex flex-col gap-3">
              <div className="border-b border-border pb-1.5 flex items-center justify-between">
                <h4 className="text-xs font-black text-text uppercase">Available PYQ Papers ({filteredTests.length})</h4>
              </div>

              {filteredTests.length === 0 ? (
                <div className="p-6 text-center bg-bg-s2 border border-border rounded-xl text-xs text-text-muted">
                  No uploaded PYQ papers available yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTests.map(test => {
                    const progress = getTestProgressInfo(test);
                    return (
                      <motion.div
                        key={test.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-bg-s2 border border-border rounded-xl flex items-center justify-between shadow-sm hover:border-saffron-border/30 transition-all duration-200 gap-3"
                      >
                        <div className="flex flex-col gap-0.5 truncate pr-2 flex-1">
                          <h4 className="text-xs font-black text-text truncate leading-tight">{test.subject}</h4>
                          <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">
                            {test.totalQuestions} questions • {test.language} • PYQ Paper
                          </span>

                          {progress && (
                            <div className="flex flex-col gap-1 mt-2.5 w-full max-w-[200px]">
                              <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-wide">
                                <span className={progress.completed ? "text-greenL font-black" : "text-saffron font-black"}>
                                  {progress.completed ? "Completed" : "In Progress"}
                                </span>
                                <span className="text-text-muted">
                                  {progress.attemptedCount}/{progress.totalQuestions} Qs ({Math.round((progress.attemptedCount / progress.totalQuestions) * 100)}%)
                                </span>
                              </div>
                              <div className="w-full h-1 bg-bg-s3 border border-border/40 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${progress.completed ? 'bg-greenL' : 'bg-saffron'}`}
                                  style={{ width: `${Math.min(100, Math.round((progress.attemptedCount / progress.totalQuestions) * 100))}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {offlineTests[test.id] ? (
                            <div className="flex items-center gap-1">
                              <span className="text-[8.5px] font-bold text-greenL bg-greenL/10 border border-greenL/25 px-2 py-1 rounded-lg flex items-center gap-1 select-none">
                                <CheckCircle2 className="w-3 h-3 text-greenL" />
                                <span className="hidden sm:inline">Offline Ready</span>
                              </span>
                              <button
                                onClick={(e) => handleRemoveOfflineTest(test.id, e)}
                                className="p-2 bg-bg-s3 hover:bg-red-500/10 text-text-muted hover:text-redL border border-border rounded-lg text-[10px] font-black transition-all cursor-pointer"
                                title="Remove from offline storage"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => handleSaveTestOffline(test, e)}
                              disabled={downloadingTestId === test.id}
                              className="px-2.5 py-2 bg-bg-s3 hover:bg-bg-s3/80 text-text-muted hover:text-saffron border border-border rounded-lg text-[10px] font-black uppercase flex items-center gap-1 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                              title="Save test for offline practice inside app"
                            >
                              {downloadingTestId === test.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-saffron" />
                              ) : (
                                <Download className="w-3.5 h-3.5" />
                              )}
                              <span className="hidden sm:inline">Offline</span>
                            </button>
                          )}

                          <button
                            onClick={(e) => handleShareTest(test.subject, 'PYQ Paper', test.totalQuestions, test.language, e, test.id)}
                            className="p-2 bg-bg-s3 hover:bg-saffron-dim/20 text-text-muted hover:text-saffron border border-border rounded-lg text-[10px] font-black transition-all cursor-pointer"
                            title="Share Test"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleStartEducatorTest(test.id, 'pyq', test.subject)}
                            className="px-3 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow active:scale-95 shrink-0"
                          >
                            <Play className="w-3.5 h-3.5 fill-bg-s1" />
                            <span>Start</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : activeMode === 'offline' ? (
          /* Downloaded Offline Tests view */
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs font-black text-text uppercase flex items-center gap-1.5">
                  <HardDriveDownload className="w-4 h-4 text-saffron" />
                  <span>Downloaded Offline Tests ({Object.keys(offlineTests).length})</span>
                </h4>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Tests stored inside this app for offline practice without internet connection.
                </p>
              </div>
            </div>

            {Object.keys(offlineTests).length === 0 ? (
              <div className="p-8 text-center bg-bg-s2 border border-border rounded-xl text-xs text-text-muted flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6 text-saffron-border/60 mb-0.5" />
                <span>No offline tests saved inside app yet.</span>
                <span className="text-[10px]">
                  Click the "Offline" download button on any Quiz, Mock Exam, or PYQ paper to save it for offline practice!
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(offlineTests).map((offTest: any) => {
                  const progress = getTestProgressInfo(offTest);
                  return (
                    <motion.div
                      key={offTest.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-bg-s2 border border-border rounded-xl flex items-center justify-between shadow-sm hover:border-saffron-border/30 transition-all duration-200 gap-3"
                    >
                      <div className="flex flex-col gap-0.5 truncate pr-2 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs font-black text-text truncate leading-tight">{offTest.subject}</h4>
                          <span className="text-[8px] font-bold text-greenL bg-greenL/10 border border-greenL/25 px-1.5 py-0.5 rounded uppercase">
                            Offline Ready
                          </span>
                        </div>
                        <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">
                          {offTest.questions?.length || offTest.totalQuestions} questions • {offTest.language || 'Hindi'} • {offTest.mode?.toUpperCase() || 'TEST'}
                        </span>

                        {progress && (
                          <div className="flex flex-col gap-1 mt-2.5 w-full max-w-[200px]">
                            <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-wide">
                              <span className={progress.completed ? "text-greenL font-black" : "text-saffron font-black"}>
                                {progress.completed ? "Completed" : "In Progress"}
                              </span>
                              <span className="text-text-muted">
                                {progress.attemptedCount}/{progress.totalQuestions} Qs ({Math.round((progress.attemptedCount / progress.totalQuestions) * 100)}%)
                              </span>
                            </div>
                            <div className="w-full h-1 bg-bg-s3 border border-border/40 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${progress.completed ? 'bg-greenL' : 'bg-saffron'}`}
                                style={{ width: `${Math.min(100, Math.round((progress.attemptedCount / progress.totalQuestions) * 100))}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => handleShareTest(offTest.subject, offTest.mode || 'test', offTest.questions?.length || offTest.totalQuestions, offTest.language || 'Hindi', e, offTest.id || offTest.testId)}
                          className="p-2 bg-bg-s3 hover:bg-saffron-dim/20 text-text-muted hover:text-saffron border border-border rounded-lg text-[10px] font-black transition-all cursor-pointer"
                          title="Share Test"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleStartEducatorTest(offTest.id, offTest.mode || 'quiz', offTest.subject)}
                          className="px-3 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow active:scale-95 shrink-0"
                        >
                          <Play className="w-3.5 h-3.5 fill-bg-s1" />
                          <span>Start</span>
                        </button>
                        <button
                          onClick={(e) => handleRemoveOfflineTest(offTest.id, e)}
                          className="p-2 bg-bg-s3 hover:bg-red-500/10 text-text-muted hover:text-redL border border-border rounded-lg text-[10px] font-black transition-all cursor-pointer"
                          title="Remove from offline storage"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : activeMode === 'saved' ? (
          /* Saved questions view */
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs font-black text-text uppercase">Saved Questions</h4>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Practice questions you saved during mock tests and daily quizzes.
                </p>
              </div>
              {bookmarkedQuestions.length > 0 && (
                <button
                  onClick={() => onStartPracticeSession(bookmarkedQuestions, 'quiz', 'Saved Questions Practice', 15, 'saved-questions')}
                  className="px-4 py-2.5 bg-saffron hover:bg-orange-500 text-xs font-black text-bg-s1 uppercase rounded-lg flex items-center gap-1.5 shrink-0 transition-all duration-200 cursor-pointer shadow active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-bg-s1" />
                  <span>Practice All</span>
                </button>
              )}
            </div>

            {bookmarkedQuestions.length === 0 ? (
              <div className="p-8 text-center bg-bg-s2 border border-border rounded-xl text-xs text-text-muted flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6 text-saffron-border/60 mb-0.5" />
                <span>No bookmarked questions yet.</span>
                <span className="text-[10px]">Bookmark questions during active practice sessions to see them listed here.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarkedQuestions.map((q, idx) => (
                  <div 
                    key={idx}
                    className="p-4 bg-bg-s2 border border-border hover:border-saffron-border/30 rounded-xl flex flex-col justify-between gap-3 relative transition-all group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-xs font-bold text-text leading-relaxed line-clamp-2 pr-6">
                        {q.question}
                      </span>
                      <button
                        onClick={() => onToggleBookmark && onToggleBookmark(q)}
                        className="absolute top-3 right-3 text-text-muted hover:text-redL p-1 cursor-pointer transition-colors"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-[10px] text-text-muted font-bold uppercase border-t border-border/40 pt-2.5 mt-1">
                      <span className="truncate pr-3 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-saffron" />
                        <span>{q.subject || 'General GK'}</span>
                      </span>
                      <button
                        onClick={() => setSelectedSavedQuestion(q)}
                        className="text-saffron-border hover:text-saffron flex items-center gap-0.5 cursor-pointer font-black text-[10px] shrink-0"
                      >
                        <span>View details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* Educator tests container (Quiz/Mock) */
          <div className="flex flex-col gap-4">
            {/* Filter controls panel */}
            <div className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col gap-3">
              {/* Search row */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder={`Search ${activeMode === 'quiz' ? 'quizzes' : 'mock exams'} by subject...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg pl-9 pr-8 py-2 text-xs font-semibold text-text placeholder-text-muted outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-text-muted hover:text-text cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 py-2 border rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    showFilters || selectedLanguage !== 'All' || selectedLength !== 'All' || sortBy !== 'newest'
                      ? 'bg-saffron-dim/20 border-saffron text-saffron'
                      : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>

              {/* Collapsible filters row */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col sm:flex-row gap-3 pt-2 border-t border-border/40"
                  >
                    {/* Subject Filter */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase text-text-muted">Subject (विषय)</label>
                      <select
                        value={selectedSubject || 'All'}
                        onChange={(e) => setSelectedSubject(e.target.value === 'All' ? null : e.target.value)}
                        className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-2.5 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
                      >
                        <option value="All">All Subjects ({baseFilteredTests.length})</option>
                        {availableSubjects.map(sub => (
                          <option key={sub} value={sub}>
                            {sub} ({(subjectsMap[sub] || []).length})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Language Filter */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase text-text-muted">Language</label>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-2.5 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
                      >
                        <option value="All">All Languages</option>
                        {availableLanguages.map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>

                    {/* Test Length Filter */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase text-text-muted">Questions Count</label>
                      <select
                        value={selectedLength}
                        onChange={(e) => setSelectedLength(e.target.value)}
                        className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-2.5 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
                      >
                        <option value="All">Any Length</option>
                        <option value="short">Short (&lt; 20 Qs)</option>
                        <option value="medium">Medium (20-50 Qs)</option>
                        <option value="long">Long (&gt; 50 Qs)</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase text-text-muted">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-2.5 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="questions-desc">Most Questions</option>
                        <option value="questions-asc">Fewest Questions</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subject Filter Horizontal Pills Bar */}
              {availableSubjects.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-border/40">
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedSubject === null
                        ? 'bg-saffron text-bg-s1 shadow'
                        : 'bg-bg-s3 border border-border text-text-muted hover:text-text hover:bg-bg-s3/80'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>All Subjects ({baseFilteredTests.length})</span>
                  </button>
                  {availableSubjects.map(sub => {
                    const count = (subjectsMap[sub] || []).length;
                    const isSelected = selectedSubject?.toLowerCase() === sub.toLowerCase();
                    return (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubject(isSelected ? null : sub)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-saffron text-bg-s1 shadow'
                            : 'bg-bg-s3 border border-border text-text-muted hover:text-text hover:bg-bg-s3/80'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{sub}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-bg-s1/20 text-bg-s1' : 'bg-bg-s2 text-text-muted'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Front View: ONLY Subject Categories Cards Grid (when no subject selected and no search query) */}
            {selectedSubject === null && !searchQuery ? (
              <div className="flex flex-col gap-3 mb-1">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-saffron" />
                    <h4 className="text-xs font-black text-text uppercase tracking-wider">
                      Choose Subject (विषय चुनें)
                    </h4>
                  </div>
                  <span className="text-[10px] text-text-muted font-bold">
                    {availableSubjects.length} Subjects • {baseFilteredTests.length} Tests
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSubjects.map(sub => {
                    const subTests = subjectsMap[sub] || [];
                    const stats = getSubjectProgress(subTests);
                    return (
                      <motion.div
                        key={sub}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSubject(sub)}
                        className="p-4 bg-bg-s2 hover:bg-bg-s2/90 border border-border hover:border-saffron-border/60 rounded-xl flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-saffron-dim/10 rounded-full blur-xl pointer-events-none group-hover:bg-saffron-dim/20 transition-all" />
                        
                        <div className="flex items-start justify-between gap-2">
                          <div className="w-9 h-9 bg-saffron-dim/20 border border-saffron-border/30 rounded-lg flex items-center justify-center text-saffron shrink-0 group-hover:bg-saffron group-hover:text-bg-s1 transition-colors">
                            <BookOpen className="w-4.5 h-4.5" />
                          </div>
                          <span className="text-[10px] font-black text-saffron bg-saffron-dim/20 border border-saffron-border/30 px-2 py-0.5 rounded-full shrink-0">
                            {stats.total} {stats.total === 1 ? 'Test' : 'Tests'}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <h5 className="text-xs font-black text-text group-hover:text-saffron transition-colors leading-tight line-clamp-2">
                            {sub}
                          </h5>
                          <div className="flex items-center gap-2 text-[9px] font-bold text-text-muted">
                            {stats.completed > 0 && (
                              <span className="text-greenL font-black">{stats.completed} Completed</span>
                            )}
                            {stats.inProgress > 0 && (
                              <span className="text-saffron font-black">{stats.inProgress} In Progress</span>
                            )}
                            {stats.completed === 0 && stats.inProgress === 0 && (
                              <span>Not Started</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[9.5px] font-black text-saffron-border group-hover:text-saffron border-t border-border/40 pt-2">
                          <span>View {stats.total} {stats.total === 1 ? 'Test' : 'Tests'}</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Inside Subject View / Search View: Render tests belonging to subject */
              <div className="flex flex-col gap-4">
                {/* Active Subject Navigation Header */}
                {selectedSubject && (
                  <div className="p-3 bg-gradient-to-r from-bg-s2 via-bg-s3/50 to-bg-s2 border border-saffron-border/30 rounded-2xl flex items-center justify-between shadow-sm transition-all">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Back Button */}
                      <button
                        onClick={() => setSelectedSubject(null)}
                        className="px-3 py-1.5 bg-bg-s1 hover:bg-saffron hover:text-bg-s1 border border-border text-text-muted hover:border-saffron rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 shadow-xs active:scale-[0.97]"
                        title="Back to All Subjects"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>All Subjects</span>
                      </button>

                      {/* Breadcrumb Divider & Subject Title */}
                      <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                        <span className="text-text-muted/40 text-xs font-bold shrink-0">/</span>
                        <div className="flex items-center gap-1.5 truncate">
                          <BookOpen className="w-3.5 h-3.5 text-saffron shrink-0" />
                          <span className="text-xs font-black text-text truncate tracking-tight">
                            {selectedSubject}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side badge with test count */}
                    <span className="text-[10px] font-black uppercase text-saffron bg-saffron/10 border border-saffron-border/30 px-2.5 py-1 rounded-full shrink-0">
                      {filteredTests.length} {filteredTests.length === 1 ? 'Test' : 'Tests'}
                    </span>
                  </div>
                )}

            {/* List or Empty Indicator */}
            {filteredTests.length === 0 ? (
              <div className="p-8 text-center bg-bg-s2 border border-border rounded-xl text-xs text-text-muted flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6 text-saffron-border/60 mb-0.5" />
                <span>No educator tests match your filter criteria or selected subject.</span>
                <span className="text-[10px]">
                  {baseFilteredTests.length === 0 
                    ? "Generate customized mock practice in the Syllabus tab or practice preloaded PYQs." 
                    : "Try adjusting your subject selection or search query."}
                </span>
                {(searchQuery || selectedLanguage !== 'All' || selectedLength !== 'All' || sortBy !== 'newest' || selectedSubject) && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedLanguage('All');
                      setSelectedLength('All');
                      setSortBy('newest');
                      setSelectedSubject(null);
                    }}
                    className="mt-2 px-3 py-1.5 bg-saffron-dim border border-saffron-border text-saffron hover:bg-saffron/20 rounded-lg text-[10px] font-black cursor-pointer transition-all active:scale-95"
                  >
                    Clear All Filters & Reset
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTests.map(test => {
                  const progress = getTestProgressInfo(test);
                  return (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-bg-s2 border border-border rounded-xl flex items-center justify-between shadow-sm hover:border-saffron-border/30 transition-all duration-200 gap-3"
                    >
                      <div className="flex flex-col gap-0.5 truncate pr-2 flex-1">
                        <h4 className="text-xs font-black text-text truncate leading-tight">{test.subject}</h4>
                        <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">
                          {test.totalQuestions} questions • {test.language} • {activeMode === 'quiz' ? 'Quiz' : 'Mock Exam'}
                        </span>
                        
                        {progress && (
                          <div className="flex flex-col gap-1 mt-2.5 w-full max-w-[200px]">
                            <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-wide">
                              <span className={progress.completed ? "text-greenL font-black" : "text-saffron font-black"}>
                                {progress.completed ? "Completed" : "In Progress"}
                              </span>
                              <span className="text-text-muted">
                                {progress.attemptedCount}/{progress.totalQuestions} Qs ({Math.round((progress.attemptedCount / progress.totalQuestions) * 100)}%)
                              </span>
                            </div>
                            <div className="w-full h-1 bg-bg-s3 border border-border/40 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${progress.completed ? 'bg-greenL' : 'bg-saffron'}`}
                                style={{ width: `${Math.min(100, Math.round((progress.attemptedCount / progress.totalQuestions) * 100))}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {offlineTests[test.id] ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[8.5px] font-bold text-greenL bg-greenL/10 border border-greenL/25 px-2 py-1 rounded-lg flex items-center gap-1 select-none">
                              <CheckCircle2 className="w-3 h-3 text-greenL" />
                              <span className="hidden sm:inline">Offline Ready</span>
                            </span>
                            <button
                              onClick={(e) => handleRemoveOfflineTest(test.id, e)}
                              className="p-2 bg-bg-s3 hover:bg-red-500/10 text-text-muted hover:text-redL border border-border rounded-lg text-[10px] font-black transition-all cursor-pointer"
                              title="Remove from offline storage"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => handleSaveTestOffline(test, e)}
                            disabled={downloadingTestId === test.id}
                            className="px-2.5 py-2 bg-bg-s3 hover:bg-bg-s3/80 text-text-muted hover:text-saffron border border-border rounded-lg text-[10px] font-black uppercase flex items-center gap-1 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                            title="Save test for offline practice inside app"
                          >
                            {downloadingTestId === test.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-saffron" />
                            ) : (
                              <Download className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden sm:inline">Offline</span>
                          </button>
                        )}

                        <button
                          onClick={(e) => handleShareTest(test.subject, activeMode === 'quiz' ? 'Quiz' : 'Mock Exam', test.totalQuestions, test.language, e, test.id)}
                          className="p-2 bg-bg-s3 hover:bg-saffron-dim/20 text-text-muted hover:text-saffron border border-border rounded-lg text-[10px] font-black transition-all cursor-pointer"
                          title="Share Test"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleStartEducatorTest(test.id, test.mode, test.subject)}
                          className="px-3.5 py-2 bg-saffron hover:bg-orange-500 text-[10px] font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1 shrink-0 transition-all active:scale-95 cursor-pointer shadow hover:shadow-saffron-dim"
                        >
                          <Play className="w-3.5 h-3.5 fill-bg-s1" />
                          <span>{progress ? (progress.completed ? 'Retake' : 'Resume') : 'Start'}</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Saved Question Detail Modal */}
      <AnimatePresence>
        {selectedSavedQuestion && (
          <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-bg-s2 border border-border rounded-xl shadow-2xl p-6 relative overflow-hidden flex flex-col gap-4 text-text"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex justify-between items-center border-b border-border pb-3 shrink-0">
                <span className="text-[10px] font-black uppercase text-saffron tracking-widest flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 fill-saffron/10 animate-pulse" />
                  <span>Saved Question Details</span>
                </span>
                <button
                  onClick={() => setSelectedSavedQuestion(null)}
                  className="text-xs text-text-muted hover:text-text cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto max-h-[450px] pr-1">
                {/* Subject tag */}
                <div className="text-[9px] font-black uppercase text-text-muted bg-bg-s3 border border-border px-2.5 py-1 rounded-md self-start flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-saffron" />
                  <span>{selectedSavedQuestion.subject || 'General Knowledge'}</span>
                </div>

                {/* Question Text */}
                <h3 className="text-xs font-black text-text leading-relaxed tracking-wide">
                  {selectedSavedQuestion.question}
                </h3>

                {/* Options List */}
                <div className="flex flex-col gap-2.5 mt-1">
                  {selectedSavedQuestion.options.map((option: string, oIdx: number) => {
                    const isCorrect = oIdx === selectedSavedQuestion.correctIndex;
                    return (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between ${
                          isCorrect
                            ? 'bg-green-500/10 border-greenL/40 text-greenL'
                            : 'bg-bg-s3/40 border-border/80 text-text-muted'
                        }`}
                      >
                        <span>{option}</span>
                        {isCorrect && (
                          <span className="text-[9px] font-black bg-greenL/20 px-2 py-0.5 rounded uppercase">Correct</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {selectedSavedQuestion.explanation && (
                  <div className="p-4 bg-saffron-dim/10 border border-saffron-border/10 rounded-lg flex flex-col gap-1.5 mt-2">
                    <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Explanation:</span>
                    <p className="text-[11px] text-text-muted leading-relaxed whitespace-pre-line">
                      {selectedSavedQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions row */}
              <div className="flex gap-3 mt-2 shrink-0 border-t border-border pt-4">
                <button
                  onClick={() => {
                    if (onToggleBookmark) {
                      onToggleBookmark(selectedSavedQuestion);
                    }
                    setSelectedSavedQuestion(null);
                  }}
                  className="flex-1 py-2.5 border border-redL/20 hover:border-redL/40 bg-redL/5 hover:bg-redL/10 text-redL text-xs font-black uppercase rounded-md flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Bookmark</span>
                </button>
                <button
                  onClick={() => setSelectedSavedQuestion(null)}
                  className="flex-1 py-2.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-md flex items-center justify-center cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-[1000] bg-bg-s2 border border-saffron/40 text-saffron px-4 py-2.5 rounded-xl shadow-2xl text-xs font-black flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-saffron" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
