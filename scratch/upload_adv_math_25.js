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
  topicId: 'adv_math_25',
  topicName: 'Race Problems',
  topicNameHi: 'दौड़ आधारित प्रश्न',
  chapterId: 'cgv_master_sub_3_ch_19',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'दौड़ एवं खेल संबंधी प्रश्न (Races and Games of Skill) समय, चाल एवं दूरी (Time, Speed and Distance) का एक अत्यंत व्यावहारिक, विश्लेषणात्मक और रणनीतिक अनुप्रयोग है। इसमें दो या दो से अधिक धावकों (Runners) के मध्य एक निश्चित दूरी की दौड़ में आरंभिक बढ़त (Head Start - दूरी या समय के रूप में), जीतने के अंतर (Winning Margin), तथा चालों के अनुपात की तुलना की जाती है।',
    importance: 'CG Vyapam SI Mains, RI, पटवारी, सब-इंजीनियर तथा CGPSC CSAT में रैखिक दौड़ (Linear Race), वृत्तीय दौड़ (Circular Track), तथा खेल अंकों (Game of Points) पर आधारित 1 से 2 प्रश्न पूछे जाते हैं। यह विषय आपेक्षिक गति और अनुपातिक समझ की वास्तविक परीक्षा लेता है।',
    examRelevance: 'परीक्षाओं में "A, B को $x$ मीटर अथवा $t$ सेकंड से हराता है" (जिससे सीधे $B$ की चाल $= \\frac{x}{t}$ निकलती है), आरंभिक बढ़त (Head Start), तथा वृत्तीय ट्रैक पर पहली बार मिलने और प्रारंभिक बिंदु पर पुनर्मिलन के प्रश्न सर्वाधिक पूछे जाते हैं।',
    quickFacts: [
      'दूरी की बढ़त (Start of $x$ meters): जब धावक $A$ कुल दूरी $D$ दौड़ता है, तब $B$ केवल $(D - x)$ मीटर दौड़ता है।',
      'समय की बढ़त (Start of $t$ seconds): $B$ दौड़ शुरू होने के $t$ सेकंड पहले दौड़ना शुरू करता है, या $A$ को $B$ से $t$ सेकंड कम समय लगता है।',
      'गोल्डन सूत्र: यदि $A, B$ को $x$ मीटर अथवा $t$ सेकंड से हराता है, तो $B$ (हारने वाले) की चाल $= \\frac{x}{t}$ होती है।',
      'समान समय में तय दूरी का अनुपात ही चालों का अनुपात होता है: $\\frac{S_A}{S_B} = \\frac{D_A}{D_B} = \\frac{D}{D - x}$।',
      'डेड हीट (Dead Heat): ऐसी दौड़ जिसमें सभी प्रतियोगी एक साथ ठीक एक ही समय पर अंतिम रेखा (Finishing line) पार करते हैं।',
      'वृत्तीय दौड़ में प्रारंभिक बिंदु पर पहली बार मिलने का समय $= \\text{LCM}(t_1, t_2)$ होता है।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'दौड़ की मूलभूत शब्दावली एवं संकल्पनाएं',
      content: `### 1. प्रमुख शब्दावली (Key Terminology)
1. **दौड़ का कोर्स (Race Course):** वह निश्चित मार्ग या मैदान जिस पर दौड़ प्रतियोगिता आयोजित होती है।
2. **प्रारंभिक बिंदु (Starting Point):** वह स्थान जहाँ से धावक दौड़ना शुरू करते हैं।
3. **अंतिम रेखा / लक्ष्य (Winning Post / Goal):** वह रेखा जिसे छूने पर दौड़ समाप्त मानी जाती है।
4. **डेड हीट (Dead Heat):** जब दो या अधिक धावक एक साथ ठीक एक ही पल में अंतिम रेखा पार करते हैं (अर्थात दौड़ टाई हो जाती है)।

### 2. बढ़त (Head Start) के दो रूप
- **दूरी की बढ़त (Start in Distance):**
  - "A, B को 100 मीटर की दौड़ में 20 मीटर की बढ़त देता है।"
  - इसका अर्थ: A प्रारंभिक बिंदु से दौड़ता है (100 मीटर दौड़ेगा) जबकि B प्रारंभिक बिंदु से 20 मीटर आगे खड़ा होता है (केवल $100 - 20 = 80$ मीटर दौड़ेगा)।
- **समय की बढ़त (Start in Time):**
  - "A, B को 5 सेकंड की बढ़त देता है।"
  - इसका अर्थ: B, A के दौड़ना शुरू करने से 5 सेकंड पहले ही दौड़ना प्रारंभ कर देता है।`
    },
    {
      id: 'ch2',
      title: 'जीतने का अंतर एवं चालों का अनुपात',
      content: `### 1. "A, B को $x$ मीटर से हराता है"
इसका अर्थ है कि जब A अंतिम रेखा (दूरी $D$) पर पहुँचता है, उस समय B अंतिम रेखा से $x$ मीटर पीछे होता है (अर्थात B ने केवल $D - x$ दूरी तय की है)।
- चूँकि समय दोनों के लिए समान है:
$$\\frac{\\text{चाल}_A}{\\text{चाल}_B} = \\frac{\\text{दूरी}_A}{\\text{दूरी}_B} = \\frac{D}{D - x}$$

### 2. "A, B को $t$ सेकंड से हराता है"
इसका अर्थ है कि A, B से $t$ सेकंड पहले दौड़ पूरी कर लेता है:
$$T_B - T_A = t \\text{ सेकंड}$$`
    },
    {
      id: 'ch3',
      title: 'सुपर-शॉर्टकट: $x$ मीटर अथवा $t$ सेकंड से हराना',
      content: `### 1. रामबाण नियम (The Golden Formula)
यदि प्रश्न में लिखा हो कि: **"A, B को $x$ मीटर अथवा $t$ सेकंड से हराता है"**
- इसका सीधा अर्थ है कि जब A लक्ष्य पर पहुँचा, तब B लक्ष्य से $x$ मीटर दूर था और B को उस $x$ मीटर की दूरी तय करने में $t$ सेकंड का समय लगा!
- अत: **हारने वाले (B) की चाल:**
  $$S_B = \\frac{x}{t} \\text{ (दूरी का अंतर / समय का अंतर)}$$
- **B द्वारा दौड़ पूरी करने में लगा कुल समय:**
  $$T_B = \\frac{\\text{कुल दौड़ की दूरी } D}{S_B} = \\frac{D \\times t}{x}$$
- **A (विजेता) द्वारा लिया गया समय:**
  $$T_A = T_B - t = \\frac{D \\times t}{x} - t$$

**उदाहरण:** 100 मीटर की दौड़ में A, B को 20 मीटर अथवा 4 सेकंड से हराता है:
- B की चाल $= \\frac{20}{4} = 5$ मी/सेकंड
- B का कुल समय $= \\frac{100}{5} = 20$ सेकंड
- A का कुल समय $= 20 - 4 = 16$ सेकंड (मात्र 5 सेकंड में हल!)`
    },
    {
      id: 'ch4',
      title: 'वृत्तीय ट्रैक पर दौड़ (Circular Track Races)',
      content: `### 1. वृत्तीय दौड़ की मूलभूत स्थितियां
माना $L$ मीटर लंबाई के वृत्तीय ट्रैक पर दो धावक जिनकी चालें $S_1$ और $S_2$ ($S_1 > S_2$) हैं, एक ही बिंदु से दौड़ना शुरू करते हैं:
- धावक 1 द्वारा 1 चक्कर का समय: $t_1 = \\frac{L}{S_1}$
- धावक 2 द्वारा 1 चक्कर का समय: $t_2 = \\frac{L}{S_2}$

### 2. पहली बार ट्रैक पर कहीं भी मिलना (First Meeting Anywhere)
- **स्थिति A (विपरीत दिशा में दौड़ने पर):**
  $$T = \\frac{L}{S_1 + S_2}$$
- **स्थिति B (समान दिशा में दौड़ने पर):**
  $$T = \\frac{L}{S_1 - S_2}$$

### 3. प्रारंभिक बिंदु पर पहली बार मिलना (First Meeting at Starting Point)
दौड़ की दिशा चाहे समान हो या विपरीत, प्रारंभिक बिंदु पर पहली बार मिलने का समय सदैव दोनों के व्यक्तिगत चक्कर समयों का ल.स.प. (LCM) होता है:
$$T_{\\text{start}} = \\text{LCM}(t_1, t_2) = \\text{LCM}\\left(\\frac{L}{S_1}, \\frac{L}{S_2}\\right)$$

### 4. ट्रैक पर कुल अलग-अलग मिलन बिंदुओं की संख्या (Distinct Meeting Points)
यदि चालों का सरलतम अनुपात $\\frac{S_1}{S_2} = \\frac{a}{b}$ हो (जहाँ $a$ और $b$ सह-अभाज्य हैं):
- **समान दिशा में:** $a - b$ अलग-अलग बिंदुओं पर मिलेंगे।
- **विपरीत दिशा में:** $a + b$ अलग-अलग बिंदुओं पर मिलेंगे।`
    },
    {
      id: 'ch5',
      title: '100 अंकों का खेल (Games of Skill) एवं संयुक्त दौड़',
      content: `### 1. अंकों का खेल मॉडल (Games of Points)
- "100 अंकों के खेल में A, B को 20 अंक दे सकता है" $\\implies$ जब A 100 अंक बनाता है, तब B केवल $100 - 20 = 80$ अंक बनाता है ($A : B = 100 : 80 = 5 : 4$)।
- "B, C को 100 अंकों के खेल में 10 अंक दे सकता है" $\\implies B : C = 100 : 90 = 10 : 9$।

### 2. संयुक्त अनुपात द्वारा A और C की तुलना
$$A : B = 5 : 4 = 25 : 20$$
$$B : C = 10 : 9 = 20 : 18$$
अतः $A : C = 25 : 18 = 100 : 72$
- **निष्कर्ष:** 100 अंकों के खेल में A, C को $100 - 72 = 28$ अंक दे सकता है!`
    }
  ],
  comparativeTables: [
    {
      title: 'दूरी की बढ़त बनाम समय की बढ़त',
      headers: ['मापदंड', 'दूरी की बढ़त (Distance Start)', 'समय की बढ़त (Time Start)'],
      rows: [
        ['शुरुआती स्थिति', 'B प्रारंभिक रेखा से $x$ मीटर आगे खड़ा होता है', 'B और A दोनों प्रारंभिक रेखा पर ही खड़े होते हैं'],
        ['शुरुआती समय', 'दोनों एक साथ ठीक एक ही समय दौड़ना शुरू करते हैं', 'B पहले दौड़ता है, A उसके $t$ सेकंड बाद दौड़ता है'],
        ['तय दूरी की तुलना', 'A पूरी दूरी $D$ दौड़ता है, B केवल $(D - x)$ दौड़ता है', 'दोनों पूरी दूरी $D$ दौड़ते हैं'],
        ['लिए गए समय की तुलना', 'दिए गए समय तक दोनों समान समय दौड़ते हैं', 'A को B की तुलना में $t$ सेकंड कम समय मिलता है'],
        ['चाल अनुपात सूत्र', '$\\frac{S_A}{S_B} = \\frac{D}{D - x}$', '$\\frac{S_A}{S_B} = \\frac{T_B}{T_B - t}$']
      ]
    },
    {
      title: 'रैखिक दौड़ बनाम वृत्तीय ट्रैक दौड़',
      headers: ['विशेषता', 'रैखिक दौड़ (Linear Race)', 'वृत्तीय दौड़ (Circular Track Race)'],
      rows: [
        ['मार्ग का प्रकार', 'सीधी रेखा (आरंभ और अंत बिंदु अलग-अलग)', 'बंद वक्र / वृत्त (आरंभ और अंत बिंदु एक ही)'],
        ['दौड़ का अंत', 'निश्चित दूरी पूरी करने पर समाप्त', 'निर्धारित चक्कर या समय तक निरंतर जारी'],
        ['पुनर्मिलन की संभावना', 'केवल तेज धावक द्वारा धीमे को पार करने पर', 'बार-बार विभिन्न बिंदुओं पर मिलन संभव'],
        ['आपेक्षिक गति का नियम', 'विजेता और उप-विजेता के अंतर में प्रयुक्त', 'ट्रैक पर प्रथम मिलन समय $\\frac{L}{S_1 \\pm S_2}$ निकालने में प्रयुक्त']
      ]
    },
    {
      title: 'वृत्तीय दौड़: समान दिशा बनाम विपरीत दिशा में मिलन',
      headers: ['मापदंड', 'समान दिशा में दौड़ना (Same Direction)', 'विपरीत दिशा में दौड़ना (Opposite Direction)'],
      rows: [
        ['आपेक्षिक चाल', '$S_1 - S_2$ (चालों का अंतर)', '$S_1 + S_2$ (चालों का योग)'],
        ['ट्रैक पर पहली बार मिलना', '$\\frac{L}{S_1 - S_2}$', '$\\frac{L}{S_1 + S_2}$'],
        ['आरंभिक बिंदु पर पहली बार मिलना', '$\\text{LCM}(t_1, t_2)$ (समान रहता है)', '$\\text{LCM}(t_1, t_2)$ (समान रहता है)'],
        ['अलग-अलग मिलन बिंदुओं की संख्या', '$a - b$ बिंदु (जहाँ $S_1:S_2 = a:b$)', '$a + b$ बिंदु']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: '100 मीटर की दौड़ में A, B को 20 मीटर से तथा C को 28 मीटर से हराता है। 100 मीटर की दौड़ में B, C को कितने मीटर से हराएगा? [CG Vyapam SI Mains]',
      options: [
        '10 मीटर',
        '8 मीटर',
        '12 मीटर',
        '15 मीटर'
      ],
      correctOption: 0,
      examName: 'CG Vyapam SI Mains',
      explanation: 'जब A 100 मीटर दौड़ता है:\n- B दौड़ता है $= 100 - 20 = 80$ मीटर\n- C दौड़ता है $= 100 - 28 = 72$ मीटर\nअर्थात 80 मीटर की दौड़ में B, C को $(80 - 72) = 8$ मीटर से हराता है।\nअतः 100 मीटर की दौड़ में B, C को हराएगा:\n$$= \\frac{8}{80} \\times 100 = \\frac{1}{10} \\times 100 = 10 \\text{ मीटर}$$'
    },
    {
      id: 'pyq2',
      question: '1 किमी की दौड़ में A, B को 100 मीटर अथवा 20 सेकंड से हराता है। A द्वारा दौड़ पूरी करने में कितना समय लगा? [CG Vyapam Patwari / RI]',
      options: [
        '180 सेकंड (3 मिनट)',
        '200 सेकंड',
        '160 सेकंड',
        '220 सेकंड'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Patwari',
      explanation: 'हारने वाले B की चाल $= \\frac{\\text{दूरी अंतर}}{\\text{समय अंतर}} = \\frac{100}{20} = 5$ मी/सेकंड\nB द्वारा 1 किमी (1000 मी) दौड़ने में लगा समय $= \\frac{1000}{5} = 200$ सेकंड\nA (विजेता) द्वारा लिया गया समय $= 200 - 20 = 180 \\text{ सेकंड} = 3 \\text{ मिनट}$'
    },
    {
      id: 'pyq3',
      question: 'एक 200 मीटर की दौड़ में A, B को 35 मीटर अथवा 7 सेकंड से हराता है। A का दौड़ पूरा करने का समय क्या है? [CGPSC SSE / Vyapam Combined]',
      options: [
        '33 सेकंड',
        '40 सेकंड',
        '35 सेकंड',
        '30 सेकंड'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'B की चाल $= \\frac{35}{7} = 5$ मी/सेकंड\nB का कुल समय $= \\frac{200}{5} = 40$ सेकंड\nA का कुल समय $= 40 - 7 = 33 \\text{ सेकंड}$'
    },
    {
      id: 'pyq4',
      question: '800 मीटर की दौड़ में A, B को 40 मीटर से हराता है और 500 मीटर की दौड़ में B, C को 25 मीटर से हराता है। 200 मीटर की दौड़ में A, C को कितने मीटर से हराएगा? [CG Vyapam Hostel Superintendent]',
      options: [
        '19.5 मीटर',
        '20 मीटर',
        '19 मीटर',
        '18.5 मीटर'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'दौड़ 1: जब A $= 800$, B $= 760 \\implies \\frac{A}{B} = \\frac{800}{760} = \\frac{20}{19}$\nदौड़ 2: जब B $= 500$, C $= 475 \\implies \\frac{B}{C} = \\frac{500}{475} = \\frac{20}{19}$\nसंयुक्त अनुपात:\n$$\\frac{A}{C} = \\frac{A}{B} \\times \\frac{B}{C} = \\frac{20}{19} \\times \\frac{20}{19} = \\frac{400}{361}$$\nअतः 400 मीटर की दौड़ में A, C को $400 - 361 = 39$ मीटर से हराता है।\nतो 200 मीटर की दौड़ में हराएगा $= \\frac{39}{2} = 19.5 \\text{ मीटर}$'
    },
    {
      id: 'pyq5',
      question: '100 अंकों के खेल में A, B को 20 अंक दे सकता है और B, C को 25 अंक दे सकता है। उसी खेल में A, C को कितने अंक दे सकता है? [CG Vyapam Teacher / AMO]',
      options: [
        '40 अंक',
        '45 अंक',
        '35 अंक',
        '50 अंक'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Teacher',
      explanation: 'जब A $= 100$, B $= 80 \\implies \\frac{A}{B} = \\frac{100}{80} = \\frac{5}{4}$\nजब B $= 100$, C $= 75 \\implies \\frac{B}{C} = \\frac{100}{75} = \\frac{4}{3}$\n$$\\frac{A}{C} = \\frac{A}{B} \\times \\frac{B}{C} = \\frac{5}{4} \\times \\frac{4}{3} = \\frac{5}{3} = \\frac{100}{60}$$\nअतः जब A 100 अंक बनाएगा, C केवल 60 अंक बनाएगा।\nA, C को $100 - 60 = 40$ अंक दे सकता है।'
    },
    {
      id: 'pyq6',
      question: '600 मीटर लंबे एक वृत्ताकार पथ पर A और B क्रमशः 15 मी/सेकंड और 10 मी/सेकंड की चाल से एक ही दिशा में दौड़ते हैं। वे कितने समय बाद पहली बार मिलेंगे? [CG Vyapam Assistant Grade 3]',
      options: [
        '120 सेकंड',
        '60 सेकंड',
        '24 सेकंड',
        '40 सेकंड'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Assistant Grade 3',
      explanation: 'समान दिशा में आपेक्षिक चाल $= 15 - 10 = 5$ मी/सेकंड\nपहली बार मिलने का समय:\n$$T = \\frac{\\text{ट्रैक की लंबाई}}{\\text{आपेक्षिक चाल}} = \\frac{600}{5} = 120 \\text{ सेकंड} = 2 \\text{ मिनट}$$\nअतः वे 120 सेकंड बाद पहली बार मिलेंगे।'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: '100 मीटर की दौड़ में A की चाल 8 किमी/घंटा है। यदि A, B को 4 मीटर की शुरुआत देता है और फिर भी उसे 15 सेकंड से हरा देता है, तो B की चाल क्या होगी?',
      options: [
        '5.76 किमी/घंटा',
        '6 किमी/घंटा',
        '5.4 किमी/घंटा',
        '6.2 किमी/घंटा'
      ],
      correctOption: 0,
      explanation: 'A की चाल $= 8 \\times \\frac{5}{18} = \\frac{20}{9}$ मी/से।\nA का समय $= \\frac{100}{20/9} = 45$ सेकंड।\nB को लगा समय $= 45 + 15 = 60$ सेकंड।\nB द्वारा तय दूरी $= 100 - 4 = 96$ मीटर।\nB की चाल $= \\frac{96}{60} \\times \\frac{18}{5} = 1.6 \\times 3.6 = 5.76$ किमी/घंटा।'
    },
    {
      id: 'mcq2',
      question: 'एक वृत्ताकार ट्रैक (लंबाई 400 मीटर) पर A और B विपरीत दिशाओं में क्रमशः 6 मी/से और 4 मी/से से दौड़ते हैं। वे पहली बार कितने समय बाद मिलेंगे?',
      options: [
        '40 सेकंड',
        '200 सेकंड',
        '50 सेकंड',
        '80 सेकंड'
      ],
      correctOption: 0,
      explanation: 'विपरीत दिशा में आपेक्षिक चाल $= 6 + 4 = 10$ मी/सेकंड।\nसमय $= \\frac{400}{10} = 40$ सेकंड।'
    },
    {
      id: 'mcq3',
      question: '100 मीटर की दौड़ में कमल, बिमल को 5 सेकंड से हरा देता है। यदि कमल की चाल 18 किमी/घंटा हो, तो बिमल की चाल क्या होगी?',
      options: [
        '14.4 किमी/घंटा',
        '15 किमी/घंटा',
        '16 किमी/घंटा',
        '12 किमी/घंटा'
      ],
      correctOption: 0,
      explanation: 'कमल की चाल $= 18 \\times \\frac{5}{18} = 5$ मी/सेकंड।\nकमल का समय $= \\frac{100}{5} = 20$ सेकंड।\nबिमल का समय $= 20 + 5 = 25$ सेकंड।\nबिमल की चाल $= \\frac{100}{25} = 4$ मी/सेकंड $= 4 \\times \\frac{18}{5} = 14.4$ किमी/घंटा।'
    },
    {
      id: 'mcq4',
      question: 'एक 200 मीटर की दौड़ में यदि A, B को 31 मीटर से और C को 18 मीटर से हराता है, तो 350 मीटर की दौड़ में C, B को कितने मीटर से हराएगा?',
      options: [
        '25 मीटर',
        '20 मीटर',
        '28 मीटर',
        '22 मीटर'
      ],
      correctOption: 0,
      explanation: 'A $= 200 \\implies C = 200 - 18 = 182$ तथा $B = 200 - 31 = 169$।\nजब C 182 दौड़ता है, तो B को $(182 - 169) = 13$ मीटर से हराता है।\n350 मीटर की दौड़ में C, B को हराएगा $= \\frac{13}{182} \\times 350 = \\frac{1}{14} \\times 350 = 25$ मीटर।'
    },
    {
      id: 'mcq5',
      question: 'वृत्ताकार ट्रैक पर दौड़ते समय दोनों धावकों के प्रारंभिक बिंदु पर पुनः पहली बार मिलने का समय क्या होता है?',
      options: [
        'दोनों के व्यक्तिगत चक्कर समयों का ल.स.प. (LCM)',
        'दोनों की चालों का योग',
        'दोनों के समयों का गुणनफल',
        'ट्रैक की लंबाई / चालों का अंतर'
      ],
      correctOption: 0,
      explanation: 'प्रारंभिक बिंदु पर मिलने का समय सदैव धावकों द्वारा 1 चक्कर पूरा करने में लगे समयों का लघुत्तम समापवर्त्य $\\text{LCM}(t_1, t_2)$ होता है।'
    },
    {
      id: 'mcq6',
      question: 'डेड हीट (Dead Heat) का सही अर्थ क्या है?',
      options: [
        'सभी धावक ठीक एक ही समय पर अंतिम रेखा पार करते हैं',
        'दौड़ अत्यधिक गर्मी के कारण रद्द हो जाती है',
        'विजेता बहुत बड़े अंतर से जीतता है',
        'कोई भी धावक दौड़ पूरी नहीं कर पाता'
      ],
      correctOption: 0,
      explanation: 'खेल और दौड़ में "डेड हीट" का अर्थ टाई (Tie) होता है, जिसमें प्रतियोगी एक साथ अंतिम रेखा पार करते हैं।'
    },
    {
      id: 'mcq7',
      question: 'यदि दो धावकों की चालों का अनुपात $3 : 4$ हो, तो 600 मीटर की दौड़ में जीतने वाले द्वारा लक्ष्य छूने पर हारने वाला धावक लक्ष्य से कितनी दूर होगा?',
      options: [
        '150 मीटर',
        '200 मीटर',
        '100 मीटर',
        '120 मीटर'
      ],
      correctOption: 0,
      explanation: 'तेज धावक 4 इकाई $= 600 \\implies 1$ इकाई $= 150$ मीटर। धीमा धावक $= 3 \\times 150 = 450$ मीटर।\nअंतर $= 600 - 450 = 150$ मीटर।'
    },
    {
      id: 'mcq8',
      question: 'A, B की तुलना में $1\\frac{2}{3}$ गुना तेज दौड़ता है। यदि A, B को 60 मीटर की बढ़त दे, तो दौड़ की लंबाई क्या होनी चाहिए ताकि दौड़ डेड हीट पर समाप्त हो?',
      options: [
        '150 मीटर',
        '180 मीटर',
        '120 मीटर',
        '100 मीटर'
      ],
      correctOption: 0,
      explanation: 'चाल अनुपात $= \\frac{5}{3} : 1 = 5 : 3$।\nअंतर $= 5 - 3 = 2$ इकाई $= 60$ मीटर $\\implies 1$ इकाई $= 30$ मीटर।\nदौड़ की कुल लंबाई $= 5 \\times 30 = 150$ मीटर।'
    }
  ],
  keyTerminology: [
    {
      term: 'Race Course',
      termHi: 'दौड़ का कोर्स / पथ',
      definition: 'The specified linear ground or circular perimeter over which an athletic competition is contested.',
      definitionHi: 'वह निश्चित रैखिक मैदान या वृत्तीय ट्रैक जिस पर दौड़ प्रतियोगिता आयोजित की जाती है।'
    },
    {
      term: 'Head Start',
      termHi: 'आरंभिक बढ़त',
      definition: 'An advantage given to a slower contestant in terms of distance ahead or early start time.',
      definitionHi: 'कमजोर प्रतियोगी को आगे खड़े होने (दूरी की बढ़त) या पहले दौड़ने (समय की बढ़त) का दिया गया लाभ।'
    },
    {
      term: 'Dead Heat',
      termHi: 'डेड हीट (समान अंत / टाई)',
      definition: 'A contest outcome where two or more contestants reach the finishing line simultaneously.',
      definitionHi: 'दौड़ की वह स्थिति जिसमें प्रतियोगी ठीक एक ही क्षण में अंतिम रेखा पार करते हैं।'
    },
    {
      term: 'Winning Margin',
      termHi: 'जीतने का अंतर',
      definition: 'The distance by which the winner precedes the runner-up when crossing the finish line, or the time lag between their finishes.',
      definitionHi: 'विजेता द्वारा उप-विजेता को हराने की दूरी (मीटर में) अथवा समय (सेकंड में)।'
    },
    {
      term: 'Circular Track Synchronization',
      termHi: 'वृत्तीय पथ पुनर्मिलन',
      definition: 'The recurring periodic instances where two revolving bodies intersect on a closed track, evaluated via LCM and relative speed.',
      definitionHi: 'बंद वृत्तीय पथ पर धावकों के बार-बार मिलने का समय, जो ल.स.प. और आपेक्षिक चाल से निकलता है।'
    },
    {
      term: 'Games of Skill / Points',
      termHi: 'अंकों का खेल',
      definition: 'A competitive format where players contest to accumulate a predetermined target score (e.g., game of 100 points).',
      definitionHi: 'लक्ष्य अंकों (जैसे 100 अंक) तक पहुँचने की प्रतियोगिता जिसमें कमजोर खिलाड़ी को अंक बढ़त दी जाती है।'
    },
    {
      term: 'Relative Speed of Separation',
      termHi: 'आपेक्षिक पृथक्करण चाल',
      definition: 'The rate at which distance grows or shrinks between runners ($S_1 - S_2$ in same direction, $S_1 + S_2$ in opposite direction).',
      definitionHi: 'धावकों के बीच की दूरी घटने या बढ़ने की दर (समान दिशा में अंतर, विपरीत दिशा में योग)।'
    },
    {
      term: 'Speed-Distance Ratio Invariance',
      termHi: 'चाल-दूरी अनुपात समरूपता',
      definition: 'Under equal duration, the ratio of distances covered is strictly identical to the ratio of respective runner speeds.',
      definitionHi: 'समान समय अंतराल में तय की गई दूरियों का अनुपात सदैव धावकों की चालों के अनुपात के बराबर होता है।'
    }
  ],
  sources: [
    {
      title: 'Quantitative Aptitude for Competitive Examinations - Chapter: Races and Games of Skill',
      author: 'R.S. Aggarwal',
      description: 'दौड़, बढ़त, डेड हीट और अंकों के खेल का आधिकारिक एवं प्रामाणिक संदर्भ ग्रंथ।'
    },
    {
      title: 'Magical Book on Quicker Maths',
      author: 'M. Tyra',
      description: 'हारने वाले की चाल $x/t$ और वृत्तीय दौड़ के 10-सेकंड शॉर्टकट सूत्रों का संग्रह।'
    },
    {
      title: 'CG Vyapam Solved Papers (2014-2024)',
      author: 'CGPEB',
      description: 'छत्तीसगढ़ व्यापम की एसआई, पटवारी एवं सब-इंजीनियर परीक्षाओं के वास्तविक दौड़ प्रश्न।'
    },
    {
      title: 'How to Prepare for Quantitative Aptitude for CAT',
      author: 'Arun Sharma',
      description: 'वृत्तीय ट्रैक दौड़ और बहु-धावक सम्मेलनों का उच्च स्तरीय गणितीय विश्लेषण।'
    }
  ],
  confusionBuster: [
    {
      misconception: '"A, B को 20 मीटर से हराता है" और "A, B को 20 मीटर की बढ़त देता है" एक ही बात है।',
      clarification: 'दोनों बिल्कुल अलग हैं! "हराता है" का अर्थ है कि B 20 मीटर पीछे रह गया। "बढ़त देता है" का अर्थ है कि B को 20 मीटर आगे खड़ा किया गया ताकि दौड़ निष्पक्ष हो सके।'
    },
    {
      misconception: '"A, B को 20 मीटर अथवा 5 सेकंड से हराता है" में किसकी चाल निकलती है?',
      clarification: 'यह सदैव हारने वाले (B) की चाल निकलती है: $S_B = \\frac{20}{5} = 4$ मी/सेकंड! यह विजेता की चाल नहीं होती।'
    },
    {
      misconception: 'वृत्तीय ट्रैक पर विपरीत दिशा में दौड़ने पर प्रारंभिक बिंदु पर मिलने का समय अलग होता है।',
      clarification: 'प्रारंभिक बिंदु पर मिलने का समय दिशा पर निर्भर नहीं करता! वह सदैव $\\text{LCM}(t_1, t_2)$ ही होता है। केवल ट्रैक पर बीच में मिलने का समय दिशा पर निर्भर करता है।'
    },
    {
      misconception: 'चालों का अनुपात और समय का अनुपात समान होता है।',
      clarification: 'समान दूरी के लिए चाल और समय में व्युत्क्रमानुपाती (उल्टा) संबंध होता है: $\\frac{S_A}{S_B} = \\frac{T_B}{T_A}$।'
    },
    {
      misconception: '100 मीटर की दौड़ में यदि A, B को 10 मीटर से हराए और B, C को 10 मीटर से हराए, तो A, C को 20 मीटर से हराएगा।',
      clarification: 'यह सबसे आम गलतफहमी है! 20 मीटर नहीं होगा क्योंकि जब B 100 मीटर दौड़ता है तब C 90 दौड़ता है, किंतु A के 100 मीटर पर B केवल 90 मीटर ही दौड़ा था। वास्तविक अंतर 19 मीटर होगा!'
    }
  ],
  faqList: [
    {
      question: 'दौड़ में "बढ़त" (Head Start) क्या होती है?',
      answer: 'तेज धावक द्वारा कमजोर धावक को दिया गया लाभ। दूरी की बढ़त में कमजोर धावक आगे खड़ा होता है, और समय की बढ़त में वह पहले दौड़ना शुरू करता है।'
    },
    {
      question: 'जब प्रश्न में "A, B को $x$ मीटर अथवा $t$ सेकंड से हराता है" दिया हो, तो क्या करें?',
      answer: 'सीधे हारने वाले B की चाल निकालें: $S_B = \\frac{x}{t}$। फिर B का समय $D / S_B$ और A का समय उसमें से $t$ घटाकर निकाल लें।'
    },
    {
      question: 'वृत्तीय ट्रैक पर पहली बार मिलने का समय कैसे निकालते हैं?',
      answer: 'समान दिशा में $\\frac{L}{S_1 - S_2}$ तथा विपरीत दिशा में $\\frac{L}{S_1 + S_2}$ सूत्र का प्रयोग करते हैं।'
    },
    {
      question: 'डेड हीट (Dead Heat) क्या है?',
      answer: 'ऐसी दौड़ जिसमें दोनों प्रतियोगी एक साथ बिल्कुल एक ही क्षण पर अंतिम रेखा पार करते हैं, अर्थात दोनों का समय समान होता है।'
    },
    {
      question: 'CG Vyapam में दौड़ से किस प्रकार के प्रश्न आते हैं?',
      answer: 'व्यापम में मुख्यतः (1) $x$ मीटर अथवा $t$ सेकंड से हराने का मॉडल, (2) A-B और B-C की क्रमिक जीत से A-C का अंतर, तथा (3) वृत्तीय ट्रैक पर मिलन के प्रश्न पूछे जाते हैं।'
    }
  ],
  oneLinerRevision: [
    'हारने वाले की चाल $= \\frac{\\text{दूरी अंतर}}{\\text{समय अंतर}}$ ($S_B = \\frac{x}{t}$)।',
    'दूरी की बढ़त में कमजोर धावक $(D - x)$ दौड़ता है।',
    'समान समय में $\\frac{S_A}{S_B} = \\frac{D_A}{D_B}$।',
    'समान दूरी में $\\frac{S_A}{S_B} = \\frac{T_B}{T_A}$ (व्युत्क्रम संबंध)।',
    'डेड हीट का अर्थ है दोनों धावकों का एक साथ लक्ष्य पार करना।',
    'वृत्तीय दौड़ (समान दिशा): पहली बार मिलन $= \\frac{L}{S_1 - S_2}$।',
    'वृत्तीय दौड़ (विपरीत दिशा): पहली बार मिलन $= \\frac{L}{S_1 + S_2}$।',
    'आरंभिक बिंदु पर मिलन समय $= \\text{LCM}(t_1, t_2)$।',
    '100 अंकों के खेल में बढ़त का अर्थ आनुपातिक अंक अंतर है।',
    'A-B और B-C के अंतर को सीधे जोड़ने की गलती न करें, संयुक्त अनुपात निकालें।'
  ],
  rapidRevision: {
    points: [
      'गोल्डन सूत्र: $S_{\\text{loser}} = \\frac{x}{t}$।',
      'विजेता समय: $T_{\\text{winner}} = \\frac{D}{S_{\\text{loser}}} - t$।',
      'बढ़त अनुपात: $\\frac{S_A}{S_B} = \\frac{D}{D - x}$।',
      'वृत्तीय ट्रैक मिलन: $\\frac{L}{|S_1 \\pm S_2|}$।',
      'आरंभिक बिंदु पुनर्मिलन: $\\text{LCM}(t_1, t_2)$।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_25 (Race Problems)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_25').set(sanitized);
  console.log('✅ cgv_master_adv_math_25 saved to Firestore topic_study_notes!');

  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === 'cgv_master_sub_3') {
        for (const ch of sub.chapters || []) {
          if (ch.id === 'cgv_master_sub_3_ch_19') {
            for (const t of ch.topics || []) {
              if (t.id === 'adv_math_25') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_25 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 Chapter 19 is now 100% complete!');
  console.log('🏆 SUBJECT 3 (MATHEMATICS) ALL 19 CHAPTERS ARE NOW 100% COMPLETE! 🏆');
}

upload().catch(console.error);
