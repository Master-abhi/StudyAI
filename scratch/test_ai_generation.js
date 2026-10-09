const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const Groq = require(path.join(__dirname, '../server/node_modules/groq-sdk'));
const { GoogleGenerativeAI } = require(path.join(__dirname, '../server/node_modules/@google/generative-ai'));

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testAI() {
  try {
    const list = await groqClient.models.list();
    console.log('Available Groq models:', list.data.map(m => m.id).slice(0, 8));
  } catch (err) {
    console.error('Groq list failed:', err.message);
  }

  const geminiModels = ['gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-2.5-flash-lite', 'gemini-1.5-flash'];
  for (const m of geminiModels) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const res = await model.generateContent('Say {"status":"ok"} in JSON');
      console.log(`Gemini ${m} success:`, res.response.text().trim());
      break;
    } catch (err) {
      console.log(`Gemini ${m} failed:`, err.message);
    }
  }
}

testAI();
