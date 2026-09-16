import React, { useState, useEffect, Suspense, lazy } from 'react';
import { 
  LayoutDashboard, Trophy, Newspaper, BookOpen, Cpu, 
  ArrowLeft, Sparkles, Server, AlertTriangle, Users, ShieldCheck, History, Sliders, Eye,
  MessageSquare, Award, Keyboard, Brain, Bell
} from 'lucide-react';

// Lazy load heavy admin sub-panels for instant initial load and code-splitting
const AdminTyping = lazy(() => import('./AdminTyping').then(m => ({ default: m.AdminTyping })));
const AdminTests = lazy(() => import('./AdminTests').then(m => ({ default: m.AdminTests })));
const AdminNews = lazy(() => import('./AdminNews').then(m => ({ default: m.AdminNews })));
const AdminSyllabus = lazy(() => import('./AdminSyllabus').then(m => ({ default: m.AdminSyllabus })));
const AdminAIConfig = lazy(() => import('./AdminAIConfig').then(m => ({ default: m.AdminAIConfig })));
const AdminUsers = lazy(() => import('./AdminUsers').then(m => ({ default: m.AdminUsers })));
const AdminStaffs = lazy(() => import('./AdminStaffs').then(m => ({ default: m.AdminStaffs })));
const AdminLogs = lazy(() => import('./AdminLogs').then(m => ({ default: m.AdminLogs })));
const AdminTabsConfig = lazy(() => import('./AdminTabsConfig').then(m => ({ default: m.AdminTabsConfig })));
const AdminExamsConfig = lazy(() => import('./AdminExamsConfig').then(m => ({ default: m.AdminExamsConfig })));
const AdminFeedbacks = lazy(() => import('./AdminFeedbacks').then(m => ({ default: m.AdminFeedbacks })));
const AdminBadges = lazy(() => import('./AdminBadges').then(m => ({ default: m.AdminBadges })));
const AdminReports = lazy(() => import('./AdminReports').then(m => ({ default: m.AdminReports })));
const AdminTraining = lazy(() => import('./AdminTraining').then(m => ({ default: m.AdminTraining })));
const AdminBranding = lazy(() => import('./AdminBranding').then(m => ({ default: m.AdminBranding })));
const AdminNotifications = lazy(() => import('./AdminNotifications').then(m => ({ default: m.AdminNotifications })));

import type { Exam } from '../syllabus/syllabusData';

const AdminTabLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[300px] w-full py-16 gap-3 text-text-muted">
    <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
    <span className="text-[11px] font-bold uppercase tracking-wider text-saffron">Loading module...</span>
  </div>
);

interface AdminDashboardProps {
  currentUser: any;
  onGoBack: () => void;
  exams: Exam[];
  onRefreshExams: () => void;
}

const VALID_SUBPAGES = [
  'overview', 'users', 'feedbacks', 'reports', 'staffs', 'tests', 
  'news', 'notifications', 'syllabus', 'aiconfig', 'logs', 
  'tabsconfig', 'examsconfig', 'badges', 'typing', 'training', 'branding'
] as const;
type SubPage = typeof VALID_SUBPAGES[number];

const getInitialSubPage = (): SubPage => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('subtab') || params.get('adminTab') || params.get('subpage');
    if (fromUrl && (VALID_SUBPAGES as readonly string[]).includes(fromUrl)) {
      return fromUrl as SubPage;
    }
    const saved = localStorage.getItem('cg_admin_subtab');
    if (saved && (VALID_SUBPAGES as readonly string[]).includes(saved)) {
      return saved as SubPage;
    }
  }
  return 'overview';
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onGoBack, exams, onRefreshExams }) => {
  const [activeSubPage, setActiveSubPage] = useState<SubPage>(getInitialSubPage);

  // Synchronize activeSubPage with localStorage & URL search params so browser refresh keeps the user on the current subtab
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cg_admin_subtab', activeSubPage);

    const url = new URL(window.location.href);
    const currentSubtab = url.searchParams.get('subtab') || url.searchParams.get('adminTab') || url.searchParams.get('subpage');

    if (activeSubPage === 'overview') {
      if (currentSubtab) {
        url.searchParams.delete('subtab');
        url.searchParams.delete('adminTab');
        url.searchParams.delete('subpage');
        const newSearch = url.searchParams.toString();
        const newRelativePath = url.pathname + (newSearch ? '?' + newSearch : '') + url.hash;
        window.history.replaceState(window.history.state, '', newRelativePath);
      }
    } else {
      if (currentSubtab !== activeSubPage) {
        url.searchParams.set('subtab', activeSubPage);
        url.searchParams.delete('adminTab');
        url.searchParams.delete('subpage');
        const newSearch = url.searchParams.toString();
        const newRelativePath = url.pathname + (newSearch ? '?' + newSearch : '') + url.hash;
        window.history.replaceState(window.history.state, '', newRelativePath);
      }
    }
  }, [activeSubPage]);

  // Handle browser Back / Forward navigation within admin subpages
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get('subtab') || params.get('adminTab') || params.get('subpage');
      if (fromUrl && (VALID_SUBPAGES as readonly string[]).includes(fromUrl)) {
        setActiveSubPage(fromUrl as SubPage);
      } else if (!fromUrl) {
        setActiveSubPage('overview');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // Dashboard overall stats state
  const [stats, setStats] = useState({
    testsCount: 0,
    materialsCount: 0,
    articlesCount: 0,
    usersCount: 0,
    activeAI: 'gemini',
    loading: true,
    error: ''
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

  const fetchStats = async () => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      
      // Single lightweight cached stats endpoint instead of 5 massive queries
      const res = await fetch(getApiUrl('/api/admin/stats'), { headers });
      if (res.ok) {
        const data = await res.json();
        setStats({
          testsCount: data.testsCount || 0,
          materialsCount: data.materialsCount || 0,
          articlesCount: data.articlesCount || 0,
          usersCount: data.usersCount || 0,
          activeAI: data.activeAI || 'gemini',
          loading: false,
          error: ''
        });
      } else {
        throw new Error('Failed to load stats');
      }
    } catch (e: any) {
      console.error('[Admin Stats Fetch Error]:', e);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load live administrative stats.'
      }));
    }
  };

  // Only run on mount or when user changes, NOT on every subpage switch
  useEffect(() => {
    fetchStats();
  }, [currentUser]);

  // Sidebar items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'notifications', label: 'Notifications & Broadcasts', icon: Bell },
    { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare },
    { id: 'reports', label: 'Reported Questions', icon: AlertTriangle },
    { id: 'staffs', label: 'Staff Accounts', icon: ShieldCheck },
    { id: 'tests', label: 'MCQ Tests', icon: Trophy },
    { id: 'news', label: 'News & Alerts', icon: Newspaper },
    { id: 'syllabus', label: 'Syllabus & PDF', icon: BookOpen },
    { id: 'badges', label: 'Badges Config', icon: Award },
    { id: 'typing', label: 'Typing Config', icon: Keyboard },
    { id: 'aiconfig', label: 'AI Config', icon: Cpu },
    { id: 'training', label: 'AI Training / Facts', icon: Brain },
    { id: 'tabsconfig', label: 'Manage Tabs', icon: Sliders },
    { id: 'examsconfig', label: 'Manage Exams', icon: Eye },
    { id: 'branding', label: 'Branding & Logos', icon: Sparkles },
    { id: 'logs', label: 'Activity Logs', icon: History },
  ] as const;

  // Render the current sub-page
  const renderSubPage = () => {
    switch (activeSubPage) {
      case 'overview':
        return renderOverview();
      case 'users':
        return <AdminUsers currentUser={currentUser} />;
      case 'notifications':
        return <AdminNotifications currentUser={currentUser} />;
      case 'feedbacks':
        return <AdminFeedbacks currentUser={currentUser} />;
      case 'reports':
        return <AdminReports currentUser={currentUser} />;
      case 'staffs':
        return <AdminStaffs currentUser={currentUser} />;
      case 'tests':
        return <AdminTests currentUser={currentUser} exams={exams} />;
      case 'news':
        return <AdminNews currentUser={currentUser} />;
      case 'syllabus':
        return <AdminSyllabus currentUser={currentUser} exams={exams} onRefreshExams={onRefreshExams} />;
      case 'badges':
        return <AdminBadges currentUser={currentUser} />;
      case 'aiconfig':
        return <AdminAIConfig currentUser={currentUser} />;
      case 'training':
        return <AdminTraining currentUser={currentUser} />;
      case 'tabsconfig':
        return <AdminTabsConfig currentUser={currentUser} />;
      case 'examsconfig':
        return <AdminExamsConfig currentUser={currentUser} exams={exams} onRefreshExams={onRefreshExams} />;
      case 'branding':
        return <AdminBranding currentUser={currentUser} configApiUrl={getApiUrl} />;
      case 'typing':
        return <AdminTyping currentUser={currentUser} />;
      case 'logs':
        return <AdminLogs currentUser={currentUser} />;
    }
  };

  const renderOverview = () => {
    if (stats.loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-text-muted">
          <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider">Loading stats...</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-8 animate-fade-in">
        {/* Main greeting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-bg-s2 to-bg-s3 border border-border p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase text-saffron tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Admin Hub</span>
            </span>
            <h2 className="text-lg font-black text-text">Welcome to CG Guru Console</h2>
            <p className="text-xs text-text-muted max-w-xl">
              Monitor server status, trigger AI MCQ test generation, refresh news caches from government boards, and configure Gemini model profiles.
            </p>
          </div>
          <div className="px-3.5 py-1.5 bg-greenL/10 border border-greenL/25 rounded text-greenL text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 select-none shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-greenL animate-ping" />
            <span>System Active</span>
          </div>
        </div>

        {stats.error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{stats.error}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex items-center gap-4 relative group hover:border-saffron-border/40 transition-colors cursor-pointer" onClick={() => setActiveSubPage('users')}>
            <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-500 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Total Users</span>
              <span className="text-2xl font-black text-text mt-1">{stats.usersCount}</span>
              <span className="text-[10px] text-text-muted mt-0.5">Registered aspirants</span>
            </div>
          </div>

          <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex items-center gap-4 relative group hover:border-saffron-border/40 transition-colors">
            <div className="w-12 h-12 bg-saffron/10 border border-saffron-border/30 rounded-lg flex items-center justify-center text-saffron shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Generated Tests</span>
              <span className="text-2xl font-black text-text mt-1">{stats.testsCount}</span>
              <span className="text-[10px] text-text-muted mt-0.5">MCQs generated via AI</span>
            </div>
          </div>

          <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex items-center gap-4 relative group hover:border-saffron-border/40 transition-colors">
            <div className="w-12 h-12 bg-greenL/10 border border-greenL/20 rounded-lg flex items-center justify-center text-greenL shrink-0">
              <Newspaper className="w-6 h-6" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Cached Articles</span>
              <span className="text-2xl font-black text-text mt-1">{stats.articlesCount}</span>
              <span className="text-[10px] text-text-muted mt-0.5">Government board feeds</span>
            </div>
          </div>

          <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex items-center gap-4 relative group hover:border-saffron-border/40 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Study PDFs</span>
              <span className="text-2xl font-black text-text mt-1">{stats.materialsCount}</span>
              <span className="text-[10px] text-text-muted mt-0.5">Uploaded notes & materials</span>
            </div>
          </div>

          <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex items-center gap-4 relative group hover:border-saffron-border/40 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">AI Model Engine</span>
              <span className="text-lg font-black text-text mt-2 uppercase tracking-wide truncate">{stats.activeAI}</span>
              <span className="text-[10px] text-text-muted mt-0.5">Active config engine</span>
            </div>
          </div>
        </div>

        {/* Informational Guidelines Card */}
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
            <Server className="w-4 h-4 text-saffron" />
            <span>Server Operations Checklist</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <div className="p-4 bg-bg-s3 border border-border/80 rounded-lg text-xs leading-relaxed flex flex-col gap-2">
              <span className="text-[8px] font-black uppercase text-saffron tracking-wider">AI TEST CREATOR</span>
              <p className="text-text-muted text-[11px] leading-normal">
                Use the **MCQ Tests** tab to generate exam papers. The AI creates full mock sets (25 Qs) or daily quizzes (5 Qs) targeting specific subjects. Shuffling is enabled automatically.
              </p>
            </div>

            <div className="p-4 bg-bg-s3 border border-border/80 rounded-lg text-xs leading-relaxed flex flex-col gap-2">
              <span className="text-[8px] font-black uppercase text-greenL tracking-wider">NEWS SYNC AGENT</span>
              <p className="text-text-muted text-[11px] leading-normal">
                Board feeds are scraped in the background. If updates are delayed, click **Refresh News Cache** in the News tab. Articles will be scraped and run through Gemini for bilingual summaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen text-text font-sans w-full pb-12">
      {/* Admin Panel Header */}
      <header 
        style={{ paddingTop: 'calc(max(env(safe-area-inset-top, 0px), var(--app-status-bar-height, 0px)) + 1rem)' }}
        className="sticky top-0 bg-[#0B0E14]/95 backdrop-blur-md border-b border-border/60 pb-4 flex flex-col sm:flex-row justify-between items-center z-40 shrink-0 gap-3"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none">⚙️</span>
          <div className="flex flex-col">
            <h1 className="text-base font-black bg-gradient-to-r from-saffron to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
              CG Guru Admin Console
            </h1>
            <span className="text-[9px] text-text-muted font-bold tracking-widest uppercase">Professional Panel</span>
          </div>
        </div>
        
        <button
          onClick={onGoBack}
          className="px-4 py-2 bg-bg-s2 hover:bg-bg-s3 border border-border text-xs font-black uppercase text-text rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors shadow active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-saffron" />
          <span>Exit Console</span>
        </button>
      </header>

      {/* Main Admin Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 flex-1 items-stretch">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-60 flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 shrink-0 border-b lg:border-b-0 lg:border-r border-border/40 lg:pr-4 select-none no-scrollbar">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSubPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubPage(item.id)}
                className={`w-full py-3 px-4 text-xs font-black uppercase tracking-wider rounded-lg border text-left transition-all cursor-pointer whitespace-nowrap flex items-center gap-3 ${
                  isActive
                    ? 'bg-saffron text-bg-s1 border-saffron shadow-sm'
                    : 'bg-bg-s2 border-border text-text-muted hover:text-text hover:bg-bg-s2/85'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-bg-s1' : 'text-saffron'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Sub-page viewport */}
        <main className="flex-1 min-w-0 bg-bg-s1">
          <Suspense fallback={<AdminTabLoader />}>
            {renderSubPage()}
          </Suspense>
        </main>

      </div>
    </div>
  );
};
