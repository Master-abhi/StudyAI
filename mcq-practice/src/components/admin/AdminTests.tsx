import React, { useState, useEffect } from 'react';
import { 
  Trophy, Plus, Trash2, Calendar, Globe, 
  Settings, Loader2, X, Eye, ShieldAlert, CheckCircle, Pencil 
} from 'lucide-react';
import type { Exam } from '../syllabus/syllabusData';

const cleanPrefix = (str: string): string => {
  if (!str) return '';
  // Match prefixes like (a), (A), (1), (I), (क), (ख) or a., A., 1., क., etc.
  return str.replace(/^\s*(?:\([^)]+\)|[a-zA-Z0-9\u0900-\u097F]+\.|[a-zA-Z0-9\u0900-\u097F]+\))\s*/, '');
};

const stripMarkdownTable = (text: string): string => {
  if (!text) return '';
  const lines = text.split('\n');
  const cleanedLines = lines.filter(line => {
    const trimmed = line.trim();
    // Remove separator lines like |---|---|
    if (/^\|?\s*:?-+:?\s*\|(?:\s*:?-+:?\s*\|?)*$/.test(trimmed)) {
      return false;
    }
    // Remove rows starting with |
    if (trimmed.startsWith('|')) {
      return false;
    }
    return true;
  });
  return cleanedLines.join('\n').trim();
};

const stripAssertionReason = (text: string): string => {
  if (!text) return '';
  // Matches newlines followed by markers like **कथन [As] :, **कारण [R] :, Assertion [As] :, As :, R :, etc.
  const regex = /\n+(?:\*\*)?(?:कथन|कारण|Assertion|Reason|\[As\]|\[R\])\s*(?:\[[^\]]+\])?\s*(?::|：)?/i;
  const match = text.match(regex);
  if (match && match.index !== undefined) {
    return text.substring(0, match.index).trim();
  }
  return text;
};

const stripStatements = (text: string): string => {
  if (!text) return '';
  // Match a newline followed by label like (1), 1., (A), A., (a), etc.
  const regex = /\n+(?:\)?)?(?:\()?[a-zA-Z0-9\u0900-\u097F]+(?:\.|\))\s+/i;
  const match = text.match(regex);
  if (match && match.index !== undefined) {
    return text.substring(0, match.index).trim();
  }
  return text;
};


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

const normalizeQuestion = (q: any): any => {
  const id = q.id || q.qId || '';
  let qType = q.qType || 'standard';
  if (typeof qType === 'string') {
    const upper = qType.toUpperCase();
    if (upper === 'MCQ' || upper === 'STANDARD') {
      qType = 'standard';
    } else if (upper === 'ASSERTION_REASON') {
      qType = 'assertion_reason';
    } else if (upper === 'MATCH_COLUMN') {
      qType = 'match_column';
    } else if (upper === 'ORDERING') {
      qType = 'ordering';
    } else if (upper === 'MULTI_STATEMENT') {
      qType = 'multi_statement';
    } else {
      qType = qType.toLowerCase();
    }
  }

  let columnI = q.columnI || [];
  let columnII = q.columnII || [];
  if (Array.isArray(q.columnA)) {
    columnI = q.columnA.map((col: any) => (typeof col === 'object' && col !== null ? (col.text || '') : String(col)));
  }
  if (Array.isArray(q.columnB)) {
    columnII = q.columnB.map((col: any) => (typeof col === 'object' && col !== null ? (col.text || '') : String(col)));
  }

  let statements = q.statements || [];
  let statementLabels = q.statementLabels || [];
  if (Array.isArray(q.itemsToOrder)) {
    statements = q.itemsToOrder.map((item: any) => (typeof item === 'object' && item !== null ? (item.text || '') : String(item)));
    statementLabels = q.itemsToOrder.map((item: any) => (typeof item === 'object' && item !== null ? (item.id || '') : ''));
  } else if (Array.isArray(q.statements) && q.statements.length > 0 && typeof q.statements[0] === 'object') {
    statements = q.statements.map((item: any) => (typeof item === 'object' && item !== null ? (item.text || '') : String(item)));
    statementLabels = q.statements.map((item: any) => (typeof item === 'object' && item !== null ? (item.id || '') : ''));
  }

  const options = Array.isArray(q.options) ? q.options.map((opt: any) => String(opt)) : [];
  const correctIndex = typeof q.correctIndex === 'number' ? q.correctIndex : parseInt(q.correctIndex, 10) || 0;

  return {
    ...q,
    id,
    qType,
    columnI,
    columnII,
    statements,
    statementLabels,
    options,
    correctIndex
  };
};

const getFormattedQuestionString = (q: any): string => {
  const qType = q.qType || 'standard';
  if (qType === 'standard') {
    return q.question || '';
  }
  if (qType === 'assertion_reason') {
    const directive = q.question || 'नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-';
    return `${directive}\n\n**कथन [As] :** ${q.assertion || ''}\n\n**कारण [R] :** ${q.reason || ''}`;
  }
  if (qType === 'match_column') {
    const directive = q.question || 'निम्नलिखित को सुमेलित कीजिए-';
    let md = `${directive}\n\n| कॉलम-I | कॉलम-II |\n| :--- | :--- |\n`;
    const colI = q.columnI || [];
    const colII = q.columnII || [];
    const maxLen = Math.max(colI.length, colII.length);
    for (let i = 0; i < maxLen; i++) {
      if (colI[i] || colII[i]) {
        md += `| ${colI[i] || ''} | ${colII[i] || ''} |\n`;
      }
    }
    return md;
  }
  if (qType === 'ordering' || qType === 'multi_statement') {
    const directive = q.question || '';
    let md = `${directive}\n\n`;
    const statements = q.statements || [];
    const labels = q.statementLabels || [];
    for (let i = 0; i < statements.length; i++) {
      if (statements[i]) {
        const label = labels[i] ? `(${labels[i]})` : `(${i + 1})`;
        md += `${label} ${statements[i]}\n`;
      }
    }
    return md.trim();
  }
  return q.question || '';
};

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
  const [creatorTab, setCreatorTab] = useState<'generate' | 'upload' | 'pool_upload' | 'pool_generate'>('generate');
  const [uploadJsonText, setUploadJsonText] = useState<string>('');
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  // Pool state
  const [poolStats, setPoolStats] = useState<{ totalCount: number; subjects: { [key: string]: number }; exams: { [key: string]: number } } | null>(null);
  const [loadingStats, setLoadingStats] = useState<boolean>(false);
  
  // Pool generation form state
  const [poolGenSubject, setPoolGenSubject] = useState<string>('all');
  const [poolGenCount, setPoolGenCount] = useState<number>(10);
  const [poolGenMode, setPoolGenMode] = useState<'quiz' | 'mock'>('quiz');
  const [poolGenLanguage, setPoolGenLanguage] = useState<'english' | 'hindi'>('hindi');
  const [loadingPoolGen, setLoadingPoolGen] = useState<boolean>(false);

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

  // Pasted JSON live preview state
  const [parsedPreviewQuestions, setParsedPreviewQuestions] = useState<any[]>([]);

  useEffect(() => {
    try {
      if (uploadJsonText.trim()) {
        const parsed = JSON.parse(sanitizeJsonString(uploadJsonText));
        const questionsArray = Array.isArray(parsed) ? parsed : (parsed.questions || []);
        if (Array.isArray(questionsArray)) {
          const normalized = questionsArray.map((q: any) => normalizeQuestion(q));
          setParsedPreviewQuestions(normalized);
        } else {
          setParsedPreviewQuestions([]);
        }
      } else {
        setParsedPreviewQuestions([]);
      }
    } catch (e) {
      setParsedPreviewQuestions([]);
    }
  }, [uploadJsonText]);


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

  const fetchPoolStats = async () => {
    setLoadingStats(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/questions/pool/stats'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPoolStats(data);
      }
    } catch (e) {
      console.error("Error fetching pool stats", e);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchTestsList();
    fetchPoolStats();
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

      const compiledQuestions = (parsed.questions || []).map((q: any) => ({
        ...q,
        question: getFormattedQuestionString(q)
      }));

      const payload = {
        ...parsed,
        questions: compiledQuestions,
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

  const handleUploadPoolQuestions = async (e: React.FormEvent) => {
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
      const questionsArray = Array.isArray(parsed) ? parsed : (parsed.questions || []);

      if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
        throw new Error('Could not find questions array in the JSON.');
      }

      const normalizedQuestions = questionsArray.map((q: any) => normalizeQuestion(q));
      const token = await currentUser.getIdToken();

      const payload = {
        questions: normalizedQuestions,
        examIds: selectedExamIds
      };

      const res = await fetch(getApiUrl('/api/admin/questions/pool/upload'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(data.message || `Successfully uploaded questions to the Question Bank!`);
        setUploadJsonText('');
        fetchPoolStats();
      } else {
        throw new Error(data.error || 'Failed to upload questions to the pool.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error parsing or uploading questions to the pool.');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleGenerateFromPool = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPoolGen(true);
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
        subject: poolGenSubject,
        mode: poolGenMode,
        language: poolGenLanguage,
        questionCount: poolGenCount
      };

      const res = await fetch(getApiUrl('/api/admin/tests/generate-from-pool'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully generated ${poolGenMode} (${poolGenCount} Qs) from the pool!`);
        fetchTestsList();
      } else {
        throw new Error(data.error || 'Failed to generate test from pool.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to generate test from pool.');
    } finally {
      setLoadingPoolGen(false);
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
      
      const compiledQuestions = (editingTest.questions || []).map((q: any) => ({
        ...q,
        question: getFormattedQuestionString(q)
      }));

      const payload = {
        ...editingTest,
        questions: compiledQuestions,
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
          <div className="grid grid-cols-2 gap-1 bg-bg-s3 border border-border p-1 rounded-lg w-full mb-1 select-none">
            <button
              type="button"
              onClick={() => { setCreatorTab('generate'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-1.5 text-[9px] font-black uppercase rounded cursor-pointer transition-colors ${
                creatorTab === 'generate' ? 'bg-saffron text-bg-s1 font-black shadow-sm' : 'text-text-muted hover:text-text'
              }`}
            >
              AI Gen
            </button>
            <button
              type="button"
              onClick={() => { setCreatorTab('upload'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-1.5 text-[9px] font-black uppercase rounded cursor-pointer transition-colors ${
                creatorTab === 'upload' ? 'bg-saffron text-bg-s1 font-black shadow-sm' : 'text-text-muted hover:text-text'
              }`}
            >
              Upload Test
            </button>
            <button
              type="button"
              onClick={() => { setCreatorTab('pool_generate'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-1.5 text-[9px] font-black uppercase rounded cursor-pointer transition-colors ${
                creatorTab === 'pool_generate' ? 'bg-saffron text-bg-s1 font-black shadow-sm' : 'text-text-muted hover:text-text'
              }`}
            >
              Pool Gen
            </button>
            <button
              type="button"
              onClick={() => { setCreatorTab('pool_upload'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-1.5 text-[9px] font-black uppercase rounded cursor-pointer transition-colors ${
                creatorTab === 'pool_upload' ? 'bg-saffron text-bg-s1 font-black shadow-sm' : 'text-text-muted hover:text-text'
              }`}
            >
              Pool Upload
            </button>
          </div>

          {loadingStats && !poolStats ? (
            <div className="flex items-center justify-center p-3 text-[10px] text-text-muted font-sans gap-2 select-none bg-bg-s3/40 border border-border/60 rounded-lg">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-saffron" />
              <span>Fetching stats...</span>
            </div>
          ) : poolStats && (creatorTab === 'pool_generate' || creatorTab === 'pool_upload') ? (
            <div className="bg-bg-s3/40 border border-border/60 rounded-lg p-3 text-[10px] text-text-muted font-sans flex flex-col gap-1.5 select-none">
              <span className="font-black text-saffron uppercase tracking-wider block">📂 Question Bank Pool Stats</span>
              <div className="grid grid-cols-2 gap-2 mt-0.5">
                <div className="flex flex-col">
                  <span className="text-text font-black text-base leading-none">{poolStats.totalCount}</span>
                  <span>Total Pool Qs</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text font-black text-base leading-none">{Object.keys(poolStats.subjects || {}).length}</span>
                  <span>Total Subjects</span>
                </div>
              </div>
            </div>
          ) : null}


          {creatorTab === 'generate' && (
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

              {/* Grid: Mode & Language */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Test Mode</label>
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value as any)}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                    disabled={loadingGen}
                  >
                    <option value="quiz">Standard Quiz</option>
                    <option value="mock">Full Length Mock</option>
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
          )}

          {creatorTab === 'upload' && (
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
                          qType: "standard",
                          question: "छत्तीसगढ़ विधानसभा के प्रथम अध्यक्ष कौन थे?",
                          options: ["बनवारी लाल अग्रवाल", "राजेन्द्र प्रसाद शुक्ल", "धर्मजीत सिंह", "डॉ. रमन सिंह"],
                          correctIndex: 1,
                          explanation: "राजेन्द्र प्रसाद शुक्ल छत्तीसगढ़ विधानसभा के प्रथम अध्यक्ष थे।",
                          subject: "CG GK",
                          difficulty: "easy",
                          topic: "Administration in Chhattisgarh",
                          sourcePattern: "CG Vyapam PYQ Inspired",
                          yearTrend: "2020-2023",
                          expectedIn2026: true
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
                  className="w-full h-36 bg-bg-s3 text-[10px] font-mono text-text border border-border focus:border-saffron p-3 rounded-lg outline-none resize-none mb-1.5"
                  disabled={uploadLoading}
                />

                {parsedPreviewQuestions.length > 0 && (
                  <div className="flex flex-col gap-3.5 border border-border p-5 rounded-xl bg-bg-s2/40 shadow-md max-h-[300px] overflow-y-auto select-text mb-2.5 w-full">
                    <span className="text-xs font-black uppercase text-saffron tracking-wider flex items-center gap-1.5 select-none">
                      <Eye className="w-4 h-4 animate-pulse" /> Pasted JSON Live Preview ({parsedPreviewQuestions.length} Qs)
                    </span>
                    <div className="flex flex-col gap-4">
                      {parsedPreviewQuestions.map((pq: any, pIdx: number) => (
                        <div key={pIdx} className="p-3 bg-bg-s3 border border-border/60 rounded-lg flex flex-col gap-2 font-sans shadow-sm">
                          <div className="flex justify-between items-center gap-2 border-b border-border/20 pb-1.5 select-none">
                            <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Q{pIdx + 1} ({pq.qType || 'standard'})</span>
                            <span className="text-[8px] font-black uppercase text-text-muted bg-bg-s2 px-1.5 py-0.5 rounded border border-border">{pq.subject || 'General'}</span>
                          </div>
                          <p className="text-xs font-semibold text-text leading-relaxed font-hindi whitespace-pre-wrap">{pq.question}</p>
                          {pq.options && pq.options.length > 0 && (
                            <div className="grid grid-cols-2 gap-1.5 mt-1 border-t border-border/20 pt-1.5">
                              {pq.options.map((opt: string, optIdx: number) => (
                                <div key={optIdx} className={`px-2 py-1.5 rounded text-[10px] font-semibold border flex items-center gap-1.5 ${
                                  optIdx === pq.correctIndex ? 'bg-greenL/5 border-greenL/25 text-greenL' : 'bg-bg-s2 border-border text-text-muted'
                                }`}>
                                  <span className="w-4 h-4 bg-bg-s1 rounded-full flex items-center justify-center text-[9px] shrink-0 font-black">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span className="truncate">{opt}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

          {creatorTab === 'pool_generate' && (
            <form onSubmit={handleGenerateFromPool} className="flex flex-col gap-4 font-sans">
              {/* Exam Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Base Syllabus Exam</label>
                <select
                  value={selectedExamId}
                  onChange={handleExamChange}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus-within:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                  disabled={loadingPoolGen}
                >
                  {exams.map(ex => (
                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                  ))}
                </select>
              </div>

              {/* Target Exams Checkboxes */}
              {renderTargetExamsSelection(loadingPoolGen)}

              {/* Subject Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Subject Pool Filter</label>
                <select
                  value={poolGenSubject}
                  onChange={(e) => setPoolGenSubject(e.target.value)}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus-within:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                  disabled={loadingPoolGen}
                >
                  <option value="all">Mixed (All Subjects)</option>
                  {poolStats && Object.keys(poolStats.subjects || {}).map(sub => (
                    <option key={sub} value={sub}>{sub} ({poolStats.subjects[sub]} Qs in pool)</option>
                  ))}
                </select>
              </div>

              {/* Question Count Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Number of Questions ({poolGenCount})</label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={poolGenCount}
                  onChange={(e) => setPoolGenCount(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-bg-s3 rounded-lg appearance-none cursor-pointer accent-saffron"
                  disabled={loadingPoolGen}
                />
                <div className="flex justify-between text-[8px] font-black uppercase text-text-muted select-none mt-0.5">
                  <span>5 Qs</span>
                  <span>50 Qs</span>
                  <span>100 Qs</span>
                </div>
              </div>

              {/* Grid: Mode & Language */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Test Mode</label>
                  <select
                    value={poolGenMode}
                    onChange={(e) => setPoolGenMode(e.target.value as any)}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus-within:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                    disabled={loadingPoolGen}
                  >
                    <option value="quiz">Standard Quiz</option>
                    <option value="mock">Full Length Mock</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Language</label>
                  <select
                    value={poolGenLanguage}
                    onChange={(e) => setPoolGenLanguage(e.target.value as any)}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus-within:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                    disabled={loadingPoolGen}
                  >
                    <option value="hindi">Hindi (Devanagari)</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loadingPoolGen}
                className="w-full mt-2 py-3 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
              >
                {loadingPoolGen ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Generating from Pool...</span>
                  </>
                ) : (
                  <>
                    <Settings className="w-3.5 h-3.5" />
                    <span>Generate Test from Pool</span>
                  </>
                )}
              </button>
            </form>
          )}

          {creatorTab === 'pool_upload' && (
            <form onSubmit={handleUploadPoolQuestions} className="flex flex-col gap-4 font-sans">
              {/* Target Exams Checkboxes */}
              {renderTargetExamsSelection(uploadLoading)}

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Upload Pool JSON File</label>
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
                  <label className="text-[10px] font-black uppercase text-text-muted">Or Paste Raw JSON Array</label>
                  <button
                    type="button"
                    onClick={() => setUploadJsonText(JSON.stringify([
                      {
                        qId: "CG_GK_001",
                        qType: "MCQ",
                        examTags: ["cgpsc_sse"],
                        subject: "CG GK",
                        topic: "Administration in Chhattisgarh",
                        language: "hi",
                        question: "छत्तीसगढ़ विधानसभा के प्रथम अध्यक्ष कौन थे?",
                        options: ["बनवारी लाल अग्रवाल", "राजेन्द्र प्रसाद शुक्ल", "धर्मजीत सिंह", "डॉ. रमन सिंह"],
                        correctIndex: 1,
                        explanation: "राजेन्द्र प्रसाद शुक्ल छत्तीसगढ़ विधानसभा के प्रथम अध्यक्ष थे।"
                      }
                    ], null, 2))}
                    className="text-[8px] font-black uppercase text-saffron hover:underline cursor-pointer"
                  >
                    Insert Template
                  </button>
                </div>
                <textarea
                  value={uploadJsonText}
                  onChange={(e) => setUploadJsonText(e.target.value)}
                  placeholder='[{"qId": "...", "qType": "MCQ", "question": "...", "options": [...]}]'
                  className="w-full h-36 bg-bg-s3 text-[10px] font-mono text-text border border-border focus:border-saffron p-3 rounded-lg outline-none resize-none mb-1.5"
                  disabled={uploadLoading}
                />

                {/* Live Preview Panel */}
                {parsedPreviewQuestions.length > 0 && (
                  <div className="flex flex-col gap-3.5 border border-border p-5 rounded-xl bg-bg-s2/40 shadow-md max-h-[300px] overflow-y-auto select-text mb-2.5 w-full">
                    <span className="text-xs font-black uppercase text-saffron tracking-wider flex items-center gap-1.5 select-none">
                      <Eye className="w-4 h-4 animate-pulse" /> Pasted JSON Live Preview ({parsedPreviewQuestions.length} Qs)
                    </span>
                    <div className="flex flex-col gap-4">
                      {parsedPreviewQuestions.map((pq: any, pIdx: number) => (
                        <div key={pIdx} className="p-3 bg-bg-s3 border border-border/60 rounded-lg flex flex-col gap-2 font-sans shadow-sm">
                          <div className="flex justify-between items-center gap-2 border-b border-border/20 pb-1.5 select-none">
                            <span className="text-[9px] font-black uppercase text-saffron tracking-wider">Q{pIdx + 1} ({pq.qType || 'standard'})</span>
                            <span className="text-[8px] font-black uppercase text-text-muted bg-bg-s2 px-1.5 py-0.5 rounded border border-border">{pq.subject || 'General'}</span>
                          </div>
                          <p className="text-xs font-semibold text-text leading-relaxed font-hindi whitespace-pre-wrap">{pq.question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={uploadLoading || !uploadJsonText.trim()}
                className="w-full py-3 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
              >
                {uploadLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading Pool Qs...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload to Question Bank</span>
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
                     <th className="py-2.5 pr-2 w-8">#</th>
                     <th className="py-2.5 px-3">Exam Target</th>
                     <th className="py-2.5 px-3">Subject / Length</th>
                     <th className="py-2.5 px-3">Language</th>
                     <th className="py-2.5 px-3">Date</th>
                     <th className="py-2.5 pl-3 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border/25">
                   {filteredRegistryTests.map((test, idx) => (
                     <tr key={test.id} className="hover:bg-bg-s3/20 transition-colors">
                       <td className="py-3 pr-2 text-text-muted font-black w-8">{idx + 1}</td>
                       <td className="py-3 px-3 font-bold text-text truncate max-w-[120px]" title={test.examNames ? test.examNames.join(', ') : test.examName}>
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
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md z-[999] flex items-center justify-center p-4 select-text">
          <div className="w-full max-w-4xl bg-bg-s2 border border-border rounded-xl shadow-2xl p-6 flex flex-col gap-4 max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-border pb-3 select-none">
              <div className="flex flex-col">
                <h3 className="text-sm font-black uppercase text-saffron tracking-wider">Test Questions Preview</h3>
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
              <div className="p-3 bg-bg-s3/60 border border-saffron-border/20 rounded-lg flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-extrabold uppercase text-text-muted tracking-wider select-none shrink-0 mb-1 font-sans">
                <span>Total Questions: <strong className="text-text">{previewTest.pattern.totalQuestions || previewTest.questions?.length}</strong></span>
                <span>Total Marks: <strong className="text-text">{previewTest.pattern.totalMarks}</strong></span>
                <span>Duration: <strong className="text-text">{previewTest.pattern.durationMinutes} Mins</strong></span>
                <span className="normal-case">Marking Scheme: <strong className="text-text font-bold uppercase">{previewTest.pattern.markingScheme}</strong></span>
              </div>
            )}

            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 my-2">
              {previewTest.questions?.map((q: any, idx: number) => (
                <div key={idx} className="p-5 bg-bg-s3 border border-border rounded-xl flex flex-col gap-4 shadow-sm">
                  <div className="flex justify-between items-center gap-3 border-b border-border/20 pb-2 select-none">
                    <span className="text-xs font-black uppercase text-saffron">
                      Q{idx + 1}
                    </span>
                    <span className="text-[9px] font-black uppercase text-saffron bg-saffron-dim/30 px-2.5 py-0.5 rounded shrink-0 border border-saffron-border/30">
                      {q.subject || 'General'}
                    </span>
                  </div>

                  {q.qType === 'assertion_reason' ? (
                    <div className="flex flex-col gap-3.5">
                      <p className="text-sm sm:text-base font-bold text-text leading-relaxed font-hindi whitespace-pre-wrap">
                        {(() => {
                          const cleaned = stripAssertionReason(q.question);
                          return cleaned.trim() ? cleaned : 'नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए:';
                        })()}
                      </p>
                      <div className="grid grid-cols-1 gap-2.5">
                        <div className="bg-bg-s2 border-l-4 border-saffron rounded-r-lg p-3 flex flex-col gap-1">
                          <span className="text-[9px] font-black uppercase text-saffron block select-none">कथन [Assertion - As]</span>
                          <p className="text-xs sm:text-sm text-text font-medium leading-relaxed font-hindi whitespace-pre-wrap">{q.assertion}</p>
                        </div>
                        <div className="bg-bg-s2 border-l-4 border-blue-500 rounded-r-lg p-3 flex flex-col gap-1">
                          <span className="text-[9px] font-black uppercase text-blue-400 block select-none">कारण [Reason - R]</span>
                          <p className="text-xs sm:text-sm text-text font-medium leading-relaxed font-hindi whitespace-pre-wrap">{q.reason}</p>
                        </div>
                      </div>
                    </div>
                  ) : q.qType === 'match_column' ? (
                    <div className="flex flex-col gap-3.5">
                      <p className="text-sm sm:text-base font-bold text-text leading-relaxed font-hindi whitespace-pre-wrap">
                        {(() => {
                          const cleaned = stripMarkdownTable(q.question);
                          return cleaned.trim() ? cleaned : 'निम्नलिखित को सुमेलित कीजिए-';
                        })()}
                      </p>
                      <div className="border border-border rounded-xl overflow-hidden text-xs sm:text-sm font-hindi shadow-sm">
                        <div className="grid grid-cols-2 bg-bg-s2 border-b border-border/80 text-[10px] font-black uppercase text-text-muted select-none">
                          <div className="px-4 py-2 border-r border-border/40">कॉलम-I</div>
                          <div className="px-4 py-2">कॉलम-II</div>
                        </div>
                        <div className="divide-y divide-border/30 bg-bg-s2/40">
                          {Array.from({ length: Math.max(q.columnI?.length || 0, q.columnII?.length || 0) }).map((_, i) => (
                            <div key={i} className="grid grid-cols-2">
                              <div className="px-4 py-2.5 border-r border-border/30 font-semibold whitespace-pre-wrap flex items-start gap-2">
                                <span className="text-saffron font-black select-none bg-saffron/10 px-1.5 py-0.5 rounded text-[10px] shrink-0">
                                  {String.fromCharCode(65 + i)}
                                </span>
                                <span>{cleanPrefix(q.columnI?.[i] || '')}</span>
                              </div>
                              <div className="px-4 py-2.5 font-semibold whitespace-pre-wrap flex items-start gap-2">
                                <span className="text-blue-400 font-black select-none bg-blue-500/10 px-1.5 py-0.5 rounded text-[10px] shrink-0">
                                  {i + 1}
                                </span>
                                <span>{cleanPrefix(q.columnII?.[i] || '')}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (q.qType === 'ordering' || q.qType === 'multi_statement') ? (
                    <div className="flex flex-col gap-3.5">
                      <p className="text-sm sm:text-base font-bold text-text leading-relaxed font-hindi whitespace-pre-wrap">
                        {(() => {
                          const cleaned = stripStatements(q.question);
                          return cleaned.trim() ? cleaned : 'नीचे दिए गए कथनों को पढ़िए और सही विकल्प चुनिए:';
                        })()}
                      </p>
                      <div className="flex flex-col gap-2 font-hindi">
                        {q.statements?.map((stmt: string, i: number) => {
                          if (!stmt) return null;
                          const label = q.statementLabels?.[i] || `${i + 1}`;
                          return (
                            <div key={i} className="flex items-center gap-3 bg-bg-s2 border border-border/30 rounded-xl px-3 py-2.5 shadow-sm">
                              <span className="w-6 h-6 bg-bg-s3 border border-border/60 rounded-lg flex items-center justify-center text-[10px] font-black text-saffron shrink-0 select-none">
                                {label}
                              </span>
                              <span className="text-xs sm:text-sm text-text font-semibold whitespace-pre-wrap leading-relaxed">{stmt}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <h4 className="text-xs font-black text-text leading-relaxed font-hindi whitespace-pre-wrap">
                      {q.question}
                    </h4>
                  )}
                  
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
                        <span className="w-4 h-4 bg-bg-s1 rounded-full flex items-center justify-center text-[9px] shrink-0 font-black select-none">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="whitespace-pre-wrap">{opt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="mt-2 p-3 bg-bg-s2 border border-border/80 rounded text-[10px] text-text-muted leading-relaxed whitespace-pre-wrap">
                    <span className="font-bold text-saffron uppercase block mb-1 select-none">Answer Explanation</span>
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

                    {/* Question Type Selection */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[8px] font-black uppercase text-text-muted">Question Type</label>
                      <select
                        value={q.qType || 'standard'}
                        onChange={(e) => {
                          const type = e.target.value as any;
                          const updatedQuestions = [...editingTest.questions];
                          updatedQuestions[idx] = {
                            ...q,
                            qType: type,
                            assertion: q.assertion || '',
                            reason: q.reason || '',
                            columnI: q.columnI && q.columnI.length > 0 ? q.columnI : ['', '', '', ''],
                            columnII: q.columnII && q.columnII.length > 0 ? q.columnII : ['', '', '', ''],
                            statements: q.statements && q.statements.length > 0 ? q.statements : ['', '', '', ''],
                            statementLabels: q.statementLabels && q.statementLabels.length > 0 ? q.statementLabels : (type === 'ordering' ? ['K', 'L', 'M', 'N', 'O'] : ['J', 'K', 'L', 'M'])
                          };
                          setEditingTest({ ...editingTest, questions: updatedQuestions });
                        }}
                        className="w-full bg-bg-s2 text-xs text-text border border-border px-3 py-2 rounded-lg outline-none cursor-pointer"
                      >
                        <option value="standard">Standard MCQ (साधारण बहुविकल्पीय)</option>
                        <option value="assertion_reason">Assertion & Reason (कथन और कारण)</option>
                        <option value="match_column">Match the Column (सुमेलित कीजिए)</option>
                        <option value="ordering">Ordering/Sequencing (क्रम में व्यवस्थित करें)</option>
                        <option value="multi_statement">Multi-statement Code (बहु-कथनीय प्रश्न)</option>
                      </select>
                    </div>

                    {/* Conditionally Render Input Fields based on qType */}
                    {q.qType === 'assertion_reason' ? (
                      <div className="flex flex-col gap-3 border border-border/60 p-3 rounded-lg bg-bg-s2/40">
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] font-black uppercase text-text-muted">Directive / Instructions (निर्देश)</label>
                          <textarea
                            value={q.question || ''}
                            onChange={(e) => {
                              const updatedQuestions = [...editingTest.questions];
                              updatedQuestions[idx] = { ...q, question: e.target.value };
                              setEditingTest({ ...editingTest, questions: updatedQuestions });
                            }}
                            className="w-full bg-bg-s2 text-xs text-text border border-border p-2 rounded outline-none h-12 resize-none"
                            placeholder="e.g. निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[8px] font-black uppercase text-saffron">Assertion [As] (कथन)</label>
                            <textarea
                              value={q.assertion || ''}
                              onChange={(e) => {
                                const updatedQuestions = [...editingTest.questions];
                                updatedQuestions[idx] = { ...q, assertion: e.target.value };
                                setEditingTest({ ...editingTest, questions: updatedQuestions });
                              }}
                              className="w-full bg-bg-s2 text-xs text-text border border-border p-2 rounded outline-none h-16 resize-none"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[8px] font-black uppercase text-blue-400">Reason [R] (कारण)</label>
                            <textarea
                              value={q.reason || ''}
                              onChange={(e) => {
                                const updatedQuestions = [...editingTest.questions];
                                updatedQuestions[idx] = { ...q, reason: e.target.value };
                                setEditingTest({ ...editingTest, questions: updatedQuestions });
                              }}
                              className="w-full bg-bg-s2 text-xs text-text border border-border p-2 rounded outline-none h-16 resize-none"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ) : q.qType === 'match_column' ? (
                      <div className="flex flex-col gap-3 border border-border/60 p-3 rounded-lg bg-bg-s2/40">
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] font-black uppercase text-text-muted">Directive / Instructions (निर्देश)</label>
                          <textarea
                            value={q.question || ''}
                            onChange={(e) => {
                              const updatedQuestions = [...editingTest.questions];
                              updatedQuestions[idx] = { ...q, question: e.target.value };
                              setEditingTest({ ...editingTest, questions: updatedQuestions });
                            }}
                            className="w-full bg-bg-s2 text-xs text-text border border-border p-2 rounded outline-none h-12 resize-none"
                            placeholder="e.g. निम्नलिखित को सुमेलित कीजिए-"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-[8px] font-black uppercase text-text-muted">Column Matches (Pairs)</span>
                          <div className="flex flex-col gap-2">
                            {Array.from({ length: 4 }).map((_, colIdx) => {
                              const colIVal = q.columnI?.[colIdx] || '';
                              const colIIVal = q.columnII?.[colIdx] || '';
                              return (
                                <div key={colIdx} className="grid grid-cols-2 gap-3 items-center">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-bold text-text-muted select-none">
                                      {String.fromCharCode(97 + colIdx)}.
                                    </span>
                                    <input
                                      type="text"
                                      value={colIVal}
                                      placeholder={`Column-I Row ${colIdx + 1}`}
                                      onChange={(e) => {
                                        const updatedColI = [...(q.columnI || ['', '', '', ''])];
                                        updatedColI[colIdx] = e.target.value;
                                        const updatedQuestions = [...editingTest.questions];
                                        updatedQuestions[idx] = { ...q, columnI: updatedColI };
                                        setEditingTest({ ...editingTest, questions: updatedQuestions });
                                      }}
                                      className="w-full bg-bg-s2 text-xs text-text border border-border px-2 py-1 rounded outline-none"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-bold text-text-muted select-none">
                                      {['I', 'II', 'III', 'IV', 'V'][colIdx]}.
                                    </span>
                                    <input
                                      type="text"
                                      value={colIIVal}
                                      placeholder={`Column-II Row ${colIdx + 1}`}
                                      onChange={(e) => {
                                        const updatedColII = [...(q.columnII || ['', '', '', ''])];
                                        updatedColII[colIdx] = e.target.value;
                                        const updatedQuestions = [...editingTest.questions];
                                        updatedQuestions[idx] = { ...q, columnII: updatedColII };
                                        setEditingTest({ ...editingTest, questions: updatedQuestions });
                                      }}
                                      className="w-full bg-bg-s2 text-xs text-text border border-border px-2 py-1 rounded outline-none"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (q.qType === 'ordering' || q.qType === 'multi_statement') ? (
                      <div className="flex flex-col gap-3 border border-border/60 p-3 rounded-lg bg-bg-s2/40">
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] font-black uppercase text-text-muted">Directive / Context (निर्देश / प्रसंग)</label>
                          <textarea
                            value={q.question || ''}
                            onChange={(e) => {
                              const updatedQuestions = [...editingTest.questions];
                              updatedQuestions[idx] = { ...q, question: e.target.value };
                              setEditingTest({ ...editingTest, questions: updatedQuestions });
                            }}
                            className="w-full bg-bg-s2 text-xs text-text border border-border p-2 rounded outline-none h-12 resize-none"
                            placeholder="e.g. निम्नलिखित शब्दों को क्रम में व्यवस्थित करें-"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-[8px] font-black uppercase text-text-muted">Statements / Items (कथन / पद)</span>
                          <div className="flex flex-col gap-2">
                            {Array.from({ length: 5 }).map((_, stmtIdx) => {
                              const stmtVal = q.statements?.[stmtIdx] || '';
                              const labelVal = q.statementLabels?.[stmtIdx] || (q.qType === 'ordering' ? ['K', 'L', 'M', 'N', 'O'][stmtIdx] : ['J', 'K', 'L', 'M', 'N'][stmtIdx]);
                              return (
                                <div key={stmtIdx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={labelVal}
                                    onChange={(e) => {
                                      const updatedLabels = [...(q.statementLabels || ['J', 'K', 'L', 'M', 'N'])];
                                      updatedLabels[stmtIdx] = e.target.value;
                                      const updatedQuestions = [...editingTest.questions];
                                      updatedQuestions[idx] = { ...q, statementLabels: updatedLabels };
                                      setEditingTest({ ...editingTest, questions: updatedQuestions });
                                    }}
                                    className="w-8 bg-bg-s2 text-xs text-center font-bold text-saffron border border-border px-1 py-1 rounded outline-none"
                                    placeholder="Label"
                                  />
                                  <input
                                    type="text"
                                    value={stmtVal}
                                    placeholder={`Statement/Item ${stmtIdx + 1}`}
                                    onChange={(e) => {
                                      const updatedStmts = [...(q.statements || ['', '', '', '', ''])];
                                      updatedStmts[stmtIdx] = e.target.value;
                                      const updatedQuestions = [...editingTest.questions];
                                      updatedQuestions[idx] = { ...q, statements: updatedStmts };
                                      setEditingTest({ ...editingTest, questions: updatedQuestions });
                                    }}
                                    className="w-full bg-bg-s2 text-xs text-text border border-border px-2 py-1 rounded outline-none"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
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
                    )}

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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1.5 border-b border-border/20 pb-3">
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

                    {/* Live Preview Block */}
                    <div className="mt-3 flex flex-col gap-2 bg-bg-s2/25 p-3.5 rounded-xl border border-dashed border-border/80">
                      <span className="text-[8.5px] font-black uppercase text-saffron tracking-wider select-none flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> Live Question Rendering Preview
                      </span>
                      
                      <div className="p-4 bg-bg-s3 border border-border rounded-lg shadow-sm font-sans">
                        {q.qType === 'assertion_reason' ? (
                          <div className="flex flex-col gap-3">
                            <p className="text-xs font-bold text-text leading-relaxed font-hindi whitespace-pre-wrap">
                              {(() => {
                                const cleaned = stripAssertionReason(q.question);
                                return cleaned.trim() ? cleaned : 'नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए:';
                              })()}
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                              <div className="bg-bg-s2 border-l-2 border-saffron rounded p-2.5">
                                <span className="text-[7.5px] font-black uppercase text-saffron block mb-0.5 select-none">कथन [As]</span>
                                <p className="text-xs text-text leading-normal font-hindi whitespace-pre-wrap">{q.assertion || '(Assertion Text Empty)'}</p>
                              </div>
                              <div className="bg-bg-s2 border-l-2 border-blue-500 rounded p-2.5">
                                <span className="text-[7.5px] font-black uppercase text-blue-400 block mb-0.5 select-none">कारण [R]</span>
                                <p className="text-xs text-text leading-normal font-hindi whitespace-pre-wrap">{q.reason || '(Reason Text Empty)'}</p>
                              </div>
                            </div>
                          </div>
                        ) : q.qType === 'match_column' ? (
                          <div className="flex flex-col gap-3">
                            <p className="text-xs font-bold text-text leading-relaxed font-hindi whitespace-pre-wrap">
                              {(() => {
                                const cleaned = stripMarkdownTable(q.question);
                                return cleaned.trim() ? cleaned : 'निम्नलिखित को सुमेलित कीजिए-';
                              })()}
                            </p>
                            <div className="border border-border rounded-lg overflow-hidden text-[9.5px] font-hindi">
                              <div className="grid grid-cols-2 bg-bg-s2 border-b border-border/80 text-[7.5px] font-black uppercase text-text-muted select-none">
                                <div className="px-3 py-1.5 border-r border-border/40">कॉलम-I</div>
                                <div className="px-3 py-1.5">कॉलम-II</div>
                              </div>
                              <div className="divide-y divide-border/30 bg-bg-s2/40">
                                {Array.from({ length: Math.max(q.columnI?.length || 0, q.columnII?.length || 0) }).map((_, rIdx) => (
                                  <div key={rIdx} className="grid grid-cols-2">
                                    <div className="px-3 py-1.5 border-r border-border/30 font-semibold whitespace-pre-wrap flex items-start gap-1">
                                      <span className="text-saffron font-black select-none bg-saffron/10 px-1 py-0.5 rounded text-[8px] shrink-0">
                                        {String.fromCharCode(65 + rIdx)}
                                      </span>
                                      <span>{cleanPrefix(q.columnI?.[rIdx] || '')}</span>
                                    </div>
                                    <div className="px-3 py-1.5 font-semibold whitespace-pre-wrap flex items-start gap-1">
                                      <span className="text-blue-400 font-black select-none bg-blue-500/10 px-1 py-0.5 rounded text-[8px] shrink-0">
                                        {rIdx + 1}
                                      </span>
                                      <span>{cleanPrefix(q.columnII?.[rIdx] || '')}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (q.qType === 'ordering' || q.qType === 'multi_statement') ? (
                          <div className="flex flex-col gap-3">
                            <p className="text-xs font-bold text-text leading-relaxed font-hindi whitespace-pre-wrap">
                              {(() => {
                                const cleaned = stripStatements(q.question);
                                return cleaned.trim() ? cleaned : 'नीचे दिए गए कथनों को पढ़िए और सही विकल्प चुनिए:';
                              })()}
                            </p>
                            <div className="flex flex-col gap-1.5 font-hindi">
                              {q.statements?.map((stmt: string, sIdx: number) => {
                                if (!stmt) return null;
                                const label = q.statementLabels?.[sIdx] || `${sIdx + 1}`;
                                return (
                                  <div key={sIdx} className="flex items-center gap-2 bg-bg-s2 border border-border/40 rounded px-2.5 py-1.5">
                                    <span className="w-5 h-5 bg-bg-s3 border border-border/60 rounded flex items-center justify-center text-[8.5px] font-black text-saffron shrink-0 select-none">
                                      {label}
                                    </span>
                                    <span className="text-xs text-text font-semibold whitespace-pre-wrap">{stmt}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs font-bold text-text leading-relaxed font-hindi whitespace-pre-wrap">
                            {q.question || '(Standard Question Text)'}
                          </p>
                        )}
                        
                        {/* Options Live Preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-border/30 font-sans">
                          {q.options?.map((opt: string, optIdx: number) => (
                            <div 
                              key={optIdx} 
                              className={`p-2 rounded text-[10px] font-bold border transition-colors flex items-center gap-2 ${
                                optIdx === q.correctIndex
                                  ? 'bg-greenL/5 border-greenL/25 text-greenL'
                                  : 'bg-bg-s2 border-border text-text-muted'
                              }`}
                            >
                              <span className="w-4 h-4 bg-bg-s1 rounded-full flex items-center justify-center text-[8.5px] shrink-0 font-black select-none">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="whitespace-pre-wrap">{opt || `(Option ${String.fromCharCode(65 + optIdx)} Empty)`}</span>
                            </div>
                          ))}
                        </div>
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
