const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { parseSyllabusFromText, parseSyllabusFromFile } = require('../services/syllabusParser');

const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `syllabus-${Date.now()}-${Math.round(Math.random() * 1000)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

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
    let result;

    if (req.file) {
      console.log(`[Syllabus] Parsing uploaded file: ${req.file.originalname}`);
      result = await parseSyllabusFromFile(req.file.path, req.file.mimetype);

      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}
    } else if (req.body.text) {
      console.log('[Syllabus] Parsing pasted text');
      result = await parseSyllabusFromText(req.body.text);
    } else {
      return res.status(400).json({ error: 'Please upload a file or provide syllabus text.' });
    }

    const name = req.body.name || req.file?.originalname?.replace(/\.[^.]+$/, '') || 'Custom Syllabus';

    res.json({
      name: name,
      subjects: result.subjects,
      totalTopics: result.subjects.reduce((sum, s) => sum + s.topics.length, 0)
    });
  } catch (err) {
    console.error('[Syllabus Parse Error]:', err.message);

    if (req.file) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }

    res.status(500).json({ error: err.message || 'Failed to parse syllabus.' });
  }
});

module.exports = router;
