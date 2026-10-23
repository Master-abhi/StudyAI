const express = require('express');
const router = express.Router();
const { chat, chatStream } = require('../services/aiManager');
const { db } = require('../firebase-admin');
const { optionalFirebaseToken, verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');
const { aiRateLimiter } = require('../middleware/rateLimiter');

router.post('/', optionalFirebaseToken, aiRateLimiter, async (req, res) => {
  try {
    const { message, examName, language, history, stream } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check free user limit (max 3 questions/day)
    if (req.user && req.user.uid) {
      try {
        const userDoc = await db.collection('users').doc(req.user.uid).get();
        const userData = userDoc.exists ? userDoc.data() : {};
        const isPaid = userData.isPaid === true || userData.plan === 'paid';
        
        if (!isPaid) {
          const now = new Date();
          const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
          const countToday = userData.aiQuestionsDate === today ? (userData.aiQuestionsToday || 0) : 0;
          
          if (countToday >= 3) {
            return res.status(403).json({
              error: 'आज के 3 निःशुल्क AI Guru प्रश्नों की सीमा पूरी हो चुकी है। असीमित सवालों के लिए Pro Pass में अपग्रेड करें।',
              limitReached: true,
              upgradeRequired: true
            });
          }

          // Increment daily count
          await db.collection('users').doc(req.user.uid).set({
            aiQuestionsDate: today,
            aiQuestionsToday: countToday + 1
          }, { merge: true });
        }
      } catch (tierCheckErr) {
        console.warn('[AI Guru Tier Check Error]:', tierCheckErr.message);
      }
    }

    const exam = examName || 'Government Competitive Exam';
    const lang = language || 'english';

    let cleanHistory = history || [];
    if (cleanHistory.length > 0) {
      const lastMsg = cleanHistory[cleanHistory.length - 1];
      if (lastMsg.role === 'user' && lastMsg.content === message) {
        cleanHistory = cleanHistory.slice(0, -1);
      }
    }

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');

      let ended = false;
      const safeWrite = (data) => {
        if (!ended && !res.writableEnded) {
          try { res.write(data); } catch (e) {}
        }
      };
      const safeEnd = () => {
        if (!ended && !res.writableEnded) {
          ended = true;
          try { res.end(); } catch (e) {}
        }
      };

      try {
        const streamObj = await chatStream(message, exam, lang, cleanHistory);

        req.on('close', () => {
          ended = true;
        });

        (async () => {
          try {
            for await (const chunk of streamObj) {
              if (ended) break;
              const content = chunk.choices?.[0]?.delta?.content;
              if (content) {
                safeWrite(`data: ${JSON.stringify({ type: 'text', content })}\n\n`);
              }
            }
            safeWrite(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
            safeEnd();
          } catch (err) {
            console.error('[Chat Stream Error]:', err.message);
            safeWrite(`data: ${JSON.stringify({ type: 'error', content: err.message || 'An error occurred during streaming.' })}\n\n`);
            safeEnd();
          }
        })();
      } catch (streamErr) {
        console.error('[Chat Stream Init Error]:', streamErr.message);
        safeWrite(`data: ${JSON.stringify({ type: 'error', content: streamErr.message })}\n\n`);
        safeEnd();
      }
    } else {
      const reply = await chat(message, exam, lang, cleanHistory);
      res.json({ reply });
    }
  } catch (err) {
    console.error('[Chat Error]:', err.message);
    res.status(500).json({ error: 'Failed to get AI response. Please check your API key and try again.' });
  }
});

// GET /api/chat/history - Retrieve user's chat history for an exam across all logged-in devices
router.get('/history', verifyFirebaseToken, async (req, res) => {
  try {
    const examId = req.query.examId || 'default';
    const docRef = db.collection('users').doc(req.user.uid).collection('chats').doc(examId);
    const snap = await docRef.get();
    if (snap.exists) {
      const data = snap.data();
      return res.json({ success: true, messages: data.messages || [] });
    }
    return res.json({ success: true, messages: [] });
  } catch (err) {
    console.error('[Chat History GET Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve chat history.' });
  }
});

// POST /api/chat/history - Save/sync user's chat history across all logged-in devices
router.post('/history', verifyFirebaseToken, async (req, res) => {
  try {
    const { examId = 'default', messages } = req.body;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Sanitize messages array (keep last 100 messages max to prevent document overflow)
    const cleanMessages = messages.slice(-100).map(m => ({
      id: String(m.id || Date.now()),
      role: m.role === 'user' ? 'user' : 'ai',
      content: String(m.content || ''),
      timestamp: String(m.timestamp || '')
    }));

    const docRef = db.collection('users').doc(req.user.uid).collection('chats').doc(examId);
    await docRef.set({
      examId,
      messages: cleanMessages,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    res.json({ success: true, count: cleanMessages.length });
  } catch (err) {
    console.error('[Chat History POST Error]:', err.message);
    res.status(500).json({ error: 'Failed to save chat history.' });
  }
});

// DELETE /api/chat/history - Clear chat history for an exam across all devices
router.delete('/history', verifyFirebaseToken, async (req, res) => {
  try {
    const examId = req.query.examId || req.body?.examId || 'default';
    const docRef = db.collection('users').doc(req.user.uid).collection('chats').doc(examId);
    await docRef.delete();
    res.json({ success: true, message: 'Chat history cleared.' });
  } catch (err) {
    console.error('[Chat History DELETE Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete chat history.' });
  }
});

module.exports = router;
