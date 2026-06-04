const express = require('express');
const router = express.Router();
const multer = require('multer');
const { admin, db, bucket, authAdmin } = require('../firebase-admin');
const { verifyAdmin } = require('../middleware/verifyFirebaseToken');
const { extractTextFromPDF } = require('../services/syllabusParser');
const { getActiveAI, setActiveAI, getGeminiConfig, updateAIConfig, generateTest, summarizeNews, translateAndSummarizeNews } = require('../services/aiManager');

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

// ── Upload Material Route ──

router.post('/upload-material', verifyAdmin, upload.single('materialFile'), async (req, res) => {
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

router.get('/materials', verifyAdmin, async (req, res) => {
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

router.post('/news/refresh', verifyAdmin, async (req, res) => {
  try {
    console.log('[Admin News Refresh] Scraping and translating fresh articles...');
    const { scrapeAllNews } = require('../services/newsScraper');
    const result = await scrapeAllNews();
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
router.post('/tests/generate', verifyAdmin, async (req, res) => {
  try {
    const { examId, examName, subject, mode, language, subjects } = req.body;

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
        testId,
        mode: testMode,
        language: lang
      });
    });
    await batch.commit();
    console.log(`[Admin Test Gen] Saved ${enrichedQuestions.length} individual questions to questions collection ✅`);

    res.json({
      success: true,
      test: {
        id: testId,
        examId,
        examName,
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
router.post('/tests/upload', verifyAdmin, async (req, res) => {
  try {
    const { examId, examName, subject, mode, language, pattern, questions } = req.body;

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
        testId,
        mode: testMode,
        language: language || 'hindi'
      });
    });
    await batch.commit();
    console.log(`[Admin Test Upload] Saved ${enrichedQuestions.length} individual questions to questions collection ✅`);

    res.json({
      success: true,
      test: {
        id: testId,
        examId,
        examName,
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
router.get('/tests', verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('tests').orderBy('createdAt', 'desc').get();
    const tests = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: d.id,
        examId: d.examId,
        examName: d.examName,
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
router.delete('/tests/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('tests').doc(id).delete();
    console.log(`[Admin Test Delete] Deleted test ${id} ✅`);
    res.json({ success: true, message: 'Test deleted successfully' });
  } catch (err) {
    console.error('[Admin Delete Test Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete test.' });
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

// DELETE /api/admin/users/:uid - Permanently deletes a user account
router.delete('/users/:uid', verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;

    // 1. Delete from Firebase Authentication
    await authAdmin.deleteUser(uid);

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
router.post('/syllabus/save', verifyAdmin, async (req, res) => {
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
    res.json({ success: true, exam });
  } catch (err) {
    console.error('[Admin Syllabus Save Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to save syllabus configuration.' });
  }
});

// DELETE /api/admin/syllabus/:id - Delete a custom syllabus configuration from Firestore
router.delete('/syllabus/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('syllabi').doc(id).delete();
    console.log(`[Admin Syllabus Delete] Deleted custom syllabus ${id} ✅`);
    res.json({ success: true, message: 'Custom syllabus deleted successfully.' });
  } catch (err) {
    console.error('[Admin Delete Syllabus Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete custom syllabus.' });
  }
});

module.exports = router;
