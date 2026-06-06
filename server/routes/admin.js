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
      profile: true
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
    const validTabs = ['home', 'practice', 'chat', 'news', 'syllabus', 'profile'];
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

// ── Admin Test Management Endpoints ──

// Generate AI test and save to Firestore
router.post('/tests/generate', verifyStaffOrAdmin('tests'), async (req, res) => {
  try {
    const { examId, examName, examIds, examNames, subject, mode, language, subjects } = req.body;

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
      return {
        id: q.id || `q_${testId}_${index}`,
        question: q.question,
        options: q.options,
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || '',
        subject: q.subject || subject || 'General Knowledge',
        difficulty: q.difficulty || 'medium',
        weightage: q.weightage || 'medium',
        timestamp
      };
    });

    const testMode = mode || 'quiz';
    const testPattern = pattern || {
      totalQuestions: enrichedQuestions.length,
      totalMarks: enrichedQuestions.length * (testMode === 'mock' ? 2 : 1),
      durationMinutes: testMode === 'mock' ? 120 : 10,
      markingScheme: testMode === 'mock' ? '+2 for correct, -0.66 for incorrect' : '+1 for correct, 0 for incorrect'
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
        language: language || 'hindi'
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
      return {
        id: q.id || `q_${id}_${index}`,
        question: q.question,
        options: q.options,
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || '',
        subject: q.subject || subject || 'General Knowledge',
        difficulty: q.difficulty || 'medium',
        weightage: q.weightage || 'medium',
        timestamp: q.timestamp || timestamp
      };
    });

    const testMode = mode || doc.data().mode || 'quiz';
    const testPattern = pattern || doc.data().pattern || {
      totalQuestions: enrichedQuestions.length,
      totalMarks: enrichedQuestions.length * (testMode === 'mock' ? 2 : 1),
      durationMinutes: testMode === 'mock' ? 120 : 10,
      markingScheme: testMode === 'mock' ? '+2 for correct, -0.66 for incorrect' : '+1 for correct, 0 for incorrect'
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
        language: language || 'hindi'
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
    const limit = parseInt(req.query.limit) || 100;
    
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
        activityType: d.isCorrect ? 'mcq_correct' : 'mcq_incorrect',
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

module.exports = router;
