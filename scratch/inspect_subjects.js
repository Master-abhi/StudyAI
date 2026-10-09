const fs = require('fs');
const content = fs.readFileSync('scratch/upload_cgv_master.js', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"id": "cgv_master_sub_')) {
    console.log(lines[i].trim(), lines[i+1].trim());
  }
}
