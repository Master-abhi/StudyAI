const { db } = require('../server/firebase-admin');

async function testQueries() {
  const userId = 'qSO62CCE8Ff3YcdYtquWwAbrnOB2'; // test user UID from the database
  const selectedExamId = 'cgv_patwari';

  try {
    console.log(`Querying topic_mastery for user ${userId} and exam ${selectedExamId}...`);
    const masterySnap = await db.collection('topic_mastery')
      .where('userId', '==', userId)
      .where('examId', '==', selectedExamId)
      .get();
    console.log(`Success! Found ${masterySnap.size} topic mastery records.`);
  } catch (err) {
    console.error('topic_mastery query failed:', err.message || err);
  }

  try {
    console.log(`Querying spaced_repetition for user ${userId}...`);
    const revSnap = await db.collection('spaced_repetition')
      .where('userId', '==', userId)
      .get();
    console.log(`Success! Found ${revSnap.size} spaced_repetition records.`);
  } catch (err) {
    console.error('spaced_repetition query failed:', err.message || err);
  }

  try {
    console.log(`Querying activity_logs for user ${userId} and exam ${selectedExamId}...`);
    const logsSnap = await db.collection('activity_logs')
      .where('userId', '==', userId)
      .where('examId', '==', selectedExamId)
      .get();
    console.log(`Success! Found ${logsSnap.size} activity_logs records.`);
  } catch (err) {
    console.error('activity_logs query failed:', err.message || err);
  }
}

testQueries();
