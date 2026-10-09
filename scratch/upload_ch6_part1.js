const { saveDirectTest } = require('./direct_uploader.js');

// Chapter 6: बीजगणित (Algebra)
// Topic 1: बीजीय सर्वसमिकाएँ (Algebraic Identities)

const identities01 = [
  {
    question: "यदि $x + \\frac{1}{x} = 5$ हो, तो $x^2 + \\frac{1}{x^2}$ का मान क्या होगा?",
    options: ["23", "25", "27", "21"],
    correctIndex: 0,
    explanation: "दोनों पक्षों का वर्ग करने पर:\n$\\left(x + \\frac{1}{x}\\right)^2 = x^2 + \\frac{1}{x^2} + 2 = 5^2 = 25$\n$\\implies x^2 + \\frac{1}{x^2} = 25 - 2 = 23$",
    difficulty: "easy"
  },
  {
    question: "यदि $a + b = 9$ तथा $ab = 20$ हो, तो $a^2 + b^2$ का मान ज्ञात कीजिए।",
    options: ["41", "49", "61", "81"],
    correctIndex: 0,
    explanation: "$a^2 + b^2 = (a + b)^2 - 2ab$\n$= 9^2 - 2(20) = 81 - 40 = 41$",
    difficulty: "easy"
  },
  {
    question: "यदि $x - \\frac{1}{x} = 4$ हो, तो $x^2 + \\frac{1}{x^2}$ का मान क्या होगा?",
    options: ["14", "16", "18", "20"],
    correctIndex: 2,
    explanation: "$\\left(x - \\frac{1}{x}\\right)^2 = x^2 + \\frac{1}{x^2} - 2 = 4^2 = 16$\n$\\implies x^2 + \\frac{1}{x^2} = 16 + 2 = 18$",
    difficulty: "easy"
  },
  {
    question: "सर्वसमिका के अनुसार, $(a + b)^2 - (a - b)^2$ का मान किसके बराबर होता है?",
    options: ["$2(a^2 + b^2)$", "$4ab$", "$2ab$", "$a^2 - b^2$"],
    correctIndex: 1,
    explanation: "$(a + b)^2 - (a - b)^2 = (a^2 + 2ab + b^2) - (a^2 - 2ab + b^2) = 4ab$",
    difficulty: "easy"
  },
  {
    question: "यदि $x + \\frac{1}{x} = 3$ हो, तो $x^3 + \\frac{1}{x^3}$ का मान क्या होगा?",
    options: ["18", "27", "36", "9"],
    correctIndex: 0,
    explanation: "$x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right)$\n$= 3^3 - 3(3) = 27 - 9 = 18$",
    difficulty: "moderate"
  },
  {
    question: "यदि $a + b + c = 0$ हो, तो $a^3 + b^3 + c^3$ का मान क्या होगा?",
    options: ["0", "$abc$", "$3abc$", "$a^2 + b^2 + c^2$"],
    correctIndex: 2,
    explanation: "सर्वसमिका: $a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2 - ab - bc - ca)$\nयदि $a+b+c = 0$, तो $a^3 + b^3 + c^3 = 3abc$",
    difficulty: "easy"
  },
  {
    question: "मान ज्ञात कीजिए: $\\frac{785 \\times 785 - 215 \\times 215}{785 - 215}$",
    options: ["570", "1000", "900", "1200"],
    correctIndex: 1,
    explanation: "सूत्र: $a^2 - b^2 = (a-b)(a+b)$\nयहाँ $\\frac{a^2 - b^2}{a - b} = a + b = 785 + 215 = 1000$",
    difficulty: "easy"
  },
  {
    question: "यदि $a^2 - b^2 = 88$ तथा $a - b = 4$ हो, तो $(a + b)$ का मान क्या होगा?",
    options: ["22", "44", "18", "16"],
    correctIndex: 0,
    explanation: "$a^2 - b^2 = (a-b)(a+b) \\implies 88 = 4(a+b) \\implies a+b = 88/4 = 22$",
    difficulty: "easy"
  },
  {
    question: "यदि $x + \\frac{1}{x} = 2$ हो, तो $x^{100} + \\frac{1}{x^{100}}$ का मान क्या होगा?",
    options: ["1", "2", "100", "200"],
    correctIndex: 1,
    explanation: "$x + \\frac{1}{x} = 2 \\implies x = 1$\nअतः $1^{100} + \\frac{1}{1^{100}} = 1 + 1 = 2$",
    difficulty: "moderate"
  },
  {
    question: "सर्वसमिका का उपयोग करके $(99)^2$ का मान ज्ञात कीजिए।",
    options: ["9801", "9901", "9701", "9811"],
    correctIndex: 0,
    explanation: "$(99)^2 = (100 - 1)^2 = 100^2 - 2(100)(1) + 1^2 = 10000 - 200 + 1 = 9801$",
    difficulty: "easy"
  }
];

const identities02 = [
  {
    question: "यदि $x + \\frac{1}{x} = 4$ हो, तो $x^4 + \\frac{1}{x^4}$ का मान ज्ञात कीजिए।",
    options: ["194", "196", "192", "214"],
    correctIndex: 0,
    explanation: "$x^2 + \\frac{1}{x^2} = 4^2 - 2 = 14$\nपुनः वर्ग करने पर: $x^4 + \\frac{1}{x^4} = 14^2 - 2 = 196 - 2 = 194$",
    difficulty: "moderate"
  },
  {
    question: "यदि $x - \\frac{1}{x} = 3$ हो, तो $x^3 - \\frac{1}{x^3}$ का मान क्या होगा?",
    options: ["36", "27", "18", "30"],
    correctIndex: 0,
    explanation: "$x^3 - \\frac{1}{x^3} = \\left(x - \\frac{1}{x}\\right)^3 + 3\\left(x - \\frac{1}{x}\\right) = 3^3 + 3(3) = 27 + 9 = 36$",
    difficulty: "moderate"
  },
  {
    question: "मान ज्ञात कीजिए: $\\frac{(0.87)^3 + (0.13)^3}{(0.87)^2 - 0.87 \\times 0.13 + (0.13)^2}$",
    options: ["1.0", "0.74", "0.87", "0.13"],
    correctIndex: 0,
    explanation: "यह $\\frac{a^3 + b^3}{a^2 - ab + b^2} = a + b$ के रूप में है।\nअतः $0.87 + 0.13 = 1.0$",
    difficulty: "moderate"
  },
  {
    question: "यदि $a + b = 7$ और $a^2 + b^2 = 29$ हो, तो $ab$ का मान क्या होगा?",
    options: ["10", "12", "15", "8"],
    correctIndex: 0,
    explanation: "$(a+b)^2 = a^2 + b^2 + 2ab \\implies 7^2 = 29 + 2ab \\implies 49 - 29 = 2ab \\implies 2ab = 20 \\implies ab = 10$",
    difficulty: "easy"
  },
  {
    question: "यदि $x + y + z = 9$ तथा $xy + yz + zx = 26$ हो, तो $x^2 + y^2 + z^2$ का मान ज्ञात कीजिए।",
    options: ["29", "31", "35", "41"],
    correctIndex: 0,
    explanation: "$(x+y+z)^2 = x^2 + y^2 + z^2 + 2(xy+yz+zx)$\n$9^2 = x^2 + y^2 + z^2 + 2(26) \\implies 81 = x^2 + y^2 + z^2 + 52$\n$\\implies x^2 + y^2 + z^2 = 81 - 52 = 29$",
    difficulty: "moderate"
  },
  {
    question: "यदि $a^3 - b^3 = 56$ तथा $a - b = 2$ हो, तो $a^2 + ab + b^2$ का मान क्या होगा?",
    options: ["28", "24", "14", "32"],
    correctIndex: 0,
    explanation: "$a^3 - b^3 = (a-b)(a^2 + ab + b^2) \\implies 56 = 2(a^2 + ab + b^2) \\implies a^2 + ab + b^2 = 28$",
    difficulty: "easy"
  },
  {
    question: "$(2x + 3y)^2 - (2x - 3y)^2$ का सरलीकृत मान क्या है?",
    options: ["$24xy$", "$12xy$", "$8x^2$", "$18y^2$"],
    correctIndex: 0,
    explanation: "$(A+B)^2 - (A-B)^2 = 4AB$\nयहाँ $A=2x, B=3y \\implies 4(2x)(3y) = 24xy$",
    difficulty: "easy"
  },
  {
    question: "यदि $x = 99$ हो, तो $x(x^2 + 3x + 3)$ का मान क्या होगा?",
    options: ["999999", "1000000", "999900", "999000"],
    correctIndex: 0,
    explanation: "$x(x^2 + 3x + 3) = x^3 + 3x^2 + 3x = (x+1)^3 - 1$\n$= (99+1)^3 - 1 = 100^3 - 1 = 1,000,000 - 1 = 999,999$",
    difficulty: "hard"
  },
  {
    question: "यदि $\\frac{a}{b} + \\frac{b}{a} = 1$ हो, तो $a^3 + b^3$ का मान क्या होगा?",
    options: ["0", "1", "-1", "2"],
    correctIndex: 0,
    explanation: "$\\frac{a^2 + b^2}{ab} = 1 \\implies a^2 + b^2 - ab = 0$\n$a^3 + b^3 = (a+b)(a^2 - ab + b^2) = (a+b)(0) = 0$",
    difficulty: "hard"
  },
  {
    question: "यदि $x + \\frac{1}{x} = \\sqrt{3}$ हो, तो $x^6 + 1$ का मान क्या होगा?",
    options: ["0", "1", "-1", "3"],
    correctIndex: 0,
    explanation: "घन करने पर: $x^3 + \\frac{1}{x^3} = (\\sqrt{3})^3 - 3\\sqrt{3} = 3\\sqrt{3} - 3\\sqrt{3} = 0$\n$\\implies \\frac{x^6 + 1}{x^3} = 0 \\implies x^6 + 1 = 0$",
    difficulty: "hard"
  }
];

const identities03 = [
  {
    question: "यदि $x + \\frac{1}{x} = 6$ हो, तो $x - \\frac{1}{x}$ का मान क्या होगा?",
    options: ["$4\\sqrt{2}$", "$2\\sqrt{2}$", "$6\\sqrt{2}$", "4"],
    correctIndex: 0,
    explanation: "$\\left(x - \\frac{1}{x}\\right)^2 = \\left(x + \\frac{1}{x}\\right)^2 - 4 = 6^2 - 4 = 32$\n$x - \\frac{1}{x} = \\sqrt{32} = 4\\sqrt{2}$",
    difficulty: "moderate"
  },
  {
    question: "यदि $x^2 + y^2 + z^2 = xy + yz + zx$ हो, तो निम्नलिखित में से कौन-सा सत्य है?",
    options: ["$x = y = z$", "$x + y + z = 0$", "$x = y \\neq z$", "$x + y = z$"],
    correctIndex: 0,
    explanation: "2 से गुणा करने पर: $2x^2 + 2y^2 + 2z^2 - 2xy - 2yz - 2zx = 0$\n$\\implies (x-y)^2 + (y-z)^2 + (z-x)^2 = 0$\nपूर्ण वर्गों का योग 0 होने पर: $x-y=0, y-z=0, z-x=0 \\implies x = y = z$",
    difficulty: "hard"
  },
  {
    question: "यदि $2x + \\frac{1}{3x} = 4$ हो, तो $9x^2 + \\frac{1}{4x^2}$ का मान ज्ञात कीजिए।",
    options: ["33", "36", "32", "30"],
    correctIndex: 0,
    explanation: "समीकरण को $\\frac{3}{2}$ से गुणा करने पर: $3x + \\frac{1}{2x} = 4 \\times \\frac{3}{2} = 6$\nवर्ग करने पर: $9x^2 + \\frac{1}{4x^2} + 2(3x)\\left(\\frac{1}{2x}\\right) = 6^2 = 36$\n$\\implies 9x^2 + \\frac{1}{4x^2} + 3 = 36 \\implies 9x^2 + \\frac{1}{4x^2} = 33$",
    difficulty: "hard"
  },
  {
    question: "यदि $a + b + c = 6$ तथा $a^2 + b^2 + c^2 = 14$ हो, तो $ab + bc + ca$ का मान क्या होगा?",
    options: ["11", "12", "14", "22"],
    correctIndex: 0,
    explanation: "$(a+b+c)^2 = a^2 + b^2 + c^2 + 2(ab+bc+ca)$\n$36 = 14 + 2(ab+bc+ca) \\implies 2(ab+bc+ca) = 22 \\implies ab+bc+ca = 11$",
    difficulty: "moderate"
  },
  {
    question: "यदि $a^4 + \\frac{1}{a^4} = 119$ हो, तो $a - \\frac{1}{a}$ का मान क्या होगा?",
    options: ["3", "4", "5", "$\\sqrt{11}$"],
    correctIndex: 0,
    explanation: "$a^2 + \\frac{1}{a^2} = \\sqrt{119 + 2} = \\sqrt{121} = 11$\n$a - \\frac{1}{a} = \\sqrt{11 - 2} = \\sqrt{9} = 3$",
    difficulty: "hard"
  },
  {
    question: "मान ज्ञात कीजिए: $\\frac{(5.6)^3 - (4.6)^3}{(5.6)^2 + 5.6 \\times 4.6 + (4.6)^2}$",
    options: ["1.0", "1.2", "0.8", "10.2"],
    correctIndex: 0,
    explanation: "सूत्र: $\\frac{a^3 - b^3}{a^2 + ab + b^2} = a - b$\nयहाँ $a=5.6, b=4.6 \\implies 5.6 - 4.6 = 1.0$",
    difficulty: "easy"
  },
  {
    question: "यदि $x^2 + \\frac{1}{x^2} = 7$ हो, तो $x^3 + \\frac{1}{x^3}$ का धनात्मक मान ज्ञात कीजिए।",
    options: ["18", "27", "16", "24"],
    correctIndex: 0,
    explanation: "$x + \\frac{1}{x} = \\sqrt{7 + 2} = \\sqrt{9} = 3$\n$x^3 + \\frac{1}{x^3} = 3^3 - 3(3) = 27 - 9 = 18$",
    difficulty: "moderate"
  },
  {
    question: "यदि $x + \\frac{1}{x} = -2$ हो, तो $x^{21} + \\frac{1}{x^{21}}$ का मान क्या होगा?",
    options: ["-2", "2", "0", "-1"],
    correctIndex: 0,
    explanation: "$x + \\frac{1}{x} = -2 \\implies x = -1$\n$(-1)^{21} + \\frac{1}{(-1)^{21}} = -1 + (-1) = -2$",
    difficulty: "moderate"
  },
  {
    question: "यदि $a=25, b=15, c=-40$ हो, तो $a^3 + b^3 + c^3$ का मान क्या होगा?",
    options: ["-45000", "45000", "0", "-15000"],
    correctIndex: 0,
    explanation: "यहाँ $a + b + c = 25 + 15 + (-40) = 0$\nअतः $a^3 + b^3 + c^3 = 3abc = 3 \\times 25 \\times 15 \\times (-40) = -45,000$",
    difficulty: "hard"
  },
  {
    question: "यदि $(x - 3)$ बहुपद $x^2 - kx + 12$ का एक गुणनखंड है, तो $k$ का मान क्या होगा?",
    options: ["7", "-7", "4", "3"],
    correctIndex: 0,
    explanation: "$x = 3$ रखने पर: $3^2 - 3k + 12 = 0 \\implies 9 - 3k + 12 = 0 \\implies 3k = 21 \\implies k = 7$",
    difficulty: "easy"
  }
];

// Topic 2: रैखिक समीकरण (Linear Equations)

const linear01 = [
  {
    question: "समीकरण $5x - 7 = 3x + 9$ में $x$ का मान ज्ञात कीजिए।",
    options: ["8", "6", "4", "10"],
    correctIndex: 0,
    explanation: "$5x - 3x = 9 + 7 \\implies 2x = 16 \\implies x = 8$",
    difficulty: "easy"
  },
  {
    question: "यदि $3(x - 2) + 4(x + 1) = 26$ हो, तो $x$ का मान क्या होगा?",
    options: ["4", "5", "3", "6"],
    correctIndex: 0,
    explanation: "$3x - 6 + 4x + 4 = 26 \\implies 7x - 2 = 26 \\implies 7x = 28 \\implies x = 4$",
    difficulty: "easy"
  },
  {
    question: "दो संख्याओं का योग 45 है और उनका अंतर 11 है। बड़ी संख्या क्या है?",
    options: ["28", "17", "30", "26"],
    correctIndex: 0,
    explanation: "$x + y = 45$, $x - y = 11$\nजोड़ने पर: $2x = 56 \\implies x = 28$",
    difficulty: "easy"
  },
  {
    question: "समीकरण युग्म $2x + 3y = 7$ और $4x + 6y = 14$ के कितने हल होंगे?",
    options: ["अनंत हल", "एक अद्वितीय हल", "कोई हल नहीं", "दो हल"],
    correctIndex: 0,
    explanation: "यहाँ $\\frac{a_1}{a_2} = \\frac{2}{4} = \\frac{1}{2}$, $\\frac{b_1}{b_2} = \\frac{3}{6} = \\frac{1}{2}$, $\\frac{c_1}{c_2} = \\frac{7}{14} = \\frac{1}{2}$\nचूँकि $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$, अतः रेखाएँ संपाती हैं तथा अनंत हल होंगे।",
    difficulty: "moderate"
  },
  {
    question: "यदि $k$ के किस मान के लिए रैखिक समीकरण युग्म $x + 2y = 5$ तथा $3x + ky = 15$ के अनंत हल होंगे?",
    options: ["6", "3", "2", "5"],
    correctIndex: 0,
    explanation: "अनंत हल के लिए: $\\frac{1}{3} = \\frac{2}{k} = \\frac{5}{15} \\implies \\frac{2}{k} = \\frac{1}{3} \\implies k = 6$",
    difficulty: "moderate"
  },
  {
    question: "एक संख्या के 4 गुने में 15 जोड़ने पर 75 प्राप्त होता है। वह संख्या क्या है?",
    options: ["15", "12", "18", "20"],
    correctIndex: 0,
    explanation: "$4x + 15 = 75 \\implies 4x = 60 \\implies x = 15$",
    difficulty: "easy"
  },
  {
    question: "समीकरण युग्म $x + y = 10$ और $x - y = 4$ में $xy$ का मान क्या होगा?",
    options: ["21", "24", "20", "25"],
    correctIndex: 0,
    explanation: "$x = (10+4)/2 = 7$, $y = (10-4)/2 = 3$\n$\\implies xy = 7 \\times 3 = 21$",
    difficulty: "easy"
  },
  {
    question: "रैखिक समीकरण प्रणाली $2x - y = 3$ और $4x - 2y = 5$ के हलों की संख्या क्या होगी?",
    options: ["कोई हल नहीं", "एक अद्वितीय हल", "अनंत हल", "दो हल"],
    correctIndex: 0,
    explanation: "$\\frac{a_1}{a_2} = \\frac{2}{4} = \\frac{1}{2}$, $\\frac{b_1}{b_2} = \\frac{-1}{-2} = \\frac{1}{2}$, $\\frac{c_1}{c_2} = \\frac{3}{5}$\nचूँकि $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$, रेखाएँ समांतर हैं तथा कोई हल नहीं होगा।",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\frac{x}{3} + \\frac{y}{4} = 11$ और $\\frac{5x}{6} - \\frac{y}{3} = -7$ हो, तो $y$ का मान क्या होगा?",
    options: ["32", "24", "16", "28"],
    correctIndex: 0,
    explanation: "$4x + 3y = 132$ ...(1)\n$5x - 2y = -42$ ...(2)\n(1) को 2 से तथा (2) को 3 से गुणा कर जोड़ने पर:\n$8x + 6y + 15x - 6y = 264 - 126 \\implies 23x = 138 \\implies x = 6$\n$4(6) + 3y = 132 \\implies 3y = 132 - 24 = 108 \\implies y = 36$ (समीकरण सुधार: $x=6, y=36$, यदि $y=32$ तो विकल्प सुधार)\nगणना: $4(6) + 3(36) = 24 + 108 = 132$। अतः $y = 36$, विकल्प [36, 32, 24, 16], उत्तर: 36",
    options: ["36", "32", "24", "16"],
    correctIndex: 0,
    difficulty: "hard"
  },
  {
    question: "दो अंकों की एक संख्या के अंकों का योग 9 है। यदि संख्या में 27 जोड़ दिया जाए, तो अंक पलट जाते हैं। वह संख्या क्या है?",
    options: ["36", "45", "27", "63"],
    correctIndex: 0,
    explanation: "मान लेते हैं संख्या $10x + y$ है। $x + y = 9$\n$10x + y + 27 = 10y + x \\implies 9y - 9x = 27 \\implies y - x = 3$\nजोड़ने पर: $2y = 12 \\implies y = 6, x = 3$\nसंख्या = 36। जाँच: $36 + 27 = 63$",
    difficulty: "moderate"
  }
];

const linear02 = [
  {
    question: "समीकरण $\\frac{x+1}{2} + \\frac{x-1}{3} = 5$ में $x$ का मान ज्ञात कीजिए।",
    options: ["5.8", "6.2", "5", "7"],
    correctIndex: 0,
    explanation: "ल.स. = 6:\n$3(x+1) + 2(x-1) = 30 \\implies 3x + 3 + 2x - 2 = 30 \\implies 5x + 1 = 30 \\implies 5x = 29 \\implies x = 5.8$",
    difficulty: "moderate"
  },
  {
    question: "यदि $3x + 2y = 13$ और $x - y = 1$ हो, तो $x + y$ का मान क्या होगा?",
    options: ["5", "6", "4", "7"],
    correctIndex: 0,
    explanation: "$x = y + 1$\n$3(y + 1) + 2y = 13 \\implies 5y + 3 = 13 \\implies 5y = 10 \\implies y = 2$\n$x = 2 + 1 = 3$\n$x + y = 3 + 2 = 5$",
    difficulty: "easy"
  },
  {
    question: "एक पिता की आयु उसके पुत्र की आयु की 3 गुनी है। 5 वर्ष बाद दोनों की आयु का योग 70 वर्ष होगा। पिता की वर्तमान आयु क्या है?",
    options: ["45 वर्ष", "42 वर्ष", "48 वर्ष", "39 वर्ष"],
    correctIndex: 0,
    explanation: "पुत्र = $x$, पिता = $3x$\n5 वर्ष बाद: $(3x + 5) + (x + 5) = 70 \\implies 4x + 10 = 70 \\implies 4x = 60 \\implies x = 15$\nपिता की आयु = $3 \\times 15 = 45$ वर्ष",
    difficulty: "moderate"
  },
  {
    question: "यदि $k$ के किस मान के लिए रैखिक समीकरण युग्म $kx - y = 2$ तथा $6x - 2y = 3$ का कोई हल नहीं होगा?",
    options: ["3", "-3", "6", "2"],
    correctIndex: 0,
    explanation: "कोई हल नहीं के लिए: $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$\n$\\frac{k}{6} = \\frac{-1}{-2} \\implies \\frac{k}{6} = \\frac{1}{2} \\implies k = 3$\n(तथा $\\frac{1}{2} \\neq \\frac{2}{3}$, जो सत्य है)",
    difficulty: "moderate"
  },
  {
    question: "5 मेज और 7 कुर्सियों का कुल मूल्य ₹4,300 है, जबकि 7 मेज और 5 कुर्सियों का कुल मूल्य ₹5,300 है। एक मेज का मूल्य क्या है?",
    options: ["₹650", "₹550", "₹500", "₹600"],
    correctIndex: 0,
    explanation: "$5M + 7C = 4300$ ...(1)\n$7M + 5C = 5300$ ...(2)\nजोड़ने पर: $12M + 12C = 9600 \\implies M + C = 800$\nघटाने पर (2 - 1): $2M - 2C = 1000 \\implies M - C = 500$\nपुनः जोड़ने पर: $2M = 1300 \\implies M = ₹650$",
    difficulty: "moderate"
  },
  {
    question: "यदि $\\frac{2x+3}{5} = \\frac{x-1}{2}$ हो, तो $x$ का मान क्या होगा?",
    options: ["11", "9", "7", "13"],
    correctIndex: 0,
    explanation: "वज्र गुणन करने पर: $2(2x + 3) = 5(x - 1) \\implies 4x + 6 = 5x - 5 \\implies x = 11$",
    difficulty: "easy"
  },
  {
    question: "यदि $2x + 3y = 8$ और $xy = 2$ हो, तो $4x^2 + 9y^2$ का मान ज्ञात कीजिए।",
    options: ["40", "44", "48", "52"],
    correctIndex: 0,
    explanation: "$(2x + 3y)^2 = 4x^2 + 9y^2 + 12xy$\n$8^2 = 4x^2 + 9y^2 + 12(2) \\implies 64 = 4x^2 + 9y^2 + 24$\n$\\implies 4x^2 + 9y^2 = 64 - 24 = 40$",
    difficulty: "moderate"
  },
  {
    question: "एक भिन्न के अंश और हर दोनों में 1 जोड़ने पर वह $\\frac{4}{5}$ हो जाती है और दोनों में से 5 घटाने पर $\\frac{1}{2}$ हो जाती है। वह भिन्न क्या है?",
    options: ["$\\frac{7}{9}$", "$\\frac{5}{7}$", "$\\frac{3}{5}$", "$\\frac{9}{11}$"],
    correctIndex: 0,
    explanation: "जाँच: $\\frac{7+1}{9+1} = \\frac{8}{10} = \\frac{4}{5}$\n$\\frac{7-5}{9-5} = \\frac{2}{4} = \\frac{1}{2}$। अतः भिन्न $\\frac{7}{9}$ है।",
    difficulty: "moderate"
  },
  {
    question: "समीकरण युग्म $3x - 5y = 20$ और $6x - 10y = 40$ के ज्यामितीय निरूपण में रेखाएँ कैसी होंगी?",
    options: ["संपाती रेखाएँ", "समांतर रेखाएँ", "प्रतिच्छेदी रेखाएँ", "लंबवत रेखाएँ"],
    correctIndex: 0,
    explanation: "$\\frac{3}{6} = \\frac{-5}{-10} = \\frac{20}{40} = \\frac{1}{2}$\nतीनों अनुपात बराबर हैं, अतः रेखाएँ संपाती (coincident) होंगी।",
    difficulty: "easy"
  },
  {
    question: "यदि $a_1 x + b_1 y = c_1$ और $a_2 x + b_2 y = c_2$ का एक अद्वितीय हल हो, तो शर्त क्या है?",
    options: ["$\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$", "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$", "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$", "$\\frac{a_1}{b_1} = \\frac{a_2}{b_2}$"],
    correctIndex: 0,
    explanation: "रैखिक समीकरण निकाय के अद्वितीय हल (unique solution) के लिए शर्त $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$ होती है।",
    difficulty: "easy"
  }
];

const linear03 = [
  {
    question: "यदि $2^{x+y} = 32$ और $2^{x-y} = 8$ हो, तो $x$ और $y$ के मान क्रमशः क्या होंगे?",
    options: ["4 और 1", "3 और 2", "5 और 0", "4 और 2"],
    correctIndex: 0,
    explanation: "$2^{x+y} = 2^5 \\implies x + y = 5$\n$2^{x-y} = 2^3 \\implies x - y = 3$\nजोड़ने पर: $2x = 8 \\implies x = 4$, $y = 1$",
    difficulty: "moderate"
  },
  {
    question: "समीकरण $\\frac{1}{x} + \\frac{1}{y} = 5$ और $\\frac{1}{x} - \\frac{1}{y} = 1$ में $x$ का मान ज्ञात कीजिए।",
    options: ["$\\frac{1}{3}$", "3", "$\\frac{1}{2}$", "2"],
    correctIndex: 0,
    explanation: "जोड़ने पर: $\\frac{2}{x} = 6 \\implies \\frac{1}{x} = 3 \\implies x = \\frac{1}{3}$",
    difficulty: "moderate"
  },
  {
    question: "एक आयताकार खेत का परिमाप 80 मीटर है और उसकी लंबाई चौड़ाई से 8 मीटर अधिक है। खेत का क्षेत्रफल ज्ञात कीजिए।",
    options: ["384 वर्ग मीटर", "396 वर्ग मीटर", "360 वर्ग मीटर", "400 वर्ग मीटर"],
    correctIndex: 0,
    explanation: "$2(l + b) = 80 \\implies l + b = 40$\n$l - b = 8 \\implies l = 24$ मी, $b = 16$ मी\nक्षेत्रफल = $24 \\times 16 = 384$ वर्ग मीटर",
    difficulty: "moderate"
  },
  {
    question: "यदि समीकरण निकाय $x + y = 6$ तथा $x - y = 2$ को निरूपित करने वाली रेखाएँ $y$-अक्ष को किन बिंदुओं पर काटती हैं?",
    options: ["$(0, 6)$ और $(0, -2)$", "$(0, 6)$ और $(0, 2)$", "$(6, 0)$ और $(2, 0)$", "$(0, 3)$ और $(0, -1)$"],
    correctIndex: 0,
    explanation: "$y$-अक्ष पर $x = 0$ होता है।\nपहली रेखा: $0 + y = 6 \\implies (0, 6)$\nदूसरी रेखा: $0 - y = 2 \\implies y = -2 \\implies (0, -2)$",
    difficulty: "hard"
  },
  {
    question: "यदि $\\frac{x+y}{xy} = 2$ तथा $\\frac{x-y}{xy} = 6$ हो, तो $x$ और $y$ के मान क्या होंगे?",
    options: ["$x = \\frac{1}{4}, y = -\\frac{1}{2}$", "$x = 4, y = -2$", "$x = \\frac{1}{2}, y = -\\frac{1}{4}$", "$x = -\\frac{1}{4}, y = \\frac{1}{2}$"],
    correctIndex: 0,
    explanation: "$\\frac{1}{y} + \\frac{1}{x} = 2$ तथा $\\frac{1}{y} - \\frac{1}{x} = 6$\nजोड़ने पर: $\\frac{2}{y} = 8 \\implies \\frac{1}{y} = 4 \\implies y = \\frac{1}{4}$... प्रतीक्षा: $\\frac{x-y}{xy} = \\frac{1}{y} - \\frac{1}{x} = 6$\nघटाने पर: $\\frac{2}{x} = 2 - 6 = -4 \\implies \\frac{1}{x} = -2 \\implies x = -\\frac{1}{2}$\nचलो सीधा समीकरण देखें: $y = 1/4$, $x = -1/2$। विकल्प सुधारें:",
    options: ["$x = -\\frac{1}{2}, y = \\frac{1}{4}$", "$x = \\frac{1}{2}, y = -\\frac{1}{4}$", "$x = -2, y = 4$", "$x = 2, y = -4$"],
    correctIndex: 0,
    difficulty: "hard"
  },
  {
    question: "10 वर्ष पहले पिता की आयु पुत्र की आयु की 4 गुनी थी। 10 वर्ष बाद पिता की आयु पुत्र की आयु की 2 गुनी होगी। उनकी वर्तमान आयु क्रमशः क्या है?",
    options: ["50 वर्ष और 20 वर्ष", "40 वर्ष और 15 वर्ष", "60 वर्ष और 25 वर्ष", "45 वर्ष और 18 वर्ष"],
    correctIndex: 0,
    explanation: "10 वर्ष पहले: पुत्र = $x$, पिता = $4x$\nवर्तमान: पुत्र = $x+10$, पिता = $4x+10$\n10 वर्ष बाद: $4x + 20 = 2(x + 20) \\implies 4x + 20 = 2x + 40 \\implies 2x = 20 \\implies x = 10$\nवर्तमान आयु: पिता = $4(10)+10 = 50$ वर्ष, पुत्र = $10+10 = 20$ वर्ष",
    difficulty: "moderate"
  },
  {
    question: "यदि $3x + 4y = 12$ रेखा $x$-अक्ष और $y$-अक्ष को क्रमशः बिंदु $A$ और $B$ पर काटती है, तो रेखाखंड $AB$ की लंबाई क्या होगी?",
    options: ["5 इकाई", "4 इकाई", "3 इकाई", "7 इकाई"],
    correctIndex: 0,
    explanation: "$y=0$ पर $3x = 12 \\implies x = 4 \\implies A(4, 0)$\n$x=0$ पर $4y = 12 \\implies y = 3 \\implies B(0, 3)$\n$AB = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$ इकाई",
    difficulty: "moderate"
  },
  {
    question: "एक परीक्षा में प्रत्येक सही उत्तर के लिए 4 अंक मिलते हैं तथा प्रत्येक गलत उत्तर के लिए 1 अंक काटा जाता है। एक छात्र ने 60 प्रश्न हल किए और उसे 130 अंक प्राप्त हुए। उसने कितने प्रश्न सही हल किए?",
    options: ["38", "40", "36", "42"],
    correctIndex: 0,
    explanation: "माना सही उत्तर $x$ तथा गलत $(60 - x)$ हैं।\n$4x - 1(60 - x) = 130 \\implies 4x - 60 + x = 130 \\implies 5x = 190 \\implies x = 38$",
    difficulty: "moderate"
  },
  {
    question: "यदि समीकरण प्रणाली $kx + 3y = 1$ तथा $2x + y = 4$ का एक अद्वितीय हल हो, तो $k$ का मान क्या नहीं हो सकता?",
    options: ["6", "3", "2", "0"],
    correctIndex: 0,
    explanation: "अद्वितीय हल के लिए: $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2} \\implies \\frac{k}{2} \\neq \\frac{3}{1} \\implies k \\neq 6$",
    difficulty: "easy"
  },
  {
    question: "समीकरण $\\frac{x}{2} + \\frac{2y}{3} = -1$ तथा $x - \\frac{y}{3} = 3$ में $(x, y)$ का मान ज्ञात कीजिए।",
    options: ["$(2, -3)$", "$(3, -2)$", "$(1, -2)$", "$(2, 3)$"],
    correctIndex: 0,
    explanation: "पहला समीकरण: $3x + 4y = -6$\nदूसरा समीकरण: $3x - y = 9$\nघटाने पर: $5y = -15 \\implies y = -3$\n$3x - (-3) = 9 \\implies 3x + 3 = 9 \\implies 3x = 6 \\implies x = 2$\nअतः $(x, y) = (2, -3)$",
    difficulty: "moderate"
  }
];

async function run() {
  console.log('Uploading Chapter 6 (Part 1): बीजीय सर्वसमिकाएँ & रैखिक समीकरण...');
  await saveDirectTest('बीजीय सर्वसमिकाएँ - Test 01', 'बीजीय सर्वसमिकाएँ', identities01);
  await saveDirectTest('बीजीय सर्वसमिकाएँ - Test 02', 'बीजीय सर्वसमिकाएँ', identities02);
  await saveDirectTest('बीजीय सर्वसमिकाएँ - Test 03', 'बीजीय सर्वसमिकाएँ', identities03);

  await saveDirectTest('रैखिक समीकरण - Test 01', 'रैखिक समीकरण', linear01);
  await saveDirectTest('रैखिक समीकरण - Test 02', 'रैखिक समीकरण', linear02);
  await saveDirectTest('रैखिक समीकरण - Test 03', 'रैखिक समीकरण', linear03);

  console.log('Done uploading Ch6 Part 1!');
}

run().catch(err => {
  console.error('Error uploading:', err);
  process.exit(1);
});
