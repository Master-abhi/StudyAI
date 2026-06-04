const { db } = require('../server/firebase-admin');
const payload = require('./test_payload.json');

async function testWrite() {
  try {
    console.log('Starting local Firestore write simulation...');
    const { examId, examName, subject, mode, language, pattern, questions } = payload;

    const testId = `test_temp_${Date.now()}`;
    const timestamp = new Date().toISOString();

    const enrichedQuestions = questions.map((q, index) => {
      return {
        id: q.id || `q_${testId}_${index}`,
        question: q.question,
        options: q.options,
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || '',
        subject: q.subject || subject || 'General Knowledge',
        difficulty: q.difficulty || 'medium',
        weightage: q.weightage || 'medium',
        timestamp
      };
    });

    const testMode = mode || 'quiz';
    const testPattern = pattern || {
      totalQuestions: enrichedQuestions.length,
      totalMarks: enrichedQuestions.length * (testMode === 'mock' ? 2 : 1),
      durationMinutes: testMode === 'mock' ? 120 : 10,
      markingScheme: testMode === 'mock' ? '+2 for correct, -0.66 for incorrect' : '+1 for correct, 0 for incorrect'
    };

    const newTest = {
      id: testId,
      examId,
      examName,
      subject: subject || 'General',
      mode: testMode,
      language: language || 'hindi',
      questions: enrichedQuestions,
      pattern: testPattern,
      createdAt: timestamp
    };

    // Try set document
    console.log('Writing test document to tests collection...');
    await db.collection('tests').doc(testId).set(newTest);
    console.log('Test document written successfully!');

    // Try batch write
    console.log('Executing batch write for individual questions...');
    const batch = db.batch();
    enrichedQuestions.forEach((q) => {
      const qRef = db.collection('questions').doc(q.id);
      batch.set(qRef, {
        id: q.id,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        subject: q.subject,
        difficulty: q.difficulty || 'medium',
        timestamp: q.timestamp,
        examId,
        examName,
        testId,
        mode: testMode,
        language: language || 'hindi'
      });
    });
    await batch.commit();
    console.log('Batch write completed successfully!');

    // Clean up test documents
    console.log('Cleaning up simulated test documents...');
    await db.collection('tests').doc(testId).delete();
    const cleanupBatch = db.batch();
    enrichedQuestions.forEach((q) => {
      cleanupBatch.delete(db.collection('questions').doc(q.id));
    });
    await cleanupBatch.commit();
    console.log('Cleanup completed successfully!');
    console.log('ALL SIMULATION WRITES PASSED without any error! 🎉');
  } catch (e) {
    console.error('ERROR during firestore writes:', e);
  }
}

testWrite();
