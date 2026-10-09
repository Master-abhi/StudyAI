const { saveDirectTest } = require('./direct_uploader.js');

// Chapter 15: निर्देशांक ज्यामिति (Coordinate Geometry)
// Topic 1: निर्देशांक ज्यामिति की मूल बातें

const cgBasics01 = [
  {
    question: "बिंदु $(-3, 4)$ किस चतुर्थांश (Quadrant) में स्थित है?",
    options: ["द्वितीय चतुर्थांश", "प्रथम चतुर्थांश", "तृतीय चतुर्थांश", "चतुर्थ चतुर्थांश"],
    correctIndex: 0,
    explanation: "$(-, +)$ द्वितीय चतुर्थांश में होता है।",
    difficulty: "easy"
  },
  {
    question: "मूल बिंदु (Origin) के निर्देशांक क्या होते हैं?",
    options: ["$(0, 0)$", "$(1, 1)$", "$(0, 1)$", "$(1, 0)$"],
    correctIndex: 0,
    explanation: "मूल बिंदु के निर्देशांक $(0, 0)$ होते हैं।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(5, -7)$ की कोटि (Ordinate / $y$-coordinate) क्या है?",
    options: ["-7", "5", "7", "-5"],
    correctIndex: 0,
    explanation: "कोटि (Ordinate) बिंदु का $y$-निर्देशांक होता है, जो यहाँ $-7$ है।",
    difficulty: "easy"
  },
  {
    question: "$x$-अक्ष पर स्थित किसी भी बिंदु का $y$-निर्देशांक सदैव क्या होता है?",
    options: ["0", "1", "-1", "अपरिभाषित"],
    correctIndex: 0,
    explanation: "$x$-अक्ष पर $y = 0$ होता है।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(-4, -6)$ किस चतुर्थांश में स्थित है?",
    options: ["तृतीय चतुर्थांश", "चतुर्थ चतुर्थांश", "द्वितीय चतुर्थांश", "प्रथम चतुर्थांश"],
    correctIndex: 0,
    explanation: "$(-, -)$ तृतीय चतुर्थांश में होता है।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(2, 3)$ और $(4, 7)$ को मिलाने वाली रेखा की ढाल (Slope, $m$) क्या होगी?",
    options: ["2", "$\\frac{1}{2}$", "4", "3"],
    correctIndex: 0,
    explanation: "$m = \\frac{7 - 3}{4 - 2} = \\frac{4}{2} = 2$।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(3, -5)$ की $x$-अक्ष से दूरी क्या होगी?",
    options: ["5 इकाई", "3 इकाई", "-5 इकाई", "$\\sqrt{34}$ इकाई"],
    correctIndex: 0,
    explanation: "$x$-अक्ष से दूरी $= |-5| = 5$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "रेखा $2x + 3y = 6$ का $y$-अन्तःखण्ड (y-intercept) क्या होगा?",
    options: ["2", "3", "6", "1"],
    correctIndex: 0,
    explanation: "$x = 0$ रखने पर: $3y = 6 \\implies y = 2$।",
    difficulty: "easy"
  },
  {
    question: "यदि तीन बिंदु संरेखी (Collinear) हैं, तो उनसे बनने वाले त्रिभुज का क्षेत्रफल क्या होगा?",
    options: ["0", "1", "$\\frac{1}{2}$", "अपरिभाषित"],
    correctIndex: 0,
    explanation: "संरेखी बिंदुओं से निर्मित त्रिभुज का क्षेत्रफल शून्य होता है।",
    difficulty: "easy"
  },
  {
    question: "$y$-अक्ष का समीकरण क्या होता है?",
    options: ["$x = 0$", "$y = 0$", "$x = y$", "$x + y = 0$"],
    correctIndex: 0,
    explanation: "$y$-अक्ष पर प्रत्येक बिंदु का $x$-निर्देशांक शून्य होता है, अतः समीकरण $x = 0$ है।",
    difficulty: "easy"
  }
];

const cgBasics02 = [
  {
    question: "बिंदु $(4, -3)$ की $y$-अक्ष से दूरी क्या होगी?",
    options: ["4 इकाई", "3 इकाई", "-3 इकाई", "5 इकाई"],
    correctIndex: 0,
    explanation: "$y$-अक्ष से दूरी $= |x| = |4| = 4$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "रेखा $y = 3x + 5$ की ढाल (Slope) और $y$-अन्तःखण्ड क्रमशः क्या हैं?",
    options: ["3 और 5", "5 और 3", "3 और -5", "-3 और 5"],
    correctIndex: 0,
    explanation: "$y = mx + c$ रूप में ढाल $m = 3$ तथा $y$-अन्तःखण्ड $c = 5$ है।",
    difficulty: "easy"
  },
  {
    question: "यदि दो परस्पर लंबवत रेखाओं के ढाल $m_1$ और $m_2$ हैं, तो उनके बीच क्या संबंध होता है?",
    options: ["$m_1 \\times m_2 = -1$", "$m_1 = m_2$", "$m_1 + m_2 = 0$", "$m_1 - m_2 = 1$"],
    correctIndex: 0,
    explanation: "परस्पर लंबवत रेखाओं के ढालों का गुणनफल $-1$ होता है ($m_1 m_2 = -1$)।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(0, -4)$ कहाँ स्थित है?",
    options: ["$y$-अक्ष की ऋणात्मक दिशा पर", "$x$-अक्ष की ऋणात्मक दिशा पर", "चतुर्थ चतुर्थांश में", "तृतीय चतुर्थांश में"],
    correctIndex: 0,
    explanation: "$x = 0$ होने के कारण यह बिंदु $y$-अक्ष पर स्थित है और $y = -4$ होने से ऋणात्मक दिशा में है।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(a, b)$ का $x$-अक्ष में परावर्तन (Reflection in x-axis) क्या होगा?",
    options: ["$(a, -b)$", "$(-a, b)$", "$(-a, -b)$", "$(b, a)$"],
    correctIndex: 0,
    explanation: "$x$-अक्ष में परावर्तन करने पर $x$-निर्देशांक वही रहता है और $y$-निर्देशांक का चिन्ह बदल जाता है: $(a, -b)$।",
    difficulty: "moderate"
  },
  {
    question: "बिंदु $(-2, 5)$ का $y$-अक्ष में परावर्तन (Reflection in y-axis) क्या होगा?",
    options: ["$(2, 5)$", "$(-2, -5)$", "$(2, -5)$", "$(5, -2)$"],
    correctIndex: 0,
    explanation: "$y$-अक्ष में परावर्तन करने पर $y$ वही रहता है तथा $x$ का चिन्ह बदलता है: $(2, 5)$।",
    difficulty: "moderate"
  },
  {
    question: "बिंदु $(3, -4)$ का मूल बिंदु में परावर्तन (Reflection through origin) क्या होगा?",
    options: ["$(-3, 4)$", "$(3, 4)$", "$(-3, -4)$", "$(4, -3)$"],
    correctIndex: 0,
    explanation: "मूल बिंदु में परावर्तन पर दोनों निर्देशांकों के चिन्ह बदल जाते हैं: $(-3, 4)$।",
    difficulty: "easy"
  },
  {
    question: "रेखा $x = 4$ का आलेख (Graph) कैसा होगा?",
    options: ["$y$-अक्ष के समांतर एक ऊर्ध्वाधर रेखा", "$x$-अक्ष के समांतर एक क्षैतिज रेखा", "मूल बिंदु से गुजरने वाली रेखा", "तिरछी रेखा"],
    correctIndex: 0,
    explanation: "$x = c$ का आलेख $y$-अक्ष के समांतर एक ऊर्ध्वाधर रेखा होती है।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(1, 2)$ और $(3, 6)$ से होकर जाने वाली रेखा का समीकरण क्या होगा?",
    options: ["$y = 2x$", "$y = 3x - 1$", "$2y = x + 3$", "$y = x + 1$"],
    correctIndex: 0,
    explanation: "ढाल $m = \\frac{6 - 2}{3 - 1} = 2$\nसमीकरण: $y - 2 = 2(x - 1) \\implies y - 2 = 2x - 2 \\implies y = 2x$।",
    difficulty: "moderate"
  },
  {
    question: "कार्तीय निर्देशांक पद्धति के जनक (Father of Cartesian coordinate system) कौन माने जाते हैं?",
    options: ["रेने देकार्त (René Descartes)", "यूक्लिड", "पाइथागोरस", "आर्यभट"],
    correctIndex: 0,
    explanation: "कार्तीय निर्देशांक प्रणाली का विकास फ्रांसीसी गणितज्ञ रेने देकार्त ने किया था।",
    difficulty: "easy"
  }
];

const cgBasics03 = [
  {
    question: "यदि बिंदु $(2, 3), (4, k)$ और $(6, -3)$ संरेखी हैं, तो $k$ का मान क्या होगा?",
    options: ["0", "1", "-1", "2"],
    correctIndex: 0,
    explanation: "ढाल समान होगी: $\\frac{k - 3}{4 - 2} = \\frac{-3 - k}{6 - 4} \\implies \\frac{k - 3}{2} = \\frac{-3 - k}{2} \\implies k - 3 = -3 - k \\implies 2k = 0 \\implies k = 0$।",
    difficulty: "moderate"
  },
  {
    question: "रेखा $3x - 4y + 12 = 0$ द्वारा दोनों अक्षों के बीच काटे गए अंतःखण्ड की लंबाई क्या होगी?",
    options: ["5 इकाई", "7 इकाई", "4 इकाई", "3 इकाई"],
    correctIndex: 0,
    explanation: "$x$-अन्तःखण्ड: $y = 0 \\implies 3x = -12 \\implies x = -4$\n$y$-अन्तःखण्ड: $x = 0 \\implies -4y = -12 \\implies y = 3$\nलंबाई $= \\sqrt{(-4)^2 + 3^2} = \\sqrt{16 + 9} = 5$ इकाई।",
    difficulty: "moderate"
  },
  {
    question: "रेखा $y = 2$ का आलेख किसके समांतर होगा?",
    options: ["$x$-अक्ष के समांतर", "$y$-अक्ष के समांतर", "$y = x$ के समांतर", "मूल बिंदु से"],
    correctIndex: 0,
    explanation: "$y = c$ का आलेख $x$-अक्ष के समांतर एक क्षैतिज रेखा होती है।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(k, 2)$ रेखा $2x + 3y = 10$ पर स्थित है। $k$ का मान क्या होगा?",
    options: ["2", "3", "1", "4"],
    correctIndex: 0,
    explanation: "$2k + 3(2) = 10 \\implies 2k + 6 = 10 \\implies 2k = 4 \\implies k = 2$।",
    difficulty: "easy"
  },
  {
    question: "समीकरण $ax + by + c = 0$ की ढाल (Slope) क्या होती है?",
    options: ["$-\\frac{a}{b}$", "$\\frac{a}{b}$", "$-\\frac{b}{a}$", "$-\\frac{c}{b}$"],
    correctIndex: 0,
    explanation: "$by = -ax - c \\implies y = -\\frac{a}{b}x - \\frac{c}{b}$। ढाल $m = -\\frac{a}{b}$ होती है।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(3, 4)$ की रेखा $3x + 4y - 5 = 0$ से लंबवत दूरी क्या होगी?",
    options: ["4 इकाई", "5 इकाई", "3 इकाई", "2 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\frac{|3(3) + 4(4) - 5|}{\\sqrt{3^2 + 4^2}} = \\frac{|9 + 16 - 5|}{5} = \\frac{20}{5} = 4$ इकाई।",
    difficulty: "hard"
  },
  {
    question: "दो समांतर रेखाओं $3x + 4y + 5 = 0$ और $3x + 4y - 15 = 0$ के बीच की लंबवत दूरी क्या होगी?",
    options: ["4 इकाई", "2 इकाई", "5 इकाई", "3 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\frac{|c_1 - c_2|}{\\sqrt{a^2 + b^2}} = \\frac{|5 - (-15)|}{\\sqrt{9 + 16}} = \\frac{20}{5} = 4$ इकाई।",
    difficulty: "hard"
  },
  {
    question: "यदि किसी रेखा का झुकाव कोण $\\theta = 45^\\circ$ है, तो उसकी ढाल (Slope) क्या होगी?",
    options: ["1", "0", "$\\sqrt{3}$", "$\\frac{1}{\\sqrt{3}}$"],
    correctIndex: 0,
    explanation: "$m = \\tan \\theta = \\tan 45^\\circ = 1$।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(0, 0), (a, 0)$ और $(0, b)$ से बनने वाले त्रिभुज का क्षेत्रफल क्या होगा?",
    options: ["$\\frac{1}{2}|ab|$", "$|ab|$", "$\\frac{1}{2}(a + b)$", "$\\sqrt{a^2 + b^2}$"],
    correctIndex: 0,
    explanation: "समकोण त्रिभुज का क्षेत्रफल $= \\frac{1}{2} \\times \\text{आधार} \\times \\text{ऊँचाई} = \\frac{1}{2}|ab|$।",
    difficulty: "easy"
  },
  {
    question: "चतुर्थ चतुर्थांश में स्थित किसी बिंदु के भुज और कोटि के चिन्ह क्रमशः क्या होते हैं?",
    options: ["धनात्मक और ऋणात्मक $(+, -)$", "ऋणात्मक और धनात्मक $(-, +)$", "दोनों धनात्मक $(+, +)$", "दोनों ऋणात्मक $(-, -)$"],
    correctIndex: 0,
    explanation: "चतुर्थ चतुर्थांश में $x > 0$ तथा $y < 0$ होता है, अर्थात $(+, -)$।",
    difficulty: "easy"
  }
];

// Topic 2: दूरी सूत्र (Distance Formula)

const cgDist01 = [
  {
    question: "बिंदुओं $(2, 3)$ और $(5, 7)$ के बीच की दूरी क्या होगी?",
    options: ["5 इकाई", "4 इकाई", "6 इकाई", "7 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{(5 - 2)^2 + (7 - 3)^2} = \\sqrt{9 + 16} = 5$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "मूल बिंदु $(0, 0)$ से बिंदु $(6, -8)$ की दूरी क्या होगी?",
    options: ["10 इकाई", "14 इकाई", "8 इकाई", "6 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{6^2 + (-8)^2} = \\sqrt{100} = 10$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "यदि बिंदुओं $(3, k)$ और $(7, 5)$ के बीच की दूरी 5 इकाई है, तो $k$ का मान क्या होगा?",
    options: ["2 या 8", "1 या 7", "0 या 6", "3 या 9"],
    correctIndex: 0,
    explanation: "$(5 - k)^2 = 25 - 16 = 9 \\implies 5 - k = \\pm 3 \\implies k = 2, 8$।",
    difficulty: "moderate"
  },
  {
    question: "शीर्ष $(0, 0), (3, 0)$ और $(0, 4)$ वाले त्रिभुज का परिमाप क्या होगा?",
    options: ["12 इकाई", "10 इकाई", "7 इकाई", "14 इकाई"],
    correctIndex: 0,
    explanation: "भुजाएँ $3, 4, 5$ इकाई $\\implies$ परिमाप $= 12$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(a, b)$ और $(-a, -b)$ के बीच की दूरी क्या होगी?",
    options: ["$2\\sqrt{a^2 + b^2}$", "$\\sqrt{a^2 + b^2}$", "$4\\sqrt{a^2 + b^2}$", "$2(a + b)$"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{4a^2 + 4b^2} = 2\\sqrt{a^2 + b^2}$।",
    difficulty: "moderate"
  },
  {
    question: "बिंदुओं $(-5, 7)$ और $(-1, 3)$ के बीच की दूरी क्या होगी?",
    options: ["$4\\sqrt{2}$ इकाई", "$2\\sqrt{2}$ इकाई", "8 इकाई", "4 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{4^2 + (-4)^2} = \\sqrt{32} = 4\\sqrt{2}$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "$x$-अक्ष पर वह बिंदु जो $(2, -5)$ और $(-2, 9)$ से समदूरस्थ है, क्या होगा?",
    options: ["$(-7, 0)$", "$(7, 0)$", "$(0, -7)$", "$(-5, 0)$"],
    correctIndex: 0,
    explanation: "$(x-2)^2 + 25 = (x+2)^2 + 81 \\implies 8x = -56 \\implies x = -7$।",
    difficulty: "hard"
  },
  {
    question: "शीर्ष $(1, 7), (4, 2), (-1, -1)$ और $(-4, 4)$ किस प्रकार का चतुर्भुज बनाते हैं?",
    options: ["एक वर्ग (Square)", "एक आयत", "एक समचतुर्भुज", "एक समलंब"],
    correctIndex: 0,
    explanation: "चारों भुजाएँ $\\sqrt{34}$ और दोनों विकर्ण $\\sqrt{68}$ बराबर हैं, अतः यह एक वर्ग है।",
    difficulty: "hard"
  },
  {
    question: "बिंदु $(x, y)$ की मूल बिंदु से दूरी का सूत्र क्या है?",
    options: ["$\\sqrt{x^2 + y^2}$", "$x^2 + y^2$", "$x + y$", "$\\sqrt{x^2 - y^2}$"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{x^2 + y^2}$।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(0, 5)$ और $(-5, 0)$ के बीच की दूरी क्या होगी?",
    options: ["$5\\sqrt{2}$ इकाई", "5 इकाई", "10 इकाई", "$2\\sqrt{5}$ इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{(-5 - 0)^2 + (0 - 5)^2} = \\sqrt{25 + 25} = 5\\sqrt{2}$ इकाई।",
    difficulty: "easy"
  }
];

const cgDist02 = [
  {
    question: "बिंदुओं $(a\\cos \\theta, 0)$ और $(0, a\\sin \\theta)$ के बीच की दूरी क्या होगी?",
    options: ["$a$", "$a^2$", "$2a$", "$a\\sqrt{2}$"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{(0 - a\\cos \\theta)^2 + (a\\sin \\theta - 0)^2} = \\sqrt{a^2(\\cos^2 \\theta + \\sin^2 \\theta)} = \\sqrt{a^2} = a$।",
    difficulty: "moderate"
  },
  {
    question: "यदि बिंदु $(x, 2)$ और $(3, 4)$ के बीच की दूरी 2 इकाई है, तो $x$ का मान क्या होगा?",
    options: ["3", "1", "5", "0"],
    correctIndex: 0,
    explanation: "$(x - 3)^2 + (2 - 4)^2 = 2^2 \\implies (x - 3)^2 + 4 = 4 \\implies (x - 3)^2 = 0 \\implies x = 3$।",
    difficulty: "easy"
  },
  {
    question: "शीर्ष $(3, 0), (6, 4)$ और $(-1, 3)$ वाला त्रिभुज किस प्रकार का है?",
    options: ["समद्विबाहु समकोण त्रिभुज", "समबाहु त्रिभुज", "विषमबाहु त्रिभुज", "केवल समकोण"],
    correctIndex: 0,
    explanation: "भुजा $AB = \\sqrt{3^2 + 4^2} = 5$\nभुजा $BC = \\sqrt{(-7)^2 + (-1)^2} = \\sqrt{50} = 5\\sqrt{2}$\nभुजा $AC = \\sqrt{(-4)^2 + 3^2} = 5$\nचूँकि $AB = AC = 5$ तथा $AB^2 + AC^2 = 25 + 25 = 50 = BC^2$, अतः यह समद्विबाहु समकोण त्रिभुज है।",
    difficulty: "hard"
  },
  {
    question: "$y$-अक्ष पर वह बिंदु ज्ञात कीजिए जो बिंदु $A(6, 5)$ और $B(-4, 3)$ से समदूरस्थ है।",
    options: ["$(0, 9)$", "$(0, 5)$", "$(0, 6)$", "$(0, 8)$"],
    correctIndex: 0,
    explanation: "बिंदु $(0, y)$:\n$(0 - 6)^2 + (y - 5)^2 = (0 - (-4))^2 + (y - 3)^2$\n$36 + y^2 - 10y + 25 = 16 + y^2 - 6y + 9$\n$61 - 10y = 25 - 6y \\implies 4y = 36 \\implies y = 9$।\nबिंदु $(0, 9)$ है।",
    difficulty: "moderate"
  },
  {
    question: "बिंदुओं $(2, -3)$ और $(10, y)$ के बीच की दूरी 10 इकाई है। $y$ का संभावित मान क्या होगा?",
    options: ["3 या -9", "-3 या 9", "6 या -6", "0 या 6"],
    correctIndex: 0,
    explanation: "$(10 - 2)^2 + (y - (-3))^2 = 10^2 \\implies 64 + (y + 3)^2 = 100$\n$(y + 3)^2 = 36 \\implies y + 3 = \\pm 6 \\implies y = 3$ या $y = -9$।",
    difficulty: "moderate"
  },
  {
    question: "शीर्ष $(0, 0), (2, 0)$ और $(1, \\sqrt{3})$ किस प्रकार का त्रिभुज बनाते हैं?",
    options: ["समबाहु त्रिभुज (Equilateral Triangle)", "समकोण त्रिभुज", "समद्विबाहु त्रिभुज", "विषमबाहु त्रिभुज"],
    correctIndex: 0,
    explanation: "प्रत्येक भुजा की लंबाई $= 2$ इकाई है, अतः यह एक समबाहु त्रिभुज है।",
    difficulty: "moderate"
  },
  {
    question: "बिंदु $(p, q)$ और $(p+3, q+4)$ के बीच की दूरी क्या होगी?",
    options: ["5 इकाई", "7 इकाई", "3 इकाई", "4 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{(p+3 - p)^2 + (q+4 - q)^2} = \\sqrt{3^2 + 4^2} = 5$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "वृत्त का केन्द्र $(2, -3)$ है और परिधि पर एक बिंदु $(5, 1)$ है। वृत्त का व्यास क्या होगा?",
    options: ["10 इकाई", "5 इकाई", "15 इकाई", "20 इकाई"],
    correctIndex: 0,
    explanation: "त्रिज्या $r = \\sqrt{(5 - 2)^2 + (1 - (-3))^2} = \\sqrt{9 + 16} = 5$ इकाई।\nव्यास $= 2r = 10$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(-3, 0)$ और $(3, 0)$ के बीच की दूरी क्या होगी?",
    options: ["6 इकाई", "0", "3 इकाई", "9 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{(3 - (-3))^2 + 0^2} = \\sqrt{6^2} = 6$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "एक समबाहु त्रिभुज के दो शीर्ष $(0, 0)$ और $(3, \\sqrt{3})$ हैं। इसकी प्रत्येक भुजा की लंबाई क्या होगी?",
    options: ["$\\sqrt{12}$ इकाई", "3 इकाई", "4 इकाई", "$2\\sqrt{3}$ इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{3^2 + (\\sqrt{3})^2} = \\sqrt{9 + 3} = \\sqrt{12} = 2\\sqrt{3}$ इकाई।",
    difficulty: "moderate"
  }
];

const cgDist03 = [
  {
    question: "बिंदु $(x, y)$ की रेखा $y = 0$ ($x$-अक्ष) से लंबवत दूरी क्या होती है?",
    options: ["$|y|$", "$|x|$", "$\\sqrt{x^2 + y^2}$", "$y$"],
    correctIndex: 0,
    explanation: "$x$-अक्ष से किसी बिंदु की दूरी उसकी कोटि का निरपेक्ष मान $|y|$ होती है।",
    difficulty: "easy"
  },
  {
    question: "यदि बिंदुओं $(4, p)$ और $(1, 0)$ के बीच की दूरी 5 इकाई है, तो $p$ का मान क्या होगा?",
    options: ["$\\pm 4$", "$\\pm 3$", "$\\pm 5$", "4"],
    correctIndex: 0,
    explanation: "$(4 - 1)^2 + (p - 0)^2 = 5^2 \\implies 9 + p^2 = 25 \\implies p^2 = 16 \\implies p = \\pm 4$।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(a+b, a-b)$ और $(a-b, a+b)$ के बीच की दूरी क्या होगी?",
    options: ["$2\\sqrt{2} b$", "$2\\sqrt{2} a$", "$2b$", "$2a$"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{[(a-b) - (a+b)]^2 + [(a+b) - (a-b)]^2} = \\sqrt{(-2b)^2 + (2b)^2} = \\sqrt{4b^2 + 4b^2} = \\sqrt{8b^2} = 2\\sqrt{2}b$।",
    difficulty: "hard"
  },
  {
    question: "एक त्रिभुज के शीर्ष $A(5, -2), B(6, 4)$ और $C(7, -2)$ हैं। यह किस प्रकार का त्रिभुज है?",
    options: ["समद्विबाहु त्रिभुज (Isosceles)", "समबाहु त्रिभुज", "विषमबाहु त्रिभुज", "समकोण त्रिभुज"],
    correctIndex: 0,
    explanation: "$AB = \\sqrt{1^2 + 6^2} = \\sqrt{37}$\n$BC = \\sqrt{1^2 + (-6)^2} = \\sqrt{37}$\n$AC = \\sqrt{2^2 + 0} = 2$\nचूँकि $AB = BC = \\sqrt{37}$, अतः यह समद्विबाहु त्रिभुज है।",
    difficulty: "moderate"
  },
  {
    question: "मूल बिंदु से बिंदु $(\\sin \\theta, \\cos \\theta)$ की दूरी सदैव क्या होगी?",
    options: ["1 इकाई", "0", "2 इकाई", "$\\theta$ पर निर्भर"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{\\sin^2 \\theta + \\cos^2 \\theta} = \\sqrt{1} = 1$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(2, 3)$ और $(6, 6)$ के बीच की दूरी क्या होगी?",
    options: ["5 इकाई", "4 इकाई", "6 इकाई", "7 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{(6-2)^2 + (6-3)^2} = \\sqrt{16 + 9} = 5$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "शीर्ष $A(-2, 3)$ और $B(4, 3)$ को जोड़ने वाले रेखाखंड की लंबाई क्या है?",
    options: ["6 इकाई", "8 इकाई", "4 इकाई", "5 इकाई"],
    correctIndex: 0,
    explanation: "$y$-निर्देशांक समान होने पर दूरी $= |x_2 - x_1| = |4 - (-2)| = 6$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "यदि बिंदु $P(2, 1)$ और $Q(1, -2)$ हैं, तो $2PQ^2$ का मान क्या होगा?",
    options: ["20", "10", "15", "25"],
    correctIndex: 0,
    explanation: "$PQ^2 = (1 - 2)^2 + (-2 - 1)^2 = 1 + 9 = 10$\n$2PQ^2 = 2 \\times 10 = 20$।",
    difficulty: "easy"
  },
  {
    question: "यदि बिंदु $(0, 2)$ बिंदु $(3, k)$ और $(k, 5)$ से समदूरस्थ है, तो $k$ का मान क्या होगा?",
    options: ["1", "2", "3", "0"],
    correctIndex: 0,
    explanation: "$(3 - 0)^2 + (k - 2)^2 = (k - 0)^2 + (5 - 2)^2$\n$9 + k^2 - 4k + 4 = k^2 + 9 \\implies 4 - 4k = 0 \\implies k = 1$।",
    difficulty: "moderate"
  },
  {
    question: "एक समचतुर्भुज के शीर्ष क्रम से $(3, 0), (4, 5), (-1, 4)$ और $(-2, -1)$ हैं। इसके विकर्णों की लंबाइयाँ क्या होंगी?",
    options: ["$4\\sqrt{2}$ और $6\\sqrt{2}$", "$2\\sqrt{2}$ और $4\\sqrt{2}$", "4 और 6", "5 और 7"],
    correctIndex: 0,
    explanation: "$d_1 = \\text{दूरी } AC = \\sqrt{(-1 - 3)^2 + (4 - 0)^2} = \\sqrt{16 + 16} = 4\\sqrt{2}$\n$d_2 = \\text{दूरी } BD = \\sqrt{(-2 - 4)^2 + (-1 - 5)^2} = \\sqrt{36 + 36} = 6\\sqrt{2}$।",
    difficulty: "hard"
  }
];

// Topic 3: विभाजन सूत्र (Section Formula)

const cgSec01 = [
  {
    question: "बिंदुओं $(1, -2)$ और $(4, 7)$ को मिलाने वाले रेखाखंड का मध्य बिंदु क्या होगा?",
    options: ["$(2.5, 2.5)$", "$(3, 2.5)$", "$(2.5, 3)$", "$(3, 3)$"],
    correctIndex: 0,
    explanation: "$\\left(\\frac{1 + 4}{2}, \\frac{-2 + 7}{2}\\right) = (2.5, 2.5)$।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(-1, 7)$ और $(4, -3)$ को $2 : 3$ के अनुपात में अंतःविभाजित करने वाले बिंदु के निर्देशांक क्या हैं?",
    options: ["$(1, 3)$", "$(2, 3)$", "$(1, 4)$", "$(2, 4)$"],
    correctIndex: 0,
    explanation: "$x = \\frac{2(4) + 3(-1)}{5} = 1, y = \\frac{2(-3) + 3(7)}{5} = 3$।",
    difficulty: "moderate"
  },
  {
    question: "त्रिभुज के शीर्ष $(2, 3), (-1, 0)$ और $(2, -4)$ हैं। केन्द्रक के निर्देशांक क्या होंगे?",
    options: ["$(1, -1/3)$", "$(1, 1/3)$", "$(3, -1)$", "$(1, 0)$"],
    correctIndex: 0,
    explanation: "केन्द्रक $= \\left(\\frac{2-1+2}{3}, \\frac{3+0-4}{3}\\right) = (1, -1/3)$।",
    difficulty: "moderate"
  },
  {
    question: "बिंदु $(-4, 6)$, बिंदुओं $A(-6, 10)$ और $B(3, -8)$ को जोड़ने वाले रेखाखंड को किस अनुपात में विभाजित करता है?",
    options: ["$2 : 7$", "$7 : 2$", "$3 : 5$", "$1 : 2$"],
    correctIndex: 0,
    explanation: "$\\frac{3k - 6}{k + 1} = -4 \\implies 7k = 2 \\implies k = 2/7$।",
    difficulty: "moderate"
  },
  {
    question: "बिंदुओं $A(1, -5)$ और $B(-4, 5)$ को मिलाने वाले रेखाखंड को $x$-अक्ष किस अनुपात में विभाजित करता है?",
    options: ["$1 : 1$", "$1 : 2$", "$2 : 1$", "$3 : 2$"],
    correctIndex: 0,
    explanation: "$y$-निर्देशांक शून्य: $5k - 5 = 0 \\implies k = 1$ ($1 : 1$ समद्विभाजन)।",
    difficulty: "moderate"
  },
  {
    question: "समांतर चतुर्भुज के शीर्ष $(1, 2), (4, y), (x, 6)$ और $(3, 5)$ हैं। $x$ और $y$ के मान क्या होंगे?",
    options: ["$x = 6, y = 3$", "$x = 3, y = 6$", "$x = 5, y = 4$", "$x = 4, y = 5$"],
    correctIndex: 0,
    explanation: "$1 + x = 4 + 3 \\implies x = 6$\n$2 + 6 = y + 5 \\implies y = 3$।",
    difficulty: "hard"
  },
  {
    question: "शीर्ष $(1, -1), (-4, 6)$ और $(-3, -5)$ वाले त्रिभुज का क्षेत्रफल क्या होगा?",
    options: ["24 वर्ग इकाई", "48 वर्ग इकाई", "12 वर्ग इकाई", "36 वर्ग इकाई"],
    correctIndex: 0,
    explanation: "क्षेत्रफल $= \\frac{1}{2} |1(11) - 4(-4) - 3(-7)| = \\frac{1}{2}(48) = 24$ वर्ग इकाई।",
    difficulty: "hard"
  },
  {
    question: "बिंदुओं $(2, -2)$ और $(-7, 4)$ को मिलाने वाले रेखाखंड के सम-त्रिभाजन बिंदुओं में से एक बिंदु क्या होगा?",
    options: ["$(-1, 0)$", "$(0, 1)$", "$(-2, 1)$", "$(1, -1)$"],
    correctIndex: 0,
    explanation: "$1 : 2$ विभाजन: $x = \\frac{-7 + 4}{3} = -1, y = \\frac{4 - 4}{3} = 0 \\implies (-1, 0)$।",
    difficulty: "hard"
  },
  {
    question: "यदि बिंदु $P(x, y)$, बिंदुओं $A(5, 1)$ और $B(-1, 5)$ से समदूरस्थ है, तो संबंध क्या होगा?",
    options: ["$3x = 2y$", "$2x = 3y$", "$x = y$", "$x + y = 0$"],
    correctIndex: 0,
    explanation: "$8y = 12x \\implies 2y = 3x \\implies 3x = 2y$।",
    difficulty: "moderate"
  },
  {
    question: "विभाजन सूत्र के अनुसार बाह्य विभाजन (External division) में अनुपात का चिन्ह क्या लिया जाता है?",
    options: ["ऋणात्मक", "धनात्मक", "शून्य", "अपरिभाषित"],
    correctIndex: 0,
    explanation: "बाह्य विभाजन में अनुपात सूत्र में मध्य का चिन्ह ऋणात्मक ($-$) प्रयुक्त होता है।",
    difficulty: "easy"
  }
];

const cgSec02 = [
  {
    question: "बिंदुओं $(4, -1)$ और $(-2, -3)$ को मिलाने वाले रेखाखंड के सम-त्रिभाजन बिंदुओं के निर्देशांक क्या होंगे?",
    options: ["$(2, -5/3)$ और $(0, -7/3)$", "$(1, -2)$ और $(0, -3)$", "$(2, -1)$ और $(0, -2)$", "$(3, -2)$ और $(1, -3)$"],
    correctIndex: 0,
    explanation: "$1:2$ पर: $x = \\frac{-2 + 8}{3} = 2, y = \\frac{-3 - 2}{3} = -5/3$\n$2:1$ पर: $x = \\frac{-4 + 4}{3} = 0, y = \\frac{-6 - 1}{3} = -7/3$।",
    difficulty: "hard"
  },
  {
    question: "यदि बिंदु $A(6, 1), B(8, 2), C(9, 4)$ और $D(p, 3)$ एक समांतर चतुर्भुज के शीर्ष हैं, तो $p$ का मान क्या होगा?",
    options: ["7", "6", "8", "5"],
    correctIndex: 0,
    explanation: "विकर्णों के मध्य बिंदु समान होते हैं:\n$\\frac{6 + 9}{2} = \\frac{8 + p}{2} \\implies 15 = 8 + p \\implies p = 7$।",
    difficulty: "moderate"
  },
  {
    question: "बिंदुओं $A(2, -5)$ और $B(5, 2)$ को मिलाने वाले रेखाखंड का $2 : 3$ अनुपात में बाह्य विभाजन करने वाले बिंदु के निर्देशांक क्या होंगे?",
    options: ["$(-4, -19)$", "$(4, 19)$", "$(-4, 19)$", "$(4, -19)$"],
    correctIndex: 0,
    explanation: "$x = \\frac{2(5) - 3(2)}{2 - 3} = \\frac{10 - 6}{-1} = -4$\n$y = \\frac{2(2) - 3(-5)}{2 - 3} = \\frac{4 + 15}{-1} = -19$।\nबिंदु $(-4, -19)$ है।",
    difficulty: "hard"
  },
  {
    question: "यदि किसी वृत्त के एक व्यास के सिरे $(-2, -7)$ और $(4, 3)$ हैं, तो वृत्त के केन्द्र के निर्देशांक क्या होंगे?",
    options: ["$(1, -2)$", "$(2, -4)$", "$(3, 2)$", "$(1, -5)$"],
    correctIndex: 0,
    explanation: "केन्द्र व्यास का मध्य बिंदु होता है:\n$\\left(\\frac{-2 + 4}{2}, \\frac{-7 + 3}{2}\\right) = (1, -2)$।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $P(2, 3)$ और $Q(4, 5)$ को मिलाने वाले रेखाखंड का मध्य बिंदु $R(x, y)$ है। यदि $x + y - k = 0$ हो, तो $k$ का मान क्या होगा?",
    options: ["7", "6", "8", "5"],
    correctIndex: 0,
    explanation: "मध्य बिंदु $R = (3, 4)$\n$3 + 4 - k = 0 \\implies k = 7$।",
    difficulty: "moderate"
  },
  {
    question: "शीर्ष $(2, 3), (-1, 0)$ और $(2, -4)$ वाले त्रिभुज का क्षेत्रफल क्या होगा?",
    options: ["10.5 वर्ग इकाई", "21 वर्ग इकाई", "12 वर्ग इकाई", "14 वर्ग इकाई"],
    correctIndex: 0,
    explanation: "$\\text{Area} = \\frac{1}{2} |2(0 - (-4)) + (-1)(-4 - 3) + 2(3 - 0)| = \\frac{1}{2} |8 + 7 + 6| = \\frac{21}{2} = 10.5$ वर्ग इकाई।",
    difficulty: "moderate"
  },
  {
    question: "बिंदुओं $A(3, 5)$ और $B(7, 9)$ को जोड़ने वाले रेखाखंड को $y$-अक्ष किस अनुपात में विभाजित करता है?",
    options: ["$-3 : 7$ (बाह्य)", "$3 : 7$ (अंतः)", "$5 : 9$", "विभाजित नहीं करता"],
    correctIndex: 0,
    explanation: "$x = 0 \\implies \\frac{7k + 3}{k + 1} = 0 \\implies k = -3/7$ (बाह्य विभाजन अनुपात $3:7$)।",
    difficulty: "moderate"
  },
  {
    question: "यदि बिंदु $C(k, 4)$, बिंदुओं $A(2, 6)$ और $B(5, 1)$ को मिलाने वाली रेखा को $2 : 3$ में विभाजित करता है, तो $k$ का मान क्या होगा?",
    options: ["3.2", "3", "3.5", "4"],
    correctIndex: 0,
    explanation: "$x = \\frac{2(5) + 3(2)}{2 + 3} = \\frac{16}{5} = 3.2$।",
    difficulty: "easy"
  },
  {
    question: "एक रेखाखंड का मध्य बिंदु $(3, 4)$ है। यदि इसका एक सिरा $(7, 9)$ है, तो दूसरा सिरा क्या होगा?",
    options: ["$(-1, -1)$", "$(1, 1)$", "$(2, 2)$", "$(-2, -2)$"],
    correctIndex: 0,
    explanation: "$\\frac{x + 7}{2} = 3 \\implies x = -1$\n$\\frac{y + 9}{2} = 4 \\implies y = -1$।\nदूसरा सिरा $(-1, -1)$ है।",
    difficulty: "easy"
  },
  {
    question: "शीर्ष $(0, 0), (a, 0)$ और $(0, b)$ वाले त्रिभुज के केन्द्रक (Centroid) के निर्देशांक क्या होंगे?",
    options: ["$(\\frac{a}{3}, \\frac{b}{3})$", "$(\\frac{a}{2}, \\frac{b}{2})$", "$(a, b)$", "$(\\frac{a}{4}, \\frac{b}{4})$"],
    correctIndex: 0,
    explanation: "केन्द्रक $= \\left(\\frac{0+a+0}{3}, \\frac{0+0+b}{3}\\right) = \\left(\\frac{a}{3}, \\frac{b}{3}\\right)$।",
    difficulty: "easy"
  }
];

const cgSec03 = [
  {
    question: "यदि बिंदु $A(k+1, 2k), B(3k, 2k+3)$ और $C(5k-1, 5k)$ संरेखी हैं, तो $k$ का मान क्या होगा?",
    options: ["2 या $\\frac{1}{2}$", "1 या 3", "2 या -1", "0 या 4"],
    correctIndex: 0,
    explanation: "त्रिभुज का क्षेत्रफल शून्य रखने पर द्विघात समीकरण बनता है जिसके मूल $k = 2, 1/2$ प्राप्त होते हैं।",
    difficulty: "hard"
  },
  {
    question: "एक त्रिभुज के शीर्ष $(t, t-2), (t+2, t+2)$ और $(t+3, t)$ हैं। इस त्रिभुज का क्षेत्रफल $t$ से स्वतंत्र होकर कितना होगा?",
    options: ["4 वर्ग इकाई", "5 वर्ग इकाई", "6 वर्ग इकाई", "3 वर्ग इकाई"],
    correctIndex: 0,
    explanation: "$\\text{Area} = \\frac{1}{2} |t(t+2 - t) + (t+2)(t - (t-2)) + (t+3)(t-2 - (t+2))|$\n$= \\frac{1}{2} |2t + 2t + 4 - 4t - 12| = \\frac{1}{2} |-8| = 4$ वर्ग इकाई।",
    difficulty: "hard"
  },
  {
    question: "बिंदुओं $(3, 3)$ और $(6, -6)$ को मिलाने वाले रेखाखंड को $x$-अक्ष किस बिंदु पर काटता है?",
    options: ["$(4, 0)$", "$(5, 0)$", "$(4.5, 0)$", "$(3.5, 0)$"],
    correctIndex: 0,
    explanation: "$y = 0 \\implies 0 = \\frac{k(-6) + 3}{k + 1} \\implies 6k = 3 \\implies k = 1/2$\n$x = \\frac{(1/2)(6) + 3}{1/2 + 1} = \\frac{6}{3/2} = 4$। बिंदु $(4, 0)$ है।",
    difficulty: "moderate"
  },
  {
    question: "यदि बिंदु $P(x, y)$, बिंदुओं $A(a+b, b-a)$ और $B(a-b, a+b)$ से समदूरस्थ है, तो:",
    options: ["$bx = ay$", "$ax = by$", "$x + y = 0$", "$ax + by = 0$"],
    correctIndex: 0,
    explanation: "समदूरस्थता की शर्त हल करने पर $bx = ay$ प्राप्त होता है।",
    difficulty: "hard"
  },
  {
    question: "बिंदुओं $(1, 3)$ और $(2, 7)$ को मिलाने वाले रेखाखंड को $3 : 4$ के अनुपात में विभाजित करने वाले बिंदु के निर्देशांक क्या हैं?",
    options: ["$(\\frac{10}{7}, \\frac{33}{7})$", "$(1.5, 5)$", "$(\\frac{11}{7}, \\frac{31}{7})$", "$(\\frac{9}{7}, \\frac{30}{7})$"],
    correctIndex: 0,
    explanation: "$x = \\frac{3(2) + 4(1)}{7} = \\frac{10}{7}, y = \\frac{3(7) + 4(3)}{7} = \\frac{33}{7}$।",
    difficulty: "moderate"
  },
  {
    question: "बिंदु $(2, 5)$ और $(4, 7)$ को मिलाने वाले रेखाखंड का लंब समद्विभाजक (Perpendicular Bisector) किस बिंदु से अवश्य गुजरेगा?",
    options: ["$(3, 6)$", "$(2, 5)$", "$(4, 7)$", "$(0, 0)$"],
    correctIndex: 0,
    explanation: "लंब समद्विभाजक सदैव रेखाखंड के मध्य बिंदु से गुजरता है:\nमध्य बिंदु $= \\left(\\frac{2+4}{2}, \\frac{5+7}{2}\\right) = (3, 6)$।",
    difficulty: "easy"
  },
  {
    question: "एक चतुर्भुज के शीर्ष $(0, 0), (4, 0), (4, 3)$ और $(0, 3)$ हैं। इसका क्षेत्रफल क्या होगा?",
    options: ["12 वर्ग इकाई", "24 वर्ग इकाई", "7 वर्ग इकाई", "14 वर्ग इकाई"],
    correctIndex: 0,
    explanation: "यह एक आयत है जिसकी लंबाई 4 और चौड़ाई 3 है। क्षेत्रफल $= 4 \\times 3 = 12$ वर्ग इकाई।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(x, y)$, बिंदुओं $(3, 6)$ और $(-3, 4)$ से समदूरस्थ है। $x$ और $y$ में रैखिक समीकरण क्या होगा?",
    options: ["$3x + y = 5$", "$3x - y = 5$", "$x + 3y = 5$", "$3x + 2y = 7$"],
    correctIndex: 0,
    explanation: "$(x - 3)^2 + (y - 6)^2 = (x + 3)^2 + (y - 4)^2$\n$-6x - 12y + 45 = 6x - 8y + 25 \\implies 12x + 4y = 20 \\implies 3x + y = 5$।",
    difficulty: "moderate"
  },
  {
    question: "यदि बिंदु $A(0, 0), B(1, 2)$ और $C(3, y)$ संरेखी हैं, तो $y$ का मान क्या होगा?",
    options: ["6", "4", "5", "3"],
    correctIndex: 0,
    explanation: "ढाल: $\\frac{2 - 0}{1 - 0} = \\frac{y - 2}{3 - 1} \\implies 2 = \\frac{y - 2}{2} \\implies y - 2 = 4 \\implies y = 6$।",
    difficulty: "easy"
  },
  {
    question: "त्रिभुज के दो शीर्ष $(3, -5)$ और $(-7, 4)$ हैं तथा इसका केन्द्रक $(2, -1)$ है। तीसरे शीर्ष के निर्देशांक क्या होंगे?",
    options: ["$(10, -2)$", "$(8, -3)$", "$(6, -1)$", "$(9, -2)$"],
    correctIndex: 0,
    explanation: "$\\frac{3 - 7 + x_3}{3} = 2 \\implies -4 + x_3 = 6 \\implies x_3 = 10$\n$\\frac{-5 + 4 + y_3}{3} = -1 \\implies -1 + y_3 = -3 \\implies y_3 = -2$।\nतीसरा शीर्ष $(10, -2)$ है।",
    difficulty: "moderate"
  }
];

async function run() {
  console.log('Uploading Chapter 15: निर्देशांक ज्यामिति...');
  await saveDirectTest('निर्देशांक ज्यामिति की मूल बातें - Test 01', 'निर्देशांक ज्यामिति की मूल बातें', cgBasics01);
  await saveDirectTest('निर्देशांक ज्यामिति की मूल बातें - Test 02', 'निर्देशांक ज्यामिति की मूल बातें', cgBasics02);
  await saveDirectTest('निर्देशांक ज्यामिति की मूल बातें - Test 03', 'निर्देशांक ज्यामिति की मूल बातें', cgBasics03);

  await saveDirectTest('दूरी सूत्र - Test 01', 'दूरी सूत्र', cgDist01);
  await saveDirectTest('दूरी सूत्र - Test 02', 'दूरी सूत्र', cgDist02);
  await saveDirectTest('दूरी सूत्र - Test 03', 'दूरी सूत्र', cgDist03);

  await saveDirectTest('विभाजन सूत्र - Test 01', 'विभाजन सूत्र', cgSec01);
  await saveDirectTest('विभाजन सूत्र - Test 02', 'विभाजन सूत्र', cgSec02);
  await saveDirectTest('विभाजन सूत्र - Test 03', 'विभाजन सूत्र', cgSec03);

  console.log('Done uploading Ch15! Chapter 15 is complete!');
}

run().catch(err => {
  console.error('Error uploading:', err);
  process.exit(1);
});
