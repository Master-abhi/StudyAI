import React, { useState, useEffect } from 'react';
import { 
  Save, Loader2, CheckCircle, ShieldAlert, 
  Eye, EyeOff, Layers
} from 'lucide-react';
import type { Exam } from '../syllabus/syllabusData';

interface AdminExamsConfigProps {
  currentUser: any;
  exams: Exam[];
}

export const AdminExamsConfig: React.FC<AdminExamsConfigProps> = ({ currentUser, exams }) => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
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

  const fetchExamVisibility = async () => {
    setLoadingGet(true);
    setErrorMessage('');
    try {
      const res = await fetch(getApiUrl('/api/admin/config/exams'));
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.visibility) {
          // Merge fetched visibility with current exams
          const newVisibility: Record<string, boolean> = {};
          exams.forEach(ex => {
            newVisibility[ex.id] = data.visibility[ex.id] !== false;
          });
          setVisibility(newVisibility);
        } else {
          // Default all to true
          const defaultVis: Record<string, boolean> = {};
          exams.forEach(ex => {
            defaultVis[ex.id] = true;
          });
          setVisibility(defaultVis);
        }
      } else {
        throw new Error('Failed to retrieve exam settings.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Could not load exam visibility configurations.');
    } finally {
      setLoadingGet(false);
    }
  };

  useEffect(() => {
    fetchExamVisibility();
  }, [currentUser, exams]);

  const handleToggle = (examId: string) => {
    setVisibility(prev => ({
      ...prev,
      [examId]: !prev[examId]
    }));
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSave(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Guardrail: At least one exam must be visible
    const visibleCount = Object.values(visibility).filter(Boolean).length;
    if (visibleCount === 0) {
      setErrorMessage('At least one exam must remain visible to keep target selection active.');
      setLoadingSave(false);
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      const url = getApiUrl('/api/admin/config/exams');
      console.log('Saving exams visibility config to:', url, visibility);

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
        throw new Error(`Server returned invalid response (Status ${res.status}): ${text.slice(0, 100)}`);
      }

      if (res.ok && data.success) {
        setSuccessMessage('Exam visibility settings updated successfully! Changes will take effect immediately.');
      } else {
        throw new Error(data.error || 'Server rejected updates.');
      }
    } catch (err: any) {
      console.error('Save exams visibility config failed:', err);
      setErrorMessage(err.message || 'Failed to update exam configurations.');
    } finally {
      setLoadingSave(false);
    }
  };

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
          <span className="text-[10px] font-black uppercase tracking-wider">Retrieving exam configs...</span>
        </div>
      ) : (
        <form onSubmit={handleSaveConfig} className="bg-bg-s2 border border-border p-6 rounded-xl shadow-md flex flex-col gap-6 max-w-3xl">
          
          <div className="flex items-center gap-2.5 border-b border-border/40 pb-3">
            <Layers className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">Exam Visibility Control Panel</h3>
          </div>

          <p className="text-xs text-text-muted leading-relaxed">
            Configure which exams are visible to regular users in the app selection menu (onboarding modal, dashboard drawer, and syllabus dropdown). Changes apply immediately. Toggling an exam off hides it from normal users, but administrators and staff will still be able to manage them here.
          </p>

          {/* Exams List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {exams.map(exam => {
              const isVisible = visibility[exam.id] !== false;
              return (
                <div 
                  key={exam.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                    isVisible
                      ? 'bg-bg-s3/40 border-border/80 hover:border-saffron-border/30'
                      : 'bg-bg-s3/10 border-border/20 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-xl ${
                        isVisible ? 'bg-saffron/10 text-saffron border border-saffron-border/25' : 'bg-bg-s1 text-text-muted border border-border/40'
                      }`}>
                        {exam.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-black text-text leading-snug truncate">{exam.name}</span>
                        <span className="text-[8px] font-black tracking-wider uppercase text-text-muted mt-0.5">Exam ID: {exam.id}</span>
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

                  <p className="text-[11px] text-text-muted leading-relaxed min-h-[36px]">
                    {exam.fullName} • {exam.stage} • {exam.daysRemaining} days remaining.
                  </p>

                  <div className="flex items-center justify-between border-t border-border/40 pt-3 mt-1">
                    <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">User Selector Visibility</span>
                    
                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggle(exam.id)}
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
                <span>Save Exam Configurations</span>
              </>
            )}
          </button>

        </form>
      )}
    </div>
  );
};
