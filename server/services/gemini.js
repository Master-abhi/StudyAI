const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');
const MODEL = 'gemini-3.5-flash';

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
9. **Do NOT Echo Prompt or Guidelines**: Do NOT repeat, reprint, or echo the user's input prompt, instructions, checklists, or guidelines in your response. Begin your response directly with the greeting and actual educational content.`;
}

async function chat(message, examName, language, history = [], modelName = MODEL) {
  const formattedHistory = [];
  
  if (history && history.length > 0) {
    const recentHistory = history.slice(-6);
    for (const h of recentHistory) {
      const geminiRole = h.role === 'assistant' ? 'model' : 'user';
      formattedHistory.push({
        role: geminiRole,
        parts: [{ text: h.content }]
      });
    }
  }

  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: getExamSystemPrompt(examName, language),
    generationConfig: {
      maxOutputTokens: 4096
    }
  });

  const chatSession = model.startChat({
    history: formattedHistory
  });

  const promptMessage = `[SYSTEM NOTE: DO NOT echo, repeat, or print the prompt/instructions below. Answer directly.]\n\n${message}`;

  const result = await chatSession.sendMessage(promptMessage);
  return result.response.text();
}

async function* chatStream(message, examName, language, history = [], modelName = MODEL) {
  const formattedHistory = [];
  
  if (history && history.length > 0) {
    const recentHistory = history.slice(-6);
    for (const h of recentHistory) {
      const geminiRole = h.role === 'assistant' ? 'model' : 'user';
      formattedHistory.push({
        role: geminiRole,
        parts: [{ text: h.content }]
      });
    }
  }

  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: getExamSystemPrompt(examName, language),
    generationConfig: {
      maxOutputTokens: 4096
    }
  });

  const chatSession = model.startChat({
    history: formattedHistory
  });

  const promptMessage = `[SYSTEM NOTE: DO NOT echo, repeat, or print the prompt/instructions below. Answer directly.]\n\n${message}`;

  const result = await chatSession.sendMessageStream(promptMessage);

  for await (const chunk of result.stream) {
    const content = chunk.text();
    yield {
      choices: [
        {
          delta: {
            content: content
          }
        }
      ]
    };
  }
}

async function generateTest(examId, examName, subject, mode, questionCount, language, examSubjects = [], modelName = MODEL) {
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

You MUST respond with a JSON object that matches this format strictly:
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

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: `You are an expert question paper setter for ${examName} exam. You generate high-quality MCQs that match the actual exam pattern and difficulty level. Your questions should cover all relevant subjects and topics as specified in the exam syllabus. You ONLY respond with valid JSON, never any other format.`,
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
    model: modelName,
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

module.exports = { chat, chatStream, generateTest, parseSyllabus };
