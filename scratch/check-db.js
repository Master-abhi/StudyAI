const { db } = require('../server/firebase-admin');

async function run() {
  try {
    const snapshot = await db.collection('tests').orderBy('createdAt', 'desc').limit(5).get();
    console.log("--- LATEST TESTS DETAIL ---");
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`ID: ${data.id}`);
      console.log(`examId: ${data.examId}`);
      console.log(`examIds:`, data.examIds);
      console.log(`mode: ${data.mode}`);
      console.log(`language: ${data.language}`);
      console.log(`subject: ${data.subject}`);
      console.log("-------------------");
    });
  } catch (err) {
    console.error("Error reading database:", err);
  }
  process.exit(0);
}

run();
