const express = require('express');
const router = express.Router();
const claude = require('../services/groq');

router.post('/', async (req, res) => {
  try {
    const { message, examName, language, history, stream } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const exam = examName || 'Government Competitive Exam';
    const lang = language || 'english';

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
        const streamObj = await claude.chatStream(message, exam, lang, history || []);

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
      const reply = await claude.chat(message, exam, lang, history || []);
      res.json({ reply });
    }
  } catch (err) {
    console.error('[Chat Error]:', err.message);
    res.status(500).json({ error: 'Failed to get AI response. Please check your API key and try again.' });
  }
});

module.exports = router;
