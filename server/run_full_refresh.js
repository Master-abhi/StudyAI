require('dotenv').config();
const { scrapeAllJobs } = require('./services/jobScraper');

async function main() {
  console.log('--- STARTING FULL DATABASE REFRESH ---');
  try {
    const jobs = await scrapeAllJobs();
    console.log(`Successfully completed! Refreshed and updated ${jobs.length} jobs in Firestore.`);
  } catch (err) {
    console.error('Refresh failed:', err);
  }
}

main();
