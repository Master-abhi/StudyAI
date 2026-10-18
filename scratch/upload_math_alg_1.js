const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');
const fs = require('fs');
const path = require('path');

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
  topicId: 'math_alg_1',
  updatedAt: new Date().toISOString(),
  studyNotes: {
    id: "cgv_master_math_alg_1",
    topicId: "math_alg_1",
    syllabusId: "cgv_master",
    subjectId: "cgv_master_sub_3",
    chapterId: "cgv_master_sub_3_ch_6",
    title: "बीजीय सर्वसमिकाएँ (Algebraic Identities)",
    titleHi: "बीजीय सर्वसमिकाएँ: वर्ग व घन सर्वसमिकाएं, x + 1/x प्रारूप, a³+b³+c³-3abc = 0 की स्वर्णिम शर्त, तथा मान प्रतिस्थापन विधि (Value-Putting Method)",
    lastUpdated: new Date().toISOString(),
    targetExam: "CG Vyapam & CGPSC (Quantitative Aptitude / Algebra)",
    overview: {
      introduction: "बीजीय सर्वसमिकाएँ (Algebraic Identities) वे समिकाएँ होती हैं जो उनमें उपस्थित चरों के सभी वास्तविक मानों के लिए सत्य होती हैं। उच्च अंकगणित तथा उन्नत बीजगणित की रीढ़ ये सर्वसमिकाएं ही हैं। प्रतियोगी परीक्षाओं में प्रत्यक्ष गुणा-भाग के स्थान पर सर्वसमिकाओं के पैटर्न पहचानकर भारी-भरकम गणनाओं को सेकंडों में हल किया जाता है। मुख्य रूप से $x + \\frac{1}{x} = k$ दिए होने पर $x^2 + \\frac{1}{x^2} = k^2 - 2$ तथा $x^3 + \\frac{1}{x^3} = k^3 - 3k$ ज्ञात करने के सीधे शॉर्टकट, यदि $a + b + c = 0$ हो तो $a^3 + b^3 + c^3 = 3abc$ होने की स्वर्णिम शर्त, तथा सममित व्यंजकों में 'मान प्रतिस्थापन विधि' (Value-Putting Method) से जटिल प्रश्नों को 5 सेकंड में हल करना परीक्षा का सबसे पसंदीदा प्रारूप है।",
      importance: "व्यापम के पटवारी, RI, हॉस्टल वार्डन, उप-निरीक्षक एवं CGPSC CSAT में बीजीय सर्वसमिकाओं पर सीधे 2 से 3 प्रश्न पूछे जाते हैं।",
      examRelevance: "x ± 1/x के उच्च घातों ($x^4, x^5, x^6$) के मान, $\\frac{a^3 + b^3 + c^3 - 3abc}{a^2 + b^2 + c^2 - ab - bc - ca} = a + b + c$ रूप, तथा मान प्रतिस्थापन ($a=1, b=1, c=1$ या $a=1, b=-1, c=0$) मुख्य परीक्षा बिंदु हैं।",
      quickFacts: [
        "$(a + b)^2 = a^2 + 2ab + b^2$ तथा $(a - b)^2 = a^2 - 2ab + b^2$।",
        "$(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$ तथा $(a + b)^2 - (a - b)^2 = 4ab$।",
        "यदि $x + \\frac{1}{x} = k$ हो, तो $x^2 + \\frac{1}{x^2} = k^2 - 2$ तथा $x^3 + \\frac{1}{x^3} = k^3 - 3k$।",
        "यदि $x - \\frac{1}{x} = k$ हो, तो $x^2 + \\frac{1}{x^2} = k^2 + 2$ तथा $x^3 - \\frac{1}{x^3} = k^3 + 3k$।",
        "यदि $a + b + c = 0$ हो, तो सदैव $a^3 + b^3 + c^3 = 3abc$ होता है।",
        "यदि $a^2 + b^2 + c^2 - ab - bc - ca = 0$ हो, तो इसका अर्थ है कि $a = b = c$।",
        "यदि $x + \\frac{1}{x} = 2$ हो, तो $x = 1$ तथा $x^n + \\frac{1}{x^n} = 2$ (चाहे घात $n$ कुछ भी हो)।",
        "यदि $x + \\frac{1}{x} = -2$ हो, तो $x = -1$ होता है।"
      ]
    },
    chapters: [
      {
        id: "ch_1",
        title: "अध्याय 1: वर्ग सर्वसमिकाएं एवं आधारभूत संबंध",
        content: `### 1. मानक वर्ग सर्वसमिकाएं
1. **द्विपद का वर्ग:**
   $$(a + b)^2 = a^2 + 2ab + b^2$$
   $$(a - b)^2 = a^2 - 2ab + b^2$$
2. **वर्गों का अंतर (Difference of Squares):**
   $$a^2 - b^2 = (a - b)(a + b)$$
3. **वर्गों का संयुक्त योग व अंतर:**
   $$(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$$
   $$(a + b)^2 - (a - b)^2 = 4ab$$
   $$\\frac{(a + b)^2 - (a - b)^2}{ab} = 4$$

4. **त्रिपद का वर्ग:**
   $$(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$$
   $$a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)$$

---

### 2. मॉडल उदाहरण
व्यंजक $\\frac{(856 + 167)^2 + (856 - 167)^2}{856^2 + 167^2}$ का मान ज्ञात कीजिए:
* सूत्र: $\\frac{(a + b)^2 + (a - b)^2}{a^2 + b^2} = \\frac{2(a^2 + b^2)}{a^2 + b^2} = 2$
* बिना किसी गुणा-भाग के उत्तर = $2$।`
      },
      {
        id: "ch_2",
        title: "अध्याय 2: x + 1/x प्रारूप एवं उच्च घातों के शॉर्टकट",
        content: `### 1. धनात्मक प्रारूप ($x + 1/x = k$)
यदि $x + \\frac{1}{x} = k$ हो:
* **घात 2:**
  $$x^2 + \\frac{1}{x^2} = k^2 - 2$$
* **घात 3:**
  $$x^3 + \\frac{1}{x^3} = k^3 - 3k$$
* **घात 4:**
  $$x^4 + \\frac{1}{x^4} = (k^2 - 2)^2 - 2$$
* **घात 5:**
  $$x^5 + \\frac{1}{x^5} = \\left(x^2 + \\frac{1}{x^2}\\right) \\left(x^3 + \\frac{1}{x^3}\\right) - \\left(x + \\frac{1}{x}\\right)$$
* **घात 6:**
  $$x^6 + \\frac{1}{x^6} = \\left(x^3 + \\frac{1}{x^3}\\right)^2 - 2$$

---

### 2. ऋणात्मक प्रारूप ($x - 1/x = k$)
यदि $x - \\frac{1}{x} = k$ हो:
* **घात 2:**
  $$x^2 + \\frac{1}{x^2} = k^2 + 2$$
* **घात 3:**
  $$x^3 - \\frac{1}{x^3} = k^3 + 3k$$

---

### 3. $x + 1/x$ और $x - 1/x$ का परस्पर रूपांतरण
$$(x + \\frac{1}{x})^2 - (x - \\frac{1}{x})^2 = 4$$
$$x + \\frac{1}{x} = \\sqrt{\\left(x - \\frac{1}{x}\\right)^2 + 4}$$
$$x - \\frac{1}{x} = \\sqrt{\\left(x + \\frac{1}{x}\\right)^2 - 4}$$

**मॉडल प्रश्न:** यदि $x + \\frac{1}{x} = 3$ हो, तो $x^5 + \\frac{1}{x^5}$ का मान क्या होगा?
1. $x^2 + \\frac{1}{x^2} = 3^2 - 2 = 7$
2. $x^3 + \\frac{1}{x^3} = 3^3 - 3(3) = 27 - 9 = 18$
3. $x^5 + \\frac{1}{x^5} = (7 \\times 18) - 3 = 126 - 3 = 123$।`
      },
      {
        id: "ch_3",
        title: "अध्याय 3: घन सर्वसमिकाएं एवं विशेष गुणनफल",
        content: `### 1. मानक घन सर्वसमिकाएं
1. **द्विपद का घन:**
   $$(a + b)^3 = a^3 + b^3 + 3ab(a + b)$$
   $$(a - b)^3 = a^3 - b^3 - 3ab(a - b)$$

2. **घनों का योग व अंतर (Sum and Difference of Cubes):**
   $$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$
   $$\\frac{a^3 + b^3}{a^2 - ab + b^2} = a + b$$

   $$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$$
   $$\\frac{a^3 - b^3}{a^2 + ab + b^2} = a - b$$

**मॉडल उदाहरण:**
व्यंजक $\\frac{0.73 \\times 0.73 \\times 0.73 + 0.27 \\times 0.27 \\times 0.27}{0.73 \\times 0.73 - 0.73 \\times 0.27 + 0.27 \\times 0.27}$ का मान ज्ञात कीजिए:
* यह सीधे $\\frac{a^3 + b^3}{a^2 - ab + b^2}$ का प्रारूप है।
* मान = $a + b = 0.73 + 0.27 = 1.00$।`
      },
      {
        id: "ch_4",
        title: "अध्याय 4: a³ + b³ + c³ - 3abc की स्वर्णिम सर्वसमिका",
        content: `### 1. त्रिपदीय घन सर्वसमिका
$$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$$

* **वैकल्पिक रूप (हाफ-स्क्वायर रूप):**
$$a^3 + b^3 + c^3 - 3abc = \\frac{1}{2} (a + b + c) \\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right]$$

---

### 2. स्वर्णिम शर्त (The Golden Condition): $a + b + c = 0$
यदि $a + b + c = 0$ हो, तो दायाँ पक्ष शून्य हो जाता है:
$$a^3 + b^3 + c^3 - 3abc = 0$$
$$a^3 + b^3 + c^3 = 3abc$$

**मॉडल प्रश्न:**
$(25)^3 + (-15)^3 + (-10)^3$ का मान क्या होगा?
* यहाँ $a = 25, b = -15, c = -10$
* $a + b + c = 25 - 15 - 10 = 0$
* अतः मान = $3abc = 3 \\times 25 \\times (-15) \\times (-10) = 3 \\times 25 \\times 150 = 11,250$।

---

### 3. शर्त: $a = b = c$
यदि $a^2 + b^2 + c^2 - ab - bc - ca = 0$ हो:
$$\\frac{1}{2} \\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right] = 0$$
चूंकि वास्तविक संख्याओं के वर्गों का योग तभी शून्य हो सकता है जब प्रत्येक पद व्यक्तिगत रूप से शून्य हो:
$$a - b = 0, \\quad b - c = 0, \\quad c - a = 0 \\iff a = b = c$$`
      },
      {
        id: "ch_5",
        title: "अध्याय 5: मान प्रतिस्थापन विधि (Value-Putting Method) एवं विशेष प्रारूप",
        content: `### 1. मान प्रतिस्थापन विधि (Value-Putting Trick)
जब प्रश्न में सममित (Symmetric) बीजीय व्यंजक दिया हो और उत्तर चरों से स्वतंत्र हो:
* चरों ($a, b, c$ या $x, y, z$) के सरल मान (जैसे $1, 0, -1$) मान लें।
* **सावधानी:** कभी भी ऐसा मान न मानें जिससे हर (Denominator) शून्य ($0$) बन जाए (अर्थात $1/0$ अनिर्धार्य न बने)।

**मॉडल प्रश्न:**
यदि $a + b + c = 0$ हो, तो $\\frac{a^2}{bc} + \\frac{b^2}{ca} + \\frac{c^2}{ab}$ का मान क्या होगा?
* मान प्रतिस्थापन: $a = 1, b = 1, c = -2$ (ताकि $1 + 1 - 2 = 0$)
$$\\frac{1^2}{1 \\times (-2)} + \\frac{1^2}{(-2) \\times 1} + \\frac{(-2)^2}{1 \\times 1} = -\\frac{1}{2} - \\frac{1}{2} + \\frac{4}{1} = -1 + 4 = 3$$
*(मात्र 5 सेकंड में बिना किसी लंबे लघुत्तम के उत्तर प्राप्त!)*

---

### 2. विशेष स्थिति: $x + 1/x = 1$ तथा $x + 1/x = -1$
1. **यदि $x + \\frac{1}{x} = 1$ हो:**
   $$x^2 - x + 1 = 0 \\implies x^3 + 1 = 0 \\implies x^3 = -1$$
   *(जहाँ भी $x^3$ दिखे, वहाँ $-1$ रखें!)*
2. **यदि $x + \\frac{1}{x} = -1$ हो:**
   $$x^2 + x + 1 = 0 \\implies x^3 - 1 = 0 \\implies x^3 = +1$$`
      }
    ],
    comparativeTables: [
      {
        id: "table_1",
        title: "x + 1/x के विभिन्न मानों एवं उनके परिणामों की तुलना",
        headers: ["दिया गया मान", "घात 2 (x^2 + 1/x^2)", "घात 3 (x^3 + 1/x^3)", "विशेष निष्कर्ष"],
        rows: [
          [
            "x + 1/x = 2",
            "2^2 - 2 = 2",
            "2^3 - 3(2) = 2",
            "x = 1, x^n + 1/x^n = 2 सदैव"
          ],
          [
            "x + 1/x = -2",
            "(-2)^2 - 2 = 2",
            "(-2)^3 - 3(-2) = -2",
            "x = -1, विषम घात पर -2, सम पर +2"
          ],
          [
            "x + 1/x = 1",
            "1^2 - 2 = -1",
            "1^3 - 3(1) = -2",
            "x^3 = -1"
          ],
          [
            "x + 1/x = -1",
            "(-1)^2 - 2 = -1",
            "(-1)^3 - 3(-1) = +2",
            "x^3 = +1"
          ],
          [
            "x + 1/x = sqrt(3)",
            "(sqrt(3))^2 - 2 = 1",
            "(sqrt(3))^3 - 3*sqrt(3) = 0",
            "x^6 = -1 तथा x^6 + 1 = 0"
          ]
        ]
      },
      {
        id: "table_2",
        title: "वर्ग बनाम घन सर्वसमिकाओं के विस्तार की तुलना",
        headers: ["प्ररूप", "योग विस्तार (Sum)", "अंतर विस्तार (Difference)", "विशेषता"],
        rows: [
          [
            "घातांक 2",
            "(a + b)^2 = a^2 + 2ab + b^2",
            "(a - b)^2 = a^2 - 2ab + b^2",
            "द्विपद विस्तार"
          ],
          [
            "वर्गों का अंतर",
            "a^2 - b^2 = (a - b)(a + b)",
            "-",
            "गुणनखंड रूप"
          ],
          [
            "घातांक 3",
            "a^3 + b^3 = (a + b)(a^2 - ab + b^2)",
            "a^3 - b^3 = (a - b)(a^2 + ab + b^2)",
            "विपरीत मध्य चिह्न"
          ],
          [
            "पूर्ण घन",
            "(a + b)^3 = a^3 + b^3 + 3ab(a + b)",
            "(a - b)^3 = a^3 - b^3 - 3ab(a - b)",
            "संयुक्त पद 3ab"
          ]
        ]
      },
      {
        id: "table_3",
        title: "पारंपरिक बीजगणित बनाम मान प्रतिस्थापन विधि (Value-Putting)",
        headers: ["मापदंड", "पारंपरिक सर्वसमिका विधि", "मान प्रतिस्थापन विधि (Shortcut)", "दक्षता"],
        rows: [
          [
            "हल करने का समय",
            "1 से 2 मिनट",
            "5 से 10 सेकंड",
            "शॉर्टकट अत्यधिक तीव्र"
          ],
          [
            "गणना की जटिलता",
            "बहुपद गुणन व विस्तार",
            "साधारण अंकगणितीय जोड़",
            "मान प्रतिस्थापन सरल"
          ],
          [
            "सावधानी",
            "चिह्न (+/-) की गलती से बचें",
            "हर 0 न बनने दें (No 1/0)",
            "शर्त का पालन अनिवार्य"
          ]
        ]
      }
    ],
    pyqs: [
      {
        id: "pyq_1",
        question: "यदि x + 1/x = 5 हो, तो x^2 + 1/x^2 का मान क्या होगा? [CG Vyapam Patwari 2017]",
        options: [
          "23",
          "25",
          "27",
          "21"
        ],
        correctAnswer: 0,
        explanation: "सूत्र: x^2 + 1/x^2 = k^2 - 2 = 5^2 - 2 = 25 - 2 = 23।"
      },
      {
        id: "pyq_2",
        question: "यदि a + b + c = 0 हो, तो (a^3 + b^3 + c^3) / (abc) का मान क्या होगा? [CG Vyapam Revenue Inspector (RI) 2018]",
        options: [
          "1",
          "2",
          "3",
          "0"
        ],
        correctAnswer: 2,
        explanation: "जब a + b + c = 0 होता है, तो a^3 + b^3 + c^3 = 3abc। अतः (a^3 + b^3 + c^3) / abc = 3abc / abc = 3।"
      },
      {
        id: "pyq_3",
        question: "व्यंजक [(785 * 785 * 785 + 435 * 435 * 435) / (785 * 785 - 785 * 435 + 435 * 435)] का मान क्या होगा? [CG Vyapam Hostel Warden 2016]",
        options: [
          "1120",
          "1220",
          "350",
          "1200"
        ],
        correctAnswer: 1,
        explanation: "यह (a^3 + b^3) / (a^2 - ab + b^2) = a + b का रूप है। मान = 785 + 435 = 1220।"
      },
      {
        id: "pyq_4",
        question: "यदि x + 1/x = 2 हो, तो x^17 + 1/x^19 का मान क्या होगा? [CGPSC Prelims CSAT 2021]",
        options: [
          "1",
          "2",
          "0",
          "4"
        ],
        correctAnswer: 1,
        explanation: "जब x + 1/x = 2 हो, तो x = 1 होता है। अतः 1^17 + 1 / (1^19) = 1 + 1 = 2।"
      },
      {
        id: "pyq_5",
        question: "यदि a - b = 3 तथा a^2 + b^2 = 29 हो, तो ab का मान क्या होगा? [CG Vyapam Sub-Inspector 2021]",
        options: [
          "10",
          "12",
          "15",
          "8"
        ],
        correctAnswer: 0,
        explanation: "(a - b)^2 = a^2 + b^2 - 2ab => 3^2 = 29 - 2ab => 9 = 29 - 2ab => 2ab = 29 - 9 = 20 => ab = 10।"
      },
      {
        id: "pyq_6",
        question: "यदि x + 1/x = 4 हो, तो x^3 + 1/x^3 का मान क्या होगा? [CG Vyapam Mandi Nirikshak 2021]",
        options: [
          "52",
          "64",
          "48",
          "56"
        ],
        correctAnswer: 0,
        explanation: "सूत्र: x^3 + 1/x^3 = k^3 - 3k = 4^3 - 3(4) = 64 - 12 = 52।"
      }
    ],
    mcqs: [
      {
        id: "mcq_1",
        question: "यदि x - 1/x = 3 हो, तो x^3 - 1/x^3 का मान क्या होगा?",
        options: [
          "27",
          "36",
          "18",
          "24"
        ],
        correctAnswer: 1,
        explanation: "सूत्र: x^3 - 1/x^3 = k^3 + 3k = 3^3 + 3(3) = 27 + 9 = 36।"
      },
      {
        id: "mcq_2",
        question: "यदि x + 1/x = sqrt(3) हो, तो x^6 + 1 का मान क्या होगा?",
        options: [
          "0",
          "1",
          "-1",
          "2"
        ],
        correctAnswer: 0,
        explanation: "x^3 + 1/x^3 = (sqrt(3))^3 - 3(sqrt(3)) = 3*sqrt(3) - 3*sqrt(3) = 0 => (x^6 + 1) / x^3 = 0 => x^6 + 1 = 0।"
      },
      {
        id: "mcq_3",
        question: "यदि a/b + b/a = 1 हो, तो a^3 + b^3 का मान क्या होगा?",
        options: [
          "1",
          "0",
          "-1",
          "2"
        ],
        correctAnswer: 1,
        explanation: "a/b + b/a = 1 => (a^2 + b^2) / ab = 1 => a^2 + b^2 - ab = 0। अब a^3 + b^3 = (a + b)(a^2 - ab + b^2) = (a + b) * 0 = 0।"
      },
      {
        id: "mcq_4",
        question: "यदि a + b + c = 6 तथा a^2 + b^2 + c^2 = 20 हो, तो ab + bc + ca का मान क्या होगा?",
        options: [
          "6",
          "8",
          "10",
          "16"
        ],
        correctAnswer: 1,
        explanation: "(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca) => 6^2 = 20 + 2(ab + bc + ca) => 36 - 20 = 2(ab + bc + ca) => 16 = 2(ab + bc + ca) => ab + bc + ca = 8।"
      },
      {
        id: "mcq_5",
        question: "यदि x = 997, y = 998, z = 999 हो, तो x^2 + y^2 + z^2 - xy - yz - zx का मान क्या होगा?",
        options: [
          "1",
          "2",
          "3",
          "4"
        ],
        correctAnswer: 2,
        explanation: "सूत्र: (1/2) [(x - y)^2 + (y - z)^2 + (z - x)^2] = (1/2) [(-1)^2 + (-1)^2 + (2)^2] = (1/2) [1 + 1 + 4] = 6 / 2 = 3।"
      },
      {
        id: "mcq_6",
        question: "व्यंजक [(637 + 478)^2 - (637 - 478)^2] / (637 * 478) का मान क्या होगा?",
        options: [
          "1",
          "2",
          "4",
          "8"
        ],
        correctAnswer: 2,
        explanation: "सूत्र: [(a + b)^2 - (a - b)^2] / ab = 4ab / ab = 4।"
      },
      {
        id: "mcq_7",
        question: "यदि x + 1/x = 3 हो, तो x^4 + 1/x^4 का मान क्या होगा?",
        options: [
          "47",
          "49",
          "51",
          "45"
        ],
        correctAnswer: 0,
        explanation: "x^2 + 1/x^2 = 3^2 - 2 = 7। x^4 + 1/x^4 = 7^2 - 2 = 49 - 2 = 47।"
      },
      {
        id: "mcq_8",
        question: "यदि a + b + c = 0 हो, तो a^2 / (bc) + b^2 / (ca) + c^2 / (ab) का मान क्या होगा?",
        options: [
          "0",
          "1",
          "3",
          "-3"
        ],
        correctAnswer: 2,
        explanation: "लघुत्तम abc लेने पर: (a^3 + b^3 + c^3) / abc। चूंकि a+b+c = 0 है, अतः a^3 + b^3 + c^3 = 3abc। मान = 3abc / abc = 3।"
      }
    ],
    keyTerminology: [
      {
        term: "बीजीय सर्वसमिका (Algebraic Identity)",
        definition: "वह बीजीय समिका जो उसमें प्रयुक्त चरों के प्रत्येक वास्तविक मान के लिए सदैव सत्य होती है।"
      },
      {
        term: "द्विपद विस्तार (Binomial Expansion)",
        definition: "दो पदों के योग या अंतर के वर्ग अथवा घन को सर्वसमिका द्वारा विस्तारित रूप में लिखना।"
      },
      {
        term: "स्वर्णिम शर्त (Golden Condition)",
        definition: "यदि a + b + c = 0 हो, तो a^3 + b^3 + c^3 = 3abc होने का सार्वभौमिक बीजगणितीय नियम।"
      },
      {
        term: "मान प्रतिस्थापन विधि (Value-Putting Method)",
        definition: "सममित व्यंजकों में चरों के स्थान पर उपयुक्त सरल संख्याएं रखकर प्रश्न को त्वरित हल करने की शॉर्टकट तकनीक।"
      },
      {
        term: "व्युत्क्रम चर प्रारूप (x + 1/x Pattern)",
        definition: "किसी चर और उसके व्युत्क्रम के योग से उच्च घातांकों (वर्ग, घन, चतुर्थ व पंचम घात) के मान निकालने की मानक श्रृंखला।"
      },
      {
        term: "सममित व्यंजक (Symmetric Expression)",
        definition: "वह बीजीय व्यंजक जिसमें चरों को परस्पर बदलने पर भी व्यंजक का समग्र मान अपरिवर्तित रहता है।"
      },
      {
        term: "हाफ-स्क्वायर रूप (Half-Square Form)",
        definition: "a^2 + b^2 + c^2 - ab - bc - ca को (1/2)[(a-b)^2 + (b-c)^2 + (c-a)^2] के रूप में लिखना।"
      },
      {
        term: "वर्गों का अंतर (Difference of Squares)",
        definition: "a^2 - b^2 = (a - b)(a + b) का मौलिक गुणनखंड नियम।"
      }
    ],
    sources: [
      {
        name: "क्वांटिटेटिव एप्टीट्यूड (Quantitative Aptitude)",
        author: "डॉ. आर. एस. अग्रवाल (Dr. R.S. Aggarwal)",
        description: "बीजीय सर्वसमिकाएं, गुणनखंड एवं सरलीकरण के मानक प्रश्नों का संकलन।"
      },
      {
        name: "एडवांस्ड मैथ्स फॉर जनरल कॉम्पिटिशन",
        author: "राकेश यादव (Rakesh Yadav Readers Publication)",
        description: "x + 1/x प्रारूप, मान प्रतिस्थापन विधि एवं a^3+b^3+c^3=3abc शॉर्टकट्स।"
      },
      {
        name: "NCERT Class 9 Mathematics (Polynomials)",
        author: "NCERT",
        description: "बीजीय सर्वसमिकाओं की ज्यामितीय एवं बीजीय व्युत्पत्ति का प्रामाणिक स्रोत।"
      },
      {
        name: "CG Vyapam & CGPSC सॉल्व्ड प्रश्न संग्रह",
        author: "व्यापम एवं छत्तीसगढ़ लोक सेवा आयोग",
        description: "पटवारी, RI, हॉस्टल वार्डन एवं CSAT प्रश्नपत्रों का विश्लेषण।"
      }
    ],
    confusionBuster: [
      {
        concept: "x^2 + 1/x^2 में +2 बनाम -2",
        misconception: "x - 1/x = k होने पर भी k^2 - 2 कर देना।",
        clarification: "यदि x + 1/x = k है, तो k^2 - 2 होगा। परंतु यदि x - 1/x = k है, तो पक्षांतरण के बाद k^2 + 2 होता है।"
      },
      {
        concept: "(a + b)^2 - (a - b)^2 का परिणाम",
        misconception: "अंतर को 2(a^2 + b^2) मान लेना।",
        clarification: "जोड़ने पर 2(a^2 + b^2) आता है, परंतु घटाने पर मध्य पद 2ab - (-2ab) = 4ab आता है।"
      },
      {
        concept: "मान प्रतिस्थापन में हर शून्य होना",
        misconception: "a=0, b=0, c=0 मान लेना।",
        clarification: "यदि व्यंजक के हर में ab, bc, ca हैं, तो 0 मानने पर 1/0 (अपरिभाषित) बन जाएगा। मान सदैव ऐसे चुनें जिससे हर अशून्य रहे (जैसे 1, 1, -2)।"
      },
      {
        concept: "a^3 + b^3 के गुणनखंड में मध्य पद का चिह्न",
        misconception: "a^3 + b^3 = (a + b)(a^2 + ab + b^2) मान लेना।",
        clarification: "a^3 + b^3 में दूसरे कोष्ठक का मध्य पद ऋणात्मक (-ab) होता है: (a + b)(a^2 - ab + b^2)।"
      },
      {
        concept: "x + 1/x = sqrt(3) का परिणाम",
        misconception: "x^6 = 1 मान लेना।",
        clarification: "सही मान x^6 = -1 (अर्थात x^6 + 1 = 0) होता है।"
      }
    ],
    faqList: [
      {
        question: "मान प्रतिस्थापन विधि (Value-Putting Method) की क्या सीमाएं हैं?",
        answer: "यह विधि तब लागू होती है जब प्रश्न में कोई प्रतिबंधित शर्त न हो या शर्त पूरी हो रही हो, तथा माने गए मानों से व्यंजक का हर शून्य (1/0) न बने।"
      },
      {
        question: "यदि a + b + c = 0 हो, तो a^3 + b^3 + c^3 = 3abc क्यों होता है?",
        answer: "क्योंकि मूल सर्वसमिका में a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca) होता है। (a+b+c) का मान शून्य होते ही पूरा दायाँ पक्ष शून्य हो जाता है।"
      },
      {
        question: "x + 1/x = 2 होने पर x का मान सदैव 1 ही क्यों होता है?",
        answer: "क्योंकि x + 1/x = 2 को हल करने पर x^2 - 2x + 1 = 0 प्राप्त होता है, जो (x - 1)^2 = 0 है। अतः x का एकमात्र वास्तविक मान x = 1 ही है।"
      },
      {
        question: "x^5 + 1/x^5 निकालने का सबसे सरल तरीका क्या है?",
        answer: "(x^2 + 1/x^2) और (x^3 + 1/x^3) का परस्पर गुणा करें और उसमें से (x + 1/x) को घटा लें।"
      },
      {
        question: "व्यापम के बड़े संख्यात्मक सरलीकरण में सर्वसमिकाएं कैसे पहचानें?",
        answer: "समान संख्याओं को a, b, c मान लें। संख्याएं तुरंत a^3 + b^3 या (a+b)^2 के मानक रूप में दिखने लगेंगी, जिससे कठिन गणना सीधे 1 पंक्ति में हल हो जाएगी।"
      }
    ],
    oneLinerRevision: [
      "यदि x + 1/x = k हो, तो x^2 + 1/x^2 = k^2 - 2 तथा x^3 + 1/x^3 = k^3 - 3k।",
      "यदि x - 1/x = k हो, तो x^2 + 1/x^2 = k^2 + 2 तथा x^3 - 1/x^3 = k^3 + 3k।",
      "यदि a + b + c = 0 हो, तो a^3 + b^3 + c^3 = 3abc।",
      "यदि a^2 + b^2 + c^2 - ab - bc - ca = 0 हो, तो a = b = c।",
      "यदि x + 1/x = 2 हो, तो x = 1 तथा x^n + 1/x^n = 2 (सदैव)।",
      "यदि x + 1/x = -2 हो, तो x = -1।",
      "यदि x + 1/x = 1 हो, तो x^3 = -1 तथा यदि x + 1/x = -1 हो, तो x^3 = 1।",
      "यदि x + 1/x = sqrt(3) हो, तो x^6 = -1 (x^6 + 1 = 0)।",
      "[(a + b)^2 - (a - b)^2] / ab = 4 तथा [(a + b)^2 + (a - b)^2] / (a^2 + b^2) = 2।",
      "(a^3 + b^3) / (a^2 - ab + b^2) = a + b तथा (a^3 - b^3) / (a^2 + ab + b^2) = a - b।"
    ],
    rapidRevision: "बीजीय सर्वसमिकाएँ अध्याय में सफलता हेतु चार प्रमुख प्रारूपों को याद रखें: (1) x ± 1/x के वर्ग व घन परिणाम (k^2 ± 2 तथा k^3 ± 3k), (2) स्वर्णिम शर्त a+b+c = 0 पर a^3+b^3+c^3 = 3abc, (3) विशेष मान (x+1/x = 2 पर x=1, x+1/x = 1 पर x^3 = -1, तथा x+1/x = sqrt(3) पर x^6 = -1), तथा (4) सममित व्यंजकों में मान प्रतिस्थापन विधि (Value-Putting)। इन पैटर्न्स की पहचान से व्यापम के कठिन से कठिन बीजगणितीय प्रश्न 5 से 10 सेकंड में मौखिक हल हो जाते हैं।"
  }
};

async function upload() {
  console.log('Uploading study notes for math_alg_1 (Algebraic Identities)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  await db.collection('topic_study_notes').doc('cgv_master_math_alg_1').set(sanitized);
  console.log('✅ cgv_master_math_alg_1 saved to Firestore topic_study_notes!');

  // Sync syllabi in Firestore
  const docRef = db.collection('syllabi').doc('cgv_master');
  const doc = await docRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    data.subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        ch.topics.forEach(t => {
          if (t.id === 'math_alg_1') {
            t.hasStudyNotes = true;
            updated = true;
          }
        });
      });
    });
    if (updated) {
      await docRef.set(data);
      console.log('✅ syllabi/cgv_master updated: math_alg_1 hasStudyNotes = true');
    }
  }

  console.log('\nUpload complete! 🚀');
}

upload().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
