const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getTrainingData, getRelevantTrainingData } = require('./trainingData');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');
const MODEL = 'gemini-2.5-flash';

function resolveModelName(modelName) {
  if (!modelName || typeof modelName !== 'string') return MODEL;
  const name = modelName.trim().toLowerCase();
  
  const validModels = [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ];

  if (validModels.includes(name)) return name;

  if (name.includes('pro')) return 'gemini-2.5-pro';
  if (name.includes('lite') || name.includes('1.5')) return 'gemini-1.5-flash';
  
  return 'gemini-2.5-flash';
}

function getLanguageInstruction(language) {
  const instructions = {
    'hindi': 'Respond entirely in Hindi (Devanagari script). Use Hindi for all explanations, options, and content. CRITICAL SCRIPT GUIDELINE: Always use pure Devanagari Unicode characters for Hindi text. NEVER mix similar-looking Cyrillic characters (such as д, а, н, т, е, к, м, р, у, о, etc.) or Roman letters inside Devanagari words. For example, write "दन्तेवाड़ा" using Devanagari "द", "न", "त", never using Cyrillic "д", "а", or "н". Double-check that your output contains absolutely zero Cyrillic characters.',
    'english': 'Respond entirely in English.',
    'mixed': 'Respond in Hinglish - a natural mix of Hindi and English. Use Devanagari for Hindi words and Roman script for English words, as is natural in everyday Indian conversation. CRITICAL SCRIPT GUIDELINE: Always use pure Devanagari Unicode characters for Hindi words, and Roman characters for English words. NEVER mix similar-looking Cyrillic characters (such as д, а, н, т, е, к, м, р, у, о, etc.) inside Devanagari words. Ensure perfect character encoding integrity.'
  };
  return instructions[language] || instructions['english'];
}

function cleanGemmaResponse(text) {
  if (!text || !text.trim()) return '';
  let cleaned = text;

  // 1. Remove <think>...</think> or <thinking>...</thinking> blocks (Gemma thinking tags)
  cleaned = cleaned.replace(/<think(?:ing)?>([\s\S]*?)<\/think(?:ing)?>/gi, '');

  // 2. Remove planning/thinking blocks at the beginning
  //    Matches lines starting with Plan:, Approach:, Strategy:, Steps:, Thinking:, Let me think, etc.
  const planningBlockRegex = /^(?:[\s\S]*?)(?:(?:^|\n)\s*(?:Plan|Planning|Approach|Strategy|Steps|Thinking|Let me think|Here's my plan|Here is my plan|My approach|Let me outline|Let me structure|I'll structure|I will structure|Let me organize|First, let me|Before I begin|Before I start|Before answering|Let me first|I need to|I'll need to|I will need to|Okay,? (?:so|let)|Alright,? (?:so|let)|Sure,? (?:let me)|Step-by-step|Breaking (?:this|it) down|Analysis:|Key points to cover|Points to cover|Topics to cover|I'll cover|Let me cover|Overview of|Outline:)\s*[:.]?.*(?:\n(?:[-*\d.]\s*.+|\s+.+))*\n*)/i;
  
  // Try to detect if first ~1500 chars contain planning content
  const firstPart = cleaned.substring(0, 1500);
  const planningKeywords = [
    'Plan:', 'Planning:', 'Approach:', 'Strategy:', 'Steps:', 'Thinking:',
    'Let me think', "Here's my plan", 'Here is my plan', 'My approach:',
    'Let me outline', 'Let me structure', "I'll structure", 'Let me organize',
    'Before I begin', 'Before I start', 'Before answering', 'Let me first',
    'Step-by-step', 'Breaking this down', 'Breaking it down', 'Analysis:',
    'Key points to cover', 'Points to cover', 'Topics to cover',
    'Outline:', 'Let me plan', "I'll plan", 'First, I need to',
    'Here is the plan', "Here's the plan", 'My plan:', 'Thought process',
    'Let me analyze', 'Okay, so', 'Alright, let me', 'Sure, let me',
    'CG Guru AI', 'Introduction:', 'Detailed Breakdown:', 'Check:',
    'Did I use Cyrillic characters?', 'Your Professional Persona',
    'Academic Rigor', 'Language Protocol', 'Exam Relevance',
    'I will now', "Now I'll", 'Now let me', 'response_planning',
    'answer_planning', 'pre_planning', 'pre-planning'
  ];

  const hasPlanningPrefix = planningKeywords.some(kw => 
    firstPart.toLowerCase().includes(kw.toLowerCase())
  );

  if (hasPlanningPrefix) {
    // Find where the actual content starts (no greetings in starters — we strip those separately)
    const contentStarters = [
      '## ', '### ', '# ',
      'भारत', 'छत्तीसगढ़', 'यह ', 'इस ', 'इसका ', 'इसमें ',
      '**', '| ', '---',
      'The ', 'This ', 'In ', 'Here ', 'According ',
      'जी ', 'हाँ ', 'बिल्कुल',
      'नमस्ते', 'प्रिय विद्यार्थी', 'प्रिय छात्र', 'आइए', 'आइये'
    ];

    let bestStart = -1;
    for (const starter of contentStarters) {
      // Find the starter after the planning section
      let searchFrom = 0;
      let idx = cleaned.indexOf(starter, searchFrom);
      
      // Skip if it appears inside the planning block (within first 200 chars)
      while (idx !== -1 && idx < 200) {
        idx = cleaned.indexOf(starter, idx + 1);
      }
      
      if (idx !== -1 && (bestStart === -1 || idx < bestStart)) {
        // Check that what follows looks like real content (not a planning bullet)
        const lineStart = cleaned.lastIndexOf('\n', idx);
        const beforeOnLine = cleaned.substring(lineStart + 1, idx).trim();
        if (!beforeOnLine.match(/^[-*\d.]+\s*$/)) {
          bestStart = idx;
        }
      }
    }

    if (bestStart > 0) {
      cleaned = cleaned.substring(bestStart);
    }
  }

  // 3. Strip greetings from the beginning of the response
  cleaned = cleaned.replace(/^\s*(नमस्ते|Namaste|नमस्कार|Hello|Hi|प्रिय विद्यार्थी|प्रिय छात्र|Dear Student)[\s,\-—!।]*\n?/i, '').trimStart();

  // 4. Remove any trailing self-check or meta-commentary
  cleaned = cleaned.replace(/\n*(?:Did I (?:use|follow|check|meet|include).*$)/im, '');
  cleaned = cleaned.replace(/\n*(?:Let me (?:verify|check|double-check|review).*$)/im, '');
  cleaned = cleaned.replace(/\n*(?:Self-check:?.*$)/im, '');
  cleaned = cleaned.replace(/\n*(?:Checklist:?.*$)/im, '');

  return cleaned.trim();
}

function getExamSystemPrompt(examName, language) {
  return `You are **CG Guru AI** — an elite, highly professional, deeply knowledgeable CGVYAPAM and CGPSC expert educator and academic tutor. Your purpose is to help a student prepare for: **${examName}** with extreme rigor, precision, and comprehensive study notes.

## CRITICAL OUTPUT RULE — NO PLANNING, NO THINKING, NO GREETINGS, NO PRE-ANALYSIS:
You MUST NEVER include any planning, thinking, pre-analysis, outlining, step-by-step approach description, or meta-commentary at the beginning of your response. Do NOT write lines like "Plan:", "Approach:", "Steps:", "Let me think...", "Here's my plan", "Breaking this down", "First, I need to...", "Key points to cover", or any similar planning text. Also, do NOT start with any greeting like "नमस्ते", "प्रिय विद्यार्थी", "Hello", "Hi", "Namaste", or any welcoming phrase. Start your response DIRECTLY with the actual educational content — the topic heading, the explanation, the answer. Your response must look like a polished, final answer from the very first word. Absolutely NO internal monologue, thinking process, or social greetings should be visible.

${getLanguageInstruction(language)}

## Your Professional Persona & Guidelines:
1. **Academic Rigor & Authority**: You answer queries like a highly qualified senior professor. Your tone is authoritative, encouraging, academic, and clear. Avoid overly casual language, but stay motivating.
2. **Detailed & Precise Explanations**: Every explanation must be highly comprehensive, providing complete background context, theoretical foundations, and critical facts. Never take shortcuts or give lazy, brief summaries. Break down topics step-by-step.
3. **Absolute Factual Accuracy**: Double-check all dates, historical figures, constitutional articles, geographical names, and statistics. There is ZERO tolerance for hallucinations or factual mistakes. If you are unsure about a specific date or statistic, provide the general context and state that the user should cross-verify with official CG Vyapam/CGPSC resources.
4. **Structured Format & Markdown**: Always format your answers using clear headers (##, ###), bullet points, bold key terms, and standard markdown tables (using pipes | and hyphens -) for comparative data. Avoid lone '#' markers or plain text tab-separated tables. Ensure maximum readability and clean rendering.
5. **Chhattisgarh Specialization**: Use detailed local knowledge, including specific dynasties (Kalchuri, Sarabhapuriya, Pandu, etc.), exact kings, historical years, geographical regions (rivers Mahanadi, Indravati, Sheonath, etc., along with their lengths and tributaries), tribes (Gond, Abujhmaria, Baiga, etc., with their customs/festivals/dances), and active state government schemes (names, launch dates, ministries, objectives).
6. **Language Protocol**: Always write Hindi text in the Devanagari script and English text in the Roman script. Avoid mixing scripts in a confusing manner.
7. **Exam Relevance**: Clearly explain how the topic connects to the specific **${examName}** exam and its syllabus. When generating MCQs, provide exactly 4 distinct options (A, B, C, D) with a detailed conceptual explanation for the correct answer, and explain why the incorrect options are wrong.
8. **Factual Correction of User Inputs**: If the user provides incorrect facts, wrong districts, or incorrect locations for any place, wildlife sanctuary, national park, or event in Chhattisgarh in their query, prompt, or reference materials, you MUST correct them in your response. Do NOT repeat or propagate the user's factual errors. Explain the correction politely.
9. **Do NOT Echo Prompt or Guidelines**: Do NOT repeat, reprint, or echo the user's input prompt, instructions, checklists, or guidelines in your response. Do NOT include any greeting or welcoming phrase (no "नमस्ते", "प्रिय विद्यार्थी", "Hello", etc.). Begin your response directly with the topic heading or actual educational content.
10. **Plotly Graph Support**: Whenever data can be visualized as a chart (e.g. comparing populations, timelines, statistics, demographic distributions, state revenue, budget expenditures), or when the user asks for a chart/graph/plot, you MUST generate a Plotly chart inside a fenced code block with the language tag \`plotly\`. The content must be a valid JSON object matching the Plotly specifications (containing "data" and "layout" properties). Do NOT output other text inside the code block.
    Example:
    \`\`\`plotly
    {
      "data": [
        { "x": ["Tribes", "Agriculture", "Services"], "y": [40, 35, 25], "type": "bar", "marker": { "color": "#ff9933" } }
      ],
      "layout": { "title": "Chhattisgarh Sector Contribution (%)" }
    }
    \`\`\`
11. **KaTeX Math Support**: For all mathematical formulas, equations, or scientific notation, you MUST use LaTeX/KaTeX formatting with appropriate delimiters:
    - Use single dollar signs \`$...\` for inline math equations, e.g., \`$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\`.
    - Use double dollar signs \`$$...$$\` for block math equations.
12. **Image Generation**: If the user requests to generate an image, visualize a scene, or show a custom picture (other than a chart or flowchart), you MUST generate the image by including a markdown image tag targeting the Pollinations AI generator:
    \`![Caption Description](https://image.pollinations.ai/prompt/URL_ENCODED_PROMPT?width=800&height=600&nologo=true&seed=RANDOM_NUMBER)\`
    - Replace \`URL_ENCODED_PROMPT\` with a detailed descriptive English prompt (URL-encoded, e.g. \`traditional%20bastar%20art%20chhattisgarh%20high%20detail\`).
    - Replace \`RANDOM_NUMBER\` with a random integer (e.g., between 1 and 1000000) to ensure uniqueness and prevent caching.
`;
}

async function chat(
  message,
  examName,
  language,
  history = [],
  modelName = "gemma-3-27b-it"
) {

  const formattedHistory = [];

  if (history && history.length > 0) {

    let cleanHistory = history;

    if (cleanHistory[cleanHistory.length - 1]?.role === "user") {
      cleanHistory = cleanHistory.slice(0, -1);
    }

    const recentHistory = cleanHistory.slice(-6);

    for (const h of recentHistory) {

      formattedHistory.push({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }]
      });

    }
  }

  const allTrainingData = await getTrainingData();
  const relevantData = getRelevantTrainingData(message, allTrainingData);
  const systemPrompt = getExamSystemPrompt(examName, language) + relevantData;

  const model = genAI.getGenerativeModel({

    model: resolveModelName(modelName),

    systemInstruction: systemPrompt,

    generationConfig: {
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 4096
    }

  });

  const chatSession = model.startChat({
    history: formattedHistory
  });

  const result = await chatSession.sendMessage(message);

  let response = result.response.text();

  response = cleanGemmaResponse(response);

  return response;
}

async function* chatStream(
  message,
  examName,
  language,
  history = [],
  modelName = "gemma-3-27b-it"
) {

  const formattedHistory = [];

  if (history && history.length > 0) {

    let cleanHistory = history;

    if (cleanHistory[cleanHistory.length - 1]?.role === "user") {
      cleanHistory = cleanHistory.slice(0, -1);
    }

    const recentHistory = cleanHistory.slice(-6);

    for (const h of recentHistory) {

      formattedHistory.push({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }]
      });

    }
  }

  const allTrainingData = await getTrainingData();
  const relevantData = getRelevantTrainingData(message, allTrainingData);
  const systemPrompt = getExamSystemPrompt(examName, language) + relevantData;

  const model = genAI.getGenerativeModel({

    model: resolveModelName(modelName),

    systemInstruction: systemPrompt,

    generationConfig: {
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 4096
    }

  });

  const chatSession = model.startChat({
    history: formattedHistory
  });

  const result = await chatSession.sendMessageStream(message);

  // Buffer initial chunks to detect and strip planning content
  let buffer = "";
  let planningStripped = false;
  const BUFFER_THRESHOLD = 800; // Buffer this many chars before deciding

  for await (const chunk of result.stream) {

    const content = chunk.text();

    if (!planningStripped) {
      buffer += content;

      // Check if buffer is large enough to decide
      if (buffer.length >= BUFFER_THRESHOLD) {
        // Clean the buffer to strip planning prefix
        const cleaned = cleanGemmaResponse(buffer);
        planningStripped = true;

        if (cleaned.length > 0) {
          yield {
            choices: [{ delta: { content: cleaned } }]
          };
        }
      }
    } else {
      // After planning is stripped, pass through directly
      yield {
        choices: [{ delta: { content } }]
      };
    }
  }

  // If stream ended before reaching buffer threshold, clean and yield whatever we have
  if (!planningStripped && buffer.length > 0) {
    const cleaned = cleanGemmaResponse(buffer);
    if (cleaned.length > 0) {
      yield {
        choices: [{ delta: { content: cleaned } }]
      };
    }
  }
}



async function generateTest(examId, examName, subject, mode, questionCount, language, examSubjects = [], syllabusContext = null, modelName = MODEL) {
  const langInstruction = getLanguageInstruction(language);

  let subjectContext = '';
  if (subject !== 'all' && subject) {
    subjectContext = `specifically for the subject: ${subject}`;
  } else if (examSubjects.length > 0) {
    subjectContext = `covering questions from these subjects: ${examSubjects.slice(0, 8).join(', ')}${examSubjects.length > 8 ? ' and more' : ''}`;
  } else {
    subjectContext = 'covering various subjects from the official exam syllabus';
  }

  let syllabusScopePrompt = '';
  if (syllabusContext && syllabusContext.scopeText) {
    syllabusScopePrompt = `\n\nOFFICIAL EXAM SYLLABUS BOUNDARIES FOR ${examName.toUpperCase()} (STRICT COMPLIANCE REQUIRED):\n${syllabusContext.scopeText}\n\nCRITICAL SYLLABUS SCOPE DIRECTIVES:\n1. Every question MUST be strictly constructed from the official topics listed in the syllabus scope above.\n2. Do NOT generate questions on topics outside this syllabus.\n3. Out-of-syllabus questions are strictly invalid and rejected.`;
  }

  let verifiedKnowledgePrompt = '';
  if (syllabusContext && syllabusContext.verifiedKnowledge) {
    verifiedKnowledgePrompt = syllabusContext.verifiedKnowledge;
  }

  const prompt = `Generate exactly ${questionCount} multiple choice questions for the ${examName} exam, ${subjectContext}.${syllabusScopePrompt}${verifiedKnowledgePrompt}

${langInstruction}

STRICT EXAM QUALITY & SOURCE VERIFICATION MANDATES:
1. 100% SYLLABUS ADHERENCE: Every question must directly assess a specific concept from the official ${examName} syllabus. Zero out-of-syllabus questions allowed.
2. VERIFIED FACT ACCURACY & ZERO AMBIGUITY: Every historical fact, date, geographical detail, government scheme, constitutional article/amendment, science law, and mathematical formula MUST be 100% accurate and cross-checked against standard verified official sources (NCERT, State Granth Academy, Official Acts & Gazettes).
3. EXTREMELY DETAILED EXPLANATION: The "explanation" field MUST provide an in-depth, educational breakdown explaining the core principles, citing standard facts, showing step-by-step logic (for math/reasoning), and explaining why incorrect options are wrong.
4. EXAM PATTERN DISTRACTORS: Include exactly 4 options per question. The incorrect options must be plausible distractors commonly encountered in ${examName} exams, with exactly ONE 100% indisputably correct answer.
${mode === 'mock' ? '- Include a mix of easy (30%), medium (50%), and hard (20%) questions' : '- Keep questions at medium difficulty for quick practice'}

You MUST respond with a JSON object that matches this format strictly:
{
  "questions": [
    {
      "question": "The question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed explanation of why this is correct",
      "subject": "The specific subject category of this question"
    }
  ]
}`;

  const model = genAI.getGenerativeModel({
    model: resolveModelName(modelName),
    systemInstruction: `You are an expert question paper setter and chief examiner for ${examName} exam. You generate high-quality MCQs that strictly match the official exam syllabus and pattern. Every question must be factually accurate, verified against standard textbook sources, and free of ambiguity. You ONLY respond with valid JSON, never any other format.`,
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: 8192
    }
  });

  const response = await model.generateContent(prompt);
  const text = response.response.text().trim();

  try {
    const parsed = JSON.parse(text);
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error('Invalid response format: missing questions array');
    }

    const shuffledQuestions = parsed.questions.map(q => {
      if (!q.question || !q.options || q.options.length !== 4 || !q.explanation) {
        throw new Error('Invalid question format');
      }

      let correctIdx = q.correctIndex;
      if (typeof correctIdx === 'undefined' || correctIdx === null) {
        if (typeof q.correctAnswer === 'number') correctIdx = q.correctAnswer;
        else if (typeof q.answer === 'number') correctIdx = q.answer;
        else correctIdx = 0;
      }

      if (correctIdx < 0 || correctIdx > 3) correctIdx = 0;

      const correctOption = q.options[correctIdx];
      const shuffledOptions = [...q.options];
      let newCorrectIdx;

      if (Math.random() > 0.5) {
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }
        newCorrectIdx = shuffledOptions.indexOf(correctOption);
      } else {
        newCorrectIdx = correctIdx;
      }

      return {
        question: q.question,
        options: shuffledOptions,
        correctIndex: newCorrectIdx,
        explanation: q.explanation,
        subject: q.subject || subject || 'General Knowledge'
      };
    });

    return { questions: shuffledQuestions };
  } catch (e) {
    console.error('Failed to parse test JSON:', e.message);
    console.error('Raw response:', text.substring(0, 500));
    throw new Error('Failed to generate valid test questions. Please try again.');
  }
}

async function parseSyllabus(text, modelName = MODEL) {
  const prompt = `Parse the following syllabus text into a structured JSON format. Extract all subjects and their individual topics.

You MUST respond with a JSON object that matches this format strictly:
{
  "subjects": [
    {
      "name": "Subject Name",
      "topics": [
        { "id": "custom-subj1-1", "name": "Topic Name" },
        { "id": "custom-subj1-2", "name": "Another Topic" }
      ]
    }
  ]
}

Rules:
- Group related topics under logical subject headings
- Each topic should be specific enough to study individually
- Generate unique IDs in the format: custom-{subject-abbreviation}-{number}
- Keep topic names concise but descriptive
- If the text is vague, infer reasonable sub-topics

Syllabus text:
${text}`;

  const model = genAI.getGenerativeModel({
    model: resolveModelName(modelName),
    systemInstruction: 'You are an expert at parsing educational syllabi into structured formats. You ONLY respond with valid JSON.',
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: 8192
    }
  });

  const response = await model.generateContent(prompt);
  const responseText = response.response.text().trim();
  
  return JSON.parse(responseText);
}

async function translateAndSummarizeNews(title, category, source, modelName = MODEL) {
  const systemInstruction = `You are a professional bilingual translation and summarization assistant. 
Your task is to translate the title of a news article/notification into Hindi and generate two detailed summaries (60-100 words each): one in English and one in Hindi.

CRITICAL Guidelines:
1. Translate the title accurately into Hindi (Devanagari script) - save it as "title_hi".
2. Write a detailed summary (60-100 words) in English explaining the key details, eligibility, dates, and significance of this news for students preparing for competitive exams (CGPSC, CG Vyapam) - save it as "summary_en".
3. Write the exact same summary translated/written in clear Hindi (Devanagari script) - save it as "summary_hi".
4. SCRIPT GUIDELINE: Always use pure Devanagari Unicode characters for Hindi text. Do NOT mix similar-looking Cyrillic characters (such as д, а, н, т, е, к, м, р, у, о, etc.) or Roman letters inside Devanagari words. For example, write "दन्तेवाड़ा" using Devanagari "द", "न", "त", never using Cyrillic "д", "а", or "н". Double-check that your output contains absolutely zero Cyrillic characters.
5. You MUST respond with a valid JSON object matching the requested structure.`;

  const prompt = `Translate and summarize the following article details:
Title: "${title}"
Category: ${category}
Source: ${source}

Respond with only this JSON format:
{
  "title_hi": "translated title in Hindi Devanagari",
  "summary_en": "detailed English summary of 60-100 words",
  "summary_hi": "detailed Hindi summary of 60-100 words in Devanagari"
}`;

  const model = genAI.getGenerativeModel({
    model: resolveModelName(modelName),
    systemInstruction,
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: 2048
    }
  });

  const response = await model.generateContent(prompt);
  return response.response.text().trim();
}

async function generateNewsIntelligence(title, description, category, source, modelName = MODEL) {
  const systemInstruction = `You are an elite competitive exam prep educator and news intelligence analyzer. Your job is to convert a raw news article/alert into highly structured educational intelligence for Indian government exams (CGPSC, CG Vyapam, Patwari, Sub Inspector, SSC, UPSC, etc.).

Analyze the news article title, description, category, and source.

Generate a comprehensive JSON object matching the following structure strictly. You must output ONLY a valid JSON object, with no other text, warnings, or markdown formatting outside the JSON structure.

JSON Schema:
{
  "title_hi": "Translate/transliterate the article title accurately into clean Hindi (Devanagari script)",
  "category": "Map to EXACTLY one of these categories: Chhattisgarh Current Affairs, National News, International Affairs, Economy, Polity, Science & Technology, Environment, Sports, Awards, Government Schemes, Budget, Agriculture, Reports & Indexes, Exam-Specific Topics",
  "relevanceScore": 1-100 integer (score how likely this news will be asked as a question in exams, where 100 is extremely high probability like budget/census and 10 is low probability),
  "targetExams": ["CGPSC", "CG Vyapam", "UPSC", "SSC", "Banking", "Railway", "Police", "Forest"],
  "whyItMatters": "A concise paragraph (40-80 words) in bilingual Hinglish/Hindi explaining exactly why this article is critical for exams, what syllabus topic it links to, and how questions might be framed.",
  "summary_en": "A highly detailed exam-focused summary of the news in English (60-120 words). Focus on figures, facts, dates, and provisions.",
  "summary_hi": "A highly detailed exam-focused summary of the news in Hindi (60-120 words). Focus on figures, facts, dates, and provisions. Write in clean Devanagari script.",
  "keyFacts_en": [
    "Fact 1 in English",
    "Fact 2 in English"
  ],
  "keyFacts_hi": [
    "Fact 1 in Hindi (Devanagari script)",
    "Fact 2 in Hindi (Devanagari script)"
  ],
  "importantDates": [
    "Date 1: Explanation"
  ],
  "importantPersonalities": [
    "Name 1: Brief context/role"
  ],
  "organizations": [
    "Org 1: Role or connection to news"
  ],
  "locations": [
    "Location 1: Geographical context or importance to the news"
  ],
  "schemes": [
    "Scheme 1: Core details/provisions"
  ],
  "acts": [
    "Act 1: Core details/provisions"
  ],
  "constitutionalArticles": [
    "Article X: Brief connection to the news"
  ],
  "staticGkLinks": [
    {
      "subject": "Name of static GK subject (e.g. Chhattisgarh Geography, Indian Polity)",
      "topic": "Syllabus topic name",
      "connection": "Detailed connection explanation"
    }
  ],
  "pyqConnection": "Explain how this article relates to past year questions (PYQs).",
  "memoryTricks": "A mnemonic, memory trick, or acronym to help students easily remember key facts, dates, or names from this article.",
  "flashcards": [
    {
      "front": "A clear, direct question or prompt on the front of the card in a bilingual format.",
      "back": "The answer/fact explanation on the back of the card in a bilingual format."
    }
  ],
  "mcqs": [
    {
      "question_en": "High-quality exam-style multiple choice question based on the article in English. Include 5 questions in total.",
      "question_hi": "High-quality exam-style multiple choice question in Hindi (Devanagari script).",
      "options_en": ["Option A", "Option B", "Option C", "Option D"],
      "options_hi": ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
      "correctIndex": 0,
      "explanation_en": "Detailed explanation in English of why this option is correct, and why others are incorrect.",
      "explanation_hi": "Detailed explanation in Hindi (Devanagari script) of why this option is correct, and why others are incorrect.",
      "difficulty": "easy",
      "probability": "high"
    }
  ]
}

CRITICAL LANGUAGE & ENCODING RULES:
1. ALWAYS use pure Devanagari Unicode characters for Hindi text.
2. NEVER mix similar-looking Cyrillic characters (such as д, а, н, т, е, к, м, р, у, о, etc.) inside Devanagari words. Doing so will break formatting.
3. The response must be a single JSON object. No extra words, no markdown blocks.`;

  const prompt = `Analyze and generate exam intelligence for:
Title: "${title}"
Description: "${description || ''}"
Category (scraped): "${category || ''}"
Source: "${source || ''}"

Respond with the exact requested JSON format. Include exactly 5 high-quality MCQs based on the content. Make sure all array fields contain real educational connections and have at least 1-3 entries.`;

  const model = genAI.getGenerativeModel({
    model: resolveModelName(modelName),
    systemInstruction,
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: 8192
    }
  });

  const response = await model.generateContent(prompt);
  return response.response.text().trim();
}

module.exports = { chat, chatStream, generateTest, parseSyllabus, translateAndSummarizeNews, generateNewsIntelligence };
