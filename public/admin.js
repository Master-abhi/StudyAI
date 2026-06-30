// ═══════════════════════════════════════════
//   Admin Panel — Firebase Auth Version
// ═══════════════════════════════════════════

// ── API Base URL Auto-configuration & Fetch Interceptor ──
let API_BASE = 'https://study-ai-olive.vercel.app';

async function configureApiBase() {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600);
      const res = await fetch('http://localhost:3000/api/health', { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        API_BASE = 'http://localhost:3000';
        console.log('[API] Local backend detected. Using http://localhost:3000');
        return;
      }
    } catch (e) {}

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600);
      const res = await fetch('http://localhost:3001/api/health', { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        API_BASE = 'http://localhost:3001';
        console.log('[API] Local backend detected. Using http://localhost:3001');
        return;
      }
    } catch (e) {}
    
    if (window.location.port && window.location.port !== '5500' && window.location.port !== '8080') {
      API_BASE = '';
      console.log('[API] Served directly from backend. Using relative paths.');
      return;
    }
  } else if (window.location.hostname.endsWith('.web.app') || window.location.hostname.endsWith('.firebaseapp.com')) {
    API_BASE = 'https://study-ai-olive.vercel.app';
  } else if (window.location.hostname !== '') {
    API_BASE = ''; // Production relative paths
  }
  console.log('[API] Active API Base URL:', API_BASE || '(Relative)');
}

// Intercept window.fetch to automatically prepend API_BASE to relative /api/ routes
const originalFetch = window.fetch;
window.fetch = async function (resource, options) {
  let url = resource;
  if (typeof resource === 'string' && resource.startsWith('/api/')) {
    url = API_BASE + resource;
  }
  return originalFetch(url, options);
};

// Configure base URL on startup
configureApiBase();

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

const adminAuthPersistenceReady = firebase.auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch((err) => {
    console.warn('[Admin Auth] Persistence setup failed:', err);
  });

/**
 * Get Firebase ID token for authenticated API calls.
 * Automatically refreshes if expired.
 */
async function getAuthHeader() {
  await adminAuthPersistenceReady;
  const user = firebase.auth().currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { 'Authorization': `Bearer ${token}` };
}

// ── Auth State Listener ──
adminAuthPersistenceReady.then(() => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // Check admin custom claim
      const tokenResult = await user.getIdTokenResult();
      if (tokenResult.claims.admin === true) {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('dashboard-container').classList.remove('hidden');
        loadDashboard();
      } else {
        // Signed in but not admin — sign out
        await firebase.auth().signOut();
        showToast('Access denied. Not an admin account.', 'error');
      }
    } else {
      document.getElementById('login-container').classList.remove('hidden');
      document.getElementById('dashboard-container').classList.add('hidden');
    }
  });
});

async function loginAdmin() {
  const id = document.getElementById('admin-id').value.trim();
  const pass = document.getElementById('admin-pass').value;

  if (!id || !pass) {
    showToast('Please fill all fields', 'error');
    return;
  }

  // Admins also use the userID@studyworld.app email scheme internally
  const email = `${id.toLowerCase()}@studyworld.app`;

  try {
    await adminAuthPersistenceReady;
    await firebase.auth().signInWithEmailAndPassword(email, pass);
    // onAuthStateChanged will check admin claim and show dashboard
  } catch (err) {
    let msg = 'Login failed. Check Admin ID and password.';
    if (err.code === 'auth/user-not-found') msg = 'Admin ID not found.';
    else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') msg = 'Invalid Admin ID or password.';
    showToast(msg, 'error');
  }
}

async function logout() {
  await firebase.auth().signOut();
  window.location.reload();
}


let isSelectorsInitialized = false;

async function loadDashboard() {
  // Load AI state
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/config/ai', { headers });
    const data = await res.json();
    const active = data.activeAI || 'groq';
    document.getElementById('btn-groq').classList.toggle('active', active === 'groq');
    document.getElementById('btn-gemini').classList.toggle('active', active === 'gemini');
    document.getElementById('btn-claude').classList.toggle('active', active === 'claude');

    if (data.geminiModelTest) {
      document.getElementById('gemini-model-test').value = data.geminiModelTest;
    }
    if (data.geminiModelAnalytics) {
      document.getElementById('gemini-model-analytics').value = data.geminiModelAnalytics;
    }
    if (data.geminiModelChat) {
      document.getElementById('gemini-model-chat').value = data.geminiModelChat;
    }
    if (data.geminiModelNews) {
      document.getElementById('gemini-model-news').value = data.geminiModelNews;
    }
  } catch (e) {
    showToast('Failed to load AI config', 'error');
  }

  // Load Materials
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/materials', { headers });
    const data = await res.json();
    const list = document.getElementById('materials-list');
    list.innerHTML = data.map(m => `<li><span>📄 ${m.title} <small>(${m.type})</small></span></li>`).join('');
  } catch (e) {
    showToast('Failed to load materials', 'error');
  }

  // Initialize selectors once
  if (!isSelectorsInitialized) {
    initExamAndSubjectSelects();
    isSelectorsInitialized = true;
  }

  // Load generated tests
  loadGeneratedTestsAdmin();

  // Load training data list
  loadTrainingDataList();
}

async function setAI(model) {
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/config/ai', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model })
    });
    if (res.ok) {
      showToast(`Switched to ${model}`);
      loadDashboard();
    }
  } catch (e) {
    showToast('Failed to switch AI', 'error');
  }
}

async function saveGeminiModel(type) {
  try {
    const headers = await getAuthHeader();
    const payload = {};
    if (type === 'test') {
      payload.geminiModelTest = document.getElementById('gemini-model-test').value;
    } else if (type === 'analytics') {
      payload.geminiModelAnalytics = document.getElementById('gemini-model-analytics').value;
    } else if (type === 'chat') {
      payload.geminiModelChat = document.getElementById('gemini-model-chat').value;
    } else if (type === 'news') {
      payload.geminiModelNews = document.getElementById('gemini-model-news').value;
    }

    const res = await fetch('/api/admin/config/ai', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast(`Gemini ${type} model updated successfully`);
      loadDashboard();
    } else {
      const errData = await res.json();
      showToast(errData.error || 'Failed to update Gemini model', 'error');
    }
  } catch (e) {
    showToast('Failed to save Gemini model configuration', 'error');
  }
}

async function uploadMaterial() {
  const fileInput = document.getElementById('mat-file');
  const titleInput = document.getElementById('mat-title').value;
  const typeInput = document.getElementById('mat-type').value;

  if (!fileInput.files.length) return showToast('Please select a PDF', 'error');

  const formData = new FormData();
  formData.append('materialFile', fileInput.files[0]);
  formData.append('title', titleInput);
  formData.append('type', typeInput);

  showToast('Uploading & extracting... (This may take a moment)');

  try {
    const headers = await getAuthHeader();
    // Note: Do NOT set Content-Type manually for FormData — browser sets it with boundary
    const res = await fetch('/api/admin/upload-material', {
      method: 'POST',
      headers,
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      showToast('Material uploaded successfully ✅');
      loadDashboard();
      fileInput.value = '';
      document.getElementById('mat-title').value = '';
    } else {
      showToast(data.error || 'Upload failed', 'error');
    }
  } catch (e) {
    showToast('Failed to upload: ' + e.message, 'error');
  }
}

function initExamAndSubjectSelects() {
  const allExams = { ...SYLLABUS_DATA, ...(window.CGPSC_EXAM_DATA || {}) };
  const examSelect = document.getElementById('test-exam-select');
  if (!examSelect) return;

  examSelect.innerHTML = '<option value="">-- Select Exam --</option>';
  Object.entries(allExams).forEach(([id, exam]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = exam.fullName || exam.name;
    examSelect.appendChild(option);
  });

  examSelect.addEventListener('change', () => {
    const examId = examSelect.value;
    const subjectSelect = document.getElementById('test-subject-select');
    subjectSelect.innerHTML = '<option value="all">All Subjects (Mixed)</option>';

    if (!examId || !allExams[examId]) return;
    const exam = allExams[examId];
    if (exam.subjects) {
      exam.subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.name;
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
      });
    }
  });
}

async function loadGeneratedTestsAdmin() {
  const list = document.getElementById('admin-tests-list');
  if (!list) return;
  list.innerHTML = '<div class="profile-loading">Loading generated tests...</div>';

  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/tests', { headers });
    const tests = await res.json();

    if (tests.length === 0) {
      list.innerHTML = '<li style="color: var(--text-muted);">No generated tests on server.</li>';
      return;
    }

    list.innerHTML = tests.map(t => {
      const dateStr = t.createdAt ? new Date(t.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
      return `
        <li>
          <div>
            <strong>${t.examName}</strong> — ${t.subject === 'all' ? 'All Subjects' : t.subject}<br>
            <small style="color: var(--text-muted);">${t.mode.toUpperCase()} • ${t.language.toUpperCase()} • ${t.totalQuestions} Qs • ${dateStr}</small>
          </div>
          <button onclick="deleteTestAdmin('${t.id}')" style="width: auto; padding: 4px 10px; margin: 0; background: var(--error); font-size: 11px;">Delete</button>
        </li>
      `;
    }).join('');
  } catch (e) {
    list.innerHTML = '<li style="color: var(--error);">Failed to load tests.</li>';
    showToast('Failed to load generated tests', 'error');
  }
}

async function generateTestAdmin() {
  const examSelect = document.getElementById('test-exam-select');
  const subjectSelect = document.getElementById('test-subject-select');
  const modeSelect = document.getElementById('test-mode-select');
  const langSelect = document.getElementById('test-lang-select');
  const generateBtn = document.getElementById('btn-generate-test-admin');

  const examId = examSelect.value;
  if (!examId) return showToast('Please select a target exam', 'error');

  const allExams = { ...SYLLABUS_DATA, ...(window.CGPSC_EXAM_DATA || {}) };
  const exam = allExams[examId];
  const examName = exam.fullName || exam.name;
  const subject = subjectSelect.value;
  const mode = modeSelect.value;
  const language = langSelect.value;
  const examSubjects = exam.subjects ? exam.subjects.map(s => s.name) : [];

  generateBtn.disabled = true;
  generateBtn.textContent = 'Generating with AI... 🤖';
  showToast('Generating test questions. This can take up to a minute.');

  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/tests/generate', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examId,
        examName,
        subject,
        mode,
        language,
        subjects: examSubjects
      })
    });

    const data = await res.json();
    if (res.ok) {
      showToast('AI Test generated & saved successfully! ✅');
      loadGeneratedTestsAdmin();
    } else {
      showToast(data.error || 'Failed to generate test', 'error');
    }
  } catch (e) {
    showToast('Error generating test: ' + e.message, 'error');
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate & Save Test';
  }
}

async function deleteTestAdmin(testId) {
  if (!confirm('Are you sure you want to delete this test?')) return;

  try {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/tests/${testId}`, {
      method: 'DELETE',
      headers
    });
    const data = await res.json();
    if (res.ok) {
      showToast('Test deleted successfully');
      loadGeneratedTestsAdmin();
    } else {
      showToast(data.error || 'Failed to delete test', 'error');
    }
  } catch (e) {
    showToast('Error deleting test: ' + e.message, 'error');
  }
}

async function refreshNewsAdmin() {
  const refreshBtn = document.getElementById('btn-refresh-news-admin');
  const statusText = document.getElementById('news-status-admin');

  refreshBtn.disabled = true;
  refreshBtn.textContent = 'Refreshing & Summarizing with AI... 📡';
  statusText.textContent = 'Scraping articles and running AI summaries in parallel...';

  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/news/refresh', {
      method: 'POST',
      headers
    });
    const data = await res.json();

    if (res.ok) {
      showToast('News refreshed and AI summarized successfully! ✅');
      const dateStr = data.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : 'Just now';
      statusText.textContent = `Last update: ${dateStr} • Refreshed ${data.totalArticles} articles.`;
    } else {
      showToast(data.error || 'News refresh failed', 'error');
      statusText.textContent = 'Failed to refresh. Try again.';
    }
  } catch (e) {
    showToast('News refresh error: ' + e.message, 'error');
    statusText.textContent = 'Error: ' + e.message;
  } finally {
    refreshBtn.disabled = false;
    refreshBtn.textContent = 'Refresh News (AI-Summarized)';
  }
}

// ═══════════════════════════════════════════
//   📖 Training Data / Knowledge Base
// ═══════════════════════════════════════════

let trainingDataList = []; // cached list for search/filter

function switchTDTab(tab) {
  const tabs = ['single', 'bulk', 'file', 'stats', 'template'];
  tabs.forEach(t => {
    document.getElementById(`td-panel-${t}`).classList.toggle('hidden', t !== tab);
    document.getElementById(`td-tab-${t}`).classList.toggle('active', t === tab);
  });

  if (tab === 'stats') loadTrainingDataStats();
}

async function uploadFileTrainingData() {
  const fileInput = document.getElementById('td-file-upload');
  const subject = document.getElementById('td-file-subject').value;
  const source = document.getElementById('td-file-source').value.trim();
  const aiExtract = document.getElementById('td-file-ai-extract').checked;
  const examTags = Array.from(document.querySelectorAll('.td-file-exam-tag:checked')).map(cb => cb.value);
  const progressEl = document.getElementById('td-file-progress');
  const progressBarContainer = document.getElementById('td-file-progress-bar-container');
  const progressBar = document.getElementById('td-file-progress-bar');
  const btn = document.getElementById('btn-td-upload-file');

  if (!fileInput.files.length) return showToast('Pehle file select karo (PDF ya TXT)', 'error');

  const file = fileInput.files[0];
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) return showToast('File 10MB se badi nahi honi chahiye', 'error');

  const ext = file.name.split('.').pop().toLowerCase();
  if (!['pdf', 'txt'].includes(ext)) return showToast('Sirf PDF aur TXT files supported hain', 'error');

  btn.disabled = true;
  btn.textContent = '\u23F3 Processing...';
  progressBarContainer.style.display = 'block';
  progressBar.style.width = '10%';
  progressEl.textContent = '\ud83d\udce4 File upload ho rahi hai...';

  try {
    const formData = new FormData();
    formData.append('trainingFile', file);
    if (subject) formData.append('subject', subject);
    if (source) formData.append('source', source);
    formData.append('aiExtract', aiExtract ? 'true' : 'false');
    formData.append('examTags', JSON.stringify(examTags));

    progressBar.style.width = '30%';
    progressEl.textContent = '\ud83e\udd16 AI text extract kar raha hai...';

    const headers = await getAuthHeader();
    // Remove Content-Type for FormData (browser sets it with boundary)
    delete headers['Content-Type'];
    const res = await fetch('/api/admin/training-data/upload-file', {
      method: 'POST',
      headers,
      body: formData
    });

    progressBar.style.width = '80%';
    progressEl.textContent = '\ud83d\udcbe Data save ho raha hai...';

    const data = await res.json();

    if (res.ok) {
      progressBar.style.width = '100%';
      progressBar.style.background = 'var(--success)';
      progressEl.textContent = `\u2705 ${data.entriesCreated || 1} entries created! (${data.totalChars || 0} chars extracted)`;
      showToast(`File se ${data.entriesCreated || 1} training data entries ban gayi! \u2705`);
      fileInput.value = '';
      loadTrainingDataList();

      // Show extracted entries preview
      if (data.entries && data.entries.length > 0) {
        let preview = data.entries.map((e, i) => 
          `${i+1}. ${e.subject} \u2014 ${e.topic} (${e.charCount} chars)`
        ).join('\n');
        progressEl.textContent += '\n\n' + preview;
        progressEl.style.whiteSpace = 'pre-wrap';
      }
    } else {
      progressBar.style.width = '100%';
      progressBar.style.background = 'var(--error)';
      progressEl.textContent = '\u274c Error: ' + (data.error || 'Upload failed');
      showToast(data.error || 'File upload failed', 'error');
    }
  } catch (e) {
    progressBar.style.width = '100%';
    progressBar.style.background = 'var(--error)';
    progressEl.textContent = '\u274c Error: ' + e.message;
    showToast('File upload error: ' + e.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = '\ud83d\udcc4 Upload & Extract Training Data';
    // Reset progress bar after 5s
    setTimeout(() => {
      progressBar.style.width = '0%';
      progressBar.style.background = 'var(--primary)';
      progressBarContainer.style.display = 'none';
    }, 5000);
  }
}

async function uploadSingleTrainingData() {
  const subject = document.getElementById('td-subject').value;
  const topic = document.getElementById('td-topic').value.trim();
  const content = document.getElementById('td-content').value.trim();
  const source = document.getElementById('td-source').value.trim();
  const examTags = Array.from(document.querySelectorAll('.td-exam-tag:checked')).map(cb => cb.value);

  if (!subject) return showToast('Subject select करें', 'error');
  if (!topic) return showToast('Topic enter करें', 'error');
  if (!content) return showToast('Content paste करें', 'error');
  if (content.length < 20) return showToast('Content bahut chhota hai. Kam se kam 20 characters chahiye.', 'error');

  const btn = document.getElementById('btn-td-upload-single');
  btn.disabled = true;
  btn.textContent = 'Uploading... 📤';

  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/training-data/upload', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, topic, content, source, examTags })
    });
    const data = await res.json();
    if (res.ok) {
      showToast(`Training data uploaded! (${data.entry?.charCount || content.length} chars) ✅`);
      // Clear form
      document.getElementById('td-subject').value = '';
      document.getElementById('td-topic').value = '';
      document.getElementById('td-content').value = '';
      document.getElementById('td-source').value = '';
      loadTrainingDataList();
    } else {
      showToast(data.error || 'Upload failed', 'error');
    }
  } catch (e) {
    showToast('Upload error: ' + e.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = '📖 Upload Training Data';
  }
}

function loadBulkFile() {
  const fileInput = document.getElementById('td-bulk-file');
  if (!fileInput.files.length) return showToast('Pehle .json file select karo', 'error');

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      document.getElementById('td-bulk-json').value = JSON.stringify(parsed, null, 2);
      showToast(`File loaded! ${Array.isArray(parsed) ? parsed.length : 1} entries found.`);
    } catch (err) {
      showToast('Invalid JSON file: ' + err.message, 'error');
    }
  };
  reader.readAsText(fileInput.files[0]);
}

async function uploadBulkTrainingData() {
  const jsonText = document.getElementById('td-bulk-json').value.trim();
  const statusEl = document.getElementById('td-bulk-status');

  if (!jsonText) return showToast('JSON paste ya file load karo pehle', 'error');

  let entries;
  try {
    entries = JSON.parse(jsonText);
    if (!Array.isArray(entries)) entries = [entries];
  } catch (err) {
    return showToast('Invalid JSON format: ' + err.message, 'error');
  }

  // Validate entries
  const invalid = entries.filter(e => !e.subject || !e.topic || !e.content);
  if (invalid.length > 0) {
    return showToast(`${invalid.length} entries me subject/topic/content missing hai`, 'error');
  }

  if (entries.length > 50) {
    return showToast('Max 50 entries per batch. Please split into smaller chunks.', 'error');
  }

  const btn = document.getElementById('btn-td-upload-bulk');
  btn.disabled = true;
  btn.textContent = 'Uploading... 📤';
  statusEl.textContent = `Uploading ${entries.length} entries...`;

  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/training-data/upload-bulk', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries })
    });
    const data = await res.json();
    if (res.ok) {
      showToast(`${data.count || entries.length} entries uploaded successfully! ✅`);
      statusEl.textContent = `✅ ${data.count || entries.length} entries saved. Total chars: ${data.totalChars || 'N/A'}`;
      document.getElementById('td-bulk-json').value = '';
      loadTrainingDataList();
    } else {
      showToast(data.error || 'Bulk upload failed', 'error');
      statusEl.textContent = '❌ Upload failed: ' + (data.error || 'Unknown error');
    }
  } catch (e) {
    showToast('Bulk upload error: ' + e.message, 'error');
    statusEl.textContent = '❌ Error: ' + e.message;
  } finally {
    btn.disabled = false;
    btn.textContent = '📋 Bulk Upload';
  }
}

async function loadTrainingDataStats() {
  const container = document.getElementById('td-stats-content');
  container.innerHTML = '<div style="color: var(--text-muted);">Loading stats...</div>';

  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/training-data-stats', { headers });
    const data = await res.json();

    const subjectRows = Object.entries(data.subjects || {}).map(
      ([sub, count]) => `<tr><td style="padding: 6px 12px;">${sub}</td><td style="padding: 6px 12px; text-align: center;">${count}</td></tr>`
    ).join('');

    const tagRows = Object.entries(data.examTags || {}).map(
      ([tag, count]) => `<span style="background: #333; padding: 4px 10px; border-radius: 12px; font-size: 0.85em; display: inline-block; margin: 3px;">${tag.toUpperCase()}: ${count}</span>`
    ).join(' ');

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; margin-bottom: 20px;">
        <div style="background: #1a1d26; padding: 15px; border-radius: 10px; text-align: center; border: 1px solid #333;">
          <div style="font-size: 2em; font-weight: bold; color: var(--primary);">${data.totalEntries || 0}</div>
          <div style="font-size: 0.85em; color: var(--text-muted);">Total Entries</div>
        </div>
        <div style="background: #1a1d26; padding: 15px; border-radius: 10px; text-align: center; border: 1px solid #333;">
          <div style="font-size: 2em; font-weight: bold; color: var(--success);">${((data.totalChars || 0) / 1000).toFixed(1)}K</div>
          <div style="font-size: 0.85em; color: var(--text-muted);">Total Characters</div>
        </div>
        <div style="background: #1a1d26; padding: 15px; border-radius: 10px; text-align: center; border: 1px solid #333;">
          <div style="font-size: 2em; font-weight: bold; color: #61afef;">${Object.keys(data.subjects || {}).length}</div>
          <div style="font-size: 0.85em; color: var(--text-muted);">Subjects</div>
        </div>
      </div>
      ${subjectRows ? `
        <h4 style="color: white; margin-bottom: 10px;">📚 Subject Breakdown:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <thead><tr style="border-bottom: 1px solid #333;">
            <th style="padding: 8px 12px; text-align: left; color: var(--text-muted);">Subject</th>
            <th style="padding: 8px 12px; text-align: center; color: var(--text-muted);">Entries</th>
          </tr></thead>
          <tbody>${subjectRows}</tbody>
        </table>` : ''}
      ${tagRows ? `
        <h4 style="color: white; margin-bottom: 10px;">🏷️ Exam Tags:</h4>
        <div>${tagRows}</div>` : ''}
    `;
  } catch (e) {
    container.innerHTML = `<div style="color: var(--error);">Stats load failed: ${e.message}</div>`;
  }
}

async function loadTrainingDataList() {
  const list = document.getElementById('training-data-list');
  list.innerHTML = '<li style="color: var(--text-muted);">Loading...</li>';

  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/training-data', { headers });
    const data = await res.json();
    trainingDataList = Array.isArray(data) ? data : [];
    renderTrainingDataList(trainingDataList);
  } catch (e) {
    list.innerHTML = `<li style="color: var(--error);">Failed to load: ${e.message}</li>`;
  }
}

function renderTrainingDataList(items) {
  const list = document.getElementById('training-data-list');

  if (!items || items.length === 0) {
    list.innerHTML = '<li style="color: var(--text-muted);">No training data uploaded yet.</li>';
    return;
  }

  list.innerHTML = items.map(item => {
    const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
    const tags = (item.examTags || []).map(t => `<span style="background: #333; padding: 1px 6px; border-radius: 4px; font-size: 0.75em;">${t}</span>`).join(' ');
    return `
      <li>
        <div style="flex: 1; min-width: 0;">
          <strong>${item.subject}</strong> — ${item.topic}
          ${item.source ? `<small style="color: var(--text-muted);"> (${item.source})</small>` : ''}
          <br>
          <small style="color: var(--text-muted);">${item.charCount || 0} chars • ${dateStr}</small>
          ${tags ? `<br>${tags}` : ''}
        </div>
        <div style="display: flex; gap: 5px; align-items: center; flex-shrink: 0;">
          <button onclick="viewTrainingData('${item.id}')" style="width: auto; padding: 4px 10px; margin: 0; background: #333; font-size: 11px;">👁️</button>
          <button onclick="deleteTrainingData('${item.id}')" style="width: auto; padding: 4px 10px; margin: 0; background: var(--error); font-size: 11px;">🗑️</button>
        </div>
      </li>
    `;
  }).join('');
}

function filterTrainingData() {
  const query = document.getElementById('td-search').value.toLowerCase().trim();
  if (!query) {
    renderTrainingDataList(trainingDataList);
    return;
  }
  const filtered = trainingDataList.filter(item =>
    (item.subject || '').toLowerCase().includes(query) ||
    (item.topic || '').toLowerCase().includes(query) ||
    (item.source || '').toLowerCase().includes(query) ||
    (item.examTags || []).some(t => t.toLowerCase().includes(query))
  );
  renderTrainingDataList(filtered);
}

async function viewTrainingData(id) {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/training-data/${id}`, { headers });
    const data = await res.json();
    if (res.ok) {
      const content = data.content || 'No content';
      const preview = content.length > 1000 ? content.substring(0, 1000) + '\n\n... (truncated)' : content;
      alert(`📖 ${data.subject} — ${data.topic}\n${data.source ? `Source: ${data.source}\n` : ''}\n${preview}`);
    } else {
      showToast(data.error || 'Failed to load entry', 'error');
    }
  } catch (e) {
    showToast('Error loading: ' + e.message, 'error');
  }
}

async function deleteTrainingData(id) {
  if (!confirm('Kya aap ye training data delete karna chahte ho?')) return;

  try {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/training-data/${id}`, {
      method: 'DELETE',
      headers
    });
    const data = await res.json();
    if (res.ok) {
      showToast('Training data deleted ✅');
      loadTrainingDataList();
    } else {
      showToast(data.error || 'Delete failed', 'error');
    }
  } catch (e) {
    showToast('Delete error: ' + e.message, 'error');
  }
}

function getTemplateData() {
  return [
    {
      "subject": "भारतीय इतिहास",
      "topic": "मौर्य साम्राज्य",
      "content": "चंद्रगुप्त मौर्य (322-298 ई.पू.) ने मौर्य वंश की स्थापना की। चाणक्य (कौटिल्य) इनके गुरु और मंत्री थे। अर्थशास्त्र कौटिल्य द्वारा लिखित ग्रंथ है।",
      "source": "Lucent GK Chapter 5",
      "examTags": ["cgpsc", "vyapam", "upsc"]
    },
    {
      "subject": "छत्तीसगढ़ भूगोल",
      "topic": "छत्तीसगढ़ की नदियाँ",
      "content": "महानदी - CG की सबसे बड़ी नदी, लंबाई 858 km। शिवनाथ - महानदी की सहायक, लंबाई 290 km।",
      "source": "CG GK Guide",
      "examTags": ["cgpsc", "vyapam"]
    }
  ];
}

function copyTemplate() {
  const template = JSON.stringify(getTemplateData(), null, 2);
  navigator.clipboard.writeText(template).then(() => {
    showToast('Template copied to clipboard! 📋');
  }).catch(() => {
    showToast('Copy failed. Manually copy from template.', 'error');
  });
}

function downloadTemplate() {
  const template = JSON.stringify(getTemplateData(), null, 2);
  const blob = new Blob([template], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'training-data-template.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Template downloaded! 📥');
}

