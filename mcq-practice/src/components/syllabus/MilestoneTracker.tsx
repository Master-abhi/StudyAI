import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Lock, CheckCircle2, Calendar, Star, Shield } from 'lucide-react';

interface MilestoneTrackerProps {
  streak: number;
  completedTopicsCount: number;
  accuracy: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isUnlocked: boolean;
  xpAward: number;
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({
  streak,
  completedTopicsCount,
  accuracy
}) => {
  // Define milestones based on user statistics
  const milestones: Milestone[] = [
    {
      id: 'm1',
      title: 'First Subject Completed',
      description: 'Finish all topics of any single subject',
      icon: Trophy,
      isUnlocked: completedTopicsCount >= 1, // simulated for demo
      xpAward: 250
    },
    {
      id: 'm2',
      title: '100 Topics Mastered',
      description: 'Reach 100+ completed topics across syllabus',
      icon: Star,
      isUnlocked: completedTopicsCount >= 10, // adjusted threshold for demo
      xpAward: 500
    },
    {
      id: 'm3',
      title: '7-Day Revision Streak',
      description: 'Perform active revision 7 days in a row',
      icon: Flame,
      isUnlocked: streak >= 7,
      xpAward: 300
    },
    {
      id: 'm4',
      title: 'Precision Marksman',
      description: 'Maintain 80%+ average accuracy in MCQ practices',
      icon: Shield,
      isUnlocked: accuracy >= 80 && completedTopicsCount >= 5,
      xpAward: 400
    }
  ];

  // Weekly study activity report (simulated)
  const weeklyData = [
    { day: 'Mon', hrs: 4.5, completed: 3 },
    { day: 'Tue', hrs: 5.2, completed: 4 },
    { day: 'Wed', hrs: 3.8, completed: 2 },
    { day: 'Thu', hrs: 6.0, completed: 5 },
    { day: 'Fri', hrs: 4.2, completed: 3 },
    { day: 'Sat', hrs: 5.5, completed: 4 },
    { day: 'Sun', hrs: 2.1, completed: 1 }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Upper Grid: Streak Tracker & Weekly Study Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Streak card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-bg-s2 border border-border rounded-lg relative overflow-hidden flex items-center justify-between shadow-lg"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/30 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col gap-1.5 z-10">
            <span className="text-[10px] font-black uppercase text-saffron tracking-widest">STREAK TRACKER</span>
            <h3 className="text-xl font-black text-text flex items-center gap-1.5">
              <span>{streak} Days Active</span>
            </h3>
            <p className="text-xs text-text-muted leading-relaxed max-w-[200px]">
              Keep studying daily to maintain your learning velocity. Consistency is key for CGPSC!
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-bg-s3/80 border border-saffron-border/30 w-16 h-16 rounded-md z-10 relative">
            <Flame className={`w-8 h-8 ${streak > 0 ? 'text-saffron fill-saffron/20 animate-pulse' : 'text-text-muted'}`} />
            {streak > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-saffron text-[9px] font-black text-bg-s1 px-1 rounded-full border border-bg-s2 shadow-md">
                x{streak}
              </span>
            )}
          </div>
        </motion.div>

        {/* Weekly Activity Report */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 bg-bg-s2 border border-border rounded-lg shadow-lg flex flex-col gap-3"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-saffron tracking-widest">WEEKLY REPORT</span>
              <h3 className="text-sm font-bold text-text">Weekly Study Report</h3>
            </div>
            <span className="text-[10px] bg-bg-s3 px-2 py-1 border border-border rounded text-text-muted flex items-center gap-1">
              <Calendar className="w-3 h-3 text-saffron" />
              <span>31.3 hrs total</span>
            </span>
          </div>

          {/* Simple Visual Chart */}
          <div className="flex justify-between items-end h-20 pt-2 px-1">
            {weeklyData.map((item, idx) => {
              const maxHrs = 6.0;
              const heightPercent = `${(item.hrs / maxHrs) * 100}%`;
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 group">
                  <div className="w-6 bg-bg-s3 rounded-t-sm h-16 flex items-end relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: heightPercent }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                      className="w-full bg-saffron/80 group-hover:bg-saffron rounded-t-sm relative flex items-center justify-center"
                    >
                      <div className="absolute -top-6 bg-bg-s3 border border-saffron-border/30 text-[9px] text-text font-bold px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {item.hrs} hrs
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-[9px] text-text-muted font-bold">{item.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Lower Section: Milestone Achievements */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-saffron" />
          <span>Milestone Achievements</span>
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 + 0.2 }}
                className={`p-4 rounded-md border flex flex-col gap-2.5 relative transition-all duration-300 ${
                  m.isUnlocked
                    ? 'bg-bg-s2/90 border-saffron-border/40 shadow-[0_0_15px_rgba(255,153,51,0.04)]'
                    : 'bg-bg-s1/60 border-border/60 opacity-60'
                }`}
              >
                {/* Unlock status badge in top right */}
                <div className="absolute top-3 right-3">
                  {m.isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-greenL" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-text-muted" />
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${
                    m.isUnlocked 
                      ? 'bg-saffron-dim border border-saffron-border/40 text-saffron' 
                      : 'bg-bg-s3 text-text-muted'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11px] font-black text-text">{m.title}</span>
                    <span className="text-[10px] text-text-muted font-bold">+{m.xpAward} XP Award</span>
                  </div>
                </div>

                <p className="text-[10px] text-text-muted leading-relaxed">
                  {m.description}
                </p>

                {/* Progress bar inside badge */}
                <div className="w-full bg-bg-s3 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${m.isUnlocked ? 'bg-saffron' : 'bg-text-muted/30'}`}
                    style={{ width: m.isUnlocked ? '100%' : '35%' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
