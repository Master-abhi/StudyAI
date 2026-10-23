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

const reas_br_1_data = {
  topicId: "reas_br_1",
  topicName: "Blood Relations",
  topicNameHi: "रक्त संबंध एवं वंश वृक्ष (Blood Relations & Family Tree)",
  chapterId: "cgv_master_sub_4_ch_4",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "रक्त संबंध (Blood Relations) तार्किक योग्यता का एक अत्यंत व्यावहारिक, सामाजिक एवं विश्लेषणात्मक अध्याय है। इसमें दो या दो से अधिक व्यक्तियों के बीच जैविक (Biological) अथवा वैवाहिक (Marital/In-law) संबंधों की एक जटिल शृंखला दी जाती है। परीक्षार्थी को दिए गए कथनों का व्यवस्थित विश्लेषण कर एक मानक 'वंश वृक्ष' (Family Tree) का निर्माण करना होता है और अंत में किन्हीं दो निर्दिष्ट व्यक्तियों के पारस्परिक संबंध (Mutual Relationship) को सटीक रूप से निर्धारित करना होता है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, हॉस्टल वार्डन, राजस्व निरीक्षक, श्रम पदाधिकारी) तथा CGPSC (CSAT एवं राज्य सेवा) में रक्त संबंध से प्रतिवर्ष 2 से 4 प्रश्न अनिवार्य रूप से पूछे जाते हैं। यह अध्याय अभ्यर्थी के संबंधों की समझ, आरेखीय निरूपण और बिना पूर्वाग्रह के तार्किक निष्कर्ष निकालने की क्षमता का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में मुख्य रूप से 3 प्रकार के प्रश्न आते हैं: (1) वार्तालाप / परिचय आधारित प्रश्न (Pointing to a photograph / Person: 'एक तस्वीर की ओर इशारा करते हुए एक महिला ने कहा...'), (2) पहेली रूपी पारिवारिक संबंध (Puzzle-based Family Tree: 6-8 सदस्यों का बहु-पीढ़ी परिवार), तथा (3) पीढ़ी अंतराल (Generation Gap) एवं लिंग निर्धारण (Gender Identification) संबंधी प्रश्न।",
    quickFacts: [
      "लिंग का स्वर्णिम नियम (Golden Rule of Gender): किसी भी व्यक्ति के 'नाम' से उसका लिंग (Male/Female) कभी तय नहीं किया जा सकता; लिंग केवल प्रश्न में दिए गए सर्वनाम (He/She), संबंध (Brother/Sister, Father/Mother) अथवा स्पष्ट कथन से ही निर्धारित होता है।",
      "वंश वृक्ष के 4 मानक प्रतीक: पुरुष = $[+]$ या $\\square$, महिला = $[-]$ या $\\bigcirc$, वैवाहिक संबंध = द्वि-तीर युग्म $(\\Leftrightarrow)$ या $(=)$, भाई-बहन = एकल क्षैतिज रेखा $(-)$, तथा पीढ़ी अंतराल = ऊर्ध्वाधर रेखा $(\\downarrow)$।",
      "संबंध की दिशा (Directionality): 'A का B से क्या संबंध है?' का अर्थ है कि 'A, B का क्या लगता है?' (How is A related to B? $\\implies$ Who is A to B?)। परीक्षार्थी प्रायः B का संबंध A से निकाल देते हैं जो उल्टा हो जाता है।",
      "मातृक (Maternal) बनाम पितृक (Paternal): माता के पक्ष के संबंध 'Maternal' (मामा, मौसी, नाना-नानी) तथा पिता के पक्ष के संबंध 'Paternal' (चाचा, बुआ, दादा-दादी) कहलाते हैं।",
      "एकलौता/एकलौती (Only) का अर्थ: 'मेरे पिता का इकलौता पुत्र' = 'मैं स्वयं' (यदि वक्ता पुरुष है) अथवा 'मेरा भाई' (यदि वक्ता महिला है)।"
    ]
  },
  chapters: [
    {
      id: "ch1_family_tree_symbols",
      title: "वंश वृक्ष की मानक प्रतीकात्मक प्रणाली (Standard Family Tree Symbols & Hierarchy)",
      content: `### 1. वंश वृक्ष (Family Tree) निर्माण की मानक प्रणाली

रक्त संबंध के किसी भी प्रश्न को बिना भ्रम के हल करने का एकमात्र वैज्ञानिक तरीका 'वंश वृक्ष आरेख' (Family Tree Diagram) बनाना है।

#### 1. मानक प्रतीकात्मक संरचना:
- **पुरुष (Male):** $[+]$ (प्लस) अथवा $\\square$ (बॉक्स)
- **महिला (Female):** $[-]$ (माइनस) अथवा $\\bigcirc$ (वृत्त)
- **वैवाहिक जोड़ा (Married Couple / Husband-Wife):** $A \\Leftrightarrow B$ अथवा $A = B$ (दोहरी रेखा)
- **सहोदर / भाई-बहन (Siblings):** $A - B$ (एकल क्षैतिज रेखा)
- **पीढ़ी अंतराल (Generation Gap - माता-पिता से संतान):** ऊर्ध्वाधर रेखा $(\\downarrow)$
  - ऊपर: माता-पिता (Senior Generation)
  - नीचे: पुत्र-पुत्री (Junior Generation)

#### 2. बहु-पीढ़ी पदानुक्रम (Generation Levels):
- **पीढ़ी $+2$ (दादा-दादी, नाना-नानी):** Grandfather, Grandmother, Maternal Grandparents
- **पीढ़ी $+1$ (माता-पिता, चाचा, मामा, बुआ, मौसी):** Father, Mother, Uncle, Aunt
- **पीढ़ी $0$ (स्वयं, भाई, बहन, ममेरा/चचेरा भाई, पति/पत्नी):** Self, Brother, Sister, Cousin, Spouse
- **पीढ़ी $-1$ (पुत्र, पुत्री, भतीजा, भांजा, भतीजी, भांजी):** Son, Daughter, Nephew, Niece
- **पीढ़ी $-2$ (पोता, पोती, नाती, नातिन):** Grandson, Granddaughter`
    },
    {
      id: "ch2_pointing_dialogue_problems",
      title: "परिचय एवं तस्वीर आधारित प्रश्न (Pointing / Dialogue Based Problems)",
      content: `### 2. तस्वीर / व्यक्ति की ओर इशारा करने वाले प्रश्न

इस प्रारूप में एक वक्ता किसी दूसरे व्यक्ति का परिचय एक घुमावदार संबंध के माध्यम से देता है:

#### हल करने की दो प्रमुख विधियां:
1. **रिवर्स स्प्लिटिंग विधि (Backtracking from 'My / मेरे'):**
   - कथन को 'मेरे' (My) शब्द से पढ़ना शुरू करें और स्वयं को उस स्थान पर रखकर पीछे से आगे की ओर डिकोड करें।
   - **उदाहरण:** *"उसकी माता मेरे पिता के इकलौते पुत्र की पत्नी है।"*
     - वक्ता (एक पुरुष) कहता है:
     - 1. *"मेरे पिता"* $\\implies$ वक्ता के पिता
     - 2. *"मेरे पिता का इकलौता पुत्र"* $\\implies$ वक्ता स्वयं!
     - 3. *"की पत्नी"* $\\implies$ वक्ता की पत्नी
     - 4. *"उसकी माता..."* $\\implies$ उस बच्चे की माता वक्ता की पत्नी है।
     - निष्कर्ष: वह बच्चा वक्ता का **पुत्र या पुत्री** है, और वक्ता उसका **पिता** है!

2. **'इकलौता' (Only) शब्दावली के महत्वपूर्ण अर्थ:**
   - **पिता का इकलौता पुत्र (Only Son of Father):**
     - यदि बोलने वाला **पुरुष** है $\\implies$ **वह स्वयं (Self)**।
     - यदि बोलने वाली **महिला** है $\\implies$ **उसका भाई (Her Brother)**।
   - **पिता की इकलौती संतान (Only Child of Father):**
     - चाहे वक्ता पुरुष हो या महिला $\\implies$ **वह स्वयं (Self)**।
   - **ससुर का इकलौता पुत्र (Only Son of Father-in-law):**
     - महिला के लिए $\\implies$ **उसका पति (Her Husband)**।`
    },
    {
      id: "ch3_puzzle_based_relations",
      title: "पहेली आधारित पारिवारिक संबंध (Puzzle-Based Family Relations)",
      content: `### 3. पहेली रूपी पारिवारिक व्यवस्था (Multi-Person Family Puzzles)

इस प्रारूप में 5 से 8 सदस्यों वाले परिवार की जानकारी बिखरे हुए तथ्यों के रूप में दी जाती है:

#### चरणबद्ध समाधान कार्यप्रणाली:
1. **ठोस संबंध से शुरुआत (Anchor Clue):**
   - सबसे पहले उस वाक्य को चुनें जिसमें स्पष्ट पीढ़ी या वैवाहिक संबंध दिया हो (उदा. "A, B का पिता है और C का पति है")।
2. **लिंग का अंकन:**
   - जैसे ही किसी का लिंग पता चले, तुरंत उसके ऊपर $[+]$ या $[-]$ अंकित करें।
   - यदि किसी का लिंग ज्ञात न हो, तो उस पर कोई चिह्न न लगाएं; अपने मन से नाम देखकर लिंग न मानें!
3. **कड़ियों को जोड़ना (Linking the Chains):**
   - उभयनिष्ठ सदस्यों के आधार पर अन्य उप-कथनों को मुख्य वंश वृक्ष से जोड़ते जाएं।
4. **अंतिम सत्यापन:**
   - कुल पुरुषों और महिलाओं की संख्या, विवाहित जोड़ों की संख्या का प्रश्न के प्रारंभिक विवरण से मिलान करें।`
    },
    {
      id: "ch4_in_law_and_maternal_relations",
      title: "ससुराल एवं ननिहाल पक्ष के संबंध (In-Laws & Maternal Nomenclature)",
      content: `### 4. जटिल रिश्तेदारी शब्दावली (In-Laws & Cross Relations)

हिंदी और अंग्रेजी शब्दावली में कई बार परीक्षार्थी भ्रमित हो जाते हैं:

#### 1. ससुराल पक्ष (In-Laws):
- **Brother-in-law:**
  - साला (पत्नी का भाई)
  - देवर / जेठ (पति का छोटा/बड़ा भाई)
  - जीजा (बहन का पति)
  - साढ़ू (पत्नी की बहन का पति)
- **Sister-in-law:**
  - साली (पत्नी की बहन)
  - भाभी (भाई की पत्नी)
  - ननद (पति की बहन)
  - देवरानी / जेठानी (पति के भाई की पत्नी)
- **Father-in-law:** ससुर (पति या पत्नी के पिता)
- **Mother-in-law:** सास (पति या पत्नी की माता)
- **Son-in-law:** दामाद (पुत्री का पति)
- **Daughter-in-law:** पुत्रवधू / बहू (पुत्र की पत्नी)

#### 2. भतीजा/भांजा एवं चचेरे रिश्ते:
- **Nephew:** भतीजा (भाई का पुत्र) अथवा भांजा (बहन का पुत्र)।
- **Niece:** भतीजी (भाई की पुत्री) अथवा भांजी (बहन की पुत्री)।
- **Cousin:** चचेरा, ममेरा, फुफेरा, मौसेरा भाई या बहन (नोट: अंग्रेजी में Cousin Brother या Cousin Sister व्याकरणिक रूप से अशुद्ध माना जाता है, केवल Cousin लिखा जाता है)।`
    },
    {
      id: "ch5_vyapam_traps_speed_hacks",
      title: "परीक्षा कक्ष में गलतियों से बचाव एवं स्पीड हैक्स (Common Pitfalls & Hacks)",
      content: `### 5. रक्त संबंध में 100% सटीकता के स्वर्णिम नियम

1. **'A का B से संबंध' का सही अर्थ:**
   - यदि प्रश्न पूछे: *"A का B से क्या संबंध है?" (How is A related to B?)*
   - इसका अर्थ है: **A कौन है B का?** उत्तर A का पद होगा (उदा. यदि A पिता है और B पुत्र, तो उत्तर 'पिता' होगा, 'पुत्र' नहीं!)।

2. **लिंग अस्पष्टता पर 'तय नहीं किया जा सकता' (Cannot be Determined):**
   - यदि पूरे आरेख के बाद भी किसी व्यक्ति पर न $[+]$ आया हो और न $[-]$, और प्रश्न में उसका संबंध पूछा जाए (उदा. चाचा या बुआ, भाई या बहन), तो यदि विकल्प में 'निर्धारित नहीं किया जा सकता' (Cannot be Determined / Data Inadequate) उपलब्ध हो, तो वही सही उत्तर होगा।

3. **विकल्प उन्मूलन द्वारा लिंग परीक्षण (Gender Elimination):**
   - यदि प्रश्न में पूछा है: *"A का B से क्या संबंध है?"* और वंश वृक्ष में A स्पष्ट रूप से एक **महिला $[-]$** है, तो विकल्पों में से सभी पुरुष संबंध (जैसे भाई, पिता, चाचा, पुत्र) तुरंत काट दें!`
    }
  ],
  comparativeTables: [
    {
      title: "रक्त संबंध के मानक वंश वृक्ष प्रतीक",
      headers: ["संबंध / तत्व", "मानक प्रतीक", "आरेखीय उदाहरण", "व्याख्या"],
      rows: [
        { cells: ["पुरुष सदस्य (Male)", "$[+]$ या $\\square$", "$A[+]$", "लिंग पुरुष के लिए धनात्मक चिह्न"] },
        { cells: ["महिला सदस्य (Female)", "$[-]$ या $\\bigcirc$", "$B[-]$", "लिंग महिला के लिए ऋणात्मक चिह्न"] },
        { cells: ["विवाहित जोड़ा (Spouse)", "द्वि-तीर $(\\Leftrightarrow)$ या $(=)$", "$A[+] \\Leftrightarrow B[-]$", "पति-पत्नी के मध्य दोहरी रेखा"] },
        { cells: ["सहोदर भाई-बहन (Siblings)", "एकल क्षैतिज रेखा $(-)$", "$A[+] - C[-]$", "समान पीढ़ी के भाई-बहन"] },
        { cells: ["पीढ़ी अंतराल (Generation)", "ऊर्ध्वाधर तीर $(\\downarrow)$", "$A[+] \\downarrow D[+]$", "पिता से पुत्र/पुत्री की ओर लंबवत रेखा"] }
      ]
    },
    {
      title: "पीढ़ी पदानुक्रम एवं प्रमुख संबंध तालिका",
      headers: ["पीढ़ी स्तर", "संबंध की श्रेणी", "पितृक संबंध (Paternal)", "मातृक संबंध (Maternal)"],
      rows: [
        { cells: ["$+2$ (दादा-नाना)", "द्वितीय वरिष्ठ पीढ़ी", "दादा, दादी", "नाना, नानी"] },
        { cells: ["$+1$ (माता-पिता)", "प्रथम वरिष्ठ पीढ़ी", "पिता, चाचा, ताऊ, बुआ, फूफा", "माता, मामा, मामी, मौसी, मौसा"] },
        { cells: ["$0$ (स्वयं/सहोदर)", "समकक्ष पीढ़ी", "स्वयं, भाई, बहन, चचेरे भाई/बहन", "ममेरे/मौसेरे भाई/बहन, पत्नी/पति"] },
        { cells: ["$-1$ (संतान)", "प्रथम कनिष्ठ पीढ़ी", "पुत्र, पुत्री, भतीजा, भतीजी", "भांजा, भांजी, दामाद, पुत्रवधू"] },
        { cells: ["$-2$ (पोता-नाती)", "द्वितीय कनिष्ठ पीढ़ी", "पोता, पोती (Grandson/daughter)", "नाती, नातिन (Grandson/daughter)"] }
      ]
    },
    {
      title: "द्वि-अर्थी अंग्रेजी शब्दावली एवं हिंदी समकक्ष",
      headers: ["अंग्रेजी शब्द", "प्राथमिक हिंदी अर्थ", "वैकल्पिक हिंदी अर्थ", "परीक्षा में सावधानी"],
      rows: [
        { cells: ["Uncle", "चाचा (Father's brother)", "मामा, फूफा, मौसा", "विकल्प में विशिष्ट हिंदी नाम देखें"] },
        { cells: ["Aunt", "चाची (Father's brother's wife)", "मामी, बुआ, मौसी", "मातृक या पितृक संदर्भ जांचें"] },
        { cells: ["Nephew", "भतीजा (Brother's son)", "भांजा (Sister's son)", "पुरुष संतान $[-1$ पीढ़ी]"] },
        { cells: ["Niece", "भतीजी (Brother's daughter)", "भांजी (Sister's daughter)", "महिला संतान $[-1$ पीढ़ी]"] },
        { cells: ["Brother-in-law", "साला (Wife's brother)", "जीजा, देवर, जेठ, साढ़ू", "वैवाहिक संबंध की दिशा देखें"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "एक तस्वीर की ओर इशारा करते हुए एक व्यक्ति ने कहा, 'मेरा कोई भाई या बहन नहीं है, लेकिन उस व्यक्ति का पिता मेरे पिता का पुत्र है।' वह व्यक्ति किसकी तस्वीर की ओर इशारा कर रहा था? [CG Vyapam Patwari Exam]",
      options: ["अपने पुत्र की", "अपने पिता की", "अपनी स्वयं की", "अपने भतीजे की"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "वक्ता का विश्लेषण करें:\n- 'मेरा कोई भाई या बहन नहीं है' $\\implies$ वक्ता अपने पिता की इकलौती संतान है।\n- 'मेरे पिता का पुत्र' $\\implies$ वक्ता स्वयं!\n- अब वाक्य पढ़ें: 'उस व्यक्ति का पिता = मेरे पिता का पुत्र (अर्थात मैं स्वयं)'।\n- इसका अर्थ है कि उस तस्वीर वाले व्यक्ति का पिता 'वक्ता स्वयं' है।\nअतः वह तस्वीर वक्ता के **पुत्र की** है।"
    },
    {
      id: "pyq2",
      question: "A, B की बहन है। C, B की माता है। D, C का पिता है। E, D की माता है। तब A का D से क्या संबंध है? [CG Vyapam Subedar / SI Prelims]",
      options: ["नातिन (Granddaughter)", "दादी", "पुत्री", "पौत्री"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "वंश वृक्ष बनाएं:\n- A[-] sister of B\n- C[-] mother of B and A\n- D[+] father of C\n- E[-] mother of D\nप्रश्न पूछा है: 'A का D से क्या संबंध है?' (A कौन है D की?)\n- D की पुत्री C है, और C की पुत्री A है।\n- पुत्री की पुत्री को **नातिन / दौहित्री (Granddaughter)** कहा जाता है।\nअतः सही उत्तर नातिन है।"
    },
    {
      id: "pyq3",
      question: "एक महिला का परिचय देते हुए एक पुरुष ने कहा, 'इसकी माता मेरे ससुर की इकलौती पुत्री है।' उस पुरुष का उस महिला से क्या संबंध है? [CGPSC CSAT]",
      options: ["पिता", "चाचा", "भाई", "पति"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "बैकट्रैकिंग विधि:\n- 'मेरे ससुर की इकलौती पुत्री' $\\implies$ पुरुष के ससुर की इकलौती पुत्री उस पुरुष की **पत्नी** होगी!\n- 'इसकी माता (महिला की माता) = मेरी पत्नी'।\n- यदि उस महिला की माता पुरुष की पत्नी है, तो वह पुरुष उस महिला का **पिता (Father)** है।\nअतः सही उत्तर पिता है।"
    },
    {
      id: "pyq4",
      question: "P, Q का भाई है। R, Q की माता है। S, R का पिता है। T, S की माता है। P का T से क्या संबंध है? [CG Vyapam Hostel Warden]",
      options: ["परपोता (Great Grandson)", "पोता", "पुत्र", "परदादा"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "पीढ़ी स्तर जांचें:\n- P[+] भाई है Q का (पीढ़ी 0)\n- R माता है (पीढ़ी +1)\n- S पिता है R का (पीढ़ी +2 - नाना)\n- T माता है S की (पीढ़ी +3 - परनानी)\nP पुरुष है और T से 3 पीढ़ी नीचे है।\nअतः P, T का **परपोता / पड़नाती (Great Grandson)** है।"
    },
    {
      id: "pyq5",
      question: "एक पुरुष ने एक औरत से कहा, 'तुम्हारी माता के पति की बहन मेरी बुआ है।' वह औरत उस पुरुष से किस प्रकार संबंधित है? [CG Vyapam Revenue Inspector]",
      options: ["बहन", "माता", "पुत्री", "चाची"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "डिकोड करें:\n- 'तुम्हारी (औरत की) माता के पति' $\\implies$ औरत के पिता।\n- 'औरत के पिता की बहन' $\\implies$ औरत की बुआ।\n- 'औरत की बुआ = मेरी (पुरुष की) बुआ'।\nचूंकि दोनों की बुआ एक ही है, अतः वे दोनों आपस में भाई-बहन हैं।\nअतः वह औरत उस पुरुष की **बहन (Sister)** है।"
    },
    {
      id: "pyq6",
      question: "B, D का भाई है। D, E की बहन है। E, F का भाई है। F का B से क्या संबंध है? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["निर्धारित नहीं किया जा सकता", "भाई", "बहन", "चाचा"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "वंश वृक्ष:\n- B[+] भाई है D[-] का\n- D[-] बहन है E[+] की\n- E[+] भाई है F का\nयहाँ B, D, E, F चारों एक ही माता-पिता की संतानें (सहोदर) हैं।\nपरंतु प्रश्न में **F का लिंग (Gender) कहीं भी स्पष्ट नहीं है**; F पुरुष (भाई) भी हो सकता है और महिला (बहन) भी!\nअतः F का B से संबंध **निर्धारित नहीं किया जा सकता (Cannot be Determined)**।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "एक लड़की की ओर इशारा करते हुए नमन ने कहा, 'वह मेरी दादी के एकमात्र बच्चे की एकमात्र पुत्री है।' वह लड़की नमन से कैसे संबंधित है?",
      options: ["बहन", "माता", "चाची", "चचेरी बहन"],
      correctOption: 0,
      explanation: "नमन की दादी का एकमात्र बच्चा = नमन के पिता। पिता की एकमात्र पुत्री = नमन की बहन। अतः वह लड़की नमन की **बहन** है।"
    },
    {
      id: "mcq2",
      question: "A, B का पिता है, परंतु B, A का पुत्र नहीं है। B का A से क्या संबंध है?",
      options: ["पुत्री", "माता", "बहन", "पुत्रवधू"],
      correctOption: 0,
      explanation: "यदि A पिता है और B संतान है, लेकिन B पुत्र नहीं है, तो स्वाभाविक रूप से B उसकी **पुत्री (Daughter)** होगी।"
    },
    {
      id: "mcq3",
      question: "अरुण ने कहा, 'यह लड़की मेरी माता के पौत्र की पत्नी है।' अरुण का उस लड़की से क्या संबंध है?",
      options: ["ससुर", "पिता", "पति", "दादा"],
      correctOption: 0,
      explanation: "अरुण की माता का पौत्र = अरुण का पुत्र। पुत्र की पत्नी = पुत्रवधू। अतः अरुण उस लड़की का **ससुर (Father-in-law)** है।"
    },
    {
      id: "mcq4",
      question: "K, L का भाई है। M, K की बहन है। P, O का भाई है और O, L की पुत्री है। P का चाचा/मामा कौन है?",
      options: ["K", "L", "M", "O"],
      correctOption: 0,
      explanation: "O और P, L की संतानें हैं। K, L का भाई है। अतः P की माता/पिता का भाई K है, जो P का **चाचा/मामा (K)** होगा।"
    },
    {
      id: "mcq5",
      question: "सुनील का परिचय देते हुए निकिता ने कहा, 'उसके पिता मेरे पिता के इकलौते पुत्र हैं।' निकिता का सुनील से क्या संबंध है?",
      options: ["बुआ", "माता", "बहन", "चाची"],
      correctOption: 0,
      explanation: "निकिता (महिला) के पिता का इकलौता पुत्र = निकिता का भाई। सुनील के पिता = निकिता का भाई। अतः निकिता सुनील के पिता की बहन अर्थात सुनील की **बुआ (Paternal Aunt)** है।"
    },
    {
      id: "mcq6",
      question: "एक परिवार में 1 पुरुष, उसकी पत्नी, उनके 3 पुत्र और उनकी पत्नियां हैं, तथा प्रत्येक पुत्र के परिवार में 2-2 पुत्रियां हैं। परिवार में कुल कितनी महिलाएं हैं?",
      options: ["10", "8", "9", "7"],
      correctOption: 0,
      explanation: "महिलाएं:\n1. मुख्य पुरुष की पत्नी = 1\n2. 3 पुत्रों की पत्नियां = 3\n3. प्रत्येक पुत्र की 2 पुत्रियां = $3 \\times 2 = 6$\nकुल महिलाएं $= 1 + 3 + 6 = 10$।"
    },
    {
      id: "mcq7",
      question: "X और Y भाई हैं। R, Y का पिता है। S, T का भाई है और X का मामा है। T का R से क्या संबंध है?",
      options: ["पत्नी", "बहन", "माता", "भाभी"],
      correctOption: 0,
      explanation: "R पिता है X और Y का। S मामा है X का, अर्थात S, X की माता का भाई है। चूंकि S, T का भाई है, अतः T, X की माता (और R की पत्नी) है। अतः T, R की **पत्नी** है।"
    },
    {
      id: "mcq8",
      question: "A, B की माता है। C, A का पुत्र है। D, E का भाई है। E, B की पुत्री है। D की नानी कौन है?",
      options: ["A", "B", "C", "E"],
      correctOption: 0,
      explanation: "E और D की माता B है। B की माता A है। अतः D की माता की माता अर्थात नानी **A** है।"
    }
  ],
  keyTerminology: [
    {
      term: "Family Tree",
      termHi: "वंश वृक्ष / परिवार आरेख",
      definition: "A hierarchical genealogical chart modeling familial lineages, marital unions, and sibling affiliations using standard geometric shapes.",
      definitionHi: "पीढ़ी पदानुक्रम, वैवाहिक जोड़ों और सहोदर संबंधों को दर्शाने वाला मानक रेखाचित्र।"
    },
    {
      term: "Generation Gap",
      termHi: "पीढ़ी अंतराल",
      definition: "The vertical genealogical distance separating ancestors from descendants (+2, +1, 0, -1, -2).",
      definitionHi: "माता-पिता से संतानों के मध्य ऊर्ध्वाधर लंबवत दूरी, जो वरिष्ठ और कनिष्ठ पीढ़ियों को विभाजित करती है।"
    },
    {
      term: "Golden Rule of Gender",
      termHi: "लिंग निर्धारण का स्वर्णिम नियम",
      definition: "The absolute reasoning axiom that gender can never be assumed from conventional names, only deduced from explicit grammatical relations.",
      definitionHi: "यह अनिवार्य नियम कि व्यक्ति के नाम से कभी उसका लिंग तय नहीं होता, केवल स्पष्ट संबंध या सर्वनाम से ही लिंग निर्धारित होता है।"
    },
    {
      term: "Paternal vs Maternal",
      termHi: "पितृक बनाम मातृक संबंध",
      definition: "Kinship traced through the father's side (Paternal - Uncle, Grandfather) versus the mother's side (Maternal - Mama, Nana).",
      definitionHi: "पिता के पक्ष से जुड़े संबंध (दादा, चाचा, बुआ) बनाम माता के पक्ष से जुड़े संबंध (नाना, मामा, मौसी)।"
    },
    {
      term: "Backtracking Method",
      termHi: "बैकट्रैकिंग / पश्चगामी डिकोडिंग",
      definition: "A solution strategy beginning analysis from 'My' in dialogue prompts and working outward to isolate the speaker.",
      definitionHi: "तस्वीर वाले प्रश्नों में 'मेरे' शब्द से शुरू करके स्वयं को उस स्थान पर रखकर संबंध डिकोड करने की विधि।"
    },
    {
      term: "In-Law Lineage",
      termHi: "ससुराल पक्षीय संबंध",
      definition: "Legal and social kinships established purely through matrimony (Brother-in-law, Mother-in-law).",
      definitionHi: "विवाह के माध्यम से स्थापित होने वाले संबंध (जैसे साला, जीजा, देवर, ससुर, पुत्रवधू)।"
    },
    {
      term: "Sibling Line",
      termHi: "सहोदर रेखा",
      definition: "A single horizontal link connecting individuals who share common biological parentage.",
      definitionHi: "एक ही माता-पिता की संतानों (सगे भाई-बहनों) को जोड़ने वाली एकल क्षैतिज रेखा।"
    },
    {
      term: "Spousal Double Bond",
      termHi: "वैवाहिक द्वि-बंधन",
      definition: "A double-headed arrow or equal sign signifying an exclusive marital union between two opposite-gender entities.",
      definitionHi: "पति और पत्नी के बीच के वैवाहिक संबंध को दर्शाने वाला विशिष्ट दोहरी रेखा या द्वि-तीर प्रतीक।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Chapter: Blood Relations",
      author: "Dr. R.S. Aggarwal",
      description: "रक्त संबंध, वंश वृक्ष निर्माण और तस्वीर आधारित प्रश्नों का देश का सबसे लोकप्रिय संदर्भ ग्रंथ।"
    },
    {
      title: "How to Crack Test of Reasoning - Family Relations Section",
      author: "Jaikishan & Premkishan (Arihant Publications)",
      description: "बैकट्रैकिंग तकनीक और लिंग उन्मूलन (Gender Elimination) के शॉर्टकट नियमों का संकलन।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की विगत परीक्षाओं (पटवारी, सूबेदार, हॉस्टल वार्डन) में पूछे गए वास्तविक रक्त संबंध प्रश्न।"
    },
    {
      title: "Analytical Reasoning: Kinship Puzzles & Logic",
      author: "M.K. Pandey",
      description: "जटिल बहु-सदस्यीय पारिवारिक पहेलियों और पीढ़ी पदानुक्रम का संपूर्ण सैद्धांतिक विश्लेषण।"
    }
  ],
  confusionBuster: [
    {
      misconception: "नाम से किसी का लिंग (पुरुष या महिला) माना जा सकता है (उदा. सुमन महिला ही होगी)।",
      clarification: "यह रीजनिंग का सबसे बड़ा जाल है! रीजनिंग में 'सुमन' पुरुष भी हो सकता है। जब तक प्रश्न में 'वह', 'माता', 'पुत्री' आदि से लिंग सिद्ध न हो, तब तक लिंग अज्ञात ही रहता है।"
    },
    {
      misconception: "'A का B से क्या संबंध है?' में परीक्षार्थी B का संबंध बता देते हैं।",
      clarification: "हमेशा याद रखें: 'A का B से संबंध' = 'A कौन है B का?'। यदि A पिता है और B पुत्र, तो सही उत्तर 'पिता' होगा, 'पुत्र' नहीं।"
    },
    {
      misconception: "Cousin Brother या Cousin Sister कहना सही है।",
      clarification: "व्याकरण और रीजनिंग दोनों में चचेरे/ममेरे भाई-बहन के लिए केवल 'Cousin' शब्द का प्रयोग होता है।"
    },
    {
      misconception: "'मेरे पिता का इकलौता पुत्र' हमेशा वक्ता स्वयं ही होता है।",
      clarification: "केवल तब जब बोलने वाला पुरुष हो! यदि बोलने वाली एक महिला है, तो उसके पिता का इकलौता पुत्र 'उसका भाई' होगा।"
    },
    {
      misconception: "तस्वीर वाले प्रश्नों में बिना आरेख बनाए मन में सोचना ही सबसे तेज होता है।",
      clarification: "मन में सोचने पर 3 पीढ़ियों के बाद भ्रम हो जाता है। 5 सेकंड में रफ शीट पर प्रतीकात्मक रेखाएं ($+, -, \\downarrow$) खींचना 100% सटीक परिणाम देता है।"
    }
  ],
  faqList: [
    {
      question: "रक्त संबंध के प्रश्नों में वंश वृक्ष (Family Tree) कैसे बनाएं?",
      answer: "पुरुष को $[+]$, महिला को $[-]$, पति-पत्नी को $(=)$, भाई-बहन को $(-)$ और पीढ़ी अंतराल को नीचे की ओर लंबवत तीर $(\\downarrow)$ से दर्शाएं।"
    },
    {
      question: "'मेरे पिता के इकलौते पुत्र की पुत्री' का क्या अर्थ है?",
      answer: "यदि वक्ता पुरुष है तो 'वक्ता की पुत्री'। यदि वक्ता महिला है तो 'वक्ता के भाई की पुत्री' (अर्थात भतीजी)।"
    },
    {
      question: "यदि प्रश्न के अंत में किसी का लिंग स्पष्ट न हो तो क्या उत्तर दें?",
      answer: "विकल्प में 'तय नहीं किया जा सकता' (Cannot be Determined) या 'डेटा अपर्याप्त है' चुनें।"
    },
    {
      question: "Nephew और Niece में क्या अंतर है?",
      answer: "Nephew पुरुष होता है (भतीजा या भांजा), जबकि Niece महिला होती है (भतीजी या भांजी)।"
    },
    {
      question: "CG Vyapam में रक्त संबंध का कितना वेटेज है?",
      answer: "व्यापम के मानसिक योग्यता खंड में तस्वीर आधारित और पारिवारिक पहेली से 2 से 3 प्रश्न निश्चित रूप से पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "लिंग निर्धारण का नियम: नाम से कभी लिंग तय न करें, केवल स्पष्ट कथन से तय करें।",
    "मानक प्रतीक: पुरुष $[+]$, महिला $[-]$, विवाहित जोड़ा $(=)$, सहोदर $(-)$, पीढ़ी $(\\downarrow)$।",
    "'A का B से संबंध' का सीधा अर्थ है: A कौन लगता है B का?",
    "पिता का इकलौता पुत्र = वक्ता स्वयं (यदि पुरुष हो) अथवा वक्ता का भाई (यदि महिला हो)।",
    "Uncle के अंतर्गत चाचा, मामा, फूफा और मौसा चारों रिश्ते समाहित होते हैं।",
    "Aunt के अंतर्गत चाची, मामी, बुआ और मौसी चारों रिश्ते आते हैं।",
    "तस्वीर वाले प्रश्नों में 'मेरे' (My) शब्द से बैकट्रैकिंग करना सर्वोत्तम रणनीति है।",
    "ससुर का इकलौता पुत्र विवाहित महिला का 'पति' (Husband) होता है।",
    "माता के पिता 'नाना' और पिता के पिता 'दादा' कहलाते हैं।",
    "यदि लिंग अज्ञात हो और संबंध पूछा जाए, तो उत्तर 'निर्धारित नहीं किया जा सकता' होगा।"
  ],
  rapidRevision: {
    points: [
      "Gender Rule: Never assume gender from names; rely strictly on +, - notations।",
      "Direction Law: 'A का B से संबंध' $\\implies$ Who is A to B? (Focus on A)।",
      "Only Son Trick: Father's only son = Self (Male) OR Brother (Female)।",
      "Tree Code: Male = [+], Female = [-], Couple = (=), Sibling = (-), Child = ($\\downarrow$)।",
      "Ambiguity Alert: Unknown gender $\\implies$ 'Cannot be Determined'।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_br_1_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_br_1');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_br_1 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_4', 'reas_br_1');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
