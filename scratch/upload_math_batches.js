const path = require('path');
const fs = require('fs');

require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const Groq = require(path.join(__dirname, '../server/node_modules/groq-sdk'));
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');

function fixMathText(str) {
  if (!str || typeof str !== 'string') return str;
  let s = str;
  // Convert standard LaTeX delimiters \(...\) and \[...\] to $...$ and $$...$$
  s = s.replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => `$$${m}$$`);
  s = s.replace(/\\\(([\s\S]*?)\\\)/g, (_, m) => `$${m}$`);

  // Auto-wrap raw LaTeX commands that are missing dollar signs
  const parts = s.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) return part;
    return part.replace(/((?:-?\d+(?:\.\d+)?\s*)?\\(?:d?frac|sqrt|times|div|pm|mp|le|ge|neq|approx|alpha|beta|theta|pi)\b(?:\{[^{}]*\}(?:\{[^{}]*\})?|[a-zA-Z0-9]*))/g, (m) => `$${m.trim()}$`);
  }).join('');
}

function cleanJsonText(raw) {
  let text = raw.trim();
  if (text.startsWith('```json')) text = text.replace(/^```json/, '');
  if (text.startsWith('```')) text = text.replace(/^```/, '');
  if (text.endsWith('```')) text = text.replace(/```$/, '');
  return text.trim();
}

async function generate10Questions(topic, chapter, testNum, retries = 3) {
  const prompt = `You are an elite mathematics educator and question paper setter for CG Vyapam and CGPSC examinations (Patwari, RI, Hostel Warden, ADEO, Sub-Inspector).
Generate exactly 10 high-quality, authentic Mathematics MCQs in Hindi (with standard English terms where helpful) for:
Subject: गणित (Mathematics)
Chapter: ${chapter}
Topic: ${topic.nameHi} (${topic.name})
Subtopics: ${(topic.subtopics || []).join(', ')}
Test: Test 0${testNum}

CRITICAL RULES:
1. Exact Exam Level: Realistic word problems and numericals matching CG Vyapam's actual exam questions (variety across easy, moderate, and analytical).
2. Exactly 4 distinct options (strings).
3. "correctIndex": integer (0, 1, 2, or 3). Calculate step-by-step to guarantee 100% mathematical accuracy.
4. "explanation": detailed step-by-step solution in Hindi.
5. "difficulty": "easy", "moderate", or "hard".
6. MATH FORMATTING:
   - Always enclose any LaTeX math formula or fraction in single dollar signs like $\\sqrt{50}$, $\\dfrac{7}{8}$, $x^2$, $2\\sqrt{2}$ so it renders cleanly in KaTeX.
   - Do NOT use unescaped double quotes inside question or explanation text; use single quotes.
   - Return ONLY a clean, valid JSON array of 10 objects, no markdown fences, no conversational text.

JSON Schema:
[
  {
    "question": "प्रश्न विवरण...",
    "options": ["विकल्प 1", "विकल्प 2", "विकल्प 3", "विकल्प 4"],
    "correctIndex": 0,
    "explanation": "विस्तृत हल चरणबद्ध रूप में...",
    "difficulty": "moderate"
  }
]`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3
      });

      const text = cleanJsonText(response.choices[0].message.content);
      const questions = JSON.parse(text);
      if (Array.isArray(questions) && questions.length === 10) {
        return questions.map(q => ({
          ...q,
          question: fixMathText(q.question),
          options: (q.options || []).map(fixMathText),
          explanation: fixMathText(q.explanation)
        }));
      }
      console.warn(`[Attempt ${attempt}] Invalid questions count (${questions?.length}), retrying...`);
    } catch (err) {
      console.warn(`[Attempt ${attempt}] Generation error: ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  throw new Error(`Failed to generate 10 questions for ${topic.nameHi} - Test 0${testNum}`);
}

async function uploadSingleTest(topic, chapter, testNum) {
  const title = `${topic.nameHi} - Test 0${testNum}`;
  console.log(`\n⏳ Generating: "${title}" (${topic.name})...`);

  const rawQuestions = await generate10Questions(topic, chapter, testNum);

  const testId = `test_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const timestamp = new Date().toISOString();

  const enrichedQuestions = rawQuestions.map((q, idx) => {
    const qId = `q_${testId}_${idx}`;
    return {
      id: qId,
      question: q.question,
      options: q.options,
      correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
      explanation: q.explanation || '',
      subject: 'Aptitude and Mathematics',
      difficulty: q.difficulty || 'moderate',
      weightage: 'medium',
      timestamp,
      qType: 'standard',
      assertion: '',
      reason: '',
      columnI: [],
      columnII: [],
      statements: [],
      statementLabels: [],
      topic: topic.nameHi,
      sourcePattern: 'CG Vyapam Standard',
      yearTrend: '2020-2026',
      expectedIn2026: true
    };
  });

  const newTest = {
    id: testId,
    title: title,
    examId: 'cgv_master',
    examName: 'CG VYAPAM BASICS',
    examIds: ['cgv_master', 'cgpsc_sse'],
    examNames: ['CG VYAPAM BASICS', 'CGPSC SSE'],
    subject: 'Aptitude and Mathematics',
    mode: 'mock',
    language: 'hindi',
    questions: enrichedQuestions,
    pattern: {
      totalQuestions: 10,
      totalMarks: 10,
      durationMinutes: 15,
      markingScheme: '+1 for correct, -0.25 for incorrect'
    },
    createdAt: timestamp
  };

  // 1. Save Test to Firestore
  await db.collection('tests').doc(testId).set(newTest);

  // 2. Save Questions in Batch
  const batch = db.batch();
  enrichedQuestions.forEach(q => {
    const qRef = db.collection('questions').doc(q.id);
    batch.set(qRef, {
      ...q,
      examId: 'cgv_master',
      examName: 'CG VYAPAM BASICS',
      examIds: ['cgv_master', 'cgpsc_sse'],
      examNames: ['CG VYAPAM BASICS', 'CGPSC SSE'],
      testId,
      mode: 'mock',
      language: 'hindi'
    });
  });
  await batch.commit();

  // 3. Update admin_tests_meta.json
  try {
    let meta = [];
    if (fs.existsSync(metaFilePath)) {
      meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
    }
    meta.push({
      id: testId,
      title: title,
      examId: newTest.examId,
      examIds: newTest.examIds,
      examName: newTest.examName,
      examNames: newTest.examNames,
      subject: newTest.subject,
      mode: newTest.mode,
      language: newTest.language,
      totalQuestions: 10,
      pattern: newTest.pattern,
      createdAt: timestamp
    });
    fs.writeFileSync(metaFilePath, JSON.stringify(meta, null, 2), 'utf8');
  } catch (mErr) {
    console.warn('Meta update warning:', mErr.message);
  }

  console.log(`✅ Successfully uploaded "${title}" (ID: ${testId})`);
  return testId;
}

module.exports = { uploadSingleTest, generate10Questions, fixMathText };
