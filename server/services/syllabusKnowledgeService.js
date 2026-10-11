const { db } = require('../firebase-admin');

// In-memory cache for syllabus notes to minimize Firestore reads and latency
let notesCache = null;
let notesCacheTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Common Hindi and English stop words to ignore when scoring query relevance
 */
const STOP_WORDS = new Set([
  'क्या', 'है', 'हैं', 'था', 'थी', 'थे', 'का', 'की', 'के', 'में', 'पर', 'से', 'को', 'और', 'या',
  'बताओ', 'बताइए', 'समझाओ', 'नोट्स', 'जानकारी', 'बारे', 'कि', 'कहाँ', 'कब', 'कौन', 'कैसे',
  'is', 'are', 'was', 'were', 'the', 'a', 'an', 'in', 'on', 'at', 'of', 'and', 'or', 'to',
  'what', 'where', 'when', 'who', 'how', 'tell', 'me', 'about', 'explain', 'notes'
]);

/**
 * Clean and tokenize a text into distinctive keywords
 */
function tokenize(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .toLowerCase()
    .replace(/[।,\.\?!:;\(\)\[\]\{\}"'“”\-–—]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length >= 2 && !STOP_WORDS.has(w));
}

/**
 * Loads all topic study notes from Firestore and parses them once into memory
 */
async function loadAllStudyNotes() {
  const now = Date.now();
  if (notesCache && (now - notesCacheTime) < CACHE_TTL_MS) {
    return notesCache;
  }

  try {
    const snap = await db.collection('topic_study_notes').get();
    const parsedList = [];

    snap.forEach(doc => {
      const docData = doc.data() || {};
      let structured = docData.studyNotes;
      if (typeof structured === 'string') {
        try {
          structured = JSON.parse(structured);
        } catch (_) {
          structured = null;
        }
      }

      if (structured && typeof structured === 'object') {
        parsedList.push({
          docId: doc.id,
          examId: docData.examId || '',
          topicId: docData.topicId || '',
          title: structured.title || '',
          titleHi: structured.titleHi || structured.title || '',
          subject: structured.subject || '',
          overview: structured.overview || null,
          chapters: Array.isArray(structured.chapters) ? structured.chapters : [],
          oneLinerRevision: Array.isArray(structured.oneLinerRevision) ? structured.oneLinerRevision : [],
          rapidRevision: Array.isArray(structured.rapidRevision) ? structured.rapidRevision : [],
          confusionBuster: Array.isArray(structured.confusionBuster) ? structured.confusionBuster : []
        });
      }
    });

    notesCache = parsedList;
    notesCacheTime = now;
    return notesCache;
  } catch (err) {
    console.error('[syllabusKnowledgeService] Failed to load topic_study_notes:', err.message);
    return notesCache || [];
  }
}

/**
 * Searches the syllabus notes for content relevant to the student's message
 * and returns a concise, token-optimized context block.
 *
 * @param {string} userMessage - The student's prompt/question
 * @param {string} examName - The target exam name (optional)
 * @returns {Promise<string>} Formatted knowledge context or empty string if no match
 */
async function getRelevantSyllabusKnowledge(userMessage, examName = '') {
  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length < 2) {
    return '';
  }

  const queryTokens = tokenize(userMessage);
  if (queryTokens.length === 0) return '';

  const allNotes = await loadAllStudyNotes();
  if (!allNotes || allNotes.length === 0) return '';

  // 1. Score each study note topic
  const scoredNotes = [];

  for (const note of allNotes) {
    let score = 0;
    const titleTokens = tokenize(note.title + ' ' + note.titleHi);
    const subjectTokens = tokenize(note.subject);

    // Title match has highest weight
    for (const qt of queryTokens) {
      if (titleTokens.some(tt => tt.includes(qt) || qt.includes(tt))) {
        score += 10;
      }
      if (subjectTokens.some(st => st.includes(qt) || qt.includes(st))) {
        score += 4;
      }
    }

    if (score > 0) {
      scoredNotes.push({ note, score });
    }
  }

  // If title/subject didn't match directly, check chapter headings and quick facts
  if (scoredNotes.length === 0) {
    for (const note of allNotes) {
      let score = 0;
      const quickFactsStr = note.overview?.quickFacts ? note.overview.quickFacts.join(' ') : '';
      const chapTitles = note.chapters.map(c => c.chapterTitle || '').join(' ');
      const combinedMeta = (quickFactsStr + ' ' + chapTitles).toLowerCase();

      for (const qt of queryTokens) {
        if (combinedMeta.includes(qt)) {
          score += 3;
        }
      }

      if (score > 0) {
        scoredNotes.push({ note, score });
      }
    }
  }

  if (scoredNotes.length === 0) return '';

  // Sort by highest score first, pick top 1-2 most relevant topics
  scoredNotes.sort((a, b) => b.score - a.score);
  const topNotes = scoredNotes.slice(0, 2);

  // 2. Extract concise, token-optimized excerpt (Max ~2,500 chars to save tokens)
  let contextBlocks = [];
  let totalLength = 0;
  const MAX_CONTEXT_LENGTH = 3000;

  for (const item of topNotes) {
    const n = item.note;
    let block = `### ${n.titleHi || n.title} [विषय: ${n.subject || 'सामान्य अध्ययन'}]\n`;

    // A. Add introduction or quick facts if available
    if (n.overview?.quickFacts && n.overview.quickFacts.length > 0) {
      block += `**प्रमुख प्रमाणित तथ्य:**\n`;
      const relevantFacts = n.overview.quickFacts.slice(0, 5);
      relevantFacts.forEach(fact => {
        const factText = typeof fact === 'object' && fact !== null
          ? `${fact.label ? fact.label + ': ' : ''}${fact.value || ''}`
          : String(fact);
        if (factText.trim()) {
          block += `• ${factText.trim()}\n`;
        }
      });
    } else if (n.overview?.introduction) {
      block += `${n.overview.introduction.substring(0, 300)}\n`;
    }

    // B. Find the most relevant chapter section
    if (n.chapters && n.chapters.length > 0) {
      let bestSection = null;
      let bestSecScore = 0;

      for (const chap of n.chapters) {
        if (Array.isArray(chap.sections)) {
          for (const sec of chap.sections) {
            const secText = (sec.heading + ' ' + sec.content).toLowerCase();
            let secScore = 0;
            for (const qt of queryTokens) {
              if (secText.includes(qt)) secScore++;
            }
            if (secScore > bestSecScore) {
              bestSecScore = secScore;
              bestSection = sec;
            }
          }
        }
      }

      if (bestSection) {
        block += `\n**अध्याय संदर्भ (${bestSection.heading || 'मुख्य विवरण'}):**\n${bestSection.content.substring(0, 600)}\n`;
        if (bestSection.importantFactCard) {
          block += `⭐ **महत्वपूर्ण बिंदु:** ${bestSection.importantFactCard}\n`;
        }
      }
    }

    // C. Add 2-3 relevant one-liner revision points
    if (n.oneLinerRevision && n.oneLinerRevision.length > 0) {
      const matchedOneLiners = [];
      for (const line of n.oneLinerRevision) {
        const lineLower = String(line).toLowerCase();
        if (queryTokens.some(qt => lineLower.includes(qt))) {
          matchedOneLiners.push(line);
          if (matchedOneLiners.length >= 3) break;
        }
      }

      if (matchedOneLiners.length > 0) {
        block += `\n**परीक्षा रिवीजन एक-पंक्ति तथ्य (One-Liners):**\n`;
        matchedOneLiners.forEach(ol => {
          block += `• ${ol}\n`;
        });
      }
    }

    if (totalLength + block.length <= MAX_CONTEXT_LENGTH) {
      contextBlocks.push(block.trim());
      totalLength += block.length;
    } else {
      break;
    }
  }

  if (contextBlocks.length === 0) return '';

  return `\n\n## आधिकारिक सिलेबस नोट्स (Verified Syllabus Knowledge Base):
नीचे छात्र के सवाल से संबंधित CG GURU के आधिकारिक सिलेबस नोट्स से निकाली गई प्रमाणित जानकारी दी गई है।
महत्वपूर्ण निर्देश:
1. **प्राथमिकता (Top Priority):** अपने उत्तर को सबसे पहले और अनिवार्य रूप से नीचे दिए गए आधिकारिक नोट्स और तथ्यों के आधार पर ही दें।
2. **सत्यता (Accuracy):** इन प्रमाणित तथ्यों का उल्लंघन न करें।
3. **संक्षिप्त एवं सटीक:** नोट्स के आधार पर सीधा, परीक्षा-उपयोगी और टू-द-पॉइंट उत्तर दें।

${contextBlocks.join('\n\n---\n\n')}\n`;
}

/**
 * Manually invalidate the in-memory cache when new notes are uploaded/updated
 */
function invalidateNotesCache() {
  notesCache = null;
  notesCacheTime = 0;
}

module.exports = {
  getRelevantSyllabusKnowledge,
  invalidateNotesCache
};
