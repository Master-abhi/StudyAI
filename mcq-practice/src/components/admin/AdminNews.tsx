import React, { useState, useEffect } from 'react';
import { 
  Newspaper, RefreshCw, Loader2, Calendar, Globe, 
  Search, ShieldAlert, CheckCircle, ExternalLink 
} from 'lucide-react';

interface AdminNewsProps {
  currentUser: any;
}

interface Article {
  title: string;
  title_hi?: string;
  description?: string;
  description_hi?: string;
  summary?: string;
  summary_hi?: string;
  category: string;
  source: string;
  link: string;
  date?: string;
  examRelevance?: string;
}

export const AdminNews: React.FC<AdminNewsProps> = ({ currentUser }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingRefresh, setLoadingRefresh] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  const fetchNewsCache = async () => {
    setLoadingList(true);
    setErrorMessage('');
    try {
      const res = await fetch(getApiUrl('/api/news'));
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
        setLastUpdated(data.lastUpdated || '');
      } else {
        throw new Error('Failed to retrieve news cache.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Could not load current affairs cache.');
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchNewsCache();
  }, []);

  const handleRefreshNews = async () => {
    setLoadingRefresh(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/news/refresh'), {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully refreshed and cached ${data.totalArticles} articles with Gemini bilingual summaries!`);
        fetchNewsCache();
      } else {
        throw new Error(data.error || 'Server rejected the scraping run.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Scrape failed. Verify the server is running and Gemini credentials are set.');
    } finally {
      setLoadingRefresh(false);
    }
  };

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

  // Search & filter
  const filteredArticles = articles.filter(art => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const titleText = (art.title || '').toLowerCase() + ' ' + (art.title_hi || '').toLowerCase();
    const sourceText = (art.source || '').toLowerCase();
    return matchesCategory && (titleText.includes(query) || sourceText.includes(query));
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      {/* Messages */}
      {successMessage && (
        <div className="p-4 bg-greenL/10 border border-greenL/20 text-greenL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="ml-auto text-greenL/60 hover:text-greenL">✕</button>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="ml-auto text-redL/60 hover:text-redL">✕</button>
        </div>
      )}

      {/* Sync Operations Card */}
      <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-saffron/10 border border-saffron-border/30 rounded-lg flex items-center justify-center text-saffron shrink-0">
            <RefreshCw className={`w-5 h-5 ${loadingRefresh ? 'animate-spin' : ''}`} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-black uppercase text-text tracking-wider">News Scraping Operations</h3>
            <span className="text-[10px] text-text-muted font-bold">
              {lastUpdated 
                ? `Last Synchronized: ${new Date(lastUpdated).toLocaleString('en-IN')}` 
                : 'Last Synchronized: Never'}
            </span>
          </div>
        </div>

        <button
          onClick={handleRefreshNews}
          disabled={loadingRefresh}
          className="px-5 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
        >
          {loadingRefresh ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Scraping & Summarizing (30s)...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh News Cache</span>
            </>
          )}
        </button>
      </div>

      {/* Filter and search header */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search cached articles, jobs, notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-s2 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-lg outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3.5" />
        </div>

        {/* Categories row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0 select-none">
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
      </div>

      {/* Articles Cards Grid */}
      {loadingList ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2 text-text-muted">
          <Loader2 className="w-6 h-6 animate-spin text-saffron" />
          <span className="text-[10px] font-black uppercase tracking-wider">Loading Cache Registry...</span>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-bg-s2 border border-border rounded-xl text-text-muted text-xs">
          No articles match your parameters in the current cache. Click refresh to scrap fresh posts.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((art, idx) => (
            <div
              key={idx}
              className="p-5 bg-bg-s2 border border-border rounded-xl flex flex-col gap-3 relative hover:border-saffron-border/30 transition-colors shadow-sm"
            >
              <div className="flex justify-between items-center shrink-0">
                <span className="text-[9px] font-black uppercase text-saffron bg-saffron-dim/30 border border-saffron-border/30 px-2 py-0.5 rounded leading-none flex items-center gap-1">
                  <span>{getCategoryIcon(art.category)}</span>
                  <span>{getCategoryLabel(art.category)}</span>
                </span>
                
                <span className="text-[9px] text-text-muted font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{art.date || 'Today'}</span>
                </span>
              </div>

              {/* Title blocks */}
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-black text-text leading-snug tracking-wide">
                  {art.title_hi || art.title}
                </h4>
                {art.title_hi && (
                  <span className="text-[10px] text-text-muted font-semibold italic leading-tight">
                    En: {art.title}
                  </span>
                )}
              </div>

              {/* Summaries view */}
              <div className="p-3 bg-bg-s3 border border-border rounded-lg flex flex-col gap-2 mt-1">
                <span className="text-[8px] font-black uppercase text-saffron tracking-wider flex items-center gap-1">
                  <Globe className="w-3 h-3 text-saffron" />
                  <span>Gemini Summary (Bilingual)</span>
                </span>
                <p className="text-[11px] text-text leading-normal font-medium whitespace-pre-line tracking-wide">
                  {art.summary_hi || art.description_hi || art.summary || art.description}
                </p>
                {art.summary && (art.summary_hi || art.description_hi) && (
                  <p className="text-[10px] text-text-muted border-t border-border/40 pt-1.5 mt-1 leading-normal">
                    {art.summary}
                  </p>
                )}
              </div>

              {/* Footer info */}
              <div className="flex justify-between items-center text-[10px] border-t border-border/45 pt-3 mt-1 shrink-0">
                <span className="font-bold text-text-muted uppercase tracking-wider">Feed: {art.source}</span>
                <a
                  href={art.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-saffron hover:underline font-bold flex items-center gap-0.5"
                >
                  <span>Open Feed</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* refresh overlay block */}
      {loadingRefresh && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md z-[999] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-sm bg-bg-s2 border border-border p-6 rounded-xl shadow-2xl flex flex-col items-center gap-4">
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-saffron animate-spin" />
              <Newspaper className="w-5 h-5 text-text absolute" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-black uppercase text-text tracking-wide">Scraping & Summarizing</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                We are currently crawling official government recruitment boards and current affairs feeds.
              </p>
              <div className="p-3 bg-bg-s3 rounded-lg border border-border mt-2 text-[10px] text-saffron font-bold text-left leading-normal">
                ⚠️ This process takes ~30 seconds because each article title is translated to Hindi and run through Gemini to generate concise exam-relevance summaries.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
