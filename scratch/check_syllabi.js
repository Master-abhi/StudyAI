const { db } = require('../server/firebase-admin');
const fs = require('fs');
const path = require('path');

async function checkSyllabi() {
  try {
    console.log('Querying all documents in syllabi collection...');
    const snapshot = await db.collection('syllabi').get();
    console.log(`Found ${snapshot.size} syllabi documents.`);
    
    snapshot.forEach(doc => {
      console.log(`Document ID: ${doc.id}`);
      const data = doc.data();
      console.log(`Name: ${data.name}, ID: ${data.id}`);
      fs.writeFileSync(
        path.join(__dirname, `syllabus_${doc.id}.json`), 
        JSON.stringify(data, null, 2)
      );
    });
    console.log('Done writing files.');
  } catch (err) {
    console.error('Error querying syllabi:', err);
  }
}

checkSyllabi();
