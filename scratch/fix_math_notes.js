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

async function fixAll() {
  console.log('Fixing math errors in Firestore documents with full array sanitization...\n');

  // 1. cgv_master_adv_sci_1
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_adv_sci_1');
    const doc = await ref.get();
    if (doc.exists) {
      let data = doc.data();
      let ch0 = data.studyNotes?.chapters?.[0]?.content || '';
      ch0 = ch0.replace(
        '4\\;^1_1\\text{H} \\rightarrow \\;^4_2\\text{He} + 2\\;^0_{+1}e + 2\\nu + 26.7\\;\\text{MeV}',
        '4{}^1_1\\text{H} \\rightarrow {}^4_2\\text{He} + 2{}^0_{+1}e + 2\\nu + 26.7\\;\\text{MeV}'
      );
      data.studyNotes.chapters[0].content = ch0;
      data.updatedAt = new Date().toISOString();
      data = sanitizeForFirestore(data);
      await ref.set(data);
      console.log('✅ cgv_master_adv_sci_1 fixed (proton-proton fusion equation)');
    }
  }

  // 2. cgv_master_adv_sci_2
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_adv_sci_2');
    const doc = await ref.get();
    if (doc.exists) {
      let data = doc.data();
      const qf = data.studyNotes?.overview?.quickFacts || [];
      data.studyNotes.overview.quickFacts = qf.map(fact => {
        if (typeof fact === 'string') {
          return fact.replace(
            '$1\\;\\text{पारसेक} = 3.26\\;\\text{प्रकाश वर्ष} = 3.0857 \\times 10^{16}\\;\\text{मीटर}$',
            '1 पारसेक = 3.26 प्रकाश वर्ष = $3.0857 \\times 10^{16}$ मीटर'
          ).replace(
            '$4.24$ प्रकाश वर्ष',
            '4.24 प्रकाश वर्ष'
          );
        }
        return fact;
      });
      data.updatedAt = new Date().toISOString();
      data = sanitizeForFirestore(data);
      await ref.set(data);
      console.log('✅ cgv_master_adv_sci_2 fixed (quickFacts parsec & clean math)');
    }
  }

  // 3. cgv_master_bio_3
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_bio_3');
    const doc = await ref.get();
    if (doc.exists) {
      let data = doc.data();
      if (data.studyNotes?.chapters?.[2]?.content) {
        data.studyNotes.chapters[2].content = data.studyNotes.chapters[2].content.replace(/\$ eta\$/g, '$\\beta$');
      }
      if (data.studyNotes?.chapters?.[3]?.content) {
        data.studyNotes.chapters[3].content = data.studyNotes.chapters[3].content.replace(
          '\\text{पेप्सिन (सक्रिय)}}}',
          '\\text{पेप्सिन (सक्रिय)}}$$'
        );
      }
      if (Array.isArray(data.studyNotes?.mcqs)) {
        data.studyNotes.mcqs.forEach(m => {
          if (m.question) m.question = m.question.replace(/\$ eta\$/g, '$\\beta$');
        });
      }
      data.updatedAt = new Date().toISOString();
      data = sanitizeForFirestore(data);
      await ref.set(data);
      console.log('✅ cgv_master_bio_3 fixed (beta-cells & pepsinogen KaTeX)');
    }
  }

  // 4. cgv_master_chem_13
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_chem_13');
    const doc = await ref.get();
    if (doc.exists) {
      let data = doc.data();
      if (data.studyNotes?.chapters?.[0]?.content) {
        data.studyNotes.chapters[0].content = data.studyNotes.chapters[0].content.replace(/\\text\{\s*\\mu\s*m\}/g, '\\mu\\text{m}');
      }
      data.updatedAt = new Date().toISOString();
      data = sanitizeForFirestore(data);
      await ref.set(data);
      console.log('✅ cgv_master_chem_13 fixed (micrometers \\mu\\text{m})');
    }
  }

  // 5. cgv_master_chem_6
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_chem_6');
    const doc = await ref.get();
    if (doc.exists) {
      let data = doc.data();
      const tbl = data.studyNotes?.comparativeTables?.[2];
      if (tbl && Array.isArray(tbl.rows)) {
        tbl.rows = tbl.rows.map(row => {
          const cells = Array.isArray(row) ? row : (row.cells || []);
          const fixedCells = cells.map(cell => {
            if (typeof cell !== 'string') return cell;
            return cell
              .replace(/\(\$Ni \\approx 15-20\\%\)/g, '($Ni \\approx 15-20\%$)')
              .replace(/\(\\text\{चांदी \} 0\\%\)/g, '(चांदी $0\%$)');
          });
          return { cells: fixedCells };
        });
      }
      data.updatedAt = new Date().toISOString();
      data = sanitizeForFirestore(data);
      await ref.set(data);
      console.log('✅ cgv_master_chem_6 fixed (alloys table rows and math delimiters)');
    }
  }

  // 6. cgv_master_chem_7
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_chem_7');
    const doc = await ref.get();
    if (doc.exists) {
      let data = doc.data();
      if (data.studyNotes?.chapters?.[1]?.content) {
        data.studyNotes.chapters[1].content = data.studyNotes.chapters[1].content.replace(
          'Black & White Photography',
          'Black \\& White Photography'
        );
      }
      data.updatedAt = new Date().toISOString();
      data = sanitizeForFirestore(data);
      await ref.set(data);
      console.log('✅ cgv_master_chem_7 fixed (Black \\& White Photography)');
    }
  }

  // 7. cgv_master_env_5
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_env_5');
    const doc = await ref.get();
    if (doc.exists) {
      let data = doc.data();
      if (data.studyNotes?.chapters?.[0]?.content) {
        data.studyNotes.chapters[0].content = data.studyNotes.chapters[0].content.replace(
          '4\\;^1\\text{H} \\rightarrow \\;^4\\text{He} + \\text{ऊर्जा}',
          '4{}^1\\text{H} \\rightarrow {}^4\\text{He} + \\text{ऊर्जा}'
        );
      }
      const tbl = data.studyNotes?.comparativeTables?.[1];
      if (tbl && Array.isArray(tbl.rows)) {
        tbl.rows = tbl.rows.map(row => {
          const cells = Array.isArray(row) ? row : (row.cells || []);
          const fixedCells = cells.map(cell => {
            if (typeof cell !== 'string') return cell;
            return cell.replace(/\$(\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)?\s*प्रति\s*किग्रा)/g, '\\$$$1');
          });
          return { cells: fixedCells };
        });
      }
      data.updatedAt = new Date().toISOString();
      data = sanitizeForFirestore(data);
      await ref.set(data);
      console.log('✅ cgv_master_env_5 fixed (nuclear equation & currency dollars)');
    }
  }

  // 8. cgv_master_ind_misc_2
  {
    const ref = db.collection('topic_study_notes').doc('cgv_master_ind_misc_2');
    const doc = await ref.get();
    if (doc.exists) {
      let data = doc.data();
      const tbl = data.studyNotes?.comparativeTables?.[1];
      if (tbl && Array.isArray(tbl.rows)) {
        tbl.rows = tbl.rows.map(row => {
          const cells = Array.isArray(row) ? row : (row.cells || []);
          const fixedCells = cells.map(cell => {
            if (typeof cell !== 'string') return cell;
            return cell
              .replace(/2017 PPP \$/g, '2017 PPP \\$')
              .replace(/^\$(\d+)/g, '\\$$$1');
          });
          return { cells: fixedCells };
        });
      }
      if (Array.isArray(data.studyNotes?.confusionBuster)) {
        data.studyNotes.confusionBuster.forEach(cb => {
          if (cb.conceptB) cb.conceptB = cb.conceptB.replace(/PPP \$/g, 'PPP \\$');
        });
      }
      data.updatedAt = new Date().toISOString();
      data = sanitizeForFirestore(data);
      await ref.set(data);
      console.log('✅ cgv_master_ind_misc_2 fixed (PPP \\$ and currency dollars)');
    }
  }

  console.log('\nAll documents successfully fixed in Firestore! 🚀');
}

fixAll().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
