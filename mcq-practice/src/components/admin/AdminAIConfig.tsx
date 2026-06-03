import React, { useState, useEffect } from 'react';
import { 
  Cpu, Save, Loader2, CheckCircle, ShieldAlert, AlertTriangle 
} from 'lucide-react';

interface AdminAIConfigProps {
  currentUser: any;
}

export const AdminAIConfig: React.FC<AdminAIConfigProps> = ({ currentUser }) => {
  const [activeAI, setActiveAI] = useState<string>('gemini');
  const [modelTest, setModelTest] = useState<string>('gemini-3.5-flash');
  const [modelAnalytics, setModelAnalytics] = useState<string>('gemini-3.5-flash');
  const [modelChat, setModelChat] = useState<string>('gemini-3.5-flash');
  const [modelNews, setModelNews] = useState<string>('gemini-3.5-flash');

  const [loadingGet, setLoadingGet] = useState<boolean>(true);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  const fetchAIConfig = async () => {
    setLoadingGet(true);
    setErrorMessage('');
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/config/ai'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setActiveAI(data.activeAI || 'gemini');
        setModelTest(data.geminiModelTest || 'gemini-3.5-flash');
        setModelAnalytics(data.geminiModelAnalytics || 'gemini-3.5-flash');
        setModelChat(data.geminiModelChat || 'gemini-3.5-flash');
        setModelNews(data.geminiModelNews || 'gemini-3.5-flash');
      } else {
        throw new Error('Failed to retrieve active AI configurations.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Could not load AI engine config from server.');
    } finally {
      setLoadingGet(false);
    }
  };

  useEffect(() => {
    fetchAIConfig();
  }, [currentUser]);

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSave(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const payload = {
        model: activeAI,
        geminiModelTest: modelTest,
        geminiModelAnalytics: modelAnalytics,
        geminiModelChat: modelChat,
        geminiModelNews: modelNews
      };

      const res = await fetch(getApiUrl('/api/admin/config/ai'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage('AI Engine configurations saved successfully! Settings are active immediately.');
      } else {
        throw new Error(data.error || 'Server rejected updates.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to update configuration.');
    } finally {
      setLoadingSave(false);
    }
  };

  const validGeminiModels = [
    { id: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash (Default)' },
    { id: 'gemini-3.5-pro', label: 'Gemini 3.5 Pro (High Reasoning)' },
    { id: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite (Fast)' },
    { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
    { id: 'gemma-4-31b-it', label: 'Gemma 4 31B IT' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      {/* Messages */}
      {successMessage && (
        <div className="p-4 bg-greenL/10 border border-greenL/20 text-greenL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="ml-auto text-greenL/60 hover:text-greenL">✕</button>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="ml-auto text-redL/60 hover:text-redL">✕</button>
        </div>
      )}

      {loadingGet ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2 text-text-muted">
          <Loader2 className="w-6 h-6 animate-spin text-saffron" />
          <span className="text-[10px] font-black uppercase tracking-wider">Loading Configuration...</span>
        </div>
      ) : (
        <form onSubmit={handleSaveConfig} className="bg-bg-s2 border border-border p-6 rounded-xl shadow-md flex flex-col gap-6 max-w-2xl">
          
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Cpu className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">AI Model Providers Configuration</h3>
          </div>

          {/* Provider Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-text-muted">Active Model API Provider</label>
            <div className="grid grid-cols-3 gap-3 mt-1 select-none">
              {[
                { id: 'gemini', label: 'Google Gemini', desc: 'Default AI Engine' },
                { id: 'claude', label: 'Anthropic Claude', desc: 'High Quality Engine' },
                { id: 'groq', label: 'Groq LLaMA', desc: 'Fast Inference Engine' }
              ].map(provider => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => setActiveAI(provider.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col gap-1.5 ${
                    activeAI === provider.id
                      ? 'bg-saffron-dim/20 border-saffron text-saffron'
                      : 'bg-bg-s3 border-border hover:bg-bg-s3/80 text-text'
                  }`}
                >
                  <span className="text-xs font-black leading-tight">{provider.label}</span>
                  <span className="text-[8px] text-text-muted font-bold uppercase tracking-wider">{provider.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Specific Gemini Profiles */}
          {activeAI === 'gemini' ? (
            <div className="flex flex-col gap-4 border-t border-border/40 pt-5 mt-2">
              <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Gemini Engine Routing Profiles</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Profile: Tests */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">MCQ Paper Generator Model</label>
                  <select
                    value={modelTest}
                    onChange={(e) => setModelTest(e.target.value)}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer font-bold"
                  >
                    {validGeminiModels.map(m => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                </div>

                {/* Profile: Analytics */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Study Intelligence Analytics Model</label>
                  <select
                    value={modelAnalytics}
                    onChange={(e) => setModelAnalytics(e.target.value)}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer font-bold"
                  >
                    {validGeminiModels.map(m => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                </div>

                {/* Profile: Chat */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">AI Tutor Chat Bot Model</label>
                  <select
                    value={modelChat}
                    onChange={(e) => setModelChat(e.target.value)}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer font-bold"
                  >
                    {validGeminiModels.map(m => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                </div>

                {/* Profile: News */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Bilingual News Summarizer Model</label>
                  <select
                    value={modelNews}
                    onChange={(e) => setModelNews(e.target.value)}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer font-bold"
                  >
                    {validGeminiModels.map(m => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
          ) : (
            <div className="p-4 bg-bg-s3 border border-saffron-border/30 rounded-lg text-xs leading-relaxed text-text flex items-start gap-2.5 mt-2">
              <AlertTriangle className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Non-Gemini Provider Selected</span>
                <p className="text-[11px] text-text-muted">
                  Note that Claude and Groq models do not support individual task routing variants in the current version of the server code. Standard defaults will be mapped on the backend.
                </p>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loadingSave}
            className="w-full mt-4 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
          >
            {loadingSave ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving settings...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Configurations</span>
              </>
            )}
          </button>

        </form>
      )}
    </div>
  );
};
