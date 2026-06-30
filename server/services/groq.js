const Groq = require('groq-sdk');
const { getTrainingData, getRelevantTrainingData } = require('./trainingData');

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Helper: normalize Devanagari digits to ASCII
function normalizeDigits(text) {
  return text.replace(/[०-९]/g, d => '0123456789'['०१२३४५६७८९'.indexOf(d)]);
}

// Helper: strip common greetings at the beginning
function stripGreetings(text) {
  return text.replace(/^\s*(नमस्ते|Namaste|नमस्कार|Hello|Hi|प्रिय विद्यार्थी|प्रिय छात्र|Dear Student)[\s,\-—!।]*\n?/i, '').trimStart();
}

// Core cleaning pipeline for Groq responses
function cleanGroqResponse(text, originalMessage) {
  let cleaned = text;
  // 1. Remove any echoed user prompt
  if (originalMessage && originalMessage.trim().length > 0) {
    const cleanMsg = originalMessage.trim();
    cleaned = cleaned.split(cleanMsg).join('').trimStart();
  }
  // 2. Normalize digits
  cleaned = normalizeDigits(cleaned);
  // 3. Strip greetings
  cleaned = stripGreetings(cleaned);
  // 4. Trim excess whitespace
  return cleaned.trim();
}

const MODEL = 'llama-3.3-70b-versatile';

function getLanguageInstruction(language) {
  const instructions = {
    'hindi': 'Respond entirely in Hindi (Devanagari script). Use Hindi for all explanations, options, and content. CRITICAL SCRIPT GUIDELINE: Always use pure Devanagari Unicode characters for Hindi text. NEVER mix similar-looking Cyrillic characters (such as д, а, н, т, е, к, м, р, у, о, etc.) or Roman letters inside Devanagari words. For example, write "दन्तेवाड़ा" using Devanagari "द", "न", "त", never using Cyrillic "д", "а", or "н". Double-check that your output contains absolutely zero Cyrillic characters.',
    'english': 'Respond entirely in English.',
    'mixed': 'Respond in Hinglish - a natural mix of Hindi and English. Use Devanagari for Hindi words and Roman script for English words, as is natural in everyday Indian conversation. CRITICAL SCRIPT GUIDELINE: Always use pure Devanagari Unicode characters for Hindi words, and Roman characters for English words. NEVER mix similar-looking Cyrillic characters (such as д, а, н, т, е, к, м, р, у, о, etc.) inside Devanagari words. Ensure perfect character encoding integrity.'
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

async function chat(message, examName, language, history = []) {
  const allTrainingData = await getTrainingData();
  const relevantData = getRelevantTrainingData(message, allTrainingData);
  const systemPrompt = getExamSystemPrompt(examName, language) + relevantData;

  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  if (history && history.length > 0) {
    let cleanHistory = history;
    if (cleanHistory[cleanHistory.length - 1].role === 'user') {
      cleanHistory = cleanHistory.slice(0, -1);
    }
    const recentHistory = cleanHistory.slice(-6);
    for (const h of recentHistory) {
      messages.push({ role: h.role, content: h.content });
    }
  }

  const promptMessage = message;
  messages.push({ role: 'user', content: promptMessage });

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 2000,
    messages: messages
  });

  let raw = response.choices[0].message.content;
  // Clean the response for professional output
  raw = cleanGroqResponse(raw, message);
  return raw;
}

async function chatStream(message, examName, language, history = []) {
  const allTrainingData = await getTrainingData();
  const relevantData = getRelevantTrainingData(message, allTrainingData);
  const systemPrompt = getExamSystemPrompt(examName, language) + relevantData;

  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  if (history && history.length > 0) {
    let cleanHistory = history;
    if (cleanHistory[cleanHistory.length - 1].role === 'user') {
      cleanHistory = cleanHistory.slice(0, -1);
    }
    const recentHistory = cleanHistory.slice(-6);
    for (const h of recentHistory) {
      messages.push({ role: h.role, content: h.content });
    }
  }

  const promptMessage = message;
  messages.push({ role: 'user', content: promptMessage });

  // Streamed responses will be processed chunk‑by‑chunk for cleaning
  const stream = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 2000,
    messages: messages,
    stream: true
  });

  // The caller will iterate over the stream; each chunk will be cleaned by the consumer using cleanGroqResponse.
  return stream;
}

async function generateTest(examId, examName, subject, mode, questionCount, language, examSubjects = []) {
  const langInstruction = getLanguageInstruction(language);

  let subjectContext = '';
  if (subject !== 'all' && subject) {
    subjectContext = `specifically for the subject: ${subject}`;
  } else if (examSubjects.length > 0) {
    subjectContext = `covering questions from these subjects: ${examSubjects.slice(0, 8).join(', ')}${examSubjects.length > 8 ? ' and more' : ''}`;
  } else {
    subjectContext = 'covering various subjects including General Knowledge, Reasoning, Mathematics, Hindi, and relevant technical subjects for this exam';
  }

  const prompt = `Generate exactly ${questionCount} multiple choice questions for the ${examName} exam, ${subjectContext}.

${langInstruction}

CRITICAL: You MUST respond with ONLY valid JSON, no other text. No markdown code fences. Just pure JSON.

The JSON format must be exactly:
{
  "questions": [
    {
      "question": "The question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed explanation of why this is correct",
      "subject": "The specific subject category of this question (e.g. Chhattisgarh GK, Mathematics, Reasoning, Hindi, English, General Science)"
    }
  ]
}

Requirements:
- Each question must have exactly 4 options
- correctIndex is 0-based (0 for first option, 3 for last)
- Questions should be at the exact difficulty level of actual ${examName} exams
- Mix different topics and sub-topics across the selected subjects
- Include factual, conceptual, and application-based questions
- The "explanation" field MUST be highly detailed, accurate, and deeply informative. Do not simply restate the correct option. Explain the core concept behind the answer, provide related supplementary facts, and briefly explain why the incorrect options are wrong.
- Make questions exam-relevant and strictly fact-checked
- Distribute questions evenly across the different subjects/topics selected
${mode === 'mock' ? '- Include a mix of easy (30%), medium (50%), and hard (20%) questions' : '- Keep questions at medium difficulty for quick practice'}`;

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [
      { role: 'system', content: `You are an expert question paper setter for ${examName} exam. You generate high-quality MCQs that match the actual exam pattern and difficulty level. Your questions should cover all relevant subjects and topics as specified in the exam syllabus. You ONLY respond with valid JSON, never any other format.` },
      { role: 'user', content: prompt }
    ]
  });

  const text = response.choices[0].message.content.trim();

  let jsonText = text;
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonText);
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

async function parseSyllabus(text) {
  const prompt = `Parse the following syllabus text into a structured JSON format. Extract all subjects and their individual topics.

CRITICAL: Respond with ONLY valid JSON, no other text. No markdown code fences.

The JSON format must be exactly:
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

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [
      { role: 'system', content: 'You are an expert at parsing educational syllabi into structured formats. You ONLY respond with valid JSON.' },
      { role: 'user', content: prompt }
    ]
  });

  const responseText = response.choices[0].message.content.trim();
  let jsonText = responseText;
  const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1].trim();
  }

  return JSON.parse(jsonText);
}

async function translateAndSummarizeNews(title, category, source) {
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

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 2048,
    response_format: { type: "json_object" },
    messages: [
      { role: 'system', content: systemInstruction },
      { role: 'user', content: prompt }
    ]
  });

  return response.choices[0].message.content.trim();
}

async function generateNewsIntelligence(title, description, category, source) {
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
  "keyFacts": [
    "Fact 1 (e.g., The scheme was launched on date X by ministry Y)",
    "Fact 2",
    "Fact 3"
  ],
  "importantDates": [
    "Date 1: Explanation",
    "Date 2: Explanation"
  ],
  "importantPersonalities": [
    "Name 1: Brief context/role",
    "Name 2: Brief context/role"
  ],
  "organizations": [
    "Org 1: Role or connection to news",
    "Org 2: Role or connection to news"
  ],
  "locations": [
    "Location 1: Geographical context or importance to the news"
  ],
  "schemes": [
    "Scheme 1: Core details/provisions",
    "Scheme 2: Core details/provisions"
  ],
  "acts": [
    "Act 1: Core details/provisions",
    "Act 2: Core details/provisions"
  ],
  "constitutionalArticles": [
    "Article X: Brief connection to the news"
  ],
  "staticGkLinks": [
    {
      "subject": "Name of static GK subject (e.g. Chhattisgarh Geography, Indian Polity, Economy, Ancient History, Environment & Ecology)",
      "topic": "Syllabus topic name",
      "connection": "Detailed explanation of how this current news connects to this static GK topic. E.g. linking a tiger census to Wildlife Protection Act 1972 and tiger reserves of Chhattisgarh."
    }
  ],
  "pyqConnection": "Explain how this article relates to past year questions (PYQs). E.g., 'Similar questions about state boundary disputes were asked in CGPSC SSE 2021.'",
  "memoryTricks": "A mnemonic, memory trick, or acronym to help students easily remember key facts, dates, or names from this article.",
  "flashcards": [
    {
      "front": "A clear, direct question or prompt on the front of the card in a bilingual format.",
      "back": "The answer/fact explanation on the back of the card in a bilingual format."
    }
  ],
  "mcqs": [
    {
      "question": "High-quality exam-style multiple choice question based on the article (can be Hindi or English or bilingual). Include 5 questions in total.",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed explanation of why this option is correct, and why others are incorrect, including relevant background facts.",
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

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 4096,
    response_format: { type: "json_object" },
    messages: [
      { role: 'system', content: systemInstruction },
      { role: 'user', content: prompt }
    ]
  });

  return response.choices[0].message.content.trim();
}

module.exports = { chat, chatStream, generateTest, parseSyllabus, translateAndSummarizeNews, generateNewsIntelligence };
