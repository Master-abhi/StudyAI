const fs = require('fs');
const path = require('path');

const s = fs.readFileSync(path.join(__dirname, 'upload_cgv_master.js'), 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');
const english = obj.subjects.find(sub => sub.name.includes('English'));

const metaFilePath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');
let meta = [];
if (fs.existsSync(metaFilePath)) {
  meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
}

console.log(`=== English Language: ${english.name} (${english.chapters.length} Chapters) ===`);
let neededTotal = 0;
const statusList = [];

english.chapters.forEach(ch => {
  ch.topics.forEach(t => {
    const matched = meta.filter(item => {
      const title = (item.title || '').trim().toLowerCase();
      const nameHi = (t.nameHi || '').trim().toLowerCase();
      const nameEn = (t.name || '').trim().toLowerCase();
      return (nameHi && title.includes(nameHi)) || (nameEn && title.includes(nameEn)) || (item.topic && (item.topic === t.nameHi || item.topic === t.name));
    });
    const count = matched.length;
    const needed = Math.max(0, 3 - count);
    neededTotal += needed;
    statusList.push({ topic: t, chapter: ch.name, count, needed });
    console.log(`- ${t.nameHi} / ${t.name} (${t.id}): ${count}/3 tests`);
  });
});

console.log(`\nTotal tests needed for English Language: ${neededTotal}`);
console.log(`Total topics needing tests: ${statusList.filter(s => s.needed > 0).length}`);
