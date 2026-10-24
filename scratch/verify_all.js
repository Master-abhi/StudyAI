const path = require('path');
const admin = require(path.resolve(process.cwd(), 'server/node_modules/firebase-admin'));
const serviceAccount = require(path.resolve(process.cwd(), 'server/service-account.json'));
if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function verifyAll() {
  const doc = await db.collection('syllabi').doc('cgv_master').get();
  const data = doc.data();
  console.log('=== CG VYAPAM MASTER SYLLABUS FINAL AUDIT ===');
  let totalTopics = 0;
  let completedTopics = 0;
  data.subjects.forEach((sub, sIdx) => {
    let subTotal = 0;
    let subDone = 0;
    sub.chapters.forEach(ch => {
      ch.topics.forEach(t => {
        subTotal++;
        totalTopics++;
        if (t.hasStudyNotes) {
          subDone++;
          completedTopics++;
        }
      });
    });
    console.log(`Subject ${sIdx}: ${sub.name} (${sub.id}) -> ${subDone}/${subTotal} (${Math.round(subDone/subTotal*100)}%)`);
  });
  console.log('--------------------------------------------');
  console.log(`OVERALL TOTAL: ${completedTopics} / ${totalTopics} topics with study notes (${Math.round(completedTopics/totalTopics*100)}%)`);
}
verifyAll();
