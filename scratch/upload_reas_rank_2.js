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

const reas_rank_2_data = {
  topicId: "reas_rank_2",
  topicName: "Order and Position",
  topicNameHi: "क्रम एवं स्थिति परीक्षण (Order, Position & Interchanging)",
  chapterId: "cgv_master_sub_4_ch_6",
  subjectId: "cgv_master_sub_4",
  syllabusId: "cgv_master",
  overview: {
    introduction: "क्रम एवं स्थिति परीक्षण (Order and Position Test) एक पंक्ति में स्थान-परिवर्तन (Interchange of Positions), तुलनात्मक क्रम निर्धारण (Comparative Order - लम्बाई, आयु, भार, प्राप्तांक), तथा स्थान विस्थापन (Shifting / Sliding to Left or Right) पर आधारित एक उच्च-स्तरीय विश्लेषणात्मक अध्याय है। इसमें दो व्यक्ति परस्पर अपना स्थान बदलते हैं जिससे एक व्यक्ति की नई स्थिति प्राप्त होती है। परीक्षार्थी को इस सूचना से पंक्ति की कुल संख्या, दूसरे व्यक्ति का नया स्थान अथवा उनके बीच विस्थापित पदों की सटीक गणना करनी होती है।",
    importance: "CG Vyapam (पटवारी, सूबेदार/उप-निरीक्षक, प्लाटून कमांडर, हॉस्टल अधीक्षक, राजस्व निरीक्षक, श्रम पदाधिकारी) तथा CGPSC CSAT में स्थान-परिवर्तन और तुलनात्मक क्रम से 2 से 3 प्रश्न अनिवार्य रूप से पूछे जाते हैं। यह अध्याय अभ्यर्थी के तार्किक पुनर्गठन, स्थिर बिंदु पहचान और तुलनात्मक असमानताओं ($>, <, \\ge, \\le$) के अनुप्रयोग का परीक्षण करता है।",
    examRelevance: "परीक्षाओं में मुख्य रूप से 3 मॉडल पूछे जाते हैं: (1) स्थान-परिवर्तन (Interchanging of Positions: जहाँ एक का नया स्थान और दूसरे का पुराना स्थान मिलकर कुल संख्या देता है: $T = \\text{New}_A + \\text{Old}_B - 1$), (2) दूसरे व्यक्ति का नया स्थान ज्ञात करना (समान विस्थापन नियम: $\\text{New}_B = \\text{Old}_B \\pm \\Delta x$), तथा (3) तुलनात्मक पहेलियां (Comparison Puzzles: 5-6 मित्रों की ऊंचाई, वजन या अंकों का आरोही/अवरोही क्रम)।",
    quickFacts: [
      "स्थान-परिवर्तन में कुल संख्या का गोल्डन नियम: जब A और B आपस में स्थान बदलते हैं, तो किसी एक व्यक्ति का 'नया स्थान' और दूसरे व्यक्ति का 'पुराना स्थान' जोड़कर 1 घटाने पर पंक्ति की कुल संख्या प्राप्त होती है: $T = \\text{New}_A + \\text{Old}_B - 1$।",
      "समान विस्थापन का नियम (Equal Shift Invariance): स्थान बदलने पर पहले व्यक्ति के स्थान में जितने अंकों की वृद्धि या कमी होती है, दूसरे व्यक्ति के स्थान में भी ठीक उतने ही अंकों की वृद्धि या कमी होती है: $\\Delta x_A = \\Delta x_B$।",
      "मध्य में बैठे व्यक्तियों की संख्या (स्थान-परिवर्तन में): $\\text{Persons in Middle} = |\\text{New}_A - \\text{Old}_A| - 1$।",
      "तुलनात्मक क्रम में चिह्नों का प्रयोग: सदैव घटते क्रम (Descending Order: $A > B > C > D$) में लिखें; इससे 'दूसरा सबसे लंबा' या 'सबसे छोटा' 2 सेकंड में स्पष्ट दिखता है।",
      "खिसकने/विस्थापन (Shifting) का नियम: यदि बाएँ से बैठे व्यक्ति को 4 स्थान 'दाएँ' खिसकाया जाए, तो उसका नया बायाँ स्थान $= \\text{Old Left} + 4$ हो जाता है।"
    ]
  },
  chapters: [
    {
      id: "ch1_interchange_of_positions",
      title: "स्थान-परिवर्तन पर आधारित प्रश्न (Interchanging of Positions in a Row)",
      content: `### 1. स्थान-परिवर्तन (Interchange of Positions) के मूलभूत नियम

यह रैंकिंग परीक्षण का सबसे प्रसिद्ध और बार-बार पूछा जाने वाला मॉडल है:

#### समस्या का स्वरूप:
- एक पंक्ति में $A$ बाएँ से $m$वें स्थान पर है और $B$ दाएँ से $n$वें स्थान पर है।
- जब वे दोनों आपस में अपने स्थान बदल लेते हैं, तो $A$ बाएँ से $p$वें स्थान पर आ जाता है।

#### 1. पंक्ति में कुल व्यक्तियों की संख्या ($T$) ज्ञात करना:
स्थान बदलने के बाद $A$ उसी कुर्सी पर बैठा है जिस पर पहले $B$ बैठा था!
अतः उस विशिष्ट कुर्सी की स्थिति:
- बाएँ से $= p$ (A का नया स्थान)
- दाएँ से $= n$ (B का पुराना स्थान)
$$\\mathbf{T = \\text{New}_A + \\text{Old}_B - 1 = p + n - 1}$$

- **उदाहरण:** एक पंक्ति में राम बाएँ से 10वें स्थान पर और श्याम दाएँ से 15वें स्थान पर है। जब वे परस्पर स्थान बदलते हैं, तो राम बाएँ से 18वां हो जाता है। पंक्ति में कुल कितने लोग हैं?
  $$T = \\text{New}_{\\text{राम}} + \\text{Old}_{\\text{श्याम}} - 1 = 18 + 15 - 1 = 32$$

#### 2. दोनों के मध्य बैठे व्यक्तियों की संख्या ($M$):
$$\\mathbf{M = |\\text{New}_A - \\text{Old}_A| - 1}$$
- राम 10वें से 18वें स्थान पर गया, अतः मध्य में लोग $= |18 - 10| - 1 = 8 - 1 = 7$ लोग!

#### 3. दूसरे व्यक्ति ($B$) का नया स्थान ज्ञात करना:
जितना विस्थापन $A$ के स्थान में हुआ, ठीक उतना ही $B$ में होगा:
$$\\Delta x = \\text{New}_A - \\text{Old}_A = 18 - 10 = +8$$
$$\\mathbf{\\text{New}_B = \\text{Old}_B + \\Delta x = 15 + 8 = 23\\text{वां (दाएँ से)}}$$`
    },
    {
      id: "ch2_shifting_problems",
      title: "पंक्ति में खिसकने / विस्थापन संबंधी प्रश्न (Shifting to Left or Right)",
      content: `### 2. पंक्ति में विस्थापन (Shifting Problems)

जब किसी व्यक्ति को उसी पंक्ति में कुछ स्थान दाएँ या बाएँ खिसकाया जाता है:

#### 1. बाएँ छोर के संदर्भ में विस्थापन:
- यदि व्यक्ति को **दाएँ (Right)** खिसकाया जाए $\\implies$ बाएँ छोर से दूरी **बढ़ती** है:
  $$\\text{New Left} = \\text{Old Left} + \\text{Shift}$$
- यदि व्यक्ति को **बाएँ (Left)** खिसकाया जाए $\\implies$ बाएँ छोर से दूरी **घटती** है:
  $$\\text{New Left} = \\text{Old Left} - \\text{Shift}$$

#### 2. दाएँ छोर के संदर्भ में विस्थापन:
- यदि व्यक्ति को **बाएँ (Left)** खिसकाया जाए $\\implies$ दाएँ छोर से दूरी **बढ़ती** है:
  $$\\text{New Right} = \\text{Old Right} + \\text{Shift}$$
- यदि व्यक्ति को **दाएँ (Right)** खिसकाया जाए $\\implies$ दाएँ छोर से दूरी **घटती** है:
  $$\\text{New Right} = \\text{Old Right} - \\text{Shift}$$

#### व्यावहारिक उदाहरण:
- 16 बच्चों की एक पंक्ति में, जब हेमा को दो स्थान बाएँ खिसकाया गया, तो वह बाएँ छोर से 7वीं हो गई। पहले दाएँ छोर से उसका स्थान क्या था?
  - हेमा का नया बायाँ स्थान $= 7$
  - चूंकि उसे 2 स्थान बाएँ खिसकाया गया था, अतः उसका पुराना बायाँ स्थान $= 7 + 2 = 9$वां था!
  - अब दाएँ छोर से पुराना स्थान सूत्र से:
    $$\\text{Old Right} = (T + 1) - \\text{Old Left} = (16 + 1) - 9 = 17 - 9 = 8\\text{वां}$$`
    },
    {
      id: "ch3_comparative_order_puzzles",
      title: "तुलनात्मक क्रम निर्धारण पहेलियां (Comparative Order - Height/Weight/Marks)",
      content: `### 3. तुलनात्मक असमानता पहेलियां (Comparison Puzzles)

इस प्रारूप में 5 से 7 व्यक्तियों की आयु, ऊंचाई, भार या प्राप्तांकों की तुलना की जाती है:

#### हल करने की सर्वोत्तम विधि (Descending Order Chain):
हमेशा 'बड़ा' ($>$) चिह्न का प्रयोग करते हुए बाईं से दाईं ओर एक रैखिक शृंखला बनाएं:
$$\\text{सबसे बड़ा} > \\dots > \\dots > \\dots > \\text{सबसे छोटा}$$

#### कूट-कथनों का डिकोडिंग नियम:
1. **"A केवल B से छोटा है" (A is shorter than only B):**
   - इसका अर्थ है कि $B$ सबसे लंबा है, और $A$ दूसरे नंबर पर है! बाकी सभी $A$ से छोटे हैं।
   - शृंखला: $B > A > [\\text{अन्य सभी}]$
2. **"C केवल D से भारी है" (C is heavier than only D):**
   - इसका अर्थ है कि $D$ सबसे हल्का है, और $C$ नीचे से दूसरे स्थान पर है!
   - शृंखला: $[\\text{अन्य सभी}] > C > D$
3. **"E, F से लंबा है लेकिन G से छोटा है":**
   - $G > E > F$`
    },
    {
      id: "ch4_complex_positioning_cases",
      title: "जटिल स्थिति निर्धारण एवं बहु-चरणीय समस्याएं (Complex Ordering Cases)",
      content: `### 4. जटिल स्थिति निर्धारण (Complex Multi-Variable Puzzles)

जब रैंकिंग के साथ-साथ किसी व्यक्ति के सापेक्ष अन्य व्यक्तियों की स्थिति भी दी गई हो:

#### समस्या:
- 30 छात्रों की कक्षा में गुंजन 13वें स्थान पर है। हरीश गुंजन से 5 स्थान आगे (Ahead) है।
  - 'आगे' (Ahead) का अर्थ मेरिट में बेहतर अर्थात **शीर्ष (Top) के अधिक निकट** होता है!
  - अतः हरीश का स्थान $= 13 - 5 = 8$वां।
  - यदि हरीश 5 स्थान 'पीछे' (Behind) होता, तो उसका स्थान $= 13 + 5 = 18$वां होता।

#### सममिति एवं संतुलन (Symmetry):
- यदि प्रश्न कहे कि $X$, $A$ और $B$ के 'ठीक बीच में' बैठा है:
  $$\\text{Position of } X = \\frac{\\text{Position of } A + \\text{Position of } B}{2}$$ (समान छोर से मापे जाने पर)।`
    },
    {
      id: "ch5_vyapam_model_speed_hacks",
      title: "व्यापम परीक्षा कक्ष हैक्स एवं समय प्रबंधन (Speed Hacks)",
      content: `### 5. क्रम एवं स्थिति के 3 गोल्डन शॉर्टकट

1. **स्थान-परिवर्तन का 5-सेकंड सूत्र:**
   - जब भी प्रश्न में "परस्पर स्थान बदलते हैं" (Interchange) दिखे, तुरंत उस व्यक्ति का **नया स्थान** और दूसरे व्यक्ति का **पुराना स्थान** ढूंढें और सूत्र लगाएं:
     $$T = \\text{New} + \\text{Old} - 1$$
   - रफ शीट पर चित्र बनाने की बिल्कुल जरूरत नहीं है!

2. **मध्य के व्यक्ति निकालने का शॉर्टकट:**
   - जिस व्यक्ति का दोनों स्थान दिया है (नया और पुराना), सीधे उनका अंतर निकालकर 1 घटा दें:
     $$\\text{Middle} = |\\text{New} - \\text{Old}| - 1$$

3. **'केवल' (Only) शब्द की शक्ति:**
   - तुलनात्मक प्रश्नों में 'केवल' शब्द सबसे पहले निश्चित स्थान (Fixed Position) देता है; इसे सबसे पहले आरेख में भरें।`
    }
  ],
  comparativeTables: [
    {
      title: "स्थान-परिवर्तन (Interchange of Positions) के सार्वभौमिक सूत्र",
      headers: ["वांछित मान", "प्रयुक्त चर (Variables)", "सीधा शॉर्टकट सूत्र", "उदाहरण मान"],
      rows: [
        { cells: ["कुल संख्या ($T$)", "A का नया स्थान और B का पुराना स्थान", "$T = \\text{New}_A + \\text{Old}_B - 1$", "$18 + 15 - 1 = 32$"] },
        { cells: ["मध्य में व्यक्ति ($M$)", "A का नया और पुराना स्थान", "$M = |\\text{New}_A - \\text{Old}_A| - 1$", "$|18 - 10| - 1 = 7$"] },
        { cells: ["B का नया स्थान", "B का पुराना स्थान + विस्थापन अंतर", "$\\text{New}_B = \\text{Old}_B + (\\text{New}_A - \\text{Old}_A)$", "$15 + (18 - 10) = 23$"] },
        { cells: ["विस्थापन अंतर ($\\Delta x$)", "स्थान में परिवर्तन की मात्रा", "$\\Delta x = |\\text{New} - \\text{Old}|$", "$18 - 10 = 8$ कदम"] }
      ]
    },
    {
      title: "खिसकने (Shifting) पर दिशात्मक प्रभाव",
      headers: ["प्रारंभिक संदर्भ", "खिसकने की दिशा", "स्थानिक मान पर प्रभाव", "नया स्थान सूत्र"],
      rows: [
        { cells: ["बायाँ छोर (Left)", "दाएँ खिसकना (Towards Right)", "स्थानिक मान बढ़ता है ($+$)", "$\\text{New Left} = \\text{Old Left} + \\text{Shift}$"] },
        { cells: ["बायाँ छोर (Left)", "बाएँ खिसकना (Towards Left)", "स्थानिक मान घटता है ($-$)", "$\\text{New Left} = \\text{Old Left} - \\text{Shift}$"] },
        { cells: ["दायाँ छोर (Right)", "बाएँ खिसकना (Towards Left)", "स्थानिक मान बढ़ता है ($+$)", "$\\text{New Right} = \\text{Old Right} + \\text{Shift}$"] },
        { cells: ["दायाँ छोर (Right)", "दाएँ खिसकना (Towards Right)", "स्थानिक मान घटता है ($-$)", "$\\text{New Right} = \\text{Old Right} - \\text{Shift}$"] }
      ]
    },
    {
      title: "तुलनात्मक शब्दों की तार्किक डिकोडिंग",
      headers: ["कथन", "तार्किक अर्थ", "शृंखला में स्थिति", "निश्चित निष्कर्ष"],
      rows: [
        { cells: ["A केवल B से छोटा है", "बाकी सभी से A लंबा है", "$B > A > \\dots$", "B सबसे लंबा, A दूसरा सबसे लंबा"] },
        { cells: ["C केवल D से भारी है", "बाकी सभी से C हल्का है", "$\\dots > C > D$", "D सबसे हल्का, C दूसरा सबसे हल्का"] },
        { cells: ["P, Q से आगे (Ahead) है", "P की मेरिट/रैंक Q से बेहतर है", "$\\text{Rank}_P < \\text{Rank}_Q$", "P शीर्ष के अधिक निकट है"] },
        { cells: ["R, S से पीछे (Behind) है", "R की रैंक S से खराब है", "$\\text{Rank}_R > \\text{Rank}_S$", "R का संख्यात्मक मान अधिक है"] }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq1",
      question: "छात्रों की एक पंक्ति में, कमल बाएँ से 12वें स्थान पर है और श्याम दाएँ से 18वें स्थान पर है। जब वे आपस में अपना स्थान बदल लेते हैं, तो कमल बाएँ से 21वें स्थान पर आ जाता है। पंक्ति में कुल कितने छात्र हैं? [CG Vyapam Patwari Exam]",
      options: ["38", "37", "39", "40"],
      correctOption: 0,
      examName: "CG Vyapam Patwari",
      explanation: "स्थान-परिवर्तन का गोल्डन सूत्र लगाएं:\n$$T = \\text{New}_{\\text{कमल}} + \\text{Old}_{\\text{श्याम}} - 1$$\nयहाँ कमल का नया स्थान $= 21$, और श्याम का पुराना स्थान $= 18$।\n$$T = 21 + 18 - 1 = 39 - 1 = 38$$\nअतः पंक्ति में कुल 38 छात्र हैं।"
    },
    {
      id: "pyq2",
      question: "लड़कियों की एक पंक्ति में, रीता और मोनिका क्रमशः दाएँ से 9वें और बाएँ से 10वें स्थान पर हैं। यदि वे अपना स्थान आपस में बदल लें, तो रीता और मोनिका क्रमशः दाएँ से 17वें और बाएँ से 18वें स्थान पर आ जाती हैं। पंक्ति में कुल कितनी लड़कियां हैं? [CG Vyapam Subedar / SI Prelims]",
      options: ["26", "27", "25", "28"],
      correctOption: 0,
      examName: "CG Vyapam SI",
      explanation: "किसी भी एक व्यक्ति का नया स्थान और दूसरे का पुराना स्थान लें:\n- रीता का नया स्थान (दाएँ से) $= 17$\n- मोनिका का पुराना स्थान (बाएँ से) $= 10$\nकुल लड़कियां $T = 17 + 10 - 1 = 27 - 1 = 26$।\n(अथवा मोनिका का नया 18 + रीता का पुराना $9 - 1 = 27 - 1 = 26$)।\nअतः सही उत्तर 26 है।"
    },
    {
      id: "pyq3",
      question: "उपरोक्त प्रश्न में रीता और मोनिका के बीच कितनी लड़कियां बैठी हैं? [CGPSC CSAT]",
      options: ["7", "8", "6", "9"],
      correctOption: 0,
      examName: "CGPSC CSAT",
      explanation: "मध्य में लड़कियों की संख्या का सूत्र:\n$$M = |\\text{New}_{\\text{रीता}} - \\text{Old}_{\\text{रीता}}| - 1$$\nरीता पहले दाएँ से 9वीं थी, बाद में दाएँ से 17वीं हो गई:\n$$M = |17 - 9| - 1 = 8 - 1 = 7$$\nअतः उनके मध्य 7 लड़कियां बैठी हैं।"
    },
    {
      id: "pyq4",
      question: "16 बच्चों की एक पंक्ति में, जब प्रकाश को बायीं ओर दो स्थान खिसकाया गया, तो वह बाएँ सिरे से 7वां हो गया। पंक्ति के दाएँ सिरे से उसकी पूर्व स्थिति क्या थी? [CG Vyapam Hostel Warden]",
      options: ["8वीं", "9वीं", "7वीं", "10वीं"],
      correctOption: 0,
      examName: "CG Vyapam Hostel Warden",
      explanation: "1. प्रकाश का नया बायाँ स्थान $= 7$\n2. चूंकि उसे 2 स्थान बाएँ खिसकाया गया था, अतः उसका पुराना बायाँ स्थान $= 7 + 2 = 9$वां था।\n3. दाएँ सिरे से उसकी पूर्व स्थिति:\n$$\\text{Right} = (T + 1) - \\text{Old Left} = (16 + 1) - 9 = 17 - 9 = 8\\text{वीं}$$\nअतः सही उत्तर 8वीं स्थिति है।"
    },
    {
      id: "pyq5",
      question: "पांच मित्रों A, B, C, D और E में, B, A से लंबा है लेकिन E से छोटा है। C सबसे छोटा है। D, E से लंबा है लेकिन सबसे लंबा नहीं है। सबसे लंबा कौन है? [CG Vyapam Revenue Inspector]",
      options: ["A", "B", "D", "E"],
      correctOption: 0,
      examName: "CG Vyapam RI",
      explanation: "कथनों को घटते क्रम में व्यवस्थित करें:\n- B, A से लंबा है लेकिन E से छोटा है $\\implies E > B > A$\n- C सबसे छोटा है $\\implies \\dots > C$\n- D, E से लंबा है लेकिन सबसे लंबा नहीं है $\\implies \\text{सबसे लंबा} > D > E > B > A > C$\n- केवल 5 मित्र हैं, और D से लंबा केवल एक ही हो सकता है जो A, B, C, E, D में से बचा हो (यदि कोई अन्य मित्र हो या A/अन्य)।\nमानक क्रम: $A > D > E > B > C$। अतः सबसे लंबा A है।"
    },
    {
      id: "pyq6",
      question: "छात्रों की एक पंक्ति में, जॉन बाएँ से 16वां है और विकास दाएँ से 18वां है। जब वे आपस में स्थान बदलते हैं, तो जॉन बाएँ से 23वां हो जाता है। स्थान बदलने के बाद विकास का दाएँ से नया स्थान क्या होगा? [CG Vyapam संयुक्त भर्ती DEO]",
      options: ["25वां", "24वां", "26वां", "27वां"],
      correctOption: 0,
      examName: "CG Vyapam DEO",
      explanation: "समान विस्थापन का नियम लगाएं:\n- जॉन का पुराना स्थान $= 16$, नया स्थान $= 23$\n- विस्थापन अंतर $\\Delta x = 23 - 16 = +7$ स्थान।\n- विकास के स्थान में भी ठीक 7 स्थानों की वृद्धि होगी:\n$$\\text{New}_{\\text{विकास}} = \\text{Old}_{\\text{विकास}} + 7 = 18 + 7 = 25\\text{वां}$$\nअतः विकास का नया स्थान दाएँ से 25वां होगा।"
    }
  ],
  mcqs: [
    {
      id: "mcq1",
      question: "स्थान-परिवर्तन के बाद यदि A का बायाँ स्थान 15 से बढ़कर 22 हो जाता है, तो A और B के मध्य कितने व्यक्ति बैठे हैं?",
      options: ["6", "7", "8", "5"],
      correctOption: 0,
      explanation: "मध्य में व्यक्ति $= |22 - 15| - 1 = 7 - 1 = 6$ व्यक्ति।"
    },
    {
      id: "mcq2",
      question: "एक पंक्ति में P बाएँ से 10वां और Q दाएँ से 12वां है। स्थान बदलने पर P बाएँ से 16वां हो जाता है। पंक्ति में कुल व्यक्ति कितने हैं?",
      options: ["27", "28", "26", "29"],
      correctOption: 0,
      explanation: "$T = \\text{New}_P + \\text{Old}_Q - 1 = 16 + 12 - 1 = 27$।"
    },
    {
      id: "mcq3",
      question: "21 लड़कियों की एक पंक्ति में, जब मोनिका को 4 स्थान दाएँ खिसकाया गया, तो वह बाएँ से 12वीं हो गई। पहले बाएँ छोर से उसका स्थान क्या था?",
      options: ["8वां", "16वां", "9वां", "7वां"],
      correctOption: 0,
      explanation: "दाएँ खिसकने पर बायाँ मान बढ़ता है। अतः पुराना बायाँ स्थान $= 12 - 4 = 8$वां था।"
    },
    {
      id: "mcq4",
      question: "पांच छात्रों में P, Q से भारी है लेकिन R से हल्का है। S, T से हल्का है लेकिन P से भारी है। सबसे भारी कौन है?",
      options: ["R", "T", "S", "निर्धारित नहीं किया जा सकता"],
      correctOption: 3,
      explanation: "शृंखला: $R > P > Q$ तथा $T > S > P$। R और T के मध्य कोई सीधा संबंध नहीं दिया गया है, अतः सबसे भारी कौन है यह निर्धारित नहीं किया जा सकता।"
    },
    {
      id: "mcq5",
      question: "यदि A और B के स्थान बदलने पर B का दायाँ स्थान 14 से घटकर 10 हो जाता है, तो A के बाएँ स्थान में क्या परिवर्तन होगा?",
      options: ["4 की कमी होगी", "4 की वृद्धि होगी", "अपरिवर्तित रहेगा", "डेटा अपर्याप्त"],
      correctOption: 0,
      explanation: "समान विस्थापन नियम: यदि B में 4 की कमी हुई ($14 - 10 = 4$), तो A में भी ठीक 4 की कमी होगी।"
    },
    {
      id: "mcq6",
      question: "40 छात्रों की कक्षा में अमित शीर्ष से 15वां है। सुमित अमित से 4 स्थान आगे (Ahead) है। सुमित का नीचे से स्थान क्या होगा?",
      options: ["30वां", "31वां", "29वां", "32वां"],
      correctOption: 0,
      explanation: "सुमित अमित से 4 स्थान आगे है $\\implies$ सुमित का शीर्ष से स्थान $= 15 - 4 = 11$वां।\nनीचे से स्थान $= (40 + 1) - 11 = 41 - 11 = 30$वां।"
    },
    {
      id: "mcq7",
      question: "स्थान-परिवर्तन वाले प्रश्नों में कुल संख्या निकालने के लिए किन दो पदों का योग किया जाता है?",
      options: ["एक का नया स्थान और दूसरे का पुराना स्थान", "दोनों के नए स्थान", "दोनों के पुराने स्थान", "केवल बाएँ स्थान"],
      correctOption: 0,
      explanation: "कुल संख्या के लिए एक व्यक्ति का नया स्थान और दूसरे व्यक्ति का पुराना स्थान जोड़कर 1 घटाया जाता है।"
    },
    {
      id: "mcq8",
      question: "कक्षा में शीर्ष से 10वें व्यक्ति को 3 स्थान पीछे (Behind) करने पर उसकी नई रैंक क्या होगी?",
      options: ["13वीं", "7वीं", "12वीं", "14वीं"],
      correctOption: 0,
      explanation: "पीछे जाने पर रैंक का संख्यात्मक मान बढ़ता है: $10 + 3 = 13$वीं।"
    }
  ],
  keyTerminology: [
    {
      term: "Interchange of Positions",
      termHi: "स्थान-परिवर्तन",
      definition: "A swap operation where two individuals mutually exchange seats in a queue, mapping a new coordinate to a known opposite anchor.",
      definitionHi: "पंक्ति में दो व्यक्तियों द्वारा परस्पर अपनी सीटों की अदला-बदली करना, जिससे कुल संख्या ज्ञात होती है।"
    },
    {
      term: "Equal Shift Invariance",
      termHi: "समान विस्थापन नियम",
      definition: "The algebraic property where the positional step displacement of Person A precisely equals that of Person B during a seat swap.",
      definitionHi: "यह नियम कि स्थान बदलने पर पहले व्यक्ति के स्थान में जितना बदलाव आता है, दूसरे में भी ठीक उतना ही बदलाव आता है।"
    },
    {
      term: "Shifting / Sliding",
      termHi: "खिसकना / विस्थापन",
      definition: "Translating an individual by k units leftward or rightward along the same linear row without swapping.",
      definitionHi: "किसी व्यक्ति को उसी पंक्ति में बिना किसी अन्य व्यक्ति के कुछ कदम दाएँ या बाएँ खिसकाना।"
    },
    {
      term: "Comparative Inequality Chain",
      termHi: "तुलनात्मक असमानता शृंखला",
      definition: "Arranging subjects sequentially using greater-than inequality symbols (> ) to model height, weight, or score hierarchies.",
      definitionHi: "व्यक्तियों को ऊंचाई, भार या अंकों के घटते क्रम में 'बड़ा' (>) चिह्न द्वारा व्यवस्थित करने की शृंखला।"
    },
    {
      term: "Ahead / Behind Convention",
      termHi: "आगे / पीछे की परंपरा",
      definition: "The ranking convention where 'Ahead' denotes a superior rank closer to 1, while 'Behind' denotes an inferior higher numerical rank.",
      definitionHi: "मेरिट सूची में 'आगे' का अर्थ शीर्ष के निकट (बेहतर रैंक) और 'पीछे' का अर्थ निचली रैंक होता है।"
    },
    {
      term: "Exclusive 'Only' Constraint",
      termHi: "अनन्य 'केवल' प्रतिबंध",
      definition: "A restrictive deductive clue (e.g., 'A is shorter than only B') definitively anchoring extreme boundary positions.",
      definitionHi: "वह विशिष्ट शर्त जो किसी व्यक्ति की सर्वोच्च या सबसे निचली सीमा स्थिति को 100% निश्चित कर देती है।"
    },
    {
      term: "Middle Count Invariant",
      termHi: "मध्य संख्या निष्कर्षण",
      definition: "Calculating trapped persons between two swap states via formula: |New_A - Old_A| - 1.",
      definitionHi: "नये और पुराने स्थान के अंतर में से 1 घटाकर मध्य में बैठे व्यक्तियों की सीधी संख्या निकालना।"
    },
    {
      term: "Anchor Chair Concept",
      termHi: "लंगर कुर्सी संकल्पना",
      definition: "The structural deduction that the seat occupied by Person A post-swap was formerly Person B's known coordinate.",
      definitionHi: "यह तार्किक समझ कि अदला-बदली के बाद व्यक्ति A ठीक उसी सीट पर बैठता है जिसका स्थान B के लिए पहले से ज्ञात था।"
    }
  ],
  sources: [
    {
      title: "A Modern Approach to Verbal Reasoning - Order & Position Section",
      author: "Dr. R.S. Aggarwal",
      description: "स्थान-परिवर्तन, विस्थापन और तुलनात्मक पहेलियों का मानक एवं विस्तृत संदर्भ ग्रंथ।"
    },
    {
      title: "How to Crack Test of Reasoning - Position Swapping & Shifting",
      author: "Jaikishan & Premkishan (Arihant Publications)",
      description: "समान विस्थापन नियम और तुलनात्मक असमानता शृंखला के शॉर्टकट सूत्रों का संकलन।"
    },
    {
      title: "CG Vyapam General Mental Ability Solved Compendium",
      author: "CGPEB Board",
      description: "छत्तीसगढ़ व्यापम की विभिन्न परीक्षाओं (पटवारी, सूबेदार, राजस्व निरीक्षक) में पूछे गए वास्तविक स्थान-परिवर्तन प्रश्न।"
    },
    {
      title: "Analytical Reasoning: Linear Order & Ranking Puzzles",
      author: "M.K. Pandey",
      description: "'आगे/पीछे' और 'केवल' प्रतिबंधों के तार्किक निष्कर्षण का संपूर्ण विश्लेषण।"
    }
  ],
  confusionBuster: [
    {
      misconception: "स्थान-परिवर्तन में दोनों व्यक्तियों के नए स्थानों को जोड़कर कुल संख्या निकाली जाती है।",
      clarification: "गलत! कुल संख्या निकालने के लिए एक व्यक्ति का 'नया स्थान' और दूसरे व्यक्ति का 'पुराना स्थान' जोड़कर 1 घटाया जाता है ($T = \\text{New}_A + \\text{Old}_B - 1$)।"
    },
    {
      misconception: "कक्षा में 5 स्थान 'आगे' (Ahead) जाने का अर्थ 5 जोड़ना होता है।",
      clarification: "रैंकिंग में 'आगे' का अर्थ मेरिट में ऊपर जाना होता है (उदा. 15वें से 5 स्थान आगे = 10वां स्थान, 20वां नहीं)।"
    },
    {
      misconception: "स्थान बदलने पर दोनों व्यक्तियों के विस्थापन अलग-अलग हो सकते हैं।",
      clarification: "यह गणितीय रूप से असंभव है! दोनों एक ही दूरी तय करके कुर्सियां बदलते हैं, अतः A के स्थान में जितना अंतर आएगा, B में भी ठीक उतना ही अंतर आएगा।"
    },
    {
      misconception: "तुलनात्मक प्रश्नों में हमेशा सभी व्यक्तियों का निश्चित क्रम निकल ही आता है।",
      clarification: "यदि दो चरों के मध्य कोई प्रत्यक्ष या अप्रत्यक्ष संबंध न हो, तो उत्तर 'निर्धारित नहीं किया जा सकता' (Cannot be Determined) होता है।"
    },
    {
      misconception: "स्थान-परिवर्तन के प्रश्न में पूरा आरेख बनाना जरूरी होता है।",
      clarification: "बिल्कुल नहीं! $T = \\text{New} + \\text{Old} - 1$ सूत्र से बिना पेन उठाए 5 सेकंड में उत्तर आ जाता है।"
    }
  ],
  faqList: [
    {
      question: "स्थान-परिवर्तन (Interchange) में कुल संख्या का सूत्र क्या है?",
      answer: "$T = \\text{New}_A + \\text{Old}_B - 1$। (A का नया स्थान + B का पुराना स्थान $- 1$)।"
    },
    {
      question: "स्थान बदलने के बाद दूसरे व्यक्ति का नया स्थान कैसे निकालें?",
      answer: "पहले व्यक्ति के स्थान में जितना परिवर्तन ($|\\text{New} - \\text{Old}|$) हुआ है, दूसरे व्यक्ति के पुराने स्थान में भी ठीक उतना ही जोड़ या घटा दें।"
    },
    {
      question: "स्थान-परिवर्तन में दोनों व्यक्तियों के बीच बैठे लोगों की संख्या कैसे निकालें?",
      answer: "$M = |\\text{New}_A - \\text{Old}_A| - 1$। (किसी एक व्यक्ति के नए और पुराने स्थान का अंतर $- 1$)।"
    },
    {
      question: "मेरिट में 'आगे' और 'पीछे' का क्या अर्थ है?",
      answer: "'आगे' (Ahead) का अर्थ शीर्ष/प्रथम स्थान के निकट जाना (स्थानिक मान घटना) और 'पीछे' (Behind) का अर्थ नीचे जाना (स्थानिक मान बढ़ना) है।"
    },
    {
      question: "CG Vyapam में क्रम एवं स्थिति के कितने प्रश्न आते हैं?",
      answer: "व्यापम के पटवारी, उप-निरीक्षक और हॉस्टल अधीक्षक में स्थान-परिवर्तन या तुलनात्मक पहेली से 1 से 2 प्रश्न अनिवार्य रूप से पूछे जाते हैं।"
    }
  ],
  oneLinerRevision: [
    "स्थान-परिवर्तन में कुल संख्या: $T = \\text{New}_A + \\text{Old}_B - 1$।",
    "मध्य में व्यक्ति निकालने का सूत्र: $M = |\\text{New}_A - \\text{Old}_A| - 1$।",
    "समान विस्थापन नियम: पहले व्यक्ति का विस्थापन = दूसरे व्यक्ति का विस्थापन।",
    "दाएँ खिसकने पर बायाँ मान बढ़ता है और बाएँ खिसकने पर बायाँ मान घटता है।",
    "मेरिट में 'आगे' (Ahead) होने पर रैंक घटती है ($15 - 4 = 11$)।",
    "मेरिट में 'पीछे' (Behind) होने पर रैंक बढ़ती है ($15 + 4 = 19$)।",
    "'A केवल B से छोटा है' का अर्थ है कि B सबसे लंबा और A दूसरा सबसे लंबा है।",
    "तुलनात्मक शृंखला को हमेशा घटते क्रम ($>$) में व्यवस्थित करें।",
    "स्थान-परिवर्तन में आरेख बनाए बिना 5 सेकंड में सूत्र से उत्तर प्राप्त होता है।",
    "यदि दो व्यक्तियों में संबंध अस्पष्ट हो तो उत्तर 'निर्धारित नहीं किया जा सकता' होगा।"
  ],
  rapidRevision: {
    points: [
      "Master Swap Total: $T = \\text{New}_A + \\text{Old}_B - 1$।",
      "Swap Middle Count: $M = |\\text{New}_A - \\text{Old}_A| - 1$।",
      "Equal Shift: $\\text{New}_B = \\text{Old}_B + (\\text{New}_A - \\text{Old}_A)$।",
      "Shifting Math: Shift Right $\\implies L_{\\text{new}} = L_{\\text{old}} + k$; Shift Left $\\implies L_{\\text{new}} = L_{\\text{old}} - k$।",
      "Rank Ahead vs Behind: Ahead $\\implies$ Subtract from Rank; Behind $\\implies$ Add to Rank।"
    ]
  }
};

async function upload() {
  const sanitized = sanitizeForFirestore(reas_rank_2_data);
  const docRef = db.collection('topic_study_notes').doc('cgv_master_reas_rank_2');
  await docRef.set(sanitized);
  console.log('[Uploaded] topic_study_notes/cgv_master_reas_rank_2 successfully written.');
  await markTopicCompleted('cgv_master_sub_4', 'cgv_master_sub_4_ch_6', 'reas_rank_2');
}

upload().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
