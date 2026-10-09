const path = require('path');
const fs = require('fs');

require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { uploadReasoningTest } = require('./upload_reasoning_tests.js');

const s = fs.readFileSync(path.join(__dirname, 'upload_cgv_master.js'), 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');
const reasoning = obj.subjects.find(sub => sub.name.includes('तर्कशक्ति') || sub.name.includes('Reasoning'));
const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');

async function run() {
  console.log('=== STARTING REASONING TESTS BATCH GENERATION & UPLOAD ===');
  
  let totalUploaded = 0;
  let totalSkipped = 0;

  for (const ch of reasoning.chapters) {
    for (const topic of ch.topics) {
      // Reload fresh meta before checking each topic
      let meta = [];
      if (fs.existsSync(metaFilePath)) {
        meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
      }

      for (let testNum = 1; testNum <= 3; testNum++) {
        const titleExpected = `${topic.nameHi} - Test 0${testNum}`;
        const alreadyExists = meta.some(t => {
          const tTitle = (t.title || '').trim().toLowerCase();
          return tTitle === titleExpected.toLowerCase();
        });

        if (alreadyExists) {
          console.log(`⏩ [Skipping]: "${titleExpected}" already exists.`);
          totalSkipped++;
          continue;
        }

        try {
          await uploadReasoningTest(topic, ch.name, testNum);
          totalUploaded++;
          console.log(`📊 Progress: Uploaded: ${totalUploaded}, Skipped: ${totalSkipped}`);
          // Brief pause between requests to prevent rate limits
          await new Promise(r => setTimeout(r, 2000));
        } catch (err) {
          console.error(`❌ Failed to upload "${titleExpected}":`, err.message);
          // Wait 5 seconds on error before continuing
          await new Promise(r => setTimeout(r, 5000));
        }
      }
    }
  }

  console.log(`\n🎉 BATCH COMPLETED! Total Uploaded: ${totalUploaded}, Total Skipped: ${totalSkipped}`);
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal batch runner error:', err);
  process.exit(1);
});
