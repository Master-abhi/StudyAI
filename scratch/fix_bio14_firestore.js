const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');
const fs = require('fs');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

function sanitizeForFirestore(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (Array.isArray(item)) return { cells: item.map(sanitizeForFirestore) };
      return sanitizeForFirestore(item);
    });
  }
  if (obj && typeof obj === 'object') {
    const res = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'rows' && Array.isArray(v)) {
        res[k] = v.map(row => {
          if (Array.isArray(row)) return { cells: row.map(sanitizeForFirestore) };
          if (row && typeof row === 'object' && Array.isArray(row.cells)) {
            return { ...row, cells: row.cells.map(sanitizeForFirestore) };
          }
          return row;
        });
      } else {
        res[k] = sanitizeForFirestore(v);
      }
    }
    return res;
  }
  return obj;
}

async function run() {
  const docRef = db.collection('topic_study_notes').doc('cgv_master_bio_14');
  const snap = await docRef.get();
  if (!snap.exists) {
    console.error('Doc not found!');
    process.exit(1);
  }

  const data = snap.data();
  let content = data.studyNotes.chapters[0].content;

  const startMarker = 'जीवों के वर्गीकरण की 7 अनिवार्य मूल श्रेणियां अवरोही क्रम (उच्च से निम्न) में निम्नलिखित हैं:';
  const endMarker = '- **वर्गीकरण की सबसे बड़ी / सर्वोच्च इकाई:**';

  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error('Markers not found! start:', startIdx, 'end:', endIdx);
    process.exit(1);
  }

  const replacementMiddle = `\n**पदानुक्रम (उच्च से निम्न क्रम):**  \n**जगत (Kingdom)** ➔ **संघ/प्रभाग (Phylum/Division)** ➔ **वर्ग (Class)** ➔ **गण (Order)** ➔ **कुल (Family)** ➔ **वंश (Genus)** ➔ **जाति (Species)**\n\n`;

  const newContent = content.slice(0, startIdx + startMarker.length) + replacementMiddle + content.slice(endIdx);
  data.studyNotes.chapters[0].content = newContent;
  data.updatedAt = new Date().toISOString();

  const sanitized = sanitizeForFirestore(data);
  await docRef.set(sanitized);

  // Update local cache as well
  const jsonPath = 'server/data_cache/topic_notes_cgv_master_bio_14.json';
  if (fs.existsSync(jsonPath)) {
    const cache = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    cache.studyNotes.chapters[0].content = newContent;
    fs.writeFileSync(jsonPath, JSON.stringify(cache, null, 2), 'utf8');
  }

  console.log('✅ Successfully updated Firestore and data_cache!');

  // Verify
  const verifySnap = await docRef.get();
  const vContent = verifySnap.data().studyNotes.chapters[0].content;
  const vIdx = vContent.indexOf('Taxonomic Hierarchy');
  console.log('--- VERIFICATION ---');
  console.log(vContent.slice(vIdx, vIdx + 400));
}

run().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
