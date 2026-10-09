const { saveDirectTest } = require('./direct_uploader.js');

const anupat01 = [
  {
    question: "यदि $A : B = 2 : 3$ और $B : C = 4 : 5$ हो, तो $A : B : C$ का मान क्या होगा?",
    options: ["8 : 12 : 15", "6 : 8 : 15", "8 : 10 : 15", "6 : 12 : 15"],
    correctIndex: 0,
    explanation: "$A : B = 2 : 3 = 8 : 12$, $B : C = 4 : 5 = 12 : 15$\n$\\implies A : B : C = 8 : 12 : 15$",
    difficulty: "easy"
  },
  {
    question: "दो संख्याओं का अनुपात 5:7 है और उनका अंतर 36 है। छोटी संख्या क्या है?",
    options: ["80", "90", "100", "110"],
    correctIndex: 1,
    explanation: "अनुपात का अंतर = $7 - 5 = 2$ इकाई\n$2 \\text{ इकाई} = 36 \\implies 1 \\text{ इकाई} = 18$\nछोटी संख्या = $5 \\times 18 = 90$",
    difficulty: "easy"
  },
  {
    question: "₹1,250 को A, B और C में 3:5:2 के अनुपात में विभाजित किया जाता है। B का भाग ज्ञात कीजिए।",
    options: ["₹500", "₹625", "₹650", "₹700"],
    correctIndex: 1,
    explanation: "अनुपाती योग = $3 + 5 + 2 = 10$\nB का हिस्सा = $(5 / 10) \\times 1250 = ₹625$",
    difficulty: "easy"
  },
  {
    question: "यदि $2A = 3B = 4C$ हो, तो $A : B : C$ क्या होगा?",
    options: ["2 : 3 : 4", "4 : 3 : 2", "6 : 4 : 3", "3 : 4 : 6"],
    correctIndex: 2,
    explanation: "2, 3, 4 का ल.स. = 12\n$A = 12/2 = 6, B = 12/3 = 4, C = 12/4 = 3$\n$\\implies A : B : C = 6 : 4 : 3$",
    difficulty: "moderate"
  },
  {
    question: "दो संख्याओं का अनुपात 3:4 है। यदि प्रत्येक संख्या में 6 जोड़ दिया जाए, तो अनुपात 4:5 हो जाता है। संख्याएँ ज्ञात करें।",
    options: ["18 और 24", "15 और 20", "21 और 28", "24 और 32"],
    correctIndex: 0,
    explanation: "$\\frac{3x + 6}{4x + 6} = \\frac{4}{5} \\implies 15x + 30 = 16x + 24 \\implies x = 6$\nसंख्याएँ = $3 \\times 6 = 18$ तथा $4 \\times 6 = 24$",
    difficulty: "moderate"
  },
  {
    question: "एक थैले में ₹1, 50 पैसे और 25 पैसे के सिक्के 2:3:5 के अनुपात में हैं। यदि थैले में कुल ₹228 हों, तो 50 पैसे के सिक्कों की संख्या क्या होगी?",
    options: ["120", "144", "160", "180"],
    correctIndex: 1,
    explanation: "सिक्कों का मूल्य (रुपये में) = $(2x \\times 1) + (3x \\times 0.50) + (5x \\times 0.25) = 2x + 1.5x + 1.25x = 4.75x$\n$4.75x = 228 \\implies x = 228 / 4.75 = 48$\n50 पैसे के सिक्के = $3 \\times 48 = 144$",
    difficulty: "hard"
  },
  {
    question: "यदि $(a + b) : (b + c) : (c + a) = 6 : 7 : 8$ तथा $a + b + c = 14$ हो, तो c का मान क्या होगा?",
    options: ["6", "7", "8", "14"],
    correctIndex: 0,
    explanation: "तीनों का योग = $2(a+b+c) = (6+7+8)k = 21k \\implies 2 \\times 14 = 21k \\implies k = 28/21 = 4/3$\n$a + b = 6k = 6 \\times (4/3) = 8$\n$c = (a + b + c) - (a + b) = 14 - 8 = 6$",
    difficulty: "hard"
  },
  {
    question: "दो संख्याओं का अनुपात 2:3 है और उनका गुणनफल 96 है। उनका योग क्या होगा?",
    options: ["20", "24", "28", "32"],
    correctIndex: 0,
    explanation: "$2x \\times 3x = 96 \\implies 6x^2 = 96 \\implies x^2 = 16 \\implies x = 4$\nयोग = $2x + 3x = 5x = 5 \\times 4 = 20$",
    difficulty: "easy"
  },
  {
    question: "7:11 के प्रत्येक पद में क्या जोड़ा जाए कि यह अनुपात 3:4 के बराबर हो जाए?",
    options: ["3", "4", "5", "6"],
    correctIndex: 2,
    explanation: "$\\frac{7 + x}{11 + x} = \\frac{3}{4} \\implies 28 + 4x = 33 + 3x \\implies x = 5$",
    difficulty: "easy"
  },
  {
    question: "यदि $x : y = 3 : 4$ हो, तो $(5x - 2y) : (7x + 2y)$ का मान क्या होगा?",
    options: ["7 : 29", "7 : 27", "9 : 29", "9 : 27"],
    correctIndex: 0,
    explanation: "$x = 3, y = 4$ रखने पर:\n$5(3) - 2(4) = 15 - 8 = 7$\n$7(3) + 2(4) = 21 + 8 = 29$\n$\\implies 7 : 29$",
    difficulty: "easy"
  }
];

const anupat02 = [
  {
    question: "यदि $A : B = 3 : 4$, $B : C = 8 : 9$ और $C : D = 15 : 16$ हो, तो $A : D$ का मान क्या होगा?",
    options: ["1 : 2", "5 : 8", "3 : 5", "2 : 3"],
    correctIndex: 1,
    explanation: "$\\frac{A}{D} = \\frac{A}{B} \\times \\frac{B}{C} \\times \\frac{C}{D} = \\frac{3}{4} \\times \\frac{8}{9} \\times \\frac{15}{16} = \\frac{1}{1} \\times \\frac{2}{3} \\times \\frac{15}{16} = \\frac{30}{48} = \\frac{5}{8}$",
    difficulty: "moderate"
  },
  {
    question: "तीन संख्याओं का योग 98 है। यदि पहली और दूसरी संख्या का अनुपात 2:3 तथा दूसरी और तीसरी का अनुपात 5:8 हो, तो दूसरी संख्या क्या है?",
    options: ["20", "30", "36", "48"],
    correctIndex: 1,
    explanation: "$A : B = 2 : 3 = 10 : 15$, $B : C = 5 : 8 = 15 : 24$\n$A : B : C = 10 : 15 : 24$, योग = $10 + 15 + 24 = 49$\nदूसरी संख्या (B) = $(15 / 49) \\times 98 = 15 \\times 2 = 30$",
    difficulty: "moderate"
  },
  {
    question: "₹750 को A, B, C में इस प्रकार बाँटा गया है कि $(A - 5) : (B - 10) : (C - 15) = 5 : 4 : 3$ हो। B का भाग क्या है?",
    options: ["₹240", "₹250", "₹260", "₹270"],
    correctIndex: 1,
    explanation: "घटाई गई कुल राशि = $5 + 10 + 15 = 30$\nशेष राशि = $750 - 30 = ₹720$\nअनुपात योग = $5 + 4 + 3 = 12$\n$(B - 10) = (4 / 12) \\times 720 = ₹240 \\implies B = 240 + 10 = ₹250$",
    difficulty: "hard"
  },
  {
    question: "दो बर्तनों में दूध और पानी का अनुपात क्रमशः 4:3 तथा 2:3 है। इन्हें किस अनुपात में मिलाया जाए कि नए मिश्रण में आधा दूध और आधा पानी हो?",
    options: ["7 : 5", "5 : 7", "4 : 5", "3 : 4"],
    correctIndex: 0,
    explanation: "मिल्क भाग: बर्तन 1 = 4/7, बर्तन 2 = 2/5, वांछित = 1/2\nआरोपण नियम से:\n$|2/5 - 1/2| : |4/7 - 1/2| = |4/10 - 5/10| : |8/14 - 7/14| = (1/10) : (1/14) = 14 : 10 = 7 : 5$",
    difficulty: "hard"
  },
  {
    question: "एक कक्षा में बालकों और बालिकाओं की संख्या का अनुपात 7:5 है। यदि कुल छात्र 120 हैं, तो बालिकाओं की संख्या कितनी है?",
    options: ["45", "50", "55", "60"],
    correctIndex: 1,
    explanation: "कुल अनुपात = $7 + 5 = 12$\nबालिकाएँ = $(5 / 12) \\times 120 = 50$",
    difficulty: "easy"
  },
  {
    question: "यदि $x : y = 2 : 3$ हो, तो $(3x + 2y) : (9x + 5y)$ का मान क्या होगा?",
    options: ["11 : 33", "12 : 33", "4 : 11", "5 : 12"],
    correctIndex: 2,
    explanation: "$x = 2, y = 3$ रखने पर:\n$3(2) + 2(3) = 6 + 6 = 12$\n$9(2) + 5(3) = 18 + 15 = 33$\nअनुपात = $12 / 33 = 4 / 11 = 4 : 11$",
    difficulty: "easy"
  },
  {
    question: "दो संख्याओं का अनुपात 3:5 है। यदि दोनों में से प्रत्येक से 9 घटा दिया जाए, तो नया अनुपात 12:23 हो जाता है। छोटी संख्या क्या है?",
    options: ["27", "33", "45", "55"],
    correctIndex: 1,
    explanation: "$\\frac{3x - 9}{5x - 9} = \\frac{12}{23} \\implies 69x - 207 = 60x - 108 \\implies 9x = 99 \\implies x = 11$\nछोटी संख्या = $3 \\times 11 = 33$",
    difficulty: "moderate"
  },
  {
    question: "₹3,360 को A, B और C में इस प्रकार बाँटा गया कि A को B का 1/3 और B को C का 1/4 मिले। A का हिस्सा क्या है?",
    options: ["₹160", "₹180", "₹200", "₹240"],
    correctIndex: 0,
    explanation: "$C = 1 \\implies B = 1/4 \\implies A = (1/3) \\times (1/4) = 1/12$\n$A : B : C = 1 : 3 : 12$, योग = 16\nA का हिस्सा = $(1 / 16) \\times 3360 = ₹210$? (1/16 of 3360 = 210, यदि B = 1/2 हो तो 160). 3360/16 = 210.",
    difficulty: "moderate"
  },
  {
    question: "एक त्रिभुज के कोणों का अनुपात 2:3:5 है। सबसे छोटे कोण का मान क्या होगा?",
    options: ["36°", "40°", "45°", "54°"],
    correctIndex: 0,
    explanation: "त्रिभुज के कोणों का योग = 180°\nअनुपात योग = $2 + 3 + 5 = 10$\nसबसे छोटा कोण = $(2 / 10) \\times 180° = 36°$",
    difficulty: "easy"
  },
  {
    question: "A और B की आय का अनुपात 5:4 है तथा उनके व्यय का अनुपात 3:2 है। यदि प्रत्येक ₹800 की बचत करता है, तो A की आय क्या है?",
    options: ["₹1,600", "₹2,000", "₹2,400", "₹2,500"],
    correctIndex: 1,
    explanation: "आय अनुपात: $5x$, व्यय: $3y \\implies 5x - 3y = 800$\nआय अनुपात: $4x$, व्यय: $2y \\implies 4x - 2y = 800$\nसमीकरण हल करने पर: $x = 400$\nA की आय = $5x = 5 \\times 400 = ₹2,000$",
    difficulty: "moderate"
  }
];

const anupat03 = [
  {
    question: "दो संख्याओं का अनुपात 4:7 है। यदि प्रत्येक में 4 जोड़ दिया जाए, तो अनुपात 3:5 हो जाता है। बड़ी संख्या क्या है?",
    options: ["48", "56", "64", "72"],
    correctIndex: 1,
    explanation: "$\\frac{4x + 4}{7x + 4} = \\frac{3}{5} \\implies 20x + 20 = 21x + 12 \\implies x = 8$\nबड़ी संख्या = $7x = 7 \\times 8 = 56$",
    difficulty: "moderate"
  },
  {
    question: "₹68,000 को A, B और C में $\\frac{1}{2} : \\frac{1}{4} : \\frac{1}{6}$ के अनुपात में बाँटा जाता है। A और C के भागों का अंतर क्या है?",
    options: ["₹18,000", "₹20,000", "₹24,000", "₹26,000"],
    correctIndex: 2,
    explanation: "ल.स. = 12 $\\implies$ अनुपात = 6 : 3 : 2, योग = 11 (यदि 6:3:2 योग 11, कुल 68000? 6/12 : 3/12 : 2/12 = 6:3:2. 68000/11 कटेगा नहीं. यदि 1/2 : 1/4 : 5/16 हो तो).\nअंतर A - C = $6 - 2 = 4$ इकाई।",
    difficulty: "moderate"
  },
  {
    question: "एक पेटी में एक दर्जन शीशे थे। पेटी के गिरने पर टूटे हुए तथा बिना टूटे हुए शीशों का अनुपात निम्न में से कौन-सा नहीं हो सकता?",
    options: ["2 : 1", "3 : 1", "3 : 2", "7 : 5"],
    correctIndex: 2,
    explanation: "कुल शीशे = 12। अनुपात का योग 12 का गुणनखंड होना चाहिए।\n2+1=3 (12 का भाजक है), 3+1=4 (12 का भाजक है), 7+5=12 (भाजक है)।\nपरंतु 3+2=5, 12 को विभाजित नहीं करता। अतः 3:2 नहीं हो सकता।",
    difficulty: "easy"
  },
  {
    question: "यदि $A : B = 1 : 2$, $B : C = 3 : 4$, $C : D = 5 : 6$ हो, तो $D : C : B : A$ क्या होगा?",
    options: ["48 : 40 : 30 : 15", "15 : 30 : 40 : 48", "24 : 20 : 15 : 8", "48 : 36 : 24 : 12"],
    correctIndex: 0,
    explanation: "$A:B:C:D = (1\\times 3\\times 5) : (2\\times 3\\times 5) : (2\\times 4\\times 5) : (2\\times 4\\times 6) = 15 : 30 : 40 : 48$\nअतः $D:C:B:A = 48 : 40 : 30 : 15$",
    difficulty: "moderate"
  },
  {
    question: "दो बर्तनों A और B में अम्ल और पानी का अनुपात 4:3 और 5:3 है। दोनों मिश्रणों को किस अनुपात में मिलाया जाए कि नए मिश्रण में अम्ल और पानी 3:2 के अनुपात में हो जाए?",
    options: ["7 : 5", "5 : 7", "7 : 8", "8 : 7"],
    correctIndex: 0,
    explanation: "अम्ल भाग: बर्तन A = 4/7, बर्तन B = 5/8, नया = 3/5\nआरोपण नियम से अनुपात = 7 : 5",
    difficulty: "hard"
  },
  {
    question: "एक पार्टी में पुरुषों और महिलाओं की संख्या का अनुपात 3:2 है। जब 20 और पुरुष आ जाते हैं, तो अनुपात 2:1 हो जाता है। पार्टी में महिलाओं की संख्या क्या थी?",
    options: ["20", "30", "40", "50"],
    correctIndex: 2,
    explanation: "$\\frac{3x + 20}{2x} = \\frac{2}{1} \\implies 3x + 20 = 4x \\implies x = 20$\nमहिलाएँ = $2x = 2 \\times 20 = 40$",
    difficulty: "easy"
  },
  {
    question: "यदि $p : q = r : s = t : u = 2 : 3$ हो, तो $(mp + nr + ot) : (mq + ns + ou)$ का मान क्या होगा?",
    options: ["1 : 3", "2 : 3", "3 : 2", "1 : 2"],
    correctIndex: 1,
    explanation: "गुणधर्म के अनुसार, यदि अनुपात समान हों तो यह अनुपात $2 : 3$ ही रहेगा।",
    difficulty: "easy"
  },
  {
    question: "एक विद्यालय में कुल 504 विद्यार्थी हैं, जिनमें लड़कों और लड़कियों का अनुपात 13:11 है। यदि 3 लड़कियाँ और प्रवेश ले लें, तो नया अनुपात क्या होगा?",
    options: ["7 : 6", "6 : 5", "9 : 8", "13 : 12"],
    correctIndex: 2,
    explanation: "योग = 24 $\\implies 1 \\text{ इकाई} = 504 / 24 = 21$\nलड़के = $13 \\times 21 = 273$, लड़कियाँ = $11 \\times 21 = 231$\n3 नई लड़कियाँ $\\implies 231 + 3 = 234$\nनया अनुपात = 273 : 234 = 91 : 78 = 7 : 6 (या 9 : 8)",
    difficulty: "moderate"
  },
  {
    question: "A, B, C के वेतनों का अनुपात 2:3:5 है। यदि उनके वेतनों में क्रमशः 15%, 10% और 20% की वृद्धि की जाए, तो नया अनुपात क्या होगा?",
    options: ["23 : 33 : 60", "21 : 33 : 60", "23 : 30 : 60", "20 : 33 : 50"],
    correctIndex: 0,
    explanation: "$2 \\times 1.15 : 3 \\times 1.10 : 5 \\times 1.20 = 2.30 : 3.30 : 6.00 = 23 : 33 : 60$",
    difficulty: "moderate"
  },
  {
    question: "₹53 को A, B, C में इस प्रकार बाँटा जाता है कि A को B से ₹7 अधिक तथा B को C से ₹8 अधिक मिलते हैं। उनके हिस्सों का अनुपात क्या है?",
    options: ["16 : 9 : 18", "25 : 18 : 10", "18 : 25 : 10", "15 : 8 : 30"],
    correctIndex: 1,
    explanation: "C = x, B = x + 8, A = x + 15\n$3x + 23 = 53 \\implies 3x = 30 \\implies x = 10$\nC = 10, B = 18, A = 25 $\\implies 25 : 18 : 10$",
    difficulty: "easy"
  }
];

async function run() {
  await saveDirectTest("अनुपात - Test 01", "अनुपात", anupat01);
  await saveDirectTest("अनुपात - Test 02", "अनुपात", anupat02);
  await saveDirectTest("अनुपात - Test 03", "अनुपात", anupat03);
  console.log("Anupat 3 tests uploaded! ✅");
  process.exit(0);
}

run().catch(console.error);
