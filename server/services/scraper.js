const axios = require('axios');
const cheerio = require('cheerio');
const { db } = require('../firebase-admin');

const NEWS_DOC = db.collection('news').doc('cache');

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
          title,
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
    'UPSC+exam+2026+when:7d',
    'SSC+CGL+recruitment+when:7d',
    'railway+recruitment+2026+when:7d',
    'sarkari+naukri+government+job+when:7d',
    'CGPSC+exam+Chhattisgarh+when:7d'
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
            title,
            description: `Source: ${source || 'Google News'}`,
            category,
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
    { q: 'India+news+today+when:24h', icon: '🇮🇳', tag: 'National' },
    { q: 'international+world+news+when:24h', icon: '🌍', tag: 'International' },
    { q: 'India+sports+cricket+news+when:24h', icon: '🏏', tag: 'Sports' },
    { q: 'science+technology+India+news+when:7d', icon: '🔬', tag: 'Science & Tech' },
    { q: 'India+economy+business+news+when:24h', icon: '📈', tag: 'Economy' },
    { q: 'India+government+policy+scheme+when:7d', icon: '🏛️', tag: 'Government' }
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
          const titleLower = title.toLowerCase();
          if (titleLower.includes('recruitment') || titleLower.includes('vacancy') ||
            titleLower.includes('sarkari naukri') || titleLower.includes('admit card') ||
            titleLower.includes('answer key') || titleLower.includes('cut off')) {
            return;
          }
          articles.push({
            title,
            description: `${tag} • Source: ${source || 'Google News'}`,
            category: 'affairs',
            date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            source: source || 'Google News',
            url: link,
            icon,
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
    { q: 'भारत+ताजा+समाचार+when:24h', icon: '🇮🇳', tag: 'राष्ट्रीय', category: 'affairs' },
    { q: 'अंतरराष्ट्रीय+समाचार+विश्व+when:24h', icon: '🌍', tag: 'अंतरराष्ट्रीय', category: 'affairs' },
    { q: 'खेल+क्रिकेट+भारत+when:24h', icon: '🏏', tag: 'खेल', category: 'affairs' },
    { q: 'विज्ञान+तकनीक+भारत+when:7d', icon: '🔬', tag: 'विज्ञान', category: 'affairs' },
    { q: 'सरकारी+नौकरी+भर्ती+when:7d', icon: '💼', tag: 'नौकरी', category: 'jobs' },
    { q: 'UPSC+SSC+परीक्षा+नोटिफिकेशन+when:7d', icon: '📝', tag: 'परीक्षा', category: 'exams' },
    { q: 'अर्थव्यवस्था+बजट+भारत+when:7d', icon: '📈', tag: 'अर्थव्यवस्था', category: 'affairs' }
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
            title,
            description: `${tag} • स्रोत: ${source || 'Google समाचार'}`,
            category,
            date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            source: source || 'Google समाचार',
            url: link,
            icon,
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
        const titleLower = title.toLowerCase();
        const isGeneric = genericPhrases.some(phrase => titleLower.includes(phrase));
        if (isGeneric) return;

        articles.push({
          title,
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

async function scrapeNewsAPI() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey || apiKey === 'your-news-api-key-here') {
    console.log('[Scraper] NewsAPI.org API Key is not configured. Skipping NewsAPI scrape.');
    return [];
  }

  const domains = [
    'timesofindia.indiatimes.com',
    'ndtv.com',
    'thehindu.com',
    'indianexpress.com',
    'hindustantimes.com',
    'news18.com',
    'livemint.com',
    'moneycontrol.com',
    'business-standard.com'
  ].join(',');

  const articles = [];
  try {
    // Query the everything endpoint with Indian domains to get fresh national, exam and job news
    const url = `https://newsapi.org/v2/everything?domains=${domains}&language=en&sortBy=publishedAt&pageSize=40&apiKey=${apiKey}`;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 15000
    });

    if (data && data.status === 'ok' && Array.isArray(data.articles)) {
      data.articles.forEach(art => {
        if (!art.title) return;
        const titleLower = art.title.toLowerCase();
        const descLower = (art.description || '').toLowerCase();
        let category = 'affairs';
        let icon = '📰';

        // Categorize based on keywords in title or description
        if (titleLower.includes('recruitment') || titleLower.includes('vacancy') || titleLower.includes('naukri') || titleLower.includes('jobs') || titleLower.includes('bharti') || titleLower.includes('apprentice') || descLower.includes('recruitment') || descLower.includes('vacancy') || descLower.includes('naukri')) {
          category = 'jobs';
          icon = '💼';
        } else if (titleLower.includes('exam') || titleLower.includes('upsc') || titleLower.includes('ssc') || titleLower.includes('result') || titleLower.includes('admit card') || titleLower.includes('answer key') || titleLower.includes('neet') || titleLower.includes('jee') || titleLower.includes('cbse') || titleLower.includes('cutoff') || descLower.includes('admit card') || descLower.includes('exam result')) {
          category = 'exams';
          icon = '📝';
        } else if (titleLower.includes('sports') || titleLower.includes('cricket') || titleLower.includes('dhoni') || titleLower.includes('kohli') || titleLower.includes('olympics') || titleLower.includes('football') || titleLower.includes('ipl')) {
          icon = '🏏';
        } else if (titleLower.includes('science') || titleLower.includes('space') || titleLower.includes('nasa') || titleLower.includes('isro') || titleLower.includes('technology') || titleLower.includes('ai ') || titleLower.includes('robot') || titleLower.includes('smartphone')) {
          icon = '🔬';
        } else if (titleLower.includes('economy') || titleLower.includes('budget') || titleLower.includes('rupee') || titleLower.includes('gdp') || titleLower.includes('business') || titleLower.includes('stock') || titleLower.includes('shares') || titleLower.includes('ipo') || titleLower.includes('epfo') || titleLower.includes('income-tax')) {
          icon = '📈';
        } else if (titleLower.includes('minister') || titleLower.includes('modi') || titleLower.includes('policy') || titleLower.includes('government') || titleLower.includes('parliament') || titleLower.includes('court') || titleLower.includes('supreme court')) {
          icon = '🏛️';
        }

        articles.push({
          title: art.title,
          description: art.description || `Source: ${art.source.name || 'NewsAPI'}`,
          category,
          date: art.publishedAt ? art.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
          source: art.source.name || 'NewsAPI.org',
          url: art.url,
          icon,
          lang: 'en'
        });
      });
      console.log(`[Scraper] Successfully scraped ${articles.length} articles from NewsAPI.org`);
    } else {
      console.warn('[Scraper] NewsAPI response status not OK or articles missing:', data ? data.status : 'no data');
    }
  } catch (err) {
    console.error('NewsAPI.org scraping failed:', err.response?.data?.message || err.message);
  }
  return articles;
}

function getFallbackNews() {
  return [
    {
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

  const [sarkari, examNews, generalNews, employment, newsAPI] = await Promise.allSettled([
    scrapeSarkariResult(),
    scrapeExamNewsRSS(),
    scrapeGeneralNewsRSS(),
    scrapeEmploymentNews(),
    scrapeNewsAPI()
  ]);

  let allArticles = [];
  if (sarkari.status === 'fulfilled') allArticles.push(...sarkari.value);
  if (examNews.status === 'fulfilled') allArticles.push(...examNews.value);
  if (generalNews.status === 'fulfilled') allArticles.push(...generalNews.value);
  if (employment.status === 'fulfilled') allArticles.push(...employment.value);
  if (newsAPI.status === 'fulfilled') allArticles.push(...newsAPI.value);

  if (allArticles.length < 5) {
    console.log('[Scraper] Too few articles scraped, adding fallback data');
    allArticles.push(...getFallbackNews());
  }

  allArticles = deduplicateArticles(allArticles);

  // Group by category and interleave for a diverse feed
  const byCategory = { exams: [], jobs: [], affairs: [] };
  allArticles.forEach(a => {
    const cat = a.category || 'affairs';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(a);
  });

  Object.values(byCategory).forEach(arr => arr.sort((a, b) => new Date(b.date) - new Date(a.date)));

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

  const cacheData = {
    lastUpdated: new Date().toISOString(),
    articles: interleaved.slice(0, 50)
  };

  // Save to Firestore instead of local file
  try {
    await NEWS_DOC.set(cacheData);
    console.log('[Scraper] Cache updated in Firestore ✅');
  } catch (err) {
    console.error('[Scraper] Failed to save cache to Firestore:', err.message);
  }

  return cacheData;
}

/**
 * Reads cached news from Firestore.
 * Now async — await this function.
 */
async function getCachedNews() {
  try {
    const doc = await NEWS_DOC.get();
    if (doc.exists) {
      return doc.data();
    }
  } catch (err) {
    console.error('[Scraper] Error reading Firestore cache:', err.message);
  }
  return { lastUpdated: null, articles: getFallbackNews() };
}

module.exports = { scrapeAll, getCachedNews, getFallbackNews };
