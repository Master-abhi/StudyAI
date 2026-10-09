const fs = require('fs');
const path = require('path');

const s = fs.readFileSync(path.join(__dirname, 'upload_cgv_master.js'), 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');
const science = obj.subjects.find(sub => sub.name.includes('विज्ञान') || sub.name.includes('Science'));

const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');
let meta = [];
if (fs.existsSync(metaFilePath)) {
  meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
}

console.log(`=== General Science: ${science.name} (${science.chapters.length} Chapters) ===`);
let neededTotal = 0;
const statusList = [];

science.chapters.forEach(ch => {
  ch.topics.forEach(t => {
    const matched = meta.filter(item => {
      const title = (item.title || '').trim().toLowerCase();
      const nameHi = (t.nameHi || '').trim().toLowerCase();
      return (nameHi && title.includes(nameHi)) || (item.topic && item.topic === t.nameHi);
    });
    const count = matched.length;
    const needed = Math.max(0, 3 - count);
    neededTotal += needed;
    statusList.push({ topic: t, chapter: ch.name, count, needed });
    console.log(`- ${t.nameHi} (${t.id}): ${count}/3 tests`);
  });
});

console.log(`\nTotal tests needed for General Science: ${neededTotal}`);
console.log(`Total topics needing tests: ${statusList.filter(s => s.needed > 0).length}`);
