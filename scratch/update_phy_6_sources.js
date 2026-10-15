const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function updatePhy6() {
  const docRef = db.collection('topic_study_notes').doc('cgv_master_phy_6');
  const snap = await docRef.get();
  if (!snap.exists) {
    console.error('cgv_master_phy_6 does not exist!');
    process.exit(1);
  }

  const data = snap.data();
  const notes = data.studyNotes;

  // Add Sources & References
  notes.sources = [
    'NCERT Class 9 Science (Chapter 10: Gravitation & Floatation / उत्प्लावन एवं दाब)',
    'NCERT Class 11 Physics Part-2 (Chapter 10: Mechanical Properties of Fluids / तरलों के यांत्रिकी गुण)',
    'Concepts of Physics (Vol 1) - Dr. H.C. Verma (Chapter 13: Fluid Mechanics & Chapter 14: Surface Tension)',
    'University Physics with Modern Physics - Young & Freedman (Chapter 12: Fluid Mechanics)',
    'Lucent General Science (Physics - Hydrostatics, Surface Tension, Viscosity & Bernoulli\'s Theorem)',
    'CGPSC एवं CG Vyapam विगत 10 वर्षों के सामान्य विज्ञान प्रश्न पत्र'
  ];

  // Add Confusion Buster
  notes.confusionBuster = [
    {
      concept1: 'प्रणोद (Thrust)',
      concept2: 'दाब (Pressure)',
      clarification: 'प्रणोद सतह पर लंबवत लगने वाला कुल बल है (सदिश, मात्रक न्यूटन)। दाब प्रति एकांक क्षेत्रफल पर लगने वाला बल है (P = F/A, अदिश, मात्रक पास्कल = N/m²)।'
    },
    {
      concept1: 'संसंजक बल (Cohesive)',
      concept2: 'आसंजक बल (Adhesive)',
      clarification: 'संसंजक बल एक ही पदार्थ के अणुओं के मध्य लगता है (उदा. जल-जल, पारा-पारा)। आसंजक बल दो भिन्न पदार्थों के अणुओं के मध्य लगता है (उदा. जल-कांच, फेविकोल-लकड़ी)।'
    },
    {
      concept1: 'द्रवों में ताप पर श्यानता',
      concept2: 'गैसों में ताप पर श्यानता',
      clarification: 'द्रवों को गर्म करने पर अंतराण्विक आकर्षण कमजोर होने से श्यानता घटती है (द्रव पतला होता है)। गैसों को गर्म करने पर अणुओं की गति और टक्कर दर बढ़ने से श्यानता बढ़ती है।'
    },
    {
      concept1: 'बर्फ का डूबा भाग',
      concept2: 'बर्फ का सतह के ऊपर भाग',
      clarification: 'पानी में तैरते बर्फ के टुकड़े का 9/10 भाग (90%-92%) जल में डूबा रहता है, और केवल 1/10 भाग (8%-10%) ही सतह के ऊपर दिखाई देता है।'
    },
    {
      concept1: 'धारा-रेखी प्रवाह',
      concept2: 'विक्षुब्ध प्रवाह',
      clarification: 'क्रांतिक वेग (vc) से कम वेग पर कण एक व्यवस्थित पथ पर चलते हैं (धारा-रेखी, Re < 2000)। क्रांतिक वेग से अधिक पर पथ टेढ़ा-मेढ़ा व भंवर युक्त हो जाता है (विक्षुब्ध, Re > 3000)।'
    }
  ];

  // Add FAQ List
  notes.faqList = [
    {
      question: 'लोहे की कील पानी में डूब जाती है परंतु लोहे का विशाल जलपोत क्यों तैरता है?',
      answer: 'लोहे की ठोस कील का घनत्व पानी से अधिक होता है और वह अपने भार से कम पानी विस्थापित कर पाती है। विशाल जहाज अंदर से खोखला बनाया जाता है जिससे उसका प्रभावी औसत घनत्व जल से कम हो जाता है और डूबा हुआ भाग अपने भार के बराबर जल विस्थापित कर लेता है (आर्किमिडीज का सिद्धांत)।'
    },
    {
      question: 'गिलास में तैर रहे बर्फ के पिघलने पर पानी का स्तर क्यों नहीं बढ़ता?',
      answer: 'बर्फ तैरते समय अपने भार के ठीक बराबर जल पहले ही विस्थापित कर चुकी होती है। पिघलने के पश्चात प्राप्त जल का आयतन ठीक उस विस्थापित आयतन के संपाती होता है, अतः जल स्तर बिल्कुल अपरिवर्तित रहता है।'
    },
    {
      question: 'पहाड़ों पर खाना पकाने में अधिक समय क्यों लगता है तथा कुकर इसे कैसे हल करता है?',
      answer: 'पहाड़ों पर वायुमंडलीय दाब कम होने से जल का क्वथनांक 100°C से घटकर 80°-90°C रह जाता है, जिससे पर्याप्त ताप नहीं मिल पाता। प्रेशर कुकर अंदर का दाब बढ़ाकर 2 atm कर देता है, जिससे जल का क्वथनांक 120°C तक पहुंच जाता है और भोजन शीघ्र पक जाता है।'
    },
    {
      question: 'आंधी-तूफान में टीन की छत ऊपर की ओर क्यों उड़ जाती है?',
      answer: 'बर्नोली प्रमेय (P + ½ρv² = const) के अनुसार, छत के ऊपर तेज हवा चलने से वायु का वेग बढ़ता है और दाब अत्यधिक घट जाता है। कमरे के अंदर सामान्य उच्च वायुमंडलीय दाब बना रहता है जो छत को ऊपर उछाल देता है।'
    },
    {
      question: 'वर्षा की बूंदें ऊंचाई से गिरते हुए जानलेवा गति क्यों प्राप्त नहीं करतीं?',
      answer: 'वायु की श्यानता के कारण गिरती बूंद पर ऊपर की ओर श्यान बल लगता है। शीघ्र ही गुरुत्व बल श्यान बल व उत्प्लावन बल से संतुलित हो जाता है, जिससे बूंद एक नियत सुरक्षित सीमांत वेग (Terminal Velocity) प्राप्त कर लेती है।'
    }
  ];

  // Add Study Tips
  notes.studyTips = [
    'बैरोमीटर के तीनों संकेतों की ट्रिक याद रखें: अचानक गिरना = आंधी-तूफान, धीरे गिरना = वर्षा, धीरे चढ़ना = साफ मौसम।',
    'बर्नोली प्रमेय का मूल नियम याद रखें: "जहाँ वेग अधिक, वहाँ दाब कम" (हवाई जहाज, टीन शेड, क्रिकेट स्विंग इसी से हल होंगे)।',
    'आर्किमिडीज सिद्धांत में याद रखें कि तैरती बर्फ के पिघलने पर जल स्तर में कोई परिवर्तन नहीं होता।',
    'ताप का प्रभाव याद रखें: ताप बढ़ने से द्रवों का पृष्ठ तनाव व श्यानता दोनों घटते हैं, जबकि गैसों की श्यानता बढ़ती है।'
  ];

  notes.curatorNotes = 'तरल यांत्रिकी (Fluid Mechanics) सामान्य विज्ञान का अत्यंत महत्वपूर्ण विषय है। CGPSC व CG Vyapam में बैरोमीटर के संकेत, हाइड्रोलिक मशीनों का पास्कल नियम, बर्फ का तैरना व पिघलना, वर्षा की बूंदों का गोल होना (पृष्ठ तनाव), लालटेन की बत्ती (केशिकत्व), तथा बर्नोली प्रमेय से प्रतिवर्ष 2-3 प्रश्न सीधे पूछे जाते हैं। इस सामग्री को NCERT व मानक विज्ञान संदर्भों के आधार पर पूर्णतः प्रामाणिक व परीक्षा-केंद्रित बनाया गया है।';

  data.studyNotes = notes;
  data.updatedAt = new Date().toISOString();

  await docRef.set(data);
  console.log('cgv_master_phy_6 updated with sources, confusionBuster, faqList, studyTips and curatorNotes! ✅');
}

updatePhy6()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
