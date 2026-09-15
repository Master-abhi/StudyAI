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

async function safeFirestoreQuery(key, queryFn, fallbackValue = null, ttlMs = 10 * 60 * 1000) {
  const now = Date.now();

  // 1. Cache-first: Check in-memory cache if still within TTL
  if (memoryCache.has(key)) {
    const entry = memoryCache.get(key);
    if (entry && (now - entry.timestamp < ttlMs)) {
      return entry.data;
    }
  }

  // 2. Check disk cache if still within TTL
  try {
    const filePath = path.join(cacheDir, `${key.replace(/[^a-zA-Z0-9_-]/g, '_')}.json`);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (now - stats.mtimeMs < ttlMs) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        memoryCache.set(key, { data, timestamp: stats.mtimeMs });
        return data;
      }
    }
  } catch (_) {}

  // 3. Cache expired or missing: Execute live query
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

function invalidateCache(keyPattern) {
  try {
    for (const k of memoryCache.keys()) {
      if (!keyPattern || k.includes(keyPattern)) {
        memoryCache.delete(k);
      }
    }
    if (fs.existsSync(cacheDir)) {
      const files = fs.readdirSync(cacheDir);
      files.forEach(file => {
        if (!keyPattern || file.includes(keyPattern)) {
          try {
            fs.unlinkSync(path.join(cacheDir, file));
          } catch (_) {}
        }
      });
    }
  } catch (e) {
    console.warn('[Cache Invalidation Warning]:', e.message);
  }
}

module.exports = {
  saveCache,
  loadCache,
  safeFirestoreQuery,
  invalidateCache
};
