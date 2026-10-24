const path = require('path');
const admin = require(path.resolve(process.cwd(), 'server/node_modules/firebase-admin'));
const serviceAccount = require(path.resolve(process.cwd(), 'server/service-account.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

function sanitizeForFirestore(data) {
  if (data === undefined) return null;
  if (Array.isArray(data)) {
    return data.map(item => {
      if (Array.isArray(item)) {
        return { cells: item.map(cell => (cell === undefined ? null : cell)) };
      }
      return sanitizeForFirestore(item);
    });
  }
  if (data !== null && typeof data === 'object') {
    const cleanObj = {};
    for (const [key, val] of Object.entries(data)) {
      cleanObj[key] = sanitizeForFirestore(val);
    }
    return cleanObj;
  }
  return data;
}

const topicNotes = {
  topicId: 'comp_exam_2',
  title: 'महत्वपूर्ण कंप्यूटर पूर्ण रूप (Important Full Forms - WWW, HTTP, SMTP, HTML)',
  subject: 'कंप्यूटर ज्ञान',
  chapter: 'प्रतियोगी परीक्षा विशेष',
  examCategory: 'CG Vyapam / CGPSC',
  lastUpdated: new Date().toISOString(),

  overview: {
    introduction: 'कंप्यूटर, इंटरनेट, प्रोग्रामिंग और सूचना प्रौद्योगिकी में प्रयुक्त तकनीकी मानकों और संचार प्रोटोकॉल्स के संक्षिप्त रूपों के सटीक पूर्ण रूप (Full Forms) का ज्ञान प्रतियोगी परीक्षाओं के लिए अत्यंत निर्णायक होता है। इस विषय में वर्ल्ड वाइड वेब, मार्कअप भाषाएं, इंटरनेट प्रोटोकॉल्स और दूरसंचार से संबंधित सर्वाधिक पूछे जाने वाले फुल फॉर्म्स का गहन संकलन प्रस्तुत है।',
    importance: 'सीजी व्यापम (हॉस्टल वार्डन, पटवारी, राजस्व निरीक्षक, मंडी उपनिरीक्षक, सहायक ग्रेड-3) की परीक्षाओं में सीधे 5 से 7 प्रश्न फुल फॉर्म्स पर आधारित होते हैं। इनमें WWW, HTTP, HTML, SMTP, SIM, Wi-Fi, VIRUS, OMR, MICR जैसे तकनीकी पदों के सटीक शब्द विन्यास की जांच की जाती है।',
    examRelevance: 'परीक्षाओं में भ्रामक विकल्पों (जैसे Hypertext Transfer Protocol बनाम Hyperlink Transfer Protocol) के बीच सही विकल्प की पहचान करना, प्रोटोकॉल के डिफ़ॉल्ट पोर्ट्स और उनके खोजकर्ताओं/विकास संगठनों (जैसे Tim Berners-Lee, W3C) से जुड़े प्रश्नों का सीधा संबंध इसी विषय से है।',
    quickFacts: [
      { label: 'WWW के आविष्कारक', value: 'टिम बर्नर्स-ली (Tim Berners-Lee) - 1989' },
      { label: 'HTML का पूर्ण रूप', value: 'HyperText Markup Language' },
      { label: 'HTTP का पूर्ण रूप', value: 'HyperText Transfer Protocol' },
      { label: 'SMTP का पोर्ट', value: 'Port 25 (Simple Mail Transfer Protocol)' },
      { label: 'VIRUS का पूर्ण रूप', value: 'Vital Information Resources Under Siege' }
    ]
  },

  chapters: [
    {
      chapterNumber: 1,
      title: 'इंटरनेट एवं वर्ल्ड वाइड वेब पूर्ण रूप (WWW, HTTP, HTML, URL, W3C)',
      content: `### 1. वर्ल्ड वाइड वेब (WWW) एवं संबंधित शब्दावली
- **WWW (World Wide Web):** इंटरनेट पर जुड़े हाइपरटेक्स्ट दस्तावेजों का एक विशाल वैश्विक संग्रह। इसका आविष्कार 1989 में **टिम बर्नर्स-ली (Tim Berners-Lee)** ने CERN प्रयोगशाला में किया था। इसे सामान्यतः 'W3' या 'Web' भी कहा जाता है।
- **W3C (World Wide Web Consortium):** वर्ल्ड वाइड वेब के लिए अंतरराष्ट्रीय मानकों को विकसित और बनाए रखने वाली मुख्य संस्था (स्थापना: 1994, अध्यक्ष: टिम बर्नर्स-ली)।
- **URL (Uniform Resource Locator):** वेब पर किसी विशिष्ट दस्तावेज, छवि या वेब पेज का अद्वितीय वैश्विक पता। इसके तीन मुख्य भाग होते हैं: प्रोटोकॉल (जैसे https://), डोमेन नाम (जैसे vyapam.cgstate.gov.in), और फ़ाइल पथ (Path)।
- **URI (Uniform Resource Identifier):** किसी संसाधन की पहचान करने वाला व्यापक मानक (URL, URI का ही एक प्रकार है)।

### 2. वेब मार्कअप एवं स्टाइल भाषाएं
- **HTML (HyperText Markup Language):** वेब पेजों की संरचना (Structure) और सामग्री तैयार करने के लिए प्रयुक्त मानक मार्कअप भाषा। इसमें टैग्स (<tag>) का प्रयोग होता है।
- **DHTML (Dynamic HyperText Markup Language):** स्थिर HTML, CSS और जावास्क्रिप्ट का संयोजन जिससे गतिशील और इंटरैक्टिव वेब पेज बनाए जाते हैं।
- **XML (Extensible Markup Language):** डेटा को ले जाने (Transport) और स्टोर करने के लिए बनाई गई भाषा, जिसमें यूजर अपने स्वयं के कस्टम टैग्स बना सकता है।
- **XHTML (Extensible HyperText Markup Language):** HTML का अधिक कड़ा (Stricter) और XML-आधारित संस्करण।
- **CSS (Cascading Style Sheets):** वेब पेजों के स्वरूप, लेआउट, रंग और डिज़ाइन (Presentation) को नियंत्रित करने वाली स्टाइल शीट भाषा।

### 3. वेब ट्रांसफर प्रोटोकॉल
- **HTTP (HyperText Transfer Protocol):** वेब ब्राउज़र (क्लाइंट) और वेब सर्वर के बीच वेब पेजों और मल्टीमीडिया का स्थानांतरण करने वाला मानक प्रोटोकॉल (डिफ़ॉल्ट पोर्ट: 80)।
- **HTTPS (HyperText Transfer Protocol Secure):** HTTP का सुरक्षित और एन्क्रिप्टेड रूप जो SSL/TLS का उपयोग करता है (डिफ़ॉल्ट पोर्ट: 443)। बैंक और ई-कॉमर्स वेबसाइट्स में इसका प्रयोग अनिवार्य है।`,
      keyTakeaways: [
        'WWW का आविष्कार 1989 में Tim Berners-Lee द्वारा किया गया था।',
        'HTML वेब पेज की संरचना बनाता है, जबकि CSS उसके डिज़ाइन और लेआउट को संवारता है।',
        'HTTP पोर्ट 80 पर तथा HTTPS (सुरक्षित) पोर्ट 443 पर कार्य करता है।'
      ]
    },
    {
      chapterNumber: 2,
      title: 'नेटवर्किंग, ईमेल एवं संचार प्रोटोकॉल (TCP/IP, SMTP, POP, IMAP, VoIP)',
      content: `### 1. कोर नेटवर्किंग प्रोटोकॉल्स
- **TCP/IP (Transmission Control Protocol / Internet Protocol):** इंटरनेट का मूल संचार सूट (Protocol Suite)।
  - **TCP:** डेटा को छोटे पैकेट्स में विभाजित करता है और सुनिश्चित करता है कि सभी पैकेट्स बिना किसी त्रुटि के क्रम से गंतव्य तक पहुंचे (Connection-oriented)।
  - **IP:** डेटा पैकेट्स पर सोर्स और डेस्टिनेशन का लॉजिकल एड्रेस (IP Address) लगाकर उन्हें सही मार्ग से भेजता है (Connectionless)।
- **UDP (User Datagram Protocol):** गति-उन्मुख और कनेक्शन-रहित प्रोटोकॉल जो बिना हैंडशेक के डेटा भेजता है (वीडियो स्ट्रीमिंग, ऑनलाइन गेम्स और DNS में प्रयुक्त)।
- **FTP (File Transfer Protocol):** नेटवर्क पर फाइलों को डाउनलोड और अपलोड करने का प्रोटोकॉल (डिफ़ॉल्ट पोर्ट 20 डेटा हेतु, पोर्ट 21 कंट्रोल कमांड्स हेतु)।
- **TFTP (Trivial File Transfer Protocol):** UDP आधारित न्यूनतम सुविधाओं वाला सरल फाइल ट्रांसफर प्रोटोकॉल (Port 69)।
- **TELNET (Teletype Network):** रिमोट कंप्यूटर को टेक्स्ट-आधारित कमांड्स द्वारा नियंत्रित करने का प्रोटोकॉल (Port 23, अनएन्क्रिप्टेड)।
- **SSH (Secure Shell):** रिमोट सर्वर एक्सेस करने का सुरक्षित और एन्क्रिप्टेड प्रोटोकॉल (Port 22)।

### 2. ईमेल संचार प्रोटोकॉल्स (Email Protocols)
- **SMTP (Simple Mail Transfer Protocol):** उपयोगकर्ता से मेल सर्वर को या एक मेल सर्वर से दूसरे मेल सर्वर को ईमेल **भेजने (Send / Push)** के लिए प्रयुक्त प्रोटोकॉल (डिफ़ॉल्ट पोर्ट: 25)।
- **POP3 (Post Office Protocol Version 3):** मेल सर्वर से ईमेल को लोकल कंप्यूटर पर **डाउनलोड या प्राप्त (Receive / Retrieve)** करने का प्रोटोकॉल (डिफ़ॉल्ट पोर्ट: 110)। डाउनलोड के बाद सामान्यतः ईमेल सर्वर से डिलीट हो जाता है।
- **IMAP (Internet Message Access Protocol):** ईमेल को सर्वर पर ही प्रबंधित, व्यवस्थित और विभिन्न उपकरणों (फोन, लैपटॉप) से सिंक करने का आधुनिक प्रोटोकॉल (डिफ़ॉल्ट पोर्ट: 143)।
- **MIME (Multipurpose Internet Mail Extensions):** ईमेल में सादे टेक्स्ट के अलावा छवियां, ऑडियो, वीडियो और अटैचमेंट्स भेजने में सक्षम बनाने वाला मानक।

### 3. उन्नत संचार प्रोटोकॉल
- **VoIP (Voice over Internet Protocol):** पारंपरिक टेलीफोन लाइन के बजाय इंटरनेट कनेक्शन (IP नेटवर्क) के माध्यम से वॉयस कॉल करने की तकनीक (जैसे WhatsApp कॉल, Skype)।`,
      keyTakeaways: [
        'SMTP केवल ईमेल "भेजने" (Send) के लिए प्रयुक्त होता है (Port 25)।',
        'POP3 और IMAP ईमेल "प्राप्त करने" (Receive) के लिए प्रयुक्त होते हैं।',
        'VoIP का पूर्ण रूप Voice over Internet Protocol है।'
      ]
    },
    {
      chapterNumber: 3,
      title: 'प्रोग्रामिंग भाषाएं, डेटाबेस एवं सॉफ्टवेयर विकास पूर्ण रूप (BASIC, SQL, OOP)',
      content: `### 1. ऐतिहासिक एवं प्रमुख प्रोग्रामिंग भाषाएं
- **FORTRAN (Formula Translation):** जॉन बैकस (John Backus) द्वारा 1957 में IBM के लिए विकसित विश्व की पहली उच्च-स्तरीय प्रोग्रामिंग भाषा (वैज्ञानिक व गणितीय गणनाओं हेतु)।
- **COBOL (Common Business-Oriented Language):** ग्रेस हॉपर द्वारा 1959 में व्यावसायिक और वाणिज्यिक अनुप्रयोगों के लिए डिजाइन की गई भाषा।
- **BASIC (Beginners All-purpose Symbolic Instruction Code):** जॉन केमेनी और थॉमस कर्ट्ज द्वारा 1964 में छात्रों को प्रोग्रामिंग सिखाने के लिए विकसित सरल भाषा।
- **ALGOL (Algorithmic Language):** 1958 में विकसित एल्गोरिदम-केंद्रित भाषा।
- **SQL (Structured Query Language):** रिलेशनल डेटाबेस को मैनेज और क्वेरी करने की सार्वभौमिक मानक भाषा (IBM द्वारा 1970 के दशक में विकसित)।
- **PHP (Hypertext Preprocessor / मूल रूप: Personal Home Page):** सर्वर-साइड ओपन-सोर्स स्क्रिप्टिंग भाषा जो डायनामिक वेब पेजों के लिए प्रयुक्त होती है।
- **OOP (Object-Oriented Programming):** डेटा और फंक्शंस को एक ऑब्जेक्ट के रूप में बांधने वाली प्रोग्रामिंग अवधारणा (जैसे C++, Java, Python)।

### 2. वेब स्क्रिप्टिंग एवं फ्रेमवर्क संक्षिप्ताक्षर
- **JSP (JavaServer Pages):** जावा तकनीक पर आधारित गतिशील वेब पेज बनाने की तकनीक।
- **ASP (Active Server Pages):** माइक्रोसॉफ्ट का सर्वर-साइड स्क्रिप्टिंग इंजन।
- **AJAX (Asynchronous JavaScript and XML):** पूरे वेब पेज को रीलोड किए बिना बैकग्राउंड में डेटा अपडेट करने की वेब तकनीक।
- **JSON (JavaScript Object Notation):** हल्का और मानव-पठनीय डेटा इंटरचेंज फॉर्मेट।

### 3. सॉफ्टवेयर विकास शब्दावली
- **SDK (Software Development Kit):** विशिष्ट प्लेटफॉर्म के सॉफ्टवेयर निर्माण हेतु टूल्स का बंडल।
- **API (Application Programming Interface):** विभिन्न सॉफ्टवेयरों के बीच संवाद स्थापित करने वाला इंटरफेस।
- **SDK बनाम API:** API केवल संचार का नियम/इंटरफेस है, जबकि SDK में कंपाइलर, डीबगर, लाइब्रेरी और API सब शामिल होते हैं।`,
      keyTakeaways: [
        'FORTRAN का पूर्ण रूप Formula Translation है (पहली हाई-लेवल भाषा)।',
        'COBOL का पूर्ण रूप Common Business-Oriented Language है।',
        'PHP का वर्तमान पूर्ण रूप Hypertext Preprocessor (रिकर्सिव एक्रोनॉइम) है।'
      ]
    },
    {
      chapterNumber: 4,
      title: 'दूरसंचार, मोबाइल एवं वायरलेस प्रौद्योगिकियां (GSM, CDMA, SIM, LTE, Wi-Fi)',
      content: `### 1. मोबाइल सेलुलर नेटवर्क प्रौद्योगिकियां
- **GSM (Global System for Mobile Communications):** दुनिया भर में सर्वाधिक प्रयुक्त दूसरी पीढ़ी (2G) की डिजिटल सेलुलर तकनीक जो TDMA पर आधारित थी।
- **CDMA (Code Division Multiple Access):** एक ही स्पेक्ट्रम चैनल पर कई यूजर्स को अद्वितीय कोड देकर एक साथ कॉल ट्रांसमिट करने की तकनीक।
- **GPRS (General Packet Radio Service):** 2.5G पैकेट-बेस्ड डेटा तकनीक (अधिकतम गति ~114 kbps)।
- **EDGE (Enhanced Data rates for GSM Evolution):** 2.75G तकनीक जिसने मोबाइल इंटरनेट की गति को बढ़ाया।
- **UMTS (Universal Mobile Telecommunications System):** 3G की ब्रॉडबैंड पैकेट-बेस्ड तकनीक।
- **LTE (Long Term Evolution):** 4G वायरलेस ब्रॉडबैंड तकनीक जो हाई-स्पीड मोबाइल इंटरनेट प्रदान करती है।
- **VoLTE (Voice over Long Term Evolution):** 4G LTE नेटवर्क पर बिना कॉल ब्रेक हुए उच्च गुणवत्ता वाली वॉयस और वीडियो कॉल (HD Voice) तकनीक।

### 2. मोबाइल पहचान एवं कार्ड मानक
- **SIM (Subscriber Identity Module):** जीएसएम नेटवर्क पर ग्राहक के फोन नंबर और नेटवर्क क्रेडेंशियल्स को सुरक्षित रखने वाली एकीकृत सर्किट चिप।
- **IMEI (International Mobile Equipment Identity):** प्रत्येक मोबाइल हैंडसेट का 15 अंकों का अद्वितीय हार्डवेयर पहचान कोड (डायल *#06# से प्राप्त)।
- **IMSI (International Mobile Subscriber Identity):** सिम कार्ड की आंतरिक अद्वितीय पहचान संख्या जो नेटवर्क ऑपरेटर के पास दर्ज होती है।

### 3. वायरलेस कनेक्टिविटी मानक
- **Wi-Fi (Wireless Fidelity):** IEEE 802.11 मानकों पर आधारित स्थानीय वायरलेस नेटवर्किंग तकनीक (जनक: जॉन ओ'सुलिवन)।
- **Li-Fi (Light Fidelity):** प्रोफेसर हेराल्ड हास द्वारा खोजी गई दृश्यमान प्रकाश (LED बल्ब) के माध्यम से अल्ट्रा-हाई स्पीड डेटा ट्रांसमिशन की तकनीक।
- **WLAN (Wireless Local Area Network):** बिना भौतिक तारों के रेडियो तरंगों पर चलने वाला लोकल नेटवर्क।`,
      keyTakeaways: [
        'SIM का पूर्ण रूप Subscriber Identity Module है।',
        'IMEI का पूर्ण रूप International Mobile Equipment Identity है (15 अंक)।',
        'Wi-Fi का पूरा नाम Wireless Fidelity (IEEE 802.11) और Li-Fi का Light Fidelity है।'
      ]
    },
    {
      chapterNumber: 5,
      title: 'साइबर सुरक्षा, स्कैनर एवं डिजिटल भुगतान पूर्ण रूप (VIRUS, OCR, OMR, UPI)',
      content: `### 1. कंप्यूटर सुरक्षा एवं दुर्भावनापूर्ण सॉफ्टवेयर
- **VIRUS (Vital Information Resources Under Siege):** ऐसा कंप्यूटर प्रोग्राम जो अपनी प्रतियां बनाकर कंप्यूटर फाइलों को दूषित करता है। 1983 में फ्रेड कोहेन (Fred Cohen) ने औपचारिक परिभाषा दी।
- **WORM (Write Once, Read Many / नेटवर्क में: Worm):** स्वतः अपनी प्रतियां बनाकर नेटवर्क बैंडविड्थ जाम करने वाला मैलवेयर।
- **IDS (Intrusion Detection System):** नेटवर्क में अनाधिकृत घुसपैठ और हमलों का पता लगाने वाला सुरक्षा तंत्र।
- **IPS (Intrusion Prevention System):** हमलों का पता लगाकर उन्हें स्वतः रोकने वाला तंत्र।

### 2. ऑप्टिकल एवं इनपुट डिवाइस पूर्ण रूप
- **OMR (Optical Mark Recognition / Reader):** प्रतियोगी परीक्षाओं की आंसर शीट में पेंसिल या पेन के काले गोलों को पढ़ने वाली तकनीक।
- **OCR (Optical Character Recognition):** मुद्रित या हस्तलिखित टेक्स्ट को मशीन-पठनीय डिजिटल टेक्स्ट में बदलने वाली तकनीक।
- **MICR (Magnetic Ink Character Recognition):** बैंक चेकों के नीचे विशेष चुंबकीय स्याही (आयरन ऑक्साइड) से लिखे 9-अंकीय कोड को पढ़ने वाली तकनीक।
- **BCR (Bar Code Reader):** उत्पादों पर छपे विभिन्न चौड़ाई की काली पट्टियों वाले बारकोड को पढ़ने वाला स्कैनर।

### 3. डिजिटल भुगतान एवं वित्तीय तकनीक
- **UPI (Unified Payments Interface):** NPCI द्वारा विकसित मोबाइल प्लेटफॉर्म जो विभिन्न बैंक खातों को एक ही ऐप से तुरंत (24x7) जोड़ता है।
- **NPCI (National Payments Corporation of India):** भारत में सभी खुदरा भुगतानों और निपटान का शीर्ष संगठन।
- **IMPS (Immediate Payment Service):** चौबीसों घंटे तुरंत इंटर-बैंक इलेक्ट्रॉनिक फंड ट्रांसफर सेवा।
- **NEFT (National Electronic Funds Transfer):** बैच-वाइज फंड ट्रांसफर प्रणाली।
- **RTGS (Real Time Gross Settlement):** न्यूनतम 2 लाख रुपये के बड़े भुगतानों के लिए तत्काल रियल-टाइम ट्रांसफर प्रणाली।
- **CVV (Card Verification Value):** क्रेडिट/डेबिट कार्ड के पीछे छपा 3 या 4 अंकों का सुरक्षा कोड।`,
      keyTakeaways: [
        'VIRUS का पूर्ण रूप "Vital Information Resources Under Siege" है।',
        'OMR (Optical Mark Recognition) और MICR (Magnetic Ink Character Recognition) इनपुट तकनीक हैं।',
        'UPI का पूर्ण रूप Unified Payments Interface है जिसे NPCI ने बनाया।'
      ]
    }
  ],

  comparativeTables: [
    {
      title: 'ईमेल एवं वेब ट्रांसफर प्रोटोकॉल्स का तुलनात्मक विवरण',
      headers: ['प्रोटोकॉल', 'पूर्ण रूप (Full Form)', 'डिफ़ॉल्ट पोर्ट', 'प्राथमिक कार्य'],
      rows: [
        { cells: ['HTTP', 'HyperText Transfer Protocol', '80', 'अनएन्क्रिप्टेड वेब पेजों का स्थानांतरण'] },
        { cells: ['HTTPS', 'HyperText Transfer Protocol Secure', '443', 'SSL/TLS एन्क्रिप्टेड सुरक्षित वेब पेज डिलीवरी'] },
        { cells: ['FTP', 'File Transfer Protocol', '20 (Data), 21 (Control)', 'नेटवर्क पर फाइलों का अपलोड व डाउनलोड'] },
        { cells: ['SMTP', 'Simple Mail Transfer Protocol', '25', 'ईमेल भेजने (Outgoing Mail) हेतु'] },
        { cells: ['POP3', 'Post Office Protocol Version 3', '110', 'सर्वर से ईमेल डाउनलोड करने हेतु'] },
        { cells: ['IMAP', 'Internet Message Access Protocol', '143', 'सर्वर पर रहते हुए कई उपकरणों से ईमेल सिंक करना'] }
      ]
    },
    {
      title: 'प्रोग्रामिंग भाषाओं के ऐतिहासिक पूर्ण रूप एवं उनके जनक',
      headers: ['भाषा (Language)', 'पूर्ण रूप (Full Form)', 'विकास वर्ष', 'मुख्य उपयोग'],
      rows: [
        { cells: ['FORTRAN', 'Formula Translation', '1957', 'वैज्ञानिक एवं जटिल गणितीय गणनाएं'] },
        { cells: ['COBOL', 'Common Business-Oriented Language', '1959', 'व्यावसायिक, वित्तीय एवं बैंकिंग डेटा प्रोसेसिंग'] },
        { cells: ['BASIC', 'Beginners All-purpose Symbolic Instruction Code', '1964', 'शुरुआती छात्रों को प्रोग्रामिंग सिखाना'] },
        { cells: ['SQL', 'Structured Query Language', '1974', 'रिलेशनल डेटाबेस का प्रबंधन एवं क्वेरी'] },
        { cells: ['PHP', 'Hypertext Preprocessor', '1995', 'सर्वर-साइड डायनामिक वेब पेज निर्माण'] }
      ]
    },
    {
      title: 'ऑप्टिकल इनपुट एवं सत्यापन तकनीकों के पूर्ण रूप',
      headers: ['संक्षिप्त रूप', 'पूर्ण रूप (Full Form)', 'प्रयुक्त माध्यम', 'विशिष्ट उपयोग'],
      rows: [
        { cells: ['OMR', 'Optical Mark Recognition', 'पेंसिल/पेन के गहरे निशान', 'प्रतियोगी परीक्षाओं की उत्तर पुस्तिकाओं का त्वरित मूल्यांकन'] },
        { cells: ['OCR', 'Optical Character Recognition', 'मुद्रित/हस्तलिखित कागज', 'किताबों व कागजात को एडिटेबल टेक्स्ट में बदलना'] },
        { cells: ['MICR', 'Magnetic Ink Character Recognition', 'आयरन ऑक्साइड युक्त चुंबकीय स्याही', 'बैंक चेकों का सुरक्षित व त्वरित समाशोधन (Clearing)'] },
        { cells: ['BCR', 'Bar Code Reader', 'काली-सफेद खड़ी रेखाएं', 'सुपरमार्केट में उत्पादों की बिलिंग व इन्वेंट्री ट्रैकिंग'] }
      ]
    }
  ],

  pyqs: [
    {
      question: 'HTML का पूर्ण रूप क्या होता है?',
      year: '2023',
      exam: 'CG Vyapam Hostel Warden Exam',
      options: [
        'HyperText Markup Language',
        'High Transfer Machine Language',
        'Hyperlink Text Management Language',
        'Hyper Transfer Mark Logic'
      ],
      correctOption: 0,
      explanation: 'HTML का पूर्ण रूप "HyperText Markup Language" है। यह वेब ब्राउज़र में प्रदर्शित होने वाले वेब पेजों और वेब एप्लिकेशनों को तैयार करने की मानक मार्कअप भाषा है।'
    },
    {
      question: 'ईमेल भेजने (Send) के लिए इंटरनेट पर किस प्रोटोकॉल का उपयोग किया जाता है?',
      year: '2022',
      exam: 'CG Vyapam Patwari / RI Exam',
      options: [
        'POP3',
        'IMAP',
        'SMTP',
        'HTTP'
      ],
      correctOption: 2,
      explanation: 'SMTP (Simple Mail Transfer Protocol) का उपयोग ईमेल क्लाइंट से मेल सर्वर को अथवा दो मेल सर्वरों के बीच संदेश भेजने (Push करने) के लिए किया जाता है। इसका डिफ़ॉल्ट पोर्ट 25 है।'
    },
    {
      question: 'कंप्यूटर सुरक्षा के संदर्भ में VIRUS का सही पूर्ण रूप क्या है?',
      year: '2021',
      exam: 'CG Vyapam Assistant Grade-3',
      options: [
        'Vital Information Resources Under Siege',
        'Very Important Record User System',
        'Virtual Information Resource Universal Software',
        'Verified Integrated Rapid Utility Script'
      ],
      correctOption: 0,
      explanation: 'VIRUS का पूर्ण रूप "Vital Information Resources Under Siege" (घेराबंदी के तहत महत्वपूर्ण सूचना संसाधन) है। यह दुर्भावनापूर्ण कोड कंप्यूटर की सामान्य कार्यप्रणाली को बाधित करता है।'
    },
    {
      question: 'प्रतियोगी परीक्षा की उत्तर पुस्तिकाओं की जांच के लिए किस तकनीक का प्रयोग किया जाता है?',
      year: '2021',
      exam: 'CG Vyapam DEO Exam',
      options: [
        'OCR',
        'OMR',
        'MICR',
        'BCR'
      ],
      correctOption: 1,
      explanation: 'OMR का पूरा नाम "Optical Mark Recognition" (या Optical Mark Reader) है। यह कागज पर पेन या पेंसिल द्वारा बनाए गए काले निशानों की स्थिति को स्कैन करके सही उत्तरों का स्वतः मूल्यांकन करता है।'
    },
    {
      question: 'बैंकिंग क्षेत्र में चेकों के त्वरित समाशोधन हेतु प्रयुक्त MICR का पूर्ण रूप क्या है?',
      year: '2020',
      exam: 'CGPSC State Service Prelims',
      options: [
        'Magnetic Ink Character Recognition',
        'Magnetic Image Code Reader',
        'Multiple Ink Communication Record',
        'Micro Information Character Register'
      ],
      correctOption: 0,
      explanation: 'MICR का पूर्ण रूप "Magnetic Ink Character Recognition" है। बैंक चेक के निचले हिस्से में चुंबकीय स्याही से 9 अंकों का कोड छपा होता है, जिसमें पहले 3 अंक शहर, अगले 3 अंक बैंक और अंतिम 3 अंक शाखा कोड दर्शाते हैं।'
    },
    {
      question: 'मोबाइल फोन में सिम (SIM) कार्ड का पूर्ण रूप क्या होता है?',
      year: '2020',
      exam: 'CG Vyapam Mandi Nirikshak',
      options: [
        'Subscriber Identity Module',
        'Single Integrated Memory',
        'System Information Media',
        'Standard Internet Module'
      ],
      correctOption: 0,
      explanation: 'SIM का पूर्ण रूप "Subscriber Identity Module" है। यह एक स्मार्ट कार्ड चिप है जो मोबाइल ग्राहक की पहचान संख्या (IMSI) और संबंधित नेटवर्क सुरक्षा कुंजियों को सुरक्षित रूप से संगृहीत करती है।'
    }
  ],

  mcqs: [
    {
      question: 'WWW (World Wide Web) के आविष्कारक टिम बर्नर्स-ली ने इसका आविष्कार किस वर्ष किया था?',
      options: ['1981', '1989', '1995', '1998'],
      correctOption: 1,
      explanation: 'टिम बर्नर्स-ली ने 1989 में स्विट्जरलैंड स्थित CERN अनुसंधान प्रयोगशाला में काम करते हुए वर्ल्ड वाइड वेब (WWW) की अवधारणा प्रस्तुत की थी।'
    },
    {
      question: 'वैज्ञानिक और गणितीय गणनाओं के लिए प्रयुक्त प्रथम उच्च स्तरीय प्रोग्रामिंग भाषा FORTRAN का पूर्ण रूप क्या है?',
      options: [
        'Formula Translation',
        'Forefront Transaction',
        'Format Transmission',
        'Foreign Transfer'
      ],
      correctOption: 0,
      explanation: 'FORTRAN का पूरा नाम "Formula Translation" है। इसे 1957 में जॉन बैकस और IBM की टीम द्वारा वैज्ञानिक एवं इंजीनियरिंग अनुप्रयोगों के लिए विकसित किया गया था।'
    },
    {
      question: 'ईमेल में अटैचमेंट्स (तस्वीरें, ऑडियो, वीडियो) भेजने में सक्षम बनाने वाले मानक MIME का पूर्ण रूप क्या है?',
      options: [
        'Multipurpose Internet Mail Extensions',
        'Multiple Internal Mail Exchange',
        'Modern Internet Messaging Protocol',
        'Main Integrated Mail Encoding'
      ],
      correctOption: 0,
      explanation: 'MIME का पूर्ण रूप "Multipurpose Internet Mail Extensions" है। यह मानक ईमेल में सादे ASCII टेक्स्ट के अलावा विभिन्न मीडिया फाइल्स (छवियां, दस्तावेज, ऑडियो) भेजने की अनुमति देता है।'
    },
    {
      question: 'इंटरनेट प्रोटोकॉल के माध्यम से फोन कॉल करने की तकनीक VoIP का पूर्ण रूप क्या है?',
      options: [
        'Voice over Internet Protocol',
        'Video on Internet Platform',
        'Virtual online IP Processing',
        'Variable output IP Protocol'
      ],
      correctOption: 0,
      explanation: 'VoIP का पूर्ण रूप "Voice over Internet Protocol" है। यह इंटरनेट नेटवर्क पर वॉयस डेटा को आईपी पैकेट्स के रूप में प्रेषित करता है।'
    },
    {
      question: 'मोबाइल हैंडसेट की पहचान करने वाले 15-अंकीय कोड IMEI का पूर्ण रूप क्या है?',
      options: [
        'International Mobile Equipment Identity',
        'Integrated Mobile Electronic Identifier',
        'International Machine Encoding Interface',
        'Internal Mobile Equipment Information'
      ],
      correctOption: 0,
      explanation: 'IMEI का पूर्ण रूप "International Mobile Equipment Identity" है। यह दुनिया के हर जीएसएम मोबाइल फोन को दिया गया एक विशिष्ट 15-अंकीय पहचान क्रमांक होता है।'
    },
    {
      question: 'लाइट बल्ब (LED) के माध्यम से हाई-स्पीड डेटा ट्रांसमिशन करने वाली तकनीक Li-Fi का पूर्ण रूप क्या है?',
      options: [
        'Light Fidelity',
        'Laser Fidelity',
        'Linear Frequency',
        'Liquid Fibre'
      ],
      correctOption: 0,
      explanation: 'Li-Fi का पूर्ण रूप "Light Fidelity" है। इसका आविष्कार प्रोफेसर हेराल्ड हास ने किया था। यह दृश्यमान प्रकाश संचार (VLC) का उपयोग करके वाई-फाई की तुलना में अत्यधिक तीव्र डेटा ट्रांसफर करता है।'
    },
    {
      question: 'भारत में UPI (Unified Payments Interface) का विकास निम्नलिखित में से किस संस्था द्वारा किया गया है?',
      options: [
        'RBI',
        'NPCI (National Payments Corporation of India)',
        'SEBI',
        'NASSCOM'
      ],
      correctOption: 1,
      explanation: 'UPI का विकास NPCI (National Payments Corporation of India) द्वारा 2016 में किया गया था। यह मोबाइल के जरिए 24x7 तत्काल बैंक फंड ट्रांसफर की सुविधा देता है।'
    },
    {
      question: 'वाणिज्यिक और व्यावसायिक डेटा प्रोसेसिंग के लिए 1959 में विकसित COBOL भाषा का पूर्ण रूप क्या है?',
      options: [
        'Common Business-Oriented Language',
        'Computer Oriented Basic Organization Language',
        'Commercial Business Operational Logic',
        'Common Basic Official Language'
      ],
      correctOption: 0,
      explanation: 'COBOL का पूर्ण रूप "Common Business-Oriented Language" है। इसका निर्माण मुख्य रूप से व्यापार और वित्तीय संस्थानों की गणनाओं को सरल करने के लिए किया गया था।'
    }
  ],

  keyTerminology: [
    {
      term: 'WWW (World Wide Web)',
      definition: 'इंटरनेट पर हाइपरटेक्स्ट दस्तावेजों का विशाल नेटवर्क, जिसे 1989 में टिम बर्नर्स-ली ने ईजाद किया।',
      examContext: 'आविष्कारक (Tim Berners-Lee), वर्ष (1989) और पूरा नाम व्यापम का सबसे पसंदीदा प्रश्न है।'
    },
    {
      term: 'HTML',
      definition: 'HyperText Markup Language - वेब पेजों को डिजाइन और कोड करने के लिए प्रयुक्त मानक मार्कअप भाषा।',
      examContext: 'टैग-आधारित भाषा और वेब पेज संरचना के संदर्भ में पूछा जाता है।'
    },
    {
      term: 'SMTP',
      definition: 'Simple Mail Transfer Protocol - इंटरनेट पर ईमेल भेजने वाला प्रोटोकॉल (Port 25)।',
      examContext: 'आउटगोइंग ईमेल (भेजने) के लिए हमेशा SMTP का चयन किया जाता है।'
    },
    {
      term: 'VIRUS',
      definition: 'Vital Information Resources Under Siege - ऐसा दुर्भावनापूर्ण प्रोग्राम जो फाइलों को नुकसान पहुँचाता है।',
      examContext: 'कंप्यूटर सुरक्षा के अंतर्गत इसका फुल फॉर्म और फ्रेड कोहेन का नाम पूछा जाता है।'
    },
    {
      term: 'OMR',
      definition: 'Optical Mark Recognition - ओएमआर शीट पर पेंसिल/पेन के निशानों को पढ़ने वाली इनपुट तकनीक।',
      examContext: 'परीक्षाओं में वस्तुनिष्ठ उत्तर पुस्तिकाओं के मूल्यांकन में इसका उपयोग होता है।'
    },
    {
      term: 'MICR',
      definition: 'Magnetic Ink Character Recognition - चेक पर चुंबकीय स्याही से लिखे कोड को पढ़ने वाली डिवाइस।',
      examContext: 'बैंकिंग समाशोधन और 9-अंकीय चेक कोड के संदर्भ में।'
    },
    {
      term: 'SIM',
      definition: 'Subscriber Identity Module - मोबाइल हैंडसेट में ग्राहक की पहचान संगृहीत करने वाली स्मार्ट चिप।',
      examContext: 'दूरसंचार और मोबाइल उपकरणों से संबंधित प्रश्नों में।'
    },
    {
      term: 'UPI',
      definition: 'Unified Payments Interface - NPCI द्वारा विकसित 24x7 रियल-टाइम इंटरबैंक मोबाइल भुगतान प्रणाली।',
      examContext: 'डिजिटल इंडिया और फिनटेक से संबंधित आधुनिक प्रश्नों में।'
    }
  ],

  sources: [
    {
      name: 'W3C Architecture & Web Standards Documentation',
      type: 'Standard Reference',
      relevance: 'WWW, HTTP, HTML, CSS एवं URL के आधिकारिक मानकों का स्रोत।'
    },
    {
      name: 'IETF (Internet Engineering Task Force) RFCs',
      type: 'Technical Standard',
      relevance: 'TCP/IP (RFC 793/791), SMTP (RFC 5321), POP3, IMAP प्रोटोकॉल विनिर्देश।'
    },
    {
      name: 'NPCI Official UPI Product Specifications',
      type: 'Banking & Regulatory Standard',
      relevance: 'UPI, IMPS, RTGS और डिजिटल भुगतान मानकों की प्रामाणिक जानकारी।'
    },
    {
      name: 'NCERT Computer Science Class 12 - Networking Concepts',
      type: 'Textbook',
      relevance: 'प्रोग्रामिंग भाषाओं के इतिहास, इनपुट/आउटपुट डिवाइस (OMR, OCR) और फुल फॉर्म्स का मानक आधार।'
    }
  ],

  confusionBuster: [
    {
      concept: 'HTTP बनाम SMTP',
      confusion: 'क्या दोनों डेटा ट्रांसफर प्रोटोकॉल एक ही कार्य करते हैं?',
      clarification: 'नहीं। HTTP वेब ब्राउज़र और वेब सर्वर के बीच वेब पेजों को ट्रांसफर करने के लिए होता है, जबकि SMTP केवल ईमेल क्लाइंट से ईमेल सर्वर को ईमेल भेजने (Send करने) के लिए प्रयुक्त होता है।'
    },
    {
      concept: 'OMR बनाम OCR',
      confusion: 'क्या OMR और OCR दोनों लिखित टेक्स्ट को पढ़ते हैं?',
      clarification: 'नहीं। OMR केवल पूर्व-निर्धारित स्थानों पर पेंसिल/पेन के काले गोलों (निशानों) की मौजूदगी जांचता है। OCR मुद्रित या हस्तलिखित अक्षरों (Characters) को पहचानकर उन्हें एडिटेबल डिजिटल टेक्स्ट में बदलता है।'
    },
    {
      concept: 'SIM बनाम IMEI',
      confusion: 'क्या सिम और IMEI एक ही चीज की पहचान करते हैं?',
      clarification: 'नहीं। SIM ग्राहक और उसके मोबाइल नंबर (सब्सक्राइबर) की पहचान है (जिसे किसी भी फोन में डाला जा सकता है)। IMEI मोबाइल हैंडसेट (हार्डवेयर मशीन) का स्थायी 15-अंकीय पहचान कोड होता है।'
    },
    {
      concept: 'Wi-Fi बनाम Li-Fi',
      confusion: 'दोनों वायरलेस तकनीकों में संचार का माध्यम क्या है?',
      clarification: 'Wi-Fi रेडियो तरंगों (Radio Waves - 2.4 GHz या 5 GHz) का उपयोग करता है। Li-Fi दृश्यमान प्रकाश तरंगों (Visible Light - LED बल्ब) का उपयोग करता है और यह Wi-Fi से 100 गुना तक तेज हो सकता है।'
    },
    {
      concept: 'POP3 बनाम IMAP',
      confusion: 'ईमेल प्राप्त करने में दोनों में क्या अंतर है?',
      clarification: 'POP3 ईमेल को सर्वर से डाउनलोड करके लोकल मशीन पर ले आता है और आमतौर पर सर्वर से मिटा देता है। IMAP ईमेल को सर्वर पर ही रखता है, जिससे आप एक साथ मोबाइल, टैबलेट और लैपटॉप पर सिंक देख सकते हैं।'
    }
  ],

  faqList: [
    {
      question: 'बैंक चेक पर MICR कोड में कितने अंक होते हैं और वे क्या दर्शाते हैं?',
      answer: 'MICR कोड में कुल 9 अंक होते हैं। पहले 3 अंक शहर का पिन कोड (City Code), बीच के 3 अंक बैंक का कोड (Bank Code), और अंतिम 3 अंक बैंक की विशिष्ट शाखा का कोड (Branch Code) दर्शाते हैं।'
    },
    {
      question: 'VIRUS शब्द का पहली बार औपचारिक उपयोग किसने किया था?',
      answer: 'कंप्यूटर वायरस शब्द का औपचारिक रूप से पहली बार प्रयोग 1983 में अमेरिकी कंप्यूटर वैज्ञानिक फ्रेड कोहेन (Fred Cohen) ने अपने शोधपत्र में किया था।'
    },
    {
      question: 'WWW और इंटरनेट में क्या अंतर है?',
      answer: 'इंटरनेट दुनिया भर के कंप्यूटरों को आपस में जोड़ने वाला भौतिक हार्डवेयर और नेटवर्क इन्फ्रास्ट्रक्चर है। WWW (वर्ल्ड वाइड वेब) इंटरनेट के ऊपर चलने वाली एक सेवा है, जो हाइपरलिंक के जरिए जुड़े वेब पेजों का संग्रह है।'
    },
    {
      question: 'URL के मुख्य घटक कौन-कौन से होते हैं?',
      answer: 'URL (Uniform Resource Locator) के तीन मुख्य घटक होते हैं: 1. प्रोटोकॉल (जैसे https://), 2. डोमेन नाम / सर्वर एड्रेस (जैसे vyapam.cgstate.gov.in), 3. रिसोर्स पाथ और फाइल नाम (जैसे /results/2024.html)।'
    },
    {
      question: 'प्रतियोगी परीक्षा में फुल फॉर्म से संबंधित प्रश्नों को हल करते समय किन बातों का ध्यान रखना चाहिए?',
      answer: 'विकल्पों में मिलते-जुलते शब्दों (जैसे Hyperlink बनाम Hypertext, Transfer बनाम Transmission, Module बनाम Machine) को बहुत सावधानी से पढ़ें, क्योंकि व्यापम अक्सर सूक्ष्म शब्दों को बदलकर भ्रामक विकल्प बनाता है।'
    }
  ],

  oneLinerRevision: [
    'WWW का पूर्ण रूप World Wide Web है, जिसका आविष्कार 1989 में टिम बर्नर्स-ली ने किया था।',
    'HTML का पूरा नाम HyperText Markup Language है, जो वेब पेज की संरचना बनाती है।',
    'HTTP का पूरा नाम HyperText Transfer Protocol है (पोर्ट 80) और HTTPS में S का अर्थ Secure है (पोर्ट 443)।',
    'SMTP (Simple Mail Transfer Protocol) ईमेल भेजने के लिए पोर्ट 25 पर प्रयुक्त होता है।',
    'VIRUS का पूर्ण रूप Vital Information Resources Under Siege होता है।',
    'OMR का पूर्ण रूप Optical Mark Recognition है, जो आंसर शीट जांचने में प्रयुक्त होता है।',
    'MICR का पूरा नाम Magnetic Ink Character Recognition है, जो बैंक चेक क्लियरिंग में उपयोग होता है।',
    'SIM का पूरा नाम Subscriber Identity Module है।',
    'FORTRAN का पूर्ण रूप Formula Translation है (पहली उच्च-स्तरीय भाषा)।',
    'UPI का पूर्ण रूप Unified Payments Interface है जिसे NPCI ने 2016 में लॉन्च किया था।'
  ],

  rapidRevision: {
    points: [
      'वेब: WWW (World Wide Web - Tim Berners-Lee 1989), W3C (World Wide Web Consortium), URL (Uniform Resource Locator)।',
      'मार्कअप: HTML (HyperText Markup Language), XML (Extensible Markup Language), CSS (Cascading Style Sheets)।',
      'प्रोटोकॉल्स: HTTP (Port 80), HTTPS (Port 443), FTP (Port 20/21), SSH (Port 22), TELNET (Port 23)।',
      'ईमेल: SMTP (Sending - Port 25), POP3 (Receiving - Port 110), IMAP (Syncing - Port 143), MIME (Multipurpose Extensions)।',
      'प्रोग्रामिंग: FORTRAN (Formula Translation - 1957), COBOL (Common Business-Oriented Language - 1959), BASIC (Beginners All-purpose Symbolic Instruction Code - 1964), SQL (Structured Query Language)।',
      'मोबाइल: GSM (Global System for Mobile Communications), CDMA (Code Division Multiple Access), SIM (Subscriber Identity Module), IMEI (International Mobile Equipment Identity - 15 अंक)।',
      'वायरलेस: Wi-Fi (Wireless Fidelity - IEEE 802.11), Li-Fi (Light Fidelity - प्रकाश आधारित), VoIP (Voice over IP)।',
      'स्कैनर/इनपुट: OMR (Optical Mark Recognition), OCR (Optical Character Recognition), MICR (Magnetic Ink Character Recognition - 9 अंक)।',
      'सुरक्षा: VIRUS (Vital Information Resources Under Siege), IDS (Intrusion Detection System)।',
      'पेमेंट: UPI (Unified Payments Interface), NPCI (National Payments Corporation of India), IMPS (Immediate Payment Service)।'
    ]
  }
};

async function uploadTopic() {
  const docId = 'cgv_master_comp_exam_2';
  const sanitized = sanitizeForFirestore(topicNotes);
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
          if (ch.id === 'cgv_master_sub_7_ch_10') {
            for (const top of ch.topics || []) {
              if (top.id === 'comp_exam_2') {
                top.hasStudyNotes = true;
                updated = true;
              }
            }
          }
        }
      }
    }
    if (updated) {
      await syllabusRef.set(data);
      console.log('[Syllabus Synced] hasStudyNotes: true for comp_exam_2');
    }
  }
  console.log('Topic comp_exam_2 (Important Full Forms) completed successfully!');
}

uploadTopic().catch(err => {
  console.error('Error uploading comp_exam_2:', err);
  process.exit(1);
});
