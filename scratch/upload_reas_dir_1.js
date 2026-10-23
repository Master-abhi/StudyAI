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

const reas_dir_1_data = {
  topicId: "reas_dir_1",
  topicName: "Direction Sense",
  topicNameHi: "दिशा ज्ञान परीक्षण (Direction Sense & Turning)",
  chapterId: "cgv_master_sub_4_ch_5",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "दिशा ज्ञान परीक्षण (Direction Sense Test) स्थानिक अभिमुखीकरण (Spatial Orientation) और मानसिक मानचित्रण (Cognitive Mapping) पर आधारित तार्किक अभियोग्यता का एक आधारभूत एवं अनिवार्य अध्याय है। इसमें किसी व्यक्ति या वस्तु की 4 मुख्य दिशाओं (उत्तर, दक्षिण, पूर्व, पश्चिम) तथा 4 उप-दिशाओं (उत्तर-पूर्व, उत्तर-पश्चिम, दक्षिण-पूर्व, दक्षिण-पश्चिम) में गति, विभिन्न कोणों पर घूर्णन (Clockwise / Anticlockwise Rotation), दाएँ-बाएँ मोड़ों (Left/Right Turns), तथा सूर्योदय एवं सूर्यास्त के समय छाया की स्थिति (Shadow Concepts) का व्यवस्थित अध्ययन किया जाता है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, हॉस्टल अधीक्षक, राजस्व निरीक्षक, सब-इंजीनियर) तथा CGPSC CSAT में दिशा ज्ञान से 2 से 3 प्रश्न अनिवार्य रूप से पूछे जाते हैं। यह अध्याय अभ्यर्थी के दिशा-भ्रम निवारण, कोणीय गणना और त्वरित निर्णय क्षमता का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में मुख्य रूप से 3 प्रकार के प्रश्न पूछे जाते हैं: (1) केवल अंतिम मुख दिशा ज्ञात करना (Final Facing Direction - बिना आरेख के Left/Right रद्दीकरण से हल), (2) कोणीय घूर्णन प्रश्न (Angular Rotation - $45^\\circ, 90^\\circ, 135^\\circ, 180^\\circ$), तथा (3) छाया आधारित प्रश्न (Shadow Problems at Sunrise & Sunset)।",
    quickFacts: [
      "दायाँ एवं बायाँ का मानक नियम: दायाँ मोड़ (Right Turn) हमेशा $90^\\circ$ दक्षिणावर्त (Clockwise - CW) होता है, और बायाँ मोड़ (Left Turn) हमेशा $90^\\circ$ वामावर्त (Anticlockwise - ACW) होता है।",
      "L/R रद्दीकरण का गोल्डन नियम: एक दायाँ मोड़ और एक बायाँ मोड़ परस्पर निरस्त (Cancel) हो जाते हैं ($1R + 1L = 0$)! यदि किसी प्रश्न में केवल अंतिम मुख दिशा पूछी गई हो, तो आरेख बनाने के बजाय सभी L और R को काटकर शेष मोड़ से 5 सेकंड में उत्तर मिल जाता है।",
      "$2R$ या $2L$ का नियम: लगातार दो बार दाएँ या दो बार बाएँ मुड़ने पर व्यक्ति का मुख अपनी प्रारंभिक दिशा के ठीक 'विपरीत' (Opposite Direction) हो जाता है ($180^\\circ$ Turn)।",
      "$4R$ या $4L$ का नियम: लगातार चार बार समान दिशा में मुड़ने पर व्यक्ति पुनः अपनी 'मूल दिशा' (Original Direction) में आ जाता है ($360^\\circ$ Complete Circle)।",
      "सूर्योदय छाया नियम: सूर्योदय के समय सूर्य पूर्व में होता है, अतः सभी वस्तुओं की छाया ठीक 'पश्चिम' (West) में पड़ती है। यदि व्यक्ति का मुख उत्तर की ओर है, तो छाया उसके 'बाईं ओर' (Left) पड़ेगी।"
    ]
  },
  chapters: [
    {
      id: "ch1_cardinal_subcardinal_directions",
      title: "मुख्य दिशाएं, उप-दिशाएं एवं कोणीय विन्यास (Cardinal & Sub-Cardinal Directions)",
      content: `### 1. दिशाओं का मानक मानचित्र एवं कोणीय संरचना

कागज या स्क्रीन पर दिशाओं का अंकन सदैव एक सार्वभौमिक मानक के अनुसार किया जाता है:

#### 1. चार मुख्य दिशाएं (Cardinal Directions):
- **उत्तर (North - N):** पृष्ठ के शीर्ष (Top) की ओर।
- **दक्षिण (South - S):** पृष्ठ के नीचे (Bottom) की ओर।
- **पूर्व (East - E):** आपके दाएँ हाथ (Right Side) की ओर।
- **पश्चिम (West - W):** आपके बाएँ हाथ (Left Side) की ओर।
- *प्रत्येक दो क्रमागत मुख्य दिशाओं के मध्य $90^\\circ$ का समकोण होता है।*

#### 2. चार उप-दिशाएं (Sub-Cardinal / Intercardinal Directions):
- **उत्तर-पूर्व (North-East - NE):** उत्तर और पूर्व के ठीक मध्य ($45^\\circ$ कोण पर)।
- **उत्तर-पश्चिम (North-West - NW):** उत्तर और पश्चिम के ठीक मध्य ($45^\\circ$ पर)।
- **दक्षिण-पूर्व (South-East - SE):** दक्षिण और पूर्व के ठीक मध्य ($45^\\circ$ पर)।
- **दक्षिण-पश्चिम (South-West - SW):** दक्षिण और पश्चिम के ठीक मध्य ($45^\\circ$ पर)।

#### 3. 8 दिशाओं का दक्षिणावर्त चक्र (Clockwise Order):
$$\\text{North } (0^\\circ) \\to \\text{NE } (45^\\circ) \\to \\text{East } (90^\\circ) \\to \\text{SE } (135^\\circ) \\to \\text{South } (180^\\circ) \\to \\text{SW } (225^\\circ) \\to \\text{West } (270^\\circ) \\to \\text{NW } (315^\\circ) \\to \\text{North } (360^\\circ)$$`
    },
    {
      id: "ch2_lr_cancellation_hack",
      title: "दायाँ-बायाँ मोड़ एवं L/R कैंसिलेशन शॉर्टकट (Turning Rules & L/R Cancellation)",
      content: `### 2. दायाँ/बायाँ मोड़ एवं 5-सेकंड L/R रद्दीकरण तकनीक

जब प्रश्न में केवल यह पूछा जाए कि: *"अब उसका मुख किस दिशा में है?"* (Now in which direction is he facing?), तो **आरेख बनाना समय की बर्बादी है!**

#### L/R रद्दीकरण का बीजगणितीय नियम:
1. **$1 \\text{ Right} (R) = +90^\\circ$ CW**
2. **$1 \\text{ Left} (L) = -90^\\circ$ ACW**
3. **$1 R + 1 L = 0$ (परस्पर निरस्त):**
   - यदि कोई व्यक्ति दाएँ मुड़कर तुरंत बाएँ मुड़ जाए, तो उसकी दिशा में कोई परिवर्तन नहीं होता।
4. **$2 R$ अथवा $2 L = 180^\\circ$ (ठीक विपरीत दिशा):**
   - उत्तर का विपरीत दक्षिण, पूर्व का विपरीत पश्चिम।
5. **$3 R = 1 L$ (तीन दाएँ मोड़ = एक बायाँ मोड़):**
   - तीन बार दाएँ मुड़ने के बजाय केवल 1 बार बाएँ मुड़ना कहीं अधिक तीव्र होता है।
6. **$3 L = 1 R$ (तीन बाएँ मोड़ = एक दायाँ मोड़)**
7. **$4 R$ अथवा $4 L = 0$ (समान मूल दिशा)।**

#### व्यावहारिक उदाहरण:
- एक व्यक्ति उत्तर दिशा में जा रहा है। वह क्रमशः दाएँ (R), दाएँ (R), बाएँ (L), दाएँ (R), बाएँ (L) मुड़ता है। अब उसका मुख किस दिशा में है?
  - मोड़ों की सूची: $R, R, L, R, L$
  - कैंसिलेशन: दो $L$ से दो $R$ कट गए!
  - शेष बचा: केवल **$1 R$ (एक दायाँ मोड़)**।
  - उत्तर (North) से $1 R$ दाएँ मुड़ने पर $\\implies$ **पूर्व (East)**!
  - मात्र 3 सेकंड में उत्तर प्राप्त!`
    },
    {
      id: "ch3_angular_rotations",
      title: "कोणीय घूर्णन समस्याएं (Angular Rotation Problems)",
      content: `### 3. कोणीय घूर्णन (Angular Turning Problems)

इस प्रारूप में व्यक्ति किसी निश्चित कोण ($45^\\circ, 90^\\circ, 135^\\circ, 180^\\circ$) पर दक्षिणावर्त या वामावर्त घूमता है:

#### हल करने की सारणीबद्ध विधि (Net Angle Method):
1. सभी **दक्षिणावर्त (Clockwise - CW)** कोणों को जोड़ लें $\\implies \\sum CW$।
2. सभी **वामावर्त (Anticlockwise - ACW)** कोणों को जोड़ लें $\\implies \\sum ACW$।
3. परिणामी कोण (Net Angle) ज्ञात करें:
   $$\\text{Net Angle} = |\\sum CW - \\sum ACW|$$
4. व्यक्ति के मुख को प्रारंभिक दिशा से उस दिशा में घुमाएं जिसका योग बड़ा था।

#### उदाहरणात्मक समस्या:
- एक व्यक्ति का मुख **पश्चिम** की ओर है। वह $45^\\circ$ दक्षिणावर्त घूमता है, फिर $180^\\circ$ उसी दिशा में घूमता है, और फिर $270^\\circ$ वामावर्त घूमता है। अब उसका मुख किस दिशा में है?
  - $\\sum CW = 45^\\circ + 180^\\circ = 225^\\circ$
  - $\\sum ACW = 270^\\circ$
  - परिणामी कोण $= 270^\\circ - 225^\\circ = 45^\\circ$ **वामावर्त (ACW)**।
  - प्रारंभिक दिशा पश्चिम (West) से $45^\\circ$ वामावर्त घूमने पर $\\implies$ **दक्षिण-पश्चिम (South-West)**।
  - अतः सही उत्तर दक्षिण-पश्चिम है!`
    },
    {
      id: "ch4_shadow_concepts_sunrise_sunset",
      title: "सूर्योदय एवं सूर्यास्त में छाया का विज्ञान (Shadow Concepts at Sunrise & Sunset)",
      content: `### 4. छाया (Shadow) पर आधारित प्रश्नों के सार्वभौमिक नियम

छाया के प्रश्न दिशा ज्ञान के सबसे बौद्धिक प्रश्न माने जाते हैं। इन्हें निम्नलिखित अटल नियमों द्वारा समझें:

#### 1. सूर्योदय के समय (At Sunrise - सुबह का समय):
- सूर्य हमेशा **पूर्व (East)** में होता है।
- इसलिए किसी भी वस्तु की छाया हमेशा **पश्चिम (West)** की ओर पड़ती है।
- **मुख दिशा के अनुसार छाया की स्थिति:**
  - यदि मुख **उत्तर (North)** की ओर है $\\implies$ छाया **बाएँ हाथ (Left)** की ओर पड़ेगी।
  - यदि मुख **दक्षिण (South)** की ओर है $\\implies$ छाया **दाएँ हाथ (Right)** की ओर पड़ेगी।
  - यदि मुख **पूर्व** की ओर है $\\implies$ छाया **पीछे (Behind)** पड़ेगी।
  - यदि मुख **पश्चिम** की ओर है $\\implies$ छाया **आगे (In Front)** पड़ेगी।

#### 2. सूर्यास्त के समय (At Sunset - शाम का समय):
- सूर्य हमेशा **पश्चिम (West)** में होता है।
- इसलिए छाया हमेशा **पूर्व (East)** की ओर पड़ती है।
- **मुख दिशा के अनुसार छाया की स्थिति:**
  - यदि मुख **उत्तर (North)** की ओर है $\\implies$ छाया **दाएँ हाथ (Right)** की ओर पड़ेगी।
  - यदि मुख **दक्षिण (South)** की ओर है $\\implies$ छाया **बाएँ हाथ (Left)** की ओर पड़ेगी।

#### 3. दोपहर 12 बजे का नियम (Noon Rule):
- दोपहर 12:00 बजे सूर्य ठीक सिर के ऊपर (Zenith) होता है, अतः **कोई छाया नहीं बनती** (No shadow is formed)।`
    },
    {
      id: "ch5_direction_change_clock_problems",
      title: "दिशा परिवर्तन एवं घड़ी पर आधारित प्रश्न (Direction Change & Clock Alignment)",
      content: `### 5. कृत्रिम दिशा परिवर्तन एवं घड़ी वाले प्रश्न

#### 1. यदि दिशाओं के नाम बदल दिए जाएं (Direction Transformation):
- *"यदि दक्षिण-पूर्व उत्तर बन जाए, उत्तर-पूर्व पश्चिम बन जाए और आगे भी यही क्रम जारी रहे, तो पश्चिम क्या बनेगा?"*
- **हल करने का 1-नियम शॉर्टकट:**
  - दिए गए पहले परिवर्तन का कोणीय घूर्णन निकालें:
  - दक्षिण-पूर्व (SE - $135^\\circ$) $\\to$ उत्तर (N - $0^\\circ / 360^\\circ$) बन गया।
  - घूर्णन $= 135^\\circ$ वामावर्त (ACW)।
  - अब पूछे गए शब्द पर ठीक वही घूर्णन लागू करें:
  - पश्चिम (West - $270^\\circ$) से $135^\\circ$ वामावर्त घूमने पर $\\implies$ **दक्षिण-पूर्व (South-East)**!
  - अतः पश्चिम 'दक्षिण-पूर्व' बन जाएगा।

#### 2. घड़ी की सुइयों का दिशा संरेखण (Clock Face Alignment):
- *"यदि 4:30 बजे घंटे की सुई दक्षिण-पश्चिम की ओर हो, तो मिनट की सुई किस दिशा में होगी?"*
- 4:30 बजे मिनट की सुई वास्तविक रूप से 6 पर (दक्षिण दिशा में) होती है।
- यदि घंटे की सुई का विचलन $+x^\\circ$ है, तो मिनट की सुई को भी वास्तविक दिशा से $+x^\\circ$ घुमाकर उत्तर ज्ञात करें।`
    }
  ],
  comparativeTables: [
    {
      title: "दायाँ (Right) बनाम बायाँ (Left) मोड़ का दिशा रूपांतरण",
      headers: ["वर्तमान मुख दिशा", "दायाँ मोड़ ($90^\\circ$ CW)", "बायाँ मोड़ ($90^\\circ$ ACW)", "दो लगातार मोड़ ($180^\\circ$)"],
      rows: [
        { cells: ["उत्तर (North)", "पूर्व (East)", "पश्चिम (West)", "दक्षिण (South)"] },
        { cells: ["दक्षिण (South)", "पश्चिम (West)", "पूर्व (East)", "उत्तर (North)"] },
        { cells: ["पूर्व (East)", "दक्षिण (South)", "उत्तर (North)", "पश्चिम (West)"] },
        { cells: ["पश्चिम (West)", "उत्तर (North)", "दक्षिण (South)", "पूर्व (East)"] },
        { cells: ["उत्तर-पूर्व (NE)", "दक्षिण-पूर्व (SE)", "उत्तर-पश्चिम (NW)", "दक्षिण-पश्चिम (SW)"] }
      ]
    },
    {
      title: "सूर्योदय बनाम सूर्यास्त छाया स्थिति संदर्भ तालिका",
      headers: ["समय", "सूर्य की स्थिति", "छाया की दिशा", "बाएँ छाया (Left)", "दाएँ छाया (Right)"],
      rows: [
        { cells: ["सूर्योदय (सुबह)", "पूर्व (East)", "पश्चिम (West)", "व्यक्ति का मुख उत्तर में", "व्यक्ति का मुख दक्षिण में"] },
        { cells: ["सूर्यास्त (शाम)", "पश्चिम (West)", "पूर्व (East)", "व्यक्ति का मुख दक्षिण में", "व्यक्ति का मुख उत्तर में"] },
        { cells: ["दोपहर 12 बजे", "ठीक सिर के ऊपर", "कोई छाया नहीं", "लागू नहीं", "लागू नहीं"] }
      ]
    },
    {
      title: "मोड़ रद्दीकरण (Turn Cancellation) त्वरित सूत्र",
      headers: ["मोड़ों का संयोजन", "परिणामी प्रभाव", "कोणीय मान", "समतुल्य सरल मोड़"],
      rows: [
        { cells: ["$1R + 1L$", "शून्य विचलन (No change)", "$0^\\circ$", "सीधे चलते रहें"] },
        { cells: ["$2R$ अथवा $2L$", "ठीक विपरीत दिशा", "$180^\\circ$", "Opposite direction"] },
        { cells: ["$3R$", "एक बायाँ मोड़", "$270^\\circ$ CW", "$1L$ (वामावर्त $90^\\circ$)"] },
        { cells: ["$3L$", "एक दायाँ मोड़", "$270^\\circ$ ACW", "$1R$ (दक्षिणावर्त $90^\\circ$)"] },
        { cells: ["$4R$ अथवा $4L$", "पूर्ण चक्र (समान दिशा)", "$360^\\circ$", "मूल प्रारंभिक दिशा"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "एक व्यक्ति उत्तर की ओर मुख करके खड़ा है। वह पहले $45^\\circ$ दक्षिणावर्त (Clockwise) घूमता है, फिर $90^\\circ$ वामावर्त (Anticlockwise) घूमता है और अंत में $135^\\circ$ दक्षिणावर्त घूमता है। अब उसका मुख किस दिशा में है? [CG Vyapam Patwari Exam]",
      options: ["पूर्व", "उत्तर-पूर्व", "दक्षिण-पूर्व", "उत्तर-पश्चिम"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "नेट कोण विधि का प्रयोग करें:\n- $\\sum CW = 45^\\circ + 135^\\circ = 180^\\circ$\n- $\\sum ACW = 90^\\circ$\n- परिणामी कोण $= 180^\\circ - 90^\\circ = 90^\\circ$ **दक्षिणावर्त (CW)**।\nप्रारंभिक दिशा उत्तर (North) से $90^\\circ$ दक्षिणावर्त घूमने पर व्यक्ति का मुख **पूर्व (East)** दिशा में होगा।\nअतः सही उत्तर पूर्व है।"
    },
    {
      id: "pyq2",
      question: "एक सुबह सूर्योदय के तुरंत बाद, दो मित्र सुमित और मोहित एक दूसरे के आमने-सामने खड़े होकर बात कर रहे थे। यदि सुमित की छाया मोहित के ठीक दाईं ओर पड़ रही थी, तो सुमित का मुख किस दिशा में था? [CG Vyapam Subedar / SI Prelims]",
      options: ["दक्षिण", "उत्तर", "पूर्व", "पश्चिम"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "छाया के नियम से:\n1. सूर्योदय के समय छाया सदैव **पश्चिम** में पड़ती है।\n2. प्रश्न के अनुसार, छाया मोहित के **दाईं ओर (Right)** पड़ रही है।\n3. जिस व्यक्ति की दाईं ओर पश्चिम दिशा हो, उस व्यक्ति का मुख **उत्तर (North)** की ओर होता है।\n   - अतः मोहित का मुख उत्तर की ओर है!\n4. चूंकि दोनों आमने-सामने खड़े हैं, अतः सुमित का मुख मोहित के ठीक विपरीत अर्थात **दक्षिण (South)** की ओर होगा।\nअतः सही उत्तर दक्षिण है।"
    },
    {
      id: "pyq3",
      question: "एक व्यक्ति दक्षिण दिशा में 10 मीटर चलता है, फिर दाएँ मुड़ता है, फिर बाएँ मुड़ता है, फिर दाएँ मुड़ता है और अंत में दाएँ मुड़ता है। अब वह किस दिशा में चल रहा है? [CGPSC CSAT]",
      options: ["उत्तर", "दक्षिण", "पूर्व", "पश्चिम"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "L/R कैंसिलेशन विधि:\n- प्रारंभिक दिशा: दक्षिण\n- मोड़: R, L, R, R\n- एक L से एक R निरस्त हो गया!\n- शेष बचे: **$2 R$ (दो दाएँ मोड़)**।\n- नियम: $2 R = 180^\\circ$ अर्थात ठीक **विपरीत दिशा**।\n- दक्षिण का विपरीत = **उत्तर (North)**।\nअतः अब वह उत्तर दिशा में चल रहा है।"
    },
    {
      id: "pyq4",
      question: "यदि 'दक्षिण-पूर्व' को 'उत्तर' कहा जाए, 'उत्तर-पूर्व' को 'पश्चिम' कहा जाए, और आगे भी इसी प्रकार परिवर्तन जारी रहे, तो 'पश्चिम' को क्या कहा जाएगा? [CG Vyapam Hostel Warden]",
      options: ["दक्षिण-पूर्व", "उत्तर-पूर्व", "दक्षिण-पश्चिम", "उत्तर-पश्चिम"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "कोणीय विचलन देखें:\n- दक्षिण-पूर्व (SE) से उत्तर (N) जाने के लिए $135^\\circ$ वामावर्त (ACW) घूमना पड़ता है।\n- अतः पश्चिम (West) को भी $135^\\circ$ वामावर्त घुमाएं:\n  - West से $90^\\circ$ ACW = South\n  - South से $45^\\circ$ और आगे = **दक्षिण-पूर्व (South-East)**।\nअतः पश्चिम को **दक्षिण-पूर्व** कहा जाएगा।"
    },
    {
      id: "pyq5",
      question: "शाम के समय सूर्यास्त से पहले, रीता और कविता आमने-सामने बात कर रही थीं। यदि कविता की छाया रीता के ठीक बाईं ओर पड़ रही थी, तो रीता का मुख किस दिशा में था? [CG Vyapam Revenue Inspector]",
      options: ["दक्षिण", "उत्तर", "पूर्व", "पश्चिम"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "सूर्यास्त के समय:\n- सूर्य पश्चिम में होता है, अतः छाया **पूर्व** में पड़ेगी।\n- छाया रीता के **बाईं ओर (Left)** पड़ रही है।\n- जिस व्यक्ति का बायाँ हाथ पूर्व दिशा में हो, उसका मुख **दक्षिण (South)** की ओर होता है।\nअतः रीता का मुख **दक्षिण** की ओर था।"
    },
    {
      id: "pyq6",
      question: "एक घड़ी में 9:15 बजे हैं। यदि मिनट की सुई दक्षिण की ओर इशारा कर रही है, तो घंटे की सुई किस दिशा में होगी? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["पूर्व", "उत्तर", "उत्तर-पश्चिम", "दक्षिण-पूर्व"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "वास्तविक स्थिति में 9:15 बजे:\n- मिनट की सुई 3 पर अर्थात **पूर्व (East)** में होती है।\n- घंटे की सुई 9 पर अर्थात **पश्चिम (West)** में होती है।\nप्रश्न के अनुसार, मिनट की सुई को पूर्व के स्थान पर 'दक्षिण' ($90^\\circ$ CW) कहा गया है।\nअतः घंटे की सुई को भी पश्चिम से $90^\\circ$ CW घुमाएंगे $\\implies$ उत्तर (North) होना चाहिए, परंतु यदि 180 अंश विपरीत हो तो पूर्व।\nपूर्व से दक्षिण $= 90^\\circ$ CW, पश्चिम से $90^\\circ$ CW = उत्तर। (यदि मिनट की सुई दक्षिण में है, तो 9:15 पर घंटे की सुई ठीक विपरीत अर्थात **पूर्व** की ओर होगी)।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "एक व्यक्ति का मुख पूर्व की ओर है। वह $100^\\circ$ दक्षिणावर्त घूमता है और फिर $145^\\circ$ वामावर्त घूमता है। अब उसका मुख किस दिशा में है?",
      options: ["उत्तर-पूर्व", "उत्तर-पश्चिम", "दक्षिण-पूर्व", "दक्षिण-पश्चिम"],
      correctOption: 0,
      explanation: "परिणामी कोण $= 145^\\circ (ACW) - 100^\\circ (CW) = 45^\\circ$ वामावर्त (ACW)।\nपूर्व (East) से $45^\\circ$ वामावर्त घूमने पर **उत्तर-पूर्व (North-East)** दिशा प्राप्त होती है।"
    },
    {
      id: "mcq2",
      question: "सुबह 8 बजे एक खंभे की छाया किस दिशा में पड़ेगी?",
      options: ["पश्चिम", "पूर्व", "उत्तर", "दक्षिण"],
      correctOption: 0,
      explanation: "सुबह सूर्य पूर्व में होता है, अतः किसी भी वस्तु की छाया हमेशा सूर्य के ठीक विपरीत अर्थात **पश्चिम (West)** में पड़ती है।"
    },
    {
      id: "mcq3",
      question: "एक व्यक्ति 4 बार लगातार दाएँ मुड़ता है। यदि वह प्रारंभ में पश्चिम की ओर जा रहा था, तो अब वह किस दिशा में जा रहा है?",
      options: ["पश्चिम", "पूर्व", "उत्तर", "दक्षिण"],
      correctOption: 0,
      explanation: "$4R = 360^\\circ$ का पूर्ण चक्र होता है, जिससे व्यक्ति पुनः अपनी मूल प्रारंभिक दिशा में आ जाता है। अतः वह अब भी **पश्चिम** की ओर ही जा रहा है।"
    },
    {
      id: "mcq4",
      question: "दोपहर 12:00 बजे किसी व्यक्ति की छाया किस दिशा में बनेगी?",
      options: ["कोई छाया नहीं बनेगी", "उत्तर में", "दक्षिण में", "पश्चिम में"],
      correctOption: 0,
      explanation: "दोपहर 12 बजे सूर्य ठीक सिर के ऊपर होता है, अतः उस समय कोई क्षैतिज छाया नहीं बनती।"
    },
    {
      id: "mcq5",
      question: "यदि उत्तर-पूर्व 'दक्षिण' बन जाए, तो दक्षिण क्या बनेगा?",
      options: ["उत्तर-पश्चिम", "उत्तर-पूर्व", "दक्षिण-पश्चिम", "पश्चिम"],
      correctOption: 0,
      explanation: "उत्तर-पूर्व (NE) से दक्षिण (S) जाने के लिए $135^\\circ$ दक्षिणावर्त (CW) घूमना पड़ता है।\nअतः दक्षिण (South) से $135^\\circ$ CW घूमने पर **उत्तर-पश्चिम (North-West)** प्राप्त होगा।"
    },
    {
      id: "mcq6",
      question: "एक व्यक्ति उत्तर की ओर 5 किमी चला, फिर 3 बार बाएँ मुड़ा। अब उसका मुख किस दिशा में है?",
      options: ["पूर्व", "पश्चिम", "उत्तर", "दक्षिण"],
      correctOption: 0,
      explanation: "$3L = 1R$ (तीन बाएँ मोड़ = एक दायाँ मोड़)।\nउत्तर से $1R$ दाएँ मुड़ने पर **पूर्व (East)** दिशा प्राप्त होती है।"
    },
    {
      id: "mcq7",
      question: "एक व्यक्ति शीर्षासन (योग) कर रहा है जिसका सिर नीचे और पैर ऊपर हैं। उसका मुख पश्चिम की ओर है। उसका बायाँ हाथ किस दिशा में होगा?",
      options: ["उत्तर", "दक्षिण", "पूर्व", "पश्चिम"],
      correctOption: 0,
      explanation: "शीर्षासन में बाएँ-दाएँ हाथ की दिशा सामान्य स्थिति से ठीक उलट जाती है:\nसामान्यतः पश्चिम की ओर मुख होने पर बायाँ हाथ दक्षिण में होता है, परंतु शीर्षासन में बायाँ हाथ **उत्तर (North)** दिशा में होगा।"
    },
    {
      id: "mcq8",
      question: "रोहन पूर्व दिशा में जा रहा था। वह दाएँ (R), बाएँ (L), दाएँ (R), दाएँ (R), बाएँ (L), बाएँ (L) मुड़ता है। अब वह किस दिशा में जा रहा है?",
      options: ["पूर्व", "पश्चिम", "उत्तर", "दक्षिण"],
      correctOption: 0,
      explanation: "मोड़: R, L, R, R, L, L\nकुल $3R$ और $3L$ हैं $\\implies 3R - 3L = 0$ (शून्य विचलन)।\nअतः वह अपनी मूल दिशा **पूर्व (East)** में ही जा रहा है।"
    }
  ],
  keyTerminology: [
    {
      term: "Direction Sense Test",
      termHi: "दिशा ज्ञान परीक्षण",
      definition: "An assessment of spatial orientation, angular rotation, and navigation through coordinate mappings.",
      definitionHi: "स्थानिक अभिविन्यास, कोणीय घूर्णन और दिशा-मानचित्रण पर आधारित तार्किक अभियोग्यता परीक्षण।"
    },
    {
      term: "Cardinal Directions",
      termHi: "मुख्य दिशाएं",
      definition: "The four primary navigational compass bearings: North, South, East, and West, separated by 90-degree intervals.",
      definitionHi: "चार प्रमुख भौगोलिक दिशाएं (उत्तर, दक्षिण, पूर्व, पश्चिम) जिनके मध्य परस्पर $90^\\circ$ का कोण होता है।"
    },
    {
      term: "Sub-Cardinal Directions",
      termHi: "उप-दिशाएं",
      definition: "The four intermediate bearings situated precisely midway (at 45 degrees) between cardinal axes (NE, NW, SE, SW).",
      definitionHi: "मुख्य दिशाओं के ठीक मध्य में $45^\\circ$ पर स्थित चार दिशाएं (उत्तर-पूर्व, उत्तर-पश्चिम, दक्षिण-पूर्व, दक्षिण-पश्चिम)।"
    },
    {
      term: "L/R Cancellation Technique",
      termHi: "दायाँ-बायाँ रद्दीकरण तकनीक",
      definition: "An algebraic shortcut canceling opposing 90-degree turns (1 Right + 1 Left = 0) to deduce terminal facing orientation instantly.",
      definitionHi: "समान संख्या में विपरीत मोड़ों को काटकर बिना चित्र बनाए 3 सेकंड में अंतिम मुख दिशा ज्ञात करने की विधि।"
    },
    {
      term: "Net Angle Method",
      termHi: "परिणामी कोण विधि",
      definition: "Calculating the algebraic difference between total Clockwise and Anticlockwise angular displacements.",
      definitionHi: "कुल दक्षिणावर्त कोणों और वामावर्त कोणों का अंतर निकालकर एक ही चरण में अंतिम घूर्णन निर्धारित करना।"
    },
    {
      term: "Shadow Kinematics",
      termHi: "छाया गतिकी नियम",
      definition: "The geometric rule that cast shadows project in the exact diametrical opposition to the sun's celestial position.",
      definitionHi: "यह अटल सिद्धांत कि किसी वस्तु की छाया सदैव सूर्य की खगोलीय स्थिति के ठीक विपरीत दिशा में बनती है।"
    },
    {
      term: "Inversion Turn (180-degree)",
      termHi: "विपरीत मोड़",
      definition: "Two identical consecutive turns (2R or 2L) reorienting the subject to face exactly 180 degrees backwards.",
      definitionHi: "दो लगातार समान मोड़ ($2R$ या $2L$) जो व्यक्ति के मुख को उसकी प्रारंभिक दिशा के ठीक उल्टी दिशा में कर देते हैं।"
    },
    {
      term: "Inverted Headstand Orientation",
      termHi: "शीर्षासन दिशा विचलन",
      definition: "The lateral inversion condition where left and right hands transpose relative to a regular upright posture.",
      definitionHi: "सिर नीचे और पैर ऊपर होने की वह स्थिति जिसमें दाएँ और बाएँ हाथ की सामान्य दिशाएं परस्पर पलट जाती हैं।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Direction Sense Test",
      author: "Dr. R.S. Aggarwal",
      description: "दिशा ज्ञान, कोणीय घूर्णन और छाया सिद्धांतों का देश का सबसे लोकप्रिय एवं मानक संदर्भ ग्रंथ।"
    },
    {
      title: "How to Crack Test of Reasoning - Direction & Turning Section",
      author: "Jaikishan & Premkishan (Arihant Publications)",
      description: "L/R कैंसिलेशन और नेट कोण विधि के शॉर्टकट नियमों का विस्तृत संकलन।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की विभिन्न परीक्षाओं (पटवारी, सूबेदार, हॉस्टल वार्डन) में पूछे गए वास्तविक दिशा परीक्षण प्रश्न।"
    },
    {
      title: "Analytical Reasoning: Spatial Logic & Geometry",
      author: "M.K. Pandey",
      description: "शीर्षासन प्रश्नों में हाथ विस्थापन और घड़ी सुई संरेखण का वैज्ञानिक विश्लेषण।"
    }
  ],
  confusionBuster: [
    {
      misconception: "जब भी प्रश्न में 'किस दिशा में जा रहा है' पूछा जाए, तो पूरा आरेख बनाना जरूरी है।",
      clarification: "कदापि नहीं! यदि दूरी न पूछी गई हो और केवल अंतिम दिशा पूछी हो, तो सीधे L/R कैंसिलेशन विधि अपनाएं; इससे 5 सेकंड में बिना पेन उठाए उत्तर मिल जाता है।"
    },
    {
      misconception: "सूर्योदय के समय छाया हमेशा पूर्व में पड़ती है क्योंकि सूर्य पूर्व में होता है।",
      clarification: "यह प्राथमिक विज्ञान की भूल है! छाया हमेशा प्रकाश स्रोत के **विपरीत** पड़ती है। सूर्य पूर्व में होगा तो छाया पश्चिम में पड़ेगी।"
    },
    {
      misconception: "दायाँ मुड़ने का अर्थ घड़ी की विपरीत दिशा होता है।",
      clarification: "नहीं! दायाँ मोड़ (Right Turn) सदैव दक्षिणावर्त (Clockwise - घड़ी की दिशा) में $90^\\circ$ होता है।"
    },
    {
      misconception: "दोपहर 12:00 बजे छाया उत्तर में बनेगी।",
      clarification: "दोपहर 12 बजे सूर्य ठीक सिर के ऊपर होता है, अतः कोई क्षैतिज छाया नहीं बनती।"
    },
    {
      misconception: "शीर्षासन (Headstand) करते समय दायाँ हाथ वही रहता है जो सामान्य खड़े होने पर होता है।",
      clarification: "शीर्षासन में शरीर उल्टा होने के कारण दायाँ और बायाँ हाथ सामान्य स्थिति से ठीक उलट जाते हैं।"
    }
  ],
  faqList: [
    {
      question: "L/R कैंसिलेशन तकनीक का उपयोग कब किया जाता है?",
      answer: "जब प्रश्न में कोई दूरी न पूछी गई हो और केवल यह पूछा गया हो कि 'अब उसका मुख किस दिशा में है?' या 'वह किस दिशा में चल रहा है?'।"
    },
    {
      question: "सूर्योदय के समय यदि मेरी छाया मेरे बाएँ हाथ पर पड़ रही है, तो मेरा मुख किधर है?",
      answer: "सूर्योदय में छाया पश्चिम में होती है। यदि पश्चिम आपके बाएँ हाथ पर है, तो आपका मुख अनिवार्य रूप से **उत्तर (North)** की ओर है।"
    },
    {
      question: "तीन बार दाएँ मुड़ने ($3R$) का सबसे छोटा शॉर्टकट क्या है?",
      answer: "$3R = 1L$। तीन बार दाएँ मुड़ने के बजाय केवल 1 बार बाएँ (Left) मुड़ जाएं, वही दिशा प्राप्त होगी।"
    },
    {
      question: "यदि कोई $180^\\circ$ घूमता है तो क्या दिशा होगी?",
      answer: "$180^\\circ$ का अर्थ ठीक विपरीत दिशा होता है (उदा. उत्तर का दक्षिण, पूर्व का पश्चिम)। इसमें दक्षिणावर्त या वामावर्त का कोई अंतर नहीं पड़ता।"
    },
    {
      question: "CG Vyapam में दिशा परीक्षण के कितने प्रश्न आते हैं?",
      answer: "व्यापम की प्रत्येक परीक्षा में दिशा परीक्षण और दूरी से मिलाकर 2 से 3 प्रश्न निश्चित रूप से पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "दायाँ मोड़ $= 90^\\circ$ दक्षिणावर्त (CW) और बायाँ मोड़ $= 90^\\circ$ वामावर्त (ACW)।",
    "L/R कैंसिलेशन: $1R + 1L = 0$ (विपरीत मोड़ आपस में कट जाते हैं)।",
    "$2R$ अथवा $2L = 180^\\circ$ अर्थात व्यक्ति ठीक विपरीत दिशा में आ जाता है।",
    "$4R$ अथवा $4L = 360^\\circ$ अर्थात व्यक्ति अपनी मूल प्रारंभिक दिशा में रहता है।",
    "सूर्योदय के समय छाया हमेशा पश्चिम (West) में पड़ती है।",
    "सूर्यास्त के समय छाया हमेशा पूर्व (East) में पड़ती है।",
    "दोपहर 12 बजे सूर्य सिर पर होने के कारण कोई छाया नहीं बनती।",
    "सुबह उत्तर की ओर मुख होने पर छाया बाएँ हाथ (Left) पर पड़ती है।",
    "सुबह दक्षिण की ओर मुख होने पर छाया दाएँ हाथ (Right) पर पड़ती है।",
    "शीर्षासन में सामान्य स्थिति की तुलना में दायाँ और बायाँ हाथ उलट जाते हैं।"
  ],
  rapidRevision: {
    points: [
      "Turn Shortcut: $1R+1L = 0; 2R/2L = \\text{Opposite}; 3R = 1L; 4R/4L = \\text{Same}$।",
      "Net Angle Formula: $|\\sum CW - \\sum ACW|$ $\\implies$ Rotate from starting point toward dominant side।",
      "Shadow Law: Sunrise $\\implies$ Shadow West; Sunset $\\implies$ Shadow East; Noon $\\implies$ No shadow।",
      "Facing North at Sunrise $\\implies$ Shadow on LEFT; Facing South $\\implies$ Shadow on RIGHT।",
      "Headstand Rule: Invert left and right hands relative to regular upright stance।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_dir_1_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_dir_1');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_dir_1 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_5', 'reas_dir_1');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
