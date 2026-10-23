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
  topicId: 'adv_math_7',
  topicName: 'Set Theory',
  topicNameHi: 'समुच्चय सिद्धांत',
  chapterId: 'cgv_master_sub_3_ch_13',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'समुच्चय सिद्धांत (Set Theory) आधुनिक गणित की आधारशिला है। वस्तुओं या तत्वों के सुपरिभाषित संग्रह (Well-defined collection) को समुच्चय (Set) कहते हैं। जर्मन गणितज्ञ जॉर्ज कैंटर (Georg Cantor) को इसका जनक माना जाता है। समुच्चय सिद्धांत के नियम बीजगणित, सांख्यिकी, प्रायिकता और कंप्यूटर विज्ञान में डेटा संरचनाओं के मूल आधार हैं।',
    importance: 'CG Vyapam SI, पटवारी, शिक्षक भर्ती (TET/Teacher), राजस्व निरीक्षक तथा CGPSC में समुच्चय की संक्रियाओं, उपसमुच्चयों की संख्या, घात समुच्चय (Power Set) तथा डी-मॉर्गन के नियमों से सीधे सूत्र आधारित एवं तार्किक प्रश्न पूछे जाते हैं।',
    examRelevance: 'इस विषय से $2^n$ उपसमुच्चय नियम, उचित उपसमुच्चयों की संख्या ($2^n - 1$), समुच्चयों के सम्मिलन ($A \\cup B$), सर्वनिष्ठ ($A \\cap B$), सममित अंतर ($A \\Delta B$) और डी-मॉर्गन के नियमों के अनुप्रयोग पर 1-2 प्रश्न निश्चित रूप से पूछे जाते हैं।',
    quickFacts: [
      'यदि किसी समुच्चय $A$ में $n$ अवयव हों, तो उसके कुल उपसमुच्चयों की संख्या $2^n$ होती है।',
      'उचित उपसमुच्चयों (Proper Subsets) की संख्या $2^n - 1$ होती है।',
      'रिक्त समुच्चय ($\\emptyset$ या $\\{\\}$) प्रत्येक समुच्चय का उपसमुच्चय होता है।',
      'डी-मॉर्गन का नियम: $(A \\cup B)\' = A\' \\cap B\'$ तथा $(A \\cap B)\' = A\' \\cup B\'$।',
      'सममित अंतर: $A \\Delta B = (A - B) \\cup (B - A) = (A \\cup B) - (A \\cap B)$।',
      'यदि $A$ और $B$ विसंघीय (Disjoint) हों, तो $A \\cap B = \\emptyset$ तथा $n(A \\cup B) = n(A) + n(B)$।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'समुच्चय की अवधारणा, निरूपण एवं प्रकार',
      content: `### 1. समुच्चय की परिभाषा (Definition of Set)
वस्तुओं या पदों के **सुपरिभाषित संग्रह (Well-defined Collection)** को समुच्चय कहते हैं। "सुपरिभाषित" का अर्थ है कि संग्रह में किसी विशिष्ट वस्तु के सम्मिलित होने या न होने का निर्णय स्पष्ट एवं निष्पक्ष रूप से किया जा सके।
- **समुच्चय के उदाहरण:** प्रथम 5 प्राकृत संख्याएं $\\{1, 2, 3, 4, 5\\}$, अंग्रेजी वर्णमाला के स्वर $\\{a, e, i, o, u\\}$।
- **जो समुच्चय नहीं हैं:** "कक्षा के 5 सबसे बुद्धिमान छात्र" (बुद्धिमत्ता सुपरिभाषित नहीं है)।

### 2. समुच्चय का निरूपण (Representation of Sets)
1. **तालिका / रोस्टर रूप (Roster / Tabular Form):**
   सभी अवयवों को मँझले कोष्ठक $\\{ \\}$ के अंदर अल्पविराम (comma) लगाकर लिखा जाता है। अवयवों का क्रम महत्वपूर्ण नहीं होता और कोई भी अवयव दोहराया नहीं जाता।
   - उदाहरण: $A = \\{2, 4, 6, 8\\}$
2. **समुच्चय निर्माण रूप (Set-Builder Form):**
   अवयवों को सीधे सूचीबद्ध करने के बजाय उनके उभयनिष्ठ गुणधर्म के रूप में लिखा जाता है।
   - उदाहरण: $A = \\{x : x \\text{ सम प्राकृत संख्या है तथा } x \\le 8\\}$

### 3. समुच्चयों के प्रमुख प्रकार (Types of Sets)
- **रिक्त समुच्चय (Empty / Null Set - $\\emptyset$ या $\\{\\}$):** जिसमें कोई अवयव न हो। इसकी गणनीयता (Cardinality) $n(\\emptyset) = 0$ होती है।
- **एकल समुच्चय (Singleton Set):** जिसमें केवल एक अवयव हो, जैसे $\\{0\\}$ या $\\{5\\}$।
- **परिमित समुच्चय (Finite Set):** जिसके अवयवों की संख्या निश्चित (परिमित) हो।
- **अपरिमित समुच्चय (Infinite Set):** जिसके अवयवों की संख्या अनंत हो, जैसे प्राकृत संख्याओं का समुच्चय $\\mathbb{N} = \\{1, 2, 3, \\dots\\}$।
- **समान समुच्चय (Equal Sets):** यदि $A$ और $B$ में ठीक वही अवयव हों ($A = B$)।
- **तुल्य समुच्चय (Equivalent Sets):** यदि दोनों में अवयवों की संख्या समान हो ($n(A) = n(B)$)।`
    },
    {
      id: 'ch2',
      title: 'उपसमुच्चय, घात समुच्चय एवं सार्वत्रिक समुच्चय',
      content: `### 1. उपसमुच्चय (Subset - $\\subseteq$)
यदि समुच्चय $A$ का प्रत्येक अवयव समुच्चय $B$ का भी अवयव हो, तो $A$ को $B$ का उपसमुच्चय कहते हैं:
$$A \\subseteq B \\iff (x \\in A \\implies x \\in B)$$

**महत्वपूर्ण गुणधर्म:**
1. प्रत्येक समुच्चय स्वयं का उपसमुच्चय होता है: $A \\subseteq A$।
2. रिक्त समुच्चय प्रत्येक समुच्चय का उपसमुच्चय होता है: $\\emptyset \\subseteq A$।
3. यदि $A$ में $n$ अवयव हों, तो कुल उपसमुच्चयों की संख्या $= 2^n$ होती है।

### 2. उचित उपसमुच्चय (Proper Subset - $\\subset$)
यदि $A \\subseteq B$ तथा $A \\neq B$ हो, तो $A$ को $B$ का उचित उपसमुच्चय कहते हैं।
- उचित उपसमुच्चयों की कुल संख्या:
$$\\text{Total Proper Subsets} = 2^n - 1$$
(इसमें स्वयं उस समुच्चय को घटा दिया जाता है)।
- अरिक्त उपसमुच्चयों (Non-empty subsets) की संख्या भी $2^n - 1$ होती है (रिक्त समुच्चय को छोड़कर)।

### 3. घात समुच्चय (Power Set - $P(A)$)
किसी समुच्चय $A$ के सभी उपसमुच्चयों के संग्रह को $A$ का घात समुच्चय कहते हैं।
- यदि $A = \\{1, 2\\}$, तो $P(A) = \\{\\emptyset, \\{1\\}, \\{2\\}, \\{1, 2\\}\\}$
- घात समुच्चय में अवयवों की संख्या:
$$n(P(A)) = 2^{n(A)}$$

### 4. सार्वत्रिक समुच्चय (Universal Set - $U$ या $\\xi$)
किसी दिए गए संदर्भ में विचाराधीन सभी समुच्चयों के सभी अवयवों को समाहित करने वाला वृहद समुच्चय सार्वत्रिक समुच्चय कहलाता है।`
    },
    {
      id: 'ch3',
      title: 'समुच्चयों पर मूलभूत संक्रियाएँ (Set Operations)',
      content: `### 1. समुच्चयों का सम्मिलन / संघ (Union of Sets - $A \\cup B$)
दो समुच्चयों $A$ और $B$ का सम्मिलन वह समुच्चय है जिसमें वे सभी अवयव होते हैं जो या तो $A$ में हैं, या $B$ में हैं, या दोनों में हैं।
$$A \\cup B = \\{x : x \\in A \\text{ या } x \\in B\\}$$

### 2. समुच्चयों का सर्वनिष्ठ / प्रतिच्छेदन (Intersection of Sets - $A \\cap B$)
दो समुच्चयों $A$ और $B$ का सर्वनिष्ठ वह समुच्चय है जिसमें केवल वे अवयव होते हैं जो $A$ और $B$ दोनों में उभयनिष्ठ (Common) हैं।
$$A \\cap B = \\{x : x \\in A \\text{ तथा } x \\in B\\}$$
- **विसंघीय समुच्चय (Disjoint Sets):** यदि दो समुच्चयों में कोई उभयनिष्ठ अवयव न हो ($A \\cap B = \\emptyset$)।

### 3. समुच्चयों का अंतर (Difference of Sets - $A - B$)
$A - B$ उन सभी अवयवों का समुच्चय है जो $A$ में हैं किंतु $B$ में नहीं हैं:
$$A - B = \\{x : x \\in A \\text{ तथा } x \\notin B\\}$$
ध्यान दें: सामान्यतः $A - B \\neq B - A$।

### 4. सममित अंतर (Symmetric Difference - $A \\Delta B$)
उन अवयवों का समुच्चय जो या तो केवल $A$ में हैं या केवल $B$ में हैं (अर्थात दोनों के उभयनिष्ठ में नहीं हैं):
$$A \\Delta B = (A - B) \\cup (B - A) = (A \\cup B) - (A \\cap B)$$`
    },
    {
      id: 'ch4',
      title: 'पूरक समुच्चय एवं डी-मॉर्गन के नियम',
      content: `### 1. पूरक समुच्चय (Complement of a Set - $A\'$ या $A^c$)
यदि $U$ सार्वत्रिक समुच्चय है और $A \\subseteq U$, तो $A$ का पूरक समुच्चय उन सभी अवयवों का समुच्चय है जो $U$ में हैं किंतु $A$ में नहीं हैं:
$$A\' = U - A = \\{x : x \\in U \\text{ तथा } x \\notin A\\}$$

**पूरक समुच्चय के महत्वपूर्ण गुणधर्म:**
1. $A \\cup A\' = U$
2. $A \\cap A\' = \\emptyset$
3. $(A\')\' = A$ (द्वैधता नियम / Law of Double Complementation)
4. $U\' = \\emptyset$ तथा $\\emptyset\' = U$

### 2. डी-मॉर्गन के नियम (De Morgan\'s Laws)
किसी सार्वत्रिक समुच्चय $U$ के किन्हीं दो उपसमुच्चयों $A$ और $B$ के लिए:
1. **प्रथम नियम (सम्मिलन का पूरक):**
$$(A \\cup B)\' = A\' \\cap B\'$$
"दो समुच्चयों के संघ का पूरक उनके पूरकों के सर्वनिष्ठ के बराबर होता है।"

2. **द्वितीय नियम (सर्वनिष्ठ का पूरक):**
$$(A \\cap B)\' = A\' \\cup B\'$$
"दो समुच्चयों के सर्वनिष्ठ का पूरक उनके पूरकों के संघ के बराबर होता है।"

### 3. कार्तीय गुणन (Cartesian Product - $A \\times B$)
दो अरिक्त समुच्चयों $A$ और $B$ का कार्तीय गुणन सभी क्रमित युग्मों $(a, b)$ का समुच्चय होता है जहाँ $a \\in A$ तथा $b \\in B$:
$$A \\times B = \\{(a, b) : a \\in A, b \\in B\\}$$
- अवयवों की संख्या: यदि $n(A) = p$ और $n(B) = q$, तो:
$$n(A \\times B) = p \\times q$$
- $A$ से $B$ में कुल संबंधों (Relations) की संख्या $= 2^{p \\times q}$`
    },
    {
      id: 'ch5',
      title: 'बीजगणितीय नियम, कार्डिनैलिटी एवं हल किए गए मॉडल प्रश्न',
      content: `### 1. समुच्चय बीजगणित के महत्वपूर्ण नियम
1. **वर्गसम नियम (Idempotent Laws):** $A \\cup A = A$, $A \\cap A = A$
2. **क्रमविनिमेय नियम (Commutative Laws):** $A \\cup B = B \\cup A$, $A \\cap B = B \\cap A$
3. **साहचर्य नियम (Associative Laws):** $(A \\cup B) \\cup C = A \\cup (B \\cup C)$, $(A \\cap B) \\cap C = A \\cap (B \\cap C)$
4. **वितरण नियम (Distributive Laws):**
   $$A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)$$
   $$A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$$

### 2. कार्डिनैलिटी (गणनीयता) के मूलभूत सूत्र
1. $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$
2. यदि $A$ और $B$ विसंघीय (Disjoint) हों, तो $n(A \\cup B) = n(A) + n(B)$
3. $n(A - B) = n(A) - n(A \\cap B) = n(A \\cup B) - n(B)$
4. $n(A \\Delta B) = n(A) + n(B) - 2n(A \\cap B)$
5. $n(A\' \\cap B\') = n((A \\cup B)\') = n(U) - n(A \\cup B)$

### 3. मॉडल उदाहरण: उपसमुच्चय एवं घात समुच्चय
यदि $A = \\{a, b, c\\}$, तो:
- अवयवों की संख्या $n = 3$
- कुल उपसमुच्चयों की संख्या $= 2^3 = 8$
- उपसमुच्चय: $\\emptyset, \\{a\\}, \\{b\\}, \\{c\\}, \\{a, b\\}, \\{b, c\\}, \\{a, c\\}, \\{a, b, c\\}$
- उचित उपसमुच्चयों की संख्या $= 2^3 - 1 = 7$ (अर्थात $\\{a, b, c\\}$ को छोड़कर)`
    }
  ],
  comparativeTables: [
    {
      title: 'रोस्टर विधि बनाम समुच्चय निर्माण विधि',
      headers: ['आधार / विशेषता', 'रोस्टर / तालिका विधि (Roster Form)', 'समुच्चय निर्माण विधि (Set-Builder Form)'],
      rows: [
        ['अवयवों का प्रस्तुतीकरण', 'प्रत्येक अवयव को स्पष्ट रूप से अल्पविराम द्वारा सूचीबद्ध किया जाता है', 'अवयवों के एक विशिष्ट नियम या गुणधर्म $P(x)$ को लिखा जाता है'],
        ['प्रतीकात्मक रूप', '$A = \\{2, 4, 6, 8\\}$', '$A = \\{x : x = 2n, n \\in \\mathbb{N}, n \\le 4\\}$'],
        ['उपयुक्तता', 'छोटे और परिमित समुच्चयों के लिए अत्यंत सरल', 'बड़े या अपरिमित समुच्चयों को संक्षिप्त रूप में दर्शाने हेतु सर्वोत्तम'],
        ['अवयवों का क्रम', 'क्रम का कोई महत्व नहीं होता', 'क्रम का कोई प्रश्न ही नहीं उठता क्योंकि यह नियम आधारित है'],
        ['पुनरावृत्ति नियम', 'अवयवों की पुनरावृत्ति नहीं की जाती', 'गुणधर्म स्वयं अद्वितीय अवयवों को परिभाषित करता है']
      ]
    },
    {
      title: 'सम्मिलन (Union) बनाम सर्वनिष्ठ (Intersection) बनाम अंतर (Difference)',
      headers: ['संक्रिया', 'प्रतीक', 'तार्किक अर्थ', 'वेन आरेख क्षेत्र', 'कार्डिनैलिटी सूत्र'],
      rows: [
        ['सम्मिलन (Union)', '$A \\cup B$', '$A$ में या $B$ में या दोनों में', 'दोनों वृत्तों का संपूर्ण संयुक्त क्षेत्र', '$n(A) + n(B) - n(A \\cap B)$'],
        ['सर्वनिष्ठ (Intersection)', '$A \\cap B$', '$A$ और $B$ दोनों में (उभयनिष्ठ)', 'दोनों वृत्तों का उभयनिष्ठ अतिव्याप्त भाग', '$n(A) + n(B) - n(A \\cup B)$'],
        ['अंतर (Difference)', '$A - B$', 'केवल $A$ में, $B$ में नहीं', 'वृत्त $A$ का वह भाग जो $B$ में नहीं है', '$n(A) - n(A \\cap B)$'],
        ['सममित अंतर (Symmetric Diff)', '$A \\Delta B$', 'या तो केवल $A$ में या केवल $B$ में', 'दोनों वृत्तों का क्षेत्र उभयनिष्ठ भाग को छोड़कर', '$n(A) + n(B) - 2n(A \\cap B)$']
      ]
    },
    {
      title: 'उपसमुच्चय बनाम उचित उपसमुच्चय बनाम घात समुच्चय',
      headers: ['संकल्पना', 'प्रतीक', 'परिभाषा', 'अवयवों की संख्या ($n$ अवयव होने पर)', 'क्या स्वयं समुच्चय शामिल है?'],
      rows: [
        ['उपसमुच्चय (Subset)', '$A \\subseteq B$', 'यदि $A$ का प्रत्येक अवयव $B$ में है', '$2^n$', 'हाँ, प्रत्येक समुच्चय स्वयं का उपसमुच्चय है'],
        ['उचित उपसमुच्चय (Proper Subset)', '$A \\subset B$', '$A \\subseteq B$ तथा $A \\neq B$', '$2^n - 1$', 'नहीं, मूल समुच्चय शामिल नहीं होता'],
        ['अरिक्त उपसमुच्चय (Non-empty Subset)', '-', 'रिक्त समुच्चय $\\emptyset$ को छोड़कर सभी उपसमुच्चय', '$2^n - 1$', 'हाँ'],
        ['घात समुच्चय (Power Set)', '$P(A)$', 'सभी उपसमुच्चयों का समुच्चय', '$n(P(A)) = 2^n$', 'हाँ, एक अवयव के रूप में शामिल है']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'यदि समुच्चय $A = \\{1, 2, 3, 4\\}$ हो, तो समुच्चय $A$ के उचित उपसमुच्चयों (Proper Subsets) की कुल संख्या क्या होगी? [CG Vyapam SI]',
      options: [
        '16',
        '15',
        '14',
        '8'
      ],
      correctOption: 1,
      examName: 'CG Vyapam SI',
      explanation: 'समुच्चय $A$ में अवयवों की संख्या $n = 4$ है।\nकुल उपसमुच्चयों की संख्या $= 2^n = 2^4 = 16$\nउचित उपसमुच्चयों की संख्या में स्वयं समुच्चय $A$ को शामिल नहीं किया जाता है:\n$$\\text{Proper Subsets} = 2^n - 1 = 16 - 1 = 15$$'
    },
    {
      id: 'pyq2',
      question: 'यदि $A$ और $B$ दो समुच्चय हैं जहाँ $n(A) = 24$, $n(B) = 32$ तथा $n(A \\cup B) = 46$ हो, तो $n(A \\cap B)$ का मान क्या होगा? [CG Vyapam Patwari]',
      options: [
        '10',
        '12',
        '14',
        '8'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Patwari',
      explanation: 'कार्डिनैलिटी सूत्र से:\n$$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$$\n$$46 = 24 + 32 - n(A \\cap B)$$\n$$46 = 56 - n(A \\cap B)$$\n$$n(A \\cap B) = 56 - 46 = 10$$'
    },
    {
      id: 'pyq3',
      question: 'डी-मॉर्गन के नियमानुसार $(A \\cup B)\'$ का मान किसके बराबर होता है? [CG Vyapam Teacher / Assistant Teacher]',
      options: [
        '$A\' \\cup B\'$',
        '$A\' \\cap B\'$',
        '$A - B$',
        '$A\' - B\''
      ],
      correctOption: 1,
      examName: 'CG Vyapam Teacher',
      explanation: 'डी-मॉर्गन के प्रथम नियम के अनुसार, दो समुच्चयों के सम्मिलन का पूरक उनके पूरकों के सर्वनिष्ठ के बराबर होता है:\n$$(A \\cup B)\' = A\' \\cap B\'$$\nइसी प्रकार सर्वनिष्ठ का पूरक: $(A \\cap B)\' = A\' \\cup B\'$ होता है।'
    },
    {
      id: 'pyq4',
      question: 'यदि समुच्चय $A = \\{a, b\\}$ और $B = \\{1, 2, 3\\}$ हो, तो कार्तीय गुणन $A \\times B$ में कुल अवयवों की संख्या तथा $A$ से $B$ में कुल संबंधों की संख्या क्रमशः होगी: [CGPSC SSE / Vyapam Combined]',
      options: [
        '6 और 64',
        '5 और 32',
        '6 और 12',
        '6 और 36'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'यहाँ $n(A) = 2$ तथा $n(B) = 3$ है।\nकार्तीय गुणन $A \\times B$ में अवयवों की संख्या:\n$$n(A \\times B) = n(A) \\times n(B) = 2 \\times 3 = 6$$\n$A$ से $B$ में कुल संबंधों की संख्या $A \\times B$ के कुल उपसमुच्चयों के बराबर होती है:\n$$\\text{कुल संबंध} = 2^{n(A \\times B)} = 2^6 = 64$$'
    },
    {
      id: 'pyq5',
      question: 'यदि $A = \\{x : x \\in \\mathbb{N}, x < 6\\}$ तथा $B = \\{x : x \\in \\mathbb{N}, 3 < x < 8\\}$ हो, तो $A - B$ का मान क्या होगा? [CG Vyapam Hostel Superintendent]',
      options: [
        '$\\{1, 2, 3\\}$',
        '$\\{4, 5\\}$',
        '$\\{6, 7\\}$',
        '$\\{1, 2, 3, 4, 5, 6, 7\\}$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'रोस्टर रूप में लिखने पर:\n$A = \\{1, 2, 3, 4, 5\\}$\n$B = \\{4, 5, 6, 7\\}$\n$A - B$ का अर्थ है वे अवयव जो केवल $A$ में हैं और $B$ में नहीं हैं:\n$A - B = \\{1, 2, 3, 4, 5\\} - \\{4, 5, 6, 7\\} = \\{1, 2, 3\\}$'
    },
    {
      id: 'pyq6',
      question: 'किसी रिक्त समुच्चय $\\emptyset$ के घात समुच्चय $P(\\emptyset)$ में अवयवों की संख्या कितनी होती है? [CG Vyapam RI]',
      options: [
        '0',
        '1',
        '2',
        'अपरिभाषित'
      ],
      correctOption: 1,
      examName: 'CG Vyapam RI',
      explanation: 'रिक्त समुच्चय $\\emptyset$ में अवयवों की संख्या $n = 0$ होती है।\nअतः इसके घात समुच्चय $P(\\emptyset)$ में अवयवों की संख्या:\n$$n(P(\\emptyset)) = 2^0 = 1$$\nजहाँ $P(\\emptyset) = \\{\\emptyset\\}$ होता है।'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'यदि किसी समुच्चय $A$ में 5 अवयव हैं, तो उसके अरिक्त उपसमुच्चयों (Non-empty subsets) की संख्या कितनी होगी?',
      options: [
        '32',
        '31',
        '30',
        '25'
      ],
      correctOption: 1,
      explanation: 'कुल उपसमुच्चयों की संख्या $= 2^5 = 32$ होती है।\nअरिक्त उपसमुच्चय का अर्थ है रिक्त समुच्चय $\\emptyset$ को छोड़कर शेष सभी उपसमुच्चय:\n$$\\text{अरिक्त उपसमुच्चय} = 2^5 - 1 = 32 - 1 = 31$$'
    },
    {
      id: 'mcq2',
      question: 'यदि सार्वत्रिक समुच्चय $U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}$ तथा $A = \\{2, 3, 5, 7\\}$ हो, तो $A\'$ का मान होगा:',
      options: [
        '$\\{1, 4, 6, 8, 9, 10\\}$',
        '$\\{2, 3, 5, 7\\}$',
        '$\\{1, 3, 5, 7, 9\\}$',
        '$\\{4, 6, 8, 10\\}$'
      ],
      correctOption: 0,
      explanation: 'पूरक समुच्चय $A\' = U - A$ होता है।\nअतः $U$ के वे अवयव जो $A$ में नहीं हैं:\n$A\' = \\{1, 4, 6, 8, 9, 10\\}$'
    },
    {
      id: 'mcq3',
      question: 'यदि $A = \\{1, 2, 3\\}$ और $B = \\{3, 4, 5\\}$ हो, तो सममित अंतर $A \\Delta B$ का मान क्या होगा?',
      options: [
        '$\\{3\\}$',
        '$\\{1, 2, 4, 5\\}$',
        '$\\{1, 2, 3, 4, 5\\}$',
        '$\\{\\}$'
      ],
      correctOption: 1,
      explanation: 'सममित अंतर सूत्र: $A \\Delta B = (A - B) \\cup (B - A)$\n$A - B = \\{1, 2\\}$\n$B - A = \\{4, 5\\}$\n$A \\Delta B = \\{1, 2\\} \\cup \\{4, 5\\} = \\{1, 2, 4, 5\\}$'
    },
    {
      id: 'mcq4',
      question: 'यदि $A \\subseteq B$ हो, तो $A \\cap B$ का मान क्या होगा?',
      options: [
        '$A$',
        '$B$',
        '$\\emptyset$',
        '$U$'
      ],
      correctOption: 0,
      explanation: 'यदि $A$ समुच्चय $B$ का उपसमुच्चय है, तो $A$ का प्रत्येक अवयव $B$ में भी उपस्थित है। अतः दोनों का उभयनिष्ठ (सर्वनिष्ठ) स्वयं समुच्चय $A$ होगा ($A \\cap B = A$)।'
    },
    {
      id: 'mcq5',
      question: 'यदि $A \\cap B = \\emptyset$ हो, तो $A$ और $B$ को क्या कहा जाता है?',
      options: [
        'समान समुच्चय (Equal Sets)',
        'विसंघीय / असंयुक्त समुच्चय (Disjoint Sets)',
        'सार्वत्रिक समुच्चय (Universal Sets)',
        'तुल्य समुच्चय (Equivalent Sets)'
      ],
      correctOption: 1,
      explanation: 'जब दो समुच्चयों में कोई भी उभयनिष्ठ अवयव नहीं होता अर्थात $A \\cap B = \\emptyset$ हो, तो उन्हें विसंघीय या असंयुक्त समुच्चय (Disjoint Sets) कहते हैं।'
    },
    {
      id: 'mcq6',
      question: 'यदि $n(U) = 700$, $n(A) = 200$, $n(B) = 300$ तथा $n(A \\cap B) = 100$ हो, तो $n(A\' \\cap B\')$ का मान क्या होगा?',
      options: [
        '400',
        '300',
        '500',
        '200'
      ],
      correctOption: 1,
      explanation: 'डी-मॉर्गन के नियमानुसार: $A\' \\cap B\' = (A \\cup B)\'$\nपहले $n(A \\cup B)$ ज्ञात करते हैं:\n$$n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = 200 + 300 - 100 = 400$$\nअब पूरक की गणनीयता:\n$$n(A\' \\cap B\') = n(U) - n(A \\cup B) = 700 - 400 = 300$$'
    },
    {
      id: 'mcq7',
      question: 'निम्नलिखित में से कौन सा कथन असत्य है?',
      options: [
        '$A \\cup \\emptyset = A$',
        '$A \\cap \\emptyset = \\emptyset$',
        '$A \\cap A\' = U$',
        '$A \\cup A\' = U$'
      ],
      correctOption: 2,
      explanation: 'कथन C असत्य है क्योंकि किसी समुच्चय और उसके पूरक में कोई उभयनिष्ठ अवयव नहीं होता, अतः $A \\cap A\' = \\emptyset$ होता है, न कि $U$।'
    },
    {
      id: 'mcq8',
      question: 'यदि समुच्चय $A$ में $m$ अवयव और $B$ में $n$ अवयव हों, तो घात समुच्चय $P(A \\times B)$ में अवयवों की संख्या होगी:',
      options: [
        '$2^{m+n}$',
        '$2^{mn}$',
        '$mn$',
        '$2^m \\times 2^n$'
      ],
      correctOption: 1,
      explanation: 'कार्तीय गुणन $A \\times B$ में कुल अवयव $= m \\times n = mn$ होते हैं।\nअतः इसके घात समुच्चय में कुल उपसमुच्चयों की संख्या $2^{mn}$ होगी।'
    }
  ],
  keyTerminology: [
    {
      term: 'Set',
      termHi: 'समुच्चय',
      definition: 'A well-defined collection of distinct objects or elements.',
      definitionHi: 'विशिष्ट वस्तुओं या अवयवों का एक सुपरिभाषित संग्रह।'
    },
    {
      term: 'Subset',
      termHi: 'उपसमुच्चय',
      definition: 'A set where every element is also contained within another set ($A \\subseteq B$).',
      definitionHi: 'ऐसा समुच्चय जिसका प्रत्येक अवयव किसी अन्य समुच्चय में भी उपस्थित हो।'
    },
    {
      term: 'Proper Subset',
      termHi: 'उचित उपसमुच्चय',
      definition: 'A subset that is not equal to the original set ($A \\subset B$ and $A \\neq B$).',
      definitionHi: 'ऐसा उपसमुच्चय जो मूल समुच्चय के बराबर न हो (कुल संख्या $2^n - 1$)।'
    },
    {
      term: 'Power Set',
      termHi: 'घात समुच्चय',
      definition: 'The set containing all possible subsets of a given set, including the empty set and the set itself.',
      definitionHi: 'किसी दिए गए समुच्चय के सभी संभावित उपसमुच्चयों का समुच्चय, जिसमें $2^n$ अवयव होते हैं।'
    },
    {
      term: 'Universal Set',
      termHi: 'सार्वत्रिक समुच्चय',
      definition: 'The overarching set that contains all objects under consideration in a particular context.',
      definitionHi: 'किसी विशिष्ट संदर्भ में विचाराधीन सभी अवयवों को समाहित करने वाला मूल समुच्चय।'
    },
    {
      term: 'Disjoint Sets',
      termHi: 'विसंघीय / असंयुक्त समुच्चय',
      definition: 'Two sets having no elements in common ($A \\cap B = \\emptyset$).',
      definitionHi: 'ऐसे दो समुच्चय जिनमें कोई भी उभयनिष्ठ अवयव न हो।'
    },
    {
      term: 'Complement of a Set',
      termHi: 'पूरक समुच्चय',
      definition: 'The elements of the universal set that do not belong to the given set ($A\' = U - A$).',
      definitionHi: 'सार्वत्रिक समुच्चय के वे सभी अवयव जो दिए गए समुच्चय में उपस्थित नहीं हैं।'
    },
    {
      term: 'Cartesian Product',
      termHi: 'कार्तीय गुणन',
      definition: 'The set of all ordered pairs $(a, b)$ such that $a \\in A$ and $b \\in B$.',
      definitionHi: 'दो समुच्चयों के अवयवों से बनने वाले सभी क्रमित युग्मों का समुच्चय ($A \\times B$)।'
    }
  ],
  sources: [
    {
      title: 'NCERT Mathematics Class 11 - Chapter 1: Sets',
      author: 'NCERT',
      description: 'समुच्चय सिद्धांत, उपसमुच्चय, घात समुच्चय, वेन आरेख एवं डी-मॉर्गन के नियमों का मूल मानक पाठ्यपुस्तक।'
    },
    {
      title: 'Higher Algebra',
      author: 'Hall & Knight',
      description: 'बीजगणितीय संरचनाओं और समुच्चयों के मौलिक सिद्धांतों का प्रामाणिक संदर्भ ग्रंथ।'
    },
    {
      title: 'CG Vyapam Solved Question Papers (2014-2024)',
      author: 'CGPEB',
      description: 'छत्तीसगढ़ व्यापम द्वारा आयोजित विभिन्न भर्ती परीक्षाओं के वास्तविक प्रश्नों का संकलन।'
    },
    {
      title: 'Discrete Mathematics and Its Applications',
      author: 'Kenneth H. Rosen',
      description: 'समुच्चय संक्रियाओं, कार्डिनैलिटी और संबंधों का उच्च स्तरीय गणितीय विश्लेषण।'
    }
  ],
  confusionBuster: [
    {
      misconception: '$\\emptyset$ और $\\{0\\}$ या $\\{\\emptyset\\}$ एक ही चीज़ हैं।',
      clarification: '$\\emptyset$ रिक्त समुच्चय है जिसमें 0 अवयव हैं। जबकि $\\{0\\}$ एक एकल समुच्चय है जिसमें अवयव \'0\' है। इसी प्रकार $\\{\\emptyset\\}$ भी एक एकल समुच्चय है जिसका अवयव रिक्त समुच्चय है।'
    },
    {
      misconception: 'उपसमुच्चय (Subset) और उचित उपसमुच्चय (Proper Subset) में कोई अंतर नहीं है।',
      clarification: 'उपसमुच्चयों की संख्या $2^n$ होती है जिसमें स्वयं वह समुच्चय भी शामिल होता है। उचित उपसमुच्चय में स्वयं उस समुच्चय को हटा दिया जाता है, अतः इसकी संख्या $2^n - 1$ होती है।'
    },
    {
      misconception: '$A - B$ और $B - A$ का मान समान होता है।',
      clarification: 'समुच्चय अंतर क्रमविनिमेय नहीं होता। $A - B$ का अर्थ है "केवल $A$ के अवयव", जबकि $B - A$ का अर्थ है "केवल $B$ के अवयव"। ये केवल तभी बराबर होंगे जब $A = B$ हो।'
    },
    {
      misconception: 'डी-मॉर्गन के नियम में संघ का पूरक संघ ही रहता है।',
      clarification: 'पूरक लेने पर चिन्ह उलट जाता है! $(A \\cup B)\' = A\' \\cap B\'$ (Union बदलकर Intersection बन जाता है) और $(A \\cap B)\' = A\' \\cup B\'$।'
    },
    {
      misconception: 'रोस्टर रूप में अवयवों को दो बार लिखने से समुच्चय बड़ा हो जाता है।',
      clarification: 'समुच्चय में अवयवों की पुनरावृत्ति का कोई अर्थ नहीं होता। $\\{1, 2, 2, 3\\}$ और $\\{1, 2, 3\\}$ दोनों पूर्णतः एक ही समुच्चय हैं और दोनों की कार्डिनैलिटी 3 ही है।'
    }
  ],
  faqList: [
    {
      question: 'सुपरिभाषित संग्रह (Well-defined collection) का क्या अर्थ है?',
      answer: 'इसका अर्थ है कि एक ऐसा स्पष्ट नियम या मापदंड होना चाहिए जिससे यह बिना किसी संदेह के तय किया जा सके कि कोई दी गई वस्तु उस संग्रह में है या नहीं। जैसे "भारत की नदियाँ" सुपरिभाषित हैं, किंतु "अच्छी नदियाँ" सुपरिभाषित नहीं हैं।'
    },
    {
      question: 'घात समुच्चय (Power Set) क्या होता है और इसकी संख्या कैसे निकालते हैं?',
      answer: 'किसी समुच्चय के सभी संभावित उपसमुच्चयों के समुच्चय को घात समुच्चय $P(A)$ कहते हैं। यदि समुच्चय $A$ में $n$ अवयव हों, तो घात समुच्चय में कुल $2^n$ अवयव होते हैं।'
    },
    {
      question: 'विसंघीय समुच्चय (Disjoint Sets) क्या होते हैं?',
      answer: 'यदि दो समुच्चयों $A$ और $B$ में कोई भी उभयनिष्ठ अवयव न हो, अर्थात $A \\cap B = \\emptyset$ हो, तो उन्हें विसंघीय या असंयुक्त समुच्चय कहते हैं।'
    },
    {
      question: 'डी-मॉर्गन का नियम प्रतियोगी परीक्षाओं में कैसे उपयोगी है?',
      answer: 'यह जटिल पूरक प्रश्नों जैसे "न तो $A$ और न ही $B$" की गणना को $n(A\' \\cap B\') = n(U) - n(A \\cup B)$ के माध्यम से एक पंक्ति में हल करने में सहायता करता है।'
    },
    {
      question: 'सममित अंतर (Symmetric Difference) $A \\Delta B$ क्या दर्शाता है?',
      answer: 'यह उन सभी अवयवों को दर्शाता है जो केवल $A$ में हैं या केवल $B$ में हैं, लेकिन दोनों में एक साथ नहीं हैं। इसका सूत्र $(A - B) \\cup (B - A)$ या $(A \\cup B) - (A \\cap B)$ है।'
    }
  ],
  oneLinerRevision: [
    'सुपरिभाषित वस्तुओं के संग्रह को समुच्चय कहते हैं, जिसके जनक जॉर्ज कैंटर हैं।',
    'यदि किसी समुच्चय में $n$ अवयव हों, तो कुल उपसमुच्चयों की संख्या $2^n$ होती है।',
    'उचित उपसमुच्चयों की संख्या सदैव $2^n - 1$ होती है।',
    'रिक्त समुच्चय $\\emptyset$ प्रत्येक समुच्चय का उपसमुच्चय होता है।',
    'घात समुच्चय $P(A)$ के कुल अवयव $2^{n(A)}$ होते हैं।',
    'डी-मॉर्गन का नियम: $(A \\cup B)\' = A\' \\cap B\'$ तथा $(A \\cap B)\' = A\' \\cup B\'$।',
    'विसंघीय (Disjoint) समुच्चयों के लिए $A \\cap B = \\emptyset$ तथा $n(A \\cup B) = n(A) + n(B)$।',
    'सममित अंतर: $A \\Delta B = (A \\cup B) - (A \\cap B)$।',
    'कार्तीय गुणन $A \\times B$ में अवयवों की संख्या $n(A) \\times n(B)$ होती है।',
    'पूरक समुच्चय गुणधर्म: $A \\cup A\' = U$ तथा $A \\cap A\' = \\emptyset$।'
  ],
  rapidRevision: {
    points: [
      'कुल उपसमुच्चय: $2^n$; उचित उपसमुच्चय: $2^n - 1$; अरिक्त उपसमुच्चय: $2^n - 1$।',
      'सम्मिलन (Union): $A \\cup B = \\{x : x \\in A \\text{ या } x \\in B\\}$।',
      'सर्वनिष्ठ (Intersection): $A \\cap B = \\{x : x \\in A \\text{ तथा } x \\in B\\}$।',
      'अंतर: $A - B = \\{x : x \\in A, x \\notin B\\}$।',
      'डी-मॉर्गन नियम: $(A \\cup B)\' = A\' \\cap B\'$ एवं $(A \\cap B)\' = A\' \\cup B\'$।',
      'कार्डिनैलिटी सूत्र: $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_7 (Set Theory)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_7').set(sanitized);
  console.log('✅ cgv_master_adv_math_7 saved to Firestore topic_study_notes!');

  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === 'cgv_master_sub_3') {
        for (const ch of sub.chapters || []) {
          if (ch.id === 'cgv_master_sub_3_ch_13') {
            for (const t of ch.topics || []) {
              if (t.id === 'adv_math_7') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_7 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 adv_math_7 is synced!');
}

upload().catch(console.error);
