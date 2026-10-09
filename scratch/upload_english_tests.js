const path = require('path');
const fs = require('fs');

require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const Groq = require(path.join(__dirname, '../server/node_modules/groq-sdk'));
const { GoogleGenerativeAI } = require(path.join(__dirname, '../server/node_modules/@google/generative-ai'));
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');

const SPECIAL_REGEX = /^(All of the above|None of the above|उपर्युक्त सभी|इनमें से कोई नहीं)$/i;

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
        content: 'You are an expert English Language examiner for CG Vyapam and CGPSC examinations. Return ONLY a valid JSON array of 10 objects.'
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

function buildPrompt(topic, chapter, testNum) {
  return `You are a Senior English Language Examiner for CG Vyapam (Patwari, RI, Hostel Superintendent, Assistant Grade-3, Mandi Inspector) and CGPSC State Service examinations.
Subject: English Language
Chapter: ${chapter}
Topic: ${topic.name} (${topic.nameHi || ''})
Subtopics: ${(topic.subtopics || []).join(', ')}
Test: Test 0${testNum}

Generate a high-quality, authentic exam paper consisting of exactly 10 MCQs as a JSON Array based strictly on CG Vyapam and CGPSC standards.

MANDATORY QUESTION TYPES STRUCTURE:
The 10 questions must strictly follow this exact distribution of the 5 question types:
- Q1: "standard" (Direct multiple-choice question with 4 options)
- Q2: "match_column" (Match Column I with Column II)
- Q3: "assertion_reason" (Assertion [As] and Reason [R] analysis)
- Q4: "multi_statement" (Analyzing statements 1, 2, 3, 4)
- Q5: "standard"
- Q6: "ordering" (Sentence rearrangement / logical sequencing of words or sentence parts P, Q, R, S)
- Q7: "match_column"
- Q8: "standard"
- Q9: "assertion_reason"
- Q10: "standard"

Schema Definitions for Each Type:

1. Type "standard":
{
  "qType": "standard",
  "question": "Question text...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "Clear explanation of grammar rules or vocabulary in English (with Hindi context if helpful)...",
  "difficulty": "moderate"
}

2. Type "assertion_reason":
{
  "qType": "assertion_reason",
  "question": "Directions: Given below are two statements, Assertion [As] and Reason [R]. Choose the correct option:",
  "assertion": "Assertion sentence...",
  "reason": "Reason sentence...",
  "options": [
    "Both [As] and [R] are true, and [R] is the correct explanation of [As].",
    "Both [As] and [R] are true, but [R] is not the correct explanation of [As].",
    "[As] is true, but [R] is false.",
    "[As] is false, but [R] is true."
  ],
  "correctIndex": 0,
  "explanation": "Detailed grammatical justification...",
  "difficulty": "hard"
}

3. Type "match_column":
{
  "qType": "match_column",
  "question": "Match the items in Column I with their corresponding items in Column II:",
  "columnI": ["(a) Item 1", "(b) Item 2", "(c) Item 3", "(d) Item 4"],
  "columnII": ["(I) Meaning/Category 1", "(II) Meaning/Category 2", "(III) Meaning/Category 3", "(IV) Meaning/Category 4"],
  "options": [
    "a-II, b-I, c-IV, d-III",
    "a-I, b-II, c-III, d-IV",
    "a-III, b-IV, c-I, d-II",
    "a-IV, b-III, c-II, d-I"
  ],
  "correctIndex": 0,
  "explanation": "Detailed mapping explanation...",
  "difficulty": "moderate"
}

4. Type "ordering":
{
  "qType": "ordering",
  "question": "Rearrange the given parts (P, Q, R, S) to form a coherent, grammatically correct sentence:",
  "statements": [
    "P: Part 1 text",
    "Q: Part 2 text",
    "R: Part 3 text",
    "S: Part 4 text"
  ],
  "statementLabels": ["P", "Q", "R", "S"],
  "options": [
    "P → Q → R → S",
    "R → P → Q → S",
    "Q → S → P → R",
    "S → R → Q → P"
  ],
  "correctIndex": 0,
  "explanation": "Step-by-step grammatical reason for the sequence...",
  "difficulty": "moderate"
}

5. Type "multi_statement":
{
  "qType": "multi_statement",
  "question": "Consider the following statements regarding the topic rules/usage and select the correct option:",
  "statements": [
    "1. Statement 1...",
    "2. Statement 2...",
    "3. Statement 3...",
    "4. Statement 4..."
  ],
  "statementLabels": ["Statement 1", "Statement 2", "Statement 3", "Statement 4"],
  "options": [
    "Only statements 1 and 2 are correct",
    "Only statements 1, 3 and 4 are correct",
    "Only statements 2 and 4 are correct",
    "All statements 1, 2, 3 and 4 are correct"
  ],
  "correctIndex": 0,
  "explanation": "Analysis of each statement with grammar rules...",
  "difficulty": "hard"
}

CRITICAL RULES:
1. Ensure questions strictly match CG Vyapam/CGPSC syllabus and previous year question trends.
2. Return ONLY the raw JSON array of 10 objects. Do not wrap in markdown or add conversational text.`;
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
      subject: 'English Language',
      topic: topicName,
      weightage: 'medium',
      timestamp,
      sourcePattern: 'CG Vyapam Standard',
      yearTrend: '2020-2026',
      expectedIn2026: true
    };
  });
}

async function uploadEnglishTest(topic, chapter, testNum, retries = 3) {
  const title = `${topic.name} - Test 0${testNum}`;
  console.log(`\n⏳ [Generating English]: "${title}" (${topic.nameHi || ''})...`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const prompt = buildPrompt(topic, chapter, testNum);
      const rawQuestions = await callAI(prompt);

      if (!Array.isArray(rawQuestions) || rawQuestions.length !== 10) {
        throw new Error(`Expected 10 questions, got ${rawQuestions ? rawQuestions.length : 0}`);
      }

      const typesPresent = new Set(rawQuestions.map(q => q.qType));
      const testId = `test_eng_${topic.id}_0${testNum}_${Date.now()}`;
      const timestamp = new Date().toISOString();

      const enrichedQuestions = balanceAndEnrichQuestions(rawQuestions, testId, timestamp, topic.name);

      const counts = [0, 0, 0, 0];
      enrichedQuestions.forEach(q => counts[q.correctIndex]++);

      const newTest = {
        id: testId,
        title: title,
        topicId: topic.id,
        topicName: topic.name,
        examId: 'cgv_master',
        examName: 'CG VYAPAM BASICS',
        examIds: ['cgv_master', 'cgpsc_sse'],
        examNames: ['CG VYAPAM BASICS', 'CGPSC SSE'],
        subject: 'English Language',
        mode: 'mock',
        language: 'english',
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
          language: 'english'
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
          topic: topic.name,
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

      console.log(`✅ [Uploaded English]: "${title}" (ID: ${testId})`);
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

module.exports = { uploadEnglishTest };

if (require.main === module) {
  const sampleTopic = {
    id: "eng_gram_1",
    name: "Parts of Speech",
    nameHi: "शब्द भेद",
    subtopics: ["Noun", "Pronoun", "Adjective", "Verb", "Adverb", "Preposition", "Conjunction", "Interjection"]
  };
  uploadEnglishTest(sampleTopic, "Grammar Fundamentals", 1)
    .then(() => {
      console.log("English direct test run completed successfully!");
      process.exit(0);
    })
    .catch(err => {
      console.error("English test run failed:", err);
      process.exit(1);
    });
}
