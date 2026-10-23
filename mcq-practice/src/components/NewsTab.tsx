import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Search, Calendar, Globe, 
  ExternalLink, MessageSquare, Info, ShieldAlert,
  Award, CheckCircle, Brain, Clock,
  ChevronRight, Bookmark,
  Trophy,
  RotateCcw, Flame, BookOpen, Sparkle, ChevronDown,
  Printer, X, ArrowLeft, ArrowRight
} from 'lucide-react';
import { getApiUrl } from '../utils/api';

export interface CapsuleQuizQuestion {
  articleTitle: string;
  category: string;
  question: string;
  question_hi?: string;
  options: string[];
  options_hi?: string[];
  correctIndex: number;
  explanation: string;
  explanation_hi?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface Article {
  title: string;
  title_hi?: string;
  description?: string;
  description_hi?: string;
  summary?: string;
  summary_hi?: string;
  history?: string;
  history_hi?: string;
  historicalContext?: string;
  historicalContext_hi?: string;
  category: string;
  source: string;
  url: string;
  date?: string;
  state?: string;
  tags?: string[];
  icon?: string;
  recommendationScore?: number;
}

interface MCQ {
  question: string;
  question_hi?: string;
  options: string[];
  options_hi?: string[];
  correctIndex: number;
  explanation: string;
  explanation_hi?: string;
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
  history?: string;
  history_hi?: string;
  history_en?: string;
  historicalContext?: string;
  historicalContext_hi?: string;
  keyFacts: string[];
  keyFacts_en?: string[];
  keyFacts_hi?: string[];
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
  onOpenAuth?: () => void;
}

export const NewsTab: React.FC<NewsTabProps> = ({ currentUser, onAskAi, initialArticle, onClearInitialArticle, onOpenAuth }) => {
  const [activeSubTab, setActiveSubTab] = useState<'hub' | 'capsules' | 'analytics' | 'saved'>('hub');
  
  // Hub states
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

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

  // Dedicated Revision Capsule Quiz state
  const [isCapsuleQuizOpen, setIsCapsuleQuizOpen] = useState<boolean>(false);
  const [capsuleQuestions, setCapsuleQuestions] = useState<CapsuleQuizQuestion[]>([]);
  const [currentCapsuleQIdx, setCurrentCapsuleQIdx] = useState<number>(0);
  const [capsuleAnswers, setCapsuleAnswers] = useState<Record<number, number>>({});
  const [capsuleQuizSubmitted, setCapsuleQuizSubmitted] = useState<boolean>(false);
  const [capsuleScore, setCapsuleScore] = useState<{ correct: number; total: number } | null>(null);
  const [capsuleQuizLang, setCapsuleQuizLang] = useState<'hi' | 'en'>('hi');



  const [openTime, setOpenTime] = useState<number | null>(null);

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
      // Analytics will refresh automatically when user navigates to Analytics tab
    } catch (e) {
      console.warn('Failed to log interaction', e);
    }
  };

  // Save Bookmarks
  const handleSaveArticle = async (article: Article) => {
    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
      else alert('Please log in or sign up to bookmark notes.');
      return;
    }

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
    // Only set loading to true if we don't have articles in state/localStorage already
    const cached = localStorage.getItem('cg_cached_news');
    let hasLocalCache = false;
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 1) {
          hasLocalCache = true;
        }
      } catch (e) {}
    }
    if (!hasLocalCache) {
      setLoading(true);
    }
    setError('');
    try {
      const res = await fetch(getApiUrl(`/api/news?t=${Date.now()}`));
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.articles)) {
          setArticles(data.articles);
          localStorage.setItem('cg_cached_news', JSON.stringify(data.articles));
        }
      } else {
        throw new Error('Failed to fetch general feed');
      }
    } catch (err: any) {
      console.error('[News Fetch Error]:', err);
      // Only set error if we don't have cached articles
      if (!hasLocalCache && articles.length === 0) {
        setError('Could not retrieve current affairs updates.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch Capsules Data
  const fetchCapsules = async (force: boolean = false) => {
    const cachedCapsules = localStorage.getItem('cg_cached_news_capsules');
    let hasCapsuleCache = false;
    if (cachedCapsules && !force) {
      try {
        const parsed = JSON.parse(cachedCapsules);
        if (parsed && (parsed.daily?.length || parsed.monthly?.length)) {
          setCapsuleData(parsed);
          hasCapsuleCache = true;
        }
      } catch (e) {}
    }
    if (!hasCapsuleCache) {
      setLoadingCapsules(true);
    }
    try {
      const res = await fetch(getApiUrl(`/api/news/capsules?_t=${Date.now()}`));
      if (res.ok) {
        const data = await res.json();
        if (data && (data.daily || data.monthly || data.yearly)) {
          setCapsuleData(data);
          localStorage.setItem('cg_cached_news_capsules', JSON.stringify(data));
        }
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

  // Load Initial Data
  useEffect(() => {
    // Instant local load from localStorage to minimize app loading time
    const cached = localStorage.getItem('cg_cached_news');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 1) {
          setArticles(parsed);
          setLoading(false);
        }
      } catch (e) {}
    }
    const cachedCapsules = localStorage.getItem('cg_cached_news_capsules');
    if (cachedCapsules) {
      try {
        const parsed = JSON.parse(cachedCapsules);
        if (parsed) setCapsuleData(parsed);
      } catch (e) {}
    }

    fetchNews();
    if (currentUser) {
      fetchAnalytics();
    }
    const saved = localStorage.getItem('cg_saved_articles');
    if (saved) {
      try {
        setSavedArticles(JSON.parse(saved));
      } catch (e) {}
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
    if (activeSubTab === 'capsules') {
      fetchCapsules();
    }
    if (activeSubTab === 'analytics' && !analyticsData) {
      fetchAnalytics();
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
    setOpenTime(Date.now());

    // Track article read for daily tasks locally (synced during regular user sync)
    try {
      const todayKey = new Date().toISOString().split('T')[0];
      const readStored = JSON.parse(localStorage.getItem(`cg_read_articles_${todayKey}`) || '[]');
      if (!readStored.includes(article.title)) {
        const updated = [...readStored, article.title];
        localStorage.setItem(`cg_read_articles_${todayKey}`, JSON.stringify(updated));
      }
    } catch (e) {
      console.warn(e);
    }

    // Instant Optimization: Check if pre-generated intelligence is attached directly to the article
    if ((article as any).intelligence) {
      setIntel((article as any).intelligence);
      setLoadingIntel(false);
      return;
    }

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

  const getCategoryIcon = (category?: string) => {
    if (!category) return '📰';
    const cat = category.toLowerCase();
    if (cat.includes('chhattisgarh') || cat.includes('cg')) return '🏔️';
    if (cat.includes('national')) return '🇮🇳';
    if (cat.includes('international')) return '🌍';
    if (cat.includes('polity') || cat.includes('governance')) return '⚖️';
    if (cat.includes('economy') || cat.includes('budget') || cat.includes('business')) return '📈';
    if (cat.includes('science') || cat.includes('tech')) return '🔬';
    if (cat.includes('environment')) return '🌿';
    if (cat.includes('sport')) return '🏏';
    if (cat.includes('award')) return '🏆';
    if (cat.includes('scheme') || cat.includes('yojana')) return '🏛️';
    if (cat.includes('agriculture')) return '🌾';
    if (cat.includes('report') || cat.includes('index')) return '📊';
    return '📰';
  };

  const isJobCategory = (cat?: string) => {
    if (!cat) return false;
    const c = cat.toLowerCase();
    return c === 'jobs' || c === 'job' || c === 'job_alert' || c === 'recruitment';
  };

  // Filter lists based on Search & Category
  const getFilteredList = (list: Article[]) => {
    return list.filter(art => {
      if (isJobCategory(art.category)) return false;
      const cat = (art.category || '').toLowerCase();
      const state = (art.state || '').toLowerCase();
      const titleText = (
        (art.title || '') + ' ' + 
        (art.title_hi || '') + ' ' + 
        (art.description || '') + ' ' + 
        (art.description_hi || '') + ' ' +
        (art.tags ? art.tags.join(' ') : '')
      ).toLowerCase();

      let matchesCategory = activeCategory === 'all';
      if (!matchesCategory) {
        if (cat.includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(cat)) {
          matchesCategory = true;
        } else if (activeCategory === 'chhattisgarh') {
          matchesCategory = state === 'cg' || state.includes('chhattisgarh') || /छत्तीसगढ़|raipur|chhattisgarh|bilaspur|bastar|durg/i.test(titleText);
        } else if (activeCategory === 'scheme') {
          matchesCategory = /scheme|योजना|अभियान|portal|mission/i.test(titleText) || cat.includes('scheme');
        } else if (activeCategory === 'economy') {
          matchesCategory = /अर्थव्यवस्था|बजट|economy|budget|gdp|tax|bank|rbi|finance|business/i.test(titleText) || cat.includes('economy') || cat.includes('business');
        } else if (activeCategory === 'polity') {
          matchesCategory = /polity|संविधान|न्यायालय|court|act|bill|ordinance|election|governance/i.test(titleText) || cat.includes('polity') || cat.includes('governance');
        } else if (activeCategory === 'national') {
          matchesCategory = state === 'national' || state === 'india' || state === 'all' || /national|भारत|केन्द्रीय|india/i.test(titleText);
        }
      }

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || titleText.includes(query);
      return matchesCategory && matchesSearch;
    });
  };

  const displayFeed = articles.filter(art => !isJobCategory(art.category));
  const filteredArticles = getFilteredList(displayFeed);

  // Chunked lazy loading (Infinite scroll)
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery, activeCategory, activeSubTab]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        setVisibleCount(prev => prev + 10);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, filteredArticles.length]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);

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

  // Effective capsules with resilient fallback from articles pool
  const getEffectiveCapsules = () => {
    const baseArticles = articles.filter(art => !isJobCategory(art.category));
    const daily = (capsuleData?.daily && capsuleData.daily.length > 0)
      ? capsuleData.daily
      : baseArticles.slice(0, 15);
    const weekly = (capsuleData?.weekly && capsuleData.weekly.length > 0)
      ? capsuleData.weekly
      : baseArticles.slice(0, 30);
    const monthly = (capsuleData?.monthly && capsuleData.monthly.length > 0)
      ? capsuleData.monthly
      : baseArticles;
    const yearly = (capsuleData?.yearly && capsuleData.yearly.length > 0)
      ? capsuleData.yearly
      : baseArticles;

    return { daily, weekly, monthly, yearly };
  };

  const effectiveCapsules = getEffectiveCapsules();
  const currentCapsuleArticles = effectiveCapsules[activeCapsuleFilter] || [];

  // Start dedicated Capsule Revision Quiz
  const handleStartCapsuleQuiz = () => {
    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
      else alert('Please log in or sign up to take revision quizzes.');
      return;
    }

    const currentList = currentCapsuleArticles;
    if (currentList.length === 0) {
      alert('No articles available in this capsule.');
      return;
    }

    // Collect all MCQs from articles in this capsule
    const collected: CapsuleQuizQuestion[] = [];
    currentList.forEach(art => {
      const mcqs = (art as any).intelligence?.mcqs || (art as any).mcqs || [];
      mcqs.forEach((mcq: any) => {
        if (mcq.question || mcq.question_hi) {
          collected.push({
            articleTitle: art.title_hi || art.title,
            category: art.category,
            question: mcq.question || mcq.question_hi || '',
            question_hi: mcq.question_hi || mcq.question || '',
            options: mcq.options || mcq.options_hi || [],
            options_hi: mcq.options_hi || mcq.options || [],
            correctIndex: typeof mcq.correctIndex === 'number' ? mcq.correctIndex : 0,
            explanation: mcq.explanation || mcq.explanation_hi || '',
            explanation_hi: mcq.explanation_hi || mcq.explanation || '',
            difficulty: mcq.difficulty || 'medium'
          });
        }
      });
    });

    if (collected.length === 0) {
      // Fallback if articles don't have embedded intelligence mcqs
      setSelectedArticle(currentList[0]);
      fetchArticleIntelligence(currentList[0]);
      setTimeout(() => setModalTab('quiz'), 400);
      return;
    }

    // Shuffle and pick up to 15 questions for a focused revision test
    const shuffled = [...collected].sort(() => 0.5 - Math.random()).slice(0, 15);
    setCapsuleQuestions(shuffled);
    setCurrentCapsuleQIdx(0);
    setCapsuleAnswers({});
    setCapsuleQuizSubmitted(false);
    setCapsuleScore(null);
    setIsCapsuleQuizOpen(true);
  };

  const handleSelectCapsuleOption = (optIdx: number) => {
    if (capsuleQuizSubmitted) return;
    setCapsuleAnswers(prev => ({
      ...prev,
      [currentCapsuleQIdx]: optIdx
    }));
  };

  const handleSubmitCapsuleQuiz = () => {
    let correct = 0;
    capsuleQuestions.forEach((q, idx) => {
      if (capsuleAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    const finalScore = { correct, total: capsuleQuestions.length };
    setCapsuleScore(finalScore);
    setCapsuleQuizSubmitted(true);

    // Sync score into analytics
    logInteraction(
      `${activeCapsuleFilter.toUpperCase()} Capsule Revision Quiz`,
      'mcq_attempt',
      capsuleQuestions.length * 25,
      finalScore
    );
  };

  const handleGenerateStudyPdf = () => {
    const currentList = currentCapsuleArticles;
    if (currentList.length === 0) {
      alert('No articles available to generate PDF.');
      return;
    }

    const capsuleTitleMap: Record<string, string> = {
      daily: 'दैनिक समसामयिकी रिवीजन कैप्सूल (Daily Capsule)',
      weekly: 'साप्ताहिक समसामयिकी रिवीजन कैप्सूल (Weekly Capsule)',
      monthly: 'मासिक समसामयिकी महा-डाइजेस्ट (Monthly Capsule)',
      yearly: 'वार्षिक समसामयिकी संदर्भ पुस्तिका (Yearly Book)'
    };
    const capsuleTitle = capsuleTitleMap[activeCapsuleFilter] || 'करेंट अफेयर्स रिवीजन कैप्सूल';

    const articlesHtml = currentList.map((art, idx) => {
      const title = art.title_hi || art.title;
      const summary = art.summary_hi || art.description_hi || art.summary || art.description || '';
      const history = (art as any).history_hi || (art as any).history || (art as any).historicalContext_hi || (art as any).historicalContext || '';
      const intelData = (art as any).intelligence;
      const keyFacts = (intelData?.keyFacts_hi || intelData?.keyFacts || []).slice(0, 4);
      const mcqs = (intelData?.mcqs || []).slice(0, 2);

      return `
        <div class="article-box">
          <div class="article-header">
            <span class="badge category">${art.category || 'GK'}</span>
            <span class="meta">${art.date || ''} • ${art.source || 'CG GURU'}</span>
          </div>
          <h3 class="article-title">${idx + 1}. ${title}</h3>
          <p class="article-summary">${summary}</p>
          
          ${history ? `
            <div class="history-box">
              <strong>📜 ऐतिहासिक संदर्भ एवं पृष्ठभूमि:</strong>
              <p>${history}</p>
            </div>
          ` : ''}

          ${keyFacts.length > 0 ? `
            <div class="facts-section">
              <strong>📌 महत्वपूर्ण परीक्षा तथ्य:</strong>
              <ul>
                ${keyFacts.map((f: string) => `<li>${f}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${mcqs.length > 0 ? `
            <div class="mcq-preview">
              <strong>🎯 अभ्यास प्रश्न:</strong>
              ${mcqs.map((m: any) => `
                <div class="mini-mcq">
                  <p><strong>प्र. ${m.question_hi || m.question}</strong></p>
                  <div class="mcq-opts">
                    ${(m.options_hi || m.options || []).map((opt: string, oIdx: number) => `
                      <span class="opt ${oIdx === m.correctIndex ? 'correct-opt' : ''}">(${String.fromCharCode(65 + oIdx)}) ${opt}</span>
                    `).join(' ')}
                  </div>
                  <p class="ans-exp"><strong>उत्तर:</strong> (${String.fromCharCode(65 + m.correctIndex)}) ${(m.options_hi || m.options)[m.correctIndex]} — <em>${m.explanation_hi || m.explanation || ''}</em></p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="hi">
        <head>
          <meta charset="utf-8">
          <title>${capsuleTitle} - CG GURU</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 portrait;
              margin: 12mm 12mm 14mm 12mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              margin: 0;
              padding: 16px;
              font-family: 'Noto Sans Devanagari', 'Inter', sans-serif;
              color: #1E293B;
              background: #FFFFFF;
              font-size: 10pt;
              line-height: 1.6;
            }
            .header-banner {
              border-bottom: 2.5px solid #F97316;
              padding-bottom: 12px;
              margin-bottom: 18px;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }
            .title-area h1 {
              margin: 0;
              font-size: 17pt;
              color: #C2410C;
              font-weight: 800;
            }
            .title-area h2 {
              margin: 4px 0 0 0;
              font-size: 12pt;
              color: #334155;
              font-weight: 600;
            }
            .badge-row {
              margin-top: 6px;
              display: flex;
              gap: 8px;
              font-size: 8.5pt;
              color: #64748B;
              font-weight: 600;
            }
            .org-badge {
              text-align: right;
              font-size: 9pt;
              font-weight: 800;
              color: #F97316;
            }
            .org-sub {
              font-size: 8pt;
              color: #64748B;
              font-weight: 600;
            }
            .digest-box {
              background: #FFF7ED;
              border: 1px solid #FFEDD5;
              border-left: 4px solid #F97316;
              padding: 10px 14px;
              border-radius: 6px;
              margin-bottom: 18px;
              font-size: 9.5pt;
              color: #9A3412;
            }
            .article-box {
              border: 1px solid #E2E8F0;
              border-radius: 8px;
              padding: 14px;
              margin-bottom: 14px;
              page-break-inside: avoid;
              background: #FAFAFA;
            }
            .article-header {
              display: flex;
              justify-content: space-between;
              font-size: 8pt;
              margin-bottom: 6px;
            }
            .badge.category {
              background: #FFEDD5;
              color: #C2410C;
              padding: 2px 8px;
              border-radius: 4px;
              font-weight: 800;
              text-transform: uppercase;
            }
            .meta {
              color: #64748B;
              font-weight: 600;
            }
            .article-title {
              margin: 4px 0 8px 0;
              font-size: 11pt;
              color: #0F172A;
              font-weight: 800;
              line-height: 1.4;
            }
            .article-summary {
              margin: 0 0 8px 0;
              font-size: 9pt;
              color: #334155;
              line-height: 1.5;
            }
            .history-box {
              background: #FEF3C7;
              border: 1px solid #FDE68A;
              padding: 8px 10px;
              border-radius: 6px;
              font-size: 8.5pt;
              color: #92400E;
              margin: 8px 0;
            }
            .history-box strong {
              display: block;
              margin-bottom: 2px;
            }
            .history-box p {
              margin: 0;
            }
            .facts-section {
              background: #F1F5F9;
              padding: 8px 12px;
              border-radius: 6px;
              margin: 8px 0;
              font-size: 8.5pt;
            }
            .facts-section strong {
              color: #1E293B;
            }
            .facts-section ul {
              margin: 4px 0 0 0;
              padding-left: 18px;
            }
            .facts-section li {
              margin-bottom: 3px;
              color: #334155;
            }
            .mcq-preview {
              border-top: 1px dashed #CBD5E1;
              padding-top: 8px;
              margin-top: 8px;
              font-size: 8.5pt;
            }
            .mini-mcq {
              margin-top: 6px;
              padding: 6px 8px;
              background: #FFFFFF;
              border: 1px solid #E2E8F0;
              border-radius: 6px;
            }
            .mini-mcq p {
              margin: 0 0 4px 0;
              color: #0F172A;
            }
            .mcq-opts {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              font-size: 8pt;
              color: #475569;
              margin-bottom: 4px;
            }
            .correct-opt {
              font-weight: bold;
              color: #15803D;
            }
            .ans-exp {
              font-size: 7.5pt;
              color: #166534;
              background: #DCFCE7;
              padding: 4px 6px;
              border-radius: 4px;
              margin: 2px 0 0 0 !important;
            }
            .footer {
              margin-top: 20px;
              border-top: 1px solid #E2E8F0;
              padding-top: 8px;
              display: flex;
              justify-content: space-between;
              font-size: 8pt;
              color: #94A3B8;
            }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <div class="title-area">
              <h1>CG GURU — AI PREP PLATFORM</h1>
              <h2>${capsuleTitle}</h2>
              <div class="badge-row">
                <span>📅 संकलन दिनांक: ${new Date().toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>📚 कुल लेख: ${currentList.length}</span>
                <span>•</span>
                <span>🎯 लक्ष्य: CGPSC SSE, Vyapam & State Exams</span>
              </div>
            </div>
            <div class="org-badge">
              <div>CG GURU</div>
              <div class="org-sub">Study Smart with AI</div>
            </div>
          </div>

          <div class="digest-box">
            <strong>💡 AI कैप्सूल रिवीजन सारांश:</strong>
            ${
              activeCapsuleFilter === 'daily' ? 'दैनिक समसामयिकी त्वरित रिवीजन: छत्तीसगढ़ एवं राष्ट्रीय स्तर के प्रमुख घटनाक्रम, सरकारी योजनाएं, नवीनतम नियुक्तियां एवं मुख्य परीक्षा हेतु उपयोगी तथ्यों का संकलन।' :
              activeCapsuleFilter === 'weekly' ? 'साप्ताहिक समसामयिकी संकलन: पिछले 7 दिनों के अति-महत्वपूर्ण नीतिगत निर्णय, आर्थिक समीक्षा, राज्य स्तरीय योजनाएं तथा प्रतियोगी परीक्षाओं हेतु महत्वपूर्ण प्रश्नोत्तरी।' :
              activeCapsuleFilter === 'monthly' ? 'मासिक समसामयिकी महा-डाइजेस्ट: पूरे माह के छत्तीसगढ़ बजट, संवैधानिक संशोधन, पुरस्कार, खेल, कृषि एवं आर्थिक सूचकांकों का संपूर्ण विस्तृत सार संग्रह।' :
              'वार्षिक संदर्भ पुस्तिका: विगत वर्ष के सभी ऐतिहासिक परिदृश्य, आयोग द्वारा पूछे जाने वाले संभावित प्रश्न, राज्य के मुख्य घटनाक्रम एवं परीक्षा उपयोगी तथ्य।'
            }
          </div>

          ${articlesHtml}

          <div class="footer">
            <span>CG GURU Exam Prep Platform • https://cg-guru.web.app</span>
            <span>रिवीजन सामग्री • सर्वाधिकार सुरक्षित</span>
          </div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        try {
          document.body.removeChild(iframe);
        } catch (_) {}
      }, 2000);
    }, 400);
  };



  return (
    <div className="flex flex-col gap-5 w-full text-text pb-12 font-sans relative">
      




      {/* 3. Section Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-0.5 shrink-0 overflow-x-auto no-scrollbar font-bold">
        {[
          { id: 'hub', label: 'News Intelligence', icon: Newspaper },
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
                  <span>Trending for Exam</span>
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
                        <h5 className="text-sm font-bold leading-relaxed line-clamp-2 text-text animate-fade-in" title={art.title_hi || art.title}>
                          {art.title_hi || art.title}
                        </h5>
                        <p className="text-xs text-text/90 font-medium leading-relaxed bg-bg-s3/60 border border-border/50 p-2 rounded-lg whitespace-pre-line">
                          {art.description_hi || art.summary_hi || art.description || art.summary || art.title}
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
                Latest Current Affairs Feed
              </h4>

              {loading ? (
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
                  {displayedArticles.map((art, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setSelectedArticle(art);
                        fetchArticleIntelligence(art);
                      }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min((idx % 10) * 0.04, 0.3) }}
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

                      <h4 className="text-sm font-bold text-text group-hover:text-saffron transition-colors leading-normal line-clamp-2 animate-fade-in" title={art.title_hi || art.title}>
                        {art.title_hi || art.title}
                      </h4>

                      <p className="text-xs text-text/90 font-medium leading-relaxed bg-bg-s3/60 border border-border/50 p-2.5 rounded-lg whitespace-pre-line">
                        {art.description_hi || art.summary_hi || art.description || art.summary || art.title}
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

                  {visibleCount < filteredArticles.length && (
                    <div ref={loadMoreRef} className="col-span-1 md:col-span-2 py-4 flex flex-col items-center justify-center gap-2">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 10)}
                        className="px-5 py-2.5 bg-bg-s2 hover:bg-bg-s3 border border-border hover:border-saffron text-xs font-black uppercase text-saffron rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
                      >
                        <ChevronDown className="w-4 h-4" />
                        <span>Load More Updates ({filteredArticles.length - visibleCount} remaining)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
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
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-text uppercase">Current Affairs Revision System</h4>
                  <button
                    onClick={() => fetchCapsules(true)}
                    className="p-1 rounded text-text-muted hover:text-saffron hover:bg-bg-s3 transition-colors cursor-pointer"
                    title="Refresh Capsules Data"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${loadingCapsules ? 'animate-spin text-saffron' : ''}`} />
                  </button>
                </div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Daily, Weekly, Monthly, and Yearly Capsules automatically compiled from scraped resources.
                </p>
              </div>

              {/* Capsule length filter with real counts */}
              <div className="flex bg-bg-s3 border border-border p-1 rounded-lg shrink-0 overflow-x-auto no-scrollbar">
                {[
                  { id: 'daily', label: 'Daily Capsule', count: effectiveCapsules.daily.length },
                  { id: 'weekly', label: 'Weekly Capsule', count: effectiveCapsules.weekly.length },
                  { id: 'monthly', label: 'Monthly Capsule', count: effectiveCapsules.monthly.length },
                  { id: 'yearly', label: 'Yearly Book', count: effectiveCapsules.yearly.length }
                ].map(capFilter => (
                  <button
                    key={capFilter.id}
                    onClick={() => setActiveCapsuleFilter(capFilter.id as any)}
                    className={`px-3 py-1.5 text-[10px] font-black uppercase rounded cursor-pointer whitespace-nowrap flex items-center gap-1.5 transition-all ${
                      activeCapsuleFilter === capFilter.id
                        ? 'bg-saffron text-bg-s1 font-black shadow-sm'
                        : 'text-text-muted hover:text-text'
                    }`}
                  >
                    <span>{capFilter.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono leading-none ${
                      activeCapsuleFilter === capFilter.id ? 'bg-bg-s1/20 text-bg-s1 font-bold' : 'bg-bg-s2 text-text-muted'
                    }`}>
                      {capFilter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {loadingCapsules && currentCapsuleArticles.length === 0 ? (
              <div className="flex flex-col gap-3 py-10 items-center justify-center text-text-muted">
                <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Generating revision packet...</span>
              </div>
            ) : currentCapsuleArticles.length > 0 ? (
              <div className="flex flex-col gap-4">
                {/* Digest card */}
                <div className="p-5 bg-gradient-to-br from-bg-s2 to-bg-s3 border border-border rounded-xl flex flex-col gap-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-dim/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📚</span>
                    <div className="flex flex-col">
                      <h4 className="text-xs font-black uppercase text-gold">AI revision summary digest</h4>
                      <span className="text-[9px] text-text-muted font-bold">{currentCapsuleArticles.length} Articles included</span>
                    </div>
                  </div>
                  <p className="text-sm text-text leading-relaxed tracking-wide pt-1">
                    {activeCapsuleFilter === 'daily' && 'दैनिक त्वरित रिवीजन: छत्तीसगढ़ एवं राष्ट्रीय समसामयिकी के मुख्य बिंदु, नई सरकारी योजनाएं, सचिवालयीन नियुक्तियां और नवीनतम परीक्षा उपयोगी तथ्यों का संकलन।'}
                    {activeCapsuleFilter === 'weekly' && 'साप्ताहिक रिवीजन डाइजेस्ट: विगत 7 दिनों के प्रमुख नीतिगत निर्णय, आर्थिक समीक्षा, राज्य बजट आवंटन और परीक्षा में संभावित प्रश्नोत्तर।'}
                    {activeCapsuleFilter === 'monthly' && 'Monthly Digest: Main focus is on budget sessions, financial allocations across core areas, environment policies, and agriculture yield patterns in Chhattisgarh plains.'}
                    {activeCapsuleFilter === 'yearly' && 'वार्षिक संदर्भ पुस्तिका: पूरे वर्ष की प्रमुख नियुक्तियां, पुरस्कार, खेलकूद, राष्ट्रीय सूचकांक और CGPSC SSE व व्यापम हेतु अति-महत्वपूर्ण तथ्य।'}
                  </p>

                  <div className="flex gap-3 border-t border-border/40 pt-3 mt-1 flex-wrap">
                    <button
                      onClick={handleStartCapsuleQuiz}
                      className="px-4 py-2.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors shadow flex items-center gap-1.5"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Take Revision Quiz</span>
                    </button>
                    <button
                      onClick={handleGenerateStudyPdf}
                      className="px-4 py-2.5 bg-bg-s1 hover:bg-bg-s1/90 border border-border text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 text-text"
                    >
                      <Printer className="w-3.5 h-3.5 text-saffron" />
                      <span>Generate Study PDF / Print</span>
                    </button>
                  </div>
                </div>

                {/* Capsule list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCapsuleArticles.map((art, idx) => (
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
                          <span>{art.date || (art as any).pubDate || 'Recent'}</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-text group-hover:text-saffron transition-colors leading-normal line-clamp-2 animate-fade-in" title={art.title_hi || art.title}>
                        {art.title_hi || art.title}
                      </h4>
                      <p className="text-xs text-text/90 font-medium leading-relaxed bg-bg-s3/60 border border-border/50 p-2.5 rounded-lg whitespace-pre-line">
                        {art.description_hi || art.summary_hi || art.description || art.summary || art.title}
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

                    <h4 className="text-sm font-bold text-text group-hover:text-saffron transition-colors leading-normal line-clamp-2 animate-fade-in" title={art.title_hi || art.title}>
                      {art.title_hi || art.title}
                    </h4>

                    <p className="text-xs text-text/90 font-medium leading-relaxed bg-bg-s3/60 border border-border/50 p-2.5 rounded-lg whitespace-pre-line">
                      {art.description_hi || art.summary_hi || art.description || art.summary || art.title}
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
                <h2 className="text-base font-black text-text leading-relaxed">
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
                            Exam Summary
                          </h5>
                          
                          <p className="text-sm text-text leading-relaxed tracking-wide pt-2 whitespace-pre-line">
                            {summaryLang === 'hi' ? intel.summary_hi : intel.summary_en}
                          </p>
                        </div>

                        {/* Historical Background & Context */}
                        {(intel.history_hi || intel.history || intel.history_en || intel.historicalContext_hi || intel.historicalContext || (selectedArticle as any)?.history_hi || (selectedArticle as any)?.history) && (
                          <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-lg flex flex-col gap-2 relative">
                            <h5 className="text-[9.5px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                              <span>📜</span>
                              <span>ऐतिहासिक पृष्ठभूमि एवं इतिहास (Historical Context & Origin)</span>
                            </h5>
                            <p className="text-xs text-text leading-relaxed tracking-wide whitespace-pre-line font-medium">
                              {summaryLang === 'hi'
                                ? (intel.history_hi || intel.historicalContext_hi || intel.history || intel.history_en || intel.historicalContext || (selectedArticle as any)?.history_hi || (selectedArticle as any)?.history)
                                : (intel.history || intel.history_en || intel.historicalContext || intel.history_hi || intel.historicalContext_hi || (selectedArticle as any)?.history || (selectedArticle as any)?.history_hi)
                              }
                            </p>
                          </div>
                        )}

                        {/* Key Facts list */}
                        <div className="flex flex-col gap-2">
                          <h5 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Key Facts Sheet</h5>
                          <ul className="flex flex-col gap-2">
                            {((summaryLang === 'hi' ? intel.keyFacts_hi : null) || intel.keyFacts_en || intel.keyFacts || []).map((fact: string, idx: number) => (
                              <li key={idx} className="p-3 bg-bg-s3/55 border border-border rounded-lg flex items-start gap-2.5 text-sm text-text">
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
                                <ul className="flex flex-col gap-1.5 list-disc pl-3 text-xs text-text-muted leading-relaxed font-bold">
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
                                <h4 className="text-sm font-black text-text leading-relaxed tracking-wide">
                                  {summaryLang === 'hi' && intel.mcqs[currentQuizIdx].question_hi ? intel.mcqs[currentQuizIdx].question_hi : intel.mcqs[currentQuizIdx].question}
                                </h4>
                              </div>

                              {/* Options */}
                              <div className="flex flex-col gap-2.5 mt-1.5">
                                {((summaryLang === 'hi' && intel.mcqs[currentQuizIdx].options_hi) ? intel.mcqs[currentQuizIdx].options_hi : intel.mcqs[currentQuizIdx].options).map((opt, oIdx) => {
                                  const isSelected = selectedOptions[currentQuizIdx] === oIdx;
                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleSelectQuizOption(oIdx)}
                                      className={`p-3.5 rounded-lg border text-left text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
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
                                    <div key={idx} className="p-4 bg-bg-s3 border border-border rounded-xl flex flex-col gap-2 text-sm">
                                      <span className="font-bold text-text">Q{idx + 1}: {summaryLang === 'hi' && mcq.question_hi ? mcq.question_hi : mcq.question}</span>
                                      <div className="flex gap-4 text-[10px] font-black uppercase mt-1">
                                        <span className={correct ? 'text-greenL' : 'text-redL'}>
                                          Your Choice: {chosen !== undefined ? ((summaryLang === 'hi' && mcq.options_hi) ? mcq.options_hi[chosen] : mcq.options[chosen]) : (summaryLang === 'hi' ? 'छोड़ दिया' : 'Skipped')}
                                        </span>
                                        {!correct && (
                                          <span className="text-greenL">Correct: {(summaryLang === 'hi' && mcq.options_hi) ? mcq.options_hi[mcq.correctIndex] : mcq.options[mcq.correctIndex]}</span>
                                        )}
                                      </div>
                                      <p className="text-xs text-text-muted leading-relaxed border-t border-border/40 pt-2 mt-1">
                                        {summaryLang === 'hi' && mcq.explanation_hi ? mcq.explanation_hi : mcq.explanation}
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

      {/* 6. Dedicated Capsule Revision Quiz Modal */}
      <AnimatePresence>
        {isCapsuleQuizOpen && capsuleQuestions.length > 0 && (
          <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md z-[999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-xl bg-bg-s2 border border-border rounded-xl shadow-2xl p-5 flex flex-col gap-4 max-h-[92vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-border pb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-saffron animate-bounce" />
                  <span className="text-[10px] font-black uppercase text-saffron bg-saffron-dim/30 px-2.5 py-0.5 rounded border border-saffron-border/30">
                    {activeCapsuleFilter.toUpperCase()} Revision Quiz • {capsuleQuestions.length} Questions
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCapsuleQuizLang(prev => prev === 'hi' ? 'en' : 'hi')}
                    className="px-2 py-1 bg-bg-s3 border border-border rounded text-[9px] font-bold text-text-muted hover:text-text flex items-center gap-1 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-saffron" />
                    <span>{capsuleQuizLang === 'hi' ? 'हिन्दी' : 'English'}</span>
                  </button>
                  <button
                    onClick={() => setIsCapsuleQuizOpen(false)}
                    className="p-1 rounded text-text-muted hover:text-text hover:bg-bg-s3 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!capsuleQuizSubmitted ? (
                /* Test in progress */
                <div className="flex flex-col gap-4">
                  {/* Progress info */}
                  <div className="flex justify-between items-center text-[10px] text-text-muted font-bold uppercase tracking-wider">
                    <span>Question {currentCapsuleQIdx + 1} of {capsuleQuestions.length}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase text-saffron bg-saffron-dim/20 px-2 py-0.5 rounded">
                        {capsuleQuestions[currentCapsuleQIdx].category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        capsuleQuestions[currentCapsuleQIdx].difficulty === 'hard' ? 'bg-redL/15 text-redL' :
                        capsuleQuestions[currentCapsuleQIdx].difficulty === 'medium' ? 'bg-orange-500/15 text-orange-400' : 'bg-greenL/15 text-greenL'
                      }`}>
                        {capsuleQuestions[currentCapsuleQIdx].difficulty || 'medium'}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-bg-s3 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-saffron h-full transition-all duration-300"
                      style={{ width: `${((currentCapsuleQIdx + 1) / capsuleQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question Box */}
                  <div className="p-4 bg-bg-s3 border border-border rounded-xl flex flex-col gap-1.5">
                    <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">
                      स्रोत: {capsuleQuestions[currentCapsuleQIdx].articleTitle}
                    </span>
                    <h3 className="text-sm font-black text-text leading-relaxed tracking-wide">
                      {capsuleQuizLang === 'hi'
                        ? (capsuleQuestions[currentCapsuleQIdx].question_hi || capsuleQuestions[currentCapsuleQIdx].question)
                        : (capsuleQuestions[currentCapsuleQIdx].question || capsuleQuestions[currentCapsuleQIdx].question_hi)}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="flex flex-col gap-2.5">
                    {((capsuleQuizLang === 'hi' && capsuleQuestions[currentCapsuleQIdx].options_hi?.length)
                      ? capsuleQuestions[currentCapsuleQIdx].options_hi
                      : capsuleQuestions[currentCapsuleQIdx].options
                    ).map((opt, oIdx) => {
                      const isSelected = capsuleAnswers[currentCapsuleQIdx] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectCapsuleOption(oIdx)}
                          className={`p-3.5 rounded-lg border text-left text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? 'bg-saffron-dim/30 border-saffron text-saffron'
                              : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted hover:text-text'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-text-muted">({String.fromCharCode(65 + oIdx)})</span>
                            <span>{opt}</span>
                          </span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-saffron bg-saffron text-bg-s1 font-black text-[9px]' : 'border-border'
                          }`}>
                            {isSelected && '✓'}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Question navigation footer */}
                  <div className="flex justify-between items-center pt-2 border-t border-border/60">
                    <button
                      disabled={currentCapsuleQIdx === 0}
                      onClick={() => setCurrentCapsuleQIdx(prev => prev - 1)}
                      className="px-4 py-2 bg-bg-s3 hover:bg-bg-s1 border border-border text-xs font-black uppercase rounded-lg disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Prev</span>
                    </button>

                    <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] no-scrollbar py-1">
                      {capsuleQuestions.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentCapsuleQIdx(dotIdx)}
                          className={`w-6 h-6 rounded text-[9px] font-mono font-bold flex items-center justify-center cursor-pointer transition-colors ${
                            currentCapsuleQIdx === dotIdx
                              ? 'bg-saffron text-bg-s1 font-black'
                              : capsuleAnswers[dotIdx] !== undefined
                                ? 'bg-greenL/20 text-greenL border border-greenL/40'
                                : 'bg-bg-s3 text-text-muted border border-border'
                          }`}
                        >
                          {dotIdx + 1}
                        </button>
                      ))}
                    </div>

                    {currentCapsuleQIdx < capsuleQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentCapsuleQIdx(prev => prev + 1)}
                        className="px-4 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitCapsuleQuiz}
                        className="px-5 py-2 bg-greenL hover:bg-green-600 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer shadow-lg animate-pulse"
                      >
                        Submit Test
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Scorecard & Review */
                <div className="flex flex-col gap-4">
                  <div className="text-center flex flex-col items-center justify-center p-6 bg-gradient-to-br from-bg-s3 to-bg-s2 border border-border rounded-xl">
                    <Award className="w-14 h-14 text-saffron fill-saffron/10 mb-2 animate-bounce" />
                    <h4 className="text-xs font-black text-text uppercase">Capsule Revision Complete!</h4>
                    <span className="text-3xl font-black text-saffron mt-2">
                      {capsuleScore?.correct} / {capsuleScore?.total}
                    </span>
                    <span className="text-xs font-bold text-greenL mt-0.5">
                      {Math.round(((capsuleScore?.correct || 0) / (capsuleScore?.total || 1)) * 100)}% Accuracy
                    </span>
                    <p className="text-[10px] text-text-muted mt-2 max-w-xs leading-relaxed">
                      Revision interaction saved! Your mastery score and readiness index have been updated.
                    </p>
                  </div>

                  {/* Review Questions list */}
                  <div className="flex flex-col gap-3 max-h-[45vh] overflow-y-auto pr-1">
                    <h5 className="text-[10px] font-black text-text-muted uppercase tracking-widest sticky top-0 bg-bg-s2 py-1 z-10">
                      Answer Review & Explanations ({capsuleQuestions.length})
                    </h5>

                    {capsuleQuestions.map((q, idx) => {
                      const chosen = capsuleAnswers[idx];
                      const isCorrect = chosen === q.correctIndex;
                      const chosenText = chosen !== undefined
                        ? ((capsuleQuizLang === 'hi' && q.options_hi) ? q.options_hi[chosen] : q.options[chosen])
                        : (capsuleQuizLang === 'hi' ? 'छोड़ दिया' : 'Skipped');
                      const correctText = (capsuleQuizLang === 'hi' && q.options_hi)
                        ? q.options_hi[q.correctIndex]
                        : q.options[q.correctIndex];

                      return (
                        <div key={idx} className="p-4 bg-bg-s3 border border-border rounded-xl flex flex-col gap-2 text-sm">
                          <div className="flex justify-between items-center text-[10px] text-text-muted">
                            <span className="font-bold text-saffron uppercase">Q{idx + 1} • {q.category}</span>
                            <span className={isCorrect ? 'text-greenL font-black' : 'text-redL font-black'}>
                              {isCorrect ? '✓ सही' : '✕ गलत'}
                            </span>
                          </div>

                          <h4 className="font-bold text-text text-xs leading-relaxed">
                            {capsuleQuizLang === 'hi' ? (q.question_hi || q.question) : (q.question || q.question_hi)}
                          </h4>

                          <div className="flex flex-col gap-1 text-[11px] font-bold mt-1">
                            <div className={isCorrect ? 'text-greenL' : 'text-redL'}>
                              <span>आपका उत्तर: </span>
                              <span>{chosenText}</span>
                            </div>
                            {!isCorrect && (
                              <div className="text-greenL">
                                <span>सही उत्तर: </span>
                                <span>{correctText}</span>
                              </div>
                            )}
                          </div>

                          <div className="text-[11px] text-text-muted leading-relaxed border-t border-border/40 pt-2 mt-1">
                            <strong className="text-text">व्याख्या: </strong>
                            <span>{capsuleQuizLang === 'hi' ? (q.explanation_hi || q.explanation) : (q.explanation || q.explanation_hi)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 border-t border-border pt-3">
                    <button
                      onClick={() => {
                        setCapsuleAnswers({});
                        setCapsuleQuizSubmitted(false);
                        setCapsuleScore(null);
                        setCurrentCapsuleQIdx(0);
                      }}
                      className="flex-1 py-3 bg-bg-s3 hover:bg-bg-s1 border border-border text-xs font-black uppercase text-text rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4 text-saffron" />
                      <span>Retake Test</span>
                    </button>
                    <button
                      onClick={() => setIsCapsuleQuizOpen(false)}
                      className="flex-1 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
