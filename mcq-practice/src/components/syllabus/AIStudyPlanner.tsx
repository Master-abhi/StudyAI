import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BrainCircuit, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import type { Exam, TopicProgress, Subject } from './syllabusData';

interface AIStudyPlannerProps {
  exam: Exam;
  topicProgress: Record<string, TopicProgress>;
  onQuickAction: (actionType: string, subjectId: string, topicId: string) => void;
  serverRecommendations?: {
    topicId: string;
    subjectId: string;
    reason: string;
    priority: number;
  }[] | null;
}

interface Recommendation {
  id: string;
  type: 'weakness' | 'progress' | 'revision' | 'high_priority';
  title: string;
  description: string;
  actionText: string;
  subjectId: string;
  topicId: string;
}

export const AIStudyPlanner: React.FC<AIStudyPlannerProps> = ({
  exam,
  topicProgress,
  onQuickAction,
  serverRecommendations
}) => {
  // 1. Generate Dynamic Recommendations
  const recommendations: Recommendation[] = [];

  // Populate with server recommendations first if available
  if (serverRecommendations && serverRecommendations.length > 0) {
    serverRecommendations.forEach(sr => {
      let matchedTopic: any = null;
      let matchedSubject: any = null;
      
      exam.subjects.forEach(sub => {
        sub.chapters.forEach(chap => {
          const t = chap.topics.find(top => top.id === sr.topicId);
          if (t) {
            matchedTopic = t;
            matchedSubject = sub;
          }
        });
      });

      if (matchedTopic && matchedSubject) {
        recommendations.push({
          id: `server-rec-${sr.topicId}`,
          type: sr.priority >= 9 ? 'revision' : (sr.priority >= 8 ? 'weakness' : 'high_priority'),
          title: matchedTopic.nameHi || matchedTopic.name,
          description: sr.reason,
          actionText: sr.priority >= 9 ? 'Start Revision' : 'Practice MCQs',
          subjectId: matchedSubject.id,
          topicId: sr.topicId
        });
      }
    });
  }
  
  // Scanners for fallback client-calculated recommendations
  const weakTopics: { topic: any; subject: Subject }[] = [];
  const inProgressTopics: { topic: any; subject: Subject }[] = [];
  const unstartedHighWeightTopics: { topic: any; subject: Subject }[] = [];
  const overdueRevisionTopics: { topic: any; subject: Subject; progress: TopicProgress }[] = [];

  const today = new Date();

  exam.subjects.forEach(subject => {
    subject.chapters.forEach(chapter => {
      chapter.topics.forEach(topic => {
        const progress = topicProgress[topic.id];
        
        if (progress) {
          if (progress.status === 'Weak Area') {
            weakTopics.push({ topic, subject });
          } else if (progress.status === 'In Progress') {
            inProgressTopics.push({ topic, subject });
          }
          
          if (progress.nextRevisionDate) {
            const dueDate = new Date(progress.nextRevisionDate);
            if (dueDate <= today && (progress.status === 'Completed' || progress.status === 'Weak Area')) {
              overdueRevisionTopics.push({ topic, subject, progress });
            }
          }
        } else {
          if (subject.importance === 'Highest' || subject.importance === 'High') {
            unstartedHighWeightTopics.push({ topic, subject });
          }
        }
      });
    });
  });

  // Assemble top recommendations (up to 3-4 items)
  // Priority 1: Overdue Revisions of Weak Areas
  overdueRevisionTopics.forEach(({ topic, subject }) => {
    if (recommendations.length >= 3) return;
    if (recommendations.some(r => r.topicId === topic.id)) return;
    recommendations.push({
      id: `rec-rev-${topic.id}`,
      type: 'revision',
      title: `Revise ${topic.nameHi}`,
      description: `Spaced repetition suggests a recap of this topic in ${subject.name}. Accuracy: ${topicProgress[topic.id]?.accuracy || 0}%`,
      actionText: 'Start Revision',
      subjectId: subject.id,
      topicId: topic.id
    });
  });

  // Priority 2: Serious Weak Areas in Highest/High subjects
  weakTopics.forEach(({ topic, subject }) => {
    if (recommendations.length >= 3) return;
    if (recommendations.some(r => r.topicId === topic.id)) return;
    const progress = topicProgress[topic.id];
    recommendations.push({
      id: `rec-weak-${topic.id}`,
      type: 'weakness',
      title: `Focus on ${topic.nameHi}`,
      description: `Your average practice accuracy is low (${progress?.accuracy || 0}%) in ${subject.name}. Solve practice MCQs.`,
      actionText: 'Practice MCQs',
      subjectId: subject.id,
      topicId: topic.id
    });
  });

  // Priority 3: High Priority Unstarted topics
  unstartedHighWeightTopics.forEach(({ topic, subject }) => {
    if (recommendations.length >= 3) return;
    if (recommendations.some(r => r.topicId === topic.id)) return;
    recommendations.push({
      id: `rec-high-${topic.id}`,
      type: 'high_priority',
      title: `Start learning ${topic.nameHi}`,
      description: `This is a highly-weighted chapter in ${subject.name} with frequent PYQs. Read notes or watch video first.`,
      actionText: 'Read Notes',
      subjectId: subject.id,
      topicId: topic.id
    });
  });

  // Priority 4: In Progress topics to lock in
  inProgressTopics.forEach(({ topic, subject }) => {
    if (recommendations.length >= 3) return;
    if (recommendations.some(r => r.topicId === topic.id)) return;
    recommendations.push({
      id: `rec-prog-${topic.id}`,
      type: 'progress',
      title: `Complete ${topic.nameHi}`,
      description: `You have started this topic in ${subject.name}. Complete video sessions or practice tests to finish.`,
      actionText: 'Watch Video',
      subjectId: subject.id,
      topicId: topic.id
    });
  });

  // Fallback defaults if recommendations are empty
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'rec-default-1',
      type: 'high_priority',
      title: 'Practice Daily Mock Test',
      description: 'Strengthen overall syllabus coverage by solving full-length sectional tests.',
      actionText: 'Solve Mock Test',
      subjectId: '',
      topicId: ''
    });
  }

  // 2. Classify Subjects: Strong, Weak, Revision Needed
  const subjectAnalysisList: {
    subject: Subject;
    accuracy: number;
    completion: number;
    weakCount: number;
    status: 'strong' | 'weak' | 'revision';
  }[] = [];

  exam.subjects.forEach(subject => {
    let subTotal = 0;
    let subCompleted = 0;
    let subAccuracySum = 0;
    let subAccuracyCount = 0;
    let subWeakCount = 0;

    subject.chapters.forEach(chapter => {
      chapter.topics.forEach(topic => {
        subTotal++;
        const progress = topicProgress[topic.id];
        if (progress) {
          if (progress.status === 'Completed' || progress.status === 'Revised') {
            subCompleted++;
          }
          if (progress.status === 'Weak Area') {
            subWeakCount++;
          }
          if (progress.accuracy > 0) {
            subAccuracySum += progress.accuracy;
            subAccuracyCount++;
          }
        }
      });
    });

    const completionRate = subTotal > 0 ? (subCompleted / subTotal) * 100 : 0;
    const avgAccuracy = subAccuracyCount > 0 ? subAccuracySum / subAccuracyCount : 0;

    let subStatus: 'strong' | 'weak' | 'revision' = 'revision';
    if (subWeakCount >= 2 || (avgAccuracy > 0 && avgAccuracy < 60)) {
      subStatus = 'weak';
    } else if (completionRate >= 40 && avgAccuracy >= 75) {
      subStatus = 'strong';
    }

    subjectAnalysisList.push({
      subject,
      accuracy: avgAccuracy,
      completion: completionRate,
      weakCount: subWeakCount,
      status: subStatus
    });
  });

  const strongSubjects = subjectAnalysisList.filter(s => s.status === 'strong');
  const weakSubjects = subjectAnalysisList.filter(s => s.status === 'weak');
  const revisionSubjects = subjectAnalysisList.filter(s => s.status === 'revision');

  return (
    <div className="flex flex-col gap-6">
      
      {/* Personalized AI Recommendations Feed */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
          <BrainCircuit className="w-4 h-4 text-saffron" />
          <span>Recommended Next Steps</span>
        </h4>

        <div className="flex flex-col gap-3">
          {recommendations.map((rec, idx) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-bg-s2 border border-border hover:border-saffron-border/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded shrink-0 mt-0.5 ${
                  rec.type === 'weakness' ? 'bg-redL/10 text-redL border border-redL/25' :
                  rec.type === 'revision' ? 'bg-saffron-dim text-saffron border border-saffron-border/30' :
                  rec.type === 'high_priority' ? 'bg-amberL/10 text-amberL border border-amberL/20' :
                  'bg-blueL/10 text-blueL border border-blueL/20'
                }`}>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-text group-hover:text-saffron transition-colors">
                    {rec.title}
                  </span>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onQuickAction(rec.actionText, rec.subjectId, rec.topicId)}
                className="self-end sm:self-auto px-3.5 py-1.5 bg-bg-s3 hover:bg-saffron text-[10px] font-black uppercase text-text hover:text-bg-s1 rounded border border-border group-hover:border-saffron-border/40 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{rec.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Priority Subject Board (Strong, Weak, Revision categories) */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
          <span>Priority Subject Analysis</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Weak / Critical Priority */}
          <div className="bg-bg-s2 border border-border rounded-lg p-4 flex flex-col gap-3 shadow-md">
            <h5 className="text-xs font-bold text-redL flex items-center gap-1.5 pb-2 border-b border-border/40">
              <AlertTriangle className="w-4 h-4" />
              <span>Needs Urgent Focus</span>
            </h5>
            
            <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto max-h-[160px] pr-1">
              {weakSubjects.length > 0 ? (
                weakSubjects.map(sub => (
                  <div key={sub.subject.id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-bold text-text leading-tight">
                      <span className="truncate max-w-[140px]">{sub.subject.name}</span>
                      <span className="text-redL">{sub.accuracy > 0 ? `${Math.round(sub.accuracy)}% Acc` : 'Needs Practice'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-text-muted">
                      <span>Completion: {Math.round(sub.completion)}%</span>
                      <span className="bg-red-500/10 border border-red-500/20 text-redL px-1.5 rounded">{sub.subject.importance}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-24 text-center">
                  <CheckCircle className="w-7 h-7 text-greenL/60 mb-1" />
                  <span className="text-[10px] text-text-muted">No weak subjects detected! Great performance.</span>
                </div>
              )}
            </div>
          </div>

          {/* Requires Revision */}
          <div className="bg-bg-s2 border border-border rounded-lg p-4 flex flex-col gap-3 shadow-md">
            <h5 className="text-xs font-bold text-saffron flex items-center gap-1.5 pb-2 border-b border-border/40">
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Revision Required</span>
            </h5>
            
            <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto max-h-[160px] pr-1">
              {revisionSubjects.length > 0 ? (
                revisionSubjects.map(sub => (
                  <div key={sub.subject.id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-bold text-text leading-tight">
                      <span className="truncate max-w-[140px]">{sub.subject.name}</span>
                      <span className="text-saffron">{sub.accuracy > 0 ? `${Math.round(sub.accuracy)}% Acc` : 'Study in Progress'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-text-muted">
                      <span>Completion: {Math.round(sub.completion)}%</span>
                      <span className="bg-saffron-dim border border-saffron-border/30 text-saffron px-1.5 rounded">{sub.subject.importance}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-24 text-center">
                  <CheckCircle className="w-7 h-7 text-greenL/60 mb-1" />
                  <span className="text-[10px] text-text-muted">All revision intervals currently on schedule.</span>
                </div>
              )}
            </div>
          </div>

          {/* Strong / Target Secured */}
          <div className="bg-bg-s2 border border-border rounded-lg p-4 flex flex-col gap-3 shadow-md">
            <h5 className="text-xs font-bold text-greenL flex items-center gap-1.5 pb-2 border-b border-border/40">
              <CheckCircle className="w-4 h-4" />
              <span>Strong Areas</span>
            </h5>
            
            <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto max-h-[160px] pr-1">
              {strongSubjects.length > 0 ? (
                strongSubjects.map(sub => (
                  <div key={sub.subject.id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-bold text-text leading-tight">
                      <span className="truncate max-w-[140px]">{sub.subject.name}</span>
                      <span className="text-greenL">{Math.round(sub.accuracy)}% Acc</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-text-muted">
                      <span>Completion: {Math.round(sub.completion)}%</span>
                      <span className="bg-green-500/10 border border-green-500/20 text-greenL px-1.5 rounded">High Mastery</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-24 text-center">
                  <span className="text-[10px] text-text-muted">Complete subjects with 75%+ accuracy to list them here.</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
