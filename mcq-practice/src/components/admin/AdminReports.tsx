import React, { useState, useEffect } from 'react';
import { AlertTriangle, Trash2, Calendar, User, Mail, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { MarkdownRenderer } from '../MarkdownRenderer';

interface ReportedQuestion {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  question: {
    question: string;
    options: string[];
    correctIndex: number;
    difficulty?: string;
    topic?: string;
  };
  reason: string;
  createdAt: string;
}

interface AdminReportsProps {
  currentUser: any;
}

export const AdminReports: React.FC<AdminReportsProps> = ({ currentUser }) => {
  const [reports, setReports] = useState<ReportedQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const fetchReports = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError('');
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/reports'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error('Failed to load reported questions.');
      }
      const data = await res.json();
      setReports(data);
    } catch (err: any) {
      console.error('[Fetch Reports Error]:', err);
      setError(err.message || 'An error occurred while fetching reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [currentUser]);

  const handleDeleteReport = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this reported question entry?')) return;
    setDeletingId(id);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/reports/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error('Failed to delete report entry.');
      }
      setReports(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting report.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReports = reports.filter(item => {
    const query = searchQuery.toLowerCase();
    const qText = item.question?.question || '';
    const qTopic = item.question?.topic || '';
    return (
      item.displayName.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.reason.toLowerCase().includes(query) ||
      qText.toLowerCase().includes(query) ||
      qTopic.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Page Title & Reload */}
      <div className="flex justify-between items-center bg-bg-s2 border border-border p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/10 border border-red-500/25 rounded-lg flex items-center justify-center text-redL shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-text">Reported Questions</h3>
            <p className="text-[10px] text-text-muted font-bold tracking-wide mt-0.5">Review question errors and corrections flagged by users during practice</p>
          </div>
        </div>
        <button
          onClick={fetchReports}
          disabled={loading}
          className="p-2.5 bg-bg-s3 hover:bg-bg-s2 border border-border rounded-lg text-text-muted hover:text-text cursor-pointer transition-all flex items-center gap-1.5 shadow"
          title="Refresh Reports"
        >
          <RefreshCw className={`w-4 h-4 text-saffron ${loading ? 'animate-spin' : ''}`} />
          <span className="text-[10px] font-black uppercase hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search by name, email, question content, or issue description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-bg-s2 border border-border focus:border-saffron focus:ring-1 focus:ring-saffron/20 pl-10 pr-4 py-3 rounded-xl outline-none transition-colors text-xs text-text placeholder:text-text-muted font-bold"
        />
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-text-muted">
          <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider">Loading reports...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="p-8 bg-bg-s2 border border-border rounded-xl text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-bg-s3 border border-border flex items-center justify-center text-text-muted text-lg">
            🔍
          </div>
          <p className="text-xs text-text-muted font-bold">
            {searchQuery ? 'No reports match your search query.' : 'No reported questions found.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredReports.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-bg-s2 border border-border hover:border-saffron-border/30 rounded-xl shadow-md flex flex-col gap-4 relative overflow-hidden transition-all group"
            >
              {/* Background glow decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />

              {/* Submitter header row */}
              <div className="flex justify-between items-start gap-3 border-b border-border/40 pb-3">
                <div className="flex flex-col min-w-0 gap-1.5">
                  <div className="flex items-center gap-1.5 text-text font-black text-xs truncate">
                    <User className="w-3.5 h-3.5 text-saffron shrink-0" />
                    <span>{item.displayName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted font-semibold text-[10px] truncate">
                    <Mail className="w-3.5 h-3.5 text-saffron shrink-0" />
                    <span>{item.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteReport(item.id)}
                  disabled={deletingId === item.id}
                  className="p-2 bg-bg-s3 hover:bg-red-500/10 border border-border/60 hover:border-red-500/20 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-all shrink-0 hover:scale-[1.05]"
                  title="Delete/Resolve Report"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reported Issue / Reason */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-black uppercase text-redL tracking-wider select-none">
                  Flagged Issue / समस्या विवरण
                </span>
                <p className="text-xs text-text leading-relaxed font-bold bg-red-500/5 border border-red-500/10 p-3.5 rounded-lg whitespace-pre-wrap">
                  {item.reason}
                </p>
              </div>

              {/* Question Details */}
              {item.question && (
                <div className="flex flex-col gap-2.5 bg-bg-s3/45 border border-border/40 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase text-saffron tracking-wider select-none">
                    <span>Question Details / प्रश्न विवरण</span>
                    {item.question.difficulty && (
                      <span className="bg-bg-s3 px-2 py-0.5 border border-border rounded text-text-muted">
                        Diff: {item.question.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-text mt-1 leading-relaxed select-text">
                    <MarkdownRenderer content={item.question.question} />
                  </div>
                  {item.question.options && item.question.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {item.question.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === item.question.correctIndex;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded border text-[11px] font-semibold flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-greenL/10 border-greenL/25 text-greenL font-black'
                                : 'bg-bg-s2 border-border/60 text-text-muted'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              isCorrect ? 'bg-greenL text-bg-s1' : 'bg-bg-s3 border border-border'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="truncate select-text">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Footer Timestamp */}
              <div className="flex justify-between items-center text-[9px] font-bold text-text-muted uppercase tracking-wider shrink-0 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-saffron" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                </span>
                <span>
                  {new Date(item.createdAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
