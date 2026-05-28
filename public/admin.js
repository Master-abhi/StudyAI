// ═══════════════════════════════════════════
//   Admin Panel — Firebase Auth Version
// ═══════════════════════════════════════════

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
