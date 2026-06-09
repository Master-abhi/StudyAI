import React, { useState, useEffect } from 'react';
import { 
  Award, Plus, Trash2, Loader2, ShieldAlert, CheckCircle, Info
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  desc: string;
  criteriaType: 'streak' | 'tests' | 'mcqs' | 'xp' | 'accuracy';
  criteriaValue: number;
  icon: string;
  emoji: string;
  color: string;
  createdAt?: string;
}

interface AdminBadgesProps {
  currentUser: any;
}

export const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <Award className={className} />;
  return <IconComponent className={className} />;
};

const COLOR_PRESETS = [
  {
    name: 'Blue / Indigo',
    value: 'from-blue-500/15 to-indigo-500/15 border-blue-500/25 text-blue-400'
  },
  {
    name: 'Orange / Red',
    value: 'from-orange-500/15 to-red-500/15 border-orange-500/25 text-orange-400'
  },
  {
    name: 'Amber / Yellow',
    value: 'from-amber-500/15 to-yellow-500/15 border-amber-500/25 text-yellow-400'
  },
  {
    name: 'Emerald / Teal',
    value: 'from-emerald-500/15 to-teal-500/15 border-emerald-500/25 text-emerald-400'
  },
  {
    name: 'Purple / Pink',
    value: 'from-purple-500/15 to-pink-500/15 border-purple-500/25 text-purple-400'
  },
  {
    name: 'Red / Rose',
    value: 'from-red-500/15 to-rose-500/15 border-red-500/25 text-red-400'
  }
];

const ICON_PRESETS = [
  { name: 'Rocket (🚀)', icon: 'Rocket', emoji: '🚀' },
  { name: 'Flame (🔥)', icon: 'Flame', emoji: '🔥' },
  { name: 'Trophy (🏆)', icon: 'Trophy', emoji: '🏆' },
  { name: 'Star (⭐)', icon: 'Star', emoji: '⭐' },
  { name: 'BookOpen (📖)', icon: 'BookOpen', emoji: '📖' },
  { name: 'Target (🎯)', icon: 'Target', emoji: '🎯' },
  { name: 'Award (🏅)', icon: 'Award', emoji: '🏅' },
  { name: 'Brain (🧠)', icon: 'Brain', emoji: '🧠' },
  { name: 'Cpu (💻)', icon: 'Cpu', emoji: '💻' }
];

export const AdminBadges: React.FC<AdminBadgesProps> = ({ currentUser }) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Form states
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [criteriaType, setCriteriaType] = useState<'streak' | 'tests' | 'mcqs' | 'xp' | 'accuracy'>('streak');
  const [criteriaValue, setCriteriaValue] = useState<number>(3);
  const [iconSelection, setIconSelection] = useState<number>(1); // default index for Flame
  const [colorSelection, setColorSelection] = useState<string>(COLOR_PRESETS[1].value); // default Orange/Red

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

  const fetchBadgesList = async () => {
    setLoading(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/user/badges'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBadges(data || []);
      } else {
        throw new Error('Failed to retrieve achievements list.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Could not load badge list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchBadgesList();
    }
  }, [currentUser]);

  const handleCreateBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !desc.trim()) {
      setErrorMessage('Please fill out all badge details.');
      return;
    }

    setSubmitLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const selectedIcon = ICON_PRESETS[iconSelection];
      const token = await currentUser.getIdToken();

      const payload = {
        name: name.trim(),
        desc: desc.trim(),
        criteriaType,
        criteriaValue: Number(criteriaValue),
        icon: selectedIcon.icon,
        emoji: selectedIcon.emoji,
        color: colorSelection
      };

      const res = await fetch(getApiUrl('/api/admin/badges'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Badge "${name}" created successfully!`);
        setName('');
        setDesc('');
        setCriteriaValue(3);
        fetchBadgesList();
      } else {
        throw new Error(data.error || 'Server rejected the badge creation request.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to save new badge configuration.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteBadge = async (badgeId: string, badgeName: string) => {
    if (!window.confirm(`Are you sure you want to delete the badge "${badgeName}"?`)) return;

    setDeleteLoading(badgeId);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/badges/${badgeId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setSuccessMessage(`Badge "${badgeName}" deleted successfully.`);
        fetchBadgesList();
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete badge.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error occurred while deleting badge.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const selectedIcon = ICON_PRESETS[iconSelection];

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full font-sans">
      
      {/* Messages */}
      {successMessage && (
        <div className="p-4 bg-greenL/10 border border-greenL/25 text-greenL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in shadow">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="ml-auto text-greenL/60 hover:text-greenL">✕</button>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/25 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in shadow">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="ml-auto text-redL/60 hover:text-redL">✕</button>
        </div>
      )}

      {/* Main Grid: Creator panel on Left, Live Registry on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Creator Panel (Col span 5) */}
        <div className="xl:col-span-5 bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Plus className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">Configure New Achievement</h3>
          </div>

          <form onSubmit={handleCreateBadge} className="flex flex-col gap-4">
            
            {/* Badge Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Badge Name / मेडल का नाम</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Speed Runner"
                maxLength={40}
                required
                disabled={submitLoading}
                className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none"
              />
            </div>

            {/* Badge Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Description / वर्णन</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="e.g. Complete a full mock test in under 60 minutes."
                maxLength={100}
                required
                disabled={submitLoading}
                className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none"
              />
            </div>

            {/* Criteria & Value Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Unlock Metric</label>
                <select
                  value={criteriaType}
                  onChange={(e) => {
                    const type = e.target.value as any;
                    setCriteriaType(type);
                    if (type === 'accuracy') setCriteriaValue(75);
                    else if (type === 'xp') setCriteriaValue(500);
                    else if (type === 'mcqs') setCriteriaValue(50);
                    else if (type === 'tests') setCriteriaValue(1);
                    else setCriteriaValue(3);
                  }}
                  disabled={submitLoading}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="streak">Study Streak (Days)</option>
                  <option value="tests">Tests Taken (Count)</option>
                  <option value="mcqs">MCQs Solved (Count)</option>
                  <option value="xp">Total XP Earned</option>
                  <option value="accuracy">Average Accuracy (%)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Target Value</label>
                <input
                  type="number"
                  value={criteriaValue}
                  onChange={(e) => setCriteriaValue(Math.max(1, parseInt(e.target.value) || 0))}
                  min={1}
                  required
                  disabled={submitLoading}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none"
                />
              </div>
            </div>

            {/* Icon Presets & Color Presets Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Select Icon</label>
                <select
                  value={iconSelection}
                  onChange={(e) => setIconSelection(Number(e.target.value))}
                  disabled={submitLoading}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                >
                  {ICON_PRESETS.map((ic, idx) => (
                    <option key={ic.icon} value={idx}>{ic.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Select Color Theme</label>
                <select
                  value={colorSelection}
                  onChange={(e) => setColorSelection(e.target.value)}
                  disabled={submitLoading}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                >
                  {COLOR_PRESETS.map((col) => (
                    <option key={col.value} value={col.value}>{col.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* LIVE PREVIEW BLOCK */}
            <div className="flex flex-col gap-1.5 border border-border/60 p-3 rounded-lg bg-bg-s3/40 mt-1 select-none">
              <span className="text-[9px] font-black uppercase text-text-muted">Live Preview / मेडल का पूर्वावलोकन</span>
              <div className="flex justify-center py-4">
                <div className={`p-4 border rounded-xl flex items-center gap-3 w-64 bg-gradient-to-br ${colorSelection} shadow border-saffron-border/30`}>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 rounded-full blur-md" />
                  <DynamicIcon name={selectedIcon.icon} className="w-7 h-7 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-black text-text uppercase tracking-wide truncate">{name || 'Badge Name'}</span>
                    <span className="text-[9px] text-text-muted mt-0.5 leading-snug truncate">{desc || 'Achievement description...'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitLoading || !name.trim() || !desc.trim()}
              className="w-full mt-2 py-3 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
            >
              {submitLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving Badge Configuration...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register Badge</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Registry (Col span 7) */}
        <div className="xl:col-span-7 bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Award className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">Achievements Registry</h3>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-text-muted">
              <Loader2 className="w-6 h-6 animate-spin text-saffron" />
              <span className="text-[10px] font-black uppercase tracking-wider">Loading Achievements List...</span>
            </div>
          ) : badges.length === 0 ? (
            <div className="text-center py-12 text-xs text-text-muted border border-dashed border-border/60 rounded-lg">
              No custom badges configured. Add one using the form on the left.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`p-4 border rounded-xl flex items-center gap-3 relative overflow-hidden bg-gradient-to-br ${badge.color} shadow border-saffron-border/30`}
                >
                  <DynamicIcon name={badge.icon} className="w-7 h-7 shrink-0" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] font-black text-text uppercase tracking-wide truncate" title={badge.name}>
                      {badge.name}
                    </span>
                    <span className="text-[9px] text-text-muted mt-0.5 leading-snug" title={badge.desc}>
                      {badge.desc}
                    </span>
                    
                    {/* Render Criteria Rule */}
                    <div className="flex items-center gap-1.5 mt-2 text-[8px] font-black uppercase text-text-muted/80 bg-bg-s3/40 border border-border/40 px-2 py-0.5 rounded w-max select-none">
                      <Info className="w-2.5 h-2.5 text-saffron" />
                      <span>
                        Rule: {badge.criteriaType} &gt;= {badge.criteriaValue}
                        {badge.criteriaType === 'accuracy' && '%'}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteBadge(badge.id, badge.name)}
                    disabled={deleteLoading !== null}
                    className="p-2 bg-bg-s3/80 hover:bg-red-500/10 border border-border/55 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-all self-start shrink-0 disabled:opacity-40"
                    title="Remove Badge Configuration"
                  >
                    {deleteLoading === badge.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
