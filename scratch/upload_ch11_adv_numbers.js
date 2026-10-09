const { saveDirectTest } = require('./direct_uploader.js');

// Chapter 11: उन्नत संख्या पद्धति
// Topic 1: शेषफल प्रमेय (Remainder Theorem)

const rem01 = [
  {
    question: "जब $17^{200}$ को 18 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["1", "17", "0", "16"],
    correctIndex: 0,
    explanation: "$17 \\equiv -1 \\pmod{18}$\n$17^{200} \\equiv (-1)^{200} \\equiv 1 \\pmod{18}$।\nअतः शेषफल 1 होगा।",
    difficulty: "easy"
  },
  {
    question: "जब $25^{25}$ को 26 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["25", "1", "24", "0"],
    correctIndex: 0,
    explanation: "$25 \\equiv -1 \\pmod{26}$\n$25^{25} \\equiv (-1)^{25} \\equiv -1 \\equiv 25 \\pmod{26}$।",
    difficulty: "easy"
  },
  {
    question: "किसी संख्या को 56 से भाग देने पर शेषफल 29 आता है। यदि उसी संख्या को 8 से भाग दिया जाए, तो शेषफल क्या होगा?",
    options: ["5", "3", "4", "1"],
    correctIndex: 0,
    explanation: "चूँकि 56, 8 से पूर्णतः विभाज्य है ($56 = 8 \\times 7$), अतः नए शेषफल के लिए पुराने शेषफल को 8 से भाग देते हैं:\n$29 \\div 8 = 3$ भागफल, शेषफल $= 29 - 24 = 5$।",
    difficulty: "easy"
  },
  {
    question: "जब $2^{31}$ को 5 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["3", "2", "1", "4"],
    correctIndex: 0,
    explanation: "$2^2 = 4 \\equiv -1 \\pmod{5}$\n$2^{31} = 2 \\times (2^2)^{15} = 2 \\times (-1)^{15} = 2 \\times (-1) = -2 \\equiv 3 \\pmod{5}$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $f(x) = x^3 - 3x^2 + 4x - 5$ को $(x - 2)$ से विभाजित किया जाए, तो शेषफल प्रमेय के अनुसार शेषफल क्या होगा?",
    options: ["-1", "1", "3", "-3"],
    correctIndex: 0,
    explanation: "शेषफल $= f(2) = 2^3 - 3(2^2) + 4(2) - 5 = 8 - 12 + 8 - 5 = 16 - 17 = -1$।",
    difficulty: "easy"
  },
  {
    question: "जब $(67^{67} + 67)$ को 68 से भाग दिया जाता है, तो शेषफल क्या प्राप्त होगा?",
    options: ["66", "1", "67", "0"],
    correctIndex: 0,
    explanation: "$67 \\equiv -1 \\pmod{68}$\n$(-1)^{67} + 67 = -1 + 67 = 66$।\nअतः शेषफल 66 होगा।",
    difficulty: "moderate"
  },
  {
    question: "दो अलग-अलग संख्याओं को 33 से विभाजित करने पर शेषफल क्रमशः 21 और 28 प्राप्त होते हैं। यदि दोनों संख्याओं के योग को 33 से विभाजित किया जाए, तो शेषफल क्या होगा?",
    options: ["16", "17", "15", "18"],
    correctIndex: 0,
    explanation: "शेषफलों का योग $= 21 + 28 = 49$\n$49$ को 33 से भाग देने पर शेषफल $= 49 - 33 = 16$।",
    difficulty: "moderate"
  },
  {
    question: "फॉर्मेट की लघु प्रमेय (Fermat's Little Theorem) के अनुसार, यदि $p$ अभाज्य है और $\\gcd(a, p) = 1$, तो $a^{p-1} \\pmod p$ का मान क्या होता है?",
    options: ["1", "0", "$p - 1$", "$a$"],
    correctIndex: 0,
    explanation: "फॉर्मेट की लघु प्रमेय के अनुसार $a^{p-1} \\equiv 1 \\pmod p$ होता है।",
    difficulty: "easy"
  },
  {
    question: "जब $3^{21}$ को 5 से विभाजित किया जाए, तो शेषफल क्या होगा?",
    options: ["3", "2", "4", "1"],
    correctIndex: 0,
    explanation: "$3^4 = 81 \\equiv 1 \\pmod 5$\n$3^{21} = (3^4)^5 \\times 3^1 \\equiv 1^5 \\times 3 = 3 \\pmod 5$।",
    difficulty: "moderate"
  },
  {
    question: "एक संख्या को 13 से भाग देने पर शेषफल 1 बचता है और प्राप्त भागफल को 5 से भाग देने पर शेषफल 3 बचता है। यदि उसी संख्या को 65 से भाग दिया जाए, तो शेषफल क्या होगा?",
    options: ["40", "39", "41", "42"],
    correctIndex: 0,
    explanation: "संख्या $N = 13q + 1$\n$q = 5k + 3$\n$N = 13(5k + 3) + 1 = 65k + 39 + 1 = 65k + 40$\nअतः 65 से भाग देने पर शेषफल 40 होगा।",
    difficulty: "hard"
  }
];

const rem02 = [
  {
    question: "जब $(9^6 - 11)$ को 8 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["6", "2", "0", "4"],
    correctIndex: 0,
    explanation: "$9 \\equiv 1 \\pmod 8 \\implies 9^6 \\equiv 1 \\pmod 8$\n$9^6 - 11 \\equiv 1 - 11 = -10$\n$-10 \\equiv -10 + 2(8) = 6 \\pmod 8$।\nअतः शेषफल 6 होगा।",
    difficulty: "moderate"
  },
  {
    question: "विल्सन प्रमेय (Wilson's Theorem) के अनुसार, किसी अभाज्य संख्या $p$ के लिए $(p-1)! \\pmod p$ का मान क्या होता है?",
    options: ["$-1$ या $(p - 1)$", "1", "0", "$p$"],
    correctIndex: 0,
    explanation: "विल्सन प्रमेय के अनुसार: $(p - 1)! \\equiv -1 \\equiv (p - 1) \\pmod p$।",
    difficulty: "moderate"
  },
  {
    question: "जब $7^{19}$ को 6 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["1", "5", "3", "0"],
    correctIndex: 0,
    explanation: "$7 \\equiv 1 \\pmod 6 \\implies 7^{19} \\equiv 1^{19} \\equiv 1 \\pmod 6$।",
    difficulty: "easy"
  },
  {
    question: "जब $2^{100}$ को 7 से विभाजित किया जाए, तो शेषफल क्या होगा?",
    options: ["2", "4", "1", "6"],
    correctIndex: 0,
    explanation: "$2^3 = 8 \\equiv 1 \\pmod 7$\n$2^{100} = (2^3)^{33} \\times 2^1 \\equiv 1^{33} \\times 2 = 2 \\pmod 7$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $x^2 - 5x + 6$ को $(x - 1)$ से भाग दिया जाए, तो शेषफल क्या होगा?",
    options: ["2", "0", "1", "3"],
    correctIndex: 0,
    explanation: "शेषफल $= 1^2 - 5(1) + 6 = 1 - 5 + 6 = 2$।",
    difficulty: "easy"
  },
  {
    question: "जब $35^{37}$ को 9 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["8", "1", "7", "2"],
    correctIndex: 0,
    explanation: "$35 \\equiv -1 \\pmod 9$\n$35^{37} \\equiv (-1)^{37} \\equiv -1 \\equiv 8 \\pmod 9$।",
    difficulty: "moderate"
  },
  {
    question: "किसी संख्या को 899 से भाग देने पर शेषफल 63 बचता है। यदि उसी संख्या को 29 से भाग दिया जाए, तो शेषफल क्या होगा?",
    options: ["5", "4", "3", "2"],
    correctIndex: 0,
    explanation: "$899 = 29 \\times 31$ (पूर्ण विभाज्य)\n$63 \\div 29 = 2$ भागफल, शेषफल $= 63 - 58 = 5$।",
    difficulty: "easy"
  },
  {
    question: "जब $(1! + 2! + 3! + \\dots + 100!)$ को 5 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["3", "4", "2", "1"],
    correctIndex: 0,
    explanation: "$5! = 120$ और उसके बाद के सभी पद 5 से पूर्णतः विभाज्य हैं ($= 0 \\pmod 5$)।\nकेवल $1! + 2! + 3! + 4! = 1 + 2 + 6 + 24 = 33$\n$33 \\div 5 = 6$ भागफल, शेषफल $= 3$।",
    difficulty: "hard"
  },
  {
    question: "जब $5^{500}$ को 500 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["125", "250", "375", "100"],
    correctIndex: 0,
    explanation: "$500 = 125 \\times 4 = 5^3 \\times 4$\n$\\frac{5^{500}}{500} = \\frac{5^3 \\times 5^{497}}{5^3 \\times 4} = \\frac{5^{497}}{4}$\n$5 \\equiv 1 \\pmod 4 \\implies 5^{497} \\equiv 1 \\pmod 4$\nअतः मूल शेषफल $= 1 \\times 125 = 125$।",
    difficulty: "hard"
  },
  {
    question: "यदि किसी संख्या $N$ को 4 से भाग देने पर 3 शेष बचता है, तो $2N$ को 4 से भाग देने पर शेषफल क्या होगा?",
    options: ["2", "1", "3", "0"],
    correctIndex: 0,
    explanation: "$N = 4k + 3 \\implies 2N = 8k + 6 = 8k + 4 + 2 = 4(2k + 1) + 2$\nअतः शेषफल 2 होगा।",
    difficulty: "easy"
  }
];

const rem03 = [
  {
    question: "जब $7^{84}$ को 342 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["1", "7", "341", "49"],
    correctIndex: 0,
    explanation: "$7^3 = 343 \\equiv 1 \\pmod{342}$\n$7^{84} = (7^3)^{28} \\equiv 1^{28} \\equiv 1 \\pmod{342}$।",
    difficulty: "hard"
  },
  {
    question: "जब $(10^{1} + 10^{2} + 10^{3} + \\dots + 10^{10})$ को 6 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["4", "2", "0", "5"],
    correctIndex: 0,
    explanation: "प्रत्येक $10^k \\equiv 4 \\pmod 6$\nकुल 10 पद हैं $\\implies 10 \\times 4 = 40$\n$40 \\div 6 = 6$ भागफल, शेषफल $= 40 - 36 = 4$।",
    difficulty: "hard"
  },
  {
    question: "जब $13^{73} + 14^{73}$ को 27 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["0", "1", "26", "13"],
    correctIndex: 0,
    explanation: "सर्वसमिका: जब $n$ विषम हो, तो $(a^n + b^n)$ सदैव $(a + b)$ से विभाज्य होता है।\nयहाँ $a+b = 13 + 14 = 27$।\nअतः यह 27 से पूर्णतः विभाज्य होगा, शेषफल $= 0$।",
    difficulty: "moderate"
  },
  {
    question: "जब $2^{256}$ को 17 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["1", "16", "2", "4"],
    correctIndex: 0,
    explanation: "$2^4 = 16 \\equiv -1 \\pmod{17}$\n$2^{256} = (2^4)^{64} \\equiv (-1)^{64} \\equiv 1 \\pmod{17}$।",
    difficulty: "moderate"
  },
  {
    question: "जब $4^{96}$ को 6 से भाग दिया जाता है, तो शेषफल क्या होगा?",
    options: ["4", "2", "0", "1"],
    correctIndex: 0,
    explanation: "4 की किसी भी धनात्मक घात ($4^n$) को 6 से भाग देने पर शेषफल सदैव 4 ही रहता है।",
    difficulty: "easy"
  },
  {
    question: "यदि $N = 1421 \\times 1423 \\times 1425$ हो, तो $N$ को 12 से भाग देने पर शेषफल क्या होगा?",
    options: ["9", "3", "5", "7"],
    correctIndex: 0,
    explanation: "$1421 \\equiv 5 \\pmod{12}$\n$1423 \\equiv 7 \\pmod{12}$\n$1425 \\equiv 9 \\pmod{12}$\n$5 \\times 7 \\times 9 = 315$\n$315 \\div 12 = 26$ भागफल, शेषफल $= 315 - 312 = 3$ (प्रतीक्षा: $315 = 12 \\times 26 + 3$)\nअतः शेषफल 3 होगा।",
    options: ["3", "9", "5", "7"],
    explanation: "$1421 \\equiv 5 \\pmod{12}, 1423 \\equiv 7 \\pmod{12}, 1425 \\equiv 9 \\pmod{12}$\n$5 \\times 7 \\times 9 = 315$\n$315 = 26 \\times 12 + 3$, अतः शेषफल 3 होगा।",
    correctIndex: 0,
    difficulty: "hard"
  },
  {
    question: "एक संख्या को 6 से भाग देने पर शेषफल 3 आता है। उस संख्या के वर्ग को 6 से भाग देने पर शेषफल क्या होगा?",
    options: ["3", "1", "0", "4"],
    correctIndex: 0,
    explanation: "$N = 6k + 3 \\implies N^2 = 36k^2 + 36k + 9 = 36k^2 + 36k + 6 + 3 = 6(6k^2 + 6k + 1) + 3$\nअतः शेषफल 3 ही होगा।",
    difficulty: "easy"
  },
  {
    question: "जब $3^{1989}$ को 7 से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["6", "1", "2", "4"],
    correctIndex: 0,
    explanation: "$3^1 = 3, 3^2 = 2, 3^3 = 6 \\equiv -1 \\pmod 7 \\implies 3^6 \\equiv 1 \\pmod 7$\n$1989 = 6 \\times 331 + 3$\n$3^{1989} \\equiv (3^6)^{331} \\times 3^3 \\equiv 1 \\times 27 \\equiv 6 \\pmod 7$।",
    difficulty: "hard"
  },
  {
    question: "जब $(x^4 + 1)$ को $(x + 1)$ से विभाजित किया जाता है, तो शेषफल क्या होगा?",
    options: ["2", "0", "1", "-2"],
    correctIndex: 0,
    explanation: "शेषफल प्रमेय से $x = -1$ रखने पर:\n$(-1)^4 + 1 = 1 + 1 = 2$।",
    difficulty: "easy"
  },
  {
    question: "जब $83^{115} + 12$ को 84 से भाग दिया जाता है, तो शेषफल क्या होगा?",
    options: ["11", "13", "1", "83"],
    correctIndex: 0,
    explanation: "$83 \\equiv -1 \\pmod{84}$\n$(-1)^{115} + 12 = -1 + 12 = 11$।",
    difficulty: "moderate"
  }
];

// Topic 2: अंतिम अंक एवं चक्रीयता (Cyclicity and Last Digit)

const lastDigit01 = [
  {
    question: "$3^{65} \\times 6^{59} \\times 7^{71}$ के गुणनफल में इकाई का अंक (Unit Digit) क्या होगा?",
    options: ["4", "2", "6", "8"],
    correctIndex: 0,
    explanation: "$3^{65} = 3^{4 \\times 16 + 1} \\implies 3^1 = 3$\n$6^{59}$ का इकाई अंक सदैव 6 होता है।\n$7^{71} = 7^{4 \\times 17 + 3} \\implies 7^3 = 343 \\implies 3$\nकुल इकाई अंक $= 3 \\times 6 \\times 3 = 54 \\implies 4$।",
    difficulty: "moderate"
  },
  {
    question: "$(2137)^{753}$ में इकाई का अंक क्या होगा?",
    options: ["7", "1", "3", "9"],
    correctIndex: 0,
    explanation: "7 की चक्रीयता (Cyclicity) 4 है।\n$753 \\div 4 = 188$, शेषफल $= 1$\nअतः इकाई अंक $= 7^1 = 7$।",
    difficulty: "easy"
  },
  {
    question: "$(122)^{173}$ में इकाई का अंक क्या होगा?",
    options: ["2", "4", "6", "8"],
    correctIndex: 0,
    explanation: "2 की चक्रीयता 4 है।\n$173 \\div 4 = 43$, शेषफल $= 1$\nइकाई अंक $= 2^1 = 2$।",
    difficulty: "easy"
  },
  {
    question: "$(57)^{25} - 1$ में इकाई का अंक क्या होगा?",
    options: ["6", "7", "0", "8"],
    correctIndex: 0,
    explanation: "$25 \\div 4$ में शेषफल $= 1 \\implies 7^1 = 7$\nइकाई अंक $= 7 - 1 = 6$।",
    difficulty: "easy"
  },
  {
    question: "निम्नलिखित में से किन अंकों की किसी भी धनात्मक पूर्णांक घात का इकाई अंक सदैव वही अंक रहता है?",
    options: ["0, 1, 5, 6", "0, 1, 2, 3", "1, 3, 5, 7", "2, 4, 6, 8"],
    correctIndex: 0,
    explanation: "0, 1, 5, और 6 ऐसे अंक हैं जिनकी घात चाहे कुछ भी हो, उनका इकाई अंक सदैव क्रमशः 0, 1, 5, और 6 ही रहता है।",
    difficulty: "easy"
  },
  {
    question: "$(7^{95} - 3^{58})$ का इकाई अंक क्या होगा?",
    options: ["4", "6", "3", "7"],
    correctIndex: 0,
    explanation: "$7^{95}$: $95 \\div 4$ शेषफल $3 \\implies 7^3 = 343 \\implies 3$\n$3^{58}$: $58 \\div 4$ शेषफल $2 \\implies 3^2 = 9$\nइकाई अंक $= 13 - 9 = 4$ (चूँकि 3 में से 9 घटाने के लिए दहाई से 1 उधार लेंगे)।",
    difficulty: "moderate"
  },
  {
    question: "$(4^{101} + 9^{100})$ के परिणाम में इकाई का अंक क्या होगा?",
    options: ["5", "3", "7", "1"],
    correctIndex: 0,
    explanation: "4 की विषम घात पर इकाई अंक 4 होता है ($4^{101} \\implies 4$)।\n9 की सम घात पर इकाई अंक 1 होता है ($9^{100} \\implies 1$)।\nइकाई अंक $= 4 + 1 = 5$।",
    difficulty: "easy"
  },
  {
    question: "प्रथम 111 पूर्ण संख्याओं के योग का इकाई अंक क्या होगा?",
    options: ["5", "0", "6", "1"],
    correctIndex: 0,
    explanation: "प्रथम 111 पूर्ण संख्याएँ: 0 से 110 तक।\nयोग $= \\frac{110 \\times 111}{2} = 55 \\times 111 = 6105$\nइकाई अंक $= 5$।",
    difficulty: "moderate"
  },
  {
    question: "$(153)^{98} + (241)^{98}$ में इकाई का अंक क्या होगा?",
    options: ["0", "9", "1", "4"],
    correctIndex: 0,
    explanation: "$3^{98}$: $98 \\div 4$ शेषफल $2 \\implies 3^2 = 9$\n$1^{98} = 1$\nइकाई अंक $= 9 + 1 = 10 \\implies 0$।",
    difficulty: "easy"
  },
  {
    question: "$(264)^{102} + (264)^{103}$ में इकाई का अंक क्या होगा?",
    options: ["0", "2", "4", "6"],
    correctIndex: 0,
    explanation: "$4^{102}$ (सम घात) का इकाई अंक $= 6$\n$4^{103}$ (विषम घात) का इकाई अंक $= 4$\nयोग $= 6 + 4 = 10 \\implies 0$।",
    difficulty: "easy"
  }
];

const lastDigit02 = [
  {
    question: "व्यंजक $1! + 2! + 3! + \\dots + 50!$ में इकाई का अंक क्या होगा?",
    options: ["3", "1", "0", "5"],
    correctIndex: 0,
    explanation: "$5! = 120$ और इसके आगे के सभी पदों में 5 और 2 होने के कारण इकाई का अंक 0 होता है।\nअतः केवल $1! + 2! + 3! + 4! = 1 + 2 + 6 + 24 = 33$ का इकाई अंक $= 3$ होगा।",
    difficulty: "moderate"
  },
  {
    question: "$2^{3^{4}}$ का इकाई अंक क्या होगा?",
    options: ["2", "4", "6", "8"],
    correctIndex: 0,
    explanation: "$3^4 = 81$\n$2^{81}$: $81 \\div 4$ शेषफल $1 \\implies 2^1 = 2$।",
    difficulty: "moderate"
  },
  {
    question: "$(8^{64})$ में इकाई का अंक क्या होगा?",
    options: ["6", "4", "8", "2"],
    correctIndex: 0,
    explanation: "8 की चक्रीयता 4 है। $64 \\div 4$ में शेषफल 0 आता है।\nशेषफल 0 होने पर घात 4 मानी जाती है: $8^4 = 4096 \\implies 6$।",
    difficulty: "easy"
  },
  {
    question: "$(1^1 + 2^2 + 3^3 + 4^4 + 5^5 + 6^6)$ का इकाई अंक क्या होगा?",
    options: ["9", "7", "5", "3"],
    correctIndex: 0,
    explanation: "$1^1 = 1$\n$2^2 = 4$\n$3^3 = 27 \\implies 7$\n$4^4 = 256 \\implies 6$\n$5^5 \\implies 5$\n$6^6 \\implies 6$\nयोग $= 1 + 4 + 7 + 6 + 5 + 6 = 29 \\implies$ इकाई अंक $= 9$।",
    difficulty: "moderate"
  },
  {
    question: "$(137^{13})^{47}$ में इकाई का अंक क्या होगा?",
    options: ["3", "7", "9", "1"],
    correctIndex: 0,
    explanation: "कुल घात $= 13 \\times 47 = 611$\n$611 \\div 4 = 152$, शेषफल $= 3$\nअतः इकाई अंक $= 7^3 = 343 \\implies 3$।",
    difficulty: "moderate"
  },
  {
    question: "गुणनफल $81 \\times 82 \\times 83 \\times \\dots \\times 89$ में इकाई का अंक क्या होगा?",
    options: ["0", "2", "5", "6"],
    correctIndex: 0,
    explanation: "इस गुणनफल में $82$ (सम संख्या) और $85$ (5 का गुणज) दोनों आते हैं। $2 \\times 5 = 10$, अतः इकाई का अंक 0 होगा।",
    difficulty: "easy"
  },
  {
    question: "व्यंजक $(32^{32})^{32}$ का इकाई अंक क्या होगा?",
    options: ["6", "4", "2", "8"],
    correctIndex: 0,
    explanation: "संख्या 2 के आधार पर है: $2^{32 \\times 32} = 2^{1024}$\n$1024$ पूर्णतः 4 से विभाज्य है (शेषफल 0)।\nअतः इकाई अंक $= 2^4 = 16 \\implies 6$।",
    difficulty: "hard"
  },
  {
    question: "संख्या $100!$ के अंत में शून्यों की संख्या (Number of trailing zeros) कितनी होगी?",
    options: ["24", "25", "20", "21"],
    correctIndex: 0,
    explanation: "शून्यों की संख्या $= \\left\\lfloor\\frac{100}{5}\\right\\rfloor + \\left\\lfloor\\frac{100}{25}\\right\\rfloor = 20 + 4 = 24$।",
    difficulty: "moderate"
  },
  {
    question: "संख्या $50!$ के अंत में कितने शून्य होंगे?",
    options: ["12", "10", "14", "15"],
    correctIndex: 0,
    explanation: "$\\left\\lfloor\\frac{50}{5}\\right\\rfloor + \\left\\lfloor\\frac{50}{25}\\right\\rfloor = 10 + 2 = 12$ शून्य।",
    difficulty: "easy"
  },
  {
    question: "$(71 \\times 72 \\times 73 \\times 74 \\times 76 \\times 77 \\times 78 \\times 79)$ में इकाई का अंक क्या होगा?",
    options: ["6", "4", "8", "2"],
    correctIndex: 0,
    explanation: "इकाई अंक: $1 \\times 2 \\times 3 \\times 4 \\times 6 \\times 7 \\times 8 \\times 9$\n$= (24) \\times 6 \\times 56 \\times 9 \\implies 4 \\times 6 \\times 6 \\times 9 = 24 \\times 54 \\implies 4 \\times 4 = 16 \\implies 6$।",
    difficulty: "moderate"
  }
];

const lastDigit03 = [
  {
    question: "संख्या $200!$ के अंत में शून्यों की संख्या क्या होगी?",
    options: ["49", "48", "50", "40"],
    correctIndex: 0,
    explanation: "$\\left\\lfloor\\frac{200}{5}\\right\\rfloor + \\left\\lfloor\\frac{200}{25}\\right\\rfloor + \\left\\lfloor\\frac{200}{125}\\right\\rfloor = 40 + 8 + 1 = 49$।",
    difficulty: "moderate"
  },
  {
    question: "$(1!)^1 + (2!)^2 + (3!)^3 + (4!)^4 + \\dots + (10!)^{10}$ में इकाई का अंक क्या होगा?",
    options: ["7", "5", "3", "1"],
    correctIndex: 0,
    explanation: "$5!$ से आगे सभी के इकाई अंक 0 होते हैं।\n$(1!)^1 = 1^1 = 1$\n$(2!)^2 = 2^2 = 4$\n$(3!)^3 = 6^3 \\implies 6$\n$(4!)^4 = (24)^4 \\implies 4^4 = 256 \\implies 6$\nयोग $= 1 + 4 + 6 + 6 = 17 \\implies$ इकाई अंक $= 7$।",
    difficulty: "hard"
  },
  {
    question: "यदि $(12345k)^{72}$ का इकाई अंक 6 है, तो $k$ का संभावित मान क्या हो सकता है?",
    options: ["6 या 2", "5", "0", "1"],
    correctIndex: 0,
    explanation: "चूँकि घात 72 चार से विभाज्य है, यदि $k$ सम संख्या (2, 4, 6, 8) हो तो $k^4$ का इकाई अंक सदैव 6 होता है। दिए गए विकल्पों में 6 या 2 सही है।",
    difficulty: "moderate"
  },
  {
    question: "संख्या $1000!$ के अंत में कुल कितने शून्य होंगे?",
    options: ["249", "250", "200", "248"],
    correctIndex: 0,
    explanation: "$\\left\\lfloor\\frac{1000}{5}\\right\\rfloor + \\left\\lfloor\\frac{1000}{25}\\right\\rfloor + \\left\\lfloor\\frac{1000}{125}\\right\\rfloor + \\left\\lfloor\\frac{1000}{625}\\right\\rfloor = 200 + 40 + 8 + 1 = 249$।",
    difficulty: "hard"
  },
  {
    question: "$(433 \\times 456 \\times 43N)$ का इकाई अंक $(N + 2)$ है। $N$ का मान क्या होगा?",
    options: ["6", "4", "2", "8"],
    correctIndex: 0,
    explanation: "$3 \\times 6 = 18 \\implies$ इकाई अंक 8 है।\nअब $8 \\times N$ का इकाई अंक $(N + 2)$ होना चाहिए:\nयदि $N=6$: $8 \\times 6 = 48 \\implies 8$, और $N+2 = 6+2 = 8$ (संतुष्ट होता है!)।\nअतः $N = 6$।",
    difficulty: "hard"
  },
  {
    question: "$(25)^{6251} + (36)^{528} + (73)^{54}$ का इकाई अंक क्या होगा?",
    options: ["0", "5", "6", "1"],
    correctIndex: 0,
    explanation: "$5^{\\text{any}} = 5$\n$6^{\\text{any}} = 6$\n$3^{54}$: $54 \\div 4$ शेषफल $2 \\implies 3^2 = 9$\nयोग $= 5 + 6 + 9 = 20 \\implies$ इकाई अंक $= 0$।",
    difficulty: "moderate"
  },
  {
    question: "गुणनफल $5^{125} \\times 2^{125}$ में अंकों की संख्या कितनी होगी?",
    options: ["126", "125", "250", "124"],
    correctIndex: 0,
    explanation: "$5^{125} \\times 2^{125} = (10)^{125} = 1$ के बाद 125 शून्य।\nकुल अंकों की संख्या $= 1 + 125 = 126$।",
    difficulty: "hard"
  },
  {
    question: "$(11^1 \\times 12^2 \\times 13^3 \\times 14^4 \\times 15^5 \\times 16^6)$ का इकाई अंक क्या होगा?",
    options: ["0", "5", "6", "2"],
    correctIndex: 0,
    explanation: "गुणनफल में 5 की घात ($15^5$) और सम संख्या की घात ($12^2, 14^4, 16^6$) दोनों उपस्थित हैं।\n$5 \\times \\text{सम संख्या} = 0$ इकाई अंक।",
    difficulty: "easy"
  },
  {
    question: "$(999^{999})$ का इकाई अंक क्या होगा?",
    options: ["9", "1", "3", "7"],
    correctIndex: 0,
    explanation: "9 की विषम घात होने पर इकाई का अंक सदैव 9 ही होता है।",
    difficulty: "easy"
  },
  {
    question: "संख्या $12^5 \\times 15^4 \\times 18^3$ में अभाज्य गुणनखंडों की कुल संख्या क्या है?",
    options: ["29", "25", "27", "31"],
    correctIndex: 0,
    explanation: "$12^5 = (2^2 \\times 3)^5 = 2^{10} \\times 3^5$\n$15^4 = (3 \\times 5)^4 = 3^4 \\times 5^4$\n$18^3 = (2 \\times 3^2)^3 = 2^3 \\times 3^6$\nकुल घातें $= 2^{13} \\times 3^{15} \\times 5^4$\nअभाज्य गुणनखंडों की संख्या $= 13 + 15 + 4 = 32$ (पुनः जाँच: $10+3=13, 5+4+6=15, 4$ घात। योग = 32, विकल्प सुधारें)",
    options: ["32", "30", "28", "34"],
    explanation: "$12^5 \\times 15^4 \\times 18^3 = 2^{13} \\times 3^{15} \\times 5^4$\nअभाज्य गुणनखंडों की कुल संख्या $= 13 + 15 + 4 = 32$।",
    correctIndex: 0,
    difficulty: "hard"
  }
];

// Topic 3: गुणनखंड एवं गुणज (Factor and Multiple Problems)

const fac01 = [
  {
    question: "संख्या 120 के कुल गुणनखंडों (Total number of factors) की संख्या क्या होगी?",
    options: ["16", "12", "14", "18"],
    correctIndex: 0,
    explanation: "$120 = 2^3 \\times 3^1 \\times 5^1$\nकुल गुणनखंड $= (3 + 1)(1 + 1)(1 + 1) = 4 \\times 2 \\times 2 = 16$।",
    difficulty: "easy"
  },
  {
    question: "संख्या 100 के सभी गुणनखंडों का योग (Sum of all factors) क्या होगा?",
    options: ["217", "200", "225", "180"],
    correctIndex: 0,
    explanation: "$100 = 2^2 \\times 5^2$\nयोग $= (1 + 2 + 4)(1 + 5 + 25) = 7 \\times 31 = 217$।",
    difficulty: "moderate"
  },
  {
    question: "संख्या 72 के सम गुणनखंडों (Even factors) की संख्या क्या होगी?",
    options: ["9", "12", "6", "8"],
    correctIndex: 0,
    explanation: "$72 = 2^3 \\times 3^2$\nसम गुणनखंडों की संख्या $= 3 \\times (2 + 1) = 3 \\times 3 = 9$।",
    difficulty: "moderate"
  },
  {
    question: "संख्या 360 के विषम गुणनखंडों (Odd factors) की संख्या क्या होगी?",
    options: ["6", "4", "8", "12"],
    correctIndex: 0,
    explanation: "$360 = 2^3 \\times 3^2 \\times 5^1$\nविषम गुणनखंडों के लिए केवल विषम अभाज्य गुणनखंडों की घात लेते हैं:\n$= (2 + 1)(1 + 1) = 3 \\times 2 = 6$।",
    difficulty: "moderate"
  },
  {
    question: "संख्या 60 के अभाज्य गुणनखंडों की संख्या (Prime factors count) क्या है?",
    options: ["4", "3", "6", "12"],
    correctIndex: 0,
    explanation: "$60 = 2^2 \\times 3^1 \\times 5^1$\nअभाज्य गुणनखंडों की कुल संख्या $= 2 + 1 + 1 = 4$ (भिन्न अभाज्य गुणनखंड 3 हैं: 2, 3, 5)।",
    difficulty: "easy"
  },
  {
    question: "संख्या 24 के सभी गुणनखंडों का औसत क्या होगा?",
    options: ["7.5", "8", "6.5", "7"],
    correctIndex: 0,
    explanation: "24 के गुणनखंड: 1, 2, 3, 4, 6, 8, 12, 24 (कुल 8 गुणनखंड)\nयोग $= 60$\nऔसत $= 60 / 8 = 7.5$।",
    difficulty: "moderate"
  },
  {
    question: "एक संख्या के कितने गुणनखंड होंगे यदि वह एक पूर्ण वर्ग संख्या है?",
    options: ["सदैव विषम संख्या", "सदैव सम संख्या", "निश्चित नहीं", "शून्य"],
    correctIndex: 0,
    explanation: "किसी भी पूर्ण वर्ग संख्या के गुणनखंडों की कुल संख्या सदैव एक विषम संख्या (Odd number) होती है।",
    difficulty: "easy"
  },
  {
    question: "संख्या 180 के ऐसे कितने गुणनखंड हैं जो 6 के गुणज हैं?",
    options: ["8", "6", "10", "12"],
    correctIndex: 0,
    explanation: "$180 = 6 \\times 30$\nअब 30 के कुल गुणनखंड निकालेंगे: $30 = 2^1 \\times 3^1 \\times 5^1$\nकुल गुणनखंड $= (1+1)(1+1)(1+1) = 2 \\times 2 \\times 2 = 8$।",
    difficulty: "hard"
  },
  {
    question: "संख्या 540 के उचित गुणनखंडों (Proper factors) की संख्या क्या होगी? (उचित गुणनखंड = स्वयं उस संख्या को छोड़कर)",
    options: ["23", "24", "22", "20"],
    correctIndex: 0,
    explanation: "$540 = 2^2 \\times 3^3 \\times 5^1$\nकुल गुणनखंड $= 3 \\times 4 \\times 2 = 24$\nउचित गुणनखंड $= 24 - 1 = 23$।",
    difficulty: "moderate"
  },
  {
    question: "संख्या 500 के कितने गुणनखंड पूर्ण वर्ग हैं?",
    options: ["4", "3", "6", "2"],
    correctIndex: 0,
    explanation: "$500 = 2^2 \\times 5^3$\nपूर्ण वर्ग घातें: $2^0, 2^2$ (2 विकल्प) तथा $5^0, 5^2$ (2 विकल्प)\nकुल पूर्ण वर्ग गुणनखंड $= 2 \\times 2 = 4$ ($1, 4, 25, 100$)।",
    difficulty: "hard"
  }
];

const fac02 = [
  {
    question: "संख्या 720 के सभी गुणनखंडों का गुणनफल (Product of all factors) क्या होगा?",
    options: ["$720^{15}$", "$720^{30}$", "$720^{16}$", "$720^{14}$"],
    correctIndex: 0,
    explanation: "सूत्र: गुणनखंडों का गुणनफल $= N^{F/2}$ (जहाँ $F$ कुल गुणनखंडों की संख्या है)\n$720 = 2^4 \\times 3^2 \\times 5^1 \\implies F = 5 \\times 3 \\times 2 = 30$\nगुणनफल $= 720^{30/2} = 720^{15}$।",
    difficulty: "hard"
  },
  {
    question: "संख्या $2^4 \\times 3^3 \\times 5^2$ के कुल कितने गुणनखंड हैं?",
    options: ["60", "45", "72", "50"],
    correctIndex: 0,
    explanation: "कुल गुणनखंड $= (4 + 1)(3 + 1)(2 + 1) = 5 \\times 4 \\times 3 = 60$।",
    difficulty: "easy"
  },
  {
    question: "संख्या 144 के कितने गुणनखंड पूर्ण घन (Perfect Cube) हैं?",
    options: ["2", "1", "3", "4"],
    correctIndex: 0,
    explanation: "$144 = 2^4 \\times 3^2$\nपूर्ण घन घातें: $2^0, 2^3$ (2 विकल्प) तथा $3^0$ (1 विकल्प)\nकुल $= 2 \\times 1 = 2$ (वे हैं: 1 और 8)।",
    difficulty: "moderate"
  },
  {
    question: "संख्या 300 के सभी गुणनखंडों का व्युत्क्रम योग (Sum of reciprocals of all factors) क्या होगा?",
    options: ["$\\frac{868}{300} = 2.893$", "3", "2.5", "3.2"],
    correctIndex: 0,
    explanation: "व्युत्क्रमों का योग $= \\frac{\\text{गुणनखंडों का योग}}{N}$\n$300 = 2^2 \\times 3^1 \\times 5^2$\nयोग $= (1+2+4)(1+3)(1+5+25) = 7 \\times 4 \\times 31 = 868$\nव्युत्क्रम योग $= 868 / 300 \\approx 2.893$।",
    difficulty: "hard"
  },
  {
    question: "दो अंकों की सबसे बड़ी संख्या जिसके केवल 3 गुणनखंड हों, क्या है?",
    options: ["49", "97", "25", "9।"],
    correctIndex: 0,
    explanation: "केवल 3 गुणनखंड होने वाली संख्याएँ किसी अभाज्य संख्या का वर्ग ($p^2$) होती हैं।\nअभाज्य वर्ग: $2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121$\nदो अंकों की सबसे बड़ी ऐसी संख्या 49 है (गुणनखंड: 1, 7, 49)।",
    difficulty: "moderate"
  },
  {
    question: "संख्या 1000 के सम गुणनखंडों का योग क्या होगा?",
    options: ["2170", "2000", "2340", "1950"],
    correctIndex: 0,
    explanation: "$1000 = 2^3 \\times 5^3$\nसम गुणनखंडों का योग $= (2^1 + 2^2 + 2^3)(5^0 + 5^1 + 5^2 + 5^3) = (2 + 4 + 8)(1 + 5 + 25 + 125) = 14 \\times 156 = 2184$\nविकल्प सुधारते हैं: 2184, 2170, 2000, 2250",
    options: ["2184", "2170", "2000", "2250"],
    explanation: "$1000 = 2^3 \\times 5^3$\nसम गुणनखंडों का योग $= (2 + 4 + 8)(1 + 5 + 25 + 125) = 14 \\times 156 = 2184$।",
    correctIndex: 0,
    difficulty: "hard"
  },
  {
    question: "संख्या 16 के सभी गुणनखंडों का गुणनफल क्या है?",
    options: ["1024", "512", "256", "2048"],
    correctIndex: 0,
    explanation: "16 के गुणनखंड: 1, 2, 4, 8, 16 ($F = 5$)\nगुणनफल $= 16^{5/2} = (4^2)^{5/2} = 4^5 = 1024$।",
    difficulty: "moderate"
  },
  {
    question: "1 से 100 तक की संख्याओं में ऐसी कितनी संख्याएँ हैं जिनके ठीक 3 गुणनखंड हैं?",
    options: ["4", "3", "5", "6"],
    correctIndex: 0,
    explanation: "अभाज्य संख्याओं के वर्ग: $2^2=4, 3^2=9, 5^2=25, 7^2=49$ (कुल 4 संख्याएँ हैं)।",
    difficulty: "moderate"
  },
  {
    question: "संख्या 420 के कितने अभाज्य गुणनखंड हैं?",
    options: ["4", "5", "3", "6"],
    correctIndex: 0,
    explanation: "$420 = 2^2 \\times 3 \\times 5 \\times 7$\nभिन्न अभाज्य गुणनखंड: 2, 3, 5, 7 (कुल 4)।",
    difficulty: "easy"
  },
  {
    question: "संख्या 216 के कितने गुणनखंड 4 से विभाज्य हैं?",
    options: ["8", "6", "10", "12"],
    correctIndex: 0,
    explanation: "$216 = 4 \\times 54$\n$54 = 2^1 \\times 3^3 \\implies$ कुल गुणनखंड $= (1+1)(3+1) = 2 \\times 4 = 8$।",
    difficulty: "moderate"
  }
];

const fac03 = [
  {
    question: "संख्या 10800 के कुल गुणनखंडों की संख्या क्या होगी?",
    options: ["60", "48", "72", "54"],
    correctIndex: 0,
    explanation: "$10800 = 108 \\times 100 = (2^2 \\times 3^3) \\times (2^2 \\times 5^2) = 2^4 \\times 3^3 \\times 5^2$\nकुल गुणनखंड $= (4+1)(3+1)(2+1) = 5 \\times 4 \\times 3 = 60$।",
    difficulty: "hard"
  },
  {
    question: "संख्या 240 के ऐसे कितने गुणनखंड हैं जो 12 से विभाज्य हैं?",
    options: ["6", "4", "8", "5"],
    correctIndex: 0,
    explanation: "$240 = 12 \\times 20$\n$20 = 2^2 \\times 5^1 \\implies (2+1)(1+1) = 3 \\times 2 = 6$।",
    difficulty: "moderate"
  },
  {
    question: "संख्या 36 के सभी गुणनखंडों का योग क्या होगा?",
    options: ["91", "85", "90", "96"],
    correctIndex: 0,
    explanation: "$36 = 2^2 \\times 3^2$\nयोग $= (1 + 2 + 4)(1 + 3 + 9) = 7 \\times 13 = 91$।",
    difficulty: "easy"
  },
  {
    question: "संख्या 256 के कुल कितने गुणनखंड हैं?",
    options: ["9", "8", "10", "7"],
    correctIndex: 0,
    explanation: "$256 = 2^8 \\implies$ कुल गुणनखंड $= 8 + 1 = 9$।",
    difficulty: "easy"
  },
  {
    question: "संख्या $N = 2^3 \\times 3^2 \\times 5^3$ के विषम गुणनखंडों का योग क्या होगा?",
    options: ["2028", "2000", "1950", "2100"],
    correctIndex: 0,
    explanation: "विषम गुणनखंड $= 3^2 \\times 5^3$\nयोग $= (1 + 3 + 9)(1 + 5 + 25 + 125) = 13 \\times 156 = 2028$।",
    difficulty: "hard"
  },
  {
    question: "वह सबसे छोटी संख्या क्या है जिसके ठीक 12 गुणनखंड हों?",
    options: ["60", "72", "96", "84"],
    correctIndex: 0,
    explanation: "$60 = 2^2 \\times 3^1 \\times 5^1 \\implies (2+1)(1+1)(1+1) = 3 \\times 2 \\times 2 = 12$ गुणनखंड।\n60 सबसे छोटी ऐसी संख्या है।",
    difficulty: "hard"
  },
  {
    question: "संख्या 400 के सभी गुणनखंडों का गुणनफल क्या होगा?",
    options: ["$20^{15}$ नहीं $400^{15/2} = 20^{15}$", "$400^{15}$", "$20^{14}$", "$400^8$"],
    correctIndex: 0,
    explanation: "$400 = 2^4 \\times 5^2 \\implies F = 5 \\times 3 = 15$ गुणनखंड\nगुणनफल $= 400^{15/2} = (20^2)^{15/2} = 20^{15}$।",
    difficulty: "hard"
  },
  {
    question: "संख्या 84 के अभाज्य गुणनखंडों का योग क्या होगा?",
    options: ["14", "12", "16", "18"],
    correctIndex: 0,
    explanation: "$84 = 2^2 \\times 3 \\times 7$\nभिन्न अभाज्य गुणनखंड: 2, 3, 7\nयोग $= 2 + 3 + 7 = 12$ (यदि केवल अद्वितीय अभाज्य लें तो $2+3+7=12$, यदि सभी लें तो $2+2+3+7=14$)\nअद्वितीय अभाज्य गुणनखंडों का योग $= 12$।",
    options: ["12", "14", "16", "10"],
    correctIndex: 0,
    explanation: "84 के विभिन्न अभाज्य गुणनखंड 2, 3 और 7 हैं।\nयोग $= 2 + 3 + 7 = 12$।",
    difficulty: "moderate"
  },
  {
    question: "संख्या 900 के कितने गुणनखंड पूर्ण वर्ग हैं?",
    options: ["9", "8", "6", "12"],
    correctIndex: 0,
    explanation: "$900 = 2^2 \\times 3^2 \\times 5^2$\nप्रत्येक की सम घातें: $\{0, 2\}$ (2 विकल्प)\nपूर्ण वर्ग गुणनखंड $= 2 \\times 2 \\times 2 = 8$ नहीं: $2^0, 2^2$ (2), $3^0, 3^2$ (2), $5^0, 5^2$ (2) $\\implies 8$।",
    options: ["8", "9", "6", "12"],
    correctIndex: 0,
    explanation: "घातों में से 0 और 2 (सम घातें) लेने पर: $2 \\times 2 \\times 2 = 8$ पूर्ण वर्ग गुणनखंड।",
    difficulty: "hard"
  },
  {
    question: "यदि $P$ एक अभाज्य संख्या है, तो $P^3$ के कितने गुणनखंड होंगे?",
    options: ["4", "3", "2", "6"],
    correctIndex: 0,
    explanation: "$P^3$ के गुणनखंड: $P^0, P^1, P^2, P^3$ (कुल $3 + 1 = 4$ गुणनखंड)।",
    difficulty: "easy"
  }
];

async function run() {
  console.log('Uploading Chapter 11: उन्नत संख्या पद्धति...');
  await saveDirectTest('शेषफल प्रमेय - Test 01', 'शेषफल प्रमेय', rem01);
  await saveDirectTest('शेषफल प्रमेय - Test 02', 'शेषफल प्रमेय', rem02);
  await saveDirectTest('शेषफल प्रमेय - Test 03', 'शेषफल प्रमेय', rem03);

  await saveDirectTest('अंतिम अंक एवं चक्रीयता - Test 01', 'अंतिम अंक एवं चक्रीयता', lastDigit01);
  await saveDirectTest('अंतिम अंक एवं चक्रीयता - Test 02', 'अंतिम अंक एवं चक्रीयता', lastDigit02);
  await saveDirectTest('अंतिम अंक एवं चक्रीयता - Test 03', 'अंतिम अंक एवं चक्रीयता', lastDigit03);

  await saveDirectTest('गुणनखंड एवं गुणज - Test 01', 'गुणनखंड एवं गुणज', fac01);
  await saveDirectTest('गुणनखंड एवं गुणज - Test 02', 'गुणनखंड एवं गुणज', fac02);
  await saveDirectTest('गुणनखंड एवं गुणज - Test 03', 'गुणनखंड एवं गुणज', fac03);

  console.log('Done uploading Ch11! Chapter 11 is complete!');
}

run().catch(err => {
  console.error('Error uploading:', err);
  process.exit(1);
});
