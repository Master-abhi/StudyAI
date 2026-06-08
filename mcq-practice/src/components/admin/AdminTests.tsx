import React, { useState, useEffect } from 'react';
import { 
  Trophy, Plus, Trash2, Calendar, Globe, 
  Settings, Loader2, X, Eye, ShieldAlert, CheckCircle, Pencil 
} from 'lucide-react';
import type { Exam } from '../syllabus/syllabusData';

interface AdminTestsProps {
  currentUser: any;
  exams: Exam[];
}

interface TestMeta {
  id: string;
  examId: string;
  examName: string;
  examIds?: string[];
  examNames?: string[];
  subject: string;
  mode: 'quiz' | 'mock';
  language: 'english' | 'hindi';
  totalQuestions: number;
  pattern?: {
    totalQuestions: number;
    totalMarks: number;
    durationMinutes: number;
    markingScheme: string;
  };
  createdAt: string;
}

export const AdminTests: React.FC<AdminTestsProps> = ({ currentUser, exams }) => {
  const [tests, setTests] = useState<TestMeta[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingGen, setLoadingGen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // Form State
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [selectedExamIds, setSelectedExamIds] = useState<string[]>([exams[0]?.id || '']);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<'quiz' | 'mock'>('quiz');
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi'>('hindi');
  const [filterExamId, setFilterExamId] = useState<string>('all');

  // Creator state
  const [creatorTab, setCreatorTab] = useState<'generate' | 'upload'>('generate');
  const [uploadJsonText, setUploadJsonText] = useState<string>('');
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  // Preview State
  const [previewTest, setPreviewTest] = useState<any | null>(null);
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

  // Edit State
  const [editingTest, setEditingTest] = useState<any | null>(null);
  const [editLoading, setEditLoading] = useState<boolean>(false);

  // Find active exam data
  const activeExam = exams.find(e => e.id === selectedExamId) || exams[0];

  // Filter tests registry by exam
  const filteredRegistryTests = tests.filter(test => {
    if (filterExamId === 'all') return true;
    return test.examId === filterExamId || (Array.isArray(test.examIds) && test.examIds.includes(filterExamId));
  });

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

  const sanitizeJsonString = (str: string) => {
    return str
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
      .replace(/\u00A0/g, ' ') // Convert non-breaking spaces to standard spaces
      .trim();
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
    const examId = e.target.value;
    setSelectedExamId(examId);
    setSelectedSubject('all');
    setSelectedExamIds(prev => {
      if (!prev.includes(examId)) {
        return [...prev, examId];
      }
      return prev;
    });
  };

  const handleGenerateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingGen(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const selectedExamsData = exams.filter(ex => selectedExamIds.includes(ex.id));
      
      const payload = {
        examId: activeExam.id,
        examName: activeExam.name,
        examIds: selectedExamIds,
        examNames: selectedExamsData.map(ex => ex.name),
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

  // File upload change handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        // Basic parse check
        JSON.parse(sanitizeJsonString(text));
        setUploadJsonText(text);
        setErrorMessage('');
      } catch (err) {
        setErrorMessage('Selected file contains invalid JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Upload test submission handler
  const handleUploadTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadJsonText.trim()) {
      setErrorMessage('JSON content is empty.');
      return;
    }

    setUploadLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const parsed = JSON.parse(sanitizeJsonString(uploadJsonText));
      const selectedExamsData = exams.filter(ex => selectedExamIds.includes(ex.id));
      const token = await currentUser.getIdToken();

      const payload = {
        ...parsed,
        examId: parsed.examId || selectedExamId,
        examName: parsed.examName || activeExam.name,
        examIds: selectedExamIds,
        examNames: selectedExamsData.map(ex => ex.name)
      };

      const res = await fetch(getApiUrl('/api/admin/tests/upload'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully uploaded and saved exam/paper questions!`);
        setUploadJsonText('');
        fetchTestsList();
      } else {
        throw new Error(data.error || 'Failed to upload test paper.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error parsing or uploading test JSON.');
    } finally {
      setUploadLoading(false);
    }
  };

  const renderTargetExamsSelection = (disabled: boolean) => (
    <div className="flex flex-col gap-1.5 border border-border p-3 rounded-lg bg-bg-s3/40 select-none">
      <span className="text-[10px] font-black uppercase text-text-muted">Target Exams (Select all that apply)</span>
      <div className="grid grid-cols-1 gap-2 mt-1.5">
        {exams.map(ex => (
          <label key={ex.id} className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={selectedExamIds.includes(ex.id)}
              disabled={disabled}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedExamIds(prev => [...prev, ex.id]);
                } else {
                  if (selectedExamIds.length > 1) {
                    setSelectedExamIds(prev => prev.filter(id => id !== ex.id));
                  }
                }
              }}
              className="rounded border-border text-saffron focus:ring-saffron accent-saffron"
            />
            <span className="text-text hover:text-saffron transition-colors">{ex.name}</span>
          </label>
        ))}
      </div>
    </div>
  );

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

  const handleEditClick = async (testId: string) => {
    setLoadingPreview(true);
    setEditingTest(null);
    try {
      const res = await fetch(getApiUrl(`/api/tests/${testId}`));
      if (res.ok) {
        const data = await res.json();
        // Prepare editable data
        const editableTest = {
          ...data,
          examIds: data.examIds || (data.examId ? [data.examId] : []),
          examNames: data.examNames || (data.examName ? [data.examName] : []),
          questions: data.questions || []
        };
        setEditingTest(editableTest);
      } else {
        alert('Failed to retrieve test details for editing.');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching test questions.');
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTest) return;

    setEditLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const selectedExamsData = exams.filter(ex => editingTest.examIds.includes(ex.id));
      
      const payload = {
        ...editingTest,
        examName: selectedExamsData[0]?.name || editingTest.examName,
        examNames: selectedExamsData.map(ex => ex.name)
      };

      const res = await fetch(getApiUrl(`/api/admin/tests/${editingTest.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage('Test paper updated successfully!');
        setEditingTest(null);
        fetchTestsList();
      } else {
        throw new Error(data.error || 'Server rejected the test update request.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to save edits to test paper.');
    } finally {
      setEditLoading(false);
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
        
        {/* Generate & Upload Creator Panel */}
        <div className="bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex bg-bg-s3 border border-border p-1 rounded-lg w-full mb-1 select-none">
            <button
              type="button"
              onClick={() => { setCreatorTab('generate'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded cursor-pointer transition-colors ${
                creatorTab === 'generate' ? 'bg-saffron text-bg-s1 font-black shadow-sm' : 'text-text-muted hover:text-text'
              }`}
            >
              AI Generator
            </button>
            <button
              type="button"
              onClick={() => { setCreatorTab('upload'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded cursor-pointer transition-colors ${
                creatorTab === 'upload' ? 'bg-saffron text-bg-s1 font-black shadow-sm' : 'text-text-muted hover:text-text'
              }`}
            >
              JSON Upload
            </button>
          </div>

          {creatorTab === 'generate' ? (
            <form onSubmit={handleGenerateTest} className="flex flex-col gap-4 font-sans">
            {/* Exam Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Base Syllabus Exam</label>
              <select
                value={selectedExamId}
                onChange={handleExamChange}
                className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                disabled={loadingGen}
              >
                {exams.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </select>
            </div>

            {/* Target Exams Checkboxes */}
            {renderTargetExamsSelection(loadingGen)}

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
          ) : (
            <form onSubmit={handleUploadTest} className="flex flex-col gap-4 font-sans">
              {/* Target Exams Checkboxes */}
              {renderTargetExamsSelection(uploadLoading)}

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Upload JSON File</label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="w-full bg-bg-s3 text-xs text-text border border-border px-3 py-2.5 rounded-lg outline-none cursor-pointer file:bg-saffron file:text-bg-s1 file:border-none file:px-2.5 file:py-1 file:rounded file:text-[9px] file:font-black file:uppercase file:cursor-pointer"
                  disabled={uploadLoading}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center w-full">
                  <label className="text-[10px] font-black uppercase text-text-muted">Or Paste Raw JSON</label>
                  <button
                    type="button"
                    onClick={() => setUploadJsonText(JSON.stringify({
                      examId: "cgpsc_sse",
                      examName: "CGPSC SSE",
                      subject: "All Subjects",
                      mode: "mock",
                      language: "hindi",
                      pattern: {
                        totalQuestions: 5,
                        totalMarks: 10,
                        durationMinutes: 10,
                        markingScheme: "+2 for correct, -0.66 for incorrect"
                      },
                      questions: [
                        {
                          question: "छत्तीसगढ़ विधानसभा के प्रथम अध्यक्ष कौन थे?",
                          options: ["बनवारी लाल अग्रवाल", "राजेन्द्र प्रसाद शुक्ल", "धर्मजीत सिंह", "डॉ. रमन सिंह"],
                          correctIndex: 1,
                          explanation: "राजेन्द्र प्रसाद शुक्ल छत्तीसगढ़ विधानसभा के प्रथम अध्यक्ष थे।",
                          subject: "CG GK"
                        }
                      ]
                    }, null, 2))}
                    className="text-[8px] font-black uppercase text-saffron hover:underline cursor-pointer"
                  >
                    Insert Template
                  </button>
                </div>
                <textarea
                  value={uploadJsonText}
                  onChange={(e) => setUploadJsonText(e.target.value)}
                  placeholder='{"examId": "...", "questions": [...]}'
                  className="w-full h-36 bg-bg-s3 text-[10px] font-mono text-text border border-border focus:border-saffron p-3 rounded-lg outline-none resize-none"
                  disabled={uploadLoading}
                />
              </div>

              <div className="flex flex-col gap-1 select-none">
                <span className="text-[9px] font-black uppercase text-text-muted">Active Exam IDs Reference (Click ID to copy)</span>
                <div className="max-h-24 overflow-y-auto bg-bg-s3 border border-border rounded-lg p-2 font-mono text-[9px] text-text-muted leading-relaxed flex flex-col gap-1.5 no-scrollbar">
                  {exams.map(ex => (
                    <div key={ex.id} className="flex justify-between items-center gap-2 border-b border-border/20 pb-1">
                      <span className="font-bold text-text truncate max-w-[150px]" title={ex.fullName || ex.name}>{ex.name}</span>
                      <span className="text-saffron font-bold cursor-pointer hover:underline" onClick={() => {
                        navigator.clipboard.writeText(ex.id);
                        alert(`Copied "${ex.id}" to clipboard!`);
                      }}>{ex.id}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={uploadLoading || !uploadJsonText.trim()}
                className="w-full py-3 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
              >
                {uploadLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading & Syncing...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Test Paper</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Existing Tests Table List (2 columns wide) */}
        <div className="xl:col-span-2 bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4.5 h-4.5 text-saffron" />
              <h3 className="text-xs font-black uppercase text-text tracking-wider">Generated Tests Registry</h3>
            </div>
            
            {/* Filter by Exam */}
            <div className="flex items-center gap-2">
              <label className="text-[9px] font-black uppercase text-text-muted">Filter Exam:</label>
              <select
                value={filterExamId}
                onChange={(e) => setFilterExamId(e.target.value)}
                className="bg-bg-s3 text-[11px] text-text border border-border focus:border-saffron px-2.5 py-1.5 rounded-lg outline-none cursor-pointer font-sans"
              >
                <option value="all">All Exams</option>
                {exams.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </select>
            </div>
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
          ) : filteredRegistryTests.length === 0 ? (
            <div className="text-center py-12 text-xs text-text-muted border border-dashed border-border/60 rounded-lg">
              No test papers found matching the selected exam filter.
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
                  {filteredRegistryTests.map(test => (
                    <tr key={test.id} className="hover:bg-bg-s3/20 transition-colors">
                      <td className="py-3 pr-3 font-bold text-text truncate max-w-[120px]" title={test.examNames ? test.examNames.join(', ') : test.examName}>
                        {test.examNames && test.examNames.length > 1 ? (
                          <div className="flex flex-col">
                            <span className="truncate">{test.examName}</span>
                            <span className="text-[9px] text-saffron font-bold">+{test.examNames.length - 1} more</span>
                          </div>
                        ) : (
                          test.examName
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-col truncate max-w-[160px]">
                          <span className="font-semibold text-text-muted leading-tight truncate" title={test.subject}>
                            {test.subject === 'all' ? 'All Subjects' : test.subject}
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded leading-none ${
                              test.mode === 'mock' 
                                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' 
                                : 'bg-saffron-dim/20 border border-saffron-border/30 text-saffron'
                            }`}>
                              {test.mode} ({test.totalQuestions} Qs)
                            </span>
                            {test.pattern && (
                              <span className="text-[7.5px] font-bold text-text-muted bg-bg-s3 px-1 py-0.5 rounded border border-border">
                                {test.pattern.totalMarks}M • {test.pattern.durationMinutes}m
                              </span>
                            )}
                          </div>
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
                            onClick={() => handleEditClick(test.id)}
                            className="p-1.5 bg-bg-s3 hover:bg-bg-s1 border border-border text-text-muted hover:text-saffron rounded cursor-pointer transition-colors"
                            title="Edit Test Details & Questions"
                          >
                            <Pencil className="w-3.5 h-3.5" />
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
                <span className="text-[10px] text-text-muted font-bold mt-0.5">
                  {previewTest.examNames ? previewTest.examNames.join(' • ') : previewTest.examName} — {previewTest.subject === 'all' ? 'All Subjects' : previewTest.subject}
                </span>
              </div>
              <button
                onClick={() => setPreviewTest(null)}
                className="text-text-muted hover:text-text cursor-pointer p-1 rounded bg-bg-s3 border border-border"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {previewTest.pattern && (
              <div className="p-3 bg-bg-s3/60 border border-saffron-border/20 rounded-lg flex flex-wrap gap-x-5 gap-y-2 text-[9px] font-black uppercase text-text-muted tracking-wider select-none shrink-0 mb-1 font-sans">
                <span>Total Questions: <strong className="text-text">{previewTest.pattern.totalQuestions || previewTest.questions?.length}</strong></span>
                <span>Total Marks: <strong className="text-text">{previewTest.pattern.totalMarks}</strong></span>
                <span>Duration: <strong className="text-text">{previewTest.pattern.durationMinutes} Mins</strong></span>
                <span className="normal-case">Marking Scheme: <strong className="text-text font-bold uppercase">{previewTest.pattern.markingScheme}</strong></span>
              </div>
            )}

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

      {/* Edit Modal Overlay */}
      {editingTest && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md z-[999] flex items-center justify-center p-4">
          <form onSubmit={handleSaveEdit} className="w-full max-w-2xl bg-bg-s2 border border-border rounded-xl shadow-2xl p-6 flex flex-col gap-4 max-h-[85vh] font-sans">
            <div className="flex justify-between items-center border-b border-border pb-3 shrink-0">
              <div className="flex flex-col">
                <h3 className="text-xs font-black uppercase text-saffron tracking-wider">Edit Test Paper</h3>
                <span className="text-[10px] text-text-muted font-bold mt-0.5">Test ID: {editingTest.id}</span>
              </div>
              <button
                type="button"
                onClick={() => setEditingTest(null)}
                className="text-text-muted hover:text-text cursor-pointer p-1 rounded bg-bg-s3 border border-border"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-5 my-2">
              {/* Target Exams Checklist for Edit */}
              <div className="flex flex-col gap-1.5 border border-border p-3 rounded-lg bg-bg-s3/40 select-none">
                <span className="text-[10px] font-black uppercase text-text-muted">Target Exams (Select all that apply)</span>
                <div className="grid grid-cols-1 gap-2 mt-1.5">
                  {exams.map(ex => (
                    <label key={ex.id} className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingTest.examIds.includes(ex.id)}
                        onChange={(e) => {
                          const updatedIds = e.target.checked
                            ? [...editingTest.examIds, ex.id]
                            : editingTest.examIds.filter((id: string) => id !== ex.id);
                          
                          // Ensure at least one exam is selected
                          if (updatedIds.length > 0) {
                            setEditingTest({
                              ...editingTest,
                              examId: updatedIds[0], // primary exam fallback
                              examIds: updatedIds
                            });
                          }
                        }}
                        className="rounded border-border text-saffron focus:ring-saffron accent-saffron"
                      />
                      <span className="text-text hover:text-saffron transition-colors">{ex.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subject, Mode, Language */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase text-text-muted">Subject / Scope</label>
                  <input
                    type="text"
                    value={editingTest.subject || ''}
                    onChange={(e) => setEditingTest({ ...editingTest, subject: e.target.value })}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2 rounded-lg outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase text-text-muted">Test Length / Mode</label>
                  <select
                    value={editingTest.mode || 'quiz'}
                    onChange={(e) => setEditingTest({ ...editingTest, mode: e.target.value })}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="quiz">Quiz (5 Qs)</option>
                    <option value="mock">Full Mock (25 Qs)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase text-text-muted">Language</label>
                  <select
                    value={editingTest.language || 'hindi'}
                    onChange={(e) => setEditingTest({ ...editingTest, language: e.target.value })}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="hindi">Hindi (Devanagari)</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>

              {/* Questions Edit list */}
              <div className="flex flex-col gap-4 border-t border-border pt-4">
                <span className="text-[10px] font-black uppercase text-text-muted tracking-wider">Edit Questions ({editingTest.questions?.length || 0} items)</span>
                {editingTest.questions?.map((q: any, idx: number) => (
                  <div key={idx} className="p-4 bg-bg-s3 border border-border rounded-lg flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[9px] font-black uppercase text-saffron bg-saffron-dim/30 px-1.5 py-0.5 rounded border border-saffron-border/30">
                        Question {idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <label className="text-[8px] font-black uppercase text-text-muted">Subject tag:</label>
                        <input
                          type="text"
                          value={q.subject || ''}
                          onChange={(e) => {
                            const updatedQuestions = [...editingTest.questions];
                            updatedQuestions[idx] = { ...q, subject: e.target.value };
                            setEditingTest({ ...editingTest, questions: updatedQuestions });
                          }}
                          className="bg-bg-s2 text-[10px] font-bold text-text border border-border px-2 py-0.5 rounded outline-none w-28"
                          placeholder="e.g. History"
                        />
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[8px] font-black uppercase text-text-muted">Question Text</label>
                      <textarea
                        value={q.question || ''}
                        onChange={(e) => {
                          const updatedQuestions = [...editingTest.questions];
                          updatedQuestions[idx] = { ...q, question: e.target.value };
                          setEditingTest({ ...editingTest, questions: updatedQuestions });
                        }}
                        className="w-full bg-bg-s2 text-xs text-text border border-border p-2.5 rounded outline-none resize-none h-16"
                        required
                      />
                    </div>

                    {/* Options (A, B, C, D) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {q.options?.map((opt: string, optIdx: number) => (
                        <div key={optIdx} className="flex flex-col gap-0.5">
                          <label className="text-[8px] font-black uppercase text-text-muted">Option {String.fromCharCode(65 + optIdx)}</label>
                          <div className="flex items-center gap-2 bg-bg-s2 border border-border rounded px-2.5 py-1">
                            <span className="w-4 h-4 bg-bg-s1 rounded-full flex items-center justify-center text-[9px] shrink-0 font-black text-text-muted">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <input
                              type="text"
                              value={opt || ''}
                              onChange={(e) => {
                                const updatedOpts = [...q.options];
                                updatedOpts[optIdx] = e.target.value;
                                const updatedQuestions = [...editingTest.questions];
                                updatedQuestions[idx] = { ...q, options: updatedOpts };
                                setEditingTest({ ...editingTest, questions: updatedQuestions });
                              }}
                              className="w-full bg-transparent text-xs text-text outline-none border-none"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Correct Index & Explanation */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1.5">
                      <div className="flex flex-col gap-1 sm:col-span-1">
                        <label className="text-[8px] font-black uppercase text-text-muted">Correct Answer</label>
                        <select
                          value={q.correctIndex}
                          onChange={(e) => {
                            const updatedQuestions = [...editingTest.questions];
                            updatedQuestions[idx] = { ...q, correctIndex: parseInt(e.target.value, 10) };
                            setEditingTest({ ...editingTest, questions: updatedQuestions });
                          }}
                          className="bg-bg-s2 text-xs text-text border border-border px-2 py-1.5 rounded outline-none cursor-pointer"
                        >
                          <option value={0}>Option A</option>
                          <option value={1}>Option B</option>
                          <option value={2}>Option C</option>
                          <option value={3}>Option D</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 sm:col-span-2">
                        <label className="text-[8px] font-black uppercase text-text-muted">Answer Explanation</label>
                        <textarea
                          value={q.explanation || ''}
                          onChange={(e) => {
                            const updatedQuestions = [...editingTest.questions];
                            updatedQuestions[idx] = { ...q, explanation: e.target.value };
                            setEditingTest({ ...editingTest, questions: updatedQuestions });
                          }}
                          className="w-full bg-bg-s2 text-[10px] text-text border border-border p-2 rounded outline-none resize-none h-12"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-3.5 flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setEditingTest(null)}
                className="px-4 py-2 border border-border text-text hover:bg-bg-s3 text-xs font-black uppercase rounded-lg cursor-pointer"
                disabled={editLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-saffron text-bg-s1 hover:bg-orange-500 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                disabled={editLoading}
              >
                {editLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
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
