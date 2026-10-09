const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

async function inspectAll() {
  const testsSnap = await db.collection('tests').get();
  console.log('Total tests in database:', testsSnap.size);
  const subjects = {};
  const topicCounts = {};

  testsSnap.forEach(d => {
    const data = d.data();
    const s = data.subject || 'Unknown';
    subjects[s] = (subjects[s] || 0) + 1;

    const key = `${s} -> ${data.topicName || data.topicId || 'Unknown Topic'}`;
    topicCounts[key] = (topicCounts[key] || 0) + 1;
  });

  console.log('\n--- TESTS BY SUBJECT ---');
  for (const [subj, count] of Object.entries(subjects)) {
    console.log(`${subj}: ${count} tests`);
  }

  // Also check the syllabus collection
  const syllabusSnap = await db.collection('syllabus').get();
  console.log('\n--- SYLLABUS COLLECTION ENTRIES ---');
  syllabusSnap.forEach(d => {
    const s = d.data();
    console.log(`Doc ID: ${d.id} | examId: ${s.examId} | name: ${s.name || s.examName} | subjects count: ${s.subjects ? s.subjects.length : (s.chapters ? s.chapters.length : 0)}`);
  });
}

inspectAll().catch(console.error);
