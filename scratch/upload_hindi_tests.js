const path = require('path');
const fs = require('fs');

require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const Groq = require(path.join(__dirname, '../server/node_modules/groq-sdk'));
const { GoogleGenerativeAI } = require(path.join(__dirname, '../server/node_modules/@google/generative-ai'));
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');

const SPECIAL_REGEX = /^(उपर्युक्त|उपरोक्त)\s*(सभी|में से कोई नहीं)|^(इनमें से कोई नहीं)$/i;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function cleanJsonText(raw) {
  let text = raw.trim();
  if (text.startsWith('```json')) text = text.replace(/^```json/, '');
  if (text.startsWith('```')) text = text.replace(/^```/, '');
  if (text.endsWith('```')) text = text.replace(/```$/, '');
  return text.trim();
}

async function callAI(prompt) {
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
  } catch (geminiErr) {
    console.warn(`[Gemini warning: ${geminiErr.message}]. Trying Groq Qwen fallback...`);
  }

  const res = await groqClient.chat.completions.create({
    model: 'qwen/qwen3.8-27b',
    messages: [
      {
        role: 'system',
        content: 'You are an expert Hindi language examiner for CG Vyapam and CGPSC. Return ONLY a valid JSON array of 10 objects.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 4096
  });
  const text = cleanJsonText(res.choices[0].message.content);
  return JSON.parse(text);
}

function buildPrompt(topic, chapter, testNum) {
  return `आप छत्तीसगढ़ व्यावसायिक परीक्षा मंडल (CG Vyapam - पटवारी, आरआई, छात्रावास अधीक्षक, सहायक ग्रेड-3, मंडी निरीक्षक) एवं CGPSC के वरिष्ठ हिंदी भाषा परीक्षक हैं।
विषय: हिंदी भाषा
अध्याय: ${chapter}
टॉपिक: ${topic.nameHi} (${topic.name})
सब-टॉपिक्स: ${(topic.subtopics || []).join(', ')}
टेस्ट: Test 0${testNum}

आपको इस टॉपिक पर प्रामाणिक, उच्च-स्तरीय और शुद्ध व्याकरणिक 10 प्रश्नों (MCQs) का एक JSON Array तैयार करना है।

अति-महत्वपूर्ण नियम:
इस 10-प्रश्नों के सेट में निम्नलिखित 5 प्रकार के प्रश्न (Question Types) अनिवार्य रूप से शामिल होने चाहिए:
- Q1: "standard" (सामान्य 4 विकल्पों वाला बहुविकल्पीय प्रश्न)
- Q2: "match_column" (स्तंभ I और स्तंभ II को सुमेलित करने वाला प्रश्न)
- Q3: "assertion_reason" (अभिकथन [As] और कारण [R] वाला प्रश्न)
- Q4: "multi_statement" (कथन 1, 2, 3, 4 पर आधारित बहु-कथनीय प्रश्न)
- Q5: "standard"
- Q6: "ordering" (क्रमबद्ध व्यवस्थित करने वाला प्रश्न, जैसे पदों का क्रम या व्याकरणिक सोपान)
- Q7: "match_column"
- Q8: "standard"
- Q9: "assertion_reason"
- Q10: "standard"

प्रत्येक प्रश्न का JSON प्रारूप इस प्रकार होना चाहिए:

1. Type "standard":
{
  "qType": "standard",
  "question": "प्रश्न विवरण...",
  "options": ["विकल्प 1", "विकल्प 2", "विकल्प 3", "विकल्प 4"],
  "correctIndex": 0,
  "explanation": "विस्तृत व्याकरणिक हल हिंदी में...",
  "difficulty": "moderate"
}

2. Type "assertion_reason":
{
  "qType": "assertion_reason",
  "question": "निर्देश: नीचे दिए गए अभिकथन [As] और कारण [R] को पढ़कर सही विकल्प चुनिए:",
  "assertion": "अभिकथन वाक्य...",
  "reason": "कारण वाक्य...",
  "options": [
    "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
    "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।",
    "[As] सत्य है, लेकिन [R] असत्य है।",
    "[As] असत्य है, लेकिन [R] सत्य है।"
  ],
  "correctIndex": 0,
  "explanation": "विस्तृत व्याकरणिक व्याख्या...",
  "difficulty": "hard"
}

3. Type "match_column":
{
  "qType": "match_column",
  "question": "स्तंभ I को स्तंभ II से सुमेलित कीजिए:",
  "columnI": ["(a) मद 1", "(b) मद 2", "(c) मद 3", "(d) मद 4"],
  "columnII": ["(I) विवरण 1", "(II) विवरण 2", "(III) विवरण 3", "(IV) विवरण 4"],
  "options": [
    "a-II, b-I, c-IV, d-III",
    "a-I, b-II, c-III, d-IV",
    "a-III, b-IV, c-I, d-II",
    "a-IV, b-III, c-II, d-I"
  ],
  "correctIndex": 0,
  "explanation": "सुमेलित व्याख्या...",
  "difficulty": "moderate"
}

4. Type "ordering":
{
  "qType": "ordering",
  "question": "निम्नलिखित पदों/शब्दों/नियमों को सही क्रम में व्यवस्थित कीजिए:",
  "statements": ["पद 1", "पद 2", "पद 3", "पद 4"],
  "statementLabels": ["1", "2", "3", "4"],
  "options": [
    "1 → 3 → 2 → 4",
    "2 → 1 → 4 → 3",
    "3 → 2 → 1 → 4",
    "4 → 1 → 2 → 3"
  ],
  "correctIndex": 0,
  "explanation": "क्रमबद्ध व्याकरणिक कारण...",
  "difficulty": "moderate"
}

5. Type "multi_statement":
{
  "qType": "multi_statement",
  "question": "दिए गए व्याकरणिक कथनों पर विचार कीजिए और सही विकल्प चुनिए:",
  "statements": [
    "कथन 1 विवरण...",
    "कथन 2 विवरण...",
    "कथन 3 विवरण...",
    "कथन 4 विवरण..."
  ],
  "statementLabels": ["कथन 1", "कथन 2", "कथन 3", "कथन 4"],
  "options": [
    "केवल कथन 1 और 2 सत्य हैं",
    "केवल कथन 2 और 3 सत्य हैं",
    "केवल कथन 1, 2 और 4 सत्य हैं",
    "सभी कथन सत्य हैं"
  ],
  "correctIndex": 0,
  "explanation": "कथनों का विस्तृत विश्लेषण...",
  "difficulty": "hard"
}

महत्वपूर्ण निर्देश:
1. प्रश्न वास्तविक मानक हिंदी व्याकरण एवं CG Vyapam/CGPSC स्तर के होने चाहिए।
2. correctIndex (0, 1, 2, या 3) को प्रश्न के वास्तविक सही विकल्प के सूचकांक पर सेट करें।
3. केवल शुद्ध वैध JSON Array (10 objects) वापस करें। कोई अतिरिक्त टिप्पणी न लिखें।`;
}

function balanceAndEnrichQuestions(rawQuestions, testId, timestamp, topicName) {
  const basePool = [0, 0, 1, 1, 2, 2, 3, 3, Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
  const targetIndices = shuffleArray(basePool);

  return rawQuestions.map((q, idx) => {
    const qId = `q_${testId}_${idx + 1}`;
    const oldCorrectOpt = q.options[q.correctIndex || 0];
    const hasSpecial = q.options.some(o => SPECIAL_REGEX.test(o.trim()));

    let newOptions = new Array(4);
    let newCorrectIdx;

    if (hasSpecial) {
      const specialIdx = q.options.findIndex(o => SPECIAL_REGEX.test(o.trim()));
      const specialOpt = q.options[specialIdx];
      if (specialOpt === oldCorrectOpt) {
        newOptions[3] = specialOpt;
        newCorrectIdx = 3;
        const other = shuffleArray(q.options.filter(o => o !== specialOpt));
        newOptions[0] = other[0];
        newOptions[1] = other[1];
        newOptions[2] = other[2];
      } else {
        newOptions[3] = specialOpt;
        const other = shuffleArray(q.options.filter(o => o !== specialOpt));
        const subTarget = targetIndices[idx] === 3 ? Math.floor(Math.random() * 3) : targetIndices[idx];
        const remaining = other.filter(o => o !== oldCorrectOpt);
        newOptions[subTarget] = oldCorrectOpt;
        newCorrectIdx = subTarget;
        let remI = 0;
        for (let i = 0; i < 3; i++) {
          if (i !== subTarget) {
            newOptions[i] = remaining[remI++];
          }
        }
      }
    } else {
      const target = targetIndices[idx];
      const other = shuffleArray(q.options.filter(o => o !== oldCorrectOpt));
      newOptions[target] = oldCorrectOpt;
      newCorrectIdx = target;
      let remI = 0;
      for (let i = 0; i < 4; i++) {
        if (i !== target) {
          newOptions[i] = other[remI++];
        }
      }
    }

    return {
      id: qId,
      qId: qId,
      qType: q.qType || 'standard',
      question: q.question,
      options: newOptions,
      correctIndex: newCorrectIdx,
      explanation: q.explanation || '',
      assertion: q.assertion || '',
      reason: q.reason || '',
      columnI: q.columnI || [],
      columnII: q.columnII || [],
      statements: q.statements || [],
      statementLabels: q.statementLabels || [],
      difficulty: q.difficulty || 'moderate',
      subject: 'हिंदी भाषा',
      topic: topicName,
      weightage: 'medium',
      timestamp,
      sourcePattern: 'CG Vyapam Standard',
      yearTrend: '2020-2026',
      expectedIn2026: true
    };
  });
}

async function uploadHindiTest(topic, chapter, testNum, retries = 3) {
  const title = `${topic.nameHi} - Test 0${testNum}`;
  console.log(`\n⏳ [Generating Hindi]: "${title}" (${topic.name})...`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const prompt = buildPrompt(topic, chapter, testNum);
      const rawQuestions = await callAI(prompt);

      if (!Array.isArray(rawQuestions) || rawQuestions.length !== 10) {
        throw new Error(`Expected 10 questions, got ${rawQuestions ? rawQuestions.length : 0}`);
      }

      const typesPresent = new Set(rawQuestions.map(q => q.qType));
      const testId = `test_hin_${topic.id}_0${testNum}_${Date.now()}`;
      const timestamp = new Date().toISOString();

      const enrichedQuestions = balanceAndEnrichQuestions(rawQuestions, testId, timestamp, topic.nameHi);

      const counts = [0, 0, 0, 0];
      enrichedQuestions.forEach(q => counts[q.correctIndex]++);

      const newTest = {
        id: testId,
        title: title,
        topicId: topic.id,
        topicName: topic.nameHi,
        examId: 'cgv_master',
        examName: 'CG VYAPAM BASICS',
        examIds: ['cgv_master', 'cgpsc_sse'],
        examNames: ['CG VYAPAM BASICS', 'CGPSC SSE'],
        subject: 'हिंदी भाषा',
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
          topicId: topic.id,
          topic: topic.nameHi,
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

      console.log(`✅ [Uploaded Hindi]: "${title}" (ID: ${testId})`);
      console.log(`   Types: ${JSON.stringify(Object.fromEntries([...typesPresent].map(t => [t, rawQuestions.filter(q => q.qType === t).length])))}`);
      console.log(`   Balanced Ans: A:${counts[0]}, B:${counts[1]}, C:${counts[2]}, D:${counts[3]}`);
      return testId;
    } catch (err) {
      console.warn(`[Attempt ${attempt} failed]: ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 2500));
    }
  }
}

module.exports = { uploadHindiTest };

if (require.main === module) {
  const sampleTopic = {
    id: "hin_varn_1",
    name: "Hindi Alphabet",
    nameHi: "हिंदी वर्णमाला",
    subtopics: ["स्वर", "व्यंजन", "अयोगवाह"]
  };
  uploadHindiTest(sampleTopic, "वर्ण विचार", 1)
    .then(() => {
      console.log("Hindi direct test run completed successfully!");
      process.exit(0);
    })
    .catch(err => {
      console.error("Hindi test run failed:", err);
      process.exit(1);
    });
}
