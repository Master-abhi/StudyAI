const fs = require('fs');
const path = require('path');

// 1. Update scratch/test_payload.json
const payloadPath = path.join(__dirname, 'test_payload.json');
if (fs.existsSync(payloadPath)) {
  const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  const metadataMap = {
    4: { difficulty: "moderate", topic: "Waterfalls of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2019-2024", expectedIn2026: true },
    5: { difficulty: "easy", topic: "Rivers and Water Resources of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2020-2024", expectedIn2026: true },
    6: { difficulty: "moderate", topic: "Art and Culture of Chhattisgarh", sourcePattern: "CGPSC PYQ Inspired", yearTrend: "2019-2023", expectedIn2026: false },
    7: { difficulty: "easy", topic: "Administrative Structure and Judiciary of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2018-2024", expectedIn2026: true },
    8: { difficulty: "moderate", topic: "Minerals and Industries of Chhattisgarh", sourcePattern: "CGPSC PYQ Inspired", yearTrend: "2021-2025", expectedIn2026: true },
    9: { difficulty: "moderate", topic: "History and Archeology of Chhattisgarh", sourcePattern: "CGPSC PYQ Inspired", yearTrend: "2018-2024", expectedIn2026: false },
    10: { difficulty: "moderate", topic: "Art and Culture of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2020-2025", expectedIn2026: true },
    11: { difficulty: "easy", topic: "Minerals and Industries of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2019-2023", expectedIn2026: false },
    12: { difficulty: "moderate", topic: "Tribes and Festivals of Chhattisgarh", sourcePattern: "CGPSC PYQ Inspired", yearTrend: "2022-2025", expectedIn2026: true },
    13: { difficulty: "easy", topic: "Polity and Government of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2020-2024", expectedIn2026: false },
    14: { difficulty: "moderate", topic: "Forests and Wildlife of Chhattisgarh", sourcePattern: "CGPSC PYQ Inspired", yearTrend: "2019-2024", expectedIn2026: true },
    15: { difficulty: "easy", topic: "Polity and Government of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2017-2023", expectedIn2026: false },
    16: { difficulty: "moderate", topic: "History and Archeology of Chhattisgarh", sourcePattern: "CGPSC PYQ Inspired", yearTrend: "2020-2025", expectedIn2026: true },
    17: { difficulty: "easy", topic: "State Symbols of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2015-2022", expectedIn2026: false },
    18: { difficulty: "easy", topic: "Art and Culture of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2019-2024", expectedIn2026: true },
    19: { difficulty: "easy", topic: "Agriculture and Economy of Chhattisgarh", sourcePattern: "CG Vyapam PYQ Inspired", yearTrend: "2018-2023", expectedIn2026: false },
    20: { difficulty: "moderate", topic: "Forests and Wildlife of Chhattisgarh", sourcePattern: "CGPSC PYQ Inspired", yearTrend: "2021-2025", expectedIn2026: true }
  };

  payload.questions = payload.questions.map((q, idx) => {
    const meta = metadataMap[idx + 1];
    if (meta) {
      return { ...q, ...meta };
    }
    return q;
  });

  fs.writeFileSync(payloadPath, JSON.stringify(payload, null, 2), 'utf8');
  console.log('Successfully updated scratch/test_payload.json!');
} else {
  console.log('scratch/test_payload.json not found.');
}

// 2. Update AdminTests.tsx raw JSON template strings using regex
const adminTestsPath = path.join(__dirname, '../mcq-practice/src/components/admin/AdminTests.tsx');
if (fs.existsSync(adminTestsPath)) {
  let content = fs.readFileSync(adminTestsPath, 'utf8');

  // Match: explanation: "वर्णमाला के अनुसार सही क्रम होगा: आशुतोष (K) -> इन्दुशेखर (O) -> चंद्रचूड़ (N) -> पशुपति (M) -> शूलपाणि (L)।",
  // and subject: "Hindi Grammar"
  const q4Regex = /(explanation:\s*"वर्णमाला के अनुसार सही क्रम होगा: आशुतोष \(K\) -> इन्दुशेखर \(O\) -> चंद्रचूड़ \(N\) -> पशुपति \(M\) -> शूलपाणि \(L\)।"[,]*\s*subject:\s*"Hindi Grammar")/g;
  const q4Replacement = `explanation: "वर्णमाला के अनुसार सही क्रम होगा: आशुतोष (K) -> इन्दुशेखर (O) -> चंद्रचूड़ (N) -> पशुपति (M) -> शूलपाणि (L)।",
                           subject: "Hindi Grammar",
                           difficulty: "moderate",
                           topic: "Hindi Alphabet and Vocabulary",
                           sourcePattern: "CG Vyapam PYQ Inspired",
                           yearTrend: "2018-2022",
                           expectedIn2026: false`;

  // Match: explanation: "दोहा अर्धसम मात्रिक छंद है। इसके प्रथम और तृतीय चरण में 13-13 मात्राएँ (K) तथा द्वितीय और चतुर्थ चरण में 11-11 मात्राएँ (M) होती हैं।",
  // and subject: "Hindi Grammar"
  const q5Regex = /(explanation:\s*"दोहा अर्धसम मात्रिक छंद है। इसके प्रथम और तृतीय चरण में 13-13 मात्राएँ \(K\) तथा द्वितीय और चतुर्थ चरण में 11-11 मात्राएँ \(M\) होती हैं।"[,]*\s*subject:\s*"Hindi Grammar")/g;
  const q5Replacement = `explanation: "दोहा अर्धसम मात्रिक छंद है। इसके प्रथम और तृतीय चरण में 13-13 मात्राएँ (K) तथा द्वितीय और चतुर्थ चरण में 11-11 मात्राएँ (M) होती हैं।",
                           subject: "Hindi Grammar",
                           difficulty: "hard",
                           topic: "Hindi Poetic Metres (Chhand)",
                           sourcePattern: "CGPSC PYQ Inspired",
                           yearTrend: "2020-2025",
                           expectedIn2026: true`;

  let updated = false;
  if (q4Regex.test(content)) {
    content = content.replace(q4Regex, q4Replacement);
    updated = true;
  }
  if (q5Regex.test(content)) {
    content = content.replace(q5Regex, q5Replacement);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(adminTestsPath, content, 'utf8');
    console.log('Successfully updated AdminTests.tsx!');
  } else {
    console.log('Target template patterns not found in AdminTests.tsx using regex.');
  }
} else {
  console.log('AdminTests.tsx not found.');
}
