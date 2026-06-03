import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, AlertCircle, Play } from 'lucide-react';
import type { Question } from '../types';

interface ServerTest {
  id: string;
  examId: string;
  examName: string;
  subject: string;
  mode: 'quiz' | 'mock' | 'pyq';
  language: string;
  totalQuestions: number;
  createdAt: string;
}

interface PracticeTabProps {
  activeExam: any;
  onStartPracticeSession: (questions: Question[], mode: 'quiz' | 'mock' | 'pyq', subject: string) => void;
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  activeExam,
  onStartPracticeSession
}) => {
  const [activeMode, setActiveMode] = useState<'quiz' | 'mock' | 'pyq'>('quiz');
  const [tests, setTests] = useState<ServerTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  const fetchTests = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/tests'));
      if (res.ok) {
        const data = await res.json();
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

  // Filter educator tests matching selected mode and active exam
  const filteredTests = tests.filter(t => t.mode === activeMode && t.examId === activeExam?.id);

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto pb-12 font-sans">
      
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
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {[
          { id: 'quiz', label: 'Quizzes', icon: '⚡', desc: 'Educator tests' },
          { id: 'mock', label: 'Mock Exams', icon: '🏆', desc: 'Full length tests' },
          { id: 'pyq', label: 'PYQ Papers', icon: '📚', desc: 'Previous papers' }
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
            <span className="text-lg mb-1 select-none">{m.icon}</span>
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
            <div className="w-14 h-14 bg-saffron-dim/20 rounded-full flex items-center justify-center text-2xl mx-auto shadow-inner">
              📚
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
        ) : filteredTests.length === 0 ? (
          /* Empty indicator */
          <div className="p-8 text-center bg-bg-s2 border border-border rounded-xl text-xs text-text-muted flex flex-col items-center gap-2">
            <AlertCircle className="w-6 h-6 text-saffron-border/60 mb-0.5" />
            <span>No educator tests available currently.</span>
            <span className="text-[10px]">Generate customized mock practice in the Syllabus tab or practice preloaded PYQs.</span>
          </div>
        ) : (
          /* Educator tests list */
          <div className="flex flex-col gap-3">
            {filteredTests.map(test => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-bg-s2 border border-border rounded-xl flex items-center justify-between shadow-sm"
              >
                <div className="flex flex-col gap-0.5 truncate pr-3">
                  <h4 className="text-xs font-black text-text truncate leading-tight">{test.subject}</h4>
                  <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">
                    {test.totalQuestions} questions • {test.language} • {activeMode}
                  </span>
                </div>
                
                <button
                  onClick={() => handleStartEducatorTest(test.id, test.mode, test.subject)}
                  className="px-3.5 py-2 bg-saffron hover:bg-orange-500 text-[10px] font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-bg-s1" />
                  <span>Start</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
