const axios = require('axios');
const cheerio = require('cheerio');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Referer': 'https://www.google.com/'
};

async function inspectSarkariLatestJobs() {
  try {
    const { data } = await axios.get('https://www.sarkariresult.com/', { headers: HEADERS, timeout: 15000 });
    const $ = cheerio.load(data);
    
    // Let's find elements that contain "Latest Job" or "Latest Jobs" and list their child links
    // Often there's a div or td whose first element is "Latest Job"
    $('div, td').each((i, el) => {
      const text = $(el).clone().children('script, style').remove().end().text().trim();
      // Look for a div or cell that contains "Latest Job" as a title/header
      if (text.startsWith('Latest Job') && !text.includes('Sarkari Result® 2026')) {
        console.log(`\n--- Container ${i} (Text starts with "Latest Job") ---`);
        const links = $(el).find('a');
        console.log(`Found ${links.length} links in this container.`);
        
        links.each((j, linkEl) => {
          const lText = $(linkEl).text().trim();
          const lHref = $(linkEl).attr('href') || '';
          if (lText.length > 3) {
            console.log(`  Link ${j}: "${lText}" -> ${lHref}`);
          }
        });
      }
    });
  } catch (err) {
    console.error('Failed:', err.message);
  }
}

inspectSarkariLatestJobs();
