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
  topicId: 'adv_math_21',
  topicName: 'Quantitative Comparison',
  topicNameHi: 'मात्रात्मक तुलना',
  chapterId: 'cgv_master_sub_3_ch_18',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'मात्रात्मक तुलना (Quantitative Comparison / Quantity I vs Quantity II) आधुनिक प्रतियोगी परीक्षाओं का एक अत्यंत विश्लेषणात्मक और रणनीतिक प्रारूप है। इसमें किसी एक संख्यात्मक उत्तर की गणना करने के स्थान पर दो स्वतंत्र स्थितियों या व्यंजकों (मात्रा I और मात्रा II) के मानों का मूल्यांकन करके उनके मध्य तुलनात्मक संबंध ($> , < , \\ge , \\le , =$ अथवा कोई संबंध नहीं) स्थापित करना होता है।',
    importance: 'CG Vyapam SI Mains, पटवारी, आरआई, छात्रावास अधीक्षक तथा CGPSC CSAT में मात्रात्मक तुलना से 3 से 5 प्रश्न पूछे जाते हैं। यह एक ही प्रश्न में दो अलग-अलग अध्यायों (जैसे द्विघात समीकरण, लाभ-हानि, क्षेत्रमिति, साधारण/चक्रवृद्धि ब्याज) के ज्ञान की संयुक्त परीक्षा लेता है।',
    examRelevance: 'परीक्षाओं में द्विघात समीकरणों के मूलों की तुलना ($x$ vs $y$), साधारण ब्याज बनाम चक्रवृद्धि ब्याज की राशियों की तुलना, दो व्यक्तियों की वर्तमान आयु, तथा आयतन व पृष्ठीय क्षेत्रफल की मात्रात्मक तुलना के प्रश्न प्रमुखता से पूछे जाते हैं।',
    quickFacts: [
      '5 मानक विकल्प: (1) $Q_I > Q_{II}$, (2) $Q_I < Q_{II}$, (3) $Q_I \\ge Q_{II}$, (4) $Q_I \\le Q_{II}$, (5) $Q_I = Q_{II}$ अथवा संबंध स्थापित नहीं किया जा सकता (CND)।',
      'पूर्ण गणना करने के बजाय केवल तुलनात्मक मान (Relative Value) या चिन्हों की जाँच करना सबसे तेज़ रणनीति है।',
      'द्विघात समीकरण का सुपरफास्ट नियम: यदि दोनों समीकरणों में अचर पद ऋणात्मक ($-c$) हों, तो सदैव उत्तर "संबंध स्थापित नहीं हो सकता" (CND) होता है!',
      'ऋणात्मक संख्याओं में तुलना: $-2 > -5$ होता है (संख्यात्मक मान बड़ा होने पर ऋणात्मक संख्या छोटी होती है)।',
      'यदि एक स्थिति में $Q_I > Q_{II}$ और दूसरी स्थिति में $Q_I < Q_{II}$ आ जाए, तो संबंध स्थापित नहीं हो सकता।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'मात्रात्मक तुलना का प्रारूप एवं 5 मानक विकल्प',
      content: `### 1. प्रश्न की संरचना
प्रत्येक प्रश्न में दो मात्राएं दी जाती हैं:
- **मात्रा I (Quantity I):** एक गणितीय कथन या समस्या।
- **मात्रा II (Quantity II):** दूसरा गणितीय कथन या समस्या।
परीक्षार्थी को दोनों को हल करके 5 विकल्पों में से सही संबंध चुनना होता है:

1. यदि $\\text{Quantity I} > \\text{Quantity II}$
2. यदि $\\text{Quantity I} < \\text{Quantity II}$
3. यदि $\\text{Quantity I} \\ge \\text{Quantity II}$
4. यदि $\\text{Quantity I} \\le \\text{Quantity II}$
5. यदि $\\text{Quantity I} = \\text{Quantity II}$ अथवा **संबंध निर्धारित नहीं किया जा सकता (Cannot be established / CND)**।

### 2. संबंध कब निर्धारित नहीं किया जा सकता (When CND)?
संबंध केवल दो स्थितियों में निर्धारित नहीं किया जा सकता:
1. जब एक मूल के लिए $Q_I > Q_{II}$ हो किंतु दूसरे मूल के लिए $Q_I < Q_{II}$ हो (विरोधाभास)।
2. जब दी गई जानकारी अपर्याप्त हो और चर का कोई निश्चित मान या सीमा तय न हो सके।`
    },
    {
      id: 'ch2',
      title: 'द्विघात समीकरणों की तुलना (Quadratic Roots Comparison)',
      content: `### 1. चिन्ह नियम विधि (Sign Method - 5 सेकंड ट्रिक)
द्विघात समीकरण $ax^2 + bx + c = 0$ के मूलों के चिन्ह सीधे समीकरण के चिन्हों से पहचाने जा सकते हैं:
1. यदि समीकरण: $+ , + \\implies$ दोनों मूल **ऋणात्मक ($- , -$)** होंगे।
2. यदि समीकरण: $- , + \\implies$ दोनों मूल **धनात्मक ($+ , +$)** होंगे।
3. यदि समीकरण: $+ , - \\implies$ मूल **ऋणात्मक व धनात्मक ($- , +$)** होंगे (बड़ा मूल $-$)।
4. यदि समीकरण: $- , - \\implies$ मूल **धनात्मक व ऋणात्मक ($+ , -$)** होंगे (बड़ा मूल $+$)।

### 2. सीधे उत्तर देने का गोल्डन नियम (No Relation Rule)
यदि दोनों समीकरणों में अचर पद (Constant term $c$) के आगे **ऋण चिन्ह ($-$)** लगा हो:
- समीकरण 1: $ax^2 \\pm bx - c_1 = 0 \\implies$ एक मूल $+$, एक मूल $-$
- समीकरण 2: $dy^2 \\pm ey - c_2 = 0 \\implies$ एक मूल $+$, एक मूल $-$
- **निष्कर्ष:** बिना पेन चलाए सीधे उत्तर लगाएं: **"संबंध स्थापित नहीं किया जा सकता (No relation / CND)"**!`
    },
    {
      id: 'ch3',
      title: 'अंकगणितीय अनुप्रयोग आधारित तुलना',
      content: `### 1. ब्याज आधारित तुलना (SI vs CI)
- **मात्रा I:** ₹10,000 पर 2 वर्ष के लिए 10% वार्षिक दर से साधारण ब्याज (SI)।
  - $SI = \\frac{10000 \\times 10 \\times 2}{100} = ₹2000$
- **मात्रा II:** ₹10,000 पर 2 वर्ष के लिए 10% वार्षिक दर से चक्रवृद्धि ब्याज (CI)।
  - प्रभावी दर $= 10 + 10 + \\frac{10 \\times 10}{100} = 21\\%$
  - $CI = 10000 \\times 21\\% = ₹2100$
- **निष्कर्ष:** $Q_I < Q_{II}$ (चक्रवृद्धि ब्याज सदैव साधारण ब्याज से बड़ा होता है जब समय $> 1$ वर्ष हो)।

### 2. समय एवं कार्य आधारित तुलना
- कार्यक्षमता और समय में व्युत्क्रमानुपाती संबंध होता है। जिसकी कार्यक्षमता अधिक होगी, उसके द्वारा लिया गया समय कम होगा।`
    },
    {
      id: 'ch4',
      title: 'बीजगणित एवं क्षेत्रमिति आधारित तुलना',
      content: `### 1. वर्गमूल बनाम घात समीकरण
- यदि $x^2 = 25 \\implies x = +5, -5$ (दो मान)
- यदि $y = \\sqrt{25} \\implies y = +5$ (केवल एक धनात्मक मुख्य मान)
- **तुलना:**
  - जब $x = +5$ और $y = +5 \\implies x = y$
  - जब $x = -5$ और $y = +5 \\implies x < y$
  - **अंतिम निष्कर्ष:** $x \\le y$ ($Q_I \\le Q_{II}$)।

### 2. क्षेत्रमिति तुलना (परिमाप व क्षेत्रफल)
- वृत्त का क्षेत्रफल बनाम समान परिमाप वाले वर्ग का क्षेत्रफल:
  - यदि परिमाप समान हो, तो वृत्त का क्षेत्रफल सदैव वर्ग के क्षेत्रफल से अधिक होता है ($A_{\\text{वृत्त}} > A_{\\text{वर्ग}}$)!`
    },
    {
      id: 'ch5',
      title: 'समय बचाने की शॉर्टकट तकनीकें एवं मॉडल प्रश्न',
      content: `### 1. सन्निकटता द्वारा तुलना (Approximation)
यदि मात्रा I $= \\frac{498}{25}$ तथा मात्रा II $= \\frac{799}{41}$ हो:
- पूर्ण भाग देने की आवश्यकता नहीं है!
- $Q_I \\approx \\frac{500}{25} = 20$
- $Q_{II} \\approx \\frac{800}{40} = 20$
- सूक्ष्म जाँच: $\\frac{498}{25} = 19.92$ तथा $\\frac{799}{41} = 19.48 \\implies Q_I > Q_{II}$।

### 2. तुलना सारणी (Comparison Matrix)
जब $x$ के दो मान $(x_1, x_2)$ और $y$ के दो मान $(y_1, y_2)$ हों:
- चारों संयोजनों की तुलना करें:
  1. $x_1$ vs $y_1$
  2. $x_1$ vs $y_2$
  3. $x_2$ vs $y_1$
  4. $x_2$ vs $y_2$
- यदि सभी चारों में एक ही चिन्ह ($>$ या $\\ge$) रहे तभी संबंध मान्य होता है; यदि एक भी विपरीत चिन्ह आया तो CND हो जाता है।`
    }
  ],
  comparativeTables: [
    {
      title: 'द्विघात समीकरण चिन्ह एवं मूलों की मास्टर तालिका',
      headers: ['समीकरण के चिन्ह ($b, c$)', 'प्रथम मूल का चिन्ह', 'द्वितीय मूल का चिन्ह', 'त्वरित विश्लेषण'],
      rows: [
        ['$+ , +$ (जैसे $x^2 + 5x + 6 = 0$)', '$- $ (ऋणात्मक)', '$- $ (ऋणात्मक)', 'दोनों मूल सदैव ऋणात्मक होंगे'],
        ['$- , +$ (जैसे $x^2 - 5x + 6 = 0$)', '$+ $ (धनात्मक)', '$+ $ (धनात्मक)', 'दोनों मूल सदैव धनात्मक होंगे'],
        ['$+ , -$ (जैसे $x^2 + 2x - 8 = 0$)', '$- $ (बड़ा मूल)', '$+ $ (छोटा मूल)', 'विपरीत चिन्ह के मूल'],
        ['$- , -$ (जैसे $x^2 - 2x - 8 = 0$)', '$+ $ (बड़ा मूल)', '$- $ (छोटा मूल)', 'विपरीत चिन्ह के मूल']
      ]
    },
    {
      title: 'पांचों मानक विकल्पों की शर्तें एवं निष्कर्ष',
      headers: ['विकल्प संबंध', 'गणितीय शर्त', 'चारों संयोजनों का परिणाम', 'विशिष्ट उदाहरण'],
      rows: [
        ['$Q_I > Q_{II}$', 'मात्रा I, मात्रा II से सदैव बड़ी है', 'सभी चारों तुलनाओं में $>$', '$x = (4, 5), y = (2, 3)$'],
        ['$Q_I < Q_{II}$', 'मात्रा I, मात्रा II से सदैव छोटी है', 'सभी चारों तुलनाओं में $<$', '$x = (1, 2), y = (4, 5)$'],
        ['$Q_I \\ge Q_{II}$', 'मात्रा I बड़ी है या बराबर है', 'तुलनाओं में $>$ तथा कम से कम एक $=$', '$x = (3, 4), y = (2, 3)$'],
        ['$Q_I \\le Q_{II}$', 'मात्रा I छोटी है या बराबर है', 'तुलनाओं में $<$ तथा कम से कम एक $=$', '$x = (2, 3), y = (3, 4)$'],
        ['$Q_I = Q_{II}$ या CND', 'दोनों बराबर हैं या विरोधाभास है', 'एक में $>$ तथा दूसरे में $<$ मिल जाए', '$x = (2, 5), y = (3, 4)$ (CND)']
      ]
    },
    {
      title: 'पारंपरिक समस्या समाधान बनाम मात्रात्मक तुलना दृष्टिकोण',
      headers: ['मापदंड', 'पारंपरिक समस्या समाधान', 'मात्रात्मक तुलना दृष्टिकोण'],
      rows: [
        ['लक्ष्य', 'अंतिम सटीक संख्यात्मक उत्तर निकालना', 'केवल दो मानों के मध्य आपेक्षिक परिमाण ($>, <$) तय करना'],
        ['गणना की गहराई', '100% पूर्ण गणना अनिवार्य', 'चिन्हों, सन्निकटन या अनुपात से 50% गणना में उत्तर'],
        ['ऋणात्मक मानों का प्रभाव', 'उत्तर के रूप में सीधा स्वीकृत', 'तुलना में परिमाण उलट देता है ($-2 > -5$)'],
        ['समय की खपत', 'अधिक (पूर्ण हल आवश्यक)', 'कम (तार्किक शॉर्टकट लागू होते हैं)']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: 'मात्रा I: $x^2 - 7x + 12 = 0$ में $x$ का मान\nमात्रा II: $y^2 - 9y + 20 = 0$ में $y$ का मान\nसही संबंध क्या है? [CG Vyapam SI Mains]',
      options: [
        'Quantity I $\\le$ Quantity II',
        'Quantity I > Quantity II',
        'Quantity I < Quantity II',
        'Quantity I $\\ge$ Quantity II'
      ],
      correctOption: 0,
      examName: 'CG Vyapam SI Mains',
      explanation: 'समीकरण 1: $x^2 - 7x + 12 = 0 \\implies (x - 3)(x - 4) = 0 \\implies x = 3, 4$\nसमीकरण 2: $y^2 - 9y + 20 = 0 \\implies (y - 4)(y - 5) = 0 \\implies y = 4, 5$\nतुलना करने पर:\n- जब $x = 3: 3 < 4$ तथा $3 < 5$ ($x < y$)\n- जब $x = 4: 4 = 4$ तथा $4 < 5$ ($x \\le y$)\nअतः अंतिम संबंध $x \\le y$ अर्थात $\\text{Quantity I} \\le \\text{Quantity II}$ है।'
    },
    {
      id: 'pyq2',
      question: 'मात्रा I: 14 सेमी त्रिज्या वाले वृत्त का क्षेत्रफल\nमात्रा II: 28 सेमी भुजा वाले वर्ग का क्षेत्रफल\nसही संबंध क्या होगा? [CG Vyapam Patwari / RI]',
      options: [
        'Quantity I < Quantity II',
        'Quantity I > Quantity II',
        'Quantity I = Quantity II',
        'संबंध स्थापित नहीं हो सकता'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Patwari',
      explanation: 'मात्रा I (वृत्त का क्षेत्रफल) $= \\pi r^2 = \\frac{22}{7} \\times 14 \\times 14 = 22 \\times 28 = 616 \\text{ सेमी}^2$\nमात्रा II (वर्ग का क्षेत्रफल) $= \\text{भुजा}^2 = 28^2 = 784 \\text{ सेमी}^2$\nचूँकि $616 < 784$, अतः $\\text{Quantity I} < \\text{Quantity II}$।'
    },
    {
      id: 'pyq3',
      question: 'मात्रा I: $x^2 = 36$ में $x$ का मान\nमात्रा II: $y = \\sqrt{36}$ में $y$ का मान\nसही संबंध क्या है? [CGPSC SSE / Vyapam Combined]',
      options: [
        'Quantity I $\\le$ Quantity II',
        'Quantity I = Quantity II',
        'Quantity I $\\ge$ Quantity II',
        'Quantity I > Quantity II'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: '$x^2 = 36 \\implies x = +6, -6$\n$y = \\sqrt{36} \\implies y = +6$ (वर्गमूल का मुख्य मान सदैव धनात्मक होता है)\nतुलना:\n- जब $x = +6 \\implies x = y$\n- जब $x = -6 \\implies x < y$\nअतः $x \\le y$ अर्थात $\\text{Quantity I} \\le \\text{Quantity II}$।'
    },
    {
      id: 'pyq4',
      question: 'मात्रा I: ₹5000 पर 2 वर्ष के लिए 10% साधारण ब्याज\nमात्रा II: ₹5000 पर 2 वर्ष के लिए 10% वार्षिक चक्रवृद्धि ब्याज\nसही संबंध क्या है? [CG Vyapam Hostel Superintendent]',
      options: [
        'Quantity I < Quantity II',
        'Quantity I > Quantity II',
        'Quantity I = Quantity II',
        'Quantity I $\\le$ Quantity II'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'मात्रा I (SI) $= \\frac{5000 \\times 10 \\times 2}{100} = ₹1000$\nमात्रा II (CI) $= 5000 \\times 21\\% = ₹1050$\nअतः $\\text{Quantity I} < \\text{Quantity II}$।'
    },
    {
      id: 'pyq5',
      question: 'मात्रा I: $x^2 + 5x - 6 = 0$ में $x$ का मान\nमात्रा II: $y^2 - 3y - 10 = 0$ में $y$ का मान\nसही संबंध क्या होगा? [CG Vyapam Teacher / AMO]',
      options: [
        'संबंध स्थापित नहीं किया जा सकता (CND)',
        'Quantity I > Quantity II',
        'Quantity I < Quantity II',
        'Quantity I = Quantity II'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Teacher',
      explanation: 'शॉर्टकट नियम: दोनों समीकरणों में अचर पद ऋणात्मक ($-6$ और $-10$) हैं!\nविस्तार से: $x = -6, +1$ तथा $y = +5, -2$\nतुलना: जब $x = +1$ और $y = -2 \\implies x > y$\nकिंतु जब $x = -6$ और $y = +5 \\implies x < y$\nविरोधाभास होने के कारण संबंध स्थापित नहीं किया जा सकता (CND)।'
    },
    {
      id: 'pyq6',
      question: 'मात्रा I: A और B की वर्तमान आयु का योग 40 वर्ष है और अनुपात $3 : 1$ है, तो A की आयु।\nमात्रा II: C और D की आयु का अनुपात $2 : 3$ है तथा D की आयु 45 वर्ष है, तो C की आयु। [CG Vyapam Assistant Grade 3]',
      options: [
        'Quantity I = Quantity II',
        'Quantity I > Quantity II',
        'Quantity I < Quantity II',
        'Quantity I $\\ge$ Quantity II'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Assistant Grade 3',
      explanation: 'मात्रा I: $A + B = 40$, अनुपात $3 : 1$ $\\implies A = 40 \\times \\frac{3}{4} = 30$ वर्ष\nमात्रा II: $\\frac{C}{D} = \\frac{2}{3} \\implies \\frac{C}{45} = \\frac{2}{3} \\implies C = \\frac{2 \\times 45}{3} = 30$ वर्ष\nचूँकि दोनों का मान 30 वर्ष है, अतः $\\text{Quantity I} = \\text{Quantity II}$।'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'यदि दो द्विघात समीकरणों के अचर पद दोनों ऋणात्मक हों, तो उनके मूलों के बीच क्या संबंध होता है?',
      options: [
        'संबंध स्थापित नहीं किया जा सकता (CND)',
        '$x > y$',
        '$x < y$',
        '$x = y$'
      ],
      correctOption: 0,
      explanation: 'जब दोनों में अचर पद ऋणात्मक होते हैं, तो दोनों के मूल एक धनात्मक और एक ऋणात्मक आते हैं, जिससे परस्पर तुलना में हमेशा विरोधाभास उत्पन्न होता है। अतः CND सही उत्तर होता है।'
    },
    {
      id: 'mcq2',
      question: 'मात्रा I: $-15$ तथा मात्रा II: $-22$। सही संबंध क्या होगा?',
      options: [
        'Quantity I > Quantity II',
        'Quantity I < Quantity II',
        'Quantity I = Quantity II',
        'Quantity I $\\le$ Quantity II'
      ],
      correctOption: 0,
      explanation: 'संख्या रेखा पर $-15$ दाईं ओर स्थित है, अतः $-15 > -22$ होगा। अर्थात $\\text{Quantity I} > \\text{Quantity II}$।'
    },
    {
      id: 'mcq3',
      question: 'मात्रा I: $x^3 = 64$ में $x$ का मान\nमात्रा II: $y^2 = 16$ में $y$ का मान\nसही संबंध क्या है?',
      options: [
        'Quantity I $\\ge$ Quantity II',
        'Quantity I $\\le$ Quantity II',
        'Quantity I > Quantity II',
        'Quantity I = Quantity II'
      ],
      correctOption: 0,
      explanation: '$x^3 = 64 \\implies x = +4$ (विषम घात में केवल एक वास्तविक मूल होता है)\n$y^2 = 16 \\implies y = +4, -4$\nतुलना: जब $y = +4 \\implies x = y$; जब $y = -4 \\implies x > y$ ($4 > -4$)\nअतः $x \\ge y$ अर्थात $\\text{Quantity I} \\ge \\text{Quantity II}$।'
    },
    {
      id: 'mcq4',
      question: 'समान परिमाप वाले वृत्त और वर्ग के क्षेत्रफलों में क्या संबंध होता है?',
      options: [
        'वृत्त का क्षेत्रफल > वर्ग का क्षेत्रफल',
        'वर्ग का क्षेत्रफल > वृत्त का क्षेत्रफल',
        'दोनों बराबर होते हैं',
        'त्रिज्या पर निर्भर करता है'
      ],
      correctOption: 0,
      explanation: 'समान परिमाप वाली सभी द्विविमीय आकृतियों में वृत्त का क्षेत्रफल अधिकतम होता है। अतः $A_{\\text{वृत्त}} > A_{\\text{वर्ग}}$।'
    },
    {
      id: 'mcq5',
      question: 'मात्रा I: 60 किमी/घंटा की चाल\nमात्रा II: 16.67 मीटर/सेकंड की चाल\nसही संबंध क्या है?',
      options: [
        'Quantity I = Quantity II',
        'Quantity I > Quantity II',
        'Quantity I < Quantity II',
        'संबंध नहीं निकाला जा सकता'
      ],
      correctOption: 0,
      explanation: '60 किमी/घंटा $= 60 \\times \\frac{5}{18} = \\frac{50}{3} = 16.667$ मीटर/सेकंड। दोनों मान समान हैं, अतः $\\text{Quantity I} = \\text{Quantity II}$।'
    },
    {
      id: 'mcq6',
      question: 'मात्रात्मक तुलना में यदि एक मान $x = 5$ तथा $y$ का मान $y = (3, 7)$ आए, तो उत्तर क्या होगा?',
      options: [
        'संबंध स्थापित नहीं किया जा सकता (CND)',
        'Quantity I > Quantity II',
        'Quantity I < Quantity II',
        'Quantity I $\\ge$ Quantity II'
      ],
      correctOption: 0,
      explanation: '$5 > 3$ (बड़ा है) किंतु $5 < 7$ (छोटा है)। एक साथ बड़ा और छोटा होने के कारण संबंध स्थापित नहीं किया जा सकता।'
    },
    {
      id: 'mcq7',
      question: 'मात्रा I: 10% और 20% की क्रमिक छूट\nमात्रा II: 28% की एकल छूट\nसही संबंध क्या है?',
      options: [
        'Quantity I = Quantity II',
        'Quantity I > Quantity II',
        'Quantity I < Quantity II',
        'Quantity I $\\ge$ Quantity II'
      ],
      correctOption: 0,
      explanation: 'क्रमिक छूट की एकल समतुल्य छूट $= 10 + 20 - \\frac{10 \\times 20}{100} = 30 - 2 = 28\\%$\nमात्रा II भी $28\\%$ है, अतः दोनों बराबर हैं।'
    },
    {
      id: 'mcq8',
      question: 'यदि $x < 0$ हो, तो $x$ और $x^2$ में क्या संबंध होगा?',
      options: [
        '$x < x^2$',
        '$x > x^2$',
        '$x = x^2$',
        'मान पर निर्भर करेगा'
      ],
      correctOption: 0,
      explanation: 'ऋणात्मक संख्या का वर्ग सदैव धनात्मक होता है ($x^2 > 0$)। चूँकि $x$ ऋणात्मक है और $x^2$ धनात्मक है, अतः सदैव $x < x^2$ होगा।'
    }
  ],
  keyTerminology: [
    {
      term: 'Quantitative Comparison',
      termHi: 'मात्रात्मक तुलना',
      definition: 'A standardized problem-solving format comparing the relative magnitude of two defined mathematical quantities.',
      definitionHi: 'दो स्वतंत्र गणितीय मात्राओं के संख्यात्मक परिमाण की तुलना करके उनके मध्य संबंध निर्धारित करने का प्रारूप।'
    },
    {
      term: 'Quantity I / Quantity II',
      termHi: 'मात्रा I / मात्रा II',
      definition: 'The two distinct mathematical expressions or word problems provided for parallel relative evaluation.',
      definitionHi: 'समानांतर मूल्यांकन हेतु दी गई दो स्वतंत्र गणितीय समस्याएं या व्यंजक।'
    },
    {
      term: 'Relationship Cannot be Determined (CND)',
      termHi: 'संबंध निर्धारित नहीं किया जा सकता',
      definition: 'The verdict reached when quantities exhibit conflicting relations ($>$ in one root and $<$ in another) or lack sufficient constraints.',
      definitionHi: 'वह स्थिति जब चरों के बीच परस्पर विरोधी संबंध (एक मान में बड़ा, दूसरे में छोटा) प्राप्त हों।'
    },
    {
      term: 'Sign Rule Method',
      termHi: 'चिन्ह नियम विधि',
      definition: 'The rapid inspection of linear and constant sign signs in quadratic equations to predict root signs without factorizing.',
      definitionHi: 'द्विघात समीकरण के गुणनखंड किए बिना केवल उसके चिन्हों को देखकर मूलों के चिन्ह पहचानने की शॉर्टकट विधि।'
    },
    {
      term: 'Principal Square Root',
      termHi: 'मुख्य वर्गमूल',
      definition: 'The non-negative square root $\\sqrt{x}$ which always produces a single positive value, unlike $x^2 = c$ which yields $\\pm\\sqrt{c}$.',
      definitionHi: 'करणी चिन्ह $\\sqrt{x}$ का वह अऋणात्मक मान जो सदैव धनात्मक परिणाम देता है।'
    },
    {
      term: 'Relative Magnitude',
      termHi: 'आपेक्षिक परिमाण',
      definition: 'Assessing which quantity is greater without necessarily calculating precise decimals to the final digit.',
      definitionHi: 'सटीक दशमलव गणना किए बिना केवल यह तय करना कि कौन सी मात्रा बड़ी या छोटी है।'
    },
    {
      term: 'Comparison Matrix',
      termHi: 'तुलना मैट्रिक्स',
      definition: 'Evaluating all 4 possible pairings when two quadratic roots are cross-checked against two other roots.',
      definitionHi: 'दो-दो मूलों के सभी 4 संभावित जोड़ों की परस्पर तुलना करने की व्यवस्थित सारणी।'
    },
    {
      term: 'Negative Inversion Rule',
      termHi: 'ऋणात्मक व्युत्क्रम नियम',
      definition: 'The ordering property of real numbers where larger absolute negative values represent smaller algebraic magnitudes ($-a < -b$ if $a > b$).',
      definitionHi: 'वास्तविक संख्याओं का वह नियम जिसके अनुसार संख्यात्मक रूप से बड़ी दिखने वाली ऋणात्मक संख्या वास्तव में छोटी होती है।'
    }
  ],
  sources: [
    {
      title: 'Quantitative Aptitude for Competitive Examinations - Chapter: Quadratic Equations & Inequalities',
      author: 'R.S. Aggarwal',
      description: 'द्विघात समीकरणों की तुलना एवं मात्रात्मक असमानताओं का प्रामाणिक संदर्भ ग्रंथ।'
    },
    {
      title: 'How to Prepare for Quantitative Aptitude for CAT',
      author: 'Arun Sharma',
      description: 'मात्रात्मक तुलना, उच्च स्तरीय बीजगणितीय असमिकाओं और शॉर्टकट्स का मानक स्रोत।'
    },
    {
      title: 'CG Vyapam Solved Papers (2015-2024)',
      author: 'CGPEB',
      description: 'छत्तीसगढ़ व्यापम की विभिन्न भर्ती परीक्षाओं के वास्तविक मात्रात्मक तुलना प्रश्न।'
    },
    {
      title: 'Magical Book on Quicker Maths',
      author: 'M. Tyra',
      description: 'द्विघात समीकरणों को 5 सेकंड में हल करने के चिन्ह नियमों का संग्रह।'
    }
  ],
  confusionBuster: [
    {
      misconception: '$x^2 = 16$ और $x = \\sqrt{16}$ एक ही बात हैं।',
      clarification: '$x^2 = 16$ में $x$ के दो मान होते हैं ($+4$ और $-4$), जबकि $x = \\sqrt{16}$ में $x$ का केवल एक मान ($+4$) होता है।'
    },
    {
      misconception: 'ऋणात्मक संख्याओं में जो संख्या बड़ी दिखती है वही बड़ी होती है।',
      clarification: 'ऋणात्मक में उल्टा होता है! $-10$ और $-20$ में $-10 > -20$ होता है।'
    },
    {
      misconception: 'यदि $x = (2, 4)$ और $y = (3, 5)$ हो, तो $x < y$ होगा।',
      clarification: 'चारों जोड़ों की तुलना करें: जब $x = 4$ और $y = 3 \\implies x > y$! किंतु जब $x = 2$ और $y = 5 \\implies x < y$। अतः यह CND (संबंध निर्धारित नहीं हो सकता) होगा!'
    },
    {
      misconception: 'मात्रात्मक तुलना के प्रश्नों में पूरा रफ कार्य करके दशमलव निकालना चाहिए।',
      clarification: 'अधिकांश प्रश्नों में केवल सन्निकटन या चिन्ह नियम से 5 सेकंड में उत्तर आ जाता है; पूर्ण गणना समय नष्ट करती है।'
    },
    {
      misconception: 'जब दोनों द्विघात समीकरणों में अचर पद ऋणात्मक हों, तब भी गुणनखंड करने चाहिए।',
      clarification: 'कभी नहीं! दोनों में अचर पद ऋणात्मक होने पर सदैव उत्तर "संबंध स्थापित नहीं हो सकता (CND)" होता है।'
    }
  ],
  faqList: [
    {
      question: 'मात्रात्मक तुलना (Quantity Comparison) क्या होती है?',
      answer: 'इसमें दो मात्राएं (Quantity I और Quantity II) दी जाती हैं और दोनों के मानों की तुलना करके यह बताना होता है कि कौन सी बड़ी, छोटी या बराबर है, या संबंध निर्धारित नहीं हो सकता।'
    },
    {
      question: 'द्विघात समीकरणों में "संबंध निर्धारित नहीं हो सकता" कब आता है?',
      answer: 'जब मूलों के चारों संयोजनों की तुलना में एक बार $>$ और दूसरी बार $<$ मिल जाए (विरोधाभास हो), या दोनों समीकरणों के अचर पद ऋणात्मक हों।'
    },
    {
      question: 'क्या मात्रात्मक तुलना में सटीक मान निकालना जरूरी है?',
      answer: 'नहीं! केवल यह तय करना पर्याप्त होता है कि कौन सी मात्रा बड़ी है। सन्निकटन (Approximation) और चिन्ह नियमों से काम हो जाता है।'
    },
    {
      question: 'विषम घात और सम घात में क्या अंतर होता है?',
      answer: 'सम घात ($x^2, x^4$) में दो मूल ($+$ और $-$) होते हैं, जबकि विषम घात ($x^3, x^5$) में केवल एक ही वास्तविक मूल प्राप्त होता है।'
    },
    {
      question: 'CG Vyapam में मात्रात्मक तुलना का क्या भारांक है?',
      answer: 'व्यापम की उच्च स्तरीय परीक्षाओं में इससे 3 से 5 प्रश्न पूछे जाते हैं, जो कई अध्यायों के ज्ञान की एक साथ परीक्षा लेते हैं।'
    }
  ],
  oneLinerRevision: [
    'मात्रात्मक तुलना में 5 मानक विकल्प ($>, <, \\ge, \\le, =$ या CND) होते हैं।',
    'यदि दोनों समीकरणों में अचर पद ऋणात्मक हों $\\implies$ उत्तर सदैव CND होगा।',
    '$x^2 = c$ के दो मूल ($+ , -$) होते हैं, जबकि $\\sqrt{c}$ केवल धनात्मक ($+$) होता है।',
    'ऋणात्मक संख्याओं में परिमाण उल्टा होता है ($-2 > -5$)।',
    'विरोधाभासी परिणाम ($>$ और $<$ दोनों) आने पर CND होता है।',
    'समान परिमाप पर वृत्त का क्षेत्रफल वर्ग से बड़ा होता है ($A_{\\text{वृत्त}} > A_{\\text{वर्ग}}$)।',
    'समयावधि $> 1$ वर्ष होने पर समान दर पर $CI > SI$ होता है।',
    'पूर्ण गणना करने के बजाय सन्निकटन (Approximation) से समय बचाएं।',
    'समीकरण के चिन्ह $- , +$ होने पर दोनों मूल सदैव धनात्मक ($+ , +$) होते हैं।',
    'समीकरण के चिन्ह $+ , +$ होने पर दोनों मूल सदैव ऋणात्मक ($- , -$) होते हैं।'
  ],
  rapidRevision: {
    points: [
      'चिन्ह ट्रिक: $- , + \\implies (+, +)$; $+ , + \\implies (-, -)$।',
      'सुपरफास्ट CND नियम: दोनों अचर पद ऋणात्मक होने पर सीधे CND।',
      'घात नियम: $x^2 = 25 \\implies \\pm 5$; $y = \\sqrt{25} \\implies +5$ ($x \\le y$)।',
      'ब्याज नियम: $CI > SI$ (समान मूलधन, दर और समय $> 1$ वर्ष पर)।',
      'क्षेत्रमिति नियम: समान परिमाप पर वृत्त का क्षेत्रफल अधिकतम।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_21 (Quantitative Comparison)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_21').set(sanitized);
  console.log('✅ cgv_master_adv_math_21 saved to Firestore topic_study_notes!');

  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === 'cgv_master_sub_3') {
        for (const ch of sub.chapters || []) {
          if (ch.id === 'cgv_master_sub_3_ch_18') {
            for (const t of ch.topics || []) {
              if (t.id === 'adv_math_21') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_21 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 Chapter 18 is now 100% complete!');
}

upload().catch(console.error);
