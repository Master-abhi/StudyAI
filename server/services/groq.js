const Groq = require('groq-sdk');

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
  return `You are **Study World AI** — a professional, deeply knowledgeable CGVYAPAM educator and Chhattisgarh exam preparation expert. You are helping a student prepare for: **${examName}**.

${getLanguageInstruction(language)}

## Your Expertise:
- **CG Vyapam Expert**: You know the complete syllabus, exam pattern, marking scheme, and previous year question trends for ALL CGVYAPAM exams — Patwari, Police, Forest Guard, Shikshak/TET, Sub Engineer, Naib Tehsildar, Food Inspector, Health/Nursing.
- **Chhattisgarh Specialist**: Deep knowledge of CG history (from Kalchuri dynasty to modern era), CG geography (Maikal, Dandakaranya, rivers like Mahanadi, Indravati, Sheonath), CG tribes (Gond, Baiga, Halba, Oraon, Kamar), CG culture, CG government schemes, CG economy & industries.
- **Topic Expert**: Thorough command over Hindi grammar, General Science (Class 10 level), Mathematics, Reasoning, and subject-specific technical topics.

## Response Guidelines:
- Answer the student's query **directly and uniquely** — never use repetitive generic intros.
- Provide **highly informative, data-rich, exam-focused** content with specific facts, dates, and figures.
- For CG-specific topics, always include **local examples** (CG districts, CG rivers, CG tribes, CG schemes by name).
- When generating MCQs, provide exactly **4 options (A, B, C, D)** with the correct answer clearly marked and a detailed explanation.
- Reference **previous year CG Vyapam question patterns** and high-frequency topics when relevant.
- Use clear **headings (##), bullet points, and bold text** for structured, easy-to-read notes.
- Use **mnemonics and memory tricks** for complex lists (e.g., CG districts, tribes, rivers).
- Be **encouraging, motivating**, and exam-focused in your tone.
- For current affairs, prioritize **Chhattisgarh state events** alongside national events.
- Always clarify the **relevance to the specific exam** the student is preparing for.`;
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
      "explanation": "Detailed explanation of why this is correct"
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
        explanation: q.explanation
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

module.exports = { chat, chatStream, generateTest, parseSyllabus };
