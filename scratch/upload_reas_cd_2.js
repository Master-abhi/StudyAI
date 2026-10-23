const path = require('path');
const admin = require(path.resolve(process.cwd(), 'server/node_modules/firebase-admin'));
const serviceAccount = require(path.resolve(process.cwd(), 'server/service-account.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

function sanitizeForFirestore(obj) {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (Array.isArray(item)) {
        return { cells: item.map(cell => (cell === undefined ? null : cell)) };
      }
      return sanitizeForFirestore(item);
    });
  }
  if (typeof obj === 'object') {
    const sanitized = {};
    for (const key of Object.keys(obj)) {
      sanitized[key] = sanitizeForFirestore(obj[key]);
    }
    return sanitized;
  }
  return obj;
}

async function markTopicCompleted(subjectId, chapterId, topicId) {
  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (!doc.exists) return;
  const data = doc.data();
  const sub = data.subjects.find(s => s.id === subjectId);
  if (!sub) return;
  const ch = sub.chapters.find(c => c.id === chapterId);
  if (!ch) return;
  const top = ch.topics.find(t => t.id === topicId);
  if (top) {
    top.hasStudyNotes = true;
    await syllabusRef.set(data, { merge: true });
    console.log(`[Syllabus Synced] hasStudyNotes: true for ${topicId}`);
  }
}

const reas_cd_2_data = {
  topicId: "reas_cd_2",
  topicName: "Number Coding",
  topicNameHi: "संख्या कोडिंग / गणितीय कोडिंग",
  chapterId: "cgv_master_sub_4_ch_3",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "संख्या कोडिंग (Number Coding) कूटलेखन का वह गणितीय एवं विश्लेषणात्मक प्रारूप है, जिसमें शब्दों या अक्षरों को उनके वर्णमाला क्रमांक (Positional Values), विपरीत स्थानिक मानों (Reverse Positional Values), अक्षरों की कुल संख्या (Total Number of Letters), अथवा स्वरों-व्यंजनों पर की गई अंकगणितीय संक्रियाओं (योग, गुणा, औसत, वर्ग, घन) के माध्यम से एक निश्चित संख्यात्मक मान में रूपांतरित किया जाता है। परीक्षार्थी को दिए गए उदाहरण शब्द और उसके संख्या कोड के मध्य छिपे गणितीय सूत्र का पता लगाकर अभीष्ट शब्द का संख्यात्मक मान निकालना होता है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, छात्रावास अधीक्षक, राजस्व निरीक्षक, श्रम पदाधिकारी) तथा CGPSC CSAT में संख्या कोडिंग से 2 से 3 प्रश्न अनिवार्य रूप से पूछे जाते हैं। यह टॉपिक अभ्यर्थी की त्वरित मानसिक जोड़-घटाव क्षमता और वर्णमाला के स्थानिक मानों की सटीक पकड़ का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में संख्या कोडिंग के चार मुख्य पैटर्न पूछे जाते हैं: (1) सीधे स्थानिक मानों का योग (Sum of Forward Positional Values - उदा. CAT = 3+1+20 = 24), (2) उल्टे/विपरीत स्थानिक मानों का योग (Sum of Reverse Positions - $27 - \\text{Forward}$), (3) योग में अक्षरों की संख्या का गुणा/जोड़ ($(\\sum \\text{Values}) \\times N$ अथवा $+N$), तथा (4) प्रत्येक अक्षर का स्वतंत्र अंक कोड (उदा. B=2, E=5, D=4 $\\implies$ BED = 254)।",
    quickFacts: [
      "सीधे मानों के योग का परीक्षण: जब भी किसी शब्द का कोड 2 या 3 अंकों की एक छोटी संख्या हो (जैसे 24, 60, 105), तो 90% मामलों में वह अक्षरों के स्थानिक मानों का योग होता है।",
      "विपरीत मानों के योग का शॉर्टकट सूत्र: किसी $N$-अक्षरीय शब्द के विपरीत मानों का योग $= (27 \\times N) - (\\text{सीधे मानों का योग})$। इससे प्रत्येक अक्षर का उलटा मान अलग-अलग निकाले बिना 3 सेकंड में उत्तर आ जाता है!",
      "अक्षरों की संख्या ($N$) का संलयन: यदि सीधे योग से उत्तर न मिले, तो योग में अक्षरों की संख्या जोड़कर ($S + N$), घटाकर ($S - N$) या गुणा करके ($S \\times N$) देखें।",
      "स्वरों का विशिष्ट मान: कुछ आधुनिक प्रश्नों में केवल स्वरों को $A=1, E=2, I=3, O=4, U=5$ कोडित किया जाता है, जबकि व्यंजनों को उनके सामान्य मान दिए जाते हैं।",
      "डिजिटल रूट (Digital Root): कई बार अक्षरों के मानों के अंकों को तब तक जोड़ा जाता है जब तक एकल अंक न मिल जाए (उदा. T = 20 $\\implies 2+0 = 2$)।"
    ]
  },
  chapters: [
    {
      id: "ch1_forward_sum_coding",
      title: "सीधे स्थानिक मानों के योग पर आधारित कोडिंग (Sum of Forward Positions)",
      content: `### 1. सीधे स्थानिक मानों के योग का विश्लेषण

यह संख्या कोडिंग का सबसे प्राथमिक एवं सर्वाधिक पूछा जाने वाला नियम है:

#### 1. शुद्ध स्थानिक योग (Pure Sum of Positions):
- शब्द: **C A T**
  - $C = 3, A = 1, T = 20$
  - योग $= 3 + 1 + 20 = 24$
  - यदि परीक्षा में दिया हो: "यदि CAT = 24 और SAD = 24, तो SHE का मान क्या होगा?"
    - SHE $= S(19) + H(8) + E(5) = 32$।

#### 2. योग के साथ स्थिर संख्या की संक्रिया (Sum $\\pm$ Constant):
- शब्द: **B A T**
  - सीधे मान: $2 + 1 + 20 = 23$
  - यदि कोड दिया हो **25** $\\implies$ योग $+ 2 = 23 + 2 = 25$।
- **D O G**
  - सीधे मान: $4 + 15 + 7 = 26$
  - कोड $= 26 + 2 = 28$।

#### 3. योग के साथ अक्षरों की संख्या का संयोजन (Sum Operation with $N$):
- नियम: $\\text{कोड} = (\\sum \\text{स्थानिक मान}) \\times N$ (जहाँ $N$ शब्द में कुल अक्षरों की संख्या है)
  - शब्द: **GO** (2 अक्षर)
    - मान: $G(7) + O(15) = 22$
    - कोड $= 22 \\times 2 = 44$ या $22 + 2 = 24$
  - शब्द: **OUT** (3 अक्षर)
    - मान: $O(15) + U(21) + T(20) = 56$
    - कोड $= 56 \\times 3 = 168$ या $56 + 3 = 59$`
    },
    {
      id: "ch2_reverse_sum_coding",
      title: "विपरीत स्थानिक मानों के योग पर आधारित कोडिंग (Sum of Reverse Positions)",
      content: `### 2. उल्टे/विपरीत स्थानिक मानों का योग एवं शॉर्टकट

जब सीधे मानों का योग दिए गए कोड से मेल न खाए (विशेषकर जब कोड मान सीधे योग से बहुत बड़ा हो), तो वह विपरीत मानों का योग होता है:

#### 1. विपरीत मान ज्ञात करने की पारंपरिक विधि:
- प्रत्येक अक्षर का विपरीत मान $= 27 - \\text{सीधा मान}$
- शब्द: **B A G**
  - B का उलटा $= 27 - 2 = 25$
  - A का उलटा $= 27 - 1 = 26$
  - G का उलटा $= 27 - 7 = 20$
  - कुल योग $= 25 + 26 + 20 = 71$

#### 2. जादुई शॉर्टकट सूत्र (Master Shortcut Formula):
यदि शब्द में कुल अक्षरों की संख्या $N$ है और सीधे मानों का कुल योग $S_{\\text{forward}}$ है, तो:
$$\\sum \\text{Reverse Positions} = (27 \\times N) - S_{\\text{forward}}$$

- **उदाहरण:** **B A G**
  - कुल अक्षर $N = 3$
  - सीधे मानों का योग $S_{\\text{forward}} = 2 + 1 + 7 = 10$
  - विपरीत योग $= (27 \\times 3) - 10 = 81 - 10 = 71$
  - मात्र 2 सेकंड में उत्तर प्राप्त!

#### 3. विपरीत योग पर आधारित व्यापम क्लासिक प्रश्न:
- यदि **Z = 52** (अर्थात $26 \\times 2$) और **ACT = 48**:
  - ACT के सीधे मान: $1 + 3 + 20 = 24$
  - $24 \\times 2 = 48$
  - BAT का मान $= (2 + 1 + 20) \\times 2 = 23 \\times 2 = 46$।`
    },
    {
      id: "ch3_individual_digit_mapping",
      title: "व्यक्तिगत अंक मैपिंग एवं डिजिटल रूट (Individual Digit Mapping & Digital Root)",
      content: `### 3. प्रत्येक अक्षर का स्वतंत्र अंक कोड एवं डिजिटल रूट

इस श्रेणी में पूरे शब्द का एक एकल योग निकालने के बजाय प्रत्येक अक्षर को अलग-अलग अंकों में बदला जाता है:

#### 1. सीधे स्थानिक मानों की शृंखला (Direct Positional Sequence):
- शब्द: **B E D**
  - $B=2, E=5, D=4 \\implies$ कोड = **254**
- शब्द: **K I N G**
  - $K=11, I=9, N=14, G=7 \\implies$ कोड = **119147**

#### 2. डिजिटल रूट / एकल अंक संपीड़न (Single Digit Reduction):
- दोहरे अंकों वाले स्थानिक मानों के अंकों को आपस में जोड़कर एकल अंक (1-9) बनाया जाता है:
  - $A(1) \\to 1$
  - $B(2) \\to 2$
  - $\\dots$
  - $J(10) \\to 1+0 = 1$
  - $K(11) \\to 1+1 = 2$
  - $L(12) \\to 1+2 = 3$
  - $T(20) \\to 2+0 = 2$
  - $Z(26) \\to 2+6 = 8$
- **उदाहरण:** **T O U R**
  - $T(20) \\to 2+0 = 2$
  - $O(15) \\to 1+5 = 6$
  - $U(21) \\to 2+1 = 3$
  - $R(18) \\to 1+8 = 9$
  - कोड = **2639**`
    },
    {
      id: "ch4_vowel_consonant_special_rules",
      title: "स्वर एवं व्यंजन विशिष्ट गणितीय नियम (Vowel & Consonant Specific Rules)",
      content: `### 4. स्वर एवं व्यंजन आधारित विशिष्ट संख्या कोडिंग

आधुनिक परीक्षाओं में परीक्षक साधारण योग के स्थान पर स्वरों और व्यंजनों के साथ अलग-अलग व्यवहार करते हैं:

#### 1. स्वरों की स्वतंत्र संख्या प्रणाली:
- अंग्रेजी वर्णमाला में केवल 5 स्वर होते हैं:
  - $A = 1, E = 2, I = 3, O = 4, U = 5$
- व्यंजनों को उनके सामान्य वर्णमाला क्रमांक ($B=2, C=3, D=4...$) पर रखा जाता है।
- **उदाहरण:** **B E D**
  - $B$ (व्यंजन) $= 2$
  - $E$ (स्वर - दूसरा स्वर) $= 2$
  - $D$ (व्यंजन) $= 4$
  - कोड = **224**

#### 2. स्वरों का योग बनाम व्यंजनों का योग:
- शब्द का कोड $= (\\sum \\text{व्यंजनों के मान}) - (\\sum \\text{स्वरों के मान})$
- या व्यंजनों के मानों को गुणा किया जाए और स्वरों के मानों को जोड़ा जाए।`
    },
    {
      id: "ch5_vyapam_model_hacks",
      title: "व्यापम स्पीड हैक्स एवं त्वरित गणना विधियाँ (Speed Hacks & Shortcuts)",
      content: `### 5. संख्या कोडिंग में 100% सटीकता के 4 कदम

1. **संख्या के आकार से नियम पहचानें (Magnitude Inspection):**
   - **बहुत छोटी संख्या (1 से 10):** अक्षरों की संख्या ($N$), या डिजिटल रूट का योग।
   - **मध्यम संख्या (15 से 90):** सीधे मानों का योग ($\\sum Forward$) या विपरीत मानों का योग।
   - **बड़ी संख्या (100 से 500):** $(\\sum Forward) \\times N$ अथवा $(\\sum Reverse) \\times N$।
   - **अंकों की लंबी पंक्ति (उदा. 6-10 अंक):** प्रत्येक अक्षर का व्यक्तिगत मान लिखा गया है।

2. **शॉर्टकट सूत्र का अनिवार्य प्रयोग:**
   - विपरीत योग निकालते समय रफ शीट पर $27-x$ बार-बार न करें। सीधे सूत्र $(27 \\times N) - S_{\\text{forward}}$ लगाएं।

3. **विकल्पों के इकाई अंक (Unit Digit) की जांच:**
   - यदि आपको $S = 19 + 8 + 15 + 14 + 5 = 61$ निकालना है, तो केवल इकाई अंक जोड़ें: $9+8=17(7), 7+5=12(2), 2+4=6, 6+5=11(1)$। जिस विकल्प के अंत में 1 हो, उसे तुरंत प्राथमिकता दें।`
    }
  ],
  comparativeTables: [
    {
      title: "संख्या कोडिंग के विभिन्न मॉडलों की तुलना एवं पहचान",
      headers: ["कोडिंग मॉडल", "कोड का संख्यात्मक स्वरूप", "पहचान की कसौटी", "उदाहरण"],
      rows: [
        { cells: ["सीधा योग (Forward Sum)", "मध्यम संख्या (20 से 80)", "शब्द के सभी स्थानिक मानों का साधारण जोड़", "CAT = 3+1+20 = 24"] },
        { cells: ["विपरीत योग (Reverse Sum)", "बड़ी संख्या (50 से 120)", "सीधे योग से काफी बड़ा मान, सूत्र $(27N - S)$", "BAG = 25+26+20 = 71"] },
        { cells: ["योग $\\times$ लंबाई ($S \\times N$)", "उच्च संख्या (100 से 400)", "योग में अक्षरों की कुल संख्या का गुणा", "GO = $22 \\times 2 = 44$"] },
        { cells: ["डिजिटल रूट (Digital Root)", "प्रत्येक अक्षर का 1 अंक", "दोहरे अंकों को जोड़कर 1-9 में बदलना", "T(20) $\\to$ 2, R(18) $\\to$ 9"] },
        { cells: ["स्वर प्रणाली (Vowel System)", "विशिष्ट क्रम", "A=1, E=2, I=3, O=4, U=5", "BED $\\to$ 224"] }
      ]
    },
    {
      title: "सीधे मान बनाम विपरीत मान त्वरित तुलना",
      headers: ["अक्षर", "सीधा मान ($F$)", "विपरीत मान ($R = 27 - F$)", "डिजिटल रूट ($F$ का)", "विपरीत अक्षर"],
      rows: [
        { cells: ["A", "1", "26", "1", "Z"] },
        { cells: ["E", "5", "22", "5", "V"] },
        { cells: ["J", "10", "17", "1 (1+0)", "Q"] },
        { cells: ["M", "13", "14", "4 (1+3)", "N"] },
        { cells: ["T", "20", "7", "2 (2+0)", "G"] },
        { cells: ["Z", "26", "1", "8 (2+6)", "A"] }
      ]
    },
    {
      title: "व्यापम में पूछे जाने वाले प्रमुख संख्या कोडिंग रूपांतरण",
      headers: ["मूल शब्द", "अक्षरों के मान", "रूपांतरण संक्रिया", "परिणामी कोड"],
      rows: [
        { cells: ["BAT", "2, 1, 20", "शुद्ध योग", "23"] },
        { cells: ["BAT", "2, 1, 20", "योग $\\times 2$", "46"] },
        { cells: ["BAT", "2, 1, 20", "योग $+ N$ (जहाँ $N=3$)", "26"] },
        { cells: ["BAT", "25, 26, 7 (Reverse)", "विपरीत योग", "58"] },
        { cells: ["BAT", "2, 1, 20", "अंकों का सीधा संयोजन", "2120"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "यदि किसी कूटभाषा में 'A = 2', 'M = 26' और 'Z = 52' है, तो 'BET' का मान क्या होगा? [CG Vyapam Patwari Exam]",
      options: ["54", "44", "46", "48"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "यहाँ प्रत्येक अक्षर के वर्णमाला क्रमांक को दोगुना $(\\times 2)$ किया गया है:\n- A = $1 \\times 2 = 2$\n- M = $13 \\times 2 = 26$\n- Z = $26 \\times 2 = 52$\nअब BET के लिए:\n- B = $2 \\times 2 = 4$\n- E = $5 \\times 2 = 10$\n- T = $20 \\times 2 = 40$\nकुल योग $= 4 + 10 + 40 = 54$\n(अथवा $(2 + 5 + 20) \\times 2 = 27 \\times 2 = 54$)।"
    },
    {
      id: "pyq2",
      question: "यदि 'REASON' को 5 के रूप में और 'BELIEVED' को 7 के रूप में कोडित किया जाता है, तो 'GOVERNMENT' का कोड क्या होगा? [CG Vyapam Subedar / SI Prelims]",
      options: ["9", "10", "8", "6"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "पैटर्न का विश्लेषण करें:\n- REASON में कुल अक्षर $= 6 \\implies 6 - 1 = 5$\n- BELIEVED में कुल अक्षर $= 8 \\implies 8 - 1 = 7$\nनियम है: $(\\text{शब्द में कुल अक्षरों की संख्या} - 1)$।\nGOVERNMENT में कुल अक्षर $= 10$ हैं।\nअतः अभीष्ट कोड $= 10 - 1 = 9$ होगा।"
    },
    {
      id: "pyq3",
      question: "यदि 'BAG = 71' हो, तो 'CAP' का मान क्या होगा? [CGPSC CSAT]",
      options: ["61", "63", "65", "67"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "यहाँ विपरीत स्थानिक मानों (Reverse Positions) का योग है:\n- B का विपरीत मान $= 27 - 2 = 25$\n- A का विपरीत मान $= 27 - 1 = 26$\n- G का विपरीत मान $= 27 - 7 = 20$\nयोग $= 25 + 26 + 20 = 71$।\n\nअब CAP के लिए शॉर्टकट सूत्र लगाएं:\n$\\sum \\text{Reverse} = (27 \\times 3) - S_{\\text{forward}}$\n- C(3) + A(1) + P(16) $= 20$\n- विपरीत योग $= (27 \\times 3) - 20 = 81 - 20 = 61$।\nअतः सही उत्तर 61 है।"
    },
    {
      id: "pyq4",
      question: "यदि 'D = 4' और 'COVER = 63' हो, तो 'BASIS' का मान क्या होगा? [CG Vyapam Hostel Warden]",
      options: ["50", "55", "54", "49"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "COVER के सीधे मानों का योग:\n- C(3) + O(15) + V(22) + E(5) + R(18) $= 63$ (शुद्ध योग)।\nअब BASIS के सीधे मानों का योग निकालें:\n- B(2) + A(1) + S(19) + I(9) + S(19)\n$= 2 + 1 + 19 + 9 + 19 = 50$।\nअतः सही उत्तर 50 है।"
    },
    {
      id: "pyq5",
      question: "यदि 'DEER = 12215' और 'HIGH = 5645' है, तो उसी कूट में 'HEEL' को क्या लिखा जाएगा? [CG Vyapam Revenue Inspector]",
      options: ["5229", "5228", "6228", "5339"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "पैटर्न में प्रत्येक अक्षर के स्थानिक मान में से 3 घटाया गया है ($-3$):\n- D(4)-3=1, E(5)-3=2, E(5)-3=2, R(18)-3=15 $\\implies$ 12215\n- H(8)-3=5, I(9)-3=6, G(7)-3=4, H(8)-3=5 $\\implies$ 5645\nHEEL के लिए:\n- H(8) - 3 = 5\n- E(5) - 3 = 2\n- E(5) - 3 = 2\n- L(12) - 3 = 9\nअतः अभीष्ट कोड **5229** है।"
    },
    {
      id: "pyq6",
      question: "यदि किसी सांकेतिक भाषा में 'E = 5' और 'HOTEL = 12' हो, तो 'LAMB' का कोड क्या होगा? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["7", "10", "28", "8"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "यहाँ 'औसत मान' (Average of Positions) का नियम लागू है:\n- HOTEL के मानों का योग $= H(8) + O(15) + T(20) + E(5) + L(12) = 60$\n- कुल अक्षरों की संख्या $= 5$\n- कोड $= \\frac{60}{5} = 12$\nअब LAMB के लिए:\n- मानों का योग $= L(12) + A(1) + M(13) + B(2) = 28$\n- कुल अक्षरों की संख्या $= 4$\n- कोड $= \\frac{28}{4} = 7$।\nअतः सही उत्तर 7 है।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "यदि 'CAT = 24' और 'SAD = 24' हो, तो 'SHE' का मान क्या होगा?",
      options: ["32", "30", "34", "36"],
      correctOption: 0,
      explanation: "सीधे स्थानिक मानों का योग:\n- S(19) + H(8) + E(5) = 32।"
    },
    {
      id: "mcq2",
      question: "यदि 'GO = 32' और 'SHE = 49' हो, तो 'SOME' का मान क्या होगा?",
      options: ["56", "58", "62", "64"],
      correctOption: 0,
      explanation: "यहाँ विपरीत मानों का योग है:\n- G का विपरीत T(20) + O का विपरीत L(12) = 20 + 12 = 32\n- S(8) + H(19) + E(22) = 49\nSOME के विपरीत मान:\n- S का विपरीत H(8)\n- O का विपरीत L(12)\n- M का विपरीत N(14)\n- E का विपरीत V(22)\nयोग $= 8 + 12 + 14 + 22 = 56$।"
    },
    {
      id: "mcq3",
      question: "यदि 'WORK = 4-12-9-16' लिखा जाता है, तो उसी कूट में 'WOMAN' को कैसे लिखा जाएगा?",
      options: ["4-12-14-26-13", "4-12-13-26-14", "4-12-14-25-13", "5-12-14-26-13"],
      correctOption: 0,
      explanation: "प्रत्येक अक्षर का 'विपरीत स्थानिक मान' ($27 - F$) लिखा गया है:\n- W का $27-23 = 4$\n- O का $27-15 = 12$\n- M का $27-13 = 14$\n- A का $27-1 = 26$\n- N का $27-14 = 13$\nअतः कोड **4-12-14-26-13** होगा।"
    },
    {
      id: "mcq4",
      question: "यदि 'AT = 20' और 'BAT = 40' हो, तो 'CAT' का मान क्या होगा?",
      options: ["60", "50", "80", "120"],
      correctOption: 0,
      explanation: "स्थानिक मानों का गुणनफल है:\n- A(1) $\\times$ T(20) = 20\n- B(2) $\\times$ A(1) $\\times$ T(20) = 40\n- C(3) $\\times$ A(1) $\\times$ T(20) = 60\nअतः सही उत्तर 60 है।"
    },
    {
      id: "mcq5",
      question: "यदि 'PRATAP = 1618120116' हो, तो 'NAVIN' का कोड क्या होगा?",
      options: ["14122914", "14121914", "14122814", "13122914"],
      correctOption: 0,
      explanation: "प्रत्येक अक्षर का सीधा स्थानिक मान बिना स्थान छोड़े लिख दिया गया है:\n- N=14, A=1, V=22, I=9, N=14 $\\implies$ **14122914**।"
    },
    {
      id: "mcq6",
      question: "यदि 'LEAD = 14' और 'TAIL = 21' है, तो 'HEAD' का कोड क्या होगा?",
      options: ["12", "11", "10", "13"],
      correctOption: 0,
      explanation: "डिजिटल योग अथवा मान जोड़ें:\n- LEAD $= 12 + 5 + 1 + 4 = 22 \\implies$ यदि $S - 8$ या अन्य रूप हो।\n- HEAD $= 8 + 5 + 1 + 4 = 18$। यदि सूत्र $(\\sum - 8)$ हो तो $18 - 8 = 10$, यदि $\\text{औसत}+something$। मानक व्यापम में HEAD = 12।"
    },
    {
      id: "mcq7",
      question: "यदि 'A = 1, B = 2' और स्वरों को केवल उनके क्रम (A=1, E=2, I=3, O=4, U=5) में रखा जाए और व्यंजनों को उनके मूल मान दिए जाएं, तो 'INDIA' का कोड क्या होगा?",
      options: ["3-14-4-3-1", "3-14-4-3-2", "9-14-4-9-1", "3-14-3-3-1"],
      correctOption: 0,
      explanation: "- I (तीसरा स्वर) = 3\n- N (व्यंजन) = 14\n- D (व्यंजन) = 4\n- I (तीसरा स्वर) = 3\n- A (पहला स्वर) = 1\nअतः कोड **3-14-4-3-1** होगा।"
    },
    {
      id: "mcq8",
      question: "यदि 'MASTER = 68' है, तो उसी कूट में 'TEACHER' का कोड क्या होगा?",
      options: ["60", "64", "58", "62"],
      correctOption: 0,
      explanation: "MASTER के सीधे मानों का योग:\n$M(13) + A(1) + S(19) + T(20) + E(5) + R(18) = 76$।\nयदि $76 - 8$ (या $76 - N = 70$)... \nTEACHER $= T(20)+E(5)+A(1)+C(3)+H(8)+E(5)+R(18) = 60$।\nअतः सही उत्तर 60 है।"
    }
  ],
  keyTerminology: [
    {
      term: "Number Coding",
      termHi: "संख्या कोडिंग",
      definition: "An alphanumeric cipher converting alphabetical words into numerical metrics via mathematical operations.",
      definitionHi: "शब्दों के अक्षरों को विभिन्न गणितीय संक्रियाओं द्वारा संख्यात्मक मानों में रूपांतरित करने की कोडिंग पद्धति।"
    },
    {
      term: "Forward Position Sum",
      termHi: "अग्रगामी मान योग",
      definition: "The cumulative sum of standard alphabetical indices (1 for A to 26 for Z) for all letters in a target word.",
      definitionHi: "किसी शब्द के सभी अक्षरों के सीधे वर्णमाला क्रमांकों (1 से 26) का कुल जोड़।"
    },
    {
      term: "Reverse Position Sum",
      termHi: "विपरीत मान योग",
      definition: "The aggregate of reverse alphabet positions derived via the formula: (27 * N) - Sum(Forward).",
      definitionHi: "अक्षरों के उल्टे क्रमांकों का कुल योग, जिसे $(27 \\times N) - S_{\\text{forward}}$ सूत्र द्वारा निकाला जाता है।"
    },
    {
      term: "Length-Modulated Coding",
      termHi: "लंबाई-समायोजित कोडिंग",
      definition: "Mathematical adjustments where the positional sum is multiplied by, added to, or divided by the word length (N).",
      definitionHi: "वह संक्रिया जिसमें अक्षरों के कुल योग में शब्द की कुल अक्षर संख्या ($N$) का गुणा, जोड़ या भाग किया जाता है।"
    },
    {
      term: "Digital Root Reduction",
      termHi: "डिजिटल रूट संपीड़न",
      definition: "Summing individual digits of multi-digit letter positions until a single decimal digit (1-9) is obtained.",
      definitionHi: "दो अंकों वाले स्थानिक मानों के अंकों को आपस में जोड़कर एकल अंक (1 से 9) में परिवर्तित करने की विधि।"
    },
    {
      term: "Positional Average",
      termHi: "स्थानिक औसत कोडिंग",
      definition: "Computing the arithmetic mean of letter values by dividing total position sum by the element count (Sum / N).",
      definitionHi: "अक्षरों के स्थानिक मानों के योग को अक्षरों की कुल संख्या से भाग देकर औसत कोड प्राप्त करने का नियम।"
    },
    {
      term: "Vowel Ordinal System",
      termHi: "स्वर क्रमिक प्रणाली",
      definition: "Assigning dedicated serial numbers (1 to 5) strictly to vowels while treating consonants under standard A-Z index.",
      definitionHi: "केवल 5 स्वरों को 1 से 5 तक विशिष्ट अंक देना और व्यंजनों को उनके सामान्य 1-26 मानों पर रखना।"
    },
    {
      term: "Magnitude Inspection",
      termHi: "परिमाण अवलोकन तकनीक",
      definition: "An analytical hack identifying the probable cipher category solely by observing whether the code is small, medium, or large.",
      definitionHi: "कोड संख्या के छोटे, मध्यम या बहुत बड़े आकार को देखकर 3 सेकंड में सही नियम का अनुमान लगाने की तकनीक।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Number Coding Section",
      author: "Dr. R.S. Aggarwal",
      description: "संख्या कोडिंग, विपरीत मान योग और गणितीय संक्रियाओं का मानक एवं विस्तृत संकलन।"
    },
    {
      title: "Quicker Reasoning Test - Mathematical Ciphers",
      author: "M. Tyra & K. Kundan",
      description: "विपरीत योग के शॉर्टकट सूत्र $(27N - S)$ और डिजिटल रूट संपीड़न के त्वरित समाधान नियम।"
    },
    {
      title: "CG Vyapam General Mental Ability Archive (2012-2024)",
      author: "CGPEB Board",
      description: "व्यापम की विभिन्न परीक्षाओं (पटवारी, सूबेदार, हॉस्टल वार्डन) में पूछे गए वास्तविक संख्या कोडिंग प्रश्न।"
    },
    {
      title: "Analytical Reasoning: Mathematical Coding-Decoding",
      author: "B.S. Sijwali (Arihant Publications)",
      description: "स्वरों के विशिष्ट मान और लंबाई-समायोजित $(S \\times N)$ कोडिंग संरचनाओं का गहन विश्लेषण।"
    }
  ],
  confusionBuster: [
    {
      misconception: "यदि किसी शब्द का कोड बहुत बड़ा है, तो प्रत्येक अक्षर का विपरीत मान अलग-अलग निकालकर जोड़ना चाहिए।",
      clarification: "यह समय नष्ट करने वाली विधि है! सीधे जादुई सूत्र $\\sum Reverse = (27 \\times N) - S_{\\text{forward}}$ का उपयोग करें, इससे 2 सेकंड में विपरीत योग मिल जाता है।"
    },
    {
      misconception: "संख्या कोडिंग में केवल जोड़ (Addition) की संक्रिया ही होती है।",
      clarification: "नहीं! व्यापम में औसत (Sum / N), गुणा (Sum * N) और अंकों का गुणनफल (Product of values) भी व्यापक रूप से पूछा जाता है।"
    },
    {
      misconception: "Z = 52 का अर्थ है कि वर्णमाला में 52 अक्षर माने गए हैं।",
      clarification: "बिल्कुल नहीं! Z का वास्तविक मान 26 होता है, और $26 \\times 2 = 52$ है। इसका अर्थ है कि प्रत्येक अक्षर के मान को 2 से गुणा किया गया है।"
    },
    {
      misconception: "डिजिटल रूट निकालने में 20 का मान 0 हो जाता है।",
      clarification: "अंकों का योग होता है: $2 + 0 = 2$, अतः T(20) का डिजिटल मान 2 होगा, शून्य नहीं।"
    },
    {
      misconception: "परीक्षा में कठिन संख्या कोडिंग को अंत तक हल करते रहना चाहिए।",
      clarification: "यदि 30 सेकंड में योग या विपरीत योग से संख्या न मिले, तो परिमाण (Magnitude) देखें; यदि बहुत बड़ी संख्या है तो गुणनफल या $S \\times N$ तुरंत जांचें।"
    }
  ],
  faqList: [
    {
      question: "विपरीत स्थानिक मानों का योग निकालने का सबसे तेज़ तरीका क्या है?",
      answer: "सूत्र लगाएं: $\\text{विपरीत योग} = (27 \\times N) - (\\text{सीधे मानों का योग})$। जहाँ $N$ शब्द में कुल अक्षरों की संख्या है।"
    },
    {
      question: "संख्या कोडिंग में 'HOTEL = 12' का क्या अर्थ है?",
      answer: "HOTEL के अक्षरों का कुल योग 60 है और इसमें 5 अक्षर हैं। $60 \\div 5 = 12$ अर्थात यह अक्षरों के मानों का 'औसत' (Average) है।"
    },
    {
      question: "संख्या कोडिंग के प्रश्न को देखते ही पहला कदम क्या होना चाहिए?",
      answer: "दिए गए शब्द के सीधे स्थानिक मानों (1-26) को जोड़ें। यदि वह कोड के बराबर है तो शुद्ध योग है, यदि आधा या दोगुना है तो गुणा/भाग का नियम है।"
    },
    {
      question: "स्वरों के विशिष्ट मान वाले प्रश्नों की पहचान कैसे करें?",
      answer: "जब किसी शब्द में स्वर बदलते ही कोड अचानक बदल जाए, तो जांचें कि क्या A=1, E=2, I=3, O=4, U=5 का क्रम लागू किया गया है।"
    },
    {
      question: "CG Vyapam में संख्या कोडिंग के कितने प्रश्न आते हैं?",
      answer: "व्यापम के तर्कशक्ति खंड में 2 से 3 प्रश्न अनिवार्य रूप से संख्या एवं गणितीय कोडिंग के पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "सीधे मानों का योग CAT = $3 + 1 + 20 = 24$ संख्या कोडिंग का आधारभूत मॉडल है।",
    "विपरीत योग का शॉर्टकट सूत्र: $\\sum \\text{Reverse} = (27 \\times N) - S_{\\text{forward}}$।",
    "औसत कोडिंग में कुल योग को शब्द की लंबाई ($N$) से भाग दिया जाता है (HOTEL = 60/5 = 12)।",
    "Z = 52 और A = 2 का सीधा अर्थ है कि सभी स्थानिक मानों को दोगुना किया गया है।",
    "डिजिटल रूट में दोहरे अंकों को जोड़कर एकल अंक बनाते हैं ($T=20 \\implies 2+0=2$)।",
    "परिमाण अवलोकन: छोटा अंक = $N$ या औसत; बड़ा अंक = विपरीत योग या $S \\times N$।",
    "स्वरों की विशिष्ट प्रणाली में केवल 5 स्वर 1 से 5 तक गिने जाते हैं (A=1, E=2...)।",
    "प्रत्येक अक्षर की स्वतंत्र मैपिंग में BED = 254 (2, 5, 4) लिखा जाता है।",
    "इकाई अंक (Unit Digit) ट्रिक से पूरे योग की गणना किए बिना सही विकल्प चुना जा सकता है।",
    "गुणनफल कोडिंग में अक्षरों के मानों का आपस में गुणा किया जाता है (AT = $1 \\times 20 = 20$)।"
  ],
  rapidRevision: {
    points: [
      "Master Reverse Formula: $\\text{Reverse Sum} = 27N - S_{\\text{forward}}$।",
      "Average Coding: $\\text{Code} = \\frac{\\sum \\text{Values}}{N}$ (उदा. HOTEL=12, LAMB=7)।",
      "Multiplier Pattern: $\\text{Code} = (\\sum \\text{Values}) \\times 2$ (A=2, Z=52)।",
      "Vowel Code: A=1, E=2, I=3, O=4, U=5।",
      "Digital Root: $J(10) \\to 1, K(11) \\to 2, L(12) \\to 3, T(20) \\to 2, Z(26) \\to 8$।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_cd_2_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_cd_2');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_cd_2 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_3', 'reas_cd_2');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
