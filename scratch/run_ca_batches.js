const path = require('path');
const fs = require('fs');

require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { uploadCaTest } = require('./upload_ca_tests.js');

const s = fs.readFileSync(path.join(__dirname, 'upload_cgv_master.js'), 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');
const ca = obj.subjects.find(sub => sub.name.toLowerCase().includes('current'));
const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');

async function run() {
  console.log('=== STARTING CURRENT AFFAIRS TESTS BATCH GENERATION & UPLOAD ===');
  
  let totalUploaded = 0;
  let totalSkipped = 0;

  for (const ch of ca.chapters) {
    for (const topic of ch.topics) {
      let meta = [];
      if (fs.existsSync(metaFilePath)) {
        meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
      }

      for (let testNum = 1; testNum <= 3; testNum++) {
        const titleExpected = `${topic.nameHi} - Test 0${testNum}`;
        const alreadyExists = meta.some(t => {
          const tSubject = (t.subject || '').toLowerCase();
          const tTopicId = t.topicId || '';
          const tTitle = (t.title || '').trim().toLowerCase();
          const isCaSubject = tSubject.includes('current') || tSubject.includes('समसामयिकी');
          return (tTopicId === topic.id || (isCaSubject && tTitle === titleExpected.toLowerCase())) && tTitle.includes(`test 0${testNum}`.toLowerCase());
        });

        if (alreadyExists) {
          console.log(`⏩ [Skipping]: "${titleExpected}" already exists.`);
          totalSkipped++;
          continue;
        }

        try {
          await uploadCaTest(topic, ch.name, testNum);
          totalUploaded++;
          console.log(`📊 Progress [Current Affairs]: Uploaded: ${totalUploaded}, Skipped: ${totalSkipped}`);
          await new Promise(r => setTimeout(r, 2000));
        } catch (err) {
          console.error(`❌ Failed to upload "${titleExpected}":`, err.message);
          await new Promise(r => setTimeout(r, 5000));
        }
      }
    }
  }

  console.log(`\n🎉 CURRENT AFFAIRS BATCH COMPLETED! Total Uploaded: ${totalUploaded}, Total Skipped: ${totalSkipped}`);
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal Current Affairs batch runner error:', err);
  process.exit(1);
});
