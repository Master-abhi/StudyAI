import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, Tag, Megaphone, AlertTriangle, RefreshCw, Pin, 
  ExternalLink, CheckCheck, Loader2, Sparkles, Inbox
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'notice' | 'offer' | 'announcement' | 'update';
  actionUrl?: string;
  actionText?: string;
  pinned?: boolean;
  targetExam?: string;
  createdAt: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: string) => void;
  onReadCountChange?: (count: number) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onReadCountChange
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'notice' | 'offer' | 'announcement'>('all');
  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('examprep_read_notifications');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
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

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Direct Firestore client SDK read if available
      const firebase = (window as any).firebase;
      if (firebase && firebase.apps.length > 0) {
        try {
          const snap = await firebase.firestore().collection('notifications')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();
          const docs = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
          setNotifications(docs);
          setLoading(false);
          return;
        } catch (e) {}
      }

      // API Fallback
      const res = await fetch(getApiUrl('/api/notifications'));
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        }
      }
    } catch (err) {
      console.warn('[Fetch Notifications Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    const unreadCount = notifications.filter(n => !readIds.includes(n.id)).length;
    if (onReadCountChange) {
      onReadCountChange(unreadCount);
    }
  }, [notifications, readIds, onReadCountChange]);

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem('examprep_read_notifications', JSON.stringify(updated));
    }
  };

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    setReadIds(allIds);
    localStorage.setItem('examprep_read_notifications', JSON.stringify(allIds));
  };

  const handleActionClick = (notif: NotificationItem) => {
    markAsRead(notif.id);
    if (!notif.actionUrl) return;

    if (notif.actionUrl.startsWith('?tab=') || notif.actionUrl.startsWith('/?tab=')) {
      const tabMatch = notif.actionUrl.match(/tab=([a-z0-9_-]+)/i);
      if (tabMatch && tabMatch[1] && onNavigateTab) {
        onNavigateTab(tabMatch[1]);
        onClose();
        return;
      }
    }

    if (notif.actionUrl.startsWith('http://') || notif.actionUrl.startsWith('https://')) {
      window.open(notif.actionUrl, '_blank');
    } else {
      window.location.href = notif.actionUrl;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'offer':
        return <Tag className="w-4 h-4 text-purple-400" />;
      case 'notice':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'update':
        return <RefreshCw className="w-4 h-4 text-blue-400" />;
      default:
        return <Megaphone className="w-4 h-4 text-saffron" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-bg-s2 border border-border w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between bg-bg-s3/40 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-saffron/10 border border-saffron-border/30 rounded-xl text-saffron">
                <Bell className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-black uppercase text-text tracking-wider flex items-center gap-1.5">
                  <span>Notifications & Offers</span>
                  <Sparkles className="w-3.5 h-3.5 text-saffron" />
                </h3>
                <span className="text-[9px] text-text-muted font-bold tracking-wider uppercase">
                  Official Board Notices & Announcements
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {notifications.some(n => !readIds.includes(n.id)) && (
                <button
                  onClick={markAllAsRead}
                  className="px-2.5 py-1 bg-bg-s3 hover:bg-bg-s3/80 text-text-muted hover:text-saffron border border-border rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mark Read</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 text-text-muted hover:text-text rounded-lg hover:bg-bg-s3 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="px-5 py-2.5 border-b border-border/40 bg-bg-s1/50 flex items-center gap-1.5 overflow-x-auto shrink-0 select-none no-scrollbar">
            {[
              { id: 'all', label: 'All Updates' },
              { id: 'announcement', label: '📢 Announcements' },
              { id: 'notice', label: '⚠️ Notices' },
              { id: 'offer', label: '🎁 Offers' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === f.id
                    ? 'bg-saffron text-bg-s1 font-black shadow'
                    : 'bg-bg-s3 border border-border/50 text-text-muted hover:text-text'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-text-muted">
                <Loader2 className="w-6 h-6 animate-spin text-saffron" />
                <span className="text-[10px] font-black uppercase tracking-wider">Loading updates...</span>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-text-muted gap-2">
                <Inbox className="w-8 h-8 text-border mb-1" />
                <span className="text-xs font-bold">No notifications available right now.</span>
                <span className="text-[10px]">Check back soon for new exam notices and special offers!</span>
              </div>
            ) : (
              filteredNotifications.map(notif => {
                const isUnread = !readIds.includes(notif.id);
                return (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`p-4 rounded-xl border transition-all flex flex-col gap-2.5 relative cursor-pointer ${
                      isUnread
                        ? 'bg-saffron-dim/15 border-saffron-border/40 shadow-sm'
                        : 'bg-bg-s3/30 border-border/60 hover:border-border'
                    }`}
                  >
                    {isUnread && (
                      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-saffron animate-pulse" />
                    )}

                    <div className="flex items-center gap-2 pr-4">
                      <div className="p-1.5 rounded-lg bg-bg-s2 border border-border/60 shrink-0">
                        {getTypeIcon(notif.type)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs font-black text-text leading-tight">{notif.title}</h4>
                          {notif.pinned && (
                            <span className="px-1.5 py-0.2 bg-saffron/10 text-saffron border border-saffron-border/25 rounded text-[8px] font-black uppercase tracking-wider flex items-center gap-0.5">
                              <Pin className="w-2 h-2" />
                              <span>Pinned</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-text-muted font-semibold mt-0.5">
                          {new Date(notif.createdAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-text-muted leading-relaxed whitespace-pre-line">
                      {notif.message}
                    </p>

                    {notif.actionUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleActionClick(notif); }}
                        className="mt-1 self-start px-3 py-1.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 transition-all shadow cursor-pointer active:scale-95"
                      >
                        <span>{notif.actionText || 'View Details'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
