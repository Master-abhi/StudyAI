const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function fixEco() {
  const doc = await db.collection('topic_study_notes').doc('cgv_master_ind_eco_1').get();
  const d = doc.data();
  const ch5 = d.studyNotes.chapters[4];
  console.log('Original content:', ch5.content);
  // Replace unescaped single $ that is not part of a math pair
  // For instance, '$1.2 बिलियन' -> '\$1.2 बिलियन'
  ch5.content = ch5.content.replace(/(?<!\\)\$(\d+(?:\.\d+)?\s*(?:बिलियन|मिलियन|करोड़|हजार|[a-zA-Z\u0900-\u097F]))/g, '\\$$$1');
  // Or check if there's any other standalone $
  const withoutD = ch5.content.replace(/\$\$[\s\S]*?\$\$/g, '');
  const remaining = withoutD.match(/(?<!\\)\$/g);
  console.log('Remaining single $ count:', remaining ? remaining.length : 0);
  if (remaining && remaining.length % 2 !== 0) {
    console.log('Still odd! Let us inspect:');
    ch5.content.split('\n').forEach((l, i) => {
      const m = l.match(/(?<!\\)\$/g);
      if (m && m.length % 2 !== 0) console.log(`Line ${i+1}: ${l}`);
    });
  }
  await db.collection('topic_study_notes').doc('cgv_master_ind_eco_1').set(d);
  console.log('Updated cgv_master_ind_eco_1! ✅');
}

fixEco().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
