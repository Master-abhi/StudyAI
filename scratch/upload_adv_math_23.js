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
  topicId: 'adv_math_23',
  topicName: 'Clock Problems',
  topicNameHi: 'घड़ी आधारित प्रश्न',
  chapterId: 'cgv_master_sub_3_ch_19',
  subjectId: 'cgv_master_sub_3',
  syllabusId: 'cgv_master',
  overview: {
    introduction: 'घड़ी आधारित प्रश्न (Clock Problems) अंकगणित एवं तार्किक अभिक्षमता का एक अत्यंत महत्वपूर्ण और रोचक अध्याय है। यह मूलतः वृत्तीय गति (Circular Motion) और आपेक्षिक चाल (Relative Speed) के सिद्धांतों पर आधारित होता है। घड़ी का डायल $360^\\circ$ का एक पूर्ण वृत्त होता है, जो 12 बड़े घंटे के खानों ($30^\\circ$ प्रत्येक) तथा 60 छोटे मिनट के खानों ($6^\\circ$ प्रत्येक) में विभाजित रहता है।',
    importance: 'CG Vyapam (पटवारी, आरआई, एसआई, छात्रावास अधीक्षक, सब-इंजीनियर) तथा CGPSC CSAT में दोनों सुइयों के मध्य कोण, संपाती होने ($0^\\circ$), विपरीत दिशा ($180^\\circ$), समकोण ($90^\\circ$), दर्पण प्रतिबिंब तथा धीमी या तेज घड़ी (Faulty Clock) पर आधारित 1 से 2 प्रश्न अनिवार्य रूप से पूछे जाते हैं।',
    examRelevance: 'परीक्षाओं में कोण निकालने का सीधा मास्टर सूत्र $\\theta = |30H - \\frac{11}{2}M|$, दिए गए कोण पर समय की गणना, दर्पण प्रतिबिंब समय ($11:60$ से घटाना) तथा सुइयों के 12/24 घंटे में मिलने की संख्या के प्रश्न सर्वाधिक पूछे जाते हैं।',
    quickFacts: [
      'घंटे की सुई की चाल: $\\frac{1}{2}^\\circ$ प्रति मिनट ($30^\\circ$ प्रति घंटा)।',
      'मिनट की सुई की चाल: $6^\\circ$ प्रति मिनट ($360^\\circ$ प्रति घंटा)।',
      'आपेक्षिक चाल (Relative Speed): मिनट की सुई घंटे की सुई से $5\\frac{1}{2}^\\circ$ या $\\frac{11}{2}^\\circ$ प्रति मिनट तेज चलती है।',
      'कोण निकालने का रामबाण सूत्र: $\\theta = \\left|30H - \\frac{11}{2}M\\right|$।',
      '12 घंटे में सुइयां 11 बार आपस में मिलती हैं ($0^\\circ$), 24 घंटे में 22 बार।',
      '12 घंटे में सुइयां 11 बार एक-दूसरे के विपरीत ($180^\\circ$) होती हैं, 24 घंटे में 22 बार।',
      '12 घंटे में सुइयां 22 बार समकोण ($90^\\circ$) बनाती हैं, 24 घंटे में 44 बार।',
      'दर्पण प्रतिबिंब समय (Mirror Image Time): दिए गए समय को $11:60$ में से घटाएं।',
      'जल प्रतिबिंब समय (Water Image Time): दिए गए समय को $18:30$ (या $17:90$) में से घटाएं।'
    ]
  },
  chapters: [
    {
      id: 'ch1',
      title: 'घड़ी की मूल ज्यामिति एवं सुइयों की गतियाँ',
      content: `### 1. डायल का कोणीय विभाजन
- घड़ी का संपूर्ण डायल $= 360^\\circ$ (वृत्त)
- 12 घंटे के बड़े विभाजन $\\implies 1$ घंटे का खाना $= \\frac{360^\\circ}{12} = 30^\\circ$
- 60 मिनट के छोटे विभाजन $\\implies 1$ मिनट का खाना $= \\frac{360^\\circ}{60} = 6^\\circ$

### 2. सुइयों की कोणीय चाल (Speeds of Hands)
1. **मिनट की सुई (Minute Hand):**
   - 60 मिनट में घूमती है $= 360^\\circ$
   - 1 मिनट में चाल $= \\frac{360^\\circ}{60} = 6^\\circ$ प्रति मिनट।
2. **घंटे की सुई (Hour Hand):**
   - 12 घंटे (720 मिनट) में घूमती है $= 360^\\circ$
   - 1 घंटे (60 मिनट) में घूमती है $= 30^\\circ$
   - 1 मिनट में चाल $= \\frac{30^\\circ}{60} = \\frac{1}{2}^\\circ = 0.5^\\circ$ प्रति मिनट।
3. **आपेक्षिक चाल (Relative Speed):**
   - दोनों सुइयां एक ही दिशा में घूमती हैं:
   $$\\text{आपेक्षिक चाल} = 6^\\circ - 0.5^\\circ = 5.5^\\circ = \\frac{11}{2}^\\circ \\text{ प्रति मिनट}$$
   - मिनट की सुई घंटे की सुई से 1 मिनट में $5\\frac{1}{2}^\\circ$ आगे निकलती है।`
    },
    {
      id: 'ch2',
      title: 'सुइयों के मध्य कोण निकालने का रामबाण सूत्र',
      content: `### 1. मास्टर कोण सूत्र (Master Angle Formula)
किसी समय $H$ बजकर $M$ मिनट पर दोनों सुइयों के बीच का कोण:
$$\\theta = \\left|30H - \\frac{11}{2}M\\right|$$

जहाँ:
- $H$ = घंटे का मान (1 से 12)
- $M$ = मिनट का मान (0 से 59)
- निरपेक्ष मान चिन्ह $| \\dots |$ का अर्थ है कि कोण सदैव धनात्मक लिया जाता है।

### 2. आंतरिक कोण बनाम परावर्तित कोण (Internal vs Reflex Angle)
- **आंतरिक कोण (Internal Angle):** यदि सूत्र से प्राप्त $\\theta \\le 180^\\circ$ हो, तो वही आंतरिक कोण है।
- **परावर्तित कोण (Reflex Angle):** यदि प्रश्न में बड़ा कोण या परावर्तित कोण पूछा जाए:
  $$\\text{परावर्तित कोण} = 360^\\circ - \\theta$$

**उदाहरण:** 4 बजकर 20 मिनट पर दोनों सुइयों के बीच का कोण:
- $H = 4, M = 20$
$$\\theta = \\left|30(4) - \\frac{11}{2}(20)\\right| = |120 - 110| = 10^\\circ$$
- अतः कोण $= 10^\\circ$ (परावर्तित कोण $= 360^\\circ - 10^\\circ = 350^\\circ$)`
    },
    {
      id: 'ch3',
      title: 'विशिष्ट स्थितियां: संपाती, विपरीत एवं समकोण',
      content: `### 1. संपाती होना / एक साथ मिलना ($0^\\circ$ या Coincide)
- दोनों सुइयां प्रत्येक घंटे में 1 बार आपस में मिलती हैं, **किंतु 11 से 1 बजे के 2 घंटों में केवल 1 बार (ठीक 12:00 बजे)** मिलती हैं।
- 12 घंटे में $= 11$ बार; 24 घंटे में $= 22$ बार।
- **मिलने का समय सूत्र:**
  $$M = \\frac{60}{11} \\times H$$
  - उदाहरण: 3 और 4 बजे के बीच मिलने का समय $= 3$ बजकर $\\frac{60}{11} \\times 3 = \\frac{180}{11} = 16\\frac{4}{11}$ मिनट।

### 2. एक सीध में किंतु विपरीत दिशा में होना ($180^\\circ$ या Opposite)
- प्रत्येक घंटे में 1 बार विपरीत होती हैं, **किंतु 5 से 7 बजे के 2 घंटों में केवल 1 बार (ठीक 6:00 बजे)** विपरीत होती हैं।
- 12 घंटे में $= 11$ बार; 24 घंटे में $= 22$ बार।

### 3. समकोण बनाना ($90^\\circ$ या Right Angle)
- सामान्यतः प्रत्येक घंटे में 2 बार समकोण बनता है, **किंतु 2 से 4 बजे में 3 बार और 8 से 10 बजे में 3 बार** बनता है।
- 12 घंटे में $= 22$ बार; 24 घंटे में $= 44$ बार।
- **दिए गए कोण $\\theta$ पर समय का सामान्य सूत्र:**
  $$M = \\frac{2}{11}(30H \\pm \\theta)$$`
    },
    {
      id: 'ch4',
      title: 'दर्पण प्रतिबिंब एवं जल प्रतिबिंब समय',
      content: `### 1. दर्पण प्रतिबिंब समय (Vertical Mirror Image)
जब किसी घड़ी के सामने लंबवत दर्पण (Vertical Mirror) रखा जाए:
- **शॉर्टकट नियम:** दिए गए समय को **$11:60$** (या 12 घंटे से अधिक होने पर **$23:60$**) में से घटा दें!
- **उदाहरण 1:** घड़ी में $8:20$ बजा है। दर्पण में क्या समय दिखेगा?
  $$11:60 - 8:20 = 3:40$$
- **उदाहरण 2:** घड़ी में $2:45$ बजा है। दर्पण प्रतिबिंब:
  $$11:60 - 2:45 = 9:15$$

### 2. जल प्रतिबिंब समय (Horizontal / Water Image)
जब घड़ी को क्षैतिज रूप से या पानी में देखा जाए:
- **शॉर्टकट नियम:** दिए गए समय को **$18:30$** (या मिनट 30 से अधिक होने पर **$17:90$**) में से घटाएं!
- **उदाहरण 1:** घड़ी में $4:10$ बजा है। जल प्रतिबिंब:
  $$18:30 - 4:10 = 14:20 = 2:20$$
- **उदाहरण 2:** घड़ी में $9:50$ बजा है। (मिनट $> 30$, अतः $17:90$ का प्रयोग करें):
  $$17:90 - 9:50 = 8:40$$`
    },
    {
      id: 'ch5',
      title: 'त्रुटिपूर्ण घड़ियाँ (Slow and Fast Clocks)',
      content: `### 1. सामान्य मिलने का मानक समय
एक सामान्य सही घड़ी में दोनों सुइयां ठीक **$65\\frac{5}{11}$ मिनट** बाद आपस में मिलती हैं।
- यदि सुइयां $65\\frac{5}{11}$ मिनट से **पहले** मिलती हैं $\\implies$ घड़ी **तेज़ (Fast)** चल रही है।
- यदि सुइयां $65\\frac{5}{11}$ मिनट के **बाद** मिलती हैं $\\implies$ घड़ी **धीमी (Slow)** चल रही है।

### 2. लाभ या हानि का सूत्र
यदि दोनों सुइयां $M$ मिनट में मिलती हैं, तो 24 घंटे में लाभ या हानि:
$$\\text{Gain / Loss in 24 hours} = \\left(\\frac{65\\frac{5}{11} - M}{M}\\right) \\times 24 \\times 60 \\text{ मिनट}$$
$$\\text{Gain / Loss} = \\left(\\frac{\\frac{720}{11} - M}{M}\\right) \\times \\frac{1440}{1} \\text{ मिनट}$$`
    }
  ],
  comparativeTables: [
    {
      title: 'घंटे की सुई बनाम मिनट की सुई की गतियों की तुलना',
      headers: ['मापदंड', 'घंटे की सुई (Hour Hand)', 'मिनट की सुई (Minute Hand)', 'आपेक्षिक तुलना'],
      rows: [
        ['1 घंटे में चली गई दूरी', '$30^\\circ$ (5 मिनट खाने)', '$360^\\circ$ (60 मिनट खाने)', 'मिनट की सुई 12 गुना तेज'],
        ['1 मिनट में कोणीय चाल', '$\\frac{1}{2}^\\circ = 0.5^\\circ$', '$6^\\circ$', 'अंतर $= 5.5^\\circ$ प्रति मिनट'],
        ['1 सेकंड में कोणीय चाल', '$\\frac{1}{120}^\\circ$', '$\\frac{1}{10}^\\circ$', '-'],
        ['पूर्ण चक्कर का समय', '12 घंटे (720 मिनट)', '1 घंटा (60 मिनट)', '-']
      ]
    },
    {
      title: 'विशिष्ट स्थितियों की आवृत्तियाँ एवं विशेषताएं',
      headers: ['स्थिति / संबंध', 'सुइयों के मध्य कोण', '12 घंटे में आवृत्ति', '24 घंटे में आवृत्ति', 'अपवाद समय (जहाँ कमी होती है)'],
      rows: [
        ['संपाती होना (Coincide)', '$0^\\circ$', '11 बार', '22 बार', '11:00 से 1:00 के बीच केवल 1 बार (12:00 पर)'],
        ['विपरीत होना (Opposite)', '$180^\\circ$', '11 बार', '22 बार', '5:00 से 7:00 के बीच केवल 1 बार (6:00 पर)'],
        ['एक सीध में (In straight line)', '$0^\\circ$ या $180^\\circ$', '22 बार ($11+11$)', '44 बार ($22+22$)', '-'],
        ['समकोण (Right Angle)', '$90^\\circ$', '22 बार', '44 बार', '2:00 से 4:00 में 3 बार और 8:00 से 10:00 में 3 बार']
      ]
    },
    {
      title: 'दर्पण प्रतिबिंब बनाम जल प्रतिबिंब के नियम',
      headers: ['मापदंड', 'दर्पण प्रतिबिंब (Vertical Mirror)', 'जल प्रतिबिंब (Water / Horizontal Mirror)'],
      rows: [
        ['दर्पण की स्थिति', 'घड़ी के लंबवत (दाएं या बाएं)', 'घड़ी के क्षैतिज (नीचे)'],
        ['घटाने का आधार समय', '$11:60$ (यदि समय $\\le 12$) या $23:60$', '$18:30$ (यदि मिनट $\\le 30$) या $17:90$'],
        ['परिवर्तन की दिशा', 'बायाँ भाग दायाँ और दायाँ भाग बायाँ', 'ऊपरी भाग नीचे और निचला भाग ऊपर'],
        ['12 और 6 की स्थिति', '12 और 6 अपरिवर्तित रहते हैं', '12 बदलकर 6 और 6 बदलकर 12 बनता है']
      ]
    }
  ],
  pyqs: [
    {
      id: 'pyq1',
      question: '7 बजकर 20 मिनट पर घड़ी की दोनों सुइयों के मध्य कितने अंश का कोण बनेगा? [CG Vyapam Patwari / RI]',
      options: [
        '$100^\\circ$',
        '$110^\\circ$',
        '$90^\\circ$',
        '$105^\\circ$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Patwari',
      explanation: 'मास्टर सूत्र से:\n$$\\theta = \\left|30H - \\frac{11}{2}M\\right|$$\nयहाँ $H = 7, M = 20$\n$$\\theta = \\left|30(7) - \\frac{11}{2}(20)\\right| = |210 - 110| = 100^\\circ$$\nअतः दोनों सुइयों के बीच $100^\\circ$ का कोण बनेगा।'
    },
    {
      id: 'pyq2',
      question: '3 और 4 बजे के बीच घड़ी की दोनों सुइयां किस समय एक साथ (संपाती) होंगी? [CG Vyapam SI Mains]',
      options: [
        '3 बजकर $16\\frac{4}{11}$ मिनट',
        '3 बजकर $15$ मिनट',
        '3 बजकर $16\\frac{2}{11}$ मिनट',
        '3 बजकर $18\\frac{2}{11}$ मिनट'
      ],
      correctOption: 0,
      examName: 'CG Vyapam SI Mains',
      explanation: 'शॉर्टकट सूत्र: संपाती होने का समय $= \\frac{60}{11} \\times H$\nयहाँ $H = 3$\n$$M = \\frac{60}{11} \\times 3 = \\frac{180}{11} = 16\\frac{4}{11} \\text{ मिनट}$$\nअतः सही समय 3 बजकर $16\\frac{4}{11}$ मिनट होगा।'
    },
    {
      id: 'pyq3',
      question: 'यदि किसी घड़ी में वास्तविक समय 9 बजकर 25 मिनट है, तो दर्पण प्रतिबिंब में क्या समय दिखाई देगा? [CGPSC SSE / Vyapam Combined]',
      options: [
        '2 बजकर 35 मिनट',
        '3 बजकर 35 मिनट',
        '2 बजकर 25 मिनट',
        '3 बजकर 25 मिनट'
      ],
      correctOption: 0,
      examName: 'CGPSC SSE',
      explanation: 'दर्पण प्रतिबिंब निकालने के लिए $11:60$ में से घटाएं:\n$$11:60 - 9:25 = 2:35$$\nअतः दर्पण में 2 बजकर 35 मिनट दिखेगा।'
    },
    {
      id: 'pyq4',
      question: 'एक दिन (24 घंटे) में घड़ी की दोनों सुइयां कितनी बार परस्पर समकोण ($90^\\circ$) बनाती हैं? [CG Vyapam Hostel Superintendent]',
      options: [
        '44 बार',
        '48 बार',
        '22 बार',
        '24 बार'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Hostel Superintendent',
      explanation: 'सुइयां 12 घंटे में 22 बार समकोण बनाती हैं (2 से 4 बजे में 3 बार और 8 से 10 बजे में 3 बार)।\nअतः 24 घंटे में कुल $= 22 \\times 2 = 44$ बार समकोण बनता है।'
    },
    {
      id: 'pyq5',
      question: '8 बजकर 30 मिनट पर दोनों सुइयों के मध्य का कोण क्या होगा? [CG Vyapam Teacher / AMO]',
      options: [
        '$75^\\circ$',
        '$60^\\circ$',
        '$80^\\circ$',
        '$70^\\circ$'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Teacher',
      explanation: '$$\\theta = \\left|30(8) - \\frac{11}{2}(30)\\right| = |240 - 165| = 75^\\circ$$'
    },
    {
      id: 'pyq6',
      question: '2 और 3 बजे के बीच किस समय दोनों सुइयां एक-दूसरे के ठीक विपरीत (एक सीधी रेखा में) होंगी? [CG Vyapam Assistant Grade 3]',
      options: [
        '2 बजकर $43\\frac{7}{11}$ मिनट',
        '2 बजकर $40$ मिनट',
        '2 बजकर $45$ मिनट',
        '2 बजकर $42\\frac{5}{11}$ मिनट'
      ],
      correctOption: 0,
      examName: 'CG Vyapam Assistant Grade 3',
      explanation: 'सूत्र: $M = \\frac{2}{11}(30H + 180)$\nयहाँ $H = 2$:\n$$M = \\frac{2}{11}(30 \\times 2 + 180) = \\frac{2}{11}(60 + 180) = \\frac{2}{11} \\times 240 = \\frac{480}{11} = 43\\frac{7}{11} \\text{ मिनट}$$\nअतः 2 बजकर $43\\frac{7}{11}$ मिनट पर।'
    }
  ],
  mcqs: [
    {
      id: 'mcq1',
      question: 'मिनट की सुई 1 मिनट में कितने अंश घूमती है?',
      options: [
        '$6^\\circ$',
        '$0.5^\\circ$',
        '$30^\\circ$',
        '$12^\\circ$'
      ],
      correctOption: 0,
      explanation: '60 मिनट में $360^\\circ \\implies 1$ मिनट में $\\frac{360}{60} = 6^\\circ$।'
    },
    {
      id: 'mcq2',
      question: 'घंटे की सुई 1 मिनट में कितने अंश घूमती है?',
      options: [
        '$\\frac{1}{2}^\\circ$',
        '$6^\\circ$',
        '$1^\\circ$',
        '$5^\\circ$'
      ],
      correctOption: 0,
      explanation: '60 मिनट में $30^\\circ \\implies 1$ मिनट में $\\frac{30}{60} = 0.5^\\circ = \\frac{1}{2}^\\circ$।'
    },
    {
      id: 'mcq3',
      question: '5 बजकर 15 मिनट पर दोनों सुइयों के मध्य का कोण क्या होगा?',
      options: [
        '$67.5^\\circ$',
        '$60^\\circ$',
        '$72.5^\\circ$',
        '$65^\\circ$'
      ],
      correctOption: 0,
      explanation: '$$\\theta = \\left|30(5) - \\frac{11}{2}(15)\\right| = |150 - 82.5| = 67.5^\\circ = 67\\frac{1}{2}^\\circ$$'
    },
    {
      id: 'mcq4',
      question: '24 घंटे में घड़ी की दोनों सुइयां कितनी बार एक सीधी रेखा में (संपाती या विपरीत) होती हैं?',
      options: [
        '44 बार',
        '22 बार',
        '48 बार',
        '24 बार'
      ],
      correctOption: 0,
      explanation: 'संपाती (22 बार) + विपरीत (22 बार) $= 44$ बार।'
    },
    {
      id: 'mcq5',
      question: 'यदि किसी घड़ी में जल प्रतिबिंब समय $5:20$ दिखाई दे रहा है, तो वास्तविक समय क्या होगा?',
      options: [
        '$1:10$',
        '$12:10$',
        '$1:20$',
        '$12:20$'
      ],
      correctOption: 0,
      explanation: 'जल प्रतिबिंब हेतु $18:30$ से घटाएं: $18:30 - 5:20 = 13:10 = 1:10$।'
    },
    {
      id: 'mcq6',
      question: '12 बजे दोनों सुइयों के मध्य कितने अंश का कोण होता है?',
      options: [
        '$0^\\circ$',
        '$360^\\circ$',
        '$180^\\circ$',
        '$90^\\circ$'
      ],
      correctOption: 0,
      explanation: '12 बजे दोनों सुइयां एक ही स्थान पर संपाती होती हैं, अतः उनके मध्य $0^\\circ$ का कोण होता है।'
    },
    {
      id: 'mcq7',
      question: '4 बजकर 40 मिनट पर दोनों सुइयों के मध्य बनने वाला परावर्तित कोण (Reflex Angle) क्या होगा?',
      options: [
        '$260^\\circ$',
        '$100^\\circ$',
        '$280^\\circ$',
        '$240^\\circ$'
      ],
      correctOption: 0,
      explanation: 'आंतरिक कोण $\\theta = |30(4) - \\frac{11}{2}(40)| = |120 - 220| = 100^\\circ$\nपरावर्तित कोण $= 360^\\circ - 100^\\circ = 260^\\circ$।'
    },
    {
      id: 'mcq8',
      question: 'एक सामान्य घड़ी में दोनों सुइयां कितने समय अंतराल पर एक-दूसरे से मिलती हैं?',
      options: [
        '$65\\frac{5}{11}$ मिनट',
        '65 मिनट',
        '60 मिनट',
        '$65\\frac{6}{11}$ मिनट'
      ],
      correctOption: 0,
      explanation: 'मानक सही घड़ी में सुइयां ठीक $\\frac{720}{11} = 65\\frac{5}{11}$ मिनट पर एक-दूसरे से मिलती हैं।'
    }
  ],
  keyTerminology: [
    {
      term: 'Clock Dial',
      termHi: 'घड़ी का डायल',
      definition: 'A 360-degree circular perimeter divided into 12 large hour sectors (30° each) and 60 small minute spaces (6° each).',
      definitionHi: 'घड़ी का $360^\\circ$ का वृत्ताकार मुख जो 12 बड़े खानों ($30^\\circ$) तथा 60 छोटे खानों ($6^\\circ$) में बंटा होता है।'
    },
    {
      term: 'Relative Angular Speed',
      termHi: 'आपेक्षिक कोणीय चाल',
      definition: 'The net rate of 5.5°/min (11/2°/min) at which the minute hand gains angular lead over the hour hand.',
      definitionHi: 'वह आपेक्षिक गति ($5.5^\\circ$ प्रति मिनट) जिससे मिनट की सुई घंटे की सुई से आगे बढ़ती है।'
    },
    {
      term: 'Master Angle Formula',
      termHi: 'मास्टर कोण सूत्र',
      definition: 'The universal absolute-difference equation $\\theta = |30H - 5.5M|$ resolving hand separation angles instantly.',
      definitionHi: 'किसी भी समय पर दोनों सुइयों के मध्य कोण निकालने का सार्वभौमिक सूत्र $\\theta = |30H - 5.5M|$।'
    },
    {
      term: 'Coincidence ($0^\\circ$)',
      termHi: 'संपाती होना',
      definition: 'The condition where minute and hour hands overlap precisely, occurring 11 times in 12 hours and 22 times in 24 hours.',
      definitionHi: 'जब दोनों सुइयां एक के ऊपर एक आ जाती हैं ($0^\\circ$), जो 24 घंटे में 22 बार होता है।'
    },
    {
      term: 'Opposite Direction ($180^\\circ$)',
      termHi: 'विपरीत दिशा में होना',
      definition: 'The straight-line collinear configuration pointing in diametrically opposite directions occurring 22 times a day.',
      definitionHi: 'जब दोनों सुइयां एक सीधी रेखा में विपरीत दिशा में इंगित करती हैं ($180^\\circ$)।'
    },
    {
      term: 'Right Angle ($90^\\circ$)',
      termHi: 'समकोण बनाना',
      definition: 'The perpendicular arrangement occurring 22 times in 12 hours and 44 times in 24 hours.',
      definitionHi: 'जब दोनों सुइयां परस्पर लंबवत होती हैं, जो 24 घंटे में 44 बार होता है।'
    },
    {
      term: 'Mirror Image Time',
      termHi: 'दर्पण प्रतिबिंब समय',
      definition: 'The apparent time in a vertical flat mirror computed by subtracting the given time from 11:60.',
      definitionHi: 'लंबवत दर्पण में दिखाई देने वाला समय, जिसे $11:60$ से घटाकर निकाला जाता है।'
    },
    {
      term: 'Faulty / Errant Clock',
      termHi: 'दोषपूर्ण घड़ी (धीमी या तेज)',
      definition: 'A timekeeping mechanism whose hand synchronization departs from the standard $65\\frac{5}{11}$ min baseline.',
      definitionHi: 'ऐसी घड़ी जो मानक समय $65\\frac{5}{11}$ मिनट से पहले या बाद में मिलकर समय का लाभ या हानि करती है।'
    }
  ],
  sources: [
    {
      title: 'A Modern Approach to Verbal & Non-Verbal Reasoning - Chapter: Clock',
      author: 'R.S. Aggarwal',
      description: 'घड़ी की मूल ज्यामिति, कोण सूत्र, दर्पण/जल प्रतिबिंब एवं दोषपूर्ण घड़ियों का प्रामाणिक संदर्भ।'
    },
    {
      title: 'Magical Book on Quicker Maths',
      author: 'M. Tyra',
      description: 'कोण एवं विशिष्ट स्थितियों के द्रुतगामी 10-सेकंड शॉर्टकट सूत्रों का संकलन।'
    },
    {
      title: 'CG Vyapam & CGPSC Solved Papers (2015-2024)',
      author: 'CGPEB / CGPSC',
      description: 'छत्तीसगढ़ व्यापम और राज्य सेवा आयोग द्वारा आयोजित परीक्षाओं के वास्तविक घड़ी प्रश्न।'
    },
    {
      title: 'Fast Track Objective Arithmetic',
      author: 'Rajesh Verma',
      description: 'प्रतियोगी परीक्षाओं के लिए घड़ी के सूत्रों, ट्रिक्स और अभ्यास प्रश्नों का संग्रह।'
    }
  ],
  confusionBuster: [
    {
      misconception: 'सुइयां 24 घंटे में 24 बार आपस में मिलती हैं।',
      clarification: 'नहीं! 11 से 1 बजे के बीच सुइयां दो बार मिलने के बजाय केवल 1 बार (ठीक 12:00 बजे) मिलती हैं, इसलिए 12 घंटे में 11 बार और 24 घंटे में केवल 22 बार मिलती हैं।'
    },
    {
      misconception: 'जल प्रतिबिंब निकालने के लिए भी $11:60$ में से घटाना चाहिए।',
      clarification: '$11:60$ केवल लंबवत दर्पण प्रतिबिंब के लिए है! जल प्रतिबिंब (क्षैतिज) के लिए $18:30$ या $17:90$ में से घटाया जाता है।'
    },
    {
      misconception: 'घंटे की सुई स्थिर रहती है और केवल मिनट की सुई चलती है।',
      clarification: 'मिनट की सुई के चलने के साथ-साथ घंटे की सुई भी प्रत्येक मिनट में $0.5^\\circ$ खिसकती है, इसलिए कोण निकालते समय $30H - \\frac{11}{2}M$ का प्रयोग किया जाता है।'
    },
    {
      misconception: 'परावर्तित कोण $180^\\circ$ से छोटा होता है।',
      clarification: 'परावर्तित कोण (Reflex Angle) सदैव $180^\\circ$ से बड़ा और $360^\\circ$ से छोटा होता है। इसे $360^\\circ - \\theta$ करके निकाला जाता है।'
    },
    {
      misconception: 'सुइयां 24 घंटे में 48 बार समकोण बनाती हैं।',
      clarification: '2 से 4 बजे और 8 से 10 बजे में 4 बार के स्थान पर 3-3 बार ही समकोण बनता है, अतः 12 घंटे में 22 बार और 24 घंटे में 44 बार समकोण बनता है।'
    }
  ],
  faqList: [
    {
      question: 'दोनों सुइयों के मध्य कोण निकालने का सबसे सरल सूत्र क्या है?',
      answer: 'सीधा मास्टर सूत्र $\\theta = \\left|30H - \\frac{11}{2}M\\right|$ है, जहाँ $H$ घंटा और $M$ मिनट है।'
    },
    {
      question: 'दर्पण प्रतिबिंब समय कैसे ज्ञात करते हैं?',
      answer: 'दिए गए समय को $11:60$ में से घटाएं। यदि समय 12 से बड़ा हो तो $23:60$ में से घटाएं।'
    },
    {
      question: 'जल प्रतिबिंब समय कैसे ज्ञात करते हैं?',
      answer: 'दिए गए समय को $18:30$ में से घटाएं। यदि मिनट 30 से अधिक हों, तो $17:90$ में से घटाएं।'
    },
    {
      question: '24 घंटे में सुइयां कितनी बार संपाती और विपरीत होती हैं?',
      answer: '24 घंटे में सुइयां 22 बार संपाती ($0^\\circ$) तथा 22 बार विपरीत ($180^\\circ$) होती हैं।'
    },
    {
      question: 'CG Vyapam में घड़ी से किस प्रकार के प्रश्न पूछे जाते हैं?',
      answer: 'व्यापम में मुख्यतः (1) दिए गए समय पर दोनों सुइयों के बीच कोण, (2) दर्पण प्रतिबिंब समय, (3) संपाती होने का समय, और (4) 24 घंटे में आवृत्तियों की संख्या पूछी जाती है।'
    }
  ],
  oneLinerRevision: [
    'कोण सूत्र: $\\theta = \\left|30H - \\frac{11}{2}M\\right|$।',
    'मिनट की सुई की चाल $= 6^\\circ$/मिनट; घंटे की सुई $= 0.5^\\circ$/मिनट।',
    'आपेक्षिक चाल: $5.5^\\circ$ प्रति मिनट।',
    'दर्पण प्रतिबिंब समय $= 11:60 - \\text{समय}$।',
    'जल प्रतिबिंब समय $= 18:30 - \\text{समय}$ (या $17:90$)।',
    '24 घंटे में: $0^\\circ = 22$ बार, $180^\\circ = 22$ बार, $90^\\circ = 44$ बार।',
    'सीधी रेखा में सुइयां $= 44$ बार ($22$ संपाती $+ 22$ विपरीत)।',
    'संपाती होने का समय: $M = \\frac{60}{11} \\times H$।',
    'सामान्य घड़ी में मिलने का अंतराल $= 65\\frac{5}{11}$ मिनट।',
    'परावर्तित कोण $= 360^\\circ - \\theta$।'
  ],
  rapidRevision: {
    points: [
      'कोण: $|30H - 5.5M|$।',
      'दर्पण: $11:60$ से घटाव; जल: $18:30$ से घटाव।',
      'आवृत्तियाँ (24 घंटे): संपाती $= 22$, विपरीत $= 22$, समकोण $= 44$।',
      'संपाती समय: $\\frac{60}{11} \\times H$।',
      'दोषपूर्ण घड़ी तुलना: $65\\frac{5}{11}$ मिनट।'
    ]
  }
};

async function upload() {
  console.log('Uploading study notes for adv_math_23 (Clock Problems)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  
  await db.collection('topic_study_notes').doc('cgv_master_adv_math_23').set(sanitized);
  console.log('✅ cgv_master_adv_math_23 saved to Firestore topic_study_notes!');

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
              if (t.id === 'adv_math_23') {
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
      console.log('✅ syllabi/cgv_master updated: adv_math_23 hasStudyNotes = true');
    }
  }
  console.log('\nUpload complete! 🚀 adv_math_23 is synced!');
}

upload().catch(console.error);
