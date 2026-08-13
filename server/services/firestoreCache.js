const fs = require('fs');
const path = require('path');

const cacheDir = path.join(__dirname, '..', 'data_cache');
if (!fs.existsSync(cacheDir)) {
  try {
    fs.mkdirSync(cacheDir, { recursive: true });
  } catch (e) {
    console.warn('[Cache Dir Init Error]:', e.message);
  }
}

const memoryCache = new Map();

function saveCache(key, data) {
  try {
    memoryCache.set(key, { data, timestamp: Date.now() });
    const filePath = path.join(cacheDir, `${key.replace(/[^a-zA-Z0-9_-]/g, '_')}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn(`[Disk Cache Save Warning (${key})]:`, e.message);
  }
}

function loadCache(key, fallbackValue = null) {
  if (memoryCache.has(key)) {
    return memoryCache.get(key).data;
  }
  try {
    const filePath = path.join(cacheDir, `${key.replace(/[^a-zA-Z0-9_-]/g, '_')}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      memoryCache.set(key, { data, timestamp: Date.now() });
      return data;
    }
  } catch (e) {
    console.warn(`[Disk Cache Read Warning (${key})]:`, e.message);
  }
  return fallbackValue;
}

async function safeFirestoreQuery(key, queryFn, fallbackValue = null) {
  try {
    const result = await queryFn();
    if (result !== undefined && result !== null) {
      saveCache(key, result);
    }
    return result;
  } catch (err) {
    const isQuotaError = err.message && (err.message.includes('RESOURCE_EXHAUSTED') || err.message.includes('Quota exceeded') || err.code === 8);
    if (isQuotaError) {
      console.warn(`[Firestore Quota Shield] Quota exceeded for "${key}". Serving cached fallback.`);
    } else {
      console.warn(`[Firestore Safe Query Error (${key})]:`, err.message);
    }
    const cached = loadCache(key, fallbackValue);
    if (cached !== null) {
      return cached;
    }
    return fallbackValue;
  }
}

module.exports = {
  saveCache,
  loadCache,
  safeFirestoreQuery
};
