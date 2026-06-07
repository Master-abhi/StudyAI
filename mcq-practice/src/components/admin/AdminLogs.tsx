import React, { useState, useEffect } from 'react';
import { 
  History, Shield, Users, RefreshCw, Search, 
  Clock, ArrowRight
} from 'lucide-react';

interface StaffLog {
  id: string;
  uid: string;
  staffId: string;
  email: string;
  actorType: 'admin' | 'staff';
  action: string;
  details: any;
  timestamp: string;
}

interface UserLog {
  id: string;
  userId: string;
  userName: string;
  userDisplayId: string;
  examId: string;
  activityType: string;
  subjectId: string;
  topicId: string;
  timeSpentSeconds: number;
  timestamp: string;
}

interface AdminLogsProps {
  currentUser: any;
}

export const AdminLogs: React.FC<AdminLogsProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'staff' | 'user'>('staff');
  const [staffLogs, setStaffLogs] = useState<StaffLog[]>([]);
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getApiUrl = (path: string) => {
    const host = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  const fetchLogs = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError('');
    try {
      const token = await currentUser.getIdToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const endpoint = activeTab === 'staff' ? '/api/admin/logs/staff' : '/api/admin/logs/user';
      const res = await fetch(getApiUrl(endpoint), { headers });
      
      if (!res.ok) {
        throw new Error('Failed to fetch activity logs');
      }
      
      const data = await res.json();
      if (activeTab === 'staff') {
        setStaffLogs(data);
      } else {
        setUserLogs(data);
      }
    } catch (err: any) {
      console.error('[Fetch Logs Error]:', err);
      setError(err.message || 'Error loading logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentUser, activeTab]);

  const formatTimestamp = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const formatAction = (action: string) => {
    switch (action) {
      case 'generate_test':
        return '🤖 AI MCQ Test Generated';
      case 'upload_test':
        return '📤 JSON MCQ Test Uploaded';
      case 'edit_test':
        return '✏️ MCQ Test Edited';
      case 'delete_test':
        return '🗑️ MCQ Test Deleted';
      case 'upload_material':
        return '📄 Syllabus Material Uploaded';
      case 'save_syllabus':
        return '💾 Syllabus Setup Saved';
      case 'delete_syllabus':
        return '🗑️ Syllabus Setup Deleted';
      case 'refresh_news':
        return '🔄 News Cache Synchronized';
      default:
        return action;
    }
  };

  const formatActivityType = (type: string) => {
    switch (type) {
      case 'read_notes':
        return '📚 Read Reference Notes';
      case 'watch_video':
        return '🎥 Watched Study Video';
      case 'spaced_repetition':
        return '🔄 Space Repetition Quiz';
      case 'mcq_correct':
      case 'mcq_incorrect':
      case 'mcq_attempt':
        return '📝 Practiced MCQ';
      default:
        return type;
    }
  };

  const formatDetails = (log: StaffLog) => {
    const d = log.details || {};
    switch (log.action) {
      case 'generate_test':
        return `Generated test for ${d.examName || 'unknown exam'} (Subject: ${d.subject || 'All'}, Mode: ${d.mode || 'Quiz'})`;
      case 'upload_test':
        return `Uploaded test for ${d.examName || 'unknown exam'} (Subject: ${d.subject || 'All'}, Mode: ${d.mode || 'Quiz'})`;
      case 'edit_test':
        return `Updated parameters for Test ID: ${d.testId || 'unknown'} (Subject: ${d.subject || 'All'}, Mode: ${d.mode || 'Quiz'})`;
      case 'delete_test':
        return `Deleted Test ID: ${d.testId || 'unknown'}`;
      case 'upload_material':
        return `Uploaded notes document: "${d.title || 'Untitled'}" (Type: ${d.type || 'study'})`;
      case 'save_syllabus':
        return `Saved configuration metrics for Exam: ${d.name || 'unknown'}`;
      case 'delete_syllabus':
        return `Removed syllabus configurations for Exam ID: ${d.id || 'unknown'}`;
      case 'refresh_news':
        return `Refreshed feed cache. Added/scraped ${d.totalArticles || 0} news entries.`;
      default:
        return JSON.stringify(d);
    }
  };

  // Filter logs by search query
  const filteredStaffLogs = staffLogs.filter(log => {
    const q = searchQuery.toLowerCase();
    return (
      log.staffId?.toLowerCase().includes(q) ||
      log.email?.toLowerCase().includes(q) ||
      log.action?.toLowerCase().includes(q) ||
      formatDetails(log).toLowerCase().includes(q)
    );
  });

  const filteredUserLogs = userLogs.filter(log => {
    const q = searchQuery.toLowerCase();
    return (
      log.userName?.toLowerCase().includes(q) ||
      log.userId?.toLowerCase().includes(q) ||
      log.activityType?.toLowerCase().includes(q) ||
      log.topicId?.toLowerCase().includes(q) ||
      log.subjectId?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full text-text relative">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-bg-s2 to-bg-s3 border border-border p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase text-saffron tracking-widest flex items-center gap-1">
            <History className="w-3.5 h-3.5" />
            <span>Audit & Verification</span>
          </span>
          <h2 className="text-lg font-black text-text">Activity Audit Logs</h2>
          <p className="text-xs text-text-muted max-w-xl">
            Track operational updates performed by your staff members, and monitor student learning checkpoints (notes read, video sessions, MCQ practice).
          </p>
        </div>
        <button 
          onClick={fetchLogs}
          disabled={loading}
          className="px-3.5 py-2 bg-bg-s3 border border-border hover:border-saffron/40 hover:bg-bg-s2 text-xs font-black uppercase tracking-wider text-text flex items-center gap-2 rounded-lg cursor-pointer transition-colors shadow disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-saffron ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* 2. Top Navigation Tabs */}
      <div className="flex border-b border-border/80 gap-6 select-none">
        <button
          onClick={() => { setActiveTab('staff'); setSearchQuery(''); }}
          className={`pb-3 text-xs font-black uppercase tracking-wider transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === 'staff' ? 'text-saffron' : 'text-text-muted hover:text-text'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Staff Actions ({filteredStaffLogs.length})</span>
          {activeTab === 'staff' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron rounded-full animate-fade-in" />
          )}
        </button>
        <button
          onClick={() => { setActiveTab('user'); setSearchQuery(''); }}
          className={`pb-3 text-xs font-black uppercase tracking-wider transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === 'user' ? 'text-saffron' : 'text-text-muted hover:text-text'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Aspirant Activities ({filteredUserLogs.length})</span>
          {activeTab === 'user' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron rounded-full animate-fade-in" />
          )}
        </button>
      </div>

      {/* 3. Search and filtering */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder={
            activeTab === 'staff' 
              ? 'Filter staff actions by username, email, action type, or details...'
              : 'Filter user logs by student name, ID, activity type, topic, or subject...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-bg-s2 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-xl outline-none transition-colors shadow-md"
        />
        <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
      </div>

      {/* 4. Logs List Table */}
      <div className="bg-bg-s2 border border-border rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-text-muted">
            <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold uppercase tracking-wider">Syncing Audit Records...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-redL flex flex-col items-center gap-2">
            <AlertTriangle className="w-8 h-8" />
            <span className="text-xs font-bold">{error}</span>
          </div>
        ) : activeTab === 'staff' ? (
          filteredStaffLogs.length === 0 ? (
            <div className="p-16 text-center text-text-muted text-xs font-bold uppercase tracking-wide">
              No staff activities logged matching this query.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/80 bg-bg-s3/40 text-[9px] font-black uppercase text-text-muted tracking-wider">
                    <th className="py-4 px-5">Time (IST)</th>
                    <th className="py-4 px-4">Staff Actor</th>
                    <th className="py-4 px-4">Action</th>
                    <th className="py-4 px-5">Operational Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-xs font-sans">
                  {filteredStaffLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-bg-s3/15 transition-colors group">
                      <td className="py-4 px-5 text-[10px] text-text-muted font-mono whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-saffron/70" />
                          <span>{formatTimestamp(log.timestamp)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-text group-hover:text-saffron transition-colors flex items-center gap-1.5">
                            {log.staffId}
                            <span className={`text-[7px] font-black uppercase px-1 rounded ${
                              log.actorType === 'admin' 
                                ? 'bg-purple-500/25 border border-purple-500/40 text-purple-300' 
                                : 'bg-saffron/20 border border-saffron/40 text-saffron'
                            }`}>
                              {log.actorType}
                            </span>
                          </span>
                          <span className="text-[10px] text-text-muted font-mono truncate max-w-[150px]">{log.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-text whitespace-nowrap">
                        {formatAction(log.action)}
                      </td>
                      <td className="py-4 px-5 text-text-muted text-[11px] leading-relaxed">
                        {formatDetails(log)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          filteredUserLogs.length === 0 ? (
            <div className="p-16 text-center text-text-muted text-xs font-bold uppercase tracking-wide">
              No student activities logged matching this query.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/80 bg-bg-s3/40 text-[9px] font-black uppercase text-text-muted tracking-wider">
                    <th className="py-4 px-5">Time (IST)</th>
                    <th className="py-4 px-4">Aspirant Profile</th>
                    <th className="py-4 px-4">Activity Type</th>
                    <th className="py-4 px-4">Syllabus Topic Context</th>
                    <th className="py-4 px-5 text-center">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-xs font-sans">
                  {filteredUserLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-bg-s3/15 transition-colors group">
                      <td className="py-4 px-5 text-[10px] text-text-muted font-mono whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                          <span>{formatTimestamp(log.timestamp)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-text group-hover:text-purple-400 transition-colors">
                            {log.userName}
                          </span>
                          <span className="text-[9px] text-text-muted font-mono truncate max-w-[120px]" title={`UID: ${log.userId}`}>
                            User ID: {log.userDisplayId}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-text whitespace-nowrap">
                        {formatActivityType(log.activityType)}
                      </td>
                      <td className="py-4 px-4 text-text-muted">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-[11px] text-text flex items-center gap-1">
                            <span>{log.topicId.replace(/_/g, ' ')}</span>
                          </span>
                          <span className="text-[10px] text-text-muted flex items-center gap-1 font-mono uppercase">
                            {log.examId} <ArrowRight className="w-2.5 h-2.5" /> {log.subjectId}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-center font-mono text-[11px] font-bold text-text">
                        {log.timeSpentSeconds > 0 ? (
                          <span>
                            {Math.floor(log.timeSpentSeconds / 60) > 0 
                              ? `${Math.floor(log.timeSpentSeconds / 60)}m ` 
                              : ''}
                            {log.timeSpentSeconds % 60}s
                          </span>
                        ) : (
                          <span className="text-text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

    </div>
  );
};

// Import AlertTriangle from lucide-react (redefined simple dummy if not imported)
const AlertTriangle = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={props.className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
