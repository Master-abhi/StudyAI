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
  },

  /* ─────────────────────────────────────────────────────────────
     12. CG VYAPAM BASICS
  ───────────────────────────────────────────────────────────── */
  "cgv_master": {
    name: "CG VYAPAM BASICS",
    fullName: "Chhattisgarh Vyapam All subjects",
    icon: "🏛️",
    stage: "Prelims",
    daysRemaining: 365,
    totalMarks: 100,
    subjects: [
      {
        id: "cgv_master_sub_0",
        name: "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        weightage: 20,
        importance: "High",
        pyqFrequency: "High",
        isCgSpecific: true,
        chapters: [
          {
            id: "cgv_master_sub_0_ch_1",
            name: "छत्तीसगढ़ का इतिहास",
            topics: [
              { id: "cg_hist_1", name: "Prehistoric Chhattisgarh", nameHi: "प्रागैतिहासिक छत्तीसगढ़", subtopics: ["शैलचित्र", "पुरातात्विक साक्ष्य", "प्रमुख स्थल"], importanceScore: 9 },
              { id: "cg_hist_2", name: "Ancient Chhattisgarh", nameHi: "प्राचीन छत्तीसगढ़", subtopics: ["दक्षिण कोसल", "प्राचीन राजवंश", "सांस्कृतिक विकास"], importanceScore: 10 },
              { id: "cg_hist_3", name: "Nanda & Maurya Period", nameHi: "नंद एवं मौर्य काल", subtopics: ["मौर्य प्रशासन", "अशोक", "अभिलेख"], importanceScore: 8 },
              { id: "cg_hist_4", name: "Satavahana Period", nameHi: "सातवाहन काल", subtopics: ["शासन व्यवस्था", "सांस्कृतिक प्रभाव"], importanceScore: 7 },
              { id: "cg_hist_5", name: "Panduvanshi Dynasty", nameHi: "पाण्डुवंश", subtopics: ["शासक", "सिरपुर", "धार्मिक योगदान"], importanceScore: 10 },
              { id: "cg_hist_6", name: "Somvanshi Dynasty", nameHi: "सोमवंश", subtopics: ["राजनीतिक विस्तार", "प्रमुख शासक"], importanceScore: 8 },
              { id: "cg_hist_7", name: "Kalchuri Dynasty", nameHi: "कलचुरी वंश", subtopics: ["रत्नपुर शाखा", "रायपुर शाखा", "सांस्कृतिक योगदान"], importanceScore: 10 },
              { id: "cg_hist_8", name: "Medieval Chhattisgarh", nameHi: "मध्यकालीन छत्तीसगढ़", subtopics: ["क्षेत्रीय शासन", "सामाजिक स्थिति"], importanceScore: 8 },
              { id: "cg_hist_9", name: "Maratha Rule", nameHi: "मराठा शासन", subtopics: ["भोंसले शासन", "प्रशासन", "राजस्व व्यवस्था"], importanceScore: 10 },
              { id: "cg_hist_10", name: "British Rule in Chhattisgarh", nameHi: "छत्तीसगढ़ में ब्रिटिश शासन", subtopics: ["ब्रिटिश प्रशासन", "राजनीतिक परिवर्तन"], importanceScore: 10 },
              { id: "cg_hist_11", name: "1857 Revolt in Chhattisgarh", nameHi: "1857 का विद्रोह एवं छत्तीसगढ़", subtopics: ["वीर नारायण सिंह", "स्थानीय आंदोलन"], importanceScore: 10 },
              { id: "cg_hist_12", name: "Freedom Movement", nameHi: "स्वतंत्रता आंदोलन", subtopics: ["असहयोग आंदोलन", "भारत छोड़ो आंदोलन", "स्थानीय योगदान"], importanceScore: 10 },
              { id: "cg_hist_13", name: "Formation of Chhattisgarh State", nameHi: "छत्तीसगढ़ राज्य का गठन", subtopics: ["राज्य आंदोलन", "1 नवम्बर 2000", "प्रमुख व्यक्तित्व"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_0_ch_2",
            name: "छत्तीसगढ़ का भूगोल",
            topics: [
              { id: "cg_geo_1", name: "Location and Boundaries", nameHi: "स्थिति एवं सीमाएँ", subtopics: ["अक्षांश", "देशांतर", "पड़ोसी राज्य"], importanceScore: 10 },
              { id: "cg_geo_2", name: "Physiographic Divisions", nameHi: "भौतिक विभाजन", subtopics: ["मैदानी क्षेत्र", "पठारी क्षेत्र", "पर्वतीय क्षेत्र"], importanceScore: 10 },
              { id: "cg_geo_3", name: "Major Rivers", nameHi: "प्रमुख नदियाँ", subtopics: ["महानदी", "शिवनाथ", "इंद्रावती", "हसदेव", "अरपा"], importanceScore: 10 },
              { id: "cg_geo_4", name: "River Projects", nameHi: "नदी घाटी परियोजनाएँ", subtopics: ["हसदेव बांगो", "गंगरेल", "मिनीमाता परियोजना"], importanceScore: 9 },
              { id: "cg_geo_5", name: "Climate", nameHi: "जलवायु", subtopics: ["मानसून", "तापमान", "वर्षा"], importanceScore: 10 },
              { id: "cg_geo_6", name: "Soil Types", nameHi: "मिट्टी के प्रकार", subtopics: ["काली मिट्टी", "लाल मिट्टी", "दोमट मिट्टी"], importanceScore: 10 },
              { id: "cg_geo_7", name: "Forest Resources", nameHi: "वन संसाधन", subtopics: ["वन क्षेत्र", "प्रमुख वृक्ष", "लघु वनोपज"], importanceScore: 10 },
              { id: "cg_geo_8", name: "National Parks", nameHi: "राष्ट्रीय उद्यान", subtopics: ["इंद्रावती", "कांगेर घाटी", "गुरु घासीदास"], importanceScore: 10 },
              { id: "cg_geo_9", name: "Wildlife Sanctuaries", nameHi: "वन्यजीव अभयारण्य", subtopics: ["बारनवापारा", "अचनकमार", "सीतानदी"], importanceScore: 9 },
              { id: "cg_geo_10", name: "Mineral Resources", nameHi: "खनिज संसाधन", subtopics: ["कोयला", "लौह अयस्क", "बॉक्साइट", "डोलोमाइट"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_0_ch_3",
            name: "जनजाति एवं संस्कृति",
            topics: [
              { id: "cg_cul_1", name: "Major Tribes", nameHi: "प्रमुख जनजातियाँ", subtopics: ["गोंड", "बैगा", "हल्बा", "उरांव", "कंवर"], importanceScore: 10 },
              { id: "cg_cul_2", name: "Special Tribal Groups", nameHi: "विशेष पिछड़ी जनजातियाँ", subtopics: ["अबूझमाड़िया", "कमार", "पहाड़ी कोरवा"], importanceScore: 10 },
              { id: "cg_cul_3", name: "Folk Dances", nameHi: "लोकनृत्य", subtopics: ["पंथी", "राऊत नाचा", "सुआ", "करमा"], importanceScore: 10 },
              { id: "cg_cul_4", name: "Folk Songs", nameHi: "लोकगीत", subtopics: ["ददरिया", "सुआ गीत", "करमा गीत"], importanceScore: 8 },
              { id: "cg_cul_5", name: "Festivals", nameHi: "त्यौहार", subtopics: ["हरेली", "पोला", "तीजा", "छेरछेरा"], importanceScore: 10 },
              { id: "cg_cul_6", name: "Fairs", nameHi: "मेले", subtopics: ["राजिम कुंभ", "बस्तर दशहरा", "मड़ई"], importanceScore: 10 },
              { id: "cg_cul_7", name: "Handicrafts", nameHi: "हस्तशिल्प", subtopics: ["ढोकरा कला", "बेलमेटल", "बाँस शिल्प"], importanceScore: 9 },
              { id: "cg_cul_8", name: "Important Temples", nameHi: "प्रमुख मंदिर", subtopics: ["बम्लेश्वरी", "लक्ष्मण मंदिर", "भोरमदेव"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_0_ch_4",
            name: "अर्थव्यवस्था एवं प्रशासन",
            topics: [
              { id: "cg_eco_1", name: "Agriculture", nameHi: "कृषि", subtopics: ["धान उत्पादन", "फसलें", "कृषि योजनाएँ"], importanceScore: 10 },
              { id: "cg_eco_2", name: "Industries", nameHi: "उद्योग", subtopics: ["इस्पात उद्योग", "सीमेंट उद्योग", "विद्युत उद्योग"], importanceScore: 10 },
              { id: "cg_eco_3", name: "Energy Resources", nameHi: "ऊर्जा संसाधन", subtopics: ["ताप विद्युत", "जल विद्युत", "सौर ऊर्जा"], importanceScore: 9 },
              { id: "cg_eco_4", name: "Districts and Divisions", nameHi: "जिले एवं संभाग", subtopics: ["सभी जिले", "सभी संभाग"], importanceScore: 10 },
              { id: "cg_eco_5", name: "Panchayati Raj", nameHi: "पंचायती राज", subtopics: ["त्रिस्तरीय व्यवस्था", "ग्राम पंचायत", "जनपद पंचायत", "जिला पंचायत"], importanceScore: 10 },
              { id: "cg_eco_6", name: "Government Schemes", nameHi: "राज्य सरकार की योजनाएँ", subtopics: ["महतारी वंदन", "कृषि योजनाएँ", "शिक्षा योजनाएँ"], importanceScore: 10 },
              { id: "cg_eco_7", name: "Important Personalities", nameHi: "प्रमुख व्यक्तित्व", subtopics: ["वीर नारायण सिंह", "मिनीमाता", "पंडित सुंदरलाल शर्मा"], importanceScore: 10 },
              { id: "cg_eco_8", name: "Current Affairs of Chhattisgarh", nameHi: "छत्तीसगढ़ समसामयिकी", subtopics: ["नवीन योजनाएँ", "नियुक्तियाँ", "राज्य पुरस्कार", "खेल"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_0_ch_5",
            name: "छत्तीसगढ़ पर्यटन, पुरातत्व एवं धरोहर",
            topics: [
              { id: "cg_adv_1", name: "Archaeological Sites", nameHi: "पुरातात्विक स्थल", subtopics: ["सिरपुर", "मल्हार", "ताला", "रतनपुर", "राजिम"], importanceScore: 10 },
              { id: "cg_adv_2", name: "Ancient Temples", nameHi: "प्राचीन मंदिर", subtopics: ["लक्ष्मण मंदिर", "भोरमदेव मंदिर", "राजीव लोचन मंदिर", "दंतेश्वरी मंदिर"], importanceScore: 10 },
              { id: "cg_adv_3", name: "Tourist Places", nameHi: "प्रमुख पर्यटन स्थल", subtopics: ["चित्रकोट", "तीरथगढ़", "चित्रधारा", "मैत्री बाग", "कुटुमसर गुफा"], importanceScore: 10 },
              { id: "cg_adv_4", name: "Waterfalls", nameHi: "प्रमुख जलप्रपात", subtopics: ["चित्रकोट", "तीरथगढ़", "अमृतधारा", "रामझरना", "मंडवा"], importanceScore: 10 },
              { id: "cg_adv_5", name: "Caves", nameHi: "गुफाएँ", subtopics: ["कुटुमसर", "कैलाश गुफा", "दंडक गुफा"], importanceScore: 8 }
            ]
          }
        ]
      },
      {
        id: "cgv_master_sub_1",
        name: "भारत सामान्य ज्ञान (India GK)",
        weightage: 20,
        importance: "High",
        pyqFrequency: "High",
        isCgSpecific: false,
        chapters: [
          {
            id: "cgv_master_sub_1_ch_1",
            name: "प्राचीन भारत का इतिहास",
            topics: [
              { id: "ind_hist_1", name: "Indus Valley Civilization", nameHi: "सिंधु घाटी सभ्यता", subtopics: ["हड़प्पा", "मोहनजोदड़ो", "लोथल", "कालीबंगन", "धौलावीरा"], importanceScore: 10 },
              { id: "ind_hist_2", name: "Vedic Civilization", nameHi: "वैदिक सभ्यता", subtopics: ["ऋग्वैदिक काल", "उत्तर वैदिक काल", "वैदिक समाज", "वैदिक अर्थव्यवस्था"], importanceScore: 10 },
              { id: "ind_hist_3", name: "Mahajanapadas", nameHi: "महाजनपद", subtopics: ["16 महाजनपद", "मगध का उदय"], importanceScore: 9 },
              { id: "ind_hist_4", name: "Buddhism", nameHi: "बौद्ध धर्म", subtopics: ["गौतम बुद्ध", "चार आर्य सत्य", "बौद्ध संगीति"], importanceScore: 10 },
              { id: "ind_hist_5", name: "Jainism", nameHi: "जैन धर्म", subtopics: ["महावीर स्वामी", "त्रिरत्न", "जैन संगीति"], importanceScore: 9 },
              { id: "ind_hist_6", name: "Maurya Empire", nameHi: "मौर्य साम्राज्य", subtopics: ["चंद्रगुप्त मौर्य", "अशोक", "मेगस्थनीज"], importanceScore: 10 },
              { id: "ind_hist_7", name: "Gupta Empire", nameHi: "गुप्त साम्राज्य", subtopics: ["समुद्रगुप्त", "चंद्रगुप्त द्वितीय", "स्वर्ण युग"], importanceScore: 10 },
              { id: "ind_hist_8", name: "Sangam Age", nameHi: "संगम काल", subtopics: ["चोल", "चेर", "पांड्य"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_1_ch_2",
            name: "मध्यकालीन भारत का इतिहास",
            topics: [
              { id: "ind_med_1", name: "Delhi Sultanate", nameHi: "दिल्ली सल्तनत", subtopics: ["गुलाम वंश", "खिलजी वंश", "तुगलक वंश", "लोदी वंश"], importanceScore: 10 },
              { id: "ind_med_2", name: "Mughal Empire", nameHi: "मुगल साम्राज्य", subtopics: ["बाबर", "अकबर", "जहाँगीर", "शाहजहाँ", "औरंगजेब"], importanceScore: 10 },
              { id: "ind_med_3", name: "Bhakti Movement", nameHi: "भक्ति आंदोलन", subtopics: ["कबीर", "तुलसीदास", "रामानंद", "चैतन्य"], importanceScore: 9 },
              { id: "ind_med_4", name: "Sufi Movement", nameHi: "सूफी आंदोलन", subtopics: ["चिश्ती संप्रदाय", "सुहरावर्दी संप्रदाय"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_1_ch_3",
            name: "आधुनिक भारत का इतिहास",
            topics: [
              { id: "ind_mod_1", name: "Arrival of Europeans", nameHi: "यूरोपियों का आगमन", subtopics: ["पुर्तगाली", "डच", "फ्रांसीसी", "अंग्रेज"], importanceScore: 10 },
              { id: "ind_mod_2", name: "British Expansion", nameHi: "ब्रिटिश साम्राज्य का विस्तार", subtopics: ["प्लासी का युद्ध", "बक्सर का युद्ध", "सहायक संधि"], importanceScore: 10 },
              { id: "ind_mod_3", name: "Revolt of 1857", nameHi: "1857 का विद्रोह", subtopics: ["कारण", "नेता", "परिणाम"], importanceScore: 10 },
              { id: "ind_mod_4", name: "Indian National Congress", nameHi: "भारतीय राष्ट्रीय कांग्रेस", subtopics: ["स्थापना", "उदारवादी", "उग्रवादी"], importanceScore: 10 },
              { id: "ind_mod_5", name: "Gandhian Movements", nameHi: "गांधीवादी आंदोलन", subtopics: ["असहयोग", "सविनय अवज्ञा", "भारत छोड़ो"], importanceScore: 10 },
              { id: "ind_mod_6", name: "Revolutionary Movement", nameHi: "क्रांतिकारी आंदोलन", subtopics: ["भगत सिंह", "चंद्रशेखर आजाद", "सुभाषचंद्र बोस"], importanceScore: 9 },
              { id: "ind_mod_7", name: "Constitution Making", nameHi: "संविधान निर्माण", subtopics: ["संविधान सभा", "प्रारूप समिति", "डॉ. बी.आर. अंबेडकर"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_1_ch_4",
            name: "भारतीय भूगोल",
            topics: [
              { id: "ind_geo_1", name: "Physical Geography of India", nameHi: "भारत का भौतिक भूगोल", subtopics: ["हिमालय", "उत्तरी मैदान", "दक्कन का पठार", "तटीय मैदान"], importanceScore: 10 },
              { id: "ind_geo_2", name: "Rivers of India", nameHi: "भारत की नदियाँ", subtopics: ["गंगा", "यमुना", "ब्रह्मपुत्र", "गोदावरी", "नर्मदा"], importanceScore: 10 },
              { id: "ind_geo_3", name: "Climate", nameHi: "भारत की जलवायु", subtopics: ["मानसून", "वर्षा", "ऋतुएँ"], importanceScore: 10 },
              { id: "ind_geo_4", name: "Soils", nameHi: "भारत की मिट्टियाँ", subtopics: ["जलोढ़", "काली", "लाल", "लेटराइट"], importanceScore: 9 },
              { id: "ind_geo_5", name: "National Parks and Biosphere Reserves", nameHi: "राष्ट्रीय उद्यान एवं जैवमंडल", subtopics: ["जिम कॉर्बेट", "काजीरंगा", "सुंदरवन"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_1_ch_5",
            name: "भारतीय राजव्यवस्था",
            topics: [
              { id: "ind_pol_1", name: "Constitution", nameHi: "भारतीय संविधान", subtopics: ["विशेषताएँ", "प्रस्तावना", "संशोधन"], importanceScore: 10 },
              { id: "ind_pol_2", name: "Fundamental Rights", nameHi: "मौलिक अधिकार", subtopics: ["अनुच्छेद 12-35"], importanceScore: 10 },
              { id: "ind_pol_3", name: "Directive Principles", nameHi: "राज्य नीति के निदेशक तत्व", subtopics: ["भाग-4"], importanceScore: 9 },
              { id: "ind_pol_4", name: "Fundamental Duties", nameHi: "मौलिक कर्तव्य", subtopics: ["42वाँ संशोधन"], importanceScore: 9 },
              { id: "ind_pol_5", name: "Parliament", nameHi: "संसद", subtopics: ["लोकसभा", "राज्यसभा"], importanceScore: 10 },
              { id: "ind_pol_6", name: "President and Vice President", nameHi: "राष्ट्रपति एवं उपराष्ट्रपति", subtopics: ["चुनाव", "शक्तियाँ"], importanceScore: 10 },
              { id: "ind_pol_7", name: "Prime Minister and Council of Ministers", nameHi: "प्रधानमंत्री एवं मंत्रिपरिषद", subtopics: ["कार्य", "उत्तरदायित्व"], importanceScore: 10 },
              { id: "ind_pol_8", name: "Supreme Court", nameHi: "सर्वोच्च न्यायालय", subtopics: ["संरचना", "अधिकार क्षेत्र"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_1_ch_6",
            name: "भारतीय अर्थव्यवस्था",
            topics: [
              { id: "ind_eco_1", name: "Basic Economics", nameHi: "अर्थशास्त्र की मूल अवधारणाएँ", subtopics: ["GDP", "GNP", "NNP", "NITI Aayog"], importanceScore: 10 },
              { id: "ind_eco_2", name: "Banking System", nameHi: "बैंकिंग प्रणाली", subtopics: ["RBI", "मौद्रिक नीति", "वाणिज्यिक बैंक"], importanceScore: 10 },
              { id: "ind_eco_3", name: "Budget and Taxation", nameHi: "बजट एवं कराधान", subtopics: ["GST", "प्रत्यक्ष कर", "अप्रत्यक्ष कर"], importanceScore: 10 },
              { id: "ind_eco_4", name: "Inflation", nameHi: "मुद्रास्फीति", subtopics: ["WPI", "CPI"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_1_ch_7",
            name: "भारत एवं विश्व",
            topics: [
              { id: "ind_misc_1", name: "International Organizations", nameHi: "अंतरराष्ट्रीय संगठन", subtopics: ["UNO", "IMF", "World Bank", "WTO", "WHO"], importanceScore: 10 },
              { id: "ind_misc_2", name: "Important Reports and Indexes", nameHi: "महत्वपूर्ण रिपोर्ट एवं सूचकांक", subtopics: ["HDI", "GHI", "SDG"], importanceScore: 8 },
              { id: "ind_misc_3", name: "Sports and Awards", nameHi: "खेल एवं पुरस्कार", subtopics: ["खेल पुरस्कार", "राष्ट्रीय पुरस्कार", "अंतरराष्ट्रीय पुरस्कार"], importanceScore: 8 },
              { id: "ind_misc_4", name: "Important Days and Themes", nameHi: "महत्वपूर्ण दिवस", subtopics: ["राष्ट्रीय दिवस", "अंतरराष्ट्रीय दिवस"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_1_ch_8",
            name: "विश्व भूगोल",
            topics: [
              { id: "ind_adv_geo_1", name: "Earth and Solar System", nameHi: "पृथ्वी एवं सौरमंडल", subtopics: ["ग्रह", "उपग्रह", "ग्रहण", "ऋतुएँ"], importanceScore: 10 },
              { id: "ind_adv_geo_2", name: "Latitudes and Longitudes", nameHi: "अक्षांश एवं देशांतर", subtopics: ["कर्क रेखा", "भूमध्य रेखा", "ग्रीनविच रेखा"], importanceScore: 9 },
              { id: "ind_adv_geo_3", name: "Continents and Oceans", nameHi: "महाद्वीप एवं महासागर", subtopics: ["सात महाद्वीप", "पाँच महासागर"], importanceScore: 8 },
              { id: "ind_adv_geo_4", name: "Major Deserts and Grasslands", nameHi: "प्रमुख मरुस्थल एवं घासभूमियाँ", subtopics: ["सहारा", "गोबी", "प्रेयरी", "स्टेपी"], importanceScore: 8 }
            ]
          }
        ]
      },
      {
        id: "cgv_master_sub_2",
        name: "सामान्य विज्ञान (General Science)",
        weightage: 15,
        importance: "High",
        pyqFrequency: "High",
        isCgSpecific: false,
        chapters: [
          {
            id: "cgv_master_sub_2_ch_1",
            name: "भौतिक विज्ञान (Physics)",
            topics: [
              { id: "phy_1", name: "Physical Quantities and Units", nameHi: "भौतिक राशियाँ एवं मात्रक", subtopics: ["SI Units", "Derived Units", "Measurement"], importanceScore: 10 },
              { id: "phy_2", name: "Motion", nameHi: "गति", subtopics: ["Speed", "Velocity", "Acceleration"], importanceScore: 10 },
              { id: "phy_3", name: "Newton's Laws of Motion", nameHi: "न्यूटन के गति नियम", subtopics: ["First Law", "Second Law", "Third Law"], importanceScore: 10 },
              { id: "phy_4", name: "Work, Power and Energy", nameHi: "कार्य, शक्ति एवं ऊर्जा", subtopics: ["Kinetic Energy", "Potential Energy", "Power"], importanceScore: 10 },
              { id: "phy_5", name: "Gravitation", nameHi: "गुरुत्वाकर्षण", subtopics: ["Gravity", "Weight", "Mass"], importanceScore: 10 },
              { id: "phy_6", name: "Pressure", nameHi: "दाब", subtopics: ["Atmospheric Pressure", "Fluid Pressure"], importanceScore: 8 },
              { id: "phy_7", name: "Heat and Temperature", nameHi: "ऊष्मा एवं तापमान", subtopics: ["Thermometer", "Heat Transfer"], importanceScore: 10 },
              { id: "phy_8", name: "Sound", nameHi: "ध्वनि", subtopics: ["Echo", "Frequency", "Ultrasound"], importanceScore: 9 },
              { id: "phy_9", name: "Light", nameHi: "प्रकाश", subtopics: ["Reflection", "Refraction", "Lens"], importanceScore: 10 },
              { id: "phy_10", name: "Human Eye", nameHi: "मानव नेत्र", subtopics: ["Vision Defects", "Eye Structure"], importanceScore: 8 },
              { id: "phy_11", name: "Electricity", nameHi: "विद्युत", subtopics: ["Current", "Voltage", "Resistance"], importanceScore: 10 },
              { id: "phy_12", name: "Magnetism", nameHi: "चुंबकत्व", subtopics: ["Magnetic Field", "Electromagnet"], importanceScore: 9 },
              { id: "phy_13", name: "Modern Physics", nameHi: "आधुनिक भौतिकी", subtopics: ["X-Ray", "Radioactivity", "Laser"], importanceScore: 8 },
              { id: "phy_14", name: "Semiconductors", nameHi: "अर्धचालक", subtopics: ["Diode", "Transistor"], importanceScore: 7 },
              { id: "phy_15", name: "Nuclear Energy", nameHi: "नाभिकीय ऊर्जा", subtopics: ["Fission", "Fusion"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_2_ch_2",
            name: "रसायन विज्ञान (Chemistry)",
            topics: [
              { id: "chem_1", name: "Matter and Its Nature", nameHi: "पदार्थ एवं उसकी प्रकृति", subtopics: ["States of Matter", "Properties"], importanceScore: 10 },
              { id: "chem_2", name: "Atoms and Molecules", nameHi: "परमाणु एवं अणु", subtopics: ["Atomic Structure", "Molecules"], importanceScore: 10 },
              { id: "chem_3", name: "Periodic Table", nameHi: "आवर्त सारणी", subtopics: ["Groups", "Periods"], importanceScore: 10 },
              { id: "chem_4", name: "Chemical Bonding", nameHi: "रासायनिक बंध", subtopics: ["Ionic Bond", "Covalent Bond"], importanceScore: 8 },
              { id: "chem_5", name: "Acids, Bases and Salts", nameHi: "अम्ल, क्षार एवं लवण", subtopics: ["pH Scale", "Indicators"], importanceScore: 10 },
              { id: "chem_6", name: "Metals and Non-Metals", nameHi: "धातु एवं अधातु", subtopics: ["Properties", "Uses"], importanceScore: 10 },
              { id: "chem_7", name: "Chemical Reactions", nameHi: "रासायनिक अभिक्रियाएँ", subtopics: ["Oxidation", "Reduction"], importanceScore: 9 },
              { id: "chem_8", name: "Carbon and Compounds", nameHi: "कार्बन एवं उसके यौगिक", subtopics: ["Hydrocarbons", "Organic Chemistry Basics"], importanceScore: 9 },
              { id: "chem_9", name: "Fuels", nameHi: "ईंधन", subtopics: ["Coal", "Petroleum", "LPG"], importanceScore: 8 },
              { id: "chem_10", name: "Everyday Chemistry", nameHi: "दैनिक जीवन में रसायन", subtopics: ["Soap", "Detergent", "Cement"], importanceScore: 8 },
              { id: "chem_11", name: "Polymers", nameHi: "बहुलक", subtopics: ["Plastic", "Synthetic Fibers"], importanceScore: 7 },
              { id: "chem_12", name: "Fertilizers and Pesticides", nameHi: "उर्वरक एवं कीटनाशक", subtopics: ["NPK", "Insecticides"], importanceScore: 8 },
              { id: "chem_13", name: "Environmental Chemistry", nameHi: "पर्यावरण रसायन", subtopics: ["Acid Rain", "Ozone Layer"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_2_ch_3",
            name: "जीव विज्ञान (Biology)",
            topics: [
              { id: "bio_1", name: "Cell", nameHi: "कोशिका", subtopics: ["Cell Structure", "Cell Organelles"], importanceScore: 10 },
              { id: "bio_2", name: "Tissues", nameHi: "ऊतक", subtopics: ["Plant Tissue", "Animal Tissue"], importanceScore: 8 },
              { id: "bio_3", name: "Human Digestive System", nameHi: "पाचन तंत्र", subtopics: ["Digestive Organs", "Enzymes"], importanceScore: 9 },
              { id: "bio_4", name: "Respiratory System", nameHi: "श्वसन तंत्र", subtopics: ["Lungs", "Respiration"], importanceScore: 9 },
              { id: "bio_5", name: "Circulatory System", nameHi: "परिसंचरण तंत्र", subtopics: ["Heart", "Blood"], importanceScore: 10 },
              { id: "bio_6", name: "Nervous System", nameHi: "तंत्रिका तंत्र", subtopics: ["Brain", "Neuron"], importanceScore: 9 },
              { id: "bio_7", name: "Endocrine System", nameHi: "अंतःस्रावी तंत्र", subtopics: ["Hormones", "Glands"], importanceScore: 8 },
              { id: "bio_8", name: "Reproductive System", nameHi: "प्रजनन तंत्र", subtopics: ["Human Reproduction", "Health"], importanceScore: 8 },
              { id: "bio_9", name: "Nutrition", nameHi: "पोषण", subtopics: ["Vitamins", "Minerals", "Balanced Diet"], importanceScore: 10 },
              { id: "bio_10", name: "Diseases", nameHi: "रोग", subtopics: ["Bacterial", "Viral", "Deficiency Diseases"], importanceScore: 10 },
              { id: "bio_11", name: "Immunity and Vaccines", nameHi: "प्रतिरक्षा एवं टीके", subtopics: ["Antibodies", "Vaccination"], importanceScore: 9 },
              { id: "bio_12", name: "Genetics", nameHi: "आनुवंशिकी", subtopics: ["DNA", "Genes", "Mendel"], importanceScore: 8 },
              { id: "bio_13", name: "Plant Physiology", nameHi: "पादप शरीर क्रिया विज्ञान", subtopics: ["Photosynthesis", "Transpiration"], importanceScore: 9 },
              { id: "bio_14", name: "Classification of Living Organisms", nameHi: "जीवों का वर्गीकरण", subtopics: ["Five Kingdom", "Taxonomy"], importanceScore: 8 },
              { id: "bio_15", name: "Biotechnology", nameHi: "जैव प्रौद्योगिकी", subtopics: ["GM Crops", "Cloning"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_2_ch_4",
            name: "पर्यावरण एवं पारिस्थितिकी",
            topics: [
              { id: "env_1", name: "Ecosystem", nameHi: "पारिस्थितिकी तंत्र", subtopics: ["Food Chain", "Food Web"], importanceScore: 10 },
              { id: "env_2", name: "Biodiversity", nameHi: "जैव विविधता", subtopics: ["Conservation", "Hotspots"], importanceScore: 10 },
              { id: "env_3", name: "Environmental Pollution", nameHi: "पर्यावरण प्रदूषण", subtopics: ["Air", "Water", "Soil", "Noise"], importanceScore: 10 },
              { id: "env_4", name: "Climate Change", nameHi: "जलवायु परिवर्तन", subtopics: ["Global Warming", "Greenhouse Effect"], importanceScore: 10 },
              { id: "env_5", name: "Renewable Energy", nameHi: "नवीकरणीय ऊर्जा", subtopics: ["Solar", "Wind", "Biogas"], importanceScore: 8 },
              { id: "env_6", name: "Environmental Acts and Organizations", nameHi: "पर्यावरणीय अधिनियम एवं संगठन", subtopics: ["UNEP", "IPCC", "Wildlife Protection Act"], importanceScore: 8 },
              { id: "env_7", name: "National Parks and Sanctuaries", nameHi: "राष्ट्रीय उद्यान एवं अभयारण्य", subtopics: ["Tiger Reserves", "Biosphere Reserves"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_2_ch_5",
            name: "अंतरिक्ष विज्ञान एवं खगोल विज्ञान",
            topics: [
              { id: "adv_sci_1", name: "Solar System Advanced", nameHi: "सौरमंडल (उन्नत)", subtopics: ["ग्रहों की विशेषताएँ", "बौने ग्रह", "क्षुद्रग्रह", "धूमकेतु"], importanceScore: 10 },
              { id: "adv_sci_2", name: "Stars and Galaxies", nameHi: "तारे एवं आकाशगंगाएँ", subtopics: ["मिल्की वे", "नक्षत्र", "ब्लैक होल"], importanceScore: 8 },
              { id: "adv_sci_3", name: "Space Missions", nameHi: "अंतरिक्ष मिशन", subtopics: ["चंद्रयान", "मंगलयान", "गगनयान", "आदित्य-L1"], importanceScore: 10 },
              { id: "adv_sci_4", name: "Space Organizations", nameHi: "अंतरिक्ष संस्थाएँ", subtopics: ["ISRO", "NASA", "ESA", "Roscosmos"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_2_ch_6",
            name: "आविष्कार एवं वैज्ञानिक",
            topics: [
              { id: "adv_sci_5", name: "Important Scientists", nameHi: "महत्वपूर्ण वैज्ञानिक", subtopics: ["न्यूटन", "आइंस्टीन", "सी.वी. रमन", "जगदीश चंद्र बोस"], importanceScore: 10 },
              { id: "adv_sci_6", name: "Important Inventions", nameHi: "महत्वपूर्ण आविष्कार", subtopics: ["टेलीफोन", "रेडियो", "बल्ब", "कंप्यूटर"], importanceScore: 10 },
              { id: "adv_sci_7", name: "Nobel Prize Discoveries", nameHi: "नोबेल पुरस्कार से संबंधित खोजें", subtopics: ["भौतिकी", "रसायन", "चिकित्सा"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_2_ch_7",
            name: "वैज्ञानिक उपकरण",
            topics: [
              { id: "adv_sci_8", name: "Scientific Instruments", nameHi: "वैज्ञानिक उपकरण", subtopics: ["प्रमुख वैज्ञानिक उपकरण", "उपयोग एवं मापन इकाइयाँ", "दैनिक जीवन में अनुप्रयोग"], importanceScore: 8 }
            ]
          }
        ]
      },
      {
        id: "cgv_master_sub_3",
        name: "गणित (Mathematics)",
        weightage: 15,
        importance: "High",
        pyqFrequency: "High",
        isCgSpecific: false,
        chapters: [
          {
            id: "cgv_master_sub_3_ch_1",
            name: "संख्या पद्धति (Number System)",
            topics: [
              { id: "math_ns_1", name: "Number System Basics", nameHi: "संख्या पद्धति की मूल अवधारणाएँ", subtopics: ["प्राकृतिक संख्या", "पूर्ण संख्या", "पूर्णांक", "परिमेय संख्या", "अपरिमेय संख्या"], importanceScore: 10 },
              { id: "math_ns_2", name: "Divisibility Rules", nameHi: "विभाज्यता के नियम", subtopics: ["2,3,4,5,6,8,9,11 के नियम"], importanceScore: 10 },
              { id: "math_ns_3", name: "LCM and HCF", nameHi: "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक", subtopics: ["LCM", "HCF", "प्रयोग आधारित प्रश्न"], importanceScore: 10 },
              { id: "math_ns_4", name: "Surds and Indices", nameHi: "करणी एवं घातांक", subtopics: ["Square Root", "Cube Root", "Indices Laws"], importanceScore: 8 },
              { id: "math_ns_5", name: "Simplification", nameHi: "सरलीकरण", subtopics: ["BODMAS", "Fraction", "Decimal"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_2",
            name: "प्रतिशत, लाभ-हानि एवं व्यापारिक गणित",
            topics: [
              { id: "math_ar_1", name: "Percentage", nameHi: "प्रतिशत", subtopics: ["Percentage Conversion", "Increase & Decrease"], importanceScore: 10 },
              { id: "math_ar_2", name: "Profit and Loss", nameHi: "लाभ एवं हानि", subtopics: ["Cost Price", "Selling Price", "Profit Percentage"], importanceScore: 10 },
              { id: "math_ar_3", name: "Discount", nameHi: "बट्टा", subtopics: ["Marked Price", "Successive Discount"], importanceScore: 10 },
              { id: "math_ar_4", name: "Partnership", nameHi: "साझेदारी", subtopics: ["Profit Sharing", "Investment Ratio"], importanceScore: 8 },
              { id: "math_ar_5", name: "Commission and Brokerage", nameHi: "कमीशन एवं दलाली", subtopics: ["Brokerage", "Commission Calculation"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_3",
            name: "अनुपात एवं औसत",
            topics: [
              { id: "math_ratio_1", name: "Ratio", nameHi: "अनुपात", subtopics: ["Simple Ratio", "Compound Ratio"], importanceScore: 10 },
              { id: "math_ratio_2", name: "Proportion", nameHi: "समानुपात", subtopics: ["Direct Proportion", "Inverse Proportion"], importanceScore: 10 },
              { id: "math_ratio_3", name: "Average", nameHi: "औसत", subtopics: ["Simple Average", "Weighted Average"], importanceScore: 10 },
              { id: "math_ratio_4", name: "Mixture and Alligation", nameHi: "मिश्रण एवं आरोपण", subtopics: ["Milk-Water", "Alligation Rule"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_4",
            name: "ब्याज एवं समय आधारित गणित",
            topics: [
              { id: "math_si_1", name: "Simple Interest", nameHi: "साधारण ब्याज", subtopics: ["Principal", "Rate", "Time"], importanceScore: 10 },
              { id: "math_si_2", name: "Compound Interest", nameHi: "चक्रवृद्धि ब्याज", subtopics: ["Annual CI", "Half Yearly CI"], importanceScore: 10 },
              { id: "math_si_3", name: "Time and Work", nameHi: "समय एवं कार्य", subtopics: ["Efficiency", "Work Distribution"], importanceScore: 10 },
              { id: "math_si_4", name: "Pipes and Cisterns", nameHi: "पाइप एवं टंकी", subtopics: ["Inlet", "Outlet"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_5",
            name: "समय, चाल एवं दूरी",
            topics: [
              { id: "math_tsd_1", name: "Speed Time Distance", nameHi: "समय, चाल एवं दूरी", subtopics: ["Average Speed", "Relative Speed"], importanceScore: 10 },
              { id: "math_tsd_2", name: "Trains", nameHi: "रेलगाड़ी", subtopics: ["Crossing Problems", "Platform Problems"], importanceScore: 10 },
              { id: "math_tsd_3", name: "Boats and Streams", nameHi: "नाव एवं धारा", subtopics: ["Upstream", "Downstream"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_6",
            name: "बीजगणित",
            topics: [
              { id: "math_alg_1", name: "Algebraic Identities", nameHi: "बीजीय सर्वसमिकाएँ", subtopics: ["(a+b)²", "(a-b)²", "a²-b²"], importanceScore: 10 },
              { id: "math_alg_2", name: "Linear Equations", nameHi: "रैखिक समीकरण", subtopics: ["One Variable", "Two Variables"], importanceScore: 10 },
              { id: "math_alg_3", name: "Quadratic Equations", nameHi: "द्विघात समीकरण", subtopics: ["Roots", "Factorization"], importanceScore: 8 },
              { id: "math_alg_4", name: "Logarithm", nameHi: "लघुगणक", subtopics: ["Log Rules", "Applications"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_7",
            name: "ज्यामिति",
            topics: [
              { id: "math_geo_1", name: "Lines and Angles", nameHi: "रेखाएँ एवं कोण", subtopics: ["Types of Angles", "Parallel Lines"], importanceScore: 10 },
              { id: "math_geo_2", name: "Triangles", nameHi: "त्रिभुज", subtopics: ["Congruence", "Similarity"], importanceScore: 10 },
              { id: "math_geo_3", name: "Quadrilaterals", nameHi: "चतुर्भुज", subtopics: ["Rectangle", "Square", "Rhombus"], importanceScore: 8 },
              { id: "math_geo_4", name: "Circles", nameHi: "वृत्त", subtopics: ["Chord", "Tangent", "Arc"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_8",
            name: "क्षेत्रमिति (Mensuration)",
            topics: [
              { id: "math_men_1", name: "2D Mensuration", nameHi: "समतल क्षेत्रमिति", subtopics: ["Square", "Rectangle", "Triangle", "Circle"], importanceScore: 10 },
              { id: "math_men_2", name: "3D Mensuration", nameHi: "ठोस क्षेत्रमिति", subtopics: ["Cube", "Cuboid", "Cylinder", "Cone", "Sphere"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_9",
            name: "त्रिकोणमिति",
            topics: [
              { id: "math_tri_1", name: "Trigonometric Ratios", nameHi: "त्रिकोणमितीय अनुपात", subtopics: ["Sin", "Cos", "Tan"], importanceScore: 8 },
              { id: "math_tri_2", name: "Heights and Distances", nameHi: "ऊँचाई एवं दूरी", subtopics: ["Angle of Elevation", "Angle of Depression"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_10",
            name: "सांख्यिकी एवं डेटा व्याख्या",
            topics: [
              { id: "math_di_1", name: "Statistics", nameHi: "सांख्यिकी", subtopics: ["Mean", "Median", "Mode"], importanceScore: 10 },
              { id: "math_di_2", name: "Data Interpretation", nameHi: "डेटा व्याख्या", subtopics: ["Table DI", "Bar Graph", "Pie Chart", "Line Graph"], importanceScore: 10 },
              { id: "math_di_3", name: "Probability", nameHi: "प्रायिकता", subtopics: ["Basic Probability", "Events"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_11",
            name: "उन्नत संख्या पद्धति",
            topics: [
              { id: "adv_math_1", name: "Remainder Theorem", nameHi: "शेषफल प्रमेय", subtopics: ["शेषफल आधारित प्रश्न", "भाज्यता"], importanceScore: 8 },
              { id: "adv_math_2", name: "Cyclicity and Last Digit", nameHi: "अंतिम अंक एवं चक्रीयता", subtopics: ["Unit Digit", "Last Two Digits"], importanceScore: 8 },
              { id: "adv_math_3", name: "Factor and Multiple Problems", nameHi: "गुणनखंड एवं गुणज", subtopics: ["Factors", "Multiples"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_12",
            name: "क्रमचय-संचय एवं प्रायिकता",
            topics: [
              { id: "adv_math_4", name: "Permutation", nameHi: "क्रमचय", subtopics: ["Linear Arrangement", "Circular Arrangement"], importanceScore: 7 },
              { id: "adv_math_5", name: "Combination", nameHi: "संचय", subtopics: ["Selection Problems", "Grouping Problems"], importanceScore: 7 },
              { id: "adv_math_6", name: "Advanced Probability", nameHi: "उन्नत प्रायिकता", subtopics: ["Conditional Probability", "Independent Events"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_13",
            name: "समुच्चय एवं वेन आरेख",
            topics: [
              { id: "adv_math_7", name: "Set Theory", nameHi: "समुच्चय सिद्धांत", subtopics: ["Union", "Intersection", "Complement"], importanceScore: 8 },
              { id: "adv_math_8", name: "Venn Diagram", nameHi: "वेन आरेख", subtopics: ["Two Sets", "Three Sets"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_14",
            name: "अनुक्रम एवं श्रेणी",
            topics: [
              { id: "adv_math_9", name: "Arithmetic Progression", nameHi: "समांतर श्रेणी (AP)", subtopics: ["Nth Term", "Sum of Terms"], importanceScore: 8 },
              { id: "adv_math_10", name: "Geometric Progression", nameHi: "गुणोत्तर श्रेणी (GP)", subtopics: ["Common Ratio", "Sum of GP"], importanceScore: 7 },
              { id: "adv_math_11", name: "Number Series", nameHi: "संख्या श्रेणी", subtopics: ["Pattern Recognition", "Missing Term"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_15",
            name: "निर्देशांक ज्यामिति",
            topics: [
              { id: "adv_math_12", name: "Coordinate Geometry Basics", nameHi: "निर्देशांक ज्यामिति की मूल बातें", subtopics: ["Cartesian Plane", "Coordinates"], importanceScore: 7 },
              { id: "adv_math_13", name: "Distance Formula", nameHi: "दूरी सूत्र", subtopics: ["Distance Between Points"], importanceScore: 7 },
              { id: "adv_math_14", name: "Section Formula", nameHi: "विभाजन सूत्र", subtopics: ["Internal Division", "External Division"], importanceScore: 6 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_16",
            name: "उन्नत क्षेत्रमिति",
            topics: [
              { id: "adv_math_15", name: "Frustum", nameHi: "छिन्न शंकु", subtopics: ["Volume", "Surface Area"], importanceScore: 6 },
              { id: "adv_math_16", name: "Combination of Solids", nameHi: "ठोस आकृतियों का संयोजन", subtopics: ["Composite Solids"], importanceScore: 6 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_17",
            name: "डेटा इंटरप्रिटेशन (Advanced)",
            topics: [
              { id: "adv_math_17", name: "Caselet DI", nameHi: "केसलेट डेटा व्याख्या", subtopics: ["Paragraph Based DI"], importanceScore: 8 },
              { id: "adv_math_18", name: "Missing Data DI", nameHi: "मिसिंग डेटा DI", subtopics: ["Inference Based Questions"], importanceScore: 7 },
              { id: "adv_math_19", name: "Mixed Graph DI", nameHi: "मिश्रित ग्राफ DI", subtopics: ["Bar + Pie", "Table + Line Graph"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_18",
            name: "गणितीय तर्क",
            topics: [
              { id: "adv_math_20", name: "Mathematical Reasoning", nameHi: "गणितीय तर्क", subtopics: ["Statements", "Logical Conclusions"], importanceScore: 8 },
              { id: "adv_math_21", name: "Quantitative Comparison", nameHi: "मात्रात्मक तुलना", subtopics: ["Quantity I vs Quantity II"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_3_ch_19",
            name: "प्रतियोगी परीक्षा विशेष गणित",
            topics: [
              { id: "adv_math_22", name: "Age Problems", nameHi: "आयु आधारित प्रश्न", subtopics: ["Present Age", "Past/Future Age"], importanceScore: 10 },
              { id: "adv_math_23", name: "Clock Problems", nameHi: "घड़ी आधारित प्रश्न", subtopics: ["Angle Between Hands"], importanceScore: 8 },
              { id: "adv_math_24", name: "Calendar Problems", nameHi: "कैलेंडर आधारित प्रश्न", subtopics: ["Odd Days", "Leap Year"], importanceScore: 8 },
              { id: "adv_math_25", name: "Race Problems", nameHi: "दौड़ आधारित प्रश्न", subtopics: ["Relative Speed", "Winning Margin"], importanceScore: 7 }
            ]
          }
        ]
      },
      {
        id: "cgv_master_sub_4",
        name: "तर्कशक्ति एवं मानसिक योग्यता (Reasoning)",
        weightage: 15,
        importance: "High",
        pyqFrequency: "High",
        isCgSpecific: false,
        chapters: [
          {
            id: "cgv_master_sub_4_ch_1",
            name: "श्रेणी (Series)",
            topics: [
              { id: "reas_ser_1", name: "Number Series", nameHi: "संख्या श्रेणी", subtopics: ["Missing Number", "Wrong Number", "Pattern Based Series"], importanceScore: 10 },
              { id: "reas_ser_2", name: "Alphabet Series", nameHi: "अक्षर श्रेणी", subtopics: ["Letter Pattern", "Mixed Series"], importanceScore: 10 },
              { id: "reas_ser_3", name: "Alphanumeric Series", nameHi: "अल्फान्यूमेरिक श्रेणी", subtopics: ["Number-Letter Combination", "Position Analysis"], importanceScore: 9 },
              { id: "reas_ser_4", name: "Symbol Series", nameHi: "प्रतीक श्रेणी", subtopics: ["Pattern Recognition"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_2",
            name: "समानता एवं वर्गीकरण",
            topics: [
              { id: "reas_ana_1", name: "Analogy", nameHi: "समानता", subtopics: ["Word Analogy", "Number Analogy", "Letter Analogy"], importanceScore: 10 },
              { id: "reas_ana_2", name: "Classification", nameHi: "वर्गीकरण", subtopics: ["Odd One Out", "Group Identification"], importanceScore: 10 },
              { id: "reas_ana_3", name: "Logical Classification", nameHi: "तार्किक वर्गीकरण", subtopics: ["Concept Based"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_3",
            name: "कोडिंग-डिकोडिंग",
            topics: [
              { id: "reas_cd_1", name: "Letter Coding", nameHi: "अक्षर कोडिंग", subtopics: ["Direct Coding", "Reverse Coding"], importanceScore: 10 },
              { id: "reas_cd_2", name: "Number Coding", nameHi: "संख्या कोडिंग", subtopics: ["Mathematical Coding"], importanceScore: 9 },
              { id: "reas_cd_3", name: "Matrix Coding", nameHi: "मैट्रिक्स कोडिंग", subtopics: ["Grid Based Coding"], importanceScore: 7 },
              { id: "reas_cd_4", name: "Artificial Language", nameHi: "कृत्रिम भाषा", subtopics: ["Symbol Coding"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_4",
            name: "रक्त संबंध एवं परिवार",
            topics: [
              { id: "reas_br_1", name: "Blood Relations", nameHi: "रक्त संबंध", subtopics: ["Family Tree", "Generation Problems"], importanceScore: 10 },
              { id: "reas_br_2", name: "Coded Blood Relations", nameHi: "कूटित रक्त संबंध", subtopics: ["Symbol Based Relations"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_5",
            name: "दिशा ज्ञान",
            topics: [
              { id: "reas_dir_1", name: "Direction Sense", nameHi: "दिशा ज्ञान", subtopics: ["North-South-East-West", "Turning Problems"], importanceScore: 10 },
              { id: "reas_dir_2", name: "Distance and Direction", nameHi: "दूरी एवं दिशा", subtopics: ["Shortest Distance", "Final Position"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_6",
            name: "क्रम एवं रैंकिंग",
            topics: [
              { id: "reas_rank_1", name: "Ranking Test", nameHi: "रैंकिंग परीक्षण", subtopics: ["Left-Right Ranking", "Top-Bottom Ranking"], importanceScore: 10 },
              { id: "reas_rank_2", name: "Order and Position", nameHi: "क्रम एवं स्थिति", subtopics: ["Seating Position"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_7",
            name: "बैठक व्यवस्था",
            topics: [
              { id: "reas_seat_1", name: "Linear Seating Arrangement", nameHi: "रेखीय बैठक व्यवस्था", subtopics: ["Single Row", "Double Row"], importanceScore: 10 },
              { id: "reas_seat_2", name: "Circular Arrangement", nameHi: "वृत्तीय बैठक व्यवस्था", subtopics: ["Clockwise", "Anti-Clockwise"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_8",
            name: "न्याय निगमन एवं कथन",
            topics: [
              { id: "reas_syl_1", name: "Syllogism", nameHi: "न्याय निगमन", subtopics: ["Venn Method", "Logical Conclusions"], importanceScore: 10 },
              { id: "reas_syl_2", name: "Statement and Conclusion", nameHi: "कथन एवं निष्कर्ष", subtopics: ["Assumption", "Inference"], importanceScore: 10 },
              { id: "reas_syl_3", name: "Statement and Argument", nameHi: "कथन एवं तर्क", subtopics: ["Strong Argument", "Weak Argument"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_9",
            name: "विश्लेषणात्मक तर्क",
            topics: [
              { id: "reas_ana_4", name: "Puzzle Test", nameHi: "पहेली परीक्षण", subtopics: ["Floor Puzzle", "Box Puzzle", "Scheduling Puzzle"], importanceScore: 10 },
              { id: "reas_ana_5", name: "Input Output", nameHi: "इनपुट आउटपुट", subtopics: ["Pattern Based"], importanceScore: 7 },
              { id: "reas_ana_6", name: "Data Sufficiency", nameHi: "डेटा पर्याप्तता", subtopics: ["Single Statement", "Double Statement"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_10",
            name: "गैर-शाब्दिक तर्क (Non-Verbal)",
            topics: [
              { id: "reas_nv_1", name: "Mirror Image", nameHi: "दर्पण प्रतिबिंब", subtopics: ["Vertical Mirror", "Horizontal Mirror"], importanceScore: 10 },
              { id: "reas_nv_2", name: "Water Image", nameHi: "जल प्रतिबिंब", subtopics: ["Reflection Based"], importanceScore: 9 },
              { id: "reas_nv_3", name: "Paper Folding", nameHi: "कागज मोड़ना", subtopics: ["Punching Patterns"], importanceScore: 8 },
              { id: "reas_nv_4", name: "Paper Cutting", nameHi: "कागज काटना", subtopics: ["Symmetry Based Questions"], importanceScore: 8 },
              { id: "reas_nv_5", name: "Embedded Figures", nameHi: "अंतर्निहित आकृतियाँ", subtopics: ["Shape Detection"], importanceScore: 8 },
              { id: "reas_nv_6", name: "Figure Completion", nameHi: "आकृति पूर्ण करना", subtopics: ["Pattern Matching"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_11",
            name: "निर्णय क्षमता एवं तार्किक योग्यता",
            topics: [
              { id: "reas_dm_1", name: "Decision Making", nameHi: "निर्णय क्षमता", subtopics: ["Situational Judgement", "Administrative Decisions"], importanceScore: 9 },
              { id: "reas_dm_2", name: "Cause and Effect", nameHi: "कारण एवं प्रभाव", subtopics: ["Reason Analysis"], importanceScore: 8 },
              { id: "reas_dm_3", name: "Course of Action", nameHi: "कार्यवाही का मार्ग", subtopics: ["Best Action Selection"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_4_ch_12",
            name: "उन्नत तार्किक तर्क",
            topics: [
              { id: "reas_adv_1", name: "Logical Reasoning", nameHi: "तार्किक तर्क", subtopics: ["Deductive Reasoning", "Inductive Reasoning"], importanceScore: 9 },
              { id: "reas_adv_2", name: "Critical Reasoning", nameHi: "आलोचनात्मक तर्क", subtopics: ["Strengthen Argument", "Weaken Argument"], importanceScore: 7 },
              { id: "reas_adv_3", name: "Assertion and Reason", nameHi: "अभिकथन एवं कारण", subtopics: ["Statement Analysis"], importanceScore: 8 }
            ]
          }
        ]
      },
      {
        id: "cgv_master_sub_5",
        name: "हिंदी भाषा",
        weightage: 15,
        importance: "High",
        pyqFrequency: "High",
        isCgSpecific: false,
        chapters: [
          {
            id: "cgv_master_sub_5_ch_1",
            name: "वर्ण विचार",
            topics: [
              { id: "hin_varn_1", name: "Hindi Alphabet", nameHi: "हिंदी वर्णमाला", subtopics: ["स्वर", "व्यंजन", "अयोगवाह"], importanceScore: 10 },
              { id: "hin_varn_2", name: "Vowel and Consonant Classification", nameHi: "स्वर एवं व्यंजन वर्गीकरण", subtopics: ["ह्रस्व", "दीर्घ", "स्पर्श", "ऊष्म"], importanceScore: 8 },
              { id: "hin_varn_3", name: "Pronunciation and Phonetics", nameHi: "उच्चारण एवं ध्वनि", subtopics: ["उच्चारण नियम", "ध्वनि परिवर्तन"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_2",
            name: "संधि",
            topics: [
              { id: "hin_sandhi_1", name: "Swar Sandhi", nameHi: "स्वर संधि", subtopics: ["दीर्घ", "गुण", "वृद्धि", "यण"], importanceScore: 10 },
              { id: "hin_sandhi_2", name: "Vyanjan Sandhi", nameHi: "व्यंजन संधि", subtopics: ["व्यंजन परिवर्तन"], importanceScore: 9 },
              { id: "hin_sandhi_3", name: "Visarga Sandhi", nameHi: "विसर्ग संधि", subtopics: ["विसर्ग परिवर्तन"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_3",
            name: "समास",
            topics: [
              { id: "hin_samas_1", name: "Tatpurush Samas", nameHi: "तत्पुरुष समास", subtopics: ["कर्म", "करण", "सम्प्रदान"], importanceScore: 10 },
              { id: "hin_samas_2", name: "Dwandwa Samas", nameHi: "द्वंद्व समास", subtopics: ["समाहार", "इतरेतर"], importanceScore: 9 },
              { id: "hin_samas_3", name: "Bahuvrihi Samas", nameHi: "बहुव्रीहि समास", subtopics: ["उदाहरण आधारित प्रश्न"], importanceScore: 10 },
              { id: "hin_samas_4", name: "Avyayibhav Samas", nameHi: "अव्ययीभाव समास", subtopics: ["रचना", "पहचान"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_4",
            name: "उपसर्ग एवं प्रत्यय",
            topics: [
              { id: "hin_up_1", name: "Prefixes", nameHi: "उपसर्ग", subtopics: ["संस्कृत उपसर्ग", "हिंदी उपसर्ग"], importanceScore: 10 },
              { id: "hin_up_2", name: "Suffixes", nameHi: "प्रत्यय", subtopics: ["कृत प्रत्यय", "तद्धित प्रत्यय"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_5",
            name: "शब्द विचार",
            topics: [
              { id: "hin_shabd_1", name: "Tatsam and Tadbhav", nameHi: "तत्सम एवं तद्भव", subtopics: ["शब्द पहचान"], importanceScore: 10 },
              { id: "hin_shabd_2", name: "Deshaj and Videshaj Words", nameHi: "देशज एवं विदेशी शब्द", subtopics: ["अरबी", "फारसी", "अंग्रेजी मूल"], importanceScore: 8 },
              { id: "hin_shabd_3", name: "Rudh, Yogik and Yogarudh", nameHi: "रूढ़, यौगिक एवं योगरूढ़", subtopics: ["शब्द वर्गीकरण"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_6",
            name: "शब्द भंडार",
            topics: [
              { id: "hin_vocab_1", name: "Synonyms", nameHi: "पर्यायवाची शब्द", subtopics: ["एकार्थी", "अनेकार्थी पर्याय"], importanceScore: 10 },
              { id: "hin_vocab_2", name: "Antonyms", nameHi: "विलोम शब्द", subtopics: ["तत्सम विलोम", "प्रचलित विलोम"], importanceScore: 10 },
              { id: "hin_vocab_3", name: "One Word Substitution", nameHi: "अनेक शब्दों के लिए एक शब्द", subtopics: ["प्रशासनिक", "साहित्यिक"], importanceScore: 10 },
              { id: "hin_vocab_4", name: "Homonyms", nameHi: "अनेकार्थी शब्द", subtopics: ["अर्थ भेद"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_7",
            name: "मुहावरे एवं लोकोक्तियाँ",
            topics: [
              { id: "hin_idiom_1", name: "Idioms", nameHi: "मुहावरे", subtopics: ["अर्थ", "प्रयोग"], importanceScore: 10 },
              { id: "hin_idiom_2", name: "Proverbs", nameHi: "लोकोक्तियाँ", subtopics: ["अर्थ", "संदर्भ"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_8",
            name: "व्याकरण",
            topics: [
              { id: "hin_gram_1", name: "Noun", nameHi: "संज्ञा", subtopics: ["भेद", "उपयोग"], importanceScore: 10 },
              { id: "hin_gram_2", name: "Pronoun", nameHi: "सर्वनाम", subtopics: ["भेद"], importanceScore: 9 },
              { id: "hin_gram_3", name: "Adjective", nameHi: "विशेषण", subtopics: ["भेद"], importanceScore: 9 },
              { id: "hin_gram_4", name: "Verb", nameHi: "क्रिया", subtopics: ["सकर्मक", "अकर्मक"], importanceScore: 10 },
              { id: "hin_gram_5", name: "Tense", nameHi: "काल", subtopics: ["वर्तमान", "भूत", "भविष्य"], importanceScore: 10 },
              { id: "hin_gram_6", name: "Voice", nameHi: "वाच्य", subtopics: ["कर्तृवाच्य", "कर्मवाच्य"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_9",
            name: "वाक्य एवं अशुद्धि शोधन",
            topics: [
              { id: "hin_sent_1", name: "Sentence Correction", nameHi: "वाक्य शुद्धि", subtopics: ["व्याकरणिक त्रुटि", "अर्थगत त्रुटि"], importanceScore: 10 },
              { id: "hin_sent_2", name: "Spelling Correction", nameHi: "वर्तनी शुद्धि", subtopics: ["सामान्य त्रुटियाँ"], importanceScore: 10 },
              { id: "hin_sent_3", name: "Sentence Transformation", nameHi: "वाक्य रूपांतरण", subtopics: ["सरल", "संयुक्त", "मिश्र"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_10",
            name: "हिंदी साहित्य",
            topics: [
              { id: "hin_lit_1", name: "Ras", nameHi: "रस", subtopics: ["नवरस"], importanceScore: 10 },
              { id: "hin_lit_2", name: "Alankar", nameHi: "अलंकार", subtopics: ["शब्दालंकार", "अर्थालंकार"], importanceScore: 10 },
              { id: "hin_lit_3", name: "Chhand", nameHi: "छंद", subtopics: ["मात्रिक", "वर्णिक"], importanceScore: 8 },
              { id: "hin_lit_4", name: "Hindi Literary Periods", nameHi: "हिंदी साहित्य के काल", subtopics: ["आदिकाल", "भक्तिकाल", "रीतिकाल", "आधुनिक काल"], importanceScore: 9 },
              { id: "hin_lit_5", name: "Major Authors", nameHi: "प्रमुख साहित्यकार", subtopics: ["कबीर", "तुलसीदास", "सूरदास", "प्रेमचंद", "महादेवी वर्मा"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_11",
            name: "गद्यांश एवं बोध",
            topics: [
              { id: "hin_comp_1", name: "Reading Comprehension", nameHi: "अपठित गद्यांश", subtopics: ["तथ्यात्मक प्रश्न", "विश्लेषणात्मक प्रश्न"], importanceScore: 10 },
              { id: "hin_comp_2", name: "Passage Based Vocabulary", nameHi: "गद्यांश आधारित शब्दार्थ", subtopics: ["संदर्भानुसार अर्थ"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_5_ch_12",
            name: "उन्नत हिंदी",
            topics: [
              { id: "hin_adv_1", name: "Official Hindi", nameHi: "राजभाषा हिंदी", subtopics: ["राजभाषा नियम", "संवैधानिक प्रावधान"], importanceScore: 7 },
              { id: "hin_adv_2", name: "Administrative Hindi", nameHi: "प्रशासनिक हिंदी", subtopics: ["कार्यालयी शब्दावली"], importanceScore: 8 },
              { id: "hin_adv_3", name: "Translation Basics", nameHi: "अनुवाद", subtopics: ["अंग्रेजी से हिंदी", "हिंदी से अंग्रेजी"], importanceScore: 7 }
            ]
          }
        ]
      },
      {
        id: "cgv_master_sub_6",
        name: "English Language",
        weightage: 10,
        importance: "Medium",
        pyqFrequency: "Medium",
        isCgSpecific: false,
        chapters: [
          {
            id: "cgv_master_sub_6_ch_1",
            name: "Grammar Fundamentals",
            topics: [
              { id: "eng_gram_1", name: "Parts of Speech", nameHi: "शब्द भेद", subtopics: ["Noun", "Pronoun", "Verb", "Adjective", "Adverb", "Preposition", "Conjunction", "Interjection"], importanceScore: 10 },
              { id: "eng_gram_2", name: "Articles", nameHi: "Articles", subtopics: ["A", "An", "The"], importanceScore: 10 },
              { id: "eng_gram_3", name: "Determiners", nameHi: "निर्धारक", subtopics: ["Some", "Any", "Much", "Many"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_2",
            name: "Tenses",
            topics: [
              { id: "eng_tense_1", name: "Present Tense", nameHi: "वर्तमान काल", subtopics: ["Simple", "Continuous", "Perfect", "Perfect Continuous"], importanceScore: 10 },
              { id: "eng_tense_2", name: "Past Tense", nameHi: "भूतकाल", subtopics: ["Simple", "Continuous", "Perfect", "Perfect Continuous"], importanceScore: 10 },
              { id: "eng_tense_3", name: "Future Tense", nameHi: "भविष्य काल", subtopics: ["Simple", "Continuous", "Perfect", "Perfect Continuous"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_3",
            name: "Verb Forms",
            topics: [
              { id: "eng_verb_1", name: "Subject Verb Agreement", nameHi: "कर्ता-क्रिया सामंजस्य", subtopics: ["Singular Subjects", "Plural Subjects"], importanceScore: 10 },
              { id: "eng_verb_2", name: "Auxiliary Verbs", nameHi: "सहायक क्रियाएँ", subtopics: ["Be", "Have", "Do"], importanceScore: 8 },
              { id: "eng_verb_3", name: "Modal Verbs", nameHi: "Modal Verbs", subtopics: ["Can", "Could", "May", "Must", "Should"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_4",
            name: "Voice and Narration",
            topics: [
              { id: "eng_voice_1", name: "Active and Passive Voice", nameHi: "कर्तृवाच्य एवं कर्मवाच्य", subtopics: ["Tense Based Voice", "Modal Voice"], importanceScore: 10 },
              { id: "eng_voice_2", name: "Direct and Indirect Speech", nameHi: "प्रत्यक्ष एवं अप्रत्यक्ष कथन", subtopics: ["Statements", "Questions", "Commands", "Exclamations"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_5",
            name: "Sentence Structure",
            topics: [
              { id: "eng_sent_1", name: "Sentence Formation", nameHi: "वाक्य निर्माण", subtopics: ["Simple Sentence", "Compound Sentence", "Complex Sentence"], importanceScore: 9 },
              { id: "eng_sent_2", name: "Transformation of Sentences", nameHi: "वाक्य परिवर्तन", subtopics: ["Assertive", "Interrogative", "Exclamatory", "Imperative"], importanceScore: 8 },
              { id: "eng_sent_3", name: "Question Tags", nameHi: "Question Tags", subtopics: ["Positive Tag", "Negative Tag"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_6",
            name: "Vocabulary",
            topics: [
              { id: "eng_vocab_1", name: "Synonyms", nameHi: "समानार्थी शब्द", subtopics: ["Word Meaning"], importanceScore: 10 },
              { id: "eng_vocab_2", name: "Antonyms", nameHi: "विलोम शब्द", subtopics: ["Opposite Words"], importanceScore: 10 },
              { id: "eng_vocab_3", name: "One Word Substitution", nameHi: "अनेक शब्दों के लिए एक शब्द", subtopics: ["Common Exam Words"], importanceScore: 10 },
              { id: "eng_vocab_4", name: "Homophones", nameHi: "समोच्चारित शब्द", subtopics: ["Common Homophones"], importanceScore: 8 },
              { id: "eng_vocab_5", name: "Phrasal Verbs", nameHi: "Phrasal Verbs", subtopics: ["Common Usage"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_7",
            name: "Idioms and Phrases",
            topics: [
              { id: "eng_idiom_1", name: "Idioms", nameHi: "मुहावरे", subtopics: ["Meaning", "Usage"], importanceScore: 10 },
              { id: "eng_idiom_2", name: "Phrases", nameHi: "वाक्यांश", subtopics: ["Common Expressions"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_8",
            name: "Error Detection",
            topics: [
              { id: "eng_err_1", name: "Grammatical Errors", nameHi: "व्याकरण संबंधी त्रुटियाँ", subtopics: ["Tense Error", "Agreement Error", "Article Error"], importanceScore: 10 },
              { id: "eng_err_2", name: "Sentence Improvement", nameHi: "वाक्य सुधार", subtopics: ["Best Alternative"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_9",
            name: "Reading Comprehension",
            topics: [
              { id: "eng_comp_1", name: "Passage Comprehension", nameHi: "गद्यांश आधारित प्रश्न", subtopics: ["Factual Questions", "Inference Questions", "Vocabulary Questions"], importanceScore: 10 },
              { id: "eng_comp_2", name: "Cloze Test", nameHi: "रिक्त स्थान पूर्ति गद्यांश", subtopics: ["Grammar Based", "Vocabulary Based"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_10",
            name: "Word Usage",
            topics: [
              { id: "eng_use_1", name: "Confusing Words", nameHi: "भ्रमित करने वाले शब्द", subtopics: ["Accept/Except", "Affect/Effect"], importanceScore: 8 },
              { id: "eng_use_2", name: "Spellings", nameHi: "वर्तनी", subtopics: ["Frequently Asked Words"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_11",
            name: "Advanced English",
            topics: [
              { id: "eng_adv_1", name: "Para Jumbles", nameHi: "वाक्य क्रम व्यवस्था", subtopics: ["Sentence Arrangement"], importanceScore: 8 },
              { id: "eng_adv_2", name: "Fill in the Blanks", nameHi: "रिक्त स्थान पूर्ति", subtopics: ["Single Blank", "Double Blank"], importanceScore: 10 },
              { id: "eng_adv_3", name: "Word Replacement", nameHi: "शब्द प्रतिस्थापन", subtopics: ["Context Based Usage"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_6_ch_12",
            name: "Communication English",
            topics: [
              { id: "eng_comm_1", name: "Official Communication", nameHi: "औपचारिक संचार", subtopics: ["Notice", "Letter", "Email Basics"], importanceScore: 7 },
              { id: "eng_comm_2", name: "Common Expressions", nameHi: "सामान्य अभिव्यक्तियाँ", subtopics: ["Greetings", "Formal Usage"], importanceScore: 6 }
            ]
          }
        ]
      },
      {
        id: "cgv_master_sub_7",
        name: "कंप्यूटर ज्ञान (Computer Knowledge)",
        weightage: 10,
        importance: "High",
        pyqFrequency: "Medium",
        isCgSpecific: false,
        chapters: [
          {
            id: "cgv_master_sub_7_ch_1",
            name: "कंप्यूटर की मूल अवधारणाएँ",
            topics: [
              { id: "comp_basic_1", name: "Introduction to Computers", nameHi: "कंप्यूटर का परिचय", subtopics: ["Definition", "Characteristics", "Applications"], importanceScore: 10 },
              { id: "comp_basic_2", name: "History of Computers", nameHi: "कंप्यूटर का इतिहास", subtopics: ["Abacus", "Charles Babbage", "ENIAC"], importanceScore: 8 },
              { id: "comp_basic_3", name: "Generations of Computers", nameHi: "कंप्यूटर की पीढ़ियाँ", subtopics: ["First Generation", "Second Generation", "Third Generation", "Fourth Generation", "Fifth Generation"], importanceScore: 10 },
              { id: "comp_basic_4", name: "Types of Computers", nameHi: "कंप्यूटर के प्रकार", subtopics: ["Micro Computer", "Mini Computer", "Mainframe", "Super Computer"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_7_ch_2",
            name: "कंप्यूटर हार्डवेयर",
            topics: [
              { id: "comp_hw_1", name: "Input Devices", nameHi: "इनपुट डिवाइस", subtopics: ["Keyboard", "Mouse", "Scanner", "MICR", "OCR", "OMR"], importanceScore: 10 },
              { id: "comp_hw_2", name: "Output Devices", nameHi: "आउटपुट डिवाइस", subtopics: ["Monitor", "Printer", "Plotter", "Speaker"], importanceScore: 10 },
              { id: "comp_hw_3", name: "CPU and Memory", nameHi: "CPU एवं मेमोरी", subtopics: ["ALU", "CU", "Registers", "Cache Memory"], importanceScore: 10 },
              { id: "comp_hw_4", name: "Storage Devices", nameHi: "संग्रहण उपकरण", subtopics: ["Hard Disk", "SSD", "CD/DVD", "Pen Drive"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_7_ch_3",
            name: "सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम",
            topics: [
              { id: "comp_sw_1", name: "Software Fundamentals", nameHi: "सॉफ्टवेयर की मूल बातें", subtopics: ["System Software", "Application Software"], importanceScore: 10 },
              { id: "comp_sw_2", name: "Operating System", nameHi: "ऑपरेटिंग सिस्टम", subtopics: ["Windows", "Linux", "Android"], importanceScore: 10 },
              { id: "comp_sw_3", name: "Functions of Operating System", nameHi: "ऑपरेटिंग सिस्टम के कार्य", subtopics: ["Memory Management", "Process Management", "File Management"], importanceScore: 9 },
              { id: "comp_sw_4", name: "Programming Languages", nameHi: "प्रोग्रामिंग भाषाएँ", subtopics: ["Machine Language", "Assembly Language", "High Level Language"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_7_ch_4",
            name: "MS Office",
            topics: [
              { id: "comp_office_1", name: "MS Word", nameHi: "एमएस वर्ड", subtopics: ["Formatting", "Tables", "Mail Merge"], importanceScore: 10 },
              { id: "comp_office_2", name: "MS Excel", nameHi: "एमएस एक्सेल", subtopics: ["Formulas", "Functions", "Charts", "Sorting"], importanceScore: 10 },
              { id: "comp_office_3", name: "MS PowerPoint", nameHi: "एमएस पावरपॉइंट", subtopics: ["Slides", "Animations", "Presentation"], importanceScore: 9 },
              { id: "comp_office_4", name: "MS Access", nameHi: "एमएस एक्सेस", subtopics: ["Database", "Tables", "Queries"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_7_ch_5",
            name: "डेटाबेस प्रबंधन",
            topics: [
              { id: "comp_db_1", name: "Database Concepts", nameHi: "डेटाबेस की अवधारणाएँ", subtopics: ["Data", "Information", "Database"], importanceScore: 9 },
              { id: "comp_db_2", name: "DBMS", nameHi: "DBMS", subtopics: ["Advantages", "Applications"], importanceScore: 9 },
              { id: "comp_db_3", name: "RDBMS", nameHi: "RDBMS", subtopics: ["Tables", "Relations", "Keys"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_7_ch_6",
            name: "इंटरनेट एवं नेटवर्किंग",
            topics: [
              { id: "comp_net_1", name: "Internet Basics", nameHi: "इंटरनेट की मूल बातें", subtopics: ["WWW", "Web Browser", "Search Engine"], importanceScore: 10 },
              { id: "comp_net_2", name: "Networking", nameHi: "नेटवर्किंग", subtopics: ["LAN", "MAN", "WAN"], importanceScore: 10 },
              { id: "comp_net_3", name: "Internet Protocols", nameHi: "इंटरनेट प्रोटोकॉल", subtopics: ["HTTP", "HTTPS", "FTP", "TCP/IP"], importanceScore: 8 },
              { id: "comp_net_4", name: "Email", nameHi: "ई-मेल", subtopics: ["Email Structure", "CC", "BCC", "Attachments"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_7_ch_7",
            name: "साइबर सुरक्षा",
            topics: [
              { id: "comp_cyber_1", name: "Cyber Security Basics", nameHi: "साइबर सुरक्षा की मूल बातें", subtopics: ["Cyber Threats", "Cyber Attacks"], importanceScore: 10 },
              { id: "comp_cyber_2", name: "Malware", nameHi: "मैलवेयर", subtopics: ["Virus", "Worm", "Trojan", "Ransomware"], importanceScore: 10 },
              { id: "comp_cyber_3", name: "Cyber Crimes", nameHi: "साइबर अपराध", subtopics: ["Phishing", "Identity Theft", "Online Fraud"], importanceScore: 10 },
              { id: "comp_cyber_4", name: "Security Tools", nameHi: "सुरक्षा उपकरण", subtopics: ["Antivirus", "Firewall", "Encryption"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_7_ch_8",
            name: "डिजिटल इंडिया एवं ई-गवर्नेंस",
            topics: [
              { id: "comp_digi_1", name: "Digital India Mission", nameHi: "डिजिटल इंडिया मिशन", subtopics: ["Objectives", "Pillars"], importanceScore: 10 },
              { id: "comp_digi_2", name: "E-Governance", nameHi: "ई-गवर्नेंस", subtopics: ["G2C", "G2B", "G2G"], importanceScore: 9 },
              { id: "comp_digi_3", name: "Digital Payments", nameHi: "डिजिटल भुगतान", subtopics: ["UPI", "BHIM", "NEFT", "RTGS", "IMPS"], importanceScore: 10 },
              { id: "comp_digi_4", name: "Aadhaar and DigiLocker", nameHi: "आधार एवं डिजिलॉकर", subtopics: ["UIDAI", "Digital Documents"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_7_ch_9",
            name: "क्लाउड एवं उभरती तकनीक",
            topics: [
              { id: "comp_new_1", name: "Cloud Computing", nameHi: "क्लाउड कंप्यूटिंग", subtopics: ["IaaS", "PaaS", "SaaS"], importanceScore: 8 },
              { id: "comp_new_2", name: "Artificial Intelligence", nameHi: "कृत्रिम बुद्धिमत्ता", subtopics: ["AI", "Machine Learning", "Deep Learning"], importanceScore: 9 },
              { id: "comp_new_3", name: "Blockchain Technology", nameHi: "ब्लॉकचेन तकनीक", subtopics: ["Cryptography", "Distributed Ledger"], importanceScore: 7 },
              { id: "comp_new_4", name: "Internet of Things", nameHi: "इंटरनेट ऑफ थिंग्स", subtopics: ["Smart Devices", "Applications"], importanceScore: 7 }
            ]
          },
          {
            id: "cgv_master_sub_7_ch_10",
            name: "प्रतियोगी परीक्षा विशेष",
            topics: [
              { id: "comp_exam_1", name: "Computer Abbreviations", nameHi: "कंप्यूटर संक्षिप्त रूप", subtopics: ["CPU", "RAM", "ROM", "USB", "URL"], importanceScore: 10 },
              { id: "comp_exam_2", name: "Important Full Forms", nameHi: "महत्वपूर्ण फुल फॉर्म", subtopics: ["WWW", "HTTP", "SMTP", "HTML"], importanceScore: 10 },
              { id: "comp_exam_3", name: "Computer Current Affairs", nameHi: "कंप्यूटर समसामयिकी", subtopics: ["Latest Technologies", "Government Initiatives"], importanceScore: 8 }
            ]
          }
        ]
      },
      {
        id: "cgv_master_sub_8",
        name: "Current Affairs",
        weightage: 15,
        importance: "Very High",
        pyqFrequency: "Very High",
        isCgSpecific: false,
        chapters: [
          {
            id: "cgv_master_sub_8_ch_1",
            name: "राष्ट्रीय समसामयिकी",
            topics: [
              { id: "ca_nat_1", name: "Government Schemes", nameHi: "केंद्र सरकार की योजनाएँ", subtopics: ["PM Kisan", "PM Awas Yojana", "Ayushman Bharat", "Jal Jeevan Mission", "PM Vishwakarma"], importanceScore: 10 },
              { id: "ca_nat_2", name: "Parliament and Bills", nameHi: "संसद एवं विधेयक", subtopics: ["महत्वपूर्ण विधेयक", "संविधान संशोधन", "संसदीय घटनाएँ"], importanceScore: 10 },
              { id: "ca_nat_3", name: "Appointments", nameHi: "महत्वपूर्ण नियुक्तियाँ", subtopics: ["राष्ट्रपति", "राज्यपाल", "मुख्य न्यायाधीश", "सेना प्रमुख"], importanceScore: 10 },
              { id: "ca_nat_4", name: "Reports and Indexes", nameHi: "रिपोर्ट एवं सूचकांक", subtopics: ["HDI", "Global Hunger Index", "World Happiness Report"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_8_ch_2",
            name: "छत्तीसगढ़ समसामयिकी",
            topics: [
              { id: "ca_cg_1", name: "State Government Schemes", nameHi: "राज्य सरकार की योजनाएँ", subtopics: ["महतारी वंदन योजना", "कृषि योजनाएँ", "युवा योजनाएँ"], importanceScore: 10 },
              { id: "ca_cg_2", name: "State Budget", nameHi: "छत्तीसगढ़ बजट", subtopics: ["मुख्य घोषणाएँ", "राजस्व", "व्यय"], importanceScore: 10 },
              { id: "ca_cg_3", name: "State Appointments", nameHi: "राज्य स्तरीय नियुक्तियाँ", subtopics: ["मुख्य सचिव", "DGP", "राज्य आयोग"], importanceScore: 9 },
              { id: "ca_cg_4", name: "Chhattisgarh Current Events", nameHi: "छत्तीसगढ़ की वर्तमान घटनाएँ", subtopics: ["नई परियोजनाएँ", "उद्योग", "पुरस्कार", "खेल"], importanceScore: 10 }
            ]
          },
          {
            id: "cgv_master_sub_8_ch_3",
            name: "अंतरराष्ट्रीय समसामयिकी",
            topics: [
              { id: "ca_int_1", name: "International Organizations", nameHi: "अंतरराष्ट्रीय संगठन", subtopics: ["UNO", "WHO", "IMF", "World Bank", "WTO"], importanceScore: 10 },
              { id: "ca_int_2", name: "International Summits", nameHi: "अंतरराष्ट्रीय सम्मेलन", subtopics: ["G20", "BRICS", "SCO", "ASEAN"], importanceScore: 10 },
              { id: "ca_int_3", name: "International Relations", nameHi: "अंतरराष्ट्रीय संबंध", subtopics: ["भारत-अमेरिका", "भारत-रूस", "भारत-जापान"], importanceScore: 8 },
              { id: "ca_int_4", name: "Global Events", nameHi: "वैश्विक घटनाएँ", subtopics: ["युद्ध", "संधियाँ", "वैश्विक संकट"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_8_ch_4",
            name: "अर्थव्यवस्था एवं बैंकिंग",
            topics: [
              { id: "ca_eco_1", name: "Union Budget", nameHi: "केंद्रीय बजट", subtopics: ["Budget Highlights", "Tax Reforms"], importanceScore: 10 },
              { id: "ca_eco_2", name: "RBI and Monetary Policy", nameHi: "RBI एवं मौद्रिक नीति", subtopics: ["Repo Rate", "Reverse Repo Rate", "CRR", "SLR"], importanceScore: 10 },
              { id: "ca_eco_3", name: "Economic Survey", nameHi: "आर्थिक सर्वेक्षण", subtopics: ["GDP", "Growth Rate", "Inflation"], importanceScore: 10 },
              { id: "ca_eco_4", name: "Banking and Finance", nameHi: "बैंकिंग एवं वित्त", subtopics: ["Digital Banking", "UPI", "Financial Inclusion"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_8_ch_5",
            name: "विज्ञान एवं प्रौद्योगिकी",
            topics: [
              { id: "ca_sci_1", name: "Space Missions", nameHi: "अंतरिक्ष मिशन", subtopics: ["ISRO", "Chandrayaan", "Gaganyaan", "Aditya L1"], importanceScore: 10 },
              { id: "ca_sci_2", name: "Defence Technology", nameHi: "रक्षा प्रौद्योगिकी", subtopics: ["Missiles", "Defence Exercises"], importanceScore: 9 },
              { id: "ca_sci_3", name: "Emerging Technologies", nameHi: "उभरती तकनीक", subtopics: ["AI", "Quantum Computing", "Blockchain"], importanceScore: 9 },
              { id: "ca_sci_4", name: "Scientific Discoveries", nameHi: "वैज्ञानिक खोजें", subtopics: ["Research", "Innovations"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_8_ch_6",
            name: "पर्यावरण एवं जलवायु",
            topics: [
              { id: "ca_env_1", name: "Climate Change", nameHi: "जलवायु परिवर्तन", subtopics: ["COP Summit", "Global Warming"], importanceScore: 10 },
              { id: "ca_env_2", name: "Environmental Reports", nameHi: "पर्यावरण रिपोर्ट", subtopics: ["IPCC", "UNEP Reports"], importanceScore: 8 },
              { id: "ca_env_3", name: "Conservation Initiatives", nameHi: "संरक्षण पहल", subtopics: ["Tiger Conservation", "Project Elephant"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_8_ch_7",
            name: "खेल",
            topics: [
              { id: "ca_sports_1", name: "National Sports Events", nameHi: "राष्ट्रीय खेल आयोजन", subtopics: ["Khelo India", "National Games"], importanceScore: 8 },
              { id: "ca_sports_2", name: "International Sports", nameHi: "अंतरराष्ट्रीय खेल", subtopics: ["Olympics", "Asian Games", "Commonwealth Games"], importanceScore: 10 },
              { id: "ca_sports_3", name: "Sports Awards", nameHi: "खेल पुरस्कार", subtopics: ["Major Dhyan Chand Award", "Arjuna Award", "Dronacharya Award"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_8_ch_8",
            name: "पुरस्कार एवं सम्मान",
            topics: [
              { id: "ca_award_1", name: "National Awards", nameHi: "राष्ट्रीय पुरस्कार", subtopics: ["Bharat Ratna", "Padma Awards"], importanceScore: 10 },
              { id: "ca_award_2", name: "International Awards", nameHi: "अंतरराष्ट्रीय पुरस्कार", subtopics: ["Nobel Prize", "Booker Prize", "Oscar Awards"], importanceScore: 9 }
            ]
          },
          {
            id: "cgv_master_sub_8_ch_9",
            name: "पुस्तकें एवं लेखक",
            topics: [
              { id: "ca_book_1", name: "Books and Authors", nameHi: "पुस्तकें एवं लेखक", subtopics: ["Recent Books", "Important Authors"], importanceScore: 8 }
            ]
          },
          {
            id: "cgv_master_sub_8_ch_10",
            name: "महत्वपूर्ण दिवस",
            topics: [
              { id: "ca_day_1", name: "National Important Days", nameHi: "राष्ट्रीय महत्वपूर्ण दिवस", subtopics: ["National Youth Day", "Constitution Day"], importanceScore: 8 },
              { id: "ca_day_2", name: "International Important Days", nameHi: "अंतरराष्ट्रीय महत्वपूर्ण दिवस", subtopics: ["Earth Day", "Environment Day", "Yoga Day"], importanceScore: 8 }
            ]
          }
        ]
      }
    ]
  }

};

