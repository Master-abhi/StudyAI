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

const reas_cd_4_data = {
  topicId: "reas_cd_4",
  topicName: "Artificial Language",
  topicNameHi: "कृत्रिम भाषा / प्रतीक कोडिंग (Fictitious / Symbol Coding)",
  chapterId: "cgv_master_sub_4_ch_3",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "कृत्रिम भाषा कोडिंग (Artificial Language / Fictitious Language Coding / Chinese Coding) और प्रतीक कोडिंग (Symbol Coding) कूटलेखन का एक अत्यंत रोचक एवं विशुद्ध तार्किक प्रारूप है। इसमें काल्पनिक शब्दों (उदा. 'tik pit se', 'la pa da') या विशेष प्रतीकों (@, #, $, %, & आदि) का उपयोग करके वास्तविक वाक्यों और शब्दों को एक गुप्त सांकेतिक भाषा में प्रस्तुत किया जाता है। परीक्षार्थी को 3 या 4 दिए गए कूट-कथनों की परस्पर तुलना (Cross-Comparison) करके उभयनिष्ठ शब्दों (Common Words) और उनके संगत कूट-संकेतों को पृथक करना होता है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, हॉस्टल वार्डन, राजस्व निरीक्षक, श्रम उप-निरीक्षक) तथा CGPSC CSAT में कृत्रिम भाषा और प्रतिस्थापन कोडिंग से 2 से 4 प्रश्न अनिवार्य रूप से पूछे जाते हैं। यह टॉपिक अभ्यर्थी की तुलनात्मक विश्लेषण क्षमता, तार्किक निष्कर्षण (Deductive Elimination) और एकाग्रता की वास्तविक परीक्षा लेता है।",
    examRelevance: "परीक्षाओं में मुख्य रूप से 3 प्रारूप पूछे जाते हैं: (1) वाक्य तुलना कोडिंग (उदा. 'pit dar na' = 'you are good', 'dar tok pa' = 'good and bad'), (2) कृत्रिम शब्द-मूल कोडिंग (जहाँ उपसर्ग-प्रत्यय जैसे 'morntag', 'gorblnor' के अर्थ डिकोड करने होते हैं), तथा (3) प्रत्यक्ष प्रतिस्थापन कोडिंग (Substitution: 'यदि जल को भोजन कहा जाए, भोजन को वृक्ष कहा जाए... तो प्यास लगने पर क्या पिएंगे?')।",
    quickFacts: [
      "कृत्रिम भाषा का मौलिक नियम: कूट-शब्दों का क्रम वास्तविक शब्दों के क्रम के अनुसार होना बिल्कुल आवश्यक नहीं होता; 'पहला शब्द = पहला कोड' मानना सबसे बड़ी भूल है।",
      "उभयनिष्ठता का सिद्धांत (Principle of Commonality): यदि दो वाक्यों में केवल एक वास्तविक शब्द उभयनिष्ठ (Common) है, तो उनके कूट-वाक्यों में भी केवल एक ही कूट-शब्द उभयनिष्ठ होगा, वही उसका सही कोड होगा!",
      "प्रतिस्थापन कोडिंग (Substitution Trap): 'X को Y कहा जाए' वाले प्रश्नों में वास्तविक उत्तर के ठीक **अगले शब्द** (Next Word) को उत्तर चुना जाता है।",
      "'का अर्थ है' (Means) बनाम 'कहा जाता है' (Called) का अंतर: 'A is called B' में उत्तर B होता है, जबकि 'A means B' में उत्तर A होता है।",
      "रफ शीट पर ज्यामितीय आकृतियों (वृत्त $\\bigcirc$, वर्ग $\\square$, त्रिभुज $\\Delta$) से उभयनिष्ठ शब्दों को घेरने से 10 सेकंड में सभी शब्दों के कोड स्पष्ट हो जाते हैं।"
    ]
  },
  chapters: [
    {
      id: "ch1_sentence_comparison_coding",
      title: "वाक्य तुलना पद्धति एवं कूट निष्कर्षण (Sentence Comparison / Chinese Coding)",
      content: `### 1. वाक्य तुलना पद्धति (Cross-Sentence Elimination)

इस पद्धति में 3 या 4 वाक्य और उनके सामने उनके कूट-वाक्य दिए जाते हैं:

#### उदाहरणात्मक समस्या:
1. **'tik pit se'** का अर्थ है **'truth is eternal'**
2. **'pit dar na'** का अर्थ है **'love is eternal'**
3. **'dar tok pa'** का अर्थ है **'love and joy'**

#### चरणबद्ध हल करने की अचूक विधि:
1. **कथन 1 और कथन 2 की तुलना:**
   - वास्तविक वाक्यों में उभयनिष्ठ शब्द: **'is'** और **'eternal'** (दो शब्द उभयनिष्ठ)
   - कूट-वाक्यों में उभयनिष्ठ कोड: **'pit'** और ... ध्यान दें:
   - यदि कथन 1 और 2 में 'is eternal' दोनों हैं, तो 'is eternal' = 'tik'/'pit'/'se' में से दो।
   - कथन 1 में शेष शब्द 'truth' = **'tik'** या **'se'**।

2. **कथन 2 और कथन 3 की तुलना:**
   - वास्तविक वाक्यों में उभयनिष्ठ शब्द: केवल **'love'**
   - कूट-वाक्यों में उभयनिष्ठ कोड: केवल **'dar'**
   - $\\implies$ **'love' = 'dar'** (100% निश्चित!)

3. **कथन 2 में प्रतिस्थापन:**
   - कथन 2 था: 'pit dar na' = 'love is eternal'
   - चूंकि 'love' = 'dar', अतः शेष 'is eternal' = 'pit' और 'na'।
   - अब कथन 1 ('tik pit se' = 'truth is eternal') में देखें:
     - दोनों में उभयनिष्ठ कोड: **'pit'**
     - दोनों में उभयनिष्ठ शब्द: **'eternal'** (या 'is') $\\implies$ 'eternal' = **'pit'**।
   - कथन 2 में शेष बचा: **'is' = 'na'**।
   - कथन 1 में शेष बचा: **'truth' = 'tik'** (या 'se')।

4. **कथन 3 में शेष शब्द:**
   - 'dar tok pa' = 'love and joy'
   - चूंकि 'love' = 'dar', अतः 'and joy' = 'tok pa' (या तो 'tok' या 'pa')।`
    },
    {
      id: "ch2_artificial_word_roots",
      title: "कृत्रिम भाषा के शब्द-मूल एवं व्याकरण (Artificial Language / Root Words)",
      content: `### 2. कृत्रिम भाषा के शब्द-मूल (Prefix, Suffix & Root Analysis)

इस प्रारूप में कुछ कृत्रिम यौगिक शब्द और उनके अंग्रेजी/हिंदी अर्थ दिए जाते हैं:

#### उदाहरणात्मक समस्या:
- **gorblflur** का अर्थ है **fan belt**
- **pixngorbl** का अर्थ है **ceiling fan**
- **arthtusl** का अर्थ है **tile roof**

#### विश्लेषण की तकनीक:
1. **उभयनिष्ठ खंड की पहचान:**
   - प्रथम दो शब्दों में 'fan' शब्द उभयनिष्ठ है।
   - कृत्रिम शब्दों में **'gorbl'** खंड उभयनिष्ठ है।
   - अतः **fan = gorbl**।
2. **स्थान का निर्धारण:**
   - *gorblflur* में gorbl पहले है (fan belt $\\implies$ fan = gorbl, belt = flur)।
   - *pixngorbl* में gorbl बाद में है (ceiling fan $\\implies$ fan = gorbl, ceiling = pixn)।
3. **अज्ञात शब्द का निर्माण:**
   - प्रश्न: **'ceiling tile'** का कोड क्या हो सकता है?
   - ceiling = **pixn**
   - tile = **arth** (arthtusl से)
   - अतः कोड = **pixnarth** या **arthpixn** (विकल्प के व्याकरणिक क्रम के अनुसार)।`
    },
    {
      id: "ch3_substitution_coding",
      title: "प्रतिस्थापन कोडिंग एवं भाषिक भ्रम (Substitution Coding / 'Called' vs 'Means')",
      content: `### 3. प्रतिस्थापन कोडिंग (Substitution Coding) के स्वर्णिम नियम

यह व्यापम का सबसे लोकप्रिय और त्वरित 5-सेकंड प्रश्न है, परंतु इसमें शब्दावली का एक अत्यंत सूक्ष्म 'ट्रैप' छिपा होता है:

#### 1. प्रारूप 1: 'कहा जाए' (Called / Is Known As):
- **प्रश्न:** *"यदि जल को भोजन कहा जाए, भोजन को वृक्ष कहा जाए, वृक्ष को आकाश कहा जाए और आकाश को दीवार कहा जाए, तो फल किस पर लगेंगे?"*
- **हल करने का 2-चरणीय नियम:**
  - **चरण 1:** प्रश्न का वास्तविक उत्तर सोचें: फल किस पर लगते हैं? $\\implies$ **वृक्ष (Tree)** पर।
  - **चरण 2:** प्रश्न में देखें कि वृक्ष को क्या 'कहा गया' है: *"वृक्ष को **आकाश** कहा जाए"*।
  - अतः सही उत्तर = **आकाश (Sky)**।

#### 2. प्रारूप 2: 'का अर्थ है' (Means Trap):
- **प्रश्न:** *"यदि लाल का अर्थ पीला है, पीले का अर्थ हरा है, हरे का अर्थ सफेद है, तो घास का रंग क्या होगा?"*
- **गंभीर अंतर (Critical Difference):**
  - जब वाक्य में **'का अर्थ है' (Means)** प्रयुक्त हो, तो आपको **पीछे वाला शब्द (Preceding Word)** चुनना होता है!
  - घास का वास्तविक रंग 'हरा' होता है।
  - प्रश्न में: *"पीले का अर्थ हरा है"* (Yellow means Green)।
  - अतः उत्तर = **पीला (Yellow)**!

#### 'कहा जाए' बनाम 'का अर्थ है' तुलना सूत्र:
$$\\text{Called / कहा जाए} \\implies \\text{Next Word (आगे बढ़ें)}$$
$$\\text{Means / का अर्थ है} \\implies \\text{Previous Word (पीछे हटें)}$$`
    },
    {
      id: "ch4_symbolic_coding_systems",
      title: "प्रतीक कोडिंग एवं अंक-प्रतीक संलयन (Symbolic Ciphers)",
      content: `### 4. प्रतीक कोडिंग (Symbol Coding)

इस प्रारूप में अक्षरों को कीबोर्ड प्रतीकों द्वारा सीधे मैप किया जाता है:

#### उदाहरणात्मक समस्या:
- यदि **B R E A K** को **% @ $ # &** लिखा जाता है, और
- **T U R N** को **? © @ !** लिखा जाता है,
- तो **B A N K** का कोड क्या होगा?

#### समाधान:
- यह विशुद्ध **प्रत्यक्ष प्रतीक कोडिंग (Direct Symbol Coding)** है:
  - B = %
  - A = #
  - N = !
  - K = &
- अतः BANK का अभीष्ट कोड = **% # ! &**।`
    },
    {
      id: "ch5_vyapam_speed_elimination",
      title: "व्यापम स्पीड हैक्स एवं रफ वर्क तकनीक (Speed Hacks)",
      content: `### 5. कृत्रिम भाषा कोडिंग के लिए 'शेप मेथड' (The Shape Method)

वाक्य तुलना के लंबे प्रश्नों को हल करते समय समय बचाने के लिए यह विधि अपनाएं:

#### शेप मेथड (The Shape Method):
- रफ शीट पर पूरे वाक्य न लिखें!
- प्रश्न पत्र या स्क्रीन को देखते हुए केवल उभयनिष्ठ शब्दों पर अलग-अलग आकृतियां बनाएं:
  - पहले उभयनिष्ठ युग्म पर: **वृत्त (Circle $\\bigcirc$)**
  - दूसरे उभयनिष्ठ युग्म पर: **वर्ग (Square $\\square$)**
  - तीसरे उभयनिष्ठ युग्म पर: **त्रिभुज (Triangle $\\Delta$)**
  - चौथे पर: **नीचे रेखा (Underline $\\underline{\\quad}$)**
- जिस शब्द का कोड पूछा गया है, उस पर बनी आकृति वाला कोड ही 5 सेकंड में आपका सटीक उत्तर होगा।`
    }
  ],
  comparativeTables: [
    {
      title: "'कहा जाए' (Called) बनाम 'का अर्थ है' (Means) का निर्णायक अंतर",
      headers: ["मापदंड", "'कहा जाए' (Is Called)", "'का अर्थ है' (Means)"],
      rows: [
        { cells: ["वाक्य संरचना", "\"A को B कहा जाए\"", "\"A का अर्थ B है\""] },
        { cells: ["तार्किक दिशा", "अग्रगामी (Forward: $A \\to B$)", "पश्चगामी (Backward: $B \\leftarrow A$)"] },
        { cells: ["उत्तर चयन नियम", "वास्तविक उत्तर का अगला शब्द चुनें", "जिस शब्द का अर्थ वास्तविक उत्तर हो, वह चुनें"] },
        { cells: ["उदा. (आसमान नीला है)", "नीले को हरा कहा जाए $\\implies$ उत्तर: **हरा**", "हरे का अर्थ नीला है $\\implies$ उत्तर: **हरा**"] },
        { cells: ["परीक्षा में भ्रम", "सरल और सीधा", "अत्यंत भ्रामक (परीक्षार्थी प्रायः गलत करते हैं)"] }
      ]
    },
    {
      title: "कृत्रिम भाषा के विभिन्न प्रारूप एवं समाधान पद्धति",
      headers: ["प्रारूप", "प्रस्तुति का प्रकार", "हल करने की तकनीक", "लगा समय"],
      rows: [
        { cells: ["वाक्य तुलना (Chinese Coding)", "3-4 वाक्यों के कूट समूह", "उभयनिष्ठता का सिद्धांत / शेप मेथड", "15 से 20 सेकंड"] },
        { cells: ["कृत्रिम शब्द-मूल (Roots)", "काल्पनिक यौगिक शब्द (उदा. gorblflur)", "उपसर्ग/प्रत्यय विखंडन", "10 से 15 सेकंड"] },
        { cells: ["प्रतिस्थापन (Substitution)", "'जल को भोजन कहा जाए...'", "वास्तविक उत्तर + 1 शब्द आगे", "5 सेकंड"] },
        { cells: ["प्रतीक मैपिंग (Symbol)", "अक्षर $\\to$ प्रतीक (% @ # $)", "प्रत्यक्ष अक्षर मिलान", "5 सेकंड"] }
      ]
    },
    {
      title: "उभयनिष्ठता सिद्धांत: शब्दों एवं कोडों का मिलान",
      headers: ["कथन युग्म", "उभयनिष्ठ वास्तविक शब्द", "उभयनिष्ठ कूट शब्द", "निष्कर्ष कोड"],
      rows: [
        { cells: ["कथन 1 एवं 2", "good", "dar", "good = dar"] },
        { cells: ["कथन 1 एवं 3", "boy", "pa", "boy = pa"] },
        { cells: ["कथन 2 एवं 3", "is", "tok", "is = tok"] },
        { cells: ["कथन 1 में शेष", "tall", "se (एकमात्र शेष)", "tall = se"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "यदि 'हवा' को 'हरा' कहा जाए, 'हरे' को 'लाल' कहा जाए, 'लाल' को 'समुद्र' कहा जाए, 'समुद्र' को 'नीला' कहा जाए, 'नीले' को 'जल' कहा जाए, तो स्वच्छ आकाश का रंग क्या होगा? [CG Vyapam Patwari Exam]",
      options: ["जल", "समुद्र", "नीला", "लाल"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "चरण 1: स्वच्छ आकाश का वास्तविक रंग क्या होता है? $\\implies$ नीला (Blue)।\nचरण 2: प्रश्न में देखें कि नीले को क्या कहा गया है: *'नीले को जल कहा जाए'*।\nअतः सही उत्तर **जल** होगा।"
    },
    {
      id: "pyq2",
      question: "किसी सांकेतिक भाषा में '786' का अर्थ है 'study very hard', '958' का अर्थ है 'hard work pays', और '645' का अर्थ है 'study and work'। इस भाषा में 'very' का कोड क्या होगा? [CG Vyapam Subedar / SI Prelims]",
      options: ["7", "8", "6", "9"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "तुलना करें:\n1. '786' = 'study very hard' तथा '958' = 'hard work pays'\n- दोनों में उभयनिष्ठ शब्द = 'hard'\n- दोनों में उभयनिष्ठ अंक = '8'\n$\\implies$ **hard = 8**।\n\n2. '786' = 'study very hard' तथा '645' = 'study and work'\n- दोनों में उभयनिष्ठ शब्द = 'study'\n- दोनों में उभयनिष्ठ अंक = '6'\n$\\implies$ **study = 6**।\n\n3. प्रथम कथन '786' में शेष शब्द = 'very', और शेष अंक = '7'।\nअतः **very = 7**।"
    },
    {
      id: "pyq3",
      question: "यदि किसी कृत्रिम भाषा में 'morkap' का अर्थ 'blue water' है, और 'kaptusl' का अर्थ 'water river' है, तो 'kap' का अर्थ क्या है? [CGPSC CSAT]",
      options: ["water", "blue", "river", "sky"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "दोनों कृत्रिम शब्दों में उभयनिष्ठ खंड: 'kap'\nदोनों वास्तविक अर्थों में उभयनिष्ठ शब्द: 'water'\nअतः 'kap' का अर्थ **water** है।"
    },
    {
      id: "pyq4",
      question: "यदि 'कुत्ते' को 'बिल्ली', 'बिल्ली' को 'शेर', 'शेर' को 'बैल', 'बैल' को 'मुर्गा' कहा जाए, तो हल कौन चलाएगा? [CG Vyapam Hostel Warden]",
      options: ["मुर्गा", "बैल", "शेर", "बिल्ली"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "वास्तविक उत्तर: खेतों में हल 'बैल' चलाता है।\nप्रश्न के अनुसार: 'बैल को मुर्गा कहा जाए'।\nअतः अभीष्ट उत्तर **मुर्गा** होगा।"
    },
    {
      id: "pyq5",
      question: "किसी कूटभाषा में 'pit dar na' का अर्थ है 'you are good', 'dar tok pa' का अर्थ है 'good and bad', और 'tim na tok' का अर्थ है 'they are bad'। इस भाषा में 'they' का कोड क्या होगा? [CG Vyapam Revenue Inspector]",
      options: ["tim", "na", "tok", "pit"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "तुलना:\n- कथन 1 और 2 में 'good' = 'dar'\n- कथन 2 और 3 में 'bad' = 'tok'\n- कथन 1 और 3 में 'are' = 'na'\nकथन 3 ('tim na tok' = 'they are bad') में:\n- 'na' = are, 'tok' = bad\n- अतः शेष शब्द **'they' = 'tim'** होगा।"
    },
    {
      id: "pyq6",
      question: "यदि 'प्रकाश' का अर्थ 'सुबह' है, 'सुबह' का अर्थ 'अंधेरा' है, 'अंधेरे' का अर्थ 'रात' है, 'रात' का अर्थ 'दोपहर' है, तो सूर्य किस समय उगता है? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["अंधेरा", "प्रकाश", "सुबह", "रात"],
      correctOption: 1,
      examName: "CG Vyapam DEO",
      explanation: "यहाँ 'का अर्थ है' (Means) प्रयुक्त हुआ है!\n- सूर्य वास्तव में 'सुबह' उगता है।\n- प्रश्न में दिया है: *'प्रकाश का अर्थ सुबह है'* (Light means Morning)।\n- अतः अभीष्ट उत्तर **प्रकाश** होगा!"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "यदि 'पुस्तक' को 'घड़ी', 'घड़ी को 'थैला', 'थैले' को 'शब्दकोश' और 'शब्दकोश' को 'खिड़की' कहा जाए, तो पुस्तकें ले जाने के लिए किसका प्रयोग करेंगे?",
      options: ["शब्दकोश", "थैला", "घड़ी", "खिड़की"],
      correctOption: 0,
      explanation: "पुस्तकें ले जाने के लिए 'थैला' (Bag) प्रयुक्त होता है। प्रश्न में 'थैले को शब्दकोश कहा जाए'। अतः उत्तर **शब्दकोश** होगा।"
    },
    {
      id: "mcq2",
      question: "यदि 'ka bi la' का अर्थ 'some good boys', 'la no pa' का अर्थ 'real good girls', तो 'good' का कोड क्या है?",
      options: ["la", "ka", "bi", "pa"],
      correctOption: 0,
      explanation: "दोनों वाक्यों में उभयनिष्ठ शब्द 'good' है और उभयनिष्ठ कोड **'la'** है। अतः good = la।"
    },
    {
      id: "mcq3",
      question: "कृत्रिम भाषा: यदि 'tamceno' का अर्थ 'sky blue' है, और 'cenorax' का अर्थ 'blue cheese' है, तो 'ceno' का अर्थ क्या होगा?",
      options: ["blue", "sky", "cheese", "white"],
      correctOption: 0,
      explanation: "दोनों में उभयनिष्ठ खंड 'ceno' है और उभयनिष्ठ अर्थ 'blue' है। अतः ceno = blue।"
    },
    {
      id: "mcq4",
      question: "यदि 'चोर' को 'सिपाही', 'सिपाही' को 'डकैत', 'डकैत' को 'न्यायाधीश' कहा जाए, तो न्यायालय में न्याय कौन करेगा?",
      options: ["न्यायाधीश", "डकैत", "सिपाही", "चोर"],
      correctOption: 0,
      explanation: "न्यायालय में न्याय 'न्यायाधीश' करता है। चूंकि प्रश्न में 'न्यायाधीश को...' आगे कोई शब्द नहीं दिया गया, अतः यहाँ उत्तर स्वयं **न्यायाधीश** ही रहेगा (या यदि 'न्यायाधीश को वकील कहा जाए' होता तो वकील होता)।"
    },
    {
      id: "mcq5",
      question: "किसी सांकेतिक भाषा में '123' का अर्थ 'hot filtered coffee', '356' का अर्थ 'very hot day', और '589' का अर्थ 'day and night' है। 'very' का कोड क्या है?",
      options: ["6", "3", "5", "8"],
      correctOption: 0,
      explanation: "- 123 और 356 में 'hot' = 3\n- 356 और 589 में 'day' = 5\n- 356 में शेष शब्द 'very' = **6**।"
    },
    {
      id: "mcq6",
      question: "यदि किसी कोड में 'P @ Q' का अर्थ 'P is father of Q', और 'B # C' का अर्थ 'B is sister of C' है, तो यह किस प्रकार की कोडिंग है?",
      options: ["प्रतीक / कृत्रिम कोडिंग", "संख्या कोडिंग", "मैट्रिक्स कोडिंग", "अक्षर कोडिंग"],
      correctOption: 0,
      explanation: "यह प्रतीकों द्वारा संबंधों को दर्शाने वाली प्रतीक कोडिंग (Symbol / Coded Relation) है।"
    },
    {
      id: "mcq7",
      question: "यदि 'सफेद' का अर्थ 'काला' है, 'काले' का अर्थ 'पीला' है, 'पीले' का अर्थ 'नीला' है, तो मानव रक्त का रंग क्या होगा यदि 'लाल' का अर्थ 'सफेद' हो?",
      options: ["सफेद", "काला", "लाल", "पीला"],
      correctOption: 0,
      explanation: "रक्त का वास्तविक रंग लाल होता है। प्रश्न में 'लाल का अर्थ सफेद है' (Red means White)। अतः उत्तर **सफेद** होगा।"
    },
    {
      id: "mcq8",
      question: "यदि 'nee tim see' का अर्थ 'how are you', और 'tim ble see' का अर्थ 'where are you' है, तो 'how' का कोड क्या होगा?",
      options: ["nee", "tim", "see", "ble"],
      correctOption: 0,
      explanation: "दोनों में 'are you' = 'tim see'। प्रथम वाक्य में शेष शब्द 'how' = **'nee'**।"
    }
  ],
  keyTerminology: [
    {
      term: "Artificial Language Coding",
      termHi: "कृत्रिम भाषा कोडिंग",
      definition: "A cryptographic cipher simulating synthetic vocabulary, grammar roots, or pseudo-words to encode natural language phrases.",
      definitionHi: "काल्पनिक शब्दों, उपसर्ग-प्रत्यय और कृत्रिम शब्दावली द्वारा प्राकृतिक भाषा के वाक्यों को कूटबद्ध करने की पद्धति।"
    },
    {
      term: "Principle of Commonality",
      termHi: "उभयनिष्ठता का सिद्धांत",
      definition: "The core deduction rule where an identical word appearing in two distinct sentences correlates strictly with the shared code symbol.",
      definitionHi: "वह मौलिक नियम जिसके अनुसार दो वाक्यों में उभयनिष्ठ वास्तविक शब्द उनके कूटों में उपस्थित एकमात्र उभयनिष्ठ कूट-शब्द के बराबर होता है।"
    },
    {
      term: "Substitution Coding",
      termHi: "प्रतिस्थापन कोडिंग",
      definition: "A transitive semantic chain where objects are sequentially renamed (A is called B, B is called C) requiring one-step lookup.",
      definitionHi: "एक रैखिक नामकरण शृंखला जिसमें प्रत्येक वस्तु को एक नया काल्पनिक नाम दिया जाता है (उदा. जल को भोजन कहा जाए)।"
    },
    {
      term: "'Means' vs 'Called' Distinction",
      termHi: "'का अर्थ है' बनाम 'कहा जाए' विभेद",
      definition: "The operational contrast where 'Called' prompts selecting the successor token, while 'Means' mandates selecting the predecessor token.",
      definitionHi: "वह महत्वपूर्ण नियम जहाँ 'कहा जाए' में वास्तविक उत्तर का अगला शब्द और 'का अर्थ है' में पिछला शब्द चुना जाता है।"
    },
    {
      term: "The Shape Method",
      termHi: "शेप मेथड / आकृति तकनीक",
      definition: "A rapid scratchpad visualization technique marking common word pairs with geometric shapes (circles, squares, triangles) to isolate codes visually.",
      definitionHi: "उभयनिष्ठ शब्दों और कोडों पर वृत्त, वर्ग या त्रिभुज बनाकर बिना रफ वर्क के 10 सेकंड में कोड निकालने की तकनीक।"
    },
    {
      term: "Chinese Coding",
      termHi: "चाइनीज कोडिंग / वाक्य तुलना",
      definition: "A colloquial industry name for multi-statement fictitious language comparison questions.",
      definitionHi: "3 या 4 वाक्यों के कूट-समूहों की परस्पर तुलना द्वारा शब्दों के कोड निकालने वाले प्रश्नों का प्रचलित नाम।"
    },
    {
      term: "Symbolic Cipher",
      termHi: "प्रतीक कूटलेखन",
      definition: "Directly substituting characters or operations using non-alphanumeric punctuation marks like @, #, $, %, &.",
      definitionHi: "अक्षरों या संक्रियाओं को सीधे विशिष्ट विराम चिह्नों एवं कीबोर्ड प्रतीकों (@, #, $) द्वारा प्रतिस्थापित करना।"
    },
    {
      term: "Residual Isolation",
      termHi: "अवशिष्ट पृथक्करण",
      definition: "Deducing the final unknown word-code pairing from a sentence after eliminating all other resolved elements.",
      definitionHi: "वाक्य के अन्य सभी शब्दों के कोड निकल जाने के बाद अंत में बचे एकमात्र शब्द को बचे हुए एकमात्र कोड के बराबर मानना।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Fictitious Language Section",
      author: "Dr. R.S. Aggarwal",
      description: "कृत्रिम भाषा, वाक्य तुलना (चाइनीज कोडिंग) और प्रतिस्थापन कोडिंग का मानक एवं विस्तृत संकलन।"
    },
    {
      title: "Analytical Reasoning: Deductive Coding & Logic Systems",
      author: "M.K. Pandey",
      description: "'कहा जाए' बनाम 'का अर्थ है' के भाषाई अंतर और उभयनिष्ठता सिद्धांत का वैज्ञानिक विश्लेषण।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "व्यापम द्वारा पटवारी, सूबेदार, राजस्व निरीक्षक और छात्रावास अधीक्षक में पूछे गए वास्तविक कृत्रिम भाषा प्रश्न।"
    },
    {
      title: "How to Crack Test of Reasoning - Substitution Section",
      author: "Arihant Publications",
      description: "शेप मेथड और त्वरित विकल्प उन्मूलन द्वारा 5-सेकंड समाधान तकनीकों का संग्रह।"
    }
  ],
  confusionBuster: [
    {
      misconception: "कृत्रिम भाषा के वाक्य में शब्दों का जो क्रम है, कोडों का क्रम भी ठीक वही होगा।",
      clarification: "यह सबसे बड़ी और घातक गलती है! 'pit dar na' = 'you are good' में pit का अर्थ you होना कतई आवश्यक नहीं है; सही कोड केवल दूसरे वाक्यों से तुलना करके ही निकाला जा सकता है।"
    },
    {
      misconception: "'लाल को पीला कहा जाए' और 'लाल का अर्थ पीला है' दोनों में एक ही उत्तर आता है।",
      clarification: "दोनों बिल्कुल विपरीत हैं! 'कहा जाए' (Called) में वास्तविक उत्तर से **आगे** बढ़ते हैं, जबकि 'का अर्थ है' (Means) में **पीछे** हटते हैं।"
    },
    {
      misconception: "वाक्य तुलना के प्रश्न में सभी वाक्यों को रफ शीट पर पूरा लिखना चाहिए।",
      clarification: "वाक्य दोबारा लिखने में 1 मिनट नष्ट होता है। स्क्रीन पर ही 'शेप मेथड' (समान शब्दों पर समान आकृति) अपनाकर 10 सेकंड में उत्तर निकालें।"
    },
    {
      misconception: "यदि किसी शब्द का कोड किसी अन्य वाक्य में न मिले, तो प्रश्न अधूरा है।",
      clarification: "नहीं! यदि वाक्य के अन्य सभी शब्दों का कोड मिल गया हो, तो जो एक शब्द और एक कोड बचता है (Residual), वे दोनों स्वतः एक-दूसरे के कोड होते हैं।"
    },
    {
      misconception: "प्रतिस्थापन कोडिंग में पूरी शृंखला के अंतिम शब्द तक जाना होता है।",
      clarification: "कभी नहीं! केवल वास्तविक उत्तर के ठीक बाद वाला अगला 1 शब्द ही उत्तर होता है (उदा. फल वृक्ष पर लगते हैं, वृक्ष को आकाश कहा जाए $\\implies$ उत्तर आकाश)।"
    }
  ],
  faqList: [
    {
      question: "कृत्रिम भाषा कोडिंग को हल करने का सबसे तीव्र नियम क्या है?",
      answer: "उभयनिष्ठता का सिद्धांत (Principle of Commonality)। किन्हीं दो वाक्यों में उभयनिष्ठ वास्तविक शब्द ढूंढें और उनके कूटों में उभयनिष्ठ कोड ढूंढें; दोनों सीधे एक-दूसरे के कोड होते हैं।"
    },
    {
      question: "'A is called B' और 'A means B' में क्या अंतर है?",
      answer: "'A is called B' में यदि वास्तविक उत्तर A है, तो सही उत्तर B होगा। 'A means B' में यदि वास्तविक उत्तर B है, तो सही उत्तर A होगा।"
    },
    {
      question: "यदि दो वाक्यों में दो शब्द एक साथ उभयनिष्ठ आ जाएं तो क्या करें?",
      answer: "तीसरे वाक्य की सहायता लें ताकि उन दोनों में से किसी एक शब्द का स्वतंत्र कोड मिल सके, जिससे दूसरा कोड स्वतः अलग हो जाए।"
    },
    {
      question: "प्रतिस्थापन कोडिंग (Substitution) में समय कैसे बचाएं?",
      answer: "पूरी कहानी पढ़ने के बजाय सीधे प्रश्न के अंतिम वाक्य को पढ़ें कि पूछा क्या गया है, उसका वास्तविक उत्तर सोचें और प्रश्न में देखें कि उसे क्या कहा गया है।"
    },
    {
      question: "CG Vyapam में इस टॉपिक का कितना महत्व है?",
      answer: "व्यापम के पटवारी, आरआई और एसआई में प्रतिस्थापन और वाक्य तुलना से मिलाकर 2 से 3 प्रश्न अवश्य पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "कृत्रिम भाषा में शब्दों का क्रम कोड के क्रम से मेल खाना आवश्यक नहीं होता।",
    "उभयनिष्ठता सिद्धांत: दो वाक्यों का उभयनिष्ठ शब्द = दोनों का उभयनिष्ठ कोड।",
    "'कहा जाए' (Called) में वास्तविक उत्तर का ठीक अगला शब्द उत्तर होता है।",
    "'का अर्थ है' (Means) में वास्तविक उत्तर से ठीक पिछला शब्द उत्तर होता है।",
    "शेप मेथड में समान शब्दों पर वृत्त, वर्ग या त्रिभुज बनाकर त्वरित मिलान किया जाता है।",
    "अवशिष्ट नियम (Residual Rule): वाक्य में बचा अंतिम शब्द = बचा अंतिम कोड।",
    "प्रतिस्थापन कोडिंग में सीधे अंतिम प्रश्न पढ़कर वास्तविक उत्तर से 1 कदम आगे बढ़ें।",
    "कृत्रिम शब्द-मूल में उपसर्ग/प्रत्यय का विखंडन करके अर्थ निकाला जाता है।",
    "प्रतीक कोडिंग में अक्षरों का कोड पूर्व-निर्धारित प्रतीकों (% @ # $) से सीधे उठाया जाता है।",
    "स्वच्छ आकाश का रंग नीला होता है; यदि 'नीले को जल कहा जाए' तो उत्तर 'जल' होगा।"
  ],
  rapidRevision: {
    points: [
      "Order Independence: Word order $\\neq$ Code order; always cross-compare statements।",
      "Direction Rule: Called $\\implies$ Next Word; Means $\\implies$ Previous Word।",
      "Commonality Law: 1 common word across 2 sentences = 1 common code।",
      "Residual Law: Last remaining word = Last remaining code in that sentence।",
      "Speed Strategy: Directly read the query at the end to identify the real-world answer first।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_cd_4_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_cd_4');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_cd_4 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_3', 'reas_cd_4');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
