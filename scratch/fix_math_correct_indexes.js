const path = require('path');
const fs = require('fs');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function fixMathCorrectIndexes() {
  console.log('Fetching all tests for Aptitude and Mathematics...');
  const testsSnap = await db.collection('tests').where('subject', '==', 'Aptitude and Mathematics').get();
  console.log(`Found ${testsSnap.size} tests.`);

  let totalQuestionsFixed = 0;
  let dist = { 0: 0, 1: 0, 2: 0, 3: 0 };
  let batch = db.batch();
  let batchOps = 0;
  const maxBatch = 400;

  const commitBatchIfNeeded = async () => {
    if (batchOps >= maxBatch) {
      await batch.commit();
      console.log(`Committed batch of ${batchOps} question updates.`);
      batch = db.batch();
      batchOps = 0;
    }
  };

  const metaPath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');
  let meta = [];
  if (fs.existsSync(metaPath)) {
    meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  }

  for (const doc of testsSnap.docs) {
    const t = doc.data();
    if (!t.questions || !Array.isArray(t.questions)) continue;

    const topicName = t.topic || t.topicName || (t.questions[0] && t.questions[0].topic) || t.title.replace(/\s*-\s*Test\s*\d+.*$/i, '').trim();

    // Balanced distribution pool for 10 questions
    const pool = [0, 0, 1, 1, 2, 2, 3, 3, Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    const targets = shuffleArray(pool);

    const updatedQuestions = t.questions.map((q, idx) => {
      const oldIdx = (typeof q.correctIndex === 'number') ? q.correctIndex : 0;
      const correctOpt = q.options[oldIdx];
      const hasSpecial = q.options.some(o => /उपर्युक्त|इनमें से कोई नहीं|उपरोक्त/i.test(o));

      let newOptions = new Array(4);
      let newCorrectIdx;

      if (hasSpecial) {
        const specialIdx = q.options.findIndex(o => /उपर्युक्त|इनमें से कोई नहीं|उपरोक्त/i.test(o));
        const specialOpt = q.options[specialIdx];
        if (specialOpt === correctOpt) {
          newOptions[3] = specialOpt;
          newCorrectIdx = 3;
          const other = shuffleArray(q.options.filter(o => o !== specialOpt));
          newOptions[0] = other[0];
          newOptions[1] = other[1];
          newOptions[2] = other[2];
        } else {
          newOptions[3] = specialOpt;
          const nonSpecialDistractors = shuffleArray(q.options.filter(o => o !== specialOpt && o !== correctOpt));
          const target = targets[idx] % 3; // 0, 1, or 2
          newCorrectIdx = target;
          newOptions[target] = correctOpt;
          let d = 0;
          for (let i = 0; i < 3; i++) {
            if (i !== target) {
              newOptions[i] = nonSpecialDistractors[d++];
            }
          }
        }
      } else {
        const target = targets[idx];
        newCorrectIdx = target;
        newOptions[target] = correctOpt;
        const distractors = shuffleArray(q.options.filter(o => o !== correctOpt));
        let d = 0;
        for (let i = 0; i < 4; i++) {
          if (i !== target) {
            newOptions[i] = distractors[d++];
          }
        }
      }

      if (newOptions[newCorrectIdx] !== correctOpt) {
        throw new Error(`Integrity error in test ${t.title} Q${idx+1}: correct answer mismatch!`);
      }

      dist[newCorrectIdx]++;
      totalQuestionsFixed++;

      const updatedQ = {
        ...q,
        options: newOptions,
        correctIndex: newCorrectIdx,
        topic: topicName
      };

      // Queue question doc update in 'questions' collection
      if (q.id) {
        const qRef = db.collection('questions').doc(q.id);
        batch.set(qRef, {
          options: newOptions,
          correctIndex: newCorrectIdx,
          topic: topicName
        }, { merge: true });
        batchOps++;
      }

      return updatedQ;
    });

    // Update test doc in 'tests' collection
    await db.collection('tests').doc(doc.id).update({
      questions: updatedQuestions,
      topic: topicName,
      topicName: topicName
    });

    // Update in local admin_tests_meta cache
    const metaItem = meta.find(m => m.id === doc.id);
    if (metaItem) {
      metaItem.topic = topicName;
      metaItem.topicName = topicName;
    }

    await commitBatchIfNeeded();
  }

  // Commit remaining question updates
  if (batchOps > 0) {
    await batch.commit();
    console.log(`Committed final batch of ${batchOps} question updates.`);
  }

  // Save updated admin_tests_meta.json
  if (meta.length > 0) {
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
    console.log('Updated admin_tests_meta.json successfully.');
  }

  console.log(`\n🎉 Successfully fixed and randomized all tests!`);
  console.log(`Total questions updated: ${totalQuestionsFixed}`);
  console.log(`Final Balanced Distribution (A, B, C, D):`, dist);
}

fixMathCorrectIndexes()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error fixing tests:', err);
    process.exit(1);
  });
