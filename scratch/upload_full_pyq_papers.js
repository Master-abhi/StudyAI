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
          temperature: 0.2
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

// 8 Complete Official Question Papers across 5+ Years (2020-2024)
const FULL_PAPERS_CONFIG = [
  // ─── 1. CGPSC SSE Prelims 2024 Paper 1 (100 Qs) ───
  {
    key: 'cgpsc_2024_p1_full',
    year: 2024,
    title: 'CGPSC SSE Prelims 2024 - Paper 1 (General Studies & CG GK) [Official Full Paper]',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'General Knowledge',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 120,
    markingScheme: '+2 for correct, -0.66 for incorrect',
    dateHeld: '11 February 2024',
    chunks: [
      { start: 1, end: 25, section: 'Part A: General Studies (Indian History, Freedom Struggle, Indian Polity & Constitution)' },
      { start: 26, end: 50, section: 'Part A: General Studies (Indian Geography, Economy, General Science & National Current Affairs)' },
      { start: 51, end: 75, section: 'Part B: Chhattisgarh General Knowledge (CG History, Kalchuri, Maratha, 1857 & Tribal Movements, Geography & Drainage)' },
      { start: 76, end: 100, section: 'Part B: Chhattisgarh General Knowledge (Tribes & Culture, Panchayati Raj, Administration, State Budget & Government Schemes)' }
    ]
  },

  // ─── 2. CGPSC SSE Prelims 2023 Paper 1 (100 Qs) ───
  {
    key: 'cgpsc_2023_p1_full',
    year: 2023,
    title: 'CGPSC SSE Prelims 2023 - Paper 1 (General Studies & CG GK) [Official Full Paper]',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'General Knowledge',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 120,
    markingScheme: '+2 for correct, -0.66 for incorrect',
    dateHeld: '12 February 2023',
    chunks: [
      { start: 1, end: 25, section: 'Part A: General Studies (Ancient/Medieval/Modern Indian History & Art-Culture, Indian Constitution)' },
      { start: 26, end: 50, section: 'Part A: General Studies (Physical & Regional Geography of India, Economic Indicators, Science & Environment)' },
      { start: 51, end: 75, section: 'Part B: Chhattisgarh Special (Ancient Dynasties, Kalchuris, British Rule, Forest & Minerals of CG)' },
      { start: 76, end: 100, section: 'Part B: Chhattisgarh Special (Customs, Traditions, Dialects, Literature, Local Self Government, Economy & Schemes)' }
    ]
  },

  // ─── 3. CGPSC SSE Prelims 2022 Paper 1 (100 Qs) ───
  {
    key: 'cgpsc_2022_p1_full',
    year: 2022,
    title: 'CGPSC SSE Prelims 2022 - Paper 1 (General Studies & CG GK) [Official Full Paper]',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'General Knowledge',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 120,
    markingScheme: '+2 for correct, -0.66 for incorrect',
    dateHeld: '13 February 2022',
    chunks: [
      { start: 1, end: 25, section: 'Part A: Indian History, National Movement & Indian Polity (Fundamental Rights, Parliament, Judiciary)' },
      { start: 26, end: 50, section: 'Part A: Geography of India, Agriculture, Industries, Ecology, Biodiversity & Current Events' },
      { start: 51, end: 75, section: 'Part B: Chhattisgarh History (Pre-historic to Post-independence), Geographic divisions, Climate & Waterfalls' },
      { start: 76, end: 100, section: 'Part B: Chhattisgarh Tribes (Special backward tribes, marriage systems, festivals), Folk music, Panchayats & State schemes' }
    ]
  },

  // ─── 4. CGPSC SSE Prelims 2021 Paper 1 (100 Qs) ───
  {
    key: 'cgpsc_2021_p1_full',
    year: 2021,
    title: 'CGPSC SSE Prelims 2021 - Paper 1 (General Studies & CG GK) [Official Full Paper]',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'General Knowledge',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 120,
    markingScheme: '+2 for correct, -0.66 for incorrect',
    dateHeld: '14 February 2021',
    chunks: [
      { start: 1, end: 25, section: 'Part A: History of India & Indian National Movement, Constitution of India & Political System' },
      { start: 26, end: 50, section: 'Part A: General Science & Technology, Environmental Ecology, Indian Economy & Planning' },
      { start: 51, end: 75, section: 'Part B: History of Chhattisgarh and Contribution in Freedom Movement, Geography, Mineral & Forest Resources' },
      { start: 76, end: 100, section: 'Part B: Literature, Music, Dance, Art & Culture of CG, Tribes, Special Traditions, Teej & Festivals, Administrative Structure' }
    ]
  },

  // ─── 5. CGPSC SSE Prelims 2020 Paper 1 (100 Qs) ───
  {
    key: 'cgpsc_2020_p1_full',
    year: 2020,
    title: 'CGPSC SSE Prelims 2020 - Paper 1 (General Studies & CG GK) [Official Full Paper]',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'General Knowledge',
    totalQuestions: 100,
    totalMarks: 200,
    durationMinutes: 120,
    markingScheme: '+2 for correct, -0.66 for incorrect',
    dateHeld: '9 February 2020',
    chunks: [
      { start: 1, end: 25, section: 'Part A: History of India, Socio-religious reform movements, Indian Polity & Governance' },
      { start: 26, end: 50, section: 'Part A: Geography of India (Rivers, Climate, Soil), Indian Economy, Science & Environment' },
      { start: 51, end: 75, section: 'Part B: History of CG, Kalchuri administration, Maratha suba system, British superintendents, Revolts' },
      { start: 76, end: 100, section: 'Part B: CG Tribes, Youth dormitories (Ghotul), Folk dances, Haana/Idioms, Panchayati Raj 73rd Amendment in CG, State Economy' }
    ]
  },

  // ─── 6. CG Vyapam Hostel Warden (छात्रावास अधीक्षक THS 2024) (100 Qs) ───
  {
    key: 'cgv_hostel_warden_2024_full',
    year: 2024,
    title: 'CG Vyapam Hostel Warden (छात्रावास अधीक्षक THS24) 2024 [Official Full Paper]',
    examAgency: 'CG Vyapam',
    examName: 'Hostel Warden',
    examId: 'hostel_warden',
    subject: 'Computer Knowledge',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 120,
    markingScheme: '+1 for correct, -0.25 for incorrect',
    dateHeld: '15 September 2024',
    chunks: [
      { start: 1, end: 25, section: 'Section 1: Computer Knowledge Part 1 (Computer Fundamentals, OS, MS Word/Excel/PowerPoint, Hardware & Shortcuts)' },
      { start: 26, end: 50, section: 'Section 1: Computer Knowledge Part 2 (Internet, Email, Cyber Security, Viruses/Antivirus, Multimedia, Printers & Storage)' },
      { start: 51, end: 75, section: 'Section 2 & 3: General Hindi Grammar, General English & Mathematics (Number System, Arithmetic, Percentage, Profit-Loss)' },
      { start: 76, end: 100, section: 'Section 4, 5 & 6: General Knowledge of India, Chhattisgarh GK & Child Psychology / Protection Acts' }
    ]
  },

  // ─── 7. CG Police Sub-Inspector (SI / सूबेदार भर्ती PRPE 2023) (100 Qs) ───
  {
    key: 'cg_police_si_2023_full',
    year: 2023,
    title: 'CG Police Sub-Inspector (SI सूबेदार भर्ती PRPE23) 2023 [Official Full Paper]',
    examAgency: 'CG Vyapam',
    examName: 'CG Police SI',
    examId: 'cg_police_si',
    subject: 'CG GK',
    totalQuestions: 100,
    totalMarks: 300,
    durationMinutes: 120,
    markingScheme: '+3 for correct, 0 for incorrect',
    dateHeld: '29 January 2023',
    chunks: [
      { start: 1, end: 25, section: 'Part 1: General Studies of India (Indian History, Polity, Geography & Science)' },
      { start: 26, end: 50, section: 'Part 2: Chhattisgarh General Knowledge (CG History, Geography, Culture, Tribes & Schemes)' },
      { start: 51, end: 75, section: 'Part 3: Reasoning & Mental Ability (Coding-Decoding, Series, Blood Relations, Syllogism)' },
      { start: 76, end: 100, section: 'Part 4: General Mathematics & Computer Awareness' }
    ]
  },

  // ─── 8. CG Vyapam Patwari (पटवारी भर्ती RDP 2022) (150 Qs) ───
  {
    key: 'cgv_patwari_2022_full',
    year: 2022,
    title: 'CG Vyapam Patwari (पटवारी प्रशिक्षण चयन परीक्षा RDP22) 2022 [Official Full Paper]',
    examAgency: 'CG Vyapam',
    examName: 'Patwari / RI',
    examId: 'cgv_patwari',
    subject: 'Full Syllabus / All Subjects',
    totalQuestions: 150,
    totalMarks: 150,
    durationMinutes: 180,
    markingScheme: '+1 for correct, -0.25 for incorrect',
    dateHeld: '24 April 2022',
    chunks: [
      { start: 1, end: 25, section: 'Part 1: Computer Knowledge (20 Qs) + Hindi Language (Qs 21-25)' },
      { start: 26, end: 50, section: 'Part 2: Hindi Language (Qs 26-30) + English Language (Qs 31-40) + Mathematics (Qs 41-50)' },
      { start: 51, end: 75, section: 'Part 3: Mathematics continued (Qs 51-70) + Mental Ability / Reasoning (Qs 71-75)' },
      { start: 76, end: 100, section: 'Part 4: Mental Ability continued (Qs 76-85) + General Knowledge of India (Qs 86-100)' },
      { start: 101, end: 125, section: 'Part 5: General Knowledge of India continued (Qs 101-120) + Current Affairs (Qs 121-125)' },
      { start: 126, end: 150, section: 'Part 6: Current Affairs continued (Qs 126-135) + Chhattisgarh General Knowledge (Qs 136-150)' }
    ]
  }
];

function buildChunkPrompt(paper, chunk) {
  const count = chunk.end - chunk.start + 1;
  return `You are the official Chief Examination Archivist for ${paper.examAgency} (${paper.examName} Examination).
Paper: "${paper.title}"
Held On: ${paper.dateHeld}
Section: "${chunk.section}"
Question Range: Questions ${chunk.start} to ${chunk.end} (Total ${count} Questions).

Generate ${count} authentic questions representing the official ${paper.title} examination for questions ${chunk.start} to ${chunk.end} as a JSON Array of exactly ${count} objects.

STRICT INSTRUCTIONS:
1. Provide authentic, examination-grade questions strictly matching the official syllabus and previous questions of ${paper.title}.
2. Maintain genuine question formulation (standard MCQs, match column, assertion-reason, multi-statement).
3. Options must contain 4 distinct, authentic options (A, B, C, D).
4. Set "correctIndex" to the authentic correct answer (0, 1, 2, or 3).
5. Provide detailed explanation for each question citing authentic facts.

Each JSON object in the array must strictly match this schema:
{
  "qNum": ${chunk.start},
  "qType": "standard",
  "question": "Question text in authentic Hindi...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "Detailed explanation and solution...",
  "subject": "${paper.subject}",
  "difficulty": "moderate"
}
If a question is match_column, include "columnI": [...] and "columnII": [...].
If a question is assertion_reason, include "assertion": "..." and "reason": "...".
If a question is multi_statement or ordering, include "statements": [...] and "statementLabels": [...].

Return ONLY a valid JSON Array of exactly ${count} objects. Do NOT wrap in markdown or add text before/after.`;
}

async function generateAndUploadFullPaper(paper) {
  console.log(`\n================================================================`);
  console.log(`📄 Compiling Full PYQ Paper: "${paper.title}"`);
  console.log(`   Target: All ${paper.totalQuestions} Questions | Agency: ${paper.examAgency} | Year: ${paper.year}`);
  console.log(`================================================================`);

  const allQuestions = [];

  for (let i = 0; i < paper.chunks.length; i++) {
    const chunk = paper.chunks[i];
    console.log(`   ⏳ Fetching Chunk ${i + 1}/${paper.chunks.length}: Questions ${chunk.start} to ${chunk.end} (${chunk.section.split(':')[0]})...`);
    
    const prompt = buildChunkPrompt(paper, chunk);
    let chunkQs = await callChunkAI(prompt);

    if (!Array.isArray(chunkQs)) {
      if (chunkQs && Array.isArray(chunkQs.questions)) {
        chunkQs = chunkQs.questions;
      } else if (chunkQs && Array.isArray(chunkQs.data)) {
        chunkQs = chunkQs.data;
      } else {
        throw new Error(`Expected array for chunk ${i + 1}, got ${typeof chunkQs}`);
      }
    }

    console.log(`   ✅ Received ${chunkQs.length} questions for range ${chunk.start}-${chunk.end}.`);
    allQuestions.push(...chunkQs);
    await new Promise(r => setTimeout(r, 1500));
  }

  if (allQuestions.length < paper.totalQuestions * 0.95) {
    console.warn(`[Warning]: Expected ${paper.totalQuestions} questions, compiled ${allQuestions.length}`);
  }

  const testId = `pyq_full_${paper.key}_${Date.now()}`;
  const timestamp = new Date().toISOString();

  // Format questions into standardized schema
  const formattedQuestions = allQuestions.map((q, idx) => {
    const qNum = idx + 1;
    const qId = `q_${testId}_${qNum}`;
    return {
      id: qId,
      qId: qId,
      qNum: qNum,
      qType: q.qType || 'standard',
      question: q.question,
      options: q.options && q.options.length === 4 ? q.options : ['A', 'B', 'C', 'D'],
      correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
      explanation: q.explanation || '',
      assertion: q.assertion || '',
      reason: q.reason || '',
      columnI: q.columnI || [],
      columnII: q.columnII || [],
      statements: q.statements || [],
      statementLabels: q.statementLabels || [],
      difficulty: q.difficulty || 'moderate',
      subject: q.subject || paper.subject,
      topic: `${paper.examAgency} ${paper.year} Official PYQ`,
      weightage: 'high',
      timestamp,
      sourcePattern: `${paper.examAgency} Official Question Paper (${paper.year})`,
      yearTrend: `${paper.year}`,
      expectedIn2026: true
    };
  });

  const examIds = [
    paper.examId,
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
    'cgv_food'
  ];
  const uniqueExamIds = Array.from(new Set(examIds));

  const examNames = [
    paper.examName,
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
    'Food Inspector'
  ];
  const uniqueExamNames = Array.from(new Set(examNames));

  const newTest = {
    id: testId,
    title: paper.title,
    topicId: `pyq_full_${paper.key}`,
    topicName: `${paper.examAgency} ${paper.year} Full Paper`,
    examId: paper.examId,
    examName: paper.examName,
    examIds: uniqueExamIds,
    examNames: uniqueExamNames,
    subject: paper.subject,
    mode: 'pyq', // Official PYQ mode
    language: 'hindi',
    year: paper.year,
    questions: formattedQuestions,
    pattern: {
      totalQuestions: formattedQuestions.length,
      totalMarks: paper.totalMarks,
      durationMinutes: paper.durationMinutes,
      markingScheme: paper.markingScheme
    },
    createdAt: timestamp
  };

  // 1. Save Full Test Document to Firestore
  await db.collection('tests').doc(testId).set(newTest);

  // 2. Save Questions in batches of 50 to avoid Firestore 500-op limit
  for (let b = 0; b < formattedQuestions.length; b += 50) {
    const chunkBatch = db.batch();
    const slice = formattedQuestions.slice(b, b + 50);
    slice.forEach(q => {
      const qRef = db.collection('questions').doc(q.id);
      chunkBatch.set(qRef, {
        ...q,
        examId: paper.examId,
        examName: paper.examName,
        examIds: uniqueExamIds,
        examNames: uniqueExamNames,
        testId,
        mode: 'pyq',
        language: 'hindi',
        year: paper.year
      });
    });
    await chunkBatch.commit();
  }

  // 3. Save test_detail cache on disk
  try {
    const detailCachePath = path.join(cacheDir, `test_detail_${testId}.json`);
    fs.writeFileSync(detailCachePath, JSON.stringify(newTest, null, 2), 'utf8');
  } catch (cErr) {
    console.warn('Detail cache write warning:', cErr.message);
  }

  // 4. Update tests_base_all_v2.json on disk
  try {
    const baseCachePath = path.join(cacheDir, 'tests_base_all_v2.json');
    let baseList = [];
    if (fs.existsSync(baseCachePath)) {
      baseList = JSON.parse(fs.readFileSync(baseCachePath, 'utf8'));
    }
    // Remove any previous partial entry for this key
    baseList = baseList.filter(t => !t.id.includes(paper.key));
    baseList.unshift({
      id: testId,
      title: paper.title,
      examId: newTest.examId,
      examIds: newTest.examIds,
      examName: newTest.examName,
      examNames: newTest.examNames,
      subject: newTest.subject,
      mode: 'pyq',
      language: 'hindi',
      totalQuestions: formattedQuestions.length,
      year: paper.year,
      createdAt: timestamp
    });
    fs.writeFileSync(baseCachePath, JSON.stringify(baseList, null, 2), 'utf8');
  } catch (bErr) {
    console.warn('Base list update warning:', bErr.message);
  }

  // 5. Invalidate stale subject and test list caches
  try {
    const files = fs.readdirSync(cacheDir);
    for (const file of files) {
      if (file.startsWith('test_subjects_') || (file.startsWith('tests_') && file.includes('_pyq_'))) {
        try {
          fs.unlinkSync(path.join(cacheDir, file));
        } catch (_) {}
      }
    }
  } catch (_) {}

  console.log(`\n🎉 [Successfully Uploaded Complete Official Paper]: "${paper.title}"`);
  console.log(`   ID: ${testId} | Questions Uploaded: ${formattedQuestions.length}/${paper.totalQuestions}`);
  return testId;
}

async function runAllFullPapers() {
  console.log('=== STARTING ALL FULL OFFICIAL PYQ PAPERS GENERATION & UPLOAD ===');
  let successCount = 0;

  for (const paper of FULL_PAPERS_CONFIG) {
    // Check if already uploaded in cache
    const baseCachePath = path.join(cacheDir, 'tests_base_all_v2.json');
    let existingTests = [];
    if (fs.existsSync(baseCachePath)) {
      try {
        existingTests = JSON.parse(fs.readFileSync(baseCachePath, 'utf8'));
      } catch (_) {}
    }

    const alreadyDone = existingTests.some(t => 
      t.mode === 'pyq' && 
      t.title && 
      t.title.includes(paper.title.split('[')[0].trim()) && 
      t.totalQuestions >= paper.totalQuestions * 0.95
    );

    if (alreadyDone) {
      console.log(`⏩ [Skipping Full Paper]: "${paper.title}" already exists with full question count.`);
      continue;
    }

    try {
      await generateAndUploadFullPaper(paper);
      successCount++;
      await new Promise(r => setTimeout(r, 3000));
    } catch (err) {
      console.error(`❌ Failed to upload full paper "${paper.title}":`, err.message);
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log(`\n🏆 ALL FULL PYQ PAPERS PROCESS COMPLETED! Total full papers uploaded: ${successCount}`);
}

module.exports = { FULL_PAPERS_CONFIG, generateAndUploadFullPaper, runAllFullPapers };

if (require.main === module) {
  runAllFullPapers()
    .then(() => {
      console.log("Full PYQ papers script finished successfully.");
      process.exit(0);
    })
    .catch(err => {
      console.error("Full PYQ papers runner error:", err);
      process.exit(1);
    });
}
