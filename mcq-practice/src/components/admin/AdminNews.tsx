import React, { useState, useEffect } from 'react';
import { 
  Newspaper, RefreshCw, Loader2, Calendar, 
  Search, ShieldAlert, CheckCircle, ExternalLink, UploadCloud,
  Briefcase, Pencil, Trash2, X, Save, CheckSquare, Square, Eye
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
  history?: string;
  history_hi?: string;
  historicalContext?: string;
  historicalContext_hi?: string;
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
  bulletPoints?: string[];
  highlights?: string[];
  content?: string;
  intelligence?: any;
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

  const [viewingArticle, setViewingArticle] = useState<Article | null>(null);
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
        history: "CGPSC was constituted under Article 315 of the Constitution of India on 23 May 2001 after the state formation.",
        history_hi: "छत्तीसगढ़ लोक सेवा आयोग का गठन राज्य निर्माण के पश्चात 23 मई 2001 को भारतीय संविधान के अनुच्छेद 315 के तहत किया गया था।",
        category: "exams",
        source: "CGPSC Portal",
        url: "https://psc.cg.gov.in",
        examRelevance: "CGPSC Mains Paper 3",
        intelligence: {
          title_hi: "सीजीपीएससी राज्य सेवा मुख्य परीक्षा 2026 समय सारणी घोषित",
          category: "Exam-Specific Topics",
          relevanceScore: 95,
          whyItMatters: "Mains exam dates determine revision timeline and paper preparation strategy.",
          summary_en: "Official exam schedule released by CGPSC for 2026 Mains exam candidates.",
          summary_hi: "सीजीपीएससी ने मुख्य परीक्षा 2026 के लिए विस्तृत समय सारणी और परीक्षा केंद्र सूची जारी कर दी है।",
          history_en: "CGPSC was established in May 2001 with headquarters at Raipur.",
          history_hi: "सीजीपीएससी की स्थापना मई 2001 में रायपुर मुख्यालय के साथ की गई थी।",
          keyFacts_en: ["Exam starting dates announced", "7 papers scheduled over 4 days"],
          keyFacts_hi: ["परीक्षा तिथियों की घोषणा की गई", "4 दिनों में 7 प्रश्नपत्र आयोजित होंगे"],
          mcqs: [
            {
              question_en: "Which body conducts the State Service Exam in Chhattisgarh?",
              question_hi: "छत्तीसगढ़ में राज्य सेवा परीक्षा का आयोजन कौन सा निकाय करता है?",
              options_en: ["CG Vyapam", "CGPSC", "UPSC", "CG Board"],
              options_hi: ["सीजी व्यापम", "सीजीपीएससी", "यूपीएससी", "सीजी बोर्ड"],
              correctIndex: 1,
              explanation_en: "CGPSC is the constitutional body responsible for conducting state service exams.",
              explanation_hi: "छत्तीसगढ़ लोक सेवा आयोग (CGPSC) राज्य सेवा परीक्षाओं का संचालन करता है।"
            }
          ]
        }
      },
      {
        title: "Chhattisgarh Launches Rajiv Gandhi Kisan Nyay Yojana 2.0",
        title_hi: "छत्तीसगढ़ ने राजीव गांधी किसान न्याय योजना 2.0 की शुरुआत की",
        description: "Direct bank transfer scheme launched for paddy farmers in Chhattisgarh.",
        description_hi: "धान उत्पादक किसानों के लिए बैंक खाते में सीधी सहायता राशि योजना।",
        history: "Originally launched in 2020 to provide direct income support to paddy and kharif crop farmers.",
        history_hi: "मूल रूप से 2020 में धान एवं खरीफ फसल उत्पादक किसानों को प्रत्यक्ष आय सहायता देने हेतु शुरू की गई थी।",
        category: "affairs",
        source: "DPR Chhattisgarh",
        url: "https://dprcg.gov.in",
        examRelevance: "CG Schemes & Economy"
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
        url: "https://psc.cg.gov.in",
        examRelevance: "CGPSC Mains Paper 3",
        intelligence: {
          title_hi: "सीजीपीएससी राज्य सेवा मुख्य परीक्षा 2026 समय सारणी घोषित",
          category: "Exam-Specific Topics",
          relevanceScore: 95,
          whyItMatters: "Mains exam dates determine revision timeline and paper preparation strategy.",
          summary_en: "Official exam schedule released by CGPSC for 2026 Mains exam candidates.",
          summary_hi: "सीजीपीएससी ने मुख्य परीक्षा 2026 के लिए विस्तृत समय सारणी और परीक्षा केंद्र सूची जारी कर दी है।",
          keyFacts_en: ["Exam starting dates announced", "7 papers scheduled over 4 days"],
          keyFacts_hi: ["परीक्षा तिथियों की घोषणा की गई", "4 दिनों में 7 प्रश्नपत्र आयोजित होंगे"],
          mcqs: [
            {
              question_en: "Which body conducts the State Service Exam in Chhattisgarh?",
              question_hi: "छत्तीसगढ़ में राज्य सेवा परीक्षा का आयोजन कौन सा निकाय करता है?",
              options_en: ["CG Vyapam", "CGPSC", "UPSC", "CG Board"],
              options_hi: ["सीजी व्यापम", "सीजीपीएससी", "यूपीएससी", "सीजी बोर्ड"],
              correctIndex: 1,
              explanation_en: "CGPSC is the constitutional body responsible for conducting state service exams.",
              explanation_hi: "छत्तीसगढ़ लोक सेवा आयोग (CGPSC) राज्य सेवा परीक्षाओं का संचालन करता है।"
            }
          ]
        }
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
      const res = await fetch(getApiUrl('/api/news?includeJobs=true'));
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
    const c = (art.category || '').toLowerCase();
    const titleText = (art.title || '').toLowerCase() + ' ' + (art.title_hi || '').toLowerCase();
    const hasJobAttrs = Boolean(art.department || art.totalPosts || art.qualification || art.salary || art.lastDate);
    const isJobKeyword = titleText.includes('recruitment') || titleText.includes('bharti') || titleText.includes('vacancy') || titleText.includes('भर्ती') || titleText.includes('नियुक्तियां');
    const isJob = c === 'jobs' || c === 'job' || c === 'job_alert' || c === 'recruitment' || hasJobAttrs || isJobKeyword;
    
    if (activeAdminTab === 'jobs') {
      return isJob;
    } else {
      return !isJob;
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
                <div className="flex justify-between items-center shrink-0 gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
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

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded leading-none flex items-center gap-1 ${
                        activeAdminTab === 'jobs'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-saffron-dim/30 text-saffron border border-saffron-border/30'
                      }`}>
                        <span>{activeAdminTab === 'jobs' ? '💼 Job Vacancy' : `📰 ${art.category || 'News'}`}</span>
                      </span>

                      {art.source && (
                        <span className="text-[9px] text-text-muted bg-bg-s3 border border-border px-2 py-0.5 rounded font-bold uppercase">
                          Source: {art.source}
                        </span>
                      )}

                      {art.examRelevance && (
                        <span className="text-[8.5px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded uppercase">
                          🎯 {art.examRelevance}
                        </span>
                      )}
                    </div>
                  </div>
                
                  <span className="text-[9px] text-text-muted font-bold flex items-center gap-1 shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date || 'Today'}</span>
                  </span>
                </div>

              {/* Titles (Bilingual) */}
              <div className="flex flex-col gap-1">
                {art.title_hi && (
                  <h4 className="text-xs font-black text-text leading-snug tracking-wide">
                    {art.title_hi}
                  </h4>
                )}
                <span className={`text-xs ${art.title_hi ? 'text-text-muted font-medium italic text-[11px]' : 'font-black text-text'} leading-snug`}>
                  {art.title}
                </span>
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

              {/* Summary / Description (Bilingual for News articles) */}
              {activeAdminTab !== 'jobs' && (
                <div className="p-3 bg-bg-s3 border border-border rounded-lg flex flex-col gap-2.5 mt-1">
                  {(art.summary_hi || art.description_hi) && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase text-saffron tracking-wider">हिन्दी सारांश (Hindi Summary)</span>
                      <p className="text-[11px] text-text leading-relaxed font-medium whitespace-pre-line">
                        {art.summary_hi || art.description_hi}
                      </p>
                    </div>
                  )}

                  {(art.summary || art.description) && (
                    <div className={`flex flex-col gap-1 ${art.summary_hi || art.description_hi ? 'border-t border-border/50 pt-2' : ''}`}>
                      <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">English Summary</span>
                      <p className="text-[11px] text-text-muted leading-relaxed font-normal whitespace-pre-line">
                        {art.summary || art.description}
                      </p>
                    </div>
                  )}

                  {(art.bulletPoints || art.highlights) && (art.bulletPoints || art.highlights)!.length > 0 && (
                    <div className="border-t border-border/50 pt-2 flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider">Key Highlights</span>
                      <ul className="list-disc list-inside text-[10.5px] text-text-muted flex flex-col gap-0.5">
                        {(art.bulletPoints || art.highlights)!.map((bp, bidx) => (
                          <li key={bidx}>{bp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex flex-wrap justify-between items-center text-[10px] border-t border-border/45 pt-3 mt-1 shrink-0 gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setViewingArticle(art)}
                    className="px-2.5 py-1.5 bg-saffron-dim/20 hover:bg-saffron-dim/40 text-saffron border border-saffron-border/30 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                    title="View Full News Details"
                  >
                    <Eye className="w-3.5 h-3.5 text-saffron" />
                    <span>View Details</span>
                  </button>

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
                    {activeAdminTab === 'jobs' ? 'Job Overview & Details' : 'Article Description / Summary (Hindi)'}
                  </label>
                  <textarea
                    rows={4}
                    value={editingArticle.description_hi || editingArticle.summary_hi || editingArticle.details || ''}
                    onChange={(e) => setEditingArticle({ 
                      ...editingArticle, 
                      description_hi: e.target.value,
                      summary_hi: e.target.value,
                      details: e.target.value
                    })}
                    className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">
                    Article Description / Summary (English)
                  </label>
                  <textarea
                    rows={4}
                    value={editingArticle.description || editingArticle.summary || ''}
                    onChange={(e) => setEditingArticle({ 
                      ...editingArticle, 
                      description: e.target.value,
                      summary: e.target.value
                    })}
                    className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1">
                    <span>📜</span>
                    <span>Historical Background & Origin / इतिहास (Hindi)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="विषय का ऐतिहासिक पृष्ठभूमि, उत्पत्ति एवं इतिहास (Devanagari)..."
                    value={editingArticle.history_hi || editingArticle.historicalContext_hi || ''}
                    onChange={(e) => setEditingArticle({ 
                      ...editingArticle, 
                      history_hi: e.target.value,
                      historicalContext_hi: e.target.value
                    })}
                    className="bg-bg-s3 border border-border focus:border-amber-400/50 rounded-lg p-2.5 outline-none text-text font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-text-muted flex items-center gap-1">
                    <span>📜</span>
                    <span>Historical Background & Origin (English)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Historical background, origin, past acts, or background context in English..."
                    value={editingArticle.history || editingArticle.historicalContext || ''}
                    onChange={(e) => setEditingArticle({ 
                      ...editingArticle, 
                      history: e.target.value,
                      historicalContext: e.target.value
                    })}
                    className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">Exam Relevance Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. CGPSC Mains Paper 3, CG Police Constable"
                    value={editingArticle.examRelevance || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, examRelevance: e.target.value })}
                    className="bg-bg-s3 border border-border focus:border-saffron rounded-lg p-2.5 outline-none text-text"
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

      {/* Full Data View Modal Overlay */}
      {viewingArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-s2 border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-border/80 flex items-center justify-between bg-bg-s3/80 shrink-0">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-saffron" />
                <h3 className="text-xs font-black uppercase tracking-wider text-text">
                  Full {activeAdminTab === 'jobs' ? 'Job Alert' : 'News Article'} Data
                </h3>
              </div>
              <button
                onClick={() => setViewingArticle(null)}
                className="text-text-muted hover:text-text p-1 rounded-lg hover:bg-bg-s3 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content - Shows ALL Data */}
            <div className="p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar text-xs font-sans">
              {/* Category, Source, Date, Exam Relevance Badges */}
              <div className="flex items-center gap-2 flex-wrap border-b border-border/40 pb-3">
                <span className="text-[9.5px] font-black uppercase px-2.5 py-1 rounded bg-saffron-dim/30 text-saffron border border-saffron-border/30">
                  Category: {viewingArticle.category || 'News'}
                </span>
                {viewingArticle.source && (
                  <span className="text-[9.5px] font-bold text-text-muted bg-bg-s3 border border-border px-2.5 py-1 rounded uppercase">
                    Source: {viewingArticle.source}
                  </span>
                )}
                {viewingArticle.date && (
                  <span className="text-[9.5px] font-bold text-text-muted bg-bg-s3 border border-border px-2.5 py-1 rounded flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-text-muted" />
                    <span>{viewingArticle.date}</span>
                  </span>
                )}
                {viewingArticle.examRelevance && (
                  <span className="text-[9.5px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded uppercase">
                    🎯 Relevance: {viewingArticle.examRelevance}
                  </span>
                )}
              </div>

              {/* Titles */}
              <div className="flex flex-col gap-1.5">
                {viewingArticle.title_hi && (
                  <h2 className="text-base font-black text-text leading-snug">
                    {viewingArticle.title_hi}
                  </h2>
                )}
                <h3 className={`text-sm ${viewingArticle.title_hi ? 'text-text-muted font-semibold italic' : 'text-text font-black'} leading-snug`}>
                  {viewingArticle.title}
                </h3>
              </div>

              {/* Job Details Grid */}
              {activeAdminTab === 'jobs' && (
                <div className="p-4 bg-bg-s3 border border-border rounded-xl flex flex-col gap-3">
                  <h4 className="text-xs font-black uppercase text-emerald-400 border-b border-border/40 pb-2">
                    Job Vacancy Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div><strong className="text-text">Department:</strong> {viewingArticle.department || (viewingArticle as any).dept || 'N/A'}</div>
                    <div><strong className="text-text">Total Posts:</strong> {viewingArticle.totalPosts || (viewingArticle as any).posts || 'N/A'}</div>
                    <div className="sm:col-span-2"><strong className="text-text">Qualification:</strong> {viewingArticle.qualification || 'N/A'}</div>
                    <div><strong className="text-text">Last Date:</strong> {viewingArticle.lastDate || 'N/A'}</div>
                    <div><strong className="text-text">Salary:</strong> {viewingArticle.salary || 'N/A'}</div>
                    {viewingArticle.ageLimit && <div><strong className="text-text">Age Limit:</strong> {viewingArticle.ageLimit}</div>}
                    {viewingArticle.fee && <div><strong className="text-text">Application Fee:</strong> {viewingArticle.fee}</div>}
                  </div>
                </div>
              )}

              {/* Hindi Summary / Description */}
              {(viewingArticle.summary_hi || viewingArticle.description_hi) && (
                <div className="p-4 bg-bg-s3 border border-border rounded-xl flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase text-saffron tracking-wider flex items-center gap-1">
                    <span>🇮🇳 हिन्दी विवरण (Hindi Description)</span>
                  </span>
                  <p className="text-xs text-text leading-relaxed font-medium whitespace-pre-line">
                    {viewingArticle.summary_hi || viewingArticle.description_hi}
                  </p>
                </div>
              )}

              {/* Historical Background & Context (Hindi & English) */}
              {(viewingArticle.history_hi || viewingArticle.historicalContext_hi || viewingArticle.history || viewingArticle.historicalContext) && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl flex flex-col gap-2.5">
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
                    <span>📜</span>
                    <span>ऐतिहासिक पृष्ठभूमि एवं इतिहास (Historical Background & Origin)</span>
                  </span>
                  
                  {(viewingArticle.history_hi || viewingArticle.historicalContext_hi) && (
                    <p className="text-xs text-text leading-relaxed font-medium whitespace-pre-line">
                      {viewingArticle.history_hi || viewingArticle.historicalContext_hi}
                    </p>
                  )}

                  {(viewingArticle.history || viewingArticle.historicalContext) && (
                    <p className={`text-xs text-text-muted leading-relaxed font-normal whitespace-pre-line ${(viewingArticle.history_hi || viewingArticle.historicalContext_hi) ? 'border-t border-border/40 pt-2' : ''}`}>
                      {viewingArticle.history || viewingArticle.historicalContext}
                    </p>
                  )}
                </div>
              )}

              {/* English Summary / Description */}
              {(viewingArticle.summary || viewingArticle.description) && (
                <div className="p-4 bg-bg-s3 border border-border rounded-xl flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center gap-1">
                    <span>🌐 English Description / Overview</span>
                  </span>
                  <p className="text-xs text-text leading-relaxed font-normal whitespace-pre-line">
                    {viewingArticle.summary || viewingArticle.description}
                  </p>
                </div>
              )}

              {/* Detailed Article Body / Content */}
              {(viewingArticle.details || viewingArticle.content) && (
                <div className="p-4 bg-bg-s3 border border-border rounded-xl flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase text-text tracking-wider">
                    📜 Detailed Article Content / Text
                  </span>
                  <p className="text-xs text-text-muted leading-relaxed whitespace-pre-line font-mono">
                    {viewingArticle.details || viewingArticle.content}
                  </p>
                </div>
              )}

              {/* Bullet Points / Highlights */}
              {(viewingArticle.bulletPoints || viewingArticle.highlights) && (viewingArticle.bulletPoints || viewingArticle.highlights)!.length > 0 && (
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    ⚡ Key Highlights & Facts
                  </span>
                  <ul className="list-disc list-inside text-xs text-text flex flex-col gap-1.5 pl-1">
                    {(viewingArticle.bulletPoints || viewingArticle.highlights)!.map((point, idx) => (
                      <li key={idx} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Raw JSON Data View for Admin */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-border/40">
                <span className="text-[10px] font-black uppercase text-text-muted">Raw JSON Payload</span>
                <pre className="p-3 bg-bg-s1 border border-border rounded-lg text-[10px] text-text-muted overflow-x-auto font-mono">
                  {JSON.stringify(viewingArticle, null, 2)}
                </pre>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-border/80 flex items-center justify-between bg-bg-s3/40 shrink-0">
              <a
                href={viewingArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-saffron/10 border border-saffron-border/30 text-saffron text-xs font-bold uppercase rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-saffron/20 transition-all"
              >
                <span>Open Source Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingArticle({ ...viewingArticle });
                    setViewingArticle(null);
                  }}
                  className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase rounded-lg cursor-pointer hover:bg-blue-500/20 transition-all flex items-center gap-1"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Data</span>
                </button>
                <button
                  onClick={() => setViewingArticle(null)}
                  className="px-4 py-2 bg-bg-s3 border border-border text-text text-xs font-bold uppercase rounded-lg cursor-pointer hover:bg-bg-s3/80 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
