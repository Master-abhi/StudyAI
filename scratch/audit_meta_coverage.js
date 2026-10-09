const fs = require('fs');
const path = require('path');

const s = fs.readFileSync(path.join(__dirname, 'upload_cgv_master.js'), 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');
const meta = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/data_cache/admin_tests_meta.json'), 'utf8'));

console.log(`Loaded ${obj.subjects.length} subjects from cgv_master.`);

for (const sub of obj.subjects) {
  let totalTopics = 0;
  let fullTopics = 0;
  let partialTopics = 0;
  let zeroTopics = 0;
  const missingList = [];

  for (const ch of sub.chapters) {
    for (const t of ch.topics) {
      totalTopics++;
      const matched = meta.filter(test => {
        const title = (test.title || '').trim().toLowerCase();
        const topName = (t.nameHi || '').trim().toLowerCase();
        const topEn = (t.name || '').trim().toLowerCase();
        return (topName && title.includes(topName)) || (topEn && title.includes(topEn)) || (test.topic && (test.topic === t.nameHi || test.topic === t.name));
      });

      const count = matched.length;
      if (count >= 3) {
        fullTopics++;
      } else if (count > 0) {
        partialTopics++;
        missingList.push({ name: t.nameHi, count, needed: 3 - count });
      } else {
        zeroTopics++;
        missingList.push({ name: t.nameHi, count: 0, needed: 3 });
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`[${sub.name}] (id: ${sub.id})`);
  console.log(`Topics: ${totalTopics} | Full (3+ tests): ${fullTopics} | Partial: ${partialTopics} | Zero: ${zeroTopics}`);
  if (missingList.length === 0) {
    console.log(`🎉 100% COMPLETE (${totalTopics * 3} tests present)`);
  } else {
    console.log(`Needs tests for ${missingList.length} topics. Examples:`);
    missingList.slice(0, 5).forEach(m => console.log(`  - ${m.name}: currently has ${m.count}/3, needs ${m.needed}`));
  }
}
