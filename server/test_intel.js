require('dotenv').config();
const geminiService = require('./services/gemini.js');

async function runTest() {
  console.log("Starting News Intelligence Test using gemini-3.1-flash-lite...");
  const testTitle = "Chhattisgarh launches new Krishi Unnati Scheme to support farmers";
  const testDesc = "The government of Chhattisgarh has announced the launch of the Krishi Unnati Scheme, aimed at boosting crop yields, providing financial assistance, and improving the overall welfare of farmers across the state. Under this scheme, farmers will receive input subsidies and technical training.";
  const testCategory = "Chhattisgarh Current Affairs";
  const testSource = "DPR CG";

  try {
    const result = await geminiService.generateNewsIntelligence(testTitle, testDesc, testCategory, testSource, 'gemini-3.1-flash-lite');
    console.log("Success with gemini-3.1-flash-lite!");
    let jsonText = result.trim();
    const match = jsonText.match(/\{[\s\S]*\}/);
    if (match) {
      jsonText = match[0].trim();
    }
    const parsed = JSON.parse(jsonText);
    console.log("Valid JSON parsed!");
    console.log("Title (Hi):", parsed.title_hi);
  } catch (e) {
    console.error("gemini-3.1-flash-lite failed:", e.message);
  }
}

runTest();
