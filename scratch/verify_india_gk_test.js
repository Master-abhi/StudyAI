const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

async function check() {
  const testId = 'test_ind_ind_hist_1_01_1790732127780';
  const testDoc = await db.collection('tests').doc(testId).get();
  console.log('Title:', testDoc.data().title);
  console.log('Subject:', testDoc.data().subject);
  const qSnap = await db.collection('questions').where('testId', '==', testId).get();
  console.log('Questions count:', qSnap.size);
  let i = 1;
  qSnap.forEach(d => {
    const q = d.data();
    console.log(`Q${i++} [${q.qType}] AnsIdx: ${q.correctIndex} | Correct: ${q.options[q.correctIndex]}`);
    if (q.qType === 'assertion_reason') console.log('   As:', q.assertion, '| R:', q.reason);
    if (q.qType === 'match_column') console.log('   Col1:', q.columnI, '| Col2:', q.columnII);
    if (q.qType === 'ordering' || q.qType === 'multi_statement') console.log('   Statements:', q.statements);
  });
  process.exit(0);
}

check().catch(console.error);
