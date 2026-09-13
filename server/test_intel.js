require('dotenv').config();
const { generatePdfStudyNotes } = require('./services/aiManager');

async function runTest() {
  console.log("Testing generatePdfStudyNotes with user raw material...");
  const raw = `1. विषय परिचय (Introduction & Overview)
प्रागैतिहासिक काल (Prehistoric Period) मानव सभ्यता के विकास का वह कालखंड है जिसके अध्ययन के लिए कोई लिखित अभिलेख (Written Records) उपलब्ध नहीं हैं।
छत्तीसगढ़ की प्रमुख गुफाएं:
सिंघनपुर (रायगढ़): 1910 में सी. डब्ल्यू. एंडरसन द्वारा खोजा गया।
कबरा पहाड़ (रायगढ़): मध्य पाषाण काल का सबसे प्रमुख केंद्र।
चितवा डोंगरी (बालोद): चीनी शैली मानवाकृति, ड्रैगन सदृश शैलचित्र।
धनोरा (बालोद): लगभग 500 पाषाण घेरे।`;

  try {
    const res = await generatePdfStudyNotes({
      topicName: 'प्रागैतिहासिक छत्तीसगढ़',
      topicNameHi: 'प्रागैतिहासिक छत्तीसगढ़',
      subjectName: 'छत्तीसगढ़ का इतिहास एवं पुरातत्व',
      examName: 'CGPSC',
      rawMaterial: raw
    });
    console.log("Success! Has structured:", Boolean(res.structured));
    if (res.structured) {
      console.log("Structured keys:", Object.keys(res.structured));
      console.log("Chapters count:", (res.structured.chapters || []).length);
      console.log("OneLiner count:", (res.structured.oneLinerRevision || []).length);
      console.log("MCQ count:", (res.structured.mcqs || []).length);
    } else {
      console.log("RawText length:", (res.rawText || '').length);
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}

runTest();
