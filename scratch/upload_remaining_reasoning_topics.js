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

// 17 Remaining Topics in the Reasoning Syllabus
const REMAINING_TOPICS = [
  { id: 'reas_ser_1', nameHi: 'संख्या श्रेणी', name: 'Number Series', chapter: 'श्रृंखला एवं अनुक्रम' },
  { id: 'reas_syl_3', nameHi: 'कथन एवं तर्क', name: 'Statement and Argument', chapter: 'तार्किक क्षमता' },
  { id: 'reas_ana_4', nameHi: 'पहेली परीक्षण', name: 'Puzzle Test', chapter: 'तार्किक योग्यता' },
  { id: 'reas_ana_5', nameHi: 'इनपुट आउटपुट', name: 'Input Output', chapter: 'तार्किक योग्यता' },
  { id: 'reas_ana_6', nameHi: 'डेटा पर्याप्तता', name: 'Data Sufficiency', chapter: 'तार्किक योग्यता' },
  { id: 'reas_nv_1', nameHi: 'दर्पण प्रतिबिंब', name: 'Mirror Image', chapter: 'अशाब्दिक तर्कशक्ति' },
  { id: 'reas_nv_2', nameHi: 'जल प्रतिबिंब', name: 'Water Image', chapter: 'अशाब्दिक तर्कशक्ति' },
  { id: 'reas_nv_3', nameHi: 'कागज मोड़ना', name: 'Paper Folding', chapter: 'अशाब्दिक तर्कशक्ति' },
  { id: 'reas_nv_4', nameHi: 'कागज काटना', name: 'Paper Cutting', chapter: 'अशाब्दिक तर्कशक्ति' },
  { id: 'reas_nv_5', nameHi: 'अंतर्निहित आकृतियाँ', name: 'Embedded Figures', chapter: 'अशाब्दिक तर्कशक्ति' },
  { id: 'reas_nv_6', nameHi: 'आकृति पूर्ण करना', name: 'Figure Completion', chapter: 'अशाब्दिक तर्कशक्ति' },
  { id: 'reas_dm_1', nameHi: 'निर्णय क्षमता', name: 'Decision Making', chapter: 'विश्लेषणात्मक तर्कशक्ति' },
  { id: 'reas_dm_2', nameHi: 'कारण एवं प्रभाव', name: 'Cause and Effect', chapter: 'विश्लेषणात्मक तर्कशक्ति' },
  { id: 'reas_dm_3', nameHi: 'कार्यवाही का मार्ग', name: 'Course of Action', chapter: 'विश्लेषणात्मक तर्कशक्ति' },
  { id: 'reas_adv_1', nameHi: 'तार्किक तर्क', name: 'Logical Reasoning', chapter: 'उच्च स्तरीय तर्कशक्ति' },
  { id: 'reas_adv_2', nameHi: 'आलोचनात्मक तर्क', name: 'Critical Reasoning', chapter: 'उच्च स्तरीय तर्कशक्ति' },
  { id: 'reas_adv_3', nameHi: 'अभिकथन एवं कारण', name: 'Assertion and Reason', chapter: 'उच्च स्तरीय तर्कशक्ति' }
];

function buildPrompt(topic, testNum) {
  return `You are the Chief Examination Paper Setter for CG Vyapam (Raipur, Chhattisgarh) for exams like Patwari, Police SI, Mandi Nirikshak, AGDO, and Hostel Warden.

Subject: सामान्य मानसिक योग्यता (Reasoning & Mental Ability)
Topic: "${topic.nameHi} (${topic.name})"
Chapter: "${topic.chapter}"
Test: Test 0${testNum} (10 Questions)

STRICT RULES FOR CG VYAPAM MCQs:
1. 100% applied problem-solving questions. No definition or meta-theory questions.
2. Every question must be a standard MCQ with 4 distinct options (A, B, C, D).
3. Set "correctIndex" accurately (0, 1, 2, or 3) matching the options and the explanation.
4. For non-verbal questions (Mirror Image, Water Image, Paper Folding, etc.), describe the word/number/shape pattern clearly in text/symbols (e.g. 'REASONING' का दर्पण प्रतिबिंब या दिए गए संयोजन का जल प्रतिबिंब) and provide 4 clear options.
5. Provide a step-by-step mathematical/logical explanation in Hindi for every question.

Return a JSON array of exactly 10 objects:
[
  {
    "qNum": 1,
    "qType": "standard",
    "question": "Question in Hindi...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Step-by-step logic and solution...",
    "difficulty": "moderate"
  }
]

Return ONLY valid JSON array. Do NOT wrap in markdown or backticks.`;
}

async function run() {
  console.log(`🚀 Starting Generation & Upload for 17 Remaining Reasoning Topics (34 Tests Total)...`);

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

  const baseListPath = path.join(cacheDir, 'tests_base_all_v2.json');
  let baseList = [];
  if (fs.existsSync(baseListPath)) {
    baseList = JSON.parse(fs.readFileSync(baseListPath, 'utf8'));
  }

  let totalUploaded = 0;

  for (let tIdx = 0; tIdx < REMAINING_TOPICS.length; tIdx++) {
    const topic = REMAINING_TOPICS[tIdx];
    console.log(`\n============================================================`);
    console.log(`Topic [${tIdx + 1}/${REMAINING_TOPICS.length}]: ${topic.nameHi} (${topic.name})`);
    console.log(`============================================================`);

    // Generate 2 tests per topic (Test 01 and Test 02)
    for (let testNum = 1; testNum <= 2; testNum++) {
      const testId = `test_reas_${topic.id}_0${testNum}_${Date.now()}`;
      const title = `${topic.nameHi} - Test 0${testNum}`;
      console.log(`   ⏳ Generating ${title}...`);

      try {
        const prompt = buildPrompt(topic, testNum);
        let questions = await callChunkAI(prompt);

        if (!Array.isArray(questions)) {
          if (questions && Array.isArray(questions.questions)) questions = questions.questions;
          else if (questions && Array.isArray(questions.data)) questions = questions.data;
          else throw new Error(`Invalid AI response format`);
        }

        const timestamp = new Date().toISOString();
        const formattedQuestions = questions.map((q, idx) => {
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
            difficulty: q.difficulty || 'moderate',
            subject: 'Reasoning',
            topic: topic.nameHi,
            weightage: 'high',
            timestamp,
            sourcePattern: 'CG Vyapam Official Question Pattern',
            yearTrend: '2020-2024',
            expectedIn2026: true
          };
        });

        const newTest = {
          id: testId,
          title: title,
          topicId: topic.id,
          topicName: topic.nameHi,
          examId: 'cgv_master',
          examName: 'CG VYAPAM BASICS',
          examIds: examIds,
          examNames: examNames,
          subject: 'Reasoning',
          mode: 'mock',
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

        // 1. Save Test to Firestore
        await db.collection('tests').doc(testId).set(newTest);

        // 2. Save Questions in batch
        const batch = db.batch();
        formattedQuestions.forEach(q => {
          const qRef = db.collection('questions').doc(q.id);
          batch.set(qRef, {
            ...q,
            examId: 'cgv_master',
            examName: 'CG VYAPAM BASICS',
            examIds: examIds,
            examNames: examNames,
            testId: testId,
            mode: 'mock',
            language: 'hindi'
          });
        });
        await batch.commit();

        // 3. Save detail cache on disk
        try {
          const detailCachePath = path.join(cacheDir, `test_detail_${testId}.json`);
          fs.writeFileSync(detailCachePath, JSON.stringify(newTest, null, 2), 'utf8');
        } catch (_) {}

        // 4. Update base list in cache
        baseList.unshift({
          id: testId,
          title: title,
          examId: newTest.examId,
          examIds: newTest.examIds,
          examName: newTest.examName,
          examNames: newTest.examNames,
          subject: 'Reasoning',
          mode: 'mock',
          language: 'hindi',
          totalQuestions: formattedQuestions.length,
          createdAt: timestamp
        });

        console.log(`   ✅ Saved ${title} (10 Questions) to Firestore and cache.`);
        totalUploaded++;
        await new Promise(r => setTimeout(r, 1200));
      } catch (err) {
        console.error(`   ❌ Failed to generate ${title}:`, err.message);
      }
    }
  }

  // Save updated base list
  try {
    fs.writeFileSync(baseListPath, JSON.stringify(baseList, null, 2), 'utf8');
  } catch (_) {}

  // Invalidate stale subject caches
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
  console.log(`🏁 All ${totalUploaded} Tests for Remaining Topics Uploaded Successfully!`);
  console.log(`============================================================`);
  process.exit(0);
}

run();
