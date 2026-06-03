require('dotenv').config();
const { scrapeAllNews } = require('./services/newsScraper');
const { scrapeAllJobs } = require('./services/jobScraper');

async function runTests() {
  console.log('--- STARTING SCRAPER SYSTEM TESTS ---');
  
  try {
    console.log('\n[Test 1] Running Job Scraper...');
    const jobsResult = await scrapeAllJobs();
    console.log(`Job Scraper Completed! Scraped/Updated ${jobsResult.length} unique jobs in Firestore.`);
    if (jobsResult.length > 0) {
      console.log('Sample Job Output:', JSON.stringify(jobsResult[0], null, 2));
    }
  } catch (err) {
    console.error('Job Scraper Test failed:', err);
  }

  try {
    console.log('\n[Test 2] Running News Scraper (Pre-filter + Groq relevance + AI bilingual translations)...');
    const newsResult = await scrapeAllNews();
    console.log(`News Scraper Completed! Cache has ${newsResult.articles.length} articles.`);
    if (newsResult.articles.length > 0) {
      console.log('Sample News Article from Cache:', JSON.stringify(newsResult.articles[0], null, 2));
    }
  } catch (err) {
    console.error('News Scraper Test failed:', err);
  }

  console.log('\n--- TESTS COMPLETED ---');
}

runTests();
