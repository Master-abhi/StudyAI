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

const reas_br_2_data = {
  topicId: "reas_br_2",
  topicName: "Coded Blood Relations",
  topicNameHi: "कूटित रक्त संबंध (Coded Blood Relations)",
  chapterId: "cgv_master_sub_4_ch_4",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "कूटित रक्त संबंध (Coded Blood Relations) रक्त संबंध और कूटलेखन का एक अत्यंत संरचित, औपचारिक एवं गणितीय प्रारूप है। इसमें विभिन्न मानवीय पारिवारिक संबंधों (जैसे पिता, माता, भाई, बहन, पति, पत्नी आदि) को विशिष्ट प्रतीकों (जैसे $+$, $-$, $\\times$, $\\div$, $@$, $\\#$, $\\$$, $\\%$, $\\&$) द्वारा कूटबद्ध किया जाता है (उदा. $P + Q$ का अर्थ है 'P, Q का पिता है')। परीक्षार्थी को एक बीजीय व्यंजक (Expression like $A \\times B + C - D$) दिया जाता है और प्रतीकों के अर्थों का विसंकेतीकरण कर किन्हीं दो चरों के मध्य सटीक रक्त संबंध की गणना करनी होती है।",
    importance: "CG Vyapam (सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, डाटा एंट्री ऑपरेटर, संयुक्त भर्ती) तथा बैंकिंग/CGPSC CSAT में कूटित रक्त संबंध से 2 से 3 प्रश्न नियमित रूप से पूछे जाते हैं। यह टॉपिक अभ्यर्थी की प्रतीकात्मक डिकोडिंग, पीढ़ी अंतराल गणना और 'जेंडर एलिमिनेशन' (Gender Elimination Technique) की योग्यता का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में दो प्रकार के प्रश्न पूछे जाते हैं: (1) दिए गए व्यंजक से संबंध ज्ञात करना (Decoding an Expression: 'यदि $P + Q \\times R$ हो, तो P का R से क्या संबंध है?'), तथा (2) दिए गए संबंध को सिद्ध करने वाले व्यंजक का चयन करना (Finding the Expression: 'निम्नलिखित में से कौन सा व्यंजक दर्शाता है कि M, N का मामा है?')। इसमें 'लिंग परीक्षण' और 'पीढ़ी गणना' (Generation Counting Method) से 15 सेकंड में उत्तर प्राप्त हो जाता है।",
    quickFacts: [
      "जेंडर एलिमिनेशन तकनीक (Gender Elimination): यदि प्रश्न में पूछा जाए कि 'M, T का चाचा है', तो M अनिवार्य रूप से एक पुरुष ($+$) होना चाहिए। जिस विकल्प में प्रतीक के अनुसार M का लिंग महिला ($-$) सिद्ध हो, उसे बिना हल किए तुरंत काट दें!",
      "अंतिम व्यक्ति का लिंग अनिश्चितता (Last Person Gender Trap): किसी व्यंजक के सबसे अंतिम चर (Last Character, e.g., $A + B \\times C$ में C) का लिंग सामान्यतः अज्ञात रहता है, जब तक कि संबंध पति-पत्नी (Spouse) का न हो।",
      "पीढ़ी अंतराल मान (Generation Gap Value): वरिष्ठ पीढ़ी (पिता/माता) $= +1$, समान पीढ़ी (भाई/बहन/पति) $= 0$, तथा कनिष्ठ पीढ़ी (पुत्र/पुत्री) $= -1$। पूरे व्यंजक का कुल योग संबंध की पीढ़ी निर्धारित करता है।",
      "प्रतीक संबंध की दिशा: ध्यान से पढ़ें कि $P + Q$ का अर्थ 'P, Q का पिता है' (Forward) है अथवा 'Q, P का पिता है' (Backward)।",
      "पति-पत्नी का स्वयंसिद्ध लिंग: यदि $A \\times B$ का अर्थ 'A, B का पति है', तो B स्वतः एक 'महिला' (पत्नी) सिद्ध हो जाती है।"
    ]
  },
  chapters: [
    {
      id: "ch1_coded_relation_types",
      title: "कूटित संबंधों के प्रकार एवं प्रतीकात्मक परिभाषाएं (Symbolic Relation Conventions)",
      content: `### 1. कूटित रक्त संबंध की संरचना एवं प्रतीकात्मक व्यवस्था

इस अध्याय में संबंधों को गणितीय या विशेष प्रतीकों से परिभाषित किया जाता है:

#### 1. मानक कूट परिभाषाएं (अग्रगामी / Forward Types):
- **$A + B$:** A, B का **पिता (Father)** है $\\implies$ A पुरुष $[+]$, पीढ़ी अंतराल $= +1$
- **$A - B$:** A, B की **माता (Mother)** है $\\implies$ A महिला $[-]$, पीढ़ी अंतराल $= +1$
- **$A \\times B$:** A, B का **भाई (Brother)** है $\\implies$ A पुरुष $[+]$, पीढ़ी अंतराल $= 0$
- **$A \\div B$:** A, B की **बहन (Sister)** है $\\implies$ A महिला $[-]$, पीढ़ी अंतराल $= 0$
- **$A = B$:** A, B का **पति (Husband)** है $\\implies$ A पुरुष $[+]$, B महिला $[-]$, पीढ़ी $= 0$

#### 2. पश्चगामी कूट (Backward Coding Trap):
कभी-कभी प्रश्न में संबंध की दिशा उलट दी जाती है:
- **$A + B$ का अर्थ है 'B, A का पिता है'** (यहाँ B का लिंग निश्चित है, A का नहीं!)
- अतः प्रश्न के निर्देशों को पढ़ते समय हमेशा यह जांचें कि संबंध $A \\to B$ है या $B \\to A$।`
    },
    {
      id: "ch2_generation_gap_technique",
      title: "पीढ़ी अंतराल संख्यात्मक गणना तकनीक (Generation Gap Counting Method)",
      content: `### 2. पीढ़ी अंतराल संख्यात्मक गणना (The Generation Value Method)

वंश वृक्ष बनाए बिना सीधे गणितीय योग से संबंध की पहचान करने की यह क्रांतिकारी शॉर्टकट तकनीक है।

#### 1. प्रतीकों को पीढ़ी मान (Generation Values) आवंटित करें:
| संबंध का प्रकार | पीढ़ी स्तर | संख्यात्मक मान | उदाहरण प्रतीक |
| :---: | :---: | :---: | :---: |
| दादा / दादी / नाना / नानी | $+2$ | $+2$ | Grandparents |
| पिता / माता / चाचा / मामा / बुआ | $+1$ | $+1$ | $+$, $-$, $\\#$ |
| भाई / बहन / पति / पत्नी / चचेरे | $0$ | $0$ | $\\times$, $\\div$, $=$ |
| पुत्र / पुत्री / भतीजा / भांजा | $-1$ | $-1$ | $\\$, \\%$ |
| पोता / पोती / नाती / नातिन | $-2$ | $-2$ | Grandchildren |

#### 2. व्यावहारिक अनुप्रयोग उदाहरण:
- व्यंजक: $P + Q \\times R - S$
  - $+$ (पिता) $= +1$
  - $\\times$ (भाई) $= 0$
  - $-$ (माता) $= +1$
- $P$ से $S$ तक का कुल पीढ़ी मान:
  $$\\text{Total Gap} = (+1) + 0 + (+1) = +2$$
- $+2$ मान यह सिद्ध करता है कि $P, S$ से **दो पीढ़ी ऊपर** है!
- चूंकि $P$ एक पुरुष है ($P + Q$ से), अतः $P, S$ का **दादा (Grandfather)** या **नाना** ही हो सकता है!
- पिता या भाई वाले विकल्प 2 सेकंड में स्वतः बाहर हो जाते हैं।`
    },
    {
      id: "ch3_gender_elimination_hack",
      title: "जेंडर एलिमिनेशन तकनीक (Gender Elimination Shortcut)",
      content: `### 3. जेंडर एलिमिनेशन तकनीक (Gender Elimination Hack)

जब प्रश्न में पूछा जाए: *"निम्नलिखित में से कौन सा व्यंजक यह दर्शाता है कि M, N का मामा है?"*

#### 15 सेकंड में 3 विकल्प काटने का नियम:
1. **लक्षित व्यक्ति का लिंग निर्धारित करें:**
   - संबंध है: **'मामा' (Maternal Uncle)**
   - मामा अनिवार्य रूप से एक **पुरुष $[+]$** होना चाहिए।
   - अतः व्यंजक में $M$ का लिंग हर हाल में **पुरुष** निकलना चाहिए।

2. **विकल्पों में M के ठीक बाद का प्रतीक देखें:**
   - यदि $M - K$ दिया है (जहाँ $-$ का अर्थ 'माता' या 'बहन' है), तो $M$ महिला $[-]$ बन जाएगा $\\implies$ वह विकल्प तुरंत गलत!
   - यदि $M$ व्यंजक के सबसे **अंत में (Last Character)** बैठा है (उदा. $N + K \\times M$), तो $M$ का लिंग निर्धारित ही नहीं हो सकता (Cannot be Determined) $\\implies$ वह विकल्प भी तुरंत खारिज!

3. **परिणाम:**
   - केवल लिंग की जांच करने से 4 में से 2 या 3 विकल्प 5 सेकंड में कट जाते हैं।
   - शेष बचे एकमात्र विकल्प का पीढ़ी मान जांचकर उत्तर सुनिश्चित करें।`
    },
    {
      id: "ch4_complex_coded_puzzles",
      title: "जटिल कूटित संबंध एवं समीकरण निर्माण (Decoding Expressions & Equations)",
      content: `### 4. व्यंजक डिकोडिंग का मानक वंश वृक्ष मॉडल

जब सीधे शॉर्टकट से दो विकल्प बच जाएं, तो व्यंजक का एक संक्षिप्त 3-चरणीय वंश वृक्ष बनाएं:

#### समस्या: $A + B \\times C - D \\div E$ में A का E से संबंध
- $A[+]$ पिता है $B$ का $\\implies A[+] \\downarrow B$
- $B[+]$ भाई है $C$ का $\\implies A[+] \\downarrow (B[+] - C)$
- $C[-]$ माता है $D$ की $\\implies C[-] \\downarrow D$
- $D[-]$ बहन है $E$ की $\\implies D[-] - E$

#### संबंध विश्लेषण:
- $E$ की माता $C$ है।
- $C$ के पिता $A$ हैं।
- माता के पिता को क्या कहते हैं? $\\implies$ **नाना (Maternal Grandfather)**।
- अतः $A, E$ का **नाना** है।`
    },
    {
      id: "ch5_vyapam_traps_checklist",
      title: "व्यापम मॉडल एवं परीक्षा हॉल चेकलिस्ट (Exam Hacks & Traps)",
      content: `### 5. कूटित रक्त संबंध की अचूक परीक्षा रणनीति

1. **अंतिम चर का लिंग अपवाद (The Last Character Exception):**
   - सामान्यतः व्यंजक के अंतिम व्यक्ति का लिंग नहीं निकलता।
   - **एकमात्र अपवाद:** पति-पत्नी (Spouse) संबंध!
   - यदि लिखा हो: $P = Q$ (P, Q का पति है), तो यद्यपि Q अंत में है, फिर भी Q का लिंग स्वतः **स्त्री $[-]$** सिद्ध हो जाता है।

2. **बैकवर्ड कोडिंग की चेतावनी:**
   - यदि प्रश्न में लिखा हो *"A % B का अर्थ है B, A की पुत्री है"*, तो सावधानी बरतें! यहाँ प्रतीक अपने आगे वाले चर का नहीं बल्कि पीछे वाले चर का लिंग बता रहा है।

3. **समय प्रबंधन:**
   - पूरे 4 विकल्पों के बड़े वंश वृक्ष कभी न बनाएं।
   - पहले **Gender Test** लगाएं $\\to$ फिर **Generation Gap Test** लगाएं $\\to$ अंतिम बचे 1 विकल्प को संक्षेप में सत्यापित करें।`
    }
  ],
  comparativeTables: [
    {
      title: "पीढ़ी मान (Generation Value) एवं संबंध संदर्शिका",
      headers: ["पीढ़ी मान (Gap)", "संभावित पुरुष संबंध (Male)", "संभावित महिला संबंध (Female)", "सामान्य प्रतीक प्रकार"],
      rows: [
        { cells: ["$+2$", "दादा, नाना", "दादी, नानी", "दो वरिष्ठ संबंध (उदा. $+1$ और $+1$)"] },
        { cells: ["$+1$", "पिता, चाचा, मामा, फूफा, ससुर", "माता, चाची, मामी, मौसी, बुआ, सास", "पिता/माता संबंधी प्रतीक ($+, -, \\#$)"] },
        { cells: ["$0$", "भाई, पति, जीजा, साला, चचेरा भाई", "बहन, पत्नी, भाभी, साली, चचेरी बहन", "सहोदर या वैवाहिक प्रतीक ($\\times, =$)"] },
        { cells: ["$-1$", "पुत्र, भतीजा, भांजा, दामाद", "पुत्री, भतीजी, भांजी, पुत्रवधू", "संतान संबंधी प्रतीक ($\\$, \\%$)"] },
        { cells: ["$-2$", "पोता, नाती", "पोती, नातिन", "दो कनिष्ठ संबंध"] }
      ]
    },
    {
      title: "फॉरवर्ड कोडिंग बनाम बैकवर्ड कोडिंग की तुलना",
      headers: ["मापदंड", "अग्रगामी कोडिंग (Forward Coding)", "पश्चगामी कोडिंग (Backward Coding)"],
      rows: [
        { cells: ["परिभाषा प्रारूप", "\"P + Q का अर्थ है P, Q का पिता है\"", "\"P + Q का अर्थ है Q, P का पिता है\""] },
        { cells: ["निर्धारित लिंग", "प्रतीक के बाईं ओर वाले चर (P) का", "प्रतीक के दाईं ओर वाले चर (Q) का"] },
        { cells: ["डिकोडिंग की दिशा", "बाएं से दाएं (Left to Right)", "दाएं से बाएं (Right to Left)"] },
        { cells: ["अंतिम चर की स्थिति", "अंतिम चर का लिंग अज्ञात रहता है", "प्रथम चर का लिंग अज्ञात रहता है"] },
        { cells: ["कठिनाई स्तर", "सरल और स्वाभाविक", "भ्रामक (सावधानी आवश्यक)"] }
      ]
    },
    {
      title: "जेंडर एलिमिनेशन तकनीक का अनुप्रयोग ढांचा",
      headers: ["वांछित संबंध", "वांछित लिंग", "अमान्य स्थितियां (तुरंत विकल्प काटें)", "मान्य स्थिति"],
      rows: [
        { cells: ["चाचा / मामा / भाई / पिता", "पुरुष $[+]$", "चर के बाद महिला प्रतीक हो, या चर अंत में हो", "चर के बाद पुरुष प्रतीक हो"] },
        { cells: ["माता / बुआ / मौसी / बहन", "महिला $[-]$", "चर के बाद पुरुष प्रतीक हो, या चर अंत में हो", "चर के बाद महिला प्रतीक हो"] },
        { cells: ["दादा ($+2$ पीढ़ी)", "पुरुष $[+]$", "व्यंजक का कुल पीढ़ी योग $\\neq +2$ हो", "लिंग पुरुष और कुल पीढ़ी योग $= +2$"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "यदि 'P + Q' का अर्थ 'P, Q का पिता है', 'P - Q' का अर्थ 'P, Q की पत्नी है', 'P × Q' का अर्थ 'P, Q का भाई है', तो व्यंजक 'A + B × C' में A का C से क्या संबंध है? [CG Vyapam Patwari Exam]",
      options: ["पिता", "चाचा", "भाई", "दादा"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "व्यंजक को डिकोड करें:\n- 'A + B' का अर्थ है A, B का पिता है ($A[+] \\downarrow B$)\n- 'B × C' का अर्थ है B, C का भाई है ($B[+] - C$)\nचूंकि B और C भाई-बहन हैं और A, B का पिता है, अतः A निश्चित रूप से C का भी **पिता (Father)** होगा।\nअतः सही उत्तर पिता है।"
    },
    {
      id: "pyq2",
      question: "यदि 'A $ B' का अर्थ 'A, B का पिता है', 'A # B' का अर्थ 'A, B की बहन है', और 'A @ B' का अर्थ 'A, B का भाई है', तो निम्नलिखित में से कौन सा व्यंजक दर्शाता है कि 'R, S की बुआ है'? [CG Vyapam Subedar / SI Prelims]",
      options: ["R # T $ S", "R $ T # S", "S # T $ R", "R @ T $ S"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "जेंडर एलिमिनेशन और पीढ़ी तकनीक:\n1. 'R बुआ है' $\\implies$ R महिला $[-]$ होनी चाहिए और पीढ़ी अंतराल $= +1$ होना चाहिए।\n2. विकल्प (A) 'R # T $ S':\n- R # T का अर्थ: R, T की बहन है (R महिला $[-]$ है, पीढ़ी 0)\n- T $ S का अर्थ: T, S का पिता है (T पुरुष, पीढ़ी $+1$)\n- S के पिता (T) की बहन R है $\\implies$ R, S की **बुआ (Paternal Aunt)** है!\nअतः विकल्प (A) पूर्णतः सही है।"
    },
    {
      id: "pyq3",
      question: "यदि 'P + Q' का अर्थ 'P, Q का भाई है', 'P - Q' का अर्थ 'P, Q की माता है' और 'P × Q' का अर्थ 'P, Q की बहन है', तो व्यंजक 'M - N + O × P' में M का P से क्या संबंध है? [CGPSC CSAT]",
      options: ["माता", "नानी", "दादी", "बहन"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "विश्लेषण:\n- M - N: M, N की माता है ($M[-] \\downarrow N$)\n- N + O: N, O का भाई है ($N[+] - O$)\n- O × P: O, P की बहन है ($O[-] - P$)\nयहाँ N, O और P तीनों आपस में सगे भाई-बहन हैं, और M, N की माता है।\nअतः M, P की भी **माता (Mother)** होगी।"
    },
    {
      id: "pyq4",
      question: "निर्देश: 'A @ B' = A, B का पुत्र है; 'A # B' = A, B की पत्नी है। व्यंजक 'P @ Q # R' में R का P से क्या संबंध है? [CG Vyapam Hostel Warden]",
      options: ["पिता", "माता", "चाचा", "दादा"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "डिकोड करें:\n- P @ Q $\\implies$ P, Q का पुत्र है ($Q \\downarrow P[+]$)\n- Q # R $\\implies$ Q, R की पत्नी है ($Q[-] = R[+]$)\nचूंकि Q, P की माता है और R, Q का पति है, अतः R, P का **पिता (Father)** होगा।"
    },
    {
      id: "pyq5",
      question: "यदि 'A + B' का अर्थ 'A, B का भाई है', 'A - B' का अर्थ 'A, B का पिता है', तो निम्नलिखित में से कौन सा व्यंजक दर्शाता है कि 'P, R का दादा है'? [CG Vyapam Revenue Inspector]",
      options: ["P - Q - R", "P - Q + R", "P + Q - R", "P + Q + R"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "दादा का अर्थ $= +2$ पीढ़ी ऊपर और लिंग पुरुष ($+$)।\n- विकल्प (A) 'P - Q - R':\n  - P - Q: P, Q का पिता है ($+1$ पीढ़ी, P पुरुष)\n  - Q - R: Q, R का पिता है ($+1$ पीढ़ी)\n  - कुल पीढ़ी मान $= +1 + 1 = +2$।\n  - R के पिता (Q) के पिता P हैं $\\implies$ P, R का **दादा** है!\nअतः विकल्प (A) सही है।"
    },
    {
      id: "pyq6",
      question: "यदि 'A % B' का अर्थ 'A, B की पुत्री है', तो व्यंजक 'X % Y % Z' में X का Z से क्या संबंध है? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["नातिन या पोती (Granddaughter)", "पुत्री", "माता", "दादी"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "डिकोड करें:\n- X % Y: X, Y की पुत्री है (पीढ़ी $-1$, X महिला)\n- Y % Z: Y, Z की पुत्री है (पीढ़ी $-1$, Y महिला)\nकुल पीढ़ी मान $= -1 - 1 = -2$।\nचूंकि X महिला है और Z से दो पीढ़ी नीचे है, अतः X, Z की **नातिन/पोती (Granddaughter)** है।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "यदि 'A + B' = A, B का पिता है; 'A - B' = A, B की बहन है; 'A * B' = A, B का पुत्र है। व्यंजक 'P + Q - R * S' में P का S से क्या संबंध है?",
      options: ["पति", "पिता", "भाई", "ससुर"],
      correctOption: 0,
      explanation: "डिकोड करें:\n- P[+] पिता है Q का\n- Q[-] बहन है R की\n- R[+] पुत्र है S का\nचूंकि Q और R भाई-बहन हैं, P उनके पिता हैं और S उनकी माता है।\nअतः P और S आपस में पति-पत्नी हैं। P, S का **पति (Husband)** है।"
    },
    {
      id: "mcq2",
      question: "यदि 'M @ N' = M, N की माता है; 'M # N' = M, N का भाई है। व्यंजक 'K # L @ M' में K का M से क्या संबंध है?",
      options: ["मामा", "चाचा", "पिता", "भाई"],
      correctOption: 0,
      explanation: "L, M की माता है और K, L का भाई है। माता का भाई **मामा (Maternal Uncle)** होता है।"
    },
    {
      id: "mcq3",
      question: "कूटित रक्त संबंध में जेंडर एलिमिनेशन तकनीक का मुख्य लाभ क्या है?",
      options: ["गलत लिंग वाले विकल्पों को बिना हल किए तुरंत खारिज करना", "सभी प्रश्नों में वंश वृक्ष बनाना", "नाम से लिंग तय करना", "उत्तर याद रखना"],
      correctOption: 0,
      explanation: "जेंडर एलिमिनेशन से जिन विकल्पों में लक्षित व्यक्ति का लिंग संबंध के विपरीत हो, वे तुरंत 2 सेकंड में बाहर हो जाते हैं।"
    },
    {
      id: "mcq4",
      question: "यदि 'P $ Q' = P, Q का पिता है, तो व्यंजक 'A $ B $ C $ D' में A का D से क्या संबंध है?",
      options: ["परदादा (Great Grandfather)", "दादा", "पिता", "चाचा"],
      correctOption: 0,
      explanation: "कुल पीढ़ी मान $= +1 + 1 + 1 = +3$। अतः A, D का **परदादा (Great Grandfather)** है।"
    },
    {
      id: "mcq5",
      question: "यदि व्यंजक के अंत में कोई चर बैठा हो और उसके आगे कोई प्रतीक न हो, तो उसका लिंग कब निश्चित हो सकता है?",
      options: ["केवल तब जब उसके पहले पति-पत्नी (Spouse) का संबंध हो", "हमेशा निश्चित होता है", "कभी निश्चित नहीं हो सकता", "केवल विषम संख्या वाले प्रश्नों में"],
      correctOption: 0,
      explanation: "यदि उससे पहले वैवाहिक संबंध हो (उदा. A, B का पति है), तो B स्वतः पत्नी (महिला) सिद्ध हो जाती है; अन्य किसी भी संबंध में अंतिम चर का लिंग अज्ञात रहता है।"
    },
    {
      id: "mcq6",
      question: "यदि 'A = B' = A, B की पत्नी है; 'B / C' = B, C का पिता है। व्यंजक 'A = B / C' में A का C से क्या संबंध है?",
      options: ["माता", "पुत्री", "चाची", "बहन"],
      correctOption: 0,
      explanation: "B, C का पिता है और A, B की पत्नी है। पिता की पत्नी **माता (Mother)** होती है।"
    },
    {
      id: "mcq7",
      question: "यदि 'P + Q' = P, Q का भाई है और 'P % Q' = P, Q की पुत्री है। व्यंजक 'A + B % C' में A का C से संबंध क्या है?",
      options: ["पुत्र", "पुत्री", "भाई", "चाचा"],
      correctOption: 0,
      explanation: "B, C की पुत्री है और A, B का भाई है। पुत्री का भाई **पुत्र (Son)** होता है।"
    },
    {
      id: "mcq8",
      question: "पीढ़ी मान तकनीक के अनुसार 'चाचा/मामा' का संख्यात्मक मान क्या होगा?",
      options: ["$+1$", "$0$", "$+2$", "$-1$"],
      correctOption: 0,
      explanation: "चाचा या मामा पिता/माता की पीढ़ी में आते हैं, अतः उनका पीढ़ी मान **$+1$** होता है।"
    }
  ],
  keyTerminology: [
    {
      term: "Coded Blood Relations",
      termHi: "कूटित रक्त संबंध",
      definition: "An algebraic genealogical representation where kinship ties are encoded through arithmetic or punctuation symbols.",
      definitionHi: "वह तार्किक प्रारूप जिसमें पारिवारिक संबंधों को गणितीय प्रतीकों (+, -, ×, ÷) या विराम चिह्नों द्वारा दर्शाया जाता है।"
    },
    {
      term: "Gender Elimination Hack",
      termHi: "जेंडर एलिमिनेशन तकनीक",
      definition: "A filtering strategy instantly rejecting multiple-choice expressions where the target subject exhibits the incorrect biological sex.",
      definitionHi: "वांछित संबंध के लिंग के आधार पर गलत विकल्पों को बिना हल किए 2 सेकंड में छांटने की शॉर्टकट विधि।"
    },
    {
      term: "Generation Value Method",
      termHi: "पीढ़ी मान गणना विधि",
      definition: "Assigning relative numerical weights (+2, +1, 0, -1, -2) to symbols to identify genealogical distance through summation.",
      definitionHi: "प्रतीकों को संख्यात्मक मान देकर पूरे व्यंजक के योग द्वारा पीढ़ी स्तर ज्ञात करने की त्वरित तकनीक।"
    },
    {
      term: "Last Character Ambiguity",
      termHi: "अंतिम चर की लिंग अस्पष्टता",
      definition: "The structural constraint where the concluding entity in an expression lacks a trailing operator, rendering gender unresolved.",
      definitionHi: "व्यंजक के अंतिम सदस्य के आगे कोई प्रतीक न होने के कारण उसके लिंग का अनिर्धारित रह जाना।"
    },
    {
      term: "Spousal Mutual Gender Deduction",
      termHi: "वैवाहिक पारस्परिक लिंग निर्धारण",
      definition: "The unique exception where declaring one partner as Husband or Wife automatically fixes the trailing partner's gender.",
      definitionHi: "पति-पत्नी संबंध का वह अद्वितीय नियम जहाँ एक साथी का लिंग तय होते ही दूसरे का लिंग स्वतः सिद्ध हो जाता है।"
    },
    {
      term: "Forward vs Backward Coded Operators",
      termHi: "अग्रगामी बनाम पश्चगामी कूट संकारक",
      definition: "The directional protocol establishing whether 'P * Q' defines P's relation to Q or Q's relation to P.",
      definitionHi: "प्रतीक की वह दिशा जो तय करती है कि संबंध पहले चर से दूसरे का है या दूसरे चर से पहले का।"
    },
    {
      term: "Residual Equation Matching",
      termHi: "अवशिष्ट समीकरण सत्यापन",
      definition: "Constructing an abbreviated mini-tree for the single survivor option after gender and gap elimination.",
      definitionHi: "जेंडर और पीढ़ी परीक्षण से छंटे एकमात्र अंतिम विकल्प का संक्षिप्त आरेख बनाकर अंतिम पुष्टि करना।"
    },
    {
      term: "Expression Decomposition",
      termHi: "व्यंजक विखंडन",
      definition: "Parsing a composite algebraic string into constituent parent-child or spousal binary segments.",
      definitionHi: "एक लंबे कूट व्यंजक को दो-दो चरों के स्वतंत्र जोड़ों में तोड़कर क्रमबद्ध हल करना।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Coded Relations Chapter",
      author: "Dr. R.S. Aggarwal",
      description: "कूटित रक्त संबंध, व्यंजक डिकोडिंग और प्रतीकात्मक विश्लेषण का मानक संदर्भ ग्रंथ।"
    },
    {
      title: "How to Crack Test of Reasoning - Coded Blood Relations",
      author: "Arihant Publications",
      description: "जेंडर एलिमिनेशन तकनीक और पीढ़ी मान गणना विधि (Generation Gap Method) का संकलन।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "व्यापम की विभिन्न परीक्षाओं (सूबेदार, पटवारी, डाटा एंट्री ऑपरेटर) में पूछे गए वास्तविक कूटित संबंध प्रश्न।"
    },
    {
      title: "Magical Book on Quicker Reasoning",
      author: "K. Kundan",
      description: "प्रतीकात्मक संबंधों में 10-सेकंड शॉर्टकट ट्रिक्स और पश्चगामी कोडिंग के निवारण नियम।"
    }
  ],
  confusionBuster: [
    {
      misconception: "चारों विकल्पों के पूरे-पूरे वंश वृक्ष बनाकर ही सही उत्तर खोजा जा सकता है।",
      clarification: "यह समय की सरासर बर्बादी है! सबसे पहले 'जेंडर एलिमिनेशन' और 'पीढ़ी मान' लगाएं; 4 में से 3 विकल्प 10 सेकंड में कट जाते हैं।"
    },
    {
      misconception: "व्यंजक के अंतिम व्यक्ति का लिंग कभी ज्ञात नहीं किया जा सकता।",
      clarification: "एक अपवाद है: यदि अंतिम व्यक्ति से ठीक पहले 'पति-पत्नी' का संबंध हो (उदा. P, Q का पति है), तो Q का लिंग स्वतः 'महिला' सिद्ध हो जाता है।"
    },
    {
      misconception: "$P + Q$ में हमेशा P का ही लिंग तय होता है।",
      clarification: "केवल अग्रगामी कोडिंग में! यदि निर्देश में लिखा हो कि 'P + Q का अर्थ है Q, P का पिता है' (Backward), तो Q का लिंग तय होता है, P का नहीं।"
    },
    {
      misconception: "पीढ़ी मान शून्य (0) आने पर संबंध केवल भाई-बहन ही हो सकता है।",
      clarification: "पीढ़ी मान 0 में पति, पत्नी, जीजा, साला, भाभी और चचेरे/ममेरे भाई-बहन भी शामिल होते हैं।"
    },
    {
      misconception: "कूटित रक्त संबंध बैंकिंग के लिए है, छत्तीसगढ़ व्यापम में नहीं आता।",
      clarification: "व्यापम के उप-निरीक्षक (SI), प्लाटून कमांडर और संयुक्त भर्ती परीक्षाओं में कूटित रक्त संबंध के प्रश्न अनिवार्य रूप से पूछे जाते हैं।"
    }
  ],
  faqList: [
    {
      question: "कूटित रक्त संबंध को 15 सेकंड में हल करने का अचूक तरीका क्या है?",
      answer: "दो कदम अपनाएं: (1) जेंडर एलिमिनेशन (वांछित व्यक्ति का लिंग पुरुष या महिला जांचें और विपरीत लिंग वाले विकल्प काटें), और (2) पीढ़ी अंतराल मान (+2, +1, 0, -1) जोड़कर सही विकल्प चुनें।"
    },
    {
      question: "व्यंजक में अंतिम चर का लिंग कैसे पता करें?",
      answer: "यदि अंतिम चर से पहले वैवाहिक संबंध (पति-पत्नी) है तो लिंग विपरीत हो जाएगा; अन्यथा अंतिम चर का लिंग निर्धारित नहीं किया जा सकता।"
    },
    {
      question: "पीढ़ी मान (Generation Value) कैसे काम करता है?",
      answer: "पिता/माता = $+1$, भाई/बहन/पति = $0$, पुत्र/पुत्री = $-1$। पूरे व्यंजक के प्रतीकों का मान जोड़ें; यदि कुल योग $+2$ आता है तो संबंध दादा/नाना का होगा।"
    },
    {
      question: "यदि दो विकल्प जेंडर और पीढ़ी मान दोनों में सही निकलें तो क्या करें?",
      answer: "केवल उन दोनों में से किसी एक विकल्प का 3-चरणीय संक्षिप्त वंश वृक्ष बनाकर 5 सेकंड में सही उत्तर की पुष्टि कर लें।"
    },
    {
      question: "CG Vyapam में इस टॉपिक का क्या वेटेज है?",
      answer: "व्यापम के एसआई, पटवारी और हॉस्टल अधीक्षक में कूटित रक्त संबंध से 1 से 2 प्रश्न पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "जेंडर एलिमिनेशन से गलत लिंग वाले 2-3 विकल्प बिना हल किए तुरंत कट जाते हैं।",
    "पिता/माता $= +1$, भाई/बहन/पति $= 0$, पुत्र/पुत्री $= -1$, दादा/नाना $= +2$।",
    "व्यंजक के अंतिम चर का लिंग सामान्यतः अज्ञात रहता है, सिवाय पति-पत्नी संबंध के।",
    "पति-पत्नी संबंध में एक का लिंग ज्ञात होते ही दूसरे का लिंग स्वतः सिद्ध हो जाता है।",
    "पश्चगामी कोडिंग (Backward Coding) में संबंध दायें से बायें परिभाषित होता है।",
    "बुआ का पीढ़ी मान $+1$ और लिंग महिला $[-]$ होता है।",
    "मामा का पीढ़ी मान $+1$ और लिंग पुरुष $[+]$ होता है।",
    "चारों विकल्पों का पूरा वंश वृक्ष कभी न बनाएं, सीधे एलिमिनेशन शॉर्टकट लगाएं।",
    "निर्देश ध्यान से पढ़ें कि $P * Q$ का अर्थ 'P, Q का...' है या 'Q, P का...'।",
    "माता के पिता 'नाना' ($+2$) और पिता के पिता 'दादा' ($+2$) होते हैं।"
  ],
  rapidRevision: {
    points: [
      "Gender Hack: Target Male $\\implies$ Eliminate Female options; Target Female $\\implies$ Eliminate Male options।",
      "Generation Formula: Grandparent = +2, Parent = +1, Sibling/Spouse = 0, Child = -1, Grandchild = -2।",
      "Last Element Rule: No operator after last letter $\\implies$ Gender Unknown (Unless married couple)।",
      "Direction Check: Verify whether $A * B$ means $A \\to B$ (Forward) or $B \\to A$ (Backward)।",
      "Zero Redraw: Test candidate expression using Generation Sum before sketching mini-tree।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_br_2_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_br_2');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_br_2 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_4', 'reas_br_2');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
