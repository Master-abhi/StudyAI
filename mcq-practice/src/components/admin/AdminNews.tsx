import React, { useState, useEffect } from 'react';
import { 
  Newspaper, RefreshCw, Loader2, Calendar, 
  Search, ShieldAlert, CheckCircle, ExternalLink, UploadCloud,
  Briefcase, Pencil, Trash2, X, Save, CheckSquare, Square
} from 'lucide-react';

interface AdminNewsProps {
  currentUser: any;
}

interface Article {
  id?: string;
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
  examRelevance?: string;
  department?: string;
  totalPosts?: string;
  qualification?: string;
  lastDate?: string;
  salary?: string;
  ageLimit?: string;
  fee?: string;
  selectionProcess?: string;
  details?: string;
}

export const AdminNews: React.FC<AdminNewsProps> = ({ currentUser }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'news' | 'jobs'>('news');
  const [articles, setArticles] = useState<Article[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingRefresh, setLoadingRefresh] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const [showUploadSection, setShowUploadSection] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [pasteJson, setPasteJson] = useState<string>('');
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [loadingSaveEdit, setLoadingSaveEdit] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [loadingBulkDelete, setLoadingBulkDelete] = useState<boolean>(false);

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

  const sanitizeJsonString = (str: string) => {
    let cleanStr = str.trim();
    if (cleanStr.startsWith('```')) {
      cleanStr = cleanStr.replace(/^```(?:json)?/i, '').trim();
      cleanStr = cleanStr.replace(/```$/, '').trim();
    }

    let inString = false;
    let escaped = false;
    let result = '';
    
    for (let i = 0; i < cleanStr.length; i++) {
      const char = cleanStr[i];
      if (inString) {
        if (escaped) {
          result += char;
          escaped = false;
        } else if (char === '\\') {
          const nextChar = cleanStr[i + 1];
          const nextNextChar = cleanStr[i + 2];
          const isValidJsonEscape = 
            nextChar === '"' || nextChar === '\\' || nextChar === '/' ||
            nextChar === 'b' || nextChar === 'f' || nextChar === 'n' || 
            nextChar === 'r' || nextChar === 't' ||
            (nextChar === 'u' && /^[0-9a-fA-F]{4}$/.test(cleanStr.slice(i + 2, i + 6)));
            
          const isLatexCommand = 
            (nextChar === 'b' || nextChar === 'f' || nextChar === 'n' || nextChar === 'r' || nextChar === 't' || nextChar === 'u') &&
            (nextNextChar && /^[a-zA-Z]$/.test(nextNextChar));
            
          if (!isValidJsonEscape || isLatexCommand) {
            result += '\\\\';
          } else {
            result += char;
            escaped = true;
          }
        } else if (char === '"') {
          result += char;
          inString = false;
        } else if (char === '\n' || char === '\r') {
          let lookAheadIdx = i + 1;
          while (lookAheadIdx < cleanStr.length && /\s/.test(cleanStr[lookAheadIdx])) {
            lookAheadIdx++;
          }
          let isMissingQuote = lookAheadIdx < cleanStr.length && cleanStr[lookAheadIdx] === '"';
          if (isMissingQuote) {
            result += '"';
            inString = false;
            result += char;
          } else {
            if (char === '\n') result += '\\n';
            else if (char === '\r') result += '\\r';
          }
        } else {
          const code = char.charCodeAt(0);
          if (code < 32) {
            if (char === '\t') result += '\\t';
            else if (char === '\b') result += '\\b';
            else if (char === '\f') result += '\\f';
            else result += '\\u' + code.toString(16).padStart(4, '0');
          } else {
            result += char;
          }
        }
      } else {
        if (char === '"' || char === '{' || char === '[') {
          let lastCharIdx = result.length - 1;
          while (lastCharIdx >= 0 && /\s/.test(result[lastCharIdx])) {
            lastCharIdx--;
          }
          if (lastCharIdx >= 0) {
            const lastNonWsChar = result[lastCharIdx];
            if (lastNonWsChar === '"' || lastNonWsChar === ']' || lastNonWsChar === '}') {
              result = result.slice(0, lastCharIdx + 1) + ',' + result.slice(lastCharIdx + 1);
            }
          }
          if (char === '"') inString = true;
        }
        if (char === ',') {
          let nextIdx = i + 1;
          while (nextIdx < cleanStr.length && /\s/.test(cleanStr[nextIdx])) {
            nextIdx++;
          }
          if (nextIdx < cleanStr.length && (cleanStr[nextIdx] === '}' || cleanStr[nextIdx] === ']')) {
            continue;
          }
        }
        result += char;
      }
    }

    return result
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\u00A0/g, ' ')
      .trim();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
      setPasteJson('');
    }
  };

  // Dedicated News Template Loader
  const handleLoadNewsTemplate = () => {
    const sampleNews = [
      {
        title: "CGPSC State Service Mains Exam 2026 Time Table Announced",
        title_hi: "सीजीपीएससी राज्य सेवा मुख्य परीक्षा 2026 समय सारणी घोषित",
        description: "The Chhattisgarh Public Service Commission has officially announced the exam dates for Mains 2026.",
        description_hi: "छत्तीसगढ़ लोक सेवा आयोग ने मुख्य परीक्षा 2026 के लिए तिथियां जारी कर दी हैं।",
        category: "exams",
        source: "CGPSC Portal",
        url: "https://psc.cg.gov.in"
      },
      {
        title: "Chhattisgarh Launches Rajiv Gandhi Kisan Nyay Yojana 2.0",
        title_hi: "छत्तीसगढ़ ने राजीव गांधी किसान न्याय योजना 2.0 की शुरुआत की",
        description: "Direct bank transfer scheme launched for paddy farmers in Chhattisgarh.",
        description_hi: "धान उत्पादक किसानों के लिए बैंक खाते में सीधी सहायता राशि योजना।",
        category: "affairs",
        source: "DPR Chhattisgarh",
        url: "https://dprcg.gov.in"
      }
    ];
    setPasteJson(JSON.stringify(sampleNews, null, 2));
    setUploadFile(null);
  };

  // Dedicated Job Template Loader
  const handleLoadJobsTemplate = () => {
    const sampleJobs = [
      {
        title: "Chhattisgarh Vyapam Patwari & Revenue Inspector Recruitment 2026",
        title_hi: "छत्तीसगढ़ व्यापम पटवारी एवं राजस्व निरीक्षक भर्ती 2026",
        category: "jobs",
        department: "CG Revenue Department",
        totalPosts: "350 Posts",
        qualification: "Graduation + DCA/PGDCA",
        lastDate: "2026-08-30",
        salary: "Level 6 (₹25,300 - ₹80,500)",
        source: "CG Vyapam",
        url: "https://vyapam.cgstate.gov.in"
      },
      {
        title: "CG Health Staff Nurse & Lab Technician Recruitment 2026",
        title_hi: "छत्तीसगढ़ स्वास्थ्य विभाग स्टाफ नर्स एवं लैब तकनीशियन भर्ती 2026",
        category: "jobs",
        department: "CG Health Department",
        totalPosts: "500 Posts",
        qualification: "B.Sc Nursing / GNM",
        lastDate: "2026-08-25",
        salary: "Level 7 (₹28,700 - ₹91,300)",
        source: "CG Health Portal",
        url: "https://cghealth.nic.in"
      }
    ];
    setPasteJson(JSON.stringify(sampleJobs, null, 2));
    setUploadFile(null);
  };

  // Dedicated News Template Downloader
  const handleDownloadNewsTemplate = () => {
    const sampleNews = [
      {
        title: "CGPSC State Service Mains Exam 2026 Time Table Announced",
        title_hi: "सीजीपीएससी राज्य सेवा मुख्य परीक्षा 2026 समय सारणी घोषित",
        description: "The Chhattisgarh Public Service Commission has officially announced the exam dates for Mains 2026.",
        description_hi: "छत्तीसगढ़ लोक सेवा आयोग ने मुख्य परीक्षा 2026 के लिए तिथियां जारी कर दी हैं।",
        category: "exams",
        source: "CGPSC Portal",
        url: "https://psc.cg.gov.in"
      }
    ];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sampleNews, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "news_articles_template.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Dedicated Jobs Template Downloader
  const handleDownloadJobsTemplate = () => {
    const sampleJobs = [
      {
        title: "Chhattisgarh Vyapam Patwari & Revenue Inspector Recruitment 2026",
        title_hi: "छत्तीसगढ़ व्यापम पटवारी एवं राजस्व निरीक्षक भर्ती 2026",
        category: "jobs",
        department: "CG Revenue Department",
        totalPosts: "350 Posts",
        qualification: "Graduation + DCA/PGDCA",
        lastDate: "2026-08-30",
        salary: "Level 6 (₹25,300 - ₹80,500)",
        source: "CG Vyapam",
        url: "https://vyapam.cgstate.gov.in"
      }
    ];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sampleJobs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "job_alerts_template.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleUploadJson = async () => {
    setLoadingUpload(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      let itemsToUpload: any[] = [];

      if (uploadFile) {
        const fileContent = await uploadFile.text();
        const sanitized = sanitizeJsonString(fileContent);
        const parsed = JSON.parse(sanitized);
        if (Array.isArray(parsed)) itemsToUpload = parsed;
        else if (parsed && Array.isArray(parsed.articles)) itemsToUpload = parsed.articles;
        else throw new Error('Invalid JSON structure.');
      } else if (pasteJson.trim()) {
        const sanitized = sanitizeJsonString(pasteJson.trim());
        const parsed = JSON.parse(sanitized);
        if (Array.isArray(parsed)) itemsToUpload = parsed;
        else if (parsed && Array.isArray(parsed.articles)) itemsToUpload = parsed.articles;
        else throw new Error('Invalid JSON structure.');
      }

      if (itemsToUpload.length === 0) {
        throw new Error('No valid entries found to upload.');
      }

      // Automatically assign category if in jobs tab
      if (activeAdminTab === 'jobs') {
        itemsToUpload = itemsToUpload.map(item => ({
          ...item,
          category: 'jobs'
        }));
      }

      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/news/upload'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ articles: itemsToUpload })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully uploaded ${data.totalArticles} ${activeAdminTab === 'jobs' ? 'job alerts' : 'news articles'}!`);
        setUploadFile(null);
        setPasteJson('');
        setShowUploadSection(false);
        fetchNewsCache();
      } else {
        throw new Error(data.error || 'Server rejected uploaded JSON.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Upload failed. Check JSON formatting.');
    } finally {
      setLoadingUpload(false);
    }
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
        setSuccessMessage(`Successfully refreshed and cached ${data.totalArticles} updates!`);
        fetchNewsCache();
      } else {
        throw new Error(data.error || 'Server rejected refresh run.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Refresh failed.');
    } finally {
      setLoadingRefresh(false);
    }
  };

  const handleDeleteArticle = async (art: Article) => {
    const targetId = art.id || art.url || art.title;
    if (!window.confirm(`Are you sure you want to delete "${art.title_hi || art.title}"?`)) {
      return;
    }

    setDeletingId(targetId);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/news/delete'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: art.id || '',
          url: art.url || '',
          title: art.title || ''
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage('Entry deleted successfully!');
        fetchNewsCache();
      } else {
        throw new Error(data.error || 'Failed to delete entry.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Delete failed.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveEditArticle = async () => {
    if (!editingArticle) return;

    setLoadingSaveEdit(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/news/edit'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ article: editingArticle })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage('Entry updated successfully!');
        setEditingArticle(null);
        fetchNewsCache();
      } else {
        throw new Error(data.error || 'Failed to update entry.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Update failed.');
    } finally {
      setLoadingSaveEdit(false);
    }
  };

  const getItemKey = (art: Article) => {
    return art.id || art.url || art.title;
  };

  const toggleSelectItem = (art: Article) => {
    const key = getItemKey(art);
    setSelectedKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSelectAllVisible = (visibleArticles: Article[]) => {
    const visibleKeys = visibleArticles.map(art => getItemKey(art));
    const allSelected = visibleKeys.length > 0 && visibleKeys.every(k => selectedKeys.includes(k));

    if (allSelected) {
      setSelectedKeys(prev => prev.filter(k => !visibleKeys.includes(k)));
    } else {
      setSelectedKeys(prev => Array.from(new Set([...prev, ...visibleKeys])));
    }
  };

  const handleBulkDelete = async (visibleArticles: Article[]) => {
    const selectedArticles = visibleArticles.filter(art => selectedKeys.includes(getItemKey(art)));
    if (selectedArticles.length === 0) return;

    if (!window.confirm(`Are you sure you want to delete ${selectedArticles.length} selected ${activeAdminTab === 'jobs' ? 'job alerts' : 'news articles'}?`)) {
      return;
    }

    setLoadingBulkDelete(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/news/delete-bulk'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: selectedArticles })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully deleted ${data.count || selectedArticles.length} entries!`);
        setSelectedKeys([]);
        fetchNewsCache();
      } else {
        throw new Error(data.error || 'Failed to delete selected entries.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Bulk delete failed.');
    } finally {
      setLoadingBulkDelete(false);
    }
  };

  // Filter articles based on activeAdminTab (News vs Jobs)
  const categoryFiltered = articles.filter(art => {
    if (activeAdminTab === 'jobs') {
      return art.category === 'jobs';
    } else {
      return art.category !== 'jobs';
    }
  });

  const filteredArticles = categoryFiltered.filter(art => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const titleText = (art.title || '').toLowerCase() + ' ' + (art.title_hi || '').toLowerCase();
    const sourceText = (art.source || '').toLowerCase();
    const deptText = (art.department || '').toLowerCase();
    return matchesCategory && (titleText.includes(query) || sourceText.includes(query) || deptText.includes(query));
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      {/* Top Navigation Switcher for Admin: News vs Jobs */}
      <div className="flex items-center gap-3 p-1.5 bg-bg-s2 border border-border rounded-xl">
        <button
          onClick={() => {
            setActiveAdminTab('news');
            setActiveCategory('all');
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
            activeAdminTab === 'news'
              ? 'bg-saffron text-bg-s1 shadow-md'
              : 'text-text-muted hover:text-text hover:bg-bg-s3/50'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>📰 News & Current Affairs</span>
        </button>

        <button
          onClick={() => {
            setActiveAdminTab('jobs');
            setActiveCategory('all');
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
            activeAdminTab === 'jobs'
              ? 'bg-emerald-500 text-bg-s1 shadow-md'
              : 'text-text-muted hover:text-text hover:bg-bg-s3/50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>💼 Job Notifications & Recruitment</span>
        </button>
      </div>

      {/* Success/Error Alerts */}
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
          <span className="whitespace-pre-wrap font-mono">{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="ml-auto text-redL/60 hover:text-redL">✕</button>
        </div>
      )}

      {/* Sync Operations Card */}
      <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            activeAdminTab === 'jobs' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-saffron/10 border border-saffron-border/30 text-saffron'
          }`}>
            <RefreshCw className={`w-5 h-5 ${loadingRefresh ? 'animate-spin' : ''}`} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-black uppercase text-text tracking-wider">
              {activeAdminTab === 'jobs' ? 'Job Alert Crawler Operations' : 'News Scraping Operations'}
            </h3>
            <span className="text-[10px] text-text-muted font-bold">
              {lastUpdated ? `Last Synchronized: ${new Date(lastUpdated).toLocaleString('en-IN')}` : 'Last Synchronized: Never'}
            </span>
          </div>
        </div>

        <button
          onClick={handleRefreshNews}
          disabled={loadingRefresh}
          className={`px-5 py-3 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md ${
            activeAdminTab === 'jobs' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-saffron hover:bg-orange-500'
          }`}
        >
          {loadingRefresh ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Fetching Live Updates...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Feed Cache</span>
            </>
          )}
        </button>
      </div>

      {/* Separate Upload / Paste JSON Section */}
      <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              activeAdminTab === 'jobs' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-saffron/10 text-saffron'
            }`}>
              {activeAdminTab === 'jobs' ? <Briefcase className="w-5 h-5" /> : <Newspaper className="w-5 h-5" />}
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs font-black uppercase text-text tracking-wider">
                {activeAdminTab === 'jobs' ? 'Upload Job Notification JSON' : 'Upload Current Affairs JSON'}
              </h3>
              <span className="text-[10px] text-text-muted font-bold">
                {activeAdminTab === 'jobs' 
                  ? 'Import job vacancy templates with department, posts, qualification & deadline' 
                  : 'Import news and current affairs articles with Gemini summaries'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowUploadSection(!showUploadSection)}
            className="text-[10px] bg-bg-s3 border border-border hover:bg-bg-s3/80 text-text-muted px-2.5 py-1.5 rounded-lg font-black uppercase cursor-pointer"
          >
            {showUploadSection ? 'Hide Panel' : 'Show Panel'}
          </button>
        </div>

        {showUploadSection && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* File Upload */}
              <div className="p-4 bg-bg-s3/40 border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center p-6 gap-3 group hover:border-saffron-border/30 transition-all relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-10 h-10 rounded-full bg-saffron-dim/10 border border-saffron-border/10 flex items-center justify-center text-saffron shrink-0">
                  <UploadCloud className="w-5.5 h-5.5 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-text">Choose JSON File</span>
                  <span className="text-[9px] text-text-muted font-semibold">Upload formatted (.json) file</span>
                </div>
                {uploadFile && (
                  <span className="text-[10px] font-black text-saffron bg-saffron/10 border border-saffron-border/25 px-2 py-0.5 rounded">
                    Selected: {uploadFile.name}
                  </span>
                )}
              </div>

              {/* Paste Raw JSON */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-text-muted">
                  Paste Raw {activeAdminTab === 'jobs' ? 'Job Alert' : 'News'} JSON Array
                </label>
                <textarea
                  placeholder={activeAdminTab === 'jobs' ? `[
  {
    "title": "CG Vyapam Patwari Bharti 2026",
    "title_hi": "छत्तीसगढ़ व्यापम पटवारी भर्ती 2026",
    "category": "jobs",
    "department": "Revenue Department",
    "totalPosts": "250 Posts",
    "qualification": "Graduation + DCA",
    "lastDate": "2026-08-30",
    "salary": "Level 6",
    "source": "CG Vyapam",
    "url": "https://vyapam.cgstate.gov.in"
  }
]` : `[
  {
    "title": "CGPSC Notification 2026 Out",
    "title_hi": "सीजीपीएससी अधिसूचना 2026 जारी",
    "description": "Details about upcoming CGPSC exams...",
    "category": "exams",
    "source": "Official Portal",
    "url": "https://psc.cg.gov.in"
  }
]`}
                  value={pasteJson}
                  onChange={(e) => setPasteJson(e.target.value)}
                  rows={7}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron/50 rounded-lg p-3 outline-none font-mono placeholder:text-text-muted/40"
                />
              </div>
            </div>

            {/* Template Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40 w-full">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={activeAdminTab === 'jobs' ? handleLoadJobsTemplate : handleLoadNewsTemplate}
                  className="px-3 py-2 bg-bg-s3 border border-border hover:bg-bg-s3/80 text-text text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>📋</span>
                  <span>Load {activeAdminTab === 'jobs' ? 'Job' : 'News'} Template</span>
                </button>
                <button
                  type="button"
                  onClick={activeAdminTab === 'jobs' ? handleDownloadJobsTemplate : handleDownloadNewsTemplate}
                  className="px-3 py-2 bg-bg-s3 border border-border hover:bg-bg-s3/80 text-text text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>📥</span>
                  <span>Download Demo JSON</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleUploadJson}
                disabled={loadingUpload || (!uploadFile && !pasteJson.trim())}
                className={`px-5 py-3 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md ${
                  activeAdminTab === 'jobs' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-saffron hover:bg-orange-500'
                }`}
              >
                {loadingUpload ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Import {activeAdminTab === 'jobs' ? 'Jobs' : 'News'} JSON</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search header with Bulk Select Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={activeAdminTab === 'jobs' ? "Search cached job notifications..." : "Search cached news & current affairs..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-s2 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-lg outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3.5" />
        </div>

        {filteredArticles.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleSelectAllVisible(filteredArticles)}
              className="px-3 py-2 bg-bg-s2 border border-border hover:bg-bg-s3 text-text-muted text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {filteredArticles.every(art => selectedKeys.includes(getItemKey(art))) ? (
                <>
                  <CheckSquare className="w-3.5 h-3.5 text-saffron" />
                  <span>Deselect All</span>
                </>
              ) : (
                <>
                  <Square className="w-3.5 h-3.5" />
                  <span>Select All ({filteredArticles.length})</span>
                </>
              )}
            </button>

            {selectedKeys.length > 0 && (
              <>
                <button
                  onClick={() => handleBulkDelete(filteredArticles)}
                  disabled={loadingBulkDelete}
                  className="px-3.5 py-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-colors disabled:opacity-40"
                >
                  {loadingBulkDelete ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>Delete Selected ({selectedKeys.filter(k => filteredArticles.some(a => getItemKey(a) === k)).length})</span>
                </button>

                <button
                  onClick={() => setSelectedKeys([])}
                  className="px-2.5 py-2 bg-bg-s3 text-text-muted hover:text-text text-[10px] font-bold uppercase rounded-lg cursor-pointer"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Grid listing */}
      {loadingList ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2 text-text-muted">
          <Loader2 className="w-6 h-6 animate-spin text-saffron" />
          <span className="text-[10px] font-black uppercase tracking-wider">Loading Cache...</span>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-bg-s2 border border-border rounded-xl text-text-muted text-xs">
          No {activeAdminTab === 'jobs' ? 'job alerts' : 'articles'} found matching your query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((art, idx) => {
            const key = getItemKey(art);
            const isSelected = selectedKeys.includes(key);
            return (
              <div
                key={idx}
                className={`p-5 bg-bg-s2 border rounded-xl flex flex-col gap-3 relative transition-all shadow-sm ${
                  isSelected
                    ? activeAdminTab === 'jobs' 
                      ? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/30' 
                      : 'border-saffron bg-saffron/5 ring-1 ring-saffron/30'
                    : 'border-border hover:border-saffron-border/30'
                }`}
              >
                <div className="flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSelectItem(art)}
                      className="text-text-muted hover:text-saffron cursor-pointer p-0.5"
                    >
                      {isSelected ? (
                        <CheckSquare className={`w-4 h-4 ${activeAdminTab === 'jobs' ? 'text-emerald-400' : 'text-saffron'}`} />
                      ) : (
                        <Square className="w-4 h-4 text-text-muted/60" />
                      )}
                    </button>

                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded leading-none flex items-center gap-1 ${
                      activeAdminTab === 'jobs'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-saffron-dim/30 text-saffron border border-saffron-border/30'
                    }`}>
                      <span>{activeAdminTab === 'jobs' ? '💼 Job Vacancy' : '📰 News Update'}</span>
                    </span>
                  </div>
                
                <span className="text-[9px] text-text-muted font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{art.date || 'Today'}</span>
                </span>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-black text-text leading-snug tracking-wide">
                  {art.title_hi || art.title}
                </h4>
                {art.title_hi && (
                  <span className="text-[10px] text-text-muted font-semibold italic leading-tight">
                    {art.title}
                  </span>
                )}
              </div>

              {/* If job, render job parameters */}
              {activeAdminTab === 'jobs' && (
                <div className="p-3 bg-bg-s3 border border-border rounded-lg flex flex-col gap-2 text-[10px] font-semibold text-text-muted">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>Department:</strong> {art.department || (art as any).dept || (art as any).organization || art.source || 'Govt'}</div>
                    <div><strong>Posts:</strong> {art.totalPosts || (art as any).posts || (art as any).vacancies || 'N/A'}</div>
                    <div className="col-span-2"><strong>Qualification:</strong> {art.qualification || (art as any).eligibility || 'As per notice'}</div>
                    <div><strong>Deadline:</strong> {art.lastDate || (art as any).deadline || art.date || 'N/A'}</div>
                    {art.salary && <div><strong>Salary:</strong> {art.salary}</div>}
                    {(art as any).ageLimit && <div className="col-span-2"><strong>Age Limit:</strong> {(art as any).ageLimit}</div>}
                  </div>
                  {(art as any).details && (
                    <div className="border-t border-border/50 pt-1.5 text-[10px] text-text-muted font-normal leading-relaxed whitespace-pre-line">
                      <strong className="text-text font-bold">Details:</strong> {(art as any).details}
                    </div>
                  )}
                </div>
              )}

              {/* Summary (Only for news articles) */}
              {activeAdminTab !== 'jobs' && (
                <div className="p-3 bg-bg-s3 border border-border rounded-lg flex flex-col gap-2 mt-1">
                  <p className="text-[11px] text-text leading-normal font-medium whitespace-pre-line">
                    {art.summary_hi || art.description_hi || art.summary || art.description}
                  </p>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex flex-wrap justify-between items-center text-[10px] border-t border-border/45 pt-3 mt-1 shrink-0 gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingArticle({ ...art })}
                    className="px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteArticle(art)}
                    disabled={deletingId === (art.id || art.url || art.title)}
                    className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 disabled:opacity-40"
                  >
                    {deletingId === (art.id || art.url || art.title) ? (
                      <Loader2 className="w-3 h-3 animate-spin text-red-400" />
                    ) : (
                      <Trash2 className="w-3 h-3" />
                    )}
                    <span>Delete</span>
                  </button>
                </div>

                <a
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-saffron hover:underline font-bold flex items-center gap-0.5 ml-auto"
                >
                  <span>Open Feed</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Edit Modal Overlay */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-s2 border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-border/80 flex items-center justify-between bg-bg-s3/60 shrink-0">
              <h3 className="text-xs font-black uppercase tracking-wider text-text flex items-center gap-2">
                <Pencil className="w-4 h-4 text-saffron" />
                <span>Edit {activeAdminTab === 'jobs' ? 'Job Alert' : 'News Article'}</span>
              </h3>
              <button
                onClick={() => setEditingArticle(null)}
                className="text-text-muted hover:text-text p-1 rounded-lg hover:bg-bg-s3 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Content */}
            <div className="p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">Title (English)</label>
                  <input
                    type="text"
                    value={editingArticle.title || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">Title (Hindi)</label>
                  <input
                    type="text"
                    value={editingArticle.title_hi || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title_hi: e.target.value })}
                    className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                  />
                </div>

                {activeAdminTab === 'jobs' ? (
                  <>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-text-muted">Department</label>
                      <input
                        type="text"
                        value={editingArticle.department || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, department: e.target.value })}
                        className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-text-muted">Total Posts / Vacancies</label>
                      <input
                        type="text"
                        value={editingArticle.totalPosts || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, totalPosts: e.target.value })}
                        className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-text-muted">Qualification / Eligibility</label>
                      <input
                        type="text"
                        value={editingArticle.qualification || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, qualification: e.target.value })}
                        className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-text-muted">Last Date / Deadline</label>
                      <input
                        type="text"
                        value={editingArticle.lastDate || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, lastDate: e.target.value })}
                        className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-text-muted">Salary / Pay Scale</label>
                      <input
                        type="text"
                        value={editingArticle.salary || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, salary: e.target.value })}
                        className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-text-muted">Age Limit</label>
                      <input
                        type="text"
                        value={editingArticle.ageLimit || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, ageLimit: e.target.value })}
                        className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] font-black uppercase text-text-muted">Category</label>
                    <input
                      type="text"
                      value={editingArticle.category || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                      className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-text-muted">Source</label>
                  <input
                    type="text"
                    value={editingArticle.source || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, source: e.target.value })}
                    className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-text-muted">Official Portal URL</label>
                  <input
                    type="text"
                    value={editingArticle.url || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, url: e.target.value })}
                    className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">
                    {activeAdminTab === 'jobs' ? 'Job Overview & Details' : 'Article Description / Summary'}
                  </label>
                  <textarea
                    rows={4}
                    value={editingArticle.details || editingArticle.description || editingArticle.summary || ''}
                    onChange={(e) => setEditingArticle({ 
                      ...editingArticle, 
                      details: e.target.value,
                      description: e.target.value,
                      summary: e.target.value
                    })}
                    className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-border/80 flex items-center justify-end gap-3 bg-bg-s3/40 shrink-0">
              <button
                onClick={() => setEditingArticle(null)}
                className="px-4 py-2 bg-bg-s3 border border-border hover:bg-bg-s3/80 text-text-muted text-xs font-bold uppercase rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditArticle}
                disabled={loadingSaveEdit}
                className="px-5 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-40"
              >
                {loadingSaveEdit ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
