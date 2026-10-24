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
  topicId: 'comp_exam_1',
  title: 'कंप्यूटर संक्षिप्ताक्षर एवं परिवर्णी शब्द (Computer Abbreviations)',
  subject: 'कंप्यूटर ज्ञान',
  chapter: 'प्रतियोगी परीक्षा विशेष',
  examCategory: 'CG Vyapam / CGPSC',
  lastUpdated: new Date().toISOString(),

  overview: {
    introduction: 'कंप्यूटर और सूचना प्रौद्योगिकी (IT) के क्षेत्र में विभिन्न हार्डवेयर घटकों, सॉफ्टवेयर, नेटवर्किंग प्रोटोकॉल, मेमोरी इकाइयों और सुरक्षा प्रणालियों को संक्षिप्त नामों (Abbreviations / Acronyms) द्वारा संदर्भित किया जाता है। प्रतियोगी परीक्षाओं में कंप्यूटर शब्दावली की बुनियादी समझ का परीक्षण करने हेतु संक्षिप्ताक्षरों के पूर्ण रूप (Full Forms) अनिवार्य रूप से पूछे जाते हैं।',
    importance: 'सीजी व्यापम (छात्रावास अधीक्षक, पटवारी, आरआई, सहायक ग्रेड-3, डाटा एंट्री ऑपरेटर) और सीजीपीएससी परीक्षाओं में 20-30 अंकों के कंप्यूटर खंड में न्यूनतम 4 से 6 प्रश्न सीधे संक्षिप्ताक्षरों और उनके तकनीकी अर्थ से संबंधित होते हैं। यह अनुभाग परीक्षा में शत-प्रतिशत अंक दिलाने वाला सबसे स्कोरिंग हिस्सा है।',
    examRelevance: 'BIOS, CMOS, POST, SMPS, ASCII, EBCDIC, ALU, DMA, SATA, GUI, CLI, PDF, JPEG, GIF और DBMS जैसे संक्षिप्ताक्षरों के सटीक फुल फॉर्म और उनके तकनीकी कार्यों पर विशेष रूप से प्रश्न केंद्रित होते हैं।',
    quickFacts: [
      { label: 'CPU का पूर्ण रूप', value: 'Central Processing Unit' },
      { label: 'BIOS का पूर्ण रूप', value: 'Basic Input Output System' },
      { label: 'POST का पूर्ण रूप', value: 'Power-On Self-Test' },
      { label: 'ASCII का पूर्ण रूप', value: 'American Standard Code for Information Interchange' },
      { label: 'USB का पूर्ण रूप', value: 'Universal Serial Bus' }
    ]
  },

  chapters: [
    {
      chapterNumber: 1,
      title: 'हार्डवेयर एवं सिस्टम आर्किटेक्चर संक्षिप्ताक्षर (Hardware & Architecture Acronyms)',
      content: `### 1. सेंट्रल प्रोसेसिंग यूनिट (CPU) से संबंधित संक्षिप्ताक्षर
- **CPU (Central Processing Unit):** कंप्यूटर का मस्तिष्क जो सभी निर्देशों को प्रोसेस और निष्पादित करता है।
- **ALU (Arithmetic Logic Unit):** अंकगणितीय (+, -, *, /) और तार्किक (AND, OR, NOT, <, >) गणनाएं करने वाला मुख्य भाग।
- **CU (Control Unit):** कंप्यूटर के सभी आंतरिक अंगों और इनपुट/आउटपुट क्रियाओं का समन्वय एवं नियंत्रण करने वाला भाग।
- **MU (Memory Unit):** तात्कालिक डेटा और निर्देशों को संगृहीत करने वाली आंतरिक मेमोरी या रजिस्टर्स।
- **GPU (Graphics Processing Unit):** इमेज, वीडियो रेंडरिंग और 3D ग्राफिक्स की हाई-स्पीड प्रोसेसिंग के लिए समर्पित प्रोसेसर।
- **DMA (Direct Memory Access):** सीपीयू के हस्तक्षेप के बिना इनपुट/आउटपुट उपकरणों द्वारा सीधे मुख्य मेमोरी (RAM) से डेटा ट्रांसफर करने की प्रणाली।

### 2. मदरबोर्ड एवं पावर सिस्टम शब्दावली
- **PCB (Printed Circuit Board):** मदरबोर्ड की आधार संरचना जिस पर सभी इलेक्ट्रॉनिक कंपोनेंट सोल्डर किए जाते हैं।
- **SMPS (Switched-Mode Power Supply):** एसी वोल्टेज (220V AC) को कंप्यूटर के विभिन्न भागों के लिए आवश्यक डीसी वोल्टेज (+3.3V, +5V, +12V DC) में परिवर्तित करने वाली विद्युत इकाई।
- **BIOS (Basic Input Output System):** ROM चिप में स्थायी रूप से संचित फर्मवेयर जो कंप्यूटर चालू होने पर सबसे पहले लोड होता है।
- **CMOS (Complementary Metal-Oxide Semiconductor):** एक बैटरी-चालित चिप जो कंप्यूटर के दिनांक, समय और हार्डवेयर सेटिंग्स को सहेजती है।
- **POST (Power-On Self-Test):** कंप्यूटर बूट होने के दौरान BIOS द्वारा चलाया जाने वाला प्रारंभिक डायग्नोस्टिक परीक्षण जो सभी हार्डवेयर की सक्रियता जांचता है।
- **UEFI (Unified Extensible Firmware Interface):** पारंपरिक BIOS का आधुनिक, तेज़ और सुरक्षित विकल्प जो 2.2 TB से बड़ी हार्ड ड्राइव्स और जीपीटी पार्टीशन को सपोर्ट करता है।`,
      keyTakeaways: [
        'BIOS का पूरा नाम Basic Input Output System है और यह फर्मवेयर (Firmware) होता है।',
        'POST (Power-On Self-Test) बूटिंग के समय सभी हार्डवेयर घटकों की जांच करता है।',
        'SMPS (Switched-Mode Power Supply) AC करंट को DC में बदलता है।'
      ]
    },
    {
      chapterNumber: 2,
      title: 'मेमोरी, स्टोरेज एवं पोर्ट संक्षिप्ताक्षर (Memory, Storage & Interface Acronyms)',
      content: `### 1. प्राथमिक मेमोरी (Primary Memory)
- **RAM (Random Access Memory):** प्राथमिक अस्थिर (Volatile) रीड-राइट मेमोरी।
  - **SRAM (Static RAM):** फ्लिप-फ्लॉप आधारित तीव्र मेमोरी जिसे रिफ्रेश करने की आवश्यकता नहीं होती (कैश मेमोरी में प्रयुक्त)।
  - **DRAM (Dynamic RAM):** कैपेसिटर आधारित मुख्य मेमोरी जिसे प्रति सेकंड सैकड़ों बार रिफ्रेश करना पड़ता है।
  - **SDRAM (Synchronous DRAM):** सिस्टम क्लॉक बस के साथ सिंक्रनाइज़ होकर चलने वाली रैम।
  - **DDR (Double Data Rate):** क्लॉक साइकल के दोनों किनारों (राइजिंग व फॉलिंग) पर डेटा ट्रांसफर करने वाली आधुनिक रैम (DDR3, DDR4, DDR5)।
- **ROM (Read Only Memory):** गैर-वाष्पशील (Non-volatile) स्थायी मेमोरी।
  - **PROM (Programmable ROM):** केवल एक बार प्रोग्राम की जाने वाली रोम (OTP - One Time Programmable)।
  - **EPROM (Erasable Programmable ROM):** पराबैंगनी (UV) किरणों द्वारा डेटा मिटाकर पुनः प्रोग्राम की जाने वाली मेमोरी।
  - **EEPROM (Electrically Erasable Programmable ROM):** विद्युत स्पंदनों (Electrical Pulses) द्वारा मिटाई और लिखी जाने वाली मेमोरी (पेन ड्राइव/फ्लैश मेमोरी का आधार)।

### 2. सेकेंडरी स्टोरेज (Secondary Storage)
- **HDD (Hard Disk Drive):** मैग्नेटिक प्लेटर्स वाली पारंपरिक चुंबकीय स्टोरेज ड्राइव।
- **SSD (Solid State Drive):** फ्लैश मेमोरी (NAND) आधारित अत्यधिक तीव्र स्टोरेज ड्राइव जिसमें कोई मूविंग पार्ट नहीं होता।
- **CD (Compact Disc):** 700 MB क्षमता वाली ऑप्टिकल डिस्क (CD-ROM, CD-R, CD-RW)।
- **DVD (Digital Versatile Disc / Digital Video Disc):** 4.7 GB से 8.5 GB क्षमता वाली ऑप्टिकल डिस्क।
- **BRD (Blu-ray Disc):** 25 GB (सिंगल लेयर) से 50 GB (डबल लेयर) क्षमता वाली डिस्क, जो ब्लू-वायलेट लेजर (405 nm) का उपयोग करती है।

### 3. कनेक्टिविटी एवं पोर्ट इंटरफेस (Ports & Interfaces)
- **USB (Universal Serial Bus):** पेरिफेरल उपकरणों को जोड़ने का सार्वभौमिक प्लग-एंड-प्ले मानक।
- **HDMI (High-Definition Multimedia Interface):** डिजिटल ऑडियो और वीडियो सिग्नल को एक साथ प्रसारित करने वाला इंटरफेस।
- **VGA (Video Graphics Array):** एनालॉग वीडियो डिस्प्ले मानक (15-पिन कनेक्टर)।
- **SATA (Serial Advanced Technology Attachment):** मदरबोर्ड को हार्ड डिस्क/एसएसडी से जोड़ने वाला हाई-स्पीड सीरियल इंटरफेस।
- **SCSI (Small Computer System Interface):** सर्वर और हाई-परफॉर्मेंस सिस्टम में प्रयुक्त डिस्क इंटरफेस।`,
      keyTakeaways: [
        'SRAM को रिफ्रेश की जरूरत नहीं होती, DRAM को निरंतर रिफ्रेश करना पड़ता है।',
        'EPROM का डेटा UV किरणों से, जबकि EEPROM का डेटा विद्युत द्वारा मिटाया जाता है।',
        'HDMI एक साथ हाई-डेफिनिशन डिजिटल ऑडियो और वीडियो दोनों ट्रांसफर करता है।'
      ]
    },
    {
      chapterNumber: 3,
      title: 'सॉफ्टवेयर, ऑपरेटिंग सिस्टम एवं फाइल फॉर्मेट (Software & OS Acronyms)',
      content: `### 1. ऑपरेटिंग सिस्टम एवं इंटरफेस
- **OS (Operating System):** हार्डवेयर और यूजर के बीच मध्यस्थ सॉफ्टवेयर।
- **GUI (Graphical User Interface):** आइकन्स, मेन्यू और विंडोज आधारित ग्राफिकल यूजर इंटरफेस।
- **CLI / CUI (Command Line Interface / Character User Interface):** टेक्स्ट कमांड्स द्वारा संचालित इंटरफेस (जैसे MS-DOS)।
- **API (Application Programming Interface):** दो अलग-अलग सॉफ्टवेयर एप्लिकेशन्स के बीच संचार स्थापित करने वाले नियमों का समूह।
- **SDK (Software Development Kit):** किसी विशेष प्लेटफॉर्म के लिए सॉफ्टवेयर बनाने हेतु टूल्स, लाइब्रेरी और डॉक्यूमेंटेशन का पैकेज।
- **IDE (Integrated Development Environment):** सॉफ्टवेयर डेवलपमेंट हेतु कोड एडिटर, कंपाइलर और डिबगर का एकीकृत वातावरण (जैसे VS Code)।

### 2. फाइल सिस्टम संक्षिप्ताक्षर (File Systems)
- **FAT (File Allocation Table):** MS-DOS और शुरुआती विंडोज का फाइल सिस्टम (FAT16, FAT32)।
- **NTFS (New Technology File System):** आधुनिक विंडोज ओएस का सुरक्षित और जर्नल फाइल सिस्टम (फ़ाइल एन्क्रिप्शन और बड़े साइज सपोर्ट के साथ)।
- **exFAT (Extended File Allocation Table):** फ्लैश ड्राइव्स और एसडी कार्ड्स के लिए FAT32 का आधुनिक विकल्प (4GB फाइल साइज सीमा से मुक्त)।

### 3. प्रमुख फाइल फॉर्मेट संक्षिप्ताक्षर
- **PDF (Portable Document Format):** एडोब द्वारा विकसित स्वतंत्र डॉक्यूमेंट फॉर्मेट।
- **JPEG / JPG (Joint Photographic Experts Group):** लॉसी कम्प्रेशन वाली डिजिटल फोटो फाइल।
- **PNG (Portable Network Graphics):** लॉसलेस कम्प्रेशन और ट्रांसपेरेंट बैकग्राउंड को सपोर्ट करने वाला इमेज फॉर्मेट।
- **GIF (Graphics Interchange Format):** 8-बिट (256 रंगों) वाली एनिमेटेड इमेज फाइल।
- **MP3 (MPEG Audio Layer III):** कंप्रेस्ड ऑडियो फॉर्मेट।
- **MP4 (MPEG-4 Part 14):** डिजिटल मल्टीमीडिया कंटेनर फॉर्मेट (ऑडियो + वीडियो)।
- **APK (Android Package Kit):** एंड्रॉइड ऑपरेटिंग सिस्टम का एप्लीकेशन इंस्टॉलर पैकेज।`,
      keyTakeaways: [
        'NTFS का पूरा नाम New Technology File System है।',
        'PDF का पूरा नाम Portable Document Format है, जिसे Adobe ने बनाया था।',
        'GUI ग्राफिक्स पर आधारित होता है, जबकि CLI टेक्स्ट कमांड्स पर आधारित होता है।'
      ]
    },
    {
      chapterNumber: 4,
      title: 'नेटवर्किंग, इंटरनेट एवं वेब प्रोटोकॉल संक्षिप्ताक्षर (Networking & Web Protocols)',
      content: `### 1. नेटवर्क प्रकार एवं उपकरण
- **PAN (Personal Area Network):** 10 मीटर के दायरे में व्यक्तिगत उपकरणों का नेटवर्क (Bluetooth आधारित)।
- **LAN (Local Area Network):** एक कमरे, भवन या परिसर तक सीमित स्थानीय नेटवर्क।
- **MAN (Metropolitan Area Network):** पूरे शहर को कवर करने वाला नेटवर्क (जैसे केबल टीवी नेटवर्क)।
- **WAN (Wide Area Network):** देश, महाद्वीप या पूरे विश्व में फैला नेटवर्क (जैसे इंटरनेट)।
- **NIC (Network Interface Card):** कंप्यूटर को नेटवर्क केबल से जोड़ने वाला हार्डवेयर कार्ड, जिसमें अद्वितीय MAC एड्रेस होता है।
- **MODEM (Modulator Demodulator):** एनालॉग और डिजिटल सिग्नल का रूपांतरण करने वाला उपकरण।

### 2. कोर इंटरनेट प्रोटोकॉल संक्षिप्ताक्षर
- **IP (Internet Protocol):** नेटवर्क पर डेटा पैकेट के रूटिंग और एड्रेसिंग का बुनियादी प्रोटोकॉल।
- **TCP (Transmission Control Protocol):** कनेक्शन-उन्मुख (Connection-oriented) विश्वसनीय डेटा डिलीवरी प्रोटोकॉल।
- **UDP (User Datagram Protocol):** कनेक्शन-रहित (Connectionless) तीव्र प्रोटोकॉल (लाइव स्ट्रीमिंग और गेमिंग में प्रयुक्त)।
- **DNS (Domain Name System):** डोमेन नामों (जैसे google.com) को आईपी पतों (142.250.x.x) में अनुवादित करने वाला इंटरनेट का फोनबुक।
- **DHCP (Dynamic Host Configuration Protocol):** नेटवर्क में जुड़े उपकरणों को स्वतः आईपी एड्रेस आवंटित करने वाला प्रोटोकॉल।
- **FTP (File Transfer Protocol):** नेटवर्क पर फाइलों को अपलोड और डाउनलोड करने का प्रोटोकॉल।
- **HTTP (Hypertext Transfer Protocol):** वेब पेजों के स्थानांतरण का मानक प्रोटोकॉल (Port 80)।
- **HTTPS (Hypertext Transfer Protocol Secure):** SSL/TLS एन्क्रिप्टेड सुरक्षित वेब प्रोटोकॉल (Port 443)।
- **URL (Uniform Resource Locator):** वेब पर किसी रिसोर्स का पूर्ण वेब पता।
- **ISP (Internet Service Provider):** इंटरनेट कनेक्शन प्रदान करने वाली संस्था (जैसे BSNL, Jio, Airtel)।`,
      keyTakeaways: [
        'MODEM का पूरा नाम Modulator Demodulator है।',
        'DNS डोमेन नेम को IP एड्रेस में अनुवादित (Resolve) करता है।',
        'HTTPS में S का अर्थ Secure है, जो Port 443 पर SSL/TLS एन्क्रिप्शन का उपयोग करता है।'
      ]
    },
    {
      chapterNumber: 5,
      title: 'डेटाबेस, कोडिंग मानक एवं साइबर सुरक्षा संक्षिप्ताक्षर (Database, Encodings & Security)',
      content: `### 1. कैरेक्टर एन्कोडिंग मानक (Character Encoding Standards)
- **ASCII (American Standard Code for Information Interchange):** 
  - 7-बिट ASCII: 128 कैरेक्टर्स (2^7)।
  - 8-बिट एक्सटेंडेड ASCII: 256 कैरेक्टर्स (2^8)।
  - इसमें 'A' का ASCII मान 65 और 'a' का मान 97 होता है।
- **EBCDIC (Extended Binary Coded Decimal Interchange Code):** IBM मेनफ्रेम कंप्यूटरों में प्रयुक्त 8-बिट कोडिंग सिस्टम।
- **UNICODE (Universal Coded Character Set):** दुनिया की सभी भाषाओं (हिंदी, चीनी, अरबी, देवनागरी, इमोजी आदि) के अक्षरों को मानक कोड देने वाली सार्वभौमिक प्रणाली (UTF-8, UTF-16, UTF-32)।

### 2. डेटाबेस प्रबंधन संक्षिप्ताक्षर (DBMS Acronyms)
- **DBMS (Database Management System):** डेटा को व्यवस्थित करने, स्टोर करने और एक्सेस करने का सॉफ्टवेयर।
- **RDBMS (Relational Database Management System):** टेबल्स (पंक्तियों और स्तंभों) के संबंधों पर आधारित डेटाबेस।
- **SQL (Structured Query Language):** रिलेशनल डेटाबेस में डेटा क्वेरी करने की मानक भाषा।
  - **DDL (Data Definition Language):** CREATE, ALTER, DROP, TRUNCATE।
  - **DML (Data Manipulation Language):** SELECT, INSERT, UPDATE, DELETE।
  - **DCL (Data Control Language):** GRANT, REVOKE।
  - **TCL (Transaction Control Language):** COMMIT, ROLLBACK, SAVEPOINT।

### 3. सुरक्षा एवं आधुनिक तकनीक संक्षिप्ताक्षर
- **VPN (Virtual Private Network):** सार्वजनिक इंटरनेट पर एक सुरक्षित और एन्क्रिप्टेड निजी टनल बनाने वाली तकनीक।
- **SSL (Secure Sockets Layer) / TLS (Transport Layer Security):** इंटरनेट डेटा को सुरक्षित और एन्क्रिप्ट करने वाले सुरक्षा प्रोटोकॉल।
- **DDoS (Distributed Denial of Service):** कई कंप्यूटरों से एक साथ किसी सर्वर पर अत्यधिक ट्रैफिक भेजकर उसे क्रैश करने का हमला।
- **CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart):** मानव और बॉट में अंतर पहचानने वाला स्वचालित परीक्षण।
- **WORM (Write Once, Read Many):** ऐसा स्टोरेज माध्यम जिस पर केवल एक बार लिखा जा सकता है और अनगिनत बार पढ़ा जा सकता है (जैसे CD-R)।
- **SIM (Subscriber Identity Module):** मोबाइल नेटवर्क पर ग्राहक की पहचान करने वाली स्मार्ट चिप।`,
      keyTakeaways: [
        'ASCII का पूर्ण रूप American Standard Code for Information Interchange है।',
        'CAPTCHA का पूर्ण रूप Completely Automated Public Turing test to tell Computers and Humans Apart है।',
        'WORM का अर्थ Write Once Read Many होता है।'
      ]
    }
  ],

  comparativeTables: [
    {
      title: 'महत्वपूर्ण हार्डवेयर एवं सिस्टम संक्षिप्ताक्षरों की तालिका',
      headers: ['संक्षिप्ताक्षर (Acronym)', 'पूर्ण रूप (Full Form)', 'मुख्य कार्य / विवरण'],
      rows: [
        { cells: ['ALU', 'Arithmetic Logic Unit', 'गणितीय और तार्किक गणनाएं निष्पादित करना'] },
        { cells: ['BIOS', 'Basic Input Output System', 'बूटिंग के दौरान हार्डवेयर इनिशियलाइज करना (ROM में संचित)'] },
        { cells: ['CMOS', 'Complementary Metal-Oxide Semiconductor', 'सिस्टम डेट/टाइम और हार्डवेयर सेटिंग्स सहेजना'] },
        { cells: ['POST', 'Power-On Self-Test', 'कंप्यूटर शुरू होते ही सभी हार्डवेयर घटकों की जांच करना'] },
        { cells: ['SMPS', 'Switched-Mode Power Supply', 'AC करंट को कंप्यूटर उपयोगी DC करंट में परिवर्तित करना'] },
        { cells: ['DMA', 'Direct Memory Access', 'CPU के बिना सीधे RAM से डेटा ट्रांसफर करना'] },
        { cells: ['VGA', 'Video Graphics Array', 'एनालॉग वीडियो आउटपुट इंटरफेस (15-पिन कनेक्टर)'] },
        { cells: ['HDMI', 'High-Definition Multimedia Interface', 'डिजिटल हाई-डेफिनिशन वीडियो और ऑडियो एक साथ भेजना'] }
      ]
    },
    {
      title: 'महत्वपूर्ण नेटवर्किंग एवं इंटरनेट प्रोटोकॉल संक्षिप्ताक्षर',
      headers: ['संक्षिप्ताक्षर', 'पूर्ण रूप (Full Form)', 'डिफ़ॉल्ट पोर्ट / श्रेणी'],
      rows: [
        { cells: ['HTTP', 'Hypertext Transfer Protocol', 'पोर्ट 80 (वेब पेजों का आदान-प्रदान, अनएन्क्रिप्टेड)'] },
        { cells: ['HTTPS', 'Hypertext Transfer Protocol Secure', 'पोर्ट 443 (SSL/TLS एन्क्रिप्टेड सुरक्षित वेब)'] },
        { cells: ['FTP', 'File Transfer Protocol', 'पोर्ट 20/21 (फाइल अपलोड और डाउनलोड)'] },
        { cells: ['SMTP', 'Simple Mail Transfer Protocol', 'पोर्ट 25 (ईमेल भेजने / सेंड करने हेतु)'] },
        { cells: ['POP3', 'Post Office Protocol Version 3', 'पोर्ट 110 (ईमेल डाउनलोड / प्राप्त करने हेतु)'] },
        { cells: ['IMAP', 'Internet Message Access Protocol', 'पोर्ट 143 (सर्वर पर रहते हुए ईमेल एक्सेस करना)'] },
        { cells: ['DNS', 'Domain Name System', 'पोर्ट 53 (डोमेन नेम को IP एड्रेस में बदलना)'] },
        { cells: ['DHCP', 'Dynamic Host Configuration Protocol', 'पोर्ट 67/68 (डिवाइस को स्वचालित IP प्रदान करना)'] }
      ]
    },
    {
      title: 'डेटाबेस, कोडिंग एवं सुरक्षा संक्षिप्ताक्षर',
      headers: ['संक्षिप्ताक्षर', 'पूर्ण रूप (Full Form)', 'उपयोग एवं तकनीकी महत्व'],
      rows: [
        { cells: ['ASCII', 'American Standard Code for Information Interchange', '7/8 बिट का टेक्स्ट कैरेक्टर एन्कोडिंग कोड'] },
        { cells: ['DBMS', 'Database Management System', 'डेटाबेस को व्यवस्थित व प्रबंधित करने वाला सॉफ्टवेयर'] },
        { cells: ['RDBMS', 'Relational Database Management System', 'टेबल्स व रिलेशंस पर आधारित डेटाबेस (Oracle, MySQL)'] },
        { cells: ['SQL', 'Structured Query Language', 'रिलेशनल डेटाबेस के साथ संवाद की मानक भाषा'] },
        { cells: ['DDL', 'Data Definition Language', 'डेटाबेस स्ट्रक्चर को परिभाषित करने वाली कमांड्स (CREATE, DROP)'] },
        { cells: ['DML', 'Data Manipulation Language', 'डेटा में बदलाव करने वाली कमांड्स (INSERT, UPDATE, DELETE)'] },
        { cells: ['VPN', 'Virtual Private Network', 'पब्लिक नेटवर्क पर एन्क्रिप्टेड प्राइवेट कनेक्शन बनाना'] },
        { cells: ['CAPTCHA', 'Completely Automated Public Turing test...', 'वेबसाइट्स पर इंसानों और बॉट्स के बीच अंतर पहचानना'] }
      ]
    }
  ],

  pyqs: [
    {
      question: 'कंप्यूटर शब्दावली में BIOS का पूर्ण रूप क्या होता है?',
      year: '2023',
      exam: 'CG Vyapam Hostel Warden / पटवारी भर्ती',
      options: [
        'Binary Input Output Software',
        'Basic Input Output System',
        'Basic Internal Operating System',
        'Business Input Output Standard'
      ],
      correctOption: 1,
      explanation: 'BIOS का पूर्ण रूप "Basic Input Output System" होता है। यह कंप्यूटर की ROM चिप में स्टोर एक फर्मवेयर प्रोग्राम है, जो कंप्यूटर चालू होने पर सभी हार्डवेयर उपकरणों को बूटिंग के लिए तैयार करता है।'
    },
    {
      question: 'कंप्यूटर बूटिंग के समय चलने वाली प्रक्रिया POST का पूरा नाम क्या है?',
      year: '2022',
      exam: 'CG Vyapam संयुक्त भर्ती (AGDO)',
      options: [
        'Power-On Self-Test',
        'Program Operating System Test',
        'Power Optimal System Timing',
        'Primary Open Software Task'
      ],
      correctOption: 0,
      explanation: 'POST का पूर्ण रूप "Power-On Self-Test" है। बूटिंग के दौरान BIOS सबसे पहले यह टेस्ट चलाकर सुनिश्चित करता है कि RAM, कीबोर्ड, डिस्प्ले, स्टोरेज आदि सभी हार्डवेयर घटक सही कार्य कर रहे हैं।'
    },
    {
      question: 'कंप्यूटर में SMPS का पूरा नाम क्या है?',
      year: '2022',
      exam: 'CG Vyapam Patwari Exam',
      options: [
        'Switched-Mode Power Supply',
        'Simple Main Power System',
        'Storage Memory Processing System',
        'Standard Modulated Power Source'
      ],
      correctOption: 0,
      explanation: 'SMPS का पूर्ण रूप "Switched-Mode Power Supply" है। यह कंप्यूटर कैबिनेट में लगा एक इलेक्ट्रॉनिक पावर कनवर्टर है जो 220V AC इनपुट को विभिन्न आवश्यक DC वोल्टेजेस में बदलता है।'
    },
    {
      question: 'ASCII कोडिंग सिस्टम का पूर्ण रूप क्या है?',
      year: '2021',
      exam: 'CGPSC State Engineering Services / व्यापम',
      options: [
        'American Standard Code for Information Interchange',
        'All Standard Computer Information Interface',
        'American System Code for Internet Interchange',
        'Advanced Standard Code for Information Integration'
      ],
      correctOption: 0,
      explanation: 'ASCII का पूर्ण रूप "American Standard Code for Information Interchange" है। यह कैरेक्टर एन्कोडिंग का एक मानक है, जिसके मूल 7-बिट प्रारूप में कुल 128 कैरेक्टर्स कोड किए जा सकते हैं।'
    },
    {
      question: 'वेब एड्रेस के संदर्भ में URL का पूरा नाम क्या होता है?',
      year: '2021',
      exam: 'CG Vyapam DEO / Computer Operator',
      options: [
        'Uniform Resource Locator',
        'Universal Resource Link',
        'Uniform Registered Location',
        'Unified Radio Link'
      ],
      correctOption: 0,
      explanation: 'URL का पूर्ण रूप "Uniform Resource Locator" है। यह वर्ल्ड वाइड वेब पर किसी विशिष्ट वेब पेज, फाइल या रिसोर्स का अनूठा वैश्विक पता (Address) होता है।'
    },
    {
      question: 'CAPTCHA का पूर्ण रूप क्या है, जिसका उपयोग वेबसाइटों पर स्पैम बॉट्स को रोकने के लिए किया जाता है?',
      year: '2020',
      exam: 'CG Vyapam Assistant Grade-3',
      options: [
        'Completely Automated Public Turing test to tell Computers and Humans Apart',
        'Computer Automated Public Test for Checking Human Access',
        'Central Automated Protocol to Check Human Authorization',
        'Common Access Program to Calculate Human Accuracy'
      ],
      correctOption: 0,
      explanation: 'CAPTCHA का पूर्ण रूप "Completely Automated Public Turing test to tell Computers and Humans Apart" है। यह एक परीक्षण है जिससे यह साबित होता है कि यूजर इंसान है या कोई स्वचालित कंप्यूटर प्रोग्राम (बॉट)।'
    }
  ],

  mcqs: [
    {
      question: 'कंप्यूटर डिस्प्ले के लिए प्रयुक्त VGA कनेक्टर का पूर्ण रूप क्या है?',
      options: [
        'Video Graphics Array',
        'Visual Graphic Adapter',
        'Vector Graphics Application',
        'Variable Graphical Array'
      ],
      correctOption: 0,
      explanation: 'VGA का पूर्ण रूप "Video Graphics Array" है। यह आईबीएम द्वारा 1987 में पेश किया गया एक एनालॉग 15-पिन डिस्प्ले इंटरफेस मानक है।'
    },
    {
      question: 'मेमोरी तकनीक में EEPROM का सही पूर्ण रूप क्या है?',
      options: [
        'Electrically Erasable Programmable Read-Only Memory',
        'Electronic Erasable Processing Read-Only Memory',
        'Electromagnetic Extended Programmable Read-Only Memory',
        'Efficient Erasable Programmable Random Memory'
      ],
      correctOption: 0,
      explanation: 'EEPROM का पूरा नाम "Electrically Erasable Programmable Read-Only Memory" है। इसमें संचित डेटा को विद्युत स्पंदनों (Electrical Signals) द्वारा मिटाकर दोबारा लिखा जा सकता है।'
    },
    {
      question: 'कंप्यूटर आर्किटेक्चर में DMA का पूर्ण रूप क्या है?',
      options: [
        'Direct Memory Access',
        'Dynamic Memory Allocation',
        'Digital Memory Array',
        'Direct Microprocessor Action'
      ],
      correctOption: 0,
      explanation: 'DMA का पूर्ण रूप "Direct Memory Access" है। यह हार्डवेयर सबसिस्टम्स को सीपीयू को बायपास करके सीधे मुख्य सिस्टम मेमोरी (RAM) से डेटा पढ़ने और लिखने की अनुमति देता है।'
    },
    {
      question: 'नेटवर्किंग में प्रयुक्त मॉडेम (MODEM) शब्द किन दो शब्दों से मिलकर बना है?',
      options: [
        'Modulator - Demodulator',
        'Modern - Demodulator',
        'Model - Digital Electronic Module',
        'Modulation - Device Multiplexer'
      ],
      correctOption: 0,
      explanation: 'MODEM शब्द "MOdulator-DEModulator" का संक्षिप्त रूप है। यह ट्रांसमिशन के लिए डिजिटल सिग्नल को एनालॉग (Modulation) और प्राप्ति पर एनालॉग को डिजिटल (Demodulation) में बदलता है।'
    },
    {
      question: 'विंडोज ऑपरेटिंग सिस्टम में प्रयुक्त NTFS फाइल सिस्टम का पूर्ण रूप क्या है?',
      options: [
        'New Technology File System',
        'Network Transfer File System',
        'New Terminal Formatting System',
        'Non-Volatile Track File Structure'
      ],
      correctOption: 0,
      explanation: 'NTFS का पूर्ण रूप "New Technology File System" है। इसे माइक्रोसॉफ्ट द्वारा विंडोज NT के साथ पेश किया गया था, जिसमें उच्च सुरक्षा और डेटा जर्नलिंग की सुविधा है।'
    },
    {
      question: 'कंप्यूटर इमेज फॉर्मेट PNG का पूर्ण रूप क्या है?',
      options: [
        'Portable Network Graphics',
        'Public Network Graph',
        'Pixelated Network Graphics',
        'Portable New Graphics'
      ],
      correctOption: 0,
      explanation: 'PNG का पूर्ण रूप "Portable Network Graphics" है। यह पेटेंट-मुक्त और पारदर्शी (Transparent) बैकग्राउंड को सपोर्ट करने वाला लॉसलेस बिटमैप इमेज फॉर्मेट है।'
    },
    {
      question: 'स्टोरेज मीडिया के संदर्भ में WORM का पूर्ण रूप क्या होता है?',
      options: [
        'Write Once, Read Many',
        'Wireless Optical Read Memory',
        'Wide Operating Random Memory',
        'Write Only, Record Many'
      ],
      correctOption: 0,
      explanation: 'WORM का पूर्ण रूप "Write Once, Read Many" है। यह ऐसे स्टोरेज माध्यम (जैसे CD-R) को संदर्भित करता है जिस पर डेटा केवल एक बार लिखा जा सकता है, लेकिन उसे बाद में कई बार पढ़ा जा सकता है।'
    },
    {
      question: 'डेटाबेस के संदर्भ में SQL कमांड्स के समूह DDL का पूर्ण रूप क्या है?',
      options: [
        'Data Definition Language',
        'Data Directory Language',
        'Data Delivery Logic',
        'Direct Database Link'
      ],
      correctOption: 0,
      explanation: 'DDL का पूर्ण रूप "Data Definition Language" है। इसमें CREATE, ALTER, DROP और TRUNCATE जैसी कमांड्स शामिल होती हैं जो डेटाबेस के स्कीमा या संरचना को परिभाषित करती हैं।'
    }
  ],

  keyTerminology: [
    {
      term: 'BIOS',
      definition: 'Basic Input Output System - मदरबोर्ड की ROM चिप में स्थायी रूप से संचित वह प्राथमिक फर्मवेयर जो सिस्टम हार्डवेयर को इनिशियलाइज़ करता है।',
      examContext: 'व्यापम परीक्षाओं में BIOS का पूरा नाम और इसका ROM में संग्रहित होना सर्वाधिक पूछा जाने वाला तथ्य है।'
    },
    {
      term: 'POST',
      definition: 'Power-On Self-Test - कंप्यूटर बूट होने पर हार्डवेयर की कार्यक्षमता जांचने वाला डायग्नोस्टिक टेस्ट।',
      examContext: 'बूटिंग प्रक्रिया के पहले चरण के रूप में पूछा जाता है।'
    },
    {
      term: 'SMPS',
      definition: 'Switched-Mode Power Supply - कंप्यूटर के आंतरिक घटकों को स्थिर डीसी वोल्टेज प्रदान करने वाली स्विचिंग पावर सप्लाई।',
      examContext: 'हार्डवेयर और बिजली आपूर्ति से संबंधित प्रश्नों में अनिवार्य रूप से शामिल।'
    },
    {
      term: 'ASCII',
      definition: 'American Standard Code for Information Interchange - टेक्स्ट कैरेक्टर्स को संख्यात्मक बाइनरी कोड में बदलने वाला 7 या 8 बिट का मानक।',
      examContext: '7-बिट ASCII में कुल 128 कैरेक्टर (2^7) होते हैं, यह व्यापम का रिपीटेड प्रश्न है।'
    },
    {
      term: 'URL',
      definition: 'Uniform Resource Locator - इंटरनेट पर किसी भी वेब पेज या फाइल का विशिष्ट वैश्विक वेब पता।',
      examContext: 'इंटरनेट शब्दावली में प्रोटोकॉल, डोमेन नेम और पाथ से मिलकर बना पूरा पता।'
    },
    {
      term: 'CAPTCHA',
      definition: 'Completely Automated Public Turing test to tell Computers and Humans Apart - मानव और ऑटोमेटेड बॉट में भेद करने वाला सुरक्षा परीक्षण।',
      examContext: 'वेब सुरक्षा और फॉर्म सबमिशन से संबंधित फुल फॉर्म।'
    },
    {
      term: 'HDMI',
      definition: 'High-Definition Multimedia Interface - डिजिटल वीडियो और मल्टी-चैनल ऑडियो को एक ही केबल से प्रसारित करने वाला पोर्ट।',
      examContext: 'VGA (एनालॉग) और HDMI (डिजिटल) के तकनीकी अंतर में पूछा जाता है।'
    },
    {
      term: 'DMA',
      definition: 'Direct Memory Access - सीपीयू को व्यस्त किए बिना हार्डवेयर उपकरणों द्वारा सीधे रैम के साथ डेटा आदान-प्रदान की विधि।',
      examContext: 'कंप्यूटर संगठन और सीपीयू प्रदर्शन सुधारने की तकनीक के संदर्भ में।'
    }
  ],

  sources: [
    {
      name: 'IEEE Standards Dictionary of Electrical and Electronics Terms',
      type: 'Standard Reference',
      relevance: 'हार्डवेयर, नेटवर्किंग एवं संचार संक्षिप्ताक्षरों के मानकीकृत तकनीकी पूर्ण रूपों का आधिकारिक स्रोत।'
    },
    {
      name: 'W3C (World Wide Web Consortium) & IETF RFCs',
      type: 'Technical Standards',
      relevance: 'इंटरनेट प्रोटोकॉल, URL, HTTP, HTTPS, DNS आदि वेब संक्षिप्ताक्षरों का मानक प्रलेखन।'
    },
    {
      name: 'NCERT Computer Science Class 11 & 12',
      type: 'Textbook',
      relevance: 'कंप्यूटर सिस्टम आर्किटेक्चर, मेमोरी यूनिट्स, कोडिंग सिस्टम (ASCII, Unicode) का प्रामाणिक पाठ्यक्रम।'
    },
    {
      name: 'CG Vyapam & CGPSC Official Question Papers (2014-2024)',
      type: 'Exam Papers',
      relevance: 'छत्तीसगढ़ प्रतियोगी परीक्षाओं में विगत 10 वर्षों में पूछे गए कंप्यूटर संक्षिप्ताक्षरों का विश्लेषण।'
    }
  ],

  confusionBuster: [
    {
      concept: 'BIOS बनाम CMOS',
      confusion: 'क्या BIOS और CMOS एक ही चिप हैं?',
      clarification: 'नहीं। BIOS एक सॉफ्टवेयर (फर्मवेयर) प्रोग्राम है जो ROM में स्थायी रहता है, जबकि CMOS एक सेमीकंडक्टर मेमोरी चिप है जो बैटरी से चलती है और सिस्टम की तारीख, समय व सेटिंग्स को सहेजती है।'
    },
    {
      concept: 'PROM बनाम EPROM बनाम EEPROM',
      confusion: 'इन तीनों रोम मेमोरी में डेटा मिटाने के क्या नियम हैं?',
      clarification: 'PROM में डेटा केवल एक बार लिखा जा सकता है, कभी मिटाया नहीं जा सकता। EPROM का डेटा पराबैंगनी (UV) किरणों से मिटाया जाता है। EEPROM का डेटा विद्युत स्पंदनों (Electrical Signals) द्वारा मिटाया जा सकता है।'
    },
    {
      concept: 'VGA बनाम HDMI',
      confusion: 'क्या VGA और HDMI दोनों ऑडियो और वीडियो दोनों भेजते हैं?',
      clarification: 'नहीं। VGA केवल एनालॉग "वीडियो" सिग्नल भेजता है (ऑडियो नहीं)। HDMI डिजिटल "वीडियो और ऑडियो" दोनों को एक साथ उच्च गुणवत्ता में प्रसारित करता है।'
    },
    {
      concept: 'ASCII बनाम UNICODE',
      confusion: 'क्या ASCII में हिंदी या अन्य गैर-अंग्रेजी भाषाएं लिखी जा सकती हैं?',
      clarification: 'नहीं। ASCII केवल 128 (या 256) अंग्रेजी अक्षरों व प्रतीकों तक सीमित है। हिंदी (देवनागरी), चीनी, जापानी और इमोजी के लिए UNICODE (UTF-8) का उपयोग किया जाता है।'
    },
    {
      concept: 'DDL बनाम DML',
      confusion: 'CREATE और INSERT किस श्रेणी के SQL संक्षिप्ताक्षर हैं?',
      clarification: 'CREATE टेबल के ढांचे को बनाता है, अतः यह DDL (Data Definition Language) है। INSERT टेबल के अंदर डेटा भरता है, अतः यह DML (Data Manipulation Language) है।'
    }
  ],

  faqList: [
    {
      question: 'कंप्यूटर में कोल्ड बूटिंग और वॉर्म बूटिंग में क्या अंतर है और इसमें BIOS की क्या भूमिका है?',
      answer: 'कोल्ड बूटिंग (Cold Booting) तब होती है जब कंप्यूटर को मेन पावर स्विच दबाकर पूरी तरह बंद स्थिति से चालू किया जाता है (इसमें पूरा POST टेस्ट चलता है)। वॉर्म बूटिंग (Warm Booting) तब होती है जब चालू कंप्यूटर को बिना पावर कट किए रिस्टार्ट (Ctrl+Alt+Del) किया जाता है (इसमें POST का परीक्षण बाईपास हो जाता है)। दोनों ही प्रक्रियाओं में BIOS लोड होता है।'
    },
    {
      question: '7-बिट ASCII और 8-बिट एक्सटेंडेड ASCII में कितने कुल कैरेक्टर कोड किए जा सकते हैं?',
      answer: '7-बिट ASCII में 2^7 = 128 कैरेक्टर (0 से 127) कोड होते हैं। 8-बिट एक्सटेंडेड ASCII में 2^8 = 256 कैरेक्टर (0 से 255) कोड किए जा सकते हैं।'
    },
    {
      question: 'USB का पूरा नाम क्या है और इसे प्लग एंड प्ले (Plug and Play) क्यों कहा जाता है?',
      answer: 'USB का पूर्ण रूप Universal Serial Bus है। इसे प्लग एंड प्ले (PnP) इसलिए कहते हैं क्योंकि इसके उपकरण को कंप्यूटर में लगाते ही ऑपरेटिंग सिस्टम बिना कंप्यूटर रीस्टार्ट किए स्वतः पहचानकर तुरंत उपयोग के लिए तैयार कर देता है।'
    },
    {
      question: 'PDF का पूरा नाम क्या है और इसे पोर्टेबल क्यों कहा जाता है?',
      answer: 'PDF का पूरा नाम Portable Document Format है। इसे पोर्टेबल इसलिए कहा जाता है क्योंकि यह किसी भी ऑपरेटिंग सिस्टम (विंडोज, मैक, लिनक्स, एंड्रॉइड) या हार्डवेयर पर अपने मूल फॉन्ट, इमेज और लेआउट को बदले बिना एक समान रूप से दिखाई देता है।'
    },
    {
      question: 'प्रतियोगी परीक्षाओं में सबसे ज्यादा पूछे जाने वाले टॉप 5 कंप्यूटर संक्षिप्ताक्षर कौन से हैं?',
      answer: '1. BIOS (Basic Input Output System), 2. POST (Power-On Self-Test), 3. ASCII (American Standard Code for Information Interchange), 4. URL (Uniform Resource Locator), 5. SMPS (Switched-Mode Power Supply)।'
    }
  ],

  oneLinerRevision: [
    'CPU का पूर्ण रूप Central Processing Unit है, जिसे कंप्यूटर का मस्तिष्क कहा जाता है।',
    'ALU (Arithmetic Logic Unit) सभी अंकगणितीय और तार्किक ऑपरेशन्स करता है।',
    'BIOS (Basic Input Output System) ROM में स्थायी फर्मवेयर प्रोग्राम है जो बूटिंग करता है।',
    'POST (Power-On Self-Test) कंप्यूटर चालू होते ही हार्डवेयर की सक्रियता की जांच करता है।',
    'SMPS (Switched-Mode Power Supply) 220V AC इनपुट को विभिन्न DC वोल्टेजेस में बदलता है।',
    'ASCII का पूर्ण रूप American Standard Code for Information Interchange है।',
    '7-बिट ASCII कोड में अधिकतम 128 (2^7) भिन्न कैरेक्टर्स कोड किए जा सकते हैं।',
    'URL का पूर्ण रूप Uniform Resource Locator है जो वेब रिसोर्स का अनूठा पता होता है।',
    'CAPTCHA का पूरा नाम Completely Automated Public Turing test to tell Computers and Humans Apart है।',
    'WORM का पूर्ण रूप Write Once, Read Many होता है (जैसे CD-R)।'
  ],

  rapidRevision: {
    points: [
      'हार्डवेयर: CPU (Central Processing Unit), ALU (Arithmetic Logic Unit), CU (Control Unit), GPU (Graphics Processing Unit)।',
      'बूटिंग: BIOS (Basic Input Output System), CMOS (Complementary Metal-Oxide Semiconductor), POST (Power-On Self-Test)।',
      'पावर व बस: SMPS (Switched-Mode Power Supply), DMA (Direct Memory Access), USB (Universal Serial Bus)।',
      'डिस्प्ले: VGA (Video Graphics Array), HDMI (High-Definition Multimedia Interface)।',
      'मेमोरी: SRAM (Static RAM), DRAM (Dynamic RAM), EPROM (Erasable Programmable ROM - UV आधारित), EEPROM (Electrically Erasable ROM)।',
      'कोडिंग: ASCII (128 कैरेक्टर), EBCDIC (8-बिट IBM), UNICODE (वैश्विक भाषाएं)।',
      'वेब: URL (Uniform Resource Locator), HTTP (Hypertext Transfer Protocol), HTTPS (Secure, Port 443), DNS (Domain Name System)।',
      'सुरक्षा: VPN (Virtual Private Network), CAPTCHA (Turing test for humans/bots), SSL/TLS (Security Layer)।',
      'फाइल सिस्टम: FAT (File Allocation Table), NTFS (New Technology File System)।',
      'फाइल फॉर्मेट्स: PDF (Portable Document Format), JPEG (Joint Photographic Experts Group), PNG (Portable Network Graphics)।'
    ]
  }
};

async function uploadTopic() {
  const docId = 'cgv_master_comp_exam_1';
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
              if (top.id === 'comp_exam_1') {
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
      console.log('[Syllabus Synced] hasStudyNotes: true for comp_exam_1');
    }
  }
  console.log('Topic comp_exam_1 (Computer Abbreviations) completed successfully!');
}

uploadTopic().catch(err => {
  console.error('Error uploading comp_exam_1:', err);
  process.exit(1);
});
