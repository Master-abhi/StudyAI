import React, { useState, useEffect } from 'react';
import { 
  BookOpen, UploadCloud, FileText, 
  Loader2, CheckCircle, ShieldAlert, Sparkles, Send,
  Database, Edit, Trash2
} from 'lucide-react';
import type { Exam } from '../syllabus/syllabusData';

interface AdminSyllabusProps {
  currentUser: any;
  exams: Exam[];
  onRefreshExams: () => void;
}

interface Material {
  id: string;
  title: string;
  type: string;
  storagePath: string;
  createdAt?: string;
}

const SAMPLE_SYLLABUS_JSON = {
  id: "custom_exam_id",
  name: "EXAM NAME",
  fullName: "Full Name of the Examination (e.g. CGPSC SSE Mains)",
  icon: "🏛️",
  stage: "Prelims",
  daysRemaining: 90,
  totalMarks: 300,
  subjects: [
    {
      id: "subject_id_1",
      name: "General Studies I",
      weightage: 100,
      importance: "Highest",
      pyqFrequency: "Very High",
      isCgSpecific: false,
      chapters: [
        {
          id: "chapter_id_1",
          name: "History and Culture",
          topics: [
            {
              id: "topic_id_1",
              name: "Ancient History of India",
              nameHi: "भारत का प्राचीन इतिहास",
              subtopics: ["Harappan Civilization", "Mauryan Dynasty", "Gupta Empire"],
              importanceScore: 9
            }
          ]
        }
      ]
    }
  ]
};

export const AdminSyllabus: React.FC<AdminSyllabusProps> = ({ currentUser, exams, onRefreshExams }) => {
  const [subTab, setSubTab] = useState<'materials' | 'upload_json' | 'edit_syllabus' | 'sandbox'>('materials');
  
  // Dynamic custom syllabus registry from database to check deletability/status
  const [customSyllabusIds, setCustomSyllabusIds] = useState<string[]>([]);
  
  // Materials registry state
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const [loadingParse, setLoadingParse] = useState<boolean>(false);
  const [loadingJsonAction, setLoadingJsonAction] = useState<boolean>(false);
  
  // PDF Upload Form State
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadType, setUploadType] = useState<string>('study');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // JSON Upload State
  const [uploadJsonText, setUploadJsonText] = useState<string>('');

  // Editing State
  const [editingExamId, setEditingExamId] = useState<string>('');
  const [editJsonText, setEditJsonText] = useState<string>('');

  // Sandbox Parser State
  const [sandboxText, setSandboxText] = useState<string>('');
  const [parsedOutput, setParsedOutput] = useState<any | null>(null);

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

  const sanitizeJsonString = (str: string) => {
    return str
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
      .replace(/\u00A0/g, ' ') // Convert non-breaking spaces to standard spaces
      .trim();
  };

  const fetchMaterials = async () => {
    setLoadingList(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/materials'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMaterials(data || []);
      } else {
        throw new Error('Failed to retrieve study materials.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Could not load study materials registry.');
    } finally {
      setLoadingList(false);
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
    fetchMaterials();
    fetchCustomSyllabusIds();
  }, [currentUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
      if (!uploadTitle) {
        setUploadTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUploadMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setErrorMessage('Please select a PDF file to upload.');
      return;
    }

    setLoadingUpload(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const formData = new FormData();
      formData.append('materialFile', uploadFile);
      formData.append('title', uploadTitle);
      formData.append('type', uploadType);

      const res = await fetch(getApiUrl('/api/admin/upload-material'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully uploaded material "${uploadTitle}"! Extracted PDF text cached in Firestore.`);
        setUploadTitle('');
        setUploadFile(null);
        const fileInput = document.getElementById('material-file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        fetchMaterials();
      } else {
        throw new Error(data.error || 'Server rejected the file upload.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'File upload failed. Ensure server storage rules and key configs are active.');
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSandboxParse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxText.trim()) return;

    setLoadingParse(true);
    setParsedOutput(null);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(getApiUrl('/api/syllabus/parse'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: sandboxText })
      });

      const data = await res.json();
      if (res.ok) {
        setParsedOutput(data);
        setSuccessMessage('Syllabus text parsed successfully by AI model!');
      } else {
        throw new Error(data.error || 'AI parsing request failed.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Could not parse syllabus text. Verify AI Manager is functional.');
    } finally {
      setLoadingParse(false);
    }
  };

  // JSON file selector logic
  const handleJsonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        JSON.parse(sanitizeJsonString(text)); // validation
        setUploadJsonText(text);
        setErrorMessage('');
      } catch (err) {
        setErrorMessage('Selected file contains invalid JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Submit dynamic syllabus JSON
  const handleSaveSyllabusJson = async (jsonTextToSave: string, source: 'upload' | 'edit') => {
    if (!jsonTextToSave.trim()) {
      setErrorMessage('Syllabus JSON content is empty.');
      return;
    }

    setLoadingJsonAction(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const examObj = JSON.parse(sanitizeJsonString(jsonTextToSave));
      
      // Basic validation
      if (!examObj.id || !examObj.name) {
        throw new Error('Syllabus JSON must contain at least "id" and "name" properties.');
      }
      if (!examObj.subjects || !Array.isArray(examObj.subjects)) {
        throw new Error('Syllabus JSON must contain a "subjects" array.');
      }

      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/syllabus/save'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(examObj)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully saved syllabus configuration for "${examObj.name}"!`);
        if (source === 'upload') {
          setUploadJsonText('');
          const fileInput = document.getElementById('syllabus-json-file-input') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        }
        // Refresh dynamic exams list
        onRefreshExams();
        fetchCustomSyllabusIds();
      } else {
        throw new Error(data.error || 'Server failed to save syllabus.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error processing or saving syllabus JSON.');
    } finally {
      setLoadingJsonAction(false);
    }
  };

  // Delete dynamic custom syllabus override
  const handleDeleteCustomSyllabus = async (examIdToDelete: string) => {
    if (!examIdToDelete) return;
    if (!window.confirm(`Are you sure you want to delete the custom configuration/override for "${examIdToDelete}"? This will restore the default built-in structure.`)) return;

    setLoadingJsonAction(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/syllabus/${examIdToDelete}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully deleted custom override for "${examIdToDelete}".`);
        setEditingExamId('');
        setEditJsonText('');
        // Sync parent and local caches
        onRefreshExams();
        fetchCustomSyllabusIds();
      } else {
        throw new Error(data.error || 'Server failed to delete syllabus override.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error deleting custom syllabus configuration.');
    } finally {
      setLoadingJsonAction(false);
    }
  };

  // When admin selects an exam to edit
  const handleSelectExamToEdit = (examId: string) => {
    setEditingExamId(examId);
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!examId) {
      setEditJsonText('');
      return;
    }

    const selectedExam = exams.find(e => e.id === examId);
    if (selectedExam) {
      // Stringify exam object with 2 space formatting
      setEditJsonText(JSON.stringify(selectedExam, null, 2));
    } else {
      setEditJsonText('');
      setErrorMessage('Selected exam structure could not be retrieved.');
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-border/80 pb-0.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'materials', label: 'Study Materials (PDF)', icon: BookOpen },
          { id: 'upload_json', label: 'JSON Syllabus Manager', icon: Database },
          { id: 'edit_syllabus', label: 'Edit Active Syllabi', icon: Edit },
          { id: 'sandbox', label: 'AI Parser Sandbox', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSubTab(tab.id as any);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                isSelected 
                  ? 'border-saffron text-saffron bg-saffron-dim/30' 
                  : 'border-transparent text-text-muted hover:text-text hover:border-border'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-saffron' : 'text-text-muted'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Message Notifications */}
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

      {/* Main viewport panels */}
      <div className="w-full">
        {/* SUB TAB: Study Materials */}
        {subTab === 'materials' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            
            {/* Upload PDF Form */}
            <div className="bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <UploadCloud className="w-4.5 h-4.5 text-saffron" />
                <h3 className="text-xs font-black uppercase text-text tracking-wider">Upload Study PDF</h3>
              </div>

              <form onSubmit={handleUploadMaterial} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Document Title</label>
                  <input
                    type="text"
                    placeholder="Enter custom title or filename"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none"
                    disabled={loadingUpload}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-text-muted">Material Type</label>
                    <select
                      value={uploadType}
                      onChange={(e) => setUploadType(e.target.value)}
                      className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                      disabled={loadingUpload}
                    >
                      <option value="study">Study Notes (PDF)</option>
                      <option value="syllabus">Official Syllabus (PDF)</option>
                      <option value="notes">Reference Materials</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Select PDF Document</label>
                  <input
                    id="material-file-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-saffron file:text-bg-s1 hover:file:bg-orange-500"
                    disabled={loadingUpload}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingUpload}
                  className="w-full mt-2 py-3 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
                >
                  {loadingUpload ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading PDF & Extracting text...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload & Sync Material</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Registry List Table */}
            <div className="xl:col-span-2 bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <BookOpen className="w-4.5 h-4.5 text-saffron" />
                <h3 className="text-xs font-black uppercase text-text tracking-wider">Materials Registry</h3>
              </div>

              {loadingList ? (
                <div className="flex flex-col items-center justify-center py-16 gap-2 text-text-muted">
                  <Loader2 className="w-6 h-6 animate-spin text-saffron" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Loading Materials...</span>
                </div>
              ) : materials.length === 0 ? (
                <div className="text-center py-12 text-xs text-text-muted border border-dashed border-border/60 rounded-lg">
                  No custom study PDFs registered. Upload a file to populate.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border/50 text-[10px] text-text-muted font-black uppercase tracking-wider">
                        <th className="py-2.5 pr-3">Material Document</th>
                        <th className="py-2.5 px-3">Type</th>
                        <th className="py-2.5 px-3">Storage Link Path</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/25">
                      {materials.map(mat => (
                        <tr key={mat.id} className="hover:bg-bg-s3/20 transition-colors">
                          <td className="py-3 pr-3 font-bold text-text truncate max-w-[150px]" title={mat.title}>
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-saffron shrink-0" />
                              <span className="truncate">{mat.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[8px] font-black uppercase px-2 py-0.5 border border-border bg-bg-s3 rounded text-text-muted leading-none">
                              {mat.type}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-text-muted text-[10px] font-bold font-mono truncate max-w-[200px]" title={mat.storagePath}>
                            {mat.storagePath}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SUB TAB: JSON Syllabus Manager */}
        {subTab === 'upload_json' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* JSON Upload & Input */}
            <div className="lg:col-span-2 bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3 justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4.5 h-4.5 text-saffron" />
                  <h3 className="text-xs font-black uppercase text-text tracking-wider">Add Syllabus via JSON</h3>
                </div>
                <button
                  onClick={() => setUploadJsonText(JSON.stringify(SAMPLE_SYLLABUS_JSON, null, 2))}
                  className="px-2.5 py-1 bg-saffron-dim/20 hover:bg-saffron-dim/40 border border-saffron-border/30 text-[9px] font-black uppercase tracking-wider text-saffron rounded cursor-pointer transition-all active:scale-[0.97]"
                >
                  Load Template Format
                </button>
              </div>

              <div className="flex flex-col gap-4 text-xs">
                {/* File picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Upload JSON File</label>
                  <input
                    id="syllabus-json-file-input"
                    type="file"
                    accept=".json"
                    onChange={handleJsonFileChange}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none cursor-pointer file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-saffron file:text-bg-s1 hover:file:bg-orange-500"
                    disabled={loadingJsonAction}
                  />
                </div>

                {/* Paste Area */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Or Paste Raw JSON Structure</label>
                  <textarea
                    placeholder="Paste full Exam configuration JSON structure here..."
                    value={uploadJsonText}
                    onChange={(e) => setUploadJsonText(e.target.value)}
                    rows={12}
                    className="w-full bg-bg-s3 text-xs font-mono text-text border border-border focus:border-saffron p-3.5 rounded-lg outline-none resize-none leading-relaxed"
                    disabled={loadingJsonAction}
                  />
                </div>

                <button
                  onClick={() => handleSaveSyllabusJson(uploadJsonText, 'upload')}
                  disabled={loadingJsonAction || !uploadJsonText.trim()}
                  className="w-full py-3.5 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md font-sans"
                >
                  {loadingJsonAction ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Syllabus Config...</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-3.5 h-3.5" />
                      <span>Save & Sync Syllabus</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Helper Instructions Schema */}
            <div className="bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-3">
              <h3 className="text-xs font-black uppercase text-text-muted tracking-wider border-b border-border/40 pb-2.5">
                Expected Schema Format
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed font-medium">
                The syllabus structure should be uploaded in the standard configuration matching the client's `Exam` layout.
              </p>
              <div className="bg-bg-s3 border border-border rounded p-3 font-mono text-[9px] text-text-muted leading-normal flex flex-col gap-2.5 overflow-x-auto select-text">
                <div>
                  <span className="text-saffron font-bold">Exam Metadata:</span>
                  <br />
                  - <strong className="text-text">id</strong> (string, unique key e.g. "cg_patwari")
                  <br />
                  - <strong className="text-text">name</strong> (string, short abbreviation)
                  <br />
                  - <strong className="text-text">fullName</strong> (string, complete display title)
                  <br />
                  - <strong className="text-text">icon</strong> (emoji)
                  <br />
                  - <strong className="text-text">stage</strong> ("Prelims" | "Mains" | "Written Exam")
                  <br />
                  - <strong className="text-text">daysRemaining</strong> (number)
                  <br />
                  - <strong className="text-text">totalMarks</strong> (number)
                </div>
                <div>
                  <span className="text-saffron font-bold">Nested Structure:</span>
                  <br />
                  - **subjects** (Array):
                  <div className="pl-3.5">
                    - **id** (string), **name** (string)
                    <br />
                    - **weightage** (number), **importance** ("Highest" | "High" | "Medium" | "Low")
                    <br />
                    - **pyqFrequency** (string)
                    <br />
                    - **chapters** (Array):
                    <div className="pl-3.5">
                      - **id** (string), **name** (string)
                      <br />
                      - **topics** (Array):
                      <div className="pl-3.5">
                        - **id** (string), **name** (string, EN)
                        <br />
                        - **nameHi** (string, HI)
                        <br />
                        - **importanceScore** (number 1-10)
                        <br />
                        - **subtopics** (Array of strings)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB TAB: Edit Active Syllabi */}
        {subTab === 'edit_syllabus' && (
          <div className="bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-5 w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-3 border-b border-border/40 pb-4 justify-between w-full">
              <div className="flex items-center gap-2">
                <Edit className="w-4.5 h-4.5 text-saffron" />
                <h3 className="text-xs font-black uppercase text-text tracking-wider">Edit Currently Added Syllabi</h3>
              </div>
              
              {/* Dropdown selector */}
              <div className="flex items-center gap-2.5">
                <label className="text-[10px] font-black uppercase text-text-muted tracking-wider whitespace-nowrap">Select Syllabus:</label>
                <select
                  value={editingExamId}
                  onChange={(e) => handleSelectExamToEdit(e.target.value)}
                  className="bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2 rounded-lg outline-none cursor-pointer min-w-[200px]"
                  disabled={loadingJsonAction}
                >
                  <option value="">-- Choose Exam Syllabus --</option>
                  {exams.map(ex => (
                    <option key={ex.id} value={ex.id}>
                      {ex.fullName || ex.name} ({ex.id}) {customSyllabusIds.includes(ex.id) ? '★ [Custom]' : '[Built-in]'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {editingExamId ? (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase text-text-muted">Edit Raw JSON Structure</label>
                    <span className="text-[9px] text-text-muted font-mono bg-bg-s3 px-2 py-0.5 border border-border rounded">
                      ID: {editingExamId}
                    </span>
                  </div>
                  <textarea
                    value={editJsonText}
                    onChange={(e) => setEditJsonText(e.target.value)}
                    rows={16}
                    className="w-full bg-bg-s3 text-xs font-mono text-text border border-border focus:border-saffron p-3.5 rounded-lg outline-none resize-none leading-relaxed"
                    disabled={loadingJsonAction}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full mt-1">
                  <button
                    onClick={() => handleSaveSyllabusJson(editJsonText, 'edit')}
                    disabled={loadingJsonAction || !editJsonText.trim()}
                    className="flex-1 py-3 bg-saffron hover:bg-orange-500 text-xs font-black uppercase text-bg-s1 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
                  >
                    {loadingJsonAction ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Database className="w-3.5 h-3.5" />
                    )}
                    <span>Save & Update Syllabus</span>
                  </button>

                  {customSyllabusIds.includes(editingExamId) && (
                    <button
                      onClick={() => handleDeleteCustomSyllabus(editingExamId)}
                      disabled={loadingJsonAction}
                      className="py-3 px-6 bg-red-500 hover:bg-red-600 text-xs font-black uppercase text-white rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                      <span>Delete Custom Override</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-border/60 rounded-xl text-xs text-text-muted leading-relaxed max-w-md mx-auto">
                Select one of the default built-in examinations or custom added syllabi from the dropdown selection box to inspect and edit its structure.
              </div>
            )}
          </div>
        )}

        {/* SUB TAB: AI Parser Sandbox */}
        {subTab === 'sandbox' && (
          <div className="bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2 border-b border-border/40 pb-3">
              <Sparkles className="w-4.5 h-4.5 text-saffron animate-pulse" />
              <h3 className="text-xs font-black uppercase text-text tracking-wider">AI Syllabus Parser Sandbox</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Paste area */}
              <form onSubmit={handleSandboxParse} className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase text-text-muted">Paste Syllabus Description Text (English/Hindi)</label>
                <textarea
                  placeholder="e.g. CGPSC Paper-I Syllabus details: History of India, Physical Geography, Indian Constitution, Local Art & Tribes of Chhattisgarh..."
                  value={sandboxText}
                  onChange={(e) => setSandboxText(e.target.value)}
                  className="w-full h-80 bg-bg-s3 text-xs text-text border border-border focus:border-saffron p-3.5 rounded-lg outline-none resize-none font-medium leading-relaxed"
                  disabled={loadingParse}
                  required
                />
                
                <button
                  type="submit"
                  disabled={loadingParse || !sandboxText.trim()}
                  className="w-full py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md mt-1"
                >
                  {loadingParse ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>AI Parsing syllabus structure...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Parse Syllabus with AI</span>
                    </>
                  )}
                </button>
              </form>

              {/* Parsed JSON Preview */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-text-muted">Structured Preview</label>
                
                <div className="flex-1 bg-bg-s3 border border-border rounded-lg p-4 font-mono text-[10px] overflow-y-auto leading-relaxed max-h-80 lg:max-h-none h-80 lg:h-auto select-text">
                  {parsedOutput ? (
                    <div className="flex flex-col gap-3">
                      <div className="text-saffron font-bold">Syllabus Name: {parsedOutput.name}</div>
                      <div className="text-greenL font-bold">Total Extracted Topics: {parsedOutput.totalTopics || 0}</div>
                      
                      {parsedOutput.subjects?.map((sub: any, sIdx: number) => (
                        <div key={sIdx} className="border-t border-border/60 pt-2 mt-2 flex flex-col gap-1 text-text">
                          <span className="font-bold text-text-muted uppercase">Subject {sIdx + 1}: {sub.name}</span>
                          <ul className="list-disc pl-4 flex flex-col gap-1 text-text-muted mt-1 font-sans">
                            {sub.topics?.map((topic: any, tIdx: number) => (
                              <li key={tIdx}>
                                <span className="font-bold text-text">{topic.name}</span> <span className="text-[9px] text-text-muted font-mono">(ID: {topic.id})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-text-muted italic flex items-center h-full justify-center text-center">
                      Parsed subjects and topics structure will be shown here.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
