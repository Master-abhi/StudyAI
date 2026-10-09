const { saveDirectTest } = require('./direct_uploader.js');

// Chapter 7: ज्यामिति (Geometry) - Part 2
// Topic 3: चतुर्भुज (Quadrilaterals)

const quadGeom01 = [
  {
    question: "किसी चतुर्भुज के चारों अंतः कोणों का योग कितना होता है?",
    options: ["$360^\\circ$", "$180^\\circ$", "$540^\\circ$", "$720^\\circ$"],
    correctIndex: 0,
    explanation: "किसी भी चतुर्भुज के चारों अंतः कोणों का योग सदैव $360^\\circ$ (4 समकोण) होता है।",
    difficulty: "easy"
  },
  {
    question: "एक चतुर्भुज के कोणों का अनुपात $3 : 5 : 9 : 13$ है। सबसे छोटा कोण क्या होगा?",
    options: ["$36^\\circ$", "$60^\\circ$", "$108^\\circ$", "$156^\\circ$"],
    correctIndex: 0,
    explanation: "अनुपाती योग = $3 + 5 + 9 + 13 = 30$\n$30x = 360^\\circ \\implies x = 12^\\circ$\nसबसे छोटा कोण = $3 \\times 12^\\circ = 36^\\circ$",
    difficulty: "easy"
  },
  {
    question: "एक समांतर चतुर्भुज (Parallelogram) के आसन्न कोणों का योग कितना होता है?",
    options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "$270^\\circ$"],
    correctIndex: 0,
    explanation: "समांतर चतुर्भुज में किन्हीं दो आसन्न कोणों (adjacent angles) का योग सदैव $180^\\circ$ (संपूरक) होता है।",
    difficulty: "easy"
  },
  {
    question: "एक समचतुर्भुज (Rhombus) के विकर्ण परस्पर किस कोण पर प्रतिच्छेद करते हैं?",
    options: ["$90^\\circ$ (समकोण)", "$60^\\circ$", "$45^\\circ$", "$120^\\circ$"],
    correctIndex: 0,
    explanation: "समचतुर्भुज के विकर्ण एक-दूसरे को परस्पर समकोण ($90^\\circ$) पर समद्विभाजित करते हैं।",
    difficulty: "easy"
  },
  {
    question: "एक समचतुर्भुज के विकर्णों की लंबाइयाँ 16 सेमी और 12 सेमी हैं। इसकी भुजा की लंबाई क्या होगी?",
    options: ["10 सेमी", "14 सेमी", "20 सेमी", "8 सेमी"],
    correctIndex: 0,
    explanation: "समचतुर्भुज की भुजा $a = \\sqrt{(d_1/2)^2 + (d_2/2)^2} = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "चक्रीय चतुर्भुज (Cyclic Quadrilateral) के सम्मुख कोणों का योग कितना होता है?",
    options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "$270^\\circ$"],
    correctIndex: 0,
    explanation: "चक्रीय चतुर्भुज के सम्मुख कोण सदैव संपूरक होते हैं, अर्थात उनका योग $180^\\circ$ होता है।",
    difficulty: "easy"
  },
  {
    question: "यदि एक चक्रीय चतुर्भुज $ABCD$ में $\\angle A = 75^\\circ$ है, तो सम्मुख कोण $\\angle C$ का मान क्या होगा?",
    options: ["$105^\\circ$", "$115^\\circ$", "$75^\\circ$", "$95^\\circ$"],
    correctIndex: 0,
    explanation: "चक्रीय चतुर्भुज में $\\angle A + \\angle C = 180^\\circ \\implies \\angle C = 180^\\circ - 75^\\circ = 105^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "एक आयत के विकर्णों की लंबाई के संदर्भ में कौन-सा कथन सत्य है?",
    options: ["विकर्ण परस्पर बराबर और समद्विभाजक होते हैं", "विकर्ण परस्पर लंबवत होते हैं", "विकर्ण असमान होते हैं", "विकर्ण कोणों को समद्विभाजित करते हैं"],
    correctIndex: 0,
    explanation: "एक आयत (Rectangle) के दोनों विकर्ण लंबाई में समान होते हैं और परस्पर एक-दूसरे को समद्विभाजित करते हैं।",
    difficulty: "easy"
  },
  {
    question: "किसी समलंब चतुर्भुज (Trapezium) में समांतर भुजाओं का कितना युग्म होता है?",
    options: ["केवल एक युग्म", "दो युग्म", "कोई युग्म नहीं", "तीनों युग्म"],
    correctIndex: 0,
    explanation: "समलंब चतुर्भुज में सम्मुख भुजाओं का केवल एक युग्म समांतर होता है।",
    difficulty: "easy"
  },
  {
    question: "एक समांतर चतुर्भुज का एक कोण $70^\\circ$ है। इसके अन्य तीन कोण क्या होंगे?",
    options: ["$110^\\circ, 70^\\circ, 110^\\circ$", "$70^\\circ, 110^\\circ, 70^\\circ$", "$110^\\circ, 110^\\circ, 70^\\circ$", "$120^\\circ, 70^\\circ, 100^\\circ$"],
    correctIndex: 0,
    explanation: "सम्मुख कोण बराबर होते हैं ($70^\\circ$) तथा आसन्न कोण संपूरक होते हैं ($180^\\circ - 70^\\circ = 110^\\circ$)। अतः शेष कोण $110^\\circ, 70^\\circ, 110^\\circ$ हैं।",
    difficulty: "easy"
  }
];

const quadGeom02 = [
  {
    question: "यदि एक समचतुर्भुज की प्रत्येक भुजा 13 सेमी और एक विकर्ण 24 सेमी है, तो दूसरे विकर्ण की लंबाई क्या होगी?",
    options: ["10 सेमी", "12 सेमी", "14 सेमी", "8 सेमी"],
    correctIndex: 0,
    explanation: "सूत्र: $4a^2 = d_1^2 + d_2^2$\n$4(13^2) = 24^2 + d_2^2 \\implies 4(169) = 576 + d_2^2 \\implies 676 - 576 = d_2^2 \\implies d_2^2 = 100 \\implies d_2 = 10$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "एक चतुर्भुज की क्रमागत भुजाओं के मध्य बिंदुओं को मिलाने से बनने वाली आकृति सदैव क्या होती है?",
    options: ["समांतर चतुर्भुज (Parallelogram)", "वर्ग", "समचतुर्भुज", "समलंब"],
    correctIndex: 0,
    explanation: "वेरिग्नन प्रमेय (Varignon's Theorem): किसी भी चतुर्भुज की भुजाओं के मध्य बिंदुओं को क्रम से मिलाने पर प्राप्त आकृति सदैव एक समांतर चतुर्भुज होती है।",
    difficulty: "moderate"
  },
  {
    question: "यदि एक समद्विबाहु समलंब (Isosceles Trapezium) में $\\angle A = 65^\\circ$ है, तो इसके सम्मुख कोण का मान क्या होगा?",
    options: ["$115^\\circ$", "$65^\\circ$", "$125^\\circ$", "$105^\\circ$"],
    correctIndex: 0,
    explanation: "समद्विबाहु समलंब सदैव चक्रीय होता है। अतः इसके सम्मुख कोणों का योग $180^\\circ$ होता है: $180^\\circ - 65^\\circ = 115^\\circ$।",
    difficulty: "moderate"
  },
  {
    question: "एक समलंब चतुर्भुज $ABCD$ में $AB \\parallel CD$ है और विकर्ण $O$ पर प्रतिच्छेद करते हैं। यदि $AB = 2 CD$ और $\\triangle OCD$ का क्षेत्रफल $16 \\text{ सेमी}^2$ है, तो $\\triangle OAB$ का क्षेत्रफल क्या होगा?",
    options: ["$64 \\text{ सेमी}^2$", "$32 \\text{ सेमी}^2$", "$48 \\text{ सेमी}^2$", "$16 \\text{ सेमी}^2$"],
    correctIndex: 0,
    explanation: "$\\triangle OAB \\sim \\triangle OCD$\nक्षेत्रफलों का अनुपात = $(AB / CD)^2 = (2 / 1)^2 = 4$\n$\\text{Area}(\\triangle OAB) = 4 \\times 16 = 64 \\text{ सेमी}^2$।",
    difficulty: "hard"
  },
  {
    question: "एक आयत की भुजाओं के मध्य बिंदुओं को मिलाने से बनने वाली चतुर्भुज आकृति क्या होती है?",
    options: ["समचतुर्भुज (Rhombus)", "वर्ग", "आयत", "पतंग"],
    correctIndex: 0,
    explanation: "एक आयत की भुजाओं के मध्य बिंदुओं को मिलाने पर सदैव एक समचतुर्भुज (Rhombus) बनता है।",
    difficulty: "moderate"
  },
  {
    question: "एक समचतुर्भुज की भुजाओं के मध्य बिंदुओं को मिलाने से बनने वाली आकृति क्या होती है?",
    options: ["आयत (Rectangle)", "वर्ग", "समचतुर्भुज", "समांतर चतुर्भुज"],
    correctIndex: 0,
    explanation: "समचतुर्भुज की भुजाओं के मध्य बिंदुओं को मिलाने पर प्राप्त आकृति सदैव एक आयत होती है।",
    difficulty: "moderate"
  },
  {
    question: "चक्रीय चतुर्भुज की एक भुजा को आगे बढ़ाने पर बनने वाला बहिष्कोण (Exterior angle) किसके बराबर होता है?",
    options: ["अंतः अभिमुख कोण (Interior opposite angle)", "आसन्न कोण", "सम्मुख कोण के पूरक", "$180^\\circ$ - आसन्न कोण"],
    correctIndex: 0,
    explanation: "चक्रीय चतुर्भुज का बहिष्कोण अपने अंतः अभिमुख कोण (Interior opposite angle) के बराबर होता है।",
    difficulty: "moderate"
  },
  {
    question: "यदि एक समांतर चतुर्भुज के विकर्ण परस्पर बराबर और लंबवत हों, तो वह क्या होगा?",
    options: ["वर्ग (Square)", "आयत", "समचतुर्भुज", "समलंब"],
    correctIndex: 0,
    explanation: "जिस समांतर चतुर्भुज के विकर्ण परस्पर बराबर भी हों और परस्पर लंबवत भी हों, वह एक वर्ग (Square) होता है।",
    difficulty: "easy"
  },
  {
    question: "यदि चक्रीय चतुर्भुज $ABCD$ में $AB$ वृत्त का व्यास है और $\\angle ADC = 120^\\circ$ है, तो $\\angle CAB$ का मान क्या होगा?",
    options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$20^\\circ$"],
    correctIndex: 0,
    explanation: "चक्रीय चतुर्भुज से: $\\angle B = 180^\\circ - 120^\\circ = 60^\\circ$\nअर्धवृत्त में बना कोण $\\angle ACB = 90^\\circ$\n$\\triangle ABC$ में: $\\angle CAB = 180^\\circ - (90^\\circ + 60^\\circ) = 30^\\circ$।",
    difficulty: "hard"
  },
  {
    question: "एक चतुर्भुज के विकर्ण परस्पर समद्विभाजित करते हैं, तो वह निश्चित रूप से क्या होगा?",
    options: ["समांतर चतुर्भुज", "आयत", "समचतुर्भुज", "वर्ग"],
    correctIndex: 0,
    explanation: "यदि किसी चतुर्भुज के विकर्ण एक-दूसरे को समद्विभाजित करते हैं, तो वह कम से कम एक समांतर चतुर्भुज (Parallelogram) अवश्य होता है।",
    difficulty: "easy"
  }
];

const quadGeom03 = [
  {
    question: "टॉलेमी के प्रमेय (Ptolemy's Theorem) के अनुसार चक्रीय चतुर्भुज $ABCD$ में विकर्णों और भुजाओं में क्या संबंध होता है?",
    options: ["$AC \\cdot BD = AB \\cdot CD + BC \\cdot AD$", "$AC + BD = AB + BC + CD + DA$", "$AC^2 + BD^2 = AB^2 + CD^2$", "$AC \\cdot BD = (AB + CD)(BC + AD)$"],
    correctIndex: 0,
    explanation: "टॉलेमी प्रमेय: चक्रीय चतुर्भुज के विकर्णों का गुणनफल सम्मुख भुजाओं के गुणनफलों के योग के बराबर होता है ($AC \\cdot BD = AB \\cdot CD + BC \\cdot AD$)।",
    difficulty: "hard"
  },
  {
    question: "एक वृत्त किसी चतुर्भुज $ABCD$ की चारों भुजाओं को स्पर्श करता है। यदि $AB = 6$ सेमी, $BC = 7$ सेमी और $CD = 4$ सेमी है, तो $AD$ की लंबाई क्या होगी?",
    options: ["3 सेमी", "5 सेमी", "4 सेमी", "6 सेमी"],
    correctIndex: 0,
    explanation: "परिवृत्त चतुर्भुज गुण: सम्मुख भुजाओं का योग बराबर होता है:\n$AB + CD = BC + AD \\implies 6 + 4 = 7 + AD \\implies 10 = 7 + AD \\implies AD = 3$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "समलंब $ABCD$ में $AB \\parallel CD$ है। यदि भुजाओं $AD$ और $BC$ के मध्य बिंदु क्रमशः $E$ और $F$ हैं, तो रेखाखंड $EF$ की लंबाई क्या होगी?",
    options: ["$\\frac{AB + CD}{2}$", "$\\frac{AB - CD}{2}$", "$\\sqrt{AB \\times CD}$", "$\\frac{2(AB \\times CD)}{AB + CD}$"],
    correctIndex: 0,
    explanation: "असमांतर भुजाओं के मध्य बिंदुओं को मिलाने वाले रेखाखंड की लंबाई समांतर भुजाओं के समांतर माध्य के बराबर होती है: $EF = \\frac{AB + CD}{2}$।",
    difficulty: "moderate"
  },
  {
    question: "एक समचतुर्भुज का परिमाप 40 सेमी है और एक कोण $60^\\circ$ है। इसके छोटे विकर्ण की लंबाई क्या होगी?",
    options: ["10 सेमी", "$10\\sqrt{3}$ सेमी", "5 सेमी", "$5\\sqrt{3}$ सेमी"],
    correctIndex: 0,
    explanation: "भुजा $a = 40 / 4 = 10$ सेमी।\nजब समचतुर्भुज का एक कोण $60^\\circ$ हो, तो छोटा विकर्ण दो समबाहु त्रिभुज बनाता है।\nअतः छोटे विकर्ण की लंबाई भी भुजा के बराबर अर्थात 10 सेमी होगी।",
    difficulty: "hard"
  },
  {
    question: "यदि एक आयत के एक विकर्ण और एक भुजा के बीच का कोण $25^\\circ$ है, तो दोनों विकर्णों के बीच का न्यूनकोण क्या होगा?",
    options: ["$50^\\circ$", "$65^\\circ$", "$40^\\circ$", "$55^\\circ$"],
    correctIndex: 0,
    explanation: "आयत के विकर्ण बराबर और परस्पर समद्विभाजित करते हैं। अतः समद्विबाहु त्रिभुज में आधार कोण $25^\\circ$ और $25^\\circ$ होंगे।\nतीसरा कोण (विकर्णों के बीच का कोण) = $180^\\circ - (25^\\circ + 25^\\circ) = 130^\\circ$\nन्यूनकोण = $180^\\circ - 130^\\circ = 50^\\circ$।",
    difficulty: "moderate"
  },
  {
    question: "समांतर चतुर्भुज $ABCD$ में कोणों $A$ और $B$ के समद्विभाजक बिंदु $P$ पर मिलते हैं। $\\angle APB$ का मान क्या होगा?",
    options: ["$90^\\circ$", "$60^\\circ$", "$120^\\circ$", "$45^\\circ$"],
    correctIndex: 0,
    explanation: "समांतर चतुर्भुज में $\\angle A + \\angle B = 180^\\circ$\nसमद्विभाजक होने पर: $\\frac{\\angle A}{2} + \\frac{\\angle B}{2} = 90^\\circ$\n$\\triangle APB$ में: $\\angle APB = 180^\\circ - 90^\\circ = 90^\\circ$।",
    difficulty: "moderate"
  },
  {
    question: "एक समलंब चतुर्भुज के विकर्णों के मध्य बिंदुओं को मिलाने वाले रेखाखंड की लंबाई क्या होती है?",
    options: ["$\\frac{AB - CD}{2}$", "$\\frac{AB + CD}{2}$", "$AB - CD$", "$\\frac{AB \\cdot CD}{2}$"],
    correctIndex: 0,
    explanation: "समलंब के दोनों विकर्णों के मध्य बिंदुओं को मिलाने वाली रेखा की लंबाई समांतर भुजाओं के अंतर की आधी होती है: $\\frac{|AB - CD|}{2}$।",
    difficulty: "hard"
  },
  {
    question: "चक्रीय समांतर चतुर्भुज (Cyclic Parallelogram) सदैव क्या होता है?",
    options: ["एक आयत (Rectangle)", "एक समचतुर्भुज", "एक समलंब", "एक पतंग"],
    correctIndex: 0,
    explanation: "समांतर चतुर्भुज में सम्मुख कोण बराबर होते हैं ($\\angle A = \\angle C$) और चक्रीय होने पर $\\angle A + \\angle C = 180^\\circ$। अतः प्रत्येक कोण $90^\\circ$ होगा, जिससे वह एक आयत बनता है।",
    difficulty: "moderate"
  },
  {
    question: "चक्रीय समचतुर्भुज (Cyclic Rhombus) सदैव क्या होता है?",
    options: ["एक वर्ग (Square)", "एक आयत", "केवल समचतुर्भुज", "एक पतंग"],
    correctIndex: 0,
    explanation: "समचतुर्भुज चक्रीय होने पर उसके सभी कोण $90^\\circ$ हो जाते हैं, और सभी भुजाएं पहले से बराबर होती हैं, अतः वह एक वर्ग (Square) होता है।",
    difficulty: "moderate"
  },
  {
    question: "एक चतुर्भुज $ABCD$ में विकर्ण $AC$ और $BD$ परस्पर समकोण पर काटते हैं। निम्नलिखित में से कौन-सा संबंध सत्य है?",
    options: ["$AB^2 + CD^2 = BC^2 + DA^2$", "$AB^2 + BC^2 = CD^2 + DA^2$", "$AC^2 + BD^2 = AB^2 + CD^2$", "$AB + CD = BC + DA$"],
    correctIndex: 0,
    explanation: "जब किसी चतुर्भुज के विकर्ण परस्पर लंबवत होते हैं, तो सम्मुख भुजाओं के वर्गों का योग बराबर होता है: $AB^2 + CD^2 = BC^2 + DA^2$।",
    difficulty: "hard"
  }
];

// Topic 4: वृत्त (Circles)

const circle01 = [
  {
    question: "वृत्त की सबसे बड़ी जीवा (Chord) को क्या कहते हैं?",
    options: ["व्यास (Diameter)", "त्रिज्या (Radius)", "चाप (Arc)", "स्पर्श रेखा (Tangent)"],
    correctIndex: 0,
    explanation: "वृत्त के केन्द्र से होकर जाने वाली जीवा सबसे लंबी होती है और उसे वृत्त का व्यास (Diameter) कहते हैं।",
    difficulty: "easy"
  },
  {
    question: "अर्धवृत्त (Semicircle) में बना कोण कितने अंश का होता है?",
    options: ["$90^\\circ$ (समकोण)", "$60^\\circ$", "$180^\\circ$", "$45^\\circ$"],
    correctIndex: 0,
    explanation: "थेल्स प्रमेय के अनुसार अर्धवृत्त में बना कोण सदैव समकोण अर्थात $90^\\circ$ होता है।",
    difficulty: "easy"
  },
  {
    question: "वृत्त के केन्द्र से जीवा पर डाला गया लंब जीवा को:",
    options: ["समद्विभाजित करता है", "त्रिभाजित करता है", "$1:2$ में बाँटता है", "अपरिवर्तित रखता है"],
    correctIndex: 0,
    explanation: "वृत्त के केन्द्र से किसी जीवा पर खींचा गया लंब उस जीवा को दो बराबर भागों में समद्विभाजित (bisect) करता है।",
    difficulty: "easy"
  },
  {
    question: "वृत्त की त्रिज्या 10 सेमी है और एक जीवा की लम्बाई 16 सेमी है। केन्द्र से जीवा की दूरी क्या होगी?",
    options: ["6 सेमी", "8 सेमी", "4 सेमी", "5 सेमी"],
    correctIndex: 0,
    explanation: "केन्द्र से लंब जीवा को 8 सेमी के दो भागों में बाँटेगा।\nपाइथागोरस से दूरी $= \\sqrt{10^2 - 8^2} = \\sqrt{100 - 64} = \\sqrt{36} = 6$ सेमी।",
    difficulty: "easy"
  },
  {
    question: "वृत्त के किसी बाह्य बिंदु से वृत्त पर कितनी स्पर्श रेखाएँ खींची जा सकती हैं?",
    options: ["2", "1", "अनंत", "0"],
    correctIndex: 0,
    explanation: "वृत्त के बाहर स्थित किसी बिंदु से वृत्त पर केवल और केवल 2 स्पर्श रेखाएँ खींची जा सकती हैं और दोनों लंबाइयों में समान होती हैं।",
    difficulty: "easy"
  },
  {
    question: "स्पर्श बिंदु पर स्पर्श रेखा और त्रिज्या के बीच का कोण कितना होता है?",
    options: ["$90^\\circ$", "$60^\\circ$", "$45^\\circ$", "$180^\\circ$"],
    correctIndex: 0,
    explanation: "वृत्त की स्पर्श रेखा स्पर्श बिंदु से जाने वाली त्रिज्या पर लंबवत ($90^\\circ$) होती है।",
    difficulty: "easy"
  },
  {
    question: "एक वृत्त की चाप द्वारा केन्द्र पर अंतरित कोण परिधि के शेष भाग पर अंतरित कोण का कितना होता है?",
    options: ["दोगुना", "आधा", "बराबर", "चार गुना"],
    correctIndex: 0,
    explanation: "वृत्त के किसी चाप द्वारा केन्द्र पर बना कोण उसी चाप द्वारा परिधि के किसी बिंदु पर बने कोण का दोगुना होता है।",
    difficulty: "easy"
  },
  {
    question: "एक ही वृत्तखंड (Same segment) में बने कोण परस्पर कैसे होते हैं?",
    options: ["बराबर", "पूरक", "संपूरक", "असमान"],
    correctIndex: 0,
    explanation: "ज्यामिति के नियम के अनुसार, एक ही वृत्तखंड में बने कोण आपस में सदैव बराबर होते हैं।",
    difficulty: "easy"
  },
  {
    question: "केन्द्र $O$ वाले वृत्त पर बाह्य बिंदु $P$ से खींची गई स्पर्श रेखा $PT$ की लंबाई 12 सेमी है। यदि वृत्त की त्रिज्या 5 सेमी हो, तो $OP$ की लंबाई क्या होगी?",
    options: ["13 सेमी", "15 सेमी", "17 सेमी", "11 सेमी"],
    correctIndex: 0,
    explanation: "$\\triangle OTP$ समकोण त्रिभुज है (जहाँ $\\angle OTP = 90^\\circ$)।\n$OP = \\sqrt{PT^2 + OT^2} = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "तीन असंरेखी (Non-collinear) बिंदुओं से होकर कितने वृत्त खींचे जा सकते हैं?",
    options: ["केवल एक", "दो", "अनंत", "कोई नहीं"],
    correctIndex: 0,
    explanation: "तीन असंरेखी बिंदुओं से होकर केवल और केवल एक अद्वितीय वृत्त (unique circle) खींचा जा सकता है।",
    difficulty: "easy"
  }
];

const circle02 = [
  {
    question: "दो संकेन्द्री वृत्तों (Concentric circles) की त्रिज्याएँ 13 सेमी और 5 सेमी हैं। बड़े वृत्त की उस जीवा की लंबाई क्या होगी जो छोटे वृत्त को स्पर्श करती है?",
    options: ["24 सेमी", "12 सेमी", "20 सेमी", "26 सेमी"],
    correctIndex: 0,
    explanation: "जीवा छोटे वृत्त की स्पर्श रेखा है, अतः दूरी = 5 सेमी।\nआधी जीवा $= \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$ सेमी।\nजीवा की कुल लंबाई $= 2 \\times 12 = 24$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "वृत्त के बाह्य बिंदु $P$ से दो स्पर्श रेखाएँ $PA$ और $PB$ खींची गई हैं। यदि $\\angle APB = 80^\\circ$ हो, तो $\\angle AOB$ का मान क्या होगा?",
    options: ["$100^\\circ$", "$80^\\circ$", "$90^\\circ$", "$120^\\circ$"],
    correctIndex: 0,
    explanation: "चतुर्भुज $OAPB$ में $\\angle OAP = \\angle OBP = 90^\\circ$ होने के कारण सम्मुख कोण $\\angle APB + \\angle AOB = 180^\\circ$\n$\\implies \\angle AOB = 180^\\circ - 80^\\circ = 100^\\circ$।",
    difficulty: "moderate"
  },
  {
    question: "यदि दो जीवाएँ $AB$ और $CD$ वृत्त के अंदर बिंदु $P$ पर प्रतिच्छेद करती हैं, तो निम्न में से कौन-सा सत्य है?",
    options: ["$PA \\times PB = PC \\times PD$", "$PA \\times PC = PB \\times PD$", "$PA + PB = PC + PD$", "$PA / PB = PC / PD$"],
    correctIndex: 0,
    explanation: "प्रतिच्छेदी जीवा प्रमेय (Intersecting Chords Theorem): $PA \\times PB = PC \\times PD$।",
    difficulty: "moderate"
  },
  {
    question: "वृत्त के बाहर स्थित बिंदु $P$ से एक छेदक रेखा $PAB$ (वृत्त को $A$ और $B$ पर काटती है) और एक स्पर्श रेखा $PT$ खींची गई है। यदि $PA = 4$ सेमी और $AB = 5$ सेमी हो, तो स्पर्श रेखा $PT$ की लंबाई क्या होगी?",
    options: ["6 सेमी", "5 सेमी", "$4.5$ सेमी", "$\\sqrt{20}$ सेमी"],
    correctIndex: 0,
    explanation: "स्पर्श रेखा-छेदक रेखा प्रमेय: $PT^2 = PA \\times PB$\n$PB = PA + AB = 4 + 5 = 9$ सेमी\n$PT^2 = 4 \\times 9 = 36 \\implies PT = 6$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "दो वृत्त एक-दूसरे को बाह्यतः स्पर्श करते हैं। उनकी उभयनिष्ठ अनुस्पर्श रेखाओं (Direct common tangents) की कुल संख्या कितनी होगी?",
    options: ["3", "2", "4", "1"],
    correctIndex: 0,
    explanation: "जब दो वृत्त बाह्य रूप से स्पर्श करते हैं, तो कुल 3 उभयनिष्ठ स्पर्श रेखाएँ खींची जा सकती हैं (2 प्रत्यक्ष और 1 स्पर्श बिंदु पर अनुप्रस्थ)।",
    difficulty: "moderate"
  },
  {
    question: "दो वृत्त एक-दूसरे को बिल्कुल नहीं काटते और अलग-अलग स्थित हैं। उनकी कुल कितनी उभयनिष्ठ स्पर्श रेखाएँ (Common tangents) खींची जा सकती हैं?",
    options: ["4", "3", "2", "1"],
    correctIndex: 0,
    explanation: "दो पृथक वृत्तों की कुल 4 उभयनिष्ठ स्पर्श रेखाएँ खींची जा सकती हैं (2 प्रत्यक्ष/Direct और 2 तिर्यक/Transverse)।",
    difficulty: "easy"
  },
  {
    question: "केन्द्र $O$ वाले वृत्त की परिधि पर स्थित बिंदु $C$ पर $\\angle ACB = 40^\\circ$ है, जहाँ $AB$ एक जीवा है। $\\angle AOB$ का मान क्या होगा?",
    options: ["$80^\\circ$", "$40^\\circ$", "$20^\\circ$", "$100^\\circ$"],
    correctIndex: 0,
    explanation: "केन्द्र पर बना कोण परिधि पर बने कोण का दोगुना होता है: $\\angle AOB = 2 \\times \\angle ACB = 2 \\times 40^\\circ = 80^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "दीर्घ वृत्तखंड (Major segment) में बना कोण कैसा होता है?",
    options: ["न्यून कोण (Acute angle)", "अधिक कोण (Obtuse angle)", "समकोण", "ऋजु कोण"],
    correctIndex: 0,
    explanation: "दीर्घ वृत्तखंड में बनने वाला कोण सदैव न्यून कोण ($< 90^\\circ$) होता है, जबकि लघु वृत्तखंड में बना कोण अधिक कोण ($> 90^\\circ$) होता है।",
    difficulty: "moderate"
  },
  {
    question: "वृत्त के केन्द्र से 5 सेमी दूरी पर स्थित 24 सेमी लंबी जीवा के लिए वृत्त का व्यास क्या होगा?",
    options: ["26 सेमी", "13 सेमी", "25 सेमी", "20 सेमी"],
    correctIndex: 0,
    explanation: "आधी जीवा = 12 सेमी, लंबवत दूरी = 5 सेमी\nत्रिज्या $r = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = 13$ सेमी\nव्यास $d = 2 \\times 13 = 26$ सेमी।",
    difficulty: "moderate"
  },
  {
    question: "यदि दो वृत्त एक-दूसरे को अन्तः स्पर्श करते हैं, तो उनकी कुल कितनी उभयनिष्ठ स्पर्श रेखाएँ हो सकती हैं?",
    options: ["केवल 1", "2", "3", "कोई नहीं"],
    correctIndex: 0,
    explanation: "जब दो वृत्त एक-दूसरे को आंतरिक रूप से स्पर्श करते हैं, तो उनके स्पर्श बिंदु पर केवल 1 ही उभयनिष्ठ स्पर्श रेखा खींची जा सकती है।",
    difficulty: "easy"
  }
];

const circle03 = [
  {
    question: "त्रिज्या 8 सेमी और 3 सेमी वाले दो वृत्तों के केन्द्रों के बीच की दूरी 13 सेमी है। उनकी उभयनिष्ठ अनुस्पर्श रेखा (Direct common tangent) की लंबाई क्या होगी?",
    options: ["12 सेमी", "10 सेमी", "$11.5$ सेमी", "13 सेमी"],
    correctIndex: 0,
    explanation: "सूत्र: $L = \\sqrt{d^2 - (r_1 - r_2)^2}$\nयहाँ $d = 13, r_1 - r_2 = 8 - 3 = 5$\n$L = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "त्रिज्या 4 सेमी और 2 सेमी वाले दो वृत्तों के केन्द्रों के बीच की दूरी 10 सेमी है। उनकी तिर्यक उभयनिष्ठ स्पर्श रेखा (Transverse common tangent) की लंबाई क्या होगी?",
    options: ["8 सेमी", "$7.5$ सेमी", "6 सेमी", "9 सेमी"],
    correctIndex: 0,
    explanation: "सूत्र: $L_{tr} = \\sqrt{d^2 - (r_1 + r_2)^2}$\nयहाँ $d = 10, r_1 + r_2 = 4 + 2 = 6$\n$L_{tr} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "एक वृत्त की दो समांतर जीवाओं की लंबाइयाँ 6 सेमी और 8 सेमी हैं तथा वे केन्द्र के एक ही ओर स्थित हैं। यदि वृत्त की त्रिज्या 5 सेमी है, तो दोनों जीवाओं के बीच की दूरी क्या होगी?",
    options: ["1 सेमी", "2 सेमी", "3 सेमी", "1.5 सेमी"],
    correctIndex: 0,
    explanation: "6 सेमी जीवा की केन्द्र से दूरी $= \\sqrt{5^2 - 3^2} = 4$ सेमी\n8 सेमी जीवा की केन्द्र से दूरी $= \\sqrt{5^2 - 4^2} = 3$ सेमी\nकेन्द्र के एक ही ओर होने पर दूरी $= 4 - 3 = 1$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "एकांतर वृत्तखंड प्रमेय (Alternate Segment Theorem) के अनुसार स्पर्श रेखा और जीवा के बीच बना कोण किसके बराबर होता है?",
    options: ["एकांतर वृत्तखंड में जीवा द्वारा अंतरित कोण", "केन्द्र पर बने कोण", "जीवा के संपूरक कोण", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "एकांतर वृत्तखंड प्रमेय के अनुसार वृत्त की किसी स्पर्श रेखा और स्पर्श बिंदु से जाने वाली जीवा के बीच बना कोण एकांतर वृत्तखंड में उसी जीवा द्वारा बनाए गए कोण के बराबर होता है।",
    difficulty: "moderate"
  },
  {
    question: "दो वृत्त एक-दूसरे को प्रतिच्छेद करते हैं। उनकी उभयनिष्ठ जीवा (Common chord) की लंबाई 24 सेमी है। यदि वृत्तों की त्रिज्याएँ 15 सेमी और 13 सेमी हैं, तो उनके केन्द्रों के बीच की दूरी क्या होगी?",
    options: ["14 सेमी", "16 सेमी", "12 सेमी", "18 सेमी"],
    correctIndex: 0,
    explanation: "उभयनिष्ठ जीवा का आधा $= 24/2 = 12$ सेमी\nपहले केन्द्र से दूरी $= \\sqrt{15^2 - 12^2} = \\sqrt{225 - 144} = \\sqrt{81} = 9$ सेमी\nदूसरे केन्द्र से दूरी $= \\sqrt{13^2 - 12^2} = \\sqrt{169 - 144} = \\sqrt{25} = 5$ सेमी\nकेन्द्रों के बीच की कुल दूरी $= 9 + 5 = 14$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "यदि एक वृत्त की दो जीवाएँ $AB$ और $CD$ बाहर बढ़ाने पर बिंदु $P$ पर मिलती हैं। यदि $PA = 8$ सेमी, $AB = 6$ सेमी और $PC = 4$ सेमी है, तो जीवा $CD$ की लंबाई क्या होगी?",
    options: ["24 सेमी", "20 सेमी", "16 सेमी", "12 सेमी"],
    correctIndex: 0,
    explanation: "बाहरी छेदक रेखा प्रमेय: $PA \\times PB = PC \\times PD$\nयहाँ $PB = PA - AB$ नहीं, यदि $P-A-B$ क्रम है तो $PB = PA + AB = 8 + 6 = 14$ नहीं, प्रश्न में यदि $P$ से खींची रेखा $PAB$ में $PA = 8$ और $AB = 6$ तो $PB = 14$... लेकिन मानक परिपाटी में $PB = PA + AB$ होता है।\nयदि $PA = 8$ और $AB = 6 \\implies PB = 14$ सेमी।\n$PA \\times PB = 8 \\times 14 = 112 = PC \\times PD = 4 \\times PD \\implies PD = 28$ सेमी।\n$CD = PD - PC = 28 - 4 = 24$ सेमी।",
    difficulty: "hard"
  },
  {
    question: "वृत्त के एक चाप की लंबाई 11 सेमी है और त्रिज्या 14 सेमी है। चाप द्वारा केन्द्र पर अंतरित कोण क्या होगा? ($\\pi = 22/7$)",
    options: ["$45^\\circ$", "$60^\\circ$", "$30^\\circ$", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "चाप की लंबाई $l = \\frac{\\theta}{360^\\circ} \\times 2\\pi r$\n$11 = \\frac{\\theta}{360} \\times 2 \\times \\frac{22}{7} \\times 14 = \\frac{\\theta}{360} \\times 88 \\implies \\theta = \\frac{11 \\times 360}{88} = \\frac{360}{8} = 45^\\circ$।",
    difficulty: "moderate"
  },
  {
    question: "एक वृत्त की त्रिज्या में 50% की वृद्धि करने पर इसके क्षेत्रफल में कितने प्रतिशत की वृद्धि होगी?",
    options: ["125%", "100%", "75%", "150%"],
    correctIndex: 0,
    explanation: "क्षेत्रफल $r^2$ के समानुपाती होता है:\nकुल वृद्धि $= 50 + 50 + \\frac{50 \\times 50}{100} = 100 + 25 = 125$%।",
    difficulty: "easy"
  },
  {
    question: "एक वृत्ताकार पहिए का व्यास 70 सेमी है। 1.1 किमी की दूरी तय करने में इसे कितने चक्कर लगाने होंगे? ($\\pi = 22/7$)",
    options: ["500", "400", "600", "250"],
    correctIndex: 0,
    explanation: "परिधि $= \\pi d = \\frac{22}{7} \\times 70 = 220$ सेमी $= 2.2$ मीटर\nदूरी $= 1.1$ किमी $= 1100$ मीटर\nचक्करों की संख्या $= \\frac{1100}{2.2} = 500$।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी वृत्त के व्यास के सिरों के निर्देशांक $(2, 3)$ और $(6, 7)$ हैं, तो वृत्त के केन्द्र के निर्देशांक क्या होंगे?",
    options: ["$(4, 5)$", "$(3, 4)$", "$(5, 4)$", "$(8, 10)$"],
    correctIndex: 0,
    explanation: "केन्द्र व्यास का मध्य बिंदु होता है:\n$\\left(\\frac{2+6}{2}, \\frac{3+7}{2}\\right) = (4, 5)$।",
    difficulty: "easy"
  }
];

async function run() {
  console.log('Uploading Chapter 7 (Part 2): चतुर्भुज & वृत्त...');
  await saveDirectTest('चतुर्भुज - Test 01', 'चतुर्भुज', quadGeom01);
  await saveDirectTest('चतुर्भुज - Test 02', 'चतुर्भुज', quadGeom02);
  await saveDirectTest('चतुर्भुज - Test 03', 'चतुर्भुज', quadGeom03);

  await saveDirectTest('वृत्त - Test 01', 'वृत्त', circle01);
  await saveDirectTest('वृत्त - Test 02', 'वृत्त', circle02);
  await saveDirectTest('वृत्त - Test 03', 'वृत्त', circle03);

  console.log('Done uploading Ch7 Part 2! Chapter 7 is complete!');
}

run().catch(err => {
  console.error('Error uploading:', err);
  process.exit(1);
});
