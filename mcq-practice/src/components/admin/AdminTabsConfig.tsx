import React, { useState, useEffect } from 'react';
import { 
  Sliders, Save, Loader2, CheckCircle, ShieldAlert, 
  Home, Trophy, MessageSquare, Newspaper, BookOpen, User, Eye, EyeOff,
  BrainCircuit, RefreshCw, BarChart3, Lightbulb
} from 'lucide-react';

interface AdminTabsConfigProps {
  currentUser: any;
}

interface TabDef {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<any>;
}

export const AdminTabsConfig: React.FC<AdminTabsConfigProps> = ({ currentUser }) => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    home: true,
    practice: true,
    chat: true,
    news: true,
    syllabus: true,
    profile: true,
    syllabus_ai_planner: true,
    syllabus_revision: true,
    syllabus_analytics: true,
    syllabus_strategy: true
  });

  const [loadingGet, setLoadingGet] = useState<boolean>(true);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

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

  const fetchTabVisibility = async () => {
    setLoadingGet(true);
    setErrorMessage('');
    try {
      const res = await fetch(getApiUrl('/api/admin/config/tabs'));
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.visibility) {
          setVisibility(data.visibility);
        }
      } else {
        throw new Error('Failed to retrieve tab settings.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Could not load tab visibility configurations.');
    } finally {
      setLoadingGet(false);
    }
  };

  useEffect(() => {
    fetchTabVisibility();
  }, [currentUser]);

  const handleToggle = (tabId: string) => {
    setVisibility(prev => ({
      ...prev,
      [tabId]: !prev[tabId]
    }));
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSave(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Guardrail: At least one tab must be visible
    const visibleCount = Object.values(visibility).filter(Boolean).length;
    if (visibleCount === 0) {
      setErrorMessage('At least one tab must remain visible to keep navigation active.');
      setLoadingSave(false);
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      
      // Try to save directly to Firestore client SDK first
      const firebase = (window as any).firebase;
      let savedDirectly = false;
      if (firebase && currentUser) {
        try {
          await firebase.firestore().collection('config').doc('tabs').set({
            visibility,
            updatedAt: new Date().toISOString()
          }, { merge: true });
          savedDirectly = true;
          console.log('[Firestore Direct Tab Save Success]');
        } catch (fsErr) {
          console.warn('[Firestore Direct Tab Save Failed, falling back to API]:', fsErr);
        }
      }

      const url = getApiUrl('/api/admin/config/tabs');
      console.log('Saving tabs visibility config to:', url, visibility);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ visibility })
      });

      console.log('Response status:', res.status);
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response JSON:', text);
        // If we saved directly, ignore server parse errors
        if (!savedDirectly) {
          throw new Error(`Server returned invalid response (Status ${res.status}): ${text.slice(0, 100)}`);
        }
      }

      if ((res.ok && data?.success) || savedDirectly) {
        setSuccessMessage('Tab visibility settings updated successfully! Changes will take effect immediately.');
      } else {
        throw new Error(data?.error || 'Server rejected updates.');
      }
    } catch (err: any) {
      console.error('Save tabs visibility config failed:', err);
      setErrorMessage(err.message || 'Failed to update tab configurations.');
    } finally {
      setLoadingSave(false);
    }
  };

  const tabDefs: TabDef[] = [
    { id: 'home', label: 'Home / मुख्य पृष्ठ', desc: 'Main student dashboard containing streak progress, target exam details, quick action shortcuts, and subject completion list cards.', icon: Home },
    { id: 'practice', label: 'Practice / अभ्यास', desc: 'Interactive practice sessions offering custom mock tests, daily speed quizzes, and previous year papers (PYQs).', icon: Trophy },
    { id: 'chat', label: 'AI Guru / एआई गुरु', desc: 'The AI Tutor Chat Bot interface offering instant doubt clearing, spaced repetition recall questions, and study assistance.', icon: MessageSquare },
    { id: 'news', label: 'News & Alerts / समाचार और अलर्ट', desc: 'Bilingual news feeds summarizing state notifications, job alerts, and board announcements translated via Gemini AI.', icon: Newspaper },
    { id: 'syllabus', label: 'Syllabus / पाठ्यक्रम', desc: 'Detailed syllabus trackers featuring custom exam syllabi parsing, study material PDFs, and learning checklists.', icon: BookOpen },
    { id: 'profile', label: 'Profile / प्रोफाइल', desc: 'User history panel displaying stats, rolling weekly MCQ charts, achievements, global leaderboards, and system settings.', icon: User },
    { id: 'syllabus_ai_planner', label: 'Syllabus: AI Study Planner', desc: 'AI Study Planner tab inside the Syllabus tab. Provides personalized day-by-day study schedules and progress tracking.', icon: BrainCircuit },
    { id: 'syllabus_revision', label: 'Syllabus: Spaced Revision', desc: 'Spaced Revision sub-tab inside the Syllabus tab. Helps track when to revise topics based on memory curves.', icon: RefreshCw },
    { id: 'syllabus_analytics', label: 'Syllabus: Analytics Dashboard', desc: 'Analytics Dashboard sub-tab inside the Syllabus tab. Displays progress charts and topic accuracy data.', icon: BarChart3 },
    { id: 'syllabus_strategy', label: 'Syllabus: Exam Strategy', desc: 'Exam Strategy sub-tab inside the Syllabus tab. Displays tips, marks distribution, and syllabus weightage.', icon: Lightbulb }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      {/* Alert Messages */}
      {successMessage && (
        <div className="p-4 bg-greenL/10 border border-greenL/20 text-greenL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
          <button type="button" onClick={() => setSuccessMessage('')} className="ml-auto text-greenL/60 hover:text-greenL">✕</button>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
          <button type="button" onClick={() => setErrorMessage('')} className="ml-auto text-redL/60 hover:text-redL">✕</button>
        </div>
      )}

      {loadingGet ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2 text-text-muted">
          <Loader2 className="w-6 h-6 animate-spin text-saffron" />
          <span className="text-[10px] font-black uppercase tracking-wider">Retrieving settings...</span>
        </div>
      ) : (
        <form onSubmit={handleSaveConfig} className="bg-bg-s2 border border-border p-6 rounded-xl shadow-md flex flex-col gap-6 max-w-3xl">
          
          <div className="flex items-center gap-2.5 border-b border-border/40 pb-3">
            <Sliders className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">Application Tab Visibility Control Panel</h3>
          </div>

          <p className="text-xs text-text-muted leading-relaxed">
            Configure which tabs are visible to users in the app navigation menu (Desktop sidebar and Mobile bottom navigation). Changes apply in real-time. Toggling a tab off hides it from the navigation menu and disables direct link pathways on the dashboard or profile screens.
          </p>

          {/* Tabs List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {tabDefs.map(tab => {
              const Icon = tab.icon;
              const isVisible = visibility[tab.id] !== false;
              return (
                <div 
                  key={tab.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                    isVisible
                      ? 'bg-bg-s3/40 border-border/80 hover:border-saffron-border/30'
                      : 'bg-bg-s3/10 border-border/20 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center ${
                        isVisible ? 'bg-saffron/10 text-saffron border border-saffron-border/25' : 'bg-bg-s1 text-text-muted border border-border/40'
                      }`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-black text-text leading-snug">{tab.label}</span>
                        <span className="text-[8px] font-black tracking-wider uppercase text-text-muted mt-0.5">Tab ID: {tab.id}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider flex items-center gap-1 ${
                      isVisible 
                        ? 'bg-greenL/10 text-greenL border border-greenL/20 shadow-sm' 
                        : 'bg-red-500/10 text-redL border border-red-500/20'
                    }`}>
                      {isVisible ? (
                        <>
                          <Eye className="w-2.5 h-2.5" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-2.5 h-2.5" />
                          <span>Hidden</span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-text-muted leading-relaxed min-h-[44px]">
                    {tab.desc}
                  </p>

                  <div className="flex items-center justify-between border-t border-border/40 pt-3 mt-1">
                    <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">Navigation Visibility</span>
                    
                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggle(tab.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isVisible ? 'bg-saffron' : 'bg-bg-s3 border border-border'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-text shadow ring-0 transition duration-200 ease-in-out ${
                          isVisible ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loadingSave}
            className="w-full mt-4 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md font-sans"
          >
            {loadingSave ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving settings...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Tab Configurations</span>
              </>
            )}
          </button>

        </form>
      )}
    </div>
  );
};
