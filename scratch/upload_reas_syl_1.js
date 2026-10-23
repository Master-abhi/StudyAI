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

const reas_syl_1_data = {
  topicId: "reas_syl_1",
  topicName: "Syllogism",
  topicNameHi: "न्याय निगमन (Syllogism - Venn Method & Deductions)",
  chapterId: "cgv_master_sub_4_ch_8",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "न्याय निगमन (Syllogism) निगमनात्मक तर्कशास्त्र (Deductive Logic) का एक अत्यंत वैज्ञानिक, वस्तुनिष्ठ एवं औपचारिक अंग है। इसमें दो या अधिक आधार-कथन (Premises/Statements) दिए जाते हैं, जिन्हें सर्वविदित सत्यों से भिन्न होने पर भी पूर्णतः सत्य मानना होता है (उदा. 'सभी कुत्ते बिल्लियां हैं')। इन कथनों के आधार पर परीक्षार्थी को वेन आरेख विधि (Venn Diagram Method) का प्रयोग करके यह निश्चित करना होता है कि दिए गए निष्कर्षों (Conclusions) में से कौन-सा निष्कर्ष तार्किक रूप से 100% निश्चित (Definitely True), संभावना (Possibility) अथवा असत्य है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, हॉस्टल अधीक्षक, राजस्व निरीक्षक, श्रम उप-निरीक्षक) तथा CGPSC (CSAT एवं राज्य सेवा) में न्याय निगमन से 3 से 5 प्रश्न अनिवार्य रूप से पूछे जाते हैं। यह अध्याय अभ्यर्थी के पूर्वाग्रह-मुक्त तार्किक विश्लेषण, वेन आरेख मॉडलिंग और 'या तो-या' (Either-Or) पूरक युग्मों की पहचान का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में 4 मानक कथन प्रारूप पूछे जाते हैं: (1) सर्वव्यापी सकारात्मक (Universal Affirmative: 'सभी A, B हैं'), (2) सर्वव्यापी नकारात्मक (Universal Negative: 'कोई A, B नहीं है'), (3) अंशव्यापी सकारात्मक (Particular Affirmative: 'कुछ A, B हैं'), तथा (4) अंशव्यापी नकारात्मक (Particular Negative: 'कुछ A, B नहीं हैं')। इसके अतिरिक्त 'केवल कुछ' (Only a few) और संभावना वाले प्रश्नों की आवृत्ति निरंतर बढ़ रही है।",
    quickFacts: [
      "न्याय निगमन का पहला सिद्धांत: दिए गए कथनों को 100% सत्य मानना है, भले ही वे सामान्य सांसारिक तथ्यों (Real-world facts) के विरुद्ध प्रतीत होते हों।",
      "वेन आरेख का न्यूनतम अतिव्यापन नियम (Minimum Overlapping Rule): कथनों का आरेख बनाते समय वृत्तों को केवल उतना ही ओवरलैप करें जितना कथन में अनिवार्य रूप से कहा गया हो।",
      "निश्चितता बनाम संभावना: यदि कोई बात सभी संभावित वेन आरेखों में सत्य हो, केवल तभी वह 'निश्चित निष्कर्ष' (Definite Conclusion) होती है; यदि किसी एक भी आरेख में वह असत्य हो जाए, तो वह निश्चित निष्कर्ष नहीं हो सकती।",
      "पूरक युग्म (Complementary Pairs for Either-Or): 'या तो I या II' के लिए 3 शर्तें अनिवार्य हैं: (i) दोनों निष्कर्ष स्वतंत्र रूप से असत्य/संदेहास्पद हों, (ii) दोनों में कर्ता (Subject) और विधेय (Predicate) समान हों, (iii) एक सकारात्मक और एक नकारात्मक हो (Some + No अथवा All + Some not)।",
      "'केवल कुछ' (Only a few A are B) का दोहरा अर्थ: इसका अर्थ एक साथ दो बातें होता है — 'कुछ A, B हैं' AND 'कुछ A, B नहीं हैं'।"
    ]
  },
  chapters: [
    {
      id: "ch1_four_standard_propositions",
      title: "चार मानक तर्कवाक्य एवं उनके वेन आरेख (Four Standard Propositions & Venn Diagrams)",
      content: `### 1. चार मानक तर्कवाक्य (Four Standard Propositions)

अरस्तू के न्याय निगमन में चार मूलभूत तर्कवाक्य होते हैं:

#### 1. 'A' प्रकार: सर्वव्यापी सकारात्मक (All A are B / सभी A, B हैं):
- **आरेख:** वृत्त A पूरी तरह वृत्त B के अंदर समाहित होता है ($A \\subset B$)।
- **निश्चित वैध निष्कर्ष:**
  - 'कुछ A, B हैं' (Some A are B) $\\implies$ 100% सत्य
  - 'कुछ B, A हैं' (Some B are A) $\\implies$ 100% सत्य
- **अवैध/संदेहास्पद:** 'सभी B, A हैं' (All B are A) $\\implies$ निश्चित नहीं है (संभावना हो सकती है)।

#### 2. 'E' प्रकार: सर्वव्यापी नकारात्मक (No A is B / कोई A, B नहीं है):
- **आरेख:** वृत्त A और वृत्त B एक-दूसरे से पूर्णतः अलग होते हैं और उनके बीच एक क्रॉस ($X$) संबंध होता है।
- **निश्चित वैध निष्कर्ष:**
  - 'कोई B, A नहीं है' (No B is A) $\\implies$ 100% सत्य
  - 'कुछ A, B नहीं हैं' (Some A are not B) $\\implies$ 100% सत्य
  - 'कुछ B, A नहीं हैं' (Some B are not A) $\\implies$ 100% सत्य

#### 3. 'I' प्रकार: अंशव्यापी सकारात्मक (Some A are B / कुछ A, B हैं):
- **आरेख:** वृत्त A और वृत्त B का कुछ उभयनिष्ठ (Common) भाग एक-दूसरे को काटता है।
- **निश्चित वैध निष्कर्ष:**
  - 'कुछ B, A हैं' (Some B are A) $\\implies$ 100% सत्य
- **अवैध/संदेहास्पद:** 'सभी A, B हैं' या 'कुछ A, B नहीं हैं' निश्चित रूप से सत्य नहीं होते।

#### 4. 'O' प्रकार: अंशव्यापी नकारात्मक (Some A are not B / कुछ A, B नहीं हैं):
- **आरेख:** वृत्त A का कम से कम एक विशिष्ट भाग वृत्त B से बाहर रहता है।
- **निश्चित वैध निष्कर्ष:**
  - इसका उलटा ('कुछ B, A नहीं हैं') स्वतः सत्य नहीं होता!`
    },
    {
      id: "ch2_either_or_complementary_pairs",
      title: "पूरक जोड़े एवं 'या तो - या' नियम (Either-Or Conditions & Complementary Pairs)",
      content: `### 2. 'या तो I या II' (Either - Or) की 3 अनिवार्य शर्तें

प्रतियोगी परीक्षाओं में सबसे अधिक अंक 'Either-Or' वाले प्रश्नों में कटते हैं। किसी निष्कर्ष युग्म में 'या तो I या II' तभी लागू होता है जब निम्नलिखित **तीनों शर्तें एक साथ पूरी हों**:

#### 3 स्वर्णिम शर्तें (The 3 Golden Rules):
1. **दोनों निष्कर्ष स्वतंत्र रूप से असत्य (Doubtful / Not Definitely True) होने चाहिए।**
2. **दोनों निष्कर्षों के तत्व (Subject और Predicate) बिल्कुल समान होने चाहिए।**
3. **दोनों मिलकर एक पूरक युग्म (Complementary Pair) बनाते हों:**
   - **युग्म 1:** \`कुछ (Some) + कोई नहीं (No)\` $\\implies$ [सकारात्मक अंशव्यापी + नकारात्मक सर्वव्यापी]
   - **युग्म 2:** \`सभी (All) + कुछ नहीं (Some not)\` $\\implies$ [सकारात्मक सर्वव्यापी + नकारात्मक अंशव्यापी]

#### अपवाद चेतावनी (All + No Trap):
- **\`सभी (All) + कोई नहीं (No)\` कभी भी Either-Or नहीं बनाते!**
- दोनों एक साथ असत्य हो सकते हैं (उदा. 'कुछ' की स्थिति में 'सभी' और 'कोई नहीं' दोनों गलत होते हैं), अतः All + No में उत्तर 'न तो I न II' (Neither I nor II) होता है!`
    },
    {
      id: "ch3_possibility_cases",
      title: "संभावना की अवधारणा एवं नियम (Concept of Possibility)",
      content: `### 3. संभावना (Possibility) वाले प्रश्नों के नियम

जब निष्कर्ष में 'एक संभावना है' (is a possibility / can be) शब्द जुड़ा हो:

#### संभावना का स्वर्णिम सिद्धांत:
$$\\text{यदि कोई बात मूल कथनों (Statements) का उल्लंघन किए बिना किसी भी एक संभावित आरेख में सत्य हो सकती है, तो वह संभावना सत्य होती है!}$$

#### 3 मुख्य नियम:
1. **निश्चित सत्य की संभावना गलत होती है:**
   - यदि कोई निष्कर्ष पहले से ही 100% निश्चित रूप से सत्य है, तो उसकी 'संभावना' कहना तार्किक रूप से **गलत** माना जाता है।
   - उदा. यदि 'सभी A, B हैं' निश्चित है, तो 'सभी A के B होने की संभावना है' असत्य होगा।
2. **नकारात्मक प्रतिबंध में संभावना का निषेध:**
   - यदि कथन में स्पष्ट कहा गया है कि 'कोई A, B नहीं है', तो A और B के बीच किसी भी प्रकार के संबंध की संभावना **शून्य (0%)** होगी।
3. **सकारात्मक कथनों में पूर्ण संभावना:**
   - यदि सभी कथन सकारात्मक ('सभी' या 'कुछ') हैं, तो किन्हीं भी दो चरों के मध्य किसी भी सकारात्मक संबंध की संभावना हमेशा **सत्य** होती है।`
    },
    {
      id: "ch4_modern_patterns_only_a_few",
      title: "आधुनिक शब्दावली: 'केवल कुछ', 'कुछ ही' (Only a Few / Few / At least)",
      content: `### 4. आधुनिक परीक्षाओं की नई शब्दावली

व्यापम और सीजीपीएससी के नवीनतम प्रश्न-पत्रों में पारंपरिक शब्दों के स्थान पर नए शब्द आ रहे हैं:

#### 1. 'केवल कुछ' (Only a few A are B):
यह एक दोहरा कथन (Dual Statement) है:
$$\\text{Only a few A are B} = \\text{Some A are B} + \\text{Some A are not B}$$
- इसका अर्थ है कि कुछ A तो B हैं, परंतु कुछ A ऐसे भी हैं जो कभी B नहीं हो सकते!
- अतः 'सभी A के B होने की संभावना है' हमेशा **गलत** होगी!
- परंतु 'सभी B के A होने की संभावना' सत्य हो सकती है।

#### 2. 'केवल' (Only A are B):
- इसका अर्थ होता है: **'सभी B, A हैं' (All B are A)**, तथा B का किसी अन्य चर (C, D) से कोई संबंध नहीं हो सकता।

#### 3. अन्य समानार्थी शब्द:
- **'कम से कम कुछ' (At least some):** इसका सीधा अर्थ साधारण **'कुछ' (Some)** ही होता है।
- **'अधिकांश / प्रायः / 99% / कई' (Most / Generally / Almost):** इन सभी का तार्किक अर्थ **'कुछ' (Some)** होता है।
- **'प्रत्येक / हर एक / 100%' (Each / Every):** इसका अर्थ **'सभी' (All)** होता है।`
    },
    {
      id: "ch5_vyapam_model_questions",
      title: "व्यापम मॉडल एवं 10 सेकंड हल रणनीति (Speed Hacks)",
      content: `### 5. परीक्षा कक्ष में 100% सटीकता के नियम

1. **न्यूनतम वेन आरेख नियम (Basic Diagram First):**
   - सबसे पहले केवल मूल आरेख (Basic Diagram) बनाएं।
   - यदि कोई निष्कर्ष मूल आरेख में ही गलत दिख रहा है, तो (संभावना को छोड़कर) वह निश्चित निष्कर्ष कभी नहीं हो सकता।

2. **सकारात्मक कथनों से नकारात्मक निष्कर्ष:**
   - यदि सभी कथन सकारात्मक (All/Some) हैं, तो कोई भी सीधा नकारात्मक निष्कर्ष (No/Some not) कभी निश्चित रूप से सत्य नहीं हो सकता।

3. **विकल्पों में 'या तो-या' की तलाश:**
   - जब भी दो निष्कर्ष असत्य मिलें और उनमें एक ही प्रकार के दो शब्द (उदा. पेन, किताब) हों, तो तुरंत 'Either-Or' की तीनों शर्तें जांचें।`
    }
  ],
  comparativeTables: [
    {
      title: "चार मानक तर्कवाक्यों के निश्चित वैध निष्कर्ष",
      headers: ["कथन का प्रकार", "मानक वेन आरेख", "100% निश्चित निष्कर्ष", "अवैध / संदेहास्पद निष्कर्ष"],
      rows: [
        { cells: ["सभी A, B हैं (All A are B)", "A पूरी तरह B के अंदर", "कुछ A, B हैं; कुछ B, A हैं", "सभी B, A हैं; कोई A, B नहीं है"] },
        { cells: ["कोई A, B नहीं है (No A is B)", "A और B पूर्णतः पृथक (Cross)", "कोई B, A नहीं है; कुछ A, B नहीं हैं", "कुछ A, B हैं; सभी A, B हैं"] },
        { cells: ["कुछ A, B हैं (Some A are B)", "A और B का आंशिक प्रतिच्छेदन", "कुछ B, A हैं", "सभी A, B हैं; कोई A, B नहीं है"] },
        { cells: ["कुछ A, B नहीं हैं (Some A not B)", "A का कुछ भाग B से बाहर", "कुछ A, B नहीं हैं (स्वतः)", "कुछ B, A नहीं हैं; कोई A, B नहीं है"] }
      ]
    },
    {
      title: "'या तो - या' (Either-Or) पूरक युग्मों की वैधता",
      headers: ["निष्कर्ष युग्म (Pair)", "तत्व संरचना", "पूरक वैधता", "परिणामी उत्तर"],
      rows: [
        { cells: ["Some A are B + No A is B", "Subject और Predicate समान", "वैध पूरक (100% Valid)", "या तो I या II अनुसरण करता है"] },
        { cells: ["Some A are B + No B is A", "व्युत्क्रम तत्व (Crossed)", "वैध पूरक (Valid)", "या तो I या II अनुसरण करता है"] },
        { cells: ["All A are B + Some A are not B", "समान क्रम में तत्व", "वैध पूरक (Valid)", "या तो I या II अनुसरण करता है"] },
        { cells: ["All A are B + No A is B", "समान तत्व", "अवैध (Invalid Trap!)", "न तो I न II अनुसरण करता है"] }
      ]
    },
    {
      title: "आधुनिक शब्दावली एवं मानक तार्किक समतुल्यता",
      headers: ["परीक्षा में प्रयुक्त शब्द", "वास्तविक तार्किक समतुल्य", "वेन आरेख संक्रिया", "संभावना पर प्रभाव"],
      rows: [
        { cells: ["कम से कम कुछ (At least some)", "कुछ (Some)", "साधारण आंशिक ओवरलैप", "सामान्य संभावना"] },
        { cells: ["अधिकांश / 99% / प्रायः", "कुछ (Some)", "साधारण आंशिक ओवरलैप", "सामान्य संभावना"] },
        { cells: ["प्रत्येक / हर एक (Each/Every)", "सभी (All)", "पूर्ण आंतरिक समावेशन", "सामान्य संभावना"] },
        { cells: ["केवल A, B हैं (Only A are B)", "सभी B, A हैं (All B are A)", "B केवल A के अंदर रहेगा", "B का अन्य से कोई संबंध संभव नहीं"] },
        { cells: ["केवल कुछ A, B हैं (Only a few)", "Some A are B + Some A not B", "आंशिक जुड़ाव + आंशिक निषेध", "All A being B is NOT possible"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "कथन:\n1. सभी कुत्ते बिल्ली हैं।\n2. सभी बिल्ली शेर हैं।\nनिष्कर्ष:\nI. सभी कुत्ते शेर हैं।\nII. कुछ शेर कुत्ते हैं।\n[CG Vyapam Patwari Exam]",
      options: ["दोनों निष्कर्ष I और II अनुसरण करते हैं", "केवल निष्कर्ष I अनुसरण करता है", "केवल निष्कर्ष II अनुसरण करता है", "न तो I न II अनुसरण करता है"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "वेन आरेख: कुत्ता $\\subset$ बिल्ली $\\subset$ शेर।\n- निष्कर्ष I: चूंकि कुत्ते का पूरा वृत्त शेर के वृत्त के अंदर है, अतः 'सभी कुत्ते शेर हैं' 100% सत्य है।\n- निष्कर्ष II: चूंकि कुत्ते शेर के अंदर हैं, अतः शेर के वृत्त का कुछ भाग कुत्ते हैं ('कुछ शेर कुत्ते हैं') यह भी 100% सत्य है।\nअतः दोनों निष्कर्ष I और II अनुसरण करते हैं।"
    },
    {
      id: "pyq2",
      question: "कथन:\n1. कुछ पेन पेंसिल हैं।\n2. कोई पेंसिल रबर नहीं है।\nनिष्कर्ष:\nI. कुछ पेन रबर नहीं हैं।\nII. कोई पेन रबर नहीं है।\n[CG Vyapam Subedar / SI Prelims]",
      options: ["केवल निष्कर्ष I अनुसरण करता है", "केवल निष्कर्ष II अनुसरण करता है", "या तो I या II अनुसरण करता है", "दोनों अनुसरण करते हैं"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "वेन आरेख विश्लेषण:\n- पेन का वह भाग जो पेंसिल के अंदर है, वह कभी भी रबर नहीं हो सकता क्योंकि कोई पेंसिल रबर नहीं है।\n- अतः 'कुछ पेन (जो पेंसिल हैं) रबर नहीं हैं' 100% निश्चित रूप से सत्य है (निष्कर्ष I मान्य)।\n- निष्कर्ष II: 'कोई पेन रबर नहीं है' निश्चित नहीं है क्योंकि पेन का शेष भाग रबर हो भी सकता है।\nअतः केवल निष्कर्ष I अनुसरण करता है।"
    },
    {
      id: "pyq3",
      question: "कथन:\n1. कुछ सेब अंगूर हैं।\n2. कुछ अंगूर आम हैं।\nनिष्कर्ष:\nI. कुछ सेब आम हैं।\nII. कोई सेब आम नहीं है।\n[CGPSC CSAT]",
      options: ["या तो निष्कर्ष I या II अनुसरण करता है", "केवल निष्कर्ष I अनुसरण करता है", "केवल निष्कर्ष II अनुसरण करता है", "न तो I न II अनुसरण करता है"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "विश्लेषण:\n1. सेब और आम के बीच कोई प्रत्यक्ष संबंध नहीं है, अतः स्वतंत्र रूप से दोनों निष्कर्ष I और II संदेहास्पद (Doubtful) हैं।\n2. दोनों में तत्व समान हैं (सेब और आम)।\n3. यह 'कुछ (Some) + कोई नहीं (No)' का एक मान्य पूरक युग्म (Complementary Pair) है।\nअतः या तो निष्कर्ष I या II अनुसरण करता है (Either I or II follows)।"
    },
    {
      id: "pyq4",
      question: "कथन:\n1. सभी पंखे घड़ी हैं।\n2. कुछ घड़ियाँ काली हैं।\nनिष्कर्ष:\nI. सभी पंखे काले हैं।\nII. कुछ घड़ियाँ पंखे हैं।\n[CG Vyapam Hostel Warden]",
      options: ["केवल निष्कर्ष II अनुसरण करता है", "केवल निष्कर्ष I अनुसरण करता है", "दोनों अनुसरण करते हैं", "न तो I न II"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "- निष्कर्ष I: पंखे और काले के बीच कोई सीधा संबंध नहीं है, अतः यह असत्य है।\n- निष्कर्ष II: चूंकि सभी पंखे घड़ी हैं, अतः घड़ियों का कुछ भाग पंखे अवश्य होगा ('कुछ घड़ियाँ पंखे हैं' सत्य है)।\nअतः केवल निष्कर्ष II अनुसरण करता है।"
    },
    {
      id: "pyq5",
      question: "कथन: कोई धातु पत्थर नहीं है। कुछ पत्थर कोयला हैं।\nनिष्कर्ष:\nI. कुछ कोयला धातु नहीं हैं।\nII. कुछ कोयला पत्थर हैं।\n[CG Vyapam Revenue Inspector]",
      options: ["दोनों निष्कर्ष I और II अनुसरण करते हैं", "केवल निष्कर्ष I अनुसरण करता है", "केवल निष्कर्ष II अनुसरण करता है", "कोई अनुसरण नहीं करता"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "- निष्कर्ष I: कोयले का वह भाग जो पत्थर है, वह कभी धातु नहीं हो सकता (सत्य है)।\n- निष्कर्ष II: यदि कुछ पत्थर कोयला हैं, तो कुछ कोयला भी पत्थर होंगे (सत्य है)।\nअतः दोनों निष्कर्ष I और II अनुसरण करते हैं।"
    },
    {
      id: "pyq6",
      question: "कथन: सभी चाबियां ताले हैं। सभी ताले दरवाजे हैं।\nनिष्कर्ष: सभी चाबियों के दरवाजे होने की संभावना है। [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["निष्कर्ष असत्य है (क्योंकि यह पहले से निश्चित सत्य है)", "निष्कर्ष सत्य है", "कहा नहीं जा सकता", "डेटा अपर्याप्त"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "तार्किक नियम: जब कोई निष्कर्ष पहले से ही 100% निश्चित रूप से सत्य हो (सभी चाबियां दरवाजे हैं), तो उसकी 'संभावना' (Possibility) कहना तार्किक रूप से गलत/असत्य माना जाता है।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "कथन: केवल कुछ A, B हैं।\nनिष्कर्ष:\nI. सभी A के B होने की संभावना है।\nII. सभी B के A होने की संभावना है।",
      options: ["केवल निष्कर्ष II अनुसरण करता है", "केवल निष्कर्ष I अनुसरण करता है", "दोनों अनुसरण करते हैं", "कोई अनुसरण नहीं करता"],
      correctOption: 0,
      explanation: "'केवल कुछ A, B हैं' का अर्थ है कि कुछ A कभी B नहीं हो सकते, अतः All A can be B गलत है। परंतु All B can be A सत्य है।"
    },
    {
      id: "mcq2",
      question: "'या तो - या' (Either-Or) के लिए निम्नलिखित में से कौन सा युग्म मान्य नहीं है?",
      options: ["सभी (All) + कोई नहीं (No)", "कुछ (Some) + कोई नहीं (No)", "सभी (All) + कुछ नहीं (Some not)", "कोई नहीं (No) + कुछ (Some)"],
      correctOption: 0,
      explanation: "All + No कभी भी पूरक युग्म नहीं बनाते, क्योंकि वे दोनों एक साथ असत्य हो सकते हैं।"
    },
    {
      id: "mcq3",
      question: "कथन: सभी वर्षा पानी हैं। सभी पानी नीले हैं।\nनिष्कर्ष: कुछ नीले वर्षा हैं।",
      options: ["सत्य है", "असत्य है", "संभावना है", "अनिश्चित है"],
      correctOption: 0,
      explanation: "वृत्त: वर्षा $\\subset$ पानी $\\subset$ नीला। अतः कुछ नीले वर्षा अवश्य हैं (100% सत्य)।"
    },
    {
      id: "mcq4",
      question: "कथन: कुछ किताबें उपन्यास हैं। कुछ उपन्यास कविताएँ हैं।\nनिष्कर्ष:\nI. कुछ किताबें कविताएँ हैं।\nII. कोई किताब कविता नहीं है।",
      options: ["या तो I या II", "केवल I", "केवल II", "न तो I न II"],
      correctOption: 0,
      explanation: "किताब और कविता में कोई प्रत्यक्ष संबंध नहीं है, तत्व समान हैं और Some + No का युग्म है। अतः Either I or II follows।"
    },
    {
      id: "mcq5",
      question: "'कम से कम 40% छात्र होशियार हैं' का तार्किक रूप क्या होगा?",
      options: ["कुछ छात्र होशियार हैं (Some)", "सभी छात्र होशियार हैं", "कोई छात्र होशियार नहीं", "केवल कुछ छात्र"],
      correctOption: 0,
      explanation: "1% से लेकर 99% तक के किसी भी प्रतिशत का तार्किक अर्थ 'कुछ' (Some) होता है।"
    },
    {
      id: "mcq6",
      question: "कथन: कोई पुरुष महिला नहीं है। सभी महिलाएं माताएं हैं।\nनिष्कर्ष: कुछ माताएं पुरुष नहीं हैं।",
      options: ["सत्य है", "असत्य है", "संभावना है", "अनिश्चित"],
      correctOption: 0,
      explanation: "माताओं का वह भाग जो महिलाएं हैं, कभी पुरुष नहीं हो सकता। अतः यह 100% सत्य है।"
    },
    {
      id: "mcq7",
      question: "यदि सभी कथन सकारात्मक हों, तो क्या कोई निश्चित नकारात्मक निष्कर्ष सही हो सकता है?",
      options: ["नहीं, कभी नहीं", "हाँ, हमेशा", "केवल संभावना में", "केवल 3 कथनों में"],
      correctOption: 0,
      explanation: "सकारात्मक कथनों से कभी भी कोई निश्चित नकारात्मक निष्कर्ष नहीं निकाला जा सकता।"
    },
    {
      id: "mcq8",
      question: "'केवल चाबियां ताले हैं' (Only Keys are Locks) का वेन आरेख क्या होगा?",
      options: ["सभी ताले चाबियां हैं (All Locks are Keys)", "सभी चाबियां ताले हैं", "कुछ चाबियां ताले हैं", "कोई चाबी ताला नहीं"],
      correctOption: 0,
      explanation: "'Only A are B' का वेन आरेख सदैव 'All B are A' होता है।"
    }
  ],
  keyTerminology: [
    {
      term: "Syllogism",
      termHi: "न्याय निगमन",
      definition: "A form of deductive reasoning where conclusions are derived necessarily from given premises regardless of empirical truth.",
      definitionHi: "निगमनात्मक तर्कशास्त्र का वह रूप जिसमें दिए गए आधार-कथनों से अनिवार्य तार्किक निष्कर्ष निकाले जाते हैं।"
    },
    {
      term: "Venn Diagram Method",
      termHi: "वेन आरेख विधि",
      definition: "A geometric mapping technique modeling categorical propositions using intersecting circles.",
      definitionHi: "तर्कवाक्यों को अंतःकाटते वृत्तों के माध्यम से निरूपित कर निष्कर्षों की सत्यता परखने की आरेखीय विधि।"
    },
    {
      term: "Either-Or (Complementary Pair)",
      termHi: "या तो - या (पूरक युग्म)",
      definition: "A binary disjunctive logic where exactly one of two contradictory conclusions must hold true.",
      definitionHi: "दो ऐसे विरोधी निष्कर्षों का जोड़ा जिनमें से एक का सत्य होना अनिवार्य होता है (Some + No या All + Some not)।"
    },
    {
      term: "Possibility Case",
      termHi: "संभावना की स्थिति",
      definition: "A condition that does not violate any premise in at least one feasible Venn configuration.",
      definitionHi: "वह निष्कर्ष जो मूल कथनों का उल्लंघन किए बिना कम से कम एक संभावित आरेख में सत्य हो सकता है।"
    },
    {
      term: "'Only a few' Proposition",
      termHi: "'केवल कुछ' तर्कवाक्य",
      definition: "A compound statement simultaneously asserting 'Some A are B' and 'Some A are not B'.",
      definitionHi: "वह आधुनिक तर्कवाक्य जो एक साथ 'कुछ हैं' और 'कुछ नहीं हैं' दोनों को व्यक्त करता है।"
    },
    {
      term: "Minimum Overlapping Rule",
      termHi: "न्यूनतम अतिव्यापन नियम",
      definition: "Drafting the basic Venn diagram strictly adhering to mandated intersections without assuming extraneous overlaps.",
      definitionHi: "वेन आरेख बनाते समय केवल उतनी ही ओवरलैपिंग करना जितना कथनों में स्पष्ट कहा गया हो।"
    },
    {
      term: "Definite Conclusion",
      termHi: "निश्चित निष्कर्ष",
      definition: "A deduction that holds true across 100% of all conceivable Venn representations.",
      definitionHi: "वह निष्कर्ष जो सभी संभावित वेन आरेखों में बिना किसी अपवाद के पूर्णतः सत्य सिद्ध होता है।"
    },
    {
      term: "Universal Negative (No A is B)",
      termHi: "सर्वव्यापी नकारात्मक",
      definition: "Complete disjoint separation between two classes disallowing any shared elements.",
      definitionHi: "दो वर्गों के मध्य पूर्ण अलगाव जहाँ कोई भी तत्व उभयनिष्ठ नहीं हो सकता।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Syllogism Section",
      author: "Dr. R.S. Aggarwal",
      description: "न्याय निगमन, वेन आरेख विधि और पूरक युग्मों का देश का सबसे लोकप्रिय एवं मानक संदर्भ ग्रंथ।"
    },
    {
      title: "Analytical Reasoning: Deductive Logic & Syllogistic Rules",
      author: "M.K. Pandey",
      description: "संभावना की अवधारणा और 'केवल कुछ' (Only a few) के नियमों का संपूर्ण वैज्ञानिक विश्लेषण।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की विभिन्न परीक्षाओं (पटवारी, सूबेदार, राजस्व निरीक्षक) में पूछे गए वास्तविक न्याय निगमन प्रश्न।"
    },
    {
      title: "How to Crack Test of Reasoning - Syllogism",
      author: "Arihant Publications",
      description: "Either-Or की 3 शर्तों और 10-सेकंड वेन शॉर्टकट ट्रिक्स का विस्तृत संकलन।"
    }
  ],
  confusionBuster: [
    {
      misconception: "वास्तविक जीवन के तथ्यों के आधार पर निष्कर्ष तय किए जा सकते हैं (उदा. 'सभी कुत्ते बिल्ली हैं' गलत है क्योंकि कुत्ता बिल्ली नहीं होता)।",
      clarification: "न्याय निगमन का पहला नियम है: कथनों को 100% सत्य मानना है, चाहे वे सांसारिक सत्य के कितने भी विरुद्ध हों!"
    },
    {
      misconception: "'सभी' (All) और 'कोई नहीं' (No) मिलकर 'या तो - या' (Either-Or) बना सकते हैं।",
      clarification: "यह प्रतियोगी परीक्षाओं का सबसे प्रसिद्ध ट्रैप है! All + No कभी भी Either-Or नहीं बनाते; इनका उत्तर 'न तो I न II' (Neither-Nor) होता है।"
    },
    {
      misconception: "यदि कोई बात निश्चित रूप से सत्य है, तो उसकी संभावना भी सत्य होगी।",
      clarification: "नहीं! जो बात पहले से निश्चित रूप से सत्य है, उसकी 'संभावना' कहना तार्किक रूप से गलत माना जाता है।"
    },
    {
      misconception: "'कुछ' (Some) का अर्थ हमेशा 'सभी नहीं' होता है।",
      clarification: "तर्कशास्त्र में 'कुछ' का अर्थ 'कम से कम एक' होता है; यह 'सभी' होने की संभावना को खारिज नहीं करता।"
    },
    {
      misconception: "'केवल कुछ A, B हैं' का अर्थ साधारण 'कुछ A, B हैं' जैसा ही होता है।",
      clarification: "नहीं! 'केवल कुछ' का अर्थ है कि कुछ A, B हैं तथा कुछ A निश्चित रूप से B नहीं हैं।"
    }
  ],
  faqList: [
    {
      question: "न्याय निगमन को हल करने की सबसे सुरक्षित विधि कौन सी है?",
      answer: "वेन आरेख की न्यूनतम अतिव्यापन विधि (Minimum Overlapping Venn Method)। इससे बिना किसी नियम को रटे 100% सटीक उत्तर मिलता है।"
    },
    {
      question: "'या तो - या' (Either-Or) की 3 अनिवार्य शर्तें क्या हैं?",
      answer: "(1) दोनों निष्कर्ष स्वतंत्र रूप से असत्य हों, (2) दोनों के तत्व (Subject/Predicate) समान हों, और (3) वे पूरक युग्म (Some + No या All + Some not) बनाते हों।"
    },
    {
      question: "'केवल कुछ' (Only a few) वाले प्रश्नों में क्या सावधानी रखें?",
      answer: "याद रखें कि इसमें 'All A being B' कभी संभव नहीं हो सकता, परंतु 'All B being A' संभव हो सकता है।"
    },
    {
      question: "सकारात्मक कथनों से नकारात्मक निष्कर्ष कब सही हो सकता है?",
      answer: "निश्चित रूप में कभी नहीं! केवल 'संभावना' (Possibility) में ही सकारात्मक कथनों से नकारात्मक संभावना सत्य हो सकती है।"
    },
    {
      question: "CG Vyapam में न्याय निगमन का क्या वेटेज है?",
      answer: "व्यापम के पटवारी, उप-निरीक्षक और संयुक्त भर्ती में 3 से 5 प्रश्न अनिवार्य रूप से न्याय निगमन से पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "दिए गए कथनों को 100% सत्य मानना अनिवार्य है, भले ही वे सामान्य ज्ञान के विरुद्ध हों।",
    "वेन आरेख बनाते समय केवल न्यूनतम अनिवार्य अतिव्यापन (Minimum Overlap) करें।",
    "'या तो I या II' के दो मान्य पूरक युग्म हैं: Some + No तथा All + Some not।",
    "All + No कभी भी पूरक युग्म नहीं बनाते; इनका उत्तर 'Neither-Nor' होता है।",
    "जो निष्कर्ष पहले से 100% निश्चित सत्य है, उसकी 'संभावना' कहना असत्य होता है।",
    "सकारात्मक कथनों से कोई भी निश्चित नकारात्मक निष्कर्ष नहीं निकाला जा सकता।",
    "'केवल कुछ A, B हैं' का अर्थ है: Some A are B + Some A are not B।",
    "'केवल A, B हैं' का वेन आरेख 'सभी B, A हैं' (All B are A) बनता है।",
    "1% से 99% तक के किसी भी मान का तार्किक अर्थ 'कुछ' (Some) होता है।",
    "अंशव्यापी नकारात्मक (Some not) का व्युत्क्रम स्वतः सत्य नहीं होता।"
  ],
  rapidRevision: {
    points: [
      "Venn Golden Rule: Minimum Overlapping strictly per premise text।",
      "Either-Or Triad: (1) Both Doubtful, (2) Same Subjects, (3) Pair = Some+No OR All+Some Not (Never All+No)!",
      "Possibility Law: A possibility is TRUE if it can happen in any one valid diagram without contradicting statements।",
      "Definite Reality Trap: If definite true $\\implies$ Possibility is FALSE।",
      "Only a Few: $\\text{Only a few A are B} \\implies$ 'All A can never be B'।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_syl_1_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_syl_1');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_syl_1 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_8', 'reas_syl_1');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
