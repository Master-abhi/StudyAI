import React, { useState, useEffect } from 'react';
import { 
  Bell, Send, Trash2, Pin, Sparkles, AlertCircle, CheckCircle, Loader2, 
  Tag, Megaphone, AlertTriangle, ExternalLink, RefreshCw, Layers
} from 'lucide-react';

interface AdminNotificationsProps {
  currentUser: any;
}

export interface BroadcastNotification {
  id: string;
  title: string;
  message: string;
  type: 'notice' | 'offer' | 'announcement' | 'update';
  actionUrl?: string;
  actionText?: string;
  pinned?: boolean;
  targetExam?: string;
  createdAt: string;
  createdBy?: string;
}

export const AdminNotifications: React.FC<AdminNotificationsProps> = ({ currentUser }) => {
  const [notifications, setNotifications] = useState<BroadcastNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'notice' | 'offer' | 'announcement' | 'update'>('announcement');
  const [actionUrl, setActionUrl] = useState<string>('');
  const [actionText, setActionText] = useState<string>('');
  const [targetExam, setTargetExam] = useState<string>('all');
  const [pinned, setPinned] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  const fetchNotifications = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      // 1. Try fetching directly via Firestore client SDK first if available
      const firebase = (window as any).firebase;
      if (firebase && firebase.apps.length > 0) {
        try {
          const snap = await firebase.firestore().collection('notifications')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();
            
          const docs = snap.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
          }));
          setNotifications(docs);
          setLoading(false);
          return;
        } catch (fsErr) {
          console.warn('[Firestore Direct Notifications GET Failed, falling back to API]:', fsErr);
        }
      }

      // 2. Fallback to API endpoint
      const res = await fetch(getApiUrl('/api/notifications'));
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        }
      }
    } catch (err: any) {
      console.error('[Fetch Notifications Error]:', err);
      setErrorMessage('Could not load notifications history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      setErrorMessage('Please provide both Title and Message content.');
      return;
    }

    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    const newPayload = {
      title: title.trim(),
      message: message.trim(),
      type,
      actionUrl: actionUrl.trim(),
      actionText: actionText.trim(),
      pinned,
      targetExam
    };

    try {
      const token = await currentUser.getIdToken();
      let savedDirectly = false;

      // Try direct Firestore write first
      const firebase = (window as any).firebase;
      if (firebase && currentUser) {
        try {
          const notifId = `notif_${Date.now()}`;
          const notifRecord = {
            id: notifId,
            ...newPayload,
            createdAt: new Date().toISOString(),
            createdBy: currentUser.email || currentUser.uid || 'Admin'
          };
          await firebase.firestore().collection('notifications').doc(notifId).set(notifRecord);
          savedDirectly = true;
          console.log('[Firestore Direct Notification Create Success]');
        } catch (fsErr) {
          console.warn('[Firestore Direct Create Failed, falling back to server API]:', fsErr);
        }
      }

      // Also send to Server API
      const res = await fetch(getApiUrl('/api/notifications/admin'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPayload)
      });

      if (res.ok || savedDirectly) {
        setSuccessMessage('🎉 Notification broadcast published successfully to all Web & App users!');
        setTitle('');
        setMessage('');
        setActionUrl('');
        setActionText('');
        setPinned(false);
        fetchNotifications();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Server rejected publication.');
      }
    } catch (err: any) {
      console.error('[Create Notification Error]:', err);
      setErrorMessage(err.message || 'Failed to publish notification broadcast.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this notification broadcast? It will be removed for all users.')) return;
    
    setDeletingId(id);
    try {
      const token = await currentUser.getIdToken();
      let deletedDirectly = false;

      const firebase = (window as any).firebase;
      if (firebase) {
        try {
          await firebase.firestore().collection('notifications').doc(id).delete();
          deletedDirectly = true;
        } catch (e) {}
      }

      const res = await fetch(getApiUrl(`/api/notifications/admin/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok || deletedDirectly) {
        setNotifications(prev => prev.filter(n => n.id !== id));
        setSuccessMessage('Notification deleted successfully.');
      }
    } catch (err: any) {
      console.error('[Delete Notification Error]:', err);
      setErrorMessage('Failed to delete notification.');
    } finally {
      setDeletingId(null);
    }
  };

  const getTypeBadge = (notifType: string) => {
    switch (notifType) {
      case 'offer':
        return (
          <span className="px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/25 flex items-center gap-1">
            <Tag className="w-2.5 h-2.5" />
            <span>Special Offer</span>
          </span>
        );
      case 'notice':
        return (
          <span className="px-2.5 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25 flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5" />
            <span>Notice / Alert</span>
          </span>
        );
      case 'update':
        return (
          <span className="px-2.5 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25 flex items-center gap-1">
            <RefreshCw className="w-2.5 h-2.5" />
            <span>App Update</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider bg-saffron/10 text-saffron border border-saffron-border/30 flex items-center gap-1">
            <Megaphone className="w-2.5 h-2.5" />
            <span>Announcement</span>
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full font-sans">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bg-s2 border border-border p-5 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-saffron/10 border border-saffron-border/30 rounded-xl text-saffron">
            <Bell className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-black text-text uppercase tracking-wider flex items-center gap-2">
              <span>Broadcast Notifications & Notices</span>
              <Sparkles className="w-3.5 h-3.5 text-saffron animate-pulse" />
            </h2>
            <span className="text-[10px] text-text-muted font-semibold mt-0.5">
              Send real-time announcements, exam notices, and discount offers to all Web & Mobile App users.
            </span>
          </div>
        </div>

        <button
          onClick={fetchNotifications}
          disabled={loading}
          className="px-3 py-2 bg-bg-s3 hover:bg-bg-s3/80 border border-border rounded-lg text-xs font-bold text-text-muted hover:text-text flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-saffron' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Alert Banner Messages */}
      {successMessage && (
        <div className="p-4 bg-greenL/10 border border-greenL/20 text-greenL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
          <button type="button" onClick={() => setSuccessMessage('')} className="ml-auto text-greenL/60 hover:text-greenL">✕</button>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
          <button type="button" onClick={() => setErrorMessage('')} className="ml-auto text-redL/60 hover:text-redL">✕</button>
        </div>
      )}

      {/* Publish Form Card */}
      <form onSubmit={handleCreateNotification} className="bg-bg-s2 border border-border p-6 rounded-xl shadow-md flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-border/40 pb-3">
          <Send className="w-4 h-4 text-saffron" />
          <h3 className="text-xs font-black uppercase text-text tracking-wider">Publish New Broadcast Announcement</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Notification Title */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider">
              Title / Headline <span className="text-redL">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. CGPSC Prelims Exam Postponed Notice / Special 50% Off Offer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-3 py-2 text-xs font-semibold text-text outline-none transition-colors"
            />
          </div>

          {/* Type Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider">
              Notification Category
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-3 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
            >
              <option value="announcement">📢 Announcement (सामान्य घोषणा)</option>
              <option value="notice">⚠️ Important Notice (जरूरी नोटिस/सूचना)</option>
              <option value="offer">🎁 Special Offer (ऑफर/डिस्काउंट)</option>
              <option value="update">🚀 App Update (नया फीचर/अपडेट)</option>
            </select>
          </div>

          {/* Target Exam */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider">
              Target Audience / Exam
            </label>
            <select
              value={targetExam}
              onChange={(e) => setTargetExam(e.target.value)}
              className="bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-3 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
            >
              <option value="all">🌐 All Aspirants (सभी छात्र)</option>
              <option value="cgpsc_sse">🏛️ CGPSC State Service Exam</option>
              <option value="cg_vyapam">📊 CG Vyapam Exams</option>
              <option value="cg_police">👮 CG Police Constable / SI</option>
              <option value="cg_teacher">👨‍🏫 CG Teacher Eligibility (TET)</option>
            </select>
          </div>

          {/* Message Details */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider">
              Message Content / Details <span className="text-redL">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Write complete notice message or offer details for aspirants..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg p-3 text-xs font-semibold text-text outline-none transition-colors resize-y min-h-[80px]"
            />
          </div>

          {/* Action Link (Optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center justify-between">
              <span>Action Shortcut / Tab Link (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. ?tab=practice or https://..."
              value={actionUrl}
              onChange={(e) => setActionUrl(e.target.value)}
              className="bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-3 py-2 text-xs font-semibold text-text outline-none transition-colors"
            />
          </div>

          {/* Action Button Text */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider">
              Button Label (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Open Practice / Claim Offer / Read PDF"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              className="bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-3 py-2 text-xs font-semibold text-text outline-none transition-colors"
            />
          </div>
        </div>

        {/* Pinned Toggle & Submit */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-border/40 pt-4 mt-1">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="w-4 h-4 accent-saffron rounded cursor-pointer"
            />
            <span className="text-xs font-bold text-text flex items-center gap-1">
              <Pin className="w-3.5 h-3.5 text-saffron" />
              <span>Pin to top of Aspirant Notification Bell Drawer</span>
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Broadcast...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Publish Notification</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Broadcast History List */}
      <div className="flex flex-col gap-4 bg-bg-s2 border border-border p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">Active Sent Broadcasts ({notifications.length})</h3>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-text-muted">
            <Loader2 className="w-5 h-5 animate-spin text-saffron" />
            <span className="text-[10px] font-bold uppercase">Loading notification history...</span>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center bg-bg-s3/20 border border-border/40 rounded-xl text-xs text-text-muted flex flex-col items-center gap-2">
            <Bell className="w-6 h-6 text-text-muted/60" />
            <span>No active broadcast notifications published yet. Use the form above to send notices or offers.</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.map(notif => (
              <div 
                key={notif.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  notif.pinned 
                    ? 'bg-saffron-dim/15 border-saffron-border/40' 
                    : 'bg-bg-s3/40 border-border/70 hover:border-border'
                }`}
              >
                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getTypeBadge(notif.type)}
                    {notif.pinned && (
                      <span className="px-2 py-0.5 bg-saffron/10 text-saffron border border-saffron-border/25 rounded text-[8px] font-black uppercase tracking-wider flex items-center gap-1">
                        <Pin className="w-2.5 h-2.5" />
                        <span>Pinned</span>
                      </span>
                    )}
                    <span className="text-[9px] text-text-muted font-semibold">
                      {new Date(notif.createdAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-text leading-tight">{notif.title}</h4>
                  <p className="text-[11px] text-text-muted leading-relaxed whitespace-pre-line">
                    {notif.message}
                  </p>

                  {notif.actionUrl && (
                    <div className="mt-1 flex items-center gap-2 text-[10px] font-bold text-saffron">
                      <ExternalLink className="w-3 h-3" />
                      <span>Action Link: {notif.actionText || notif.actionUrl}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleDeleteNotification(notif.id)}
                    disabled={deletingId === notif.id}
                    className="p-2 bg-bg-s3 hover:bg-red-500/10 text-text-muted hover:text-redL border border-border rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-40"
                    title="Delete Notification"
                  >
                    {deletingId === notif.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-redL" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
