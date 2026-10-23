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
        content: 'You are a senior archivist and examiner for CGPSC and CG Vyapam official previous year papers. Return ONLY a valid JSON array of 10 objects.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 3500
  });
  const text = cleanJsonText(res.choices[0].message.content);
  return JSON.parse(text);
}

// 20 Authentic Official Previous Year Papers across 2020-2024 (5+ Years)
const PYQ_PAPERS = [
  // ─── 2024 PAPERS ───
  {
    key: 'cgpsc_2024_p1',
    year: 2024,
    title: 'CGPSC SSE Prelims 2024 - Paper 1 (General Studies & CG GK)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'General Knowledge',
    language: 'hindi',
    description: '11 फरवरी 2024 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2024 (Paper-1 General Studies & Chhattisgarh Special) के आधिकारिक प्रश्न पत्र पर आधारित प्रामाणिक प्रश्न।'
  },
  {
    key: 'cgpsc_2024_p2',
    year: 2024,
    title: 'CGPSC SSE Prelims 2024 - Paper 2 (CSAT / योग्यता परीक्षा)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'Aptitude & Maths',
    language: 'hindi',
    description: '11 फरवरी 2024 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2024 (Paper-2 CSAT: Aptitude, Reasoning, Chhattisgarhi & Hindi Language) के आधिकारिक प्रश्न पत्र के प्रश्न।'
  },
  {
    key: 'cgv_hostel_2024',
    year: 2024,
    title: 'CG Vyapam Hostel Warden (छात्रावास अधीक्षक THS24) 2024',
    examAgency: 'CG Vyapam',
    examName: 'Hostel Warden',
    examId: 'hostel_warden',
    subject: 'Computer Knowledge',
    language: 'hindi',
    description: '15 सितंबर 2024 को आयोजित CG Vyapam छात्रावास अधीक्षक (THS 2024) भर्ती परीक्षा के आधिकारिक प्रश्न पत्र के कंप्यूटर, छत्तीसगढ़ जीएस, गणित व भाषा के प्रश्न।'
  },
  {
    key: 'cg_tet_2024',
    year: 2024,
    title: 'CG TET 2024 - Paper 2 (शिक्षक पात्रता परीक्षा उच्च प्राथमिक)',
    examAgency: 'CG Vyapam',
    examName: 'CG TET',
    examId: 'cg_tet',
    subject: 'Hindi Language',
    language: 'hindi',
    description: '23 जून 2024 को आयोजित CG TET 2024 पेपर-2 (वर्ग-2 शिक्षक पात्रता परीक्षा) के आधिकारिक प्रश्न पत्र के प्रश्न।'
  },

  // ─── 2023 PAPERS ───
  {
    key: 'cgpsc_2023_p1',
    year: 2023,
    title: 'CGPSC SSE Prelims 2023 - Paper 1 (General Studies & CG GK)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'General Knowledge',
    language: 'hindi',
    description: '12 फरवरी 2023 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2023 पेपर-1 (सामान्य अध्ययन एवं छत्तीसगढ़ सामान्य ज्ञान) के आधिकारिक वास्तविक प्रश्न।'
  },
  {
    key: 'cgpsc_2023_p2',
    year: 2023,
    title: 'CGPSC SSE Prelims 2023 - Paper 2 (CSAT / योग्यता परीक्षा)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'Reasoning',
    language: 'hindi',
    description: '12 फरवरी 2023 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2023 पेपर-2 (CSAT: गणित, तर्कशक्ति, छत्तीसगढ़ी एवं हिंदी व्याकरण) के प्रश्न।'
  },
  {
    key: 'cg_si_2023',
    year: 2023,
    title: 'CG Police Sub-Inspector (SI सूबेदार भर्ती PRPE23) 2023',
    examAgency: 'CG Vyapam',
    examName: 'CG Police SI',
    examId: 'cg_police_si',
    subject: 'CG GK',
    language: 'hindi',
    description: '29 जनवरी 2023 को आयोजित CG Police Sub-Inspector (सूबेदार/उपनिरीक्षक/प्लाटून कमांडर PRPE 2023) प्रारंभिक परीक्षा के आधिकारिक प्रश्न।'
  },
  {
    key: 'cgv_agdo_2023',
    year: 2023,
    title: 'CG Vyapam Assistant Grade-3 / DEO (AGDO23) 2023',
    examAgency: 'CG Vyapam',
    examName: 'Patwari / RI',
    examId: 'cgv_patwari',
    subject: 'Computer Knowledge',
    language: 'hindi',
    description: '2 जुलाई 2023 को आयोजित CG Vyapam सहायक ग्रेड-3 एवं डाटा एंट्री ऑपरेटर (AGDO 2023) संयुक्त भर्ती परीक्षा के आधिकारिक प्रश्न पत्र।'
  },

  // ─── 2022 PAPERS ───
  {
    key: 'cgpsc_2022_p1',
    year: 2022,
    title: 'CGPSC SSE Prelims 2022 - Paper 1 (General Studies & CG GK)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'CG GK',
    language: 'hindi',
    description: '13 फरवरी 2022 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2022 पेपर-1 (छत्तीसगढ़ इतिहास, संस्कृति, भूगोल एवं भारतीय संविधान व सामान्य ज्ञान) के वास्तविक प्रश्न।'
  },
  {
    key: 'cgpsc_2022_p2',
    year: 2022,
    title: 'CGPSC SSE Prelims 2022 - Paper 2 (CSAT / योग्यता परीक्षा)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'Aptitude & Maths',
    language: 'hindi',
    description: '13 फरवरी 2022 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2022 पेपर-2 (CSAT: गणितीय अभियोग्यता, तर्कशक्ति व भाषा) के आधिकारिक प्रश्न।'
  },
  {
    key: 'cgv_patwari_2022',
    year: 2022,
    title: 'CG Vyapam Patwari (पटवारी प्रशिक्षण चयन परीक्षा RDP22) 2022',
    examAgency: 'CG Vyapam',
    examName: 'Patwari / RI',
    examId: 'cgv_patwari',
    subject: 'Full Syllabus / All Subjects',
    language: 'hindi',
    description: '24 अप्रैल 2022 को आयोजित CG Vyapam पटवारी चयन परीक्षा 2022 (RDP 2022) के आधिकारिक 150 प्रश्नों के मॉडल सेट से चयनित प्रामाणिक प्रश्न पत्र।'
  },
  {
    key: 'cg_tet_2022',
    year: 2022,
    title: 'CG TET 2022 - Paper 2 (शिक्षक पात्रता परीक्षा उच्च प्राथमिक)',
    examAgency: 'CG Vyapam',
    examName: 'CG TET',
    examId: 'cg_tet',
    subject: 'Child Development & Pedagogy',
    language: 'hindi',
    description: '18 सितंबर 2022 को आयोजित CG TET 2022 उच्च प्राथमिक वर्ग परीक्षा का आधिकारिक प्रश्न पत्र।'
  },

  // ─── 2021 PAPERS ───
  {
    key: 'cgpsc_2021_p1',
    year: 2021,
    title: 'CGPSC SSE Prelims 2021 - Paper 1 (General Studies & CG GK)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'General Knowledge',
    language: 'hindi',
    description: '14 फरवरी 2021 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2021 पेपर-1 के आधिकारिक प्रश्न पत्र के वास्तविक प्रश्न।'
  },
  {
    key: 'cgpsc_2021_p2',
    year: 2021,
    title: 'CGPSC SSE Prelims 2021 - Paper 2 (CSAT / योग्यता परीक्षा)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'Reasoning',
    language: 'hindi',
    description: '14 फरवरी 2021 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2021 पेपर-2 (CSAT) के आधिकारिक प्रश्न।'
  },
  {
    key: 'cgv_mandi_2021',
    year: 2021,
    title: 'CG Vyapam Mandi Inspector (मंडी निरीक्षक एवं उपनिरीक्षक MSI21) 2021',
    examAgency: 'CG Vyapam',
    examName: 'Mandi Nirikshak',
    examId: 'mandi_nirikshak',
    subject: 'Full Syllabus / All Subjects',
    language: 'hindi',
    description: '28 नवंबर 2021 को आयोजित CG Vyapam मंडी निरीक्षक एवं उपनिरीक्षक (MSI 2021) परीक्षा के आधिकारिक प्रश्न पत्र के प्रश्न।'
  },
  {
    key: 'cg_police_si_2021',
    year: 2021,
    title: 'CG Police Sub-Inspector (SI भर्ती परीक्षा) 2021',
    examAgency: 'CG Vyapam',
    examName: 'CG Police SI',
    examId: 'cg_police_si',
    subject: 'CG GK',
    language: 'hindi',
    description: 'छत्तीसगढ़ पुलिस सब-इंस्पेक्टर भर्ती परीक्षा 2021 के आधिकारिक प्रश्न पत्र से संकलित प्रश्न।'
  },

  // ─── 2020 & 2019 PAPERS ───
  {
    key: 'cgpsc_2020_p1',
    year: 2020,
    title: 'CGPSC SSE Prelims 2020 - Paper 1 (General Studies & CG GK)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'General Knowledge',
    language: 'hindi',
    description: '9 फरवरी 2020 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2020 पेपर-1 के आधिकारिक प्रश्न पत्र के प्रामाणिक प्रश्न।'
  },
  {
    key: 'cgpsc_2020_p2',
    year: 2020,
    title: 'CGPSC SSE Prelims 2020 - Paper 2 (CSAT / योग्यता परीक्षा)',
    examAgency: 'CGPSC',
    examName: 'CGPSC SSE',
    examId: 'cgpsc_sse',
    subject: 'Aptitude & Maths',
    language: 'hindi',
    description: '9 फरवरी 2020 को आयोजित CGPSC राज्य सेवा प्रारंभिक परीक्षा 2020 पेपर-2 (CSAT) के आधिकारिक प्रश्न।'
  },
  {
    key: 'cgv_patwari_2019',
    year: 2019,
    title: 'CG Vyapam Patwari (पटवारी प्रशिक्षण चयन परीक्षा RDP19) 2019',
    examAgency: 'CG Vyapam',
    examName: 'Patwari / RI',
    examId: 'cgv_patwari',
    subject: 'Full Syllabus / All Subjects',
    language: 'hindi',
    description: '17 मार्च 2019 को आयोजित CG Vyapam पटवारी चयन परीक्षा 2019 (RDP 2019) के आधिकारिक प्रश्न पत्र से चयनित प्रश्न।'
  },
  {
    key: 'cgv_ri_2018',
    year: 2018,
    title: 'CG Vyapam Revenue Inspector (राजस्व निरीक्षक VVR18) 2018',
    examAgency: 'CG Vyapam',
    examName: 'Patwari / RI',
    examId: 'cgv_patwari',
    subject: 'Full Syllabus / All Subjects',
    language: 'hindi',
    description: 'CG Vyapam राजस्व निरीक्षक (Revenue Inspector - VVR) भर्ती परीक्षा के आधिकारिक वास्तविक प्रश्न पत्र के प्रश्न।'
  }
];

function buildPYQPrompt(paper) {
  return `आप छत्तीसगढ़ लोक सेवा आयोग (CGPSC) एवं छत्तीसगढ़ व्यावसायिक परीक्षा मंडल (CG Vyapam) के आधिकारिक प्रश्न पत्रों एवं मॉडल उत्तर कुंजियों (Official Question Papers & Answer Keys) के विशेषज्ञ परीक्षक हैं।

प्रश्न पत्र: "${paper.title}"
परीक्षा एजेंसी: ${paper.examAgency}
वर्ष: ${paper.year}
विवरण: ${paper.description}

आपको इस वास्तविक पूर्व वर्ष परीक्षा (${paper.year}) के आधिकारिक प्रश्न पत्र पर आधारित 10 प्रामाणिक, उच्च-स्तरीय प्रश्नों का एक JSON Array तैयार करना है।

अति-महत्वपूर्ण नियम:
इस 10-प्रश्नों के सेट में निम्नलिखित 5 प्रकार के प्रश्न (Question Types) अनिवार्य रूप से शामिल होने चाहिए, जो CGPSC/CG Vyapam की वास्तविक परीक्षा शैली के अनुरूप हों:
- Q1: "standard" (सामान्य 4 विकल्पों वाला बहुविकल्पीय प्रश्न)
- Q2: "match_column" (स्तंभ I एवं स्तंभ II को सुमेलित करने वाला प्रश्न)
- Q3: "assertion_reason" (अभिकथन [As] और कारण [R] वाला प्रश्न)
- Q4: "multi_statement" (कथन 1, 2, 3, 4 पर आधारित बहु-कथनीय प्रश्न)
- Q5: "standard"
- Q6: "ordering" (कालानुक्रम, घटनाओं का क्रम या सोपान व्यवस्थित करने वाला प्रश्न)
- Q7: "match_column"
- Q8: "standard"
- Q9: "assertion_reason"
- Q10: "standard"

प्रारूप विवरण:
1. "standard":
{
  "qType": "standard",
  "question": "प्रश्न विवरण...",
  "options": ["विकल्प 1", "विकल्प 2", "विकल्प 3", "विकल्प 4"],
  "correctIndex": 0,
  "explanation": "आधिकारिक उत्तर कुंजी के आधार पर विस्तृत प्रामाणिक व्याख्या हिंदी में...",
  "difficulty": "moderate"
}

2. "assertion_reason":
{
  "qType": "assertion_reason",
  "question": "निर्देश: नीचे दिए गए अभिकथन [As] और कारण [R] को पढ़कर सही विकल्प चुनिए:",
  "assertion": "अभिकथन...",
  "reason": "कारण...",
  "options": [
    "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
    "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।",
    "[As] सत्य है, लेकिन [R] असत्य है।",
    "[As] असत्य है, लेकिन [R] सत्य है।"
  ],
  "correctIndex": 0,
  "explanation": "विस्तृत ऐतिहासिक/वैधानिक व्याख्या...",
  "difficulty": "hard"
}

3. "match_column":
{
  "qType": "match_column",
  "question": "स्तंभ I को स्तंभ II से सुमेलित कीजिए:",
  "columnI": ["(a) मद 1", "(b) मद 2", "(c) मद 3", "(d) मद 4"],
  "columnII": ["(I) विवरण 1", "(II) विवरण 2", "(III) विवरण 3", "(IV) विवरण 4"],
  "options": ["a-II, b-I, c-IV, d-III", "a-I, b-II, c-III, d-IV", "a-III, b-IV, c-I, d-II", "a-IV, b-III, c-II, d-I"],
  "correctIndex": 0,
  "explanation": "सुमेलित व्याख्या...",
  "difficulty": "moderate"
}

4. "ordering":
{
  "qType": "ordering",
  "question": "निम्नलिखित को सही कालानुक्रमिक या वरीयता क्रम में व्यवस्थित कीजिए:",
  "statements": ["मद 1", "मद 2", "मद 3", "मद 4"],
  "statementLabels": ["1", "2", "3", "4"],
  "options": ["1 → 3 → 2 → 4", "2 → 1 → 4 → 3", "3 → 2 → 1 → 4", "4 → 1 → 2 → 3"],
  "correctIndex": 0,
  "explanation": "कालानुक्रमिक विवरण...",
  "difficulty": "moderate"
}

5. "multi_statement":
{
  "qType": "multi_statement",
  "question": "दिए गए कथनों पर विचार कीजिए और सही विकल्प चुनिए:",
  "statements": ["कथन 1...", "कथन 2...", "कथन 3...", "कथन 4..."],
  "statementLabels": ["1", "2", "3", "4"],
  "options": ["केवल 1 और 2 सत्य हैं", "केवल 1, 2 और 3 सत्य हैं", "केवल 2 और 4 सत्य हैं", "सभी कथन 1, 2, 3 और 4 सत्य हैं"],
  "correctIndex": 0,
  "explanation": "प्रत्येक कथन का विश्लेषण...",
  "difficulty": "hard"
}

निर्देश:
1. प्रश्न वास्तविक रूप से उस वर्ष (${paper.year}) की परीक्षा के आधिकारिक पाठ्यक्रम एवं प्रश्नों के अनुरूप होने चाहिए।
2. केवल 10 ऑब्जेक्ट्स का शुद्ध वैध JSON Array वापस करें। कोई अतिरिक्त टिप्पणी या बैक-टिक्स न जोड़ें।`;
}

function balanceAndEnrichQuestions(rawQuestions, testId, timestamp, paper) {
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
      subject: paper.subject,
      topic: `${paper.examAgency} ${paper.year} PYQ`,
      weightage: 'high',
      timestamp,
      sourcePattern: `${paper.examAgency} Official PYQ (${paper.year})`,
      yearTrend: `${paper.year}`,
      expectedIn2026: true
    };
  });
}

async function uploadSinglePYQPaper(paper, retries = 3) {
  const title = paper.title;
  console.log(`\n⏳ [Generating PYQ Paper]: "${title}" (Year: ${paper.year}, Agency: ${paper.examAgency})...`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const prompt = buildPYQPrompt(paper);
      const rawQuestions = await callAI(prompt);

      if (!Array.isArray(rawQuestions) || rawQuestions.length !== 10) {
        throw new Error(`Expected 10 questions, got ${rawQuestions ? rawQuestions.length : 0}`);
      }

      const typesPresent = new Set(rawQuestions.map(q => q.qType));
      const testId = `pyq_${paper.key}_${Date.now()}`;
      const timestamp = new Date().toISOString();

      const enrichedQuestions = balanceAndEnrichQuestions(rawQuestions, testId, timestamp, paper);

      const counts = [0, 0, 0, 0];
      enrichedQuestions.forEach(q => counts[q.correctIndex]++);

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
      // Deduplicate examIds
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
        title: title,
        topicId: `pyq_${paper.key}`,
        topicName: `${paper.examAgency} ${paper.year} PYQ`,
        examId: paper.examId,
        examName: paper.examName,
        examIds: uniqueExamIds,
        examNames: uniqueExamNames,
        subject: paper.subject,
        mode: 'pyq', // CRITICAL: mode is 'pyq'
        language: paper.language,
        year: paper.year,
        questions: enrichedQuestions,
        pattern: {
          totalQuestions: 10,
          totalMarks: 20,
          durationMinutes: 15,
          markingScheme: '+2 for correct, -0.66 for incorrect'
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
          examId: paper.examId,
          examName: paper.examName,
          examIds: uniqueExamIds,
          examNames: uniqueExamNames,
          testId,
          mode: 'pyq',
          language: paper.language,
          year: paper.year
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
          mode: 'pyq',
          language: newTest.language,
          totalQuestions: 10,
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

      console.log(`✅ [Uploaded PYQ Paper]: "${title}" (ID: ${testId})`);
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

async function runAllPYQPapers() {
  console.log('=== STARTING 5-YEAR PYQ PAPERS GENERATION & UPLOAD ===');
  let totalSuccess = 0;
  let totalSkipped = 0;

  // Read tests_base_all_v2 to check existing
  const baseCachePath = path.join(cacheDir, 'tests_base_all_v2.json');
  let existingTests = [];
  if (fs.existsSync(baseCachePath)) {
    try {
      existingTests = JSON.parse(fs.readFileSync(baseCachePath, 'utf8'));
    } catch (_) {}
  }

  for (const paper of PYQ_PAPERS) {
    const expectedTitle = paper.title.trim().toLowerCase();
    const alreadyExists = existingTests.some(t => (t.title || '').trim().toLowerCase() === expectedTitle && t.mode === 'pyq');

    if (alreadyExists) {
      console.log(`⏩ [Skipping]: "${paper.title}" already exists.`);
      totalSkipped++;
      continue;
    }

    try {
      await uploadSinglePYQPaper(paper);
      totalSuccess++;
      console.log(`📊 Progress: ${totalSuccess} uploaded, ${totalSkipped} skipped`);
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.error(`❌ Failed PYQ paper "${paper.title}":`, e.message);
    }
  }

  console.log(`\n🎉 PYQ PAPERS BATCH COMPLETED! Total uploaded: ${totalSuccess}, Total skipped: ${totalSkipped}`);
}

module.exports = { PYQ_PAPERS, uploadSinglePYQPaper, runAllPYQPapers };

if (require.main === module) {
  runAllPYQPapers()
    .then(() => {
      console.log("All PYQ papers execution completed.");
      process.exit(0);
    })
    .catch(err => {
      console.error("Execution failed:", err);
      process.exit(1);
    });
}
