const fs = require('fs');
const path = require('path');
const s = fs.readFileSync(path.join(__dirname, 'upload_cgv_master.js'), 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');
const reasoning = obj.subjects.find(s => s.name.includes('तर्कशक्ति') || s.name.includes('Reasoning'));
const meta = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/data_cache/admin_tests_meta.json'), 'utf8'));

let neededTotal = 0;
const toGenerate = [];
reasoning.chapters.forEach(ch => {
  ch.topics.forEach(t => {
    const matched = meta.filter(m => (m.title || '').includes(t.nameHi) || (m.topic && m.topic === t.nameHi));
    const count = matched.length;
    const needed = Math.max(0, 3 - count);
    neededTotal += needed;
    console.log(`${t.nameHi} (${t.id}): ${count}/3 tests`);
    if (needed > 0) {
      toGenerate.push({ topic: t, chapter: ch.name, existingCount: count, needed });
    }
  });
});

console.log(`\nTotal tests needed for Reasoning: ${neededTotal}`);
console.log(`Total topics needing tests: ${toGenerate.length}`);
