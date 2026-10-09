const { saveDirectTest } = require('./direct_uploader.js');

// Chapter 7: ज्यामिति (Geometry) - Part 1
// Topic 1: रेखाएँ एवं कोण (Lines and Angles)

const lines01 = [
  {
    question: "यदि दो कोण संपूरक (Supplementary) हैं और उनका अनुपात $2:3$ है, तो बड़ा कोण क्या होगा?",
    options: ["$108^\\circ$", "$72^\\circ$", "$120^\\circ$", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "संपूरक कोणों का योग $180^\\circ$ होता है।\n$2x + 3x = 180^\\circ \\implies 5x = 180^\\circ \\implies x = 36^\\circ$\nबड़ा कोण = $3 \\times 36^\\circ = 108^\\circ$",
    difficulty: "easy"
  },
  {
    question: "एक कोण का मान उसके पूरक (Complementary) कोण के मान से $24^\\circ$ अधिक है। वह कोण ज्ञात कीजिए।",
    options: ["$57^\\circ$", "$33^\\circ$", "$66^\\circ$", "$48^\\circ$"],
    correctIndex: 0,
    explanation: "पूरक कोणों का योग $90^\\circ$ होता है।\nमाना कोण $x$ है, तो पूरक कोण $90^\\circ - x$ होगा।\n$x - (90^\\circ - x) = 24^\\circ \\implies 2x - 90^\\circ = 24^\\circ \\implies 2x = 114^\\circ \\implies x = 57^\\circ$",
    difficulty: "easy"
  },
  {
    question: "दो समांतर रेखाओं को एक तिर्यक रेखा काटती है। यदि एक अंतः एकांतर कोण $65^\\circ$ है, तो दूसरा एकांतर कोण क्या होगा?",
    options: ["$65^\\circ$", "$115^\\circ$", "$25^\\circ$", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "समांतर रेखाओं में अंतः एकांतर कोण (alternate interior angles) सदैव बराबर होते हैं। अतः दूसरा कोण भी $65^\\circ$ होगा।",
    difficulty: "easy"
  },
  {
    question: "एक बिंदु के चारों ओर बनने वाले सभी कोणों का योग कितना होता है?",
    options: ["$360^\\circ$", "$180^\\circ$", "$270^\\circ$", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "किसी एक बिंदु के चारों ओर बनने वाले सभी कोणों का योग सदैव एक संपूर्ण कोण अर्थात $360^\\circ$ (4 समकोण) होता है।",
    difficulty: "easy"
  },
  {
    question: "यदि एक कोण अपने संपूरक कोण का एक-तिहाई है, तो उस कोण का मान क्या है?",
    options: ["$45^\\circ$", "$60^\\circ$", "$30^\\circ$", "$135^\\circ$"],
    correctIndex: 0,
    explanation: "माना कोण $x$ है। संपूरक कोण = $180^\\circ - x$\n$x = \\frac{1}{3}(180^\\circ - x) \\implies 3x = 180^\\circ - x \\implies 4x = 180^\\circ \\implies x = 45^\\circ$",
    difficulty: "moderate"
  },
  {
    question: "एक सरल रेखा पर स्थित एक बिंदु से दो आसन्न कोण बनते हैं जिनका अनुपात $5:4$ है। छोटे कोण का मान क्या होगा?",
    options: ["$80^\\circ$", "$100^\\circ$", "$90^\\circ$", "$70^\\circ$"],
    correctIndex: 0,
    explanation: "रैखिक युग्म (Linear pair) का योग $180^\\circ$ होता है।\n$5x + 4x = 180^\\circ \\implies 9x = 180^\\circ \\implies x = 20^\\circ$\nछोटा कोण = $4 \\times 20^\\circ = 80^\\circ$",
    difficulty: "easy"
  },
  {
    question: "शीर्षाभिमुख कोण (Vertically Opposite Angles) सदैव होते हैं:",
    options: ["समान", "संपूरक", "पूरक", "असमान"],
    correctIndex: 0,
    explanation: "जब दो रेखाएं परस्पर प्रतिच्छेद करती हैं, तो बनने वाले शीर्षाभिमुख कोण सदैव आपस में समान होते हैं।",
    difficulty: "easy"
  },
  {
    question: "दो समांतर रेखाओं को एक तिर्यक रेखा काटती है। तिर्यक रेखा के एक ही ओर के दो अंतः कोणों का योग कितना होता है?",
    options: ["$180^\\circ$", "$90^\\circ$", "$360^\\circ$", "$120^\\circ$"],
    correctIndex: 0,
    explanation: "तिर्यक रेखा के एक ही ओर के क्रमागत अंतः कोण (consecutive interior angles) संपूरक होते हैं, अर्थात उनका योग $180^\\circ$ होता है।",
    difficulty: "easy"
  },
  {
    question: "यदि कोण $(2x + 10)^\\circ$ और $(3x - 15)^\\circ$ पूरक कोण हैं, तो $x$ का मान ज्ञात कीजिए।",
    options: ["$19$", "$21$", "$18$", "$25$"],
    correctIndex: 0,
    explanation: "$(2x + 10) + (3x - 15) = 90 \\implies 5x - 5 = 90 \\implies 5x = 95 \\implies x = 19$",
    difficulty: "moderate"
  },
  {
    question: "उस कोण का मान ज्ञात कीजिए जिसका संपूरक कोण उसके पूरक कोण का तीन गुना है।",
    options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$40^\\circ$"],
    correctIndex: 0,
    explanation: "माना कोण $x$ है। संपूरक = $180^\\circ - x$, पूरक = $90^\\circ - x$\n$180^\\circ - x = 3(90^\\circ - x) \\implies 180^\\circ - x = 270^\\circ - 3x \\implies 2x = 90^\\circ \\implies x = 45^\\circ$",
    difficulty: "moderate"
  }
];

const lines02 = [
  {
    question: "दी गई आकृति में यदि $AB \\parallel CD$ है, तिर्यक रेखा के एक ओर के अंतः कोण $(3x + 5)^\\circ$ और $(2x + 15)^\\circ$ हैं, तो $x$ का मान क्या होगा?",
    options: ["$32^\\circ$", "$30^\\circ$", "$34^\\circ$", "$36^\\circ$"],
    correctIndex: 0,
    explanation: "एक ही ओर के अंतः कोण संपूरक होते हैं:\n$(3x + 5) + (2x + 15) = 180 \\implies 5x + 20 = 180 \\implies 5x = 160 \\implies x = 32^\\circ$",
    difficulty: "moderate"
  },
  {
    question: "दो प्रतिच्छेदी रेखाओं द्वारा बनाए गए चार कोणों में से एक कोण $40^\\circ$ है। शेष तीन कोण क्या होंगे?",
    options: ["$140^\\circ, 40^\\circ, 140^\\circ$", "$40^\\circ, 140^\\circ, 150^\\circ$", "$140^\\circ, 50^\\circ, 140^\\circ$", "$50^\\circ, 40^\\circ, 50^\\circ$"],
    correctIndex: 0,
    explanation: "रैखिक युग्म कोण = $180^\\circ - 40^\\circ = 140^\\circ$\nशीर्षाभिमुख कोण = $40^\\circ$\nअन्य रैखिक कोण = $140^\\circ$\nअतः शेष कोण $140^\\circ, 40^\\circ, 140^\\circ$ होंगे।",
    difficulty: "easy"
  },
  {
    question: "यदि एक कोण अपने पूरक कोण से $10^\\circ$ कम है, तो कोण का मान क्या है?",
    options: ["$40^\\circ$", "$50^\\circ$", "$35^\\circ$", "$45^\\circ$"],
    correctIndex: 0,
    explanation: "माना कोण $x$ है। पूरक = $90^\\circ - x$\n$x = (90^\\circ - x) - 10^\\circ \\implies 2x = 80^\\circ \\implies x = 40^\\circ$",
    difficulty: "easy"
  },
  {
    question: "यदि दो समांतर रेखाओं को एक तिर्यक रेखा काटती है, तो संगत कोणों के समद्विभाजक परस्पर क्या होते हैं?",
    options: ["समांतर", "लंबवत", "प्रतिच्छेदी", "संपाती"],
    correctIndex: 0,
    explanation: "संगत कोण बराबर होते हैं, इसलिए उनके समद्विभाजक कोण भी बराबर होंगे, जिससे वे रेखाएँ परस्पर समांतर होती हैं।",
    difficulty: "moderate"
  },
  {
    question: "एक कोण का संपूरक कोण उसके पूरक कोण के 4 गुने से $10^\\circ$ अधिक है। वह कोण ज्ञात कीजिए।",
    options: ["$60^\\circ$", "$50^\\circ$", "$70^\\circ$", "$40^\\circ$"],
    correctIndex: 0,
    explanation: "संपूरक = $180 - x$, पूरक = $90 - x$\n$180 - x = 4(90 - x) + 10 \\implies 180 - x = 360 - 4x + 10 \\implies 3x = 190$ प्रतीक्षा: $360 + 10 - 180 = 190$\nयदि $180 - x = 4(90 - x) - 10$ हो: $3x = 170$।\nयदि प्रश्न: 'संपूरक कोण पूरक कोण के 4 गुने से कम नहीं, सीधा 4 गुना है': $180 - x = 4(90 - x) \\implies 180 - x = 360 - 4x \\implies 3x = 180 \\implies x = 60^\\circ$!",
    options: ["$60^\\circ$", "$50^\\circ$", "$70^\\circ$", "$45^\\circ$"],
    explanation: "संपूरक कोण पूरक कोण का 4 गुना होने पर: $180 - x = 4(90 - x) \\implies 180 - x = 360 - 4x \\implies 3x = 180 \\implies x = 60^\\circ$",
    question: "उस कोण का मान ज्ञात कीजिए जिसका संपूरक कोण उसके पूरक कोण का ठीक 4 गुना है।",
    correctIndex: 0,
    difficulty: "moderate"
  },
  {
    question: "यदि तीन रेखाएँ एक ही बिंदु पर प्रतिच्छेद करती हैं, तो वे रेखाएँ क्या कहलाती हैं?",
    options: ["संगामी रेखाएँ (Concurrent lines)", "समांतर रेखाएँ", "संपाती रेखाएँ", "तिर्यक रेखाएँ"],
    correctIndex: 0,
    explanation: "जब तीन या तीन से अधिक रेखाएँ एक ही उभयनिष्ठ बिंदु से होकर गुजरती हैं, तो उन्हें संगामी रेखाएँ (Concurrent lines) कहते हैं।",
    difficulty: "easy"
  },
  {
    question: "यदि दो रेखाएँ $l$ और $m$ समांतर हैं तथा तिर्यक रेखा द्वारा बने एकांतर कोण $(5x - 20)^\\circ$ और $(3x + 10)^\\circ$ हैं, तो $x$ का मान क्या होगा?",
    options: ["$15^\\circ$", "$10^\\circ$", "$20^\\circ$", "$25^\\circ$"],
    correctIndex: 0,
    explanation: "एकांतर कोण बराबर होते हैं: $5x - 20 = 3x + 10 \\implies 2x = 30 \\implies x = 15^\\circ$",
    difficulty: "easy"
  },
  {
    question: "एक कोण का मान $135^\\circ$ है। इस कोण का प्रकार क्या है?",
    options: ["अधिक कोण (Obtuse angle)", "न्यून कोण (Acute angle)", "समकोण (Right angle)", "प्रतिवर्ती कोण (Reflex angle)"],
    correctIndex: 0,
    explanation: "$90^\\circ$ से अधिक और $180^\\circ$ से कम माप वाले कोण को अधिक कोण (Obtuse angle) कहा जाता है।",
    difficulty: "easy"
  },
  {
    question: "प्रतिवर्ती कोण (Reflex Angle) की माप किस सीमा में होती है?",
    options: ["$180^\\circ$ से अधिक और $360^\\circ$ से कम", "$90^\\circ$ से अधिक और $180^\\circ$ से कम", "$0^\\circ$ से अधिक और $90^\\circ$ से कम", "$360^\\circ$ से अधिक"],
    correctIndex: 0,
    explanation: "प्रतिवर्ती कोण (Reflex Angle) की माप सदैव $180^\\circ$ से अधिक और $360^\\circ$ से कम होती है।",
    difficulty: "easy"
  },
  {
    question: "यदि किसी कोण का पूरक कोण $38^\\circ$ है, तो उसका संपूरक कोण क्या होगा?",
    options: ["$128^\\circ$", "$142^\\circ$", "$118^\\circ$", "$132^\\circ$"],
    correctIndex: 0,
    explanation: "कोण = $90^\\circ - 38^\\circ = 52^\\circ$\nसंपूरक कोण = $180^\\circ - 52^\\circ = 128^\\circ$",
    difficulty: "moderate"
  }
];

const lines03 = [
  {
    question: "दो समांतर रेखाओं के बीच की लंबवत दूरी:",
    options: ["सदैव समान रहती है", "बढ़ती जाती है", "घटती जाती है", "शून्य होती है"],
    correctIndex: 0,
    explanation: "समांतर रेखाओं के बीच की लंबवत दूरी प्रत्येक स्थान पर सदैव समान (constant) रहती है।",
    difficulty: "easy"
  },
  {
    question: "यदि दो संपूरक कोणों का अंतर $44^\\circ$ है, तो दोनों कोणों में से छोटा कोण क्या होगा?",
    options: ["$68^\\circ$", "$112^\\circ$", "$72^\\circ$", "$64^\\circ$"],
    correctIndex: 0,
    explanation: "$x + y = 180^\\circ, x - y = 44^\\circ$\nघटाने पर: $2y = 136^\\circ \\implies y = 68^\\circ$",
    difficulty: "easy"
  },
  {
    question: "एक कोण का पूरक कोण उस कोण के संपूरक कोण के आधे से $15^\\circ$ कम है। वह कोण ज्ञात कीजिए।",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$15^\\circ$"],
    correctIndex: 0,
    explanation: "पूरक = $90 - x$, संपूरक = $180 - x$\n$90 - x = \\frac{180 - x}{2} - 15 \\implies 90 - x = 90 - \\frac{x}{2} - 15$\n$\\implies \\frac{x}{2} = 15 \\implies x = 30^\\circ$",
    difficulty: "hard"
  },
  {
    question: "यदि किसी त्रिभुज के तीनों कोण $2x^\\circ, 3x^\\circ$ और $5x^\\circ$ हैं, तो सबसे बड़े कोण का मान क्या होगा?",
    options: ["$90^\\circ$", "$72^\\circ$", "$54^\\circ$", "$108^\\circ$"],
    correctIndex: 0,
    explanation: "$2x + 3x + 5x = 180^\\circ \\implies 10x = 180^\\circ \\implies x = 18^\\circ$\nसबसे बड़ा कोण = $5 \\times 18^\\circ = 90^\\circ$ (समकोण त्रिभुज)",
    difficulty: "easy"
  },
  {
    question: "यदि दो रेखाएँ परस्पर लंबवत हैं, तो उनके बीच का कोण कितना होगा?",
    options: ["$90^\\circ$", "$180^\\circ$", "$45^\\circ$", "$0^\\circ$"],
    correctIndex: 0,
    explanation: "परस्पर लंबवत (perpendicular) रेखाओं के बीच का कोण सदैव समकोण अर्थात $90^\\circ$ होता है।",
    difficulty: "easy"
  },
  {
    question: "दी गई दो समांतर रेखाओं को काटने वाली तिर्यक रेखा के अंतः कोणों के समद्विभाजक किस प्रकार की आकृति बनाते हैं?",
    options: ["एक आयत (Rectangle)", "एक समचतुर्भुज", "एक वर्ग", "एक समलंब"],
    correctIndex: 0,
    explanation: "दो समांतर रेखाओं और एक तिर्यक रेखा द्वारा निर्मित चारों अंतः कोणों के समद्विभाजक परस्पर मिलकर सदैव एक आयत (Rectangle) का निर्माण करते हैं।",
    difficulty: "hard"
  },
  {
    question: "यदि $\\angle A$ और $\\angle B$ रैखिक युग्म बनाते हैं और $\\angle A = 2\\angle B + 30^\\circ$ है, तो $\\angle B$ का मान क्या होगा?",
    options: ["$50^\\circ$", "$60^\\circ$", "$45^\\circ$", "$70^\\circ$"],
    correctIndex: 0,
    explanation: "$\\angle A + \\angle B = 180^\\circ \\implies (2\\angle B + 30^\\circ) + \\angle B = 180^\\circ \\implies 3\\angle B = 150^\\circ \\implies \\angle B = 50^\\circ$",
    difficulty: "moderate"
  },
  {
    question: "किसी कोण का मान $240^\\circ$ है। इस कोण का संपूरक या प्रतिवर्ती कोण क्या कहलाएगा?",
    options: ["प्रतिवर्ती कोण (Reflex angle)", "अधिक कोण", "ऋजु कोण", "पूरक कोण"],
    correctIndex: 0,
    explanation: "$180^\\circ$ से बड़ा और $360^\\circ$ से छोटा कोण प्रतिवर्ती कोण (Reflex angle) कहलाता है।",
    difficulty: "easy"
  },
  {
    question: "यदि दो रेखाएँ समांतर हैं, तो उनके ढाल (Slopes, $m_1$ और $m_2$) के बीच क्या संबंध होता है?",
    options: ["$m_1 = m_2$", "$m_1 \\times m_2 = -1$", "$m_1 + m_2 = 0$", "$m_1 - m_2 = 1$"],
    correctIndex: 0,
    explanation: "समांतर रेखाओं के ढाल बराबर होते हैं ($m_1 = m_2$), जबकि लंबवत रेखाओं के ढालों का गुणनफल $-1$ होता है।",
    difficulty: "easy"
  },
  {
    question: "एक घड़ी में जब 3:00 बजते हैं, तो घंटे और मिनट की सुइयों के बीच कितने अंश का कोण बनता है?",
    options: ["$90^\\circ$", "$60^\\circ$", "$120^\\circ$", "$180^\\circ$"],
    correctIndex: 0,
    explanation: "प्रत्येक घंटे का अंतर $= 360^\\circ / 12 = 30^\\circ$\n3:00 बजे 3 घंटे का अंतराल होता है $= 3 \\times 30^\\circ = 90^\\circ$",
    difficulty: "easy"
  }
];

// Topic 2: त्रिभुज (Triangles)

const tri01 = [
  {
    question: "किसी त्रिभुज के तीनों अंतः कोणों का योग कितना होता है?",
    options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "$270^\\circ$"],
    correctIndex: 0,
    explanation: "यूक्लिडियन ज्यामिति में किसी भी त्रिभुज के तीनों अंतः कोणों का योग सदैव $180^\\circ$ होता है।",
    difficulty: "easy"
  },
  {
    question: "एक समबाहु त्रिभुज का प्रत्येक कोण कितने अंश का होता है?",
    options: ["$60^\\circ$", "$45^\\circ$", "$90^\\circ$", "$30^\\circ$"],
    correctIndex: 0,
    explanation: "समबाहु त्रिभुज की तीनों भुजाएँ और तीनों कोण समान होते हैं: $180^\\circ / 3 = 60^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "यदि एक समद्विबाहु त्रिभुज का शीर्ष कोण $80^\\circ$ है, तो इसके आधार कोणों में से प्रत्येक का मान क्या होगा?",
    options: ["$50^\\circ$", "$40^\\circ$", "$60^\\circ$", "$45^\\circ$"],
    correctIndex: 0,
    explanation: "आधार कोण समान होते हैं: $\\frac{180^\\circ - 80^\\circ}{2} = \\frac{100^\\circ}{2} = 50^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "एक समकोण त्रिभुज की दो भुजाएँ 6 सेमी और 8 सेमी हैं। कर्ण की लंबाई क्या होगी?",
    options: ["10 सेमी", "12 सेमी", "14 सेमी", "9 सेमी"],
    correctIndex: 0,
    explanation: "पाइथागोरस प्रमेय: कर्ण = $\\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$ सेमी।",
    difficulty: "easy"
  },
  {
    question: "त्रिभुज की किन्हीं दो भुजाओं का योग सदैव तीसरी भुजा से:",
    options: ["बड़ा होता है", "छोटा होता है", "बराबर होता है", "आधा होता है"],
    correctIndex: 0,
    explanation: "त्रिभुज असमिका (Triangle Inequality): किसी भी त्रिभुज की किन्हीं दो भुजाओं की लंबाइयों का योग सदैव तीसरी भुजा से बड़ा होता है।",
    difficulty: "easy"
  },
  {
    question: "त्रिभुज की तीनों माध्यिकाओं (Medians) के प्रतिच्छेद बिंदु को क्या कहते हैं?",
    options: ["केन्द्रक (Centroid)", "अंतःकेन्द्र (Incenter)", "परिकेन्द्र (Circumcenter)", "लम्बकेन्द्र (Orthocenter)"],
    correctIndex: 0,
    explanation: "त्रिभुज की तीनों माध्यिकाएँ जिस बिंदु पर मिलती हैं, उसे केन्द्रक (Centroid) कहते हैं। केन्द्रक प्रत्येक माध्यिका को $2:1$ के अनुपात में विभाजित करता है।",
    difficulty: "easy"
  },
  {
    question: "किसी त्रिभुज का बाह्य कोण उसके सम्मुख दो अंतः कोणों के योग के:",
    options: ["बराबर होता है", "से कम होता है", "से अधिक होता है", "का आधा होता है"],
    correctIndex: 0,
    explanation: "बाह्य कोण प्रमेय के अनुसार, त्रिभुज का बाह्य कोण अपने दोनों सम्मुख अंतः कोणों के योग के बराबर होता है।",
    difficulty: "easy"
  },
  {
    question: "यदि एक त्रिभुज की भुजाएँ 7 सेमी, 24 सेमी और 25 सेमी हैं, तो वह त्रिभुज कैसा होगा?",
    options: ["समकोण त्रिभुज", "न्यूनकोण त्रिभुज", "अधिककोण त्रिभुज", "समबाहु त्रिभुज"],
    correctIndex: 0,
    explanation: "$7^2 + 24^2 = 49 + 576 = 625 = 25^2$\nपाइथागोरस प्रमेय संतुष्ट होता है, अतः यह एक समकोण त्रिभुज है।",
    difficulty: "easy"
  },
  {
    question: "एक त्रिभुज के कोणों का अनुपात $1 : 2 : 3$ है। सबसे छोटा कोण क्या होगा?",
    options: ["$30^\\circ$", "$45^\\circ$", "$20^\\circ$", "$60^\\circ$"],
    correctIndex: 0,
    explanation: "$x + 2x + 3x = 180^\\circ \\implies 6x = 180^\\circ \\implies x = 30^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "त्रिभुज के कोण समद्विभाजकों (Angle bisectors) का संगमन बिंदु क्या कहलाता है?",
    options: ["अंतःकेन्द्र (Incenter)", "परिकेन्द्र (Circumcenter)", "केन्द्रक (Centroid)", "लम्बकेन्द्र (Orthocenter)"],
    correctIndex: 0,
    explanation: "त्रिभुज के तीनों कोणों के समद्विभाजक अंतःकेन्द्र (Incenter) पर प्रतिच्छेद करते हैं, जो त्रिभुज की तीनों भुजाओं से समदूरस्थ होता है।",
    difficulty: "easy"
  }
];

const tri02 = [
  {
    question: "यदि $\\triangle ABC \\sim \\triangle DEF$ है और उनके क्षेत्रफलों का अनुपात $9 : 16$ है, तो उनकी संगत भुजाओं का अनुपात क्या होगा?",
    options: ["$3 : 4$", "$4 : 3$", "$9 : 16$", "$81 : 256$"],
    correctIndex: 0,
    explanation: "समरूप त्रिभुजों के क्षेत्रफलों का अनुपात उनकी संगत भुजाओं के वर्गों के अनुपात के बराबर होता है:\n$\\frac{A_1}{A_2} = \\left(\\frac{s_1}{s_2}\\right)^2 \\implies \\frac{s_1}{s_2} = \\sqrt{\\frac{9}{16}} = \\frac{3}{4}$।",
    difficulty: "moderate"
  },
  {
    question: "त्रिभुज $ABC$ में, भुजा $BC$ के समांतर खींची गई रेखा $AB$ और $AC$ को क्रमशः $D$ और $E$ पर काटती है। यदि $AD = 3$ सेमी, $DB = 5$ सेमी और $AE = 6$ सेमी हो, तो $EC$ की लंबाई क्या होगी?",
    options: ["10 सेमी", "8 सेमी", "12 सेमी", "15 सेमी"],
    correctIndex: 0,
    explanation: "थेल्स प्रमेय (मूल आनुपातिकता प्रमेय) से:\n$\\frac{AD}{DB} = \\frac{AE}{EC} \\implies \\frac{3}{5} = \\frac{6}{EC} \\implies EC = \\frac{6 \\times 5}{3} = 10$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "एक समबाहु त्रिभुज की भुजा 12 सेमी है। इसकी ऊँचाई (शीर्षलंब) क्या होगी?",
    options: ["$6\\sqrt{3}$ सेमी", "$12\\sqrt{3}$ सेमी", "$6$ सेमी", "$8\\sqrt{3}$ सेमी"],
    correctIndex: 0,
    explanation: "समबाहु त्रिभुज की ऊँचाई $h = \\frac{\\sqrt{3}}{2} \\times a = \\frac{\\sqrt{3}}{2} \\times 12 = 6\\sqrt{3}$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "केन्द्रक (Centroid) त्रिभुज की प्रत्येक माध्यिका को किस अनुपात में विभाजित करता है?",
    options: ["$2 : 1$ (शीर्ष से आधार)", "$1 : 2$ (शीर्ष से आधार)", "$1 : 1$", "$3 : 1$"],
    correctIndex: 0,
    explanation: "केन्द्रक माध्यिका को शीर्ष से आधार की ओर $2 : 1$ के अनुपात में अंतःविभाजित करता है।",
    difficulty: "easy"
  },
  {
    question: "यदि किसी समकोण त्रिभुज के परिवृत्त की त्रिज्या 10 सेमी है, तो उसके कर्ण की लंबाई क्या होगी?",
    options: ["20 सेमी", "10 सेमी", "15 सेमी", "25 सेमी"],
    correctIndex: 0,
    explanation: "समकोण त्रिभुज का कर्ण उसके परिवृत्त का व्यास होता है। अतः कर्ण $= 2 \\times R = 2 \\times 10 = 20$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "यदि एक त्रिभुज की भुजाएँ 5 सेमी, 12 सेमी और 13 सेमी हैं, तो इसके अंतःवृत्त की त्रिज्या ($r$) क्या होगी?",
    options: ["2 सेमी", "3 सेमी", "2.5 सेमी", "4 सेमी"],
    correctIndex: 0,
    explanation: "समकोण त्रिभुज के अंतःवृत्त की त्रिज्या $r = \\frac{a + b - c}{2} = \\frac{5 + 12 - 13}{2} = \\frac{4}{2} = 2$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "त्रिभुज के तीनों शीर्षलंबों (Altitudes) के प्रतिच्छेद बिंदु को क्या कहा जाता है?",
    options: ["लम्बकेन्द्र (Orthocenter)", "केन्द्रक (Centroid)", "परिकेन्द्र (Circumcenter)", "अंतःकेन्द्र (Incenter)"],
    correctIndex: 0,
    explanation: "त्रिभुज के तीनों शीर्षों से सम्मुख भुजाओं पर डाले गए लंब (शीर्षलंब) जिस बिंदु पर मिलते हैं, उसे लम्बकेन्द्र (Orthocenter) कहते हैं।",
    difficulty: "easy"
  },
  {
    question: "एक अधिककोण त्रिभुज (Obtuse-angled triangle) का परिकेन्द्र (Circumcenter) कहाँ स्थित होता है?",
    options: ["त्रिभुज के बाहर", "त्रिभुज के अंदर", "सबसे बड़ी भुजा पर", "शीर्ष पर"],
    correctIndex: 0,
    explanation: "न्यूनकोण त्रिभुज का परिकेन्द्र अंदर, समकोण त्रिभुज का कर्ण के मध्य बिंदु पर, तथा अधिककोण त्रिभुज का परिकेन्द्र त्रिभुज के बाहर स्थित होता है।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी त्रिभुज $ABC$ में $\\angle A = 70^\\circ$ है तथा $B$ और $C$ के अंतः समद्विभाजक बिंदु $I$ (अंतःकेन्द्र) पर मिलते हैं, तो $\\angle BIC$ का मान क्या होगा?",
    options: ["$125^\\circ$", "$110^\\circ$", "$135^\\circ$", "$140^\\circ$"],
    correctIndex: 0,
    explanation: "सूत्र: $\\angle BIC = 90^\\circ + \\frac{\\angle A}{2} = 90^\\circ + \\frac{70^\\circ}{2} = 90^\\circ + 35^\\circ = 125^\\circ$।",
    difficulty: "hard"
  },
  {
    question: "निम्नलिखित में से कौन-सा त्रिभुजों की सर्वांगसमता (Congruence) की कसौटी नहीं है?",
    options: ["AAA (कोण-कोण-कोण)", "SAS (भुजा-कोण-भुजा)", "SSS (भुजा-भुजा-भुजा)", "ASA (कोण-भुजा-कोण)"],
    correctIndex: 0,
    explanation: "AAA केवल समरूपता (Similarity) की कसौटी है, सर्वांगसमता (Congruence) की नहीं, क्योंकि समान कोण वाले त्रिभुज अलग-अलग आकारों के हो सकते हैं।",
    difficulty: "moderate"
  }
];

const tri03 = [
  {
    question: "त्रिभुज $ABC$ में, $\\angle B = 90^\\circ$, $AB = 12$ सेमी तथा $BC = 5$ सेमी है। शीर्ष $B$ से कर्ण $AC$ पर डाले गए लंब $BD$ की लंबाई क्या होगी?",
    options: ["$\\frac{60}{13}$ सेमी", "$\\frac{65}{12}$ सेमी", "$\\frac{30}{13}$ सेमी", "5 सेमी"],
    correctIndex: 0,
    explanation: "$AC = \\sqrt{12^2 + 5^2} = 13$ सेमी।\nक्षेत्रफल = $\\frac{1}{2} \\times AB \\times BC = \\frac{1}{2} \\times AC \\times BD$\n$\\implies 12 \\times 5 = 13 \\times BD \\implies BD = \\frac{60}{13}$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "एक त्रिभुज $ABC$ में कोण $A$ का आंतरिक समद्विभाजक $AD$ सम्मुख भुजा $BC$ को $D$ पर मिलता है। यदि $AB = 6$ सेमी, $AC = 8$ सेमी और $BD = 3$ सेमी हो, तो $DC$ की लंबाई क्या होगी?",
    options: ["4 सेमी", "5 सेमी", "4.5 सेमी", "3.5 सेमी"],
    correctIndex: 0,
    explanation: "आंतरिक कोण समद्विभाजक प्रमेय से:\n$\\frac{AB}{AC} = \\frac{BD}{DC} \\implies \\frac{6}{8} = \\frac{3}{DC} \\implies DC = \\frac{3 \\times 8}{6} = 4$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "यदि समबाहु त्रिभुज के अंतःवृत्त का क्षेत्रफल $154 \\text{ सेमी}^2$ है, तो इसके परिवृत्त का क्षेत्रफल क्या होगा?",
    options: ["$616 \\text{ सेमी}^2$", "$308 \\text{ सेमी}^2$", "$462 \\text{ सेमी}^2$", "$770 \\text{ सेमी}^2$"],
    correctIndex: 0,
    explanation: "समबाहु त्रिभुज में परिवृत्त की त्रिज्या अंतःवृत्त की त्रिज्या की दोगुनी होती है ($R = 2r$)।\nअतः परिवृत्त का क्षेत्रफल $= 2^2 \\times 154 = 4 \\times 154 = 616 \\text{ सेमी}^2$।",
    difficulty: "hard"
  },
  {
    question: "किसी त्रिभुज $ABC$ के परिवृत्त का केन्द्र $O$ है। यदि $\\angle BAC = 50^\\circ$ है, तो $\\angle BOC$ का मान क्या होगा?",
    options: ["$100^\\circ$", "$130^\\circ$", "$50^\\circ$", "$80^\\circ$"],
    correctIndex: 0,
    explanation: "वृत्त के केन्द्र पर बना कोण परिधि पर बने कोण का दोगुना होता है:\n$\\angle BOC = 2 \\times \\angle BAC = 2 \\times 50^\\circ = 100^\\circ$।",
    difficulty: "moderate"
  },
  {
    question: "यदि एक त्रिभुज की भुजाएँ 8 सेमी, 15 सेमी और 17 सेमी हैं, तो इसकी सबसे बड़ी भुजा पर सम्मुख शीर्ष से खींची गई माध्यिका की लंबाई क्या होगी?",
    options: ["8.5 सेमी", "7.5 सेमी", "9 सेमी", "10 सेमी"],
    correctIndex: 0,
    explanation: "चूँकि $8^2 + 15^2 = 64 + 225 = 289 = 17^2$, यह एक समकोण त्रिभुज है।\nसमकोण त्रिभुज में कर्ण पर खींची गई माध्यिका कर्ण की आधी होती है $= 17 / 2 = 8.5$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "एक त्रिभुज के केन्द्रक $G$ के लिए, यदि $\\triangle ABC$ का क्षेत्रफल $36 \\text{ सेमी}^2$ है, तो $\\triangle GBC$ का क्षेत्रफल क्या होगा?",
    options: ["$12 \\text{ सेमी}^2$", "$18 \\text{ सेमी}^2$", "$9 \\text{ सेमी}^2$", "$6 \\text{ सेमी}^2$"],
    correctIndex: 0,
    explanation: "केन्द्रक त्रिभुज को तीन समान क्षेत्रफल वाले त्रिभुजों ($\\triangle GAB, \\triangle GBC, \\triangle GCA$) में विभाजित करता है।\nअतः $\\text{Area}(\\triangle GBC) = \\frac{36}{3} = 12 \\text{ सेमी}^2$।",
    difficulty: "moderate"
  },
  {
    question: "दो समरूप त्रिभुजों की परिमाप क्रमशः 30 सेमी और 20 सेमी हैं। यदि पहले त्रिभुज की एक भुजा 9 सेमी है, तो दूसरे त्रिभुज की संगत भुजा क्या होगी?",
    options: ["6 सेमी", "5 सेमी", "7.5 सेमी", "4.5 सेमी"],
    correctIndex: 0,
    explanation: "समरूप त्रिभुजों के परिमापों का अनुपात संगत भुजाओं के अनुपात के बराबर होता है:\n$\\frac{P_1}{P_2} = \\frac{s_1}{s_2} \\implies \\frac{30}{20} = \\frac{9}{s_2} \\implies s_2 = \\frac{9 \\times 20}{30} = 6$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी त्रिभुज की भुजाओं की लंबाइयाँ 3 सेमी, 4 सेमी और 6 सेमी हैं, तो यह किस प्रकार का त्रिभुज है?",
    options: ["अधिककोण त्रिभुज", "न्यूनकोण त्रिभुज", "समकोण त्रिभुज", "समद्विबाहु त्रिभुज"],
    correctIndex: 0,
    explanation: "$a^2 + b^2 = 3^2 + 4^2 = 9 + 16 = 25$\n$c^2 = 6^2 = 36$\nचूँकि $a^2 + b^2 < c^2$ ($25 < 36$), अतः यह एक अधिककोण त्रिभुज (Obtuse-angled triangle) है।",
    difficulty: "moderate"
  },
  {
    question: "एक समबाहु त्रिभुज की प्रत्येक भुजा में 2 सेमी की वृद्धि करने पर इसके क्षेत्रफल में $2\\sqrt{3} \\text{ सेमी}^2$ की वृद्धि हो जाती है। त्रिभुज की प्रारंभिक भुजा क्या थी?",
    options: ["1 सेमी", "2 सेमी", "3 सेमी", "1.5 सेमी"],
    correctIndex: 0,
    explanation: "$\\frac{\\sqrt{3}}{4}(a + 2)^2 - \\frac{\\sqrt{3}}{4}a^2 = 2\\sqrt{3}$\n$\\frac{\\sqrt{3}}{4}(a^2 + 4a + 4 - a^2) = 2\\sqrt{3} \\implies \\frac{4a + 4}{4} = 2 \\implies a + 1 = 2 \\implies a = 1$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "किसी त्रिभुज के लम्बकेन्द्र, केन्द्रक और परिकेन्द्र को मिलाने वाली रेखा क्या कहलाती है?",
    options: ["ऑयलर रेखा (Euler Line)", "सिम्सन रेखा", "पास्कल रेखा", "सीवा रेखा"],
    correctIndex: 0,
    explanation: "किसी भी त्रिभुज में लम्बकेन्द्र ($H$), केन्द्रक ($G$) और परिकेन्द्र ($O$) एक ही सरल रेखा पर स्थित होते हैं, जिसे ऑयलर रेखा (Euler Line) कहते हैं, और $G$ रेखाखंड $HO$ को $2:1$ में विभाजित करता है।",
    difficulty: "hard"
  }
];

async function run() {
  console.log('Uploading Chapter 7 (Part 1): रेखाएँ एवं कोण & त्रिभुज...');
  await saveDirectTest('रेखाएँ एवं कोण - Test 01', 'रेखाएँ एवं कोण', lines01);
  await saveDirectTest('रेखाएँ एवं कोण - Test 02', 'रेखाएँ एवं कोण', lines02);
  await saveDirectTest('रेखाएँ एवं कोण - Test 03', 'रेखाएँ एवं कोण', lines03);

  await saveDirectTest('त्रिभुज - Test 01', 'त्रिभुज', tri01);
  await saveDirectTest('त्रिभुज - Test 02', 'त्रिभुज', tri02);
  await saveDirectTest('त्रिभुज - Test 03', 'त्रिभुज', tri03);

  console.log('Done uploading Ch7 Part 1!');
}

run().catch(err => {
  console.error('Error uploading:', err);
  process.exit(1);
});
