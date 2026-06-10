import React, { useState, useEffect } from 'react';
import { 
  Save, Loader2, CheckCircle, ShieldAlert, 
  Eye, EyeOff, Layers, Plus, Trash2, ArrowLeft,
  ChevronDown, ChevronRight, Sliders, BookOpen
} from 'lucide-react';
import type { Exam, Subject, Chapter, Topic } from '../syllabus/syllabusData';

interface AdminExamsConfigProps {
  currentUser: any;
  exams: Exam[];
  onRefreshExams: () => void;
}

export const AdminExamsConfig: React.FC<AdminExamsConfigProps> = ({ currentUser, exams, onRefreshExams }) => {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [editorMode, setEditorMode] = useState<'visual' | 'json'>('visual');
  const [jsonText, setJsonText] = useState<string>('');
  
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [customSyllabusIds, setCustomSyllabusIds] = useState<string[]>([]);
  const [expandedSubjects, setExpandedSubjects] = useState<Record<number, boolean>>({});
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  
  const [loadingGet, setLoadingGet] = useState<boolean>(true);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

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

  const fetchExamVisibility = async () => {
    setLoadingGet(true);
    setErrorMessage('');
    try {
      const res = await fetch(getApiUrl('/api/admin/config/exams'));
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.visibility) {
          const newVisibility: Record<string, boolean> = {};
          exams.forEach(ex => {
            newVisibility[ex.id] = data.visibility[ex.id] !== false;
          });
          setVisibility(newVisibility);
        } else {
          const defaultVis: Record<string, boolean> = {};
          exams.forEach(ex => {
            defaultVis[ex.id] = true;
          });
          setVisibility(defaultVis);
        }
      } else {
        throw new Error('Failed to retrieve exam settings.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Could not load exam visibility configurations.');
    } finally {
      setLoadingGet(false);
    }
  };

  const fetchCustomSyllabusIds = async () => {
    try {
      const res = await fetch(getApiUrl('/api/syllabus/custom'));
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCustomSyllabusIds(data.map((exam: any) => exam.id));
        }
      }
    } catch (e) {
      console.error('Error fetching custom syllabus IDs:', e);
    }
  };

  useEffect(() => {
    fetchExamVisibility();
    fetchCustomSyllabusIds();
  }, [currentUser, exams]);

  const handleToggleVisibility = (examId: string) => {
    setVisibility(prev => ({
      ...prev,
      [examId]: !prev[examId]
    }));
  };

  const handleSaveVisibility = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSave(true);
    setErrorMessage('');
    setSuccessMessage('');

    const visibleCount = Object.values(visibility).filter(Boolean).length;
    if (visibleCount === 0) {
      setErrorMessage('At least one exam must remain visible to keep target selection active.');
      setLoadingSave(false);
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      const url = getApiUrl('/api/admin/config/exams');
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ visibility })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage('Exam visibility settings updated successfully!');
      } else {
        throw new Error(data.error || 'Server rejected updates.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to update exam configurations.');
    } finally {
      setLoadingSave(false);
    }
  };

  // --- Exam Editor Helpers ---
  const startCreateExam = () => {
    const defaultExam: Exam = {
      id: '',
      name: '',
      fullName: '',
      icon: '🏛️',
      stage: 'Prelims',
      daysRemaining: 60,
      totalMarks: 100,
      subjects: []
    };
    setEditingExam(defaultExam);
    setJsonText(JSON.stringify(defaultExam, null, 2));
    setEditorMode('visual');
    setExpandedSubjects({});
    setExpandedChapters({});
    setView('create');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const startEditExam = (exam: Exam) => {
    const cloned = JSON.parse(JSON.stringify(exam));
    cloned.subjects = cloned.subjects || [];
    cloned.subjects.forEach((sub: any) => {
      sub.chapters = sub.chapters || [];
      sub.chapters.forEach((chap: any) => {
        chap.topics = chap.topics || [];
        chap.topics.forEach((top: any) => {
          top.subtopics = top.subtopics || [];
        });
      });
    });
    setEditingExam(cloned);
    setJsonText(JSON.stringify(cloned, null, 2));
    setEditorMode('visual');
    setExpandedSubjects({});
    setExpandedChapters({});
    setView('edit');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const updateExamDetails = (fields: Partial<Exam>) => {
    setEditingExam(prev => {
      if (!prev) return null;
      return { ...prev, ...fields };
    });
  };

  const handleSwitchMode = (mode: 'visual' | 'json') => {
    if (mode === 'visual') {
      try {
        const parsed = JSON.parse(jsonText);
        if (!parsed.id) {
          setErrorMessage('JSON must contain a unique "id" string.');
          return;
        }
        setEditingExam(parsed);
        setErrorMessage('');
      } catch (e: any) {
        setErrorMessage(`Invalid JSON: ${e.message}. Fix any errors before switching to visual editor.`);
        return;
      }
    } else {
      setJsonText(JSON.stringify(editingExam, null, 2));
      setErrorMessage('');
    }
    setEditorMode(mode);
  };

  const toggleSubjectExpand = (idx: number) => {
    setExpandedSubjects(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleChapterExpand = (key: string) => {
    setExpandedChapters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addSubject = () => {
    setEditingExam(prev => {
      if (!prev) return null;
      const newIdx = prev.subjects.length;
      setExpandedSubjects(current => ({ ...current, [newIdx]: true }));
      const newSubject: Subject = {
        id: `sub_${Date.now()}`,
        name: 'New Subject',
        weightage: 10,
        importance: 'Medium',
        pyqFrequency: 'Medium',
        chapters: [],
        isCgSpecific: false
      };
      return { ...prev, subjects: [...prev.subjects, newSubject] };
    });
  };

  const deleteSubject = (subjectIdx: number) => {
    setEditingExam(prev => {
      if (!prev) return null;
      return {
        ...prev,
        subjects: prev.subjects.filter((_, idx) => idx !== subjectIdx)
      };
    });
  };

  const updateSubject = (subjectIdx: number, fields: Partial<Subject>) => {
    setEditingExam(prev => {
      if (!prev) return null;
      const subjects = [...prev.subjects];
      subjects[subjectIdx] = { ...subjects[subjectIdx], ...fields };
      return { ...prev, subjects };
    });
  };

  const addChapter = (subjectIdx: number) => {
    setEditingExam(prev => {
      if (!prev) return null;
      const subjects = [...prev.subjects];
      const newChapterIdx = subjects[subjectIdx].chapters.length;
      const chapterKey = `${subjectIdx}-${newChapterIdx}`;
      setExpandedChapters(current => ({ ...current, [chapterKey]: true }));
      const newChapter: Chapter = {
        id: `chap_${Date.now()}`,
        name: 'New Chapter',
        topics: []
      };
      subjects[subjectIdx] = {
        ...subjects[subjectIdx],
        chapters: [...subjects[subjectIdx].chapters, newChapter]
      };
      return { ...prev, subjects };
    });
  };

  const deleteChapter = (subjectIdx: number, chapterIdx: number) => {
    setEditingExam(prev => {
      if (!prev) return null;
      const subjects = [...prev.subjects];
      subjects[subjectIdx] = {
        ...subjects[subjectIdx],
        chapters: subjects[subjectIdx].chapters.filter((_, idx) => idx !== chapterIdx)
      };
      return { ...prev, subjects };
    });
  };

  const updateChapter = (subjectIdx: number, chapterIdx: number, fields: Partial<Chapter>) => {
    setEditingExam(prev => {
      if (!prev) return null;
      const subjects = [...prev.subjects];
      const chapters = [...subjects[subjectIdx].chapters];
      chapters[chapterIdx] = { ...chapters[chapterIdx], ...fields };
      subjects[subjectIdx] = { ...subjects[subjectIdx], chapters };
      return { ...prev, subjects };
    });
  };

  const addTopic = (subjectIdx: number, chapterIdx: number) => {
    setEditingExam(prev => {
      if (!prev) return null;
      const subjects = [...prev.subjects];
      const chapters = [...subjects[subjectIdx].chapters];
      const newTopic: Topic = {
        id: `topic_${Date.now()}`,
        name: 'New Topic',
        nameHi: 'नया विषय',
        subtopics: [],
        importanceScore: 5
      };
      chapters[chapterIdx] = {
        ...chapters[chapterIdx],
        topics: [...chapters[chapterIdx].topics, newTopic]
      };
      subjects[subjectIdx] = { ...subjects[subjectIdx], chapters };
      return { ...prev, subjects };
    });
  };

  const deleteTopic = (subjectIdx: number, chapterIdx: number, topicIdx: number) => {
    setEditingExam(prev => {
      if (!prev) return null;
      const subjects = [...prev.subjects];
      const chapters = [...subjects[subjectIdx].chapters];
      chapters[chapterIdx] = {
        ...chapters[chapterIdx],
        topics: chapters[chapterIdx].topics.filter((_, idx) => idx !== topicIdx)
      };
      subjects[subjectIdx] = { ...subjects[subjectIdx], chapters };
      return { ...prev, subjects };
    });
  };

  const updateTopic = (subjectIdx: number, chapterIdx: number, topicIdx: number, fields: Partial<Topic>) => {
    setEditingExam(prev => {
      if (!prev) return null;
      const subjects = [...prev.subjects];
      const chapters = [...subjects[subjectIdx].chapters];
      const topics = [...chapters[chapterIdx].topics];
      topics[topicIdx] = { ...topics[topicIdx], ...fields };
      chapters[chapterIdx] = { ...chapters[chapterIdx], topics };
      subjects[subjectIdx] = { ...subjects[subjectIdx], chapters };
      return { ...prev, subjects };
    });
  };

  // --- API Integrations ---
  const handleSaveExam = async () => {
    let examToSave = editingExam;

    if (editorMode === 'json') {
      try {
        examToSave = JSON.parse(jsonText);
      } catch (e: any) {
        setErrorMessage(`Invalid JSON format: ${e.message}. Please fix errors before saving.`);
        return;
      }
    }

    if (!examToSave) return;

    // Validations
    if (!examToSave.id?.trim()) {
      setErrorMessage('Exam ID is required.');
      return;
    }
    if (!/^[a-z0-9_]+$/.test(examToSave.id)) {
      setErrorMessage('Exam ID must contain only lowercase letters, numbers, and underscores (e.g., cgpsc_sse).');
      return;
    }
    if (view === 'create' && exams.some(ex => ex.id === examToSave.id)) {
      setErrorMessage(`An exam with ID "${examToSave.id}" already exists. Please use a unique ID.`);
      return;
    }
    if (!examToSave.name?.trim()) {
      setErrorMessage('Short Name is required.');
      return;
    }
    if (!examToSave.fullName?.trim()) {
      setErrorMessage('Full Name is required.');
      return;
    }

    setLoadingSave(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Sanitize subtopics
    const cleanExam = JSON.parse(JSON.stringify(examToSave));
    cleanExam.subjects = cleanExam.subjects || [];
    cleanExam.subjects.forEach((sub: any) => {
      sub.chapters = sub.chapters || [];
      sub.chapters.forEach((chap: any) => {
        chap.topics = chap.topics || [];
        chap.topics.forEach((top: any) => {
          if (Array.isArray(top.subtopics)) {
            top.subtopics = top.subtopics.map((s: string) => s.trim()).filter(Boolean);
          } else {
            top.subtopics = [];
          }
        });
      });
    });

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/syllabus/save'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cleanExam)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully saved syllabus/exam structure for "${cleanExam.name}"!`);
        setView('list');
        onRefreshExams();
        fetchCustomSyllabusIds();
      } else {
        throw new Error(data.error || 'Server failed to save syllabus.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error processing or saving syllabus structure.');
    } finally {
      setLoadingSave(false);
    }
  };

  const handleDeleteCustomSyllabus = async (examId: string) => {
    if (!window.confirm(`Are you sure you want to delete the custom configuration/override for "${examId}"? This will restore the default built-in structure.`)) return;

    setLoadingSave(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/syllabus/${examId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully deleted custom syllabus config for "${examId}".`);
        onRefreshExams();
        fetchCustomSyllabusIds();
      } else {
        throw new Error(data.error || 'Server failed to delete syllabus.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error deleting custom syllabus configuration.');
    } finally {
      setLoadingSave(false);
    }
  };

  if (view === 'create' || view === 'edit') {
    if (!editingExam) return null;
    return (
      <div className="flex flex-col gap-6 animate-fade-in w-full pb-10">
        {/* Editor Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('list')}
              className="p-1.5 hover:bg-bg-s3 border border-border/60 rounded text-text-muted hover:text-text transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex flex-col">
              <h3 className="text-sm font-black uppercase text-text tracking-wider">
                {view === 'create' ? 'Create New Exam' : `Edit Exam: ${editingExam.name}`}
              </h3>
              <span className="text-[8px] font-black uppercase tracking-widest text-text-muted mt-0.5">
                Configure syllabus subjects, weightages and timelines
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setView('list')}
              className="px-4 py-2 border border-border bg-bg-s2 hover:bg-bg-s3 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveExam}
              disabled={loadingSave}
              className="px-4 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {loadingSave ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{view === 'create' ? 'Create Exam' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        {/* Toggle Mode Navigation */}
        <div className="flex border-b border-border/40 pb-0.5 gap-1">
          <button
            type="button"
            onClick={() => handleSwitchMode('visual')}
            className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              editorMode === 'visual'
                ? 'border-saffron text-saffron bg-saffron-dim/20'
                : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            Visual Tree Editor
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('json')}
            className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              editorMode === 'json'
                ? 'border-saffron text-saffron bg-saffron-dim/20'
                : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            Raw JSON Editor
          </button>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {editorMode === 'json' ? (
          <div className="bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <h4 className="text-xs font-black uppercase text-text tracking-wider">Raw Exam configuration JSON</h4>
              <span className="text-[9px] text-text-muted font-mono bg-bg-s3 px-2 py-0.5 border border-border rounded">
                Strict JSON format required
              </span>
            </div>
            
            <textarea
              placeholder="Paste or write full Exam JSON schema here..."
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={22}
              className="w-full bg-bg-s3 text-xs font-mono text-text border border-border focus:border-saffron p-4 rounded-lg outline-none resize-none leading-relaxed"
              disabled={loadingSave}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Basic Exam Meta Inputs */}
            <div className="lg:col-span-1 bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
                <Sliders className="w-4 h-4 text-saffron" />
                <h4 className="text-xs font-black uppercase text-text tracking-wider">Basic Information</h4>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-text-muted">Unique Exam ID</label>
                <input
                  type="text"
                  placeholder="e.g. cgpsc_sse, cgv_patwari"
                  value={editingExam.id}
                  onChange={(e) => updateExamDetails({ id: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={view === 'edit' || loadingSave}
                  required
                />
                <span className="text-[8px] text-text-muted mt-0.5 leading-normal">
                  Lowercase letters, numbers and underscores only. This acts as the database key and cannot be changed later.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-text-muted">Exam Short Name</label>
                <input
                  type="text"
                  placeholder="e.g. CGPSC SSE"
                  value={editingExam.name}
                  onChange={(e) => updateExamDetails({ name: e.target.value })}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none font-sans"
                  disabled={loadingSave}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-text-muted">Exam Full Title</label>
                <input
                  type="text"
                  placeholder="e.g. Chhattisgarh State Service Exam"
                  value={editingExam.fullName}
                  onChange={(e) => updateExamDetails({ fullName: e.target.value })}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none font-sans"
                  disabled={loadingSave}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase text-text-muted">Emoji Icon</label>
                  <input
                    type="text"
                    placeholder="e.g. 🏛️"
                    value={editingExam.icon}
                    onChange={(e) => updateExamDetails({ icon: e.target.value })}
                    className="w-full bg-bg-s3 text-center text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none"
                    disabled={loadingSave}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase text-text-muted">Exam Stage</label>
                  <select
                    value={editingExam.stage}
                    onChange={(e) => updateExamDetails({ stage: e.target.value as any })}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                    disabled={loadingSave}
                  >
                    <option value="Prelims">Prelims</option>
                    <option value="Mains">Mains</option>
                    <option value="Written Exam">Written Exam</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase text-text-muted">Days Remaining</label>
                  <input
                    type="number"
                    min={0}
                    value={editingExam.daysRemaining}
                    onChange={(e) => updateExamDetails({ daysRemaining: parseInt(e.target.value) || 0 })}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none"
                    disabled={loadingSave}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase text-text-muted">Total Marks</label>
                  <input
                    type="number"
                    min={0}
                    value={editingExam.totalMarks}
                    onChange={(e) => updateExamDetails({ totalMarks: parseInt(e.target.value) || 0 })}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none"
                    disabled={loadingSave}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Syllabus (Subjects, Chapters, Topics) editor */}
            <div className="lg:col-span-2 bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-saffron" />
                  <h4 className="text-xs font-black uppercase text-text tracking-wider">Syllabus Structure</h4>
                </div>
                <button
                  type="button"
                  onClick={addSubject}
                  className="px-2.5 py-1 bg-saffron/10 border border-saffron-border/30 hover:bg-saffron/20 text-saffron text-[9px] font-black uppercase tracking-wider rounded flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Subject</span>
                </button>
              </div>

              {editingExam.subjects.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border/60 rounded-xl text-xs text-text-muted leading-relaxed max-w-md mx-auto my-6">
                  No subjects added to this syllabus yet. Click "+ Add Subject" to start building.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {editingExam.subjects.map((subject, subjectIdx) => {
                    const isSubjectExpanded = !!expandedSubjects[subjectIdx];
                    const totalChapters = subject.chapters?.length || 0;
                    const totalTopics = subject.chapters?.reduce((sum, c) => sum + (c.topics?.length || 0), 0) || 0;

                    return (
                      <div key={subject.id || subjectIdx} className="bg-bg-s3/10 border border-border/60 rounded-xl overflow-hidden">
                        {/* Subject Header */}
                        <div className="p-3 bg-bg-s3/30 border-b border-border/30 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <button
                              type="button"
                              onClick={() => toggleSubjectExpand(subjectIdx)}
                              className="p-1 hover:bg-bg-s3 border border-border/30 rounded text-text-muted hover:text-text transition-colors"
                            >
                              {isSubjectExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                            </button>
                            <span className="text-xs font-bold text-text truncate">
                              {subject.name || 'Untitled Subject'}
                            </span>
                            <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-bg-s3 border border-border text-text-muted rounded-full leading-none shrink-0">
                              {totalChapters} chapters • {totalTopics} topics
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => deleteSubject(subjectIdx)}
                            className="p-1 hover:bg-red-500/10 text-text-muted hover:text-redL border border-transparent hover:border-red-500/10 rounded transition-colors"
                            title="Delete Subject"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Subject Details */}
                        {isSubjectExpanded && (
                          <div className="p-4 flex flex-col gap-4 animate-fade-in bg-bg-s3/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              <div className="flex flex-col gap-1">
                                <label className="text-[8px] font-black uppercase text-text-muted font-sans">Subject Name</label>
                                <input
                                  type="text"
                                  value={subject.name}
                                  onChange={(e) => updateSubject(subjectIdx, { name: e.target.value })}
                                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-2.5 py-1.5 rounded-md outline-none"
                                  required
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label className="text-[8px] font-black uppercase text-text-muted">Weightage</label>
                                <input
                                  type="number"
                                  value={subject.weightage}
                                  onChange={(e) => updateSubject(subjectIdx, { weightage: parseInt(e.target.value) || 0 })}
                                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-2.5 py-1.5 rounded-md outline-none"
                                  required
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label className="text-[8px] font-black uppercase text-text-muted">Importance</label>
                                <select
                                  value={subject.importance}
                                  onChange={(e) => updateSubject(subjectIdx, { importance: e.target.value as any })}
                                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-2.5 py-1.5 rounded-md outline-none cursor-pointer"
                                >
                                  <option value="Highest">Highest</option>
                                  <option value="High">High</option>
                                  <option value="Medium">Medium</option>
                                  <option value="Low">Low</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="flex flex-col gap-1">
                                <label className="text-[8px] font-black uppercase text-text-muted">PYQ Frequency</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Very High"
                                  value={subject.pyqFrequency}
                                  onChange={(e) => updateSubject(subjectIdx, { pyqFrequency: e.target.value })}
                                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-2.5 py-1.5 rounded-md outline-none"
                                />
                              </div>

                              <div className="flex items-center gap-2 md:mt-4">
                                <input
                                  type="checkbox"
                                  id={`sub-cg-${subjectIdx}`}
                                  checked={!!subject.isCgSpecific}
                                  onChange={(e) => updateSubject(subjectIdx, { isCgSpecific: e.target.checked })}
                                  className="w-3.5 h-3.5 rounded text-saffron focus:ring-saffron bg-bg-s3 border-border cursor-pointer"
                                />
                                <label htmlFor={`sub-cg-${subjectIdx}`} className="text-[9px] font-black uppercase text-text-muted cursor-pointer select-none">
                                  CG Specific Subject
                                </label>
                              </div>
                            </div>

                            {/* Chapters Area */}
                            <div className="flex flex-col gap-3 border-t border-border/40 pt-4 mt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">Chapters in Subject</span>
                                <button
                                  type="button"
                                  onClick={() => addChapter(subjectIdx)}
                                  className="px-2 py-0.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-[8px] font-black uppercase tracking-wider text-saffron rounded flex items-center gap-1 transition-all"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                  <span>Add Chapter</span>
                                </button>
                              </div>

                              {(subject.chapters || []).length === 0 ? (
                                <div className="text-center py-4 text-[10px] text-text-muted border border-dashed border-border/20 rounded-md">
                                  No chapters added. Click "Add Chapter".
                                </div>
                              ) : (
                                <div className="flex flex-col gap-3">
                                  {(subject.chapters || []).map((chapter, chapterIdx) => {
                                    const chapterKey = `${subjectIdx}-${chapterIdx}`;
                                    const isChapterExpanded = !!expandedChapters[chapterKey];
                                    const totalTopicsInChapter = chapter.topics?.length || 0;

                                    return (
                                      <div key={chapter.id || chapterIdx} className="border border-border/40 rounded-lg bg-bg-s2/40 overflow-hidden">
                                        {/* Chapter Header */}
                                        <div className="p-2 bg-bg-s2 border-b border-border/30 flex items-center justify-between gap-3">
                                          <div className="flex items-center gap-2 min-w-0">
                                            <button
                                              type="button"
                                              onClick={() => toggleChapterExpand(chapterKey)}
                                              className="p-0.5 hover:bg-bg-s3 border border-border/30 rounded text-text-muted hover:text-text transition-colors"
                                            >
                                              {isChapterExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                            </button>
                                            <span className="text-[11px] font-bold text-text truncate">
                                              {chapter.name || 'Untitled Chapter'}
                                            </span>
                                            <span className="text-[8px] font-black px-1.5 py-0.5 bg-bg-s3 text-text-muted rounded">
                                              {totalTopicsInChapter} topics
                                            </span>
                                          </div>

                                          <button
                                            type="button"
                                            onClick={() => deleteChapter(subjectIdx, chapterIdx)}
                                            className="p-1 hover:bg-red-500/10 text-text-muted hover:text-redL rounded border border-transparent hover:border-red-500/10 transition-colors"
                                            title="Delete Chapter"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>

                                        {/* Chapter Details */}
                                        {isChapterExpanded && (
                                          <div className="p-3 flex flex-col gap-3">
                                            <div className="flex flex-col gap-1">
                                              <label className="text-[8px] font-black uppercase text-text-muted">Chapter Name</label>
                                              <input
                                                type="text"
                                                value={chapter.name}
                                                onChange={(e) => updateChapter(subjectIdx, chapterIdx, { name: e.target.value })}
                                                className="w-full bg-bg-s3 text-[11px] text-text border border-border focus:border-saffron px-2 py-1 rounded-md outline-none"
                                                required
                                              />
                                            </div>

                                            {/* Topics Area */}
                                            <div className="flex flex-col gap-2 border-t border-border/30 pt-3">
                                              <div className="flex items-center justify-between">
                                                <span className="text-[8px] font-black uppercase text-text-muted tracking-wider">Topics</span>
                                                <button
                                                  type="button"
                                                  onClick={() => addTopic(subjectIdx, chapterIdx)}
                                                  className="px-1.5 py-0.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-[7px] font-black uppercase tracking-wider text-saffron rounded flex items-center gap-0.5 transition-all"
                                                >
                                                  <Plus className="w-2 h-2" />
                                                  <span>Add Topic</span>
                                                </button>
                                              </div>

                                              {(chapter.topics || []).length === 0 ? (
                                                <div className="text-center py-2 text-[9px] text-text-muted border border-dashed border-border/10 rounded">
                                                  No topics. Click "Add Topic".
                                                </div>
                                              ) : (
                                                <div className="flex flex-col gap-2">
                                                  {(chapter.topics || []).map((topic, topicIdx) => (
                                                    <div key={topic.id || topicIdx} className="p-2.5 bg-bg-s3/30 border border-border/30 rounded-md flex flex-col gap-2 relative">
                                                      <button
                                                        type="button"
                                                        onClick={() => deleteTopic(subjectIdx, chapterIdx, topicIdx)}
                                                        className="absolute top-2 right-2 p-0.5 hover:bg-red-500/10 text-text-muted hover:text-redL rounded border border-transparent hover:border-red-500/10 transition-colors"
                                                        title="Delete Topic"
                                                      >
                                                        <Trash2 className="w-3 h-3" />
                                                      </button>

                                                      <div className="grid grid-cols-2 gap-2 pr-6">
                                                        <div className="flex flex-col gap-0.5">
                                                          <span className="text-[7px] font-black uppercase text-text-muted">Topic Name (EN)</span>
                                                          <input
                                                            type="text"
                                                            value={topic.name}
                                                            onChange={(e) => updateTopic(subjectIdx, chapterIdx, topicIdx, { name: e.target.value })}
                                                            className="bg-bg-s3 text-[10px] text-text border border-border/60 focus:border-saffron px-2 py-1 rounded outline-none font-medium"
                                                            required
                                                          />
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                          <span className="text-[7px] font-black uppercase text-text-muted">Topic Name (HI)</span>
                                                          <input
                                                            type="text"
                                                            value={topic.nameHi}
                                                            onChange={(e) => updateTopic(subjectIdx, chapterIdx, topicIdx, { nameHi: e.target.value })}
                                                            className="bg-bg-s3 text-[10px] text-text border border-border/60 focus:border-saffron px-2 py-1 rounded outline-none font-medium"
                                                            required
                                                          />
                                                        </div>
                                                      </div>

                                                      <div className="grid grid-cols-3 gap-2">
                                                        <div className="col-span-2 flex flex-col gap-0.5">
                                                          <span className="text-[7px] font-black uppercase text-text-muted">Subtopics (Comma-separated)</span>
                                                          <input
                                                            type="text"
                                                            placeholder="e.g. sub1, sub2"
                                                            value={topic.subtopics?.join(', ') || ''}
                                                            onChange={(e) => {
                                                              const arr = e.target.value.split(',').map(s => s.trim());
                                                              updateTopic(subjectIdx, chapterIdx, topicIdx, { subtopics: arr });
                                                            }}
                                                            className="bg-bg-s3 text-[10px] text-text border border-border/60 focus:border-saffron px-2 py-1 rounded outline-none"
                                                          />
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                          <span className="text-[7px] font-black uppercase text-text-muted">Score (1-10)</span>
                                                          <input
                                                            type="number"
                                                            min={1}
                                                            max={10}
                                                            value={topic.importanceScore || 5}
                                                            onChange={(e) => updateTopic(subjectIdx, chapterIdx, topicIdx, { importanceScore: parseInt(e.target.value) || 5 })}
                                                            className="bg-bg-s3 text-[10px] text-text border border-border/60 focus:border-saffron px-2 py-1 rounded outline-none"
                                                            required
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Grid View (Default) ---
  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      {/* Alert Messages */}
      {successMessage && (
        <div className="p-4 bg-greenL/10 border border-greenL/20 text-greenL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
          <button type="button" onClick={() => setSuccessMessage('')} className="ml-auto text-greenL/60 hover:text-greenL">✕</button>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs animate-fade-in">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
          <button type="button" onClick={() => setErrorMessage('')} className="ml-auto text-redL/60 hover:text-redL">✕</button>
        </div>
      )}

      {loadingGet ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2 text-text-muted">
          <Loader2 className="w-6 h-6 animate-spin text-saffron" />
          <span className="text-[10px] font-black uppercase tracking-wider">Retrieving exam configs...</span>
        </div>
      ) : (
        <form onSubmit={handleSaveVisibility} className="bg-bg-s2 border border-border p-6 rounded-xl shadow-md flex flex-col gap-6 max-w-5xl">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-3">
            <div className="flex items-center gap-2.5">
              <Layers className="w-4.5 h-4.5 text-saffron" />
              <h3 className="text-xs font-black uppercase text-text tracking-wider">Exam Manager & Selector</h3>
            </div>
            
            <button
              type="button"
              onClick={startCreateExam}
              className="px-4 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.98] shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Exam</span>
            </button>
          </div>

          <p className="text-xs text-text-muted leading-relaxed">
            Configure which exams are visible to regular users in the app selection menu (onboarding modal, dashboard drawer, and syllabus dropdown). Click <strong>Edit Exam</strong> on any card to update its details (like days remaining, total marks) and edit its syllabus hierarchy visually or via raw JSON data. Custom configurations will override built-in settings.
          </p>

          {/* Exams List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {exams.map(exam => {
              const isVisible = visibility[exam.id] !== false;
              const isCustom = customSyllabusIds.includes(exam.id);
              
              return (
                <div 
                  key={exam.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                    isVisible
                      ? 'bg-bg-s3/40 border-border/80 hover:border-saffron-border/30'
                      : 'bg-bg-s3/10 border-border/20 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-xl ${
                        isVisible ? 'bg-saffron/10 text-saffron border border-saffron-border/25' : 'bg-bg-s1 text-text-muted border border-border/40'
                      }`}>
                        {exam.icon || '🏛️'}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-black text-text leading-snug truncate">{exam.name}</span>
                        <span className="text-[8px] font-black tracking-wider uppercase text-text-muted mt-0.5 flex items-center gap-1.5">
                          <span>ID: {exam.id}</span>
                          {isCustom && (
                            <span className="text-[7px] font-black uppercase px-1 border border-saffron-border/20 bg-saffron-dim/20 text-saffron rounded leading-none">
                              Custom
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {/* Status Badge */}
                      <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider flex items-center gap-1 ${
                        isVisible 
                          ? 'bg-greenL/10 text-greenL border border-greenL/20 shadow-sm' 
                          : 'bg-red-500/10 text-redL border border-red-500/20'
                      }`}>
                        {isVisible ? (
                          <>
                            <Eye className="w-2.5 h-2.5" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-2.5 h-2.5" />
                            <span>Hidden</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-text-muted leading-relaxed min-h-[36px]">
                    {exam.fullName} • {exam.stage} • <strong className="text-text">{exam.daysRemaining} days</strong> remaining.
                  </p>

                  <div className="flex flex-col gap-3.5 border-t border-border/40 pt-3.5 mt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">User Menu Visibility</span>
                      
                      {/* Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => handleToggleVisibility(exam.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isVisible ? 'bg-saffron' : 'bg-bg-s3 border border-border'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-text shadow ring-0 transition duration-200 ease-in-out ${
                            isVisible ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Actions Panel */}
                    <div className="flex items-center gap-2 mt-0.5">
                      <button
                        type="button"
                        onClick={() => startEditExam(exam)}
                        className="flex-1 py-1.5 bg-bg-s3 hover:bg-bg-s2 border border-border/80 text-[10px] font-black uppercase text-saffron rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Sliders className="w-3 h-3" />
                        <span>Edit Exam</span>
                      </button>

                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomSyllabus(exam.id)}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-[10px] font-black uppercase text-redL rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer"
                          title="Delete custom override database records"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loadingSave}
            className="w-full mt-4 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md font-sans"
          >
            {loadingSave ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving settings...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Exam Visibility Settings</span>
              </>
            )}
          </button>

        </form>
      )}
    </div>
  );
};
