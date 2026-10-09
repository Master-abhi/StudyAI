const { db } = require('../server/firebase-admin');

async function inspectSyllabus() {
  const doc = await db.collection('syllabi').doc('cgv_master').get();
  const data = doc.data();
  console.log('Total Subjects in cgv_master:', data.subjects.length);
  data.subjects.forEach((s, sIdx) => {
    let subTotal = 0;
    let subDone = 0;
    (s.chapters || []).forEach(c => {
      (c.topics || []).forEach(t => {
        subTotal++;
        if (t.hasStudyNotes) subDone++;
      });
    });
    console.log(`Subject ${sIdx}: ${s.id} | ${s.name} [${subDone}/${subTotal}]`);
  });
  process.exit(0);
}

inspectSyllabus().catch(err => {
  console.error(err);
  process.exit(1);
});
