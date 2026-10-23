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
  examId: 'cgv_master',
  topicId: 'math_alg_4',
  updatedAt: new Date().toISOString(),
  studyNotes: {
    id: "cgv_master_math_alg_4",
    topicId: "math_alg_4",
    syllabusId: "cgv_master",
    subjectId: "cgv_master_sub_3",
    chapterId: "cgv_master_sub_3_ch_6",
    title: "लघुगणक (Logarithm)",
    subtitle: "लघुगणक के मूलभूत नियम, आधार परिवर्तन प्रमेय, पूर्णांश-अपूर्णांश एवं बीजीय अनुप्रयोग",
    readTime: "22 min",
    difficultyLevel: "Intermediate",
    tags: ["Mathematics", "Algebra", "Logarithm", "Base Change", "Characteristic", "Mantissa", "CG Vyapam"],

    overview: {
      introduction: "लघुगणक (Logarithm) घातांक (Exponentiation) की व्युत्क्रम संक्रिया (Inverse Operation) है। यदि किसी धनात्मक आधार $b$ ($b > 0, b \\neq 1$) की घात $x$ लगाने पर संख्या $a$ प्राप्त होती है (अर्थात $b^x = a$), तो $x$ को आधार $b$ पर $a$ का लघुगणक कहा जाता है और इसे $x = \\log_b a$ लिखा जाता है। 17वीं शताब्दी में जॉन नेपियर (John Napier) द्वारा प्रतिपादित यह गणितीय सिद्धांत अत्यधिक विशाल संख्याओं के गुणा को जोड़ में, भाग को घटाव में तथा घातों को सामान्य गुणन में बदलकर जटिल गणनाओं को अत्यंत सरल बना देता है।",
      importance: "छत्तीसगढ़ व्यापम (पटवारी, आर.आई., सहायक सांख्यिकी अधिकारी, हॉस्टल वार्डन) तथा CGPSC CSAT में लघुगणक के नियमों, आधार परिवर्तन (Base Change Formula), $\\log 2, \\log 3$ के मानों के आधार पर अन्य मान ज्ञात करने तथा $2^{64}$ जैसे बड़े घातांकों में कुल अंकों की संख्या निकालने से जुड़े प्रश्न लगातार पूछे जाते हैं।",
      examRelevance: "CG Vyapam, CGPSC (CSAT एवं वन सेवा), SSC CGL तथा रेलवे भर्ती परीक्षाओं में बीजगणित और अंकगणित के संगम के रूप में यह अध्याय अनिवार्य है।",
      quickFacts: [
        "परिभाषा: $b^x = a \\iff x = \\log_b a$ (जहाँ $b > 0, b \\neq 1$ तथा $a > 0$)।",
        "किसी भी आधार पर 1 का लघुगणक सदैव शून्य होता है: $\\log_b 1 = 0$।",
        "आधार और संख्या समान होने पर लघुगणक का मान 1 होता है: $\\log_b b = 1$।",
        "गुणन नियम: $\\log_b (m \\times n) = \\log_b m + \\log_b n$।",
        "भाग नियम: $\\log_b \\left(\\frac{m}{n}\\right) = \\log_b m - \\log_b n$।",
        "घात नियम: $\\log_b (m^k) = k \\log_b m$ तथा $\\log_{b^k} m = \\frac{1}{k} \\log_b m$।",
        "आधार परिवर्तन प्रमेय: $\\log_b a = \\frac{\\log_c a}{\\log_c b} = \\frac{1}{\\log_a b}$।",
        "सर्वसमिका: $b^{\\log_b x} = x$।"
      ]
    },

    chapters: [
      {
        id: "ch_1",
        title: "अध्याय 1: लघुगणक की संकल्पना, परिभाषा एवं आधार की शर्तें (Concept & Conditions)",
        content: `### 1.1 लघुगणक की परिभाषा (Definition)
यदि $a, b$ ऐसी वास्तविक संख्याएँ हों कि $b > 0, b \\neq 1$ तथा $a > 0$ हो, और:
$$b^x = a$$
तो $x$ को आधार $b$ पर $a$ का लघुगणक कहते हैं, जिसे संकेत रूप में:
$$x = \\log_b a$$
लिखा जाता है।
- इसे पढ़ा जाता है: *"log of a to the base b"*

---

### 1.2 तीन अनिवार्य शर्तें (Three Mandatory Conditions)
व्यंजक $\\log_b a$ केवल तभी परिभाषित (Defined) होता है जब:
1. **संख्या धनात्मक हो**: $a > 0$ (शून्य या ऋणात्मक संख्याओं का वास्तविक लघुगणक संभव नहीं है)।
2. **आधार धनात्मक हो**: $b > 0$।
3. **आधार 1 के बराबर न हो**: $b \\neq 1$ (चूँकि $1^x = 1$ सदैव होता है, जिससे किसी अन्य संख्या का मान निर्धारित नहीं किया जा सकता)।

---

### 1.3 लघुगणक के प्रकार (Types of Logarithms)
1. **प्राकृतिक लघुगणक (Natural Logarithm - $\\ln$)**:
   - इसका आधार आयलर नियतांक (Euler's Constant) $e \\approx 2.71828$ होता है।
   - इसे $\\ln x$ अथवा $\\log_e x$ लिखा जाता है। इसका उपयोग उच्च गणित एवं कैलकुलस में होता है।
2. **सामान्य लघुगणक (Common Logarithm - $\\log_{10}$)**:
   - इसका आधार $10$ होता है।
   - इसे $\\log_{10} x$ या केवल $\\log x$ लिखा जाता है। सामान्य अंकगणित एवं प्रतियोगी परीक्षाओं में आधार न दिया होने पर आधार सदैव $10$ माना जाता है।

---

### 1.4 घातांकी रूप से लघुगणक रूप में रूपांतरण (Conversion Table)
- $2^5 = 32 \\iff \\log_2 32 = 5$
- $10^3 = 1000 \\iff \\log_{10} 1000 = 3$
- $5^0 = 1 \\iff \\log_5 1 = 0$
- $3^{-2} = \\frac{1}{9} \\iff \\log_3 \\left(\\frac{1}{9}\\right) = -2$
- $10^{-3} = 0.001 \\iff \\log_{10} (0.001) = -3$`
      },
      {
        id: "ch_2",
        title: "अध्याय 2: लघुगणक के मूलभूत नियम एवं प्रमेय (Fundamental Laws of Logarithms)",
        content: `### 2.1 गुणन नियम (Product Rule)
समान आधार पर दो या दो से अधिक संख्याओं के गुणनफल का लघुगणक उनके पृथक लघुगणकों के योग के बराबर होता है:
$$\\log_b (m \\times n) = \\log_b m + \\log_b n$$
- व्यापक रूप: $\\log_b (m \\times n \\times p \\times \\dots) = \\log_b m + \\log_b n + \\log_b p + \\dots$
- **सावधानी**: $\\log(m + n) \\neq \\log m + \\log n$!

---

### 2.2 भाग नियम (Quotient Rule)
समान आधार पर दो संख्याओं के भागफल का लघुगणक अंश के लघुगणक और हर के लघुगणक के अंतर के बराबर होता है:
$$\\log_b \\left(\\frac{m}{n}\\right) = \\log_b m - \\log_b n$$
- **सावधानी**: $\\frac{\\log m}{\\log n} \\neq \\log m - \\log n$!

---

### 2.3 घात नियम (Power Rule)
संख्या की घात का लघुगणक उस घात और संख्या के लघुगणक के गुणनफल के बराबर होता है:
$$\\log_b (m^k) = k \\cdot \\log_b m$$

---

### 2.4 आधार की घात का नियम (Base-Power Rule)
यदि आधार पर घात लगी हो, तो वह आगे आकर व्युत्क्रम ($1/k$) के रूप में गुणा होती है:
$$\\log_{b^k} m = \\frac{1}{k} \\log_b m$$
- **संयुक्त घात नियम (Combined Power Rule)**:
  $$\\log_{b^k} (m^p) = \\frac{p}{k} \\log_b m$$

**व्यापम उदाहरण**: $\\log_8 16$ का मान ज्ञात कीजिए।
- **हल**: 
  $8 = 2^3$ तथा $16 = 2^4$
  $$\\log_8 16 = \\log_{2^3} (2^4) = \\frac{4}{3} \\log_2 2 = \\frac{4}{3} \\times 1 = \\frac{4}{3}$$`
      },
      {
        id: "ch_3",
        title: "अध्याय 3: आधार परिवर्तन प्रमेय एवं शृंखला नियम (Base Change Theorem & Chain Rule)",
        content: `### 3.1 आधार परिवर्तन प्रमेय (Base Change Formula)
किसी लघुगणक को किसी अन्य नए उभयनिष्ठ आधार $c$ के रूप में व्यक्त किया जा सकता है:
$$\\log_b a = \\frac{\\log_c a}{\\log_c b} = \\frac{\\log a}{\\log b}$$
यह प्रमेय उन प्रश्नों को हल करने का प्राण है जहाँ विभिन्न पदों के आधार अलग-अलग होते हैं।

---

### 3.2 व्युत्क्रम संबंध (Reciprocal Rule)
यदि संख्या और आधार को परस्पर बदल दिया जाए, तो लघुगणक का मान व्युत्क्रम हो जाता है:
$$\\log_b a = \\frac{1}{\\log_a b}$$
अर्थात:
$$\\log_b a \\cdot \\log_a b = 1$$

---

### 3.3 शृंखला नियम (Chain Rule of Logarithms)
लगातार बदलते आधार वाले पदों के गुणनफल में:
$$\\log_b a \\cdot \\log_c b \\cdot \\log_d c = \\log_d a$$
- भिन्न रूप में समझने पर:
  $$\\frac{\\log a}{\\log b} \\times \\frac{\\log b}{\\log c} \\times \\frac{\\log c}{\\log d} = \\frac{\\log a}{\\log d} = \\log_d a$$

**व्यापम मॉडल प्रश्न**: $\\log_2 3 \\cdot \\log_3 4 \\cdot \\log_4 5 \\dots \\log_{31} 32$ का मान क्या होगा?
- **हल**: 
  $$\\frac{\\log 3}{\\log 2} \\times \\frac{\\log 4}{\\log 3} \\times \\frac{\\log 5}{\\log 4} \\times \\dots \\times \\frac{\\log 32}{\\log 31} = \\frac{\\log 32}{\\log 2} = \\log_2 32$$
  चूँकि $32 = 2^5$:
  $$\\log_2 (2^5) = 5 \\log_2 2 = 5 \\times 1 = 5$$

---

### 3.4 प्रति-लघुगणकीय सर्वसमिका (Exponential-Log Identity)
$$b^{\\log_b x} = x$$
तथा व्यापक रूप में:
$$a^{\\log_b c} = c^{\\log_b a}$$`
      },
      {
        id: "ch_4",
        title: "अध्याय 4: पूर्णांश, अपूर्णांश एवं अंकों की संख्या ज्ञात करना (Characteristic & Mantissa)",
        content: `### 4.1 पूर्णांश और अपूर्णांश की संकल्पना (Characteristic & Mantissa)
किसी धनात्मक संख्या के आधार 10 पर लघुगणक के दो भाग होते हैं:
$$\\log_{10} N = \\text{पूर्णांश (Characteristic)} + \\text{अपूर्णांश (Mantissa)}$$
1. **पूर्णांश (Characteristic)**: यह एक पूर्णांक (धनात्मक, शून्य या ऋणात्मक) होता है। यह संख्या में दशमलव की स्थिति या संख्या के परिमाण को दर्शाता है।
2. **अपूर्णांश (Mantissa)**: यह सदैव एक **धनात्मक दशमलव भिन्न** ($0 \\le \\text{Mantissa} < 1$) होता है। इसे लघुगणक सारणी (Log Table) से देखा जाता है।

---

### 4.2 पूर्णांश ज्ञात करने के नियम (Rules for Characteristic)
1. **यदि संख्या $N > 1$ हो**:
   - पूर्णांश $= (\\text{दशमलव से पहले अंकों की संख्या}) - 1$
   - उदाहरण: $\\log_{10} 745.2$ में दशमलव से पहले 3 अंक हैं, अतः पूर्णांश $= 3 - 1 = 2$।
2. **यदि संख्या $0 < N < 1$ (दशमलव संख्या) हो**:
   - पूर्णांश $= -(\\text{दशमलव बिंदु और प्रथम अशून्य अंक के बीच शून्यों की संख्या} + 1)$
   - उदाहरण: $\\log_{10} 0.0045$ में दशमलव और 4 के बीच 2 शून्य हैं, अतः पूर्णांश $= -(2 + 1) = -3$ (इसे $\\bar{3}$ लिखा जाता है)।

---

### 4.3 अति-महत्वपूर्ण अनुप्रयोग: किसी बड़ी संख्या में कुल अंकों की संख्या ज्ञात करना
व्यापम में $a^n$ में कुल अंकों की संख्या निकालने संबंधी प्रश्न बार-बार आते हैं।
- **नियम**: यदि $N = a^n$ हो, तो $N$ में **कुल अंकों की संख्या**:
  $$\\text{कुल अंक} = [\\log_{10} N] + 1 = (\\text{पूर्णांश}) + 1$$
  जहाँ $[\\cdot]$ महत्तम पूर्णांक फलन (Greatest Integer Function) है।

**व्यापम प्रश्न**: $2^{50}$ में कुल कितने अंक होंगे? (दिया है: $\\log_{10} 2 = 0.30103$)
- **हल**: 
  माना $N = 2^{50}$
  $$\\log_{10} N = \\log_{10} (2^{50}) = 50 \\times \\log_{10} 2 = 50 \\times 0.30103 = 15.0515$$
  यहाँ पूर्णांश $= 15$
  अतः कुल अंकों की संख्या $= 15 + 1 = 16$ अंक।`
      },
      {
        id: "ch_5",
        title: "अध्याय 5: लघुगणकीय समीकरण एवं व्यापम स्पीड ट्रिक्स (Logarithmic Equations & Speed Tricks)",
        content: `### 5.1 लघुगणकीय समीकरण हल करने की तकनीक (Solving Equations)
1. **घातांक में परिवर्तन विधि**:
   $$\\log_b [f(x)] = k \\implies f(x) = b^k$$
   - **उदाहरण**: $\\log_3 (2x - 1) = 3 \\implies 2x - 1 = 3^3 = 27 \\implies 2x = 28 \\implies x = 14$।
2. **समान आधार पर तुलना विधि**:
   $$\\log_b [f(x)] = \\log_b [g(x)] \\implies f(x) = g(x) \\quad (\\text{जहाँ } f(x) > 0, g(x) > 0)$$

---

### 5.2 अमान्य मूलों की जाँच (Checking Extraneous Roots)
समीकरण हल करने के बाद प्राप्त $x$ के मानों को मूल समीकरण में रखकर यह सुनिश्चित करना अनिवार्य है कि किसी भी $\\log$ के अंदर का पद ऋणात्मक या शून्य न हो जाए। यदि $x$ रखने पर $\\log(\\text{ऋणात्मक})$ बनता है, तो वह मूल अमान्य (Extraneous Root) होगा।

---

### 5.3 व्यापम स्पीड ट्रिक्स (Logarithm Speed Hacks)
- **मानक मान याद रखें**:
  - $\\log_{10} 2 \\approx 0.3010$
  - $\\log_{10} 3 \\approx 0.4771$
  - $\\log_{10} 5 = \\log_{10} \\left(\\frac{10}{2}\\right) = \\log_{10} 10 - \\log_{10} 2 = 1 - 0.3010 = 0.6990$
  - $\\log_{10} 7 \\approx 0.8451$
- **सममित मानों में शून्य नियम**: यदि चक्रीय क्रम में व्यंजक दिया हो, जैसे:
  $$\\log \\left(\\frac{a}{b}\\right) + \\log \\left(\\frac{b}{c}\\right) + \\log \\left(\\frac{c}{a}\\right) = \\log \\left(\\frac{a}{b} \\times \\frac{b}{c} \\times \\frac{c}{a}\\right) = \\log 1 = 0$$`
      }
    ],

    comparativeTables: [
      {
        id: "tbl_1",
        title: "घातांकी रूप एवं लघुगणक रूप का तुलनात्मक रूपांतरण",
        headers: ["घातांकी रूप (Exponential)", "लघुगणक रूप (Logarithmic)", "आधार (Base)", "घात/लघुगणक मान (Power/Value)"],
        rows: [
          ["$$2^6 = 64$$", "$$\\log_2 64 = 6$$", "$$2$$", "$$6$$"],
          ["$$10^4 = 10000$$", "$$\\log_{10} 10000 = 4$$", "$$10$$", "$$4$$"],
          ["$$3^{-4} = \\frac{1}{81}$$", "$$\\log_3 \\left(\\frac{1}{81}\\right) = -4$$", "$$3$$", "$$-4$$"],
          ["$$7^1 = 7$$", "$$\\log_7 7 = 1$$", "$$7$$", "$$1$$"],
          ["$$a^0 = 1$$", "$$\\log_a 1 = 0$$", "$$a$$", "$$0$$"],
          ["$$\\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$$", "$$\\log_{1/2} \\left(\\frac{1}{8}\\right) = 3$$", "$$\\frac{1}{2}$$", "$$3$$"]
        ]
      },
      {
        id: "tbl_2",
        title: "लघुगणक के सर्वप्रमुख सूत्र एवं नियम (Master Formula Chart)",
        headers: ["नियम का नाम", "गणितीय सूत्र (Formula)", "उल्लेखनीय शर्त/विवरण"],
        rows: [
          [
            "गुणन नियम (Product Rule)",
            "$$\\log_b (m \\cdot n) = \\log_b m + \\log_b n$$",
            "गुणा योग में बदलता है ($m, n > 0$)"
          ],
          [
            "भाग नियम (Quotient Rule)",
            "$$\\log_b \\left(\\frac{m}{n}\\right) = \\log_b m - \\log_b n$$",
            "भाग घटाव में बदलता है"
          ],
          [
            "घात नियम (Power Rule)",
            "$$\\log_b (m^k) = k \\log_b m$$",
            "संख्या की घात आगे गुणा बन जाती है"
          ],
          [
            "आधार घात नियम",
            "$$\\log_{b^k} m = \\frac{1}{k} \\log_b m$$",
            "आधार की घात $1/k$ बनकर गुणा होती है"
          ],
          [
            "आधार परिवर्तन प्रमेय",
            "$$\\log_b a = \\frac{\\log_c a}{\\log_c b} = \\frac{1}{\\log_a b}$$",
            "भिन्न आधारों को समान करने हेतु"
          ],
          [
            "शृंखला नियम (Chain Rule)",
            "$$\\log_b a \\cdot \\log_c b \\cdot \\log_d c = \\log_d a$$",
            "लगातार गुणनफल में आधार व संख्या कटते हैं"
          ]
        ]
      },
      {
        id: "tbl_3",
        title: "आधार 10 के प्रमुख मानक मान एवं व्युत्पन्न मान (Log 10 Standard Table)",
        headers: ["संख्या (N)", "मान ($\\log_{10} N$)", "व्युत्पत्ति विधि (Derivation Shortcut)"],
        rows: [
          ["$$1$$", "$$0$$", "$$10^0 = 1$$"],
          ["$$2$$", "$$0.3010$$", "मूल मानक मान"],
          ["$$3$$", "$$0.4771$$", "मूल मानक मान"],
          ["$$4$$", "$$0.6020$$", "$$\\log(2^2) = 2 \\log 2 = 2 \\times 0.3010$$"],
          ["$$5$$", "$$0.6990$$", "$$\\log(10/2) = \\log 10 - \\log 2 = 1 - 0.3010$$"],
          ["$$6$$", "$$0.7781$$", "$$\\log(2 \\times 3) = \\log 2 + \\log 3 = 0.3010 + 0.4771$$"],
          ["$$8$$", "$$0.9030$$", "$$\\log(2^3) = 3 \\log 2 = 3 \\times 0.3010$$"],
          ["$$9$$", "$$0.9542$$", "$$\\log(3^2) = 2 \\log 3 = 2 \\times 0.4771$$"],
          ["$$10$$", "$$1.0000$$", "$$\\log_{10} 10 = 1$$"]
        ]
      }
    ],

    pyqs: [
      {
        id: "pyq_1",
        question: "यदि $\\log_{10} 2 = 0.3010$ हो, तो $\\log_{10} 50$ का मान क्या होगा? [CG Vyapam Patwari 2016]",
        options: ["1.6990", "1.3010", "1.7010", "2.3010"],
        correctOption: 0,
        explanation: "50 को $\\frac{100}{2}$ के रूप में लिखा जा सकता है:\n$$\\log_{10} 50 = \\log_{10} \\left(\\frac{100}{2}\\right)$$\nभाग नियम लगाने पर:\n$$\\log_{10} 100 - \\log_{10} 2$$\nचूँकि $100 = 10^2$, अतः $\\log_{10} 100 = 2$:\n$$= 2 - 0.3010 = 1.6990$$\nअतः $\\log_{10} 50 = 1.6990$।"
      },
      {
        id: "pyq_2",
        question: "यदि $\\log_2 [\\log_3 (\\log_2 x)] = 1$ हो, तो $x$ का मान क्या होगा? [CG Vyapam Hostel Warden 2016]",
        options: ["512", "256", "128", "64"],
        correctOption: 0,
        explanation: "घातांकी रूप में क्रमिक रूपांतरण करने पर:\n(1) $\\log_2 [\\log_3 (\\log_2 x)] = 1 \\implies \\log_3 (\\log_2 x) = 2^1 = 2$\n(2) $\\log_3 (\\log_2 x) = 2 \\implies \\log_2 x = 3^2 = 9$\n(3) $\\log_2 x = 9 \\implies x = 2^9 = 512$\nअतः सही उत्तर $x = 512$ है।"
      },
      {
        id: "pyq_3",
        question: "यदि $\\log_8 x = \\frac{2}{3}$ हो, तो $x$ का मान क्या है? [CG Vyapam RI 2018]",
        options: ["2", "4", "8", "16"],
        correctOption: 1,
        explanation: "लघुगणक की मूलभूत परिभाषा से:\n$$b^y = x \\implies 8^{2/3} = x$$\nचूँकि $8 = 2^3$:\n$$x = (2^3)^{2/3} = 2^{3 \\times (2/3)} = 2^2 = 4$$\nअतः $x = 4$।"
      },
      {
        id: "pyq_4",
        question: "व्यंजक $\\frac{1}{\\log_2 a} + \\frac{1}{\\log_3 a} + \\frac{1}{\\log_4 a}$ का मान किसके बराबर है? [CGPSC CSAT 2019]",
        options: ["$\\log_a 9$", "$\\log_a 24$", "$\\log_{24} a$", "$\\log_a 12$"],
        correctOption: 1,
        explanation: "व्युत्क्रम नियम $\\frac{1}{\\log_b a} = \\log_a b$ लगाने पर:\n$$\\frac{1}{\\log_2 a} = \\log_a 2$$\n$$\\frac{1}{\\log_3 a} = \\log_a 3$$\n$$\\frac{1}{\\log_4 a} = \\log_a 4$$\nअब तीनों पदों को जोड़ने पर समान आधार $a$ पर गुणन नियम लागू होगा:\n$$\\log_a 2 + \\log_a 3 + \\log_a 4 = \\log_a (2 \\times 3 \\times 4) = \\log_a 24$$\nअतः सही उत्तर $\\log_a 24$ है।"
      },
      {
        id: "pyq_5",
        question: "यदि $\\log_{10} 2 = 0.30103$ हो, तो $6^{15}$ में कुल कितने अंक होंगे? (दिया है: $\\log_{10} 3 = 0.47712$) [CG Vyapam Mandi Inspector 2021]",
        options: ["11", "12", "13", "14"],
        correctOption: 1,
        explanation: "माना $N = 6^{15}$\n$$\\log_{10} N = \\log_{10} (6^{15}) = 15 \\times \\log_{10} 6$$\n$$\\log_{10} 6 = \\log_{10} (2 \\times 3) = \\log_{10} 2 + \\log_{10} 3 = 0.30103 + 0.47712 = 0.77815$$\nअब:\n$$\\log_{10} N = 15 \\times 0.77815 = 11.67225$$\nयहाँ पूर्णांश (Characteristic) $= 11$ है।\nसंख्या में कुल अंकों की संख्या $= \\text{पूर्णांश} + 1 = 11 + 1 = 12$ अंक।\nअतः कुल 12 अंक होंगे।"
      },
      {
        id: "pyq_6",
        question: "यदि $\\log \\left(\\frac{x+y}{3}\\right) = \\frac{1}{2} (\\log x + \\log y)$ हो, तो $\\frac{x}{y} + \\frac{y}{x}$ का मान क्या होगा? [CG Vyapam Sub-Engineer 2019]",
        options: ["5", "7", "9", "11"],
        correctOption: 1,
        explanation: "दिया है: $\\log \\left(\\frac{x+y}{3}\\right) = \\frac{1}{2} (\\log x + \\log y) = \\frac{1}{2} \\log(xy) = \\log(xy)^{1/2} = \\log \\sqrt{xy}$\nदोनों ओर लघुगणक हटाने पर:\n$$\\frac{x+y}{3} = \\sqrt{xy}$$\n$$x + y = 3\\sqrt{xy}$$\nदोनों पक्षों का वर्ग करने पर:\n$$(x + y)^2 = 9xy$$\n$$x^2 + y^2 + 2xy = 9xy$$\n$$x^2 + y^2 = 7xy$$\nदोनों ओर $xy$ से भाग देने पर:\n$$\\frac{x^2}{xy} + \\frac{y^2}{xy} = 7 \\implies \\frac{x}{y} + \\frac{y}{x} = 7$$\nअतः सही उत्तर 7 है।"
      }
    ],

    mcqs: [
      {
        id: "mcq_1",
        question: "व्यंजक $\\log_3 2 \\cdot \\log_4 3 \\cdot \\log_5 4 \\cdot \\log_6 5 \\dots \\log_{16} 15$ का मान क्या होगा?",
        options: ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "4", "2"],
        correctOption: 0,
        explanation: "आधार परिवर्तन सूत्र से:\n$$\\frac{\\log 2}{\\log 3} \\times \\frac{\\log 3}{\\log 4} \\times \\frac{\\log 4}{\\log 5} \\times \\dots \\times \\frac{\\log 15}{\\log 16} = \\frac{\\log 2}{\\log 16} = \\log_{16} 2$$\nचूँकि $16 = 2^4$, अतः $\\log_{2^4} (2^1) = \\frac{1}{4} \\log_2 2 = \\frac{1}{4} \\times 1 = \\frac{1}{4}$।"
      },
      {
        id: "mcq_2",
        question: "यदि $\\log_{10} (x^2 - 6x + 45) = 2$ हो, तो $x$ के संभावित मान क्या होंगे?",
        options: ["11 और -5", "11 और 5", "-11 और 5", "-11 और -5"],
        correctOption: 0,
        explanation: "घातांक में बदलने पर:\n$$x^2 - 6x + 45 = 10^2 = 100$$\n$$x^2 - 6x + 45 - 100 = 0$$\n$$x^2 - 6x - 55 = 0$$\n$$(x - 11)(x + 5) = 0 \\implies x = 11 \\text{ अथवा } x = -5$$"
      },
      {
        id: "mcq_3",
        question: "यदि $\\log_a b = 3$ तथा $\\log_b c = 4$ हो, तो $\\log_a c$ का मान क्या होगा?",
        options: ["7", "1", "12", "$\\frac{4}{3}$"],
        correctOption: 2,
        explanation: "शृंखला नियम से:\n$$\\log_a c = \\log_a b \\cdot \\log_b c = 3 \\times 4 = 12$$"
      },
      {
        id: "mcq_4",
        question: "$\\log_{10} (0.0001)$ का मान क्या है?",
        options: ["-3", "-4", "4", "-5"],
        correctOption: 1,
        explanation: "$0.0001 = \\frac{1}{10000} = 10^{-4}$।\nअतः $\\log_{10} (10^{-4}) = -4 \\log_{10} 10 = -4$।"
      },
      {
        id: "mcq_5",
        question: "यदि $\\log_2 x + \\log_4 x + \\log_{16} x = \\frac{21}{4}$ हो, तो $x$ का मान क्या होगा?",
        options: ["8", "16", "32", "64"],
        correctOption: 0,
        explanation: "आधार घात नियम $\\log_{b^k} x = \\frac{1}{k} \\log_b x$ लगाने पर:\n$$\\log_2 x + \\frac{1}{2} \\log_2 x + \\frac{1}{4} \\log_2 x = \\frac{21}{4}$$\n$$\\log_2 x \\left(1 + \\frac{1}{2} + \\frac{1}{4}\\right) = \\frac{21}{4}$$\n$$\\log_2 x \\left(\\frac{7}{4}\\right) = \\frac{21}{4}$$\n$$\\log_2 x = 3 \\implies x = 2^3 = 8$$"
      },
      {
        id: "mcq_6",
        question: "निम्नलिखित में से कौन-सा कथन असत्य है?",
        options: [
          "$$\\log_b 1 = 0$$",
          "$$\\log_b b = 1$$",
          "$$\\log(m + n) = \\log m + \\log n$$",
          "$$\\log(m / n) = \\log m - \\log n$$"
        ],
        correctOption: 2,
        explanation: "$\\log(m + n) \\neq \\log m + \\log n$। गुणनफल का लघुगणक योग के बराबर होता है ($\\log(mn) = \\log m + \\log n$), न कि योग का लघुगणक।"
      },
      {
        id: "mcq_7",
        question: "यदि $a^x = b^y = c^z$ तथा $b^2 = ac$ हो, तो $y$ का मान क्या होगा?",
        options: [
          "$$\\frac{2xz}{x+z}$$",
          "$$\\frac{xz}{x+z}$$",
          "$$\\frac{x+z}{2}$$",
          "$$\\sqrt{xz}$$"
        ],
        correctOption: 0,
        explanation: "माना $a^x = b^y = c^z = k$\n$a = k^{1/x}, b = k^{1/y}, c = k^{1/z}$\nदिया है: $b^2 = ac$\n$$(k^{1/y})^2 = k^{1/x} \\cdot k^{1/z}$$\n$$k^{2/y} = k^{\\frac{1}{x} + \\frac{1}{z}}$$\nघातांकों की तुलना करने पर:\n$$\\frac{2}{y} = \\frac{1}{x} + \\frac{1}{z} = \\frac{x+z}{xz} \\implies y = \\frac{2xz}{x+z}$$\n(अर्थात $y$, $x$ और $z$ का हरात्मक माध्य - Harmonic Mean है)।"
      },
      {
        id: "mcq_8",
        question: "$7^{\\log_7 15}$ का मान क्या होगा?",
        options: ["7", "1", "15", "$\\frac{1}{15}$"],
        correctOption: 2,
        explanation: "सर्वसमिका $b^{\\log_b x} = x$ के अनुसार, $7^{\\log_7 15} = 15$।"
      }
    ],

    keyTerminology: [
      {
        term: "लघुगणक (Logarithm)",
        definition: "वह घात जिसे किसी दिए गए आधार पर लगाने से अभीष्ट संख्या प्राप्त होती है। घातांकी संक्रिया की प्रतिलोम क्रिया।"
      },
      {
        term: "सामान्य लघुगणक (Common Logarithm)",
        definition: "आधार 10 वाला लघुगणक, जिसे दशमलव संख्या पद्धति में व्यावहारिक व वैज्ञानिक गणनाओं के लिए उपयोग किया जाता है।"
      },
      {
        term: "प्राकृतिक लघुगणक (Natural Logarithm)",
        definition: "आधार $e$ ($e \\approx 2.71828$) वाला लघुगणक, जिसे $\\ln x$ से प्रदर्शित किया जाता है।"
      },
      {
        term: "पूर्णांश (Characteristic)",
        definition: "किसी संख्या के लघुगणक का पूर्णांक भाग, जो यह निर्धारित करता है कि संख्या में दशमलव से पूर्व कितने अंक हैं।"
      },
      {
        term: "अपूर्णांश (Mantissa)",
        definition: "लघुगणक का धनात्मक दशमलव भाग ($0 \\le M < 1$), जो संख्या के अंकों के अनुक्रम पर निर्भर करता है।"
      },
      {
        term: "आधार परिवर्तन प्रमेय (Base Change Theorem)",
        definition: "किसी भी लघुगणक के आधार को किसी तीसरे उभयनिष्ठ आधार के अनुपात के रूप में परिवर्तित करने का नियम $\\log_b a = \\frac{\\log_c a}{\\log_c b}$।"
      },
      {
        term: "व्युत्क्रम संबंध (Reciprocal Property)",
        definition: "संख्या और आधार को परस्पर बदलने पर लघुगणक के मान का उल्टा हो जाना ($\\log_b a = 1 / \\log_a b$)।"
      },
      {
        term: "अमान्य मूल (Extraneous Root)",
        definition: "समीकरण को हल करने पर प्राप्त ऐसा गणितीय मान जिसे मूल समीकरण में रखने पर लघुगणक का कोणांक ऋणात्मक या शून्य हो जाता है।"
      }
    ],

    sources: [
      {
        title: "NCERT Mathematics Class 11 - Appendix: Logarithms",
        author: "NCERT",
        year: 2023,
        type: "National Curriculum"
      },
      {
        title: "छत्तीसगढ़ माध्यमिक शिक्षा मण्डल गणित - लघुगणक एवं उसके नियम",
        author: "CGBSE",
        year: 2022,
        type: "State Board Textbook"
      },
      {
        title: "Quantitative Aptitude for Competitive Examinations - Chapter: Logarithms",
        author: "Dr. R.S. Aggarwal",
        year: 2023,
        type: "Reference Guide"
      },
      {
        title: "CG Vyapam Exam Analysis & Question Papers (2015-2024)",
        author: "CGPEB Official Papers",
        year: 2024,
        type: "Official Exam Archive"
      }
    ],

    confusionBuster: [
      {
        concept: "log(m+n) vs log(m) + log(n)",
        confusion: "छात्र भ्रमवश $\\log(m+n)$ को $\\log m + \\log n$ लिख देते हैं।",
        clarification: "यह सर्वथा असत्य है। गुणनफल योग में बदलता है: $\\log(mn) = \\log m + \\log n$। कोष्ठक के अंदर के योग $\\log(m+n)$ का कोई सीधा प्रसार सूत्र नहीं होता।"
      },
      {
        concept: "log(m/n) vs log(m) / log(n)",
        confusion: "$\\log(m/n)$ और $\\frac{\\log m}{\\log n}$ को एक ही मान लिया जाता है।",
        clarification: "$\\log(m/n) = \\log m - \\log n$ होता है, जबकि $\\frac{\\log m}{\\log n} = \\log_n m$ (आधार परिवर्तन) होता है।"
      },
      {
        concept: "ऋणात्मक संख्या का लघुगणक",
        confusion: "क्या $\\log(-5)$ का मान निकाला जा सकता है?",
        clarification: "वास्तविक संख्या पद्धति में शून्य या किसी भी ऋणात्मक संख्या का लघुगणक अपरिभाषित (Undefined) होता है।"
      },
      {
        concept: "अपूर्णांश (Mantissa) का सदैव धनात्मक होना",
        confusion: "यदि $\\log x = -2.3$ हो, तो छात्र पूर्णांश $-2$ और अपूर्णांश $-0.3$ मान लेते हैं।",
        clarification: "अपूर्णांश कभी ऋणात्मक नहीं हो सकता। $-2.3 = -3 + 0.7 = \\bar{3}.7$ लिखा जाता है, जहाँ पूर्णांश $-3$ और अपूर्णांश $+0.7$ है।"
      },
      {
        concept: "आधार की घात आगे लाना",
        confusion: "$\\log_{b^k} m$ में $k$ को सीधे आगे $k \\log_b m$ लिख दिया जाता है।",
        clarification: "संख्या की घात सीधे आगे आती है ($m^k \\implies k$), परन्तु आधार की घात व्युत्क्रम होकर आगे आती है ($b^k \\implies \\frac{1}{k}$)।"
      }
    ],

    faqList: [
      {
        question: "लघुगणक का आधार 1 क्यों नहीं हो सकता?",
        answer: "चूँकि $1^x = 1$ हमेशा रहता है (चाहे $x$ कुछ भी हो)। यदि $\\log_1 5 = x$ मानें, तो $1^x = 5$ होना चाहिए जो कि असंभव है।"
      },
      {
        question: "किसी संख्या में कुल अंकों की संख्या लघुगणक से कैसे निकालते हैं?",
        answer: "संख्या का आधार 10 पर लघुगणक निकालें। प्राप्त मान के पूर्णांक भाग (पूर्णांश) में 1 जोड़ दें। जैसे यदि $\\log_{10} N = 15.3$ हो, तो कुल अंक $15 + 1 = 16$ होंगे।"
      },
      {
        question: "प्राकृतिक लघुगणक (ln) और सामान्य लघुगणक (log) में क्या संबंध है?",
        answer: "$\\log_{10} x = \\frac{\\ln x}{\\ln 10} \\approx 0.4343 \\ln x$, तथा $\\ln x \\approx 2.3026 \\log_{10} x$।"
      },
      {
        question: "$\\log 5$ का मान बिना सारणी के कैसे निकाला जाए?",
        answer: "$5 = 10/2$ होता है। अतः $\\log_{10} 5 = \\log_{10} 10 - \\log_{10} 2 = 1 - 0.3010 = 0.6990$।"
      },
      {
        question: "व्यापम में नेपियर नियतांक e का मान कितना माना जाता है?",
        answer: "$e$ एक अपरिमेय संख्या है जिसका सन्निकट मान $2.71828$ होता है।"
      }
    ],

    oneLinerRevision: [
      "लघुगणक घातांक की व्युत्क्रम संक्रिया है: $b^x = a \\iff x = \\log_b a$।",
      "किसी भी आधार पर 1 का लघुगणक सदैव शून्य होता है: $\\log_b 1 = 0$।",
      "आधार और संख्या समान होने पर मान सदैव 1 होता है: $\\log_b b = 1$।",
      "गुणनफल योग में बदलता है: $\\log(mn) = \\log m + \\log n$।",
      "भागफल अंतर में बदलता है: $\\log(m/n) = \\log m - \\log n$।",
      "घात नियम: $\\log_{b^k} (m^p) = (p/k) \\log_b m$।",
      "आधार परिवर्तन प्रमेय: $\\log_b a = (\\log a) / (\\log b) = 1 / (\\log_a b)$।",
      "शृंखला नियम: $\\log_b a \\cdot \\log_c b \\cdot \\log_d c = \\log_d a$।",
      "संख्या $N$ में कुल अंकों की संख्या $= [\\log_{10} N] + 1$ होती है।",
      "$\\log_{10} 2 = 0.3010$, $\\log_{10} 3 = 0.4771$ तथा $\\log_{10} 5 = 0.6990$।"
    ],

    rapidRevision: "लघुगणक अध्याय में परीक्षा में पूर्ण अंक प्राप्त करने हेतु चार मुख्य स्तंभ याद रखें: (1) तीन मूलभूत नियम: log(mn) = log m + log n, log(m/n) = log m - log n, तथा log(m^k) = k log m, (2) आधार घात नियम: log_(b^k) m = (1/k) log_b m, (3) आधार परिवर्तन व शृंखला नियम: log_b a = (log a)/(log b) एवं चक्रीय गुणनफल, तथा (4) अंकों की संख्या ज्ञात करने हेतु [log10 N] + 1 का उपयोग। आधार 10 पर log 2, log 3 व log 5 के मानों का उपयोग करके व्यापम के 90% लघुगणकीय प्रश्न बिना सारणी के मौखिक हल किए जा सकते हैं।"
  }
};

async function upload() {
  console.log('Uploading study notes for math_alg_4 (Logarithm)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  await db.collection('topic_study_notes').doc('cgv_master_math_alg_4').set(sanitized);
  console.log('✅ cgv_master_math_alg_4 saved to Firestore topic_study_notes!');

  // Sync syllabi in Firestore
  const docRef = db.collection('syllabi').doc('cgv_master');
  const doc = await docRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    data.subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        ch.topics.forEach(t => {
          if (t.id === 'math_alg_4') {
            t.hasStudyNotes = true;
            updated = true;
          }
        });
      });
    });
    if (updated) {
      await docRef.set(data);
      console.log('✅ syllabi/cgv_master updated: math_alg_4 hasStudyNotes = true');
    }
  }

  console.log('\nUpload complete! 🚀');
}

upload().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
