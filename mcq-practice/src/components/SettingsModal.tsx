import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, LogOut, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeExamName: string;
  onChangeExam: () => void;
  language: 'hi' | 'en';
  onLanguageChange: (lang: 'hi' | 'en') => void;
  onLogout: () => void;
  onClearProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  activeExamName,
  onChangeExam,
  language,
  onLanguageChange,
  onLogout,
  onClearProgress
}) => {
  const [apiOk, setApiOk] = useState<boolean | null>(null);
  const [clearingChat, setClearingChat] = useState<boolean>(false);

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  useEffect(() => {
    if (!isOpen) return;
    // Check server health
    fetch(getApiUrl('/api/health'))
      .then(res => res.json())
      .then(data => {
        setApiOk(data.status === 'ok');
      })
      .catch(() => {
        setApiOk(false);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearChatHistory = () => {
    if (window.confirm('Delete all stored AI Guru chat conversation logs?')) {
      setClearingChat(true);
      // Clear all items starting with cg_chat_history_
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cg_chat_history_')) {
          localStorage.removeItem(key);
        }
      });
      setTimeout(() => {
        setClearingChat(false);
        alert('Chat histories cleared successfully!');
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-bg-s2 border border-border rounded-xl shadow-2xl p-5 flex flex-col gap-4 font-sans"
      >
        <div className="flex justify-between items-center border-b border-border pb-2.5">
          <h3 className="text-sm font-black uppercase text-text flex items-center gap-1.5">
            <Settings className="w-4.5 h-4.5 text-saffron" />
            <span>Settings / सेटिंग्स</span>
          </h3>
          <button
            onClick={onClose}
            className="text-xs text-text-muted hover:text-text cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Current Exam */}
        <div className="flex flex-col gap-1">
          <label className="text-[9px] font-black uppercase text-text-muted">Target Exam</label>
          <button
            onClick={() => {
              onChangeExam();
              onClose();
            }}
            className="p-3 bg-bg-s3 hover:bg-bg-s3/80 border border-border rounded-lg text-left text-xs font-bold text-text flex justify-between items-center cursor-pointer"
          >
            <span>{activeExamName || 'Select target exam'}</span>
            <span className="text-[10px] text-saffron font-bold uppercase">Edit</span>
          </button>
        </div>

        {/* Language select */}
        <div className="flex flex-col gap-1">
          <label className="text-[9px] font-black uppercase text-text-muted">App Language / भाषा</label>
          <div className="grid grid-cols-2 gap-2 mt-0.5">
            <button
              onClick={() => onLanguageChange('hi')}
              className={`p-2.5 rounded-lg border text-xs font-black uppercase transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-saffron text-bg-s1 border-saffron shadow-sm'
                  : 'bg-bg-s3 border-border text-text-muted hover:text-text'
              }`}
            >
              हिं हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`p-2.5 rounded-lg border text-xs font-black uppercase transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-saffron text-bg-s1 border-saffron shadow-sm'
                  : 'bg-bg-s3 border-border text-text-muted hover:text-text'
              }`}
            >
              EN English
            </button>
          </div>
        </div>

        {/* API Health dots */}
        <div className="flex flex-col gap-1 border-t border-border/40 pt-3">
          <label className="text-[9px] font-black uppercase text-text-muted">AI API Server Status</label>
          <div className="flex items-center gap-2 mt-0.5 text-xs font-semibold text-text">
            <span className={`w-2.5 h-2.5 rounded-full ${
              apiOk === null ? 'bg-amber-500 animate-pulse' :
              apiOk ? 'bg-greenL' : 'bg-redL'
            }`} />
            <span className="text-[11px]">
              {apiOk === null ? 'Checking API status...' :
               apiOk ? 'API Server connected successfully' :
               'API Server connection offline'
              }
            </span>
          </div>
        </div>

        {/* Actions panel */}
        <div className="flex flex-col gap-2.5 border-t border-border/40 pt-4 mt-1 shrink-0">
          <button
            onClick={handleClearChatHistory}
            disabled={clearingChat}
            className="w-full py-2.5 bg-bg-s3 hover:bg-red-500/10 border border-border text-redL text-[10px] font-black uppercase rounded flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{clearingChat ? 'Clearing...' : 'Clear Chat History'}</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Erase all of your locally saved syllabus progress rates? This action is irreversible.')) {
                onClearProgress();
                onClose();
              }
            }}
            className="w-full py-2.5 bg-bg-s3 hover:bg-red-500/10 border border-border text-redL text-[10px] font-black uppercase rounded flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Study Progress</span>
          </button>

          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-bg-s1 text-[10px] font-black uppercase rounded flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow"
          >
            <LogOut className="w-3.5 h-3.5 text-bg-s1" />
            <span>🚪 Log Out Session</span>
          </button>
        </div>

        <div className="text-center text-[9px] text-text-muted mt-1 leading-normal font-sans font-medium uppercase tracking-wider">
          CG Guru v1.2 • Built for serious aspirants
        </div>
      </motion.div>
    </div>
  );
};
