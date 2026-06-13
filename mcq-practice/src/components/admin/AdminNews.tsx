import React, { useState, useEffect } from 'react';
import { 
  Newspaper, RefreshCw, Loader2, Calendar, Globe, 
  Search, ShieldAlert, CheckCircle, ExternalLink, UploadCloud 
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
    
    // Strip markdown code block formatting (e.g. ```json ... ```)
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
          result += char;
          escaped = true;
        } else if (char === '"') {
          result += char;
          inString = false;
        } else if (char === '\n' || char === '\r') {
          // Raw newline inside a string literal! Let's check if it's a missing closing quote.
          // Look ahead to see if the next non-whitespace character starts with a double quote.
          let lookAheadIdx = i + 1;
          while (lookAheadIdx < cleanStr.length && /\s/.test(cleanStr[lookAheadIdx])) {
            lookAheadIdx++;
          }
          
          let isMissingQuote = false;
          if (lookAheadIdx < cleanStr.length && cleanStr[lookAheadIdx] === '"') {
            isMissingQuote = true;
          }
          
          if (isMissingQuote) {
            // Auto-insert the missing closing quote before the newline
            result += '"';
            inString = false;
            result += char; // append the newline as structural whitespace
          } else {
            // Standard multiline string: escape the newline character
            if (char === '\n') {
              result += '\\n';
            } else if (char === '\r') {
              result += '\\r';
            }
          }
        } else {
          const code = char.charCodeAt(0);
          if (code < 32) {
            if (char === '\t') {
              result += '\\t';
            } else if (char === '\b') {
              result += '\\b';
            } else if (char === '\f') {
              result += '\\f';
            } else {
              const hex = code.toString(16).padStart(4, '0');
              result += '\\u' + hex;
            }
          } else {
            result += char;
          }
        }
      } else {
        if (char === '"' || char === '{' || char === '[') {
          // We are starting a new string, object, or array. Let's check if the previous token
          // was a closing quote, closing bracket, or closing brace, and we forgot a comma.
          let lastCharIdx = result.length - 1;
          while (lastCharIdx >= 0 && /\s/.test(result[lastCharIdx])) {
            lastCharIdx--;
          }
          
          if (lastCharIdx >= 0) {
            const lastNonWsChar = result[lastCharIdx];
            // If the last character was a closing quote, closing bracket, or closing brace,
            // we should auto-insert a comma.
            if (lastNonWsChar === '"' || lastNonWsChar === ']' || lastNonWsChar === '}') {
              result = result.slice(0, lastCharIdx + 1) + ',' + result.slice(lastCharIdx + 1);
            }
          }
          
          if (char === '"') {
            inString = true;
          }
        }
        
        // Auto-remove trailing commas
        if (char === ',') {
          let nextIdx = i + 1;
          while (nextIdx < cleanStr.length && /\s/.test(cleanStr[nextIdx])) {
            nextIdx++;
          }
          if (nextIdx < cleanStr.length && (cleanStr[nextIdx] === '}' || cleanStr[nextIdx] === ']')) {
            // Trailing comma! Skip appending it
            continue;
          }
        }
        
        result += char;
      }
    }

    return result
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
      .replace(/\u00A0/g, ' ') // Convert non-breaking spaces to standard spaces
      .trim();
  };

  const getJsonErrorContext = (jsonText: string, errMessage: string): string => {
    const match = errMessage.match(/at position (\d+)/);
    if (!match) return '';
    
    const pos = parseInt(match[1], 10);
    const start = Math.max(0, pos - 40);
    const end = Math.min(jsonText.length, pos + 40);
    const context = jsonText.slice(start, end);
    const prefix = context.slice(0, pos - start);
    const pointer = ' '.repeat(prefix.length) + '^';
    return `\n\nContext around error:\n>>> ${context} <<<\n    ${pointer}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
      setPasteJson('');
    }
  };

  const handleLoadTemplate = () => {
    const sampleNews = [
      {
        title: "CGPSC State Service Exam 2026 Notification Out",
        title_hi: "सीजीपीएससी राज्य सेवा परीक्षा 2026 अधिसूचना जारी",
        description: "The Chhattisgarh Public Service Commission has released the official notification for the State Service Exam 2026. Online applications start next week.",
        description_hi: "छत्तीसगढ़ लोक सेवा आयोग ने राज्य सेवा परीक्षा 2026 के लिए आधिकारिक अधिसूचना जारी कर दी है। ऑनलाइन आवेदन अगले सप्ताह से शुरू होंगे।",
        category: "exams",
        source: "CGPSC Portal",
        url: "https://psc.cg.gov.in"
      },
      {
        title: "Chhattisgarh Vyapam Patwari Recruitment 2026",
        title_hi: "छत्तीसगढ़ व्यापम पटवारी भर्ती 2026",
        description: "Official vacancy announcement for 250 posts of Patwari across multiple districts in Chhattisgarh.",
        description_hi: "छत्तीसगढ़ के विभिन्न जिलों में पटवारी के 250 पदों के लिए आधिकारिक भर्ती घोषणा।",
        category: "jobs",
        source: "CG Vyapam",
        url: "https://vyapam.cgstate.gov.in"
      },
      {
        title: "Chhattisgarh Government Launches New Scheme for Farmers",
        title_hi: "छत्तीसगढ़ सरकार ने किसानों के लिए नई योजना शुरू की",
        description: "A new agricultural support scheme has been launched to provide input subsidies directly to the bank accounts of paddy farmers.",
        description_hi: "धान उत्पादक किसानों के बैंक खातों में सीधे इनपुट सब्सिडी प्रदान करने के लिए एक नई कृषि सहायता योजना शुरू की गई है।",
        category: "affairs",
        source: "DPR Chhattisgarh",
        url: "https://dprcg.gov.in"
      }
    ];
    setPasteJson(JSON.stringify(sampleNews, null, 2));
    setUploadFile(null); // Clear selected file to prioritize pasted text
  };

  const handleDownloadTemplate = () => {
    const sampleNews = [
      {
        title: "CGPSC State Service Exam 2026 Notification Out",
        title_hi: "सीजीपीएससी राज्य सेवा परीक्षा 2026 अधिसूचना जारी",
        description: "The Chhattisgarh Public Service Commission has released the official notification for the State Service Exam 2026. Online applications start next week.",
        description_hi: "छत्तीसगढ़ लोक सेवा आयोग ने राज्य सेवा परीक्षा 2026 के लिए आधिकारिक अधिसूचना जारी कर दी है। ऑनलाइन आवेदन अगले सप्ताह से शुरू होंगे।",
        category: "exams",
        source: "CGPSC Portal",
        url: "https://psc.cg.gov.in"
      },
      {
        title: "Chhattisgarh Vyapam Patwari Recruitment 2026",
        title_hi: "छत्तीसगढ़ व्यापम पटवारी भर्ती 2026",
        description: "Official vacancy announcement for 250 posts of Patwari across multiple districts in Chhattisgarh.",
        description_hi: "छत्तीसगढ़ के विभिन्न जिलों में पटवारी के 250 पदों के लिए आधिकारिक भर्ती घोषणा।",
        category: "jobs",
        source: "CG Vyapam",
        url: "https://vyapam.cgstate.gov.in"
      },
      {
        title: "Chhattisgarh Government Launches New Scheme for Farmers",
        title_hi: "छत्तीसगढ़ सरकार ने किसानों के लिए नई योजना शुरू की",
        description: "A new agricultural support scheme has been launched to provide input subsidies directly to the bank accounts of paddy farmers.",
        description_hi: "धान उत्पादक किसानों के बैंक खातों में सीधे इनपुट सब्सिडी प्रदान करने के लिए एक नई कृषि सहायता योजना शुरू की गई है।",
        category: "affairs",
        source: "DPR Chhattisgarh",
        url: "https://dprcg.gov.in"
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

  const handleUploadNewsJson = async () => {
    setLoadingUpload(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      let articlesToUpload: any[] = [];

      if (uploadFile) {
        const fileContent = await uploadFile.text();
        const sanitized = sanitizeJsonString(fileContent);
        if (!sanitized.startsWith('{') && !sanitized.startsWith('[')) {
          throw new Error("The selected file does not appear to be a valid JSON structure (it must start with '{' or '[').");
        }
        const parsed = JSON.parse(sanitized);
        if (Array.isArray(parsed)) {
          articlesToUpload = parsed;
        } else if (parsed && Array.isArray(parsed.articles)) {
          articlesToUpload = parsed.articles;
        } else {
          throw new Error('Invalid JSON format. Expected an array of articles or an object with an "articles" array.');
        }
      } else if (pasteJson.trim()) {
        const sanitized = sanitizeJsonString(pasteJson.trim());
        if (!sanitized.startsWith('{') && !sanitized.startsWith('[')) {
          throw new Error("The pasted text does not appear to be a valid JSON structure (it must start with '{' or '['). Please verify your text.");
        }
        const parsed = JSON.parse(sanitized);
        if (Array.isArray(parsed)) {
          articlesToUpload = parsed;
        } else if (parsed && Array.isArray(parsed.articles)) {
          articlesToUpload = parsed.articles;
        } else {
          throw new Error('Invalid JSON format. Expected an array of articles or an object with an "articles" array.');
        }
      }

      if (articlesToUpload.length === 0) {
        throw new Error('No articles found to upload.');
      }

      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/news/upload'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ articles: articlesToUpload })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully uploaded and cached ${data.totalArticles} articles!`);
        setUploadFile(null);
        setPasteJson('');
        setShowUploadSection(false);
        fetchNewsCache();
      } else {
        throw new Error(data.error || 'Server rejected the uploaded JSON.');
      }
    } catch (err: any) {
      console.error(err);
      let errorMsg = err.message || 'Upload failed. Check if JSON syntax is correct.';
      if (err.message && err.message.includes('position')) {
        const rawInput = uploadFile ? await uploadFile.text() : pasteJson;
        const sanitized = sanitizeJsonString(rawInput);
        errorMsg += getJsonErrorContext(sanitized, err.message);
      }
      setErrorMessage(errorMsg);
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
          <span className="whitespace-pre-wrap font-mono">{errorMessage}</span>
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

      {/* Upload/Paste News JSON Card */}
      <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-saffron/10 border border-saffron-border/30 rounded-lg flex items-center justify-center text-saffron shrink-0">
              <Newspaper className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs font-black uppercase text-text tracking-wider">Upload or Paste News JSON</h3>
              <span className="text-[10px] text-text-muted font-bold">Import articles dynamically from a file or raw JSON text</span>
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
            {/* Input options: File Upload or Raw Paste */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* File Upload Box */}
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
                  <span className="text-[9px] text-text-muted font-semibold">Drag & drop or browse your local files (.json)</span>
                </div>
                {uploadFile && (
                  <span className="text-[10px] font-black text-saffron bg-saffron/10 border border-saffron-border/25 px-2 py-0.5 rounded">
                    Selected: {uploadFile.name}
                  </span>
                )}
              </div>

              {/* Paste JSON Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-text-muted">Paste Raw JSON Array / पेस्ट करें</label>
                <textarea
                  placeholder={`[
  {
    "title": "CGPSC Notification 2026",
    "title_hi": "सीजीपीएससी अधिसूचना 2026",
    "description": "Details about upcoming CGPSC exams...",
    "category": "exams",
    "source": "Official Portal",
    "url": "https://psc.cg.gov.in"
  }
]`}
                  value={pasteJson}
                  onChange={(e) => setPasteJson(e.target.value)}
                  rows={6}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron/50 rounded-lg p-3 outline-none font-mono placeholder:text-text-muted/40"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40 w-full">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleLoadTemplate}
                  className="px-3 py-2 bg-bg-s3 border border-border hover:bg-bg-s3/80 text-text text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>📋</span>
                  <span>Load Sample Text</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="px-3 py-2 bg-bg-s3 border border-border hover:bg-bg-s3/80 text-text text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>📥</span>
                  <span>Download Demo JSON</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleUploadNewsJson}
                disabled={loadingUpload || (!uploadFile && !pasteJson.trim())}
                className="px-5 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
              >
                {loadingUpload ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading Articles...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Import JSON Articles</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
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
