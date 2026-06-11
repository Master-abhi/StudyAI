const { db } = require('../server/firebase-admin');

async function run() {
  try {
    const snapshot = await db.collection('tests').orderBy('createdAt', 'desc').limit(15).get();
    console.log("--- ALL TESTS IN DB ---");
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`ID: ${data.id}`);
      console.log(`Mode: ${data.mode}`);
      console.log(`Subject: ${data.subject}`);
      console.log(`Pattern:`, data.pattern);
      console.log(`Questions Count:`, data.questions ? data.questions.length : 0);
      console.log("-------------------");
    });
  } catch (err) {
    console.error("Error reading database:", err);
  }
  process.exit(0);
}

run();
