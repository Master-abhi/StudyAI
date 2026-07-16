const express = require('express');
const router = express.Router();
const multer = require('multer');
const { admin, db, bucket, authAdmin } = require('../firebase-admin');
const { verifyAdmin, verifyStaffOrAdmin } = require('../middleware/verifyFirebaseToken');
const { extractTextFromPDF } = require('../services/syllabusParser');
const { getActiveAI, setActiveAI, getGeminiConfig, updateAIConfig, generateTest, summarizeNews, translateAndSummarizeNews, generateNewsIntelligence } = require('../services/aiManager');

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

const logoUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
  },
  limits: { fileSize: 3 * 1024 * 1024 } // 3MB limit
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
    const doc = await db.collection('config').doc('app').get();
    let providerTest = 'gemini';
    let providerAnalytics = 'gemini';
    let providerChat = 'gemini';
    let providerNews = 'gemini';
    if (doc.exists) {
      const data = doc.data();
      providerTest = data.providerTest || data.activeAI || 'gemini';
      providerAnalytics = data.providerAnalytics || data.activeAI || 'gemini';
      providerChat = data.providerChat || data.activeAI || 'gemini';
      providerNews = data.providerNews || data.activeAI || 'gemini';
    }
    res.json({
      activeAI,
      providerTest,
      providerAnalytics,
      providerChat,
      providerNews,
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
    const { 
      model, 
      providerTest, 
      providerAnalytics, 
      providerChat, 
      providerNews, 
      geminiModelTest, 
      geminiModelAnalytics, 
      geminiModelChat, 
      geminiModelNews 
    } = req.body;
    
    const updates = {};
    const validProviders = ['gemini', 'groq', 'claude'];
    
    if (model) {
      if (validProviders.includes(model)) {
        updates.activeAI = model;
      } else {
        return res.status(400).json({ error: 'Invalid active AI model provider' });
      }
    }

    if (providerTest) {
      if (!validProviders.includes(providerTest)) {
        return res.status(400).json({ error: `Invalid Test Provider: ${providerTest}` });
      }
      updates.providerTest = providerTest;
    }

    if (providerAnalytics) {
      if (!validProviders.includes(providerAnalytics)) {
        return res.status(400).json({ error: `Invalid Analytics Provider: ${providerAnalytics}` });
      }
      updates.providerAnalytics = providerAnalytics;
    }

    if (providerChat) {
      if (!validProviders.includes(providerChat)) {
        return res.status(400).json({ error: `Invalid Chat Provider: ${providerChat}` });
      }
      updates.providerChat = providerChat;
    }

    if (providerNews) {
      if (!validProviders.includes(providerNews)) {
        return res.status(400).json({ error: `Invalid News Provider: ${providerNews}` });
      }
      updates.providerNews = providerNews;
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

// ── Branding / Logo Config Routes ──

// GET /api/admin/config/branding - Retrieve website and app logo URLs (publicly readable)
router.get('/config/branding', async (req, res) => {
  try {
    const doc = await db.collection('config').doc('branding').get();
    const defaultBranding = {
      websiteLogo: '',
      appLogo: ''
    };
    if (doc.exists) {
      const data = doc.data();
      return res.json({ success: true, ...defaultBranding, ...data });
    }
    return res.json({ success: true, ...defaultBranding });
  } catch (err) {
    console.error('[Admin Config Branding GET Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve branding configuration' });
  }
});

// POST /api/admin/config/branding - Save branding configuration (admin only)
router.post('/config/branding', verifyAdmin, async (req, res) => {
  try {
    const { websiteLogo, appLogo } = req.body;
    await db.collection('config').doc('branding').set({
      websiteLogo: websiteLogo || '',
      appLogo: appLogo || '',
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.uid
    }, { merge: true });

    await logStaffActivity(req, 'update_branding_config', { websiteLogo, appLogo });
    res.json({ success: true, message: 'Branding logo configuration updated successfully.' });
  } catch (err) {
    console.error('[Admin Config Branding POST Error]:', err.message);
    res.status(500).json({ error: 'Failed to update branding configuration' });
  }
});

// POST /api/admin/config/branding/upload - Upload branding logo image to Firebase Storage (admin only)
router.post('/config/branding/upload', verifyAdmin, logoUpload.single('logoFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file.' });
    }

    const fileExtension = req.file.originalname.split('.').pop() || 'png';
    const storageFileName = `branding/logo-${Date.now()}.${fileExtension}`;
    const fileRef = bucket.file(storageFileName);

    await fileRef.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
        uploadedBy: req.user.uid
      }
    });

    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '01-01-2099'
    });

    res.json({
      success: true,
      url
    });
  } catch (err) {
    console.error('[Admin Logo Upload Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to upload logo image.' });
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

    const cleanedArticles = [];
    for (let index = 0; index < articles.length; index++) {
      const art = articles[index];
      const category = art.category || 'general';
      const cleanTitle = art.title || `News Article ${index + 1}`;
      const docId = crypto.createHash('md5').update(art.url || cleanTitle).digest('hex');
      const intelDocId = crypto.createHash('md5').update(cleanTitle).digest('hex');

      let intelObj = art.intelligence || null;

      // Pre-generate AI news analysis & quiz questions during upload if not provided
      if (!intelObj) {
        try {
          console.log(`[Admin News Upload] Pre-generating AI news analysis & quiz for: ${cleanTitle}`);
          const intel = await generateNewsIntelligence(
            cleanTitle, 
            art.description || art.summary || '', 
            category, 
            art.source || 'Manual Upload'
          );

          if (intel) {
            intelObj = {
              ...intel,
              title: cleanTitle,
              description: art.description || art.summary || '',
              source: art.source || 'Manual Upload',
              category: category,
              createdAt: admin.firestore.FieldValue.serverTimestamp()
            };

            // Save directly to news_intelligence collection so users get instant response without extra AI calls
            await db.collection('news_intelligence').doc(intelDocId).set(intelObj);
            console.log(`[Admin News Upload] Saved pre-generated news_intelligence for: ${cleanTitle} ✅`);
          }
        } catch (intelErr) {
          console.error(`[Admin News Upload] Intelligence pre-generation failed for "${cleanTitle}":`, intelErr.message);
        }
      }

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
        intelligence: intelObj || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = db.collection('news_articles').doc(docId);
      batch.set(docRef, cleanArt, { merge: true });
      cleanedArticles.push(cleanArt);
    }

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
    const questionCount = (testMode === 'mock' || testMode === 'pyq') ? 25 : 5;
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
        durationMinutes: parseInt(durationMinutes, 10) || ((testMode === 'mock' || testMode === 'pyq') ? 120 : 10),
        markingScheme: (testMode === 'mock' || testMode === 'pyq') ? '+1 for correct, -0.25 for incorrect' : '+1 for correct, 0 for incorrect'
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
      durationMinutes: (testMode === 'mock' || testMode === 'pyq') ? 120 : 10,
      markingScheme: (testMode === 'mock' || testMode === 'pyq') ? '+1 for correct, -0.25 for incorrect' : '+1 for correct, 0 for incorrect'
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

// Get stats from the Question Bank & Test Questions
router.get('/questions/pool/stats', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const poolSnap = await db.collection('question_bank').get();
    const questionsSnap = await db.collection('questions').get();

    let totalCount = poolSnap.size + questionsSnap.size;

    const subjects = {};
    const exams = {};

    const processDoc = (doc) => {
      const q = doc.data();
      const sub = q.subject || 'General Knowledge';
      subjects[sub] = (subjects[sub] || 0) + 1;

      if (Array.isArray(q.examTags)) {
        q.examTags.forEach(tag => {
          exams[tag] = (exams[tag] || 0) + 1;
        });
      } else if (q.examId) {
        exams[q.examId] = (exams[q.examId] || 0) + 1;
      }
    };

    poolSnap.docs.forEach(processDoc);
    questionsSnap.docs.forEach(processDoc);

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

// GET list of all questions in Question Bank pool & test questions with filtering & search
router.get('/questions/pool', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { subject, examTag, search, limit } = req.query;
    const maxLimit = parseInt(limit, 10) || 500;

    const poolSnap = await db.collection('question_bank').get();
    const questionsSnap = await db.collection('questions').get();

    const poolQuestions = poolSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const testQuestions = questionsSnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        examTags: Array.isArray(data.examTags) ? data.examTags : (data.examId ? [data.examId] : [])
      };
    });

    // Merge both sources and deduplicate by id
    const map = new Map();
    poolQuestions.forEach(q => map.set(q.id, q));
    testQuestions.forEach(q => {
      if (!map.has(q.id)) {
        map.set(q.id, q);
      }
    });

    let questions = Array.from(map.values());

    // Apply subject filter
    if (subject && subject !== 'all') {
      const targetSub = subject.toLowerCase().trim();
      questions = questions.filter(q => (q.subject || '').toLowerCase().trim().includes(targetSub));
    }

    // Apply examTag filter
    if (examTag && examTag !== 'all') {
      const targetExam = examTag.toLowerCase().trim();
      questions = questions.filter(q => 
        Array.isArray(q.examTags) && q.examTags.some(tag => tag.toLowerCase().trim() === targetExam)
      );
    }

    // Apply search query filter
    if (search && search.trim() !== '') {
      const qLower = search.toLowerCase().trim();
      questions = questions.filter(q => 
        (q.question && q.question.toLowerCase().includes(qLower)) ||
        (q.explanation && q.explanation.toLowerCase().includes(qLower)) ||
        (Array.isArray(q.options) && q.options.some(opt => String(opt).toLowerCase().includes(qLower)))
      );
    }

    const totalMatches = questions.length;
    const paginated = questions.slice(0, maxLimit);

    res.json({
      success: true,
      totalCount: totalMatches,
      questions: paginated
    });
  } catch (err) {
    console.error('[Admin Pool Fetch Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch questions from pool' });
  }
});

// PUT update an individual question in Question Bank pool or test questions
router.put('/questions/pool/:id', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctIndex, explanation, subject, examTags, category } = req.body;

    if (!id) return res.status(400).json({ error: 'Question ID is required' });

    let qRef = db.collection('question_bank').doc(id);
    let doc = await qRef.get();

    if (!doc.exists) {
      qRef = db.collection('questions').doc(id);
      doc = await qRef.get();
    }

    if (!doc.exists) {
      return res.status(404).json({ error: 'Question not found in pool or test questions' });
    }

    const existing = doc.data();
    const updatedData = {
      ...existing,
      question: question !== undefined ? question : existing.question,
      options: Array.isArray(options) ? options : existing.options,
      correctIndex: typeof correctIndex === 'number' ? correctIndex : (parseInt(correctIndex, 10) || existing.correctIndex || 0),
      explanation: explanation !== undefined ? explanation : existing.explanation,
      subject: subject || existing.subject || 'General Knowledge',
      examTags: Array.isArray(examTags) ? examTags : (existing.examTags || []),
      category: category || existing.category || 'general',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await qRef.set(updatedData, { merge: true });
    await logStaffActivity(req, 'update_pool_question', { questionId: id, subject: updatedData.subject });

    res.json({ success: true, question: updatedData });
  } catch (err) {
    console.error('[Admin Pool Edit Error]:', err.message);
    res.status(500).json({ error: 'Failed to update question in pool' });
  }
});

// DELETE remove a question from Question Bank pool or test questions
router.delete('/questions/pool/:id', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Question ID is required' });

    let qRef = db.collection('question_bank').doc(id);
    let doc = await qRef.get();
    if (!doc.exists) {
      qRef = db.collection('questions').doc(id);
    }

    await qRef.delete();

    await logStaffActivity(req, 'delete_pool_question', { questionId: id });
    res.json({ success: true, message: `Question ${id} deleted successfully.` });
  } catch (err) {
    console.error('[Admin Pool Delete Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete question from pool' });
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
      durationMinutes: parseInt(durationMinutes, 10) || ((testMode === 'mock' || testMode === 'pyq') ? 120 : 10),
      markingScheme: (testMode === 'mock' || testMode === 'pyq') ? '+1 for correct, -0.25 for incorrect' : '+1 for correct, 0 for incorrect'
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
      durationMinutes: (testMode === 'mock' || testMode === 'pyq') ? 120 : 10,
      markingScheme: (testMode === 'mock' || testMode === 'pyq') ? '+1 for correct, -0.25 for incorrect' : '+1 for correct, 0 for incorrect'
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

// PUT /api/admin/reports/:id - Edit question details in a reported entry (admin only)
router.put('/reports/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctIndex, explanation } = req.body;

    const reportRef = db.collection('reported_questions').doc(id);
    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      return res.status(404).json({ error: 'Reported question entry not found.' });
    }

    const existingData = reportDoc.data();
    const updatedQuestionObj = {
      ...(existingData.question || {}),
      question: question !== undefined ? question : existingData.question?.question,
      options: Array.isArray(options) ? options : (existingData.question?.options || []),
      correctIndex: typeof correctIndex === 'number' ? correctIndex : (existingData.question?.correctIndex || 0),
      explanation: explanation !== undefined ? explanation : (existingData.question?.explanation || ''),
      updatedAt: new Date().toISOString()
    };

    await reportRef.set({
      question: updatedQuestionObj,
      status: 'resolved_and_edited',
      editedAt: new Date().toISOString()
    }, { merge: true });

    await logStaffActivity(req, 'edit_reported_question', { reportId: id, question: updatedQuestionObj.question });

    res.json({ success: true, message: 'Question updated successfully.', question: updatedQuestionObj });
  } catch (err) {
    console.error('[Admin Report Edit] Error:', err.message);
    res.status(500).json({ error: 'Failed to update reported question.' });
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

// ======================== TRAINING DATA (Knowledge Base) ========================

const { invalidateTrainingDataCache } = require('../services/trainingData');

// POST /api/admin/training-data/upload - Upload single training data entry
router.post('/training-data/upload', verifyAdmin, async (req, res) => {
  try {
    const { subject, topic, content, source, examTags } = req.body;

    if (!subject || !topic || !content) {
      return res.status(400).json({ error: 'subject, topic, and content are required.' });
    }

    const id = `td_${Date.now()}`;
    const entry = {
      id,
      subject: subject.trim(),
      topic: topic.trim(),
      content: content.trim(),
      source: source ? source.trim() : '',
      examTags: Array.isArray(examTags) ? examTags : [],
      createdAt: new Date().toISOString(),
      charCount: content.trim().length
    };

    await db.collection('training_data').doc(id).set(entry);
    invalidateTrainingDataCache();

    console.log(`[Admin Training Data] Uploaded entry ${id} — ${subject} / ${topic} (${entry.charCount} chars) ✅`);
    await logStaffActivity(req, 'upload_training_data', { id, subject, topic, charCount: entry.charCount });

    res.json({ success: true, id, message: 'Training data uploaded successfully.' });
  } catch (err) {
    console.error('[Admin Training Data Upload Error]:', err.message);
    res.status(500).json({ error: 'Failed to upload training data.' });
  }
});

// POST /api/admin/training-data/upload-bulk - Bulk upload training data (max 50)
router.post('/training-data/upload-bulk', verifyAdmin, async (req, res) => {
  try {
    const { entries } = req.body;

    if (!Array.isArray(entries) || entries.length === 0) {
      return res.status(400).json({ error: 'entries array is required and must not be empty.' });
    }
    if (entries.length > 50) {
      return res.status(400).json({ error: 'Maximum 50 entries per bulk upload.' });
    }

    const batch = db.batch();
    const ids = [];

    for (let i = 0; i < entries.length; i++) {
      const { subject, topic, content, source, examTags } = entries[i];

      if (!subject || !topic || !content) {
        return res.status(400).json({ error: `Entry at index ${i} is missing required fields (subject, topic, content).` });
      }

      const id = `td_${Date.now()}_${i}`;
      const entry = {
        id,
        subject: subject.trim(),
        topic: topic.trim(),
        content: content.trim(),
        source: source ? source.trim() : '',
        examTags: Array.isArray(examTags) ? examTags : [],
        createdAt: new Date().toISOString(),
        charCount: content.trim().length
      };

      batch.set(db.collection('training_data').doc(id), entry);
      ids.push(id);
    }

    await batch.commit();
    invalidateTrainingDataCache();

    console.log(`[Admin Training Data] Bulk uploaded ${ids.length} entries ✅`);
    await logStaffActivity(req, 'bulk_upload_training_data', { count: ids.length, ids });

    res.json({ success: true, count: ids.length, ids, message: `${ids.length} training data entries uploaded successfully.` });
  } catch (err) {
    console.error('[Admin Training Data Bulk Upload Error]:', err.message);
    res.status(500).json({ error: 'Failed to bulk upload training data.' });
  }
});

// GET /api/admin/training-data-stats - Training data statistics (placed before :id to avoid conflict)
router.get('/training-data-stats', verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('training_data').get();

    let totalChars = 0;
    const subjects = {};
    const examTagCounts = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      totalChars += data.charCount || 0;

      const subj = data.subject || 'Unknown';
      subjects[subj] = (subjects[subj] || 0) + 1;

      if (Array.isArray(data.examTags)) {
        for (const tag of data.examTags) {
          examTagCounts[tag] = (examTagCounts[tag] || 0) + 1;
        }
      }
    });

    res.json({
      totalEntries: snapshot.size,
      totalChars,
      subjects,
      examTags: examTagCounts
    });
  } catch (err) {
    console.error('[Admin Training Data Stats Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch training data stats.' });
  }
});

// GET /api/admin/training-data - List all training data (without full content)
router.get('/training-data', verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('training_data').orderBy('createdAt', 'desc').get();

    const entries = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id,
        subject: data.subject,
        topic: data.topic,
        source: data.source,
        examTags: data.examTags,
        createdAt: data.createdAt,
        charCount: data.charCount
      };
    });

    res.json({ entries, total: entries.length });
  } catch (err) {
    console.error('[Admin Training Data List Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch training data.' });
  }
});

// GET /api/admin/training-data/:id - Get single training data entry (with full content)
router.get('/training-data/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('training_data').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Training data entry not found.' });
    }

    res.json(doc.data());
  } catch (err) {
    console.error('[Admin Training Data Get Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch training data entry.' });
  }
});

// DELETE /api/admin/training-data/:id - Delete a training data entry
router.delete('/training-data/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('training_data').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Training data entry not found.' });
    }

    await db.collection('training_data').doc(id).delete();
    invalidateTrainingDataCache();

    console.log(`[Admin Training Data] Deleted entry ${id} ✅`);
    await logStaffActivity(req, 'delete_training_data', { id });

    res.json({ success: true, message: 'Training data entry deleted successfully.' });
  } catch (err) {
    console.error('[Admin Training Data Delete Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete training data entry.' });
  }
});

// POST /api/admin/training-data/upload-file - Upload PDF/TXT file and AI-extract training data
const trainingFileUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'text/plain'];
    if (allowed.includes(file.mimetype) || file.originalname.endsWith('.txt') || file.originalname.endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and TXT files are allowed'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post('/training-data/upload-file', verifyAdmin, trainingFileUpload.single('trainingFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. PDF ya TXT file select karo.' });
    }

    const { subject, source, aiExtract, examTags } = req.body;
    const parsedExamTags = examTags ? JSON.parse(examTags) : ['cgpsc', 'vyapam'];
    const fileName = req.file.originalname;
    const ext = fileName.split('.').pop().toLowerCase();

    console.log(`[Training File Upload] Processing "${fileName}" (${(req.file.size / 1024).toFixed(1)} KB, type: ${ext})`);

    // Step 1: Extract text from file
    let extractedText = '';
    
    if (ext === 'pdf') {
      const pdfParse = require('pdf-parse');
      const pdfData = await pdfParse(req.file.buffer);
      extractedText = pdfData.text;
      console.log(`[Training File Upload] PDF parsed: ${pdfData.numpages} pages, ${extractedText.length} chars`);
    } else if (ext === 'txt') {
      extractedText = req.file.buffer.toString('utf-8');
      console.log(`[Training File Upload] TXT loaded: ${extractedText.length} chars`);
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Only PDF and TXT supported.' });
    }

    // Clean extracted text
    extractedText = extractedText.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

    if (!extractedText || extractedText.length < 50) {
      return res.status(400).json({ error: 'File se bahut kam text extract hua. File me readable text hona chahiye.' });
    }

    // Truncate if too long (max ~100K chars for AI processing)
    const MAX_TEXT_FOR_AI = 100000;
    if (extractedText.length > MAX_TEXT_FOR_AI) {
      extractedText = extractedText.substring(0, MAX_TEXT_FOR_AI);
      console.log(`[Training File Upload] Text truncated to ${MAX_TEXT_FOR_AI} chars for AI processing`);
    }

    let entries = [];

    // Step 2: AI Smart Extract or direct save
    if (aiExtract === 'true') {
      // Use Gemini AI to structure the text into topic-wise entries
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      // For large texts, process in chunks
      const CHUNK_SIZE = 25000; // chars per chunk
      const textChunks = [];
      for (let i = 0; i < extractedText.length; i += CHUNK_SIZE) {
        textChunks.push(extractedText.substring(i, i + CHUNK_SIZE));
      }

      console.log(`[Training File Upload] Processing ${textChunks.length} chunk(s) with AI...`);

      for (let chunkIdx = 0; chunkIdx < textChunks.length; chunkIdx++) {
        const chunk = textChunks[chunkIdx];

        const aiPrompt = `You are a knowledge extraction expert. Analyze the following text extracted from a study book/document and convert it into structured training data entries for an AI educational chatbot.

${subject ? `The admin has indicated the subject is: "${subject}". Use this as the primary subject, but you can create sub-topics.` : 'Detect the subject(s) from the content automatically.'}
${source ? `Source: "${source}"` : `Source: "${fileName}"`}

RULES:
1. Break the text into logical topic-wise chunks. Each entry should cover ONE specific topic.
2. Each entry's content should be comprehensive and factually complete for that topic.
3. Remove any garbage characters, page numbers, headers/footers, or irrelevant formatting artifacts.
4. Keep the original language of the content (Hindi/English/Hinglish).
5. Each entry should have at least 100 characters of meaningful content.
6. Create as many entries as logically needed - don't merge unrelated topics.
7. Maximum 20 entries per chunk.

Respond ONLY with a valid JSON array:
[
  {
    "subject": "Subject name in Hindi/English",
    "topic": "Specific topic name",
    "content": "Detailed extracted and cleaned content for this topic..."
  }
]

TEXT TO PROCESS (chunk ${chunkIdx + 1}/${textChunks.length}):
---
${chunk}
---`;

        try {
          const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            generationConfig: {
              responseMimeType: 'application/json',
              maxOutputTokens: 8192,
              temperature: 0.1
            }
          });

          const result = await model.generateContent(aiPrompt);
          const responseText = result.response.text().trim();
          const parsed = JSON.parse(responseText);

          if (Array.isArray(parsed)) {
            entries.push(...parsed.map(e => ({
              subject: e.subject || subject || 'सामान्य ज्ञान',
              topic: e.topic || 'Unknown Topic',
              content: (e.content || '').trim(),
              source: source || fileName,
              examTags: parsedExamTags
            })).filter(e => e.content.length >= 50));
          }

          console.log(`[Training File Upload] Chunk ${chunkIdx + 1}: ${parsed.length || 0} entries extracted`);
        } catch (aiErr) {
          console.error(`[Training File Upload] AI extraction error for chunk ${chunkIdx + 1}:`, aiErr.message);
          // Fallback: save the chunk as a single entry
          entries.push({
            subject: subject || 'सामान्य ज्ञान',
            topic: `${fileName} - Part ${chunkIdx + 1}`,
            content: chunk.trim(),
            source: source || fileName,
            examTags: parsedExamTags
          });
        }
      }
    } else {
      // No AI extraction - save entire text as single entry (or split by paragraphs if too large)
      const MAX_ENTRY_SIZE = 10000;
      if (extractedText.length <= MAX_ENTRY_SIZE) {
        entries.push({
          subject: subject || 'सामान्य ज्ञान',
          topic: fileName.replace(/\.[^.]+$/, ''),
          content: extractedText,
          source: source || fileName,
          examTags: parsedExamTags
        });
      } else {
        // Split by double newlines into manageable chunks
        const paragraphs = extractedText.split(/\n\n+/);
        let currentContent = '';
        let partNum = 1;

        for (const para of paragraphs) {
          if ((currentContent + '\n\n' + para).length > MAX_ENTRY_SIZE && currentContent.length > 100) {
            entries.push({
              subject: subject || 'सामान्य ज्ञान',
              topic: `${fileName.replace(/\.[^.]+$/, '')} - Part ${partNum}`,
              content: currentContent.trim(),
              source: source || fileName,
              examTags: parsedExamTags
            });
            partNum++;
            currentContent = para;
          } else {
            currentContent += (currentContent ? '\n\n' : '') + para;
          }
        }
        if (currentContent.length > 50) {
          entries.push({
            subject: subject || 'सामान्य ज्ञान',
            topic: `${fileName.replace(/\.[^.]+$/, '')} - Part ${partNum}`,
            content: currentContent.trim(),
            source: source || fileName,
            examTags: parsedExamTags
          });
        }
      }
    }

    if (entries.length === 0) {
      return res.status(400).json({ error: 'File se koi valid training data extract nahi ho paya.' });
    }

    // Step 3: Save all entries to Firestore
    const savedEntries = [];
    const batch = db.batch();
    let totalChars = 0;

    for (const entry of entries) {
      const id = `td_file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const docData = {
        id,
        subject: entry.subject.trim(),
        topic: entry.topic.trim(),
        content: entry.content.trim(),
        source: entry.source.trim(),
        examTags: entry.examTags,
        createdAt: new Date().toISOString(),
        charCount: entry.content.trim().length,
        uploadedFrom: 'file',
        fileName
      };
      batch.set(db.collection('training_data').doc(id), docData);
      savedEntries.push({ id, subject: docData.subject, topic: docData.topic, charCount: docData.charCount });
      totalChars += docData.charCount;
    }

    await batch.commit();
    invalidateTrainingDataCache();

    console.log(`[Training File Upload] ✅ Saved ${savedEntries.length} entries (${totalChars} total chars) from "${fileName}"`);
    await logStaffActivity(req, 'upload_training_file', { fileName, entriesCreated: savedEntries.length, totalChars, aiExtract: aiExtract === 'true' });

    res.json({
      success: true,
      entriesCreated: savedEntries.length,
      totalChars,
      entries: savedEntries,
      message: `${savedEntries.length} training data entries extracted and saved from "${fileName}".`
    });
  } catch (err) {
    console.error('[Training File Upload Error]:', err.message);
    res.status(500).json({ error: err.message || 'File upload and extraction failed.' });
  }
});

module.exports = router;

