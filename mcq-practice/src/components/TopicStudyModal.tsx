import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Play, Sparkles, AlertTriangle } from 'lucide-react';

interface TopicStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string;
  topicName: string;
  topicNameHi: string;
  language: 'hi' | 'en';
}

export const TopicStudyModal: React.FC<TopicStudyModalProps> = ({
  isOpen,
  onClose,
  topicName,
  topicNameHi,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'youtube'>('notes');
  const [notes, setNotes] = useState<string>('');
  const [notesLoading, setNotesLoading] = useState<boolean>(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [videoSummary, setVideoSummary] = useState<string>('');
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  const fetchNotes = async () => {
    setNotesLoading(true);
    setError('');
    try {
      const res = await fetch(getApiUrl('/api/study/topic-notes'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: topicNameHi || topicName,
          language: language === 'hi' ? 'hindi' : 'english'
        })
      });

      if (!res.ok) throw new Error('Failed to generate notes');
      const data = await res.json();
      setNotes(data.notes || 'No study materials found.');
    } catch (err) {
      console.error(err);
      setError('Could not generate notes for this topic. Please try again.');
    } finally {
      setNotesLoading(false);
    }
  };

  const fetchYoutubeSummary = async () => {
    setVideoLoading(true);
    setError('');
    try {
      const res = await fetch(getApiUrl('/api/study/youtube-learn'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: topicNameHi || topicName,
          language: language === 'hi' ? 'hindi' : 'english'
        })
      });

      if (!res.ok) throw new Error('Failed to load video summary');
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setVideoInfo(data.videoInfo);
        setVideoSummary(data.summary);
      }
    } catch (err) {
      console.error(err);
      setError('Could not fetch relevant video and AI summaries.');
    } finally {
      setVideoLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    setNotes('');
    setVideoInfo(null);
    setVideoSummary('');
    setError('');
    
    if (activeTab === 'notes') {
      fetchNotes();
    } else {
      fetchYoutubeSummary();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl p-5 flex flex-col gap-4 max-h-[85vh] font-sans"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-border pb-2">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Topic Study Workspace</span>
            <h3 className="text-sm font-black text-text leading-tight mt-0.5 truncate max-w-[280px]">
              {topicNameHi || topicName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-text-muted hover:text-text cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Workspace Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 mt-0.5">
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-2 px-3 rounded-lg border text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-saffron text-bg-s1 border-saffron shadow-sm'
                : 'bg-bg-s3 border-border text-text-muted hover:text-text'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>PDF Notes</span>
          </button>
          
          <button
            onClick={() => setActiveTab('youtube')}
            className={`py-2 px-3 rounded-lg border text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'youtube'
                ? 'bg-saffron text-bg-s1 border-saffron shadow-sm'
                : 'bg-bg-s3 border-border text-text-muted hover:text-text'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>YouTube AI</span>
          </button>
        </div>

        {/* Tab content workspace */}
        <div className="flex-1 overflow-y-auto min-h-[220px] max-h-[400px] pr-1 py-1 no-scrollbar border-t border-border/40 pt-3">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-redL rounded-lg text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!error && activeTab === 'notes' && (
            notesLoading ? (
              <div className="h-32 flex items-center justify-center animate-pulse text-xs text-text-muted">
                Synthesizing notes from materials database... 🤖
              </div>
            ) : (
              <div className="text-xs leading-relaxed text-text font-medium whitespace-pre-line tracking-wide">
                {notes || 'Loading notes content...'}
              </div>
            )
          )}

          {!error && activeTab === 'youtube' && (
            videoLoading ? (
              <div className="h-32 flex items-center justify-center animate-pulse text-xs text-text-muted">
                Locating tutorials and analyzing transcripts... 🤖
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {videoInfo && (
                  /* Video Card Link */
                  <a
                    href={videoInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-bg-s3 border border-border rounded-lg flex items-center gap-3.5 hover:border-saffron/40 transition-colors group cursor-pointer"
                  >
                    <div className="relative w-16 h-12 rounded overflow-hidden border border-border shrink-0">
                      <img
                        src={videoInfo.thumbnail}
                        alt="video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#0B0E14]/40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex flex-col truncate pr-2">
                      <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Video tutorial</span>
                      <h4 className="text-xs font-bold text-text truncate group-hover:text-saffron transition-colors leading-tight mt-0.5">
                        {videoInfo.title}
                      </h4>
                    </div>
                  </a>
                )}

                {videoSummary && (
                  /* Summary Content */
                  <div className="flex flex-col gap-2 p-3.5 bg-bg-s3 border border-border/80 rounded-lg">
                    <h5 className="text-[10px] font-black uppercase text-saffron tracking-wider flex items-center gap-1 pb-1 border-b border-border/40">
                      <Sparkles className="w-3.5 h-3.5 text-saffron animate-pulse" />
                      <span>AI Explainer Summary</span>
                    </h5>
                    <p className="text-xs text-text-muted leading-relaxed whitespace-pre-line tracking-wide mt-1.5">
                      {videoSummary}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/40 pt-3 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-bg-s3 border border-border hover:bg-bg-s3/80 text-[10px] font-black uppercase text-text rounded-lg cursor-pointer transition-colors"
          >
            Close Window
          </button>
        </div>

      </motion.div>
    </div>
  );
};
