const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, 'test_payload.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(fileContent);
  console.log('SUCCESS: JSON parsed successfully! Total questions:', parsed.questions.length);
} catch (e) {
  console.error('ERROR during parsing:', e.message);
}
