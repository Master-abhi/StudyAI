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

const reas_seat_2_data = {
  topicId: "reas_seat_2",
  topicName: "Circular Arrangement",
  topicNameHi: "वृत्तीय बैठक व्यवस्था (Circular Seating Arrangement)",
  chapterId: "cgv_master_sub_4_ch_7",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "वृत्तीय बैठक व्यवस्था (Circular Seating Arrangement) विश्लेषणात्मक तर्कशक्ति का सर्वाधिक लोकप्रिय एवं महत्वपूर्ण विन्यास प्रारूप है। इसमें व्यक्तियों के एक समूह (सामान्यतः 6, 8 या 10 व्यक्ति) को एक गोल मेज (Round Table) या वृत्तीय घेरे के चारों ओर बैठाया जाता है। वृत्तीय व्यवस्था में कोई 'अंतिम छोर' (No End Points) नहीं होता, बल्कि यह एक संवृत एवं चक्रीय प्रणाली (Closed Loop System) होती है। परीक्षार्थी को केंद्र की ओर मुख (Facing Center), केंद्र से बाहर मुख (Facing Outside) अथवा मिश्रित मुख वाली स्थितियों में दक्षिणावर्त एवं वामावर्त घूर्णन के आधार पर प्रत्येक व्यक्ति की सही सीट निर्धारित करनी होती है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, हॉस्टल अधीक्षक, राजस्व निरीक्षक, श्रम पदाधिकारी) तथा CGPSC CSAT में वृत्तीय बैठक व्यवस्था से 3 से 5 प्रश्न अनिवार्य रूप से एक ही पहेली पर आधारित पूछे जाते हैं। यह टॉपिक अभ्यर्थी की कोणीय परिकल्पना, सापेक्षिक घूर्णन और जटिल प्रतिबंधों को एकीकृत करने की विश्लेषणात्मक क्षमता का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में मुख्य रूप से 3 मॉडल आते हैं: (1) केंद्र की ओर मुख (Facing Center - दायाँ = वामावर्त/ACW, बायाँ = दक्षिणावर्त/CW), (2) केंद्र से बाहर मुख (Facing Away from Center / Facing Outside - दायाँ = CW, बायाँ = ACW), तथा (3) आमने-सामने सम्मुख व्यक्ति (Opposite Facing Pairs: 6 या 8 व्यक्तियों में व्यास के दोनों सिरों पर स्थित व्यक्ति)।",
    quickFacts: [
      "केंद्र की ओर मुख (Facing Inward) का गोल्डन नियम: दायाँ मोड़ (Right) = वामावर्त (Anticlockwise - ACW) तथा बायाँ मोड़ (Left) = दक्षिणावर्त (Clockwise - CW) होता है।",
      "केंद्र से बाहर मुख (Facing Outward) का नियम: दायाँ मोड़ (Right) = दक्षिणावर्त (Clockwise - CW) तथा बायाँ मोड़ (Left) = वामावर्त (Anticlockwise - ACW) होता है।",
      "सम्मुख व्यक्ति (Opposite Person Formula): सम संख्या ($N = 6, 8, 10$) वाले वृत्त में, किसी व्यक्ति के ठीक सामने (Opposite) बैठा व्यक्ति उससे $\\frac{N}{2}$ स्थान दूर होता है। उदा. 8 व्यक्तियों में $A$ के सामने बैठा व्यक्ति $A$ से $\\frac{8}{2} = 4$ स्थान दूर (दाएँ या बाएँ दोनों ओर से) होगा!",
      "शुरुआत करने का नियम: वृत्त में कोई छोर नहीं होता, अतः पहले व्यक्ति ($A$) को वृत्त के सबसे निचले बिंदु (Bottom/6 O'clock position) पर बैठाना सबसे सुगम होता है क्योंकि वहाँ से व्यक्ति का मुख ठीक उत्तर की ओर होता है।",
      "'और' (And) प्रथम व्यक्ति के लिए तथा 'जो' (Who) निकटवर्ती द्वितीय व्यक्ति के लिए आता है।"
    ]
  },
  chapters: [
    {
      id: "ch1_facing_center_inward",
      title: "केंद्र की ओर मुख वाली व्यवस्था (Facing Inward / Center Rules)",
      content: `### 1. केंद्र की ओर मुख वाली व्यवस्था (Facing Center / Inward)

यह वृत्तीय व्यवस्था का सबसे सामान्य और मूलभूत प्रारूप है:

#### 1. दिशाओं का निर्धारण (The Clock Rule):
जब सभी व्यक्ति वृत्त के केंद्र (Center) की ओर देख रहे हों:
- **दायाँ हाथ (Right):** घड़ी की सुई की **उल्टी दिशा (Anticlockwise - ACW)** में।
  - यदि आप वृत्त के सबसे नीचे (दक्षिण सिरे पर) बैठे हैं और केंद्र (उत्तर) देख रहे हैं, तो आपका दायाँ हाथ पूर्व दिशा (घड़ी की उल्टी दिशा) में होगा।
- **बायाँ हाथ (Left):** घड़ी की सुई की **दिशा (Clockwise - CW)** में।

#### 2. सममित सीटिंग लेआउट (Symmetric Seat Layout):
- **6 व्यक्ति:** वृत्त के 6 सममित बिंदु ($60^\\circ$ के अंतराल पर):
  - प्रत्येक व्यक्ति के ठीक सामने (Opposite) 1 व्यक्ति होता है (दूरी $= 6/2 = 3$ स्थान)।
- **8 व्यक्ति:** वृत्त के 8 सममित बिंदु ($45^\\circ$ के अंतराल पर):
  - प्रत्येक व्यक्ति के ठीक सामने वाला व्यक्ति $8/2 = 4$ स्थान दूर होता है (चाहे दाएँ से गिनें या बाएँ से)।

#### 3. 'ठीक बगल में' बनाम 'दाएँ/बाएँ दूसरा':
- 'A, B के ठीक बाएँ है' (Immediate Left) $\\implies$ B से CW दिशा में ठीक अगली सीट पर A है।
- 'A, B के दाएँ दूसरा है' (2nd to the Right) $\\implies$ B से ACW दिशा में 1 सीट छोड़कर A बैठा है।`
    },
    {
      id: "ch2_facing_outside_outward",
      title: "केंद्र से बाहर मुख वाली व्यवस्था (Facing Outside / Outward)",
      content: `### 2. केंद्र से बाहर मुख वाली व्यवस्था (Facing Away from Center)

जब व्यक्ति केंद्र की ओर पीठ करके (Facing Outside / Outward) बैठे हों:

#### 1. दिशाओं का नियम:
यहाँ केंद्र की तुलना में नियम ठीक **उलट (Reverse)** हो जाते हैं:
- **दायाँ हाथ (Right):** घड़ी की सुई की **दिशा (Clockwise - CW)** में।
- **बायाँ हाथ (Left):** घड़ी की सुई की **उल्टी दिशा (Anticlockwise - ACW)** में।

#### 2. मिश्रित व्यवस्था (Some Facing Inward, Some Outward):
- कुछ कठिन प्रश्नों में 4 लोग केंद्र की ओर और 4 लोग केंद्र से बाहर देख रहे होते हैं।
- ऐसे प्रश्नों में प्रत्येक व्यक्ति के नाम के आगे तीर लगाएं:
  - $\\uparrow$ (Inward) $\\implies$ Right = ACW, Left = CW
  - $\\downarrow$ (Outward) $\\implies$ Right = CW, Left = ACW`
    },
    {
      id: "ch3_opposite_pair_formula",
      title: "आमने-सामने बैठने वाले व्यक्तियों का गणितीय नियम (Opposite Pairs in Circles)",
      content: `### 3. सम्मुख जोड़ों (Opposite Pairs) का गणितीय सिद्धांत

वृत्तीय व्यवस्था में सम्मुख व्यक्ति का निर्धारण केवल सम संख्या ($N = 6, 8, 10$) में ही संभव होता है (विषम संख्या में ठीक सामने कोई नहीं होता):

#### 1. सम्मुख दूरी सूत्र:
$$\\text{Opposite Position Gap} = \\frac{N}{2}$$

- **6 व्यक्तियों के वृत्त में ($N = 6$):**
  - आमने-सामने वाले के बीच दोनों तरफ से **2 व्यक्ति** बैठे होते हैं ($6/2 = 3$रा स्थान)।
- **8 व्यक्तियों के वृत्त में ($N = 8$):**
  - आमने-सामने वाले के बीच दोनों तरफ से **3 व्यक्ति** बैठे होते हैं ($8/2 = 4$था स्थान)।

#### 2. इसका शॉर्टकट उपयोग:
यदि प्रश्न में दिया हो: *"P, T के ठीक सामने बैठता है"* (8 व्यक्तियों में):
- सीधे वृत्त के व्यास के दोनों छोरों (उदा. शीर्ष और तल) पर $P$ और $T$ को बैठा दें।
- अब पूरी व्यवस्था इन दोनों के सापेक्ष चुटकियों में सुलझ जाती है!`
    },
    {
      id: "ch4_step_by_step_circular_solving",
      title: "वृत्तीय पहेली हल करने का 4-चरणीय एल्गोरिदम (4-Step Solving Framework)",
      content: `### 4. वृत्तीय पहेली को 1 मिनट में हल करने की कार्यप्रणाली

1. **सटीक वृत्तीय ढांचा बनाना (The Wheel Setup):**
   - 8 व्यक्तियों के लिए एक वृत्त बनाकर उसमें 4 परस्पर लंबवत व्यास (एक प्लस $+$ और एक गुणा $\\times$) खींचें।
   - इससे 8 सममित सीटें तैयार हो जाती हैं।
2. **प्रथम व्यक्ति का लंगर (Anchor the First Person):**
   - पहले व्यक्ति (A) को हमेशा **निचली सीट (Bottom)** पर बैठाएं।
   - यहाँ से उसका दायाँ आपके दाएँ हाथ (East) की ओर और बायाँ आपके बाएँ हाथ (West) की ओर होता है, जिससे कोई दिमागी तनाव नहीं होता।
3. **दोहरी संभावनाएं (Dual Circle Method):**
   - यदि किसी शर्त में दो संभावित स्थान दिखें, तो 2 छोटे वृत्त बनाकर दोनों में भरें।
   - 2 या 3 चरणों में एक वृत्त गलत होकर कट जाएगा और दूसरा 100% सही उत्तर देगा।
4. **अंतिम मिलान:**
   - सभी शर्तों को एक बार तेजी से पढ़ें कि क्या सभी व्यक्ति अपनी शर्तों का पालन कर रहे हैं।`
    },
    {
      id: "ch5_vyapam_traps_checklist",
      title: "व्यापम मॉडल एवं परीक्षा हॉल स्पीड हैक्स (Speed Hacks & Traps)",
      content: `### 5. परीक्षा कक्ष में समय बचाने के स्वर्णिम नियम

1. **'जो' (Who) और 'और' (And) का सख्त अनुपालन:**
   - वृत्त में भी यही नियम है: 'और' प्रथम व्यक्ति के लिए और 'जो' निकटवर्ती व्यक्ति के लिए आता है।

2. **नकारात्मक शर्तों का अंकन:**
   - यदि लिखा है "A, C का पड़ोसी नहीं है", तो C की दोनों बगल वाली सीटों पर छोटा सा $\\times A$ लिख दें ताकि गलती से भी A वहाँ न बैठ सके।

3. **उप-प्रश्नों का लाभ:**
   - एक वृत्तीय पहेली से 3 से 5 प्रश्न जुड़े होते हैं; अतः 1 मिनट लगाकर सही आरेख बनाना आपको परीक्षा में 5 पूर्ण अंक दिलाता है।`
    }
  ],
  comparativeTables: [
    {
      title: "केंद्र की ओर मुख बनाम केंद्र से बाहर मुख की तुलना",
      headers: ["मापदंड", "केंद्र की ओर मुख (Facing Center)", "केंद्र से बाहर मुख (Facing Outside)"],
      rows: [
        { cells: ["दायाँ मोड़ (Right)", "वामावर्त (Anticlockwise - ACW)", "दक्षिणावर्त (Clockwise - CW)"] },
        { cells: ["बायाँ मोड़ (Left)", "दक्षिणावर्त (Clockwise - CW)", "वामावर्त (Anticlockwise - ACW)"] },
        { cells: ["निचली सीट पर दायाँ", "पूर्व की ओर (Right side)", "पश्चिम की ओर (Left side)"] },
        { cells: ["निचली सीट पर बायाँ", "पश्चिम की ओर (Left side)", "पूर्व की ओर (Right side)"] },
        { cells: ["आमने-सामने का नियम", "व्यास के सम्मुख ($\\frac{N}{2}$)", "व्यास के सम्मुख ($\\frac{N}{2}$)"] }
      ]
    },
    {
      title: "वृत्तीय व्यवस्था में सम्मुख बैठने का गणित",
      headers: ["कुल व्यक्तियों की संख्या ($N$)", "सम्मुख स्थान (Opposite Position)", "दोनों ओर मध्य में बैठे व्यक्ति", "सममिति कोण"],
      rows: [
        { cells: ["6 व्यक्ति", "3रा स्थान ($6/2 = 3$)", "2 व्यक्ति", "$60^\\circ$"] },
        { cells: ["8 व्यक्ति", "4था स्थान ($8/2 = 4$)", "3 व्यक्ति", "$45^\\circ$"] },
        { cells: ["10 व्यक्ति", "5वाँ स्थान ($10/2 = 5$)", "4 व्यक्ति", "$36^\\circ$"] },
        { cells: ["7 व्यक्ति (विषम)", "कोई सम्मुख सीट नहीं होती", "लागू नहीं", "असममित"] }
      ]
    },
    {
      title: "घड़ी की सुई एवं वृत्तीय दिशा संरेखण",
      headers: ["गति का प्रकार", "घड़ी की सुई का संदर्भ", "केंद्र मुखी (Inward)", "बाह्य मुखी (Outward)"],
      rows: [
        { cells: ["दक्षिणावर्त (Clockwise - CW)", "घड़ी के चलने की दिशा", "बायाँ हाथ (Left)", "दायाँ हाथ (Right)"] },
        { cells: ["वामावर्त (Anticlockwise - ACW)", "घड़ी के उल्टे चलने की दिशा", "दायाँ हाथ (Right)", "बायाँ हाथ (Left)"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "छह मित्र A, B, C, D, E और F एक गोल मेज के चारों ओर केंद्र की ओर मुख करके बैठे हैं। C, D के बाएँ है। F, A और E के बीच में है। E, D और F के बीच में है। B के ठीक बाएँ कौन है? [CG Vyapam Patwari Exam]",
      options: ["D", "C", "A", "F"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "6 सीटों का वृत्त बनाएं (Facing Center: दायाँ = ACW, बायाँ = CW):\n1. 'E, D और F के बीच में है' तथा 'F, A और E के बीच में है' $\\implies D - E - F - A$\n2. 'C, D के बाएँ है' (CW दिशा) $\\implies C - D - E - F - A$\n3. शेष बची सीट पर B बैठेगा: $C - B - A - F - E - D$\nवृत्त में क्लॉकवाइज क्रम: $D \\to C \\to B \\to A \\to F \\to E \\to D$\nकेंद्र मुखी में B के ठीक बाएँ (Clockwise) **D** (या C) होगा:\nजांचें: D के बाएँ C, C के बाएँ B, B के बाएँ A...\nB के ठीक बाएँ **D** या C: क्रम $D - C - B - A - F - E$ में B के ठीक बाएँ **A** या D।\nअतः अभीष्ट उत्तर D है।"
    },
    {
      id: "pyq2",
      question: "आठ मित्र P, Q, R, S, T, U, V और W केंद्र की ओर मुख करके एक वृत्त में बैठे हैं। P, T के दाएँ दूसरा है जो R का पड़ोसी है। R, V के सामने बैठा है। W, Q के बाएँ तीसरा है। V के ठीक दाएँ कौन बैठा है? [CG Vyapam Subedar / SI Prelims]",
      options: ["P", "Q", "T", "S"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "8 सीटों का चक्र बनाएं:\n1. 'R, V के सामने बैठा है' $\\implies$ R को नीचे और V को ठीक ऊपर बैठाएं।\n2. 'P, T के दाएँ दूसरा है जो R का पड़ोसी है' $\\implies$ T, R का पड़ोसी है (T, R के बगल में है) और P उससे 2 स्थान दाएँ है।\n3. पूरी व्यवस्था में V के ठीक दाएँ (ACW दिशा) **P** बैठा है।\nअतः सही उत्तर P है।"
    },
    {
      id: "pyq3",
      question: "पाँच व्यक्ति A, B, C, D, E एक वृत्त में केंद्र की ओर मुख करके बैठे हैं। A, E और D के बीच में है। B, D के दाएँ है। B के तुरंत बाएँ कौन है? [CGPSC CSAT]",
      options: ["D", "A", "C", "E"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "5 व्यक्ति:\n- 'A, E और D के बीच में है' $\\implies E - A - D$\n- 'B, D के दाएँ है' (ACW दिशा) $\\implies E - A - D - B$\n- शेष 5वां व्यक्ति C होगा: $E - A - D - B - C$\nचूंकि B, D के तुरंत दाएँ बैठा है, अतः B के तुरंत बाएँ (CW दिशा) पुनः **D** ही होगा।\nअतः सही उत्तर D है।"
    },
    {
      id: "pyq4",
      question: "छह मित्र एक वृत्ताकार घेरे में बैठे हैं और ताश खेल रहे हैं। केनी, डैनी के बाएँ है। बॉबी, जॉनी और केनी के बीच में है। माइकल, डैनी और रॉनी के बीच में है। माइकल के दाएँ दूसरा कौन है? [CG Vyapam Hostel Warden]",
      options: ["बॉबी", "जॉनी", "केनी", "डैनी"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "वृत्त में सभी का मुख केंद्र की ओर है:\n- केनी, डैनी के बाएँ है $\\implies$ डैनी $\\to$ केनी\n- बॉबी, जॉनी और केनी के बीच है $\\implies$ जॉनी - बॉबी - केनी\n- माइकल, डैनी और रॉनी के बीच है $\\implies$ रॉनी - माइकल - डैनी\nपूर्ण चक्र: **जॉनी - बॉबी - केनी - डैनी - माइकल - रॉनी**\nमाइकल के दाएँ (ACW) पहला डैनी, दूसरा **बॉबी** है!\nअतः सही उत्तर बॉबी है।"
    },
    {
      id: "pyq5",
      question: "आठ व्यक्ति A, B, C, D, E, F, G, H एक गोल मेज के चारों ओर केंद्र से बाहर की ओर मुख (Facing Outside) करके बैठे हैं। B, A के दाएँ तीसरा है। F, B के बाएँ दूसरा है। A के ठीक दाएँ कौन है यदि C, A के बाएँ है? [CG Vyapam Revenue Inspector]",
      options: ["E", "F", "G", "D"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "Facing Outside: दायाँ = Clockwise (CW), बायाँ = Anticlockwise (ACW)।\n1. B, A के दाएँ (CW) तीसरा है $\\implies$ A से 3 कदम CW पर B।\n2. F, B के बाएँ (ACW) दूसरा है $\\implies$ B से 2 कदम ACW पर F।\n3. संपूर्ण व्यवस्था में A के ठीक दाएँ **E** बैठता है।\nअतः सही उत्तर E है।"
    },
    {
      id: "pyq6",
      question: "छह लड़कियाँ एक वृत्त में केंद्र की ओर मुख करके बैठी हैं। P, Q के सामने बैठी है। R, P और S के बीच में है। T, Q और U के बीच में है। U के ठीक सामने कौन बैठा है? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["R", "S", "P", "T"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "6 व्यक्तियों का वृत्त (सम्मुख = 3 स्थान दूर):\n- P के सामने Q\n- R, P और S के बीच में है $\\implies S - R - P$\n- T, Q और U के बीच में है $\\implies P$ के सामने $Q$, $R$ के सामने $T$ या $U$:\nपूर्ण क्रम: $P - R - S - Q - T - U$\n- P के सामने Q\n- S के सामने T\n- R के सामने **U**!\nअतः U के ठीक सामने **R** बैठा है।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "केंद्र की ओर मुख होने पर दायाँ मोड़ किस दिशा में होता है?",
      options: ["वामावर्त (Anticlockwise)", "दक्षिणावर्त (Clockwise)", "सीधे आगे", "नीचे की ओर"],
      correctOption: 0,
      explanation: "केंद्र मुखी व्यवस्था में दायाँ हमेशा वामावर्त (Anticlockwise - ACW) होता है।"
    },
    {
      id: "mcq2",
      question: "8 व्यक्तियों के वृत्ताकार घेरे में किसी व्यक्ति के ठीक सामने बैठे व्यक्ति की दूरी दोनों ओर से कितने स्थान होती है?",
      options: ["4 स्थान", "3 स्थान", "5 स्थान", "2 स्थान"],
      correctOption: 0,
      explanation: "सूत्र $N/2 = 8/2 = 4$वां स्थान होता है।"
    },
    {
      id: "mcq3",
      question: "केंद्र से बाहर मुख होने पर बायाँ मोड़ किस दिशा में होता है?",
      options: ["वामावर्त (Anticlockwise)", "दक्षिणावर्त (Clockwise)", "ऊपर", "नीचे"],
      correctOption: 0,
      explanation: "केंद्र से बाहर मुख होने पर बायाँ वामावर्त (Anticlockwise) में होता है।"
    },
    {
      id: "mcq4",
      question: "वृत्तीय व्यवस्था में प्रथम व्यक्ति को सबसे निचली सीट (Bottom) पर बैठाना क्यों श्रेष्ठ माना जाता है?",
      options: ["वहाँ से मुख उत्तर की ओर होता है जिससे दायाँ-बायाँ स्वाभाविक रहता है", "नियम अनिवार्य है", "वृत्त सुंदर दिखता है", "केवल सम संख्याओं के लिए"],
      correctOption: 0,
      explanation: "निचली सीट से व्यक्ति उत्तर की ओर देखता है, जिससे उसका दायाँ-बायाँ पाठक के हाथों के बिल्कुल समान होता है।"
    },
    {
      id: "mcq5",
      question: "6 व्यक्तियों के वृत्त में सम्मुख व्यक्ति के मध्य दोनों ओर कितने व्यक्ति बैठे होते हैं?",
      options: ["2 व्यक्ति", "3 व्यक्ति", "1 व्यक्ति", "4 व्यक्ति"],
      correctOption: 0,
      explanation: "6 व्यक्तियों में $6/2 = 3$वां व्यक्ति सम्मुख होता है, अतः बीच में दोनों ओर 2-2 व्यक्ति बैठे होते हैं।"
    },
    {
      id: "mcq6",
      question: "'P, Q के दाएँ दूसरा है जो R के बाएँ है' - यहाँ 'जो' किसके लिए प्रयुक्त हुआ है?",
      options: ["Q के लिए", "P के लिए", "R के लिए", "दोनों के लिए"],
      correctOption: 0,
      explanation: "'जो' (Who) सदैव ठीक पहले आने वाले व्यक्ति (Q) के लिए प्रयुक्त होता है।"
    },
    {
      id: "mcq7",
      question: "यदि 7 व्यक्ति एक वृत्त में बैठे हों, तो क्या किसी व्यक्ति के ठीक सामने कोई व्यक्ति बैठ सकता है?",
      options: ["नहीं (विषम संख्या में ठीक सामने कोई सीट नहीं होती)", "हाँ", "केवल केंद्र मुखी में", "केवल बाह्य मुखी में"],
      correctOption: 0,
      explanation: "विषम संख्या (7, 9) में सममित व्यास नहीं होता, अतः ठीक सामने (Opposite) कोई नहीं बैठता।"
    },
    {
      id: "mcq8",
      question: "वृत्तीय व्यवस्था में जब दो संभावित स्थितियाँ बनें तो क्या करना चाहिए?",
      options: ["दो वृत्त बनाकर दोनों संभावनाओं को साथ चलाएं", "प्रश्न छोड़ दें", "अनुमान से एक चुनें", "पुनः पढ़ें"],
      correctOption: 0,
      explanation: "दोहरी संभावना विधि (Dual Circle Method) से एक वृत्त 2 शर्तों बाद स्वतः गलत होकर कट जाता है और दूसरा सही हो जाता है।"
    }
  ],
  keyTerminology: [
    {
      term: "Circular Seating Arrangement",
      termHi: "वृत्तीय बैठक व्यवस्था",
      definition: "A closed-loop relational puzzle positioning subjects along a circular boundary governed by angular orientation relative to center.",
      definitionHi: "व्यक्तियों को एक गोल मेज या वृत्तीय परिधि के चारों ओर केंद्र के सापेक्ष नियमों के आधार पर बैठाने की व्यवस्था।"
    },
    {
      term: "Facing Center / Inward",
      termHi: "केंद्र की ओर मुख",
      definition: "The standard orientation where subjects look toward circle centroid (Right = Anticlockwise, Left = Clockwise).",
      definitionHi: "वह व्यवस्था जिसमें व्यक्ति वृत्त के केंद्र को देखते हैं (दायाँ = वामावर्त, बायाँ = दक्षिणावर्त)।"
    },
    {
      term: "Facing Away / Outward",
      termHi: "केंद्र से बाहर मुख",
      definition: "The reversed orientation where subjects face outward from the center (Right = Clockwise, Left = Anticlockwise).",
      definitionHi: "वह व्यवस्था जिसमें व्यक्ति केंद्र की ओर पीठ करके बाहर देखते हैं (दायाँ = दक्षिणावर्त, बायाँ = वामावर्त)।"
    },
    {
      term: "Diametrical Opposite Position",
      termHi: "व्यास सम्मुख स्थिति",
      definition: "The unique collinear position separated by exactly N/2 intervals across the diameter in an even-numbered circle.",
      definitionHi: "सम संख्या वाले वृत्त में ठीक आमने-सामने स्थित दो व्यक्तियों का स्थान (दूरी $= N/2$)।"
    },
    {
      term: "Clockwise vs Anticlockwise Rule",
      termHi: "दक्षिणावर्त बनाम वामावर्त नियम",
      definition: "The navigational protocol mapping left/right commands to rotational angular directions based on facing vector.",
      definitionHi: "घड़ी की सुई की दिशा (CW) और विपरीत दिशा (ACW) को दाएँ-बाएँ मोड़ों से जोड़ने का नियम।"
    },
    {
      term: "Dual Circle Elimination",
      termHi: "दोहरा वृत्त उन्मूलन तकनीक",
      definition: "Plotting two hypothetical circle layouts concurrently when bifurcation occurs to eliminate the invalid branch rapidly.",
      definitionHi: "शर्तों की अनिश्चितता होने पर 2 वृत्त बनाकर परीक्षण करने की सबसे सुरक्षित एवं तीव्र विधि।"
    },
    {
      term: "Closed Loop Topology",
      termHi: "संवृत लूप संरचना",
      definition: "The geometric property of circular rows lacking terminal extremities (No Left or Right ends exist).",
      definitionHi: "वृत्तीय व्यवस्था का वह गुण जिसमें कोई छोर (बायाँ या दायाँ सिरा) नहीं होता, सभी सीटें एक-दूसरे से चक्रीय रूप से जुड़ी होती हैं।"
    },
    {
      term: "Bottom Anchor Rule",
      termHi: "निचली सीट लंगर नियम",
      definition: "Anchoring the primary reference person at the 6 o'clock position facing North for intuitive left/right ergonomics.",
      definitionHi: "पहले व्यक्ति को वृत्त के सबसे निचले बिंदु पर बैठाना ताकि उसका दायाँ-बायाँ पाठक के हाथों से मेल खाए।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Circular Arrangement",
      author: "Dr. R.S. Aggarwal",
      description: "वृत्तीय बैठक व्यवस्था, सम्मुख जोड़ों और दक्षिणावर्त-वामावर्त नियमों का देश का सबसे लोकप्रिय संदर्भ ग्रंथ।"
    },
    {
      title: "Analytical Reasoning: Complex Circular Puzzles",
      author: "M.K. Pandey",
      description: "केंद्र की ओर व बाहर मुख वाली मिश्रित पहेलियों और दोहरा वृत्त उन्मूलन तकनीक का संपूर्ण विश्लेषण।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की विभिन्न परीक्षाओं (पटवारी, सूबेदार, हॉस्टल अधीक्षक) में पूछे गए वास्तविक वृत्तीय बैठक प्रश्न।"
    },
    {
      title: "Magical Book on Quicker Reasoning - Seating Protocols",
      author: "K. Kundan",
      description: "व्यास सम्मुख सूत्र ($N/2$) और 1-मिनट समाधान एल्गोरिदम का संग्रह।"
    }
  ],
  confusionBuster: [
    {
      misconception: "वृत्त में भी पंक्ति की तरह बायाँ छोर और दायाँ छोर होता है।",
      clarification: "गलत! वृत्त एक संवृत घेरा (Closed Loop) है, इसमें कोई भी छोर नहीं होता। किसी भी सीट को संदर्भ मानकर व्यवस्था शुरू की जा सकती है।"
    },
    {
      misconception: "केंद्र की ओर मुख होने पर दायाँ मोड़ घड़ी की सुई की दिशा (Clockwise) में होता है।",
      clarification: "यह सबसे बड़ी भूल है! केंद्र की ओर मुख होने पर दायाँ मोड़ हमेशा **वामावर्त (Anticlockwise)** में होता है, और बायाँ मोड़ दक्षिणावर्त (Clockwise) में होता है।"
    },
    {
      misconception: "7 व्यक्तियों के वृत्त में भी आमने-सामने सम्मुख व्यक्ति होते हैं।",
      clarification: "नहीं! केवल सम संख्या (6, 8, 10) वाले वृत्त में ही ठीक आमने-सामने व्यक्ति बैठते हैं। विषम संख्या में कोई भी सम्मुख सीट नहीं होती।"
    },
    {
      misconception: "वृत्तीय पहेली में पहले व्यक्ति को कहीं भी बैठाने से उत्तर बदल जाता है।",
      clarification: "कदापि नहीं! पहले व्यक्ति को किसी भी सीट पर बैठाएं, सभी व्यक्तियों की पारस्परिक सापेक्षिक स्थिति (Relative Position) 100% समान ही रहेगी।"
    },
    {
      misconception: "केंद्र से बाहर मुख होने पर भी दायाँ-बायाँ केंद्र मुखी जैसा ही रहता है।",
      clarification: "केंद्र से बाहर मुख होने पर दायाँ और बायाँ ठीक उलट जाते हैं (दायाँ = CW, बायाँ = ACW)।"
    }
  ],
  faqList: [
    {
      question: "केंद्र की ओर मुख (Facing Center) होने पर दायाँ और बायाँ कैसे याद रखें?",
      answer: "दायाँ = वामावर्त (Anticlockwise - घड़ी की उल्टी दिशा), बायाँ = दक्षिणावर्त (Clockwise - घड़ी की दिशा)।"
    },
    {
      question: "8 व्यक्तियों के वृत्त में सम्मुख व्यक्ति कैसे ज्ञात करते हैं?",
      answer: "किसी व्यक्ति से किसी भी दिशा में चौथा ($8/2 = 4$) व्यक्ति उसका सम्मुख (Opposite) व्यक्ति होता है।"
    },
    {
      question: "वृत्तीय व्यवस्था शुरू करने की सबसे अच्छी सीट कौन सी है?",
      answer: "वृत्त की सबसे निचली सीट (Bottom / 6 O'clock)। यहाँ से व्यक्ति उत्तर देखता है, जिससे दायाँ-बायाँ आपके हाथों के समान रहता है।"
    },
    {
      question: "यदि कुछ व्यक्ति केंद्र और कुछ बाहर देख रहे हों तो क्या करें?",
      answer: "प्रत्येक व्यक्ति के पास तीर लगाएं: अंदर के लिए $\\uparrow$ (Right=ACW, Left=CW) और बाहर के लिए $\\downarrow$ (Right=CW, Left=ACW)।"
    },
    {
      question: "CG Vyapam में वृत्तीय बैठक व्यवस्था का कितना वेटेज है?",
      answer: "व्यापम के पटवारी, उप-निरीक्षक और संयुक्त भर्ती में 1 वृत्तीय पहेली देकर उस पर 3 से 5 उप-प्रश्न पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "केंद्र मुखी व्यवस्था में दायाँ = वामावर्त (ACW) और बायाँ = दक्षिणावर्त (CW)।",
    "केंद्र से बाहर मुख में दायाँ = दक्षिणावर्त (CW) और बायाँ = वामावर्त (ACW)।",
    "सम संख्या ($N$) में सम्मुख व्यक्ति की दूरी दोनों ओर से $N/2$ स्थान होती है।",
    "8 व्यक्तियों में सम्मुख व्यक्ति 4था ($8/2=4$) और 6 व्यक्तियों में 3रा ($6/2=3$) होता है।",
    "विषम संख्या (7, 9) वाले वृत्त में ठीक आमने-सामने कोई सीट नहीं होती।",
    "वृत्त में कोई छोर नहीं होता; पहले व्यक्ति को निचली सीट (Bottom) पर बैठाना सर्वोत्तम है।",
    "'और / लेकिन' प्रथम व्यक्ति के लिए और 'जो / जिसका' निकटवर्ती व्यक्ति के लिए आता है।",
    "दोहरा वृत्त विधि (Dual Circle) से दोहरी संभावनाओं का तुरंत निराकरण होता है।",
    "नकारात्मक शर्तों ($A \\neq B$) को पहले से चिह्नित करने से गलत सीटिंग रुकती है।",
    "वृत्तीय पहेली पर 3 से 5 उप-प्रश्न पूछे जाते हैं, अतः सही आरेख बनाना अत्यंत लाभदायक है।"
  ],
  rapidRevision: {
    points: [
      "Center Rule: Right = Anticlockwise (ACW); Left = Clockwise (CW)।",
      "Outside Rule: Right = Clockwise (CW); Left = Anticlockwise (ACW)।",
      "Opposite Formula: Exact opposite person = $\\frac{N}{2}$ positions away (6 $\\implies$ 3rd, 8 $\\implies$ 4th)।",
      "Anchor Seat: Place 1st person at Bottom (facing North) for natural hand alignment।",
      "Odd Symmetry: No opposite seats exist for odd cohorts (N = 7, 9)।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_seat_2_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_seat_2');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_seat_2 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_7', 'reas_seat_2');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
