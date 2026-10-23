const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../mcq-practice/src/components/PracticeTab.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update fetchSubjectFolders
const oldFetch = `  // Fetch subject folders on mount or mode/exam change
  const fetchSubjectFolders = async () => {
    setLoading(true);
    try {
      const examSubjectsParam = activeExam?.subjects ? encodeURIComponent(activeExam.subjects.map((s: any) => s.name || s.nameHi || '').filter(Boolean).join(',')) : '';
      const res = await fetch(getApiUrl(\`/api/tests/subjects?examId=\${activeExam?.id || ''}&mode=\${activeMode}&examSubjects=\${examSubjectsParam}\`));
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setSubjectFolders(data);
        }
      }
    } catch (err) {
      console.warn('Failed to load subject folders from server:', err);
    } finally {
      setLoading(false);
    }
  };`;

const newFetch = `  // Fetch subject folders or tests on mount or mode/exam change
  const fetchSubjectFolders = async () => {
    setLoading(true);
    try {
      if (activeMode === 'pyq') {
        // Fetch all PYQ tests directly for the active exam
        const res = await fetch(getApiUrl(\`/api/tests?examId=\${activeExam?.id || ''}&mode=pyq\`));
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setTests(data);
          }
        }
      } else {
        const examSubjectsParam = activeExam?.subjects ? encodeURIComponent(activeExam.subjects.map((s: any) => s.name || s.nameHi || '').filter(Boolean).join(',')) : '';
        const res = await fetch(getApiUrl(\`/api/tests/subjects?examId=\${activeExam?.id || ''}&mode=\${activeMode}&examSubjects=\${examSubjectsParam}\`));
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setSubjectFolders(data);
          }
        }
      }
    } catch (err) {
      console.warn('Failed to load subject folders/tests from server:', err);
    } finally {
      setLoading(false);
    }
  };`;

// Normalize line endings for replacement
const normalize = s => s.replace(/\r\n/g, '\n');
const isCrlf = code.includes('\r\n');

let codeNorm = normalize(code);
const oldFetchNorm = normalize(oldFetch);
const newFetchNorm = normalize(newFetch);

if (!codeNorm.includes(oldFetchNorm)) {
  console.error('Could not find oldFetch in PracticeTab.tsx');
  process.exit(1);
}
codeNorm = codeNorm.replace(oldFetchNorm, newFetchNorm);

// 2. Update baseFilteredTests
const oldBase = `  const baseFilteredTests = tests.filter(t => 
    t.mode === activeMode && 
    isTestMatchingExamSyllabus(t, activeExam)
  );`;

const newBase = `  const baseFilteredTests = tests.filter(t => 
    t.mode === activeMode && 
    (activeMode === 'pyq' || isTestMatchingExamSyllabus(t, activeExam))
  );`;

const oldBaseNorm = normalize(oldBase);
const newBaseNorm = normalize(newBase);

if (!codeNorm.includes(oldBaseNorm)) {
  console.error('Could not find oldBase in PracticeTab.tsx');
  process.exit(1);
}
codeNorm = codeNorm.replace(oldBaseNorm, newBaseNorm);

// 3. Add search input in PYQ section
const oldPyqHeader = `            {/* List of uploaded PYQ Papers */}
            <div className="flex flex-col gap-3">
              <div className="border-b border-border pb-1.5 flex items-center justify-between">
                <h4 className="text-xs font-black text-text uppercase">Available PYQ Papers ({filteredTests.length})</h4>
              </div>`;

const newPyqHeader = `            {/* List of uploaded PYQ Papers */}
            <div className="flex flex-col gap-3">
              <div className="border-b border-border pb-1.5 flex items-center justify-between">
                <h4 className="text-xs font-black text-text uppercase">Available PYQ Papers ({filteredTests.length})</h4>
              </div>

              {/* Search bar for PYQ Papers */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search PYQ papers by exam name, year (e.g. 2024, Patwari, SI, Hostel Warden, CGPSC)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg pl-9 pr-8 py-2 text-xs font-semibold text-text placeholder-text-muted outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-text-muted hover:text-text cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>`;

const oldPyqHeaderNorm = normalize(oldPyqHeader);
const newPyqHeaderNorm = normalize(newPyqHeader);

if (!codeNorm.includes(oldPyqHeaderNorm)) {
  console.error('Could not find oldPyqHeader in PracticeTab.tsx');
  process.exit(1);
}
codeNorm = codeNorm.replace(oldPyqHeaderNorm, newPyqHeaderNorm);

// Convert back to CRLF if original was CRLF
if (isCrlf) {
  codeNorm = codeNorm.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, codeNorm, 'utf8');
console.log('Successfully updated PracticeTab.tsx!');
