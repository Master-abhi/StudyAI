/* ═══════════════════════════════════════════════════════════════
   CG Guru — CG VYAPAM Syllabus Data
   All major Chhattisgarh Professional Examination Board exams
   ═══════════════════════════════════════════════════════════════ */

const SYLLABUS_DATA = {

  /* ─────────────────────────────────────────────────────────────
     1. PATWARI / REVENUE INSPECTOR (RI)
  ───────────────────────────────────────────────────────────── */
  "cgv_patwari": {
    name: "Patwari / RI",
    fullName: "CGVYAPAM — Patwari & Revenue Inspector Exam",
    icon: "🏘️",
    category: "administrative",
    description: "Revenue Inspector & Patwari recruitment for land records & administrative work",
    eligibility: "12th Pass / Graduate",
    pattern: {
      totalMarks: 100,
      time: "2 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "General Knowledge & Chhattisgarh GK", marks: 40 },
        { paper: "Hindi Language", marks: 20 },
        { paper: "Mathematics & Reasoning", marks: 30 },
        { paper: "Computer Knowledge", marks: 10 }
      ]
    },
    subjects: [
      {
        name: "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        nameHi: "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        topics: [
          { id: "pat-cg-1",  name: "CG History — Ancient Period", nameHi: "छत्तीसगढ़ का इतिहास — प्राचीन काल" },
          { id: "pat-cg-2",  name: "CG History — Medieval Period", nameHi: "छत्तीसगढ़ का इतिहास — मध्यकालीन काल" },
          { id: "pat-cg-3",  name: "CG History — Modern & Freedom Movement", nameHi: "छत्तीसगढ़ का इतिहास — आधुनिक काल व स्वतंत्रता आंदोलन" },
          { id: "pat-cg-4",  name: "CG Geography — Rivers & Landforms", nameHi: "छत्तीसगढ़ की भौगोलिक संरचना एवं नदियाँ" },
          { id: "pat-cg-5",  name: "CG Climate, Forests & Soil", nameHi: "छत्तीसगढ़ की जलवायु, वन एवं मिट्टी" },
          { id: "pat-cg-6",  name: "CG Tribes (जनजातियाँ)", nameHi: "छत्तीसगढ़ की जनजातियाँ" },
          { id: "pat-cg-7",  name: "CG Art, Culture, Dance & Folk Songs", nameHi: "CG की कला, संस्कृति, नृत्य एवं लोकगीत" },
          { id: "pat-cg-8",  name: "CG Festivals & Fairs", nameHi: "CG के प्रमुख त्यौहार एवं मेले" },
          { id: "pat-cg-9",  name: "CG Major Irrigation Projects", nameHi: "CG की प्रमुख सिंचाई परियोजनाएं" },
          { id: "pat-cg-10", name: "CG Minerals — Coal, Iron Ore, Bauxite", nameHi: "CG के खनिज संसाधन (Coal, Iron Ore, Bauxite)" },
          { id: "pat-cg-11", name: "CG Economy & Industries", nameHi: "CG की अर्थव्यवस्था एवं उद्योग" },
          { id: "pat-cg-12", name: "CG Administration — Districts & Divisions", nameHi: "CG की प्रशासनिक व्यवस्था — जिले व संभाग" },
          { id: "pat-cg-13", name: "CG Government Schemes", nameHi: "CG सरकार की प्रमुख योजनाएं" },
          { id: "pat-cg-14", name: "CG Notable Personalities", nameHi: "CG के प्रमुख व्यक्तित्व" },
          { id: "pat-cg-15", name: "CG Panchayati Raj System", nameHi: "CG में पंचायती राज व्यवस्था" },
          { id: "pat-cg-16", name: "CG Current Affairs", nameHi: "CG की वर्तमान घटनाएं (Current Affairs)" }
        ]
      },
      {
        name: "सामान्य ज्ञान (India GK)",
        nameHi: "सामान्य ज्ञान (भारत)",
        topics: [
          { id: "pat-gk-1",  name: "India History — Ancient & Medieval", nameHi: "भारत का इतिहास — प्राचीन एवं मध्यकाल" },
          { id: "pat-gk-2",  name: "India History — Modern Period", nameHi: "भारत का इतिहास — आधुनिक काल" },
          { id: "pat-gk-3",  name: "India Geography — Physical", nameHi: "भारत का भूगोल — भौतिक" },
          { id: "pat-gk-4",  name: "Indian Constitution — Basics", nameHi: "भारतीय संविधान — मूल बातें" },
          { id: "pat-gk-5",  name: "Indian Polity", nameHi: "भारतीय राजव्यवस्था" },
          { id: "pat-gk-6",  name: "Indian Economy", nameHi: "भारतीय अर्थव्यवस्था" },
          { id: "pat-gk-7",  name: "General Science — Physics, Chemistry, Biology", nameHi: "सामान्य विज्ञान — भौतिकी, रसायन, जीव विज्ञान" },
          { id: "pat-gk-8",  name: "National & International Current Affairs", nameHi: "राष्ट्रीय एवं अंतर्राष्ट्रीय करंट अफेयर्स" },
          { id: "pat-gk-9",  name: "Sports, Awards & Important Dates", nameHi: "खेलकूद, पुरस्कार एवं महत्वपूर्ण तिथियाँ" }
        ]
      },
      {
        name: "हिंदी भाषा",
        nameHi: "हिंदी भाषा",
        topics: [
          { id: "pat-hi-1", name: "Sandhi & Sandhi Viched (Junction)", nameHi: "संधि एवं संधि विच्छेद" },
          { id: "pat-hi-2", name: "Samas (Compound Words)", nameHi: "समास (Compound Words)" },
          { id: "pat-hi-3", name: "Upsarg & Pratyay (Prefix/Suffix)", nameHi: "उपसर्ग एवं प्रत्यय" },
          { id: "pat-hi-4", name: "Antonyms (विलोम शब्द)", nameHi: "विलोम शब्द (Antonyms)" },
          { id: "pat-hi-5", name: "Synonyms (पर्यायवाची शब्द)", nameHi: "पर्यायवाची शब्द (Synonyms)" },
          { id: "pat-hi-6", name: "Anekarthi Shabd (Multiple Meanings)", nameHi: "अनेकार्थी शब्द" },
          { id: "pat-hi-7", name: "Idioms & Proverbs (मुहावरे)", nameHi: "मुहावरे एवं लोकोक्तियां" },
          { id: "pat-hi-8", name: "Sentence Correction & Spelling", nameHi: "वाक्य शुद्धि एवं वर्तनी शुद्धि" },
          { id: "pat-hi-9", name: "Ras, Chhand, Alankar", nameHi: "रस, छंद, अलंकार" },
          { id: "pat-hi-10", name: "Unseen Passage (अपठित गद्यांश)", nameHi: "अपठित गद्यांश" }
        ]
      },
      {
        name: "गणित एवं तर्कशक्ति",
        nameHi: "गणित एवं तर्कशक्ति",
        topics: [
          { id: "pat-ma-1",  name: "Number System (संख्या पद्धति)", nameHi: "संख्या पद्धति" },
          { id: "pat-ma-2",  name: "Simplification (सरलीकरण)", nameHi: "सरलीकरण" },
          { id: "pat-ma-3",  name: "Percentage (प्रतिशत)", nameHi: "प्रतिशत" },
          { id: "pat-ma-4",  name: "Ratio & Proportion", nameHi: "अनुपात एवं समानुपात" },
          { id: "pat-ma-5",  name: "Profit, Loss & Discount", nameHi: "लाभ, हानि एवं बट्टा" },
          { id: "pat-ma-6",  name: "Simple & Compound Interest", nameHi: "साधारण एवं चक्रवृद्धि ब्याज" },
          { id: "pat-ma-7",  name: "Time & Work", nameHi: "समय एवं कार्य" },
          { id: "pat-ma-8",  name: "Speed, Time & Distance", nameHi: "समय, चाल एवं दूरी" },
          { id: "pat-ma-9",  name: "Mensuration (क्षेत्रमिति)", nameHi: "क्षेत्रमिति" },
          { id: "pat-ma-10", name: "Average & Mixture", nameHi: "औसत एवं मिश्रण" },
          { id: "pat-ma-11", name: "Series & Letter Sequence", nameHi: "श्रृंखला एवं अक्षर श्रेणी" },
          { id: "pat-ma-12", name: "Coding-Decoding", nameHi: "कोडिंग-डिकोडिंग" },
          { id: "pat-ma-13", name: "Blood Relations", nameHi: "रक्त संबंध" },
          { id: "pat-ma-14", name: "Direction Sense", nameHi: "दिशा ज्ञान" },
          { id: "pat-ma-15", name: "Syllogism (न्याय निगमन)", nameHi: "न्याय निगमन (Syllogism)" },
          { id: "pat-ma-16", name: "Venn Diagrams", nameHi: "वेन आरेख" }
        ]
      },
      {
        name: "कंप्यूटर ज्ञान",
        nameHi: "कंप्यूटर ज्ञान",
        topics: [
          { id: "pat-comp-1", name: "Computer Fundamentals", nameHi: "कंप्यूटर की मूल बातें" },
          { id: "pat-comp-2", name: "MS Office — Word, Excel, PowerPoint", nameHi: "MS Office — Word, Excel, PowerPoint" },
          { id: "pat-comp-3", name: "Internet & Email", nameHi: "इंटरनेट एवं ईमेल" },
          { id: "pat-comp-4", name: "Database Management (Basic)", nameHi: "डेटाबेस प्रबंधन (Basic)" },
          { id: "pat-comp-5", name: "Cyber Security Basics", nameHi: "साइबर सुरक्षा की बुनियादी जानकारी" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     2. POLICE CONSTABLE / SUB INSPECTOR (SI)
  ───────────────────────────────────────────────────────────── */
  "cgv_police": {
    name: "Police Constable / SI",
    fullName: "CGVYAPAM — Police Constable & Sub Inspector Exam",
    icon: "👮",
    category: "police",
    description: "Chhattisgarh Police Constable and Sub-Inspector (GD & Executive) recruitment",
    eligibility: "10th Pass (Constable) / 12th Pass (SI)",
    pattern: {
      totalMarks: 100,
      time: "2 Hours",
      type: "Objective MCQ + Physical Test",
      papers: [
        { paper: "सामान्य ज्ञान (GK + CG GK)", marks: 40 },
        { paper: "हिंदी भाषा", marks: 20 },
        { paper: "सामान्य गणित एवं तर्कशक्ति", marks: 30 },
        { paper: "शारीरिक दक्षता परीक्षा (Physical)", marks: "Qualifying" }
      ]
    },
    subjects: [
      {
        name: "सामान्य ज्ञान (General Knowledge)",
        nameHi: "सामान्य ज्ञान",
        topics: [
          { id: "pol-gk-1",  name: "India History — Ancient, Medieval, Modern", nameHi: "भारत का इतिहास — प्राचीन, मध्यकालीन, आधुनिक" },
          { id: "pol-gk-2",  name: "India Geography", nameHi: "भारत का भूगोल" },
          { id: "pol-gk-3",  name: "Indian Constitution & Polity", nameHi: "भारतीय संविधान एवं राजव्यवस्था" },
          { id: "pol-gk-4",  name: "Indian Economy — Basics", nameHi: "भारतीय अर्थव्यवस्था की मूलभूत बातें" },
          { id: "pol-gk-5",  name: "General Science", nameHi: "सामान्य विज्ञान" },
          { id: "pol-gk-6",  name: "National & International Current Affairs", nameHi: "राष्ट्रीय एवं अंतर्राष्ट्रीय करंट अफेयर्स" },
          { id: "pol-gk-7",  name: "Sports & Awards", nameHi: "खेलकूद एवं पुरस्कार" }
        ]
      },
      {
        name: "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        nameHi: "छत्तीसगढ़ सामान्य ज्ञान",
        topics: [
          { id: "pol-cg-1",  name: "CG History", nameHi: "CG का इतिहास" },
          { id: "pol-cg-2",  name: "CG Geography — Rivers, Hills, Sanctuaries", nameHi: "CG का भूगोल — नदियाँ, पहाड़, अभयारण्य" },
          { id: "pol-cg-3",  name: "CG Tribes & Culture", nameHi: "CG की जनजातियाँ एवं संस्कृति" },
          { id: "pol-cg-4",  name: "CG Administration", nameHi: "CG की प्रशासनिक व्यवस्था" },
          { id: "pol-cg-5",  name: "CG Government Schemes", nameHi: "CG की प्रमुख सरकारी योजनाएं" },
          { id: "pol-cg-6",  name: "CG Industries & Minerals", nameHi: "CG के प्रमुख उद्योग एवं खनिज" },
          { id: "pol-cg-7",  name: "CG Forest & Environment", nameHi: "CG का वन एवं पर्यावरण" },
          { id: "pol-cg-8",  name: "CG Police Organization & Functions", nameHi: "CG पुलिस संगठन एवं कार्य" },
          { id: "pol-cg-9",  name: "CG Current Affairs", nameHi: "CG करंट अफेयर्स" }
        ]
      },
      {
        name: "हिंदी भाषा",
        nameHi: "हिंदी भाषा",
        topics: [
          { id: "pol-hi-1", name: "Grammar — Sandhi, Samas, Karak", nameHi: "व्याकरण — संधि, समास, कारक" },
          { id: "pol-hi-2", name: "Vocabulary — Antonyms, Synonyms, Anekarthi", nameHi: "शब्द भंडार — विलोम, पर्यायवाची, अनेकार्थी" },
          { id: "pol-hi-3", name: "Idioms & Proverbs", nameHi: "मुहावरे एवं लोकोक्तियां" },
          { id: "pol-hi-4", name: "Sentence Correction", nameHi: "वाक्य शुद्धि" },
          { id: "pol-hi-5", name: "Unseen Passage", nameHi: "अपठित गद्यांश" }
        ]
      },
      {
        name: "गणित एवं तर्कशक्ति",
        nameHi: "गणित एवं तर्कशक्ति",
        topics: [
          { id: "pol-ma-1",  name: "Number System", nameHi: "संख्या पद्धति" },
          { id: "pol-ma-2",  name: "Percentage, Ratio, Average", nameHi: "प्रतिशत, अनुपात, औसत" },
          { id: "pol-ma-3",  name: "Profit-Loss & Interest", nameHi: "लाभ-हानि एवं ब्याज" },
          { id: "pol-ma-4",  name: "Time & Work", nameHi: "समय एवं कार्य" },
          { id: "pol-ma-5",  name: "Mensuration", nameHi: "क्षेत्रमिति" },
          { id: "pol-ma-6",  name: "Series, Coding, Sequence", nameHi: "श्रृंखला, कोडिंग, अनुक्रम" },
          { id: "pol-ma-7",  name: "Blood Relations, Direction Sense", nameHi: "रक्त संबंध, दिशा ज्ञान" },
          { id: "pol-ma-8",  name: "Syllogism", nameHi: "न्याय निगमन (Syllogism)" },
          { id: "pol-ma-9",  name: "Logical Venn Diagrams", nameHi: "तार्किक वेन आरेख" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     3. FOREST GUARD (वनरक्षक)
  ───────────────────────────────────────────────────────────── */
  "cgv_forest": {
    name: "Forest Guard (वनरक्षक)",
    fullName: "CGVYAPAM — Vanrakshak / Forest Guard Exam",
    icon: "🌳",
    category: "forest",
    description: "Forest Department recruitment including Vanrakshak and Forester Grade posts",
    eligibility: "10th Pass / 12th Pass",
    pattern: {
      totalMarks: 100,
      time: "2 Hours",
      type: "Objective MCQ + Physical Test",
      papers: [
        { paper: "General Knowledge & CG GK", marks: 40 },
        { paper: "Hindi Language", marks: 20 },
        { paper: "Science & Environment", marks: 25 },
        { paper: "Mathematics & Reasoning", marks: 15 }
      ]
    },
    subjects: [
      {
        name: "पर्यावरण एवं वन विज्ञान",
        nameHi: "पर्यावरण एवं वन विज्ञान",
        topics: [
          { id: "for-env-1",  name: "CG Forests & Forest Products", nameHi: "छत्तीसगढ़ के प्रमुख वन एवं वन उत्पाद" },
          { id: "for-env-2",  name: "CG National Parks & Sanctuaries", nameHi: "CG के राष्ट्रीय उद्यान एवं अभयारण्य" },
          { id: "for-env-3",  name: "Wildlife Conservation & Laws", nameHi: "वन्य जीव संरक्षण एवं कानून" },
          { id: "for-env-4",  name: "Tree Species (Sal, Teak, Bamboo etc.)", nameHi: "वृक्षों की प्रजातियाँ (Sal, Teak, Bamboo etc.)" },
          { id: "for-env-5",  name: "Ecosystem Basics", nameHi: "पारिस्थितिकी तंत्र (Ecosystem Basics)" },
          { id: "for-env-6",  name: "Biodiversity & Conservation", nameHi: "जैव विविधता एवं संरक्षण" },
          { id: "for-env-7",  name: "Air, Water & Soil Pollution", nameHi: "वायु, जल एवं मृदा प्रदूषण" },
          { id: "for-env-8",  name: "Climate Change & Global Warming", nameHi: "जलवायु परिवर्तन एवं ग्लोबल वॉर्मिंग" },
          { id: "for-env-9",  name: "Forest Department — Functions & Rights", nameHi: "वन विभाग के कार्य एवं अधिकार" }
        ]
      },
      {
        name: "छत्तीसगढ़ सामान्य ज्ञान",
        nameHi: "छत्तीसगढ़ सामान्य ज्ञान",
        topics: [
          { id: "for-cg-1",  name: "CG Geography — Rivers, Plateaus, Hills", nameHi: "CG का भूगोल — नदियाँ, पठार, पर्वत" },
          { id: "for-cg-2",  name: "CG History", nameHi: "CG का इतिहास" },
          { id: "for-cg-3",  name: "CG Tribes & Forest Culture", nameHi: "CG की जनजातियाँ एवं वनवासी संस्कृति" },
          { id: "for-cg-4",  name: "CG Forest Cover & Area", nameHi: "CG का वन आवरण एवं वन क्षेत्र" },
          { id: "for-cg-5",  name: "CG Environment Schemes", nameHi: "CG सरकार की पर्यावरण योजनाएं" },
          { id: "for-cg-6",  name: "CG Minerals & Natural Resources", nameHi: "CG के खनिज एवं प्राकृतिक संसाधन" }
        ]
      },
      {
        name: "सामान्य ज्ञान एवं विज्ञान",
        nameHi: "सामान्य ज्ञान एवं विज्ञान",
        topics: [
          { id: "for-gk-1",  name: "India Geography & History", nameHi: "भारत का भूगोल एवं इतिहास" },
          { id: "for-gk-2",  name: "Indian Constitution — Basics", nameHi: "भारतीय संविधान की मूल बातें" },
          { id: "for-gk-3",  name: "Biology — Plants & Animals", nameHi: "जीव विज्ञान — पौधे एवं प्राणी" },
          { id: "for-gk-4",  name: "Physics & Chemistry (Class 10)", nameHi: "भौतिकी एवं रसायन विज्ञान (Class 10 Level)" },
          { id: "for-gk-5",  name: "Current Affairs (National + CG)", nameHi: "करंट अफेयर्स (National + CG)" }
        ]
      },
      {
        name: "हिंदी भाषा",
        nameHi: "हिंदी भाषा",
        topics: [
          { id: "for-hi-1", name: "Hindi Grammar", nameHi: "हिंदी व्याकरण" },
          { id: "for-hi-2", name: "Vocabulary", nameHi: "शब्द भंडार" },
          { id: "for-hi-3", name: "Idioms & Proverbs", nameHi: "मुहावरे एवं लोकोक्तियां" },
          { id: "for-hi-4", name: "Sentence Correction", nameHi: "वाक्य शुद्धि" }
        ]
      },
      {
        name: "गणित एवं तर्कशक्ति",
        nameHi: "गणित एवं तर्कशक्ति",
        topics: [
          { id: "for-ma-1", name: "Basic Mathematics (10th Level)", nameHi: "बुनियादी गणित (10th Level)" },
          { id: "for-ma-2", name: "Number Series & Reasoning", nameHi: "संख्या श्रृंखला एवं तर्कशक्ति" },
          { id: "for-ma-3", name: "Blood Relations & Direction Sense", nameHi: "रक्त संबंध, दिशा ज्ञान" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     4. SHIKSHAK / TEACHER (व्याख्याता)
  ───────────────────────────────────────────────────────────── */
  "cgv_teacher": {
    name: "Shikshak / Teacher (TET)",
    fullName: "CGVYAPAM — Teacher Eligibility Test & Shiksha Karmi",
    icon: "📖",
    category: "teaching",
    description: "Primary & Secondary school teacher recruitment including TET, Shiksha Karmi, and Lecturer posts",
    eligibility: "B.Ed / DEd / TET qualified",
    pattern: {
      totalMarks: 150,
      time: "2.5 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "Child Development & Pedagogy", marks: 30 },
        { paper: "Language I — Hindi", marks: 30 },
        { paper: "Language II — English / Sanskrit", marks: 30 },
        { paper: "Subject Specific (Math / Science / Social)", marks: 60 }
      ]
    },
    subjects: [
      {
        name: "बाल विकास एवं शिक्षाशास्त्र (CDP)",
        nameHi: "बाल विकास एवं शिक्षाशास्त्र",
        topics: [
          { id: "tea-cdp-1",  name: "Child Development Concepts & Learning", nameHi: "बाल विकास की अवधारणाएं एवं अधिगम" },
          { id: "tea-cdp-2",  name: "Theories — Piaget, Vygotsky, Kohlberg", nameHi: "Piaget, Vygotsky, Kohlberg का सिद्धांत" },
          { id: "tea-cdp-3",  name: "Intelligence & Multiple Intelligences (Gardner)", nameHi: "बुद्धि एवं बहु-बुद्धि सिद्धांत (Howard Gardner)" },
          { id: "tea-cdp-4",  name: "Learning Problems — Dyslexia, ADHD", nameHi: "अधिगम की समस्याएं — Dyslexia, ADHD" },
          { id: "tea-cdp-5",  name: "Inclusive Education", nameHi: "समावेशी शिक्षा (Inclusive Education)" },
          { id: "tea-cdp-6",  name: "Assessment & Evaluation", nameHi: "मूल्यांकन एवं आकलन" },
          { id: "tea-cdp-7",  name: "NCF 2005 & RTE Act 2009", nameHi: "NCF 2005 एवं RTE Act 2009" },
          { id: "tea-cdp-8",  name: "Motivation & Learning", nameHi: "मोटिवेशन एवं अधिगम" },
          { id: "tea-cdp-9",  name: "Language & Thought Development", nameHi: "भाषा एवं विचार का विकास" }
        ]
      },
      {
        name: "हिंदी भाषा (Language I)",
        nameHi: "हिंदी भाषा (भाषा-I)",
        topics: [
          { id: "tea-hi-1", name: "Hindi Grammar — Complete", nameHi: "हिंदी व्याकरण — संपूर्ण" },
          { id: "tea-hi-2", name: "Hindi Literature — Periods & Works", nameHi: "हिंदी साहित्य — काल एवं प्रमुख रचनाएं" },
          { id: "tea-hi-3", name: "Language Teaching Methods", nameHi: "भाषा अध्यापन की विधियां" },
          { id: "tea-hi-4", name: "Reading & Writing Skills", nameHi: "पठन-लेखन कौशल" },
          { id: "tea-hi-5", name: "Unseen Passage (Prose & Poetry)", nameHi: "अपठित गद्यांश एवं पद्यांश" }
        ]
      },
      {
        name: "अंग्रेजी भाषा (Language II)",
        nameHi: "अंग्रेजी भाषा (भाषा-II)",
        topics: [
          { id: "tea-en-1", name: "English Grammar — Tenses, Articles, Prepositions", nameHi: "English Grammar — All Tenses, Articles, Prepositions" },
          { id: "tea-en-2", name: "Vocabulary — Synonyms, Antonyms, Idioms", nameHi: "Vocabulary — Synonyms, Antonyms, Idioms" },
          { id: "tea-en-3", name: "Reading Comprehension", nameHi: "Reading Comprehension" },
          { id: "tea-en-4", name: "Language Teaching Methodology", nameHi: "Language Teaching Methodology" },
          { id: "tea-en-5", name: "Error Detection & Sentence Correction", nameHi: "Error Detection & Sentence Correction" }
        ]
      },
      {
        name: "गणित एवं विज्ञान (Primary Level)",
        nameHi: "गणित एवं विज्ञान (प्राथमिक स्तर)",
        topics: [
          { id: "tea-ms-1",  name: "Number System & Arithmetic", nameHi: "संख्या प्रणाली एवं अंकगणित" },
          { id: "tea-ms-2",  name: "Algebra Basics", nameHi: "बीजगणित की मूल बातें" },
          { id: "tea-ms-3",  name: "Geometry — Triangles, Circles, Polygons", nameHi: "ज्यामिति — त्रिभुज, वृत्त, बहुभुज" },
          { id: "tea-ms-4",  name: "Mensuration", nameHi: "क्षेत्रमिति (Mensuration)" },
          { id: "tea-ms-5",  name: "General Science — Physics, Chemistry, Biology", nameHi: "सामान्य विज्ञान — भौतिकी, रसायन, जीव" },
          { id: "tea-ms-6",  name: "Environmental Studies", nameHi: "पर्यावरण अध्ययन" }
        ]
      },
      {
        name: "सामाजिक विज्ञान (Social Studies)",
        nameHi: "सामाजिक विज्ञान",
        topics: [
          { id: "tea-ss-1", name: "India History & Civilizations", nameHi: "भारत का इतिहास एवं सभ्यताएं" },
          { id: "tea-ss-2", name: "Geography — India & World", nameHi: "भूगोल — भारत एवं विश्व" },
          { id: "tea-ss-3", name: "Indian Constitution & Polity", nameHi: "भारतीय संविधान एवं राजव्यवस्था" },
          { id: "tea-ss-4", name: "Economics Basics", nameHi: "अर्थशास्त्र की मूल बातें" },
          { id: "tea-ss-5", name: "CG History & Culture", nameHi: "CG का इतिहास एवं संस्कृति" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     5. FOOD INSPECTOR (खाद्य निरीक्षक)
  ───────────────────────────────────────────────────────────── */
  "cgv_food": {
    name: "Food Inspector (खाद्य निरीक्षक)",
    fullName: "CGVYAPAM — Food Inspector Exam",
    icon: "🌾",
    category: "administrative",
    description: "Food & Civil Supplies Department—food inspector, store keeper & allied posts",
    eligibility: "Graduate (Science preferred)",
    pattern: {
      totalMarks: 100,
      time: "2 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "General Knowledge & CG GK", marks: 35 },
        { paper: "Hindi Language", marks: 20 },
        { paper: "Reasoning & Mathematics", marks: 25 },
        { paper: "Food & Science Knowledge", marks: 20 }
      ]
    },
    subjects: [
      {
        name: "खाद्य एवं विज्ञान ज्ञान",
        nameHi: "खाद्य एवं विज्ञान ज्ञान",
        topics: [
          { id: "food-sci-1",  name: "Food Quality & Standards", nameHi: "खाद्य पदार्थों की गुणवत्ता एवं मानक" },
          { id: "food-sci-2",  name: "FSSAI — Food Safety Standards", nameHi: "भारतीय खाद्य सुरक्षा मानक (FSSAI)" },
          { id: "food-sci-3",  name: "Food Adulteration — Tests & Laws", nameHi: "खाद्य अपमिश्रण — जांच एवं कानून" },
          { id: "food-sci-4",  name: "Essential Commodities Act", nameHi: "Essential Commodities Act" },
          { id: "food-sci-5",  name: "CG Public Distribution System (PDS)", nameHi: "CG सार्वजनिक वितरण प्रणाली (PDS)" },
          { id: "food-sci-6",  name: "Foodgrain Procurement & Storage Policy", nameHi: "खाद्यान्न खरीद एवं भंडारण नीति" },
          { id: "food-sci-7",  name: "Chemistry — Acids, Bases, Salts", nameHi: "रसायन विज्ञान — अम्ल, क्षार, लवण" },
          { id: "food-sci-8",  name: "Biology — Nutrition & Health", nameHi: "जीव विज्ञान — पोषण एवं स्वास्थ्य" }
        ]
      },
      {
        name: "छत्तीसगढ़ एवं भारत सामान्य ज्ञान",
        nameHi: "छत्तीसगढ़ एवं भारत सामान्य ज्ञान",
        topics: [
          { id: "food-gk-1",  name: "CG History, Geography, Polity", nameHi: "CG का इतिहास, भूगोल, राजव्यवस्था" },
          { id: "food-gk-2",  name: "CG Food & Agriculture Policy", nameHi: "CG की खाद्य व कृषि नीति" },
          { id: "food-gk-3",  name: "Indian Constitution & Polity", nameHi: "भारतीय संविधान एवं राजव्यवस्था" },
          { id: "food-gk-4",  name: "Indian Economy — Agriculture", nameHi: "भारतीय अर्थव्यवस्था — कृषि" },
          { id: "food-gk-5",  name: "National & CG Current Affairs", nameHi: "राष्ट्रीय एवं CG करंट अफेयर्स" }
        ]
      },
      {
        name: "हिंदी भाषा",
        nameHi: "हिंदी भाषा",
        topics: [
          { id: "food-hi-1", name: "Hindi Grammar", nameHi: "हिंदी व्याकरण" },
          { id: "food-hi-2", name: "Vocabulary & Idioms", nameHi: "शब्द भंडार एवं मुहावरे" },
          { id: "food-hi-3", name: "Sentence Correction", nameHi: "वाक्य शुद्धि" }
        ]
      },
      {
        name: "गणित एवं तर्कशक्ति",
        nameHi: "गणित एवं तर्कशक्ति",
        topics: [
          { id: "food-ma-1", name: "Basic Mathematics", nameHi: "बुनियादी गणित" },
          { id: "food-ma-2", name: "Number Series & Reasoning", nameHi: "संख्या श्रृंखला एवं तर्क" },
          { id: "food-ma-3", name: "Problem Solving & Data Interpretation", nameHi: "समस्या समाधान एवं डेटा व्याख्या" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     6. SUB ENGINEER — CIVIL / ELECTRICAL / MECHANICAL
  ───────────────────────────────────────────────────────────── */
  "cgv_sub_eng": {
    name: "Sub Engineer (Civil/Elec./Mech.)",
    fullName: "CGVYAPAM — Sub Engineer (Civil, Electrical, Mechanical) Exam",
    icon: "⚙️",
    category: "technical",
    description: "PWD, PHE & Electrical Department sub-engineer recruitment",
    eligibility: "Diploma in Engineering (Civil/Electrical/Mechanical)",
    pattern: {
      totalMarks: 150,
      time: "3 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "सामान्य ज्ञान एवं हिंदी (GK + Hindi)", marks: 50 },
        { paper: "Technical Subject (Civil/Elec./Mech.)", marks: 100 }
      ]
    },
    subjects: [
      {
        name: "Civil Engineering — Diploma Level",
        nameHi: "सिविल इंजीनियरिंग — डिप्लोमा स्तर",
        topics: [
          { id: "se-civ-1",  name: "Building Materials — Brick, Cement, Steel, Timber", nameHi: "निर्माण सामग्री — ईंट, सीमेंट, स्टील, लकड़ी" },
          { id: "se-civ-2",  name: "Surveying — Chain, Compass, Levelling", nameHi: "सर्वेक्षण — चेन, कम्पास, लेवलिंग" },
          { id: "se-civ-3",  name: "Soil Mechanics — Classification, Bearing Capacity", nameHi: "मृदा यांत्रिकी — वर्गीकरण, वहन क्षमता" },
          { id: "se-civ-4",  name: "Concrete Technology — Mix Design, Testing", nameHi: "कंक्रीट तकनीक — मिक्स डिजाइन, परीक्षण" },
          { id: "se-civ-5",  name: "Structural Analysis — Beams, Columns, Slabs", nameHi: "संरचनात्मक विश्लेषण — बीम, स्तंभ, स्लैब" },
          { id: "se-civ-6",  name: "RCC Design — IS Code Basics", nameHi: "RCC डिजाइन — IS Code Basics" },
          { id: "se-civ-7",  name: "Road Construction — BT, WBM, Flexible Pavement", nameHi: "सड़क निर्माण — BT, WBM, लचीला फुटपाथ" },
          { id: "se-civ-8",  name: "Irrigation Engineering — CG Projects", nameHi: "सिंचाई इंजीनियरिंग — CG परियोजनाएं" },
          { id: "se-civ-9",  name: "Water Supply & Sanitation", nameHi: "जल आपूर्ति एवं स्वच्छता" },
          { id: "se-civ-10", name: "Estimating, Costing & Valuation", nameHi: "अनुमान, लागत एवं मूल्यांकन" },
          { id: "se-civ-11", name: "Drawing & Specification Reading", nameHi: "ड्राइंग एवं विशिष्टता पठन" }
        ]
      },
      {
        name: "Electrical Engineering — Diploma Level",
        nameHi: "विद्युत इंजीनियरिंग — डिप्लोमा स्तर",
        topics: [
          { id: "se-ele-1",  name: "Basic Electrical — Ohm's Law, KVL, KCL", nameHi: "बुनियादी विद्युत — ओम का नियम, KVL, KCL" },
          { id: "se-ele-2",  name: "AC Circuits — Single & Three Phase", nameHi: "AC परिपथ — एकल एवं तीन चरण" },
          { id: "se-ele-3",  name: "Transformers — Types, Working, Tests", nameHi: "ट्रांसफार्मर — प्रकार, कार्यप्र णाली, परीक्षण" },
          { id: "se-ele-4",  name: "DC & AC Machines", nameHi: "DC एवं AC मशीनें" },
          { id: "se-ele-5",  name: "Power Systems — Transmission & Distribution", nameHi: "शक्ति तंत्र — पारेषण एवं वितरण" },
          { id: "se-ele-6",  name: "Control Systems Basics", nameHi: "नियंत्रण तंत्र की मूल बातें" },
          { id: "se-ele-7",  name: "Electrical Wiring, Earthing & Protection", nameHi: "विद्युत वायरिंग, अर्थिंग एवं सुरक्षा" },
          { id: "se-ele-8",  name: "Electronics Basics — Diodes, Transistors", nameHi: "इलेक्ट्रॉनिक्स — डायोड, ट्रांजिस्टर" },
          { id: "se-ele-9",  name: "Electrical Measurements & Instruments", nameHi: "विद्युत मापन एवं उपकरण" }
        ]
      },
      {
        name: "Mechanical Engineering — Diploma Level",
        nameHi: "यांत्रिक इंजीनियरिंग — डिप्लोमा स्तर",
        topics: [
          { id: "se-mec-1",  name: "Engineering Mechanics — Statics & Dynamics", nameHi: "इंजीनियरिंग मैकेनिक्स — स्थैतिकी एवं गतिकी" },
          { id: "se-mec-2",  name: "Strength of Materials", nameHi: "सामग्री की शक्ति" },
          { id: "se-mec-3",  name: "Thermodynamics & Heat Engines", nameHi: "ऊष्मागतिकी एवं ताप इंजन" },
          { id: "se-mec-4",  name: "Manufacturing Processes", nameHi: "विनिर्माण प्रक्रियाएं" },
          { id: "se-mec-5",  name: "Machine Design — Basics", nameHi: "मशीन डिजाइन — मूल बातें" },
          { id: "se-mec-6",  name: "Fluid Mechanics & Hydraulics", nameHi: "तरल यांत्रिकी एवं जलगतिकी" },
          { id: "se-mec-7",  name: "Workshop Technology & Metrology", nameHi: "वर्कशाप तकनीक एवं मेट्रोलॉजी" }
        ]
      },
      {
        name: "सामान्य ज्ञान एवं हिंदी",
        nameHi: "सामान्य ज्ञान एवं हिंदी",
        topics: [
          { id: "se-gk-1", name: "CG History, Geography, Polity", nameHi: "CG इतिहास, भूगोल, राजव्यवस्था" },
          { id: "se-gk-2", name: "India History & Geography", nameHi: "भारत का इतिहास एवं भूगोल" },
          { id: "se-gk-3", name: "Indian Constitution", nameHi: "भारतीय संविधान" },
          { id: "se-gk-4", name: "Science & Technology Current Affairs", nameHi: "विज्ञान एवं प्रौद्योगिकी करंट अफेयर्स" },
          { id: "se-gk-5", name: "Hindi Grammar & Vocabulary", nameHi: "हिंदी व्याकरण एवं शब्द भंडार" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     7. NAIB TEHSILDAR / DEPUTY COLLECTOR EXAM (CGPSC-CGVYAPAM Allied)
  ───────────────────────────────────────────────────────────── */
  "cgv_naib": {
    name: "Naib Tehsildar / Revenue",
    fullName: "CGVYAPAM — Naib Tehsildar & Revenue Dept. Exam",
    icon: "🏢",
    category: "administrative",
    description: "Revenue & district administration recruitment — Naib Tehsildar, RI, Peon posts",
    eligibility: "Graduate",
    pattern: {
      totalMarks: 200,
      time: "3 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "Paper-I: General Studies & CG GK", marks: 100 },
        { paper: "Paper-II: Hindi & Reasoning / Aptitude", marks: 100 }
      ]
    },
    subjects: [
      {
        name: "सामान्य अध्ययन — भारत (General Studies)",
        nameHi: "सामान्य अध्ययन (भारत)",
        topics: [
          { id: "nt-gs-1",  name: "India History — Ancient, Medieval", nameHi: "भारत का इतिहास — प्राचीन, मध्यकालीन" },
          { id: "nt-gs-2",  name: "India History — Modern Period", nameHi: "भारत का इतिहास — आधुनिक काल" },
          { id: "nt-gs-3",  name: "India Geography", nameHi: "भारत का भूगोल" },
          { id: "nt-gs-4",  name: "Indian Constitution — Fundamental Rights, DPSP", nameHi: "भारतीय संविधान — मूल अधिकार, DPSP" },
          { id: "nt-gs-5",  name: "Indian Polity — Centre, State, Judiciary", nameHi: "भारतीय राजव्यवस्था — केंद्र, राज्य, न्यायपालिका" },
          { id: "nt-gs-6",  name: "Indian Economy", nameHi: "भारतीय अर्थव्यवस्था" },
          { id: "nt-gs-7",  name: "General Science", nameHi: "सामान्य विज्ञान" },
          { id: "nt-gs-8",  name: "Environment & Ecology", nameHi: "पर्यावरण एवं पारिस्थितिकी" },
          { id: "nt-gs-9",  name: "National Current Affairs", nameHi: "राष्ट्रीय करंट अफेयर्स" }
        ]
      },
      {
        name: "छत्तीसगढ़ विशेष GK (CG Special)",
        nameHi: "छत्तीसगढ़ विशेष GK",
        topics: [
          { id: "nt-cg-1",  name: "CG History — Ancient to Modern", nameHi: "CG का इतिहास — प्राचीन से आधुनिक" },
          { id: "nt-cg-2",  name: "CG Geography — Rivers, Climate, Soil", nameHi: "CG का भूगोल — नदी, जलवायु, मिट्टी" },
          { id: "nt-cg-3",  name: "CG Tribes & Social Structure", nameHi: "CG की जनजातियाँ एवं सामाजिक संरचना" },
          { id: "nt-cg-4",  name: "CG Culture, Art & Literature", nameHi: "CG की संस्कृति, कला एवं साहित्य" },
          { id: "nt-cg-5",  name: "CG Administrative Structure", nameHi: "CG की प्रशासनिक संरचना" },
          { id: "nt-cg-6",  name: "CG Economy & Agriculture", nameHi: "CG की अर्थव्यवस्था एवं कृषि" },
          { id: "nt-cg-7",  name: "CG Industries & Mineral Wealth", nameHi: "CG के उद्योग एवं खनिज संपदा" },
          { id: "nt-cg-8",  name: "CG Flagship Government Schemes", nameHi: "CG सरकार की फ्लैगशिप योजनाएं" },
          { id: "nt-cg-9",  name: "CG Current Affairs", nameHi: "CG की वर्तमान घटनाएं" },
          { id: "nt-cg-10", name: "Revenue Administration & Land Records", nameHi: "राजस्व प्रशासन एवं भूमि अभिलेख प्रणाली" }
        ]
      },
      {
        name: "हिंदी भाषा (विस्तृत)",
        nameHi: "हिंदी भाषा (विस्तृत)",
        topics: [
          { id: "nt-hi-1",  name: "Hindi Grammar — Sandhi, Samas, Karak, Vachan", nameHi: "हिंदी व्याकरण — संधि, समास, कारक, वचन" },
          { id: "nt-hi-2",  name: "Upsarg, Pratyay, Tatsam-Tadbhav", nameHi: "उपसर्ग, प्रत्यय, तत्सम-तद्भव" },
          { id: "nt-hi-3",  name: "Antonyms, Synonyms, Multi-meaning Words", nameHi: "विलोम, पर्यायवाची, अनेकार्थी शब्द" },
          { id: "nt-hi-4",  name: "Idioms & Proverbs", nameHi: "मुहावरे एवं लोकोक्तियां" },
          { id: "nt-hi-5",  name: "Sentence Correction & Spelling", nameHi: "वाक्य शुद्धि एवं वर्तनी" },
          { id: "nt-hi-6",  name: "Hindi Authors & Literary Works", nameHi: "हिंदी साहित्यकार एवं रचनाएं" },
          { id: "nt-hi-7",  name: "Unseen Passage", nameHi: "अपठित गद्यांश" }
        ]
      },
      {
        name: "तर्कशक्ति एवं अभिक्षमता",
        nameHi: "तर्कशक्ति एवं अभिक्षमता",
        topics: [
          { id: "nt-re-1",  name: "Number Series & Letter Sequence", nameHi: "संख्या श्रृंखला एवं अक्षर श्रेणी" },
          { id: "nt-re-2",  name: "Coding-Decoding", nameHi: "कोडिंग-डिकोडिंग" },
          { id: "nt-re-3",  name: "Blood Relations", nameHi: "रक्त संबंध" },
          { id: "nt-re-4",  name: "Direction & Distance", nameHi: "दिशा एवं दूरी" },
          { id: "nt-re-5",  name: "Syllogism", nameHi: "न्याय निगमन (Syllogism)" },
          { id: "nt-re-6",  name: "Ranking & Arrangement", nameHi: "क्रम व्यवस्था (Ranking & Arrangement)" },
          { id: "nt-re-7",  name: "Data Sufficiency", nameHi: "डेटा पर्याप्तता" },
          { id: "nt-re-8",  name: "Numerical Aptitude", nameHi: "संख्यात्मक अभिक्षमता (Numeracy)" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     8. NURSING / HEALTH DEPARTMENT (ANM / Staff Nurse / Mitanin)
  ───────────────────────────────────────────────────────────── */
  "cgv_health": {
    name: "Staff Nurse / ANM / Health",
    fullName: "CGVYAPAM — Staff Nurse, ANM & Health Department Exam",
    icon: "🏥",
    category: "health",
    description: "Health department recruitment — Staff Nurse, ANM, Lab Technician, Pharmacist",
    eligibility: "ANM / GNM / B.Sc Nursing",
    pattern: {
      totalMarks: 150,
      time: "2.5 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "General Knowledge & CG GK", marks: 30 },
        { paper: "Hindi Language", marks: 20 },
        { paper: "Nursing / Health Subject", marks: 100 }
      ]
    },
    subjects: [
      {
        name: "Nursing & Health Science",
        nameHi: "नर्सिंग एवं स्वास्थ्य विज्ञान",
        topics: [
          { id: "nur-1",  name: "Anatomy & Physiology — Human Body Systems", nameHi: "शारीरिक रचना एवं शरीर क्रिया विज्ञान" },
          { id: "nur-2",  name: "Microbiology — Bacteria, Virus, Fungi", nameHi: "सूक्ष्म जीव विज्ञान — बैक्टीरिया, वायरस, फफूंद" },
          { id: "nur-3",  name: "Pharmacology Basics — Drug Classification", nameHi: "फार्माकोलॉजी — औषधि वर्गीकरण" },
          { id: "nur-4",  name: "Community Health Nursing", nameHi: "सामुदायिक स्वास्थ्य नर्सिंग" },
          { id: "nur-5",  name: "Child Health Nursing (Paediatric)", nameHi: "बाल स्वास्थ्य नर्सिंग (Paediatric)" },
          { id: "nur-6",  name: "Midwifery & Obstetric Nursing", nameHi: "प्रसूति एवं स्त्री रोग नर्सिंग" },
          { id: "nur-7",  name: "Medical-Surgical Nursing", nameHi: "चिकित्सा-शल्य नर्सिंग" },
          { id: "nur-8",  name: "Mental Health Nursing", nameHi: "मानसिक स्वास्थ्य नर्सिंग" },
          { id: "nur-9",  name: "First Aid & Emergency Care", nameHi: "प्राथमिक चिकित्सा एवं आपातकालीन देखभाल" },
          { id: "nur-10", name: "Nutrition & Dietetics", nameHi: "पोषण एवं आहार विज्ञान" },
          { id: "nur-11", name: "National Health Programs (NHM, Ayushman etc.)", nameHi: "राष्ट्रीय स्वास्थ्य कार्यक्रम (NHM, आयुष्मान आदि)" },
          { id: "nur-12", name: "CG Health Schemes — Mukhyamantri Suposhan, etc.", nameHi: "CG स्वास्थ्य योजनाएं — मुख्यमंत्री सुपोषण आदि" }
        ]
      },
      {
        name: "सामान्य ज्ञान (CG + India)",
        nameHi: "सामान्य ज्ञान (CG + भारत)",
        topics: [
          { id: "nur-gk-1", name: "CG History, Geography & Culture", nameHi: "CG का इतिहास, भूगोल, संस्कृति" },
          { id: "nur-gk-2", name: "Indian Constitution & Health Rights", nameHi: "भारतीय संविधान एवं स्वास्थ्य अधिकार" },
          { id: "nur-gk-3", name: "National & CG Health Current Affairs", nameHi: "राष्ट्रीय एवं CG स्वास्थ्य करंट अफेयर्स" }
        ]
      },
      {
        name: "हिंदी भाषा",
        nameHi: "हिंदी भाषा",
        topics: [
          { id: "nur-hi-1", name: "Hindi Grammar", nameHi: "हिंदी व्याकरण" },
          { id: "nur-hi-2", name: "Vocabulary & Sentence Correction", nameHi: "शब्द भंडार एवं वाक्य शुद्धि" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     9. ACCOUNTANT / JUNIOR ACCOUNTANT
  ───────────────────────────────────────────────────────────── */
  "cgv_accountant": {
    name: "Accountant / Junior Accountant",
    fullName: "CGVYAPAM — Accountant & Junior Accountant Exam",
    icon: "💼",
    category: "administrative",
    description: "Treasury, Finance & Accounts department recruitment for Accountant and Junior Accountant posts",
    eligibility: "B.Com / Graduate with Accounts",
    pattern: {
      totalMarks: 200,
      time: "3 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "General Knowledge & CG GK", marks: 50 },
        { paper: "Hindi Language", marks: 25 },
        { paper: "Reasoning & Mathematics", marks: 50 },
        { paper: "Accountancy & Commerce", marks: 75 }
      ]
    },
    subjects: [
      {
        name: "लेखाशास्त्र (Accountancy)",
        nameHi: "लेखाशास्त्र",
        topics: [
          { id: "acc-1",  name: "Fundamentals of Accounting — Concepts & Principles", nameHi: "लेखांकन की मूल अवधारणाएं एवं सिद्धांत" },
          { id: "acc-2",  name: "Journal, Ledger & Trial Balance", nameHi: "जर्नल, खाता बही एवं तलपट" },
          { id: "acc-3",  name: "Final Accounts — P&L, Balance Sheet", nameHi: "अंतिम खाते — P&L, Balance Sheet" },
          { id: "acc-4",  name: "Depreciation Methods (SLM & WDV)", nameHi: "मूल्यह्रास विधियां (SLM & WDV)" },
          { id: "acc-5",  name: "Bank Reconciliation Statement (BRS)", nameHi: "बैंक समाधान विवरण (BRS)" },
          { id: "acc-6",  name: "Partnership Accounts — Admission, Retirement", nameHi: "साझेदारी खाते — प्रवेश, निवृत्ति" },
          { id: "acc-7",  name: "Company Accounts — Shares & Debentures", nameHi: "कंपनी खाते — शेयर एवं ऋणपत्र" },
          { id: "acc-8",  name: "Ratio Analysis & Financial Statement Analysis", nameHi: "अनुपात विश्लेषण एवं वित्तीय विवरण विश्लेषण" },
          { id: "acc-9",  name: "GST — Basics & Application", nameHi: "GST — मूल बातें एवं अनुप्रयोग" },
          { id: "acc-10", name: "Government Accounting — CG Treasury Rules", nameHi: "सरकारी लेखांकन — CG कोषागार नियम" },
          { id: "acc-11", name: "Tally ERP / Computer Accounting", nameHi: "Tally ERP / कंप्यूटर लेखांकन" },
          { id: "acc-12", name: "Auditing Basics", nameHi: "लेखापरीक्षण की मूल बातें" }
        ]
      },
      {
        name: "वाणिज्य एवं अर्थशास्त्र (Commerce)",
        nameHi: "वाणिज्य एवं अर्थशास्त्र",
        topics: [
          { id: "acc-com-1", name: "Business Organization — Types of Companies", nameHi: "व्यापारिक संगठन — कंपनी के प्रकार" },
          { id: "acc-com-2", name: "Banking & Financial Services", nameHi: "बैंकिंग एवं वित्तीय सेवाएं" },
          { id: "acc-com-3", name: "Insurance — Types & Principles", nameHi: "बीमा — प्रकार एवं सिद्धांत" },
          { id: "acc-com-4", name: "Indian Tax System — Income Tax, GST", nameHi: "भारतीय कर प्रणाली — आयकर, GST" },
          { id: "acc-com-5", name: "Budget & Finance Bill", nameHi: "बजट एवं वित्त विधेयक" },
          { id: "acc-com-6", name: "Indian Economy — Money & Credit", nameHi: "भारतीय अर्थव्यवस्था — मुद्रा एवं साख" }
        ]
      },
      {
        name: "गणित एवं तर्कशक्ति",
        nameHi: "गणित एवं तर्कशक्ति",
        topics: [
          { id: "acc-ma-1", name: "Arithmetic — Percentage, Ratio, Profit-Loss", nameHi: "अंकगणित — प्रतिशत, अनुपात, लाभ-हानि" },
          { id: "acc-ma-2", name: "Simple & Compound Interest", nameHi: "साधारण एवं चक्रवृद्धि ब्याज" },
          { id: "acc-ma-3", name: "Data Interpretation — Tables, Charts", nameHi: "डेटा व्याख्या — तालिकाएं, चार्ट" },
          { id: "acc-ma-4", name: "Logical Reasoning & Aptitude", nameHi: "तार्किक तर्कशक्ति एवं अभिक्षमता" },
          { id: "acc-ma-5", name: "Number Series & Coding-Decoding", nameHi: "संख्या श्रृंखला एवं कोडिंग-डिकोडिंग" }
        ]
      },
      {
        name: "छत्तीसगढ़ एवं भारत सामान्य ज्ञान",
        nameHi: "छत्तीसगढ़ एवं भारत सामान्य ज्ञान",
        topics: [
          { id: "acc-gk-1", name: "CG History, Geography & Administration", nameHi: "CG का इतिहास, भूगोल एवं प्रशासन" },
          { id: "acc-gk-2", name: "CG Budget & Finance Department", nameHi: "CG बजट एवं वित्त विभाग" },
          { id: "acc-gk-3", name: "Indian Constitution & Financial Laws", nameHi: "भारतीय संविधान एवं वित्तीय कानून" },
          { id: "acc-gk-4", name: "National & CG Current Affairs", nameHi: "राष्ट्रीय एवं CG करंट अफेयर्स" }
        ]
      },
      {
        name: "हिंदी भाषा",
        nameHi: "हिंदी भाषा",
        topics: [
          { id: "acc-hi-1", name: "Hindi Grammar — Complete", nameHi: "हिंदी व्याकरण" },
          { id: "acc-hi-2", name: "Official & Business Hindi Writing", nameHi: "कार्यालयी एवं व्यापारिक हिंदी लेखन" },
          { id: "acc-hi-3", name: "Vocabulary, Idioms & Proverbs", nameHi: "शब्द भंडार, मुहावरे एवं लोकोक्तियां" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     10. STENO / DATA ENTRY OPERATOR (DEO)
  ───────────────────────────────────────────────────────────── */
  "cgv_steno_deo": {
    name: "Steno / Data Entry Operator",
    fullName: "CGVYAPAM — Stenographer & Data Entry Operator Exam",
    icon: "⌨️",
    category: "administrative",
    description: "Secretariat & government office recruitment for Steno, DEO & Typist posts",
    eligibility: "12th Pass + Typing/Steno Speed Certificate",
    pattern: {
      totalMarks: 100,
      time: "2 Hours + Skill Test",
      type: "Objective MCQ + Typing/Steno Test",
      papers: [
        { paper: "General Knowledge & CG GK", marks: 30 },
        { paper: "Hindi Language", marks: 25 },
        { paper: "Computer & MS Office", marks: 20 },
        { paper: "General Reasoning", marks: 25 },
        { paper: "Steno / Typing Speed Test", marks: "Qualifying" }
      ]
    },
    subjects: [
      {
        name: "कंप्यूटर एवं टाइपिंग कौशल",
        nameHi: "कंप्यूटर एवं टाइपिंग कौशल",
        topics: [
          { id: "deo-comp-1", name: "Computer Fundamentals & Operating System", nameHi: "कंप्यूटर की मूल बातें एवं ऑपरेटिंग सिस्टम" },
          { id: "deo-comp-2", name: "MS Word — Formatting, Tables, Mail Merge", nameHi: "MS Word — फॉर्मेटिंग, टेबल, मेल मर्ज" },
          { id: "deo-comp-3", name: "MS Excel — Formulas, Charts, VLOOKUP", nameHi: "MS Excel — सूत्र, चार्ट, VLOOKUP" },
          { id: "deo-comp-4", name: "MS PowerPoint — Presentation Skills", nameHi: "MS PowerPoint — प्रेजेंटेशन कौशल" },
          { id: "deo-comp-5", name: "Internet, Email & Cyber Safety", nameHi: "इंटरनेट, ईमेल एवं साइबर सुरक्षा" },
          { id: "deo-comp-6", name: "Hindi & English Typing — Speed & Accuracy", nameHi: "हिंदी एवं अंग्रेजी टाइपिंग — गति एवं शुद्धता" },
          { id: "deo-comp-7", name: "Shorthand / Stenography Basics", nameHi: "आशुलिपि / स्टेनोग्राफी मूल बातें" },
          { id: "deo-comp-8", name: "Database & Spreadsheet Management", nameHi: "डेटाबेस एवं स्प्रेडशीट प्रबंधन" }
        ]
      },
      {
        name: "हिंदी भाषा (विस्तृत)",
        nameHi: "हिंदी भाषा (विस्तृत)",
        topics: [
          { id: "deo-hi-1", name: "Hindi Grammar — Comprehensive", nameHi: "हिंदी व्याकरण — संपूर्ण" },
          { id: "deo-hi-2", name: "Official Hindi — Note, Letter, Report Writing", nameHi: "कार्यालयी हिंदी — नोट, पत्र, रिपोर्ट लेखन" },
          { id: "deo-hi-3", name: "Vocabulary, Synonyms, Antonyms", nameHi: "शब्द भंडार — पर्यायवाची, विलोम शब्द" },
          { id: "deo-hi-4", name: "Idioms & Proverbs", nameHi: "मुहावरे एवं लोकोक्तियां" },
          { id: "deo-hi-5", name: "Unseen Passage & Precis Writing", nameHi: "अपठित गद्यांश एवं संक्षेपण" }
        ]
      },
      {
        name: "सामान्य ज्ञान (CG + India)",
        nameHi: "सामान्य ज्ञान (CG + भारत)",
        topics: [
          { id: "deo-gk-1", name: "CG History, Geography & Culture", nameHi: "CG का इतिहास, भूगोल एवं संस्कृति" },
          { id: "deo-gk-2", name: "CG Administration & Government Schemes", nameHi: "CG प्रशासन एवं सरकारी योजनाएं" },
          { id: "deo-gk-3", name: "India History & Geography", nameHi: "भारत का इतिहास एवं भूगोल" },
          { id: "deo-gk-4", name: "Indian Constitution Basics", nameHi: "भारतीय संविधान की मूल बातें" },
          { id: "deo-gk-5", name: "National & CG Current Affairs", nameHi: "राष्ट्रीय एवं CG करंट अफेयर्स" }
        ]
      },
      {
        name: "तर्कशक्ति (General Reasoning)",
        nameHi: "सामान्य तर्कशक्ति",
        topics: [
          { id: "deo-re-1", name: "Series & Pattern Recognition", nameHi: "श्रृंखला एवं पैटर्न पहचान" },
          { id: "deo-re-2", name: "Coding-Decoding & Analogy", nameHi: "कोडिंग-डिकोडिंग एवं सादृश्य" },
          { id: "deo-re-3", name: "Blood Relations & Direction", nameHi: "रक्त संबंध एवं दिशा ज्ञान" },
          { id: "deo-re-4", name: "Arrangement & Ranking", nameHi: "क्रम व्यवस्था एवं रैंकिंग" },
          { id: "deo-re-5", name: "Data Sufficiency & Logical Reasoning", nameHi: "डेटा पर्याप्तता एवं तार्किक तर्क" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     11. LAB TECHNICIAN / RADIOGRAPHER
  ───────────────────────────────────────────────────────────── */
  "cgv_lab_tech": {
    name: "Lab Technician / Radiographer",
    fullName: "CGVYAPAM — Laboratory Technician & Allied Health Science Exam",
    icon: "🔬",
    category: "health",
    description: "Health department recruitment for Lab Technician, Radiographer, Physiotherapist & allied posts",
    eligibility: "DMLT / B.Sc MLT / Diploma in relevant field",
    pattern: {
      totalMarks: 150,
      time: "2.5 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "General Knowledge & CG GK", marks: 30 },
        { paper: "Hindi Language", marks: 20 },
        { paper: "Technical Subject (Lab Science)", marks: 100 }
      ]
    },
    subjects: [
      {
        name: "Laboratory Science — Technical",
        nameHi: "प्रयोगशाला विज्ञान — तकनीकी",
        topics: [
          { id: "lab-1",  name: "Human Anatomy & Physiology", nameHi: "मानव शारीरिक रचना एवं शरीर क्रिया विज्ञान" },
          { id: "lab-2",  name: "Biochemistry — Blood, Urine, Serum Analysis", nameHi: "जैव रसायन — रक्त, मूत्र, सीरम विश्लेषण" },
          { id: "lab-3",  name: "Haematology — CBC, Blood Groups, ESR", nameHi: "रुधिर विज्ञान — CBC, रक्त समूह, ESR" },
          { id: "lab-4",  name: "Microbiology & Serology", nameHi: "सूक्ष्म जीव विज्ञान एवं सीरो विज्ञान" },
          { id: "lab-5",  name: "Histopathology & Cytology", nameHi: "ऊतक विकृति विज्ञान एवं कोशिका विज्ञान" },
          { id: "lab-6",  name: "Radiology & Imaging — X-Ray, CT, MRI, USG", nameHi: "रेडियोलॉजी एवं इमेजिंग — X-Ray, CT, MRI" },
          { id: "lab-7",  name: "Laboratory Equipment & Quality Control", nameHi: "प्रयोगशाला उपकरण एवं गुणवत्ता नियंत्रण" },
          { id: "lab-8",  name: "Clinical Pathology — Stool, Sputum Tests", nameHi: "क्लिनिकल पैथोलॉजी — मल, थूक परीक्षण" },
          { id: "lab-9",  name: "Blood Banking & Transfusion", nameHi: "रक्त बैंकिंग एवं आधान" },
          { id: "lab-10", name: "Lab Safety & Biosafety Protocols", nameHi: "प्रयोगशाला सुरक्षा एवं जैव सुरक्षा नियम" },
          { id: "lab-11", name: "National & CG Health Programs", nameHi: "राष्ट्रीय एवं CG स्वास्थ्य कार्यक्रम" }
        ]
      },
      {
        name: "जीव विज्ञान एवं रसायन (Supporting Science)",
        nameHi: "जीव विज्ञान एवं रसायन",
        topics: [
          { id: "lab-bio-1", name: "Cell Biology & Genetics", nameHi: "कोशिका जीव विज्ञान एवं आनुवंशिकी" },
          { id: "lab-bio-2", name: "Organic Chemistry — Functional Groups", nameHi: "कार्बनिक रसायन — कार्यात्मक समूह" },
          { id: "lab-bio-3", name: "Immunology Basics", nameHi: "प्रतिरक्षा विज्ञान की मूल बातें" },
          { id: "lab-bio-4", name: "Enzymes & Hormones", nameHi: "एंजाइम एवं हार्मोन" }
        ]
      },
      {
        name: "सामान्य ज्ञान (CG + India)",
        nameHi: "सामान्य ज्ञान",
        topics: [
          { id: "lab-gk-1", name: "CG History, Geography & Culture", nameHi: "CG का इतिहास, भूगोल एवं संस्कृति" },
          { id: "lab-gk-2", name: "Indian Constitution & Health Rights", nameHi: "भारतीय संविधान एवं स्वास्थ्य अधिकार" },
          { id: "lab-gk-3", name: "National Health Programs & CG Health Schemes", nameHi: "राष्ट्रीय स्वास्थ्य कार्यक्रम एवं CG स्वास्थ्य योजनाएं" }
        ]
      },
      {
        name: "हिंदी भाषा",
        nameHi: "हिंदी भाषा",
        topics: [
          { id: "lab-hi-1", name: "Hindi Grammar", nameHi: "हिंदी व्याकरण" },
          { id: "lab-hi-2", name: "Vocabulary & Sentence Correction", nameHi: "शब्द भंडार एवं वाक्य शुद्धि" }
        ]
      }
    ]
  }

};
