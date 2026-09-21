const path = require('path');
const fs = require('fs');

const s = fs.readFileSync(path.join(__dirname, '../scratch/upload_cgv_master.js'), 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');
const math = obj.subjects.find(sub => sub.name.includes('गणित') || sub.name.includes('Math'));

const meta = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/data_cache/admin_tests_meta.json'), 'utf8'));

const allTopics = [];
math.chapters.forEach((ch, ci) => {
  ch.topics.forEach((t, ti) => {
    allTopics.push({
      topicId: t.id,
      nameHi: t.nameHi,
      name: t.name,
      chapter: ch.name,
      subtopics: t.subtopics || []
    });
  });
});

console.log(`Total Math Topics: ${allTopics.length}`);

let totalTestsNeeded = 0;
const statusList = [];

allTopics.forEach(t => {
  const existing = meta.filter(test => {
    const title = (test.title || '').trim();
    return title.includes(t.nameHi) || (test.topic && test.topic === t.nameHi);
  });

  const count = existing.length;
  const needed = Math.max(0, 3 - count);
  totalTestsNeeded += needed;
  statusList.push({
    topicId: t.topicId,
    nameHi: t.nameHi,
    existingCount: count,
    needed
  });
});

console.log(`Already uploaded: ${allTopics.length * 3 - totalTestsNeeded} tests`);
console.log(`Remaining tests to upload: ${totalTestsNeeded} tests`);
console.log("\nTopics needing tests:");
statusList.filter(s => s.needed > 0).forEach(s => {
  console.log(`- ${s.nameHi} (has ${s.existingCount}/3, needs ${s.needed})`);
});
