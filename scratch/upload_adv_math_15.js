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
  topicId: 'adv_math_15',
  topicName: 'Frustum',
  topicNameHi: 'छिन्न शंकु',
  chapterId: 'cgv_master_sub_3_ch_16',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'शंकु का छिन्नक (Frustum of a Cone) वह त्रिविमीय (3D) ठोस ज्यामितीय आकृति है जो किसी लंब वृत्तीय शंकु को उसके आधार के समांतर एक समतल द्वारा काटकर शीर्ष वाले छोटे शंकु को हटा देने के पश्चात शेष बचती है। हमारे दैनिक जीवन में प्रयुक्त होने वाली पानी की बाल्टी (Bucket), काँच का गिलास (Tumbler) और लैंपशेड छिन्नक के सर्वाधिक प्रचलित उदाहरण हैं।',
    importance: 'CG Vyapam (सब-इंजीनियर, पटवारी, आरआई, एसआई मेन्स) तथा CGPSC State Engineering / Prelims में छिन्नक के आयतन, वक्र पृष्ठीय क्षेत्रफल, कुल पृष्ठीय क्षेत्रफल और बाल्टी की धारिता (लीटर में) पर आधारित प्रश्न अनिवार्य रूप से पूछे जाते हैं।',
    examRelevance: 'इस अध्याय से बाल्टी की धारिता निकालना ($1000 \\text{ cm}^3 = 1 \\text{ लीटर}$), खुली बाल्टी बनाने में लगी धातु की चादर का क्षेत्रफल ($CSA + \\pi r^2$), तथा तिर्यक ऊँचाई ($l = \\sqrt{h^2 + (R - r)^2}$) की गणना के प्रश्न प्रमुख रूप से पूछे जाते हैं।',
    quickFacts: [
      'यदि दोनों वृत्तीय सिरों की त्रिज्याएं $R$ और $r$ ($R > r$) तथा ऊँचाई $h$ हो:',
      'तिर्यक ऊँचाई (Slant Height): $l = \\sqrt{h^2 + (R - r)^2}$।',
      'आयतन (Volume): $V = \\frac{1}{3}\\pi h (R^2 + r^2 + Rr)$।',
      'वक्र पृष्ठीय क्षेत्रफल (Curved Surface Area): $CSA = \\pi (R + r)l$।',
      'संपूर्ण पृष्ठीय क्षेत्रफल (Total Surface Area): $TSA = \\pi (R + r)l + \\pi R^2 + \\pi r^2$।',
      'खुली बाल्टी का पृष्ठीय क्षेत्रफल: $A = \\pi (R + r)l + \\pi r^2$ (केवल पेंदे का क्षेत्रफल जोड़ते हैं)।',
      'धारिता संबंध: $1 \\text{ m}^3 = 1000 \\text{ लीटर}$ तथा $1000 \\text{ cm}^3 = 1 \\text{ लीटर}$।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'शंकु के छिन्नक की ज्यामिति एवं शब्दावली',
      content: `### 1. छिन्नक की परिभाषा एवं निर्माण
जब किसी लंब वृत्तीय शंकु को उसके वृत्तीय आधार के समांतर किसी समतल द्वारा काटा जाता है, तो शंकु दो भागों में बंट जाता है:
1. शीर्ष की ओर का भाग: एक छोटा शंकु।
2. आधार की ओर का शेष भाग: **शंकु का छिन्नक (Frustum of Cone)**।

### 2. महत्वपूर्ण ज्यामितीय घटक
- **बड़ा आधार (Lower Base):** इसकी त्रिज्या को $R$ (या $r_1$) माना जाता है।
- **छोटा आधार (Upper Base):** इसकी त्रिज्या को $r$ (या $r_2$) माना जाता है। ($R > r$)
- **ऊर्ध्वाधर ऊँचाई (Vertical Height - $h$):** दोनों समांतर वृत्तीय आधारों के केंद्रों के बीच की लंबवत दूरी।
- **तिर्यक ऊँचाई (Slant Height - $l$):** छिन्नक के वक्र पृष्ठ के किनारे की ढालू लंबाई।

### 3. तिर्यक ऊँचाई ($l$) का सूत्र
पाइथागोरस प्रमेय से:
$$l^2 = h^2 + (R - r)^2$$
$$l = \\sqrt{h^2 + (R - r)^2}$$
- **ध्यान दें:** पूर्ण शंकु में $l = \\sqrt{h^2 + r^2}$ होता है, जबकि छिन्नक में त्रिज्याओं का अंतर $(R - r)$ प्रयुक्त होता है।`
    },
    {
      id: 'ch2',
      title: 'छिन्नक का आयतन एवं धारिता (Volume & Capacity)',
      content: `### 1. आयतन सूत्र की व्युत्पत्ति
छिन्नक का आयतन = (मूल बड़े शंकु का आयतन) - (काटे गए छोटे शंकु का आयतन)
समरूप त्रिभुजों के आधार पर अनुपात स्थापित करने पर मानक सूत्र प्राप्त होता है:
$$V = \\frac{1}{3}\\pi h (R^2 + r^2 + Rr)$$

जहाँ:
- $h$ = छिन्नक की ऊँचाई
- $R$ = बड़े सिरे की त्रिज्या
- $r$ = छोटे सिरे की त्रिज्या

### 2. बाल्टी की धारिता एवं लीटर रूपांतरण (Capacity Conversion)
परीक्षाओं में बाल्टी का आयतन लीटर में पूछा जाता है:
- **रूपांतरण नियम 1:** $1 \\text{ लीटर} = 1000 \\text{ सेमी}^3$ (अतः $\\text{सेमी}^3$ को 1000 से भाग देने पर लीटर प्राप्त होता है)।
- **रूपांतरण नियम 2:** $1 \\text{ मीटर}^3 = 1000 \\text{ लीटर}$।

**उदाहरण:** यदि किसी बाल्टी की ऊँचाई 35 सेमी तथा सिरों की त्रिज्याएं 28 सेमी और 7 सेमी हों:
$$V = \\frac{1}{3} \\times \\frac{22}{7} \\times 35 \\times (28^2 + 7^2 + 28 \\times 7)$$
$$= \\frac{110}{3} \\times (784 + 49 + 196) = \\frac{110}{3} \\times 1029 = 110 \\times 343 = 37,730 \\text{ सेमी}^3$$
- धारिता (लीटर में) $= \\frac{37730}{1000} = 37.73 \\text{ लीटर}$।`
    },
    {
      id: 'ch3',
      title: 'पृष्ठीय क्षेत्रफल (वक्र, संपूर्ण एवं खुली बाल्टी)',
      content: `### 1. वक्र पृष्ठीय क्षेत्रफल (Curved Surface Area - CSA)
छिन्नक के मुड़े हुए (पार्श्व) भाग का क्षेत्रफल:
$$CSA = \\pi (R + r)l$$
जहाँ $l = \\sqrt{h^2 + (R - r)^2}$ है।

### 2. संपूर्ण पृष्ठीय क्षेत्रफल (Total Surface Area - TSA)
जब छिन्नक दोनों सिरों (ऊपर और नीचे) से पूर्णतः बंद हो:
$$TSA = CSA + \\text{निचले वृत्त का क्षेत्रफल} + \\text{ऊपरी वृत्त का क्षेत्रफल}$$
$$TSA = \\pi (R + r)l + \\pi R^2 + \\pi r^2 = \\pi [(R + r)l + R^2 + r^2]$$

### 3. खुली बाल्टी का क्षेत्रफल (Metal Sheet required for Bucket)
दैनिक जीवन में बाल्टी ऊपर से खुली होती है और नीचे से बंद होती है (छोटा सिरा नीचे होता है):
$$\\text{चादर का क्षेत्रफल} = CSA + \\text{पेंदे का क्षेत्रफल}$$
$$A = \\pi (R + r)l + \\pi r^2$$
(यहाँ केवल छोटे आधार $\\pi r^2$ को जोड़ा जाता है, बड़े आधार $\\pi R^2$ को नहीं!)`
    },
    {
      id: 'ch4',
      title: 'समरूप त्रिभुज विधि से मूल शंकु की ऊँचाई ज्ञात करना',
      content: `### 1. समरूप त्रिभुजों का संबंध
यदि छिन्नक को ऊपर की ओर बढ़ाकर मूल शंकु पूरा किया जाए:
- माना काटे गए छोटे शंकु की ऊँचाई $h_1$ है।
- मूल बड़े शंकु की कुल ऊँचाई $H = h + h_1$ है।
समरूप त्रिभुजों के नियम से:
$$\\frac{h_1}{H} = \\frac{r}{R} \\implies \\frac{h_1}{h + h_1} = \\frac{r}{R}$$
$$R \\cdot h_1 = r \\cdot h + r \\cdot h_1 \\implies h_1(R - r) = r \\cdot h$$
$$h_1 = \\frac{r \\cdot h}{R - r}$$
अतः मूल बड़े शंकु की कुल ऊँचाई:
$$H = h + \\frac{r \\cdot h}{R - r} = \\frac{R \\cdot h}{R - r}$$`
    },
    {
      id: 'ch5',
      title: 'CG Vyapam परीक्षा उपयोगी शॉर्टकट्स एवं अनुप्रयोग',
      content: `### ट्रिक 1: तिर्यक ऊँचाई में पाइथागोरियन त्रिक
यदि ऊँचाई $h$ और त्रिज्याओं का अंतर $(R - r)$ पाइथागोरियन त्रिक (जैसे $3, 4, 5$ या $5, 12, 13$) बनाते हों, तो $l$ मौखिक निकाला जा सकता है:
- उदाहरण: यदि $h = 12$ और $R = 10, r = 5 \\implies R - r = 5$
- यहाँ $(5, 12, 13)$ का त्रिक बनता है, अतः $l = 13$ सेमी सीधे प्राप्त होगा!

### ट्रिक 2: दूध के बर्तन (Canister) की लागत गणना
यदि धातु की चादर की दर ₹$C$ प्रति वर्ग सेमी हो, तो:
$$\\text{कुल लागत} = [\\pi (R + r)l + \\pi r^2] \\times C$$
यदि दूध का मूल्य ₹$M$ प्रति लीटर हो, तो:
$$\\text{दूध का कुल मूल्य} = \\left(\\frac{V}{1000}\\right) \\times M$$`
    }
  ],
  comparativeTables: [
    {
      title: 'पूर्ण शंकु बनाम शंकु का छिन्नक',
      headers: ['मापदंड / सूत्र', 'पूर्ण शंकु (Right Circular Cone)', 'शंकु का छिन्नक (Frustum)'],
      rows: [
        ['वृत्तीय सिरों की संख्या', 'केवल 1 वृत्तीय आधार ($r$)', '2 वृत्तीय सिरे ($R$ और $r$, जहाँ $R > r$)'],
        ['तिर्यक ऊँचाई ($l$)', '$\\sqrt{h^2 + r^2}$', '$\\sqrt{h^2 + (R - r)^2}$'],
        ['आयतन ($V$)', '$\\frac{1}{3}\\pi r^2 h$', '$\\frac{1}{3}\\pi h (R^2 + r^2 + Rr)$'],
        ['वक्र पृष्ठीय क्षेत्रफल ($CSA$)', '$\\pi r l$', '$\\pi (R + r)l$'],
        ['संपूर्ण पृष्ठीय क्षेत्रफल ($TSA$)', '$\\pi r(l + r)$', '$\\pi [(R + r)l + R^2 + r^2]$']
      ]
    },
    {
      title: 'बंद छिन्नक बनाम खुली बाल्टी का क्षेत्रफल',
      headers: ['विशेषता', 'पूर्णतः बंद छिन्नक (Closed Frustum)', 'खुली बाल्टी (Open Bucket)'],
      rows: [
        ['शामिल पृष्ठ', 'वक्र पृष्ठ + दोनों वृत्तीय सिरे', 'वक्र पृष्ठ + केवल निचला बंद पेंदा'],
        ['प्रयुक्त सूत्र', '$\\pi (R + r)l + \\pi R^2 + \\pi r^2$', '$\\pi (R + r)l + \\pi r^2$'],
        ['क्षेत्रफल का अंतर', 'खुली बाल्टी से $\\pi R^2$ अधिक', 'बंद छिन्नक से $\\pi R^2$ कम'],
        ['व्यावहारिक उदाहरण', 'तेल का सीलबंद डिब्बा', 'पानी भरने की बाल्टी, गिलास']
      ]
    },
    {
      title: 'विभिन्न 3D ठोसों के आयतन एवं वक्र पृष्ठ सूत्र',
      headers: ['ठोस आकृति', 'आयतन सूत्र ($V$)', 'वक्र पृष्ठीय क्षेत्रफल ($CSA$)'],
      rows: [
        ['बेलन (Cylinder)', '$\\pi r^2 h$', '$2\\pi r h$'],
        ['शंकु (Cone)', '$\\frac{1}{3}\\pi r^2 h$', '$\\pi r l$'],
        ['छिन्नक (Frustum)', '$\\frac{1}{3}\\pi h (R^2 + r^2 + Rr)$', '$\\pi (R + r)l$'],
        ['गोला (Sphere)', '$\\frac{4}{3}\\pi r^3$', '$4\\pi r^2$'],
        ['अर्धगोला (Hemisphere)', '$\\frac{2}{3}\\pi r^3$', '$2\\pi r^2$']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'एक शंकु के छिन्नक की ऊँचाई 14 सेमी है तथा इसके वृत्ताकार सिरों की त्रिज्याएं 4 सेमी और 2 सेमी हैं। इस छिन्नक का आयतन क्या होगा? ($\\pi = \\frac{22}{7}$ लें) [CG Vyapam Sub-Engineer / Patwari]',
      options: [
        '$\\frac{308}{3}$ सेमी$^3$',
        '$\\frac{616}{3}$ सेमी$^3$',
        '$\\frac{1232}{3}$ सेमी$^3$',
        '308 सेमी$^3$'
      ],
      correctOption: 2,
      examName: 'CG Vyapam Sub-Engineer',
      explanation: 'यहाँ $h = 14$ सेमी, $R = 4$ सेमी, $r = 2$ सेमी\nछिन्नक के आयतन का सूत्र:\n$$V = \\frac{1}{3}\\pi h (R^2 + r^2 + Rr)$$\n$$V = \\frac{1}{3} \\times \\frac{22}{7} \\times 14 \\times (4^2 + 2^2 + 4 \\times 2)$$\n$$V = \\frac{1}{3} \\times 44 \\times (16 + 4 + 8) = \\frac{44 \\times 28}{3} = \\frac{1232}{3} \\text{ सेमी}^3 = 410.67 \\text{ सेमी}^3$$'
    },
    {
      id: 'pyq2',
      question: 'एक बाल्टी के दोनों वृत्ताकार सिरों की त्रिज्याएं 28 सेमी और 7 सेमी हैं। यदि इसकी ऊँचाई 45 सेमी हो, तो बाल्टी की धारिता (लीटर में) क्या होगी? [CGPSC SSE / Vyapam Combined]',
      options: [
        '48.51 लीटर',
        '38.50 लीटर',
        '42.25 लीटर',
        '52.60 लीटर'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'यहाँ $h = 45, R = 28, r = 7$\n$$V = \\frac{1}{3}\\pi h (R^2 + r^2 + Rr)$$\n$$= \\frac{1}{3} \\times \\frac{22}{7} \\times 45 \\times (28^2 + 7^2 + 28 \\times 7)$$\n$$= \\frac{22 \\times 15}{7} \\times (784 + 49 + 196) = \\frac{330}{7} \\times 1029 = 330 \\times 147 = 48510 \\text{ सेमी}^3$$\nधारिता (लीटर में) $= \\frac{48510}{1000} = 48.51 \\text{ लीटर}$'
    },
    {
      id: 'pyq3',
      question: 'एक शंकु के छिन्नक की तिर्यक ऊँचाई 4 सेमी है तथा इसके वृत्तीय सिरों के परिमाप (परिधियाँ) 18 सेमी और 6 सेमी हैं। छिन्नक का वक्र पृष्ठीय क्षेत्रफल क्या होगा? [CG Vyapam SI Mains]',
      options: [
        '48 सेमी$^2$',
        '96 सेमी$^2$',
        '36 सेमी$^2$',
        '72 सेमी$^2$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam SI Mains',
      explanation: 'परिधियाँ दी गई हैं:\n$2\\pi R = 18 \\implies \\pi R = 9$\n$2\\pi r = 6 \\implies \\pi r = 3$\nअतः $\\pi(R + r) = \\pi R + \\pi r = 9 + 3 = 12$\nवक्र पृष्ठीय क्षेत्रफल:\n$$CSA = \\pi (R + r)l = 12 \\times 4 = 48 \\text{ सेमी}^2$$'
    },
    {
      id: 'pyq4',
      question: 'एक पानी का गिलास शंकु के छिन्नक के आकार का है जिसकी ऊँचाई 14 सेमी तथा सिरों के व्यास 4 सेमी और 2 सेमी हैं। गिलास की धारिता क्या होगी? [CG Vyapam Hostel Superintendent]',
      options: [
        '102.67 सेमी$^3$',
        '105.33 सेमी$^3$',
        '100.50 सेमी$^3$',
        '110.00 सेमी$^3$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'त्रिज्याएं: $R = \\frac{4}{2} = 2$ सेमी, $r = \\frac{2}{2} = 1$ सेमी, $h = 14$ सेमी\n$$V = \\frac{1}{3} \\times \\frac{22}{7} \\times 14 \\times (2^2 + 1^2 + 2 \\times 1)$$\n$$= \\frac{44}{3} \\times (4 + 1 + 2) = \\frac{44 \\times 7}{3} = \\frac{308}{3} \\approx 102.67 \\text{ सेमी}^3$$'
    },
    {
      id: 'pyq5',
      question: 'यदि किसी शंकु के छिन्नक की ऊँचाई 12 सेमी तथा सिरों की त्रिज्याएं 10 सेमी और 5 सेमी हों, तो उसकी तिर्यक ऊँचाई (Slant Height) क्या होगी? [CG Vyapam RI / Revenue Inspector]',
      options: [
        '13 सेमी',
        '15 सेमी',
        '14 सेमी',
        '17 सेमी'
      ],
      correctOption: 0,
      examName: 'CG Vyapam RI',
      explanation: 'तिर्यक ऊँचाई सूत्र:\n$$l = \\sqrt{h^2 + (R - r)^2} = \\sqrt{12^2 + (10 - 5)^2} = \\sqrt{144 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13 \\text{ सेमी}$$'
    },
    {
      id: 'pyq6',
      question: 'एक धातु की बाल्टी के सिरों की त्रिज्याएं 20 सेमी और 10 सेमी तथा ऊँचाई 24 सेमी है। बाल्टी को बनाने में प्रयुक्त धातु की चादर का क्षेत्रफल क्या होगा? [CG Vyapam Teacher / AMO]',
      options: [
        '2105.7 सेमी$^2$',
        '2765.7 सेमी$^2$',
        '1850.0 सेमी$^2$',
        '2450.5 सेमी$^2$'
      ],
      correctOption: 1,
      examName: 'CG Vyapam Teacher',
      explanation: 'तिर्यक ऊँचाई $l = \\sqrt{24^2 + (20 - 10)^2} = \\sqrt{576 + 100} = \\sqrt{676} = 26$ सेमी\nखुली बाल्टी की चादर का क्षेत्रफल:\n$$A = \\pi (R + r)l + \\pi r^2 = \\pi [(R + r)l + r^2]$$\n$$= \\frac{22}{7} [(20 + 10) \\times 26 + 10^2] = \\frac{22}{7} [30 \\times 26 + 100] = \\frac{22}{7} [780 + 100]$$\n$$= \\frac{22}{7} \\times 880 = \\frac{19360}{7} \\approx 2765.71 \\text{ सेमी}^2$$'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'शंकु के छिन्नक के वक्र पृष्ठीय क्षेत्रफल का सही सूत्र क्या है?',
      options: [
        '$\\pi (R + r)l$',
        '$\\pi (R - r)l$',
        '$\\pi (R^2 + r^2)l$',
        '$2\\pi (R + r)h$'
      ],
      correctOption: 0,
      explanation: 'छिन्नक के वक्र पृष्ठ का सूत्र $\\pi(R + r)l$ होता है, जहाँ $l = \\sqrt{h^2 + (R - r)^2}$ है।'
    },
    {
      id: 'mcq2',
      question: 'यदि किसी छिन्नक के दोनों वृत्तीय सिरों की त्रिज्याएं समान ($R = r$) हो जाएं, तो वह आकृति क्या बन जाएगी?',
      options: [
        'लंब वृत्तीय बेलन (Cylinder)',
        'शंकु (Cone)',
        'गोला (Sphere)',
        'अर्धगोला (Hemisphere)'
      ],
      correctOption: 0,
      explanation: 'जब $R = r$ हो जाता है, तो दोनों वृत्तीय सिरे सर्वांगसम हो जाते हैं और आकृति बेलन (Cylinder) का रूप ले लेती है। तब $V = \\frac{1}{3}\\pi h(r^2 + r^2 + r^2) = \\pi r^2 h$ प्राप्त होता है।'
    },
    {
      id: 'mcq3',
      question: '1 घन मीटर ($1 \\text{ m}^3$) में कितने लीटर होते हैं?',
      options: [
        '1000 लीटर',
        '100 लीटर',
        '10000 लीटर',
        '10 लीटर'
      ],
      correctOption: 0,
      explanation: '$1 \\text{ m}^3 = 1000 \\text{ लीटर}$ तथा $1000 \\text{ सेमी}^3 = 1 \\text{ लीटर}$ होता है।'
    },
    {
      id: 'mcq4',
      question: 'एक छिन्नक के दोनों सिरों के व्यास 8 सेमी और 2 सेमी हैं तथा ऊँचाई 4 सेमी है। इसकी तिर्यक ऊँचाई क्या होगी?',
      options: [
        '5 सेमी',
        '6 सेमी',
        '$\\sqrt{41}$ सेमी',
        '7 सेमी'
      ],
      correctOption: 0,
      explanation: 'त्रिज्याएं: $R = 4, r = 1$ सेमी\n$$l = \\sqrt{h^2 + (R - r)^2} = \\sqrt{4^2 + (4 - 1)^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5 \\text{ सेमी}$$'
    },
    {
      id: 'mcq5',
      question: 'एक छिन्नक की ऊँचाई 6 सेमी है और सिरों की त्रिज्याएं 5 सेमी और 3 सेमी हैं। इसका आयतन क्या होगा?',
      options: [
        '$98\\pi$ सेमी$^3$',
        '$49\\pi$ सेमी$^3$',
        '$147\\pi$ सेमी$^3$',
        '$96\\pi$ सेमी$^3$'
      ],
      correctOption: 0,
      explanation: '$$V = \\frac{1}{3}\\pi (6) (5^2 + 3^2 + 5 \\times 3) = 2\\pi (25 + 9 + 15) = 2\\pi (49) = 98\\pi \\text{ सेमी}^3$$'
    },
    {
      id: 'mcq6',
      question: 'किसी शंकु के छिन्नक का संपूर्ण पृष्ठीय क्षेत्रफल ज्ञात करने के लिए वक्र पृष्ठ में क्या जोड़ा जाता है?',
      options: [
        'दोनों वृत्ताकार सिरों का क्षेत्रफल ($\\pi R^2 + \\pi r^2$)',
        'केवल बड़े सिरे का क्षेत्रफल ($\\pi R^2$)',
        'केवल छोटे सिरे का क्षेत्रफल ($\\pi r^2$)',
        'आधार का परिमाप'
      ],
      correctOption: 0,
      explanation: 'संपूर्ण पृष्ठीय क्षेत्रफल में वक्र पृष्ठ के साथ-साथ दोनों सिरों के वृत्तों का क्षेत्रफल $\\pi R^2 + \\pi r^2$ जोड़ा जाता है।'
    },
    {
      id: 'mcq7',
      question: 'यदि किसी शंकु के छिन्नक की तिर्यक ऊँचाई 10 सेमी है तथा $R - r = 6$ सेमी है, तो छिन्नक की ऊर्ध्वाधर ऊँचाई क्या होगी?',
      options: [
        '8 सेमी',
        '6 सेमी',
        '4 सेमी',
        '16 सेमी'
      ],
      correctOption: 0,
      explanation: 'पाइथागोरस त्रिक $(6, 8, 10)$ से:\n$$h = \\sqrt{l^2 - (R - r)^2} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8 \\text{ सेमी}$$'
    },
    {
      id: 'mcq8',
      question: 'एक तुर्की टोपी (Fez) शंकु के छिन्नक के आकार की है। यदि खुले सिरे की त्रिज्या 10 सेमी, ऊपरी सिरे की त्रिज्या 4 सेमी और तिर्यक ऊँचाई 15 सेमी हो, तो इसे बनाने में प्रयुक्त पदार्थ का क्षेत्रफल क्या होगा?',
      options: [
        '$710.28$ सेमी$^2$',
        '$660.00$ सेमी$^2$',
        '$750.50$ सेमी$^2$',
        '$800.00$ सेमी$^2$'
      ],
      correctOption: 0,
      explanation: 'टोपी नीचे (बड़े सिरे) से खुली और ऊपर (छोटे सिरे) से बंद होती है:\n$$A = \\pi (R + r)l + \\pi r^2 = \\frac{22}{7} [(10 + 4) \\times 15 + 4^2] = \\frac{22}{7} [14 \\times 15 + 16]$$\n$$= \\frac{22}{7} [210 + 16] = \\frac{22 \\times 226}{7} = \\frac{4972}{7} \\approx 710.28 \\text{ सेमी}^2$$'
    }
  ],
  keyTerminology: [
    {
      term: 'Frustum of Cone',
      termHi: 'शंकु का छिन्नक',
      definition: 'The portion of a right circular cone that remains after its top part is sliced off by a plane parallel to its base.',
      definitionHi: 'किसी शंकु को उसके आधार के समांतर समतल द्वारा काटने पर शीर्ष के छोटे शंकु को हटाने के बाद बचा हुआ निचला ठोस।'
    },
    {
      term: 'Slant Height ($l$)',
      termHi: 'तिर्यक ऊँचाई',
      definition: 'The slanted distance along the lateral face connecting the circumferences of both circular bases ($l = \\sqrt{h^2 + (R - r)^2}$).',
      definitionHi: 'दोनों वृत्तीय आधारों की परिधियों को जोड़ने वाली पार्श्व वक्र पृष्ठ की ढालू लंबाई।'
    },
    {
      term: 'Capacity / Volume',
      termHi: 'धारिता / आयतन',
      definition: 'The internal storage volume of the frustum measured in cubic units or litres ($V = \\frac{1}{3}\\pi h(R^2 + r^2 + Rr)$).',
      definitionHi: 'छिन्नक के भीतर समाहित होने वाले द्रव या पदार्थ का कुल परिमाण।'
    },
    {
      term: 'Curved Surface Area (CSA)',
      termHi: 'वक्र पृष्ठीय क्षेत्रफल',
      definition: 'The area of the curved lateral boundary excluding both flat circular ends ($\\pi(R + r)l$).',
      definitionHi: 'दोनों समतल वृत्तीय सिरों को छोड़कर छिन्नक के केवल मुड़े हुए पार्श्व भाग का क्षेत्रफल।'
    },
    {
      term: 'Total Surface Area (TSA)',
      termHi: 'संपूर्ण पृष्ठीय क्षेत्रफल',
      definition: 'The combined area of the curved surface plus both top and bottom circular bases ($\\pi(R+r)l + \\pi R^2 + \\pi r^2$).',
      definitionHi: 'वक्र पृष्ठ तथा दोनों वृत्तीय आधारों के क्षेत्रफलों का कुल योग।'
    },
    {
      term: 'Open Bucket Area',
      termHi: 'खुली बाल्टी का क्षेत्रफल',
      definition: 'The surface area calculated for an open-top container requiring material for curved face and bottom only ($CSA + \\pi r^2$).',
      definitionHi: 'ऊपर से खुले बर्तन के निर्माण में प्रयुक्त चादर का क्षेत्रफल, जिसमें वक्र पृष्ठ के साथ केवल निचला पेंदा जुड़ता है।'
    },
    {
      term: 'Litre-Cubic Centimetre Ratio',
      termHi: 'लीटर-घन सेमी संबंध',
      definition: 'The standard volumetric conversion factor where 1000 cm³ equals exactly 1 litre.',
      definitionHi: 'आयतन का मानक रूपांतरण संबंध जिसके अनुसार 1000 घन सेमी बराबर ठीक 1 लीटर होता है।'
    },
    {
      term: 'Similar Cones Method',
      termHi: 'समरूप शंकु विधि',
      definition: 'The proportional geometric technique used to deduce properties of the original undivided cone.',
      definitionHi: 'छिन्नक से मूल अविभाजित शंकु की ऊँचाई और तिर्यक ऊँचाई ज्ञात करने की समरूपता विधि।'
    }
  ],
  sources: [
    {
      title: 'NCERT Class 10 Mathematics - Chapter 13: Surface Areas and Volumes (Frustum of a Cone)',
      author: 'NCERT',
      description: 'शंकु के छिन्नक के आयतन, पृष्ठीय क्षेत्रफल एवं व्यावहारिक बाल्टी मॉडल का आधिकारिक मानक संदर्भ।'
    },
    {
      title: 'Quantitative Aptitude for Competitive Examinations',
      author: 'R.S. Aggarwal',
      description: '3D क्षेत्रमिति एवं छिन्नक के प्रतियोगी परीक्षा उपयोगी प्रश्नों का संकलन।'
    },
    {
      title: 'CG Vyapam Previous Year Solved Papers (2015-2024)',
      author: 'CGPEB',
      description: 'छत्तीसगढ़ व्यापम की सब-इंजीनियर, पटवारी एवं एसआई परीक्षाओं के वास्तविक प्रश्न।'
    },
    {
      title: 'Elementary Mensuration',
      author: 'F.H. Stevens',
      description: 'ठोस आकृतियों और छिन्नकों के आयतन एवं वक्र पृष्ठ सूत्रों का शास्त्रीय गणितीय विश्लेषण।'
    }
  ],
  confusionBuster: [
    {
      misconception: 'छिन्नक की तिर्यक ऊँचाई में त्रिज्याओं को जोड़ा जाता है ($R + r$)।',
      clarification: 'तिर्यक ऊँचाई सूत्र में त्रिज्याओं का अंतर होता है: $l = \\sqrt{h^2 + (R - r)^2}$! त्रिज्याओं का जोड़ केवल वक्र पृष्ठ सूत्र $\\pi(R + r)l$ में आता है।'
    },
    {
      misconception: 'बाल्टी का क्षेत्रफल निकालते समय दोनों वृत्तीय सिरों का क्षेत्रफल जोड़ दिया जाता है।',
      clarification: 'बाल्टी ऊपर से खुली होती है! इसलिए केवल नीचे के छोटे पेंदे का क्षेत्रफल $\\pi r^2$ जोड़ा जाता है, बड़ा सिरा $\\pi R^2$ नहीं जोड़ा जाता।'
    },
    {
      misconception: 'आयतन निकालते समय $\\frac{1}{3}\\pi h (R + r)^2$ लिख दिया जाता है।',
      clarification: '$(R + r)^2 = R^2 + r^2 + 2Rr$ होता है, जबकि छिन्नक के आयतन में $R^2 + r^2 + Rr$ होता है ($2Rr$ नहीं!)।'
    },
    {
      misconception: '$1 \\text{ लीटर} = 100 \\text{ सेमी}^3$ होता है।',
      clarification: '$1 \\text{ लीटर} = 1000 \\text{ सेमी}^3$ होता है। 100 से भाग देने पर उत्तर 10 गुना गलत हो जाएगा।'
    },
    {
      misconception: 'यदि दोनों त्रिज्याएं समान हो जाएं तो छिन्नक का अस्तित्व समाप्त हो जाता है।',
      clarification: 'यदि $R = r$ हो जाए, तो छिन्नक एक लंब वृत्तीय बेलन (Cylinder) में परिवर्तित हो जाता है।'
    }
  ],
  faqList: [
    {
      question: 'शंकु का छिन्नक क्या होता है?',
      answer: 'जब किसी शंकु को उसके आधार के समांतर समतल से काटकर शीर्ष वाले छोटे शंकु को हटा दिया जाता है, तो बचा हुआ ठोस भाग छिन्नक कहलाता है।'
    },
    {
      question: 'बाल्टी की धारिता लीटर में कैसे निकाली जाती है?',
      answer: 'पहले सूत्र $V = \\frac{1}{3}\\pi h(R^2 + r^2 + Rr)$ से आयतन घन सेमी (cm³) में निकालें, फिर प्राप्त मान को 1000 से भाग देकर लीटर में बदलें।'
    },
    {
      question: 'खुली बाल्टी बनाने में लगी धातु की चादर का सूत्र क्या है?',
      answer: 'धातु की चादर का क्षेत्रफल = $CSA + \\text{पेंदे का क्षेत्रफल} = \\pi (R + r)l + \\pi r^2$।'
    },
    {
      question: 'तिर्यक ऊँचाई $l$ का सही सूत्र क्या है?',
      answer: '$l = \\sqrt{h^2 + (R - r)^2}$, जहाँ $h$ ऊँचाई है तथा $R$ और $r$ क्रमशः बड़े व छोटे सिरे की त्रिज्याएं हैं।'
    },
    {
      question: 'CG Vyapam में छिन्नक से किस तरह के प्रश्न आते हैं?',
      answer: 'व्यापम में मुख्यतः (1) बाल्टी की धारिता लीटर में, (2) धातु की चादर की लागत, (3) तिर्यक ऊँचाई, और (4) परिधियों से वक्र पृष्ठ निकालने के प्रश्न पूछे जाते हैं।'
    }
  ],
  oneLinerRevision: [
    'छिन्नक की तिर्यक ऊँचाई: $l = \\sqrt{h^2 + (R - r)^2}$।',
    'छिन्नक का आयतन: $V = \\frac{1}{3}\\pi h (R^2 + r^2 + Rr)$।',
    'वक्र पृष्ठीय क्षेत्रफल (CSA): $\\pi (R + r)l$।',
    'संपूर्ण पृष्ठीय क्षेत्रफल (TSA): $\\pi [(R + r)l + R^2 + r^2]$।',
    'खुली बाल्टी की चादर का क्षेत्रफल: $\\pi (R + r)l + \\pi r^2$।',
    'रूपांतरण: $1000 \\text{ सेमी}^3 = 1 \\text{ लीटर}$ तथा $1 \\text{ मीटर}^3 = 1000 \\text{ लीटर}$।',
    'यदि $R = r$ हो जाए, तो छिन्नक बेलन (Cylinder) बन जाता है।',
    'तुर्की टोपी का क्षेत्रफल: $\\pi (R + r)l + \\pi r^2$ (छोटा सिरा बंद)।',
    'परिधियों से वक्र पृष्ठ: $\\frac{1}{2}(C_1 + C_2)l$।',
    'मूल शंकु की कुल ऊँचाई: $H = \\frac{R \\cdot h}{R - r}$।'
  ],
  rapidRevision: {
    points: [
      'तिर्यक ऊँचाई: $l = \\sqrt{h^2 + (R - r)^2}$।',
      'आयतन: $V = \\frac{1}{3}\\pi h (R^2 + r^2 + Rr)$।',
      'वक्र पृष्ठ: $\\pi (R + r)l$।',
      'संपूर्ण पृष्ठ: $\\pi (R + r)l + \\pi R^2 + \\pi r^2$।',
      'खुली बाल्टी: $\\pi (R + r)l + \\pi r^2$।',
      'लीटर रूपांतरण: $\\text{आयतन (सेमी}^3) / 1000$।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_15 (Frustum)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_15').set(sanitized);
  console.log('✅ cgv_master_adv_math_15 saved to Firestore topic_study_notes!');

  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === 'cgv_master_sub_3') {
        for (const ch of sub.chapters || []) {
          if (ch.id === 'cgv_master_sub_3_ch_16') {
            for (const t of ch.topics || []) {
              if (t.id === 'adv_math_15') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_15 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 adv_math_15 is synced!');
}

upload().catch(console.error);
