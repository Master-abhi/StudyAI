import React, { useState, useEffect } from 'react';
import { AlertTriangle, Trash2, Calendar, User, Mail, Search, AlertCircle, RefreshCw, Edit3, Save, X, CheckCircle } from 'lucide-react';
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
    explanation?: string;
    difficulty?: string;
    topic?: string;
  };
  reason: string;
  createdAt: string;
  status?: string;
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

  // Question Inline Editing state
  const [editingReportId, setEditingReportId] = useState<string | null>(null);
  const [editQuestionText, setEditQuestionText] = useState<string>('');
  const [editOptions, setEditOptions] = useState<string[]>(['', '', '', '']);
  const [editCorrectIndex, setEditCorrectIndex] = useState<number>(0);
  const [editExplanation, setEditExplanation] = useState<string>('');
  const [savingId, setSavingId] = useState<string | null>(null);

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

  const handleStartEdit = (report: ReportedQuestion) => {
    setEditingReportId(report.id);
    setEditQuestionText(report.question?.question || '');
    const opts = report.question?.options || [];
    setEditOptions(opts.length >= 4 ? [...opts] : [...opts, '', '', '', ''].slice(0, 4));
    setEditCorrectIndex(typeof report.question?.correctIndex === 'number' ? report.question.correctIndex : 0);
    setEditExplanation(report.question?.explanation || '');
  };

  const handleCancelEdit = () => {
    setEditingReportId(null);
    setEditQuestionText('');
    setEditOptions(['', '', '', '']);
    setEditCorrectIndex(0);
    setEditExplanation('');
  };

  const handleSaveQuestionEdit = async (reportId: string) => {
    if (!editQuestionText.trim()) {
      alert('Question text cannot be empty');
      return;
    }
    if (editOptions.some(o => !o.trim())) {
      alert('All 4 option fields must be filled out');
      return;
    }

    setSavingId(reportId);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/reports/${reportId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          question: editQuestionText.trim(),
          options: editOptions.map(o => o.trim()),
          correctIndex: editCorrectIndex,
          explanation: editExplanation.trim()
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to save updated question.');
      }

      await res.json();
      
      // Update state optimistically
      setReports(prev => prev.map(item => {
        if (item.id === reportId) {
          return {
            ...item,
            status: 'resolved_and_edited',
            question: {
              ...item.question,
              question: editQuestionText.trim(),
              options: editOptions.map(o => o.trim()),
              correctIndex: editCorrectIndex,
              explanation: editExplanation.trim()
            }
          };
        }
        return item;
      }));

      handleCancelEdit();
      alert('✅ Reported question updated successfully!');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error updating question.');
    } finally {
      setSavingId(null);
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
            <p className="text-[10px] text-text-muted font-bold tracking-wide mt-0.5">Review and directly edit question errors or incorrect keys flagged by users</p>
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
          {filteredReports.map((item) => {
            const isEditing = editingReportId === item.id;

            return (
              <div
                key={item.id}
                className="p-5 bg-bg-s2 border border-border hover:border-saffron-border/30 rounded-xl shadow-md flex flex-col gap-4 relative overflow-hidden transition-all group"
              >
                {/* Background glow decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />

                {/* Submitter header row */}
                <div className="flex justify-between items-start gap-3 border-b border-border/40 pb-3">
                  <div className="flex flex-col min-w-0 gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-text font-black text-xs truncate">
                        <User className="w-3.5 h-3.5 text-saffron shrink-0" />
                        <span>{item.displayName}</span>
                      </div>

                      {item.status === 'resolved_and_edited' && (
                        <span className="text-[9px] font-black uppercase text-greenL bg-greenL/10 border border-greenL/30 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Updated</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-text-muted font-semibold text-[10px] truncate">
                      <Mail className="w-3.5 h-3.5 text-saffron shrink-0" />
                      <span>{item.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!isEditing ? (
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="px-3 py-1.5 bg-saffron/10 hover:bg-saffron/20 border border-saffron-border/30 text-saffron rounded-lg text-xs font-black uppercase flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                        title="Edit Question directly"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Question</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-text-muted rounded-lg text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteReport(item.id)}
                      disabled={deletingId === item.id}
                      className="p-2 bg-bg-s3 hover:bg-red-500/10 border border-border/60 hover:border-red-500/20 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-all shrink-0 hover:scale-[1.05]"
                      title="Delete/Resolve Report"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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

                {/* Question Details OR Question Inline Editor Form */}
                {isEditing ? (
                  <div className="flex flex-col gap-4 bg-bg-s3/90 border border-saffron-border/40 p-4 rounded-xl shadow-inner animate-fade-in">
                    <div className="flex items-center justify-between border-b border-border/60 pb-2">
                      <span className="text-xs font-black uppercase text-saffron tracking-wider flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Question Details</span>
                      </span>
                      <span className="text-[10px] text-text-muted font-bold uppercase">Live Correction Mode</span>
                    </div>

                    {/* Question Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-text-muted">Question Text / प्रश्न विवरण</label>
                      <textarea
                        rows={3}
                        value={editQuestionText}
                        onChange={(e) => setEditQuestionText(e.target.value)}
                        className="w-full bg-bg-s2 border border-border focus:border-saffron p-3 rounded-lg text-xs font-bold text-text outline-none transition-colors"
                        placeholder="Enter modified question..."
                      />
                    </div>

                    {/* Options Editor */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase text-text-muted">Options & Correct Answer Selection</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {editOptions.map((optVal, oIdx) => {
                          const isCorrect = editCorrectIndex === oIdx;
                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-lg border flex items-center gap-2 transition-all ${
                                isCorrect
                                  ? 'bg-greenL/10 border-greenL/40 text-text'
                                  : 'bg-bg-s2 border-border text-text'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => setEditCorrectIndex(oIdx)}
                                className={`w-6 h-6 rounded-md font-black text-xs shrink-0 flex items-center justify-center cursor-pointer transition-all ${
                                  isCorrect
                                    ? 'bg-greenL text-bg-s1 shadow-sm scale-105'
                                    : 'bg-bg-s3 border border-border text-text-muted hover:border-saffron'
                                }`}
                                title={isCorrect ? 'Correct Answer' : 'Click to set as Correct Option'}
                              >
                                {String.fromCharCode(65 + oIdx)}
                              </button>

                              <input
                                type="text"
                                value={optVal}
                                onChange={(e) => {
                                  const updated = [...editOptions];
                                  updated[oIdx] = e.target.value;
                                  setEditOptions(updated);
                                }}
                                className="w-full bg-transparent text-xs font-semibold text-text outline-none"
                                placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Explanation Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-text-muted">Explanation / उत्तर का विवरण</label>
                      <textarea
                        rows={2}
                        value={editExplanation}
                        onChange={(e) => setEditExplanation(e.target.value)}
                        className="w-full bg-bg-s2 border border-border focus:border-saffron p-3 rounded-lg text-xs font-medium text-text outline-none transition-colors"
                        placeholder="Optional step-by-step solution / explanation..."
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 border-t border-border/60 pt-3">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-bg-s3 hover:bg-bg-s2 border border-border text-text-muted hover:text-text rounded-lg text-xs font-bold uppercase transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveQuestionEdit(item.id)}
                        disabled={savingId === item.id}
                        className="px-5 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 rounded-lg text-xs font-black uppercase flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{savingId === item.id ? 'Saving...' : 'Save & Update Question'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  item.question && (
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

                      {item.question.explanation && (
                        <div className="mt-2 p-2.5 bg-saffron-dim/10 border border-saffron-border/20 rounded text-[11px] text-text-muted font-medium">
                          <strong className="text-saffron font-bold">Explanation: </strong>
                          {item.question.explanation}
                        </div>
                      )}
                    </div>
                  )
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
            );
          })}
        </div>
      )}
    </div>
  );
};

