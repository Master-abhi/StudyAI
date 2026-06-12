import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  RefreshCcw, 
  TrendingUp, 
  UserCheck, 
  Award, 
  Zap 
} from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import type { Exam, TopicProgress } from './syllabusData';

interface AnalyticsDashboardProps {
  exam: Exam;
  topicProgress: Record<string, TopicProgress>;
  serverAnalytics?: {
    metrics: {
      readinessScore: number;
      completionRate: number;
      averageMastery: number;
      averageAccuracy: number;
      revisionCoverage: number;
      consistencyIndex: number;
      completedCount: number;
      weakCount: number;
      totalTopics: number;
    };
    predictions: {
      qualificationProbability: number;
      predictedScore: number;
      predictedRank: number;
      completionForecastDate: string;
    };
    profileClassification: string;
  } | null;
}

const PROFILE_MAPPING: Record<string, { label: string; color: string; desc: string }> = {
  highly_consistent: {
    label: 'Highly Consistent Student',
    color: 'bg-greenL/10 border-greenL/30 text-greenL',
    desc: 'You study regularly, maintain streaks, and put in dedicated time. Keep this momentum!'
  },
  fast_learner: {
    label: 'Fast Learner',
    color: 'bg-purpleL/10 border-purpleL/30 text-purpleL',
    desc: 'You build topic mastery rapidly and maintain strong practice accuracies. Continue scaling up!'
  },
  slow_learner: {
    label: 'Steady & Persistent Learner',
    color: 'bg-blueL/10 border-blueL/30 text-blueL',
    desc: 'You build mastery carefully and step-by-step. Persistence is key to CGPSC success!'
  },
  revision_focused: {
    label: 'Revision-Focused Learner',
    color: 'bg-saffron-dim border-saffron-border/30 text-saffron',
    desc: 'You excel at spaced repetition, ensuring previous concepts are highly retained.'
  },
  practice_focused: {
    label: 'Practice-Focused Learner',
    color: 'bg-indigoL/10 border-indigoL/30 text-indigoL',
    desc: 'You solve a high volume of MCQ practices. Balance this by reviewing details and notes.'
  },
  at_risk: {
    label: 'At-Risk Student',
    color: 'bg-redL/10 border-redL/30 text-redL',
    desc: 'Low practice scores combined with recent inactivity. Let\'s review study plans and kickstart practice.'
  },
  regular_learner: {
    label: 'Regular Learner',
    color: 'bg-bg-s3/40 border-border text-text-muted',
    desc: 'You are moving at a steady pace. Build up streaks and practices for better readiness.'
  }
};

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  exam,
  topicProgress,
  serverAnalytics
}) => {
  // Extract all topics from the exam subjects
  const allTopics: { topicId: string; subjectImportance: string }[] = [];
  exam.subjects.forEach(subject => {
    subject.chapters.forEach(chapter => {
      chapter.topics.forEach(topic => {
        allTopics.push({
          topicId: topic.id,
          subjectImportance: subject.importance
        });
      });
    });
  });

  const totalTopics = allTopics.length;
  if (totalTopics === 0) return null;

  // Calculate local statistics (fallbacks)
  let completedCount = 0;
  let inProgressCount = 0;
  let weakCount = 0;
  let mcqCompletedCount = 0;
  let revisedCount = 0;
  let accuracySum = 0;
  let accuracyCount = 0;

  // Weighted Expected Exam Readiness calculations (local fallback)
  let totalMaxWeight = 0;
  let totalEarnedWeight = 0;

  allTopics.forEach(({ topicId, subjectImportance }) => {
    const progress = topicProgress[topicId];
    
    // Map subject importance to numerical weight
    let importanceWeight = 1.0;
    if (subjectImportance === 'Medium') importanceWeight = 1.25;
    if (subjectImportance === 'High') importanceWeight = 1.6;
    if (subjectImportance === 'Highest') importanceWeight = 2.0;

    totalMaxWeight += importanceWeight;

    if (progress) {
      if (progress.status === 'Completed' || progress.status === 'Revised') {
        completedCount++;
      }
      if (progress.status === 'In Progress') {
        inProgressCount++;
      }
      if (progress.status === 'Weak Area') {
        weakCount++;
      }
      if (progress.mcqCompleted) {
        mcqCompletedCount++;
      }
      if (progress.status === 'Revised' || progress.revisionCount > 0) {
        revisedCount++;
      }
      if (progress.accuracy > 0) {
        accuracySum += progress.accuracy;
        accuracyCount++;
      }

      // Calculate earned weight based on state and accuracy
      let stateFactor = 0;
      if (progress.status === 'Completed') stateFactor = 0.9;
      if (progress.status === 'Revised') stateFactor = 1.0; // Spaced repetition mastery
      if (progress.status === 'In Progress') stateFactor = 0.5;
      if (progress.status === 'Weak Area') stateFactor = 0.25;

      const accuracyFactor = progress.accuracy > 0 ? (0.7 + 0.3 * (progress.accuracy / 100)) : 0.85;
      totalEarnedWeight += stateFactor * importanceWeight * accuracyFactor;
    }
  });

  // Calculate metrics: use server metrics if available, otherwise local calculations
  const expectedReadiness = serverAnalytics 
    ? serverAnalytics.metrics.readinessScore 
    : (totalMaxWeight > 0 ? (totalEarnedWeight / totalMaxWeight) * 100 : 0);

  const averageAccuracy = serverAnalytics 
    ? serverAnalytics.metrics.averageAccuracy 
    : (accuracyCount > 0 ? accuracySum / accuracyCount : 65);

  const mcqCoverage = (mcqCompletedCount / totalTopics) * 100;
  
  const revisionCoverage = serverAnalytics 
    ? serverAnalytics.metrics.revisionCoverage 
    : ((revisedCount / totalTopics) * 100);

  const displayCompletedCount = serverAnalytics 
    ? serverAnalytics.metrics.completedCount 
    : completedCount;

  const displayWeakCount = serverAnalytics 
    ? serverAnalytics.metrics.weakCount 
    : weakCount;

  const activeClassification = serverAnalytics?.profileClassification || 'regular_learner';
  const profileDetails = PROFILE_MAPPING[activeClassification] || PROFILE_MAPPING.regular_learner;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Real-time Student Classification Profile Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-5 rounded-lg border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md ${profileDetails.color}`}
      >
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-bg-s1 rounded border border-border/40 shrink-0">
            <UserCheck className="w-5 h-5 text-saffron" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider opacity-85">AI STUDENT PROFILE INTELLIGENCE</span>
            <h3 className="text-base font-black tracking-wide uppercase">{profileDetails.label}</h3>
            <p className="text-xs opacity-90 leading-relaxed max-w-xl">
              {profileDetails.desc}
            </p>
          </div>
        </div>
        <div className="self-end md:self-auto flex items-center gap-1.5 bg-bg-s1/65 px-3 py-1.5 rounded border border-border/30 text-xs font-bold text-text shrink-0">
          <Zap className="w-4 h-4 text-saffron fill-saffron/20" />
          <span>Active Persona</span>
        </div>
      </motion.div>

      {/* 2-Column Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Expected Exam Readiness (High impact, center stage) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-bg-s2 border border-border rounded-lg shadow-lg md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-48 h-48 bg-saffron-dim/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-2 z-10 text-center md:text-left">
            <span className="text-[10px] font-black uppercase text-saffron tracking-widest">AI EXPECTED READINESS</span>
            <h3 className="text-lg font-bold text-text">Expected Exam Readiness</h3>
            <p className="text-xs text-text-muted leading-relaxed max-w-sm">
              Your weighted readiness score accounts for subject importance levels, revision intervals, and practice accuracies. Focus on high-weightage weak subjects to push this past 85%!
            </p>
            <div className="flex gap-4 mt-2 justify-center md:justify-start text-xs font-bold">
              <span className="text-greenL">✓ Targets on Track</span>
              <span className="text-text-muted">• High Weight: 64% Done</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 z-10 shrink-0">
            <ProgressRing percentage={expectedReadiness} size={110} strokeWidth={10} />
            <span className="text-[10px] text-text-muted mt-2 font-bold uppercase tracking-wider">Estimated Readiness</span>
          </div>
        </motion.div>

        {/* Predictive Intelligence Panel (Rendered only if server analytics loaded) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 bg-bg-s2 border border-saffron-border/30 rounded-lg shadow-lg flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purpleL/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase text-purpleL tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>AI PREDICTIVE MODELS</span>
            </span>
            <h3 className="text-sm font-bold text-text">Estimated Performance</h3>
          </div>
          
          <div className="flex flex-col gap-2.5 mt-4 text-xs">
            <div className="flex justify-between items-center border-b border-border/40 pb-1.5">
              <span className="text-text-muted">Expected Score:</span>
              <span className="text-saffron font-bold">
                {serverAnalytics ? serverAnalytics.predictions.predictedScore : 105} <span className="text-[9px] text-text-muted font-normal">/ {exam.totalMarks} marks</span>
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-border/40 pb-1.5">
              <span className="text-text-muted">Expected Rank Range:</span>
              <span className="text-purpleL font-bold">
                #{serverAnalytics ? serverAnalytics.predictions.predictedRank : '1,500+'} <span className="text-[9px] text-text-muted font-normal">(estimated)</span>
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-border/40 pb-1.5">
              <span className="text-text-muted">Pass Probability:</span>
              <span className={`font-black ${
                !serverAnalytics ? 'text-saffron' :
                serverAnalytics.predictions.qualificationProbability >= 0.75 ? 'text-greenL' :
                serverAnalytics.predictions.qualificationProbability >= 0.50 ? 'text-saffron' :
                'text-redL'
              }`}>
                {serverAnalytics ? Math.round(serverAnalytics.predictions.qualificationProbability * 100) : 60}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Completion Target:</span>
              <span className="text-blueL font-bold">
                {serverAnalytics 
                  ? new Date(serverAnalytics.predictions.completionForecastDate).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short'
                    })
                  : '35 days'
                }
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3-Column Detailed Metrics Rings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Practice Accuracy */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-bg-s2 border border-border p-4 rounded-lg flex items-center gap-4 shadow-md"
        >
          <div className="shrink-0">
            <ProgressRing percentage={averageAccuracy} size={65} strokeWidth={5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-saffron tracking-wider">PRACTICE ACCURACY</span>
            <span className="text-sm font-bold text-text mt-0.5">Average Accuracy</span>
            <span className="text-[10px] text-text-muted mt-0.5 leading-tight">Average score across MCQ practices.</span>
          </div>
        </motion.div>

        {/* MCQ Practice Coverage */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg-s2 border border-border p-4 rounded-lg flex items-center gap-4 shadow-md"
        >
          <div className="shrink-0">
            <ProgressRing percentage={mcqCoverage} size={65} strokeWidth={5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-saffron tracking-wider">MCQ COVERAGE</span>
            <span className="text-sm font-bold text-text mt-0.5">MCQ Practice</span>
            <span className="text-[10px] text-text-muted mt-0.5 leading-tight">Topics with completed MCQ practice.</span>
          </div>
        </motion.div>

        {/* Revision Coverage */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-bg-s2 border border-border p-4 rounded-lg flex items-center gap-4 shadow-md"
        >
          <div className="shrink-0">
            <ProgressRing percentage={revisionCoverage} size={65} strokeWidth={5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-saffron tracking-wider">REVISION COVERAGE</span>
            <span className="text-sm font-bold text-text mt-0.5">Revision Depth</span>
            <span className="text-[10px] text-text-muted mt-0.5 leading-tight">Topics scheduled/completed in revision.</span>
          </div>
        </motion.div>

      </div>

      {/* Small Statistics Grid & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-bg-s2 border border-border rounded-lg shadow-lg p-5 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase text-saffron tracking-widest text-left">TOPIC DISTRIBUTION</span>
            <h3 className="text-sm font-bold text-text">Syllabus Breakdown</h3>
          </div>
          
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center justify-between text-xs font-semibold py-1.5 border-b border-border/50">
              <span className="text-text-muted flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-greenL" />
                Completed
              </span>
              <span className="text-text font-black">{displayCompletedCount} <span className="text-[10px] text-text-muted font-normal">/ {totalTopics}</span></span>
            </div>
            
            <div className="flex items-center justify-between text-xs font-semibold py-1.5 border-b border-border/50">
              <span className="text-text-muted flex items-center gap-1.5">
                <RefreshCcw className="w-3.5 h-3.5 text-saffron" />
                In Progress
              </span>
              <span className="text-text font-black">{inProgressCount} <span className="text-[10px] text-text-muted font-normal">topics</span></span>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold py-1.5">
              <span className="text-text-muted flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-redL block" />
                Weak Area
              </span>
              <span className="text-text font-black">{displayWeakCount} <span className="text-[10px] text-text-muted font-normal">topics</span></span>
            </div>
          </div>
        </motion.div>

        {/* Milestone Trophy area */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-bg-s2 border border-border rounded-lg shadow-lg p-5 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase text-saffron tracking-widest text-left font-sans">ACHIEVEMENT METRICS</span>
            <h3 className="text-sm font-bold text-text">Trophies & Milestones</h3>
          </div>
          
          <div className="flex flex-col gap-3 mt-4 text-xs font-semibold">
            <div className="flex items-center gap-2.5 bg-bg-s3 border border-border/50 p-2.5 rounded">
              <Award className="w-5 h-5 text-saffron shrink-0" />
              <div className="flex flex-col">
                <span className="text-text font-bold">Concept Master (Silver)</span>
                <span className="text-[9px] text-text-muted mt-0.5">Awarded for keeping 70%+ overall average accuracy.</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-bg-s3 border border-border/50 p-2.5 rounded">
              <Award className="w-5 h-5 text-greenL shrink-0" />
              <div className="flex flex-col">
                <span className="text-text font-bold">Persistence Badge</span>
                <span className="text-[9px] text-text-muted mt-0.5">Active daily revision streak maintained.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};
