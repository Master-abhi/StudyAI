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
  topicId: 'adv_math_9',
  topicName: 'Arithmetic Progression',
  topicNameHi: 'समांतर श्रेणी (AP)',
  chapterId: 'cgv_master_sub_3_ch_14',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'समांतर श्रेणी (Arithmetic Progression - AP) संख्याओं का ऐसा क्रमिक अनुक्रम है जिसमें प्रत्येक पद अपने पूर्ववर्ती पद में एक निश्चित अचर संख्या जोड़कर या घटाकर प्राप्त किया जाता है। इस निश्चित संख्या को सार्व अंतर (Common Difference - $d$) कहते हैं। इसका व्यापक रूप $a, a+d, a+2d, a+3d, \\dots$ होता है।',
    importance: 'CG Vyapam (पटवारी, राजस्व निरीक्षक, उप निरीक्षक, छात्रावास अधीक्षक, शिक्षक भर्ती) और CGPSC में समांतर श्रेणी से प्रतिवर्ष सीधे सूत्र आधारित एवं तार्किक प्रश्न पूछे जाते हैं। यह बीजगणित एवं सांख्यिकी दोनों से जुड़ा एक अत्यंत स्कोरिंग अध्याय है।',
    examRelevance: 'परीक्षाओं में $n$वां पद ज्ञात करना ($T_n$), अंतिम पद से $n$वां पद, पदों की संख्या ($n$), प्रथम $n$ पदों का योग ($S_n$), दो संख्याओं के मध्य समांतर माध्य (AM) तथा व्यावहारिक बचत/किस्त मॉडल के प्रश्न बार-बार आते हैं।',
    quickFacts: [
      'सार्व अंतर $d = T_n - T_{n-1}$ (धनात्मक, ऋणात्मक या शून्य हो सकता है)।',
      'प्रारंभ से $n$वां पद: $T_n = a + (n - 1)d$।',
      'अंत से $n$वां पद: $l - (n - 1)d$, जहाँ $l$ श्रेणी का अंतिम पद है।',
      'पदों की कुल संख्या: $n = \\frac{l - a}{d} + 1$।',
      'प्रथम $n$ पदों का योग: $S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)$।',
      'यदि $a, b, c$ समांतर श्रेणी में हों, तो $2b = a + c$ या $b = \\frac{a + c}{2}$ (समांतर माध्य)।',
      'प्रथम $n$ विषम प्राकृत संख्याओं का योग $= n^2$; प्रथम $n$ सम प्राकृत संख्याओं का योग $= n(n + 1)$।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'समांतर श्रेणी की मूलभूत संकल्पना एवं सार्व अंतर',
      content: `### 1. समांतर श्रेणी की परिभाषा
यदि किसी अनुक्रम (Sequence) के किन्हीं दो क्रमागत पदों का अंतर सदैव समान (अचर) रहे, तो वह अनुक्रम समांतर श्रेणी (AP) कहलाता है।
- **प्रथम पद (First Term):** इसे सामान्यतः '$a$' या '$T_1$' से दर्शाया जाता है।
- **सार्व अंतर (Common Difference):** इसे '$d$' से दर्शाया जाता है।
  $$d = T_2 - T_1 = T_3 - T_2 = \\dots = T_n - T_{n-1}$$

### 2. सार्व अंतर के प्रकार
1. **धनात्मक सार्व अंतर ($d > 0$):** श्रेणी वर्धमान (Increasing) होती है। जैसे: $3, 7, 11, 15, \\dots$ ($d = +4$)
2. **ऋणात्मक सार्व अंतर ($d < 0$):** श्रेणी ह्रासमान (Decreasing) होती है। जैसे: $20, 16, 12, 8, \\dots$ ($d = -4$)
3. **शून्य सार्व अंतर ($d = 0$):** श्रेणी स्थिर (Constant) होती है। जैसे: $5, 5, 5, 5, \\dots$ ($d = 0$)

### 3. समांतर श्रेणी के मूलभूत गुणधर्म
- यदि किसी AP के प्रत्येक पद में कोई अचर $k$ जोड़ा या घटाया जाए, तो प्राप्त नया अनुक्रम भी AP होगा जिसका सार्व अंतर अपरिवर्तित रहेगा।
- यदि किसी AP के प्रत्येक पद को किसी अशून्य अचर $k$ से गुणा या भाग किया जाए, तो नया अनुक्रम भी AP होगा जिसका नया सार्व अंतर क्रमशः $kd$ या $\\frac{d}{k}$ होगा।`
    },
    {
      id: 'ch2',
      title: '$n$वां पद (व्यापक पद) एवं पदों की संख्या की गणना',
      content: `### 1. प्रारंभ से $n$वां पद (General Term - $T_n$)
माना AP का प्रथम पद $a$ तथा सार्व अंतर $d$ है:
- प्रथम पद $T_1 = a = a + (1 - 1)d$
- दूसरा पद $T_2 = a + d = a + (2 - 1)d$
- तीसरा पद $T_3 = a + 2d = a + (3 - 1)d$
अतः $n$वां पद:
$$T_n = a + (n - 1)d$$

### 2. अंत से $n$वां पद (Term from the End)
यदि किसी परिमित AP में कुल पदों का अंतिम पद $l$ तथा सार्व अंतर $d$ हो, तो श्रेणी को अंत से उलटने पर प्रथम पद $l$ और सार्व अंतर $-d$ हो जाता है:
$$\\text{अंत से } n\\text{वां पद} = l - (n - 1)d$$

### 3. कुल पदों की संख्या ($n$) का शॉर्टकट सूत्र
यदि प्रथम पद $a$, सार्व अंतर $d$ और अंतिम पद $l$ ज्ञात हो:
$$l = a + (n - 1)d \\implies l - a = (n - 1)d$$
$$n = \\frac{l - a}{d} + 1$$
$$\\text{पदों की संख्या} = \\frac{\\text{अंतिम पद} - \\text{प्रथम पद}}{\\text{सार्व अंतर}} + 1$$

### 4. उदाहरण: 3-अंकीय 7 से विभाज्य संख्याएं
- प्रथम 3-अंकीय संख्या जो 7 से विभाज्य है $= 105$
- अंतिम 3-अंकीय संख्या जो 7 से विभाज्य है $= 994$
- सार्व अंतर $d = 7$
- कुल संख्याएं $n = \\frac{994 - 105}{7} + 1 = \\frac{889}{7} + 1 = 127 + 1 = 128$`
    },
    {
      id: 'ch3',
      title: 'प्रथम $n$ पदों का योग ($S_n$) एवं मानक परिणाम',
      content: `### 1. योगफल सूत्र की व्युत्पत्ति
समांतर श्रेणी के प्रथम $n$ पदों का योग:
$$S_n = \\frac{n}{2}[2a + (n - 1)d]$$

चूँकि अंतिम पद $l = a + (n - 1)d$ होता है, अतः:
$$S_n = \\frac{n}{2}(a + l) = n \\times \\left(\\frac{a + l}{2}\\right)$$
अर्थात: **योगफल = पदों की संख्या $\\times$ औसत (समांतर माध्य)**

### 2. $S_n$ और $T_n$ के मध्य संबंध
यदि प्रथम $n$ पदों का योग $S_n$ ज्ञात हो, तो $n$वां पद निकालने का सीधा सूत्र:
$$T_n = S_n - S_{n-1}$$
तथा प्रथम पद $a = S_1$।

### 3. विशेष मानक योग सूत्र (Direct Memory Shortcuts)
1. **प्रथम $n$ प्राकृत संख्याओं का योग:**
   $$\\sum_{k=1}^n k = 1 + 2 + 3 + \\dots + n = \\frac{n(n + 1)}{2}$$
2. **प्रथम $n$ सम प्राकृत संख्याओं का योग:**
   $$2 + 4 + 6 + \\dots + 2n = n(n + 1)$$
3. **प्रथम $n$ विषम प्राकृत संख्याओं का योग:**
   $$1 + 3 + 5 + \\dots + (2n - 1) = n^2$$`
    },
    {
      id: 'ch4',
      title: 'समांतर माध्य (AM) एवं पदों के चयन की विधि',
      content: `### 1. समांतर माध्य (Arithmetic Mean)
- यदि दो संख्याएं $a$ और $b$ हों, तो उनका समांतर माध्य:
  $$AM = \\frac{a + b}{2}$$
- यदि $a, A, b$ समांतर श्रेणी में हों, तो $A$ को $a$ और $b$ का समांतर माध्य कहते हैं।

### 2. दो संख्याओं के बीच $n$ समांतर माध्य प्रविष्ट करना
माना $a$ और $b$ के बीच $n$ समांतर माध्य $A_1, A_2, \\dots, A_n$ हैं।
- कुल पद $= n + 2$
- सार्व अंतर:
  $$d = \\frac{b - a}{n + 1}$$
- सभी $n$ समांतर माध्यों का योग:
  $$\\sum_{i=1}^n A_i = n \\times \\left(\\frac{a + b}{2}\\right) = n \\times AM$$

### 3. पदों के चयन का मानक नियम (Selection of Terms)
जब प्रश्न में पदों का योग या गुणनफल दिया हो, तो गणना को सरल बनाने हेतु पदों का चयन इस प्रकार किया जाता है:
- **3 पद मानने हों:** $(a - d), a, (a + d)$ (सार्व अंतर $= d$; योग $= 3a$)
- **4 पद मानने हों:** $(a - 3d), (a - d), (a + d), (a + 3d)$ (सार्व अंतर $= 2d$; योग $= 4a$)
- **5 पद मानने हों:** $(a - 2d), (a - d), a, (a + d), (a + 2d)$ (सार्व अंतर $= d$; योग $= 5a$)`
    },
    {
      id: 'ch5',
      title: 'CG Vyapam / CGPSC परीक्षा विशिष्ट ट्रिक्स एवं शॉर्टकट',
      content: `### ट्रिक 1: $T_p = q$ तथा $T_q = p$ मॉडल
यदि किसी AP का $p$वां पद $q$ तथा $q$वां पद $p$ हो:
- सार्व अंतर: $d = -1$
- प्रथम पद: $a = p + q - 1$
- $(p + q)$वां पद: $T_{p+q} = 0$
- $r$वां पद: $T_r = p + q - r$

### ट्रिक 2: $S_p = q$ तथा $S_q = p$ मॉडल
यदि किसी AP के प्रथम $p$ पदों का योग $q$ तथा प्रथम $q$ पदों का योग $p$ हो:
- प्रथम $(p + q)$ पदों का योग:
  $$S_{p+q} = -(p + q)$$

### ट्रिक 3: $p \\cdot T_p = q \\cdot T_q$ मॉडल
यदि किसी AP के $p$वें पद का $p$ गुना उसके $q$वें पद के $q$ गुने के बराबर हो:
- $(p + q)$वां पद:
  $$T_{p+q} = 0$$

### ट्रिक 4: दो समांतर श्रेणियों के योग के अनुपात से $n$वें पदों का अनुपात
यदि $\\frac{S_n}{S'_n} = \\frac{f(n)}{g(n)}$ दिया हो और $n$वें पदों का अनुपात $\\frac{T_n}{T'_n}$ पूछा जाए:
- **शॉर्टकट:** सूत्र में $n$ के स्थान पर $(2n - 1)$ रख दें!
- उदाहरण: यदि $\\frac{S_n}{S'_n} = \\frac{7n + 1}{4n + 27}$ हो, तो 11वें पद का अनुपात निकालने के लिए $n = 2(11) - 1 = 21$ रखें।`
    }
  ],
  comparativeTables: [
    {
      title: 'परिमित AP बनाम अपरिमित AP',
      headers: ['विशेषता', 'परिमित AP (Finite AP)', 'अपरिमित AP (Infinite AP)'],
      rows: [
        ['पदों की संख्या', 'निश्चित एवं सीमित (परिमित $n$)', 'अनंत (पदों का कोई अंत नहीं)'],
        ['अंतिम पद ($l$)', 'अंतिम पद सदैव ज्ञात और निश्चित होता है', 'कोई अंतिम पद नहीं होता ($l \\to \\infty$ या $-\\infty$)'],
        ['योगफल ($S_n$)', 'निश्चित कुल योग प्राप्त होता है', 'सभी पदों का योग अनंत होता है (अपरिभाषित)'],
        ['उदाहरण', '$2, 4, 6, 8, 10$ (कुल 5 पद)', '$2, 4, 6, 8, 10, \\dots$'],
        ['अंत से पद की गणना', 'संभव ($l - (n - 1)d$)', 'असंभव (अंतिम पद अनुपस्थित)']
      ]
    },
    {
      title: '$n$वां पद ($T_n$) बनाम प्रथम $n$ पदों का योग ($S_n$)',
      headers: ['मापदंड', '$n$वां पद ($T_n$ / $a_n$)', 'प्रथम $n$ पदों का योग ($S_n$)'],
      rows: [
        ['अर्थ', 'अनुक्रम का विशिष्ट $n$वें स्थान का मान', 'प्रथम पद से लेकर $n$वें पद तक के सभी पदों का कुल जोड़'],
        ['मूल सूत्र', '$a + (n - 1)d$', '$\\frac{n}{2}[2a + (n - 1)d]$ या $\\frac{n}{2}(a + l)$'],
        ['पारस्परिक संबंध', '$T_n = S_n - S_{n-1}$', '$S_n = T_1 + T_2 + \\dots + T_n$'],
        ['$n$ में घात', '$n$ में रैखिक फलन (Linear: $An + B$)', '$n$ में द्विघात फलन (Quadratic: $An^2 + Bn$)'],
        ['सार्व अंतर की पहचान', '$n$ का गुणांक ही सार्व अंतर $d$ होता है', '$n^2$ के गुणांक का दोगुना ($2A$) सार्व अंतर होता है']
      ]
    },
    {
      title: 'पदों के चयन के मानक रूप',
      headers: ['पदों की संख्या', 'माने गए मानक पद', 'सार्व अंतर', 'पदों का कुल योग'],
      rows: [
        ['3 पद', '$(a - d), a, (a + d)$', '$d$', '$3a$'],
        ['4 पद', '$(a - 3d), (a - d), (a + d), (a + 3d)$', '$2d$', '$4a$'],
        ['5 पद', '$(a - 2d), (a - d), a, (a + d), (a + 2d)$', '$d$', '$5a$'],
        ['6 पद', '$(a - 5d), (a - 3d), (a - d), (a + d), (a + 3d), (a + 5d)$', '$2d$', '$6a$']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'समांतर श्रेणी $7, 13, 19, \\dots, 205$ में पदों की कुल संख्या क्या है? [CG Vyapam Patwari / RI]',
      options: [
        '33',
        '34',
        '35',
        '32'
      ],
      correctOption: 1,
      examName: 'CG Vyapam Patwari',
      explanation: 'यहाँ प्रथम पद $a = 7$, सार्व अंतर $d = 13 - 7 = 6$, अंतिम पद $l = 205$\nपदों की संख्या का सूत्र:\n$$n = \\frac{l - a}{d} + 1$$\n$$n = \\frac{205 - 7}{6} + 1 = \\frac{198}{6} + 1 = 33 + 1 = 34$$'
    },
    {
      id: 'pyq2',
      question: 'यदि किसी समांतर श्रेणी का 7वां पद 34 और 13वां पद 64 है, तो उसका 18वां पद क्या होगा? [CG Vyapam SI Mains]',
      options: [
        '87',
        '89',
        '91',
        '85'
      ],
      correctOption: 1,
      examName: 'CG Vyapam SI Mains',
      explanation: 'दिया है: $T_7 = a + 6d = 34$ ... (1)\n$T_{13} = a + 12d = 64$ ... (2)\nसमीकरण (2) में से (1) घटाने पर:\n$$6d = 30 \\implies d = 5$$\nसमीकरण (1) से: $a + 6(5) = 34 \\implies a = 34 - 30 = 4$\nअब 18वां पद:\n$$T_{18} = a + 17d = 4 + 17(5) = 4 + 85 = 89$$'
    },
    {
      id: 'pyq3',
      question: 'समांतर श्रेणी $10, 7, 4, \\dots, -62$ का अंतिम से 11वां पद ज्ञात कीजिए: [CGPSC SSE / Vyapam Combined]',
      options: [
        '-32',
        '-16',
        '-40',
        '-20'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'यहाँ प्रथम पद $a = 10$, सार्व अंतर $d = 7 - 10 = -3$, अंतिम पद $l = -62$\nअंत से $n$वें पद का सूत्र $= l - (n - 1)d$\nअंत से 11वां पद:\n$$= -62 - (11 - 1)(-3)$$\n$$= -62 - (10)(-3) = -62 + 30 = -32$$'
    },
    {
      id: 'pyq4',
      question: 'प्रथम 20 विषम प्राकृत संख्याओं का योगफल क्या होगा? [CG Vyapam Hostel Superintendent]',
      options: [
        '400',
        '210',
        '420',
        '380'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'प्रथम $n$ विषम प्राकृत संख्याओं का योगफल $n^2$ होता है।\nयहाँ $n = 20$\nअतः योगफल $= 20^2 = 400$\n(वैकल्पिक सूत्र: $a=1, d=2 \\implies S_{20} = \\frac{20}{2}[2(1) + 19(2)] = 10[2 + 38] = 400$)'
    },
    {
      id: 'pyq5',
      question: 'यदि किसी समांतर श्रेणी के प्रथम $n$ पदों का योग $S_n = 3n^2 + 5n$ हो, तो उसका सार्व अंतर (Common Difference) क्या होगा? [CG Vyapam Teacher / AMO]',
      options: [
        '3',
        '5',
        '6',
        '8'
      ],
      correctOption: 2,
      examName: 'CG Vyapam Teacher',
      explanation: 'शॉर्टकट विधि: यदि $S_n = An^2 + Bn$ हो, तो सार्व अंतर $d = 2A$ होता है।\nयहाँ $A = 3 \\implies d = 2 \\times 3 = 6$\nविस्तृत विधि: $T_1 = S_1 = 3(1)^2 + 5(1) = 8$\n$S_2 = 3(2)^2 + 5(2) = 12 + 10 = 22$\n$T_2 = S_2 - S_1 = 22 - 8 = 14$\nसार्व अंतर $d = T_2 - T_1 = 14 - 8 = 6$'
    },
    {
      id: 'pyq6',
      question: 'यदि किसी समांतर श्रेणी का $p$वां पद $q$ और $q$वां पद $p$ हो, तो उसका $(p + q)$वां पद क्या होगा? [CG Vyapam Food Inspector / RAEO]',
      options: [
        '$p + q$',
        '0',
        '$p - q$',
        '1'
      ],
      correctOption: 1,
      examName: 'CG Vyapam Food Inspector',
      explanation: 'मानक AP प्रमेय के अनुसार:\n$T_p = a + (p - 1)d = q$\n$T_q = a + (q - 1)d = p$\nघटाने पर: $(p - q)d = q - p = -(p - q) \\implies d = -1$\n$a = p + q - 1$\nअब $(p + q)$वां पद:\n$$T_{p+q} = a + (p + q - 1)d = (p + q - 1) + (p + q - 1)(-1) = 0$$'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'समांतर श्रेणी $3, 8, 13, 18, \\dots$ का कौन सा पद 78 होगा?',
      options: [
        '14वां',
        '15वां',
        '16वां',
        '17वां'
      ],
      correctOption: 2,
      explanation: '$a = 3, d = 5, T_n = 78$\n$$78 = 3 + (n - 1)5 \\implies 75 = (n - 1)5 \\implies n - 1 = 15 \\implies n = 16$$'
    },
    {
      id: 'mcq2',
      question: 'दो अंकों वाली कितनी संख्याएं 3 से पूर्णतः विभाज्य हैं?',
      options: [
        '29',
        '30',
        '31',
        '32'
      ],
      correctOption: 1,
      explanation: 'प्रथम 2-अंकीय संख्या = 12, अंतिम = 99, $d = 3$\n$$n = \\frac{99 - 12}{3} + 1 = \\frac{87}{3} + 1 = 29 + 1 = 30$$'
    },
    {
      id: 'mcq3',
      question: 'यदि $k - 1, k + 3, 3k - 1$ किसी समांतर श्रेणी के तीन क्रमागत पद हैं, तो $k$ का मान क्या होगा?',
      options: [
        '2',
        '4',
        '3',
        '5'
      ],
      correctOption: 1,
      explanation: 'समांतर श्रेणी में मध्य पद का दोगुना प्रथम और तृतीय पद के योग के बराबर होता है:\n$$2(k + 3) = (k - 1) + (3k - 1)$$\n$$2k + 6 = 4k - 2 \\implies 2k = 8 \\implies k = 4$$'
    },
    {
      id: 'mcq4',
      question: '1 से 100 तक की सभी प्राकृत संख्याओं का योग क्या होगा?',
      options: [
        '5000',
        '5050',
        '5100',
        '5025'
      ],
      correctOption: 1,
      explanation: '$$S_{100} = \\frac{n(n + 1)}{2} = \\frac{100 \\times 101}{2} = 50 \\times 101 = 5050$$'
    },
    {
      id: 'mcq5',
      question: 'यदि किसी समांतर श्रेणी के प्रथम $p$ पदों का योग $q$ और प्रथम $q$ पदों का योग $p$ हो, तो प्रथम $(p + q)$ पदों का योग होगा:',
      options: [
        '$p + q$',
        '$-(p + q)$',
        '0',
        '$pq$'
      ],
      correctOption: 1,
      explanation: 'यह मानक परिणाम है: यदि $S_p = q$ तथा $S_q = p$ हो, तो $S_{p+q} = -(p + q)$ होता है।'
    },
    {
      id: 'mcq6',
      question: 'संख्याओं 8 और 26 के बीच तीन समांतर माध्य प्रविष्ट करने पर दूसरा समांतर माध्य क्या होगा?',
      options: [
        '12.5',
        '17',
        '13.5',
        '21.5'
      ],
      correctOption: 1,
      explanation: 'कुल पद $n = 3 + 2 = 5$।\nसार्व अंतर $d = \\frac{b - a}{n + 1} = \\frac{26 - 8}{3 + 1} = \\frac{18}{4} = 4.5$\nप्रथम माध्य $A_1 = 8 + 4.5 = 12.5$\nदूसरा माध्य $A_2 = 12.5 + 4.5 = 17$'
    },
    {
      id: 'mcq7',
      question: 'यदि किसी समांतर श्रेणी का $n$वां पद $T_n = 5 - 3n$ हो, तो उसका सार्व अंतर क्या होगा?',
      options: [
        '5',
        '-3',
        '3',
        '2'
      ],
      correctOption: 1,
      explanation: '$T_n = a + (n - 1)d$ में $n$ का गुणांक ही सार्व अंतर $d$ होता है। यहाँ $n$ का गुणांक $-3$ है, अतः $d = -3$।'
    },
    {
      id: 'mcq8',
      question: 'किसी समांतर श्रेणी के तीन पदों का योग 27 और उनके वर्गों का योग 293 है। मध्य पद क्या होगा?',
      options: [
        '9',
        '8',
        '10',
        '12'
      ],
      correctOption: 0,
      explanation: 'मानक 3 पद: $(a - d), a, (a + d)$\nयोग $= 3a = 27 \\implies a = 9$\nअतः मध्य पद स्वयं $a = 9$ है।'
    }
  ],
  keyTerminology: [
    {
      term: 'Arithmetic Progression (AP)',
      termHi: 'समांतर श्रेणी',
      definition: 'A sequence of numbers such that the difference between the consecutive terms is constant.',
      definitionHi: 'संख्याओं का ऐसा अनुक्रम जिसमें किन्हीं दो क्रमागत पदों का अंतर सदैव समान रहता है।'
    },
    {
      term: 'Common Difference ($d$)',
      termHi: 'सार्व अंतर',
      definition: 'The fixed value added to each term to get the next term ($d = T_n - T_{n-1}$).',
      definitionHi: 'वह निश्चित संख्या जिसे प्रत्येक पद में जोड़ने पर अगला पद प्राप्त होता है।'
    },
    {
      term: 'General Term ($T_n$)',
      termHi: 'व्यापक पद ($n$वां पद)',
      definition: 'An algebraic formula $a + (n - 1)d$ that gives the value of the nth element directly.',
      definitionHi: 'वह सूत्र $a + (n - 1)d$ जिसकी सहायता से श्रेणी के किसी भी पद का मान सीधे प्राप्त किया जा सकता है।'
    },
    {
      term: 'Arithmetic Mean (AM)',
      termHi: 'समांतर माध्य',
      definition: 'The central value between numbers; for two numbers $a$ and $b$, $AM = \\frac{a + b}{2}$.',
      definitionHi: 'दो या दो से अधिक संख्याओं का औसत मान; $a$ और $b$ के लिए $\\frac{a + b}{2}$।'
    },
    {
      term: 'Finite Sequence',
      termHi: 'परिमित अनुक्रम',
      definition: 'A sequence containing a limited, countable number of terms ending with a specific last term ($l$).',
      definitionHi: 'पदों की निश्चित संख्या वाला अनुक्रम जिसका अंतिम पद ज्ञात होता है।'
    },
    {
      term: 'Infinite Sequence',
      termHi: 'अपरिमित अनुक्रम',
      definition: 'A sequence that continues indefinitely without any final concluding term.',
      definitionHi: 'अनंत तक चलने वाला अनुक्रम जिसका कोई अंतिम पद नहीं होता।'
    },
    {
      term: 'Sum of n Terms ($S_n$)',
      termHi: 'प्रथम $n$ पदों का योग',
      definition: 'The total value obtained by adding the first $n$ elements of an arithmetic sequence.',
      definitionHi: 'समांतर श्रेणी के प्रथम $n$ पदों को जोड़ने पर प्राप्त कुल मान ($\\frac{n}{2}(a + l)$)।'
    },
    {
      term: 'Term from End',
      termHi: 'अंत से पद',
      definition: 'The nth element counted in reverse from the last term ($l - (n - 1)d$).',
      definitionHi: 'श्रेणी के अंतिम पद से पीछे की ओर उल्टी गिनती करते हुए प्राप्त पद।'
    }
  ],
  sources: [
    {
      title: 'NCERT Class 10 Mathematics - Chapter 5: Arithmetic Progressions',
      author: 'NCERT',
      description: 'समांतर श्रेणी, सार्व अंतर, $n$वां पद और योगफल सूत्रों का मूलभूत आधिकारिक आधार।'
    },
    {
      title: 'NCERT Class 11 Mathematics - Chapter 9: Sequences and Series',
      author: 'NCERT',
      description: 'समांतर माध्य, पदों के विशेष चयन और उन्नत बीजगणितीय परिणामों का प्रामाणिक संदर्भ।'
    },
    {
      title: 'Quantitative Aptitude for Competitive Examinations',
      author: 'R.S. Aggarwal',
      description: 'प्रतियोगी परीक्षाओं के दृष्टिकोण से अनुक्रम एवं श्रेणी के शॉर्टकट ट्रिक्स और प्रश्नों का संकलन।'
    },
    {
      title: 'CG Vyapam Previous Year Solved Papers (2015-2024)',
      author: 'CGPEB',
      description: 'व्यापम द्वारा आयोजित विभिन्न भर्ती परीक्षाओं के वास्तविक प्रश्न और समाधान।'
    }
  ],
  confusionBuster: [
    {
      misconception: 'सार्व अंतर $d$ हमेशा धनात्मक ही होता है।',
      clarification: 'सार्व अंतर धनात्मक (बढ़ती श्रेणी), ऋणात्मक (घटती श्रेणी) या शून्य (स्थिर श्रेणी) कुछ भी हो सकता है। जैसे $10, 6, 2, -2$ में $d = -4$ है।'
    },
    {
      misconception: '$T_n$ और $S_n$ में कोई अंतर नहीं है, दोनों से उत्तर एक ही आता है।',
      clarification: '$T_n$ केवल उस विशिष्ट $n$वें स्थान की संख्या है (जैसे 10वां पद), जबकि $S_n$ 1 से लेकर $n$वें पद तक की सभी संख्याओं का कुल जोड़ है।'
    },
    {
      misconception: 'अंत से $n$वां पद निकालने के लिए पहले कुल पद निकालना अनिवार्य है।',
      clarification: 'अनिवार्य नहीं है! सीधे शॉर्टकट सूत्र $l - (n - 1)d$ का प्रयोग करके बिना कुल पद $N$ निकाले भी तुरंत उत्तर पाया जा सकता है।'
    },
    {
      misconception: 'यदि $S_n = An^2 + Bn$ हो, तो सार्व अंतर $A$ होता है।',
      clarification: 'सार्व अंतर $A$ नहीं, बल्कि $2A$ ($n^2$ के गुणांक का दोगुना) होता है!'
    },
    {
      misconception: 'AP के पदों को गुणा करने पर भी AP ही मिलती है।',
      clarification: 'जोड़ने या घटाने पर AP ही रहती है, किसी संख्या से गुणा करने पर भी AP रहती है, किंतु दो अलग-अलग AP के पदों को परस्पर गुणा करने पर परिणामी अनुक्रम AP नहीं होता।'
    }
  ],
  faqList: [
    {
      question: 'कोई अनुक्रम समांतर श्रेणी (AP) है या नहीं, इसकी जाँच कैसे करें?',
      answer: 'क्रमागत पदों का अंतर ($T_2 - T_1, T_3 - T_2, T_4 - T_3$) निकालें। यदि प्रत्येक स्थान पर अंतर समान आता है, तो वह AP है।'
    },
    {
      question: 'योगफल $S_n$ से $n$वां पद $T_n$ कैसे ज्ञात करते हैं?',
      answer: 'सूत्र $T_n = S_n - S_{n-1}$ का प्रयोग करें। प्रथम पद के लिए $a = S_1$ तथा दूसरा पद $T_2 = S_2 - S_1$ निकालें, फिर $d = T_2 - T_1$ निकाल लें।'
    },
    {
      question: 'समांतर माध्य (AM) और औसत में क्या संबंध है?',
      answer: 'दो संख्याओं के लिए समांतर माध्य और उनका अंकगणितीय औसत पूर्णतः एक ही होते हैं ($AM = \\frac{a + b}{2}$)।'
    },
    {
      question: 'विभाज्य संख्याओं के प्रश्नों में पदों की संख्या कैसे तेजी से निकालें?',
      answer: 'दी गई सीमा में प्रथम विभाज्य संख्या ($a$) और अंतिम विभाज्य संख्या ($l$) ज्ञात करें। फिर सूत्र $n = \\frac{l - a}{d} + 1$ लागू करें।'
    },
    {
      question: 'यदि AP के तीन पदों का योग दिया हो, तो पदों को क्या मानना चाहिए?',
      answer: 'पदों को $(a - d), a, (a + d)$ मानना चाहिए। इससे तीनों का योग करते समय $d$ कट जाता है और $3a = \\text{योग}$ से सीधे मध्य पद $a$ प्राप्त हो जाता है।'
    }
  ],
  oneLinerRevision: [
    'समांतर श्रेणी का व्यापक रूप: $a, a+d, a+2d, a+3d, \\dots$ होता है।',
    'प्रारंभ से $n$वां पद: $T_n = a + (n - 1)d$।',
    'अंत से $n$वां पद: $l - (n - 1)d$ (जहाँ $l$ अंतिम पद है)।',
    'पदों की कुल संख्या: $n = \\frac{l - a}{d} + 1$।',
    'प्रथम $n$ पदों का योग: $S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)$।',
    '$S_n$ से पद निकालने का सूत्र: $T_n = S_n - S_{n-1}$।',
    'यदि $S_n = An^2 + Bn$ हो, तो सार्व अंतर $d = 2A$ होता है।',
    'प्रथम $n$ विषम प्राकृत संख्याओं का योग सदैव $n^2$ होता है।',
    'प्रथम $n$ सम प्राकृत संख्याओं का योग सदैव $n(n + 1)$ होता है।',
    'यदि $a, b, c$ AP में हों, तो मध्य पद $b = \\frac{a + c}{2}$ होता है।'
  ],
  rapidRevision: {
    points: [
      '$n$वां पद: $T_n = a + (n - 1)d$।',
      'अंत से पद: $l - (n - 1)d$।',
      'पदों की संख्या: $n = \\frac{l - a}{d} + 1$।',
      'योगफल: $S_n = \\frac{n}{2}(a + l) = \\frac{n}{2}[2a + (n - 1)d]$।',
      'मानक योग: $\\sum n = \\frac{n(n+1)}{2}$, $\\sum \\text{विषम} = n^2$, $\\sum \\text{सम} = n(n+1)$।',
      'शॉर्टकट: यदि $T_p = q$ और $T_q = p$, तो $T_{p+q} = 0$; यदि $S_p = q$ और $S_q = p$, तो $S_{p+q} = -(p + q)$।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_9 (Arithmetic Progression)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_9').set(sanitized);
  console.log('✅ cgv_master_adv_math_9 saved to Firestore topic_study_notes!');

  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === 'cgv_master_sub_3') {
        for (const ch of sub.chapters || []) {
          if (ch.id === 'cgv_master_sub_3_ch_14') {
            for (const t of ch.topics || []) {
              if (t.id === 'adv_math_9') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_9 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 adv_math_9 is synced!');
}

upload().catch(console.error);
