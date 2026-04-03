const Groq = require('groq-sdk');
require('dotenv').config();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const MODEL = 'llama-3.3-70b-versatile';

function getLanguageInstruction(language) {
  const instructions = {
    'hindi': 'Respond entirely in Hindi (Devanagari script). Use Hindi for all explanations, options, and content.',
    'english': 'Respond entirely in English.',
    'mixed': 'Respond in Hinglish - a natural mix of Hindi and English. Use Devanagari for Hindi words and Roman script for English words, as is natural in everyday Indian conversation.'
  };
  return instructions[language] || instructions['english'];
}

function getExamSystemPrompt(examName, language) {
  return `You are an expert Indian government exam preparation tutor. You are currently helping a student prepare for: ${examName}.

${getLanguageInstruction(language)}

Your Guidelines:
- DO NOT use repetitive phrases or generic greetings/intros in every response. Answer the student's query directly and uniquely.
- Provide highly informative, data-rich, and comprehensive exam-focused notes.
- Include distinct insights, structured analysis, and advanced facts to avoid repetitive generic answers.
- When asked to generate MCQs, always provide exactly 4 options (A, B, C, D) and clearly mark the correct answer.
- Reference previous year question patterns, specific trends, and related statistics when relevant.
- Use clear headings (##), bullet points, and bold text for easy reading.
- For current affairs topics, provide the most recent and relevant data, background context, and dates.
- Be encouraging, supportive, and motivating to the student.
- Use mnemonics, diagrams (in markdown), and memory tricks when helpful.
- Connect topics to real-world examples to clarify complex subjects.`;
}

async function chat(message, examName, language, history = []) {
  const messages = [
    { role: 'system', content: getExamSystemPrompt(examName, language) }
  ];

  if (history && history.length > 0) {
    const recentHistory = history.slice(-6);
    for (const h of recentHistory) {
      messages.push({ role: h.role, content: h.content });
    }
  }

  messages.push({ role: 'user', content: message });

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 2000,
    messages: messages
  });

  return response.choices[0].message.content;
}

async function chatStream(message, examName, language, history = []) {
  const messages = [
    { role: 'system', content: getExamSystemPrompt(examName, language) }
  ];

  if (history && history.length > 0) {
    const recentHistory = history.slice(-6);
    for (const h of recentHistory) {
      messages.push({ role: h.role, content: h.content });
    }
  }

  messages.push({ role: 'user', content: message });

  const stream = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 2000,
    messages: messages,
    stream: true
  });

  return stream;
}

async function generateTest(examId, examName, subject, mode, questionCount, language) {
  const langInstruction = getLanguageInstruction(language);

  const prompt = `Generate exactly ${questionCount} multiple choice questions for the ${examName} exam${subject !== 'all' ? `, specifically for the subject: ${subject}` : ', covering various subjects from the syllabus'}.

${langInstruction}

CRITICAL: You MUST respond with ONLY valid JSON, no other text. No markdown code fences. Just pure JSON.

The JSON format must be exactly:
{
  "questions": [
    {
      "question": "The question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed explanation of why this is correct"
    }
  ]
}

Requirements:
- Each question must have exactly 4 options
- correctIndex is 0-based (0 for first option, 3 for last)
- Questions should be at the exact difficulty level of actual ${examName} exams
- Mix different topics and sub-topics within the subject
- Include factual, conceptual, and application-based questions
- The "explanation" field MUST be highly detailed, accurate, and deeply informative. Do not simply restate the correct option. Explain the core concept behind the answer, provide related supplementary facts, and briefly explain why the incorrect options are wrong.
- Make questions exam-relevant and strictly fact-checked
${mode === 'mock' ? '- Include a mix of easy (30%), medium (50%), and hard (20%) questions' : '- Keep questions at medium difficulty for quick practice'}`;

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [
      { role: 'system', content: 'You are an expert question paper setter for Indian government competitive exams. You generate high-quality MCQs that match the actual exam pattern and difficulty level. You ONLY respond with valid JSON, never any other format.' },
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
    for (const q of parsed.questions) {
      if (!q.question || !q.options || q.options.length !== 4 || typeof q.correctIndex !== 'number' || !q.explanation) {
        throw new Error('Invalid question format');
      }
    }
    return parsed;
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

module.exports = { chat, chatStream, generateTest, parseSyllabus };
