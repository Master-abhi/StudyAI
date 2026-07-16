import React, { useState, useEffect } from 'react';
import { 
  Cpu, Save, Loader2, CheckCircle, ShieldAlert 
} from 'lucide-react';

interface AdminAIConfigProps {
  currentUser: any;
}

export const AdminAIConfig: React.FC<AdminAIConfigProps> = ({ currentUser }) => {
  const [activeAI, setActiveAI] = useState<string>('gemini');
  const [providerTest, setProviderTest] = useState<string>('gemini');
  const [providerAnalytics, setProviderAnalytics] = useState<string>('gemini');
  const [providerChat, setProviderChat] = useState<string>('gemini');
  const [providerNews, setProviderNews] = useState<string>('gemini');

  const [modelTest, setModelTest] = useState<string>('gemini-2.5-flash');
  const [modelAnalytics, setModelAnalytics] = useState<string>('gemini-2.5-flash');
  const [modelChat, setModelChat] = useState<string>('gemini-2.5-flash');
  const [modelNews, setModelNews] = useState<string>('gemini-2.5-flash');

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
        setProviderTest(data.providerTest || data.activeAI || 'gemini');
        setProviderAnalytics(data.providerAnalytics || data.activeAI || 'gemini');
        setProviderChat(data.providerChat || data.activeAI || 'gemini');
        setProviderNews(data.providerNews || data.activeAI || 'gemini');
        setModelTest(data.geminiModelTest || 'gemini-2.5-flash');
        setModelAnalytics(data.geminiModelAnalytics || 'gemini-2.5-flash');
        setModelChat(data.geminiModelChat || 'gemini-2.5-flash');
        setModelNews(data.geminiModelNews || 'gemini-2.5-flash');
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
        providerTest,
        providerAnalytics,
        providerChat,
        providerNews,
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
    { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Recommended / Default)' },
    { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Deep Reasoning & Analysis)' },
    { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (Fast Response)' },
    { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (High Volume / Legacy)' },
    { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro (Complex Context)' }
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
        <form onSubmit={handleSaveConfig} className="bg-bg-s2 border border-border p-6 rounded-xl shadow-md flex flex-col gap-6 max-w-4xl">
          
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Cpu className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">AI Task & Model Configuration</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {[
              {
                id: 'test',
                label: 'MCQ Paper Generator',
                desc: 'Generates practice exams, questions, and explanations.',
                provider: providerTest,
                setProvider: setProviderTest,
                model: modelTest,
                setModel: setModelTest
              },
              {
                id: 'chat',
                label: 'AI Tutor Chat Bot',
                desc: 'Handles interactive tutoring, video summary, and study notes.',
                provider: providerChat,
                setProvider: setProviderChat,
                model: modelChat,
                setModel: setModelChat
              },
              {
                id: 'news',
                label: 'Bilingual News Summarizer',
                desc: 'Scrapes, translates, and structures daily exam affairs.',
                provider: providerNews,
                setProvider: setProviderNews,
                model: modelNews,
                setModel: setModelNews
              },
              {
                id: 'analytics',
                label: 'Study Intelligence Analytics',
                desc: 'Generates student improvement plans and syllabus diagnostics.',
                provider: providerAnalytics,
                setProvider: setProviderAnalytics,
                model: modelAnalytics,
                setModel: setModelAnalytics
              }
            ].map(task => (
              <div key={task.id} className="p-5 bg-bg-s3/40 border border-border rounded-xl flex flex-col gap-4 shadow-sm hover:border-saffron-border/30 transition-all">
                <div className="flex flex-col">
                  <h4 className="text-xs font-black uppercase text-text tracking-wide">{task.label}</h4>
                  <p className="text-[10.5px] text-text-muted mt-0.5 leading-relaxed">{task.desc}</p>
                </div>

                {/* Provider select buttons */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase text-text-muted">Select Provider</label>
                  <div className="grid grid-cols-3 gap-1.5 bg-bg-s2 p-1 border border-border rounded-lg">
                    {[
                      { id: 'gemini', name: 'Gemini' },
                      { id: 'groq', name: 'Groq' },
                      { id: 'claude', name: 'Claude' }
                    ].map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => task.setProvider(p.id)}
                        className={`py-1.5 text-[10px] font-black uppercase rounded cursor-pointer transition-all ${
                          task.provider === p.id
                            ? 'bg-saffron text-bg-s1 shadow'
                            : 'text-text-muted hover:text-text'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gemini Model Select (conditional) */}
                {task.provider === 'gemini' && (
                  <div className="flex flex-col gap-1.5 animate-fade-in">
                    <label className="text-[9px] font-black uppercase text-text-muted">Gemini Model Routing</label>
                    <select
                      value={task.model}
                      onChange={(e) => task.setModel(e.target.value)}
                      className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer font-bold"
                    >
                      {validGeminiModels.map(m => (
                        <option key={m.id} value={m.id}>{m.label}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>

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
