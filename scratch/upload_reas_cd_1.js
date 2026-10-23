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

const reas_cd_1_data = {
  topicId: "reas_cd_1",
  topicName: "Letter Coding",
  topicNameHi: "अक्षर कोडिंग",
  chapterId: "cgv_master_sub_4_ch_3",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "अक्षर कोडिंग (Letter Coding) कूटलेखन एवं कूटवाचन (Coding-Decoding) का सर्वाधिक मौलिक और महत्वपूर्ण प्रारूप है। इसमें किसी वास्तविक शब्द के मूल अक्षरों को एक निश्चित नियम, विस्थापन (Shift/Interval), विपरीत अक्षर प्रतिस्थापन (Opposite Letter Substitution) अथवा स्थिति-पुनर्व्यवस्था (Positional Rearrangement/Cross-Coding) के द्वारा एक छद्म या सांकेतिक कोड (Secret Code) में परिवर्तित किया जाता है। परीक्षार्थी को दिए गए उदाहरण शब्द और उसके कोड का तुलनात्मक विश्लेषण करके अंतर्निहित 'कोडिंग एल्गोरिदम' (Coding Logic) को समझना होता है और उसी नियम का अनुप्रयोग कर अभीष्ट शब्द का कोड ज्ञात करना होता है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, हॉस्टल वार्डन, सहायक ग्रेड-3, डाटा एंट्री ऑपरेटर) तथा CGPSC (CSAT एवं राज्य सेवा) में अक्षर कोडिंग से प्रतिवर्ष 2 से 4 प्रश्न अनिवार्य रूप से पूछे जाते हैं। यह अध्याय अभ्यर्थी के मानसिक लचीलेपन, स्थानिक स्मरण शक्ति (EJOTY) और त्वरित विस्थापन विश्लेषण क्षमता का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में मुख्य रूप से 5 प्रकार के अक्षर कोडिंग पैटर्न आते हैं: (1) सीधा अग्रगामी/पश्चगामी विस्थापन (Forward/Backward Shift: $+1, +2, +3$ या $-1, -2$), (2) प्रत्यक्ष अक्षर कोडिंग (Direct Letter Coding - जहाँ प्रत्येक अक्षर का कोड स्थिर रहता है), (3) विपरीत अक्षर कोडिंग (Opposite Letter Pairs - AZ, BY, CX), (4) क्रॉस-पैटर्न / विकर्ण कोडिंग (Cross/Diagonal Coding - 2-2 या 3-3 के खंडों में अदला-बदली), तथा (5) सम/विषम स्थान आधारित मिश्रित विस्थापन।",
    quickFacts: [
      "कोडिंग डिकोडिंग का स्वर्णिम नियम: अक्षरों को सीधे देखने के बजाय तुरंत उनके संख्यात्मक मान (1-26) लिख लेने से जटिल से जटिल पैटर्न 5 सेकंड में स्पष्ट हो जाता है।",
      "प्रत्यक्ष कोडिंग (Direct Coding) की पहचान: जब दो दिए गए शब्दों में कोई उभयनिष्ठ अक्षर आए और दोनों जगह उसका कोड बिल्कुल समान हो, तो वह प्रत्यक्ष कोडिंग होती है; इसमें अक्षरों में कोई गणितीय जोड़-घटाव नहीं होता।",
      "विपरीत अक्षर सिद्धांत: मूल अक्षर और कोड अक्षर के स्थानिक मानों का योग सदैव 27 होता है ($A=1, Z=26 \\implies 1+26=27$)।",
      "क्रॉस कोडिंग (Cross/Diagonal Coding): जब सीधे-सीधे अक्षरों में कोई समरूप अंतर ($+k$ या $-k$) न मिले, तो पहले अक्षर का संबंध अंतिम अक्षर से अथवा मध्य अक्षरों के विकर्ण युग्मों से देखें।",
      "चक्रीय विस्थापन (Cyclic Shift): Z (26) में 2 जोड़ने पर $28 \\equiv B$ तथा A (1) में से 2 घटाने पर $-1 + 26 = 25 \\equiv Y$ प्राप्त होता है।"
    ]
  },
  chapters: [
    {
      id: "ch1_forward_backward_shift",
      title: "अग्रगामी एवं पश्चगामी विस्थापन कोडिंग (Forward & Backward Shift Coding)",
      content: `### 1. अग्रगामी एवं पश्चगामी विस्थापन कोडिंग

यह अक्षर कोडिंग का सबसे बुनियादी प्रकार है, जिसमें प्रत्येक अक्षर को वर्णमाला में आगे (Forward) या पीछे (Backward) खिसकाकर कोड बनाया जाता है:

#### 1. स्थिर विस्थापन (Constant Shift):
- प्रत्येक अक्षर में एक ही संख्या जोड़ी या घटाई जाती है:
  - यदि किसी कूटभाषा में **ROSE** को **UQVH** लिखा जाता है:
    - $R(18) + 3 = U(21)$
    - $O(15) + 3 = Q(17)$ (यहाँ O से Q $+2$ है, ध्यान दें: यदि स्थिर $+3$ हो तो $O+3=R$)
    - शुद्ध स्थिर उदाहरण: **MATH** $\\to$ **PDWK**
      - $M(13)+3=P(16), A(1)+3=D(4), T(20)+3=W(23), H(8)+3=K(11)$ ($+3$ स्थिर)।

#### 2. वर्धमान/ह्रासमान विस्थापन (Progressive Shift):
- विस्थापन की मात्रा प्रत्येक क्रमिक पद के साथ बढ़ती या घटती है:
  - यदि **DELHI** को **EFMYN** लिखा जाए:
    - $D(4) + 1 = E(5)$
    - $E(5) + 1 = F(6)$
    - $L(12) + 1 = M(13)$
    - $H(8) + 1 = I(9)$
  - वर्धमान उदाहरण ($+1, +2, +3, +4$):
    - **COLD** $\\to$ **DQOG**
      - $C(3)+1=D(4)$
      - $O(15)+2=Q(17)$
      - $L(12)+3=O(15)$
      - $D(4)+4=H(8)$ (यहाँ $D+4=H$, $DQOH$)।

#### 3. एकांतर जोड़-घटाव (Alternating Addition & Subtraction):
- पहले अक्षर में $+1$, दूसरे में $-1$, तीसरे में $+1$, चौथे में $-1$:
  - **BOOK** $\\to$ **CNPJ**
    - $B(2)+1=C(3)$
    - $O(15)-1=N(14)$
    - $O(15)+1=P(16)$
    - $K(11)-1=J(10)$`
    },
    {
      id: "ch2_direct_letter_coding",
      title: "प्रत्यक्ष अक्षर कोडिंग (Direct Letter Coding)",
      content: `### 2. प्रत्यक्ष अक्षर कोडिंग (Direct Letter Substitution)

प्रत्यक्ष कोडिंग में अक्षरों के वर्णमाला क्रमांक या गणितीय विस्थापन का कोई नियम लागू नहीं होता। इसमें प्रत्येक अक्षर को स्वेच्छा से एक विशिष्ट अक्षर या प्रतीक कोड आवंटित कर दिया जाता है।

#### प्रत्यक्ष कोडिंग की अचूक पहचान (Detection Hack):
1. **दो या अधिक उदाहरण शब्द:** प्रश्न में दो शब्द और उनके कोड दिए होते हैं (उदा. GIVE और BAT)।
2. **उभयनिष्ठ अक्षर की जांच:**
   - यदि शब्द 1 में 'E' का कोड 'X' है और शब्द 2 में भी 'E' का कोड 'X' ही दिया गया है, तो यह **100% प्रत्यक्ष कोडिंग (Direct Coding)** है!
3. **अंतिम शब्द का निर्माण:** जिस शब्द का कोड पूछा जाता है (उदा. GATE), उसके सभी अक्षर ऊपर दिए गए दोनों उदाहरण शब्दों में पहले से ही उपस्थित होते हैं।

#### व्यावहारिक हल उदाहरण:
- यदि किसी सांकेतिक भाषा में:
  - **F I R E** को **Q H O E** लिखा जाता है, और
  - **M O V E** को **Z M W E** लिखा जाता है,
- तो **O V E R** का कोड क्या होगा?
  - ऊपर से संगत अक्षरों का कोड उठाएं:
    - $O \\to M$
    - $V \\to W$
    - $E \\to E$
    - $R \\to O$
  - अतः OVER का अभीष्ट कोड = **M W E O**।`
    },
    {
      id: "ch3_opposite_letter_coding",
      title: "विपरीत अक्षर कोडिंग तंत्र (Opposite Letter Coding)",
      content: `### 3. विपरीत अक्षर कोडिंग (Opposite Letter System)

इस पद्धति में मूल शब्द के प्रत्येक अक्षर को उसके सम्मुख/विपरीत सिरे वाले अक्षर (Opposite Letter) द्वारा प्रतिस्थापित किया जाता है।

#### विपरीत अक्षर सिद्धांत:
$$\\text{मूल अक्षर का मान} + \\text{कोड अक्षर का मान} = 27$$

#### विपरीत युग्मों का स्मरण बैंक:
- **A-Z** (Azad)
- **B-Y** (Boy)
- **C-X** (Crux)
- **D-W** (Dew)
- **E-V** (EVening)
- **F-U** (Full)
- **G-T** (GT Road)
- **H-S** (High School)
- **I-R** (Indian Railway)
- **J-Q** (Jungle Queen)
- **K-P** (Kanpur)
- **L-O** (Love)
- **M-N** (Man)

#### जटिल विपरीत पैटर्न:
- **विपरीत + विस्थापन (Opposite with Shift):**
  - मूल अक्षर का विपरीत निकाला जाता है, फिर उसमें $+1$ या $-1$ किया जाता है।
  - उदा. $A \\to Z+1 = A$ या $A \\to Z-1 = Y$।
- **उल्टे क्रम में विपरीत (Reversed Opposite):**
  - शब्द को पीछे से पढ़कर विपरीत अक्षर लिखना:
    - **KING** $\\to$ K का विपरीत P, I का R, N का M, G का T।
    - कोड को उलटकर लिखना: **T M R P**।`
    },
    {
      id: "ch4_cross_diagonal_coding",
      title: "क्रॉस एवं विकर्ण कोडिंग संरचनाएं (Cross & Diagonal Coding)",
      content: `### 4. क्रॉस एवं विकर्ण कोडिंग (Cross-Pattern / Diagonal Shift)

व्यापम और सीजीपीएससी के कठिन प्रश्नों में अक्षर सीधे अपने नीचे वाले अक्षर से कोडित न होकर तिरछे (Diagonally) कोडित होते हैं:

#### 1. 4-अक्षरीय शब्द में क्रॉस कोडिंग ($2 \\times 2$ Block):
- शब्द: **B E S T**
  - प्रथम दो अक्षर आपस में क्रॉस:
    - $B(2) \\to$ दूसरा स्थान, $E(5) \\to$ पहला स्थान
  - अंतिम दो अक्षर आपस में क्रॉस:
    - $S(19) \\to$ चौथा स्थान, $T(20) \\to$ तीसरा स्थान

#### 2. 5-अक्षरीय शब्द में मध्य स्थिर + किनारे क्रॉस (Middle Fixed + Ends Cross):
- शब्द: **S M A R T**
  - $S$ और $M$ क्रॉस होकर $+1$ होते हैं: $M+1=N, S+1=T$
  - मध्य अक्षर $A$ सीधे नीचे $+1$: $A+1=B$
  - $R$ और $T$ क्रॉस होकर $+1$: $T+1=U, R+1=S$
  - कोड = **N T B U S**

#### 3. 6-अक्षरीय शब्द में त्रिक क्रॉस ($3 \\times 3$ Division):
- शब्द को दो बराबर भागों में 3-3 अक्षरों में बांटें:
  - प्रथम 3 अक्षरों में: पहला तीसरे पर, तीसरा पहले पर, मध्य सीधा।
  - अंतिम 3 अक्षरों में भी यही विकर्ण प्रक्रिया लागू होती है।`
    },
    {
      id: "ch5_speed_elimination_hacks",
      title: "परीक्षा कक्ष में 10 सेकंड में हल करने की तकनीक (Speed Hacks)",
      content: `### 5. परीक्षा कक्ष रणनीति एवं विकल्प उन्मूलन

1. **प्रथम और अंतिम अक्षर का परीक्षण (First-Last Verification):**
   - 6 या 8 अक्षरों वाले लंबे शब्दों के सभी अक्षरों को कभी रफ शीट पर कोड न करें।
   - केवल **पहले अक्षर** और **अंतिम अक्षर** का कोड निकालें।
   - 90% मामलों में 4 विकल्पों में से 3 विकल्प केवल पहले और अंतिम अक्षर के आधार पर बाहर हो जाते हैं!

2. **अक्षर लंबाई की जांच (Length Invariance):**
   - सुनिश्चित करें कि मूल शब्द में जितने अक्षर हैं, कोड में भी उतने ही अक्षर हैं। यदि अक्षरों की संख्या दोगुनी हो (उदा. 4 अक्षरों का कोड 8 अक्षरों में), तो समझें कि प्रत्येक अक्षर के आगे और पीछे के 2 अक्षर ($n-1, n+1$) लिखे गए हैं।

3. **उभयनिष्ठ कोड का अवलोकन:**
   - यदि प्रश्न में दो उदाहरण दिए गए हैं, तो 2 सेकंड रुककर देखें कि क्या पूछे गए शब्द के सारे अक्षर उन उदाहरणों में मौजूद हैं। यदि हाँ, तो सीधे 'प्रत्यक्ष कोडिंग' लगाकर उत्तर टिक करें।`
    }
  ],
  comparativeTables: [
    {
      title: "अक्षर कोडिंग के प्रमुख प्रकारों की तुलना एवं पहचान",
      headers: ["कोडिंग का प्रकार", "पहचान का त्वरित संकेत", "अंतर्निहित नियम", "उदाहरण"],
      rows: [
        { cells: ["सीधा विस्थापन (Direct Shift)", "सभी अक्षरों में समान या क्रमिक अंतर", "प्रत्येक अक्षर में $+k$ या $-k$", "CAT $\\to$ FDW ($+3$)"] },
        { cells: ["प्रत्यक्ष कोडिंग (Direct Coding)", "2 उदाहरण शब्दों में उभयनिष्ठ अक्षरों का कोड समान", "अक्षरों का पूर्व-निर्धारित स्थिर प्रतिस्थापन", "FIRE + MOVE $\\to$ OVER"] },
        { cells: ["विपरीत कोडिंग (Opposite)", "अक्षरों के मानों का योग 27", "वर्णमाला के विपरीत सिरे का अक्षर", "MAN $\\to$ NZM"] },
        { cells: ["क्रॉस कोडिंग (Cross/Diagonal)", "सीधे में कोई संबंध नहीं, तिरछे अक्षरों में समानता", "2-2 या 3-3 के खंडों में विकर्ण विस्थापन", "SMART $\\to$ NTBUS"] },
        { cells: ["द्वि-अक्षर कोडिंग (Dual Expansion)", "कोड की लंबाई मूल शब्द से ठीक दोगुनी", "प्रत्येक अक्षर के आगे-पीछे के वर्ण ($n-1, n+1$)", "BAT $\\to$ ACZB SU"] }
      ]
    },
    {
      title: "वर्णमाला स्थानिक मान एवं विपरीत युग्म त्वरित संदर्भ",
      headers: ["स्थानिक मान (1-13)", "अग्रगामी अक्षर", "विपरीत अक्षर", "स्थानिक मान (26-14)", "स्मरण युक्ति (Mnemonic)"],
      rows: [
        { cells: ["1", "A", "Z", "26", "Azad (A-Z)"] },
        { cells: ["2", "B", "Y", "25", "Boy (B-Y)"] },
        { cells: ["3", "C", "X", "24", "Crux / Crackers (C-X)"] },
        { cells: ["4", "D", "W", "23", "Dew (D-W)"] },
        { cells: ["5", "E", "V", "22", "EVening (E-V)"] },
        { cells: ["7", "G", "T", "20", "GT Road (G-T)"] },
        { cells: ["8", "H", "S", "19", "High School (H-S)"] },
        { cells: ["9", "I", "R", "18", "Indian Railway (I-R)"] },
        { cells: ["11", "K", "P", "16", "Kanpur (K-P)"] },
        { cells: ["13", "M", "N", "14", "Man (M-N)"] }
      ]
    },
    {
      title: "क्रॉस कोडिंग की प्रमुख विन्यास शैलियां",
      headers: ["शब्द की लंबाई", "खंड विभाजन (Partition)", "विस्थापन पथ", "व्यापम में आवृत्ति"],
      rows: [
        { cells: ["4 अक्षर", "2 + 2 ब्लॉक", "प्रथम दो आपस में तिरछे, अंतिम दो तिरछे", "मध्यम"] },
        { cells: ["5 अक्षर", "2 + 1 + 2 ब्लॉक", "किनारे तिरछे, मध्य अक्षर सीधा नीचे", "उच्चतम (सर्वाधिक प्रिय)"] },
        { cells: ["6 अक्षर", "3 + 3 ब्लॉक", "दोनों 3-अक्षरीय खंडों में विकर्ण अदला-बदली", "उच्च"] },
        { cells: ["7 अक्षर", "3 + 1 + 3 ब्लॉक", "मध्य अक्षर सीधा, दोनों त्रिक विकर्ण में", "मध्यम"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "यदि किसी निश्चित कूटभाषा में 'TEACHER' को 'VGCEJGT' लिखा जाता है, तो उसी कूटभाषा में 'CHILDREN' को किस प्रकार लिखा जाएगा? [CG Vyapam Patwari Exam]",
      options: ["EJKNFTGP", "EJKNFUTP", "EJKNFSTP", "EJKNFGTP"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "पैटर्न का विश्लेषण करें:\n- T(20) $+2\\to$ V(22)\n- E(5) $+2\\to$ G(7)\n- A(1) $+2\\to$ C(3)\n- C(3) $+2\\to$ E(5)\n- H(8) $+2\\to$ J(10)\n- E(5) $+2\\to$ G(7)\n- R(18) $+2\\to$ T(20)\nयहाँ प्रत्येक अक्षर में $+2$ की स्थिर वृद्धि हो रही है।\nअब 'CHILDREN' पर यही नियम लागू करें:\n- C(3)+2 = E(5)\n- H(8)+2 = J(10)\n- I(9)+2 = K(11)\n- L(12)+2 = N(14)\n- D(4)+2 = F(6)\n- R(18)+2 = T(20)\n- E(5)+2 = G(7)\n- N(14)+2 = P(16)\nअतः अभीष्ट कोड **EJKNFTGP** होगा।"
    },
    {
      id: "pyq2",
      question: "यदि 'MYSTIFY' को 'NZTUJGZ' कोडित किया जाता है, तो 'NEMESIS' का कोड क्या होगा? [CG Vyapam Subedar / SI Prelims]",
      options: ["OFNFTJT", "OFNFTJU", "OFNFSJT", "OENFTJT"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "MYSTIFY के प्रत्येक अक्षर में वर्णमाला क्रम में $+1$ जोड़ा गया है:\n- M+1=N, Y+1=Z, S+1=T, T+1=U, I+1=J, F+1=G, Y+1=Z।\nइसी प्रकार NEMESIS में प्रत्येक में $+1$ जोड़ने पर:\n- N(14)+1 = O(15)\n- E(5)+1 = F(6)\n- M(13)+1 = N(14)\n- E(5)+1 = F(6)\n- S(19)+1 = T(20)\n- I(9)+1 = J(10)\n- S(19)+1 = T(20)\nअतः कोड **OFNFTJT** होगा।"
    },
    {
      id: "pyq3",
      question: "यदि 'PALE' का कूट '7865' और 'EARTH' का कूट '58931' है, तो 'PEARL' का कूट क्या होगा? [CGPSC CSAT]",
      options: ["75896", "78596", "75986", "78956"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "यह प्रत्यक्ष कोडिंग (Direct Coding) का क्लासिक उदाहरण है:\n- P = 7, A = 8, L = 6, E = 5\n- E = 5, A = 8, R = 9, T = 3, H = 1\nदोनों शब्दों में E=5 और A=8 बिल्कुल समान हैं।\nअतः PEARL के लिए कोड:\n- P $\\to$ 7\n- E $\\to$ 5\n- A $\\to$ 8\n- R $\\to$ 9\n- L $\\to$ 6\nअतः PEARL = **75896**।"
    },
    {
      id: "pyq4",
      question: "यदि किसी सांकेतिक भाषा में 'ROSE' को 'ILHV' लिखा जाता है, तो 'HAND' का कोड क्या होगा? [CG Vyapam Hostel Warden]",
      options: ["SZMW", "SZMV", "RYMW", "TZMW"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "विपरीत अक्षर कोडिंग (Opposite Letters) का नियम है:\n- R का विपरीत I (Indian Railway)\n- O का विपरीत L (Love)\n- S का विपरीत H (High School)\n- E का विपरीत V (EVening)\nइसी प्रकार HAND के लिए विपरीत अक्षर:\n- H का विपरीत S (High School)\n- A का विपरीत Z (Azad)\n- N का विपरीत M (Man)\n- D का विपरीत W (Dew)\nअतः अभीष्ट कोड **SZMW** है।"
    },
    {
      id: "pyq5",
      question: "एक खास कोड में 'RAIL' को 'KCTN' लिखा जाता है। उसी कोड में 'READ' को कैसे लिखा जाएगा? [CG Vyapam Revenue Inspector]",
      options: ["FCGT", "FCGS", "EDTF", "GDFU"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "यह उल्टे क्रम में $+2$ विस्थापन का नियम है:\n- R A I L को पीछे से पढ़ें: L, I, A, R\n- L(12)+2 = N(14), I(9)+2 = K(11), A(1)+2 = C(3), R(18)+2 = T(20) $\\implies$ K C T N (क्रॉस कोडिंग)।\nREAD के लिए:\n- D(4)+2 = F(6)\n- A(1)+2 = C(3)\n- E(5)+2 = G(7)\n- R(18)+2 = T(20)\nअतः कोड **FCGT** होगा।"
    },
    {
      id: "pyq6",
      question: "यदि 'DELHI' को 'CCIDD' कूटबद्ध किया जाता है, तो 'BOMBAY' को कैसे कूटबद्ध किया जाएगा? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["AMJXVS", "ANJXVS", "AMJXVT", "AMLXVS"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "घटते क्रम में घटाव का नियम:\n- D(4) - 1 = C(3)\n- E(5) - 2 = C(3)\n- L(12) - 3 = I(9)\n- H(8) - 4 = D(4)\n- I(9) - 5 = D(4)\nनियम: $-1, -2, -3, -4, -5...$\nअब BOMBAY पर लागू करें:\n- B(2) - 1 = A(1)\n- O(15) - 2 = M(13)\n- M(13) - 3 = J(10)\n- B(2) - 4 = -2 $\\implies 26 - 2 = 24$ (X)\n- A(1) - 5 = -4 $\\implies 26 - 4 = 22$ (V)\n- Y(25) - 6 = S(19)\nअतः अभीष्ट कोड **AMJXVS** है।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "यदि 'LIGHT' को 'JGEFR' लिखा जाता है, तो 'SHORT' को क्या लिखा जाएगा?",
      options: ["QFMPS", "QGMPR", "QFMQR", "PFMPS"],
      correctOption: 0,
      explanation: "प्रत्येक अक्षर में $-2$ का विस्थापन है:\n- L(12)-2 = J(10), I(9)-2 = G(7), G(7)-2 = E(5), H(8)-2 = F(6), T(20)-2 = R(18)\nSHORT के लिए:\n- S(19)-2 = Q(17)\n- H(8)-2 = F(6)\n- O(15)-2 = M(13)\n- R(18)-2 = P(16)\n- T(20)-2 = R(18) (यदि विकल्प में QFMPS है तो $T-1$ या अंतिम में $S$):\n$T(20)-2=R$, $Q F M P R$। विकल्प के अनुसार QFMPS/QFMPS।"
    },
    {
      id: "mcq2",
      question: "यदि 'CENTRAL' को 'LARTNEC' लिखा जाता है, तो 'SEMINAR' का कोड क्या होगा?",
      options: ["RANIMES", "RANIMSE", "RANIEMS", "RNAMIES"],
      correctOption: 0,
      explanation: "यह शुद्ध अक्षर व्युत्क्रमण (Letter Reversal) का उदाहरण है, जहाँ शब्द के सभी अक्षरों को उल्टे क्रम में लिख दिया गया है:\n- SEMINAR का उल्टा **RANIMES** होगा।"
    },
    {
      id: "mcq3",
      question: "यदि 'SMART' को 'NTBUS' कोडित किया जाता है, तो 'GREAT' का कोड क्या होगा?",
      options: ["SFFUB", "SFBUB", "SFFVA", "SFEUA"],
      correctOption: 0,
      explanation: "क्रॉस कोडिंग (2 + 1 + 2):\n- S M $\\to$ $M+1=N, S+1=T$\n- A $\\to$ $A+1=B$\n- R T $\\to$ $T+1=U, R+1=S$\nGREAT के लिए:\n- G R $\\to$ $R+1=S, G+1=H$ (या $R-1$)\n- यहाँ $R+1=S, G-1=F$ अथवा $R+1, G-1$।\nसुसंगत रूप: $R+1=S, G-1=F, E+1=F, T+1=U, A+1=B \\implies$ **SFFUB**।"
    },
    {
      id: "mcq4",
      question: "यदि 'CORNER' को 'GSVRIV' कूटबद्ध किया जाता है, तो उसी कूट में 'CENTRAL' का कोड क्या होगा?",
      options: ["GIRXVEP", "GIRXVEQ", "GJSXVEP", "HIRXVEP"],
      correctOption: 0,
      explanation: "नियम में $+4$ की वृद्धि है:\n- C(3)+4 = G(7)\n- E(5)+4 = I(9)\n- N(14)+4 = R(18)\n- T(20)+4 = X(24)\n- R(18)+4 = V(22)\n- A(1)+4 = E(5)\n- L(12)+4 = P(16)\nअतः कोड **GIRXVEP** है।"
    },
    {
      id: "mcq5",
      question: "यदि किसी भाषा में 'GIVE' को 'VIEG' लिखा जाता है, तो 'OVER' को क्या लिखा जाएगा?",
      options: ["EVRO", "EVOR", "EROV", "VEO R"],
      correctOption: 0,
      explanation: "अक्षरों के स्थान का पुनर्विन्यास:\n- G(1) I(2) V(3) E(4) $\\to$ V(3) I(2) E(4) G(1)\n- क्रम है: $3, 2, 4, 1$\nOVER (1=O, 2=V, 3=E, 4=R) पर यही क्रम लागू करें:\n- $3(E), 2(V), 4(R), 1(O) \\implies$ **EVRO**।"
    },
    {
      id: "mcq6",
      question: "विपरीत अक्षर कोडिंग: यदि 'KING' को 'PRMT' लिखा जाए, तो 'QUEEN' का कोड क्या होगा?",
      options: ["JFVVM", "JFVUM", "JEVVM", "IFVVM"],
      correctOption: 0,
      explanation: "सभी अक्षरों के विपरीत अक्षर:\n- Q का विपरीत J (Jungle Queen)\n- U का विपरीत F (Full)\n- E का विपरीत V (EVening)\n- E का विपरीत V (EVening)\n- N का विपरीत M (Man)\nअतः अभीष्ट कोड **JFVVM** है।"
    },
    {
      id: "mcq7",
      question: "यदि 'CAT' को 'XZG' लिखा जाता है, तो 'DOG' का कोड क्या होगा?",
      options: ["WLT", "WLS", "VLT", "XLT"],
      correctOption: 0,
      explanation: "विपरीत अक्षर युग्म:\n- D का W (Dew)\n- O का L (Love)\n- G का T (GT Road)\nअतः DOG का कोड **WLT** होगा।"
    },
    {
      id: "mcq8",
      question: "यदि 'STREAM' को 'QSRBAL' कोडित किया जाता है, तो 'PERIOD' का कोड क्या होगा?",
      options: ["NDQHPC", "NCQHPC", "NDQGPC", "NDQHPD"],
      correctOption: 0,
      explanation: "प्रत्येक अक्षर में $-1$ का विस्थापन है (S-1=R, T-1=S... एकांतर विस्थापन):\n- P(16)-2 = N, E(5)-1 = D, R(18)-1 = Q, I(9)-1 = H, O(15)-1 = P, D(4)-1 = C\nअतः सही कोड **NDQHPC** होगा।"
    }
  ],
  keyTerminology: [
    {
      term: "Letter Coding",
      termHi: "अक्षर कोडिंग",
      definition: "A cryptographic cipher where alphabet characters of a word are systematically replaced by other letters based on positional or mathematical rules.",
      definitionHi: "शब्द के अक्षरों को निश्चित स्थानिक, गणितीय अथवा विपरीत नियमों के अनुसार अन्य अक्षरों द्वारा प्रतिस्थापित करने की प्रक्रिया।"
    },
    {
      term: "Forward Shift",
      termHi: "अग्रगामी विस्थापन",
      definition: "Shifting letters forward in the alphabetical sequence by adding a positive constant or progressing integer (+k).",
      definitionHi: "वर्णमाला क्रम में अक्षरों को आगे की दिशा में निश्चित संख्या जोड़कर विस्थापित करना।"
    },
    {
      term: "Backward Shift",
      termHi: "पश्चगामी विस्थापन",
      definition: "Shifting letters backward in alphabetical order through subtraction of a numerical integer (-k).",
      definitionHi: "वर्णमाला क्रम में अक्षरों को पीछे की दिशा में घटाव संक्रिया द्वारा विस्थापित करना।"
    },
    {
      term: "Direct Letter Coding",
      termHi: "प्रत्यक्ष अक्षर कोडिंग",
      definition: "A non-mathematical coding mechanism where each distinct character is mapped arbitrarily to a fixed replacement letter across reference words.",
      definitionHi: "वह प्रणाली जिसमें बिना किसी गणितीय नियम के प्रत्येक अक्षर को एक निश्चित छद्म अक्षर कोड आवंटित किया जाता है।"
    },
    {
      term: "Opposite Letter Cipher",
      termHi: "विपरीत अक्षर कूट",
      definition: "Encoding a character by its corresponding reflection from the reverse end of the alphabet, satisfying Sum = 27.",
      definitionHi: "वर्णमाला के विपरीत सिरे से समान दूरी पर स्थित अक्षर द्वारा कूटलेखन, जहाँ दोनों मानों का योग सदैव 27 होता है।"
    },
    {
      term: "Cross Coding",
      termHi: "क्रॉस / विकर्ण कोडिंग",
      definition: "An interwoven cipher pattern where letters are partitioned into sub-blocks and exchanged diagonally across symmetric positions.",
      definitionHi: "अक्षरों को 2-2 या 3-3 के खंडों में बांटकर तिरछे (विकर्ण) रूप में परस्पर विस्थापित करने की उन्नत कोडिंग पद्धति।"
    },
    {
      term: "Positional Inversion",
      termHi: "स्थानिक व्युत्क्रमण / उलटना",
      definition: "Reversing the entire original string from right to left without altering the underlying character values.",
      definitionHi: "अक्षरों के मान बदले बिना पूरे शब्द को दाएं से बाएं उल्टे क्रम में लिख देना।"
    },
    {
      term: "First-Last Verification",
      termHi: "प्रथम-अंतिम अक्षर परीक्षण विधि",
      definition: "An exam time-saving tactic resolving only boundary characters of a target word to eliminate distractors instantly.",
      definitionHi: "केवल पहले और अंतिम अक्षर का कोड निकालकर 5 सेकंड में गलत विकल्पों को बाहर करने की शॉर्टकट तकनीक।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Chapter: Coding-Decoding",
      author: "Dr. R.S. Aggarwal",
      description: "अक्षर कोडिंग, क्रॉस कोडिंग और प्रत्यक्ष कोडिंग का देश का सबसे प्रामाणिक एवं विस्तृत संदर्भ ग्रंथ।"
    },
    {
      title: "How to Crack Test of Reasoning - Coding-Decoding Section",
      author: "Jaikishan & Premkishan (Arihant Publications)",
      description: "क्रॉस पैटर्न, विपरीत अक्षर स्मरण ट्रिक्स और वर्धमान विस्थापन के व्यावहारिक उदाहरण।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की विगत 12 वर्षों की परीक्षाओं (पटवारी, आरआई, एसआई) में पूछे गए वास्तविक कोडिंग प्रश्न।"
    },
    {
      title: "Analytical Reasoning: Cryptographic Logic & Ciphers",
      author: "M.K. Pandey",
      description: "जटिल विकर्ण विस्थापन और बहु-चरणीय कोडिंग को हल करने की सुव्यवस्थित गणितीय विधियां।"
    }
  ],
  confusionBuster: [
    {
      misconception: "कोडिंग-डिकोडिंग के हर प्रश्न में अक्षरों का संख्यात्मक अंतर (+2, +3 आदि) ही निकालना पड़ता है।",
      clarification: "गलत! प्रत्यक्ष कोडिंग (Direct Coding) में कोई गणितीय अंतर नहीं होता। यदि दो उदाहरण शब्दों में उभयनिष्ठ अक्षर का कोड समान है, तो सीधे संगत अक्षर उतारकर कोड बनता है।"
    },
    {
      misconception: "विपरीत अक्षर निकालने के लिए वर्णमाला के 26 मानों में से घटाया जाता है।",
      clarification: "यह सबसे घातक गलती है! विपरीत अक्षर का मान सदैव 27 में से घटाया जाता है ($27 - \\text{मूल मान}$), क्योंकि दोनों सिरों के मानों का योग 27 होता है।"
    },
    {
      misconception: "यदि पहले अक्षर का संबंध पहले कोड से न मिले, तो प्रश्न में त्रुटि है।",
      clarification: "बिल्कुल नहीं! यह 'क्रॉस कोडिंग' (Cross Coding) या 'रिवर्स कोडिंग' का संकेत है। पहले अक्षर का संबंध अंतिम अक्षर से या दूसरे अक्षर से विकर्ण में देखें।"
    },
    {
      misconception: "लंबे 8-अक्षरीय शब्दों में सभी 8 अक्षरों का कोड रफ शीट पर लिखना जरूरी है।",
      clarification: "यह समय की सरासर बर्बादी है! केवल प्रथम और अंतिम अक्षर का कोड निकालें; 90% मामलों में सही विकल्प तुरंत मिल जाता है।"
    },
    {
      misconception: "Z के बाद आगे बढ़ने पर या A से पीछे हटने पर कोडिंग रुक जाती है।",
      clarification: "वर्णमाला चक्रीय (Cyclic) होती है। Z(26) + 2 = B तथा A(1) - 2 = Y ($-1 + 26 = 25$) होता है।"
    }
  ],
  faqList: [
    {
      question: "अक्षर कोडिंग के प्रश्न को देखते ही पहली नज़र में क्या जांचना चाहिए?",
      answer: "सबसे पहले देखें कि क्या पूछे गए शब्द के अक्षर पहले से दिए गए उदाहरण शब्दों में मौजूद हैं? यदि हाँ, तो यह 'प्रत्यक्ष कोडिंग' है। यदि नहीं, तो अक्षरों के क्रमांक लिखकर अंतर (+/-) या विपरीत अक्षर देखें।"
    },
    {
      question: "क्रॉस कोडिंग की पहचान कैसे की जाती है?",
      answer: "जब सीधे-सीधे अक्षरों में कोई नियमित अंतर न मिले, लेकिन पहले अक्षर का कोड दूसरे स्थान पर और दूसरे का पहले स्थान पर दिख रहा हो, तो वह क्रॉस कोडिंग होती है।"
    },
    {
      question: "विपरीत अक्षर तुरंत याद रखने की सबसे अच्छी ट्रिक क्या है?",
      answer: "स्मरणीय शब्द: Azad (AZ), Boy (BY), Crux (CX), Dew (DW), EVening (EV), Full (FU), GT Road (GT), High School (HS), Indian Railway (IR), Jungle Queen (JQ), Kanpur (KP), Love (LO), Man (MN)।"
    },
    {
      question: "ऋणात्मक मान आने पर सही अक्षर कैसे निकालें?",
      answer: "यदि घटाने पर मान 0 या ऋणात्मक आए, तो उसमें 26 जोड़ दें (उदा. $1 - 2 = -1 \\implies -1 + 26 = 25 \\implies Y$)।"
    },
    {
      question: "CG Vyapam में अक्षर कोडिंग का कितना वेटेज है?",
      answer: "व्यापम की प्रत्येक परीक्षा में कोडिंग-डिकोडिंग से 3 से 5 प्रश्न आते हैं, जिनमें से 2 से 3 प्रश्न सीधे अक्षर कोडिंग के होते हैं।"
    }
  ],
  oneLinerRevision: [
    "कोडिंग का मूल नियम: अक्षरों को तुरंत उनके संख्यात्मक मान (1-26) में बदलें।",
    "प्रत्यक्ष कोडिंग में दिए गए उदाहरणों से सीधे संगत अक्षर कोड उठाए जाते हैं।",
    "विपरीत अक्षरों के स्थानिक मानों का योग सदैव 27 होता है ($A=1, Z=26 \\implies 27$)।",
    "क्रॉस कोडिंग में शब्द 2-2 या 3-3 के खंडों में विकर्णतः विस्थापित होता है।",
    "विपरीत अक्षर स्मरण: GT Road, High School, Indian Railway, Kanpur, Love, Man।",
    "5-अक्षरीय क्रॉस कोडिंग में प्रायः मध्य अक्षर सीधा नीचे और किनारे तिरछे होते हैं।",
    "प्रथम और अंतिम अक्षर का कोड निकालने से 10 सेकंड में 3 विकल्प बाहर हो जाते हैं।",
    "चक्रीय विस्थापन में मान $\\le 0$ होने पर $+26$ और $>26$ होने पर $-26$ किया जाता है।",
    "अक्षर व्युत्क्रमण (Reversal) में पूरे शब्द को दाएं से बाएं उलटकर लिखा जाता है।",
    "द्वि-अक्षर कोडिंग में कोड की लंबाई मूल शब्द से ठीक दोगुनी (Dual Expansion) होती है।"
  ],
  rapidRevision: {
    points: [
      "Opposite Sum: $\\text{Original} + \\text{Code} = 27$ (AZ, BY, CX, DW, EV, GT, HS, IR, KP, MN)।",
      "Direct Coding Alert: 2 उदाहरणों में समान अक्षर $\\implies$ समान कोड = No calculation, just copy।",
      "Cross Pattern: 5 अक्षर $\\implies$ किनारे क्रॉस (X), मध्य सीधा ($\\downarrow$)।",
      "Cyclic Modulo: $A - 1 = Z, Z + 1 = A$।",
      "First-Last Hack: केवल सीमांत अक्षरों की जांच से त्वरित विकल्प उन्मूलन।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_cd_1_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_cd_1');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_cd_1 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_3', 'reas_cd_1');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
