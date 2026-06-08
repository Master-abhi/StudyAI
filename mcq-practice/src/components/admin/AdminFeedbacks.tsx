import React, { useState, useEffect } from 'react';
import { MessageSquare, Trash2, Calendar, User, Mail, Search, AlertCircle, RefreshCw } from 'lucide-react';

interface FeedbackItem {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  feedback: string;
  createdAt: string;
}

interface AdminFeedbacksProps {
  currentUser: any;
}

export const AdminFeedbacks: React.FC<AdminFeedbacksProps> = ({ currentUser }) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  const fetchFeedbacks = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError('');
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/feedbacks'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error('Failed to load user feedbacks.');
      }
      const data = await res.json();
      setFeedbacks(data);
    } catch (err: any) {
      console.error('[Fetch Feedbacks Error]:', err);
      setError(err.message || 'An error occurred while fetching feedbacks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [currentUser]);

  const handleDeleteFeedback = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this feedback entry?')) return;
    setDeletingId(id);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/feedbacks/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error('Failed to delete feedback entry.');
      }
      setFeedbacks(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting feedback.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter feedbacks by name, email, or feedback message
  const filteredFeedbacks = feedbacks.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.displayName.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.feedback.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Page Title & Reload */}
      <div className="flex justify-between items-center bg-bg-s2 border border-border p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-saffron/10 border border-saffron-border/30 rounded-lg flex items-center justify-center text-saffron shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-text">User Feedbacks & Suggestions</h3>
            <p className="text-[10px] text-text-muted font-bold tracking-wide mt-0.5">Read feedback submitted by aspirants via Settings Modal</p>
          </div>
        </div>
        <button
          onClick={fetchFeedbacks}
          disabled={loading}
          className="p-2.5 bg-bg-s3 hover:bg-bg-s2 border border-border rounded-lg text-text-muted hover:text-text cursor-pointer transition-all flex items-center gap-1.5 shadow"
          title="Refresh Feedbacks"
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
          placeholder="Search by name, email, or feedback text..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-bg-s2 border border-border focus:border-saffron focus:ring-1 focus:ring-saffron/20 pl-10 pr-4 py-3 rounded-xl outline-none transition-colors text-xs text-text placeholder:text-text-muted font-bold"
        />
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-text-muted">
          <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider">Loading feedbacks...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : filteredFeedbacks.length === 0 ? (
        <div className="p-8 bg-bg-s2 border border-border rounded-xl text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-bg-s3 border border-border flex items-center justify-center text-text-muted text-lg">
            💬
          </div>
          <p className="text-xs text-text-muted font-bold">
            {searchQuery ? 'No feedbacks match your search query.' : 'No feedback submissions found yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFeedbacks.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-bg-s2 border border-border hover:border-saffron-border/30 rounded-xl shadow-md flex flex-col gap-4 relative overflow-hidden transition-all group"
            >
              {/* Background glow decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-dim/5 rounded-full blur-xl pointer-events-none" />

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
                  onClick={() => handleDeleteFeedback(item.id)}
                  disabled={deletingId === item.id}
                  className="p-2 bg-bg-s3 hover:bg-red-500/10 border border-border/60 hover:border-red-500/20 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-all shrink-0 hover:scale-[1.05]"
                  title="Delete Feedback"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Feedback Message */}
              <p className="text-xs text-text leading-relaxed font-semibold bg-bg-s3/45 border border-border/30 p-3.5 rounded-lg whitespace-pre-wrap">
                {item.feedback}
              </p>

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
