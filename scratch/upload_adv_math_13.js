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
  topicId: 'adv_math_13',
  topicName: 'Distance Formula',
  topicNameHi: 'दूरी सूत्र',
  chapterId: 'cgv_master_sub_3_ch_15',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'दूरी सूत्र (Distance Formula) निर्देशांक ज्यामिति का सर्वाधिक महत्वपूर्ण और आधारभूत सूत्र है। यह कार्तीय तल में स्थित किन्हीं दो बिंदुओं के बीच की न्यूनतम सीधी (यूक्लिडीय) दूरी की गणना पाइथागोरस प्रमेय के माध्यम से करता है। यदि बिंदु $P(x_1, y_1)$ और $Q(x_2, y_2)$ हों, तो उनके बीच की दूरी $PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ होती है।',
    importance: 'CG Vyapam (पटवारी, आरआई, एसआई, सब-इंजीनियर, सहायक ग्रेड) तथा CGPSC में बिंदुओं के बीच दूरी, अक्षों पर समदूरस्थ बिंदु (Equidistant Points), त्रिभुजों एवं चतुर्भुजों के प्रकार की पहचान, तथा संरेखीयता (Collinearity) से सीधे 1 से 2 प्रश्न पूछे जाते हैं।',
    examRelevance: 'परीक्षाओं में $X$-अक्ष पर वह बिंदु ज्ञात करना जो दो दिए गए बिंदुओं से समान दूरी पर हो ($y=0$ मानकर), तीन बिंदुओं से बनने वाले त्रिभुज (समकोण/समबाहु) की पहचान, तथा वृत्त की त्रिज्या एवं व्यास की गणना दूरी सूत्र द्वारा की जाती है।',
    quickFacts: [
      'दो बिंदुओं के बीच दूरी: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$।',
      'मूल बिंदु $O(0, 0)$ से बिंदु $P(x, y)$ की दूरी $= \\sqrt{x^2 + y^2}$।',
      'दूरी सदैव एक अऋणात्मक राशि होती है ($d \\ge 0$)।',
      'बिंदुओं के क्रम का दूरी पर कोई प्रभाव नहीं पड़ता: $(x_2 - x_1)^2 = (x_1 - x_2)^2$।',
      'तीन बिंदु $A, B, C$ संरेखीय (Collinear) होते हैं यदि $AB + BC = AC$ हो।',
      'समकोण त्रिभुज की पहचान: किन्हीं दो भुजाओं के वर्गों का योग तीसरी भुजा के वर्ग के बराबर हो ($a^2 + b^2 = c^2$)।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'दूरी सूत्र की व्युत्पत्ति एवं पाइथागोरस संबंध',
      content: `### 1. दूरी सूत्र का ज्यामितीय निगमन
माना कार्तीय तल में दो बिंदु $P(x_1, y_1)$ तथा $Q(x_2, y_2)$ हैं।
1. $P$ से $X$-अक्ष के समांतर रेखा तथा $Q$ से $Y$-अक्ष के समांतर रेखा खींचने पर वे बिंदु $R(x_2, y_1)$ पर परस्पर समकोण बनाती हैं।
2. इस प्रकार $\\triangle PQR$ एक समकोण त्रिभुज बनता है जहाँ $\\angle R = 90^\\circ$ है।
   - आधार $PR = |x_2 - x_1|$
   - लंब $QR = |y_2 - y_1|$
3. पाइथागोरस प्रमेय के अनुसार:
   $$PQ^2 = PR^2 + QR^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$$
   अतः:
   $$PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

### 2. महत्वपूर्ण विशेष स्थितियां
- **मूल बिंदु से दूरी:** यदि एक बिंदु $O(0, 0)$ तथा दूसरा $P(x, y)$ हो:
  $$OP = \\sqrt{(x - 0)^2 + (y - 0)^2} = \\sqrt{x^2 + y^2}$$
- **क्षैतिज रेखा पर स्थित बिंदु ($y_1 = y_2$):**
  $$d = \\sqrt{(x_2 - x_1)^2 + 0} = |x_2 - x_1|$$
- **ऊर्ध्वाधर रेखा पर स्थित बिंदु ($x_1 = x_2$):**
  $$d = \\sqrt{0 + (y_2 - y_1)^2} = |y_2 - y_1|$$`
    },
    {
      id: 'ch2',
      title: 'समदूरस्थ बिंदु (Equidistant Points) के मॉडल',
      content: `### 1. समदूरस्थ बिंदु की अवधारणा
यदि कोई बिंदु $P$ दो बिंदुओं $A$ और $B$ से समान दूरी पर स्थित हो, तो:
$$PA = PB \\implies PA^2 = PB^2$$
(दोनों ओर वर्ग करने से वर्गमूल का चिन्ह हट जाता है और गणना अत्यंत तीव्र हो जाती है)।

### 2. $X$-अक्ष पर समदूरस्थ बिंदु ज्ञात करना
$X$-अक्ष पर स्थित किसी भी बिंदु के निर्देशांक $(x, 0)$ होते हैं।
- **प्रश्न मॉडल:** $X$-अक्ष पर वह बिंदु ज्ञात कीजिए जो $A(2, -5)$ और $B(-2, 9)$ से समदूरस्थ हो।
  - माना बिंदु $P(x, 0)$ है।
  - $PA^2 = PB^2$
  - $(x - 2)^2 + (0 - (-5))^2 = (x - (-2))^2 + (0 - 9)^2$
  - $(x - 2)^2 + 25 = (x + 2)^2 + 81$
  - $x^2 - 4x + 4 + 25 = x^2 + 4x + 4 + 81$
  - $-4x + 29 = 4x + 85 \\implies 8x = 29 - 85 = -56 \\implies x = -7$
  - अतः अभीष्ट बिंदु **$(-7, 0)$** है।

### 3. $Y$-अक्ष पर समदूरस्थ बिंदु ज्ञात करना
$Y$-अक्ष पर स्थित बिंदु के निर्देशांक $(0, y)$ होते हैं। समान रूप से $PA^2 = PB^2$ लगाकर $y$ का मान ज्ञात किया जाता है।`
    },
    {
      id: 'ch3',
      title: 'संरेखीय बिंदुओं (Collinear Points) का परीक्षण',
      content: `### 1. संरेखीयता की परिभाषा
यदि तीन या तीन से अधिक बिंदु एक ही सीधी रेखा में स्थित हों, तो उन्हें संरेखीय बिंदु (Collinear Points) कहा जाता है।

### 2. दूरी सूत्र द्वारा संरेखीयता की जाँच
माना तीन बिंदु $A, B$ और $C$ दिए गए हैं:
1. तीनों दूरियां $AB, BC$ और $AC$ निकालें।
2. यदि किन्हीं दो छोटी दूरियों का योग सबसे बड़ी दूरी के ठीक बराबर आ जाए:
   $$AB + BC = AC$$
   तो बिंदु $A, B$ और $C$ संरेखीय होंगे, तथा बिंदु $B$ बिंदुओं $A$ और $C$ के मध्य स्थित होगा।

### 3. उदाहरण
जाँच कीजिए कि क्या $A(1, 5), B(2, 3)$ और $C(-2, -11)$ संरेखीय हैं:
- $AB = \\sqrt{(2 - 1)^2 + (3 - 5)^2} = \\sqrt{1 + 4} = \\sqrt{5}$
- $BC = \\sqrt{(-2 - 2)^2 + (-11 - 3)^2} = \\sqrt{16 + 196} = \\sqrt{212} = 2\\sqrt{53}$
- $AC = \\sqrt{(-2 - 1)^2 + (-11 - 5)^2} = \\sqrt{9 + 256} = \\sqrt{265}$
यहाँ $AB + BC \\neq AC$, अतः ये बिंदु संरेखीय नहीं हैं।`
    },
    {
      id: 'ch4',
      title: 'त्रिभुजों एवं चतुर्भुजों के प्रकार का निर्धारण',
      content: `### 1. त्रिभुजों के प्रकार की पहचान
शीर्ष $A, B, C$ से तीनों भुजाएं $AB, BC, CA$ ज्ञात करें:
- **समबाहु त्रिभुज (Equilateral Triangle):** यदि तीनों भुजाएं बराबर हों ($AB = BC = CA$)।
- **समद्विबाहु त्रिभुज (Isosceles Triangle):** यदि कोई दो भुजाएं बराबर हों ($AB = BC \\neq CA$)।
- **विषमबाहु त्रिभुज (Scalene Triangle):** यदि तीनों भुजाएं असमान हों ($AB \\neq BC \\neq CA$)।
- **समकोण त्रिभुज (Right-Angled Triangle):** यदि किन्हीं दो भुजाओं के वर्गों का योग तीसरी भुजा के वर्ग के बराबर हो ($a^2 + b^2 = c^2$)।

### 2. चतुर्भुजों के प्रकार की पहचान
शीर्ष $A, B, C, D$ से चारों भुजाएं ($AB, BC, CD, DA$) तथा दोनों विकर्ण ($AC, BD$) ज्ञात करें:
- **वर्ग (Square):** चारों भुजाएं बराबर ($AB = BC = CD = DA$) तथा दोनों विकर्ण बराबर ($AC = BD$)।
- **समचतुर्भुज (Rhombus):** चारों भुजाएं बराबर ($AB = BC = CD = DA$) किंतु विकर्ण असमान ($AC \\neq BD$)।
- **आयत (Rectangle):** आमने-सामने की भुजाएं बराबर ($AB = CD$ तथा $BC = DA$) तथा दोनों विकर्ण बराबर ($AC = BD$)।
- **समांतर चतुर्भुज (Parallelogram):** आमने-सामने की भुजाएं बराबर किंतु दोनों विकर्ण असमान ($AC \\neq BD$)।`
    },
    {
      id: 'ch5',
      title: 'पाइथागोरियन ट्रिपलेट्स एवं परीक्षा शॉर्टकट्स',
      content: `### 1. पाइथागोरियन ट्रिपलेट्स द्वारा दूरी की मौखिक गणना
यदि क्षैतिज अंतर $|x_2 - x_1| = \\Delta x$ और ऊर्ध्वाधर अंतर $|y_2 - y_1| = \\Delta y$ पाइथागोरियन त्रिक बनाते हों, तो बिना सूत्र के सीधे दूरी लिखी जा सकती है:
- **$(3, 4, 5)$ त्रिक:** $\\Delta x = 3, \\Delta y = 4 \\implies d = 5$ (या इसके गुणक: $6, 8, 10$ आदि)
- **$(5, 12, 13)$ त्रिक:** $\\Delta x = 5, \\Delta y = 12 \\implies d = 13$
- **$(8, 15, 17)$ त्रिक:** $\\Delta x = 8, \\Delta y = 15 \\implies d = 17$
- **$(7, 24, 25)$ त्रिक:** $\\Delta x = 7, \\Delta y = 24 \\implies d = 25$

### 2. वृत्त की त्रिज्या एवं व्यास मॉडल
यदि वृत्त के व्यास के सिरे $A(x_1, y_1)$ और $B(x_2, y_2)$ हों:
- व्यास $D = AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$
- त्रिज्या $R = \\frac{D}{2} = \\frac{1}{2}\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$`
    }
  ],
  comparativeTables: [
    {
      title: 'दूरी सूत्र द्वारा चतुर्भुजों की पहचान तालिका',
      headers: ['चतुर्भुज का प्रकार', 'भुजाओं की स्थिति', 'विकर्णों की स्थिति ($AC$ और $BD$)', 'अंतिम शर्त'],
      rows: [
        ['वर्ग (Square)', 'चारों भुजाएं समान ($AB = BC = CD = DA$)', 'दोनों विकर्ण समान ($AC = BD$)', '4 भुजाएं समान + 2 विकर्ण समान'],
        ['समचतुर्भुज (Rhombus)', 'चारों भुजाएं समान ($AB = BC = CD = DA$)', 'दोनों विकर्ण असमान ($AC \\neq BD$)', '4 भुजाएं समान + विकर्ण असमान'],
        ['आयत (Rectangle)', 'सम्मुख भुजाएं समान ($AB = CD, BC = DA$)', 'दोनों विकर्ण समान ($AC = BD$)', 'सम्मुख भुजाएं समान + विकर्ण समान'],
        ['समांतर चतुर्भुज (Parallelogram)', 'सम्मुख भुजाएं समान ($AB = CD, BC = DA$)', 'दोनों विकर्ण असमान ($AC \\neq BD$)', 'सम्मुख भुजाएं समान + विकर्ण असमान']
      ]
    },
    {
      title: 'त्रिभुजों के प्रकार एवं भुजाओं के मध्य संबंध',
      headers: ['त्रिभुज का प्रकार', 'भुजाओं की तुलना', 'वर्गों का संबंध (पाइथागोरस)', 'शीर्षों की विशेषता'],
      rows: [
        ['समबाहु (Equilateral)', '$AB = BC = CA$', 'सभी भुजाएं समान', 'सभी कोण $60^\\circ$'],
        ['समद्विबाहु (Isosceles)', '$AB = BC \\neq CA$ (कोई दो समान)', 'दो भुजाएं समान', 'आधार कोण समान'],
        ['समकोण (Right-Angled)', 'कोई भी अनुपात', '$AB^2 + BC^2 = CA^2$', 'एक कोण $90^\\circ$'],
        ['समद्विबाहु समकोण', 'दो भुजाएं समान ($AB = BC$)', '$AB^2 + BC^2 = CA^2 \\implies 2AB^2 = CA^2$', 'कोण $45^\\circ, 45^\\circ, 90^\\circ$']
      ]
    },
    {
      title: '$X$-अक्ष पर समदूरस्थ बिंदु बनाम $Y$-अक्ष पर समदूरस्थ बिंदु',
      headers: ['मापदंड', '$X$-अक्ष पर समदूरस्थ बिंदु', '$Y$-अक्ष पर समदूरस्थ बिंदु'],
      rows: [
        ['माने गए निर्देशांक', '$P(x, 0)$', '$P(0, y)$'],
        ['शून्य होने वाला चर', 'कोटि $y = 0$', 'भुज $x = 0$'],
        ['समीकरण का प्रारूप', '$(x - x_1)^2 + y_1^2 = (x - x_2)^2 + y_2^2$', '$x_1^2 + (y - y_1)^2 = x_2^2 + (y - y_2)^2$'],
        ['अंतिम प्राप्त बिंदु', '$(x, 0)$', '$(0, y)$']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'बिंदुओं $(2, 3)$ और $(4, 1)$ के बीच की दूरी क्या होगी? [CG Vyapam Patwari / RI]',
      options: [
        '$2\\sqrt{2}$ इकाई',
        '4 इकाई',
        '2 इकाई',
        '$3\\sqrt{2}$ इकाई'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Patwari',
      explanation: 'दूरी सूत्र से:\n$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$\n$$d = \\sqrt{(4 - 2)^2 + (1 - 3)^2} = \\sqrt{2^2 + (-2)^2} = \\sqrt{4 + 4} = \\sqrt{8} = 2\\sqrt{2} \\text{ इकाई}$$'
    },
    {
      id: 'pyq2',
      question: 'बिंदुओं $(a, b)$ और $(-a, -b)$ के बीच की दूरी क्या होगी? [CG Vyapam SI Mains]',
      options: [
        '$2\\sqrt{a^2 + b^2}$',
        '$\\sqrt{a^2 + b^2}$',
        '$4(a^2 + b^2)$',
        '$2(a + b)$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam SI Mains',
      explanation: '$$d = \\sqrt{(-a - a)^2 + (-b - b)^2} = \\sqrt{(-2a)^2 + (-2b)^2}$$\n$$= \\sqrt{4a^2 + 4b^2} = \\sqrt{4(a^2 + b^2)} = 2\\sqrt{a^2 + b^2}$$'
    },
    {
      id: 'pyq3',
      question: '$X$-अक्ष पर वह बिंदु ज्ञात कीजिए जो $(2, -5)$ और $(-2, 9)$ से समदूरस्थ (Equidistant) है: [CGPSC SSE / Vyapam Combined]',
      options: [
        '$(-7, 0)$',
        '$(7, 0)$',
        '$(0, -7)$',
        '$(-5, 0)$'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'माना $X$-अक्ष पर बिंदु $P(x, 0)$ है।\n$PA^2 = PB^2$\n$$(x - 2)^2 + (0 - (-5))^2 = (x - (-2))^2 + (0 - 9)^2$$\n$$(x - 2)^2 + 25 = (x + 2)^2 + 81$$\n$$x^2 - 4x + 4 + 25 = x^2 + 4x + 4 + 81$$\n$$-4x + 29 = 4x + 85 \\implies 8x = -56 \\implies x = -7$$\nअतः बिंदु $(-7, 0)$ है।'
    },
    {
      id: 'pyq4',
      question: 'यदि बिंदु $(x, 2)$ और $(3, 4)$ के बीच की दूरी $2\\sqrt{5}$ इकाई हो, तो $x$ के संभावित मान क्या होंगे? [CG Vyapam Hostel Superintendent]',
      options: [
        '-1 या 7',
        '1 या -7',
        '3 या 5',
        '0 या 6'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: '$$d^2 = (3 - x)^2 + (4 - 2)^2$$\n$$(2\\sqrt{5})^2 = (3 - x)^2 + 2^2$$\n$$20 = (3 - x)^2 + 4 \\implies (3 - x)^2 = 16$$\nवर्गमूल लेने पर: $3 - x = \\pm 4$\n- यदि $3 - x = 4 \\implies x = 3 - 4 = -1$\n- यदि $3 - x = -4 \\implies x = 3 + 4 = 7$\nअतः $x = -1$ या $7$ होगा।'
    },
    {
      id: 'pyq5',
      question: 'शीर्ष $(0, 4), (0, 0)$ और $(3, 0)$ वाले त्रिभुज का परिमाप क्या होगा? [CG Vyapam Teacher / AMO]',
      options: [
        '12 इकाई',
        '7 इकाई',
        '14 इकाई',
        '10 इकाई'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Teacher',
      explanation: 'माना शीर्ष $A(0, 4), O(0, 0), B(3, 0)$ हैं:\n- $OA = \\sqrt{(0-0)^2 + (4-0)^2} = 4$\n- $OB = \\sqrt{(3-0)^2 + (0-0)^2} = 3$\n- कर्ण $AB = \\sqrt{(3-0)^2 + (0-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$\nत्रिभुज का परिमाप $= OA + OB + AB = 4 + 3 + 5 = 12 \\text{ इकाई}$'
    },
    {
      id: 'pyq6',
      question: 'बिंदु $(0, 0), (3, \\sqrt{3})$ और $(3, -\\sqrt{3})$ किस प्रकार का त्रिभुज बनाते हैं? [CG Vyapam Assistant Grade 3]',
      options: [
        'समबाहु त्रिभुज (Equilateral)',
        'समद्विबाहु त्रिभुज (Isosceles)',
        'समकोण त्रिभुज (Right-Angled)',
        'विषमबाहु त्रिभुज (Scalene)'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Assistant Grade 3',
      explanation: 'माना शीर्ष $O(0, 0), A(3, \\sqrt{3}), B(3, -\\sqrt{3})$ हैं:\n- $OA = \\sqrt{3^2 + (\\sqrt{3})^2} = \\sqrt{9 + 3} = \\sqrt{12} = 2\\sqrt{3}$\n- $OB = \\sqrt{3^2 + (-\\sqrt{3})^2} = \\sqrt{9 + 3} = \\sqrt{12} = 2\\sqrt{3}$\n- $AB = \\sqrt{(3 - 3)^2 + (-\\sqrt{3} - \\sqrt{3})^2} = \\sqrt{0 + (-2\\sqrt{3})^2} = \\sqrt{12} = 2\\sqrt{3}$\nचूँकि तीनों भुजाएं समान ($OA = OB = AB = 2\\sqrt{3}$) हैं, अतः यह समबाहु त्रिभुज है।'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'बिंदुओं $(-5, 7)$ और $(-1, 3)$ के बीच की दूरी क्या होगी?',
      options: [
        '$4\\sqrt{2}$ इकाई',
        '$2\\sqrt{2}$ इकाई',
        '4 इकाई',
        '8 इकाई'
      ],
      correctOption: 0,
      explanation: '$$d = \\sqrt{(-1 - (-5))^2 + (3 - 7)^2} = \\sqrt{4^2 + (-4)^2} = \\sqrt{16 + 16} = \\sqrt{32} = 4\\sqrt{2}$$'
    },
    {
      id: 'mcq2',
      question: 'मूल बिंदु से बिंदु $(-6, 8)$ की दूरी क्या होगी?',
      options: [
        '10 इकाई',
        '14 इकाई',
        '2 इकाई',
        '$\\sqrt{28}$ इकाई'
      ],
      correctOption: 0,
      explanation: '$$d = \\sqrt{(-6)^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$$'
    },
    {
      id: 'mcq3',
      question: '$Y$-अक्ष पर वह बिंदु ज्ञात कीजिए जो बिंदुओं $A(6, 5)$ और $B(-4, 3)$ से समदूरस्थ है:',
      options: [
        '$(0, 9)$',
        '$(0, -9)$',
        '$(9, 0)$',
        '$(0, 5)$'
      ],
      correctOption: 0,
      explanation: 'माना बिंदु $P(0, y)$ है। $PA^2 = PB^2$:\n$$(0 - 6)^2 + (y - 5)^2 = (0 - (-4))^2 + (y - 3)^2$$\n$$36 + y^2 - 10y + 25 = 16 + y^2 - 6y + 9$$\n$$61 - 10y = 25 - 6y \\implies 4y = 36 \\implies y = 9$$\nअतः बिंदु $(0, 9)$ है।'
    },
    {
      id: 'mcq4',
      question: 'यदि बिंदु $A(0, 2), B(3, p)$ और $C(p, 5)$ इस प्रकार हैं कि $AB = AC$, तो $p$ का मान क्या होगा?',
      options: [
        '1',
        '2',
        '3',
        '4'
      ],
      correctOption: 0,
      explanation: '$AB^2 = AC^2$\n$$(3 - 0)^2 + (p - 2)^2 = (p - 0)^2 + (5 - 2)^2$$\n$$9 + p^2 - 4p + 4 = p^2 + 9$$\n$$p^2 - 4p + 13 = p^2 + 9 \\implies -4p = -4 \\implies p = 1$$'
    },
    {
      id: 'mcq5',
      question: 'किसी वृत्त के व्यास के सिरे $(3, -2)$ और $(-3, 6)$ हैं। इस वृत्त की त्रिज्या क्या होगी?',
      options: [
        '5 इकाई',
        '10 इकाई',
        '$\\sqrt{10}$ इकाई',
        '25 इकाई'
      ],
      correctOption: 0,
      explanation: 'व्यास $D = \\sqrt{(-3 - 3)^2 + (6 - (-2))^2} = \\sqrt{(-6)^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$\nत्रिज्या $R = \\frac{D}{2} = \\frac{10}{2} = 5$ इकाई।'
    },
    {
      id: 'mcq6',
      question: 'बिंदुओं $(1, 2), (2, 3)$ और $(3, 4)$ के विषय में कौन सा कथन सत्य है?',
      options: [
        'ये तीनों बिंदु संरेखीय (Collinear) हैं',
        'ये समबाहु त्रिभुज बनाते हैं',
        'ये समकोण त्रिभुज बनाते हैं',
        'ये विषमबाहु त्रिभुज बनाते हैं'
      ],
      correctOption: 0,
      explanation: '$AB = \\sqrt{(2-1)^2 + (3-2)^2} = \\sqrt{2}$\n$BC = \\sqrt{(3-2)^2 + (4-3)^2} = \\sqrt{2}$\n$AC = \\sqrt{(3-1)^2 + (4-2)^2} = \\sqrt{4 + 4} = \\sqrt{8} = 2\\sqrt{2}$\nचूँकि $AB + BC = \\sqrt{2} + \\sqrt{2} = 2\\sqrt{2} = AC$, अतः ये बिंदु संरेखीय हैं।'
    },
    {
      id: 'mcq7',
      question: 'बिंदु $(a \\cos \\theta, a \\sin \\theta)$ की मूल बिंदु $(0, 0)$ से दूरी क्या होगी?',
      options: [
        '$a$',
        '$a^2$',
        '$1$',
        '$a \\sqrt{2}$'
      ],
      correctOption: 0,
      explanation: '$$d = \\sqrt{(a \\cos \\theta)^2 + (a \\sin \\theta)^2} = \\sqrt{a^2(\\cos^2 \\theta + \\sin^2 \\theta)} = \\sqrt{a^2(1)} = a$$'
    },
    {
      id: 'mcq8',
      question: 'चार शीर्ष $(1, 2), (4, 3), (6, 6)$ और $(3, 5)$ मिलकर किस आकृति का निर्माण करते हैं?',
      options: [
        'समांतर चतुर्भुज (Parallelogram)',
        'वर्ग (Square)',
        'समचतुर्भुज (Rhombus)',
        'समलंब चतुर्भुज (Trapezium)'
      ],
      correctOption: 0,
      explanation: 'भुजाएं निकालने पर: $AB = \\sqrt{9+1} = \\sqrt{10}$, $BC = \\sqrt{4+9} = \\sqrt{13}$, $CD = \\sqrt{9+1} = \\sqrt{10}$, $DA = \\sqrt{4+9} = \\sqrt{13}$। सम्मुख भुजाएं समान हैं किंतु विकर्ण असमान हैं, अतः यह समांतर चतुर्भुज है।'
    }
  ],
  keyTerminology: [
    {
      term: 'Distance Formula',
      termHi: 'दूरी सूत्र',
      definition: 'The mathematical equation $\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ derived from the Pythagorean theorem to calculate the straight-line span between two points.',
      definitionHi: 'पाइथागोरस प्रमेय से व्युत्पन्न वह गणितीय सूत्र जो समतल के किन्हीं दो बिंदुओं के बीच की सीधी दूरी ज्ञात करता है।'
    },
    {
      term: 'Equidistant Point',
      termHi: 'समदूरस्थ बिंदु',
      definition: 'A point situated at equal physical distances from two or more specified reference points ($PA = PB$).',
      definitionHi: 'वह बिंदु जिसकी दो या दो से अधिक दिए गए बिंदुओं से दूरियां परस्पर बराबर होती हैं ($PA = PB$)।'
    },
    {
      term: 'Collinear Points',
      termHi: 'संरेखीय बिंदु',
      definition: 'Three or more points that lie precisely on a single continuous straight line ($AB + BC = AC$).',
      definitionHi: 'तीन या अधिक बिंदु जो पूर्णतः एक ही सीधी रेखा में स्थित होते हैं।'
    },
    {
      term: 'Pythagorean Triplet',
      termHi: 'पाइथागोरियन त्रिक',
      definition: 'A set of three positive integers $(a, b, c)$ satisfying $a^2 + b^2 = c^2$, enabling rapid mental distance evaluations.',
      definitionHi: 'तीन धनात्मक पूर्णांकों का समूह जो $a^2 + b^2 = c^2$ को संतुष्ट करता है (जैसे $3, 4, 5$ तथा $5, 12, 13$)।'
    },
    {
      term: 'Equilateral Triangle Condition',
      termHi: 'समबाहु त्रिभुज शर्त',
      definition: 'Geometric verification where all three calculated distances between coordinates are strictly equal ($AB = BC = CA$).',
      definitionHi: 'ज्यामितीय शर्त जिसमें निर्देशांकों के बीच की तीनों भुजाओं की दूरियां पूर्णतः बराबर होती हैं।'
    },
    {
      term: 'Right-Angled Triangle Condition',
      termHi: 'समकोण त्रिभुज शर्त',
      definition: 'The requirement that the square of the longest segment equals the sum of the squares of the other two segments.',
      definitionHi: 'यह शर्त कि सबसे बड़ी भुजा का वर्ग शेष दोनों भुजाओं के वर्गों के योग के बराबर हो।'
    },
    {
      term: 'Perpendicular Bisector',
      termHi: 'लंब समद्विभाजक',
      definition: 'The geometric locus of all points in the plane that are equidistant from two given points.',
      definitionHi: 'उन सभी बिंदुओं का बिंदुपथ जो दो दिए गए बिंदुओं से सदैव समान दूरी पर स्थित होते हैं।'
    },
    {
      term: 'Euclidean Distance',
      termHi: 'यूक्लिडीय दूरी',
      definition: 'The ordinary straight-line distance between two points in Euclidean coordinate space.',
      definitionHi: 'कार्तीय समतल में दो बिंदुओं के मध्य की न्यूनतम सरल रेखीय दूरी।'
    }
  ],
  sources: [
    {
      title: 'NCERT Class 10 Mathematics - Chapter 7: Coordinate Geometry (Distance Formula)',
      author: 'NCERT',
      description: 'दूरी सूत्र, समदूरस्थ बिंदु, संरेखीयता एवं बहुभुजों के परीक्षण का आधिकारिक मानक संदर्भ।'
    },
    {
      title: 'Plane Coordinate Geometry',
      author: 'S.L. Loney',
      description: 'द्विविमीय निर्देशांक ज्यामिति एवं पाइथागोरस प्रमेय के विश्लेषणात्मक अनुप्रयोगों का शास्त्रीय ग्रंथ।'
    },
    {
      title: 'CG Vyapam Solved Papers (2014-2024)',
      author: 'CGPEB',
      description: 'छत्तीसगढ़ व्यापम की विभिन्न भर्ती परीक्षाओं के वास्तविक प्रश्न और समाधान।'
    },
    {
      title: 'Quantitative Aptitude for Competitive Examinations',
      author: 'R.S. Aggarwal',
      description: 'दूरी सूत्र के त्वरित गणना ट्रिक्स और बहुविकल्पीय प्रश्नों का संग्रह।'
    }
  ],
  confusionBuster: [
    {
      misconception: 'बिंदुओं के क्रम बदलने से दूरी का मान बदल जाता है।',
      clarification: '$(x_2 - x_1)^2$ और $(x_1 - x_2)^2$ दोनों का मान पूर्णतः समान होता है क्योंकि किसी भी संख्या का वर्ग सदैव धनात्मक होता है। अतः क्रम बदलने से कोई अंतर नहीं पड़ता।'
    },
    {
      misconception: 'दूरी निकालते समय ऋणात्मक उत्तर आ सकता है।',
      clarification: 'दूरी एक निरपेक्ष ज्यामितीय माप है, यह सदैव अऋणात्मक ($d \\ge 0$) होती है। वर्गमूल का मान सदैव धनात्मक लिया जाता है।'
    },
    {
      misconception: 'चारों भुजाएं बराबर निकलने पर वह आकृति निश्चित रूप से वर्ग ही होगी।',
      clarification: 'चारों भुजाएं समचतुर्भुज (Rhombus) की भी बराबर होती हैं! वर्ग सिद्ध करने के लिए दोनों विकर्णों का भी बराबर होना अनिवार्य है।'
    },
    {
      misconception: 'समदूरस्थ बिंदु निकालने के लिए वर्गमूल लेकर हल करना चाहिए।',
      clarification: 'वर्गमूल लेकर हल करने पर गणना जटिल हो जाती है। सदैव दोनों ओर वर्ग करके $PA^2 = PB^2$ का प्रयोग करें जिससे वर्गमूल सीधे हट जाता है।'
    },
    {
      misconception: '$X$-अक्ष पर समदूरस्थ बिंदु में $x=0$ मान लेते हैं।',
      clarification: '$X$-अक्ष पर $y = 0$ होता है, अतः बिंदु $(x, 0)$ माना जाता है। $x = 0$ तो $Y$-अक्ष पर होता है।'
    }
  ],
  faqList: [
    {
      question: 'दूरी सूत्र क्या है और इसका आधार क्या है?',
      answer: 'दूरी सूत्र $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ है। इसका आधार समकोण त्रिभुज पर लागू होने वाला पाइथागोरस प्रमेय ($Hypotenuse^2 = Base^2 + Perpendicular^2$) है।'
    },
    {
      question: 'मूल बिंदु से किसी बिंदु की दूरी का संक्षिप्त सूत्र क्या है?',
      answer: 'मूल बिंदु $(0, 0)$ से बिंदु $(x, y)$ की दूरी सीधे $\\sqrt{x^2 + y^2}$ होती है।'
    },
    {
      question: 'दूरी सूत्र से तीन बिंदुओं के संरेखीय होने की जाँच कैसे की जाती है?',
      answer: 'तीनों बिंदुओं के बीच की तीनों दूरियां निकालें। यदि किन्हीं दो दूरियों का योग तीसरी दूरी के बराबर हो ($AB + BC = AC$), तो बिंदु संरेखीय होते हैं।'
    },
    {
      question: 'वर्ग और समचतुर्भुज में दूरी सूत्र द्वारा कैसे अंतर किया जाता है?',
      answer: 'दोनों में चारों भुजाएं समान होती हैं। यदि दोनों विकर्ण समान ($AC = BD$) हों तो वह वर्ग है; यदि विकर्ण असमान ($AC \\neq BD$) हों तो वह समचतुर्भुज है।'
    },
    {
      question: 'अक्ष पर समदूरस्थ बिंदु के प्रश्नों को कैसे हल करें?',
      answer: 'यदि $X$-अक्ष पर पूछा हो तो बिंदु $(x, 0)$ मानें। यदि $Y$-अक्ष पर पूछा हो तो बिंदु $(0, y)$ मानें। फिर $PA^2 = PB^2$ समीकरण बनाकर अज्ञात चर का मान निकालें।'
    }
  ],
  oneLinerRevision: [
    'दो बिंदुओं के बीच दूरी: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$।',
    'मूल बिंदु से दूरी: $\\sqrt{x^2 + y^2}$।',
    'दूरी सदैव अऋणात्मक ($d \\ge 0$) होती है।',
    'समदूरस्थ बिंदु की गणना हेतु सदैव $PA^2 = PB^2$ का प्रयोग करें।',
    '$X$-अक्ष पर बिंदु $(x, 0)$ तथा $Y$-अक्ष पर बिंदु $(0, y)$ माना जाता है।',
    'संरेखीयता की कसौटी: $AB + BC = AC$।',
    'समकोण त्रिभुज की कसौटी: $a^2 + b^2 = c^2$।',
    'वर्ग: 4 भुजाएं समान + 2 विकर्ण समान।',
    'समचतुर्भुज: 4 भुजाएं समान + विकर्ण असमान।',
    'आयत: सम्मुख भुजाएं समान + 2 विकर्ण समान।'
  ],
  rapidRevision: {
    points: [
      'दूरी सूत्र: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$।',
      'मूल बिंदु से दूरी: $\\sqrt{x^2 + y^2}$।',
      'समदूरस्थ शर्त: $PA^2 = PB^2$।',
      'संरेखीय शर्त: $AB + BC = AC$।',
      'आकृतियों की पहचान: भुजाओं एवं विकर्णों की लंबाई की तुलना।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_13 (Distance Formula)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_13').set(sanitized);
  console.log('✅ cgv_master_adv_math_13 saved to Firestore topic_study_notes!');

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
              if (t.id === 'adv_math_13') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_13 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 adv_math_13 is synced!');
}

upload().catch(console.error);
