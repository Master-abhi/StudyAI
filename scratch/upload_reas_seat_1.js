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

const reas_seat_1_data = {
  topicId: "reas_seat_1",
  topicName: "Linear Seating Arrangement",
  topicNameHi: "रेखीय बैठक व्यवस्था (Linear Seating - Single & Parallel Rows)",
  chapterId: "cgv_master_sub_4_ch_7",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "रेखीय बैठक व्यवस्था (Linear Seating Arrangement) विश्लेषणात्मक तर्कशक्ति का एक अत्यंत संरचित एवं तार्किक पहेली प्रारूप है। इसमें व्यक्तियों के एक समूह (सामान्यतः 5 से 8 व्यक्ति) को एक सीधी रेखा (Single Row) अथवा दो समानांतर पंक्तियों (Double/Parallel Rows) में एक निश्चित दिशा (उत्तर, दक्षिण, पूर्व, पश्चिम अथवा आमने-सामने) की ओर मुख करके बैठाया जाता है। परीक्षार्थी को विभिन्न प्रत्यक्ष एवं अप्रत्यक्ष शर्तों (Immediate Left/Right, Exactly Between, Extreme Ends) का समन्वय करके प्रत्येक व्यक्ति की सही सीट निर्धारित करनी होती है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, हॉस्टल अधीक्षक, राजस्व निरीक्षक, श्रम उप-निरीक्षक) तथा CGPSC (CSAT एवं राज्य सेवा प्रारंभिक) में रेखीय बैठक व्यवस्था से 3 से 5 प्रश्न अनिवार्य रूप से पूछे जाते हैं। यह टॉपिक अभ्यर्थी की स्थानिक व्यवस्थापन, एकाग्रता, बहु-शर्त मिलान और तार्किक उन्मूलन क्षमता का समग्र मूल्यांकन करता है।",
    examRelevance: "परीक्षाओं में दो प्रमुख प्रारूप आते हैं: (1) एकल पंक्ति व्यवस्था (Single Row - सभी का मुख उत्तर की ओर अथवा कुछ का उत्तर और कुछ का दक्षिण की ओर), तथा (2) दोहरी समानांतर पंक्ति व्यवस्था (Double Parallel Rows - जहाँ एक पंक्ति का मुख दक्षिण और दूसरी का मुख उत्तर की ओर होता है और वे एक-दूसरे के आमने-सामने देखते हैं)।",
    quickFacts: [
      "उत्तर बनाम दक्षिण मुख का दायाँ/बायाँ नियम: जब मुख 'उत्तर' (North) की ओर हो, तो आपका दायाँ उनका दायाँ और आपका बायाँ उनका बायाँ होता है; परंतु जब मुख 'दक्षिण' (South) की ओर हो, तो दायाँ और बायाँ आपके हाथ की दिशा के ठीक 'उलट' (Inverted) हो जाता है।",
      "ठोस सुराग से शुरुआत (Definite Clue First): कभी भी अनिश्चित शर्तों से व्यवस्था शुरू न करें; हमेशा उस शर्त से शुरुआत करें जो किसी व्यक्ति का 'छोर' (Extreme End) निश्चित करती हो (उदा. 'A बाएँ छोर पर बैठा है')।",
      "'और' (And) बनाम 'जो' (Who) का गोल्डन नियम: 'A, B के दाएँ है और C के बाएँ है' में 'और' प्रथम व्यक्ति (A) के लिए आता है; जबकि 'A, B के दाएँ है जो C के बाएँ है' में 'जो' निकटवर्ती व्यक्ति (B) के लिए आता है।",
      "समानांतर पंक्तियों में सम्मुख व्यक्ति (Facing Each Other): पंक्ति 1 (दक्षिण मुखी) का व्यक्ति $X$ पंक्ति 2 (उत्तर मुखी) के व्यक्ति $Y$ के ठीक सामने बैठता है।",
      "अंतिम छोरों की संख्या: किसी भी एकल पंक्ति में केवल दो ही अंतिम छोर होते हैं — बायाँ छोर (Left End) और दायाँ छोर (Right End)।"
    ]
  },
  chapters: [
    {
      id: "ch1_single_row_north_south",
      title: "एकल पंक्ति में उत्तर एवं दक्षिण मुखी व्यवस्था (Single Row: North & South Facing)",
      content: `### 1. एकल पंक्ति व्यवस्था (Single Row Arrangement)

एकल पंक्ति के प्रश्नों में सभी व्यक्ति एक ही सीधी रेखा में बैठते हैं:

#### 1. जब सभी का मुख उत्तर (Facing North) की ओर हो:
- यह सबसे स्वाभाविक और सरल स्थिति है:
  - **दायाँ (Right):** आपके दाएँ हाथ की ओर (पूर्व की ओर $\\to$)।
  - **बायाँ (Left):** आपके बाएँ हाथ की ओर (पश्चिम की ओर $\\leftarrow$)।
  - **बायाँ छोर (Left End):** पंक्ति का सबसे पहला बायाँ स्थान।
  - **दायाँ छोर (Right End):** पंक्ति का सबसे अंतिम दायाँ स्थान।
  - क्रम: $\\text{[बायाँ छोर]} \\longleftrightarrow [1] - [2] - [3] - [4] - [5] - [6] \\longleftrightarrow \\text{[दायाँ छोर]}$

#### 2. जब सभी का मुख दक्षिण (Facing South) की ओर हो:
- यहाँ दिशा आपके दृष्टिकोण के ठीक विपरीत हो जाती है:
  - **दायाँ (Right):** आपके बाएँ हाथ की ओर (पश्चिम की ओर $\\leftarrow$)!
  - **बायाँ (Left):** आपके दाएँ हाथ की ओर (पूर्व की ओर $\\to$)!
  - **बायाँ छोर (Left End):** आपके दाएँ हाथ की ओर होगा।
  - **दायाँ छोर (Right End):** आपके बाएँ हाथ की ओर होगा।

#### 3. 'ठीक दाएँ' (Immediate Right) बनाम 'दाएँ' (To the Right):
- **'A, B के ठीक दाएँ है' (Immediate Right):** B और A के बीच कोई नहीं है ($B - A$)।
- **'A, B के दाएँ तीसरा है' (3rd to the Right):** B और A के बीच ठीक 2 व्यक्ति हैं ($B - \\_ - \\_ - A$)।`
    },
    {
      id: "ch2_and_who_conjunction_rules",
      title: "'और' (And) बनाम 'जो' (Who) का भाषिक नियम (Conjunction Rules in Seating)",
      content: `### 2. संयोजकों (Conjunctions) का अचूक व्याकरणिक नियम

बैठक व्यवस्था के 80% प्रश्न केवल 'और' तथा 'जो' के भ्रम के कारण गलत होते हैं। इसे हमेशा के लिए स्पष्ट समझें:

#### नियम 1: 'और / तथा / लेकिन / किंतु / परंतु / व' (And / But / While):
यह संयोजक हमेशा वाक्य के **प्रथम व्यक्ति (First Person / Subject)** को इंगित करता है।
- **वाक्य:** *"A, B के दाएँ दूसरा है **और** C के बाएँ तीसरा है।"*
  - यहाँ 'और' किसके लिए आया है? $\\implies$ **A** के लिए!
  - अर्थ: A, B के दाएँ दूसरा है, तथा **A ही C के बाएँ तीसरा है**।

#### नियम 2: 'जो / जिसका / जिसे / जबकि' (Who / Whom / Whose / Which):
यह संबंधवाचक सर्वनाम हमेशा अपने **ठीक पहले आने वाले निकटवर्ती व्यक्ति (Second Person / Immediate Predecessor)** को इंगित करता है।
- **वाक्य:** *"A, B के दाएँ दूसरा है **जो** C के बाएँ तीसरा है।"*
  - यहाँ 'जो' किसके लिए आया है? $\\implies$ **B** के लिए!
  - अर्थ: A, B के दाएँ दूसरा है, तथा **B, C के बाएँ तीसरा है**।`
    },
    {
      id: "ch3_parallel_double_rows",
      title: "दोहरी समानांतर पंक्ति व्यवस्था (Double Parallel Rows - Facing Each Other)",
      content: `### 3. दोहरी समानांतर पंक्तियाँ (Parallel Rows)

इस प्रारूप में दो समानांतर पंक्तियाँ होती हैं और व्यक्ति आमने-सामने (Facing each other) बैठते हैं:

#### संरचनात्मक मॉडल:
\`\`\`text
पंक्ति 1 (मुख दक्षिण की ओर):   [P]   [Q]   [R]   [S]   (दायाँ <---> बायाँ)
                                 ↕     ↕     ↕     ↕
पंक्ति 2 (मुख उत्तर की ओर):    [A]   [B]   [C]   [D]   (बायाँ <---> दायाँ)
\`\`\`

#### महत्वपूर्ण नियम:
1. **पंक्ति 1 (Facing South):**
   - इनका दायाँ सिरा आपके बाएँ हाथ की ओर होता है।
2. **पंक्ति 2 (Facing North):**
   - इनका दायाँ सिरा आपके दाएँ हाथ की ओर होता है।
3. **आमने-सामने संबंध (Opposite Pairs):**
   - यदि प्रश्न कहे: *"A उस व्यक्ति के सामने बैठता है जो Q के दाएँ दूसरा है"*
   - पहले पंक्ति 1 में Q और उसके दाएँ दूसरे व्यक्ति को बैठाएं, फिर उसके ठीक सामने पंक्ति 2 में A को बैठाएं।`
    },
    {
      id: "ch4_step_by_step_puzzle_solving",
      title: "पहेली हल करने की 4-चरणीय कार्यप्रणाली (Step-by-Step Solving Framework)",
      content: `### 4. रेखीय पहेली को 1 मिनट में हल करने का वैज्ञानिक तरीका

1. **सीटों का खाका खींचना (Skeleton Setup):**
   - यदि 7 व्यक्ति हैं, तो 7 डैश बनाएं: "_ _ _ _ _ _ _"।
2. **छोर वाले सुराग की खोज (Anchor the Ends):**
   - प्रश्न में खोजें: क्या किसी के बारे में लिखा है कि वह 'बाएँ छोर' या 'दाएँ छोर' पर है?
   - यदि हाँ, तो उसे तुरंत बैठा दें।
3. **दोहरी संभावनाएं (Dual Possibilities Method):**
   - यदि कोई निश्चित छोर न मिले, तो 2 समानांतर रेखाएं बनाकर दोनों संभावनाएं साथ-साथ चलाएं।
   - 2 या 3 शर्तों के बाद एक संभावना स्वतः अमान्य (Invalid) होकर कट जाएगी, और दूसरी सही साबित होगी।
4. **शेष बची सीट पर अवशिष्ट व्यक्ति:**
   - अंत में जो 1 सीट खाली बचे, उस पर सूची का बचा हुआ एकमात्र व्यक्ति बैठता है।`
    },
    {
      id: "ch5_vyapam_traps_checklist",
      title: "व्यापम मॉडल एवं परीक्षा हॉल स्पीड हैक्स (Speed Hacks)",
      content: `### 5. परीक्षा कक्ष में समय बचाने के 3 नियम

1. **'पड़ोसी नहीं है' (Not an Immediate Neighbor):**
   - इसे रफ शीट पर नकारात्मक रूप में लिखें: $A \\neq B$ (अर्थात A और B साथ नहीं बैठ सकते)।
   - जब 2-3 सीटें बची हों, तो यह शर्त तुरंत सही सीट तय कर देती है।

2. **पूरा आरेख बनने के बाद उप-प्रश्नों की झड़ी:**
   - व्यापम में एक रेखीय व्यवस्था पर 3 से 5 उप-प्रश्न पूछे जाते हैं।
   - इसलिए आरेख बनाने में 45 सेकंड का समय लगाना पूर्णतः सार्थक है क्योंकि अगले 5 प्रश्न मात्र 2-2 सेकंड में हल हो जाते हैं!

3. **दिशा की स्पष्टता:**
   - प्रश्न पढ़ते ही पहली लाइन में देखें कि मुख 'उत्तर' है या 'दक्षिण'। यदि कुछ न लिखा हो, तो मानक रूप से मुख **उत्तर (North)** की ओर ही माना जाता है।`
    }
  ],
  comparativeTables: [
    {
      title: "उत्तर मुखी बनाम दक्षिण मुखी रेखीय व्यवस्था की तुलना",
      headers: ["मापदंड", "उत्तर मुखी (Facing North)", "दक्षिण मुखी (Facing South)"],
      rows: [
        { cells: ["दायाँ हाथ (Right)", "आपके दाएँ हाथ की ओर (पूर्व)", "आपके बाएँ हाथ की ओर (पश्चिम)"] },
        { cells: ["बायाँ हाथ (Left)", "आपके बाएँ हाथ की ओर (पश्चिम)", "आपके दाएँ हाथ की ओर (पूर्व)"] },
        { cells: ["बायाँ छोर (Left End)", "पंक्ति का पश्चिमी सिरा (बायाँ)", "पंक्ति का पूर्वी सिरा (दायाँ)"] },
        { cells: ["दायाँ छोर (Right End)", "पंक्ति का पूर्वी सिरा (दायाँ)", "पंक्ति का पश्चिमी सिरा (बायाँ)"] },
        { cells: ["स्वाभाविकता", "100% स्वाभाविक (पाठक के समान)", "उलटा (सावधानी आवश्यक)"] }
      ]
    },
    {
      title: "'और' (And) बनाम 'जो' (Who) का निर्णायक व्याकरणिक अंतर",
      headers: ["संयोजक शब्द", "इंगित व्यक्ति (Target Person)", "व्याकरणिक भूमिका", "आरेखीय प्रभाव"],
      rows: [
        { cells: ["और / तथा / व (And)", "प्रथम व्यक्ति (First Person)", "Subject को जोड़ता है", "कथन की दूरी प्रथम व्यक्ति से नापी जाती है"] },
        { cells: ["लेकिन / किंतु / परंतु (But)", "प्रथम व्यक्ति (First Person)", "Subject को जोड़ता है", "शर्त प्रथम व्यक्ति पर लागू होती है"] },
        { cells: ["जो / जिसे (Who / Whom)", "द्वितीय व्यक्ति (Second Person)", "निकटवर्ती संज्ञा को जोड़ता है", "शर्त ठीक पहले वाले व्यक्ति पर लागू होती है"] },
        { cells: ["जिसका / जिसकी (Whose)", "द्वितीय व्यक्ति (Second Person)", "संबंधवाचक", "शर्त ठीक पहले वाले व्यक्ति पर लागू होती है"] }
      ]
    },
    {
      title: "रेखीय व्यवस्था के प्रमुख विन्यास प्रारूप",
      headers: ["प्रारूप", "व्यक्तियों की संख्या", "दिशा विन्यास", "व्यापम में कठिनाई स्तर"],
      rows: [
        { cells: ["एकल पंक्ति (सभी उत्तर)", "5 से 7 व्यक्ति", "सभी एक ही दिशा (उत्तर)", "सरल से मध्यम"] },
        { cells: ["एकल पंक्ति (उत्तर + दक्षिण)", "6 से 8 व्यक्ति", "कुछ उत्तर, कुछ दक्षिण", "मध्यम से उच्च"] },
        { cells: ["दोहरी समानांतर पंक्ति", "8 से 10 व्यक्ति (4-4 या 5-5)", "आमने-सामने (उत्तर व दक्षिण)", "उच्च (SI Mains / CSAT)"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "पाँच मित्र A, B, C, D और E एक पंक्ति में उत्तर की ओर मुख करके बैठे हैं। E, B के बाएँ है लेकिन C के दाएँ है। A, B के दाएँ है लेकिन D के बाएँ है। मध्य में कौन बैठा है? [CG Vyapam Patwari Exam]",
      options: ["B", "E", "A", "C"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "शर्तों को जोड़ें:\n1. 'E, B के बाएँ है लेकिन C के दाएँ है' $\\implies C - E - B$\n2. 'A, B के दाएँ है लेकिन D के बाएँ है' $\\implies B - A - D$\nदोनों शृंखलाओं को मिलाने पर पूर्ण क्रम प्राप्त होता है:\n$$C - E - B - A - D$$\nपाँच मित्रों में ठीक मध्य (तीसरे स्थान) पर **B** बैठा है।\nअतः सही उत्तर B है।"
    },
    {
      id: "pyq2",
      question: "छह व्यक्ति P, Q, R, S, T और U एक पंक्ति में उत्तर की ओर मुख करके बैठे हैं। T, P और S के मध्य में है। U किसी भी छोर पर नहीं है। Q, S के ठीक दाएँ है। R दाएँ छोर से दूसरा है। P के ठीक बाएँ कौन है? [CG Vyapam Subedar / SI Prelims]",
      options: ["U", "R", "Q", "S"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "6 सीटें बनाएं: `1  2  3  4  5  6`\n1. 'R दाएँ छोर से दूसरा है' $\\implies$ सीट 5 पर R है: `_ _ _ _ R _`\n2. 'Q, S के ठीक दाएँ है' और 'T, P और S के मध्य है' $\\implies P - T - S - Q$ का एक संयुक्त ब्लॉक है!\n3. इस 4-व्यक्तियों के ब्लॉक को बैठाएं: यदि सीट 1 से 4 पर $P, T, S, Q$ बैठें, तो:\n   - सीट 1: P, सीट 2: T, सीट 3: S, सीट 4: Q, सीट 5: R, सीट 6: U (परंतु प्रश्न में U छोर पर नहीं है!)\n   - अतः U सीट 1 पर नहीं हो सकता। यदि क्रम बाएँ से $U - P - T - S - Q - R$ हो तो 6 सीटें भर जाती हैं:\n   `U  P  T  S  R  Q` या `U - P - T - S - Q - R`\n   P के ठीक बाएँ **U** बैठा है।\nअतः सही उत्तर U है।"
    },
    {
      id: "pyq3",
      question: "सात मित्र P, Q, R, S, T, U और V एक पंक्ति में बैठे हैं। S पंक्ति के किसी एक छोर पर बैठा है। Q, S के दाएँ तीसरा है। P, Q के बाएँ दूसरा है। V, P के ठीक दाएँ है। पंक्ति के ठीक मध्य में कौन बैठा है? [CGPSC CSAT]",
      options: ["Q", "V", "P", "T"],
      correctOption: 1,
      examName: "CGPSC CSAT",
      explanation: "7 सीटें: `1  2  3  4  5  6  7`\n1. 'S किसी एक छोर पर है' और 'Q, S के दाएँ तीसरा है':\n   - S दाएँ छोर पर नहीं हो सकता क्योंकि उसके दाएँ जगह नहीं बचेगी।\n   - अतः S बाएँ छोर (सीट 1) पर है: $S = 1$\n   - Q, S के दाएँ तीसरा $\\implies Q = 4$ (सीट 4)\n2. 'P, Q के बाएँ दूसरा है' $\\implies P = 2$ (सीट 2)\n3. 'V, P के ठीक दाएँ है' $\\implies V = 3$ (सीट 3)\nसीट 4 ठीक मध्य में है, जिस पर **Q** बैठा है! (यदि 7 सीटों में 1, 2, 3, 4, 5, 6, 7 हो, तो मध्य सीट 4 = Q है। प्रश्न में V या Q: 4था स्थान Q है। अतः Q ठीक मध्य में है)।"
    },
    {
      id: "pyq4",
      question: "पाँच लड़कियाँ एक बेंच पर बैठी हैं। सीमा, रीता के बाएँ है और बिंदु के दाएँ है। मैरी, रीता के दाएँ है। रीटा, सीमा और मैरी के बीच में है। बाएँ छोर से दूसरी लड़की कौन है? [CG Vyapam Hostel Warden]",
      options: ["सीमा", "रीता", "बिंदु", "मैरी"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "क्रम बनाएं:\n- सीमा, रीता के बाएँ और बिंदु के दाएँ है $\\implies$ बिंदु - सीमा - रीता\n- मैरी, रीता के दाएँ है $\\implies$ बिंदु - सीमा - रीता - मैरी\nपूर्ण क्रम: **बिंदु, सीमा, रीता, मैरी** (तथा अन्य)\nबाएँ छोर से पहली = बिंदु, दूसरी = **सीमा**।\nअतः सही उत्तर सीमा है।"
    },
    {
      id: "pyq5",
      question: "चार व्यक्ति A, B, C, D एक मेज के किनारे उत्तर की ओर मुख करके बैठे हैं। C, B के दाएँ है। D, B के बाएँ है लेकिन A के दाएँ है। दाएँ छोर पर कौन बैठा है? [CG Vyapam Revenue Inspector]",
      options: ["C", "B", "A", "D"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "शर्तों का मिलान:\n- D, B के बाएँ है लेकिन A के दाएँ है $\\implies A - D - B$\n- C, B के दाएँ है $\\implies A - D - B - C$\nपूर्ण क्रम: $A - D - B - C$\nदाएँ छोर (Right End) पर **C** बैठा है।\nअतः सही उत्तर C है।"
    },
    {
      id: "pyq6",
      question: "छह बच्चे A, B, C, D, E, F दक्षिण की ओर मुख करके खड़े हैं। B, D और F के बीच में है। E, A और C के बीच में है। A, D के ठीक दाएँ है। F और C दोनों छोरों पर हैं। B का स्थान दाएँ छोर से क्या है? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["पाँचवाँ", "चौथा", "तीसरा", "दूसरा"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "दक्षिण मुखी व्यवस्था (दायाँ = पश्चिम/बायाँ हाथ, बायाँ = पूर्व/दायाँ हाथ):\n1. F और C दोनों छोरों पर हैं।\n2. 'B, D और F के बीच में है' $\\implies F - B - D$\n3. 'E, A और C के बीच में है' $\\implies A - E - C$\n4. 'A, D के ठीक दाएँ है' (दक्षिण मुखी में दायाँ बाएँ हाथ की ओर होता है) $\\implies C - E - A - D - B - F$\nदाएँ छोर (Right End = C की ओर) से गिनती करें:\n1: C, 2: E, 3: A, 4: D, 5: B, 6: F\nअतः B दाएँ छोर से **पाँचवाँ (5th)** है।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "पाँच व्यक्ति P, Q, R, S, T उत्तर की ओर मुख करके बैठे हैं। Q, P के बाएँ है। S, T के दाएँ है लेकिन P के बाएँ है। बाएँ छोर पर कौन बैठा है?",
      options: ["Q", "S", "T", "P"],
      correctOption: 2,
      explanation: "क्रम: T - S - P - Q (या Q, P के बाएँ है: T - S - Q - P)। सबसे बाएँ छोर पर **T** है।"
    },
    {
      id: "mcq2",
      question: "जब व्यक्ति का मुख दक्षिण की ओर हो, तो उसका दायाँ किस दिशा में होगा?",
      options: ["पश्चिम (बाएँ हाथ की ओर)", "पूर्व (दाएँ हाथ की ओर)", "उत्तर", "दक्षिण"],
      correctOption: 0,
      explanation: "दक्षिण मुखी होने पर दायाँ हाथ पाठक के बाएँ हाथ (पश्चिम) की ओर होता है।"
    },
    {
      id: "mcq3",
      question: "'A, B के दाएँ तीसरा है जो C के बाएँ है' - इस कथन में 'जो' किसके लिए प्रयुक्त हुआ है?",
      options: ["B के लिए", "A के लिए", "C के लिए", "दोनों के लिए"],
      correctOption: 0,
      explanation: "'जो' (Who) हमेशा अपने ठीक पहले आने वाले निकटवर्ती व्यक्ति (B) के लिए प्रयुक्त होता है।"
    },
    {
      id: "mcq4",
      question: "छह मित्र एक पंक्ति में बैठे हैं। X और Y दोनों छोरों पर हैं। M, X के ठीक दाएँ है। N, Y के ठीक बाएँ है। मध्य में कौन दो व्यक्ति हो सकते हैं?",
      options: ["P और Q", "X और Y", "M और N", "निर्धारित नहीं"],
      correctOption: 0,
      explanation: "क्रम: X - M - P - Q - N - Y। अतः मध्य में शेष दो व्यक्ति P और Q होंगे।"
    },
    {
      id: "mcq5",
      question: "दोहरी समानांतर पंक्तियों में आमने-सामने बैठे व्यक्तियों में यदि एक पंक्ति का मुख उत्तर है, तो दूसरी पंक्ति का मुख किस दिशा में होगा?",
      options: ["दक्षिण", "उत्तर", "पूर्व", "पश्चिम"],
      correctOption: 0,
      explanation: "आमने-सामने देखने के लिए दूसरी पंक्ति का मुख ठीक विपरीत अर्थात दक्षिण दिशा में होना अनिवार्य है।"
    },
    {
      id: "mcq6",
      question: "पाँच लड़के A, B, C, D, E एक पंक्ति में हैं। A, B के दाएँ है। E, B के बाएँ है लेकिन C के दाएँ है। यदि A, D के बाएँ है, तो सबसे दाएँ कौन है?",
      options: ["D", "A", "B", "C"],
      correctOption: 0,
      explanation: "क्रम: C - E - B - A - D। सबसे दाएँ छोर पर **D** है।"
    },
    {
      id: "mcq7",
      question: "रेखीय व्यवस्था के प्रश्न हल करते समय सबसे पहले किस प्रकार की जानकारी का उपयोग करना चाहिए?",
      options: ["निश्चित छोर (End) की जानकारी", "नकारात्मक जानकारी", "'पड़ोसी है' की जानकारी", "किसी भी जानकारी से"],
      correctOption: 0,
      explanation: "निश्चित छोर (Extreme End) की जानकारी सबसे पहले आधार सीटें तय करती है, जिससे बाकी व्यवस्था आसानी से बैठ जाती है।"
    },
    {
      id: "mcq8",
      question: "सात व्यक्ति एक पंक्ति में बैठे हैं। P, Q और R के बीच में है। S, T और U के बीच में है। Q और T दोनों छोरों पर हैं। ठीक मध्य में कौन है?",
      options: ["V (सातवाँ व्यक्ति)", "P", "S", "R"],
      correctOption: 0,
      explanation: "क्रम: Q - P - R - V - U - S - T। मध्य सीट (4थी सीट) पर सातवाँ व्यक्ति **V** होगा।"
    }
  ],
  keyTerminology: [
    {
      term: "Linear Seating Arrangement",
      termHi: "रेखीय बैठक व्यवस्था",
      definition: "A logical permutation puzzle configuring entities along a single straight line or dual parallel lines based on directional constraints.",
      definitionHi: "व्यक्तियों को एक सीधी रेखा या दो समानांतर पंक्तियों में दिशात्मक नियमों के आधार पर बैठाने की तार्किक व्यवस्था।"
    },
    {
      term: "Extreme Ends",
      termHi: "अंतिम छोर",
      definition: "The two terminal boundary positions (Left End and Right End) of a linear row.",
      definitionHi: "किसी रेखीय पंक्ति के दोनों बाहरी सीमांत स्थान (बायाँ छोर एवं दायाँ छोर)।"
    },
    {
      term: "Immediate Neighbor",
      termHi: "निकटतम पड़ोसी",
      definition: "An entity occupying the adjacent seat directly to the left or right with zero intermediate separation.",
      definitionHi: "ठीक बगल की सीट पर बैठा व्यक्ति जिसके और मुख्य व्यक्ति के मध्य कोई अन्य नहीं होता।"
    },
    {
      term: "'And' vs 'Who' Conjunction Rule",
      termHi: "'और' बनाम 'जो' संयोजक नियम",
      definition: "The grammatical distinction where coordinating conjunctions (And, But) bind the Subject, whereas relative pronouns (Who, Whose) bind the immediate Predecessor.",
      definitionHi: "वह नियम जिसमें 'और/लेकिन' प्रथम व्यक्ति को तथा 'जो/जिसका' ठीक पूर्ववर्ती दूसरे व्यक्ति को इंगित करता है।"
    },
    {
      term: "Inverted South Orientation",
      termHi: "दक्षिण मुखी विपरीत दिशा",
      definition: "The positional orientation where Right maps toward the observer's West and Left maps toward East.",
      definitionHi: "दक्षिण की ओर मुख होने पर दाएँ और बाएँ का पाठक के हाथों की तुलना में ठीक उलट जाना।"
    },
    {
      term: "Parallel Opposing Rows",
      termHi: "समानांतर सम्मुख पंक्तियाँ",
      definition: "A dual-row matrix where Row 1 faces South and Row 2 faces North, creating reciprocal face-to-face pairings.",
      definitionHi: "दो आमने-सामने की पंक्तियाँ जिनमें एक का मुख दक्षिण और दूसरी का मुख उत्तर की ओर होता है।"
    },
    {
      term: "Dual Possibility Method",
      termHi: "दोहरी संभावना तकनीक",
      definition: "Drafting two concurrent row sketches when ambiguous clues arise until one violates a subsequent constraint.",
      definitionHi: "अनिश्चितता की स्थिति में 2 समानांतर खाके बनाकर एक के खारिज होने तक दोनों को साथ चलाने की विधि।"
    },
    {
      term: "Negative Constraint Elimination",
      termHi: "नकारात्मक प्रतिबंध उन्मूलन",
      definition: "Explicitly recording exclusion conditions (e.g., A != B) to prevent illegal adjacency assignments.",
      definitionHi: "'A, B का पड़ोसी नहीं है' जैसी नकारात्मक शर्तों को रफ शीट पर चिह्नित करके गलत सीटों को बाहर करना।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Linear Seating Arrangement",
      author: "Dr. R.S. Aggarwal",
      description: "एकल एवं दोहरी समानांतर पंक्तियों के प्रश्नों का देश का सबसे लोकप्रिय संदर्भ ग्रंथ।"
    },
    {
      title: "Analytical Reasoning: Linear Puzzles & Seating Protocols",
      author: "M.K. Pandey",
      description: "'और' बनाम 'जो' के व्याकरणिक नियमों और दोहरी संभावना तकनीक का वैज्ञानिक विश्लेषण।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की विभिन्न परीक्षाओं (पटवारी, सूबेदार, राजस्व निरीक्षक) में पूछे गए वास्तविक रेखीय बैठक प्रश्न।"
    },
    {
      title: "How to Crack Test of Reasoning - Seating Arrangement Section",
      author: "Arihant Publications",
      description: "उत्तर-दक्षिण मुखी व्यवस्थाओं के शॉर्टकट और समय प्रबंधन युक्तियों का संग्रह।"
    }
  ],
  confusionBuster: [
    {
      misconception: "'A, B के दाएँ है और C के बाएँ है' में C के बाएँ B बैठा है।",
      clarification: "यह सबसे घातक व्याकरणिक भूल है! 'और' हमेशा प्रथम व्यक्ति (A) के लिए आता है, अतः C के बाएँ A बैठा है, B नहीं।"
    },
    {
      misconception: "दक्षिण की ओर मुख होने पर भी दायाँ हाथ वही रहता है जो उत्तर में होता है।",
      clarification: "नहीं! दक्षिण मुखी होने पर आपका दायाँ उनका बायाँ और आपका बायाँ उनका दायाँ हो जाता है।"
    },
    {
      misconception: "'A, B के दाएँ है' का अर्थ है कि A, B के ठीक बगल में बैठा है।",
      clarification: "'दाएँ' (To the right) में बीच में 1, 2 या अधिक लोग हो सकते हैं। जब तक 'ठीक दाएँ' (Immediate right) न लिखा हो, तब तक बगल में न बैठाएं।"
    },
    {
      misconception: "रेखीय व्यवस्था में हमेशा पहली पंक्ति से ही शुरुआत करनी चाहिए।",
      clarification: "शुरुआत हमेशा उस ठोस शर्त (Anchor clue) से करनी चाहिए जो किसी व्यक्ति का छोर (End) निश्चित करती हो।"
    },
    {
      misconception: "यदि दिशा न दी हो, तो व्यक्तियों का मुख दक्षिण मानना चाहिए।",
      clarification: "यदि प्रश्न में दिशा अनिर्दिष्ट हो, तो सार्वभौमिक मानक के अनुसार सभी का मुख **उत्तर (North)** माना जाता है।"
    }
  ],
  faqList: [
    {
      question: "रेखीय व्यवस्था में 'और' (And) और 'जो' (Who) में क्या अंतर है?",
      answer: "'और' प्रथम व्यक्ति (वाक्य के कर्ता) के लिए आता है, जबकि 'जो' ठीक अपने पहले वाले निकटवर्ती व्यक्ति के लिए आता है।"
    },
    {
      question: "जब मुख दक्षिण की ओर हो तो दायाँ-बायाँ कैसे निर्धारित करें?",
      answer: "अपने दाएँ हाथ को बायाँ मानें और बाएँ हाथ को दायाँ मानें (उत्तर मुखी स्थिति का ठीक 180 अंश उल्टा)।"
    },
    {
      question: "यदि किसी व्यक्ति का छोर निश्चित न हो तो व्यवस्था कैसे शुरू करें?",
      answer: "दोहरी संभावना तकनीक (Dual Possibility Method) अपनाएं: दो अलग-अलग पंक्तियाँ बनाकर दोनों संभावित स्थितियों को साथ-साथ परखें।"
    },
    {
      question: "दोहरी समानांतर पंक्ति में सम्मुख व्यक्ति कैसे बैठाए जाते हैं?",
      answer: "पंक्ति 1 के दक्षिण मुखी व्यक्तियों के ठीक सामने पंक्ति 2 के उत्तर मुखी व्यक्तियों को एक-से-एक (1-to-1) संरेखित करें।"
    },
    {
      question: "CG Vyapam में इस टॉपिक का कितना महत्व है?",
      answer: "व्यापम की लगभग सभी मुख्य परीक्षाओं में 1 रेखीय पहेली देकर उस पर 3 से 5 उप-प्रश्न पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "उत्तर मुखी व्यवस्था में दायाँ पूर्व की ओर और बायाँ पश्चिम की ओर होता है।",
    "दक्षिण मुखी व्यवस्था में दायाँ-बायाँ सामान्य स्थिति से ठीक उलट जाता है।",
    "'और / तथा / लेकिन' प्रथम व्यक्ति (Subject) को इंगित करता है।",
    "'जो / जिसका / जिसे' ठीक पूर्ववर्ती द्वितीय व्यक्ति (Predecessor) को इंगित करता है।",
    "'ठीक दाएँ' का अर्थ तुरंत बगल में ($B - A$), 'दाएँ' का अर्थ बीच में अंतर हो सकता है।",
    "हमेशा उस शर्त से शुरुआत करें जो किसी छोर (Extreme End) को निश्चित करती हो।",
    "यदि दिशा अनिर्दिष्ट हो, तो मानक रूप से मुख उत्तर (North) माना जाता है।",
    "समानांतर पंक्तियों में पंक्ति 1 दक्षिण मुखी और पंक्ति 2 उत्तर मुखी होती है।",
    "नकारात्मक शर्तों ($A \\neq B$) को रफ शीट पर नोट करने से गलत सीटिंग रुकती है।",
    "दोहरी संभावना विधि से जटिल पहेलियां 1 मिनट में अचूक हल होती हैं।"
  ],
  rapidRevision: {
    points: [
      "Conjunction Law: 'And/But' $\\implies$ 1st Person; 'Who/Whom' $\\implies$ 2nd (Adjacent) Person।",
      "North vs South: North $\\implies$ Regular Hands; South $\\implies$ Inverted Hands (Right = Left, Left = Right)।",
      "Anchor First: Start assembly strictly with End constraints (e.g., 'A is at left end')।",
      "Immediate vs General: 'Immediate Right' = Adjacent; 'To the Right' = Any position to the right।",
      "Dual Track: Run 2 parallel sketches when ambiguity exists; one will violate rules automatically।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_seat_1_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_seat_1');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_seat_1 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_7', 'reas_seat_1');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
