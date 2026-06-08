const axios = require('axios');
const cheerio = require('cheerio');
const Parser = require('rss-parser');
const crypto = require('crypto');
const https = require('https');
const { db } = require('../firebase-admin');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Referer': 'https://www.google.com/'
};

const parser = new Parser({
  headers: HEADERS
});

/**
 * Clean and combine base URL and relative paths safely.
 */
function cleanUrl(href, baseUrl) {
  if (!href) return '';
  const trimmed = href.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${base}${path}`;
}

/**
 * Extract last date and vacancies from text using regular expressions.
 */
function extractJobDetails(title, description) {
  const fullText = `${title} ${description || ''}`;
  let lastDate = null;
  let vacancies = null;

  // Date regex: dd/mm/yyyy or dd-mm-yyyy or yyyy-mm-dd
  const dateRegex = /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/;
  const dateMatch = fullText.match(dateRegex);
  if (dateMatch) {
    lastDate = `${dateMatch[3]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[1].padStart(2, '0')}`;
  } else {
    // Month name regex: e.g. "25 May 2026" or "May 25, 2026"
    const monthRegex = /\b(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})\b/i;
    const monthMatch = fullText.match(monthRegex);
    if (monthMatch) {
      const months = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
      const m = monthMatch[2].toLowerCase().substring(0, 3);
      lastDate = `${monthMatch[3]}-${months[m]}-${monthMatch[1].padStart(2, '0')}`;
    }
  }

  // Vacancy regex: "150 Vacancies", "200 Posts", "500 पद"
  const vacancyRegex = /\b(\d+)\s*(vacancies|vacancy|posts|post|पदों|पद)\b/i;
  const vacancyMatch = fullText.match(vacancyRegex);
  if (vacancyMatch) {
    vacancies = parseInt(vacancyMatch[1], 10);
  }

  return { lastDate, vacancies };
}

/**
 * Map jobs to one of the target categories.
 */
function tagJobCategory(title, defaultCategory) {
  const text = title.toLowerCase();

  if (text.includes('cgpsc') || text.includes('state service exam')) {
    return 'cgpsc';
  }
  if (text.includes('vyapam') || text.includes('cgvyapam') || text.includes('cg vyapam')) {
    return 'cgvyapam';
  }
  if (text.includes('bank') || text.includes('sbi') || text.includes('rbi') || text.includes('ibps') || text.includes('clerk') || text.includes('po ') || text.includes('so ')) {
    return 'banking';
  }
  if (text.includes('railway') || text.includes('rrb') || text.includes('ntpc') || text.includes('loco pilot')) {
    return 'railway';
  }
  if (text.includes('ssc') || text.includes('cgl') || text.includes('chsl') || text.includes('mts') || text.includes('gd constable') || text.includes('delhi police')) {
    return 'ssc';
  }
  if (text.includes('upsc') || text.includes('ias') || text.includes('ips') || text.includes('civil services')) {
    return 'upsc';
  }
  if (text.includes('defence') || text.includes('army') || text.includes('navy') || text.includes('air force') || text.includes('nda') || text.includes('cds') || text.includes('agniveer') || text.includes('bsf') || text.includes('crpf')) {
    return 'defence';
  }
  if (text.includes('teacher') || text.includes('teaching') || text.includes('tet') || text.includes('ctet') || text.includes('cgtet') || text.includes('lecturer') || text.includes('professor') || text.includes('shikshak')) {
    return 'teaching';
  }
  if (text.includes('police') || text.includes('sub inspector') || text.includes('constable') || text.includes('daroga') || text.includes('warden') || text.includes('si ')) {
    return 'police';
  }

  return defaultCategory || 'ssc';
}

// ── CHEERIO SCRAPERS ──

async function scrapeCGPSC() {
  const jobs = [];
  try {
    const { data } = await axios.get('https://psc.cg.gov.in', { headers: HEADERS, timeout: 15000, httpsAgent });
    const $ = cheerio.load(data);
    $('a').each((i, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      if (text.length > 10 && (text.includes('Advertisement') || text.includes('विज्ञापन') || text.includes('Recruitment') || text.includes('भर्ती'))) {
        const link = cleanUrl(href, 'https://psc.cg.gov.in');
        jobs.push({
          title: text,
          link,
          source: 'CGPSC Official',
          category: 'cgpsc',
          state: 'CG'
        });
      }
    });
  } catch (err) {
    console.warn('CGPSC scraping failed or timed out:', err.message);
  }
  return jobs;
}

async function scrapeCGVyapam() {
  const jobs = [];
  try {
    const { data } = await axios.get('https://vyapam.cgstate.gov.in', { headers: HEADERS, timeout: 15000, httpsAgent });
    const $ = cheerio.load(data);
    $('a').each((i, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      if (text.length > 10 && (text.includes('भर्ती') || text.includes('विज्ञापन') || text.includes('Recruitment') || text.includes('परीक्षा'))) {
        const link = cleanUrl(href, 'https://vyapam.cgstate.gov.in');
        jobs.push({
          title: text,
          link,
          source: 'CG Vyapam Official',
          category: 'cgvyapam',
          state: 'CG'
        });
      }
    });
  } catch (err) {
    console.warn('CG Vyapam scraping failed or timed out:', err.message);
  }
  return jobs;
}

async function scrapeIBPS() {
  const jobs = [];
  try {
    const { data } = await axios.get('https://ibps.in', { headers: HEADERS, timeout: 15000, httpsAgent });
    const $ = cheerio.load(data);
    $('a').each((i, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      if (text.length > 10 && (text.toLowerCase().includes('apply') || text.toLowerCase().includes('recruitment') || text.toLowerCase().includes('crp') || text.toLowerCase().includes('cwe'))) {
        const link = cleanUrl(href, 'https://ibps.in');
        jobs.push({
          title: text,
          link,
          source: 'IBPS Official',
          category: 'banking',
          state: 'ALL'
        });
      }
    });
  } catch (err) {
    console.warn('IBPS scraping failed or timed out:', err.message);
  }
  return jobs;
}

async function scrapeSBIRBI() {
  const jobs = [];
  try {
    const { data } = await axios.get('https://opportunities.rbi.org.in/scripts/vacancies.aspx', { headers: HEADERS, timeout: 10000, httpsAgent });
    const $ = cheerio.load(data);
    $('a').each((i, el) => {
      const text = $(el).text().trim();
      const href = $(el).attr('href') || '';
      if (text.length > 10 && (text.includes('Recruitment') || text.includes('Vacancy'))) {
        const link = cleanUrl(href, 'https://opportunities.rbi.org.in/scripts/');
        jobs.push({
          title: text,
          link,
          source: 'RBI Careers',
          category: 'banking',
          state: 'ALL'
        });
      }
    });
  } catch (err) {
    console.log('RBI vacancies scraping skipped:', err.message);
  }
  return jobs;
}

async function scrapeUPSC() {
  const jobs = [];
  try {
    const { data } = await axios.get('https://upsc.gov.in/examinations/active-examinations', { headers: HEADERS, timeout: 15000, httpsAgent });
    const $ = cheerio.load(data);
    $('a').each((i, el) => {
      const text = $(el).text().trim();
      const href = $(el).attr('href') || '';
      if (text.length > 10 && (text.toLowerCase().includes('examination') || text.toLowerCase().includes('notice') || text.toLowerCase().includes('recruitment'))) {
        const link = cleanUrl(href, 'https://upsc.gov.in');
        jobs.push({
          title: text,
          link,
          source: 'UPSC Official',
          category: 'upsc',
          state: 'ALL'
        });
      }
    });
  } catch (err) {
    console.warn('UPSC examinations scraping failed:', err.message);
  }
  return jobs;
}

// ── RSS JOBS PARSER ──

async function parseJobRSS(feedUrl, sourceName, state, defaultCategory) {
  const jobs = [];
  try {
    const feed = await parser.parseURL(feedUrl);
    feed.items.slice(0, 15).forEach(item => {
      const title = item.title || '';
      const link = item.link || '';
      const description = item.contentSnippet || item.content || '';
      
      const { lastDate, vacancies } = extractJobDetails(title, description);
      const category = tagJobCategory(title, defaultCategory);

      jobs.push({
        title,
        link,
        source: sourceName,
        category,
        lastDate,
        vacancies,
        scrapedAt: new Date().toISOString(),
        state
      });
    });
  } catch (err) {
    console.log(`Failed parsing job RSS feed "${sourceName}" (${feedUrl}):`, err.message);
  }
  return jobs;
}

async function scrapeSarkariResultJobs() {
  const jobs = [];
  try {
    const { data } = await axios.get('https://www.sarkariresult.com/', { headers: HEADERS, timeout: 15000, httpsAgent });
    const $ = cheerio.load(data);
    
    // Find the container for "Latest Job"
    let container = null;
    $('div, td').each((i, el) => {
      const text = $(el).clone().children('script, style').remove().end().text().trim();
      if (text.startsWith('Latest Job') && !text.includes('Sarkari Result® 2026')) {
        container = el;
        return false; // break loop
      }
    });

    if (container) {
      $(container).find('a').each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href') || '';
        
        if (text.length > 5 && text !== 'Latest Job' && text !== 'View More') {
          const link = cleanUrl(href, 'https://www.sarkariresult.com');
          // Classify the job using tagJobCategory
          const category = tagJobCategory(text);
          // Check if it is a CG job
          const textLower = text.toLowerCase();
          const isCG = textLower.includes('cg') || textLower.includes('chhattisgarh') || textLower.includes('vyapam');
          
          jobs.push({
            title: text,
            link,
            source: 'Sarkari Result',
            category,
            state: isCG ? 'CG' : 'ALL'
          });
        }
      });
    }
  } catch (err) {
    console.warn('Sarkari Result job scraping failed:', err.message);
  }
  return jobs;
}

async function scrapeFreeJobAlertCG() {
  const jobs = [];
  try {
    const url = 'https://www.freejobalert.com/chhattisgarh-government-jobs/';
    const { data } = await axios.get(url, { headers: HEADERS, timeout: 15000, httpsAgent });
    const $ = cheerio.load(data);
    
    $('table tr').each((i, row) => {
      const tds = $(row).find('td');
      if (tds.length >= 6) {
        const cell0Text = $(tds[0]).text().trim();
        // Check if row has a post date in the first column
        const dateRegex = /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}\b/;
        if (dateRegex.test(cell0Text)) {
          const org = $(tds[1]).text().trim();
          const postDetails = $(tds[2]).text().trim();
          const qualification = $(tds[3]).text().trim();
          const lastDateStr = $(tds[5]).text().trim();
          const linkEl = $(tds[6]).find('a');
          const href = linkEl.attr('href') || '';
          
          if (href && postDetails.length > 5) {
            const title = `[${org}] ${postDetails}`;
            const link = href.trim();
            
            // Clean/parse last date
            let lastDate = null;
            const match = lastDateStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
            if (match) {
              lastDate = `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
            }
            
            const category = tagJobCategory(title, 'cgvyapam'); // default to cgvyapam since it is CG page
            
            const fullTextForDetails = `${title} ${qualification}`;
            const { vacancies } = extractJobDetails(fullTextForDetails, '');
            
            jobs.push({
              title,
              link,
              source: 'Free Job Alert (CG)',
              category,
              state: 'CG',
              lastDate,
              vacancies
            });
          }
        }
      }
    });
  } catch (err) {
    console.warn('Free Job Alert CG scraping failed:', err.message);
  }
  return jobs;
}

async function scrapeAllJobs() {
  console.log('[JobScraper] Starting job aggregation scrape...');

  // 1. Run official notices Cheerio scrapes in parallel
  const cheerioFetches = await Promise.allSettled([
    scrapeCGPSC(),
    scrapeCGVyapam(),
    scrapeIBPS(),
    scrapeSBIRBI(),
    scrapeUPSC(),
    scrapeSarkariResultJobs(),
    scrapeFreeJobAlertCG()
  ]);

  const jobsList = [];
  cheerioFetches.forEach(res => {
    if (res.status === 'fulfilled') {
      jobsList.push(...res.value);
    }
  });

  // 2. Fetch and parse all job RSS feeds
  const rssFeeds = [
    // CG specific job feeds
    { url: 'https://cg.sarkarijobs.com/feed', source: 'CG Sarkari Jobs', state: 'CG', category: 'cgvyapam' },
    { url: 'https://news.google.com/rss/search?q=CGPSC+CG+Vyapam+bharti&hl=hi&gl=IN&ceid=IN:hi', source: 'Google News (CG Jobs)', state: 'CG', category: 'cgvyapam' },
    
    // Banking/Railways/SSC/Central Govt feeds
    { url: 'https://news.google.com/rss/search?q=IBPS+SBI+RBI+bank+recruitment&hl=hi&gl=IN&ceid=IN:hi', source: 'Google News (Banking Jobs)', state: 'ALL', category: 'banking' },
    { url: 'https://news.google.com/rss/search?q=RRB+railway+recruitment+vacancy&hl=hi&gl=IN&ceid=IN:hi', source: 'Google News (Railway Jobs)', state: 'ALL', category: 'railway' },
    { url: 'https://news.google.com/rss/search?q=SSC+UPSC+central+govt+vacancy&hl=hi&gl=IN&ceid=IN:hi', source: 'Google News (SSC/UPSC Jobs)', state: 'ALL', category: 'ssc' },

    // General Job blogs/RSS feeds
    { url: 'https://www.sarkarinaukriblog.com/feeds/posts/default', source: 'Sarkari Naukri Blog', state: 'ALL', category: 'ssc' },
    { url: 'https://govtjobsblog.in/feed', source: 'Govt Jobs Blog', state: 'ALL', category: 'ssc' },
    { url: 'https://govtjobsdiary.com/feed', source: 'Govt Jobs Diary', state: 'ALL', category: 'ssc' },
    { url: 'https://www.mysarkarinaukri.com/find/rss-jobs', source: 'My Sarkari Naukri RSS', state: 'ALL', category: 'ssc' }
  ];

  const rssFetches = await Promise.allSettled(
    rssFeeds.map(feed => parseJobRSS(feed.url, feed.source, feed.state, feed.category))
  );

  rssFetches.forEach(res => {
    if (res.status === 'fulfilled') {
      jobsList.push(...res.value);
    }
  });

  // 3. Post-process Cheerio jobs (since they didn't run date/vacancy extraction and scrapedAt assignment)
  const processedJobs = jobsList.map(job => {
    if (!job.scrapedAt) {
      const { lastDate, vacancies } = extractJobDetails(job.title, '');
      return {
        ...job,
        lastDate,
        vacancies,
        scrapedAt: new Date().toISOString()
      };
    }
    return job;
  });

  // 4. Deduplicate
  const seen = new Set();
  const uniqueJobs = processedJobs.filter(job => {
    const key = (job.link || job.title).toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`[JobScraper] Scraped ${processedJobs.length} raw jobs. Deduplicated to ${uniqueJobs.length}.`);

  // 5. Store to Firestore `jobs` collection in batch
  const batch = db.batch();
  uniqueJobs.forEach(job => {
    const docId = crypto.createHash('md5').update(job.link || job.title).digest('hex');
    const docRef = db.collection('jobs').doc(docId);
    batch.set(docRef, job, { merge: true });
  });

  if (uniqueJobs.length > 0) {
    await batch.commit();
    console.log(`[JobScraper] Saved ${uniqueJobs.length} jobs to Firestore jobs collection ✅`);
  }

  return uniqueJobs;
}

module.exports = {
  scrapeAllJobs,
  scrapeSarkariResultJobs,
  scrapeFreeJobAlertCG
};
