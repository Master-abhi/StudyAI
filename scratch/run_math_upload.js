const path = require('path');
const fs = require('fs');
const { uploadSingleTest } = require('./upload_math_batches.js');

const s = fs.readFileSync(path.join(__dirname, '../scratch/upload_cgv_master.js'), 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');
const math = obj.subjects.find(sub => sub.name.includes('गणित') || sub.name.includes('Math'));

const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');

async function runBatch(startChapterIndex = 0, endChapterIndex = null) {
  const meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));

  const existingTitles = new Set(meta.map(t => (t.title || '').trim()));
  // Also normalize title check
  const hasTest = (title) => {
    if (existingTitles.has(title)) return true;
    for (const t of existingTitles) {
      if (t.includes(title)) return true;
    }
    return false;
  };

  const chaptersToProcess = math.chapters.slice(startChapterIndex, endChapterIndex !== null ? endChapterIndex : math.chapters.length);

  console.log(`\n🚀 Starting upload for ${chaptersToProcess.length} chapters...`);

  let totalUploaded = 0;

  for (let ci = 0; ci < chaptersToProcess.length; ci++) {
    const ch = chaptersToProcess[ci];
    console.log(`\n========================================`);
    console.log(`📖 Chapter [${startChapterIndex + ci + 1}/${math.chapters.length}]: ${ch.name}`);
    console.log(`========================================`);

    for (const topic of ch.topics) {
      for (let testNum = 1; testNum <= 3; testNum++) {
        const expectedTitle = `${topic.nameHi} - Test 0${testNum}`;
        // Also check if alternate spelling exists (e.g. मूल अवधारणाऍं)
        const isDone = hasTest(expectedTitle) || 
                       (topic.nameHi.includes('मूल अवधारणाएँ') && hasTest(`संख्या पद्धति की मूल अवधारणाऍं - Test 0${testNum}`)) ||
                       (topic.nameHi === 'विभाज्यता के नियम' && hasTest(`विभाज्यता के मूल नियम - Test 0${testNum}`)) ||
                       (topic.nameHi === 'विभाज्यता के नियम' && hasTest(`विभाज्यता के मूल नियम- Test 0${testNum}`));

        if (isDone) {
          console.log(`⏩ Skipping "${expectedTitle}" (Already exists)`);
          continue;
        }

        try {
          await uploadSingleTest(topic, ch.name, testNum);
          existingTitles.add(expectedTitle);
          totalUploaded++;
          // Delay to respect rate limits
          await new Promise(r => setTimeout(r, 2000));
        } catch (err) {
          console.error(`❌ Error uploading "${expectedTitle}":`, err.message);
          // Small pause and continue
          await new Promise(r => setTimeout(r, 4000));
        }
      }
    }
  }

  console.log(`\n🎉 Batch completed! Successfully uploaded ${totalUploaded} new tests.`);
}

const args = process.argv.slice(2);
const startCh = args[0] !== undefined ? parseInt(args[0], 10) : 0;
const endCh = args[1] !== undefined ? parseInt(args[1], 10) : null;

runBatch(startCh, endCh).then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
