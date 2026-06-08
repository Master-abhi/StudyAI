require('dotenv').config();
const { db } = require('./firebase-admin');

function getJobPriority(job) {
  const cat = job.category;
  const isCG = (cat === 'cgpsc' || cat === 'cgvyapam' || job.state === 'CG');
  
  if (isCG) return 5;
  if (cat === 'railway') return 4;
  if (cat === 'banking') return 3;
  if (cat === 'ssc') return 2;
  if (cat === 'upsc') return 1;
  return 0;
}

async function testPrioritization() {
  console.log('--- TESTING ROUTE PRIORITIZATION ---');
  try {
    const snap = await db.collection('jobs').orderBy('scrapedAt', 'desc').limit(100).get();
    let jobs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    console.log(`Fetched ${jobs.length} jobs from Firestore.`);
    
    // Sort jobs based on custom priority
    jobs.sort((a, b) => {
      const prioA = getJobPriority(a);
      const prioB = getJobPriority(b);
      if (prioA !== prioB) {
        return prioB - prioA;
      }
      return new Date(b.scrapedAt || 0) - new Date(a.scrapedAt || 0);
    });

    console.log('\nTop 25 prioritized jobs:');
    jobs.slice(0, 25).forEach((j, i) => {
      console.log(`${String(i + 1).padStart(2)}: Priority ${getJobPriority(j)} [Cat: ${j.category}, State: ${j.state}] - "${j.title}" (Source: ${j.source})`);
    });
  } catch (err) {
    console.error('Prioritization test failed:', err);
  }
}

testPrioritization();
