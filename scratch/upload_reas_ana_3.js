const path = require('path');
const admin = require(path.resolve(process.cwd(), 'server/node_modules/firebase-admin'));
const serviceAccount = require(path.resolve(process.cwd(), 'server/service-account.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

function sanitizeForFirestore(obj) {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (Array.isArray(item)) {
        return { cells: item.map(cell => (cell === undefined ? null : cell)) };
      }
      return sanitizeForFirestore(item);
    });
  }
  if (typeof obj === 'object') {
    const sanitized = {};
    for (const key of Object.keys(obj)) {
      sanitized[key] = sanitizeForFirestore(obj[key]);
    }
    return sanitized;
  }
  return obj;
}

async function markTopicCompleted(subjectId, chapterId, topicId) {
  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (!doc.exists) return;
  const data = doc.data();
  const sub = data.subjects.find(s => s.id === subjectId);
  if (!sub) return;
  const ch = sub.chapters.find(c => c.id === chapterId);
  if (!ch) return;
  const top = ch.topics.find(t => t.id === topicId);
  if (top) {
    top.hasStudyNotes = true;
    await syllabusRef.set(data, { merge: true });
    console.log(`[Syllabus Synced] hasStudyNotes: true for ${topicId}`);
  }
}

const reas_ana_3_data = {
  topicId: "reas_ana_3",
  topicName: "Logical Classification",
  topicNameHi: "तार्किक वर्गीकरण / संकल्पना आधारित वर्गीकरण",
  chapterId: "cgv_master_sub_4_ch_2",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "तार्किक वर्गीकरण (Logical / Conceptual Classification) साधारण वर्गीकरण का एक उच्च-स्तरीय एवं संश्लेषित रूप है, जिसमें शब्दों, अवधारणाओं या घटनाओं को उनके व्यावहारिक उपयोग, प्रशासनिक पदानुक्रम (Administrative Hierarchy), कालानुक्रमिक क्रम (Chronology), तार्किक समावेशन (Inclusion/Subset relations) अथवा दार्शनिक/वैज्ञानिक सिद्धांतों के आधार पर परखा जाता है। इसमें केवल बाहरी रूप-रंग या सतही समानता के बजाय अवधारणात्मक गहराई (Conceptual Depth) के आधार पर असंगत पद का चयन किया जाता है।",
    importance: "CG Vyapam (सहायक विकास विस्तार अधिकारी - ADEO, श्रम निरीक्षक, उप-अभियंता, संयुक्त भर्ती) तथा CGPSC CSAT व मुख्य परीक्षा में तार्किक वर्गीकरण से 2 से 3 विश्लेषणात्मक प्रश्न पूछे जाते हैं। यह टॉपिक प्रशासनिक सेवा के अभ्यर्थियों की नीतिगत समझ, श्रेणीबद्ध सोच और तार्किक निर्णय क्षमता का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में प्रशासनिक पदक्रम (जैसे मुख्य सचिव, संभागायुक्त, कलेक्टर, तहसीलदार), विधिक एवं संवैधानिक संस्थाएं (संवैधानिक बनाम संविधिक), समय-माप एवं कालखंड (दशक, सदी, सहस्राब्दी), ऊर्जा के स्रोत (नवीकरणीय बनाम अनवीकरणीय), तथा सामाजिक/आर्थिक अवधारणाओं के आधार पर वर्गीकरण के प्रश्न विशेष रूप से आते हैं।",
    quickFacts: [
      "संकल्पनात्मक वर्गीकरण का आधार: सतही समानता के स्थान पर 'सैद्धांतिक मूल' (Foundational Principle) की तुलना की जाती है।",
      "संवैधानिक बनाम सांविधिक निकाय: निर्वाचन आयोग और वित्त आयोग संवैधानिक (Constitutional) हैं, जबकि मानवाधिकार आयोग और नीति आयोग गैर-संवैधानिक/सांविधिक हैं।",
      "प्रशासनिक पदानुक्रम: राज्य प्रशासन का क्रम: मुख्य सचिव $\\to$ संभागायुक्त $\\to$ कलेक्टर (DM) $\\to$ अनुविभागीय अधिकारी (SDM) $\\to$ तहसीलदार $\\to$ नायब तहसीलदार $\\to$ पटवारी।",
      "ऊर्जा स्रोत वर्गीकरण: सौर, पवन, जल, भूतापीय (नवीकरणीय/अक्षय ऊर्जा); कोयला, पेट्रोलियम, प्राकृतिक गैस (अनवीकरणीय/जीवाश्म ईंधन)।",
      "छत्तीसगढ़ प्रशासनिक संरचना: 5 संभाग (Divisions), 33 जिले, विकासखंड (Blocks) और तहसील स्तर की संकल्पना पर प्रश्न आते हैं।"
    ]
  },
  chapters: [
    {
      id: "ch1_admin_legal_classification",
      title: "प्रशासनिक एवं विधिक संकल्पना वर्गीकरण (Administrative & Legal Classification)",
      content: `### 1. प्रशासनिक एवं विधिक संकल्पना आधारित वर्गीकरण

इस खंड में शासन व्यवस्था, न्यायपालिका और प्रशासनिक पदों के पदानुक्रम पर आधारित प्रश्न पूछे जाते हैं:

#### 1. प्रशासनिक पदक्रम (Administrative Hierarchy):
- **राज्य प्रशासनिक स्तर:**
  - मुख्य सचिव (Chief Secretary) $\\to$ अतिरिक्त मुख्य सचिव $\\to$ प्रमुख सचिव $\\to$ संभागायुक्त (Divisional Commissioner) $\\to$ जिला कलेक्टर (District Collector) $\\to$ अनुविभागीय दंडाधिकारी (SDM) $\\to$ तहसीलदार $\\to$ नायब तहसीलदार $\\to$ राजस्व निरीक्षक (RI) $\\to$ पटवारी।
- **प्रश्न प्रारूप:** *संभागायुक्त, जिला कलेक्टर, तहसीलदार, नगर निगम आयुक्त*
  - प्रथम तीन सामान्य प्रशासनिक एवं राजस्व पदक्रम की एक सीधी शृंखला हैं, जबकि नगर निगम आयुक्त स्थानीय शहरी निकाय (Urban Local Body) का पद है।

#### 2. संवैधानिक बनाम सांविधिक संस्थाएं (Constitutional vs Statutory Bodies):
- **संवैधानिक संस्थाएं (संविधान के अनुच्छेदों में उल्लेख):**
  - भारत का निर्वाचन आयोग (अनुच्छेद 324)
  - संघ लोक सेवा आयोग / CGPSC (अनुच्छेद 315)
  - भारत का नियंत्रक एवं महालेखापरीक्षक - CAG (अनुच्छेद 148)
  - वित्त आयोग (अनुच्छेद 280)
- **सांविधिक / गैर-संवैधानिक संस्थाएं (संसद/विधानमंडल के अधिनियम द्वारा स्थापित):**
  - राष्ट्रीय मानवाधिकार आयोग (NHRC)
  - केंद्रीय सूचना आयोग (CIC)
  - नीति आयोग (मंत्रिमंडल के प्रस्ताव द्वारा)
  - राष्ट्रीय महिला आयोग
- **वर्गीकरण प्रश्न:** *निर्वाचन आयोग, संघ लोक सेवा आयोग, वित्त आयोग, नीति आयोग* $\\implies$ विषम पद: **नीति आयोग** (क्योंकि यह गैर-संवैधानिक/कार्यकारी निकाय है, अन्य तीनों संवैधानिक हैं)।`
    },
    {
      id: "ch2_scientific_ecological_classification",
      title: "वैज्ञानिक, पर्यावरणीय एवं ऊर्जा संकल्पनाएं (Scientific & Ecological Concepts)",
      content: `### 2. विज्ञान एवं पारिस्थितिकी संकल्पना वर्गीकरण

#### 1. ऊर्जा के स्रोत (Energy Sources):
- **नवीकरणीय / अक्षय ऊर्जा (Renewable / Green Energy):**
  - सौर ऊर्जा (Solar Energy)
  - पवन ऊर्जा (Wind Energy)
  - जल विद्युत (Hydro Energy)
  - भूतापीय ऊर्जा (Geothermal Energy)
  - बायोगैस (Biomass)
- **अनवीकरणीय / जीवाश्म ऊर्जा (Non-Renewable / Fossil Fuels):**
  - कोयला (Coal)
  - पेट्रोलियम / कच्चा तेल (Petroleum)
  - प्राकृतिक गैस (Natural Gas)
  - यूरेनियम / परमाणु ईंधन
- **वर्गीकरण प्रश्न:** *सौर ऊर्जा, पवन ऊर्जा, भूतापीय ऊर्जा, प्राकृतिक गैस* $\\implies$ विषम पद: **प्राकृतिक गैस** (जीवाश्म ईंधन है)।

#### 2. पारिस्थितिक स्तर (Trophic Levels & Ecology):
- **उत्पादक (Producers):** हरे पौधे, शैवाल, नील-हरित शैवाल (स्वपोषी)।
- **प्राथमिक उपभोक्ता (Primary Consumers - शाकाहारी):** हिरण, खरगोश, गाय, टिड्डा।
- **द्वितीयक/तृतीयक उपभोक्ता (मांभाहारी):** मेंढक, सांप, भेड़िया, बाघ।
- **अपघटक (Decomposers):** जीवाणु (Bacteria), कवक (Fungi)।
- **प्रश्न:** *घास, पेड़, शैवाल, मशरूम* $\\implies$ विषम पद: **मशरूम** (कवक है जो मृतोपजीवी है, अन्य प्रकाश-संश्लेषण करने वाले स्वपोषी उत्पादक हैं)।`
    },
    {
      id: "ch3_socio_economic_concepts",
      title: "सामाजिक, आर्थिक एवं बैंकिंग संकल्पनाएं (Socio-Economic & Banking Concepts)",
      content: `### 3. सामाजिक, आर्थिक एवं वित्तीय संकल्पना वर्गीकरण

#### 1. अर्थव्यवस्था के क्षेत्र (Sectors of Economy):
- **प्राथमिक क्षेत्र (Primary Sector):** कृषि, वानिकी, मत्स्य पालन, खनन एवं उत्खनन।
- **द्वितीयक क्षेत्र (Secondary Sector):** विनिर्माण (Manufacturing), निर्माण (Construction), विद्युत, गैस एवं जल आपूर्ति।
- **तृतीयक क्षेत्र / सेवा क्षेत्र (Tertiary Sector):** बैंकिंग, बीमा, शिक्षा, चिकित्सा, परिवहन, संचार, पर्यटन।
- **प्रश्न:** *कृषि, डेयरी, वानिकी, कपड़ा उद्योग* $\\implies$ विषम पद: **कपड़ा उद्योग** (द्वितीयक विनिर्माण क्षेत्र है, अन्य प्राथमिक क्षेत्र हैं)।

#### 2. वित्तीय संस्थाएं एवं नियामक (Financial Regulators):
- RBI (भारतीय रिजर्व बैंक - बैंकों का नियामक)
- SEBI (पूंजी बाजार / शेयर बाजार का नियामक)
- IRDAI (बीमा क्षेत्र का नियामक)
- PFRDA (पेंशन क्षेत्र का नियामक)
- **विषम प्रश्न:** *RBI, SEBI, IRDAI, SBI* $\\implies$ विषम पद: **SBI** (यह एक वाणिज्यिक बैंक है, जबकि अन्य तीनों नियामक निकाय हैं)।`
    },
    {
      id: "ch4_chronological_process_classification",
      title: "कालानुक्रमिक एवं प्रक्रियात्मक वर्गीकरण (Chronological & Process Concepts)",
      content: `### 4. प्रक्रिया एवं समय-क्रम आधारित संकल्पनाएं

#### 1. जीवन चक्र एवं विकास प्रक्रियाएं (Developmental Stages):
- **तितली का जीवन चक्र:** अंडा (Egg) $\\to$ लार्वा / कैटरपिलर $\\to$ प्यूपा / कोकून $\\to$ वयस्क (Imago/Adult)।
- **पौधे का विकास:** बीज $\\to$ अंकुरण $\\to$ नवोद्भिद $\\to$ पौधा $\\to$ वृक्ष $\\to$ फूल $\\to$ फल।
- प्रक्रिया में जो पद किसी अन्य चरण का हो, वह विषम होता है।

#### 2. समय-माप इकाइयाँ (Time Increments):
- सेकंड, मिनट, घंटा (मानक दैनिक समय)।
- पखवाड़ा (Fortnight - 15 दिन), माह (30/31 दिन), ऋतु (2 माह), वर्ष (365 दिन)।
- दशक (Decade - 10 वर्ष), रजत जयंती (Silver Jubilee - 25 वर्ष), स्वर्ण जयंती (Golden Jubilee - 50 वर्ष), शताब्दी (Century - 100 वर्ष), सहस्राब्दी (Millennium - 1000 वर्ष)।
- **प्रश्न:** *दशक, शताब्दी, सहस्राब्दी, प्रकाश वर्ष* $\\implies$ विषम पद: **प्रकाश वर्ष** (यह दूरी का मात्रक है, समय का नहीं!)।`
    },
    {
      id: "ch5_cg_panchayat_admin_concepts",
      title: "छत्तीसगढ़ पंचायती राज एवं स्थानीय निकाय संकल्पना (CG Panchayati Raj Concepts)",
      content: `### 5. छत्तीसगढ़ पंचायती राज एवं नगरीय प्रशासन का तार्किक वर्गीकरण

व्यापम की परीक्षाओं (विशेष रूप से ADEO और पटवारी) में पंचायती राज पर आधारित संकल्पनात्मक वर्गीकरण के प्रश्न अक्सर पूछे जाते हैं:

#### 1. त्रि-स्तरीय पंचायती राज संरचना:
- **ग्राम पंचायत (निम्न स्तर):** प्रधान/सरपंच + पंच (वार्ड स्तर)। सचिव (शासकीय कर्मचारी)।
- **जनपद पंचायत (मध्यवर्ती/विकासखंड स्तर):** अध्यक्ष + उपाध्यक्ष + बीडीसी (BDC)। सीईओ जनपद (शासकीय)।
- **जिला पंचायत (शीर्ष स्तर):** अध्यक्ष + उपाध्यक्ष + जिला पंचायत सदस्य। सीईओ जिला पंचायत / IAS (शासकीय)।
- **प्रश्न:** *सरपंच, जनपद अध्यक्ष, जिला पंचायत अध्यक्ष, महापौर* $\\implies$ विषम पद: **महापौर (Mayor)** (क्योंकि यह नगरीय निकाय / नगर निगम का प्रमुख है, अन्य तीनों ग्रामीण पंचायती राज के हैं)।

#### 2. नगरीय निकाय संरचना (74वां संविधान संशोधन):
- नगर पंचायत (संक्रमणकालीन क्षेत्र)
- नगरपालिका परिषद (लघुतर नगरीय क्षेत्र)
- नगर पालिक निगम (वृहत्तर नगरीय क्षेत्र)
- **विषम प्रश्न:** *नगर निगम, नगरपालिका, नगर पंचायत, जनपद पंचायत* $\\implies$ विषम पद: **जनपद पंचायत** (पंचायती राज का अंग है, अन्य नगरीय निकाय हैं)।`
    }
  ],
  comparativeTables: [
    {
      title: "संवैधानिक बनाम सांविधिक एवं कार्यकारी निकाय",
      headers: ["निकाय / आयोग", "प्रकृति (Nature)", "संविधान का अनुच्छेद / अधिनियम", "वर्गीकरण समूह"],
      rows: [
        { cells: ["भारत का निर्वाचन आयोग", "संवैधानिक (Constitutional)", "अनुच्छेद 324", "संवैधानिक समूह"] },
        { cells: ["संघ लोक सेवा आयोग (UPSC)", "संवैधानिक (Constitutional)", "अनुच्छेद 315", "संवैधानिक समूह"] },
        { cells: ["वित्त आयोग (Finance Commission)", "संवैधानिक (Constitutional)", "अनुच्छेद 280", "संवैधानिक समूह"] },
        { cells: ["राष्ट्रीय मानवाधिकार आयोग (NHRC)", "सांविधिक (Statutory)", "मानवाधिकार संरक्षण अधिनियम, 1993", "गैर-संवैधानिक / सांविधिक"] },
        { cells: ["नीति आयोग (NITI Aayog)", "कार्यकारी निकाय (Executive)", "मंत्रिमंडल प्रस्ताव (1 जनवरी 2015)", "गैर-संवैधानिक / कार्यकारी"] }
      ]
    },
    {
      title: "ऊर्जा स्रोतों का संकल्पनात्मक वर्गीकरण",
      headers: ["ऊर्जा का प्रकार", "स्रोत", "पर्यावरणीय प्रभाव", "समाप्यता (Depletion)"],
      rows: [
        { cells: ["सौर ऊर्जा (Solar)", "सूर्य की किरणें (Photovoltaic)", "शून्य कार्बन उत्सर्जन (हरित)", "अक्षय / असीमित"] },
        { cells: ["पवन ऊर्जा (Wind)", "वायु प्रवाह (Wind Turbine)", "प्रदूषण मुक्त", "अक्षय / असीमित"] },
        { cells: ["जल विद्युत (Hydro)", "बहता जल / बांध", "न्यूनतम प्रदूषण", "नवीकरणीय"] },
        { cells: ["कोयला (Coal)", "जीवाश्म तलछट", "उच्च कार्बन उत्सर्जन (प्रदूषक)", "अनवीकरणीय / सीमित"] },
        { cells: ["पेट्रोलियम (Crude Oil)", "जीवाश्म हाइड्रोकार्बन", "ग्रीनहाउस गैस उत्सर्जन", "अनवीकरणीय / सीमित"] }
      ]
    },
    {
      title: "अर्थव्यवस्था के प्राथमिक, द्वितीयक एवं तृतीयक क्षेत्र",
      headers: ["क्षेत्र (Sector)", "मूल गतिविधि", "उदाहरण गतिविधियां", "संकल्पनात्मक आधार"],
      rows: [
        { cells: ["प्राथमिक क्षेत्र", "प्राकृतिक संसाधनों का सीधा दोहन", "कृषि, मत्स्य, वानिकी, खनन", "कच्चा माल उत्पादक"] },
        { cells: ["द्वितीयक क्षेत्र", "कच्चे माल का मूल्यवर्धन / प्रसंस्करण", "विनिर्माण उद्योग, कपड़ा, इस्पात, निर्माण", "औद्योगिक क्षेत्र"] },
        { cells: ["तृतीयक क्षेत्र", "सेवाओं का उत्पादन एवं संचरण", "बैंकिंग, बीमा, परिवहन, संचार, स्वास्थ्य", "सेवा क्षेत्र (अमूर्त)"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "संवैधानिक संकल्पना: निम्नलिखित में से कौन सा एक अन्य तीन से भिन्न है? [CG Vyapam ADEO Exam]",
      options: ["नीति आयोग", "निर्वाचन आयोग", "वित्त आयोग", "संघ लोक सेवा आयोग"],
      correctOption: 0,
      examName: "CG Vyapam ADEO",
      explanation: "निर्वाचन आयोग (अनुच्छेद 324), वित्त आयोग (अनुच्छेद 280) और संघ लोक सेवा आयोग (अनुच्छेद 315) तीनों भारतीय संविधान द्वारा स्थापित 'संवैधानिक निकाय' (Constitutional Bodies) हैं। जबकि नीति आयोग (NITI Aayog) एक गैर-संवैधानिक एवं मंत्रिमंडलीय प्रस्ताव द्वारा गठित कार्यकारी निकाय है। अतः नीति आयोग विषम पद है।"
    },
    {
      id: "pyq2",
      question: "पारिस्थितिकी संकल्पना: निम्नलिखित में से विषम का चयन करें: घास, नीम का पेड़, शैवाल, मशरूम [CG Vyapam Subedar / SI Prelims]",
      options: ["मशरूम", "घास", "नीम का पेड़", "शैवाल"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "घास, नीम का पेड़ और शैवाल (Algae) तीनों पर्णहरिम (Chlorophyll) युक्त स्वपोषी (Autotrophic) उत्पादक हैं जो प्रकाश संश्लेषण करते हैं। जबकि मशरूम (Mushroom) एक कवक (Fungus) है जिसमें क्लोरोफिल नहीं होता और यह मृतोपजीवी (Saprotroph) है। अतः मशरूम विषम पद है।"
    },
    {
      id: "pyq3",
      question: "ऊर्जा स्रोत वर्गीकरण: निम्नलिखित में से असंगत विकल्प चुनिए: सौर ऊर्जा, पवन ऊर्जा, ज्वारीय ऊर्जा, प्राकृतिक गैस [CGPSC CSAT]",
      options: ["प्राकृतिक गैस", "सौर ऊर्जा", "पवन ऊर्जा", "ज्वारीय ऊर्जा"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "सौर ऊर्जा, पवन ऊर्जा और ज्वारीय ऊर्जा तीनों अक्षय / नवीकरणीय ऊर्जा (Renewable Green Energy) के स्रोत हैं। जबकि प्राकृतिक गैस एक जीवाश्म ईंधन (Fossil Fuel) एवं अनवीकरणीय ऊर्जा स्रोत है। अतः प्राकृतिक गैस विषम है।"
    },
    {
      id: "pyq4",
      question: "पंचायती राज वर्गीकरण: निम्नलिखित में से विषम पद ज्ञात कीजिए: सरपंच, जनपद पंचायत अध्यक्ष, जिला पंचायत अध्यक्ष, महापौर [CG Vyapam Patwari Exam]",
      options: ["महापौर", "सरपंच", "जनपद पंचायत अध्यक्ष", "जिला पंचायत अध्यक्ष"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "सरपंच (ग्राम पंचायत), जनपद पंचायत अध्यक्ष (विकासखंड) और जिला पंचायत अध्यक्ष (जिला स्तर) तीनों 73वें संविधान संशोधन के तहत ग्रामीण त्रि-स्तरीय पंचायती राज व्यवस्था के निर्वाचित प्रमुख हैं। जबकि महापौर (Mayor) 74वें संशोधन के तहत नगरीय स्थानीय निकाय (नगर पालिक निगम) का राजनीतिक प्रमुख होता है। अतः महापौर विषम है।"
    },
    {
      id: "pyq5",
      question: "भौतिकी संकल्पना: निम्नलिखित में से विषम राशि का चयन कीजिए: वेग, बल, संवेग, चाल [CG Vyapam Sub Engineer]",
      options: ["चाल", "वेग", "बल", "संवेग"],
      correctOption: 0,
      examName: "CG Vyapam Sub Engineer",
      explanation: "वेग (Velocity), बल (Force) और संवेग (Momentum) तीनों सदिश राशियां (Vector Quantities) हैं जिनमें परिमाण के साथ दिशा भी होती है। जबकि चाल (Speed) एक अदिश राशि (Scalar Quantity) है जिसमें केवल परिमाण होता है। अतः चाल विषम पद है।"
    },
    {
      id: "pyq6",
      question: "आर्थिक संकल्पना: निम्नलिखित में से कौन सा प्राथमिक क्षेत्र से संबंधित नहीं है? वानिकी, मत्स्य पालन, खनन, चीनी मिल [CG Vyapam Revenue Inspector]",
      options: ["चीनी मिल", "वानिकी", "मत्स्य पालन", "खनन"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "वानिकी (Forestry), मत्स्य पालन (Fishing) और खनन (Mining) तीनों अर्थव्यवस्था के प्राथमिक क्षेत्र (Primary Sector) के अंतर्गत आते हैं। जबकि चीनी मिल (Sugar Mill) एक प्रसंस्करण एवं विनिर्माण उद्योग होने के कारण द्वितीयक क्षेत्र (Secondary Sector) में आता है। अतः चीनी मिल विषम है।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "मापन संकल्पना: निम्नलिखित में से कौन सा समय का मात्रक नहीं है? वर्ष, अधिवर्ष (Leap year), प्रकाश वर्ष, चंद्रमाह",
      options: ["प्रकाश वर्ष", "वर्ष", "अधिवर्ष", "चंद्रमाह"],
      correctOption: 0,
      explanation: "वर्ष, अधिवर्ष और चंद्रमाह (Lunar Month) तीनों समय के मात्रक हैं। जबकि प्रकाश वर्ष (Light Year) खगोलीय पिंडों के बीच की 'दूरी' (Distance) मापने का मात्रक है, समय का नहीं।"
    },
    {
      id: "mcq2",
      question: "वित्तीय संकल्पना: निम्नलिखित चार में से विषम का चयन करें: RBI, SEBI, IRDAI, PNB",
      options: ["PNB", "RBI", "SEBI", "IRDAI"],
      correctOption: 0,
      explanation: "RBI (केंद्रीय बैंक/बैंकिंग नियामक), SEBI (पूंजी बाजार नियामक) और IRDAI (बीमा क्षेत्र नियामक) तीनों नियामक संस्थाएं (Regulatory Bodies) हैं। जबकि PNB (पंजाब नेशनल बैंक) एक सार्वजनिक क्षेत्र का वाणिज्यिक बैंक (Commercial Bank) है।"
    },
    {
      id: "mcq3",
      question: "रोग संकल्पना: निम्नलिखित में से कौन सा रोग जीवाणु (Bacteria) जनित नहीं है? हैजा, टिटनेस, टाइफाइड, पोलियो",
      options: ["पोलियो", "हैजा", "टिटनेस", "टाइफाइड"],
      correctOption: 0,
      explanation: "हैजा (Vibrio cholerae), टिटनेस (Clostridium tetani) और टाइफाइड (Salmonella typhi) तीनों जीवाणु जनित (Bacterial) रोग हैं। जबकि पोलियो (Poliomyelitis) एक विषाणु जनित (Viral) रोग है।"
    },
    {
      id: "mcq4",
      question: "प्रशासनिक पदक्रम: राज्य स्तर पर पदानुक्रम में सर्वोच्च पद कौन सा है? पुलिस महानिदेशक, संभागायुक्त, मुख्य सचिव, महाधिवक्ता",
      options: ["मुख्य सचिव", "पुलिस महानिदेशक", "संभागायुक्त", "महाधिवक्ता"],
      correctOption: 0,
      explanation: "मुख्य सचिव (Chief Secretary) राज्य के संपूर्ण प्रशासनिक ढांचे का सर्वोच्च प्रशासनिक अधिकारी और कैबिनेट का सचिव होता है।"
    },
    {
      id: "mcq5",
      question: "रसायन विज्ञान संकल्पना: निम्नलिखित में से कौन सा एक भौतिक परिवर्तन है? लोहे में जंग लगना, दूध से दही बनना, मोमबत्ती का पिघलना, भोजन का पचना",
      options: ["मोमबत्ती का पिघलना", "लोहे में जंग लगना", "दूध से दही बनना", "भोजन का पचना"],
      correctOption: 0,
      explanation: "मोमबत्ती का पिघलना (Melting of wax) केवल अवस्था परिवर्तन है जो एक भौतिक परिवर्तन (Physical Change) है। जबकि अन्य तीनों रासायनिक परिवर्तन (Chemical Changes) हैं जिनमें नए पदार्थ बनते हैं।"
    },
    {
      id: "mcq6",
      question: "पारिस्थितिक खाद्य जाल: विषम पद चुनिए: मेंढक, टिड्डा, हिरण, खरगोश",
      options: ["मेंढक", "टिड्डा", "हिरण", "खरगोश"],
      correctOption: 0,
      explanation: "टिड्डा, हिरण और खरगोश तीनों प्राथमिक उपभोक्ता (शाकाहारी) हैं जो सीधे पौधों को खाते हैं। जबकि मेंढक एक द्वितीयक उपभोक्ता (मांभाहारी) है जो कीड़े-मकोड़ों को खाता है।"
    },
    {
      id: "mcq7",
      question: "छत्तीसगढ़ प्रशासन: निम्नलिखित में से कौन सा संभाग (Division) नहीं है? बस्तर, दुर्ग, सरगुजा, रायगढ़",
      options: ["रायगढ़", "बस्तर", "दुर्ग", "सरगुजा"],
      correctOption: 0,
      explanation: "छत्तीसगढ़ में 5 प्रशासनिक संभाग हैं: रायपुर, बिलासपुर, बस्तर, सरगुजा और दुर्ग। रायगढ़ एक जिला है जो बिलासपुर संभाग के अंतर्गत आता है, यह स्वतंत्र संभाग नहीं है।"
    },
    {
      id: "mcq8",
      question: "सौरमंडल संकल्पना: निम्नलिखित में से किसे 'पार्थिव/आंतरिक ग्रह' (Terrestrial Planet) नहीं माना जाता? बुध, शुक्र, मंगल, शनि",
      options: ["शनि", "बुध", "शुक्र", "मंगल"],
      correctOption: 0,
      explanation: "बुध, शुक्र, पृथ्वी और मंगल चारों सूर्य के निकटवर्ती चट्टानी 'आंतरिक/पार्थिव ग्रह' (Inner/Terrestrial Planets) हैं। जबकि शनि, बृहस्पति, यूरेनस और नेपच्यून 'जोवियन/गैसीय विशाल ग्रह' (Gas Giants) हैं।"
    }
  ],
  keyTerminology: [
    {
      term: "Logical Classification",
      termHi: "तार्किक / संकल्पनात्मक वर्गीकरण",
      definition: "Categorization based on abstract theoretical principles, constitutional mandates, or systemic hierarchies.",
      definitionHi: "सतही लक्षणों के बजाय संवैधानिक प्रावधानों, प्रशासनिक पदानुक्रम या वैज्ञानिक सिद्धांतों पर आधारित वर्गीकरण।"
    },
    {
      term: "Constitutional Body",
      termHi: "संवैधानिक निकाय",
      definition: "An authority or commission deriving its mandate directly from specific articles of the Constitution of India.",
      definitionHi: "वह आयोग या संस्था जिसका स्पष्ट उल्लेख भारतीय संविधान के अनुच्छेदों में है (उदा. निर्वाचन आयोग, वित्त आयोग)।"
    },
    {
      term: "Statutory Body",
      termHi: "सांविधिक निकाय",
      definition: "An institution created through an Act passed by the Parliament or State Legislature rather than the Constitution itself.",
      definitionHi: "संसद या राज्य विधानमंडल के कानून/अधिनियम द्वारा स्थापित स्वायत्त संस्था (उदा. राष्ट्रीय मानवाधिकार आयोग)।"
    },
    {
      term: "Scalar vs Vector",
      termHi: "अदिश बनाम सदिश राशि",
      definition: "The physical differentiation where Scalars possess only magnitude, whereas Vectors possess both magnitude and spatial direction.",
      definitionHi: "भौतिक विज्ञान की वह कसौटी जिसमें अदिश राशियों में केवल मान और सदिश राशियों में मान व दिशा दोनों होते हैं।"
    },
    {
      term: "Renewable Energy",
      termHi: "नवीकरणीय / अक्षय ऊर्जा",
      definition: "Energy derived from natural, regenerative assets that do not deplete over human timescales.",
      definitionHi: "प्राकृतिक स्रोतों (सूर्य, पवन, जल) से प्राप्त ऊर्जा जो निरंतर पुनर्चक्रित होती है और समाप्त नहीं होती।"
    },
    {
      term: "Trophic Classification",
      termHi: "पोषण स्तर वर्गीकरण",
      definition: "Grouping organisms in an ecosystem by their position in a food chain: producers, consumers, or decomposers.",
      definitionHi: "खाद्य श्रृंखला में जीवों को स्वपोषी उत्पादक, शाकाहारी प्राथमिक उपभोक्ता, मांसाहारी या अपघटक में बांटने की प्रणाली।"
    },
    {
      term: "Administrative Hierarchy",
      termHi: "प्रशासनिक पदानुक्रम",
      definition: "The strict echelon ranking executive and civil service officers from Chief Secretary down to village revenue personnel.",
      definitionHi: "मुख्य सचिव से लेकर पटवारी तक राज्य प्रशासन के अधिकारियों का सुनिश्चित श्रेणीबद्ध क्रम।"
    },
    {
      term: "Panchayati Raj Tier",
      termHi: "पंचायती राज स्तर",
      definition: "The constitutional 3-tier rural local governance structure consisting of Gram, Janpad, and Zila Panchayats.",
      definitionHi: "73वें संविधान संशोधन के अंतर्गत ग्राम, जनपद एवं जिला पंचायत की ग्रामीण स्थानीय स्वशासन प्रणाली।"
    }
  ],
  sources: [
    {
      title: "Analytical Reasoning: Conceptual Classification & Logic",
      author: "M.K. Pandey",
      description: "प्रशासनिक पदानुक्रम, विधिक संरचना और दार्शनिक संकल्पनाओं के आधार पर वर्गीकरण का विस्तृत संकलन।"
    },
    {
      title: "Indian Polity for Civil Services - Constitutional & Non-Constitutional Bodies",
      author: "M. Laxmikanth",
      description: "संवैधानिक, सांविधिक एवं कार्यकारी निकायों के विधिक वर्गीकरण का आधिकारिक प्रामाणिक संदर्भ।"
    },
    {
      title: "CG Vyapam General Mental Ability & Panchayat Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की परीक्षाओं (ADEO, पटवारी, आरआई) में पूछे गए वास्तविक संकल्पनात्मक प्रश्न।"
    },
    {
      title: "General Science for Competitive Examinations",
      author: "Lucent Publications",
      description: "भौतिक, रासायनिक, पारिस्थितिक और वानस्पतिक वर्गीकरण की वैज्ञानिक संकल्पनाएं।"
    }
  ],
  confusionBuster: [
    {
      misconception: "नीति आयोग एक संवैधानिक निकाय है क्योंकि इसका अध्यक्ष प्रधानमंत्री होता है।",
      clarification: "गलत! नीति आयोग का संविधान में कोई उल्लेख नहीं है; यह 1 जनवरी 2015 को केंद्रीय मंत्रिमंडल के एक कार्यकारी प्रस्ताव द्वारा गठित निकाय है।"
    },
    {
      misconception: "प्रकाश वर्ष समय का मात्रक है क्योंकि इसमें 'वर्ष' शब्द जुड़ा है।",
      clarification: "यह प्रतियोगी परीक्षाओं का सबसे प्रसिद्ध ट्रैप है! प्रकाश वर्ष (Light Year) समय का नहीं बल्कि खगोलीय 'दूरी' (Distance) का मात्रक है।"
    },
    {
      misconception: "मशरूम एक पौधा है क्योंकि यह जमीन पर उगता है।",
      clarification: "मशरूम पौधा (Plant) नहीं बल्कि कवक (Fungus) है। इसमें क्लोरोफिल नहीं होता और यह प्रकाश संश्लेषण नहीं कर सकता।"
    },
    {
      misconception: "रायगढ़ छत्तीसगढ़ का एक प्रशासनिक संभाग है।",
      clarification: "छत्तीसगढ़ में केवल 5 संभाग हैं (रायपुर, बिलासपुर, दुर्ग, बस्तर, सरगुजा)। रायगढ़ जिला बिलासपुर संभाग में आता है।"
    },
    {
      misconception: "खनन (Mining) उद्योग होने के कारण द्वितीयक क्षेत्र का हिस्सा है।",
      clarification: "खनन और उत्खनन सीधे प्राकृतिक संसाधनों का भूमि से निष्कर्षण होने के कारण 'प्राथमिक क्षेत्र' (Primary Sector) में वर्गीकृत होता है।"
    }
  ],
  faqList: [
    {
      question: "तार्किक वर्गीकरण और साधारण वर्गीकरण में क्या मुख्य अंतर है?",
      answer: "साधारण वर्गीकरण सतही विशेषताओं (जैसे रंग, आकार, संख्या) पर होता है, जबकि तार्किक वर्गीकरण संवैधानिक नियमों, वैज्ञानिक सिद्धांतों, पारिस्थितिकी और प्रशासनिक पदानुक्रम पर आधारित होता है।"
    },
    {
      question: "संवैधानिक निकाय (Constitutional Body) की पहचान कैसे करें?",
      answer: "जिस संस्था का उल्लेख संविधान के किसी विशिष्ट अनुच्छेद में हो (जैसे निर्वाचन आयोग - अनु. 324, UPSC - अनु. 315), वह संवैधानिक निकाय होती है।"
    },
    {
      question: "प्रकाश वर्ष किस प्रकार का मात्रक है?",
      answer: "प्रकाश वर्ष निर्वात में प्रकाश द्वारा एक वर्ष में तय की गई दूरी ($9.46 \\times 10^{12}$ किमी) है। यह दूरी का मात्रक है, समय का नहीं।"
    },
    {
      question: "छत्तीसगढ़ के पंचायती राज वर्गीकरण में किन पदों को शामिल किया जाता है?",
      answer: "त्रि-स्तरीय ग्रामीण ढांचे में सरपंच (ग्राम पंचायत), जनपद अध्यक्ष (जनपद पंचायत) और जिला पंचायत अध्यक्ष (जिला पंचायत) आते हैं; महापौर नगरीय निकाय का पद है।"
    },
    {
      question: "CG Vyapam में तार्किक वर्गीकरण का क्या महत्व है?",
      answer: "ADEO, पटवारी, श्रम निरीक्षक और सब-इंजीनियर जैसी परीक्षाओं में 2 से 3 प्रश्न सीधे संवैधानिक, पारिस्थितिक और प्रशासनिक संकल्पनाओं से पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "निर्वाचन आयोग व वित्त आयोग संवैधानिक हैं; नीति आयोग व मानवाधिकार आयोग गैर-संवैधानिक हैं।",
    "प्रकाश वर्ष समय का नहीं बल्कि खगोलीय दूरी का मात्रक है ($9.46 \\times 10^{15}$ मीटर)।",
    "मशरूम कवक (Fungus) है और मृतोपजीवी है, जबकि पौधे स्वपोषी उत्पादक होते हैं।",
    "चाल अदिश राशि है, जबकि वेग, बल और संवेग सदिश राशियां हैं।",
    "सौर, पवन और जल नवीकरणीय हैं; कोयला व प्राकृतिक गैस अनवीकरणीय जीवाश्म ईंधन हैं।",
    "महापौर नगरीय निकाय का प्रमुख है, जबकि सरपंच व जनपद अध्यक्ष पंचायती राज के अंग हैं।",
    "मोमबत्ती का पिघलना भौतिक परिवर्तन है, जबकि लोहे में जंग लगना रासायनिक परिवर्तन है।",
    "खनन, वानिकी और कृषि प्राथमिक क्षेत्र में आते हैं; चीनी मिल द्वितीयक विनिर्माण क्षेत्र है।",
    "पोलियो विषाणु जनित (Viral) है, जबकि हैजा व टाइफाइड जीवाणु जनित (Bacterial) रोग हैं।",
    "छत्तीसगढ़ में 5 संभाग हैं (रायपुर, बिलासपुर, दुर्ग, बस्तर, सरगुजा); रायगढ़ संभाग नहीं है।"
  ],
  rapidRevision: {
    points: [
      "Constitutional Check: Art. 324 (EC), Art. 280 (FC), Art. 315 (UPSC) vs NITI Aayog (Exec)।",
      "Distance Trap: Light Year = Distance ($9.46 \\times 10^{12}$ km), never Time।",
      "Biological Trophic: Fungus/Mushroom = Decomposer/Saprotroph, Algae = Producer।",
      "Physics Vectors: Velocity, Force, Momentum = Vectors; Speed = Scalar।",
      "CG Local Bodies: Mayor = Urban (74th Amdt); Sarpanch = Rural (73rd Amdt)।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_ana_3_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_ana_3');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_ana_3 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_2', 'reas_ana_3');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
