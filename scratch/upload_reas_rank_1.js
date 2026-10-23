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

const reas_rank_1_data = {
  topicId: "reas_rank_1",
  topicName: "Ranking Test",
  topicNameHi: "रैंकिंग परीक्षण (Ranking Test - Left/Right & Top/Bottom)",
  chapterId: "cgv_master_sub_4_ch_6",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "रैंकिंग परीक्षण (Ranking Test) एक-विमीय (Linear) व्यवस्था में व्यक्तियों, वस्तुओं अथवा विद्यार्थियों की स्थिति और संख्यात्मक गणना पर आधारित तार्किक अभियोग्यता का एक अत्यंत महत्वपूर्ण अध्याय है। इसमें किसी पंक्ति (Row), कक्षा की मेरिट सूची (Class Merit List), या कतार (Queue) में किसी व्यक्ति का बाएँ (Left) / शीर्ष (Top / Ahead) से तथा दाएँ (Right) / तल (Bottom / Behind) से स्थान दिया जाता है। परीक्षार्थी को मौलिक बीजगणितीय सूत्रों ($T = L + R - 1$) के माध्यम से कुल व्यक्तियों की संख्या (Total Count), दूसरे छोर से स्थान, अथवा दो व्यक्तियों के मध्य बैठे व्यक्तियों की संख्या ज्ञात करनी होती है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, हॉस्टल अधीक्षक, सहायक ग्रेड-3, डाटा एंट्री ऑपरेटर) तथा CGPSC CSAT में रैंकिंग परीक्षण से 2 से 3 प्रश्न अनिवार्य रूप से पूछे जाते हैं। यह अध्याय अभ्यर्थी की तार्किक सटीकता, गणना की गति और अतिव्यापन (Overlapping) की स्थितियों को समझने की क्षमता का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में मुख्य रूप से 4 प्रकार के प्रश्न आते हैं: (1) एक ही व्यक्ति के दोनों छोरों से स्थान ज्ञात होने पर कुल संख्या ($T = L + R - 1$), (2) कुल संख्या ज्ञात होने पर दूसरे छोर से स्थान ($R = T - L + 1$), (3) दो व्यक्तियों के मध्य व्यक्तियों की संख्या (साधारण स्थिति बनाम अतिव्यापी स्थिति - Overlapping Case), तथा (4) उत्तीर्ण-अनुत्तीर्ण और मेरिट सूची आधारित प्रश्न।",
    quickFacts: [
      "गोल्डन रैंकिंग सूत्र: किसी पंक्ति में कुल व्यक्तियों की संख्या $T = \\text{Left} + \\text{Right} - 1$ अथवा $T = \\text{Top} + \\text{Bottom} - 1$ होती है ($-1$ इसलिए किया जाता है क्योंकि उस एक व्यक्ति की गिनती दोनों ओर से दो बार हो जाती है)।",
      "दूसरे छोर से स्थान निकालने का सूत्र: $\\text{Right} = (T + 1) - \\text{Left}$ तथा $\\text{Left} = (T + 1) - \\text{Right}$।",
      "मध्य में बैठे व्यक्तियों की संख्या (गैर-अतिव्यापी स्थिति - Simple Case): यदि $L + R < T$ हो, तो $\\text{मध्य में व्यक्ति} = T - (L + R)$।",
      "अतिव्यापन स्थिति (Overlapping Case): यदि $L + R > T$ हो, तो $\\text{मध्य में व्यक्ति} = (L + R) - T - 2$ (यहाँ $-2$ उन दोनों व्यक्तियों को हटाने के लिए किया जाता है)।",
      "न्यूनतम व्यक्तियों की संख्या (Minimum Number in Row): किसी पंक्ति में न्यूनतम संख्या $= L + R - (\\text{मध्य के व्यक्ति}) - 2$ होती है।"
    ]
  },
  chapters: [
    {
      id: "ch1_single_person_ranking_formulas",
      title: "एकल व्यक्ति रैंकिंग एवं मूलभूत सूत्र (Single Person Ranking & Fundamental Formulas)",
      content: `### 1. एकल व्यक्ति रैंकिंग एवं आधारभूत सूत्र

जब किसी पंक्ति में केवल एक ही व्यक्ति के दोनों छोरों से स्थान दिए गए हों, तो निम्नलिखित नियमों का पालन किया जाता है:

#### 1. कुल व्यक्तियों की संख्या ज्ञात करना:
$$T = \\text{Left} + \\text{Right} - 1$$
$$T = \\text{Top} + \\text{Bottom} - 1$$
- **$-1$ क्यों किया जाता है?**
  - क्योंकि उस व्यक्ति को बाएँ से गिनते समय भी गिना गया और दाएँ से गिनते समय भी गिना गया (दोहरी गणना - Double Counting)।
  - **उदाहरण:** यदि रोहन का स्थान कक्षा में ऊपर से 7वां और नीचे से 26वां है, तो कक्षा में कुल छात्र:
    $$T = 7 + 26 - 1 = 33 - 1 = 32$$

#### 2. दूसरे छोर से स्थान ज्ञात करना:
यदि कुल संख्या $T$ ज्ञात हो और किसी एक छोर से स्थान ज्ञात हो:
$$\\text{Right} = (T + 1) - \\text{Left}$$
$$\\text{Left} = (T + 1) - \\text{Right}$$
- **उदाहरण:** 40 विद्यार्थियों की एक कक्षा में समीर का स्थान ऊपर से 12वां है। नीचे से उसका स्थान क्या होगा?
  $$\\text{Bottom} = (40 + 1) - 12 = 41 - 12 = 29\\text{वां}$$`
    },
    {
      id: "ch2_two_persons_middle_count",
      title: "दो व्यक्तियों के मध्य स्थित संख्या (Persons Between Two Individuals)",
      content: `### 2. दो व्यक्तियों के मध्य बैठे लोगों की संख्या की गणना

जब पंक्ति में दो अलग-अलग व्यक्तियों के स्थान दोनों विपरीत छोरों से दिए गए हों, तो दो स्थितियां उत्पन्न होती हैं:

#### स्थिति 1: गैर-अतिव्यापी / सामान्य स्थिति (Non-Overlapping / Normal Case)
- **पहचान:** जब दोनों के स्थानों का योग कुल संख्या से **कम** हो:
  $$L_A + R_B < T$$
- **मध्य में व्यक्तियों की संख्या का सूत्र:**
  $$\\text{Persons in Middle} = T - (L_A + R_B)$$
- **उदाहरण:** 50 विद्यार्थियों की पंक्ति में राम बाएँ से 15वां और श्याम दाएँ से 20वां है। उनके बीच कितने लोग हैं?
  - $L + R = 15 + 20 = 35 < 50$ (सामान्य स्थिति)
  - मध्य में व्यक्ति $= 50 - 35 = 15$ लोग।

#### स्थिति 2: अतिव्यापी स्थिति (Overlapping / Cross-Over Case)
- **पहचान:** जब दोनों के स्थानों का योग कुल संख्या से **अधिक** हो जाए:
  $$L_A + R_B > T$$
- **मध्य में व्यक्तियों की संख्या का सूत्र:**
  $$\\text{Persons in Middle} = (L_A + R_B) - T - 2$$
- **$-2$ क्यों किया जाता है?**
  - क्योंकि ओवरलैप करते समय राम और श्याम दोनों की गिनती दोनों तरफ से दो बार हो जाती है!
- **उदाहरण:** 40 छात्रों की पंक्ति में A बाएँ से 25वां और B दाएँ से 22वां है। उनके बीच कितने छात्र हैं?
  - $L + R = 25 + 22 = 47 > 40$ (ओवरलैपिंग!)
  - मध्य में छात्र $= (25 + 22) - 40 - 2 = 47 - 42 = 5$ छात्र।`
    },
    {
      id: "ch3_max_min_persons_in_row",
      title: "पंक्ति में अधिकतम एवं न्यूनतम व्यक्तियों की संख्या (Maximum & Minimum Capacity)",
      content: `### 3. पंक्ति में अधिकतम और न्यूनतम संख्या का निर्धारण

जब प्रश्न में दो व्यक्तियों के स्थान और उनके मध्य बैठे लोगों की संख्या ($M$) दी गई हो, तो कुल संख्या के दो संभावित मान होते हैं:

#### 1. अधिकतम संख्या (Maximum Capacity - Simple Case):
दोनों व्यक्ति एक-दूसरे को पार नहीं करते:
$$\\text{Total}_{\\text{max}} = L + R + M$$
- **उदाहरण:** A बाएँ से 10वां, B दाएँ से 15वां और उनके बीच 5 व्यक्ति हैं।
  - $\\text{Total}_{\\text{max}} = 10 + 15 + 5 = 30$ व्यक्ति।

#### 2. न्यूनतम संख्या (Minimum Capacity - Overlapping Case):
दोनों व्यक्ति एक-दूसरे को पार (Cross) कर जाते हैं:
$$\\text{Total}_{\\text{min}} = L + R - M - 2$$
- **उदाहरण (उपरोक्त डेटा पर):**
  - $\\text{Total}_{\\text{min}} = 10 + 15 - 5 - 2 = 25 - 7 = 18$ व्यक्ति।
- **अतिव्यापन की अनिवार्य शर्त (Condition for Overlap to be Valid):**
  - मध्य में बैठे व्यक्तियों की संख्या ($M$) दोनों छोरों के न्यूनतम स्थान से कम से कम 2 कम होनी चाहिए:
    $$M \\le \\min(L, R) - 2$$
  - यदि $M > \\min(L, R) - 2$ हो, तो ओवरलैपिंग संभव नहीं होती और केवल अधिकतम संख्या ही मान्य होती है!`
    },
    {
      id: "ch4_pass_fail_merit_problems",
      title: "उत्तीर्ण-अनुत्तीर्ण एवं योग्यता सूची प्रश्न (Pass/Fail & Merit Rank Problems)",
      content: `### 4. परीक्षा परिणाम, उत्तीर्ण-अनुत्तीर्ण एवं अनुपस्थित छात्र

व्यापम की परीक्षाओं में केवल मेरिट सूची पर प्रश्न नहीं आते, बल्कि फेल और अनुपस्थित छात्रों को जोड़कर कुल संख्या पूछी जाती है:

#### 1. संरचनात्मक समीकरण:
$$\\text{कक्षा में कुल विद्यार्थी} = \\text{उत्तीर्ण छात्र (Passed)} + \\text{अनुत्तीर्ण छात्र (Failed)} + \\text{अनुपस्थित छात्र (Absent)}$$

#### 2. उत्तीर्ण छात्रों की आंतरिक रैंकिंग:
- यदि किसी परीक्षा में पास हुए विद्यार्थियों में राम ऊपर से 11वां और नीचे से 24वां है:
  $$\\text{कुल उत्तीर्ण छात्र} = 11 + 24 - 1 = 34$$
- यदि 6 छात्र परीक्षा में अनुपस्थित रहे और 5 छात्र फेल हो गए हों:
  $$\\text{कक्षा में कुल छात्र} = 34 + 6 + 5 = 45$$`
    },
    {
      id: "ch5_vyapam_traps_speed_hacks",
      title: "परीक्षा कक्ष रणनीति एवं त्वरित गणना विधियाँ (Speed Hacks & Traps)",
      content: `### 5. रैंकिंग परीक्षण में 100% सटीकता के नियम

1. **$+1$ और $-1$ का स्पष्ट अंतर याद रखें:**
   - जब **Total** निकालना हो $\\implies -1$ करें ($L + R - 1$)।
   - जब **Rank** (दूसरे छोर से स्थान) निकालना हो $\\implies +1$ में से घटाएं ($(T + 1) - L$)।

2. **संबोधन शब्दों की दिशा (Directional Words):**
   - **बायाँ (Left):** शुरू से (From start), आगे से (From front), शीर्ष से (From top), पहले से (Ahead)।
   - **दायाँ (Right):** अंत से (From end), पीछे से (From behind), नीचे से (From bottom), अंतिम से (From last)।

3. **दो व्यक्तियों के मध्य सममिति:**
   - यदि कोई व्यक्ति दो लोगों के 'ठीक मध्य' (Exactly in the middle) में बैठा है, तो दोनों ओर समान संख्या में लोग होंगे।`
    }
  ],
  comparativeTables: [
    {
      title: "रैंकिंग परीक्षण के प्रमुख बीजगणितीय सूत्र",
      headers: ["ज्ञात करना है", "प्रदत्त मान (Given)", "मानक गणितीय सूत्र", "व्याख्या / औचित्य"],
      rows: [
        { cells: ["कुल संख्या ($T$)", "एक ही व्यक्ति का दोनों छोरों से स्थान ($L, R$)", "$T = L + R - 1$", "उस व्यक्ति की दोहरी गणना घटाने हेतु $-1$"] },
        { cells: ["दूसरे छोर से स्थान ($R$)", "कुल संख्या ($T$) और एक छोर से स्थान ($L$)", "$R = (T + 1) - L$", "उस व्यक्ति का स्थान सुरक्षित करने हेतु $+1$"] },
        { cells: ["मध्य में व्यक्ति (सामान्य)", "कुल संख्या $T$ तथा $L + R < T$", "$\\text{Middle} = T - (L + R)$", "सीधा अंतर (दोनों छोरों का योग घटाना)"] },
        { cells: ["मध्य में व्यक्ति (ओवरलैप)", "कुल संख्या $T$ तथा $L + R > T$", "$\\text{Middle} = (L + R) - T - 2$", "ओवरलैप में दोनों व्यक्तियों को हटाने हेतु $-2$"] },
        { cells: ["न्यूनतम कुल संख्या", "$L, R$ तथा मध्य में व्यक्ति ($M$)", "$T_{\\text{min}} = L + R - M - 2$", "अतिव्यापी अवस्था में न्यूनतम क्षमता"] },
        { cells: ["अधिकतम कुल संख्या", "$L, R$ तथा मध्य में व्यक्ति ($M$)", "$T_{\\text{max}} = L + R + M$", "गैर-अतिव्यापी अवस्था में अधिकतम क्षमता"] }
      ]
    },
    {
      title: "सामान्य स्थिति बनाम अतिव्यापी (Overlapping) स्थिति",
      headers: ["मापदंड", "सामान्य स्थिति (Normal Case)", "अतिव्यापी स्थिति (Overlapping Case)"],
      rows: [
        { cells: ["शर्त", "$L + R < T$", "$L + R > T$"] },
        { cells: ["व्यक्तियों की स्थिति", "A और B एक-दूसरे के आमने-सामने (बिना पार किए)", "A और B एक-दूसरे को पार (Cross) कर चुके हैं"] },
        { cells: ["मध्य व्यक्ति सूत्र", "$T - (L + R)$", "$(L + R) - T - 2$"] },
        { cells: ["न्यूनतम/अधिकतम", "अधिकतम क्षमता को दर्शाता है", "न्यूनतम क्षमता को दर्शाता है"] }
      ]
    },
    {
      title: "दिशा वाचक शब्दावली एवं रैंकिंग तुल्यता",
      headers: ["पारंपरिक शब्द", "समतुल्य बायाँ (Left / Top)", "समतुल्य दायाँ (Right / Bottom)"],
      rows: [
        { cells: ["कतार / पंक्ति", "बाएँ से (From left end)", "दाएँ से (From right end)"] },
        { cells: ["कक्षा की मेरिट सूची", "शीर्ष से / ऊपर से (From top)", "नीचे से / अंतिम से (From bottom)"] },
        { cells: ["दौड़ / प्रतियोगिता", "आगे से (From ahead / front)", "पीछे से (From behind / rear)"] },
        { cells: ["पुस्तकों का ढेर", "ऊपर से (From top)", "नीचे से (From bottom)"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "कक्षा में रोहन की रैंक ऊपर से 7वीं और नीचे से 26वीं है। कक्षा में कुल कितने विद्यार्थी हैं? [CG Vyapam Patwari Exam]",
      options: ["32", "33", "34", "31"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "गोल्डन रैंकिंग सूत्र का प्रयोग करें:\n$$T = \\text{Top} + \\text{Bottom} - 1$$\n$$T = 7 + 26 - 1 = 33 - 1 = 32$$\nअतः कक्षा में कुल 32 विद्यार्थी हैं।"
    },
    {
      id: "pyq2",
      question: "52 छात्रों की एक कक्षा में बिलाल का स्थान नीचे से 11वां है। ऊपर से उसका स्थान क्या होगा? [CG Vyapam Subedar / SI Prelims]",
      options: ["42वां", "41वां", "43वां", "40वां"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "दूसरे छोर से स्थान का सूत्र:\n$$\\text{Top} = (T + 1) - \\text{Bottom}$$\n$$\\text{Top} = (52 + 1) - 11 = 53 - 11 = 42\\text{वां}$$\nअतः ऊपर से उसका स्थान 42वां होगा।"
    },
    {
      id: "pyq3",
      question: "एक पंक्ति में 40 विद्यार्थी हैं। A बाएँ से 13वां है और B दाएँ से 17वां है। A और B के बीच कितने विद्यार्थी हैं? [CGPSC CSAT]",
      options: ["10", "11", "9", "12"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "जांचें कि स्थिति सामान्य है या ओवरलैप:\n$L + R = 13 + 17 = 30$\nचूंकि $30 < 40$ (कुल संख्या से कम है), अतः यह सामान्य स्थिति है।\n$$\\text{मध्य में विद्यार्थी} = T - (L + R) = 40 - 30 = 10$$\nअतः A और B के बीच 10 विद्यार्थी हैं।"
    },
    {
      id: "pyq4",
      question: "एक कक्षा की परीक्षा में उत्तीर्ण हुए छात्रों में राहुल का स्थान ऊपर से 16वां और नीचे से 29वां है। 6 छात्रों ने परीक्षा में भाग नहीं लिया और 5 छात्र अनुत्तीर्ण हो गए। कक्षा में कुल कितने छात्र थे? [CG Vyapam Hostel Warden]",
      options: ["55", "54", "56", "50"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "1. कुल उत्तीर्ण छात्र $= 16 + 29 - 1 = 45 - 1 = 44$\n2. परीक्षा न देने वाले छात्र $= 6$\n3. अनुत्तीर्ण छात्र $= 5$\nकक्षा में कुल छात्र $= 44 + 6 + 5 = 55$\nअतः सही उत्तर 55 है।"
    },
    {
      id: "pyq5",
      question: "45 छात्रों की एक कक्षा में, एक लड़के की रैंक 20वीं है। जब दो लड़के और प्रवेश लेते हैं, तो उसकी रैंक 1 कम हो जाती है। अंत से उसकी नई रैंक क्या होगी? [CG Vyapam Revenue Inspector]",
      options: ["27वीं", "28वीं", "26वीं", "29वीं"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "1. नए छात्रों के बाद कुल संख्या $T = 45 + 2 = 47$\n2. लड़के की रैंक 1 कम हो जाती है अर्थात वह 20 से खिसक कर 21वीं हो जाती है (रैंक में गिरावट अर्थात संख्यात्मक वृद्धि)।\n3. अंत से नई रैंक $= (T + 1) - \\text{नई रैंक}$\n$$= (47 + 1) - 21 = 48 - 21 = 27\\text{वीं}$$\nअतः सही उत्तर 27वीं रैंक है।"
    },
    {
      id: "pyq6",
      question: "एक पंक्ति में P बाएँ से 18वां है और Q दाएँ से 24वां है। यदि पंक्ति में कुल 35 व्यक्ति हैं, तो P और Q के बीच कितने व्यक्ति हैं? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["5", "7", "6", "4"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "जांच करें: $L + R = 18 + 24 = 42$\nचूंकि $42 > 35$ (कुल संख्या से अधिक है), अतः यह **अतिव्यापी (Overlapping)** स्थिति है!\nओवरलैपिंग का सूत्र:\n$$\\text{मध्य में व्यक्ति} = (L + R) - T - 2$$\n$$= (18 + 24) - 35 - 2 = 42 - 37 = 5$$\nअतः P और Q के बीच 5 व्यक्ति हैं।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "एक पंक्ति में सुरेश का स्थान बाएँ से 15वां और दाएँ से 7वां है। पंक्ति में कुल कितने व्यक्ति हैं?",
      options: ["21", "22", "20", "23"],
      correctOption: 0,
      explanation: "$T = L + R - 1 = 15 + 7 - 1 = 21$।"
    },
    {
      id: "mcq2",
      question: "30 बच्चों की एक कक्षा में, सरिता ऊपर से 9वीं है। नीचे से उसका स्थान क्या होगा?",
      options: ["22वां", "21वां", "23वां", "20वां"],
      correctOption: 0,
      explanation: "$\\text{Bottom} = (T + 1) - \\text{Top} = (30 + 1) - 9 = 31 - 9 = 22$वां।"
    },
    {
      id: "mcq3",
      question: "एक पंक्ति में A बाएँ से 11वां है और B दाएँ से 10वां है। यदि उनके बीच 4 व्यक्ति हैं, तो पंक्ति में न्यूनतम कितने व्यक्ति हो सकते हैं?",
      options: ["15", "25", "17", "19"],
      correctOption: 0,
      explanation: "न्यूनतम संख्या (Overlapping Case):\n$T_{\\text{min}} = L + R - M - 2 = 11 + 10 - 4 - 2 = 21 - 6 = 15$।"
    },
    {
      id: "mcq4",
      question: "एक पंक्ति में अधिकतम व्यक्तियों की संख्या क्या होगी यदि X बाएँ से 8वां, Y दाएँ से 12वां और उनके बीच 6 व्यक्ति हों?",
      options: ["26", "20", "24", "28"],
      correctOption: 0,
      explanation: "$T_{\\text{max}} = L + R + M = 8 + 12 + 6 = 26$।"
    },
    {
      id: "mcq5",
      question: "यदि किसी परीक्षा में उत्तीर्ण 30 छात्रों में अमित 10वां है और 5 छात्र फेल हुए हैं, तो कक्षा में कुल कितने छात्र थे?",
      options: ["35", "34", "36", "30"],
      correctOption: 0,
      explanation: "कक्षा में कुल छात्र = पास (30) + फेल (5) = 35 छात्र।"
    },
    {
      id: "mcq6",
      question: "50 विद्यार्थियों की पंक्ति में, राम बाएँ से 20वां और श्याम दाएँ से 25वां है। उनके बीच कितने छात्र हैं?",
      options: ["5", "6", "4", "7"],
      correctOption: 0,
      explanation: "$L + R = 20 + 25 = 45 < 50$ (सामान्य स्थिति)। मध्य में छात्र $= 50 - 45 = 5$ छात्र।"
    },
    {
      id: "mcq7",
      question: "एक कक्षा में सोहन का स्थान ऊपर से 15वां और नीचे से 15वां है। कक्षा में कुल कितने छात्र हैं?",
      options: ["29", "30", "31", "28"],
      correctOption: 0,
      explanation: "$T = 15 + 15 - 1 = 29$।"
    },
    {
      id: "mcq8",
      question: "ओवरलैपिंग की स्थिति में मध्य के व्यक्तियों की गणना करते समय $-2$ क्यों किया जाता है?",
      options: ["दोनों छोर वाले व्यक्तियों की दोहरी गणना घटाने के लिए", "शून्य संतुलन के लिए", "केवल सम संख्याओं के लिए", "सूत्र का नियम होने से"],
      correctOption: 0,
      explanation: "ओवरलैपिंग में दोनों लक्षित व्यक्ति दोनों ओर से गिने जा चुके होते हैं, अतः उन्हें मध्य की संख्या से हटाने के लिए 2 घटाया जाता है।"
    }
  ],
  keyTerminology: [
    {
      term: "Ranking Test",
      termHi: "रैंकिंग परीक्षण",
      definition: "The algebraic deduction of positional ordinals and cardinal capacities in a single-dimensional queue or merit roster.",
      definitionHi: "एक-विमीय पंक्ति या मेरिट सूची में व्यक्तियों की स्थिति और कुल संख्या की तार्किक गणना।"
    },
    {
      term: "Double Counting Correction (-1)",
      termHi: "दोहरी गणना निवारण (-1)",
      definition: "Subtracting 1 from the sum of left and right ordinals because the focal individual was enumerated from both ends.",
      definitionHi: "बाएँ और दाएँ के योग में से 1 घटाना क्योंकि लक्षित व्यक्ति दोनों सिरों से दो बार गिना जा चुका होता है।"
    },
    {
      term: "Offset Addition (+1)",
      termHi: "ऑफसेट जोड़ (+1)",
      definition: "Adding 1 to the total capacity when converting an ordinal from one extremity to the opposite extremity.",
      definitionHi: "कुल संख्या में 1 जोड़कर घटाना ताकि दूसरे छोर से उस व्यक्ति का वैध स्थान प्राप्त हो सके।"
    },
    {
      term: "Overlapping Case",
      termHi: "अतिव्यापी अवस्था",
      definition: "The condition where the sum of boundary ordinals exceeds total capacity (L + R > T), signifying subjects cross over each other.",
      definitionHi: "वह स्थिति जिसमें दोनों सिरों के स्थानों का योग कुल संख्या से अधिक हो जाता है, अर्थात दोनों व्यक्ति एक-दूसरे को पार कर जाते हैं।"
    },
    {
      term: "Non-Overlapping Case",
      termHi: "सामान्य / गैर-अतिव्यापी अवस्था",
      definition: "The standard condition where boundary ordinals sum to less than total capacity (L + R < T), leaving clean separation.",
      definitionHi: "वह सामान्य स्थिति जिसमें दोनों सिरों के स्थानों का योग कुल संख्या से कम होता है।"
    },
    {
      term: "Minimum Capacity Formula",
      termHi: "न्यूनतम क्षमता सूत्र",
      definition: "The algebraic formula T_min = L + R - M - 2 calculating the smallest cohort size permitting the stated rankings.",
      definitionHi: "अतिव्यापन के आधार पर पंक्ति में संभव न्यूनतम व्यक्तियों की संख्या निकालने का सूत्र ($L + R - M - 2$)।"
    },
    {
      term: "Maximum Capacity Formula",
      termHi: "अधिकतम क्षमता सूत्र",
      definition: "The linear sum T_max = L + R + M computing the largest cohort size without cross-over.",
      definitionHi: "बिना ओवरलैप के सभी तत्वों का सीधा जोड़ ($L + R + M$) जो पंक्ति की अधिकतम क्षमता दर्शाता है।"
    },
    {
      term: "Merit Roster Breakdown",
      termHi: "मेरिट सूची विखंडन",
      definition: "Separating successful ranked students from absent candidates and failing individuals to reconstruct total enrollment.",
      definitionHi: "कुल विद्यार्थियों की संख्या निकालने हेतु उत्तीर्ण, अनुत्तीर्ण और अनुपस्थित छात्रों का संयोजन।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Chapter: Ranking & Order Test",
      author: "Dr. R.S. Aggarwal",
      description: "रैंकिंग परीक्षण, ओवरलैपिंग स्थितियां और कुल क्षमता सूत्रों का मानक संदर्भ ग्रंथ।"
    },
    {
      title: "How to Crack Test of Reasoning - Order & Ranking Section",
      author: "Jaikishan & Premkishan (Arihant Publications)",
      description: "न्यूनतम और अधिकतम व्यक्तियों की संख्या तथा मध्य में बैठे छात्रों के शॉर्टकट नियमों का संकलन।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की विभिन्न परीक्षाओं (पटवारी, सूबेदार, हॉस्टल अधीक्षक) में पूछे गए वास्तविक रैंकिंग प्रश्न।"
    },
    {
      title: "Magical Book on Quicker Reasoning",
      author: "K. Kundan",
      description: "अतिव्यापी स्थितियों में $-2$ के औचित्य और 5-सेकंड गणना ट्रिक्स का संपूर्ण विश्लेषण।"
    }
  ],
  confusionBuster: [
    {
      misconception: "जब भी दूसरे छोर से स्थान निकालना हो, तो सीधे Total में से दिया गया स्थान घटा देना चाहिए।",
      clarification: "यह सबसे सामान्य गलती है! यदि Total में से घटाएंगे तो उस व्यक्ति का स्थान छूट जाएगा। हमेशा $(Total + 1)$ में से घटाया जाता है।"
    },
    {
      misconception: "मध्य के व्यक्ति निकालने के लिए हमेशा $T - (L + R)$ ही लगाया जाता है।",
      clarification: "केवल तब जब $L + R < T$ हो! यदि $L + R > T$ हो (ओवरलैप), तो सूत्र $(L + R) - T - 2$ लगाना अनिवार्य होता है।"
    },
    {
      misconception: "ओवरलैप में $-2$ करना भूल जाना।",
      clarification: "ओवरलैप में दोनों व्यक्ति दोनों तरफ से गिने जा चुके होते हैं, अतः $-2$ किए बिना उत्तर हमेशा 2 अधिक आएगा और गलत हो जाएगा।"
    },
    {
      misconception: "कक्षा में पास हुए छात्रों की रैंकिंग से पूरी कक्षा की कुल संख्या सीधे निकल आती है।",
      clarification: "नहीं! उससे केवल 'उत्तीर्ण छात्रों' की संख्या निकलती है। पूरी कक्षा के लिए फेल और अनुपस्थित छात्रों को भी जोड़ना पड़ता है।"
    },
    {
      misconception: "रैंकिंग में बायाँ और शीर्ष अलग-अलग नियमों से हल होते हैं।",
      clarification: "बायाँ-दायाँ (Left-Right) और ऊपर-नीचे (Top-Bottom) गणितीय रूप से 100% समतुल्य हैं; दोनों में बिल्कुल समान सूत्र लागू होते हैं।"
    }
  ],
  faqList: [
    {
      question: "कुल संख्या निकालने का मूल सूत्र क्या है और इसमें -1 क्यों होता है?",
      answer: "सूत्र है $T = L + R - 1$। चूंकि उस व्यक्ति को बाएँ से और दाएँ से दो बार गिना जाता है, इसलिए उस दोहरी गिनती को ठीक करने के लिए 1 घटाया जाता है।"
    },
    {
      question: "यह कैसे पहचानें कि प्रश्न में ओवरलैपिंग (Overlapping) है या नहीं?",
      answer: "दोनों सिरों के स्थानों को जोड़ें ($L + R$)। यदि यह योग कुल संख्या ($T$) से अधिक है, तो निश्चित रूप से ओवरलैपिंग है।"
    },
    {
      question: "न्यूनतम व्यक्तियों की संख्या का सूत्र क्या है?",
      answer: "$T_{\\text{min}} = L + R - (\\text{मध्य में व्यक्ति}) - 2$।"
    },
    {
      question: "अधिकतम व्यक्तियों की संख्या का सूत्र क्या है?",
      answer: "$T_{\\text{max}} = L + R + (\\text{मध्य में व्यक्ति})$।"
    },
    {
      question: "CG Vyapam में रैंकिंग से किस तरह के प्रश्न अधिक आते हैं?",
      answer: "व्यापम में एक ही व्यक्ति के दोनों छोरों से स्थान ($T = L+R-1$) और ओवरलैपिंग आधारित मध्य संख्या के प्रश्न सर्वाधिक पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "कुल संख्या का सूत्र: $T = \\text{Left} + \\text{Right} - 1$।",
    "दूसरे छोर से स्थान का सूत्र: $\\text{Right} = (T + 1) - \\text{Left}$।",
    "सामान्य स्थिति में मध्य के व्यक्ति: $\\text{Middle} = T - (L + R)$।",
    "अतिव्यापी स्थिति (Overlapping) में मध्य के व्यक्ति: $\\text{Middle} = (L + R) - T - 2$।",
    "न्यूनतम क्षमता का सूत्र: $T_{\\text{min}} = L + R - M - 2$।",
    "अधिकतम क्षमता का सूत्र: $T_{\\text{max}} = L + R + M$।",
    "कक्षा में कुल छात्र = उत्तीर्ण छात्र + अनुत्तीर्ण छात्र + अनुपस्थित छात्र।",
    "रैंक कम होने का अर्थ संख्यात्मक मान का बढ़ना होता है (उदा. 20 से 21)।",
    "Left और Top, तथा Right और Bottom गणितीय रूप से पूर्णतः समतुल्य हैं।",
    "यदि $L + R = T + 1$ हो, तो दोनों व्यक्ति एक-दूसरे के ठीक बगल में (Adjacent) बैठे होते हैं।"
  ],
  rapidRevision: {
    points: [
      "Master Total Formula: $T = L + R - 1$।",
      "Reverse Rank: $\\text{Rank} = (T + 1) - \\text{Given Rank}$।",
      "Overlapping Test: If $L + R > T \\implies \\text{Middle} = (L + R) - T - 2$।",
      "Normal Test: If $L + R < T \\implies \\text{Middle} = T - (L + R)$।",
      "Min/Max Bounds: $T_{\\text{min}} = L + R - M - 2$; $T_{\\text{max}} = L + R + M$।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_rank_1_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_rank_1');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_rank_1 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_6', 'reas_rank_1');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
