const axios = require('axios');
const cheerio = require('cheerio');
const Parser = require('rss-parser');
const crypto = require('crypto');
const Groq = require('groq-sdk');
const https = require('https');
const { db, admin } = require('../firebase-admin');
const ai = require('./aiManager');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5'
};

const parser = new Parser({
  headers: HEADERS
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Feeds to aggregate
const NEWS_FEEDS = [
  // National Hindi News
  { name: 'Dainik Bhaskar', url: 'https://www.bhaskar.com/rss-feed/1061/', category: 'general', lang: 'hi' },
  { name: 'Amar Ujala', url: 'https://www.amarujala.com/rss/breaking-news.xml', category: 'general', lang: 'hi' },
  { name: 'Patrika', url: 'https://api.patrika.com/rss/india-news', category: 'general', lang: 'hi' },
  { name: 'NDTV Hindi', url: 'https://feeds.feedburner.com/ndtvkhabar-latest', category: 'general', lang: 'hi' },
  { name: 'Navbharat Times (Google News Search)', url: 'https://news.google.com/rss/search?q=site:navbharattimes.indiatimes.com&hl=hi&gl=IN&ceid=IN:hi', category: 'general', lang: 'hi' },
  { name: 'BBC Hindi', url: 'https://feeds.bbci.co.uk/hindi/rss.xml', category: 'general', lang: 'hi' },

  // Chhattisgarh Specific
  { name: 'realtimes.in', url: 'https://realtimes.in/?feed=rss2', category: 'chhattisgarh', lang: 'hi' },
  { name: 'Haribhoomi (Google News Search)', url: 'https://news.google.com/rss/search?q=site:haribhoomi.com+chhattisgarh&hl=hi&gl=IN&ceid=IN:hi', category: 'chhattisgarh', lang: 'hi' },
  { name: 'Nava Bharat CG (Google News Search)', url: 'https://news.google.com/rss/search?q=site:navabharat.net+chhattisgarh&hl=hi&gl=IN&ceid=IN:hi', category: 'chhattisgarh', lang: 'hi' },
  { name: 'Google News CG', url: 'https://news.google.com/rss/search?q=chhattisgarh&hl=hi&gl=IN&ceid=IN:hi', category: 'chhattisgarh', lang: 'hi' },

  // Polity & Governance
  { name: 'PIB English', url: 'https://pib.gov.in/rss.aspx', category: 'polity', lang: 'en' },
  { name: 'PIB Hindi', url: 'https://pib.gov.in/rss.aspx?reg=3&lang=2', category: 'polity', lang: 'hi' },
  { name: 'PRS India Bills (Google News Search)', url: 'https://news.google.com/rss/search?q=site:prsindia.org&hl=en-IN&gl=IN&ceid=IN:en', category: 'polity', lang: 'en' },
  { name: 'The Hindu', url: 'https://www.thehindu.com/news/national/feeder/default.rss', category: 'polity', lang: 'en' },

  // Science & Tech
  { name: 'BBC Science', url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml', category: 'science', lang: 'en' },
  { name: 'ScienceDaily', url: 'https://www.sciencedaily.com/rss/all.xml', category: 'science', lang: 'en' },
  { name: 'NASA', url: 'https://www.nasa.gov/news-release/feed/', category: 'science', lang: 'en' },
  { name: 'ISRO (Google News)', url: 'https://news.google.com/rss/search?q=ISRO+space+mission&hl=hi&gl=IN&ceid=IN:hi', category: 'science', lang: 'hi' },

  // Sports
  { name: 'The Hindu Sports', url: 'https://www.thehindu.com/sport/feeder/default.rss', category: 'sports', lang: 'en' }
];

const RELEVANT_KEYWORDS = [
  'yojana', 'scheme', 'budget', 'gdp', 'rbi', 'bank', 'policy', 'bill', 'act', 'parliament',
  'supreme court', 'high court', 'isro', 'nasa', 'space', 'satellite', 'missile', 'appointment',
  'award', 'nobel', 'padma', 'census', 'commission', 'committee', 'summit', 'g20', 'un ', 'who',
  'tribal', 'chhattisgarh', 'cgpsc', 'vyapam', 'upsc', 'ssc', 'rrb', 'ibps', 'recruitment', 'vacancy',
  'notification', 'exam', 'tiger', 'wildlife', 'forest', 'national park', 'sanctuary', 'sports',
  'olympics', 'world cup', 'medal', 'trophy', 'championship', 'appointed', 'launch', 'treaty',
  'agreement', 'minister', 'government', 'chief minister', 'pm ', 'cm ', 'polity',
  'constitution', 'economic', 'inflation', 'drdo', 'pollution', 'climate'
];

const HINDI_KEYWORDS = [
  'योजना', 'बजट', 'नीति', 'विधेयक', 'अधिनियम', 'संसद', 'सुप्रीम कोर्ट', 'हाई कोर्ट',
  'इसरो', 'अंतरिक्ष', 'उपग्रह', 'मिसाइल', 'नियुक्ति', 'पुरस्कार', 'नोबेल', 'पद्म',
  'जनगणना', 'आयोग', 'समिति', 'शिखर सम्मेलन', 'जी20', 'संयुक्त राष्ट्र', 'जनजाति',
  'छत्तीसगढ़', 'सीजीपीएससी', 'व्यापम', 'भर्ती', 'परीक्षा', 'अधिसूचना', 'वन्यजीव',
  'अभयारण्य', 'राष्ट्रीय उद्यान', 'खेल', 'ओलंपिक', 'पदक', 'मुख्यमंत्री', 'प्रधानमंत्री',
  'सरकार', 'संविधान', 'अर्थव्यवस्था', 'महंगाई', 'पर्यावरण'
];

/**
 * Basic keyword pre-filtering to minimize Groq API calls.
 */
function preFilterArticle(title, description) {
  const text = `${title} ${description || ''}`.toLowerCase();
  return RELEVANT_KEYWORDS.some(kw => text.includes(kw)) || 
         HINDI_KEYWORDS.some(kw => text.includes(kw));
}

/**
 * Groq LLM filter to determine relevance.
 */
async function checkRelevanceWithGroq(title, description) {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are an expert exam prep mentor for Indian competitive exams (like UPSC, SSC, CGPSC, CG Vyapam, State Police, Patwari). 
Your task is to analyze the title and description of a news article and determine if it is highly relevant for current affairs GK questions in these exams.
Examples of relevant topics:
- National/State policies, bills, acts, schemes, budgets, economy, banking.
- Science & tech developments, space missions, environment, wildlife, climate.
- Sports milestones, major awards, constitutional issues, international summits/agreements.
- Chhattisgarh specific achievements, news, appointments, and administration.
Examples of irrelevant topics:
- Local crimes, local accidents, political arguments, promotional news, weather updates, minor local events.
- Celebrity gossip, movies, regular stock market fluctuations.

Respond with exactly 'YES' or 'NO' and nothing else.`
        },
        {
          role: 'user',
          content: `Title: ${title}\nDescription: ${description || ''}`
        }
      ],
      max_tokens: 5,
      temperature: 0.1
    });

    const answer = response.choices[0].message.content.trim().toUpperCase();
    return answer.includes('YES');
  } catch (err) {
    console.error(`[News Groq Filter Error] Failed checking: "${title}":`, err.message);
    return false;
  }
}

/**
 * Detect correct category tags.
 */
function tagCategory(title, description, sourceCategory) {
  const text = `${title} ${description || ''}`.toLowerCase();
  
  if (text.includes('chhattisgarh') || text.includes('cgpsc') || text.includes('vyapam') || sourceCategory === 'chhattisgarh') {
    return 'chhattisgarh';
  }
  if (text.includes('polity') || text.includes('constitution') || text.includes('bill') || text.includes('parliament') || text.includes('supreme court') || text.includes('high court') || text.includes('governance') || sourceCategory === 'polity') {
    return 'polity';
  }
  if (text.includes('science') || text.includes('technology') || text.includes('space') || text.includes('isro') || text.includes('nasa') || text.includes('satellite') || text.includes('missile') || text.includes('drdo') || sourceCategory === 'science') {
    return 'science';
  }
  if (text.includes('sport') || text.includes('cricket') || text.includes('olympics') || text.includes('medal') || text.includes('trophy') || text.includes('championship') || sourceCategory === 'sports') {
    return 'sports';
  }
  if (text.includes('economy') || text.includes('budget') || text.includes('gdp') || text.includes('inflation') || text.includes('rbi') || text.includes('bank') || sourceCategory === 'economy') {
    return 'economy';
  }
  if (text.includes('environment') || text.includes('wildlife') || text.includes('forest') || text.includes('sanctuary') || text.includes('tiger') || text.includes('pollution') || text.includes('climate') || sourceCategory === 'environment') {
    return 'environment';
  }
  if (text.includes('international') || text.includes('g20') || text.includes('summit') || text.includes('treaty') || text.includes('un ') || text.includes('who') || sourceCategory === 'international') {
    return 'international';
  }
  if (text.includes('award') || text.includes('nobel') || text.includes('padma') || sourceCategory === 'awards') {
    return 'awards';
  }
  return 'general';
}

// Fetch JSON APIs
async function fetchNewsDataIO() {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey || apiKey === 'your-api-key-here') return [];
  try {
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=hi`;
    const res = await axios.get(url, { headers: HEADERS, timeout: 10000, httpsAgent });
    if (res.data && Array.isArray(res.data.results)) {
      return res.data.results.map(item => ({
        title: item.title,
        description: item.description || '',
        url: item.link,
        date: item.pubDate ? item.pubDate.split(' ')[0] : new Date().toISOString().split('T')[0],
        source: item.source_id || 'NewsData.io',
        category: 'general',
        lang: 'hi'
      }));
    }
  } catch (err) {
    console.error('NewsData.io fetch failed:', err.message);
  }
  return [];
}

async function fetchGNews() {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey || apiKey === 'your-api-key-here') return [];
  try {
    const url = `https://gnews.io/api/v4/top-headlines?country=in&lang=hi&token=${apiKey}`;
    const res = await axios.get(url, { headers: HEADERS, timeout: 10000, httpsAgent });
    if (res.data && Array.isArray(res.data.articles)) {
      return res.data.articles.map(item => ({
        title: item.title,
        description: item.description || '',
        url: item.url,
        date: item.publishedAt ? item.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
        source: item.source ? item.source.name : 'GNews',
        category: 'general',
        lang: 'hi'
      }));
    }
  } catch (err) {
    console.error('GNews fetch failed:', err.message);
  }
  return [];
}

async function fetchMediaStack() {
  const apiKey = process.env.MEDIASTACK_API_KEY;
  if (!apiKey || apiKey === 'your-api-key-here') return [];
  try {
    const url = `http://api.mediastack.com/v1/news?countries=in&languages=hi&access_key=${apiKey}`;
    const res = await axios.get(url, { headers: HEADERS, timeout: 10000, httpsAgent });
    if (res.data && Array.isArray(res.data.data)) {
      return res.data.data.map(item => ({
        title: item.title,
        description: item.description || '',
        url: item.url,
        date: item.publishedAt ? item.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
        source: item.source || 'MediaStack',
        category: 'general',
        lang: 'hi'
      }));
    }
  } catch (err) {
    console.error('MediaStack fetch failed:', err.message);
  }
  return [];
}

async function fetchRSSFeed(feed) {
  try {
    const parsed = await parser.parseURL(feed.url);
    const items = parsed.items.slice(0, 10);
    return items.map(item => ({
      title: item.title || '',
      description: item.contentSnippet || item.content || '',
      url: item.link || '',
      date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      source: feed.name,
      category: feed.category,
      lang: feed.lang
    }));
  } catch (err) {
    console.log(`Failed to fetch RSS feed "${feed.name}" (${feed.url}):`, err.message);
    return [];
  }
}

async function scrapeAllNews() {
  console.log('[NewsScraper] Starting aggregated news fetch...');

  // 1. Fetch from all sources in parallel
  const fetches = [
    fetchNewsDataIO(),
    fetchGNews(),
    fetchMediaStack(),
    ...NEWS_FEEDS.map(feed => fetchRSSFeed(feed))
  ];

  const results = await Promise.allSettled(fetches);
  let allArticles = [];

  results.forEach(res => {
    if (res.status === 'fulfilled') {
      allArticles.push(...res.value);
    }
  });

  console.log(`[NewsScraper] Scraped ${allArticles.length} total raw articles.`);

  // 2. Deduplicate
  const seen = new Set();
  let uniqueArticles = allArticles.filter(art => {
    const key = (art.url || art.title).toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`[NewsScraper] ${uniqueArticles.length} articles remain after deduplication.`);

  // 3. Pre-filter by keywords
  const preFiltered = uniqueArticles.filter(art => preFilterArticle(art.title, art.description));
  console.log(`[NewsScraper] ${preFiltered.length} articles passed keyword pre-filtering.`);

  // 4. Groq Relevance check (Limit to max 25 checks to avoid rate limits & function timeout)
  const relevanceCheckBatch = preFiltered.slice(0, 25);
  const checkedArticles = [];

  for (const art of relevanceCheckBatch) {
    const isRelevant = await checkRelevanceWithGroq(art.title, art.description);
    if (isRelevant) {
      checkedArticles.push(art);
    }
  }

  console.log(`[NewsScraper] Groq confirmed ${checkedArticles.length} relevant articles.`);

  // 5. Enrich / Translate & Summarize (Limit to max 8 enrichments per scrape to stay well under Vercel timeout limits)
  const enrichLimit = 8;
  const articlesToEnrich = checkedArticles.slice(0, enrichLimit);
  const relevantEnriched = [];

  for (const art of articlesToEnrich) {
    let category = 'general';
    let summaryEn = art.description || '';
    try {
      category = tagCategory(art.title, art.description, art.category);
      const aiResult = await ai.translateAndSummarizeNews(art.title, category, art.source);
      summaryEn = aiResult.summary_en || art.description || '';
      
      relevantEnriched.push({
        ...art,
        category,
        title_hi: aiResult.title_hi || art.title,
        description: summaryEn,
        description_hi: aiResult.summary_hi || art.description,
        summary: summaryEn,
        summary_hi: aiResult.summary_hi || art.description,
        examRelevance: true,
        icon: category === 'chhattisgarh' ? '🏔️' : '📰'
      });
    } catch (err) {
      console.error(`[NewsScraper] Enrichment failed for "${art.title}":`, err.message);
      // Fallback without translation
      category = tagCategory(art.title, art.description, art.category);
      relevantEnriched.push({
        ...art,
        category,
        title_hi: art.title,
        description_hi: art.description,
        summary: art.description,
        summary_hi: art.description,
        examRelevance: true,
        icon: category === 'chhattisgarh' ? '🏔️' : '📰'
      });
    }

    // Pre-generate AI news intelligence and save to database
    try {
      console.log(`[NewsScraper] Pre-generating AI news intelligence for: ${art.title}`);
      const intel = await ai.generateNewsIntelligence(art.title, summaryEn, category, art.source);
      
      const intelDocId = crypto.createHash('md5').update(art.title).digest('hex');
      const intelDocRef = db.collection('news_intelligence').doc(intelDocId);
      
      const fullIntel = {
        ...intel,
        title: art.title,
        description: summaryEn,
        source: art.source || 'Google News',
        category: category || 'general',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      await intelDocRef.set(fullIntel);
      console.log(`[NewsScraper] Successfully pre-generated news intelligence for: ${art.title}`);
    } catch (intelErr) {
      console.error(`[NewsScraper] Intelligence pre-generation failed for "${art.title}":`, intelErr.message);
    }
  }

  // 6. Save relevant articles to Firestore individual docs
  const batch = db.batch();
  relevantEnriched.forEach(art => {
    const docId = crypto.createHash('md5').update(art.url || art.title).digest('hex');
    const docRef = db.collection('news_articles').doc(docId);
    
    batch.set(docRef, {
      title: art.title,
      title_hi: art.title_hi,
      description: art.description,
      description_hi: art.description_hi,
      summary: art.summary,
      summary_hi: art.summary_hi,
      source: art.source,
      category: art.category,
      pubDate: art.date,
      url: art.url,
      examRelevance: true,
      icon: art.icon,
      lang: art.lang,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  });

  if (relevantEnriched.length > 0) {
    await batch.commit();
    console.log(`[NewsScraper] Saved ${relevantEnriched.length} new articles to Firestore news_articles collection.`);
  }

  // 7. Regenerate final compiled cache
  const snap = await db.collection('news_articles').limit(150).get();
  let allStored = snap.docs.map(doc => doc.data());

  // Sort in memory by date descending, then by createdAt
  allStored.sort((a, b) => {
    const dateA = a.pubDate || '';
    const dateB = b.pubDate || '';
    if (dateA !== dateB) {
      return dateB.localeCompare(dateA);
    }
    const createA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime()) : 0;
    const createB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime()) : 0;
    return createB - createA;
  });

  const cacheArticles = allStored.slice(0, 50);

  const cacheData = {
    lastUpdated: new Date().toISOString(),
    articles: cacheArticles
  };

  await db.collection('news').doc('cache').set(cacheData);
  console.log('[NewsScraper] Cached compilation successfully written to news/cache.');

  return cacheData;
}

module.exports = {
  scrapeAllNews
};
