const fs = require('fs');
const path = require('path');
const claude = require('./groq');

let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch (e) {
  console.warn('[SyllabusParser] pdf-parse not available, PDF upload will fallback to text extraction');
}

async function extractTextFromPDF(filePath) {
  if (!pdfParse) {
    throw new Error('PDF parsing is not available. Please install pdf-parse package.');
  }

  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

async function parseSyllabusFromText(text) {
  if (!text || text.trim().length < 10) {
    throw new Error('Syllabus text is too short or empty. Please provide more content.');
  }

  const maxChars = 15000;
  const truncatedText = text.length > maxChars
    ? text.substring(0, maxChars) + '\n\n[... truncated for processing ...]'
    : text;

  const result = await claude.parseSyllabus(truncatedText);

  if (!result.subjects || !Array.isArray(result.subjects)) {
    throw new Error('Failed to parse syllabus into structured format.');
  }

  for (const subject of result.subjects) {
    if (!subject.topics) subject.topics = [];
    subject.topics = subject.topics.map((topic, idx) => ({
      id: topic.id || `custom-${subject.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${idx + 1}`,
      name: topic.name || `Topic ${idx + 1}`
    }));
  }

  return result;
}

async function parseSyllabusFromFile(filePath, mimeType) {
  let text;

  if (mimeType === 'application/pdf') {
    text = await extractTextFromPDF(filePath);
  } else {
    text = fs.readFileSync(filePath, 'utf-8');
  }

  return parseSyllabusFromText(text);
}

module.exports = { parseSyllabusFromText, parseSyllabusFromFile, extractTextFromPDF };
