const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

async function checkCGGK() {
  const testsSnap = await db.collection('tests').where('subject', '==', 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)').get();
  console.log('Total CG GK tests:', testsSnap.size);
  let standardOnlyCount = 0;
  let fiveTypesCount = 0;
  const standardOnlyTests = [];

  for (const doc of testsSnap.docs) {
    const data = doc.data();
    const qSnap = await db.collection('tests').doc(doc.id).collection('questions').get();
    const types = new Set();
    qSnap.forEach(q => types.add(q.data().qType || 'standard'));
    if (types.size === 1 && types.has('standard')) {
      standardOnlyCount++;
      standardOnlyTests.push({ id: doc.id, title: data.title, topic: data.topicName });
    } else {
      fiveTypesCount++;
    }
  }
  console.log('5 Types Count:', fiveTypesCount);
  console.log('Standard Only Count:', standardOnlyCount);
  console.log('Standard only tests list:');
  standardOnlyTests.forEach(t => console.log(`- ${t.title} (${t.topic})`));
}
checkCGGK().catch(console.error);
