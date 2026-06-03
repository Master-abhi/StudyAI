import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  RotateCcw, 
  BookOpen, 
  Award, 
  BookmarkCheck, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Trophy,
  MessageSquare,
  Newspaper,
  User,
  Settings
} from 'lucide-react';

import type { Question } from './types';
import { PracticeHeader } from './components/PracticeHeader';
import { ProgressBarSection } from './components/ProgressBarSection';
import { MCQCard } from './components/MCQCard';
import { OptionList } from './components/OptionList';
import { ExplanationCard } from './components/ExplanationCard';
import { QuestionPalette } from './components/QuestionPalette';
import { PerformancePanel } from './components/PerformancePanel';
import { AiTutorModal } from './components/AiTutorModal';

// Components
import { DashboardTab } from './components/DashboardTab';
import { PracticeTab } from './components/PracticeTab';
import { AiTutorTab } from './components/AiTutorTab';
import { NewsTab } from './components/NewsTab';
import { ProfileTab } from './components/ProfileTab';
import { SyllabusPage } from './components/syllabus/SyllabusPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { AuthModal } from './components/AuthModal';
import { SettingsModal } from './components/SettingsModal';
import { TopicStudyModal } from './components/TopicStudyModal';

import { 
  EXAMS_DATA, 
  getProgressFromLocalStorage, 
  saveProgressToLocalStorage 
} from './components/syllabus/syllabusData';

// High-quality mock questions targeting CGPSC / CG Vyapam
const MOCK_QUESTIONS: Question[] = [
  {
    id: 'cg-001',
    question: 'छत्तीसगढ़ राज्य का गठन किस वर्ष में और किस तिथि को हुआ था?',
    options: [
      '1 नवंबर 1999',
      '1 नवंबर 2000',
      '9 नवंबर 2000',
      '15 नवंबर 2000'
    ],
    correctIndex: 1,
    explanation: 'छत्तीसगढ़ राज्य का गठन 1 नवंबर 2000 को मध्य प्रदेश पुनर्गठन अधिनियम, 2000 के तहत हुआ था। यह भारत संघ का 26वां राज्य बना था। गठन के समय इसमें 3 संभाग और 16 जिले शामिल थे।',
    subject: 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)',
    difficulty: 'easy',
    weightage: 'high',
    isCgSpecific: true,
    examRelevance: 'CGPSC Pre 2003, CG Vyapam'
  },
  {
    id: 'cg-002',
    question: 'छत्तीसगढ़ के किस मंदिर को "छत्तीसगढ़ का खजुराहो" भी कहा जाता है?',
    options: [
      'राजीव लोचन मंदिर (राजिम)',
      'भोरमदेव मंदिर (कवर्धा)',
      'दन्तेश्वरी मंदिर (दन्तेवाड़ा)',
      'महामाया मंदिर (रतनपुर)'
    ],
    correctIndex: 1,
    explanation: 'कबीरधाम (कवर्धा) जिले में स्थित भोरमदेव मंदिर को अपनी कामुक मूर्तियों और नागर शैली की स्थापत्य कला के कारण "छत्तीसगढ़ का खजुराहो" कहा जाता है। इसका निर्माण 11वीं शताब्दी में फणिनागवंशी राजा रामचंद्र देव द्वारा कराया गया था।',
    subject: 'छत्तीसगढ़ पर्यटन एवं कला-संस्कृति',
    difficulty: 'medium',
    weightage: 'high',
    isCgSpecific: true,
    examRelevance: 'CGPSC Pre 2012, 2018'
  },
  {
    id: 'cg-003',
    question: 'छत्तीसगढ़ की सबसे प्रमुख और सबसे बड़ी नदी कौन सी है जिसे राज्य की जीवन रेखा भी कहा जाता है?',
    options: [
      'शिवनाथ नदी',
      'महानदी',
      'इन्द्रावती नदी',
      'हसदेव नदी'
    ],
    correctIndex: 1,
    explanation: 'महानदी छत्तीसगढ़ की जीवन रेखा कहलाती है। इसका उद्गम धमतरी जिले के सिहावा पर्वत से होता है। इसकी कुल लंबाई 858 किमी है जिसमें से 286 किमी यह छत्तीसगढ़ में बहती है। इसकी मुख्य सहायक नदियाँ शिवनाथ, हसदेव, अरपा, जोंक आदि हैं।',
    subject: 'छत्तीसगढ़ का भूगोल',
    difficulty: 'easy',
    weightage: 'medium',
    isCgSpecific: true,
    examRelevance: 'CGPSC Pre 2008, CG Forest'
  },
  {
    id: 'cg-004',
    question: 'सरहुल त्योहार मुख्य रूप से छत्तीसगढ़ की किस आदिवासी जनजाति द्वारा मनाया जाता है?',
    options: [
      'गोंड जनजाति',
      'बैगा जनजाति',
      'उरांव जनजाति',
      'हलबा जनजाति'
    ],
    correctIndex: 2,
    explanation: 'सरहुल उरांव जनजाति का एक अत्यंत महत्वपूर्ण लोक त्योहार है। यह वसंत ऋतु में साल के वृक्ष (सर्जुन) पर फूल आने के अवसर पर मनाया जाता है। इस अवसर पर साल वृक्ष की पूजा कर धरती माता और सूर्य देव (धर्मेश) का विवाह रचाया जाता है।',
    subject: 'छत्तीसगढ़ की जनजातियाँ',
    difficulty: 'hard',
    weightage: 'high',
    isCgSpecific: true,
    examRelevance: 'CGPSC Pre 2016, 2020'
  },
  {
    id: 'cg-005',
    question: 'छत्तीसगढ़ राज्य विधानसभा के प्रथम अध्यक्ष (Speaker) कौन थे?',
    options: [
      'श्री बनवारी लाल अग्रवाल',
      'श्री राजेन्द्र प्रसाद शुक्ल',
      'श्री धरमलाल कौशिक',
      'श्री चरणदास महंत'
    ],
    correctIndex: 1,
    explanation: 'राजेन्द्र प्रसाद शुक्ल छत्तीसगढ़ विधानसभा के प्रथम अध्यक्ष थे। जबकि प्रथम उपाध्यक्ष श्री बनवारी लाल अग्रवाल थे। वर्तमान विधानसभा अध्यक्ष डॉ. रमन सिंह हैं।',
    subject: 'छत्तीसगढ़ की प्रशासनिक व्यवस्था',
    difficulty: 'medium',
    weightage: 'medium',
    isCgSpecific: true,
    examRelevance: 'CGPSC Pre 2005'
  },
  {
    id: 'cg-006',
    question: 'छत्तीसगढ़ का एकमात्र जूट उद्योग कहाँ स्थित है?',
    options: [
      'धमतरी',
      'रायगढ़',
      'बिलासपुर',
      'राजनांदगांव'
    ],
    correctIndex: 1,
    explanation: 'छत्तीसगढ़ का एकमात्र जूट कारखाना (मोहन जूट मिल) रायगढ़ जिले में स्थित है। इसकी स्थापना 1935 में की गई थी। वर्तमान समय में यह मिल बंद अवस्था में है।',
    subject: 'छत्तीसगढ़ के उद्योग',
    difficulty: 'hard',
    weightage: 'medium',
    isCgSpecific: true,
    examRelevance: 'CGPSC Pre 2019'
  }
];

export default function App() {
  // 1. Navigation Shell State
  const [activeTab, setActiveTab] = useState<'home' | 'practice' | 'chat' | 'news' | 'profile' | 'syllabus' | 'admin'>('home');
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [appLanguage, setAppLanguage] = useState<'hi' | 'en'>('hi');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // 2. Authentication & User Profile State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);

  // User Profile Metrics initialized from legacy localStorage keys
  const [xp, setXp] = useState<number>(() => {
    const val = localStorage.getItem('examprep_points');
    return val ? parseInt(val, 10) : 120;
  });
  const [streak, setStreak] = useState<number>(() => {
    const val = localStorage.getItem('examprep_streak');
    return val ? parseInt(val, 10) : 2;
  });
  const [solvedMcqsCount, setSolvedMcqsCount] = useState<number>(() => {
    const val = localStorage.getItem('examprep_mcqsSolved');
    return val ? parseInt(val, 10) : 25;
  });
  const [testHistory, setTestHistory] = useState<any[]>(() => {
    const val = localStorage.getItem('examprep_testResults');
    try {
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  });

  // Syllabus / Exam State
  const [activeExamId, setActiveExamId] = useState<string>(() => {
    return localStorage.getItem('examprep_selectedExam') || 'cgpsc_sse';
  });
  const [topicProgress, setTopicProgress] = useState<Record<string, any>>({});
  const [serverAnalytics, setServerAnalytics] = useState<any>(null);

  // Topic Study Workspace state
  const [studyModalOpen, setStudyModalOpen] = useState<boolean>(false);
  const [studyTopicParams] = useState<any>({ id: '', name: '', nameHi: '' });

  // 3. Quiz Taking Workspace State (from old App)
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [mode, setMode] = useState<'quiz' | 'mock' | 'pyq'>('quiz');
  const [subjectName, setSubjectName] = useState<string>('CGPSC State Service Exam');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(MOCK_QUESTIONS.length).fill(null));
  const [markedForReview, setMarkedForReview] = useState<boolean[]>(Array(MOCK_QUESTIONS.length).fill(false));
  const [visited, setVisited] = useState<boolean[]>(Array(MOCK_QUESTIONS.length).fill(false));
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [floatingXp, setFloatingXp] = useState<number | null>(null);

  const activeExam = EXAMS_DATA.find(e => e.id === activeExamId) || EXAMS_DATA[0];

  // Helper URL resolver
  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  // Auth Listener
  useEffect(() => {
    const firebase = (window as any).firebase;
    if (!firebase) {
      setIsGuest(true);
      return;
    }

    if (firebase.apps.length === 0) {
      try {
        firebase.initializeApp({
          apiKey: "AIzaSyC1zPetkyHD_07pr_ZIqLBE942NxIOJMxw",
          authDomain: "cg-guru.firebaseapp.com",
          projectId: "cg-guru",
          storageBucket: "cg-guru.firebasestorage.app",
          appId: "1:166390114183:web:397f8c629cebf14ec71522"
        });
      } catch (err) {
        console.error('Firebase initialization fallback error:', err);
      }
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setCurrentUser(user);
        setIsGuest(false);
        setAuthModalOpen(false);
      } else {
        setCurrentUser(null);
        // Show auth blocking modal on start if not guest
        const guestFlag = localStorage.getItem('cg_is_guest') === 'true';
        if (guestFlag) {
          setIsGuest(true);
        } else {
          setAuthModalOpen(true);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to currentUser custom claims to check admin state
  useEffect(() => {
    if (currentUser) {
      currentUser.getIdTokenResult().then((idTokenResult: any) => {
        setIsAdmin(!!idTokenResult.claims.admin);
      }).catch((e: any) => {
        console.error('Error verifying token custom claims:', e);
        setIsAdmin(false);
      });
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  // Fetch / Sync stats on Auth or activeExam change
  useEffect(() => {
    if (isGuest || !currentUser) {
      // Load fallback local storage tracker progress
      const localProgress = getProgressFromLocalStorage(activeExamId);
      setTopicProgress(localProgress.topicProgress);
      // Reset server analytics
      setServerAnalytics(null);
      return;
    }

    const loadUserProfileAndProgress = async () => {
      try {
        const token = await currentUser.getIdToken();
        const headers = { 'Authorization': `Bearer ${token}` };

        // 1. Fetch user data (scores, history, streaks)
        const profileRes = await fetch(getApiUrl('/api/user/data'), { headers });
        if (profileRes.ok) {
          const data = await profileRes.json();
          setXp(data.points || 0);
          setStreak(data.streak?.count || 0);
          setSolvedMcqsCount(data.mcqsSolved || 0);
          setTestHistory(data.testResults || []);
          if (data.selectedExam) {
            setActiveExamId(data.selectedExam);
          }
        }

        // 2. Fetch study intelligence dashboard metrics
        const dashboardRes = await fetch(getApiUrl(`/api/study-intelligence/dashboard?examId=${activeExamId}`), { headers });
        if (dashboardRes.ok) {
          const data = await dashboardRes.json();
          setServerAnalytics(data);

          // Build topicProgress record from server masteries and spaced repetition schedules
          const topicProgressMap: Record<string, any> = {};

          // Seed all topics first
          activeExam.subjects.forEach(subject => {
            subject.chapters.forEach(chapter => {
              chapter.topics.forEach(topic => {
                topicProgressMap[topic.id] = {
                  topicId: topic.id,
                  status: 'Not Started',
                  notesRead: false,
                  mcqCompleted: false,
                  videoWatched: false,
                  accuracy: 0,
                  revisionCount: 0,
                  lastStudied: '',
                  nextRevisionDate: ''
                };
              });
            });
          });

          // Merge server masteries
          if (data.masteries && Array.isArray(data.masteries)) {
            data.masteries.forEach((m: any) => {
              if (topicProgressMap[m.topicId]) {
                topicProgressMap[m.topicId] = {
                  ...topicProgressMap[m.topicId],
                  status: m.status || 'Not Started',
                  notesRead: (m.notesReadCount || 0) > 0,
                  mcqCompleted: (m.totalMcqsAttempted || 0) > 0,
                  videoWatched: (m.videosWatchedCount || 0) > 0,
                  accuracy: m.accuracy || 0,
                  revisionCount: m.revisionCount || 0,
                  lastStudied: m.lastUpdated ? (typeof m.lastUpdated === 'string' ? m.lastUpdated : (m.lastUpdated.seconds ? new Date(m.lastUpdated.seconds * 1000).toISOString() : '')) : ''
                };
              }
            });
          }

          // Merge spaced repetition schedules
          if (data.spacedRepetitions && Array.isArray(data.spacedRepetitions)) {
            data.spacedRepetitions.forEach((sr: any) => {
              if (topicProgressMap[sr.topicId]) {
                topicProgressMap[sr.topicId] = {
                  ...topicProgressMap[sr.topicId],
                  nextRevisionDate: sr.nextRevisionDate ? (typeof sr.nextRevisionDate === 'string' ? sr.nextRevisionDate : (sr.nextRevisionDate.seconds ? new Date(sr.nextRevisionDate.seconds * 1000).toISOString() : '')) : ''
                };
              }
            });
          }

          setTopicProgress(topicProgressMap);
          // Keep local storage in sync as cache
          saveProgressToLocalStorage({
            examId: activeExamId,
            streak: Math.round((data.metrics?.consistencyIndex || 50) / 10),
            lastActive: new Date().toISOString(),
            topicProgress: topicProgressMap
          });
        }
      } catch (err) {
        console.error('[Load Profile Error]:', err);
      }
    };

    loadUserProfileAndProgress();
  }, [currentUser, isGuest, activeExamId]);

  // Synchronize states to legacy localStorage keys whenever they change
  useEffect(() => {
    localStorage.setItem('examprep_selectedExam', activeExamId);
  }, [activeExamId]);

  useEffect(() => {
    localStorage.setItem('examprep_points', String(xp));
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('examprep_streak', String(streak));
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('examprep_mcqsSolved', String(solvedMcqsCount));
  }, [solvedMcqsCount]);

  useEffect(() => {
    localStorage.setItem('examprep_testResults', JSON.stringify(testHistory));
  }, [testHistory]);

  // Handle study trigger navigation parameter and testId check on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testId = params.get('testId');
    const pageParam = params.get('page');

    if (testId) {
      const fetchAndStartTest = async () => {
        try {
          const res = await fetch(getApiUrl(`/api/tests/${testId}`));
          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.questions) && data.questions.length > 0) {
              startTestPractice(
                data.questions, 
                data.mode || 'quiz', 
                data.subject || 'Practice Test'
              );
            }
          }
        } catch (e) {
          console.error('[URL Param Test Loader Error]:', e);
        }
      };
      fetchAndStartTest();
    } else if (pageParam === 'syllabus') {
      setActiveTab('syllabus');
    }
  }, []);

  const onToggleActivity = async (topicId: string, activityType: 'notesRead' | 'mcqCompleted' | 'videoWatched') => {
    setTopicProgress(prev => {
      const current = prev[topicId] || {
        topicId,
        status: 'Not Started',
        notesRead: false,
        mcqCompleted: false,
        videoWatched: false,
        accuracy: 0,
        revisionCount: 0,
        lastStudied: '',
        nextRevisionDate: ''
      };

      const updated = {
        ...current,
        [activityType]: !current[activityType],
        lastStudied: new Date().toISOString()
      };

      // Determine new status
      const { notesRead, mcqCompleted, videoWatched } = updated;
      if (notesRead && mcqCompleted && videoWatched) {
        updated.status = 'Completed';
      } else if (notesRead || mcqCompleted || videoWatched) {
        if (current.status !== 'Revised') {
          updated.status = 'In Progress';
        }
      } else {
        updated.status = 'Not Started';
      }

      const nextState = { ...prev, [topicId]: updated };

      // Save to localStorage
      saveProgressToLocalStorage({
        examId: activeExamId,
        streak,
        lastActive: new Date().toISOString(),
        topicProgress: nextState
      });

      // Async sync to server if logged in
      if (currentUser) {
        currentUser.getIdToken().then(async (token: string) => {
          try {
            let subjectId = '';
            activeExam.subjects.forEach((sub: any) => {
              sub.chapters.forEach((chap: any) => {
                if (chap.topics.some((t: any) => t.id === topicId)) {
                  subjectId = sub.id;
                }
              });
            });

            const serverActivityType = activityType === 'notesRead' ? 'read_notes' : 
                                       activityType === 'videoWatched' ? 'watch_video' : null;

            if (serverActivityType) {
              await fetch(getApiUrl('/api/study-intelligence/log-event'), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  examId: activeExamId,
                  activityType: serverActivityType,
                  subjectId: subjectId || 'general-gk',
                  topicId,
                  timeSpentSeconds: 60
                })
              });
            }
          } catch (err) {
            console.warn('Failed to sync study event to server:', err);
          }
        });
      }

      return nextState;
    });
  };

  const onMarkRevised = async (topicId: string) => {
    setTopicProgress(prev => {
      const current = prev[topicId] || {
        topicId,
        status: 'Not Started',
        notesRead: false,
        mcqCompleted: false,
        videoWatched: false,
        accuracy: 0,
        revisionCount: 0,
        lastStudied: '',
        nextRevisionDate: ''
      };

      const updated = {
        ...current,
        status: 'Revised' as const,
        revisionCount: (current.revisionCount || 0) + 1,
        lastStudied: new Date().toISOString(),
        nextRevisionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };

      const nextState = { ...prev, [topicId]: updated };

      // Save to localStorage
      saveProgressToLocalStorage({
        examId: activeExamId,
        streak,
        lastActive: new Date().toISOString(),
        topicProgress: nextState
      });

      // Async sync to server if logged in
      if (currentUser) {
        currentUser.getIdToken().then(async (token: string) => {
          try {
            let subjectId = '';
            activeExam.subjects.forEach((sub: any) => {
              sub.chapters.forEach((chap: any) => {
                if (chap.topics.some((t: any) => t.id === topicId)) {
                  subjectId = sub.id;
                }
              });
            });

            await fetch(getApiUrl('/api/study-intelligence/log-revision'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                topicId,
                subjectId: subjectId || 'general-gk',
                recentAccuracy: current.accuracy || 80
              })
            });
          } catch (err) {
            console.warn('Failed to sync revision to server:', err);
          }
        });
      }

      return nextState;
    });
  };

  // Timer loop for active quiz
  useEffect(() => {
    if (sessionCompleted || !isTestActive) return;
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionCompleted, isTestActive]);

  // Visited palette tracker
  useEffect(() => {
    if (visited.length > currentIndex) {
      const newVisited = [...visited];
      newVisited[currentIndex] = true;
      setVisited(newVisited);
    }
  }, [currentIndex, visited.length]);

  // Select option handler
  const handleSelectOption = (optIdx: number) => {
    if (answers[currentIndex] !== null || sessionCompleted) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = optIdx;
    setAnswers(newAnswers);

    const isCorrect = optIdx === questions[currentIndex].correctIndex;
    if (isCorrect) {
      const addedXp = 10 + (streak >= 2 ? 5 : 0);
      setXp(prev => prev + addedXp);
      setStreak(prev => prev + 1);
      setFloatingXp(addedXp);
      setTimeout(() => setFloatingXp(null), 1200);
    } else {
      setStreak(0);
    }
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const handleToggleReview = () => {
    if (sessionCompleted) return;
    const newMarked = [...markedForReview];
    newMarked[currentIndex] = !newMarked[currentIndex];
    setMarkedForReview(newMarked);
  };


  // Launch test session helper
  const startTestPractice = (testQuestions: Question[], testMode: 'quiz' | 'mock' | 'pyq', subject: string) => {
    setQuestions(testQuestions);
    setMode(testMode);
    setSubjectName(subject);
    setCurrentIndex(0);
    setAnswers(Array(testQuestions.length).fill(null));
    setMarkedForReview(Array(testQuestions.length).fill(false));
    setVisited(Array(testQuestions.length).fill(false));
    setElapsedTime(0);
    setSessionCompleted(false);
    setIsTestActive(true);
  };

  // Finish practice session and sync detailed analytics
  const handleFinishSession = async () => {
    setSessionCompleted(true);

    const correctCount = answers.filter((ans, idx) => ans !== null && ans === questions[idx].correctIndex).length;
    const wrongCount = answers.filter((ans, idx) => ans !== null && ans !== questions[idx].correctIndex).length;
    const skippedCount = questions.length - answers.filter(ans => ans !== null).length;

    const gainedXp = correctCount * 10;
    const newXp = xp + gainedXp;
    setXp(newXp);

    const newMcqsSolved = solvedMcqsCount + questions.length;
    setSolvedMcqsCount(newMcqsSolved);

    const newRecord = {
      subject: subjectName,
      exam: activeExamId,
      mode: mode,
      correct: correctCount,
      wrong: wrongCount,
      skipped: skippedCount,
      percent: Math.round((correctCount / questions.length) * 100),
      timestamp: new Date().toISOString()
    };

    const newHistory = [newRecord, ...testHistory];
    setTestHistory(newHistory);

    // Sync to Express REST databases if authenticated user is logged in
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // 1. Sync statistics
        await fetch(getApiUrl('/api/user/sync'), {
          method: 'POST',
          headers,
          body: JSON.stringify({
            points: newXp,
            mcqsSolved: newMcqsSolved,
            testResults: newHistory,
            streak: {
              count: streak,
              lastDate: new Date().toISOString().split('T')[0]
            }
          })
        });

        // 2. Log MCQ attempts to server database to train AI coach
        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];
          const isCorrect = answers[i] === q.correctIndex;
          await fetch(getApiUrl('/api/study-intelligence/log-mcq-attempt'), {
            method: 'POST',
            headers,
            body: JSON.stringify({
              examId: activeExamId,
              subjectId: activeExam?.subjects[0]?.id || 'cgpsc_cg_gk',
              topicId: q.id || 'general-gk',
              questionId: q.id || `q_${i}`,
              difficulty: q.difficulty || 'medium',
              answerSelected: answers[i],
              correctIndex: q.correctIndex,
              isCorrect,
              responseTimeMs: 25000, // mock response time
              attemptCount: 1
            })
          });
        }

        // 3. Reload dashboard recommendations
        const res = await fetch(getApiUrl(`/api/study-intelligence/dashboard?examId=${activeExamId}`), { headers });
        if (res.ok) {
          const data = await res.json();
          setServerAnalytics(data);
        }
      } catch (err) {
        console.warn('Sync failed:', err);
      }
    }
  };

  const handleSelectExam = (examId: string) => {
    setActiveExamId(examId);
    // Persist to server
    if (currentUser) {
      currentUser.getIdToken().then((token: string) => {
        fetch(getApiUrl('/api/user/sync'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ selectedExam: examId })
        }).catch(err => console.warn('Exam sync failed', err));
      });
    }
  };

  const handleLogout = async () => {
    const firebase = (window as any).firebase;
    if (firebase) {
      try {
        await firebase.auth().signOut();
        localStorage.removeItem('cg_is_guest');
        setIsGuest(false);
        setAuthModalOpen(true);
      } catch (e) {
        console.error('Sign out error', e);
      }
    }
  };

  const handleClearProgress = () => {
    localStorage.clear();
    setXp(0);
    setStreak(0);
    setSolvedMcqsCount(0);
    setTestHistory([]);
    alert('Progress rates purged successfully!');
    window.location.reload();
  };

  // Aggregated completed topics count
  const completedCount = Object.values(topicProgress).filter(
    (tp: any) => tp.status === 'Completed' || tp.status === 'Revised'
  ).length;

  const totalTopics = activeExam?.subjects?.reduce(
    (sum, sub) => sum + sub.chapters.reduce((s, chap) => s + chap.topics.length, 0), 0
  ) || 50;

  // Render tab modules
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <DashboardTab
            userName={currentUser?.displayName || 'Aspirant'}
            streak={streak}
            xp={xp}
            completedTopicsCount={completedCount}
            totalTopicsCount={totalTopics}
            testsGivenCount={testHistory.length}
            activeExam={activeExam}
            exams={EXAMS_DATA}
            onSelectExam={handleSelectExam}
            onNavigateToTab={(tabId) => setActiveTab(tabId as any)}
            onStartPracticeMode={(modeType) => {
              if (modeType === 'quiz') {
                startTestPractice(MOCK_QUESTIONS.slice(0, 5), 'quiz', 'CGPSC Daily Quiz');
              } else if (modeType === 'mock') {
                startTestPractice(MOCK_QUESTIONS, 'mock', 'CGPSC Full Mock Test');
              } else {
                setActiveTab('practice');
              }
            }}
            topicProgress={topicProgress}
          />
        );
      case 'practice':
        return (
          <PracticeTab
            activeExam={activeExam}
            onStartPracticeSession={startTestPractice}
          />
        );
      case 'chat':
        return <AiTutorTab activeExam={activeExam} />;
      case 'news':
        return (
          <NewsTab
            onAskAi={(promptText) => {
              setActiveTab('chat');
              // Short delay to allow chat client to mount
              setTimeout(() => {
                const textInput = document.querySelector('input[placeholder*="Ask anything"]') as HTMLInputElement;
                if (textInput) {
                  textInput.value = promptText;
                  // Trigger form submits
                  const submitBtn = textInput.nextElementSibling as HTMLButtonElement;
                  if (submitBtn) submitBtn.click();
                }
              }, 150);
            }}
          />
        );
      case 'profile':
        return (
          <ProfileTab
            userName={currentUser?.displayName || 'Guest User'}
            userEmail={currentUser?.email || 'guest@studyworld.app'}
            streak={streak}
            xp={xp}
            testsGivenCount={testHistory.length}
            solvedMcqsCount={solvedMcqsCount}
            activeExam={activeExam}
            topicProgress={topicProgress}
            testHistory={testHistory}
            serverAnalytics={serverAnalytics}
            onClearProgress={handleClearProgress}
            isAdmin={isAdmin}
            onOpenAdmin={() => setActiveTab('admin')}
          />
        );
      case 'admin':
        return (
          <AdminDashboard
            currentUser={currentUser}
            onGoBack={() => setActiveTab('profile')}
          />
        );
      case 'syllabus':
        return (
          <SyllabusPage
            activeExamId={activeExamId}
            onSelectExam={handleSelectExam}
            topicProgress={topicProgress}
            serverAnalytics={serverAnalytics}
            onToggleActivity={onToggleActivity}
            onMarkRevised={onMarkRevised}
            streak={streak}
            onStartPractice={(subject, _topicId) => {
              // Find matching questions or fallback
              const filtered = MOCK_QUESTIONS.filter(q => q.subject?.includes(subject) || q.explanation?.includes(subject));
              startTestPractice(
                filtered.length > 0 ? filtered : MOCK_QUESTIONS.slice(0, 3),
                'quiz',
                `${subject} MCQ Practice`
              );
            }}
            onGoBack={() => setActiveTab('home')}
          />
        );
      default:
        return null;
    }
  };

  const isAdminTab = activeTab === 'admin';

  return (
    <div className={`min-h-screen bg-[#0B0E14] text-text flex flex-col items-center select-none font-sans ${isAdminTab ? 'pb-0' : 'pb-16'} overflow-x-hidden relative`}>
      <div className={`w-full ${isAdminTab ? 'max-w-7xl px-4 md:px-8' : 'max-w-lg'} flex flex-col min-h-screen bg-bg-s1 shadow-2xl border-x border-border/40 relative transition-all duration-300`}>
        
        {/* Sticky Global Top Header (Shown if test workspace is NOT active) */}
        {!isTestActive && activeTab !== 'admin' && (
          <header className="sticky top-0 left-0 right-0 bg-bg-s1/90 backdrop-blur-md border-b border-border/60 px-5 py-4 flex items-center justify-between z-30 shadow-sm shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none select-none">🎓</span>
              <span className="text-sm font-black bg-gradient-to-r from-saffron to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                CG Guru
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setSettingsModalOpen(true)}
                className="p-1.5 rounded-lg bg-bg-s2 border border-border text-text-muted hover:text-text cursor-pointer hover:border-saffron-border/50 transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </header>
        )}

        {/* Dynamic Body Router */}
        <main className="flex-1 px-4 py-4 flex flex-col gap-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!isTestActive ? (
              /* Tab layout panels wrapper */
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="flex-1 flex flex-col"
              >
                {renderTabContent()}
              </motion.div>
            ) : (
              /* CBT Practice Workspace (Full screen overlay style) */
              <motion.div
                key="quiz-workspace"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col gap-4 flex-1"
              >
                {/* CBT Header */}
                <PracticeHeader
                  subjectName={subjectName}
                  currentIndex={currentIndex}
                  totalQuestions={questions.length}
                  elapsedTime={elapsedTime}
                  mode={mode}
                  onBack={() => setIsTestActive(false)}
                  onTogglePalette={() => setPaletteOpen(!paletteOpen)}
                />

                {/* Question Palette */}
                <QuestionPalette
                  isOpen={paletteOpen}
                  totalQuestions={questions.length}
                  currentIndex={currentIndex}
                  answers={answers}
                  markedForReview={markedForReview}
                  visited={visited}
                  onSelectIndex={(idx) => setCurrentIndex(idx)}
                  onClose={() => setPaletteOpen(false)}
                />

                {/* Progress bar and XP levels */}
                <ProgressBarSection
                  totalQuestions={questions.length}
                  answers={answers}
                  xp={xp}
                  streak={streak}
                  floatingXp={floatingXp}
                />

                {/* Workspace Cards */}
                <div className="flex-1 py-1.5 flex flex-col gap-4">
                  {!sessionCompleted ? (
                    <div className="flex flex-col gap-4">
                      {/* MCQ Card */}
                      <MCQCard
                        question={questions[currentIndex]}
                        index={currentIndex}
                        isBookmarked={bookmarks.includes(questions[currentIndex].id || '')}
                        onToggleBookmark={() => handleToggleBookmark(questions[currentIndex].id || '')}
                        onReport={() => alert('Question reported. Our moderators will review.')}
                      />

                      {/* Options selection */}
                      <OptionList
                        options={questions[currentIndex].options}
                        correctIndex={questions[currentIndex].correctIndex}
                        selectedIndex={answers[currentIndex]}
                        answered={answers[currentIndex] !== null}
                        onSelectOption={handleSelectOption}
                      />

                      {/* AI explanation and tutor prompt cards */}
                      <AnimatePresence>
                        {answers[currentIndex] !== null && (
                          <ExplanationCard
                            question={questions[currentIndex]}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    /* Final session scorecard summary panel */
                    <div className="flex flex-col gap-5 py-2">
                      <div className="text-center flex flex-col items-center justify-center p-5 bg-[#121620] border border-saffron-border/30 rounded-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/20 rounded-full blur-2xl pointer-events-none" />
                        <Award className="w-16 h-16 text-saffron fill-saffron/10 mb-2 animate-bounce" />
                        <h2 className="text-lg font-black text-text uppercase tracking-wider">Practice Finished!</h2>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-[260px]">
                          Congratulations! You have completed all questions in this practice session.
                        </p>
                      </div>

                      <PerformancePanel
                        answers={answers}
                        correctAnswersCount={answers.filter((ans, idx) => ans !== null && ans === questions[idx].correctIndex).length}
                        wrongAnswersCount={answers.filter((ans, idx) => ans !== null && ans !== questions[idx].correctIndex).length}
                        skippedQuestionsCount={questions.length - answers.filter(ans => ans !== null).length}
                        streak={streak}
                      />

                      {/* Actions row */}
                      <div className="flex gap-3 mt-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setAnswers(Array(questions.length).fill(null));
                            setMarkedForReview(Array(questions.length).fill(false));
                            setVisited(Array(questions.length).fill(false));
                            setElapsedTime(0);
                            setCurrentIndex(0);
                            setSessionCompleted(false);
                          }}
                          className="flex-1 py-3.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-xs font-black uppercase text-text rounded-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                        >
                          <RotateCcw className="w-4 h-4 text-saffron" />
                          <span>Retake Session</span>
                        </button>
                        <button
                          onClick={() => setIsTestActive(false)}
                          className="flex-1 py-3.5 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Back to Hub</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sticky test workspace navigation footer */}
                {!sessionCompleted && (
                  <div className="sticky bottom-0 left-0 right-0 bg-bg-s2/90 backdrop-blur-md border-t border-border px-4 py-3.5 flex items-center justify-between z-20 shadow-xl shrink-0">
                    <button
                      onClick={handleToggleReview}
                      className={`px-3 py-2 text-xs font-bold rounded border transition-colors flex items-center gap-1.5 cursor-pointer ${
                        markedForReview[currentIndex]
                          ? 'bg-purple-600/10 border-purple-500/30 text-purple-400'
                          : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted hover:text-text'
                      }`}
                    >
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      <span>{markedForReview[currentIndex] ? 'Reviewed' : 'Review'}</span>
                    </button>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => currentIndex > 0 && setCurrentIndex(prev => prev - 1)}
                        disabled={currentIndex === 0}
                        className="p-2.5 rounded bg-bg-s3 border border-border text-text disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-s3/80 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {currentIndex < questions.length - 1 ? (
                        <button
                          onClick={() => currentIndex < questions.length - 1 && setCurrentIndex(prev => prev + 1)}
                          className="px-4 py-2.5 bg-saffron hover:bg-orange-500 text-xs font-black text-bg-s1 uppercase rounded flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleFinishSession}
                          className="px-4 py-2.5 bg-greenL hover:bg-green-600 text-xs font-black text-bg-s1 uppercase rounded flex items-center gap-1.5 cursor-pointer transition-all animate-pulse"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Submit Quiz</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Sticky Global Navigation Bar (Shown if test workspace is NOT active) */}
        {!isTestActive && activeTab !== 'admin' && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-bg-s2/95 backdrop-blur-md border-t border-border px-3 py-2 flex items-center justify-around z-30 shadow-2xl shrink-0">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'practice', label: 'Practice', icon: Trophy },
              { id: 'chat', label: 'AI Guru', icon: MessageSquare },
              { id: 'news', label: 'News', icon: Newspaper },
              { id: 'profile', label: 'Profile', icon: User }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id || (tab.id === 'home' && activeTab === 'syllabus');
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
                    isSelected ? 'text-saffron' : 'text-text-muted hover:text-text'
                  }`}
                >
                  <Icon className="w-5.5 h-5.5" />
                  <span className="text-[9px] font-black uppercase tracking-wider">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Authentication Modal Dialog */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
            setIsGuest(false);
          }}
          onGuest={() => {
            setIsGuest(true);
            setAuthModalOpen(false);
            localStorage.setItem('cg_is_guest', 'true');
          }}
        />

        {/* Global Settings Modal Overlay */}
        <SettingsModal
          isOpen={settingsModalOpen}
          onClose={() => setSettingsModalOpen(false)}
          activeExamName={activeExam?.name}
          onChangeExam={() => setActiveTab('home')}
          language={appLanguage}
          onLanguageChange={setAppLanguage}
          onLogout={handleLogout}
          onClearProgress={handleClearProgress}
        />

        {/* AI Explainer Video summaries and PDF notes study workspaces */}
        <TopicStudyModal
          isOpen={studyModalOpen}
          onClose={() => setStudyModalOpen(false)}
          topicId={studyTopicParams.id}
          topicName={studyTopicParams.name}
          topicNameHi={studyTopicParams.nameHi}
          language={appLanguage}
        />

        {/* AI Chat Tutor Modal for Workspace Questions */}
        <AiTutorModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          question={questions[currentIndex]}
          initialPromptType={null}
        />

      </div>
    </div>
  );
}
