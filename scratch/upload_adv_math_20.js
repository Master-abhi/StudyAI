const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

function sanitizeForFirestore(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (Array.isArray(item)) {
        return { cells: item.map(sanitizeForFirestore) };
      }
      return sanitizeForFirestore(item);
    });
  }
  if (obj && typeof obj === 'object') {
    const res = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'rows' && Array.isArray(v)) {
        res[k] = v.map(row => {
          if (Array.isArray(row)) return { cells: row.map(sanitizeForFirestore) };
          if (row && typeof row === 'object' && Array.isArray(row.cells)) {
            return { ...row, cells: row.cells.map(sanitizeForFirestore) };
          }
          return row;
        });
      } else {
        res[k] = sanitizeForFirestore(v);
      }
    }
    return res;
  }
  return obj;
}

const topicNotesData = {
  topicId: 'adv_math_20',
  topicName: 'Mathematical Reasoning',
  topicNameHi: 'गणितीय तर्क',
  chapterId: 'cgv_master_sub_3_ch_18',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'गणितीय तर्क (Mathematical Reasoning / गणितीय उपपत्ति) तार्किक चिंतन का वह शुद्ध गणितीय अंग है जो वाक्यों, कथनों (Statements), उनके संयोजनों, तथा सत्यता सारणियों (Truth Tables) का व्यवस्थित विश्लेषण करता है। इसमें सामान्य भाषा के कथनों को प्रतीकात्मक तर्कशास्त्र में रूपांतरित करके उनकी सत्यता, विलोम (Converse), प्रतिलोम (Inverse), और प्रतिधनात्मक (Contrapositive) कथनों की प्रामाणिकता की जाँच की जाती है।',
    importance: 'CG Vyapam (पटवारी, आरआई, एसआई, शिक्षक भर्ती) और CGPSC राज्य सेवा परीक्षा (CSAT) में गणितीय तर्क से 2 से 3 प्रश्न अनिवार्य रूप से पूछे जाते हैं। विशेष रूप से "प्रतिधनात्मक कथन" (Contrapositive), कथनों का निषेधन (Negation) और पुनरुक्ति (Tautology) पर आधारित प्रश्न सर्वाधिक अंकदायी होते हैं।',
    examRelevance: 'परीक्षाओं में सशर्त कथन "यदि $p$ तो $q$" का प्रतिधनात्मक कथन "यदि $\\sim q$ तो $\\sim p$", कथनों का निषेध, तथा सत्यता सारणी के माध्यम से तार्किक निष्कर्ष निकालने वाले प्रश्न सीधे पूछे जाते हैं।',
    quickFacts: [
      'कथन (Statement): ऐसा वाक्य जो या तो पूर्णतः सत्य (T) हो या पूर्णतः असत्य (F), किंतु दोनों एक साथ न हो।',
      'निषेधन (Negation - $\\sim p$): किसी कथन का खंडन। यदि $p$ सत्य है तो $\\sim p$ असत्य होगा।',
      'संयोजन (Conjunction - $p \\land q$): "और" से जुड़ा कथन; यह केवल तभी सत्य होता है जब दोनों घटक $p$ और $q$ सत्य हों।',
      'वियोजन (Disjunction - $p \\lor q$): "या" से जुड़ा कथन; यह केवल तभी असत्य होता है जब दोनों घटक असत्य हों।',
      'सशर्त कथन ($p \\implies q$): का प्रतिधनात्मक (Contrapositive) $\\sim q \\implies \\sim p$ सदैव $p \\implies q$ के तार्किक समतुल्य होता है।',
      'पुनरुक्ति (Tautology): ऐसा यौगिक कथन जो अपने घटकों के सभी सत्यता मानों के लिए सदैव सत्य (T) रहता है।',
      'व्याघात (Contradiction): ऐसा यौगिक कथन जो सदैव असत्य (F) रहता है।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'गणितीय कथन, खुला वाक्य एवं निषेधन',
      content: `### 1. गणितीय कथन (Statement)
गणित में कथन वह सार्थक वाक्य है जिसका निर्णय निर्विवाद रूप से या तो केवल सत्य (True) या केवल असत्य (False) के रूप में किया जा सके।
- **कथन के उदाहरण:**
  - "सूर्य पूर्व में उगता है।" (सत्य कथन)
  - "$2 + 3 = 7$" (असत्य कथन, किंतु कथन है)
  - "सभी सम अभाज्य संख्या केवल 2 है।" (सत्य कथन)
- **जो कथन नहीं हैं (खुले वाक्य / विस्मयादिबोधक / आज्ञार्थक):**
  - "दरवाजा बंद करो।" (आज्ञा)
  - "वाह! कितना सुंदर दृश्य है।" (विस्मय)
  - "$x + 5 = 9$" (खुला वाक्य, क्योंकि $x$ का मान ज्ञात नहीं है)
  - "गणित एक कठिन विषय है।" (व्यक्तिगत राय, सुपरिभाषित नहीं)

### 2. कथन का निषेधन (Negation of a Statement - $\\sim p$)
किसी कथन $p$ के अस्वीकार या खंडन को उसका निषेधन कहते हैं। इसे $\\sim p$ या $\\neg p$ से दर्शाया जाता है।
- यदि $p$: "नई दिल्ली भारत की राजधानी है।" (T)
- तो $\\sim p$: "नई दिल्ली भारत की राजधानी नहीं है।" (F)
- **दोहरा निषेधन नियम:** $\\sim(\\sim p) \\equiv p$`
    },
    {
      id: 'ch2',
      title: 'तार्किक संयोजक एवं यौगिक कथन (Connectives)',
      content: `### 1. तार्किक संयोजक (Logical Connectives)
जब दो या अधिक सरल कथनों को विशिष्ट शब्दों द्वारा जोड़ा जाता है, तो बनने वाले कथन को यौगिक कथन (Compound Statement) कहते हैं:

1. **संयोजन (Conjunction - $\\land$ - "और" / "तथा"):**
   - $p \\land q$ केवल तभी सत्य ($T$) होता है जब $p$ और $q$ दोनों सत्य हों।
2. **वियोजन (Disjunction - $\\lor$ - "या" / "अथवा"):**
   - $p \\lor q$ केवल तभी असत्य ($F$) होता है जब $p$ और $q$ दोनों असत्य हों।
3. **सशर्त कथन (Conditional / Implication - $\\implies$ - "यदि... तो..."):**
   - $p \\implies q$ केवल तभी असत्य ($F$) होता है जब $p$ सत्य हो किंतु $q$ असत्य हो ($T \\implies F = F$)। शेष सभी स्थितियों में यह सत्य होता है।
4. **द्वि-सशर्त कथन (Biconditional - $\\iff$ - "यदि और केवल यदि"):**
   - $p \\iff q$ केवल तभी सत्य ($T$) होता है जब $p$ और $q$ दोनों के सत्यता मान समान हों (दोनों $T$ या दोनों $F$)।`
    },
    {
      id: 'ch3',
      title: 'सत्यता सारणी, पुनरुक्ति एवं व्याघात',
      content: `### 1. मूलभूत सत्यता सारणी (Master Truth Table)
| $p$ | $q$ | $\\sim p$ | $p \\land q$ | $p \\lor q$ | $p \\implies q$ | $p \\iff q$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

### 2. पुनरुक्ति (Tautology - $t$)
यदि किसी यौगिक कथन की सत्यता सारणी के अंतिम स्तंभ में सभी मान **सत्य ($T$)** प्राप्त हों, तो उसे पुनरुक्ति कहते हैं।
- उदाहरण: $p \\lor \\sim p$ सदैव पुनरुक्ति होता है ($T \\lor F = T$, $F \\lor T = T$)।

### 3. व्याघात / विरोधोक्ति (Contradiction / Fallacy - $c$)
यदि सत्यता सारणी के अंतिम स्तंभ में सभी मान **असत्य ($F$)** प्राप्त हों, तो उसे व्याघात कहते हैं।
- उदाहरण: $p \\land \\sim p$ सदैव व्याघात होता है ($T \\land F = F$, $F \\land T = F$)।`
    },
    {
      id: 'ch4',
      title: 'प्रतिधनात्मक, विलोम एवं प्रतिलोम (हॉट एग्जाम टॉपिक)',
      content: `### 1. सशर्त कथन $p \\implies q$ के तीन सहयोगी रूप
माना मूल कथन है: **"यदि $p$, तो $q$"** ($p \\implies q$)

1. **विलोम (Converse):**
   - रूप: $q \\implies p$ ("यदि $q$, तो $p$")
2. **प्रतिलोम (Inverse):**
   - रूप: $\\sim p \\implies \\sim q$ ("यदि $p$ नहीं, तो $q$ नहीं")
3. **प्रतिधनात्मक (Contrapositive):**
   - रूप: $\\sim q \\implies \\sim p$ ("यदि $q$ नहीं, तो $p$ नहीं")

### 2. तार्किक समतुल्यता का महा-नियम (Golden Rule)
$$\\text{मूल कथन } (p \\implies q) \\equiv \\text{प्रतिधनात्मक } (\\sim q \\implies \\sim p)$$
- मूल कथन और उसका प्रतिधनात्मक कथन **तार्किक रूप से पूर्णतः समतुल्य (Equivalence)** होते हैं!
- इसी प्रकार: $\\text{विलोम } (q \\implies p) \\equiv \\text{प्रतिलोम } (\\sim p \\implies \\sim q)$।

**उदाहरण:**
- मूल कथन: "यदि वर्षा होती है, तो सड़क गीली हो जाती है।"
- प्रतिधनात्मक कथन: "यदि सड़क गीली नहीं है, तो वर्षा नहीं हुई है।" (पूर्णतः सत्य एवं समतुल्य!)`
    },
    {
      id: 'ch5',
      title: 'डी-मॉर्गन के नियम एवं परिमाणवाचक (Quantifiers)',
      content: `### 1. तर्कशास्त्र में डी-मॉर्गन के नियम (De Morgan\'s Laws)
1. $\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$
   ("और" का निषेध "या" बन जाता है)
2. $\\sim(p \\lor q) \\equiv \\sim p \\land \\sim q$
   ("या" का निषेध "और" बन जाता है)
3. **सशर्त कथन का निषेध:**
   $$\\sim(p \\implies q) \\equiv p \\land \\sim q$$
   ("यदि $p$ तो $q$" का निषेध: "$p$ सत्य है और $q$ असत्य है")

### 2. परिमाणवाचक (Quantifiers)
- **सार्वत्रिक परिमाणवाचक (Universal Quantifier - $\\forall$):** "सभी के लिए" (For all / Every)।
  - निषेध: "सभी $x$ के लिए $P(x)$ सत्य है" का निषेध $\\implies$ "कम से कम एक ऐसा $x$ है जिसके लिए $P(x)$ असत्य है"।
- **अस्तित्वपरक परिमाणवाचक (Existential Quantifier - $\\exists$):** "एक ऐसा अस्तित्व है" (There exists / At least one)।
  - निषेध: "कम से कम एक" का निषेध $\\implies$ "कोई भी नहीं" (None)।`
    }
  ],
  comparativeTables: [
    {
      title: 'प्रमुख तार्किक संयोजकों की तुलनात्मक सारणी',
      headers: ['संयोजक (Connective)', 'प्रतीक', 'सामान्य भाषा', 'सत्य होने की शर्त', 'असत्य होने की शर्त'],
      rows: [
        ['निषेधन (Negation)', '$\\sim p$', 'नहीं ($p$ नहीं)', 'जब $p$ असत्य हो', 'जब $p$ सत्य हो'],
        ['संयोजन (Conjunction)', '$p \\land q$', 'और / तथा', 'केवल जब दोनों $p$ और $q$ सत्य हों', 'यदि कोई भी एक असत्य हो'],
        ['वियोजन (Disjunction)', '$p \\lor q$', 'या / अथवा', 'यदि कोई भी एक सत्य हो', 'केवल जब दोनों $p$ और $q$ असत्य हों'],
        ['सशर्त (Conditional)', '$p \\implies q$', 'यदि... तो...', 'जब $T \\implies T, F \\implies T, F \\implies F$', 'केवल जब $T \\implies F$ हो'],
        ['द्वि-सशर्त (Biconditional)', '$p \\iff q$', 'यदि और केवल यदि', 'जब दोनों के मान समान हों ($T-T$ या $F-F$)', 'जब दोनों के मान विपरीत हों ($T-F$ या $F-T$)']
      ]
    },
    {
      title: 'सशर्त कथन के सहयोगी रूपों का तुलनात्मक विश्लेषण',
      headers: ['कथन का प्रकार', 'प्रतीकात्मक रूप', 'भाषाई उदाहरण', 'तार्किक समतुल्यता'],
      rows: [
        ['मूल कथन', '$p \\implies q$', 'यदि संख्या 4 से विभाज्य है, तो वह 2 से विभाज्य है', 'प्रतिधनात्मक के समतुल्य'],
        ['विलोम (Converse)', '$q \\implies p$', 'यदि संख्या 2 से विभाज्य है, तो वह 4 से विभाज्य है', 'प्रतिलोम के समतुल्य (मूल के नहीं!)'],
        ['प्रतिलोम (Inverse)', '$\\sim p \\implies \\sim q$', 'यदि संख्या 4 से विभाज्य नहीं है, तो वह 2 से विभाज्य नहीं है', 'विलोम के समतुल्य'],
        ['प्रतिधनात्मक (Contrapositive)', '$\\sim q \\implies \\sim p$', 'यदि संख्या 2 से विभाज्य नहीं है, तो वह 4 से विभाज्य नहीं है', 'मूल कथन के पूर्णतः समतुल्य']
      ]
    },
    {
      title: 'पुनरुक्ति (Tautology) बनाम व्याघात (Contradiction)',
      headers: ['मापदंड', 'पुनरुक्ति (Tautology - $t$)', 'व्याघात (Contradiction - $c$)'],
      rows: [
        ['परिभाषा', 'कथन जो प्रत्येक स्थिति में सदैव सत्य होता है', 'कथन जो प्रत्येक स्थिति में सदैव असत्य होता है'],
        ['सत्यता सारणी का परिणाम', 'अंतिम स्तंभ में सभी मान $T$', 'अंतिम स्तंभ में सभी मान $F$'],
        ['मानक उदाहरण', '$p \\lor \\sim p$', '$p \\land \\sim p$'],
        ['निषेधन संबंध', 'पुनरुक्ति का निषेध व्याघात होता है ($\\sim t = c$)', 'व्याघात का निषेध पुनरुक्ति होता है ($\\sim c = t$)'],
        ['समतुल्य रूप', '$p \\implies p$ (सदैव सत्य)', '$p \\iff \\sim p$ (सदैव असत्य)']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'कथन "यदि कोई संख्या 9 से विभाज्य है, तो वह 3 से भी विभाज्य है" का प्रतिधनात्मक (Contrapositive) कथन क्या होगा? [CG Vyapam SI Mains]',
      options: [
        'यदि कोई संख्या 3 से विभाज्य नहीं है, तो वह 9 से भी विभाज्य नहीं है',
        'यदि कोई संख्या 3 से विभाज्य है, तो वह 9 से भी विभाज्य है',
        'यदि कोई संख्या 9 से विभाज्य नहीं है, तो वह 3 से भी विभाज्य नहीं है',
        'यदि कोई संख्या 3 से विभाज्य है, तो वह 9 से विभाज्य नहीं है'
      ],
      correctOption: 0,
      examName: 'CG Vyapam SI Mains',
      explanation: 'मूल कथन: $p \\implies q$ जहाँ:\n$p$: संख्या 9 से विभाज्य है।\n$q$: संख्या 3 से विभाज्य है।\nप्रतिधनात्मक कथन का सूत्र $\\sim q \\implies \\sim p$ होता है:\n"यदि संख्या 3 से विभाज्य नहीं है, तो वह 9 से भी विभाज्य नहीं है।"'
    },
    {
      id: 'pyq2',
      question: 'कथन $p \\lor \\sim p$ क्या कहलाता है? [CG Vyapam Patwari / RI]',
      options: [
        'पुनरुक्ति (Tautology)',
        'व्याघात (Contradiction)',
        'आकस्मिकता (Contingency)',
        'विलोम (Converse)'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Patwari',
      explanation: 'यदि $p = T$, तो $\\sim p = F \\implies T \\lor F = T$\nयदि $p = F$, तो $\\sim p = T \\implies F \\lor T = T$\nचूँकि दोनों ही स्थितियों में परिणाम सदैव सत्य ($T$) रहता है, अतः यह पुनरुक्ति (Tautology) है।'
    },
    {
      id: 'pyq3',
      question: 'डी-मॉर्गन के नियमानुसार $\\sim(p \\lor q)$ किसके समतुल्य होता है? [CGPSC SSE / Vyapam Combined]',
      options: [
        '$\\sim p \\land \\sim q$',
        '$\\sim p \\lor \\sim q$',
        '$p \\land q$',
        '$\\sim p \\implies \\sim q$'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'डी-मॉर्गन के प्रथम नियम के अनुसार, वियोजन ("या") का निषेध दोनों घटकों के निषेधों का संयोजन ("और") होता है:\n$$\\sim(p \\lor q) \\equiv \\sim p \\land \\sim q$$'
    },
    {
      id: 'pyq4',
      question: 'सशर्त कथन $p \\implies q$ का निषेधन (Negation) क्या होगा? [CG Vyapam Hostel Superintendent]',
      options: [
        '$p \\land \\sim q$',
        '$\\sim p \\lor q$',
        '$\\sim p \\implies \\sim q$',
        '$p \\lor \\sim q$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'हम जानते हैं कि $p \\implies q \\equiv \\sim p \\lor q$\nदोनों पक्षों का निषेध लेने पर:\n$$\\sim(p \\implies q) \\equiv \\sim(\\sim p \\lor q) \\equiv \\sim(\\sim p) \\land \\sim q \\equiv p \\land \\sim q$$'
    },
    {
      id: 'pyq5',
      question: 'कथन "सभी त्रिभुज बहुभुज हैं" का तार्किक निषेध (Negation) क्या होगा? [CG Vyapam Teacher / AMO]',
      options: [
        'कम से कम एक त्रिभुज ऐसा है जो बहुभुज नहीं है',
        'कोई भी त्रिभुज बहुभुज नहीं है',
        'सभी बहुभुज त्रिभुज हैं',
        'सभी त्रिभुज वृत्त हैं'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Teacher',
      explanation: 'सार्वत्रिक परिमाणवाचक "सभी $x$ के लिए $P(x)$" का निषेध अस्तित्वपरक परिमाणवाचक "कम से कम एक $x$ ऐसा है जिसके लिए $\\sim P(x)$" होता है।\nअतः सही निषेध: "कम से कम एक त्रिभुज ऐसा है जो बहुभुज नहीं है।"'
    },
    {
      id: 'pyq6',
      question: 'कथन "यदि तुम मेहनत करोगे, तो तुम सफल होगे" का विलोम (Converse) कथन क्या होगा? [CG Vyapam Assistant Grade 3]',
      options: [
        'यदि तुम सफल होगे, तो तुम मेहनत करोगे',
        'यदि तुम सफल नहीं होगे, तो तुमने मेहनत नहीं की',
        'यदि तुम मेहनत नहीं करोगे, तो तुम सफल नहीं होगे',
        'तुम मेहनत करो और सफल हो जाओ'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Assistant Grade 3',
      explanation: 'मूल कथन $p \\implies q$ का विलोम $q \\implies p$ होता है।\nअतः विलोम कथन: "यदि तुम सफल होगे, तो तुम मेहनत करोगे।"'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'कथन $p \\land \\sim p$ का सत्यता मान सदैव क्या होता है?',
      options: [
        'सदैव असत्य (F - व्याघात)',
        'सदैव सत्य (T - पुनरुक्ति)',
        'कभी सत्य, कभी असत्य',
        'अपरिभाषित'
      ],
      correctOption: 0,
      explanation: '$T \\land F = F$ तथा $F \\land T = F$। अतः $p \\land \\sim p$ सदैव असत्य (Contradiction) होता है।'
    },
    {
      id: 'mcq2',
      question: 'सशर्त कथन $p \\implies q$ केवल किस स्थिति में असत्य ($F$) होता है?',
      options: [
        'जब $p$ सत्य हो और $q$ असत्य हो ($T \\implies F$)',
        'जब $p$ असत्य हो और $q$ सत्य हो ($F \\implies T$)',
        'जब दोनों असत्य हों ($F \\implies F$)',
        'जब दोनों सत्य हों ($T \\implies T$)'
      ],
      correctOption: 0,
      explanation: 'सशर्त कथन केवल तभी असत्य होता है जब पूर्ववर्ती (Antecedent) सत्य हो किंतु परिणाम (Consequent) असत्य हो ($T \\implies F = F$)।'
    },
    {
      id: 'mcq3',
      question: 'कथन "यदि $x = 2$, तो $x^2 = 4$" का प्रतिलोम (Inverse) क्या होगा?',
      options: [
        'यदि $x \\neq 2$, तो $x^2 \\neq 4$',
        'यदि $x^2 = 4$, तो $x = 2$',
        'यदि $x^2 \\neq 4$, तो $x \\neq 2$',
        'यदि $x = -2$, तो $x^2 = 4$'
      ],
      correctOption: 0,
      explanation: 'प्रतिलोम सूत्र: $\\sim p \\implies \\sim q$\nअतः "यदि $x \\neq 2$, तो $x^2 \\neq 4$"।'
    },
    {
      id: 'mcq4',
      question: 'निम्नलिखित में से कौन सा वाक्य गणितीय कथन (Statement) है?',
      options: [
        'प्रत्येक आयत एक समांतर चतुर्भुज होता है',
        'कृपया मुझे एक गिलास पानी दीजिए',
        'ईश्वर आपकी रक्षा करे!',
        'कल वर्षा हो सकती है'
      ],
      correctOption: 0,
      explanation: 'विकल्प A एक निश्चित और निर्विवाद रूप से सत्य गणितीय तथ्य है, अतः यह एक गणितीय कथन है।'
    },
    {
      id: 'mcq5',
      question: 'यदि $p$ सत्य है और $q$ असत्य है, तो $(p \\lor q) \\implies (p \\land q)$ का सत्यता मान क्या होगा?',
      options: [
        'F (असत्य)',
        'T (सत्य)',
        'दोनों',
        'ज्ञात नहीं किया जा सकता'
      ],
      correctOption: 0,
      explanation: '$p \\lor q = T \\lor F = T$\n$p \\land q = T \\land F = F$\nअब $T \\implies F = F$ (असत्य)।'
    },
    {
      id: 'mcq6',
      question: 'द्वि-सशर्त कथन $p \\iff q$ किसके समतुल्य होता है?',
      options: [
        '$(p \\implies q) \\land (q \\implies p)$',
        '$(p \\implies q) \\lor (q \\implies p)$',
        '$\\sim p \\land \\sim q$',
        '$p \\lor q$'
      ],
      correctOption: 0,
      explanation: '$p \\iff q$ का अर्थ है कि $p$ से $q$ निकलता है और $q$ से $p$ निकलता है: $(p \\implies q) \\land (q \\implies p)$।'
    },
    {
      id: 'mcq7',
      question: 'डी-मॉर्गन के नियमानुसार $\\sim(p \\land q)$ किसके समतुल्य है?',
      options: [
        '$\\sim p \\lor \\sim q$',
        '$\\sim p \\land \\sim q$',
        '$p \\lor q$',
        '$\\sim p \\implies q$'
      ],
      correctOption: 0,
      explanation: '$\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$ (संयोजन का निषेध वियोजन बन जाता है)।'
    },
    {
      id: 'mcq8',
      question: 'कथन $p \\implies q$ तार्किक रूप से किसके समतुल्य होता है?',
      options: [
        '$\\sim p \\lor q$',
        '$p \\lor \\sim q$',
        '$\\sim p \\land q$',
        '$p \\land \\sim q$'
      ],
      correctOption: 0,
      explanation: '$p \\implies q \\equiv \\sim p \\lor q$ यह मानक तार्किक समतुल्यता है।'
    }
  ],
  keyTerminology: [
    {
      term: 'Mathematical Statement',
      termHi: 'गणितीय कथन',
      definition: 'A declarative sentence that is definitively either true or false, but cannot be both simultaneously.',
      definitionHi: 'ऐसा घोषणात्मक वाक्य जो निश्चित रूप से या तो केवल सत्य हो या केवल असत्य, किंतु दोनों एक साथ न हो।'
    },
    {
      term: 'Negation ($\\sim p$)',
      termHi: 'निषेधन',
      definition: 'The denial of a proposition reversing its truth value from true to false or vice versa.',
      definitionHi: 'किसी कथन का खंडन जो उसके सत्यता मान को उलट देता है।'
    },
    {
      term: 'Contrapositive',
      termHi: 'प्रतिधनात्मक कथन',
      definition: 'The proposition formed by negating and swapping antecedent and consequent ($\\sim q \\implies \\sim p$), logically equivalent to the original conditional.',
      definitionHi: 'सशर्त कथन के दोनों पदों को उलटकर उनका निषेध करने पर प्राप्त कथन ($\\sim q \\implies \\sim p$) जो मूल कथन के पूर्णतः समतुल्य होता है।'
    },
    {
      term: 'Converse',
      termHi: 'विलोम कथन',
      definition: 'The statement formed by swapping antecedent and consequent without negation ($q \\implies p$).',
      definitionHi: 'सशर्त कथन के पूर्ववर्ती और परिणामी पदों के स्थान आपस में बदलने पर प्राप्त कथन ($q \\implies p$)।'
    },
    {
      term: 'Inverse',
      termHi: 'प्रतिलोम कथन',
      definition: 'The statement formed by negating both antecedent and consequent without changing order ($\\sim p \\implies \\sim q$).',
      definitionHi: 'सशर्त कथन के क्रम को बदले बिना दोनों पदों का निषेध करने पर प्राप्त कथन ($\\sim p \\implies \\sim q$)।'
    },
    {
      term: 'Tautology',
      termHi: 'पुनरुक्ति',
      definition: 'A compound statement that is universally true under every possible truth valuation of its components.',
      definitionHi: 'ऐसा यौगिक कथन जो अपने घटकों के सभी संभव मानों के लिए सदैव सत्य ($T$) रहता है।'
    },
    {
      term: 'Contradiction / Fallacy',
      termHi: 'व्याघात / विरोधोक्ति',
      definition: 'A compound statement that evaluates to false across all possible truth assignments of its constituent propositions.',
      definitionHi: 'ऐसा यौगिक कथन जो प्रत्येक परिस्थिति में सदैव असत्य ($F$) रहता है।'
    },
    {
      term: 'Truth Table',
      termHi: 'सत्यता सारणी',
      definition: 'A mathematical table showing the resulting truth value of a compound logical proposition for all possible combinations of truth values of its variables.',
      definitionHi: 'यौगिक कथनों के सभी संभावित सत्यता मानों को प्रदर्शित करने वाली व्यवस्थित गणितीय सारणी।'
    }
  ],
  sources: [
    {
      title: 'NCERT Class 11 Mathematics - Chapter 14: Mathematical Reasoning',
      author: 'NCERT',
      description: 'गणितीय कथनों, संयोजकों, प्रतिधनात्मक, विलोम एवं सत्यता सारणियों का आधिकारिक मानक संदर्भ।'
    },
    {
      title: 'Discrete Mathematics and Its Applications',
      author: 'Kenneth H. Rosen',
      description: 'प्रतीकात्मक तर्कशास्त्र, पुनरुक्ति, व्याघात और प्रमेयों की उपपत्ति का उच्च स्तरीय मानक ग्रंथ।'
    },
    {
      title: 'CG Vyapam & CGPSC Solved Papers (2015-2024)',
      author: 'CGPEB / CGPSC',
      description: 'छत्तीसगढ़ व्यापम एवं राज्य सेवा आयोग द्वारा आयोजित परीक्षाओं के वास्तविक तर्कशास्त्र प्रश्न।'
    },
    {
      title: 'A Modern Approach to Verbal Reasoning',
      author: 'R.S. Aggarwal',
      description: 'तार्किक निष्कर्ष, कथन और पूर्वधारणाओं का परीक्षा-उन्मुख अभ्यास संग्रह।'
    }
  ],
  confusionBuster: [
    {
      misconception: 'मूल कथन ($p \\implies q$) और उसका विलोम ($q \\implies p$) एक ही अर्थ रखते हैं।',
      clarification: 'यह बहुत आम भूल है! मूल कथन अपने विलोम के समतुल्य नहीं होता। उदाहरण: "यदि कोई वस्तु आम है तो वह फल है" सत्य है, किंतु इसका विलोम "यदि कोई वस्तु फल है तो वह आम है" असत्य है!'
    },
    {
      misconception: 'मूल कथन केवल अपने प्रतिधनात्मक (Contrapositive) के समतुल्य होता है।',
      clarification: 'यह बिल्कुल सही है! $p \\implies q$ सदैव और केवल $\\sim q \\implies \\sim p$ के पूर्णतः समतुल्य होता है।'
    },
    {
      misconception: '"यदि $p$ तो $q$" का निषेध "यदि $p$ तो $\\sim q$" होता है।',
      clarification: 'सशर्त कथन का निषेध कभी सशर्त नहीं होता! इसका निषेध संयोजन होता है: $\\sim(p \\implies q) \\equiv p \\land \\sim q$ ($p$ सत्य है और $q$ असत्य है)।'
    },
    {
      misconception: '"सभी" (All) का निषेध "कोई नहीं" (None) होता है।',
      clarification: '"सभी लड़के ईमानदार हैं" का निषेध "कोई लड़का ईमानदार नहीं है" नहीं होता, बल्कि "कम से कम एक लड़का ईमानदार नहीं है" होता है।'
    },
    {
      misconception: 'आज्ञा या प्रार्थना वाले वाक्य भी गणितीय कथन होते हैं।',
      clarification: 'आज्ञा, प्रश्न या विस्मयादिबोधक वाक्य गणितीय कथन नहीं होते क्योंकि उनके सत्य या असत्य होने का वस्तुनिष्ठ निर्णय नहीं किया जा सकता।'
    }
  ],
  faqList: [
    {
      question: 'गणितीय कथन क्या होता है?',
      answer: 'वह वाक्य जो बिना किसी अस्पष्टता के या तो निश्चित रूप से सत्य हो या निश्चित रूप से असत्य हो, उसे गणितीय कथन कहते हैं।'
    },
    {
      question: 'प्रतिधनात्मक कथन (Contrapositive) क्या है और इसका क्या महत्व है?',
      answer: 'कथन $p \\implies q$ का प्रतिधनात्मक $\\sim q \\implies \\sim p$ होता है। यह मूल कथन के तार्किक रूप से 100% समतुल्य होता है, इसलिए कई प्रमेयों को सीधे सिद्ध करने के बजाय उनके प्रतिधनात्मक को सिद्ध किया जाता है।'
    },
    {
      question: 'पुनरुक्ति (Tautology) और व्याघात (Contradiction) में क्या अंतर है?',
      answer: 'पुनरुक्ति वह कथन है जो प्रत्येक स्थिति में सदैव सत्य ($T$) रहता है (जैसे $p \\lor \\sim p$), जबकि व्याघात वह कथन है जो प्रत्येक स्थिति में सदैव असत्य ($F$) रहता है (जैसे $p \\land \\sim p$)।'
    },
    {
      question: 'डी-मॉर्गन के नियम तर्कशास्त्र में कैसे लागू होते हैं?',
      answer: '$\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$ तथा $\\sim(p \\lor q) \\equiv \\sim p \\land \\sim q$।'
    },
    {
      question: 'CG Vyapam में गणितीय तर्क से किस प्रकार के प्रश्न आते हैं?',
      answer: 'व्यापम में मुख्यतः (1) दिए गए कथन का प्रतिधनात्मक कथन पहचानना, (2) कथनों का निषेध, (3) सत्यता सारणी का मान, और (4) पुनरुक्ति की पहचान के प्रश्न आते हैं।'
    }
  ],
  oneLinerRevision: [
    'गणितीय कथन या तो पूर्णतः सत्य होता है या पूर्णतः असत्य।',
    'कथन $p \\implies q$ का प्रतिधनात्मक $\\sim q \\implies \\sim p$ होता है।',
    'मूल कथन और उसका प्रतिधनात्मक सदैव तार्किक समतुल्य होते हैं।',
    'विलोम: $q \\implies p$; प्रतिलोम: $\\sim p \\implies \\sim q$।',
    'संयोजन ($p \\land q$) केवल $T-T$ पर सत्य होता है।',
    'वियोजन ($p \\lor q$) केवल $F-F$ पर असत्य होता है।',
    '$p \\implies q$ केवल $T \\implies F$ होने पर असत्य होता है।',
    'पुनरुक्ति (Tautology) सदैव सत्य ($T$) होती है ($p \\lor \\sim p$)।',
    'व्याघात (Contradiction) सदैव असत्य ($F$) होता है ($p \\land \\sim p$)।',
    'सशर्त का निषेध: $\\sim(p \\implies q) \\equiv p \\land \\sim q$।'
  ],
  rapidRevision: {
    points: [
      'प्रतिधनात्मक: $\\sim q \\implies \\sim p$ (मूल के समतुल्य)।',
      'विलोम: $q \\implies p$; प्रतिलोम: $\\sim p \\implies \\sim q$।',
      'डी-मॉर्गन: $\\sim(p \\land q) \\equiv \\sim p \\lor \\sim q$ एवं $\\sim(p \\lor q) \\equiv \\sim p \\land \\sim q$।',
      'सत्यता: $p \\lor \\sim p \\equiv T$ (पुनरुक्ति); $p \\land \\sim p \\equiv F$ (व्याघात)।',
      'सशर्त समतुल्यता: $p \\implies q \\equiv \\sim p \\lor q$।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_20 (Mathematical Reasoning)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_20').set(sanitized);
  console.log('✅ cgv_master_adv_math_20 saved to Firestore topic_study_notes!');

  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === 'cgv_master_sub_3') {
        for (const ch of sub.chapters || []) {
          if (ch.id === 'cgv_master_sub_3_ch_18') {
            for (const t of ch.topics || []) {
              if (t.id === 'adv_math_20') {
                t.hasStudyNotes = true;
                updated = true;
              }
            }
          }
        }
      }
    }
    if (updated) {
      await syllabusRef.set(data);
      console.log('✅ syllabi/cgv_master updated: adv_math_20 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 adv_math_20 is synced!');
}

upload().catch(console.error);
