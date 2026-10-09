const fs = require('fs');
const s = fs.readFileSync('scratch/upload_cgv_master.js', 'utf8');
const m = s.match(/const cgv_master = ({[\s\S]*?});\s*async function/);
const obj = eval('(' + m[1] + ')');

const subjectArg = process.argv[2] || 'Reasoning';
const subject = obj.subjects.find(s => s.name.includes(subjectArg) || s.id.includes(subjectArg));
if (!subject) {
  console.log('Subject not found:', subjectArg);
  process.exit(1);
}

console.log(`=== ${subject.name} (${subject.chapters.length} Chapters) ===`);
let total = 0;
subject.chapters.forEach(ch => {
  console.log(`\nChapter: ${ch.name}`);
  ch.topics.forEach(t => {
    total++;
    console.log(`  - [${t.id}] ${t.nameHi} (${t.name}) | subtopics: ${(t.subtopics || []).join(', ')}`);
  });
});
console.log(`\nTotal topics: ${total}`);
