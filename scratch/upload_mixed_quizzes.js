const path = require('path');
const fs = require('fs');

require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const Groq = require(path.join(__dirname, '../server/node_modules/groq-sdk'));
const { GoogleGenerativeAI } = require(path.join(__dirname, '../server/node_modules/@google/generative-ai'));
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const cacheDir = path.join(__dirname, '../server/data_cache');

const SPECIAL_REGEX = /^(उपर्युक्त|उपरोक्त)\s*(सभी|में से कोई नहीं)|^(इनमें से कोई नहीं)$|^(All of the above|None of the above)$/i;

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
        temperature: 0.35
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
        content: 'You are an expert exam paper setter for CG Vyapam and CGPSC. Return ONLY a valid JSON array of 10 objects.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.35,
    max_tokens: 3500
  });
  const text = cleanJsonText(res.choices[0].message.content);
  return JSON.parse(text);
}

const QUIZ_SUBJECTS = [
  {
    key: 'cg_gk',
    subject: 'CG GK',
    titlePrefix: 'छत्तीसगढ़ सामान्य ज्ञान (CG GK) - Mixed Quiz',
    language: 'hindi',
    description: 'छत्तीसगढ़ का इतिहास (कलचुरी, मराठा, 1857, स्वतंत्रता संग्राम), भूगोल (नदियाँ, खनिज, राष्ट्रीय उद्यान), संस्कृति एवं जनजातियाँ (त्यौहार, नृत्य, बोलियाँ), प्रशासनिक व्यवस्था एवं राज्य की योजनाएँ',
    topicsList: ['छत्तीसगढ़ का इतिहास', 'छत्तीसगढ़ का भूगोल', 'जनजातियाँ एवं लोक संस्कृति', 'प्रशासन एवं पंचायती राज', 'शासकीय योजनाएँ']
  },
  {
    key: 'india_gk',
    subject: 'General Knowledge',
    titlePrefix: 'भारत सामान्य ज्ञान (India GK) - Mixed Quiz',
    language: 'hindi',
    description: 'भारतीय इतिहास (प्राचीन, मध्यकालीन, आधुनिक भारत व स्वतंत्रता आंदोलन), भारतीय संविधान एवं राजव्यवस्था, भारत का भूगोल (अपवाह, पर्वत, जलवायु) तथा भारतीय अर्थव्यवस्था',
    topicsList: ['भारतीय इतिहास', 'संविधान एवं राजव्यवस्था', 'भारत का भूगोल', 'भारतीय अर्थव्यवस्था']
  },
  {
    key: 'science',
    subject: 'General Science',
    titlePrefix: 'सामान्य विज्ञान (General Science) - Mixed Quiz',
    language: 'hindi',
    description: 'भौतिक विज्ञान (प्रकाश, गति, विद्युत, ध्वनि), रसायन विज्ञान (अम्ल-क्षार, धातु-अधातु, रासायनिक सूत्र), जीव विज्ञान (कोशिका, मानव शरीर तंत्र, पोषण व रोग) तथा पर्यावरण व पारिस्थितिकी',
    topicsList: ['भौतिकी (Physics)', 'रसायन (Chemistry)', 'जीव विज्ञान (Biology)', 'पर्यावरण (Ecology)']
  },
  {
    key: 'maths',
    subject: 'Aptitude & Maths',
    titlePrefix: 'गणित (Mathematics) - Mixed Quiz',
    language: 'hindi',
    description: 'संख्या पद्धति, सरलीकरण, प्रतिशत, लाभ-हानि, अनुपात-समानुपात, साधारण व चक्रवृद्धि ब्याज, समय व कार्य, पाइप-टंकी, चाल-दूरी-रेलगाड़ी तथा क्षेत्रमिति (2D/3D)',
    topicsList: ['संख्या पद्धति व सरलीकरण', 'प्रतिशत व लाभ-हानि', 'अनुपात एवं ब्याज (SI/CI)', 'समय, कार्य व दूरी', 'क्षेत्रमिति']
  },
  {
    key: 'reasoning',
    subject: 'Reasoning',
    titlePrefix: 'तर्कशक्ति (Reasoning) - Mixed Quiz',
    language: 'hindi',
    description: 'कोडिंग-डिकोडिंग, वर्णमाला व संख्या श्रृंखला, सादृश्यता एवं वर्गीकरण, रक्त संबंध, दिशा एवं दूरी, न्याय निगमन (Syllogism), बैठक व्यवस्था तथा वेन आरेख',
    topicsList: ['कोडिंग-डिकोडिंग', 'श्रृंखला व सादृश्यता', 'रक्त संबंध व दिशा ज्ञान', 'न्याय निगमन व वेन आरेख']
  },
  {
    key: 'computer',
    subject: 'Computer Knowledge',
    titlePrefix: 'कंप्यूटर ज्ञान (Computer Knowledge) - Mixed Quiz',
    language: 'hindi',
    description: 'कंप्यूटर का सामान्य परिचय एवं पीढ़ियाँ, सीपीयू एवं मेमोरी, ऑपरेटिंग सिस्टम (Windows/Linux), एमएस ऑफिस (Word, Excel, PPT), इंटरनेट, नेटवर्किंग, ईमेल तथा वायरस व एंटीवायरस',
    topicsList: ['कंप्यूटर आर्किटेक्चर व हार्डवेयर', 'ऑपरेटिंग सिस्टम', 'MS Office', 'इंटरनेट व साइबर सुरक्षा']
  },
  {
    key: 'hindi',
    subject: 'Hindi Language',
    titlePrefix: 'हिंदी भाषा (Hindi Language) - Mixed Quiz',
    language: 'hindi',
    description: 'वर्ण विचार, स्वर-व्यंजन, वर्तनी, संधि, समास, शब्द भेद (तत्सम-तद्भव, संज्ञा, सर्वनाम, विशेषण), पर्यायवाची, विलोम, अनेक शब्दों के लिए एक शब्द, मुहावरे एवं लोकोक्तियाँ',
    topicsList: ['वर्ण एवं वर्तनी', 'संधि एवं समास', 'शब्द भेद एवं व्याकरण', 'शब्द सामर्थ्य (मुहावरे, पर्यायवाची, विलोम)']
  },
  {
    key: 'english',
    subject: 'English Language',
    titlePrefix: 'English Language - Mixed Quiz',
    language: 'english',
    description: 'Parts of Speech, Articles, Determiners, Tenses, Subject-Verb Agreement, Active & Passive Voice, Direct & Indirect Speech, Vocabulary (Synonyms, Antonyms, Idioms, One-word substitution), Spotting Errors, Para Jumbles (P, Q, R, S)',
    topicsList: ['Parts of Speech & Tenses', 'Voice & Narration', 'Vocabulary & Idioms', 'Error Spotting & Sentence Ordering']
  },
  {
    key: 'ca',
    subject: 'Current Affairs',
    titlePrefix: 'समसामयिकी (Current Affairs) - Mixed Quiz',
    language: 'hindi',
    description: '2024-2026 की महत्वपूर्ण घटनाएँ: छत्तीसगढ़ समसामयिकी (महतारी वंदन, बजट, नियुक्तियाँ), राष्ट्रीय समसामयिकी (योजनाएँ, विधेयक, सूचकांक), विज्ञान एवं अंतरिक्ष मिशन (ISRO), खेल (Olympics, National Games) एवं पुरस्कार',
    topicsList: ['छत्तीसगढ़ समसामयिकी', 'राष्ट्रीय घटनाक्रम व योजनाएँ', 'विज्ञान, अंतरिक्ष व रक्षा', 'खेल एवं प्रमुख पुरस्कार']
  },
  {
    key: 'all',
    subject: 'Full Syllabus / All Subjects',
    titlePrefix: 'CG Vyapam Full Syllabus - Mixed Quiz',
    language: 'hindi',
    description: 'संपूर्ण CG Vyapam पाठ्यक्रम का मिश्रित अभ्यास: छत्तीसगढ़ सामान्य ज्ञान, भारत सामान्य ज्ञान, सामान्य विज्ञान, गणित, तर्कशक्ति, कंप्यूटर, हिंदी, अंग्रेजी एवं समसामयिकी के संतुलित प्रश्न',
    topicsList: ['CG GK', 'India GS & Science', 'Maths & Reasoning', 'Computer & Languages', 'Current Affairs']
  }
];

function buildPrompt(subConfig, testNum) {
  const isEnglish = subConfig.language === 'english';
  const padNum = testNum < 10 ? `0${testNum}` : `${testNum}`;
  return `You are a Senior Question Paper Setter for CG Vyapam (Patwari, RI, Hostel Warden, AG-3, Mandi Inspector) and CGPSC State Service examinations.
Subject: ${subConfig.subject}
Title: ${subConfig.titlePrefix} ${padNum}
Coverage: This is a MIXED TOPICS QUIZ covering multiple syllabus topics together:
${subConfig.description}
Included Areas: ${subConfig.topicsList.join(', ')}

Generate a high-yield, authentic exam paper consisting of EXACTLY 10 questions as a JSON Array.

MANDATORY QUESTION TYPES DISTRIBUTION (ALL 5 TYPES MUST BE PRESENT):
- Q1: "standard" (4 options multiple choice)
- Q2: "match_column" (Match Column I with Column II)
- Q3: "assertion_reason" (Assertion [As] and Reason [R] analysis)
- Q4: "multi_statement" (Analysis of statements 1, 2, 3, 4)
- Q5: "standard"
- Q6: "ordering" (Chronological order, sequence of steps, logical arrangement, or sentence rearrangement)
- Q7: "match_column"
- Q8: "standard"
- Q9: "assertion_reason"
- Q10: "standard"

Schema Definitions:
1. Type "standard":
{
  "qType": "standard",
  "question": "${isEnglish ? 'Question text...' : 'प्रश्न विवरण...'}",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctIndex": 0,
  "explanation": "${isEnglish ? 'Clear grammatical/conceptual explanation...' : 'विस्तृत तथ्यात्मक एवं स्पष्ट हल हिंदी में...'}",
  "difficulty": "moderate"
}

2. Type "assertion_reason":
{
  "qType": "assertion_reason",
  "question": "${isEnglish ? 'Directions: Given below are Assertion [As] and Reason [R]. Choose the correct option:' : 'निर्देश: नीचे दिए गए अभिकथन [As] और कारण [R] को पढ़कर सही विकल्प चुनिए:'}",
  "assertion": "${isEnglish ? 'Assertion statement...' : 'अभिकथन वाक्य...'}",
  "reason": "${isEnglish ? 'Reason statement...' : 'कारण वाक्य...'}",
  "options": [
    ${isEnglish ? '"Both [As] and [R] are true, and [R] is the correct explanation of [As].", "Both [As] and [R] are true, but [R] is not the correct explanation of [As].", "[As] is true, but [R] is false.", "[As] is false, but [R] is true."' : '"[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।", "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।", "[As] सत्य है, लेकिन [R] असत्य है।", "[As] असत्य है, लेकिन [R] सत्य है।"'}
  ],
  "correctIndex": 0,
  "explanation": "Detailed explanation...",
  "difficulty": "hard"
}

3. Type "match_column":
{
  "qType": "match_column",
  "question": "${isEnglish ? 'Match the items in Column I with Column II:' : 'स्तंभ I को स्तंभ II से सुमेलित कीजिए:'}",
  "columnI": ["(a) Item 1", "(b) Item 2", "(c) Item 3", "(d) Item 4"],
  "columnII": ["(I) Desc 1", "(II) Desc 2", "(III) Desc 3", "(IV) Desc 4"],
  "options": ["a-II, b-I, c-IV, d-III", "a-I, b-II, c-III, d-IV", "a-III, b-IV, c-I, d-II", "a-IV, b-III, c-II, d-I"],
  "correctIndex": 0,
  "explanation": "Match explanation...",
  "difficulty": "moderate"
}

4. Type "ordering":
{
  "qType": "ordering",
  "question": "${isEnglish ? 'Rearrange the following in proper logical/chronological order:' : 'निम्नलिखित को सही तार्किक/कालानुक्रमिक क्रम में व्यवस्थित कीजिए:'}",
  "statements": ["Item 1", "Item 2", "Item 3", "Item 4"],
  "statementLabels": ["1", "2", "3", "4"],
  "options": ["1 → 3 → 2 → 4", "2 → 1 → 4 → 3", "3 → 2 → 1 → 4", "4 → 1 → 2 → 3"],
  "correctIndex": 0,
  "explanation": "Ordering rationale...",
  "difficulty": "moderate"
}

5. Type "multi_statement":
{
  "qType": "multi_statement",
  "question": "${isEnglish ? 'Consider the following statements and select the correct option:' : 'निम्नलिखित कथनों पर विचार कीजिए और सही विकल्प चुनिए:'}",
  "statements": ["Statement 1...", "Statement 2...", "Statement 3...", "Statement 4..."],
  "statementLabels": ["1", "2", "3", "4"],
  "options": [
    ${isEnglish ? '"Only 1 and 2 are correct", "Only 1, 2 and 3 are correct", "Only 2 and 4 are correct", "All 1, 2, 3 and 4 are correct"' : '"केवल 1 और 2 सही हैं", "केवल 1, 2 और 3 सही हैं", "केवल 2 और 4 सही हैं", "सभी 1, 2, 3 और 4 सही हैं"'}
  ],
  "correctIndex": 0,
  "explanation": "Statement analysis...",
  "difficulty": "hard"
}

IMPORTANT:
1. Mix questions across the different subtopics specified above so the student gets a true comprehensive mixed test!
2. Return ONLY a valid JSON array of 10 objects. No markdown ticks, no extra text.`;
}

function balanceAndEnrichQuestions(rawQuestions, testId, timestamp, subjectName) {
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
      subject: subjectName,
      topic: 'Mixed Topics',
      weightage: 'medium',
      timestamp,
      sourcePattern: 'CG Vyapam & CGPSC Pattern',
      yearTrend: '2024-2026',
      expectedIn2026: true
    };
  });
}

async function uploadSingleMixedQuiz(subConfig, testNum, retries = 3) {
  const padNum = testNum < 10 ? `0${testNum}` : `${testNum}`;
  const title = `${subConfig.titlePrefix} ${padNum}`;
  console.log(`\n⏳ [Generating Mixed Quiz]: "${title}" (${subConfig.subject})...`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const prompt = buildPrompt(subConfig, testNum);
      const rawQuestions = await callAI(prompt);

      if (!Array.isArray(rawQuestions) || rawQuestions.length !== 10) {
        throw new Error(`Expected 10 questions, got ${rawQuestions ? rawQuestions.length : 0}`);
      }

      const typesPresent = new Set(rawQuestions.map(q => q.qType));
      const testId = `quiz_mix_${subConfig.key}_${padNum}_${Date.now()}`;
      const timestamp = new Date().toISOString();

      const enrichedQuestions = balanceAndEnrichQuestions(rawQuestions, testId, timestamp, subConfig.subject);

      const counts = [0, 0, 0, 0];
      enrichedQuestions.forEach(q => counts[q.correctIndex]++);

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
        'cgv_food'
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
        'Food Inspector'
      ];

      const newTest = {
        id: testId,
        title: title,
        topicId: `mix_${subConfig.key}`,
        topicName: 'Mixed Topics',
        examId: 'cgv_master',
        examName: 'CG VYAPAM BASICS',
        examIds,
        examNames,
        subject: subConfig.subject,
        mode: 'quiz',
        language: subConfig.language,
        questions: enrichedQuestions,
        pattern: {
          totalQuestions: 10,
          totalMarks: 10,
          durationMinutes: 12,
          markingScheme: '+1 for correct, -0.25 for incorrect'
        },
        createdAt: timestamp
      };

      // 1. Save Test to Firestore
      await db.collection('tests').doc(testId).set(newTest);

      // 2. Save Questions in Batch to Firestore
      const batch = db.batch();
      enrichedQuestions.forEach(q => {
        const qRef = db.collection('questions').doc(q.id);
        batch.set(qRef, {
          ...q,
          examId: 'cgv_master',
          examName: 'CG VYAPAM BASICS',
          examIds,
          examNames,
          testId,
          mode: 'quiz',
          language: subConfig.language
        });
      });
      await batch.commit();

      // 3. Save test_detail cache on disk so /api/tests/:id reads it with ZERO Firestore read quota!
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
        baseList.unshift({
          id: testId,
          title: title,
          examId: newTest.examId,
          examIds: newTest.examIds,
          examName: newTest.examName,
          examNames: newTest.examNames,
          subject: newTest.subject,
          mode: 'quiz',
          language: newTest.language,
          totalQuestions: 10,
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
          if (file.startsWith('test_subjects_') || (file.startsWith('tests_') && file.includes('_quiz_'))) {
            try {
              fs.unlinkSync(path.join(cacheDir, file));
            } catch (_) {}
          }
        }
      } catch (_) {}

      console.log(`✅ [Uploaded Mixed Quiz]: "${title}" (ID: ${testId})`);
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

async function runAllMixedQuizzes() {
  console.log('=== STARTING ALL SUBJECTS MIXED QUIZZES GENERATION & UPLOAD ===');
  let totalSuccess = 0;
  
  // Read tests_base_all_v2 to check existing
  const baseCachePath = path.join(cacheDir, 'tests_base_all_v2.json');
  let existingTests = [];
  if (fs.existsSync(baseCachePath)) {
    existingTests = JSON.parse(fs.readFileSync(baseCachePath, 'utf8'));
  }

  for (const sub of QUIZ_SUBJECTS) {
    for (let testNum = 1; testNum <= 3; testNum++) {
      const expectedTitle = `${sub.titlePrefix} 0${testNum}`.trim().toLowerCase();
      const alreadyExists = existingTests.some(t => (t.title || '').trim().toLowerCase() === expectedTitle && t.mode === 'quiz');

      if (alreadyExists) {
        console.log(`⏩ [Skipping]: "${sub.titlePrefix} 0${testNum}" already exists.`);
        continue;
      }

      try {
        await uploadSingleMixedQuiz(sub, testNum);
        totalSuccess++;
        await new Promise(r => setTimeout(r, 2000));
      } catch (e) {
        console.error(`❌ Failed quiz for ${sub.subject} - 0${testNum}:`, e.message);
      }
    }
  }

  console.log(`\n🎉 MIXED QUIZZES BATCH COMPLETED! Total uploaded: ${totalSuccess}`);
}

module.exports = { QUIZ_SUBJECTS, uploadSingleMixedQuiz, runAllMixedQuizzes };

if (require.main === module) {
  // If run directly: upload all 30 mixed quizzes
  runAllMixedQuizzes()
    .then(() => {
      console.log("All mixed quizzes execution completed.");
      process.exit(0);
    })
    .catch(err => {
      console.error("Execution failed:", err);
      process.exit(1);
    });
}
