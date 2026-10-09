const fs = require('fs');
const path = require('path');

const s = fs.readFileSync(path.join(__dirname, 'upload_cgv_master.js'), 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');
const indiaGK = obj.subjects.find(sub => sub.name.includes('भारत') || sub.name.includes('India'));

const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');
let meta = [];
if (fs.existsSync(metaFilePath)) {
  meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
}

console.log(`=== India GK: ${indiaGK.name} (${indiaGK.chapters.length} Chapters) ===`);
let neededTotal = 0;
const statusList = [];

indiaGK.chapters.forEach(ch => {
  ch.topics.forEach(t => {
    const matched = meta.filter(m => {
      const title = (m.title || '').trim().toLowerCase();
      const nameHi = (t.nameHi || '').trim().toLowerCase();
      return (nameHi && title.includes(nameHi)) || (m.topic && m.topic === t.nameHi);
    });
    const count = matched.length;
    const needed = Math.max(0, 3 - count);
    neededTotal += needed;
    statusList.push({ topic: t, chapter: ch.name, count, needed });
    console.log(`- ${t.nameHi} (${t.id}): ${count}/3 tests`);
  });
});

console.log(`\nTotal tests needed for India GK: ${neededTotal}`);
console.log(`Total topics needing tests: ${statusList.filter(s => s.needed > 0).length}`);
