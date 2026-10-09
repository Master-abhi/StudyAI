const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { GoogleGenerativeAI } = require(path.join(__dirname, '../server/node_modules/@google/generative-ai'));

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.6-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.3
    }
  });

  const prompt = `Generate exactly 10 high-quality Math MCQs in Hindi for CG Vyapam.
Topic: अनुपात (Ratio) - Test 01.
Requirements:
- 4 clear options
- correctIndex (0-3)
- Detailed Hindi explanation
- Enclose all math in $...$ e.g. $2:3$ or $\\frac{2}{3}$
- Return JSON array:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "...",
    "difficulty": "moderate"
  }
]`;

  const start = Date.now();
  const res = await model.generateContent(prompt);
  console.log(`Generation took ${Date.now() - start} ms`);
  const text = res.response.text();
  const arr = JSON.parse(text);
  console.log(`Parsed count: ${arr.length}`);
  console.log('Q1:', arr[0].question);
  console.log('Q1 options:', arr[0].options);
  console.log('Q1 correctIndex:', arr[0].correctIndex);
  console.log('Q1 explanation:', arr[0].explanation);
}

test().catch(console.error);
