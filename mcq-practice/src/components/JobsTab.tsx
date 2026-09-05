import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ExternalLink, 
  Bookmark, ShieldAlert, Clock, GraduationCap, 
  Building, Users, Coins, AlertCircle, X,
  CheckCircle2, Share2, BookOpen, Calendar, HelpCircle,
  FileText, Sparkles, ChevronRight, ArrowRight
} from 'lucide-react';

interface JobArticle {
  title: string;
  title_hi?: string;
  description?: string;
  description_hi?: string;
  summary?: string;
  summary_hi?: string;
  category: string;
  source: string;
  url: string;
  date?: string;
  department?: string;
  dept?: string;
  organization?: string;
  board?: string;
  totalPosts?: string;
  posts?: string;
  post?: string;
  vacancies?: string;
  total_posts?: string;
  qualification?: string;
  eligibility?: string;
  education?: string;
  qualification_hi?: string;
  lastDate?: string;
  last_date?: string;
  deadline?: string;
  salary?: string;
  payScale?: string;
  pay_scale?: string;
  stipend?: string;
  ageLimit?: string;
  age_limit?: string;
  age?: string;
  fee?: string;
  applicationFee?: string;
  application_fee?: string;
  mode?: string;
  applyMode?: string;
  selectionProcess?: string;
  selection?: string;
  details?: string;
  job_details?: string;
  syllabus?: string;
  examPattern?: string;
  exam_pattern?: string;
  postDetails?: string;
  post_details?: string;
  howToApply?: string;
  how_to_apply?: string;
  examDate?: string;
  exam_date?: string;
  importantDates?: string;
}

interface JobsTabProps {
  currentUser?: any;
  onNavigateToTab?: (tabId: string) => void;
}

export const JobsTab: React.FC<JobsTabProps> = ({ onNavigateToTab }) => {
  const [jobs, setJobs] = useState<JobArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [savedJobs, setSavedJobs] = useState<JobArticle[]>([]);
  const [activeViewMode, setActiveViewMode] = useState<'all' | 'saved'>('all');
  const [selectedJob, setSelectedJob] = useState<JobArticle | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'eligibility' | 'syllabus' | 'selection'>('overview');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

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

  const isStructuredJob = (job: JobArticle) => {
    const title = (job.title || '').toLowerCase() + ' ' + (job.title_hi || '').toLowerCase();
    if (title.includes('एसबीआई क्लर्क') || title.includes('बिहान') || title.includes('sbi clerk') || title.includes('bihan')) {
      return false;
    }
    return Boolean(
      job.department || job.dept || job.organization || job.board || 
      job.totalPosts || job.posts || job.vacancies || job.post || job.total_posts || 
      job.qualification || job.eligibility || job.education || job.qualification_hi || 
      job.lastDate || job.last_date || job.deadline || 
      job.salary || job.payScale || job.pay_scale || job.stipend || 
      job.details || job.job_details
    );
  };

  useEffect(() => {
    // Load local saved jobs
    const saved = localStorage.getItem('cg_saved_jobs');
    if (saved) {
      try {
        setSavedJobs(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved jobs', e);
      }
    }

    // Instant local load from localStorage (only structured jobs)
    const cachedJobs = localStorage.getItem('cg_cached_jobs_news');
    if (cachedJobs) {
      try {
        const parsed = JSON.parse(cachedJobs);
        if (Array.isArray(parsed)) {
          const structuredOnly = parsed.filter(isStructuredJob);
          if (structuredOnly.length > 0) {
            setJobs(structuredOnly);
            setLoading(false);
          } else {
            localStorage.removeItem('cg_cached_jobs_news');
          }
        }
      } catch (e) {}
    }

    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const cachedJobs = localStorage.getItem('cg_cached_jobs_news');
    let hasLocalCache = false;
    if (cachedJobs) {
      try {
        const parsed = JSON.parse(cachedJobs);
        if (Array.isArray(parsed) && parsed.filter(isStructuredJob).length > 0) {
          hasLocalCache = true;
        }
      } catch (e) {}
    }
    if (!hasLocalCache) {
      setLoading(true);
    }
    setError('');
    try {
      const res = await fetch(getApiUrl('/api/news?category=jobs'));
      if (res.ok) {
        const data = await res.json();
        const fetched = (data.articles || []).filter(isStructuredJob);
        setJobs(fetched);
        localStorage.setItem('cg_cached_jobs_news', JSON.stringify(fetched));
      } else {
        throw new Error('Failed to fetch job updates.');
      }
    } catch (e: any) {
      console.error(e);
      if (!hasLocalCache && jobs.length === 0) {
        setError('Unable to load job notifications right now.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveJob = (job: JobArticle) => {
    let updated;
    const isSaved = savedJobs.some(j => j.title === job.title);
    if (isSaved) {
      updated = savedJobs.filter(j => j.title !== job.title);
    } else {
      updated = [job, ...savedJobs];
    }
    setSavedJobs(updated);
    localStorage.setItem('cg_saved_jobs', JSON.stringify(updated));
  };

  const sectors = [
    { id: 'all', label: 'All Jobs', icon: '💼' },
    { id: 'cgpsc', label: 'CGPSC / PSC', icon: '🏛️' },
    { id: 'vyapam', label: 'CG Vyapam', icon: '📝' },
    { id: 'police', label: 'Police & Defense', icon: '🛡️' },
    { id: 'health', label: 'Medical & Nursing', icon: '🏥' },
    { id: 'teaching', label: 'Teaching Jobs', icon: '🎓' },
    { id: 'ssc_railway', label: 'SSC / Railway / Banking', icon: '🚆' }
  ];

  // Filter logic
  const sourceArticles = activeViewMode === 'saved' ? savedJobs : jobs;

  const filteredJobs = sourceArticles.filter(job => {
    const q = searchQuery.toLowerCase();
    const title = (job.title || '').toLowerCase();
    const titleHi = (job.title_hi || '').toLowerCase();
    const dept = (job.department || job.dept || job.organization || '').toLowerCase();
    const qual = (job.qualification || job.eligibility || '').toLowerCase();
    const src = (job.source || '').toLowerCase();

    const matchesSearch = title.includes(q) || titleHi.includes(q) || dept.includes(q) || qual.includes(q) || src.includes(q);

    if (!matchesSearch) return false;
    if (selectedSector === 'all') return true;
    if (selectedSector === 'cgpsc') return title.includes('cgpsc') || titleHi.includes('सीजीपीएससी') || src.includes('psc');
    if (selectedSector === 'vyapam') return title.includes('vyapam') || titleHi.includes('व्यापम') || src.includes('vyapam');
    if (selectedSector === 'police') return title.includes('police') || title.includes('constable') || titleHi.includes('पुलिस') || titleHi.includes('आरक्षक');
    if (selectedSector === 'health') return title.includes('nurse') || title.includes('health') || title.includes('doctor') || titleHi.includes('स्वास्थ्य') || titleHi.includes('नर्स');
    if (selectedSector === 'teaching') return title.includes('teacher') || title.includes('shikshak') || titleHi.includes('शिक्षक') || titleHi.includes('व्याख्याता');
    if (selectedSector === 'ssc_railway') return title.includes('ssc') || title.includes('railway') || title.includes('bank') || src.includes('ssc') || src.includes('rrb');
    return true;
  });

  return (
    <div className="flex flex-col gap-5 animate-fade-in w-full pb-10">
      {/* Top Controls: All Vacancies vs Saved Jobs toggle */}
      <div className="flex items-center justify-between gap-3 border-b border-border/80 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveViewMode('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeViewMode === 'all'
                ? 'bg-saffron text-bg-s1 shadow-md font-black'
                : 'bg-bg-s2 border border-border text-text-muted hover:text-text'
            }`}
          >
            <span>All Vacancies</span>
            <span className="text-[10px] bg-bg-s1/20 px-2 py-0.5 rounded-full">{jobs.length}</span>
          </button>

          <button
            onClick={() => setActiveViewMode('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeViewMode === 'saved'
                ? 'bg-saffron text-bg-s1 shadow-md font-black'
                : 'bg-bg-s2 border border-border text-text-muted hover:text-text'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Jobs</span>
            <span className="text-[10px] bg-saffron/20 px-2 py-0.5 rounded-full">{savedJobs.length}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by Job title, qualification (e.g. 12th, DCA, B.Tech), department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-s2 text-xs text-text border border-border focus:border-saffron pl-10 pr-4 py-3 rounded-xl outline-none transition-colors shadow-sm"
            />
            <Search className="w-4.5 h-4.5 text-text-muted absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Sector Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
          {sectors.map(sec => (
            <button
              key={sec.id}
              onClick={() => setSelectedSector(sec.id)}
              className={`px-3.5 py-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedSector === sec.id
                  ? 'bg-saffron text-bg-s1 border-saffron font-black shadow-sm'
                  : 'bg-bg-s2 border-border text-text-muted hover:text-text hover:bg-bg-s3'
              }`}
            >
              <span>{sec.icon}</span>
              <span>{sec.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid Listing */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-text-muted">
          <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider text-saffron">Loading Job Alerts...</span>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-redL text-xs flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-bg-s2 border border-border rounded-2xl text-text-muted text-xs flex flex-col items-center gap-3">
          <AlertCircle className="w-8 h-8 text-text-muted/50" />
          <span>No job openings match your current search criteria. Try adjusting your search query or category filters.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job, idx) => {
            const isSaved = savedJobs.some(j => j.title === job.title);

            // Extract all essential job detail aliases safely
            const dept = job.department || job.dept || job.organization || job.board || job.source || 'Govt Notification';
            const posts = job.totalPosts || job.posts || job.vacancies || job.post || job.total_posts;
            const qual = job.qualification || job.eligibility || job.education || job.qualification_hi;
            const lastDate = job.lastDate || job.last_date || job.deadline || job.date;
            const salary = job.salary || job.payScale || job.pay_scale || job.stipend;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                onClick={() => setSelectedJob(job)}
                className="p-5 bg-bg-s2 border border-border hover:border-saffron/60 rounded-2xl flex flex-col justify-between gap-4 transition-all shadow-md group relative cursor-pointer hover:shadow-xl hover:-translate-y-0.5"
              >
                {/* Top badges */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase text-saffron bg-saffron/10 border border-saffron-border/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      <span>{dept}</span>
                    </span>

                    {posts && (
                      <span className="text-[9.5px] font-black uppercase text-red-500 bg-red-500/15 border border-red-500/40 px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shadow-xs">
                        <Users className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="tracking-wide">{posts}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveJob(job);
                    }}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-saffron/20 border-saffron-border/40 text-saffron'
                        : 'bg-bg-s3 border-border text-text-muted hover:text-text'
                    }`}
                    title={isSaved ? 'Remove from Saved Jobs' : 'Save Job Notification'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-saffron' : ''}`} />
                  </button>
                </div>

                {/* Job Title */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-black text-text leading-snug group-hover:text-saffron transition-colors flex items-start justify-between gap-2">
                    <span>{job.title_hi || job.title}</span>
                    <span className="text-[10px] font-bold text-saffron bg-saffron/10 px-2 py-0.5 rounded-md shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
                    </span>
                  </h3>
                  {job.title_hi && (
                    <span className="text-[11px] text-text-muted font-semibold italic">
                      {job.title}
                    </span>
                  )}
                </div>

                {/* Key Job Specifications (Compact Preview) */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-bg-s3/60 border border-border/70 rounded-xl text-[10px]">
                  <div className="flex items-center gap-2 text-text-muted font-medium min-w-0">
                    <GraduationCap className="w-3.5 h-3.5 text-saffron shrink-0" />
                    <span className="truncate"><strong>Qual:</strong> {qual || 'As per notification'}</span>
                  </div>

                  <div className="flex items-center gap-2 text-text-muted font-medium min-w-0">
                    <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span className="truncate"><strong>Last Date:</strong> {lastDate || 'Refer Notification'}</span>
                  </div>

                  {salary && (
                    <div className="flex items-center gap-2 text-text-muted font-medium col-span-2 border-t border-border/40 pt-1.5 min-w-0">
                      <Coins className="w-3.5 h-3.5 text-saffron shrink-0" />
                      <span className="truncate"><strong>Pay Scale:</strong> {salary}</span>
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="flex items-center justify-between border-t border-border/60 pt-3 text-[10px]">
                  <span className="font-bold text-text-muted uppercase">Source: {job.source}</span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                      className="px-3 py-1.5 bg-bg-s3 hover:bg-bg-s1 text-text border border-border font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span>Full Info</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>

                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 font-black uppercase rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Interactive Comprehensive Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (() => {
          const dept = selectedJob.department || selectedJob.dept || selectedJob.organization || selectedJob.board || selectedJob.source || 'Govt Organization';
          const posts = selectedJob.totalPosts || selectedJob.posts || selectedJob.vacancies || selectedJob.post || selectedJob.total_posts;
          const qual = selectedJob.qualification || selectedJob.eligibility || selectedJob.education || selectedJob.qualification_hi;
          const lastDate = selectedJob.lastDate || selectedJob.last_date || selectedJob.deadline || selectedJob.date;
          const salary = selectedJob.salary || selectedJob.payScale || selectedJob.pay_scale || selectedJob.stipend;
          const age = selectedJob.ageLimit || selectedJob.age_limit || selectedJob.age;
          const fee = selectedJob.fee || selectedJob.applicationFee || selectedJob.application_fee;
          const selection = selectedJob.selectionProcess || selectedJob.selection;
          const details = selectedJob.details || selectedJob.job_details || selectedJob.description_hi || selectedJob.description || selectedJob.summary_hi || selectedJob.summary;
          const syllabus = selectedJob.syllabus || selectedJob.examPattern || selectedJob.exam_pattern;
          const postBreakdown = selectedJob.postDetails || selectedJob.post_details;
          const howToApply = selectedJob.howToApply || selectedJob.how_to_apply;
          const examDate = selectedJob.examDate || selectedJob.exam_date || selectedJob.importantDates;
          const isSaved = savedJobs.some(j => j.title === selectedJob.title);

          const handleCopyShare = () => {
            const shareText = `📌 *${selectedJob.title_hi || selectedJob.title}*\n🏢 विभाग: ${dept}\n👥 कुल पद: ${posts || 'विज्ञप्ति देखें'}\n🎓 योग्यता: ${qual || 'अधिसूचना अनुसार'}\n💰 वेतनमान: ${salary || 'लागू नियमानुसार'}\n⏳ अंतिम तिथि: ${lastDate || 'जल्द'}\n🔗 आधिकारिक लिंक: ${selectedJob.url}`;
            navigator.clipboard.writeText(shareText);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2500);
          };

          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.2 }}
                className="bg-bg-s1 border border-border/90 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-4 sm:p-5 border-b border-border/80 bg-bg-s2 flex items-start justify-between gap-3 shrink-0">
                  <div className="flex flex-col gap-2 flex-1 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-black uppercase text-saffron bg-saffron/10 border border-saffron-border/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5" />
                        <span>{dept}</span>
                      </span>

                      {posts && (
                        <span className="text-[11px] font-black uppercase text-red-500 bg-red-500/15 border border-red-500/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{posts} Posts</span>
                        </span>
                      )}

                      <span className="text-[10px] font-bold text-text-muted bg-bg-s3 border border-border px-2.5 py-1 rounded-lg">
                        {selectedJob.source}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-xl font-black text-text leading-snug">
                      {selectedJob.title_hi || selectedJob.title}
                    </h2>

                    {selectedJob.title_hi && (
                      <p className="text-xs text-text-muted font-medium italic">
                        {selectedJob.title}
                      </p>
                    )}
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handleCopyShare}
                      className="p-2.5 rounded-xl bg-bg-s3 border border-border hover:bg-bg-s2 text-text-muted hover:text-text transition-colors cursor-pointer"
                      title="Copy & Share Job Details"
                    >
                      {copiedLink ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => toggleSaveJob(selectedJob)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-saffron/20 border-saffron-border/40 text-saffron'
                          : 'bg-bg-s3 border-border text-text-muted hover:text-text'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Bookmark Job'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-saffron' : ''}`} />
                    </button>

                    <button
                      onClick={() => setSelectedJob(null)}
                      className="p-2.5 rounded-xl bg-bg-s3 border border-border hover:bg-red-500/20 hover:text-red-500 text-text-muted transition-colors cursor-pointer"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick Info Matrix - Clean 6 Badge Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-3.5 sm:p-4 bg-bg-s2/50 border-b border-border/80 text-xs shrink-0">
                  <div className="bg-bg-s1 p-2.5 rounded-xl border border-border/80 flex flex-col gap-1 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-text-muted flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-saffron shrink-0" /> Qualification
                    </span>
                    <span className="text-xs font-bold text-text line-clamp-2 leading-tight" title={qual || 'Refer Notice'}>
                      {qual || 'Notice Check'}
                    </span>
                  </div>

                  <div className="bg-bg-s1 p-2.5 rounded-xl border border-border/80 flex flex-col gap-1 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-text-muted flex items-center gap-1">
                      ⏳ Age Limit
                    </span>
                    <span className="text-xs font-bold text-text line-clamp-2 leading-tight" title={age || '18-40 Yrs approx'}>
                      {age || '18 - 35/40 Yrs'}
                    </span>
                  </div>

                  <div className="bg-bg-s1 p-2.5 rounded-xl border border-border/80 flex flex-col gap-1 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-text-muted flex items-center gap-1">
                      <Coins className="w-3 h-3 text-saffron shrink-0" /> Pay Scale
                    </span>
                    <span className="text-xs font-bold text-text line-clamp-2 leading-tight" title={salary || '7th Pay Matrix'}>
                      {salary || 'Govt Pay Matrix'}
                    </span>
                  </div>

                  <div className="bg-bg-s1 p-2.5 rounded-xl border border-border/80 flex flex-col gap-1 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-text-muted flex items-center gap-1">
                      <Users className="w-3 h-3 text-red-500 shrink-0" /> Total Posts
                    </span>
                    <span className="text-xs font-bold text-red-500 line-clamp-2 leading-tight" title={posts || 'Check Notice'}>
                      {posts || 'Check Notice'}
                    </span>
                  </div>

                  <div className="bg-bg-s1 p-2.5 rounded-xl border border-border/80 flex flex-col gap-1 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-400 shrink-0" /> Last Date
                    </span>
                    <span className="text-xs font-bold text-orange-400 line-clamp-2 leading-tight" title={lastDate || 'Refer Portal'}>
                      {lastDate || 'Active Now'}
                    </span>
                  </div>

                  <div className="bg-bg-s1 p-2.5 rounded-xl border border-border/80 flex flex-col gap-1 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-text-muted flex items-center gap-1">
                      💳 Fee
                    </span>
                    <span className="text-xs font-bold text-text line-clamp-2 leading-tight" title={fee || '₹0 / As per Rules'}>
                      {fee || '₹0 for CG Domicile'}
                    </span>
                  </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="flex items-center gap-2 px-4 pt-3 border-b border-border bg-bg-s2/20 shrink-0 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'overview', label: 'Overview & Posts', icon: FileText },
                    { id: 'eligibility', label: 'Eligibility & Age', icon: GraduationCap },
                    { id: 'syllabus', label: 'Syllabus & Exam Pattern', icon: BookOpen },
                    { id: 'selection', label: 'Selection & Apply', icon: CheckCircle2 },
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveModalTab(tab.id as any)}
                        className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                          activeModalTab === tab.id
                            ? 'border-saffron text-saffron bg-saffron/10'
                            : 'border-transparent text-text-muted hover:text-text'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Modal Scrollable Content Area */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs">
                  {/* OVERVIEW & POST DETAILS TAB */}
                  {activeModalTab === 'overview' && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                      {/* Department & Notification Alert */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-saffron font-bold text-xs uppercase">
                          <Building className="w-4 h-4" />
                          <span>Department / Organizing Body</span>
                        </div>
                        <p className="text-text text-sm font-semibold">
                          {dept}
                        </p>
                        <p className="text-text-muted text-[11px] leading-relaxed">
                          Official Notification published by <strong>{selectedJob.source || 'Recruitment Board'}</strong>. Please verify official terms, eligibility conditions, and category-wise reservation guidelines before completing the registration.
                        </p>
                      </div>

                      {/* Post Breakdown */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-2 border-b border-border/40">
                          <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                            <Users className="w-4 h-4 text-saffron" />
                            <span>Vacancy & Post Breakdown</span>
                          </span>
                          <span className="text-[10px] bg-saffron/10 text-saffron font-black px-2.5 py-1 rounded-md">
                            Total: {posts || 'Notice Available'}
                          </span>
                        </div>

                        {postBreakdown ? (
                          <div className="text-xs text-text-muted whitespace-pre-line leading-relaxed bg-bg-s3/80 p-3.5 rounded-xl border border-border/60">
                            {postBreakdown}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="bg-bg-s3/70 p-3 rounded-xl border border-border/60 flex flex-col gap-1">
                              <span className="text-text-muted text-[11px] font-semibold uppercase">Designation / Role</span>
                              <span className="text-text font-bold leading-snug">{selectedJob.title_hi || selectedJob.title}</span>
                            </div>
                            <div className="bg-bg-s3/70 p-3 rounded-xl border border-border/60 flex flex-col gap-1">
                              <span className="text-text-muted text-[11px] font-semibold uppercase">Cadre / Scale</span>
                              <span className="text-text font-bold leading-snug">{salary || 'State/Central Govt Pay Level'}</span>
                            </div>
                            <div className="bg-bg-s3/70 p-3 rounded-xl border border-border/60 flex flex-col gap-1 sm:col-span-2">
                              <span className="text-text-muted text-[11px] font-semibold uppercase">Category Reservation</span>
                              <span className="text-text font-medium text-[11px]">UR / OBC / SC / ST / EWS / PwD (As per state policy)</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Description & Detailed Summary */}
                      {details && (
                        <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2">
                          <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                            <FileText className="w-4 h-4 text-saffron" />
                            <span>Detailed Job Overview</span>
                          </span>
                          <div className="text-xs text-text-muted whitespace-pre-line leading-relaxed bg-bg-s3/60 p-3.5 rounded-xl border border-border/60">
                            {details}
                          </div>
                        </div>
                      )}

                      {/* Important Timelines */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2">
                        <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-orange-400" />
                          <span>Key Dates & Schedule</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="bg-bg-s3/70 p-3 rounded-xl border border-border/60 flex justify-between items-center">
                            <span className="text-text-muted">Application Deadline:</span>
                            <span className="text-orange-400 font-bold">{lastDate || 'Refer Portal'}</span>
                          </div>
                          <div className="bg-bg-s3/70 p-3 rounded-xl border border-border/60 flex justify-between items-center">
                            <span className="text-text-muted">Tentative Exam Date:</span>
                            <span className="text-text font-bold">{examDate || 'Will be notified later'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ELIGIBILITY & AGE TAB */}
                  {activeModalTab === 'eligibility' && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                      {/* Qualification Card */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2.5">
                        <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-saffron" />
                          <span>Educational Qualification / शैक्षणिक योग्यता</span>
                        </span>
                        
                        {qual ? (
                          <div className="p-3.5 bg-saffron/5 border border-saffron-border/30 rounded-xl flex flex-col gap-2">
                            {qual.includes('•') || qual.includes('\n') ? (
                              <div className="text-xs text-text leading-relaxed whitespace-pre-line font-medium">
                                {qual}
                              </div>
                            ) : (
                              <div className="flex flex-col gap-1.5">
                                {qual.split(/\.\s+|\s*;\s*/).filter(Boolean).map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-xs text-text leading-relaxed font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-saffron mt-1.5 shrink-0" />
                                    <span>{item.trim()}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-3.5 bg-saffron/5 border border-saffron-border/30 rounded-xl text-text text-xs leading-relaxed font-medium">
                            Candidates must possess minimum required qualification recognized by State/Central Government.
                          </div>
                        )}

                        {selectedJob.qualification_hi && (
                          <div className="text-xs text-text-muted bg-bg-s3/60 p-3 rounded-xl border border-border/50 flex flex-col gap-1">
                            <strong className="text-text text-[11px] uppercase">हिन्दी विवरण:</strong>
                            <p className="whitespace-pre-line leading-relaxed">{selectedJob.qualification_hi}</p>
                          </div>
                        )}
                      </div>

                      {/* Age Limit Card */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2.5">
                        <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-400" />
                          <span>Age Limit Criteria / आयु सीमा</span>
                        </span>
                        <div className="p-3.5 bg-bg-s3/70 rounded-xl border border-border flex flex-col gap-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs border-b border-border/50 pb-2">
                            <span className="text-text-muted font-semibold uppercase text-[10px]">Prescribed Age Range:</span>
                            <span className="text-text font-bold text-xs">{age || 'Min 18 to Max 35 / 40 Years (As per rules)'}</span>
                          </div>
                          <div className="text-[11px] text-text-muted flex flex-col gap-1 pt-1 leading-relaxed">
                            <p>• <strong>SC / ST candidates:</strong> 5 years relaxation.</p>
                            <p>• <strong>OBC (Non-Creamy Layer):</strong> 3 years relaxation.</p>
                            <p>• <strong>PwD / Ex-Servicemen / Female candidates (CG Domicile):</strong> Age relaxation as per state government policy (up to 45 years for local domicile).</p>
                          </div>
                        </div>
                      </div>

                      {/* Domicile & Experience */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2.5">
                        <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-400" />
                          <span>Domicile & Registration Requirements</span>
                        </span>
                        <ul className="list-disc list-inside text-[11px] text-text-muted space-y-1.5 bg-bg-s3/60 p-3.5 rounded-xl border border-border/50 leading-relaxed">
                          <li>Candidate must possess valid Domicile Certificate (निवास प्रमाण पत्र) of Chhattisgarh for reservation benefits and fee exemption.</li>
                          <li>Must have valid Live Employment Exchange (रोजगार कार्यालय) Registration in Chhattisgarh where required.</li>
                          <li>Computer proficiency certificate (DCA / PGDCA / Typing certificate) if applicable for clerical/operator posts.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* SYLLABUS & EXAM PATTERN TAB */}
                  {activeModalTab === 'syllabus' && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                      {/* Exam Pattern */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2.5">
                        <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                          <FileText className="w-4 h-4 text-saffron" />
                          <span>Examination Pattern / परीक्षा योजना</span>
                        </span>

                        {syllabus ? (
                          <div className="text-xs text-text-muted whitespace-pre-line leading-relaxed bg-bg-s3/70 p-3.5 rounded-xl border border-border/60">
                            {syllabus}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2.5 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div className="bg-bg-s3 p-3 rounded-xl border border-border text-center">
                                <span className="text-[10px] text-text-muted block font-semibold uppercase">Stage 1</span>
                                <strong className="text-text text-xs">Written / OMR Test</strong>
                              </div>
                              <div className="bg-bg-s3 p-3 rounded-xl border border-border text-center">
                                <span className="text-[10px] text-text-muted block font-semibold uppercase">Stage 2</span>
                                <strong className="text-text text-xs">Skill / Typing / Physical</strong>
                              </div>
                              <div className="bg-bg-s3 p-3 rounded-xl border border-border text-center">
                                <span className="text-[10px] text-text-muted block font-semibold uppercase">Stage 3</span>
                                <strong className="text-text text-xs">Document Verification</strong>
                              </div>
                            </div>
                            <div className="p-3 bg-bg-s3/60 rounded-xl border border-border/50 text-text-muted text-[11px] leading-relaxed">
                              • <strong>Total Questions:</strong> 100 to 150 Multiple Choice Questions (MCQs)<br />
                              • <strong>Duration:</strong> 2 to 3 Hours<br />
                              • <strong>Marking:</strong> 1 mark per question (1/3rd or 1/4th negative marking where applicable).
                            </div>
                          </div>
                        )}
                      </div>

                      {/* General Syllabus Outline */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2.5">
                        <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-saffron" />
                          <span>Core Syllabus Subjects</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-3 bg-bg-s3/70 rounded-xl border border-border/60">
                            <strong className="text-text block mb-1">1. Chhattisgarh General Studies</strong>
                            <p className="text-text-muted text-[11px] leading-relaxed">History, Geography, Tribes, Culture, Economy, Schemes & Current Affairs.</p>
                          </div>
                          <div className="p-3 bg-bg-s3/70 rounded-xl border border-border/60">
                            <strong className="text-text block mb-1">2. General Studies (India)</strong>
                            <p className="text-text-muted text-[11px] leading-relaxed">Indian Polity, Constitution, Modern History, Geography, General Science & National Affairs.</p>
                          </div>
                          <div className="p-3 bg-bg-s3/70 rounded-xl border border-border/60">
                            <strong className="text-text block mb-1">3. General Mental Ability & Reasoning</strong>
                            <p className="text-text-muted text-[11px] leading-relaxed">Analogies, Number Series, Coding-Decoding, Logical puzzles, Data Interpretation.</p>
                          </div>
                          <div className="p-3 bg-bg-s3/70 rounded-xl border border-border/60">
                            <strong className="text-text block mb-1">4. General Hindi & Chhattisgarhi</strong>
                            <p className="text-text-muted text-[11px] leading-relaxed">Grammar, Shabdkosh, Muhavare, Proverbs and Local Chhattisgarhi Dialects.</p>
                          </div>
                        </div>
                      </div>

                      {/* Quick CTA to Practice in App */}
                      {onNavigateToTab && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-saffron/20 via-saffron/10 to-transparent border border-saffron-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-black text-xs text-text flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-saffron" />
                              Prepare for this Exam with Mock Tests
                            </span>
                            <span className="text-[10px] text-text-muted">
                              Practice subject-wise MCQs, Full Mock Tests and Current Affairs capsules directly in StudyAI.
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedJob(null);
                              onNavigateToTab('tests');
                            }}
                            className="px-4 py-2.5 bg-saffron text-bg-s1 font-black text-xs rounded-xl shadow-md hover:bg-orange-500 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                          >
                            <span>Start Test</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SELECTION & APPLY TAB */}
                  {activeModalTab === 'selection' && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                      {/* Selection Process */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2.5">
                        <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>Selection Methodology / चयन प्रक्रिया</span>
                        </span>
                        
                        {selection ? (
                          <div className="p-3.5 bg-bg-s3/70 rounded-xl border border-border flex flex-col gap-2">
                            {selection.includes('\n') || selection.includes('•') ? (
                              <p className="text-xs text-text leading-relaxed whitespace-pre-line font-medium">{selection}</p>
                            ) : selection.includes('->') || selection.includes('→') ? (
                              <div className="flex flex-wrap items-center gap-2">
                                {selection.split(/->|→/).map((stage, idx, arr) => (
                                  <React.Fragment key={idx}>
                                    <span className="px-3 py-1.5 bg-bg-s1 border border-border rounded-lg text-xs font-bold text-text">
                                      {stage.trim()}
                                    </span>
                                    {idx < arr.length - 1 && <span className="text-saffron font-bold">→</span>}
                                  </React.Fragment>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-col gap-1.5">
                                {selection.split(/(?=\d+\.\s+)/).filter(Boolean).map((step, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-xs text-text leading-relaxed font-medium">
                                    <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <span>{step.replace(/^\d+\.\s*/, '').trim()}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-3.5 bg-bg-s3/70 rounded-xl border border-border text-text text-xs leading-relaxed font-medium">
                            Merit list will be prepared based on marks scored in the Written Competitive Examination, followed by Skill/Physical tests and Document Verification.
                          </div>
                        )}
                      </div>

                      {/* Application Fee */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2.5">
                        <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                          <Coins className="w-4 h-4 text-saffron" />
                          <span>Application Fee / परीक्षा शुल्क</span>
                        </span>
                        <div className="p-3.5 bg-bg-s3/70 rounded-xl border border-border text-xs text-text-muted flex flex-col gap-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-border/50 pb-2">
                            <span className="text-text-muted font-semibold uppercase text-[10px]">Fee Amount:</span>
                            <span className="text-text font-bold text-xs">{fee || 'Exempted for Chhattisgarh Domicile / Refer Notification'}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            <strong>Note:</strong> For CG Vyapam & CGPSC recruitment exams, local resident candidates of Chhattisgarh state are generally exempted from application examination fees (only nominal portal/GST fee applies).
                          </p>
                        </div>
                      </div>

                      {/* Step by Step How to Apply */}
                      <div className="p-4 rounded-xl bg-bg-s2 border border-border flex flex-col gap-2.5">
                        <span className="font-bold text-text text-xs uppercase flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-saffron" />
                          <span>How to Apply / ऑनलाइन आवेदन प्रक्रिया</span>
                        </span>
                        {howToApply ? (
                          <div className="text-xs text-text-muted whitespace-pre-line leading-relaxed bg-bg-s3/70 p-3.5 rounded-xl border border-border/50">
                            {howToApply}
                          </div>
                        ) : (
                          <ol className="list-decimal list-inside text-xs text-text-muted space-y-2 bg-bg-s3/60 p-3.5 rounded-xl border border-border/50 leading-relaxed">
                            <li>Visit the official portal using the button below.</li>
                            <li>Register your basic profile using mobile number and email.</li>
                            <li>Fill personal details, educational qualifications, and upload required documents (Photo, Signature, Category certificate).</li>
                            <li>Review application thoroughly and submit before <strong>{lastDate || 'deadline'}</strong>.</li>
                            <li>Download and print a copy of the final application form for future reference.</li>
                          </ol>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer Bar with Direct Action Links */}
                <div className="p-4 border-t border-border bg-bg-s2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>Last Date to Apply: <strong className="text-text">{lastDate || 'As per notification'}</strong></span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-border bg-bg-s3 text-text hover:bg-bg-s1 text-xs font-bold transition-all cursor-pointer"
                    >
                      Close
                    </button>

                    <a
                      href={selectedJob.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-saffron hover:bg-orange-500 text-bg-s1 font-black uppercase text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <span>Apply on Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

