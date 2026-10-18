import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');
import katex from '../mcq-practice/node_modules/katex/dist/katex.mjs';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

async function deepAudit() {
  const snapshot = await db.collection('topic_study_notes').get();
  console.log(`Auditing KaTeX across all ${snapshot.size} documents in topic_study_notes...\n`);

  let errorCount = 0;
  const docsWithErrors = new Set();

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const id = doc.id;
    const strData = JSON.stringify(data);

    // Find all $$...$$ and $...$
    const mathRegex = /\$\$([\s\S]*?)\$\$|\$([^$\n\r]+?)\$/g;
    let match;
    while ((match = mathRegex.exec(strData)) !== null) {
      const expr = match[1] || match[2];
      if (!expr || !expr.trim()) continue;
      
      // Unescape json escaped backslashes for testing as raw LaTeX
      let unescaped = expr.trim();
      try {
        unescaped = JSON.parse(`"${unescaped}"`);
      } catch (e) {
        // use as is
      }

      try {
        katex.renderToString(unescaped, { throwOnError: true });
      } catch (err) {
        console.log(`[ERR] Doc: ${id}`);
        console.log(`      Expr: "${unescaped}"`);
        console.log(`      Msg:  ${err.message}\n`);
        errorCount++;
        docsWithErrors.add(id);
      }
    }
  }

  console.log(`KaTeX Audit Complete. Found ${errorCount} errors in ${docsWithErrors.size} documents.`);
  if (docsWithErrors.size > 0) {
    console.log(`Docs with errors:`, Array.from(docsWithErrors));
  }
}

deepAudit().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
