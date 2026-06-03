import React, { useState, useEffect } from 'react';
import { 
  BookOpen, UploadCloud, FileText, 
  Loader2, CheckCircle, ShieldAlert, Sparkles, Send 
} from 'lucide-react';

interface AdminSyllabusProps {
  currentUser: any;
}

interface Material {
  id: string;
  title: string;
  type: string;
  storagePath: string;
  createdAt?: string;
}

export const AdminSyllabus: React.FC<AdminSyllabusProps> = ({ currentUser }) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const [loadingParse, setLoadingParse] = useState<boolean>(false);
  
  // Forms State
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadType, setUploadType] = useState<string>('study');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Sandbox Parser State
  const [sandboxText, setSandboxText] = useState<string>('');
  const [parsedOutput, setParsedOutput] = useState<any | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const getApiUrl = (path: string) => {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    return `${host}${path}`;
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

  useEffect(() => {
    fetchMaterials();
  }, [currentUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
      if (!uploadTitle) {
        // Pre-fill title with file name without extension
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
        // Reset file input element
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

    try {
      const res = await fetch(getApiUrl('/api/syllabus'), {
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

      {/* Upload and Registry Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Upload Form */}
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

        {/* Uploaded Registry List */}
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

      {/* Syllabus Parser Sandbox */}
      <div className="bg-bg-s2 border border-border p-5 rounded-xl shadow-md flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-border/40 pb-3">
          <Sparkles className="w-4.5 h-4.5 text-saffron animate-pulse" />
          <h3 className="text-xs font-black uppercase text-text tracking-wider">AI Syllabus Parser Sandbox</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Paste area */}
          <form onSubmit={handleSandboxParse} className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase text-text-muted">Paste Syllabus Syllabus text (English/Hindi)</label>
            <textarea
              placeholder="e.g. CGPSC Paper-I Syllabus details: History of India, Physical Geography, Indian Constitution, Local Art & Tribes of Chhattisgarh..."
              value={sandboxText}
              onChange={(e) => setSandboxText(e.target.value)}
              className="w-full h-64 bg-bg-s3 text-xs text-text border border-border focus:border-saffron p-3.5 rounded-lg outline-none resize-none font-medium leading-relaxed"
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
            
            <div className="flex-1 bg-bg-s3 border border-border rounded-lg p-4 font-mono text-[10px] overflow-y-auto leading-relaxed max-h-64 lg:max-h-none h-64 lg:h-auto select-text">
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
    </div>
  );
};
