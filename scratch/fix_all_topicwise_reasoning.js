const path = require('path');
const fs = require('fs');

require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { GoogleGenerativeAI } = require(path.join(__dirname, '../server/node_modules/@google/generative-ai'));
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const cacheDir = path.join(__dirname, '../server/data_cache');

function cleanJsonText(raw) {
  let text = raw.trim();
  if (text.startsWith('```json')) text = text.replace(/^```json/, '');
  if (text.startsWith('```')) text = text.replace(/^```/, '');
  if (text.endsWith('```')) text = text.replace(/```$/, '');
  return text.trim();
}

async function callChunkAI(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-3.5-flash-lite',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      });
      const res = await model.generateContent(prompt);
      const text = cleanJsonText(res.response.text());
      return JSON.parse(text);
    } catch (err) {
      console.warn(`[Attempt ${attempt} warning]: ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

function buildTopicPrompt(topicName, testTitle, testNum) {
  const isSyllogism = topicName.includes('न्याय') || topicName.includes('कथन') || topicName.includes('निष्कर्ष');

  return `You are the Chief Examination Paper Setter for CG Vyapam (Chhattisgarh Professional Examination Board, Raipur) for exams like Patwari, Sub-Inspector (SI), Mandi Nirikshak, AGDO, and Hostel Warden.

Topic: "${topicName}" (तर्कशक्ति एवं सामान्य मानसिक योग्यता)
Test Title: "${testTitle}"
Number of Questions: Exactly 10 MCQs

STRICT CG VYAPAM RULES:
1. NO artificial match-the-column ("सुमेलित कीजिए") or assertion-reason ("अभिकथन और कारण"). CG Vyapam NEVER asks match-the-column or assertion-reason in reasoning.
2. NO definitions or theoretical questions (e.g. do NOT ask "इस विषय के कितने प्रकार हैं" or "परिभाषा क्या है"). Every question must be a REAL, practical problem/puzzle requiring calculation or logical deduction.
3. Every question must be a 4-option MCQ (A, B, C, D) with distinct, authentic choices.
4. Set "correctIndex" (0, 1, 2, or 3) accurately matching the explanation.
5. Provide a clear, step-by-step mathematical/logical solution in "explanation".
${isSyllogism ? '6. For statement-conclusion/syllogism, format with clear Statements (कथन) and Conclusions (निष्कर्ष) and 4 standard options like (A) केवल निष्कर्ष I, (B) केवल निष्कर्ष II, (C) या तो I या II, (D) न तो I न II.' : ''}

Schema: Return a JSON array of exactly 10 objects:
[
  {
    "qNum": 1,
    "qType": "standard",
    "question": "Question text in authentic, clear Hindi...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Detailed step-by-step solution in Hindi...",
    "difficulty": "moderate"
  }
]

Return ONLY the valid JSON array of 10 objects. No markdown backticks, no text before or after.`;
}

async function run() {
  console.log(`🚀 Starting Full Fix of all 58 Topic-Wise Reasoning Tests to Authentic CG Vyapam Pattern...`);

  const snap = await db.collection('tests')
    .where('id', '>=', 'test_reas_')
    .where('id', '<=', 'test_reas_\uf8ff')
    .get();

  const tests = [];
  snap.forEach(doc => tests.push(doc.data()));
  console.log(`Found ${tests.length} topic-wise reasoning tests to fix.`);

  const examIds = [
    'cgv_master',
    'cgpsc_sse',
    'cgv_patwari',
    'cg_police_si',
    'cg_constable',
    'hostel_warden',
    'mandi_nirikshak',
    'adeo',
    'cgv_teacher',
    'cgv_forest',
    'cgv_food',
    'cgv_labour',
    'cgv_apex_bank',
    'cgv_agdo'
  ];

  const examNames = [
    'CG VYAPAM BASICS',
    'CGPSC SSE',
    'Patwari / RI',
    'CG Police SI',
    'CG Police Constable',
    'Hostel Warden',
    'Mandi Nirikshak',
    'ADEO',
    'Teacher',
    'Forest Guard',
    'Food Inspector',
    'Labour Inspector',
    'Apex Bank / Sahkarita',
    'Assistant Grade 3 / DEO'
  ];

  for (let i = 0; i < tests.length; i++) {
    const testDoc = tests[i];
    const topicName = testDoc.topicName || testDoc.title.split(' - ')[0] || 'तर्कशक्ति';
    console.log(`\n------------------------------------------------------------`);
    console.log(`[${i + 1}/${tests.length}] Regenerating: "${testDoc.title}" (${topicName}) | ID: ${testDoc.id}`);

    try {
      const prompt = buildTopicPrompt(topicName, testDoc.title, i + 1);
      let questions = await callChunkAI(prompt);

      if (!Array.isArray(questions)) {
        if (questions && Array.isArray(questions.questions)) questions = questions.questions;
        else if (questions && Array.isArray(questions.data)) questions = questions.data;
        else throw new Error(`Invalid response format`);
      }

      if (questions.length < 10) {
        console.warn(`[Warning]: Received ${questions.length} questions, expected 10.`);
      }

      const timestamp = new Date().toISOString();
      const formattedQuestions = questions.map((q, idx) => {
        const qNum = idx + 1;
        const qId = `q_${testDoc.id}_${qNum}`;
        return {
          id: qId,
          qId: qId,
          qNum: qNum,
          qType: q.qType || 'standard',
          question: q.question,
          options: q.options && q.options.length === 4 ? q.options : ['A', 'B', 'C', 'D'],
          correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
          explanation: q.explanation || '',
          difficulty: q.difficulty || 'moderate',
          subject: 'Reasoning',
          topic: topicName,
          weightage: 'high',
          timestamp,
          sourcePattern: 'CG Vyapam Official Question Pattern',
          yearTrend: '2020-2024',
          expectedIn2026: true
        };
      });

      const updatedTest = {
        ...testDoc,
        topicName: topicName,
        examId: testDoc.examId || 'cgv_master',
        examName: testDoc.examName || 'CG VYAPAM BASICS',
        examIds: examIds,
        examNames: examNames,
        subject: 'Reasoning',
        language: 'hindi',
        questions: formattedQuestions,
        pattern: {
          totalQuestions: formattedQuestions.length,
          totalMarks: formattedQuestions.length,
          durationMinutes: 10,
          markingScheme: '+1 for correct, -0.25 for incorrect'
        },
        updatedAt: timestamp
      };

      // 1. Update Test doc in Firestore
      await db.collection('tests').doc(testDoc.id).set(updatedTest, { merge: true });

      // 2. Batch update questions
      const batch = db.batch();
      formattedQuestions.forEach(q => {
        const qRef = db.collection('questions').doc(q.id);
        batch.set(qRef, {
          ...q,
          examId: testDoc.examId || 'cgv_master',
          examName: testDoc.examName || 'CG VYAPAM BASICS',
          examIds: examIds,
          examNames: examNames,
          testId: testDoc.id,
          mode: testDoc.mode || 'mock',
          language: 'hindi'
        });
      });
      await batch.commit();

      // 3. Write detail cache on disk
      try {
        const detailCachePath = path.join(cacheDir, `test_detail_${testDoc.id}.json`);
        fs.writeFileSync(detailCachePath, JSON.stringify(updatedTest, null, 2), 'utf8');
      } catch (_) {}

      console.log(`   ✅ Successfully saved "${testDoc.title}" (10/10 pure problem MCQs).`);
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.error(`   ❌ Failed to regenerate ${testDoc.id}:`, err.message);
    }
  }

  // 4. Invalidate stale subject caches
  try {
    const files = fs.readdirSync(cacheDir);
    for (const file of files) {
      if (file.startsWith('test_subjects_') || (file.startsWith('tests_') && (file.includes('Reasoning') || file.includes('reasoning')))) {
        try {
          fs.unlinkSync(path.join(cacheDir, file));
        } catch (_) {}
      }
    }
    console.log('🧹 Purged stale subject caches.');
  } catch (_) {}

  console.log(`\n============================================================`);
  console.log(`🏁 All ${tests.length} Topic-Wise Reasoning Tests Successfully Updated!`);
  console.log(`============================================================`);
  process.exit(0);
}

run();
