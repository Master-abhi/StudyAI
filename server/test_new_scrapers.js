require('dotenv').config();
const { scrapeSarkariResultJobs, scrapeFreeJobAlertCG } = require('./services/jobScraper');

async function testScrapers() {
  console.log('--- TESTING NEW SCRAPERS ---');
  
  try {
    console.log('\nTesting scrapeSarkariResultJobs...');
    const sarkariJobs = await scrapeSarkariResultJobs();
    console.log(`Successfully scraped ${sarkariJobs.length} jobs from SarkariResult.`);
    if (sarkariJobs.length > 0) {
      console.log('Sample Job from SarkariResult:');
      console.log(JSON.stringify(sarkariJobs[0], null, 2));
      
      const cgJobs = sarkariJobs.filter(j => j.state === 'CG');
      console.log(`Found ${cgJobs.length} CG jobs on SarkariResult.`);
      if (cgJobs.length > 0) {
        console.log('Sample CG job from SarkariResult:', cgJobs[0]);
      }
    }
  } catch (err) {
    console.error('SarkariResult scraper test failed:', err);
  }

  try {
    console.log('\nTesting scrapeFreeJobAlertCG...');
    const freeJobAlertJobs = await scrapeFreeJobAlertCG();
    console.log(`Successfully scraped ${freeJobAlertJobs.length} jobs from FreeJobAlert (CG).`);
    if (freeJobAlertJobs.length > 0) {
      console.log('Sample Job from FreeJobAlert:');
      console.log(JSON.stringify(freeJobAlertJobs[0], null, 2));
      
      const urgentJobs = freeJobAlertJobs.filter(j => j.lastDate);
      console.log(`Found ${urgentJobs.length} jobs with valid last dates parsed.`);
      if (urgentJobs.length > 0) {
        console.log('Sample Job with parsed last date:', urgentJobs[0]);
      }
    }
  } catch (err) {
    console.error('FreeJobAlert scraper test failed:', err);
  }
  
  console.log('\n--- TESTING COMPLETED ---');
}

testScrapers();
