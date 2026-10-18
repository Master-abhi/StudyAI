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

function checkMathInString(str, docId, path) {
  const issues = [];
  if (typeof str !== 'string') return issues;

  // Match $$...$$
  const dMatches = str.match(/\$\$([\s\S]*?)\$\$/g);
  if (dMatches) {
    for (const dm of dMatches) {
      const expr = dm.slice(2, -2).trim();
      try {
        katex.renderToString(expr, { throwOnError: true });
      } catch (e) {
        issues.push({ path, expr, error: e.message });
      }
    }
  }

  // Match inline $...$ (ignoring escaped \$ and $$)
  const withoutDisplay = str.replace(/\$\$[\s\S]*?\$\$/g, '');
  const sMatches = withoutDisplay.match(/(?<!\\)\$([^$\n\r]+?)(?<!\\)\$/g);
  if (sMatches) {
    for (const sm of sMatches) {
      const expr = sm.slice(1, -1).trim();
      try {
        katex.renderToString(expr, { throwOnError: true });
      } catch (e) {
        issues.push({ path, expr, error: e.message });
      }
    }
  }

  // Also check for unclosed $
  const withoutEscaped = withoutDisplay.replace(/\\\\\$/g, '').replace(/\\\$+/g, '');
  const rawDollars = withoutEscaped.match(/(?<!\\)\$/g);
  if (rawDollars && rawDollars.length % 2 !== 0) {
    issues.push({ path, error: `Unclosed dollar sign (count: ${rawDollars.length})` });
  }

  return issues;
}

function traverse(obj, docId, currentPath, allIssues) {
  if (!obj) return;
  if (typeof obj === 'string') {
    const issues = checkMathInString(obj, docId, currentPath);
    if (issues.length) {
      allIssues.push(...issues);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, idx) => traverse(item, docId, `${currentPath}[${idx}]`, allIssues));
  } else if (typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      traverse(v, docId, `${currentPath}.${k}`, allIssues);
    }
  }
}

async function run() {
  const snapshot = await db.collection('topic_study_notes').get();
  console.log(`Auditing field-by-field for ${snapshot.size} documents...\n`);

  let docErrorCount = 0;
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const docIssues = [];
    traverse(data, doc.id, doc.id, docIssues);

    if (docIssues.length > 0) {
      docErrorCount++;
      console.log(`=== Doc: ${doc.id} (${docIssues.length} issues) ===`);
      docIssues.forEach(iss => {
        console.log(`  Path: ${iss.path}`);
        if (iss.expr) console.log(`  Expr: "${iss.expr}"`);
        console.log(`  Error: ${iss.error}`);
      });
      console.log('');
    }
  }

  console.log(`\nAudit complete. Docs with real math issues: ${docErrorCount}`);
}

run().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
