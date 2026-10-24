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
  topicId: 'comp_new_4',
  title: 'इंटरनेट ऑफ थिंग्स (Internet of Things - IoT)',
  subject: 'कंप्यूटर ज्ञान',
  chapter: 'क्लाउड एवं उभरती तकनीक',
  examCategory: 'CG Vyapam / CGPSC',
  lastUpdated: new Date().toISOString(),

  overview: {
    introduction: 'इंटरनेट ऑफ थिंग्स (Internet of Things - IoT) भौतिक वस्तुओं (physical objects or things) का एक ऐसा नेटवर्क है, जिसमें सेंसर्स, सॉफ्टवेयर, इलेक्ट्रॉनिक्स और नेटवर्क कनेक्टिविटी एम्बेडेड (अंतर्निहित) होते हैं, जिससे ये उपकरण बिना किसी मानवीय हस्तक्षेप के डेटा का आदान-प्रदान और स्वतः संचार करने में सक्षम होते हैं।',
    importance: 'आधुनिक डिजिटल क्रांति, स्मार्ट सिटीज, स्मार्ट एग्रीकल्चर, हेल्थकेयर मॉनिटरिंग और इंडस्ट्रियल ऑटोमेशन (Industry 4.0) की रीढ़ IoT है। सीजी व्यापम (छात्रावास अधीक्षक, पटवारी, शिक्षक, आरआई) और सीजीपीएससी परीक्षाओं में IoT की परिभाषा, जनक (Kevin Ashton), आर्किटेक्चर, प्रोटोकॉल्स और अनुप्रयोगों से निरंतर प्रश्न पूछे जाते हैं।',
    examRelevance: 'व्यापम परीक्षाओं में Kevin Ashton (1999), RFID तकनीक, सेंसर्स और एक्ट्यूटर्स के अंतर, IoT के 3-टियर/4-टियर आर्किटेक्चर, MQTT/CoAP प्रोटोकॉल और स्मार्ट ग्रिड/स्मार्ट होम के प्रमुख घटकों से संबंधित प्रश्न प्रमुखता से आते हैं।',
    quickFacts: [
      { label: 'IoT शब्द के जनक', value: 'केविन एश्टन (Kevin Ashton) - 1999' },
      { label: 'मूल तकनीक', value: 'RFID (रेडियो फ्रीक्वेंसी आइडेंटिफिकेशन) और सेंसर्स' },
      { label: 'प्रमुख संचार प्रोटोकॉल', value: 'MQTT, CoAP, Zigbee, BLE, LoRaWAN' },
      { label: 'प्रमुख घटक', value: 'Sensors/Actuators, Connectivity, Data Processing, User Interface' },
      { label: 'औद्योगिक संस्करण', value: 'IIoT (Industrial Internet of Things)' }
    ]
  },

  chapters: [
    {
      chapterNumber: 1,
      title: 'IoT की अवधारणा, इतिहास एवं मूल घटक (Concepts, History & Core Components)',
      content: `### 1. IoT क्या है? (What is IoT?)
इंटरनेट ऑफ थिंग्स (IoT) अरबों भौतिक उपकरणों का एक विशाल जाल है जो विश्व स्तर पर इंटरनेट से जुड़े हुए हैं और डेटा एकत्र व साझा कर रहे हैं। 
- इसमें "Things" (चीजें) कोई भी उपकरण हो सकता है—जैसे स्मार्टवॉच, स्मार्ट बल्ब, एयर कंडीशनर, हृदय गति मॉनिटर करने वाला सेंसर या फिर सड़क पर दौड़ती स्मार्ट कार।
- यह **M2M (Machine-to-Machine)** संचार को संभव बनाता है, जिसमें किसी भी मानवीय इनपुट की आवश्यकता नहीं होती।

### 2. IoT का इतिहास और विकास (History & Evolution)
- **1982:** कार्नेगी मेलन यूनिवर्सिटी में एक 'कोका-कोला वेंडिंग मशीन' को नेटवर्क से जोड़ा गया, जिसे दुनिया का पहला इंटरनेट-कनेक्टेड उपकरण माना जाता है (यह रिपोर्ट करता था कि ड्रिंक्स ठंडी हैं या नहीं)।
- **1999:** प्रोक्टर एंड गैंबल (P&G) के कार्यकारी **केविन एश्टन (Kevin Ashton)** ने पहली बार **"Internet of Things"** शब्द गढ़ा। उन्होंने आपूर्ति श्रृंखला प्रबंधन (Supply Chain) में RFID टैग्स को इंटरनेट से जोड़ने का प्रस्ताव रखा था।
- **2008-2009:** सिस्को (Cisco IBSG) के अनुसार, वह समय था जब इंटरनेट से जुड़े उपकरणों की संख्या पृथ्वी की कुल मानव आबादी से अधिक हो गई, जिसे वास्तविक IoT युग की शुरुआत माना जाता है।

### 3. IoT के 4 अनिवार्य घटक (Four Core Components of IoT)
1. **सेंसर्स/एक्ट्यूटर्स (Sensors & Actuators - Sensing Layer):**
   - **सेंसर (Sensors):** वातावरण से भौतिक डेटा (तापमान, आर्द्रता, प्रकाश, गति, दबाव) एकत्र करके उसे डिजिटल सिग्नल में बदलते हैं।
   - **एक्ट्युएटर (Actuators):** डिजिटल सिग्नल प्राप्त करके भौतिक क्रिया करते हैं (जैसे मोटर चालू करना, वाल्व खोलना या बंद करना)।
2. **कनेक्टिविटी (Connectivity / Network Layer):**
   - डेटा को क्लाउड तक पहुँचाने के माध्यम: Wi-Fi, Bluetooth, Zigbee, Cellular (4G/5G), LoRaWAN आदि।
3. **डेटा प्रोसेसिंग (Data Processing Layer / Cloud):**
   - क्लाउड या एज सर्वर पर आने वाले भारी डेटा (Big Data) का त्वरित विश्लेषण किया जाता है।
4. **यूजर इंटरफेस (User Interface Layer):**
   - उपयोगकर्ता तक जानकारी पहुँचाने का माध्यम—स्मार्टफोन ऐप, डैशबोर्ड, वेब पोर्टल या ऑटोमेटेड अलर्ट (SMS/Notification)।`,
      keyTakeaways: [
        'Kevin Ashton ने 1999 में RFID के संदर्भ में "Internet of Things" शब्द पहली बार इस्तेमाल किया।',
        'M2M (मशीन-टू-मशीन) संचार IoT की मूल कार्यप्रणाली है।',
        'IoT प्रणाली के चार मुख्य चरण हैं: Sensing -> Connectivity -> Data Processing -> User Interface।'
      ]
    },
    {
      chapterNumber: 2,
      title: 'IoT आर्किटेक्चर एवं प्रमुख सेंसर्स (IoT Architecture & Sensors)',
      content: `### 1. IoT आर्किटेक्चर लेयर्स (IoT Layered Architecture)
सामान्यतः IoT को 3-लेयर अथवा 4-लेयर मॉडल में समझा जाता है:

1. **परसेप्शन लेयर (Perception Layer / Physical Layer):**
   - यह IoT की जमीनी परत है।
   - इसमें सेंसर्स, आरएफआईडी टैग्स, बारकोड, कैमरे और एक्ट्यूटर्स शामिल होते हैं जो वास्तविक दुनिया से डेटा ग्रहण करते हैं।
2. **नेटवर्क लेयर (Network Layer):**
   - इसे ट्रांसमिशन लेयर भी कहते हैं।
   - यह परसेप्शन लेयर द्वारा एकत्रित डेटा को सुरक्षित रूप से क्लाउड या डेटा प्रोसेसिंग सिस्टम तक ट्रांसमिट करती है।
   - प्रोटोकॉल्स: IPv6, 6LoWPAN, Wi-Fi, Zigbee, 5G।
3. **सपोर्ट / मिडलवेयर लेयर (Middleware / Processing Layer):**
   - यह डेटा को स्टोर, फिल्टर, एनालाइज और प्रोसेस करती है। इसमें क्लाउड कंप्यूटिंग और बिग डेटा एनालिटिक्स शामिल होते हैं।
4. **एप्लिकेशन लेयर (Application Layer):**
   - अंतिम उपयोगकर्ता को विशिष्ट सेवाएं प्रदान करती है (जैसे स्मार्ट होम कंट्रोल, स्मार्ट ट्रैफिक, ई-हेल्थकेयर)।

### 2. प्रमुख IoT सेंसर्स एवं उनके कार्य (Common IoT Sensors)
- **तापमान सेंसर (Temperature Sensor - जैसे DHT11, LM35):** कोल्ड स्टोरेज, एसी, मौसम स्टेशनों में प्रयुक्त।
- **आर्द्रता सेंसर (Humidity Sensor):** कृषि सिंचाई, ग्रीनहाउस और मौसम पूर्वानुमान में।
- **पीआईआर मोशन सेंसर (PIR - Passive Infrared Sensor):** गति और मानवीय उपस्थिति का पता लगाने हेतु (सिक्योरिटी अलार्म, ऑटोमैटिक लाइट)।
- **प्रॉक्सिमिटी सेंसर (Proximity Sensor):** बिना स्पर्श किए किसी वस्तु की निकटता का पता लगाना (स्मार्ट पार्किंग, स्मार्टफोन स्क्रीन ऑफ)।
- **गैस एवं धुआँ सेंसर (Gas/Smoke Sensor - जैसे MQ-2, MQ-135):** आग का पता लगाना, प्रदूषण मॉनिटरिंग और LPG लीकेज अलार्म।
- **एक्सेलरोमीटर एवं जायरोस्कोप (Accelerometer & Gyroscope):** स्मार्टफोन में स्क्रीन ओरिएंटेशन, स्मार्टवॉच में स्टेप काउंटिंग और वाहनों में क्रैश डिटेक्शन।`,
      keyTakeaways: [
        'Perception Layer भौतिक वातावरण से डेटा एकत्र करती है।',
        'PIR सेंसर अवरक्त (Infrared) किरणों के आधार पर मानवीय हलचल को पहचानता है।',
        'स्मार्टफोन के ऑटो-रोटेशन और फिटनेस ट्रैकर में Accelerometer और Gyroscope काम करते हैं।'
      ]
    },
    {
      chapterNumber: 3,
      title: 'IoT नेटवर्किंग एवं संचार प्रोटोकॉल (IoT Networking & Communication Protocols)',
      content: `### 1. पारंपरिक बनाम IoT प्रोटोकॉल
पारंपरिक इंटरनेट प्रोटोकॉल (जैसे HTTP) काफी 'हैवी' (अधिक बैंडविड्थ और पावर खपत वाले) होते हैं। IoT उपकरण बैटरी चालित और सीमित मेमोरी वाले (Constrained Devices) होते हैं, इसलिए इनके लिए हल्के (Lightweight) प्रोटोकॉल विकसित किए गए हैं।

### 2. प्रमुख IoT प्रोटोकॉल (Key IoT Protocols)
1. **MQTT (Message Queuing Telemetry Transport):**
   - विकास: 1999 में एंडी स्टैनफोर्ड-क्लार्क (IBM) और अरलेन निपर द्वारा।
   - मॉडल: **Publish-Subscribe (Pub/Sub)** मॉडल पर कार्य करता है।
   - विशेषता: अत्यधिक हल्का (Lightweight), कम बैंडविड्थ खपत, TCP/IP पर आधारित।
   - उपयोग: सैटेलाइट संचार, रिमोट सेंसर डेटा और स्मार्ट होम सिस्टम में सर्वाधिक लोकप्रिय।
2. **CoAP (Constrained Application Protocol):**
   - मॉडल: **Request-Response** मॉडल (HTTP का हल्का विकल्प)।
   - विशेषता: UDP (User Datagram Protocol) पर कार्य करता है।
   - उपयोग: कम क्षमता वाले माइक्रोकंट्रोलर्स और वायरलेस सेंसर नेटवर्क्स में।
3. **XMPP एवं AMQP:**
   - वित्तीय सेवाओं और एंटरप्राइज मैसेजिंग हेतु उपयोग किए जाने वाले संदेश प्रोटोकॉल।

### 3. वायरलेस कनेक्टिविटी प्रौद्योगिकियां (Wireless Technologies for IoT)
- **RFID (Radio Frequency Identification):** विद्युत-चुंबकीय क्षेत्रों द्वारा टैग की गई वस्तुओं की स्वचालित पहचान। इसमें रीडर और टैग (Active या Passive) होते हैं।
- **NFC (Near Field Communication):** 4 सेमी से कम दूरी पर उच्च आवृत्ति वायरलेस संचार (जैसे कॉन्टैक्टलेस कार्ड पेमेंट, मेट्रो कार्ड)।
- **Zigbee (IEEE 802.15.4):** कम दूरी (10-100 मीटर), कम डेटा दर और कम बिजली खपत वाला मेश नेटवर्क (होम ऑटोमेशन में प्रयुक्त)।
- **BLE (Bluetooth Low Energy):** सामान्य ब्लूटूथ की तुलना में अत्यधिक कम बैटरी खपत (फिटनेस बैंड और बीकन में)।
- **LoRaWAN (Long Range Wide Area Network):** लंबी दूरी (ग्रामीण क्षेत्रों में 10-15 किमी तक) और न्यूनतम पावर खपत हेतु उपयुक्त LPWAN तकनीक।`,
      keyTakeaways: [
        'MQTT पब्लिश-सब्सक्राइब मॉडल पर आधारित अत्यधिक हल्का (Lightweight) प्रोटोकॉल है।',
        'CoAP UDP पर आधारित रिक्वेस्ट-रिस्पॉन्स प्रोटोकॉल है जिसे लो-पावर नोड्स के लिए बनाया गया है।',
        'NFC की सीमा 4 सेमी तक होती है और यह RFID तकनीक का ही एक रूप है।'
      ]
    },
    {
      chapterNumber: 4,
      title: 'IoT के प्रमुख अनुप्रयोग एवं IIoT (Applications of IoT & Industrial IoT)',
      content: `### 1. स्मार्ट होम एवं उपभोक्ता IoT (Smart Home & Consumer IoT)
- **स्मार्ट अप्लायंसेज:** स्मार्टफोन या वॉइस असिस्टेंट (Alexa, Google Assistant) से नियंत्रित होने वाले स्मार्ट बल्ब, पंखे, एसी।
- **स्मार्ट सिक्योरिटी:** स्मार्ट डोरलॉक, वीडियो डोरबेल और सीसीटीवी फुटेज का रियल-टाइम मोबाइल प्रसारण।
- **स्मार्ट वियरेबल्स:** स्मार्टवॉच जो ईसीजी, एसपीओ2 (SpO2) और नींद के पैटर्न को ट्रैक करती हैं।

### 2. स्मार्ट सिटीज एवं ई-गवर्नेंस (Smart Cities & Smart Infrastructure)
- **स्मार्ट ट्रैफिक मैनेजमेंट:** रियल-टाइम ट्रैफिक घनत्व के आधार पर ट्रैफिक सिग्नलों का स्वतः अनुकूलन।
- **स्मार्ट वेस्ट मैनेजमेंट:** कचरे के डिब्बे में लगे अल्ट्रासोनिक सेंसर्स द्वारा कचरा भरने पर नगर निगम को स्वतः अलर्ट भेजना।
- **स्मार्ट स्ट्रीट लाइटिंग:** दिन के उजाले या वाहनों की उपस्थिति के आधार पर स्ट्रीट लाइट का स्वतः डिम या चालू होना।
- **स्मार्ट ग्रिड (Smart Grid):** बिजली की खपत की डिजिटल निगरानी और ऑटोमेटेड बिलिंग (AMI - Advanced Metering Infrastructure)।

### 3. स्मार्ट कृषि (Smart Agriculture / Precision Farming)
- मिट्टी की नमी (Soil Moisture) सेंसर के आधार पर ड्रिप सिंचाई प्रणाली का स्वचालित चालू और बंद होना।
- ड्रोन्स द्वारा फसलों का स्वास्थ्य विश्लेषण और सटीक कीटनाशक छिड़काव।

### 4. इंडस्ट्रियल IoT (IIoT - Industrial Internet of Things)
- IIoT विनिर्माण (Manufacturing), ऊर्जा और भारी उद्योगों में भारी मशीनरी, बिग डेटा और रोबोटिक्स को जोड़ता है।
- **प्रिडिक्टिव मेंटेनेंस (Predictive Maintenance):** मशीन में लगे वाइब्रेशन और थर्मल सेंसर्स द्वारा खराबी आने से पहले ही चेतावनी देना, जिससे डाउनटाइम बचता है।
- **सप्लाई चेन ट्रैकिंग:** उत्पादों के निर्माण से लेकर डिलीवरी तक जीपीएस और आरएफआईडी के जरिए रीयल-टाइम मॉनिटरिंग।`,
      keyTakeaways: [
        'स्मार्ट सिटीज में वेस्ट मैनेजमेंट, स्मार्ट ट्रैफिक और स्मार्ट ग्रिड IoT के जीवंत उदाहरण हैं।',
        'IIoT का सबसे बड़ा लाभ "प्रिडिक्टिव मेंटेनेंस" है जो अप्रत्याशित ब्रेकडाउन रोकता है।',
        'स्मार्ट कृषि में ड्रिप इरिगेशन मिट्टी के मॉइस्चर सेंसर से स्वतः संचालित होता है।'
      ]
    },
    {
      chapterNumber: 5,
      title: 'IoT की चुनौतियां, सुरक्षा एवं भविष्य (Challenges, Security & Future of IoT)',
      content: `### 1. IoT की प्रमुख चुनौतियां (Major Challenges in IoT)
1. **सुरक्षा एवं प्राइवेसी (Security & Privacy):**
   - अधिकांश सस्ते IoT उपकरणों में कमजोर या डिफॉल्ट पासवर्ड होते हैं।
   - डेटा एन्क्रिप्शन का अभाव होता है, जिससे हैकर्स आसानी से घर या नेटवर्क में सेंध लगा सकते हैं।
2. **मानकीकरण का अभाव (Lack of Standardization):**
   - विभिन्न कंपनियों के उपकरण आपस में संवाद नहीं कर पाते (Interoperability समस्या)।
3. **डेटा ओवरलोड (Big Data & Storage):**
   - अरबों उपकरणों से प्रति सेकंड निकलने वाले पेटाबाइट्स डेटा को प्रोसेस और स्टोर करना अत्यधिक खर्चीला है।
4. **पावर एवं बैटरी सीमाएं (Power Constraints):**
   - दूरदराज के क्षेत्रों में लगे सेंसर्स की बैटरी लंबे समय तक चलाना एक बड़ी तकनीकी चुनौती है।

### 2. IoT सुरक्षा खतरे (IoT Security Threats)
- **बॉटनेट हमले (Botnet Attacks):** हैकर्स लाखों असुरक्षित IoT कैमरों और राउटर्स को हैक करके एक बॉटनेट बनाते हैं।
  - *उदाहरण:* **Mirai Botnet (2016)** ने दुनिया भर के असुरक्षित IoT कैमरों पर कब्जा करके इंटरनेट की प्रमुख वेबसाइटों पर भारी DDoS हमला किया था।
- **मैन-इन-द-मिडिल हमला (MitM):** ट्रांसमिशन के दौरान डेटा को इंटरसेप्ट करना।
- **डेटा लीकेज:** स्मार्ट होम कैमरों या माइक्रोफोन से व्यक्तिगत जीवन की जासूसी।

### 3. भविष्य की प्रवृत्तियां: AIoT एवं 5G (Future Trends: AIoT & 5G)
- **AIoT (Artificial Intelligence + IoT):** जब IoT सेंसर्स द्वारा एकत्र डेटा का विश्लेषण करने के लिए AI/ML एल्गोरिदम को एज डिवाइस पर ही लगा दिया जाता है।
- **एज कंप्यूटिंग (Edge Computing):** सारा डेटा क्लाउड पर भेजने के बजाय उपकरण के नजदीक (Edge पर) प्रोसेस करना, जिससे लेटेंसी न्यूनतम हो जाती है।
- **5G की भूमिका:** 5G का **mMTC (Massive Machine Type Communications)** प्रति वर्ग किमी 10 लाख उपकरणों को अल्ट्रा-लो लेटेंसी के साथ जोड़ने में सक्षम बनाता है।`,
      keyTakeaways: [
        '2016 का Mirai Botnet हमला IoT उपकरणों की सुरक्षा खामियों का सबसे बड़ा ऐतिहासिक उदाहरण है।',
        'AIoT में आर्टिफिशियल इंटेलिजेंस और इंटरनेट ऑफ थिंग्स का संगम होता है।',
        'एज कंप्यूटिंग डेटा को क्लाउड के बजाय डिवाइस के नजदीक प्रोसेस करके लेटेंसी कम करती है।'
      ]
    }
  ],

  comparativeTables: [
    {
      title: 'IoT प्रोटोकॉल तुलना: MQTT बनाम CoAP बनाम HTTP',
      headers: ['विशेषता / पैरामीटर', 'MQTT', 'CoAP', 'HTTP'],
      rows: [
        { cells: ['ट्रांसपोर्ट लेयर', 'TCP', 'UDP', 'TCP'] },
        { cells: ['आर्किटेक्चर मॉडल', 'Publish / Subscribe', 'Request / Response (RESTful)', 'Request / Response (RESTful)'] },
        { cells: ['हेडर साइज', '2 बाइट्स (अत्यधिक न्यूनतम)', '4 बाइट्स (बहुत छोटा)', 'सैकड़ों बाइट्स (अत्यधिक भारी)'] },
        { cells: ['पावर एवं बैंडविड्थ', 'अत्यंत कम', 'अत्यंत कम', 'अत्यधिक उच्च'] },
        { cells: ['सर्वोत्तम उपयोग', 'टेलीमेट्री, स्मार्ट होम, पुश डेटा', 'लो-पावर रिसोर्स-कंस्ट्रेंड नोड्स', 'वेब ब्राउजिंग, भारी वेब API'] }
      ]
    },
    {
      title: 'सेंसर बनाम एक्ट्युएटर तुलना (Sensors vs Actuators)',
      headers: ['पैरामीटर', 'सेंसर (Sensors)', 'एक्ट्युएटर (Actuators)'],
      rows: [
        { cells: ['मूल कार्य', 'भौतिक वातावरण से इनपुट ग्रहण करना', 'सिग्नल के आधार पर भौतिक क्रिया करना'] },
        { cells: ['सिग्नल दिशा', 'पर्यावरण से विद्युत/डिजिटल सिग्नल में', 'विद्युत सिग्नल से भौतिक गति/कार्य में'] },
        { cells: ['इनपुट प्रकार', 'तापमान, प्रकाश, गति, ध्वनि, दबाव', 'विद्युत वोल्टेज या बाइनरी कमांड'] },
        { cells: ['उदाहरण', 'थर्मामीटर, LDR, PIR सेंसर, जाइरोस्कोप', 'इलेक्ट्रिक मोटर, सोलेनोइड वाल्व, बजर, रिले स्विच'] }
      ]
    },
    {
      title: 'IoT बनाम M2M तुलना (IoT vs M2M)',
      headers: ['पैरामीटर', 'M2M (Machine to Machine)', 'IoT (Internet of Things)'],
      rows: [
        { cells: ['संचार दायरा', 'सीमित (प्वाइंट-टू-प्वाइंट या सेल्यूलर)', 'इंटरनेट-आधारित वैश्विक कनेक्टिविटी'] },
        { cells: ['आर्किटेक्चर', 'हार्डवेयर-केंद्रित, स्वामित्व प्रणाली', 'ओपन-स्टैंडर्ड, सॉफ्टवेयर व क्लाउड संचालित'] },
        { cells: ['प्रोटोकॉल्स', 'स्वामित्व (Proprietary) / सेल्युलर नेटवर्क', 'इंटरनेट प्रोटोकॉल्स (IP, MQTT, CoAP)'] },
        { cells: ['डेटा शेयरिंग', 'केवल समर्पित एप्लीकेशन तक सीमित', 'विभिन्न एप्लीकेशन्स और क्लाउड प्लेटफॉर्म्स के मध्य'] }
      ]
    }
  ],

  pyqs: [
    {
      question: 'इंटरनेट ऑफ थिंग्स (IoT) शब्द का सर्वप्रथम प्रयोग 1999 में किसके द्वारा किया गया था?',
      year: '2023',
      exam: 'CG Vyapam Hostel Warden / संयुक्त भर्ती',
      options: [
        'टिम बर्नर्स-ली (Tim Berners-Lee)',
        'केविन एश्टन (Kevin Ashton)',
        'जॉन मैकार्थी (John McCarthy)',
        'मार्क जुकरबर्ग (Mark Zuckerberg)'
      ],
      correctOption: 1,
      explanation: 'केविन एश्टन (Kevin Ashton) ने 1999 में प्रोक्टर एंड गैंबल (P&G) के एक प्रेजेंटेशन में सप्लाई चेन में RFID टैग्स को इंटरनेट से जोड़ने के संदर्भ में सर्वप्रथम "Internet of Things" शब्द गढ़ा था।'
    },
    {
      question: 'IoT में प्रयुक्त MQTT प्रोटोकॉल का पूर्ण रूप (Full Form) क्या है?',
      year: '2022',
      exam: 'CG Vyapam Patwari / RI Exam',
      options: [
        'Machine Queuing Telecommunication Transfer',
        'Message Queuing Telemetry Transport',
        'Message Quality Transfer Technology',
        'Machine Query Terminal Transmission'
      ],
      correctOption: 1,
      explanation: 'MQTT का पूर्ण रूप "Message Queuing Telemetry Transport" है। यह एक अत्यंत हल्का (Lightweight) पब्लिश-सब्सक्राइब मैसेजिंग प्रोटोकॉल है जिसे लो-बैंडविड्थ और रिमोट नेटवर्क्स के लिए डिजाइन किया गया है।'
    },
    {
      question: 'IoT उपकरणों में वातावरण से भौतिक डेटा (जैसे तापमान, गति, दबाव) को एकत्र करने वाले घटक को क्या कहा जाता है?',
      year: '2021',
      exam: 'CG Vyapam DEO Exam',
      options: [
        'एक्ट्युएटर (Actuator)',
        'सेंसर (Sensor)',
        'राउटर (Router)',
        'कन्वर्टर (Converter)'
      ],
      correctOption: 1,
      explanation: 'सेंसर (Sensor) वह घटक है जो वास्तविक भौतिक दुनिया के गुणों (जैसे तापमान, गति, प्रकाश) को मापकर उन्हें डिजिटल या इलेक्ट्रिकल सिग्नल में परिवर्तित करता है।'
    },
    {
      question: 'निम्नलिखित में से कौन सा प्रोटोकॉल IoT में UDP पर आधारित रिक्वेस्ट-रिस्पॉन्स मॉडल का उपयोग करता है?',
      year: '2022',
      exam: 'CG Vyapam Computer Operator',
      options: [
        'MQTT',
        'CoAP',
        'SMTP',
        'FTP'
      ],
      correctOption: 1,
      explanation: 'CoAP (Constrained Application Protocol) इंटरनेट इंजीनियरिंग टास्क फोर्स (IETF) द्वारा विकसित UDP पर चलने वाला एक विशेष वेब ट्रांसफर प्रोटोकॉल है जो सीमित नोड्स के लिए बनाया गया है।'
    },
    {
      question: 'RFID का पूर्ण रूप क्या है, जिसका उपयोग IoT में वस्तुओं की पहचान के लिए व्यापक रूप से किया जाता है?',
      year: '2020',
      exam: 'CGPSC SSE / व्यापम',
      options: [
        'Radio Frequency Identification',
        'Remote Frequency Information Device',
        'Random Frequency Interference Detector',
        'Rapid Frequency Integrated Data'
      ],
      correctOption: 0,
      explanation: 'RFID का पूर्ण रूप "Radio Frequency Identification" है। यह रेडियो तरंगों का उपयोग करके बिना संपर्क के टैग की गई वस्तुओं को स्वचालित रूप से पहचानने की तकनीक है।'
    },
    {
      question: '2016 में दुनिया भर के लाखों असुरक्षित IoT कैमरों और राउटर्स को संक्रमित कर ऐतिहासिक DDoS हमला करने वाला प्रसिद्ध मैलवेयर/बॉटनेट कौन सा था?',
      year: '2021',
      exam: 'CG Vyapam IT Officer',
      options: [
        'WannaCry',
        'Mirai',
        'Stuxnet',
        'ILOVEYOU'
      ],
      correctOption: 1,
      explanation: 'Mirai बॉटनेट ने 2016 में डिफॉल्ट यूजरनेम और पासवर्ड वाले लाखों IoT उपकरणों को हाईजैक करके डोमेन नेम सर्विस प्रोवाइडर (Dyn) पर भारी DDoS हमला किया था, जिससे ट्विटर, नेटफ्लिक्स आदि बंद हो गए थे।'
    }
  ],

  mcqs: [
    {
      question: 'IoT सिस्टम में किसी डिजिटल निर्देश के आधार पर भौतिक क्रिया (Action) करने वाले उपकरण को क्या कहा जाता है?',
      options: ['सेंसर', 'एक्ट्युएटर (Actuator)', 'मॉडेम', 'एंटीना'],
      correctOption: 1,
      explanation: 'एक्ट्युएटर (जैसे मोटर, रिले स्विच, सोलेनोइड वाल्व) डिजिटल कमांड मिलने पर भौतिक गतिविधि या यांत्रिक गति को अंजाम देते हैं।'
    },
    {
      question: 'MQTT प्रोटोकॉल किस संचार मॉडल पर कार्य करता है?',
      options: ['Client-Server Request-Response', 'Publish-Subscribe (Pub/Sub)', 'Peer-to-Peer केवल', 'Master-Slave केवल'],
      correctOption: 1,
      explanation: 'MQTT पब्लिश-सब्सक्राइब मॉडल पर कार्य करता है, जिसमें एक सेंट्रल ब्रोकर (Broker) होता है जो पब्लिशर्स और सब्सक्राइबर्स के बीच संदेशों का वितरण करता है।'
    },
    {
      question: 'निम्नलिखित में से कौन सी कम दूरी की वायरलेस तकनीक IoT और डिजिटल पेमेंट्स (जैसे फास्टैग/कॉन्टैक्टलेस कार्ड) में प्रयोग होती है?',
      options: ['NFC', 'Satellite', 'Microwave', 'Optical Fiber'],
      correctOption: 0,
      explanation: 'NFC (Near Field Communication) 4 सेमी तक की दूरी पर काम करने वाली उच्च आवृत्ति वाली वायरलेस संचार तकनीक है।'
    },
    {
      question: 'औद्योगिक क्षेत्र में मशीनों के अप्रत्याशित ब्रेकडाउन से बचने के लिए सेंसर्स द्वारा किए जाने वाले अग्रिम रखरखाव को क्या कहते हैं?',
      options: ['Corrective Maintenance', 'Predictive Maintenance', 'Manual Servicing', 'Static Overhaul'],
      correctOption: 1,
      explanation: 'IIoT में प्रिडिक्टिव मेंटेनेंस (Predictive Maintenance) रियल-टाइम सेंसर डेटा का विश्लेषण करके खराबी आने से पहले ही मेंटेनेंस अलर्ट जारी करता है।'
    },
    {
      question: 'IoT आर्किटेक्चर की सबसे निचली परत जो पर्यावरण से डेटा इकट्ठा करती है, क्या कहलाती है?',
      options: ['Application Layer', 'Perception Layer', 'Network Layer', 'Business Layer'],
      correctOption: 1,
      explanation: 'परसेप्शन लेयर (Perception Layer / Physical Sensing Layer) सेंसर और RFID की मदद से वास्तविक भौतिक दुनिया से डेटा एकत्र करती है।'
    },
    {
      question: 'Zigbee तकनीक निम्नलिखित में से किस IEEE मानक पर आधारित है?',
      options: ['IEEE 802.3', 'IEEE 802.11', 'IEEE 802.15.4', 'IEEE 802.16'],
      correctOption: 2,
      explanation: 'Zigbee कम शक्ति, कम डेटा दर और शॉर्ट-रेंज वायरलेस मेश नेटवर्किंग के लिए IEEE 802.15.4 मानक का उपयोग करता है।'
    },
    {
      question: 'जब IoT उपकरणों से प्राप्त डेटा का विश्लेषण उपकरण के पास ही (एज पर) बिना क्लाउड पर भेजे त्वरित रूप से किया जाता है, तो इस तकनीक को क्या कहते हैं?',
      options: ['Mainframe Computing', 'Edge Computing', 'Supercomputing', 'Batch Processing'],
      correctOption: 1,
      explanation: 'एज कंप्यूटिंग (Edge Computing) डेटा प्रोसेसिंग को डेटा उत्पन्न होने वाले स्रोत (डिवाइस/लोकल नेटवर्क) के निकट लाकर लेटेंसी और नेटवर्क बैंडविड्थ की बचत करती है।'
    },
    {
      question: 'AIoT शब्द का क्या अर्थ है?',
      options: [
        'Automated Input of Things',
        'Artificial Intelligence of Things',
        'Advanced Interface of Transmission',
        'All India Online Testing'
      ],
      correctOption: 1,
      explanation: 'AIoT का पूर्ण रूप "Artificial Intelligence of Things" है, जिसमें आर्टिफिशियल इंटेलिजेंस (AI) और इंटरनेट ऑफ थिंग्स (IoT) को मिलाकर स्मार्ट निर्णय लेने वाले उपकरण बनाए जाते हैं।'
    }
  ],

  keyTerminology: [
    {
      term: 'Internet of Things (IoT)',
      definition: 'भौतिक उपकरणों का आपस में इंटरनेट के माध्यम से जुड़ा नेटवर्क जो बिना इंसानी दखल के डेटा का आदान-प्रदान करता है।',
      examContext: 'व्यापम परीक्षाओं में इसकी परिभाषा, घटक और 1999 में केविन एश्टन द्वारा शब्द गढ़े जाने का वर्ष पूछा जाता है।'
    },
    {
      term: 'Actuator (एक्ट्युएटर)',
      definition: 'एक ऐसा उपकरण जो विद्युत सिग्नल को यांत्रिक गति या भौतिक क्रिया में बदलता है (जैसे मोटर, वाल्व, रिले)।',
      examContext: 'सेंसर (इनपुट) और एक्ट्युएटर (आउटपुट/एक्शन) का अंतर व्यापम का क्लासिक प्रश्न है।'
    },
    {
      term: 'MQTT',
      definition: 'Message Queuing Telemetry Transport - लो-बैंडविड्थ और बैटरी-सीमित उपकरणों के लिए पब/सब आधारित लाइटवेट प्रोटोकॉल।',
      examContext: 'MQTT का फुल फॉर्म और इसका Pub/Sub मॉडल पर काम करना हर प्रतियोगी परीक्षा में पूछा जाता है।'
    },
    {
      term: 'RFID (रेडियो फ्रीक्वेंसी आइडेंटिफिकेशन)',
      definition: 'रेडियो तरंगों के जरिए टैग में सुरक्षित डेटा को बिना डायरेक्ट लाइन-ऑफ-साइट के पढ़ने की तकनीक।',
      examContext: 'फास्टैग (FASTag), इन्वेंट्री मैनेजमेंट और स्मार्ट कार्ड्स में RFID तकनीक प्रयुक्त होती है।'
    },
    {
      term: 'CoAP',
      definition: 'Constrained Application Protocol - सीमित क्षमता वाले उपकरणों के लिए UDP आधारित हल्का वेब प्रोटोकॉल।',
      examContext: 'HTTP के विकल्प के रूप में लो-पावर सेंसर्स में उपयोग होने वाला प्रोटोकॉल।'
    },
    {
      term: 'IIoT (Industrial IoT)',
      definition: 'विनिर्माण, कारखानों और औद्योगिक प्रक्रियाओं में बिग डेटा और स्मार्ट सेंसर्स का एकीकरण।',
      examContext: 'इंडस्ट्री 4.0 (Industry 4.0) और प्रिडिक्टिव मेंटेनेंस का मुख्य आधार IIoT है।'
    },
    {
      term: 'Edge Computing (एज कंप्यूटिंग)',
      definition: 'डेटा को केंद्रीय क्लाउड पर भेजने के बजाय स्थानीय स्तर पर ही डिवाइस के पास प्रोसेस करने की तकनीक।',
      examContext: 'कम लेटेंसी (Ultra-low latency) और त्वरित ऑटोमेटेड प्रतिक्रिया के लिए यह तकनीक महत्वपूर्ण है।'
    },
    {
      term: 'Mirai Botnet',
      definition: '2016 में कमजोर पासवर्ड वाले IoT कैमरों और राउटर्स को संक्रमित करने वाला एक घातक मैलवेयर।',
      examContext: 'साइबर सुरक्षा और IoT खतरों से जुड़े उदाहरणों में पूछा जाने वाला प्रमुख बॉटनेट।'
    }
  ],

  sources: [
    {
      name: 'IEEE IoT Standards & Architecture Whitepapers',
      type: 'Technical Standard Documentation',
      relevance: 'IoT लेयर्स, IEEE 802.15.4 (Zigbee), और नेटवर्क संचार मानकों का आधिकारिक स्रोत।'
    },
    {
      name: 'OASIS MQTT Version 3.1.1 / 5.0 Specification',
      type: 'Protocol Specification',
      relevance: 'MQTT आर्किटेक्चर, पब/सब मॉडल और QoS लेवल्स का मानक संदर्भ।'
    },
    {
      name: 'NITI Aayog - National Strategy on Artificial Intelligence & IoT in India',
      type: 'Government Policy Report',
      relevance: 'भारत में स्मार्ट सिटी मिशन, स्मार्ट एग्रीकल्चर और IoT के राष्ट्रीय अनुप्रयोगों का प्रमाणिक दस्तावेज।'
    },
    {
      name: 'NCERT / SCERT Computer Science Class 12 - Emerging Trends',
      type: 'Academic Textbook',
      relevance: 'IoT, सेंसर्स, एक्ट्यूटर्स, स्मार्ट होम और क्लाउड की प्राथमिक शैक्षणिक अवधारणाओं का स्रोत।'
    }
  ],

  confusionBuster: [
    {
      concept: 'IoT बनाम M2M (Machine-to-Machine)',
      confusion: 'क्या IoT और M2M एक ही तकनीक हैं?',
      clarification: 'नहीं। M2M पुरानी तकनीक है जो दो मशीनों के बीच सीमित और सीधे (Point-to-Point) या सेल्युलर नेटवर्क पर संवाद कराती है। IoT एक व्यापक वैश्विक अवधारणा है जिसमें उपकरण इंटरनेट, ओपन प्रोटोकॉल्स और क्लाउड के जरिए एक-दूसरे से जुड़ते हैं।'
    },
    {
      concept: 'सेंसर बनाम एक्ट्युएटर (Sensor vs Actuator)',
      confusion: 'क्या सेंसर और एक्ट्युएटर एक ही काम करते हैं?',
      clarification: 'नहीं। सेंसर पर्यावरण से डेटा "लेता" है (Input - जैसे तापमान पढ़ना), जबकि एक्ट्युएटर डिजिटल सिग्नल मिलने पर पर्यावरण में कोई काम "करता" है (Output - जैसे पंखा या मोटर चालू करना)।'
    },
    {
      concept: 'MQTT बनाम HTTP',
      confusion: 'क्या IoT उपकरणों में सामान्य HTTP का उपयोग नहीं हो सकता?',
      clarification: 'हो सकता है, लेकिन HTTP बहुत भारी (Heavyweight) है जो अधिक बैटरी और डेटा खपत करता है। MQTT केवल 2 बाइट के न्यूनतम हेडर के साथ चलता है, जो सीमित बैटरी वाले IoT नोड्स के लिए आदर्श है।'
    },
    {
      concept: 'RFID बनाम बारकोड (Barcode)',
      confusion: 'क्या RFID और बारकोड एक समान तकनीक हैं?',
      clarification: 'नहीं। बारकोड को पढ़ने के लिए स्कैनर और कोड का आमने-सामने (Line of sight) होना अनिवार्य है। RFID रेडियो तरंगों पर चलता है, इसलिए इसे बिना देखे और एक साथ सैकड़ों टैग्स को दूर से ही पढ़ा जा सकता है।'
    },
    {
      concept: 'क्लाउड कंप्यूटिंग बनाम एज कंप्यूटिंग',
      confusion: 'क्या IoT में क्लाउड की जगह अब केवल एज कंप्यूटिंग ले लेगी?',
      clarification: 'नहीं, दोनों पूरक हैं। एज कंप्यूटिंग तात्कालिक निर्णयों (कम लेटेंसी) के लिए डिवाइस के पास डेटा प्रोसेस करती है, जबकि दीर्घकालिक स्टोरेज और बड़े डेटा विश्लेषण के लिए क्लाउड की आवश्यकता बनी रहती है।'
    }
  ],

  faqList: [
    {
      question: 'इंटरनेट ऑफ थिंग्स (IoT) का सबसे बड़ा सुरक्षा जोखिम क्या है?',
      answer: 'डिफॉल्ट/कमजोर पासवर्ड और एंड-टू-एंड एन्क्रिप्शन की कमी। अधिकांश निर्माता सुरक्षा पैच जारी नहीं करते, जिससे ये उपकरण आसानी से बॉटनेट (जैसे Mirai) का शिकार होकर साइबर हमलों के हथियार बन जाते हैं।'
    },
    {
      question: 'स्मार्ट सिटी मिशन में IoT की क्या उपयोगिता है?',
      answer: 'स्मार्ट सिटीज में IoT का उपयोग स्वचालित ट्रैफिक सिग्नल नियंत्रण, कचरा भरने पर स्वतः अलर्ट देने वाले स्मार्ट डस्टबिन, ऊर्जा बचाने वाली स्मार्ट स्ट्रीट लाइट और स्मार्ट जल आपूर्ति निगरानी में होता है।'
    },
    {
      question: 'स्मार्ट होम में वॉयस असिस्टेंट (Alexa/Google Home) कैसे काम करते हैं?',
      answer: 'ये वॉयस कमांड को माइक्रोफोन सेंसर से कैप्चर करते हैं, नेचुरल लैंग्वेज प्रोसेसिंग (NLP) द्वारा क्लाउड पर प्रोसेस करते हैं, और फिर Wi-Fi/Zigbee के माध्यम से स्मार्ट बल्ब या स्विच को चालू/बंद करने का आदेश भेजते हैं।'
    },
    {
      question: 'फास्टैग (FASTag) किस IoT वायरलेस तकनीक पर काम करता है?',
      answer: 'फास्टैग RFID (Radio Frequency Identification) पैसिव तकनीक पर कार्य करता है। टोल प्लाजा पर लगा रीडर वाहन की विंडस्क्रीन पर लगे टैग को रेडियो तरंगों से स्कैन करके बैंक खाते से टोल टैक्स स्वतः काट लेता है।'
    },
    {
      question: '5G तकनीक IoT के विकास को कैसे गति दे रही है?',
      answer: '5G तकनीक उच्च बैंडविड्थ, 1 मिलीसेकंड जैसी अल्ट्रा-लो लेटेंसी और प्रति वर्ग किलोमीटर में 10 लाख उपकरणों को एक साथ नेटवर्क से जोड़ने (mMTC) की क्षमता प्रदान करती है, जो सेल्फ-ड्राइविंग कारों और रोबोटिक सर्जरी जैसी तकनीकों के लिए आवश्यक है।'
    }
  ],

  oneLinerRevision: [
    'इंटरनेट ऑफ थिंग्स (IoT) शब्द 1999 में केविन एश्टन (Kevin Ashton) द्वारा पहली बार प्रयोग किया गया था।',
    'सेंसर (Sensor) भौतिक वातावरण से इनपुट प्राप्त करता है, जबकि एक्ट्युएटर (Actuator) भौतिक क्रिया को अंजाम देता है।',
    'MQTT का पूर्ण रूप "Message Queuing Telemetry Transport" है और यह Publish-Subscribe मॉडल पर काम करता है।',
    'CoAP (Constrained Application Protocol) सीमित क्षमता वाले माइक्रोकंट्रोलर्स हेतु UDP पर आधारित लाइटवेट प्रोटोकॉल है।',
    'RFID का पूर्ण रूप Radio Frequency Identification है, जो रेडियो तरंगों द्वारा वस्तुओं की स्वचालित पहचान करता है।',
    'NFC (Near Field Communication) 4 सेमी तक की अल्प दूरी पर कॉन्टैक्टलेस डेटा ट्रांसफर की तकनीक है।',
    'Zigbee वायरलेस मेश नेटवर्किंग के लिए IEEE 802.15.4 मानक पर काम करता है और होम ऑटोमेशन में लोकप्रिय है।',
    'Mirai 2016 का एक कुख्यात बॉटनेट था जिसने असुरक्षित IoT उपकरणों को हैक कर विश्वव्यापी DDoS हमला किया था।',
    'एज कंप्यूटिंग (Edge Computing) डेटा प्रोसेसिंग को क्लाउड के बजाय उपकरण के निकट लाकर लेटेंसी को न्यूनतम करती है।',
    'AIoT आर्टिफिशियल इंटेलिजेंस (AI) और इंटरनेट ऑफ थिंग्स (IoT) का शक्तिशाली तकनीकी संगम है।'
  ],

  rapidRevision: {
    points: [
      'IoT = भौतिक वस्तुएं + सेंसर्स + सॉफ्टवेयर + इंटरनेट कनेक्टिविटी।',
      'जनक: केविन एश्टन (1999) - RFID और सप्लाई चेन के संदर्भ में।',
      '4 मुख्य घटक: सेंसर्स/एक्ट्यूटर्स -> कनेक्टिविटी -> डेटा प्रोसेसिंग -> यूजर इंटरफेस।',
      'प्रमुख प्रोटोकॉल: MQTT (Pub/Sub, TCP आधारित, 2-बाइट हेडर), CoAP (RESTful, UDP आधारित)।',
      'कनेक्टिविटी: Zigbee (IEEE 802.15.4), BLE (कम पावर ब्लूटूथ), LoRaWAN (लंबी दूरी LPWAN), NFC (<4 सेमी)।',
      'सेंसर: DHT11 (तापमान/आर्द्रता), PIR (मोशन सेंसर), MQ-2 (गैस/धुआँ सेंसर)।',
      'एक्ट्युएटर: रिले स्विच, स्टेपर मोटर, इलेक्ट्रिक सोलेनोइड वाल्व।',
      'IIoT: उद्योगों में प्रिडिक्टिव मेंटेनेंस, एसेट ट्रैकिंग और स्मार्ट फैक्ट्री ऑटोमेशन।',
      'सुरक्षा खतरा: Mirai Botnet, DDoS हमले, कमजोर डिफॉल्ट पासवर्ड।',
      'भविष्य: AIoT, एज कंप्यूटिंग और 5G mMTC नेटवर्क।'
    ]
  }
};

async function uploadTopic() {
  const docId = 'cgv_master_comp_new_4';
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
          if (ch.id === 'cgv_master_sub_7_ch_9') {
            for (const top of ch.topics || []) {
              if (top.id === 'comp_new_4') {
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
      console.log('[Syllabus Synced] hasStudyNotes: true for comp_new_4');
    }
  }
  console.log('Topic comp_new_4 (Internet of Things) completed successfully!');
}

uploadTopic().catch(err => {
  console.error('Error uploading comp_new_4:', err);
  process.exit(1);
});
