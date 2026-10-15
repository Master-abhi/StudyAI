const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function cleanPhysicsNotes() {
  const topics = ['cgv_master_phy_1', 'cgv_master_phy_2', 'cgv_master_phy_3', 'cgv_master_phy_4'];

  for (const docId of topics) {
    console.log(`\n================ Processing ${docId} ================`);
    const docRef = db.collection('topic_study_notes').doc(docId);
    const snap = await docRef.get();
    if (!snap.exists) {
      console.log(`Document ${docId} does not exist in Firestore!`);
      continue;
    }

    const data = snap.data();
    const notes = data.studyNotes;

    // 1. Clean Title and Overview
    if (notes.titleHi) {
      notes.title = notes.titleHi;
    }
    // Remove CG mentions from subtitle & overview
    if (notes.subtitle) {
      notes.subtitle = notes.subtitle
        .replace(/,\s*हसदेव बांगो व कोरबा विद्युत गृह.*/g, '')
        .replace(/,\s*छत्तीसगढ़ भू-मापन जरीब.*$/g, '')
        .replace(/,\s*तथा छत्तीसगढ़ के.*$/g, '')
        .replace(/,\s*छत्तीसगढ़ के औद्योगिक अनुप्रयोग.*$/g, '')
        .trim();
    }
    if (notes.overview) {
      notes.overview = notes.overview
        .replace(/तथा छत्तीसगढ़ के ऊर्जा परिदृश्य.*प्रस्तुत किया गया है।/g, 'का समग्र एवं गहन विश्लेषण प्रस्तुत किया गया है।')
        .replace(/तथा छत्तीसगढ़ के प्रमुख औद्योगिक.*प्रस्तुत किया गया है।/g, 'का समग्र एवं गहन विश्लेषण प्रस्तुत किया गया है।')
        .replace(/तथा छत्तीसगढ़ में राजस्व भू-मापन.*प्रस्तुत किया गया है।/g, 'का समग्र एवं गहन विश्लेषण प्रस्तुत किया गया है।')
        .replace(/तथा छत्तीसगढ़ के इंजीनियरिंग परिप्रेक्ष्य.*प्रस्तुत किया गया है।/g, 'का समग्र एवं गहन विश्लेषण प्रस्तुत किया गया है।')
        .trim();
    }
    if (notes.standardReference) {
      notes.standardReference = notes.standardReference
        .replace(/,\s*CSPGCL \/ CREDA Official Reports/g, '')
        .replace(/,\s*Chhattisgarh Revenue Code.*$/g, '')
        .trim();
    }

    // 2. Remove root cgContext if present
    if (notes.cgContext) {
      delete notes.cgContext;
      console.log('- Removed root cgContext');
    }

    // 3. Process Chapters
    let newChapters = [];
    for (let ch of notes.chapters) {
      const isCgChapter = 
        (ch.title && (ch.title.includes('Chhattisgarh') || ch.title.includes('छत्तीसगढ़'))) ||
        (ch.titleHi && (ch.titleHi.includes('छत्तीसगढ़') || ch.titleHi.includes('Chhattisgarh')));

      if (docId === 'cgv_master_phy_2' && isCgChapter) {
        // In phy_2, Chapter 6 has Circular & Projectile Motion combined with CG applications.
        // Keep the circular & projectile motion content, strip only CG section 3!
        console.log('- Modifying phy_2 Chapter 6: retaining circular/projectile motion, removing CG section 3');
        ch.title = 'वृत्तीय गति एवं प्रक्षेप्य गति: अभिकेंद्रीय बल व त्वरण, प्रक्षेप्य पथ समीकरण तथा अधिकतम परास';
        ch.titleHi = 'वृत्तीय गति एवं प्रक्षेप्य गति: अभिकेंद्रीय बल व त्वरण, प्रक्षेप्य पथ समीकरण तथा अधिकतम परास';
        ch.chapterTitle = ch.titleHi;
        if (ch.content) {
          // Keep content up to section 3
          const idxSec3 = ch.content.indexOf('### 3. छत्तीसगढ़ के विशिष्ट व्यावहारिक');
          if (idxSec3 !== -1) {
            ch.content = ch.content.substring(0, idxSec3).trim();
          }
        }
        if (ch.keyTakeaways) {
          ch.keyTakeaways = ch.keyTakeaways.filter(t => !t.includes('केशकाल'));
        }
        newChapters.push(ch);
      } else if (isCgChapter) {
        console.log(`- Dropping CG chapter: "${ch.title || ch.titleHi}"`);
        // drop this chapter
      } else {
        // Keep pure physics chapter
        // Ensure titles are Hindi
        if (ch.titleHi) {
          ch.title = ch.titleHi;
          ch.chapterTitle = ch.titleHi;
        }
        newChapters.push(ch);
      }
    }

    // Renumber chapters sequentially
    newChapters.forEach((ch, idx) => {
      ch.chapterNumber = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
    });
    notes.chapters = newChapters;
    console.log(`- Total chapters after cleanup: ${notes.chapters.length}`);

    // 4. Clean Key Terminology: ensure Hindi definition in meaning
    if (Array.isArray(notes.keyTerminology)) {
      notes.keyTerminology.forEach(item => {
        if (item.hiMeaning) {
          item.meaning = item.hiMeaning;
        }
      });
      console.log(`- Updated ${notes.keyTerminology.length} key terms to have Hindi meaning.`);
    }

    // 5. Update Firestore
    data.studyNotes = notes;
    data.updatedAt = new Date().toISOString();
    await docRef.set(data);
    console.log(`- Firestore document ${docId} successfully updated! ✅`);
  }

  // Update local cache if needed
  const cachePath = path.resolve(__dirname, '../server/data_cache/syllabi_custom_all.json');
  if (fs.existsSync(cachePath)) {
    try {
      const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      // Just ensure cache is written or touched if appropriate
      console.log('Local syllabi_custom_all.json cache exists.');
    } catch (e) {
      console.error('Cache read error:', e.message);
    }
  }

  console.log('\nAll 4 Physics topics cleaned up successfully!');
}

cleanPhysicsNotes()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error during cleanup:', err);
    process.exit(1);
  });
