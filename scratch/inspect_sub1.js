const { db } = require('../server/firebase-admin');

async function inspectSub1() {
  const doc = await db.collection('syllabi').doc('cgv_master').get();
  const data = doc.data();
  const sub1 = data.subjects[1];
  console.log(`=== Subject 1: ${sub1.id} - ${sub1.name} ===`);
  sub1.chapters.forEach((c, cIdx) => {
    console.log(`\nChapter ${cIdx + 1}: ${c.id} - ${c.name} (${c.topics.length} topics)`);
    c.topics.forEach(t => {
      console.log(`  - ${t.id} | ${t.name} | ${t.nameHi || ''} | ${JSON.stringify(t.subtopics || [])}`);
    });
  });
  process.exit(0);
}

inspectSub1().catch(err => {
  console.error(err);
  process.exit(1);
});
