import React, { useState, useEffect } from 'react';
import { 
  Brain, Plus, Trash2, Calendar, Search, AlertCircle, RefreshCw, 
  BookOpen, FileText, Sparkles, Server, CheckCircle, Loader2, ArrowUpCircle, ChevronDown, ChevronUp
} from 'lucide-react';

interface TrainingEntry {
  id: string;
  subject: string;
  topic: string;
  source: string;
  examTags: string[];
  createdAt: string;
  charCount: number;
}

interface StatsInfo {
  totalEntries: number;
  totalChars: number;
  subjects: Record<string, number>;
  examTags: Record<string, number>;
}

interface AdminTrainingProps {
  currentUser: any;
}

export const AdminTraining: React.FC<AdminTrainingProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'file-upload'>('list');
  const [entries, setEntries] = useState<TrainingEntry[]>([]);
  const [stats, setStats] = useState<StatsInfo | null>(null);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedContent, setExpandedContent] = useState<string>('');
  const [loadingContentId, setLoadingContentId] = useState<string | null>(null);

  // Form states
  const [newEntry, setNewEntry] = useState({
    subject: '',
    topic: '',
    content: '',
    source: '',
    examTags: ['cgpsc', 'vyapam']
  });

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadParams, setUploadParams] = useState({
    subject: '',
    source: '',
    aiExtract: true,
    examTags: ['cgpsc', 'vyapam']
  });

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

  const fetchTrainingData = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError('');
    try {
      const token = await currentUser.getIdToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [listRes, statsRes] = await Promise.all([
        fetch(getApiUrl('/api/admin/training-data'), { headers }),
        fetch(getApiUrl('/api/admin/training-data-stats'), { headers })
      ]);

      if (!listRes.ok || !statsRes.ok) {
        throw new Error('Failed to load training data or statistics.');
      }

      const listData = await listRes.json();
      const statsData = await statsRes.json();

      setEntries(listData.entries || []);
      setStats(statsData);
    } catch (err: any) {
      console.error('[Fetch Training Data Error]:', err);
      setError(err.message || 'An error occurred while fetching AI training data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingData();
  }, [currentUser]);

  const handleToggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setExpandedContent('');
      return;
    }
    
    setLoadingContentId(id);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/training-data/${id}`), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Could not load entry details.');
      const data = await res.json();
      setExpandedId(id);
      setExpandedContent(data.content || 'No content found.');
    } catch (err: any) {
      alert(err.message || 'Error loading content.');
    } finally {
      setLoadingContentId(null);
    }
  };

  const handleDeleteEntry = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this training data fact/entry?')) return;
    setDeletingId(id);
    setError('');
    setSuccess('');
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/training-data/${id}`), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete training data.');
      
      setEntries(prev => prev.filter(item => item.id !== id));
      setSuccess('Knowledge base entry deleted successfully!');
      
      // Refresh stats
      const statsRes = await fetch(getApiUrl('/api/admin/training-data-stats'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
      
      if (expandedId === id) {
        setExpandedId(null);
        setExpandedContent('');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete entry.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.subject || !newEntry.topic || !newEntry.content) {
      setError('Please fill in all required fields (Subject, Topic, Fact/Content).');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/training-data/upload'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newEntry)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload entry.');

      setSuccess('Verified training fact successfully added to Knowledge Base!');
      setNewEntry({
        subject: '',
        topic: '',
        content: '',
        source: '',
        examTags: ['cgpsc', 'vyapam']
      });
      setActiveTab('list');
      fetchTrainingData();
    } catch (err: any) {
      setError(err.message || 'Error submitting training entry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setError('Please select a PDF or TXT reference file.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const token = await currentUser.getIdToken();
      const formData = new FormData();
      formData.append('trainingFile', uploadFile);
      formData.append('subject', uploadParams.subject);
      formData.append('source', uploadParams.source);
      formData.append('aiExtract', uploadParams.aiExtract ? 'true' : 'false');
      formData.append('examTags', JSON.stringify(uploadParams.examTags));

      const res = await fetch(getApiUrl('/api/admin/training-data/upload-file'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload and extract training file.');

      setSuccess(`File processed successfully! Extracted and saved ${data.extractedCount || data.count || 'training'} entries.`);
      setUploadFile(null);
      // Reset input element
      const fileInput = document.getElementById('training-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      setActiveTab('list');
      fetchTrainingData();
    } catch (err: any) {
      setError(err.message || 'Error uploading reference file.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleExamTagChange = (tag: string, type: 'manual' | 'upload') => {
    if (type === 'manual') {
      const current = [...newEntry.examTags];
      const idx = current.indexOf(tag);
      if (idx > -1) {
        current.splice(idx, 1);
      } else {
        current.push(tag);
      }
      setNewEntry(prev => ({ ...prev, examTags: current }));
    } else {
      const current = [...uploadParams.examTags];
      const idx = current.indexOf(tag);
      if (idx > -1) {
        current.splice(idx, 1);
      } else {
        current.push(tag);
      }
      setUploadParams(prev => ({ ...prev, examTags: current }));
    }
  };

  // Filter list
  const filteredEntries = entries.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.subject.toLowerCase().includes(query) ||
      item.topic.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query)
    );
  });

  const availableTags = ['cgpsc', 'vyapam', 'patwari', 'peon', 'police', 'general'];

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full text-text">
      
      {/* Header Info Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bg-s2 border border-border p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-saffron/10 border border-saffron-border/30 rounded-lg flex items-center justify-center text-saffron shrink-0">
            <Brain className="w-5 h-5 fill-saffron/10" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-text">AI Guru Trainer & Knowledge Base</h3>
            <p className="text-[10px] text-text-muted font-bold tracking-wide mt-0.5">
              Train the chatbot by uploading correct Chhattisgarh textbook data, statistics, and historical facts.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => { setActiveTab('list'); setError(''); setSuccess(''); }}
            className={`flex-1 sm:flex-none px-4 py-2 border rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
              activeTab === 'list' 
                ? 'bg-saffron text-bg-s1 border-saffron font-black' 
                : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted hover:text-text'
            }`}
          >
            Facts List
          </button>
          <button
            onClick={() => { setActiveTab('add'); setError(''); setSuccess(''); }}
            className={`flex-1 sm:flex-none px-4 py-2 border rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
              activeTab === 'add' 
                ? 'bg-saffron text-bg-s1 border-saffron font-black' 
                : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted hover:text-text'
            }`}
          >
            Add Fact
          </button>
          <button
            onClick={() => { setActiveTab('file-upload'); setError(''); setSuccess(''); }}
            className={`flex-1 sm:flex-none px-4 py-2 border rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
              activeTab === 'file-upload' 
                ? 'bg-saffron text-bg-s1 border-saffron font-black' 
                : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text-muted hover:text-text'
            }`}
          >
            Upload Book/PDF
          </button>
        </div>
      </div>

      {/* Messages */}
      {success && (
        <div className="p-4 bg-greenL/10 border border-greenL/20 text-greenL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
          <button onClick={() => setSuccess('')} className="ml-auto text-greenL/60 hover:text-greenL">✕</button>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError('')} className="ml-auto text-redL/60 hover:text-redL">✕</button>
        </div>
      )}

      {/* TAB CONTENT: FACT LISTING */}
      {activeTab === 'list' && (
        <div className="flex flex-col gap-6">
          
          {/* Stats Bar */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-bg-s2 border border-border p-4 rounded-xl shadow flex items-center gap-3">
                <Server className="w-8 h-8 text-saffron shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-text-muted">Total Knowledge Blocks</span>
                  <span className="text-xl font-black text-text mt-0.5">{stats.totalEntries}</span>
                </div>
              </div>
              <div className="bg-bg-s2 border border-border p-4 rounded-xl shadow flex items-center gap-3">
                <FileText className="w-8 h-8 text-saffron shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-text-muted">Total Knowledge Size</span>
                  <span className="text-xl font-black text-text mt-0.5">{(stats.totalChars / 1024).toFixed(1)} KB</span>
                </div>
              </div>
              <div className="bg-bg-s2 border border-border p-4 rounded-xl shadow flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-saffron shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-text-muted">Subjects Covered</span>
                  <span className="text-xl font-black text-text mt-0.5">{Object.keys(stats.subjects).length} Subjects</span>
                </div>
              </div>
            </div>
          )}

          {/* Search bar */}
          <div className="flex items-center gap-3 bg-bg-s2 border border-border p-3.5 rounded-xl shadow-md relative">
            <Search className="w-4 h-4 text-text-muted shrink-0" />
            <input
              type="text"
              placeholder="Search facts by Subject, Topic, or Book Source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-xs text-text placeholder:text-text-muted font-bold"
            />
            <button
              onClick={fetchTrainingData}
              disabled={loading}
              className="p-1.5 hover:bg-bg-s3 border border-border rounded text-text-muted hover:text-text cursor-pointer transition-colors"
              title="Refresh training data list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Facts Table/List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-text-muted">
              <Loader2 className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold uppercase tracking-wider">Loading Knowledge Base...</span>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="p-12 bg-bg-s2 border border-border rounded-xl text-center flex flex-col items-center justify-center gap-3 shadow">
              <span className="text-3xl">📚</span>
              <p className="text-xs text-text-muted font-bold">
                {searchQuery ? 'No verified facts found matching your search query.' : 'No training facts uploaded yet. Upload correct facts to correct AI chat errors.'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">Verified Facts ({filteredEntries.length})</span>
              
              <div className="flex flex-col gap-3">
                {filteredEntries.map((item) => {
                  const isExpanded = expandedId === item.id;
                  const isLoadingContent = loadingContentId === item.id;

                  return (
                    <div 
                      key={item.id}
                      className={`bg-bg-s2 border hover:border-saffron-border/30 rounded-xl overflow-hidden shadow-sm transition-all duration-200 cursor-pointer ${
                        isExpanded ? 'border-saffron-border/60 shadow-md ring-1 ring-saffron/10' : 'border-border'
                      }`}
                      onClick={() => handleToggleExpand(item.id)}
                    >
                      {/* Summary row */}
                      <div className="p-4 flex items-center justify-between gap-4 select-none">
                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 bg-saffron-dim/15 border border-saffron-border/30 text-[9px] font-black uppercase text-saffron rounded-full">
                              {item.subject}
                            </span>
                            {item.source && (
                              <span className="px-2 py-0.5 bg-bg-s3 border border-border text-[9px] font-bold text-text-muted rounded-full max-w-[150px] truncate" title={`Source: ${item.source}`}>
                                Source: {item.source}
                              </span>
                            )}
                            <span className="text-[9px] font-bold text-text-muted uppercase">
                              {(item.charCount / 1024).toFixed(2)} KB
                            </span>
                          </div>
                          
                          <span className="text-xs font-black text-text mt-1.5 truncate">
                            {item.topic}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            onClick={(e) => handleDeleteEntry(item.id, e)}
                            disabled={deletingId === item.id}
                            className="p-2 bg-bg-s3 hover:bg-red-500/10 border border-border/60 hover:border-red-500/20 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-all hover:scale-[1.05]"
                            title="Delete Fact Entry"
                          >
                            {deletingId === item.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                          
                          <div className="text-text-muted hover:text-text">
                            {isLoadingContent ? (
                              <Loader2 className="w-4 h-4 animate-spin text-saffron" />
                            ) : isExpanded ? (
                              <ChevronUp className="w-4.5 h-4.5" />
                            ) : (
                              <ChevronDown className="w-4.5 h-4.5" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content drawer */}
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-border/40 bg-bg-s3/40 animate-fade-in">
                          <div className="mt-3 bg-bg-s3 border border-border/60 p-4 rounded-lg text-xs leading-relaxed text-text font-medium whitespace-pre-wrap select-text">
                            {expandedContent}
                          </div>
                          <div className="flex items-center justify-between text-[9px] font-bold text-text-muted uppercase tracking-wider mt-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-saffron" />
                              <span>
                                Added: {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric', month: 'short', year: 'numeric'
                                })}
                              </span>
                            </span>
                            <span className="flex gap-1.5">
                              {item.examTags.map(tag => (
                                <span key={tag} className="px-1.5 py-0.5 bg-bg-s3 border border-border rounded text-[8px]">
                                  {tag}
                                </span>
                              ))}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB CONTENT: ADD MANUAL ENTRY */}
      {activeTab === 'add' && (
        <form onSubmit={handleSaveEntry} className="bg-bg-s2 border border-border p-6 rounded-xl shadow-md flex flex-col gap-5 max-w-2xl">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Plus className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">Add Verified Fact Entry</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Subject <span className="text-redL">*</span></label>
              <input
                type="text"
                placeholder="e.g. छत्तीसगढ़ का इतिहास, छत्तीसगढ़ का भूगोल"
                value={newEntry.subject}
                onChange={(e) => setNewEntry(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none font-bold"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Topic / Sub-Topic <span className="text-redL">*</span></label>
              <input
                type="text"
                placeholder="e.g. कलचुरी राजवंश, महानदी अपवाह तंत्र"
                value={newEntry.topic}
                onChange={(e) => setNewEntry(prev => ({ ...prev, topic: e.target.value }))}
                className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none font-bold"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-text-muted">Verified Reference Book Source</label>
            <input
              type="text"
              placeholder="e.g. हरिराम पटेल छत्तीसगढ़ विशिष्ट अध्ययन, ग्रंथ अकादमी"
              value={newEntry.source}
              onChange={(e) => setNewEntry(prev => ({ ...prev, source: e.target.value }))}
              className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none font-bold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-text-muted">Detailed Knowledge Content / Verified Fact <span className="text-redL">*</span></label>
            <span className="text-[8px] text-text-muted font-bold -mt-1 block">Write facts, numbers, dates, lists, or descriptions clearly. The AI will look up this content when answering user queries.</span>
            <textarea
              rows={8}
              placeholder="छत्तीसगढ़ के कलचुरी वंश के संस्थापक कृष्णराज थे, परंतु छत्तीसगढ़ में इस शाखा के वास्तविक संस्थापक कलिंगराज थे (1000 ईस्वी) जिन्होंने तुम्माण को अपनी राजधानी बनाया..."
              value={newEntry.content}
              onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
              className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none resize-none font-bold leading-relaxed"
              required
            />
          </div>

          {/* Exam Tags */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-text-muted">Target Exam Targets</label>
            <div className="flex flex-wrap gap-2.5 mt-0.5">
              {availableTags.map(tag => {
                const isChecked = newEntry.examTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleExamTagChange(tag, 'manual')}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-saffron/15 border-saffron text-saffron'
                        : 'bg-bg-s3 border-border text-text-muted hover:text-text'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading to server...</span>
              </>
            ) : (
              <>
                <ArrowUpCircle className="w-3.5 h-3.5" />
                <span>Submit Fact to Database</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* TAB CONTENT: FILE UPLOAD */}
      {activeTab === 'file-upload' && (
        <form onSubmit={handleFileUpload} className="bg-bg-s2 border border-border p-6 rounded-xl shadow-md flex flex-col gap-5 max-w-2xl">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <BookOpen className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">Upload Reference Study Materials</h3>
          </div>

          <div className="p-4 bg-bg-s3/40 border border-dashed border-border/80 rounded-lg flex flex-col items-center justify-center gap-2 text-center py-6">
            <FileText className="w-8 h-8 text-text-muted" />
            <div className="flex flex-col gap-1 mt-1">
              <span className="text-xs font-black text-text">Choose PDF or TXT reference book/material</span>
              <span className="text-[8px] text-text-muted font-bold uppercase tracking-wider">File limit: 10MB • Files containing clear text only</span>
            </div>
            
            <input
              id="training-file-input"
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="mt-3 text-xs text-text-muted file:mr-4 file:py-1.5 file:px-3.5 file:rounded-md file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-saffron file:text-bg-s1 file:cursor-pointer hover:file:bg-orange-500 cursor-pointer font-bold"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Subject Topic Profile</label>
              <input
                type="text"
                placeholder="e.g. छत्तीसगढ़ का सामान्य ज्ञान"
                value={uploadParams.subject}
                onChange={(e) => setUploadParams(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none font-bold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Reference Source Name</label>
              <input
                type="text"
                placeholder="e.g. छत्तीसगढ़ ग्रंथ अकादमी पुस्तक"
                value={uploadParams.source}
                onChange={(e) => setUploadParams(prev => ({ ...prev, source: e.target.value }))}
                className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none font-bold"
              />
            </div>
          </div>

          {/* AI Smart Extract Toggle */}
          <div className="flex items-start gap-3 p-3.5 bg-bg-s3 border border-border rounded-lg select-none">
            <input
              type="checkbox"
              id="ai-extract-checkbox"
              checked={uploadParams.aiExtract}
              onChange={(e) => setUploadParams(prev => ({ ...prev, aiExtract: e.target.checked }))}
              className="mt-0.5 h-4 w-4 accent-saffron cursor-pointer"
            />
            <label htmlFor="ai-extract-checkbox" className="flex flex-col gap-0.5 cursor-pointer">
              <span className="text-[11px] font-black text-text uppercase tracking-wide">AI Smart knowledge chunks extraction</span>
              <span className="text-[9px] text-text-muted font-bold leading-normal">
                If checked, Gemini will automatically process the book text, remove page numbers, clean formatting errors, and split it into clean, fact-wise database entries. If unchecked, the file will be saved in raw paragraph format.
              </span>
            </label>
          </div>

          {/* Exam Tags */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-text-muted">Target Exam Targets</label>
            <div className="flex flex-wrap gap-2.5 mt-0.5">
              {availableTags.map(tag => {
                const isChecked = uploadParams.examTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleExamTagChange(tag, 'upload')}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-saffron/15 border-saffron text-saffron'
                        : 'bg-bg-s3 border-border text-text-muted hover:text-text'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>AI is reading & extracting paragraphs...</span>
              </>
            ) : (
              <>
                <ArrowUpCircle className="w-3.5 h-3.5" />
                <span>Upload Reference Book & Train AI</span>
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
};
