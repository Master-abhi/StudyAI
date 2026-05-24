const { db } = require('../firebase-admin');

const claudeService = require('./claude');
const groqService = require('./groq');

const CONFIG_DOC = db.collection('config').doc('app');

/**
 * Reads activeAI from Firestore config document.
 * Falls back to 'groq' if Firestore is unreachable.
 */
async function getActiveAI() {
  try {
    const doc = await CONFIG_DOC.get();
    if (doc.exists) {
      return doc.data().activeAI || 'groq';
    }
    return 'groq';
  } catch (err) {
    console.error('[aiManager] Failed to read config from Firestore, defaulting to groq:', err.message);
    return 'groq';
  }
}

/**
 * Writes activeAI to Firestore config document.
 */
async function setActiveAI(modelName) {
  try {
    await CONFIG_DOC.set({ activeAI: modelName }, { merge: true });
    return true;
  } catch (err) {
    console.error('[aiManager] Failed to update config in Firestore:', err.message);
    return false;
  }
}

async function getService() {
  const active = await getActiveAI();
  if (active === 'groq') return groqService;
  return claudeService;
}

async function chat(message, examName, language, history = []) {
  const service = await getService();
  return service.chat(message, examName, language, history);
}

async function chatStream(message, examName, language, history = []) {
  const service = await getService();
  return service.chatStream(message, examName, language, history);
}

async function generateTest(examId, examName, subject, mode, questionCount, language, examSubjects = []) {
  const service = await getService();
  return service.generateTest(examId, examName, subject, mode, questionCount, language, examSubjects);
}

async function parseSyllabus(text) {
  const service = await getService();
  return service.parseSyllabus(text);
}

async function summarizeTopicExtracted(topicName, extractedText, language) {
  const service = await getService();
  const instruction = language === 'hindi' ? 'Respond in Hindi.' : 'Respond in English.';
  const message = `You are a study assistant. I will provide you with extracted textbook PDF content about the topic "${topicName}". 
Please create a highly informative and structured study note on this topic based on the text. 
Use clear headings and bullet points. ${instruction}
  
Extracted Text:
${extractedText.substring(0, 15000)}`;
  return service.chat(message, 'Syllabus Study', language, []);
}

async function summarizeVideoTranscript(topicName, transcription, language) {
  const service = await getService();
  const instruction = language === 'hindi' ? 'Respond in Hindi.' : 'Respond in English.';
  const message = `You are a study assistant. I will provide you with a video transcript or description related to the topic "${topicName}". 
Please extract the most important information, core concepts, and key highlights from this video, structuring it nicely into study notes. ${instruction}
  
Video Data:
${transcription.substring(0, 10000)}
`;
  return service.chat(message, 'Syllabus Study', language, []);
}

async function summarizeNews(title, category, source, language) {
  const service = await getService();
  const langInstruction = language === 'hindi' ? 
    'Respond entirely in Hindi (Devanagari script). Use clean Hindi characters. Avoid spelling mistakes.' : 
    'Respond entirely in English.';
  
  const prompt = `You are CG Guru AI, a professional educational mentor and tutor for competitive exams in Chhattisgarh. 
Analyze the following notification:
Title: "${title}"
Category: ${category}
Source: ${source}

Provide a detailed summary (60-120 words) explaining this notification.
- Explain the key details clearly (like eligibility, qualifications, critical dates, or the core current affair fact).
- State the significance of this notification or fact for students preparing for CGPSC, CG Vyapam, or other government exams in Chhattisgarh.
- Use well-structured bullet points or 2-3 short, clear sentences.
- Avoid generic text or placeholders.
- ${langInstruction}
- CRITICAL: Do NOT write any Cyrillic characters. For example, write "दन्तेवाड़ा", not "дан्तेवाड़ा". Ensure proper spelling.`;

  return service.chat(prompt, 'News Analyzer', language, []);
}

module.exports = {
  chat,
  chatStream,
  generateTest,
  parseSyllabus,
  getActiveAI,
  setActiveAI,
  summarizeTopicExtracted,
  summarizeVideoTranscript,
  summarizeNews
};
