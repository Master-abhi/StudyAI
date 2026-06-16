const express = require('express');
const router = express.Router();
const multer = require('multer');
const { admin, db, bucket, authAdmin } = require('../firebase-admin');
const { verifyAdmin, verifyStaffOrAdmin } = require('../middleware/verifyFirebaseToken');
const { extractTextFromPDF } = require('../services/syllabusParser');
const { getActiveAI, setActiveAI, getGeminiConfig, updateAIConfig, generateTest, summarizeNews, translateAndSummarizeNews } = require('../services/aiManager');

const logStaffActivity = async (req, action, details) => {
  try {
    const staffRef = db.collection('staff_logs').doc();
    const actorType = req.user.admin ? 'admin' : 'staff';
    const email = req.user.email || '';
    const staffId = req.user.name || req.user.displayName || email.split('@')[0] || 'Unknown';
    
    await staffRef.set({
      uid: req.user.uid,
      staffId,
      email,
      actorType,
      action,
      details,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('[Log Staff Activity Error]:', err.message);
  }
};

// Use memory storage — PDFs go to Firebase Storage, not local disk
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDFs allowed for materials'), false);
  },
  limits: { fileSize: 10 * 1024 * 1024 }
});

const MATERIALS_COL = db.collection('materials');

const normalizeQuestion = (q) => {
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
    columnI = q.columnA.map((col) => (typeof col === 'object' && col !== null ? (col.text || '') : String(col)));
  }
  if (Array.isArray(q.columnB)) {
    columnII = q.columnB.map((col) => (typeof col === 'object' && col !== null ? (col.text || '') : String(col)));
  }

  let statements = q.statements || [];
  let statementLabels = q.statementLabels || [];
  if (Array.isArray(q.itemsToOrder)) {
    statements = q.itemsToOrder.map((item) => (typeof item === 'object' && item !== null ? (item.text || '') : String(item)));
    statementLabels = q.itemsToOrder.map((item) => (typeof item === 'object' && item !== null ? (item.id || '') : ''));
  } else if (Array.isArray(q.statements) && q.statements.length > 0 && typeof q.statements[0] === 'object') {
    statements = q.statements.map((item) => (typeof item === 'object' && item !== null ? (item.text || '') : String(item)));
    statementLabels = q.statements.map((item) => (typeof item === 'object' && item !== null ? (item.id || '') : ''));
  }

  const options = Array.isArray(q.options) ? q.options.map(opt => String(opt)) : [];
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


// ── AI Config Routes ──

router.get('/config/ai', verifyAdmin, async (req, res) => {
  try {
    const activeAI = await getActiveAI();
    const geminiConfig = await getGeminiConfig();
    res.json({
      activeAI,
      geminiModelTest: geminiConfig.test,
      geminiModelAnalytics: geminiConfig.analytics,
      geminiModelChat: geminiConfig.chat,
      geminiModelNews: geminiConfig.news
    });
  } catch (err) {
    console.error('[Admin Config GET Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve AI configuration' });
  }
});

router.post('/config/ai', verifyAdmin, async (req, res) => {
  try {
    const { model, geminiModelTest, geminiModelAnalytics, geminiModelChat, geminiModelNews } = req.body;
    
    const updates = {};
    if (model) {
      if (model === 'claude' || model === 'groq' || model === 'gemini') {
        updates.activeAI = model;
      } else {
        return res.status(400).json({ error: 'Invalid active AI model provider' });
      }
    }

    const validModels = [
      'gemini-3.5-flash',
      'gemini-3.5-pro',
      'gemini-3.1-flash-lite',
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gemma-4-31b-it'
    ];

    if (geminiModelTest) {
      if (!validModels.includes(geminiModelTest)) {
        return res.status(400).json({ error: `Invalid Gemini Test Model: ${geminiModelTest}` });
      }
      updates.geminiModelTest = geminiModelTest;
    }
    if (geminiModelAnalytics) {
      if (!validModels.includes(geminiModelAnalytics)) {
        return res.status(400).json({ error: `Invalid Gemini Analytics Model: ${geminiModelAnalytics}` });
      }
      updates.geminiModelAnalytics = geminiModelAnalytics;
    }
    if (geminiModelChat) {
      if (!validModels.includes(geminiModelChat)) {
        return res.status(400).json({ error: `Invalid Gemini Chat Model: ${geminiModelChat}` });
      }
      updates.geminiModelChat = geminiModelChat;
    }
    if (geminiModelNews) {
      if (!validModels.includes(geminiModelNews)) {
        return res.status(400).json({ error: `Invalid Gemini News Model: ${geminiModelNews}` });
      }
      updates.geminiModelNews = geminiModelNews;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Nothing to update' });
    }

    const success = await updateAIConfig(updates);
    if (success) {
      return res.json({ success: true, ...updates });
    }
    return res.status(500).json({ error: 'Failed to update configuration' });
  } catch (err) {
    console.error('[Admin Config POST Error]:', err.message);
    res.status(500).json({ error: 'Internal server error while updating configuration' });
  }
});

// ── Tab Config Routes ──

// GET /api/admin/config/tabs - Retrieve tab visibility settings (publicly readable)
router.get('/config/tabs', async (req, res) => {
  try {
    const doc = await db.collection('config').doc('tabs').get();
    const defaultVisibility = {
      home: true,
      practice: true,
      chat: true,
      news: true,
      syllabus: true,
      profile: true,
      syllabus_ai_planner: true,
      syllabus_revision: true,
      syllabus_analytics: true,
      syllabus_strategy: true
    };
    if (doc.exists) {
      const data = doc.data();
      const visibility = { ...defaultVisibility, ...(data.visibility || {}) };
      return res.json({ success: true, visibility });
    }
    return res.json({ success: true, visibility: defaultVisibility });
  } catch (err) {
    console.error('[Admin Config Tabs GET Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve tab configuration' });
  }
});

// POST /api/admin/config/tabs - Update tab visibility settings (admin only)
router.post('/config/tabs', verifyAdmin, async (req, res) => {
  try {
    const { visibility } = req.body;
    if (!visibility || typeof visibility !== 'object') {
      return res.status(400).json({ error: 'Invalid visibility payload' });
    }
    
    const updatedVisibility = {};
    const validTabs = [
      'home', 'practice', 'chat', 'news', 'syllabus', 'profile',
      'syllabus_ai_planner', 'syllabus_revision', 'syllabus_analytics', 'syllabus_strategy'
    ];
    for (const key of validTabs) {
      if (visibility.hasOwnProperty(key)) {
        updatedVisibility[key] = !!visibility[key];
      } else {
        updatedVisibility[key] = true;
      }
    }

    await db.collection('config').doc('tabs').set({
      visibility: updatedVisibility,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    await logStaffActivity(req, 'update_tabs_config', { visibility: updatedVisibility });

    res.json({ success: true, visibility: updatedVisibility });
  } catch (err) {
    console.error('[Admin Config Tabs POST Error]:', err.message);
    res.status(500).json({ error: 'Internal server error while updating tab configuration' });
  }
});

// ── Exam Config Routes ──

// GET /api/admin/config/exams - Retrieve exam visibility settings (publicly readable)
router.get('/config/exams', async (req, res) => {
  try {
    const doc = await db.collection('config').doc('exams').get();
    if (doc.exists) {
      const data = doc.data();
      return res.json({ success: true, visibility: data.visibility || {} });
    }
    return res.json({ success: true, visibility: {} });
  } catch (err) {
    console.error('[Admin Config Exams GET Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve exam visibility configuration' });
  }
});

// POST /api/admin/config/exams - Update exam visibility settings (admin only)
router.post('/config/exams', verifyAdmin, async (req, res) => {
  try {
    const { visibility } = req.body;
    if (!visibility || typeof visibility !== 'object') {
      return res.status(400).json({ error: 'Invalid visibility payload' });
    }

    await db.collection('config').doc('exams').set({
      visibility,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    await logStaffActivity(req, 'update_exams_config', { visibility });

    res.json({ success: true, visibility });
  } catch (err) {
    console.error('[Admin Config Exams POST Error]:', err.message);
    res.status(500).json({ error: 'Internal server error while updating exam visibility configuration' });
  }
});

// ── Upload Material Route ──

router.post('/upload-material', verifyStaffOrAdmin('syllabus'), upload.single('materialFile'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'PDF file is required' });
    const { type, title } = req.body;

    // Extract text from in-memory PDF buffer
    const extractedText = await extractTextFromPDF(req.file.buffer);

    // Upload PDF buffer to Firebase Storage
    const storageFileName = `materials/material-${Date.now()}.pdf`;
    const fileRef = bucket.file(storageFileName);
    await fileRef.save(req.file.buffer, {
      metadata: {
        contentType: 'application/pdf',
        originalName: req.file.originalname
      }
    });

    // Save metadata + extracted text to Firestore
    const matId = `mat_${Date.now()}`;
    const newMaterial = {
      id: matId,
      title: title || req.file.originalname,
      type: type || 'study',
      storagePath: storageFileName,
      extractedText,
      createdAt: new Date().toISOString()
    };

    await MATERIALS_COL.doc(matId).set(newMaterial);

    await logStaffActivity(req, 'upload_material', { title: newMaterial.title, type: newMaterial.type, id: matId });

    res.json({
      success: true,
      material: { id: matId, title: newMaterial.title, type: newMaterial.type }
    });
  } catch (err) {
    console.error('[Admin Upload Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to upload material' });
  }
});

// ── Get Materials List ──

router.get('/materials', verifyStaffOrAdmin('syllabus'), async (req, res) => {
  try {
    const snapshot = await MATERIALS_COL.get();
    const materials = snapshot.docs.map(doc => {
      const d = doc.data();
      return { id: d.id, title: d.title, type: d.type, storagePath: d.storagePath };
    });
    res.json(materials);
  } catch (err) {
    console.error('[Admin Materials Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

// ── Admin News Refresh Endpoint ──

router.post('/news/refresh', verifyStaffOrAdmin('news'), async (req, res) => {
  try {
    console.log('[Admin News Refresh] Scraping and translating fresh articles...');
    const { scrapeAllNews } = require('../services/newsScraper');
    const result = await scrapeAllNews();

    await logStaffActivity(req, 'refresh_news', { totalArticles: result.articles.length, lastUpdated: result.lastUpdated });

    res.json({
      success: true,
      lastUpdated: result.lastUpdated,
      totalArticles: result.articles.length
    });
  } catch (err) {
    console.error('[Admin News Refresh Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to refresh news' });
  }
});

// ── Admin News Upload/Paste Endpoint ──

router.post('/news/upload', verifyStaffOrAdmin('news'), async (req, res) => {
  try {
    const { articles } = req.body;
    if (!articles || !Array.isArray(articles)) {
      return res.status(400).json({ error: 'Articles array is required' });
    }

    const crypto = require('crypto');
    const timestamp = new Date().toISOString();
    const batch = db.batch();

    const cleanedArticles = articles.map((art, index) => {
      const category = art.category || 'general';
      const cleanTitle = art.title || `News Article ${index + 1}`;
      const docId = crypto.createHash('md5').update(art.url || cleanTitle).digest('hex');

      const cleanArt = {
        title: cleanTitle,
        title_hi: art.title_hi || cleanTitle,
        description: art.description || '',
        description_hi: art.description_hi || art.description || '',
        summary: art.summary || art.description || '',
        summary_hi: art.summary_hi || art.description_hi || art.description || '',
        source: art.source || 'Manual Upload',
        category: category,
        pubDate: art.pubDate || art.date || timestamp.split('T')[0],
        date: art.pubDate || art.date || timestamp.split('T')[0],
        url: art.url || '',
        examRelevance: true,
        icon: art.icon || (category === 'chhattisgarh' ? '🏔️' : '📰'),
        lang: art.lang || 'hi',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = db.collection('news_articles').doc(docId);
      batch.set(docRef, cleanArt, { merge: true });

      return cleanArt;
    });

    await batch.commit();
    console.log(`[Admin News Upload] Saved ${cleanedArticles.length} articles to firestore collection 'news_articles'`);

    // Regenerate cache compiled compilation
    const snap = await db.collection('news_articles').orderBy('createdAt', 'desc').limit(150).get();
    let allStored = snap.docs.map(doc => doc.data());

    // Sort in memory
    allStored.sort((a, b) => {
      const dateA = a.pubDate || a.date || '';
      const dateB = b.pubDate || b.date || '';
      if (dateA !== dateB) {
        return dateB.localeCompare(dateA);
      }
      const createA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime()) : 0;
      const createB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime()) : 0;
      return createB - createA;
    });

    const cacheArticles = allStored.slice(0, 50).map(art => ({
      ...art,
      date: art.date || art.pubDate || timestamp.split('T')[0],
      pubDate: art.pubDate || art.date || timestamp.split('T')[0]
    }));

    const cacheData = {
      lastUpdated: timestamp,
      articles: cacheArticles
    };

    await db.collection('news').doc('cache').set(cacheData);
    console.log('[Admin News Upload] Cache successfully updated in news/cache.');

    await logStaffActivity(req, 'upload_news', { totalArticles: cleanedArticles.length });

    res.json({ success: true, totalArticles: cleanedArticles.length });
  } catch (err) {
    console.error('[Admin News Upload Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to upload news articles.' });
  }
});


// Generate AI test and save to Firestore
router.post('/tests/generate', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { examId, examName, examIds, examNames, subject, mode, language, subjects, durationMinutes } = req.body;

    if (!examId || !examName) {
      return res.status(400).json({ error: 'examId and examName are required' });
    }

    const testMode = mode || 'quiz';
    const questionCount = testMode === 'mock' ? 25 : 5;
    const subjectName = subject || 'all';
    const lang = language || 'english';
    const examSubjects = subjects || [];

    console.log(`[Admin Test Gen] Generating ${testMode} (${questionCount} Qs) for ${examName} - ${subjectName}`);

    const result = await generateTest(examId, examName, subjectName, testMode, questionCount, lang, examSubjects);

    const timestamp = new Date().toISOString();
    const enrichedQuestions = result.questions.map((q, index) => {
      return {
        ...q,
        timestamp,
        subject: q.subject || subjectName || 'General Knowledge'
      };
    });

    const testId = `test_${Date.now()}`;
    const newTest = {
      id: testId,
      examId,
      examName,
      examIds: Array.isArray(examIds) ? examIds : [examId],
      examNames: Array.isArray(examNames) ? examNames : [examName],
      subject: subjectName,
      mode: testMode,
      language: lang,
      questions: enrichedQuestions,
      pattern: {
        totalQuestions: enrichedQuestions.length,
        totalMarks: enrichedQuestions.length,
        durationMinutes: parseInt(durationMinutes, 10) || (testMode === 'mock' ? 120 : 10),
        markingScheme: testMode === 'mock' ? '+1 for correct, -0.25 for incorrect' : '+1 for correct, 0 for incorrect'
      },
      createdAt: timestamp
    };

    await db.collection('tests').doc(testId).set(newTest);
    console.log(`[Admin Test Gen] Generated and saved test ${testId} ✅`);

    // Continuously save all generated questions to the 'questions' collection on the server
    const batch = db.batch();
    enrichedQuestions.forEach((q, index) => {
      const questionId = `q_${testId}_${index}`;
      const qRef = db.collection('questions').doc(questionId);
      batch.set(qRef, {
        id: questionId,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        subject: q.subject,
        timestamp: q.timestamp,
        examId,
        examName,
        examIds: Array.isArray(examIds) ? examIds : [examId],
        examNames: Array.isArray(examNames) ? examNames : [examName],
        testId,
        mode: testMode,
        language: lang
      });
    });
    await batch.commit();
    console.log(`[Admin Test Gen] Saved ${enrichedQuestions.length} individual questions to questions collection ✅`);

    await logStaffActivity(req, 'generate_test', { testId, examName, subject: subjectName, mode: testMode, language: lang });

    res.json({
      success: true,
      test: {
        id: testId,
        examId,
        examName,
        examIds: newTest.examIds,
        examNames: newTest.examNames,
        subject: subjectName,
        mode: testMode,
        language: lang,
        totalQuestions: enrichedQuestions.length,
        createdAt: newTest.createdAt
      }
    });
  } catch (err) {
    console.error('[Admin Test Generation Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to generate and save test questions.' });
  }
});

// Upload JSON test and save to Firestore
router.post('/tests/upload', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { examId, examName, examIds, examNames, subject, mode, language, pattern, questions } = req.body;

    if (!examId || !examName || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'examId, examName, and questions array are required' });
    }

    const testId = `test_${Date.now()}`;
    const timestamp = new Date().toISOString();

    const enrichedQuestions = questions.map((q, index) => {
      let questionId = '';
      if (q.id !== undefined && q.id !== null && q.id !== '') {
        questionId = String(q.id).trim();
      }
      if (!questionId) {
        questionId = `q_${testId}_${index}`;
      }

      return {
        id: questionId,
        question: q.question,
        options: q.options,
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || '',
        subject: q.subject || subject || 'General Knowledge',
        difficulty: q.difficulty || 'medium',
        weightage: q.weightage || 'medium',
        timestamp,
        qType: q.qType || 'standard',
        assertion: q.assertion || '',
        reason: q.reason || '',
        columnI: q.columnI || [],
        columnII: q.columnII || [],
        statements: q.statements || [],
        statementLabels: q.statementLabels || [],
        topic: q.topic || '',
        sourcePattern: q.sourcePattern || '',
        yearTrend: q.yearTrend || '',
        expectedIn2026: q.expectedIn2026 === true
      };
    });

    const testMode = mode || 'quiz';
    const testPattern = pattern || {
      totalQuestions: enrichedQuestions.length,
      totalMarks: enrichedQuestions.length,
      durationMinutes: testMode === 'mock' ? 120 : 10,
      markingScheme: testMode === 'mock' ? '+1 for correct, -0.25 for incorrect' : '+1 for correct, 0 for incorrect'
    };

    const newTest = {
      id: testId,
      examId,
      examName,
      examIds: Array.isArray(examIds) ? examIds : [examId],
      examNames: Array.isArray(examNames) ? examNames : [examName],
      subject: subject || 'General',
      mode: testMode,
      language: language || 'hindi',
      questions: enrichedQuestions,
      pattern: testPattern,
      createdAt: timestamp
    };

    await db.collection('tests').doc(testId).set(newTest);
    console.log(`[Admin Test Upload] Saved test ${testId} ✅`);

    // Save individual questions to questions collection
    const batch = db.batch();
    enrichedQuestions.forEach((q) => {
      const qRef = db.collection('questions').doc(q.id);
      batch.set(qRef, {
        id: q.id,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        subject: q.subject,
        difficulty: q.difficulty || 'medium',
        timestamp: q.timestamp,
        examId,
        examName,
        examIds: Array.isArray(examIds) ? examIds : [examId],
        examNames: Array.isArray(examNames) ? examNames : [examName],
        testId,
        mode: testMode,
        language: language || 'hindi',
        qType: q.qType || 'standard',
        assertion: q.assertion || '',
        reason: q.reason || '',
        columnI: q.columnI || [],
        columnII: q.columnII || [],
        statements: q.statements || [],
        statementLabels: q.statementLabels || [],
        topic: q.topic || '',
        sourcePattern: q.sourcePattern || '',
        yearTrend: q.yearTrend || '',
        expectedIn2026: q.expectedIn2026 === true
      });
    });
    await batch.commit();
    console.log(`[Admin Test Upload] Saved ${enrichedQuestions.length} individual questions to questions collection ✅`);

    await logStaffActivity(req, 'upload_test', { testId, examName, subject: newTest.subject, mode: testMode, language: newTest.language });

    res.json({
      success: true,
      test: {
        id: testId,
        examId,
        examName,
        examIds: newTest.examIds,
        examNames: newTest.examNames,
        subject: newTest.subject,
        mode: testMode,
        language: newTest.language,
        totalQuestions: enrichedQuestions.length,
        pattern: testPattern,
        createdAt: newTest.createdAt
      }
    });
  } catch (err) {
    console.error('[Admin Test Upload Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to upload test.' });
  }
});

// Upload JSON questions directly to the global Question Bank
router.post('/questions/pool/upload', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { questions, examIds } = req.body;

    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'questions array is required' });
    }

    const timestamp = new Date().toISOString();

    const normalizedQuestions = questions.map((q, index) => {
      const normQ = normalizeQuestion(q);
      let questionId = normQ.id || normQ.qId || '';
      if (!questionId) {
        questionId = `q_pool_${Date.now()}_${index}`;
      }

      // Merge examTags from question and selected examIds
      const qExamTags = Array.isArray(normQ.examTags) ? normQ.examTags : [];
      const inputExamIds = Array.isArray(examIds) ? examIds : [];
      const tagsSet = new Set([...qExamTags, ...inputExamIds]);
      const mergedExamTags = Array.from(tagsSet).filter(Boolean);

      return {
        id: questionId,
        question: normQ.question,
        options: normQ.options,
        correctIndex: normQ.correctIndex,
        explanation: normQ.explanation || '',
        subject: normQ.subject || 'General Knowledge',
        difficulty: normQ.difficulty || 'medium',
        weightage: normQ.weightage || 'medium',
        timestamp,
        qType: normQ.qType || 'standard',
        assertion: normQ.assertion || '',
        reason: normQ.reason || '',
        columnI: normQ.columnI || [],
        columnII: normQ.columnII || [],
        statements: normQ.statements || [],
        statementLabels: normQ.statementLabels || [],
        topic: normQ.topic || '',
        subtopic: normQ.subtopic || '',
        sourcePattern: normQ.sourcePattern || '',
        yearTrend: normQ.yearTrend || '',
        expectedIn2026: normQ.expectedIn2026 === true,
        examTags: mergedExamTags,
        isVerified: normQ.isVerified === true,
        isPYQ: normQ.isPYQ === true,
        pyqYear: normQ.pyqYear || null
      };
    });

    // Write to Firestore in batches of 500
    const BATCH_SIZE = 500;
    let successCount = 0;

    for (let i = 0; i < normalizedQuestions.length; i += BATCH_SIZE) {
      const chunk = normalizedQuestions.slice(i, i + BATCH_SIZE);
      const batch = db.batch();

      chunk.forEach((q) => {
        const qRef = db.collection('question_bank').doc(q.id);
        batch.set(qRef, q);
      });

      await batch.commit();
      successCount += chunk.length;
    }

    console.log(`[Admin Pool Upload] Saved ${successCount} questions to question_bank ✅`);
    await logStaffActivity(req, 'upload_question_pool', { count: successCount });

    res.json({
      success: true,
      message: `Successfully uploaded ${successCount} questions to the global Question Bank.`
    });
  } catch (err) {
    console.error('[Admin Pool Upload Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to upload questions to the pool.' });
  }
});

// Get stats from the Question Bank
router.get('/questions/pool/stats', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const snapshot = await db.collection('question_bank').get();
    let totalCount = snapshot.size;

    const subjects = {};
    const exams = {};

    snapshot.docs.forEach(doc => {
      const q = doc.data();
      const sub = q.subject || 'General Knowledge';
      subjects[sub] = (subjects[sub] || 0) + 1;

      if (Array.isArray(q.examTags)) {
        q.examTags.forEach(tag => {
          exams[tag] = (exams[tag] || 0) + 1;
        });
      }
    });

    res.json({
      totalCount,
      subjects,
      exams
    });
  } catch (err) {
    console.error('[Admin Pool Stats Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve question bank stats.' });
  }
});

// Generate a test from the global Question Bank pool
router.post('/tests/generate-from-pool', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { examId, examName, examIds, examNames, subject, mode, language, questionCount, durationMinutes } = req.body;

    if (!examId || !examName) {
      return res.status(400).json({ error: 'examId and examName are required' });
    }

    const count = parseInt(questionCount, 10) || 10;
    const testMode = mode || 'quiz';
    const selectedSubject = subject || 'all';

    const targetExamIds = Array.isArray(examIds) && examIds.length > 0 ? examIds : [examId];
    const limitedExamIds = targetExamIds.slice(0, 10);

    // 1. Fetch questions matching target exams
    let examQuestions = [];
    try {
      const examSnapshot = await db.collection('question_bank')
        .where('examTags', 'array-contains-any', limitedExamIds)
        .get();
      examQuestions = examSnapshot.docs.map(doc => doc.data());
    } catch (e) {
      console.warn('[Generate from Pool] Firestore array-contains-any query failed or no matches:', e.message);
    }

    // Helper to parse subject list
    const getSubjectList = (subVal) => {
      if (!subVal) return [];
      if (Array.isArray(subVal)) {
        return subVal.map(s => String(s).toLowerCase().trim()).filter(Boolean);
      }
      if (typeof subVal === 'string') {
        return subVal.split(',').map(s => s.toLowerCase().trim()).filter(Boolean);
      }
      return [String(subVal).toLowerCase().trim()];
    };

    const targetSubjects = getSubjectList(selectedSubject);
    const hasSubjectFilter = targetSubjects.length > 0 && !targetSubjects.includes('all') && !targetSubjects.includes('mixed');

    // 2. Filter matching exams by target subject
    let primaryMatches = examQuestions;
    if (hasSubjectFilter) {
      primaryMatches = examQuestions.filter(q => targetSubjects.includes((q.subject || '').toLowerCase().trim()));
    }

    let finalQuestions = [...primaryMatches];

    // Helper to shuffle array in-place
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Shuffle primary matches
    shuffle(finalQuestions);

    // 3. Fallback level 1: Same subject across other exams (if subject is not all/mixed)
    if (finalQuestions.length < count && hasSubjectFilter) {
      const globalSnapshot = await db.collection('question_bank').limit(1000).get();
      const globalQuestions = globalSnapshot.docs.map(doc => doc.data());

      let otherExamsSubjectMatches = globalQuestions.filter(q => 
        targetSubjects.includes((q.subject || '').toLowerCase().trim()) &&
        !finalQuestions.some(fq => fq.id === q.id)
      );

      shuffle(otherExamsSubjectMatches);
      const toAdd = otherExamsSubjectMatches.slice(0, count - finalQuestions.length);
      finalQuestions = [...finalQuestions, ...toAdd];
    }

    // 4. Fallback level 2: Other subjects within the target exams
    if (finalQuestions.length < count) {
      let otherSubjectsInExams = examQuestions.filter(q => 
        !finalQuestions.some(fq => fq.id === q.id)
      );

      shuffle(otherSubjectsInExams);
      const toAdd = otherSubjectsInExams.slice(0, count - finalQuestions.length);
      finalQuestions = [...finalQuestions, ...toAdd];
    }

    // 5. Fallback level 3: Any other questions in the global pool
    if (finalQuestions.length < count) {
      const globalSnapshot = await db.collection('question_bank').limit(1000).get();
      const globalQuestions = globalSnapshot.docs.map(doc => doc.data());

      let globalOthers = globalQuestions.filter(q => 
        !finalQuestions.some(fq => fq.id === q.id)
      );

      shuffle(globalOthers);
      const toAdd = globalOthers.slice(0, count - finalQuestions.length);
      finalQuestions = [...finalQuestions, ...toAdd];
    }

    if (finalQuestions.length === 0) {
      return res.status(400).json({ 
        error: `No questions found in the Question Bank matching Exam: "${examName}" and Subject: "${selectedSubject}".` 
      });
    }

    // Select the requested number
    const selectedQuestions = finalQuestions.slice(0, count);

    const testId = `test_pool_${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Re-assign IDs and format for individual test consumption
    const enrichedQuestions = selectedQuestions.map((q, index) => {
      const newQId = `q_${testId}_${index}`;
      
      let directive = q.question || '';
      let formattedQuestion = directive;
      if (q.qType === 'assertion_reason') {
        const dir = directive || 'नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-';
        formattedQuestion = `${dir}\n\n**कथन [As] :** ${q.assertion || ''}\n\n**कारण [R] :** ${q.reason || ''}`;
      } else if (q.qType === 'match_column') {
        const dir = directive || 'निम्नलिखित को सुमेलित कीजिए-';
        let md = `${dir}\n\n| कॉलम-I | कॉलम-II |\n| :--- | :--- |\n`;
        const colI = q.columnI || [];
        const colII = q.columnII || [];
        const maxLen = Math.max(colI.length, colII.length);
        for (let idx = 0; idx < maxLen; idx++) {
          if (colI[idx] || colII[idx]) {
            md += `| ${colI[idx] || ''} | ${colII[idx] || ''} |\n`;
          }
        }
        formattedQuestion = md;
      } else if (q.qType === 'ordering' || q.qType === 'multi_statement') {
        const dir = directive || '';
        let md = `${dir}\n\n`;
        const stmts = q.statements || [];
        const labels = q.statementLabels || [];
        for (let idx = 0; idx < stmts.length; idx++) {
          if (stmts[idx]) {
            const label = labels[idx] ? `(${labels[idx]})` : `(${idx + 1})`;
            md += `${label} ${stmts[idx]}\n`;
          }
        }
        formattedQuestion = md.trim();
      }

      return {
        ...q,
        id: newQId,
        question: formattedQuestion,
        timestamp
      };
    });

    const testPattern = {
      totalQuestions: enrichedQuestions.length,
      totalMarks: enrichedQuestions.length,
      durationMinutes: parseInt(durationMinutes, 10) || (testMode === 'mock' ? 120 : 10),
      markingScheme: testMode === 'mock' ? '+1 for correct, -0.25 for incorrect' : '+1 for correct, 0 for incorrect'
    };

    const newTest = {
      id: testId,
      examId,
      examName,
      examIds: Array.isArray(examIds) ? examIds : [examId],
      examNames: Array.isArray(examNames) ? examNames : [examName],
      subject: hasSubjectFilter
        ? (Array.isArray(selectedSubject) ? selectedSubject.join(', ') : selectedSubject)
        : 'Mixed Subjects',
      mode: testMode,
      language: language || 'hindi',
      questions: enrichedQuestions,
      pattern: testPattern,
      createdAt: timestamp,
      generatedFromPool: true
    };

    // Save test to tests collection
    await db.collection('tests').doc(testId).set(newTest);

    // Save individual questions to questions collection
    const batch = db.batch();
    enrichedQuestions.forEach((q) => {
      const qRef = db.collection('questions').doc(q.id);
      batch.set(qRef, {
        id: q.id,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        subject: q.subject,
        difficulty: q.difficulty || 'medium',
        timestamp: q.timestamp,
        examId,
        examName,
        examIds: Array.isArray(examIds) ? examIds : [examId],
        examNames: Array.isArray(examNames) ? examNames : [examName],
        testId,
        mode: testMode,
        language: language || 'hindi',
        qType: q.qType || 'standard',
        assertion: q.assertion || '',
        reason: q.reason || '',
        columnI: q.columnI || [],
        columnII: q.columnII || [],
        statements: q.statements || [],
        statementLabels: q.statementLabels || [],
        topic: q.topic || '',
        sourcePattern: q.sourcePattern || '',
        yearTrend: q.yearTrend || '',
        expectedIn2026: q.expectedIn2026 === true
      });
    });
    await batch.commit();

    console.log(`[Admin Test Pool Gen] Generated test ${testId} with ${enrichedQuestions.length} questions ✅`);
    await logStaffActivity(req, 'generate_test_from_pool', { testId, examName, count: enrichedQuestions.length });

    res.json({
      success: true,
      test: {
        id: testId,
        examId,
        examName,
        examIds: newTest.examIds,
        examNames: newTest.examNames,
        subject: newTest.subject,
        mode: testMode,
        language: newTest.language,
        totalQuestions: enrichedQuestions.length,
        pattern: testPattern,
        createdAt: newTest.createdAt
      }
    });
  } catch (err) {
    console.error('[Admin Test Pool Gen Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to generate test from the pool.' });
  }
});

// List all generated tests
router.get('/tests', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const snapshot = await db.collection('tests').orderBy('createdAt', 'desc').get();
    const tests = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: d.id,
        examId: d.examId,
        examName: d.examName,
        examIds: d.examIds || (d.examId ? [d.examId] : []),
        examNames: d.examNames || (d.examName ? [d.examName] : []),
        subject: d.subject,
        mode: d.mode,
        language: d.language,
        totalQuestions: d.questions ? d.questions.length : 0,
        pattern: d.pattern || null,
        createdAt: d.createdAt
      };
    });
    res.json(tests);
  } catch (err) {
    console.error('[Admin Get Tests Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve generated tests.' });
  }
});

// Delete a generated test
router.delete('/tests/:id', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('tests').doc(id).delete();
    console.log(`[Admin Test Delete] Deleted test ${id} ✅`);

    await logStaffActivity(req, 'delete_test', { testId: id });

    res.json({ success: true, message: 'Test deleted successfully' });
  } catch (err) {
    console.error('[Admin Delete Test Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete test.' });
  }
});

// Edit a generated test (questions, metadata, options, explanation)
router.put('/tests/:id', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { id } = req.params;
    const { examId, examName, examIds, examNames, subject, mode, language, pattern, questions } = req.body;

    if (!examId || !examName || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'examId, examName, and questions array are required' });
    }

    const testRef = db.collection('tests').doc(id);
    const doc = await testRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Test not found' });
    }

    const timestamp = new Date().toISOString();
    
    // Enrich questions
    const enrichedQuestions = questions.map((q, index) => {
      let questionId = '';
      if (q.id !== undefined && q.id !== null && q.id !== '') {
        questionId = String(q.id).trim();
      }
      if (!questionId) {
        questionId = `q_${id}_${index}`;
      }

      return {
        id: questionId,
        question: q.question,
        options: q.options,
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || '',
        subject: q.subject || subject || 'General Knowledge',
        difficulty: q.difficulty || 'medium',
        weightage: q.weightage || 'medium',
        timestamp: q.timestamp || timestamp,
        qType: q.qType || 'standard',
        assertion: q.assertion || '',
        reason: q.reason || '',
        columnI: q.columnI || [],
        columnII: q.columnII || [],
        statements: q.statements || [],
        statementLabels: q.statementLabels || [],
        topic: q.topic || '',
        sourcePattern: q.sourcePattern || '',
        yearTrend: q.yearTrend || '',
        expectedIn2026: q.expectedIn2026 === true
      };
    });

    const testMode = mode || doc.data().mode || 'quiz';
    const testPattern = pattern || doc.data().pattern || {
      totalQuestions: enrichedQuestions.length,
      totalMarks: enrichedQuestions.length,
      durationMinutes: testMode === 'mock' ? 120 : 10,
      markingScheme: testMode === 'mock' ? '+1 for correct, -0.25 for incorrect' : '+1 for correct, 0 for incorrect'
    };

    const updatedTest = {
      ...doc.data(),
      examId,
      examName,
      examIds: Array.isArray(examIds) ? examIds : [examId],
      examNames: Array.isArray(examNames) ? examNames : [examName],
      subject: subject || 'General',
      mode: testMode,
      language: language || 'hindi',
      questions: enrichedQuestions,
      pattern: testPattern,
      updatedAt: timestamp
    };

    // Update in Firestore tests collection
    await testRef.set(updatedTest);
    console.log(`[Admin Test Update] Updated test ${id} ✅`);

    // Write updated questions to questions collection
    const batch = db.batch();
    enrichedQuestions.forEach((q) => {
      const qRef = db.collection('questions').doc(q.id);
      batch.set(qRef, {
        id: q.id,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        subject: q.subject,
        difficulty: q.difficulty || 'medium',
        timestamp: q.timestamp || timestamp,
        examId,
        examName,
        examIds: updatedTest.examIds,
        examNames: updatedTest.examNames,
        testId: id,
        mode: testMode,
        language: language || 'hindi',
        qType: q.qType || 'standard',
        assertion: q.assertion || '',
        reason: q.reason || '',
        columnI: q.columnI || [],
        columnII: q.columnII || [],
        statements: q.statements || [],
        statementLabels: q.statementLabels || [],
        topic: q.topic || '',
        sourcePattern: q.sourcePattern || '',
        yearTrend: q.yearTrend || '',
        expectedIn2026: q.expectedIn2026 === true
      }, { merge: true });
    });
    await batch.commit();
    console.log(`[Admin Test Update] Updated individual questions in questions collection ✅`);

    await logStaffActivity(req, 'edit_test', { testId: id, examName, subject, mode, language });

    res.json({ success: true, message: 'Test updated successfully' });
  } catch (err) {
    console.error('[Admin Update Test Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to update test.' });
  }
});

// GET /api/admin/users - Retrieves all user profiles
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    // 1. List all users from Firebase Auth
    const listUsersResult = await authAdmin.listUsers(1000);
    const authUsers = listUsersResult.users;

    // 2. Fetch all user documents from Firestore
    const snapshot = await db.collection('users').get();
    const firestoreUsersMap = {};
    snapshot.forEach(doc => {
      firestoreUsersMap[doc.id] = doc.data();
    });

    // 3. Merge Auth details with Firestore metrics
    const users = authUsers.map(user => {
      const fDoc = firestoreUsersMap[user.uid] || {};
      
      const email = user.email || '';
      const displayId = email.endsWith('@studyworld.app') ? email.split('@')[0] : email;

      return {
        uid: user.uid,
        email: email,
        displayId: displayId,
        displayName: user.displayName || displayId,
        createdAt: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
        isAdmin: !!(user.customClaims && user.customClaims.admin),
        isStaff: !!(user.customClaims && user.customClaims.staff),
        roles: (user.customClaims && user.customClaims.roles) || [],
        disabled: user.disabled || false,
        mobile: fDoc.mobile || '',
        username: fDoc.username || '',
        points: fDoc.points !== undefined ? fDoc.points : 120, // default match client initial
        streak: fDoc.streak?.count || 0,
        mcqsSolved: fDoc.mcqsSolved !== undefined ? fDoc.mcqsSolved : 25, // default match client initial
        testResultsCount: Array.isArray(fDoc.testResults) ? fDoc.testResults.length : 0,
        isPaid: fDoc.isPaid === true || fDoc.plan === 'paid',
        plan: fDoc.plan || (fDoc.isPaid === true ? 'paid' : 'free')
      };
    });

    res.json(users);
  } catch (err) {
    console.error('[Admin Get Users Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve registered users list.' });
  }
});

// POST /api/admin/users/:uid/tier - Toggles or sets user tier (paid/free)
router.post('/users/:uid/tier', verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;
    const { isPaid, plan } = req.body;

    if (isPaid === undefined && plan === undefined) {
      return res.status(400).json({ error: 'Tier status fields (isPaid or plan) are required' });
    }

    const updates = {};
    if (isPaid !== undefined) {
      updates.isPaid = !!isPaid;
    }
    if (plan !== undefined) {
      updates.plan = plan === 'paid' ? 'paid' : 'free';
      updates.isPaid = updates.plan === 'paid';
    } else if (isPaid !== undefined) {
      updates.plan = isPaid ? 'paid' : 'free';
    }

    updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();

    await db.collection('users').doc(uid).set(updates, { merge: true });
    console.log(`[Admin User Tier Update] Updated user ${uid} tier to ${updates.plan} ✅`);
    res.json({ success: true, uid, plan: updates.plan, isPaid: updates.isPaid });
  } catch (err) {
    console.error('[Admin Update User Tier Error]:', err.message);
    res.status(500).json({ error: 'Failed to update user tier status.' });
  }
});

// POST /api/admin/users/:uid/status - Block or activate a user account
router.post('/users/:uid/status', verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;
    const { disabled } = req.body;

    if (disabled === undefined) {
      return res.status(400).json({ error: 'disabled status field (boolean) is required' });
    }

    // 1. Update in Firebase Authentication
    await authAdmin.updateUser(uid, { disabled: !!disabled });

    // 2. Sync to Firestore user document
    await db.collection('users').doc(uid).set({ 
      disabled: !!disabled,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log(`[Admin User Status Update] Set user ${uid} disabled status to ${!!disabled} ✅`);
    res.json({ success: true, uid, disabled: !!disabled });
  } catch (err) {
    console.error('[Admin Update User Status Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to update user status.' });
  }
});

// POST /api/admin/users/:uid/email - Admin updates user email directly
router.post('/users/:uid/email', verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'New email address is required' });
    }

    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Invalid email address format' });
    }

    // 1. Update in Firebase Authentication
    await authAdmin.updateUser(uid, { email: trimmedEmail });

    // 2. Sync to Firestore user document
    await db.collection('users').doc(uid).set({ 
      email: trimmedEmail,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    // 3. Log staff/admin activity
    await logStaffActivity(req, 'admin_update_user_email', { targetUid: uid, newEmail: trimmedEmail });

    console.log(`[Admin User Email Update] Set user ${uid} email to ${trimmedEmail} ✅`);
    res.json({ success: true, uid, email: trimmedEmail });
  } catch (err) {
    console.error('[Admin Update User Email Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to update user email address.' });
  }
});

// DELETE /api/admin/users/:uid - Permanently deletes a user account
router.delete('/users/:uid', verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;

    // 1. Delete from Firebase Authentication
    try {
      await authAdmin.deleteUser(uid);
    } catch (authErr) {
      if (authErr.code === 'auth/user-not-found') {
        console.warn(`[Admin User Delete Warning] User ${uid} not found in Firebase Auth during deletion.`);
      } else {
        throw authErr;
      }
    }

    // 2. Delete from Firestore users collection
    await db.collection('users').doc(uid).delete();

    console.log(`[Admin User Delete] Deleted user account ${uid} permanently ✅`);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('[Admin Delete User Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to delete user account.' });
  }
});

// POST /api/admin/syllabus/save - Save or update a syllabus configuration in Firestore
router.post('/syllabus/save', verifyStaffOrAdmin('syllabus'), async (req, res) => {
  try {
    const exam = req.body;
    if (!exam || !exam.id || !exam.name) {
      return res.status(400).json({ error: 'Invalid syllabus payload. id and name are required.' });
    }

    // Save to firestore collection 'syllabi'
    await db.collection('syllabi').doc(exam.id).set({
      ...exam,
      updatedAt: new Date().toISOString()
    });

    console.log(`[Admin Syllabus Save] Saved/updated syllabus config ${exam.id} ✅`);

    await logStaffActivity(req, 'save_syllabus', { id: exam.id, name: exam.name });

    res.json({ success: true, exam });
  } catch (err) {
    console.error('[Admin Syllabus Save Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to save syllabus configuration.' });
  }
});

// DELETE /api/admin/syllabus/:id - Delete a custom syllabus configuration from Firestore
router.delete('/syllabus/:id', verifyStaffOrAdmin('syllabus'), async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('syllabi').doc(id).delete();
    console.log(`[Admin Syllabus Delete] Deleted custom syllabus ${id} ✅`);

    await logStaffActivity(req, 'delete_syllabus', { id });

    res.json({ success: true, message: 'Custom syllabus deleted successfully.' });
  } catch (err) {
    console.error('[Admin Delete Syllabus Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete custom syllabus.' });
  }
});

// ── Staff Management Routes (verifyAdmin-only) ──

// GET /api/admin/staffs - Lists all staff accounts
router.get('/staffs', verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('staffs').orderBy('createdAt', 'desc').get();
    const staffs = snapshot.docs.map(doc => doc.data());
    res.json(staffs);
  } catch (err) {
    console.error('[Admin Get Staffs Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve staff accounts.' });
  }
});

// POST /api/admin/staff/generate - Generates a new staff account
router.post('/staff/generate', verifyAdmin, async (req, res) => {
  try {
    const { staffId, password, roles } = req.body;

    if (!staffId || !password || !Array.isArray(roles)) {
      return res.status(400).json({ error: 'staffId, password, and roles (array) are required' });
    }

    const trimmedId = staffId.trim();
    if (!trimmedId) {
      return res.status(400).json({ error: 'staffId cannot be empty' });
    }

    const email = `${trimmedId.toLowerCase()}@studyworld.app`;

    // 1. Create user in Firebase Auth
    const userRecord = await authAdmin.createUser({
      email,
      password,
      displayName: trimmedId,
    });

    // 2. Set Custom Claims: staff: true, roles
    await authAdmin.setCustomUserClaims(userRecord.uid, {
      staff: true,
      roles
    });

    // 3. Save to Firestore 'staffs' collection
    const staffDoc = {
      uid: userRecord.uid,
      staffId: trimmedId,
      email,
      roles,
      createdAt: new Date().toISOString()
    };

    await db.collection('staffs').doc(userRecord.uid).set(staffDoc);

    console.log(`[Admin Staff Generate] Generated staff ${trimmedId} (${userRecord.uid}) ✅`);
    res.json({ success: true, staff: staffDoc });
  } catch (err) {
    console.error('[Admin Staff Generate Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to generate staff account.' });
  }
});

// PUT /api/admin/staffs/:uid/roles - Updates roles for a staff member
router.put('/staffs/:uid/roles', verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;
    const { roles } = req.body;

    if (!Array.isArray(roles)) {
      return res.status(400).json({ error: 'roles (array) is required' });
    }

    // 1. Check if staff exists in Firestore
    const staffRef = db.collection('staffs').doc(uid);
    const staffDoc = await staffRef.get();
    if (!staffDoc.exists) {
      return res.status(404).json({ error: 'Staff account not found' });
    }

    // 2. Update claims in Firebase Auth
    await authAdmin.setCustomUserClaims(uid, {
      staff: true,
      roles
    });

    // 3. Update document in Firestore
    await staffRef.update({
      roles,
      updatedAt: new Date().toISOString()
    });

    console.log(`[Admin Staff Roles Update] Updated roles for staff UID ${uid} to: ${roles.join(', ')} ✅`);
    res.json({ success: true, uid, roles });
  } catch (err) {
    console.error('[Admin Staff Roles Update Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to update staff roles.' });
  }
});

// DELETE /api/admin/staffs/:uid - Revokes staff status (demotes staff)
router.delete('/staffs/:uid', verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;

    // 1. Reset Custom Claims in Firebase Auth (remove staff: true)
    try {
      await authAdmin.setCustomUserClaims(uid, {});
    } catch (authErr) {
      if (authErr.code === 'auth/user-not-found') {
        console.warn(`[Admin Staff Revoke Warning] User ${uid} not found in Firebase Auth during claim revocation. Proceeding to delete Firestore record.`);
      } else {
        throw authErr;
      }
    }

    // 2. Delete from Firestore staffs collection
    await db.collection('staffs').doc(uid).delete();

    // 3. Log staff revocation activity
    await logStaffActivity(req, 'revoke_staff_status', { uid });

    console.log(`[Admin Staff Revoke] Revoked staff status for UID ${uid} ✅`);
    res.json({ success: true, message: 'Staff status revoked successfully.' });
  } catch (err) {
    console.error('[Admin Staff Revoke Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to revoke staff status.' });
  }
});

// POST /api/admin/users/:uid/promote - Converts a student user into a staff member
router.post('/users/:uid/promote', verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;
    const { roles } = req.body;

    if (!Array.isArray(roles)) {
      return res.status(400).json({ error: 'roles (array) is required' });
    }

    // 1. Fetch user from Firebase Auth
    const userRecord = await authAdmin.getUser(uid);
    const email = userRecord.email || '';
    const displayId = email.endsWith('@studyworld.app') ? email.split('@')[0] : email;

    // 2. Set Custom Claims: staff: true, roles
    await authAdmin.setCustomUserClaims(uid, {
      staff: true,
      roles
    });

    // 3. Create staff profile in Firestore 'staffs' collection
    const staffDoc = {
      uid,
      staffId: userRecord.displayName || displayId,
      email,
      roles,
      createdAt: new Date().toISOString()
    };

    await db.collection('staffs').doc(uid).set(staffDoc);

    // 4. Log staff conversion activity
    await logStaffActivity(req, 'promote_user_to_staff', { uid, email, roles });

    console.log(`[Admin User Promote] Promoted user ${uid} to staff with roles: ${roles.join(', ')} ✅`);
    res.json({ success: true, uid, roles });
  } catch (err) {
    console.error('[Admin Promote User Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to promote user to staff.' });
  }
});

// GET /api/admin/logs/user - Retrieves user activity logs
router.get('/logs/user', verifyAdmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1000;
    
    // 1. Fetch from activity_logs
    const activitySnapshot = await db.collection('activity_logs').orderBy('timestamp', 'desc').limit(limit).get();
    
    // 2. Fetch from mcq_attempts
    const mcqSnapshot = await db.collection('mcq_attempts').orderBy('timestamp', 'desc').limit(limit).get();

    // 3. Fetch all users from Firebase Auth to map uid to readable userID/email prefix
    const listUsersResult = await authAdmin.listUsers(1000);
    const authUsers = listUsersResult.users;
    
    // Fetch all user docs to map userId to display name
    const usersSnapshot = await db.collection('users').get();
    const firestoreUsersMap = {};
    usersSnapshot.forEach(doc => {
      firestoreUsersMap[doc.id] = doc.data();
    });

    const userMap = {};
    authUsers.forEach(user => {
      const fDoc = firestoreUsersMap[user.uid] || {};
      const email = user.email || '';
      const displayId = email.endsWith('@studyworld.app') ? email.split('@')[0] : email;
      userMap[user.uid] = {
        displayName: user.displayName || fDoc.displayName || displayId,
        displayId: displayId
      };
    });

    const combinedLogs = [];

    // Map activity logs
    activitySnapshot.forEach(doc => {
      const d = doc.data();
      const ts = d.timestamp;
      const formattedTimestamp = ts?.toDate ? ts.toDate().toISOString() : (ts || new Date().toISOString());
      const userInfo = userMap[d.userId] || { displayName: d.userId, displayId: d.userId };
      
      combinedLogs.push({
        id: doc.id,
        userId: d.userId,
        userName: userInfo.displayName,
        userDisplayId: userInfo.displayId,
        examId: d.examId || 'general',
        activityType: d.activityType,
        subjectId: d.subjectId || 'general',
        topicId: d.topicId || 'general',
        timeSpentSeconds: d.timeSpentSeconds || 0,
        timestamp: formattedTimestamp
      });
    });

    // Map MCQ attempts
    mcqSnapshot.forEach(doc => {
      const d = doc.data();
      const ts = d.timestamp;
      const formattedTimestamp = ts?.toDate ? ts.toDate().toISOString() : (ts || new Date().toISOString());
      const userInfo = userMap[d.userId] || { displayName: d.userId, displayId: d.userId };
      
      combinedLogs.push({
        id: doc.id,
        userId: d.userId,
        userName: userInfo.displayName,
        userDisplayId: userInfo.displayId,
        examId: d.examId || 'general',
        activityType: 'mcq_attempt',
        subjectId: d.subjectId || 'general',
        topicId: d.topicId || 'general',
        timeSpentSeconds: d.responseTimeMs ? Math.round(d.responseTimeMs / 1000) : 0,
        timestamp: formattedTimestamp
      });
    });

    // Sort combined logs by timestamp desc
    combinedLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Slice to match limit
    res.json(combinedLogs.slice(0, limit));
  } catch (err) {
    console.error('[Admin Get User Logs Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve user activity logs.' });
  }
});

// GET /api/admin/logs/staff - Retrieves staff action logs
router.get('/logs/staff', verifyAdmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const snapshot = await db.collection('staff_logs').orderBy('timestamp', 'desc').limit(limit).get();
    const logs = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        uid: d.uid,
        staffId: d.staffId,
        email: d.email,
        actorType: d.actorType || 'staff',
        action: d.action,
        details: d.details || {},
        timestamp: d.timestamp
      };
    });
    res.json(logs);
  } catch (err) {
    console.error('[Admin Get Staff Logs Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve staff activity logs.' });
  }
});

// GET /api/admin/feedbacks - Retrieve all user feedbacks (admin only)
router.get('/feedbacks', verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('feedbacks').orderBy('createdAt', 'desc').get();
    const feedbacks = snapshot.docs.map(doc => doc.data());
    res.json(feedbacks);
  } catch (err) {
    console.error('[Admin Feedbacks GET] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve feedbacks.' });
  }
});

// DELETE /api/admin/feedbacks/:id - Delete a user feedback entry (admin only)
router.delete('/feedbacks/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('feedbacks').doc(id).delete();
    console.log(`[Admin Feedback Delete] Deleted feedback ${id} ✅`);
    res.json({ success: true, message: 'Feedback deleted successfully' });
  } catch (err) {
    console.error('[Admin Feedback Delete] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete feedback.' });
  }
});

// GET /api/admin/reports - Retrieve all reported questions (admin only)
router.get('/reports', verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('reported_questions').orderBy('createdAt', 'desc').get();
    const reports = snapshot.docs.map(doc => doc.data());
    res.json(reports);
  } catch (err) {
    console.error('[Admin Reports GET] Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve reported questions.' });
  }
});

// DELETE /api/admin/reports/:id - Delete a reported question entry (admin only)
router.delete('/reports/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('reported_questions').doc(id).delete();
    console.log(`[Admin Report Delete] Deleted reported question ${id} ✅`);
    res.json({ success: true, message: 'Report deleted successfully' });
  } catch (err) {
    console.error('[Admin Report Delete] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete report.' });
  }
});

// POST /api/admin/badges - Add a new badge (admin only)
router.post('/badges', verifyAdmin, async (req, res) => {
  try {
    const { name, desc, criteriaType, criteriaValue, icon, emoji, color } = req.body;

    if (!name || !desc || !criteriaType || criteriaValue === undefined || !icon || !emoji || !color) {
      return res.status(400).json({ error: 'All badge fields are required: name, desc, criteriaType, criteriaValue, icon, emoji, color' });
    }

    const validCriteriaTypes = ['streak', 'tests', 'mcqs', 'xp', 'accuracy'];
    if (!validCriteriaTypes.includes(criteriaType)) {
      return res.status(400).json({ error: `Invalid criteriaType. Must be one of: ${validCriteriaTypes.join(', ')}` });
    }

    const valueNum = Number(criteriaValue);
    if (isNaN(valueNum) || valueNum < 0) {
      return res.status(400).json({ error: 'criteriaValue must be a non-negative number' });
    }

    const badgeId = `badge_${Date.now()}`;
    const newBadge = {
      id: badgeId,
      name: name.trim().slice(0, 100),
      desc: desc.trim().slice(0, 200),
      criteriaType,
      criteriaValue: valueNum,
      icon: icon.trim().slice(0, 50),
      emoji: emoji.trim().slice(0, 10),
      color: color.trim().slice(0, 200),
      createdAt: new Date().toISOString()
    };

    await db.collection('badges').doc(badgeId).set(newBadge);
    console.log(`[Admin Badge Create] Created badge ${badgeId} ✅`);

    await logStaffActivity(req, 'create_badge', { id: badgeId, name: newBadge.name });

    res.json({ success: true, badge: newBadge });
  } catch (err) {
    console.error('[Admin Badge Create Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to create badge.' });
  }
});

// DELETE /api/admin/badges/:id - Delete a badge (admin only)
router.delete('/badges/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('badges').doc(id).delete();
    console.log(`[Admin Badge Delete] Deleted badge ${id} ✅`);

    await logStaffActivity(req, 'delete_badge', { id });

    res.json({ success: true, message: 'Badge deleted successfully' });
  } catch (err) {
    console.error('[Admin Badge Delete Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete badge.' });
  }
});

module.exports = router;

