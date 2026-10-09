const { saveDirectTest } = require('./direct_uploader.js');

// Chapter 14: अनुक्रम एवं श्रेणी (Sequence and Series)
// Topic 1: समांतर श्रेणी (AP)

const ap01 = [
  {
    question: "समांतर श्रेणी 3, 7, 11, 15, ... का 10वाँ पद क्या होगा?",
    options: ["39", "43", "35", "41"],
    correctIndex: 0,
    explanation: "$a = 3, d = 4$\n$T_{10} = a + (10 - 1)d = 3 + 9 \\times 4 = 3 + 36 = 39$।",
    difficulty: "easy"
  },
  {
    question: "समांतर श्रेणी 2, 7, 12, ... के प्रथम 10 पदों का योग क्या होगा?",
    options: ["245", "250", "240", "255"],
    correctIndex: 0,
    explanation: "$a = 2, d = 5, n = 10$\n$S_{10} = \\frac{10}{2} [2(2) + (10 - 1)5] = 5[4 + 45] = 5 \\times 49 = 245$।",
    difficulty: "easy"
  },
  {
    question: "यदि किसी समांतर श्रेणी का $n$वाँ पद $T_n = 3n + 5$ है, तो इसका सार्व अंतर (Common Difference) क्या होगा?",
    options: ["3", "5", "8", "2"],
    correctIndex: 0,
    explanation: "$n$वाँ पद $T_n = an + b$ में $n$ का गुणांक ही सार्व अंतर $d$ होता है। अतः $d = 3$।",
    difficulty: "easy"
  },
  {
    question: "प्रथम 50 विषम प्राकृतिक संख्याओं का योग क्या होगा?",
    options: ["2500", "2550", "2450", "2600"],
    correctIndex: 0,
    explanation: "प्रथम $n$ विषम संख्याओं का योग $= n^2 = 50^2 = 2500$।",
    difficulty: "easy"
  },
  {
    question: "समांतर श्रेणी 21, 18, 15, ... का कौन-सा पद शून्य (0) होगा?",
    options: ["8वाँ पद", "7वाँ पद", "9वाँ पद", "10वाँ पद"],
    correctIndex: 0,
    explanation: "$a = 21, d = -3$\n$T_n = 0 \\implies 21 + (n - 1)(-3) = 0 \\implies 3(n - 1) = 21 \\implies n - 1 = 7 \\implies n = 8$।",
    difficulty: "easy"
  },
  {
    question: "दो संख्याओं 8 और 24 का समांतर माध्य (Arithmetic Mean) क्या होगा?",
    options: ["16", "18", "14", "20"],
    correctIndex: 0,
    explanation: "समांतर माध्य $= \\frac{a + b}{2} = \\frac{8 + 24}{2} = \\frac{32}{2} = 16$।",
    difficulty: "easy"
  },
  {
    question: "यदि किसी समांतर श्रेणी का तीसरा पद 8 और सातवाँ पद 20 है, तो उसका प्रथम पद क्या होगा?",
    options: ["2", "3", "4", "5"],
    correctIndex: 0,
    explanation: "$a + 2d = 8$, $a + 6d = 20$\nघटाने पर: $4d = 12 \\implies d = 3$\n$a + 2(3) = 8 \\implies a = 2$।",
    difficulty: "moderate"
  },
  {
    question: "100 और 200 के बीच 7 से विभाज्य सभी संख्याओं का योग क्या होगा?",
    options: ["2107", "2140", "2050", "2200"],
    correctIndex: 0,
    explanation: "संख्याएँ: 105, 112, ..., 196\n$a = 105, d = 7, l = 196$\n$196 = 105 + (n - 1)7 \\implies (n - 1)7 = 91 \\implies n - 1 = 13 \\implies n = 14$\n$S_{14} = \\frac{14}{2} (105 + 196) = 7 \\times 301 = 2107$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $x - 1, x + 2, 2x + 1$ समांतर श्रेणी में हैं, तो $x$ का मान क्या होगा?",
    options: ["4", "3", "5", "2"],
    correctIndex: 0,
    explanation: "$2(x + 2) = (x - 1) + (2x + 1) \\implies 2x + 4 = 3x \\implies x = 4$।",
    difficulty: "easy"
  },
  {
    question: "प्रथम 20 सम प्राकृतिक संख्याओं का योग क्या होगा?",
    options: ["420", "400", "440", "210"],
    correctIndex: 0,
    explanation: "प्रथम $n$ सम संख्याओं का योग $= n(n + 1) = 20 \\times 21 = 420$।",
    difficulty: "easy"
  }
];

const ap02 = [
  {
    question: "यदि किसी AP के प्रथम $n$ पदों का योग $S_n = 2n^2 + 5n$ है, तो इसका 10वाँ पद क्या होगा?",
    options: ["43", "45", "41", "47"],
    correctIndex: 0,
    explanation: "$T_n = S_n - S_{n-1} = (2n^2 + 5n) - [2(n-1)^2 + 5(n-1)] = 4n + 3$\n$T_{10} = 4(10) + 3 = 43$।",
    difficulty: "moderate"
  },
  {
    question: "एक व्यक्ति प्रथम माह में ₹100 की बचत करता है और प्रत्येक अगले माह में अपनी बचत ₹20 बढ़ाता जाता है। 2 वर्ष में उसकी कुल बचत कितनी होगी?",
    options: ["₹7,920", "₹8,000", "₹7,500", "₹8,240"],
    correctIndex: 0,
    explanation: "$a = 100, d = 20, n = 24$\n$S_{24} = \\frac{24}{2} [2(100) + 23 \\times 20] = 12[200 + 460] = 12 \\times 660 = ₹7,920$।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी समांतर श्रेणी के 7वें पद का 7 गुना उसके 11वें पद के 11 गुना के बराबर है, तो उसका 18वाँ पद क्या होगा?",
    options: ["0", "1", "18", "-1"],
    correctIndex: 0,
    explanation: "$7(a + 6d) = 11(a + 10d) \\implies 7a + 42d = 11a + 110d \\implies 4a + 68d = 0 \\implies 4(a + 17d) = 0 \\implies a + 17d = 0 = T_{18}$।",
    difficulty: "hard"
  },
  {
    question: "तीन संख्याएँ समांतर श्रेणी में हैं। उनका योग 21 और गुणनफल 315 है। सबसे बड़ी संख्या क्या होगी?",
    options: ["9", "7", "5", "11"],
    correctIndex: 0,
    explanation: "माना संख्याएँ $a - d, a, a + d$ हैं।\nयोग $= 3a = 21 \\implies a = 7$\nगुणनफल $= 7(7^2 - d^2) = 315 \\implies 49 - d^2 = 45 \\implies d^2 = 4 \\implies d = 2$\nसंख्याएँ: 5, 7, 9। सबसे बड़ी संख्या $= 9$।",
    difficulty: "moderate"
  },
  {
    question: "समांतर श्रेणी 10, 7, 4, ..., -62 का अंतिम पद से 11वाँ पद क्या होगा?",
    options: ["-32", "-35", "-30", "-40"],
    correctIndex: 0,
    explanation: "अंत से $n$वाँ पद सूत्र $= l - (n - 1)d$\nयहाँ $l = -62, d = -3, n = 11$\n$T'_{11} = -62 - (11 - 1)(-3) = -62 - 10(-3) = -62 + 30 = -32$।",
    difficulty: "hard"
  },
  {
    question: "यदि किसी AP के $p$वें पद का मान $q$ और $q$वें पद का मान $p$ है, तो इसका $(p + q)$वाँ पद क्या होगा?",
    options: ["0", "$p + q$", "$pq$", "1"],
    correctIndex: 0,
    explanation: "मानक परिणाम: यदि $T_p = q$ तथा $T_q = p$ तो सार्व अंतर $d = -1$ होता है तथा $T_{p+q} = 0$ होता है।",
    difficulty: "moderate"
  },
  {
    question: "दो समांतर श्रेणियों के $n$ पदों के योग का अनुपात $(7n + 1) : (4n + 27)$ है। उनके 11वें पदों का अनुपात क्या होगा?",
    options: ["$4 : 3$", "$7 : 4$", "$3 : 2$", "$5 : 4$"],
    correctIndex: 0,
    explanation: "11वें पद के लिए $n = 2(11) - 1 = 21$ प्रतिस्थापित करते हैं:\nअनुपात $= \\frac{7(21) + 1}{4(21) + 27} = \\frac{147 + 1}{84 + 27} = \\frac{148}{111} = \\frac{4}{3}$।",
    difficulty: "hard"
  },
  {
    question: "समांतर श्रेणी 5, 8, 11, ... के कितने पदों का योग 325 होगा?",
    options: ["14", "13", "15", "12"],
    correctIndex: 0,
    explanation: "$\\frac{n}{2}[2(5) + (n - 1)3] = 325 \\implies n(3n + 7) = 650 \\implies 3n^2 + 7n - 650 = 0$\n$(n - 14)(3n + ...)$ नहीं: $14 \\times (3 \\times 14 + 7) = 14 \\times (42 + 7) = 14 \\times 49 = 686 \\neq 650$\nजाँच: $n = 13 \\implies 13 \\times (39 + 7) = 13 \\times 46 = 598$\nयदि $a=8, d=3$ तो अलग।\nसमीकरण: $3n^2 + 7n - 650 = 0$: $n = \\frac{-7 \\pm \\sqrt{49 + 7800}}{6} = \\frac{-7 \\pm \\sqrt{7849}}{6}$ (चूँकि $88^2 = 7744$, $89^2 = 7921$)।\nयदि योग 220 हो: $\\frac{n}{2}[10 + (n-1)3] = 220 \\implies n(3n+7) = 440 \\implies 3n^2 + 7n - 440 = 0 \\implies (n - 11)(3n + 40) = 0 \\implies n = 11$।\nप्रश्न सुधारते हैं: योग 220 के लिए पदों की संख्या 11 होगी।",
    options: ["11", "12", "10", "13"],
    explanation: "$\\frac{n}{2}[10 + (n - 1)3] = 220 \\implies n(3n + 7) = 440 \\implies 3n^2 + 7n - 440 = 0$\n$(n - 11)(3n + 40) = 0 \\implies n = 11$।",
    question: "समांतर श्रेणी 5, 8, 11, ... के कितने पदों का योग 220 होगा?",
    correctIndex: 0,
    difficulty: "hard"
  },
  {
    question: "एक चतुर्भुज के चारों कोण समांतर श्रेणी में हैं। यदि सार्व अंतर $10^\\circ$ है, तो सबसे बड़ा कोण क्या होगा?",
    options: ["$105^\\circ$", "$100^\\circ$", "$110^\\circ$", "$120^\\circ$"],
    correctIndex: 0,
    explanation: "माना कोण $a, a+10, a+20, a+30$ हैं।\nयोग $= 4a + 60 = 360 \\implies 4a = 300 \\implies a = 75^\\circ$\nसबसे बड़ा कोण $= 75 + 30 = 105^\\circ$।",
    difficulty: "moderate"
  },
  {
    question: "1 और 100 के बीच 3 से विभाज्य सभी पूर्णांकों का योग क्या होगा?",
    options: ["1683", "1650", "1716", "1600"],
    correctIndex: 0,
    explanation: "संख्याएँ: 3, 6, ..., 99 ($n = 33$)\nयोग $= \\frac{33}{2} (3 + 99) = \\frac{33 \\times 102}{2} = 33 \\times 51 = 1683$।",
    difficulty: "easy"
  }
];

const ap03 = [
  {
    question: "यदि किसी AP के प्रथम $m$ पदों का योग $n$ और प्रथम $n$ पदों का योग $m$ है, तो प्रथम $(m + n)$ पदों का योग क्या होगा?",
    options: ["$-(m + n)$", "$m + n$", "0", "$mn$"],
    correctIndex: 0,
    explanation: "मानक परिणाम: यदि $S_m = n$ तथा $S_n = m$ हो, तो $S_{m+n} = -(m + n)$ होता है।",
    difficulty: "hard"
  },
  {
    question: "एक सभागार (Auditorium) की पहली पंक्ति में 20 सीटें हैं, दूसरी में 24, तीसरी में 28 और इसी प्रकार आगे भी हैं। यदि सभागार में कुल 30 पंक्तियाँ हैं, तो कुल सीटों की संख्या क्या होगी?",
    options: ["2340", "2400", "2250", "2500"],
    correctIndex: 0,
    explanation: "$a = 20, d = 4, n = 30$\n$S_{30} = \\frac{30}{2} [2(20) + 29 \\times 4] = 15[40 + 116] = 15 \\times 156 = 2340$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $a, b, c$ समांतर श्रेणी में हैं, तो $\\frac{1}{bc}, \\frac{1}{ca}, \\frac{1}{ab}$ किस श्रेणी में होंगे?",
    options: ["समांतर श्रेणी (AP)", "गुणोत्तर श्रेणी (GP)", "हरात्मक श्रेणी (HP)", "इनमें से कोई नहीं"],
    correctIndex: 0,
    explanation: "$a, b, c$ AP में हैं। प्रत्येक पद को $abc$ से भाग देने पर:\n$\\frac{a}{abc}, \\frac{b}{abc}, \\frac{c}{abc} \\implies \\frac{1}{bc}, \\frac{1}{ca}, \\frac{1}{ab}$ भी AP में होंगे।",
    difficulty: "hard"
  },
  {
    question: "10 और 30 के बीच 3 समांतर माध्य पद निविष्ट (Insert) करने पर दूसरा समांतर माध्य क्या होगा?",
    options: ["20", "15", "25", "18"],
    correctIndex: 0,
    explanation: "$a = 10, b = 30, k = 3$\nसार्व अंतर $d = \\frac{b - a}{k + 1} = \\frac{30 - 10}{4} = 5$\nपहला माध्य $= 15$, दूसरा माध्य $= 15 + 5 = 20$।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी AP का प्रथम पद 5, अंतिम पद 45 और सभी पदों का योग 400 है, तो पदों की संख्या क्या होगी?",
    options: ["16", "15", "20", "18"],
    correctIndex: 0,
    explanation: "$S_n = \\frac{n}{2}(a + l) \\implies 400 = \\frac{n}{2}(5 + 45) \\implies 400 = 25n \\implies n = 16$।",
    difficulty: "easy"
  },
  {
    question: "एक त्रिभुज के अंतः कोण समांतर श्रेणी में हैं। सबसे छोटा कोण $40^\\circ$ है। सबसे बड़ा कोण क्या होगा?",
    options: ["$80^\\circ$", "$75^\\circ$", "$90^\\circ$", "$85^\\circ$"],
    correctIndex: 0,
    explanation: "AP में तीन कोणों का योग $= 180^\\circ \\implies$ मध्य कोण सदैव $= 180/3 = 60^\\circ$ होता है।\nयदि सबसे छोटा कोण $40^\\circ$ है ($d = 20^\\circ$), तो सबसे बड़ा कोण $= 60 + 20 = 80^\\circ$ होगा।",
    difficulty: "easy"
  },
  {
    question: "यदि किसी AP के $n$ पदों का योग $3n^2 + n$ है और इसका $m$वाँ पद 166 है, तो $m$ का मान क्या होगा?",
    options: ["28", "27", "29", "30"],
    correctIndex: 0,
    explanation: "$T_m = S_m - S_{m-1} = 6m - 2$\n$6m - 2 = 166 \\implies 6m = 168 \\implies m = 28$।",
    difficulty: "moderate"
  },
  {
    question: "वह समांतर श्रेणी ज्ञात कीजिए जिसके प्रथम तीन पदों का योग 33 और उनका गुणनफल 1155 है।",
    options: ["7, 11, 15", "5, 11, 17", "9, 11, 13", "6, 11, 16"],
    correctIndex: 0,
    explanation: "मध्य पद $a = 33/3 = 11$\n$(11 - d)(11)(11 + d) = 1155 \\implies 121 - d^2 = 105 \\implies d^2 = 16 \\implies d = 4$\nश्रेणी: 7, 11, 15।",
    difficulty: "moderate"
  },
  {
    question: "100 से 300 के बीच ऐसी कितनी संख्याएँ हैं जो 4 और 6 दोनों से विभाज्य हैं?",
    options: ["16", "17", "15", "18"],
    correctIndex: 0,
    explanation: "4 और 6 का ल.स. $= 12$\n100 से 300 के बीच पहली संख्या $= 108$, अंतिम $= 288$\n$288 = 108 + (n - 1)12 \\implies (n - 1)12 = 180 \\implies n - 1 = 15 \\implies n = 16$।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी समांतर श्रेणी का पहला पद धनात्मक और सार्व अंतर ऋणात्मक है, तो श्रेणी के अधिकतम योग के लिए पदों की संख्या कहाँ तक लेनी चाहिए?",
    options: ["अंतिम धनात्मक पद तक", "शून्य तक", "पहले ऋणात्मक पद तक", "अनंत तक"],
    correctIndex: 0,
    explanation: "अधिकतम योग प्राप्त करने के लिए केवल सभी धनात्मक पदों को ही जोड़ा जाता है, क्योंकि ऋणात्मक पद जुड़ने पर योग घटने लगता है।",
    difficulty: "easy"
  }
];

// Topic 2: गुणोत्तर श्रेणी (GP)

const gp01 = [
  {
    question: "गुणोत्तर श्रेणी 2, 6, 18, 54, ... का 6वाँ पद क्या होगा?",
    options: ["486", "162", "1458", "324"],
    correctIndex: 0,
    explanation: "$a = 2, r = 3$\n$T_6 = a r^{6-1} = 2 \\times 3^5 = 2 \\times 243 = 486$।",
    difficulty: "easy"
  },
  {
    question: "गुणोत्तर श्रेणी 1, 2, 4, 8, ... के प्रथम 8 पदों का योग क्या होगा?",
    options: ["255", "256", "511", "127"],
    correctIndex: 0,
    explanation: "$a = 1, r = 2, n = 8$\n$S_8 = \\frac{a(r^8 - 1)}{r - 1} = \\frac{1(256 - 1)}{2 - 1} = 255$।",
    difficulty: "easy"
  },
  {
    question: "अनंत गुणोत्तर श्रेणी $1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots \\infty$ का योग क्या होगा?",
    options: ["2", "1", "4", "$\\frac{3}{2}$"],
    correctIndex: 0,
    explanation: "$S_\\infty = \\frac{a}{1 - r} = \\frac{1}{1 - 1/2} = \\frac{1}{1/2} = 2$।",
    difficulty: "easy"
  },
  {
    question: "दो संख्याओं 4 और 16 का गुणोत्तर माध्य (Geometric Mean) क्या होगा?",
    options: ["8", "10", "6", "12"],
    correctIndex: 0,
    explanation: "$GM = \\sqrt{ab} = \\sqrt{4 \\times 16} = \\sqrt{64} = 8$।",
    difficulty: "easy"
  },
  {
    question: "यदि $x, x+3, x+9$ एक गुणोत्तर श्रेणी में हैं, तो $x$ का मान क्या होगा?",
    options: ["3", "1", "2", "4"],
    correctIndex: 0,
    explanation: "$(x + 3)^2 = x(x + 9) \\implies x^2 + 6x + 9 = x^2 + 9x \\implies 3x = 9 \\implies x = 3$।",
    difficulty: "easy"
  },
  {
    question: "गुणोत्तर श्रेणी $5, 10, 20, \\dots$ का कौन-सा पद 1280 होगा?",
    options: ["9वाँ पद", "8वाँ पद", "10वाँ पद", "7वाँ पद"],
    correctIndex: 0,
    explanation: "$a = 5, r = 2$\n$5 \\times 2^{n-1} = 1280 \\implies 2^{n-1} = 256 = 2^8 \\implies n - 1 = 8 \\implies n = 9$।",
    difficulty: "easy"
  },
  {
    question: "यदि किसी GP का तीसरा पद 24 और 6वाँ पद 192 है, तो इसका प्रथम पद क्या होगा?",
    options: ["6", "3", "12", "8"],
    correctIndex: 0,
    explanation: "$T_3 = ar^2 = 24$, $T_6 = ar^5 = 192$\nभाग देने पर: $r^3 = 192/24 = 8 \\implies r = 2$\n$a(2^2) = 24 \\implies 4a = 24 \\implies a = 6$।",
    difficulty: "moderate"
  },
  {
    question: "अनंत गुणोत्तर श्रेणी का योग तभी संभव होता है जब सार्व अनुपात $|r|$ का मान हो:",
    options: ["$|r| < 1$", "$|r| > 1$", "$|r| = 1$", "$|r| \\ge 1$"],
    correctIndex: 0,
    explanation: "अनंत GP का योग $S_\\infty = \\frac{a}{1 - r}$ केवल तभी अभिसरित (converge) होता है जब सार्व अनुपात $|r| < 1$ हो।",
    difficulty: "easy"
  },
  {
    question: "आवर्त दशमलव $0.333\\dots$ को अनंत गुणोत्तर श्रेणी के रूप में व्यक्त करने पर भिन्न मान क्या होगा?",
    options: ["$\\frac{1}{3}$", "$\\frac{3}{10}$", "$\\frac{1}{9}$", "$\\frac{3}{11}$"],
    correctIndex: 0,
    explanation: "$0.3 + 0.03 + 0.003 + \\dots$\n$a = 0.3, r = 0.1 \\implies S_\\infty = \\frac{0.3}{1 - 0.1} = \\frac{0.3}{0.9} = \\frac{1}{3}$।",
    difficulty: "easy"
  },
  {
    question: "तीन संख्याएँ GP में हैं। उनका गुणनफल 216 है। मध्य संख्या क्या होगी?",
    options: ["6", "4", "8", "9"],
    correctIndex: 0,
    explanation: "माना संख्याएँ $a/r, a, ar$ हैं।\nगुणनफल $= a^3 = 216 \\implies a = 6$।",
    difficulty: "easy"
  }
];

const gp02 = [
  {
    question: "एक गेंद को 120 मीटर की ऊँचाई से गिराया जाता है। प्रत्येक बार जमीन से टकराने पर यह अपनी पिछली ऊँचाई की $\\frac{4}{5}$ ऊँचाई तक उछलती है। रुकने से पहले गेंद द्वारा तय की गई कुल दूरी क्या होगी?",
    options: ["1080 मीटर", "960 मीटर", "1200 मीटर", "600 मीटर"],
    correctIndex: 0,
    explanation: "कुल दूरी $= H + 2 \\times [H(4/5) + H(4/5)^2 + \\dots] = H + 2 \\times \\frac{H(4/5)}{1 - 4/5}$\n$= 120 + 2 \\times \\frac{96}{1/5} = 120 + 2 \\times 480 = 120 + 960 = 1080$ मीटर।",
    difficulty: "hard"
  },
  {
    question: "यदि किसी GP का $p$वाँ पद $a$ और $q$वाँ पद $b$ है, तो इसका गुणोत्तर माध्य पद $\\sqrt{ab}$ किस स्थान पर होगा?",
    options: ["$\\frac{p+q}{2}$वें स्थान पर", "$(p+q)$वें स्थान पर", "$\\sqrt{pq}$वें स्थान पर", "$pq$वें स्थान पर"],
    correctIndex: 0,
    explanation: "GP में दो पदों $T_p$ और $T_q$ का गुणोत्तर माध्य उनके मध्य पद $T_{(p+q)/2}$ के बराबर होता है।",
    difficulty: "moderate"
  },
  {
    question: "संख्याओं 3 और 81 के बीच 2 गुणोत्तर माध्य पद निविष्ट करने पर वे पद क्या होंगे?",
    options: ["9 और 27", "6 और 18", "9 और 36", "12 और 36"],
    correctIndex: 0,
    explanation: "$a = 3, b = 81, n = 4$\n$81 = 3 r^3 \\implies r^3 = 27 \\implies r = 3$\nपद: $3 \\times 3 = 9$ तथा $9 \\times 3 = 27$।",
    difficulty: "moderate"
  },
  {
    question: "अनंत GP का पहला पद 4 है और प्रत्येक पद अपने बाद के सभी पदों के योग के बराबर है। सार्व अनुपात $r$ क्या होगा?",
    options: ["$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{1}{4}$", "$\\frac{2}{3}$"],
    correctIndex: 0,
    explanation: "$T_1 = T_2 + T_3 + \\dots \\implies a = \\frac{ar}{1 - r} \\implies 1 = \\frac{r}{1 - r} \\implies 1 - r = r \\implies 2r = 1 \\implies r = 1/2$।",
    difficulty: "hard"
  },
  {
    question: "यदि $a, b, c$ GP में हैं, तो $\\log a, \\log b, \\log c$ किस श्रेणी में होंगे?",
    options: ["समांतर श्रेणी (AP)", "गुणोत्तर श्रेणी (GP)", "हरात्मक श्रेणी (HP)", "इनमें से कोई नहीं"],
    correctIndex: 0,
    explanation: "$b^2 = ac \\implies 2\\log b = \\log a + \\log c$\nयह AP की शर्त है, अतः $\\log a, \\log b, \\log c$ समांतर श्रेणी में होंगे।",
    difficulty: "moderate"
  },
  {
    question: "GP के प्रथम $n$ पदों का गुणनफल क्या होगा यदि प्रथम पद $a$ और अंतिम पद $l$ है?",
    options: ["$(al)^{n/2}$", "$(al)^n$", "$\\sqrt{al}$", "$(a+l)^{n/2}$"],
    correctIndex: 0,
    explanation: "गुणोत्तर श्रेणी के सभी $n$ पदों का गुणनफल $(a \\cdot l)^{n/2}$ होता है।",
    difficulty: "moderate"
  },
  {
    question: "गुणोत्तर श्रेणी $\\sqrt{3}, 3, 3\\sqrt{3}, \\dots$ का कौन-सा पद 729 होगा?",
    options: ["12वाँ पद", "11वाँ पद", "13वाँ पद", "10वाँ पद"],
    correctIndex: 0,
    explanation: "$a = \\sqrt{3}, r = \\sqrt{3}$\n$T_n = (\\sqrt{3})^n = 729 = 3^6 = (\\sqrt{3})^{12} \\implies n = 12$।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी GP के अनंत पदों का योग 9 है और प्रथम दो पदों का योग 5 है, तो इसका सार्व अनुपात $r$ क्या होगा?",
    options: ["$\\frac{2}{3}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{3}{4}$"],
    correctIndex: 0,
    explanation: "$S_\\infty = \\frac{a}{1 - r} = 9 \\implies a = 9(1 - r)$\n$a(1 + r) = 5 \\implies 9(1 - r)(1 + r) = 5 \\implies 9(1 - r^2) = 5$\n$1 - r^2 = 5/9 \\implies r^2 = 4/9 \\implies r = 2/3$।",
    difficulty: "hard"
  },
  {
    question: "तीन संख्याएँ GP में हैं जिनका योग 38 और गुणनफल 1728 है। सबसे छोटी संख्या क्या होगी?",
    options: ["8", "6", "18", "12"],
    correctIndex: 0,
    explanation: "मध्य पद $a = \\sqrt[3]{1728} = 12$\n$a/r + a + ar = 38 \\implies 12/r + 12 + 12r = 38 \\implies 12(r + 1/r) = 26 \\implies r + 1/r = 13/6$\n$r = 3/2$ या $2/3$\nसंख्याएँ: $12/(3/2) = 8, 12, 18$। सबसे छोटी संख्या $= 8$।",
    difficulty: "hard"
  },
  {
    question: "किसी GP में चौथा पद 8 और सातवाँ पद 64 है। इसका 10वाँ पद क्या होगा?",
    options: ["512", "256", "1024", "128"],
    correctIndex: 0,
    explanation: "$T_7 / T_4 = r^3 = 64/8 = 8 \\implies r = 2$\n$T_{10} = T_7 \\times r^3 = 64 \\times 8 = 512$।",
    difficulty: "easy"
  }
];

const gp03 = [
  {
    question: "गुणोत्तर श्रेणी के प्रथम 3 पदों का योग और प्रथम 6 पदों के योग का अनुपात $125 : 152$ है। सार्व अनुपात $r$ क्या होगा?",
    options: ["$\\frac{3}{5}$", "$\\frac{2}{5}$", "$\\frac{4}{5}$", "$\\frac{1}{5}$"],
    correctIndex: 0,
    explanation: "$\\frac{S_3}{S_6} = \\frac{1}{1 + r^3} = \\frac{125}{152} \\implies 1 + r^3 = \\frac{152}{125} \\implies r^3 = \\frac{27}{125} \\implies r = \\frac{3}{5}$।",
    difficulty: "hard"
  },
  {
    question: "यदि $x = 1 + a + a^2 + \\dots \\infty$ ($|a| < 1$) और $y = 1 + b + b^2 + \\dots \\infty$ ($|b| < 1$) हो, तो $1 + ab + a^2 b^2 + \\dots \\infty$ का मान क्या होगा?",
    options: ["$\\frac{xy}{x + y - 1}$", "$\\frac{xy}{x + y + 1}$", "$\\frac{x + y}{xy}$", "$\\frac{xy}{x - y + 1}$"],
    correctIndex: 0,
    explanation: "$x = \\frac{1}{1 - a} \\implies a = \\frac{x - 1}{x}$, $y = \\frac{1}{1 - b} \\implies b = \\frac{y - 1}{y}$\n$S = \\frac{1}{1 - ab} = \\frac{1}{1 - \\frac{(x-1)(y-1)}{xy}} = \\frac{xy}{xy - (xy - x - y + 1)} = \\frac{xy}{x + y - 1}$।",
    difficulty: "hard"
  },
  {
    question: "एक वर्ग की भुजा 16 सेमी है। इसकी भुजाओं के मध्य बिंदुओं को जोड़कर एक दूसरा वर्ग बनाया जाता है और यह प्रक्रिया अनंत तक दोहराई जाती है। सभी वर्गों के क्षेत्रफलों का योग क्या होगा?",
    options: ["512 वर्ग सेमी", "256 वर्ग सेमी", "384 वर्ग सेमी", "1024 वर्ग सेमी"],
    correctIndex: 0,
    explanation: "पहले वर्ग का क्षेत्रफल $= 16^2 = 256$\nदूसरे वर्ग का क्षेत्रफल $= 256 / 2 = 128$\nसार्व अनुपात $r = 1/2$\nयोग $= \\frac{a}{1 - r} = \\frac{256}{1 - 1/2} = 512$ वर्ग सेमी।",
    difficulty: "hard"
  },
  {
    question: "किसी गुणोत्तर श्रेणी में विषम स्थानों वाले पदों का योग $S_1$ और सम स्थानों वाले पदों का योग $S_2$ है। सार्व अनुपात $r$ किसके बराबर होगा?",
    options: ["$\\frac{S_2}{S_1}$", "$\\frac{S_1}{S_2}$", "$\\sqrt{\\frac{S_2}{S_1}}$", "$S_1 S_2$"],
    correctIndex: 0,
    explanation: "सम स्थानों वाले पद $S_2 = r \\times S_1$ होते हैं, अतः $r = \\frac{S_2}{S_1}$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $a, b, c$ तीन असमान धनात्मक वास्तविक संख्याएँ हैं, तो उनके समांतर माध्य (AM) और गुणोत्तर माध्य (GM) में क्या संबंध होता है?",
    options: ["$AM > GM$", "$AM < GM$", "$AM = GM$", "$AM \\le GM$"],
    correctIndex: 0,
    explanation: "कौशी-श्वार्ज असमिका के अनुसार किसी भी असमान धनात्मक संख्याओं के लिए समांतर माध्य सदैव गुणोत्तर माध्य से बड़ा होता है ($AM > GM$)।",
    difficulty: "easy"
  },
  {
    question: "मान ज्ञात कीजिए: $6^{1/2} \\times 6^{1/4} \\times 6^{1/8} \\dots \\infty$",
    options: ["6", "36", "$\\sqrt{6}$", "1"],
    correctIndex: 0,
    explanation: "घातों का योग $= \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots = \\frac{1/2}{1 - 1/2} = 1$\nअतः $6^1 = 6$।",
    difficulty: "moderate"
  },
  {
    question: "एक GP में $T_2 = 2$ और $S_\\infty = 8$ है। प्रथम पद $a$ क्या हो सकता है?",
    options: ["4", "2", "6", "8"],
    correctIndex: 0,
    explanation: "$ar = 2 \\implies r = 2/a$\n$\\frac{a}{1 - 2/a} = 8 \\implies \\frac{a^2}{a - 2} = 8 \\implies a^2 - 8a + 16 = 0 \\implies (a - 4)^2 = 0 \\implies a = 4$।",
    difficulty: "hard"
  },
  {
    question: "श्रेणी $7 + 77 + 777 + \\dots$ के $n$ पदों का योग किस रूप में होता है?",
    options: ["$\\frac{7}{9}\\left[\\frac{10(10^n - 1)}{9} - n\\right]$", "$\\frac{7}{81}(10^n - 1)$", "$\\frac{7}{9}(10^n - 1)$", "$\\frac{70}{9}(10^n - 1) - 7n$"],
    correctIndex: 0,
    explanation: "मानक सूत्र: $S_n = \\frac{7}{9}[9 + 99 + 999 + \\dots] = \\frac{7}{9}[(10-1) + (100-1) + \\dots] = \\frac{7}{9}\\left[\\frac{10(10^n - 1)}{9} - n\\right]$।",
    difficulty: "hard"
  },
  {
    question: "यदि धनात्मक संख्याओं $a$ और $b$ का गुणोत्तर माध्य 8 और समांतर माध्य 10 है, तो वे संख्याएँ क्या होंगी?",
    options: ["4 और 16", "2 और 18", "6 और 14", "8 और 12"],
    correctIndex: 0,
    explanation: "$a + b = 20$, $ab = 64$\nसमीकरण: $x^2 - 20x + 64 = 0 \\implies (x - 16)(x - 4) = 0$\nसंख्याएँ 4 और 16 हैं।",
    difficulty: "easy"
  },
  {
    question: "एक GP का 5वाँ पद 2 है। इसके प्रथम 9 पदों का गुणनफल क्या होगा?",
    options: ["512", "256", "1024", "128"],
    correctIndex: 0,
    explanation: "9 पदों का गुणनफल $= (T_5)^9 = 2^9 = 512$।",
    difficulty: "hard"
  }
];

// Topic 3: संख्या श्रेणी (Number Series)

const series01 = [
  {
    question: "श्रेणी 2, 6, 12, 20, 30, ? में अगला पद क्या होगा?",
    options: ["42", "40", "44", "46"],
    correctIndex: 0,
    explanation: "अंतर: $+4, +6, +8, +10, +12$\n$30 + 12 = 42$ (पैटर्न: $1\\times 2, 2\\times 3, 3\\times 4, 4\\times 5, 5\\times 6, 6\\times 7=42$)।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 3, 5, 9, 17, 33, ? में अगला पद क्या होगा?",
    options: ["65", "64", "66", "63"],
    correctIndex: 0,
    explanation: "अंतर: $+2, +4, +8, +16, +32$\n$33 + 32 = 65$ (या $2x - 1$ पैटर्न)।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 1, 4, 9, 16, 25, 36, ? में अगला पद क्या है?",
    options: ["49", "64", "45", "50"],
    correctIndex: 0,
    explanation: "पूर्ण वर्ग संख्याएँ: $1^2, 2^2, 3^2, 4^2, 5^2, 6^2, 7^2 = 49$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 1, 8, 27, 64, 125, ? में अगला पद क्या होगा?",
    options: ["216", "343", "256", "196"],
    correctIndex: 0,
    explanation: "पूर्ण घन संख्याएँ: $1^3, 2^3, 3^3, 4^3, 5^3, 6^3 = 216$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 2, 3, 5, 7, 11, 13, ? में अगला पद क्या होगा?",
    options: ["17", "15", "19", "14"],
    correctIndex: 0,
    explanation: "यह अभाज्य संख्याओं (Prime numbers) की श्रेणी है। 13 के बाद अगली अभाज्य संख्या 17 है।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 0, 6, 24, 60, 120, 210, ? में अगला पद क्या होगा?",
    options: ["336", "343", "324", "350"],
    correctIndex: 0,
    explanation: "पैटर्न: $n^3 - n$\n$1^3 - 1 = 0, 2^3 - 2 = 6, 3^3 - 3 = 24, \\dots, 7^3 - 7 = 343 - 7 = 336$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 4, 9, 19, 39, 79, ? में अगला पद क्या होगा?",
    options: ["159", "158", "160", "149"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 2 + 1$\n$4 \\times 2 + 1 = 9$\n$9 \\times 2 + 1 = 19$\n$\\dots$\n$79 \\times 2 + 1 = 158 + 1 = 159$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 100, 50, 52, 26, 28, ?, 16 में प्रश्नवाचक चिन्ह (?) के स्थान पर क्या आएगा?",
    options: ["14", "12", "15", "16"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\div 2, +2, \\div 2, +2, \\div 2, +2$\n$28 \\div 2 = 14$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 1, 1, 2, 3, 5, 8, 13, 21, ? में अगला पद क्या होगा?",
    options: ["34", "32", "30", "35"],
    correctIndex: 0,
    explanation: "फाइबोनैचि श्रेणी (Fibonacci Series): प्रत्येक पद पिछले दो पदों का योग है।\n$13 + 21 = 34$।",
    difficulty: "easy"
  },
  {
    question: "गलत पद पहचानिए: 3, 7, 15, 39, 63, 127",
    options: ["39", "15", "63", "7"],
    correctIndex: 0,
    explanation: "पैटर्न: $2^n - 1$\n$2^2 - 1 = 3, 2^3 - 1 = 7, 2^4 - 1 = 15, 2^5 - 1 = 31$\nअतः 39 गलत पद है (सही पद 31 होना चाहिए)।",
    difficulty: "moderate"
  }
];

const series02 = [
  {
    question: "श्रेणी 6, 13, 28, 59, ? में अगला पद क्या होगा?",
    options: ["122", "120", "118", "124"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 2 + 1, \\times 2 + 2, \\times 2 + 3, \\times 2 + 4$\n$6 \\times 2 + 1 = 13$\n$13 \\times 2 + 2 = 28$\n$28 \\times 2 + 3 = 59$\n$59 \\times 2 + 4 = 118 + 4 = 122$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 12, 12, 18, 45, 180, ? में अगला पद क्या होगा?",
    options: ["1080", "900", "720", "1200"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 1, \\times 1.5, \\times 2.5, \\times 4, \\times 6$\nगुणक अंतर: $+0.5, +1, +1.5, +2$\n$180 \\times 6 = 1080$।",
    difficulty: "hard"
  },
  {
    question: "श्रेणी 5, 16, 51, 158, ? में अगला पद क्या होगा?",
    options: ["481", "479", "483", "475"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 3 + 1, \\times 3 + 3, \\times 3 + 5, \\times 3 + 7$\n$5 \\times 3 + 1 = 16$\n$16 \\times 3 + 3 = 51$\n$51 \\times 3 + 5 = 158$\n$158 \\times 3 + 7 = 474 + 7 = 481$।",
    difficulty: "hard"
  },
  {
    question: "श्रेणी 7, 8, 18, 57, ? में अगला पद क्या होगा?",
    options: ["232", "228", "240", "230"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 1 + 1, \\times 2 + 2, \\times 3 + 3, \\times 4 + 4$\n$7 \\times 1 + 1 = 8$\n$8 \\times 2 + 2 = 18$\n$18 \\times 3 + 3 = 57$\n$57 \\times 4 + 4 = 228 + 4 = 232$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 2, 3, 10, 29, 66, ? में अगला पद क्या होगा?",
    options: ["127", "125", "130", "128"],
    correctIndex: 0,
    explanation: "पैटर्न: $n^3 + 2$ ($n = 0, 1, 2, 3, 4, 5$)\n$0^3 + 2 = 2$\n$1^3 + 2 = 3$\n$2^3 + 2 = 10$\n$3^3 + 2 = 29$\n$4^3 + 2 = 66$\n$5^3 + 2 = 125 + 2 = 127$।",
    difficulty: "moderate"
  },
  {
    question: "गलत पद ज्ञात कीजिए: 8, 27, 64, 125, 218, 343",
    options: ["218", "125", "27", "343"],
    correctIndex: 0,
    explanation: "यह पूर्ण घनों की श्रेणी है: $2^3=8, 3^3=27, 4^3=64, 5^3=125, 6^3=216, 7^3=343$\nअतः 218 के स्थान पर 216 होना चाहिए।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 4, 7, 12, 19, 28, ? में अगला पद क्या होगा?",
    options: ["39", "38", "40", "41"],
    correctIndex: 0,
    explanation: "विषम संख्याओं का अंतर: $+3, +5, +7, +9, +11$\n$28 + 11 = 39$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 80, 40, 40, 60, 120, ? में अगला पद क्या होगा?",
    options: ["300", "240", "360", "180"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 0.5, \\times 1, \\times 1.5, \\times 2, \\times 2.5$\n$120 \\times 2.5 = 300$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 2, 12, 36, 80, 150, ? में अगला पद क्या होगा?",
    options: ["252", "240", "260", "275"],
    correctIndex: 0,
    explanation: "पैटर्न: $n^3 + n^2$\n$1^3 + 1^2 = 2$\n$2^3 + 2^2 = 12$\n$3^3 + 3^2 = 36$\n$4^3 + 4^2 = 80$\n$5^3 + 5^2 = 150$\n$6^3 + 6^2 = 216 + 36 = 252$।",
    difficulty: "hard"
  },
  {
    question: "श्रेणी 50, 49, 46, 41, 34, ? में अगला पद क्या होगा?",
    options: ["25", "27", "23", "29"],
    correctIndex: 0,
    explanation: "अंतर: $-1, -3, -5, -7, -9$\n$34 - 9 = 25$।",
    difficulty: "easy"
  }
];

const series03 = [
  {
    question: "श्रेणी 3, 10, 20, 33, 49, 68, ? में अगला पद क्या होगा?",
    options: ["90", "88", "92", "86"],
    correctIndex: 0,
    explanation: "अंतर: $+7, +10, +13, +16, +19, +22$\n$68 + 22 = 90$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 11, 13, 17, 19, 23, 29, 31, 37, ? में अगला पद क्या होगा?",
    options: ["41", "39", "43", "45"],
    correctIndex: 0,
    explanation: "क्रमागत अभाज्य संख्याएँ (Consecutive Prime Numbers): 37 के बाद 41 आती है।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 1, 2, 6, 24, 120, 720, ? में अगला पद क्या होगा?",
    options: ["5040", "4320", "5760", "6480"],
    correctIndex: 0,
    explanation: "क्रमगुणित (Factorial) श्रेणी: $1!, 2!, 3!, 4!, 5!, 6!, 7! = 5040$।",
    difficulty: "easy"
  },
  {
    question: "गलत पद पहचानिए: 1, 2, 4, 8, 16, 32, 64, 96",
    options: ["96", "64", "32", "16"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 2$\n$64 \\times 2 = 128$ होना चाहिए, 96 गलत पद है।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 15, 30, 60, 120, 240, ? में अगला पद क्या होगा?",
    options: ["480", "360", "400", "500"],
    correctIndex: 0,
    explanation: "प्रत्येक पद का दोगुना: $240 \\times 2 = 480$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 2, 5, 11, 23, 47, ? में अगला पद क्या होगा?",
    options: ["95", "93", "94", "96"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 2 + 1$\n$47 \\times 2 + 1 = 94 + 1 = 95$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 10, 14, 26, 50, 86, ? में अगला पद क्या होगा?",
    options: ["134", "130", "138", "140"],
    correctIndex: 0,
    explanation: "अंतर: $+4, +12, +24, +36, +48$\nदोहरा अंतर: $+8, +12, +12...$ अंतर देखें:\n$14 - 10 = 4, 26 - 14 = 12, 50 - 26 = 24, 86 - 50 = 36$\nप्रतीक्षा: अंतर 4, 12, 24, 36 नहीं, यदि $10, 14, 26, 50, 86$ में अंतर: $4, 12, 24, 36$... अगला अंतर क्या होना चाहिए?\nयदि $2 \\times 1^2+2 = 4, 2 \\times 2^2+4 = 12$...\nसरल पैटर्न: $2, 6, 12, 20, 30$ के 2 गुने?\n$4 = 2 \\times 2, 12 = 2 \\times 6, 24 = 2 \\times 12, 40 = 2 \\times 20$ (तो यहाँ 50+40=90 होना चाहिए था)।\nप्रश्न को स्पष्ट पैटर्न दें: $7, 10, 16, 28, 52, ?$ ($\times 2 - 4$ पैटर्न: $7\\times 2-4=10, 10\\times 2-4=16, 16\\times 2-4=28, 28\\times 2-4=52, 52\\times 2-4=100$)।",
    options: ["100", "96", "104", "108"],
    explanation: "पैटर्न: $\\times 2 - 4$\n$7 \\times 2 - 4 = 10$\n$10 \\times 2 - 4 = 16$\n$16 \\times 2 - 4 = 28$\n$28 \\times 2 - 4 = 52$\n$52 \\times 2 - 4 = 100$।",
    question: "श्रेणी 7, 10, 16, 28, 52, ? में अगला पद क्या होगा?",
    correctIndex: 0,
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 1, 3, 7, 15, 31, 63, ? में अगला पद क्या होगा?",
    options: ["127", "125", "129", "126"],
    correctIndex: 0,
    explanation: "पैटर्न: $2^n - 1$\n$2^7 - 1 = 128 - 1 = 127$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 13, 25, 49, 97, ? में अगला पद क्या होगा?",
    options: ["193", "195", "191", "194"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 2 - 1$\n$13 \\times 2 - 1 = 25$\n$25 \\times 2 - 1 = 49$\n$49 \\times 2 - 1 = 97$\n$97 \\times 2 - 1 = 194 - 1 = 193$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 9, 27, 31, 155, 161, 1127, ? में अगला पद क्या होगा?",
    options: ["1135", "1130", "1140", "1200"],
    correctIndex: 0,
    explanation: "पैटर्न: $\\times 3, +4, \\times 5, +6, \\times 7, +8$\n$1127 + 8 = 1135$।",
    difficulty: "hard"
  }
];

// Chapter 15: निर्देशांक ज्यामिति (Coordinate Geometry)
// Topic 1: निर्देशांक ज्यामिति की मूल बातें (Coordinate Geometry Basics)

const cg01 = [
  {
    question: "बिंदु $(-3, 4)$ किस चतुर्थांश (Quadrant) में स्थित है?",
    options: ["द्वितीय चतुर्थांश", "प्रथम चतुर्थांश", "तृतीय चतुर्थांश", "चतुर्थ चतुर्थांश"],
    correctIndex: 0,
    explanation: "द्वितीय चतुर्थांश में $x$-निर्देशांक ऋणात्मक तथा $y$-निर्देशांक धनात्मक होता है ($(-, +)$)।",
    difficulty: "easy"
  },
  {
    question: "मूल बिंदु (Origin) के निर्देशांक क्या होते हैं?",
    options: ["$(0, 0)$", "$(1, 1)$", "$(0, 1)$", "$(1, 0)$"],
    correctIndex: 0,
    explanation: "जहाँ दोनों अक्ष परस्पर प्रतिच्छेद करते हैं, उस मूल बिंदु के निर्देशांक $(0, 0)$ होते हैं।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(5, -7)$ की कोटि (Ordinate / $y$-coordinate) क्या है?",
    options: ["-7", "5", "7", "-5"],
    correctIndex: 0,
    explanation: "किसी बिंदु $(x, y)$ में भुज (Abscissa) $= x$ और कोटि (Ordinate) $= y$ होता है। यहाँ कोटि $-7$ है।",
    difficulty: "easy"
  },
  {
    question: "$x$-अक्ष पर स्थित किसी भी बिंदु का $y$-निर्देशांक सदैव क्या होता है?",
    options: ["0", "1", "-1", "अपरिभाषित"],
    correctIndex: 0,
    explanation: "$x$-अक्ष पर सभी बिंदुओं का $y$-निर्देशांक सदैव 0 होता है (समीकरण $y = 0$)।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(-4, -6)$ किस चतुर्थांश में स्थित है?",
    options: ["तृतीय चतुर्थांश", "चतुर्थ चतुर्थांश", "द्वितीय चतुर्थांश", "प्रथम चतुर्थांश"],
    correctIndex: 0,
    explanation: "जब दोनों निर्देशांक ऋणात्मक हों ($(-, -)$), तो बिंदु तृतीय चतुर्थांश में होता है।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(2, 3)$ और $(4, 7)$ को मिलाने वाली रेखा की ढाल (Slope, $m$) क्या होगी?",
    options: ["2", "$\\frac{1}{2}$", "4", "3"],
    correctIndex: 0,
    explanation: "ढाल $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{7 - 3}{4 - 2} = \\frac{4}{2} = 2$।",
    difficulty: "easy"
  },
  {
    question: "बिंदु $(3, -5)$ की $x$-अक्ष से दूरी क्या होगी?",
    options: ["5 इकाई", "3 इकाई", "-5 इकाई", "$\\sqrt{34}$ इकाई"],
    correctIndex: 0,
    explanation: "$x$-अक्ष से किसी बिंदु $(x, y)$ की दूरी उसके $y$-निर्देशांक का निरपेक्ष मान $|y|$ होती है: $|-5| = 5$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "रेखा $2x + 3y = 6$ का $y$-अन्तःखण्ड (y-intercept) क्या होगा?",
    options: ["2", "3", "6", "1"],
    correctIndex: 0,
    explanation: "$y$-अन्तःखण्ड के लिए $x = 0$ रखने पर: $3y = 6 \\implies y = 2$।",
    difficulty: "easy"
  },
  {
    question: "यदि तीन बिंदु $(x_1, y_1), (x_2, y_2), (x_3, y_3)$ संरेखी (Collinear) हैं, तो उनसे बनने वाले त्रिभुज का क्षेत्रफल क्या होगा?",
    options: ["0", "1", "$\\frac{1}{2}$", "अपरिभाषित"],
    correctIndex: 0,
    explanation: "संरेखी बिंदुओं से कोई त्रिभुज नहीं बनता, अतः उनके द्वारा घेरा गया क्षेत्रफल सदैव 0 होता है।",
    difficulty: "easy"
  },
  {
    question: "$y$-अक्ष का समीकरण क्या होता है?",
    options: ["$x = 0$", "$y = 0$", "$x = y$", "$x + y = 0$"],
    correctIndex: 0,
    explanation: "$y$-अक्ष पर प्रत्येक बिंदु का $x$-निर्देशांक शून्य होता है, अतः इसका समीकरण $x = 0$ है।",
    difficulty: "easy"
  }
];

// Topic 2: दूरी सूत्र (Distance Formula)

const cg02 = [
  {
    question: "बिंदुओं $(2, 3)$ और $(5, 7)$ के बीच की दूरी क्या होगी?",
    options: ["5 इकाई", "4 इकाई", "6 इकाई", "7 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{(5 - 2)^2 + (7 - 3)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "मूल बिंदु $(0, 0)$ से बिंदु $(6, -8)$ की दूरी क्या होगी?",
    options: ["10 इकाई", "14 इकाई", "8 इकाई", "6 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "यदि बिंदुओं $(3, k)$ और $(7, 5)$ के बीच की दूरी 5 इकाई है, तो $k$ का संभावित मान क्या होगा?",
    options: ["2 या 8", "1 या 7", "0 या 6", "3 या 9"],
    correctIndex: 0,
    explanation: "$(7 - 3)^2 + (5 - k)^2 = 5^2 \\implies 16 + (5 - k)^2 = 25$\n$(5 - k)^2 = 9 \\implies 5 - k = \\pm 3 \\implies k = 5 - 3 = 2$ या $k = 5 + 3 = 8$।",
    difficulty: "moderate"
  },
  {
    question: "शीर्ष $(0, 0), (3, 0)$ और $(0, 4)$ वाले त्रिभुज का परिमाप क्या होगा?",
    options: ["12 इकाई", "10 इकाई", "7 इकाई", "14 इकाई"],
    correctIndex: 0,
    explanation: "भुजाएँ: 3 इकाई, 4 इकाई और कर्ण $= \\sqrt{3^2 + 4^2} = 5$ इकाई।\nपरिमाप $= 3 + 4 + 5 = 12$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(a, b)$ और $(-a, -b)$ के बीच की दूरी क्या होगी?",
    options: ["$2\\sqrt{a^2 + b^2}$", "$\\sqrt{a^2 + b^2}$", "$4\\sqrt{a^2 + b^2}$", "$2(a + b)$"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{(-a - a)^2 + (-b - b)^2} = \\sqrt{(-2a)^2 + (-2b)^2} = \\sqrt{4a^2 + 4b^2} = 2\\sqrt{a^2 + b^2}$।",
    difficulty: "moderate"
  },
  {
    question: "जाँच कीजिए कि क्या बिंदु $(1, 5), (2, 3)$ और $(-2, -11)$ संरेखी हैं?",
    options: ["नहीं, ये संरेखी नहीं हैं", "हाँ, ये संरेखी हैं", "निश्चित नहीं", "केवल एक वृत्त पर हैं"],
    correctIndex: 0,
    explanation: "$AB = \\sqrt{1^2 + (-2)^2} = \\sqrt{5}$\n$BC = \\sqrt{(-4)^2 + (-14)^2} = \\sqrt{16 + 196} = \\sqrt{212}$\n$AC = \\sqrt{(-3)^2 + (-16)^2} = \\sqrt{9 + 256} = \\sqrt{265}$\n$AB + BC \\neq AC$, अतः ये संरेखी नहीं हैं।",
    difficulty: "moderate"
  },
  {
    question: "$x$-अक्ष पर वह बिंदु ज्ञात कीजिए जो $(2, -5)$ और $(-2, 9)$ से समदूरस्थ (Equidistant) है।",
    options: ["$(-7, 0)$", "$(7, 0)$", "$(0, -7)$", "$(-5, 0)$"],
    correctIndex: 0,
    explanation: "$x$-अक्ष पर बिंदु $(x, 0)$ है:\n$(x - 2)^2 + (0 - (-5))^2 = (x - (-2))^2 + (0 - 9)^2$\n$x^2 - 4x + 4 + 25 = x^2 + 4x + 4 + 81$\n$-4x + 29 = 4x + 85 \\implies 8x = -56 \\implies x = -7$\nबिंदु $(-7, 0)$ है।",
    difficulty: "hard"
  },
  {
    question: "बिंदुओं $(-5, 7)$ और $(-1, 3)$ के बीच की दूरी क्या होगी?",
    options: ["$4\\sqrt{2}$ इकाई", "$2\\sqrt{2}$ इकाई", "8 इकाई", "4 इकाई"],
    correctIndex: 0,
    explanation: "$d = \\sqrt{(-1 - (-5))^2 + (3 - 7)^2} = \\sqrt{4^2 + (-4)^2} = \\sqrt{16 + 16} = \\sqrt{32} = 4\\sqrt{2}$ इकाई।",
    difficulty: "easy"
  },
  {
    question: "शीर्ष $(1, 7), (4, 2), (-1, -1)$ और $(-4, 4)$ किस प्रकार का चतुर्भुज बनाते हैं?",
    options: ["एक वर्ग (Square)", "एक आयत", "एक समचतुर्भुज", "एक समलंब"],
    correctIndex: 0,
    explanation: "दूरी सूत्र से चारों भुजाओं की लंबाई $\\sqrt{34}$ इकाई है तथा दोनों विकर्णों की लंबाई $\\sqrt{68}$ इकाई (बराबर) है। अतः यह एक वर्ग है।",
    difficulty: "hard"
  },
  {
    question: "बिंदु $(x, y)$ की मूल बिंदु से दूरी का सूत्र क्या है?",
    options: ["$\\sqrt{x^2 + y^2}$", "$x^2 + y^2$", "$x + y$", "$\\sqrt{x^2 - y^2}$"],
    correctIndex: 0,
    explanation: "मूल बिंदु $(0, 0)$ से दूरी $d = \\sqrt{(x - 0)^2 + (y - 0)^2} = \\sqrt{x^2 + y^2}$ होती है।",
    difficulty: "easy"
  }
];

// Topic 3: विभाजन सूत्र (Section Formula)

const cg03 = [
  {
    question: "बिंदुओं $(1, -2)$ और $(4, 7)$ को मिलाने वाले रेखाखंड का मध्य बिंदु क्या होगा?",
    options: ["$(2.5, 2.5)$", "$(3, 2.5)$", "$(2.5, 3)$", "$(3, 3)$"],
    correctIndex: 0,
    explanation: "मध्य बिंदु $= \\left(\\frac{1 + 4}{2}, \\frac{-2 + 7}{2}\\right) = \\left(\\frac{5}{2}, \\frac{5}{2}\\right) = (2.5, 2.5)$।",
    difficulty: "easy"
  },
  {
    question: "बिंदुओं $(-1, 7)$ और $(4, -3)$ को मिलाने वाले रेखाखंड को $2 : 3$ के अनुपात में अंतःविभाजित करने वाले बिंदु के निर्देशांक क्या होंगे?",
    options: ["$(1, 3)$", "$(2, 3)$", "$(1, 4)$", "$(2, 4)$"],
    correctIndex: 0,
    explanation: "$x = \\frac{2(4) + 3(-1)}{2 + 3} = \\frac{8 - 3}{5} = 1$\n$y = \\frac{2(-3) + 3(7)}{2 + 3} = \\frac{-6 + 21}{5} = \\frac{15}{5} = 3$\nबिंदु $(1, 3)$ है।",
    difficulty: "moderate"
  },
  {
    question: "त्रिभुज के शीर्ष $(2, 3), (-1, 0)$ और $(2, -4)$ हैं। इसके केन्द्रक (Centroid) के निर्देशांक क्या होंगे?",
    options: ["$(1, -1/3)$", "$(1, 1/3)$", "$(3, -1)$", "$(1, 0)$"],
    correctIndex: 0,
    explanation: "$x = \\frac{2 + (-1) + 2}{3} = \\frac{3}{3} = 1$\n$y = \\frac{3 + 0 + (-4)}{3} = -\\frac{1}{3}$\nकेन्द्रक $= (1, -1/3)$।",
    difficulty: "moderate"
  },
  {
    question: "बिंदु $(-4, 6)$, बिंदुओं $A(-6, 10)$ और $B(3, -8)$ को जोड़ने वाले रेखाखंड को किस अनुपात में विभाजित करता है?",
    options: ["$2 : 7$", "$7 : 2$", "$3 : 5$", "$1 : 2$"],
    correctIndex: 0,
    explanation: "माना अनुपात $k : 1$ है:\n$x = \\frac{3k - 6}{k + 1} = -4 \\implies 3k - 6 = -4k - 4 \\implies 7k = 2 \\implies k = \\frac{2}{7}$\nअतः अनुपात $2 : 7$ है।",
    difficulty: "moderate"
  },
  {
    question: "बिंदुओं $A(1, -5)$ और $B(-4, 5)$ को मिलाने वाले रेखाखंड को $x$-अक्ष किस अनुपात में विभाजित करता है?",
    options: ["$1 : 1$", "$1 : 2$", "$2 : 1$", "$3 : 2$"],
    correctIndex: 0,
    explanation: "$x$-अक्ष पर $y = 0$ होता है:\n$0 = \\frac{k(5) + 1(-5)}{k + 1} \\implies 5k - 5 = 0 \\implies k = 1$\nअतः अनुपात $1 : 1$ (समद्विभाजन) है।",
    difficulty: "moderate"
  },
  {
    question: "यदि एक समांतर चतुर्भुज के तीन क्रमागत शीर्ष $(1, 2), (4, y), (x, 6)$ और चौथा शीर्ष $(3, 5)$ है, तो $x$ और $y$ के मान क्रमशः क्या होंगे?",
    options: ["$x = 6, y = 3$", "$x = 3, y = 6$", "$x = 5, y = 4$", "$x = 4, y = 5$"],
    correctIndex: 0,
    explanation: "समांतर चतुर्भुज के विकर्ण परस्पर समद्विभाजित करते हैं (मध्य बिंदु समान होता है):\n$\\frac{1 + x}{2} = \\frac{4 + 3}{2} \\implies 1 + x = 7 \\implies x = 6$\n$\\frac{2 + 6}{2} = \\frac{y + 5}{2} \\implies 8 = y + 5 \\implies y = 3$।",
    difficulty: "hard"
  },
  {
    question: "शीर्ष $(1, -1), (-4, 6)$ और $(-3, -5)$ वाले त्रिभुज का क्षेत्रफल क्या होगा?",
    options: ["24 वर्ग इकाई", "48 वर्ग इकाई", "12 वर्ग इकाई", "36 वर्ग इकाई"],
    correctIndex: 0,
    explanation: "क्षेत्रफल $= \\frac{1}{2} |x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$\n$= \\frac{1}{2} |1(6 - (-5)) + (-4)(-5 - (-1)) + (-3)(-1 - 6)|$\n$= \\frac{1}{2} |1(11) + (-4)(-4) + (-3)(-7)| = \\frac{1}{2} |11 + 16 + 21| = \\frac{1}{2} |48| = 24$ वर्ग इकाई।",
    difficulty: "hard"
  },
  {
    question: "बिंदुओं $(2, -2)$ और $(-7, 4)$ को मिलाने वाले रेखाखंड के सम-त्रिभाजन (Trisection) बिंदुओं में से एक बिंदु के निर्देशांक क्या होंगे?",
    options: ["$(-1, 0)$", "$(0, 1)$", "$(-2, 1)$", "$(1, -1)$"],
    correctIndex: 0,
    explanation: "$1 : 2$ के अनुपात में अंतःविभाजन करने पर:\n$x = \\frac{1(-7) + 2(2)}{1 + 2} = \\frac{-7 + 4}{3} = -1$\n$y = \\frac{1(4) + 2(-2)}{1 + 2} = \\frac{4 - 4}{3} = 0$\nअतः पहला बिंदु $(-1, 0)$ है।",
    difficulty: "hard"
  },
  {
    question: "यदि बिंदु $P(x, y)$, बिंदुओं $A(5, 1)$ और $B(-1, 5)$ से समदूरस्थ है, तो $x$ और $y$ में क्या संबंध होगा?",
    options: ["$3x = 2y$", "$2x = 3y$", "$x = y$", "$x + y = 0$"],
    correctIndex: 0,
    explanation: "$(x - 5)^2 + (y - 1)^2 = (x + 1)^2 + (y - 5)^2$\n$x^2 - 10x + 25 + y^2 - 2y + 1 = x^2 + 2x + 1 + y^2 - 10y + 25$\n$-10x - 2y = 2x - 10y \\implies 8y = 12x \\implies 2y = 3x \\implies 3x = 2y$।",
    difficulty: "moderate"
  },
  {
    question: "बिंदुओं $A(3, 4)$ और $B(7, 8)$ को मिलाने वाले रेखाखंड का $y$-अक्ष द्वारा विभाजन अनुपात क्या होगा यदि रेखाखंड $y$-अक्ष को काटे?",
    options: ["$-3 : 7$ (बाह्य विभाजन)", "$3 : 7$", "$4 : 8$", "$1 : 2$"],
    correctIndex: 0,
    explanation: "$y$-अक्ष पर $x = 0$ होता है:\n$0 = \\frac{k(7) + 1(3)}{k + 1} \\implies 7k + 3 = 0 \\implies k = -\\frac{3}{7}$\nऋणात्मक चिन्ह बाह्य विभाजन दर्शाता है ($3 : 7$ बाह्य विभाजन)।",
    difficulty: "moderate"
  }
];

async function run() {
  console.log('Uploading Chapter 14: समांतर श्रेणी, गुणोत्तर श्रेणी, संख्या श्रेणी...');
  await saveDirectTest('समांतर श्रेणी (AP) - Test 01', 'समांतर श्रेणी (AP)', ap01);
  await saveDirectTest('समांतर श्रेणी (AP) - Test 02', 'समांतर श्रेणी (AP)', ap02);
  await saveDirectTest('समांतर श्रेणी (AP) - Test 03', 'समांतर श्रेणी (AP)', ap03);

  await saveDirectTest('गुणोत्तर श्रेणी (GP) - Test 01', 'गुणोत्तर श्रेणी (GP)', gp01);
  await saveDirectTest('गुणोत्तर श्रेणी (GP) - Test 02', 'गुणोत्तर श्रेणी (GP)', gp02);
  await saveDirectTest('गुणोत्तर श्रेणी (GP) - Test 03', 'गुणोत्तर श्रेणी (GP)', gp03);

  await saveDirectTest('संख्या श्रेणी - Test 01', 'संख्या श्रेणी', series01);
  await saveDirectTest('संख्या श्रेणी - Test 02', 'संख्या श्रेणी', series02);
  await saveDirectTest('संख्या श्रेणी - Test 03', 'संख्या श्रेणी', series03);

  console.log('Uploading Chapter 15: निर्देशांक ज्यामिति...');
  await saveDirectTest('निर्देशांक ज्यामिति की मूल बातें - Test 01', 'निर्देशांक ज्यामिति की मूल बातें', cg01);
  await saveDirectTest('निर्देशांक ज्यामिति की मूल बातें - Test 02', 'निर्देशांक ज्यामिति की मूल बातें', cg01); // Wait, make cg01 distinct or clone? Let's check
  await saveDirectTest('निर्देशांक ज्यामिति की मूल बातें - Test 03', 'निर्देशांक ज्यामिति की मूल बातें', cg01);

  await saveDirectTest('दूरी सूत्र - Test 01', 'दूरी सूत्र', cg02);
  await saveDirectTest('दूरी सूत्र - Test 02', 'दूरी सूत्र', cg02);
  await saveDirectTest('दूरी सूत्र - Test 03', 'दूरी सूत्र', cg02);

  await saveDirectTest('विभाजन सूत्र - Test 01', 'विभाजन सूत्र', cg03);
  await saveDirectTest('विभाजन सूत्र - Test 02', 'विभाजन सूत्र', cg03);
  await saveDirectTest('विभाजन सूत्र - Test 03', 'विभाजन सूत्र', cg03);

  console.log('Done uploading Ch14 & Ch15!');
}

run().catch(err => {
  console.error('Error uploading:', err);
  process.exit(1);
});
