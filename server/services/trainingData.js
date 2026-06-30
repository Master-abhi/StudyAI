const { db } = require('../firebase-admin');

// Cache training data for 5 minutes to avoid hitting Firestore on every chat
let trainingDataCache = null;
let trainingDataCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getTrainingData() {
  const now = Date.now();
  if (trainingDataCache && (now - trainingDataCacheTime) < CACHE_TTL) {
    return trainingDataCache;
  }
  try {
    const snapshot = await db.collection('training_data').get();
    trainingDataCache = snapshot.docs.map(doc => doc.data());
    trainingDataCacheTime = now;
    return trainingDataCache;
  } catch (err) {
    console.error('[TrainingData] Failed to fetch training data:', err.message);
    return [];
  }
}

function getRelevantTrainingData(message, allData) {
  if (!allData || allData.length === 0) return '';

  const msgLower = message.toLowerCase();

  // Score each entry by keyword relevance
  const scored = allData.map(entry => {
    let score = 0;
    const topicWords = (entry.topic || '').toLowerCase().split(/\s+/);
    const subjectWords = (entry.subject || '').toLowerCase().split(/\s+/);

    for (const word of topicWords) {
      if (word.length > 2 && msgLower.includes(word)) score += 3;
    }
    for (const word of subjectWords) {
      if (word.length > 2 && msgLower.includes(word)) score += 2;
    }

    // Also check if the content has relevant keywords
    const contentWords = (entry.content || '').toLowerCase().substring(0, 500).split(/\s+/);
    const msgWords = msgLower.split(/\s+/).filter(w => w.length > 3);
    for (const mw of msgWords) {
      if (contentWords.some(cw => cw.includes(mw))) score += 1;
    }

    return { ...entry, score };
  }).filter(e => e.score > 0);

  // Sort by score descending, take top 5
  scored.sort((a, b) => b.score - a.score);
  const topEntries = scored.slice(0, 5);

  if (topEntries.length === 0) return '';

  let result = '\n\n## Reference Knowledge Base (from verified textbooks):\nUse the following verified reference data to enhance your response accuracy. This data is extracted from standard textbooks and official sources. Prioritize this data over your general knowledge when answering.\n\n';

  let totalChars = 0;
  const MAX_CHARS = 8000;

  for (const entry of topEntries) {
    const block = `### ${entry.subject} — ${entry.topic}${entry.source ? ` (Source: ${entry.source})` : ''}\n${entry.content}\n\n`;
    if (totalChars + block.length > MAX_CHARS) {
      // Add truncated version
      const remaining = MAX_CHARS - totalChars;
      if (remaining > 200) {
        result += block.substring(0, remaining) + '...';
      }
      break;
    }
    result += block;
    totalChars += block.length;
  }

  return result;
}

// Invalidate cache when training data is modified (called from admin routes)
function invalidateTrainingDataCache() {
  trainingDataCache = null;
  trainingDataCacheTime = 0;
}

module.exports = { getTrainingData, getRelevantTrainingData, invalidateTrainingDataCache };
