import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Trash2, StopCircle, 
  Brain, ChevronRight, Globe,
  Bot, Trees, FileText, Users, Newspaper
} from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}



interface AiTutorTabProps {
  activeExam: any;
}

export const AiTutorTab: React.FC<AiTutorTabProps> = ({ activeExam }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);
  const [chatLanguage, setChatLanguage] = useState<'hi' | 'en'>('hi');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history from LocalStorage
  useEffect(() => {
    const key = `cg_chat_history_${activeExam?.id || 'default'}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    } else {
      setMessages([]);
    }
  }, [activeExam]);

  // Save chat history to LocalStorage
  const saveChatHistory = (msgs: ChatMessage[]) => {
    const key = `cg_chat_history_${activeExam?.id || 'default'}`;
    localStorage.setItem(key, JSON.stringify(msgs));
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all chat conversation history?')) {
      setMessages([]);
      const key = `cg_chat_history_${activeExam?.id || 'default'}`;
      localStorage.removeItem(key);
    }
  };



  const handleSend = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query) return;



    setInputVal('');
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: query,
      timestamp: userTimestamp
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveChatHistory(updatedMessages);

    // Initializing AI Response placeholder
    setGenerating(true);
    const aiMsgId = `msg-${Date.now() + 1}-ai`;
    const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const initialAiMsg: ChatMessage = {
      id: aiMsgId,
      role: 'ai',
      content: '',
      timestamp: aiTimestamp
    };

    setMessages(prev => [...prev, initialAiMsg]);

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
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const examName = activeExam ? activeExam.fullName || activeExam.name : 'CGPSC/CG Vyapam Exam';
      // Prepare raw history payloads
      const chatHistoryPayload = updatedMessages.slice(-6).map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.content
      }));

      const response = await fetch(getApiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          examName,
          language: chatLanguage === 'hi' ? 'hindi' : 'english',
          history: chatHistoryPayload,
          stream: true
        }),
        signal: abortController.signal
      });

      if (!response.ok) {
        throw new Error('Failed to reach AI Tutor endpoints');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No readable body stream');

      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'text') {
                accumulatedContent += data.content;
                setMessages(prev => prev.map(m => {
                  if (m.id === aiMsgId) {
                    return { ...m, content: accumulatedContent };
                  }
                  return m;
                }));
              }
            } catch (jsonErr) {
              // Ignore partial parsing errors
            }
          }
        }
      }

      // Save final message history
      setMessages(prev => {
        saveChatHistory(prev);
        return prev;
      });

    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Chat generation aborted');
      } else {
        console.error('Chat error:', err);
        setMessages(prev => prev.map(m => {
          if (m.id === aiMsgId) {
            return { 
              ...m, 
              content: 'Sorry, I encountered an issue connecting to the AI model. Please verify your connection and try again.' 
            };
          }
          return m;
        }));
      }
    } finally {
      setGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setGenerating(false);
    }
  };

  const quickPrompts = [
    { label: 'CG National Parks', icon: <Trees className="w-4 h-4 text-saffron" />, prompt: 'छत्तीसगढ़ के प्रमुख राष्ट्रीय उद्यान और अभयारण्य बताओ' },
    { label: 'CG History Practice', icon: <FileText className="w-4 h-4 text-saffron" />, prompt: 'Generate 5 MCQs on Chhattisgarh history for Patwari exam practice' },
    { label: 'CG Tribes Overview', icon: <Users className="w-4 h-4 text-saffron" />, prompt: 'छत्तीसगढ़ की प्रमुख जनजातियाँ और उनकी सामाजिक विशेषताएं बताओ' },
    { label: 'CG Current Affairs', icon: <Newspaper className="w-4 h-4 text-saffron" />, prompt: 'Summarize latest notifications or current affairs in Chhattisgarh for the upcoming exam' }
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg md:max-w-4xl mx-auto h-full min-h-0 bg-bg-s1 relative font-sans">
      
      {/* 1. Header controls */}
      <div className="flex items-center justify-between border-b border-border pb-3 bg-bg-s1 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <Brain className="w-5.5 h-5.5 text-saffron" />
          <div className="flex flex-col">
            <h3 className="text-sm font-black uppercase text-text leading-tight">AI Guru Tutor</h3>
            <span className="text-[9px] text-text-muted font-bold tracking-wider">Powered by LLM</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Language toggle */}
          <button
            onClick={() => setChatLanguage(prev => prev === 'hi' ? 'en' : 'hi')}
            className="px-2.5 py-1 rounded bg-bg-s3 border border-border text-[9px] font-black uppercase text-text flex items-center gap-1 cursor-pointer transition-colors hover:border-saffron-border"
            title="Toggle output language"
          >
            <Globe className="w-3.5 h-3.5 text-saffron" />
            <span>{chatLanguage === 'hi' ? 'हिंदी' : 'English'}</span>
          </button>

          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-1.5 rounded bg-bg-s3 border border-border text-redL hover:bg-red-500/10 cursor-pointer"
              title="Clear chat history"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Messages panel */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 min-h-0 no-scrollbar py-2">
        {messages.length === 0 ? (
          /* Welcome panel */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-bg-s2 border border-border rounded-xl shadow-md my-auto gap-4">
            <div className="w-16 h-16 bg-saffron-dim/20 rounded-full border border-saffron-border/30 flex items-center justify-center text-saffron select-none animate-pulse shrink-0">
              <Bot className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-black text-text">CG Guru AI Educator</h3>
              <p className="text-xs text-text-muted leading-relaxed max-w-xs">
                Ask me any questions about Chhattisgarh History, Polity, Geography, Tribe festivals, or practice tests!
              </p>
            </div>

            {/* Quick prompt chips */}
            <div className="flex flex-col gap-2.5 w-full mt-2">
              <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">Suggested doubts</span>
              <div className="flex flex-col gap-2">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qp.prompt)}
                    className="w-full p-2.5 bg-bg-s3 hover:bg-saffron-dim/25 border border-border rounded text-left text-xs font-bold text-text-muted hover:text-saffron transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      {qp.icon}
                      <span>{qp.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-text-muted group-hover:text-saffron group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Message bubbles */
          <div className="flex flex-col gap-3.5">
            {messages.map((m) => {
              const isAi = m.role === 'ai';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col max-w-[85%] ${isAi ? 'self-start items-start' : 'self-end items-end'}`}
                >
                  <div className={`p-3.5 rounded-lg text-xs leading-relaxed font-medium shadow-sm border ${
                    isAi 
                      ? 'bg-bg-s2 border-border text-text rounded-tl-none w-full' 
                      : 'bg-saffron border-saffron text-bg-s1 rounded-tr-none font-bold'
                  }`}>
                    {isAi ? (
                      <MarkdownRenderer content={m.content || (generating && messages[messages.length - 1].id === m.id ? 'Writing explanation...' : '')} />
                    ) : (
                      <div className="whitespace-pre-line font-sans leading-relaxed tracking-wide">
                        {m.content}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-text-muted mt-1 px-1 font-bold uppercase">{m.timestamp}</span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 3. Message typing input field */}
      <div className="border-t border-border pt-3.5 bg-bg-s1 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
          className="flex items-center gap-2.5"
        >


          <input
            type="text"
            placeholder="Ask anything about your exam..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={generating}
            className="flex-1 bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-4 py-3 rounded-lg outline-none transition-colors"
          />

          {generating ? (
            <button
              type="button"
              onClick={handleStop}
              className="p-3 bg-red-600 hover:bg-red-500 text-bg-s1 rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow"
              title="Stop generation"
            >
              <StopCircle className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-3 bg-saffron hover:bg-orange-500 disabled:opacity-50 text-bg-s1 rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow"
            >
              <Send className="w-4 h-4 fill-bg-s1" />
            </button>
          )}
        </form>
      </div>

    </div>
  );
};
