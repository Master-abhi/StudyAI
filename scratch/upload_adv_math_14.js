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
  topicId: 'adv_math_14',
  topicName: 'Section Formula',
  topicNameHi: 'विभाजन सूत्र',
  chapterId: 'cgv_master_sub_3_ch_15',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'विभाजन सूत्र (Section Formula) निर्देशांक ज्यामिति का वह महत्वपूर्ण सूत्र है जो दो दिए गए बिंदुओं $A(x_1, y_1)$ और $B(x_2, y_2)$ को मिलाने वाले रेखाखंड को किसी दिए गए अनुपात $m_1 : m_2$ (या $m : n$) में अंतः (Internally) अथवा बाह्य (Externally) रूप से विभाजित करने वाले बिंदु $P(x, y)$ के निर्देशांक ज्ञात करता है।',
    importance: 'CG Vyapam (पटवारी, आरआई, एसआई, छात्रावास अधीक्षक, शिक्षक पात्रता परीक्षा) और CGPSC में रेखाखंड के मध्य बिंदु, समत्रिभाजन बिंदु (Points of Trisection), त्रिभुज के केंद्रक (Centroid), समांतर चतुर्भुज के अज्ञात चौथे शीर्ष, तथा निर्देशांक अक्षों द्वारा विभाजन अनुपात ज्ञात करने पर आधारित प्रश्न बार-बार पूछे जाते हैं।',
    examRelevance: 'परीक्षाओं में $X$-अक्ष या $Y$-अक्ष द्वारा रेखाखंड को विभाजित करने का अनुपात ($k : 1$ विधि या डायरेक्ट शॉर्टकट $-\\frac{y_1}{y_2}$), मध्य बिंदु सूत्र का प्रयोग कर समांतर चतुर्भुज के चौथे शीर्ष की त्वरित गणना, तथा केंद्रक $G$ के निर्देशांक निकालने वाले प्रश्न सर्वाधिक लोकप्रिय हैं।',
    quickFacts: [
      'अंतः विभाजन सूत्र: $P(x, y) = \\left(\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}\\right)$।',
      'बाह्य विभाजन सूत्र: $P(x, y) = \\left(\\frac{m_1 x_2 - m_2 x_1}{m_1 - m_2}, \\frac{m_1 y_2 - m_2 y_1}{m_1 - m_2}\\right)$।',
      'मध्य बिंदु (Midpoint) सूत्र: $M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$ ($1 : 1$ अनुपात)।',
      'त्रिभुज का केंद्रक (Centroid): $G = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right)$।',
      'अक्षों द्वारा विभाजन अनुपात शॉर्टकट: $X$-अक्ष द्वारा अनुपात $= -\\frac{y_1}{y_2}$ तथा $Y$-अक्ष द्वारा अनुपात $= -\\frac{x_1}{x_2}$।',
      'समांतर चतुर्भुज का चौथा शीर्ष: $x_4 = x_1 + x_3 - x_2$ तथा $y_4 = y_1 + y_3 - y_2$।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'अंतः विभाजन सूत्र एवं ज्यामितीय व्युत्पत्ति',
      content: `### 1. अंतः विभाजन की अवधारणा
जब कोई बिंदु $P(x, y)$ दो बिंदुओं $A(x_1, y_1)$ और $B(x_2, y_2)$ के **बीच में (अंदर)** स्थित होकर रेखाखंड $AB$ को $m_1 : m_2$ के अनुपात में विभाजित करता है:
$$\\frac{AP}{PB} = \\frac{m_1}{m_2}$$

### 2. अंतः विभाजन का गणितीय सूत्र
समरूप त्रिभुजों (Similar Triangles) के गुणधर्मों से व्युत्पन्न सूत्र:
$$x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}$$
$$y = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}$$

अतः बिंदु $P$ के निर्देशांक:
$$P(x, y) = \\left(\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}\\right)$$

**याद रखने की ट्रिक (क्रॉस गुणन):**
$m_1$ का गुणा दूसरे बिंदु के निर्देशांकों $(x_2, y_2)$ से होता है, तथा $m_2$ का गुणा पहले बिंदु के निर्देशांकों $(x_1, y_1)$ से होता है।`
    },
    {
      id: 'ch2',
      title: 'बाह्य विभाजन सूत्र एवं तुलना',
      content: `### 1. बाह्य विभाजन की अवधारणा
जब बिंदु $P(x, y)$ रेखाखंड $AB$ के बाहर (बढ़ाई गई रेखा पर) स्थित हो और दूरियों का अनुपात:
$$\\frac{AP}{BP} = \\frac{m_1}{m_2}$$
हो, तो इसे बाह्य विभाजन (External Division) कहते हैं।
- यदि $m_1 > m_2$ हो, तो $P$ बिंदु $B$ की ओर बाहर होगा।
- यदि $m_1 < m_2$ हो, तो $P$ बिंदु $A$ की ओर बाहर होगा।

### 2. बाह्य विभाजन सूत्र
बाह्य विभाजन में अंतः विभाजन सूत्र के धन चिन्ह ($+$) के स्थान पर ऋण चिन्ह ($-$) आ जाता है:
$$x = \\frac{m_1 x_2 - m_2 x_1}{m_1 - m_2}$$
$$y = \\frac{m_1 y_2 - m_2 y_1}{m_1 - m_2}$$

अतः:
$$P(x, y) = \\left(\\frac{m_1 x_2 - m_2 x_1}{m_1 - m_2}, \\frac{m_1 y_2 - m_2 y_1}{m_1 - m_2}\\right)$$`
    },
    {
      id: 'ch3',
      title: 'मध्य बिंदु एवं समत्रिभाजन बिंदु (Points of Trisection)',
      content: `### 1. मध्य बिंदु सूत्र (Midpoint Formula)
यदि बिंदु $M$, रेखाखंड $AB$ का ठीक मध्य बिंदु हो, तो अनुपात $m_1 : m_2 = 1 : 1$ हो जाता है:
$$M(x, y) = \\left(\\frac{1 \\cdot x_2 + 1 \\cdot x_1}{1 + 1}, \\frac{1 \\cdot y_2 + 1 \\cdot y_1}{1 + 1}\\right) = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$$
अर्थात: **मध्य बिंदु के निर्देशांक दोनों सिरों के निर्देशांकों का सीधा औसत होते हैं।**

### 2. समत्रिभाजन बिंदु (Points of Trisection)
वे दो बिंदु जो किसी रेखाखंड को तीन बराबर भागों में बांटते हैं:
- प्रथम बिंदु $P$, रेखाखंड $AB$ को **$1 : 2$** के अनुपात में अंतः विभाजित करता है।
- द्वितीय बिंदु $Q$, रेखाखंड $AB$ को **$2 : 1$** के अनुपात में अंतः विभाजित करता है (या $Q$, बिंदु $P$ और $B$ का मध्य बिंदु होता है)।

### 3. अज्ञात अनुपात ज्ञात करने की $k : 1$ विधि
जब प्रश्न में अनुपात पूछा जाए, तो दो अज्ञात चर $m_1 : m_2$ मानने के बजाय सदैव **$k : 1$** अनुपात मानना चाहिए:
$$x = \\frac{k x_2 + x_1}{k + 1}, \\quad y = \\frac{k y_2 + y_1}{k + 1}$$
- यदि $k$ का मान धनात्मक आए $\\implies$ अंतः विभाजन।
- यदि $k$ का मान ऋणात्मक आए $\\implies$ बाह्य विभाजन।`
    },
    {
      id: 'ch4',
      title: 'त्रिभुज का केंद्रक एवं महत्वपूर्ण ज्यामितीय केंद्र',
      content: `### 1. त्रिभुज का केंद्रक (Centroid - $G$)
त्रिभुज की तीनों माध्यिकाओं (Medians) के प्रतिच्छेद बिंदु को केंद्रक कहते हैं।
- केंद्रक प्रत्येक माध्यिका को शीर्ष से आधार की ओर **$2 : 1$** के अनुपात में अंतः विभाजित करता है।
- यदि त्रिभुज के तीन शीर्ष $A(x_1, y_1), B(x_2, y_2), C(x_3, y_3)$ हों, तो केंद्रक के निर्देशांक:
$$G(x, y) = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right)$$

### 2. समांतर चतुर्भुज के चौथे शीर्ष की शॉर्टकट ट्रिक
हम जानते हैं कि समांतर चतुर्भुज, आयत, समचतुर्भुज और वर्ग के विकर्ण परस्पर एक-दूसरे को समद्विभाजित करते हैं (अर्थात दोनों विकर्णों का मध्य बिंदु एक ही होता है)।
यदि तीन क्रमिक शीर्ष $A(x_1, y_1), B(x_2, y_2), C(x_3, y_3)$ ज्ञात हों और चौथा शीर्ष $D(x_4, y_4)$ निकालना हो:
$$\\text{मध्य बिंदु } AC = \\text{मध्य बिंदु } BD$$
$$\\left(\\frac{x_1 + x_3}{2}, \\frac{y_1 + y_3}{2}\\right) = \\left(\\frac{x_2 + x_4}{2}, \\frac{y_2 + y_4}{2}\\right)$$
सीधा शॉर्टकट:
$$x_4 = x_1 + x_3 - x_2$$
$$y_4 = y_1 + y_3 - y_2$$`
    },
    {
      id: 'ch5',
      title: 'अक्षों द्वारा विभाजन अनुपात एवं सुपरफास्ट ट्रिक्स',
      content: `### 1. $X$-अक्ष द्वारा विभाजन अनुपात (Direct Shortcut)
चूँकि $X$-अक्ष पर प्रत्येक बिंदु की कोटि $y = 0$ होती है:
$$0 = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2} \\implies m_1 y_2 + m_2 y_1 = 0 \\implies \\frac{m_1}{m_2} = -\\frac{y_1}{y_2}$$
$$\\text{अनुपात } m_1 : m_2 = -y_1 : y_2$$
- यदि अनुपात धनात्मक आए $\\implies$ अंतः विभाजन।
- यदि अनुपात ऋणात्मक आए $\\implies$ बाह्य विभाजन।

### 2. $Y$-अक्ष द्वारा विभाजन अनुपात (Direct Shortcut)
चूँकि $Y$-अक्ष पर प्रत्येक बिंदु का भुज $x = 0$ होता है:
$$\\text{अनुपात } m_1 : m_2 = -\\frac{x_1}{x_2} = -x_1 : x_2$$

**उदाहरण:** बिंदुओं $(2, -3)$ और $(5, 6)$ को मिलाने वाली रेखा को $X$-अक्ष किस अनुपात में बांटता है?
- $y_1 = -3, y_2 = 6$
- अनुपात $= -\\frac{y_1}{y_2} = -\\frac{-3}{6} = \\frac{3}{6} = \\frac{1}{2}$
- उत्तर: **$1 : 2$ अंतः विभाजन** (मात्र 2 सेकंड में!)`
    }
  ],
  comparativeTables: [
    {
      title: 'अंतः विभाजन बनाम बाह्य विभाजन',
      headers: ['मापदंड', 'अंतः विभाजन (Internal Division)', 'बाह्य विभाजन (External Division)'],
      rows: [
        ['विभाजन बिंदु की स्थिति', 'बिंदुओं $A$ और $B$ के बीच में (अंदर)', 'बिंदुओं $A$ और $B$ के बाहर (बढ़ाई गई रेखा पर)'],
        ['सूत्र का चिन्ह', 'अंश और हर दोनों में धनात्मक ($+$)', 'अंश और हर दोनों में ऋणात्मक ($-$)'],
        ['$x$-निर्देशांक सूत्र', '$\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}$', '$\\frac{m_1 x_2 - m_2 x_1}{m_1 - m_2}$'],
        ['$y$-निर्देशांक सूत्र', '$\\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}$', '$\\frac{m_1 y_2 - m_2 y_1}{m_1 - m_2}$'],
        ['$k$ का चिन्ह ($k:1$ में)', '$k > 0$ (धनात्मक मान)', '$k < 0$ (ऋणात्मक मान)']
      ]
    },
    {
      title: 'मध्य बिंदु बनाम समत्रिभाजन बिंदु बनाम केंद्रक',
      headers: ['बिंदु का प्रकार', 'लागू अनुपात', 'प्रतीक एवं सूत्र', 'ज्यामितीय संदर्भ'],
      rows: [
        ['मध्य बिंदु (Midpoint)', '$1 : 1$', '$\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$', 'रेखाखंड को 2 समान भागों में बांटना'],
        ['प्रथम समत्रिभाजन बिंदु', '$1 : 2$', '$\\left(\\frac{x_2 + 2x_1}{3}, \\frac{y_2 + 2y_1}{3}\\right)$', 'रेखाखंड के प्रथम एक-तिहाई भाग पर'],
        ['द्वितीय समत्रिभाजन बिंदु', '$2 : 1$', '$\\left(\\frac{2x_2 + x_1}{3}, \\frac{2y_2 + y_1}{3}\\right)$', 'रेखाखंड के दो-तिहाई भाग पर'],
        ['केंद्रक (Centroid)', '$2 : 1$ (माध्यिका पर)', '$\\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right)$', 'त्रिभुज की तीनों माध्यिकाओं का संगम']
      ]
    },
    {
      title: 'निर्देशांक अक्षों द्वारा रेखाखंड के विभाजन का विश्लेषण',
      headers: ['विभाजक अक्ष', 'अक्ष पर स्थिर निर्देशांक', 'विभाजन अनुपात का शॉर्टकट', 'प्रतिच्छेद बिंदु का रूप'],
      rows: [
        ['$X$-अक्ष', '$y = 0$ (कोटि शून्य)', '$-\\frac{y_1}{y_2}$', '$(x, 0)$ जहाँ $x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}$'],
        ['$Y$-अक्ष', '$x = 0$ (भुज शून्य)', '$-\\frac{x_1}{x_2}$', '$(0, y)$ जहाँ $y = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}$'],
        ['रेखा $y = x$', '$y = x$', '$-\\frac{y_1 - x_1}{y_2 - x_2}$', '$(c, c)$'],
        ['रेखा $ax + by + c = 0$', '-', '$-\\frac{ax_1 + by_1 + c}{ax_2 + by_2 + c}$', '$(x_0, y_0)$']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'उस बिंदु के निर्देशांक क्या होंगे जो बिंदुओं $(1, 3)$ और $(4, 6)$ को मिलाने वाले रेखाखंड को $2 : 1$ के अनुपात में अंतः विभाजित करता है? [CG Vyapam Patwari / RI]',
      options: [
        '$(3, 5)$',
        '$(2, 4)$',
        '$(5, 3)$',
        '$(2.5, 4.5)$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Patwari',
      explanation: 'अंतः विभाजन सूत्र से:\n$$x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2} = \\frac{2(4) + 1(1)}{2 + 1} = \\frac{8 + 1}{3} = \\frac{9}{3} = 3$$\n$$y = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2} = \\frac{2(6) + 1(3)}{2 + 1} = \\frac{12 + 3}{3} = \\frac{15}{3} = 5$$\nअतः अभीष्ट बिंदु के निर्देशांक $(3, 5)$ हैं।'
    },
    {
      id: 'pyq2',
      question: 'बिंदुओं $A(1, -5)$ और $B(-4, 5)$ को मिलाने वाले रेखाखंड को $X$-अक्ष किस अनुपात में विभाजित करता है? [CG Vyapam SI Mains]',
      options: [
        '$1 : 1$',
        '$2 : 3$',
        '$1 : 2$',
        '$3 : 4$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam SI Mains',
      explanation: 'शॉर्टकट विधि:\n$X$-अक्ष द्वारा विभाजन अनुपात $= -\\frac{y_1}{y_2}$\nयहाँ $y_1 = -5, y_2 = 5$\n$$\\text{अनुपात} = -\\left(\\frac{-5}{5}\\right) = -(-1) = 1 = 1 : 1$$\nअतः $X$-अक्ष रेखाखंड को $1 : 1$ के अनुपात में (अर्थात ठीक मध्य में) अंतः विभाजित करता है।'
    },
    {
      id: 'pyq3',
      question: 'एक त्रिभुज के शीर्ष $(2, 7), (3, -1)$ और $(-5, 6)$ हैं। इस त्रिभुज के केंद्रक (Centroid) के निर्देशांक क्या होंगे? [CGPSC SSE / Vyapam Combined]',
      options: [
        '$(0, 4)$',
        '$(1, 3)$',
        '$(0, 3)$',
        '$(-1, 4)$'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'केंद्रक सूत्र से:\n$$x = \\frac{x_1 + x_2 + x_3}{3} = \\frac{2 + 3 + (-5)}{3} = \\frac{0}{3} = 0$$\n$$y = \\frac{y_1 + y_2 + y_3}{3} = \\frac{7 + (-1) + 6}{3} = \\frac{12}{3} = 4$$\nअतः केंद्रक के निर्देशांक $(0, 4)$ हैं।'
    },
    {
      id: 'pyq4',
      question: 'यदि बिंदु $P(-1, 1)$ बिंदुओं $A(-3, b)$ और $B(1, b+4)$ को मिलाने वाले रेखाखंड का मध्य बिंदु है, तो $b$ का मान क्या होगा? [CG Vyapam Hostel Superintendent]',
      options: [
        '-1',
        '1',
        '2',
        '0'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'मध्य बिंदु की कोटि का सूत्र:\n$$y = \\frac{y_1 + y_2}{2}$$\nयहाँ $y = 1, y_1 = b, y_2 = b + 4$:\n$$1 = \\frac{b + (b + 4)}{2} \\implies 2 = 2b + 4 \\implies 2b = -2 \\implies b = -1$$'
    },
    {
      id: 'pyq5',
      question: 'यदि एक समांतर चतुर्भुज के तीन क्रमिक शीर्ष $A(1, 2), B(4, 3)$ और $C(6, 6)$ हों, तो चौथे शीर्ष $D$ के निर्देशांक क्या होंगे? [CG Vyapam Teacher / AMO]',
      options: [
        '$(3, 5)$',
        '$(3, 4)$',
        '$(2, 5)$',
        '$(4, 5)$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Teacher',
      explanation: 'समांतर चतुर्भुज के चौथे शीर्ष का शॉर्टकट सूत्र:\n$$x_4 = x_1 + x_3 - x_2 = 1 + 6 - 4 = 3$$\n$$y_4 = y_1 + y_3 - y_2 = 2 + 6 - 3 = 5$$\nअतः चौथे शीर्ष $D$ के निर्देशांक $(3, 5)$ हैं।'
    },
    {
      id: 'pyq6',
      question: 'बिंदुओं $(5, -6)$ और $(-1, -4)$ को मिलाने वाले रेखाखंड को $Y$-अक्ष किस अनुपात में विभाजित करता है? [CG Vyapam Assistant Grade 3 / DEO]',
      options: [
        '$5 : 1$',
        '$1 : 5$',
        '$2 : 3$',
        '$3 : 2$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Assistant Grade 3',
      explanation: '$Y$-अक्ष द्वारा विभाजन का शॉर्टकट सूत्र:\n$$\\text{अनुपात} = -\\frac{x_1}{x_2}$$\nयहाँ $x_1 = 5, x_2 = -1$\n$$\\text{अनुपात} = -\\left(\\frac{5}{-1}\\right) = 5 = 5 : 1$$\nअतः $Y$-अक्ष रेखाखंड को $5 : 1$ के अनुपात में अंतः विभाजित करता है।'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'बिंदुओं $(-1, 7)$ और $(4, -3)$ को मिलाने वाले रेखाखंड को $2 : 3$ के अनुपात में अंतः विभाजित करने वाले बिंदु के निर्देशांक होंगे:',
      options: [
        '$(1, 3)$',
        '$(2, 3)$',
        '$(1, 4)$',
        '$(3, 1)$'
      ],
      correctOption: 0,
      explanation: '$$x = \\frac{2(4) + 3(-1)}{2 + 3} = \\frac{8 - 3}{5} = \\frac{5}{5} = 1$$\n$$y = \\frac{2(-3) + 3(7)}{2 + 3} = \\frac{-6 + 21}{5} = \\frac{15}{5} = 3$$\nअतः बिंदु $(1, 3)$ है।'
    },
    {
      id: 'mcq2',
      question: 'बिंदुओं $A(2, 3)$ और $B(6, 7)$ को जोड़ने वाले रेखाखंड का मध्य बिंदु क्या होगा?',
      options: [
        '$(4, 5)$',
        '$(3, 5)$',
        '$(4, 6)$',
        '$(5, 4)$'
      ],
      correctOption: 0,
      explanation: '$$M = \\left(\\frac{2 + 6}{2}, \\frac{3 + 7}{2}\\right) = \\left(\\frac{8}{2}, \\frac{10}{2}\\right) = (4, 5)$$'
    },
    {
      id: 'mcq3',
      question: 'बिंदुओं $(2, -2)$ और $(-7, 4)$ को मिलाने वाले रेखाखंड के समत्रिभाजन बिंदुओं में से जो बिंदु $(2, -2)$ के निकट है, उसके निर्देशांक क्या होंगे?',
      options: [
        '$(-1, 0)$',
        '$(-4, 2)$',
        '$(0, -1)$',
        '$(1, 1)$'
      ],
      correctOption: 0,
      explanation: 'निकटतम बिंदु रेखाखंड को $1 : 2$ के अनुपात में विभाजित करता है:\n$$x = \\frac{1(-7) + 2(2)}{1 + 2} = \\frac{-7 + 4}{3} = \\frac{-3}{3} = -1$$\n$$y = \\frac{1(4) + 2(-2)}{1 + 2} = \\frac{4 - 4}{3} = 0$$\nअतः बिंदु $(-1, 0)$ है।'
    },
    {
      id: 'mcq4',
      question: 'त्रिभुज का केंद्रक उसकी प्रत्येक माध्यिका को किस अनुपात में विभाजित करता है?',
      options: [
        '$2 : 1$ (शीर्ष से आधार की ओर)',
        '$1 : 2$ (शीर्ष से आधार की ओर)',
        '$1 : 1$',
        '$3 : 1$'
      ],
      correctOption: 0,
      explanation: 'त्रिभुज का केंद्रक (Centroid) सदैव प्रत्येक माध्यिका को शीर्ष से आधार की ओर $2 : 1$ के अनुपात में अंतः विभाजित करता है।'
    },
    {
      id: 'mcq5',
      question: 'बिंदुओं $(3, 4)$ और $(5, 6)$ को मिलाने वाले रेखाखंड को $3 : 2$ के अनुपात में बाह्य रूप से विभाजित करने वाले बिंदु के निर्देशांक क्या होंगे?',
      options: [
        '$(9, 10)$',
        '$(7, 8)$',
        '$(11, 12)$',
        '$(8, 9)$'
      ],
      correctOption: 0,
      explanation: 'बाह्य विभाजन सूत्र:\n$$x = \\frac{3(5) - 2(3)}{3 - 2} = \\frac{15 - 6}{1} = 9$$\n$$y = \\frac{3(6) - 2(4)}{3 - 2} = \\frac{18 - 8}{1} = 10$$\nअतः बिंदु $(9, 10)$ है।'
    },
    {
      id: 'mcq6',
      question: 'यदि किसी वृत्त के व्यास का एक सिरा $(4, 3)$ है और केंद्र $(2, 0)$ है, तो व्यास के दूसरे सिरे के निर्देशांक क्या होंगे?',
      options: [
        '$(0, -3)$',
        '$(3, 1.5)$',
        '$(0, 3)$',
        '$(6, 3)$'
      ],
      correctOption: 0,
      explanation: 'वृत्त का केंद्र व्यास का मध्य बिंदु होता है। माना दूसरा सिरा $(x, y)$ है:\n$$\\frac{4 + x}{2} = 2 \\implies 4 + x = 4 \\implies x = 0$$\n$$\\frac{3 + y}{2} = 0 \\implies 3 + y = 0 \\implies y = -3$$\nअतः दूसरा सिरा $(0, -3)$ है।'
    },
    {
      id: 'mcq7',
      question: 'बिंदुओं $(1, 3)$ और $(2, 7)$ को मिलाने वाले रेखाखंड को रेखा $3x + y - 9 = 0$ किस अनुपात में विभाजित करती है?',
      options: [
        '$3 : 4$',
        '$4 : 3$',
        '$2 : 3$',
        '$1 : 2$'
      ],
      correctOption: 0,
      explanation: 'शॉर्टकट सूत्र: रेखा $ax+by+c=0$ द्वारा अनुपात $= -\\frac{ax_1 + by_1 + c}{ax_2 + by_2 + c}$\n$$-\\frac{3(1) + 3 - 9}{3(2) + 7 - 9} = -\\frac{6 - 9}{6 + 7 - 9} = -\\frac{-3}{4} = \\frac{3}{4} = 3 : 4$$'
    },
    {
      id: 'mcq8',
      question: 'यदि बिंदु $(x, y)$ बिंदुओं $(a+b, b-a)$ और $(a-b, a+b)$ का मध्य बिंदु है, तो $x$ और $y$ के मान क्रमशः होंगे:',
      options: [
        '$a$ और $b$',
        '$b$ और $a$',
        '$a+b$ और $a-b$',
        '$2a$ और $2b$'
      ],
      correctOption: 0,
      explanation: '$$x = \\frac{(a+b) + (a-b)}{2} = \\frac{2a}{2} = a$$\n$$y = \\frac{(b-a) + (a+b)}{2} = \\frac{2b}{2} = b$$\nअतः मान $a$ और $b$ हैं।'
    }
  ],
  keyTerminology: [
    {
      term: 'Section Formula',
      termHi: 'विभाजन सूत्र',
      definition: 'A formula used to determine the coordinates of a point dividing a line segment in a given ratio.',
      definitionHi: 'दो बिंदुओं को मिलाने वाले रेखाखंड को किसी दिए गए अनुपात में विभाजित करने वाले बिंदु के निर्देशांक ज्ञात करने का सूत्र।'
    },
    {
      term: 'Internal Division',
      termHi: 'अंतः विभाजन',
      definition: 'When the dividing point lies strictly inside the segment between the two given endpoints ($P \\in AB$).',
      definitionHi: 'जब विभाजन बिंदु दिए गए दोनों सिरों के बीच रेखाखंड के अंदर स्थित होता है।'
    },
    {
      term: 'External Division',
      termHi: 'बाह्य विभाजन',
      definition: 'When the dividing point lies outside the segment on its extended ray ($P \\notin AB$).',
      definitionHi: 'जब विभाजन बिंदु रेखाखंड के बाहर उसकी बढ़ाई गई रेखा पर स्थित होता है।'
    },
    {
      term: 'Midpoint',
      termHi: 'मध्य बिंदु',
      definition: 'The unique center point of a line segment dividing it into two equal halves in a 1:1 ratio.',
      definitionHi: 'रेखाखंड को दो बराबर भागों में $1 : 1$ के अनुपात में बांटने वाला केंद्रीय बिंदु।'
    },
    {
      term: 'Centroid ($G$)',
      termHi: 'केंद्रक',
      definition: 'The point of intersection of the three medians of a triangle, dividing each median in a 2:1 ratio from vertex to base.',
      definitionHi: 'त्रिभुज की तीनों माध्यिकाओं का संगम बिंदु, जो प्रत्येक माध्यिका को $2 : 1$ के अनुपात में बांटता है।'
    },
    {
      term: 'Points of Trisection',
      termHi: 'समत्रिभाजन बिंदु',
      definition: 'The two points that divide a line segment into three equal parts (in ratios 1:2 and 2:1).',
      definitionHi: 'किसी रेखाखंड को तीन बराबर भागों में विभाजित करने वाले दो बिंदु।'
    },
    {
      term: 'Median',
      termHi: 'माध्यिका',
      definition: 'A straight line drawn from a triangle\'s vertex to the midpoint of the opposite side.',
      definitionHi: 'त्रिभुज के किसी शीर्ष को सम्मुख भुजा के मध्य बिंदु से मिलाने वाली रेखा।'
    },
    {
      term: 'Division Ratio ($k:1$)',
      termHi: 'विभाजन अनुपात विधि',
      definition: 'The single-variable substitution technique ($m_1/m_2 = k$) used to solve for unknown division proportions.',
      definitionHi: 'अज्ञात अनुपात ज्ञात करने हेतु एकल चर $k : 1$ मानकर हल करने की सरलतम विधि।'
    }
  ],
  sources: [
    {
      title: 'NCERT Class 10 Mathematics - Chapter 7: Section Formula',
      author: 'NCERT',
      description: 'अंतः विभाजन, मध्य बिंदु, समत्रिभाजन एवं केंद्रक सूत्रों का प्रामाणिक पाठ्यक्रम संदर्भ।'
    },
    {
      title: 'Plane Coordinate Geometry',
      author: 'S.L. Loney',
      description: 'अंतः व बाह्य विभाजन तथा संगामी रेखाओं के अनुपातिक विश्लेषण का शास्त्रीय ग्रंथ।'
    },
    {
      title: 'CG Vyapam Solved Papers (2014-2024)',
      author: 'CGPEB',
      description: 'छत्तीसगढ़ व्यापम की विभिन्न भर्ती परीक्षाओं के वास्तविक विभाजन सूत्र प्रश्न।'
    },
    {
      title: 'Quantitative Aptitude for Competitive Examinations',
      author: 'R.S. Aggarwal',
      description: 'विभाजन अनुपात, अक्षीय विभाजन शॉर्टकट्स एवं बहुविकल्पीय प्रश्नों का संग्रह।'
    }
  ],
  confusionBuster: [
    {
      misconception: 'अंतः विभाजन में $m_1$ का गुणा $x_1$ से किया जाता है।',
      clarification: 'यह छात्रों की सबसे आम भूल है! हमेशा क्रॉस गुणन होता है: $m_1$ का गुणा दूसरे बिंदु $x_2$ से और $m_2$ का गुणा पहले बिंदु $x_1$ से होता है ($m_1 x_2 + m_2 x_1$)।'
    },
    {
      misconception: 'बाह्य विभाजन में अनुपात ऋणात्मक दिया जाता है।',
      clarification: 'अनुपात हमेशा धनात्मक (जैसे $2:1$) दिया जाता है, किंतु सूत्र में बीच में ऋण ($-$) चिन्ह का प्रयोग किया जाता है ($m_1 x_2 - m_2 x_1$)।'
    },
    {
      misconception: '$X$-अक्ष द्वारा विभाजन में भुज $x = 0$ लिया जाता है।',
      clarification: '$X$-अक्ष पर कोटि $y = 0$ होती है! इसलिए अनुपात $-y_1/y_2$ बनता है। $x = 0$ तो $Y$-अक्ष पर होता है।'
    },
    {
      misconception: 'समांतर चतुर्भुज का चौथा शीर्ष निकालने के लिए दूरी सूत्र लगाना चाहिए।',
      clarification: 'दूरी सूत्र से हल करना बहुत लंबा और द्विघात समीकरण बनाता है। सबसे तेज़ तरीका विकर्णों के मध्य बिंदु की समता $x_4 = x_1 + x_3 - x_2$ लगाना है।'
    },
    {
      misconception: 'समत्रिभाजन का अर्थ है केवल मध्य बिंदु निकालना।',
      clarification: 'समत्रिभाजन में 2 बिंदु होते हैं, जो रेखा को क्रमशः $1 : 2$ और $2 : 1$ के अनुपात में बांटते हैं।'
    }
  ],
  faqList: [
    {
      question: 'विभाजन सूत्र का मुख्य उपयोग क्या है?',
      answer: 'यह सूत्र दो दिए गए बिंदुओं को जोड़ने वाले रेखाखंड पर स्थित किसी ऐसे बिंदु के निर्देशांक बताता है जो उस रेखाखंड को किसी निश्चित अनुपात में विभाजित करता है।'
    },
    {
      question: 'यदि अनुपात ज्ञात न हो तो क्या मानना चाहिए?',
      answer: 'सदैव अनुपात को $k : 1$ मानना चाहिए। इससे केवल एक अज्ञात चर $k$ रहता है और एक ही समीकरण से तुरंत उत्तर मिल जाता है।'
    },
    {
      question: 'त्रिभुज का केंद्रक क्या होता है और इसका सूत्र क्या है?',
      answer: 'त्रिभुज की तीनों माध्यिकाओं के संगम बिंदु को केंद्रक कहते हैं। इसके निर्देशांक तीनों शीर्षों के निर्देशांकों का अंकगणितीय औसत होते हैं: $G = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right)$।'
    },
    {
      question: 'अक्षों द्वारा विभाजन अनुपात का शॉर्टकट क्या है?',
      answer: '$X$-अक्ष के लिए अनुपात $-y_1 : y_2$ तथा $Y$-अक्ष के लिए अनुपात $-x_1 : x_2$ होता है।'
    },
    {
      question: 'समांतर चतुर्भुज के चौथे शीर्ष को 5 सेकंड में कैसे निकालें?',
      answer: 'आमने-सामने के विपरीत शीर्षों को जोड़कर तीसरे शीर्ष को घटा दें: $x_4 = x_1 + x_3 - x_2$ तथा $y_4 = y_1 + y_3 - y_2$।'
    }
  ],
  oneLinerRevision: [
    'अंतः विभाजन सूत्र: $P = \\left(\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}\\right)$।',
    'बाह्य विभाजन सूत्र: $P = \\left(\\frac{m_1 x_2 - m_2 x_1}{m_1 - m_2}, \\frac{m_1 y_2 - m_2 y_1}{m_1 - m_2}\\right)$।',
    'मध्य बिंदु सूत्र: $M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$।',
    'त्रिभुज का केंद्रक: $G = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right)$।',
    'केंद्रक प्रत्येक माध्यिका को $2 : 1$ (शीर्ष से आधार) में विभाजित करता है।',
    'समत्रिभाजन बिंदु रेखाखंड को $1 : 2$ तथा $2 : 1$ में बांटते हैं।',
    '$X$-अक्ष द्वारा विभाजन अनुपात $= -y_1 : y_2$।',
    '$Y$-अक्ष द्वारा विभाजन अनुपात $= -x_1 : x_2$।',
    'समांतर चतुर्भुज का चौथा शीर्ष: $x_4 = x_1 + x_3 - x_2, y_4 = y_1 + y_3 - y_2$।',
    'अनुपात ज्ञात करने हेतु सदैव $k : 1$ माना जाता है।'
  ],
  rapidRevision: {
    points: [
      'अंतः विभाजन: $\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}$।',
      'बाह्य विभाजन: $\\frac{m_1 x_2 - m_2 x_1}{m_1 - m_2}, \\frac{m_1 y_2 - m_2 y_1}{m_1 - m_2}$।',
      'मध्य बिंदु: $\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}$।',
      'केंद्रक: $\\frac{\\sum x}{3}, \\frac{\\sum y}{3}$।',
      'अक्षीय अनुपात: $X$-अक्ष $\\to -y_1/y_2$; $Y$-अक्ष $\\to -x_1/x_2$।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_14 (Section Formula)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_14').set(sanitized);
  console.log('✅ cgv_master_adv_math_14 saved to Firestore topic_study_notes!');

  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === 'cgv_master_sub_3') {
        for (const ch of sub.chapters || []) {
          if (ch.id === 'cgv_master_sub_3_ch_15') {
            for (const t of ch.topics || []) {
              if (t.id === 'adv_math_14') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_14 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 Chapter 15 is now 100% complete!');
}

upload().catch(console.error);
