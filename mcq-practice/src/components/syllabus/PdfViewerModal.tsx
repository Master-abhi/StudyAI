import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, FileText, CheckCircle, Lock, Maximize2, Minimize2 } from 'lucide-react';

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

  if (!isOpen || !pdfUrl) return null;

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
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-bg-s3 border-b border-border flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-saffron/15 border border-saffron-border/30 flex items-center justify-center text-saffron shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-xs sm:text-sm font-black text-text truncate leading-tight" title={title}>
                  {title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-text-muted mt-0.5">
                  <span className="truncate max-w-[200px] text-saffron font-bold">{fileName || 'Study Notes.pdf'}</span>
                  <span className="inline-flex items-center gap-1 text-[9px] bg-amber-500/15 text-amber-500 border border-amber-500/30 px-1.5 py-0.2 rounded font-black uppercase">
                    <Lock className="w-2.5 h-2.5" />
                    In-App Protected View
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {onMarkComplete && (
                <button
                  type="button"
                  onClick={onMarkComplete}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black uppercase cursor-pointer transition-all ${
                    isCompleted 
                      ? 'bg-greenL/20 border-greenL/40 text-greenL' 
                      : 'bg-bg-s2 border-border text-text-muted hover:text-text hover:border-saffron'
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

          {/* PDF Viewer Body with In-App Security Protections */}
          <div 
            className="flex-1 w-full h-full bg-[#1e1e1e] relative overflow-hidden flex items-center justify-center select-none"
            onContextMenu={(e) => e.preventDefault()}
          >
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#12141A] z-10 text-text-muted">
                <Loader2 className="w-8 h-8 animate-spin text-saffron" />
                <span className="text-xs font-bold uppercase tracking-wider text-saffron">Loading Protected PDF...</span>
                <span className="text-[10px] text-text-muted">Secure In-App Reader (Download Restricted)</span>
              </div>
            )}

            {/* Embedded PDF iframe with download & print toolbar disabled */}
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              title={title}
              onLoad={() => setLoading(false)}
              className="w-full h-full border-0 pointer-events-auto"
            />
          </div>

          {/* Footer Mobile Controls */}
          {onMarkComplete && (
            <div className="sm:hidden px-4 py-2.5 bg-bg-s3 border-t border-border flex items-center justify-between shrink-0">
              <span className="text-[10px] text-text-muted">Tap when finished reading:</span>
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
