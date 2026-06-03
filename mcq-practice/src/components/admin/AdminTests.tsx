import React, { useState, useEffect } from 'react';
import { 
  Trophy, Plus, Trash2, Calendar, Globe, 
  Settings, Loader2, X, Eye, ShieldAlert, CheckCircle 
} from 'lucide-react';
import { EXAMS_DATA } from '../syllabus/syllabusData';

interface AdminTestsProps {
  currentUser: any;
}

interface TestMeta {
  id: string;
  examId: string;
  examName: string;
  subject: string;
  mode: 'quiz' | 'mock';
  language: 'english' | 'hindi';
  totalQuestions: number;
  createdAt: string;
}

export const AdminTests: React.FC<AdminTestsProps> = ({ currentUser }) => {
  const [tests, setTests] = useState<TestMeta[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingGen, setLoadingGen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // Form State
  const [selectedExamId, setSelectedExamId] = useState<string>(EXAMS_DATA[0]?.id || '');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<'quiz' | 'mock'>('quiz');
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi'>('hindi');

  // Preview State
  const [previewTest, setPreviewTest] = useState<any | null>(null);
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

  // Find active exam data
  const activeExam = EXAMS_DATA.find(e => e.id === selectedExamId) || EXAMS_DATA[0];

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
  };

  const fetchTestsList = async () => {
    setLoadingList(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/tests'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTests(data || []);
      } else {
        throw new Error('Failed to retrieve generated tests.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Could not load test entries.');
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchTestsList();
  }, [currentUser]);

  // Handle exam select change to reset selected subject to default
  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExamId(e.target.value);
    setSelectedSubject('all');
  };

  const handleGenerateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingGen(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      
      const payload = {
        examId: activeExam.id,
        examName: activeExam.name,
        subject: selectedSubject,
        mode: selectedMode,
        language: selectedLanguage,
        subjects: activeExam.subjects.map(s => s.name)
      };

      const res = await fetch(getApiUrl('/api/admin/tests/generate'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully generated ${selectedMode} (${selectedMode === 'mock' ? '25' : '5'} Qs) for ${activeExam.name}!`);
        fetchTestsList();
      } else {
        throw new Error(data.error || 'Server rejected the test generation request.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to generate test. Make sure API keys and backend models are active.');
    } finally {
      setLoadingGen(false);
    }
  };

  const handleDeleteTest = async (testId: string) => {
    if (!window.confirm('Are you sure you want to delete this test permanently from Firestore?')) return;
    
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/tests/${testId}`), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSuccessMessage('Test deleted successfully.');
        setTests(prev => prev.filter(t => t.id !== testId));
      } else {
        throw new Error('Deletion failed.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Could not delete the test paper.');
    }
  };

  const handlePreviewTest = async (testId: string) => {
    setLoadingPreview(true);
    setPreviewTest(null);
    try {
      const res = await fetch(getApiUrl(`/api/tests/${testId}`));
      if (res.ok) {
        const data = await res.json();
        setPreviewTest(data);
      } else {
        alert('Failed to retrieve test details.');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching test questions.');
    } finally {
      setLoadingPreview(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in w-full">
      {/* Messages */}
      {successMessage && (
        <div className="p-4 bg-greenL/10 border border-greenL/20 text-greenL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="ml-auto text-greenL/60 hover:text-greenL">✕</button>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="ml-auto text-redL/60 hover:text-redL">✕</button>
        </div>
      )}

      {/* Grid: Creator Form on Left, List on Right (Desktop Layout) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Generate Panel Form */}
        <div className="bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Plus className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">Generate AI Test</h3>
          </div>

          <form onSubmit={handleGenerateTest} className="flex flex-col gap-4">
            {/* Exam Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Target Exam</label>
              <select
                value={selectedExamId}
                onChange={handleExamChange}
                className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                disabled={loadingGen}
              >
                {EXAMS_DATA.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </select>
            </div>

            {/* Subject Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Subject Scope</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                disabled={loadingGen}
              >
                <option value="all">All Subjects (Mixed Pattern)</option>
                {activeExam?.subjects?.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Mode & Language (2-column row) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Test Length</label>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value as any)}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                  disabled={loadingGen}
                >
                  <option value="quiz">Quiz (5 Qs)</option>
                  <option value="mock">Full Mock (25 Qs)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as any)}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                  disabled={loadingGen}
                >
                  <option value="hindi">Hindi (Devanagari)</option>
                  <option value="english">English</option>
                </select>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loadingGen}
              className="w-full mt-2 py-3 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
            >
              {loadingGen ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating (15-20s)...</span>
                </>
              ) : (
                <>
                  <Settings className="w-3.5 h-3.5" />
                  <span>Trigger Generation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Existing Tests Table List (2 columns wide) */}
        <div className="xl:col-span-2 bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Trophy className="w-4.5 h-4.5 text-saffron" />
            <h3 className="text-xs font-black uppercase text-text tracking-wider">Generated Tests Registry</h3>
          </div>

          {loadingList ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-text-muted">
              <Loader2 className="w-6 h-6 animate-spin text-saffron" />
              <span className="text-[10px] font-black uppercase tracking-wider">Loading Registry...</span>
            </div>
          ) : tests.length === 0 ? (
            <div className="text-center py-12 text-xs text-text-muted border border-dashed border-border/60 rounded-lg">
              No test papers registered in Firestore. Generate one using the form.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/50 text-[10px] text-text-muted font-black uppercase tracking-wider">
                    <th className="py-2.5 pr-3">Exam Target</th>
                    <th className="py-2.5 px-3">Subject / Length</th>
                    <th className="py-2.5 px-3">Language</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 pl-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/25">
                  {tests.map(test => (
                    <tr key={test.id} className="hover:bg-bg-s3/20 transition-colors">
                      <td className="py-3 pr-3 font-bold text-text truncate max-w-[120px]" title={test.examName}>
                        {test.examName}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-col truncate max-w-[160px]">
                          <span className="font-semibold text-text-muted leading-tight truncate" title={test.subject}>
                            {test.subject === 'all' ? 'All Subjects' : test.subject}
                          </span>
                          <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded w-max mt-0.5 leading-none ${
                            test.mode === 'mock' 
                              ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' 
                              : 'bg-saffron-dim/20 border border-saffron-border/30 text-saffron'
                          }`}>
                            {test.mode} ({test.totalQuestions} Qs)
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text bg-bg-s3 px-2 py-0.5 border border-border rounded flex items-center gap-1 w-max">
                          <Globe className="w-3 h-3 text-saffron" />
                          <span>{test.language === 'hindi' ? 'हिं' : 'EN'}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3 text-text-muted font-bold text-[10px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-text-muted shrink-0" />
                          <span>
                            {new Date(test.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pl-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => handlePreviewTest(test.id)}
                            className="p-1.5 bg-bg-s3 hover:bg-bg-s1 border border-border text-text-muted hover:text-saffron rounded cursor-pointer transition-colors"
                            title="Preview Questions"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTest(test.id)}
                            className="p-1.5 bg-bg-s3 hover:bg-red-500/10 border border-border text-text-muted hover:text-redL rounded cursor-pointer transition-colors"
                            title="Delete Test"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Preview Modal Overlay */}
      {previewTest && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md z-[999] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-bg-s2 border border-border rounded-xl shadow-2xl p-6 flex flex-col gap-4 max-h-[85vh]">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div className="flex flex-col">
                <h3 className="text-xs font-black uppercase text-saffron tracking-wider">Test Questions Preview</h3>
                <span className="text-[10px] text-text-muted font-bold mt-0.5">{previewTest.examName} — {previewTest.subject === 'all' ? 'All Subjects' : previewTest.subject}</span>
              </div>
              <button
                onClick={() => setPreviewTest(null)}
                className="text-text-muted hover:text-text cursor-pointer p-1 rounded bg-bg-s3 border border-border"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 my-2">
              {previewTest.questions?.map((q: any, idx: number) => (
                <div key={idx} className="p-4 bg-bg-s3 border border-border rounded-lg flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className="text-xs font-black text-text leading-relaxed">
                      Q{idx + 1}. {q.question}
                    </h4>
                    <span className="text-[8px] font-black uppercase text-saffron bg-saffron-dim/30 px-1.5 py-0.5 rounded shrink-0 border border-saffron-border/30">
                      {q.subject || 'General'}
                    </span>
                  </div>
                  
                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                    {q.options?.map((opt: string, optIdx: number) => (
                      <div 
                        key={optIdx} 
                        className={`p-2.5 rounded text-[11px] font-bold border transition-colors flex items-center gap-2 ${
                          optIdx === q.correctIndex
                            ? 'bg-greenL/5 border-greenL/20 text-greenL'
                            : 'bg-bg-s2 border-border text-text-muted'
                        }`}
                      >
                        <span className="w-4 h-4 bg-bg-s1 rounded-full flex items-center justify-center text-[9px] shrink-0 font-black">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="mt-2 p-3 bg-bg-s2 border border-border/80 rounded text-[10px] text-text-muted leading-relaxed">
                    <span className="font-bold text-saffron uppercase block mb-1">Answer Explanation</span>
                    {q.explanation}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3.5 flex justify-end shrink-0">
              <button
                onClick={() => setPreviewTest(null)}
                className="px-4 py-2 bg-saffron text-bg-s1 hover:bg-orange-500 text-xs font-black uppercase rounded-lg cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {loadingPreview && (
        <div className="fixed inset-0 bg-[#0B0E14]/40 backdrop-blur-sm z-[999] flex items-center justify-center">
          <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-2xl flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-saffron animate-spin" />
            <span className="text-xs font-bold text-text">Loading test questions...</span>
          </div>
        </div>
      )}
    </div>
  );
};
