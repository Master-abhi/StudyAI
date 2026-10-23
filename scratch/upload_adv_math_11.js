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
  topicId: 'adv_math_11',
  topicName: 'Number Series',
  topicNameHi: 'संख्या श्रेणी',
  chapterId: 'cgv_master_sub_3_ch_14',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'संख्या श्रेणी (Number Series) गणित एवं तार्किक अभिक्षमता का एक अत्यंत महत्वपूर्ण और उच्च भारांक वाला अध्याय है। इसमें संख्याओं का एक क्रमिक समूह दिया होता है जो किसी विशिष्ट गणितीय संक्रिया या तार्किक पैटर्न (जैसे अंतर, द्वि-स्तरीय अंतर, वर्ग, घन, अभाज्य संख्या, एकांतर श्रेणी या संकर संक्रिया) का अनुसरण करता है। परीक्षार्थी को इस अंतर्निहित पैटर्न को पहचानकर लुप्त पद (Missing Term) या गलत पद (Wrong Term) ज्ञात करना होता है।',
    importance: 'CG Vyapam (पटवारी, आरआई, एसआई, छात्रावास अधीक्षक, शिक्षक भर्ती, सहायक ग्रेड) तथा CGPSC के प्रत्येक प्रश्नपत्र में संख्या श्रेणी से 3 से 5 प्रश्न अनिवार्य रूप से पूछे जाते हैं। इसकी महत्ता रेटिंग 10/10 है।',
    examRelevance: 'परीक्षाओं में द्वि-स्तरीय अंतर (Step-difference), वर्ग एवं घन पर आधारित ($n^2 \\pm k, n^3 \\pm n$), संकर श्रेणी ($\\times a + b$), दशमलव गुणक श्रेणी ($\\times 0.5, \\times 1, \\times 1.5, \\dots$) तथा अभाज्य संख्या श्रेणियों से सीधे प्रश्न पूछे जाते हैं।',
    quickFacts: [
      'धीमी वृद्धि $\\implies$ जोड़ या अंतर (Addition / Difference Series) का पैटर्न।',
      'तीव्र घातीय वृद्धि $\\implies$ गुणा या वर्ग/घन (Multiplication / Powers) का पैटर्न।',
      'उतार-चढ़ाव (घट-बढ़) $\\implies$ एकांतर श्रेणी (Alternate Series: दो स्वतंत्र श्रेणियां एक साथ)।',
      'व्यापम का सर्वाधिक पसंदीदा पैटर्न: $n^3 \\pm n$, $n^2 \\pm 1$ तथा $\\times 0.5, \\times 1, \\times 1.5$।',
      'अभाज्य संख्या श्रेणी ($2, 3, 5, 7, 11, 13, 17, 19, \\dots$) में कोई अंकगणितीय अंतर नियम नहीं लगता, केवल अभाज्य संख्याओं की पहचान ही कुंजी है।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'संख्या श्रेणी के मूलभूत प्रकार एवं पहचान की तकनीक',
      content: `### 1. श्रेणी के स्वरूप को पहचानने का गोल्डन रूल
संख्या श्रेणी को देखते ही सबसे पहले पदों के बीच के अंतर की गति (Rate of change) का विश्लेषण करें:
1. **यदि संख्याएं धीरे-धीरे बढ़ रही हों:** अंतर (Difference) निकालें।
2. **यदि संख्याएं बहुत तेजी से बढ़ रही हों:** गुणा (Multiplication) या वर्ग/घन (Power) का पैटर्न खोजें।
3. **यदि संख्याएं घट रही हों:** घटाव (Subtraction) या भाग (Division) का पैटर्न होगा।
4. **यदि एक संख्या बड़ी और एक छोटी हो:** एकांतर श्रेणी (Alternate Series) होगी।

### 2. अंतर आधारित श्रेणियां (Difference Series)
- **समान अंतर श्रेणी (AP):** $5, 9, 13, 17, 21, \\dots$ (प्रत्येक बार $+4$)
- **परिवर्तनशील अंतर श्रेणी:** $2, 5, 10, 17, 26, \\dots$ ($+3, +5, +7, +9, \\dots$)
- **द्वि-स्तरीय अंतर (Step-Difference Method):** जब पहले अंतर में पैटर्न न दिखे, तो अंतरों का पुनः अंतर निकालें।
  - उदाहरण: $1, 6, 15, 28, 45, \\dots$
  - प्रथम अंतर: $+5, +9, +13, +17$
  - द्वितीय अंतर: $+4, +4, +4$ (समान अंतर मिल गया!)`
    },
    {
      id: 'ch2',
      title: 'वर्ग, घन एवं घातांक आधारित श्रेणियां',
      content: `### 1. वर्ग एवं घन आधारित मानक श्रेणियां
- **पूर्ण वर्ग श्रेणी:** $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, \\dots$ ($n^2$)
- **पूर्ण घन श्रेणी:** $1, 8, 27, 64, 125, 216, 343, 512, 729, 1000, \\dots$ ($n^3$)

### 2. $n^2 \\pm k$ तथा $n^3 \\pm k$ पैटर्न (व्यापम का हॉट मॉडल)
- **$n^2 - 1$ मॉडल:** $0, 3, 8, 15, 24, 35, 48, 63, \\dots$
  ($1^2-1, 2^2-1, 3^2-1, 4^2-1, \\dots$)
- **$n^2 + 1$ मॉडल:** $2, 5, 10, 17, 26, 37, 50, 65, \\dots$
  ($1^2+1, 2^2+1, 3^2+1, 4^2+1, \\dots$)
- **$n^3 - n$ मॉडल:** $0, 6, 24, 60, 120, 210, 336, \\dots$
  ($1^3-1, 2^3-2, 3^3-3, 4^3-4, 5^3-5, \\dots$)
- **$n^3 + n$ मॉडल:** $2, 10, 30, 68, 130, 222, 350, \\dots$
  ($1^3+1, 2^3+2, 3^3+3, 4^3+4, 5^3+5, \\dots$)`
    },
    {
      id: 'ch3',
      title: 'संकर (Hybrid) एवं एकांतर (Alternate) श्रेणियां',
      content: `### 1. संकर श्रेणी (Hybrid / Mixed Operations)
इसमें एक साथ दो संक्रियाएं (गुणा तथा जोड़/घटाव) लागू होती हैं:
- **$\\times n + k$ पैटर्न:** $3, 7, 17, 39, 85, \\dots$
  ($3 \\times 2 + 1 = 7, 7 \\times 2 + 3 = 17, 17 \\times 2 + 5 = 39, \\dots$)
- **$\\times n - k$ पैटर्न:** $4, 7, 12, 21, 38, \\dots$
  ($4 \\times 2 - 1 = 7, 7 \\times 2 - 2 = 12, 12 \\times 2 - 3 = 21, \\dots$)
- **दशमलव गुणक पैटर्न (Decimal Multipliers):**
  $8, 4, 4, 6, 12, 30, 90, \\dots$
  ($8 \\times 0.5 = 4, 4 \\times 1 = 4, 4 \\times 1.5 = 6, 6 \\times 2 = 12, 12 \\times 2.5 = 30, 30 \\times 3 = 90$)

### 2. एकांतर श्रेणी (Alternate Series)
जब एक ही श्रेणी में दो स्वतंत्र श्रेणियां एक छोड़कर एक स्थान पर समाहित हों:
- उदाहरण: $3, 10, 5, 12, 7, 14, 9, \\dots$
  - विषम स्थान (1st, 3rd, 5th, 7th): $3, 5, 7, 9$ (प्रत्येक $+2$)
  - सम स्थान (2nd, 4th, 6th): $10, 12, 14$ (प्रत्येक $+2$)`
    },
    {
      id: 'ch4',
      title: 'फिबोनाची श्रेणी एवं अभाज्य संख्या श्रेणियां',
      content: `### 1. फिबोनाची श्रेणी (Fibonacci Series)
इस श्रेणी में प्रत्येक पद अपने पिछले दो पदों का योग होता है:
$$T_n = T_{n-1} + T_{n-2}$$
- मानक फिबोनाची: $0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, \\dots$
  ($0+1=1, 1+1=2, 1+2=3, 2+3=5, 3+5=8, \\dots$)
- परिवर्धित फिबोनाची: $2, 3, 5, 8, 13, 21, 34, \\dots$

### 2. अभाज्य संख्या श्रेणियां (Prime Number Series)
अभाज्य संख्याओं की श्रेणी में कोई नियमित गणितीय अंतर नहीं होता:
- $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, \\dots$
- **एक छोड़कर अभाज्य (Alternate Prime):** $2, 5, 11, 17, 23, 31, \\dots$
- **अभाज्य संख्याओं का अंतर:** पदों के बीच का अंतर अभाज्य संख्याएं हो सकता है ($+2, +3, +5, +7, +11, \\dots$)।`
    },
    {
      id: 'ch5',
      title: 'गलत पद (Wrong Term) ज्ञात करने की अचूक रणनीति',
      content: `### 1. गलत पद की पहचान की तकनीक
गलत पद ज्ञात करना लुप्त पद निकालने से थोड़ा अधिक सतर्कता मांगता है, क्योंकि एक गलत पद अपने आगे और पीछे के दो अंतरालों को दूषित कर देता है!

**पहचान के 3 नियम:**
1. **संपूर्ण अंतर श्रृंखला लिखें:** पहले सभी क्रमागत पदों का अंतर लिखें।
2. **पैटर्न का सामान्य नियम खोजें:** जहाँ अंतर का पैटर्न टूट रहा हो, उस बिंदु के दोनों सिरों के पदों का परीक्षण करें।
3. **सत्यापन (Verification):** संदिग्ध पद के स्थान पर संभावित सही संख्या रखकर देखें कि क्या आगे की पूरी श्रृंखला सुसंगत हो जाती है।

### 2. हल किया गया उदाहरण: गलत पद खोजें
$3, 8, 15, 27, 35, 48$
- अंतर: $+5, +7, +12, +8, +13$ (असंगत)
- वर्ग पैटर्न देखें:
  - $2^2 - 1 = 3$
  - $3^2 - 1 = 8$
  - $4^2 - 1 = 15$
  - $5^2 - 1 = 24$ (किंतु यहाँ 27 लिखा है!)
  - $6^2 - 1 = 35$
  - $7^2 - 1 = 48$
- अतः गलत पद **27** है (इसके स्थान पर 24 होना चाहिए)।`
    }
  ],
  comparativeTables: [
    {
      title: 'एकल अंतर बनाम द्वि-स्तरीय अंतर (Step-Difference)',
      headers: ['आधार / विशेषता', 'एकल अंतर श्रेणी (Single Difference)', 'द्वि-स्तरीय अंतर श्रेणी (Double Difference)'],
      rows: [
        ['पैटर्न की स्पष्टता', 'प्रथम अंतर निकालते ही स्पष्ट क्रम दिख जाता है', 'प्रथम अंतर में कोई स्पष्ट क्रम नहीं दिखता'],
        ['दूसरा चरण', 'अतिरिक्त अंतर निकालने की आवश्यकता नहीं होती', 'पहले अंतरों का पुनः अंतर ($\\Delta^2$) निकालना पड़ता है'],
        ['प्रकृति', 'समान संख्या या निश्चित वृद्धि ($+3, +5, +7$)', 'समांतर श्रेणी के रूप में अंतर बढ़ता है ($+4, +4, +4$)'],
        ['हल करने में लगा समय', '10 से 15 सेकंड', '25 से 35 सेकंड'],
        ['उदाहरण', '$4, 7, 10, 13, 16$ ($d = 3$)', '$2, 6, 12, 20, 30$ (अंतर: $4, 6, 8, 10$; $\\Delta^2 = 2$)']
      ]
    },
    {
      title: 'लुप्त पद (Missing Term) बनाम गलत पद (Wrong Term)',
      headers: ['मापदंड', 'लुप्त पद प्रश्न (Missing Term)', 'गलत पद प्रश्न (Wrong Term)'],
      rows: [
        ['प्रश्न का स्वरूप', 'श्रेणी में प्रश्नवाचक चिन्ह (?) दिया होता है', 'सभी पद दिए होते हैं, एक संख्या पैटर्न बिगाड़ती है'],
        ['कठिनाई स्तर', 'मध्यम (सीधा पैटर्न विस्तार)', 'उच्च (क्योंकि एक गलत संख्या दो अंतरालों को बिगाड़ती है)'],
        ['हल करने की विधि', 'बाएँ से दाएँ पैटर्न स्थापित कर ? के स्थान पर मान निकालें', 'अंतर लिखकर दो दूषित अंतरालों के उभयनिष्ठ पद को खोजें'],
        ['सत्यापन की आवश्यकता', 'केवल ? के बाद वाले पद से मिलान करें', 'सही संख्या रखकर आगे की पूरी श्रेणी सत्यापित करनी पड़ती है']
      ]
    },
    {
      title: 'श्रेणी के लक्षणों के आधार पर त्वरित निर्णय तालिका',
      headers: ['श्रेणी का दृश्य लक्षण', 'संभावित गणितीय पैटर्न', 'प्रथम प्राथमिकता / परीक्षण विधि'],
      rows: [
        ['धीमी और स्थिर वृद्धि', 'जोड़ / अंकगणितीय अंतर', 'क्रमागत पदों का अंतर ($T_{n} - T_{n-1}$) निकालें'],
        ['अत्यधिक तीव्र वृद्धि (हजारों में)', 'गुणा या घन ($n^3$)', 'पदों का अनुपात ($T_n / T_{n-1}$) देखें या $n^3$ से तुलना करें'],
        ['संख्या पहले घटी, फिर बढ़ी ($8, 4, 4, 6, 12$)', 'दशमलव गुणा ($\\times 0.5, \\times 1, \\times 1.5$)', 'पहले पद को $0.5$ से गुणा करके देखें'],
        ['संख्याएं एक बड़ी, एक छोटी (उतार-चढ़ाव)', 'एकांतर श्रेणी (Alternate Series)', 'विषम और सम स्थानों को अलग-अलग दो श्रेणियों में बांटें'],
        ['पदों का योग अगली संख्या बने ($1, 2, 3, 5, 8$)', 'फिबोनाची श्रेणी (Fibonacci)', 'पिछले दो पदों को जोड़कर तीसरे पद से मिलान करें']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'श्रेणी $2, 6, 12, 20, 30, 42, ?$ में अगला पद क्या होगा? [CG Vyapam Patwari]',
      options: [
        '56',
        '54',
        '52',
        '60'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Patwari',
      explanation: 'विधि 1 (अंतर विधि):\n$2 \\xrightarrow{+4} 6 \\xrightarrow{+6} 12 \\xrightarrow{+8} 20 \\xrightarrow{+10} 30 \\xrightarrow{+12} 42 \\xrightarrow{+14} 56$\nअंतर में प्रत्येक बार 2 की वृद्धि हो रही है, अतः अगला अंतर $+14$ होगा: $42 + 14 = 56$\n\nविधि 2 ($n^2 + n$ विधि):\n$1^2 + 1 = 2$\n$2^2 + 2 = 6$\n$3^2 + 3 = 12$\n$4^2 + 4 = 20$\n$5^2 + 5 = 30$\n$6^2 + 6 = 42$\n$7^2 + 7 = 49 + 7 = 56$'
    },
    {
      id: 'pyq2',
      question: 'श्रेणी $0, 6, 24, 60, 120, 210, ?$ का अगला पद ज्ञात कीजिए: [CGPSC SSE / Vyapam Combined]',
      options: [
        '336',
        '343',
        '330',
        '324'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'यह क्लासिक $n^3 - n$ पैटर्न है:\n- $1^3 - 1 = 0$\n- $2^3 - 2 = 8 - 2 = 6$\n- $3^3 - 3 = 27 - 3 = 24$\n- $4^3 - 4 = 64 - 4 = 60$\n- $5^3 - 5 = 125 - 5 = 120$\n- $6^3 - 6 = 216 - 6 = 210$\n- अगला पद: $7^3 - 7 = 343 - 7 = 336$'
    },
    {
      id: 'pyq3',
      question: 'श्रेणी $3, 5, 9, 17, 33, ?$ में प्रश्नवाचक चिन्ह के स्थान पर क्या आएगा? [CG Vyapam SI]',
      options: [
        '65',
        '64',
        '66',
        '49'
      ],
      correctOption: 0,
      examName: 'CG Vyapam SI',
      explanation: 'विधि 1 (अंतर):\nअंतर क्रमशः: $+2, +4, +8, +16, \\dots$\nअंतर प्रत्येक बार दोगुना हो रहा है, अतः अगला अंतर $= 16 \\times 2 = 32$ होगा।\nअगला पद $= 33 + 32 = 65$\n\nविधि 2 (संकर संक्रिया):\n$3 \\times 2 - 1 = 5$\n$5 \\times 2 - 1 = 9$\n$9 \\times 2 - 1 = 17$\n$17 \\times 2 - 1 = 33$\n$33 \\times 2 - 1 = 66 - 1 = 65$'
    },
    {
      id: 'pyq4',
      question: 'श्रेणी $12, 6, 6, 9, 18, 45, ?$ में लुप्त पद क्या है? [CG Vyapam Hostel Superintendent]',
      options: [
        '135',
        '90',
        '120',
        '150'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'यह दशमलव गुणक (Decimal Multiplier) पैटर्न है:\n- $12 \\times 0.5 = 6$\n- $6 \\times 1 = 6$\n- $6 \\times 1.5 = 9$\n- $9 \\times 2 = 18$\n- $18 \\times 2.5 = 45$\n- अगला गुणक $3$ होगा:\n$$45 \\times 3 = 135$$'
    },
    {
      id: 'pyq5',
      question: 'निम्नलिखित संख्या श्रेणी में गलत पद (Wrong Term) ज्ञात कीजिए: $5, 10, 17, 27, 37, 50, 65$ [CG Vyapam RI]',
      options: [
        '27',
        '17',
        '37',
        '10'
      ],
      correctOption: 0,
      examName: 'CG Vyapam RI',
      explanation: 'पैटर्न $n^2 + 1$ की जाँच करते हैं:\n- $2^2 + 1 = 5$\n- $3^2 + 1 = 10$\n- $4^2 + 1 = 17$\n- $5^2 + 1 = 26$ (किंतु श्रेणी में 27 दिया गया है!)\n- $6^2 + 1 = 37$\n- $7^2 + 1 = 50$\n- $8^2 + 1 = 65$\nअतः गलत पद 27 है (इसके स्थान पर 26 होना चाहिए था)।'
    },
    {
      id: 'pyq6',
      question: 'श्रेणी $2, 3, 5, 7, 11, 13, 17, ?$ का अगला पद क्या होगा? [CG Vyapam Teacher / Assistant Teacher]',
      options: [
        '19',
        '21',
        '23',
        '18'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Teacher',
      explanation: 'यह क्रमागत अभाज्य संख्याओं (Consecutive Prime Numbers) की श्रेणी है।\n17 के बाद अगली अभाज्य संख्या 19 होती है। (नोट: 21 भाज्य संख्या है क्योंकि $3 \\times 7 = 21$)।'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'श्रेणी $4, 9, 25, 49, 121, 169, ?$ का अगला पद क्या होगा?',
      options: [
        '289',
        '225',
        '196',
        '256'
      ],
      correctOption: 0,
      explanation: 'पदों का विश्लेषण: $2^2, 3^2, 5^2, 7^2, 11^2, 13^2, \\dots$\nये क्रमागत अभाज्य संख्याओं के वर्ग हैं! 13 के बाद अगली अभाज्य संख्या 17 है।\nअतः अगला पद $= 17^2 = 289$ (यहाँ $15^2 = 225$ नहीं होगा क्योंकि 15 अभाज्य नहीं है)।'
    },
    {
      id: 'mcq2',
      question: 'श्रेणी $1, 1, 2, 3, 5, 8, 13, 21, ?$ में अगला पद क्या होगा?',
      options: [
        '34',
        '32',
        '29',
        '35'
      ],
      correctOption: 0,
      explanation: 'यह फिबोनाची श्रेणी है जहाँ प्रत्येक पद पिछले दो पदों का योग है:\n$$13 + 21 = 34$$'
    },
    {
      id: 'mcq3',
      question: 'श्रेणी $7, 8, 18, 57, ?, 1165$ में प्रश्नवाचक चिन्ह के स्थान पर क्या आएगा?',
      options: [
        '232',
        '228',
        '240',
        '236'
      ],
      correctOption: 0,
      explanation: 'संकर पैटर्न:\n- $7 \\times 1 + 1 = 8$\n- $8 \\times 2 + 2 = 18$\n- $18 \\times 3 + 3 = 57$\n- अगला पद: $57 \\times 4 + 4 = 228 + 4 = 232$\nजाँच: $232 \\times 5 + 5 = 1160 + 5 = 1165$ (पूर्णतः सत्यापित)।'
    },
    {
      id: 'mcq4',
      question: 'श्रेणी $2, 8, 14, 24, 34, 48, ?$ में अगला पद क्या होगा?',
      options: [
        '62',
        '60',
        '64',
        '58'
      ],
      correctOption: 0,
      explanation: 'अंतर देखें:\n$2 \\xrightarrow{+6} 8 \\xrightarrow{+6} 14 \\xrightarrow{+10} 24 \\xrightarrow{+10} 34 \\xrightarrow{+14} 48 \\xrightarrow{+14} 62$\nअंतर दो-दो बार दोहराया जा रहा है: $+6, +6$, फिर $+10, +10$, फिर $+14, +14$\nअतः $48 + 14 = 62$।'
    },
    {
      id: 'mcq5',
      question: 'श्रेणी $1, 4, 27, 16, 125, 36, ?$ में अगला पद क्या होगा?',
      options: [
        '343',
        '49',
        '216',
        '64'
      ],
      correctOption: 0,
      explanation: 'एकांतर घात श्रेणी:\n- विषम स्थान (1st, 3rd, 5th, 7th): घन हैं $\\implies 1^3 = 1, 3^3 = 27, 5^3 = 125, 7^3 = 343$\n- सम स्थान (2nd, 4th, 6th): वर्ग हैं $\\implies 2^2 = 4, 4^2 = 16, 6^2 = 36$\nअतः 7वां पद $7^3 = 343$ होगा।'
    },
    {
      id: 'mcq6',
      question: 'दी गई श्रेणी में गलत पद ज्ञात कीजिए: $1, 3, 10, 21, 64, 129, 356$',
      options: [
        '356',
        '21',
        '10',
        '64'
      ],
      correctOption: 1,
      explanation: 'पैटर्न: $\\times 2 + 1, \\times 3 + 1, \\times 2 + 1, \\dots$\n- $1 \\times 2 + 1 = 3$\n- $3 \\times 3 + 1 = 10$\n- $10 \\times 2 + 1 = 21$ (किंतु यदि आगे $\\times 3 + 1$ करें तो $21 \\times 3 + 1 = 64$ सही है)\nवैकल्पिक रूप: $1\\times 2 + 1 = 3, 3\\times 2 + 4 = 10, 10\\times 2 + 1 = 21$\nवास्तव में: $1\\times 2 + 1 = 3, 3\\times 3 + 1 = 10, 10\\times 2 + 1 = 21, 21\\times 3 + 1 = 64, 64\\times 2 + 1 = 129, 129\\times 3 + 1 = 388$ (यहाँ 356 गलत है)।'
    },
    {
      id: 'mcq7',
      question: 'श्रेणी $6, 11, 21, 36, 56, ?$ का अगला पद क्या होगा?',
      options: [
        '81',
        '78',
        '82',
        '86'
      ],
      correctOption: 0,
      explanation: 'अंतर निकालें:\n$+5, +10, +15, +20, +25$\nअतः अगला पद $= 56 + 25 = 81$।'
    },
    {
      id: 'mcq8',
      question: 'श्रेणी $10, 100, 200, 310, ?$ में अगला पद क्या होगा?',
      options: [
        '430',
        '420',
        '410',
        '440'
      ],
      correctOption: 0,
      explanation: 'अंतर निकालें:\n$+90, +100, +110, +120$\nअतः अगला पद $= 310 + 120 = 430$।'
    }
  ],
  keyTerminology: [
    {
      term: 'Number Series',
      termHi: 'संख्या श्रेणी',
      definition: 'A sequence of numbers arranged in accordance with a specific mathematical pattern or logical order.',
      definitionHi: 'विशिष्ट गणितीय नियम या तार्किक क्रम के अनुसार व्यवस्थित संख्याओं का अनुक्रम।'
    },
    {
      term: 'Missing Term',
      termHi: 'लुप्त पद',
      definition: 'The unknown value designated by a question mark (?) that completes the defined mathematical sequence.',
      definitionHi: 'श्रेणी में प्रश्नवाचक चिन्ह (?) द्वारा दर्शाया गया वह अज्ञात पद जो पैटर्न को पूर्ण करता है।'
    },
    {
      term: 'Wrong Term / Odd One Out',
      termHi: 'गलत पद / असंगत संख्या',
      definition: 'A specific number in an otherwise consistent series that violates the underlying pattern.',
      definitionHi: 'श्रेणी में उपस्थित वह संख्या जो शेष संख्याओं के तार्किक नियम का उल्लंघन करती है।'
    },
    {
      term: 'Step-Difference Method',
      termHi: 'द्वि-स्तरीय अंतर विधि',
      definition: 'Analyzing the differences of consecutive terms, and then taking the difference of those differences to identify hidden APs.',
      definitionHi: 'क्रमागत पदों के अंतरों का पुनः अंतर निकालकर छिपे हुए नियम को पहचानने की तकनीक।'
    },
    {
      term: 'Hybrid / Mixed Series',
      termHi: 'संकर श्रेणी',
      definition: 'A sequence governed by a simultaneous combination of two mathematical operations like multiplication with addition ($a \\cdot x + b$).',
      definitionHi: 'गुणा और जोड़/घटाव जैसी दो या दो से अधिक गणितीय संक्रियाओं के संयुक्त नियम पर आधारित श्रेणी।'
    },
    {
      term: 'Alternate Series',
      termHi: 'एकांतर श्रेणी',
      definition: 'A composite sequence made of two or more independent series interwoven at alternate odd and even positions.',
      definitionHi: 'एकान्तर (सम और विषम) स्थानों पर समाहित दो स्वतंत्र श्रेणियों का संयुक्त क्रम।'
    },
    {
      term: 'Fibonacci Series',
      termHi: 'फिबोनाची श्रेणी',
      definition: 'A sequence where each number is the sum of the preceding two numbers ($T_n = T_{n-1} + T_{n-2}$).',
      definitionHi: 'वह अनुक्रम जिसमें प्रत्येक पद अपने पिछले दो पदों के योग के बराबर होता है।'
    },
    {
      term: 'Decimal Multiplier Series',
      termHi: 'दशमलव गुणक श्रेणी',
      definition: 'A pattern characterized by an initial drop followed by continuous growth using step-wise decimal factors ($\\times 0.5, \\times 1, \\times 1.5, \\dots$).',
      definitionHi: 'दशमलव गुणकों ($0.5, 1, 1.5, 2, \\dots$) से गुणा करने पर बनने वाली श्रेणी जो पहले घटती है और फिर तेजी से बढ़ती है।'
    }
  ],
  sources: [
    {
      title: 'A Modern Approach to Verbal & Non-Verbal Reasoning - Chapter: Number Series',
      author: 'R.S. Aggarwal',
      description: 'संख्या श्रेणी, लुप्त पद एवं गलत पद के सभी मूलभूत एवं उन्नत पैटर्न्स का प्रामाणिक संदर्भ ग्रंथ।'
    },
    {
      title: 'Magical Book on Quicker Maths',
      author: 'M. Tyra',
      description: 'द्वि-स्तरीय अंतर विधि और द्रुत गति से पैटर्न पहचानने के शॉर्टकट नियमों का संग्रह।'
    },
    {
      title: 'CG Vyapam Solved Papers (2012-2024)',
      author: 'CGPEB',
      description: 'छत्तीसगढ़ व्यापम की विभिन्न प्रतियोगी परीक्षाओं में पूछे गए वास्तविक संख्या श्रेणी प्रश्नों का संकलन।'
    },
    {
      title: 'How to Prepare for Quantitative Aptitude for CAT',
      author: 'Arun Sharma',
      description: 'संख्या पद्धति एवं उन्नत संख्या श्रृंखलाओं के तार्किक विश्लेषण का मानक स्रोत।'
    }
  ],
  confusionBuster: [
    {
      misconception: 'यदि अंतर से पैटर्न न मिले, तो प्रश्न गलत है।',
      clarification: 'ऐसा बिल्कुल नहीं है! कई बार अंतर के बजाय गुणा, वर्ग/घन ($n^2 \\pm k, n^3 \\pm n$), फिबोनाची या एकांतर श्रेणी का नियम लागू होता है।'
    },
    {
      misconception: 'गलत पद वाले प्रश्नों में जो संख्या अभाज्य न हो वही हमेशा गलत होती है।',
      clarification: 'गलत पद केवल अभाज्य/भाज्य पर निर्भर नहीं करता, बल्कि पूरी श्रेणी के गणितीय प्रवाह में जो संख्या अवरोध पैदा करती है, वही गलत होती है।'
    },
    {
      misconception: 'दशमलव वाली श्रेणी बहुत कठिन होती है और इसमें भाग देना पड़ता है।',
      clarification: 'दशमलव श्रेणी सामान्यतः $\\times 0.5, \\times 1, \\times 1.5, \\times 2$ का सीधा गुणक पैटर्न होती है, जिसे पहचानना अत्यंत सरल है।'
    },
    {
      misconception: '$2, 3, 5, 7, 11$ में अगला पद 13 के स्थान पर 9 या 15 होगा।',
      clarification: 'यह अभाज्य संख्याओं की श्रेणी है! विषम संख्या और अभाज्य संख्या में अंतर समझें; 9 और 15 विषम हैं किंतु अभाज्य नहीं।'
    },
    {
      misconception: 'एकांतर श्रेणी को भी एक ही निरंतर श्रेणी मानकर अंतर निकालना चाहिए।',
      clarification: 'एकांतर श्रेणी में एक संख्या छोड़कर एक संख्या ($1, 3, 5, \\dots$ तथा $2, 4, 6, \\dots$) का स्वतंत्र संबंध होता है, उन्हें एक साथ देखने पर समय नष्ट होता है।'
    }
  ],
  faqList: [
    {
      question: 'संख्या श्रेणी के प्रश्नों को हल करने का सबसे पहला कदम क्या होना चाहिए?',
      answer: 'सबसे पहले पदों के बीच का अंतर निकालें। 80% प्रश्न पहले या दूसरे स्तर के अंतर से ही तुरंत हल हो जाते हैं।'
    },
    {
      question: 'यदि श्रेणी की संख्या पहले घटे और फिर बढ़ने लगे, तो क्या पैटर्न हो सकता है?',
      answer: 'यह 100% दशमलव गुणक श्रेणी ($\\times 0.5, \\times 1, \\times 1.5, \\dots$) का संकेत है।'
    },
    {
      question: 'गलत पद (Wrong Term) को जल्दी कैसे पकड़ें?',
      answer: 'सभी क्रमागत पदों का अंतर लिखें। जहाँ अंतर का क्रम बिगड़ रहा हो, वहाँ दो अंतर गलत दिखेंगे। उन दोनों गलत अंतरों के बीच की संख्या ही \'गलत पद\' होती है।'
    },
    {
      question: 'CG Vyapam में सबसे ज्यादा कौन से पैटर्न पूछे जाते हैं?',
      answer: 'व्यापम में $n^3 - n$ ($0, 6, 24, 60, 120, 210$), $n^2 + 1$, फिबोनाची जोड़, तथा द्वि-स्तरीय अंतर (Step-difference) सबसे ज्यादा पूछे जाते हैं।'
    },
    {
      question: 'अभाज्य संख्या श्रेणी को कैसे याद रखें?',
      answer: 'प्रथम 100 तक की अभाज्य संख्याओं ($2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97$) को कंठस्थ रखें।'
    }
  ],
  oneLinerRevision: [
    'धीमी वृद्धि जोड़/अंतर को दर्शाती है, जबकि तीव्र वृद्धि गुणा या घात को दर्शाती है।',
    'उतार-चढ़ाव होने पर एकांतर श्रेणी (दो स्वतंत्र श्रेणियां) की जाँच करें।',
    'द्वि-स्तरीय अंतर (Step-difference) में अंतरों का पुनः अंतर निकाला जाता है।',
    'क्लासिक $n^3 - n$ श्रेणी: $0, 6, 24, 60, 120, 210, 336, \\dots$।',
    'क्लासिक $n^3 + n$ श्रेणी: $2, 10, 30, 68, 130, 222, 350, \\dots$।',
    'दशमलव गुणक का विशिष्ट संकेत: संख्या पहले आधी होती है और फिर बढ़ती है।',
    'फिबोनाची श्रेणी में प्रत्येक पद पिछले दो पदों का योग होता है ($T_n = T_{n-1} + T_{n-2}$)।',
    'अभाज्य संख्या श्रेणी $2$ से प्रारंभ होती है ($2, 3, 5, 7, 11, \\dots$), $1$ अभाज्य नहीं है।',
    'गलत पद की पहचान हेतु दो दूषित अंतरालों के उभयनिष्ठ पद को देखें।',
    'अभाज्य संख्याओं के वर्ग: $4, 9, 25, 49, 121, 169, 289$ (यहाँ $225$ नहीं आता)।'
  ],
  rapidRevision: {
    points: [
      'अंतर नियम: $\\Delta^1$ या $\\Delta^2$ का विश्लेषण।',
      'घात नियम: $n^2 \\pm k$ तथा $n^3 \\pm n$ का परीक्षण।',
      'संकर नियम: $\\times a + b$ अथवा $\\times a - b$।',
      'दशमलव नियम: $\\times 0.5, \\times 1, \\times 1.5, \\times 2$।',
      'फिबोनाची नियम: $T_n = T_{n-1} + T_{n-2}$।',
      'गलत पद: दूषित अंतरालों का उभयनिष्ठ केंद्र।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_11 (Number Series)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_11').set(sanitized);
  console.log('✅ cgv_master_adv_math_11 saved to Firestore topic_study_notes!');

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
              if (t.id === 'adv_math_11') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_11 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 Chapter 14 is now 100% complete!');
}

upload().catch(console.error);
