import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Trophy, Newspaper, BookOpen, Cpu, 
  ArrowLeft, Sparkles, Server, AlertTriangle 
} from 'lucide-react';
import { AdminTests } from './AdminTests';
import { AdminNews } from './AdminNews';
import { AdminSyllabus } from './AdminSyllabus';
import { AdminAIConfig } from './AdminAIConfig';

interface AdminDashboardProps {
  currentUser: any;
  onGoBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onGoBack }) => {
  const [activeSubPage, setActiveSubPage] = useState<'overview' | 'tests' | 'news' | 'syllabus' | 'aiconfig'>('overview');
  
  // Dashboard overall stats state
  const [stats, setStats] = useState({
    testsCount: 0,
    materialsCount: 0,
    articlesCount: 0,
    activeAI: 'gemini',
    loading: true,
    error: ''
  });

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  const fetchStats = async () => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      
      // Fetch concurrently
      const [testsRes, materialsRes, newsRes, aiRes] = await Promise.all([
        fetch(getApiUrl('/api/admin/tests'), { headers }),
        fetch(getApiUrl('/api/admin/materials'), { headers }),
        fetch(getApiUrl('/api/news')),
        fetch(getApiUrl('/api/admin/config/ai'), { headers })
      ]);

      const tests = testsRes.ok ? await testsRes.json() : [];
      const materials = materialsRes.ok ? await materialsRes.json() : [];
      const news = newsRes.ok ? await newsRes.json() : { articles: [] };
      const aiConfig = aiRes.ok ? await aiRes.json() : { activeAI: 'gemini' };

      setStats({
        testsCount: Array.isArray(tests) ? tests.length : 0,
        materialsCount: Array.isArray(materials) ? materials.length : 0,
        articlesCount: news && Array.isArray(news.articles) ? news.articles.length : 0,
        activeAI: aiConfig.activeAI || 'gemini',
        loading: false,
        error: ''
      });
    } catch (e: any) {
      console.error('[Admin Stats Fetch Error]:', e);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load live administrative stats.'
      }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, [currentUser, activeSubPage]);

  // Sidebar items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tests', label: 'AI MCQ Tests', icon: Trophy },
    { id: 'news', label: 'News & Alerts', icon: Newspaper },
    { id: 'syllabus', label: 'Syllabus & PDF', icon: BookOpen },
    { id: 'aiconfig', label: 'AI Config', icon: Cpu },
  ] as const;

  // Render the current sub-page
  const renderSubPage = () => {
    switch (activeSubPage) {
      case 'overview':
        return renderOverview();
      case 'tests':
        return <AdminTests currentUser={currentUser} />;
      case 'news':
        return <AdminNews currentUser={currentUser} />;
      case 'syllabus':
        return <AdminSyllabus currentUser={currentUser} />;
      case 'aiconfig':
        return <AdminAIConfig currentUser={currentUser} />;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                Use the **AI MCQ Tests** tab to generate exam papers. The AI creates full mock sets (25 Qs) or daily quizzes (5 Qs) targeting specific subjects. Shuffling is enabled automatically.
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
    <div className="flex flex-col min-h-screen text-text font-sans w-full max-w-7xl mx-auto pb-12">
      {/* Admin Panel Header */}
      <header className="sticky top-0 bg-[#0B0E14]/90 backdrop-blur-md border-b border-border/60 py-4 flex flex-col sm:flex-row justify-between items-center z-40 shrink-0 gap-3">
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
          {renderSubPage()}
        </main>

      </div>
    </div>
  );
};
