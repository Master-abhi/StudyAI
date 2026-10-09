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
    explanation: "$T_n = S_n - S_{n-1} = 4n + 3$\n$T_{10} = 4(10) + 3 = 43$।",
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
    explanation: "$7(a + 6d) = 11(a + 10d) \\implies 4a + 68d = 0 \\implies 4(a + 17d) = 0 \\implies T_{18} = 0$।",
    difficulty: "hard"
  },
  {
    question: "तीन संख्याएँ समांतर श्रेणी में हैं। उनका योग 21 और गुणनफल 315 है। सबसे बड़ी संख्या क्या होगी?",
    options: ["9", "7", "5", "11"],
    correctIndex: 0,
    explanation: "माना संख्याएँ $a - d, a, a + d$ हैं।\nयोग $= 3a = 21 \\implies a = 7$\nगुणनफल $= 7(49 - d^2) = 315 \\implies 49 - d^2 = 45 \\implies d = 2$\nसंख्याएँ: 5, 7, 9। सबसे बड़ी संख्या $= 9$।",
    difficulty: "moderate"
  },
  {
    question: "समांतर श्रेणी 10, 7, 4, ..., -62 का अंतिम पद से 11वाँ पद क्या होगा?",
    options: ["-32", "-35", "-30", "-40"],
    correctIndex: 0,
    explanation: "अंत से $n$वाँ पद $= l - (n - 1)d = -62 - (10)(-3) = -62 + 30 = -32$।",
    difficulty: "hard"
  },
  {
    question: "यदि किसी AP के $p$वें पद का मान $q$ और $q$वें पद का मान $p$ है, तो इसका $(p + q)$वाँ पद क्या होगा?",
    options: ["0", "$p + q$", "$pq$", "1"],
    correctIndex: 0,
    explanation: "मानक परिणाम: यदि $T_p = q$ तथा $T_q = p$ हो, तो $T_{p+q} = 0$ होता है।",
    difficulty: "moderate"
  },
  {
    question: "दो समांतर श्रेणियों के $n$ पदों के योग का अनुपात $(7n + 1) : (4n + 27)$ है। उनके 11वें पदों का अनुपात क्या होगा?",
    options: ["$4 : 3$", "$7 : 4$", "$3 : 2$", "$5 : 4$"],
    correctIndex: 0,
    explanation: "$n = 2(11) - 1 = 21$ रखने पर:\nअनुपात $= \\frac{7(21) + 1}{4(21) + 27} = \\frac{148}{111} = \\frac{4}{3}$।",
    difficulty: "hard"
  },
  {
    question: "समांतर श्रेणी 5, 8, 11, ... के कितने पदों का योग 220 होगा?",
    options: ["11", "12", "10", "13"],
    correctIndex: 0,
    explanation: "$\\frac{n}{2}[10 + (n - 1)3] = 220 \\implies 3n^2 + 7n - 440 = 0 \\implies (n - 11)(3n + 40) = 0 \\implies n = 11$।",
    difficulty: "hard"
  },
  {
    question: "एक चतुर्भुज के चारों कोण समांतर श्रेणी में हैं। यदि सार्व अंतर $10^\\circ$ है, तो सबसे बड़ा कोण क्या होगा?",
    options: ["$105^\\circ$", "$100^\\circ$", "$110^\\circ$", "$120^\\circ$"],
    correctIndex: 0,
    explanation: "$4a + 60 = 360 \\implies 4a = 300 \\implies a = 75^\\circ$\nसबसे बड़ा कोण $= 75 + 30 = 105^\\circ$।",
    difficulty: "moderate"
  },
  {
    question: "1 और 100 के बीच 3 से विभाज्य सभी पूर्णांकों का योग क्या होगा?",
    options: ["1683", "1650", "1716", "1600"],
    correctIndex: 0,
    explanation: "$S_{33} = \\frac{33}{2} (3 + 99) = 33 \\times 51 = 1683$।",
    difficulty: "easy"
  }
];

const ap03 = [
  {
    question: "यदि किसी AP के प्रथम $m$ पदों का योग $n$ और प्रथम $n$ पदों का योग $m$ है, तो प्रथम $(m + n)$ पदों का योग क्या होगा?",
    options: ["$-(m + n)$", "$m + n$", "0", "$mn$"],
    correctIndex: 0,
    explanation: "मानक परिणाम: $S_{m+n} = -(m + n)$।",
    difficulty: "hard"
  },
  {
    question: "एक सभागार की पहली पंक्ति में 20 सीटें हैं, दूसरी में 24, तीसरी में 28 और इसी प्रकार आगे हैं। 30 पंक्तियों में कुल कितनी सीटें होंगी?",
    options: ["2340", "2400", "2250", "2500"],
    correctIndex: 0,
    explanation: "$S_{30} = 15[40 + 116] = 15 \\times 156 = 2340$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $a, b, c$ समांतर श्रेणी में हैं, तो $\\frac{1}{bc}, \\frac{1}{ca}, \\frac{1}{ab}$ किस श्रेणी में होंगे?",
    options: ["समांतर श्रेणी (AP)", "गुणोत्तर श्रेणी (GP)", "हरात्मक श्रेणी (HP)", "इनमें से कोई नहीं"],
    correctIndex: 0,
    explanation: "प्रत्येक पद को $abc$ से भाग देने पर प्राप्त पद भी AP में होते हैं।",
    difficulty: "hard"
  },
  {
    question: "10 और 30 के बीच 3 समांतर माध्य पद निविष्ट करने पर दूसरा समांतर माध्य क्या होगा?",
    options: ["20", "15", "25", "18"],
    correctIndex: 0,
    explanation: "$d = \\frac{30 - 10}{4} = 5$\nदूसरा माध्य $= 10 + 2(5) = 20$।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी AP का प्रथम पद 5, अंतिम पद 45 और सभी पदों का योग 400 है, तो पदों की संख्या क्या होगी?",
    options: ["16", "15", "20", "18"],
    correctIndex: 0,
    explanation: "$400 = \\frac{n}{2}(5 + 45) = 25n \\implies n = 16$।",
    difficulty: "easy"
  },
  {
    question: "एक त्रिभुज के अंतः कोण समांतर श्रेणी में हैं। सबसे छोटा कोण $40^\\circ$ है। सबसे बड़ा कोण क्या होगा?",
    options: ["$80^\\circ$", "$75^\\circ$", "$90^\\circ$", "$85^\\circ$"],
    correctIndex: 0,
    explanation: "AP में कोणों का मध्य कोण $= 60^\\circ$\n$d = 60 - 40 = 20^\\circ$\nसबसे बड़ा कोण $= 60 + 20 = 80^\\circ$।",
    difficulty: "easy"
  },
  {
    question: "यदि किसी AP के $n$ पदों का योग $3n^2 + n$ है और इसका $m$वाँ पद 166 है, तो $m$ का मान क्या होगा?",
    options: ["28", "27", "29", "30"],
    correctIndex: 0,
    explanation: "$T_m = 6m - 2 = 166 \\implies 6m = 168 \\implies m = 28$।",
    difficulty: "moderate"
  },
  {
    question: "वह समांतर श्रेणी ज्ञात कीजिए जिसके प्रथम तीन पदों का योग 33 और गुणनफल 1155 है।",
    options: ["7, 11, 15", "5, 11, 17", "9, 11, 13", "6, 11, 16"],
    correctIndex: 0,
    explanation: "$a = 11, d = 4 \\implies 7, 11, 15$।",
    difficulty: "moderate"
  },
  {
    question: "100 से 300 के बीच ऐसी कितनी संख्याएँ हैं जो 4 और 6 दोनों से विभाज्य हैं?",
    options: ["16", "17", "15", "18"],
    correctIndex: 0,
    explanation: "ल.स. $= 12$\nसंख्याएँ 108 से 288 तक $\\implies n = 16$।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी समांतर श्रेणी का पहला पद धनात्मक और सार्व अंतर ऋणात्मक है, तो श्रेणी के अधिकतम योग के लिए पदों की संख्या कहाँ तक लेनी चाहिए?",
    options: ["अंतिम धनात्मक पद तक", "शून्य तक", "पहले ऋणात्मक पद तक", "अनंत तक"],
    correctIndex: 0,
    explanation: "अधिकतम योग के लिए केवल सभी धनात्मक पदों को ही जोड़ा जाता है।",
    difficulty: "easy"
  }
];

// Topic 2: गुणोत्तर श्रेणी (GP)

const gp01 = [
  {
    question: "गुणोत्तर श्रेणी 2, 6, 18, 54, ... का 6वाँ पद क्या होगा?",
    options: ["486", "162", "1458", "324"],
    correctIndex: 0,
    explanation: "$T_6 = 2 \\times 3^5 = 486$।",
    difficulty: "easy"
  },
  {
    question: "गुणोत्तर श्रेणी 1, 2, 4, 8, ... के प्रथम 8 पदों का योग क्या होगा?",
    options: ["255", "256", "511", "127"],
    correctIndex: 0,
    explanation: "$S_8 = \\frac{1(2^8 - 1)}{2 - 1} = 255$।",
    difficulty: "easy"
  },
  {
    question: "अनंत गुणोत्तर श्रेणी $1 + \\frac{1}{2} + \\frac{1}{4} + \\dots \\infty$ का योग क्या होगा?",
    options: ["2", "1", "4", "$\\frac{3}{2}$"],
    correctIndex: 0,
    explanation: "$S_\\infty = \\frac{1}{1 - 1/2} = 2$।",
    difficulty: "easy"
  },
  {
    question: "दो संख्याओं 4 और 16 का गुणोत्तर माध्य क्या होगा?",
    options: ["8", "10", "6", "12"],
    correctIndex: 0,
    explanation: "$\\sqrt{4 \\times 16} = 8$।",
    difficulty: "easy"
  },
  {
    question: "यदि $x, x+3, x+9$ एक गुणोत्तर श्रेणी में हैं, तो $x$ का मान क्या होगा?",
    options: ["3", "1", "2", "4"],
    correctIndex: 0,
    explanation: "$(x+3)^2 = x(x+9) \\implies 6x + 9 = 9x \\implies 3x = 9 \\implies x = 3$।",
    difficulty: "easy"
  },
  {
    question: "गुणोत्तर श्रेणी $5, 10, 20, \\dots$ का कौन-सा पद 1280 होगा?",
    options: ["9वाँ पद", "8वाँ पद", "10वाँ पद", "7वाँ पद"],
    correctIndex: 0,
    explanation: "$5 \\times 2^{n-1} = 1280 \\implies 2^{n-1} = 256 = 2^8 \\implies n = 9$।",
    difficulty: "easy"
  },
  {
    question: "यदि किसी GP का तीसरा पद 24 और 6वाँ पद 192 है, तो इसका प्रथम पद क्या होगा?",
    options: ["6", "3", "12", "8"],
    correctIndex: 0,
    explanation: "$r^3 = 8 \\implies r = 2$\n$a(4) = 24 \\implies a = 6$।",
    difficulty: "moderate"
  },
  {
    question: "अनंत गुणोत्तर श्रेणी का योग तभी संभव होता है जब सार्व अनुपात $|r|$ का मान हो:",
    options: ["$|r| < 1$", "$|r| > 1$", "$|r| = 1$", "$|r| \\ge 1$"],
    correctIndex: 0,
    explanation: "अनंत GP का योग केवल $|r| < 1$ के लिए अभिसरित होता है।",
    difficulty: "easy"
  },
  {
    question: "आवर्त दशमलव $0.333\\dots$ का भिन्न मान क्या होगा?",
    options: ["$\\frac{1}{3}$", "$\\frac{3}{10}$", "$\\frac{1}{9}$", "$\\frac{3}{11}$"],
    correctIndex: 0,
    explanation: "$\\frac{0.3}{1 - 0.1} = \\frac{0.3}{0.9} = \\frac{1}{3}$।",
    difficulty: "easy"
  },
  {
    question: "तीन संख्याएँ GP में हैं। उनका गुणनफल 216 है। मध्य संख्या क्या होगी?",
    options: ["6", "4", "8", "9"],
    correctIndex: 0,
    explanation: "$a^3 = 216 \\implies a = 6$।",
    difficulty: "easy"
  }
];

const gp02 = [
  {
    question: "एक गेंद को 120 मीटर की ऊँचाई से गिराया जाता है। प्रत्येक बार टकराने पर यह अपनी पिछली ऊँचाई की 4/5 ऊँचाई तक उछलती है। रुकने से पहले कुल कितनी दूरी तय करेगी?",
    options: ["1080 मीटर", "960 मीटर", "1200 मीटर", "600 मीटर"],
    correctIndex: 0,
    explanation: "दूरी $= 120 + 2 \\times \\frac{120(4/5)}{1 - 4/5} = 120 + 2(480) = 1080$ मीटर।",
    difficulty: "hard"
  },
  {
    question: "संख्याओं 3 और 81 के बीच 2 गुणोत्तर माध्य पद क्या होंगे?",
    options: ["9 और 27", "6 और 18", "9 और 36", "12 और 36"],
    correctIndex: 0,
    explanation: "$r = 3 \\implies 9, 27$।",
    difficulty: "moderate"
  },
  {
    question: "अनंत GP का पहला पद 4 है और प्रत्येक पद अपने बाद के सभी पदों के योग के बराबर है। $r$ क्या होगा?",
    options: ["$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{1}{4}$", "$\\frac{2}{3}$"],
    correctIndex: 0,
    explanation: "$1 = \\frac{r}{1 - r} \\implies 1 - r = r \\implies r = 1/2$।",
    difficulty: "hard"
  },
  {
    question: "यदि $a, b, c$ GP में हैं, तो $\\log a, \\log b, \\log c$ किस श्रेणी में होंगे?",
    options: ["समांतर श्रेणी (AP)", "गुणोत्तर श्रेणी (GP)", "हरात्मक श्रेणी (HP)", "इनमें से कोई नहीं"],
    correctIndex: 0,
    explanation: "$2\\log b = \\log a + \\log c$ (AP की शर्त)।",
    difficulty: "moderate"
  },
  {
    question: "गुणोत्तर श्रेणी $\\sqrt{3}, 3, 3\\sqrt{3}, \\dots$ का कौन-सा पद 729 होगा?",
    options: ["12वाँ पद", "11वाँ पद", "13वाँ पद", "10वाँ पद"],
    correctIndex: 0,
    explanation: "$(\\sqrt{3})^n = (\\sqrt{3})^{12} \\implies n = 12$।",
    difficulty: "moderate"
  },
  {
    question: "यदि किसी GP के अनंत पदों का योग 9 और प्रथम दो पदों का योग 5 है, तो $r$ क्या होगा?",
    options: ["$\\frac{2}{3}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{3}{4}$"],
    correctIndex: 0,
    explanation: "$9(1 - r^2) = 5 \\implies r^2 = 4/9 \\implies r = 2/3$।",
    difficulty: "hard"
  },
  {
    question: "तीन संख्याएँ GP में हैं जिनका योग 38 और गुणनफल 1728 है। सबसे छोटी संख्या क्या है?",
    options: ["8", "6", "18", "12"],
    correctIndex: 0,
    explanation: "संख्याएँ 8, 12, 18 हैं। सबसे छोटी $= 8$।",
    difficulty: "hard"
  },
  {
    question: "किसी GP में चौथा पद 8 और सातवाँ पद 64 है। इसका 10वाँ पद क्या होगा?",
    options: ["512", "256", "1024", "128"],
    correctIndex: 0,
    explanation: "$r^3 = 8 \\implies T_{10} = 64 \\times 8 = 512$।",
    difficulty: "easy"
  },
  {
    question: "GP के प्रथम $n$ पदों का गुणनफल क्या होता है यदि प्रथम पद $a$ और अंतिम पद $l$ है?",
    options: ["$(al)^{n/2}$", "$(al)^n$", "$\\sqrt{al}$", "$(a+l)^{n/2}$"],
    correctIndex: 0,
    explanation: "गुणनफल $= (al)^{n/2}$।",
    difficulty: "moderate"
  },
  {
    question: "दो संख्याओं 9 और 4 का गुणोत्तर माध्य क्या होगा?",
    options: ["6", "6.5", "5", "13"],
    correctIndex: 0,
    explanation: "$\\sqrt{9 \\times 4} = \\sqrt{36} = 6$।",
    difficulty: "easy"
  }
];

const gp03 = [
  {
    question: "गुणोत्तर श्रेणी के प्रथम 3 पदों के योग और प्रथम 6 पदों के योग का अनुपात $125 : 152$ है। $r$ क्या होगा?",
    options: ["$\\frac{3}{5}$", "$\\frac{2}{5}$", "$\\frac{4}{5}$", "$\\frac{1}{5}$"],
    correctIndex: 0,
    explanation: "$1 + r^3 = 152/125 \\implies r^3 = 27/125 \\implies r = 3/5$।",
    difficulty: "hard"
  },
  {
    question: "एक वर्ग की भुजा 16 सेमी है। इसकी भुजाओं के मध्य बिंदुओं को जोड़कर दूसरा वर्ग बनाया जाता है और यह क्रम अनंत तक चलता है। सभी वर्गों के क्षेत्रफलों का योग क्या होगा?",
    options: ["512 वर्ग सेमी", "256 वर्ग सेमी", "384 वर्ग सेमी", "1024 वर्ग सेमी"],
    correctIndex: 0,
    explanation: "$S = \\frac{256}{1 - 1/2} = 512$ वर्ग सेमी।",
    difficulty: "hard"
  },
  {
    question: "मान ज्ञात कीजिए: $6^{1/2} \\times 6^{1/4} \\times 6^{1/8} \\dots \\infty$",
    options: ["6", "36", "$\\sqrt{6}$", "1"],
    correctIndex: 0,
    explanation: "$6^1 = 6$।",
    difficulty: "moderate"
  },
  {
    question: "एक GP में $T_2 = 2$ और $S_\\infty = 8$ है। प्रथम पद $a$ क्या होगा?",
    options: ["4", "2", "6", "8"],
    correctIndex: 0,
    explanation: "$a^2 - 8a + 16 = 0 \\implies a = 4$।",
    difficulty: "hard"
  },
  {
    question: "यदि $a, b, c$ तीन असमान धनात्मक वास्तविक संख्याएँ हैं, तो:",
    options: ["$AM > GM$", "$AM < GM$", "$AM = GM$", "$AM \\le GM$"],
    correctIndex: 0,
    explanation: "असमान धनात्मक संख्याओं के लिए सदैव $AM > GM$ होता है।",
    difficulty: "easy"
  },
  {
    question: "यदि धनात्मक संख्याओं $a$ और $b$ का गुणोत्तर माध्य 8 और समांतर माध्य 10 है, तो वे संख्याएँ क्या होंगी?",
    options: ["4 और 16", "2 और 18", "6 और 14", "8 और 12"],
    correctIndex: 0,
    explanation: "$a + b = 20, ab = 64 \\implies 4$ और 16।",
    difficulty: "easy"
  },
  {
    question: "एक GP का 5वाँ पद 2 है। इसके प्रथम 9 पदों का गुणनफल क्या होगा?",
    options: ["512", "256", "1024", "128"],
    correctIndex: 0,
    explanation: "$2^9 = 512$।",
    difficulty: "hard"
  },
  {
    question: "श्रेणी $7 + 77 + 777 + \\dots$ के $n$ पदों का योग क्या होगा?",
    options: ["$\\frac{7}{9}\\left[\\frac{10(10^n - 1)}{9} - n\\right]$", "$\\frac{7}{81}(10^n - 1)$", "$\\frac{7}{9}(10^n - 1)$", "$\\frac{70}{9}(10^n - 1)$"],
    correctIndex: 0,
    explanation: "मानक सूत्र: $\\frac{7}{9}\\left[\\frac{10(10^n - 1)}{9} - n\\right]$।",
    difficulty: "hard"
  },
  {
    question: "अनंत GP: $5, -\\frac{5}{2}, \\frac{5}{4}, -\\frac{5}{8}, \\dots$ का योग क्या होगा?",
    options: ["$\\frac{10}{3}$", "$\\frac{5}{3}$", "10", "$\\frac{15}{2}$"],
    correctIndex: 0,
    explanation: "$a = 5, r = -1/2$\n$S_\\infty = \\frac{5}{1 - (-1/2)} = \\frac{5}{3/2} = \\frac{10}{3}$।",
    difficulty: "moderate"
  },
  {
    question: "यदि $x, 2x+2, 3x+3$ एक GP के प्रथम तीन पद हैं, तो चौथा पद क्या होगा?",
    options: ["-13.5", "27", "-27", "13.5"],
    correctIndex: 0,
    explanation: "$(2x+2)^2 = x(3x+3) \\implies 4x^2 + 8x + 4 = 3x^2 + 3x \\implies x^2 + 5x + 4 = 0$\n$x = -4$ या $-1$ (यदि $x = -4$: पद $-4, -6, -9 \\implies r = 1.5 \\implies T_4 = -9 \\times 1.5 = -13.5$)।",
    difficulty: "hard"
  }
];

// Topic 3: संख्या श्रेणी (Number Series)

const series01 = [
  {
    question: "श्रेणी 2, 6, 12, 20, 30, ? में अगला पद क्या होगा?",
    options: ["42", "40", "44", "46"],
    correctIndex: 0,
    explanation: "अंतर: $+4, +6, +8, +10, +12 \\implies 30 + 12 = 42$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 3, 5, 9, 17, 33, ? में अगला पद क्या होगा?",
    options: ["65", "64", "66", "63"],
    correctIndex: 0,
    explanation: "अंतर: $+2, +4, +8, +16, +32 \\implies 33 + 32 = 65$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 1, 4, 9, 16, 25, 36, ? में अगला पद क्या है?",
    options: ["49", "64", "45", "50"],
    correctIndex: 0,
    explanation: "$7^2 = 49$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 1, 8, 27, 64, 125, ? में अगला पद क्या होगा?",
    options: ["216", "343", "256", "196"],
    correctIndex: 0,
    explanation: "$6^3 = 216$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 2, 3, 5, 7, 11, 13, ? में अगला पद क्या होगा?",
    options: ["17", "15", "19", "14"],
    correctIndex: 0,
    explanation: "अभाज्य संख्याएँ: 13 के बाद 17।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 0, 6, 24, 60, 120, 210, ? में अगला पद क्या होगा?",
    options: ["336", "343", "324", "350"],
    correctIndex: 0,
    explanation: "$7^3 - 7 = 343 - 7 = 336$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 4, 9, 19, 39, 79, ? में अगला पद क्या होगा?",
    options: ["159", "158", "160", "149"],
    correctIndex: 0,
    explanation: "$79 \\times 2 + 1 = 159$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 100, 50, 52, 26, 28, ?, 16 में '?' के स्थान पर क्या आएगा?",
    options: ["14", "12", "15", "16"],
    correctIndex: 0,
    explanation: "$28 \\div 2 = 14$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 1, 1, 2, 3, 5, 8, 13, 21, ? में अगला पद क्या होगा?",
    options: ["34", "32", "30", "35"],
    correctIndex: 0,
    explanation: "फाइबोनैचि: $13 + 21 = 34$।",
    difficulty: "easy"
  },
  {
    question: "गलत पद पहचानिए: 3, 7, 15, 39, 63, 127",
    options: ["39", "15", "63", "7"],
    correctIndex: 0,
    explanation: "$2^5 - 1 = 31$ होना चाहिए, 39 गलत है।",
    difficulty: "moderate"
  }
];

const series02 = [
  {
    question: "श्रेणी 6, 13, 28, 59, ? में अगला पद क्या होगा?",
    options: ["122", "120", "118", "124"],
    correctIndex: 0,
    explanation: "$59 \\times 2 + 4 = 122$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 12, 12, 18, 45, 180, ? में अगला पद क्या होगा?",
    options: ["1080", "900", "720", "1200"],
    correctIndex: 0,
    explanation: "$180 \\times 6 = 1080$।",
    difficulty: "hard"
  },
  {
    question: "श्रेणी 5, 16, 51, 158, ? में अगला पद क्या होगा?",
    options: ["481", "479", "483", "475"],
    correctIndex: 0,
    explanation: "$158 \\times 3 + 7 = 481$।",
    difficulty: "hard"
  },
  {
    question: "श्रेणी 7, 8, 18, 57, ? में अगला पद क्या होगा?",
    options: ["232", "228", "240", "230"],
    correctIndex: 0,
    explanation: "$57 \\times 4 + 4 = 232$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 2, 3, 10, 29, 66, ? में अगला पद क्या होगा?",
    options: ["127", "125", "130", "128"],
    correctIndex: 0,
    explanation: "$5^3 + 2 = 127$।",
    difficulty: "moderate"
  },
  {
    question: "गलत पद ज्ञात कीजिए: 8, 27, 64, 125, 218, 343",
    options: ["218", "125", "27", "343"],
    correctIndex: 0,
    explanation: "$6^3 = 216$ होना चाहिए।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 4, 7, 12, 19, 28, ? में अगला पद क्या होगा?",
    options: ["39", "38", "40", "41"],
    correctIndex: 0,
    explanation: "$28 + 11 = 39$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 80, 40, 40, 60, 120, ? में अगला पद क्या होगा?",
    options: ["300", "240", "360", "180"],
    correctIndex: 0,
    explanation: "$120 \\times 2.5 = 300$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 2, 12, 36, 80, 150, ? में अगला पद क्या होगा?",
    options: ["252", "240", "260", "275"],
    correctIndex: 0,
    explanation: "$6^3 + 6^2 = 252$।",
    difficulty: "hard"
  },
  {
    question: "श्रेणी 50, 49, 46, 41, 34, ? में अगला पद क्या होगा?",
    options: ["25", "27", "23", "29"],
    correctIndex: 0,
    explanation: "$34 - 9 = 25$।",
    difficulty: "easy"
  }
];

const series03 = [
  {
    question: "श्रेणी 3, 10, 20, 33, 49, 68, ? में अगला पद क्या होगा?",
    options: ["90", "88", "92", "86"],
    correctIndex: 0,
    explanation: "$68 + 22 = 90$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 11, 13, 17, 19, 23, 29, 31, 37, ? में अगला पद क्या होगा?",
    options: ["41", "39", "43", "45"],
    correctIndex: 0,
    explanation: "37 के बाद अगली अभाज्य संख्या 41 है।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 1, 2, 6, 24, 120, 720, ? में अगला पद क्या होगा?",
    options: ["5040", "4320", "5760", "6480"],
    correctIndex: 0,
    explanation: "$7! = 5040$।",
    difficulty: "easy"
  },
  {
    question: "गलत पद पहचानिए: 1, 2, 4, 8, 16, 32, 64, 96",
    options: ["96", "64", "32", "16"],
    correctIndex: 0,
    explanation: "सही पद 128 होना चाहिए।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 15, 30, 60, 120, 240, ? में अगला पद क्या होगा?",
    options: ["480", "360", "400", "500"],
    correctIndex: 0,
    explanation: "$240 \\times 2 = 480$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 2, 5, 11, 23, 47, ? में अगला पद क्या होगा?",
    options: ["95", "93", "94", "96"],
    correctIndex: 0,
    explanation: "$47 \\times 2 + 1 = 95$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 7, 10, 16, 28, 52, ? में अगला पद क्या होगा?",
    options: ["100", "96", "104", "108"],
    correctIndex: 0,
    explanation: "$52 \\times 2 - 4 = 100$।",
    difficulty: "moderate"
  },
  {
    question: "श्रेणी 1, 3, 7, 15, 31, 63, ? में अगला पद क्या होगा?",
    options: ["127", "125", "129", "126"],
    correctIndex: 0,
    explanation: "$2^7 - 1 = 127$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 13, 25, 49, 97, ? में अगला पद क्या होगा?",
    options: ["193", "195", "191", "194"],
    correctIndex: 0,
    explanation: "$97 \\times 2 - 1 = 193$।",
    difficulty: "easy"
  },
  {
    question: "श्रेणी 9, 27, 31, 155, 161, 1127, ? में अगला पद क्या होगा?",
    options: ["1135", "1130", "1140", "1200"],
    correctIndex: 0,
    explanation: "$1127 + 8 = 1135$।",
    difficulty: "hard"
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

  console.log('Done uploading Ch14! Chapter 14 complete!');
}

run().catch(err => {
  console.error('Error uploading:', err);
  process.exit(1);
});
