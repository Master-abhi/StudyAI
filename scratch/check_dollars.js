const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

async function check() {
  const doc = await db.collection('topic_study_notes').doc('cgv_master_chem_9').get();
  const d = doc.data();
  d.studyNotes.chapters.forEach((ch, idx) => {
    const text = ch.content;
    const dMatches = text.match(/\$\$/g);
    const withoutDouble = text.replace(/\$\$[\s\S]*?\$\$/g, '');
    const sMatches = withoutDouble.match(/\$/g);
    console.log(`Chapter ${idx + 1} (${ch.title}):`);
    console.log(`  $$ count: ${dMatches ? dMatches.length : 0} (even? ${(dMatches ? dMatches.length : 0) % 2 === 0})`);
    console.log(`  Single $ count: ${sMatches ? sMatches.length : 0} (even? ${(sMatches ? sMatches.length : 0) % 2 === 0})`);
    if (sMatches && sMatches.length % 2 !== 0) {
      console.log('  *** ODD NUMBER OF SINGLE $ IN CHAPTER', idx + 1);
    }
  });
}

check().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
