import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, AlertCircle, Play, Bookmark, Trash2, ChevronRight, Zap, BookOpen, Search, SlidersHorizontal, X } from 'lucide-react';
import type { Question } from '../types';

interface ServerTest {
  id: string;
  examId: string;
  examIds?: string[];
  examName: string;
  examNames?: string[];
  subject: string;
  mode: 'quiz' | 'mock' | 'pyq';
  language: string;
  totalQuestions: number;
  createdAt: string;
}

interface PracticeTabProps {
  activeExam: any;
  onStartPracticeSession: (questions: Question[], mode: 'quiz' | 'mock' | 'pyq', subject: string) => void;
  bookmarkedQuestions?: Question[];
  onToggleBookmark?: (question: Question) => void;
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  activeExam,
  onStartPracticeSession,
  bookmarkedQuestions = [],
  onToggleBookmark
}) => {
  const [activeMode, setActiveMode] = useState<'quiz' | 'mock' | 'pyq' | 'saved'>('quiz');
  const [tests, setTests] = useState<ServerTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSavedQuestion, setSelectedSavedQuestion] = useState<Question | null>(null);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedLength, setSelectedLength] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Reset filters when mode changes
  useEffect(() => {
    setSearchQuery('');
    setSelectedLanguage('All');
    setSelectedLength('All');
    setSortBy('newest');
  }, [activeMode]);

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
      // Fail silently and let fallback tests handle it
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleStartEducatorTest = async (testId: string, testMode: 'quiz' | 'mock' | 'pyq', subject: string) => {
    try {
      setLoading(true);
      const res = await fetch(getApiUrl(`/api/tests/${testId}`));
      if (!res.ok) throw new Error('Failed to load test details');
      const data = await res.json();
      if (data && data.questions && data.questions.length > 0) {
        onStartPracticeSession(data.questions, testMode, subject);
      }
    } catch (err) {
      console.error(err);
      alert('Could not start this test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Preloaded PYQs backup
  const handleStartPYQPractice = () => {
    // Import the backup data dynamically or construct mock PYQ list
    const MOCK_PYQS: Question[] = [
      {
        question: "छत्तीसगढ़ राज्य का गठन किस वर्ष में और किस तिथि को हुआ था?",
        options: ["1 नवंबर 1999", "1 नवंबर 2000", "9 नवंबर 2000", "15 नवंबर 2000"],
        correctIndex: 1,
        explanation: "छत्तीसगढ़ राज्य का गठन 1 नवंबर 2000 को मध्य प्रदेश पुनर्गठन अधिनियम, 2000 के तहत हुआ था।",
        subject: "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        difficulty: "easy"
      },
      {
        question: "छत्तीसगढ़ के किस मंदिर को 'छत्तीसगढ़ का खजुराहो' भी कहा जाता है?",
        options: ["राजीव लोचन मंदिर", "भोरमदेव मंदिर", "दन्तेश्वरी मंदिर", "महामाया मंदिर"],
        correctIndex: 1,
        explanation: "कबीरधाम (कवर्धा) जिले में स्थित भोरमदेव मंदिर को 'छत्तीसगढ़ का खजुराहो' कहा जाता है। नागर शैली का यह मंदिर 11वीं सदी का है।",
        subject: "छत्तीसगढ़ पर्यटन एवं कला-संस्कृति",
        difficulty: "medium"
      },
      {
        question: "छत्तीसगढ़ की सबसे प्रमुख और सबसे बड़ी नदी कौन सी है जिसे जीवन रेखा कहा जाता है?",
        options: ["शिवनाथ नदी", "महानदी", "इन्द्रावती नदी", "हसदेव नदी"],
        correctIndex: 1,
        explanation: "महानदी छत्तीसगढ़ की जीवन रेखा कहलाती है। इसका उद्गम सिहावा पर्वत धमतरी से होता है।",
        subject: "छत्तीसगढ़ का भूगोल",
        difficulty: "easy"
      },
      {
        question: "सरहुल त्योहार मुख्य रूप से छत्तीसगढ़ की किस आदिवासी जनजाति द्वारा मनाया जाता है?",
        options: ["गोंड जनजाति", "बैगा जनजाति", "उraंव जनजाति", "हलबा जनजाति"],
        correctIndex: 2,
        explanation: "सरहुल उरांव जनजाति का लोक त्योहार है, जो साल के वृक्षों पर फूल आने के समय मनाया जाता है।",
        subject: "छत्तीसगढ़ की जनजातियाँ",
        difficulty: "hard"
      },
      {
        question: "छत्तीसगढ़ राज्य विधानसभा के प्रथम अध्यक्ष (Speaker) कौन थे?",
        options: ["श्री बनवारी लाल अग्रवाल", "श्री राजेन्द्र प्रसाद शुक्ल", "श्री धरमलाल कौशिक", "श्री चरणदास महंत"],
        correctIndex: 1,
        explanation: "राजेन्द्र प्रसाद शुक्ल छत्तीसगढ़ विधानसभा के प्रथम अध्यक्ष थे। प्रथम उपाध्यक्ष श्री बनवारी लाल अग्रवाल थे।",
        subject: "छत्तीसगढ़ की प्रशासनिक व्यवस्था",
        difficulty: "medium"
      }
    ];
    onStartPracticeSession(MOCK_PYQS, 'pyq', 'CGPSC Previous Year Questions');
  };

  // 1. Filter by mode and exam first (Base list matching the active mode and exam context)
  console.log('[PracticeTab] activeExamId:', activeExam?.id, 'activeMode:', activeMode);
  const baseFilteredTests = tests.filter(t => 
    t.mode === activeMode && 
    (t.examId === activeExam?.id || (Array.isArray(t.examIds) && t.examIds.includes(activeExam?.id)))
  );

  // 2. Extract unique languages dynamically from base tests
  const availableLanguages = Array.from(new Set(baseFilteredTests.map(t => t.language).filter(Boolean)));

  // 3. Apply active filters
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

    return matchesSearch && matchesLanguage && matchesLength;
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
        {[
          { id: 'quiz', label: 'Quizzes', icon: <Zap className="w-5 h-5 text-saffron" />, desc: 'Educator tests' },
          { id: 'mock', label: 'Mock Exams', icon: <Trophy className="w-5 h-5 text-saffron" />, desc: 'Full length tests' },
          { id: 'pyq', label: 'PYQ Papers', icon: <BookOpen className="w-5 h-5 text-saffron" />, desc: 'Previous papers' },
          { id: 'saved', label: 'Saved MCQs', icon: <Bookmark className="w-5 h-5 text-saffron" />, desc: `Saved (${bookmarkedQuestions.length})` }
        ].map(m => (
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
        ) : activeMode === 'pyq' ? (
          /* PYQ start card */
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-bg-s2 border border-border rounded-xl text-center flex flex-col gap-4 shadow shadow-saffron-dim/5"
          >
            <div className="w-14 h-14 bg-saffron-dim/20 rounded-full flex items-center justify-center mx-auto shadow-inner text-saffron shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1 max-w-xs mx-auto">
              <h4 className="text-sm font-black text-text">CGPSC / Vyapam PYQ Practice</h4>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Practice previous year questions from actual Chhattisgarh state government exams in a mixed bilingual format.
              </p>
            </div>
            <button
              onClick={handleStartPYQPractice}
              className="px-5 py-3 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-2 max-w-[200px] mx-auto transition-colors cursor-pointer shadow"
            >
              <Play className="w-3.5 h-3.5 fill-bg-s1" />
              <span>Start Practice</span>
            </button>
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
                <h4 className="text-xs font-black text-text uppercase">Saved Questions / बुकमार्क किए गए प्रश्न</h4>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Practice questions you saved during mock tests and daily quizzes.
                </p>
              </div>
              {bookmarkedQuestions.length > 0 && (
                <button
                  onClick={() => onStartPracticeSession(bookmarkedQuestions, 'quiz', 'Saved Questions Practice')}
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
                    {/* Language Filter */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase text-text-muted">Language / भाषा</label>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-2.5 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
                      >
                        <option value="All">All Languages / सभी भाषाएँ</option>
                        {availableLanguages.map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>

                    {/* Test Length Filter */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase text-text-muted">Questions / प्रश्न संख्या</label>
                      <select
                        value={selectedLength}
                        onChange={(e) => setSelectedLength(e.target.value)}
                        className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-2.5 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
                      >
                        <option value="All">Any Length / सभी</option>
                        <option value="short">Short (&lt; 20 Qs) / लघु</option>
                        <option value="medium">Medium (20-50 Qs) / मध्यम</option>
                        <option value="long">Long (&gt; 50 Qs) / दीर्घ</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase text-text-muted">Sort By / क्रमबद्ध करें</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-2.5 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
                      >
                        <option value="newest">Newest First / नवीन</option>
                        <option value="oldest">Oldest First / प्राचीन</option>
                        <option value="questions-desc">Most Questions / अधिक प्रश्न</option>
                        <option value="questions-asc">Fewest Questions / कम प्रश्न</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* List or Empty Indicator */}
            {filteredTests.length === 0 ? (
              <div className="p-8 text-center bg-bg-s2 border border-border rounded-xl text-xs text-text-muted flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6 text-saffron-border/60 mb-0.5" />
                <span>No educator tests match your filter criteria or none are available.</span>
                <span className="text-[10px]">
                  {baseFilteredTests.length === 0 
                    ? "Generate customized mock practice in the Syllabus tab or practice preloaded PYQs." 
                    : "Try adjusting your search query or filters."}
                </span>
                {(searchQuery || selectedLanguage !== 'All' || selectedLength !== 'All' || sortBy !== 'newest') && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedLanguage('All');
                      setSelectedLength('All');
                      setSortBy('newest');
                    }}
                    className="mt-2 px-3 py-1.5 bg-saffron-dim border border-saffron-border text-saffron hover:bg-saffron/20 rounded-lg text-[10px] font-black cursor-pointer transition-all active:scale-95"
                  >
                    Clear Filters / फ़िल्टर साफ़ करें
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTests.map(test => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-bg-s2 border border-border rounded-xl flex items-center justify-between shadow-sm hover:border-saffron-border/30 transition-all duration-200"
                  >
                    <div className="flex flex-col gap-0.5 truncate pr-3">
                      <h4 className="text-xs font-black text-text truncate leading-tight">{test.subject}</h4>
                      <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">
                        {test.totalQuestions} questions • {test.language} • {activeMode}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleStartEducatorTest(test.id, test.mode, test.subject)}
                      className="px-3.5 py-2 bg-saffron hover:bg-orange-500 text-[10px] font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1 shrink-0 transition-all active:scale-95 cursor-pointer shadow hover:shadow-saffron-dim"
                    >
                      <Play className="w-3.5 h-3.5 fill-bg-s1" />
                      <span>Start</span>
                    </button>
                  </motion.div>
                ))}
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
                    <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Explanation / व्याख्या:</span>
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
    </div>
  );
};
