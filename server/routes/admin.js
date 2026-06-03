const express = require('express');
const router = express.Router();
const multer = require('multer');
const { db, bucket } = require('../firebase-admin');
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
    console.log('[Admin News Refresh] Scraping fresh articles...');
    const { scrapeAll } = require('../services/scraper');
    const result = await scrapeAll();
    let articles = result.articles || [];

    // Process all articles (limit to 20 to avoid rate limits and keep it fast)
    const limit = 20;
    const processArticles = articles.slice(0, limit);

    console.log(`[Admin News Refresh] Running AI translation & summarization for all ${processArticles.length} articles...`);

    const summarized = await Promise.all(
      processArticles.map(async (art) => {
        try {
          const aiResult = await translateAndSummarizeNews(
            art.title,
            art.category,
            art.source
          );
          return {
            ...art,
            title_hi: aiResult.title_hi || art.title,
            description: aiResult.summary_en,
            description_hi: aiResult.summary_hi,
            summary: aiResult.summary_en,
            summary_hi: aiResult.summary_hi
          };
        } catch (err) {
          console.error(`[Admin News AI Error] Failed to translate/summarize "${art.title}":`, err.message);
          return {
            ...art,
            title_hi: art.title, // Fallback
            description: art.description,
            description_hi: art.description,
            summary: art.description,
            summary_hi: art.description
          };
        }
      })
    );

    const finalArticles = summarized;

    const cacheData = {
      lastUpdated: new Date().toISOString(),
      articles: finalArticles
    };

    await db.collection('news').doc('cache').set(cacheData);
    console.log('[Admin News Refresh] Cache updated in Firestore with AI bilingual summaries ✅');

    res.json({
      success: true,
      lastUpdated: cacheData.lastUpdated,
      totalArticles: finalArticles.length
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

module.exports = router;
