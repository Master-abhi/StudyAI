const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

async function analyze() {
  const doc = await db.collection('syllabi').doc('cgv_master').get();
  if (!doc.exists) {
    console.error("syllabi/cgv_master doc does not exist!");
    return;
  }
  const cgv_master = doc.data();
  console.log(`Loaded cgv_master: "${cgv_master.name}" (${cgv_master.subjects.length} subjects)`);

  const testsSnap = await db.collection('tests').get();
  console.log(`Total tests in database: ${testsSnap.size}`);

  const testCountByTopicId = {};
  const testCountByTopicName = {};
  const testsByTopicMap = {};

  testsSnap.forEach(tDoc => {
    const data = tDoc.data();
    if (data.topicId) {
      testCountByTopicId[data.topicId] = (testCountByTopicId[data.topicId] || 0) + 1;
      testsByTopicMap[data.topicId] = testsByTopicMap[data.topicId] || [];
      testsByTopicMap[data.topicId].push(data.title);
    }
    if (data.topicName) {
      testCountByTopicName[data.topicName] = (testCountByTopicName[data.topicName] || 0) + 1;
      testsByTopicMap[data.topicName] = testsByTopicMap[data.topicName] || [];
      testsByTopicMap[data.topicName].push(data.title);
    }
  });

  console.log('\n================ SYLLABUS SUBJECT STATUS ================');
  for (const sub of cgv_master.subjects) {
    let totalTopics = 0;
    let completedTopics = 0;
    let partialTopics = 0;
    let zeroTopics = 0;
    const missingTopics = [];

    for (const ch of sub.chapters) {
      for (const top of ch.topics) {
        totalTopics++;
        const count = Math.max(
          testCountByTopicId[top.id] || 0,
          testCountByTopicName[top.nameHi] || 0,
          testCountByTopicName[top.name] || 0
        );

        if (count >= 3) {
          completedTopics++;
        } else if (count > 0) {
          partialTopics++;
          missingTopics.push({ id: top.id, name: top.nameHi, count, needed: 3 - count });
        } else {
          zeroTopics++;
          missingTopics.push({ id: top.id, name: top.nameHi, count: 0, needed: 3 });
        }
      }
    }

    console.log(`[${sub.name}] (Subject ID: ${sub.id})`);
    console.log(`  Total Topics: ${totalTopics} | Complete (3+ tests): ${completedTopics} | Partial: ${partialTopics} | Zero: ${zeroTopics}`);
    if (missingTopics.length > 0) {
      console.log(`  Missing topics: ${missingTopics.length}`);
      console.log(`  First 3 missing: ${missingTopics.slice(0, 3).map(m => `${m.name} (${m.count}/3)`).join(', ')}`);
    } else {
      console.log(`  🎉 100% COMPLETE!`);
    }
    console.log('----------------------------------------------------------');
  }
}

analyze().catch(console.error);
