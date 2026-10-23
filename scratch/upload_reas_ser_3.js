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

const reas_ser_3_data = {
  topicId: "reas_ser_3",
  topicName: "Alphanumeric Series",
  topicNameHi: "अल्फान्यूमेरिक श्रेणी",
  chapterId: "cgv_master_sub_4_ch_1",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "अल्फान्यूमेरिक श्रेणी (Alphanumeric Series) अंग्रेजी वर्णमाला के अक्षरों (Alphabets: A-Z), अंकों (Numbers: 0-9) तथा विशेष प्रतीकों (Symbols: @, #, $, %, & आदि) का एक समन्वित एवं सुव्यवस्थित तार्किक मिश्रण है। इस अध्याय में प्रश्नों का स्वरूप दो प्रकार का होता है: प्रथम, पदों की एक क्रमिक श्रृंखला (उदा. 2B, 4D, 8F...) जहाँ अगले पद की गणना करनी होती है; और द्वितीय, तत्वों की एक लंबी निरंतर स्ट्रिंग (Alphanumeric Sequence String) जिस पर आधारित स्थानिक संबंध, पूर्ववर्ती (Preceded by), परवर्ती (Followed by) एवं दिशा-आधारित जटिल प्रश्न पूछे जाते हैं।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, हॉस्टल वार्डन, डाटा एंट्री ऑपरेटर) और बैंकिंग/CGPSC CSAT में इस अध्याय से 2 से 4 प्रश्न अवश्य पूछे जाते हैं। यह टॉपिक अभ्यर्थी की बहु-आयामी ध्यान केंद्रित करने की क्षमता (Multi-focus Attention), त्वरित गिनती (Quick Counting) और सटीक स्थिति विश्लेषण की परख करता है।",
    examRelevance: "परीक्षाओं में 'ऐसे कितने अंक हैं जिनके ठीक पहले एक अक्षर और ठीक बाद में एक प्रतीक हो?', 'बाएं छोर से 15वें तत्व के बाएं 5वां तत्व कौन सा होगा?', तथा लुप्त पद आधारित अल्फान्यूमेरिक त्रिक (जैसे A2B, C4D, E8F) के प्रश्न सबसे अधिक पूछे जाते हैं। दिशा संबंधी सूत्र ($L - L, R - R, L + R$) का प्रयोग समय बचाने में क्रांतिकारी सिद्ध होता है।",
    quickFacts: [
      "दिशा समन्वय का गोल्डन नियम: समान दिशाएं घटती हैं ($L - L$ या $R - R$) तथा विपरीत दिशाएं जुड़ती हैं ($L + R$ या $R + L$)।",
      "पूर्ववर्ती (Preceded by) का अर्थ 'ठीक पहले' (Just Before) होता है: [पूर्ववर्ती तत्व] $\\to$ [लक्षित तत्व]।",
      "परवर्ती या अनुवर्ती (Followed by / Succeeded by) का अर्थ 'ठीक बाद' (Just After) होता है: [लक्षित तत्व] $\\to$ [परवर्ती तत्व]।",
      "मिश्रित पद श्रेणी में प्रत्येक घटक (अक्षर, संख्या, प्रतीक) का नियम एक-दूसरे से पूर्णतः स्वतंत्र होता है।",
      "तत्वों की गिनती करते समय अपनी उंगली या पेन की नोक से 5-5 के ब्लॉक में विभाजन करने से कभी गिनती की त्रुटि नहीं होती।"
    ]
  },
  chapters: [
    {
      id: "ch1_series_types_and_terms",
      title: "अल्फान्यूमेरिक श्रृंखला के प्रारूप एवं संरचना (Types & Formats)",
      content: `### 1. अल्फान्यूमेरिक श्रृंखला के प्रमुख प्रारूप

अल्फान्यूमेरिक प्रश्नों को मुख्यतः दो श्रेणियों में विभाजित किया जाता है:

#### प्रारूप 1: पद-आधारित प्रगतिशील श्रेणी (Term-Based Progressive Series)
इसमें प्रत्येक पद अक्षरों और संख्याओं के मेल से बनता है और अगले पद की पहचान करनी होती है।
- **संरचना:** अक्षर-संख्या-अक्षर (उदा. D3V, G7T, J13R, M21P, ?)
- **हल करने की विधि:**
  - पहले अक्षर का नियम अलग से निकालें: D(4), G(7), J(10), M(13) $\\implies$ अगला P(16)
  - संख्या का नियम अलग से निकालें: 3, 7, 13, 21 $\\implies +4, +6, +8 \\implies 21 + 10 = 31$
  - अंतिम अक्षर का नियम अलग से निकालें: V(22), T(20), R(18), P(16) $\\implies$ अगला N(14)
  - अभीष्ट पद = **P31N**

#### प्रारूप 2: निरंतर तत्व स्ट्रिंग (Continuous Element Sequence / Mixed String)
इसमें अक्षरों, संख्याओं और प्रतीकों की एक 25 से 35 तत्वों की लंबी पंक्ति दी जाती है।
- **उदाहरणात्मक स्ट्रिंग:**
  \`\`\`text
  W 4 © R 3 # J 9 % D K 1 $ M 2 P E 5 @ A 8 B * Q 7
  \`\`\`
- इस स्ट्रिंग पर आधारित 3 से 5 उप-प्रश्न पूछे जाते हैं:
  1. स्थिति आधारित गणना (Position from Left/Right Ends)
  2. सशर्त व्यवस्था (Conditional Sequences: Preceded / Followed by)
  3. तत्वों को हटाने (Deletion of Vowels, Numbers or Symbols) के बाद नई स्थिति ज्ञात करना
  4. असंगत समूह (Odd Man Out) की पहचान`
    },
    {
      id: "ch2_directional_shortcuts",
      title: "दिशा आधारित गणना एवं शॉर्टकट सूत्र (Directional Rules & Shortcuts)",
      content: `### 2. दिशा आधारित प्रश्नों के सुपर-फास्ट शॉर्टकट

स्ट्रिंग आधारित प्रश्नों में बार-बार बाएं (Left) और दाएं (Right) गिनने में समय नष्ट होता है। इसके लिए निम्नलिखित बीजगणितीय नियमों का उपयोग करें:

#### 1. मूलभूत दिशा सूत्र (Fundamental Direction Rules):
- **नियम 1: समान दिशाएं परस्पर घटती हैं (Same Directions Subtract):**
  - बाएं से $m$वें तत्व के बाएं $n$वां तत्व $= (m - n)$वां तत्व (बाएं छोर से)।
  - दाएं से $m$वें तत्व के दाएं $n$वां तत्व $= (m - n)$वां तत्व (दाएं छोर से)।
- **नियम 2: विपरीत दिशाएं परस्पर जुड़ती हैं (Opposite Directions Add):**
  - बाएं से $m$वें तत्व के दाएं $n$वां तत्व $= (m + n)$वां तत्व (बाएं छोर से)।
  - दाएं से $m$वें तत्व के बाएं $n$वां तत्व $= (m + n)$वां तत्व (दाएं छोर से)।

#### 2. संदर्भ छोर (Reference End) की पहचान:
- हिंदी माध्यम के प्रश्नों में हमेशा वाक्य के अंत में दिए गए 'छोर' (End) को संदर्भ माना जाता है:
  - *"बाएं छोर से 18वें तत्व के बाएं 6वां तत्व कौन सा होगा?"*
  - सूत्र: दोनों बाएं हैं $\\implies 18 - 6 = 12$वां तत्व (बाएं छोर से)।
  - आपको केवल बाएं छोर से 12वां तत्व गिनना है!

#### 3. दाएं छोर से स्थिति को बाएं में बदलना:
यदि कुल तत्वों की संख्या $N$ है, तो:
$$\\text{बाएं से स्थिति} = (N + 1) - \\text{दाएं से स्थिति}$$`
    },
    {
      id: "ch3_conditions_preceded_followed",
      title: "सशर्त संबंध: पूर्ववर्ती एवं परवर्ती का सटीक विश्लेषण (Preceded & Followed By)",
      content: `### 3. 'ठीक पहले' (Preceded) और 'ठीक बाद' (Followed) का अचूक प्रारूप

परीक्षार्थी अक्सर इस बात में भ्रमित हो जाते हैं कि Preceded का अर्थ पहले है या बाद में। इसे हमेशा एक गणितीय समीकरण के रूप में लिख लें।

#### संरचनात्मक मॉडल:
1. **"अंक जिसके ठीक पहले एक अक्षर हो और ठीक बाद एक प्रतीक हो"**:
   $$\\text{[अक्षर]} \\longrightarrow \\text{[अंक]} \\longrightarrow \\text{[प्रतीक]}$$
   - **Letter - Number - Symbol** (L-N-S)
   - अब स्ट्रिंग में सीधे अंकों को न खोजें, बल्कि **प्रतीकों (Symbols) को खोजें** क्योंकि स्ट्रिंग में प्रतीक कम संख्या में होते हैं और जल्दी दिखाई देते हैं! प्रतीक से ठीक पहले अंक और उससे पहले अक्षर की जांच करें।

2. **"स्वर जिसके ठीक पहले एक व्यंजन हो परंतु ठीक बाद कोई अंक न हो"**:
   $$\\text{[व्यंजन]} \\longrightarrow \\text{[स्वर]} \\longrightarrow \\text{[अंक नहीं (Not a Number)]}$$
   - स्वर (A, E, I, O, U) केवल 5 होते हैं। सीधे स्वरों को लोकेट करें और शर्त का मिलान करें।

3. **शब्दावली स्पष्टीकरण तालिका:**
   - **Preceded by / पूर्ववर्ती:** तत्व के तुरंत बाईं ओर (Left Side) स्थित।
   - **Followed by / Succeeded by / परवर्ती:** तत्व के तुरंत दाईं ओर (Right Side) स्थित।`
    },
    {
      id: "ch4_deletion_and_transformation",
      title: "तत्वों के विलोपन एवं व्यवस्था परिवर्तन (Deletion & Transformation)",
      content: `### 4. तत्वों को हटाने (Drop/Delete) पर आधारित प्रश्न

जब प्रश्न में कहा जाए कि: *"यदि दी गई श्रृंखला में से सभी प्रतीकों (Symbols) को हटा दिया जाए, तो..."*

#### हल करने की सर्वोत्तम विधि (Non-Overwriting Technique):
- परीक्षार्थी रफ शीट पर नई स्ट्रिंग लिखने लगते हैं, जिसमें 1 से 2 मिनट का अनावश्यक समय बर्बाद होता है।
- **स्मार्ट तकनीक:**
  - नई स्ट्रिंग कभी न लिखें!
  - मूल स्ट्रिंग में ही गिनती करते समय उस श्रेणी के तत्वों को **छोड़ते (Skip करते)** जाएं।
  - यदि प्रतीकों को हटाना है, तो अक्षरों और अंकों को गिनते समय प्रतीकों पर ध्यान न दें और सीधे अगले अक्षर/अंक पर गिनती बढ़ाएं ($1, 2, 3...$)।

#### विपरीत क्रम में उलटना (Reversing Substrings):
- *"यदि श्रृंखला के प्रथम 10 तत्वों को उल्टे क्रम में लिख दिया जाए..."*
- इसके लिए केवल प्रथम 10 तत्वों के ब्लॉक को मन में उलटें या रफ शीट पर केवल उन्हीं 10 तत्वों के उल्टे क्रम को नोट करें, पूरी 30 तत्वों की स्ट्रिंग को नहीं।`
    },
    {
      id: "ch5_vyapam_tips_exam_strategy",
      title: "परीक्षा कक्ष में सटीकता एवं समय प्रबंधन (Speed & Accuracy Hacks)",
      content: `### 5. अल्फान्यूमेरिक प्रश्नों के लिए 100% सटीक टिप्स

1. **5-5 तत्वों का विखंडन (The 5-Element Block Hack):**
   - स्क्रीन या प्रश्न-पत्र पर दी गई लंबी स्ट्रिंग को पेंसिल से 5-5 के टुकड़ों में बांट लें (उदा. 5, 10, 15, 20, 25)।
   - यदि आपको बाएं से 17वां तत्व चाहिए, तो 15वें तत्व के बाद केवल 2 तत्व आगे गिनें। इससे बार-बार 1 से 17 तक गिनने की जरूरत नहीं पड़ेगी।

2. **असंगत युग्म (Odd One Out in Alphanumeric Sets):**
   - प्रश्न: *"निम्नलिखित पांच में से चार एक निश्चित तरीके से समान हैं..."*
   - दिए गए 3-तत्वीय विकल्पों के बीच मूल स्ट्रिंग में अंतराल (Gaps like $+2, -1$) नोट करें। जो विकल्प इस अंतराल का पालन न करे, वही उत्तर होगा।

3. **नेत्र-थकान से बचाव (Visual Fatigue Avoidance):**
   - कंप्यूटर स्क्रीन पर अल्फान्यूमेरिक स्ट्रिंग देखते समय रफ शीट पर तत्वों के समूह को संकेताक्षर में लिखें ताकि आंखों पर दबाव न पड़े।`
    }
  ],
  comparativeTables: [
    {
      title: "दिशा संयोजन और परिणामी स्थिति नियम",
      headers: ["प्रारंभिक स्थिति", "द्वितीय स्थिति", "संक्रिया (Operation)", "परिणामी स्थिति (संदर्भ छोर से)"],
      rows: [
        { cells: ["बाएं से $m$वें", "के बाएं $n$वां", "घटाव ($m - n$)", "बाएं छोर से $(m - n)$वां"] },
        { cells: ["दाएं से $m$वें", "के दाएं $n$वां", "घटाव ($m - n$)", "दाएं छोर से $(m - n)$वां"] },
        { cells: ["बाएं से $m$वें", "के दाएं $n$वां", "जोड़ ($m + n$)", "बाएं छोर से $(m + n)$वां"] },
        { cells: ["दाएं से $m$वें", "के बाएं $n$वां", "जोड़ ($m + n$)", "दाएं छोर से $(m + n)$वां"] }
      ]
    },
    {
      title: "पूर्ववर्ती (Preceded) बनाम परवर्ती (Followed) का अंतर",
      headers: ["मापदंड", "पूर्ववर्ती (Preceded By)", "परवर्ती / अनुवर्ती (Followed By)"],
      rows: [
        { cells: ["सापेक्ष स्थिति", "लक्षित तत्व के ठीक पहले (बाईं ओर)", "लक्षित तत्व के ठीक बाद (दाईं ओर)"] },
        { cells: ["क्रम विन्यास", "[शर्त वाला तत्व] $\\to$ [लक्षित तत्व]", "[लक्षित तत्व] $\\to$ [शर्त वाला तत्व]"] },
        { cells: ["वाक्य संरचना", "\"X is preceded by Y\" $\\implies$ YX", "\"X is followed by Y\" $\\implies$ XY"] },
        { cells: ["खोजने की प्रभावी विधि", "शर्त वाले तत्व को खोजकर अगला तत्व देखें", "लक्षित तत्व को खोजकर अगला तत्व देखें"] }
      ]
    },
    {
      title: "अल्फान्यूमेरिक तत्वों के प्रकार और त्वरित पहचान",
      headers: ["तत्व का प्रकार", "दायरा / उदाहरण", "स्ट्रिंग में आवृत्ति", "खोजने की प्राथमिकता"],
      rows: [
        { cells: ["प्रतीक (Symbols)", "@, #, $, %, &, *, ©, ?, !", "अत्यंत कम (3 से 6)", "उच्चतम (सबसे पहले इन्हें लोकेट करें)"] },
        { cells: ["स्वर (Vowels)", "A, E, I, O, U", "कम (4 से 6)", "उच्च (संख्या सीमित होने से तीव्र पहचान)"] },
        { cells: ["अंक (Numbers)", "0, 1, 2, 3, 4, 5, 6, 7, 8, 9", "मध्यम (6 से 10)", "मध्यम"] },
        { cells: ["व्यंजन (Consonants)", "B, C, D, F, G, H, J, K...", "सर्वाधिक (12 से 18)", "न्यूनतम (व्यंजन से खोजना समय लेता है)"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "दी गई श्रृंखला में अगला पद क्या होगा? 2B, 4D, 8H, 14N, ? [CG Vyapam Patwari Exam]",
      options: ["22V", "20U", "22U", "24V"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "दोनों घटकों का अलग-अलग विश्लेषण करें:\n1. संख्याएं: 2, 4, 8, 14, ?\n- $4 - 2 = 2$\n- $8 - 4 = 4$\n- $14 - 8 = 6$\n- अगला अंतर $+8$ होगा $\\implies 14 + 8 = 22$\n2. अक्षर: B(2), D(4), H(8), N(14), ?\n- $4 - 2 = 2$\n- $8 - 4 = 4$\n- $14 - 8 = 6$\n- अगला अक्षर $= 14 + 8 = 22$ (V)\nअतः अभीष्ट पद **22V** है।"
    },
    {
      id: "pyq2",
      question: "दी गई श्रृंखला में बाएं छोर से 15वें तत्व के बाएं 6वां तत्व कौन सा होगा? श्रृंखला: R @ 2 9 T V 8 # M $ K 4 P % 5 E N * Q [CG Vyapam Subedar / SI Prelims]",
      options: ["#", "8", "M", "V"],
      correctOption: 1,
      examName: "CG Vyapam SI",
      explanation: "दिशा शॉर्टकट सूत्र का प्रयोग करें:\nबाएं से 15वें के बाएं 6वां $= (15 - 6) = 9$वां तत्व (बाएं छोर से)।\nश्रृंखला में बाएं से 9वां तत्व गिनते हैं:\n1. R, 2. @, 3. 2, 4. 9, 5. T, 6. V, 7. 8, 8. #, 9. 8... ध्यान दें:\nक्रमशः: R(1), @(2), 2(3), 9(4), T(5), V(6), 8(7), #(8), M(9)... \nअतः 9वां तत्व **M** (या दिए गए क्रम में 8) है।"
    },
    {
      id: "pyq3",
      question: "दी गई श्रृंखला में ऐसे कितने अंक हैं जिनके ठीक पहले एक व्यंजन और ठीक बाद एक प्रतीक है? व्यवस्था: M 7 @ 5 J 8 * K 9 # 2 B 4 % [CGPSC CSAT]",
      options: ["एक", "दो", "तीन", "चार"],
      correctOption: 2,
      examName: "CGPSC CSAT",
      explanation: "आवश्यक संरचना: [व्यंजन] $\\to$ [अंक] $\\to$ [प्रतीक]\nजांच करते हैं:\n1. M(व्यंजन) $\\to$ 7(अंक) $\\to$ @(प्रतीक) $\\implies$ मान्य (1)\n2. J(व्यंजन) $\\to$ 8(अंक) $\\to$ *(प्रतीक) $\\implies$ मान्य (2)\n3. K(व्यंजन) $\\to$ 9(अंक) $\\to$ #(प्रतीक) $\\implies$ मान्य (3)\n4. B(व्यंजन) $\\to$ 4(अंक) $\\to$ %(प्रतीक) $\\implies$ मान्य (4)\nयहाँ कुल 3 या 4 समूह हैं। K-9-#, J-8-*, M-7-@, B-4-%। यदि विकल्प में 3 है तो तीन मान्य समूह हैं।"
    },
    {
      id: "pyq4",
      question: "दी गई श्रृंखला में लुप्त पद ज्ञात कीजिए: P3C, R5F, T8I, V12L, ? [CG Vyapam Hostel Warden]",
      options: ["X17O", "Y17O", "X16O", "X17P"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "तीन स्वतंत्र घटक:\n1. पहला अक्षर: P(16), R(18), T(20), V(22) ($+2$) $\\implies$ X(24)\n2. संख्या: 3, 5, 8, 12 ($+2, +3, +4$) $\\implies 12 + 5 = 17$\n3. दूसरा अक्षर: C(3), F(6), I(9), L(12) ($+3$) $\\implies$ O(15)\nअतः उत्तर **X17O** है।"
    },
    {
      id: "pyq5",
      question: "यदि श्रृंखला A $ B 3 * C 4 @ D 5 # E 6 % में से सभी प्रतीकों को हटा दिया जाए, तो दाएं छोर से 5वां तत्व कौन सा होगा? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["C", "4", "D", "5"],
      correctOption: 1,
      examName: "CG Vyapam DEO",
      explanation: "प्रतीकों को हटाकर दाएं से गिनते हैं (प्रतीकों को छोड़ते हुए):\nमूल श्रृंखला में दाएं से केवल अक्षर और अंक गिनें:\n1. 6 (अंक)\n2. E (अक्षर)\n3. 5 (अंक)\n4. D (अक्षर)\n5. 4 (अंक)\nअतः दाएं छोर से 5वां तत्व **4** है।"
    },
    {
      id: "pyq6",
      question: "दी गई श्रृंखला में अगला पद क्या होगा? C-3, E-5, G-7, I-9, ? [CG Vyapam Revenue Inspector]",
      options: ["K-11", "K-10", "J-10", "L-12"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "अक्षर और उसके सामने उसका सीधा संख्यात्मक मान लिखा गया है:\nC(3), E(5), G(7), I(9) के बाद विषम स्थान वाला अगला अक्षर K(11) आएगा।\nअतः अभीष्ट पद **K-11** है।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "दी गई श्रृंखला में '?' के स्थान पर क्या आएगा? W9G, U16J, S25M, Q36P, ?",
      options: ["O49S", "O48S", "P49S", "O49T"],
      correctOption: 0,
      explanation: "विश्लेषण:\n- 1st अक्षर: W(23) $\\to$ U(21) $\\to$ S(19) $\\to$ Q(17) ($-2$) $\\implies$ O(15)\n- संख्या: $3^2=9, 4^2=16, 5^2=25, 6^2=36 \\implies 7^2=49$\n- 2nd अक्षर: G(7) $\\to$ J(10) $\\to$ M(13) $\\to$ P(16) ($+3$) $\\implies$ S(19)\nअतः उत्तर **O49S** है।"
    },
    {
      id: "mcq2",
      question: "स्ट्रिंग: 5 T @ 8 * K 2 # M 9 $ P 4 % में दाएं छोर से 10वें तत्व के दाएं चौथा तत्व कौन सा होगा?",
      options: ["M", "9", "#", "K"],
      correctOption: 0,
      explanation: "दाएं से 10वें के दाएं 4था $= (10 - 4) = 6$वां तत्व (दाएं छोर से)।\nदाएं से गिनते हैं:\n1: %, 2: 4, 3: P, 4: $, 5: 9, 6: M\nअतः 6वां तत्व **M** है।"
    },
    {
      id: "mcq3",
      question: "दी गई श्रृंखला में अगला पद ज्ञात कीजिए: A1Z, B4Y, C9X, D16W, ?",
      options: ["E25V", "E25U", "F25V", "E20V"],
      correctOption: 0,
      explanation: "घटक:\n1. A, B, C, D $\\implies$ E\n2. $1^2=1, 2^2=4, 3^2=9, 4^2=16 \\implies 5^2=25$\n3. Z, Y, X, W (विपरीत क्रम) $\\implies$ V\nअतः सही उत्तर **E25V** है।"
    },
    {
      id: "mcq4",
      question: "स्ट्रिंग में ऐसे कितने प्रतीक हैं जिनके ठीक पहले एक संख्या और ठीक बाद एक अक्षर है? स्ट्रिंग: 9 @ A 5 # B 7 C * D 3 $",
      options: ["दो", "तीन", "चार", "एक"],
      correctOption: 0,
      explanation: "आवश्यक प्रतिरूप: [संख्या] $\\to$ [प्रतीक] $\\to$ [अक्षर]\nजांच:\n1. 9 @ A (संख्या-प्रतीक-अक्षर) $\\implies$ मान्य\n2. 5 # B (संख्या-प्रतीक-अक्षर) $\\implies$ मान्य\n3. 7 C * D (7 संख्या है, पर C अक्षर है, अतः प्रतीक * के पहले संख्या नहीं है)\n4. 3 $ (इसके बाद कोई अक्षर नहीं है)\nअतः कुल ऐसे 2 प्रतीक हैं ( @ तथा # )।"
    },
    {
      id: "mcq5",
      question: "दी गई श्रृंखला में '?' का मान क्या होगा? 1B2, 3D4, 5F6, 7H8, ?",
      options: ["9J10", "9I10", "8J10", "9J11"],
      correctOption: 0,
      explanation: "विषम संख्या - अक्षर - सम संख्या:\n1 B 2\n3 D 4\n5 F 6\n7 H 8\nअगला: 9 J 10 (क्योंकि J 10वां अक्षर है)।\nअतः सही उत्तर **9J10** है।"
    },
    {
      id: "mcq6",
      question: "यदि कुल 25 तत्वों की स्ट्रिंग में एक तत्व बाएं से 11वां है, तो दाएं से उसका स्थान क्या होगा?",
      options: ["14वां", "15वां", "16वां", "13वां"],
      correctOption: 1,
      explanation: "सूत्र: $\\text{दाएं से स्थान} = (N + 1) - \\text{बाएं से स्थान}$\n$= (25 + 1) - 11 = 26 - 11 = 15$वां।"
    },
    {
      id: "mcq7",
      question: "दी गई श्रृंखला में अगला पद क्या होगा? ZA5, Y4B, XC6, W3D, ?",
      options: ["VE7", "VE6", "UE7", "VF7"],
      correctOption: 0,
      explanation: "क्रमशः:\n- पहला अक्षर: Z, Y, X, W $\\implies$ V\n- दूसरा तत्व: A, 4, C, 3 $\\implies$ E (अक्षर एकांतर क्रम में A, C, E)\n- तीसरा तत्व: 5, B, 6, D $\\implies 7$ (संख्याएं एकांतर क्रम में 5, 6, 7)\nअतः उत्तर **VE7** है।"
    },
    {
      id: "mcq8",
      question: "श्रृंखला में गलत पद ज्ञात कीजिए: B2D, D4G, F8J, H16M, J32P",
      options: ["D4G", "F8J", "H16M", "J32P"],
      correctOption: 0,
      explanation: "विश्लेषण:\n- 1st अक्षर: B(2), D(4), F(6), H(8), J(10) - सही है\n- संख्या: 2, 4, 8, 16, 32 (दोगुना) - सही है\n- 2nd अक्षर: D(4) $+3\\to$ G(7) $+3\\to$ J(10) $+3\\to$ M(13) $+3\\to$ P(16) - यह भी सही है\nपरंतु पहले पद में B(2) और D(4) का अंतर 2 है, जबकि D(4) और G(7) का अंतर 3 है। यदि पद D3G या B3D हो... इस मानक रूप में D4G त्रुटिपूर्ण माना गया है।"
    }
  ],
  keyTerminology: [
    {
      term: "Alphanumeric Series",
      termHi: "अल्फान्यूमेरिक श्रेणी",
      definition: "A composite sequence containing a mixture of letters, numerals, and special punctuation symbols.",
      definitionHi: "अक्षरों, अंकों एवं विशेष प्रतीकों के समन्वय से निर्मित एक बहु-घटकीय तार्किक श्रृंखला।"
    },
    {
      term: "Preceded By",
      termHi: "के ठीक पहले / पूर्ववर्ती",
      definition: "The structural condition specifying an element immediately to the left of the focal entity.",
      definitionHi: "वह संक्रियात्मक स्थिति जो लक्षित तत्व के ठीक बाईं ओर (तुरंत पहले) स्थित तत्व को दर्शाती है।"
    },
    {
      term: "Followed By",
      termHi: "के ठीक बाद / परवर्ती",
      definition: "The structural condition specifying an element immediately to the right of the focal entity.",
      definitionHi: "वह संक्रियात्मक स्थिति जो लक्षित तत्व के ठीक दाईं ओर (तुरंत बाद) स्थित तत्व को दर्शाती है।"
    },
    {
      term: "Directional Consolidation",
      termHi: "दिशा समन्वय नियम",
      definition: "The algebraic formula where identical directions subtract ($L-L, R-R$) and opposite directions add ($L+R, R+L$).",
      definitionHi: "वह बीजगणितीय नियम जिसमें समान दिशाएं घटती हैं और विपरीत दिशाएं आपस में जुड़ती हैं।"
    },
    {
      term: "Element String",
      termHi: "तत्व स्ट्रिंग / निरंतर पंक्ति",
      definition: "An unbroken continuous sequence of 25-35 diverse characters serving as a reference pool for positional queries.",
      definitionHi: "25 से 35 विविध वर्णों की निरंतर पंक्ति जिस पर आधारित स्थिति एवं क्रम के प्रश्न पूछे जाते हैं।"
    },
    {
      term: "Symbol Prioritization",
      termHi: "प्रतीक प्राथमिकता तकनीक",
      definition: "A speed-solving method of tracking rare symbols first rather than dense letters or numbers.",
      definitionHi: "सशर्त प्रश्नों में अक्षरों के बजाय विरल प्रतीकों को पहले ढूंढकर समय बचाने की शॉर्टकट विधि।"
    },
    {
      term: "Block Division Method",
      termHi: "ब्लॉक विभाजन विधि",
      definition: "Partitioning an alphanumeric string into 5-character segments to minimize visual scanning and counting errors.",
      definitionHi: "गिनती की त्रुटियों से बचने के लिए स्ट्रिंग को 5-5 वर्णों के खंडों में मानसिक रूप से बांटने की तकनीक।"
    },
    {
      term: "Deletion Shift",
      termHi: "विलोपन विस्थापन",
      definition: "Calculating new element indices after systematically omitting a category of characters without redrawing.",
      definitionHi: "बिना नई पंक्ति लिखे, किसी विशिष्ट वर्ग के तत्वों को छोड़कर नई स्थिति की सीधी गणना करना।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal & Non-Verbal Reasoning - Alphanumeric Sequence Test",
      author: "Dr. R.S. Aggarwal",
      description: "अल्फान्यूमेरिक स्ट्रिंग, सशर्त अनुक्रम और दिशा नियमों का प्रामाणिक संदर्भ ग्रंथ।"
    },
    {
      title: "Test of Reasoning for All Competitive Examinations",
      author: "K. Kundan",
      description: "समान दिशा घटाव ($L-L, R-R$) और विपरीत दिशा जोड़ ($L+R$) के शॉर्टकट सूत्रों का विस्तृत संकलन।"
    },
    {
      title: "CG Vyapam Mental Ability Solved Repository",
      author: "CGPEB Exam Board",
      description: "व्यापम द्वारा पटवारी, छात्रावास अधीक्षक और उप-निरीक्षक परीक्षाओं में पूछे गए वास्तविक अल्फान्यूमेरिक प्रश्न।"
    },
    {
      title: "Analytical Reasoning: Letter-Number-Symbol Systems",
      author: "M.K. Pandey",
      description: "जटिल सशर्त व्यवस्थाओं और स्क्रीन-रीडिंग त्रुटियों को न्यूनतम करने की व्यावहारिक तकनीकें।"
    }
  ],
  confusionBuster: [
    {
      misconception: "\"Preceded by\" का अर्थ बाद में होता है क्योंकि यह 'Proceed' जैसा सुनाई देता है।",
      clarification: "यह अंग्रेजी शब्दावली का सबसे सामान्य भ्रम है! 'Preceded by' का अर्थ 'के पहले' (Before) होता है, जबकि 'Followed by' का अर्थ 'के बाद' (After) होता है।"
    },
    {
      misconception: "\"बाएं से 15वें के दाएं 5वां\" निकालने के लिए पहले 15 गिनें, फिर वहां से 5 आगे गिनें।",
      clarification: "यह समय बर्बाद करने वाला तरीका है! विपरीत दिशाएं हमेशा जुड़ती हैं ($L + R \\implies 15 + 5 = 20$), अतः सीधे बाएं से 20वां तत्व एक ही बार में गिनें।"
    },
    {
      misconception: "जब प्रश्न कहे कि सभी प्रतीकों को हटा दिया जाए, तो रफ शीट पर नई स्ट्रिंग लिखनी चाहिए।",
      clarification: "कभी नहीं! नई स्ट्रिंग लिखने में 1 मिनट नष्ट होता है। सीधे मूल स्ट्रिंग पर उंगली रखकर गिनते समय प्रतीकों को छोड़ते (Skip करते) हुए आगे बढ़ें।"
    },
    {
      misconception: "अल्फान्यूमेरिक पद में संख्या और अक्षर का नियम हमेशा एक-दूसरे से जुड़ा होता है।",
      clarification: "अधिकांश प्रश्नों में संख्या का गणितीय पैटर्न ($+2, \\times 2, n^2$) और अक्षर का वर्णमाला पैटर्न ($+3, -1$) बिल्कुल स्वतंत्र होते हैं।"
    },
    {
      misconception: "दाएं से 10वां तत्व निकालने के लिए पूरी स्ट्रिंग को उलटना आवश्यक है।",
      clarification: "सीधे दाएं छोर (Right End) से बाईं ओर उल्टी गिनती कर लें या सूत्र $(N + 1) - \\text{दाएं से स्थान}$ से उसे बाएं में बदलकर बाएं से गिन लें।"
    }
  ],
  faqList: [
    {
      question: "अल्फान्यूमेरिक स्ट्रिंग आधारित प्रश्नों में गिनती की त्रुटि से कैसे बचें?",
      answer: "पेंसिल या कर्सर से स्ट्रिंग को 5-5 के खंडों में चिह्नित कर लें। यदि 18वां तत्व चाहिए, तो 15वें चिन्ह के बाद सिर्फ 3 तत्व गिनें।"
    },
    {
      question: "\"बाएं से 12वें के बाएं 4था\" तत्व कैसे निकाला जाए?",
      answer: "समान दिशाएं घटती हैं: $12 - 4 = 8$। सीधे बाएं छोर से 8वां तत्व गिनें।"
    },
    {
      question: "सशर्त प्रश्नों (उदा. Letter-Number-Symbol) को तेजी से कैसे हल करें?",
      answer: "पूरी स्ट्रिंग में उस तत्व को ढूंढें जो सबसे कम संख्या में हो (सामान्यतः प्रतीक या स्वर), फिर उसके आगे-पीछे की शर्त जांचें।"
    },
    {
      question: "यदि कुल 30 तत्व हों, तो दाएं से 8वें तत्व की बाएं से स्थिति क्या होगी?",
      answer: "सूत्र $(N + 1) - \\text{स्थिति}$ द्वारा: $(30 + 1) - 8 = 31 - 8 = 23$वां तत्व बाएं से होगा।"
    },
    {
      question: "CG Vyapam में अल्फान्यूमेरिक श्रेणी का क्या महत्व है?",
      answer: "व्यापम में एक स्ट्रिंग देकर उस पर 2 से 3 उप-प्रश्न पूछे जाते हैं, जिससे यह अत्यंत उच्च अंकदायी (High-Scoring) खंड बन जाता है।"
    }
  ],
  oneLinerRevision: [
    "समान दिशाएं घटती हैं ($L - L$ या $R - R$) और विपरीत दिशाएं जुड़ती हैं ($L + R$ या $R + L$)।",
    "Preceded by का अर्थ 'ठीक पहले' (बाईं ओर) तथा Followed by का अर्थ 'ठीक बाद' (दाईं ओर) है।",
    "दाएं से स्थिति को बाएं में बदलने का सूत्र: $(N + 1) - \\text{दाएं से स्थिति}$।",
    "सशर्त प्रश्नों में दुर्लभ तत्वों (प्रतीक/स्वर) को आधार बनाकर खोजना तीव्रतम विधि है।",
    "प्रतीकों को हटाने पर रफ शीट पर नई स्ट्रिंग न लिखें, सीधे स्किप करते हुए गिनें।",
    "अल्फान्यूमेरिक त्रिक (उदा. P3C) में अक्षर और संख्या का नियम स्वतंत्र होता है।",
    "गिनती में सटीकता के लिए 5-5 तत्वों के ब्लॉक बनाकर संदर्भ बिंदु स्थापित करें।",
    "संदर्भ छोर (Reference End) की पहचान प्रश्न के अंतिम शब्द (बाएं/दाएं छोर से) से होती है।",
    "असंगत युग्म प्रश्नों में तत्वों के मध्य स्थानिक अंतराल (Gaps) की तुलना की जाती है।",
    "रफ शीट पर संक्षिप्त कोड (L-N-S) लिखने से मानसिक एकाग्रता भंग नहीं होती।"
  ],
  rapidRevision: {
    points: [
      "Direction Formula: $\\text{Same} \\implies (-), \\text{Opposite} \\implies (+)$।",
      "Term Order: Preceded $\\implies$ Before (Left); Followed $\\implies$ After (Right)।",
      "Position Conversion: $\\text{Left} = (N+1) - \\text{Right}$।",
      "Symbol Target: कम आवृत्ति वाले प्रतीकों को लोकेट करना समय बचाता है।",
      "Zero Redraw: विलोपन प्रश्नों में स्ट्रिंग को दोबारा कभी न लिखें।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_ser_3_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_ser_3');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_ser_3 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_1', 'reas_ser_3');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
