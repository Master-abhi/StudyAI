import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Loader2, FileText, CheckCircle, 
  Lock, Maximize2, Minimize2, ExternalLink 
} from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  title: string;
  fileName?: string;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  fileName,
  onMarkComplete,
  isCompleted
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewerMode, setViewerMode] = useState<'google' | 'direct'>('google');

  if (!isOpen || !pdfUrl) return null;

  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  const activeUrl = viewerMode === 'google' 
    ? googleDocsViewerUrl 
    : `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`;

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-1 sm:p-3 bg-black/90 backdrop-blur-md animate-fade-in select-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className={`bg-bg-s2 border border-border flex flex-col shadow-2xl overflow-hidden font-sans transition-all duration-200 ${
            isFullscreen 
              ? 'fixed inset-0 rounded-none w-screen h-screen z-[10000]' 
              : 'rounded-2xl w-full max-w-[98vw] 2xl:max-w-[1700px] h-[96vh] max-h-[96vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="px-3 py-2.5 sm:px-6 sm:py-3 bg-bg-s3 border-b border-border flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-saffron/15 border border-saffron-border/30 flex items-center justify-center text-saffron shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-xs sm:text-sm font-black text-text truncate leading-tight" title={title}>
                  {title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-text-muted mt-0.5">
                  <span className="truncate max-w-[180px] text-saffron font-bold">{fileName || 'Study Notes.pdf'}</span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9px] bg-amber-500/15 text-amber-500 border border-amber-500/30 px-1.5 py-0.2 rounded font-black uppercase">
                    <Lock className="w-2.5 h-2.5" />
                    In-App Protected View
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Viewer Engine Toggle */}
              <div className="hidden sm:flex items-center bg-bg-s2 border border-border rounded-lg p-0.5 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    setViewerMode('google');
                  }}
                  className={`px-2 py-1 rounded transition-colors ${
                    viewerMode === 'google' 
                      ? 'bg-saffron text-bg-s1 font-black shadow-sm' 
                      : 'text-text-muted hover:text-text'
                  }`}
                  title="Universal Cloud PDF Viewer (Recommended for mobile and high compatibility)"
                >
                  Cloud Viewer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    setViewerMode('direct');
                  }}
                  className={`px-2 py-1 rounded transition-colors ${
                    viewerMode === 'direct' 
                      ? 'bg-saffron text-bg-s1 font-black shadow-sm' 
                      : 'text-text-muted hover:text-text'
                  }`}
                  title="Direct Browser Native PDF Viewer"
                >
                  Direct View
                </button>
              </div>

              {/* Open in Browser Tab (Safe Fallback) */}
              <button
                type="button"
                onClick={handleOpenInNewTab}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-bg-s2 hover:bg-bg-s1 border border-border text-text-muted hover:text-saffron rounded-lg text-xs font-bold transition-colors cursor-pointer"
                title="Open PDF directly in browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Open in Tab</span>
              </button>

              {onMarkComplete && (
                <button
                  type="button"
                  onClick={onMarkComplete}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black uppercase cursor-pointer transition-all ${
                    isCompleted 
                      ? 'bg-greenL/20 border-greenL/40 text-greenL' 
                      : 'bg-saffron text-bg-s1 font-black shadow-sm'
                  }`}
                  title="Mark topic notes as completed"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-bg-s2 hover:bg-bg-s1 border border-border text-text-muted hover:text-saffron rounded-lg cursor-pointer transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Maximize Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 bg-bg-s2 hover:bg-red-500/20 border border-border hover:border-red-500/40 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-colors"
                title="Close Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Troubleshooting Tip Strip */}
          <div className="px-3 py-1 bg-bg-s3/90 border-b border-border/50 text-[10px] text-text-muted flex items-center justify-between gap-2">
            <span>
              💡 PDF लोड न होने पर ऊपर <strong>Open in Tab ↗</strong> दबाएं या Viewer बदलें।
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setLoading(true);
                  setViewerMode(prev => prev === 'google' ? 'direct' : 'google');
                }}
                className="text-saffron underline hover:text-orange-400 cursor-pointer text-[10px]"
              >
                {viewerMode === 'google' ? 'Switch to Direct Viewer' : 'Switch to Cloud Viewer'}
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div 
            className="flex-1 w-full h-full bg-[#0f172a] relative overflow-hidden flex items-center justify-center select-none"
            onContextMenu={(e) => e.preventDefault()}
          >
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0f172a] z-10 text-text-muted">
                <Loader2 className="w-8 h-8 animate-spin text-saffron" />
                <span className="text-xs font-bold uppercase tracking-wider text-saffron">
                  Loading {viewerMode === 'google' ? 'Cloud PDF Viewer' : 'Protected PDF'}...
                </span>
                <span className="text-[10px] text-text-muted">High-Security In-App Reader</span>
              </div>
            )}

            {/* Embedded PDF iframe */}
            <iframe
              key={`${viewerMode}_${pdfUrl}`}
              src={activeUrl}
              title={title}
              onLoad={() => setLoading(false)}
              className="w-full h-full border-0 pointer-events-auto bg-white"
            />
          </div>

          {/* Footer Mobile Controls */}
          {onMarkComplete && (
            <div className="sm:hidden px-4 py-2 bg-bg-s3 border-t border-border flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={handleOpenInNewTab}
                className="flex items-center gap-1 text-[11px] font-bold text-saffron py-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab ↗</span>
              </button>
              <button
                type="button"
                onClick={onMarkComplete}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-black uppercase cursor-pointer ${
                  isCompleted 
                    ? 'bg-greenL/20 border-greenL/40 text-greenL' 
                    : 'bg-saffron text-bg-s1 font-black'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{isCompleted ? 'Marked as Done' : 'Mark as Read'}</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
