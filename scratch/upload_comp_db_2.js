const path = require('path');
const admin = require(path.resolve(process.cwd(), 'server/node_modules/firebase-admin'));
const serviceAccount = require(path.resolve(process.cwd(), 'server/service-account.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

function sanitizeForFirestore(obj) {
  if (obj === null || obj === undefined) return null;
  if (Array.isArray(obj)) {
    if (obj.length > 0 && Array.isArray(obj[0])) {
      return obj.map(row => ({ cells: row.map(cell => sanitizeForFirestore(cell)) }));
    }
    return obj.map(item => sanitizeForFirestore(item));
  }
  if (typeof obj === 'object') {
    const sanitized = {};
    for (const key of Object.keys(obj)) {
      sanitized[key] = sanitizeForFirestore(obj[key]);
    }
    return sanitized;
  }
  return obj;
}

const noteData = {
  topicId: "comp_db_2",
  topicTitle: "DBMS (डेटाबेस मैनेजमेंट सिस्टम)",
  overview: {
    introduction: "डेटाबेस मैनेजमेंट सिस्टम (DBMS - Database Management System) एक अत्यंत परिष्कृत सिस्टम सॉफ्टवेयर पैकेज है जो उपयोगकर्ताओं और प्रोग्राम्स को डेटाबेस को बनाने (Create), पुनर्प्राप्त करने (Retrieve), अद्यतन करने (Update) और प्रबंधित (Manage) करने की सुविधा प्रदान करता है। यह अंतिम उपयोगकर्ता (End-User) और भौतिक डेटाबेस के बीच एक शक्तिशाली इंटरफेस (मध्यस्थ) के रूप में कार्य करता है। DBMS का प्राथमिक लक्ष्य डेटा के कुशल, सुरक्षित और सुविधाजनक भंडारण और प्रबंधन को सुनिश्चित करना है। इसमें ANSI/SPARC 3-स्तरीय आर्किटेक्चर (Physical, Logical, View Level), डेटा सब-लैंग्वेज (DDL, DML, DCL, TCL), डेटाबेस एडमिनिस्ट्रेटर (DBA) की भूमिका, तथा लेन-देन प्रबंधन के प्रसिद्ध 'ACID गुणधर्म' (Atomicity, Consistency, Isolation, Durability) सम्मिलित हैं। सीजी व्यापम (छात्रावास अधीक्षक, पटवारी, आरआई, डाटा एंट्री ऑपरेटर) तथा सीजीपीएससी परीक्षाओं में DBMS के आर्किटेक्चर, ACID गुणों, SQL कमांड श्रेणियों (DDL बनाम DML) और DBA के कार्यों पर नियमित रूप से प्रश्न पूछे जाते हैं।",
    importance: "विश्व की समस्त आधुनिक डिजिटल सेवाएं - चाहे वह बैंकिंग (SBI/RBI), रेलवे टिकटिंग (IRCTC), ई-कॉमर्स (Amazon/Flipkart), या आधार पहचान प्रणाली (UIDAI) हो - DBMS के बिना संभव नहीं हैं। कंप्यूटर सामान्य ज्ञान खंड में DBMS वास्तुकला और SQL कमांड्स पर 2 से 3 प्रश्न हमेशा पूछे जाते हैं।",
    examRelevance: "CG Vyapam Hostel Superintendent, Patwari, RI, Steno, Data Entry Operator, CGPSC State Engineering Services एवं अन्य तकनीकी परीक्षाओं हेतु अनिवार्य टॉपिक।",
    quickFacts: [
      "सॉफ्टवेयर श्रेणी: सिस्टम सॉफ्टवेयर पैकेज (Interface between User & Data)।",
      "ANSI/SPARC 3-स्तरीय आर्किटेक्चर: (1) आंतरिक/भौतिक स्तर (Internal/Physical), (2) वैचारिक/तार्किक स्तर (Conceptual/Logical), (3) बाहरी/दृश्य स्तर (External/View)।",
      "डेटाबेस प्रशासक (DBA): वह व्यक्ति जो संपूर्ण डेटाबेस प्रणाली के डिज़ाइन, सुरक्षा, बैकअप और अनुमतियों का सर्वोच्च नियंत्रक होता है।",
      "ACID गुणधर्म (Transaction Properties): Atomicity (परमाणुता), Consistency (संगतता), Isolation (विलगन), Durability (स्थायित्व)।",
      "डेटा परिभाषा भाषा (DDL): CREATE, ALTER, DROP, TRUNCATE, RENAME (स्कीमा स्तर के कमांड्स)।",
      "डेटा हेरफेर भाषा (DML): SELECT, INSERT, UPDATE, DELETE (डेटा मानों पर कार्य करने वाले कमांड्स)।",
      "डेटा नियंत्रण भाषा (DCL): GRANT (अनुमति देना), REVOKE (अनुमति वापस लेना)।",
      "लेनदेन नियंत्रण भाषा (TCL): COMMIT (स्थायी सुरक्षित करना), ROLLBACK (पूर्व स्थिति में लौटना), SAVEPOINT।"
    ]
  },
  chapters: [
    {
      chapterNumber: 1,
      title: "DBMS का परिचय, आवश्यकता, लाभ एवं प्रमुख अनुप्रयोग",
      content: "डेटाबेस मैनेजमेंट सिस्टम (DBMS) कंप्यूटर प्रोग्रामों का ऐसा समूह है जो बड़े पैमाने पर डेटा के भंडारण, संगठन और त्वरित पुनर्प्राप्ति को नियंत्रित करता है। यह उपयोगकर्ता को डेटा की भौतिक आंतरिक संरचना की जटिलताओं को जाने बिना डेटा के साथ बातचीत करने की अनुमति देता है। DBMS के प्रमुख लाभ: (1) डेटा अतिरेकता पर नियंत्रण (Control of Data Redundancy): सभी डेटा को एक केंद्रीय तार्किक संरचना में रखने से अनावश्यक प्रतियां नहीं बनतीं। (2) डेटा साझाकरण (Data Sharing): अधिकृत उपयोगकर्ता एक साथ एक ही डेटा को विभिन्न अनुप्रयोगों में उपयोग कर सकते हैं। (3) डेटा अखंडता (Data Integrity): डेटाबेस में केवल सही और मान्य डेटा ही दर्ज हो सके, इसके लिए बाधाएं (Constraints) लागू की जाती हैं। (4) अनधिकृत पहुँच पर प्रतिबंध (Restricting Unauthorized Access): सुरक्षा और प्रमाणीकरण के माध्यम से प्रत्येक उपयोगकर्ता के लिए अभिगम सीमाएं तय की जाती हैं। (5) बैकअप और रिकवरी (Backup & Recovery): हार्डवेयर या सॉफ्टवेयर विफलता की स्थिति में स्वचालित बैकअप और रिकवरी तंत्र डेटा को नष्ट होने से बचाता है। DBMS के वास्तविक जीवन में अनुप्रयोग: (i) बैंकिंग: खातों के प्रबंधन, ऋण और जमा की रीयल-टाइम ट्रैकिंग। (ii) एयरलाइंस/रेलवे: आरक्षण और समय-सारणी का प्रबंधन। (iii) विश्वविद्यालय: छात्र पंजीकरण, परीक्षा परिणाम और शुल्क रिकॉर्ड। (iv) दूरसंचार: कॉल रिकॉर्ड, बिलिंग और मोबाइल नेटवर्क बैलेंस प्रबंधन।",
      keyPoints: [
        "DBMS = डेटाबेस और उपयोगकर्ताओं के बीच इंटरफेस प्रदान करने वाला सिस्टम सॉफ्टवेयर।",
        "केंद्रीय नियंत्रण: डेटा दोहराव में भारी कमी और डेटा की उच्च संगति।",
        "डेटा सुरक्षा: भूमिका आधारित अनुमतियां और एन्क्रिप्शन।",
        "बैकअप व रिकवरी: सिस्टम क्रैश होने पर स्वचालित डेटा पुनर्प्राप्ति।"
      ],
      examples: [
        "जब आप एटीएम से पैसे निकालते हैं, तो DBMS सुनिश्चित करता है कि आपके खाते से पैसे कटते ही बैंक सर्वर पर तुरंत अपडेट हो जाए और एसएमएस अलर्ट जारी हो जाए।",
        "विश्वविद्यालय पोर्टल पर परीक्षा परिणाम जारी होने पर लाखों छात्र एक साथ अपने रोल नंबर से अपना परिणाम देख पाते हैं।"
      ],
      subtopics: [
        "DBMS की परिभाषा एवं कार्यप्रणाली",
        "पारंपरिक दृष्टिकोण की तुलना में DBMS के लाभ",
        "आधुनिक उद्योगों में DBMS के प्रमुख अनुप्रयोग"
      ]
    },
    {
      chapterNumber: 2,
      title: "DBMS का 3-स्तरीय आर्किटेक्चर (Three-Schema Architecture)",
      content: "1975 में ANSI/SPARC (American National Standards Institute, Standards Planning and Requirements Committee) द्वारा DBMS के लिए तीन-स्तरीय स्कीमा वास्तुकला (Three-Level Schema Architecture) प्रस्तावित की गई थी। इसका मुख्य उद्देश्य 'डेटा एब्स्ट्रैक्शन' (Data Abstraction - डेटा की जटिल आंतरिक संरचना को छिपाना) और 'डेटा स्वतंत्रता' (Data Independence) प्रदान करना है: (1) आंतरिक स्तर / भौतिक स्तर (Internal / Physical Level): यह सबसे निचला स्तर है। यह बताता है कि डेटा वास्तव में स्टोरेज डिवाइस (हार्ड डिस्क, एसएसडी) पर 'कैसे संग्रहीत' (How data is stored) होता है। इसमें डेटा संरचनाएं, फाइल संगठन, रिकॉर्ड प्रारूप, कंप्रेशन और इंडेक्सिंग शामिल होते हैं। यह स्तर केवल सिस्टम डेवलपर्स और DBA को दिखाई देता है। (2) वैचारिक स्तर / तार्किक स्तर (Conceptual / Logical Level): यह मध्यवर्ती स्तर है। यह बताता है कि डेटाबेस में 'क्या डेटा संग्रहीत' (What data is stored) है और डेटा के विभिन्न तत्वों के बीच क्या संबंध (Relationships) हैं। इसमें सभी इकाइयां (Entities), डेटा प्रकार, संबंध और अखंडता बाधाएं शामिल होती हैं। पूरा डेटाबेस केवल एक ही वैचारिक स्कीमा द्वारा परिभाषित होता है। (3) बाहरी स्तर / दृश्य स्तर (External / View Level): यह सबसे ऊपरी स्तर है जो अंतिम उपयोगकर्ताओं (End-Users) के सबसे करीब होता है। यह विभिन्न उपयोगकर्ताओं के लिए डेटाबेस के अलग-अलग दृश्य (Views) प्रस्तुत करता है। प्रत्येक उपयोगकर्ता केवल वही डेटा देखता है जिससे उसका सरोकार होता है; शेष डेटाबेस उससे छिपा रहता है।",
      keyPoints: [
        "प्रस्तावित: 1975 में ANSI/SPARC समिति द्वारा।",
        "भौतिक स्तर (Physical): डेटा 'कैसे' (How) स्टोर है - बाइट्स, ब्लॉक्स, इंडेक्स।",
        "तार्किक स्तर (Conceptual/Logical): 'क्या' (What) डेटा स्टोर है - एंटिटी, एट्रिब्यूट, संबंध।",
        "दृश्य स्तर (External/View): उपयोगकर्ता को 'क्या दिखता है' (User Views)।",
        "डेटा एब्स्ट्रैक्शन (Data Abstraction): जटिल आंतरिक विवरणों को उपयोगकर्ताओं से छिपाने की प्रक्रिया।"
      ],
      examples: [
        "एक कॉलेज डेटाबेस में: क्लर्क केवल छात्र की फीस की स्थिति देखता है (View 1), शिक्षक केवल छात्र के अंक देखता है (View 2), जबकि दोनों का डेटा एक ही केंद्रीय तार्किक स्कीमा (Conceptual Level) से आता है।",
        "हार्ड डिस्क में डेटा B-Tree इंडेक्स या हैश टेबल के रूप में कैसे सुरक्षित है, यह 'भौतिक स्तर' का विषय है।"
      ],
      subtopics: [
        "ANSI/SPARC 3-स्तरीय मॉडल का परिचय एवं उद्देश्य",
        "भौतिक स्तर, वैचारिक स्तर एवं दृश्य स्तर का विवरण",
        "डेटा एब्स्ट्रैक्शन के स्तर एवं सुरक्षा लाभ"
      ]
    },
    {
      chapterNumber: 3,
      title: "डेटाबेस भाषाएं (DBMS Languages: DDL, DML, DCL, TCL)",
      content: "DBMS में डेटाबेस को डिजाइन करने, डेटा प्रविष्ट करने और नियंत्रित करने के लिए विभिन्न सब-लैंग्वेज (SQL की श्रेणियां) का उपयोग किया जाता है: (1) डेटा परिभाषा भाषा (DDL - Data Definition Language): इसका उपयोग डेटाबेस की संरचना (स्कीमा) को परिभाषित और संशोधित करने के लिए किया जाता है। DDL कमांड्स स्वतः कमिट (Auto-committed) होते हैं, अर्थात् इन्हें रोलबैक नहीं किया जा सकता। प्रमुख DDL कमांड्स: `CREATE` (नई तालिका/डेटाबेस बनाना), `ALTER` (मौजूदा तालिका की संरचना में कॉलम जोड़ना/बदलना), `DROP` (पूरी तालिका और उसके डेटा को स्थायी रूप से नष्ट करना), `TRUNCATE` (तालिका की संरचना बनाए रखते हुए उसके सभी रिकॉर्ड्स को एक साथ हटाना), `RENAME` (तालिका का नाम बदलना)। (2) डेटा हेरफेर भाषा (DML - Data Manipulation Language): इसका उपयोग तालिका के भीतर मौजूद डेटा मानों को पुनर्प्राप्त करने और बदलने के लिए किया जाता है। प्रमुख DML कमांड्स: `SELECT` (डेटा खोजना/देखना), `INSERT` (नया रिकॉर्ड जोड़ना), `UPDATE` (मौजूदा रिकॉर्ड में डेटा बदलना), `DELETE` (शर्त के आधार पर विशिष्ट रिकॉर्ड हटाना)। (3) डेटा नियंत्रण भाषा (DCL - Data Control Language): डेटाबेस के सुरक्षा अधिकारों और विशेषाधिकारों को नियंत्रित करने हेतु। कमांड्स: `GRANT` (उपयोगकर्ता को अधिकार प्रदान करना), `REVOKE` (प्रदान किए गए अधिकार वापस लेना)। (4) लेनदेन नियंत्रण भाषा (TCL - Transaction Control Language): लेन-देन के निष्पादन को प्रबंधित करने हेतु। कमांड्स: `COMMIT` (परिवर्तनों को स्थायी रूप से सुरक्षित करना), `ROLLBACK` (अंतिम कमिट के बाद किए गए परिवर्तनों को रद्द कर पूर्व स्थिति में लौटना), `SAVEPOINT` (लेनदेन के भीतर एक चेकपॉइंट बनाना ताकि आंशिक रोलबैक किया जा सके)।",
      keyPoints: [
        "DDL (स्कीमा परिवर्तन): CREATE, ALTER, DROP, TRUNCATE, RENAME। (ऑटो-कमिट)",
        "DML (डेटा परिवर्तन): SELECT, INSERT, UPDATE, DELETE।",
        "DROP बनाम TRUNCATE: DROP तालिका और स्कीमा दोनों मिटाता है; TRUNCATE केवल सभी डेटा पंक्तियां मिटाता है, संरचना शेष रहती है।",
        "DCL (सुरक्षा): GRANT और REVOKE।",
        "TCL (लेनदेन नियंत्रण): COMMIT, ROLLBACK और SAVEPOINT।"
      ],
      examples: [
        "`ALTER TABLE Student ADD Blood_Group varchar(10);` - यह DDL कमांड का उदाहरण है।",
        "`UPDATE Employee SET Salary = Salary + 5000 WHERE Dept = 'IT';` - यह DML कमांड का उदाहरण है।",
        "`ROLLBACK;` - गलत डेटा दर्ज होने पर लेनदेन को निरस्त करने वाला TCL कमांड।"
      ],
      subtopics: [
        "DDL: स्कीमा निर्माण एवं संरचना संशोधन कमांड्स",
        "DML: डेटा प्रविष्टि, अद्यतन, विलोपन एवं चयन",
        "DCL एवं TCL: सुरक्षा, अनुमतियां और लेनदेन नियंत्रण"
      ]
    },
    {
      chapterNumber: 4,
      title: "लेन-देन प्रबंधन एवं ACID गुणधर्म (ACID Properties)",
      content: "डेटाबेस में 'लेन-देन' (Transaction) तार्किक कार्यों का एक ऐसा समूह है जो डेटा को पढ़ने या लिखने का एक एकल अविभाज्य कार्य निष्पादित करता है। डेटाबेस की विश्वसनीयता और स्थिरता बनाए रखने के लिए प्रत्येक लेन-देन को चार बुनियादी नियमों का पालन करना अनिवार्य है, जिन्हें 'ACID गुणधर्म' कहा जाता है: (1) परमाणुता (Atomicity - All or Nothing): लेन-देन एक अविभाज्य इकाई है। इसका सिद्धांत है 'या तो सभी कार्य पूर्ण होंगे, या फिर कोई भी कार्य नहीं होगा'। यदि लेन-देन के बीच में कोई त्रुटि या बिजली की विफलता होती है, तो किए गए सभी आंशिक परिवर्तन स्वतः 'रोलबैक' (Rollback) हो जाते हैं और डेटाबेस अपनी पूर्व स्थिति में आ जाता है। इसे मैनेज करने का उत्तरदायित्व 'Transaction Manager / Recovery Manager' का होता है। (2) संगतता (Consistency - Correctness): लेन-देन के निष्पादन से पहले और निष्पादन के बाद डेटाबेस हमेशा एक वैध स्थिति (Valid Consistent State) में रहना चाहिए। सभी अखंडता नियम (Integrity Constraints) अनिवार्य रूप से संतुष्ट होने चाहिए। (3) विलगन (Isolation - Concurrency Control): यदि कई लेन-देन एक साथ (Concurrently) निष्पादित हो रहे हों, तो प्रत्येक लेन-देन को यह प्रतीत होना चाहिए कि वह प्रणाली में अकेला चल रहा है। किसी भी लेन-देन के अपूर्ण परिणाम दूसरे लेन-देन को नहीं दिखने चाहिए। इसे 'Concurrency Control Manager' (लॉकिंग या टाइमस्टैम्पिंग) द्वारा प्रबंधित किया जाता है। (4) स्थायित्व (Durability - Permanence): एक बार जब लेन-देन सफलतापूर्वक पूरा (COMMIT) हो जाता है, तो उसके द्वारा किए गए परिवर्तन डेटाबेस में स्थायी रूप से सहेजे जाते हैं, भले ही इसके तुरंत बाद सिस्टम क्रैश या बिजली गुल हो जाए। इसे 'Log File / Recovery Manager' सुनिश्चित करता है।",
      keyPoints: [
        "A - Atomicity (परमाणुता): 'सभी या कुछ नहीं' (All or Nothing); आंशिक लेनदेन अस्वीकार्य।",
        "C - Consistency (संगतता): डेटाबेस नियमों और प्रतिबंधों का सदैव पालन (कुल योग स्थिर रहना)।",
        "I - Isolation (विलगन): समवर्ती लेन-देन एक-दूसरे के मध्यवर्ती परिणामों में हस्तक्षेप नहीं करते।",
        "D - Durability (स्थायित्व): कमिट होने के बाद परिवर्तन हमेशा स्थायी रहते हैं, क्रैश होने पर भी।"
      ],
      examples: [
        "खाता A से ₹5000 कटकर खाता B में जमा होने के लेन-देन में यदि ₹5000 कटने के बाद सर्वर क्रैश हो जाए, तो Atomicity के कारण ₹5000 स्वतः वापस खाता A में लौट आएंगे।",
        "लेन-देन से पहले A और B का कुल बैलेंस ₹20,000 था; ट्रांसफर के बाद भी कुल बैलेंस ₹20,000 ही रहेगा - यह Consistency है।"
      ],
      subtopics: [
        "डेटाबेस लेन-देन (Transaction) की परिभाषा एवं जीवन चक्र",
        "ACID मॉडल: Atomicity, Consistency, Isolation, Durability",
        "समवर्ती नियंत्रण (Concurrency Control) एवं रिकवरी तंत्र"
      ]
    },
    {
      chapterNumber: 5,
      title: "डेटाबेस प्रशासक (DBA), डेटाबेस उपयोगकर्ता एवं प्रमुख DBMS सॉफ्टवेयर",
      content: "डेटाबेस के सफल संचालन में मानव संसाधन और सॉफ्टवेयर की भूमिका: (1) डेटाबेस प्रशासक (DBA - Database Administrator): DBA वह केंद्रीय मुख्य व्यक्ति या टीम होती है जिसके पास संपूर्ण डेटाबेस प्रबंधन प्रणाली पर पूर्ण प्रशासनिक और तकनीकी नियंत्रण होता है। DBA के प्रमुख कार्य: (क) स्कीमा परिभाषा (Schema Definition): डेटाबेस की मूल संरचना और डिजाइन तैयार करना। (ख) भंडारण संरचना और पहुंच विधि निर्धारण। (ग) सुरक्षा एवं प्रमाणीकरण: विभिन्न उपयोगकर्ताओं को यूजर आईडी और अधिकार (Permissions) प्रदान करना। (घ) बैकअप एवं डिजास्टर रिकवरी (Backup & Disaster Recovery): नियमित बैकअप लेना और विफलता पर डेटा पुनर्प्राप्त करना। (ङ) प्रदर्शन ट्यूनिंग (Performance Tuning): डेटाबेस की प्रतिक्रिया गति को बेहतर बनाना। (2) डेटाबेस उपयोगकर्ताओं के प्रकार: (i) नैव यूजर / एंड यूजर (Naive / Parametric Users): अकुशल उपयोगकर्ता जो केवल पूर्व-निर्मित मेनू या फॉर्म पर क्लिक करके डेटा एक्सेस करते हैं (उदा. बैंक टेलर, रेलवे क्लर्क)। (ii) एप्लिकेशन प्रोग्रामर (Application Programmers): जो सॉफ्टवेयर कोड (Java, Python, C#) लिखकर डेटाबेस से संचार करते हैं। (iii) परिष्कृत उपयोगकर्ता (Sophisticated Users): इंजीनियर, विश्लेषक जो सीधे SQL क्वेरी लिखकर जटिल रिपोर्ट निकालते हैं। (iv) विशेष उपयोगकर्ता (Specialized Users): जो AI, ग्राफिक्स या मल्टीमीडिया डेटाबेस विकसित करते हैं। (3) प्रमुख वाणिज्यिक एवं ओपन-सोर्स DBMS सॉफ्टवेयर: Oracle Database, Microsoft SQL Server, MySQL (ओपन सोर्स), PostgreSQL (ओपन सोर्स), IBM Db2, SQLite (एम्बेडेड), MongoDB (NoSQL Document Store)।",
      keyPoints: [
        "DBA = डेटाबेस का मुख्य प्रबंधक; स्कीमा, सुरक्षा, बैकअप और प्रदर्शन का उत्तरदायी।",
        "एंड यूजर्स (Naive Users): केवल GUI इंटरफेस का उपयोग करने वाले क्लर्क या ग्राहक।",
        "ओपन सोर्स DBMS: MySQL, PostgreSQL, SQLite, MariaDB।",
        "वाणिज्यिक (Commercial) DBMS: Oracle, Microsoft SQL Server, IBM Db2।"
      ],
      examples: [
        "रेलवे टिकट बुकिंग काउंटर पर बैठा क्लर्क एक 'नैव यूजर' (Naive User) है, जिसे SQL का कोई ज्ञान नहीं होता, वह केवल स्क्रीन पर फॉर्म भरता है।",
        "डेटाबेस के क्रैश होने पर बैकअप से डेटा को पुनः सक्रिय करना 'DBA' का कार्य है।"
      ],
      subtopics: [
        "डेटाबेस प्रशासक (DBA) के उत्तरदायित्व एवं शक्तियां",
        "डेटाबेस उपयोगकर्ताओं का वर्गीकरण (Naive, Sophisticated, Developers)",
        "लोकप्रिय वाणिज्यिक एवं ओपन-सोर्स DBMS सॉफ्टवेयर"
      ]
    }
  ],
  comparativeTables: [
    {
      title: "SQL कमांड श्रेणियों (DDL बनाम DML बनाम DCL बनाम TCL) की तुलना",
      headers: ["कमांड श्रेणी", "पूर्ण नाम", "प्रभावित क्षेत्र", "प्रमुख कमांड्स", "रोलबैक की संभावना"],
      rows: [
        ["DDL", "Data Definition Language", "डेटाबेस की संरचना / स्कीमा", "CREATE, ALTER, DROP, TRUNCATE, RENAME", "नहीं (स्वतः कमिट / Auto-commit)"],
        ["DML", "Data Manipulation Language", "तालिका का आंतरिक डेटा मान", "SELECT, INSERT, UPDATE, DELETE", "हाँ (TCL के माध्यम से रोलबैक संभव)"],
        ["DCL", "Data Control Language", "सुरक्षा अधिकार व अनुमतियां", "GRANT, REVOKE", "DBMS कार्यान्वयन पर निर्भर"],
        ["TCL", "Transaction Control Language", "लेन-देन की स्थिति व स्थायित्व", "COMMIT, ROLLBACK, SAVEPOINT", "स्वयं रोलबैक को नियंत्रित करता है"]
      ]
    },
    {
      title: "DROP बनाम TRUNCATE बनाम DELETE कमांड में अंतर",
      headers: ["मापदंड", "DELETE", "TRUNCATE", "DROP"],
      rows: [
        ["भाषा श्रेणी", "DML (Data Manipulation)", "DDL (Data Definition)", "DDL (Data Definition)"],
        ["कार्य", "शर्त के अनुसार विशिष्ट पंक्तियों को हटाना", "तालिका के सभी रिकॉर्ड्स को एक साथ हटाना", "पूरी तालिका, डेटा और स्कीमा को नष्ट करना"],
        ["WHERE क्लॉज", "समर्थन करता है (`WHERE id = 5`)", "समर्थन नहीं करता (सभी रिकॉर्ड मिटेंगे)", "लागू नहीं होता"],
        ["गति", "धीमी (पंक्ति-दर-पंक्ति लॉगिंग के कारण)", "अत्यंत तेज (न्यूनतम लॉगिंग)", "अत्यंत तेज"],
        ["रोलबैक", "रोलबैक संभव (Transaction Log सुरक्षित)", "रोलबैक सामान्यतः संभव नहीं", "रोलबैक संभव नहीं"],
        ["संरचना की स्थिति", "तालिका संरचना अपरिवर्तित रहती है", "तालिका संरचना सुरक्षित रहती है", "तालिका संरचना पूरी तरह समाप्त हो जाती है"]
      ]
    },
    {
      title: "ACID गुणधर्मों का सारांश मैट्रिक्स",
      headers: ["गुणधर्म (Property)", "हिंदी नाम", "मूल सिद्धांत", "जिम्मेदार DBMS घटक"],
      rows: [
        ["Atomicity", "परमाणुता", "या तो सभी कार्य पूर्ण होंगे या बिल्कुल नहीं (All or Nothing)", "Transaction Manager / Recovery Manager"],
        ["Consistency", "संगतता", "लेनदेन के पूर्व और पश्चात डेटाबेस का वैध व संतुलित रहना", "DBMS & Application Programmers"],
        ["Isolation", "विलगन", "समवर्ती लेन-देन का एक-दूसरे से अप्रभावित रहना", "Concurrency Control Manager"],
        ["Durability", "स्थायित्व", "कमिट होने के बाद परिवर्तनों का स्थायी रहना (क्रैश के बाद भी)", "Recovery Manager / Log Manager"]
      ]
    }
  ],
  pyqs: [
    {
      question: "डेटाबेस में ACID गुणधर्मों में 'A' का क्या अर्थ है? [CG Vyapam Hostel Superintendent 2016]",
      options: [
        "Accuracy (सटीकता)",
        "Atomicity (परमाणुता)",
        "Availability (उपलब्धता)",
        "Access (पहुँच)"
      ],
      correctAnswer: "Atomicity (परमाणुता)",
      explanation: "ACID में 'A' का अर्थ Atomicity (परमाणुता) होता है। इसका सिद्धांत है कि एक लेन-देन के सभी कार्य या तो पूर्ण रूप से निष्पादित होंगे या फिर कोई भी कार्य नहीं होगा (All or Nothing)।"
    },
    {
      question: "निम्नलिखित में से कौन सा DDL (Data Definition Language) कमांड का एक उदाहरण है? [CG Vyapam Patwari 2017]",
      options: [
        "SELECT",
        "UPDATE",
        "CREATE",
        "INSERT"
      ],
      correctAnswer: "CREATE",
      explanation: "CREATE एक DDL कमांड है जिसका उपयोग डेटाबेस स्कीमा (तालिका, दृश्य आदि) का निर्माण करने के लिए किया जाता है। जबकि SELECT, UPDATE और INSERT डेटा हेरफेर भाषा (DML) के कमांड हैं।"
    },
    {
      question: "संपूर्ण डेटाबेस प्रणाली के डिज़ाइन, सुरक्षा, उपयोगकर्ताओं के विशेषाधिकार और बैकअप के लिए कौन सर्वोच्च उत्तरदायी होता है? [CG Vyapam RI 2018]",
      options: [
        "डेटाबेस प्रशासक (DBA)",
        "सिस्टम एनालिस्ट",
        "एप्लिकेशन प्रोग्रामर",
        "एंड यूजर"
      ],
      correctAnswer: "डेटाबेस प्रशासक (DBA)",
      explanation: "डेटाबेस प्रशासक (DBA - Database Administrator) डेटाबेस की संरचना, सुरक्षा नीतियों, उपयोगकर्ता अनुमतियों और बैकअप-रिकवरी का केंद्रीय नियंत्रक होता है।"
    },
    {
      question: "तालिका की संरचना (Schema) को बरकरार रखते हुए उसके सभी रिकॉर्ड्स को एक साथ हटाने के लिए सबसे तीव्र कमांड कौन सा है? [CG Vyapam Data Entry Operator 2019]",
      options: [
        "DELETE",
        "DROP",
        "TRUNCATE",
        "REMOVE"
      ],
      correctAnswer: "TRUNCATE",
      explanation: "TRUNCATE एक DDL कमांड है जो तालिका की संरचना को मिटाए बिना उसके सभी डेटा को बहुत तेजी से हटा देता है। DROP तालिका की संरचना को ही मिटा देता है, जबकि DELETE पंक्ति-दर-पंक्ति हटाता है।"
    },
    {
      question: "ANSI/SPARC 3-स्तरीय डेटाबेस आर्किटेक्चर में कौन सा स्तर यह बताता है कि डेटा वास्तव में भौतिक स्टोरेज पर कैसे संग्रहीत है? [CGPSC SES 2020]",
      options: [
        "External Level",
        "Conceptual Level",
        "Internal / Physical Level",
        "Logical Level"
      ],
      correctAnswer: "Internal / Physical Level",
      explanation: "आंतरिक या भौतिक स्तर (Internal/Physical Level) यह निर्धारित करता है कि डेटा हार्डवेयर और स्टोरेज डिवाइस पर भौतिक रूप से बाइट्स, ब्लॉक्स और इंडेक्सिंग के माध्यम से कैसे संग्रहीत है।"
    },
    {
      question: "डेटाबेस में किए गए परिवर्तनों को स्थायी रूप से सुरक्षित करने के लिए किस TCL कमांड का उपयोग किया जाता है? [CG Vyapam AGDO 2021]",
      options: [
        "SAVE",
        "COMMIT",
        "ROLLBACK",
        "STORE"
      ],
      correctAnswer: "COMMIT",
      explanation: "TCL (Transaction Control Language) का 'COMMIT' कमांड वर्तमान लेन-देन द्वारा किए गए सभी परिवर्तनों को डेटाबेस में स्थायी रूप से सहेजता है।"
    }
  ],
  mcqs: [
    {
      question: "डेटाबेस लेन-देन के दौरान यदि कोई अनहोनी हो जाए, तो अंतिम सुरक्षित स्थिति में लौटने के लिए कौन सा कमांड प्रयुक्त होता है?",
      options: [
        "COMMIT",
        "ROLLBACK",
        "REVOKE",
        "RESTORE"
      ],
      correctAnswer: "ROLLBACK",
      explanation: "'ROLLBACK' कमांड अपूर्ण या असफल लेनदेन के सभी आंशिक परिवर्तनों को पूर्ववत (Undo) कर डेटाबेस को अंतिम कमिट की गई सुरक्षित स्थिति में लौटा देता है।"
    },
    {
      question: "किसी अन्य उपयोगकर्ता को डेटाबेस में तालिका देखने या बदलने की अनुमति देने के लिए किस DCL कमांड का उपयोग किया जाता है?",
      options: [
        "ALLOW",
        "PERMIT",
        "GRANT",
        "REVOKE"
      ],
      correctAnswer: "GRANT",
      explanation: "'GRANT' एक DCL (Data Control Language) कमांड है जिसका उपयोग डेटाबेस उपयोगकर्ताओं को विशिष्ट अधिकार और विशेषाधिकार प्रदान करने हेतु किया जाता है। अधिकार वापस लेने हेतु 'REVOKE' प्रयुक्त होता है।"
    },
    {
      question: "एक समय में कई उपयोगकर्ताओं द्वारा एक साथ डेटाबेस एक्सेस करने पर मध्यवर्ती परिणामों के टकराव को रोकने का गुण क्या कहलाता है?",
      options: [
        "Atomicity",
        "Consistency",
        "Isolation (विलगन)",
        "Durability"
      ],
      correctAnswer: "Isolation (विलगन)",
      explanation: "आइसोलेशन (Isolation) यह सुनिश्चित करता है कि समवर्ती रूप से चलने वाले लेन-देन एक-दूसरे के अपूर्ण डेटा को न देख सकें और समानांतर लेन-देन का परिणाम क्रमिक (Serial) निष्पादन के समान हो।"
    },
    {
      question: "निम्नलिखित में से कौन सा ओपन-सोर्स (Open-Source) रिलेशनल डेटाबेस मैनेजमेंट सिस्टम है?",
      options: [
        "Oracle Database",
        "Microsoft SQL Server",
        "MySQL",
        "IBM Db2"
      ],
      correctAnswer: "MySQL",
      explanation: "MySQL और PostgreSQL अत्यंत लोकप्रिय ओपन-सोर्स RDBMS हैं। जबकि Oracle, Microsoft SQL Server और IBM Db2 स्वामित्व वाले (Proprietary / Commercial) सॉफ्टवेयर हैं।"
    },
    {
      question: "मौजूदा तालिका में एक नया कॉलम जोड़ने के लिए किस SQL कमांड का उपयोग किया जाएगा?",
      options: [
        "UPDATE TABLE",
        "ALTER TABLE",
        "INSERT TABLE",
        "MODIFY TABLE"
      ],
      correctAnswer: "ALTER TABLE",
      explanation: "तालिका की संरचना (स्कीमा) में बदलाव करने, जैसे नया कॉलम जोड़ने या हटाने के लिए 'ALTER TABLE' (DDL कमांड) का उपयोग किया जाता है।"
    },
    {
      question: "बैंक काउंटर पर बैठकर केवल ग्राहकों के चेक जमा करने वाला क्लर्क किस श्रेणी का डेटाबेस उपयोगकर्ता है?",
      options: [
        "DBA",
        "Application Programmer",
        "Naive / Parametric User",
        "Sophisticated User"
      ],
      correctAnswer: "Naive / Parametric User",
      explanation: "नैव यूजर (Naive / Parametric User) वे होते हैं जिन्हें DBMS या SQL का आंतरिक ज्ञान नहीं होता, वे केवल पहले से बने ग्राफिकल फॉर्म्स और मेनू के माध्यम से कार्य करते हैं।"
    },
    {
      question: "डेटाबेस में 'डेटा एब्स्ट्रैक्शन' (Data Abstraction) का मुख्य उद्देश्य क्या होता है?",
      options: [
        "डेटाबेस का आकार बढ़ाना",
        "जटिल आंतरिक तकनीकी विवरणों को छिपाकर उपयोगकर्ता को केवल प्रासंगिक डेटा दिखाना",
        "सभी तालिकाओं को एक साथ डिलीट करना",
        "डेटा को पूरी तरह पासवर्ड मुक्त करना"
      ],
      correctAnswer: "जटिल आंतरिक तकनीकी विवरणों को छिपाकर उपयोगकर्ता को केवल प्रासंगिक डेटा दिखाना",
      explanation: "डेटा एब्स्ट्रैक्शन का अर्थ है भंडारण और कार्यान्वयन की अनावश्यक जटिलताओं को उपयोगकर्ताओं से छिपाना और उन्हें केवल उनकी आवश्यकता का सरल दृश्य प्रदान करना।"
    },
    {
      question: "निम्नलिखित में से कौन सा कमांड DML (Data Manipulation Language) के अंतर्गत आता है?",
      options: [
        "DROP",
        "TRUNCATE",
        "ALTER",
        "UPDATE"
      ],
      correctAnswer: "UPDATE",
      explanation: "UPDATE एक DML कमांड है जिसका उपयोग तालिका के मौजूदा रिकॉर्ड्स में डेटा मानों को बदलने हेतु किया जाता है। DROP, TRUNCATE और ALTER तीनों DDL कमांड हैं।"
    }
  ],
  keyTerminology: [
    {
      term: "DBMS",
      definition: "Database Management System - डेटाबेस के निर्माण, रखरखाव, क्वेरी और सुरक्षा को नियंत्रित करने वाला सिस्टम सॉफ्टवेयर पैकेज।"
    },
    {
      term: "DBA (Database Administrator)",
      definition: "डेटाबेस की संपूर्ण संरचना, संचालन, सुरक्षा, उपयोगकर्ता अनुमतियों और बैकअप का सर्वोच्च तकनीकी प्रबंधक।"
    },
    {
      term: "ACID गुणधर्म",
      definition: "डेटाबेस लेन-देन की विश्वसनीयता के चार स्तंभ: Atomicity (परमाणुता), Consistency (संगतता), Isolation (विलगन), Durability (स्थायित्व)।"
    },
    {
      term: "DDL (Data Definition Language)",
      definition: "डेटाबेस की संरचना, तालिकाओं और स्कीमा को परिभाषित करने वाले कमांड्स (CREATE, ALTER, DROP, TRUNCATE)।"
    },
    {
      term: "DML (Data Manipulation Language)",
      definition: "तालिका के आंतरिक डेटा मानों को दर्ज करने, देखने, बदलने और हटाने वाले कमांड्स (SELECT, INSERT, UPDATE, DELETE)।"
    },
    {
      term: "DCL (Data Control Language)",
      definition: "डेटाबेस उपयोगकर्ताओं के विशेषाधिकारों और सुरक्षा अनुमतियों को नियंत्रित करने वाले कमांड्स (GRANT, REVOKE)।"
    },
    {
      term: "TCL (Transaction Control Language)",
      definition: "डेटाबेस में लेन-देन के प्रभाव को स्थायी करने या रद्द करने वाले कमांड्स (COMMIT, ROLLBACK, SAVEPOINT)।"
    },
    {
      term: "डेटा एब्स्ट्रैक्शन (Data Abstraction)",
      definition: "उपयोगकर्ताओं से डेटा के आंतरिक भंडारण और हार्डवेयर संबंधी जटिल विवरणों को छिपाने का सिद्धांत।"
    }
  ],
  sources: [
    {
      title: "Database System Concepts (Silberschatz, Korth, Sudarshan - 7th Edition)",
      description: "DBMS आर्किटेक्चर, ACID गुणधर्म, ट्रांजैक्शन मैनेजमेंट एवं SQL कमांड्स का मानक पाठ्य संदर्भ।"
    },
    {
      title: "Fundamentals of Database Systems (Elmasri & Navathe)",
      description: "ANSI/SPARC 3-स्कीमा वास्तुकला, डेटा एब्स्ट्रैक्शन एवं DBA के कार्यों का आधिकारिक विश्लेषण।"
    },
    {
      title: "CG Vyapam Computer Awareness Solved Papers (2015-2024)",
      description: "छात्रावास अधीक्षक, पटवारी, आरआई और व्यापम परीक्षाओं के विगत वर्षों के प्रश्नों का संकलन।"
    },
    {
      title: "W3Schools & Oracle SQL Documentation",
      description: "DDL, DML, DCL, TCL कमांड्स के मानक सिंटैक्स एवं व्यावहारिक उदाहरण।"
    }
  ],
  confusionBuster: [
    {
      concept: "DROP बनाम TRUNCATE",
      confusion: "दोनों कमांड्स से टेबल खाली होने पर भ्रम।",
      clarification: "'DROP' पूरी टेबल और उसकी संरचना (स्कीमा) दोनों को नष्ट कर देता है; 'TRUNCATE' केवल डेटा पंक्तियों को मिटाता है, टेबल की संरचना भविष्य की प्रविष्टियों हेतु यथावत बनी रहती है।"
    },
    {
      concept: "TRUNCATE बनाम DELETE",
      confusion: "दोनों के कार्य और भाषा श्रेणी में भ्रम।",
      clarification: "'DELETE' एक DML कमांड है जो WHERE क्लॉज से चुनिंदा पंक्तियां हटाता है और इसे रोलबैक किया जा सकता है; 'TRUNCATE' एक DDL कमांड है जो पूरी टेबल को एक झटके में खाली करता है और सामान्यतः रोलबैक नहीं होता।"
    },
    {
      concept: "DDL बनाम DML",
      confusion: "कमांड्स के वर्गीकरण में भ्रम (जैसे UPDATE किसमें आता है)।",
      clarification: "DDL टेबल की 'अलमारी' (संरचना) बनाता या बदलता है (CREATE, ALTER); DML अलमारी के 'अंदर के सामान' (डेटा) को रखता या बदलता है (INSERT, UPDATE, DELETE)।"
    },
    {
      concept: "Atomicity बनाम Durability",
      confusion: "लेनदेन की सफलता के नियमों में अंतर।",
      clarification: "Atomicity कहती है कि काम 'पूरा होगा या बिल्कुल नहीं' (All or Nothing); Durability कहती है कि काम एक बार पूरा (Commit) हो गया तो वह 'क्रैश के बाद भी हमेशा बना रहेगा'।"
    },
    {
      concept: "GRANT बनाम REVOKE",
      confusion: "अधिकार देने और वापस लेने में भ्रम।",
      clarification: "'GRANT' उपयोगकर्ता को परमिशन देता है; 'REVOKE' दी गई परमिशन को वापस छीन लेता है।"
    }
  ],
  faqList: [
    {
      question: "डेटाबेस में DDL कमांड्स स्वतः कमिट (Auto-committed) क्यों होते हैं?",
      answer: "क्योंकि DDL कमांड्स सीधे डेटाबेस कैटलॉग (मेटाडेटा) और स्टोरेज संरचना में बदलाव करते हैं। सिस्टम अखंडता बनाए रखने के लिए यह संरचनात्मक परिवर्तन तत्काल स्थायी रूप से लागू हो जाता है।"
    },
    {
      question: "डेटाबेस में SAVEPOINT का क्या कार्य होता है?",
      answer: "SAVEPOINT किसी बड़े लेन-देन के बीच में एक अस्थायी चेकपॉइंट बनाता है। यदि लेन-देन के उत्तरार्ध में कोई त्रुटि हो, तो पूरे लेन-देन को रद्द करने के बजाय केवल उस SAVEPOINT तक आंशिक रोलबैक (Partial Rollback) किया जा सकता है।"
    },
    {
      question: "समवर्ती नियंत्रण (Concurrency Control) की विफलता पर कौन सी प्रमुख समस्याएं उत्पन्न होती हैं?",
      answer: "समवर्ती नियंत्रण के अभाव में 'Lost Update Problem' (एक का अपडेट दूसरे द्वारा ओवरराइट होना), 'Dirty Read Problem' (अप्रामाणिक अपूर्ण डेटा पढ़ना), और 'Inconsistent Analysis' जैसी गंभीर विसंगतियां आती हैं।"
    },
    {
      question: "DBA और सामान्य सिस्टम एडमिनिस्ट्रेटर में क्या अंतर है?",
      answer: "सिस्टम एडमिनिस्ट्रेटर पूरे ऑपरेटिंग सिस्टम और हार्डवेयर नेटवर्क का प्रबंधन करता है; जबकि DBA विशिष्ट रूप से डेटाबेस सॉफ्टवेयर, उसकी संरचना, डेटा अखंडता और डेटा सुरक्षा का विशेषज्ञ होता है।"
    },
    {
      question: "SQL में SELECT कमांड को कुछ संदर्भों में DQL (Data Query Language) क्यों कहा जाता है?",
      answer: "यद्यपि SELECT व्यापक रूप से DML का हिस्सा माना जाता है, किन्तु चूँकि यह डेटा में कोई बदलाव (Modification) नहीं करता और केवल डेटा पुनर्प्राप्त करता है, इसलिए कई लेखक इसे DQL (Data Query Language) की स्वतंत्र श्रेणी में रखते हैं।"
    }
  ],
  oneLinerRevision: [
    "DBMS अंतिम उपयोगकर्ता और भौतिक डेटाबेस के बीच एक इंटरफेस की तरह काम करने वाला सिस्टम सॉफ्टवेयर है।",
    "ANSI/SPARC 3-स्तरीय वास्तुकला में Physical, Conceptual और External स्तर शामिल हैं।",
    "डेटाबेस संरचना, सुरक्षा और बैकअप का सर्वोच्च नियंत्रक 'डेटाबेस प्रशासक' (DBA) होता है।",
    "ACID में 'A' का अर्थ Atomicity (All or Nothing) और 'D' का अर्थ Durability (स्थायित्व) है।",
    "CREATE, ALTER, DROP और TRUNCATE डेटा परिभाषा भाषा (DDL) के कमांड हैं।",
    "SELECT, INSERT, UPDATE और DELETE डेटा हेरफेर भाषा (DML) के कमांड हैं।",
    "GRANT और REVOKE सुरक्षा नियंत्रण भाषा (DCL) के कमांड हैं।",
    "COMMIT, ROLLBACK और SAVEPOINT लेन-देन नियंत्रण भाषा (TCL) के कमांड हैं।",
    "TRUNCATE संरचना रखे बिना सारे रिकॉर्ड हटाता है, जबकि DROP पूरी तालिका नष्ट करता है।",
    "MySQL, PostgreSQL और SQLite लोकप्रिय ओपन-सोर्स DBMS सॉफ्टवेयर हैं।"
  ],
  rapidRevision: {
    points: [
      "DBMS: डेटाबेस और यूजर के बीच इंटरफेस; डेटा अतिरेकता और असंगति को समाप्त करता है।",
      "3-लेवल आर्किटेक्चर: Physical (कैसे स्टोर है), Conceptual (क्या स्टोर है), External/View (क्या दिखता है)।",
      "ACID गुण: Atomicity (ऑल या नथिंग), Consistency (नियमों की वैधता), Isolation (समानांतर सुरक्षा), Durability (स्थायी कमिट)।",
      "SQL कमांड श्रेणियां: DDL (संरचना), DML (डेटा मान), DCL (अनुमतियां), TCL (लेनदेन)।",
      "DROP (संरचना खत्म), TRUNCATE (तेज खाली करना), DELETE (पंक्ति-दर-पंक्ति विलोपन)।",
      "DBA: सर्वोच्च नियंत्रक; बैकअप, सुरक्षा, ट्यूनिंग का प्रबंधक।"
    ]
  }
};

async function uploadTopic() {
  const docId = 'cgv_master_comp_db_2';
  const sanitized = sanitizeForFirestore(noteData);

  const fullPayload = {
    ...sanitized,
    examId: 'cgv_master',
    updatedAt: new Date().toISOString(),
    studyNotes: sanitized
  };

  await db.collection('topic_study_notes').doc(docId).set(fullPayload);
  console.log(`[Uploaded] topic_study_notes/${docId} successfully written with dual root & studyNotes wrapper.`);

  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const syllabusDoc = await syllabusRef.get();
  if (syllabusDoc.exists) {
    const data = syllabusDoc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === 'cgv_master_sub_7') {
        for (const ch of sub.chapters || []) {
          if (ch.id === 'cgv_master_sub_7_ch_5') {
            for (const top of ch.topics || []) {
              if (top.id === 'comp_db_2') {
                top.hasStudyNotes = true;
                updated = true;
              }
            }
          }
        }
      }
    }
    if (updated) {
      await syllabusRef.update({ subjects: data.subjects, updatedAt: new Date().toISOString() });
      console.log(`[Syllabus Synced] hasStudyNotes: true for comp_db_2`);
    }
  }

  console.log("Topic comp_db_2 (DBMS) completed successfully!");
}

uploadTopic().catch(err => {
  console.error("Upload error:", err);
  process.exit(1);
});
