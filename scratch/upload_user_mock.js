const path = require('path');
const fs = require('fs');
require(path.join(__dirname, '../server/node_modules/dotenv')).config({ path: path.join(__dirname, '../server/.env') });
const { db } = require(path.join(__dirname, '../server/firebase-admin'));

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const rawTest = {
  "title": "CGPSC SSE Mock Test 2026 - Paper 1",
  "examId": "cgpsc_sse",
  "examName": "CGPSC SSE",
  "examIds": ["cgpsc_sse", "cgv_master"],
  "examNames": ["CGPSC SSE", "CG VYAPAM BASICS"],
  "subject": "All Subjects",
  "mode": "mock",
  "language": "hindi",
  "pattern": {
    "totalQuestions": 100,
    "totalMarks": 100,
    "durationMinutes": 120,
    "markingScheme": "+1 for correct, -0.25 for incorrect"
  },
  "questions": [
  {
    "qId": "MIX_001",
    "qType": "standard",
    "question": "भारतीय संविधान के किस अनुच्छेद के तहत 'राष्ट्रपति शासन' (President's Rule) लागू किया जाता है?",
    "options": ["अनुच्छेद 352", "अनुच्छेद 360", "अनुच्छेद 356", "अनुच्छेद 370"],
    "correctIndex": 2,
    "explanation": "अनुच्छेद 356 के तहत राज्यों में संवैधानिक तंत्र विफल होने पर राष्ट्रपति शासन लगाया जाता है। अनुच्छेद 352 राष्ट्रीय आपातकाल तथा 360 वित्तीय आपातकाल से संबंधित है।",
    "subject": "India GS",
    "difficulty": "easy",
    "topic": "भारतीय संविधान एवं राजव्यवस्था",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_002",
    "qType": "standard",
    "question": "छत्तीसगढ़ राज्य की स्थापना किस दिनांक को हुई थी?",
    "options": ["1 नवंबर 2000", "9 नवंबर 2000", "15 नवंबर 2000", "26 जनवरी 2001"],
    "correctIndex": 0,
    "explanation": "छत्तीसगढ़ राज्य का गठन मध्य प्रदेश पुनर्गठन अधिनियम 2000 के तहत 1 नवंबर 2000 को देश के 26वें राज्य के रूप में हुआ था।",
    "subject": "CG GS",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ का इतिहास एवं गठन",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_003",
    "qType": "standard",
    "question": "छत्तीसगढ़ी हाना 'अधरंग के गोठ, कुधरंग के चाली' का सही अर्थ क्या है?",
    "options": ["अत्यंत बुद्धिमानी की बात करना", "व्यर्थ या निरर्थक बातें एवं व्यवहार करना", "कठिन परिश्रम करना", "शांत होकर बैठना"],
    "correctIndex": 1,
    "explanation": "छत्तीसगढ़ी हाना 'अधरंग के गोठ, कुधरंग के चाली' का प्रयोग बेतुकी, व्यर्थ की बातें या अनुचित आचरण के लिए किया जाता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ी कहावतें (हाना)",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_004",
    "qType": "standard",
    "question": "यदि किसी कूट भाषा में 'CAT' को '3120' लिखा जाता है, तो 'DOG' को उसी भाषा में क्या लिखा जाएगा?",
    "options": ["4157", "4147", "3157", "4158"],
    "correctIndex": 0,
    "explanation": "वर्णमाला में अक्षरों के स्थान का मान लिखा गया है: C=3, A=1, T=20। उसी प्रकार D=4, O=15, G=7 अर्थात '4157'।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "कोडिंग-डिकोडिंग",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_005",
    "qType": "standard",
    "question": "एक व्यापारी ₹1200 की वस्तु को ₹1500 में बेचता है। उसका प्रतिशत लाभ ज्ञात कीजिए।",
    "options": ["20%", "30%", "25%", "15%"],
    "correctIndex": 2,
    "explanation": "लाभ = 1500 - 1200 = ₹300। लाभ % = (300 / 1200) * 100 = 25%।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "लाभ और हानि",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_006",
    "qType": "standard",
    "question": "निम्नलिखित में से 'सज्जन' शब्द का सही संधि-विच्छेद कौन-सा है?",
    "options": ["सम + जन", "सत् + जन", "सज + जन", "सद + जन"],
    "correctIndex": 1,
    "explanation": "सत् + जन = सज्जन। यह व्यंजन संधि का उदाहरण है जहाँ 'त्' के बाद 'ज्' आने पर 'त्' भी 'ज्' में बदल जाता है।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "व्यंजन संधि",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_007",
    "qType": "assertion_reason",
    "question": "निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-",
    "assertion": "1857 की क्रांति के समय भारत के गवर्नर जनरल लॉर्ड कैनिंग थे।",
    "reason": "लॉर्ड कैनिंग ही भारत के प्रथम वायसराय भी बने।",
    "options": [
      "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।",
      "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
      "[As] सत्य है, लेकिन [R] असत्य है।",
      "[As] असत्य है, लेकिन [R] सत्य है।"
    ],
    "correctIndex": 0,
    "explanation": "दोनों कथन ऐतिहासक रूप से सत्य हैं। 1858 के भारत सरकार अधिनियम द्वारा कैनिंग भारत के पहले वायसराय बने।",
    "subject": "India GS",
    "difficulty": "moderate",
    "topic": "आधुनिक भारत का इतिहास",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_008",
    "qType": "assertion_reason",
    "question": "निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-",
    "assertion": "छत्तीसगढ़ में 'महानदी' को छत्तीसगढ़ की जीवन रेखा (Lifeline) कहा जाता है।",
    "reason": "महानदी छत्तीसगढ़ राज्य के सर्वाधिक जल प्रवाह क्षेत्र को आच्छादित करती है।",
    "options": [
      "[As] सत्य है, लेकिन [R] असत्य है।",
      "[As] असत्य है, लेकिन [R] सत्य है।",
      "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
      "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।"
    ],
    "correctIndex": 2,
    "explanation": "महानदी अपवाह तंत्र छत्तीसगढ़ के लगभग 56.15% भाग में विस्तृत है और जल आपूर्ति का मुख्य स्रोत है, अतः कारण व्याख्या करता है।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ का भूगोल - अपवाह तंत्र",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_009",
    "qType": "match_column",
    "question": "छत्तीसगढ़ के प्रसिद्ध जलप्रपातों को उनकी नदियों से सुमेलित कीजिए-",
    "columnI": [
      "(a) चित्रकूट जलप्रपात",
      "(b) तीरथगढ़ जलप्रपात",
      "(c) अमृतधारा जलप्रपात",
      "(d) रानीदाह जलप्रपात"
    ],
    "columnII": [
      "(I) मुनगा बहार नदी",
      "(II) इंद्रावती नदी",
      "(III) कोइराज नदी",
      "(IV) हसदेव नदी"
    ],
    "options": [
      "a-I, b-II, c-III, d-IV",
      "a-II, b-I, c-IV, d-III",
      "a-III, b-IV, c-I, d-II",
      "a-IV, b-III, c-II, d-I"
    ],
    "correctIndex": 1,
    "explanation": "चित्रकूट (इंद्रावती), तीरथगढ़ (मुनगा बहार), अमृतधारा (हसदेव) तथा रानीदाह जलप्रपात (कोइराज नदी/जशपुर) पर स्थित है।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ की नदियाँ एवं जलप्रपात",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_010",
    "qType": "match_column",
    "question": "भारतीय इतिहास की प्रमुख घटनाओं को उनके वर्षों से सुमेलित कीजिए-",
    "columnI": [
      "(a) प्लासी का युद्ध",
      "(b) बक्सर का युद्ध",
      "(c) पानीपत का प्रथम युद्ध",
      "(d) हल्दीघाटी का युद्ध"
    ],
    "columnII": [
      "(I) 1526",
      "(II) 1757",
      "(III) 1576",
      "(IV) 1764"
    ],
    "options": [
      "a-II, b-IV, c-I, d-III",
      "a-I, b-II, c-III, d-IV",
      "a-IV, b-III, c-II, d-I",
      "a-II, b-I, c-IV, d-III"
    ],
    "correctIndex": 0,
    "explanation": "प्लासी (1757), बक्सर (1764), पानीपत प्रथम (1526), हल्दीघाटी युद्ध (1576)।",
    "subject": "India GS",
    "difficulty": "moderate",
    "topic": "भारतीय इतिहास के प्रमुख युद्ध",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_011",
    "qType": "ordering",
    "question": "छत्तीसगढ़ के कलचुरि शासकों को उनके कालानुक्रमिक (Chronological) क्रम में व्यवस्थित करें-",
    "statements": [
      "कलिंगराज",
      "रत्नदेव प्रथम",
      "पृथ्वीदेव प्रथम",
      "जाजल्लदेव प्रथम"
    ],
    "statementLabels": ["K1", "K2", "K3", "K4"],
    "options": [
      "K4 → K3 → K2 → K1",
      "K1 → K2 → K3 → K4",
      "K2 → K1 → K4 → K3",
      "K1 → K3 → K2 → K4"
    ],
    "correctIndex": 1,
    "explanation": "सही क्रम है: कलिंगराज (संस्थापक) → रत्नदेव प्रथम (तुम्माण से रतनपुर राजधानी) → पृथ्वीदेव प्रथम → जाजल्लदेव प्रथम।",
    "subject": "CG GS",
    "difficulty": "hard",
    "topic": "कलचुरि राजवंश",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_012",
    "qType": "ordering",
    "question": "दी गई संख्या श्रेणी को समझकर लुप्त संख्या (?) का मान ज्ञात करें - 2, 6, 12, 20, 30, ?",
    "statements": ["36", "40", "42", "48"],
    "statementLabels": ["A", "B", "C", "D"],
    "options": [
      "A",
      "B",
      "C",
      "D"
    ],
    "correctIndex": 2,
    "explanation": "अंतर का पैटर्न है: +4, +6, +8, +10, +12। अतः 30 + 12 = 42।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "संख्या श्रेणी (Number Series)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_013",
    "qType": "multi_statement",
    "question": "छत्तीसगढ़ की जनजातियों के संदर्भ में कौन-से कथन सत्य हैं?",
    "statements": [
      "गोंड छत्तीसगढ़ की सबसे बड़ी जनजाति है।",
      "बैगा जनजाति के प्रमुख देवता 'बूढ़ादेव' हैं।",
      "अबूझमाड़िया को 'विशेष पिछड़ी जनजाति' (PTG) का दर्जा प्राप्त है।",
      "सरहुल त्यौहार कुड़ुख/उरांव जनजाति द्वारा मनाया जाता है।"
    ],
    "statementLabels": ["T1", "T2", "T3", "T4"],
    "options": [
      "केवल T1 और T2",
      "केवल T2, T3 और T4",
      "T1, T2, T3 और T4 सभी",
      "केवल T1, T3 और T4"
    ],
    "correctIndex": 2,
    "explanation": "दिए गए सभी चारों कथन छत्तीसगढ़ की जनजातीय कला, संस्कृति और वर्गीकरण के संदर्भ में सत्य हैं।",
    "subject": "CG GS",
    "difficulty": "hard",
    "topic": "छत्तीसगढ़ की जनजातियाँ एवं संस्कृति",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_014",
    "qType": "multi_statement",
    "question": "भारतीय नीति आयोग (NITI Aayog) के संबंध में क्या सत्य है?",
    "statements": [
      "इसकी स्थापना 1 जनवरी 2015 को योजना आयोग के स्थान पर की गई।",
      "भारत के प्रधानमंत्री इसके पदेन अध्यक्ष (Ex-officio Chairman) होते हैं।",
      "यह एक संवैधानिक (Constitutional) निकाय है।",
      "यह 'सहकारी संघवाद' (Cooperative Federalism) के सिद्धांत पर कार्य करता है।"
    ],
    "statementLabels": ["N1", "N2", "N3", "N4"],
    "options": [
      "केवल N1, N2 और N4",
      "N1, N2, N3 और N4 सभी",
      "केवल N2 और N3",
      "केवल N1 और N4"
    ],
    "correctIndex": 0,
    "explanation": "नीति आयोग एक गैर-संवैधानिक (Non-Constitutional / Extra-Constitutional) और कार्यकारी निकाय है। कथन N3 असत्य है।",
    "subject": "India GS",
    "difficulty": "hard",
    "topic": "भारतीय अर्थशास्त्र एवं संस्थाएँ",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_015",
    "qType": "standard",
    "question": "छत्तीसगढ़ी व्याकरण में 'काँखर' शब्द का प्रयोग किस अर्थ में होता है?",
    "options": ["किसका", "कहाँ", "कब", "कैसे"],
    "correctIndex": 0,
    "explanation": "छत्तीसगढ़ी में प्रश्नवाचक सर्वनाम 'काँखर' का हिंदी अर्थ 'किसका / किसकी' होता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ी सर्वनाम एवं शब्दकोश",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_016",
    "qType": "standard",
    "question": "यदि किसी वृत्त की त्रिज्या को दोगुना कर दिया जाए, तो उसका क्षेत्रफल कितने गुना हो जाएगा?",
    "options": ["2 गुना", "3 गुना", "4 गुना", "8 गुना"],
    "correctIndex": 2,
    "explanation": "वृत्त का क्षेत्रफल A = πr²। जब r' = 2r, तो नया क्षेत्रफल A' = π(2r)² = 4(πr²) = 4A (अर्थात 4 गुना)।",
    "subject": "Mathematics",
    "difficulty": "moderate",
    "topic": "क्षेत्रमिति (Mensuration)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_017",
    "qType": "standard",
    "question": "हिंदी व्याकरण में 'यथाशक्ति' शब्द में कौन-सा समास प्रयुक्त है?",
    "options": ["तत्पुरुष समास", "अव्ययीभाव समास", "द्वंद्व समास", "कर्मधारय समास"],
    "correctIndex": 1,
    "explanation": "'यथाशक्ति' का विग्रह है 'शक्ति के अनुसार'। पूर्वपद 'यथा' अव्यय होने के कारण यह अव्ययीभाव समास है।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "समास भेद",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_018",
    "qType": "standard",
    "question": "भोरमदेव मंदिर (छत्तीसगढ़ का खजुराहो) का निर्माण किस राजवंश के शासनकाल में हुआ था?",
    "options": ["कलचुरी वंश", "नल वंश", "फणिनागवंश", "सोमवंश"],
    "correctIndex": 2,
    "explanation": "भोरमदेव मंदिर का निर्माण 11वीं शताब्दी में फणिनागवंश के राजा गोपालदेव और रामचंद्र द्वारा कराया गया था।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ के राजवंश एवं स्थापत्य",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_019",
    "qType": "standard",
    "question": "भारत में 'राष्ट्रीय आय' (National Income) का आकलन मुख्य रूप से किस संस्था द्वारा किया जाता है?",
    "options": ["भारतीय रिजर्व बैंक (RBI)", "राष्ट्रीय सांख्यिकी कार्यालय (NSO)", "वित्त मंत्रालय", "नीति आयोग"],
    "correctIndex": 1,
    "explanation": "भारत में राष्ट्रीय आय और GDP का मापन एवं सांख्यिकीय आंकड़े NSO (National Statistical Office - सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय) जारी करता है।",
    "subject": "India GS",
    "difficulty": "easy",
    "topic": "भारतीय अर्थव्यवस्था",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_020",
    "qType": "standard",
    "question": "एक व्यक्ति 10 किमी उत्तर की ओर चलता है, फिर पूर्व की ओर मुड़कर 5 किमी चलता है। अंत में वह दक्षिण की ओर 10 किमी चलता है। अब वह अपने शुरुआती बिंदु से किस दिशा में और कितनी दूरी पर है?",
    "options": ["5 किमी पूर्व", "10 किमी उत्तर", "5 किमी पश्चिम", "15 किमी उत्तर-पूर्व"],
    "correctIndex": 0,
    "explanation": "उत्तर में 10 किमी जाने के बाद दक्षिण में 10 किमी आने पर उत्तर-दक्षिण दूरी शून्य हो जाती है। बची हुई दूरी केवल पूर्व दिशा में 5 किमी है।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "दिशा और दूरी परीक्षण",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_021",
    "qType": "standard",
    "question": "छत्तीसगढ़ी बोली में 'अँवरा' का हिंदी अर्थ क्या होता है?",
    "options": ["आँवला", "अंगूर", "अनार", "अमरूद"],
    "correctIndex": 0,
    "explanation": "छत्तीसगढ़ी में 'अँवरा' तद्भव रूप है जिसका मानक हिंदी अर्थ 'आँवला' (Emblica officinalis) होता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ी शब्दावली",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_022",
    "qType": "standard",
    "question": "300 मीटर लंबी एक रेलगाड़ी 54 किमी/घंटा की चाल से एक खंभे को कितने समय में पार कर लेगी?",
    "options": ["15 सेकंड", "20 सेकंड", "25 सेकंड", "30 सेकंड"],
    "correctIndex": 1,
    "explanation": "चाल = 54 * (5/18) = 15 मीटर/सेकंड। खंभे को पार करने में लगा समय = दूरी/चाल = 300 / 15 = 20 सेकंड।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "समय, दूरी एवं ट्रेन",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_023",
    "qType": "standard",
    "question": "निम्नलिखित में से 'पवन' शब्द का सही अयादि संधि-विच्छेद कौन-सा है?",
    "options": ["पौ + अन", "पो + अन", "प + वन", "पा + अन"],
    "correctIndex": 1,
    "explanation": "पो + अन = पवन (अयादि संधि में 'ओ' के बाद भिन्न स्वर आने पर 'अव्' बनता है)। 'पौ + अन = पावक' होता है।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "अयादि संधि",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_024",
    "qType": "assertion_reason",
    "question": "निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-",
    "assertion": "ओजोन परत (Ozone Layer) वायुमंडल के समताप मंडल (Stratosphere) में पाई जाती है।",
    "reason": "ओजोन परत सूर्य से आने वाली हानिकारक पराबैंगनी किरणों (UV Rays) को अवशोषित कर पृथ्वी की रक्षा करती है।",
    "options": [
      "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
      "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।",
      "[As] सत्य है, लेकिन [R] असत्य है।",
      "[As] असत्य है, लेकिन [R] सत्य है।"
    ],
    "correctIndex": 1,
    "explanation": "दोनों कथन अपनी-अपनी जगह सत्य हैं। परंतु पराबैंगनी किरणों का अवशोषण ओजोन की स्थिति का वैज्ञानिक कारण नहीं है।",
    "subject": "India GS",
    "difficulty": "moderate",
    "topic": "पर्यावरण एवं वायुमंडल",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_025",
    "qType": "assertion_reason",
    "question": "निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-",
    "assertion": "छत्तीसगढ़ को 'धान का कटोरा' कहा जाता है।",
    "reason": "छत्तीसगढ़ के मध्य मैदानी भाग में लाल-पीली (मटासी) मिट्टी पाई जाती है जो धान की फसल के लिए अत्यधिक उपयुक्त है।",
    "options": [
      "[As] सत्य है, लेकिन [R] असत्य है।",
      "[As] असत्य है, लेकिन [R] सत्य है।",
      "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
      "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।"
    ],
    "correctIndex": 2,
    "explanation": "छत्तीसगढ़ का महानदी बेसिन धान उत्पादन के लिए प्रसिद्ध है जहाँ लाल-पीली मिट्टी का आधिक्य है, अतः कारण व्याख्या करता है।",
    "subject": "CG GS",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ की कृषि एवं मृदा",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_026",
    "qType": "match_column",
    "question": "छत्तीसगढ़ की प्रमुख बोलियों और उनके क्षेत्रों को सुमेलित कीजिए-",
    "columnI": [
      "(a) हलबी",
      "(b) सरगुजिहा",
      "(c) गोंडी",
      "(d) बैगानी"
    ],
    "columnII": [
      "(I) सरगुजा संभाग",
      "(II) बस्तर संभाग",
      "(III) कवर्धा/मैकल श्रेणी",
      "(IV) जनजातीय बस्तर/दक्षिण भाग"
    ],
    "options": [
      "a-II, b-I, c-IV, d-III",
      "a-I, b-II, c-III, d-IV",
      "a-III, b-IV, c-I, d-II",
      "a-IV, b-III, c-II, d-I"
    ],
    "correctIndex": 0,
    "explanation": "हलबी बस्तर की मुख्य संपर्क बोली (a-II), सरगुजिहा उत्तर भाग (b-I), गोंडी बस्तर क्षेत्र (c-IV) तथा बैगानी मैकल क्षेत्र (d-III) में बोली जाती है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ी बोलियाँ एवं क्षेत्र",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_027",
    "qType": "match_column",
    "question": "गणितीय सूत्रों को उनके विषयों से सुमेलित कीजिए-",
    "columnI": [
      "(a) (a + b)²",
      "(b) 2πr",
      "(c) (P * R * T) / 100",
      "(d) a³"
    ],
    "columnII": [
      "(I) साधारण ब्याज",
      "(II) घन का आयतन",
      "(III) बीजगणित सर्वसमिका",
      "(IV) वृत्त की परिधि"
    ],
    "options": [
      "a-I, b-II, c-III, d-IV",
      "a-III, b-IV, c-I, d-II",
      "a-IV, b-III, c-II, d-I",
      "a-II, b-I, c-IV, d-III"
    ],
    "correctIndex": 1,
    "explanation": "(a+b)² बीजगणित, 2πr वृत्त परिधि, SI का सूत्र साधारण ब्याज तथा a³ घन के आयतन का सूत्र है।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "गणितीय सूत्र",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_028",
    "qType": "ordering",
    "question": "मानव शरीर के पाचन तंत्र में भोजन के प्रवाह के सही क्रम को व्यवस्थित करें-",
    "statements": [
      "मुख गुहा (Mouth)",
      "ग्रासनली (Oesophagus)",
      "अमाशय (Stomach)",
      "छोटी आँत (Small Intestine)"
    ],
    "statementLabels": ["D1", "D2", "D3", "D4"],
    "options": [
      "D1 → D2 → D3 → D4",
      "D2 → D1 → D3 → D4",
      "D1 → D3 → D2 → D4",
      "D4 → D3 → D2 → D1"
    ],
    "correctIndex": 0,
    "explanation": "पाचन मार्ग का सही क्रम: मुख गुहा → ग्रासनली → अमाशय → छोटी आँत।",
    "subject": "India GS",
    "difficulty": "easy",
    "topic": "सामान्य विज्ञान - जीव विज्ञान",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_029",
    "qType": "multi_statement",
    "question": "हिंदी में 'तत्सम' और 'तद्भव' शब्दों के बारे में क्या सही है?",
    "statements": [
      "तत्सम शब्द संस्कृत से बिना किसी परिवर्तन के हिंदी में आते हैं।",
      "तद्भव शब्द संस्कृत से परिवर्तित होकर हिंदी में प्रयुक्त होते हैं।",
      "'अग्नि' तत्सम शब्द है और 'आग' उसका तद्भव रूप है।",
      "'सूरज' तत्सम शब्द है और 'सूर्य' उसका तद्भव रूप है।"
    ],
    "statementLabels": ["W1", "W2", "W3", "W4"],
    "options": [
      "केवल W1, W2 और W3",
      "1, 2, 3 और 4 सभी",
      "केवल W1 और W2",
      "केवल W3 और W4"
    ],
    "correctIndex": 0,
    "explanation": "'सूर्य' तत्सम शब्द है और 'सूरज' तद्भव रूप है। अतः कथन W4 असत्य है।",
    "subject": "Hindi",
    "difficulty": "moderate",
    "topic": "तत्सम एवं तद्भव",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_030",
    "qType": "standard",
    "question": "A, B की बहन है। C, B की माता है। D, C का पिता है। A का D से क्या संबंध है?",
    "options": ["पुत्री", "दादी", "नातिन (पौत्री)", "बहन"],
    "correctIndex": 2,
    "explanation": "A और B बहन-भाई/बहन हैं। C उनकी माँ है। C का पिता D है। अतः A, D की नातिन (पौत्री) हुई।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "रक्त संबंध (Blood Relations)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_031",
    "qType": "standard",
    "question": "छत्तीसगढ़ी में 'नोहनी' शब्द का प्रयोग किस उपकरण के लिए किया जाता है?",
    "options": ["हँसिया", "खुरपी/छैनी", "हल", "कुल्हाड़ी"],
    "correctIndex": 1,
    "explanation": "छत्तीसगढ़ी ग्रामीण अंचल में 'नोहनी' का अर्थ लोहे की छोटी छैनी या खुरपी से होता है जिसका प्रयोग छीलने या खोदने में होता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ी शब्दावली एवं कृषि उपकरण",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_032",
    "qType": "standard",
    "question": "प्रथम 10 सम (Even) संख्याओं का औसत क्या होगा?",
    "options": ["10", "11", "12", "10.5"],
    "correctIndex": 1,
    "explanation": "प्रथम n सम संख्याओं का औसत = (n + 1) होता है। अतः प्रथम 10 सम संख्याओं का औसत = 10 + 1 = 11।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "औसत (Average)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_033",
    "qType": "standard",
    "question": "संसद के संयुक्त अधिवेशन (Joint Session) की अध्यक्षता कौन करता है?",
    "options": ["भारत का राष्ट्रपति", "भारत का उपराष्ट्रपति", "लोकसभा अध्यक्ष (Speaker)", "प्रधानमंत्री"],
    "correctIndex": 2,
    "explanation": "अनुच्छेद 108 के तहत संयुक्त अधिवेशन राष्ट्रपति बुलाता है, परंतु इसकी अध्यक्षता अनुच्छेद 118(4) के तहत 'लोकसभा अध्यक्ष' करता है।",
    "subject": "India GS",
    "difficulty": "moderate",
    "topic": "भारतीय संसद",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_034",
    "qType": "standard",
    "question": "छत्तीसगढ़ की सबसे ऊँची चोटी 'गौरलाटा' किस पाठ प्रदेश में स्थित है?",
    "options": ["मैनपाट", "जसपुर पाठ", "सामरी पाठ", "जारंग पाठ"],
    "correctIndex": 2,
    "explanation": "छत्तीसगढ़ की सर्वोच्च चोटी 'गौरलाटा' (1225 मीटर) बलरामपुर जिले के सामरी पाठ प्रदेश में स्थित है।",
    "subject": "CG GS",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ का भौतिक विभाजन",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_035",
    "qType": "standard",
    "question": "निम्नलिखित में से 'अनुरागी' शब्द का सही विलोम शब्द क्या होगा?",
    "options": ["विरागी", "वैरागी", "अनुराग", "विराग"],
    "correctIndex": 0,
    "explanation": "'अनुरागी' का अर्थ प्रेम करने वाला होता है, जिसका सटीक विलोम 'विरागी' होता है। (अनुराग का विलोम विराग होता है)।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "विलोम शब्द",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_036",
    "qType": "assertion_reason",
    "question": "निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-",
    "assertion": "कथन [As]: सभी गाय जानवर हैं। सभी जानवर चार पैरों वाले हैं। निष्कर्ष: सभी गाय चार पैरों वाली हैं।",
    "reason": "कारण [R]: यदि दो सार्वभौमिक सकारात्मक कथन संयोजित होते हैं, तो निष्कर्ष भी सार्वभौमिक सकारात्मक होता है।",
    "options": [
      "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
      "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।",
      "[As] सत्य है, लेकिन [R] असत्य है।",
      "[As] असत्य है, लेकिन [R] सत्य है।"
    ],
    "correctIndex": 0,
    "explanation": "न्याय वाक्य (Syllogism) के नियमानुसार दोनों कथन सत्य हैं और कारण तर्कसंगत व्याख्या करता है।",
    "subject": "Logical Reasoning",
    "difficulty": "moderate",
    "topic": "न्याय वाक्य (Syllogism)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_037",
    "qType": "match_column",
    "question": "छत्तीसगढ़ी क्रिया पदों को उनके हिंदी अनुवाद से सुमेलित कीजिए-",
    "columnI": [
      "(a) खायबर",
      "(b) जावत हे",
      "(c) सुतगे",
      "(d) रंधत हे"
    ],
    "columnII": [
      "(I) सो गया",
      "(II) खाने के लिए",
      "(III) पका रहा/रही है",
      "(IV) जा रहा/रही है"
    ],
    "options": [
      "a-I, b-II, c-III, d-IV",
      "a-II, b-IV, c-I, d-III",
      "a-III, b-I, c-IV, d-II",
      "a-IV, b-III, c-II, d-I"
    ],
    "correctIndex": 1,
    "explanation": "खायबर (खाने के लिए - a-II), जावत हे (जा रहा है - b-IV), सुतगे (सो गया - c-I), रंधत हे (पका रही है - d-III)।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ी व्याकरण - क्रिया",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_038",
    "qType": "ordering",
    "question": "संख्याओं के वर्गों (Squares) को छोटे से बड़े क्रम में व्यवस्थित करें-",
    "statements": [
      "12²",
      "15²",
      "18²",
      "20²"
    ],
    "statementLabels": ["S1", "S2", "S3", "S4"],
    "options": [
      "S1 → S2 → S3 → S4",
      "S4 → S3 → S2 → S1",
      "S2 → S1 → S3 → S4",
      "S1 → S3 → S2 → S4"
    ],
    "correctIndex": 0,
    "explanation": "वर्ग मान: 12² = 144, 15² = 225, 18² = 324, 20² = 400। अतः क्रम S1 → S2 → S3 → S4 है।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "वर्ग एवं वर्गमूल",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2022",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_039",
    "qType": "multi_statement",
    "question": "हड़प्पा सभ्यता (सिंधु घाटी सभ्यता) के बारे में कौन-से कथन सत्य हैं?",
    "statements": [
      "यह एक कांस्ययुगीन (Bronze Age) और नगरीय सभ्यता थी।",
      "लोथल एक प्रमुख बंदरगाह (Dockyard) नगर था।",
      "हड़प्पा सभ्यता के लोग लोहे (Iron) की खोज से भली-भांति परिचित थे।",
      "मोहनजोदड़ो से 'विशाल स्नानागार' (Great Bath) प्राप्त हुआ है।"
    ],
    "statementLabels": ["H1", "H2", "H3", "H4"],
    "options": [
      "H1, H2, H3 और H4 सभी",
      "केवल H1, H2 और H4",
      "केवल H2 और H3",
      "केवल H1 और H4"
    ],
    "correctIndex": 1,
    "explanation": "हड़प्पा सभ्यता के लोग लोहे से परिचित नहीं थे; भारत में लोहे की खोज उत्तर वैदिक काल में हुई। कथन H3 असत्य है।",
    "subject": "India GS",
    "difficulty": "hard",
    "topic": "प्राचीन भारत का इतिहास",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_040",
    "qType": "standard",
    "question": "छत्तीसगढ़ में 'सोनहा बिहान' के संस्थापक कौन थे?",
    "options": ["दाऊ रामचंद्र देशमुख", "दाऊ महासिंग चंद्राकर", "हबीब तनवीर", "पंडित सुंदरलाल शर्मा"],
    "correctIndex": 0,
    "explanation": "दाऊ रामचंद्र देशमुख ने छत्तीसगढ़ी लोक कला और संस्कृति के संरक्षण हेतु 'देहाती कला मंच' तथा 'सोनहा बिहान' की स्थापना की थी।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ के लोक कलाकार एवं मंच",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_041",
    "qType": "standard",
    "question": "हिंदी में 'अंधेर नगरी' नाटक के रचयिता कौन हैं?",
    "options": ["जयशंकर प्रसाद", "भारतेंदु हरिश्चंद्र", "मुंशी प्रेमचंद", "सूर्यकांत त्रिपाठी निराला"],
    "correctIndex": 1,
    "explanation": "'अंधेर नगरी' प्रसिद्ध प्रहसन नाटक है जिसकी रचना भारतेंदु हरिश्चंद्र ने की थी।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "हिंदी साहित्य एवं रचनाएँ",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_042",
    "qType": "standard",
    "question": "यदि $x + \\frac{1}{x} = 4$ है, तो $x^2 + \\frac{1}{x^2}$ का मान क्या होगा?",
    "options": ["16", "14", "18", "12"],
    "correctIndex": 1,
    "explanation": "सूत्र: $x^2 + \\frac{1}{x^2} = (x + \\frac{1}{x})^2 - 2 = 4^2 - 2 = 16 - 2 = 14$।",
    "subject": "Mathematics",
    "difficulty": "moderate",
    "topic": "बीजगणित (Algebra)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_043",
    "qType": "standard",
    "question": "छत्तीसगढ़ी जनऊला (पहेली) 'एक ठन अइसन रूख, जेमा पत्ता न डारा' का सही उत्तर क्या है?",
    "options": ["खंभा", "छाता (छाता/कुकुरमुत्ता)", "सींग", "बांस"],
    "correctIndex": 2,
    "explanation": "छत्तीसगढ़ी जनऊला में 'सींग' को बिना पत्ते और डाल का पेड़ रूपक देकर पूछा जाता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ी जनऊला (पहेलियाँ)",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_044",
    "qType": "assertion_reason",
    "question": "निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-",
    "assertion": "भारत का संविधान 26 नवंबर 1949 को अंगीकृत किया गया था।",
    "reason": "26 नवंबर को भारत में 'संविधान दिवस' (Constitution Day) के रूप में मनाया जाता है।",
    "options": [
      "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
      "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।",
      "[As] सत्य है, लेकिन [R] असत्य है।",
      "[As] असत्य है, लेकिन [R] सत्य है।"
    ],
    "correctIndex": 0,
    "explanation": "संविधान सभा द्वारा 26 नवंबर 1949 को संविधान अंगीकृत होने की स्मृति में ही 26 नवंबर को संविधान दिवस मनाया जाता है।",
    "subject": "India GS",
    "difficulty": "easy",
    "topic": "भारतीय संविधान निर्माण",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_045",
    "qType": "match_column",
    "question": "तर्कशक्ति के प्रशन प्रकारों को उनके उदाहरणों से सुमेलित कीजिए-",
    "columnI": [
      "(a) विषम पद पहचानना",
      "(b) सादृश्यता (Analogy)",
      "(c) श्रेणी पूर्ण करना"
    ],
    "columnII": [
      "(I) भारत : नई दिल्ली :: जापान : टोक्यो",
      "(II) 2, 4, 8, 16, 32",
      "(III) सेब, आम, केला, आलू"
    ],
    "options": [
      "a-I, b-II, c-III",
      "a-III, b-I, c-II",
      "a-II, b-III, c-I",
      "a-III, b-II, c-I"
    ],
    "correctIndex": 1,
    "explanation": "आलू सब्जी है जबकि बाकी फल हैं (a-III), राजधानी का संबंध (b-I), दोगुने का क्रम (c-II)।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "तर्कशक्ति वर्गीकरण",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_046",
    "qType": "standard",
    "question": "छत्तीसगढ़ में 'मिनीमाता बांगो बांध' किस नदी पर निर्मित है?",
    "options": ["महानदी", "हसदेव नदी", "शिवनाथ नदी", "इंद्रावती नदी"],
    "correctIndex": 1,
    "explanation": "मिनीमाता बांगो बांध कोरबा जिले में हसदेव नदी पर स्थित छत्तीसगढ़ का सबसे ऊँचा बांध (87 मीटर) है।",
    "subject": "CG GS",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ की बहुउद्देशीय परियोजनाएँ",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_047",
    "qType": "standard",
    "question": "यदि 5 कलमों का मूल्य ₹75 है, तो 12 कलमों का मूल्य क्या होगा?",
    "options": ["₹150", "₹180", "₹200", "₹160"],
    "correctIndex": 1,
    "explanation": "1 कलम का मूल्य = 75 / 5 = ₹15। अतः 12 कलमों का मूल्य = 12 * 15 = ₹180।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "ऐकिक नियम (Unitary Method)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_048",
    "qType": "standard",
    "question": "हिंदी में 'अनुप्रास अलंकार' की क्या विशेषता है?",
    "options": [
      "शब्दों के अर्थ में चमत्कार होना",
      "एक ही वर्ण की बार-बार आवृत्ति होना",
      "उपमेय की उपमान से समानता बताना",
      "एक शब्द के अनेक अर्थ निकलना"
    ],
    "correctIndex": 1,
    "explanation": "जहाँ काव्य में वर्णों की आवृत्ति बार-बार होती है (जैसे- तरणि तनूजा तट तमाल), वहाँ अनुप्रास अलंकार होता है।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "अलंकार भेद",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_049",
    "qType": "standard",
    "question": "छत्तीसगढ़ी मुहावरा 'छाती मा पथरा रखना' का सही अर्थ क्या है?",
    "options": ["अत्यधिक भारी काम करना", "गंभीर दुख को धैर्यपूर्वक सहन करना", "गुस्सा होना", "पत्थर उठाना"],
    "correctIndex": 1,
    "explanation": "छत्तीसगढ़ी में 'छाती मा पथरा रखना' का अर्थ भारी विपत्ति या दुख में भी धैर्य धारण करना होता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ी मुहावरे",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_050",
    "qType": "standard",
    "question": "भारत के किस राज्य में 'काजीरंगा राष्ट्रीय उद्यान' (Kaziranga National Park) स्थित है?",
    "options": ["उत्तराखंड", "असम", "पश्चिम बंगाल", "मध्य प्रदेश"],
    "correctIndex": 1,
    "explanation": "काजीरंगा राष्ट्रीय उद्यान असम राज्य में स्थित है, जो एक सींग वाले भारतीय गैंडे के लिए विश्व प्रसिद्ध है।",
    "subject": "India GS",
    "difficulty": "easy",
    "topic": "भारत के राष्ट्रीय उद्यान एवं भूगोल",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_051",
    "qType": "ordering",
    "question": "अंग्रेजी वर्णमाला के अनुसार निम्नलिखित शब्दों को शब्दकोश क्रम में व्यवस्थित करें-",
    "statements": ["APPLE", "APPLICATION", "APPLY", "APPROACH"],
    "statementLabels": ["W1", "W2", "W3", "W4"],
    "options": [
      "W1 → W2 → W3 → W4",
      "W2 → W1 → W3 → W4",
      "W1 → W3 → W2 → W4",
      "W4 → W3 → W2 → W1"
    ],
    "correctIndex": 0,
    "explanation": "शब्दकोश क्रम: APPLE (W1) → APPLICATION (W2) → APPLY (W3) → APPROACH (W4)।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "शब्दकोश क्रम (Dictionary Order)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_052",
    "qType": "standard",
    "question": "छत्तीसगढ़ के प्रथम शहीद 'वीर नारायण सिंह' को किस स्थान पर फाँसी दी गई थी?",
    "options": ["सोनाखान", "जयस्तंभ चौक (रायपुर)", "रतनपुर", "बिलासपुर"],
    "correctIndex": 1,
    "explanation": "वीर नारायण सिंह को 10 दिसंबर 1857 को रायपुर के जयस्तंभ चौक पर ब्रिटिश सरकार द्वारा फाँसी दी गई थी।",
    "subject": "CG GS",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ का स्वतंत्रता आंदोलन",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_053",
    "qType": "standard",
    "question": "द्विघात समीकरण $x^2 - 5x + 6 = 0$ के मूल (Roots) क्या होंगे?",
    "options": ["2 और 3", "-2 और -3", "1 और 6", "-1 और -6"],
    "correctIndex": 0,
    "explanation": "$x^2 - 3x - 2x + 6 = 0 \\implies x(x - 3) - 2(x - 3) = 0 \\implies (x - 2)(x - 3) = 0 \\implies x = 2, 3$।",
    "subject": "Mathematics",
    "difficulty": "moderate",
    "topic": "द्विघात समीकरण",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_054",
    "qType": "standard",
    "question": "छत्तीसगढ़ी में 'गाड़ा' शब्द किस अर्थ/मात्रा को व्यक्त करता है?",
    "options": ["बहुत सारा / प्रचुर मात्रा", "गाड़ी", "गड्ढा", "कम मात्रा"],
    "correctIndex": 0,
    "explanation": "छत्तीसगढ़ी में 'गाड़ा' (उदा. गाड़ा-गाड़ा बधाई) का प्रयोग अत्यधिक या प्रचुर मात्रा व्यक्त करने के लिए किया जाता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ी व्याकरण एवं अर्थ",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_055",
    "qType": "standard",
    "question": "हिंदी में 'सूर्यकांति' या 'सूर्यकांत त्रिपाठी' का उपनाम क्या है?",
    "options": ["निराला", "दिनकर", "नवीन", "द्विज"],
    "correctIndex": 0,
    "explanation": "सूर्यकांत त्रिपाठी का सुप्रसिद्ध उपनाम 'निराला' है (छायावाद के चार स्तंभों में से एक)।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "हिंदी साहित्यकार एवं उपनाम",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_056",
    "qType": "multi_statement",
    "question": "भारतीय रिज़र्व बैंक (RBI) के संदर्भ में कौन-से कथन सत्य हैं?",
    "statements": [
      "यह भारत का केंद्रीय बैंक है।",
      "इसकी स्थापना 1 अप्रैल 1935 को हुई थी।",
      "यह भारत में मौद्रिक नीति (Monetary Policy) जारी करता है।",
      "यह आम जनता के चालू खाते (Current Accounts) खोलता है।"
    ],
    "statementLabels": ["R1", "R2", "R3", "R4"],
    "options": [
      "केवल R1, R2 और R3",
      "R1, R2, R3 और R4 सभी",
      "केवल R1 और R3",
      "केवल R2 और R4"
    ],
    "correctIndex": 0,
    "explanation": "RBI बैंकों का बैंक है, यह आम जनता के प्रत्यक्ष खाते स्वीकार नहीं करता। कथन R4 असत्य है।",
    "subject": "India GS",
    "difficulty": "moderate",
    "topic": "बैंकिंग एवं मौद्रिक नीति",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_057",
    "qType": "standard",
    "question": "पासे की दो स्थितियों में यदि 1 के विपरीत फलक का अंक पूछा जाए, जहाँ पासा A में (1, 2, 3) और पासा B में (1, 4, 5) दिख रहा हो, तो 1 के विपरीत कौन-सा अंक होगा?",
    "options": ["2", "3", "6", "5"],
    "correctIndex": 2,
    "explanation": "चूँकि 1 दोनों में उभयनिष्ठ (Common) है और 2, 3, 4, 5 इसके पड़ोसी फलक दिख रहे हैं, तो बचा हुआ अंक 6 ही 1 के विपरीत होगा।",
    "subject": "Logical Reasoning",
    "difficulty": "moderate",
    "topic": "पासा (Dice)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_058",
    "qType": "standard",
    "question": "छत्तीसगढ़ का प्रसिद्ध लोक नृत्य 'रौत नाचा' किस त्यौहार के अवसर पर मुख्य रूप से किया जाता है?",
    "options": ["हरेली", "देवउठनी एकादशी / दिवाली", "होली", "पोला"],
    "correctIndex": 1,
    "explanation": "रौत नाचा यादव (रौत) समाज द्वारा दिवाली के बाद देवउठनी एकादशी के अवसर पर पारंपारिक वेशभूषा में किया जाता है।",
    "subject": "CG GS",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ के लोक नृत्य एवं पर्व",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_059",
    "qType": "standard",
    "question": "छत्तीसगढ़ी शब्द 'झुलुफ' का क्या अर्थ है?",
    "options": ["बालों की लट / जुल्फ", "कपड़ा", "झूला", "पंख"],
    "correctIndex": 0,
    "explanation": "छत्तीसगढ़ी में 'झुलुफ' का अर्थ माथे या गालों पर आने वाली बालों की लट (जुल्फ) से होता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ी शब्दावली",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_060",
    "qType": "standard",
    "question": "₹2000 का 10% वार्षिक दर से 2 वर्ष का साधारण ब्याज कितना होगा?",
    "options": ["₹200", "₹400", "₹300", "₹500"],
    "correctIndex": 1,
    "explanation": "SI = (2000 * 10 * 2) / 100 = ₹400।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "साधारण ब्याज",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_061",
    "qType": "standard",
    "question": "हिंदी में 'अनुराग' का सही विलोम शब्द क्या है?",
    "options": ["विराग", "प्रेम", "आसक्ति", "मोह"],
    "correctIndex": 0,
    "explanation": "'अनुराग' (प्रेम/लगाव) का मानक विलोम शब्द 'विराग' (उदासीनता/वैराग्य) होता है।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "विलोम शब्द",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_062",
    "qType": "assertion_reason",
    "question": "निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-",
    "assertion": "अनुच्छेद 21 को भारतीय संविधान का 'हृदय और आत्मा' कहा जाता है।",
    "reason": "डॉ. बी.आर. अंबेडकर ने अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार) को संविधान का 'हृदय और आत्मा' कहा था।",
    "options": [
      "[As] असत्य है, लेकिन [R] सत्य है।",
      "[As] और [R] दोनों सत्य हैं।",
      "[As] सत्य है, लेकिन [R] असत्य है।",
      "[As] और [R] दोनों असत्य हैं।"
    ],
    "correctIndex": 0,
    "explanation": "अंबेडकर जी ने अनुच्छेद 32 को संविधान की आत्मा कहा था (अनुच्छेद 21 जीवन का अधिकार है)। अतः कथन As असत्य है और कारण R सत्य है।",
    "subject": "India GS",
    "difficulty": "moderate",
    "topic": "मौलिक अधिकार",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_063",
    "qType": "match_column",
    "question": "छत्तीसगढ़ के लोक नाट्य / नृत्य रूपों को सुमेलित कीजिए-",
    "columnI": [
      "(a) रहस्य",
      "(b) नाचा",
      "(c) पंथी",
      "(d) ककसाड़"
    ],
    "columnII": [
      "(I) सतनामी पंथ / गुरु घासीदास",
      "(II) रासलीला पर आधारित लोकनाट्य",
      "(III) मुड़िया जनजाति नृत्य",
      "(IV) छत्तीसगढ़ का प्रमुख लोकनाट्य"
    ],
    "options": [
      "a-II, b-IV, c-I, d-III",
      "a-I, b-II, c-III, d-IV",
      "a-III, b-I, c-IV, d-II",
      "a-IV, b-III, c-II, d-I"
    ],
    "correctIndex": 0,
    "explanation": "रहस्य (रासलीला - a-II), नाचा (लोकनाट्य - b-IV), पंथी (सतनामी पंथ - c-I), ककसाड़ (मुड़िया जनजाति - d-III)।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ के लोक नाट्य एवं नृत्य",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_064",
    "qType": "ordering",
    "question": "भिन्न मानों को घटते क्रम (Descending Order) में व्यवस्थित करें-",
    "statements": ["3/4", "2/3", "1/2", "1/4"],
    "statementLabels": ["F1", "F2", "F3", "F4"],
    "options": [
      "F1 → F2 → F3 → F4",
      "F4 → F3 → F2 → F1",
      "F2 → F1 → F3 → F4",
      "F1 → F3 → F2 → F4"
    ],
    "correctIndex": 0,
    "explanation": "मान: 3/4=0.75, 2/3=0.66, 1/2=0.50, 1/4=0.25। घटता क्रम F1 → F2 → F3 → F4 है।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "भिन्न (Fractions)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_065",
    "qType": "multi_statement",
    "question": "छत्तीसगढ़ी व्याकरण के संबंध में कौन-से कथन सत्य हैं?",
    "statements": [
      "छत्तीसगढ़ी में तीन लिंग (पुल्लिंग, स्त्रीलिंग, नपुंसकलिंग) माने जाते हैं।",
      "छत्तीसगढ़ी में 'मन' लगाकर बहुवचन बनाया जाता है (जैसे- लइका मन)।",
      "छत्तीसगढ़ी पूर्वी हिंदी (Eastern Hindi) उपभाषा वर्ग की बोली है।",
      "छत्तीसगढ़ी की लिपि देवनागरी है।"
    ],
    "statementLabels": ["C1", "C2", "C3", "C4"],
    "options": [
      "केवल C2, C3 और C4",
      "C1, C2, C3 और C4 सभी",
      "केवल C1 और C3",
      "केवल C2 और C4"
    ],
    "correctIndex": 0,
    "explanation": "छत्तीसगढ़ी में केवल दो लिंग (पुल्लिंग और स्त्रीलिंग) होते हैं, नपुंसकलिंग नहीं होता (कथन C1 असत्य है)।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "hard",
    "topic": "छत्तीसगढ़ी व्याकरण परिचय",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_066",
    "qType": "standard",
    "question": "नीचे दिए गए विकल्पों में से विषम (Odd One Out) का चयन कीजिए-",
    "options": ["शिमला", "भोपाल", "रांची", "कानपुर"],
    "correctIndex": 3,
    "explanation": "शिमला (हिमाचल प्रदेश), भोपाल (मध्य प्रदेश) और रांची (झारखंड) राज्यों की राजधानियाँ हैं, जबकि कानपुर उत्तर प्रदेश का एक शहर है।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "वर्गीकरण (Classification)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_067",
    "qType": "standard",
    "question": "छत्तीसगढ़ की 'चित्रकूट जलप्रपात' की तुलना प्रायः किस प्रसिद्ध जलप्रपात से की जाती है?",
    "options": ["एंजेल जलप्रपात", "नियाग्रा जलप्रपात", "विक्टोरिया जलप्रपात", "जॉग जलप्रपात"],
    "correctIndex": 1,
    "explanation": "चित्रकूट जलप्रपात को अपनी चौड़ाई और घोड़े की नाल जैसे आकार के कारण 'भारत का नियाग्रा' कहा जाता है।",
    "subject": "CG GS",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ के दर्शनीय स्थल",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_068",
    "qType": "standard",
    "question": "हिंदी में 'दूध' शब्द किस प्रकार का तद्भव शब्द है और इसका तत्सम रूप क्या होगा?",
    "options": ["दुग्ध", "क्षीर", "दधि", "पेय"],
    "correctIndex": 0,
    "explanation": "'दूध' तद्भव शब्द है जिसका शुद्ध तत्सम रूप 'दुग्ध' होता है।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "तत्सम एवं तद्भव",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_069",
    "qType": "standard",
    "question": "15 और 25 का महत्तम समापवर्तक (HCF) क्या होगा?",
    "options": ["3", "5", "15", "75"],
    "correctIndex": 1,
    "explanation": "15 = 3 * 5, 25 = 5 * 5। उभयनिष्ठ गुणनखंड = 5। अतः HCF = 5।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "HCF एवं LCM",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2022",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_070",
    "qType": "standard",
    "question": "छत्तीसगढ़ी हाना 'जैसन बोही, तइसन लुही' का सही हिंदी अर्थ क्या है?",
    "options": ["जैसा काम करोगे वैसा फल मिलेगा", "हमेशा नुकसान होना", "जल्दी काम निपटाना", "दूसरों की नकल करना"],
    "correctIndex": 0,
    "explanation": "यह कर्मफल के नियम 'जैसा बोओगे वैसा काटोगे' का छत्तीसगढ़ी रूपांतरण है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ी हाना",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_071",
    "qType": "standard",
    "question": "प्रसिद्ध 'गायत्री मंत्र' का उल्लेख ऋग्वेद के किस मण्डल में किया गया है?",
    "options": ["प्रथम मण्डल", "तृतीय मण्डल", "दशम मण्डल", "नवम मण्डल"],
    "correctIndex": 1,
    "explanation": "गायत्री मंत्र की रचना महर्षि विश्वामित्र ने की थी, जिसका वर्णन ऋग्वेद के तीसरे मण्डल में है।",
    "subject": "India GS",
    "difficulty": "moderate",
    "topic": "वैदिक काल एवं साहित्य",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_072",
    "qType": "standard",
    "question": "छत्तीसगढ़ का प्रथम शक्कर कारखाना (Sugar Factory) 'भोरमदेव सहकारी शक्कर कारखाना' कहाँ स्थित है?",
    "options": ["बालोद", "कवर्धा (कबीरधाम)", "सूरजपुर", "बेमेतरा"],
    "correctIndex": 1,
    "explanation": "छत्तीसगढ़ का पहला शक्कर कारखाना मार्च 2003 में रामहेपुर, जिला कवर्धा (कबीरधाम) में स्थापित किया गया था।",
    "subject": "CG GS",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ के उद्योग",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_073",
    "qType": "standard",
    "question": "यदि किसी घड़ी में 3:00 बज रहे हैं, तो घंटे और मिनट की सुइयों के बीच कितने डिग्री का कोण बनेगा?",
    "options": ["45°", "60°", "90°", "120°"],
    "correctIndex": 2,
    "explanation": "प्रत्येक घंटे का अंतर 30° होता है। 3 बजे सुइयों के बीच 3 घंटे का फासला होता है (3 * 30° = 90°)।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "घड़ी (Clock)",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_074",
    "qType": "standard",
    "question": "त्रिभुज के तीनों अंतः कोणों का अनुपात 1 : 2 : 3 है। सबसे बड़े कोण का मान ज्ञात कीजिए।",
    "options": ["30°", "60°", "90°", "120°"],
    "correctIndex": 2,
    "explanation": "योग = 1x + 2x + 3x = 6x = 180° ⇒ x = 30°। सबसे बड़ा कोण = 3x = 3 * 30° = 90°।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "त्रिभुज एवं अनुपात",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_075",
    "qType": "standard",
    "question": "छत्तीसगढ़ी शब्द 'पिनपिनिया' का सही अर्थ क्या है?",
    "options": ["चुप रहने वाला", "छोटी-छोटी बातों पर चिढ़ने/झुँझलाने वाला व्यक्ति", "बहुत मीठा बोलने वाला", "तेज दौड़ने वाला"],
    "correctIndex": 1,
    "explanation": "छत्तीसगढ़ी में 'पिनपिनिया' उस स्वभाव के व्यक्ति को कहते हैं जो बात-बात पर कुढ़ता या चिढ़ता रहता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ी विशिष्ट शब्दावली",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_076",
    "qType": "assertion_reason",
    "question": "निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-",
    "assertion": "छत्तीसगढ़ की 'धोकरा कला' (Dhokra Art) धातु शिल्पकला के लिए प्रसिद्ध है।",
    "reason": "धोकरा शिल्प में घड़वा जाति के शिल्पी मोम क्षय विधि (Lost Wax Process) द्वारा पीतल/कांस्य की मूर्तियाँ बनाते हैं।",
    "options": [
      "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
      "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।",
      "[As] सत्य है, लेकिन [R] असत्य है।",
      "[As] असत्य है, लेकिन [R] सत्य है।"
    ],
    "correctIndex": 0,
    "explanation": "बस्तर का घड़वा शिल्प/धोकरा कला हस्तशिल्प की मोम क्षय तकनीक के लिए विश्वविख्यात है।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ की लोक कला एवं शिल्प",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_077",
    "qType": "match_column",
    "question": "हिंदी व्याकरण के विकारी पदों को उनके प्रकार से सुमेलित कीजिए-",
    "columnI": [
      "(a) राम",
      "(b) वह",
      "(c) सुंदर",
      "(d) पढ़ना"
    ],
    "columnII": [
      "(I) सर्वनाम",
      "(II) क्रिया",
      "(III) संज्ञा",
      "(IV) विशेषण"
    ],
    "options": [
      "a-III, b-I, c-IV, d-II",
      "a-I, b-II, c-III, d-IV",
      "a-II, b-III, c-I, d-IV",
      "a-IV, b-III, c-II, d-I"
    ],
    "correctIndex": 0,
    "explanation": "राम (संज्ञा), वह (सर्वनाम), सुंदर (विशेषण), पढ़ना (क्रिया)।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "शब्द भेद - विकारी शब्द",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2022",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_078",
    "qType": "ordering",
    "question": "सौरमंडल के सूर्य से ग्रहों की दूरी के बढ़ते क्रम में प्रथम 4 ग्रहों को व्यवस्थित करें-",
    "statements": ["बुध", "शुक्र", "पृथ्वी", "मंगल"],
    "statementLabels": ["P1", "P2", "P3", "P4"],
    "options": [
      "P1 → P2 → P3 → P4",
      "P2 → P1 → P3 → P4",
      "P1 → P3 → P2 → P4",
      "P4 → P3 → P2 → P1"
    ],
    "correctIndex": 0,
    "explanation": "सूर्य से ग्रहों की दूरी का क्रम: बुध (Mercury) → शुक्र (Venus) → पृथ्वी (Earth) → मंगल (Mars)।",
    "subject": "India GS",
    "difficulty": "easy",
    "topic": "सौरमंडल एवं भूगोल",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_079",
    "qType": "multi_statement",
    "question": "तर्कशक्ति के 'कथन एवं पूर्वधारणाओं' के संदर्भ में कौन-से नियम सही माने जाते हैं?",
    "statements": [
      "पूर्वधारणा कथन में अप्रत्यक्ष रूप से निहित (Implicit) होती है।",
      "विज्ञापन या सूचना पर आधारित पूर्वधारणाएँ सामान्यतः मान्य होती हैं।",
      "कथन से बाहर की कल्पना पर आधारित पूर्वधारणा अमान्य होती है।",
      "पूर्वधारणा हमेशा कथन का विरोध करने वाली होनी चाहिए।"
    ],
    "statementLabels": ["L1", "L2", "L3", "L4"],
    "options": [
      "केवल L1, L2 और L3",
      "L1, L2, L3 और L4 सभी",
      "केवल L1 और L4",
      "केवल L2 और L3"
    ],
    "correctIndex": 0,
    "explanation": "पूर्वधारणा कथन को सहारा देने वाली होती है, विरोध करने वाली नहीं। कथन L4 असत्य है।",
    "subject": "Logical Reasoning",
    "difficulty": "hard",
    "topic": "कथन एवं पूर्वधारणाएँ (Statement & Assumptions)",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_080",
    "qType": "standard",
    "question": "छत्तीसगढ़ में 'तांदुला बांध' का निर्माण किस वर्ष हुआ था?",
    "options": ["1913", "1920", "1905", "1936"],
    "correctIndex": 0,
    "explanation": "बालोद जिले में तांदुला नदी पर तांदुला बांध का निर्माण 1913 में पूर्ण हुआ था (राज्य की पहली प्रमुख सिंचाई परियोजना)।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ का इतिहास एवं सिंचाई",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_081",
    "qType": "standard",
    "question": "यदि किसी संख्या और उसके एक-चौथाई का योग 50 है, तो वह संख्या क्या होगी?",
    "options": ["30", "40", "45", "35"],
    "correctIndex": 1,
    "explanation": "$x + \\frac{x}{4} = 50 \\implies \\frac{5x}{4} = 50 \\implies x = 10 \\times 4 = 40$।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "संख्यात्मक समीकरण",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_082",
    "qType": "standard",
    "question": "छत्तीसगढ़ी भाषा में 'माई' का अर्थ 'मुख्य' होता है, जैसे 'माई कोठी'। 'माई पिलिया' का क्या अर्थ है?",
    "options": ["मुख्य बीमारी", "बड़ा मुँह", "मुख्य दीवार / आधार", "मातृभाषा"],
    "correctIndex": 2,
    "explanation": "छत्तीसगढ़ी में मकान की मुख्य/मजबूत दीवार को 'माई पिलिया' कहा जाता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "hard",
    "topic": "छत्तीसगढ़ी शब्दावली",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2021-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_083",
    "qType": "standard",
    "question": "हिंदी में 'सर्वनाम' के कुल कितने भेद होते हैं?",
    "options": ["4", "5", "6", "8"],
    "correctIndex": 2,
    "explanation": "हिंदी में सर्वनाम के 6 भेद होते हैं: पुरुषवाचक, निश्चयवाचक, अनिश्चयवाचक, संबंधवाचक, प्रश्नवाचक और निजवाचक।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "सर्वनाम भेद",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_084",
    "qType": "standard",
    "question": "भारत में 'हरित क्रांति' (Green Revolution) के जनक किसे माना जाता है?",
    "options": ["डॉ. वर्गिज कुरियन", "एम.एस. स्वामीनाथन", "डॉ. होमी भाभा", "सुंदरलाल बहुगुणा"],
    "correctIndex": 1,
    "explanation": "भारत में कृषि उत्पादन बढ़ाने हेतु हरित क्रांति के जनक एम.एस. स्वामीनाथन थे। वर्गिज कुरियन 'श्वेत क्रांति' के जनक थे।",
    "subject": "India GS",
    "difficulty": "easy",
    "topic": "भारतीय कृषि एवं क्रांतियाँ",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_085",
    "qType": "standard",
    "question": "छत्तीसगढ़ के किस जिले को 'शक्कर का कटोरा' या कबीरधाम के साथ 'बॉक्साइट/लौह अयस्क' का समृद्ध क्षेत्र माना जाता है?",
    "options": ["बस्तर", "दंतेवाड़ा", "कबीरधाम", "बलरामपुर"],
    "correctIndex": 2,
    "explanation": "कबीरधाम जिले में शक्कर कारखानों और भोरमदेव क्षेत्र के ऐतिहासिक/कृषि महत्व के कारण इसे पहचान मिली है।",
    "subject": "CG GS",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ के जिले एवं परिचय",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_086",
    "qType": "standard",
    "question": "यदि A का मान 1, B का मान 2, C का मान 3 हो, तो 'FACE' का कुल योग कितना होगा?",
    "options": ["15", "14", "12", "16"],
    "correctIndex": 0,
    "explanation": "F(6) + A(1) + C(3) + E(5) = 6 + 1 + 3 + 5 = 15।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "अक्षर एवं संख्या कोडिंग",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_087",
    "qType": "standard",
    "question": "एक समकोण त्रिभुज का आधार 6 सेमी और ऊँचाई 8 सेमी है। उसका कर्ण (Hypotenuse) कितना होगा?",
    "options": ["9 सेमी", "10 सेमी", "12 सेमी", "14 सेमी"],
    "correctIndex": 1,
    "explanation": "पाइथागोरस प्रमेय: कर्ण = √(6² + 8²) = √(36 + 64) = √100 = 10 सेमी।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "ज्यामिति एवं पाइथागोरस प्रमेय",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_088",
    "qType": "standard",
    "question": "छत्तीसगढ़ी में 'करिया' शब्द का हिंदी अर्थ क्या होता है?",
    "options": ["गोरा", "काला", "कड़वा", "काम"],
    "correctIndex": 1,
    "explanation": "छत्तीसगढ़ी में 'करिया' का मानक हिंदी अर्थ 'काला' (रंग) होता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ी शब्दावली",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_089",
    "qType": "standard",
    "question": "हिंदी में 'अनुराग' और 'विराग' किस प्रकार के शब्द-युग्म हैं?",
    "options": ["पर्यायवाची", "विलोम", "अनेकार्थी", "समानार्थी"],
    "correctIndex": 1,
    "explanation": "अनुराग का अर्थ प्रेम और विराग का अर्थ अनासक्ति/उदासीनता है, अतः ये परस्पर विलोम शब्द हैं।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "शब्द-युग्म",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2022",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_090",
    "qType": "assertion_reason",
    "question": "निर्देश - नीचे दिए गए कथन [As] और कारण [R] के लिए सही विकल्प चुनिए-",
    "assertion": "छत्तीसगढ़ में 'हरेली' त्यौहार वर्ष का प्रथम त्यौहार माना जाता है।",
    "reason": "हरेली के दिन किसान अपने कृषि औजारों (नांगर, रापा आदि) की पूजा करते हैं।",
    "options": [
      "[As] और [R] दोनों सत्य हैं, और [R], [As] की सही व्याख्या है।",
      "[As] और [R] दोनों सत्य हैं, लेकिन [R], [As] की सही व्याख्या नहीं है।",
      "[As] सत्य है, लेकिन [R] असत्य है।",
      "[As] असत्य है, लेकिन [R] सत्य है।"
    ],
    "correctIndex": 1,
    "explanation": "सावन अमावस्या को मनाया जाने वाला हरेली छत्तीसगढ़ी लोकपर्वों की शुरुआत माना जाता है जहाँ कृषि यंत्रों की पूजा होती है। दोनों कथन स्वतंत्र रूप से सत्य हैं।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ के त्यौहार",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_091",
    "qType": "match_column",
    "question": "भारतीय नदियों को उनके उद्गम स्थलों से सुमेलित कीजिए-",
    "columnI": [
      "(a) गंगा",
      "(b) नर्मदा",
      "(c) गोदावरी",
      "(d) महानदी"
    ],
    "columnII": [
      "(I) अमरकंटक",
      "(II) गंगोत्री (गोमुख)",
      "(III) सिहावा पर्वत (धमतरी)",
      "(IV) त्र्यंबकेश्वर (नासिक)"
    ],
    "options": [
      "a-II, b-I, c-IV, d-III",
      "a-I, b-II, c-III, d-IV",
      "a-III, b-IV, c-I, d-II",
      "a-IV, b-III, c-II, d-I"
    ],
    "correctIndex": 0,
    "explanation": "गंगा (गंगोत्री), नर्मदा (अमरकंटक), गोदावरी (त्र्यंबकेश्वर), महानदी (सिहावा पहाड़ी धमतरी)।",
    "subject": "India GS",
    "difficulty": "moderate",
    "topic": "भारत एवं छत्तीसगढ़ का भूगोल - नदियाँ",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_092",
    "qType": "ordering",
    "question": "वर्ष की 4 प्रमुख छत्तीसगढ़ी तिथियों/त्यौहारों को कालानुक्रम (सावन से शुरू करके) व्यवस्थित करें-",
    "statements": ["हरेली", "तीजा (तालिका तीज)", "दशहरा", "दीवाली"],
    "statementLabels": ["F1", "F2", "F3", "F4"],
    "options": [
      "F1 → F2 → F3 → F4",
      "F4 → F3 → F2 → F1",
      "F2 → F1 → F3 → F4",
      "F1 → F3 → F2 → F4"
    ],
    "correctIndex": 0,
    "explanation": "हरेली (सावन अमावस्या) → तीजा (भादो शुक्ल तृतीया) → दशहरा (कुंवार) → दीवाली (कातिक अमावस्या)।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ी पर्व कालक्रम",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_093",
    "qType": "multi_statement",
    "question": "गणित में 'अभाज्य संख्याओं' (Prime Numbers) के संबंध में क्या सत्य है?",
    "statements": [
      "अभाज्य संख्या के केवल दो ही गुणनखंड (1 और वह स्वयं) होते हैं।",
      "2 सबसे छोटी सम अभाज्य संख्या है।",
      "सभी अभाज्य संख्याएँ विषम होती हैं।",
      "1 से 100 के मध्य कुल 25 अभाज्य संख्याएँ होती हैं।"
    ],
    "statementLabels": ["P1", "P2", "P3", "P4"],
    "options": [
      "केवल P1, P2 और P4",
      "P1, P2, P3 और P4 सभी",
      "केवल P1 और P3",
      "केवल P2 और P4"
    ],
    "correctIndex": 0,
    "explanation": "2 एक सम संख्या होते हुए भी अभाज्य है, अतः 'सभी अभाज्य संख्याएँ विषम होती हैं' (P3) गलत है।",
    "subject": "Mathematics",
    "difficulty": "moderate",
    "topic": "संख्या पद्धति",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2020-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_094",
    "qType": "standard",
    "question": "यदि DANCE को 4-1-14-3-5 लिखा जाता है, तो MUSIC को क्या लिखा जाएगा?",
    "options": ["13-21-19-9-3", "13-20-19-9-3", "12-21-18-8-2", "14-22-20-10-4"],
    "correctIndex": 0,
    "explanation": "M=13, U=21, S=19, I=9, C=3। अतः कूट '13-21-19-9-3' होगा।",
    "subject": "Logical Reasoning",
    "difficulty": "easy",
    "topic": "कोडिंग डिकोडिंग",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_095",
    "qType": "standard",
    "question": "छत्तीसगढ़ी में 'भाँटो' शब्द का प्रयोग किस संबंध / रिश्तेदार के लिए किया जाता है?",
    "options": ["जीजा / बहनोई", "मामा", "चाचा", "मांसाहार"],
    "correctIndex": 0,
    "explanation": "छत्तीसगढ़ी पारिवारिक शब्दावली में 'भाँटो' का अर्थ जीजाजी (बड़ी बहन के पति) होता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ी रिश्ते-नाते शब्दावली",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_096",
    "qType": "standard",
    "question": "हिंदी में 'काव्य की आत्मा' किसे माना गया है?",
    "options": ["रस", "अलंकार", "छंद", "गुण"],
    "correctIndex": 0,
    "explanation": "आचार्य विश्वनाथ और सर्वमान्य सिद्धांत के अनुसार 'रस' को काव्य की आत्मा (रसात्मकं वाक्यं काव्यम्) माना गया है।",
    "subject": "Hindi",
    "difficulty": "easy",
    "topic": "रस सिद्धांत",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2018-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_097",
    "qType": "standard",
    "question": "भारतीय संविधान के किस संशोधन द्वारा 'मौलिक कर्तव्यों' (Fundamental Duties) को जोड़ा गया था?",
    "options": ["42वाँ संविधान संशोधन (1976)", "44वाँ संविधान संशोधन (1978)", "86वाँ संविधान संशोधन (2002)", "73वाँ संविधान संशोधन (1992)"],
    "correctIndex": 0,
    "explanation": "स्वर्ण सिंह समिति की सिफारिश पर 42वें संविधान संशोधन 1976 द्वारा भाग 4(A) तथा अनुच्छेद 51(A) जोड़कर मौलिक कर्तव्य शामिल किए गए।",
    "subject": "India GS",
    "difficulty": "easy",
    "topic": "संविधान संशोधन एवं कर्तव्य",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2019-2024",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_098",
    "qType": "standard",
    "question": "छत्तीसगढ़ राज्य का प्रसिद्ध लोक नाट्य 'नाचा' के पितामह / प्रवर्तक किसे माना जाता है?",
    "options": ["दाऊ दुलार सिंह मंद्राजी", "हबीब तनवीर", "पंडित मुकुटधर पांडेय", "गोपाल मिश्र"],
    "correctIndex": 0,
    "explanation": "दाऊ दुलार सिंह मंद्राजी को 'नाचा का भीष्म पितामह' माना जाता है, जिन्होंने 'रवैली नाचा पार्टी' का गठन किया था।",
    "subject": "CG GS",
    "difficulty": "moderate",
    "topic": "छत्तीसगढ़ के लोक कलाकार",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_099",
    "qType": "standard",
    "question": "100 तक की सभी प्राकृतिक संख्याओं का योग कितना होगा?",
    "options": ["5050", "5000", "5150", "10000"],
    "correctIndex": 0,
    "explanation": "सूत्र: $S_n = \\frac{n(n + 1)}{2} = \\frac{100 \\times 101}{2} = 50 \\times 101 = 5050$।",
    "subject": "Mathematics",
    "difficulty": "easy",
    "topic": "संख्या योग",
    "sourcePattern": "CG Vyapam PYQ Inspired",
    "yearTrend": "2019-2023",
    "expectedIn2026": true
  },
  {
    "qId": "MIX_100",
    "qType": "standard",
    "question": "छत्तीसगढ़ी में 'कठवा' शब्द का क्या अर्थ होता है?",
    "options": ["लकड़ी का बना पात्र / बरतन", "कठोर", "कड़वा", "कपड़ा"],
    "correctIndex": 0,
    "explanation": "छत्तीसगढ़ी में 'कठवा' लकड़ी के बने पारंपरिक पात्र या बर्तन (उदा. कठौत) को कहा जाता है।",
    "subject": "Chhattisgarhi Language",
    "difficulty": "easy",
    "topic": "छत्तीसगढ़ी शब्दावली",
    "sourcePattern": "CGPSC PYQ Inspired",
    "yearTrend": "2020-2025",
    "expectedIn2026": true
  }
]
};

async function uploadMockTest() {
  const testId = `test_cgpsc_sse_mock_2026_paper1_${Date.now()}`;
  const timestamp = new Date().toISOString();

  // Balanced target indices for 100 questions (25 of each: 0, 1, 2, 3)
  const pool = [];
  for (let i = 0; i < 25; i++) pool.push(0, 1, 2, 3);
  const targets = shuffleArray(pool);

  console.log(`Processing ${rawTest.questions.length} questions with randomized options...`);

  const processedQuestions = rawTest.questions.map((q, idx) => {
    const qDocId = `q_${testId}_${idx + 1}`;
    const oldCorrectOpt = q.options[q.correctIndex];
    const target = targets[idx];

    const distractors = shuffleArray(q.options.filter((_, i) => i !== q.correctIndex));
    const newOptions = new Array(4);
    newOptions[target] = oldCorrectOpt;
    let d = 0;
    for (let i = 0; i < 4; i++) {
      if (i !== target) {
        newOptions[i] = distractors[d++];
      }
    }

    if (newOptions[target] !== oldCorrectOpt) {
      throw new Error(`Integrity check failed for ${q.qId}`);
    }

    return {
      ...q,
      id: qDocId,
      options: newOptions,
      correctIndex: target,
      weightage: q.weightage || 'medium',
      timestamp,
      testId,
      examId: rawTest.examId,
      examName: rawTest.examName,
      examIds: rawTest.examIds,
      examNames: rawTest.examNames,
      mode: rawTest.mode,
      language: rawTest.language,
      assertion: q.assertion || '',
      reason: q.reason || '',
      columnI: q.columnI || [],
      columnII: q.columnII || [],
      statements: q.statements || [],
      statementLabels: q.statementLabels || []
    };
  });

  const testDoc = {
    id: testId,
    title: rawTest.title,
    examId: rawTest.examId,
    examName: rawTest.examName,
    examIds: rawTest.examIds,
    examNames: rawTest.examNames,
    subject: rawTest.subject,
    mode: rawTest.mode,
    language: rawTest.language,
    questions: processedQuestions,
    pattern: rawTest.pattern,
    createdAt: timestamp,
    topic: 'Full Mock Test - Paper 1',
    topicName: 'Full Mock Test - Paper 1'
  };

  console.log(`Uploading test doc to Firestore 'tests' collection...`);
  await db.collection('tests').doc(testId).set(testDoc);

  console.log(`Uploading 100 individual question docs to 'questions' collection in batches...`);
  let batch = db.batch();
  let count = 0;
  for (const q of processedQuestions) {
    batch.set(db.collection('questions').doc(q.id), q);
    count++;
    if (count % 400 === 0) {
      await batch.commit();
      batch = db.batch();
    }
  }
  if (count % 400 !== 0) {
    await batch.commit();
  }

  // Update admin_tests_meta.json
  const metaPath = path.join(__dirname, '../server/data_cache/admin_tests_meta.json');
  if (fs.existsSync(metaPath)) {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    meta.push({
      id: testId,
      title: testDoc.title,
      examId: testDoc.examId,
      examIds: testDoc.examIds,
      examName: testDoc.examName,
      examNames: testDoc.examNames,
      subject: testDoc.subject,
      mode: testDoc.mode,
      language: testDoc.language,
      totalQuestions: 100,
      pattern: testDoc.pattern,
      createdAt: timestamp,
      topic: testDoc.topic,
      topicName: testDoc.topicName
    });
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
    console.log(`Updated admin_tests_meta.json successfully.`);
  }

  console.log(`\n✅ Successfully uploaded: "${testDoc.title}" (ID: ${testId}) with 100 randomized questions!`);
}

uploadMockTest()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed to upload mock test:', err);
    process.exit(1);
  });
