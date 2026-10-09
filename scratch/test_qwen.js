const path = require('path');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const Groq = require(path.join(__dirname, '../server/node_modules/groq-sdk'));
const { GoogleGenerativeAI } = require(path.join(__dirname, '../server/node_modules/@google/generative-ai'));

async function testGroqQwen() {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const start = Date.now();
  const res = await client.chat.completions.create({
    model: 'qwen/qwen3.8-27b',
    messages: [
      {
        role: 'system',
        content: 'You are an expert Math question creator for CG Vyapam. Output ONLY a valid JSON array of 10 objects.'
      },
      {
        role: 'user',
        content: 'Generate 10 high-quality Math MCQs in Hindi on Topic: अनुपात (Ratio). Keys: question, options (4 strings), correctIndex (0-3), explanation, difficulty.'
      }
    ],
    temperature: 0.3,
    max_tokens: 4096
  });
  console.log(`Qwen took ${Date.now() - start} ms`);
  let text = res.choices[0].message.content.trim();
  if (text.startsWith('```json')) text = text.replace(/^```json/, '');
  if (text.startsWith('```')) text = text.replace(/^```/, '');
  if (text.endsWith('```')) text = text.replace(/```$/, '');
  const arr = JSON.parse(text.trim());
  console.log('Qwen generated count:', arr.length);
  console.log('Q1:', arr[0].question);
}

testGroqQwen().catch(console.error);
