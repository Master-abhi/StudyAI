const path = require('path');
const fs = require('fs');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { db } = require(path.join(__dirname, '../server/firebase-admin'));
const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const SPECIAL_REGEX = /^(उपर्युक्त|उपरोक्त)\s*(सभी|में से कोई नहीं)|^(इनमें से कोई नहीं)$/i;

/**
 * Saves a direct test to Firestore and local cache with randomized options & balanced correctIndex
 */
async function saveCgGkTest(title, topicName, questions) {
  const testId = `test_cggk_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const timestamp = new Date().toISOString();

  // Balanced target indices pool for the questions
  const pool = [0, 0, 1, 1, 2, 2, 3, 3, Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
  const targets = shuffleArray(pool);

  const enrichedQuestions = questions.map((q, idx) => {
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
        const nonSpecialDistractors = shuffleArray(q.options.filter(o => o !== specialOpt && o !== oldCorrectOpt));
        const target = targets[idx % targets.length] % 3;
        newCorrectIdx = target;
        newOptions[target] = oldCorrectOpt;
        let d = 0;
        for (let i = 0; i < 3; i++) {
          if (i !== target) {
            newOptions[i] = nonSpecialDistractors[d++];
          }
        }
      }
    } else {
      const target = targets[idx % targets.length];
      newCorrectIdx = target;
      newOptions[target] = oldCorrectOpt;
      const distractors = shuffleArray(q.options.filter(o => o !== oldCorrectOpt));
      let d = 0;
      for (let i = 0; i < 4; i++) {
        if (i !== target) {
          newOptions[i] = distractors[d++];
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      if (newOptions[i] === undefined) {
        throw new Error(`Integrity error in ${title} Q${idx + 1}: option ${i} is undefined!`);
      }
    }

    if (newOptions[newCorrectIdx] !== oldCorrectOpt) {
      throw new Error(`Integrity error in ${title} Q${idx + 1}: correct answer mismatch!`);
    }

    return {
      id: qId,
      question: q.question,
      options: newOptions,
      correctIndex: newCorrectIdx,
      explanation: q.explanation || '',
      subject: 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)',
      difficulty: q.difficulty || 'moderate',
      weightage: q.weightage || 'medium',
      timestamp,
      qType: q.qType || 'standard',
      assertion: q.assertion || '',
      reason: q.reason || '',
      columnI: q.columnI || [],
      columnII: q.columnII || [],
      statements: q.statements || [],
      statementLabels: q.statementLabels || [],
      topic: topicName,
      sourcePattern: q.sourcePattern || 'CG Vyapam PYQ Inspired',
      yearTrend: q.yearTrend || '2020-2026',
      expectedIn2026: true
    };
  });

  const newTest = {
    id: testId,
    title,
    examId: 'cgv_master',
    examName: 'CG VYAPAM BASICS',
    examIds: ['cgv_master', 'cgpsc_sse'],
    examNames: ['CG VYAPAM BASICS', 'CGPSC SSE'],
    subject: 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)',
    mode: 'mock',
    language: 'hindi',
    questions: enrichedQuestions,
    pattern: {
      totalQuestions: enrichedQuestions.length,
      totalMarks: enrichedQuestions.length,
      durationMinutes: 15,
      markingScheme: '+1 for correct, -0.25 for incorrect'
    },
    topic: topicName,
    topicName: topicName,
    createdAt: timestamp
  };

  await db.collection('tests').doc(testId).set(newTest);

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

  try {
    let meta = [];
    if (fs.existsSync(metaFilePath)) {
      meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
    }
    meta.push({
      id: testId,
      title,
      examId: newTest.examId,
      examIds: newTest.examIds,
      examName: newTest.examName,
      examNames: newTest.examNames,
      subject: newTest.subject,
      mode: newTest.mode,
      language: newTest.language,
      totalQuestions: enrichedQuestions.length,
      pattern: newTest.pattern,
      createdAt: timestamp,
      topic: topicName,
      topicName: topicName
    });
    fs.writeFileSync(metaFilePath, JSON.stringify(meta, null, 2), 'utf8');
  } catch (mErr) {
    console.warn('Meta update warning:', mErr.message);
  }

  console.log(`✅ Uploaded: "${title}" (ID: ${testId}) [Ans dist: A:${enrichedQuestions.filter(q=>q.correctIndex===0).length}, B:${enrichedQuestions.filter(q=>q.correctIndex===1).length}, C:${enrichedQuestions.filter(q=>q.correctIndex===2).length}, D:${enrichedQuestions.filter(q=>q.correctIndex===3).length}]`);
}

module.exports = { saveCgGkTest };
