const axios = require('axios');
const Parser = require('rss-parser');

const parser = new Parser();

async function resolveUrl(googleNewsUrl) {
  try {
    const response = await axios.get(googleNewsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 5000,
      maxRedirects: 5
    });
    // The final URL is either in response.request.res.responseUrl (Node's HTTP module response)
    // or response.request.path / response.request.host, etc.
    const finalUrl = response.request?.res?.responseUrl || response.config?.url || googleNewsUrl;
    console.log(`Resolved: ${googleNewsUrl} -> ${finalUrl}`);
    return finalUrl;
  } catch (err) {
    console.error(`Failed to resolve ${googleNewsUrl}:`, err.message);
    return googleNewsUrl;
  }
}

async function test() {
  try {
    const feed = await parser.parseURL('https://news.google.com/rss/search?q=chhattisgarh&hl=hi&gl=IN&ceid=IN:hi');
    console.log(`Feed Title: ${feed.title}`);
    if (feed.items.length > 0) {
      const item = feed.items[0];
      console.log(`Item Title: ${item.title}`);
      console.log(`Item Link: ${item.link}`);
      const resolved = await resolveUrl(item.link);
      console.log(`Result: ${resolved}`);
    } else {
      console.log('No items found');
    }
  } catch (err) {
    console.error('Test failed:', err.message);
  }
}

test();
