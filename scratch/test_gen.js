const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const Groq = require(path.join(__dirname, '../server/node_modules/groq-sdk'));
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function run() {
  const start = Date.now();
  const prompt = `Generate exactly 10 high-quality Math MCQs in Hindi for CG Vyapam examinations (Patwari, RI, Hostel Warden, ADEO).
Topic: करणी एवं घातांक (Surds and Indices) - Test 01.

Requirements:
- Each question must be realistic and strictly match CG Vyapam difficulty and syllabus.
- Exactly 4 clear options (A, B, C, D) per question.
- correctIndex must be an integer (0, 1, 2, or 3).
- Detailed, step-by-step Hindi explanation for each solution.
- difficulty should be "easy", "moderate", or "hard".
- Return ONLY a valid JSON array of 10 objects, no markdown backticks, no introduction, no conversational text.

JSON Schema:
[
  {
    "question": "प्रश्न...",
    "options": ["विकल्प 1", "विकल्प 2", "विकल्प 3", "विकल्प 4"],
    "correctIndex": 0,
    "explanation": "विस्तृत हल...",
    "difficulty": "easy"
  }
]`;

  const response = await client.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3
  });

  const duration = Date.now() - start;
  console.log(`Generation took ${duration} ms`);
  let text = response.choices[0].message.content.trim();
  if (text.startsWith('```json')) text = text.replace(/^```json/, '');
  if (text.startsWith('```')) text = text.replace(/^```/, '');
  if (text.endsWith('```')) text = text.replace(/```$/, '');
  text = text.trim();

  const questions = JSON.parse(text);
  console.log(`Generated ${questions.length} questions.`);
  console.log('Q1:', questions[0].question);
  console.log('Q1 options:', questions[0].options);
  console.log('Q1 correctIndex:', questions[0].correctIndex);
  console.log('Q1 explanation:', questions[0].explanation);
}

run().catch(console.error);
