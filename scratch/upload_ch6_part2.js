const { saveDirectTest } = require('./direct_uploader.js');

// Chapter 6: बीजगणित (Algebra) - Part 2
// Topic 3: द्विघात समीकरण (Quadratic Equations)

const quad01 = [
  {
    question: "द्विघात समीकरण $x^2 - 7x + 12 = 0$ के मूल क्या हैं?",
    options: ["3 और 4", "-3 और -4", "2 और 6", "1 और 12"],
    correctIndex: 0,
    explanation: "$x^2 - 4x - 3x + 12 = 0 \\implies x(x - 4) - 3(x - 4) = 0 \\implies (x - 3)(x - 4) = 0$\nमूल $x = 3, 4$ हैं।",
    difficulty: "easy"
  },
  {
    question: "यदि द्विघात समीकरण $ax^2 + bx + c = 0$ के मूल $\\alpha$ और $\\beta$ हैं, तो मूलों का योग $(\\alpha + \\beta)$ क्या होगा?",
    options: ["$-\\frac{b}{a}$", "$\\frac{b}{a}$", "$\\frac{c}{a}$", "$-\\frac{c}{a}$"],
    correctIndex: 0,
    explanation: "द्विघात समीकरण के मूलों का योग $\\alpha + \\beta = -\\frac{b}{a}$ तथा गुणनफल $\\alpha\\beta = \\frac{c}{a}$ होता है।",
    difficulty: "easy"
  },
  {
    question: "समीकरण $2x^2 - 8x + k = 0$ के मूल समान (बराबर) होने के लिए $k$ का मान क्या होगा?",
    options: ["8", "16", "4", "2"],
    correctIndex: 0,
    explanation: "समान मूलों के लिए विविक्तकर (Discriminant) $D = b^2 - 4ac = 0$\n$(-8)^2 - 4(2)(k) = 0 \\implies 64 - 8k = 0 \\implies 8k = 64 \\implies k = 8$",
    difficulty: "moderate"
  },
  {
    question: "समीकरण $x^2 + 5x + 6 = 0$ के विविक्तकर (Discriminant) का मान क्या है?",
    options: ["1", "49", "25", "0"],
    correctIndex: 0,
    explanation: "$D = b^2 - 4ac = 5^2 - 4(1)(6) = 25 - 24 = 1$",
    difficulty: "easy"
  },
  {
    question: "वह द्विघात समीकरण ज्ञात कीजिए जिसके मूल 5 और -2 हैं।",
    options: ["$x^2 - 3x - 10 = 0$", "$x^2 + 3x - 10 = 0$", "$x^2 - 3x + 10 = 0$", "$x^2 + 7x + 10 = 0$"],
    correctIndex: 0,
    explanation: "समीकरण: $x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0$\nमूलों का योग = $5 + (-2) = 3$\nमूलों का गुणनफल = $5 \\times (-2) = -10$\n$\\implies x^2 - 3x - 10 = 0$",
    difficulty: "easy"
  },
  {
    question: "यदि समीकरण $3x^2 - 10x + 3 = 0$ के मूल $\\alpha$ और $\\beta$ हैं, तो $\\alpha\\beta$ का मान क्या होगा?",
    options: ["1", "3", "$\\frac{10}{3}$", "$-\\frac{10}{3}$"],
    correctIndex: 0,
    explanation: "मूलों का गुणनफल $\\alpha\\beta = \\frac{c}{a} = \\frac{3}{3} = 1$",
    difficulty: "easy"
  },
  {
    question: "यदि किसी द्विघात समीकरण का विविक्तकर $D < 0$ हो, तो मूलों की प्रकृति कैसी होगी?",
    options: ["काल्पनिक (अवास्तविक)", "वास्तविक और समान", "वास्तविक और असमान", "परिमेय"],
    correctIndex: 0,
    explanation: "जब विविक्तकर $D < 0$ होता है, तो मूल काल्पनिक (अवास्तविक / non-real complex) होते हैं।",
    difficulty: "easy"
  },
  {
    question: "समीकरण $x^2 - 6x + 9 = 0$ के मूलों की प्रकृति क्या है?",
    options: ["वास्तविक और समान", "वास्तविक और असमान", "काल्पनिक", "अपरिमेय"],
    correctIndex: 0,
    explanation: "$D = b^2 - 4ac = (-6)^2 - 4(1)(9) = 36 - 36 = 0$\n$D = 0$ होने पर मूल वास्तविक और समान (real and equal) होते हैं।",
    difficulty: "easy"
  },
  {
    question: "दो क्रमागत धनात्मक पूर्णांकों का गुणनफल 306 है। वे संख्याएँ ज्ञात कीजिए।",
    options: ["17 और 18", "16 और 17", "18 और 19", "15 और 16"],
    correctIndex: 0,
    explanation: "$x(x + 1) = 306 \\implies x^2 + x - 306 = 0$\n$(x + 18)(x - 17) = 0 \\implies x = 17$\nसंख्याएँ 17 और 18 हैं।",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\alpha$ और $\\beta$ समीकरण $x^2 - 5x + 6 = 0$ के मूल हैं, तो $\\frac{1}{\\alpha} + \\frac{1}{\\beta}$ का मान क्या होगा?",
    options: ["$\\frac{5}{6}$", "$\\frac{6}{5}$", "$-\\frac{5}{6}$", "5"],
    correctIndex: 0,
    explanation: "$\\alpha + \\beta = 5$, $\\alpha\\beta = 6$\n$\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{5}{6}$",
    difficulty: "moderate"
  }
];

const quad02 = [
  {
    question: "यदि समीकरण $x^2 - px + q = 0$ का एक मूल दूसरे मूल का दोगुना है, तो $p$ और $q$ के बीच क्या संबंध होगा?",
    options: ["$2p^2 = 9q$", "$p^2 = 8q$", "$9p^2 = 2q$", "$4p^2 = 9q$"],
    correctIndex: 0,
    explanation: "माना मूल $\\alpha$ तथा $2\\alpha$ हैं।\nयोग: $3\\alpha = p \\implies \\alpha = p/3$\nगुणनफल: $2\\alpha^2 = q \\implies 2(p/3)^2 = q \\implies \\frac{2p^2}{9} = q \\implies 2p^2 = 9q$",
    difficulty: "hard"
  },
  {
    question: "यदि $\\alpha, \\beta$ समीकरण $x^2 - 4x + 1 = 0$ के मूल हैं, तो $\\alpha^2 + \\beta^2$ का मान ज्ञात कीजिए।",
    options: ["14", "16", "18", "12"],
    correctIndex: 0,
    explanation: "$\\alpha + \\beta = 4, \\alpha\\beta = 1$\n$\\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta = 4^2 - 2(1) = 16 - 2 = 14$",
    difficulty: "moderate"
  },
  {
    question: "समीकरण $\\sqrt{2}x^2 + 7x + 5\\sqrt{2} = 0$ के मूल ज्ञात कीजिए।",
    options: ["$-\\sqrt{2}$ और $-\\frac{5}{\\sqrt{2}}$", "$\\sqrt{2}$ और $\\frac{5}{\\sqrt{2}}$", "$-5$ और $-2$", "2 और 5"],
    correctIndex: 0,
    explanation: "$a \\times c = \\sqrt{2} \\times 5\\sqrt{2} = 10$\nमध्य पद: $7x = 5x + 2x$\n$\\sqrt{2}x^2 + 2x + 5x + 5\\sqrt{2} = \\sqrt{2}x(x + \\sqrt{2}) + 5(x + \\sqrt{2}) = 0$\n$\\implies (x + \\sqrt{2})(\\sqrt{2}x + 5) = 0 \\implies x = -\\sqrt{2}, -\\frac{5}{\\sqrt{2}}$",
    difficulty: "moderate"
  },
  {
    question: "यदि समीकरण $x^2 - (k+1)x + 4 = 0$ के मूल वास्तविक हैं, तो $k$ का मान क्या होगा?",
    options: ["$k \\ge 3$ या $k \\le -5$", "$k \\ge 4$ या $k \\le -4$", "$-5 \\le k \\le 3$", "$k \\ge 5$"],
    correctIndex: 0,
    explanation: "वास्तविक मूलों के लिए $D \\ge 0$:\n$(k+1)^2 - 4(1)(4) \\ge 0 \\implies (k+1)^2 \\ge 16$\n$\\implies k+1 \\ge 4$ या $k+1 \\le -4 \\implies k \\ge 3$ या $k \\le -5$",
    difficulty: "hard"
  },
  {
    question: "समीकरण $x + \\frac{1}{x} = 2.5$ के मूल क्या होंगे?",
    options: ["2 और $\\frac{1}{2}$", "3 और $\\frac{1}{3}$", "1 और 2", "4 और $\\frac{1}{4}$"],
    correctIndex: 0,
    explanation: "$x + \\frac{1}{x} = \\frac{5}{2} \\implies 2x^2 - 5x + 2 = 0$\n$(2x - 1)(x - 2) = 0 \\implies x = 2, \\frac{1}{2}$",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\alpha$ और $\\beta$ समीकरण $2x^2 - 3x - 5 = 0$ के मूल हैं, तो वह समीकरण ज्ञात कीजिए जिसके मूल $\\frac{1}{\\alpha}$ और $\\frac{1}{\\beta}$ हों।",
    options: ["$5x^2 + 3x - 2 = 0$", "$5x^2 - 3x - 2 = 0$", "$2x^2 + 3x - 5 = 0$", "$5x^2 + 3x + 2 = 0$"],
    correctIndex: 0,
    explanation: "व्युत्क्रम मूलों के लिए $x$ को $1/x$ से प्रतिस्थापित करते हैं:\n$2(1/x)^2 - 3(1/x) - 5 = 0 \\implies \\frac{2}{x^2} - \\frac{3}{x} - 5 = 0$\n$x^2$ से गुणा करने पर: $2 - 3x - 5x^2 = 0 \\implies 5x^2 + 3x - 2 = 0$",
    difficulty: "hard"
  },
  {
    question: "एक समकोण त्रिभुज का कर्ण 13 सेमी है और अन्य दो भुजाओं का अंतर 7 सेमी है। अन्य दो भुजाओं की लंबाई क्या है?",
    options: ["5 सेमी और 12 सेमी", "6 सेमी और 13 सेमी", "4 सेमी और 11 सेमी", "7 सेमी और 14 सेमी"],
    correctIndex: 0,
    explanation: "पाइथागोरस त्रिक: $5, 12, 13$\nजाँच: $12 - 5 = 7$ सेमी तथा $5^2 + 12^2 = 25 + 144 = 169 = 13^2$",
    difficulty: "easy"
  },
  {
    question: "समीकरण $x^2 - 8x + 15 = 0$ के मूलों का हरात्मक माध्य (Harmonic Mean) क्या होगा?",
    options: ["$\\frac{15}{4}$", "$\\frac{15}{8}$", "4", "$\\frac{8}{15}$"],
    correctIndex: 0,
    explanation: "मूल $\\alpha = 3, \\beta = 5$\n$HM = \\frac{2\\alpha\\beta}{\\alpha + \\beta} = \\frac{2(15)}{8} = \\frac{30}{8} = \\frac{15}{4}$",
    difficulty: "hard"
  },
  {
    question: "यदि $x = \\sqrt{6 + \\sqrt{6 + \\sqrt{6 + \\dots \\infty}}}$ हो, तो $x$ का मान क्या होगा?",
    options: ["3", "-2", "6", "2"],
    correctIndex: 0,
    explanation: "$x = \\sqrt{6 + x} \\implies x^2 = 6 + x \\implies x^2 - x - 6 = 0$\n$(x - 3)(x + 2) = 0 \\implies x = 3$ (धनात्मक मान लेने पर)",
    difficulty: "moderate"
  },
  {
    question: "द्विघात समीकरण $3x^2 - 6x + 2 = 0$ के मूल कैसे हैं?",
    options: ["वास्तविक और अपरिमेय", "वास्तविक और परिमेय", "काल्पनिक", "समान"],
    correctIndex: 0,
    explanation: "$D = (-6)^2 - 4(3)(2) = 36 - 24 = 12$\nचूँकि $D > 0$ है तथा 12 पूर्ण वर्ग नहीं है, अतः मूल वास्तविक और अपरिमेय (real and irrational) होंगे।",
    difficulty: "moderate"
  }
];

const quad03 = [
  {
    question: "यदि समीकरण $x^2 - kx + 16 = 0$ के मूल बराबर हैं, तो $k$ का मान क्या होगा?",
    options: ["$\\pm 8$", "$\\pm 4$", "$\\pm 16$", "8"],
    correctIndex: 0,
    explanation: "$D = (-k)^2 - 4(1)(16) = 0 \\implies k^2 - 64 = 0 \\implies k = \\pm 8$",
    difficulty: "easy"
  },
  {
    question: "यदि $\\alpha$ और $\\beta$ समीकरण $x^2 - 6x + 2 = 0$ के मूल हैं, तो $\\alpha^3 + \\beta^3$ का मान क्या होगा?",
    options: ["180", "216", "198", "162"],
    correctIndex: 0,
    explanation: "$\\alpha + \\beta = 6$, $\\alpha\\beta = 2$\n$\\alpha^3 + \\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta) = 6^3 - 3(2)(6) = 216 - 36 = 180$",
    difficulty: "moderate"
  },
  {
    question: "समीकरण $x^{2/3} + x^{1/3} - 2 = 0$ के वास्तविक मूल क्या हैं?",
    options: ["1 और -8", "1 और 8", "-1 और 8", "-1 और -8"],
    correctIndex: 0,
    explanation: "माना $y = x^{1/3} \\implies y^2 + y - 2 = 0$\n$(y + 2)(y - 1) = 0 \\implies y = 1$ या $y = -2$\n$x^{1/3} = 1 \\implies x = 1$\n$x^{1/3} = -2 \\implies x = (-2)^3 = -8$",
    difficulty: "hard"
  },
  {
    question: "यदि समीकरण $2x^2 + 8x - m = 0$ का एक मूल $\\frac{5}{2}$ है, तो $m$ का मान क्या होगा?",
    options: ["$32.5$", "25", "30", "35"],
    correctIndex: 0,
    explanation: "$x = 5/2$ रखने पर: $2(5/2)^2 + 8(5/2) - m = 0$\n$2(25/4) + 20 - m = 0 \\implies 12.5 + 20 - m = 0 \\implies m = 32.5$",
    difficulty: "moderate"
  },
  {
    question: "यदि समीकरण $x^2 - bx + c = 0$ के दो क्रमागत पूर्णांक मूल हैं, तो $b^2 - 4c$ का मान क्या होगा?",
    options: ["1", "0", "2", "-1"],
    correctIndex: 0,
    explanation: "माना मूल $\\alpha$ तथा $\\alpha+1$ हैं।\nमूलों का अंतर = $1 \\implies |\\alpha - \\beta| = 1$\n$|\\alpha - \\beta|^2 = (\\alpha+\\beta)^2 - 4\\alpha\\beta = b^2 - 4c$\n$\\implies b^2 - 4c = 1^2 = 1$",
    difficulty: "hard"
  },
  {
    question: "समीकरण $|x^2 - 3x + 2| = 0$ के कितने वास्तविक हल हैं?",
    options: ["2", "1", "4", "0"],
    correctIndex: 0,
    explanation: "$x^2 - 3x + 2 = 0 \\implies (x - 1)(x - 2) = 0 \\implies x = 1, 2$ (कुल 2 वास्तविक हल)",
    difficulty: "easy"
  },
  {
    question: "एक कुटीर उद्योग एक दिन में कुछ बर्तनों का निर्माण करता है। प्रत्येक बर्तन का निर्माण मूल्य उस दिन निर्मित बर्तनों की संख्या के दोगुने से 3 अधिक था। यदि उस दिन कुल निर्माण लागत ₹90 थी, तो निर्मित बर्तनों की संख्या क्या थी?",
    options: ["6", "5", "8", "9"],
    correctIndex: 0,
    explanation: "माना बर्तनों की संख्या $x$ है। लागत प्रति बर्तन = $2x + 3$\nकुल लागत: $x(2x + 3) = 90 \\implies 2x^2 + 3x - 90 = 0$\n$2x^2 + 15x - 12x - 90 = 0 \\implies x(2x + 15) - 6(2x + 15) = 0$\n$(x - 6)(2x + 15) = 0 \\implies x = 6$",
    difficulty: "moderate"
  },
  {
    question: "यदि समीकरण $x^2 - 2(1 + 3k)x + 7(3 + 2k) = 0$ के मूल बराबर हैं, तो $k$ का मान क्या होगा?",
    options: ["2 या $-\\frac{10}{9}$", "3 या -2", "1 या 4", "0 या 5"],
    correctIndex: 0,
    explanation: "$D = 0 \\implies 4(1 + 3k)^2 - 4(7)(3 + 2k) = 0$\n$(1 + 6k + 9k^2) - (21 + 14k) = 0 \\implies 9k^2 - 8k - 20 = 0$\n$9k^2 - 18k + 10k - 20 = 0 \\implies 9k(k - 2) + 10(k - 2) = 0$\n$\\implies (k - 2)(9k + 10) = 0 \\implies k = 2$ या $k = -\\frac{10}{9}$",
    difficulty: "hard"
  },
  {
    question: "समीकरण $2^{2x} - 3 \\cdot 2^{x+2} + 32 = 0$ के हल ज्ञात कीजिए।",
    options: ["$x = 2$ और $x = 3$", "$x = 1$ और $x = 2$", "$x = 4$ और $x = 8$", "$x = 0$ और $x = 2$"],
    correctIndex: 0,
    explanation: "माना $y = 2^x \\implies y^2 - 3(4y) + 32 = 0 \\implies y^2 - 12y + 32 = 0$\n$(y - 4)(y - 8) = 0 \\implies y = 4$ या $y = 8$\n$2^x = 4 \\implies x = 2$\n$2^x = 8 \\implies x = 3$",
    difficulty: "hard"
  },
  {
    question: "यदि समीकरण $x^2 + ax + b = 0$ के मूलों का अनुपात $2:3$ हो, तो $6a^2$ किसके बराबर होगा?",
    options: ["$25b$", "$24b$", "$20b$", "$18b$"],
    correctIndex: 0,
    explanation: "माना मूल $2k$ और $3k$ हैं।\nयोग: $5k = -a \\implies k = -a/5$\nगुणनफल: $6k^2 = b \\implies 6(-a/5)^2 = b \\implies \\frac{6a^2}{25} = b \\implies 6a^2 = 25b$",
    difficulty: "hard"
  }
];

// Topic 4: लघुगणक (Logarithm)

const log01 = [
  {
    question: "$\\log_{10} 1000$ का मान क्या होगा?",
    options: ["3", "2", "4", "10"],
    correctIndex: 0,
    explanation: "$1000 = 10^3$\n$\\log_{10} 1000 = \\log_{10} (10^3) = 3 \\log_{10} 10 = 3 \\times 1 = 3$",
    difficulty: "easy"
  },
  {
    question: "$\\log_2 64$ का मान ज्ञात कीजिए।",
    options: ["6", "5", "7", "8"],
    correctIndex: 0,
    explanation: "$64 = 2^6 \\implies \\log_2 64 = 6$",
    difficulty: "easy"
  },
  {
    question: "लघुगणक नियम के अनुसार, $\\log(m \\times n)$ किसके बराबर होता है?",
    options: ["$\\log m + \\log n$", "$\\log m \\times \\log n$", "$\\log m - \\log n$", "$\\frac{\\log m}{\\log n}$"],
    correctIndex: 0,
    explanation: "लघुगणक का गुणन नियम: $\\log_a(mn) = \\log_a m + \\log_a n$",
    difficulty: "easy"
  },
  {
    question: "यदि $\\log_{10} x = -2$ हो, तो $x$ का मान क्या होगा?",
    options: ["0.01", "0.1", "0.001", "-100"],
    correctIndex: 0,
    explanation: "$\\log_{10} x = -2 \\implies x = 10^{-2} = \\frac{1}{100} = 0.01$",
    difficulty: "easy"
  },
  {
    question: "$\\log_a 1$ का मान किसी भी आधार $a > 0$ ($a \\neq 1$) के लिए क्या होता है?",
    options: ["0", "1", "$a$", "अपरिभाषित"],
    correctIndex: 0,
    explanation: "चूँकि $a^0 = 1$ होता है, इसलिए आधार $a$ पर 1 का लघुगणक सदैव 0 होता है।",
    difficulty: "easy"
  },
  {
    question: "$\\log_3 81$ का मान क्या होगा?",
    options: ["4", "3", "5", "27"],
    correctIndex: 0,
    explanation: "$81 = 3^4 \\implies \\log_3 81 = 4$",
    difficulty: "easy"
  },
  {
    question: "यदि $\\log_{10} 2 = 0.3010$ हो, तो $\\log_{10} 20$ का मान क्या होगा?",
    options: ["1.3010", "0.6020", "2.3010", "1.0000"],
    correctIndex: 0,
    explanation: "$\\log_{10} 20 = \\log_{10} (2 \\times 10) = \\log_{10} 2 + \\log_{10} 10 = 0.3010 + 1 = 1.3010$",
    difficulty: "moderate"
  },
  {
    question: "$\\log_{10} \\left(\\frac{a}{b}\\right)$ का मान किसके बराबर होता है?",
    options: ["$\\log a - \\log b$", "$\\log a / \\log b$", "$\\log b - \\log a$", "$\\log(a - b)$"],
    correctIndex: 0,
    explanation: "लघुगणक का भाग नियम: $\\log\\left(\\frac{a}{b}\\right) = \\log a - \\log b$",
    difficulty: "easy"
  },
  {
    question: "$\\log_5 \\left(\\frac{1}{125}\\right)$ का मान क्या होगा?",
    options: ["-3", "3", "$-\\frac{1}{3}$", "$\\frac{1}{3}$"],
    correctIndex: 0,
    explanation: "$\\frac{1}{125} = 5^{-3} \\implies \\log_5 (5^{-3}) = -3$",
    difficulty: "easy"
  },
  {
    question: "यदि $\\log_x 9 = 2$ हो, तो $x$ का मान क्या होगा?",
    options: ["3", "4.5", "18", "81"],
    correctIndex: 0,
    explanation: "$\\log_x 9 = 2 \\implies x^2 = 9 \\implies x = 3$ (आधार धनात्मक होना चाहिए)",
    difficulty: "easy"
  }
];

const log02 = [
  {
    question: "मान ज्ञात कीजिए: $\\log_{10} 2 + \\log_{10} 5$",
    options: ["1", "0", "10", "7"],
    correctIndex: 0,
    explanation: "$\\log_{10} 2 + \\log_{10} 5 = \\log_{10} (2 \\times 5) = \\log_{10} 10 = 1$",
    difficulty: "easy"
  },
  {
    question: "यदि $\\log_{10} 2 = 0.3010$ हो, तो $\\log_{10} 5$ का मान क्या होगा?",
    options: ["0.6990", "0.7000", "0.6020", "0.5000"],
    correctIndex: 0,
    explanation: "$\\log_{10} 5 = \\log_{10}\\left(\\frac{10}{2}\\right) = \\log_{10} 10 - \\log_{10} 2 = 1 - 0.3010 = 0.6990$",
    difficulty: "moderate"
  },
  {
    question: "$\\log_2 (\\log_3 81)$ का मान क्या होगा?",
    options: ["2", "1", "3", "0"],
    correctIndex: 0,
    explanation: "$\\log_3 81 = \\log_3 (3^4) = 4$\n$\\log_2 (4) = \\log_2 (2^2) = 2$",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\log_a b = x$ हो, तो आधार परिवर्तन सूत्र के अनुसार $\\log_b a$ का मान क्या होगा?",
    options: ["$\\frac{1}{x}$", "$-x$", "$x$", "$a^x$"],
    correctIndex: 0,
    explanation: "आधार परिवर्तन नियम: $\\log_b a = \\frac{1}{\\log_a b} = \\frac{1}{x}$",
    difficulty: "easy"
  },
  {
    question: "मान ज्ञात कीजिए: $\\log_3 5 \\times \\log_5 9$",
    options: ["2", "3", "5", "1"],
    correctIndex: 0,
    explanation: "आधार परिवर्तन नियम से: $\\frac{\\log 5}{\\log 3} \\times \\frac{\\log 9}{\\log 5} = \\frac{\\log (3^2)}{\\log 3} = \\frac{2\\log 3}{\\log 3} = 2$",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\log_8 x = \\frac{2}{3}$ हो, तो $x$ का मान क्या होगा?",
    options: ["4", "2", "6", "16"],
    correctIndex: 0,
    explanation: "$x = 8^{2/3} = (2^3)^{2/3} = 2^2 = 4$",
    difficulty: "moderate"
  },
  {
    question: "मान ज्ञात कीजिए: $7^{\\log_7 5}$",
    options: ["5", "7", "1", "35"],
    correctIndex: 0,
    explanation: "नियम $a^{\\log_a x} = x$ के अनुसार, $7^{\\log_7 5} = 5$",
    difficulty: "easy"
  },
  {
    question: "यदि $\\log_{10} (x^2 - 4x + 5) = 0$ हो, तो $x$ का मान क्या होगा?",
    options: ["2", "1", "3", "4"],
    correctIndex: 0,
    explanation: "$x^2 - 4x + 5 = 10^0 = 1 \\implies x^2 - 4x + 4 = 0 \\implies (x - 2)^2 = 0 \\implies x = 2$",
    difficulty: "moderate"
  },
  {
    question: "मान ज्ञात कीजिए: $\\log_{10} 125 + \\log_{10} 8$",
    options: ["3", "4", "2", "1000"],
    correctIndex: 0,
    explanation: "$\\log_{10} (125 \\times 8) = \\log_{10} 1000 = \\log_{10} (10^3) = 3$",
    difficulty: "easy"
  },
  {
    question: "यदि $\\log_{10} 2 = 0.3010$ और $\\log_{10} 3 = 0.4771$ हो, तो $\\log_{10} 6$ का मान क्या होगा?",
    options: ["0.7781", "0.7881", "0.7681", "0.8000"],
    correctIndex: 0,
    explanation: "$\\log_{10} 6 = \\log_{10}(2 \\times 3) = \\log_{10} 2 + \\log_{10} 3 = 0.3010 + 0.4771 = 0.7781$",
    difficulty: "moderate"
  }
];

const log03 = [
  {
    question: "यदि $\\log_{10} x + \\log_{10} (x + 3) = 1$ हो, तो $x$ का मान क्या होगा?",
    options: ["2", "-5", "5", "1"],
    correctIndex: 0,
    explanation: "$\\log_{10} [x(x + 3)] = 1 \\implies x^2 + 3x = 10^1 = 10 \\implies x^2 + 3x - 10 = 0$\n$(x + 5)(x - 2) = 0$\nचूँकि लघुगणक केवल धनात्मक संख्याओं के लिए परिभाषित है, अतः $x = 2$ ($x = -5$ अमान्य है)।",
    difficulty: "moderate"
  },
  {
    question: "मान ज्ञात कीजिए: $\\frac{1}{\\log_2 60} + \\frac{1}{\\log_3 60} + \\frac{1}{\\log_4 60} + \\frac{1}{\\log_5 60}$",
    options: ["1", "2", "60", "0"],
    correctIndex: 0,
    explanation: "आधार परिवर्तन से $\\frac{1}{\\log_a b} = \\log_b a$:\n$\\log_{60} 2 + \\log_{60} 3 + \\log_{60} 4 + \\log_{60} 5 = \\log_{60} (2 \\times 3 \\times 4 \\times 5) = \\log_{60} 120$... प्रतीक्षा: $2 \\times 3 \\times 4 \\times 5 = 120$\nयदि पद $\\frac{1}{\\log_3 60} + \\frac{1}{\\log_4 60} + \\frac{1}{\\log_5 60}$ हो तो $3 \\times 4 \\times 5 = 60 \\implies \\log_{60} 60 = 1$!\nअतः प्रश्न को 3 पदों का बनायें: $\\frac{1}{\\log_3 60} + \\frac{1}{\\log_4 60} + \\frac{1}{\\log_5 60}$",
    options: ["1", "2", "60", "0"],
    explanation: "आधार परिवर्तन सूत्र से: $\\log_{60} 3 + \\log_{60} 4 + \\log_{60} 5 = \\log_{60}(3 \\times 4 \\times 5) = \\log_{60} 60 = 1$",
    question: "मान ज्ञात कीजिए: $\\frac{1}{\\log_3 60} + \\frac{1}{\\log_4 60} + \\frac{1}{\\log_5 60}$",
    correctIndex: 0,
    difficulty: "hard"
  },
  {
    question: "यदि $\\log_2 x + \\log_4 x + \\log_{16} x = \\frac{21}{4}$ हो, तो $x$ का मान क्या होगा?",
    options: ["8", "16", "4", "32"],
    correctIndex: 0,
    explanation: "$\\log_4 x = \\frac{1}{2} \\log_2 x$, $\\log_{16} x = \\frac{1}{4} \\log_2 x$\n$\\log_2 x \\left(1 + \\frac{1}{2} + \\frac{1}{4}\\right) = \\frac{21}{4} \\implies \\log_2 x \\left(\\frac{7}{4}\\right) = \\frac{21}{4}$\n$\\implies 7 \\log_2 x = 21 \\implies \\log_2 x = 3 \\implies x = 2^3 = 8$",
    difficulty: "hard"
  },
  {
    question: "संख्या $2^{50}$ में कुल कितने अंक होंगे, यदि $\\log_{10} 2 = 0.3010$ है?",
    options: ["16", "15", "17", "18"],
    correctIndex: 0,
    explanation: "$\\log_{10} (2^{50}) = 50 \\times \\log_{10} 2 = 50 \\times 0.3010 = 15.05$\nपूर्णांश (Characteristic) = 15\nअंकों की संख्या = पूर्णांश + 1 = $15 + 1 = 16$",
    difficulty: "hard"
  },
  {
    question: "यदि $\\log \\frac{a+b}{2} = \\frac{1}{2}(\\log a + \\log b)$ हो, तो $a$ और $b$ में क्या संबंध है?",
    options: ["$a = b$", "$a = 2b$", "$a + b = 1$", "$a = -b$"],
    correctIndex: 0,
    explanation: "$\\log \\frac{a+b}{2} = \\log \\sqrt{ab} \\implies \\frac{a+b}{2} = \\sqrt{ab}$\n$(a+b)^2 = 4ab \\implies a^2 + 2ab + b^2 - 4ab = 0 \\implies (a - b)^2 = 0 \\implies a = b$",
    difficulty: "hard"
  },
  {
    question: "मान ज्ञात कीजिए: $\\log_{\\sqrt{2}} 16$",
    options: ["8", "4", "16", "2"],
    correctIndex: 0,
    explanation: "$\\sqrt{2} = 2^{1/2}$, $16 = 2^4$\n$\\log_{2^{1/2}} 2^4 = \\frac{4}{1/2} \\log_2 2 = 8$",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\log_3 2 \\cdot \\log_4 3 \\cdot \\log_5 4 \\dots \\log_{16} 15$ का मान क्या होगा?",
    options: ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "4", "1"],
    correctIndex: 0,
    explanation: "$\\frac{\\log 2}{\\log 3} \\times \\frac{\\log 3}{\\log 4} \\times \\dots \\times \\frac{\\log 15}{\\log 16} = \\frac{\\log 2}{\\log 16} = \\log_{16} 2 = \\log_{2^4} 2 = \\frac{1}{4}$",
    difficulty: "hard"
  },
  {
    question: "यदि $\\log_{10} 2 = 0.30103$ हो, तो $\\log_{10} 50$ का मान क्या होगा?",
    options: ["1.69897", "1.30103", "2.69897", "0.69897"],
    correctIndex: 0,
    explanation: "$\\log_{10} 50 = \\log_{10} (100 / 2) = \\log_{10} 100 - \\log_{10} 2 = 2 - 0.30103 = 1.69897$",
    difficulty: "moderate"
  },
  {
    question: "यदि $x^{\\log_{10} x} = 100x$ हो, तो $x$ का मान क्या होगा?",
    options: ["100 या 0.1", "10 या 0.1", "100 या 10", "1000 या 1"],
    correctIndex: 0,
    explanation: "दोनों ओर $\\log_{10}$ लेने पर: $(\\log x)^2 = \\log(100x) = \\log 100 + \\log x = 2 + \\log x$\nमाना $y = \\log x \\implies y^2 - y - 2 = 0 \\implies (y - 2)(y + 1) = 0$\n$y = 2 \\implies x = 10^2 = 100$\n$y = -1 \\implies x = 10^{-1} = 0.1$",
    difficulty: "hard"
  },
  {
    question: "मान ज्ञात कीजिए: $\\log_{10} (\\tan 1^\\circ) + \\log_{10} (\\tan 2^\\circ) + \\dots + \\log_{10} (\\tan 89^\\circ)$",
    options: ["0", "1", "89", "अपरिभाषित"],
    correctIndex: 0,
    explanation: "$\\log_{10} (\\tan 1^\\circ \\cdot \\tan 2^\\circ \\dots \\tan 89^\\circ)$\nचूँकि $\\tan(90 - \\theta) = \\cot \\theta$ और $\\tan \\theta \\cdot \\cot \\theta = 1$\nगुणनफल = $1 \\times 1 \\dots \\times \\tan 45^\\circ = 1$\n$\\log_{10} 1 = 0$",
    difficulty: "hard"
  }
];

async function run() {
  console.log('Uploading Chapter 6 (Part 2): द्विघात समीकरण & लघुगणक...');
  await saveDirectTest('द्विघात समीकरण - Test 01', 'द्विघात समीकरण', quad01);
  await saveDirectTest('द्विघात समीकरण - Test 02', 'द्विघात समीकरण', quad02);
  await saveDirectTest('द्विघात समीकरण - Test 03', 'द्विघात समीकरण', quad03);

  await saveDirectTest('लघुगणक - Test 01', 'लघुगणक', log01);
  await saveDirectTest('लघुगणक - Test 02', 'लघुगणक', log02);
  await saveDirectTest('लघुगणक - Test 03', 'लघुगणक', log03);

  console.log('Done uploading Ch6 Part 2! Chapter 6 is complete!');
}

run().catch(err => {
  console.error('Error uploading:', err);
  process.exit(1);
});
