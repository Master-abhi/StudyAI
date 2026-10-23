const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

function sanitizeForFirestore(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (Array.isArray(item)) {
        return { cells: item.map(sanitizeForFirestore) };
      }
      return sanitizeForFirestore(item);
    });
  }
  if (obj && typeof obj === 'object') {
    const res = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'rows' && Array.isArray(v)) {
        res[k] = v.map(row => {
          if (Array.isArray(row)) return { cells: row.map(sanitizeForFirestore) };
          if (row && typeof row === 'object' && Array.isArray(row.cells)) {
            return { ...row, cells: row.cells.map(sanitizeForFirestore) };
          }
          return row;
        });
      } else {
        res[k] = sanitizeForFirestore(v);
      }
    }
    return res;
  }
  return obj;
}

const topicNotesData = {
  examId: 'cgv_master',
  topicId: 'math_geo_1',
  updatedAt: new Date().toISOString(),
  studyNotes: {
    id: "cgv_master_math_geo_1",
    topicId: "math_geo_1",
    syllabusId: "cgv_master",
    subjectId: "cgv_master_sub_3",
    chapterId: "cgv_master_sub_3_ch_7",
    title: "रेखाएँ एवं कोण (Lines and Angles)",
    subtitle: "बिंदु, रेखा, किरण, कोणों के प्रकार, पूरक-संपूरक, समांतर रेखाएँ एवं तिर्यक रेखा के प्रमेय",
    readTime: "24 min",
    difficultyLevel: "Basic to Intermediate",
    tags: ["Mathematics", "Geometry", "Lines and Angles", "Parallel Lines", "Transversal", "CG Vyapam"],

    overview: {
      introduction: "रेखाएँ एवं कोण (Lines and Angles) ज्यामिति (Geometry) का मूल आधार हैं। ज्यामिति के समस्त उन्नत सिद्धांत (त्रिभुज, चतुर्भुज, वृत्त व बहुभुज) इन्हीं प्राथमिक अवयवों पर निर्मित हैं। जब दो किरणें एक ही उभयनिष्ठ प्रारंभिक बिंदु (शीर्ष) से निकलती हैं, तो उनके बीच के कोणीय फैलाव को कोण (Angle) कहते हैं। जब दो परस्पर समांतर रेखाओं को एक तिर्यक रेखा (Transversal Line) प्रतिच्छेद करती है, तो आठ विशिष्ट कोण बनते हैं, जिनमें संगत कोण, एकांतर अंतःकोण एवं क्रमागत अंतःकोणों के संबंध ज्यामितीय प्रश्नों को हल करने की कुंजी हैं।",
      importance: "छत्तीसगढ़ व्यापम की विभिन्न परीक्षाओं (पटवारी, आर.आई., हॉस्टल वार्डन, सब-इंजीनियर, सहायक शिक्षक विज्ञान) में रेखाओं व कोणों से न्यूनतम 2 प्रश्न निश्चित रूप से पूछे जाते हैं। विशेष रूप से पूरक-संपूरक कोणों के बीजीय संबंध तथा समांतर रेखाओं के बीच अज्ञात कोण $x$ ज्ञात करने वाले आरेख आधारित प्रश्न परीक्षा में अत्यंत लोकप्रिय हैं।",
      examRelevance: "CG Vyapam (पटवारी, RI, हॉस्टल वार्डन), CGPSC (राज्य सेवा प्रारंभिक CSAT, सीएमओ) तथा SSC CGL/CHSL में प्रारंभिक ज्यामिति का यह सर्वाधिक अंकदायी खंड है।",
      quickFacts: [
        "पूरक कोण (Complementary Angles): जिन दो कोणों का योग $90^\\circ$ हो।",
        "संपूरक कोण (Supplementary Angles): जिन दो कोणों का योग $180^\\circ$ हो।",
        "रैखिक युग्म (Linear Pair): एक सरल रेखा पर बने आसन्न कोणों का योग सदैव $180^\\circ$ होता है।",
        "शीर्षाभिमुख कोण (Vertically Opposite Angles): दो प्रतिच्छेदी रेखाओं के आमने-सामने के कोण परस्पर सदैव बराबर होते हैं।",
        "एकांतर अंतःकोण (Alternate Interior Angles): समांतर रेखाओं में 'Z' आकृति बनाने वाले अंतःकोण परस्पर बराबर होते हैं।",
        "संगत कोण (Corresponding Angles): समांतर रेखाओं में समान दिशा और स्थिति वाले कोण परस्पर बराबर होते हैं ('F' आकृति)।",
        "तिर्यक रेखा के एक ही ओर बने अंतःकोणों का योग सदैव $180^\\circ$ (संपूरक) होता है ('C' या 'U' आकृति)।",
        "घड़ी की दोनों सुइयों के बीच का कोण: $\\theta = |30H - \\frac{11}{2}M|$।"
      ]
    },

    chapters: [
      {
        id: "ch_1",
        title: "अध्याय 1: बिंदु, रेखा, रेखाखंड, किरण एवं कोणों का वर्गीकरण (Classification of Angles)",
        content: `### 1.1 मूलभूत ज्यामितीय अवयव (Fundamental Geometric Elements)
1. **बिंदु (Point)**: ज्यामिति की वह सूक्ष्मतम संकल्पना जिसकी न कोई लंबाई होती है, न चौड़ाई और न ही मोटाई (शून्य-विमीय आकृति, Dimension = 0)।
2. **रेखा (Line)**: बिंदुओं का वह सरल पथ जो दोनों दिशाओं में अपरिमित (अनंत) रूप से बढ़ता है। इसकी केवल लंबाई होती है (एक-विमीय)। इसे $\\overleftrightarrow{AB}$ से दर्शाते हैं।
3. **रेखाखंड (Line Segment)**: रेखा का वह निश्चित भाग जिसके दो निश्चित अंत बिंदु (End Points) होते हैं। इसकी लंबाई परिमित और मापनीय होती है। इसे $\\overline{AB}$ से दर्शाते हैं।
4. **किरण (Ray)**: रेखा का वह भाग जिसका केवल एक निश्चित प्रारंभिक बिंदु (Origin) होता है तथा यह दूसरी दिशा में अनंत तक विस्तृत होती है। इसे $\\overrightarrow{AB}$ से दर्शाते हैं।
5. **संरेख बिंदु (Collinear Points)**: यदि तीन या तीन से अधिक बिंदु एक ही सीधी रेखा पर स्थित हों, तो उन्हें संरेख बिंदु कहते हैं; अन्यथा वे असंरेख (Non-collinear) कहलाते हैं।

---

### 1.2 कोणों के प्रकार (Types of Angles based on Magnitude)
परिमाण के आधार पर कोणों को निम्न 6 श्रेणियों में विभाजित किया जाता है:
1. **न्यूनकोण (Acute Angle)**:
   $$0^\\circ < \\theta < 90^\\circ$$
2. **समकोण (Right Angle)**:
   $$\\theta = 90^\\circ$$
   (दो परस्पर लंबवत रेखाओं के बीच बना कोण)।
3. **अधिककोण (Obtuse Angle)**:
   $$90^\\circ < \\theta < 180^\\circ$$
4. **ऋजुकोण या सरल कोण (Straight Angle)**:
   $$\\theta = 180^\\circ$$
   (एक सीधी रेखा पर विपरीत दिशा में जाने वाली किरणों से बना कोण)।
5. **प्रतिवर्ती कोण (Reflex Angle)**:
   $$180^\\circ < \\theta < 360^\\circ$$
   - यदि किसी कोण का मान $\\theta$ है, तो उसका प्रतिवर्ती कोण $= 360^\\circ - \\theta$ होता है।
6. **सम्पूर्ण कोण (Complete Angle)**:
   $$\\theta = 360^\\circ$$
   (एक किरण द्वारा अपने प्रारंभिक बिंदु के चारों ओर एक पूर्ण चक्कर लगाने पर बना कोण)।`
      },
      {
        id: "ch_2",
        title: "अध्याय 2: कोणों के विशिष्ट युग्म (Pairs of Angles - Complementary, Supplementary & Linear Pair)",
        content: `### 2.1 पूरक कोण (Complementary Angles)
जब किन्हीं दो कोणों का योग $90^\\circ$ (एक समकोण) होता है, तो वे एक-दूसरे के **पूरक (कोटिपूरक)** कोण कहलाते हैं।
- यदि एक कोण $\\theta$ है, तो उसका पूरक कोण $= 90^\\circ - \\theta$
- **उदाहरण**: $30^\\circ$ का पूरक $60^\\circ$, $45^\\circ$ का पूरक $45^\\circ$।
- **व्यापम प्रश्न**: वह कोण ज्ञात कीजिए जो स्वयं के पूरक कोण के बराबर है $\\implies \\theta = 90^\\circ - \\theta \\implies 2\\theta = 90^\\circ \\implies \\theta = 45^\\circ$।

---

### 2.2 संपूरक कोण (Supplementary Angles)
जब किन्हीं दो कोणों का योग $180^\\circ$ (दो समकोण / सरल कोण) होता है, तो वे एक-दूसरे के **संपूरक** कोण कहलाते हैं।
- यदि एक कोण $\\theta$ है, तो उसका संपूरक कोण $= 180^\\circ - \\theta$
- **उदाहरण**: $70^\\circ$ का संपूरक $110^\\circ$, $90^\\circ$ का संपूरक $90^\\circ$।
- **व्यापम प्रश्न**: वह कोण ज्ञात कीजिए जो स्वयं के संपूरक के बराबर है $\\implies \\theta = 180^\\circ - \\theta \\implies 2\\theta = 180^\\circ \\implies \\theta = 90^\\circ$।

---

### 2.3 आसन्न कोण एवं रैखिक युग्म (Adjacent Angles & Linear Pair)
1. **आसन्न कोण (Adjacent Angles)**: दो कोण आसन्न कहलाते हैं यदि:
   - उनका एक उभयनिष्ठ शीर्ष (Common Vertex) हो।
   - उनकी एक उभयनिष्ठ भुजा (Common Arm) हो।
   - उनकी गैर-उभयनिष्ठ भुजाएँ उभयनिष्ठ भुजा के विपरीत ओर हों।
2. **रैखिक युग्म अभिगृहीत (Linear Pair Axiom)**:
   यदि दो आसन्न कोणों की गैर-उभयनिष्ठ भुजाएँ मिलकर एक सीधी रेखा बनाती हैं, तो उन कोणों का योग सदैव $180^\\circ$ होता है।
   $$\\angle 1 + \\angle 2 = 180^\\circ$$

---

### 2.4 शीर्षाभिमुख कोण (Vertically Opposite Angles)
जब दो सरल रेखाएँ परस्पर किसी बिंदु पर प्रतिच्छेद (Intersect) करती हैं, तो आमने-सामने बनने वाले कोण **शीर्षाभिमुख कोण** कहलाते हैं।
- **प्रमेय**: शीर्षाभिमुख कोण सदैव परिमाण में परस्पर **बराबर** होते हैं।
  $$\\angle 1 = \\angle 3 \\quad \\text{तथा} \\quad \\angle 2 = \\angle 4$$`
      },
      {
        id: "ch_3",
        title: "अध्याय 3: समांतर रेखाएँ एवं तिर्यक रेखा के महत्वपूर्ण प्रमेय (Parallel Lines & Transversal)",
        content: `### 3.1 समांतर रेखाएँ एवं तिर्यक रेखा (Definitions)
- **समांतर रेखाएँ (Parallel Lines)**: एक ही तल में स्थित वे रेखाएँ जो दोनों दिशाओं में अनंत तक बढ़ाए जाने पर भी कभी एक-दूसरे को नहीं काटतीं तथा जिनके बीच की लंबवत दूरी सदैव समान रहती है ($l \\parallel m$)।
- **तिर्यक रेखा (Transversal Line)**: वह रेखा जो दो या दो से अधिक समांतर रेखाओं को भिन्न-भिन्न बिंदुओं पर प्रतिच्छेद करती है ($t$)।

---

### 3.2 निर्मित 8 कोण एवं उनके तीन मूलभूत संबंध (The 8 Angles & 3 Relations)
माना रेखा $l \\parallel m$ को तिर्यक रेखा $t$ काटती है, जिससे शीर्ष प्रतिच्छेदन पर कोण $1, 2, 3, 4$ तथा निचले प्रतिच्छेदन पर कोण $5, 6, 7, 8$ बनते हैं:

#### 1. संगत कोण अभिगृहीत (Corresponding Angles Axiom - 'F' Shape)
समांतर रेखाओं के एक ही तरफ तथा तिर्यक रेखा के एक ही ओर समान स्थिति वाले कोण परस्पर **समान** होते हैं:
$$\\angle 1 = \\angle 5, \\quad \\angle 2 = \\angle 6, \\quad \\angle 4 = \\angle 8, \\quad \\angle 3 = \\angle 7$$

#### 2. एकांतर अंतःकोण प्रमेय (Alternate Interior Angles Theorem - 'Z' Shape)
दोनों समांतर रेखाओं के बीच में तथा तिर्यक रेखा के विपरीत ओर स्थित कोण परस्पर **समान** होते हैं:
$$\\angle 3 = \\angle 5 \\quad \\text{तथा} \\quad \\angle 4 = \\angle 6$$
*(इसी प्रकार एकांतर बाह्य कोण भी समान होते हैं: $\\angle 1 = \\angle 7$ तथा $\\angle 2 = \\angle 8$)*।

#### 3. तिर्यक रेखा के एक ही ओर के अंतःकोण (Consecutive Interior Angles - 'C' / 'U' Shape)
तिर्यक रेखा के एक ही ओर अंदर स्थित दोनों कोणों का योग सदैव $180^\\circ$ (संपूरक) होता है:
$$\\angle 3 + \\angle 6 = 180^\\circ \\quad \\text{तथा} \\quad \\angle 4 + \\angle 5 = 180^\\circ$$

---

### 3.3 समांतरता की कसौटियाँ (Conditions for Parallelism)
यदि दो रेखाओं को एक तिर्यक रेखा इस प्रकार काटे कि:
1. कोई एक संगत कोण युग्म बराबर हो, अथवा
2. कोई एक एकांतर अंतःकोण युग्म बराबर हो, अथवा
3. तिर्यक रेखा के एक ही ओर के अंतःकोणों का योग $180^\\circ$ हो,
तो वे दोनों रेखाएँ अनिवार्य रूप से **परस्पर समांतर** होंगी।`
      },
      {
        id: "ch_4",
        title: "अध्याय 4: ज्यामितीय आरेख प्रारूप एवं अज्ञात कोण x ज्ञात करना (Geometric Diagram Patterns)",
        content: `### 4.1 'V' या मुड़े हुए कोण का प्रारूप (Point-Vertex Auxiliary Line Technique)
व्यापम में यह प्रश्न सर्वाधिक बार आया है जहाँ दो समांतर रेखाओं $AB \\parallel CD$ के बीच एक बिंदु $O$ पर रेखा मुड़ती है और $\\angle AOB$ पूछा जाता है।
- **हल करने की गुप्त विधि**:
  शीर्ष बिंदु $O$ से होकर जाने वाली एक काल्पनिक सहायक रेखा (Auxiliary Line) $EF$ खींचें जो $AB$ और $CD$ दोनों के समांतर हो ($AB \\parallel EF \\parallel CD$)।
  - अब बिंदु $O$ पर बनने वाला कोण दो एकांतर अंतःकोणों में विभाजित हो जाता है:
    $$\\angle AOB = \\angle 1 + \\angle 2$$
  - जहाँ $\\angle 1$ रेखा $AB$ के कोण का एकांतर है तथा $\\angle 2$ रेखा $CD$ के कोण का एकांतर है।

---

### 4.2 बाह्य प्रतिवर्ती कोण (Reflex Outer Angle Pattern)
यदि दो समांतर रेखाओं के बीच नुकीला मोड़ अंदर की ओर हो और बाहर का बड़ा कोण $x$ पूछा जाए:
$$x = 360^\\circ - (\\angle A + \\angle B)$$
जहाँ $\\angle A$ और $\\angle B$ अंदर की ओर मुड़े हुए संगत कोण हैं।

---

### 4.3 त्रिभुज का बहिष्कोण प्रमेय (Exterior Angle Theorem)
किसी त्रिभुज की एक भुजा को आगे बढ़ाने पर बना बहिष्कोण (Exterior Angle) अपने दोनों सुदूर अंतःकोणों (Interior Opposite Angles) के योग के बराबर होता है:
$$\\angle \\text{ext} = \\angle A + \\angle B$$
इसका उपयोग रेखाओं एवं कोणों के जटिल आरेखों को तुरंत हल करने में होता है।`
      },
      {
        id: "ch_5",
        title: "अध्याय 5: घड़ी की सुइयों के कोण एवं व्यापम स्पीड ट्रिक्स (Clock Angles & Speed Hacks)",
        content: `### 5.1 घड़ी की सुइयों द्वारा कोण निर्माण की मूल गति (Clock Hand Angular Speeds)
- **घंटे की सुई (Hour Hand)**:
  - 12 घंटे में $360^\\circ$ घूमती है।
  - 1 घंटे में $= \\frac{360^\\circ}{12} = 30^\\circ$ घूमती है।
  - 1 मिनट में $= \\frac{30^\\circ}{60} = 0.5^\\circ$ (या $\\frac{1}{2}^\\circ$) घूमती है।
- **मिनट की सुई (Minute Hand)**:
  - 60 मिनट में $360^\\circ$ घूमती है।
  - 1 मिनट में $= \\frac{360^\\circ}{60} = 6^\\circ$ घूमती है।
- **सापेक्ष गति (Relative Angular Speed)**:
  - मिनट की सुई घंटे की सुई से प्रत्येक मिनट में $6^\\circ - 0.5^\\circ = 5.5^\\circ$ (या $\\frac{11}{2}^\\circ$) आगे निकलती है।

---

### 5.2 किसी भी समय पर सुइयों के बीच का कोण (Universal Formula)
समय $H$ बजकर $M$ मिनट पर दोनों सुइयों के बीच का कोण:
$$\\theta = \\left| 30H - \\frac{11}{2}M \\right|$$
- यदि प्राप्त मान $180^\\circ$ से अधिक हो, तो दूसरा (छोटा) कोण $= 360^\\circ - \\theta$ होगा।

**व्यापम प्रश्न**: 4 बजकर 20 मिनट पर घड़ी की दोनों सुइयों के बीच कितना कोण होगा?
- **हल**: यहाँ $H = 4, M = 20$
  $$\\theta = \\left| 30(4) - \\frac{11}{2}(20) \\right| = |120 - 110| = 10^\\circ$$
  अतः कोण $10^\\circ$ होगा।`
      }
    ],

    comparativeTables: [
      {
        id: "tbl_1",
        title: "परिमाण के आधार पर कोणों के विभिन्न प्रकारों का विस्तृत तुलनात्मक चार्ट",
        headers: ["कोण का नाम (Type)", "माप परास (Angle Range)", "ज्यामितीय विशेषता", "मानक उदाहरण"],
        rows: [
          ["शून्य कोण (Zero Angle)", "$$\\theta = 0^\\circ$$", "दोनों किरणें एक ही दिशा में संपाती", "बिना झुकाव"],
          ["न्यूनकोण (Acute Angle)", "$$0^\\circ < \\theta < 90^\\circ$$", "समकोण से छोटा नुकीला कोण", "$$30^\\circ, 45^\\circ, 60^\\circ$$"],
          ["समकोण (Right Angle)", "$$\\theta = 90^\\circ$$", "दो लंबवत किरणों द्वारा निर्मित ('L' आकृति)", "$$90^\\circ$$"],
          ["अधिककोण (Obtuse Angle)", "$$90^\\circ < \\theta < 180^\\circ$$", "समकोण से बड़ा किन्तु सरल कोण से छोटा", "$$120^\\circ, 135^\\circ, 150^\\circ$$"],
          ["ऋजुकोण/सरल कोण (Straight)", "$$\\theta = 180^\\circ$$", "विपरीत दिशा में सीधी रेखा पर बना कोण", "$$180^\\circ$$"],
          ["प्रतिवर्ती कोण (Reflex Angle)", "$$180^\\circ < \\theta < 360^\\circ$$", "सरल कोण से बड़ा बाह्य कोण", "$$210^\\circ, 300^\\circ$$"],
          ["सम्पूर्ण कोण (Complete Angle)", "$$\\theta = 360^\\circ$$", "एक बिंदु के चारों ओर एक पूर्ण घूर्णन", "$$360^\\circ$$"]
        ]
      },
      {
        id: "tbl_2",
        title: "कोणों के विशिष्ट युग्मों के गुणधर्म एवं तुलना",
        headers: ["युग्म का नाम", "कोणों का योग / संबंध", "उभयनिष्ठ शीर्ष/भुजा की आवश्यकता", "व्यापम में प्रमुख सूत्र"],
        rows: [
          [
            "कोटिपूरक/पूरक कोण (Complementary)",
            "$$\\angle A + \\angle B = 90^\\circ$$",
            "आवश्यक नहीं (अलग-अलग भी हो सकते हैं)",
            "$$\\text{पूरक} = 90^\\circ - \\theta$$"
          ],
          [
            "संपूरक कोण (Supplementary)",
            "$$\\angle A + \\angle B = 180^\\circ$$",
            "आवश्यक नहीं",
            "$$\\text{संपूरक} = 180^\\circ - \\theta$$"
          ],
          [
            "रैखिक युग्म (Linear Pair)",
            "$$\\angle 1 + \\angle 2 = 180^\\circ$$",
            "अनिवार्य (एक ही रेखा पर आसन्न कोण)",
            "सरल रेखा पर $x$ का मान ज्ञात करना"
          ],
          [
            "शीर्षाभिमुख कोण (Vertically Opposite)",
            "$$\\angle 1 = \\angle 3, \\; \\angle 2 = \\angle 4$$",
            "अनिवार्य (दो रेखाओं का प्रतिच्छेदन बिंदु)",
            "आमने-सामने के कोण बराबर करना"
          ]
        ]
      },
      {
        id: "tbl_3",
        title: "समांतर रेखाओं को तिर्यक रेखा द्वारा काटने पर निर्मित कोण युग्म",
        headers: ["कोण युग्म का प्रकार", "आकृति संकेत", "परस्पर संबंध", "विशेषता/पहचान"],
        rows: [
          [
            "संगत कोण (Corresponding)",
            "'F' आकृति",
            "परस्पर बराबर ($$\\angle 1 = \\angle 5$$)",
            "समान दिशा और समान सापेक्ष स्थिति"
          ],
          [
            "एकांतर अंतःकोण (Alternate Interior)",
            "'Z' आकृति",
            "परस्पर बराबर ($$\\angle 3 = \\angle 5$$)",
            "समांतर रेखाओं के अंदर तिर्यक रेखा के आर-पार"
          ],
          [
            "एकांतर बाह्य कोण (Alternate Exterior)",
            "बाहरी 'Z'",
            "परस्पर बराबर ($$\\angle 1 = \\angle 7$$)",
            "समांतर रेखाओं के बाहर तिर्यक रेखा के आर-पार"
          ],
          [
            "क्रमागत अंतःकोण (Consecutive Interior)",
            "'C' या 'U' आकृति",
            "संपूरक ($$\\angle 3 + \\angle 6 = 180^\\circ$$)",
            "समांतर रेखाओं के अंदर तिर्यक रेखा के एक ही तरफ"
          ]
        ]
      }
    ],

    pyqs: [
      {
        id: "pyq_1",
        question: "किसी कोण का संपूरक कोण उसके पूरक कोण का तीन गुना है। उस कोण का मान क्या होगा? [CG Vyapam Patwari 2017]",
        options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$75^\\circ$"],
        correctOption: 1,
        explanation: "माना अभीष्ट कोण $= \\theta$।\nउसका पूरक कोण $= 90^\\circ - \\theta$\nउसका संपूरक कोण $= 180^\\circ - \\theta$\nप्रश्नानुसार:\n$$180^\\circ - \\theta = 3(90^\\circ - \\theta)$$\n$$180^\\circ - \\theta = 270^\\circ - 3\\theta$$\n$$3\\theta - \\theta = 270^\\circ - 180^\\circ$$\n$$2\\theta = 90^\\circ \\implies \\theta = 45^\\circ$$\nअतः वह कोण $45^\\circ$ है।"
      },
      {
        id: "pyq_2",
        question: "दो समांतर रेखाओं को एक तिर्यक रेखा काटती है। यदि तिर्यक रेखा के एक ही ओर के दो अंतःकोण $(2x - 10)^\\circ$ और $(3x + 25)^\\circ$ हों, तो $x$ का मान क्या होगा? [CG Vyapam Hostel Warden 2016]",
        options: ["$25^\\circ$", "$33^\\circ$", "$35^\\circ$", "$40^\\circ$"],
        correctOption: 1,
        explanation: "तिर्यक रेखा के एक ही ओर के अंतःकोणों का योग सदैव $180^\\circ$ (संपूरक) होता है:\n$$(2x - 10)^\\circ + (3x + 25)^\\circ = 180^\\circ$$\n$$5x + 15^\\circ = 180^\\circ$$\n$$5x = 180^\\circ - 15^\\circ = 165^\\circ$$\n$$x = \\frac{165^\\circ}{5} = 33^\\circ$$\nअतः $x = 33^\\circ$।"
      },
      {
        id: "pyq_3",
        question: "एक सरल रेखा $AB$ पर स्थित बिंदु $O$ से एक किरण $OC$ निकलती है। यदि $\\angle AOC = (3x + 20)^\\circ$ तथा $\\angle BOC = (4x - 15)^\\circ$ हो, तो $\\angle AOC$ का मान क्या होगा? [CG Vyapam RI 2018]",
        options: ["$75^\\circ$", "$95^\\circ$", "$85^\\circ$", "$105^\\circ$"],
        correctOption: 1,
        explanation: "रैखिक युग्म अभिगृहीत से एक सरल रेखा पर बने आसन्न कोणों का योग $180^\\circ$ होता है:\n$$\\angle AOC + \\angle BOC = 180^\\circ$$\n$$(3x + 20)^\\circ + (4x - 15)^\\circ = 180^\\circ$$\n$$7x + 5^\\circ = 180^\\circ \\implies 7x = 175^\\circ \\implies x = 25^\\circ$$\nअब $\\angle AOC = 3(25^\\circ) + 20^\\circ = 75^\\circ + 20^\\circ = 95^\\circ$।\nअतः $\\angle AOC = 95^\\circ$।"
      },
      {
        id: "pyq_4",
        question: "यदि $AB \\parallel CD$ हो और इनके बीच बिंदु $E$ पर रेखा मुड़ती हो जहाँ $\\angle BAE = 110^\\circ$ तथा $\\angle ECD = 130^\\circ$ हो, तो $\\angle AEC$ का मान क्या होगा? [CGPSC CSAT 2020]",
        options: ["$120^\\circ$", "$100^\\circ$", "$80^\\circ$", "$60^\\circ$"],
        correctOption: 0,
        explanation: "बिंदु $E$ से होकर $AB$ और $CD$ के समांतर एक रेखा $EF$ खींचते हैं।\nरेखा $AB \\parallel EF$ में तिर्यक रेखा के एक ही ओर के कोण:\n$$\\angle BAE + \\angle AEF = 180^\\circ \\implies 110^\\circ + \\angle AEF = 180^\\circ \\implies \\angle AEF = 70^\\circ$$\nइसी प्रकार $CD \\parallel EF$ में:\n$$\\angle ECD + \\angle CEF = 180^\\circ \\implies 130^\\circ + \\angle CEF = 180^\\circ \\implies \\angle CEF = 50^\\circ$$\nअब अभीष्ट कोण:\n$$\\angle AEC = \\angle AEF + \\angle CEF = 70^\\circ + 50^\\circ = 120^\\circ$$\nअतः $\\angle AEC = 120^\\circ$।"
      },
      {
        id: "pyq_5",
        question: "दो संपूरक कोणों का अनुपात $7 : 11$ है। छोटे कोण का मान ज्ञात कीजिए। [CG Vyapam Mandi Inspector 2021]",
        options: ["$70^\\circ$", "$77^\\circ$", "$63^\\circ$", "$55^\\circ$"],
        correctOption: 0,
        explanation: "माना कोण $7x$ और $11x$ हैं।\nसंपूरक कोणों का योग $= 180^\\circ$:\n$$7x + 11x = 180^\\circ$$\n$$18x = 180^\\circ \\implies x = 10^\\circ$$\nछोटा कोण $= 7x = 7 \\times 10^\\circ = 70^\\circ$।\n(बड़ा कोण $= 11 \\times 10^\\circ = 110^\\circ$)।"
      },
      {
        id: "pyq_6",
        question: "दो रेखाएँ $AB$ और $CD$ परस्पर बिंदु $O$ पर काटती हैं। यदि $\\angle AOC + \\angle BOD = 130^\\circ$ हो, तो $\\angle BOC$ का मान क्या होगा? [CG Vyapam Sub-Engineer 2019]",
        options: ["$115^\\circ$", "$120^\\circ$", "$125^\\circ$", "$130^\\circ$"],
        correctOption: 0,
        explanation: "रेखाओं के प्रतिच्छेदन पर $\\angle AOC$ और $\\angle BOD$ शीर्षाभिमुख कोण हैं, अतः परस्पर बराबर होंगे:\n$$\\angle AOC = \\angle BOD$$\nचूँकि $\\angle AOC + \\angle BOD = 130^\\circ$:\n$$2 \\angle AOC = 130^\\circ \\implies \\angle AOC = 65^\\circ$$\nअब रेखा $AB$ पर $\\angle AOC$ और $\\angle BOC$ रैखिक युग्म बनाते हैं:\n$$\\angle AOC + \\angle BOC = 180^\\circ$$\n$$65^\\circ + \\angle BOC = 180^\\circ \\implies \\angle BOC = 180^\\circ - 65^\\circ = 115^\\circ$$\nअतः $\\angle BOC = 115^\\circ$।"
      }
    ],

    mcqs: [
      {
        id: "mcq_1",
        question: "वह कोण क्या होगा जो अपने पूरक कोण से $24^\\circ$ अधिक है?",
        options: ["$33^\\circ$", "$57^\\circ$", "$66^\\circ$", "$48^\\circ$"],
        correctOption: 1,
        explanation: "माना कोण $= \\theta$। पूरक कोण $= 90^\\circ - \\theta$।\n$$\\theta - (90^\\circ - \\theta) = 24^\\circ$$\n$$2\\theta - 90^\\circ = 24^\\circ \\implies 2\\theta = 114^\\circ \\implies \\theta = 57^\\circ$$"
      },
      {
        id: "mcq_2",
        question: "एक बिंदु के चारों ओर बने सभी कोणों का योग कितना होता है?",
        options: ["$180^\\circ$", "$270^\\circ$", "$360^\\circ$", "$540^\\circ$"],
        correctOption: 2,
        explanation: "एक बिंदु के चारों ओर एक पूर्ण घूर्णन (सम्पूर्ण कोण) बनता है, जिसका योग सदैव $360^\\circ$ (4 समकोण) होता है।"
      },
      {
        id: "mcq_3",
        question: "दो समांतर रेखाओं को काटने वाली तिर्यक रेखा के एकांतर अंतःकोणों के समद्विभाजक (Bisectors) परस्पर कैसे होते हैं?",
        options: ["परस्पर लंबवत", "परस्पर समांतर", "संपाती", "प्रतिच्छेदी"],
        correctOption: 1,
        explanation: "एकांतर अंतःकोणों के कोण-समद्विभाजक सदैव एक-दूसरे के समांतर (Parallel) होते हैं।"
      },
      {
        id: "mcq_4",
        question: "रैखिक युग्म बनाने वाले दो कोणों के कोण-समद्विभाजकों के बीच का कोण कितना होता है?",
        options: ["$45^\\circ$", "$60^\\circ$", "$90^\\circ$", "$180^\\circ$"],
        correctOption: 2,
        explanation: "माना रैखिक युग्म के कोण $\\alpha$ और $\\beta$ हैं जहां $\\alpha + \\beta = 180^\\circ$।\nसमद्विभाजकों के बीच का कोण $= \\frac{\\alpha}{2} + \\frac{\\beta}{2} = \\frac{\\alpha + \\beta}{2} = \\frac{180^\\circ}{2} = 90^\\circ$ (समकोण)।"
      },
      {
        id: "mcq_5",
        question: "3 बजकर 30 मिनट पर घड़ी की दोनों सुइयों के बीच कितने अंश का कोण बनेगा?",
        options: ["$75^\\circ$", "$80^\\circ$", "$90^\\circ$", "$105^\\circ$"],
        correctOption: 0,
        explanation: "सूत्र: $\\theta = |30H - \\frac{11}{2}M|$\n$$\\theta = \\left| 30(3) - \\frac{11}{2}(30) \\right| = |90 - 165| = |-75| = 75^\\circ$$"
      },
      {
        id: "mcq_6",
        question: "किसी कोण का प्रतिवर्ती कोण (Reflex Angle) $250^\\circ$ है। उस कोण का मान क्या होगा?",
        options: ["$70^\\circ$", "$90^\\circ$", "$110^\\circ$", "$120^\\circ$"],
        correctOption: 2,
        explanation: "मूल कोण $= 360^\\circ - 250^\\circ = 110^\\circ$।"
      },
      {
        id: "mcq_7",
        question: "यदि $l \\parallel m$ तथा $m \\parallel n$ हो, तो $l$ और $n$ के बीच क्या संबंध होगा?",
        options: ["$l$ और $n$ समांतर होंगी", "$l$ और $n$ लंबवत होंगी", "$l$ और $n$ प्रतिच्छेदी होंगी", "कोई संबंध नहीं कहा जा सकता"],
        correctOption: 0,
        explanation: "यूक्लिड की ज्यामिति के अनुसार, वे रेखाएँ जो एक ही दी गई रेखा के समांतर हों, वे परस्पर भी समांतर (Parallel) होती हैं ($l \\parallel n$)।"
      },
      {
        id: "mcq_8",
        question: "यदि किसी कोण का पूरक कोण $\\theta$ तथा संपूरक कोण $\\phi$ हो, तो $\\phi - \\theta$ का मान सदैव क्या होगा?",
        options: ["$45^\\circ$", "$90^\\circ$", "$180^\\circ$", "$60^\\circ$"],
        correctOption: 1,
        explanation: "माना मूल कोण $x$ है।\nपूरक कोण $\\theta = 90^\\circ - x$\nसंपूरक कोण $\\phi = 180^\\circ - x$\nअंतर: $\\phi - \\theta = (180^\\circ - x) - (90^\\circ - x) = 90^\\circ$ (सदैव $90^\\circ$ का अंतर होता है)।"
      }
    ],

    keyTerminology: [
      {
        term: "रेखा (Line)",
        definition: "दोनों दिशाओं में अनंत तक विस्तृत होने वाला एक-विमीय बिंदुओं का सरल समुच्चय जिसकी कोई मोटाई नहीं होती।"
      },
      {
        term: "किरण (Ray)",
        definition: "एक निश्चित अंत बिंदु (प्रारंभिक बिंदु) से प्रारंभ होकर दूसरी दिशा में अनंत तक जाने वाली रेखा।"
      },
      {
        term: "पूरक कोण (Complementary Angles)",
        definition: "दो कोण जिनका योगफल ठीक $90^\\circ$ (एक समकोण) होता है।"
      },
      {
        term: "संपूरक कोण (Supplementary Angles)",
        definition: "दो कोण जिनका योगफल ठीक $180^\\circ$ (दो समकोण / एक सरल कोण) होता है।"
      },
      {
        term: "रैखिक युग्म (Linear Pair)",
        definition: "एक सीधी रेखा पर उभयनिष्ठ शीर्ष और भुजा वाले ऐसे दो आसन्न कोण जिनका योगफल $180^\\circ$ होता है।"
      },
      {
        term: "शीर्षाभिमुख कोण (Vertically Opposite Angles)",
        definition: "दो रेखाओं के परस्पर प्रतिच्छेदन से बने सम्मुख कोण जो परिमाण में सदैव समान होते हैं।"
      },
      {
        term: "तिर्यक रेखा (Transversal Line)",
        definition: "वह रेखा जो दो या दो से अधिक समांतर रेखाओं को भिन्न-भिन्न बिंदुओं पर काटती है।"
      },
      {
        term: "प्रतिवर्ती कोण (Reflex Angle)",
        definition: "वह कोण जिसका मान $180^\\circ$ से अधिक तथा $360^\\circ$ से कम होता है।"
      }
    ],

    sources: [
      {
        title: "NCERT Mathematics Class 9 - Chapter 6: Lines and Angles",
        author: "NCERT",
        year: 2023,
        type: "National Curriculum Textbook"
      },
      {
        title: "छत्तीसगढ़ माध्यमिक शिक्षा मण्डल कक्षा 9 गणित - रेखाएँ एवं कोण",
        author: "CGBSE",
        year: 2022,
        type: "State Board Textbook"
      },
      {
        title: "Quantitative Aptitude for Competitive Examinations - Geometry",
        author: "Dr. R.S. Aggarwal",
        year: 2023,
        type: "Reference Book"
      },
      {
        title: "CG Vyapam Solved Papers (2015-2024)",
        author: "CGPEB Official Papers",
        year: 2024,
        type: "Official Exam Archive"
      }
    ],

    confusionBuster: [
      {
        concept: "पूरक (कोटिपूरक) vs संपूरक कोण में योग का भ्रम",
        confusion: "छात्र अक्सर भूल जाते हैं कि किसका योग $90^\\circ$ है और किसका $180^\\circ$।",
        clarification: "वर्णमाला क्रम ट्रिक: अंग्रेजी में 'C' (Complementary) पहले आता है तो मान छोटा ($90^\\circ$) है; 'S' (Supplementary) बाद में आता है तो मान बड़ा ($180^\\circ$) है। हिंदी में: पूरक/कोटिपूरक ($90^\\circ$), संपूरक ($180^\\circ$)।"
      },
      {
        concept: "आसन्न कोण और रैखिक युग्म में अंतर",
        confusion: "क्या सभी आसन्न कोणों का योग $180^\\circ$ होता है?",
        clarification: "नहीं। आसन्न कोणों का योग कुछ भी हो सकता है। केवल तब जब उनकी गैर-उभयनिष्ठ भुजाएँ एक सीधी रेखा बनाएँ, तभी वे 'रैखिक युग्म' कहलाते हैं और उनका योग $180^\\circ$ होता है।"
      },
      {
        concept: "तिर्यक रेखा के अंतःकोणों का योग",
        confusion: "छात्र क्रमागत अंतःकोणों को बराबर मान लेते हैं जैसे एकांतर कोण बराबर होते हैं।",
        clarification: "एकांतर कोण ('Z' आकृति) बराबर होते हैं, परन्तु तिर्यक रेखा के एक ही तरफ के अंतःकोण ('C' या 'U' आकृति) बराबर नहीं बल्कि संपूरक (योग $= 180^\\circ$) होते हैं।"
      },
      {
        concept: "प्रतिवर्ती कोण की पहचान",
        confusion: "यदि कोण $60^\\circ$ है, तो छात्र प्रतिवर्ती कोण को $120^\\circ$ ($180 - 60$) समझ लेते हैं।",
        clarification: "प्रतिवर्ती कोण का मान सदैव $360^\\circ$ में से घटाकर निकाला जाता है: $360^\\circ - 60^\\circ = 300^\\circ$।"
      },
      {
        concept: "घड़ी के कोण में 180 से अधिक मान",
        confusion: "सूत्र लगाने पर यदि मान $240^\\circ$ आए तो क्या वही कोण है?",
        clarification: "सामान्यतः दो सुइयों के बीच का छोटा कोण पूछा जाता है। यदि सूत्र से मान $180^\\circ$ से अधिक आए, तो उसे $360^\\circ$ से घटाकर छोटा कोण ($360^\\circ - 240^\\circ = 120^\\circ$) प्राप्त करें।"
      }
    ],

    faqList: [
      {
        question: "कोटिपूरक कोण और पूरक कोण में क्या अंतर है?",
        answer: "दोनों एक ही हैं। हिंदी में पूरक कोण को ही कोटिपूरक कोण (Complementary Angle) कहा जाता है, जिनका योग $90^\\circ$ होता है।"
      },
      {
        question: "क्या दो अधिककोण परस्पर संपूरक हो सकते हैं?",
        answer: "नहीं। अधिककोण का मान $90^\\circ$ से बड़ा होता है। दो अधिककोणों का योग सदैव $180^\\circ$ से अधिक होगा, अतः वे कभी संपूरक नहीं हो सकते।"
      },
      {
        question: "क्या दो न्यूनकोण परस्पर संपूरक हो सकते हैं?",
        answer: "नहीं। दो न्यूनकोणों (प्रत्येक $< 90^\\circ$) का अधिकतम योग $180^\\circ$ से कम ही रहेगा, अतः वे संपूरक नहीं हो सकते।"
      },
      {
        question: "घड़ी में दोनों सुइयाँ 12 घंटे में कितनी बार संपाती ($0^\\circ$) होती हैं?",
        answer: "12 घंटे में 11 बार (11 से 1 बजे के मध्य केवल 12 बजे एक ही बार संपाती होती हैं) तथा 24 घंटे में 22 बार।"
      },
      {
        question: "समांतर रेखाओं के बीच मुड़े हुए कोण वाले प्रश्नों का सबसे तेज हल क्या है?",
        answer: "शीर्ष बिंदु से होकर एक सहायक समांतर रेखा खींचें। इससे मुड़ा हुआ कोण दो एकांतर अंतःकोणों के योग में टूट जाता है और तुरंत हल हो जाता है।"
      }
    ],

    oneLinerRevision: [
      "पूरक (कोटिपूरक) कोणों का योग सदैव 90° और संपूरक कोणों का योग सदैव 180° होता है।",
      "रैखिक युग्म के आसन्न कोणों का योग सदैव 180° होता है।",
      "प्रतिच्छेदी रेखाओं के आमने-सामने के शीर्षाभिमुख कोण परस्पर सदैव बराबर होते हैं।",
      "दो समांतर रेखाओं को तिर्यक रेखा काटने पर एकांतर अंतःकोण (Z-आकृति) बराबर होते हैं।",
      "संगत कोण (F-आकृति) परस्पर बराबर होते हैं।",
      "तिर्यक रेखा के एक ही ओर के अंतःकोणों (C-आकृति) का योग सदैव 180° (संपूरक) होता है।",
      "एक बिंदु के चारों ओर बने सभी कोणों का कुल योग 360° होता है।",
      "प्रतिवर्ती कोण (Reflex Angle) 180° से 360° के बीच होता है तथा इसका मान 360° - θ होता है।",
      "घंटे की सुई 1 मिनट में 0.5° तथा मिनट की सुई 1 मिनट में 6° घूमती है।",
      "घड़ी की सुइयों के बीच का कोण θ = |30H - (11/2)M| होता है।"
    ],

    rapidRevision: "रेखाएँ एवं कोण अध्याय में पूर्ण सफलता हेतु तीन प्रमुख नियमों को कंठस्थ रखें: (1) कोणों के मूल युग्म: पूरक (योग 90°), संपूरक (योग 180°), रैखिक युग्म (सरल रेखा पर योग 180°) तथा शीर्षाभिमुख कोण (परस्पर बराबर)। (2) समांतर रेखा एवं तिर्यक रेखा के तीन नियम: संगत कोण बराबर (F), एकांतर कोण बराबर (Z) तथा एक ही ओर के अंतःकोण संपूरक (योग 180°)। (3) आरेख प्रश्नों में मुड़े हुए शीर्ष से सहायक समांतर रेखा खींचने की ट्रिक और घड़ी के कोण सूत्र θ = |30H - 5.5M| का त्वरित प्रयोग। इन नियमों से व्यापम के समस्त ज्यामितीय प्रश्न सेकंडों में हल हो जाते हैं।"
  }
};

async function upload() {
  console.log('Uploading study notes for math_geo_1 (Lines and Angles)...');
  const sanitized = sanitizeForFirestore(topicNotesData);
  await db.collection('topic_study_notes').doc('cgv_master_math_geo_1').set(sanitized);
  console.log('✅ cgv_master_math_geo_1 saved to Firestore topic_study_notes!');

  // Sync syllabi in Firestore
  const docRef = db.collection('syllabi').doc('cgv_master');
  const doc = await docRef.get();
  if (doc.exists) {
    const data = doc.data();
    let updated = false;
    data.subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        ch.topics.forEach(t => {
          if (t.id === 'math_geo_1') {
            t.hasStudyNotes = true;
            updated = true;
          }
        });
      });
    });
    if (updated) {
      await docRef.set(data);
      console.log('✅ syllabi/cgv_master updated: math_geo_1 hasStudyNotes = true');
    }
  }

  console.log('\nUpload complete! 🚀');
}

upload().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
