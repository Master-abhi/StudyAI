import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, ExternalLink, 
  Bookmark, ShieldAlert, Clock, GraduationCap, 
  Building, Users, Coins, AlertCircle
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
}

interface JobsTabProps {
  currentUser?: any;
}

export const JobsTab: React.FC<JobsTabProps> = () => {
  const [jobs, setJobs] = useState<JobArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [savedJobs, setSavedJobs] = useState<JobArticle[]>([]);
  const [activeViewMode, setActiveViewMode] = useState<'all' | 'saved'>('all');

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

    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(getApiUrl('/api/news?category=jobs'));
      if (res.ok) {
        const data = await res.json();
        setJobs(data.articles || []);
      } else {
        throw new Error('Failed to fetch job updates.');
      }
    } catch (e: any) {
      console.error(e);
      setError('Unable to load job notifications right now.');
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
            const age = job.ageLimit || job.age_limit || job.age;
            const fee = job.fee || job.applicationFee || job.application_fee;
            const selection = job.selectionProcess || job.selection;
            const details = job.details || job.job_details || job.description_hi || job.description || job.summary_hi || job.summary;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                className="p-5 bg-bg-s2 border border-border hover:border-saffron-border/40 rounded-2xl flex flex-col justify-between gap-4 transition-all shadow-md group relative"
              >
                {/* Top badges */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase text-saffron bg-saffron/10 border border-saffron-border/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      <span>{dept}</span>
                    </span>

                    {posts && (
                      <span className="text-[9px] font-black uppercase text-saffron bg-saffron/10 border border-saffron-border/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{posts}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job)}
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
                  <h3 className="text-sm font-black text-text leading-snug group-hover:text-saffron transition-colors">
                    {job.title_hi || job.title}
                  </h3>
                  {job.title_hi && (
                    <span className="text-[11px] text-text-muted font-semibold italic">
                      {job.title}
                    </span>
                  )}
                </div>

                {/* Essential Job Specifications */}
                <div className="flex flex-col gap-2 p-3.5 bg-bg-s3/70 border border-border/80 rounded-xl text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-start gap-2 text-text-muted font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-saffron shrink-0 mt-0.5" />
                      <span className="break-words"><strong>Qual:</strong> {qual || 'As per official notice'}</span>
                    </div>

                    <div className="flex items-start gap-2 text-text-muted font-medium">
                      <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <span className="break-words"><strong>Last Date:</strong> {lastDate || 'Refer Notification'}</span>
                    </div>

                    {salary && (
                      <div className="flex items-start gap-2 text-text-muted font-medium sm:col-span-2 border-t border-border/40 pt-1.5">
                        <Coins className="w-3.5 h-3.5 text-saffron shrink-0 mt-0.5" />
                        <span className="break-words"><strong>Pay Scale:</strong> {salary}</span>
                      </div>
                    )}

                    {age && (
                      <div className="flex items-start gap-2 text-text-muted font-medium sm:col-span-2 border-t border-border/40 pt-1.5">
                        <span className="text-[11px] shrink-0">⏳</span>
                        <span className="break-words"><strong>Age Limit:</strong> {age}</span>
                      </div>
                    )}

                    {fee && (
                      <div className="flex items-start gap-2 text-text-muted font-medium">
                        <span className="text-[11px] shrink-0">💳</span>
                        <span className="break-words"><strong>Fee:</strong> {fee}</span>
                      </div>
                    )}

                    {selection && (
                      <div className="flex items-start gap-2 text-text-muted font-medium">
                        <span className="text-[11px] shrink-0">📝</span>
                        <span className="break-words"><strong>Selection:</strong> {selection}</span>
                      </div>
                    )}
                  </div>

                  {details && (
                    <div className="mt-1 border-t border-border/50 pt-2 text-[11px] text-text-muted leading-relaxed whitespace-pre-line bg-bg-s2/50 p-2.5 rounded-lg border border-border/40">
                      <strong className="text-text font-bold uppercase text-[9px] block mb-0.5 tracking-wider">📌 Job Overview & Details:</strong>
                      {details}
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="flex items-center justify-between border-t border-border/60 pt-3 text-[10px]">
                  <span className="font-bold text-text-muted uppercase">Source: {job.source}</span>

                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 font-black uppercase rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
