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

const reas_ser_4_data = {
  topicId: "reas_ser_4",
  topicName: "Symbol Series",
  topicNameHi: "प्रतीक श्रेणी",
  chapterId: "cgv_master_sub_4_ch_1",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "प्रतीक श्रेणी (Symbol Series) गैर-शाब्दिक (Non-Verbal) एवं शाब्दिक तार्किक क्षमता का एक विशिष्ट संलयन है, जिसमें गणितीय प्रतीकों (+, -, ×, ÷, =), कीबोर्ड वर्णों (@, #, $, %, &, *, ^) तथा ज्यामितीय आकृतियों (त्रिभुज, वृत्त, वर्ग, तीर आदि) के अनुक्रमिक परिवर्तन का अध्ययन किया जाता है। इसमें प्रतीकों का घूर्णन (Rotation - Clockwise/Anticlockwise), स्थिति विस्थापन (Positional Shift across corners/centers), तत्वों की संख्या में क्रमिक वृद्धि/कमी तथा प्रतीकों के विलोपन-प्रतिस्थापन का तार्किक नियम पहचानना होता है।",
    importance: "CG Vyapam (पटवारी, छात्रावास अधीक्षक, उप-अभियंता, संयुक्त भर्ती) तथा CGPSC (CSAT एवं राज्य सेवा) में प्रतीक और आकृति आधारित श्रेणी से 1 से 3 प्रश्न नियमित रूप से पूछे जाते हैं। यह अध्याय अभ्यर्थी के स्थानिक दृष्टिकोण (Spatial Orientation), दृश्यात्मक विश्लेषण (Visual Reasoning) और सूक्ष्म पैटर्न पहचान क्षमता की वास्तविक परीक्षा लेता है।",
    examRelevance: "परीक्षाओं में कोणीय घूर्णन ($45^\\circ, 90^\\circ, 135^\\circ, 180^\\circ$), फलक-से-कोने विस्थापन (Edge to Corner shift), प्रतीकों की संख्या में वृद्धि ($1, 2, 3, 4$ तत्व), तथा एकांतर दिशा परिवर्तन (Alternating Inversion / Mirror Reflection) के प्रश्न सर्वाधिक दोहराए जाते हैं। इसमें विकल्पों का उन्मूलन (Elimination Technique) 10 सेकंड में सही उत्तर सुनिश्चित करता है।",
    quickFacts: [
      "घूर्णन का मानक नियम: दक्षिणावर्त (Clockwise - CW) का अर्थ घड़ी की सुई की दिशा में और वामावर्त (Anticlockwise - ACW) का अर्थ विपरीत दिशा में घूमना होता है।",
      "कोणीय वृद्धि पैटर्न: सामान्यतः घूर्णन $45^\\circ$ (आधा कोना), $90^\\circ$ (एक भुजा), $135^\\circ$ (डेढ़ भुजा) या $180^\\circ$ (विपरीत दिशा) के चरणों में होता है।",
      "तत्व प्रतिस्थापन (Element Replacement): जब कोई प्रतीक एक कोने से दूसरे पर जाता है और अपने स्थान पर एक नया प्रतीक (New Symbol) उत्पन्न करता है, तो वह चक्रीय प्रतिस्थापन नियम कहलाता है।",
      "एकांतर परिवर्तन (Alternate Steps): विषम पदों (1st, 3rd, 5th) में प्रतीक का एक गुण बदलता है और सम पदों (2nd, 4th) में दूसरा गुण (उदा. आकार और रंग)।",
      "दर्पण एवं जल प्रतिबिंब प्रभाव: कई प्रतीक श्रेणियों में तीर या वक्र का मुख क्रमिक रूप से ऊपर, नीचे, दाएं, बाएं पलटता है।"
    ]
  },
  chapters: [
    {
      id: "ch1_rotational_patterns",
      title: "प्रतीकों का कोणीय घूर्णन एवं दिशा परिवर्तन (Rotational Patterns & Angles)",
      content: `### 1. कोणीय घूर्णन (Rotational Transformation) के मूलभूत नियम

प्रतीक श्रेणी में सबसे प्रचलित पैटर्न किसी प्रतीक (जैसे तीर $\\rightarrow$, त्रिशूल, स्वास्तिक या सितारा $\\bigstar$) का क्रमिक घूर्णन है।

#### 1. घूर्णन की दो मूल दिशाएं:
- **दक्षिणावर्त (Clockwise - CW):** ऊपर $\\to$ दायां $\\to$ नीचे $\\to$ बायां $\\to$ ऊपर
- **वामावर्त (Anticlockwise - ACW):** ऊपर $\\to$ बायां $\\to$ नीचे $\\to$ दायां $\\to$ ऊपर

#### 2. मानक कोणीय अंतराल (Standard Angular Increments):
- **$45^\\circ$ घूर्णन:** प्रतीक कोने से ठीक बीच की भुजा (या भुजा के मध्य से कोने) पर जाता है।
  - 8 मुख्य दिशाएं: उत्तर, उत्तर-पूर्व, पूर्व, दक्षिण-पूर्व, दक्षिण, दक्षिण-पश्चिम, पश्चिम, उत्तर-पश्चिम।
- **$90^\\circ$ घूर्णन:** प्रतीक एक मुख्य दिशा से अगली मुख्य दिशा में छलांग लगाता है (उदा. उत्तर $\\to$ पूर्व $\\to$ दक्षिण $\\to$ पश्चिम)।
- **$135^\\circ$ घूर्णन:** $90^\\circ + 45^\\circ$ (डेढ़ चतुर्थांश)।
- **$180^\\circ$ घूर्णन:** प्रतीक ठीक विपरीत दिशा में पलट जाता है (Inversion)।

#### 3. वर्धमान घूर्णन (Increasing Angular Shift):
- कई प्रश्नों में घूर्णन का कोण स्थिर नहीं रहता, बल्कि क्रमिक रूप से बढ़ता है:
  - पहले चरण में $+45^\\circ$ CW
  - दूसरे चरण में $+90^\\circ$ CW
  - तीसरे चरण में $+135^\\circ$ CW
  - चौथे चरण में $+180^\\circ$ CW
  - ऐसे में अगले चरण की गणना $180^\\circ + 45^\\circ = 225^\\circ$ होगी।`
    },
    {
      id: "ch2_positional_shift_box",
      title: "चौकोर बॉक्स में स्थानिक विस्थापन (Positional Shift in a Frame)",
      content: `### 2. फ्रेम/बॉक्स के भीतर प्रतीकों की गतिशीलता

प्रायः प्रश्नों में एक वर्गाकार बॉक्स के अंदर 3, 4 या 5 प्रतीक (उदा. $\\Delta, \\square, \\bigcirc, \\times, +$) दिए होते हैं और प्रत्येक चरण में वे बॉक्स के विभिन्न स्थानों पर घूमते हैं।

#### प्रमुख विस्थापन प्रणालियाँ:
1. **कोनों की चक्रीय गति (Cyclic Corner Shift):**
   - प्रतीक शीर्ष-बाएं (Top-Left) $\\to$ शीर्ष-दाएं (Top-Right) $\\to$ निचला-दायां (Bottom-Right) $\\to$ निचला-बायां (Bottom-Left) दिशा में घड़ी की चाल से गति करते हैं।

2. **कर्ण विस्थापन (Diagonal Movement):**
   - प्रतीक एक कोने से विकर्ण (Diagonal) के माध्यम से केंद्र से होते हुए विपरीत कोने पर जाता है।

3. **केंद्र-से-परिधि विस्थापन (Center to Periphery):**
   - केंद्र में स्थित प्रतीक परिधि के किसी कोने पर जाता है, और एक कोने का प्रतीक केंद्र में प्रवेश करता है।

4. **नया प्रतीक उत्पन्न होना (Introduction of a New Symbol):**
   - प्रत्येक चरण में कोई एक विशिष्ट कोना (उदा. निचला-दायां) खाली होता है और वहां एक सर्वथा **नया प्रतीक** (जो पहले कभी नहीं आया था) प्रकट होता है।
   - यह व्यापम का अत्यंत प्रिय पैटर्न है; इसमें विकल्पों में से नए प्रतीक की उपस्थिति की जांच करें।`
    },
    {
      id: "ch3_count_and_inversion",
      title: "संख्यात्मक वृद्धि एवं रूप परिवर्तन (Element Count & Shading)",
      content: `### 3. तत्वों की संख्या, रेखाओं एवं छायांकन (Shading) में परिवर्तन

प्रतीक श्रेणी केवल स्थान बदलने तक सीमित नहीं होती, बल्कि प्रतीकों के आंतरिक गुणों में भी रूपांतरण होता है:

#### 1. भुजाओं/रेखाओं की संख्या में परिवर्तन (Line Segment Progression):
- आकृतियों में रेखाओं की संख्या क्रमशः बढ़ती या घटती है:
  - $3$ रेखाएं (त्रिभुज $\\Delta$) $\\to 4$ रेखाएं (वर्ग $\\square$) $\\to 5$ रेखाएं (पंचभुज) $\\to 6$ रेखाएं (षट्भुज $\\dots$)।
  - या किसी प्रतीक में अतिरिक्त डंडियां जुड़ती हैं: $I \\to T \\to \\pi \\to \\#$।

#### 2. एकांतर छायांकन (Alternating Shading / Fill Pattern):
- आकृति एक चरण में रिक्त (White/Hollow) होती है, अगले चरण में भरी हुई (Shaded/Black) हो जाती है।
- अर्ध-छायांकन (Half Shaded): छायांकित भाग $90^\\circ$ दक्षिणावर्त घूमता है।

#### 3. प्रतीकों की संख्या का योग-घटाव:
- बॉक्स में एक तारा $(\\bigstar)$ $\\to$ दो तारे $(\\bigstar\\bigstar)$ $\\to$ तीन तारे $(\\bigstar\\bigstar\\bigstar)$।
- साथ ही दूसरा प्रतीक विपरीत दिशा में एक-एक करके घटता है (उदा. 4 गोले $\\to$ 3 गोले $\\to$ 2 गोले)।`
    },
    {
      id: "ch4_complex_symbolic_sequences",
      title: "जटिल कीबोर्ड एवं गणितीय प्रतीक श्रृंखला (Keyboard & Mathematical Series)",
      content: `### 4. शाब्दिक प्रतीक स्ट्रिंग में पैटर्न पहचान

जब प्रतीक गैर-शाब्दिक चित्रों के बजाय कंप्यूटर कीबोर्ड वर्णों की श्रृंखला के रूप में दिए जाते हैं:

- उदाहरण: \`@ # $ % & * ^ ! ?\`
- इनमें प्रायः निम्नलिखित नियम काम करते हैं:
  - **कुंजीपटल पंक्ति अनुक्रम:** कीबोर्ड की संख्या पंक्ति (Shift + 1 = !, Shift + 2 = @, Shift + 3 = #, Shift + 4 = \$, Shift + 5 = %, Shift + 6 = ^, Shift + 7 = &...).
  - यदि परीक्षा में \`! @ # $ % ^\` दिखे, तो यह सीधे कीबोर्ड के Shift + 1, 2, 3, 4, 5, 6 का क्रम है! इसका अगला पद '&' (Shift + 7) होगा।

#### 2. गणितीय संक्रियाओं की चक्रीय श्रृंखला:
- $+ - \\times \\div = + - \\times \\dots$
- संक्रियाओं के स्थान का एकांतर व्युत्क्रमण: $+ \\implies -, \\times \\implies \\div$।`
    },
    {
      id: "ch5_visual_elimination_tactics",
      title: "दृश्यात्मक विकल्प उन्मूलन रणनीति (Visual Elimination Tactics)",
      content: `### 5. 10 सेकंड में सही विकल्प खोजने की 'सिंगल-एलिमेंट' तकनीक

प्रतीक श्रेणी के 4 या 5 तत्वों वाले जटिल प्रश्नों को एक साथ पूरा देखने पर दृष्टि भ्रमित हो जाती है। इसके समाधान हेतु यह परीक्षित तकनीक अपनाएं:

#### चरणबद्ध तकनीक:
1. **एकल तत्व को चुनना (Pick Just ONE Element):**
   - बॉक्स के सभी 4-5 प्रतीकों को एक साथ न देखें।
   - केवल किसी एक कोने वाले या सबसे विशिष्ट प्रतीक (जैसे तीर या काला गोला) पर ध्यान केंद्रित करें।

2. **उस एक तत्व की गति का विश्लेषण:**
   - देखें कि वह प्रतीक अगले चरण में कहाँ गया ($90^\\circ$ घूमा या विकर्ण पर गया)।
   - इससे निर्धारित करें कि अंतिम अभीष्ट आकृति में उस प्रतीक की सही स्थिति क्या होनी चाहिए।

3. **विकल्पों को छांटना (Eliminate Options):**
   - चारों विकल्पों में देखें। प्रायः 2 से 3 विकल्प केवल उस एक प्रतीक की गलत स्थिति के कारण तुरंत बाहर हो जाते हैं!

4. **दूसरे तत्व से अंतिम पुष्टि:**
   - बचे हुए 1 या 2 विकल्पों में जो तत्व भिन्न हो, केवल उस दूसरे तत्व की गति देखकर 5 सेकंड में अंतिम सही उत्तर पर मुहर लगाएं।`
    }
  ],
  comparativeTables: [
    {
      title: "घूर्णन दिशा एवं कोणीय मानों की तुलना",
      headers: ["घूर्णन का प्रकार", "संकेत", "दिशा (Direction)", "प्रति चक्र चरण (Steps in $360^\\circ$)"],
      rows: [
        { cells: ["$45^\\circ$ दक्षिणावर्त", "CW-45", "घड़ी की सुई की दिशा में आधा चतुर्थांश", "8 चरण"] },
        { cells: ["$90^\\circ$ दक्षिणावर्त", "CW-90", "घड़ी की सुई की दिशा में एक समकोण", "4 चरण"] },
        { cells: ["$180^\\circ$ व्युत्क्रमण", "INV-180", "ठीक विपरीत दिशा (आमने-सामने)", "2 चरण"] },
        { cells: ["$45^\\circ$ वामावर्त", "ACW-45", "घड़ी की विपरीत दिशा में आधा चतुर्थांश", "8 चरण"] },
        { cells: ["$90^\\circ$ वामावर्त", "ACW-90", "घड़ी की विपरीत दिशा में समकोण", "4 चरण"] }
      ]
    },
    {
      title: "आकृति विस्थापन: चक्रीय गति बनाम विकर्ण गति",
      headers: ["मापदंड", "चक्रीय परिधि गति (Perimeter Shift)", "विकर्ण गति (Diagonal Shift)"],
      rows: [
        { cells: ["गति का पथ", "भुजाओं के सहारे चारों कोनों पर क्रमिक रूप से", "केंद्र से होकर आमने-सामने के कोनों के मध्य"] },
        { cells: ["स्थानों की संख्या", "4 कोने (Top-L, Top-R, Bot-R, Bot-L)", "2 विपरीत कोने + केंद्र"] },
        { cells: ["पहचान", "प्रतीक क्रमबद्ध रूप से 1-1 कोना आगे सरकता है", "प्रतीक कोने से केंद्र और केंद्र से विपरीत कोने में जाता है"] },
        { cells: ["कठिनाई स्तर", "सरल से मध्यम", "मध्यम से उच्च"] }
      ]
    },
    {
      title: "प्रतीक परिवर्तन के विभिन्न आयाम",
      headers: ["आयाम", "परिवर्तन का स्वरूप", "उदाहरण", "परीक्षार्थी की रणनीति"],
      rows: [
        { cells: ["स्थान (Position)", "कोनों या भुजाओं पर गति", "Top-Left से Top-Right", "स्थिति निर्देशांक ट्रैक करें"] },
        { cells: ["अभिविन्यास (Orientation)", "कोणीय घूर्णन", "तीर का मुख उत्तर से पूर्व ($90^\\circ$ CW)", "घूर्णन कोण और दिशा लिखें"] },
        { cells: ["संख्या (Count)", "तत्वों की गिनती में $+1$ या $-1$", "1 तारा $\\to$ 2 तारे $\\to$ 3 तारे", "प्रत्येक फ्रेम में तत्व गिनें"] },
        { cells: ["प्रकृति (Nature)", "पुराना हटना, नया प्रतीक आना", "त्रिभुज हटकर वृत्त का प्रवेश", "नए तत्व की विशिष्टता देखें"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "दी गई प्रतीक श्रेणी में अगला पद क्या होगा? + , × , ÷ , - , + , × , ? [CG Vyapam Patwari Exam]",
      options: ["÷", "-", "+", "="],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "यह चार मूलभूत गणितीय संक्रियाओं की एक चक्रीय पुनरावृत्त श्रृंखला है:\nक्रम: (1) +, (2) ×, (3) ÷, (4) -\nइसके बाद पुनः +, ×...\nअतः '×' के बाद आने वाला अगला प्रतीक **÷** (भाग) होगा।"
    },
    {
      id: "pyq2",
      question: "एक तीर का मुख क्रमशः उत्तर $\\uparrow$, उत्तर-पूर्व $\\nearrow$, पूर्व $\\rightarrow$, दक्षिण-पूर्व $\\searrow$ की ओर घूमता है। अगले चरण में तीर का मुख किस दिशा में होगा? [CG Vyapam Subedar / SI Prelims]",
      options: ["दक्षिण $\\downarrow$", "दक्षिण-पश्चिम $\\swarrow$", "पश्चिम $\\leftarrow$", "उत्तर-पश्चिम $\\nwarrow$"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "घूर्णन का विश्लेषण करें:\n- उत्तर से उत्तर-पूर्व $= 45^\\circ$ दक्षिणावर्त (Clockwise)\n- उत्तर-पूर्व से पूर्व $= 45^\\circ$ दक्षिणावर्त\n- पूर्व से दक्षिण-पूर्व $= 45^\\circ$ दक्षिणावर्त\nअगला घूर्णन भी दक्षिण-पूर्व से $45^\\circ$ दक्षिणावर्त होगा:\n$\\text{दक्षिण-पूर्व} + 45^\\circ \\text{ CW} = \\text{दक्षिण } (\\downarrow)$।\nअतः सही उत्तर दक्षिण है।"
    },
    {
      id: "pyq3",
      question: "दी गई कीबोर्ड प्रतीक श्रृंखला में '?' के स्थान पर क्या आएगा? ! , @ , # , $ , % , ^ , ? [CGPSC CSAT]",
      options: ["&", "*", "(", ")"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "यह कंप्यूटर कीबोर्ड की संख्या पंक्ति (Number Row) पर Shift कुंजी के साथ आने वाले प्रतीकों का सीधा प्राकृतिक क्रम है:\n- Shift + 1 = !\n- Shift + 2 = @\n- Shift + 3 = #\n- Shift + 4 = $\n- Shift + 5 = %\n- Shift + 6 = ^\n- Shift + 7 = **&**\nअतः अगला प्रतीक '&' होगा।"
    },
    {
      id: "pyq4",
      question: "एक बॉक्स में चार कोनों पर स्थित प्रतीक दक्षिणावर्त दिशा में एक-एक स्थान आगे बढ़ते हैं और प्रत्येक चरण में निचले दाएं कोने का प्रतीक एक नए प्रतीक द्वारा प्रतिस्थापित हो जाता है। यह किस नियम का उदाहरण है? [CG Vyapam Hostel Warden]",
      options: ["चक्रीय विस्थापन एवं नया तत्व नियम", "स्थिर प्रतिस्थापन", "दर्पण प्रतिबिंब नियम", "विकर्ण व्युत्क्रमण"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "जब सभी प्रतीक एक निश्चित दिशा में आगे खिसकें और किसी एक कोने पर पूर्व में अप्रयुक्त नया तत्व प्रविष्ट हो, तो इसे 'चक्रीय विस्थापन एवं नया तत्व नियम' (Cyclic Shift with New Element Replacement) कहा जाता है।"
    },
    {
      id: "pyq5",
      question: "दी गई श्रृंखला में रेखाओं की संख्या के आधार पर अगला पद क्या होगा? रेखा, कोण (2 रेखाएं), त्रिभुज (3 रेखाएं), चतुर्भुज (4 रेखाएं), ? [CG Vyapam Sub Engineer]",
      options: ["पंचभुज (5 रेखाएं)", "षट्भुज (6 रेखाएं)", "वृत्त", "अष्टभुज"],
      correctOption: 0,
      examName: "CG Vyapam Sub Engineer",
      explanation: "प्रत्येक क्रमिक आकृति में भुजाओं (रेखाखंडों) की संख्या में $+1$ की नियमित वृद्धि हो रही है:\n- 1 रेखा $\\to 2 \\to 3 \\to 4$\nअगला पद 5 रेखाओं वाली संवृत आकृति अर्थात **पंचभुज (Pentagon)** होगी।"
    },
    {
      id: "pyq6",
      question: "यदि किसी आकृति का काला भाग पहले चरण में $90^\\circ$ CW, दूसरे में $90^\\circ$ CW और तीसरे में $90^\\circ$ CW घूमता है, तो चौथे चरण में उसका अभिविन्यास क्या होगा? [CG Vyapam Revenue Inspector]",
      options: ["प्रारंभिक स्थिति के ठीक विपरीत", "प्रारंभिक स्थिति के बिल्कुल समान", "$45^\\circ$ पर झुका हुआ", "अनिश्चित"],
      correctOption: 1,
      examName: "CG Vyapam RI",
      explanation: "कुल घूर्णन $= 90^\\circ \\times 4 = 360^\\circ$ दक्षिणावर्त।\nचूंकि $360^\\circ$ का घूर्णन एक पूर्ण चक्र (Full Rotation) होता है, अतः चौथे चरण में आकृति पुनः अपनी **प्रारंभिक स्थिति के बिल्कुल समान** हो जाएगी।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "एक तीर पहले चरण में ऊपर $(\\uparrow)$, दूसरे में दाएं $(\\rightarrow)$, तीसरे में नीचे $(\\downarrow)$ है। चौथे चरण में वह किस दिशा में इंगित करेगा?",
      options: ["बाएं $(\\leftarrow)$", "ऊपर $(\\uparrow)$", "उत्तर-पूर्व", "दक्षिण-पश्चिम"],
      correctOption: 0,
      explanation: "तीर का घूर्णन $90^\\circ$ दक्षिणावर्त (CW) है:\n$\\uparrow (0^\\circ) \\to \\rightarrow (90^\\circ) \\to \\downarrow (180^\\circ) \\to \\leftarrow (270^\\circ)$।\nअतः चौथे चरण में वह बाएं $(\\leftarrow)$ इंगित करेगा।"
    },
    {
      id: "mcq2",
      question: "एक आकृति में छायांकन (Shading) का क्रम है: खाली, आधा भरा, पूरा भरा, खाली, आधा भरा, ? अगला पद क्या होगा?",
      options: ["पूरा भरा", "खाली", "तीन-चौथाई भरा", "आधा भरा"],
      correctOption: 0,
      explanation: "पैटर्न 3 चरणों का आवर्ती चक्र है:\n(1) खाली $\\to$ (2) आधा भरा $\\to$ (3) पूरा भरा $\\to$ (1) खाली $\\to$ (2) आधा भरा $\\to$ (3) **पूरा भरा**।"
    },
    {
      id: "mcq3",
      question: "दी गई श्रृंखला में अगला पद क्या होगा? $\\Delta$, $\\square$, पंचभुज, षट्भुज, ?",
      options: ["सप्तभुज (7 भुजाएं)", "अष्टभुज (8 भुजाएं)", "नौभुज", "दशभुज"],
      correctOption: 0,
      explanation: "भुजाओं की संख्या: 3, 4, 5, 6 $\\implies$ अगली आकृति 7 भुजाओं वाली **सप्तभुज (Heptagon)** होगी।"
    },
    {
      id: "mcq4",
      question: "प्रतीक श्रृंखला में लुप्त पद ज्ञात कीजिए: $\\alpha$, $\\beta$, $\\gamma$, $\\delta$, ?",
      options: ["$\\epsilon$", "$\\theta$", "$\\lambda$", "$\\omega$"],
      correctOption: 0,
      explanation: "यह ग्रीक वर्णमाला (Greek Alphabet) का मानक क्रमिक अनुक्रम है:\nअल्फा ($\\alpha$), बीटा ($\\beta$), गामा ($\\gamma$), डेल्टा ($\\delta$) के बाद अगला अक्षर एप्सिलॉन ($\\epsilon$) आता है।"
    },
    {
      id: "mcq5",
      question: "एक बॉक्स में स्थित प्रतीक पहले $45^\\circ$ CW, फिर $90^\\circ$ CW, फिर $135^\\circ$ CW घूमता है। अगले चरण में वह कितना घूमेगा?",
      options: ["$180^\\circ$ CW", "$150^\\circ$ CW", "$225^\\circ$ CW", "$90^\\circ$ CW"],
      correctOption: 0,
      explanation: "घूर्णन कोण में प्रत्येक बार $+45^\\circ$ की वृद्धि हो रही है:\n$45^\\circ, 90^\\circ, 135^\\circ \\implies$ अगला घूर्णन $135^\\circ + 45^\\circ = 180^\\circ$ CW होगा।"
    },
    {
      id: "mcq6",
      question: "एक वृत्त को 4 बराबर भागों में बांटा गया है। छायांकित चतुर्थांश वामावर्त (ACW) दिशा में एक-एक चतुर्थांश आगे बढ़ता है। यदि वह तीसरे चरण में ऊपरी-बाएं भाग में है, तो चौथे चरण में कहाँ होगा?",
      options: ["निचले-बाएं भाग में", "निचले-दाएं भाग में", "ऊपरी-दाएं भाग में", "केंद्र में"],
      correctOption: 0,
      explanation: "वामावर्त (Anticlockwise) दिशा में ऊपरी-बाएं (Top-Left) के बाद आने वाला अगला चतुर्थांश **निचला-बायां (Bottom-Left)** होता है।"
    },
    {
      id: "mcq7",
      question: "दी गई श्रृंखला में विषम पद (Odd One Out) का चयन करें: $+$, $\\times$, $\\div$, $\\#$, $-$",
      options: ["$\\#$", "$+$", "$\\div$", "$\\times$"],
      correctOption: 0,
      explanation: "$+, \\times, \\div, -$ चारों प्राथमिक अंकगणितीय संक्रियाएं (Arithmetic Operators) हैं, जबकि $\\#$ एक सामान्य कीबोर्ड/हैश प्रतीक है। अतः $\\#$ असंगत है।"
    },
    {
      id: "mcq8",
      question: "एक तीर पहले ऊपर $(\\uparrow)$, फिर नीचे $(\\downarrow)$, फिर ऊपर $(\\uparrow)$, फिर नीचे $(\\downarrow)$ होता है, साथ ही उसके नीचे वृत्त की संख्या 1, 2, 3, 4 बढ़ती है। अगले पद में क्या होगा?",
      options: ["तीर ऊपर $(\\uparrow)$ और 5 वृत्त", "तीर नीचे $(\\downarrow)$ और 5 वृत्त", "तीर ऊपर $(\\uparrow)$ और 4 वृत्त", "तीर नीचे $(\\downarrow)$ और 6 वृत्त"],
      correctOption: 0,
      explanation: "दो नियम हैं:\n1. तीर एकांतर रूप से ऊपर-नीचे होता है: अगले चरण में तीर **ऊपर $(\\uparrow)$** होगा।\n2. वृत्तों की संख्या $1, 2, 3, 4$ बढ़ रही है: अगले चरण में **5 वृत्त** होंगे।\nअतः सही उत्तर तीर ऊपर $(\\uparrow)$ और 5 वृत्त है।"
    }
  ],
  keyTerminology: [
    {
      term: "Symbol Series",
      termHi: "प्रतीक श्रेणी",
      definition: "A sequence of abstract geometric, typographical, or mathematical symbols governed by systematic transformation rules.",
      definitionHi: "ज्यामितीय, मुद्रण या गणितीय प्रतीकों की वह श्रृंखला जो सुव्यवस्थित रूपांतरण नियमों द्वारा नियंत्रित होती है।"
    },
    {
      term: "Clockwise Rotation (CW)",
      termHi: "दक्षिणावर्त घूर्णन",
      definition: "Rotational movement in the direction of the hands of a clock (top to right to bottom to left).",
      definitionHi: "घड़ी की सुइयों के चलने की दिशा में होने वाला कोणीय घूर्णन (ऊपर से दाएं, नीचे, बायां)।"
    },
    {
      term: "Anticlockwise Rotation (ACW)",
      termHi: "वामावर्त घूर्णन",
      definition: "Rotational movement in the direction opposite to clock hands (top to left to bottom to right).",
      definitionHi: "घड़ी की सुइयों की विपरीत दिशा में होने वाला कोणीय घूर्णन (ऊपर से बायां, नीचे, दायां)।"
    },
    {
      term: "Cyclic Shift",
      termHi: "चक्रीय विस्थापन",
      definition: "The periodic movement of elements along a bounded polygonal boundary such as a square box.",
      definitionHi: "किसी चौकोर फ्रेम या बहुभुज की परिधि के सहारे प्रतीकों की एक कोने से दूसरे पर नियमित गति।"
    },
    {
      term: "Element Inversion",
      termHi: "तत्व व्युत्क्रमण",
      definition: "A 180-degree flip of an asymmetrical figure producing an upside-down or laterally inverted orientation.",
      definitionHi: "किसी असममित प्रतीक का 180 अंश पर उलट जाना जिससे उसका मुख ठीक विपरीत दिशा में हो जाता है।"
    },
    {
      term: "Single-Element Elimination",
      termHi: "एकल-तत्व उन्मूलन तकनीक",
      definition: "A rapid test-taking technique isolating one symbol at a time to discard non-viable response options quickly.",
      definitionHi: "जटिल आकृतियों में से किसी एक प्रतीक को चुनकर गलत विकल्पों को 5 सेकंड में बाहर करने की विधि।"
    },
    {
      term: "Keyboard Mapping",
      termHi: "कीबोर्ड मैपिंग",
      definition: "Symbol sequences derived from standard physical keyboard character sequences like Shift+1 through Shift+0.",
      definitionHi: "कंप्यूटर कीबोर्ड की संख्या पंक्ति पर Shift कुंजी के साथ आने वाले प्रतीकों का प्राकृतिक क्रम।"
    },
    {
      term: "Alternating Pattern",
      termHi: "एकांतर पैटर्न",
      definition: "A two-state periodic mechanism oscillating between odd-numbered and even-numbered frames.",
      definitionHi: "विषम और सम क्रमांक वाले चित्रों के मध्य दो भिन्न नियमों का चक्रीय दोलन।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal & Non-Verbal Reasoning - Series Section",
      author: "Dr. R.S. Aggarwal",
      description: "नॉन-वर्बल रीजनिंग, प्रतीक श्रेणी और आकृति घूर्णन का देश का सबसे लोकप्रिय संदर्भ ग्रंथ।"
    },
    {
      title: "Non-Verbal Reasoning for Competitive Examinations",
      author: "B.S. Sijwali & Indu Sijwali (Arihant Publications)",
      description: "कोणीय घूर्णन, कोने-से-कोना विस्थापन और नए तत्वों के प्रवेश का चरणबद्ध सचित्र विश्लेषण।"
    },
    {
      title: "CG Vyapam General Mental Ability & Reasoning Archive",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ राज्य स्तरीय परीक्षाओं (पटवारी, उप-अभियंता, उप-निरीक्षक) के वास्तविक आकृति प्रश्न।"
    },
    {
      title: "Analytical & Visual Reasoning Techniques",
      author: "R.V. Praveen",
      description: "दृश्यात्मक प्रश्नों में विकल्प उन्मूलन (Elimination) और समय प्रबंधन की आधुनिक तकनीकें।"
    }
  ],
  confusionBuster: [
    {
      misconception: "पूरी आकृति के सभी 4-5 प्रतीकों को एक साथ देखकर ही सही उत्तर तय किया जा सकता है।",
      clarification: "यह सबसे बड़ी भूल है! सभी तत्वों को एक साथ देखने से आंखें भ्रमित हो जाती हैं। हमेशा केवल एक प्रतीक चुनें, उसकी स्थिति से 2-3 विकल्प काटें, फिर दूसरे से उत्तर तय करें।"
    },
    {
      misconception: "दक्षिणावर्त (CW) और वामावर्त (ACW) में कोई खास अंतर नहीं होता।",
      clarification: "दिशा का अंतर $180^\\circ$ का भ्रम पैदा कर सकता है। दक्षिणावर्त का अर्थ घड़ी की दिशा (Rightward from top) और वामावर्त का अर्थ घड़ी की उल्टी दिशा (Leftward from top) होता है।"
    },
    {
      misconception: "$45^\\circ$ और $90^\\circ$ के घूर्णन में भ्रम होना।",
      clarification: "$90^\\circ$ में आकृति पूरी एक मुख्य दिशा बदलती है (उदा. उत्तर से पूर्व)। $45^\\circ$ में वह केवल आधा रास्ता तय करती है (उदा. उत्तर से उत्तर-पूर्व)।"
    },
    {
      misconception: "यदि कोई नया प्रतीक अचानक आ जाए, तो प्रश्न में मुद्रण दोष है।",
      clarification: "कदापि नहीं! यह व्यापम का मानक 'New Element Entry' नियम है जिसमें पुराना प्रतीक हटकर एक नया प्रतीक स्थान ग्रहण करता है।"
    },
    {
      misconception: "प्रतीक श्रेणी केवल गैर-शाब्दिक (चित्रों) के रूप में ही आ सकती है।",
      clarification: "नहीं! कीबोर्ड वर्णों की स्ट्रिंग (जैसे ! @ # $ %) या गणितीय प्रतीकों (+ - × ÷) की शाब्दिक श्रृंखला भी व्यापक रूप से पूछी जाती है।"
    }
  ],
  faqList: [
    {
      question: "प्रतीक श्रेणी के नॉन-वर्बल प्रश्नों को हल करने की सबसे तेज विधि क्या है?",
      answer: "एकल-तत्व उन्मूलन विधि (Single-Element Elimination)। किसी एक कोने के विशिष्ट प्रतीक की अगली स्थिति देखकर तुरंत गलत विकल्पों को बाहर करें।"
    },
    {
      question: "यदि घूर्णन कोण हर पद में बदल रहा हो तो उसे कैसे पहचानें?",
      answer: "क्रमागत पदों के बीच के कोण लिखें: यदि पहले में $45^\\circ$, दूसरे में $90^\\circ$, तीसरे में $135^\\circ$ है, तो यह स्पष्टतः $+45^\\circ$ की दर से बढ़ रहा है।"
    },
    {
      question: "कीबोर्ड प्रतीक श्रृंखला (! @ # $ % ^) का आधार क्या होता है?",
      answer: "यह कंप्यूटर कीबोर्ड पर Shift + 1, 2, 3, 4, 5, 6 का क्रम होता है। इसका अगला पद Shift + 7 (&) होता है।"
    },
    {
      question: "आकृति वाले प्रश्नों में समय कैसे बचाएं?",
      answer: "पूरी आकृति को रफ शीट पर कभी न बनाएं। सीधे स्क्रीन पर विकल्पों के अंतरों की तुलना करें।"
    },
    {
      question: "CG Vyapam में इस टॉपिक का कितना महत्व है?",
      answer: "व्यापम के उप-अभियंता, पटवारी और हॉस्टल वार्डन में नॉन-वर्बल रीजनिंग के तहत प्रतीक और आकृति श्रेणी के 2 से 3 प्रश्न पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "दक्षिणावर्त (CW) का अर्थ घड़ी की दिशा और वामावर्त (ACW) का अर्थ घड़ी की उल्टी दिशा है।",
    "$45^\\circ$ घूर्णन कोने से भुजा के मध्य और $90^\\circ$ एक भुजा से अगली भुजा तक होता है।",
    "$360^\\circ$ घूर्णन के उपरांत आकृति पुनः अपनी मूल प्रारंभिक स्थिति में आ जाती है।",
    "जटिल बॉक्स प्रश्नों में 'सिंगल-एलिमेंट एलिमिनेशन' तकनीक से 10 सेकंड में उत्तर मिलता है।",
    "कंप्यूटर कीबोर्ड पर Shift + 1 से 7 तक के प्रतीक: ! @ # $ % ^ &।",
    "बहुभुज रेखा नियम में भुजाओं की संख्या क्रमशः $3, 4, 5, 6, 7$ बढ़ती है।",
    "एकांतर क्रम में विषम और सम चित्रों पर दो स्वतंत्र नियम लागू होते हैं।",
    "नए तत्व का प्रवेश (New Element Entry) में एक पुराना प्रतीक हटकर नया प्रतीक आता है।",
    "रफ शीट पर आकृति कभी न बनाएं, सीधे स्क्रीन पर विकल्पों का अंतर देखें।",
    "छायांकन (Shading) का घूर्णन प्रायः $90^\\circ$ या $180^\\circ$ के अंतराल पर होता है।"
  ],
  rapidRevision: {
    points: [
      "CW vs ACW: दक्षिणावर्त = घड़ी के अनुसार; वामावर्त = घड़ी के विपरीत।",
      "Standard Angles: $45^\\circ$ (आधा कोना), $90^\\circ$ (समकोण), $180^\\circ$ (विपरीत/उल्टा)।",
      "Single-Element Elimination: एक प्रतीक चुनकर 3 गलत विकल्प तुरंत काटें।",
      "Shift Sequence: ! @ # $ % ^ & * ( कीबोर्ड 1-8 की पंक्ति)।",
      "Full Circle Law: $4 \\times 90^\\circ = 360^\\circ \\implies$ मूल स्थिति की पुनरावृत्ति।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_ser_4_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_ser_4');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_ser_4 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_1', 'reas_ser_4');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
