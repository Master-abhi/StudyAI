const { saveDirectTest } = require('./direct_uploader.js');

// Chapter 9: त्रिकोणमिति (Trigonometry)
// Topic 1: त्रिकोणमितीय अनुपात (Trigonometric Ratios)

const triRatio01 = [
  {
    question: "यदि $\\sin \\theta = \\frac{3}{5}$ हो, तो $\\cos \\theta$ और $\\tan \\theta$ का मान क्या होगा? (जहाँ $\\theta$ एक न्यून कोण है)",
    options: ["$\\cos \\theta = \\frac{4}{5}, \\tan \\theta = \\frac{3}{4}$", "$\\cos \\theta = \\frac{3}{4}, \\tan \\theta = \\frac{4}{5}$", "$\\cos \\theta = \\frac{4}{5}, \\tan \\theta = \\frac{4}{3}$", "$\\cos \\theta = \\frac{5}{4}, \\tan \\theta = \\frac{3}{5}$"],
    correctIndex: 0,
    explanation: "लंब $= 3$, कर्ण $= 5 \\implies$ आधार $= \\sqrt{5^2 - 3^2} = 4$\n$\\cos \\theta = \\frac{\\text{आधार}}{\\text{कर्ण}} = \\frac{4}{5}$, $\\tan \\theta = \\frac{\\text{लंब}}{\\text{आधार}} = \\frac{3}{4}$।",
    difficulty: "easy"
  },
  {
    question: "मान ज्ञात कीजिए: $\\sin 30^\\circ + \\cos 60^\\circ - \\tan 45^\\circ$",
    options: ["0", "1", "$\\frac{1}{2}$", "$\\sqrt{3}$"],
    correctIndex: 0,
    explanation: "$\\sin 30^\\circ = \\frac{1}{2}, \\cos 60^\\circ = \\frac{1}{2}, \\tan 45^\\circ = 1$\nमान $= \\frac{1}{2} + \\frac{1}{2} - 1 = 1 - 1 = 0$।",
    difficulty: "easy"
  },
  {
    question: "त्रिकोणमितीय सर्वसमिका $\\sin^2 \\theta + \\cos^2 \\theta$ का मान सदैव क्या होता है?",
    options: ["1", "0", "-1", "2"],
    correctIndex: 0,
    explanation: "मूलभूत त्रिकोणमितीय सर्वसमिका के अनुसार $\\sin^2 \\theta + \\cos^2 \\theta = 1$ होता है।",
    difficulty: "easy"
  },
  {
    question: "यदि $\\tan \\theta = 1$ हो, तो $\\theta$ का मान क्या होगा? ($0^\\circ \\le \\theta \\le 90^\\circ$)",
    options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "$\\tan 45^\\circ = 1$, अतः $\\theta = 45^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "मान ज्ञात कीजिए: $\\frac{\\sin 28^\\circ}{\\cos 62^\\circ}$",
    options: ["1", "0", "$\\sqrt{3}$", "$\\frac{1}{2}$"],
    correctIndex: 0,
    explanation: "$\\cos 62^\\circ = \\cos(90^\\circ - 28^\\circ) = \\sin 28^\\circ$\n$\\implies \\frac{\\sin 28^\\circ}{\\sin 28^\\circ} = 1$।",
    difficulty: "easy"
  },
  {
    question: "यदि $\\sec \\theta + \\tan \\theta = 2$ हो, तो $\\sec \\theta - \\tan \\theta$ का मान क्या होगा?",
    options: ["$\\frac{1}{2}$", "2", "-2", "$-\\frac{1}{2}$"],
    correctIndex: 0,
    explanation: "सर्वसमिका $\\sec^2 \\theta - \\tan^2 \\theta = 1 \\implies (\\sec \\theta + \\tan \\theta)(\\sec \\theta - \\tan \\theta) = 1$\n$\\implies 2(\\sec \\theta - \\tan \\theta) = 1 \\implies \\sec \\theta - \\tan \\theta = \\frac{1}{2}$।",
    difficulty: "moderate"
  },
  {
    question: "मान ज्ञात कीजिए: $\\tan 10^\\circ \\cdot \\tan 80^\\circ$",
    options: ["1", "0", "$\\sqrt{3}$", "$\\frac{1}{\\sqrt{3}}$"],
    correctIndex: 0,
    explanation: "$\\tan 80^\\circ = \\cot 10^\\circ$\n$\\tan 10^\\circ \\times \\cot 10^\\circ = 1$।",
    difficulty: "easy"
  },
  {
    question: "यदि $\\cos \\theta = \\frac{1}{2}$ हो, तो $2\\sec \\theta$ का मान क्या होगा?",
    options: ["4", "2", "1", "$\\frac{1}{4}$"],
    correctIndex: 0,
    explanation: "$\\sec \\theta = \\frac{1}{\\cos \\theta} = 2$\n$2\\sec \\theta = 2 \\times 2 = 4$।",
    difficulty: "easy"
  },
  {
    question: "मान ज्ञात कीजिए: $1 + \\tan^2 30^\\circ$",
    options: ["$\\frac{4}{3}$", "$\\frac{3}{4}$", "$\\frac{1}{3}$", "2"],
    correctIndex: 0,
    explanation: "$\\tan 30^\\circ = \\frac{1}{\\sqrt{3}} \\implies 1 + \\left(\\frac{1}{\\sqrt{3}}\\right)^2 = 1 + \\frac{1}{3} = \\frac{4}{3} = \\sec^2 30^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "यदि $5\\cot \\theta = 12$ हो, तो $\\text{cosec} \\theta$ का मान क्या होगा?",
    options: ["$\\frac{13}{5}$", "$\\frac{12}{13}$", "$\\frac{5}{13}$", "$\\frac{13}{12}$"],
    correctIndex: 0,
    explanation: "आधार $= 12$, लंब $= 5 \\implies$ कर्ण $= \\sqrt{12^2 + 5^2} = 13$\n$\\text{cosec} \\theta = \\frac{\\text{कर्ण}}{\\text{लंब}} = \\frac{13}{5}$।",
    difficulty: "moderate"
  }
];

const triRatio02 = [
  {
    question: "मान ज्ञात कीजिए: $\\frac{\\cos 0^\\circ + \\sin 90^\\circ + \\sqrt{2}\\sin 45^\\circ}{\\sin 30^\\circ + \\cos 60^\\circ}$",
    options: ["3", "2", "1", "4"],
    correctIndex: 0,
    explanation: "अंश: $1 + 1 + \\sqrt{2}(1/\\sqrt{2}) = 1 + 1 + 1 = 3$\nहर: $1/2 + 1/2 = 1$\nमान $= 3 / 1 = 3$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\sin \\theta + \\cos \\theta = \\sqrt{2}\\cos \\theta$ हो, तो $(\\cos \\theta - \\sin \\theta)$ का मान क्या होगा?",
    options: ["$\\sqrt{2}\\sin \\theta$", "$\\sqrt{2}\\cos \\theta$", "$2\\sin \\theta$", "0"],
    correctIndex: 0,
    explanation: "$\\sin \\theta = (\\sqrt{2} - 1)\\cos \\theta$\n$\\cos \\theta - \\sin \\theta = \\cos \\theta - (\\sqrt{2} - 1)\\cos \\theta = (2 - \\sqrt{2})\\cos \\theta = \\sqrt{2}(\\sqrt{2} - 1)\\cos \\theta = \\sqrt{2}\\sin \\theta$।",
    difficulty: "hard"
  },
  {
    question: "मान ज्ञात कीजिए: $\\cos 1^\\circ \\cdot \\cos 2^\\circ \\cdot \\cos 3^\\circ \\dots \\cos 179^\\circ$",
    options: ["0", "1", "-1", "$\\frac{1}{\\sqrt{2}}$"],
    correctIndex: 0,
    explanation: "इस गुणनफल में $\\cos 90^\\circ$ भी सम्मिलित है, और $\\cos 90^\\circ = 0$ होता है। अतः पूरे गुणनफल का मान 0 होगा।",
    difficulty: "easy"
  },
  {
    question: "व्यंजक $3\\sin \\theta + 4\\cos \\theta$ का अधिकतम मान (Maximum value) क्या होगा?",
    options: ["5", "7", "1", "25"],
    correctIndex: 0,
    explanation: "$a\\sin \\theta + b\\cos \\theta$ का अधिकतम मान $\\sqrt{a^2 + b^2} = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ होता है।",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\tan \\theta + \\cot \\theta = 2$ हो, तो $\\tan^5 \\theta + \\cot^5 \\theta$ का मान क्या होगा?",
    options: ["2", "1", "5", "32"],
    correctIndex: 0,
    explanation: "$\\tan \\theta + \\frac{1}{\\tan \\theta} = 2 \\implies \\tan \\theta = 1 \\implies \\cot \\theta = 1$\n$1^5 + 1^5 = 1 + 1 = 2$।",
    difficulty: "easy"
  },
  {
    question: "मान ज्ञात कीजिए: $\\frac{1}{1 + \\sin^2 \\theta} + \\frac{1}{1 + \\text{cosec}^2 \\theta}$",
    options: ["1", "2", "0", "$\\frac{1}{2}$"],
    correctIndex: 0,
    explanation: "$\\frac{1}{1 + \\text{cosec}^2 \\theta} = \\frac{1}{1 + 1/\\sin^2 \\theta} = \\frac{\\sin^2 \\theta}{\\sin^2 \\theta + 1}$\nजोड़ने पर: $\\frac{1 + \\sin^2 \\theta}{1 + \\sin^2 \\theta} = 1$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\sin \\theta - \\cos \\theta = 0$ हो, तो $\\sin^4 \\theta + \\cos^4 \\theta$ का मान क्या होगा?",
    options: ["$\\frac{1}{2}$", "1", "$\\frac{1}{4}$", "$\\frac{3}{4}$"],
    correctIndex: 0,
    explanation: "$\\sin \\theta = \\cos \\theta \\implies \\theta = 45^\\circ$\n$\\sin^4 45^\\circ + \\cos^4 45^\\circ = \\left(\\frac{1}{\\sqrt{2}}\\right)^4 + \\left(\\frac{1}{\\sqrt{2}}\\right)^4 = \\frac{1}{4} + \\frac{1}{4} = \\frac{2}{4} = \\frac{1}{2}$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\sec \\theta + \\tan \\theta = p$ हो, तो $\\sin \\theta$ का मान क्या होगा?",
    options: ["$\\frac{p^2 - 1}{p^2 + 1}$", "$\\frac{p^2 + 1}{p^2 - 1}$", "$\\frac{2p}{p^2 + 1}$", "$\\frac{p^2 - 1}{2p}$"],
    correctIndex: 0,
    explanation: "$\\sec \\theta + \\tan \\theta = p$, $\\sec \\theta - \\tan \\theta = 1/p$\n$\\sec \\theta = \\frac{p^2 + 1}{2p}$, $\\tan \\theta = \\frac{p^2 - 1}{2p}$\n$\\sin \\theta = \\frac{\\tan \\theta}{\\sec \\theta} = \\frac{p^2 - 1}{p^2 + 1}$।",
    difficulty: "hard"
  },
  {
    question: "मान ज्ञात कीजिए: $\\sin^2 5^\\circ + \\sin^2 10^\\circ + \\dots + \\sin^2 85^\\circ + \\sin^2 90^\\circ$",
    options: ["9.5", "9", "8.5", "10"],
    correctIndex: 0,
    explanation: "कुल पद $= 18$\n$\\sin^2 5^\\circ + \\sin^2 85^\\circ = 1$ (8 युग्म $= 8$)\n$\\sin^2 45^\\circ = (1/\\sqrt{2})^2 = 0.5$\n$\\sin^2 90^\\circ = 1$\nयोग $= 8 + 0.5 + 1 = 9.5$।",
    difficulty: "hard"
  },
  {
    question: "यदि $\\triangle ABC$ एक समकोण त्रिभुज है जहाँ $\\angle C = 90^\\circ$ है, तो $\\cos(A + B)$ का मान क्या होगा?",
    options: ["0", "1", "$\\frac{1}{2}$", "$\\frac{1}{\\sqrt{2}}$"],
    correctIndex: 0,
    explanation: "$A + B + C = 180^\\circ \\implies A + B = 180^\\circ - 90^\\circ = 90^\\circ$\n$\\cos(A + B) = \\cos 90^\\circ = 0$।",
    difficulty: "easy"
  }
];

const triRatio03 = [
  {
    question: "यदि $x = a\\cos \\theta + b\\sin \\theta$ और $y = a\\sin \\theta - b\\cos \\theta$ हो, तो $x^2 + y^2$ का मान क्या होगा?",
    options: ["$a^2 + b^2$", "$a^2 - b^2$", "$2ab$", "$a^2 b^2$"],
    correctIndex: 0,
    explanation: "दोनों पक्षों का वर्ग करके जोड़ने पर:\n$x^2 + y^2 = (a^2 \\cos^2 \\theta + b^2 \\sin^2 \\theta + 2ab\\sin\\theta\\cos\\theta) + (a^2 \\sin^2 \\theta + b^2 \\cos^2 \\theta - 2ab\\sin\\theta\\cos\\theta)$\n$= a^2(\\cos^2 \\theta + \\sin^2 \\theta) + b^2(\\sin^2 \\theta + \\cos^2 \\theta) = a^2 + b^2$।",
    difficulty: "moderate"
  },
  {
    question: "मान ज्ञात कीजिए: $\\sqrt{\\frac{1 + \\sin \\theta}{1 - \\sin \\theta}}$",
    options: ["$\\sec \\theta + \\tan \\theta$", "$\\sec \\theta - \\tan \\theta$", "$\\text{cosec} \\theta + \\cot \\theta$", "$\\cos \\theta + \\sin \\theta$"],
    correctIndex: 0,
    explanation: "परिमेयीकरण करने पर:\n$\\sqrt{\\frac{(1 + \\sin \\theta)^2}{1 - \\sin^2 \\theta}} = \\sqrt{\\frac{(1 + \\sin \\theta)^2}{\\cos^2 \\theta}} = \\frac{1 + \\sin \\theta}{\\cos \\theta} = \\sec \\theta + \\tan \\theta$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $2\\sin(3x) = \\sqrt{3}$ हो, तो $x$ का मान क्या होगा? ($0^\\circ < 3x < 90^\\circ$)",
    options: ["$20^\\circ$", "$30^\\circ$", "$15^\\circ$", "$45^\\circ$"],
    correctIndex: 0,
    explanation: "$\\sin(3x) = \\frac{\\sqrt{3}}{2} = \\sin 60^\\circ \\implies 3x = 60^\\circ \\implies x = 20^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "व्यंजक $4\\sin^2 \\theta + 9\\text{cosec}^2 \\theta$ का न्यूनतम मान (Minimum value) क्या होगा?",
    options: ["12", "13", "6", "25"],
    correctIndex: 0,
    explanation: "रूप $a\\sin^2 \\theta + b\\text{cosec}^2 \\theta$ का न्यूनतम मान $2\\sqrt{ab} = 2\\sqrt{4 \\times 9} = 2\\sqrt{36} = 2 \\times 6 = 12$ होता है।",
    difficulty: "hard"
  },
  {
    question: "यदि $\\tan \\theta = \\frac{a}{b}$ हो, तो $\\frac{a\\sin \\theta - b\\cos \\theta}{a\\sin \\theta + b\\cos \\theta}$ का मान क्या होगा?",
    options: ["$\\frac{a^2 - b^2}{a^2 + b^2}$", "$\\frac{a^2 + b^2}{a^2 - b^2}$", "$\\frac{a - b}{a + b}$", "$\\frac{2ab}{a^2 + b^2}$"],
    correctIndex: 0,
    explanation: "अंश और हर को $\\cos \\theta$ से भाग देने पर:\n$\\frac{a\\tan \\theta - b}{a\\tan \\theta + b} = \\frac{a(a/b) - b}{a(a/b) + b} = \\frac{a^2/b - b}{a^2/b + b} = \\frac{a^2 - b^2}{a^2 + b^2}$।",
    difficulty: "moderate"
  },
  {
    question: "मान ज्ञात कीजिए: $(\\sec A + \\tan A)(1 - \\sin A)$",
    options: ["$\\cos A$", "$\\sin A$", "$\\sec A$", "$\\text{cosec} A$"],
    correctIndex: 0,
    explanation: "$\\left(\\frac{1 + \\sin A}{\\cos A}\\right)(1 - \\sin A) = \\frac{1 - \\sin^2 A}{\\cos A} = \\frac{\\cos^2 A}{\\cos A} = \\cos A$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\sin \\theta + \\sin^2 \\theta = 1$ हो, तो $\\cos^2 \\theta + \\cos^4 \\theta$ का मान क्या होगा?",
    options: ["1", "0", "2", "-1"],
    correctIndex: 0,
    explanation: "$\\sin \\theta = 1 - \\sin^2 \\theta = \\cos^2 \\theta$\n$\\cos^2 \\theta + \\cos^4 \\theta = \\sin \\theta + \\sin^2 \\theta = 1$।",
    difficulty: "hard"
  },
  {
    question: "यदि $\\text{cosec} \\theta - \\cot \\theta = \\frac{1}{3}$ हो, तो $\\cos \\theta$ का मान क्या होगा?",
    options: ["$\\frac{4}{5}$", "$\\frac{3}{5}$", "$\\frac{5}{4}$", "$\\frac{1}{2}$"],
    correctIndex: 0,
    explanation: "$\\text{cosec} \\theta + \\cot \\theta = 3$\nजोड़ने पर: $2\\text{cosec} \\theta = \\frac{10}{3} \\implies \\text{cosec} \\theta = \\frac{5}{3} \\implies \\sin \\theta = \\frac{3}{5}$\n$\\cos \\theta = \\sqrt{1 - (3/5)^2} = \\frac{4}{5}$।",
    difficulty: "hard"
  },
  {
    question: "मान ज्ञात कीजिए: $\\frac{1 + \\cot^2 \\theta}{1 + \\tan^2 \\theta}$",
    options: ["$\\cot^2 \\theta$", "$\\tan^2 \\theta$", "$\\sec^2 \\theta$", "1"],
    correctIndex: 0,
    explanation: "$\\frac{\\text{cosec}^2 \\theta}{\\sec^2 \\theta} = \\frac{1/\\sin^2 \\theta}{1/\\cos^2 \\theta} = \\frac{\\cos^2 \\theta}{\\sin^2 \\theta} = \\cot^2 \\theta$।",
    difficulty: "easy"
  },
  {
    question: "यदि $\\theta$ एक न्यून कोण है और $7\\sin^2 \\theta + 3\\cos^2 \\theta = 4$ है, तो $\\tan \\theta$ का मान क्या होगा?",
    options: ["$\\frac{1}{\\sqrt{3}}$", "$\\sqrt{3}$", "1", "$\\frac{1}{2}$"],
    correctIndex: 0,
    explanation: "$4\\sin^2 \\theta + 3(\\sin^2 \\theta + \\cos^2 \\theta) = 4 \\implies 4\\sin^2 \\theta + 3(1) = 4$\n$\\implies 4\\sin^2 \\theta = 1 \\implies \\sin^2 \\theta = \\frac{1}{4} \\implies \\sin \\theta = \\frac{1}{2} \\implies \\theta = 30^\\circ$\n$\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}$।",
    difficulty: "moderate"
  }
];

// Topic 2: ऊँचाई एवं दूरी (Heights and Distances)

const height01 = [
  {
    question: "एक मीनार की ऊँचाई 30 मीटर है। मीनार के पाद से 30 मीटर की दूरी पर स्थित बिंदु से मीनार के शीर्ष का उन्नयन कोण क्या होगा?",
    options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "$\\tan \\theta = \\frac{\\text{ऊँचाई}}{\\text{दूरी}} = \\frac{30}{30} = 1 \\implies \\theta = 45^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "एक पतंग 75 मीटर की ऊँचाई पर उड़ रही है। यदि डोरी क्षैतिज से $60^\\circ$ का कोण बनाती है, तो डोरी की लंबाई क्या होगी?",
    options: ["$50\\sqrt{3}$ मीटर", "$75\\sqrt{3}$ मीटर", "150 मीटर", "100 मीटर"],
    correctIndex: 0,
    explanation: "$\\sin 60^\\circ = \\frac{\\text{लंब}}{\\text{कर्ण}} \\implies \\frac{\\sqrt{3}}{2} = \\frac{75}{L} \\implies L = \\frac{150}{\\sqrt{3}} = 50\\sqrt{3}$ मीटर।",
    difficulty: "easy"
  },
  {
    question: "एक सीढ़ी दीवार के सहारे टिकी है और क्षैतिज के साथ $60^\\circ$ का कोण बनाती है। यदि सीढ़ी का पाद दीवार से 5 मीटर की दूरी पर है, तो सीढ़ी की लंबाई क्या है?",
    options: ["10 मीटर", "$5\\sqrt{3}$ मीटर", "15 मीटर", "$10\\sqrt{3}$ मीटर"],
    correctIndex: 0,
    explanation: "$\\cos 60^\\circ = \\frac{\\text{आधार}}{\\text{कर्ण}} \\implies \\frac{1}{2} = \\frac{5}{L} \\implies L = 10$ मीटर।",
    difficulty: "easy"
  },
  {
    question: "सूर्य का उन्नयन कोण $30^\\circ$ होने पर एक खंभे की छाया की लंबाई उसकी ऊँचाई की कितनी गुनी होगी?",
    options: ["$\\sqrt{3}$ गुनी", "$\\frac{1}{\\sqrt{3}}$ गुनी", "2 गुनी", "1 गुनी"],
    correctIndex: 0,
    explanation: "$\\tan 30^\\circ = \\frac{h}{\\text{छाया}} \\implies \\frac{1}{\\sqrt{3}} = \\frac{h}{\\text{छाया}} \\implies \\text{छाया} = h\\sqrt{3}$।",
    difficulty: "easy"
  },
  {
    question: "एक प्रेक्षक की आँख से ऊपर स्थित वस्तु को देखने पर क्षैतिज रेखा और दृष्टि रेखा के बीच बना कोण क्या कहलाता है?",
    options: ["उन्नयन कोण (Angle of Elevation)", "अवनमन कोण (Angle of Depression)", "अधिक कोण", "पूरक कोण"],
    correctIndex: 0,
    explanation: "जब प्रेक्षक ऊपर की ओर स्थित किसी वस्तु को देखता है, तो क्षैतिज रेखा और दृष्टि रेखा के बीच बनने वाले कोण को उन्नयन कोण (Angle of Elevation) कहते हैं।",
    difficulty: "easy"
  },
  {
    question: "एक 10 मीटर ऊँचे खंभे की छाया की लंबाई $10\\sqrt{3}$ मीटर है। सूर्य का उन्नयन कोण क्या होगा?",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "$\\tan \\theta = \\frac{10}{10\\sqrt{3}} = \\frac{1}{\\sqrt{3}} \\implies \\theta = 30^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "एक मीनार के शीर्ष से जमीन पर स्थित एक कार का अवनमन कोण $30^\\circ$ है। कार से मीनार के शीर्ष का उन्नयन कोण क्या होगा?",
    options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "एकांतर कोण के नियम से अवनमन कोण और उन्नयन कोण का मान सदैव समान होता है। अतः उन्नयन कोण भी $30^\\circ$ होगा।",
    difficulty: "easy"
  },
  {
    question: "एक पेड़ आंधी से टूट जाता है और टूटा हुआ भाग इस प्रकार मुड़ता है कि पेड़ का शीर्ष जमीन को छूने लगता है तथा जमीन से $30^\\circ$ का कोण बनाता है। पेड़ के पाद बिंदु से उस बिंदु की दूरी जहाँ शीर्ष जमीन को छूता है, 8 मीटर है। पेड़ की कुल ऊँचाई ज्ञात कीजिए।",
    options: ["$8\\sqrt{3}$ मीटर", "$16\\sqrt{3}$ मीटर", "16 मीटर", "12 मीटर"],
    correctIndex: 0,
    explanation: "खड़ा भाग $h_1 = 8 \\times \\tan 30^\\circ = \\frac{8}{\\sqrt{3}}$\nमुड़ा हुआ भाग $h_2 = \\frac{8}{\\cos 30^\\circ} = \\frac{16}{\\sqrt{3}}$\nकुल ऊँचाई $= h_1 + h_2 = \\frac{24}{\\sqrt{3}} = 8\\sqrt{3}$ मीटर।",
    difficulty: "moderate"
  },
  {
    question: "एक 50 मीटर ऊँची इमारत के शीर्ष से एक वस्तु का अवनमन कोण $45^\\circ$ है। इमारत के आधार से वस्तु की दूरी क्या होगी?",
    options: ["50 मीटर", "$50\\sqrt{3}$ मीटर", "25 मीटर", "$25\\sqrt{3}$ मीटर"],
    correctIndex: 0,
    explanation: "$\\tan 45^\\circ = \\frac{50}{d} \\implies 1 = \\frac{50}{d} \\implies d = 50$ मीटर।",
    difficulty: "easy"
  },
  {
    question: "यदि किसी ऊर्ध्वाधर खंभे की ऊँचाई और उसकी छाया की लंबाई बराबर हों, तो सूर्य का उन्नयन कोण क्या होगा?",
    options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"],
    correctIndex: 0,
    explanation: "$\\tan \\theta = \\frac{h}{h} = 1 \\implies \\theta = 45^\\circ$।",
    difficulty: "easy"
  }
];

const height02 = [
  {
    question: "एक मीनार के आधार से $a$ और $b$ दूरी पर एक ही सीधी रेखा में स्थित दो बिंदुओं से मीनार के शीर्ष के उन्नयन कोण परस्पर पूरक (Complementary) हैं। मीनार की ऊँचाई क्या होगी?",
    options: ["$\\sqrt{ab}$", "$ab$", "$\\frac{a+b}{2}$", "$\\sqrt{\\frac{a}{b}}$"],
    correctIndex: 0,
    explanation: "माना ऊँचाई $h$ है। कोण $\\theta$ और $90^\\circ - \\theta$ हैं।\n$\\tan \\theta = h/a$ तथा $\\tan(90 - \\theta) = \\cot \\theta = h/b$\nगुणा करने पर: $\\tan \\theta \\cdot \\cot \\theta = \\frac{h^2}{ab} \\implies 1 = \\frac{h^2}{ab} \\implies h = \\sqrt{ab}$।",
    difficulty: "hard"
  },
  {
    question: "एक मीनार के आधार से 4 मीटर और 9 मीटर की दूरी पर स्थित दो बिंदुओं से मीनार के शीर्ष के उन्नयन कोण पूरक हैं। मीनार की ऊँचाई क्या है?",
    options: ["6 मीटर", "5 मीटर", "7 मीटर", "8 मीटर"],
    correctIndex: 0,
    explanation: "सूत्र $h = \\sqrt{ab} = \\sqrt{4 \\times 9} = \\sqrt{36} = 6$ मीटर।",
    difficulty: "moderate"
  },
  {
    question: "एक नदी के किनारे स्थित 15 मीटर ऊँचे पेड़ के शीर्ष का दूसरे किनारे से उन्नयन कोण $60^\\circ$ है। नदी की चौड़ाई क्या होगी?",
    options: ["$5\\sqrt{3}$ मीटर", "$15\\sqrt{3}$ मीटर", "5 मीटर", "10 मीटर"],
    correctIndex: 0,
    explanation: "$\\tan 60^\\circ = \\frac{15}{w} \\implies \\sqrt{3} = \\frac{15}{w} \\implies w = \\frac{15}{\\sqrt{3}} = 5\\sqrt{3}$ मीटर।",
    difficulty: "moderate"
  },
  {
    question: "एक लाइटहाउस के शीर्ष से समुद्र में दो जहाजों के अवनमन कोण $30^\\circ$ और $45^\\circ$ हैं। यदि लाइटहाउस की ऊँचाई 100 मीटर है और दोनों जहाज लाइटहाउस के एक ही ओर हैं, तो जहाजों के बीच की दूरी क्या होगी? ($\\sqrt{3} \\approx 1.732$)",
    options: ["73.2 मीटर", "173.2 मीटर", "100 मीटर", "50 मीटर"],
    correctIndex: 0,
    explanation: "पहले जहाज की दूरी $= 100 / \\tan 45^\\circ = 100$ मीटर।\nदूसरे जहाज की दूरी $= 100 / \\tan 30^\\circ = 100\\sqrt{3} = 173.2$ मीटर।\nदोनों के बीच की दूरी $= 173.2 - 100 = 73.2$ मीटर।",
    difficulty: "hard"
  },
  {
    question: "एक 1.5 मीटर लंबा प्रेक्षक एक 30 मीटर ऊँची चिमनी से 28.5 मीटर दूर खड़ा है। उसकी आँख से चिमनी के शीर्ष का उन्नयन कोण क्या होगा?",
    options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$0^\\circ$"],
    correctIndex: 0,
    explanation: "आँख से ऊपर चिमनी की ऊँचाई $= 30 - 1.5 = 28.5$ मीटर।\nदूरी $= 28.5$ मीटर।\n$\\tan \\theta = \\frac{28.5}{28.5} = 1 \\implies \\theta = 45^\\circ$।",
    difficulty: "moderate"
  },
  {
    question: "जमीन पर एक बिंदु $P$ से 10 मीटर ऊँचे भवन के शीर्ष का उन्नयन कोण $30^\\circ$ है। भवन के शीर्ष पर एक झंडा लगा है। बिंदु $P$ से झंडे के शीर्ष का उन्नयन कोण $45^\\circ$ है। झंडे के डंडे की लंबाई क्या होगी? ($\\sqrt{3} \\approx 1.732$)",
    options: ["7.32 मीटर", "10 मीटर", "5.32 मीटर", "8.66 मीटर"],
    correctIndex: 0,
    explanation: "भवन से बिंदु $P$ की दूरी $d = \\frac{10}{\\tan 30^\\circ} = 10\\sqrt{3}$ मीटर।\nकुल ऊँचाई $= d \\times \\tan 45^\\circ = 10\\sqrt{3} \\times 1 = 17.32$ मीटर।\nझंडे की लंबाई $= 17.32 - 10 = 7.32$ मीटर।",
    difficulty: "hard"
  },
  {
    question: "सड़क के दोनों ओर आमने-सामने दो समान ऊँचाई वाले खंभे 80 मीटर चौड़ी सड़क पर खड़े हैं। सड़क के बीच एक बिंदु से दोनों के शीर्षों के उन्नयन कोण क्रमशः $60^\\circ$ और $30^\\circ$ हैं। खंभों की ऊँचाई क्या होगी?",
    options: ["$20\\sqrt{3}$ मीटर", "$40\\sqrt{3}$ मीटर", "20 मीटर", "30 मीटर"],
    correctIndex: 0,
    explanation: "$x + y = 80$\n$h = x \\tan 60^\\circ = x\\sqrt{3} \\implies x = h/\\sqrt{3}$\n$h = y \\tan 30^\\circ = y/\\sqrt{3} \\implies y = h\\sqrt{3}$\n$\\frac{h}{\\sqrt{3}} + h\\sqrt{3} = 80 \\implies h\\left(\\frac{1+3}{\\sqrt{3}}\\right) = 80 \\implies \\frac{4h}{\\sqrt{3}} = 80 \\implies h = 20\\sqrt{3}$ मीटर।",
    difficulty: "hard"
  },
  {
    question: "सूर्य का उन्नयन कोण $45^\\circ$ से घटकर $30^\\circ$ होने पर एक मीनार की छाया में 40 मीटर की वृद्धि हो जाती है। मीनार की ऊँचाई क्या होगी? ($\\sqrt{3} \\approx 1.732$)",
    options: ["$\\approx 54.64$ मीटर", "40 मीटर", "60 मीटर", "50 मीटर"],
    correctIndex: 0,
    explanation: "$h(\\cot 30^\\circ - \\cot 45^\\circ) = 40$\n$h(\\sqrt{3} - 1) = 40 \\implies h = \\frac{40}{\\sqrt{3} - 1} = \\frac{40(\\sqrt{3} + 1)}{2} = 20(2.732) = 54.64$ मीटर।",
    difficulty: "hard"
  },
  {
    question: "एक झील की सतह से 60 मीटर की ऊँचाई पर स्थित बिंदु से एक बादल का उन्नयन कोण $30^\\circ$ है तथा झील में उसके प्रतिबिंब का अवनमन कोण $60^\\circ$ है। बादल की झील से ऊँचाई क्या होगी?",
    options: ["120 मीटर", "90 मीटर", "150 मीटर", "180 मीटर"],
    correctIndex: 0,
    explanation: "सूत्र: $H = h \\times \\frac{\\tan \\beta + \\tan \\alpha}{\\tan \\beta - \\tan \\alpha} = 60 \\times \\frac{\\tan 60^\\circ + \\tan 30^\\circ}{\\tan 60^\\circ - \\tan 30^\\circ}$\n$= 60 \\times \\frac{\\sqrt{3} + 1/\\sqrt{3}}{\\sqrt{3} - 1/\\sqrt{3}} = 60 \\times \\frac{4/\\sqrt{3}}{2/\\sqrt{3}} = 60 \\times 2 = 120$ मीटर।",
    difficulty: "hard"
  },
  {
    question: "एक पहाड़ी की चोटी से पूर्व की ओर स्थित दो क्रमागत किलोमीटर पत्थरों (1 किमी = 1000 मी की दूरी पर) के अवनमन कोण $30^\\circ$ और $45^\\circ$ हैं। पहाड़ी की ऊँचाई क्या होगी?",
    options: ["1.366 किमी", "1.732 किमी", "1 किमी", "2 किमी"],
    correctIndex: 0,
    explanation: "$h(\\cot 30^\\circ - \\cot 45^\\circ) = 1 \\implies h(\\sqrt{3} - 1) = 1$\n$h = \\frac{1}{\\sqrt{3} - 1} = \\frac{\\sqrt{3} + 1}{2} = \\frac{2.732}{2} = 1.366$ किमी।",
    difficulty: "hard"
  }
];

const height03 = [
  {
    question: "एक हवाई जहाज 3125 मीटर की ऊँचाई पर उड़ते हुए एक अन्य हवाई जहाज के ठीक ऊपर से गुजरता है। उस क्षण जमीन पर एक ही बिंदु से दोनों जहाजों के उन्नयन कोण क्रमशः $60^\\circ$ और $30^\\circ$ हैं। दोनों जहाजों के बीच की लंबवत दूरी क्या होगी?",
    options: ["$\\approx 2083.33$ मीटर", "1500 मीटर", "1000 मीटर", "2500 मीटर"],
    correctIndex: 0,
    explanation: "जमीन के बिंदु से दूरी $d = \\frac{3125}{\\tan 60^\\circ} = \\frac{3125}{\\sqrt{3}}$\nनिचले जहाज की ऊँचाई $h_2 = d \\times \\tan 30^\\circ = \\frac{3125}{\\sqrt{3}} \\times \\frac{1}{\\sqrt{3}} = \\frac{3125}{3} \\approx 1041.67$ मीटर।\nबीच की दूरी $= 3125 - 1041.67 = 2083.33$ मीटर (अर्थात $3125 \\times \\frac{2}{3}$)।",
    difficulty: "hard"
  },
  {
    question: "एक 7 मीटर ऊँचे भवन के शीर्ष से एक केबल टॉवर के शीर्ष का उन्नयन कोण $60^\\circ$ है और इसके पाद का अवनमन कोण $45^\\circ$ है। टॉवर की ऊँचाई क्या होगी?",
    options: ["$7(\\sqrt{3} + 1)$ मीटर", "$7\\sqrt{3}$ मीटर", "14 मीटर", "$14(\\sqrt{3} - 1)$ मीटर"],
    correctIndex: 0,
    explanation: "भवन और टॉवर के बीच की दूरी $= \\frac{7}{\\tan 45^\\circ} = 7$ मीटर।\nटॉवर का भवन से ऊपर का भाग $= 7 \\times \\tan 60^\\circ = 7\\sqrt{3}$ मीटर।\nटॉवर की कुल ऊँचाई $= 7 + 7\\sqrt{3} = 7(\\sqrt{3} + 1)$ मीटर।",
    difficulty: "moderate"
  },
  {
    question: "एक गुब्बारा जो जमीन से 88.2 मीटर की ऊँचाई पर क्षैतिज रेखा में उड़ रहा है, का एक बिंदु से उन्नयन कोण $60^\\circ$ से घटकर $30^\\circ$ हो जाता है। इस अंतराल में गुब्बारे द्वारा तय की गई दूरी क्या होगी?",
    options: ["$58.8\\sqrt{3}$ मीटर", "$88.2\\sqrt{3}$ मीटर", "88.2 मीटर", "100 मीटर"],
    correctIndex: 0,
    explanation: "दूरी $= 88.2(\\cot 30^\\circ - \\cot 60^\\circ) = 88.2\\left(\\sqrt{3} - \\frac{1}{\\sqrt{3}}\\right) = 88.2 \\times \\frac{2}{\\sqrt{3}} = \\frac{176.4}{\\sqrt{3}} = 58.8\\sqrt{3}$ मीटर।",
    difficulty: "hard"
  },
  {
    question: "मीनार के पाद से एक भवन के शीर्ष का उन्नयन कोण $30^\\circ$ है और भवन के पाद से मीनार के शीर्ष का उन्नयन कोण $60^\\circ$ है। यदि मीनार 50 मीटर ऊँची है, तो भवन की ऊँचाई क्या होगी?",
    options: ["$16\\frac{2}{3}$ मीटर", "25 मीटर", "15 मीटर", "$18\\frac{1}{3}$ मीटर"],
    correctIndex: 0,
    explanation: "मीनार और भवन के बीच की दूरी $d = \\frac{50}{\\tan 60^\\circ} = \\frac{50}{\\sqrt{3}}$ मीटर।\nभवन की ऊँचाई $h = d \\times \\tan 30^\\circ = \\frac{50}{\\sqrt{3}} \\times \\frac{1}{\\sqrt{3}} = \\frac{50}{3} = 16\\frac{2}{3}$ मीटर।",
    difficulty: "moderate"
  },
  {
    question: "एक व्यक्ति एक मीनार की ओर 50 मीटर चलने पर पाता है कि मीनार के शीर्ष का उन्नयन कोण $30^\\circ$ से बढ़कर $45^\\circ$ हो जाता है। मीनार की ऊँचाई ज्ञात कीजिए। ($\\sqrt{3} \\approx 1.732$)",
    options: ["68.3 मीटर", "50 मीटर", "75 मीटर", "60 मीटर"],
    correctIndex: 0,
    explanation: "दूरी $x = h(\\cot 30^\\circ - \\cot 45^\\circ) = 50$\n$h(\\sqrt{3} - 1) = 50 \\implies h = \\frac{50}{\\sqrt{3} - 1} = 25(\\sqrt{3} + 1) = 25(2.732) = 68.3$ मीटर।",
    difficulty: "hard"
  },
  {
    question: "भूमि पर एक बिंदु से मीनार के शीर्ष का उन्नयन कोण $45^\\circ$ है। मीनार की ओर $x$ मीटर जाने पर कोण $60^\\circ$ हो जाता है। यदि मीनार की ऊँचाई $h$ है, तो $x$ का मान क्या होगा?",
    options: ["$h\\left(1 - \\frac{1}{\\sqrt{3}}\\right)$", "$h(\\sqrt{3} - 1)$", "$h(\\sqrt{3} + 1)$", "$\\frac{h}{\\sqrt{3}}$"],
    correctIndex: 0,
    explanation: "$x = h(\\cot 45^\\circ - \\cot 60^\\circ) = h\\left(1 - \\frac{1}{\\sqrt{3}}\\right)$।",
    difficulty: "moderate"
  },
  {
    question: "एक नाव नदी के एक किनारे से दूसरे किनारे की ओर चल रही है। नदी के बीच से दोनों किनारों के शीर्षों के उन्नयन कोण समान हैं। यह क्या दर्शाता है?",
    options: ["दोनों किनारे समान ऊँचाई पर हैं", "एक किनारा दूसरे से दोगुना ऊँचा है", "नाव नदी के ठीक बीच में नहीं है", "कोई निष्कर्ष नहीं निकाला जा सकता"],
    correctIndex: 0,
    explanation: "चूँकि बीच बिंदु से दोनों किनारों की दूरी समान है ($d_1 = d_2$) तथा उन्नयन कोण भी समान हैं ($\\theta_1 = \\theta_2$), अतः $h_1 = d_1 \\tan \\theta_1 = d_2 \\tan \\theta_2 = h_2$, अर्थात दोनों किनारों की ऊँचाई समान है।",
    difficulty: "easy"
  },
  {
    question: "एक 10 मीटर लंबी सीढ़ी को दीवार पर इस प्रकार लगाया जाता है कि वह खिड़की तक पहुँचती है जो जमीन से 8 मीटर ऊपर है। दीवार के पाद से सीढ़ी के निचले सिरे की दूरी क्या होगी?",
    options: ["6 मीटर", "5 मीटर", "7 मीटर", "4 मीटर"],
    correctIndex: 0,
    explanation: "पाइथागोरस प्रमेय: दूरी $= \\sqrt{10^2 - 8^2} = \\sqrt{100 - 64} = \\sqrt{36} = 6$ मीटर।",
    difficulty: "easy"
  },
  {
    question: "एक व्यक्ति किसी मीनार से 100 मीटर की दूरी पर खड़ा होकर देखता है कि मीनार के शीर्ष का उन्नयन कोण $60^\\circ$ है। यदि व्यक्ति का कद नगण्य मान लिया जाए, तो मीनार की ऊँचाई क्या होगी? ($\\sqrt{3} \\approx 1.732$)",
    options: ["173.2 मीटर", "150 मीटर", "200 मीटर", "141.4 मीटर"],
    correctIndex: 0,
    explanation: "ऊँचाई $= 100 \\times \\tan 60^\\circ = 100\\sqrt{3} = 173.2$ मीटर।",
    difficulty: "easy"
  },
  {
    question: "एक खंभे के पाद से गुजरने वाली क्षैतिज रेखा पर स्थित दो बिंदुओं $A$ और $B$ से खंभे के शीर्ष के उन्नयन कोण क्रमशः $\\alpha$ और $\\beta$ हैं। यदि $A$ बिंदु $B$ की तुलना में खंभे के अधिक निकट है, तो कौन-सा संबंध सत्य है?",
    options: ["$\\alpha > \\beta$", "$\\alpha < \\beta$", "$\\alpha = \\beta$", "$\\alpha + \\beta = 90^\\circ$ सदैव"],
    correctIndex: 0,
    explanation: "जैसे-जैसे हम किसी ऊर्ध्वाधर वस्तु (खंभे) के पाद के निकट जाते हैं, उसका उन्नयन कोण बढ़ता जाता है। अतः $\\alpha > \\beta$।",
    difficulty: "easy"
  }
];

async function run() {
  console.log('Uploading Chapter 9: त्रिकोणमितीय अनुपात & ऊँचाई एवं दूरी...');
  await saveDirectTest('त्रिकोणमितीय अनुपात - Test 01', 'त्रिकोणमितीय अनुपात', triRatio01);
  await saveDirectTest('त्रिकोणमितीय अनुपात - Test 02', 'त्रिकोणमितीय अनुपात', triRatio02);
  await saveDirectTest('त्रिकोणमितीय अनुपात - Test 03', 'त्रिकोणमितीय अनुपात', triRatio03);

  await saveDirectTest('ऊँचाई एवं दूरी - Test 01', 'ऊँचाई एवं दूरी', height01);
  await saveDirectTest('ऊँचाई एवं दूरी - Test 02', 'ऊँचाई एवं दूरी', height02);
  await saveDirectTest('ऊँचाई एवं दूरी - Test 03', 'ऊँचाई एवं दूरी', height03);

  console.log('Done uploading Ch9! Chapter 9 is complete!');
}

run().catch(err => {
  console.error('Error uploading:', err);
  process.exit(1);
});
