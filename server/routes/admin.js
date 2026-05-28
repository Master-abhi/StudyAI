const express = require('express');
const router = express.Router();
const multer = require('multer');
const { db, bucket } = require('../firebase-admin');
const { verifyAdmin } = require('../middleware/verifyFirebaseToken');
const { extractTextFromPDF } = require('../services/syllabusParser');
const { getActiveAI, setActiveAI, getGeminiConfig, updateAIConfig } = require('../services/aiManager');

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
      geminiModelChat: geminiConfig.chat
    });
  } catch (err) {
    console.error('[Admin Config GET Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve AI configuration' });
  }
});

router.post('/config/ai', verifyAdmin, async (req, res) => {
  try {
    const { model, geminiModelTest, geminiModelAnalytics, geminiModelChat } = req.body;
    
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

module.exports = router;
