const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function cleanTitles() {
  const p3Ref = db.collection('topic_study_notes').doc('cgv_master_phy_3');
  const p3Snap = await p3Ref.get();
  if (p3Snap.exists) {
    const d = p3Snap.data();
    d.studyNotes.title = 'न्यूटन के गति के नियम: जड़त्व, बल, संवेग, आवेग, क्रिया-प्रतिक्रिया, रेखीय संवेग संरक्षण तथा घर्षण बल';
    d.studyNotes.titleHi = d.studyNotes.title;
    await p3Ref.set(d);
    console.log('cgv_master_phy_3 title updated.');
  }

  const p4Ref = db.collection('topic_study_notes').doc('cgv_master_phy_4');
  const p4Snap = await p4Ref.get();
  if (p4Snap.exists) {
    const d = p4Snap.data();
    d.studyNotes.title = 'कार्य, ऊर्जा एवं शक्ति: वैज्ञानिक संकल्पना, गतिज व स्थितिज ऊर्जा, कार्य-ऊर्जा प्रमेय तथा शक्ति के मात्रक';
    d.studyNotes.titleHi = d.studyNotes.title;
    await p4Ref.set(d);
    console.log('cgv_master_phy_4 title updated.');
  }
}

cleanTitles().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
