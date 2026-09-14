import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  X, BookOpen, CheckCircle2, 
  Sparkles, FileText, Check, Copy, 
  Layers, Lightbulb, Bookmark, Sun, Moon,
  Save, Menu, ChevronLeft, ChevronRight
} from 'lucide-react';
import type { Topic } from './syllabusData';

// Helper to clean raw HTML tags (<ul>, <li>, <b>, <p>, etc.) into clean markdown bullets and text
export function formatNotesContent(content: any): string {
  if (typeof content !== 'string') return content || '';
  let str = content;

  // If there are no HTML tags, return as-is
  if (!/<[a-z][\s\S]*>/i.test(str)) {
    return str;
  }

  // First convert <li>Title: text</li> or <li><b>Title:</b> text</li> into markdown bullet
  str = str.replace(/<li[^>]*>\s*<strong>([^<]+)<\/strong>\s*:?\s*([\s\S]*?)<\/li>/gi, '\n- **$1:** $2');
  str = str.replace(/<li[^>]*>\s*<b>([^<]+)<\/b>\s*:?\s*([\s\S]*?)<\/li>/gi, '\n- **$1:** $2');
  str = str.replace(/<li[^>]*>\s*([^:<]+?)\s*:\s*([\s\S]*?)<\/li>/gi, '\n- **$1:** $2');
  str = str.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');

  // Replace bold & italic tags
  str = str.replace(/<\/?(b|strong)[^>]*>/gi, '**');
  str = str.replace(/<\/?(i|em)[^>]*>/gi, '*');

  // Line breaks and paragraphs
  str = str.replace(/<br\s*\/?>/gi, '\n');
  str = str.replace(/<p[^>]*>/gi, '\n\n');
  str = str.replace(/<\/p>/gi, '\n');

  // Remove list wrappers
  str = str.replace(/<\/?(ul|ol|span|div)[^>]*>/gi, '\n');

  // Strip any other lingering HTML tags
  str = str.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  str = str
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Normalize excessive newlines
  str = str.replace(/\n{3,}/g, '\n\n').trim();
  return str;
}

// Helper to normalize notes object and unpack any sanitized Firestore table rows
function normalizeNotes(val: any): any {
  if (!val) return val;
  if (typeof val === 'string') {
    return val;
  }
  if (Array.isArray(val)) {
    return val.map(item => {
      if (item && typeof item === 'object' && item.__isRow === true && Array.isArray(item.cells)) {
        return item.cells;
      }
      return normalizeNotes(item);
    });
  }
  if (typeof val === 'object') {
    if (val.__isRow === true && Array.isArray(val.cells)) {
      return val.cells;
    }
    const res: any = {};
    for (const [k, v] of Object.entries(val)) {
      if (k === 'content' && typeof v === 'string') {
        res[k] = formatNotesContent(v);
      } else {
        res[k] = normalizeNotes(v);
      }
    }
    return res;
  }
  return val;
}

// Safely extract string array from row (handles string[], { cells: [...] }, or object)
function getRowCells(row: any): string[] {
  if (!row) return [];
  if (Array.isArray(row)) return row;
  if (typeof row === 'object' && Array.isArray(row.cells)) return row.cells;
  if (typeof row === 'object' && row.__isRow && Array.isArray(row.cells)) return row.cells;
  return [String(row)];
}

export interface TopicNotesReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic | null;
  subjectName?: string;
  examName?: string;
  examId?: string;
  getApiUrl?: (path: string) => string;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
  onOpenPdf?: (topic: Topic) => void;
}

export const TopicNotesReaderModal: React.FC<TopicNotesReaderModalProps> = ({
  isOpen,
  onClose,
  topic,
  subjectName = 'सामान्य अध्ययन',
  examName = 'CGPSC / CG Vyapam',
  examId,
  getApiUrl = (p: string) => p,
  onMarkComplete,
  isCompleted = false,
  onOpenPdf
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'tables' | 'revision' | 'mcqs'>('theory');
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<number, boolean>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [readingTheme, setReadingTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedNotes, setLoadedNotes] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({});
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Fetch notes if not already loaded in topic.studyNotes
  useEffect(() => {
    if (!isOpen || !topic) return;

    if (topic.studyNotes) {
      setLoadedNotes(normalizeNotes(topic.studyNotes));
      return;
    }

    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(getApiUrl(`/api/syllabus/topic-notes?topicId=${encodeURIComponent(topic.id)}${examId ? `&examId=${encodeURIComponent(examId)}` : ''}`));
        const data = await res.json();
        if (res.ok && data.studyNotes) {
          setLoadedNotes(normalizeNotes(data.studyNotes));
        } else {
          setError(data.error || 'No formatted study notes found for this topic.');
        }
      } catch (err: any) {
        console.error('[Fetch Notes Error]:', err);
        setError(err.message || 'Could not load formatted study notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [isOpen, topic, examId]);

  if (!isOpen || !topic) return null;

  const notes = normalizeNotes(loadedNotes || topic.studyNotes);

  const handleSelectOption = (qIdx: number, optionLetter: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optionLetter }));
    setRevealedExplanations(prev => ({ ...prev, [qIdx]: true }));
  };

  const copyRevisionPoint = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePrint = () => {
    if (!printAreaRef.current) return;
    const content = printAreaRef.current.innerHTML;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="hi">
        <head>
          <meta charset="utf-8">
          <title>${topic.nameHi || topic.name} - CG GURU Study Notes</title>
          <style>
            @page {
              size: A4;
              margin: 12mm 15mm;
            }
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              color: #1E293B;
              background: #FFFFFF;
              line-height: 1.6;
              font-size: 10pt;
              margin: 0;
              padding: 0;
            }
            h1, h2, h3, h4 {
              color: #0F172A;
              margin-top: 1em;
              margin-bottom: 0.4em;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 10px 0;
            }
            th, td {
              border: 1px solid #CBD5E1;
              padding: 6px 10px;
              font-size: 9pt;
            }
            th {
              background-color: #1E3A8A;
              color: #FFFFFF;
            }
            .avoid-break {
              page-break-inside: avoid;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 300);
  };

  const getThemeClass = () => {
    switch (readingTheme) {
      case 'dark':
        return 'bg-[#0B0F19] text-[#E2E8F0]';
      case 'sepia':
        return 'bg-[#FDF6E3] text-[#3F3325]';
      case 'light':
      default:
        return 'bg-[#F8FAFC] text-[#0F172A]';
    }
  };

  const getCardBgClass = () => {
    switch (readingTheme) {
      case 'dark':
        return 'bg-[#151D2E] border-[#2A364F] text-[#E2E8F0] shadow-md';
      case 'sepia':
        return 'bg-[#F5EAD4] border-[#DECBB0] text-[#3F3325] shadow-xs';
      case 'light':
      default:
        return 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0F172A] shadow-sm';
    }
  };

  const getHeaderBgClass = () => {
    switch (readingTheme) {
      case 'dark':
        return 'bg-[#111827] border-[#1F2937]';
      case 'sepia':
        return 'bg-[#EEDBB8] border-[#DECBB0]';
      case 'light':
      default:
        return 'bg-[#FFFFFF] border-[#E2E8F0]';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-xs sm:text-sm leading-relaxed';
      case 'lg':
        return 'text-base sm:text-lg leading-loose';
      case 'base':
      default:
        return 'text-sm sm:text-base leading-relaxed';
    }
  };

  const renderCardText = (text: string) => {
    if (!text) return null;
    const cleaned = text
      .trim()
      .replace(/^[💡⭐🧠📌🔍•-]\s*/, '')
      .replace(/^["'“]([\*\_]{2}[^*_]+?[\*\_]{2}[:\s]*?)["'”]/g, '$1')
      .replace(/(^|\s)["'“]([\*\_]{2}[^*_]+?[\*\_]{2}[:\s]*?)["'”]/g, '$1$2');
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <span className="leading-relaxed font-medium">{children}</span>,
          strong: ({ children }) => <strong className="font-black text-inherit">{children}</strong>
        }}
      >
        {cleaned}
      </ReactMarkdown>
    );
  };

  const allTables: any[] = [];
  if (notes) {
    if (Array.isArray(notes.tables)) allTables.push(...notes.tables);
    if (Array.isArray(notes.chapters)) {
      notes.chapters.forEach((ch: any) => {
        if (Array.isArray(ch.tables)) allTables.push(...ch.tables);
      });
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-black/85 animate-fade-in select-none">
      <div className={`w-full h-full flex flex-col overflow-hidden font-sans transition-colors duration-200 ${getThemeClass()}`}>
        
        {/* Top Header Bar */}
        <div className={`px-3 sm:px-6 py-2.5 sm:py-3 border-b flex items-center justify-between gap-2 sm:gap-3 shrink-0 ${getHeaderBgClass()}`}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Sidebar Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
                isSidebarOpen 
                  ? 'bg-saffron/15 text-saffron border-saffron/40' 
                  : readingTheme === 'dark' 
                    ? 'bg-[#1E293B] border-[#334155] text-slate-300' 
                    : readingTheme === 'sepia' 
                      ? 'bg-[#E5D2B1] border-[#DECBB0] text-[#3F3325]' 
                      : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title={isSidebarOpen ? "Hide Index Sidebar" : "Show Index Sidebar"}
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="w-9 h-9 rounded-xl bg-saffron/15 text-saffron border border-saffron/30 flex items-center justify-center shrink-0 shadow-sm hidden sm:flex">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-saffron bg-saffron/10 px-2 py-0.5 rounded border border-saffron/20">
                  {subjectName}
                </span>
                <span className={`text-[10px] font-medium hidden sm:inline ${readingTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {examName}
                </span>
              </div>
              <h2 className="text-sm sm:text-base md:text-lg font-black truncate leading-tight mt-0.5">
                {topic.nameHi || topic.name}
              </h2>
            </div>
          </div>

          {/* Controls: Font Size, Theme, Save, Complete, Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Font Size Adjust */}
            <div className={`hidden sm:flex items-center border rounded-lg p-0.5 text-xs font-bold ${
              readingTheme === 'dark' ? 'bg-[#1E293B] border-[#334155]' : readingTheme === 'sepia' ? 'bg-[#E5D2B1] border-[#C9B38F]' : 'bg-[#F1F5F9] border-[#E2E8F0]'
            }`}>
              <button 
                onClick={() => setFontSize('sm')} 
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'sm' ? 'bg-saffron text-white font-black shadow-xs' : 'opacity-70 hover:opacity-100'}`}
                title="Small Font"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('base')} 
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'base' ? 'bg-saffron text-white font-black shadow-xs' : 'opacity-70 hover:opacity-100'}`}
                title="Default Font"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('lg')} 
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'lg' ? 'bg-saffron text-white font-black shadow-xs' : 'opacity-70 hover:opacity-100'}`}
                title="Large Font"
              >
                A+
              </button>
            </div>

            {/* Reading Mode / Theme Toggle */}
            <div className={`flex items-center border rounded-lg p-0.5 text-xs ${
              readingTheme === 'dark' ? 'bg-[#1E293B] border-[#334155]' : readingTheme === 'sepia' ? 'bg-[#E5D2B1] border-[#C9B38F]' : 'bg-[#F1F5F9] border-[#E2E8F0]'
            }`}>
              <button
                onClick={() => setReadingTheme('light')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${readingTheme === 'light' ? 'bg-white text-saffron shadow-xs' : 'opacity-70 hover:opacity-100'}`}
                title="Light Mode (Default)"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReadingTheme('sepia')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${readingTheme === 'sepia' ? 'bg-[#D6C19D] text-[#3F3325] shadow-xs' : 'opacity-70 hover:opacity-100'}`}
                title="Warm Sepia Mode"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReadingTheme('dark')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${readingTheme === 'dark' ? 'bg-[#0F172A] text-amber-400 shadow-xs' : 'opacity-70 hover:opacity-100'}`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Save Notes Button (Replaces Print) */}
            <button
              onClick={handlePrint}
              disabled={!notes}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                readingTheme === 'dark' 
                  ? 'bg-[#1E293B] border-[#334155] text-slate-200 hover:text-white hover:bg-[#283548]' 
                  : readingTheme === 'sepia' 
                    ? 'bg-[#E5D2B1] border-[#C9B38F] text-[#3F3325] hover:bg-[#D9C4A1]' 
                    : 'bg-[#F1F5F9] border-[#E2E8F0] text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Save Notes as PDF"
            >
              <Save className="w-3.5 h-3.5 text-saffron" />
              <span className="hidden xs:inline sm:inline">Save</span>
            </button>

            {/* Mark as Studied Button */}
            {onMarkComplete && (
              <button
                onClick={onMarkComplete}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCompleted 
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                    : 'bg-saffron text-white hover:bg-orange-600 font-black shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isCompleted ? 'Completed' : 'Mark Done'}</span>
              </button>
            )}

            {/* Close Modal */}
            <button
              onClick={onClose}
              className={`p-2 rounded-lg border transition-all cursor-pointer ml-0.5 sm:ml-1 ${
                readingTheme === 'dark' 
                  ? 'bg-[#1E293B] border-[#334155] text-slate-300 hover:text-white hover:bg-[#283548]' 
                  : readingTheme === 'sepia' 
                    ? 'bg-[#E5D2B1] border-[#C9B38F] text-[#3F3325] hover:bg-[#D9C4A1]' 
                    : 'bg-[#F1F5F9] border-[#E2E8F0] text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Body Area: Sidebar + Reading Scroll Area */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Mobile backdrop for sidebar */}
          {isSidebarOpen && (
            <div 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 bg-black/50 z-30 sm:hidden"
            />
          )}

          {/* Left Sidebar for Tabs and Chapters */}
          {notes && (
            <aside className={`${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:hidden'
            } fixed sm:static inset-y-0 left-0 z-40 sm:z-auto w-72 sm:w-64 md:w-72 shrink-0 border-r flex flex-col h-full overflow-hidden transition-transform duration-200 ease-in-out ${
              readingTheme === 'dark' 
                ? 'bg-[#0F172A] border-[#1F2937]' 
                : readingTheme === 'sepia' 
                  ? 'bg-[#EFE2C8] border-[#DECBB0]' 
                  : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}>
              {/* Sidebar Header */}
              <div className={`p-3.5 border-b flex items-center justify-between shrink-0 ${
                readingTheme === 'dark' ? 'border-[#1F2937]' : readingTheme === 'sepia' ? 'border-[#DECBB0]' : 'border-[#E2E8F0]'
              }`}>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-saffron" />
                  <span className="text-xs font-black uppercase tracking-wider">Index & Tabs</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-md opacity-70 hover:opacity-100 sm:hidden cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
                {/* TABS SECTION */}
                <div className="space-y-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 block mb-1.5 ${
                    readingTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    अनुभाग (Sections)
                  </span>
                  {[
                    { id: 'theory', label: '📖 Theory & Chapters', count: notes.chapters?.length || 1 },
                    { id: 'tables', label: '📊 Comparative Tables', count: allTables.length },
                    { id: 'revision', label: '⚡ Rapid Revision & Facts', count: (notes.oneLinerRevision || notes.rapidRevision || []).length },
                    { id: 'mcqs', label: '🎯 Exam MCQs & Quiz', count: notes.mcqs?.length || 0 }
                  ].map(tab => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          if (window.innerWidth < 640) setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-saffron text-white shadow-sm'
                            : readingTheme === 'dark'
                              ? 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                              : readingTheme === 'sepia'
                                ? 'text-[#3F3325] hover:bg-[#E5D2B1]'
                                : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate">{tab.label}</span>
                        {tab.count > 0 && (
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                            isActive 
                              ? 'bg-white/25 text-white' 
                              : readingTheme === 'dark'
                                ? 'bg-[#1E293B] text-slate-300'
                                : 'bg-black/5 text-slate-600'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* CHAPTERS SECTION */}
                {Array.isArray(notes.chapters) && notes.chapters.length > 0 && (
                  <div className="pt-3 border-t border-border/40 space-y-1.5">
                    <div className="flex items-center justify-between px-2 mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${
                        readingTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        अध्याय सूची (Chapters)
                      </span>
                      <span className="text-[10px] font-bold text-saffron">
                        {notes.chapters.length} कुल
                      </span>
                    </div>

                    {/* All Chapters option */}
                    <button
                      onClick={() => {
                        setActiveTab('theory');
                        setSelectedChapterIdx(null);
                        if (window.innerWidth < 640) setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        activeTab === 'theory' && selectedChapterIdx === null
                          ? 'bg-saffron/15 text-saffron border border-saffron/40 font-black'
                          : readingTheme === 'dark'
                            ? 'text-slate-400 hover:bg-[#1E293B] hover:text-slate-200'
                            : readingTheme === 'sepia'
                              ? 'text-[#6A4A25] hover:bg-[#E5D2B1]'
                              : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-sm">📚</span>
                      <span>सभी अध्याय (All Chapters)</span>
                    </button>

                    {/* Individual Chapters */}
                    {notes.chapters.map((ch: any, cIdx: number) => {
                      const isSelected = activeTab === 'theory' && selectedChapterIdx === cIdx;
                      return (
                        <button
                          key={cIdx}
                          onClick={() => {
                            setActiveTab('theory');
                            setSelectedChapterIdx(cIdx);
                            if (window.innerWidth < 640) setIsSidebarOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-saffron text-white shadow-sm font-bold'
                              : readingTheme === 'dark'
                                ? 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                                : readingTheme === 'sepia'
                                  ? 'text-[#3F3325] hover:bg-[#E5D2B1]'
                                  : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-saffron/15 text-saffron'
                          }`}>
                            {ch.chapterNumber || (cIdx + 1 < 10 ? `0${cIdx + 1}` : cIdx + 1)}
                          </span>
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="truncate font-bold leading-tight">
                              {ch.chapterTitle || ch.title}
                            </span>
                            <span className={`text-[10px] mt-0.5 truncate ${
                              isSelected ? 'text-white/80' : 'opacity-70'
                            }`}>
                              {ch.sections?.length || 0} भाग {ch.tables?.length ? `• ${ch.tables.length} सारणी` : ''}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Reading Content Area */}
          <div className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 select-text ${getFontSizeClass()}`}>
          
          {loading && (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-text-muted">
              <div className="w-8 h-8 border-3 border-saffron border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-semibold">Loading formatted study notes...</p>
            </div>
          )}

          {(!notes || error) && !loading && (
            <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center max-w-md mx-auto p-6 bg-bg-s2 border border-border/80 rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-saffron/15 border border-saffron/30 text-saffron flex items-center justify-center shadow-sm">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-text">Formatted Study Notes Not Found</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {error || 'This topic does not have interactive formatted study notes yet.'}
                </p>
              </div>

              {topic.pdfPath && (
                <div className="w-full pt-3 border-t border-border/60 flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-saffron">
                    📄 Attached PDF Study Notes Available:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenPdf) onOpenPdf(topic);
                    }}
                    className="w-full py-2.5 px-4 bg-saffron hover:bg-orange-500 text-bg-s1 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Open Attached PDF Notes</span>
                  </button>
                </div>
              )}

              <p className="text-[10px] text-text-muted/80">
                You can generate and save formatted study notes for this topic from the Admin Syllabus Studio.
              </p>
            </div>
          )}

          {notes && !loading && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Top Overview Banner (Shown only in Theory & Chapters tab) */}
              {activeTab === 'theory' && notes.overview && (
                <div className={`p-5 rounded-2xl border ${getCardBgClass()} space-y-3.5`}>
                  <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                    <span className="text-xs font-black uppercase text-saffron tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Topic Overview & Exam Relevance
                    </span>
                    <span className={`text-[11px] font-bold ${readingTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {notes.targetExams || examName}
                    </span>
                  </div>

                  {notes.overview.introduction && (
                    <p className={`font-medium text-justify leading-relaxed ${
                      readingTheme === 'dark' ? 'text-slate-200' : readingTheme === 'sepia' ? 'text-[#3F3325]' : 'text-slate-800'
                    }`}>
                      {notes.overview.introduction}
                    </p>
                  )}

                  {/* Quick Facts Pills */}
                  {Array.isArray(notes.overview.quickFacts) && notes.overview.quickFacts.length > 0 && (
                    <div className="pt-2.5 border-t border-border/40">
                      <span className={`text-[10px] font-black uppercase tracking-wider block mb-2 ${
                        readingTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>मुख्य तथ्य झलक (Quick Highlights):</span>
                      <div className="flex flex-wrap gap-2">
                        {notes.overview.quickFacts.map((fact: string, idx: number) => (
                          <span key={idx} className={`text-xs px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-2 ${
                            readingTheme === 'dark'
                              ? 'bg-[#1E293B]/70 border-[#334155] text-slate-200'
                              : readingTheme === 'sepia'
                                ? 'bg-[#EFE2C8] border-[#DECBB0] text-[#3F3325]'
                                : 'bg-slate-100 border-slate-200 text-slate-800'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                            {fact}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 1: THEORY & CHAPTERS */}
              {activeTab === 'theory' && (
                <div className="space-y-6">
                  {/* Single Chapter Active Indicator */}
                  {selectedChapterIdx !== null && Array.isArray(notes.chapters) && notes.chapters[selectedChapterIdx] && (
                    <div className={`p-3 sm:p-4 rounded-xl border flex items-center justify-between gap-3 shadow-xs ${getCardBgClass()}`}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-saffron text-white text-xs font-black flex items-center justify-center shrink-0">
                          {notes.chapters[selectedChapterIdx].chapterNumber || (selectedChapterIdx + 1 < 10 ? `0${selectedChapterIdx + 1}` : selectedChapterIdx + 1)}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs sm:text-sm font-black truncate">
                            अध्याय {selectedChapterIdx + 1} / {notes.chapters.length}: {notes.chapters[selectedChapterIdx].chapterTitle || notes.chapters[selectedChapterIdx].title}
                          </span>
                          <span className="text-[10px] text-text-muted">
                            {notes.chapters[selectedChapterIdx].sections?.length || 0} अनुभाग अध्ययन हेतु उपलब्ध
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedChapterIdx(null)}
                        className="px-3 py-1.5 rounded-lg bg-saffron/10 hover:bg-saffron/20 text-saffron border border-saffron/30 text-xs font-bold shrink-0 transition-all cursor-pointer"
                      >
                        सभी अध्याय देखें (View All)
                      </button>
                    </div>
                  )}

                  {(selectedChapterIdx !== null && Array.isArray(notes.chapters) && notes.chapters[selectedChapterIdx]
                    ? [notes.chapters[selectedChapterIdx]]
                    : (Array.isArray(notes.chapters) ? notes.chapters : [])
                  ).map((chapter: any, cIdx: number) => {
                    const actualIdx = selectedChapterIdx !== null ? selectedChapterIdx : cIdx;
                    return (
                    <div key={actualIdx} className={`p-5 sm:p-6 rounded-xl border ${getCardBgClass()} shadow-sm space-y-5`}>
                      
                      {/* Chapter Title & Focus */}
                      <div className="border-b border-border/60 pb-3.5">
                        <div className="flex items-center gap-2 text-saffron text-xs font-black uppercase tracking-wider mb-1">
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>अध्याय {chapter.chapterNumber || (actualIdx + 1 < 10 ? `0${actualIdx + 1}` : actualIdx + 1)}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-text">
                          {chapter.chapterTitle || chapter.title}
                        </h3>
                        {chapter.description && (
                          <p className="text-xs text-text-muted mt-1 font-medium">{chapter.description}</p>
                        )}
                        {chapter.examFocus && (
                          <div className={`mt-3 px-3.5 py-2 rounded-xl border flex items-start sm:items-center gap-2.5 text-xs font-medium ${
                            readingTheme === 'dark'
                              ? 'bg-amber-950/40 border-amber-500/30 text-amber-200'
                              : readingTheme === 'sepia'
                                ? 'bg-[#FBF1D3] border-amber-300/80 text-[#4E2D07]'
                                : 'bg-amber-50/90 border-amber-300/80 text-amber-950'
                          }`}>
                            <div className={`p-1 rounded-lg shrink-0 ${
                              readingTheme === 'dark' 
                                ? 'bg-amber-500/20 text-amber-400' 
                                : readingTheme === 'sepia'
                                  ? 'bg-[#EAD8B8] text-[#8A4A00]'
                                  : 'bg-amber-200/80 text-amber-800'
                            }`}>
                              <Lightbulb className="w-4 h-4 shrink-0" />
                            </div>
                            <div className="leading-relaxed">
                              <strong className={`font-black uppercase tracking-wider text-[11px] mr-1.5 ${
                                readingTheme === 'dark' 
                                  ? 'text-amber-400' 
                                  : readingTheme === 'sepia' 
                                    ? 'text-[#8A4A00]' 
                                    : 'text-amber-800'
                              }`}>
                                Exam Focus:
                              </strong>
                              <span className="font-semibold">{renderCardText(chapter.examFocus)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sections */}
                      {Array.isArray(chapter.sections) && chapter.sections.map((sec: any, sIdx: number) => (
                        <div key={sIdx} className="space-y-3 pt-2">
                          {sec.heading && (
                            <h4 className="text-base font-bold text-text flex items-center gap-2 border-l-3 border-saffron pl-2.5">
                              {sec.heading}
                            </h4>
                          )}

                          {sec.content && (
                            <div className="prose prose-sm max-w-none font-normal leading-relaxed text-justify space-y-2.5">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ children }) => (
                                    <p className={`my-2 leading-relaxed ${
                                      readingTheme === 'dark' ? 'text-slate-200' : readingTheme === 'sepia' ? 'text-[#3F3325]' : 'text-slate-800'
                                    }`}>{children}</p>
                                  ),
                                  strong: ({ children }) => (
                                    <strong className={`font-black ${
                                      readingTheme === 'dark' ? 'text-amber-400' : readingTheme === 'sepia' ? 'text-[#8A4A00]' : 'text-[#B45309]'
                                    }`}>{children}</strong>
                                  ),
                                  ul: ({ children }) => (
                                    <ul className="list-disc pl-5 my-2 space-y-1.5">{children}</ul>
                                  ),
                                  ol: ({ children }) => (
                                    <ol className="list-decimal pl-5 my-2 space-y-1.5">{children}</ol>
                                  ),
                                  li: ({ children }) => (
                                    <li className={`leading-relaxed ${
                                      readingTheme === 'dark' ? 'text-slate-200' : readingTheme === 'sepia' ? 'text-[#3F3325]' : 'text-slate-800'
                                    }`}>{children}</li>
                                  ),
                                  h1: ({ children }) => (
                                    <h3 className="text-base font-black text-saffron mt-3 mb-1">{children}</h3>
                                  ),
                                  h2: ({ children }) => (
                                    <h4 className="text-sm font-black text-saffron mt-2.5 mb-1">{children}</h4>
                                  ),
                                  h3: ({ children }) => (
                                    <h5 className="text-xs font-black uppercase text-saffron tracking-wider mt-2 mb-1">{children}</h5>
                                  ),
                                  blockquote: ({ children }) => (
                                    <blockquote className={`border-l-4 border-saffron pl-3 py-1 my-2 rounded-r italic text-xs ${
                                      readingTheme === 'dark' ? 'bg-[#1E293B] text-slate-300' : 'bg-saffron/10 text-slate-700'
                                    }`}>{children}</blockquote>
                                  )
                                }}
                              >
                                {formatNotesContent(sec.content)}
                              </ReactMarkdown>
                            </div>
                          )}

                          {/* Concept Card */}
                          {sec.conceptCard && (
                            <div className={`p-3.5 rounded-xl border text-xs space-y-1 shadow-2xs ${
                              readingTheme === 'dark' 
                                ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' 
                                : readingTheme === 'sepia'
                                  ? 'bg-[#E3DCFF]/40 border-indigo-300 text-[#30206B]'
                                  : 'bg-indigo-50 border-indigo-200 text-indigo-950'
                            }`}>
                              <span className="font-black flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                                💡 मुख्य अवधारणा (Core Concept):
                              </span>
                              <div className="leading-relaxed font-medium">
                                {renderCardText(sec.conceptCard)}
                              </div>
                            </div>
                          )}

                          {/* Important Fact Card */}
                          {sec.importantFactCard && (
                            <div className={`p-3.5 rounded-xl border text-xs space-y-1 shadow-2xs ${
                              readingTheme === 'dark' 
                                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' 
                                : readingTheme === 'sepia'
                                  ? 'bg-[#D2EBD9]/50 border-emerald-300 text-[#0F4723]'
                                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                            }`}>
                              <span className="font-black flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                                ⭐ अति महत्वपूर्ण तथ्य (Exam Highlight):
                              </span>
                              <div className="leading-relaxed font-medium">
                                {renderCardText(sec.importantFactCard)}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* In-chapter Tables */}
                      {Array.isArray(chapter.tables) && chapter.tables.length > 0 && (
                        <div className="pt-4 border-t border-border/50 space-y-4">
                          {chapter.tables.map((tbl: any, tIdx: number) => (
                            <div key={tIdx} className={`overflow-x-auto rounded-xl border ${
                              readingTheme === 'dark' ? 'border-[#2A364F] bg-[#111827]' : readingTheme === 'sepia' ? 'border-[#DECBB0] bg-[#F7EEDC]' : 'border-[#CBD5E1] bg-white'
                            } shadow-2xs`}>
                              {tbl.title && (
                                <div className={`p-3 font-black text-xs border-b ${
                                  readingTheme === 'dark' ? 'bg-[#1E293B] text-saffron border-[#2A364F]' : readingTheme === 'sepia' ? 'bg-[#EAD8B8] text-[#8A4A00] border-[#DECBB0]' : 'bg-slate-100 text-saffron border-[#CBD5E1]'
                                }`}>
                                  {tbl.title}
                                </div>
                              )}
                              <table className="w-full text-left text-xs border-collapse">
                                {Array.isArray(tbl.headers) && (
                                  <thead className={
                                    readingTheme === 'dark' ? 'bg-[#1E293B] text-slate-100 font-black border-b border-[#2A364F]' : readingTheme === 'sepia' ? 'bg-[#E5D2B1] text-[#3F3325] font-black border-b border-[#DECBB0]' : 'bg-slate-100 text-slate-900 font-black border-b border-slate-300'
                                  }>
                                    <tr>
                                      {tbl.headers.map((h: string, hIdx: number) => (
                                        <th key={hIdx} className={`p-2.5 border-r last:border-r-0 ${
                                          readingTheme === 'dark' ? 'border-[#2A364F]' : readingTheme === 'sepia' ? 'border-[#DECBB0]' : 'border-slate-200'
                                        }`}>
                                          {h}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                )}
                                <tbody>
                                  {Array.isArray(tbl.rows) && tbl.rows.map((row: any, rIdx: number) => {
                                    const cells = getRowCells(row);
                                    return (
                                      <tr key={rIdx} className={`border-b last:border-b-0 ${
                                        readingTheme === 'dark' 
                                          ? 'border-[#2A364F]/70 hover:bg-[#1E293B]/50' 
                                          : readingTheme === 'sepia' 
                                            ? 'border-[#DECBB0]/70 hover:bg-[#EFE2C8]' 
                                            : 'border-slate-200 hover:bg-slate-50'
                                      }`}>
                                        {cells.map((cell: any, cellIdx: number) => (
                                          <td key={cellIdx} className={`p-2.5 border-r last:border-r-0 font-medium ${
                                            readingTheme === 'dark' ? 'border-[#2A364F]/60 text-slate-200' : readingTheme === 'sepia' ? 'border-[#DECBB0]/60 text-[#3F3325]' : 'border-slate-200 text-slate-800'
                                          }`}>
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                    );
                  })}

                  {/* Previous / Next chapter navigation when a single chapter is selected */}
                  {selectedChapterIdx !== null && Array.isArray(notes.chapters) && notes.chapters.length > 1 && (
                    <div className="flex items-center justify-between pt-2 pb-4 gap-3">
                      <button
                        onClick={() => setSelectedChapterIdx(Math.max(0, selectedChapterIdx - 1))}
                        disabled={selectedChapterIdx === 0}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          selectedChapterIdx === 0
                            ? 'opacity-40 cursor-not-allowed border-transparent'
                            : 'border-border hover:border-saffron bg-bg-s2 shadow-xs'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>पिछला अध्याय</span>
                      </button>

                      <button
                        onClick={() => setSelectedChapterIdx(null)}
                        className="text-xs font-bold text-text-muted hover:text-saffron transition-colors cursor-pointer"
                      >
                        सभी अध्याय देखें (All)
                      </button>

                      <button
                        onClick={() => setSelectedChapterIdx(Math.min(notes.chapters.length - 1, selectedChapterIdx + 1))}
                        disabled={selectedChapterIdx === notes.chapters.length - 1}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          selectedChapterIdx === notes.chapters.length - 1
                            ? 'opacity-40 cursor-not-allowed border-transparent'
                            : 'border-border hover:border-saffron bg-bg-s2 shadow-xs'
                        }`}
                      >
                        <span>अगला अध्याय</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Confusion Buster Section */}
                  {Array.isArray(notes.confusionBuster) && notes.confusionBuster.length > 0 && (
                    <div className={`p-5 rounded-xl border ${getCardBgClass()} space-y-3`}>
                      <h4 className="text-sm font-black uppercase tracking-wider text-amber-500 flex items-center gap-2">
                        ⚠️ सामान्य भ्रम एवं स्पष्टीकरण (Confusion Buster)
                      </h4>
                      <div className="divide-y divide-border/40">
                        {notes.confusionBuster.map((item: any, idx: number) => (
                          <div key={idx} className="py-2.5 grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                            <div className={`p-3 rounded-lg border ${
                              readingTheme === 'dark' ? 'bg-red-950/40 border-red-500/30 text-red-200' : readingTheme === 'sepia' ? 'bg-[#FADBD8]/60 border-red-300 text-[#78281F]' : 'bg-red-50 border-red-200 text-red-900'
                            }`}>
                              <span className="font-black block mb-1">❌ अक्सर होने वाला भ्रम:</span>
                              <span className="leading-relaxed font-medium">{item.oftenConfused}</span>
                            </div>
                            <div className={`p-3 rounded-lg border ${
                              readingTheme === 'dark' ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : readingTheme === 'sepia' ? 'bg-[#D4EFDF]/60 border-emerald-300 text-[#145A32]' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            }`}>
                              <span className="font-black block mb-1">✔️ सही एवं प्रामाणिक तथ्य:</span>
                              <span className="leading-relaxed font-medium">{item.correctInformation}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: COMPARATIVE TABLES */}
              {activeTab === 'tables' && (
                <div className="space-y-6">
                  {allTables.length === 0 ? (
                    <div className="text-center py-12 text-text-muted">
                      No standalone tables for this topic. Check Theory tab for embedded content.
                    </div>
                  ) : (
                    allTables.map((tbl: any, idx: number) => (
                      <div key={idx} className={`p-5 rounded-xl border ${getCardBgClass()} space-y-3`}>
                        <div className="flex items-center gap-2 text-saffron font-black text-sm">
                          <Layers className="w-4 h-4" />
                          <span>{tbl.title || `तुलनात्मक सारणी ${idx + 1}`}</span>
                        </div>
                        <div className={`overflow-x-auto rounded-xl border ${
                          readingTheme === 'dark' ? 'border-[#2A364F] bg-[#111827]' : readingTheme === 'sepia' ? 'border-[#DECBB0] bg-[#F7EEDC]' : 'border-[#CBD5E1] bg-white'
                        } shadow-2xs`}>
                          <table className="w-full text-left text-xs border-collapse">
                            {Array.isArray(tbl.headers) && (
                              <thead className={
                                readingTheme === 'dark' ? 'bg-[#1E293B] text-slate-100 font-black border-b border-[#2A364F]' : readingTheme === 'sepia' ? 'bg-[#E5D2B1] text-[#3F3325] font-black border-b border-[#DECBB0]' : 'bg-slate-100 text-slate-900 font-black border-b border-slate-300'
                              }>
                                <tr>
                                  {tbl.headers.map((h: string, hIdx: number) => (
                                    <th key={hIdx} className={`p-2.5 border-r last:border-r-0 ${
                                      readingTheme === 'dark' ? 'border-[#2A364F]' : readingTheme === 'sepia' ? 'border-[#DECBB0]' : 'border-slate-200'
                                    }`}>
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                            )}
                            <tbody>
                              {Array.isArray(tbl.rows) && tbl.rows.map((row: any, rIdx: number) => {
                                const cells = getRowCells(row);
                                return (
                                  <tr key={rIdx} className={`border-b last:border-b-0 ${
                                    readingTheme === 'dark' 
                                      ? 'border-[#2A364F]/70 hover:bg-[#1E293B]/50' 
                                      : readingTheme === 'sepia' 
                                        ? 'border-[#DECBB0]/70 hover:bg-[#EFE2C8]' 
                                        : 'border-slate-200 hover:bg-slate-50'
                                  }`}>
                                    {cells.map((cell: any, cellIdx: number) => (
                                      <td key={cellIdx} className={`p-2.5 border-r last:border-r-0 font-medium ${
                                        readingTheme === 'dark' ? 'border-[#2A364F]/60 text-slate-200' : readingTheme === 'sepia' ? 'border-[#DECBB0]/60 text-[#3F3325]' : 'border-slate-200 text-slate-800'
                                      }`}>
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: RAPID REVISION & FACTS */}
              {activeTab === 'revision' && (
                <div className="space-y-6">
                  {/* Revision Points */}
                  <div className={`p-5 rounded-xl border ${getCardBgClass()} space-y-4`}>
                    <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                      <span className="text-sm font-black uppercase text-saffron tracking-wider flex items-center gap-1.5">
                        ⚡ परीक्षा उपयोगी वन-लाइनर तथ्य (Rapid Revision Bullets)
                      </span>
                      <span className={`text-xs ${readingTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Click copy button to save any point
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {(notes.oneLinerRevision || notes.rapidRevision || []).map((fact: string, idx: number) => (
                        <div 
                          key={idx} 
                          className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs leading-relaxed group transition-colors ${
                            readingTheme === 'dark'
                              ? 'bg-[#1E293B]/70 border-[#334155] hover:border-saffron/50 text-slate-200'
                              : readingTheme === 'sepia'
                                ? 'bg-[#EFE2C8] border-[#DECBB0] hover:border-amber-600 text-[#3F3325]'
                                : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-saffron/60 text-slate-800'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="font-semibold">{fact}</span>
                          </div>
                          <button
                            onClick={() => copyRevisionPoint(fact, idx)}
                            className={`p-1.5 rounded transition-colors shrink-0 ${
                              readingTheme === 'dark' ? 'text-slate-400 hover:text-saffron hover:bg-slate-800' : 'text-slate-500 hover:text-saffron hover:bg-slate-200'
                            }`}
                            title="Copy fact"
                          >
                            {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PYQ Section */}
                  {Array.isArray(notes.pyqSection) && notes.pyqSection.length > 0 && (
                    <div className={`p-5 rounded-xl border ${getCardBgClass()} space-y-3`}>
                      <h4 className="text-sm font-black uppercase tracking-wider text-blue-500 flex items-center gap-2">
                        🏛️ विगत वर्षों के प्रश्न (Previous Year Questions - PYQs)
                      </h4>
                      <div className="space-y-2.5">
                        {notes.pyqSection.map((pyq: any, idx: number) => (
                          <div key={idx} className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                            readingTheme === 'dark' 
                              ? 'bg-blue-950/40 border-blue-500/30 text-slate-200' 
                              : readingTheme === 'sepia'
                                ? 'bg-[#D4E6F1]/50 border-blue-300 text-[#154360]'
                                : 'bg-blue-50 border-blue-200 text-blue-950'
                          }`}>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                              <span>{pyq.examYear || 'CGPSC / Vyapam'}</span>
                            </div>
                            <p className="font-bold text-sm leading-snug">{pyq.question}</p>
                            <p className="font-semibold text-[11px] pt-1 border-t border-blue-500/20 text-emerald-600 dark:text-emerald-400">
                              ✓ उत्तर: {pyq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Revision Checklist */}
                  {Array.isArray(notes.checklist) && notes.checklist.length > 0 && (
                    <div className={`p-5 rounded-xl border ${getCardBgClass()} space-y-3`}>
                      <h4 className="text-sm font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        📋 अंतिम समीक्षा चेकलिस्ट (Study Checklist)
                      </h4>
                      <div className="space-y-2">
                        {notes.checklist.map((chk: string, idx: number) => {
                          const isDone = Boolean(checkedChecklist[idx]);
                          return (
                            <button
                              key={idx}
                              onClick={() => setCheckedChecklist(prev => ({ ...prev, [idx]: !prev[idx] }))}
                              className={`w-full text-left p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                                isDone 
                                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 line-through' 
                                  : readingTheme === 'dark'
                                    ? 'bg-[#1E293B]/70 border-[#334155] text-slate-200 hover:bg-[#1E293B]'
                                    : readingTheme === 'sepia'
                                      ? 'bg-[#EFE2C8] border-[#DECBB0] text-[#3F3325] hover:bg-[#EAD8B8]'
                                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-slate-800 hover:bg-slate-100'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-400'
                              }`}>
                                {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="font-semibold">{chk}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 4: MCQS & QUIZ */}
              {activeTab === 'mcqs' && (
                <div className="space-y-4">
                  {Array.isArray(notes.mcqs) && notes.mcqs.length > 0 ? (
                    notes.mcqs.map((mcq: any, qIdx: number) => {
                      const userChoice = selectedAnswers[qIdx];
                      const isRevealed = revealedExplanations[qIdx];
                      const correctLetter = (mcq.correct || 'A').toString().trim().toUpperCase().charAt(0);

                      return (
                        <div key={qIdx} className={`p-5 rounded-xl border ${getCardBgClass()} space-y-3.5`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <span className="w-6 h-6 rounded-full bg-saffron/15 text-saffron font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {qIdx + 1}
                              </span>
                              <h4 className="text-sm sm:text-base font-bold leading-snug">
                                {mcq.q || mcq.question}
                              </h4>
                            </div>
                          </div>

                          {/* Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                            {Array.isArray(mcq.options) && mcq.options.map((opt: string, optIdx: number) => {
                              const letter = String.fromCharCode(65 + optIdx);
                              const isSelected = userChoice === letter;
                              const isCorrectOpt = letter === correctLetter;

                              let optStyle = readingTheme === 'dark' 
                                ? 'bg-[#1E293B]/70 border-[#334155] text-slate-200 hover:border-saffron/60 hover:bg-[#1E293B]' 
                                : readingTheme === 'sepia'
                                  ? 'bg-[#EFE2C8] border-[#DECBB0] text-[#3F3325] hover:border-amber-600'
                                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-slate-800 hover:border-saffron/60 hover:bg-slate-100';

                              if (isRevealed) {
                                if (isCorrectOpt) {
                                  optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                                } else if (isSelected && !isCorrectOpt) {
                                  optStyle = 'bg-red-500/20 border-red-500 text-red-700 dark:text-red-300 line-through';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectOption(qIdx, letter)}
                                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${optStyle}`}
                                >
                                  <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 border ${
                                    isSelected ? 'border-current bg-current/20' : 'border-slate-400 bg-black/5'
                                  }`}>
                                    {letter}
                                  </span>
                                  <span className="leading-snug">{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Instant Explanation */}
                          {isRevealed && (
                            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5 animate-fade-in">
                              <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>सही उत्तर: विकल्प ({correctLetter})</span>
                              </div>
                              {mcq.explanation && (
                                <p className="leading-relaxed pl-6 opacity-90">
                                  <strong>व्याख्या:</strong> {mcq.explanation}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 text-text-muted">
                      No practice MCQs attached to this topic.
                    </div>
                  )}
                </div>
              )}

              {/* Sources Citation Footer */}
              {Array.isArray(notes.sources) && notes.sources.length > 0 && (
                <div className="pt-4 border-t border-border/50 text-[11px] text-text-muted flex flex-wrap items-center gap-2">
                  <span className="font-bold">प्रामाणिक संदर्भ स्रोत:</span>
                  {notes.sources.map((s: string, idx: number) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-bg-s3 border border-border/50">
                      {s}
                    </span>
                  ))}
                </div>
              )}

            </div>
          )}

          </div>

        </div>

        {/* Hidden Printable Container for Clean PDF / Print */}
        <div style={{ display: 'none' }}>
          <div ref={printAreaRef}>
            {notes && (
              <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <div style={{ borderBottom: '2px solid #1E3A8A', paddingBottom: '10px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '18pt', fontWeight: 'bold', color: '#1E3A8A' }}>
                    CG GURU : ज्ञान संदर्भ एवं परीक्षा अध्ययन सामग्री
                  </div>
                  <div style={{ fontSize: '13pt', fontWeight: 'bold', marginTop: '4px' }}>
                    {topic.nameHi || topic.name}
                  </div>
                  <div style={{ fontSize: '10pt', color: '#64748B', marginTop: '2px' }}>
                    विषय: {subjectName} | लक्ष्य परीक्षाएँ: {notes.targetExams || examName}
                  </div>
                </div>

                {notes.overview && (
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ color: '#1E3A8A' }}>परिचय एवं परीक्षा प्रासंगिकता</h3>
                    <p>{notes.overview.introduction}</p>
                  </div>
                )}

                {Array.isArray(notes.chapters) && notes.chapters.map((ch: any, i: number) => (
                  <div key={i} className="avoid-break" style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#1E3A8A', borderBottom: '1px solid #CBD5E1', paddingBottom: '4px' }}>
                      अध्याय {i + 1}: {ch.chapterTitle || ch.title}
                    </h3>
                    {ch.examFocus && (
                      <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', padding: '6px 10px', borderRadius: '6px', fontSize: '9pt', color: '#78350F', margin: '6px 0 10px 0' }}>
                        <strong>Exam Focus:</strong> {ch.examFocus}
                      </div>
                    )}
                    {Array.isArray(ch.sections) && ch.sections.map((sec: any, j: number) => (
                      <div key={j} style={{ marginBottom: '10px' }}>
                        {sec.heading && <h4>{sec.heading}</h4>}
                        <p style={{ whiteSpace: 'pre-line' }}>{formatNotesContent(sec.content)}</p>
                      </div>
                    ))}
                  </div>
                ))}

                {allTables.length > 0 && (
                  <div className="avoid-break" style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#1E3A8A' }}>महत्वपूर्ण तुलनात्मक सारणी</h3>
                    {allTables.map((tbl: any, idx: number) => (
                      <div key={idx} style={{ marginBottom: '12px' }}>
                        <strong>{tbl.title || `सारणी ${idx + 1}`}</strong>
                        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '6px' }}>
                          {tbl.headers && (
                            <thead>
                              <tr>{tbl.headers.map((h: string, hi: number) => <th key={hi} style={{ border: '1px solid #94A3B8', padding: '6px', background: '#F1F5F9' }}>{h}</th>)}</tr>
                            </thead>
                          )}
                          <tbody>
                            {tbl.rows && tbl.rows.map((r: any, ri: number) => {
                              const cells = getRowCells(r);
                              return (
                                <tr key={ri}>
                                  {cells.map((c: any, ci: number) => (
                                    <td key={ci} style={{ border: '1px solid #CBD5E1', padding: '6px' }}>{c}</td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                )}

                {(notes.oneLinerRevision || notes.rapidRevision) && (
                  <div className="avoid-break" style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#1E3A8A' }}>त्वरित पुनरीक्षण तथ्य (Rapid Revision)</h3>
                    <ul>
                      {(notes.oneLinerRevision || notes.rapidRevision).map((pt: string, idx: number) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(notes.mcqs) && notes.mcqs.length > 0 && (
                  <div className="avoid-break" style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#1E3A8A' }}>अभ्यास प्रश्न (MCQs)</h3>
                    {notes.mcqs.map((mcq: any, idx: number) => (
                      <div key={idx} style={{ marginBottom: '10px' }}>
                        <p><strong>Q{idx + 1}. {mcq.q || mcq.question}</strong></p>
                        {Array.isArray(mcq.options) && mcq.options.map((opt: string, oi: number) => (
                          <div key={oi} style={{ marginLeft: '12px', fontSize: '9pt' }}>{opt}</div>
                        ))}
                        <p style={{ color: '#059669', fontSize: '9pt', marginTop: '2px' }}>
                          सही उत्तर: ({mcq.correct}) {mcq.explanation ? `- ${mcq.explanation}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: '8pt', color: '#94A3B8', textAlign: 'center', marginTop: '30px', borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
                  © CG GURU • छत्तीसगढ़ प्रतियोगी परीक्षा तैयारी मंच • प्रामाणिक अध्ययन सामग्री
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

