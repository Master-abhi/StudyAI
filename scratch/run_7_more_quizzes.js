const path = require('path');
const fs = require('fs');

const { QUIZ_SUBJECTS, uploadSingleMixedQuiz } = require('./upload_mixed_quizzes.js');
const cacheDir = path.join(__dirname, '../server/data_cache');

async function runSevenMoreQuizzes() {
  console.log('=== STARTING BATCH: 7 MORE MIXED QUIZZES FOR ALL SUBJECTS (QUIZ 04 TO 10) ===');
  let totalUploaded = 0;
  let totalSkipped = 0;

  for (const sub of QUIZ_SUBJECTS) {
    console.log(`\n======================================================`);
    console.log(`📚 Subject: ${sub.titlePrefix} (${sub.subject})`);
    console.log(`======================================================`);

    for (let testNum = 4; testNum <= 10; testNum++) {
      const padNum = testNum < 10 ? `0${testNum}` : `${testNum}`;
      const expectedTitle = `${sub.titlePrefix} ${padNum}`.trim().toLowerCase();

      // Check current base tests cache
      const baseCachePath = path.join(cacheDir, 'tests_base_all_v2.json');
      let existingTests = [];
      if (fs.existsSync(baseCachePath)) {
        try {
          existingTests = JSON.parse(fs.readFileSync(baseCachePath, 'utf8'));
        } catch (_) {}
      }

      const alreadyExists = existingTests.some(t => {
        const tTitle = (t.title || '').trim().toLowerCase();
        return tTitle === expectedTitle && t.mode === 'quiz';
      });

      if (alreadyExists) {
        console.log(`⏩ [Skipping]: "${sub.titlePrefix} ${padNum}" already exists.`);
        totalSkipped++;
        continue;
      }

      try {
        await uploadSingleMixedQuiz(sub, testNum);
        totalUploaded++;
        console.log(`📊 Total Progress: ${totalUploaded} uploaded, ${totalSkipped} skipped`);
        await new Promise(r => setTimeout(r, 2000));
      } catch (err) {
        console.error(`❌ Failed to upload "${sub.titlePrefix} ${padNum}":`, err.message);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }

  console.log(`\n🎉🎉 ALL 7 MORE QUIZZES COMPLETED! Total Uploaded: ${totalUploaded}, Total Skipped: ${totalSkipped}`);
  process.exit(0);
}

runSevenMoreQuizzes().catch(err => {
  console.error('Fatal error in 7 more quizzes runner:', err);
  process.exit(1);
});
