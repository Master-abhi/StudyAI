/* ═══════════════════════════════════════════════════════════════
   CG Guru — CGPSC & Other CG Exams Syllabus Data
   Chhattisgarh Professional Examination Board exams
   ═══════════════════════════════════════════════════════════════ */

const CGPSC_EXAM_DATA = {

  /* ─────────────────────────────────────────────────────────────
     1. CGPSC SSE (State Service Exam)
  ───────────────────────────────────────────────────────────── */
  "cgpsc_sse": {
    name: "CGPSC SSE",
    fullName: "Chhattisgarh Public Service Commission - State Service Exam",
    icon: "🏛️",
    category: "cgpsc",
    description: "CG ka sabse prestigious exam. Deputy Collector, DSP, Naib Tehsildar ke liye.",
    eligibility: "Graduation",
    pattern: {
      totalMarks: 1950,
      time: "Prelims: 2 hrs | Mains: 3 hrs each",
      type: "Prelims + Mains + Interview",
      papers: [
        { paper: "Prelims Paper 1 — General Studies", marks: 200 },
        { paper: "Prelims Paper 2 — CSAT (Qualifying)", marks: 200 },
        { paper: "Mains — 7 Papers", marks: 1400 },
        { paper: "Interview", marks: 150 }
      ]
    },
    subjects: [
      {
        name: "Prelims Paper 1 — General Studies (200 Marks)",
        topics: [
          { id: "cgpsc-pre-p1-1", name: "Indian History — Ancient India", nameHi: "भारतीय इतिहास — प्राचीन भारत" },
          { id: "cgpsc-pre-p1-2", name: "Indian History — Medieval India", nameHi: "भारतीय इतिहास — मध्यकालीन भारत" },
          { id: "cgpsc-pre-p1-3", name: "Indian History — Modern India & Freedom Movement", nameHi: "भारतीय इतिहास — आधुनिक भारत व स्वतंत्रता आंदोलन" },
          { id: "cgpsc-pre-p1-4", name: "Indian Geography — Physical Features", nameHi: "भारतीय भूगोल — भौतिक विशेषताएं" },
          { id: "cgpsc-pre-p1-5", name: "Indian Geography — Economic & Social", nameHi: "भारतीय भूगोल — आर्थिक एवं सामाजिक" },
          { id: "cgpsc-pre-p1-6", name: "World Geography", nameHi: "विश्व भूगोल" },
          { id: "cgpsc-pre-p1-7", name: "Indian Constitution — Features & Amendments", nameHi: "भारतीय संविधान — विशेषताएं एवं संशोधन" },
          { id: "cgpsc-pre-p1-8", name: "Indian Polity — Parliament & Executive", nameHi: "भारतीय राजव्यवस्था — संसद एवं कार्यपालिका" },
          { id: "cgpsc-pre-p1-9", name: "Indian Economy — Planning & Development", nameHi: "भारतीय अर्थव्यवस्था — योजना एवं विकास" },
          { id: "cgpsc-pre-p1-10", name: "Indian Economy — Banking & Finance", nameHi: "भारतीय अर्थव्यवस्था — बैंकिंग एवं वित्त" },
          { id: "cgpsc-pre-p1-11", name: "Environment & Ecology", nameHi: "पर्यावरण एवं पारिस्थितिकी" },
          { id: "cgpsc-pre-p1-12", name: "General Science — Physics", nameHi: "सामान्य विज्ञान — भौतिकी" },
          { id: "cgpsc-pre-p1-13", name: "General Science — Chemistry", nameHi: "सामान्य विज्ञान — रसायन विज्ञान" },
          { id: "cgpsc-pre-p1-14", name: "General Science — Biology & Health", nameHi: "सामान्य विज्ञान — जीव विज्ञान एवं स्वास्थ्य" },
          { id: "cgpsc-pre-p1-15", name: "Science & Technology — Space, Defence, IT", nameHi: "विज्ञान एवं प्रौद्योगिकी — अंतरिक्ष, रक्षा, IT" },
          { id: "cgpsc-pre-p1-16", name: "Current Affairs — National & International", nameHi: "करंट अफेयर्स — राष्ट्रीय एवं अंतर्राष्ट्रीय" },
          { id: "cgpsc-cg-1", name: "CG History — Pragataitihasik & Sirpur Civilization", nameHi: "CG इतिहास — प्रागैतिहासिक एवं सिरपुर सभ्यता" },
          { id: "cgpsc-cg-2", name: "CG History — Kalachuri/Chedi & Nagvanshi Vansh", nameHi: "CG इतिहास — कलचुरी/चेदी एवं नागवंशी वंश" },
          { id: "cgpsc-cg-3", name: "CG History — Maratha & British Period", nameHi: "CG इतिहास — मराठा एवं ब्रिटिश काल" },
          { id: "cgpsc-cg-4", name: "CG History — Freedom Movement & Veer Narayan Singh", nameHi: "CG इतिहास — स्वतंत्रता आंदोलन व वीर नारायण सिंह" },
          { id: "cgpsc-cg-5", name: "CG State Formation — 1 Nov 2000", nameHi: "CG राज्य गठन — 1 नवंबर 2000" },
          { id: "cgpsc-cg-6", name: "CG Geography — Districts, Sambhag, Location", nameHi: "CG भूगोल — जिले, संभाग, स्थिति" },
          { id: "cgpsc-cg-7", name: "CG Geography — Rivers (Mahanadi, Sheonath, Hasdeo)", nameHi: "CG भूगोल — नदियां (महानदी, श्यानाथ, हसदेव)" },
          { id: "cgpsc-cg-8", name: "CG Geography — Climate, Soil & Rainfall", nameHi: "CG भूगोल — जलवायु, मिट्टी व वर्षा" },
          { id: "cgpsc-cg-9", name: "CG Census — Population, Tribes Percentage", nameHi: "CG जनगणना — जनसंख्या, जनजाति प्रतिशत" },
          { id: "cgpsc-cg-10", name: "CG Archaeological Sites & Tourist Centers", nameHi: "CG पुरातात्विक स्थल व पर्यटन केंद्र" },
          { id: "cgpsc-cg-11", name: "CG Literature, Music & Dance (Panthi, Raut Nacha)", nameHi: "CG साहित्य, संगीत व नृत्य (पांथी, राउत नाचा)" },
          { id: "cgpsc-cg-12", name: "CG Tribes — Gond, Baiga, Halbi & Special Traditions", nameHi: "CG जनजातियां — गोंड, बैगा, हल्बी व विशेष परंपराएं" },
          { id: "cgpsc-cg-13", name: "CG Teej, Tyohar & Festivals (Hareli, Pola, Bastar Dussehra)", nameHi: "CG त्योहार (हरेली, पोला, बस्तर दशहरा)" },
          { id: "cgpsc-cg-14", name: "CG Administrative Structure & Local Govt", nameHi: "CG प्रशासनिक संरचना व स्थानीय शासन" },
          { id: "cgpsc-cg-15", name: "CG Panchayati Raj System", nameHi: "CG पंचायती राज व्यवस्था" },
          { id: "cgpsc-cg-16", name: "CG Industry — Steel (Bhilai), Coal (Korba), BALCO", nameHi: "CG उद्योग — इस्पात (भिलाई), कोयला (कोरबा), BALCO" },
          { id: "cgpsc-cg-17", name: "CG Minerals — Iron Ore (Bailadila), Limestone, Diamond", nameHi: "CG खनिज — लौह अयस्क (बैलाडीला), चूना पत्थर, हीरा" },
          { id: "cgpsc-cg-18", name: "CG Energy — NTPC Sipat, Hasdeo Bango, Solar", nameHi: "CG ऊर्जा — NTPC सीपत, हसदेव बांगो, सौर" },
          { id: "cgpsc-cg-19", name: "CG Forests — National Parks (Kanha, Indravati), Wildlife", nameHi: "CG वन — राष्ट्रीय उद्यान (कान्हा, इंद्रावती), वन्यजीव" },
          { id: "cgpsc-cg-20", name: "CG Current Affairs — Schemes, Governance", nameHi: "CG करंट अफेयर्स — योजनाएं, शासन" }
        ]
      },
      {
        name: "Prelims Paper 2 — CSAT / Aptitude (200 Marks — Qualifying)",
        topics: [
          { id: "cgpsc-csat-1", name: "Reading Comprehension", nameHi: "अपठित गद्यांश" },
          { id: "cgpsc-csat-2", name: "Interpersonal Skills & Communication", nameHi: "अंतर-व्यक्तिगत कौशल एवं संचार" },
          { id: "cgpsc-csat-3", name: "Logical Reasoning & Analytical Ability", nameHi: "तार्किक reasoning एवं विश्लेषणात्मक क्षमता" },
          { id: "cgpsc-csat-4", name: "Decision Making & Problem Solving", nameHi: "निर्णय निर्माण एवं समस्या समाधान" },
          { id: "cgpsc-csat-5", name: "General Mental Ability", nameHi: "सामान्य मानसिक क्षमता" },
          { id: "cgpsc-csat-6", name: "Basic Numeracy — Number System & Arithmetic", nameHi: "मूल संख्यात्मक क्षमता — संख्या पद्धति एवं अंकगणित" },
          { id: "cgpsc-csat-7", name: "Basic Numeracy — Percentage, Ratio, SI/CI", nameHi: "मूल संख्यात्मक — प्रतिशत, अनुपात, साधारण/चक्रवृद्धि ब्याज" },
          { id: "cgpsc-csat-8", name: "Data Interpretation — Tables & Charts", nameHi: "डेटा व्याख्या — तालिकाएं एवं चार्ट" },
          { id: "cgpsc-csat-9", name: "Hindi Comprehension", nameHi: "हिंदी अपठित" }
        ]
      },
      {
        name: "Mains Paper 1 — Language (Hindi + Chhattisgarhi + English)",
        topics: [
          { id: "cgpsc-m1-1", name: "Hindi Vyakaran — Sandhi, Samas, Karak", nameHi: "हिंदी व्याकरण — संधि, समास, कारक" },
          { id: "cgpsc-m1-2", name: "Hindi Rachna — Nibandh, Patr Lekhan", nameHi: "हिंदी रचना — निबंध, पत्र लेखन" },
          { id: "cgpsc-m1-3", name: "Hindi Muhavare aur Lokoktiyan", nameHi: "हिंदी मुहावरे एवं लोकोक्तियां" },
          { id: "cgpsc-m1-4", name: "Chhattisgarhi Bhasha — Vyakaran", nameHi: "छत्तीसगढ़ी भाषा — व्याकरण" },
          { id: "cgpsc-m1-5", name: "Chhattisgarhi Sahityakaar & Kritiyan", nameHi: "छत्तीसगढ़ी साहित्यकार एवं रचनाएं" },
          { id: "cgpsc-m1-6", name: "English Comprehension & Precis Writing", nameHi: "अंग्रेजी समझ एवं संक्षेपण लेखन" },
          { id: "cgpsc-m1-7", name: "English Grammar — Tenses, Prepositions, Voice", nameHi: "अंग्रेजी व्याकरण — काल, पूर्वसर्ग, वाच्य" }
        ]
      },
      {
        name: "Mains Paper 3 — GS I: History + Constitution + Admin",
        topics: [
          { id: "cgpsc-m3-1", name: "Ancient Indian History", nameHi: "प्राचीन भारतीय इतिहास" },
          { id: "cgpsc-m3-2", name: "Medieval Indian History", nameHi: "मध्यकालीन भारतीय इतिहास" },
          { id: "cgpsc-m3-3", name: "Modern India — Freedom Movement", nameHi: "आधुनिक भारत — स्वतंत्रता आंदोलन" },
          { id: "cgpsc-m3-4", name: "CG History — Kalachuri to 2000", nameHi: "CG इतिहास — कलचुरी से 2000" },
          { id: "cgpsc-m3-5", name: "Indian Constitution — Making & Features", nameHi: "भारतीय संविधान — निर्माण एवं विशेषताएं" },
          { id: "cgpsc-m3-6", name: "Fundamental Rights & DPSP", nameHi: "मूल अधिकार एवं DPSP" },
          { id: "cgpsc-m3-7", name: "Parliament, Executive, Judiciary", nameHi: "संसद, कार्यपालिका, न्यायपालिका" },
          { id: "cgpsc-m3-8", name: "Public Administration — Concepts", nameHi: "लोक प्रशासन — अवधारणाएं" },
          { id: "cgpsc-m3-9", name: "CG Administrative Structure & Panchayati Raj", nameHi: "CG प्रशासनिक संरचना एवं पंचायती राज" },
          { id: "cgpsc-m3-10", name: "Ethics in Governance & RTI", nameHi: "शासन में नैतिकता एवं RTI" }
        ]
      },
      {
        name: "Mains Paper 5 — GS III: Economy + CG Geography",
        topics: [
          { id: "cgpsc-m5-1", name: "Indian Economy — GDP, Planning, NITI Aayog", nameHi: "भारतीय अर्थव्यवस्था — GDP, योजना, NITI आयोग" },
          { id: "cgpsc-m5-2", name: "Agriculture & Irrigation Policy", nameHi: "कृषि एवं सिंचाई नीति" },
          { id: "cgpsc-m5-3", name: "Banking System — RBI, NABARD, Monetary Policy", nameHi: "बैंकिंग प्रणाली — RBI, NABARD, मौद्रिक नीति" },
          { id: "cgpsc-m5-4", name: "Poverty, Unemployment & Human Development", nameHi: "गरीबी, बेरोजगारी एवं मानव विकास" },
          { id: "cgpsc-m5-5", name: "CG Economy — Industry, Mining, MSME", nameHi: "CG अर्थव्यवस्था — उद्योग, खनन, MSME" },
          { id: "cgpsc-m5-6", name: "CG Agriculture — MSP, Kisan Nyay Yojana", nameHi: "CG कृषि — MSP, किसान न्याय योजना" },
          { id: "cgpsc-m5-7", name: "Indian Geography — Physical Features & Resources", nameHi: "भारतीय भूगोल — भौतिक विशेषताएं एवं संसाधन" },
          { id: "cgpsc-m5-8", name: "CG Geography — Rivers, Minerals, Forest Cover", nameHi: "CG भूगोल — नदियां, खनिज, वन आवरण" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     2. CG Police SI (Sub-Inspector)
  ───────────────────────────────────────────────────────────── */
  "cg_police_si": {
    name: "CG Police SI",
    fullName: "CG Police Sub-Inspector (Subedar & Platoon Commander)",
    icon: "👮",
    category: "police",
    description: "Home (Police) Dept — 308 Posts. Prelims + Mains + Interview + Physical Test.",
    eligibility: "Graduation",
    pattern: {
      totalMarks: 900,
      time: "2 Hours",
      type: "Objective MCQ + Physical Test",
      papers: [
        { paper: "Prelims — General Knowledge", marks: 300 },
        { paper: "Mains — GS, Hindi, English, Maths, Computer", marks: 500 },
        { paper: "Interview", marks: 100 }
      ]
    },
    subjects: [
      {
        name: "Prelims — General Knowledge (300 Marks)",
        topics: [
          { id: "si-pre-cg-1", name: "CG History — Pragataitihasik to Freedom Movement", nameHi: "CG इतिहास — प्रागैतिहासिक से स्वतंत्रता आंदोलन" },
          { id: "si-pre-cg-2", name: "CG Geography — Districts, Rivers, Minerals", nameHi: "CG भूगोल — जिले, नदियां, खनिज" },
          { id: "si-pre-cg-3", name: "CG Administrative Structure", nameHi: "CG प्रशासनिक संरचना" },
          { id: "si-pre-cg-4", name: "CG Tribes — Culture, Festivals, Dance", nameHi: "CG जनजातियां — संस्कृति, त्योहार, नृत्य" },
          { id: "si-pre-cg-5", name: "CG Current Affairs — Schemes & Events", nameHi: "CG करंट अफेयर्स — योजनाएं एवं घटनाएं" },
          { id: "si-pre-1", name: "Indian History — Ancient to Modern", nameHi: "भारतीय इतिहास — प्राचीन से आधुनिक" },
          { id: "si-pre-2", name: "Indian Geography — Physical & Economic", nameHi: "भारतीय भूगोल — भौतिक एवं आर्थिक" },
          { id: "si-pre-3", name: "Indian Polity & Constitution", nameHi: "भारतीय राजव्यवस्था एवं संविधान" },
          { id: "si-pre-4", name: "Indian Economy", nameHi: "भारतीय अर्थव्यवस्था" },
          { id: "si-pre-5", name: "General Science — Physics, Chemistry, Biology", nameHi: "सामान्य विज्ञान — भौतिकी, रसायन, जीव विज्ञान" },
          { id: "si-pre-6", name: "Current Affairs — National & International", nameHi: "करंट अफेयर्स — राष्ट्रीय एवं अंतर्राष्ट्रीय" }
        ]
      },
      {
        name: "Mains Paper 1 — General Studies incl. CG GK",
        topics: [
          { id: "si-m1-cg-1", name: "CG History — Detailed (Kalachuri to 2000)", nameHi: "CG इतिहास — विस्तृत (कलचुरी से 2000)" },
          { id: "si-m1-cg-2", name: "CG Geography — Complete", nameHi: "CG भूगोल — संपूर्ण" },
          { id: "si-m1-1", name: "Indian History & Freedom Movement", nameHi: "भारतीय इतिहास एवं स्वतंत्रता आंदोलन" },
          { id: "si-m1-2", name: "Indian Polity & Constitution", nameHi: "भारतीय राजव्यवस्था एवं संविधान" },
          { id: "si-m1-3", name: "Indian & World Geography", nameHi: "भारतीय एवं विश्व भूगोल" }
        ]
      },
      {
        name: "Mains Paper 2 — Hindi (125 Marks)",
        topics: [
          { id: "si-m2-1", name: "Hindi Vyakaran — Sandhi, Samas, Karak", nameHi: "हिंदी व्याकरण — संधि, समास, कारक" },
          { id: "si-m2-2", name: "Paryayvachi, Vilom, Anekarthi Shabd", nameHi: "पर्यायवाची, विलोम, अनेकार्थी शब्द" },
          { id: "si-m2-3", name: "Muhavare aur Lokoktiyan", nameHi: "मुहावरे एवं लोकोक्तियां" },
          { id: "si-m2-4", name: "Vakya Shuddhi & Rachna", nameHi: "वाक्य शुद्धि एवं रचना" },
          { id: "si-m2-5", name: "Apathit Gadyansh (Comprehension)", nameHi: "अपठित गद्यांश" }
        ]
      },
      {
        name: "Mains Paper 3 — English (75 Marks)",
        topics: [
          { id: "si-m3-1", name: "English Grammar — Tenses, Voice, Narration", nameHi: "अंग्रेजी व्याकरण — काल, वाच्य, वर्णन" },
          { id: "si-m3-2", name: "Synonyms, Antonyms, Vocabulary", nameHi: "पर्यायवाची, विलोम, शब्द भंडार" },
          { id: "si-m3-3", name: "Reading Comprehension", nameHi: "अपठित गद्यांश" },
          { id: "si-m3-4", name: "Sentence Correction & Error Detection", nameHi: "वाक्य शुद्धि एवं त्रुटि पहचान" }
        ]
      },
      {
        name: "Mains Paper 4 — Mathematics (50 Marks)",
        topics: [
          { id: "si-m4-1", name: "Percentage, Ratio & Proportion", nameHi: "प्रतिशत, अनुपात एवं समानुपात" },
          { id: "si-m4-2", name: "Simple & Compound Interest", nameHi: "साधारण एवं चक्रवृद्धि ब्याज" },
          { id: "si-m4-3", name: "Time, Work & Speed", nameHi: "समय, कार्य एवं चाल" },
          { id: "si-m4-4", name: "Profit-Loss, Average, Mensuration", nameHi: "लाभ-हानि, औसत, क्षेत्रमिति" }
        ]
      },
      {
        name: "Mains Paper 5 — Computer Knowledge (50 Marks)",
        topics: [
          { id: "si-m5-1", name: "Computer Basics — Hardware, Software, OS", nameHi: "कंप्यूटर की मूल बातें — हार्डवेयर, सॉफ्टवेयर, OS" },
          { id: "si-m5-2", name: "MS Office — Word, Excel, PowerPoint", nameHi: "MS Office — Word, Excel, PowerPoint" },
          { id: "si-m5-3", name: "Internet, Email & Networking Basics", nameHi: "इंटरनेट, ईमेल एवं नेटवर्किंग" },
          { id: "si-m5-4", name: "Cyber Security & Safety", nameHi: "साइबर सुरक्षा एवं सुरक्षा" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     3. CG Police Constable
  ───────────────────────────────────────────────────────────── */
  "cg_constable": {
    name: "CG Police Constable",
    fullName: "CG Police Aarakshak — Home Department",
    icon: "🚔",
    category: "police",
    description: "5967 Posts (2025). Written + Physical Test. 10th/12th level exam.",
    eligibility: "10th/12th Pass",
    pattern: {
      totalMarks: 100,
      time: "2 Hours",
      type: "Objective MCQ + Physical Test",
      papers: [
        { paper: "General Knowledge (incl. CG GK)", marks: 40 },
        { paper: "Reasoning / Mental Ability", marks: 30 },
        { paper: "Numerical Aptitude / Maths", marks: 30 }
      ]
    },
    subjects: [
      {
        name: "General Knowledge (40 Marks)",
        topics: [
          { id: "const-gk-cg-1", name: "CG GK — History, Geography, Culture", nameHi: "CG GK — इतिहास, भूगोल, संस्कृति" },
          { id: "const-gk-cg-2", name: "CG Current Affairs", nameHi: "CG करंट अफेयर्स" },
          { id: "const-gk-1", name: "Indian History — Key Events", nameHi: "भारतीय इतिहास — प्रमुख घटनाएं" },
          { id: "const-gk-2", name: "Indian Geography — Basics", nameHi: "भारतीय भूगोल — मूल बातें" },
          { id: "const-gk-3", name: "Indian Polity — Constitution Basics", nameHi: "भारतीय राजव्यवस्था — संविधान मूल बातें" },
          { id: "const-gk-4", name: "General Science — Basic Physics, Bio, Chemistry", nameHi: "सामान्य विज्ञान — मूल भौतिकी, जीव, रसायन" },
          { id: "const-gk-5", name: "Current Affairs — National", nameHi: "करंट अफेयर्स — राष्ट्रीय" }
        ]
      },
      {
        name: "Reasoning / Mental Ability (30 Marks)",
        topics: [
          { id: "const-r-1", name: "Series — Number & Letter", nameHi: "श्रृंखला — संख्या एवं अक्षर" },
          { id: "const-r-2", name: "Analogy & Classification", nameHi: "सादृश्य एवं वर्गीकरण" },
          { id: "const-r-3", name: "Coding-Decoding", nameHi: "कोडिंग-डिकोडिंग" },
          { id: "const-r-4", name: "Blood Relations", nameHi: "रक्त संबंध" },
          { id: "const-r-5", name: "Direction Sense", nameHi: "दिशा ज्ञान" },
          { id: "const-r-6", name: "Syllogism & Statement-Conclusion", nameHi: "न्याय निगमन एवं कथन-निष्कर्ष" }
        ]
      },
      {
        name: "Numerical Aptitude / Maths (30 Marks)",
        topics: [
          { id: "const-m-1", name: "Number System & Simplification", nameHi: "संख्या पद्धति एवं सरलीकरण" },
          { id: "const-m-2", name: "Percentage & Ratio", nameHi: "प्रतिशत एवं अनुपात" },
          { id: "const-m-3", name: "Simple & Compound Interest", nameHi: "साधारण एवं चक्रवृद्धि ब्याज" },
          { id: "const-m-4", name: "Time, Work & Speed-Distance", nameHi: "समय, कार्य एवं चाल-दूरी" },
          { id: "const-m-5", name: "Average, Profit-Loss, Age Problems", nameHi: "औसत, लाभ-हानि, आयु प्रश्न" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     4. Excise Constable
  ───────────────────────────────────────────────────────────── */
  "excise_constable": {
    name: "Excise Constable",
    fullName: "Abkari Aarakshak — Excise Department CG",
    icon: "⚖️",
    category: "administrative",
    description: "Excise Dept — CG Vyapam. Purely GK based exam — no Maths/Reasoning!",
    eligibility: "12th Pass",
    pattern: {
      totalMarks: 100,
      time: "2 Hours",
      type: "Objective MCQ (Purely GK based)",
      papers: [
        { paper: "Written Exam — Complete GK", marks: 100 }
      ]
    },
    subjects: [
      {
        name: "Written Exam — Complete GK (100 Marks)",
        topics: [
          { id: "excise-cg-1", name: "CG History — Kalachuri to Freedom Movement", nameHi: "CG इतिहास — कलचुरी से स्वतंत्रता आंदोलन" },
          { id: "excise-cg-2", name: "CG Geography — Districts, Rivers, Waterfalls", nameHi: "CG भूगोल — जिले, नदियां, झरने" },
          { id: "excise-cg-3", name: "CG Tribes, Culture & Festivals", nameHi: "CG जनजातियां, संस्कृति एवं त्योहार" },
          { id: "excise-cg-4", name: "CG Economy & Schemes", nameHi: "CG अर्थव्यवस्था एवं योजनाएं" },
          { id: "excise-cg-5", name: "CG Current Affairs", nameHi: "CG करंट अफेयर्स" },
          { id: "excise-1", name: "Indian History — Ancient, Medieval, Modern", nameHi: "भारतीय इतिहास — प्राचीन, मध्यकालीन, आधुनिक" },
          { id: "excise-2", name: "Indian Geography — Physical & Economic", nameHi: "भारतीय भूगोल — भौतिक एवं आर्थिक" },
          { id: "excise-3", name: "Indian Polity & Constitution — Key Articles", nameHi: "भारतीय राजव्यवस्था एवं संविधान — प्रमुख अनुच्छेद" },
          { id: "excise-4", name: "Indian Economy — Basics", nameHi: "भारतीय अर्थव्यवस्था — मूल बातें" },
          { id: "excise-5", name: "General Science — Biology, Physics, Chemistry", nameHi: "सामान्य विज्ञान — जीव, भौतिकी, रसायन" },
          { id: "excise-6", name: "Science & Technology — Space, Defence", nameHi: "विज्ञान एवं प्रौद्योगिकी — अंतरिक्ष, रक्षा" },
          { id: "excise-7", name: "Current Affairs — National Events", nameHi: "करंट अफेयर्स — राष्ट्रीय घटनाएं" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     5. Mandi Nirikshak
  ───────────────────────────────────────────────────────────── */
  "mandi_nirikshak": {
    name: "Mandi Nirikshak",
    fullName: "Mandi Sub Inspector — CG State Agriculture Marketing Board",
    icon: "🌾",
    category: "administrative",
    description: "200 Posts. Hindi Grammar = 20 marks (highest single subject). Graduation required.",
    eligibility: "Graduation",
    pattern: {
      totalMarks: 100,
      time: "2 Hours 15 Min",
      type: "Objective MCQ",
      papers: [
        { paper: "Hindi Grammar", marks: 20 },
        { paper: "English Grammar", marks: 10 },
        { paper: "Mathematics", marks: 15 },
        { paper: "Logical Reasoning", marks: 10 },
        { paper: "GK + Current Affairs (National)", marks: 15 },
        { paper: "Computer Knowledge", marks: 10 },
        { paper: "CG GK", marks: 10 },
        { paper: "Agriculture (Krishi Gyan)", marks: 10 }
      ]
    },
    subjects: [
      {
        name: "Hindi Grammar (20 Marks)",
        topics: [
          { id: "mandi-h-1", name: "Sandhi aur Samas", nameHi: "संधि एवं समास" },
          { id: "mandi-h-2", name: "Paryayvachi, Vilom, Anekarthi Shabd", nameHi: "पर्यायवाची, विलोम, अनेकार्थी शब्द" },
          { id: "mandi-h-3", name: "Muhavare aur Lokoktiyan", nameHi: "मुहावरे एवं लोकोक्तियां" },
          { id: "mandi-h-4", name: "Vakya Shuddhi — Shuddh/Ashuddh", nameHi: "वाक्य शुद्धि — शुद्ध/अशुद्ध" },
          { id: "mandi-h-5", name: "Ling, Vachan, Karak, Kaal", nameHi: "लिंग, वचन, कारक, काल" }
        ]
      },
      {
        name: "English Grammar (10 Marks)",
        topics: [
          { id: "mandi-e-1", name: "Tenses & Subject-Verb Agreement", nameHi: "काल एवं कर्ता-क्रिया सहमति" },
          { id: "mandi-e-2", name: "Synonyms, Antonyms, Fill in Blanks", nameHi: "पर्यायवाची, विलोम, रिक्त स्थान भरें" },
          { id: "mandi-e-3", name: "Sentence Correction", nameHi: "वाक्य शुद्धि" }
        ]
      },
      {
        name: "Mathematics (15 Marks)",
        topics: [
          { id: "mandi-m-1", name: "Percentage & Ratio-Proportion", nameHi: "प्रतिशत एवं अनुपात-समानुपात" },
          { id: "mandi-m-2", name: "Simple & Compound Interest", nameHi: "साधारण एवं चक्रवृद्धि ब्याज" },
          { id: "mandi-m-3", name: "Time, Work & Speed-Distance", nameHi: "समय, कार्य एवं चाल-दूरी" },
          { id: "mandi-m-4", name: "Average, Profit-Loss", nameHi: "औसत, लाभ-हानि" }
        ]
      },
      {
        name: "Computer Knowledge (10 Marks)",
        topics: [
          { id: "mandi-c-1", name: "MS Office — Word, Excel Basics", nameHi: "MS Office — Word, Excel मूल बातें" },
          { id: "mandi-c-2", name: "Internet & Email Basics", nameHi: "इंटरनेट एवं ईमेल मूल बातें" },
          { id: "mandi-c-3", name: "Computer Hardware & Software Basics", nameHi: "कंप्यूटर हार्डवेयर एवं सॉफ्टवेयर मूल बातें" }
        ]
      },
      {
        name: "CG GK (10 Marks)",
        topics: [
          { id: "mandi-cg-1", name: "CG History — Key Events & Freedom Fighters", nameHi: "CG इतिहास — प्रमुख घटनाएं एवं स्वतंत्रता सेनानी" },
          { id: "mandi-cg-2", name: "CG Geography — Districts, Rivers, Agriculture", nameHi: "CG भूगोल — जिले, नदियां, कृषि" },
          { id: "mandi-cg-3", name: "CG Current Affairs & Schemes", nameHi: "CG करंट अफेयर्स एवं योजनाएं" }
        ]
      },
      {
        name: "Agriculture — Krishi Gyan (10 Marks)",
        topics: [
          { id: "mandi-ag-1", name: "Crops & Farming Techniques — India & CG", nameHi: "फसलें एवं खेती तकनीक — भारत एवं CG" },
          { id: "mandi-ag-2", name: "Fertilizers, Irrigation Methods", nameHi: "उर्वरक, सिंचाई विधियां" },
          { id: "mandi-ag-3", name: "CG MSP Policy & Kisan Nyay Yojana", nameHi: "CG MSP नीति एवं किसान न्याय योजना" },
          { id: "mandi-ag-4", name: "Mandi Board Structure & Functions", nameHi: "मंडी बोर्ड संरचना एवं कार्य" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     6. CG TET (Teacher Eligibility Test)
  ───────────────────────────────────────────────────────────── */
  "cg_tet": {
    name: "CG TET",
    fullName: "Chhattisgarh Teacher Eligibility Test — SCERT",
    icon: "📖",
    category: "teaching",
    description: "Paper 1 (Class 1-5) + Paper 2 (Class 6-8). 150 marks each. Min 60% to qualify.",
    eligibility: "B.Ed / D.El.Ed",
    pattern: {
      totalMarks: 150,
      time: "2.5 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "Paper 1: Primary Level (Class 1-5)", marks: 150 },
        { paper: "Paper 2: Upper Primary (Class 6-8)", marks: 150 },
        { paper: "Qualifying: Minimum 60% marks", marks: "Qualifying" }
      ]
    },
    subjects: [
      {
        name: "Paper 1 — Child Development & Pedagogy (30 Marks)",
        topics: [
          { id: "tet-cdp-1", name: "Child Development — Growth Stages (6-11 years)", nameHi: "बाल विकास — वृद्धि चरण (6-11 वर्ष)" },
          { id: "tet-cdp-2", name: "Learning Theories — Piaget, Vygotsky", nameHi: "अधिगम सिद्धांत — पियाजे, वायगोत्स्की" },
          { id: "tet-cdp-3", name: "Inclusive Education — Diverse Learners", nameHi: "समावेशी शिक्षा — विविध शिक्षार्थी" },
          { id: "tet-cdp-4", name: "Assessment & Evaluation", nameHi: "मूल्यांकन एवं आकलन" }
        ]
      },
      {
        name: "Paper 1 — Language I: Hindi & Pedagogy (30 Marks)",
        topics: [
          { id: "tet-h-1", name: "Hindi Vyakaran — Sandhi, Samas, Karak", nameHi: "हिंदी व्याकरण — संधि, समास, कारक" },
          { id: "tet-h-2", name: "Hindi Sahitya — Poets & Writers", nameHi: "हिंदी साहित्य — कवि एवं लेखक" },
          { id: "tet-h-3", name: "Language Teaching Pedagogy", nameHi: "भाषा अध्यापन शिक्षाशास्त्र" }
        ]
      },
      {
        name: "Paper 1 — Language II: English & Pedagogy (30 Marks)",
        topics: [
          { id: "tet-e-1", name: "English Grammar & Comprehension", nameHi: "अंग्रेजी व्याकरण एवं समझ" },
          { id: "tet-e-2", name: "Language Teaching Methods", nameHi: "भाषा अध्यापन विधियां" }
        ]
      },
      {
        name: "Paper 1 — Mathematics & Pedagogy (30 Marks)",
        topics: [
          { id: "tet-m-1", name: "Number System, Operations — Class 1-5 level", nameHi: "संख्या पद्धति, संक्रियाएं — कक्षा 1-5 स्तर" },
          { id: "tet-m-2", name: "Shapes, Measurements, Data Handling", nameHi: "आकृतियां, मापन, डेटा हैंडलिंग" },
          { id: "tet-m-3", name: "Maths Pedagogy — Teaching Methods", nameHi: "गणित शिक्षाशास्त्र — अध्यापन विधियां" }
        ]
      },
      {
        name: "Paper 1 — Environmental Studies & Pedagogy (30 Marks)",
        topics: [
          { id: "tet-evs-1", name: "Environment, Plants, Animals — Class 1-5", nameHi: "पर्यावरण, पौधे, प्राणी — कक्षा 1-5" },
          { id: "tet-evs-2", name: "CG Environment & Local Context", nameHi: "CG पर्यावरण एवं स्थानीय संदर्भ" },
          { id: "tet-evs-3", name: "EVS Pedagogy", nameHi: "EVS शिक्षाशास्त्र" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     7. Transport Constable
  ───────────────────────────────────────────────────────────── */
  "transport_constable": {
    name: "Transport Constable",
    fullName: "Parivahan Aarakshak — Regional Transport Office CG",
    icon: "🚗",
    category: "administrative",
    description: "CG Vyapam — Traffic Rules unique subject.",
    eligibility: "12th Pass",
    pattern: {
      totalMarks: 100,
      time: "2 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "GK + Current Affairs", marks: 35 },
        { paper: "CG GK", marks: 20 },
        { paper: "Reasoning + Mental Ability", marks: 20 },
        { paper: "Mathematics", marks: 15 },
        { paper: "Traffic Rules & Motor Vehicles Act", marks: 10 }
      ]
    },
    subjects: [
      {
        name: "General Knowledge + Current Affairs (35 Marks)",
        topics: [
          { id: "tc-gk-1", name: "Indian History, Geography & Polity", nameHi: "भारतीय इतिहास, भूगोल एवं राजव्यवस्था" },
          { id: "tc-gk-2", name: "National Current Affairs", nameHi: "राष्ट्रीय करंट अफेयर्स" },
          { id: "tc-gk-3", name: "General Science", nameHi: "सामान्य विज्ञान" }
        ]
      },
      {
        name: "CG GK (20 Marks)",
        topics: [
          { id: "tc-cg-1", name: "CG History & Culture", nameHi: "CG इतिहास एवं संस्कृति" },
          { id: "tc-cg-2", name: "CG Geography & Districts", nameHi: "CG भूगोल एवं जिले" },
          { id: "tc-cg-3", name: "CG Current Affairs & Schemes", nameHi: "CG करंट अफेयर्स एवं योजनाएं" }
        ]
      },
      {
        name: "Reasoning + Mental Ability (20 Marks)",
        topics: [
          { id: "tc-r-1", name: "Series, Analogy, Coding-Decoding", nameHi: "श्रृंखला, सादृश्य, कोडिंग-डिकोडिंग" },
          { id: "tc-r-2", name: "Blood Relations, Direction Sense", nameHi: "रक्त संबंध, दिशा ज्ञान" }
        ]
      },
      {
        name: "Traffic Rules & Motor Vehicles Act (10 Marks — UNIQUE)",
        topics: [
          { id: "tc-tr-1", name: "Motor Vehicles Act 1988 — Key Sections", nameHi: "मोटर वाहन अधिनियम 1988 — प्रमुख धाराएं" },
          { id: "tc-tr-2", name: "Traffic Signs & Signals", nameHi: "यातायात चिह्न एवं संकेत" },
          { id: "tc-tr-3", name: "Driving License Rules & Violations", nameHi: "ड्राइविंग लाइसेंस नियम एवं उल्लंघन" }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
     8. ADEO (Assistant Development Extension Officer)
  ───────────────────────────────────────────────────────────── */
  "adeo": {
    name: "ADEO",
    fullName: "Assistant Development Extension Officer — Grameen Vikas",
    icon: "🏘️",
    category: "administrative",
    description: "Panchayat & Rural Development. CG GK + Rural Dev = 45% total marks.",
    eligibility: "Graduation",
    pattern: {
      totalMarks: 200,
      time: "3 Hours",
      type: "Objective MCQ",
      papers: [
        { paper: "CG GK (History, Geo, Culture)", marks: 50 },
        { paper: "Rural Development + CG Panchayati Raj", marks: 40 },
        { paper: "GK + Current Affairs National", marks: 30 },
        { paper: "Computer Knowledge", marks: 30 },
        { paper: "Agriculture Basics", marks: 25 },
        { paper: "Maths + Reasoning", marks: 25 }
      ]
    },
    subjects: [
      {
        name: "CG GK (50 Marks)",
        topics: [
          { id: "adeo-cg-1", name: "CG History — Complete", nameHi: "CG इतिहास — संपूर्ण" },
          { id: "adeo-cg-2", name: "CG Geography — Complete", nameHi: "CG भूगोल — संपूर्ण" },
          { id: "adeo-cg-3", name: "CG Tribes, Culture, Festivals", nameHi: "CG जनजातियां, संस्कृति, त्योहार" },
          { id: "adeo-cg-4", name: "CG Economy, Schemes & Current Affairs", nameHi: "CG अर्थव्यवस्था, योजनाएं एवं करंट अफेयर्स" }
        ]
      },
      {
        name: "Rural Development + CG Panchayati Raj (40 Marks)",
        topics: [
          { id: "adeo-rd-1", name: "Panchayati Raj System — 73rd Amendment", nameHi: "पंचायती राज व्यवस्था — 73वां संशोधन" },
          { id: "adeo-rd-2", name: "CG Panchayati Raj Act — Gram Sabha, Gram Panchayat", nameHi: "CG पंचायती राज अधिनियम — ग्राम सभा, ग्राम पंचायत" },
          { id: "adeo-rd-3", name: "Rural Development Schemes — MGNREGA, PMAY", nameHi: " ग्राम विकास योजनाएं — MGNREGA, PMAY" },
          { id: "adeo-rd-4", name: "CG Rural Dev Schemes — Latest", nameHi: "CG ग्राम विकास योजनाएं — नवीनतम" }
        ]
      },
      {
        name: "Computer Knowledge (30 Marks)",
        topics: [
          { id: "adeo-c-1", name: "MS Office — Word, Excel, PowerPoint", nameHi: "MS Office — Word, Excel, PowerPoint" },
          { id: "adeo-c-2", name: "Internet, Email & E-Governance", nameHi: "इंटरनेट, ईमेल एवं ई-गवर्नेंस" },
          { id: "adeo-c-3", name: "Database & Spreadsheet Basics", nameHi: "डेटाबेस एवं स्प्रेडशीट मूल बातें" }
        ]
      }
    ]
  }

};