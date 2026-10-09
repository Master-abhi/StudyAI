const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

async function inspectCGTests() {
  const testsSnap = await db.collection('tests').get();
  const cgTests = [];
  testsSnap.forEach(d => {
    const data = d.data();
    const s = data.subject || '';
    if (s.toLowerCase().includes('chhattisgarh') || s.includes('छत्तीसगढ़')) {
      cgTests.push({ id: d.id, title: data.title, topic: data.topicName, topicId: data.topicId, subject: s, examId: data.examId });
    }
  });

  console.log(`Total CG related tests: ${cgTests.length}`);
  const examMap = {};
  cgTests.forEach(t => {
    examMap[t.examId] = (examMap[t.examId] || 0) + 1;
  });
  console.log('By examId:', examMap);

  // Print sample 10 tests
  console.log('Sample tests:');
  console.log(cgTests.slice(0, 10));
}

inspectCGTests().catch(console.error);
