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
      console.warn(`[Chunk attempt ${attempt} warning]: ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

// 10 Vyapam Reasoning Quizzes (10 Questions Each)
const REASONING_QUIZZES = [
  { num: 1, testId: 'quiz_mix_reasoning_01_1792392750110', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 01' },
  { num: 2, testId: 'quiz_mix_reasoning_02_1792392760743', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 02' },
  { num: 3, testId: 'quiz_mix_reasoning_03_1792392771294', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 03' },
  { num: 4, testId: 'quiz_mix_reasoning_04_1792394954930', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 04' },
  { num: 5, testId: 'quiz_mix_reasoning_05_1792394965896', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 05' },
  { num: 6, testId: 'quiz_mix_reasoning_06_1792394975937', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 06' },
  { num: 7, testId: 'quiz_mix_reasoning_07_1792394997217', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 07' },
  { num: 8, testId: 'quiz_mix_reasoning_08_1792395009171', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 08' },
  { num: 9, testId: 'quiz_mix_reasoning_09_1792395020343', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 09' },
  { num: 10, testId: 'quiz_mix_reasoning_10_1792395030820', title: 'तर्कशक्ति (Reasoning) - Mixed Quiz 10' }
];

function buildReasoningPrompt(quizNum) {
  return `You are the Chief Examination Paper Setter for CG Vyapam (Chhattisgarh Professional Examination Board, Raipur) for exams like Patwari (RDP), Sub-Inspector (PRPE), Mandi Nirikshak (MSI), Hostel Warden (THS), and Assistant Grade-3 / DEO (AGDO).

Target: Generate 10 authentic, practical problem-solving examination questions for:
"सामान्य मानसिक योग्यता / रीजनिंग (General Mental Ability) - Set ${quizNum}"

STRICT CG VYAPAM PATTERN RULES:
1. NO artificial match-the-column ("सुमेलित कीजिए") or assertion-reason ("अभिकथन और कारण"). CG Vyapam NEVER asks match-the-column or assertion-reason in reasoning.
2. NO theoretical/definition questions (e.g. "रीजनिंग क्या है" or "सिलोगिज्म की परिभाषा"). Every question must be a REAL applied puzzle/problem with exact calculations or logical deduction.
3. Every question must have 4 distinct, plausible options (A, B, C, D) and a clear, mathematically sound step-by-step solution in the "explanation".
4. The 10 questions must strictly cover these exact 10 topics:
   - Q1: कोडिंग - डिकोडिंग (Coding-Decoding: Letter shifting, number coding or word replacement)
   - Q2: संख्या श्रृंखला या लुप्त संख्या (Number Series / Missing number in matrix: e.g. difference, multiplication + addition, square/cube)
   - Q3: सादृश्यता / समानता (Analogy: Word or number analogy, e.g. अखबार : पाठक :: रोटी : ?)
   - Q4: वर्गीकरण / विषम चुनना (Classification / Odd One Out: 4 options where 3 share a property and 1 is odd)
   - Q5: रक्त संबंध (Blood Relations: Photo pointing statement "मेरी माता के इकलौते भाई..." or coded relation)
   - Q6: दिशा एवं दूरी (Direction & Distance: Walking turns, final direction and distance from start point, or compass angle rotation)
   - Q7: क्रम एवं स्थान व्यवस्था (Ranking & Ordering: Left/Right rank, swapping positions, total persons in line)
   - Q8: गणितीय संक्रियाएं (Mathematical Operations / BODMAS: Symbol substitution e.g. 'P' means '+', 'Q' means '-'...)
   - Q9: पासा या वेन आरेख (Dice opposite face or Geometric Venn Diagram counting)
   - Q10: शब्दों का तार्किक क्रम (Logical sequence of words as standard MCQ e.g. बीज, अंकुर, पौधा, फूल, फल) OR कथन एवं निष्कर्ष (Syllogism)

Schema: Return a JSON array of exactly 10 objects:
[
  {
    "qNum": 1,
    "qType": "standard", // or "multi_statement" if syllogism
    "question": "Question text in authentic, clear Hindi...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0, // 0, 1, 2, or 3
    "explanation": "Step-by-step mathematical/logical solution...",
    "difficulty": "moderate",
    "subject": "Reasoning",
    "topic": "General Mental Ability"
  }
]

Return ONLY the valid JSON array of 10 objects. No markdown backticks, no text before or after.`;
}

async function run() {
  console.log(`🚀 Starting Full Fix of CG Vyapam Reasoning Quizzes (Total: ${REASONING_QUIZZES.length} Quizzes)...`);

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

  for (let i = 0; i < REASONING_QUIZZES.length; i++) {
    const qConf = REASONING_QUIZZES[i];
    console.log(`\n------------------------------------------------------------`);
    console.log(`Generating Vyapam Quiz [${i + 1}/${REASONING_QUIZZES.length}]: ${qConf.title} (ID: ${qConf.testId})`);

    const prompt = buildReasoningPrompt(qConf.num);
    let questions = await callChunkAI(prompt);

    if (!Array.isArray(questions)) {
      if (questions && Array.isArray(questions.questions)) questions = questions.questions;
      else if (questions && Array.isArray(questions.data)) questions = questions.data;
      else throw new Error(`Invalid response for quiz ${qConf.num}`);
    }

    console.log(`   ✅ Received ${questions.length} questions. Formatting...`);

    const timestamp = new Date().toISOString();
    const formattedQuestions = questions.map((q, idx) => {
      const qNum = idx + 1;
      const qId = `q_${qConf.testId}_${qNum}`;
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
        topic: 'General Mental Ability',
        weightage: 'high',
        timestamp,
        sourcePattern: 'CG Vyapam Official Question Pattern',
        yearTrend: '2020-2024',
        expectedIn2026: true
      };
    });

    const newTest = {
      id: qConf.testId,
      title: qConf.title,
      topicId: 'reasoning_general_mental_ability',
      topicName: 'सामान्य मानसिक योग्यता',
      examId: 'cgv_master',
      examName: 'CG VYAPAM BASICS',
      examIds: examIds,
      examNames: examNames,
      subject: 'Reasoning',
      mode: 'quiz',
      language: 'hindi',
      questions: formattedQuestions,
      pattern: {
        totalQuestions: formattedQuestions.length,
        totalMarks: formattedQuestions.length,
        durationMinutes: 10,
        markingScheme: '+1 for correct, -0.25 for incorrect'
      },
      createdAt: timestamp
    };

    // 1. Update test document in Firestore
    await db.collection('tests').doc(qConf.testId).set(newTest);

    // 2. Update individual questions in batch
    const batch = db.batch();
    formattedQuestions.forEach(q => {
      const qRef = db.collection('questions').doc(q.id);
      batch.set(qRef, {
        ...q,
        examId: 'cgv_master',
        examName: 'CG VYAPAM BASICS',
        examIds: examIds,
        examNames: examNames,
        testId: qConf.testId,
        mode: 'quiz',
        language: 'hindi'
      });
    });
    await batch.commit();

    // 3. Write detail cache on disk
    try {
      const detailCachePath = path.join(cacheDir, `test_detail_${qConf.testId}.json`);
      fs.writeFileSync(detailCachePath, JSON.stringify(newTest, null, 2), 'utf8');
    } catch (_) {}

    console.log(`   💾 Saved ${qConf.title} to Firestore & local cache.`);
    await new Promise(r => setTimeout(r, 1500));
  }

  // Invalidate stale caches
  try {
    const files = fs.readdirSync(cacheDir);
    for (const file of files) {
      if (file.startsWith('test_subjects_') || file.includes('Reasoning') || file.includes('reasoning')) {
        try {
          fs.unlinkSync(path.join(cacheDir, file));
        } catch (_) {}
      }
    }
    console.log('   🧹 Stale caches invalidated.');
  } catch (_) {}

  console.log(`\n============================================================`);
  console.log(`🏁 All 10 Reasoning Quizzes successfully updated to authentic CG Vyapam pattern!`);
  console.log(`============================================================`);
  process.exit(0);
}

run();
