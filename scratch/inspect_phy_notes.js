const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

const topicDocIds = ['cgv_master_phy_1', 'cgv_master_phy_2', 'cgv_master_phy_3', 'cgv_master_phy_4'];

async function run() {
  for (const docId of topicDocIds) {
    const snap = await db.collection('topic_study_notes').doc(docId).get();
    if (!snap.exists) {
      console.log(`Doc ${docId} not found.`);
      continue;
    }
    const data = snap.data();
    const notes = data.studyNotes;
    console.log(`\n================== ${docId} ==================`);
    console.log('Title:', notes.title);
    console.log('TitleHi:', notes.titleHi);
    console.log('Chapters before:');
    notes.chapters.forEach((ch, i) => {
      console.log(`  [${i+1}] ${ch.title} || ${ch.titleHi}`);
    });
    console.log('Key terminology sample before:');
    if (notes.keyTerminology && notes.keyTerminology.length > 0) {
      console.log('  Term 1:', notes.keyTerminology[0]);
    }
  }
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
