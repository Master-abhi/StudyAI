const axios = require('axios');
const cheerio = require('cheerio');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5'
};

async function inspectSarkariResult() {
  console.log('--- INSPECTING SARKARI RESULT ---');
  try {
    const { data } = await axios.get('https://www.sarkariresult.com/', { headers: HEADERS, timeout: 10000 });
    const $ = cheerio.load(data);
    
    // Let's find tables or lists containing jobs
    console.log('Finding elements with text "Latest Jobs"...');
    // Frequently, Latest Jobs is inside a div with id "ljob" or inside table cells.
    // Let's print headings or divs that look like they contain the jobs list
    const links = [];
    // Let's search for anchors containing common terms in SarkariResult homepage
    $('a').each((i, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      if (href.includes('latestjob') || href.includes('latest-job')) {
        links.push({ text, href });
      }
    });
    console.log(`Found ${links.length} latestjob links. First 10:`);
    console.log(links.slice(0, 10));
  } catch (err) {
    console.error('Sarkari Result inspection failed:', err.message);
  }
}

async function inspectFreeJobAlert() {
  console.log('\n--- INSPECTING FREE JOB ALERT ---');
  try {
    // Let's inspect the CG page of freejobalert as CG jobs are top priority
    const { data } = await axios.get('https://www.freejobalert.com/chhattisgarh-govt-jobs/', { headers: HEADERS, timeout: 10000 });
    const $ = cheerio.load(data);
    
    console.log('Looking for tables with class "outtab" or similar...');
    // FreeJobAlert tables typically use class "outtab" or table rows
    const tables = $('table');
    console.log(`Found ${tables.length} tables in CG page.`);
    
    // Let's inspect rows in the main content area
    const jobs = [];
    $('table.outtab tr, table tr').each((i, el) => {
      const text = $(el).text().trim();
      if (text.includes('Post Date') || text.includes('Recruitment') || text.includes('Exam')) {
        // This might be a header or a job row
      }
      const links = $(el).find('a');
      if (links.length > 0) {
        const href = $(links.first()).attr('href') || '';
        const title = $(links.first()).text().trim();
        if (title.length > 10 && (href.includes('freejobalert.com') || href.startsWith('/'))) {
          jobs.push({ title, href });
        }
      }
    });
    console.log(`Found ${jobs.length} potential job elements in CG page. First 10:`);
    console.log(jobs.slice(0, 10));
  } catch (err) {
    console.error('Free Job Alert inspection failed:', err.message);
  }
}

async function run() {
  await inspectSarkariResult();
  await inspectFreeJobAlert();
}

run();
