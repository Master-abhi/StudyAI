import React, { useState } from 'react';
import { 
  LayoutDashboard, Trophy, Newspaper, BookOpen, 
  ArrowLeft, Shield, AlertCircle 
} from 'lucide-react';
import { AdminTests } from '../admin/AdminTests';
import { AdminNews } from '../admin/AdminNews';
import { AdminSyllabus } from '../admin/AdminSyllabus';

import type { Exam } from '../syllabus/syllabusData';

interface StaffDashboardProps {
  currentUser: any;
  roles: string[];
  onGoBack: () => void;
  exams: Exam[];
  onRefreshExams: () => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({ 
  currentUser, 
  roles, 
  onGoBack, 
  exams, 
  onRefreshExams 
}) => {
  const [activeSubPage, setActiveSubPage] = useState<string>('overview');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, requiredRole: null },
    { id: 'tests', label: 'AI MCQ Tests', icon: Trophy, requiredRole: 'tests' },
    { id: 'news', label: 'News & Alerts', icon: Newspaper, requiredRole: 'news' },
    { id: 'syllabus', label: 'Syllabus & PDF', icon: BookOpen, requiredRole: 'syllabus' }
  ];

  // Filter menu items by roles
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.requiredRole) return true; // overview is always accessible
    return roles.includes(item.requiredRole);
  });

  const renderSubPage = () => {
    switch (activeSubPage) {
      case 'overview':
        return renderOverview();
      case 'tests':
        if (!roles.includes('tests')) return renderUnauthorized();
        return <AdminTests currentUser={currentUser} exams={exams} />;
      case 'news':
        if (!roles.includes('news')) return renderUnauthorized();
        return <AdminNews currentUser={currentUser} />;
      case 'syllabus':
        if (!roles.includes('syllabus')) return renderUnauthorized();
        return <AdminSyllabus currentUser={currentUser} exams={exams} onRefreshExams={onRefreshExams} />;
      default:
        return renderOverview();
    }
  };

  const renderUnauthorized = () => (
    <div className="p-8 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
      <AlertCircle className="w-4 h-4 shrink-0" />
      <span>You do not have permission to access this tool. Please contact the administrator.</span>
    </div>
  );

  const renderOverview = () => {
    const staffName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Staff Member';
    
    return (
      <div className="flex flex-col gap-6 animate-fade-in">
        {/* Welcome message */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-bg-s2 to-bg-s3 border border-border p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase text-saffron tracking-widest flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Staff Workspace</span>
            </span>
            <h2 className="text-lg font-black text-text">Welcome back, {staffName}</h2>
            <p className="text-xs text-text-muted max-w-xl">
              Use this workspace to perform your assigned operations. Your access is restricted to the specific zones granted by the system administrator.
            </p>
          </div>
          <div className="px-3.5 py-1.5 bg-saffron/10 border border-saffron-border/25 rounded text-saffron text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 select-none shadow">
            <span>Role: Staff</span>
          </div>
        </div>

        {/* Assigned bounds */}
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase text-text-muted tracking-wider border-b border-border/60 pb-3 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-saffron" />
            <span>Your Authorized Access Bounds</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableRolesInfo.map(role => {
              const hasRole = roles.includes(role.key);
              return (
                <div 
                  key={role.key}
                  className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
                    hasRole 
                      ? 'bg-bg-s3/40 border-saffron-border/30 hover:border-saffron/40' 
                      : 'bg-bg-s2/40 border-border/40 opacity-40 select-none'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${hasRole ? 'text-saffron' : 'text-text-muted'}`}>
                      {role.label}
                    </span>
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                      hasRole ? 'bg-greenL/15 text-greenL border border-greenL/25' : 'bg-border/60 text-text-muted'
                    }`}>
                      {hasRole ? 'Granted' : 'Locked'}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-normal">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const availableRolesInfo = [
    { 
      key: 'tests', 
      label: 'AI MCQ Tests', 
      description: 'Allows generating practice quiz papers (5 questions) or full mock mock tests (25 questions) for student exams. Provides editing capability for test structures, options, and explanations.' 
    },
    { 
      key: 'news', 
      label: 'News & Alerts', 
      description: 'Allows refreshing general board news and translation caches. Synchronizes notification feeds from state educational boards for local aspirants.' 
    },
    { 
      key: 'syllabus', 
      label: 'Syllabus & PDF', 
      description: 'Allows editing syllabus mapping for state competitive examinations, uploading text-extracted reference notes, and managing learning checklists.' 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-text font-sans w-full max-w-7xl mx-auto pb-12">
      {/* Staff Panel Header */}
      <header className="sticky top-0 bg-[#0B0E14]/90 backdrop-blur-md border-b border-border/60 py-4 flex flex-col sm:flex-row justify-between items-center z-40 shrink-0 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none">🛡️</span>
          <div className="flex flex-col">
            <h1 className="text-base font-black bg-gradient-to-r from-saffron to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
              CG Guru Staff Panel
            </h1>
            <span className="text-[9px] text-text-muted font-bold tracking-widest uppercase">Operator Console</span>
          </div>
        </div>
        
        <button
          onClick={onGoBack}
          className="px-4 py-2 bg-bg-s2 hover:bg-bg-s3 border border-border text-xs font-black uppercase text-text rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors shadow active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-saffron" />
          <span>Exit Workspace</span>
        </button>
      </header>

      {/* Main Staff Dashboard Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 flex-1 items-stretch">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-60 flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 shrink-0 border-b lg:border-b-0 lg:border-r border-border/40 lg:pr-4 select-none no-scrollbar">
          {filteredMenuItems.map(item => {
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
