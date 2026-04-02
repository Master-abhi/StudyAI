/* ═══════════════════════════════════════════
   ExamPrep AI — Main Application Logic
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
  customSyllabi: 'examprep_customSyllabi'
};

// ── State ──
let currentExam = null;
let currentScreen = 'exams';
let chatLanguage = 'english';
let chatHistory = [];
let testState = {
  mode: 'quiz',
  questions: [],
  currentIndex: 0,
  answers: [],
  timerInterval: null,
  timeLeft: 0
};

// ═══════════════════════════════════════════
//               INITIALIZATION
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initNavigation();
  initExamSelector();
  initChat();
  initTestScreen();
  initNewsScreen();
  checkDailyReminder();
  checkApiStatus();
});

function loadState() {
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

  const customSyllabi = getCustomSyllabi();
  const custom = customSyllabi.find(s => s.id === examId);
  if (custom) return custom;

  return null;
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

  for (const [id, exam] of Object.entries(SYLLABUS_DATA)) {
    html += `
      <div class="exam-card" onclick="selectExam('${id}')">
        <div class="exam-card-icon">${exam.icon}</div>
        <div class="exam-card-info">
          <h3>${exam.name}</h3>
          <p>${exam.description}</p>
        </div>
        <div class="exam-card-arrow">→</div>
      </div>`;
  }

  const customSyllabi = getCustomSyllabi();
  customSyllabi.forEach(cs => {
    html += `
      <div class="exam-card" onclick="selectExam('${cs.id}')">
        <div class="exam-card-icon">📄</div>
        <div class="exam-card-info">
          <h3>${cs.name}</h3>
          <p>Custom uploaded syllabus • ${cs.subjects.reduce((s, sub) => s + sub.topics.length, 0)} topics</p>
        </div>
        <div class="exam-card-arrow">→</div>
      </div>`;
  });

  html += `
    <div class="exam-card upload-card" onclick="openModal('modal-upload')">
      <div class="exam-card-icon">📤</div>
      <div class="exam-card-info">
        <h3>Upload Custom Syllabus</h3>
        <p>Upload your own syllabus (PDF or text) and let AI parse it</p>
      </div>
      <div class="exam-card-arrow">+</div>
    </div>`;

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

function renderSyllabus() {
  if (!currentExam) return;
  const exam = getExamData(currentExam);
  if (!exam) return;
  const progress = getProgress();

  const allTopics = getAllTopics();
  const completedCount = allTopics.filter(t => progress[t.id]).length;
  const totalTopics = allTopics.length;
  const overallPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  document.getElementById('syllabus-overall-detail').textContent = `${completedCount} / ${totalTopics} topics`;
  document.getElementById('syllabus-overall-percent').textContent = overallPercent + '%';

  const container = document.getElementById('syllabus-accordion-list');
  let html = '';

  exam.subjects.forEach((subject, sIdx) => {
    const completed = subject.topics.filter(t => progress[t.id]).length;
    const total = subject.topics.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    html += `
      <div class="subject-accordion" id="accordion-${sIdx}">
        <button class="subject-accordion-header" onclick="toggleAccordion(${sIdx})">
          <div class="accordion-left">
            <span class="accordion-subject-name">${subject.name}</span>
            <span class="accordion-badge">${completed}/${total}</span>
          </div>
          <span class="accordion-chevron">▼</span>
        </button>
        <div class="subject-accordion-body">
          <div class="subject-actions">
            <button class="subject-action-btn" onclick="markAllSubject(${sIdx}, true)">✅ Mark All</button>
            <button class="subject-action-btn" onclick="markAllSubject(${sIdx}, false)">↩️ Unmark All</button>
          </div>`;

    subject.topics.forEach(topic => {
      const checked = progress[topic.id] ? 'checked' : '';
      const completedClass = progress[topic.id] ? 'completed' : '';
      html += `
          <div class="topic-item ${completedClass}" id="topic-${topic.id}">
            <label class="topic-checkbox">
              <input type="checkbox" ${checked} onchange="toggleTopic('${topic.id}', this.checked)">
              <span class="checkmark"></span>
            </label>
            <span class="topic-name">${topic.name}</span>
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

  document.getElementById('syllabus-overall-detail').textContent = `${completedCount} / ${totalTopics} topics`;
  document.getElementById('syllabus-overall-percent').textContent = percent + '%';

  // Update per-subject accordion badges
  if (exam) {
    exam.subjects.forEach((subject, sIdx) => {
      const completed = subject.topics.filter(t => progress[t.id]).length;
      const total = subject.topics.length;
      const badge = document.querySelector(`#accordion-${sIdx} .accordion-badge`);
      if (badge) badge.textContent = `${completed}/${total}`;
    });
  }
}

function initSyllabusSearch() {
  const input = document.getElementById('syllabus-search-input');
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

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      chatLanguage = btn.dataset.lang;
    });
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
      <h3>AI Study Assistant</h3>
      <p>Ask me anything about your exam topics. I can explain concepts, generate MCQs, and help with revision!</p>
      <div class="quick-prompts">
        <button class="quick-prompt-chip" data-prompt="Explain the Indian Constitution's Preamble in simple terms">📖 Explain Topic</button>
        <button class="quick-prompt-chip" data-prompt="Generate 5 MCQs on Indian History for exam practice">📝 Give MCQs</button>
        <button class="quick-prompt-chip" data-prompt="What are the most important current affairs topics for my exam this month?">📰 Current Affairs</button>
        <button class="quick-prompt-chip" data-prompt="Give me a summary of the most frequently asked topics in previous year papers">📋 PYQ Analysis</button>
        <button class="quick-prompt-chip" data-prompt="Create a short revision note on Indian Geography - Physical Features">🗒️ Quick Notes</button>
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
        history: chatHistory.slice(-20),
        stream: true
      })
    });

    hideTypingIndicator();

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to get response');
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
            } catch (e) {}
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

  document.getElementById('test-setup').style.display = 'none';
  document.getElementById('test-loading').classList.remove('hidden');
  document.getElementById('test-active').classList.remove('visible');
  document.getElementById('score-card').classList.add('hidden');

  try {
    const response = await fetch('/api/generate-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examId: currentExam,
        examName: exam.fullName || exam.name,
        subject,
        mode: testState.mode,
        language
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to generate test');
    }

    const data = await response.json();
    testState.questions = data.questions;
    testState.currentIndex = 0;
    testState.answers = new Array(data.questions.length).fill(null);

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
//              NEWS SCREEN
// ═══════════════════════════════════════════

let newsData = [];
let newsCategory = 'all';

function initNewsScreen() {
  document.querySelectorAll('.news-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      newsCategory = tab.dataset.category;
      renderNewsCards();
    });
  });
}

async function loadNews() {
  const container = document.getElementById('news-list');
  container.innerHTML = `
    <div class="skeleton skeleton-card"></div>
    <div class="skeleton skeleton-card"></div>
    <div class="skeleton skeleton-card"></div>`;

  try {
    const response = await fetch(`/api/news?category=${newsCategory}`);
    if (!response.ok) throw new Error('Failed to fetch news');

    const data = await response.json();
    newsData = data.articles || [];
    renderNewsCards();
  } catch (err) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📡</div>
        <p>Could not load news. Please check your connection.</p>
      </div>`;
  }
}

function renderNewsCards() {
  const container = document.getElementById('news-list');
  let filtered = newsData;

  if (newsCategory !== 'all') {
    filtered = newsData.filter(a => a.category === newsCategory);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <p>No articles found in this category.</p>
      </div>`;
    return;
  }

  let html = '';
  filtered.forEach((article, i) => {
    const tagClass = article.category || 'affairs';
    const tagLabel = { jobs: 'Jobs', exams: 'Exam Alert', affairs: 'Current Affairs' }[tagClass] || tagClass;

    html += `
      <div class="news-card" onclick="askAIAboutNews(${i})">
        <div class="news-card-header">
          <span class="news-icon">${article.icon || '📰'}</span>
          <span class="news-card-title">${article.title}</span>
        </div>
        <div class="news-card-body">${article.description}</div>
        <div class="news-card-footer">
          <span class="news-tag ${tagClass}">${tagLabel}</span>
          <span class="news-date">${article.date || ''}</span>
          <span class="news-source">${article.source || ''}</span>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

function askAIAboutNews(index) {
  const filtered = newsCategory !== 'all'
    ? newsData.filter(a => a.category === newsCategory)
    : newsData;

  const article = filtered[index];
  if (!article) return;

  document.getElementById('chat-input').value =
    `Tell me about this topic in detail for my exam preparation: "${article.title}". Explain its importance, key facts, and potential exam questions.`;

  navigateTo('ai-chat');

  setTimeout(() => sendMessage(), 300);
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
