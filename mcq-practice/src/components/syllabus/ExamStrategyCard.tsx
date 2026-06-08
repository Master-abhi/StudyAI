import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp } from 'lucide-react';
import type { Exam } from './syllabusData';

interface ExamStrategyCardProps {
  exam: Exam;
}

export const ExamStrategyCard: React.FC<ExamStrategyCardProps> = ({ exam }) => {
  const isCgpsc = exam.id === 'cgpsc_sse';

  // Strategic AI recommendations based on active exam
  const getCgpscRecommendations = () => [
    {
      title: 'Prioritize CG GK (50% weightage)',
      text: 'CG GK constitutes exactly half of Prelims Paper 1. Focus heavily on CG Tribes (10-12 Qs) and CG History & Culture (15 Qs) as they yield the highest return on time invested.'
    },
    {
      title: 'Constitution & Polity is High Yield',
      text: 'Constitutional Articles, Panchayati Raj (Art 243), and Local Government have consistent PYQ frequency. Expect 12-14 questions. Double-down on revisions.'
    },
    {
      title: 'Maximize Current Affairs & Schemes',
      text: 'Lately, CG Government Schemes (maternal schemes, agriculture bonuses) account for 6-8 questions. Combine with national indices and summits for another 8-10 marks.'
    },
    {
      title: 'CSAT is Qualifying but Critical',
      text: 'For Paper 2, focus on Hindi Grammar and Chhattisgarhi Bhasha comprehension if Math is your weak area. You only need 33% (66 marks) to qualify.'
    }
  ];

  const getVyapamRecommendations = () => [
    {
      title: 'Practice Speed in Quant & Logic',
      text: 'Mathematics and Reasoning account for 30 marks. Practice daily timed tests. Patwari exams test arithmetic speed heavily.'
    },
    {
      title: 'Computer Science Core Concepts',
      text: '20 questions are dedicated to Computer knowledge. Memorize MS Office shortcut keys, anti-virus/virus types, and internet definitions.'
    },
    {
      title: 'Ensure Hindi Grammar Accuracy',
      text: 'Hindi carries 20 marks. Questions on Sandhi, Samas, and spelling corrections are repeated every year. These are easy points if revised well.'
    }
  ];

  const strategyList = isCgpsc ? getCgpscRecommendations() : getVyapamRecommendations();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left 2 Columns: Subject Weightage & PYQ Frequency Table */}
      <div className="lg:col-span-2 bg-bg-s2 border border-border rounded-lg p-5 shadow-lg flex flex-col gap-4">
        <div>
          <span className="text-[10px] font-black uppercase text-saffron tracking-widest">EXAM STRATEGY BOARD</span>
          <h3 className="text-sm font-bold text-text mt-0.5">Estimated Subject Weightage & PYQ Frequency</h3>
          <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
            Data compiled from previous 10 years of {exam.name} question patterns.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 text-[10px] uppercase text-text-muted font-black tracking-wider">
                <th className="py-2.5">Subject Name</th>
                <th className="py-2.5 text-center">Questions (Est.)</th>
                <th className="py-2.5 text-center">Marks</th>
                <th className="py-2.5 text-center">PYQ Frequency</th>
                <th className="py-2.5 text-right">Importance</th>
              </tr>
            </thead>
            <tbody>
              {exam.subjects.map((sub) => {
                const questionCount = Math.round(sub.weightage / 2);
                const importanceColors = {
                  Highest: 'bg-red-500/15 text-redL border-red-500/30',
                  High: 'bg-saffron-dim text-saffron border-saffron-border/40',
                  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                  Low: 'bg-bg-s3 text-text-muted border-border'
                };

                return (
                  <tr key={sub.id} className="border-b border-border/40 hover:bg-bg-s3/30 transition-colors">
                    <td className="py-3 font-semibold text-text">
                      <div className="flex items-center gap-1.5">
                        {sub.isCgSpecific && <span className="bg-saffron text-[8px] font-black text-bg-s1 px-1 rounded">CG SPECIFIC</span>}
                        <span>{sub.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center text-text-muted font-bold">~{questionCount}</td>
                    <td className="py-3 text-center text-text font-black">{sub.weightage}</td>
                    <td className="py-3 text-center text-text-muted font-bold">
                      <div className="flex justify-center items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-greenL shrink-0" />
                        <span>{sub.pyqFrequency.split(' (')[0]}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${importanceColors[sub.importance]}`}>
                        {sub.importance}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column: AI Generated Strategy Recommendations */}
      <div className="bg-bg-s2 border border-border rounded-lg p-5 shadow-lg flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-saffron-dim border border-saffron-border/30 text-saffron">
            <Lightbulb className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-saffron tracking-widest">AI TAKEAWAYS</span>
            <h3 className="text-sm font-bold text-text">Strategic Advice</h3>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 mt-2">
          {strategyList.map((rec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.1 }}
              className="flex flex-col gap-1 leading-snug"
            >
              <h4 className="text-xs font-black text-text flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                <span>{rec.title}</span>
              </h4>
              <p className="text-[11px] text-text-muted leading-relaxed pl-3">
                {rec.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
