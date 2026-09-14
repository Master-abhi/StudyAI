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

// Helper to extract clean chapters and tables from raw text without AI tokens
function parseRawMaterialLocally(rawText, topicTitle) {
  if (!rawText || !rawText.trim()) return [];
  const clean = rawText.trim();
  
  // Extract tables
  const tableMatches = clean.match(/((?:\|[^\n]+\|\r?\n)+)/g);
  const parsedTables = [];
  if (tableMatches) {
    tableMatches.forEach((tblBlock, idx) => {
      const rows = tblBlock.trim().split(/\r?\n/).filter(r => !r.includes('---'));
      if (rows.length >= 2) {
        const headers = rows[0].split('|').map(c => c.trim()).filter(Boolean);
        const dataRows = rows.slice(1).map(r => r.split('|').map(c => c.trim()).filter(Boolean));
        parsedTables.push({
          title: `तालिका ${idx + 1}: महत्वपूर्ण तथ्य एवं तुलनात्मक विश्लेषण`,
          headers,
          rows: dataRows
        });
      }
    });
  }

  // Split chapters by # or ##
  const chapterChunks = [];
  const h1Splits = clean.split(/\n(?=#\s+[^\n]+)/);
  if (h1Splits.length > 1) {
    h1Splits.forEach((chunk, idx) => {
      const match = chunk.match(/^#\s+([^\n]+)/);
      const title = match ? match[1].trim() : `अध्याय ${idx + 1}`;
      const body = chunk.replace(/^#\s+[^\n]+\n?/, '').trim();
      if (body || title) chapterChunks.push({ title, body });
    });
  } else {
    const h2Splits = clean.split(/\n(?=##\s+[^\n]+)/);
    if (h2Splits.length > 2) {
      h2Splits.forEach((chunk, idx) => {
        const match = chunk.match(/^##\s+([^\n]+)/);
        const title = match ? match[1].trim() : `अध्याय ${idx + 1}`;
        const body = chunk.replace(/^##\s+[^\n]+\n?/, '').trim();
        if (body || title) chapterChunks.push({ title, body });
      });
    } else {
      chapterChunks.push({
        title: topicTitle || 'मुख्य अध्ययन विवरण',
        body: clean
      });
    }
  }

  return chapterChunks.map((chap, cIdx) => {
    const secSplits = chap.body.split(/\n(?=(?:###?|\*\*)\s*[^#\n]+)/);
    const sections = [];

    if (secSplits.length > 1) {
      secSplits.forEach((sChunk, sIdx) => {
        const hMatch = sChunk.match(/^(?:###?\s*|\*\*)([^\n*]+)(?:\*\*)?/);
        const heading = hMatch ? hMatch[1].trim() : `भाग ${sIdx + 1}: महत्वपूर्ण बिंदु`;
        let secContent = sChunk.replace(/^(?:###?\s*|\*\*)[^\n]+(?:\*\*)?\n?/, '').trim();
        if (!secContent) secContent = sChunk.trim();

        let factCard = '';
        let conceptCard = '';
        const lines = secContent.split('\n').map(l => l.trim()).filter(Boolean);
        for (const line of lines) {
          if (!factCard && (line.includes('महत्वपूर्ण') || line.includes('विशेष') || line.includes('नोट:'))) {
            factCard = line.replace(/^[->*#•\s]+/, '').trim();
          }
          if (!conceptCard && (line.includes('अवधारणा') || line.includes('सिद्धांत') || line.includes('परिभाषा'))) {
            conceptCard = line.replace(/^[->*#•\s]+/, '').trim();
          }
        }

        sections.push({
          heading,
          content: secContent,
          conceptCard: conceptCard || undefined,
          importantFactCard: factCard || undefined
        });
      });
    } else {
      sections.push({
        heading: 'अवधारणा एवं विस्तृत विवरण',
        content: chap.body,
        importantFactCard: 'परीक्षा के दृष्टिकोण से सभी महत्वपूर्ण तिथियां, स्थान एवं मुख्य आंकड़े ध्यान रखें।'
      });
    }

    const chapTables = parsedTables.slice(cIdx * 2, (cIdx + 1) * 2);
    return {
      chapterNumber: String(cIdx + 1).padStart(2, '0'),
      chapterTitle: chap.title,
      description: 'मुख्य अवधारणाएं एवं परीक्षा उपयोगी तथ्य',
      examFocus: 'तथ्यों, कालक्रम, प्रमुख व्यक्तियों, नीतियों और प्रावधानों पर आधारित प्रश्न पूछे जाते हैं।',
      sections,
      tables: chapTables.length > 0 ? chapTables : undefined
    };
  });
}

async function generatePdfStudyNotes({ 
  topicName, 
  topicNameHi, 
  subjectName, 
  examName, 
  targetExams = [], 
  rawMaterial = '',
  mode = 'enrich',
  provider = 'groq'
}) {
  const targetExamStr = targetExams && targetExams.length > 0 
    ? targetExams.join(' • ') 
    : 'CGPSC • CG Vyapam • SI • Police • Patwari • Teacher • Other State Exams';

  const tHi = topicNameHi || topicName;
  const sName = subjectName || 'General Studies / सामान्य अध्ययन';

  let responseText = '';

  // MODE 1: ENRICH (85%+ Token Saving Hybrid)
  // Preserves user's actual notes/tables locally (0 token), and AI generates authentic MCQs, PYQs, and One-Liners (~800-1200 tokens)
  if (mode === 'enrich' && rawMaterial && rawMaterial.trim().length > 30) {
    const localChapters = parseRawMaterialLocally(rawMaterial, tHi);

    const enrichSystemPrompt = `You are a senior Chhattisgarh competitive-exam specialist for "CG GURU".
Your task is to generate HIGH-YIELD EXAM SUPPLEMENTS in pure Hindi (Devanagari script) based on the topic and educator material.

CRITICAL RULES:
- Output ONLY valid JSON, no markdown fences, no conversational text.
- Never hallucinate fake facts or fake dates.
- Generate EXACTLY:
  - 4 to 6 quickFacts (crisp bullet points)
  - 8 to 12 oneLinerRevision (high-yield revision points)
  - 2 to 4 confusionBuster pairs (oftenConfused vs correctInformation)
  - 3 to 4 pyqSection (exam-style questions with accurate answers)
  - 4 to 5 high-quality MCQs with 4 options and 2-line explanation
  - 4 checklist points

JSON SCHEMA:
{
  "introduction": "2-3 crisp sentences introducing the topic and exam significance",
  "quickFacts": ["Fact 1...", "Fact 2..."],
  "oneLinerRevision": ["Point 1...", "Point 2..."],
  "confusionBuster": [
    { "oftenConfused": "...", "correctInformation": "..." }
  ],
  "pyqSection": [
    { "examYear": "CGPSC / CG Vyapam", "question": "...", "answer": "..." }
  ],
  "mcqs": [
    {
      "q": "MCQ Question in Hindi?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct": "A",
      "explanation": "..."
    }
  ],
  "checklist": ["Checklist item 1...", "Checklist item 2..."]
}`;

    const enrichUserPrompt = `TOPIC: ${tHi} (${topicName})
SUBJECT: ${sName}
EXAMS: ${targetExamStr}

EDUCATOR RAW MATERIAL (Reference for facts & questions):
${rawMaterial.slice(0, 3000)}

Generate the exact JSON exam supplements now. Return ONLY JSON.`;

    try {
      if (provider === 'groq' && groqService && groqService.generateNotesJson) {
        responseText = await groqService.generateNotesJson(enrichSystemPrompt, enrichUserPrompt, 3000);
      } else if (geminiService && geminiService.generatePdfNotesJson) {
        responseText = await geminiService.generatePdfNotesJson(enrichSystemPrompt, enrichUserPrompt, 'gemini-2.5-flash');
      } else if (groqService && groqService.generateNotesJson) {
        responseText = await groqService.generateNotesJson(enrichSystemPrompt, enrichUserPrompt, 3000);
      }
    } catch (primaryErr) {
      console.warn(`[generatePdfStudyNotes:enrich] Primary failed (${primaryErr.message}). Trying alternative provider...`);
      try {
        if (provider === 'groq' && geminiService && geminiService.generatePdfNotesJson) {
          responseText = await geminiService.generatePdfNotesJson(enrichSystemPrompt, enrichUserPrompt, 'gemini-2.5-flash');
        } else if (groqService && groqService.generateNotesJson) {
          responseText = await groqService.generateNotesJson(enrichSystemPrompt, enrichUserPrompt, 3000);
        }
      } catch (fallbackErr) {
        console.error(`[generatePdfStudyNotes:enrich] Fallback failed: ${fallbackErr.message}`);
      }
    }

    const parsedEnrich = tryParseOrRepairJson(responseText);

    if (parsedEnrich && typeof parsedEnrich === 'object') {
      const mergedNotes = {
        title: topicName,
        titleHi: tHi,
        subject: sName,
        subtitle: 'Premium Exam Notes',
        targetExams: targetExamStr,
        overview: {
          introduction: parsedEnrich.introduction || `${tHi} विषय पर आधारित परीक्षा उपयोगी प्रामाणिक अध्ययन नोट्स।`,
          importance: 'विगत वर्षों की परीक्षाओं में इस विषय से निरंतर प्रश्न पूछे जाते रहे हैं।',
          examRelevance: 'प्रारंभिक एवं मुख्य परीक्षा हेतु अति महत्वपूर्ण',
          quickFacts: Array.isArray(parsedEnrich.quickFacts) ? parsedEnrich.quickFacts : []
        },
        chapters: localChapters,
        oneLinerRevision: Array.isArray(parsedEnrich.oneLinerRevision) ? parsedEnrich.oneLinerRevision : [],
        confusionBuster: Array.isArray(parsedEnrich.confusionBuster) ? parsedEnrich.confusionBuster : [],
        pyqSection: Array.isArray(parsedEnrich.pyqSection) ? parsedEnrich.pyqSection : [],
        mcqs: Array.isArray(parsedEnrich.mcqs) ? parsedEnrich.mcqs : [],
        rapidRevision: Array.isArray(parsedEnrich.oneLinerRevision) ? parsedEnrich.oneLinerRevision.slice(0, 8) : [],
        checklist: Array.isArray(parsedEnrich.checklist) && parsedEnrich.checklist.length > 0 
          ? parsedEnrich.checklist 
          : [
              'महत्वपूर्ण तिथियां एवं कालक्रम का पुनरीक्षण पूर्ण',
              'प्रमुख स्थान, व्यक्ति एवं भौगोलिक तथ्य याद किए',
              'भ्रम बिंदु (Confusion Buster) तालिका का अध्ययन किया',
              'सभी अभ्यास प्रश्नों (MCQs) का अभ्यास पूर्ण'
            ],
        sources: ['छत्तीसगढ़ संदर्भ एवं ग्रंथ अकादमी', 'आधिकारिक शासकीय गजट', 'CG GURU रिसर्च टीम']
      };

      return { success: true, structured: mergedNotes, mode: 'enrich', provider };
    }
  }

  // MODE 2: FULL AUTO AI GENERATION (Token-Optimized to 2,500 max tokens)
  const fullSystemPrompt = `You are a senior educational content researcher for Chhattisgarh exams at "CG GURU".
Create a compact, exam-oriented study module in pure Hindi (Devanagari script).

OUTPUT MUST BE VALID JSON ONLY matching this schema:
{
  "title": "${topicName}",
  "titleHi": "${tHi}",
  "subject": "${sName}",
  "subtitle": "Premium Exam Notes",
  "targetExams": "${targetExamStr}",
  "overview": {
    "introduction": "2-3 sentences introducing the topic",
    "quickFacts": ["3-5 high-yield facts"]
  },
  "chapters": [
    {
      "chapterNumber": "01",
      "chapterTitle": "Chapter Title in Hindi",
      "description": "Brief description",
      "examFocus": "Key exam takeaway",
      "sections": [
        {
          "heading": "Section Heading",
          "content": "Structured bullet points or short paragraphs...",
          "importantFactCard": "Key fact"
        }
      ],
      "tables": [
        {
          "title": "Comparative Table",
          "headers": ["स्तंभ 1", "स्तंभ 2"],
          "rows": [["डेटा 1", "डेटा 2"]]
        }
      ]
    }
  ],
  "oneLinerRevision": ["Point 1...", "Point 2..."],
  "confusionBuster": [
    { "oftenConfused": "...", "correctInformation": "..." }
  ],
  "pyqSection": [
    { "examYear": "CGPSC / CG Vyapam", "question": "...", "answer": "..." }
  ],
  "mcqs": [
    {
      "q": "MCQ Question?",
      "options": ["A. ..", "B. ..", "C. ..", "D. .."],
      "correct": "A",
      "explanation": "Brief explanation"
    }
  ],
  "checklist": ["Point 1", "Point 2"],
  "sources": ["छत्तीसगढ़ संदर्भ एवं ग्रंथ अकादमी", "आधिकारिक शासकीय गजट"]
}`;

  const fullUserPrompt = `Create the complete, exam-oriented study module JSON for topic: "${tHi}" (${topicName}) in subject "${sName}".
Educator Notes (if any):
${rawMaterial.slice(0, 2000)}

Keep content concise, fact-rich, and exam-focused. Return ONLY valid JSON.`;

  try {
    if (provider === 'groq' && groqService && groqService.generateNotesJson) {
      responseText = await groqService.generateNotesJson(fullSystemPrompt, fullUserPrompt, 3500);
    } else if (geminiService && geminiService.generatePdfNotesJson) {
      responseText = await geminiService.generatePdfNotesJson(fullSystemPrompt, fullUserPrompt, 'gemini-2.5-flash');
    } else if (groqService && groqService.generateNotesJson) {
      responseText = await groqService.generateNotesJson(fullSystemPrompt, fullUserPrompt, 3500);
    }
  } catch (primaryErr) {
    console.warn(`[generatePdfStudyNotes:full] Primary failed (${primaryErr.message}). Trying fallback...`);
    try {
      if (groqService && groqService.generateNotesJson) {
        responseText = await groqService.generateNotesJson(fullSystemPrompt, fullUserPrompt, 3500);
      } else if (geminiService && geminiService.generatePdfNotesJson) {
        responseText = await geminiService.generatePdfNotesJson(fullSystemPrompt, fullUserPrompt, 'gemini-2.5-flash');
      }
    } catch (fallbackErr) {
      console.error(`[generatePdfStudyNotes:full] Fallback failed: ${fallbackErr.message}`);
      throw primaryErr;
    }
  }

  const parsedFull = tryParseOrRepairJson(responseText);
  if (parsedFull && typeof parsedFull === 'object') {
    return { success: true, structured: parsedFull, mode: 'full', provider };
  } else {
    // Fallback: parse raw material locally so the user never gets an error
    const fallbackChapters = parseRawMaterialLocally(rawMaterial, tHi);
    return { 
      success: true, 
      structured: {
        title: topicName,
        titleHi: tHi,
        subject: sName,
        subtitle: 'Study Notes',
        targetExams: targetExamStr,
        overview: {
          introduction: `${tHi} विषय पर आधारित अध्ययन सामग्री।`,
          quickFacts: []
        },
        chapters: fallbackChapters,
        oneLinerRevision: [],
        confusionBuster: [],
        pyqSection: [],
        mcqs: [],
        rapidRevision: [],
        checklist: ['अध्ययन पूर्ण', 'अभ्यास पूर्ण'],
        sources: ['CG GURU रिसर्च टीम']
      },
      mode: 'local_fallback',
      rawText: responseText
    };
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

