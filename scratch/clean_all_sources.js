const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function cleanAllSources() {
  const updates = [
    {
      id: 'cgv_master_phy_1',
      sources: [
        'NCERT Class 11 Physics Part-1 (Chapter 2: Units and Measurement / मात्रक और मापन)',
        'Bureau of International Weights and Measures (BIPM) SI Brochure (9th Edition)',
        'Concepts of Physics (Vol 1) - Dr. H.C. Verma (Chapter 1: Introduction to Physics)',
        'Lucent General Science (Physics - Units, Dimensions and Measuring Instruments)',
        'CGPSC एवं CG Vyapam विगत 10 वर्षों के सामान्य विज्ञान हल प्रश्न पत्र'
      ],
      curatorNotes: 'भौतिक राशियों, मात्रकों एवं विमीय सूत्रों का यह अध्याय भौतिकी का आधारस्तंभ है। CGPSC व CG Vyapam में SI मूल मात्रकों, प्रकाश वर्ष, पारसेक, विमीय सूत्रों तथा मापक उपकरणों से प्रतिवर्ष प्रश्न पूछे जाते हैं।'
    },
    {
      id: 'cgv_master_phy_2',
      sources: [
        'NCERT Class 9 Science (Chapter 8: Motion / गति)',
        'NCERT Class 11 Physics Part-1 (Chapter 3: Motion in a Straight Line & Chapter 4: Motion in a Plane)',
        'Concepts of Physics (Vol 1) - Dr. H.C. Verma (Chapter 3: Rest and Motion: Kinematics)',
        'Lucent General Science (Physics - Kinematics & Mechanics)',
        'CGPSC एवं CG Vyapam विगत 10 वर्षों के सामान्य विज्ञान हल प्रश्न पत्र'
      ],
      curatorNotes: 'सरल रेखा में गति (Kinematics) भौतिकी का सर्वाधिक व्यावहारिक भाग है। CGPSC और व्यापम परीक्षाओं में दूरी-विस्थापन अनुपात, औसत चाल के हरात्मक सूत्र, गति के तीन समीकरण, मुक्त पतन तथा प्रक्षेप्य के 45° कोण से लगातार प्रश्न पूछे जाते हैं।'
    },
    {
      id: 'cgv_master_phy_3',
      sources: [
        'NCERT Class 9 Science (Chapter 9: Force and Laws of Motion / बल तथा गति के नियम)',
        'NCERT Class 11 Physics Part-1 (Chapter 5: Laws of Motion / गति के नियम)',
        'Concepts of Physics (Vol 1) - Dr. H.C. Verma (Chapter 5: Newton\'s Laws of Motion)',
        'Lucent General Science (Physics - Mechanics & Newton\'s Laws)',
        'CGPSC एवं CG Vyapam विगत 10 वर्षों के सामान्य विज्ञान हल प्रश्न पत्र'
      ],
      curatorNotes: 'न्यूटन के गति नियम यांत्रिकी की रीढ़ हैं। परीक्षा में जड़त्व के नियम (गैलीलियो का नियम), F = ma का निगमन, बंदूक का प्रतिक्षेप वेग, संवेग संरक्षण तथा घर्षण गुणांक से प्रश्न आते हैं।'
    },
    {
      id: 'cgv_master_phy_4',
      sources: [
        'NCERT Class 9 Science (Chapter 11: Work and Energy / कार्य तथा ऊर्जा)',
        'NCERT Class 11 Physics Part-1 (Chapter 6: Work, Energy and Power / कार्य, ऊर्जा और शक्ति)',
        'Concepts of Physics (Vol 1) - Dr. H.C. Verma (Chapter 6: Work and Energy)',
        'Lucent General Science (Physics - Work, Power and Energy)',
        'CGPSC एवं CG Vyapam विगत 10 वर्षों के सामान्य विज्ञान हल प्रश्न पत्र'
      ],
      curatorNotes: 'कार्य, ऊर्जा एवं शक्ति सर्वाधिक स्कोरिंग अध्यायों में से एक है। CGPSC व व्यापम परीक्षाओं में कार्य-ऊर्जा प्रमेय, शून्य कार्य की स्थितियां, गतिज ऊर्जा-संवेग संबंध तथा व्यावसायिक मात्रक (1 HP = 746 W, 1 kWh = 3.6 MJ) से लगातार प्रश्न आते हैं।'
    }
  ];

  for (const item of updates) {
    const docRef = db.collection('topic_study_notes').doc(item.id);
    const snap = await docRef.get();
    if (snap.exists) {
      const d = snap.data();
      d.studyNotes.sources = item.sources;
      d.studyNotes.curatorNotes = item.curatorNotes;
      d.updatedAt = new Date().toISOString();
      await docRef.set(d);
      console.log(`Updated ${item.id} sources and curatorNotes! ✅`);
    }
  }
}

cleanAllSources().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
