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
        test: data.geminiModelTest || 'gemini-2.5-flash',
        analytics: data.geminiModelAnalytics || 'gemini-2.5-flash',
        chat: data.geminiModelChat || 'gemini-2.5-flash',
        news: data.geminiModelNews || 'gemini-2.5-flash'
      };
    }
  } catch (err) {
    console.error('[aiManager] Failed to read Gemini configuration from Firestore:', err.message);
  }
  return {
    test: 'gemini-2.5-flash',
    analytics: 'gemini-2.5-flash',
    chat: 'gemini-2.5-flash',
    news: 'gemini-2.5-flash'
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

async function getService(feature) {
  try {
    const doc = await CONFIG_DOC.get();
    let provider = 'groq';
    if (doc.exists) {
      const data = doc.data();
      if (feature === 'test') {
        provider = data.providerTest || data.activeAI || 'groq';
      } else if (feature === 'analytics') {
        provider = data.providerAnalytics || data.activeAI || 'groq';
      } else if (feature === 'chat') {
        provider = data.providerChat || data.activeAI || 'groq';
      } else if (feature === 'news') {
        provider = data.providerNews || data.activeAI || 'groq';
      } else {
        provider = data.activeAI || 'groq';
      }
    }
    if (provider === 'gemini') return geminiService;
    if (provider === 'groq') return groqService;
    return claudeService;
  } catch (err) {
    console.error('[aiManager] Failed to get service for feature:', feature, err.message);
    return groqService;
  }
}

async function chat(message, examName, language, history = []) {
  const service = await getService('chat');
  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.chat(message, examName, language, history, config.chat);
  }
  return service.chat(message, examName, language, history);
}

async function chatStream(message, examName, language, history = []) {
  const service = await getService('chat');
  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.chatStream(message, examName, language, history, config.chat);
  }
  return service.chatStream(message, examName, language, history);
}

async function generateTest(examId, examName, subject, mode, questionCount, language, examSubjects = [], syllabusContext = null) {
  const service = await getService('test');
  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.generateTest(examId, examName, subject, mode, questionCount, language, examSubjects, syllabusContext, config.test);
  }
  return service.generateTest(examId, examName, subject, mode, questionCount, language, examSubjects, syllabusContext);
}

async function parseSyllabus(text) {
  const service = await getService('chat');
  if (service === geminiService) {
    const config = await getGeminiConfig();
    return service.parseSyllabus(text, config.chat);
  }
  return service.parseSyllabus(text);
}

async function summarizeTopicExtracted(topicName, extractedText, language) {
  const service = await getService('chat');
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
  const service = await getService('chat');
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
  const service = await getService('news');
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
    return service.chat(prompt, 'News Analyzer', language, [], config.news);
  }
  return service.chat(prompt, 'News Analyzer', language, []);
}

async function generateImprovementPlan(subjectScores, studyTime, accuracy, streak, language) {
  const service = await getService('analytics');
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
  const service = await getService('news');
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

async function generateNewsIntelligence(title, description, category, source) {
  const service = await getService('news');
  let responseText;
  
  try {
    if (service === geminiService) {
      const config = await getGeminiConfig();
      responseText = await service.generateNewsIntelligence(title, description, category, source, config.news);
    } else {
      responseText = await service.generateNewsIntelligence(title, description, category, source);
    }

    if (!responseText) {
      throw new Error('Empty response from AI News Intelligence Generator');
    }

    let jsonText = responseText.trim();
    const match = jsonText.match(/\{[\s\S]*\}/);
    if (match) {
      jsonText = match[0].trim();
    }
    return JSON.parse(jsonText);
  } catch (err) {
    console.error('[generateNewsIntelligence] Error generating news intelligence:', err.message);
    if (responseText) {
      console.error('[generateNewsIntelligence] Raw response text was:', responseText);
    }
    throw err;
  }
}

async function generatePdfStudyNotes({ topicName, topicNameHi, subjectName, examName, targetExams = [], rawMaterial = '', provider = 'gemini' }) {
  const selectedProvider = (provider && String(provider).toLowerCase() === 'groq') ? 'groq' : 'gemini';
  const targetExamStr = targetExams && targetExams.length > 0 
    ? targetExams.join(' • ') 
    : 'CGPSC • CG Vyapam • SI • Police • Patwari • Teacher • Other State Exams';

  const systemPrompt = `You are a senior educational content researcher, Chhattisgarh competitive-exam subject expert, curriculum designer, information architect, and premium PDF document designer.

I am building a professional competitive-exam preparation platform called "CG GURU".

I need you to create a COMPLETE, DETAILED, ACCURATE, EXAM-ORIENTED and PREMIUM study-notes module for CG GURU based on the topic and user-provided study material below.

==================================================
INPUT
==================================================

TOPIC:
${topicNameHi || topicName} (${topicName})

SUBJECT:
${subjectName || 'General Studies / सामान्य अध्ययन'}

TARGET EXAMS:
${targetExamStr}

LANGUAGE:
Hindi (Pure Devanagari script). Use standard English in parentheses where helpful.

==================================================
CORE OBJECTIVE
==================================================
Create a study module that looks and feels like a professionally designed CG GURU educational product.
Modern, Clean, Academic, Premium, Exam-focused, Easy to revise, Highly readable, Information-rich but uncluttered.

ACCURACY GUIDELINES:
- Accuracy is more important than visual appearance.
- Priority: Government of Chhattisgarh official sources, Economic Survey, Budget, Census, NCERT, ASI, RBI.
- Never invent facts, fake schemes, fake dates, statistics, or numerical data.
- For statistics, mention relevant year.
- If a fact cannot be verified, do not fabricate it.

==================================================
REQUIRED OUTPUT FORMAT: PURE JSON ONLY
==================================================
Return ONLY a valid, parseable JSON object with NO markdown fence backticks, matching this exact schema:
{
  "title": "${topicName}",
  "titleHi": "${topicNameHi || topicName}",
  "subject": "${subjectName || 'सामान्य अध्ययन'}",
  "subtitle": "Premium Exam Notes",
  "targetExams": "${targetExamStr}",
  "overview": {
    "introduction": "Comprehensive introduction to the topic in Hindi (3-5 sentences)...",
    "importance": "Why this topic is important for exams...",
    "examRelevance": "Weightage and exam relevance...",
    "quickFacts": [
      "5 to 10 high-value, crisp, accurate exam facts as bullet points..."
    ]
  },
  "chapters": [
    {
      "chapterNumber": "01",
      "chapterTitle": "Chapter Title in Hindi",
      "description": "1-2 line introductory description",
      "examFocus": "Compact card text explaining what is most frequently tested in exams",
      "sections": [
        {
          "heading": "Section Heading in Hindi",
          "content": "Detailed, highly accurate, structured content with bullet points or short paragraphs...",
          "conceptCard": "💡 CONCEPT explanation or definition (optional)",
          "importantFactCard": "⭐ IMPORTANT FACT takeaway (optional)",
          "memoryTrick": "🧠 MEMORY TRICK mnemonic (optional)"
        }
      ],
      "tables": [
        {
          "title": "Table Title (e.g. प्रमुख शासक, कालक्रम, योजना तुलना)",
          "headers": ["स्तंभ 1", "स्तंभ 2", "स्तंभ 3"],
          "rows": [
            ["डेटा 1", "डेटा 2", "डेटा 3"]
          ]
        }
      ]
    }
  ],
  "oneLinerRevision": [
    "One-liner point 1 (crisp high-value fact for last minute revision)...",
    "One-liner point 2...",
    "One-liner point 3..."
  ],
  "confusionBuster": [
    {
      "oftenConfused": "Similar names / dates / locations students confuse",
      "correctInformation": "Clear correct fact and context to remove confusion"
    }
  ],
  "pyqSection": [
    {
      "examYear": "CGPSC / CG Vyapam (or PYQ-Style)",
      "question": "Question text in Hindi...",
      "answer": "Correct answer with brief explanation"
    }
  ],
  "mcqs": [
    {
      "q": "MCQ Question in Hindi?",
      "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
      "correct": "B",
      "explanation": "2-4 line exam-focused explanation."
    }
  ],
  "rapidRevision": [
    "Short fact / figure / formula for 5-minute revision..."
  ],
  "checklist": [
    "महत्वपूर्ण तिथियां एवं कालक्रम का पुनरीक्षण पूर्ण",
    "प्रमुख स्थान, नदियां एवं भौगोलिक तथ्य याद किए",
    "संबद्ध सरकारी नीतियां, आंकड़े एवं बजट तथ्य स्पष्ट",
    "भ्रम बिंदु (Confusion Buster) तालिका का अध्ययन किया",
    "सभी 20+ अभ्यास प्रश्नों (MCQs) का अभ्यास पूर्ण"
  ],
  "sources": [
    "छत्तीसगढ़ संदर्भ एवं ग्रंथ अकादमी",
    "आर्थिक सर्वेक्षण छत्तीसगढ़",
    "आधिकारिक शासकीय गजट एवं आयोग संदर्भ"
  ]
}

==================================================
STUDY MATERIAL PROVIDED BY EDUCATOR:
==================================================
${rawMaterial.trim() || `Cover the core syllabus and exam requirements for topic: ${topicNameHi || topicName} in ${subjectName}.`}

==================================================
MANDATORY COMPLETION & ZERO-OMISSION RULES:
==================================================
1. "chapters": Provide comprehensive, richly detailed chapters (create as many as needed, typically 3 to 8 chapters) to cover EVERY era, period, ruler, scheme, location, event, and section present in the syllabus or educator material. NOTHING SHOULD BE OMITTED OR COMPRESSED AWAY ('कुछ भी छूटना नहीं चाहिए').
   Every chapter MUST include:
   - "sections": 2 to 4 detailed sections with exhaustive, deep theory, bullet points, names, dates, and historical/geographical context.
   - "tables": If the topic or educator notes contain tabular data, timelines, or lists, structure them as clear comparison/chronology tables with headers and rows.
   - "examFocus": Specific high-yield exam takeaways.
   - "conceptCard": Core conceptual explanation or definition.
   - "importantFactCard": Key factual highlight.
   - "memoryTrick": Mnemonic or trick to memorize.
2. "oneLinerRevision": Provide 20 to 30 crisp, numbered high-value facts covering all aspects and sections of the topic.
3. "confusionBuster": Provide 4 to 8 clear pairs of oftenConfused vs correctInformation (similar names, dates, locations students confuse).
4. "pyqSection": Provide 4 to 6 past year / exam-style questions with accurate answers and brief explanations.
5. "mcqs": Provide 8 to 12 high-quality practice MCQs with 4 options and clear 2-line explanations.
6. "rapidRevision": Provide 8 to 12 quick revision bullet points.
7. "checklist": 5 exam readiness checklist points.
8. "sources": 3 to 5 authentic, specific reference sources (e.g., छत्तीसगढ़ हिंदी ग्रंथ अकादमी पुस्तक/लेखक, छत्तीसगढ़ आर्थिक सर्वेक्षण, शासकीय गजट, संबंधित आयोग).
9. TABLE & FACT PRESERVATION: If the educator provided tables, timelines, or site directories above, preserve EVERY single table faithfully with all its rows and columns intact.
10. Return ONLY pure, valid JSON with no markdown fences and no trailing conversational text.
`;

function tryParseOrRepairJson(raw) {
  if (!raw) return null;
  let text = typeof raw === 'object' ? JSON.stringify(raw) : String(raw).trim();
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  }
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    text = match[0].trim();
  }

  // 1. Direct parse
  try {
    return JSON.parse(text);
  } catch (e1) {
    // 2. Auto-repair unclosed quotes and brackets
    try {
      let repaired = text.replace(/,\s*([\]}])/g, '$1');
      let openBraces = 0;
      let openBrackets = 0;
      let inString = false;
      let escape = false;

      for (let i = 0; i < repaired.length; i++) {
        const c = repaired[i];
        if (c === '\\' && inString) {
          escape = !escape;
          continue;
        }
        if (c === '"' && !escape) {
          inString = !inString;
        }
        if (!inString) {
          if (c === '{') openBraces++;
          else if (c === '}') openBraces--;
          else if (c === '[') openBrackets++;
          else if (c === ']') openBrackets--;
        }
        escape = false;
      }

      if (inString) repaired += '"';
      while (openBrackets > 0) { repaired += ']'; openBrackets--; }
      while (openBraces > 0) { repaired += '}'; openBraces--; }

      return JSON.parse(repaired);
    } catch (e2) {
      console.warn('[aiManager] JSON repair failed:', e2.message);
      return null;
    }
  }
}

  let responseText;
  const userPrompt = `Create the complete, exhaustive, exam-oriented study module JSON for topic: "${topicNameHi || topicName}" (${topicName}) in subject "${subjectName || 'सामान्य अध्ययन'}".
CRITICAL REQUIREMENT:
- Fully cover EVERY SINGLE era, fact, person, location, and section from the educator material without omitting anything.
- Preserve all tables and data lists.
Return ONLY the valid JSON object with NO markdown fences.`;

  try {
    if (selectedProvider === 'groq') {
      console.log('[generatePdfStudyNotes] Requesting Groq for study notes generation...');
      if (groqService && groqService.generateNotesJson) {
        responseText = await groqService.generateNotesJson(systemPrompt, userPrompt, 6000);
      } else if (groqService && typeof groqService.chat === 'function') {
        responseText = await groqService.chat(systemPrompt + '\n\n' + userPrompt, 'Study Notes Designer', 'hindi', [], 6000);
      } else {
        throw new Error('Groq service is not available');
      }
    } else {
      console.log('[generatePdfStudyNotes] Requesting Gemini for study notes generation...');
      if (geminiService && geminiService.generatePdfNotesJson) {
        responseText = await geminiService.generatePdfNotesJson(systemPrompt, userPrompt, 'gemini-2.5-flash');
      } else {
        const testService = await getService('test');
        responseText = await testService.chat(systemPrompt + '\n\n' + userPrompt, 'Study Notes Designer', 'hindi', [], 8000);
      }
    }
  } catch (primaryErr) {
    console.warn(`[generatePdfStudyNotes] Primary provider (${selectedProvider}) failed: ${primaryErr.message}. Trying alternate fallback...`);
    try {
      if (selectedProvider === 'groq') {
        // Fallback to Gemini
        console.log('[generatePdfStudyNotes] Falling back to Gemini...');
        if (geminiService && geminiService.generatePdfNotesJson) {
          responseText = await geminiService.generatePdfNotesJson(systemPrompt, userPrompt, 'gemini-2.5-flash');
        } else {
          throw primaryErr;
        }
      } else {
        // Fallback to Groq
        console.log('[generatePdfStudyNotes] Falling back to Groq...');
        if (groqService && groqService.generateNotesJson) {
          responseText = await groqService.generateNotesJson(systemPrompt, userPrompt, 6000);
        } else if (groqService && typeof groqService.chat === 'function') {
          responseText = await groqService.chat(systemPrompt + '\n\n' + userPrompt, 'Study Notes Designer', 'hindi', [], 6000);
        } else {
          throw primaryErr;
        }
      }
    } catch (fallbackErr) {
      console.error(`[generatePdfStudyNotes] Fallback provider also failed: ${fallbackErr.message}`);
      throw primaryErr;
    }
  }

  if (!responseText) {
    throw new Error('Empty response from AI Study Notes Designer');
  }

  const parsed = tryParseOrRepairJson(responseText);
  if (parsed && typeof parsed === 'object') {
    return { success: true, structured: parsed };
  } else {
    console.warn('[generatePdfStudyNotes] JSON parse failed, returning raw markdown');
    return { success: true, structured: null, rawText: responseText };
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
  generateNewsIntelligence,
  generateImprovementPlan,
  generatePdfStudyNotes
};

