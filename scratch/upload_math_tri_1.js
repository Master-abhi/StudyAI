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
  topicId: 'math_tri_1',
  updatedAt: new Date().toISOString(),
  studyNotes: {
    id: "cgv_master_math_tri_1",
    topicId: "math_tri_1",
    syllabusId: "cgv_master",
    subjectId: "cgv_master_sub_3",
    chapterId: "cgv_master_sub_3_ch_9",
    title: "त्रिकोणमितीय अनुपात (Trigonometric Ratios)",
    subtitle: "sin, cos, tan, मौलिक सर्वसमिकाएँ, पूरक कोण, मानक मान एवं अधिकतम-न्यूनतम मान",
    readTime: "25 min",
    difficultyLevel: "Intermediate",
    tags: ["Mathematics", "Trigonometry", "Trigonometric Ratios", "Identities", "Complementary Angles", "CG Vyapam"],

    overview: {
      introduction: "त्रिकोणमिति (Trigonometry) गणित की वह शाखा है जो समकोण त्रिभुज की भुजाओं की लंबाइयों और उनके कोणों के बीच संबंधों का अध्ययन करती है। इसके छह मौलिक अनुपात—$\\sin\\theta, \\cos\\theta, \\tan\\theta, \\csc\\theta, \\sec\\theta, \\cot\\theta$—हैं। यह विषय ज्यामिति, बीजगणित एवं कलन (Calculus) को परस्पर जोड़ता है। छत्तीसगढ़ व्यापम एवं राज्य स्तरीय प्रतियोगी परीक्षाओं में त्रिकोणमितीय अनुपातों के सीधे मान, मौलिक सर्वसमिकाएँ (Identities), पूरक कोणों के संबंध तथा व्यंजकों के अधिकतम व न्यूनतम मान से संबंधित प्रश्न पूछे जाते हैं।",
      importance: "व्यापम के सब-इंजीनियर, पटवारी, आर.आई., हॉस्टल वार्डन तथा CGPSC CSAT में त्रिकोणमिति से 2 से 3 प्रश्न निश्चित रूप से आते हैं। विशेष रूप से $\\sec\\theta + \\tan\\theta = x$ वाले प्रारूप, पूरक कोणों के चक्रीय गुणनफल (जैसे $\\tan 1^\\circ \\dots \\tan 89^\\circ = 1$) तथा मान प्रतिस्थापन विधि (Value-Putting Method) से प्रश्न अत्यंत सरलता व शीघ्रता से हल किए जा सकते हैं।",
      examRelevance: "CG Vyapam, CGPSC CSAT, SSC CGL/CHSL तथा रेलवे परीक्षाओं के लिए त्रिकोणमिति बीजगणित के बाद दूसरा सबसे महत्वपूर्ण उन्नत गणितीय खंड है।",
      quickFacts: [
        "समकोण त्रिभुज में: $\\sin\\theta = \\frac{\\text{लंब}}{\\text{कर्ण}}$, $\\cos\\theta = \\frac{\\text{आधार}}{\\text{कर्ण}}$, $\\tan\\theta = \\frac{\\text{लंब}}{\\text{आधार}}$।",
        "व्युत्क्रम संबंध: $\\csc\\theta = \\frac{1}{\\sin\\theta}$, $\\sec\\theta = \\frac{1}{\\cos\\theta}$, $\\cot\\theta = \\frac{1}{\\tan\\theta}$।",
        "सर्वसमिका 1: $\\sin^2\\theta + \\cos^2\\theta = 1$।",
        "सर्वसमिका 2: $\\sec^2\\theta - \\tan^2\\theta = 1 \\implies (\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1$।",
        "सर्वसमिका 3: $\\csc^2\\theta - \\cot^2\\theta = 1 \\implies (\\csc\\theta + \\cot\\theta)(\\csc\\theta - \\cot\\theta) = 1$।",
        "यदि $\\sec\\theta + \\tan\\theta = k$, तो $\\sec\\theta - \\tan\\theta = \\frac{1}{k}$ तथा $\\sec\\theta = \\frac{k^2+1}{2k}$।",
        "पूरक कोण सूत्र: $\\sin(90^\\circ - \\theta) = \\cos\\theta$, $\\tan(90^\\circ - \\theta) = \\cot\\theta$, $\\sec(90^\\circ - \\theta) = \\csc\\theta$।",
        "व्यंजक $a\\sin\\theta + b\\cos\\theta$ का अधिकतम मान $= +\\sqrt{a^2 + b^2}$ तथा न्यूनतम मान $= -\\sqrt{a^2 + b^2}$।"
      ]
    },

    chapters: [
      {
        id: "ch_1",
        title: "अध्याय 1: समकोण त्रिभुज एवं छह त्रिकोणमितीय अनुपात (Right Triangle & 6 Ratios)",
        content: `### 1.1 समकोण त्रिभुज के अवयव (Components of Right Triangle)
माना $\\triangle ABC$ में $\\angle B = 90^\\circ$ है तथा न्यूनकोण $\\angle C = \\theta$ है:
1. **कर्ण (Hypotenuse - $H$)**: समकोण ($90^\\circ$) के ठीक सम्मुख सबसे लंबी भुजा ($AC$)।
2. **लंब (Perpendicular / Opposite Side - $P$)**: विचाराधीन कोण $\\theta$ के ठीक सम्मुख भुजा ($AB$)।
3. **आधार (Base / Adjacent Side - $B$)**: कोण $\\theta$ से सटी हुई भुजा ($BC$)।
- **सावधानी**: लंब और आधार का निर्धारण कोण $\\theta$ की स्थिति पर निर्भर करता है। यदि कोण $\\angle A$ लिया जाए, तो लंब $BC$ और आधार $AB$ बन जाएगा!

---

### 1.2 छह त्रिकोणमितीय अनुपातों की परिभाषा (The 6 Ratios)
याद रखने का भारतीय लोकप्रिय सूत्र: **लाल / कक्का (LAL / KAKKA)**
- $L = \\text{लंब}$, $A = \\text{आधार}$, $K = \\text{कर्ण}$

1. **$\\sin\\theta$ (ज्या)**:
   $$\\sin\\theta = \\frac{\\text{लंब}}{\\text{कर्ण}} = \\frac{P}{H}$$
2. **$\\cos\\theta$ (कोज्या)**:
   $$\\cos\\theta = \\frac{\\text{आधार}}{\\text{कर्ण}} = \\frac{B}{H}$$
3. **$\\tan\\theta$ (स्पर्शज्या)**:
   $$\\tan\\theta = \\frac{\\text{लंब}}{\\text{आधार}} = \\frac{P}{B} = \\frac{\\sin\\theta}{\\cos\\theta}$$
4. **$\\csc\\theta$ (व्युत्क्रम ज्या)**:
   $$\\csc\\theta = \\frac{\\text{कर्ण}}{\\text{लंब}} = \\frac{H}{P} = \\frac{1}{\\sin\\theta}$$
5. **$\\sec\\theta$ (व्युत्क्रम कोज्या)**:
   $$\\sec\\theta = \\frac{\\text{कर्ण}}{\\text{आधार}} = \\frac{H}{B} = \\frac{1}{\\cos\\theta}$$
6. **$\\cot\\theta$ (व्युत्क्रम स्पर्शज्या)**:
   $$\\cot\\theta = \\frac{\\text{आधार}}{\\text{लंब}} = \\frac{B}{P} = \\frac{\\cos\\theta}{\\sin\\theta} = \\frac{1}{\\tan\\theta}$$

---

### 1.3 पाइथागोरस प्रमेय का अनुप्रयोग (Pythagorean Triplets)
$$H^2 = P^2 + B^2$$
- मानक त्रिक: $(3, 4, 5)$, $(5, 12, 13)$, $(7, 24, 25)$, $(8, 15, 17)$, $(9, 40, 41)$।`
      },
      {
        id: "ch_2",
        title: "अध्याय 2: विशिष्ट कोणों के त्रिकोणमितीय मान (Standard Values Table)",
        content: `### 2.1 विशिष्ट कोणों ($0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$) का मान चार्ट

| अनुपात | $0^\\circ$ | $30^\\circ$ | $45^\\circ$ | $60^\\circ$ | $90^\\circ$ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **$\\sin\\theta$** | $0$ | $\\frac{1}{2}$ | $\\frac{1}{\\sqrt{2}}$ | $\\frac{\\sqrt{3}}{2}$ | $1$ |
| **$\\cos\\theta$** | $1$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{\\sqrt{2}}$ | $\\frac{1}{2}$ | $0$ |
| **$\\tan\\theta$** | $0$ | $\\frac{1}{\\sqrt{3}}$ | $1$ | $\\sqrt{3}$ | $\\infty$ (अपरिभाषित) |
| **$\\csc\\theta$** | $\\infty$ | $2$ | $\\sqrt{2}$ | $\\frac{2}{\\sqrt{3}}$ | $1$ |
| **$\\sec\\theta$** | $1$ | $\\frac{2}{\\sqrt{3}}$ | $\\sqrt{2}$ | $2$ | $\\infty$ |
| **$\\cot\\theta$** | $\\infty$ | $\\sqrt{3}$ | $1$ | $\\frac{1}{\\sqrt{3}}$ | $0$ |

---

### 2.2 मान याद रखने की 'उंगली ट्रिक' (Fingers Trick for $\\sin\\theta$)
$$\\sin\\theta = \\frac{\\sqrt{\\text{नीचे की उँगलियों की संख्या}}}{2}$$
- $0^\\circ$: नीचे 0 उँगली $\\implies \\frac{\\sqrt{0}}{2} = 0$
- $30^\\circ$: नीचे 1 उँगली $\\implies \\frac{\\sqrt{1}}{2} = \\frac{1}{2}$
- $45^\\circ$: नीचे 2 उँगली $\\implies \\frac{\\sqrt{2}}{2} = \\frac{1}{\\sqrt{2}}$
- $60^\\circ$: नीचे 3 उँगली $\\implies \\frac{\\sqrt{3}}{2}$
- $90^\\circ$: नीचे 4 उँगली $\\implies \\frac{\\sqrt{4}}{2} = 1$

---

### 2.3 मानों की प्रवृत्ति (Behavior of Functions in $[0^\\circ, 90^\\circ]$)
1. जैसे-जैसे कोण $\\theta$ का मान $0^\\circ$ से $90^\\circ$ की ओर बढ़ता है:
   - $\\sin\\theta, \\tan\\theta, \\sec\\theta$ का मान **बढ़ता है**।
   - $\\cos\\theta, \\cot\\theta, \\csc\\theta$ का मान **घटता है**।
2. $\\theta = 45^\\circ$ पर: $\\sin 45^\\circ = \\cos 45^\\circ = \\frac{1}{\\sqrt{2}}$ तथा $\\tan 45^\\circ = \\cot 45^\\circ = 1$।`
      },
      {
        id: "ch_3",
        title: "अध्याय 3: पूरक कोणों के त्रिकोणमितीय अनुपात (Complementary Angles)",
        content: `### 3.1 पूरक कोणों के सूत्र (Complementary Formulas)
जब दो कोणों का योग $90^\\circ$ हो (अर्थात् $\\alpha + \\beta = 90^\\circ$):
1. **ज्या और कोज्या संबंध**:
   $$\\sin(90^\\circ - \\theta) = \\cos\\theta \\quad \\text{तथा} \\quad \\cos(90^\\circ - \\theta) = \\sin\\theta$$
2. **स्पर्शज्या और व्युत्क्रम स्पर्शज्या**:
   $$\\tan(90^\\circ - \\theta) = \\cot\\theta \\quad \\text{तथा} \\quad \\cot(90^\\circ - \\theta) = \\tan\\theta$$
3. **व्युत्क्रम संबंध**:
   $$\\sec(90^\\circ - \\theta) = \\csc\\theta \\quad \\text{तथा} \\quad \\csc(90^\\circ - \\theta) = \\sec\\theta$$

---

### 3.2 व्यापम के सुपर हिट शृंखला परिणाम (Series Results)
यदि $\\alpha + \\beta = 90^\\circ$ हो, तो:
1. **गुणनफल नियम**:
   $$\\tan\\alpha \\cdot \\tan\\beta = 1 \\quad \\text{तथा} \\quad \\cot\\alpha \\cdot \\cot\\beta = 1$$
   - *व्यापम क्लासिक प्रश्न*:
     $$\\tan 1^\\circ \\cdot \\tan 2^\\circ \\cdot \\tan 3^\\circ \\dots \\tan 89^\\circ = 1$$
     *(क्योंकि $\\tan 1^\\circ \\cdot \\tan 89^\\circ = 1, \\dots, \\tan 45^\\circ = 1$)*।
2. **वर्गों का योगफल नियम**:
   $$\\sin^2\\alpha + \\sin^2\\beta = 1 \\quad \\text{तथा} \\quad \\cos^2\\alpha + \\cos^2\\beta = 1$$
   - *उदाहरण*: $\\sin^2 20^\\circ + \\sin^2 70^\\circ = \\sin^2 20^\\circ + \\cos^2 20^\\circ = 1$।
3. **भागफल नियम**:
   $$\\frac{\\sin\\alpha}{\\cos\\beta} = 1, \\quad \\frac{\\tan\\alpha}{\\cot\\beta} = 1, \\quad \\frac{\\sec\\alpha}{\\csc\\beta} = 1$$`
      },
      {
        id: "ch_4",
        title: "अध्याय 4: मौलिक सर्वसमिकाएँ एवं बीजीय अनुप्रयोग (Fundamental Identities)",
        content: `### 4.1 तीन मौलिक सर्वसमिकाएँ (Three Fundamental Identities)

#### सर्वसमिका 1:
$$\\sin^2\\theta + \\cos^2\\theta = 1$$
- $\\sin^2\\theta = 1 - \\cos^2\\theta \\implies \\sin\\theta = \\sqrt{1 - \\cos^2\\theta}$
- $\\cos^2\\theta = 1 - \\sin^2\\theta \\implies \\cos\\theta = \\sqrt{1 - \\sin^2\\theta}$

#### सर्वसमिका 2:
$$\\sec^2\\theta - \\tan^2\\theta = 1$$
- $\\sec^2\\theta = 1 + \\tan^2\\theta$
- $\\tan^2\\theta = \\sec^2\\theta - 1$
- **बीजीय गुणनखंडन**: $(\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1$
  $$\\sec\\theta - \\tan\\theta = \\frac{1}{\\sec\\theta + \\tan\\theta}$$

#### सर्वसमिका 3:
$$\\csc^2\\theta - \\cot^2\\theta = 1$$
- $\\csc^2\\theta = 1 + \\cot^2\\theta$
- $\\cot^2\\theta = \\csc^2\\theta - 1$
- **बीजीय गुणनखंडन**:
  $$\\csc\\theta - \\cot\\theta = \\frac{1}{\\csc\\theta + \\cot\\theta}$$

---

### 4.2 व्यापम का सर्वाधिक पूछा जाने वाला $k$ और $1/k$ प्रारूप
यदि $\\sec\\theta + \\tan\\theta = k$ दिया हो:
1. $\\sec\\theta - \\tan\\theta = \\frac{1}{k}$
2. दोनों समीकरणों को जोड़ने पर:
   $$2\\sec\\theta = k + \\frac{1}{k} = \\frac{k^2 + 1}{k} \\implies \\sec\\theta = \\frac{k^2 + 1}{2k}$$
3. घटाने पर:
   $$2\\tan\\theta = k - \\frac{1}{k} = \\frac{k^2 - 1}{k} \\implies \\tan\\theta = \\frac{k^2 - 1}{2k}$$
4. $\\sin\\theta = \\frac{\\tan\\theta}{\\sec\\theta} = \\frac{k^2 - 1}{k^2 + 1}$।

**व्यापम प्रश्न**: यदि $\\sec\\theta + \\tan\\theta = 3$ हो, तो $\\cos\\theta$ का मान क्या होगा?
- **हल**: $\\sec\\theta = \\frac{3^2 + 1}{2(3)} = \\frac{10}{6} = \\frac{5}{3} \\implies \\cos\\theta = \\frac{3}{5}$।`
      },
      {
        id: "ch_5",
        title: "अध्याय 5: अधिकतम एवं न्यूनतम मान तथा वैल्यू पुटिंग ट्रिक (Max-Min & Value-Putting)",
        content: `### 5.1 व्यंजक $a\\sin\\theta \\pm b\\cos\\theta$ के चरम मान (Extremum Values)
व्यंजक $f(\\theta) = a\\sin\\theta + b\\cos\\theta$ के लिए:
1. **अधिकतम मान (Maximum Value)**:
   $$\\text{Max} = +\\sqrt{a^2 + b^2}$$
2. **न्यूनतम मान (Minimum Value)**:
   $$\\text{Min} = -\\sqrt{a^2 + b^2}$$

**उदाहरण**: $3\\sin\\theta + 4\\cos\\theta$ का अधिकतम मान $= +\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ तथा न्यूनतम मान $= -5$।

---

### 5.2 अन्य महत्वपूर्ण अधिकतम एवं न्यूनतम मान
1. **$a\\sin^2\\theta + b\\cos^2\\theta$**:
   - यदि $a > b$: अधिकतम मान $= a$, न्यूनतम मान $= b$।
   - यदि $a < b$: अधिकतम मान $= b$, न्यूनतम मान $= a$।
   *(अर्थात् जो गुणांक बड़ा है वही अधिकतम, जो छोटा है वही न्यूनतम)*।
2. **व्युत्क्रम पदों का योग ($a\\sin^2\\theta + b\\csc^2\\theta$)**:
   $$\\text{न्यूनतम मान} = 2\\sqrt{ab}$$
   *(इसी प्रकार $a\\cos^2\\theta + b\\sec^2\\theta$ तथा $a\\tan^2\\theta + b\\cot^2\\theta$ का न्यूनतम मान भी $2\\sqrt{ab}$ होता है)*।

---

### 5.3 व्यापम स्पीड ट्रिक: मान प्रतिस्थापन विधि (Value-Putting Technique)
वस्तुनिष्ठ बहुविकल्पीय प्रश्नों में कठिन त्रिकोणमितीय व्यंजकों को सिद्ध करने के स्थान पर $\\theta$ का कोई उपयुक्त मान रखकर विकल्पों की जाँच करें:
- यदि व्यंजक में केवल $\\sin$ और $\\cos$ हों $\\implies \\theta = 0^\\circ$ या $90^\\circ$ रखें।
- यदि व्यंजक में $\\tan$ और $\\cot$ हों $\\implies \\theta = 45^\\circ$ रखें ($\\\\tan 45^\\circ = \\cot 45^\\circ = 1$)।
- यदि व्यंजक में $\\sec$ और $\\csc$ हों $\\implies \\theta = 45^\\circ$ रखें (ताकि अपरिभाषित पद न बने)।`
      }
    ],

    comparativeTables: [
      {
        id: "tbl_1",
        title: "छह त्रिकोणमितीय अनुपातों के विशिष्ट कोणों के मानों का मास्टर चार्ट",
        headers: ["फलन", "0°", "30°", "45°", "60°", "90°"],
        rows: [
          ["$$\\sin\\theta$$", "$$0$$", "$$\\frac{1}{2}$$", "$$\\frac{1}{\\sqrt{2}}$$", "$$\\frac{\\sqrt{3}}{2}$$", "$$1$$"],
          ["$$\\cos\\theta$$", "$$1$$", "$$\\frac{\\sqrt{3}}{2}$$", "$$\\frac{1}{\\sqrt{2}}$$", "$$\\frac{1}{2}$$", "$$0$$"],
          ["$$\\tan\\theta$$", "$$0$$", "$$\\frac{1}{\\sqrt{3}}$$", "$$1$$", "$$\\sqrt{3}$$", "अपरिभाषित ($$\\infty$$)"],
          ["$$\\csc\\theta$$", "अपरिभाषित ($$\\infty$$)", "$$2$$", "$$\\sqrt{2}$$", "$$\\frac{2}{\\sqrt{3}}$$", "$$1$$"],
          ["$$\\sec\\theta$$", "$$1$$", "$$\\frac{2}{\\sqrt{3}}$$", "$$\\sqrt{2}$$", "$$2$$", "अपरिभाषित ($$\\infty$$)"],
          ["$$\\cot\\theta$$", "अपरिभाषित ($$\\infty$$)", "$$\\sqrt{3}$$", "$$1$$", "$$\\frac{1}{\\sqrt{3}}$$", "$$0$$"]
        ]
      },
      {
        id: "tbl_2",
        title: "त्रिकोणमितीय फलनों के अधिकतम एवं न्यूनतम मानों की तुलना",
        headers: ["व्यंजक का प्रारूप", "अधिकतम मान (Maximum)", "न्यूनतम मान (Minimum)", "शर्त / टिप्पणी"],
        rows: [
          ["$$\\sin\\theta$$", "$$+1$$", "$$-1$$", "सभी वास्तविक $$\\theta$$ हेतु"],
          ["$$\\cos\\theta$$", "$$+1$$", "$$-1$$", "सभी वास्तविक $$\\theta$$ हेतु"],
          ["$$a\\sin\\theta + b\\cos\\theta$$", "$$+\\sqrt{a^2+b^2}$$", "$$-\\sqrt{a^2+b^2}$$", "व्यापम का सर्वाधिक पसंदीदा"],
          ["$$a\\sin^2\\theta + b\\cos^2\\theta$$ ($$a>b$$)", "$$a$$", "$$b$$", "गुणांकों पर सीधे निर्भर"],
          ["$$a\\tan^2\\theta + b\\cot^2\\theta$$", "$$\\infty$$", "$$2\\sqrt{ab}$$", "$$a, b > 0$$"],
          ["$$a\\sin^2\\theta + b\\csc^2\\theta$$", "$$\\infty$$", "$$2\\sqrt{ab}$$", "$$b \\le a$$"]
        ]
      },
      {
        id: "tbl_3",
        title: "पूरक कोण संबंध एवं शृंखला नियमों का मास्टर चार्ट",
        headers: ["संबंध", "गणितीय परिणाम", "व्यापम उदाहरण"],
        rows: [
          [
            "$$\\alpha + \\beta = 90^\\circ$$ पर गुणनफल",
            "$$\\tan\\alpha \\cdot \\tan\\beta = 1$$",
            "$$\\tan 20^\\circ \\cdot \\tan 70^\\circ = 1$$"
          ],
          [
            "$$\\alpha + \\beta = 90^\\circ$$ पर कोटि-गुणनफल",
            "$$\\cot\\alpha \\cdot \\cot\\beta = 1$$",
            "$$\\cot 15^\\circ \\cdot \\cot 75^\\circ = 1$$"
          ],
          [
            "$$\\alpha + \\beta = 90^\\circ$$ पर वर्गों का योग",
            "$$\\sin^2\\alpha + \\sin^2\\beta = 1$$",
            "$$\\sin^2 35^\\circ + \\sin^2 55^\\circ = 1$$"
          ],
          [
            "$$\\alpha + \\beta = 90^\\circ$$ पर कोज्या वर्ग योग",
            "$$\\cos^2\\alpha + \\cos^2\\beta = 1$$",
            "$$\\cos^2 10^\\circ + \\cos^2 80^\\circ = 1$$"
          ]
        ]
      }
    ],

    pyqs: [
      {
        id: "pyq_1",
        question: "यदि $\\tan\\theta = \\frac{4}{3}$ हो, तो $\\frac{3\\sin\\theta + 2\\cos\\theta}{3\\sin\\theta - 2\\cos\\theta}$ का मान क्या होगा? [CG Vyapam Patwari 2017]",
        options: ["3", "4", "5", "6"],
        correctOption: 0,
        explanation: "अंश और हर दोनों को $\\cos\\theta$ से भाग देने पर:\n$$\\frac{3\\frac{\\sin\\theta}{\\cos\\theta} + 2}{3\\frac{\\sin\\theta}{\\cos\\theta} - 2} = \\frac{3\\tan\\theta + 2}{3\\tan\\theta - 2}$$\n$\\tan\\theta = \\frac{4}{3}$ रखने पर:\n$$= \\frac{3\\left(\\frac{4}{3}\\right) + 2}{3\\left(\\frac{4}{3}\\right) - 2} = \\frac{4 + 2}{4 - 2} = \\frac{6}{2} = 3$$\nअतः सही उत्तर 3 है।"
      },
      {
        id: "pyq_2",
        question: "व्यंजक $\\tan 1^\\circ \\cdot \\tan 2^\\circ \\cdot \\tan 3^\\circ \\dots \\tan 89^\\circ$ का मान क्या होगा? [CG Vyapam Hostel Warden 2016]",
        options: ["0", "1", "$\\frac{1}{2}$", "$\\infty$"],
        correctOption: 1,
        explanation: "पूरक कोण नियम से $\\tan\\theta \\cdot \\tan(90^\\circ - \\theta) = 1$ होता है:\n$$\\tan 1^\\circ \\cdot \\tan 89^\\circ = 1$$\n$$\\tan 2^\\circ \\cdot \\tan 88^\\circ = 1$$\n$$\\dots$$\n$$\\tan 44^\\circ \\cdot \\tan 46^\\circ = 1$$\nमध्य में केवल $\\tan 45^\\circ$ बचेगा जिसका मान $1$ होता है।\nकुल गुणनफल $= 1 \\times 1 \\times \\dots \\times 1 = 1$।"
      },
      {
        id: "pyq_3",
        question: "यदि $\\sec\\theta + \\tan\\theta = 2$ हो, तो $\\sin\\theta$ का मान क्या होगा? [CG Vyapam RI 2018]",
        options: ["$\\frac{3}{5}$", "$\\frac{4}{5}$", "$\\frac{5}{3}$", "$\\frac{1}{2}$"],
        correctOption: 0,
        explanation: "दिया है: $\\sec\\theta + \\tan\\theta = 2$\nअतः $\\sec\\theta - \\tan\\theta = \\frac{1}{2}$\nजोड़ने पर: $2\\sec\\theta = 2 + \\frac{1}{2} = \\frac{5}{2} \\implies \\sec\\theta = \\frac{5}{4} \\implies \\cos\\theta = \\frac{4}{5}$\nसमकोण त्रिभुज में आधार $= 4$, कर्ण $= 5$ तो लंब $= \\sqrt{5^2 - 4^2} = 3$।\nअतः $\\sin\\theta = \\frac{\\text{लंब}}{\\text{कर्ण}} = \\frac{3}{5}$।"
      },
      {
        id: "pyq_4",
        question: "व्यंजक $7\\sin\\theta + 24\\cos\\theta$ का अधिकतम मान क्या होगा? [CGPSC CSAT 2021]",
        options: ["24", "25", "31", "17"],
        correctOption: 1,
        explanation: "$a\\sin\\theta + b\\cos\\theta$ का अधिकतम मान $= +\\sqrt{a^2 + b^2}$ होता है:\nयहाँ $a = 7, b = 24$:\n$$\\text{Max} = \\sqrt{7^2 + 24^2} = \\sqrt{49 + 576} = \\sqrt{625} = 25$$\nअतः अधिकतम मान 25 है।"
      },
      {
        id: "pyq_5",
        question: "$\\sin^2 5^\\circ + \\sin^2 10^\\circ + \\sin^2 15^\\circ + \\dots + \\sin^2 85^\\circ + \\sin^2 90^\\circ$ का मान क्या होगा? [CG Vyapam Mandi Inspector 2021]",
        options: ["$8.5$", "$9.5$", "$9$", "$10$"],
        correctOption: 1,
        explanation: "पदों की संख्या: $5, 10, \\dots, 85$ में कुल 17 पद हैं।\nयुग्म बनाने पर: $(\\sin^2 5^\\circ + \\sin^2 85^\\circ) + (\\sin^2 10^\\circ + \\sin^2 80^\\circ) + \\dots = 1 + 1 + \\dots$ (कुल 8 जोड़े $= 8$)।\nमध्य पद $\\sin^2 45^\\circ = \\left(\\frac{1}{\\sqrt{2}}\\right)^2 = \\frac{1}{2}$।\nअंतिम पद $\\sin^2 90^\\circ = 1^2 = 1$।\nकुल योग $= 8 + \\frac{1}{2} + 1 = 9.5$।"
      },
      {
        id: "pyq_6",
        question: "यदि $\\sin\\theta + \\csc\\theta = 2$ हो, तो $\\sin^7\\theta + \\csc^7\\theta$ का मान क्या होगा? [CG Vyapam Sub-Engineer 2019]",
        options: ["1", "2", "$2^7$", "14"],
        correctOption: 1,
        explanation: "$\\sin\\theta + \\frac{1}{\\sin\\theta} = 2$ केवल तभी संभव है जब $\\sin\\theta = 1$ हो (अर्थात् $\\theta = 90^\\circ$)।\nतब $\\csc\\theta = 1$ होगा।\nअतः $\\sin^7\\theta + \\csc^7\\theta = (1)^7 + (1)^7 = 1 + 1 = 2$।"
      }
    ],

    mcqs: [
      {
        id: "mcq_1",
        question: "व्यंजक $\\frac{\\cos 37^\\circ}{\\sin 53^\\circ}$ का मान क्या होगा?",
        options: ["0", "1", "$\\frac{1}{2}$", "$\\infty$"],
        correctOption: 1,
        explanation: "चूँकि $37^\\circ + 53^\\circ = 90^\\circ$ (पूरक कोण हैं):\n$$\\sin 53^\\circ = \\sin(90^\\circ - 37^\\circ) = \\cos 37^\\circ$$\nअतः $\\frac{\\cos 37^\\circ}{\\cos 37^\\circ} = 1$।"
      },
      {
        id: "mcq_2",
        question: "यदि $5\\tan\\theta = 4$ हो, तो $\\frac{5\\sin\\theta - 3\\cos\\theta}{5\\sin\\theta + 2\\cos\\theta}$ का मान क्या है?",
        options: ["$\\frac{1}{6}$", "$\\frac{1}{4}$", "$\\frac{4}{5}$", "$\\frac{2}{3}$"],
        correctOption: 0,
        explanation: "अंश और हर को $\\cos\\theta$ से भाग देने पर: $\\frac{5\\tan\\theta - 3}{5\\tan\\theta + 2}$।\n$5\\tan\\theta = 4$ रखने पर: $\\frac{4 - 3}{4 + 2} = \\frac{1}{6}$।"
      },
      {
        id: "mcq_3",
        question: "व्यंजक $9\\tan^2\\theta + 4\\cot^2\\theta$ का न्यूनतम मान क्या होगा?",
        options: ["12", "13", "36", "6"],
        correctOption: 0,
        explanation: "$a\\tan^2\\theta + b\\cot^2\\theta$ का न्यूनतम मान $= 2\\sqrt{ab}$ होता है:\n$$= 2\\sqrt{9 \\times 4} = 2\\sqrt{36} = 2 \\times 6 = 12$$"
      },
      {
        id: "mcq_4",
        question: "यदि $\\cos\\theta + \\sec\\theta = 2$ हो, तो $\\cos^{10}\\theta + \\sec^{10}\\theta$ का मान क्या होगा?",
        options: ["$2^{10}$", "20", "2", "1"],
        correctOption: 2,
        explanation: "$\\cos\\theta + \\frac{1}{\\cos\\theta} = 2 \\implies \\cos\\theta = 1$ तथा $\\sec\\theta = 1$।\nअतः $(1)^{10} + (1)^{10} = 1 + 1 = 2$।"
      },
      {
        id: "mcq_5",
        question: "व्यंजक $(\\sin\\theta + \\cos\\theta)^2 + (\\sin\\theta - \\cos\\theta)^2$ का मान क्या होगा?",
        options: ["1", "2", "$4\\sin\\theta\\cos\\theta$", "0"],
        correctOption: 1,
        explanation: "$$(\\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta) + (\\sin^2\\theta + \\cos^2\\theta - 2\\sin\\theta\\cos\\theta)$$\n$$= 1 + 1 = 2$$"
      },
      {
        id: "mcq_6",
        question: "यदि $\\tan(2\\theta + 45^\\circ) = \\cot 3\\theta$ हो, जहाँ $(2\\theta + 45^\\circ)$ और $3\\theta$ न्यूनकोण हैं, तो $\\theta$ का मान क्या होगा?",
        options: ["$5^\\circ$", "$9^\\circ$", "$12^\\circ$", "$15^\\circ$"],
        correctOption: 1,
        explanation: "चूँकि $\\tan A = \\cot B \\implies A + B = 90^\\circ$:\n$$(2\\theta + 45^\\circ) + 3\\theta = 90^\\circ$$\n$$5\\theta + 45^\\circ = 90^\\circ \\implies 5\\theta = 45^\\circ \\implies \\theta = 9^\\circ$$"
      },
      {
        id: "mcq_7",
        question: "व्यंजक $4\\sin^2\\theta + 9\\cos^2\\theta$ का अधिकतम मान क्या होगा?",
        options: ["4", "9", "13", "5"],
        correctOption: 1,
        explanation: "$a\\sin^2\\theta + b\\cos^2\\theta$ में जो गुणांक बड़ा होता है वही अधिकतम मान होता है। चूँकि $9 > 4$, अतः अधिकतम मान 9 होगा (जब $\\theta = 0^\\circ$ हो)।"
      },
      {
        id: "mcq_8",
        question: "यदि $\\sin\\theta - \\cos\\theta = 0$ हो, तो $\\sin^4\\theta + \\cos^4\\theta$ का मान क्या होगा?",
        options: ["1", "$\\frac{1}{2}$", "$\\frac{1}{4}$", "$\\frac{3}{4}$"],
        correctOption: 1,
        explanation: "$\\sin\\theta = \\cos\\theta \\implies \\theta = 45^\\circ$।\n$$\\sin^4 45^\\circ + \\cos^4 45^\\circ = \\left(\\frac{1}{\\sqrt{2}}\\right)^4 + \\left(\\frac{1}{\\sqrt{2}}\\right)^4 = \\frac{1}{4} + \\frac{1}{4} = \\frac{2}{4} = \\frac{1}{2}$$"
      }
    ],

    keyTerminology: [
      {
        term: "त्रिकोणमितीय अनुपात (Trigonometric Ratio)",
        definition: "समकोण त्रिभुज की किन्हीं दो भुजाओं के अनुपात को किसी न्यूनकोण के सापेक्ष व्यक्त करने वाला गणितीय फलन।"
      },
      {
        term: "सर्वसमिका (Identity)",
        definition: "ऐसा बीजीय अथवा त्रिकोणमितीय समीकरण जो उसमें प्रयुक्त चर (कोण) के प्रत्येक मान्य मान के लिए सदैव सत्य होता है।"
      },
      {
        term: "पूरक कोण (Complementary Angles)",
        definition: "वे दो कोण जिनका योग $90^\\circ$ होता है, जैसे $\\theta$ और $90^\\circ - \\theta$।"
      },
      {
        term: "चरम मान (Extremum Values)",
        definition: "किसी त्रिकोणमितीय फलन अथवा व्यंजक द्वारा प्राप्त किया जाने वाला उच्चतम (Maximum) अथवा न्यूनतम (Minimum) संख्यात्मक मान।"
      },
      {
        term: "मान प्रतिस्थापन विधि (Value-Putting Method)",
        definition: "वस्तुनिष्ठ परीक्षा में व्यंजकों को सिद्ध करने के स्थान पर $\\theta = 0^\\circ, 45^\\circ, 90^\\circ$ रखकर विकल्प जाँचने की तीव्र तकनीक।"
      },
      {
        term: "पाइथागोरियन त्रिक (Pythagorean Triplet)",
        definition: "तीन धन पूर्णांकों का ऐसा समूह ($a, b, c$) जो $a^2 + b^2 = c^2$ को संतुष्ट करता है, जैसे $3, 4, 5$।"
      },
      {
        term: "व्युत्क्रम अनुपात (Reciprocal Ratios)",
        definition: "वे अनुपात जिनका गुणनफल 1 होता है, जैसे $\\sin\\theta \\cdot \\csc\\theta = 1$ तथा $\\cos\\theta \\cdot \\sec\\theta = 1$।"
      },
      {
        term: "अपरिभाषित मान (Undefined Value)",
        definition: "शून्य से विभाजन की स्थिति ($1/0$), जिसे $\\infty$ द्वारा व्यक्त किया जाता है, जैसे $\\tan 90^\\circ$ तथा $\\cot 0^\\circ$।"
      }
    ],

    sources: [
      {
        title: "NCERT Mathematics Class 10 - Chapter 8: Introduction to Trigonometry",
        author: "NCERT",
        year: 2023,
        type: "National Curriculum"
      },
      {
        title: "छत्तीसगढ़ माध्यमिक शिक्षा मण्डल कक्षा 10 गणित - त्रिकोणमितीय अनुपात एवं सर्वसमिकाएँ",
        author: "CGBSE",
        year: 2022,
        type: "State Board Textbook"
      },
      {
        title: "Advanced Trigonometry for Competitive Examinations",
        author: "Dr. R.S. Aggarwal",
        year: 2023,
        type: "Reference Guide"
      },
      {
        title: "CGPEB Vyapam Solved Exam Papers Archive (2015-2024)",
        author: "CGPEB Exam Board",
        year: 2024,
        type: "Official Exam Archive"
      }
    ],

    confusionBuster: [
      {
        concept: "लंब और आधार का परिवर्तन",
        confusion: "छात्र सदैव क्षैतिज भुजा को आधार और ऊर्ध्वाधर को लंब मान लेते हैं।",
        clarification: "लंब और आधार का निर्धारण कोण $\\theta$ से होता है। कोण $\\theta$ के ठीक सामने वाली भुजा सदैव लंब होती है और कोण से सटी भुजा आधार होती है।"
      },
      {
        concept: "sin²θ vs sin θ²",
        confusion: "छात्र $\\sin^2\\theta$ और $\\sin(\\theta^2)$ को समान समझ लेते हैं।",
        clarification: "$\\sin^2\\theta$ का अर्थ $(\\sin\\theta)^2$ (फलन के मान का वर्ग) होता है, जबकि $\\sin(\\theta^2)$ में कोण के मान का वर्ग किया जाता है।"
      },
      {
        concept: "sec²θ - tan²θ = 1 में चिन्ह की भूल",
        confusion: "छात्र $\\sec^2\\theta + \\tan^2\\theta = 1$ लिख देते हैं।",
        clarification: "केवल $\\sin^2\\theta + \\cos^2\\theta = 1$ में जोड़ ($+$) होता है। शेष दोनों में घटाव ($-$) होता है: $\\sec^2\\theta - \\tan^2\\theta = 1$ तथा $\\csc^2\\theta - \\cot^2\\theta = 1$।"
      },
      {
        concept: "पूरक कोणों में फलन का रूपांतरण",
        confusion: "$\\sin(90^\\circ - \\theta)$ को $\\csc\\theta$ मान लेना।",
        clarification: "व्युत्क्रम और पूरक अलग-अलग हैं! $\\sin$ का व्युत्क्रम $\\csc$ है, परन्तु $\\sin$ का पूरक $\\cos$ है: $\\sin(90^\\circ - \\theta) = \\cos\\theta$।"
      },
      {
        concept: "tan 90° का मान 0 समझना",
        confusion: "छात्र $\\tan 0^\\circ$ और $\\tan 90^\\circ$ में भ्रमित हो जाते हैं।",
        clarification: "$\\tan 0^\\circ = \\frac{\\sin 0^\\circ}{\\cos 0^\\circ} = \\frac{0}{1} = 0$, जबकि $\\tan 90^\\circ = \\frac{\\sin 90^\\circ}{\\cos 90^\\circ} = \\frac{1}{0} = \\infty$ (अपरिभाषित) होता है।"
      }
    ],

    faqList: [
      {
        question: "यदि sec θ + tan θ = k हो, तो sec θ का मान क्या होगा?",
        answer: "$\\sec\\theta = \\frac{k^2 + 1}{2k}$ तथा $\\tan\\theta = \\frac{k^2 - 1}{2k}$। यह व्यापम का सबसे तेज शॉर्टकट है।"
      },
      {
        question: "3 sin θ + 4 cos θ का अधिकतम और न्यूनतम मान क्या है?",
        answer: "अधिकतम मान $= +\\sqrt{3^2 + 4^2} = 5$ तथा न्यूनतम मान $= -5$।"
      },
      {
        question: "त्रिकोणमितीय व्यंजकों में वैल्यू पुटिंग कब उपयोगी होती है?",
        answer: "जब प्रश्न किसी अज्ञात कोण $\\theta$ के संबंध में एक सर्वसमिका हो और विकल्प संख्यात्मक मान या सरल पद हों। ऐसे में $\\theta = 45^\\circ$ या $0^\\circ$ रखकर 5 सेकंड में उत्तर आ जाता है।"
      },
      {
        question: "tan 1° · tan 2° ··· tan 89° का मान 1 क्यों होता है?",
        answer: "क्योंकि $\\tan 1^\\circ \\cdot \\tan 89^\\circ = 1$, $\\tan 2^\\circ \\cdot \\tan 88^\\circ = 1$ आदि पूरक युग्म बनते हैं और अंत में केवल $\\tan 45^\\circ = 1$ बचता है।"
      },
      {
        question: "क्या sin θ का मान कभी 1 से अधिक हो सकता है?",
        answer: "नहीं। वास्तविक मानों के लिए $\\sin\\theta$ और $\\cos\\theta$ का मान सदैव $[-1, 1]$ के बीच ही रहता है क्योंकि लंब और आधार कभी कर्ण से बड़े नहीं हो सकते।"
      }
    ],

    oneLinerRevision: [
      "sin θ = लंब/कर्ण, cos θ = आधार/कर्ण, tan θ = लंब/आधार (LAL / KAKKA)।",
      "व्युत्क्रम संबंध: csc θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ।",
      "मौलिक सर्वसमिका 1: sin²θ + cos²θ = 1।",
      "मौलिक सर्वसमिका 2: sec²θ - tan²θ = 1।",
      "मौलिक सर्वसमिका 3: csc²θ - cot²θ = 1।",
      "यदि sec θ + tan θ = k हो, तो sec θ - tan θ = 1/k तथा sec θ = (k² + 1)/(2k)।",
      "पूरक कोण: sin(90° - θ) = cos θ, tan(90° - θ) = cot θ, sec(90° - θ) = csc θ।",
      "tan 1° · tan 2° ··· tan 89° = 1 तथा sin² 1° + sin² 89° = 1।",
      "a sin θ + b cos θ का अधिकतम मान = +√(a² + b²) तथा न्यूनतम मान = -√(a² + b²)।",
      "a sin²θ + b cos²θ में जो गुणांक बड़ा है वही अधिकतम तथा छोटा वाला न्यूनतम मान होता है।"
    ],

    rapidRevision: "त्रिकोणमितीय अनुपात अध्याय में परीक्षा में पूर्ण अंक प्राप्त करने हेतु चार मुख्य आधारों को याद रखें: (1) समकोण त्रिभुज अनुपात (लाल/कक्का) और पाइथागोरियन त्रिक (3-4-5, 5-12-13, 7-24-25), (2) तीन मौलिक सर्वसमिकाएँ (sin²+cos²=1, sec²-tan²=1, csc²-cot²=1) और k तथा 1/k का व्युत्क्रम शॉर्टकट, (3) पूरक कोण नियम [tan α · tan β = 1 और sin²α + sin²β = 1 जब α+β = 90°], तथा (4) a sin θ + b cos θ का चरम मान ±√(a²+b²)। जटिल वस्तुनिष्ठ प्रश्नों में θ = 45° या 0° मान प्रतिस्थापन (Value-Putting) विधि से उत्तर बिना कलम चलाए मौखिक प्राप्त हो जाते हैं।"
  }
};

async function upload() {
  console.log('Uploading study notes for math_tri_1 (Trigonometric Ratios)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  await db.collection('topic_study_notes').doc('cgv_master_math_tri_1').set(sanitized);
  console.log('✅ cgv_master_math_tri_1 saved to Firestore topic_study_notes!');

  // Sync syllabi in Firestore
  const docRef = db.collection('syllabi').doc('cgv_master');
  const doc = await docRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    data.subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        ch.topics.forEach(t => {
          if (t.id === 'math_tri_1') {
            t.hasStudyNotes = true;
            updated = true;
          }
        });
      });
    });
    if (updated) {
      await docRef.set(data);
      console.log('✅ syllabi/cgv_master updated: math_tri_1 hasStudyNotes = true');
    }
  }

  console.log('\nUpload complete! 🚀');
}

upload().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
