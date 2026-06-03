import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Search, Calendar, Globe, Sparkles, 
  ExternalLink, MessageSquare, Info, ShieldAlert 
} from 'lucide-react';

interface Article {
  title: string;
  title_hi?: string;
  description?: string;
  description_hi?: string;
  summary?: string;
  summary_hi?: string;
  category: 'exams' | 'jobs' | 'affairs' | string;
  source: string;
  link: string;
  date?: string;
  examRelevance?: string;
}

interface NewsTabProps {
  onAskAi: (promptText: string) => void;
}

export const NewsTab: React.FC<NewsTabProps> = ({ onAskAi }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [summaryLang, setSummaryLang] = useState<'hi' | 'en'>('hi');

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch news from direct endpoint first
      const res = await fetch(getApiUrl('/api/news'));
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.articles)) {
          setArticles(data.articles);
          setLoading(false);
          return;
        }
      }

      // Fallback: Read cache directly from Firestore if window.firebase is initialized
      const firebase = (window as any).firebase;
      if (firebase) {
        if (firebase.apps.length === 0) {
          firebase.initializeApp({
            apiKey: "AIzaSyC1zPetkyHD_07pr_ZIqLBE942NxIOJMxw",
            authDomain: "cg-guru.firebaseapp.com",
            projectId: "cg-guru",
            storageBucket: "cg-guru.firebasestorage.app",
            appId: "1:166390114183:web:397f8c629cebf14ec71522"
          });
        }
        const db = firebase.firestore();
        const doc = await db.collection('news').doc('cache').get();
        if (doc.exists && doc.data()?.articles) {
          setArticles(doc.data().articles);
          setLoading(false);
          return;
        }
      }

      throw new Error('Could not fetch current affairs feed cache');
    } catch (err: any) {
      console.error('[News Fetch Error]:', err);
      setError('Could not retrieve current affairs updates. Please check your internet connection.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exams': return '📝';
      case 'jobs': return '💼';
      case 'affairs': return '🗞️';
      default: return '📰';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'exams': return 'Exam Alert';
      case 'jobs': return 'Job Alert';
      case 'affairs': return 'Current Affairs';
      default: return 'Updates';
    }
  };

  // Search & filter mapping
  const filteredArticles = articles.filter(art => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    
    const query = searchQuery.toLowerCase();
    const titleText = (art.title || '').toLowerCase() + ' ' + (art.title_hi || '').toLowerCase();
    const sourceText = (art.source || '').toLowerCase();
    const matchesSearch = titleText.includes(query) || sourceText.includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto pb-12 font-sans">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5.5 h-5.5 text-saffron" />
          <div className="flex flex-col">
            <h3 className="text-sm font-black uppercase text-text leading-tight">News & Alerts</h3>
            <span className="text-[9px] text-text-muted font-bold tracking-wider">Samachar & Job Postings</span>
          </div>
        </div>
      </div>

      {/* 2. Search Field */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles, jobs, notifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-bg-s2 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-lg outline-none transition-colors"
        />
        <Search className="w-4 h-4 text-text-muted absolute left-3 top-3.5" />
      </div>

      {/* 3. Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
        {[
          { id: 'all', label: 'All Updates', icon: '📋' },
          { id: 'exams', label: 'Exam Alerts', icon: '📝' },
          { id: 'jobs', label: 'Job Board', icon: '💼' },
          { id: 'affairs', label: 'CG GK Current', icon: '🗞️' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-2 text-[10px] font-black uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-saffron text-bg-s1 border-saffron font-black shadow-sm'
                : 'bg-bg-s2 border-border text-text-muted hover:text-text hover:bg-bg-s2/85'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Articles list panel */}
      {loading ? (
        /* Skeletons */
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-bg-s2 border border-border rounded-xl animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-start gap-2.5 text-xs">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="p-8 text-center bg-bg-s2 border border-border rounded-xl text-text-muted text-xs">
          No articles match your search parameters.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredArticles.map((art, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setSelectedArticle(art);
                setSummaryLang('hi'); // Default to Hindi summaries
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.05, 0.4) }}
              className="p-4 bg-bg-s2 hover:bg-bg-s2/90 border border-border rounded-xl text-left shadow-sm transition-all hover:scale-[1.005] cursor-pointer flex flex-col gap-2 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-saffron bg-saffron-dim/30 border border-saffron-border/30 px-2 py-0.5 rounded leading-none flex items-center gap-1">
                  <span>{getCategoryIcon(art.category)}</span>
                  <span>{getCategoryLabel(art.category)}</span>
                </span>
                
                <span className="text-[9px] text-text-muted font-bold flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{art.date || 'Today'}</span>
                </span>
              </div>

              <h4 className="text-xs font-black text-text group-hover:text-saffron transition-colors leading-normal tracking-wide line-clamp-2">
                {art.title_hi || art.title}
              </h4>

              <div className="flex justify-between items-center text-[10px] text-text-muted border-t border-border/40 pt-2 mt-1">
                <span className="font-bold uppercase tracking-wider">{art.source}</span>
                <span className="text-saffron-border font-bold uppercase text-[9px] tracking-wider group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  <span>Summarize</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* 5. Detailed Article Modal Popover */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md z-[999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl p-5 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal close and categories */}
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-[10px] font-black uppercase text-saffron bg-saffron-dim/30 px-2 py-0.5 rounded border border-saffron-border/30">
                  {getCategoryLabel(selectedArticle.category)}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs text-text-muted hover:text-text cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Title */}
              <h2 className="text-sm font-black text-text leading-relaxed">
                {summaryLang === 'hi' && selectedArticle.title_hi ? selectedArticle.title_hi : selectedArticle.title}
              </h2>

              {/* Date & source */}
              <div className="flex items-center gap-4 text-[10px] text-text-muted font-bold uppercase">
                <span>📅 {selectedArticle.date || 'Today'}</span>
                <span>📡 {selectedArticle.source}</span>
              </div>

              {/* Summarized Section */}
              <div className="p-4 bg-bg-s3 border border-border rounded-lg flex flex-col gap-3 relative">
                <div className="absolute top-2 right-2 flex items-center gap-1.5">
                  {/* Language switch */}
                  <button
                    onClick={() => setSummaryLang(prev => prev === 'hi' ? 'en' : 'hi')}
                    className="p-1 rounded bg-bg-s1 border border-border text-[9px] font-bold text-text-muted flex items-center gap-1 cursor-pointer"
                  >
                    <Globe className="w-3 h-3 text-saffron" />
                    <span>{summaryLang === 'hi' ? 'हिं' : 'EN'}</span>
                  </button>
                </div>

                <h5 className="text-[10px] font-black uppercase text-saffron tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>AI Summary / सारांश</span>
                </h5>

                <p className="text-xs text-text leading-relaxed whitespace-pre-line tracking-wide">
                  {summaryLang === 'hi' 
                    ? (selectedArticle.summary_hi || selectedArticle.description_hi || selectedArticle.description || 'सारांश उपलब्ध नहीं है।')
                    : (selectedArticle.summary || selectedArticle.description || 'No summary available.')
                  }
                </p>
              </div>

              {/* Exam Relevance Tag */}
              {selectedArticle.examRelevance && (
                <div className="p-3.5 bg-[#ff9933]/5 border border-[#ff9933]/15 rounded-lg flex items-start gap-2 text-xs text-text">
                  <Info className="w-4.5 h-4.5 text-saffron shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Exam Relevance Insights</span>
                    <p className="text-[11px] text-text-muted leading-normal">
                      {selectedArticle.examRelevance}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions row */}
              <div className="flex gap-3 border-t border-border pt-4 mt-1.5 shrink-0">
                <button
                  onClick={() => {
                    const prompt = `Can you explain the exam relevance of this news article: "${selectedArticle.title}"? Summarize its key facts for my CGPSC preparation.`;
                    onAskAi(prompt);
                    setSelectedArticle(null);
                  }}
                  className="flex-1 py-3 bg-bg-s3 hover:bg-saffron-dim/20 border border-border text-[10px] font-black uppercase text-text flex items-center justify-center gap-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-saffron" />
                  <span>Ask AI Assistant</span>
                </button>
                
                <a
                  href={selectedArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-saffron hover:bg-orange-500 text-[10px] font-black uppercase text-bg-s1 flex items-center justify-center gap-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Link</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
