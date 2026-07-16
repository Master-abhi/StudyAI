import React, { useState, useEffect } from 'react';
import { 
  Newspaper, RefreshCw, Loader2, Calendar, 
  Search, ShieldAlert, CheckCircle, ExternalLink, UploadCloud,
  Briefcase
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
  url: string;
  date?: string;
  examRelevance?: string;
  department?: string;
  totalPosts?: string;
  qualification?: string;
  lastDate?: string;
  salary?: string;
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
        description: "Official vacancy notification for 350 Patwari posts across Chhattisgarh districts.",
        description_hi: "छत्तीसगढ़ के जिलों में 350 पटवारी पदों के लिए आधिकारिक भर्ती घोषणा।",
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
        description: "Health Department invites online applications for 500 nursing staff vacancies.",
        description_hi: "स्वास्थ्य विभाग द्वारा 500 पदों पर सीधी भर्ती हेतु ऑनलाइन आवेदन आमंत्रित।",
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
        description: "Official vacancy notification for 350 Patwari posts across Chhattisgarh districts.",
        description_hi: "छत्तीसगढ़ के जिलों में 350 पटवारी पदों के लिए आधिकारिक भर्ती घोषणा।",
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
    "description": "Vacancy announcement for 250 Posts...",
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

      {/* Filter and Search header */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
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
          {filteredArticles.map((art, idx) => (
            <div
              key={idx}
              className="p-5 bg-bg-s2 border border-border rounded-xl flex flex-col gap-3 relative hover:border-saffron-border/30 transition-colors shadow-sm"
            >
              <div className="flex justify-between items-center shrink-0">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded leading-none flex items-center gap-1 ${
                  activeAdminTab === 'jobs'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-saffron-dim/30 text-saffron border border-saffron-border/30'
                }`}>
                  <span>{activeAdminTab === 'jobs' ? '💼 Job Vacancy' : '📰 News Update'}</span>
                </span>
                
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
                <div className="p-3 bg-bg-s3 border border-border rounded-lg grid grid-cols-2 gap-2 text-[10px] font-semibold text-text-muted">
                  <div><strong>Department:</strong> {art.department || 'Govt'}</div>
                  <div><strong>Posts:</strong> {art.totalPosts || 'N/A'}</div>
                  <div><strong>Qualification:</strong> {art.qualification || 'As per notice'}</div>
                  <div><strong>Deadline:</strong> {art.lastDate || 'N/A'}</div>
                </div>
              )}

              {/* Summary */}
              <div className="p-3 bg-bg-s3 border border-border rounded-lg flex flex-col gap-2 mt-1">
                <p className="text-[11px] text-text leading-normal font-medium whitespace-pre-line">
                  {art.summary_hi || art.description_hi || art.summary || art.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-[10px] border-t border-border/45 pt-3 mt-1 shrink-0">
                <span className="font-bold text-text-muted uppercase">Source: {art.source}</span>
                <a
                  href={art.url}
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
    </div>
  );
};
