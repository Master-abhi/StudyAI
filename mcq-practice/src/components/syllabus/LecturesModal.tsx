import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Eye, Clock, CheckCircle, Search, 
  Sparkles, ExternalLink, RefreshCw, Loader2, Video,
  Pin, RotateCcw
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

interface VideoProgress {
  currentTime: number; // in seconds
  duration: number;    // in seconds
  percentage: number;  // 0 to 100
  lastWatched: number; // timestamp
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

const WATCH_HISTORY_STORAGE_KEY = 'cgguru_lecture_watch_history';
const PINNED_STORAGE_PREFIX = 'cgguru_pinned_lectures_';

const formatSeconds = (sec: number): string => {
  if (!sec || isNaN(sec)) return '0:00';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
};

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
  
  // Pinning & Topic-scoped Resume states
  const [pinnedVideoIds, setPinnedVideoIds] = useState<string[]>([]);
  const [topicWatchHistory, setTopicWatchHistory] = useState<Record<string, VideoProgress>>({});
  
  // Initial seek position - only set once when selecting a video to prevent iframe reloads/blinking!
  const [videoInitialStartTime, setVideoInitialStartTime] = useState<number>(0);
  const [startAtBeginning, setStartAtBeginning] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastSavedSecRef = useRef<number>(0);
  const topicKey = (topicName || topicNameHi || 'default').trim().toLowerCase();

  // Helper to get full API URL
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

  // Helper: Read topic-specific watch history from localStorage
  const getStoredTopicProgress = (topic: string): Record<string, VideoProgress> => {
    try {
      const raw = localStorage.getItem(WATCH_HISTORY_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (parsed && parsed[topic] && typeof parsed[topic] === 'object') {
        return parsed[topic];
      }
      return {};
    } catch {
      return {};
    }
  };

  // Helper: Save progress scoped to topic and video
  const saveTopicProgress = (
    topic: string, 
    videoId: string, 
    currentTime: number, 
    duration: number
  ): VideoProgress | null => {
    if (!videoId || currentTime <= 2) return null;
    const currentSec = Math.floor(currentTime);

    try {
      const raw = localStorage.getItem(WATCH_HISTORY_STORAGE_KEY);
      const all = raw ? JSON.parse(raw) : {};

      if (!all[topic] || typeof all[topic] !== 'object') {
        all[topic] = {};
      }

      const dur = duration > 0 ? duration : (all[topic][videoId]?.duration || 0);
      const percentage = dur > 0 ? Math.min(100, Math.round((currentSec / dur) * 100)) : 0;

      const entry: VideoProgress = {
        currentTime: currentSec,
        duration: Math.floor(dur),
        percentage,
        lastWatched: Date.now()
      };

      all[topic][videoId] = entry;
      localStorage.setItem(WATCH_HISTORY_STORAGE_KEY, JSON.stringify(all));
      return entry;
    } catch (e) {
      return null;
    }
  };

  // Select video handler: loads start time specifically for the selected topic
  const selectVideo = (video: LectureVideo, forceStartZero: boolean = false) => {
    setSelectedVideo(video);
    setStartAtBeginning(forceStartZero);
    lastSavedSecRef.current = 0;

    if (forceStartZero) {
      setVideoInitialStartTime(0);
    } else {
      let savedSec = 0;
      try {
        const historyForTopic = getStoredTopicProgress(topicKey);
        const record = historyForTopic[video.videoId];
        if (record && record.currentTime > 5 && record.percentage < 95) {
          savedSec = record.currentTime;
        }
      } catch {}
      setVideoInitialStartTime(savedSec);
    }
  };

  // Load pinned videos & topic-specific watch history from localStorage
  const loadStoredData = () => {
    try {
      const savedPins = localStorage.getItem(`${PINNED_STORAGE_PREFIX}${topicKey}`);
      if (savedPins) {
        setPinnedVideoIds(JSON.parse(savedPins));
      } else {
        setPinnedVideoIds([]);
      }
    } catch {
      setPinnedVideoIds([]);
    }

    // Load progress for this topic only
    const topicData = getStoredTopicProgress(topicKey);
    setTopicWatchHistory(topicData);
  };

  // Toggle pin video
  const togglePin = (video: LectureVideo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPinnedVideoIds(prev => {
      const exists = prev.includes(video.videoId);
      const updated = exists 
        ? prev.filter(id => id !== video.videoId)
        : [video.videoId, ...prev]; // Add newly pinned to top
      
      try {
        localStorage.setItem(`${PINNED_STORAGE_PREFIX}${topicKey}`, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save pinned lecture', err);
      }
      return updated;
    });
  };

  const isVideoPinned = (videoId: string) => pinnedVideoIds.includes(videoId);

  // Update watch history progress scoped to current topic (throttled to at least 4s)
  const saveProgress = (videoId: string, currentTime: number, duration: number) => {
    if (!videoId || currentTime <= 2) return;
    const currentSec = Math.floor(currentTime);

    // Throttle: avoid saving if less than 4 seconds elapsed
    if (Math.abs(currentSec - lastSavedSecRef.current) < 4) return;
    lastSavedSecRef.current = currentSec;
    
    const entry = saveTopicProgress(topicKey, videoId, currentSec, duration);
    if (entry) {
      setTopicWatchHistory(prev => ({ ...prev, [videoId]: entry }));
    }
  };

  // PostMessage listener to track YouTube playback time
  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      try {
        if (!event.data) return;
        let data: any = event.data;
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch {
            return;
          }
        }
        // YouTube iframe with enablejsapi=1 delivers infoDelivery
        if (data && data.event === 'infoDelivery' && data.info && selectedVideo) {
          const info = data.info;
          if (typeof info.currentTime === 'number') {
            saveProgress(selectedVideo.videoId, info.currentTime, info.duration || 0);
          }
        }
      } catch (err) {}
    };

    window.addEventListener('message', handleWindowMessage);
    return () => {
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [selectedVideo, topicKey]);

  // Periodic poll to request currentTime from YouTube iframe
  useEffect(() => {
    if (!selectedVideo) return;
    
    const sendListeningCmd = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'listening' }),
            '*'
          );
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'getCurrentTime', args: '' }),
            '*'
          );
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'getDuration', args: '' }),
            '*'
          );
        } catch (e) {}
      }
    };

    const interval = setInterval(sendListeningCmd, 3500);
    return () => clearInterval(interval);
  }, [selectedVideo]);

  // Fetch lectures
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

        // Auto-select pinned video first, or first lecture if none selected
        if (!selectedVideo) {
          let currentPins: string[] = [];
          try {
            const raw = localStorage.getItem(`${PINNED_STORAGE_PREFIX}${topicKey}`);
            if (raw) currentPins = JSON.parse(raw);
          } catch {}

          const pinned = data.lectures.find((v: LectureVideo) => currentPins.includes(v.videoId));
          selectVideo(pinned || data.lectures[0]);
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
      setStartAtBeginning(false);
      setVideoInitialStartTime(0);
      loadStoredData();
      fetchLectures();
    }
  }, [isOpen, topicName]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSearch.trim()) {
      fetchLectures(customSearch.trim());
    }
  };

  // Sort lectures: Pinned videos always appear first!
  const sortedLectures = useMemo(() => {
    if (!lectures || lectures.length === 0) return [];
    const pinned = lectures.filter(l => pinnedVideoIds.includes(l.videoId));
    const unpinned = lectures.filter(l => !pinnedVideoIds.includes(l.videoId));
    return [...pinned, ...unpinned];
  }, [lectures, pinnedVideoIds]);

  if (!isOpen) return null;

  // The embed URL is computed from videoInitialStartTime (fixed per play session, stable during playback)
  const embedUrl = selectedVideo 
    ? `https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?autoplay=1&enablejsapi=1&rel=0&playsinline=1${videoInitialStartTime > 0 ? `&start=${videoInitialStartTime}` : ''}`
    : '';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-2 md:p-3 bg-black/90 backdrop-blur-md animate-fade-in">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="bg-bg-s2 border-0 sm:border sm:border-border rounded-none sm:rounded-2xl w-full max-w-[98vw] 2xl:max-w-[1700px] h-[100dvh] sm:h-[96vh] max-h-[100dvh] sm:max-h-[96vh] flex flex-col shadow-2xl overflow-hidden font-sans"
        >
          {/* Header Bar */}
          <div className="px-3 py-2 sm:px-6 sm:py-3.5 bg-bg-s3 border-b border-border flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-xs sm:text-sm font-black text-text truncate leading-tight">
                  {topicNameHi || topicName}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-text-muted mt-0.5">
                  <span className="text-saffron font-bold truncate max-w-[120px] sm:max-w-none">
                    {subjectName || 'Study Topic'}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-[9px] bg-red-600/15 text-red-500 border border-red-600/25 px-1.5 py-0.2 rounded font-black uppercase shrink-0">
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
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-black uppercase cursor-pointer transition-all ${
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
                className="p-1.5 sm:p-2 bg-bg-s2 hover:bg-red-500/20 border border-border hover:border-red-500/40 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-colors"
                title="Close Window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Layout: Video Player (Top on mobile, Left on desktop) + Playlist (Bottom on mobile, Right on desktop) */}
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden bg-bg-s1">
            
            {/* Player Stage: Fixed natural height on mobile (shrink-0), flexible on desktop (lg:flex-1) */}
            <div className="shrink-0 lg:flex-1 lg:min-w-0 flex flex-col bg-[#0c0d12] border-b lg:border-b-0 lg:border-r border-border/80">
              <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden">
                {selectedVideo ? (
                  <iframe
                    ref={iframeRef}
                    key={`${selectedVideo.videoId}_${videoInitialStartTime}`}
                    src={embedUrl}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                    onLoad={() => {
                      if (iframeRef.current && iframeRef.current.contentWindow) {
                        try {
                          iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*');
                        } catch (e) {}
                      }
                    }}
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
                <div className="p-2.5 sm:p-4 flex flex-col gap-1.5 bg-bg-s2 border-t border-border/60 shrink-0">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-xs sm:text-sm font-black text-text leading-snug line-clamp-2 select-text flex-1">
                      {selectedVideo.title}
                    </h2>

                    {/* Pin/Unpin Button in Active Player */}
                    <button
                      type="button"
                      onClick={(e) => togglePin(selectedVideo, e)}
                      className={`shrink-0 p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                        isVideoPinned(selectedVideo.videoId)
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
                          : 'bg-bg-s3 border-border text-text-muted hover:text-amber-400 hover:border-amber-500/40'
                      }`}
                      title={isVideoPinned(selectedVideo.videoId) ? 'Unpin from top' : 'Pin to top of playlist'}
                    >
                      <Pin className={`w-4 h-4 ${isVideoPinned(selectedVideo.videoId) ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/40 text-xs">
                    <div className="flex items-center gap-2.5 text-text-muted text-[11px] sm:text-xs">
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

                    <div className="flex items-center gap-2">
                      {/* Resume / Restart Option if video has saved position in this topic */}
                      {videoInitialStartTime > 0 && !startAtBeginning && (
                        <button
                          type="button"
                          onClick={() => selectVideo(selectedVideo, true)}
                          className="text-[10px] sm:text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/25"
                          title="Start playback from 0:00"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Start from 0:00</span>
                        </button>
                      )}

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
                </div>
              )}
            </div>

            {/* Right/Bottom: Search & Video Playlist */}
            <div className="flex-1 min-h-0 w-full lg:w-96 xl:w-[420px] lg:flex-none lg:shrink-0 flex flex-col bg-bg-s2 overflow-hidden">
              
              {/* Search Within Topic */}
              <div className="p-2 sm:p-3 border-b border-border bg-bg-s3/70 shrink-0">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search lecture keyword..."
                      value={customSearch}
                      onChange={(e) => setCustomSearch(e.target.value)}
                      className="w-full bg-bg-s2 text-xs text-text placeholder:text-text-muted border border-border focus:border-saffron px-3 py-1.5 pl-8 rounded-lg outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="button"
                    onClick={() => fetchLectures()}
                    disabled={loading}
                    className="p-1.5 sm:p-2 bg-bg-s2 hover:bg-bg-s3 border border-border text-text-muted hover:text-saffron rounded-lg cursor-pointer disabled:opacity-40"
                    title="Refresh Videos"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </form>
              </div>

              {/* Playlist Header */}
              <div className="px-3.5 py-1.5 sm:py-2 bg-bg-s3/40 border-b border-border flex items-center justify-between text-[11px] font-bold text-text-muted shrink-0">
                <span>Recommended Classes ({lectures.length})</span>
                <span className="text-[9px] text-saffron uppercase font-black">Top Rated</span>
              </div>

              {/* Video List: Scrollable container with touch support */}
              <div 
                className="flex-1 min-h-0 overflow-y-auto p-2 sm:p-3 flex flex-col gap-2 touch-pan-y overscroll-contain"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
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
                  sortedLectures.map((video) => {
                    const isPlaying = selectedVideo?.videoId === video.videoId;
                    const pinned = isVideoPinned(video.videoId);
                    // Progress is scoped strictly to the current topic!
                    const progress = topicWatchHistory[video.videoId];

                    return (
                      <div
                        key={video.videoId}
                        onClick={() => selectVideo(video, false)}
                        className={`p-2.5 rounded-xl border flex gap-3 cursor-pointer transition-all ${
                          isPlaying
                            ? 'bg-saffron/10 border-saffron shadow-sm ring-1 ring-saffron/40'
                            : pinned
                              ? 'bg-amber-500/5 border-amber-500/30 hover:bg-amber-500/10'
                              : 'bg-bg-s3/50 border-border/80 hover:bg-bg-s3 hover:border-border'
                        }`}
                      >
                        {/* Thumbnail with duration & topic watch progress */}
                        <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-black shrink-0 border border-border/60">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {video.duration && (
                            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded z-10">
                              {video.duration}
                            </span>
                          )}
                          {isPlaying && (
                            <div className="absolute inset-0 bg-saffron/30 flex items-center justify-center z-10">
                              <Play className="w-5 h-5 text-saffron fill-saffron" />
                            </div>
                          )}
                          {/* Watch Progress Bar for this topic */}
                          {progress && progress.percentage > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/70 overflow-hidden z-20">
                              <div
                                className={`h-full ${progress.percentage >= 95 ? 'bg-greenL' : 'bg-red-500'}`}
                                style={{ width: `${progress.percentage}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Video Info */}
                        <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                          <div className="flex items-start justify-between gap-1.5">
                            <h4 className={`text-[11px] font-bold leading-snug line-clamp-2 ${isPlaying ? 'text-saffron' : 'text-text'}`}>
                              {video.title}
                            </h4>
                            {/* Pin / Unpin Button on Card */}
                            <button
                              type="button"
                              onClick={(e) => togglePin(video, e)}
                              className={`p-1 rounded-md transition-colors shrink-0 cursor-pointer ${
                                pinned
                                  ? 'text-amber-400 bg-amber-500/15 hover:bg-amber-500/25'
                                  : 'text-text-muted hover:text-amber-400 hover:bg-amber-500/10'
                              }`}
                              title={pinned ? 'Unpin video' : 'Pin to top'}
                            >
                              <Pin className={`w-3.5 h-3.5 ${pinned ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>
                          </div>

                          <div className="flex flex-col gap-0.5 mt-1">
                            <span className="text-[10px] text-text-muted truncate font-medium">
                              {video.author}
                            </span>

                            <div className="flex items-center justify-between text-[9px] text-text-muted">
                              <div className="flex items-center gap-1.5">
                                {video.views && <span>{video.views} views</span>}
                                {video.ago && (
                                  <>
                                    <span>•</span>
                                    <span>{video.ago}</span>
                                  </>
                                )}
                              </div>

                              {/* Resume timestamp badge for this topic */}
                              {progress && progress.currentTime > 5 && progress.percentage < 95 && (
                                <span className="text-amber-400 font-bold flex items-center gap-0.5 text-[9px] bg-amber-400/10 px-1 py-0.2 rounded border border-amber-400/20">
                                  <RotateCcw className="w-2.5 h-2.5" />
                                  Resume {formatSeconds(progress.currentTime)}
                                </span>
                              )}
                              {progress && progress.percentage >= 95 && (
                                <span className="text-greenL font-bold flex items-center gap-0.5 text-[9px] bg-greenL/10 px-1 py-0.2 rounded border border-greenL/20">
                                  <CheckCircle className="w-2.5 h-2.5" />
                                  Watched
                                </span>
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
