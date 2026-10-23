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

const reas_ser_2_data = {
  topicId: "reas_ser_2",
  topicName: "Alphabet Series",
  topicNameHi: "अक्षर श्रेणी",
  chapterId: "cgv_master_sub_4_ch_1",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "अक्षर श्रेणी (Alphabet Series) वर्णमाला के अक्षरों (A-Z) के निश्चित तार्किक क्रम, स्थानिक मान (Positional Values) एवं वर्ण-अंतरालों (Letter Gaps) पर आधारित एक महत्वपूर्ण तार्किक अध्याय है। इसमें एक या एकाधिक अक्षरों के समूह (Letter Clusters) एक विशिष्ट नियम के अनुसार व्यवस्थित होते हैं। अभ्यर्थी को वर्णमाला में अक्षरों की बाएं से दाएं (Left to Right: A=1, B=2...) एवं दाएं से बाएं (Reverse/Opposite: Z=1, Y=2...) स्थितियों का विश्लेषण करके लुप्त अक्षर या पद ज्ञात करना होता है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, डाटा एंट्री ऑपरेटर) तथा CGPSC CSAT में अक्षर श्रेणी और सतत अक्षर पैटर्न (Continuous Pattern Series) से 2 से 3 प्रश्न नियमित रूप से पूछे जाते हैं। यह टॉपिक वर्बल रीजनिंग के अन्य अध्यायों जैसे कोडिंग-डिकोडिंग और सादृश्यता की आधारशिला है।",
    examRelevance: "परीक्षाओं में एकल अक्षर श्रेणी (Single Letter), युग्म/त्रिक अक्षर समूह (Letter Clusters like BDF, CFI), विपरीत अक्षर युग्म (Opposite Letter Pairs - AZ, BY, CX), तथा चक्रीय वर्णमाला क्रम (Cyclic Order: Z के बाद पुनः A) के प्रश्न सर्वाधिक आते हैं। खाली स्थान भरने वाली सतत अक्षर श्रेणी (Repeating Pattern like ab_a_ba_b) में विकल्पों का परीक्षण निर्णायक होता है।",
    quickFacts: [
      "EJOTY नियम: वर्णमाला में 5 के गुणक पदों को याद रखने का सूत्र: E=5, J=10, O=15, T=20, Y=25।",
      "CFILORUX नियम: वर्णमाला में 3 के गुणक पदों को याद रखने का सूत्र: C=3, F=6, I=9, L=12, O=15, R=18, U=21, X=24।",
      "विपरीत अक्षरों का योग हमेशा 27 होता है: $Pos(Forward) + Pos(Reverse) = 27$ (उदा. A(1) + Z(26) = 27, M(13) + N(14) = 27)।",
      "विपरीत अक्षर याद रखने के स्मरणीय शब्द (Mnemonics): AZ (Azad), BY (Boy), CX (Crux), DW (Dew), EV (EVening), FU (Full/Fun), GT (GT Road), HS (High School), IR (Indian Railway), JQ (Jungle Queen), KP (Kurta Pyjama), LO (Love), MN (Man)।",
      "चक्रीय वर्णमाला (Cyclic Alphabet): Z (26) के बाद आगे बढ़ने पर $26 + 1 = 27 \\equiv A$, $26 + 2 = 28 \\equiv B$ होता है।"
    ]
  },
  chapters: [
    {
      id: "ch1_alphabet_positions",
      title: "अंग्रेजी वर्णमाला के स्थानिक मान एवं विपरीत अक्षर तंत्र (Positional Values & Opposite Letters)",
      content: `### 1. वर्णमाला की आधारभूत संरचना एवं स्थानिक मान

अक्षर श्रेणी के प्रश्नों को शीघ्रता से हल करने की कुंजी अक्षरों को तुरंत उनके संख्यात्मक मान में बदलना है।

#### सीधा क्रम (Forward Positional Values: 1 to 26):
| अक्षर | A | B | C | D | E | F | G | H | I | J | K | L | M |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| मान | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |

| अक्षर | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| मान | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 |

#### उल्टे क्रम का मान ज्ञात करने का सूत्र:
$$\\text{उलटा क्रमांक (Reverse Position)} = 27 - \\text{सीधा क्रमांक (Forward Position)}$$
- उदाहरण: T का सीधा मान 20 है, तो उल्टे क्रम से T का मान $= 27 - 20 = 7$ (अर्थात G का स्थान)।

#### विपरीत अक्षर युग्म (Opposite Letter Pairs):
- **A-Z** (Azad)
- **B-Y** (Boy)
- **C-X** (Crux / Crackers)
- **D-W** (Dew / Door Window)
- **E-V** (EVening / Love)
- **F-U** (Full / Fast & Furious)
- **G-T** (GT Road)
- **H-S** (High School)
- **I-R** (Indian Railway)
- **J-Q** (Jungle Queen / Jack Queen)
- **K-P** (Kurta Pyjama / Kanpur)
- **L-O** (Love / Light On)
- **M-N** (Man / Morning Night)`
    },
    {
      id: "ch2_single_letter_series",
      title: "एकल एवं बहु-अक्षर समूह श्रेणी (Single & Multi-Letter Series)",
      content: `### 2. एकल एवं बहु-अक्षर समूह श्रेणी का समाधान

#### 1. एकल अक्षर श्रेणी (Single Letter Series):
एकल अक्षरों की श्रेणी में सीधे उनके संख्यात्मक मान लिखकर अंतर का विश्लेषण किया जाता है।
- उदाहरण: A, C, F, J, O, ?
- संख्यात्मक मान: $1, 3, 6, 10, 15, ?$
- अंतर: $+2, +3, +4, +5$
- अगला अंतर $= +6$
- मान $= 15 + 6 = 21 \\implies$ U।

#### 2. बहु-अक्षर समूह श्रेणी (Multi-Letter Series / Letter Clusters):
जब पदों में 2, 3 या 4 अक्षरों के समूह (उदा. ABC, DEF) दिए हों, तो **प्रत्येक पद के पहले अक्षर का संबंध अगले पद के पहले अक्षर से**, दूसरे का दूसरे से और तीसरे का तीसरे से स्वतंत्र रूप से जांचा जाता है।
- उदाहरण: BDF, CFI, DHL, ?
  - पहला अक्षर: B(2), C(3), D(4) $\\implies$ अगला E(5)
  - दूसरा अक्षर: D(4), F(6), H(8) $\\implies$ अगला J(10)
  - तीसरा अक्षर: F(6), I(9), L(12) $\\implies$ अगला O(15)
  - अतः उत्तर = **EJO**।`
    },
    {
      id: "ch3_continuous_repeating_series",
      title: "सतत अक्षर श्रृंखला / पैटर्न पुनरावृत्ति (Continuous Pattern Series)",
      content: `### 3. सतत अक्षर श्रेणी (Repeating / Continuous Series) हल करने की 'ग्रुपिंग' तकनीक

इस प्रकार के प्रश्नों में अक्षरों का एक लंबा क्रम दिया होता है जिसमें बीच-बीच में रिक्त स्थान होते हैं (उदा. a_bc_a_bc_)।

#### चरणबद्ध समाधान विधि:
1. **कुल तत्वों की गणना (Count Total Elements):**
   - दिए गए अक्षरों और सभी रिक्त स्थानों (Blanks) को मिलाकर कुल पदों की संख्या गिनें।
   - मान लीजिए कुल पद $N$ हैं।

2. **समान समूहों में विभाजन (Divide into Equal Groups):**
   - यदि कुल पद 12 हैं $\\implies 3 \\times 4$ या $4 \\times 3$ के समूह बनाएं।
   - यदि कुल पद 15 हैं $\\implies 3 \\times 5$ या $5 \\times 3$ के समूह बनाएं।
   - यदि कुल पद 16 हैं $\\implies 4 \\times 4$ के 4 समूह बनाएं।
   - यदि कुल पद 18 हैं $\\implies 6 \\times 3$ या $3 \\times 6$ के समूह बनाएं।
   - यदि कुल पद 20 हैं $\\implies 4 \\times 5$ या $5 \\times 4$ के समूह बनाएं।

3. **पैटर्न का मिलान (Symmetry & Homogeneity):**
   - **समान आवर्ती (Repetitive):** प्रत्येक समूह बिल्कुल समान होता है (उदा. abc | abc | abc | abc)।
   - **चक्रीय आवर्ती (Cyclic):** abc | bca | cab | abc।
   - **क्रमिक वर्धमान (Increasing Pattern):** a | ab | abc | abcd अथवा aa | bbb | cccc।`
    },
    {
      id: "ch4_opposite_cyclic_patterns",
      title: "विपरीत एवं चक्रीय अक्षर पैटर्न (Opposite & Cyclic Letter Patterns)",
      content: `### 4. विपरीत एवं चक्रीय अक्षर श्रेणियों के विशिष्ट नियम

#### 1. विपरीत अक्षर आधारित अनुक्रम (Opposite Letter Series):
- श्रेणी: AZ, BY, CX, DW, ?
- विश्लेषण:
  - पहला अक्षर: A, B, C, D $\\implies$ अगला E
  - दूसरा अक्षर: Z, Y, X, W $\\implies$ अगला V
  - उत्तर = **EV**।
- जटिल विपरीत संबंध:
  - पद 1: GT, पद 2: IR, पद 3: KP, पद 4: ?
  - G(7) + 2 = I(9), I(9) + 2 = K(11), K(11) + 2 = M(13)
  - M का विपरीत अक्षर N होता है $\\implies$ उत्तर = **MN**।

#### 2. चक्रीय वर्णमाला क्रम (Modular Arithmetic in Alphabets):
जब अंतर जोड़ने पर मान 26 से अधिक हो जाए, तो उसमें से 26 घटाएं:
- $W(23) + 5 = 28 \\implies 28 - 26 = 2 \\implies B$
जब अंतर घटाने पर मान 0 या ऋणात्मक हो जाए, तो उसमें 26 जोड़ें:
- $C(3) - 5 = -2 \\implies -2 + 26 = 24 \\implies X$`
    },
    {
      id: "ch5_vyapam_model_questions",
      title: "व्यापम मॉडल एवं समय बचत शॉर्टकट (Exam Hacks & Model Analysis)",
      content: `### 5. अक्षर श्रेणी के लिए त्वरित शॉर्टकट एवं गलतियों से बचाव

1. **अंतिम अक्षर से उन्मूलन (Last Letter Elimination):**
   - बहु-अक्षर समूह (जैसे 4-अक्षरीय समूह) के प्रश्नों में पहले सभी विकल्पों के अंतिम अक्षर का अवलोकन करें।
   - यदि सभी विकल्पों में अंतिम अक्षर भिन्न-भिन्न हों, तो केवल अंतिम अक्षर का पैटर्न ज्ञात करके 5 सेकंड में सही विकल्प चुना जा सकता है; पूरे 4 अक्षरों को हल करने की आवश्यकता नहीं होती।

2. **सतत श्रेणी में विषम संख्या वाले पद:**
   - यदि कुल पद 17 या 19 जैसी अभाज्य संख्या हों, तो प्रायः अंतिम 1 या 2 पद अधूरे समूह के रूप में छूटते हैं।
   - उदाहरण: 17 पद = $(4 \\times 4) + 1$ शेष पद।

3. **स्वभाव एवं एकाग्रता:**
   - परीक्षा कक्ष में रफ शीट पर तुरंत A से Z तक वर्णमाला लिखकर उन पर 1 से 26 और विपरीत अक्षर न लिखें, बल्कि **EJOTY** (5, 10, 15, 20, 25) के संदर्भ से मानसिक गणना करें। इससे 1-2 मिनट का अमूल्य समय बचता है।`
    }
  ],
  comparativeTables: [
    {
      title: "वर्णमाला स्मरण नियम: EJOTY बनाम CFILORUX",
      headers: ["मापदंड", "EJOTY नियम", "CFILORUX नियम"],
      rows: [
        { cells: ["गुणक (Multiple)", "5 का गुणक", "3 का गुणक"] },
        { cells: ["सम्मिलित अक्षर", "E(5), J(10), O(15), T(20), Y(25)", "C(3), F(6), I(9), L(12), O(15), R(18), U(21), X(24)"] },
        { cells: ["कुल एंकर बिंदु", "5 प्रमुख अक्षर", "8 प्रमुख अक्षर"] },
        { cells: ["उपयोगिता", "तीव्र एवं सामान्य मानसिक अनुमान हेतु", "अत्यंत निकटवर्ती अक्षरों की सटीक गणना हेतु"] }
      ]
    },
    {
      title: "सतत अक्षर श्रेणी (Continuous Series) के विभाजन प्रारूप",
      headers: ["कुल वर्ण + रिक्त स्थान", "संभावित समूह विभाजन", "पैटर्न का प्रकार", "उदाहरण संरचना"],
      rows: [
        { cells: ["12 पद", "3 के 4 समूह या 4 के 3 समूह", "स्थिर आवर्ती या चक्रीय", "abc | abc | abc | abc"] },
        { cells: ["15 पद", "3 के 5 समूह या 5 के 3 समूह", "स्थिर आवर्ती", "ab_c_ | ab_c_ | ab_c_"] },
        { cells: ["16 पद", "4 के 4 समूह (अत्यंत सामान्य)", "सममित आवर्ती", "abcd | abcd | abcd | abcd"] },
        { cells: ["18 पद", "6 के 3 समूह या 3 के 6 समूह", "एकांतर या चक्रीय", "abc_de | abc_de | abc_de"] },
        { cells: ["20 पद", "4 के 5 समूह या 5 के 4 समूह", "जटिल आवर्ती", "abcde | abcde | abcde | abcde"] }
      ]
    },
    {
      title: "सीधे मान एवं उल्टे मान (Forward vs Reverse Values) का संतुलन",
      headers: ["अक्षर", "सीधा मान (Forward)", "उलटा मान (Reverse)", "योग ($F + R = 27$)", "विपरीत अक्षर ट्रिक"],
      rows: [
        { cells: ["A", "1", "26", "27", "Azad (A-Z)"] },
        { cells: ["B", "2", "25", "27", "Boy (B-Y)"] },
        { cells: ["G", "7", "20", "27", "GT Road (G-T)"] },
        { cells: ["H", "8", "19", "27", "High School (H-S)"] },
        { cells: ["M", "13", "14", "27", "Man (M-N)"] },
        { cells: ["P", "16", "11", "27", "Kanpur (K-P)"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "दी गई अक्षर श्रेणी में अगला पद क्या होगा? B, D, G, K, P, ? [CG Vyapam Subedar / SI Prelims]",
      options: ["U", "V", "W", "T"],
      correctOption: 1,
      examName: "CG Vyapam SI",
      explanation: "अक्षरों के संख्यात्मक मान लिखें:\n- B = 2\n- D = 4 (+2)\n- G = 7 (+3)\n- K = 11 (+4)\n- P = 16 (+5)\nअगला अंतर $+6$ होगा:\n$16 + 6 = 22$\n22वां अक्षर **V** होता है।\nअतः सही उत्तर V है।"
    },
    {
      id: "pyq2",
      question: "निम्नलिखित श्रृंखला में लुप्त पद ज्ञात कीजिए: WFB, TGD, QHG, ? [CG Vyapam Patwari]",
      options: ["NIL", "NIK", "NJK", "OIK"],
      correctOption: 1,
      examName: "CG Vyapam Patwari",
      explanation: "प्रत्येक पद के संबंधित अक्षरों का विश्लेषण करें:\n- पहला अक्षर: W(23) $\\to$ T(20) $\\to$ Q(17) ($-3$ की कमी) $\\implies 17 - 3 = 14$ (N)\n- दूसरा अक्षर: F(6) $\\to$ G(7) $\\to$ H(8) ($+1$ की वृद्धि) $\\implies 8 + 1 = 9$ (I)\n- तीसरा अक्षर: B(2) $\\to$ D(4) $\\to$ G(7) ($+2, +3$) $\\implies 7 + 4 = 11$ (K)\nअतः लुप्त पद **NIK** है।"
    },
    {
      id: "pyq3",
      question: "दी गई सतत श्रृंखला में रिक्त स्थानों की पूर्ति करें: _ b a _ b _ b _ a _ b [CGPSC CSAT]",
      options: ["b b a b b", "a a b b a", "b a a b a", "a b b a b"],
      correctOption: 2,
      examName: "CGPSC CSAT",
      explanation: "कुल पदों की संख्या गिनते हैं:\nअक्षर + रिक्त स्थान $= 11$ या 12 पद।\nयहाँ कुल 12 पद हैं: `_ b a _ | b _ b _ | a _ b _`\nजांचने पर पैटर्न `b b a b / b b a b / b b a b` बनता है।\n- प्रथम रिक्त स्थान = b\n- दूसरा = a\n- तीसरा = a\n- चौथा = b\n- पाँचवाँ = a\nअतः रिक्त स्थान `b a a b a` भरे जाएंगे।"
    },
    {
      id: "pyq4",
      question: "दी गई श्रृंखला में अगला पद ज्ञात कीजिए: AZ, CX, EV, GT, ? [CG Vyapam Hostel Warden]",
      options: ["IR", "IS", "HS", "JQ"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "यहाँ दो नियम एक साथ कार्य कर रहे हैं:\n1. पहला अक्षर: A(1), C(3), E(5), G(7) ($+2$ की वृद्धि) $\\implies$ अगला 9वां अक्षर = I।\n2. दूसरा अक्षर: प्रत्येक अक्षर अपने युग्म का विपरीत अक्षर (Opposite) है:\n- A का Z, C का X, E का V, G का T\nअतः I का विपरीत अक्षर R (Indian Railway) होगा।\nसही उत्तर = **IR**।"
    },
    {
      id: "pyq5",
      question: "निम्नलिखित अक्षर श्रृंखला में '?' के स्थान पर क्या आएगा? Z, X, V, T, R, ? [CG Vyapam संयुक्त भर्ती (DEO)]",
      options: ["P", "O", "Q", "N"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "यह उल्टे क्रम में सम अक्षरों की श्रृंखला है ($-2$ का नियम):\n- Z(26) - 2 = X(24)\n- X(24) - 2 = V(22)\n- V(22) - 2 = T(20)\n- T(20) - 2 = R(18)\n- अगला पद $= 18 - 2 = 16 \\implies$ **P**।"
    },
    {
      id: "pyq6",
      question: "दी गई श्रृंखला में असंगत (गलत) पद ज्ञात कीजिए: D, H, L, P, T, X, B, E [CG Vyapam Revenue Inspector]",
      options: ["X", "B", "E", "T"],
      correctOption: 2,
      examName: "CG Vyapam RI",
      explanation: "पैटर्न में प्रत्येक पद में $+4$ की वृद्धि हो रही है:\n- D(4) + 4 = H(8)\n- H(8) + 4 = L(12)\n- L(12) + 4 = P(16)\n- P(16) + 4 = T(20)\n- T(20) + 4 = X(24)\n- X(24) + 4 = 28 $\\implies 28 - 26 = 2$ (B)\n- B(2) + 4 = 6 (F होना चाहिए, परंतु यहाँ E दिया गया है)\nअतः गलत पद **E** है।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "दी गई श्रृंखला में अगला पद क्या होगा? AC, EG, IK, MO, ?",
      options: ["QS", "PR", "QR", "PS"],
      correctOption: 0,
      explanation: "विश्लेषण:\n- प्रथम अक्षर: A(1) $\\to$ E(5) $\\to$ I(9) $\\to$ M(13) ($+4$) $\\implies 13 + 4 = 17$ (Q)\n- द्वितीय अक्षर: C(3) $\\to$ G(7) $\\to$ K(11) $\\to$ O(15) ($+4$) $\\implies 15 + 4 = 19$ (S)\nअतः सही उत्तर **QS** है।"
    },
    {
      id: "mcq2",
      question: "श्रृंखला a_c_ba_ca_cb में रिक्त स्थानों पर कौन से अक्षर आएंगे?",
      options: ["a b c c", "b a b c", "b c a a", "b c b a"],
      correctOption: 1,
      explanation: "कुल अक्षरों की संख्या $= 12$।\nइसे $3 \\times 4$ में विभाजित करें: `a b c | c b a | a c b | a c b` नहीं बनता।\nअब $4 \\times 3$ में देखें: `a b c b | a b c b | a c b ?`\nसुसंगत आवर्ती समूह: `a b c b`\nरिक्त स्थान पर क्रमशः b, a, b, c आएंगे।"
    },
    {
      id: "mcq3",
      question: "दी गई श्रेणी में अगला पद ज्ञात कीजिए: Y, W, U, S, Q, ?",
      options: ["P", "O", "N", "M"],
      correctOption: 1,
      explanation: "स्थानिक मान: 25, 23, 21, 19, 17, ?\nप्रत्येक पद में 2 घट रहा है: $17 - 2 = 15$।\n15वां अक्षर **O** होता है।"
    },
    {
      id: "mcq4",
      question: "श्रृंखला में लुप्त पद ज्ञात कीजिए: AB, DEF, HIJK, ?, STUVWX",
      options: ["MNOPQ", "LMNOP", "NOPQR", "KLMNO"],
      correctOption: 0,
      explanation: "पदों में अक्षरों की संख्या निरंतर 1 बढ़ रही है:\n- AB (2 अक्षर) $\\to$ C छूटा (1 अक्षर)\n- DEF (3 अक्षर) $\\to$ G छूटा (1 अक्षर)\n- HIJK (4 अक्षर) $\\to$ L छूटेगा (1 अक्षर)\n- अगला पद 5 अक्षरों का होगा: **MNOPQ**\n- इसके बाद R छूटेगा $\\to$ STUVWX (6 अक्षर)।"
    },
    {
      id: "mcq5",
      question: "दी गई श्रृंखला में अगला पद क्या होगा? B2E, D5H, F12K, H27N, ?",
      options: ["J58Q", "J56Q", "I58P", "J58P"],
      correctOption: 0,
      explanation: "तीन घटक हैं:\n1. पहला अक्षर: B(2), D(4), F(6), H(8) $\\implies$ J(10)\n2. संख्या: $2 \\times 2 + 1 = 5, 5 \\times 2 + 2 = 12, 12 \\times 2 + 3 = 27, 27 \\times 2 + 4 = 58$\n3. दूसरा अक्षर: E(5), H(8), K(11), N(14) ($+3$) $\\implies$ Q(17)\nअतः उत्तर **J58Q** है।"
    },
    {
      id: "mcq6",
      question: "चक्रीय श्रृंखला में अगला पद क्या होगा? U, X, A, D, G, ?",
      options: ["I", "J", "K", "H"],
      correctOption: 1,
      explanation: "पैटर्न $+3$ का है:\n- U(21) + 3 = X(24)\n- X(24) + 3 = 27 $\\implies 27 - 26 = 1$ (A)\n- A(1) + 3 = D(4)\n- D(4) + 3 = G(7)\n- G(7) + 3 = 10 $\\implies$ **J**।"
    },
    {
      id: "mcq7",
      question: "दी गई श्रृंखला a b _ a a b _ a a _ b a _ a b a में लुप्त अक्षर क्या हैं?",
      options: ["a b a a", "b a a b", "a b b a", "b b a a"],
      correctOption: 1,
      explanation: "कुल पदों की संख्या $= 16$।\n$4 \\times 4$ के चार समूह बनाएं:\n`a b b a | a b b a | a b b a | a b b a`\nपहला रिक्त स्थान = b, दूसरा = a, तीसरा = a, चौथा = b\nअतः सही उत्तर `b a a b` है।"
    },
    {
      id: "mcq8",
      question: "श्रृंखला में '?' के स्थान पर क्या आएगा? PMT, OOS, NQR, MSQ, ?",
      options: ["LUP", "LVO", "KUP", "LVP"],
      correctOption: 0,
      explanation: "विश्लेषण:\n- 1st अक्षर: P(16) $\\to$ O(15) $\\to$ N(14) $\\to$ M(13) $\\implies$ L(12)\n- 2nd अक्षर: M(13) $\\to$ O(15) $\\to$ Q(17) $\\to$ S(19) $\\implies$ U(21)\n- 3rd अक्षर: T(20) $\\to$ S(19) $\\to$ R(18) $\\to$ Q(17) $\\implies$ P(16)\nअतः उत्तर **LUP** है।"
    }
  ],
  keyTerminology: [
    {
      term: "Alphabet Series",
      termHi: "अक्षर श्रेणी",
      definition: "A logical sequence composed of English alphabet letters arranged according to set position or gap rules.",
      definitionHi: "अंग्रेजी वर्णमाला के अक्षरों का वह तार्किक क्रम जो निश्चित स्थानिक मान या अंतराल नियमों पर व्यवस्थित होता है।"
    },
    {
      term: "Positional Value",
      termHi: "स्थानिक मान / क्रमांक",
      definition: "The forward numerical index (1 to 26) assigned to each English alphabet letter from A to Z.",
      definitionHi: "वर्णमाला में A से Z तक प्रत्येक अक्षर को प्रदान किया गया सीधा संख्यात्मक क्रमांक (1 से 26)।"
    },
    {
      term: "Opposite Letters",
      termHi: "विपरीत अक्षर युग्म",
      definition: "A pair of letters whose forward positions from opposite ends sum up to exactly 27.",
      definitionHi: "दोनों सिरों से समान दूरी पर स्थित अक्षरों का ऐसा युग्म जिनके स्थानिक मानों का योग सदैव 27 होता है।"
    },
    {
      term: "Continuous Pattern Series",
      termHi: "सतत अक्षर श्रृंखला",
      definition: "A repetitive letter sequence interspersed with blanks that must be deduced by group factorization.",
      definitionHi: "रिक्त स्थानों से युक्त अक्षरों की एक सतत पुनरावृत्त श्रृंखला जिसे गुणनखंड समूहीकरण द्वारा हल किया जाता है।"
    },
    {
      term: "Cyclic Alphabet Order",
      termHi: "चक्रीय वर्णमाला क्रम",
      definition: "The rotational convention where the letter sequence wraps around from Z back to A seamlessly.",
      definitionHi: "वह घूर्णन प्रणाली जिसमें Z (26) के उपरांत वर्णमाला पुनः A (27वें मान) से प्रारंभ होती है।"
    },
    {
      term: "EJOTY Rule",
      termHi: "EJOTY नियम",
      definition: "A memory mnemonic referencing letters at multiples of 5 (E=5, J=10, O=15, T=20, Y=25).",
      definitionHi: "5 के गुणक वाले अक्षरों (5, 10, 15, 20, 25) को त्वरित याद रखने का प्रसिद्ध स्मरण सूत्र।"
    },
    {
      term: "Letter Cluster",
      termHi: "अक्षर समूह",
      definition: "A composite unit of 2, 3, or more letters behaving as a single term in a multi-letter series.",
      definitionHi: "दो या अधिक अक्षरों का वह संयुक्त समूह जो बहु-अक्षर श्रेणी में एक स्वतंत्र पद के रूप में कार्य करता है।"
    },
    {
      term: "Skip Count Pattern",
      termHi: "अक्षर अंतराल नियम",
      definition: "A progression rule based on the increasing or decreasing number of omitted letters between terms.",
      definitionHi: "पदों के मध्य छोड़े गए अक्षरों की संख्या में क्रमिक वृद्धि या कमी पर आधारित अनुक्रम नियम।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Chapter: Alphabet Test & Series",
      author: "Dr. R.S. Aggarwal",
      description: "अक्षर श्रेणी, सतत पैटर्न और विपरीत अक्षरों का मानक एवं सर्वांगीण संदर्भ ग्रंथ।"
    },
    {
      title: "Analytical Reasoning - Letter Patterns Section",
      author: "M.K. Pandey",
      description: "सतत अक्षर श्रृंखला में समूहीकरण (Factorization Grouping) की तार्किक विधियों का संकलन।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की विभिन्न प्रतियोगी परीक्षाओं में विगत 10 वर्षों के पूछे गए प्रश्नों का संग्रह।"
    },
    {
      title: "Magical Book on Reasoning Ability",
      author: "K. Kundan",
      description: "विपरीत अक्षर याद रखने के स्मरणीय शब्द (Mnemonics) एवं 10-सेकंड समाधान युक्तियाँ।"
    }
  ],
  confusionBuster: [
    {
      misconception: "विपरीत अक्षर का मान निकालने के लिए 26 में से घटाया जाता है।",
      clarification: "यह सबसे बड़ी और घातक गलती है! विपरीत अक्षर का मान सदैव 27 में से घटाया जाता है ($27 - \\text{सीधा मान}$), क्योंकि दोनों सिरों के मानों का योग 27 होता है।"
    },
    {
      misconception: "सतत अक्षर श्रृंखला (Continuous Series) में हमेशा 3-3 के ही समूह बनते हैं।",
      clarification: "गलत! कुल पदों की संख्या (अक्षर + रिक्त स्थान) के आधार पर समूह बनते हैं। यदि 16 पद हैं, तो 4-4 के समूह बनेंगे। 15 पद होने पर 3 या 5 के समूह बनेंगे।"
    },
    {
      misconception: "बहु-अक्षर श्रेणी में पहले पद के सभी अक्षरों का आपस में संबंध खोजना चाहिए।",
      clarification: "नहीं! सामान्यतः पहले पद के पहले अक्षर का संबंध अगले पद के पहले अक्षर से, और दूसरे का दूसरे से होता है।"
    },
    {
      misconception: "Z के बाद वर्णमाला समाप्त हो जाती है और अगला अंतर नहीं निकाला जा सकता।",
      clarification: "वर्णमाला चक्रीय (Cyclic) होती है। Z(26) में 3 जोड़ने पर $29 \\implies 29 - 26 = 3 \\implies C$ प्राप्त होता है।"
    },
    {
      misconception: "परीक्षा हॉल में रफ शीट पर पूरी वर्णमाला लिखने से समय बचता है।",
      clarification: "रफ शीट पर लिखने में 1 से 2 मिनट का अमूल्य समय नष्ट होता है। EJOTY और CFILORUX से मानसिक रूप से मान सोचना कहीं अधिक तीव्र और पेशेवर तरीका है।"
    }
  ],
  faqList: [
    {
      question: "अंग्रेजी वर्णमाला में किसी अक्षर का विपरीत अक्षर कैसे ज्ञात करें?",
      answer: "दिए गए अक्षर के सीधे संख्यात्मक मान को 27 में से घटाएं। प्राप्त संख्या जिस अक्षर की होगी, वही उसका विपरीत अक्षर होगा।"
    },
    {
      question: "सतत अक्षर श्रृंखला (Missing Blanks) को हल करने का सबसे सटीक तरीका क्या है?",
      answer: "अक्षरों और रिक्त स्थानों को मिलाकर कुल पद गिनें, फिर उन्हें गुणनखंडों (Factors जैसे 12 के लिए 3x4 या 4x3) के आधार पर समान टुकड़ों में बांटकर आवर्ती पैटर्न देखें।"
    },
    {
      question: "EJOTY का उपयोग कैसे किया जाता है?",
      answer: "यदि आपको 'S' का मान चाहिए, तो T=20 याद रखें; S ठीक T से पहले आता है, अतः S=19। यदि 'G' चाहिए, तो E=5 याद रखें; E से दो आगे G है, अतः G=7।"
    },
    {
      question: "यदि श्रेणी में उल्टे क्रम से चलना हो तो क्या करें?",
      answer: "सीधे मानों में से क्रमिक रूप से घटाते जाएं। यदि मान 0 या ऋणात्मक हो जाए, तो उसमें 26 जोड़कर धनात्मक वर्ण ज्ञात करें।"
    },
    {
      question: "CG Vyapam में अक्षर श्रेणी के कितने प्रश्न पूछे जाते हैं?",
      answer: "प्रत्येक परीक्षा के मानसिक योग्यता खंड में अक्षर श्रेणी और सतत श्रृंखला से मिलाकर औसतन 2 से 3 प्रश्न अवश्य पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "विपरीत अक्षरों के स्थानिक मानों का योग सदैव 27 होता है ($F + R = 27$)।",
    "EJOTY सूत्र 5 के गुणकों को दर्शाता है: E=5, J=10, O=15, T=20, Y=25।",
    "सतत श्रृंखला में कुल पदों को गिनकर गुणनखंडों (Factors) में विभाजित करें।",
    "16 पदों की सतत श्रृंखला में सदैव 4-4 के 4 समूह बनते हैं।",
    "Z के बाद चक्रीय क्रम में $26 + 1 = 27 \\equiv A$ और $26 + 2 = 28 \\equiv B$ होता है।",
    "विपरीत युग्म स्मृति: GT (GT Road), HS (High School), IR (Indian Railway), MN (Man)।",
    "बहु-अक्षर श्रेणी में समान स्थान वाले अक्षरों के मध्य स्वतंत्र नियम खोजें।",
    "ऋणात्मक मान आने पर उसमें 26 जोड़कर वास्तविक अक्षर प्राप्त किया जाता है।",
    "CFILORUX 3 के गुणकों की श्रृंखला है (C=3, F=6, I=9...)।",
    "विकल्प उन्मूलन (Option Elimination) के लिए सबसे पहले अंतिम अक्षर का परीक्षण करें।"
  ],
  rapidRevision: {
    points: [
      "Opposite Sum Law: $\\text{Forward} + \\text{Reverse} = 27$।",
      "EJOTY Anchors: 5, 10, 15, 20, 25।",
      "Factor Grouping: 12 $\\to$ 3x4/4x3; 15 $\\to$ 3x5/5x3; 16 $\\to$ 4x4; 18 $\\to$ 6x3।",
      "Cyclic Modulo: $N > 26 \\implies N - 26$; $N \\le 0 \\implies N + 26$।",
      "Cluster Technique: प्रथम अक्षर से प्रथम, द्वितीय से द्वितीय का समानांतर विश्लेषण।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_ser_2_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_ser_2');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_ser_2 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_1', 'reas_ser_2');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
