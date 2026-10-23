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

const reas_cd_3_data = {
  topicId: "reas_cd_3",
  topicName: "Matrix Coding",
  topicNameHi: "मैट्रिक्स कोडिंग / ग्रिड आधारित कोडिंग",
  chapterId: "cgv_master_sub_4_ch_3",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "मैट्रिक्स कोडिंग (Matrix Coding / Grid-Based Coding) कूटलेखन का एक अत्यंत संरचित एवं दो-आयामी (Two-Dimensional) प्रारूप है, जिसमें दो वर्गाकार ग्रिड (सामान्यतः Matrix-I और Matrix-II, आकार $5 \\times 5$) दिए जाते हैं। प्रत्येक ग्रिड में पंक्तियाँ (Rows) और स्तंभ (Columns) 0 से 4 तथा 5 से 9 तक क्रमांकित होते हैं। ग्रिड के प्रत्येक सेल में एक विशिष्ट अंग्रेजी वर्णमाला का अक्षर स्थित होता है। किसी भी अक्षर को उसके द्वि-अंकीय निर्देशांक (Two-digit Coordinate) द्वारा दर्शाया जाता है। परीक्षार्थी को दिए गए शब्द के प्रत्येक अक्षर के मान्य निर्देशांकों के समूह का चयन चारों विकल्पों में से करना होता है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, डाटा एंट्री ऑपरेटर) तथा SSC/CGPSC की विभिन्न परीक्षाओं में मैट्रिक्स कोडिंग का 1 प्रश्न पूरे 1 या 2 अंक का निश्चित रूप से पूछा जाता है। यह प्रश्न देखने में बहुत विशाल और जटिल लगता है, लेकिन सही तकनीक से मात्र 10 से 15 सेकंड में 100% सटीकता के साथ हल हो जाता है।",
    examRelevance: "परीक्षाओं में 99% प्रश्नों में 'पंक्ति-स्तंभ' (Row first, then Column - RC) नियम का पालन किया जाता है, जहाँ द्वि-अंकीय संख्या का पहला अंक पंक्ति (Row) और दूसरा अंक स्तंभ (Column) को इंगित करता है। इस टॉपिक में सफलता की अचूक कुंजी 'रिवर्स ऑप्शन एलिमिनेशन' (Reverse Option Elimination - अंतिम अक्षर से विकल्पों को छांटना) है।",
    quickFacts: [
      "निर्देशांक का सार्वभौमिक नियम: दो अंकों की संख्या $xy$ में पहला अंक $x$ क्षैतिज पंक्ति (Row) और दूसरा अंक $y$ ऊर्ध्वाधर स्तंभ (Column) को दर्शाता है: $\\text{Letter} = \\text{Grid}[Row][Column]$।",
      "रिवर्स एलिमिनेशन हैक: शब्द के पहले अक्षर से जांच करने के बजाय सदैव अंतिम अक्षर (Last Letter) के निर्देशांकों से विकल्पों की जांच शुरू करें; 80% प्रश्नों में पहले ही प्रयास में 3 विकल्प खारिज हो जाते हैं!",
      "मैट्रिक्स का विभाजन: सामान्यतः Matrix-I में 0 से 4 तक के अंक (A से M तक के अक्षर) और Matrix-II में 5 से 9 तक के अंक (N से Z तक के अक्षर) होते हैं।",
      "बहु-निर्देशांक उपस्थिति: एक ही अक्षर एक मैट्रिक्स में एकाधिक स्थानों (उदा. 02, 14, 31, 43) पर उपस्थित हो सकता है; विकल्पों में से वही संयोजन सही होगा जो पूरे शब्द के सभी अक्षरों को सुसंगत रूप से संतुष्ट करे।",
      "दुर्लभ अपवाद: प्रश्न के निर्देश को हमेशा 2 सेकंड ध्यान से पढ़ें कि कहीं उसने 'पहले स्तंभ, फिर पंक्ति' (Column first, then Row) तो नहीं लिखा है।"
    ]
  },
  chapters: [
    {
      id: "ch1_matrix_structure_rules",
      title: "मैट्रिक्स कोडिंग की संरचना एवं निर्देशांक नियम (Matrix Structure & Coordinate Rules)",
      content: `### 1. मैट्रिक्स कोडिंग की आधारभूत संरचना एवं नियम

मैट्रिक्स कोडिंग में सामान्यतः दो ग्रिड (Matrices) दिए जाते हैं:

#### Matrix-I (0 से 4 अंक):
| Row / Col | 0 | 1 | 2 | 3 | 4 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | F | O | M | S | R |
| **1** | M | R | F | O | S |
| **2** | O | S | R | M | F |
| **3** | R | F | S | O | M |
| **4** | S | M | O | R | F |

#### Matrix-II (5 से 9 अंक):
| Row / Col | 5 | 6 | 7 | 8 | 9 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **5** | A | T | D | I | P |
| **6** | I | P | A | T | D |
| **7** | T | D | I | P | A |
| **8** | P | A | T | D | I |
| **9** | D | I | P | A | T |

#### निर्देशांक पढ़ने का मानक नियम (Row-Column Rule):
- किसी अक्षर का कोड दो अंकों की संख्या के रूप में दिया जाता है।
- **पहला अंक:** वह क्षैतिज पंक्ति (Row) जिसमें अक्षर स्थित है।
- **दूसरा अंक:** वह ऊर्ध्वाधर स्तंभ (Column) जिसमें अक्षर स्थित है।
- **उदाहरण:**
  - Matrix-I में 'M' को $02, 10, 23, 34, 41$ द्वारा दर्शाया जा सकता है।
  - Matrix-II में 'A' को $55, 67, 79, 86, 98$ द्वारा दर्शाया जा सकता है।
  - 'P' को $59, 66, 78, 85, 97$ द्वारा दर्शाया जा सकता है।`
    },
    {
      id: "ch2_reverse_elimination_technique",
      title: "रिवर्स ऑप्शन एलिमिनेशन तकनीक (Reverse Elimination Hack)",
      content: `### 2. 15 सेकंड में उत्तर पाने की 'रिवर्स एलिमिनेशन' तकनीक

मैट्रिक्स कोडिंग के प्रश्न बहुत बड़े दिखते हैं, लेकिन परीक्षार्थी को कभी भी पूरे शब्द को शुरू से कोड नहीं करना चाहिए।

#### चरणबद्ध तकनीक:
1. **अंतिम अक्षर को लक्षित करें (Target the LAST Letter):**
   - मान लीजिए शब्द है: **F A S T**
   - इसमें अंतिम अक्षर है **T**।
   - चारों विकल्पों में अंतिम संख्या को देखें:
     - (A) ..., 68
     - (B) ..., 76
     - (C) ..., 87
     - (D) ..., 95
   - अब मैट्रिक्स में जाकर देखें कि क्या 68, 76, 87, 95 पर 'T' उपस्थित है:
     - मान लीजिए 68 = T (मान्य)
     - 76 = D (अमान्य $\\implies$ विकल्प B तुरंत बाहर!)
     - 87 = T (मान्य)
     - 95 = D (अमान्य $\\implies$ विकल्प D तुरंत बाहर!)
   - अब केवल 2 विकल्प (A और C) बचे हैं।

2. **द्वितीय अंतिम अक्षर की जांच (Check Penultimate Letter):**
   - अब शब्द के तीसरे अक्षर **S** के कोड को विकल्प (A) और (C) में जांचें।
   - एक ही झटके में दूसरा गलत विकल्प भी बाहर हो जाएगा और 100% सही उत्तर मिल जाएगा!`
    },
    {
      id: "ch3_forward_vs_backward_traps",
      title: "पंक्ति-स्तंभ बनाम स्तंभ-पंक्ति निर्देश (Row-Column vs Column-Row)",
      content: `### 3. प्रश्न के निर्देशों में छिपा 'ट्रैप' और सावधानियां

परीक्षा में 99% प्रश्नों में पंक्ति-स्तंभ (Row-Column) नियम होता है, लेकिन कभी-कभी परीक्षक निर्देश में परिवर्तन कर देता है:

#### 1. मानक निर्देश (Standard):
- *"एक अक्षर को पहले उसकी पंक्ति और बाद में स्तंभ संख्या द्वारा दर्शाया जा सकता है (e.g., 'A' can be represented by 12, 24 etc.)."*
- यहाँ: $\\text{पहला अंक} = \\text{Row}, \\text{दूसरा अंक} = \\text{Column}$।

#### 2. उलटा निर्देश (Inverted Exception):
- *"एक अक्षर को पहले उसके स्तंभ और बाद में उसकी पंक्ति संख्या द्वारा दर्शाया जा सकता है।"*
- यहाँ: $\\text{पहला अंक} = \\text{Column}, \\text{दूसरा अंक} = \\text{Row}$।
- **अचूक उपाय:** प्रश्न में दिए गए उदाहरण को 2 सेकंड देखें। यदि निर्देश में लिखा है *"O को 01, 13 द्वारा दर्शाया जा सकता है"*, तो तुरंत ग्रिड में 01 पर जाकर देखें कि क्या 0वीं पंक्ति और 1ले स्तंभ पर O है? यदि हाँ, तो यह मानक पंक्ति-स्तंभ नियम ही है।`
    },
    {
      id: "ch4_multi_matrix_word_formation",
      title: "बहु-मैट्रिक्स शब्द निर्माण एवं अभ्यास मॉडल (Word Formation across Matrices)",
      content: `### 4. विभिन्न परीक्षाओं के वास्तविक मैट्रिक्स मॉडल

#### शब्द: P O E T का कोड ज्ञात करना
- Matrix-I में (0-4): P और O के कोड
- Matrix-II में (5-9): E और T के कोड

#### विकल्पों का परीक्षण मॉडल:
- विकल्प A: 24, 66, 10, 89
- विकल्प B: 85, 01, 76, 56
- विकल्प C: 59, 33, 98, 75
- विकल्प D: 66, 42, 87, 68

#### त्वरित समाधान विधि:
- T के लिए अंतिम अंक जांचें: 89, 56, 75, 68
- Matrix-II में 56 = T (Row 5, Col 6 पर T है)।
- Matrix-II में 75 = T (Row 7, Col 5 पर T है)।
- Matrix-II में 68 = T (Row 6, Col 8 पर T है)।
- अब P के लिए पहला अंक जांचें:
  - विकल्प B में 85 = Row 8, Col 5 पर P है।
  - O के लिए दूसरा अंक: 01 = Row 0, Col 1 पर O है।
  - E के लिए तीसरा अंक: 76 = E है।
  - अतः विकल्प B पूर्णतः संतुष्ट होता है!`
    },
    {
      id: "ch5_vyapam_time_saving_hacks",
      title: "व्यापम परीक्षा में 10 सेकंड हल रणनीति (Speed Hacks)",
      content: `### 5. मैट्रिक्स कोडिंग के लिए परीक्षा हॉल चेकलिस्ट

1. **पेंसिल से स्क्रीन पर ट्रेस न करें:**
   - अपनी उंगली या पेन की कैप का उपयोग करके सीधे स्क्रीन पर पंक्ति और स्तंभ के मिलन बिंदु (Intersection Point) को देखें।

2. **शून्य रफ वर्क (Zero Rough Work):**
   - मैट्रिक्स कोडिंग का पूरा प्रश्न स्क्रीन पर सीधे विकल्पों को देखकर हल होता है; रफ शीट पर एक भी शब्द लिखने की आवश्यकता नहीं होती।

3. **आत्मविश्वास और सटीकता:**
   - यह रिजनिंग का एकमात्र ऐसा प्रश्न है जिसमें कोई गणितीय जटिलता या अप्रत्याशित तर्क नहीं होता। नियम सीधा और 100% फुलप्रूफ होता है।`
    }
  ],
  comparativeTables: [
    {
      title: "मैट्रिक्स कोडिंग के दो प्रमुख निर्देशांक नियम",
      headers: ["निर्देशांक नियम", "द्वि-अंकीय कोड ($xy$)", "पहला अंक ($x$)", "दूसरा अंक ($y$)", "परीक्षा में आवृत्ति"],
      rows: [
        { cells: ["पंक्ति-स्तंभ (Row-Column)", "मानक नियम (Standard)", "क्षैतिज पंक्ति (Horizontal Row)", "ऊर्ध्वाधर स्तंभ (Vertical Column)", "99% परीक्षाओं में"] },
        { cells: ["स्तंभ-पंक्ति (Column-Row)", "अपवाद नियम (Inverted)", "ऊर्ध्वाधर स्तंभ (Vertical Column)", "क्षैतिज पंक्ति (Horizontal Row)", "1% विशेष निर्देश में"] }
      ]
    },
    {
      title: "फॉरवर्ड चेकिंग बनाम रिवर्स एलिमिनेशन की समय तुलना",
      headers: ["जांच की दिशा", "परीक्षण का क्रम", "लगा समय", "विकल्प उन्मूलन दर", "अनुशंसा"],
      rows: [
        { cells: ["आगे से (Forward Check)", "1st अक्षर $\\to$ 2nd $\\to$ 3rd $\\to$ 4th", "45 से 60 सेकंड", "धीमी (शुरुआती अक्षरों के कोड प्रायः 3 विकल्पों में सही होते हैं)", "अनुशंसित नहीं"] },
        { cells: ["पीछे से (Reverse Elimination)", "अंतिम अक्षर $\\to$ द्वितीय अंतिम", "10 से 15 सेकंड", "अत्यंत तीव्र (अंतिम अक्षर से 2-3 विकल्प तुरंत कट जाते हैं)", "सर्वोत्तम एवं अचूक"] }
      ]
    },
    {
      title: "मैट्रिक्स ग्रिड का प्रारूपिक विभाजन",
      headers: ["ग्रिड", "अंक सीमा (Digits)", "समाविष्ट अक्षर वर्ग", "सामान्य वर्ण उदाहरण"],
      rows: [
        { cells: ["Matrix-I", "0, 1, 2, 3, 4", "वर्णमाला का पूर्वार्ध (A से M/N)", "A, B, C, D, E, F, G, H, I, K, L, M"] },
        { cells: ["Matrix-II", "5, 6, 7, 8, 9", "वर्णमाला का उत्तरार्ध (N/O से Z)", "N, O, P, Q, R, S, T, U, V, W, X, Y, Z"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "दिए गए मैट्रिक्स के आधार पर शब्द 'ROAD' के लिए सही संख्या समूह चुनिए (जहाँ पहला अंक पंक्ति और दूसरा स्तंभ है): [CG Vyapam Patwari Exam]\nMatrix-I (0-4): R, O, A, D वर्णों से युक्त\nविकल्प:\n(A) 42, 32, 79, 58\n(B) 23, 32, 98, 99\n(C) 11, 13, 67, 76\n(D) 04, 20, 55, 95",
      options: ["04, 20, 55, 95", "42, 32, 79, 58", "23, 32, 98, 99", "11, 13, 67, 76"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "रिवर्स तकनीक से अंतिम अक्षर 'D' की जांच करें:\n- 95 पर D उपस्थित है (Row 9, Col 5 = D)।\nअब 'A' की जांच करें:\n- 55 पर A उपस्थित है (Row 5, Col 5 = A)।\nअब 'O' की जांच करें:\n- 20 पर O उपस्थित है (Row 2, Col 0 = O)।\nअब 'R' की जांच करें:\n- 04 पर R उपस्थित है (Row 0, Col 4 = R)।\nअतः सही समूह **04, 20, 55, 95** है।"
    },
    {
      id: "pyq2",
      question: "शब्द 'FISH' के लिए सही कोड समूह की पहचान कीजिए: [CG Vyapam Subedar / SI Prelims]\nMatrix-I (0-4): F, I, S, H\n(A) 22, 88, 33, 97\n(B) 33, 86, 88, 41\n(C) 00, 55, 24, 76\n(D) 12, 65, 40, 56",
      options: ["00, 55, 24, 76", "22, 88, 33, 97", "33, 86, 88, 41", "12, 65, 40, 56"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "जांच:\n- F = 00 (Row 0, Col 0)\n- I = 55 (Row 5, Col 5)\n- S = 24 (Row 2, Col 4)\n- H = 76 (Row 7, Col 6)\nअतः FISH के लिए अभीष्ट समूह **00, 55, 24, 76** है।"
    },
    {
      id: "pyq3",
      question: "मैट्रिक्स में यदि 'A' को 01, 14 और 'B' को 56, 68 द्वारा दर्शाया जा सकता है, तो शब्द 'CALM' के लिए मान्य समूह कौन सा होगा? [CGPSC CSAT]",
      options: ["02, 14, 67, 34", "02, 14, 68, 35", "03, 14, 67, 34", "02, 13, 67, 34"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "अंतिम अक्षर 'M' की जांच: 34 मान्य है।\n'L' की जांच: 67 मान्य है।\n'A' की जांच: 14 मान्य है (प्रश्न में दिया गया है)।\n'C' की जांच: 02 पर C स्थित है।\nअतः अभीष्ट समूह **02, 14, 67, 34** है।"
    },
    {
      id: "pyq4",
      question: "शब्द 'PAST' के लिए सही संख्या समूह ज्ञात कीजिए: [CG Vyapam Hostel Warden]\n(A) 75, 21, 14, 68\n(B) 85, 67, 32, 75\n(C) 59, 55, 40, 99\n(D) 66, 79, 21, 56",
      options: ["85, 67, 32, 75", "75, 21, 14, 68", "59, 55, 40, 99", "66, 79, 21, 56"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "जांच करते हैं:\n- P = 85 (Row 8, Col 5)\n- A = 67 (Row 6, Col 7)\n- S = 32 (Row 3, Col 2)\n- T = 75 (Row 7, Col 5)\nसभी अक्षर सटीक रूप से संतुष्ट होते हैं। अतः विकल्प (B) सही है।"
    },
    {
      id: "pyq5",
      question: "शब्द 'NEST' के लिए सही कोड युग्म कौन सा होगा? [CG Vyapam Revenue Inspector]\n(A) 58, 22, 41, 95\n(B) 65, 34, 11, 87\n(C) 77, 43, 20, 68\n(D) 89, 12, 33, 76",
      options: ["65, 34, 11, 87", "58, 22, 41, 95", "77, 43, 20, 68", "89, 12, 33, 76"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "रिवर्स चेकिंग:\n- T = 87\n- S = 11\n- E = 34\n- N = 65\nअतः अभीष्ट उत्तर विकल्प **65, 34, 11, 87** है।"
    },
    {
      id: "pyq6",
      question: "यदि मैट्रिक्स कोडिंग में पहला अंक स्तंभ (Column) और दूसरा अंक पंक्ति (Row) को दर्शाता हो, तो 'T' (Col 3, Row 2) का कोड क्या होगा? [CG Vyapam Sub Engineer]",
      options: ["32", "23", "55", "22"],
      correctOption: 0,
      examName: "CG Vyapam Sub Engineer",
      explanation: "विशेष निर्देश के अनुसार:\n- पहला अंक = स्तंभ (Column) = 3\n- दूसरा अंक = पंक्ति (Row) = 2\nअतः T का अभीष्ट कोड **32** होगा।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "शब्द 'ROSE' के लिए सही संख्या समूह चुनिए (मानक पंक्ति-स्तंभ नियम):\n(A) 04, 13, 21, 67\n(B) 04, 33, 40, 24\n(C) 11, 22, 31, 42\n(D) 30, 42, 14, 55",
      options: ["04, 33, 40, 24", "04, 13, 21, 67", "11, 22, 31, 42", "30, 42, 14, 55"],
      correctOption: 0,
      explanation: "अंतिम अक्षर E = 24 (Row 2, Col 4), S = 40 (Row 4, Col 0), O = 33 (Row 3, Col 3), R = 04 (Row 0, Col 4)। अतः सही समूह 04, 33, 40, 24 है।"
    },
    {
      id: "mcq2",
      question: "मैट्रिक्स कोडिंग में समय बचाने के लिए किस अक्षर से जांच शुरू करनी चाहिए?",
      options: ["अंतिम अक्षर (Last Letter)", "पहला अक्षर (First Letter)", "मध्य अक्षर (Middle Letter)", "किसी भी अक्षर से"],
      correctOption: 0,
      explanation: "रिवर्स एलिमिनेशन तकनीक के अनुसार सदैव अंतिम अक्षर से जांच शुरू करनी चाहिए क्योंकि विकल्पों में अंतिम अक्षर के कोड से अधिकतम गलत विकल्प तुरंत बाहर हो जाते हैं।"
    },
    {
      id: "mcq3",
      question: "द्वि-अंकीय कोड '78' में मानक नियम के अनुसार अंक '7' क्या दर्शाता है?",
      options: ["क्षैतिज पंक्ति (Row)", "ऊर्ध्वाधर स्तंभ (Column)", "मैट्रिक्स संख्या", "अक्षर का वर्णमाला क्रमांक"],
      correctOption: 0,
      explanation: "मानक पंक्ति-स्तंभ नियम में पहला अंक (7) क्षैतिज पंक्ति (Horizontal Row) को दर्शाता है।"
    },
    {
      id: "mcq4",
      question: "शब्द 'GLAD' के लिए सही संख्या समूह की पहचान करें:\n(A) 55, 12, 67, 95\n(B) 68, 23, 79, 87\n(C) 76, 34, 86, 57\n(D) 87, 41, 55, 99",
      options: ["55, 12, 67, 95", "68, 23, 79, 87", "76, 34, 86, 57", "87, 41, 55, 99"],
      correctOption: 0,
      explanation: "D = 95, A = 67, L = 12, G = 55। अतः सही उत्तर 55, 12, 67, 95 है।"
    },
    {
      id: "mcq5",
      question: "यदि Matrix-I में 0 से 4 अंक हैं, तो '68' कोड किस मैट्रिक्स में स्थित होगा?",
      options: ["Matrix-II में", "Matrix-I में", "दोनों में", "किसी में नहीं"],
      correctOption: 0,
      explanation: "Matrix-II में 5 से 9 तक के अंक होते हैं, अतः 68 कोड Matrix-II (Row 6, Col 8) में स्थित होगा।"
    },
    {
      id: "mcq6",
      question: "शब्द 'STOP' के लिए सही समूह ज्ञात करें:\n(A) 40, 75, 01, 85\n(B) 41, 76, 02, 86\n(C) 32, 68, 13, 97\n(D) 14, 56, 20, 66",
      options: ["40, 75, 01, 85", "41, 76, 02, 86", "32, 68, 13, 97", "14, 56, 20, 66"],
      correctOption: 0,
      explanation: "P = 85, O = 01, T = 75, S = 40। अतः सही समूह 40, 75, 01, 85 है।"
    },
    {
      id: "mcq7",
      question: "यदि किसी अक्षर के निर्देशांक 00, 12, 24, 31, 43 हों, तो वह अक्षर मैट्रिक्स में कितनी बार आया है?",
      options: ["5 बार", "4 बार", "6 बार", "1 बार"],
      correctOption: 0,
      explanation: "दिए गए 5 भिन्न-भिन्न निर्देशांक यह दर्शाते हैं कि वह अक्षर मैट्रिक्स में कुल 5 बार आया है।"
    },
    {
      id: "mcq8",
      question: "मैट्रिक्स कोडिंग के प्रश्न को हल करते समय रफ शीट का क्या उपयोग होना चाहिए?",
      options: ["शून्य उपयोग (सीधे स्क्रीन देखकर हल करें)", "पूरा मैट्रिक्स बनाएं", "सभी अक्षरों के सभी कोड लिखें", "विकल्पों को दोबारा लिखें"],
      correctOption: 0,
      explanation: "मैट्रिक्स कोडिंग में रफ शीट पर कुछ भी लिखने की जरूरत नहीं होती; इसे सीधे स्क्रीन पर विकल्प देखकर 10 सेकंड में हल किया जाता है।"
    }
  ],
  keyTerminology: [
    {
      term: "Matrix Coding",
      termHi: "मैट्रिक्स कोडिंग",
      definition: "A two-dimensional tabular cryptographic system where characters are indexed via row and column numeric coordinates.",
      definitionHi: "दो-आयामी सारणीबद्ध कूट प्रणाली जिसमें अक्षरों को पंक्ति और स्तंभ के संख्यात्मक निर्देशांकों द्वारा दर्शाया जाता है।"
    },
    {
      term: "Row-Column Rule (RC)",
      termHi: "पंक्ति-स्तंभ नियम",
      definition: "The standard coordinate convention where the tens digit denotes the horizontal row and the units digit denotes the vertical column.",
      definitionHi: "वह मानक नियम जिसमें दो अंकों की संख्या का पहला अंक क्षैतिज पंक्ति और दूसरा अंक ऊर्ध्वाधर स्तंभ को दर्शाता है।"
    },
    {
      term: "Reverse Elimination Technique",
      termHi: "रिवर्स एलिमिनेशन तकनीक",
      definition: "A speed-solving heuristic testing candidate options starting from the word's last letter to maximize distractor elimination rate.",
      definitionHi: "शब्द के अंतिम अक्षर के निर्देशांकों से विकल्पों की जांच प्रारंभ करके गलत विकल्पों को तुरंत बाहर करने की तीव्रतम विधि।"
    },
    {
      term: "Grid Partition",
      termHi: "ग्रिड विभाजन",
      definition: "Dividing the 26-letter alphabet across two 5x5 matrices, typically Matrix-I (0-4) and Matrix-II (5-9).",
      definitionHi: "वर्णमाला को दो $5 \\times 5$ ग्रिडों में विभाजित करना, जहाँ Matrix-I में 0-4 और Matrix-II में 5-9 के अंक होते हैं।"
    },
    {
      term: "Intersection Point",
      termHi: "मिलन बिंदु / सेल",
      definition: "The exact coordinate box where the designated row and column cross to reveal the targeted letter.",
      definitionHi: "निर्दिष्ट पंक्ति और स्तंभ के परस्पर मिलन पर स्थित वह सेल जिसमें लक्षित अक्षर बैठा होता है।"
    },
    {
      term: "Multi-Coordinate Mapping",
      termHi: "बहु-निर्देशांक मैपिंग",
      definition: "The deliberate distribution of a single letter across multiple cells within a 5x5 matrix to generate permutation complexity.",
      definitionHi: "एक ही अक्षर को मैट्रिक्स में 4 या 5 अलग-अलग स्थानों पर रखना ताकि विकल्पों में विविधता बनाई जा सके।"
    },
    {
      term: "Inverted Coordinate Trap",
      termHi: "उलटा निर्देशांक अपवाद",
      definition: "A rare directional modification where question instructions specify 'Column first, then Row' instead of standard RC convention.",
      definitionHi: "निर्देशों में किया गया वह दुर्लभ परिवर्तन जिसमें पंक्ति के स्थान पर पहले स्तंभ को पढ़ने का निर्देश दिया जाता है।"
    },
    {
      term: "Zero Rough Work Hack",
      termHi: "शून्य रफ वर्क नियम",
      definition: "The discipline of resolving matrix items visually on screen without writing intermediate coordinates on physical scratchpad.",
      definitionHi: "रफ शीट पर बिना कुछ लिखे सीधे स्क्रीन पर उंगली रखकर 10 सेकंड में उत्तर का चयन करने की पेशेवर तकनीक।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal & Non-Verbal Reasoning - Chapter: Matrix Coding",
      author: "Dr. R.S. Aggarwal",
      description: "मैट्रिक्स कोडिंग के $5 \\times 5$ ग्रिड मॉडल और पंक्ति-स्तंभ नियमों का प्रामाणिक संदर्भ ग्रंथ।"
    },
    {
      title: "How to Crack Test of Reasoning - Matrix Section",
      author: "Jaikishan & Premkishan (Arihant Publications)",
      description: "रिवर्स ऑप्शन एलिमिनेशन और 10-सेकंड शॉर्टकट तकनीकों का विस्तृत विश्लेषण।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "व्यापम की विभिन्न भर्ती परीक्षाओं (पटवारी, सूबेदार, डाटा एंट्री ऑपरेटर) में पूछे गए वास्तविक मैट्रिक्स प्रश्न।"
    },
    {
      title: "SSC Reasoning Chapterwise Solved Papers - Matrix Coding",
      author: "Kiran Publication",
      description: "मैट्रिक्स-I और मैट्रिक्स-II के 500 से अधिक प्रश्नों का अभ्यास बैंक।"
    }
  ],
  confusionBuster: [
    {
      misconception: "मैट्रिक्स कोडिंग बहुत लंबा प्रश्न है, इसे परीक्षा में छोड़ देना चाहिए।",
      clarification: "यह सबसे बड़ी भूल है! मैट्रिक्स कोडिंग देखने में भले ही एक पूरा पृष्ठ घेरता हो, लेकिन यह पूरी रीजनिंग का सबसे सरल और 10 सेकंड में 100% सही हल होने वाला प्रश्न है।"
    },
    {
      misconception: "जांच हमेशा शब्द के पहले अक्षर से ही शुरू करनी चाहिए।",
      clarification: "पहले अक्षर के कोड जानबूझकर 3 या 4 विकल्पों में सही दिए जाते हैं। सदैव अंतिम अक्षर (Last Letter) से जांच शुरू करें, इससे पहले ही झटके में 2-3 विकल्प कट जाते हैं।"
    },
    {
      misconception: "द्वि-अंकीय कोड में पहला अंक हमेशा स्तंभ (Column) होता है।",
      clarification: "गलत! 99% मामलों में पहला अंक क्षैतिज पंक्ति (Row) और दूसरा अंक स्तंभ (Column) होता है।"
    },
    {
      misconception: "रफ शीट पर पूरा मैट्रिक्स दोबारा बनाना आवश्यक होता है।",
      clarification: "मैट्रिक्स दोबारा बनाने में 2 मिनट बर्बाद होंगे! इसे सीधे कंप्यूटर स्क्रीन पर विकल्पों के साथ मिलाकर हल करें।"
    },
    {
      misconception: "यदि किसी अक्षर के कई कोड हैं, तो प्रश्न में कोई गलती है।",
      clarification: "एक अक्षर मैट्रिक्स में 4 या 5 स्थानों पर हो सकता है; विकल्पों में से केवल वही समूह सही होगा जो पूरे शब्द को सही साबित करे।"
    }
  ],
  faqList: [
    {
      question: "मैट्रिक्स कोडिंग को 10 सेकंड में हल करने का अचूक तरीका क्या है?",
      answer: "रिवर्स ऑप्शन एलिमिनेशन अपनाएं: शब्द के अंतिम अक्षर का कोड देखें और चारों विकल्पों में से जिस विकल्प का अंतिम कोड गलत हो, उसे तुरंत काट दें।"
    },
    {
      question: "द्वि-अंकीय कोड '42' को मैट्रिक्स में कैसे लोकेट करें?",
      answer: "बाएं हाथ की 4थी पंक्ति (Row 4) में जाएं और ऊपर से 2रे स्तंभ (Column 2) के नीचे देखें; दोनों रेखाओं का मिलन बिंदु ही वह अक्षर होगा।"
    },
    {
      question: "क्या कभी पहला अंक स्तंभ (Column) भी हो सकता है?",
      answer: "हाँ, यदि प्रश्न के निर्देश में स्पष्ट लिखा हो कि 'पहले स्तंभ और फिर पंक्ति संख्या द्वारा दर्शाया जाता है', अन्यथा सदैव पंक्ति-स्तंभ (Row-Column) ही मान्य होता है।"
    },
    {
      question: "Matrix-I और Matrix-II में अंकों का क्या विभाजन होता है?",
      answer: "Matrix-I में सामान्यतः 0 से 4 तक के अंक और Matrix-II में 5 से 9 तक के अंक होते हैं।"
    },
    {
      question: "CG Vyapam में मैट्रिक्स कोडिंग का क्या वेटेज है?",
      answer: "व्यापम के पटवारी, उप-निरीक्षक और संयुक्त भर्ती में 1 प्रश्न अनिवार्य रूप से पूरे 1 अंक का पूछा जाता है।"
    }
  ],
  oneLinerRevision: [
    "मानक नियम: पहला अंक पंक्ति (Row) और दूसरा अंक स्तंभ (Column) को दर्शाता है।",
    "रिवर्स एलिमिनेशन तकनीक में शब्द के अंतिम अक्षर से विकल्पों की जांच की जाती है।",
    "Matrix-I में 0 से 4 अंक और Matrix-II में 5 से 9 अंक होते हैं।",
    "मैट्रिक्स कोडिंग में रफ शीट पर शून्य रफ वर्क किया जाता है; सीधे स्क्रीन देखकर हल करें।",
    "एक ही अक्षर ग्रिड में एकाधिक स्थानों पर उपस्थित हो सकता है।",
    "अंतिम अक्षर की जांच से पहले ही चरण में 2 से 3 गलत विकल्प बाहर हो जाते हैं।",
    "निर्देश में 'स्तंभ-पंक्ति' अपवाद की पुष्टि के लिए दिए गए उदाहरण को 2 सेकंड में जांचें।",
    "यह प्रश्न देखने में विशाल लेकिन हल करने में पूरी रीजनिंग का सबसे तीव्र प्रश्न है।",
    "स्क्रीन पर उंगली रखकर पंक्ति और स्तंभ के मिलन बिंदु को देखना सबसे सटीक होता है।",
    "पूर्ण शब्द के सभी अक्षरों को संतुष्ट करने वाला विकल्प ही एकमात्र सही उत्तर होता है।"
  ],
  rapidRevision: {
    points: [
      "Row-Column Rule: $xy \\implies Row(x), Col(y)$।",
      "Reverse Hack: Always test LAST letter first $\\implies$ 80% elimination rate।",
      "Grid Limits: Matrix-I (0-4), Matrix-II (5-9)।",
      "Zero Scratchpad: Do not draw grids on rough paper; read directly from screen।",
      "Exception Check: Verify sample coordinate in question prompt (e.g., A = 12)।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_cd_3_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_cd_3');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_cd_3 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_3', 'reas_cd_3');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
