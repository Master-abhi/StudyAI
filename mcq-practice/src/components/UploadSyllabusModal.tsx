import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Sparkles, AlertCircle } from 'lucide-react';

interface UploadSyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (customSyllabus: any) => void;
}

export const UploadSyllabusModal: React.FC<UploadSyllabusModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess
}) => {
  const [syllabusName, setSyllabusName] = useState<string>('');
  const [pastedText, setPastedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedText = pastedText.trim();
    const trimmedName = syllabusName.trim();

    if (!trimmedText || !trimmedName) {
      setError('Please provide a name and paste the syllabus text contents');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(getApiUrl('/api/parse-syllabus'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syllabusName: trimmedName,
          syllabusText: trimmedText
        })
      });

      if (!res.ok) throw new Error('Failed to parse syllabus with AI');
      const data = await res.json();
      
      if (data && data.syllabus) {
        onUploadSuccess(data.syllabus);
        alert('Custom syllabus parsed and loaded successfully! 🎉');
        onClose();
      } else {
        throw new Error('Invalid parser response');
      }

    } catch (err) {
      console.error(err);
      setError('AI parser failed to extract subjects/chapters. Try pasting a cleaner list.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl p-5 flex flex-col gap-4 max-h-[90vh] overflow-y-auto font-sans"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-border pb-2.5">
          <h3 className="text-sm font-black uppercase text-text flex items-center gap-1.5">
            <UploadCloud className="w-4.5 h-4.5 text-saffron" />
            <span>Upload Custom Syllabus</span>
          </h3>
          <button
            onClick={onClose}
            className="text-xs text-text-muted hover:text-text cursor-pointer"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-redL rounded-lg text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {/* Syllabus name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black uppercase text-text-muted">Syllabus / Exam Title</label>
            <input
              type="text"
              placeholder="e.g. Hostels Warden Exam, CG SI Mains"
              value={syllabusName}
              onChange={(e) => setSyllabusName(e.target.value)}
              required
              disabled={loading}
              className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3.5 py-2.5 rounded-lg outline-none transition-colors"
            />
          </div>

          {/* Paste syllabus text */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black uppercase text-text-muted">Paste Syllabus Description Text</label>
            <textarea
              placeholder="Paste the chapters list, topics description, or exam details here..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              required
              rows={8}
              disabled={loading}
              className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron p-3.5 rounded-lg outline-none resize-none transition-colors leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-saffron hover:bg-orange-500 disabled:opacity-50 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>{loading ? 'AI Parsing Syllabus...' : 'Parse Syllabus with AI'}</span>
          </button>
        </form>

        <div className="text-[10px] text-text-muted leading-relaxed text-center font-medium">
          Our LLM model will automatically structure the pasted text into subjects, chapters, and topics, allowing you to track progress immediately!
        </div>
      </motion.div>
    </div>
  );
};
