const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { GoogleGenerativeAI } = require(path.join(__dirname, '../server/node_modules/@google/generative-ai'));

async function testGeminiLite() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });
  const res = await model.generateContent('Say hello in 3 words');
  console.log('Gemini 3.5 Flash Lite OK:', res.response.text());
}

testGeminiLite().catch(e => console.error('Gemini error:', e.message));
