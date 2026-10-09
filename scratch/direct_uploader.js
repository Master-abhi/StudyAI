const path = require('path');
const fs = require('fs');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { db } = require(path.join(__dirname, '../server/firebase-admin'));
const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');

async function saveDirectTest(title, topicName, questions) {
  const testId = `test_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const timestamp = new Date().toISOString();

  const enrichedQuestions = questions.map((q, idx) => {
    const qId = `q_${testId}_${idx}`;
    return {
      id: qId,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation || '',
      subject: 'Aptitude and Mathematics',
      difficulty: q.difficulty || 'moderate',
      weightage: 'medium',
      timestamp,
      qType: 'standard',
      assertion: '',
      reason: '',
      columnI: [],
      columnII: [],
      statements: [],
      statementLabels: [],
      topic: topicName,
      sourcePattern: 'CG Vyapam Standard',
      yearTrend: '2020-2026',
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
    subject: 'Aptitude and Mathematics',
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
      totalQuestions: 10,
      pattern: newTest.pattern,
      createdAt: timestamp
    });
    fs.writeFileSync(metaFilePath, JSON.stringify(meta, null, 2), 'utf8');
  } catch (mErr) {
    console.warn('Meta update warning:', mErr.message);
  }

  console.log(`✅ Uploaded: "${title}" (ID: ${testId})`);
}

module.exports = { saveDirectTest };
