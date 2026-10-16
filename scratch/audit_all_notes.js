const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

async function audit() {
  const snapshot = await db.collection('topic_study_notes').get();
  console.log(`Auditing ${snapshot.size} topic_study_notes documents...\n`);

  let totalIssues = 0;
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const id = doc.id;
    const notes = data.studyNotes;
    if (!notes || !Array.isArray(notes.chapters)) continue;

    notes.chapters.forEach((ch, chIdx) => {
      const text = ch.content || '';
      
      // Check for \begin{matrix}
      if (text.includes('\\begin{matrix}')) {
        console.log(`[ISSUE: \\begin{matrix}] Doc: ${id}, Chapter ${chIdx + 1} (${ch.title})`);
        totalIssues++;
      }

      // Check for unclosed $$
      const dMatches = text.match(/\$\$/g);
      if (dMatches && dMatches.length % 2 !== 0) {
        console.log(`[ISSUE: Unclosed $$] Doc: ${id}, Chapter ${chIdx + 1} (${ch.title}) - count: ${dMatches.length}`);
        totalIssues++;
      }

      // Check for unclosed single $ (ignoring escaped \$ and $$)
      const withoutDouble = text.replace(/\$\$[\s\S]*?\$\$/g, '');
      const sMatches = withoutDouble.match(/(?<!\\)\$/g);
      if (sMatches && sMatches.length % 2 !== 0) {
        console.log(`[ISSUE: Unclosed single $] Doc: ${id}, Chapter ${chIdx + 1} (${ch.title}) - count: ${sMatches.length}`);
        totalIssues++;
      }
    });
  }
  console.log(`\nAudit complete. Total issues found: ${totalIssues}`);
}

audit().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
