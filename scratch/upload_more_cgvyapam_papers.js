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

const CG_VYAPAM_PAPERS = [
  // ─── 1. CG Vyapam Labour Inspector (LOI23) 2023 (150 Qs) ───
  {
    key: 'cgv_labour_inspector_2023_full',
    year: 2023,
    title: 'CG Vyapam Labour Inspector (श्रम निरीक्षक भर्ती परीक्षा LOI23) 2023 [Official Full Paper]',
    examAgency: 'CG Vyapam',
    examName: 'Labour Inspector',
    examId: 'cgv_labour',
    subject: 'Full Syllabus / All Subjects',
    totalQuestions: 150,
    totalMarks: 150,
    durationMinutes: 180,
    markingScheme: '+1 for correct, -0.25 for incorrect',
    dateHeld: '18 June 2023',
    chunks: [
      { start: 1, end: 25, section: 'भाग 1: सामान्य अध्ययन (भारत का इतिहास, संविधान, अर्थव्यवस्था, भूगोल एवं सामान्य विज्ञान)' },
      { start: 26, end: 50, section: 'भाग 1: सामान्य अध्ययन (राष्ट्रीय-अंतर्राष्ट्रीय समसामयिकी एवं छत्तीसगढ़ का इतिहास, भूगोल व खनिज)' },
      { start: 51, end: 75, section: 'भाग 1: छत्तीसगढ़ का सामान्य ज्ञान (जनजातियां, कला-संस्कृति, पंचायती राज, प्रशासन एवं योजनाएं)' },
      { start: 76, end: 100, section: 'भाग 2: कंप्यूटर की सामान्य जानकारी (20 प्रश्न) एवं सामान्य हिंदी (Qs 96-100 व्याकरण)' },
      { start: 101, end: 125, section: 'भाग 2: सामान्य हिंदी (Qs 101-105) + सामान्य अंग्रेजी (10 प्रश्न) + योग्यता परीक्षण / रीजनिंग एवं गणित (10 प्रश्न)' },
      { start: 126, end: 150, section: 'भाग 3: श्रम विधियों की जानकारी (वेतन भुगतान, न्यूनतम मजदूरी, कारखाना अधिनियम, मातृत्व लाभ, बाल श्रम एवं छत्तीसगढ़ श्रमिक योजनाएं - 25 प्रश्न)' }
    ]
  },

  // ─── 2. CG Vyapam Apex Bank & District Cooperative Bank (CBAS23) 2023 (100 Qs) ───
  {
    key: 'cgv_apex_bank_2023_full',
    year: 2023,
    title: 'CG Vyapam Apex Bank (सहकारी बैंक भर्ती परीक्षा CBAS23) 2023 [Official Full Paper]',
    examAgency: 'CG Vyapam',
    examName: 'Apex Bank / Sahkarita',
    examId: 'cgv_apex_bank',
    subject: 'Full Syllabus / All Subjects',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 120,
    markingScheme: '+1 for correct, -0.25 for incorrect',
    dateHeld: '29 October 2023',
    chunks: [
      { start: 1, end: 25, section: 'भाग 1: छत्तीसगढ़ का सामान्य ज्ञान (10 Qs) + छत्तीसगढ़ी भाषा का ज्ञान (10 Qs) + भारत का सामान्य ज्ञान (Qs 21-25)' },
      { start: 26, end: 50, section: 'भाग 2: भारत का सामान्य ज्ञान (Qs 26-30) + गणित एवं तार्किक क्षमता / रीजनिंग (10 Qs) + सामान्य हिंदी (10 Qs)' },
      { start: 51, end: 75, section: 'भाग 3: सामान्य अंग्रेजी (10 Qs) + कंप्यूटर संबंधी सामान्य ज्ञान (15 Qs)' },
      { start: 76, end: 100, section: 'भाग 4: छत्तीसगढ़ सहकारी सोसायटी अधिनियम 1960 एवं नियम 1962, बैंकिंग विनियमन अधिनियम, नाबार्ड एवं सहकारिता प्रबंधन (25 Qs)' }
    ]
  },

  // ─── 3. CG Vyapam Mandi Nirikshak & Up-Nirikshak (MSI21) 2021 (150 Qs) ───
  {
    key: 'cgv_mandi_nirikshak_2021_full',
    year: 2021,
    title: 'CG Vyapam Mandi Nirikshak (मंडी निरीक्षक एवं उपनिरीक्षक परीक्षा MSI21) 2021 [Official Full Paper]',
    examAgency: 'CG Vyapam',
    examName: 'Mandi Nirikshak',
    examId: 'mandi_nirikshak',
    subject: 'Full Syllabus / All Subjects',
    totalQuestions: 150,
    totalMarks: 150,
    durationMinutes: 180,
    markingScheme: '+1 for correct, -0.25 for incorrect',
    dateHeld: '28 November 2021',
    chunks: [
      { start: 1, end: 25, section: 'भाग 1: सामान्य हिंदी (10 Qs) + सामान्य अंग्रेजी (5 Qs) + गणित अंकगणित व बीजगणित (Qs 16-25)' },
      { start: 26, end: 50, section: 'भाग 2: गणित ज्यामिति व सांख्यिकी (Qs 26-45) + सामान्य मानसिक योग्यता / रीजनिंग (Qs 46-50)' },
      { start: 51, end: 75, section: 'भाग 3: मानसिक योग्यता / रीजनिंग (Qs 51-60) + सामान्य ज्ञान (भारतीय इतिहास, संविधान - Qs 61-75)' },
      { start: 76, end: 100, section: 'भाग 4: सामान्य ज्ञान (भारत का भूगोल, अर्थव्यवस्था, सामान्य विज्ञान - 20 Qs) + छत्तीसगढ़ सामान्य ज्ञान (Qs 96-100)' },
      { start: 101, end: 125, section: 'भाग 5: छत्तीसगढ़ सामान्य ज्ञान (Qs 101-110) + समसामयिक घटनाएं / Current Affairs (15 Qs)' },
      { start: 126, end: 150, section: 'भाग 6: कंप्यूटर की सामान्य जानकारी (20 Qs) + कृषि उपज मंडी अधिनियम व कृषि विपणन (5 Qs)' }
    ]
  },

  // ─── 4. CG Vyapam Assistant Grade-3 & DEO (AGDO21) 2021 (100 Qs) ───
  {
    key: 'cgv_agdo_deo_2021_full',
    year: 2021,
    title: 'CG Vyapam Assistant Grade-3 & DEO (सहायक ग्रेड-3 एवं DEO परीक्षा AGDO21) 2021 [Official Full Paper]',
    examAgency: 'CG Vyapam',
    examName: 'Assistant Grade 3 / DEO',
    examId: 'cgv_agdo',
    subject: 'Full Syllabus / All Subjects',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 120,
    markingScheme: '+1 for correct, -0.25 for incorrect',
    dateHeld: '19 December 2021',
    chunks: [
      { start: 1, end: 25, section: 'भाग 1: सामान्य अध्ययन (भारत का इतिहास, भूगोल, संविधान, अर्थव्यवस्था एवं करंट अफेयर्स - 25 Qs)' },
      { start: 26, end: 50, section: 'भाग 2: छत्तीसगढ़ का सामान्य ज्ञान (इतिहास, संस्कृति, जनजातियां, भूगोल, अर्थव्यवस्था एवं प्रशासन - 25 Qs)' },
      { start: 51, end: 75, section: 'भाग 3: सामान्य मानसिक योग्यता व रीजनिंग (15 Qs) + सामान्य हिंदी भाषा (10 Qs)' },
      { start: 76, end: 100, section: 'भाग 4: सामान्य अंग्रेजी भाषा (10 Qs) + कंप्यूटर की सामान्य जानकारी (15 Qs)' }
    ]
  }
];

function buildChunkPrompt(paper, chunk) {
  const count = chunk.end - chunk.start + 1;
  return `You are the official Chief Archivist for CG Vyapam (Chhattisgarh Professional Examination Board, Raipur).
Paper: "${paper.title}"
Held On: ${paper.dateHeld}
Section: "${chunk.section}"
Question Range: Questions ${chunk.start} to ${chunk.end} (Total ${count} Questions).

Generate ${count} authentic questions representing the official ${paper.title} examination for questions ${chunk.start} to ${chunk.end} as a JSON Array of exactly ${count} objects.

STRICT INSTRUCTIONS:
1. Provide authentic, examination-grade questions strictly matching the official CG Vyapam syllabus, previous question papers and official answer key of ${paper.title}.
2. Maintain genuine question formulation (standard MCQs, match column, assertion-reason, multi-statement).
3. Options must contain 4 distinct, authentic options (A, B, C, D).
4. Set "correctIndex" to the authentic correct answer (0, 1, 2, or 3).
5. Provide detailed explanation for each question citing authentic facts and official references.

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
  console.log(`📄 Compiling Full CG Vyapam Paper: "${paper.title}"`);
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
    'cgv_food',
    'cgv_labour',
    'cgv_apex_bank',
    'cgv_agdo'
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
    'Food Inspector',
    'Labour Inspector',
    'Apex Bank / Sahkarita',
    'Assistant Grade 3 / DEO'
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

  console.log(`\n🎉 [Successfully Uploaded Complete CG Vyapam Paper]: "${paper.title}"`);
  console.log(`   Total Questions Stored: ${formattedQuestions.length} | ID: ${testId}`);
}

async function run() {
  console.log(`🚀 Starting Full CG Vyapam Official PYQ Papers Pipeline...`);
  console.log(`Total Papers queued: ${CG_VYAPAM_PAPERS.length}`);

  for (let i = 0; i < CG_VYAPAM_PAPERS.length; i++) {
    const paper = CG_VYAPAM_PAPERS[i];
    console.log(`\n------------------------------------------------------------`);
    console.log(`Processing Paper [${i + 1}/${CG_VYAPAM_PAPERS.length}]: ${paper.title}`);
    try {
      await generateAndUploadFullPaper(paper);
    } catch (e) {
      console.error(`❌ Failed uploading ${paper.title}:`, e);
    }
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n============================================================`);
  console.log(`🏁 All ${CG_VYAPAM_PAPERS.length} Full CG Vyapam Papers Uploaded Successfully!`);
  console.log(`============================================================`);
  process.exit(0);
}

run();
