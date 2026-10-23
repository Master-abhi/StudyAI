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
  topicId: 'adv_math_10',
  topicName: 'Geometric Progression',
  topicNameHi: 'गुणोत्तर श्रेणी (GP)',
  chapterId: 'cgv_master_sub_3_ch_14',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'गुणोत्तर श्रेणी (Geometric Progression - GP) संख्याओं का ऐसा अनुक्रम है जिसमें प्रत्येक पद अपने पूर्ववर्ती पद में एक निश्चित अशून्य अचर संख्या का गुणा करके प्राप्त किया जाता है। इस अचर अनुपात को सार्व अनुपात (Common Ratio - $r$) कहते हैं। इसका व्यापक रूप $a, ar, ar^2, ar^3, \\dots, ar^{n-1}$ होता है।',
    importance: 'CG Vyapam और CGPSC में गुणोत्तर श्रेणी के व्यापक पद ($T_n$), प्रथम $n$ पदों के योग ($S_n$), अनंत गुणोत्तर श्रेणी के योग ($S_\\infty$) और गुणोत्तर माध्य (GM) से संबंधित प्रश्न पूछे जाते हैं। यह चक्रवृद्धि ब्याज, जनसंख्या वृद्धि तथा उछलती गेंद (Bouncing Ball) के भौतिकी-गणित मॉडलों में भी प्रयुक्त होता है।',
    examRelevance: 'परीक्षाओं में $n$वां पद निकालना, आवर्त दशमलव (Recurring Decimals) को भिन्न में बदलना, अनंत पदों का योग ($S_\\infty = \\frac{a}{1 - r}$) तथा समांतर एवं गुणोत्तर माध्य के मध्य संबंध ($AM \\ge GM$) पर आधारित प्रश्न सीधे आते हैं।',
    quickFacts: [
      'सार्व अनुपात: $r = \\frac{T_2}{T_1} = \\frac{T_3}{T_2} = \\dots = \\frac{T_n}{T_{n-1}}$ ($r \\neq 0$)।',
      'प्रारंभ से $n$वां पद: $T_n = a \\cdot r^{n-1}$।',
      'अंत से $n$वां पद: $\\frac{l}{r^{n-1}}$ (जहाँ $l$ अंतिम पद है)।',
      'प्रथम $n$ पदों का योग: $S_n = \\frac{a(r^n - 1)}{r - 1}$ (जब $r > 1$) तथा $S_n = \\frac{a(1 - r^n)}{1 - r}$ (जब $r < 1$)।',
      'अनंत गुणोत्तर श्रेणी का योग: $S_\\infty = \\frac{a}{1 - r}$ (केवल जब $|r| < 1$ हो)।',
      'गुणोत्तर माध्य: दो संख्याओं $a$ और $b$ का $GM = \\sqrt{ab}$।',
      'महत्वपूर्ण असमानता: किन्हीं दो धनात्मक संख्याओं के लिए सदैव $AM \\ge GM \\ge HM$ तथा $G^2 = A \\cdot H$।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'गुणोत्तर श्रेणी की मूल संकल्पना एवं सार्व अनुपात',
      content: `### 1. गुणोत्तर श्रेणी की परिभाषा
यदि किसी अनुक्रम में किसी पद का उसके ठीक पूर्ववर्ती पद से अनुपात सदैव एक अचर (Constant) राशि रहे, तो वह अनुक्रम गुणोत्तर श्रेणी कहलाता है।
- **प्रथम पद (First Term):** इसे '$a$' से दर्शाया जाता है।
- **सार्व अनुपात (Common Ratio):** इसे '$r$' से दर्शाया जाता है।
  $$r = \\frac{T_n}{T_{n-1}}$$

### 2. गुणोत्तर श्रेणी का व्यापक स्वरूप
$$a, ar, ar^2, ar^3, \\dots, ar^{n-1}, \\dots$$
जहाँ:
- प्रथम पद $T_1 = a$
- द्वितीय पद $T_2 = ar$
- तृतीय पद $T_3 = ar^2$

### 3. गुणोत्तर श्रेणी के महत्वपूर्ण गुणधर्म
1. यदि किसी GP के प्रत्येक पद को किसी अशून्य अचर $k$ से गुणा या भाग किया जाए, तो प्राप्त नया अनुक्रम भी GP होता है जिसका सार्व अनुपात अपरिवर्तित ($r$) रहता है।
2. यदि $a_1, a_2, a_3, \\dots$ GP में हों, तो उनके व्युत्क्रम $\\frac{1}{a_1}, \\frac{1}{a_2}, \\frac{1}{a_3}, \\dots$ भी GP में होते हैं (सार्व अनुपात $\\frac{1}{r}$)।
3. यदि $a, b, c$ GP में हों, तो:
   $$\\frac{b}{a} = \\frac{c}{b} \\implies b^2 = ac \\implies b = \\sqrt{ac}$$`
    },
    {
      id: 'ch2',
      title: '$n$वां पद एवं अंत से पद की गणना',
      content: `### 1. प्रारंभ से $n$वां पद ($T_n$)
माना GP का प्रथम पद $a$ तथा सार्व अनुपात $r$ है:
$$T_n = a \\cdot r^{n-1}$$

**उदाहरण:** श्रेणी $2, 6, 18, 54, \\dots$ का 7वां पद ज्ञात कीजिए:
- यहाँ $a = 2$, सार्व अनुपात $r = \\frac{6}{2} = 3$
- $n = 7$
$$T_7 = a \\cdot r^{7-1} = 2 \\cdot 3^6 = 2 \\times 729 = 1458$$

### 2. अंत से $n$वां पद (Term from the End)
यदि किसी परिमित GP का अंतिम पद $l$ तथा सार्व अनुपात $r$ हो:
$$\\text{अंत से } n\\text{वां पद} = \\frac{l}{r^{n-1}}$$

### 3. पदों की संख्या ($n$) ज्ञात करना
यदि प्रथम पद $a$, सार्व अनुपात $r$ और $n$वां पद $T_n$ ज्ञात हो:
$$r^{n-1} = \\frac{T_n}{a}$$
दोनों पक्षों के आधार को समान बनाकर या लघुगणक (Logarithm) लेकर $n$ का मान ज्ञात किया जाता है।`
    },
    {
      id: 'ch3',
      title: 'प्रथम $n$ पदों का योग एवं अनंत GP का योग ($S_\\infty$)',
      content: `### 1. परिमित GP के प्रथम $n$ पदों का योग ($S_n$)
- **स्थिति 1 (जब $r > 1$ हो):**
  $$S_n = \\frac{a(r^n - 1)}{r - 1}$$
- **स्थिति 2 (जब $r < 1$ हो):**
  $$S_n = \\frac{a(1 - r^n)}{1 - r}$$
- **स्थिति 3 (जब $r = 1$ हो):**
  $$S_n = a + a + a + \\dots (n \\text{ बार}) = n \\cdot a$$

### 2. अनंत गुणोत्तर श्रेणी का योगफल ($S_\\infty$)
यदि किसी GP में पदों की संख्या अनंत हो और सार्व अनुपात का संख्यात्मक मान 1 से कम हो (अर्थात $-1 < r < 1$ या $|r| < 1$):
जब $n \\to \\infty$ होता है, तो $r^n \\to 0$ हो जाता है।
अतः:
$$S_\\infty = \\frac{a}{1 - r}$$
**विशेष टिप्पणी:** यदि $|r| \\ge 1$ हो, तो अनंत पदों का योग अपरिभाषित (अनंत) होता है।

### 3. अनुप्रयोग: आवर्त दशमलव (Recurring Decimals) को भिन्न में बदलना
**उदाहरण:** $0.4444\\dots = 0.\\bar{4}$ को भिन्न में बदलें:
$$0.\\bar{4} = \\frac{4}{10} + \\frac{4}{100} + \\frac{4}{1000} + \\dots$$
यहाँ $a = \\frac{4}{10} = 0.4$ तथा $r = \\frac{1}{10} = 0.1 < 1$
$$S_\\infty = \\frac{a}{1 - r} = \\frac{0.4}{1 - 0.1} = \\frac{0.4}{0.9} = \\frac{4}{9}$$`
    },
    {
      id: 'ch4',
      title: 'गुणोत्तर माध्य (GM) एवं पदों के चयन की विधि',
      content: `### 1. गुणोत्तर माध्य (Geometric Mean)
- दो धनात्मक संख्याओं $a$ और $b$ का गुणोत्तर माध्य:
  $$GM = \\sqrt{ab}$$
- $n$ धनात्मक संख्याओं $x_1, x_2, \\dots, x_n$ का गुणोत्तर माध्य:
  $$GM = (x_1 \\cdot x_2 \\cdot \\dots \\cdot x_n)^{1/n}$$

### 2. दो संख्याओं के बीच $n$ गुणोत्तर माध्य प्रविष्ट करना
माना $a$ और $b$ के बीच $n$ गुणोत्तर माध्य $G_1, G_2, \\dots, G_n$ हैं:
- कुल पद $= n + 2$
- सार्व अनुपात:
  $$r = \\left(\\frac{b}{a}\\right)^{\\frac{1}{n+1}}$$
- सभी $n$ गुणोत्तर माध्यों का गुणनफल:
  $$\\prod_{i=1}^n G_i = (\\sqrt{ab})^n = (GM)^n$$

### 3. पदों के चयन का मानक नियम
जब GP के पदों का गुणनफल दिया हो, तो गणना को सरल बनाने हेतु:
- **3 पद मानने हों:** $\\frac{a}{r}, a, ar$ (सार्व अनुपात $= r$; गुणनफल $= a^3$)
- **4 पद मानने हों:** $\\frac{a}{r^3}, \\frac{a}{r}, ar, ar^3$ (सार्व अनुपात $= r^2$; गुणनफल $= a^4$)
- **5 पद मानने हों:** $\\frac{a}{r^2}, \\frac{a}{r}, a, ar, ar^2$ (सार्व अनुपात $= r$; गुणनफल $= a^5$)`
    },
    {
      id: 'ch5',
      title: 'AM, GM, HM संबंध एवं भौतिकी-गणित मॉडल ट्रिक्स',
      content: `### 1. माध्यों के मध्य संबंध ($AM, GM, HM$)
किन्हीं दो धनात्मक संख्याओं $a$ और $b$ के लिए:
- $AM = \\frac{a + b}{2}$
- $GM = \\sqrt{ab}$
- $HM = \\frac{2ab}{a + b}$

**महत्वपूर्ण परिणाम:**
1. $$AM \\ge GM \\ge HM$$
   (समता केवल तभी होती है जब $a = b$ हो)।
2. $$GM^2 = AM \\cdot HM$$
   अर्थात $AM, GM, HM$ स्वयं गुणोत्तर श्रेणी (GP) में होते हैं!

### 2. उछलती गेंद मॉडल (Bouncing Ball Problem)
**प्रश्न मॉडल:** एक गेंद को $H$ मीटर की ऊँचाई से गिराया जाता है। प्रत्येक टप्पे (Bounce) के बाद वह अपनी पिछली ऊँचाई का $\\frac{1}{r}$ (या $e$) गुना उछलती है। गेंद द्वारा विराम में आने तक तय की गई कुल दूरी:
$$\\text{कुल दूरी} = H + 2(H_1 + H_2 + H_3 + \\dots)$$
$$\\text{कुल दूरी} = H \\cdot \\left(\\frac{1 + e}{1 - e}\\right)$$
जहाँ $e$ ऊँचाई का अनुपात (Restitution fraction) है।`
    }
  ],
  comparativeTables: [
    {
      title: 'समांतर श्रेणी (AP) बनाम गुणोत्तर श्रेणी (GP)',
      headers: ['आधार / विशेषता', 'समांतर श्रेणी (AP)', 'गुणोत्तर श्रेणी (GP)'],
      rows: [
        ['परिभाषा', 'क्रमागत पदों का अंतर सदैव समान रहता है', 'क्रमागत पदों का अनुपात सदैव समान रहता है'],
        ['अचर राशि', 'सार्व अंतर $d = T_n - T_{n-1}$', 'सार्व अनुपात $r = \\frac{T_n}{T_{n-1}}$'],
        ['व्यापक पद ($T_n$)', '$T_n = a + (n - 1)d$', '$T_n = a \\cdot r^{n-1}$'],
        ['माध्य सूत्र', '$AM = \\frac{a + b}{2}$', '$GM = \\sqrt{ab}$'],
        ['अनंत पदों का योग', 'सदैव अनंत (अपरिभाषित)', '$S_\\infty = \\frac{a}{1 - r}$ (जब $|r| < 1$)'],
        ['वृद्धि की दर', 'रैखिक वृद्धि (समान गति से)', 'चरघातांकी वृद्धि (तीव्र घातीय गति से)']
      ]
    },
    {
      title: 'परिमित GP योग ($S_n$) बनाम अनंत GP योग ($S_\\infty$)',
      headers: ['मापदंड', 'परिमित GP योग ($S_n$)', 'अनंत GP योग ($S_\\infty$)'],
      rows: [
        ['पदों की संख्या', 'सीमित ($n$ पद)', 'अनंत ($n \\to \\infty$)'],
        ['सार्व अनुपात की शर्त', '$r$ का कोई भी वास्तविक मान ($r \\neq 1$)', 'अनिवार्य शर्त: $|r| < 1$ (अर्थात $-1 < r < 1$)'],
        ['सूत्र', '$S_n = \\frac{a(1 - r^n)}{1 - r}$', '$S_\\infty = \\frac{a}{1 - r}$'],
        ['$n$ पर निर्भरता', '$n$ पर निर्भर करता है', '$n$ से पूर्णतः स्वतंत्र होता है'],
        ['प्रमुख अनुप्रयोग', 'ऋण की किस्तें, निश्चित वर्षों की वृद्धि', 'आवर्त दशमलव, ज्यामितीय आकृतियों का पुनरावर्तन']
      ]
    },
    {
      title: 'AM, GM एवं HM का तुलनात्मक विश्लेषण',
      headers: ['मापदंड', 'समांतर माध्य (AM)', 'गुणोत्तर माध्य (GM)', 'हरात्मक माध्य (HM)'],
      rows: [
        ['दो संख्याओं हेतु सूत्र', '$\\frac{a + b}{2}$', '$\\sqrt{ab}$', '$\\frac{2ab}{a + b}$'],
        ['आपेक्षिक मान', 'तीनों में सबसे बड़ा ($AM \\ge GM$)', 'मध्यवर्ती मान', 'तीनों में सबसे छोटा ($HM \\le GM$)'],
        ['पारस्परिक संबंध', '-', '$GM = \\sqrt{AM \\cdot HM}$', '-'],
        ['उपयुक्तता', 'अंकगणितीय औसत व योग में', 'वृद्धि दर, सूचकांक व अनुपात में', 'औसत चाल व कार्य-क्षमता में']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'गुणोत्तर श्रेणी $2, 8, 32, 128, \\dots$ का कौन सा पद 8192 होगा? [CG Vyapam SI Mains]',
      options: [
        '6वां',
        '7वां',
        '8वां',
        '9वां'
      ],
      correctOption: 1,
      examName: 'CG Vyapam SI Mains',
      explanation: 'यहाँ प्रथम पद $a = 2$, सार्व अनुपात $r = \\frac{8}{2} = 4$\n$n$वां पद $T_n = a \\cdot r^{n-1} = 8192$\n$$2 \\cdot 4^{n-1} = 8192$$\n$$4^{n-1} = \\frac{8192}{2} = 4096$$\nचूँकि $4096 = 4^6$, अतः:\n$$4^{n-1} = 4^6 \\implies n - 1 = 6 \\implies n = 7$$'
    },
    {
      id: 'pyq2',
      question: 'अनंत गुणोत्तर श्रेणी $1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots$ का योगफल क्या होगा? [CG Vyapam Patwari / RI]',
      options: [
        '2',
        '$\\frac{3}{2}$',
        '1',
        'अनंत'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Patwari',
      explanation: 'यहाँ प्रथम पद $a = 1$, सार्व अनुपात $r = \\frac{1/2}{1} = \\frac{1}{2}$\nचूँकि $|r| = \\frac{1}{2} < 1$, अतः अनंत पदों का योग सूत्र लागू होगा:\n$$S_\\infty = \\frac{a}{1 - r} = \\frac{1}{1 - 1/2} = \\frac{1}{1/2} = 2$$'
    },
    {
      id: 'pyq3',
      question: 'यदि दो संख्याओं के समांतर माध्य (AM) और गुणोत्तर माध्य (GM) क्रमशः 10 और 8 हैं, तो वे संख्याएं क्या होंगी? [CGPSC SSE / Vyapam Combined]',
      options: [
        '16 और 4',
        '12 और 8',
        '18 और 2',
        '20 और 5'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'माना संख्याएं $a$ और $b$ हैं।\n$AM = \\frac{a + b}{2} = 10 \\implies a + b = 20$\n$GM = \\sqrt{ab} = 8 \\implies ab = 64$\nहम जानते हैं कि $(a - b)^2 = (a + b)^2 - 4ab$:\n$$(a - b)^2 = 20^2 - 4(64) = 400 - 256 = 144 \\implies a - b = 12$$\nजोड़ने पर: $2a = 32 \\implies a = 16$\nघटाने पर: $b = 20 - 16 = 4$\nअतः संख्याएं 16 और 4 हैं।'
    },
    {
      id: 'pyq4',
      question: 'आवर्त दशमलव $0.333\\dots = 0.\\bar{3}$ का अनंत गुणोत्तर श्रेणी द्वारा परिमेय रूप क्या है? [CG Vyapam Hostel Superintendent]',
      options: [
        '$\\frac{1}{3}$',
        '$\\frac{3}{10}$',
        '$\\frac{1}{9}$',
        '$\\frac{3}{11}$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: '$$0.\\bar{3} = \\frac{3}{10} + \\frac{3}{100} + \\frac{3}{1000} + \\dots$$\nयहाँ $a = \\frac{3}{10}$, $r = \\frac{1}{10}$\n$$S_\\infty = \\frac{a}{1 - r} = \\frac{3/10}{1 - 1/10} = \\frac{3/10}{9/10} = \\frac{3}{9} = \\frac{1}{3}$$'
    },
    {
      id: 'pyq5',
      question: 'गुणोत्तर श्रेणी $1, 3, 9, 27, \\dots$ के प्रथम 6 पदों का योग क्या होगा? [CG Vyapam Teacher / AMO]',
      options: [
        '364',
        '243',
        '729',
        '363'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Teacher',
      explanation: 'यहाँ $a = 1, r = 3, n = 6$\nचूँकि $r > 1$:\n$$S_6 = \\frac{a(r^6 - 1)}{r - 1} = \\frac{1(3^6 - 1)}{3 - 1} = \\frac{729 - 1}{2} = \\frac{728}{2} = 364$$'
    },
    {
      id: 'pyq6',
      question: 'यदि $x, 2x + 2, 3x + 3$ गुणोत्तर श्रेणी (GP) में हों, तो इस श्रेणी का चौथा पद क्या होगा? [CG Vyapam Food Inspector]',
      options: [
        '-13.5',
        '-27',
        '27',
        '13.5'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Food Inspector',
      explanation: 'GP की शर्त से: $(2x + 2)^2 = x(3x + 3)$\n$$4x^2 + 8x + 4 = 3x^2 + 3x$$\n$$x^2 + 5x + 4 = 0 \\implies (x + 4)(x + 1) = 0$$\nयदि $x = -1$ लें तो पद 0 हो जाएंगे, अतः $x = -4$।\nश्रेणी के पद:\n- $T_1 = -4$\n- $T_2 = 2(-4) + 2 = -6$\n- $T_3 = 3(-4) + 3 = -9$\nसार्व अनुपात $r = \\frac{-6}{-4} = 1.5$\nअतः चौथा पद $T_4 = T_3 \\times r = -9 \\times 1.5 = -13.5$'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'यदि किसी गुणोत्तर श्रेणी का तीसरा पद 24 तथा 6वां पद 192 है, तो उसका 10वां पद क्या होगा?',
      options: [
        '3072',
        '1536',
        '6144',
        '768'
      ],
      correctOption: 0,
      explanation: '$T_3 = ar^2 = 24$ तथा $T_6 = ar^5 = 192$\nभाग देने पर: $\\frac{ar^5}{ar^2} = \\frac{192}{24} \\implies r^3 = 8 \\implies r = 2$\n$a(2^2) = 24 \\implies 4a = 24 \\implies a = 6$\nदसवां पद $T_{10} = ar^9 = 6 \\times 2^9 = 6 \\times 512 = 3072$'
    },
    {
      id: 'mcq2',
      question: 'श्रेणी $64, 32, 16, 8, \\dots$ के अनंत पदों का योग क्या होगा?',
      options: [
        '128',
        '120',
        '256',
        '96'
      ],
      correctOption: 0,
      explanation: '$a = 64, r = \\frac{32}{64} = \\frac{1}{2}$\n$$S_\\infty = \\frac{a}{1 - r} = \\frac{64}{1 - 1/2} = \\frac{64}{1/2} = 128$$'
    },
    {
      id: 'mcq3',
      question: 'संख्याओं 4 और 16 का गुणोत्तर माध्य क्या होगा?',
      options: [
        '8',
        '10',
        '6',
        '12'
      ],
      correctOption: 0,
      explanation: '$$GM = \\sqrt{4 \\times 16} = \\sqrt{64} = 8$$'
    },
    {
      id: 'mcq4',
      question: 'यदि किसी GP के तीन पदों का गुणनफल 216 है, तो मध्य पद क्या होगा?',
      options: [
        '6',
        '8',
        '4',
        '12'
      ],
      correctOption: 0,
      explanation: 'मानक 3 पद: $\\frac{a}{r}, a, ar$\nगुणनफल $= \\frac{a}{r} \\times a \\times ar = a^3 = 216 \\implies a = 6$\nअतः मध्य पद स्वयं $a = 6$ है।'
    },
    {
      id: 'mcq5',
      question: 'किन्हीं दो असमान धनात्मक वास्तविक संख्याओं $a$ और $b$ के लिए कौन सा संबंध सदैव सत्य है?',
      options: [
        '$AM > GM > HM$',
        '$AM < GM < HM$',
        '$AM = GM = HM$',
        '$GM > AM > HM$'
      ],
      correctOption: 0,
      explanation: 'असमान धनात्मक संख्याओं के लिए कठोर असमानता $AM > GM > HM$ लागू होती है। समता केवल तभी होती है जब दोनों संख्याएं समान ($a = b$) हों।'
    },
    {
      id: 'mcq6',
      question: 'एक गेंद को 120 मीटर की ऊँचाई से गिराया जाता है। प्रत्येक उछाल में वह पिछली ऊँचाई का $\\frac{4}{5}$ भाग उछलती है। विराम में आने तक तय की गई कुल दूरी क्या होगी?',
      options: [
        '1080 मी',
        '1200 मी',
        '960 मी',
        '840 मी'
      ],
      correctOption: 0,
      explanation: 'शॉर्टकट सूत्र: कुल दूरी $= H \\times \\left(\\frac{1 + e}{1 - e}\\right)$\nयहाँ $H = 120, e = \\frac{4}{5}$\n$$\\text{दूरी} = 120 \\times \\left(\\frac{1 + 4/5}{1 - 4/5}\\right) = 120 \\times \\left(\\frac{9/5}{1/5}\\right) = 120 \\times 9 = 1080 \\text{ मीटर}$$'
    },
    {
      id: 'mcq7',
      question: 'यदि किसी गुणोत्तर श्रेणी का प्रथम पद 1 तथा अनंत पदों का योग 4 हो, तो सार्व अनुपात $r$ का मान क्या होगा?',
      options: [
        '$\\frac{3}{4}$',
        '$\\frac{1}{4}$',
        '$\\frac{1}{2}$',
        '$\\frac{2}{3}$'
      ],
      correctOption: 0,
      explanation: '$$S_\\infty = \\frac{a}{1 - r} \\implies 4 = \\frac{1}{1 - r} \\implies 1 - r = \\frac{1}{4} \\implies r = 1 - \\frac{1}{4} = \\frac{3}{4}$$'
    },
    {
      id: 'mcq8',
      question: 'यदि दो संख्याओं का $AM = 25$ और $GM = 20$ हो, तो उनका हरात्मक माध्य ($HM$) क्या होगा?',
      options: [
        '16',
        '15',
        '18',
        '12'
      ],
      correctOption: 0,
      explanation: 'सूत्र: $GM^2 = AM \\times HM$\n$$20^2 = 25 \\times HM \\implies 400 = 25 \\times HM \\implies HM = \\frac{400}{25} = 16$$'
    }
  ],
  keyTerminology: [
    {
      term: 'Geometric Progression (GP)',
      termHi: 'गुणोत्तर श्रेणी',
      definition: 'A sequence of numbers where each term after the first is found by multiplying the previous one by a fixed, non-zero number called the common ratio.',
      definitionHi: 'संख्याओं का ऐसा अनुक्रम जिसमें प्रत्येक पद अपने पूर्ववर्ती पद को एक निश्चित अशून्य संख्या (सार्व अनुपात) से गुणा करके प्राप्त होता है।'
    },
    {
      term: 'Common Ratio ($r$)',
      termHi: 'सार्व अनुपात',
      definition: 'The constant factor by which each term is multiplied to produce the succeeding term ($r = \\frac{T_n}{T_{n-1}}$).',
      definitionHi: 'वह निश्चित अचर गुणक जिसे प्रत्येक पद में गुणा करने पर अगला पद प्राप्त होता है।'
    },
    {
      term: 'Geometric Mean (GM)',
      termHi: 'गुणोत्तर माध्य',
      definition: 'The central value of a set of numbers calculated as the nth root of their product; for two numbers, $GM = \\sqrt{ab}$.',
      definitionHi: 'दो या दो से अधिक संख्याओं के गुणनफल का मूल; दो संख्याओं के लिए $\\sqrt{ab}$।'
    },
    {
      term: 'Infinite GP',
      termHi: 'अनंत गुणोत्तर श्रेणी',
      definition: 'A geometric progression extending infinitely, converging to a finite sum $\\frac{a}{1-r}$ only when $|r| < 1$.',
      definitionHi: 'अनंत पदों वाली गुणोत्तर श्रेणी, जिसका योग केवल $|r| < 1$ होने पर परिमित मान $\\frac{a}{1-r}$ देता है।'
    },
    {
      term: 'Harmonic Mean (HM)',
      termHi: 'हरात्मक माध्य',
      definition: 'The reciprocal of the arithmetic mean of the reciprocals of numbers; for two numbers, $HM = \\frac{2ab}{a+b}$.',
      definitionHi: 'संख्याओं के व्युत्क्रमों के समांतर माध्य का व्युत्क्रम ($HM = \\frac{2ab}{a+b}$)।'
    },
    {
      term: 'AM-GM Inequality',
      termHi: 'समांतर-गुणोत्तर माध्य असमिका',
      definition: 'The fundamental theorem stating that the arithmetic mean of positive real numbers is always greater than or equal to their geometric mean ($AM \\ge GM$).',
      definitionHi: 'धनात्मक वास्तविक संख्याओं का समांतर माध्य उनके गुणोत्तर माध्य से सदैव बड़ा या बराबर होता है।'
    },
    {
      term: 'Recurring Decimal',
      termHi: 'आवर्त दशमलव',
      definition: 'A decimal fraction in which a digit or group of digits repeats endlessly, resolvable into fractions via infinite GP.',
      definitionHi: 'दशमलव संख्या जिसमें अंकों की अनवरत पुनरावृत्ति होती है, जिसे अनंत GP द्वारा भिन्न में बदला जाता है।'
    },
    {
      term: 'Bouncing Ball Model',
      termHi: 'उछलती गेंद मॉडल',
      definition: 'A physical application of infinite GP measuring total distance traversed by an elastically bouncing object.',
      definitionHi: 'टप्पा खाकर उछलने वाली गेंद द्वारा तय कुल दूरी ज्ञात करने हेतु प्रयुक्त अनंत GP का भौतिक-गणित मॉडल।'
    }
  ],
  sources: [
    {
      title: 'NCERT Class 11 Mathematics - Chapter 9: Sequences and Series',
      author: 'NCERT',
      description: 'गुणोत्तर श्रेणी, अनंत पदों का योग, गुणोत्तर माध्य एवं AM-GM असमिका का आधिकारिक पाठ्यपुस्तक संदर्भ।'
    },
    {
      title: 'Higher Algebra',
      author: 'Hall & Knight',
      description: 'गुणोत्तर एवं हरात्मक श्रेणियों के शास्त्रीय सिद्धांतों और प्रमेयों का मानक संग्रह।'
    },
    {
      title: 'Quantitative Aptitude for Competitive Examinations',
      author: 'R.S. Aggarwal',
      description: 'प्रतियोगी परीक्षाओं में पूछे जाने वाले GP के शॉर्टकट विधियों और मॉडल प्रश्नों का संकलन।'
    },
    {
      title: 'CG Vyapam Previous Year Solved Papers (2014-2024)',
      author: 'CGPEB',
      description: 'छत्तीसगढ़ व्यापम की विभिन्न परीक्षाओं में पूछे गए वास्तविक प्रश्नों का व्याख्यात्मक संकलन।'
    }
  ],
  confusionBuster: [
    {
      misconception: 'अनंत पदों का योग किसी भी गुणोत्तर श्रेणी में निकाला जा सकता है।',
      clarification: 'अनंत पदों का योग केवल और केवल तभी निकाला जा सकता है जब सार्व अनुपात का संख्यात्मक मान 1 से कम हो (अर्थात $-1 < r < 1$)। यदि $r \\ge 1$ हो, तो योग अनंत हो जाता है।'
    },
    {
      misconception: 'सार्व अनुपात $r$ हमेशा एक पूर्णांक ही होता है।',
      clarification: 'सार्व अनुपात भिन्न, दशमलव या ऋणात्मक कुछ भी हो सकता है। जैसे $81, 27, 9, 3$ में $r = \\frac{1}{3}$ है तथा $4, -8, 16, -32$ में $r = -2$ है।'
    },
    {
      misconception: '$AM = GM$ हमेशा होता है।',
      clarification: '$AM = GM$ केवल तभी सत्य होता है जब दोनों संख्याएं आपस में बराबर हों ($a = b$)। यदि संख्याएं असमान हैं, तो सदैव $AM > GM$ होता है।'
    },
    {
      misconception: 'उछलती गेंद वाले प्रश्न में कुल दूरी केवल नीचे गिरने और ऊपर उठने की ऊँचाइयों का सीधा जोड़ है।',
      clarification: 'गेंद पहली बार केवल $H$ नीचे गिरती है, किंतु उसके बाद प्रत्येक उछाल में वह पहले ऊपर जाती है और फिर नीचे आती है (अर्थात प्रत्येक बाद वाली ऊँचाई 2 बार गिनी जाती है)।'
    },
    {
      misconception: 'यदि $b^2 = ac$ हो, तो $a, b, c$ समांतर श्रेणी में होते हैं।',
      clarification: '$b^2 = ac$ गुणोत्तर श्रेणी (GP) की शर्त है! समांतर श्रेणी की शर्त $2b = a + c$ होती है।'
    }
  ],
  faqList: [
    {
      question: 'कोई श्रेणी समांतर श्रेणी है या गुणोत्तर श्रेणी, यह कैसे पहचानें?',
      answer: 'यदि पदों का अंतर ($T_2 - T_1 = T_3 - T_2$) समान हो तो वह समांतर श्रेणी (AP) है। यदि पदों का अनुपात ($\\frac{T_2}{T_1} = \\frac{T_3}{T_2}$) समान हो तो वह गुणोत्तर श्रेणी (GP) है।'
    },
    {
      question: 'आवर्त दशमलव को अनंत GP से कैसे बदला जाता है?',
      answer: 'दशमलव प्रसार को विस्तारित रूप में लिखें जैसे $0.777\\dots = \\frac{7}{10} + \\frac{7}{100} + \\dots$। यहाँ प्रथम पद $a = 0.7$ और $r = 0.1$ लेकर सूत्र $S_\\infty = \\frac{a}{1 - r}$ लगा दें।'
    },
    {
      question: '$AM, GM$ और $HM$ में क्या संबंध होता है?',
      answer: 'दो धनात्मक संख्याओं के लिए सदैव $AM \\ge GM \\ge HM$ होता है तथा उनके मध्य $GM^2 = AM \\cdot HM$ का संबंध होता है।'
    },
    {
      question: 'गुणोत्तर श्रेणी के तीन पदों को मानने का सबसे सरल तरीका क्या है?',
      answer: 'यदि पदों का गुणनफल दिया हो, तो पदों को $\\frac{a}{r}, a, ar$ मानना चाहिए ताकि गुणा करने पर $r$ कट जाए और $a^3 = \\text{गुणनफल}$ से सीधे मध्य पद मिल जाए।'
    },
    {
      question: 'CG Vyapam में GP से किस प्रकार के प्रश्न पूछे जाते हैं?',
      answer: 'व्यापम में मुख्यतः (1) $n$वां पद निकालना, (2) अनंत पदों का योग ($S_\\infty$), (3) आवर्त दशमलव को भिन्न में बदलना, तथा (4) $AM$ और $GM$ देकर संख्याएं ज्ञात करने के प्रश्न पूछे जाते हैं।'
    }
  ],
  oneLinerRevision: [
    'गुणोत्तर श्रेणी का व्यापक रूप: $a, ar, ar^2, ar^3, \\dots, ar^{n-1}$ होता है।',
    'सार्व अनुपात: $r = \\frac{T_n}{T_{n-1}}$ ($r \\neq 0$)।',
    '$n$वां पद: $T_n = a \\cdot r^{n-1}$।',
    'अंत से $n$वां पद: $\\frac{l}{r^{n-1}}$ (जहाँ $l$ अंतिम पद है)।',
    'अनंत पदों का योग: $S_\\infty = \\frac{a}{1 - r}$ (केवल जब $|r| < 1$ हो)।',
    'दो संख्याओं का गुणोत्तर माध्य: $GM = \\sqrt{ab}$।',
    'माध्यों के बीच संबंध: $AM \\ge GM \\ge HM$ तथा $GM^2 = AM \\cdot HM$।',
    'यदि $a, b, c$ GP में हों, तो $b^2 = ac$ होता है।',
    'उछलती गेंद की कुल दूरी: $H \\cdot \\left(\\frac{1 + e}{1 - e}\\right)$।',
    'आवर्त दशमलव $0.\\bar{a} = \\frac{a}{9}$, $0.\\overline{ab} = \\frac{ab}{99}$ अनंत GP का ही परिणाम है।'
  ],
  rapidRevision: {
    points: [
      '$n$वां पद: $T_n = a \\cdot r^{n-1}$।',
      'योगफल: $S_n = \\frac{a(r^n - 1)}{r - 1}$ ($r > 1$) तथा $S_n = \\frac{a(1 - r^n)}{1 - r}$ ($r < 1$)।',
      'अनंत GP योग: $S_\\infty = \\frac{a}{1 - r}$ (शर्त: $|r| < 1$)।',
      'गुणोत्तर माध्य: $GM = \\sqrt{ab}$।',
      'माध्य संबंध: $AM \\ge GM \\ge HM$ एवं $GM^2 = AM \\times HM$।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_10 (Geometric Progression)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_10').set(sanitized);
  console.log('✅ cgv_master_adv_math_10 saved to Firestore topic_study_notes!');

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
              if (t.id === 'adv_math_10') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_10 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 adv_math_10 is synced!');
}

upload().catch(console.error);
