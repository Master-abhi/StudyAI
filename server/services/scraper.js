const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '..', 'cache', 'news-cache.json');
const CACHE_DIR = path.join(__dirname, '..', 'cache');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5'
};

async function scrapeSarkariResult() {
  const articles = [];
  try {
    const { data } = await axios.get('https://www.sarkariresult.com/', {
      headers: HEADERS,
      timeout: 15000
    });
    const $ = cheerio.load(data);

    $('#post .post-box a, .job_listing a').each((i, el) => {
      if (i >= 15) return false;
      const title = $(el).text().trim();
      const url = $(el).attr('href') || '';
      if (title && title.length > 10) {
        articles.push({
          title: title,
          description: `Latest update from Sarkari Result: ${title}`,
          category: title.toLowerCase().includes('admit') ? 'exams' :
                    title.toLowerCase().includes('result') ? 'exams' : 'jobs',
          date: new Date().toISOString().split('T')[0],
          source: 'Sarkari Result',
          url: url.startsWith('http') ? url : `https://www.sarkariresult.com${url}`,
          icon: '📋',
          lang: 'en'
        });
      }
    });
  } catch (err) {
    console.error('Sarkari Result scraping failed:', err.message);
  }
  return articles;
}

async function scrapeExamNewsRSS() {
  const articles = [];
  const queries = [
    'UPSC+exam+2025',
    'SSC+CGL+recruitment',
    'railway+recruitment+2025',
    'sarkari+naukri+government+job',
    'CGPSC+exam+Chhattisgarh'
  ];

  for (const query of queries) {
    try {
      const { data } = await axios.get(
        `https://news.google.com/rss/search?q=${query}&hl=en-IN&gl=IN&ceid=IN:en`,
        { headers: HEADERS, timeout: 10000 }
      );
      const $ = cheerio.load(data, { xmlMode: true });

      $('item').each((i, el) => {
        if (i >= 5) return false;
        const title = $(el).find('title').text().trim();
        const link = $(el).find('link').text().trim();
        const pubDate = $(el).find('pubDate').text().trim();
        const source = $(el).find('source').text().trim();

        if (title) {
          let category = 'exams';
          const titleLower = title.toLowerCase();
          if (titleLower.includes('recruitment') || titleLower.includes('vacancy') || titleLower.includes('naukri') || titleLower.includes('bharti') || titleLower.includes('apply')) {
            category = 'jobs';
          }

          articles.push({
            title: title,
            description: `Source: ${source || 'Google News'}`,
            category: category,
            date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            source: source || 'Google News',
            url: link,
            icon: category === 'jobs' ? '💼' : '📝',
            lang: 'en'
          });
        }
      });
    } catch (err) {
      console.error(`Exam News RSS scraping failed for "${query}":`, err.message);
    }
  }
  return articles;
}

async function scrapeGeneralNewsRSS() {
  const articles = [];
  const queries = [
    { q: 'India+news+today', icon: '🇮🇳', tag: 'National' },
    { q: 'international+world+news', icon: '🌍', tag: 'International' },
    { q: 'India+sports+cricket+news', icon: '🏏', tag: 'Sports' },
    { q: 'science+technology+India+news', icon: '🔬', tag: 'Science & Tech' },
    { q: 'India+economy+business+news', icon: '📈', tag: 'Economy' },
    { q: 'India+government+policy+scheme', icon: '🏛️', tag: 'Government' }
  ];

  for (const { q, icon, tag } of queries) {
    try {
      const { data } = await axios.get(
        `https://news.google.com/rss/search?q=${q}&hl=en-IN&gl=IN&ceid=IN:en`,
        { headers: HEADERS, timeout: 10000 }
      );
      const $ = cheerio.load(data, { xmlMode: true });

      $('item').each((i, el) => {
        if (i >= 4) return false;
        const title = $(el).find('title').text().trim();
        const link = $(el).find('link').text().trim();
        const pubDate = $(el).find('pubDate').text().trim();
        const source = $(el).find('source').text().trim();

        if (title) {
          // Skip if this is actually an exam/job article
          const titleLower = title.toLowerCase();
          if (titleLower.includes('recruitment') || titleLower.includes('vacancy') ||
              titleLower.includes('sarkari naukri') || titleLower.includes('admit card') ||
              titleLower.includes('answer key') || titleLower.includes('cut off')) {
            return;
          }

          articles.push({
            title: title,
            description: `${tag} • Source: ${source || 'Google News'}`,
            category: 'affairs',
            date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            source: source || 'Google News',
            url: link,
            icon: icon,
            lang: 'en'
          });
        }
      });
    } catch (err) {
      console.error(`General News RSS scraping failed for "${q}":`, err.message);
    }
  }
  return articles;
}

async function scrapeHindiNewsRSS() {
  const articles = [];
  const queries = [
    { q: 'भारत+ताजा+समाचार', icon: '🇮🇳', tag: 'राष्ट्रीय', category: 'affairs' },
    { q: 'अंतरराष्ट्रीय+समाचार+विश्व', icon: '🌍', tag: 'अंतरराष्ट्रीय', category: 'affairs' },
    { q: 'खेल+क्रिकेट+भारत', icon: '🏏', tag: 'खेल', category: 'affairs' },
    { q: 'विज्ञान+तकनीक+भारत', icon: '🔬', tag: 'विज्ञान', category: 'affairs' },
    { q: 'सरकारी+नौकरी+भर्ती', icon: '💼', tag: 'नौकरी', category: 'jobs' },
    { q: 'UPSC+SSC+परीक्षा+नोटिफिकेशन', icon: '📝', tag: 'परीक्षा', category: 'exams' },
    { q: 'अर्थव्यवस्था+बजट+भारत', icon: '📈', tag: 'अर्थव्यवस्था', category: 'affairs' }
  ];

  for (const { q, icon, tag, category } of queries) {
    try {
      const { data } = await axios.get(
        `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=hi-IN&gl=IN&ceid=IN:hi`,
        { headers: HEADERS, timeout: 10000 }
      );
      const $ = cheerio.load(data, { xmlMode: true });

      $('item').each((i, el) => {
        if (i >= 3) return false;
        const title = $(el).find('title').text().trim();
        const link = $(el).find('link').text().trim();
        const pubDate = $(el).find('pubDate').text().trim();
        const source = $(el).find('source').text().trim();

        if (title) {
          articles.push({
            title: title,
            description: `${tag} • स्रोत: ${source || 'Google समाचार'}`,
            category: category,
            date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            source: source || 'Google समाचार',
            url: link,
            icon: icon,
            lang: 'hi'
          });
        }
      });
    } catch (err) {
      console.error(`Hindi News RSS scraping failed for "${q}":`, err.message);
    }
  }
  return articles;
}

async function scrapeEmploymentNews() {
  const articles = [];
  try {
    const { data } = await axios.get('https://www.ncs.gov.in/', {
      headers: HEADERS,
      timeout: 15000
    });
    const $ = cheerio.load(data);

    // Generic navigation links to exclude
    const genericPhrases = [
      'find domestic', 'find international', 'find skill', 'find job',
      'participate in', 'links to govt', 'jobs for differently',
      'login', 'register', 'sign up', 'contact', 'about us',
      'skill provider', 'job fairs', 'health sector',
      'career centre', 'help', 'faq', 'update your', 'update/',
      'create video', 'emigrate portal', 'video profile',
      'know your', 'grievance', 'apprenticeship', 'download app',
      'click here'
    ];

    $('a[href*="job"], .job-item, .vacancy-item').each((i, el) => {
      if (i >= 20) return false;
      const title = $(el).text().trim();
      const url = $(el).attr('href') || '';
      if (title && title.length > 10 && title.length < 200) {
        // Skip generic navigation links
        const titleLower = title.toLowerCase();
        const isGeneric = genericPhrases.some(phrase => titleLower.includes(phrase));
        if (isGeneric) return;

        articles.push({
          title: title,
          description: 'Government vacancy notification from NCS Portal',
          category: 'jobs',
          date: new Date().toISOString().split('T')[0],
          source: 'NCS Portal',
          url: url.startsWith('http') ? url : `https://www.ncs.gov.in${url}`,
          icon: '🏢',
          lang: 'en'
        });
      }
    });
  } catch (err) {
    console.error('NCS Portal scraping failed:', err.message);
  }
  return articles;
}

function getFallbackNews() {
  return [
      title: 'Supreme Court Landmark Ruling on Right to Privacy',
      description: 'National • The Supreme Court expanded the scope of fundamental right to privacy in a landmark judgment.',
      category: 'affairs',
      date: new Date().toISOString().split('T')[0],
      source: 'National News',
      url: '#',
      icon: '⚖️'
    }
  ];
}

function deduplicateArticles(articles) {
  const seen = new Set();
  return articles.filter(article => {
    const key = article.title.toLowerCase().substring(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function scrapeAll() {
  console.log('[Scraper] Starting news scrape...');

  const [sarkari, examNews, generalNews, hindiNews, employment] = await Promise.allSettled([
    scrapeSarkariResult(),
    scrapeExamNewsRSS(),
    scrapeGeneralNewsRSS(),
    scrapeHindiNewsRSS(),
    scrapeEmploymentNews()
  ]);

  let allArticles = [];

  if (sarkari.status === 'fulfilled') allArticles.push(...sarkari.value);
  if (examNews.status === 'fulfilled') allArticles.push(...examNews.value);
  if (generalNews.status === 'fulfilled') allArticles.push(...generalNews.value);
  if (hindiNews.status === 'fulfilled') allArticles.push(...hindiNews.value);
  if (employment.status === 'fulfilled') allArticles.push(...employment.value);

  if (allArticles.length < 5) {
    console.log('[Scraper] Too few articles scraped, adding fallback data');
    allArticles.push(...getFallbackNews());
  }

  allArticles = deduplicateArticles(allArticles);

  // Group by category and interleave for a diverse "All" feed
  const byCategory = { exams: [], jobs: [], affairs: [] };
  allArticles.forEach(a => {
    const cat = a.category || 'affairs';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(a);
  });

  // Sort each category by date
  Object.values(byCategory).forEach(arr => arr.sort((a, b) => new Date(b.date) - new Date(a.date)));

  // Interleave: take one from each category in round-robin
  const interleaved = [];
  const categories = Object.keys(byCategory).filter(k => byCategory[k].length > 0);
  const indices = {};
  categories.forEach(c => { indices[c] = 0; });

  let hasMore = true;
  while (hasMore) {
    hasMore = false;
    for (const cat of categories) {
      if (indices[cat] < byCategory[cat].length) {
        interleaved.push(byCategory[cat][indices[cat]]);
        indices[cat]++;
        hasMore = true;
      }
    }
  }

  allArticles = interleaved;

  const cacheData = {
    lastUpdated: new Date().toISOString(),
    articles: allArticles.slice(0, 50)
  };

  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log(`[Scraper] Cached ${cacheData.articles.length} articles`);
  } catch (err) {
    console.error('[Scraper] Failed to write cache:', err.message);
  }

  return cacheData;
}

function getCachedNews() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      return data;
    }
  } catch (err) {
    console.error('[Scraper] Failed to read cache:', err.message);
  }
  return { lastUpdated: null, articles: getFallbackNews() };
}

module.exports = { scrapeAll, getCachedNews, getFallbackNews };
