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
  topicId: 'adv_math_6',
  topicName: 'Advanced Probability',
  topicNameHi: 'उन्नत प्रायिकता',
  chapterId: 'cgv_master_sub_3_ch_12',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'उन्नत प्रायिकता (Advanced Probability) अनिश्चितता के गणितीय विश्लेषण का उच्च स्तरीय विस्तार है। सामान्य प्रायिकता में जहां सम-संभावी घटनाओं की सीधी गणना होती है, वहीं उन्नत प्रायिकता में सप्रतिबंध प्रायिकता (Conditional Probability), स्वतंत्र घटनाएं (Independent Events), संपूर्ण प्रायिकता प्रमेय (Total Probability Theorem) तथा बेज़ प्रमेय (Bayes\' Theorem) का प्रयोग कर जटिल परिस्थितियों में किसी घटना के घटित होने की संभावना ज्ञात की जाती है।',
    importance: 'CG Vyapam के उच्च स्तरीय परीक्षाओं जैसे Sub-Inspector (Mains), RI, Patwari, Hostel Superintendent एवं CGPSC SSE/AMO में 1 से 2 प्रश्न अनिवार्य रूप से सप्रतिबंध प्रायिकता, स्वतंत्र घटनाओं और बेज़ प्रमेय के मॉडलों से पूछे जाते हैं।',
    examRelevance: 'इस अध्याय से थैलों से बारी-बारी गेंद निकालने (With/Without Replacement), दो या तीन व्यक्तियों द्वारा किसी समस्या को स्वतंत्र रूप से हल करने की प्रायिकता, तथा दी गई सूचना के आधार पर पूर्व शर्त की प्रायिकता (Conditional/Bayes) जैसे मानक प्रश्न लगातार पूछे जाते हैं।',
    quickFacts: [
      'प्रायिकता का मान सदैव $0 \\le P(E) \\le 1$ के मध्य होता है।',
      'सप्रतिबंध प्रायिकता सूत्र: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ जहां $P(B) > 0$।',
      'यदि दो घटनाएं स्वतंत्र (Independent) हों, तो $P(A \\cap B) = P(A) \\cdot P(B)$ तथा $P(A|B) = P(A)$।',
      'कम से कम एक घटना के घटित होने की प्रायिकता: $P(\\text{At least one}) = 1 - P(A\') \\cdot P(B\') \\cdot P(C\')$।',
      'परस्पर अपवर्जी (Mutually Exclusive) घटनाओं के लिए $P(A \\cap B) = 0$ होता है, अतः वे स्वतंत्र नहीं हो सकतीं (यदि $P(A), P(B) > 0$ हो)।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'प्रायिकता की मूलभूत अवधारणाएँ एवं बीजगणित',
      content: `### 1. प्रतिदर्श समष्टि एवं घटनाएं (Sample Space and Events)
- **यादृच्छिक प्रयोग (Random Experiment):** ऐसा प्रयोग जिसके सभी संभावित परिणाम पहले से ज्ञात हों किंतु किसी विशिष्ट परीक्षण का परिणाम निश्चित रूप से न बताया जा सके।
- **प्रतिदर्श समष्टि (Sample Space - $S$):** किसी यादृच्छिक प्रयोग के सभी संभावित परिणामों का समुच्चय।
- **घटना (Event - $E$):** प्रतिदर्श समष्टि $S$ का कोई भी उपसमुच्चय ($E \\subseteq S$)।

### 2. प्रायिकता की अभिगृहीतिय परिभाषा (Axiomatic Definition of Probability)
यदि $S$ परिमित प्रतिदर्श समष्टि है, तो किसी घटना $A$ की प्रायिकता:
$$P(A) = \\frac{n(A)}{n(S)} = \\frac{\\text{अनुकूल परिणामों की संख्या}}{\\text{कुल संभावित परिणामों की संख्या}}$$

**मूलभूत गुणधर्म:**
1. $0 \\le P(A) \\le 1$
2. $P(\\emptyset) = 0$ (असंभव घटना)
3. $P(S) = 1$ (निश्चित घटना)
4. पूरक घटना: $P(A') = 1 - P(A)$

### 3. प्रायिकता का योग प्रमेय (Addition Theorem of Probability)
किन्हीं दो घटनाओं $A$ और $B$ के लिए:
$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

जहाँ:
- $P(A \\cup B)$ = घटना $A$ या $B$ या दोनों के घटित होने की प्रायिकता।
- $P(A \\cap B)$ = घटना $A$ और $B$ दोनों के एक साथ घटित होने की प्रायिकता।

तीन घटनाओं के लिए:
$$P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(B \\cap C) - P(C \\cap A) + P(A \\cap B \\cap C)$$`
    },
    {
      id: 'ch2',
      title: 'सप्रतिबंध प्रायिकता (Conditional Probability)',
      content: `### 1. सप्रतिबंध प्रायिकता की अवधारणा
जब यह ज्ञात हो कि एक घटना $B$ पहले ही घटित हो चुकी है, तब घटना $A$ के घटित होने की प्रायिकता को सप्रतिबंध प्रायिकता कहा जाता है। इसे $P(A|B)$ द्वारा निरूपित किया जाता है।

**गणितीय सूत्र:**
$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad \\text{जहाँ } P(B) > 0$$

समान रूप से:
$$P(B|A) = \\frac{P(A \\cap B)}{P(A)}, \\quad \\text{जहाँ } P(A) > 0$$

### 2. प्रायिकता का गुणन नियम (Multiplication Rule of Probability)
सप्रतिबंध प्रायिकता के सूत्र से:
$$P(A \\cap B) = P(B) \\cdot P(A|B) = P(A) \\cdot P(B|A)$$

तीन घटनाओं $A, B, C$ के लिए गुणन नियम:
$$P(A \\cap B \\cap C) = P(A) \\cdot P(B|A) \\cdot P(C | (A \\cap B))$$

### 3. उदाहरण: ताश की गड्डी से पत्ते निकालना (बिना प्रतिस्थापन)
52 पत्तों की गड्डी से दो पत्ते एक के बाद एक बिना प्रतिस्थापन के निकाले जाते हैं। दोनों के इक्का (Ace) होने की प्रायिकता:
- पहले पत्ते के इक्का होने की प्रायिकता $P(A) = \\frac{4}{52}$
- पहले इक्का निकलने के बाद दूसरे के इक्का होने की प्रायिकता $P(B|A) = \\frac{3}{51}$
- दोनों के इक्का होने की प्रायिकता:
$$P(A \\cap B) = P(A) \\cdot P(B|A) = \\frac{4}{52} \\times \\frac{3}{51} = \\frac{1}{13} \\times \\frac{1}{17} = \\frac{1}{221}$$`
    },
    {
      id: 'ch3',
      title: 'स्वतंत्र घटनाएं (Independent Events)',
      content: `### 1. स्वतंत्र घटनाओं की परिभाषा
दो घटनाएं $A$ और $B$ स्वतंत्र घटनाएं कहलाती हैं यदि किसी एक घटना के घटित होने या न होने का प्रभाव दूसरी घटना के घटित होने की प्रायिकता पर नहीं पड़ता है।

**गणितीय शर्त:**
$$P(A|B) = P(A) \\quad \\text{तथा} \\quad P(B|A) = P(B)$$
अतः गुणन नियम से:
$$P(A \\cap B) = P(A) \\cdot P(B)$$

### 2. स्वतंत्र घटनाओं के महत्वपूर्ण गुणधर्म
1. यदि $A$ और $B$ स्वतंत्र हैं, तो:
   - $A$ और $B'$ भी स्वतंत्र होंगी: $P(A \\cap B') = P(A) \\cdot P(B')$
   - $A'$ और $B$ भी स्वतंत्र होंगी: $P(A' \\cap B) = P(A') \\cdot P(B)$
   - $A'$ और $B'$ भी स्वतंत्र होंगी: $P(A' \\cap B') = P(A') \\cdot P(B')$
2. **कम से कम एक घटना के घटित होने की प्रायिकता (At Least One Event):**
   यदि $A, B, C$ स्वतंत्र घटनाएं हैं:
   $$P(\\text{At least one}) = 1 - P(A' \\cap B' \\cap C') = 1 - P(A') \\cdot P(B') \\cdot P(C')$$

### 3. परस्पर अपवर्जी बनाम स्वतंत्र घटनाएं (Mutually Exclusive vs Independent)
- **परस्पर अपवर्जी (Mutually Exclusive):** वे घटनाएं जो एक साथ कभी घटित नहीं हो सकतीं ($A \\cap B = \\emptyset \\implies P(A \\cap B) = 0$)।
- **स्वतंत्र (Independent):** एक का प्रभाव दूसरे पर नहीं पड़ता ($P(A \\cap B) = P(A) \\cdot P(B)$)।
- **निष्कर्ष:** यदि $P(A) > 0$ तथा $P(B) > 0$ हो, तो दो घटनाएं एक साथ परस्पर अपवर्जी और स्वतंत्र कभी नहीं हो सकतीं!`
    },
    {
      id: 'ch4',
      title: 'संपूर्ण प्रायिकता प्रमेय एवं बेज़ प्रमेय (Total Probability & Bayes\' Theorem)',
      content: `### 1. प्रतिदर्श समष्टि का विभाजन (Partition of Sample Space)
यदि घटनाएं $E_1, E_2, \\dots, E_n$ परस्पर अपवर्जी ($E_i \\cap E_j = \\emptyset$) और संपूर्ण ($E_1 \\cup E_2 \\cup \\dots \\cup E_n = S$) हों तथा $P(E_i) > 0$ हो।

### 2. संपूर्ण प्रायिकता का प्रमेय (Theorem of Total Probability)
यदि $A$ प्रतिदर्श समष्टि $S$ से संबंधित कोई घटना हो, तो:
$$P(A) = \\sum_{i=1}^n P(E_i) \\cdot P(A|E_i) = P(E_1)P(A|E_1) + P(E_2)P(A|E_2) + \\dots + P(E_n)P(A|E_n)$$

### 3. बेज़ प्रमेय (Bayes\' Theorem / Inverse Probability)
यदि घटना $A$ पहले ही घटित हो चुकी है, तो इस बात की प्रायिकता कि यह किसी विशिष्ट कारण या घटना $E_k$ के कारण घटित हुई है:
$$P(E_k|A) = \\frac{P(E_k) \\cdot P(A|E_k)}{\\sum_{i=1}^n P(E_i) \\cdot P(A|E_i)}$$

जहाँ:
- $P(E_k)$ = पूर्व प्रायिकता (Prior Probability)
- $P(A|E_k)$ = संभावना (Likelihood)
- $P(E_k|A)$ = उत्तर प्रायिकता (Posterior Probability)

### 4. बेज़ प्रमेय का क्लासिक थैला मॉडल
- थैला I में 3 लाल और 4 काली गेंदें हैं।
- थैला II में 5 लाल और 6 काली गेंदें हैं।
- एक थैला यादृच्छया चुना जाता है और उसमें से एक गेंद निकाली जाती है जो लाल निकलती है।
- इस गेंद के थैला I से निकाले जाने की प्रायिकता बेज़ प्रमेय द्वारा सरलता से प्राप्त की जाती है।`
    },
    {
      id: 'ch5',
      title: 'परीक्षा उपयोगी प्रश्न मॉडल एवं शॉर्टकट ट्रिक्स',
      content: `### मॉडल 1: स्वतंत्र निशानेबाज/समस्या समाधान प्रश्न
**प्रश्न:** $A$ द्वारा किसी लक्ष्य को भेदने की प्रायिकता $\\frac{2}{3}$ है और $B$ द्वारा भेदने की प्रायिकता $\\frac{3}{4}$ है। यदि दोनों एक साथ निशाना साधते हैं, तो:
1. **लक्ष्य पर कम से कम एक गोली लगने की प्रायिकता:**
   $$P(\\text{At least one}) = 1 - P(A') \\cdot P(B')$$
   $$P(A') = 1 - \\frac{2}{3} = \\frac{1}{3}, \\quad P(B') = 1 - \\frac{3}{4} = \\frac{1}{4}$$
   $$P(\\text{At least one}) = 1 - \\left(\\frac{1}{3} \\times \\frac{1}{4}\\right) = 1 - \\frac{1}{12} = \\frac{11}{12}$$

2. **लक्ष्य पर ठीक एक (Exactly one) गोली लगने की प्रायिकता:**
   $$P(\\text{Exactly one}) = P(A)P(B') + P(A')P(B)$$
   $$= \\left(\\frac{2}{3} \\times \\frac{1}{4}\\right) + \\left(\\frac{1}{3} \\times \\frac{3}{4}\\right) = \\frac{2}{12} + \\frac{3}{12} = \\frac{5}{12}$$

### मॉडल 2: सत्य बोलने वाले व्यक्ति (Truth-Telling Model)
**प्रश्न:** $A$ 75% मामलों में सच बोलता है और $B$ 80% मामलों में। किसी तथ्य के कथन में दोनों के परस्पर विरोधाभासी (Contradict) होने की प्रायिकता क्या होगी?
- विरोधाभास तब होगा जब: ($A$ सच बोले और $B$ झूठ बोले) अथवा ($A$ झूठ बोले और $B$ सच बोले)।
$$P(A) = \\frac{3}{4}, \\quad P(A') = \\frac{1}{4}$$
$$P(B) = \\frac{4}{5}, \\quad P(B') = \\frac{1}{5}$$
$$P(\\text{Contradiction}) = P(A)P(B') + P(A')P(B) = \\left(\\frac{3}{4} \\times \\frac{1}{5}\\right) + \\left(\\frac{1}{4} \\times \\frac{4}{5}\\right) = \\frac{3}{20} + \\frac{4}{20} = \\frac{7}{20} = 35\\%$$

### मॉडल 3: प्रतिस्थापन सहित बनाम रहित (With vs Without Replacement)
- **प्रतिस्थापन सहित (With replacement):** प्रत्येक बार प्रतिदर्श समष्टि अपरिवर्तित रहती है। प्रत्येक परीक्षण स्वतंत्र (Independent) होता है।
- **प्रतिस्थापन रहित (Without replacement):** प्रत्येक बार कुल संख्या घटती है। प्रत्येक परीक्षण आश्रित (Dependent) होता है, यहाँ सप्रतिबंध प्रायिकता का गुणन नियम लागू होता है।`
    }
  ],
  comparativeTables: [
    {
      title: 'परस्पर अपवर्जी घटनाएं बनाम स्वतंत्र घटनाएं',
      headers: ['आधार / विशेषता', 'परस्पर अपवर्जी घटनाएं (Mutually Exclusive)', 'स्वतंत्र घटनाएं (Independent Events)'],
      rows: [
        ['परिभाषा', 'दोनों घटनाएं एक साथ कभी घटित नहीं हो सकतीं', 'एक घटना का घटित होना दूसरी घटना की संभावना को प्रभावित नहीं करता'],
        ['उभयनिष्ठ प्रतिदर्श ($A \\cap B$)', '$A \\cap B = \\emptyset$ (रिक्त समुच्चय)', '$A \\cap B \\neq \\emptyset$ (सामान्यतः)'],
        ['संयुक्त प्रायिकता सूत्र', '$P(A \\cap B) = 0$', '$P(A \\cap B) = P(A) \\cdot P(B)$'],
        ['योग प्रमेय में रूप', '$P(A \\cup B) = P(A) + P(B)$', '$P(A \\cup B) = P(A) + P(B) - P(A) \\cdot P(B)$'],
        ['सप्रतिबंध प्रायिकता', '$P(A|B) = 0$', '$P(A|B) = P(A)$ तथा $P(B|A) = P(B)$'],
        ['दैनिक उदाहरण', 'एक सिक्के को उछालने पर चित्त (Head) और पट् (Tail) आना', 'दो अलग-अलग सिक्कों को उछालने पर दोनों पर चित्त आना']
      ]
    },
    {
      title: 'सरल प्रायिकता बनाम सप्रतिबंध प्रायिकता बनाम बेज़ प्रमेय',
      headers: ['तुलना का आधार', 'सरल प्रायिकता (Simple)', 'सप्रतिबंध प्रायिकता (Conditional)', 'बेज़ प्रमेय (Bayes\' Theorem)'],
      rows: [
        ['संकेतन', '$P(A)$', '$P(A|B)$', '$P(E_k|A)$'],
        ['शर्त की उपस्थिति', 'कोई पूर्व शर्त नहीं होती', 'एक घटना $B$ का घटित होना ज्ञात होता है', 'अंतिम परिणाम $A$ ज्ञात होता है, कारण $E_k$ की प्रायिकता पूछी जाती है'],
        ['प्रतिदर्श समष्टि', 'संपूर्ण मूल समष्टि $S$', 'घटित घटना $B$ तक सीमित', 'विभाजित समष्टि $\\sum P(E_i)P(A|E_i)$'],
        ['गणना की दिशा', 'प्रत्यक्ष (Forward)', 'प्रत्यक्ष सशर्त (Forward conditional)', 'उलटी प्रायिकता (Inverse / Backward)'],
        ['मूल सूत्र', '$P(A) = \\frac{n(A)}{n(S)}$', '$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$', '$P(E_k|A) = \\frac{P(E_k)P(A|E_k)}{\\sum P(E_i)P(A|E_i)}$']
      ]
    },
    {
      title: 'प्रतिस्थापन सहित बनाम प्रतिस्थापन रहित चयन',
      headers: ['मापदंड', 'प्रतिस्थापन सहित (With Replacement)', 'प्रतिस्थापन रहित (Without Replacement)'],
      rows: [
        ['वस्तु की स्थिति', 'निकाली गई वस्तु को वापस रखा जाता है', 'निकाली गई वस्तु को बाहर ही रखा जाता है'],
        ['कुल संख्या $n$', 'प्रत्येक ड्रा में कुल संख्या स्थिर रहती है', 'प्रत्येक ड्रा में कुल संख्या $1$ घट जाती है'],
        ['घटनाओं की प्रकृति', 'घटनाएं पूरी तरह स्वतंत्र (Independent) होती हैं', 'घटनाएं परस्पर आश्रित (Dependent) होती हैं'],
        ['प्रायिकता मान', 'प्रत्येक चरण में सफलता की प्रायिकता $p$ स्थिर रहती है', 'अगले चरण में सफलता की प्रायिकता बदल जाती है'],
        ['लागू गणितीय मॉडल', 'द्विपद बंटन / स्वतंत्र गुणन', 'सप्रतिबंध प्रायिकता / संचय $\\binom{n}{r}$ विधि']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'यदि $P(A) = 0.8$, $P(B) = 0.5$ तथा $P(B|A) = 0.4$ हो, तो $P(A \\cap B)$ तथा $P(A|B)$ का मान क्रमशः क्या होगा? [CG Vyapam SI Mains]',
      options: [
        '0.32 और 0.64',
        '0.40 और 0.50',
        '0.32 और 0.40',
        '0.20 और 0.64'
      ],
      correctOption: 0,
      examName: 'CG Vyapam SI Mains',
      explanation: 'गुणन नियम से:\n$$P(A \\cap B) = P(A) \\cdot P(B|A) = 0.8 \\times 0.4 = 0.32$$\nअब सप्रतिबंध प्रायिकता सूत्र से:\n$$P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.32}{0.5} = 0.64$$\nअतः सही उत्तर 0.32 और 0.64 है।'
    },
    {
      id: 'pyq2',
      question: 'एक समस्या $A, B$ और $C$ तीन विद्यार्थियों को हल करने के लिए दी जाती है। उनके द्वारा समस्या हल करने की प्रायिकताएं क्रमशः $\\frac{1}{2}, \\frac{1}{3}$ और $\\frac{1}{4}$ हैं। समस्या हल हो जाने की प्रायिकता क्या होगी? [CGPSC SSE / Vyapam Combined]',
      options: [
        '$\\frac{1}{4}$',
        '$\\frac{3}{4}$',
        '$\\frac{1}{24}$',
        '$\\frac{23}{24}$'
      ],
      correctOption: 1,
      examName: 'CGPSC SSE',
      explanation: 'समस्या हल होने का अर्थ है कि "कम से कम एक विद्यार्थी" समस्या हल कर ले।\nविद्यार्थियों द्वारा समस्या हल न कर पाने की प्रायिकताएं:\n$$P(A\') = 1 - \\frac{1}{2} = \\frac{1}{2}$$\n$$P(B\') = 1 - \\frac{1}{3} = \\frac{2}{3}$$\n$$P(C\') = 1 - \\frac{1}{4} = \\frac{3}{4}$$\nसमस्या किसी से भी हल न होने की प्रायिकता:\n$$P(\\text{None}) = P(A\') \\cdot P(B\') \\cdot P(C\') = \\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{3}{4} = \\frac{1}{4}$$\nअतः समस्या हल हो जाने की प्रायिकता:\n$$P(\\text{Problem Solved}) = 1 - P(\\text{None}) = 1 - \\frac{1}{4} = \\frac{3}{4}$$'
    },
    {
      id: 'pyq3',
      question: 'यदि दो घटनाएं $A$ और $B$ स्वतंत्र हैं तथा $P(A) = 0.3$, $P(B) = 0.6$ हो, तो $P(A \\cup B)$ का मान क्या होगा? [CG Vyapam Patwari]',
      options: [
        '0.90',
        '0.72',
        '0.18',
        '0.42'
      ],
      correctOption: 1,
      examName: 'CG Vyapam Patwari',
      explanation: 'चूँकि $A$ और $B$ स्वतंत्र हैं:\n$$P(A \\cap B) = P(A) \\cdot P(B) = 0.3 \\times 0.6 = 0.18$$\nयोग प्रमेय के अनुसार:\n$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$\n$$P(A \\cup B) = 0.3 + 0.6 - 0.18 = 0.90 - 0.18 = 0.72$$'
    },
    {
      id: 'pyq4',
      question: 'एक थैले में 4 सफेद और 6 काली गेंदें हैं। दो गेंदें एक के बाद एक बिना प्रतिस्थापन के निकाली जाती हैं। पहली गेंद सफेद तथा दूसरी गेंद काली होने की प्रायिकता क्या है? [CG Vyapam RI]',
      options: [
        '$\\frac{4}{15}$',
        '$\\frac{6}{25}$',
        '$\\frac{2}{15}$',
        '$\\frac{8}{15}$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam RI',
      explanation: 'कुल गेंदें = $4 + 6 = 10$\nपहली गेंद सफेद निकलने की प्रायिकता:\n$$P(W_1) = \\frac{4}{10} = \\frac{2}{5}$$\nअब शेष गेंदें = 9 (जिसमें 3 सफेद और 6 काली हैं)।\nदूसरी गेंद काली निकलने की सप्रतिबंध प्रायिकता:\n$$P(B_2 | W_1) = \\frac{6}{9} = \\frac{2}{3}$$\nगुणन नियम से:\n$$P(W_1 \\cap B_2) = P(W_1) \\cdot P(B_2 | W_1) = \\frac{2}{5} \\times \\frac{2}{3} = \\frac{4}{15}$$'
    },
    {
      id: 'pyq5',
      question: 'यदि $A$ और $B$ परस्पर अपवर्जी (Mutually Exclusive) घटनाएं हैं जहाँ $P(A) = \\frac{1}{3}$ और $P(B) = \\frac{1}{4}$ है, तो $P(A|B)$ का मान क्या होगा? [CGPSC AMO / Vyapam]',
      options: [
        '$\\frac{1}{12}$',
        '$\\frac{4}{7}$',
        '0',
        '$\\frac{1}{3}$'
      ],
      correctOption: 2,
      examName: 'CGPSC AMO',
      explanation: 'परस्पर अपवर्जी घटनाओं के लिए वे एक साथ कभी घटित नहीं हो सकतीं, अतः:\n$$P(A \\cap B) = 0$$\nसप्रतिबंध प्रायिकता के सूत्रानुसार:\n$$P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0}{1/4} = 0$$'
    },
    {
      id: 'pyq6',
      question: 'एक जोड़े के दो बच्चे हैं। यदि यह ज्ञात है कि कम से कम एक बच्चा लड़का है, तो दोनों बच्चों के लड़का होने की प्रायिकता क्या होगी? [CG Vyapam Hostel Superintendent]',
      options: [
        '$\\frac{1}{2}$',
        '$\\frac{1}{3}$',
        '$\\frac{1}{4}$',
        '$\\frac{2}{3}$'
      ],
      correctOption: 1,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'प्रतिदर्श समष्टि $S = \\{BB, BG, GB, GG\\}$, जहाँ $n(S) = 4$।\nमाना घटना $A$: दोनों बच्चे लड़के हैं $= \\{BB\\}$\nमाना घटना $B$: कम से कम एक बच्चा लड़का है $= \\{BB, BG, GB\\}$\nयहाँ $A \\cap B = \\{BB\\}$\nअतः $P(B) = \\frac{3}{4}$ तथा $P(A \\cap B) = \\frac{1}{4}$\nसप्रतिबंध प्रायिकता:\n$$P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{1/4}{3/4} = \\frac{1}{3}$$\n(नोट: अधिकांश छात्र गलती से $\\frac{1}{2}$ लगा देते हैं, किंतु सही उत्तर $\\frac{1}{3}$ है)।'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'यदि $P(A) = 0.4$, $P(B) = p$ तथा $P(A \\cup B) = 0.6$ हो और $A$ व $B$ स्वतंत्र घटनाएं हों, तो $p$ का मान ज्ञात कीजिए:',
      options: [
        '$\\frac{1}{2}$',
        '$\\frac{1}{3}$',
        '$\\frac{2}{5}$',
        '$\\frac{3}{5}$'
      ],
      correctOption: 1,
      explanation: 'स्वतंत्र घटनाओं के लिए $P(A \\cap B) = P(A) \\cdot P(B) = 0.4p$\nयोग सूत्र से:\n$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$\n$$0.6 = 0.4 + p - 0.4p$$\n$$0.6 - 0.4 = 0.6p \\implies 0.2 = 0.6p \\implies p = \\frac{0.2}{0.6} = \\frac{1}{3}$$'
    },
    {
      id: 'mcq2',
      question: 'एक पासा दो बार फेंका जाता है और प्राप्त संख्याओं का योग 6 पाया जाता है। संख्या 4 के कम से कम एक बार आने की सप्रतिबंध प्रायिकता क्या है?',
      options: [
        '$\\frac{2}{5}$',
        '$\\frac{1}{5}$',
        '$\\frac{2}{36}$',
        '$\\frac{5}{36}$'
      ],
      correctOption: 0,
      explanation: 'योग 6 आने वाले युग्म (घटना $B$): $\\{(1,5), (2,4), (3,3), (4,2), (5,1)\\} \\implies n(B) = 5$\nसंख्या 4 के कम से कम एक बार आने वाले युग्म जिनमें योग 6 हो (घटना $A \\cap B$): $\\{(2,4), (4,2)\\} \\implies n(A \\cap B) = 2$\nअतः प्रायिकता:\n$$P(A|B) = \\frac{n(A \\cap B)}{n(B)} = \\frac{2}{5}$$'
    },
    {
      id: 'mcq3',
      question: 'एक थैले I में 3 लाल व 4 काली गेंदें हैं और थैले II में 5 लाल व 6 काली गेंदें हैं। यादृच्छया एक थैला चुना जाता है और उसमें से एक लाल गेंद निकाली जाती है। इस गेंद के थैला II से होने की प्रायिकता क्या है?',
      options: [
        '$\\frac{35}{68}$',
        '$\\frac{33}{68}$',
        '$\\frac{5}{11}$',
        '$\\frac{3}{7}$'
      ],
      correctOption: 0,
      explanation: 'माना $E_1$ = थैला I चुनना, $E_2$ = थैला II चुनना। $P(E_1) = P(E_2) = \\frac{1}{2}$\n$A$ = लाल गेंद निकलना।\n$P(A|E_1) = \\frac{3}{7}$, $P(A|E_2) = \\frac{5}{11}$\nबेज़ प्रमेय से:\n$$P(E_2|A) = \\frac{P(E_2)P(A|E_2)}{P(E_1)P(A|E_1) + P(E_2)P(A|E_2)} = \\frac{\\frac{1}{2} \\times \\frac{5}{11}}{\\frac{1}{2}\\left(\\frac{3}{7} + \\frac{5}{11}\\right)} = \\frac{\\frac{5}{11}}{\\frac{33 + 35}{77}} = \\frac{\\frac{5}{11}}{\\frac{68}{77}} = \\frac{5}{11} \\times \\frac{77}{68} = \\frac{35}{68}$$'
    },
    {
      id: 'mcq4',
      question: 'यदि घटनाएं $A$ और $B$ स्वतंत्र हैं, तो निम्नलिखित में से कौन सा संबंध सत्य है?',
      options: [
        '$P(A\' \\cap B\') = [1 - P(A)][1 - P(B)]$',
        '$P(A \\cap B\') = P(A) + P(B\')$',
        '$P(A|B) = 0$',
        '$P(A \\cup B) = P(A) \\cdot P(B)$'
      ],
      correctOption: 0,
      explanation: 'यदि $A$ और $B$ स्वतंत्र हैं, तो $A\'$ और $B\'$ भी स्वतंत्र होती हैं। अतः:\n$$P(A\' \\cap B\') = P(A\') \\cdot P(B\') = [1 - P(A)][1 - P(B)]$$'
    },
    {
      id: 'mcq5',
      question: 'एक सिक्के को 3 बार उछाला जाता है। यदि पहली उछाल में चित्त (Head) आया हो, तो तीनों उछालों में चित्त आने की प्रायिकता क्या होगी?',
      options: [
        '$\\frac{1}{8}$',
        '$\\frac{1}{4}$',
        '$\\frac{1}{2}$',
        '$\\frac{3}{8}$'
      ],
      correctOption: 1,
      explanation: 'पहली उछाल में चित्त आने की घटनाएं ($B$): $\\{HHH, HHT, HTH, HTT\\} \\implies n(B) = 4$\nतीनों उछालों में चित्त ($A \\cap B$): $\\{HHH\\} \\implies n(A \\cap B) = 1$\nअतः प्रायिकता:\n$$P(A|B) = \\frac{n(A \\cap B)}{n(B)} = \\frac{1}{4}$$'
    },
    {
      id: 'mcq6',
      question: '$A$ के 80% तथा $B$ के 90% सच बोलने पर, किसी एक ही घटना का वर्णन करते समय उनके एक-दूसरे से सहमत (Agree) होने की प्रायिकता क्या है?',
      options: [
        '74%',
        '26%',
        '72%',
        '85%'
      ],
      correctOption: 0,
      explanation: 'वे सहमत तब होंगे जब: (दोनों सच बोलें) अथवा (दोनों झूठ बोलें)।\n$$P(\\text{Agree}) = P(A)P(B) + P(A\')P(B\')$$\n$$= (0.80 \\times 0.90) + (0.20 \\times 0.10) = 0.72 + 0.02 = 0.74 = 74\\%$$'
    },
    {
      id: 'mcq7',
      question: 'यदि $P(A) = \\frac{1}{2}$, $P(B) = 0$ हो, तो $P(A|B)$ का मान क्या होगा?',
      options: [
        '0',
        '$\\frac{1}{2}$',
        '1',
        'अपरिभाषित (Undefined)'
      ],
      correctOption: 3,
      explanation: 'सप्रतिबंध प्रायिकता सूत्र $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ केवल तभी परिभाषित होता है जब $P(B) > 0$ हो। चूँकि यहाँ $P(B) = 0$ है, अतः हर शून्य होने के कारण यह अपरिभाषित है।'
    },
    {
      id: 'mcq8',
      question: '52 ताश के पत्तों में से यादृच्छया दो पत्ते निकाले जाते हैं। यदि पहला पत्ता बादशाह (King) है, तो दूसरा पत्ता भी बादशाह होने की प्रायिकता (प्रतिस्थापन के बिना) क्या है?',
      options: [
        '$\\frac{4}{52}$',
        '$\\frac{3}{51}$',
        '$\\frac{3}{52}$',
        '$\\frac{4}{51}$'
      ],
      correctOption: 1,
      explanation: 'पहला पत्ता बादशाह निकलने के बाद गड्डी में कुल 51 पत्ते शेष बचते हैं और बादशाहों की संख्या 3 रह जाती है। अतः दूसरे पत्ते के बादशाह होने की सप्रतिबंध प्रायिकता $\\frac{3}{51} = \\frac{1}{17}$ है।'
    }
  ],
  keyTerminology: [
    {
      term: 'Conditional Probability',
      termHi: 'सप्रतिबंध प्रायिकता',
      definition: 'The probability of an event occurring given that another event has already occurred.',
      definitionHi: 'किसी एक घटना के पहले से घटित हो जाने की ज्ञात स्थिति में किसी दूसरी घटना के घटित होने की संभावना।'
    },
    {
      term: 'Independent Events',
      termHi: 'स्वतंत्र घटनाएं',
      definition: 'Events whose outcomes do not influence or alter the probability of each other occurring ($P(A \\cap B) = P(A) \\cdot P(B)$).',
      definitionHi: 'ऐसी घटनाएं जिनमें एक घटना का घटित होना दूसरी घटना के घटित होने की प्रायिकता को प्रभावित नहीं करता।'
    },
    {
      term: 'Mutually Exclusive Events',
      termHi: 'परस्पर अपवर्जी घटनाएं',
      definition: 'Events that cannot happen at the same time ($A \\cap B = \\emptyset$).',
      definitionHi: 'वे घटनाएं जो एक साथ कभी भी घटित नहीं हो सकतीं।'
    },
    {
      term: 'Total Probability Theorem',
      termHi: 'संपूर्ण प्रायिकता प्रमेय',
      definition: 'A fundamental rule relating marginal probabilities to conditional probabilities across a partitioned sample space.',
      definitionHi: 'प्रतिदर्श समष्टि के सभी परस्पर अपवर्जी एवं संपूर्ण घटकों के माध्यम से किसी घटना की कुल प्रायिकता ज्ञात करने का नियम।'
    },
    {
      term: 'Bayes\' Theorem',
      termHi: 'बेज़ प्रमेय (उलटी प्रायिकता)',
      definition: 'A mathematical formula used to determine conditional probability of causes given that the final effect has occurred.',
      definitionHi: 'अंतिम परिणाम ज्ञात होने पर उसके किसी विशिष्ट कारण से घटित होने की पूर्व-संभावना (उत्तर प्रायिकता) ज्ञात करने का नियम।'
    },
    {
      term: 'Prior Probability',
      termHi: 'पूर्व प्रायिकता',
      definition: 'The initial probability of an event or hypothesis before obtaining any new evidence or experiment results.',
      definitionHi: 'किसी नए साक्ष्य या परीक्षण के परिणाम से पहले किसी घटना या कारण की प्रारंभिक प्रायिकता $P(E_i)$।'
    },
    {
      term: 'Posterior Probability',
      termHi: 'उत्तर प्रायिकता',
      definition: 'The revised probability of an event occurring after taking into consideration new observed evidence ($P(E_i|A)$).',
      definitionHi: 'नई घटना या परिणाम घटित होने की जानकारी मिलने के बाद परिष्कृत की गई कारण की प्रायिकता।'
    },
    {
      term: 'Axiom of Probability',
      termHi: 'प्रायिकता का अभिगृहीत',
      definition: 'The fundamental mathematical rules: non-negativity ($P(E) \\ge 0$), certainty ($P(S) = 1$), and additivity for disjoint events.',
      definitionHi: 'प्रायिकता के मूलभूत नियम: अऋणात्मकता, निश्चितता ($P(S) = 1$) तथा असंयुक्त घटनाओं का सीधा योग।'
    }
  ],
  sources: [
    {
      title: 'NCERT Mathematics Class 12 - Chapter 13: Probability',
      author: 'NCERT',
      description: 'सप्रतिबंध प्रायिकता, स्वतंत्र घटनाएं, संपूर्ण प्रायिकता प्रमेय और बेज़ प्रमेय का आधिकारिक एवं प्रामाणिक संदर्भ ग्रंथ।'
    },
    {
      title: 'Higher Algebra & Probability',
      author: 'Hall & Knight',
      description: 'उन्नत क्रमचय-संचय और स्वतंत्र घटनाओं के क्लासिक प्रश्नों का मानक संग्रह।'
    },
    {
      title: 'CG Vyapam & CGPSC Mathematics Solved Papers (2015-2024)',
      author: 'CGPEB / CGPSC',
      description: 'छत्तीसगढ़ व्यापम एवं राज्य सेवा आयोग द्वारा आयोजित परीक्षाओं के वास्तविक प्रश्नों का व्याख्यात्मक संकलन।'
    },
    {
      title: 'Quantitative Aptitude for Competitive Examinations',
      author: 'R.S. Aggarwal',
      description: 'प्रायिकता के अनुप्रयोगिक एवं शॉर्टकट मॉडल प्रश्नों का व्यावहारिक स्रोत।'
    }
  ],
  confusionBuster: [
    {
      misconception: 'परस्पर अपवर्जी (Mutually Exclusive) और स्वतंत्र (Independent) घटनाएं एक ही होती हैं।',
      clarification: 'यह छात्रों की सबसे आम भूल है! परस्पर अपवर्जी में $P(A \\cap B) = 0$ होता है (दोनों साथ में नहीं हो सकते), जबकि स्वतंत्र में $P(A \\cap B) = P(A) \\cdot P(B)$ होता है (दोनों एक-दूसरे को प्रभावित किए बिना साथ हो सकते हैं)।'
    },
    {
      misconception: '$P(A|B)$ और $P(B|A)$ का मान हमेशा बराबर होता है।',
      clarification: '$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ और $P(B|A) = \\frac{P(A \\cap B)}{P(A)}$। ये दोनों केवल तभी बराबर होंगे जब $P(A) = P(B)$ हो, अन्यथा सामान्यतः ये भिन्न होते हैं।'
    },
    {
      misconception: 'कम से कम एक घटना के घटित होने की प्रायिकता निकालने के लिए सभी प्रायिकताओं को जोड़ देना चाहिए।',
      clarification: 'सीधा जोड़ केवल तभी संभव है जब घटनाएं परस्पर अपवर्जी हों। सामान्यतः $P(\\text{कम से कम एक}) = 1 - P(\\text{कोई नहीं}) = 1 - P(A\')P(B\')P(C\')$ सूत्र का प्रयोग किया जाता है।'
    },
    {
      misconception: 'बिना प्रतिस्थापन (Without Replacement) वाले प्रश्नों में प्रत्येक चरण की प्रायिकता स्वतंत्र होती है।',
      clarification: 'बिना प्रतिस्थापन वाले प्रश्नों में पहली वस्तु निकालने के बाद कुल प्रतिदर्श समष्टि और शेष अनुकूल परिणाम बदल जाते हैं, इसलिए ये घटनाएं आश्रित (Dependent) होती हैं।'
    },
    {
      misconception: 'बेज़ प्रमेय केवल जटिल प्रश्नों के लिए है, इसे सामान्य शॉर्टकट से नहीं किया जा सकता।',
      clarification: 'बेज़ प्रमेय को "अनुकूल शाखा का गुणनफल / सभी संभावित शाखाओं के गुणनफलों का योग" (Tree Diagram Method) के सरल अनुपात नियम से बिना किसी जटिल सूत्र के भी हल किया जा सकता है।'
    }
  ],
  faqList: [
    {
      question: 'सप्रतिबंध प्रायिकता और सामान्य प्रायिकता में मुख्य अंतर क्या है?',
      answer: 'सामान्य प्रायिकता में प्रतिदर्श समष्टि संपूर्ण $S$ होती है, जबकि सप्रतिबंध प्रायिकता में यह ज्ञात होता है कि एक घटना $B$ पहले ही घट चुकी है, अतः प्रतिदर्श समष्टि सिमटकर केवल घटना $B$ रह जाती है।'
    },
    {
      question: 'दो घटनाएं स्वतंत्र हैं या नहीं, इसकी जाँच कैसे करें?',
      answer: 'दोनों घटनाओं के एक साथ घटित होने की प्रायिकता $P(A \\cap B)$ निकालें। यदि इसका मान $P(A) \\cdot P(B)$ के बराबर आता है, तो घटनाएं स्वतंत्र हैं, अन्यथा वे आश्रित हैं।'
    },
    {
      question: 'बेज़ प्रमेय का प्रयोग कब करना चाहिए?',
      answer: 'जब किसी प्रयोग का अंतिम परिणाम ज्ञात हो (जैसे- थैले से निकली गेंद लाल है) और यह पूछा जाए कि यह परिणाम किस विशिष्ट थैले या कारण से उत्पन्न हुआ है, तब बेज़ प्रमेय लागू होता है।'
    },
    {
      question: 'CG Vyapam में इस टॉपिक से किस प्रकार के प्रश्न सबसे ज्यादा आते हैं?',
      answer: 'व्यापम में मुख्यतः तीन प्रकार के प्रश्न आते हैं: (1) दो विद्यार्थियों या बंदूकों द्वारा लक्ष्य भेदने/हल करने का स्वतंत्र प्रायिकता प्रश्न, (2) बिना प्रतिस्थापन के ताश या थैले से दो वस्तुएं निकालना, तथा (3) सच-झूठ बोलने के विरोधाभास प्रतिशत पर आधारित प्रश्न।'
    },
    {
      question: 'यदि तीन घटनाएं स्वतंत्र हों, तो उनके सूत्र क्या होंगे?',
      answer: 'तीनों के एक साथ होने की प्रायिकता $P(A \\cap B \\cap C) = P(A) \\cdot P(B) \\cdot P(C)$ होती है, तथा उनमें से कम से कम एक के घटित होने की प्रायिकता $1 - P(A\') \\cdot P(B\') \\cdot P(C\')$ होती है।'
    }
  ],
  oneLinerRevision: [
    'प्रायिकता की सीमा सदैव शून्य से एक ($0 \\le P(E) \\le 1$) तक होती है।',
    'सप्रतिबंध प्रायिकता: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ जहाँ $P(B) > 0$।',
    'स्वतंत्र घटनाओं की अनिवार्य गणितीय कसौटी: $P(A \\cap B) = P(A) \\cdot P(B)$।',
    'परस्पर अपवर्जी घटनाओं के लिए $P(A \\cap B) = 0$ तथा $P(A \\cup B) = P(A) + P(B)$।',
    'कम से कम एक सफलता की प्रायिकता = $1 - P(\\text{सभी विफलताएं})$।',
    'प्रतिस्थापन के साथ (With Replacement) घटनाएं सदैव स्वतंत्र रहती हैं।',
    'प्रतिस्थापन के बिना (Without Replacement) घटनाएं आश्रित (Dependent) हो जाती हैं।',
    'बेज़ प्रमेय को कारण की उलटी प्रायिकता (Inverse Probability) कहा जाता है।',
    'यदि $A$ और $B$ स्वतंत्र हैं, तो $P(A|B) = P(A)$ और $P(B|A) = P(B)$।',
    'यदि $P(B) = 0$ हो, तो $P(A|B)$ का मान अपरिभाषित होता है।'
  ],
  rapidRevision: {
    points: [
      'प्रायिकता का योग नियम: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$।',
      'स्वतंत्र घटनाएं: $P(A \\cap B) = P(A) \\cdot P(B)$।',
      'सप्रतिबंध प्रायिकता: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$।',
      'कम से कम एक के घटित होने का शॉर्टकट: $1 - P(A\')P(B\')P(C\')$।',
      'बेज़ प्रमेय: $P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum P(E_j)P(A|E_j)}$।',
      'सहमति प्रायिकता: $P(A)P(B) + P(A\')P(B\')$; विरोधाभास: $P(A)P(B\') + P(A\')P(B)$।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_6 (Advanced Probability)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_6').set(sanitized);
  console.log('✅ cgv_master_adv_math_6 saved to Firestore topic_study_notes!');

  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === 'cgv_master_sub_3') {
        for (const ch of sub.chapters || []) {
          if (ch.id === 'cgv_master_sub_3_ch_12') {
            for (const t of ch.topics || []) {
              if (t.id === 'adv_math_6') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_6 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 Chapter 12 is now 100% complete!');
}

upload().catch(console.error);
