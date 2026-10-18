const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

function sanitizeForFirestore(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (Array.isArray(item)) {
        return { cells: item.map(sanitizeForFirestore) };
      }
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

async function fix() {
  // 1. bio_3
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_bio_3');
    const doc = await ref.get();
    let data = doc.data();

    // Replace any backspace character or broken \beta
    let c2 = data.studyNotes.chapters[2].content;
    c2 = c2.replace(/[\x08]eta/g, '\\beta');
    c2 = c2.replace(/\$ eta\$/g, '$\\beta$');
    data.studyNotes.chapters[2].content = c2;

    let c3 = data.studyNotes.chapters[3].content;
    c3 = c3.replace(
      '\\text{पेप्सिन (सक्रिय)}}}',
      '\\text{पेप्सिन (सक्रिय)}}$$'
    );
    data.studyNotes.chapters[3].content = c3;

    if (Array.isArray(data.studyNotes.mcqs)) {
      data.studyNotes.mcqs.forEach(m => {
        if (m.question) {
          m.question = m.question.replace(/[\x08]eta/g, '\\beta');
          m.question = m.question.replace(/\$ eta\$/g, '$\\beta$');
        }
      });
    }

    data.updatedAt = new Date().toISOString();
    data = sanitizeForFirestore(data);
    await ref.set(data);
    console.log('✅ cgv_master_bio_3 fixed cleanly');
  }

  // 2. chem_6
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_chem_6');
    const doc = await ref.get();
    let data = doc.data();

    const tbl = data.studyNotes.comparativeTables[2];
    tbl.rows = tbl.rows.map(row => {
      const cells = row.cells.map(cell => {
        if (typeof cell !== 'string') return cell;
        // Fix any missing closing dollar before closing parenthesis: e.g. (\%)\) -> (\%\$\)
        return cell.replace(/\\%\)(?![\$])/g, '\\%$)');
      });
      return { cells };
    });

    data.updatedAt = new Date().toISOString();
    data = sanitizeForFirestore(data);
    await ref.set(data);
    console.log('✅ cgv_master_chem_6 fixed cleanly');
  }
}

fix().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
