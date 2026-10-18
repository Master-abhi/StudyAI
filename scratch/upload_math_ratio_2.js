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
  topicId: 'math_ratio_2',
  updatedAt: new Date().toISOString(),
  studyNotes: {
    id: "cgv_master_math_ratio_2",
    topicId: "math_ratio_2",
    syllabusId: "cgv_master",
    subjectId: "cgv_master_sub_3",
    chapterId: "cgv_master_sub_3_ch_3",
    title: "समानुपात (Proportion)",
    titleHi: "समानुपात: मध्यानुपाती, तृतीयानुपाती, चतुर्थानुपाती, युगांतरानुपात नियम (C&D Rule), तथा प्रत्यक्ष व व्युत्क्रम समानुपात",
    lastUpdated: new Date().toISOString(),
    targetExam: "CG Vyapam & CGPSC (Quantitative Aptitude / Commercial Mathematics)",
    overview: {
      introduction: "समानुपात (Proportion) दो अनुपातों की समानता का गणितीय कथन है। जब दो अनुपात परस्पर बराबर होते हैं, तो वे 'समानुपात' में कहलाते हैं, जिसे संकेत '$::$' अथवा '$=$' द्वारा दर्शाया जाता है। यदि $a : b = c : d$ हो, तो इसे $a : b :: c : d$ लिखा जाता है, जहां $a$ और $d$ को 'बाह्य पद' (Extreme terms) तथा $b$ और $c$ को 'मध्य पद' (Mean terms) कहते हैं। समानुपात का मूल सिद्धांत है: 'बाह्य पदों का गुणनफल = मध्य पदों का गुणनफल' ($a \\times d = b \\times c$)। प्रतियोगी परीक्षाओं में मध्यानुपाती ($b = \\sqrt{ac}$), तृतीयानुपाती ($c = b^2/a$), चतुर्थानुपाती ($d = bc/a$), युगांतरानुपात नियम (Componendo & Dividendo - C&D Rule) तथा प्रत्यक्ष एवं व्युत्क्रम विचरण पर आधारित प्रश्न बारंबार पूछे जाते हैं।",
      importance: "व्यापम के पटवारी, RI, हॉस्टल वार्डन तथा CGPSC CSAT में समानुपात पर सीधे 1 से 2 प्रश्न पूछे जाते हैं, जबकि समय-दूरी, कार्य-समय तथा बीजगणित में C&D नियम का व्यापक उपयोग होता है।",
      examRelevance: "मध्यानुपाती व तृतीयानुपाती के सीधे सूत्र, चार संख्याओं में क्या घटाया या जोड़ा जाए कि वे समानुपाती हो जाएं, तथा युगांतरानुपात नियम (Componendo & Dividendo) द्वारा जटिल करणी (Surds) वाले समीकरणों को सरल करना मुख्य परीक्षा बिंदु हैं।",
      quickFacts: [
        "समानुपात का मूलभूत नियम: बाह्य पदों का गुणनफल = मध्य पदों का गुणनफल ($a \\times d = b \\times c$)।",
        "दो संख्याओं $a$ और $c$ का मध्यानुपाती (Mean Proportional): $b = \\sqrt{a \\times c}$।",
        "दो संख्याओं $a$ और $b$ का तृतीयानुपाती (Third Proportional): $c = \\frac{b^2}{a}$।",
        "तीन संख्याओं $a, b, c$ का चतुर्थानुपाती (Fourth Proportional): $d = \\frac{b \\times c}{a}$।",
        "सतत समानुपात (Continued Proportion): यदि $a : b :: b : c$ हो, तो $\\frac{a}{b} = \\frac{b}{c} \\implies b^2 = ac$।",
        "युगांतरानुपात नियम (Componendo & Dividendo - C&D Rule): यदि $\\frac{a}{b} = \\frac{c}{d}$ हो, तो $\\frac{a + b}{a - b} = \\frac{c + d}{c - d}$।",
        "प्रत्यक्ष समानुपात (Direct Proportion): $y \\propto x \\implies \\frac{y_1}{x_1} = \\frac{y_2}{x_2}$ (एक के बढ़ने पर दूसरा भी बढ़े)।",
        "व्युत्क्रम समानुपात (Inverse Proportion): $y \\propto \\frac{1}{x} \\implies x_1 y_1 = x_2 y_2$ (एक के बढ़ने पर दूसरा घटे)।"
      ]
    },
    chapters: [
      {
        id: "ch_1",
        title: "अध्याय 1: समानुपात की आधारभूत संकल्पना एवं मूलभूत नियम",
        content: `### 1. समानुपात की परिभाषा
जब दो अनुपात परस्पर समान हों:
$$\\frac{a}{b} = \\frac{c}{d} \\iff a : b :: c : d$$

* **बाह्य पद (Extremes):** $a$ तथा $d$
* **मध्य पद (Means):** $b$ तथा $c$

#### समानुपात का मूलभूत प्रमेय:
$$\\text{बाह्य पदों का गुणनफल} = \\text{मध्य पदों का गुणनफल}$$
$$a \\times d = b \\times c$$

**उदाहरण:** यदि $5 : 8 :: 15 : x$ हो, तो $x$ का मान क्या होगा?
$$5 \\times x = 8 \\times 15 \\implies 5x = 120 \\implies x = \\frac{120}{5} = 24$$

---

### 2. सतत समानुपात (Continued Proportion)
तीन राशियां $a, b, c$ सतत समानुपात में कहलाती हैं यदि:
$$a : b :: b : c \\iff \\frac{a}{b} = \\frac{b}{c}$$
$$b^2 = a \\times c \\iff b = \\sqrt{a c}$$
* यहां $b$ को $a$ और $c$ का **मध्यानुपाती (Mean Proportional)** कहा जाता है।
* $c$ को $a$ और $b$ का **तृतीयानुपाती (Third Proportional)** कहा जाता है।
* $a$ को **प्रथमानुपाती (First Proportional)** कहा जाता है।`
      },
      {
        id: "ch_2",
        title: "अध्याय 2: अनुपाती मानों के विशिष्ट सूत्र (Mean, Third & Fourth Proportional)",
        content: `### 1. मध्यानुपाती (Mean Proportional)
किन्हीं दो धनात्मक संख्याओं $a$ और $b$ का मध्यानुपाती वह संख्या $x$ है जो बीच में रखने पर सतत समानुपात बनाती है:
$$a : x :: x : b \\implies x^2 = ab$$
$$\\text{मध्यानुपाती } x = \\sqrt{a \\times b}$$

**मॉडल उदाहरण:**
* $9$ और $25$ का मध्यानुपाती = $\\sqrt{9 \\times 25} = \\sqrt{225} = 15$
* $0.32$ और $0.02$ का मध्यानुपाती = $\\sqrt{0.32 \\times 0.02} = \\sqrt{0.0064} = 0.08$

---

### 2. तृतीयानुपाती (Third Proportional)
दो संख्याओं $a$ और $b$ का तृतीयानुपाती वह संख्या $c$ है जिसके लिए:
$$a : b :: b : c \\implies a \\times c = b^2$$
$$\\text{तृतीयानुपाती } c = \\frac{b^2}{a}$$

**मॉडल उदाहरण:**
* $12$ और $18$ का तृतीयानुपाती:
$$c = \\frac{18^2}{12} = \\frac{324}{12} = 27$$

---

### 3. चतुर्थानुपाती (Fourth Proportional)
तीन संख्याओं $a, b$ और $c$ का चतुर्थानुपाती वह संख्या $d$ है जिसके लिए:
$$a : b :: c : d \\implies a \\times d = b \\times c$$
$$\\text{चतुर्थानुपाती } d = \\frac{b \\times c}{a}$$

**मॉडल उदाहरण:**
* $6, 14, 15$ का चतुर्थानुपाती:
$$d = \\frac{14 \\times 15}{6} = \\frac{210}{6} = 35$$

---

### 4. प्रथमानुपाती (First Proportional)
यदि $x, a, b$ सतत समानुपात में हों:
$$\\text{प्रथमानुपाती } x = \\frac{a^2}{b}$$`
      },
      {
        id: "ch_3",
        title: "अध्याय 3: समानुपात के बीजगणितीय प्रगुण एवं युगांतरानुपात नियम (C&D Rule)",
        content: `### 1. समानुपात के मूल रूपांतरण प्रगुण
यदि $\\frac{a}{b} = \\frac{c}{d}$ हो, तो:
1. **एकांतरानुपात (Alternendo):**
   $$\\frac{a}{c} = \\frac{b}{d}$$
2. **विलोमानुपात (Invertendo):**
   $$\\frac{b}{a} = \\frac{d}{c}$$
3. **योगानुपात (Componendo):**
   $$\\frac{a + b}{b} = \\frac{c + d}{d}$$
4. **अंतरानुपात (Dividendo):**
   $$\\frac{a - b}{b} = \\frac{c - d}{d}$$

---

### 2. युगांतरानुपात नियम (Componendo and Dividendo - C&D Rule)
जब योगानुपात और अंतरानुपात को परस्पर विभाजित किया जाता है:
$$\\frac{a}{b} = \\frac{c}{d} \\iff \\frac{a + b}{a - b} = \\frac{c + d}{c - d}$$

#### C&D नियम का सीधा अनुप्रयोग:
जब समीकरण में $\\frac{x + y}{x - y} = \\frac{p}{q}$ रूप दिया हो, तो C&D लगाने पर:
$$\\frac{x}{y} = \\frac{p + q}{p - q}$$

**मॉडल प्रश्न:**
यदि $\\frac{\\sqrt{x + 1} + \\sqrt{x - 1}}{\\sqrt{x + 1} - \\sqrt{x - 1}} = 3$ हो, तो $x$ का मान क्या होगा?
* दाईं ओर $3 = \\frac{3}{1}$ लिखें।
* C&D नियम लगाने पर:
$$\\frac{\\sqrt{x + 1}}{\\sqrt{x - 1}} = \\frac{3 + 1}{3 - 1} = \\frac{4}{2} = 2$$
* दोनों पक्षों का वर्ग करने पर:
$$\\frac{x + 1}{x - 1} = 4 = \\frac{4}{1}$$
* पुनः C&D लगाने पर:
$$\\frac{x}{1} = \\frac{4 + 1}{4 - 1} = \\frac{5}{3} \\implies x = \\frac{5}{3}$$
*(कठिन करणी समीकरण मात्र 3 पंक्तियों में हल!)*`
      },
      {
        id: "ch_4",
        title: "अध्याय 4: चार संख्याओं में क्या जोड़ा या घटाया जाए कि वे समानुपाती हो जाएं",
        content: `### 1. समस्या की संरचना
यदि चार संख्याएं $a, b, c, d$ दी गई हों और पूछा जाए कि 'प्रत्येक में कौन सी संख्या $x$ जोड़ी (या घटाई) जाए ताकि परिणामी संख्याएं समानुपाती हो जाएं':
$$\\frac{a \\pm x}{b \\pm x} = \\frac{c \\pm x}{d \\pm x}$$

---

### 2. सुपर-फास्ट शॉर्टकट ट्रिक (The Difference-Product Formula)
प्रत्येक पद में जोड़ी या घटाई जाने वाली संख्या $x$:
$$x = \\frac{|(a \\times d) - (b \\times c)|}{|(a + d) - (b + c)|}$$

$$\\text{जोड़ी/घटाई जाने वाली संख्या } x = \\frac{|\\text{बाह्य पदों का गुणनफल} - \\text{मध्य पदों का गुणनफल}|}{|\\text{बाह्य पदों का योग} - \\text{मध्य पदों का योग}|}$$

**मॉडल उदाहरण:**
$6, 14, 18, 38$ के प्रत्येक पद में कौन सी संख्या जोड़ी जाए कि वे समानुपाती हो जाएं?
* बाह्य पदों का गुणनफल = $6 \\times 38 = 228$
* मध्य पदों का गुणनफल = $14 \\times 18 = 252$
* बाह्य पदों का योग = $6 + 38 = 44$
* मध्य पदों का योग = $14 + 18 = 32$

शॉर्टकट सूत्र से:
$$x = \\frac{|228 - 252|}{|44 - 32|} = \\frac{|-24|}{|12|} = \\frac{24}{12} = 2$$
*जांच:*
* $(6 + 2) = 8, \\quad (14 + 2) = 16 \\implies 8 : 16 = 1 : 2$
* $(18 + 2) = 20, \\quad (38 + 2) = 40 \\implies 20 : 40 = 1 : 2$
*अतः $x = 2$ शत-प्रतिशत सही है!*`
      },
      {
        id: "ch_5",
        title: "अध्याय 5: प्रत्यक्ष एवं व्युत्क्रम समानुपात (Direct & Inverse Variation)",
        content: `### 1. प्रत्यक्ष समानुपात (Direct Variation / Proportion)
जब दो चर $x$ और $y$ इस प्रकार संबंधित हों कि $x$ के बढ़ने पर $y$ भी उसी अनुपात में बढ़े, तथा $x$ के घटने पर $y$ भी घटे:
$$y \\propto x \\iff y = k x \\iff \\frac{y}{x} = k\\text{ (स्थिरांक)}$$
$$\\frac{y_1}{x_1} = \\frac{y_2}{x_2}$$

* **व्यावहारिक उदाहरण:**
  * खरीदी गई वस्तुओं की संख्या और उनका कुल मूल्य।
  * स्थिर चाल पर यात्रा का समय और तय की गई दूरी।
  * कामगारों द्वारा किए गए काम की मात्रा और समय।

---

### 2. व्युत्क्रम समानुपात (Inverse Variation / Proportion)
जब एक चर के बढ़ने पर दूसरा चर उसी अनुपात में घटे:
$$y \\propto \\frac{1}{x} \\iff x \\times y = k\\text{ (स्थिरांक)}$$
$$x_1 y_1 = x_2 y_2$$

* **व्यावहारिक उदाहरण:**
  * किसी निश्चित कार्य को करने वाले मजदूरों की संख्या और लगने वाले दिन ($M_1 D_1 = M_2 D_2$)।
  * एक निश्चित दूरी तय करने में वाहन की चाल और लगने वाला समय ($S_1 T_1 = S_2 T_2$)।
  * वस्तु के मूल्य में परिवर्तन और खपत की मात्रा (खर्च स्थिर रहने पर)।

---

### 3. संयुक्त विचरण (Compound Variation)
जब कोई राशि एक साथ कई राशियों पर निर्भर करे:
जैसे, कार्य $W$, आदमियों $M$, दिनों $D$ और घंटों $H$ पर निर्भर करता है:
$$\\frac{M_1 D_1 H_1}{W_1} = \\frac{M_2 D_2 H_2}{W_2}$$`
      }
    ],
    comparativeTables: [
      {
        id: "table_1",
        title: "विभिन्न अनुपाती मानों के सूत्रों की तुलना",
        headers: ["प्रकार", "दी गई संख्याएं", "प्रयुक्त सूत्र", "उदाहरण"],
        rows: [
          [
            "मध्यानुपाती (Mean)",
            "दो संख्याएं (a, b)",
            "x = sqrt(a * b)",
            "4 और 16 का मध्यानुपाती = sqrt(64) = 8"
          ],
          [
            "तृतीयानुपाती (Third)",
            "दो संख्याएं (a, b)",
            "c = b^2 / a",
            "4 और 12 का तृतीयानुपाती = 12^2 / 4 = 36"
          ],
          [
            "चतुर्थानुपाती (Fourth)",
            "तीन संख्याएं (a, b, c)",
            "d = (b * c) / a",
            "2, 5, 8 का चतुर्थानुपाती = (5 * 8) / 2 = 20"
          ],
          [
            "प्रथमानुपाती (First)",
            "दो संख्याएं (b, c)",
            "a = b^2 / c",
            "8 और 16 का प्रथमानुपाती = 8^2 / 16 = 4"
          ]
        ]
      },
      {
        id: "table_2",
        title: "प्रत्यक्ष समानुपात बनाम व्युत्क्रम समानुपात की तुलना",
        headers: ["मापदंड", "प्रत्यक्ष समानुपात (Direct)", "व्युत्क्रम समानुपात (Inverse)", "परीक्षा में पहचान"],
        rows: [
          [
            "गणितीय संबंध",
            "y = k * x (या y / x = k)",
            "x * y = k",
            "समीकरण का रूप"
          ],
          [
            "परिवर्तन की दिशा",
            "एक बढ़े तो दूसरा भी बढ़ेगा",
            "एक बढ़े तो दूसरा घटेगा",
            "तार्किक संबंध का विश्लेषण"
          ],
          [
            "समानुपात समीकरण",
            "x1 / x2 = y1 / y2",
            "x1 / x2 = y2 / y1",
            "अनुपातों का क्रम"
          ],
          [
            "प्रमुख उदाहरण",
            "दूरी = चाल * समय (समय स्थिर)",
            "चाल = दूरी / समय (दूरी स्थिर)",
            "समय, चाल व कार्य के प्रश्न"
          ]
        ]
      },
      {
        id: "table_3",
        title: "समानुपात के विशिष्ट बीजगणितीय प्रगुणों का चार्ट",
        headers: ["नियम का नाम", "मूल अनुपात", "परिणामी संबंध", "मुख्य उपयोग"],
        rows: [
          [
            "एकांतरानुपात (Alternendo)",
            "a/b = c/d",
            "a/c = b/d",
            "पदों की अदला-बदली"
          ],
          [
            "विलोमानुपात (Invertendo)",
            "a/b = c/d",
            "b/a = d/c",
            "व्युत्क्रम करना"
          ],
          [
            "युगांतरानुपात (C&D Rule)",
            "a/b = c/d",
            "(a + b)/(a - b) = (c + d)/(c - d)",
            "करणी व बीजगणित का सरलीकरण"
          ],
          [
            "जोड़ने/घटाने का शॉर्टकट",
            "a, b, c, d",
            "x = |ad - bc| / |(a+d) - (b+c)|",
            "प्रत्येक में जोड़ी जाने वाली संख्या"
          ]
        ]
      }
    ],
    pyqs: [
      {
        id: "pyq_1",
        question: "0.32 और 0.02 का मध्यानुपाती (Mean Proportional) क्या होगा? [CG Vyapam Patwari 2017]",
        options: [
          "0.8",
          "0.08",
          "0.008",
          "0.4"
        ],
        correctAnswer: 1,
        explanation: "मध्यानुपाती सूत्र: x = sqrt(a * b) = sqrt(0.32 * 0.02) = sqrt(0.0064) = 0.08।"
      },
      {
        id: "pyq_2",
        question: "12 और 18 का तृतीयानुपाती (Third Proportional) क्या होगा? [CG Vyapam Revenue Inspector (RI) 2018]",
        options: [
          "24",
          "27",
          "30",
          "36"
        ],
        correctAnswer: 1,
        explanation: "तृतीयानुपाती सूत्र: c = b^2 / a = 18^2 / 12 = 324 / 12 = 27।"
      },
      {
        id: "pyq_3",
        question: "संख्याओं 6, 14, 18 और 38 के प्रत्येक पद में कौन सी संख्या जोड़ी जाए ताकि प्राप्त संख्याएं समानुपाती हो जाएं? [CG Vyapam Hostel Warden 2016]",
        options: [
          "1",
          "2",
          "3",
          "4"
        ],
        correctAnswer: 1,
        explanation: "शॉर्टकट सूत्र: x = |ad - bc| / |(a + d) - (b + c)| = |(6 * 38) - (14 * 18)| / |(6 + 38) - (14 + 18)| = |228 - 252| / |44 - 32| = 24 / 12 = 2।"
      },
      {
        id: "pyq_4",
        question: "यदि a : b = c : d हो, तो (ma + nc) / (mb + nd) किसके बराबर होगा? [CGPSC Prelims CSAT 2020]",
        options: [
          "m : n",
          "a : b",
          "c : d",
          "उपरोक्त (B) और (C) दोनों"
        ],
        correctAnswer: 3,
        explanation: "माना a/b = c/d = k। तब a = bk तथा c = dk। अब (ma + nc) / (mb + nd) = (m*bk + n*dk) / (mb + nd) = k(mb + nd) / (mb + nd) = k = a/b = c/d। अतः यह a:b और c:d दोनों के बराबर है।"
      },
      {
        id: "pyq_5",
        question: "5, 8 तथा 15 का चतुर्थानुपाती क्या होगा? [CG Vyapam Sub-Inspector 2021]",
        options: [
          "20",
          "24",
          "25",
          "30"
        ],
        correctAnswer: 1,
        explanation: "चतुर्थानुपाती d = (b * c) / a = (8 * 15) / 5 = 8 * 3 = 24।"
      },
      {
        id: "pyq_6",
        question: "यदि (x + y) : (x - y) = 4 : 1 हो, तो (x^2 + y^2) : (x^2 - y^2) का मान क्या होगा? [CG Vyapam Mandi Nirikshak 2021]",
        options: [
          "16 : 9",
          "17 : 8",
          "25 : 16",
          "17 : 15"
        ],
        correctAnswer: 1,
        explanation: "(x + y)/(x - y) = 4/1 पर C&D लगाने पर: x/y = (4 + 1)/(4 - 1) = 5/3 => x = 5, y = 3। अब (x^2 + y^2) / (x^2 - y^2) = (5^2 + 3^2) / (5^2 - 3^2) = (25 + 9) / (25 - 9) = 34 / 16 = 17 / 8।"
      }
    ],
    mcqs: [
      {
        id: "mcq_1",
        question: "4 और 64 का मध्यानुपाती क्या होगा?",
        options: [
          "12",
          "16",
          "24",
          "32"
        ],
        correctAnswer: 1,
        explanation: "मध्यानुपाती x = sqrt(4 * 64) = sqrt(256) = 16।"
      },
      {
        id: "mcq_2",
        question: "16 और 24 का तृतीयानुपाती क्या है?",
        options: [
          "32",
          "36",
          "40",
          "48"
        ],
        correctAnswer: 1,
        explanation: "तृतीयानुपाती c = b^2 / a = 24^2 / 16 = 576 / 16 = 36।"
      },
      {
        id: "mcq_3",
        question: "0.12, 0.21 और 8 का चतुर्थानुपाती क्या होगा?",
        options: [
          "12",
          "14",
          "16",
          "18"
        ],
        correctAnswer: 1,
        explanation: "d = (b * c) / a = (0.21 * 8) / 0.12 = (21 * 8) / 12 = 168 / 12 = 14।"
      },
      {
        id: "mcq_4",
        question: "संख्याओं 21, 38, 55, 106 में से प्रत्येक में क्या घटाया जाए कि नई संख्याएं समानुपाती हो जाएं?",
        options: [
          "2",
          "4",
          "6",
          "8"
        ],
        correctAnswer: 1,
        explanation: "शॉर्टकट सूत्र: x = |ad - bc| / |(a + d) - (b + c)| = |(21*106) - (38*55)| / |(21+106) - (38+55)| = |2226 - 2090| / |127 - 93| = 136 / 34 = 4।"
      },
      {
        id: "mcq_5",
        question: "यदि (a + b) / (a - b) = 7 / 3 हो, तो a / b का मान क्या होगा?",
        options: [
          "5 / 2",
          "2 / 5",
          "7 / 4",
          "10 / 3"
        ],
        correctAnswer: 0,
        explanation: "युगांतरानुपात (C&D) नियम से: a / b = (7 + 3) / (7 - 3) = 10 / 4 = 5 / 2।"
      },
      {
        id: "mcq_6",
        question: "यदि x और y व्युत्क्रमानुपाती हैं, और x = 12 होने पर y = 15 है, तो x = 9 होने पर y का मान क्या होगा?",
        options: [
          "18",
          "20",
          "22.5",
          "25"
        ],
        correctAnswer: 1,
        explanation: "व्युत्क्रम समानुपात में x1 * y1 = x2 * y2 => 12 * 15 = 9 * y2 => 180 = 9 * y2 => y2 = 180 / 9 = 20।"
      },
      {
        id: "mcq_7",
        question: "दो संख्याओं का मध्यानुपाती 18 है और उनका तृतीयानुपाती 144 है। वे दो संख्याएं कौन सी हैं?",
        options: [
          "6 और 36",
          "9 और 36",
          "8 और 32",
          "9 और 18"
        ],
        correctAnswer: 1,
        explanation: "दिया है: sqrt(ab) = 18 => ab = 324। तथा b^2 / a = 144 => b^2 = 144 a। दोनों का गुणा करने पर: ab * b^2 = 324 * 144 a => b^3 = 46656 => b = 36। अतः a = 324 / 36 = 9। संख्याएं 9 और 36 हैं।"
      },
      {
        id: "mcq_8",
        question: "यदि a / 3 = b / 4 = c / 7 हो, तो (a + b + c) / c का मान क्या होगा?",
        options: [
          "1",
          "2",
          "3",
          "7"
        ],
        correctAnswer: 1,
        explanation: "a = 3, b = 4, c = 7 रखने पर: (a + b + c) / c = (3 + 4 + 7) / 7 = 14 / 7 = 2।"
      }
    ],
    keyTerminology: [
      {
        term: "समानुपात (Proportion)",
        definition: "दो अनुपातों की समानता दर्शाने वाला गणितीय संबंध, जिसमें चार राशियां a : b :: c : d के रूप में व्यवस्थित होती हैं।"
      },
      {
        term: "बाह्य पद (Extreme Terms)",
        definition: "समानुपात के दोनों छोरों पर स्थित प्रथम पद (a) और चतुर्थ पद (d)।"
      },
      {
        term: "मध्य पद (Mean Terms)",
        definition: "समानुपात के बीच में स्थित द्वितीय पद (b) और तृतीय पद (c)।"
      },
      {
        term: "सतत समानुपात (Continued Proportion)",
        definition: "जब तीन या अधिक राशियां इस प्रकार संबंधित हों कि प्रथम व द्वितीय का अनुपात, द्वितीय व तृतीय के अनुपात के बराबर हो (a:b = b:c)।"
      },
      {
        term: "मध्यानुपाती (Mean Proportional)",
        definition: "दो संख्याओं के गुणनफल का धनात्मक वर्गमूल (x = sqrt(ab))।"
      },
      {
        term: "तृतीयानुपाती (Third Proportional)",
        definition: "दो संख्याओं a और b के लिए वह मान c जो b^2 / a के बराबर होता है।"
      },
      {
        term: "चतुर्थानुपाती (Fourth Proportional)",
        definition: "तीन संख्याओं a, b, c के लिए समानुपात का चौथा पद (d = bc / a)।"
      },
      {
        term: "युगांतरानुपात नियम (C&D Rule)",
        definition: "प्रमेय जिसके अनुसार यदि a/b = c/d हो, तो (a+b)/(a-b) = (c+d)/(c-d) होता है।"
      }
    ],
    sources: [
      {
        name: "क्वांटिटेटिव एप्टीट्यूड (Quantitative Aptitude)",
        author: "डॉ. आर. एस. अग्रवाल (Dr. R.S. Aggarwal)",
        description: "मध्यानुपाती, तृतीयानुपाती, चतुर्थानुपाती एवं समानुपाती प्रश्नों का प्रामाणिक संदर्भ।"
      },
      {
        name: "फास्ट ट्रैक ऑब्जेक्टिव अरिथमेटिक",
        author: "राजेश वर्मा (Arihant Publications)",
        description: "चार संख्याओं में जोड़ने/घटाने की शॉर्टकट विधि एवं C&D नियम का विश्लेषण।"
      },
      {
        name: "NCERT Class 7 & 8 Mathematics",
        author: "NCERT",
        description: "प्रत्यक्ष एवं व्युत्क्रम समानुपात (Direct and Inverse Proportions) की मूल संकल्पना।"
      },
      {
        name: "CG Vyapam & CGPSC सॉल्व्ड प्रश्न संग्रह",
        author: "व्यापम एवं छत्तीसगढ़ लोक सेवा आयोग",
        description: "पटवारी, RI, हॉस्टल वार्डन एवं CSAT के प्रामाणिक प्रश्नपत्रों का संकलन।"
      }
    ],
    confusionBuster: [
      {
        concept: "मध्यानुपाती बनाम तृतीयानुपाती",
        misconception: "छात्र दो संख्याएं दिए होने पर मध्यानुपाती और तृतीयानुपाती के सूत्रों में भ्रमित हो जाते हैं।",
        clarification: "मध्यानुपाती बीच का पद है: x = sqrt(a*b)। तृतीयानुपाती तीसरा पद है: c = b^2 / a।"
      },
      {
        concept: "C&D नियम का एकपक्षीय प्रयोग",
        misconception: "समीकरण के केवल बाएं पक्ष पर C&D लगाना और दाएं पक्ष को वैसा ही छोड़ देना।",
        clarification: "C&D नियम एक समानता नियम है, यह दोनों पक्षों पर एक साथ लागू होता है: यदि बाएं पक्ष में (a+b)/(a-b) किया है, तो दाएं पक्ष में भी (c+d)/(c-d) करना अनिवार्य है।"
      },
      {
        concept: "चार संख्याओं में जोड़ने वाली संख्या निकालने की पारंपरिक विधि",
        misconception: "(a+x)/(b+x) = (c+x)/(d+x) को द्विघात समीकरण बनाकर लंबा हल करना।",
        clarification: "सीधा शॉर्टकट प्रयोग करें: x = |ad - bc| / |(a+d) - (b+c)|, जो 5 सेकंड में बिना समीकरण के सटीक उत्तर देता है।"
      },
      {
        concept: "प्रत्यक्ष बनाम व्युत्क्रम समानुपात में गुणा",
        misconception: "व्युत्क्रम समानुपात में x1 / x2 = y1 / y2 लगा देना।",
        clarification: "व्युत्क्रम में गुणनफल स्थिर रहता है: x1 * y1 = x2 * y2, अतः x1 / x2 = y2 / y1 होता है।"
      },
      {
        concept: "ऋणात्मक मध्यानुपाती",
        misconception: "मध्यानुपाती में ऋणात्मक मान को उत्तर चुनना।",
        clarification: "अंकगणित में समानुपात के अंतर्गत मध्यानुपाती सदैव धनात्मक वर्गमूल (Principal Square Root) के रूप में लिया जाता है।"
      }
    ],
    faqList: [
      {
        question: "समानुपात की जांच कैसे की जाती है कि चार संख्याएं समानुपाती हैं या नहीं?",
        answer: "बाह्य पदों का गुणा करें (a * d) और मध्य पदों का गुणा करें (b * c)। यदि दोनों गुणनफल बराबर हों (a * d = b * c), तो संख्याएं समानुपाती हैं।"
      },
      {
        question: "C&D नियम (युगांतरानुपात) प्रतियोगी परीक्षाओं में इतना महत्वपूर्ण क्यों है?",
        answer: "क्योंकि यह करणी (Square roots) तथा जटिल अंश-हर वाले समीकरणों से वर्गमूलों को हटाकर उन्हें एक सरल रैखिक पद में बदल देता है, जिससे समय की भारी बचत होती है।"
      },
      {
        question: "चार संख्याओं में जोड़ने/घटाने वाले सूत्र में मापांक (Modulus) क्यों लगाया जाता है?",
        answer: "क्योंकि जोड़ी या घटाई जाने वाली संख्या का मान धनात्मक अंतर पर निर्भर करता है। अंश और हर दोनों का धनात्मक मान लेने पर वास्तविक अभीष्ट संख्या प्राप्त होती है।"
      },
      {
        question: "तृतीयानुपाती निकालने के लिए न्यूनतम कितनी संख्याएं आवश्यक हैं?",
        answer: "तृतीयानुपाती सतत समानुपात (a:b::b:c) का तीसरा पद है, अतः इसे ज्ञात करने के लिए ठीक दो संख्याओं (a और b) की आवश्यकता होती है।"
      },
      {
        question: "व्युत्क्रम समानुपात का दैनिक जीवन में सबसे बड़ा उदाहरण क्या है?",
        answer: "चाल और समय (दूरी स्थिर होने पर)। यदि आप अपनी चाल दोगुनी कर देते हैं, तो यात्रा का समय आधा हो जाता है।"
      }
    ],
    oneLinerRevision: [
      "समानुपात का मूल सिद्धांत: बाह्य पदों का गुणनफल = मध्य पदों का गुणनफल (a * d = b * c)।",
      "मध्यानुपाती सूत्र: x = sqrt(a * b)।",
      "तृतीयानुपाती सूत्र: c = b^2 / a।",
      "चतुर्थानुपाती सूत्र: d = (b * c) / a।",
      "सतत समानुपात में b^2 = a * c होता है।",
      "युगांतरानुपात नियम (C&D): यदि a/b = c/d हो, तो (a+b)/(a-b) = (c+d)/(c-d)।",
      "जोड़ी या घटाई जाने वाली संख्या x = |ad - bc| / |(a+d) - (b+c)|।",
      "प्रत्यक्ष समानुपात में y1 / x1 = y2 / x2 तथा व्युत्क्रम में x1 y1 = x2 y2।",
      "यदि a/x = b/y = c/z हो, तो a:b:c = x:y:z।",
      "ऐकिक नियम प्रत्यक्ष और व्युत्क्रम समानुपात का ही व्यावहारिक रूप है।"
    ],
    rapidRevision: "समानुपात अध्याय में मुख्य रूप से चार सूत्रों को कंठस्थ रखें: (1) मध्यानुपाती x = sqrt(ab), (2) तृतीयानुपाती c = b^2/a, (3) चतुर्थानुपाती d = bc/a, तथा (4) संख्याओं में जोड़ने/घटाने का शॉर्टकट x = |ad - bc| / |(a+d) - (b+c)|। साथ ही बीजगणितीय व करणी वाले प्रश्नों में C&D नियम ((a+b)/(a-b) = (c+d)/(c-d)) का प्रयोग जटिल गणना को सरल बनाने में अचूक सिद्ध होता है।"
  }
};

async function upload() {
  console.log('Uploading study notes for math_ratio_2 (Proportion)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  await db.collection('topic_study_notes').doc('cgv_master_math_ratio_2').set(sanitized);
  console.log('✅ cgv_master_math_ratio_2 saved to Firestore topic_study_notes!');

  // Sync cache: syllabi_custom_all.json
  const cachePath = path.resolve(__dirname, '../server/data_cache/syllabi_custom_all.json');
  if (fs.existsSync(cachePath)) {
    const syllabi = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    const cgv = syllabi.find(s => s.id === 'cgv_master');
    if (cgv) {
      let matched = false;
      cgv.subjects.forEach(sub => {
        sub.chapters.forEach(ch => {
          ch.topics.forEach(t => {
            if (t.id === 'math_ratio_2') {
              t.hasStudyNotes = true;
              matched = true;
            }
          });
        });
      });
      if (matched) {
        fs.writeFileSync(cachePath, JSON.stringify(syllabi, null, 2), 'utf8');
        console.log('✅ syllabi_custom_all.json updated: math_ratio_2 hasStudyNotes = true');
      }
    }
  }

  console.log('\nUpload complete! 🚀');
}

upload().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
