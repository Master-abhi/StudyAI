const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { extractTextFromPDF } = require('../services/syllabusParser');
const { parseSyllabus } = require('../services/aiManager');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'text/plain', 'text/csv'];
  const allowedExts = ['.pdf', '.txt', '.csv', '.text'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, TXT, and CSV files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/', upload.single('syllabusFile'), async (req, res) => {
  try {
    let text;

    if (req.file) {
      if (req.file.mimetype === 'application/pdf') {
        console.log(`[Syllabus] Parsing uploaded PDF: ${req.file.originalname}`);
        text = await extractTextFromPDF(req.file.buffer);
      } else {
        text = req.file.buffer.toString('utf-8');
      }
    } else if (req.body.text) {
      text = req.body.text;
    } else {
      return res.status(400).json({ error: 'Please upload a file or provide syllabus text.' });
    }

    const result = await parseSyllabus(text);

    const name = req.body.name || req.file?.originalname?.replace(/\.[^.]+$/, '') || 'Custom Syllabus';

    res.json({
      name: name,
      subjects: result.subjects,
      totalTopics: result.subjects.reduce((sum, s) => sum + s.topics.length, 0)
    });
  } catch (err) {
    console.error('[Syllabus Parse Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to parse syllabus.' });
  }
});

module.exports = router;
