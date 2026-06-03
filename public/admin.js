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
