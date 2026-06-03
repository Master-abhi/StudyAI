const { db } = require('../firebase-admin');

const claudeService = require('./claude');
const groqService = require('./groq');
const geminiService = require('./gemini');

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

/**
 * Reads Gemini models configuration from Firestore.
 */
async function getGeminiConfig() {
  try {
    const doc = await CONFIG_DOC.get();
    if (doc.exists) {
      const data = doc.data();
      return {
        test: data.geminiModelTest || 'gemini-3.5-flash',
        analytics: data.geminiModelAnalytics || 'gemini-3.5-flash',
        chat: data.geminiModelChat || 'gemini-3.5-flash',
        news: data.geminiModelNews || 'gemini-3.5-flash'
      };
    }
  } catch (err) {
    console.error('[aiManager] Failed to read Gemini configuration from Firestore:', err.message);
  }
  return {
    test: 'gemini-3.5-flash',
    analytics: 'gemini-3.5-flash',
    chat: 'gemini-3.5-flash',
    news: 'gemini-3.5-flash'
  };
}

/**
 * Updates AI and Gemini models configuration in Firestore.
 */
async function updateAIConfig(config) {
  try {
    await CONFIG_DOC.set(config, { merge: true });
    return true;
  } catch (err) {
    console.error('[aiManager] Failed to update AI config in Firestore:', err.message);
    return false;
  }
}

async function getService() {
  const active = await getActiveAI();
  if (active === 'gemini') return geminiService;
  if (active === 'groq') return groqService;
  return claudeService;
}

async function chat(message, examName, language, history = []) {
  const service = await getService();
  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.chat(message, examName, language, history, config.chat);
  }
  return service.chat(message, examName, language, history);
}

async function chatStream(message, examName, language, history = []) {
  const service = await getService();
  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.chatStream(message, examName, language, history, config.chat);
  }
  return service.chatStream(message, examName, language, history);
}

async function generateTest(examId, examName, subject, mode, questionCount, language, examSubjects = []) {
  const service = await getService();
  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.generateTest(examId, examName, subject, mode, questionCount, language, examSubjects, config.test);
  }
  return service.generateTest(examId, examName, subject, mode, questionCount, language, examSubjects);
}

async function parseSyllabus(text) {
  const service = await getService();
  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.parseSyllabus(text, config.chat);
  }
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

  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.chat(message, 'Syllabus Study', language, [], config.chat);
  }
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
  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.chat(message, 'Syllabus Study', language, [], config.chat);
  }
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

  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.chat(prompt, 'News Analyzer', language, [], config.chat);
  }
  return service.chat(prompt, 'News Analyzer', language, []);
}

async function generateImprovementPlan(subjectScores, studyTime, accuracy, streak, language) {
  const service = await getService();
  const langInstruction = language === 'hindi' ? 
    'Respond entirely in Hindi (Devanagari script). Use clean Hindi characters.' : 
    'Respond entirely in English.';

  const subjectSummary = Object.entries(subjectScores).map(([subj, data]) => {
    return `- ${subj}: Average Accuracy ${data.accuracy || 0}%, Tests given: ${data.total || 0}`;
  }).join('\n');

  const prompt = `You are CG Guru AI, an elite professional CGVYAPAM and CGPSC expert educator. 
Analyze the student's current prep progress:
- Total Study Time: ${studyTime} minutes
- Overall Test Accuracy: ${accuracy}%
- Current Daily Streak: ${streak} days
- Subject-wise Test Results:
${subjectSummary || 'No test results available yet.'}

Provide a structured, professional, and actionable personalized Study & Improvement Plan (120-180 words).
The response should contain:
1. **Overall Progress Assessment**: A quick evaluation of their current level.
2. **Key Strengths**: Highlight their best subject(s).
3. **Key Improvement Areas**: Highlight which subjects/areas need immediate attention and why.
4. **Daily Action Plan**: Concrete next steps for daily studies to improve accuracy and maintain streak.

Format your output beautifully using standard Markdown with bold headers and bullet points. No generic placeholders.
${langInstruction}`;

  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.chat(prompt, 'Study Planner', language, [], config.analytics);
  }
  return service.chat(prompt, 'Study Planner', language, []);
}

async function translateAndSummarizeNews(title, category, source) {
  const service = await getService();
  let responseText;
  
  try {
    if (service === geminiService) {
      const config = await getGeminiConfig();
      responseText = await service.translateAndSummarizeNews(title, category, source, config.news);
    } else {
      responseText = await service.translateAndSummarizeNews(title, category, source);
    }

    if (!responseText) {
      throw new Error('Empty response from AI translator');
    }

    const match = responseText.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0].trim());
    }
    return JSON.parse(responseText.trim());
  } catch (err) {
    console.error('[translateAndSummarizeNews] Error translating news details:', err.message);
    if (responseText) {
      console.error('[translateAndSummarizeNews] Raw response text was:', responseText);
    }
    throw err;
  }
}

module.exports = {
  chat,
  chatStream,
  generateTest,
  parseSyllabus,
  getActiveAI,
  setActiveAI,
  getGeminiConfig,
  updateAIConfig,
  summarizeTopicExtracted,
  summarizeVideoTranscript,
  summarizeNews,
  translateAndSummarizeNews,
  generateImprovementPlan
};

