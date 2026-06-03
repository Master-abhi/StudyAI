const axios = require('axios');
const cheerio = require('cheerio');

async function getArticleUrl(googleRssUrl) {
  try {
    const urlObj = new URL(googleRssUrl);
    const pathParts = urlObj.pathname.split('/');
    const gn_art_id = pathParts[pathParts.length - 1];
    
    console.log('ID extracted:', gn_art_id);

    const targetArticlesUrl = `https://news.google.com/articles/${gn_art_id}`;
    const response = await axios.get(targetArticlesUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const dataP = $('c-wiz[data-p]').attr('data-p');
    if (!dataP) {
      console.log('Failed to find data-p attribute');
      return googleRssUrl;
    }

    const cleanDataP = dataP.replace('%.@.', '[');
    const arr = JSON.parse(cleanDataP);

    const config = arr[1];
    const timestamp = arr[10];
    const signature = arr[11];

    console.log('Parsed Authentic Params - Signature:', signature, 'Timestamp:', timestamp);

    // Correct payload format: ["garturlreq", config, gn_art_id, timestamp, signature] (1D array)
    const innerPayload = [
      "Fbv4je",
      JSON.stringify([ "garturlreq", config, gn_art_id, timestamp, signature ])
    ];
    
    const payloadData = [[innerPayload]];

    const body = `f.req=${encodeURIComponent(JSON.stringify(payloadData))}`;
    
    const postResponse = await axios.post('https://news.google.com/_/DotsSplashUi/data/batchexecute', body, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const resText = postResponse.data;
    const parts = resText.split('\n\n');
    const jsonPart = JSON.parse(parts[1] || parts[0]);
    console.log('Response jsonPart:', jsonPart);
    
    const arrayString = jsonPart[0][2];
    if (!arrayString) {
      console.log('Failed to decode: inner array is null');
      return googleRssUrl;
    }
    
    const decodedUrl = JSON.parse(arrayString)[1];
    return decodedUrl;
  } catch (err) {
    console.error('Error resolving URL:', err.message);
    return googleRssUrl;
  }
}

async function run() {
  const url = 'https://news.google.com/rss/articles/CBMi3wFBVV95cUxNSVNWT1ktUnhfSHowVGNULW1OYXNVeUlXTkFMdXJOSEZqdlhYTWFYZEhVMDJhczNyMW5DcjJHNHc5c04yc3RrclhYRG5LRFZaOU5CdmZnR0owUVBjSXIzNkRWMW1mRGllN0Z5OWtZV2xIWU5tLXlYbGg2Um9PX2VLT1lqSzg3WTRFUEdMZzJiVUxLWUVHSVhWM2NBYjVpWVg5MXNQWjUxY0s4Vk9ZWlJ2QnJwbW9QXzNXUjFLSmlvOTFiOVNnYmd6eUR4UEtmNDExeGd6VHZwUnI0Nk0yQlpQ0gHkAUFVX3lxTFBqUklsa3F5WVdkQ3dzbzg3b1ZST0ppbmpwekNya0dnYmljYXNIN2Y3RnFKSUUtcGw1LU9sUkhuc25YbDhRVTRqY25zZ3RpeERXRFJoYlg5UzJCYjd3bGJQWTBiWDNtcVFPWWY3Vi1rSnlTQXFoZk9VRVRXRmNKNGNDdVRQY1JGQmhUT2JkWkE4T1NwSEhRcEtkZ2FSdl9LOW50SUd6aFl2ckdTYk9DYThWbXVFSnVxWlRPWmZ3WXBvNmlQUl9yMk5tV2J4NGIxNzFkWVVWUFpOSUtfM1NBWlNPcjBjVg?oc=5';
  const resolved = await getArticleUrl(url);
  console.log('RESULT:', resolved);
}

run();
