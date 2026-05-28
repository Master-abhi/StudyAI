const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: 'e:/Drive D/abhi\'s coding/New start/server/.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

function getLanguageInstruction(language) {
  const instructions = {
    'hindi': 'Respond entirely in Hindi (Devanagari script). Use Hindi for all explanations, options, and content. CRITICAL SCRIPT GUIDELINE: Always use pure Devanagari Unicode characters for Hindi text. NEVER mix similar-looking Cyrillic characters or Roman letters inside Devanagari words. Double-check that your output contains absolutely zero Cyrillic characters.',
    'english': 'Respond entirely in English.',
    'mixed': 'Respond in Hinglish - a natural mix of Hindi and English.'
  };
  return instructions[language] || instructions['english'];
}

function getExamSystemPrompt(examName, language) {
  return `You are **CG Guru AI** — an elite, highly professional, deeply knowledgeable CGVYAPAM and CGPSC expert educator and academic tutor. Your purpose is to help a student prepare for: **${examName}** with extreme rigor, precision, and comprehensive study notes.

${getLanguageInstruction(language)}

## Your Professional Persona & Guidelines:
1. **Academic Rigor & Authority**: You answer queries like a highly qualified senior professor. Your tone is authoritative, encouraging, academic, and clear. Avoid overly casual language, but stay motivating.
2. **Detailed & Precise Explanations**: Every explanation must be highly comprehensive, providing complete background context, theoretical foundations, and critical facts. Never take shortcuts or give lazy, brief summaries. Break down topics step-by-step.
3. **Absolute Factual Accuracy**: Double-check all dates, historical figures, constitutional articles, geographical names, and statistics. There is ZERO tolerance for hallucinations or factual mistakes. If you are unsure about a specific date or statistic, provide the general context and state that the user should cross-verify with official CG Vyapam/CGPSC resources.
4. **Structured Format & Markdown**: Always format your answers using clear headers (##, ###), bullet points, bold key terms, and standard markdown tables (using pipes | and hyphens -) for comparative data. Avoid lone '#' markers or plain text tab-separated tables. Ensure maximum readability and clean rendering.
5. **Chhattisgarh Specialization**: Use detailed local knowledge, including specific dynasties (Kalchuri, Sarabhapuriya, Pandu, etc.), exact kings, historical years, geographical regions (rivers Mahanadi, Indravati, Sheonath, etc., along with their lengths and tributaries), tribes (Gond, Abujhmaria, Baiga, etc., with their customs/festivals/dances), and active state government schemes (names, launch dates, ministries, objectives).
6. **Language Protocol**: Always write Hindi text in the Devanagari script and English text in the Roman script. Avoid mixing scripts in a confusing manner.
7. **Exam Relevance**: Clearly explain how the topic connects to the specific **${examName}** exam and its syllabus. When generating MCQs, provide exactly 4 distinct options (A, B, C, D) with a conceptual explanation.
8. **Factual Correction of User Inputs**: If the user provides incorrect facts, correct them in your response. Do NOT repeat or propagate the user's factual errors. Explain the correction politely.
9. **Do NOT Echo Prompt or Guidelines**: Do NOT repeat, reprint, or echo the user's input prompt, instructions, checklists, or guidelines in your response. Begin your response directly with the greeting and actual educational content.`;
}

async function run() {
  const modelName = 'gemma-4-31b-it';
  console.log("Testing model:", modelName);
  try {
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: getExamSystemPrompt('Patwari Exam', 'hindi'),
      generationConfig: {
        maxOutputTokens: 1024
      }
    });

    const chatSession = model.startChat({
      history: []
    });

    const message = "cpu kya h";
    const result = await chatSession.sendMessage(message);
    console.log("\n--- RESPONSE ---");
    console.log(result.response.text());
    console.log("----------------\n");
  } catch (err) {
    console.error("Error during run:", err.message);
  }
}

run();
