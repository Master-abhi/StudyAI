import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Eye, Clock, CheckCircle, Search, 
  Sparkles, ExternalLink, RefreshCw, Loader2, Video
} from 'lucide-react';

export interface LectureVideo {
  videoId: string;
  title: string;
  author: string;
  duration: string;
  views: string;
  ago: string;
  thumbnail: string;
  url: string;
  embedUrl: string;
}

interface LecturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicName: string;
  topicNameHi?: string;
  subjectName?: string;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export const LecturesModal: React.FC<LecturesModalProps> = ({
  isOpen,
  onClose,
  topicName,
  topicNameHi,
  subjectName,
  onMarkComplete,
  isCompleted
}) => {
  const [lectures, setLectures] = useState<LectureVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<LectureVideo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [customSearch, setCustomSearch] = useState<string>('');

  const getApiUrl = (p: string) => {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' || 
                    hostname === '[::1]' ||
                    hostname.startsWith('192.168.');
    if (isLocal && window.location.port !== '3000') {
      return `http://localhost:3000${p}`;
    }
    if (hostname.endsWith('.web.app') || hostname.endsWith('.firebaseapp.com')) {
      return `https://study-ai-olive.vercel.app${p}`;
    }
    return p;
  };

  const fetchLectures = async (queryOverride?: string) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (queryOverride || customSearch) {
        params.append('query', queryOverride || customSearch);
      } else {
        if (topicName) params.append('topicName', topicName);
        if (topicNameHi) params.append('topicNameHi', topicNameHi);
        if (subjectName) params.append('subjectName', subjectName);
      }
      const res = await fetch(getApiUrl(`/api/syllabus/topic-lectures?${params.toString()}`));
      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.lectures) && data.lectures.length > 0) {
        setLectures(data.lectures);
        // Auto-select first lecture if none selected
        if (!selectedVideo) {
          setSelectedVideo(data.lectures[0]);
        }
      } else {
        throw new Error(data.error || 'No lecture videos found for this topic.');
      }
    } catch (err: any) {
      console.error('[Fetch Lectures Error]:', err);
      setError(err.message || 'Could not fetch video lectures. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedVideo(null);
      setCustomSearch('');
      fetchLectures();
    }
  }, [isOpen, topicName]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSearch.trim()) {
      fetchLectures(customSearch.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-1 sm:p-3 bg-black/90 backdrop-blur-md animate-fade-in select-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="bg-bg-s2 border border-border rounded-2xl w-full max-w-[98vw] 2xl:max-w-[1700px] h-[96vh] max-h-[96vh] flex flex-col shadow-2xl overflow-hidden font-sans"
        >
          {/* Header Bar */}
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-bg-s3 border-b border-border flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-xs sm:text-sm font-black text-text truncate leading-tight">
                  {topicNameHi || topicName}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-text-muted mt-0.5">
                  <span className="text-saffron font-bold">{subjectName || 'Study Topic'}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-[9px] bg-red-600/15 text-red-500 border border-red-600/25 px-1.5 py-0.2 rounded font-black uppercase">
                    <Sparkles className="w-2.5 h-2.5" />
                    YouTube Curated Class
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Mark Completed & Close */}
            <div className="flex items-center gap-2 shrink-0">
              {onMarkComplete && (
                <button
                  type="button"
                  onClick={onMarkComplete}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black uppercase cursor-pointer transition-all ${
                    isCompleted 
                      ? 'bg-greenL/20 border-greenL/40 text-greenL' 
                      : 'bg-bg-s2 border-border text-text-muted hover:text-text hover:border-saffron'
                  }`}
                  title="Mark topic lectures as watched"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Watched' : 'Mark Watched'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 bg-bg-s2 hover:bg-red-500/20 border border-border hover:border-red-500/40 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-colors"
                title="Close Window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Layout: Video Player (Left/Top) + Lecture Playlist (Right/Bottom) */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-bg-s1">
            
            {/* Left: Active Video Player Stage */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0c0d12] border-b lg:border-b-0 lg:border-r border-border/80">
              <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden">
                {selectedVideo ? (
                  <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-text-muted">
                    {loading ? (
                      <>
                        <Loader2 className="w-8 h-8 animate-spin text-saffron" />
                        <span className="text-xs font-bold uppercase tracking-wider text-saffron">
                          Searching Top Educational Lectures...
                        </span>
                      </>
                    ) : (
                      <span className="text-xs">Select a video lecture to play</span>
                    )}
                  </div>
                )}
              </div>

              {/* Selected Video Metadata Bar */}
              {selectedVideo && (
                <div className="p-3.5 sm:p-5 flex flex-col gap-2 bg-bg-s2 border-t border-border/60">
                  <h2 className="text-xs sm:text-base font-black text-text leading-snug line-clamp-2 select-text">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/40 text-xs">
                    <div className="flex items-center gap-3 text-text-muted">
                      <span className="font-bold text-saffron">{selectedVideo.author}</span>
                      {selectedVideo.views && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{selectedVideo.views} views</span>
                        </span>
                      )}
                      {selectedVideo.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{selectedVideo.duration}</span>
                        </span>
                      )}
                    </div>

                    <a
                      href={selectedVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-text-muted hover:text-saffron flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Search & Video Playlist */}
            <div className="w-full lg:w-96 xl:w-[420px] flex flex-col shrink-0 bg-bg-s2 overflow-hidden">
              
              {/* Search Within Topic */}
              <div className="p-3 border-b border-border bg-bg-s3/70">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search lecture keyword..."
                      value={customSearch}
                      onChange={(e) => setCustomSearch(e.target.value)}
                      className="w-full bg-bg-s2 text-xs text-text placeholder:text-text-muted border border-border focus:border-saffron px-3 py-2 pl-8 rounded-lg outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="button"
                    onClick={() => fetchLectures()}
                    disabled={loading}
                    className="p-2 bg-bg-s2 hover:bg-bg-s3 border border-border text-text-muted hover:text-saffron rounded-lg cursor-pointer disabled:opacity-40"
                    title="Refresh Videos"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </form>
              </div>

              {/* Playlist Header */}
              <div className="px-3.5 py-2 bg-bg-s3/40 border-b border-border flex items-center justify-between text-[11px] font-bold text-text-muted">
                <span>Recommended Classes ({lectures.length})</span>
                <span className="text-[9px] text-saffron uppercase font-black">Top Rated</span>
              </div>

              {/* Video List */}
              <div className="flex-1 overflow-y-auto p-2 sm:p-3 flex flex-col gap-2">
                {loading && lectures.length === 0 ? (
                  <div className="h-48 flex flex-col items-center justify-center gap-2 text-text-muted">
                    <Loader2 className="w-6 h-6 animate-spin text-saffron" />
                    <span className="text-[11px]">Finding top lectures...</span>
                  </div>
                ) : error && lectures.length === 0 ? (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl text-xs text-center flex flex-col gap-2">
                    <span>{error}</span>
                    <button
                      type="button"
                      onClick={() => fetchLectures()}
                      className="px-3 py-1 bg-saffron text-bg-s1 rounded font-bold self-center cursor-pointer"
                    >
                      Retry Search
                    </button>
                  </div>
                ) : (
                  lectures.map((video) => {
                    const isPlaying = selectedVideo?.videoId === video.videoId;

                    return (
                      <div
                        key={video.videoId}
                        onClick={() => setSelectedVideo(video)}
                        className={`p-2.5 rounded-xl border flex gap-3 cursor-pointer transition-all ${
                          isPlaying
                            ? 'bg-saffron/10 border-saffron shadow-sm'
                            : 'bg-bg-s3/50 border-border/80 hover:bg-bg-s3 hover:border-border'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-black shrink-0 border border-border/60">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {video.duration && (
                            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">
                              {video.duration}
                            </span>
                          )}
                          {isPlaying && (
                            <div className="absolute inset-0 bg-saffron/30 flex items-center justify-center">
                              <Play className="w-5 h-5 text-saffron fill-saffron" />
                            </div>
                          )}
                        </div>

                        {/* Video Info */}
                        <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                          <h4 className={`text-[11px] font-bold leading-snug line-clamp-2 ${isPlaying ? 'text-saffron' : 'text-text'}`}>
                            {video.title}
                          </h4>
                          <div className="flex flex-col gap-0.5 mt-1">
                            <span className="text-[10px] text-text-muted truncate font-medium">
                              {video.author}
                            </span>
                            <div className="flex items-center gap-2 text-[9px] text-text-muted">
                              {video.views && <span>{video.views} views</span>}
                              {video.ago && (
                                <>
                                  <span>•</span>
                                  <span>{video.ago}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
