import { useState, useEffect, useRef, lazy, Suspense } from 'react';
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
  Settings,
  ShieldAlert,
  Shield,
  GraduationCap,
  Flame,
  FileText,
  Landmark,
  HelpCircle,
  Briefcase,
  Share2,
  Bell,
  Smartphone,
  Download,
  Keyboard,
  X,
  BellRing
} from 'lucide-react';

import type { Question } from './types';
import { PracticeHeader } from './components/PracticeHeader';
import { ProgressBarSection } from './components/ProgressBarSection';
import { MCQCard, stripAssertionReason } from './components/MCQCard';
import { OptionList } from './components/OptionList';
import { ExplanationCard } from './components/ExplanationCard';
import { QuestionPalette } from './components/QuestionPalette';
import { PerformancePanel } from './components/PerformancePanel';
import { AiTutorModal } from './components/AiTutorModal';
import { 
  requestPushNotificationPermission, 
  registerServiceWorker, 
  sendSystemPushNotification,
  ensureNotificationChannel,
  scheduleRecurringReminders,
  scheduleJobDeadlineNotifications,
  isCapacitorNative
} from './services/pushNotificationService';

// Instant Home Dashboard Component
import { DashboardTab } from './components/DashboardTab';

// Lazy Loaded Secondary Tabs for instant startup & code splitting
const PracticeTab = lazy(() => import('./components/PracticeTab').then(m => ({ default: m.PracticeTab })));
const TypingTest = lazy(() => import('./components/TypingTest').then(m => ({ default: m.TypingTest })));
const AiTutorTab = lazy(() => import('./components/AiTutorTab').then(m => ({ default: m.AiTutorTab })));
const NewsTab = lazy(() => import('./components/NewsTab').then(m => ({ default: m.NewsTab })));
const JobsTab = lazy(() => import('./components/JobsTab').then(m => ({ default: m.JobsTab })));
const ProfileTab = lazy(() => import('./components/ProfileTab').then(m => ({ default: m.ProfileTab })));
const SyllabusPage = lazy(() => import('./components/syllabus/SyllabusPage').then(m => ({ default: m.SyllabusPage })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const StaffDashboard = lazy(() => import('./components/staff/StaffDashboard').then(m => ({ default: m.StaffDashboard })));

// Lazy Loaded Modals
const AuthModal = lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const SettingsModal = lazy(() => import('./components/SettingsModal').then(m => ({ default: m.SettingsModal })));
const TopicStudyModal = lazy(() => import('./components/TopicStudyModal').then(m => ({ default: m.TopicStudyModal })));
const PublicProfileModal = lazy(() => import('./components/PublicProfileModal').then(m => ({ default: m.PublicProfileModal })));
const NotificationsModal = lazy(() => import('./components/NotificationsModal').then(m => ({ default: m.NotificationsModal })));

const TabFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[350px] w-full py-12 gap-3 text-text-muted">
    <div className="w-7 h-7 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
    <span className="text-[10px] font-bold uppercase tracking-wider text-saffron">Loading tab...</span>
  </div>
);

import type { Exam } from './components/syllabus/syllabusData';
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
  const [activeTab, setActiveTab] = useState<'home' | 'practice' | 'typing' | 'chat' | 'news' | 'jobs' | 'profile' | 'syllabus' | 'admin' | 'staff'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get('tab') || params.get('page');
      if (urlTab && ['home', 'practice', 'typing', 'chat', 'news', 'jobs', 'profile', 'syllabus', 'admin', 'staff'].includes(urlTab)) {
        return urlTab as any;
      }
      if (params.get('testId')) {
        return 'practice';
      }
      if (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')) {
        return 'admin';
      }
    }
    return (localStorage.getItem('cg_active_tab') as any) || 'home';
  });
  const [tabVisibility, setTabVisibility] = useState<Record<string, boolean>>({
    home: true,
    practice: true,
    typing: true,
    chat: true,
    news: true,
    jobs: true,
    syllabus: true,
    profile: true,
    practice_pyq: true,
    syllabus_ai_planner: true,
    syllabus_revision: true,
    syllabus_analytics: true,
    syllabus_strategy: true
  });
  const [examVisibility, setExamVisibility] = useState<Record<string, boolean>>({});
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [appLanguage, setAppLanguage] = useState<'hi' | 'en'>('hi');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isStaff, setIsStaff] = useState<boolean>(false);
  const [staffRoles, setStaffRoles] = useState<string[]>([]);
  const [initialSelectedArticle, setInitialSelectedArticle] = useState<any>(null);
  const [latestNotificationAlert, setLatestNotificationAlert] = useState<any | null>(null);
  const [notificationPermissionNeeded, setNotificationPermissionNeeded] = useState<boolean>(false);

  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const isMountTestChecked = useRef(false);

  const saveTestProgress = (testId: string | null, currentAnswers: (number | null)[], completed = false) => {
    if (!testId) return;
    try {
      const stored = localStorage.getItem('examprep_test_progress');
      const progressMap = stored ? JSON.parse(stored) : {};
      progressMap[testId] = {
        answers: currentAnswers,
        completed: completed || (progressMap[testId]?.completed || false)
      };
      localStorage.setItem('examprep_test_progress', JSON.stringify(progressMap));
    } catch (e) {
      console.error('[saveTestProgress] Error saving progress:', e);
    }
  };

  // Persist activeTab selection & synchronize browser URL search params
  useEffect(() => {
    localStorage.setItem('cg_active_tab', activeTab);

    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    let changed = false;

    // Sync activeTab
    const currentUrlTab = url.searchParams.get('tab') || url.searchParams.get('page');
    if (activeTab === 'home') {
      if (currentUrlTab) {
        url.searchParams.delete('tab');
        url.searchParams.delete('page');
        changed = true;
      }
    } else {
      if (currentUrlTab !== activeTab) {
        url.searchParams.set('tab', activeTab);
        url.searchParams.delete('page');
        changed = true;
      }
    }

    // Sync testId parameter
    const currentUrlTestId = url.searchParams.get('testId');
    if (isTestActive && activeTestId) {
      if (currentUrlTestId !== activeTestId) {
        url.searchParams.set('testId', activeTestId);
        changed = true;
      }
    } else if (!isTestActive && isMountTestChecked.current) {
      if (currentUrlTestId) {
        url.searchParams.delete('testId');
        changed = true;
      }
    }

    if (changed) {
      const newSearch = url.searchParams.toString();
      const newRelativePath = url.pathname + (newSearch ? '?' + newSearch : '') + url.hash;
      window.history.pushState({ tab: activeTab, testId: activeTestId }, '', newRelativePath);
    }
  }, [activeTab, activeTestId, isTestActive]);

  // Handle browser Back / Forward popstate navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get('tab') || params.get('page');
      const urlTestId = params.get('testId');

      if (urlTab && ['home', 'practice', 'typing', 'chat', 'news', 'jobs', 'profile', 'syllabus', 'admin', 'staff'].includes(urlTab)) {
        setActiveTab(urlTab as any);
      } else if (!urlTab && window.location.pathname.startsWith('/admin')) {
        setActiveTab('admin');
      } else if (!urlTab && urlTestId) {
        setActiveTab('practice');
      } else if (!urlTab) {
        setActiveTab('home');
      }

      if (!urlTestId && isTestActive) {
        setIsTestActive(false);
        setActiveTestId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isTestActive]);

  // 2. Authentication & User Profile State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [notificationsModalOpen, setNotificationsModalOpen] = useState<boolean>(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleDownloadApp = async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } catch (e) {}
      setDeferredInstallPrompt(null);
    } else {
      const apkUrl = '/cgguru.apk';
      const a = document.createElement('a');
      a.href = apkUrl;
      a.download = 'CG_Guru_App.apk';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportingQuestion, setReportingQuestion] = useState<Question | null>(null);
  const [reportReason, setReportReason] = useState<string>('');
  const [submittingReport, setSubmittingReport] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(() => {
    return (localStorage.getItem('cg_theme') as any) || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (t: 'dark' | 'light' | 'system') => {
      let resolvedTheme: 'dark' | 'light' = 'dark';
      if (t === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        resolvedTheme = t;
      }

      if (resolvedTheme === 'light') {
        root.setAttribute('data-theme', 'light');
        root.classList.add('light-theme');
        root.classList.remove('dark-theme');
      } else {
        root.removeAttribute('data-theme');
        root.classList.remove('light-theme');
        root.classList.add('dark-theme');
      }

      // Update Capacitor Status Bar style dynamically
      import('@capacitor/core').then(({ Capacitor }) => {
        if (Capacitor.isNativePlatform()) {
          import('@capacitor/status-bar').then(({ StatusBar, Style }) => {
            const isDark = resolvedTheme === 'dark';
            StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light }).catch(() => {});
            StatusBar.setBackgroundColor({ color: isDark ? '#121620' : '#ffffff' }).catch(() => {});
          });
        }
      }).catch(() => {});
    };

    applyTheme(theme);
    localStorage.setItem('cg_theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme('system');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  const [selectedProfileUid, setSelectedProfileUid] = useState<string | null>(null);
  const [publicProfileOpen, setPublicProfileOpen] = useState<boolean>(false);
  const [userMobile, setUserMobile] = useState<string>(() => {
    return localStorage.getItem('examprep_userMobile') || '';
  });

  // User Profile Metrics initialized from legacy localStorage keys
  const [xp, setXp] = useState<number>(() => {
    const val = localStorage.getItem('examprep_points');
    return val ? parseInt(val, 10) : 0;
  });
  const [streak, setStreak] = useState<number>(() => {
    const val = localStorage.getItem('examprep_streak');
    return val ? parseInt(val, 10) : 0;
  });
  const [streakLastDate, setStreakLastDate] = useState<string>(() => {
    return localStorage.getItem('examprep_streak_last_date') || '';
  });
  const [solvedMcqsCount, setSolvedMcqsCount] = useState<number>(() => {
    const val = localStorage.getItem('examprep_mcqsSolved');
    return val ? parseInt(val, 10) : 0;
  });
  const [testHistory, setTestHistory] = useState<any[]>(() => {
    const val = localStorage.getItem('examprep_testResults');
    try {
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  });

  const [typingResults, setTypingResults] = useState<any[]>(() => {
    const val = localStorage.getItem('examprep_typingResults');
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
  const [activeExamTargetDate, setActiveExamTargetDate] = useState<string>(() => {
    const activeSelected = localStorage.getItem('examprep_selectedExam') || 'cgpsc_sse';
    let stored = localStorage.getItem(`examprep_target_date_${activeSelected}`);
    if (!stored) {
      const initDate = new Date();
      initDate.setDate(initDate.getDate() + 365);
      stored = initDate.toISOString().split('T')[0];
      localStorage.setItem(`examprep_target_date_${activeSelected}`, stored);
    }
    return stored;
  });

  useEffect(() => {
    let stored = localStorage.getItem(`examprep_target_date_${activeExamId}`);
    if (!stored) {
      const initDate = new Date();
      initDate.setDate(initDate.getDate() + 365);
      stored = initDate.toISOString().split('T')[0];
      localStorage.setItem(`examprep_target_date_${activeExamId}`, stored);
    }
    setActiveExamTargetDate(stored);
  }, [activeExamId]);
  const [showFirstTimeExamSelector, setShowFirstTimeExamSelector] = useState<boolean>(false);
  const [hasSelectedExamThisSession, setHasSelectedExamThisSession] = useState<boolean>(false);
  const [topicProgress, setTopicProgress] = useState<Record<string, any>>({});
  const [serverAnalytics, setServerAnalytics] = useState<any>(null);
  const [userPlan, setUserPlan] = useState<'free' | 'paid'>('free');

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
  const [bookmarks, setBookmarks] = useState<Question[]>(() => {
    try {
      const val = localStorage.getItem('examprep_bookmarks');
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [testDuration, setTestDuration] = useState<number>(30 * 60); // in seconds
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [feedbackEnabled, setFeedbackEnabled] = useState<boolean>(false);
  const [rulesAccepted, setRulesAccepted] = useState<boolean>(false);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);
  const [rankingData, setRankingData] = useState<any>(null);

  const [exams, setExams] = useState<Exam[]>(EXAMS_DATA);
  const getDaysRemainingForExam = (examId: string): number => {
    let storedTarget = localStorage.getItem(`examprep_target_date_${examId}`);
    if (examId === activeExamId) {
      storedTarget = activeExamTargetDate;
    }
    if (!storedTarget) {
      return 365;
    }
    const target = new Date(storedTarget);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const visibleExams = (() => {
    const filtered = exams.filter(ex => examVisibility[ex.id] !== false);
    const mapped = filtered.map(ex => ({
      ...ex,
      daysRemaining: getDaysRemainingForExam(ex.id)
    }));
    return mapped.length > 0 ? mapped : exams.map(ex => ({
      ...ex,
      daysRemaining: getDaysRemainingForExam(ex.id)
    }));
  })();
  const activeExam = visibleExams.find(e => e.id === activeExamId) || visibleExams[0];

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

  const fetchCustomSyllabi = async () => {
    try {
      const res = await fetch(getApiUrl('/api/syllabus/custom'));
      if (res.ok) {
        const customExams = await res.json();
        if (Array.isArray(customExams)) {
          const merged = [...customExams];
          EXAMS_DATA.forEach(builtIn => {
            if (!merged.some(e => e.id === builtIn.id)) {
              merged.push(builtIn);
            }
          });
          setExams(merged);
        }
      }
    } catch (e) {
      console.error('[Fetch Custom Syllabi Error]:', e);
    }
  };

  const fetchTabVisibility = async () => {
    try {
      // Try to fetch directly from Firestore client SDK if available for faster updates
      const firebase = (window as any).firebase;
      if (firebase && firebase.auth().currentUser) {
        try {
          const doc = await firebase.firestore().collection('config').doc('tabs').get();
          if (doc.exists) {
            const data = doc.data();
            if (data && data.visibility) {
              setTabVisibility(data.visibility);
              
              // Redirect if current active tab is hidden
              const currentTab = activeTab;
              if (data.visibility[currentTab] === false) {
                const tabsOrder = ['home', 'practice', 'chat', 'news', 'syllabus', 'profile'];
                const firstVisible = tabsOrder.find(t => data.visibility[t] !== false);
                if (firstVisible) {
                  setActiveTab(firstVisible as any);
                }
              }
              return; // Successfully updated from Firestore
            }
          }
        } catch (fsErr) {
          console.warn('[Firestore Direct Tab Fetch Failed, falling back to API]:', fsErr);
        }
      }

      // Fallback to Server API
      const res = await fetch(getApiUrl('/api/admin/config/tabs'));
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.visibility) {
          setTabVisibility(data.visibility);
          
          // Redirect if current active tab is hidden
          const currentTab = activeTab;
          if (data.visibility[currentTab] === false) {
            const tabsOrder = ['home', 'practice', 'chat', 'news', 'syllabus', 'profile'];
            const firstVisible = tabsOrder.find(t => data.visibility[t] !== false);
            if (firstVisible) {
              setActiveTab(firstVisible as any);
            }
          }
        }
      }
    } catch (e) {
      console.error('[Fetch Tab Visibility Error]:', e);
    }
  };

  const fetchExamVisibility = async () => {
    try {
      const res = await fetch(getApiUrl('/api/admin/config/exams'));
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.visibility) {
          setExamVisibility(data.visibility);
        }
      }
    } catch (e) {
      console.error('[Fetch Exam Visibility Error]:', e);
    }
  };

  // Real-time Notifications Listener & Automatic Unread Count Calculation
  useEffect(() => {
    let unsubscribeSnap: (() => void) | null = null;

    const checkAndSubscribe = async () => {
      // 1. Ensure Notification Channel, Request Permission & Register SW
      ensureNotificationChannel();
      requestPushNotificationPermission();
      registerServiceWorker();
      scheduleRecurringReminders();

      // Check if browser permission needs user gesture prompt
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default' && !isCapacitorNative()) {
        setNotificationPermissionNeeded(true);
      }

      // 2. Trigger backend job deadline scan & expired notification cleanup
      try {
        fetch(getApiUrl('/api/notifications/job-alerts/scan'), { method: 'POST' }).catch(() => {});
      } catch (e) {}

      const getReadIds = (): string[] => {
        try {
          const storedRead = localStorage.getItem('examprep_read_notifications');
          return storedRead ? JSON.parse(storedRead) : [];
        } catch {
          return [];
        }
      };

      const processNotifications = (notifs: any[]) => {
        const todayStr = new Date().toISOString().split('T')[0];
        const currentReadIds = getReadIds();
        
        // Filter out expired job deadline notifications (deadline < today)
        const validNotifs = notifs.filter(n => {
          const lDate = n.lastDate || n.deadline || n.expiresAt;
          if (lDate && lDate < todayStr) return false;
          return true;
        });

        const unreadNotifs = validNotifs.filter(n => !currentReadIds.includes(n.id));
        setUnreadNotificationsCount(unreadNotifs.length);

        // Schedule future job deadlines in Android AlarmManager so alarms trigger when app is closed
        scheduleJobDeadlineNotifications(validNotifs);

        // Display In-App Floating Toast for the latest unread alert so user sees it immediately on app launch!
        if (unreadNotifs.length > 0) {
          const topAlert = unreadNotifs[0];
          const dismissedId = sessionStorage.getItem('cgguru_dismissed_toast');
          if (dismissedId !== topAlert.id) {
            setLatestNotificationAlert(topAlert);
          }
        }

        // Send Push Notification for ALL unread alerts directly to device Status Bar
        unreadNotifs.forEach(notif => {
          sendSystemPushNotification(
            notif.title || '📢 CG Guru Notification',
            notif.message || 'New announcement available!',
            '/icon-192.png',
            notif.actionUrl || '/jobs',
            notif.id
          );
        });
      };

      const fetchNotificationsApi = async () => {
        try {
          const res = await fetch(getApiUrl('/api/notifications'));
          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.notifications)) {
              processNotifications(data.notifications);
            }
          }
        } catch (e) {}
      };

      const setupFirestoreListener = () => {
        const firebase = (window as any).firebase;
        if (firebase && firebase.apps && firebase.apps.length > 0) {
          try {
            unsubscribeSnap = firebase.firestore().collection('notifications')
              .orderBy('createdAt', 'desc')
              .limit(50)
              .onSnapshot((snap: any) => {
                const docs = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
                processNotifications(docs);
              }, (err: any) => {
                console.warn('[Firestore Notifications Listener Error]:', err);
                fetchNotificationsApi();
              });
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      };

      // 1. Initial API fetch
      await fetchNotificationsApi();

      // 2. Setup real-time Firestore listener
      const attached = setupFirestoreListener();
      if (!attached) {
        setTimeout(() => {
          if (!unsubscribeSnap) {
            setupFirestoreListener();
          }
        }, 1500);
      }

      // 3. Periodic Background Polling interval (every 25s) so bell stays active automatically without refresh
      const pollInterval = setInterval(() => {
        fetchNotificationsApi();
      }, 25000);

      return () => {
        clearInterval(pollInterval);
        if (unsubscribeSnap) unsubscribeSnap();
      };
    };

    let cleanupPromise = checkAndSubscribe();

    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
      if (unsubscribeSnap) unsubscribeSnap();
    };
  }, []);

  useEffect(() => {
    fetchCustomSyllabi();
    fetchTabVisibility();
    fetchExamVisibility();
  }, [activeTab]);

  // Ensure active exam is valid and visible for regular users
  useEffect(() => {
    if (exams.length === 0) return;
    const isUserAdminOrStaff = isAdmin || isStaff;
    if (!isUserAdminOrStaff && Object.keys(examVisibility).length > 0) {
      const isCurrentVisible = exams.some(ex => ex.id === activeExamId && examVisibility[ex.id] !== false);
      if (!isCurrentVisible) {
        const firstVisible = exams.find(ex => examVisibility[ex.id] !== false);
        if (firstVisible) {
          handleSelectExam(firstVisible.id);
        }
      }
    }
  }, [examVisibility, exams, activeExamId, isAdmin, isStaff]);

  // Fetch Global Ranking and Leaderboard when Profile tab is viewed
  useEffect(() => {
    if (activeTab === 'profile' && currentUser && !isGuest) {
      currentUser.getIdToken().then(async (token: string) => {
        try {
          const res = await fetch(getApiUrl('/api/user/ranking'), {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            setRankingData(data);
          }
        } catch (err) {
          console.warn('Failed to load ranking data:', err);
        }
      });
    }
  }, [activeTab, currentUser, isGuest]);

  // Helper to clear all session states and localStorage keys
  const clearSessionStates = () => {
    setXp(0);
    setStreak(0);
    setStreakLastDate('');
    setSolvedMcqsCount(0);
    setTestHistory([]);
    setTypingResults([]);
    setTopicProgress({});
    setServerAnalytics(null);
    setRankingData(null);
    setShowFirstTimeExamSelector(false);
    setHasSelectedExamThisSession(false);
    setActiveTab('home');

    const keysToRemove = [
      'examprep_points',
      'examprep_streak',
      'examprep_streak_last_date',
      'examprep_mcqsSolved',
      'examprep_testResults',
      'examprep_typingResults',
      'userName',
      'cg_is_guest',
      'cg_active_tab'
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));

    Object.keys(localStorage).forEach(key => {
      if (
        key.startsWith('cg_syllabus_progress_') ||
        key.startsWith('examprep_progress_') ||
        key.startsWith('cg_chat_history_')
      ) {
        localStorage.removeItem(key);
      }
    });
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
          clearSessionStates();
          setIsGuest(false);
          setAuthModalOpen(true);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Capacitor Native Integrations (StatusBar, SplashScreen, App BackButton)
  useEffect(() => {
    import('@capacitor/core').then(({ Capacitor }) => {
      if (Capacitor.isNativePlatform()) {
        Promise.all([
          import('@capacitor/status-bar'),
          import('@capacitor/splash-screen'),
          import('@capacitor/app')
        ]).then(([{ StatusBar, Style }, { SplashScreen }, { App: CapApp }]) => {
          // 1. Hide splash screen
          SplashScreen.hide().catch((err) => console.warn('SplashScreen hide err:', err));

          // 2. Set initial status bar styling
          const updateStatusBar = async () => {
            try {
              const currentTheme = localStorage.getItem('cg_theme') || 'dark';
              const isDark = currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
              await StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light });
              await StatusBar.setBackgroundColor({ color: isDark ? '#121620' : '#ffffff' });
            } catch (err) {
              console.warn('StatusBar style err:', err);
            }
          };
          updateStatusBar();

          // 3. Setup hardware back button listener
          const backButtonListener = CapApp.addListener('backButton', (data) => {
            if (typeof (window as any).onCapacitorBackButton === 'function') {
              (window as any).onCapacitorBackButton(data);
            }
          });

          return () => {
            backButtonListener.then((l) => l.remove());
          };
        }).catch((err) => console.error('Capacitor plugins import error:', err));
      }
    });
  }, []);

  // Sync state values with back button handler to avoid React stale closures
  useEffect(() => {
    (window as any).onCapacitorBackButton = (data: any) => {
      if (aiModalOpen) {
        setAiModalOpen(false);
      } else if (notificationsModalOpen) {
        setNotificationsModalOpen(false);
      } else if (studyModalOpen) {
        setStudyModalOpen(false);
      } else if (reportModalOpen) {
        setReportModalOpen(false);
      } else if (settingsModalOpen) {
        setSettingsModalOpen(false);
      } else if (paletteOpen) {
        setPaletteOpen(false);
      } else if (showFirstTimeExamSelector) {
        setShowFirstTimeExamSelector(false);
      } else if (authModalOpen) {
        if (isGuest || currentUser) {
          setAuthModalOpen(false);
        } else {
          import('@capacitor/app').then(({ App: CapApp }) => CapApp.exitApp());
        }
      } else {
        if (data.canGoBack) {
          window.history.back();
        } else {
          import('@capacitor/app').then(({ App: CapApp }) => CapApp.exitApp());
        }
      }
    };
  }, [
    aiModalOpen,
    notificationsModalOpen,
    studyModalOpen,
    reportModalOpen,
    settingsModalOpen,
    paletteOpen,
    showFirstTimeExamSelector,
    authModalOpen,
    isGuest,
    currentUser
  ]);

  // Listen to currentUser custom claims to check admin/staff state
  useEffect(() => {
    if (currentUser) {
      currentUser.getIdTokenResult(true).then((idTokenResult: any) => {
        setIsAdmin(!!idTokenResult.claims.admin);
        setIsStaff(!!idTokenResult.claims.staff);
        setStaffRoles(idTokenResult.claims.roles || []);
      }).catch((e: any) => {
        console.error('Error verifying token custom claims:', e);
        setIsAdmin(false);
        setIsStaff(false);
        setStaffRoles([]);
      });
    } else {
      setIsAdmin(false);
      setIsStaff(false);
      setStaffRoles([]);
    }
  }, [currentUser]);

  // Direct Firestore Sync helper for multi-device instant broadcast
  const syncUserDataDirectly = async (updateObj: Record<string, any>) => {
    if (!currentUser) return;
    try {
      const firebase = (window as any).firebase;
      if (firebase && firebase.apps && firebase.apps.length > 0) {
        const db = firebase.firestore();
        await db.collection('users').doc(currentUser.uid).set({
          ...updateObj,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
    } catch (e) {
      console.warn('[syncUserDataDirectly Error]:', e);
    }
  };

  // Real-time multi-device Firestore Synchronization Listener
  useEffect(() => {
    if (isGuest || !currentUser) return;

    let unsubscribeUserDoc: (() => void) | null = null;
    let unsubscribeTopicMastery: (() => void) | null = null;

    const setupRealtimeSync = () => {
      const firebase = (window as any).firebase;
      if (!firebase || !firebase.apps || firebase.apps.length === 0) return false;

      try {
        const db = firebase.firestore();

        // 1. Real-time User Profile & Progress Listener across all logged-in devices
        unsubscribeUserDoc = db.collection('users').doc(currentUser.uid).onSnapshot(
          (docSnap: any) => {
            if (docSnap && docSnap.exists) {
              const data = docSnap.data();
              if (data) {
                if (typeof data.points === 'number') {
                  setXp(data.points);
                  localStorage.setItem('examprep_points', String(data.points));
                }
                if (data.streak) {
                  if (typeof data.streak.count === 'number') {
                    setStreak(data.streak.count);
                    localStorage.setItem('examprep_streak', String(data.streak.count));
                  }
                  if (data.streak.lastDate) {
                    setStreakLastDate(data.streak.lastDate);
                    localStorage.setItem('examprep_streak_last_date', data.streak.lastDate);
                  }
                }
                if (typeof data.mcqsSolved === 'number') {
                  setSolvedMcqsCount(data.mcqsSolved);
                  localStorage.setItem('examprep_mcqsSolved', String(data.mcqsSolved));
                }
                if (Array.isArray(data.testResults)) {
                  setTestHistory(data.testResults);
                  localStorage.setItem('examprep_testResults', JSON.stringify(data.testResults));
                }
                if (Array.isArray(data.typingResults)) {
                  setTypingResults(data.typingResults);
                  localStorage.setItem('examprep_typingResults', JSON.stringify(data.typingResults));
                }
                if (Array.isArray(data.bookmarks)) {
                  setBookmarks(data.bookmarks);
                  localStorage.setItem('examprep_bookmarks', JSON.stringify(data.bookmarks));
                }
                if (data.selectedExam) {
                  setActiveExamId(data.selectedExam);
                  localStorage.setItem('examprep_selectedExam', data.selectedExam);
                  setShowFirstTimeExamSelector(false);
                }
                if (data.mobile) {
                  setUserMobile(data.mobile);
                  localStorage.setItem('examprep_userMobile', data.mobile);
                }
                if (data.plan) setUserPlan(data.plan);
                if (data.topicProgress && typeof data.topicProgress === 'object') {
                  setTopicProgress(prev => ({ ...prev, ...data.topicProgress }));
                }
                const todayKey = new Date().toISOString().split('T')[0];
                if (data.readArticlesToday && Array.isArray(data.readArticlesToday)) {
                  localStorage.setItem(`cg_read_articles_${todayKey}`, JSON.stringify(data.readArticlesToday));
                }
                if (data.completedTasksToday && typeof data.completedTasksToday === 'object') {
                  if (data.completedTasksToday.completedTopic) {
                    localStorage.setItem(`cg_topic_completed_${todayKey}`, 'true');
                  }
                  if (data.completedTasksToday.revisedTopic) {
                    localStorage.setItem(`cg_topic_revised_${todayKey}`, 'true');
                  }
                }
                if (Array.isArray(data.savedNews)) {
                  localStorage.setItem('cg_saved_articles', JSON.stringify(data.savedNews));
                }
                if (Array.isArray(data.savedJobs)) {
                  localStorage.setItem('cg_saved_jobs', JSON.stringify(data.savedJobs));
                }
                if (data.testProgress && typeof data.testProgress === 'object') {
                  localStorage.setItem('examprep_test_progress', JSON.stringify(data.testProgress));
                }
                if (data.appLanguage) {
                  setAppLanguage(data.appLanguage);
                  localStorage.setItem('cg_lang', data.appLanguage);
                }
                if (data.theme) {
                  setTheme(data.theme);
                  localStorage.setItem('cg_theme', data.theme);
                }
              }
            }
          },
          (err: any) => console.warn('[Realtime User Sync Listener Error]:', err)
        );

        // 2. Real-time Topic Mastery Listener across devices
        unsubscribeTopicMastery = db.collection('topic_mastery')
          .where('userId', '==', currentUser.uid)
          .onSnapshot(
            (snap: any) => {
              if (snap && !snap.empty) {
                setTopicProgress(prev => {
                  const updatedMap = { ...prev };
                  snap.docs.forEach((d: any) => {
                    const m = d.data();
                    if (m && m.topicId) {
                      const existing = updatedMap[m.topicId] || {};
                      const isDone = existing.status === 'Completed' || existing.status === 'Revised';
                      updatedMap[m.topicId] = {
                        ...existing,
                        topicId: m.topicId,
                        status: isDone ? existing.status : (m.status || existing.status || 'Not Started'),
                        notesRead: (m.notesReadCount || 0) > 0 || existing.notesRead,
                        mcqCompleted: (m.totalMcqsAttempted || 0) > 0 || existing.mcqCompleted,
                        videoWatched: (m.videosWatchedCount || 0) > 0 || existing.videoWatched,
                        accuracy: m.accuracy || existing.accuracy || 0,
                        revisionCount: Math.max(m.revisionCount || 0, existing.revisionCount || 0),
                        lastStudied: existing.lastStudied || (m.lastUpdated ? (typeof m.lastUpdated === 'string' ? m.lastUpdated : (m.lastUpdated.seconds ? new Date(m.lastUpdated.seconds * 1000).toISOString() : '')) : '')
                      };
                    }
                  });
                  return updatedMap;
                });
              }
            },
            (err: any) => console.warn('[Realtime Topic Mastery Listener Error]:', err)
          );

        return true;
      } catch (e) {
        console.warn('[Setup Realtime Sync Error]:', e);
        return false;
      }
    };

    if (!setupRealtimeSync()) {
      const timer = setTimeout(() => setupRealtimeSync(), 1500);
      return () => clearTimeout(timer);
    }

    return () => {
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      if (unsubscribeTopicMastery) unsubscribeTopicMastery();
    };
  }, [currentUser, isGuest]);

  // Fetch / Sync stats on Auth or activeExam change
  useEffect(() => {
    if (isGuest || !currentUser) {
      // Load fallback local storage tracker progress
      const localProgress = getProgressFromLocalStorage(activeExamId);
      setTopicProgress(localProgress.topicProgress);
      // Reset server analytics
      setServerAnalytics(null);
      setUserPlan('free');
      return;
    }

    const loadUserProfileAndProgress = async () => {
      try {
        const token = await currentUser.getIdToken();
        const headers = { 'Authorization': `Bearer ${token}` };

        // 1. Fetch user data (scores, history, streaks)
        const profileRes = await fetch(getApiUrl('/api/user/data'), { headers });
        let profileData: any = {};
        if (profileRes.ok) {
          profileData = await profileRes.json();
          setXp(profileData.points || 0);
          setStreak(profileData.streak?.count || 0);
          setStreakLastDate(profileData.streak?.lastDate || '');
          setSolvedMcqsCount(profileData.mcqsSolved || 0);
          setTestHistory(profileData.testResults || []);
          setTypingResults(profileData.typingResults || []);
          setUserMobile(profileData.mobile || '');
          if (profileData.readArticlesToday && Array.isArray(profileData.readArticlesToday)) {
            const todayKey = new Date().toISOString().split('T')[0];
            localStorage.setItem(`cg_read_articles_${todayKey}`, JSON.stringify(profileData.readArticlesToday));
          }
          if (profileData.completedTasksToday && typeof profileData.completedTasksToday === 'object') {
            const todayKey = new Date().toISOString().split('T')[0];
            if (profileData.completedTasksToday.completedTopic) {
              localStorage.setItem(`cg_topic_completed_${todayKey}`, 'true');
            }
            if (profileData.completedTasksToday.revisedTopic) {
              localStorage.setItem(`cg_topic_revised_${todayKey}`, 'true');
            }
          }
          if (profileData.topicProgress && typeof profileData.topicProgress === 'object') {
            setTopicProgress(prev => ({ ...profileData.topicProgress, ...prev }));
          }
          if (Array.isArray(profileData.bookmarks)) {
            setBookmarks(profileData.bookmarks);
          }
          if (Array.isArray(profileData.savedNews)) {
            localStorage.setItem('cg_saved_articles', JSON.stringify(profileData.savedNews));
          }
          if (Array.isArray(profileData.savedJobs)) {
            localStorage.setItem('cg_saved_jobs', JSON.stringify(profileData.savedJobs));
          }
          if (profileData.testProgress && typeof profileData.testProgress === 'object') {
            localStorage.setItem('examprep_test_progress', JSON.stringify(profileData.testProgress));
          }
          if (profileData.appLanguage) {
            setAppLanguage(profileData.appLanguage);
            localStorage.setItem('cg_lang', profileData.appLanguage);
          }
          if (profileData.theme) {
            setTheme(profileData.theme);
            localStorage.setItem('cg_theme', profileData.theme);
          }
          if (profileData.selectedExam) {
            setActiveExamId(profileData.selectedExam);
            setShowFirstTimeExamSelector(false);
          } else {
            if (!hasSelectedExamThisSession) {
              setShowFirstTimeExamSelector(true);
            }
          }
        }

        // Auto-sync display name and email if missing from the server
        if (!profileData.displayName || !profileData.email) {
          const syncBody: any = {
            displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Aspirant',
            email: currentUser.email || ''
          };
          // If this is a new profile (empty database record), sync current local state as fallback
          if (profileData.points === undefined) {
            syncBody.points = xp;
            syncBody.mcqsSolved = solvedMcqsCount;
            syncBody.streak = { count: streak, lastDate: streakLastDate };
          }
          
          await fetch(getApiUrl('/api/user/sync'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(syncBody)
          }).catch(err => console.warn('[Auto Sync] Failed:', err));
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

          // Merge server masteries safely
          if (data.masteries && Array.isArray(data.masteries)) {
            data.masteries.forEach((m: any) => {
              if (topicProgressMap[m.topicId]) {
                const existing = topicProgress[m.topicId] || {};
                const isDone = existing.status === 'Completed' || existing.status === 'Revised';
                topicProgressMap[m.topicId] = {
                  ...topicProgressMap[m.topicId],
                  ...existing,
                  status: isDone ? existing.status : (m.status || existing.status || 'Not Started'),
                  notesRead: (m.notesReadCount || 0) > 0 || existing.notesRead,
                  mcqCompleted: (m.totalMcqsAttempted || 0) > 0 || existing.mcqCompleted,
                  videoWatched: (m.videosWatchedCount || 0) > 0 || existing.videoWatched,
                  accuracy: m.accuracy || existing.accuracy || 0,
                  revisionCount: Math.max(m.revisionCount || 0, existing.revisionCount || 0),
                  lastStudied: existing.lastStudied || (m.lastUpdated ? (typeof m.lastUpdated === 'string' ? m.lastUpdated : (m.lastUpdated.seconds ? new Date(m.lastUpdated.seconds * 1000).toISOString() : '')) : '')
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

          setTopicProgress(prev => {
            const merged = { ...topicProgressMap, ...prev };
            saveProgressToLocalStorage({
              examId: activeExamId,
              streak: Math.round((data.metrics?.consistencyIndex || 50) / 10),
              lastActive: new Date().toISOString(),
              topicProgress: merged
            });
            return merged;
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
    localStorage.setItem('examprep_streak_last_date', streakLastDate);
  }, [streakLastDate]);

  useEffect(() => {
    localStorage.setItem('examprep_mcqsSolved', String(solvedMcqsCount));
  }, [solvedMcqsCount]);

  useEffect(() => {
    localStorage.setItem('examprep_testResults', JSON.stringify(testHistory));
  }, [testHistory]);

  useEffect(() => {
    localStorage.setItem('examprep_typingResults', JSON.stringify(typingResults));
  }, [typingResults]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const shuffleQuestionOptions = (question: any): Question => {
    if (!question || !question.options || !Array.isArray(question.options) || question.options.length === 0) {
      return question;
    }
    const originalCorrectOption = question.options[question.correctIndex];
    const shuffledOptions = [...question.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);
    return {
      ...question,
      options: shuffledOptions,
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : question.correctIndex
    };
  };

  const handleStartRandomPractice = async (modeType: 'quiz' | 'mock') => {
    try {
      // 1. Try to fetch available tests from server
      const res = await fetch(getApiUrl(`/api/tests?examId=${activeExamId}`));
      if (res.ok) {
        const allTests: any[] = await res.json();
        if (Array.isArray(allTests) && allTests.length > 0) {
          const matching = allTests.filter(t => 
            t.mode === modeType || (modeType === 'quiz' && t.mode !== 'mock')
          );
          if (matching.length > 0) {
            // Pick a random test from matching list
            const randomTest = matching[Math.floor(Math.random() * matching.length)];
            const detailRes = await fetch(getApiUrl(`/api/tests/${randomTest.id}`));
            if (detailRes.ok) {
              const detail = await detailRes.json();
              if (detail && Array.isArray(detail.questions) && detail.questions.length > 0) {
                const preparedQuestions = shuffleArray(detail.questions).map(q => shuffleQuestionOptions(q));
                const duration = detail.pattern?.durationMinutes || detail.durationMinutes || (modeType === 'mock' ? 120 : 15);
                startTestPractice(
                  preparedQuestions,
                  modeType,
                  detail.subject || (modeType === 'mock' ? `${activeExam?.name || 'Exam'} Full Mock Test` : 'Mixed Practice Quiz'),
                  duration,
                  `${modeType}_${randomTest.id}_${Date.now()}`
                );
                return;
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn('[Random Practice] Could not fetch server test list:', err);
    }

    // 2. Check offline downloaded tests for random question pools
    try {
      const storedOffline = localStorage.getItem('examprep_offline_tests_v1');
      if (storedOffline) {
        const offlineMap = JSON.parse(storedOffline);
        const offlineList = Object.values(offlineMap).filter((t: any) => t && Array.isArray(t.questions) && t.questions.length > 0);
        if (offlineList.length > 0) {
          const matchingOffline = offlineList.filter((t: any) => t.mode === modeType);
          const pool = matchingOffline.length > 0 ? matchingOffline : offlineList;
          const randomOffline: any = pool[Math.floor(Math.random() * pool.length)];
          const preparedQuestions = shuffleArray(randomOffline.questions).map(q => shuffleQuestionOptions(q));
          startTestPractice(
            preparedQuestions,
            modeType,
            randomOffline.subject || 'Offline Practice Test',
            randomOffline.pattern?.durationMinutes || randomOffline.durationMinutes || (modeType === 'mock' ? 120 : 15),
            `${modeType}_offline_${Date.now()}`
          );
          return;
        }
      }
    } catch (e) {
      console.warn('[Random Practice] Error reading offline storage:', e);
    }

    // 3. Fallback: Generate a randomized, option-shuffled test from MOCK_QUESTIONS
    const preparedPool = shuffleArray(MOCK_QUESTIONS).map(q => shuffleQuestionOptions(q));
    const count = modeType === 'quiz' ? Math.min(10, preparedPool.length) : preparedPool.length;
    const finalQuestions = preparedPool.slice(0, count);

    startTestPractice(
      finalQuestions,
      modeType,
      modeType === 'mock' 
        ? `${activeExam?.name || 'CGPSC'} Full Mock Test` 
        : `Mixed Subject Quiz (${new Date().toLocaleDateString('hi-IN')})`,
      modeType === 'mock' ? 120 : 15,
      `${modeType}_random_${Date.now()}`
    );
  };

  // Handle study trigger navigation parameter and testId check on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testId = params.get('testId');
    const pageParam = params.get('page');
    if (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')) {
      setActiveTab('admin');
      isMountTestChecked.current = true;
    } else if (testId) {
      setActiveTab('practice');
      const fetchAndStartTest = async () => {
        try {
          // 1. Built-in preset test IDs
          if (testId === 'cgpsc-daily-quiz' || testId === 'daily-quiz') {
            handleStartRandomPractice('quiz');
            return;
          }
          if (testId === 'cgpsc-mock-test' || testId === 'full-mock' || testId === 'mock') {
            handleStartRandomPractice('mock');
            return;
          }

          // 2. Check internal app offline storage first
          try {
            const rawOffline = localStorage.getItem('examprep_offline_tests_v1');
            if (rawOffline) {
              const offlineMap = JSON.parse(rawOffline);
              if (offlineMap[testId] && Array.isArray(offlineMap[testId].questions) && offlineMap[testId].questions.length > 0) {
                const offItem = offlineMap[testId];
                startTestPractice(
                  offItem.questions,
                  offItem.mode || 'quiz',
                  offItem.subject || 'Practice Test',
                  offItem.pattern?.durationMinutes || offItem.durationMinutes,
                  testId
                );
                return;
              }
            }
          } catch (_) {}

          // 3. Check shared tests cache
          try {
            const rawShared = localStorage.getItem('examprep_shared_tests_v1');
            if (rawShared) {
              const sharedMap = JSON.parse(rawShared);
              if (sharedMap[testId] && Array.isArray(sharedMap[testId].questions) && sharedMap[testId].questions.length > 0) {
                const sharedItem = sharedMap[testId];
                startTestPractice(
                  sharedItem.questions,
                  sharedItem.mode || 'quiz',
                  sharedItem.subject || 'Practice Test',
                  sharedItem.durationMinutes,
                  testId
                );
                return;
              }
            }
          } catch (_) {}

          // 4. Fetch from Server API
          const res = await fetch(getApiUrl(`/api/tests/${testId}`));
          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.questions) && data.questions.length > 0) {
              startTestPractice(
                data.questions, 
                data.mode || 'quiz', 
                data.subject || 'Practice Test',
                data.pattern?.durationMinutes || data.durationMinutes,
                testId
              );
              return;
            }
          }

          // 5. Fallback: launch test with MOCK_QUESTIONS so test ALWAYS opens
          startTestPractice(MOCK_QUESTIONS, 'quiz', 'CGPSC Practice Test', 30, testId);
        } catch (e) {
          console.error('[URL Param Test Loader Error]:', e);
          startTestPractice(MOCK_QUESTIONS, 'quiz', 'CGPSC Practice Test', 30, testId);
        } finally {
          isMountTestChecked.current = true;
        }
      };
      fetchAndStartTest();
    } else {
      if (pageParam === 'syllabus') {
        setActiveTab('syllabus');
      }
      isMountTestChecked.current = true;
    }
  }, []);

  // Helper to record a study activity and update the daily study streak
  const recordStudyActivity = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    if (streakLastDate === todayStr) {
      return { streak, streakLastDate };
    }

    let newStreak = streak;
    if (!streakLastDate) {
      newStreak = 1;
    } else {
      const [ly, lm, ld] = streakLastDate.split('-').map(Number);
      const lastDate = new Date(ly, lm - 1, ld);
      const currentDate = new Date(yyyy, today.getMonth(), today.getDate());
      
      const diffTime = currentDate.getTime() - lastDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak = streak + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    }

    setStreak(newStreak);
    setStreakLastDate(todayStr);
    return { streak: newStreak, streakLastDate: todayStr };
  };

  // Check for daily streak decay on load
  useEffect(() => {
    if (streakLastDate) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;

      if (streakLastDate !== todayStr) {
        const [ly, lm, ld] = streakLastDate.split('-').map(Number);
        const lastDate = new Date(ly, lm - 1, ld);
        const currentDate = new Date(yyyy, today.getMonth(), today.getDate());
        
        const diffTime = currentDate.getTime() - lastDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
          setStreak(0);
        }
      }
    }
  }, [streakLastDate]);

  const onToggleActivity = async (topicId: string, activityType: 'notesRead' | 'mcqCompleted' | 'videoWatched') => {
    const { streak: currentStreakVal } = recordStudyActivity();
    const todayKey = new Date().toISOString().split('T')[0];
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
        localStorage.setItem(`cg_topic_completed_${todayKey}`, 'true');
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
        streak: currentStreakVal,
        lastActive: new Date().toISOString(),
        topicProgress: nextState
      });

      // Async sync to server if logged in
      if (currentUser) {
        syncUserDataDirectly({ topicProgress: nextState });
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
    const { streak: currentStreakVal } = recordStudyActivity();
    const todayKey = new Date().toISOString().split('T')[0];
    localStorage.setItem(`cg_topic_completed_${todayKey}`, 'true');
    localStorage.setItem(`cg_topic_revised_${todayKey}`, 'true');

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
        streak: currentStreakVal,
        lastActive: new Date().toISOString(),
        topicProgress: nextState
      });

      // Async sync to server if logged in
      if (currentUser) {
        syncUserDataDirectly({ topicProgress: nextState });
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

  // Auto-submit when test duration expires (only for mock mode)
  useEffect(() => {
    if (isTestActive && (mode === 'mock' || mode === 'pyq') && !sessionCompleted && elapsedTime >= testDuration) {
      handleFinishSession();
    }
  }, [elapsedTime, isTestActive, mode, sessionCompleted, testDuration]);

  // Visited palette tracker
  useEffect(() => {
    if (visited.length > currentIndex) {
      const newVisited = [...visited];
      newVisited[currentIndex] = true;
      setVisited(newVisited);
    }
  }, [currentIndex, visited.length]);

  // Lock body scroll when workspace is active (testing)
  useEffect(() => {
    const isWActive = isTestActive && rulesAccepted;
    if (isWActive) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100dvh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, [isTestActive, rulesAccepted]);

  // Select option handler
  const handleSelectOption = (optIdx: number) => {
    if (sessionCompleted) return;
    if (feedbackEnabled && answers[currentIndex] !== null) return;

    const newAnswers = [...answers];
    if (newAnswers[currentIndex] === optIdx) {
      newAnswers[currentIndex] = null; // Toggle selection off
    } else {
      newAnswers[currentIndex] = optIdx;
    }
    setAnswers(newAnswers);

    if (activeTestId) {
      saveTestProgress(activeTestId, newAnswers, false);
    }
  };

  const handleReportQuestion = (question: Question) => {
    setReportingQuestion(question);
    setReportReason('');
    setReportModalOpen(true);
  };

  const handleReportQuestionSubmit = async () => {
    if (!reportingQuestion || !reportReason.trim()) return;
    setSubmittingReport(true);
    try {
      const token = currentUser ? await currentUser.getIdToken() : '';
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(getApiUrl('/api/user/report'), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          question: reportingQuestion,
          reason: reportReason
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit question report.');
      }

      alert(appLanguage === 'hi' ? 'रिपोर्ट सफलतापूर्वक दर्ज कर ली गई है।' : 'Question reported successfully.');
      setReportModalOpen(false);
      setReportReason('');
      setReportingQuestion(null);
    } catch (err: any) {
      alert(err.message || 'Error submitting report.');
    } finally {
      setSubmittingReport(false);
    }
  };

  const handleToggleBookmark = (question: Question) => {
    setBookmarks(prev => {
      const exists = prev.some(q => q.question === question.question || (question.id && q.id === question.id));
      const updated = exists 
        ? prev.filter(q => q.question !== question.question && (!question.id || q.id !== question.id))
        : [...prev, question];
      localStorage.setItem('examprep_bookmarks', JSON.stringify(updated));
      syncUserDataDirectly({ bookmarks: updated });
      return updated;
    });
  };

  const handleToggleReview = () => {
    if (sessionCompleted) return;
    const newMarked = [...markedForReview];
    newMarked[currentIndex] = !newMarked[currentIndex];
    setMarkedForReview(newMarked);
  };


  // Launch test session helper
  const startTestPractice = (
    testQuestions: Question[],
    testMode: 'quiz' | 'mock' | 'pyq',
    subject: string,
    durationMinutes?: number,
    testId?: string
  ) => {
    const effectiveTestId = testId || `test_${testMode}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setActiveTestId(effectiveTestId);
    setQuestions(testQuestions);
    setMode(testMode);
    setSubjectName(subject);
    setCurrentIndex(0);

    // Cache test data so anyone opening a shared link can start it
    try {
      const rawShared = localStorage.getItem('examprep_shared_tests_v1');
      const sharedMap = rawShared ? JSON.parse(rawShared) : {};
      sharedMap[effectiveTestId] = {
        id: effectiveTestId,
        questions: testQuestions,
        mode: testMode,
        subject: subject,
        durationMinutes: durationMinutes
      };
      localStorage.setItem('examprep_shared_tests_v1', JSON.stringify(sharedMap));
    } catch (_) {}

    // Load saved progress if resuming
    let initialAnswers = Array(testQuestions.length).fill(null);
    if (testId) {
      try {
        const stored = localStorage.getItem('examprep_test_progress');
        if (stored) {
          const progressMap = JSON.parse(stored);
          const saved = progressMap[testId];
          if (saved && !saved.completed && Array.isArray(saved.answers)) {
            if (saved.answers.length === testQuestions.length) {
              initialAnswers = saved.answers;
            }
          }
        }
      } catch (e) {
        console.error('[startTestPractice] Error loading saved progress:', e);
      }
    }
    setAnswers(initialAnswers);
    setMarkedForReview(Array(testQuestions.length).fill(false));
    setVisited(Array(testQuestions.length).fill(false));
    setElapsedTime(0);

    // Calculate dynamic test duration in seconds
    let durationSeconds = 30 * 60; // default 30 mins
    if (durationMinutes && durationMinutes > 0) {
      durationSeconds = durationMinutes * 60;
    } else if (testMode === 'quiz') {
      durationSeconds = 5 * 60; // 5 mins default for quiz
    } else if (testMode === 'mock' || testMode === 'pyq') {
      durationSeconds = 120 * 60; // 120 mins default for mock exam / PYQ
    }
    setTestDuration(durationSeconds);

    setSessionCompleted(false);
    setIsTestActive(true);
    setFeedbackEnabled(false);
    setRulesAccepted(true);
    setIsReviewMode(false);
  };

  // Review completed test helper
  const startTestReview = (savedQuestions: Question[], savedAnswers: (number | null)[], subject: string, testMode: 'quiz' | 'mock' | 'pyq') => {
    setQuestions(savedQuestions);
    setMode(testMode);
    setSubjectName(subject);
    setCurrentIndex(0);
    setAnswers(savedAnswers);
    setMarkedForReview(Array(savedQuestions.length).fill(false));
    setVisited(Array(savedQuestions.length).fill(true));
    setElapsedTime(0);
    setSessionCompleted(false);
    setFeedbackEnabled(true);
    setIsTestActive(true);
    setRulesAccepted(true);
    setIsReviewMode(true);
  };

  // Finish practice session and sync detailed analytics
  const handleFinishSession = async () => {
    setSessionCompleted(true);

    if (feedbackEnabled || isReviewMode) {
      return;
    }

    const { streak: currentStreakVal, streakLastDate: currentStreakDate } = recordStudyActivity();

    const correctCount = answers.filter((ans, idx) => ans !== null && ans === questions[idx].correctIndex).length;
    const wrongCount = answers.filter((ans, idx) => ans !== null && ans !== questions[idx].correctIndex).length;
    const skippedCount = questions.length - answers.filter(ans => ans !== null).length;

    const gainedXp = correctCount * 1 - wrongCount * 0.25;
    const newXp = Math.max(0, Math.round((xp + gainedXp) * 100) / 100);
    setXp(newXp);

    const newMcqsSolved = solvedMcqsCount + questions.length;
    setSolvedMcqsCount(newMcqsSolved);

    try {
      const todayKey = new Date().toISOString().split('T')[0];
      const attempted = correctCount + wrongCount;
      const prevSolved = Number(localStorage.getItem(`cg_qs_solved_${todayKey}`) || 0);
      localStorage.setItem(`cg_qs_solved_${todayKey}`, (prevSolved + attempted).toString());
    } catch (e) {
      console.warn(e);
    }

    const newRecord = {
      testId: activeTestId,
      subject: subjectName,
      exam: activeExamId,
      mode: mode,
      correct: correctCount,
      wrong: wrongCount,
      skipped: skippedCount,
      percent: Math.round((correctCount / questions.length) * 100),
      timestamp: new Date().toISOString(),
      questions: questions,
      userAnswers: answers
    };

    const newHistory = [newRecord, ...testHistory];
    setTestHistory(newHistory);

    if (activeTestId) {
      saveTestProgress(activeTestId, answers, true);
    }

    // Direct multi-device broadcast & server sync
    syncUserDataDirectly({
      points: newXp,
      mcqsSolved: newMcqsSolved,
      testResults: newHistory,
      streak: { count: currentStreakVal, lastDate: currentStreakDate }
    });

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
              count: currentStreakVal,
              lastDate: currentStreakDate
            },
            displayName: currentUser?.displayName || 'Aspirant',
            email: currentUser?.email || ''
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

  const saveTypingResults = async (
    netWpm: number,
    grossWpm: number,
    accuracy: number,
    correctChars: number,
    incorrectChars: number,
    language: string,
    duration: number,
    topicId: string,
    topicTitle: string
  ) => {
    const newResult = {
      date: new Date().toISOString(),
      topicId,
      topicTitle,
      language,
      duration,
      netWpm,
      grossWpm,
      accuracy,
      correctChars,
      incorrectChars
    };

    const newHistory = [...typingResults, newResult].slice(-100);
    setTypingResults(newHistory);

    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // 1. Client-side Firestore direct update
        const firebase = (window as any).firebase;
        if (firebase) {
          try {
            await firebase.firestore().collection('users').doc(currentUser.uid).set({
              typingResults: newHistory,
              updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
          } catch (fsErr) {
            console.warn('[Firestore Direct Save typingResults Failed]:', fsErr);
          }
        }

        // 2. Sync to express server database
        await fetch(getApiUrl('/api/user/sync'), {
          method: 'POST',
          headers,
          body: JSON.stringify({
            typingResults: newHistory
          })
        });
      } catch (err) {
        console.error('[Save Typing Results Error]:', err);
      }
    }
  };

  const handleSelectExam = (examId: string) => {
    setActiveExamId(examId);
    localStorage.setItem('examprep_selectedExam', examId);
    // Direct multi-device broadcast & server sync
    syncUserDataDirectly({ selectedExam: examId });
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

  const handleFirstTimeSelectExam = (examId: string) => {
    setHasSelectedExamThisSession(true);
    handleSelectExam(examId);
    setShowFirstTimeExamSelector(false);
  };

  const handleLogout = async () => {
    const firebase = (window as any).firebase;
    if (firebase) {
      try {
        await firebase.auth().signOut();
        clearSessionStates();
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
    (sum: number, sub: any) => sum + sub.chapters.reduce((s: number, chap: any) => s + chap.topics.length, 0), 0
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
            testHistory={testHistory}
            activeExam={activeExam}
            exams={visibleExams}
            onSelectExam={handleSelectExam}
            onNavigateToTab={(tabId) => setActiveTab(tabId as any)}
            onStartPracticeMode={(modeType) => {
              if (modeType === 'quiz' || modeType === 'mock') {
                handleStartRandomPractice(modeType);
              } else {
                setActiveTab('practice');
              }
            }}
            topicProgress={topicProgress}
            tabVisibility={tabVisibility}
            currentUser={currentUser}
            getApiUrl={getApiUrl}
            onSelectArticle={(art) => {
              setInitialSelectedArticle(art);
              setActiveTab('news');
            }}
          />
        );
      case 'practice':
        return (
          <PracticeTab
            activeExam={activeExam}
            onStartPracticeSession={startTestPractice}
            bookmarkedQuestions={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            testHistory={testHistory}
            tabVisibility={tabVisibility}
          />
        );
      case 'typing':
        return (
          <TypingTest currentUser={currentUser} onSaveResults={saveTypingResults} />
        );
      case 'chat':
        return <AiTutorTab activeExam={activeExam} />;
      case 'news':
        return (
          <NewsTab
            currentUser={currentUser}
            initialArticle={initialSelectedArticle}
            onClearInitialArticle={() => setInitialSelectedArticle(null)}
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
      case 'jobs':
        return <JobsTab currentUser={currentUser} />;
      case 'profile':
        return (
          <ProfileTab
            currentUser={currentUser}
            userName={currentUser?.displayName || 'Guest User'}
            userEmail={currentUser?.email || 'guest@studyworld.app'}
            userPlan={userPlan}
            streak={streak}
            xp={xp}
            testsGivenCount={testHistory.length}
            solvedMcqsCount={solvedMcqsCount}
            activeExam={activeExam}
            topicProgress={topicProgress}
            testHistory={testHistory}
            typingResults={typingResults}
            serverAnalytics={serverAnalytics}
            isAdmin={isAdmin}
            onOpenAdmin={() => setActiveTab('admin')}
            isStaff={isStaff}
            onOpenStaff={() => setActiveTab('staff')}
            onNavigateToTab={(tabId) => setActiveTab(tabId as any)}
            onReviewTest={startTestReview}
            rankingData={rankingData}
            tabVisibility={tabVisibility}
            onVisitProfile={(uid) => {
              setSelectedProfileUid(uid);
              setPublicProfileOpen(true);
            }}
          />
        );
      case 'admin':
        if (!isAdmin) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen text-text bg-bg-s1 p-6">
              <ShieldAlert className="w-12 h-12 text-redL mb-4" />
              <h2 className="text-lg font-black text-text uppercase tracking-wider">Access Denied</h2>
              <p className="text-xs text-text-muted mt-2 max-w-sm text-center">
                This console is reserved for system administrators only.
              </p>
              <button
                onClick={() => setActiveTab('home')}
                className="mt-6 px-4 py-2 bg-saffron text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          );
        }
        return (
          <AdminDashboard
            currentUser={currentUser}
            onGoBack={() => setActiveTab('profile')}
            exams={exams}
            onRefreshExams={fetchCustomSyllabi}
          />
        );
      case 'staff':
        if (!isStaff) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen text-text bg-bg-s1 p-6">
              <ShieldAlert className="w-12 h-12 text-redL mb-4" />
              <h2 className="text-lg font-black text-text uppercase tracking-wider">Access Denied</h2>
              <p className="text-xs text-text-muted mt-2 max-w-sm text-center">
                This console is reserved for staff members only.
              </p>
              <button
                onClick={() => setActiveTab('home')}
                className="mt-6 px-4 py-2 bg-saffron text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          );
        }
        return (
          <StaffDashboard
            currentUser={currentUser}
            roles={staffRoles}
            onGoBack={() => setActiveTab('profile')}
            exams={exams}
            onRefreshExams={fetchCustomSyllabi}
          />
        );
      case 'syllabus':
        return (
          <SyllabusPage
            exams={visibleExams}
            activeExamId={activeExamId}
            onSelectExam={handleSelectExam}
            tabVisibility={tabVisibility}
            targetExamDate={activeExamTargetDate}
            onTargetDateChange={(dateStr) => {
              localStorage.setItem('examprep_target_date_' + activeExamId, dateStr);
              setActiveExamTargetDate(dateStr);
            }}
            topicProgress={topicProgress}
            serverAnalytics={serverAnalytics}
            onToggleActivity={onToggleActivity}
            onMarkRevised={onMarkRevised}
            streak={streak}
            onStartPractice={(subject, _topicId) => {
              // Find matching questions or fallback
              const filtered = MOCK_QUESTIONS.filter(q => q.subject?.includes(subject) || q.explanation?.includes(subject));
              const testSubjectId = `syllabus-${encodeURIComponent(subject)}`;
              startTestPractice(
                filtered.length > 0 ? filtered : MOCK_QUESTIONS.slice(0, 3),
                'quiz',
                `${subject} MCQ Practice`,
                15,
                testSubjectId
              );
            }}
            onGoBack={() => setActiveTab('home')}
          />
        );
      default:
        return null;
    }
  };

  const isWorkspaceActive = isTestActive && rulesAccepted;

  return (
    <div className="min-h-screen bg-bg-s0 text-text flex flex-col md:flex-row items-stretch select-none font-sans overflow-x-hidden relative">
      
      {/* Desktop Left Sidebar Navigation */}
      {!isTestActive && activeTab !== 'admin' && activeTab !== 'staff' && (
        <aside className="hidden md:flex flex-col w-64 bg-bg-s2 border-r border-border/60 shrink-0 fixed top-0 left-0 h-screen z-30">
          {/* Logo & Brand + Desktop Notification Bell */}
          <div className="p-6 border-b border-border/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-7 h-7 text-saffron" />
              <span className="text-base font-black bg-gradient-to-r from-saffron to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                CG Guru
              </span>
            </div>
            {/* Desktop Quick Notification Bell (Always accessible) */}
            <button
              onClick={() => setNotificationsModalOpen(true)}
              className={`p-2 rounded-xl border transition-all cursor-pointer relative ${
                unreadNotificationsCount > 0
                  ? 'bg-saffron/15 border-saffron text-saffron shadow-lg ring-2 ring-saffron/30'
                  : 'bg-bg-s3/60 border-border text-text-muted hover:text-text hover:border-saffron-border/50'
              }`}
              title="Notifications & Announcements"
            >
              <Bell className={`w-4 h-4 text-saffron ${unreadNotificationsCount > 0 ? 'animate-bounce' : ''}`} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg animate-pulse ring-2 ring-bg-s2">
                  {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'practice', label: 'Tests', icon: Trophy },
              { id: 'typing', label: 'Typing Test', icon: Keyboard },
              { id: 'chat', label: 'AI Guru', icon: MessageSquare },
              { id: 'news', label: 'News', icon: Newspaper },
              { id: 'jobs', label: 'Jobs', icon: Briefcase },
              { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
              { id: 'profile', label: 'Profile', icon: User }
            ].filter(item => tabVisibility[item.id] !== false).map(item => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id || (item.id === 'home' && activeTab === 'syllabus');
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-wider cursor-pointer ${
                    isSelected 
                      ? 'bg-saffron text-bg-s1 font-black shadow-md' 
                      : 'text-text-muted hover:text-text hover:bg-bg-s3/55'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Admin Panel Option */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-wider cursor-pointer mt-4 border border-redL/30 text-redL hover:bg-redL/5"
              >
                <Settings className="w-4.5 h-4.5" />
                <span>Admin Panel</span>
              </button>
            )}

            {/* Staff Panel Option */}
            {isStaff && (
              <button
                onClick={() => setActiveTab('staff')}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-wider cursor-pointer mt-4 border border-saffron-border/30 text-saffron hover:bg-saffron/5"
              >
                <Shield className="w-4.5 h-4.5" />
                <span>Staff Panel</span>
              </button>
            )}
          </div>

          {/* Sidebar Bottom Profile/Settings */}
          <div className="p-4 border-t border-border/60 bg-bg-s3/40 flex flex-col gap-3">
            {currentUser || isGuest ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-saffron hover:bg-orange-500 rounded-full flex items-center justify-center font-black text-bg-s1 select-none shadow">
                  {((currentUser?.displayName || 'Guest User')[0]).toUpperCase()}
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <span className="text-xs font-bold text-text truncate">
                    {currentUser?.displayName || 'Guest User'}
                  </span>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500/10" />
                    <span>{streak} Streak • {xp} XP</span>
                  </span>
                </div>
                <button
                  onClick={() => setNotificationsModalOpen(true)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer relative ${
                    unreadNotificationsCount > 0
                      ? 'bg-saffron/15 border-saffron text-saffron shadow-sm'
                      : 'bg-bg-s2 border-border text-text-muted hover:text-text hover:border-saffron-border/50'
                  }`}
                  title="Notifications & Announcements"
                >
                  <Bell className={`w-4 h-4 text-saffron ${unreadNotificationsCount > 0 ? 'animate-bounce' : ''}`} />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white text-[8.5px] font-black rounded-full flex items-center justify-center shadow">
                      {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSettingsModalOpen(true)}
                  className="p-1.5 rounded-lg bg-bg-s2 border border-border text-text-muted hover:text-text cursor-pointer hover:border-saffron-border/50 transition-colors"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-full py-2.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-all text-center"
              >
                Sign In
              </button>
            )}
          </div>
        </aside>
      )}

      {/* Main Content Area Container */}
      <div className={`flex-1 flex flex-col bg-bg-s1 relative transition-all duration-300 ${
        activeTab === 'chat' 
          ? 'h-[100dvh] md:h-screen overflow-hidden' 
          : 'min-h-screen'
      } ${!isTestActive && activeTab !== 'admin' && activeTab !== 'staff' ? 'pb-16 md:pb-0 md:pl-64' : 'pb-0'}`}>
        
        {/* Mobile Sticky Top Header (Shown if test workspace is NOT active, hidden on desktop) */}
        {!isTestActive && activeTab !== 'admin' && activeTab !== 'staff' && (
          <header className="md:hidden sticky top-0 left-0 right-0 bg-bg-s1/90 backdrop-blur-md border-b border-border/60 px-5 py-4 flex items-center justify-between z-30 shadow-sm shrink-0">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-saffron" />
              <span className="text-sm font-black bg-gradient-to-r from-saffron to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                CG Guru
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* App Download Button right next to Notification Bell */}
              <button 
                onClick={handleDownloadApp}
                className="px-2 py-1.5 rounded-lg bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron text-bg-s1 font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm cursor-pointer transition-all active:scale-[0.96]"
                title="Download App / Install PWA"
              >
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                <span className="font-extrabold text-[10px]">App</span>
                <Download className="w-3 h-3 shrink-0" />
              </button>

              <button 
                onClick={() => setNotificationsModalOpen(true)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer relative ${
                  unreadNotificationsCount > 0
                    ? 'bg-saffron/20 border-saffron text-saffron shadow-md ring-2 ring-saffron/30'
                    : 'bg-bg-s2 border-border text-text-muted hover:text-text hover:border-saffron-border/50'
                }`}
                title="Notifications & Announcements"
              >
                <Bell className={`w-4 h-4 text-saffron ${unreadNotificationsCount > 0 ? 'animate-bounce' : ''}`} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-0.5 bg-red-500 text-white text-[8.5px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse ring-1 ring-bg-s1">
                    {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                  </span>
                )}
              </button>
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
        <main className={`flex-1 flex flex-col min-h-0 ${
          isWorkspaceActive
            ? 'h-[100dvh] max-h-[100dvh] overflow-hidden w-full p-0 gap-0'
            : (activeTab === 'chat' ? 'h-full max-h-full overflow-hidden ' : 'overflow-y-auto ') + 
              (activeTab === 'admin' || activeTab === 'staff' 
                ? 'px-4 py-4 md:px-8 gap-4 w-full' 
                : 'w-full max-w-lg md:max-w-7xl md:px-8 mx-auto border-x border-border/40 px-4 py-4 gap-4')
        }`}>
          {/* 1-Tap Notification Permission Banner if permission not granted yet */}
          {notificationPermissionNeeded && !isTestActive && (
            <div className="w-full bg-gradient-to-r from-amber-500/15 via-saffron/15 to-orange-500/15 border border-saffron-border/60 rounded-xl p-3 mb-2 flex items-center justify-between gap-3 text-xs shadow-sm animate-fade-in">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-saffron/20 flex items-center justify-center shrink-0 text-saffron">
                  <BellRing className="w-4 h-4 animate-bounce" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-text text-xs leading-tight">
                    {appLanguage === 'hi' ? 'परीक्षा और जॉब अलर्ट्स चालू करें' : 'Enable Exam & Job Alerts'}
                  </p>
                  <p className="text-[11px] text-text-muted truncate">
                    {appLanguage === 'hi' ? 'ऐप बंद रहने पर भी नए नोटिफिकेशन और लास्ट डेट अलर्ट प्राप्त करें' : 'Get instant alerts even when the app is closed'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={async () => {
                    const granted = await requestPushNotificationPermission();
                    if (granted) {
                      setNotificationPermissionNeeded(false);
                      ensureNotificationChannel();
                      scheduleRecurringReminders();
                    } else {
                      setNotificationPermissionNeeded(false);
                    }
                  }}
                  className="px-3 py-1.5 bg-saffron hover:bg-orange-500 text-bg-s1 font-black text-xs rounded-lg uppercase tracking-wider transition-all shadow cursor-pointer active:scale-95"
                >
                  {appLanguage === 'hi' ? 'चालू करें' : 'Enable'}
                </button>
                <button
                  onClick={() => setNotificationPermissionNeeded(false)}
                  className="p-1 rounded text-text-muted hover:text-text cursor-pointer"
                  title="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Floating In-App Alert for Latest Unread Notification */}
          {latestNotificationAlert && !isTestActive && (
            <div className="w-full bg-gradient-to-r from-bg-s2 via-bg-s3 to-bg-s2 border border-saffron-border rounded-xl p-3 mb-3 flex items-center justify-between gap-3 text-xs shadow-md animate-fade-in">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-saffron/20 flex items-center justify-center shrink-0 text-saffron">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-text text-xs leading-tight truncate">
                    {latestNotificationAlert.title || '📢 New Notification'}
                  </p>
                  <p className="text-[11px] text-text-muted truncate">
                    {latestNotificationAlert.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    setNotificationsModalOpen(true);
                    sessionStorage.setItem('cgguru_dismissed_toast', latestNotificationAlert.id);
                    setLatestNotificationAlert(null);
                  }}
                  className="px-2.5 py-1 bg-saffron-dim/25 hover:bg-saffron text-saffron hover:text-bg-s1 font-bold text-xs rounded-md transition-all border border-saffron-border cursor-pointer"
                >
                  {appLanguage === 'hi' ? 'देखें' : 'View'}
                </button>
                <button
                  onClick={() => {
                    sessionStorage.setItem('cgguru_dismissed_toast', latestNotificationAlert.id);
                    setLatestNotificationAlert(null);
                  }}
                  className="p-1 rounded text-text-muted hover:text-text cursor-pointer"
                  title="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isTestActive ? (
              /* Tab layout panels wrapper */
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <Suspense fallback={<TabFallback />}>
                  {renderTabContent()}
                </Suspense>
              </motion.div>
            ) : (
              /* CBT Practice Workspace (Full screen overlay style) */
              !rulesAccepted ? (
                /* Rules Acceptance Screen */
                <motion.div
                  key="rules-screen"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-md w-full mx-auto my-8 p-6 bg-gradient-to-br from-bg-s2 to-bg-s1 border border-saffron-border/30 rounded-2xl shadow-2xl flex flex-col gap-6 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="w-12 h-12 bg-saffron-dim/20 rounded-full flex items-center justify-center mx-auto text-saffron shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-base font-black text-text uppercase tracking-wider">
                    {appLanguage === 'hi' ? 'परीक्षा निर्देश' : 'Test Instructions'}
                  </h2>
                  
                  <div className="flex flex-col gap-4 text-left bg-bg-s3/55 border border-border p-4 rounded-xl text-xs text-text-muted leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="text-saffron">•</span>
                      <p>
                        {appLanguage === 'hi' ? (
                          <>
                            <strong className="text-text">XP रिवॉर्ड सिस्टम:</strong> प्रत्येक सही उत्तर के लिए <strong className="text-saffron">+1 XP</strong> दिया जाएगा, और प्रत्येक गलत उत्तर के लिए <strong className="text-redL">-0.25 XP</strong> काट लिया जाएगा। छोड़े गए प्रश्नों के लिए 0 XP मिलेगा।
                          </>
                        ) : (
                          <>
                            <strong className="text-text">XP Reward System:</strong> Each correct answer awards <strong className="text-saffron">+1 XP</strong>, and each incorrect answer deducts <strong className="text-redL">-0.25 XP</strong>. Skipped questions award 0 XP.
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-saffron">•</span>
                      <p>
                        {appLanguage === 'hi' ? (
                          <>
                            <strong className="text-text">लचीला उत्तर चयन:</strong> आप सबमिट करने से पहले किसी भी समय अपने चुने हुए विकल्पों को चुन सकते हैं, हटा सकते हैं या बदल सकते हैं।
                          </>
                        ) : (
                          <>
                            <strong className="text-text">Flexible Answering:</strong> You can select, clear, or change your selected options at any point before submitting.
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-saffron">•</span>
                      <p>
                        {appLanguage === 'hi' ? (
                          <>
                            <strong className="text-text">सबमिट के बाद समीक्षा:</strong> जब आप टेस्ट सबमिट करेंगे और "Retake Session" पर क्लिक करेंगे, या अपने प्रोफाइल इतिहास से, पूर्ण समाधान और स्पष्टीकरण अनलॉक हो जाएंगे।
                          </>
                        ) : (
                          <>
                            <strong className="text-text">Post-Submit Review:</strong> Complete solutions and explanations will be unlocked once you submit the test and click "Retake Session", or from your profile history.
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setRulesAccepted(true)}
                      className="w-full py-3.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-all active:scale-[0.98] shadow-md"
                    >
                      {appLanguage === 'hi' ? 'सहमत हूँ और शुरू करें' : 'Agree & Start'}
                    </button>
                    <button
                      onClick={() => setIsTestActive(false)}
                      className="w-full py-3.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-xs font-black uppercase text-text rounded-lg cursor-pointer transition-all"
                    >
                      {appLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="quiz-workspace"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col gap-0 flex-1 min-h-0 overflow-hidden relative"
                >
                {/* CBT Header */}
                <PracticeHeader
                  subjectName={subjectName}
                  currentIndex={currentIndex}
                  totalQuestions={questions.length}
                  elapsedTime={elapsedTime}
                  testDuration={testDuration}
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
                  floatingXp={null}
                />

                {/* Workspace Cards */}
                <div className="flex-1 px-4 py-3 flex flex-col gap-4 overflow-y-auto">
                  {!sessionCompleted ? (
                    <div className="flex flex-col gap-4">
                      {/* MCQ Card */}
                      <MCQCard
                        question={questions[currentIndex]}
                        index={currentIndex}
                        isBookmarked={bookmarks.some(q => q.question === questions[currentIndex].question || (questions[currentIndex].id && q.id === questions[currentIndex].id))}
                        onToggleBookmark={() => handleToggleBookmark(questions[currentIndex])}
                        onReport={() => handleReportQuestion(questions[currentIndex])}
                      />

                      {/* Options selection */}
                      <OptionList
                        options={questions[currentIndex].options}
                        correctIndex={questions[currentIndex].correctIndex}
                        selectedIndex={answers[currentIndex]}
                        answered={answers[currentIndex] !== null}
                        onSelectOption={handleSelectOption}
                        showFeedback={feedbackEnabled}
                      />



                      {/* AI explanation and tutor prompt cards */}
                      <AnimatePresence>
                        {answers[currentIndex] !== null && feedbackEnabled && (
                          <ExplanationCard
                            question={questions[currentIndex]}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    /* Final session scorecard summary panel */
                    <div className="flex flex-col gap-5 py-2">
                      <div className="text-center flex flex-col items-center justify-center p-5 bg-bg-s1 border border-saffron-border/30 rounded-lg relative overflow-hidden">
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
                      <div className="flex gap-3 mt-1.5 shrink-0 flex-wrap sm:flex-nowrap">
                        <button
                          onClick={() => {
                            const clearedAnswers = Array(questions.length).fill(null);
                            setAnswers(clearedAnswers);
                            if (activeTestId) {
                              saveTestProgress(activeTestId, clearedAnswers, false);
                            }
                            setMarkedForReview(Array(questions.length).fill(false));
                            setVisited(Array(questions.length).fill(false));
                            setElapsedTime(0);
                            setCurrentIndex(0);
                            setSessionCompleted(false);
                            setFeedbackEnabled(true);
                          }}
                          className="flex-1 min-w-[130px] py-3.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-xs font-black uppercase text-text rounded-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                        >
                          <RotateCcw className="w-4 h-4 text-saffron" />
                          <span>Retake Session</span>
                        </button>
                        <button
                          onClick={async () => {
                            const correctCount = answers.filter((ans, idx) => ans !== null && ans === questions[idx].correctIndex).length;
                            const totalCount = questions.length;
                            const pct = Math.round((correctCount / totalCount) * 100);
                            const shareText = `🎯 CG Guru Practice Test Score:\nSubject: ${subjectName}\nScore: ${correctCount}/${totalCount} (${pct}% Accuracy)\nTime Taken: ${Math.floor(elapsedTime / 60)}m ${elapsedTime % 60}s\n\nPractice mock tests on CG Guru!`;
                            
                            const shareUrl = activeTestId
                              ? `${window.location.origin}${window.location.pathname}?tab=practice&testId=${encodeURIComponent(activeTestId)}`
                              : window.location.href;
                            
                            try {
                              if (navigator.share) {
                                await navigator.share({
                                  title: 'CG Guru Practice Test Score',
                                  text: shareText,
                                  url: shareUrl
                                });
                              } else {
                                await navigator.clipboard.writeText(shareText + '\n' + shareUrl);
                                alert('Scorecard copied to clipboard! 📋');
                              }
                            } catch (e) {
                              console.warn('Share error:', e);
                            }
                          }}
                          className="flex-1 min-w-[130px] py-3.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-black uppercase text-emerald-400 rounded-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                          title="Share Scorecard"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share Score</span>
                        </button>
                        <button
                          onClick={() => setIsTestActive(false)}
                          className="flex-1 min-w-[130px] py-3.5 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
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
                    <div className="flex items-center gap-2">
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

                      {answers[currentIndex] !== null && (!feedbackEnabled || !sessionCompleted) && (
                        <button
                          onClick={() => handleSelectOption(answers[currentIndex]!)}
                          className="px-3 py-2 text-xs font-bold rounded border bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted hover:text-text transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                        >
                          <span>Clear</span>
                        </button>
                      )}
                    </div>

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
                          onClick={isReviewMode ? () => setIsTestActive(false) : handleFinishSession}
                          className="px-4 py-2.5 bg-greenL hover:bg-green-600 text-xs font-black text-bg-s1 uppercase rounded flex items-center gap-1.5 cursor-pointer transition-all animate-pulse"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{isReviewMode ? 'Exit Review' : 'Submit Quiz'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
             )
            )}
          </AnimatePresence>
        </main>

        {/* Mobile Fixed Bottom Navigation Bar (Hidden on desktop) */}
        {!isTestActive && activeTab !== 'admin' && activeTab !== 'staff' && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-bg-s2/95 backdrop-blur-md border-t border-border px-3 py-2 flex items-center justify-around z-30 shadow-2xl shrink-0">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'practice', label: 'Tests', icon: Trophy },
              { id: 'chat', label: 'AI Guru', icon: MessageSquare },
              { id: 'news', label: 'News', icon: Newspaper },
              { id: 'jobs', label: 'Jobs', icon: Briefcase },
              { id: 'profile', label: 'Profile', icon: User }
            ].filter(tab => tabVisibility[tab.id] !== false).map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id || (tab.id === 'home' && activeTab === 'syllabus');
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
                    isSelected ? 'text-saffron font-black' : 'text-text-muted hover:text-text'
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

        {/* Notifications & Announcements Drawer Overlay */}
        <NotificationsModal
          isOpen={notificationsModalOpen}
          onClose={() => setNotificationsModalOpen(false)}
          onNavigateTab={(tab) => setActiveTab(tab as any)}
          onReadCountChange={(cnt) => setUnreadNotificationsCount(cnt)}
        />

        {/* Global Settings Modal Overlay */}
        <SettingsModal
          isOpen={settingsModalOpen}
          onClose={() => setSettingsModalOpen(false)}
          activeExamName={activeExam?.name}
          onChangeExam={() => setActiveTab('home')}
          language={appLanguage}
          onLanguageChange={setAppLanguage}
          theme={theme}
          onThemeChange={setTheme}
          onLogout={handleLogout}
          onClearProgress={handleClearProgress}
          userMobile={userMobile}
          onMobileChange={(mobile) => {
            setUserMobile(mobile);
            localStorage.setItem('examprep_userMobile', mobile);
          }}
          getApiUrl={getApiUrl}
          targetExamDate={activeExamTargetDate}
          onTargetDateChange={(dateStr) => {
            localStorage.setItem('examprep_target_date_' + activeExamId, dateStr);
            setActiveExamTargetDate(dateStr);
          }}
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

        {/* Question Error Reporting Modal Overlay */}
        <AnimatePresence>
          {reportModalOpen && reportingQuestion && (
            <div className="fixed inset-0 bg-bg-s0/90 backdrop-blur-md z-[99999] flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/10 border border-red-500/25 rounded-lg flex items-center justify-center text-redL shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-text">
                      {appLanguage === 'hi' ? 'प्रश्न समीक्षा / रिपोर्ट त्रुटि' : 'Report Error / Request Review'}
                    </h3>
                    <p className="text-[10px] text-text-muted font-bold tracking-wide mt-0.5">
                      {appLanguage === 'hi' ? 'प्रशासक को प्रश्न में पाई गई त्रुटि बताएं' : 'Submit feedback to the admin regarding this question'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2 bg-bg-s3/40 border border-border/80 p-3.5 rounded-lg text-xs leading-relaxed text-text">
                  <span className="text-[9px] font-black uppercase text-saffron tracking-wider select-none">
                    {appLanguage === 'hi' ? 'प्रश्न:' : 'Question:'}
                  </span>
                  <p className="line-clamp-3 font-semibold text-text-muted">
                    {reportingQuestion.question ? stripAssertionReason(reportingQuestion.question).trim().slice(0, 150) + '...' : ''}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase text-text-muted tracking-wider">
                    {appLanguage === 'hi' ? 'त्रुटि विवरण / समीक्षा का कारण' : 'Specify Error / Reason for review'}
                  </label>
                  <textarea
                    rows={4}
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder={appLanguage === 'hi' ? 'कृपया त्रुटि विवरण दर्ज करें (जैसे: उत्तर गलत है, गलत अनुवाद)...' : 'Write details of the error (e.g. incorrect key, bad translations)...'}
                    className="w-full bg-bg-s3/70 border border-border focus:border-saffron focus:ring-1 focus:ring-saffron/20 p-3 rounded-lg outline-none text-xs text-text placeholder:text-text-muted font-bold resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={handleReportQuestionSubmit}
                    disabled={submittingReport || !reportReason.trim()}
                    className="flex-1 py-2.5 bg-saffron hover:bg-orange-500 disabled:opacity-50 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-all text-center flex items-center justify-center gap-1.5 shadow"
                  >
                    {submittingReport ? (
                      <span className="w-3.5 h-3.5 border-2 border-bg-s1 border-t-transparent rounded-full animate-spin" />
                    ) : null}
                    <span>{appLanguage === 'hi' ? 'जमा करें' : 'Submit'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setReportModalOpen(false);
                      setReportingQuestion(null);
                      setReportReason('');
                    }}
                    disabled={submittingReport}
                    className="flex-1 py-2.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-xs font-black uppercase text-text rounded-lg cursor-pointer transition-all text-center"
                  >
                    {appLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Public Profile Modal for Leaderboard users */}
        {selectedProfileUid && (
          <Suspense fallback={null}>
            <PublicProfileModal
              isOpen={publicProfileOpen}
              onClose={() => {
                setPublicProfileOpen(false);
                setSelectedProfileUid(null);
              }}
              uid={selectedProfileUid}
              currentUser={currentUser}
              getApiUrl={getApiUrl}
            />
          </Suspense>
        )}

        {/* First-Time Exam Selector Modal for New Users */}
        <AnimatePresence>
          {showFirstTimeExamSelector && (
            <div className="fixed inset-0 bg-bg-s0/90 backdrop-blur-md flex items-center justify-center p-4 z-[99999] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl overflow-hidden"
              >
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-saffron to-orange-600 p-6 text-center text-bg-s1 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 text-bg-s1 select-none animate-bounce shadow-inner">
                    <Landmark className="w-7 h-7" />
                  </div>
                  <h2 className="text-lg font-black uppercase tracking-wider">Choose Target Exam / लक्ष्य परीक्षा</h2>
                  <p className="text-[10px] font-bold opacity-90 mt-1">Select your goal to build your personalized study plan</p>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <p className="text-xs text-text-muted leading-relaxed text-center">
                    Welcome to <strong>CG Guru</strong>! Please select your primary target exam. This will configure your syllabus trackers, AI study schedules, and practice test papers.
                  </p>
                  
                  <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {visibleExams.map((ex: any) => (
                      <button
                        key={ex.id}
                        onClick={() => handleFirstTimeSelectExam(ex.id)}
                        className="w-full p-4 rounded-lg border border-border bg-bg-s3 hover:border-saffron hover:bg-saffron-dim/10 text-left transition-all flex items-center justify-between cursor-pointer group active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl select-none">{ex.icon}</span>
                          <div className="flex flex-col">
                            <span className="text-xs font-black leading-tight text-text group-hover:text-saffron transition-colors">
                              {ex.name}
                            </span>
                            <span className="text-[9px] text-text-muted mt-0.5 uppercase font-bold tracking-wider">
                              {ex.fullName || ex.name}
                            </span>
                            <span className="text-[8px] text-saffron font-bold mt-1 uppercase tracking-wider">
                              {ex.stage} • {ex.daysRemaining} days remaining
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-text-muted group-hover:text-saffron transition-colors font-black">➔</span>
                      </button>
                    ))}
                  </div>

                  <p className="text-[9px] text-text-muted leading-relaxed text-center border-t border-border/40 pt-3">
                    * You can change your target exam at any time from your settings panel.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
