/* ═══════════════════════════════════════════
   Study World — CG Vyapam Exam Prep
   ═══════════════════════════════════════════ */

// ── Storage Keys ──
const KEYS = {
  selectedExam: 'examprep_selectedExam',
  progress: 'examprep_progress_',
  streak: 'examprep_streak',
  testsGiven: 'examprep_testsGiven',
  testResults: 'examprep_testResults',
  reminderShown: 'examprep_reminderShown',
  chatHistory: 'examprep_chatHistory',
  customSyllabi: 'examprep_customSyllabi',
  language: 'examprep_language',
  points: 'examprep_points',
  mcqsSolved: 'examprep_mcqsSolved',
  subjectScores: 'examprep_subjectScores_'
};

// ── State ──
let currentExam = null;
let currentScreen = 'exams';
let appLanguage = 'hi';          // Global: 'hi' (default) | 'en'
let chatLanguage = 'hindi';      // Derived from appLanguage
let chatHistory = [];
let testState = {
  mode: 'quiz',
  questions: [],
  currentIndex: 0,
  answers: [],
  timerInterval: null,
  timeLeft: 0,
  selectedSubject: 'all'
};

// ═══════════════════════════════════════════
//               INITIALIZATION
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  checkUserAuth();
  loadState();
  initNavigation();
  initExamSelector();
  initChat();
  initTestScreen();
  initNewsScreen();
  initLanguageSetting();
  checkDailyReminder();
  checkApiStatus();
});

function loadState() {
  // Restore saved language (default Hindi)
  const savedLang = localStorage.getItem(KEYS.language) || 'hi';
  setGlobalLanguage(savedLang, false); // apply without re-rendering

  const savedExam = localStorage.getItem(KEYS.selectedExam);
  if (savedExam) {
    const examData = getExamData(savedExam);
    if (examData) {
      currentExam = savedExam;
      navigateTo('dashboard');
    }
  }

  const savedChat = localStorage.getItem(KEYS.chatHistory);
  if (savedChat) {
    try { chatHistory = JSON.parse(savedChat); } catch (e) { chatHistory = []; }
  }
}

function getExamData(examId) {
  if (SYLLABUS_DATA[examId]) return SYLLABUS_DATA[examId];
  if (CGPSC_EXAM_DATA && CGPSC_EXAM_DATA[examId]) return CGPSC_EXAM_DATA[examId];

  const customSyllabi = getCustomSyllabi();
  const custom = customSyllabi.find(s => s.id === examId);
  if (custom) return custom;

  return null;
}

// Decode JWT payload client-side to check role (legacy — now replaced by Firebase custom claims)
// isAdmin() reads from _isAdmin cache set by onAuthStateChanged below
let _isAdmin = false;

function isAdmin() {
  return _isAdmin;
}

/**
 * Returns Authorization header with current Firebase ID token.
 * Used for routes that require authentication (admin endpoints).
 */
async function getAuthHeaders() {
  const user = firebase.auth().currentUser;
  if (!user) return {};
  try {
    const token = await user.getIdToken();
    return { 'Authorization': `Bearer ${token}` };
  } catch (e) {
    return {};
  }
}

function getCustomSyllabi() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.customSyllabi) || '[]');
  } catch (e) { return []; }
}

function saveCustomSyllabi(syllabi) {
  localStorage.setItem(KEYS.customSyllabi, JSON.stringify(syllabi));
}

// ═══════════════════════════════════════════
//             NAVIGATION
// ═══════════════════════════════════════════

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.dataset.screen;
      if (!currentExam && screen !== 'exams') {
        showToast('Please select an exam first! 📋', 'error');
        return;
      }
      navigateTo(screen);
    });
  });

  document.getElementById('btn-settings').addEventListener('click', () => {
    openModal('modal-settings');
    updateSettingsModal();
  });

  document.getElementById('btn-profile').addEventListener('click', () => {
    navigateTo('profile');
  });

  document.getElementById('dashboard-exam-badge').addEventListener('click', changeExam);
}

function navigateTo(screenName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`screen-${screenName}`);
  if (target) {
    target.classList.add('active');
    currentScreen = screenName;
  }

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenName);
  });

  if (screenName === 'dashboard') updateDashboard();
  if (screenName === 'syllabus') renderSyllabus();
  if (screenName === 'ai-chat') restoreChatHistory();
  if (screenName === 'tests') updateTestSubjects();
  if (screenName === 'news') loadNews();
  if (screenName === 'profile') updateProfile();
}

// ═══════════════════════════════════════════
//            EXAM SELECTOR
// ═══════════════════════════════════════════

function initExamSelector() {
  renderExamGrid();
}

function renderExamGrid() {
  const grid = document.getElementById('exam-grid');
  let html = '';

  // Category display names and order
  const categories = [
    { key: 'cgpsc', label: '🎯 CGPSC & State Exams', icon: '🎯' },
    { key: 'administrative', label: '🏛️ Administrative / Revenue', icon: '🏛️' },
    { key: 'police', label: '👮 Police & Security', icon: '👮' },
    { key: 'forest', label: '🌳 Forest Department', icon: '🌳' },
    { key: 'teaching', label: '📖 Teaching / Education', icon: '📖' },
    { key: 'technical', label: '⚙️ Technical / Engineering', icon: '⚙️' },
    { key: 'health', label: '🏥 Health & Nursing', icon: '🏥' }
  ];

  categories.forEach(cat => {
    // Combine both SYLLABUS_DATA and CGPSC_EXAM_DATA
    const allExams = { ...SYLLABUS_DATA, ...(CGPSC_EXAM_DATA || {}) };
    const examsInCategory = Object.entries(allExams).filter(
      ([, exam]) => exam.category === cat.key
    );
    if (examsInCategory.length === 0) return;

    html += `<div class="exam-category-label">${cat.label}</div>`;

    examsInCategory.forEach(([id, exam]) => {
      html += `
        <div class="exam-card" onclick="selectExam('${id}')">
          <div class="exam-card-icon">${exam.icon}</div>
          <div class="exam-card-info">
            <h3>${exam.name}</h3>
            <p>${exam.description}</p>
            <span class="exam-eligibility">✅ ${exam.eligibility || ''}</span>
          </div>
          <div class="exam-card-arrow">→</div>
        </div>`;
    });
  });

  // Add custom syllabi from storage
  const customSyllabi = getCustomSyllabi();
  if (customSyllabi.length > 0) {
    html += `<div class="exam-category-label">📄 Custom Syllabi</div>`;
    customSyllabi.forEach(s => {
      html += `
        <div class="exam-card" onclick="selectExam('${s.id}')">
          <div class="exam-card-icon">${s.icon || '📄'}</div>
          <div class="exam-card-info">
            <h3>${s.name}</h3>
            <p>${s.description || 'Custom uploaded syllabus'}</p>
          </div>
          <div class="exam-card-arrow">→</div>
        </div>`;
    });
  }

  // Upload custom syllabus card — admins only
  if (isAdmin()) {
    html += `
    <div class="exam-category-label">➕ Custom</div>
    <div class="exam-card upload-card" onclick="openModal('modal-upload')">
      <div class="exam-card-icon">📤</div>
      <div class="exam-card-info">
        <h3>Upload Custom Syllabus</h3>
        <p>Upload any PDF/TXT syllabus — AI will parse & track it for you</p>
      </div>
      <div class="exam-card-arrow">→</div>
    </div>`;
  }

  grid.innerHTML = html;
}

function selectExam(examId) {
  currentExam = examId;
  localStorage.setItem(KEYS.selectedExam, examId);
  updateStreak();
  navigateTo('dashboard');
  showToast(`Selected: ${getExamData(examId).name} ✅`);
}

function changeExam() {
  currentExam = null;
  localStorage.removeItem(KEYS.selectedExam);
  renderExamGrid();
  navigateTo('exams');
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-exams').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
}

// ═══════════════════════════════════════════
//              DASHBOARD
// ═══════════════════════════════════════════

function updateDashboard() {
  if (!currentExam) return;
  const exam = getExamData(currentExam);
  if (!exam) return;

  document.getElementById('dashboard-exam-icon').textContent = exam.icon || '📄';
  document.getElementById('dashboard-exam-name').textContent = exam.name;

  const titleEl = document.getElementById('greeting-title');
  if (titleEl && localStorage.getItem('userName')) {
    titleEl.innerHTML = `📊 Hi ${localStorage.getItem('userName')} !`;
  }

  const progress = getProgress();
  const allTopics = getAllTopics();
  const completedCount = allTopics.filter(t => progress[t.id]).length;
  const totalTopics = allTopics.length;
  const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  document.getElementById('stat-progress').textContent = percent + '%';
  document.getElementById('stat-topics').textContent = completedCount;

  const circumference = 2 * Math.PI * 30;
  const offset = circumference - (percent / 100) * circumference;
  const ring = document.querySelector('.progress-ring-fill');
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = offset;

  const streak = getStreak();
  document.getElementById('stat-streak').textContent = streak.count;

  const testsGiven = parseInt(localStorage.getItem(KEYS.testsGiven) || '0');
  document.getElementById('stat-tests').textContent = testsGiven;

  renderSubjectProgress(exam, progress);
}

function renderSubjectProgress(exam, progress) {
  const container = document.getElementById('subject-progress-list');
  let html = '';

  exam.subjects.forEach(subject => {
    const completed = subject.topics.filter(t => progress[t.id]).length;
    const total = subject.topics.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    html += `
      <div class="subject-progress-item">
        <div class="subject-progress-header">
          <span class="subject-name">${subject.name}</span>
          <span class="subject-percent">${pct}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: ${pct}%"></div>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

function updateProfile() {
  const userName = localStorage.getItem('userName') || 'Guest User';
  document.getElementById('profile-name').textContent = userName;
  document.getElementById('profile-avatar').textContent = userName !== 'Guest User' ? '👨‍🎓' : '👤';

  const exam = currentExam ? getExamData(currentExam) : null;
  document.getElementById('profile-exam').textContent = exam ? exam.name : 'Not Selected';

  const streak = getStreak();
  document.getElementById('profile-streak').textContent = streak.count;

  const testResults = JSON.parse(localStorage.getItem(KEYS.testResults) || '[]');
  const mockTests = testResults.filter(r => r.mode === 'mock').length;
  document.getElementById('profile-mock-tests').textContent = mockTests;

  const mcqsSolved = parseInt(localStorage.getItem(KEYS.mcqsSolved) || '0');
  document.getElementById('profile-mcqs').textContent = mcqsSolved;

  const points = parseInt(localStorage.getItem(KEYS.points) || '0');
  document.getElementById('profile-points').textContent = points;

  const level = calculateLevel(points, mcqsSolved, testResults);
  document.getElementById('profile-level').textContent = level;

  if (exam) {
    renderProfileSubjects(exam);
    analyzeSubjectPerformance(exam);
  }

  loadMongoAnalytics();
}

async function loadMongoAnalytics() {
  const section = document.getElementById('profile-analytics-section');
  const headers = await getAuthHeaders();
  
  section.style.display = 'block';

  if (!headers.Authorization) {
    document.getElementById('profile-analytics-accuracy').textContent = '--';
    document.getElementById('profile-analytics-time').textContent = '--';
    document.getElementById('profile-analytics-streak').textContent = '--';
    document.getElementById('profile-subject-table').innerHTML = '<div class="profile-loading">🔐 Please login to view your performance analytics</div>';
    document.getElementById('profile-ai-plan-content').innerHTML = 'Login to get AI study plan';
    document.getElementById('profile-weekly-bars').innerHTML = '<div class="profile-loading">Login to see weekly activity</div>';
    return;
  }

  try {
    const [overviewRes, subjectsRes] = await Promise.all([
      fetch('/api/analytics/overview', { headers }),
      fetch('/api/analytics/subjects', { headers })
    ]);

    if (!overviewRes.ok || !subjectsRes.ok) {
      throw new Error('API Error');
    }

    const overview = await overviewRes.json();
    const subjectsData = await subjectsRes.json();

    document.getElementById('profile-analytics-accuracy').textContent = (overview.overallAccuracy || 0) + '%';
    document.getElementById('profile-analytics-time').textContent = (overview.totalStudyTime || 0) + 'm';
    document.getElementById('profile-analytics-streak').textContent = overview.currentStreak || 0;

    renderProfileWeeklyActivity(overview.weeklyActivity || []);
    renderProfileSubjectTable(subjectsData || []);
    loadProfileAIPlan();

  } catch (err) {
    console.error('[Profile Analytics Error]:', err);
    loadMongoAnalyticsFallback();
  }
}

function loadMongoAnalyticsFallback() {
  const mcqs = parseInt(localStorage.getItem(KEYS.mcqsSolved) || '0');
  const points = parseInt(localStorage.getItem(KEYS.points) || '0');
  const testResults = JSON.parse(localStorage.getItem(KEYS.testResults) || '[]');
  
  const correct = testResults.reduce((sum, t) => sum + t.score, 0);
  const total = testResults.reduce((sum, t) => sum + t.total, 0);
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  const streak = getStreak();
  
  document.getElementById('profile-analytics-accuracy').textContent = accuracy + '%';
  document.getElementById('profile-analytics-time').textContent = Math.round(points/10) + 'm';
  document.getElementById('profile-analytics-streak').textContent = streak.count;
  
  const weeklyContainer = document.getElementById('profile-weekly-bars');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const dayMap = [1, 2, 3, 4, 5, 6, 0];
  
  let html = '';
  for (let i = 0; i < 7; i++) {
    const count = (dayMap[i] === today) ? Math.floor(testResults.length / 7) + 1 : Math.floor(testResults.length / 7);
    const height = Math.max(count * 10, 4);
    html += `<div class="profile-weekly-bar"><div class="profile-weekly-bar-fill" style="height: ${height}px"></div><div class="profile-weekly-bar-label">${days[i]}</div></div>`;
  }
  weeklyContainer.innerHTML = html;
  
  const subjectContainer = document.getElementById('profile-subject-table');
  const key = KEYS.subjectScores + currentExam;
  const subjectScores = JSON.parse(localStorage.getItem(key) || '{}');
  
  if (Object.keys(subjectScores).length === 0) {
    subjectContainer.innerHTML = '<div class="profile-loading">Take tests to see subject performance!</div>';
    return;
  }
  
  let tableHtml = '';
  for (const [name, data] of Object.entries(subjectScores)) {
    const avg = Math.round(data.totalScore / data.count);
    let color = '#ffc107';
    if (avg >= 75) color = '#00e676';
    else if (avg < 50) color = '#ff9800';
    
    tableHtml += `<div class="profile-subject-row">
      <span class="profile-subject-row-name">${name}</span>
      <div class="profile-subject-row-bar"><div class="profile-subject-row-bar-fill" style="width: ${avg}%; background: ${color}"></div></div>
      <span class="profile-subject-row-accuracy" style="color: ${color}">${avg}%</span>
    </div>`;
  }
  subjectContainer.innerHTML = tableHtml || '<div class="profile-loading">Take more tests to see data!</div>';
  
  document.getElementById('profile-ai-plan-content').innerHTML = '📝 Take more subject-wise tests to get AI recommendations!\n\n💡 Tip: Select specific subjects in tests to track your performance better.';
}

function renderProfileWeeklyActivity(weeklyData) {
  const container = document.getElementById('profile-weekly-bars');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const maxCount = Math.max(...weeklyData.map(w => w.count), 1);
  
  let html = '';
  for (let i = 0; i < 7; i++) {
    const dayData = weeklyData[i];
    const count = dayData?.count || 0;
    const height = Math.max((count / maxCount) * 50, 4);
    
    html += `
      <div class="profile-weekly-bar">
        <div class="profile-weekly-bar-fill" style="height: ${height}px"></div>
        <div class="profile-weekly-bar-label">${days[i]}</div>
      </div>`;
  }
  container.innerHTML = html;
}

function renderProfileSubjectTable(subjects) {
  const container = document.getElementById('profile-subject-table');
  
  if (!subjects || subjects.length === 0) {
    container.innerHTML = '<div class="profile-loading">Take tests to see subject performance!</div>';
    return;
  }

  let html = '';
  subjects.slice(0, 6).forEach(subj => {
    let color = '#ffc107';
    if (subj.accuracy >= 75) color = '#00e676';
    else if (subj.accuracy < 50) color = '#ff9800';
    
    let statusClass = 'average';
    let statusText = 'Average';
    if (subj.status === 'strong') { statusClass = 'strong'; statusText = 'Strong'; }
    if (subj.status === 'weak') { statusClass = 'weak'; statusText = 'Weak'; }
    
    html += `
      <div class="profile-subject-row">
        <span class="profile-subject-row-name">${subj.name}</span>
        <div class="profile-subject-row-bar">
          <div class="profile-subject-row-bar-fill" style="width: ${subj.accuracy}%; background: ${color}"></div>
        </div>
        <span class="profile-subject-row-accuracy" style="color: ${color}">${subj.accuracy}%</span>
        <span class="profile-subject-row-status" style="background: ${statusClass === 'strong' ? 'rgba(0,230,118,0.15)' : statusClass === 'weak' ? 'rgba(255,152,0,0.15)' : 'rgba(255,193,7,0.15)'}; color: ${color}">${statusText}</span>
      </div>`;
  });
  container.innerHTML = html;
}

async function loadProfileAIPlan() {
  const container = document.getElementById('profile-ai-plan-content');
  const headers = await getAuthHeaders();
  
  if (!headers.Authorization) {
    container.innerHTML = 'Login to get AI study plan';
    return;
  }

  try {
    const res = await fetch('/api/analytics/improvement-plan', { headers });
    const data = await res.json();
    container.innerHTML = data.recommendation || 'Take more tests to get personalized recommendations!';
  } catch (err) {
    container.innerHTML = 'Unable to load plan';
  }
}

function calculateLevel(points, mcqs, testResults) {
  if (points >= 5000 || mcqs >= 500) return 'Expert';
  if (points >= 2000 || mcqs >= 200) return 'Advanced';
  if (points >= 500 || mcqs >= 50) return 'Intermediate';
  if (points >= 100 || mcqs >= 10) return 'Beginner';
  return 'Newcomer';
}

function renderProfileSubjects(exam) {
  const container = document.getElementById('profile-subject-list');
  const progress = getProgress();
  let html = '';

  exam.subjects.forEach(subject => {
    const completed = subject.topics.filter(t => progress[t.id]).length;
    const total = subject.topics.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    html += `
      <div class="profile-subject-item">
        <span class="profile-subject-name">${subject.name}</span>
        <div class="profile-subject-progress">
          <div class="profile-subject-bar">
            <div class="profile-subject-bar-fill" style="width: ${pct}%"></div>
          </div>
          <span class="profile-subject-percent">${pct}%</span>
        </div>
      </div>`;
  });

  container.innerHTML = html || '<div class="analysis-empty">No subjects available</div>';
}

function analyzeSubjectPerformance(exam) {
  const key = KEYS.subjectScores + currentExam;
  const subjectScores = JSON.parse(localStorage.getItem(key) || '{}');
  const progress = getProgress();
  
  const subjectData = Object.entries(subjectScores).map(([name, data]) => {
    const recent = data.recentScores || [];
    let trend = 'stable';
    if (recent.length >= 2) {
      const recentAvg = recent.slice(-2).reduce((a, b) => a + b, 0) / 2;
      const olderAvg = recent.slice(0, -1).reduce((a, b) => a + b, 0) / Math.max(1, recent.length - 1);
      if (recentAvg - olderAvg > 10) trend = 'improving';
      else if (olderAvg - recentAvg > 10) trend = 'declining';
    }
    
    return {
      name,
      avgScore: Math.round(data.totalScore / data.count),
      tests: data.count,
      lastScore: data.lastScore || 0,
      bestScore: data.bestScore || 0,
      worstScore: data.worstScore || 0,
      trend
    };
  }).filter(s => s.tests > 0);

  if (subjectData.length === 0) {
    document.getElementById('profile-strong-subjects').innerHTML = 
      '<div class="analysis-empty">📊 Take more subject-wise tests to get detailed analysis!</div>';
    document.getElementById('profile-weak-subjects').innerHTML = 
      '<div class="analysis-empty">📝 Start with Quick Quiz or Mock Test to track your performance.</div>';
    return;
  }

  subjectData.sort((a, b) => b.avgScore - a.avgScore);

  const strongSubjects = subjectData.filter(s => s.avgScore >= 55);
  const weakSubjects = subjectData.filter(s => s.avgScore < 55);

  const strongContainer = document.getElementById('profile-strong-subjects');
  const weakContainer = document.getElementById('profile-weak-subjects');

  if (strongSubjects.length > 0) {
    strongContainer.innerHTML = strongSubjects.slice(0, 4).map(s => {
      const trendIcon = s.trend === 'improving' ? '📈' : s.trend === 'declining' ? '📉' : '➡️';
      return `
        <div class="analysis-item">
          <span class="analysis-subject-name">${s.name}</span>
          <div class="analysis-subject-stats">
            <span class="analysis-score good">${s.avgScore}%</span>
            <span class="analysis-trend">${trendIcon}</span>
          </div>
          <div class="analysis-meta">${s.tests} tests • Best: ${s.bestScore}%</div>
        </div>`;
    }).join('');
  } else {
    strongContainer.innerHTML = '<div class="analysis-empty">Keep practicing to build strong subjects!</div>';
  }

  if (weakSubjects.length > 0) {
    weakContainer.innerHTML = weakSubjects.slice(0, 4).map(s => {
      const topicSuggestion = getWeakTopicSuggestion(exam, s.name, progress);
      const trendIcon = s.trend === 'improving' ? '📈' : s.trend === 'declining' ? '📉' : '➡️';
      return `
        <div class="analysis-item">
          <span class="analysis-subject-name">${s.name}</span>
          <div class="analysis-subject-stats">
            <span class="analysis-score poor">${s.avgScore}%</span>
            <span class="analysis-trend">${trendIcon}</span>
          </div>
          <div class="analysis-meta">${s.tests} tests • Focus: ${topicSuggestion}</div>
        </div>`;
    }).join('');
  } else {
    weakContainer.innerHTML = '<div class="analysis-empty">🎉 Excellent! No weak areas identified yet!</div>';
  }
  
  renderDetailedPerformance(exam);
  generateRecommendations(exam);
}

function getWeakTopicSuggestion(exam, subjectName, progress) {
  const subject = exam.subjects.find(s => s.name === subjectName || s.nameHi === subjectName);
  if (!subject || !subject.topics) return 'Complete syllabus topics';
  
  const incompleteTopics = subject.topics.filter(t => !progress[t.id]);
  if (incompleteTopics.length === 0) return 'Revise all topics';
  
  const randomTopics = incompleteTopics.slice(0, 2).map(t => t.nameHi || t.name);
  return randomTopics.join(', ');
}

function renderDetailedPerformance(exam) {
  const container = document.getElementById('subject-performance-list');
  const key = KEYS.subjectScores + currentExam;
  const subjectScores = JSON.parse(localStorage.getItem(key) || '{}');
  const progress = getProgress();
  
  if (Object.keys(subjectScores).length === 0) {
    container.innerHTML = '<div class="analysis-empty">Take tests to see detailed performance!</div>';
    return;
  }
  
  let html = '';
  exam.subjects.forEach(subject => {
    const data = subjectScores[subject.name];
    if (!data) return;
    
    const avgScore = Math.round(data.totalScore / data.count);
    const trend = data.recentScores?.length >= 2 
      ? (data.recentScores[data.recentScores.length - 1] > data.recentScores[data.recentScores.length - 2] ? '↑' 
        : data.recentScores[data.recentScores.length - 1] < data.recentScores[data.recentScores.length - 2] ? '↓' : '→')
      : '→';
    
    let colorClass = 'neutral';
    if (avgScore >= 70) colorClass = 'excellent';
    else if (avgScore >= 55) colorClass = 'good';
    else if (avgScore >= 40) colorClass = 'average';
    else colorClass = 'poor';
    
    const completedTopics = subject.topics.filter(t => progress[t.id]).length;
    const totalTopics = subject.topics.length;
    const syllabusProgress = Math.round((completedTopics / totalTopics) * 100);
    
    html += `
      <div class="detail-subject-card">
        <div class="detail-subject-header">
          <span class="detail-subject-name">${subject.name}</span>
          <span class="detail-subject-trend ${colorClass}">${trend} ${avgScore}%</span>
        </div>
        <div class="detail-subject-stats-row">
          <span>Tests: ${data.count}</span>
          <span>Best: ${data.bestScore}%</span>
          <span>Last: ${data.lastScore}%</span>
        </div>
        <div class="detail-progress-bar">
          <div class="detail-progress-label">Syllabus: ${completedTopics}/${totalTopics} topics</div>
          <div class="detail-progress-track">
            <div class="detail-progress-fill ${colorClass}" style="width: ${syllabusProgress}%"></div>
          </div>
        </div>
      </div>`;
  });
  
  container.innerHTML = html || '<div class="analysis-empty">No performance data available yet.</div>';
}

function generateRecommendations(exam) {
  const container = document.getElementById('recommendations-box');
  const key = KEYS.subjectScores + currentExam;
  const subjectScores = JSON.parse(localStorage.getItem(key) || '{}');
  const progress = getProgress();
  
  const recommendations = [];
  
  const allTopics = getAllTopics();
  const completedTopics = allTopics.filter(t => progress[t.id]).length;
  const totalTopics = allTopics.length;
  const syllabusPercent = Math.round((completedTopics / totalTopics) * 100);
  
  if (syllabusPercent < 30) {
    recommendations.push({
      icon: '📚',
      title: 'Complete Syllabus First',
      desc: `Only ${completedTopics} of ${totalTopics} topics completed. Focus on covering the entire syllabus before deep diving.`
    });
  }
  
  const weakSubjects = Object.entries(subjectScores)
    .filter(([name, data]) => data.totalScore / data.count < 55)
    .sort((a, b) => (a[1].totalScore/a[1].count) - (b[1].totalScore/b[1].count));
  
  if (weakSubjects.length > 0) {
    const weakest = weakSubjects[0];
    const subject = exam.subjects.find(s => s.name === weakest[0] || s.nameHi === weakest[0]);
    const incompleteTopics = subject?.topics?.filter(t => !progress[t.id]) || [];
    const focusTopic = incompleteTopics[0]?.nameHi || incompleteTopics[0]?.name || 'key topics';
    
    recommendations.push({
      icon: '🎯',
      title: `Focus on ${weakest[0]}`,
      desc: `Your weakest subject (${Math.round(weakest[1].totalScore/weakest[1].count)}%). Start with "${focusTopic}" to build fundamentals.`
    });
  }
  
  const strongSubjects = Object.entries(subjectScores)
    .filter(([name, data]) => data.totalScore / data.count >= 60)
    .sort((a, b) => (b[1].totalScore/b[1].count) - (a[1].totalScore/a[1].count));
  
  if (strongSubjects.length > 0) {
    recommendations.push({
      icon: '⭐',
      title: `Maintain ${strongSubjects[0][0]}`,
      desc: `Your strongest subject (${Math.round(strongSubjects[0][1].totalScore/strongSubjects[0][1].count)}%). Keep practicing to maintain momentum!`
    });
  }
  
  const testResults = JSON.parse(localStorage.getItem(KEYS.testResults) || '[]');
  const recentTests = testResults.filter(r => r.exam === currentExam).slice(-5);
  if (recentTests.length >= 3) {
    const avgScore = recentTests.reduce((sum, t) => sum + t.percent, 0) / recentTests.length;
    if (recentTests.every(t => t.percent >= avgScore - 5)) {
      recommendations.push({
        icon: '📈',
        title: 'Consistent Performance',
        desc: 'Your recent scores are consistent. Keep this up!'
      });
    }
  }
  
  if (recommendations.length === 0) {
    recommendations.push({
      icon: '🚀',
      title: 'Start Your Journey',
      desc: 'Take your first test to get personalized recommendations!'
    });
  }
  
  container.innerHTML = recommendations.map(r => `
    <div class="recommendation-item">
      <span class="rec-icon">${r.icon}</span>
      <div class="rec-content">
        <div class="rec-title">${r.title}</div>
        <div class="rec-desc">${r.desc}</div>
      </div>
    </div>
  `).join('');
}

function trackTestPerformance(subjectName, score, total) {
  if (!currentExam) return;
  
  const key = KEYS.subjectScores + currentExam;
  const subjectScores = JSON.parse(localStorage.getItem(key) || '{}');
  
  const percent = Math.round((score / total) * 100);
  
  if (!subjectScores[subjectName]) {
    subjectScores[subjectName] = { 
      totalScore: 0, 
      count: 0, 
      lastScore: 0,
      bestScore: 0,
      worstScore: 100,
      recentScores: []
    };
  }
  
  subjectScores[subjectName].totalScore += percent;
  subjectScores[subjectName].count += 1;
  subjectScores[subjectName].lastScore = percent;
  subjectScores[subjectName].bestScore = Math.max(subjectScores[subjectName].bestScore, percent);
  subjectScores[subjectName].worstScore = Math.min(subjectScores[subjectName].worstScore, percent);
  subjectScores[subjectName].recentScores.push(percent);
  if (subjectScores[subjectName].recentScores.length > 5) {
    subjectScores[subjectName].recentScores.shift();
  }
  
  localStorage.setItem(key, JSON.stringify(subjectScores));
  console.log('[Profile] Tracked:', subjectName, '- Score:', percent + '%', '- Total tests:', subjectScores[subjectName].count);
}

function getAllTopics() {
  if (!currentExam) return [];
  const exam = getExamData(currentExam);
  if (!exam) return [];
  return exam.subjects.flatMap(s => s.topics);
}

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.progress + currentExam) || '{}');
  } catch (e) { return {}; }
}

function saveProgress(progress) {
  localStorage.setItem(KEYS.progress + currentExam, JSON.stringify(progress));
}

// ═══════════════════════════════════════════
//              STREAK TRACKING
// ═══════════════════════════════════════════

function getStreak() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.streak) || '{"lastDate":"","count":0}');
  } catch (e) { return { lastDate: '', count: 0 }; }
}

function updateStreak() {
  const today = new Date().toISOString().split('T')[0];
  const streak = getStreak();

  if (streak.lastDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (streak.lastDate === yesterdayStr) {
    streak.count += 1;
  } else if (streak.lastDate !== today) {
    streak.count = 1;
  }

  streak.lastDate = today;
  localStorage.setItem(KEYS.streak, JSON.stringify(streak));
}

// ═══════════════════════════════════════════
//              SYLLABUS SCREEN
// ═══════════════════════════════════════════

window.SYLLABUS_TRANSLATIONS = window.SYLLABUS_TRANSLATIONS || {};
let syllabusLanguage = 'hi'; // default Hindi, controlled by setGlobalLanguage

// ── Global Language System ──
// Sets app-wide language and syncs all section-specific vars.
// pass rerender=false during initial load to avoid rendering before DOM is ready.
function setGlobalLanguage(lang, rerender = true) {
  appLanguage = lang;
  syllabusLanguage = lang;          // 'hi' | 'en'
  newsLanguage = lang;              // 'hi' | 'en'
  chatLanguage = lang === 'hi' ? 'hindi' : 'english';
  localStorage.setItem(KEYS.language, lang);

  // Sync search placeholder
  const searchInput = document.getElementById('syllabus-search-input');
  if (searchInput) searchInput.placeholder = lang === 'hi' ? 'विषय खोजें...' : 'Search topics...';

  // Sync test language select default
  const testLangSelect = document.getElementById('test-lang-select');
  if (testLangSelect) testLangSelect.value = lang === 'hi' ? 'hindi' : 'english';

  if (!rerender) return;
  if (currentScreen === 'syllabus') renderSyllabus();
  if (currentScreen === 'news') renderNewsCards();
}

function initLanguageSetting() {
  const toggle = document.getElementById('settings-lang-toggle');
  if (!toggle) return;
  toggle.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toggle.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setGlobalLanguage(btn.dataset.lang);
      showToast(btn.dataset.lang === 'hi' ? 'भाषा: हिंदी की गई ✅' : 'Language: English set ✅');
    });
  });
}

// Returns the Hindi or English version of a text string.
// syllabus-data.js now has nameHi on every subject/topic.
function getTranslatedText(text, obj = null) {
  if (syllabusLanguage === 'en') return text;

  // If we were given the raw data object use its nameHi
  if (obj && obj.nameHi) return obj.nameHi;

  // Static UI strings
  const common = {
    "Overall Progress": "कुल प्रगति",
    "topics": "विषय",
    "Mark All": "सभी चिह्नित करें",
    "Unmark All": "सभी अचयनित करें",
    "Search topics...": "विषय खोजें..."
  };

  return SYLLABUS_TRANSLATIONS[text] || common[text] || text;
}

function renderSyllabus() {
  if (!currentExam) return;
  const exam = getExamData(currentExam);
  if (!exam) return;
  const progress = getProgress();

  // Render exam pattern card
  renderExamPattern(exam);

  const allTopics = getAllTopics();
  const completedCount = allTopics.filter(t => progress[t.id]).length;
  const totalTopics = allTopics.length;
  const overallPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  document.getElementById('syllabus-overall-detail').textContent = `${completedCount} / ${totalTopics} ${getTranslatedText('topics')}`;
  document.getElementById('syllabus-overall-percent').textContent = overallPercent + '%';

  const container = document.getElementById('syllabus-accordion-list');
  let html = '';

  exam.subjects.forEach((subject, sIdx) => {
    const completed = subject.topics.filter(t => progress[t.id]).length;
    const total = subject.topics.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const subjectDisplayName = getTranslatedText(subject.name, subject);

    html += `
      <div class="subject-accordion" id="accordion-${sIdx}">
        <button class="subject-accordion-header" onclick="toggleAccordion(${sIdx})">
          <div class="accordion-left">
            <span class="accordion-subject-name">${subjectDisplayName}</span>
            <span class="accordion-badge">${completed}/${total}</span>
          </div>
          <span class="accordion-chevron">▼</span>
        </button>
        <div class="accordion-progress-bar">
          <div class="accordion-progress-fill" id="acc-bar-${sIdx}" style="width:${pct}%"></div>
        </div>
        <div class="subject-accordion-body">
          <div class="subject-actions">
            <button class="subject-action-btn" onclick="markAllSubject(${sIdx}, true)">✅ ${getTranslatedText('Mark All')}</button>
            <button class="subject-action-btn" onclick="markAllSubject(${sIdx}, false)">↩️ ${getTranslatedText('Unmark All')}</button>
          </div>`;

    subject.topics.forEach(topic => {
      const checked = progress[topic.id] ? 'checked' : '';
      const completedClass = progress[topic.id] ? 'completed' : '';
      const topicDisplayName = getTranslatedText(topic.name, topic);
      // Pass the nameHi to AI when in Hindi mode for better context
      const studyName = (syllabusLanguage === 'hi' && topic.nameHi) ? topic.nameHi : topic.name;
      const studyNameEsc = studyName.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      // Study button (PDF Notes & YouTube AI) — visible to admins only
      const studyBtn = isAdmin()
        ? `<button class="settings-btn" style="padding: 4px 10px; font-size: 0.75rem; background: var(--bg-card); border: 1px solid var(--primary);" onclick="openStudyTopic('${studyNameEsc}')">📖 Study</button>`
        : '';
      html += `
          <div class="topic-item ${completedClass}" id="topic-${topic.id}">
            <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                <label class="topic-checkbox">
                  <input type="checkbox" ${checked} onchange="toggleTopic('${topic.id}', this.checked)">
                  <span class="checkmark"></span>
                </label>
                <span class="topic-name">${topicDisplayName}</span>
            </div>
            ${studyBtn}
          </div>`;
    });

    html += `
        </div>
      </div>`;
  });

  container.innerHTML = html;
  initSyllabusSearch();
}

function toggleAccordion(idx) {
  const accordion = document.getElementById(`accordion-${idx}`);
  accordion.classList.toggle('open');
}

function toggleTopic(topicId, checked) {
  const progress = getProgress();
  if (checked) {
    progress[topicId] = true;
  } else {
    delete progress[topicId];
  }
  saveProgress(progress);
  updateStreak();

  const item = document.getElementById(`topic-${topicId}`);
  if (item) item.classList.toggle('completed', checked);

  updateSyllabusOverall();
}

function markAllSubject(subjectIdx, markComplete) {
  const exam = getExamData(currentExam);
  if (!exam) return;
  const subject = exam.subjects[subjectIdx];
  const progress = getProgress();

  subject.topics.forEach(topic => {
    if (markComplete) {
      progress[topic.id] = true;
    } else {
      delete progress[topic.id];
    }
  });

  saveProgress(progress);
  renderSyllabus();
  showToast(markComplete ? 'All topics marked complete ✅' : 'All topics unmarked ↩️');
}

function updateSyllabusOverall() {
  const progress = getProgress();
  const exam = getExamData(currentExam);
  const allTopics = getAllTopics();
  const completedCount = allTopics.filter(t => progress[t.id]).length;
  const totalTopics = allTopics.length;
  const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  document.getElementById('syllabus-overall-detail').textContent = `${completedCount} / ${totalTopics} ${getTranslatedText('topics')}`;
  document.getElementById('syllabus-overall-percent').textContent = percent + '%';

  // Update per-subject accordion badges AND progress bars
  if (exam) {
    exam.subjects.forEach((subject, sIdx) => {
      const completed = subject.topics.filter(t => progress[t.id]).length;
      const total = subject.topics.length;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      const badge = document.querySelector(`#accordion-${sIdx} .accordion-badge`);
      if (badge) badge.textContent = `${completed}/${total}`;
      const bar = document.getElementById(`acc-bar-${sIdx}`);
      if (bar) bar.style.width = pct + '%';
    });
  }
}

function initSyllabusSearch() {
  const input = document.getElementById('syllabus-search-input');
  input.placeholder = getTranslatedText('Search topics...');
  input.value = '';
  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.topic-item').forEach(item => {
      const name = item.querySelector('.topic-name').textContent.toLowerCase();
      item.style.display = name.includes(query) || query === '' ? 'flex' : 'none';
    });

    document.querySelectorAll('.subject-accordion').forEach(acc => {
      const visibleTopics = acc.querySelectorAll('.topic-item[style="display: flex"], .topic-item:not([style])');
      if (query && visibleTopics.length > 0) {
        acc.classList.add('open');
      }
    });
  });
}

// ═══════════════════════════════════════════
//          EXAM PATTERN RENDERER
// ═══════════════════════════════════════════

function renderExamPattern(exam) {
  const card = document.getElementById('exam-pattern-card');
  const metaEl = document.getElementById('pattern-meta');
  const papersEl = document.getElementById('pattern-papers');

  if (!exam || !exam.pattern) {
    if (card) card.style.display = 'none';
    return;
  }

  const p = exam.pattern;
  card.style.display = 'block';

  metaEl.innerHTML = `
    <span class="pattern-badge">⏱️ ${p.time}</span>
    <span class="pattern-badge">📝 ${p.type}</span>
    <span class="pattern-badge total-marks">🏆 ${p.totalMarks} Marks</span>
  `;

  let papersHtml = '';
  (p.papers || []).forEach(paper => {
    papersHtml += `
      <div class="pattern-paper-row">
        <span class="pattern-paper-name">${paper.paper}</span>
        <span class="pattern-paper-marks">${paper.marks} ${typeof paper.marks === 'number' ? 'Marks' : ''}</span>
      </div>`;
  });
  papersEl.innerHTML = papersHtml;
}

// ═══════════════════════════════════════════
//              AI CHAT
// ═══════════════════════════════════════════

function initChat() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('btn-chat-send');

  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  document.querySelectorAll('.quick-prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('chat-input').value = chip.dataset.prompt;
      sendMessage();
    });
  });

  document.getElementById('btn-new-chat').addEventListener('click', () => {
    chatHistory = [];
    localStorage.removeItem(KEYS.chatHistory);
    document.getElementById('chat-messages').innerHTML = document.getElementById('chat-welcome') ?
      '' : '';
    renderChatWelcome();
    showToast('Chat cleared 🗑️');
  });
}

function renderChatWelcome() {
  const container = document.getElementById('chat-messages');
  container.innerHTML = `
    <div class="chat-welcome" id="chat-welcome">
      <div class="welcome-emoji">🤖</div>
      <h3>CGVYAPAM AI Educator</h3>
      <p>Ask me anything about CG Vyapam exams — CG GK, syllabus, MCQs, exam pattern, and CG current affairs!</p>
      <div class="quick-prompts">
        <button class="quick-prompt-chip" data-prompt="छत्तीसगढ़ के प्रमुख राष्ट्रीय उद्यान और अभयारण्य बताओ">🌳 CG वन एवं अभयारण्य</button>
        <button class="quick-prompt-chip" data-prompt="Generate 5 MCQs on CG History for Patwari exam practice">📝 CG History MCQs</button>
        <button class="quick-prompt-chip" data-prompt="छत्तीसगढ़ की प्रमुख जनजातियाँ और उनकी विशेषताएं बताओ">🏘️ CG Tribes</button>
        <button class="quick-prompt-chip" data-prompt="CG Vyapam exam latest notifications and current affairs 2024-25">📰 CG Current Affairs</button>
        <button class="quick-prompt-chip" data-prompt="Patwari exam ke liye sabse important topics kya hain?">🎯 Important Topics</button>
      </div>
    </div>`;

  container.querySelectorAll('.quick-prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('chat-input').value = chip.dataset.prompt;
      sendMessage();
    });
  });
}

function restoreChatHistory() {
  if (chatHistory.length === 0) {
    renderChatWelcome();
    return;
  }

  const container = document.getElementById('chat-messages');
  container.innerHTML = '';

  chatHistory.forEach(msg => {
    appendChatBubble(msg.role === 'user' ? 'user' : 'ai', msg.content, msg.timestamp, false);
  });

  scrollChatToBottom();
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  const welcome = document.getElementById('chat-welcome');
  if (welcome) welcome.remove();

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  appendChatBubble('user', message, timestamp);

  chatHistory.push({ role: 'user', content: message, timestamp });

  input.value = '';
  input.style.height = 'auto';

  const sendBtn = document.getElementById('btn-chat-send');
  sendBtn.disabled = true;

  showTypingIndicator();

  try {
    const examData = getExamData(currentExam);
    const examName = examData ? examData.fullName || examData.name : 'Government Exam';

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        examName,
        language: chatLanguage,
        history: chatHistory.slice(-6),
        stream: true
      })
    });

    hideTypingIndicator();

    if (!response.ok) {
      let errMsg;
      try {
        const err = await response.json();
        errMsg = err.error || 'Failed to get response';
      } catch {
        errMsg = await response.text();
      }
      throw new Error(errMsg);
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('text/event-stream')) {
      const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const bubbleEl = appendChatBubble('ai', '', aiTimestamp, false);
      const contentEl = bubbleEl.querySelector('.bubble-content');
      let fullText = '';

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'text') {
                fullText += data.content;
                contentEl.innerHTML = formatMarkdown(fullText);
                scrollChatToBottom();
              } else if (data.type === 'error') {
                contentEl.innerHTML = `<span style="color: var(--error);">⚠️ ${data.content}</span>`;
              }
            } catch (e) { }
          }
        }
      }

      chatHistory.push({ role: 'assistant', content: fullText, timestamp: aiTimestamp });
    } else {
      const data = await response.json();
      const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      appendChatBubble('ai', data.reply, aiTimestamp);
      chatHistory.push({ role: 'assistant', content: data.reply, timestamp: aiTimestamp });
    }

    // Keep only last 50 messages
    if (chatHistory.length > 50) {
      chatHistory = chatHistory.slice(-50);
    }
    localStorage.setItem(KEYS.chatHistory, JSON.stringify(chatHistory));

  } catch (err) {
    hideTypingIndicator();
    appendChatBubble('ai', `⚠️ Error: ${err.message}. Please check if the server is running and the API key is configured.`, '');
  }

  sendBtn.disabled = false;
  scrollChatToBottom();
}

function appendChatBubble(type, content, timestamp, doScroll = true) {
  const container = document.getElementById('chat-messages');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;

  const formattedContent = type === 'ai' && content ? formatMarkdown(content) : escapeHtml(content);

  bubble.innerHTML = `
    <div class="bubble-content">${formattedContent}</div>
    ${timestamp ? `<div class="bubble-time">${timestamp}</div>` : ''}`;

  container.appendChild(bubble);
  if (doScroll) scrollChatToBottom();
  return bubble;
}

function showTypingIndicator() {
  const container = document.getElementById('chat-messages');
  const typing = document.createElement('div');
  typing.className = 'chat-bubble ai';
  typing.id = 'typing-indicator';
  typing.innerHTML = `
    <div class="bubble-content">
      <div class="typing-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>`;
  container.appendChild(typing);
  scrollChatToBottom();
}

function hideTypingIndicator() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function scrollChatToBottom() {
  const container = document.getElementById('chat-messages');
  container.scrollTop = container.scrollHeight;
}

function formatMarkdown(text) {
  if (!text) return '';
  let html = escapeHtml(text);

  html = html.replace(/### (.+)/g, '<h3>$1</h3>');
  html = html.replace(/## (.+)/g, '<h2>$1</h2>');
  html = html.replace(/# (.+)/g, '<h1>$1</h1>');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  html = html.replace(/^- (.+)/gm, '<li>$1</li>');
  html = html.replace(/^(\d+)\. (.+)/gm, '<li>$2</li>');

  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  html = html.replace(/\n/g, '<br>');
  html = html.replace(/<br><br>/g, '<br>');
  html = html.replace(/<br>(<h[1-3]>)/g, '$1');
  html = html.replace(/(<\/h[1-3]>)<br>/g, '$1');
  html = html.replace(/<br>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<br>/g, '$1');

  return html;
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ═══════════════════════════════════════════
//              TEST SYSTEM
// ═══════════════════════════════════════════

function initTestScreen() {
  document.querySelectorAll('.test-mode-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.test-mode-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      testState.mode = card.dataset.mode;
    });
  });

  document.getElementById('btn-start-test').addEventListener('click', startTest);
  document.getElementById('btn-next-q').addEventListener('click', nextQuestion);
  document.getElementById('btn-prev-q').addEventListener('click', prevQuestion);
  document.getElementById('btn-retake-test').addEventListener('click', resetTest);
  document.getElementById('btn-review-test').addEventListener('click', reviewTest);
}

function updateTestSubjects() {
  if (!currentExam) return;
  const exam = getExamData(currentExam);
  if (!exam) return;

  const select = document.getElementById('test-subject-select');
  select.innerHTML = '<option value="all">All Subjects (Mixed)</option>';

  exam.subjects.forEach(subject => {
    const option = document.createElement('option');
    option.value = subject.name;
    option.textContent = subject.name;
    select.appendChild(option);
  });
}

async function startTest() {
  const exam = getExamData(currentExam);
  if (!exam) return;

  const subject = document.getElementById('test-subject-select').value;
  const language = document.getElementById('test-lang-select').value;
  testState.selectedSubject = subject;

  document.getElementById('test-setup').style.display = 'none';
  document.getElementById('test-loading').classList.remove('hidden');
  document.getElementById('test-active').classList.remove('visible');
  document.getElementById('score-card').classList.add('hidden');

  try {
    let questionsResponse = [];

    if (testState.mode === 'pyq') {
      // Simulate slight delay for authentic feel
      await new Promise(resolve => setTimeout(resolve, 800));
      // Shuffle PRELOADED_TESTS and pick 10 questions
      const shuffled = [...PRELOADED_TESTS].sort(() => 0.5 - Math.random());
      questionsResponse = shuffled.slice(0, 10);
    } else {
      const examSubjects = exam.subjects ? exam.subjects.map(s => s.name) : [];
      const response = await fetch('/api/generate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: currentExam,
          examName: exam.fullName || exam.name,
          subject,
          mode: testState.mode,
          language,
          subjects: examSubjects
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate test');
      }

      const data = await response.json();
      questionsResponse = data.questions;
    }

    testState.questions = questionsResponse;
    testState.currentIndex = 0;
    testState.answers = new Array(questionsResponse.length).fill(null);

    document.getElementById('test-loading').classList.add('hidden');
    document.getElementById('test-active').classList.add('visible');

    if (testState.mode === 'mock') {
      startTimer(30 * 60);
      document.getElementById('test-timer').classList.remove('hidden');
      document.getElementById('timer-bar').classList.remove('hidden');
    } else {
      document.getElementById('test-timer').classList.add('hidden');
      document.getElementById('timer-bar').classList.add('hidden');
    }

    renderQuestion();
  } catch (err) {
    document.getElementById('test-loading').classList.add('hidden');
    document.getElementById('test-setup').style.display = 'block';
    showToast(`❌ ${err.message}`, 'error');
  }
}

function renderQuestion() {
  const q = testState.questions[testState.currentIndex];
  const total = testState.questions.length;
  const idx = testState.currentIndex;

  document.getElementById('test-progress-text').textContent = `Q ${idx + 1}/${total}`;

  const answered = testState.answers[idx] !== null;
  const selectedIdx = testState.answers[idx];

  let html = `
    <div class="question-card">
      <div class="question-number">Question ${idx + 1} of ${total}</div>
      <div class="question-text">${q.question}</div>
      <div class="option-list">`;

  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, optIdx) => {
    let classes = 'option-card';
    if (answered) {
      if (optIdx === q.correctIndex) classes += ' correct';
      else if (optIdx === selectedIdx && optIdx !== q.correctIndex) classes += ' wrong';
    } else if (selectedIdx === optIdx) {
      classes += ' selected';
    }

    html += `
        <div class="${classes}" onclick="selectOption(${optIdx})" ${answered ? 'style="pointer-events: none;"' : ''}>
          <div class="option-letter">${letters[optIdx]}</div>
          <div class="option-text">${opt}</div>
        </div>`;
  });

  html += `</div>`;

  if (answered) {
    html += `
      <div class="explanation-box">
        <strong>Explanation:</strong><br>${q.explanation}
      </div>`;
  }

  html += `</div>`;

  document.getElementById('question-container').innerHTML = html;

  document.getElementById('btn-prev-q').disabled = idx === 0;
  const nextBtn = document.getElementById('btn-next-q');
  if (idx === total - 1) {
    nextBtn.textContent = '📊 Finish Test';
  } else {
    nextBtn.textContent = 'Next →';
  }
}

function selectOption(optIdx) {
  const idx = testState.currentIndex;
  if (testState.answers[idx] !== null) return;

  testState.answers[idx] = optIdx;
  renderQuestion();
}

function nextQuestion() {
  if (testState.currentIndex < testState.questions.length - 1) {
    testState.currentIndex++;
    renderQuestion();
  } else {
    finishTest();
  }
}

function prevQuestion() {
  if (testState.currentIndex > 0) {
    testState.currentIndex--;
    renderQuestion();
  }
}

function startTimer(seconds) {
  testState.timeLeft = seconds;
  const totalTime = seconds;

  if (testState.timerInterval) clearInterval(testState.timerInterval);

  testState.timerInterval = setInterval(() => {
    testState.timeLeft--;

    const mins = Math.floor(testState.timeLeft / 60);
    const secs = testState.timeLeft % 60;
    const timerEl = document.getElementById('test-timer');
    timerEl.textContent = `⏱️ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (testState.timeLeft <= 60) {
      timerEl.classList.add('danger');
    }

    const percent = (testState.timeLeft / totalTime) * 100;
    document.getElementById('timer-bar-fill').style.width = percent + '%';

    if (testState.timeLeft <= 0) {
      clearInterval(testState.timerInterval);
      finishTest();
    }
  }, 1000);
}

function finishTest() {
  if (testState.timerInterval) {
    clearInterval(testState.timerInterval);
    testState.timerInterval = null;
  }

  const questions = testState.questions;
  const answers = testState.answers;

  let correct = 0, wrong = 0, skipped = 0;
  questions.forEach((q, i) => {
    if (answers[i] === null) skipped++;
    else if (answers[i] === q.correctIndex) correct++;
    else wrong++;
  });

  const total = questions.length;
  const percent = Math.round((correct / total) * 100);

  let emoji = '🎉', title = 'Excellent!';
  if (percent < 40) { emoji = '😔'; title = 'Keep Trying!'; }
  else if (percent < 60) { emoji = '💪'; title = 'Good Effort!'; }
  else if (percent < 80) { emoji = '👏'; title = 'Well Done!'; }

  document.getElementById('score-emoji').textContent = emoji;
  document.getElementById('score-title').textContent = title;
  document.getElementById('score-subtitle').textContent = `You scored ${correct}/${total} (${percent}%)`;
  document.getElementById('score-correct').textContent = correct;
  document.getElementById('score-wrong').textContent = wrong;
  document.getElementById('score-skipped').textContent = skipped;

  document.getElementById('test-active').classList.remove('visible');
  document.getElementById('score-card').classList.remove('hidden');

  const testsGiven = parseInt(localStorage.getItem(KEYS.testsGiven) || '0') + 1;
  localStorage.setItem(KEYS.testsGiven, testsGiven.toString());

  const results = JSON.parse(localStorage.getItem(KEYS.testResults) || '[]');
  results.push({
    date: new Date().toISOString(),
    exam: currentExam,
    mode: testState.mode,
    score: correct,
    total: total,
    percent: percent
  });
  if (results.length > 50) results.shift();
  localStorage.setItem(KEYS.testResults, JSON.stringify(results));

  const mcqsSolved = parseInt(localStorage.getItem(KEYS.mcqsSolved) || '0') + total;
  localStorage.setItem(KEYS.mcqsSolved, mcqsSolved.toString());

  const earnedPoints = (correct * 10) + (testState.mode === 'mock' ? 20 : 0);
  const currentPoints = parseInt(localStorage.getItem(KEYS.points) || '0');
  localStorage.setItem(KEYS.points, (currentPoints + earnedPoints).toString());

  const subjectName = testState.selectedSubject;
  if (subjectName && subjectName !== 'all') {
    trackTestPerformance(subjectName, correct, total);
  } else {
    trackTestPerformance('All Subjects', correct, total);
  }

  questions.forEach((q, i) => {
    const isCorrect = answers[i] !== null && answers[i] === q.correctIndex;
    const timeTaken = 0;
    const topic = q.topic || null;
    recordQuizAttempt(currentExam, subjectName === 'all' ? 'All Subjects' : subjectName, topic, q.id || i, isCorrect, timeTaken);
  });

  updateStreak();
}

function reviewTest() {
  document.getElementById('score-card').classList.add('hidden');
  document.getElementById('test-active').classList.add('visible');
  testState.currentIndex = 0;

  testState.questions.forEach((q, i) => {
    if (testState.answers[i] === null) {
      testState.answers[i] = -1;
    }
  });

  renderQuestion();
}

function resetTest() {
  testState.questions = [];
  testState.currentIndex = 0;
  testState.answers = [];
  testState.selectedSubject = 'all';
  if (testState.timerInterval) clearInterval(testState.timerInterval);

  document.getElementById('score-card').classList.add('hidden');
  document.getElementById('test-active').classList.remove('visible');
  document.getElementById('test-setup').style.display = 'block';
  document.getElementById('test-timer').classList.add('hidden');
  document.getElementById('timer-bar').classList.add('hidden');

  const timerEl = document.getElementById('test-timer');
  timerEl.classList.remove('danger');
}

// ═══════════════════════════════════════════
//              NEWS SCREEN — IMPROVED
// ═══════════════════════════════════════════

let newsData = [];
let newsCategory = 'all';
let newsLanguage = 'hi'; // default Hindi, controlled by setGlobalLanguage
let newsSearchQuery = '';
let newsLastUpdated = null;

function initNewsScreen() {
  // Category tabs
  document.querySelectorAll('.news-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      newsCategory = tab.dataset.category;
      renderNewsCards();
    });
  });

  // Refresh button
  const refreshBtn = document.getElementById('news-refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.classList.add('spinning');
      await refreshNews();
      refreshBtn.classList.remove('spinning');
    });
  }

  // Search input
  const searchInput = document.getElementById('news-search-input');
  const clearBtn = document.getElementById('news-search-clear');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      newsSearchQuery = searchInput.value.trim().toLowerCase();
      clearBtn.style.display = newsSearchQuery ? 'flex' : 'none';
      renderNewsCards();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      newsSearchQuery = '';
      clearBtn.style.display = 'none';
      renderNewsCards();
    });
  }
}

async function refreshNews() {
  try {
    const res = await fetch('/api/news/refresh', { method: 'POST' });
    if (!res.ok) throw new Error('Refresh failed');
    const data = await res.json();
    newsLastUpdated = data.lastUpdated;
    await loadNews();
  } catch (err) {
    showToast('Could not refresh news 📡', 'error');
  }
}

async function loadNews() {
  const container = document.getElementById('news-list');
  container.innerHTML = `
    <div class="skeleton skeleton-card"></div>
    <div class="skeleton skeleton-card"></div>
    <div class="skeleton skeleton-card" style="height:80px;"></div>`;

  // Update time display to "loading"
  const timeEl = document.getElementById('news-update-time');
  if (timeEl) timeEl.textContent = 'Loading...';

  try {
    const response = await fetch(`/api/news`);
    if (!response.ok) throw new Error('Failed to fetch news');

    const data = await response.json();
    newsData = data.articles || [];
    newsLastUpdated = data.lastUpdated;

    // Update the last updated time
    if (timeEl && newsLastUpdated) {
      const d = new Date(newsLastUpdated);
      const mins = Math.floor((Date.now() - d.getTime()) / 60000);
      timeEl.textContent = mins < 1 ? 'Just now' : `${mins}m ago`;
    } else if (timeEl) {
      timeEl.textContent = 'Live';
    }

    // Update stats bar
    updateNewsStats();

    // Setup breaking ticker
    setupNewsTicker();

    renderNewsCards();
  } catch (err) {
    if (timeEl) timeEl.textContent = 'Offline';
    container.innerHTML = `
      <div class="news-empty-state">
        <div class="news-empty-icon">📡</div>
        <div class="news-empty-title">Connection Error</div>
        <div class="news-empty-sub">Could not load news. Check your connection and try refreshing.</div>
      </div>`;
  }
}

function updateNewsStats() {
  const statsBar = document.getElementById('news-stats-bar');
  if (!statsBar) return;

  const langFiltered = newsData.filter(a => (a.lang || 'en') === newsLanguage);
  const total = langFiltered.length;
  const jobs = langFiltered.filter(a => a.category === 'jobs').length;
  const exams = langFiltered.filter(a => a.category === 'exams').length;

  document.getElementById('news-stat-total').textContent = `${total} Articles`;
  document.getElementById('news-stat-jobs').textContent = `${jobs} Jobs`;
  document.getElementById('news-stat-exams').textContent = `${exams} Alerts`;

  if (total > 0) statsBar.style.display = 'flex';
}

function setupNewsTicker() {
  const wrap = document.getElementById('news-ticker-wrap');
  const inner = document.getElementById('news-ticker-inner');
  if (!wrap || !inner) return;

  const headlines = newsData
    .filter(a => (a.lang || 'en') === newsLanguage)
    .slice(0, 8)
    .map(a => a.title);

  if (headlines.length === 0) {
    wrap.style.display = 'none';
    return;
  }

  inner.textContent = headlines.join('  ·  ');
  wrap.style.display = 'flex';
}

function getFilteredNews() {
  let filtered = newsData.filter(a => (a.lang || 'en') === newsLanguage);

  if (newsCategory !== 'all') {
    filtered = filtered.filter(a => a.category === newsCategory);
  }

  if (newsSearchQuery) {
    filtered = filtered.filter(a =>
      (a.title || '').toLowerCase().includes(newsSearchQuery) ||
      (a.description || '').toLowerCase().includes(newsSearchQuery) ||
      (a.source || '').toLowerCase().includes(newsSearchQuery)
    );
  }

  return filtered;
}

function renderNewsCards() {
  const container = document.getElementById('news-list');
  const filtered = getFilteredNews();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="news-empty-state">
        <div class="news-empty-icon">${newsSearchQuery ? '🔍' : '📭'}</div>
        <div class="news-empty-title">${newsSearchQuery ? 'No results found' : 'No articles yet'}</div>
        <div class="news-empty-sub">${newsSearchQuery ? `No news matching "${newsSearchQuery}"` : 'Try refreshing or check back later.'}</div>
      </div>`;
    return;
  }

  const categoryMap = { jobs: 'Jobs', exams: 'Exam Alert', affairs: 'Current Affairs' };
  const categoryIconMap = { jobs: '💼', exams: '📝', affairs: '🗞️' };

  let html = '';

  // First card = hero card
  const hero = filtered[0];
  const heroTag = categoryMap[hero.category] || 'News';
  const heroIcon = categoryIconMap[hero.category] || '📰';

  html += `
    <div class="news-hero-card" onclick="openNewsArticle(0, true)">
      <div class="news-hero-badge">✨ Top Story</div>
      <div class="news-hero-icon-row">
        <div class="news-hero-emoji">${hero.icon || heroIcon}</div>
        <div class="news-hero-title">${hero.title}</div>
      </div>
      <div class="news-hero-desc">${hero.description || ''}</div>
      <div class="news-hero-footer">
        <span class="news-tag ${hero.category || 'affairs'}">${heroTag}</span>
        <span class="news-hero-read-more">Read More →</span>
      </div>
    </div>`;

  // Group rest by category if showing all
  if (newsCategory === 'all' && !newsSearchQuery) {
    const rest = filtered.slice(1);
    const groups = {};
    rest.forEach(a => {
      const cat = a.category || 'affairs';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(a);
    });

    const catOrder = ['exams', 'jobs', 'affairs'];
    catOrder.forEach(cat => {
      if (!groups[cat] || groups[cat].length === 0) return;
      const labelMap = { exams: '📝 Exam Alerts', jobs: '💼 Job Notifications', affairs: '🗞️ Current Affairs' };
      html += `<div class="news-section-label">${labelMap[cat] || cat}</div>`;
      groups[cat].forEach((article, i) => {
        html += buildNewsCard(article, filtered.indexOf(article));
      });
    });
  } else {
    // Just list remaining cards
    filtered.slice(1).forEach((article, i) => {
      html += buildNewsCard(article, filtered.indexOf(article));
    });
  }

  container.innerHTML = html;
}

function buildNewsCard(article, index) {
  const tagClass = article.category || 'affairs';
  const tagLabel = { jobs: '💼 Jobs', exams: '📝 Alert', affairs: '🗞️ Affairs' }[tagClass] || tagClass;
  const timeAgo = article.date ? `📅 ${article.date}` : '';
  const source = article.source ? `📡 ${article.source}` : '';

  return `
    <div class="news-card" onclick="openNewsArticle(${index})">
      <div class="news-card-emoji-box">${article.icon || '📰'}</div>
      <div class="news-card-body-wrap">
        <div class="news-card-title">${article.title}</div>
        <div class="news-card-desc">${article.description || ''}</div>
        <div class="news-card-footer">
          <span class="news-tag ${tagClass}">${tagLabel}</span>
          ${timeAgo ? `<span class="news-date">${timeAgo}</span>` : ''}
          ${source ? `<span class="news-source">${source}</span>` : ''}
        </div>
      </div>
    </div>`;
}

function openNewsArticle(index, isHero = false) {
  const filtered = getFilteredNews();
  const article = filtered[index];
  if (!article) return;

  // Update category badge
  const badge = document.getElementById('nd-category-badge');
  const catMap = { jobs: '💼 Jobs', exams: '📝 Exam Alert', affairs: '🗞️ Current Affairs' };
  if (badge) {
    badge.textContent = catMap[article.category] || '📰 News';
    badge.className = 'nd-category-badge ' + (article.category || '');
  }

  document.getElementById('nd-title').textContent = article.title;
  document.getElementById('nd-date').textContent = article.date ? `📅 ${article.date}` : '📅 Today';
  document.getElementById('nd-source').textContent = article.source ? `📡 ${article.source}` : '📡 ExamPrep AI';
  document.getElementById('nd-desc').textContent = article.description || 'No detailed description available.';

  // Exam relevance hint
  const relTag = document.getElementById('nd-relevance-tag');
  const relText = document.getElementById('nd-relevance-text');
  if (article.category === 'exams') {
    relText.textContent = 'This notification may affect your exam schedule. Check official site.';
    relTag.style.display = 'flex';
  } else if (article.category === 'jobs') {
    relText.textContent = 'New job opening! Check eligibility and apply before the deadline.';
    relTag.style.display = 'flex';
  } else {
    relTag.style.display = 'none';
  }

  // Ask AI Button logic
  const askBtn = document.getElementById('nd-ask-ai-btn');
  askBtn.onclick = () => {
    closeModal('modal-news-detail');
    document.getElementById('chat-input').value =
      `Tell me about this topic in detail for my exam preparation: "${article.title}". Explain its importance, key facts, and potential exam questions.`;
    navigateTo('ai-chat');
    setTimeout(() => sendMessage(), 300);
  };

  // Original Website Button logic
  const readBtn = document.getElementById('nd-read-more-btn');
  if (article.url && article.url !== '#') {
    readBtn.style.display = 'block';
    readBtn.onclick = () => {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    };
  } else {
    readBtn.style.display = 'none';
  }

  openModal('modal-news-detail');
}


// ═══════════════════════════════════════════
//              SYLLABUS UPLOAD
// ═══════════════════════════════════════════

(function initUpload() {
  document.addEventListener('DOMContentLoaded', () => {
    const zone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('upload-file-input');

    zone.addEventListener('click', () => fileInput.click());

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('dragover');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        showFileName(e.dataTransfer.files[0].name);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        showFileName(fileInput.files[0].name);
      }
    });
  });
})();

function showFileName(name) {
  const el = document.getElementById('upload-file-name');
  el.textContent = `📎 ${name}`;
  el.style.display = 'block';
}

async function submitSyllabus() {
  const fileInput = document.getElementById('upload-file-input');
  const textInput = document.getElementById('upload-text-input');
  const nameInput = document.getElementById('upload-name-input');

  const file = fileInput.files[0];
  const text = textInput.value.trim();
  const name = nameInput.value.trim() || 'Custom Syllabus';

  if (!file && !text) {
    showToast('Please upload a file or paste syllabus text', 'error');
    return;
  }

  document.getElementById('btn-upload-submit').disabled = true;
  document.getElementById('upload-loading').classList.remove('hidden');

  try {
    let response;

    if (file) {
      const formData = new FormData();
      formData.append('syllabusFile', file);
      formData.append('name', name);

      response = await fetch('/api/parse-syllabus', {
        method: 'POST',
        body: formData
      });
    } else {
      response = await fetch('/api/parse-syllabus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, name })
      });
    }

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to parse syllabus');
    }

    const data = await response.json();

    const customId = 'custom-' + Date.now();
    const customSyllabus = {
      id: customId,
      name: data.name || name,
      fullName: data.name || name,
      icon: '📄',
      description: `Custom syllabus • ${data.totalTopics} topics`,
      subjects: data.subjects
    };

    const syllabi = getCustomSyllabi();
    syllabi.push(customSyllabus);
    saveCustomSyllabi(syllabi);

    closeModal('modal-upload');
    renderExamGrid();
    showToast(`✅ Syllabus parsed! ${data.totalTopics} topics found.`);

    fileInput.value = '';
    textInput.value = '';
    nameInput.value = '';
    document.getElementById('upload-file-name').style.display = 'none';

  } catch (err) {
    showToast(`❌ ${err.message}`, 'error');
  }

  document.getElementById('btn-upload-submit').disabled = false;
  document.getElementById('upload-loading').classList.add('hidden');
}

// ═══════════════════════════════════════════
//              MODALS & UTILS
// ═══════════════════════════════════════════

function openModal(id) {
  document.getElementById(id).classList.add('visible');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('visible');
}

document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('visible');
    }
  });
});

let toastTimer = null;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  // Truncate long messages
  const truncated = message.length > 80 ? message.substring(0, 80) + '...' : message;
  toast.textContent = truncated;
  toast.className = `toast visible ${type}`;

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    toastTimer = null;
  }, 3000);
}

function checkDailyReminder() {
  const today = new Date().toISOString().split('T')[0];
  const lastShown = localStorage.getItem(KEYS.reminderShown);

  if (lastShown !== today && currentExam) {
    setTimeout(() => {
      openModal('modal-reminder');
      localStorage.setItem(KEYS.reminderShown, today);
    }, 2000);
  }
}

function updateSettingsModal() {
  const exam = currentExam ? getExamData(currentExam) : null;
  document.getElementById('settings-exam-name').textContent = exam ? exam.name : 'Not Selected';

  // Sync the language toggle to current appLanguage
  const toggle = document.getElementById('settings-lang-toggle');
  if (toggle) {
    toggle.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === appLanguage);
    });
  }

  checkApiStatus();
}

async function checkApiStatus() {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    const dot = document.getElementById('api-status-dot');
    const text = document.getElementById('api-status-text');

    if (data.apiKeyConfigured) {
      dot.className = 'api-status connected';
      text.textContent = 'API key configured ✅';
    } else {
      dot.className = 'api-status disconnected';
      text.textContent = 'API key not set — update server/.env';
    }
  } catch (e) {
    const dot = document.getElementById('api-status-dot');
    const text = document.getElementById('api-status-text');
    dot.className = 'api-status disconnected';
    text.textContent = 'Server not running ❌';
  }
}

function clearProgress() {
  if (!confirm('Are you sure? This will clear all your progress, streaks, and test results.')) return;

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('examprep_') && key !== KEYS.chatHistory) {
      localStorage.removeItem(key);
    }
  });

  currentExam = null;
  changeExam();
  showToast('All progress cleared 🗑️');
}

function clearChatHistory() {
  if (!confirm('Clear all chat history?')) return;
  chatHistory = [];
  localStorage.removeItem(KEYS.chatHistory);
  if (currentScreen === 'ai-chat') {
    renderChatWelcome();
  }
  showToast('Chat history cleared 💬');
}

// ═══════════════════════════════════════════
//              AUTH SYSTEM (Firebase)
// ═══════════════════════════════════════════

/**
 * Called on app init — listens for Firebase auth state changes.
 * Replaces old localStorage token check.
 */
function checkUserAuth() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in
      localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);

      // Check admin custom claim
      try {
        const tokenResult = await user.getIdTokenResult();
        _isAdmin = tokenResult.claims.admin === true;
      } catch (e) {
        _isAdmin = false;
      }

      // Close auth modal if open
      document.getElementById('modal-auth')?.classList.remove('visible');

      // Re-render exam grid to show/hide admin options
      if (typeof renderExamGrid === 'function') renderExamGrid();

    } else {
      // User signed out — show auth modal
      _isAdmin = false;
      localStorage.removeItem('userName');
      document.getElementById('modal-auth')?.classList.add('visible');
    }
  });
}

function userLogout() {
  if (!confirm('Are you sure you want to log out?')) return;
  firebase.auth().signOut().then(() => {
    localStorage.removeItem('userName');
    window.location.reload();
  }).catch(err => {
    showToast('Logout failed: ' + err.message, 'error');
  });
}

function toggleAuthMode() {
  const login = document.getElementById('login-form');
  const signup = document.getElementById('signup-form');
  document.getElementById('login-error').style.display = 'none';
  document.getElementById('signup-error').style.display = 'none';
  if (login.classList.contains('hidden')) {
    login.classList.remove('hidden');
    signup.classList.add('hidden');
  } else {
    login.classList.add('hidden');
    signup.classList.remove('hidden');
  }
}

/**
 * Login: converts UserID → internal email (userID@studyworld.app)
 * so users still type their UserID, not an email.
 */
async function userLogin() {
  const userID = document.getElementById('login-id').value.trim();
  const pass = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');
  const btn = document.getElementById('btn-login');

  if (!userID || !pass) {
    errEl.textContent = 'Please fill all fields';
    errEl.style.display = 'block';
    return;
  }

  errEl.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Logging in...';

  // Internally use email format: userID@studyworld.app
  const email = `${userID.toLowerCase()}@studyworld.app`;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, pass);
    // onAuthStateChanged will handle closing modal & setting state
    showToast('Logged in successfully! ✅');
  } catch (err) {
    let msg = 'Login failed. Check your UserID and password.';
    if (err.code === 'auth/user-not-found') msg = 'UserID not found. Please sign up.';
    else if (err.code === 'auth/wrong-password') msg = 'Incorrect password.';
    else if (err.code === 'auth/invalid-email') msg = 'Invalid UserID format.';
    else if (err.code === 'auth/invalid-credential') msg = 'Invalid UserID or password.';
    errEl.textContent = msg;
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Login';
  }
}

/**
 * Signup: creates Firebase Auth account with email = userID@studyworld.app,
 * then saves name & mobile to Firestore via server (or just displayName).
 */
async function userSignup() {
  const name = document.getElementById('signup-name').value.trim();
  const mobile = document.getElementById('signup-mobile').value.trim();
  const userID = document.getElementById('signup-id').value.trim();
  const pass = document.getElementById('signup-pass').value;
  const errEl = document.getElementById('signup-error');
  const btn = document.getElementById('btn-signup');

  if (!name || !mobile || !userID || !pass) {
    errEl.textContent = 'Please fill all fields';
    errEl.style.display = 'block';
    return;
  }
  if (pass.length < 6) {
    errEl.textContent = 'Password must be at least 6 characters';
    errEl.style.display = 'block';
    return;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(userID)) {
    errEl.textContent = 'UserID can only contain letters, numbers, and underscore';
    errEl.style.display = 'block';
    return;
  }

  errEl.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Creating account...';

  const email = `${userID.toLowerCase()}@studyworld.app`;

  try {
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, pass);
    // Set display name so we know the user's real name
    await cred.user.updateProfile({ displayName: name });
    localStorage.setItem('userName', name);
    showToast('Account created! Welcome 🎉');
    // onAuthStateChanged will close the modal
  } catch (err) {
    let msg = 'Signup failed. Please try again.';
    if (err.code === 'auth/email-already-in-use') msg = 'UserID already taken. Try another.';
    else if (err.code === 'auth/weak-password') msg = 'Password is too weak (min 6 chars).';
    else if (err.code === 'auth/invalid-email') msg = 'Invalid UserID format.';
    errEl.textContent = msg;
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign Up';
  }
}

// ═══════════════════════════════════════════
//              STUDY TOPIC POPUP
// ═══════════════════════════════════════════

let currentStudyTopic = '';

async function openStudyTopic(topicName) {
  currentStudyTopic = topicName;
  document.getElementById('study-topic-title').textContent = "📚 " + topicName;
  document.getElementById('modal-topic-study').classList.add('visible');
  tabStudy('notes'); // Load notes by default
}

async function tabStudy(type) {
  document.getElementById('btn-tab-notes').style.background = 'transparent';
  document.getElementById('btn-tab-youtube').style.background = 'transparent';
  document.getElementById(`btn-tab-${type}`).style.background = 'rgba(108, 92, 231, 0.2)';

  const area = document.getElementById('study-content-area');
  area.innerHTML = '<div class="spinner"></div><p style="text-align:center;color:#888;">AI is preparing your study material...</p>';

  if (type === 'notes') {
    try {
      const res = await fetch('/api/study/topic-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicName: currentStudyTopic, language: chatLanguage })
      });
      const data = await res.json();
      if (data.notes) {
        area.innerHTML = formatMarkdown(data.notes);
      } else {
        area.innerHTML = '<p>Failed to generate notes.</p>';
      }
    } catch (e) {
      area.innerHTML = '<p>Error loading notes.</p>';
    }
  } else if (type === 'youtube') {
    try {
      const res = await fetch('/api/study/youtube-learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicName: currentStudyTopic, language: chatLanguage })
      });
      const data = await res.json();
      if (data.summary) {
        let html = `<a href="${data.videoInfo.url}" target="_blank" style="display:block; text-align:center; margin-bottom:15px;">
                    <img src="${data.videoInfo.thumbnail}" style="max-width:100%; border-radius:8px;" />
                    <h4 style="color:var(--primary); margin-top:5px;">${data.videoInfo.title}</h4>
                </a>`;
        html += formatMarkdown(data.summary);
        area.innerHTML = html;
      } else {
        area.innerHTML = '<p>' + (data.error || 'Failed to analyze video.') + '</p>';
      }
    } catch (e) {
      area.innerHTML = '<p>Error loading YouTube analysis.</p>';
    }
  }
}

// ═══════════════════════════════════════════
//            ANALYTICS SCREEN
// ═══════════════════════════════════════════

let currentAnalyticsSubject = null;

async function loadAnalytics() {
  const headers = await getAuthHeaders();
  if (!headers.Authorization) {
    showToast('Please login to view analytics', 'error');
    navigateTo('dashboard');
    return;
  }

  document.getElementById('analytics-subjects-list').innerHTML = '<div class="skeleton" style="height: 60px; margin-bottom: 10px;"></div>'.repeat(3);

  try {
    const [overviewRes, subjectsRes] = await Promise.all([
      fetch('/api/analytics/overview', { headers }),
      fetch('/api/analytics/subjects', { headers })
    ]);

    if (!overviewRes.ok || !subjectsRes.ok) {
      throw new Error('Failed to load analytics');
    }

    const overview = await overviewRes.json();
    const subjectsData = await subjectsRes.json();

    document.getElementById('analytics-accuracy').textContent = overview.overallAccuracy + '%';
    document.getElementById('analytics-total-mcqs').textContent = overview.totalAttempted || 0;
    document.getElementById('analytics-study-time').textContent = (overview.totalStudyTime || 0) + 'm';
    document.getElementById('analytics-streak').textContent = overview.currentStreak || 0;

    renderWeeklyGraph(overview.weeklyActivity || []);
    renderSubjectsList(subjectsData || []);
    loadImprovementPlan();

  } catch (err) {
    console.error('[Analytics Error]:', err);
    document.getElementById('analytics-subjects-list').innerHTML = 
      '<div class="empty-state"><p>Unable to load analytics. Make sure you are logged in.</p></div>';
  }
}

function renderWeeklyGraph(weeklyData) {
  const container = document.getElementById('analytics-weekly-graph');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const dayMap = [1, 2, 3, 4, 5, 6, 0];
  
  const maxCount = Math.max(...weeklyData.map(w => w.count), 1);
  
  let html = '';
  for (let i = 0; i < 7; i++) {
    const dayIndex = dayMap[i];
    const dayData = weeklyData.find(w => {
      const d = new Date(w.date);
      return d.getDay() === dayIndex;
    });
    const count = dayData?.count || 0;
    const height = Math.max((count / maxCount) * 80, 4);
    
    html += `
      <div class="analytics-weekly-bar">
        <div class="analytics-bar-count">${count}</div>
        <div class="analytics-bar-fill" style="height: ${height}px"></div>
        <div class="analytics-bar-label">${days[i]}</div>
      </div>`;
  }
  container.innerHTML = html;
}

function renderSubjectsList(subjects) {
  const container = document.getElementById('analytics-subjects-list');
  
  if (subjects.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No subject data yet. Take some tests to see your performance!</p></div>';
    return;
  }

  let html = '';
  subjects.forEach(subj => {
    let statusClass = 'average';
    if (subj.status === 'strong') statusClass = 'strong';
    if (subj.status === 'weak') statusClass = 'weak';
    
    html += `
      <div class="analytics-subject-card" onclick="analyticsShowTopics('${subj.name}')">
        <div class="analytics-subject-header">
          <span class="analytics-subject-name">${subj.name}</span>
          <span class="analytics-subject-accuracy ${statusClass}">${subj.accuracy}%</span>
        </div>
        <div class="analytics-subject-bar">
          <div class="analytics-subject-bar-fill ${statusClass}" style="width: ${subj.accuracy}%"></div>
        </div>
        <div class="analytics-subject-meta">
          <span>${subj.total} questions</span>
          <span class="analytics-subject-status ${statusClass}">${subj.status === 'strong' ? '💪 Strong' : subj.status === 'weak' ? '⚠️ Weak' : ' average'}</span>
        </div>
      </div>`;
  });
  
  container.innerHTML = html;
}

async function analyticsShowTopics(subjectName) {
  currentAnalyticsSubject = subjectName;
  const headers = await getAuthHeaders();
  
  document.getElementById('analytics-subjects-list').classList.add('hidden');
  document.getElementById('analytics-topics-view').classList.remove('hidden');
  document.getElementById('analytics-topics-title').textContent = subjectName;
  
  const container = document.getElementById('analytics-topics-list');
  container.innerHTML = '<div class="skeleton skeleton-card"></div>';
  
  try {
    const res = await fetch(`/api/analytics/topics?subject=${encodeURIComponent(subjectName)}`, {
      headers
    });
    
    const data = await res.json();
    
    if (data && data.length > 0) {
      let html = '';
      data.forEach(topic => {
        let statusClass = topic.status === 'strong' ? 'strong' : topic.status === 'weak' ? 'weak' : 'average';
        let badgeText = topic.status === 'strong' ? '💪 Strong' : topic.status === 'weak' ? '⚠️ Weak' : ' average';
        
        html += `
          <div class="analytics-topic-card">
            <div class="analytics-topic-info">
              <div class="analytics-topic-name">${topic.name}</div>
              <div class="analytics-topic-stats">${topic.total} questions • ${topic.correct} correct</div>
            </div>
            <div class="analytics-topic-right">
              <div class="analytics-topic-accuracy" style="color: var(--${statusClass === 'strong' ? 'success' : statusClass === 'weak' ? 'warning' : 'text-secondary'})">${topic.accuracy}%</div>
              <span class="analytics-topic-badge" style="background: var(--${statusClass === 'strong' ? 'success-bg' : statusClass === 'weak' ? 'warning-bg' : 'bg-elevated'}); color: var(--${statusClass === 'strong' ? 'success' : statusClass === 'weak' ? 'warning' : 'text-muted'})">${badgeText}</span>
            </div>
          </div>`;
      });
      container.innerHTML = html;
    } else {
      container.innerHTML = '<div class="empty-state"><p>No topic data for this subject yet.</p></div>';
    }
  } catch (err) {
    container.innerHTML = '<div class="empty-state"><p>Error loading topics.</p></div>';
  }
}

function analyticsShowSubjects() {
  currentAnalyticsSubject = null;
  document.getElementById('analytics-subjects-list').classList.remove('hidden');
  document.getElementById('analytics-topics-view').classList.add('hidden');
}

async function loadImprovementPlan() {
  const container = document.getElementById('analytics-improvement');
  const headers = await getAuthHeaders();
  
  if (!headers.Authorization) {
    container.innerHTML = '<div class="empty-state">Login to get AI-powered study plan</div>';
    return;
  }
  
  container.innerHTML = '<div class="analytics-improvement-loading">🤖 Generating your personalized study plan...</div>';
  
  try {
    const res = await fetch('/api/analytics/improvement-plan', { headers });
    
    const data = await res.json();
    
    if (data.recommendation) {
      container.innerHTML = data.recommendation;
    } else {
      container.innerHTML = '<div class="empty-state">Take more tests to get personalized recommendations!</div>';
    }
  } catch (err) {
    container.innerHTML = '<div class="empty-state">Unable to generate plan. Please try again later.</div>';
  }
}

async function recordQuizAttempt(examId, subject, topic, questionId, isCorrect, timeTaken) {
  const headers = await getAuthHeaders();
  if (!headers.Authorization) return;
  
  try {
    await fetch('/api/analytics/record', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({ examId, subject, topic, questionId, isCorrect, timeTaken })
    });
  } catch (err) {
    console.error('[Record Attempt Error]:', err);
  }
}

