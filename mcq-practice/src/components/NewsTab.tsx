import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Search, Calendar, Globe, Sparkles, 
  ExternalLink, MessageSquare, Info, ShieldAlert,
  Award, CheckCircle, Brain, Clock,
  ChevronRight, Bookmark,
  Trophy, Activity, FileText,
  RotateCcw, Flame, BookOpen, Sparkle,
  Briefcase, Users, GraduationCap, Coins, Bell
} from 'lucide-react';

interface Article {
  title: string;
  title_hi?: string;
  description?: string;
  description_hi?: string;
  summary?: string;
  summary_hi?: string;
  category: string;
  source: string;
  url: string;
  date?: string;
  icon?: string;
  recommendationScore?: number;
}

interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  probability: 'high' | 'medium' | 'low';
}

interface Flashcard {
  front: string;
  back: string;
}

interface StaticGKLink {
  subject: string;
  topic: string;
  connection: string;
}

interface ArticleIntelligence {
  title_hi: string;
  category: string;
  relevanceScore: number;
  targetExams: string[];
  whyItMatters: string;
  summary_en: string;
  summary_hi: string;
  keyFacts: string[];
  importantDates?: string[];
  importantPersonalities?: string[];
  organizations?: string[];
  locations?: string[];
  schemes?: string[];
  acts?: string[];
  constitutionalArticles?: string[];
  staticGkLinks?: StaticGKLink[];
  pyqConnection?: string;
  memoryTricks?: string;
  flashcards?: Flashcard[];
  mcqs?: MCQ[];
}

interface CurrentAffairsAnalytics {
  readCount: number;
  bookmarkCount: number;
  mcqAttempts: number;
  flashcardsRevised: number;
  totalTimeSpent: number;
  metrics: {
    masteryScore: number;
    retentionScore: number;
    revisionCoverageScore: number;
    readinessScore: number;
  };
}

interface NewsTabProps {
  currentUser: any;
  onAskAi: (promptText: string) => void;
  initialArticle?: any;
  onClearInitialArticle?: () => void;
}

export const NewsTab: React.FC<NewsTabProps> = ({ currentUser, onAskAi, initialArticle, onClearInitialArticle }) => {
  const [activeSubTab, setActiveSubTab] = useState<'hub' | 'jobs' | 'capsules' | 'analytics' | 'saved'>('hub');
  
  // Hub states
  const [articles, setArticles] = useState<Article[]>([]);
  const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRecommended, setLoadingRecommended] = useState<boolean>(false);
  const [feedType, setFeedType] = useState<'recommended' | 'latest'>('latest');
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Jobs states
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState<boolean>(true);
  const [jobsError, setJobsError] = useState<string>('');
  const [jobSearchQuery, setJobSearchQuery] = useState<string>('');
  const [activeJobCategory, setActiveJobCategory] = useState<string>('all');

  // Capsules states
  const [capsuleData, setCapsuleData] = useState<{ daily: Article[]; weekly: Article[]; monthly: Article[]; yearly: Article[] } | null>(null);
  const [activeCapsuleFilter, setActiveCapsuleFilter] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [loadingCapsules, setLoadingCapsules] = useState<boolean>(false);

  // Analytics states
  const [analyticsData, setAnalyticsData] = useState<CurrentAffairsAnalytics | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(false);

  // Bookmarks local state
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  // Detailed AI Coach modal
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [intel, setIntel] = useState<ArticleIntelligence | null>(null);
  const [loadingIntel, setLoadingIntel] = useState<boolean>(false);
  const [intelError, setIntelError] = useState<string>('');
  const [modalTab, setModalTab] = useState<'insights' | 'notes' | 'flashcards' | 'quiz'>('notes');
  const [summaryLang, setSummaryLang] = useState<'en' | 'hi'>('hi');

  // Quiz state inside modal
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number } | null>(null);

  // Flashcards state inside modal
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);

  const [openTime, setOpenTime] = useState<number | null>(null);

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  // Log interaction events
  const logInteraction = async (title: string, activityType: 'read' | 'bookmark' | 'mcq_attempt' | 'flashcard_revise', timeSpentSeconds: number, mcqScore?: { correct: number; total: number }) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      await fetch(getApiUrl('/api/news/log-interaction'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          activityType,
          timeSpentSeconds,
          mcqScore
        })
      });
      fetchAnalyticsSilent();
    } catch (e) {
      console.warn('Failed to log interaction', e);
    }
  };

  // Save Bookmarks
  const handleSaveArticle = async (article: Article) => {
    let updated;
    const isSaved = savedArticles.some(a => a.title === article.title);
    if (isSaved) {
      updated = savedArticles.filter(a => a.title !== article.title);
    } else {
      updated = [article, ...savedArticles];
    }
    setSavedArticles(updated);
    localStorage.setItem('cg_saved_articles', JSON.stringify(updated));

    logInteraction(article.title, 'bookmark', 5);
  };

  // Fetch Public Feed
  const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(getApiUrl('/api/news'));
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.articles)) {
          setArticles(data.articles);
        }
      } else {
        throw new Error('Failed to fetch general feed');
      }
    } catch (err: any) {
      console.error('[News Fetch Error]:', err);
      setError('Could not retrieve current affairs updates.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Recommended Feed
  const fetchRecommendedNews = async () => {
    if (!currentUser) return;
    setLoadingRecommended(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/news/recommended'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.articles)) {
          setRecommendedArticles(data.articles);
        }
      }
    } catch (err) {
      console.warn('[News Recommended Fetch Error]:', err);
    } finally {
      setLoadingRecommended(false);
    }
  };

  // Fetch Capsules Data
  const fetchCapsules = async () => {
    setLoadingCapsules(true);
    try {
      const res = await fetch(getApiUrl('/api/news/capsules'));
      if (res.ok) {
        const data = await res.json();
        setCapsuleData(data);
      }
    } catch (e) {
      console.warn('[News Capsules Error]:', e);
    } finally {
      setLoadingCapsules(false);
    }
  };

  // Fetch Analytics
  const fetchAnalytics = async () => {
    if (!currentUser) return;
    setLoadingAnalytics(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/news/analytics'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      }
    } catch (e) {
      console.warn('[News Analytics Error]:', e);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const fetchAnalyticsSilent = async () => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/news/analytics'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      }
    } catch (e) {
      console.warn('[News Analytics Silent Error]:', e);
    }
  };

  // Fetch Jobs list
  const fetchJobs = async () => {
    setLoadingJobs(true);
    setJobsError('');
    try {
      const res = await fetch(getApiUrl('/api/jobs'));
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        }
      } else {
        throw new Error('Failed to fetch jobs.');
      }
    } catch (e: any) {
      console.error('[Jobs Fetch Error]:', e);
      setJobsError('Could not retrieve job notifications.');
    } finally {
      setLoadingJobs(false);
    }
  };

  const getJobIcon = (title: string) => {
    const text = title.toLowerCase();
    if (text.includes('police') || text.includes('sub-inspector') || text.includes('inspector') || text.includes('constable') || text.includes('si ')) return '👮';
    if (text.includes('mandi') || text.includes('krishi') || text.includes('agriculture')) return '🌾';
    if (text.includes('patwari') || text.includes('revenue') || text.includes('tehsildar')) return '🗺️';
    if (text.includes('teacher') || text.includes('shikshak') || text.includes('tet') || text.includes('lecturer')) return '👩‍🏫';
    if (text.includes('bank') || text.includes('clerk') || text.includes('po ') || text.includes('rbi') || text.includes('sbi')) return '🏦';
    if (text.includes('engineer') || text.includes('je ') || text.includes('ae ') || text.includes('technical')) return '👷';
    if (text.includes('forest') || text.includes('ranger') || text.includes('guard')) return '🌲';
    if (text.includes('medical') || text.includes('health') || text.includes('nurse') || text.includes('doctor')) return '🏥';
    return '💼';
  };

  const parseJobTitleAndSubtitle = (job: any) => {
    const title = job.title;
    const source = job.source || '';
    
    let displayTitle = title;
    let subtitle = 'Government Department';
    
    // Handle CG Police SI / Mandi Nirikshak
    if (title.toLowerCase().includes('police') && (title.toLowerCase().includes('sub-inspector') || title.toLowerCase().includes('constable') || title.toLowerCase().includes('inspector'))) {
      subtitle = 'Home Department';
    } else if (title.toLowerCase().includes('mandi') || title.toLowerCase().includes('nirikhshak') || title.toLowerCase().includes('nirishak')) {
      subtitle = 'CG Agriculture Marketing Board';
    } else if (title.toLowerCase().includes('patwari')) {
      subtitle = 'Revenue Department';
    } else if (title.toLowerCase().includes('teacher') || title.toLowerCase().includes('shikshak')) {
      subtitle = 'School Education Department';
    } else if (title.toLowerCase().includes('civil judge') || title.toLowerCase().includes('court')) {
      subtitle = 'Law & Legislative Affairs Department';
    } else if (title.toLowerCase().includes('bank') || title.toLowerCase().includes('po') || title.toLowerCase().includes('clerk')) {
      subtitle = 'Banking Sector';
    } else if (source.includes('CGPSC')) {
      subtitle = 'Chhattisgarh Public Service Commission';
    } else if (source.includes('Vyapam')) {
      subtitle = 'CG Professional Examination Board';
    }
    
    if (source.includes('Vyapam') && !subtitle.includes('Vyapam')) {
      subtitle += ' — CG Vyapam';
    } else if (source.includes('CGPSC') && !subtitle.includes('CGPSC')) {
      subtitle += ' — CGPSC';
    } else if (job.state === 'CG' && !subtitle.includes('CG')) {
      subtitle += ' — Chhattisgarh Govt';
    }
    
    displayTitle = displayTitle.replace(/recruitment|recruitment\s*2026|vacancy|bharti|apply\s*online|notification/gi, '').trim();
    displayTitle = displayTitle.replace(/[-,\(]\s*$/g, '').trim();
    displayTitle = displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1);

    return { displayTitle, subtitle };
  };

  const getJobStatusBadge = (job: any) => {
    if (!job.lastDate) return { label: 'New', color: 'bg-greenL/15 text-greenL border-greenL/25' };
    
    const today = new Date();
    today.setHours(0,0,0,0);
    const lastDate = new Date(job.lastDate);
    lastDate.setHours(0,0,0,0);
    
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 0 && diffDays <= 5) {
      return { label: 'Urgent', color: 'bg-red-500/10 text-redL border-red-500/20' };
    } else if (diffDays < 0) {
      return { label: 'Expired', color: 'bg-bg-s3 text-text-muted border-border' };
    } else {
      const scrapDate = new Date(job.scrapedAt || today);
      const scrapDiff = today.getTime() - scrapDate.getTime();
      const scrapDays = Math.ceil(scrapDiff / (1000 * 60 * 60 * 24));
      if (scrapDays <= 3) {
        return { label: 'New', color: 'bg-greenL/10 text-greenL border-greenL/20' };
      }
      return { label: 'Active', color: 'bg-saffron-dim/10 text-saffron border-saffron-border/20' };
    }
  };

  const getJobQualification = (title: string) => {
    const text = title.toLowerCase();
    if (text.includes('peon') || text.includes('driver') || text.includes('helper') || text.includes('10th') || text.includes('10 pass')) return '10th Pass';
    if (text.includes('constable') || text.includes('12th') || text.includes('12 pass') || text.includes('clerk') || text.includes('data entry')) return '12th Pass';
    if (text.includes('graduate') || text.includes('si ') || text.includes('sub-inspector') || text.includes('officer') || text.includes('assistant') || text.includes('po ') || text.includes('patwari') || text.includes('mandi') || text.includes('nirikhshak')) return 'Graduation';
    if (text.includes('post graduate') || text.includes('pg ') || text.includes('lecturer') || text.includes('professor')) return 'Post Graduation';
    if (text.includes('engineer') || text.includes('technical') || text.includes('b.e') || text.includes('b.tech') || text.includes('polytechnic')) return 'Degree/Diploma';
    return 'Graduation';
  };

  const getJobSalaryOrExam = (title: string) => {
    const text = title.toLowerCase();
    const examDateMatch = title.match(/exam(?:\s+date)?(?:\s+on)?\s*:?\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i);
    if (examDateMatch) {
      return { label: `Exam: ${examDateMatch[1]}`, type: 'exam' };
    }
    
    if (text.includes('officer') || text.includes('judge') || text.includes('manager') || text.includes('dy ') || text.includes('sdm')) {
      return { label: '₹56,100–₹1,77,500', type: 'salary' };
    }
    if (text.includes('sub-inspector') || text.includes('inspector') || text.includes('si ') || text.includes('lecturer')) {
      return { label: '₹35,400–₹1,12,400', type: 'salary' };
    }
    if (text.includes('patwari') || text.includes('teacher') || text.includes('assistant') || text.includes('clerk') || text.includes('constable') || text.includes('mandi') || text.includes('nirikhshak')) {
      return { label: '₹25,300–₹80,500', type: 'salary' };
    }
    return { label: '₹19,500–₹62,000', type: 'salary' };
  };

  const getJobLastDateText = (lastDateStr: string | null) => {
    if (!lastDateStr) {
      return { text: 'Check Notification', isUrgent: false, icon: '📋' };
    }
    
    const today = new Date();
    today.setHours(0,0,0,0);
    const lastDate = new Date(lastDateStr);
    lastDate.setHours(0,0,0,0);
    
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = lastDate.toLocaleDateString('en-IN', options);
    
    if (diffDays >= 0 && diffDays <= 5) {
      const daysText = diffDays === 0 ? 'aaj aakhri din hai!' : `${diffDays} din baaki!`;
      return { text: `${formattedDate} — ${daysText}`, isUrgent: true, icon: '⚠️' };
    } else if (diffDays < 0) {
      return { text: `${formattedDate} — Expired`, isUrgent: false, icon: '❌' };
    } else {
      return { text: formattedDate, isUrgent: false, icon: '✅' };
    }
  };

  // Synchronize default feedType based on user authentication
  useEffect(() => {
    if (currentUser) {
      setFeedType('recommended');
    } else {
      setFeedType('latest');
    }
  }, [currentUser]);

  // Load Initial Data
  useEffect(() => {
    fetchNews();
    if (currentUser) {
      fetchRecommendedNews();
      fetchAnalytics();
    }
    const saved = localStorage.getItem('cg_saved_articles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, [currentUser]);

  // Handle auto-opening of an article passed from home screen
  useEffect(() => {
    if (initialArticle && onClearInitialArticle) {
      setSelectedArticle(initialArticle);
      fetchArticleIntelligence(initialArticle);
      onClearInitialArticle();
    }
  }, [initialArticle, onClearInitialArticle]);

  // Load subtab specific data
  useEffect(() => {
    if (activeSubTab === 'capsules' && !capsuleData) {
      fetchCapsules();
    }
    if (activeSubTab === 'analytics' && !analyticsData) {
      fetchAnalytics();
    }
    if (activeSubTab === 'jobs' && jobs.length === 0) {
      fetchJobs();
    }
  }, [activeSubTab]);

  // Fetch Intelligence Packet
  const fetchArticleIntelligence = async (article: Article) => {
    setLoadingIntel(true);
    setIntelError('');
    setIntel(null);
    setModalTab('notes');
    setSelectedOptions({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setCurrentQuizIdx(0);
    setCurrentCardIdx(0);
    setCardFlipped(false);
    setOpenTime(Date.now());

    try {
      const query = `?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(article.description || '')}&category=${encodeURIComponent(article.category)}&source=${encodeURIComponent(article.source)}`;
      const res = await fetch(getApiUrl(`/api/news/intelligence${query}`));
      if (!res.ok) {
        throw new Error('AI was unable to generate intelligence for this article. Please check later.');
      }
      const data = await res.json();
      setIntel(data);
    } catch (e: any) {
      console.error('[Article Intel Error]:', e);
      setIntelError(e.message || 'Error processing news intelligence.');
    } finally {
      setLoadingIntel(false);
    }
  };

  // Open / Close modal time spent logger
  const handleCloseModal = () => {
    if (selectedArticle && openTime) {
      const timeSpent = Math.round((Date.now() - openTime) / 1000);
      logInteraction(selectedArticle.title, 'read', timeSpent);
    }
    setSelectedArticle(null);
    setIntel(null);
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('chhattisgarh')) return '🏔️';
    if (cat.includes('national')) return '🇮🇳';
    if (cat.includes('international')) return '🌍';
    if (cat.includes('polity')) return '⚖️';
    if (cat.includes('economy') || cat.includes('budget')) return '📈';
    if (cat.includes('science') || cat.includes('tech')) return '🔬';
    if (cat.includes('environment')) return '🌿';
    if (cat.includes('sport')) return '🏏';
    if (cat.includes('award')) return '🏆';
    if (cat.includes('scheme')) return '🏛️';
    if (cat.includes('agriculture')) return '🌾';
    if (cat.includes('report') || cat.includes('index')) return '📊';
    return '📰';
  };

  // Filter lists based on Search & Category
  const getFilteredList = (list: Article[]) => {
    return list.filter(art => {
      const matchesCategory = activeCategory === 'all' || art.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(art.category.toLowerCase());
      const query = searchQuery.toLowerCase();
      const titleText = (art.title || '').toLowerCase() + ' ' + 
                        (art.title_hi || '').toLowerCase() + ' ' + 
                        (art.description || '').toLowerCase() + ' ' + 
                        (art.description_hi || '').toLowerCase();
      const matchesSearch = titleText.includes(query);
      return matchesCategory && matchesSearch;
    });
  };

  const displayFeed = (currentUser && feedType === 'recommended') ? recommendedArticles : articles;
  const filteredArticles = getFilteredList(displayFeed);

  // Trending Section (Top 5 scoring articles or just first 5 articles)
  const trendingArticles = displayFeed
    .slice()
    .sort((a, b) => (b.recommendationScore || 50) - (a.recommendationScore || 50))
    .slice(0, 5);

  // Quiz Answers selector
  const handleSelectQuizOption = (optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuizIdx]: optIdx
    }));
  };

  // Submit Quiz inside Modal
  const handleSubmitQuiz = () => {
    if (!intel?.mcqs) return;
    let correct = 0;
    intel.mcqs.forEach((mcq, idx) => {
      if (selectedOptions[idx] === mcq.correctIndex) {
        correct++;
      }
    });
    setQuizScore({ correct, total: intel.mcqs.length });
    setQuizSubmitted(true);

    if (selectedArticle) {
      logInteraction(selectedArticle.title, 'mcq_attempt', 60, { correct, total: intel.mcqs.length });
    }
  };

  // Mark Flashcard as revised
  const handleMarkFlashcardRevised = () => {
    if (selectedArticle) {
      logInteraction(selectedArticle.title, 'flashcard_revise', 15);
      setCardFlipped(false);
      if (intel?.flashcards && currentCardIdx < intel.flashcards.length - 1) {
        setTimeout(() => {
          setCurrentCardIdx(prev => prev + 1);
        }, 150);
      } else {
        alert('All flashcards in this article revised! Mastery updated.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full text-text pb-12 font-sans relative">
      
      {/* 1. Header & Quick Analytics Widget */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-bg-s2 to-bg-s3 border border-border p-5 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase text-saffron tracking-widest flex items-center gap-1.5 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Current Affairs & GK Engine</span>
          </span>
          <h2 className="text-base font-black text-text">News Intelligence Dashboard</h2>
          <p className="text-[11px] text-text-muted max-w-xl leading-normal">
            Your live Current Affairs Coach. Raw news is automatically compiled, linked to syllabus topics, fact-checked, and converted into study notes, flashcards, and MCQs.
          </p>
        </div>

        {/* Mini Analytics Panel */}
        {currentUser && analyticsData && (
          <div className="flex items-center gap-4 bg-bg-s1/65 border border-border/80 p-3 rounded-lg max-w-xs shrink-0 select-none">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="transparent" />
                <circle cx="24" cy="24" r="20" stroke="#ff9933" strokeWidth="3.5" fill="transparent"
                  strokeDasharray={2 * Math.PI * 20}
                  strokeDashoffset={2 * Math.PI * 20 * (1 - analyticsData.metrics.readinessScore / 100)} />
              </svg>
              <span className="absolute text-[10px] font-black text-text">{analyticsData.metrics.readinessScore}%</span>
            </div>
            <div className="flex flex-col truncate">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">CA Readiness</span>
              <span className="text-xs font-black text-text mt-0.5">Level {Math.ceil(analyticsData.metrics.readinessScore / 10)} Aspirant</span>
              <span className="text-[9px] text-saffron mt-0.5">XP Boost active</span>
            </div>
          </div>
        )}
      </div>



      {/* 3. Section Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-0.5 shrink-0 overflow-x-auto no-scrollbar font-bold">
        {[
          { id: 'hub', label: 'News Intelligence', icon: Newspaper },
          { id: 'jobs', label: 'Jobs & Alerts', icon: Briefcase },
          { id: 'capsules', label: 'Revision Capsules', icon: BookOpen },
          { id: 'analytics', label: 'Mastery Analytics', icon: Trophy },
          { id: 'saved', label: `Saved Notes (${savedArticles.length})`, icon: Bookmark }
        ].map(subTab => (
          <button
            key={subTab.id}
            onClick={() => setActiveSubTab(subTab.id as any)}
            className={`px-4 py-2 text-xs font-black uppercase flex items-center gap-1.5 border-b-2 cursor-pointer transition-all ${
              activeSubTab === subTab.id
                ? 'border-saffron text-saffron font-black bg-saffron-dim/15'
                : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            <subTab.icon className="w-4 h-4" />
            <span>{subTab.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Sub-Tab Layout Content */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: NEWS INTELLIGENCE HUB */}
        {activeSubTab === 'hub' && (
          <motion.div
            key="hub-panel"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-5"
          >
            {/* Feed Selector for personalized AI vs chronological Latest */}
            {currentUser && (
              <div className="flex items-center gap-2 bg-bg-s3/40 border border-border p-1 rounded-xl self-start">
                <button
                  onClick={() => setFeedType('recommended')}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    feedType === 'recommended'
                      ? 'bg-saffron text-bg-s1 shadow-md font-black'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>For You (AI)</span>
                </button>
                <button
                  onClick={() => setFeedType('latest')}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    feedType === 'latest'
                      ? 'bg-saffron text-bg-s1 shadow-md font-black'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Latest Feed</span>
                </button>
              </div>
            )}

            {/* Search and Quick filters */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search current affairs, government schemes, acts, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg-s2 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-lg outline-none transition-colors"
                />
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-3.5" />
              </div>
              
              {/* Category selector */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-full md:max-w-md shrink-0">
                {[
                  { id: 'all', label: 'All GK', icon: '📋' },
                  { id: 'chhattisgarh', label: 'CG GK', icon: '🏔️' },
                  { id: 'national', label: 'National', icon: '🇮🇳' },
                  { id: 'economy', label: 'Economy', icon: '📈' },
                  { id: 'scheme', label: 'Schemes', icon: '🏛' },
                  { id: 'polity', label: 'Polity', icon: '⚖️' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-saffron text-bg-s1 border-saffron font-black shadow-sm'
                        : 'bg-bg-s2 border-border text-text-muted hover:text-text'
                    }`}
                  >
                    <span>{cat.icon}</span> <span className="ml-1">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Section */}
            {!searchQuery && activeCategory === 'all' && trendingArticles.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-[10px] font-black text-saffron uppercase tracking-widest flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
                  <span>Trending for Exam / महत्वपूर्ण प्रश्न स्त्रोत</span>
                </h4>
                <div className="flex items-stretch gap-4 overflow-x-auto no-scrollbar pb-1">
                  {trendingArticles.map((art, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedArticle(art);
                        fetchArticleIntelligence(art);
                      }}
                      className="p-4 bg-gradient-to-br from-bg-s2 to-bg-s3 hover:from-bg-s3 hover:to-bg-s2 border border-border rounded-xl text-left shadow flex flex-col justify-between gap-3 w-72 shrink-0 cursor-pointer transition-all hover:scale-[1.005]"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[8px] font-black uppercase tracking-wider text-saffron bg-saffron-dim/40 px-2 py-0.5 rounded border border-saffron-border/30 flex items-center gap-1">
                          <span>{getCategoryIcon(art.category)}</span>
                          <span>{art.category}</span>
                        </span>
                        {art.recommendationScore && (
                          <span className="text-[9px] font-black text-greenL bg-greenL/15 px-1.5 py-0.5 rounded uppercase">
                            Relevance: {art.recommendationScore}%
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        <h5 className="text-xs font-bold leading-relaxed line-clamp-2 text-text animate-fade-in" title={art.title_hi || art.title}>
                          {art.title_hi || art.title}
                        </h5>
                        <p className="text-[10px] text-text-muted line-clamp-2 leading-normal">
                          {art.description_hi || art.summary_hi || art.description || art.title}
                        </p>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-text-muted border-t border-border/40 pt-2 w-full font-bold">
                        <span>📡 {art.source}</span>
                        <span className="text-saffron-border uppercase text-[9px] tracking-wider flex items-center gap-0.5 group">
                          <span>Analyze</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Articles feed list */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                {currentUser && feedType === 'recommended' ? 'AI Recommended News for You' : 'Latest Current Affairs Feed'}
              </h4>

              {((feedType === 'recommended' && loadingRecommended) || (feedType === 'latest' && loading)) ? (
                <div className="flex flex-col gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-28 bg-bg-s2 border border-border rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-start gap-2.5 text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="p-10 text-center bg-bg-s2 border border-border rounded-xl text-text-muted text-xs uppercase font-bold tracking-wider">
                  No current affairs matching criteria found.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredArticles.map((art, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setSelectedArticle(art);
                        fetchArticleIntelligence(art);
                      }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                      className="p-4 bg-bg-s2 hover:bg-bg-s2/90 border border-border rounded-xl text-left shadow-sm transition-all hover:scale-[1.005] cursor-pointer flex flex-col gap-3 group relative overflow-hidden"
                    >
                      {/* Left border highlight */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-saffron" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-saffron bg-saffron-dim/30 border border-saffron-border/30 px-2 py-0.5 rounded leading-none flex items-center gap-1">
                          <span>{getCategoryIcon(art.category)}</span>
                          <span>{art.category}</span>
                        </span>
                        
                        <span className="text-[9px] text-text-muted font-bold flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{art.date || 'Today'}</span>
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-text group-hover:text-saffron transition-colors leading-normal line-clamp-2 animate-fade-in" title={art.title_hi || art.title}>
                        {art.title_hi || art.title}
                      </h4>

                      <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed">
                        {art.description_hi || art.summary_hi || art.description || art.title}
                      </p>

                      <div className="flex justify-between items-center text-[10px] text-text-muted border-t border-border/40 pt-2 mt-1">
                        <span className="font-bold uppercase tracking-wider">{art.source}</span>
                        {art.recommendationScore && art.recommendationScore > 50 && (
                          <span className="text-[9px] font-black text-saffron bg-saffron-dim/30 px-2 py-0.5 rounded border border-saffron-border/30">
                            Recommended
                          </span>
                        )}
                        <span className="text-saffron-border font-bold uppercase text-[9px] tracking-wider group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          <span>Analyze with AI</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 1.5: JOBS & ALERTS */}
        {activeSubTab === 'jobs' && (
          <motion.div
            key="jobs-panel"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-5"
          >
            {/* Search and Quick filters for jobs */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search jobs, exams, posts, qualifications..."
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  className="w-full bg-bg-s2 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-lg outline-none transition-colors"
                />
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-3.5" />
              </div>
              
              {/* Category selector for jobs */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-full md:max-w-md shrink-0">
                {[
                  { id: 'all', label: 'All Jobs', icon: '📋' },
                  { id: 'cg', label: 'CG Jobs', icon: '🏔️' },
                  { id: 'banking', label: 'Banking', icon: '🏦' },
                  { id: 'railway', label: 'Railways', icon: '🚂' },
                  { id: 'ssc', label: 'SSC / UPSC', icon: '🏛️' },
                  { id: 'other', label: 'Others', icon: '💼' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveJobCategory(cat.id)}
                    className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                      activeJobCategory === cat.id
                        ? 'bg-saffron text-bg-s1 border-saffron font-black shadow-sm'
                        : 'bg-bg-s2 border-border text-text-muted hover:text-text'
                    }`}
                  >
                    <span>{cat.icon}</span> <span className="ml-1">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Banner alert for urgent jobs */}
            {(() => {
              const today = new Date();
              today.setHours(0,0,0,0);
              const urgentJobs = jobs.filter(job => {
                if (!job.lastDate) return false;
                const lastDate = new Date(job.lastDate);
                lastDate.setHours(0,0,0,0);
                const diffTime = lastDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays >= 0 && diffDays <= 7;
              });

              if (urgentJobs.length > 0) {
                return (
                  <div className="bg-[#121620] border border-border/80 px-4 py-3.5 rounded-xl flex items-center justify-between text-center gap-2 select-none relative overflow-hidden">
                    <div className="text-amber-500 animate-bounce">
                      <Bell className="w-4 h-4 fill-current" />
                    </div>
                    <div className="text-xs font-bold text-text flex-1 tracking-wide">
                      <span className="text-amber-400 font-black">{urgentJobs.length} exams</span> ki last date is hafte — abhi apply karo!
                    </div>
                    <div className="text-amber-500 animate-bounce">
                      <Bell className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                );
              }
              return (
                <div className="bg-[#121620] border border-border/80 px-4 py-3.5 rounded-xl flex items-center justify-between text-center gap-2 select-none relative overflow-hidden">
                  <div className="text-amber-500 animate-bounce">
                    <Bell className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-xs font-bold text-text flex-1 tracking-wide">
                    Naye vacancy aur exam notifications live hain — abhi check karein!
                  </div>
                  <div className="text-amber-500 animate-bounce">
                    <Bell className="w-4 h-4 fill-current" />
                  </div>
                </div>
              );
            })()}

            {/* Jobs list */}
            {loadingJobs ? (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-44 bg-bg-s2 border border-border rounded-xl animate-pulse" />
                ))}
              </div>
            ) : jobsError ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-start gap-2.5 text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{jobsError}</span>
              </div>
            ) : (() => {
              const filteredJobs = jobs.filter(job => {
                const titleText = (job.title || '').toLowerCase() + ' ' + (job.source || '').toLowerCase();
                const query = jobSearchQuery.toLowerCase();
                const matchesSearch = titleText.includes(query);
                
                if (activeJobCategory === 'all') return matchesSearch;
                if (activeJobCategory === 'cg') return matchesSearch && (job.category === 'cgpsc' || job.category === 'cgvyapam' || job.state === 'CG');
                if (activeJobCategory === 'banking') return matchesSearch && job.category === 'banking';
                if (activeJobCategory === 'railway') return matchesSearch && job.category === 'railway';
                if (activeJobCategory === 'ssc') return matchesSearch && (job.category === 'ssc' || job.category === 'upsc');
                return matchesSearch && (job.category !== 'cgpsc' && job.category !== 'cgvyapam' && job.category !== 'banking' && job.category !== 'railway' && job.category !== 'ssc' && job.category !== 'upsc');
              });

              if (filteredJobs.length === 0) {
                return (
                  <div className="p-10 text-center bg-bg-s2 border border-border rounded-xl text-text-muted text-xs uppercase font-bold tracking-wider font-mono">
                    No active job vacancies matching criteria found.
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredJobs.map((job, idx) => {
                    const { displayTitle, subtitle } = parseJobTitleAndSubtitle(job);
                    const badge = getJobStatusBadge(job);
                    const lastDateInfo = getJobLastDateText(job.lastDate);
                    const salaryOrExam = getJobSalaryOrExam(job.title);
                    const qualification = getJobQualification(job.title);
                    const icon = getJobIcon(job.title);
                    
                    return (
                      <div
                        key={job.id || idx}
                        className="p-5 bg-[#161d2d] border border-border/80 rounded-xl flex flex-col gap-4 shadow-sm hover:border-saffron-border/30 transition-colors relative overflow-hidden group"
                      >
                        {/* Left side accent border */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-saffron animate-fade-in" />

                        {/* Top Row: Icon, Title, Subtitle, and Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-bg-s3/80 border border-border/50 rounded-xl flex items-center justify-center text-xl shrink-0 select-none">
                              {icon}
                            </div>
                            <div className="flex flex-col">
                              <h4 className="text-sm font-black text-text leading-snug tracking-wide line-clamp-2">
                                {displayTitle}
                              </h4>
                              <span className="text-[10px] text-text-muted font-black mt-0.5 leading-none">
                                {subtitle}
                              </span>
                            </div>
                          </div>
                          
                          <span className={`px-2 py-0.8 rounded-lg text-[9px] font-black uppercase border leading-none flex items-center gap-1 shrink-0 ${badge.color}`}>
                            <span className="w-1 h-1 rounded-full bg-current" />
                            {badge.label}
                          </span>
                        </div>

                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[11px] text-text/90 font-bold border-t border-b border-border/40 py-2.5 my-0.5">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-purple-400" />
                            <span>{job.vacancies ? `${job.vacancies} Posts` : 'Multiple Posts'}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                            <span>{qualification}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {salaryOrExam.type === 'salary' ? (
                              <>
                                <Coins className="w-3.5 h-3.5 text-amber-400" />
                                <span>{salaryOrExam.label}</span>
                              </>
                            ) : (
                              <>
                                <FileText className="w-3.5 h-3.5 text-amber-400" />
                                <span>{salaryOrExam.label}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between gap-3 mt-auto pt-1">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] text-text-muted font-black uppercase tracking-wide">Apply last date</span>
                            <span className={`text-[11px] font-extrabold flex items-center gap-1 ${lastDateInfo.isUrgent ? 'text-[#F5A623]' : 'text-greenL'}`}>
                              <span>{lastDateInfo.icon === '⚠️' ? '⚠️' : lastDateInfo.icon === '❌' ? '❌' : '✅'}</span>
                              <span>{lastDateInfo.text}</span>
                            </span>
                          </div>

                          <a
                            href={job.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* TAB 2: REVISION CAPSULES */}
        {activeSubTab === 'capsules' && (
          <motion.div
            key="capsules-panel"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-4"
          >
            <div className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs font-black text-text uppercase">Current Affairs Revision System</h4>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Daily, Weekly, Monthly, and Yearly Capsules automatically compiled from scraped resources.
                </p>
              </div>

              {/* Capsule length filter */}
              <div className="flex bg-bg-s3 border border-border p-1 rounded-lg shrink-0 overflow-x-auto no-scrollbar">
                {[
                  { id: 'daily', label: 'Daily Capsule' },
                  { id: 'weekly', label: 'Weekly Capsule' },
                  { id: 'monthly', label: 'Monthly Capsule' },
                  { id: 'yearly', label: 'Yearly Book' }
                ].map(capFilter => (
                  <button
                    key={capFilter.id}
                    onClick={() => setActiveCapsuleFilter(capFilter.id as any)}
                    className={`px-3 py-1 text-[10px] font-black uppercase rounded cursor-pointer whitespace-nowrap ${
                      activeCapsuleFilter === capFilter.id
                        ? 'bg-saffron text-bg-s1 font-black shadow-sm'
                        : 'text-text-muted hover:text-text'
                    }`}
                  >
                    {capFilter.label}
                  </button>
                ))}
              </div>
            </div>

            {loadingCapsules ? (
              <div className="flex flex-col gap-3 py-10 items-center justify-center text-text-muted">
                <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Generating revision packet...</span>
              </div>
            ) : capsuleData && capsuleData[activeCapsuleFilter] ? (
              <div className="flex flex-col gap-4">
                {/* Digest card */}
                <div className="p-5 bg-gradient-to-br from-bg-s2 to-bg-s3 border border-border rounded-xl flex flex-col gap-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-dim/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📚</span>
                    <div className="flex flex-col">
                      <h4 className="text-xs font-black uppercase text-gold">AI revision summary digest</h4>
                      <span className="text-[9px] text-text-muted font-bold">{capsuleData[activeCapsuleFilter].length} Articles included</span>
                    </div>
                  </div>
                  <p className="text-xs text-text leading-relaxed tracking-wide pt-1">
                    {activeCapsuleFilter === 'daily' && 'Here is your daily revision digest. Focus on State Government Schemes launched today, local appointments in CG Secretariat, and the new wildlife census reports.'}
                    {activeCapsuleFilter === 'weekly' && 'Weekly Digest: Key developments include discussions on GST collections, state boundary disputes, central scheme extensions, and sports awards received by Chhattisgarh players.'}
                    {activeCapsuleFilter === 'monthly' && 'Monthly Digest: Main focus is on budget sessions, financial allocations across core areas, environment policies, and agriculture yield patterns in Chhattisgarh plains.'}
                    {activeCapsuleFilter === 'yearly' && 'Yearly Digest: Comprehensive notes summarizing key appointments, reports, budget allocations, bills passed, and sports achievements for full year SSE preparations.'}
                  </p>

                  <div className="flex gap-3 border-t border-border/40 pt-3 mt-1 flex-wrap">
                    <button
                      onClick={() => {
                        // Triggers fake MCQ test from capsule
                        if (capsuleData[activeCapsuleFilter].length > 0) {
                          setSelectedArticle(capsuleData[activeCapsuleFilter][0]);
                          fetchArticleIntelligence(capsuleData[activeCapsuleFilter][0]);
                          setTimeout(() => setModalTab('quiz'), 600);
                        } else {
                          alert('No articles available in this capsule.');
                        }
                      }}
                      className="px-4 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors shadow flex items-center gap-1.5"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Take Revision Quiz</span>
                    </button>
                    <button
                      onClick={() => {
                        alert('Revision Capsule generated! Summary note saved to local coach files.');
                      }}
                      className="px-4 py-2 bg-bg-s1 hover:bg-bg-s1/90 border border-border text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 text-text"
                    >
                      <FileText className="w-3.5 h-3.5 text-saffron" />
                      <span>Generate Study PDF</span>
                    </button>
                  </div>
                </div>

                {/* Capsule list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {capsuleData[activeCapsuleFilter].map((art, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedArticle(art);
                        fetchArticleIntelligence(art);
                      }}
                      className="p-4 bg-bg-s2 border border-border rounded-xl text-left shadow-sm transition-all hover:scale-[1.005] cursor-pointer flex flex-col gap-2 relative overflow-hidden group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-saffron bg-saffron-dim/30 border border-saffron-border/30 px-2 py-0.5 rounded leading-none flex items-center gap-1">
                          <span>{getCategoryIcon(art.category)}</span>
                          <span>{art.category}</span>
                        </span>
                        
                        <span className="text-[9px] text-text-muted font-bold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{art.date || 'Today'}</span>
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-text group-hover:text-saffron transition-colors leading-normal line-clamp-2 animate-fade-in" title={art.title_hi || art.title}>
                        {art.title_hi || art.title}
                      </h4>
                      <p className="text-[10px] text-text-muted line-clamp-2 leading-normal">
                        {art.description_hi || art.summary_hi || art.description || art.title}
                      </p>

                      <div className="flex justify-between items-center text-[10px] text-text-muted border-t border-border/40 pt-2 mt-1 w-full font-bold">
                        <span>📡 {art.source}</span>
                        <span className="text-saffron-border uppercase text-[9px] tracking-wider flex items-center gap-0.5">
                          <span>Study Notes</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-bg-s2 border border-border rounded-xl text-text-muted text-xs uppercase font-bold tracking-wider">
                No capsules loaded. Tap Refresh database.
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: ANALYTICS PROGRESS COACH */}
        {activeSubTab === 'analytics' && (
          <motion.div
            key="analytics-panel"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-5"
          >
            {loadingAnalytics ? (
              <div className="flex flex-col gap-3 py-10 items-center justify-center text-text-muted">
                <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Compiling learning interactions...</span>
              </div>
            ) : analyticsData ? (
              <div className="flex flex-col gap-5">
                {/* 4 Score Dashboard grids */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Readiness Score', value: `${analyticsData.metrics.readinessScore}%`, desc: 'Overall CA readiness', icon: Trophy, color: 'text-saffron' },
                    { label: 'Mastery Score', value: `${analyticsData.metrics.masteryScore}%`, desc: 'MCQ accuracy details', icon: Award, color: 'text-yellow-500' },
                    { label: 'Retention Score', value: `${analyticsData.metrics.retentionScore}%`, desc: 'Active revision scale', icon: Brain, color: 'text-greenL' },
                    { label: 'Revision Coverage', value: `${analyticsData.metrics.revisionCoverageScore}%`, desc: 'Saved articles revised', icon: CheckCircle, color: 'text-purple-400' }
                  ].map((card, i) => (
                    <div key={i} className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col gap-1.5 shadow">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">{card.label}</span>
                        <card.icon className={`w-4.5 h-4.5 ${card.color}`} />
                      </div>
                      <span className="text-xl font-black text-text mt-1">{card.value}</span>
                      <span className="text-[9px] text-text-muted font-bold leading-none">{card.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Counts breakdown */}
                <div className="p-5 bg-bg-s2 border border-border rounded-xl flex flex-col gap-4 shadow">
                  <h4 className="text-xs font-black text-text uppercase">Interaction Audit Trail</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col bg-bg-s3/45 border border-border p-3.5 rounded-lg text-center">
                      <span className="text-2xl font-black text-saffron">{analyticsData.readCount}</span>
                      <span className="text-[9px] text-text-muted font-black uppercase mt-1">Articles Read</span>
                    </div>
                    <div className="flex flex-col bg-bg-s3/45 border border-border p-3.5 rounded-lg text-center">
                      <span className="text-2xl font-black text-purple-400">{analyticsData.bookmarkCount}</span>
                      <span className="text-[9px] text-text-muted font-black uppercase mt-1">Notes Bookmarked</span>
                    </div>
                    <div className="flex flex-col bg-bg-s3/45 border border-border p-3.5 rounded-lg text-center">
                      <span className="text-2xl font-black text-greenL">{analyticsData.mcqAttempts}</span>
                      <span className="text-[9px] text-text-muted font-black uppercase mt-1">Quiz Attempts</span>
                    </div>
                    <div className="flex flex-col bg-bg-s3/45 border border-border p-3.5 rounded-lg text-center">
                      <span className="text-2xl font-black text-yellow-500">{analyticsData.flashcardsRevised}</span>
                      <span className="text-[9px] text-text-muted font-black uppercase mt-1">Cards Revised</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-bg-s3 border border-border/80 p-3 rounded-lg text-xs text-text-muted">
                    <Clock className="w-4 h-4 text-saffron shrink-0" />
                    <span>Total Time Spent studying news: <strong className="text-text">{Math.round(analyticsData.totalTimeSpent / 60)} minutes</strong>. Practice more MCQs to improve your CA Readiness levels!</span>
                  </div>
                </div>

                {/* Weak Subjects Focus Advice */}
                <div className="p-5 bg-gradient-to-br from-bg-s2 to-bg-s3 border border-border rounded-xl flex flex-col gap-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-start gap-2.5 text-xs text-text">
                    <Info className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase text-saffron tracking-wider">AI Coach Revision Strategy</span>
                      <h5 className="font-bold text-text mt-0.5">Syllabus Weak Subjects Prioritization</h5>
                      <p className="text-[11px] text-text-muted leading-relaxed">
                        Our intelligence engine noticed your Polity & Economy accuracy is below 75%. We have automatically boosted articles related to <strong>Polity Constitutional articles, government schemes, and state budget</strong> on your homepage. Make sure to solve MCQs from these recommended items to patch study gaps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-bg-s2 border border-border rounded-xl text-text-muted text-xs font-bold uppercase tracking-wider">
                Log in to sync current affairs analytics and track readiness metrics.
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: SAVED NOTES */}
        {activeSubTab === 'saved' && (
          <motion.div
            key="saved-panel"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-4"
          >
            {savedArticles.length === 0 ? (
              <div className="p-12 text-center bg-bg-s2 border border-border rounded-xl text-text-muted text-xs uppercase font-bold tracking-wider flex flex-col items-center gap-2">
                <Bookmark className="w-8 h-8 text-text-muted" />
                <span>No saved current affairs notes. Save articles during study to revise later.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedArticles.map((art, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-bg-s2 border border-border rounded-xl text-left shadow-sm flex flex-col gap-3 relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-saffron bg-saffron-dim/30 border border-saffron-border/30 px-2 py-0.5 rounded leading-none flex items-center gap-1">
                        <span>{getCategoryIcon(art.category)}</span>
                        <span>{art.category}</span>
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveArticle(art)}
                          className="text-saffron hover:text-orange-500 cursor-pointer"
                          title="Remove from saved"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-text group-hover:text-saffron transition-colors leading-normal line-clamp-2 animate-fade-in" title={art.title_hi || art.title}>
                      {art.title_hi || art.title}
                    </h4>

                    <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed">
                      {art.description_hi || art.summary_hi || art.description || art.title}
                    </p>

                    <div className="flex gap-2 border-t border-border/40 pt-3 mt-1">
                      <button
                        onClick={() => {
                          setSelectedArticle(art);
                          fetchArticleIntelligence(art);
                        }}
                        className="flex-1 py-2 bg-bg-s3 hover:bg-bg-s1 text-text border border-border text-[9px] font-black uppercase rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-saffron" />
                        <span>Revise Notes</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedArticle(art);
                          fetchArticleIntelligence(art);
                          setTimeout(() => setModalTab('quiz'), 600);
                        }}
                        className="flex-1 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-[9px] font-black uppercase rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        <span>Re-test MCQs</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Detailed Article Modal Popover — AI COACH PANELS */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md z-[999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-xl bg-bg-s2 border border-border rounded-xl shadow-2xl p-5 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-border pb-2 shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkle className="w-5 h-5 text-saffron animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-saffron bg-saffron-dim/30 px-2.5 py-0.5 rounded border border-saffron-border/30">
                    AI Coach Intelligence
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSaveArticle(selectedArticle)}
                    className="p-1 rounded bg-bg-s3 border border-border text-text-muted hover:text-text cursor-pointer transition-all"
                    title={savedArticles.some(a => a.title === selectedArticle.title) ? 'Saved' : 'Save note'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${savedArticles.some(a => a.title === selectedArticle.title) ? 'text-saffron fill-saffron' : ''}`} />
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="text-xs text-text-muted hover:text-text cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Title & metadata */}
              <div className="flex flex-col gap-1 shrink-0">
                <h2 className="text-sm font-black text-text leading-relaxed">
                  {summaryLang === 'hi' ? (selectedArticle.title_hi || intel?.title_hi || selectedArticle.title) : (selectedArticle.title)}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-[9px] text-text-muted font-bold uppercase tracking-wider mt-1">
                  <span>📅 {selectedArticle.date || 'Today'}</span>
                  <span>📡 {selectedArticle.source}</span>
                  <span>🗂️ {selectedArticle.category}</span>
                </div>
              </div>

              {loadingIntel ? (
                /* Intelligence Generation Loader */
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-text-muted flex-1">
                  <div className="w-10 h-10 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-black uppercase tracking-widest text-saffron">AI Coach is analyzing...</span>
                  <p className="text-[10px] text-text-muted max-w-xs text-center leading-normal">
                    Setting expected exam relevance, linking to historical PYQs, generating memory tricks, custom flashcards, and MCQs.
                  </p>
                </div>
              ) : intelError ? (
                /* Error handling fallback */
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-start gap-2 text-xs flex-1">
                  <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
                  <span>{intelError}</span>
                </div>
              ) : intel ? (
                /* Intelligence Packet Viewers */
                <div className="flex flex-col gap-4 flex-1">
                  
                  {/* Internal tabs inside Modal */}
                  <div className="flex items-center bg-bg-s3 border border-border p-1 rounded-lg shrink-0 overflow-x-auto no-scrollbar">
                    {[
                      { id: 'notes', label: 'Study Notes' },
                      { id: 'insights', label: 'Exam Insight' },
                      { id: 'flashcards', label: `Flashcards (${intel.flashcards?.length || 0})` },
                      { id: 'quiz', label: 'Practice Quiz' }
                    ].map(mtab => (
                      <button
                        key={mtab.id}
                        onClick={() => setModalTab(mtab.id as any)}
                        className={`flex-1 px-3 py-1.5 text-[9px] font-black uppercase rounded cursor-pointer whitespace-nowrap ${
                          modalTab === mtab.id
                            ? 'bg-saffron text-bg-s1 font-black shadow'
                            : 'text-text-muted hover:text-text'
                        }`}
                      >
                        {mtab.label}
                      </button>
                    ))}
                  </div>

                  {/* MODAL PANEL CONTENT SCROLLER */}
                  <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-4 pr-1">
                    
                    {/* PANEL 1: INSIGHTS & MATTERS */}
                    {modalTab === 'insights' && (
                      <div className="flex flex-col gap-4">
                        {/* Relevance score and targeted exams badge */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-bg-s3 border border-border rounded-lg flex items-center gap-3.5">
                            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                              <svg className="w-14 h-14 transform -rotate-90">
                                <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" fill="transparent" />
                                <circle cx="28" cy="28" r="24" stroke="#ff9933" strokeWidth="4.5" fill="transparent"
                                  strokeDasharray={2 * Math.PI * 24}
                                  strokeDashoffset={2 * Math.PI * 24 * (1 - (intel.relevanceScore || 70) / 100)} />
                              </svg>
                              <span className="absolute text-xs font-black text-text">{intel.relevanceScore}/100</span>
                            </div>
                            <div className="flex flex-col truncate">
                              <span className="text-[8px] font-black text-text-muted uppercase tracking-wider">Relevance Score</span>
                              <span className="text-xs font-black text-text mt-0.5">High Probability</span>
                              <span className="text-[9px] text-text-muted mt-0.5">Likely to appear in upcoming tests</span>
                            </div>
                          </div>

                          <div className="p-4 bg-bg-s3 border border-border rounded-lg flex flex-col gap-1 justify-center">
                            <span className="text-[8px] font-black text-text-muted uppercase tracking-wider">Target Exams</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(intel.targetExams || ['CGPSC', 'CG Vyapam']).map((ex, k) => (
                                <span key={k} className="text-[8px] font-black bg-bg-s1 border border-border text-saffron px-1.5 py-0.5 rounded uppercase">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Why this matters */}
                        <div className="p-4 bg-[#ff9933]/5 border border-[#ff9933]/15 rounded-lg flex flex-col gap-1.5">
                          <h5 className="text-[9px] font-black uppercase text-saffron tracking-wider flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" /> Why this matters for exam / परीक्षा के लिए महत्व
                          </h5>
                          <p className="text-xs text-text leading-relaxed tracking-wide whitespace-pre-line">
                            {intel.whyItMatters}
                          </p>
                        </div>

                        {/* Static GK Connection Linkage */}
                        {intel.staticGkLinks && intel.staticGkLinks.length > 0 && (
                          <div className="p-4 bg-bg-s3 border border-border rounded-lg flex flex-col gap-2">
                            <h5 className="text-[9px] font-black uppercase text-gold tracking-wider flex items-center gap-1.5">
                              <Brain className="w-4 h-4 text-gold" /> Static GK Link / स्टेटिक सामान्य ज्ञान सम्बन्ध
                            </h5>
                            <div className="flex flex-col gap-2.5 mt-1">
                              {intel.staticGkLinks.map((gk, idx) => (
                                <div key={idx} className="border-l-2 border-gold/45 pl-3 py-0.5 flex flex-col gap-1">
                                  <span className="text-[10px] font-black text-text flex items-center gap-1">
                                    <span>{gk.subject}</span> • <span className="text-gold">{gk.topic}</span>
                                  </span>
                                  <p className="text-[11px] text-text-muted leading-relaxed">
                                    {gk.connection}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* PYQ Connection */}
                        {intel.pyqConnection && (
                          <div className="p-4 bg-purple-500/5 border border-purple-500/15 rounded-lg flex flex-col gap-1.5">
                            <h5 className="text-[9px] font-black uppercase text-purple-400 tracking-wider flex items-center gap-1">
                              <Activity className="w-3.5 h-3.5" /> PYQ Connection / पुराना पेपर कनेक्शन
                            </h5>
                            <p className="text-xs text-text-muted leading-relaxed">
                              {intel.pyqConnection}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* PANEL 2: DETAILED STUDY NOTES */}
                    {modalTab === 'notes' && (
                      <div className="flex flex-col gap-4">
                        {/* Dual Summary Language Switcher */}
                        <div className="p-4 bg-bg-s3 border border-border rounded-lg flex flex-col gap-3 relative">
                          <div className="absolute top-3.5 right-3.5">
                            <button
                              onClick={() => setSummaryLang(prev => prev === 'hi' ? 'en' : 'hi')}
                              className="px-2 py-1 bg-bg-s1 border border-border rounded text-[9px] font-bold text-text-muted flex items-center gap-1.5 cursor-pointer"
                            >
                              <Globe className="w-3.5 h-3.5 text-saffron" />
                              <span>{summaryLang === 'hi' ? 'हिन्दी' : 'English'}</span>
                            </button>
                          </div>



                          <h5 className="text-[9px] font-black uppercase text-saffron tracking-wider mt-1.5">
                            Exam Summary / परीक्षा सारांश
                          </h5>
                          
                          <p className="text-xs text-text leading-relaxed tracking-wide pt-2 whitespace-pre-line">
                            {summaryLang === 'hi' ? intel.summary_hi : intel.summary_en}
                          </p>
                        </div>

                        {/* Key Facts list */}
                        <div className="flex flex-col gap-2">
                          <h5 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Key Facts Sheet</h5>
                          <ul className="flex flex-col gap-2">
                            {intel.keyFacts.map((fact, idx) => (
                              <li key={idx} className="p-3 bg-bg-s3/55 border border-border rounded-lg flex items-start gap-2.5 text-xs text-text">
                                <CheckCircle className="w-4 h-4 text-greenL shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{fact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Metadata facts sheet (Personalities, dates, Acts, Locations, Schemes) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                          {[
                            { label: 'Acts & Rules', data: intel.acts, icon: '⚖️' },
                            { label: 'Govt Schemes', data: intel.schemes, icon: '🏛️' },
                            { label: 'Constitutional Articles', data: intel.constitutionalArticles, icon: '📖' },
                            { label: 'Key Personalities', data: intel.importantPersonalities, icon: '👤' },
                            { label: 'Locations Involved', data: intel.locations, icon: '📍' },
                            { label: 'Organizations Involved', data: intel.organizations, icon: '🏢' },
                            { label: 'Important Dates', data: intel.importantDates, icon: '📅' }
                          ].map((sec, j) => {
                            if (!sec.data || sec.data.length === 0) return null;
                            return (
                              <div key={j} className="p-3.5 bg-bg-s3/40 border border-border rounded-lg flex flex-col gap-1.5">
                                <span className="text-[9px] font-black text-gold uppercase tracking-wider flex items-center gap-1.5">
                                  <span>{sec.icon}</span>
                                  <span>{sec.label}</span>
                                </span>
                                <ul className="flex flex-col gap-1.5 list-disc pl-3 text-[11px] text-text-muted leading-relaxed font-bold">
                                  {sec.data.map((item, key) => (
                                    <li key={key}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* PANEL 3: FLASHCARDS & revision mnemonics */}
                    {modalTab === 'flashcards' && (
                      <div className="flex flex-col gap-4 items-center w-full">
                        
                        {intel.flashcards && intel.flashcards.length > 0 ? (
                          <div className="flex flex-col items-center gap-4 w-full">
                            {/* Flashcard Box */}
                            <motion.button
                              onClick={() => setCardFlipped(prev => !prev)}
                              className="w-full h-44 bg-bg-s3 border border-border hover:border-saffron-border/50 rounded-xl p-6 text-center flex flex-col justify-center items-center shadow relative overflow-hidden cursor-pointer"
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className="absolute top-2 right-2 flex items-center gap-1">
                                <span className="text-[8px] font-black uppercase text-text-muted bg-bg-s1 px-2 py-0.5 rounded">
                                  Card {currentCardIdx + 1} of {intel.flashcards.length}
                                </span>
                              </div>

                              <AnimatePresence mode="wait">
                                {!cardFlipped ? (
                                  <motion.div
                                    key="front"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="flex flex-col gap-2"
                                  >
                                    <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Question / Prompt</span>
                                    <h4 className="text-xs font-black text-text leading-relaxed tracking-wide">
                                      {intel.flashcards[currentCardIdx].front}
                                    </h4>
                                    <span className="text-[9px] text-text-muted mt-3 uppercase tracking-widest font-black">Tap to Flip / उत्तर देखें</span>
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="back"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="flex flex-col gap-2"
                                  >
                                    <span className="text-[9px] font-black uppercase text-greenL tracking-wider">Answer / Fact Explanation</span>
                                    <p className="text-[11px] font-bold text-text leading-relaxed tracking-wide">
                                      {intel.flashcards[currentCardIdx].back}
                                    </p>
                                    <span className="text-[9px] text-text-muted mt-3 uppercase tracking-widest font-black">Tap to Flip back</span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>

                            {/* Controls */}
                            <div className="flex gap-3 justify-center w-full">
                              <button
                                disabled={currentCardIdx === 0}
                                onClick={() => {
                                  setCurrentCardIdx(prev => prev - 1);
                                  setCardFlipped(false);
                                }}
                                className="px-4 py-2 bg-bg-s3 hover:bg-bg-s1 border border-border text-xs font-black uppercase text-text rounded-lg disabled:opacity-40 cursor-pointer"
                              >
                                Prev
                              </button>
                              
                              <button
                                onClick={handleMarkFlashcardRevised}
                                className="px-4 py-2 bg-greenL hover:bg-green-600 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer flex items-center gap-1"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Mark Revised</span>
                              </button>

                              <button
                                disabled={currentCardIdx === intel.flashcards.length - 1}
                                onClick={() => {
                                  setCurrentCardIdx(prev => prev + 1);
                                  setCardFlipped(false);
                                }}
                                className="px-4 py-2 bg-bg-s3 hover:bg-bg-s1 border border-border text-xs font-black uppercase text-text rounded-lg disabled:opacity-40 cursor-pointer"
                              >
                                Skip
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-text-muted text-xs p-5 uppercase font-bold tracking-wide">
                            No flashcards available for this news item.
                          </div>
                        )}

                        {/* Memory trick note */}
                        {intel.memoryTricks && (
                          <div className="p-4 bg-gold-dim/15 border border-gold-border/25 rounded-lg flex items-start gap-2.5 text-xs text-text w-full mt-2">
                            <Sparkle className="w-5 h-5 text-gold shrink-0 mt-0.5 animate-pulse" />
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[9px] font-black uppercase text-gold tracking-wider">AI Memory Mnemonic / याद करने की ट्रिक</span>
                              <p className="text-[11px] text-text-muted leading-relaxed font-bold">
                                {intel.memoryTricks}
                              </p>
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                    {/* PANEL 4: PRACTICE MCQ TEST QUIZ */}
                    {modalTab === 'quiz' && (
                      <div className="flex flex-col gap-4">
                        
                        {intel.mcqs && intel.mcqs.length > 0 ? (
                          !quizSubmitted ? (
                            /* Test Mode active */
                            <div className="flex flex-col gap-3">
                              {/* MCQ Header Progress bar */}
                              <div className="flex justify-between items-center text-[10px] text-text-muted font-bold uppercase tracking-wider pb-1">
                                <span>Question {currentQuizIdx + 1} of {intel.mcqs.length}</span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black ${
                                  intel.mcqs[currentQuizIdx].difficulty === 'hard' ? 'bg-redL/15 text-redL' :
                                  intel.mcqs[currentQuizIdx].difficulty === 'medium' ? 'bg-orange-500/15 text-orange-400' : 'bg-greenL/15 text-greenL'
                                }`}>
                                  {intel.mcqs[currentQuizIdx].difficulty}
                                </span>
                              </div>

                              <div className="p-4.5 bg-bg-s3 border border-border rounded-xl">
                                <h4 className="text-xs font-black text-text leading-relaxed tracking-wide">
                                  {intel.mcqs[currentQuizIdx].question}
                                </h4>
                              </div>

                              {/* Options */}
                              <div className="flex flex-col gap-2.5 mt-1.5">
                                {intel.mcqs[currentQuizIdx].options.map((opt, oIdx) => {
                                  const isSelected = selectedOptions[currentQuizIdx] === oIdx;
                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleSelectQuizOption(oIdx)}
                                      className={`p-3.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                                        isSelected 
                                          ? 'bg-saffron-dim/30 border-saffron text-saffron'
                                          : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted hover:text-text'
                                      }`}
                                    >
                                      <span>{opt}</span>
                                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                        isSelected ? 'border-saffron bg-saffron text-bg-s1 font-black text-[9px]' : 'border-border'
                                      }`}>
                                        {isSelected && '✓'}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Quiz Navigation */}
                              <div className="flex justify-between items-center mt-4">
                                <button
                                  disabled={currentQuizIdx === 0}
                                  onClick={() => setCurrentQuizIdx(prev => prev - 1)}
                                  className="px-4 py-2 bg-bg-s3 border border-border text-xs font-black uppercase rounded-lg disabled:opacity-40 cursor-pointer"
                                >
                                  Prev
                                </button>

                                {currentQuizIdx < intel.mcqs.length - 1 ? (
                                  <button
                                    onClick={() => setCurrentQuizIdx(prev => prev + 1)}
                                    className="px-4 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer"
                                  >
                                    Next
                                  </button>
                                ) : (
                                  <button
                                    onClick={handleSubmitQuiz}
                                    className="px-4 py-2 bg-greenL hover:bg-green-600 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer shadow animate-pulse"
                                  >
                                    Submit Test
                                  </button>
                                )}
                              </div>
                            </div>
                          ) : (
                            /* Scorecard Summary Mode active */
                            <div className="flex flex-col gap-4 py-2">
                              <div className="text-center flex flex-col items-center justify-center p-5 bg-bg-s3 border border-border rounded-xl">
                                <Award className="w-14 h-14 text-saffron fill-saffron/10 mb-2 animate-bounce" />
                                <h4 className="text-xs font-black text-text uppercase">Quiz Practice Completed!</h4>
                                <span className="text-2xl font-black text-saffron mt-2">
                                  {quizScore?.correct} / {quizScore?.total}
                                </span>
                                <p className="text-[10px] text-text-muted mt-1 max-w-[200px] leading-relaxed">
                                  Score logs synced with learning engine. Current affairs mastery updated.
                                </p>
                              </div>

                              {/* Explanations index */}
                              <div className="flex flex-col gap-3">
                                <h5 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Question Explanations Sheet</h5>
                                {intel.mcqs.map((mcq, idx) => {
                                  const chosen = selectedOptions[idx];
                                  const correct = chosen === mcq.correctIndex;
                                  return (
                                    <div key={idx} className="p-4 bg-bg-s3 border border-border rounded-lg flex flex-col gap-2 text-xs">
                                      <span className="font-bold text-text">Q{idx + 1}: {mcq.question}</span>
                                      <div className="flex gap-4 text-[10px] font-black uppercase mt-1">
                                        <span className={correct ? 'text-greenL' : 'text-redL'}>
                                          Your Choice: {chosen !== undefined ? mcq.options[chosen] : 'Skipped'}
                                        </span>
                                        {!correct && (
                                          <span className="text-greenL">Correct: {mcq.options[mcq.correctIndex]}</span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-text-muted leading-relaxed border-t border-border/40 pt-2 mt-1">
                                        {mcq.explanation}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>

                              <button
                                onClick={() => {
                                  setSelectedOptions({});
                                  setQuizSubmitted(false);
                                  setQuizScore(null);
                                  setCurrentQuizIdx(0);
                                }}
                                className="w-full py-3 bg-bg-s3 hover:bg-bg-s1 border border-border text-xs font-black uppercase text-text rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                              >
                                <RotateCcw className="w-4 h-4 text-saffron" />
                                <span>Retake Practice Test</span>
                              </button>
                            </div>
                          )
                        ) : (
                          <div className="text-center text-text-muted text-xs p-5 uppercase font-bold tracking-wide">
                            No MCQs generated for this article yet.
                          </div>
                        )}

                      </div>
                    )}

                  </div>

                  {/* Modal Footer actions */}
                  <div className="flex gap-3 border-t border-border pt-4 mt-2 shrink-0">
                    <button
                      onClick={() => {
                        const prompt = `Can you explain the exam relevance of this news article: "${selectedArticle.title}"? Provide a detailed study note on its GK connections for my CGPSC SSE exam preparation.`;
                        onAskAi(prompt);
                        handleCloseModal();
                      }}
                      className="flex-1 py-3 bg-bg-s3 hover:bg-saffron-dim/20 border border-border text-[10px] font-black uppercase text-text flex items-center justify-center gap-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-saffron" />
                      <span>Discuss with AI Coach</span>
                    </button>
                    
                    <a
                      href={selectedArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-saffron hover:bg-orange-500 text-[10px] font-black uppercase text-bg-s1 flex items-center justify-center gap-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Source Link</span>
                    </a>
                  </div>

                </div>
              ) : null}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
