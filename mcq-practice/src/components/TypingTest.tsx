import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Keyboard, 
  Settings, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Play, 
  ArrowLeft, 
  BookOpen, 
  Award, 
  Activity,
  Eye,
  EyeOff,
  Printer,
  FileText,
  Search,
  X,
  HelpCircle,
  Scale
} from 'lucide-react';
import {
  createInitialTypingState,
  handleHindiKeyPress,
  type TypingEngineState
} from '../utils/hindiTypingEngine';

export interface Topic {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  englishText: string;
  hindiUnicodeText: string;
  hindiKrutidevText: string;
  category?: string;
}

export const TYPING_TOPICS: Topic[] = [
  // 1. CG High Court Legal Topics
  {
    id: 'cg_court_judgment',
    title: 'छत्तीसगढ़ उच्च न्यायालय निर्णय / CG High Court Legal Judgment',
    difficulty: 'medium',
    category: 'legal',
    englishText: 'The High Court of Chhattisgarh at Bilaspur exercises original and appellate jurisdiction over all district courts in the state. Under Article 226 of the Constitution, the High Court has the power to issue writs for enforcement of fundamental rights and other legal remedies. Principles of natural justice and speedy trial must always be upheld in judicial administration.',
    hindiUnicodeText: 'बिलासपुर स्थित छत्तीसगढ़ उच्च न्यायालय राज्य के सभी अधीनस्थ न्यायालयों पर मूल एवं अपीलीय क्षेत्राधिकार रखता है। संविधान के अनुच्छेद 226 के तहत उच्च न्यायालय को मौलिक अधिकारों के संरक्षण तथा अन्य विधिक उपचारों हेतु रिट याचिका जारी करने की शक्ति प्राप्त है। न्यायिक प्रशासन में नैसर्गिक न्याय और त्वरित विचारण के सिद्धांतों का पालन अनिवार्य है।',
    hindiKrutidevText: `fcykliqj fLFkr NÙkhlx<+ mPp U;k;ky; jkT; ds lHkh v/khuLFk U;k;ky;ksa ij ewy ,oa vihyh; {ks=kf/kdkj j[krk gSA lafo/kku ds vuqPNsn 226 ds rgr mPp U;k;ky; dks ekSfyd vf/kdkjksa ds laj{k.k rFkk vU; fof/kd mipkjksa gsrq fjV ;kfpdk tkjh djus dh 'kfDr çkIr gSA U;kf;d ç'kklu esa uSlfxZd U;k; vkSj Rofjr fopkj.k ds fl)karksa dk ikyu vfuok;Z gSA`
  },
  {
    id: 'cg_revenue_admin',
    title: 'छत्तीसगढ़ राजस्व एवं जिला प्रशासन / CG Revenue Administration',
    difficulty: 'medium',
    category: 'legal',
    englishText: 'The revenue administration of Chhattisgarh plays a vital role in maintaining land records, revenue courts, and public delivery systems. Collectors and sub-divisional officers manage government revenue, record corrections, and citizen grievances with efficiency. The digitization of land records has brought transparency and security to all citizens.',
    hindiUnicodeText: 'छत्तीसगढ़ का राजस्व प्रशासन भू-अभिलेखों के संधारण, राजस्व न्यायालयों और जनसुविधा वितरण में महत्वपूर्ण भूमिका निभाता है। कलेक्टर एवं अनुविभागीय अधिकारी शासकीय राजस्व, नामांतरण और जन शिकायतों का दक्षतापूर्वक निराकरण करते हैं। भू-अभिलेखों के कंप्यूटरीकरण से सभी नागरिकों को पारदर्शिता और सुरक्षा प्राप्त हुई है।',
    hindiKrutidevText: `NÙkhlx<+ dk jktLo ç'kklu Hkw&vfHkys[kksa ds la/kkj.k] jktLo U;k;ky;ksa vkSj tulfqfo/kk forj.k esa egRoiw.kZ Hkwfedk fuHkkrk gSA dysDVj ,oa vuqfoHkkxh; vf/kdkjh 'kkldh; jktLo] ukekarj.k vkSj tu f'kdk;rksa dk n{krkiwoZd fujkdj.k djrs gSaA Hkw&vfHkys[kksa ds daI;wVjhdj.k ls lHkh ukxfjdksa dks ikjnf'kZrk vkSj lqj{kk çkIr gqbZ gSA`
  },
  {
    id: 'civil_procedure_court',
    title: 'न्यायालयीन प्रक्रिया एवं साक्ष्य / Court Procedure & Evidence',
    difficulty: 'hard',
    category: 'legal',
    englishText: 'In civil and criminal litigation, the Code of Civil Procedure and Evidence Act govern the admissibility of documents and examination of witnesses. The judicial assistant and data entry operators are responsible for drafting cause lists, recording depositions accurately, and issuing certified copies of court decrees.',
    hindiUnicodeText: 'दीवानी और आपराधिक वादों में सिविल प्रक्रिया संहिता और भारतीय साक्ष्य अधिनियम दस्तावेजों की ग्राह्यता तथा साक्षियों के परीक्षण को नियंत्रित करते हैं। न्यायालयीन सहायकों और डाटा एंट्री ऑपरेटरों का उत्तरदायित्व वाद सूची तैयार करना, गवाही का शुद्ध अभिलेखन तथा आदेशों की प्रमाणित प्रतिलिपियां जारी करना है।',
    hindiKrutidevText: `nhokuh vkSj vkijkf/kd oknksa esa flfoy çfØ;k lafgrk vkSj Hkkjrh; lk{; vf/kfu;e nLrkostksa dh xzkákrk rFkk lkf{k;ksa ds ijh{k.k dks fu;af=r djrs gSaA U;kf;d lgk;dksa vkSj MkVk ,aVªh v‚ijsVjksa dk mÙkjnkf;Ro okn lwph rS;kj djuk] xokgh dk 'kq) vfHkys[ku rFkk vkns'kksa dh çekf.kr çfrfyfi;ka tkjh djuk gSA`
  },
  {
    id: 'digital_judiciary_ecourts',
    title: 'ई-कोर्ट मिशन और डिजिटल न्यायपालिका / e-Courts & Digital Judiciary',
    difficulty: 'medium',
    category: 'judiciary',
    englishText: 'The e-Courts project has transformed the Indian judicial system through electronic filing, virtual hearings, and online case status tracking. Accurate and fast typing skill is mandatory for court personnel to handle judicial orders, bail petitions, and digital signatures without delay.',
    hindiUnicodeText: 'ई-कोर्ट मिशन ने इलेक्ट्रॉनिक फाइलिंग, वर्चुअल सुनवाई और ऑनलाइन वाद स्थिति के माध्यम से भारतीय न्यायिक प्रणाली में क्रांति ला दी है। न्यायालयीन कर्मचारियों के लिए त्वरित एवं शुद्ध टंकण कौशल अनिवार्य है ताकि न्यायिक आदेशों, जमानत याचिकाओं और डिजिटल हस्ताक्षर का कार्य अविलंब संपन्न हो सके।',
    hindiKrutidevText: `bZ&dksVZ fe'ku us bysDVª‚fud Qkbfyax] opqZvy lquokbZ vkSj v‚uykbu okn fLFkfr ds ek/;e ls Hkkjrh; U;kf;d ç.kkyh esa Økafr yk nh gSA U;kf;d deZpkfj;ksa ds fy, Rofjr ,oa 'kq) Vad.k dkS'ky vfuok;Z gS rkfd U;kf;d vkns'kksa] tekur ;kfpdkvksa vkSj fMftVy gLrk{kj dk dk;Z vfoyac laiUu gks ldsA`
  },
  // 2. Standard Constitutional & General Topics
  {
    id: 'constitution',
    title: 'भारतीय संविधान / Constitution of India',
    difficulty: 'easy',
    englishText: 'The Constitution of India is the longest written constitution in the world. It provides equality, liberty, and justice to every citizen. Dr. Bhimrao Ambedkar is considered its father. It protects the fundamental rights of all citizens.',
    hindiUnicodeText: 'भारत का संविधान दुनिया का सबसे बड़ा लिखित संविधान है। यह प्रत्येक नागरिक को समानता, स्वतंत्रता और न्याय का अधिकार देता है। डॉ. भीमराव अंबेडकर को इसका जनक माना जाता है। संविधान देश के सभी नागरिकों के मौलिक अधिकारों की रक्षा करता है।',
    hindiKrutidevText: `Hkkjr dk lafo/kku nqfu;k dk lcls cM+k fyf[kr lafo/kku gSA ;g çR;sd ukxfjd dks lekurk] Lora=rk vkSj U;k; dk vf/kdkj nsrk gSA M‚- Hkhejko vacsMdj dks bldk tud ekuk tkrk gSA lafo/kku ns'k ds lHkh ukxfjdksa ds ekSfyd vf/kdkjksa dh j{kk djrk gSA`
  },
  {
    id: 'health_yoga',
    title: 'स्वास्थ्य और योग / Health and Yoga',
    difficulty: 'easy',
    englishText: 'Yoga is an ancient Indian practice to keep our body and mind healthy. Regular practice of yoga reduces mental stress and increases physical strength. A healthy mind resides in a healthy body. We should make yoga a part of our daily routine.',
    hindiUnicodeText: 'योग हमारे शरीर और मस्तिष्क को स्वस्थ रखने की एक प्राचीन भारतीय पद्धति है। नियमित योग करने से मानसिक तनाव कम होता है और शारीरिक शक्ति बढ़ती है। स्वस्थ शरीर में ही स्वस्थ मस्तिष्क का निवास होता है। योग को अपनी दिनचर्या का हिस्सा बनाना चाहिए।',
    hindiKrutidevText: `;ksx gekjs 'kjhj vkSj efLr"d dks LoLFk j[kus dh ,d çkphu Hkkjrh; i)fr gSA fu;fer ;ksx djus ls ekufld ruko de gksrk gS vkSj 'kkjhfjd 'kfDr c<+rh gSA LoLFk 'kjhj esa gh LoLFk efLr"d dk fuokl gksrk gSA ;ksx dks viuh fnup;kZ dk fgLlk cukuk pkfg,A`
  },
  {
    id: 'education',
    title: 'शिक्षा का महत्व / Importance of Education',
    difficulty: 'easy',
    englishText: 'Education makes a human wise and responsible citizen. Without knowledge, achieving success in life is difficult. Every child should get equal opportunity to receive education. Only an educated society can build a strong and prosperous nation.',
    hindiUnicodeText: 'शिक्षा ही मनुष्य को समझदार और जिम्मेदार नागरिक बनाती है। ज्ञान के बिना जीवन में सफलता प्राप्त करना कठिन है। हर बच्चे को शिक्षा पाने का समान अवसर मिलना चाहिए। शिक्षित समाज ही एक सशक्त और समृद्ध राष्ट्र का निर्माण कर सकता है।',
    hindiKrutidevText: `f'k{kk gh euq"; dks le>nkj vkSj ftEesnkj ukxfjd cukrh gSA Kku ds fcuk thou esa lQyrk çkIr djuk dfBu gSA gj cPps dks f'k{kk ikus dk leku volj feyuk pkfg,A f'kf{kr lekt gh ,d l'kDr vkSj le\`) jk"Vª dk fuekZ.k dj ldrk gSA`
  },
  {
    id: 'science',
    title: 'विज्ञान के चमत्कार / Wonders of Science',
    difficulty: 'medium',
    englishText: 'Today\'s era is the era of science. Mobile phones, internet, and computers have made our lives very easy and fast. Science has also made revolutionary changes in the fields of medicine and education. But we must use it wisely.',
    hindiUnicodeText: 'आज का युग विज्ञान का युग है। मोबाइल फोन, इंटरनेट और कंप्यूटर ने हमारी जिंदगी को बहुत आसान और तेज बना दिया है। विज्ञान ने चिकित्सा और शिक्षा के क्षेत्र में भी क्रांतिकारी बदलाव किए हैं। लेकिन हमें इसका उपयोग विवेकपूर्ण तरीके से करना चाहिए।',
    hindiKrutidevText: `vkt dk ;qx foKku dk ;qx gSA eksckby Qksu] baVjusV vkSj daI;wVj us gekjh ftanxh dks cgqr vklku vkSj rst cuk fn;k gSA foKku us fpfdRlk vkSj f'k{kk ds {ks= esa Hkh Økafrdkjh cnyko fd, gSaA ysfdu gesa bldk mi;ksx foosdiw.kZ rjhds ls djuk pkfg,A`
  },
  {
    id: 'environment',
    title: 'पर्यावरण संरक्षण / Environmental Protection',
    difficulty: 'medium',
    englishText: 'Trees and plants are extremely important for our lives. They provide us with oxygen and keep the atmosphere clean. To stop the rising levels of pollution, we must plant more and more trees. Protecting the environment is our ultimate duty.',
    hindiUnicodeText: 'पेड़-पौधे हमारे जीवन के लिए अत्यंत महत्वपूर्ण हैं। वे हमें ऑक्सीजन प्रदान करते हैं और वायुमंडल को शुद्ध रखते हैं। प्रदूषण के बढ़ते स्तर को रोकने के लिए हमें अधिक से अधिक पेड़ लगाने चाहिए। पर्यावरण की रक्षा करना हम सभी का परम कर्तव्य है।',
    hindiKrutidevText: `isM+&ikS/ks gekjs thou ds fy, vR;ar egRoiw.kZ gSaA os gesa v‚Dlhtu çnku djrs gSa vkSj ok;qeaMy dks 'kq) j[krs gSaA çnw"k.k ds c<+rs Lrj dks jksdus ds fy, gesa vf/kd ls vf/kd isM+ yxkus pkfg,A i;kZoj.k dh j{kk djuk ge lHkh dk ije drZO; gSA`
  },
  {
    id: 'gandhi',
    title: 'महात्मा गांधी / Mahatma Gandhi',
    difficulty: 'medium',
    englishText: 'Mahatma Gandhi is our Father of the Nation. Walking on the path of truth and non-violence, he freed India from British slavery. Gandhiji\'s simple living and high thinking are still inspiring for the entire world. We should follow his message of peace.',
    hindiUnicodeText: 'महात्मा गांधी हमारे राष्ट्रपिता हैं। उन्होंने सत्य और अहिंसा के मार्ग पर चलकर भारत को अंग्रेजों की गुलामी से स्वतंत्रता दिलाई। गांधीजी का सादा जीवन और उच्च विचार आज भी पूरे विश्व के लिए प्रेरणादायक हैं। हमें उनके शांति के संदेश का पालन करना चाहिए।',
    hindiKrutidevText: `egkRek xka/kh gekjs jk"Vªfirk gSaA mUgksaus lR; vkSj vfgalk ds ekxZ ij pydj Hkkjr dks vaxzstksa dh xqykeh ls Lora=rk fnykbZA xka/khth dk lknk thou vkSj mPp fopkj vkt Hkh iwjs fo'o ds fy, çsj.kknk;d gSaA gesa muds 'kkafr ds lans'k dk ikyu djuk pkfg,A`
  },
  {
    id: 'chhattisgarh',
    title: 'छत्तीसगढ़ का पर्यटन / Tourism in Chhattisgarh',
    difficulty: 'medium',
    englishText: 'Chhattisgarh state is famous for its rich culture and beautiful natural landscapes. Bastar\'s waterfalls, the ancient temple of Bhoramdev, and Sirpur\'s historical ruins attract tourists from India and abroad. The state government is constantly working to promote tourism.',
    hindiUnicodeText: 'छत्तीसगढ़ राज्य अपनी समृद्ध संस्कृति और सुंदर प्राकृतिक दृश्यों के लिए प्रसिद्ध है। बस्तर के जलप्रपात, भोरमदेव का प्राचीन मंदिर और सिरपुर के ऐतिहासिक अवशेष देश-विदेश के पर्यटकों को आकर्षित करते हैं। राज्य सरकार पर्यटन को बढ़ावा देने के लिए लगातार काम कर रही है।',
    hindiKrutidevText: `NÙkhlx<+ jkT; viuh le\`) laL—fr vkSj lqanj çk—frd –';ksa ds fy, çfl) gSA cLrj ds tyçikr] Hkksjenso dk çkphu eafnj vkSj fljiqj ds ,sfrgkfld vo'ks"k ns'k&fons'k ds i;ZVdksa dks vkdf"kZr djrs gSaA jkT; ljdkj i;ZVu dks c<+kok nsus ds fy, yxkrkj dke dj jgh gSA`
  },
  {
    id: 'digital_revolution',
    title: 'डिजिटल क्रांति / Digital Revolution',
    difficulty: 'hard',
    englishText: 'The digital revolution in India has completely changed the way of working. Today, banking, shopping, and studies are being done through online mediums. Digital literacy has empowered every section of society. This technology is giving a new direction to national development.',
    hindiUnicodeText: 'भारत में डिजिटल क्रांति ने कामकाज के तरीकों को पूरी तरह से बदल दिया है। आज बैंकिंग, खरीदारी और पढ़ाई ऑनलाइन माध्यम से की जा रही है। डिजिटल साक्षरता ने समाज के हर वर्ग को सशक्त बनाया है। यह तकनीक देश के विकास को एक नई दिशा दे रही है।',
    hindiKrutidevText: `Hkkjr esa fMftVy Økafr us dkedkt ds rjhdksa dks iwjh rjg ls cny fn;k gSA vkt cSafdax] [kjhnkjh vkSj i<+kbZ v‚uykbu ek/;e ls dh tk jgh gSA fMftVy lk{kjrk us lekt ds gj oxZ dks l'kDr cuk;k gSA ;g rduhd ns'k ds fodkl dks ,d ubZ fn'kk ns jgh gSA`
  },
  {
    id: 'economy',
    title: 'भारत की अर्थव्यवस्था / Economy of India',
    difficulty: 'hard',
    englishText: 'The Indian economy is one of the fastest-growing economies in the world. Agriculture, industry, and the service sector are its main pillars. A strong infrastructure is essential for the country\'s development. Creating new jobs for youth is our big challenge.',
    hindiUnicodeText: 'भारतीय अर्थव्यवस्था विश्व की सबसे तेजी से बढ़ती हुई अर्थव्यवस्थाओं में से एक है। कृषि, उद्योग और सेवा क्षेत्र इसके मुख्य स्तंभ हैं। देश के विकास के लिए बुनियादी ढांचे का मजबूत होना आवश्यक है। युवाओं के लिए नए रोजगार पैदा करना हमारी बड़ी चुनौती है।',
    hindiKrutidevText: `Hkkjrh; vFkZO;oLFkk fo'o dh lcls rsth ls c<+rh gqbZ vFkZO;oLFkkvksa esa ls ,d gSA —f"k] m|ksx vkSj lsok {ks= blds eq[; LraHk gSaA ns'k ds fodkl ds fy, cqfu;knh <kaps dk etcwr gksuk vko';d gSA ;qokvksa ds fy, u, jkstxkj iSnk djuk gekjh cM+h pqukSrh gSA`
  },
  {
    id: 'human_rights',
    title: 'मानव अधिकार / Human Rights',
    difficulty: 'hard',
    englishText: 'Human rights are the basic rights of all individuals that guarantee them a dignified life. Any discrimination based on caste, gender, or religion is a violation of these rights. In a civilized society, the rights of every citizen must be respected.',
    hindiUnicodeText: 'मानव अधिकार सभी व्यक्तियों के बुनियादी अधिकार हैं जो उन्हें गरिमापूर्ण जीवन जीने की गारंटी देते हैं। जाति, लिंग या धर्म के आधार पर किसी भी प्रकार का भेदभाव इन अधिकारों का उल्लंघन है। एक सभ्य समाज में प्रत्येक नागरिक के अधिकारों का सम्मान होना चाहिए।',
    hindiKrutidevText: `ekuo vf/kdkj lHkh O;fDr;ksa ds cqfu;knh vf/kdkj gSa tks mUgsa xfjekiw.kZ thou thus dh xkjaVh nsrs gSaA tkfr] fyax ;k /keZ ds vk/kkj ij fdlh Hkh çdkj dk HksnHkko bu vf/kdkjksa dk mYya?ku gSA ,d lH; lekt esa çR;sd ukxfjd ds vf/kdkjksa dk lEeku gksuk pkfg,A`
  }
];

// Comprehensive KrutiDev / Devlys 010 Alt-Codes Database (Official Exam Cheatsheet)
export interface KrutiDevCode {
  code: string;
  symbol: string;
  charName: string;
  example: string;
  category: 'conjunct' | 'matra' | 'symbol' | 'half' | 'number';
}

const KRUTIDEV_ALT_CODES: KrutiDevCode[] = [
  // 1. Hindi Numbers (देवनागरी अंक: Alt + 0131 to 0140)
  { code: 'Alt + 0131', symbol: '१', charName: 'हिंदी अंक १', example: 'संख्या १', category: 'number' },
  { code: 'Alt + 0132', symbol: '२', charName: 'हिंदी अंक २', example: 'संख्या २', category: 'number' },
  { code: 'Alt + 0133', symbol: '३', charName: 'हिंदी अंक ३', example: 'संख्या ३', category: 'number' },
  { code: 'Alt + 0134', symbol: '४', charName: 'हिंदी अंक ४', example: 'संख्या ४', category: 'number' },
  { code: 'Alt + 0135', symbol: '५', charName: 'हिंदी अंक ५', example: 'संख्या ५', category: 'number' },
  { code: 'Alt + 0136', symbol: '६', charName: 'हिंदी अंक ६', example: 'संख्या ६', category: 'number' },
  { code: 'Alt + 0137', symbol: '७', charName: 'हिंदी अंक ७', example: 'संख्या ७', category: 'number' },
  { code: 'Alt + 0138', symbol: '८', charName: 'हिंदी अंक ८', example: 'संख्या ८', category: 'number' },
  { code: 'Alt + 0139', symbol: '९', charName: 'हिंदी अंक ९', example: 'संख्या ९', category: 'number' },
  { code: 'Alt + 0140', symbol: '०', charName: 'हिंदी अंक ०', example: 'संख्या ०', category: 'number' },

  // 2. Sanyukt / Conjunct Characters (संयुक्त अक्षर)
  { code: 'Alt + 0150', symbol: 'दृ', charName: 'दृ (द + ऋ)', example: 'दृष्टि, दृष्टिकोण, दृश्य', category: 'conjunct' },
  { code: 'Alt + 0151', symbol: 'कृ', charName: 'कृ (क + ऋ)', example: 'कृपा, प्रकृति, कृष्ण', category: 'conjunct' },
  { code: 'Alt + 0152', symbol: 'द्भ', charName: 'द्भ (द् + भ)', example: 'उद्भव, सद्भाव, उद्भासित', category: 'conjunct' },
  { code: 'Alt + 0153', symbol: 'झ्', charName: 'आधा झ', example: 'झंकार', category: 'half' },
  { code: 'Alt + 0155', symbol: 'ष्ट्र', charName: 'ष्ट्र', example: 'राष्ट्र, महाराष्ट्र', category: 'conjunct' },
  { code: 'Alt + 0159', symbol: 'ट्', charName: 'आधा ट (हलंत ट)', example: 'खट्टा, पट्टी, मिट्टी', category: 'half' },
  { code: 'Alt + 0161', symbol: '्र', charName: 'पदेन र (प्र)', example: 'प्रकाश, प्रकार, प्रयास, प्राचीन', category: 'conjunct' },
  { code: 'Alt + 0163', symbol: 'त्र', charName: 'त्र', example: 'छात्र, पत्र, मित्र, त्रिभुज', category: 'conjunct' },
  { code: 'Alt + 0165', symbol: 'ह्य', charName: 'ह्य (ह् + य)', example: 'सह्य, बाह्य', category: 'conjunct' },
  { code: 'Alt + 0168', symbol: 'द्भ', charName: 'द्भ (द् + भ)', example: 'उद्भव, सद्भाव', category: 'conjunct' },
  { code: 'Alt + 0169', symbol: 'ष्ट', charName: 'ष्ट (ष् + ट)', example: 'कष्ट, भ्रष्ट, दृष्टि', category: 'conjunct' },
  { code: 'Alt + 0170', symbol: 'द्ध', charName: 'द्ध (द् + ध)', example: 'बुद्ध, शुद्ध, युद्ध, प्रसिद्धि', category: 'conjunct' },
  { code: 'Alt + 0171', symbol: 'त्र', charName: 'त्र (वैकल्पिक)', example: 'त्रिशूल', category: 'conjunct' },
  { code: 'Alt + 0179', symbol: 'द्द', charName: 'द्द (द् + द)', example: 'उद्देश्य, गद्दा, रद्दी, भद्दा', category: 'conjunct' },
  { code: 'Alt + 0180', symbol: 'द्य', charName: 'द्य (द् + य)', example: 'विद्या, विद्यालय, विद्यापीठ', category: 'conjunct' },
  { code: 'Alt + 0181', symbol: 'द्म', charName: 'द्म (द् + म)', example: 'पद्म, पद्मावत', category: 'conjunct' },
  { code: 'Alt + 0182', symbol: 'ध्र', charName: 'ध्र (ध + र)', example: 'ध्रुव, आंध्र', category: 'conjunct' },
  { code: 'Alt + 0186', symbol: 'ह्न', charName: 'ह्न (ह् + न)', example: 'अपराह्न, पूर्वाह्न', category: 'conjunct' },
  { code: 'Alt + 0193', symbol: 'प्र', charName: 'प्र (प् + र)', example: 'प्रथम, प्रयास, प्रभाव', category: 'conjunct' },
  { code: 'Alt + 0204', symbol: 'द्व', charName: 'द्व (द् + व)', example: 'द्वार, द्वितीय, विद्वान, द्वेष', category: 'conjunct' },
  { code: 'Alt + 0205', symbol: 'ट्र', charName: 'ट्र (ट + र)', example: 'ट्रक, ट्रेन, ट्रैफिक, ट्रैक्टर', category: 'conjunct' },
  { code: 'Alt + 0206', symbol: 'ड्र', charName: 'ड्र (ड + र)', example: 'ड्राइवर, ड्रम, ड्रेस, ड्राइंग', category: 'conjunct' },
  { code: 'Alt + 0207', symbol: 'ड्ड', charName: 'ड्ड (ड + ड)', example: 'अड्डा, गुड्डा, लड़्डू', category: 'conjunct' },
  { code: 'Alt + 0209', symbol: 'कृ', charName: 'कृ (क + ऋ)', example: 'कृषक, कृपा', category: 'conjunct' },
  { code: 'Alt + 0210', symbol: 'त्त', charName: 'त्त (त् + त)', example: 'कुत्ता, पत्ता, उत्तर', category: 'conjunct' },
  { code: 'Alt + 0212', symbol: 'ड्ढ', charName: 'ड्ढ (ड + ढ)', example: 'गड्ढा', category: 'conjunct' },
  { code: 'Alt + 0216', symbol: 'क्र', charName: 'क्र (क् + र)', example: 'क्रम, क्रिया, क्रमांक, विक्रेता', category: 'conjunct' },
  { code: 'Alt + 0221', symbol: 'फ्र', charName: 'फ्र (फ़ + र)', example: 'फ्रिज, फ्रांस, फ्रॉक', category: 'conjunct' },
  { code: 'Alt + 0224', symbol: 'ह्ल', charName: 'ह्ल (ह् + ल)', example: 'प्रह्लाद', category: 'conjunct' },
  { code: 'Alt + 0225', symbol: 'ह्य', charName: 'ह्य (ह् + य)', example: 'सह्य, बाह्य', category: 'conjunct' },
  { code: 'Alt + 0226', symbol: 'हृ', charName: 'हृ (ह् + ऋ)', example: 'हृदय, हृषिकेश', category: 'conjunct' },
  { code: 'Alt + 0227', symbol: 'ह्म', charName: 'ह्म (ह् + म)', example: 'ब्रह्मा, ब्राह्मण', category: 'conjunct' },
  { code: 'Alt + 0228', symbol: 'क्त', charName: 'क्त (क् + त)', example: 'भक्त, रक्त, शक्ति, मुक्ति', category: 'conjunct' },
  { code: 'Alt + 0230', symbol: 'द्र', charName: 'द्र (द् + र)', example: 'द्रव्य, चंद्रमा, रुद्र', category: 'conjunct' },
  { code: 'Alt + 0231', symbol: 'प्र', charName: 'प्र वर्ण', example: 'प्रकृति, प्रवेश', category: 'conjunct' },
  { code: 'Alt + 0233', symbol: 'न्न', charName: 'न्न (न् + न)', example: 'अन्न, प्रसन्न, पन्ना', category: 'conjunct' },
  { code: 'Alt + 0234', symbol: 'ट्ट', charName: 'ट्ट (ट + ट)', example: 'खट्टा, पट्टी, मिट्टी', category: 'conjunct' },
  { code: 'Alt + 0235', symbol: 'ट्ठ', charName: 'ट्ठ (ट + ठ)', example: 'चिट्ठी, मुट्ठी, लट्ठ', category: 'conjunct' },
  { code: 'Alt + 0236', symbol: 'ड्ड', charName: 'ड्ड (ड + ड)', example: 'लड्डू, कबड्डी', category: 'conjunct' },
  { code: 'Alt + 0237', symbol: 'द्द', charName: 'द्द (द् + द)', example: 'उद्देश्य, भद्दा', category: 'conjunct' },
  { code: 'Alt + 0239', symbol: 'ङ्क', charName: 'ङ्क (ङ + क)', example: 'अङ्क, पङ्क्ति', category: 'conjunct' },
  { code: 'Alt + 0240', symbol: 'ष्ट', charName: 'ष्ट (ष् + ट)', example: 'कष्ट, नष्ट, स्पष्ट', category: 'conjunct' },
  { code: 'Alt + 0243', symbol: 'स्त्र', charName: 'स्त्र (स् + त + र)', example: 'अस्त्र, शस्त्र, स्त्री', category: 'conjunct' },
  { code: 'Alt + 0246', symbol: 'द्ध', charName: 'द्ध (द् + ध)', example: 'बुद्ध, युद्ध', category: 'conjunct' },
  { code: 'Alt + 0249', symbol: 'द्य', charName: 'द्य (द् + य)', example: 'विद्या, पद्य', category: 'conjunct' },

  // 3. Half Characters (आधे अक्षर)
  { code: 'Alt + 0147', symbol: 'भ्', charName: 'आधा भ', example: 'अभ्यास, सभ्यता', category: 'half' },
  { code: 'Alt + 0162', symbol: '्', charName: 'हलंत चिह्न', example: 'क्, त्', category: 'half' },
  { code: 'Alt + 0163', symbol: 'ख्', charName: 'आधा ख', example: 'संख्या, मुख्य, ख्याल', category: 'half' },
  { code: 'Alt + 0165', symbol: 'ञ', charName: 'ञ वर्ण', example: 'व्यंजन, संजय', category: 'half' },
  { code: 'Alt + 0182', symbol: 'फ्', charName: 'आधा फ', example: 'दफ्तर, मुफ्त, हफ्ता', category: 'half' },
  { code: 'Alt + 0184', symbol: 'ध्', charName: 'आधा ध', example: 'मध्य, ध्यान, संध्या', category: 'half' },
  { code: 'Alt + 0185', symbol: 'थ्', charName: 'आधा थ', example: 'स्थान, पृथ्वी, तथ्य', category: 'half' },
  { code: 'Alt + 0196', symbol: 'घ', charName: 'घ वर्ण', example: 'घर, घड़ी', category: 'half' },
  { code: 'Alt + 0198', symbol: 'ि', charName: 'छोटी इ की मात्रा (ि)', example: 'दिन, सिर', category: 'matra' },
  { code: 'Alt + 0199', symbol: 'ि', charName: 'छोटी इ की मात्रा (वैकल्पिक)', example: 'किताब', category: 'matra' },
  { code: 'Alt + 0200', symbol: 'ी', charName: 'बड़ी ई की मात्रा (ी)', example: 'नदी, पानी', category: 'matra' },
  { code: 'Alt + 0201', symbol: 'ि', charName: 'ह्रस्व इ मात्रा', example: 'कवि', category: 'matra' },
  { code: 'Alt + 0202', symbol: 'ी', charName: 'दीर्घ ई मात्रा', example: 'गीत', category: 'matra' },
  { code: 'Alt + 0211', symbol: 'च', charName: 'च वर्ण', example: 'चम्मच', category: 'half' },
  { code: 'Alt + 0217', symbol: 'त्', charName: 'आधा त (त्)', example: 'सत्य, पत्ता, आत्मा', category: 'half' },
  { code: 'Alt + 0238', symbol: 'ञ्च', charName: 'ञ्च (ञ + च)', example: 'चञ्चल, पञ्च', category: 'half' },

  // 4. Matras, Vowels & Modifiers (मात्राएं व स्वर)
  { code: 'Alt + 0130', symbol: 'ॉ', charName: 'ऑ की मात्रा (ॅ)', example: 'डॉक्टर, कॉलेज, ऑफिस', category: 'matra' },
  { code: 'Alt + 0164', symbol: 'ु', charName: 'छोटे उ की मात्रा (ु)', example: 'सुख, तुम, पुत्र', category: 'matra' },
  { code: 'Alt + 0168', symbol: 'ो', charName: 'ओ की मात्रा (ो)', example: 'लोग, मोर, चोट', category: 'matra' },
  { code: 'Alt + 0169', symbol: 'ौ', charName: 'औ की मात्रा (ौ)', example: 'कौआ, पौधा, मौसम', category: 'matra' },
  { code: 'Alt + 0174', symbol: 'ो', charName: 'ओ की मात्रा (वैकल्पिक)', example: 'सोना', category: 'matra' },
  { code: 'Alt + 0177', symbol: 'ु', charName: 'ह्रस्व उ मात्रा', example: 'गुरु', category: 'matra' },
  { code: 'Alt + 0195', symbol: 'ई', charName: 'ई (स्वर)', example: 'ईश्वर, ईंट, ईमेल', category: 'matra' },
  { code: 'Alt + 0197', symbol: 'ऊ', charName: 'ऊ (स्वर)', example: 'ऊपर, ऊन, ऊर्जा', category: 'matra' },
  { code: 'Alt + 0203', symbol: '६', charName: 'अंक ६', example: '६', category: 'number' },
  { code: 'Alt + 0214', symbol: 'इ', charName: 'इ (स्वर)', example: 'इधर, इसका, इतिहास', category: 'matra' },
  { code: 'Alt + 0229', symbol: '॰', charName: 'लाघव चिह्न (संक्षेप बिंदी)', example: 'डॉ॰, पं॰, प्रो॰', category: 'symbol' },
  { code: 'Alt + 0232', symbol: '६', charName: 'अंक ६', example: 'संख्या ६', category: 'number' },
  { code: 'Alt + 0241', symbol: '°', charName: 'डिग्री चिह्न (°)', example: '45° सेल्सियस', category: 'symbol' },
  { code: 'Alt + 0245', symbol: 'ॅ', charName: 'चंद्रबिंदी', example: 'गाँव, चाँद', category: 'matra' },
  { code: 'Alt + 0247', symbol: 'इ', charName: 'इ (स्वर)', example: 'इनाम', category: 'matra' },
  { code: 'Alt + 0248', symbol: '{', charName: 'मझला कोष्ठक प्रारंभ {', example: '{ कोष्ठक', category: 'symbol' },

  // 5. Symbols & Special Characters (चिह्न व कोष्ठक: Alt + 0188-0192, 222-223 etc.)
  { code: 'Alt + 0170', symbol: '^', charName: 'कैरेट चिह्न (^)', example: 'a^2', category: 'symbol' },
  { code: 'Alt + 0183', symbol: 'S', charName: 'अवग्रह चिह्न (ऽ)', example: 'कोऽपि, शिवोऽहम्', category: 'symbol' },
  { code: 'Alt + 0187', symbol: '÷', charName: 'भाग का चिह्न (÷)', example: '10 ÷ 2 = 5', category: 'symbol' },
  { code: 'Alt + 0188', symbol: '(', charName: 'छोटा कोष्ठक प्रारंभ (', example: '( उदाहरण', category: 'symbol' },
  { code: 'Alt + 0189', symbol: ')', charName: 'छोटा कोष्ठक बंद )', example: 'समाप्त )', category: 'symbol' },
  { code: 'Alt + 0190', symbol: '=', charName: 'बराबर का चिह्न (=)', example: 'x = 10', category: 'symbol' },
  { code: 'Alt + 0191', symbol: '{', charName: 'मझला कोष्ठक प्रारंभ {', example: '{ प्रारंभ', category: 'symbol' },
  { code: 'Alt + 0192', symbol: '}', charName: 'मझला कोष्ठक बंद }', example: 'समाप्त }', category: 'symbol' },
  { code: 'Alt + 0218', symbol: '-', charName: 'डैश / योजक चिह्न (-)', example: 'माता-पिता', category: 'symbol' },
  { code: 'Alt + 0219', symbol: '•', charName: 'बुलेट पॉइंट बिंदु (•)', example: '• सूची', category: 'symbol' },
  { code: 'Alt + 0220', symbol: '९', charName: 'अंक ९', example: 'संख्या ९', category: 'number' },
  { code: 'Alt + 0222', symbol: '"', charName: 'डबल कोट प्रारंभ (")', example: '" वाक्य प्रारंभ', category: 'symbol' },
  { code: 'Alt + 0223', symbol: '"', charName: 'डबल कोट बंद (")', example: 'वाक्य समाप्त "', category: 'symbol' },

  // Special ASCII Codes (Alt + 15 to 36)
  { code: 'Alt + 15', symbol: '☼', charName: 'सूर्य प्रतीक', example: 'प्रतीक', category: 'symbol' },
  { code: 'Alt + 16', symbol: '†', charName: 'डैगर चिह्न', example: 'चिह्न †', category: 'symbol' },
  { code: 'Alt + 17', symbol: '◄', charName: 'बायां तीर', example: '◄', category: 'symbol' },
  { code: 'Alt + 18', symbol: '↕', charName: 'ऊपर-नीचे तीर', example: '↕', category: 'symbol' },
  { code: 'Alt + 19', symbol: '‼', charName: 'दोहरा विस्मयादिबोधक', example: '‼', category: 'symbol' },
  { code: 'Alt + 20', symbol: '¶', charName: 'पैराग्राफ चिह्न (Pilcrow)', example: '¶', category: 'symbol' },
  { code: 'Alt + 21', symbol: '§', charName: 'सेक्शन चिह्न', example: 'धारा §', category: 'symbol' },
  { code: 'Alt + 23', symbol: '↨', charName: 'वर्टिकल एरो', example: '↨', category: 'symbol' },
  { code: 'Alt + 24', symbol: '↑', charName: 'ऊपर की ओर तीर', example: '↑', category: 'symbol' },
  { code: 'Alt + 25', symbol: '↓', charName: 'नीचे की ओर तीर', example: '↓', category: 'symbol' },
  { code: 'Alt + 26', symbol: '→', charName: 'दाएं तीर', example: '→', category: 'symbol' },
  { code: 'Alt + 30', symbol: '▲', charName: 'त्रिभुज तीर', example: '▲', category: 'symbol' },
  { code: 'Alt + 36', symbol: '+', charName: 'जोड़ का चिह्न (+)', example: '5 + 5', category: 'symbol' }
];

// Vedmata m17n Key Mapping Cheatsheet (CG High Court Ubuntu Linux Standard)
export interface VedmataCode {
  key: string;
  hindiChar: string;
  charType: string;
  example: string;
  category: 'consonant' | 'matra' | 'special' | 'number';
}

const VEDMATA_CODES: VedmataCode[] = [
  // Special Conjuncts & Ligatures in Vedmata m17n
  { key: 'Shift + 6 (^)', hindiChar: 'त्र', charType: 'संयुक्त व्यंजन (त्र)', example: 'छात्र, पत्र, मित्र', category: 'special' },
  { key: 'Shift + - (_)', hindiChar: 'त्र', charType: 'संयुक्त व्यंजन (त्र)', example: 'त्रिभुज, पवित्र', category: 'special' },
  { key: 'Shift + [ ({)', hindiChar: 'क्ष्', charType: 'आधा क्ष', example: 'क्षेत्र, रक्षा, क्षमा', category: 'special' },
  { key: 'Shift + J', hindiChar: 'श्र', charType: 'श्र', example: 'श्रीमान, श्रम, विश्राम', category: 'special' },
  { key: 'Shift + K', hindiChar: 'ज्ञ', charType: 'ज्ञ', example: 'ज्ञान, विज्ञान, अज्ञानी', category: 'special' },
  { key: 'Shift + 0 ())', hindiChar: 'द्घ', charType: 'द्घ (द् + घ)', example: 'उद्घाटन', category: 'special' },
  { key: 'Shift + ] (})', hindiChar: 'द्व', charType: 'द्व (द् + व)', example: 'द्वार, द्वितीय, विद्वान', category: 'special' },
  { key: 'Shift + \\ (|)', hindiChar: 'द्य', charType: 'द्य (द् + य)', example: 'विद्या, विद्यालय, उद्योग', category: 'special' },
  { key: 'Shift + 9 (())', hindiChar: '।', charType: 'पूर्णविराम (।)', example: 'वाक्य का अंत।', category: 'special' },
  { key: 'Shift + 4 ($)', hindiChar: 'ङ', charType: 'ङ (पंचमाक्षर)', example: 'वाङ्मय, अङ्ग', category: 'special' },
  { key: 'Shift + 8 (*)', hindiChar: 'ञ', charType: 'ञ (पंचमाक्षर)', example: 'सञ्चय, पञ्च', category: 'special' },
  { key: 'z (लघु)', hindiChar: '्र', charType: 'पदेन र (्र)', example: 'क्रम, प्रकाश, तीव्र', category: 'special' },
  { key: 'Shift + Z (Z)', hindiChar: 'र्', charType: 'रेफ (ऊपर र)', example: 'सूर्य, कार्य, धर्म, वर्ष', category: 'special' },
  { key: 'Shift + = (+)', hindiChar: 'ऋ', charType: 'ऋ स्वर', example: 'ऋषि, ऋण, ऋतु', category: 'special' },
  { key: '` (Tilde key)', hindiChar: '्', charType: 'हलंत (्)', example: 'क्, त्, म्', category: 'special' },
  { key: 'Shift + 5 (%)', hindiChar: 'ः', charType: 'विसर्ग (ः)', example: 'अतः, प्रातः, क्रमशः', category: 'special' },
  { key: 'Shift + ; (:)', hindiChar: 'ॐ', charType: 'ॐ (पवित्र ओंकार)', example: 'ॐ नमः शिवाय', category: 'special' },

  // Matras in Vedmata
  { key: 'f (कंसोनेंट से पहले)', hindiChar: 'ि', charType: 'छोटी इ की मात्रा', example: 'दिन (f + n), किसान (f + d + k + l)', category: 'matra' },
  { key: 'h', hindiChar: 'ी', charType: 'बड़ी ई की मात्रा', example: 'पानी, नदी, चाबी', category: 'matra' },
  { key: 'k', hindiChar: 'ा', charType: 'आ की मात्रा', example: 'काम, बात, खाना', category: 'matra' },
  { key: 'q', hindiChar: 'ु', charType: 'छोटे उ की मात्रा', example: 'सुख, तुम, पुत्र', category: 'matra' },
  { key: 'w', hindiChar: 'ू', charType: 'बड़े ऊ की मात्रा', example: 'फूल, दूर, भूमि', category: 'matra' },
  { key: 's', hindiChar: 'े', charType: 'ए की मात्रा', example: 'देश, रेल, सेवा', category: 'matra' },
  { key: 'Shift + S (S)', hindiChar: 'ै', charType: 'ऐ की मात्रा', example: 'पैसा, कैसा, सैनिक', category: 'matra' },
  { key: 'k + s', hindiChar: 'ो', charType: 'ओ की मात्रा', example: 'लोग, चोट, मोर', category: 'matra' },
  { key: 'k + Shift + S', hindiChar: 'ौ', charType: 'औ की मात्रा', example: 'कौआ, पौधा, मौसम', category: 'matra' },
  { key: 'a', hindiChar: 'ं', charType: 'अनुस्वार (बिंदी)', example: 'संबंध, गंगा, अंत', category: 'matra' },
  { key: 'Shift + A (A)', hindiChar: 'ँ', charType: 'अनुनासिक (चंद्रबिंदी)', example: 'आँख, चाँद, गाँव', category: 'matra' },
  { key: 'Shift + 1 (!)', hindiChar: '?', charType: 'प्रश्नवाचक चिह्न (?)', example: 'क्या आप आएंगे?', category: 'matra' },
  { key: '1 (बिना शिफ्ट)', hindiChar: '़', charType: 'नुक्ता (़)', example: 'ज़िला, फ़ैसला, क़ानून', category: 'matra' },
  { key: '2 (बिना शिफ्ट)', hindiChar: 'ृ', charType: 'ऋ की मात्रा (ृ)', example: 'कृपा, प्रकृति, दृष्टि', category: 'matra' },
  { key: 'Shift + W (W)', hindiChar: 'ॅ', charType: 'ऑ की मात्रा (ॅ)', example: 'कॉलेज, डॉक्टर, हॉस्पिटल', category: 'matra' },

  // Key Consonants & Half Characters
  { key: 'd + k', hindiChar: 'क', charType: 'क पूरा (d=क् + k=ा)', example: 'कलम, कागज', category: 'consonant' },
  { key: 'd (Shift + d = D)', hindiChar: 'क्', charType: 'आधा क (Shift+D)', example: 'क्या, पक्का', category: 'consonant' },
  { key: '[ (Shift + [)', hindiChar: 'ख्', charType: 'आधा ख (Shift+[)', example: 'ख्याति, मुख्य', category: 'consonant' },
  { key: 'x (Shift + x = X)', hindiChar: 'ग्', charType: 'आधा ग (Shift+X)', example: 'ग्वाला, भाग्य', category: 'consonant' },
  { key: 'Shift + ? (?)', hindiChar: 'घ्', charType: 'आधा घ', example: 'शीघ्र, विघ्न', category: 'consonant' },
  { key: 'p (Shift + p = P)', hindiChar: 'च्', charType: 'आधा च (Shift+P)', example: 'बच्चा, सच्चा', category: 'consonant' },
  { key: 'Shift + N', hindiChar: 'छ', charType: 'छ वर्ण', example: 'छाया, छात्र', category: 'consonant' },
  { key: 't (Shift + t = T)', hindiChar: 'ज्', charType: 'आधा ज (Shift+T)', example: 'ज्वाला, राज्य', category: 'consonant' },
  { key: 'Shift + > (>)', hindiChar: 'झ', charType: 'झ वर्ण', example: 'झरना, झंडा', category: 'consonant' },
  { key: 'Shift + V (V)', hindiChar: 'ट', charType: 'ट वर्ण', example: 'टमाटर, टिकट', category: 'consonant' },
  { key: 'Shift + B (B)', hindiChar: 'ठ', charType: 'ठ वर्ण', example: 'ठोस, पाठ', category: 'consonant' },
  { key: 'Shift + M (M)', hindiChar: 'ड', charType: 'ड वर्ण', example: 'डमरू, डिब्बा', category: 'consonant' },
  { key: 'Shift + < (<)', hindiChar: 'ढ', charType: 'ढ वर्ण', example: 'ढोलक, ढक्कन', category: 'consonant' },
  { key: 'Shift + . (.)', hindiChar: 'ण्', charType: 'आधा ण', example: 'घंटा, कारण', category: 'consonant' },
  { key: 'r (Shift + r = R)', hindiChar: 'त्', charType: 'आधा त (Shift+R)', example: 'सत्य, पत्ता', category: 'consonant' },
  { key: 'Shift + F (F)', hindiChar: 'थ्', charType: 'आधा थ', example: 'स्थान, पथ्य', category: 'consonant' },
  { key: 'n', hindiChar: 'द', charType: 'द वर्ण', example: 'देश, दीपक', category: 'consonant' },
  { key: 'Shift + / (/)', hindiChar: 'ध्', charType: 'आधा ध', example: 'ध्यान, मध्य', category: 'consonant' },
  { key: 'u (Shift + u = U)', hindiChar: 'न्', charType: 'आधा न (Shift+U)', example: 'न्याय, गन्ना', category: 'consonant' },
  { key: 'i (Shift + i = I)', hindiChar: 'प्', charType: 'आधा प (Shift+I)', example: 'प्यार, चप्पल', category: 'consonant' },
  { key: 'Shift + H (H)', hindiChar: 'भ्', charType: 'आधा भ', example: 'अभ्यास, सभ्यता', category: 'consonant' },
  { key: 'e (Shift + e = E)', hindiChar: 'म्', charType: 'आधा म (Shift+E)', example: 'सम्मान, मुख्य', category: 'consonant' },
  { key: ';', hindiChar: 'य', charType: 'य वर्ण', example: 'याद, योग्य', category: 'consonant' },
  { key: 'j', hindiChar: 'र', charType: 'र वर्ण', example: 'रात, रंग', category: 'consonant' },
  { key: 'y (Shift + y = Y)', hindiChar: 'ल्', charType: 'आधा ल (Shift+Y)', example: 'कल्याण, दिल्ली', category: 'consonant' },
  { key: 'o (Shift + o = O)', hindiChar: 'व्', charType: 'आधा व (Shift+O)', example: 'व्यापार, विद्वान', category: 'consonant' },
  { key: "Shift + ' (')", hindiChar: 'श्', charType: 'आधा श (तालव्य श)', example: 'श्याम, निश्चय', category: 'consonant' },
  { key: 'Shift + " (")', hindiChar: 'ष्', charType: 'आधा ष (मूर्धन्य ष)', example: 'कष्ट, श्रेष्ठ', category: 'consonant' },
  { key: 'l (Shift + l = L)', hindiChar: 'स्', charType: 'आधा स (दंत्य स)', example: 'स्थान, रास्ता', category: 'consonant' },
  { key: 'g', hindiChar: 'ह', charType: 'ह वर्ण', example: 'हम, हाथ', category: 'consonant' },
  { key: 'Shift + G (G)', hindiChar: 'ळ', charType: 'मराठी/वैदिक ळ', example: 'बाळ, टिळक', category: 'consonant' },

  // Hindi Digits (CG High Court official)
  { key: '3', hindiChar: '१', charType: 'हिंदी अंक १', example: 'संख्या १', category: 'number' },
  { key: '4', hindiChar: '२', charType: 'हिंदी अंक २', example: 'संख्या २', category: 'number' },
  { key: '5', hindiChar: '३', charType: 'हिंदी अंक ३', example: 'संख्या ३', category: 'number' },
  { key: '6', hindiChar: '४', charType: 'हिंदी अंक ४', example: 'संख्या ४', category: 'number' },
  { key: '7', hindiChar: '५', charType: 'हिंदी अंक ५', example: 'संख्या ५', category: 'number' },
  { key: '8', hindiChar: '६', charType: 'हिंदी अंक ६', example: 'संख्या ६', category: 'number' },
  { key: '9', hindiChar: '७', charType: 'हिंदी अंक ७', example: 'संख्या ७', category: 'number' },
  { key: '0', hindiChar: '८', charType: 'हिंदी अंक ८', example: 'संख्या ८', category: 'number' },
  { key: '-', hindiChar: '९', charType: 'हिंदी अंक ९', example: 'संख्या ९', category: 'number' },
  { key: '=', hindiChar: '०', charType: 'हिंदी अंक ०', example: 'संख्या ०', category: 'number' }
];

export type ExamProfileType = 'cg_high_court' | 'cpct_krutidev' | 'english_exam' | 'custom';
export type TypingFontLayout = 'vedmata' | 'krutidev' | 'mangal' | 'english';

interface TypingTestProps {
  currentUser?: any;
  onSaveResults?: (
    netWpm: number,
    grossWpm: number,
    accuracy: number,
    correctChars: number,
    incorrectChars: number,
    language: string,
    duration: number,
    topicId: string,
    topicTitle: string
  ) => void;
}

export const TypingTest: React.FC<TypingTestProps> = ({ currentUser, onSaveResults }) => {
  // Candidate Profile State
  const candidateName = currentUser?.displayName || 'Guest Candidate';

  // Mode & Parameters
  const [layoutMode, setLayoutMode] = useState<TypingFontLayout>('vedmata');
  const [duration, setDuration] = useState<number>(600); // 10 minutes default for CG High Court
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [allowBackspace, setAllowBackspace] = useState<boolean>(true);
  const [showHighlight, setShowHighlight] = useState<boolean>(true);
  const [instantErrorAlert, setInstantErrorAlert] = useState<boolean>(true);
  const [fontSizeLevel, setFontSizeLevel] = useState<'sm' | 'md' | 'lg'>('md');

  // Topics
  const [topics, setTopics] = useState<Topic[]>(TYPING_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(TYPING_TOPICS[0]);

  // Test Runner State
  const [status, setStatus] = useState<'config' | 'running' | 'finished'>('config');
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [fullTypedText, setFullTypedText] = useState<string>('');
  const [userTypedWords, setUserTypedWords] = useState<string[]>([]);
  const [mistakeWordIndices, setMistakeWordIndices] = useState<Set<number>>(new Set());

  // Metrics
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0);
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);
  const [liveWpm, setLiveWpm] = useState<number>(0);
  const [liveGrossWpm, setLiveGrossWpm] = useState<number>(0);
  const [liveKph, setLiveKph] = useState<number>(0);
  const [liveAccuracy, setLiveAccuracy] = useState<number>(100);

  // Review & Helper Modals
  const [reviewFilter, setReviewFilter] = useState<'all' | 'mistakes' | 'correct'>('all');
  const [showAltCodeModal, setShowAltCodeModal] = useState<boolean>(false);
  const [altCodeModalTab, setAltCodeModalTab] = useState<'krutidev' | 'vedmata'>('krutidev');
  const [altCodeCategory, setAltCodeCategory] = useState<string>('all');
  const [altCodeSearch, setAltCodeSearch] = useState<string>('');
  const [showUnicodeHelper, setShowUnicodeHelper] = useState<boolean>(true);
  const [shakeInput, setShakeInput] = useState<boolean>(false);
  const [hindiEngineState, setHindiEngineState] = useState<TypingEngineState>(createInitialTypingState());
  const [enableVirtualHindiKeyboard, setEnableVirtualHindiKeyboard] = useState<boolean>(true);

  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const displayContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load custom topics from Firestore
  useEffect(() => {
    const fetchFirestoreTopics = async () => {
      const firebase = (window as any).firebase;
      if (!firebase) return;
      try {
        const snapshot = await firebase.firestore().collection('typing_topics').get();
        const loaded: Topic[] = [];
        snapshot.forEach((doc: any) => {
          const data = doc.data();
          loaded.push({
            id: doc.id,
            title: data.title || '',
            difficulty: data.difficulty || 'easy',
            englishText: data.englishText || '',
            hindiUnicodeText: data.hindiUnicodeText || '',
            hindiKrutidevText: data.hindiKrutidevText || '',
            category: data.category
          });
        });
        if (loaded.length > 0) {
          const combined = [...TYPING_TOPICS];
          loaded.forEach(item => {
            if (!combined.some(c => c.id === item.id)) combined.push(item);
          });
          setTopics(combined);
        }
      } catch (err) {
        console.warn('Firestore typing topics load failed:', err);
      }
    };
    fetchFirestoreTopics();
  }, []);

  // Keyboard shortcut listener for F1 (Quick Alt-Codes / Reference)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        setShowAltCodeModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter topics by difficulty
  const filteredTopics = topics.filter(t => !difficulty || t.difficulty === difficulty);

  // Helper to extract text according to layoutMode
  const getTopicText = (topic: Topic, mode: TypingFontLayout): string => {
    if (mode === 'english') return topic.englishText;
    if (mode === 'krutidev') return topic.hindiKrutidevText;
    return topic.hindiUnicodeText; // 'vedmata' & 'mangal' use Hindi Unicode
  };

  // Start Test
  const handleStartTest = () => {
    const text = getTopicText(selectedTopic, layoutMode);
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    setTargetWords(words);
    setCurrentWordIndex(0);
    setFullTypedText('');
    setUserTypedWords([]);
    setMistakeWordIndices(new Set());
    setHindiEngineState(createInitialTypingState());
    setTimeLeft(duration);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setMistakesCount(0);
    setBackspaceCount(0);
    setLiveWpm(0);
    setLiveGrossWpm(0);
    setLiveKph(0);
    setLiveAccuracy(100);
    setStatus('running');

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.value = '';
      }
      if (displayContainerRef.current) {
        displayContainerRef.current.scrollTop = 0;
      }
    }, 120);
  };

  // Timer Tick
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  // Recalculate Live Metrics whenever keystrokes, mistakes, or time changes
  useEffect(() => {
    if (status !== 'running') return;
    const timeSpentSec = Math.max(1, duration - timeLeft);
    const timeSpentMin = timeSpentSec / 60;

    // Gross WPM: (Total Keystrokes / 5) / minutes
    const gross = Math.round((totalKeystrokes / 5) / timeSpentMin);
    // Net WPM: ((Total Keystrokes / 5) - Mistakes) / minutes
    const net = Math.max(0, Math.round(((totalKeystrokes / 5) - mistakesCount) / timeSpentMin));
    // KPH: Total Keystrokes / (minutes / 60)
    const kph = Math.round(totalKeystrokes / (timeSpentMin / 60));
    // Accuracy
    const acc = totalKeystrokes > 0 
      ? Math.max(0, Math.min(100, Math.round(((totalKeystrokes - (mistakesCount * 5)) / totalKeystrokes) * 100))) 
      : 100;

    setLiveGrossWpm(gross);
    setLiveWpm(net);
    setLiveKph(kph);
    setLiveAccuracy(acc);
  }, [timeLeft, totalKeystrokes, mistakesCount, status, duration]);

  // Smooth Auto-scroll Display Area to keep active word in comfortable view
  useEffect(() => {
    if (status !== 'running') return;
    if (activeWordRef.current && displayContainerRef.current) {
      const container = displayContainerRef.current;
      const activeEl = activeWordRef.current;
      
      const activeTop = activeEl.offsetTop;
      const activeHeight = activeEl.offsetHeight;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Only scroll if active element is moving near the bottom boundary or top boundary
      const bottomThreshold = containerScrollTop + containerHeight - activeHeight - 30;
      const topThreshold = containerScrollTop + 20;

      if (activeTop > bottomThreshold) {
        // Move view down gently so the new line is comfortably visible
        container.scrollTo({
          top: activeTop - 40,
          behavior: 'smooth'
        });
      } else if (activeTop < topThreshold) {
        // In case user backspaced back to earlier lines
        container.scrollTo({
          top: Math.max(0, activeTop - 20),
          behavior: 'smooth'
        });
      }
    }
  }, [currentWordIndex, status]);

  // Synchronize typed text and metrics
  const syncTypedText = (text: string) => {
    setFullTypedText(text);

    // Keep textarea auto-scrolled without jarring jumps
    if (inputRef.current) {
      const ta = inputRef.current;
      if (ta.scrollHeight - ta.scrollTop > ta.clientHeight + 40) {
        ta.scrollTop = ta.scrollHeight;
      }
    }

    const parts = text.split(' ');
    const activeIdx = Math.max(0, parts.length - 1);
    setCurrentWordIndex(activeIdx);
    setUserTypedWords(parts);

    // Calculate mistakes and correct keystrokes from all completed words
    const mistakesSet = new Set<number>();
    let correctStrokes = 0;

    for (let i = 0; i < activeIdx; i++) {
      const typedW = parts[i];
      const targetW = targetWords[i];
      if (typedW === targetW) {
        correctStrokes += (targetW ? targetW.length + 1 : 0);
      } else {
        mistakesSet.add(i);
      }
    }

    setMistakeWordIndices(mistakesSet);
    setMistakesCount(mistakesSet.size);
    setTotalKeystrokes(text.length);
    setCorrectKeystrokes(correctStrokes);

    // Auto-finish if passage completed
    if (activeIdx >= targetWords.length && parts[parts.length - 1] === '') {
      handleFinishTest();
    }
  };

  // Handle Input Changes (Fallback & direct IME input)
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    syncTypedText(e.target.value);
  };

  // Keydown handler: In-browser Hindi mapping (Vedmata / Mangal) + strict controls
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 1. Backspace restriction & pending chhoti-i cancel
    if (e.key === 'Backspace') {
      if (!allowBackspace) {
        e.preventDefault();
        setShakeInput(true);
        setTimeout(() => setShakeInput(false), 300);
        return;
      }
      if (hindiEngineState.pendingChhotiI) {
        e.preventDefault();
        setHindiEngineState(prev => ({ ...prev, pendingChhotiI: false }));
        return;
      }
      setBackspaceCount(prev => prev + 1);
      return;
    }

    // 2. Space key
    if (e.key === ' ') {
      if (hindiEngineState.pendingChhotiI) {
        setHindiEngineState(prev => ({ ...prev, pendingChhotiI: false }));
      }
      // Prevent multiple consecutive spaces or leading space
      if (fullTypedText.endsWith(' ') || fullTypedText.length === 0) {
        e.preventDefault();
        return;
      }
      return;
    }

    // 3. Convert Enter to Space
    if (e.key === 'Enter') {
      e.preventDefault();
      if (hindiEngineState.pendingChhotiI) {
        setHindiEngineState(prev => ({ ...prev, pendingChhotiI: false }));
      }
      if (!fullTypedText.endsWith(' ') && fullTypedText.length > 0) {
        const newVal = fullTypedText + ' ';
        syncTypedText(newVal);
      }
      return;
    }

    // 4. In-Browser Hindi Keyboard Mapping (Vedmata m17n & Mangal Remington)
    if (
      enableVirtualHindiKeyboard &&
      (layoutMode === 'vedmata' || layoutMode === 'mangal') &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey
    ) {
      const textarea = inputRef.current;
      const cursorPos = textarea?.selectionStart ?? fullTypedText.length;

      const res = handleHindiKeyPress(
        e.key,
        fullTypedText,
        cursorPos,
        layoutMode,
        hindiEngineState
      );

      if (res.handled) {
        e.preventDefault();
        setHindiEngineState(res.newState);
        syncTypedText(res.newText);

        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.selectionEnd = res.newCursorPos;
            inputRef.current.scrollTop = inputRef.current.scrollHeight;
          }
        }, 0);
        return;
      }
    }
  };

  // Finish Test
  const handleFinishTest = () => {
    setStatus('finished');
    if (timerRef.current) clearInterval(timerRef.current);

    // Final user words from fullTypedText
    const finalWords = fullTypedText.trim().split(/\s+/).filter(w => w.length > 0);
    setUserTypedWords(finalWords);

    // Final calculations
    const timeSpentSec = Math.max(1, duration - timeLeft);
    const timeSpentMin = timeSpentSec / 60;
    const finalGrossWpm = Math.round((totalKeystrokes / 5) / timeSpentMin);
    const finalNetWpm = Math.max(0, Math.round(((totalKeystrokes / 5) - mistakesCount) / timeSpentMin));
    const finalAccuracy = totalKeystrokes > 0 
      ? Math.max(0, Math.min(100, Math.round(((totalKeystrokes - (mistakesCount * 5)) / totalKeystrokes) * 100))) 
      : 100;

    // Call onSaveResults callback
    if (onSaveResults) {
      onSaveResults(
        finalNetWpm,
        finalGrossWpm,
        finalAccuracy,
        correctKeystrokes,
        totalKeystrokes - correctKeystrokes,
        layoutMode,
        duration,
        selectedTopic.id,
        selectedTopic.title
      );
    }
  };

  // Exam Qualification Verdict Assessment
  const evaluateExamPass = () => {
    if (layoutMode === 'vedmata') {
      // CG High Court standard: 250 words in 10 mins = 25 WPM / 5000 KPH, accuracy >= 80%
      const speedPass = liveWpm >= 25;
      const accuracyPass = liveAccuracy >= 80;
      const isPass = speedPass && accuracyPass;
      return {
        isPass,
        examName: 'CG High Court AG-III / DEO / JJA',
        requiredSpeed: '25 WPM (5,000 KPH)',
        requiredAccuracy: '80%',
        marksDeduction: (mistakesCount * 0.5).toFixed(1),
        score: Math.max(0, 50 - (mistakesCount * 0.5)).toFixed(1),
        maxScore: 50,
        remarks: isPass 
          ? 'Congratulations! You meet all official CG High Court skill test speed & accuracy benchmarks.'
          : 'Speed or accuracy fell below the 25 WPM / 80% cutoff. Focus on error reduction.'
      };
    } else if (layoutMode === 'krutidev') {
      const isPass = liveWpm >= 20 && liveAccuracy >= 75;
      return {
        isPass,
        examName: 'MP CPCT / State Exam (KrutiDev 010)',
        requiredSpeed: '20 WPM',
        requiredAccuracy: '75%',
        marksDeduction: (mistakesCount * 0.5).toFixed(1),
        score: Math.max(0, 50 - (mistakesCount * 0.5)).toFixed(1),
        maxScore: 50,
        remarks: isPass 
          ? 'Qualified! Your KrutiDev 010 Hindi typing pace fulfills government exam requirements.'
          : 'Hindi KrutiDev speed needs practice. Target consistent 20+ WPM with Remington layout.'
      };
    } else {
      const isPass = liveWpm >= 30 && liveAccuracy >= 85;
      return {
        isPass,
        examName: 'General English / Skill Test',
        requiredSpeed: '30 WPM',
        requiredAccuracy: '85%',
        marksDeduction: mistakesCount.toString(),
        score: Math.max(0, 50 - mistakesCount).toFixed(1),
        maxScore: 50,
        remarks: isPass 
          ? 'Superb performance! Your speed and accuracy are well within professional guidelines.'
          : 'Practice regularly to push your net speed past 30+ WPM.'
      };
    }
  };

  const examEvaluation = evaluateExamPass();

  // Print scorecard helper
  const handlePrintScorecard = () => {
    window.print();
  };

  // Font family styles helper
  const getFontFamilyStyle = () => {
    if (layoutMode === 'krutidev') {
      return { fontFamily: 'KrutiDev010, serif', letterSpacing: '0.02em' };
    }
    if (layoutMode === 'vedmata' || layoutMode === 'mangal') {
      return { fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif" };
    }
    return { fontFamily: "'Inter', sans-serif" };
  };

  // Current active word comparison check
  const typedWordsList = fullTypedText.split(' ');
  const currentWordTyping = typedWordsList[currentWordIndex] || '';
  const currentTargetWord = targetWords[currentWordIndex] || '';
  const isCurrentInputError = currentWordTyping.length > 0 && !currentTargetWord.startsWith(currentWordTyping);

  return (
    <div className="w-full max-w-5xl mx-auto pb-10 font-sans text-text">
      <AnimatePresence mode="wait">
        
        {/* ============================================================== */}
        {/* 1. SETUP / CONFIGURATION SCREEN                                */}
        {/* ============================================================== */}
        {status === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-col gap-6"
          >
            {/* Header / Hero Banner */}
            <div className="bg-bg-s2 border border-border rounded-2xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
              <div className="flex items-center gap-3.5 z-10">
                <div className="w-12 h-12 bg-saffron-dim/25 rounded-2xl flex items-center justify-center text-saffron shrink-0 border border-saffron-border/40 shadow-inner">
                  <Keyboard className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg md:text-xl font-black text-text uppercase tracking-wide">
                      Typing Tests Arena
                    </h2>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-saffron-dim text-saffron border border-saffron-border/30">
                      High Court Ready
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Official Vedmata m17n (Ubuntu Linux), KrutiDev 010 & English Exam Simulator
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-2 z-10 w-full md:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setShowAltCodeModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-bg-s3/60 hover:bg-bg-s3 border border-border text-text-muted hover:text-text text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-saffron" />
                  <span>Alt Codes & Guide (F1)</span>
                </button>
              </div>
            </div>



            {/* Config Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Column: Candidate & Parameters */}
              <div className="md:col-span-1 bg-bg-s2 border border-border rounded-2xl p-5 flex flex-col gap-4">
                <h3 className="text-xs font-black uppercase text-text border-b border-border/60 pb-2 flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-saffron" />
                  <span>Exam Parameters</span>
                </h3>

                {/* Keyboard Layout / Font Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Keyboard / Font Layout</label>
                  <select
                    value={layoutMode}
                    onChange={(e) => setLayoutMode(e.target.value as TypingFontLayout)}
                    className="w-full px-3 py-2 text-xs bg-bg-s3/50 border border-border rounded-xl focus:border-saffron focus:outline-none text-text font-semibold"
                  >
                    <option value="vedmata">🐧 Vedmata m17n (Ubuntu Linux - CG High Court)</option>
                    <option value="krutidev">⌨️ Kruti Dev 010 (Remington Gail)</option>
                    <option value="mangal">🔤 Mangal Unicode (InScript / Devanagari)</option>
                    <option value="english">🔤 English Typing Standard</option>
                  </select>
                </div>

                {/* Duration */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Test Duration / समय</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: '1 Min', val: 60 },
                      { label: '2 Min', val: 120 },
                      { label: '5 Min', val: 300 },
                      { label: '10 Min', val: 600 },
                      { label: '15 Min', val: 900 },
                      { label: '30 Min', val: 1800 }
                    ].map(d => (
                      <button
                        key={d.val}
                        type="button"
                        onClick={() => setDuration(d.val)}
                        className={`py-1.5 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                          duration === d.val
                            ? 'bg-saffron-dim/20 border-saffron text-saffron'
                            : 'bg-bg-s3/40 border-border hover:bg-bg-s3 text-text-muted'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Difficulty / स्तर</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['easy', 'medium', 'hard'] as const).map(diff => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setDifficulty(diff)}
                        className={`py-1 text-[10px] font-black uppercase rounded-lg border transition-all cursor-pointer ${
                          difficulty === diff
                            ? 'bg-saffron-dim/20 border-saffron text-saffron'
                            : 'bg-bg-s3/40 border-border hover:bg-bg-s3 text-text-muted'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strict Exam Rules Toggles */}
                <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
                  <span className="text-[9px] font-black uppercase text-text-muted">Strict Exam Controls</span>
                  
                  {/* Backspace Toggle */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-bg-s3/30 border border-border/60">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-text">Backspace Allowed</span>
                      <span className="text-[9px] text-text-muted">Toggle off for strict exam rule</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAllowBackspace(!allowBackspace)}
                      className={`px-2.5 py-1 text-[10px] font-black rounded-md border transition-all cursor-pointer ${
                        allowBackspace 
                          ? 'bg-greenL/15 border-greenL/40 text-greenL' 
                          : 'bg-redL/15 border-redL/40 text-redL'
                      }`}
                    >
                      {allowBackspace ? 'ENABLED' : 'BLOCKED'}
                    </button>
                  </div>

                  {/* Word Highlight Toggle */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-bg-s3/30 border border-border/60">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-text">Word Highlight</span>
                      <span className="text-[9px] text-text-muted">Highlights current active word</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowHighlight(!showHighlight)}
                      className={`px-2.5 py-1 text-[10px] font-black rounded-md border transition-all cursor-pointer ${
                        showHighlight 
                          ? 'bg-saffron-dim/20 border-saffron/40 text-saffron' 
                          : 'bg-bg-s3 border-border text-text-muted'
                      }`}
                    >
                      {showHighlight ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  {/* Instant Error Alert */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-bg-s3/30 border border-border/60">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-text">Live Mistake Alert</span>
                      <span className="text-[9px] text-text-muted">Red outline on typo deviation</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInstantErrorAlert(!instantErrorAlert)}
                      className={`px-2.5 py-1 text-[10px] font-black rounded-md border transition-all cursor-pointer ${
                        instantErrorAlert 
                          ? 'bg-saffron-dim/20 border-saffron/40 text-saffron' 
                          : 'bg-bg-s3 border-border text-text-muted'
                      }`}
                    >
                      {instantErrorAlert ? 'ON' : 'OFF'}
                    </button>
                  </div>

                </div>

              </div>

              {/* Right Column: Passage & Topic Library */}
              <div className="md:col-span-2 bg-bg-s2 border border-border rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <h3 className="text-xs font-black uppercase text-text flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-saffron" />
                    <span>Select Exam Passage / अनुच्छेद चुनें</span>
                  </h3>
                  <span className="text-[9px] font-black text-text-muted uppercase">
                    {filteredTopics.length} Topics Available
                  </span>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {filteredTopics.map(topic => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-3 text-left border rounded-xl transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                        selectedTopic.id === topic.id
                          ? 'bg-saffron-dim/20 border-saffron text-saffron shadow-sm'
                          : 'bg-bg-s3/30 border-border hover:bg-bg-s3/60 text-text-muted'
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight line-clamp-2">{topic.title}</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-bg-s3 text-text-muted border border-border/60">
                          {topic.difficulty}
                        </span>
                        {topic.category && (
                          <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-saffron-dim/30 text-saffron border border-saffron-border/30">
                            {topic.category}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Preview Box */}
                <div className="mt-1 p-3.5 bg-bg-s3/30 border border-border rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">
                      Passage Preview ({layoutMode.toUpperCase()}):
                    </span>
                    {layoutMode === 'krutidev' && (
                      <span className="text-[8px] font-black text-saffron uppercase">
                        Font: Kruti Dev 010 (Remington)
                      </span>
                    )}
                  </div>
                  <p 
                    className="text-xs text-text/80 line-clamp-3 leading-relaxed"
                    style={getFontFamilyStyle()}
                  >
                    {getTopicText(selectedTopic, layoutMode)}
                  </p>
                  
                  {layoutMode === 'krutidev' && (
                    <div className="border-t border-border/40 pt-2 mt-1">
                      <span className="text-[8px] font-black uppercase text-text-muted tracking-wider">Hindi Unicode (Readable Preview):</span>
                      <p className="text-[11px] text-text-muted/80 line-clamp-1 italic mt-0.5 font-sans">
                        {selectedTopic.hindiUnicodeText}
                      </p>
                    </div>
                  )}
                </div>

                {/* Start Button */}
                <button
                  type="button"
                  onClick={handleStartTest}
                  className="w-full mt-2 py-4 bg-saffron hover:bg-orange-500 text-bg-s0 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] shadow-lg shadow-saffron-dim/30"
                >
                  <Play className="w-4 h-4 fill-bg-s0 text-bg-s0" />
                  <span>Start Live Typing Test / टेस्ट शुरू करें</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* 2. ACTIVE TEST ENGINE (DUAL-BOX TYPING WARRIORS STYLE)         */}
        {/* ============================================================== */}
        {status === 'running' && (
          <motion.div
            key="running"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-col gap-4"
          >
            {/* Top Bar: Candidate Info + Exit + Reference */}
            <div className="bg-bg-s2 border border-border rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('config')}
                  className="px-3 py-1.5 bg-bg-s3/50 hover:bg-bg-s3 border border-border hover:text-text text-text-muted rounded-xl text-[10px] font-black uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-text">{candidateName}</span>
                  <span className="text-[9px] text-text-muted font-bold">
                    {layoutMode === 'vedmata' && 'CG High Court (Vedmata m17n Linux)'}
                    {layoutMode === 'krutidev' && 'Kruti Dev 010 (Remington Gail)'}
                    {layoutMode === 'mangal' && 'Mangal InScript (Unicode)'}
                    {layoutMode === 'english' && 'English Exam Mode'}
                  </span>
                </div>
              </div>

              {/* Text Size Controls & Alt Codes Modal Trigger */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <div className="flex items-center bg-bg-s3/40 border border-border rounded-xl p-0.5">
                  <button
                    type="button"
                    onClick={() => setFontSizeLevel('sm')}
                    className={`px-2 py-1 text-[10px] font-black rounded-lg ${fontSizeLevel === 'sm' ? 'bg-saffron text-bg-s0' : 'text-text-muted'}`}
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizeLevel('md')}
                    className={`px-2 py-1 text-[10px] font-black rounded-lg ${fontSizeLevel === 'md' ? 'bg-saffron text-bg-s0' : 'text-text-muted'}`}
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizeLevel('lg')}
                    className={`px-2 py-1 text-[10px] font-black rounded-lg ${fontSizeLevel === 'lg' ? 'bg-saffron text-bg-s0' : 'text-text-muted'}`}
                  >
                    A+
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAltCodeModal(true)}
                  className="px-3 py-1.5 bg-saffron-dim/20 hover:bg-saffron-dim/40 border border-saffron-border/30 text-saffron rounded-xl text-[10px] font-black uppercase flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Codes Cheat Sheet (F1)</span>
                </button>
              </div>
            </div>

            {/* Live Metrics Cards Grid (Typing Warriors 5-Card HUD) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              
              {/* 1. Timer */}
              <div className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-colors ${
                timeLeft <= 60 
                  ? 'bg-redL/15 border-redL text-redL animate-pulse' 
                  : 'bg-bg-s2 border-saffron/40 text-saffron'
              }`}>
                <span className="text-xl font-black tabular-nums tracking-tight">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-[8px] font-black uppercase tracking-wider text-text-muted mt-0.5">Time Left</span>
              </div>

              {/* 2. Net WPM */}
              <div className="bg-bg-s2 border border-border p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-greenL tabular-nums tracking-tight">{liveWpm}</span>
                <span className="text-[8px] font-black uppercase tracking-wider text-text-muted mt-0.5">Net WPM</span>
              </div>

              {/* 3. Gross WPM */}
              <div className="bg-bg-s2 border border-border p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-text tabular-nums tracking-tight">{liveGrossWpm}</span>
                <span className="text-[8px] font-black uppercase tracking-wider text-text-muted mt-0.5">Gross WPM</span>
              </div>

              {/* 4. Accuracy */}
              <div className="bg-bg-s2 border border-border p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-purpleL tabular-nums tracking-tight">{liveAccuracy}%</span>
                <span className="text-[8px] font-black uppercase tracking-wider text-text-muted mt-0.5">Accuracy</span>
              </div>

              {/* 5. KPH (Depressions/Hour) */}
              <div className="bg-bg-s2 border border-border p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-blueL tabular-nums tracking-tight">{liveKph}</span>
                <span className="text-[8px] font-black uppercase tracking-wider text-text-muted mt-0.5">KPH (Depr.)</span>
              </div>

              {/* 6. Mistakes */}
              <div className="bg-bg-s2 border border-border p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-redL tabular-nums tracking-tight">{mistakesCount}</span>
                <span className="text-[8px] font-black uppercase tracking-wider text-text-muted mt-0.5">Mistakes</span>
              </div>

            </div>

            {/* Unicode Translation Toggle for KrutiDev */}
            {layoutMode === 'krutidev' && (
              <div className="bg-bg-s2 border border-border rounded-xl p-3 flex flex-col gap-1.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-muted flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-saffron" />
                    <span>Hindi Unicode Meaning (मददगार हिंदी अनुवाद):</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowUnicodeHelper(!showUnicodeHelper)}
                    className="text-[9px] font-black uppercase text-saffron flex items-center gap-1 cursor-pointer"
                  >
                    {showUnicodeHelper ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showUnicodeHelper ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                {showUnicodeHelper && (
                  <p className="text-xs text-text-muted/90 italic leading-relaxed">
                    {selectedTopic.hindiUnicodeText}
                  </p>
                )}
              </div>
            )}

            {/* Dual Display: 1. Reference Passage Box (Top) */}
            <div
              ref={displayContainerRef}
              className={`relative bg-bg-s2 border border-border rounded-2xl p-5 md:p-6 shadow-sm overflow-y-auto max-h-[220px] transition-all select-none leading-loose ${
                fontSizeLevel === 'sm' ? 'text-base' : fontSizeLevel === 'lg' ? 'text-2xl' : 'text-xl'
              }`}
              style={getFontFamilyStyle()}
            >
              {targetWords.map((word, index) => {
                const isActive = index === currentWordIndex;
                const isPastMistake = mistakeWordIndices.has(index);
                const isPastCorrect = index < currentWordIndex && !isPastMistake;

                let wordClassName = 'inline-block px-1 py-0.5 rounded mx-1 transition-all ';

                if (isActive) {
                  if (showHighlight) {
                    wordClassName += isCurrentInputError && instantErrorAlert
                      ? 'bg-redL/25 text-redL border-b-2 border-redL font-bold shadow-sm '
                      : 'bg-saffron-dim/40 text-saffron border-b-2 border-saffron font-bold shadow-sm ';
                  } else {
                    wordClassName += 'underline font-semibold ';
                  }
                } else if (isPastCorrect) {
                  wordClassName += 'text-greenL/80 ';
                } else if (isPastMistake) {
                  wordClassName += 'text-redL line-through opacity-85 ';
                } else {
                  wordClassName += 'text-text-muted/80 ';
                }

                return (
                  <span
                    key={index}
                    ref={isActive ? activeWordRef : null}
                    className={wordClassName}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            {/* Dual Display: 2. Interactive Typing Box (Bottom) */}
            <div className="relative flex flex-col gap-2">
              <textarea
                ref={inputRef}
                value={fullTypedText}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder={layoutMode === 'english' ? "Start typing the passage here... Press SPACE after each word to proceed." : "यहाँ से टाइप करना शुरू करें... (Type here...)"}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                rows={4}
                className={`w-full min-h-[130px] max-h-[220px] p-4 md:p-5 rounded-2xl bg-bg-s2 border-2 transition-all outline-none resize-none shadow-md overflow-y-auto ${
                  fontSizeLevel === 'sm' ? 'text-base' : fontSizeLevel === 'lg' ? 'text-2xl' : 'text-xl'
                } ${
                  shakeInput 
                    ? 'border-redL ring-2 ring-redL/30 animate-[shake_0.2s_ease-in-out]' 
                    : isCurrentInputError && instantErrorAlert
                    ? 'border-redL ring-2 ring-redL/20 text-redL' 
                    : 'border-saffron/60 focus:border-saffron ring-1 ring-saffron/20 text-text'
                }`}
                style={getFontFamilyStyle()}
              />

              {/* Typing Helper Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-text-muted font-bold flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-saffron" />
                    <span>Word {currentWordIndex + 1} of {targetWords.length}</span>
                  </span>
                  {!allowBackspace && (
                    <span className="text-[9px] font-black text-redL bg-redL/10 px-2 py-0.5 rounded-full border border-redL/30">
                      Backspace Disabled
                    </span>
                  )}
                  {backspaceCount > 0 && allowBackspace && (
                    <span className="text-[9px] text-text-muted font-bold">
                      Backspaces: {backspaceCount}
                    </span>
                  )}
                  {(layoutMode === 'vedmata' || layoutMode === 'mangal') && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEnableVirtualHindiKeyboard(!enableVirtualHindiKeyboard)}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
                          enableVirtualHindiKeyboard
                            ? 'bg-saffron-dim/30 border-saffron/50 text-saffron'
                            : 'bg-bg-s3/40 border-border text-text-muted'
                        }`}
                        title="Toggle in-browser Hindi layout translation on/off"
                      >
                        <span>⌨️ {enableVirtualHindiKeyboard ? `${layoutMode === 'vedmata' ? 'Vedmata m17n' : 'Remington'} In-Browser Active` : 'OS Direct IME'}</span>
                      </button>
                      {hindiEngineState.pendingChhotiI && (
                        <span className="bg-saffron text-bg-s0 px-1.5 py-0.5 rounded text-[8px] font-black animate-pulse">
                          ि (type consonant)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={handleStartTest}
                    className="px-3.5 py-1.5 bg-bg-s3/40 hover:bg-bg-s3 border border-border text-text-muted hover:text-text rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Restart</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleFinishTest}
                    className="px-4 py-1.5 bg-greenL hover:bg-emerald-600 text-bg-s0 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-greenL/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Submit Test</span>
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* ============================================================== */}
        {/* 3. TEST RESULT & OFFICIAL SCORECARD SCREEN                     */}
        {/* ============================================================== */}
        {status === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="flex flex-col gap-6"
          >
            {/* Printable Scorecard Container */}
            <div className="typing-scorecard-print bg-bg-s2 border border-border rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6 relative overflow-hidden">
              
              {/* Watermark / Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-dim/15 rounded-full blur-3xl pointer-events-none no-print" />

              {/* Scorecard Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-5 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-saffron-dim/20 border border-saffron-border/40 flex items-center justify-center text-saffron shrink-0">
                    <Scale className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-saffron tracking-widest leading-none">
                      Official Skill Test Assessment
                    </span>
                    <h3 className="text-xl font-black text-text mt-1 leading-tight">
                      {examEvaluation.examName}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Candidate: <span className="font-bold text-text">{candidateName}</span> &nbsp;|&nbsp; Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Scorecard Action Buttons */}
                <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end no-print">
                  <button
                    type="button"
                    onClick={handlePrintScorecard}
                    className="px-3.5 py-2.5 bg-bg-s3/60 hover:bg-bg-s3 border border-border rounded-xl text-xs font-black uppercase text-text flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-saffron" />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleStartTest}
                    className="px-4 py-2.5 bg-saffron hover:bg-orange-500 text-bg-s0 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-saffron-dim"
                  >
                    <RefreshCw className="w-4 h-4 fill-bg-s0" />
                    <span>Retake Test</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('config')}
                    className="px-3.5 py-2.5 bg-bg-s3/40 hover:bg-bg-s3 border border-border rounded-xl text-xs font-black uppercase text-text-muted hover:text-text transition-colors cursor-pointer"
                  >
                    <span>New Setup</span>
                  </button>
                </div>
              </div>

              {/* Qualification Stamp / Verdict Banner */}
              <div className={`p-4 md:p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
                examEvaluation.isPass 
                  ? 'bg-greenL/10 border-greenL/40 text-greenL' 
                  : 'bg-redL/10 border-redL/40 text-redL'
              }`}>
                <div className="flex items-center gap-3 text-center md:text-left">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    examEvaluation.isPass ? 'bg-greenL/20 text-greenL' : 'bg-redL/20 text-redL'
                  }`}>
                    {examEvaluation.isPass ? <Award className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider">
                      {examEvaluation.isPass ? 'QUALIFIED FOR SKILL TEST' : 'NEEDS SPEED & ACCURACY IMPROVEMENT'}
                    </span>
                    <p className="text-xs text-text-muted mt-0.5 max-w-xl">
                      {examEvaluation.remarks}
                    </p>
                  </div>
                </div>

                {/* Score / Mark summary */}
                <div className="flex items-center gap-4 bg-bg-s0/40 px-4 py-2.5 rounded-xl border border-border/40 shrink-0">
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] font-black uppercase text-text-muted">High Court Score</span>
                    <span className="text-base font-black text-text">
                      {examEvaluation.score} / {examEvaluation.maxScore}
                    </span>
                  </div>
                  <div className="h-7 w-px bg-border/60" />
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] font-black uppercase text-text-muted">Deductions</span>
                    <span className="text-base font-black text-redL">
                      -{examEvaluation.marksDeduction}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                
                {/* 1. Net Speed */}
                <div className="bg-bg-s3/30 border border-border rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-text-muted">Net Speed (WPM)</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black text-greenL tabular-nums">{liveWpm}</span>
                    <span className="text-[10px] font-bold text-text-muted">WPM</span>
                  </div>
                  <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">
                    Req: {examEvaluation.requiredSpeed}
                  </span>
                </div>

                {/* 2. Gross Speed */}
                <div className="bg-bg-s3/30 border border-border rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-text-muted">Gross Speed</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black text-text tabular-nums">{liveGrossWpm}</span>
                    <span className="text-[10px] font-bold text-text-muted">WPM</span>
                  </div>
                  <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">
                    Raw typing speed
                  </span>
                </div>

                {/* 3. Accuracy */}
                <div className="bg-bg-s3/30 border border-border rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-text-muted">Accuracy Rate</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black text-purpleL tabular-nums">{liveAccuracy}%</span>
                  </div>
                  <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">
                    Req: {examEvaluation.requiredAccuracy}
                  </span>
                </div>

                {/* 4. KPH (Depressions/Hour) */}
                <div className="bg-bg-s3/30 border border-border rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-text-muted">Depressions (KPH)</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black text-blueL tabular-nums">{liveKph}</span>
                    <span className="text-[10px] font-bold text-text-muted">KPH</span>
                  </div>
                  <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">
                    Key depressions / hour
                  </span>
                </div>

                {/* 5. Total Strokes */}
                <div className="bg-bg-s3/30 border border-border rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-text-muted">Total Keystrokes</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-black text-text tabular-nums">{totalKeystrokes}</span>
                    <span className="text-[10px] font-bold text-greenL">({correctKeystrokes} correct)</span>
                  </div>
                  <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">
                    Backspaces: {backspaceCount}
                  </span>
                </div>

                {/* 6. Mistakes Count */}
                <div className="bg-bg-s3/30 border border-border rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-text-muted">Total Mistakes</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-black text-redL tabular-nums">{mistakesCount}</span>
                    <span className="text-[10px] font-bold text-text-muted">words</span>
                  </div>
                  <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">
                    Error rate: {targetWords.length > 0 ? ((mistakesCount / targetWords.length) * 100).toFixed(1) : 0}%
                  </span>
                </div>

                {/* 7. Words Count */}
                <div className="bg-bg-s3/30 border border-border rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-text-muted">Words Progress</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-black text-text tabular-nums">{userTypedWords.length}</span>
                    <span className="text-[10px] font-bold text-text-muted">/ {targetWords.length}</span>
                  </div>
                  <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">
                    Passage completion
                  </span>
                </div>

                {/* 8. Duration Elapsed */}
                <div className="bg-bg-s3/30 border border-border rounded-2xl p-4 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-text-muted">Time Elapsed</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-black text-text tabular-nums">
                      {Math.floor((duration - timeLeft) / 60)}:{( (duration - timeLeft) % 60 ).toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-text-muted">mins</span>
                  </div>
                  <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">
                    Configured: {Math.floor(duration / 60)} mins
                  </span>
                </div>

              </div>

              {/* Word-by-Word Interactive Error Audit (Typing Warriors Style) */}
              <div className="flex flex-col gap-3 pt-3 border-t border-border">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-saffron" />
                    <span className="text-xs font-black uppercase text-text">Word-by-Word Passage Audit</span>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 no-print">
                    <button
                      type="button"
                      onClick={() => setReviewFilter('all')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors ${
                        reviewFilter === 'all' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted'
                      }`}
                    >
                      All ({targetWords.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewFilter('mistakes')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors ${
                        reviewFilter === 'mistakes' ? 'bg-redL text-white' : 'bg-bg-s3/40 text-text-muted'
                      }`}
                    >
                      Mistakes ({mistakesCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewFilter('correct')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors ${
                        reviewFilter === 'correct' ? 'bg-greenL text-bg-s0' : 'bg-bg-s3/40 text-text-muted'
                      }`}
                    >
                      Correct ({userTypedWords.length - mistakesCount})
                    </button>
                  </div>
                </div>

                {/* Interactive Word Audit Box */}
                <div 
                  className="p-4 rounded-2xl bg-bg-s3/20 border border-border max-h-[260px] overflow-y-auto leading-relaxed flex flex-wrap gap-1.5"
                  style={getFontFamilyStyle()}
                >
                  {targetWords.map((targetWord, idx) => {
                    const typed = userTypedWords[idx];
                    const isMistake = mistakeWordIndices.has(idx);
                    const isTyped = typed !== undefined;
                    const isCorrect = isTyped && !isMistake;

                    if (reviewFilter === 'mistakes' && !isMistake) return null;
                    if (reviewFilter === 'correct' && !isCorrect) return null;

                    if (isMistake) {
                      return (
                        <span
                          key={idx}
                          className="inline-flex flex-col items-center bg-redL/15 border border-redL/40 px-2 py-0.5 rounded text-xs text-redL font-bold"
                          title={`Target: "${targetWord}" | Typed: "${typed || ''}"`}
                        >
                          <span className="line-through opacity-70">{typed || '∅'}</span>
                          <span className="text-[10px] text-text font-normal">[{targetWord}]</span>
                        </span>
                      );
                    }

                    if (isCorrect) {
                      return (
                        <span
                          key={idx}
                          className="inline-block bg-greenL/15 border border-greenL/30 px-1.5 py-0.5 rounded text-xs text-greenL font-medium"
                        >
                          {targetWord}
                        </span>
                      );
                    }

                    return (
                      <span
                        key={idx}
                        className="inline-block px-1.5 py-0.5 text-xs text-text-muted/40 italic"
                      >
                        {targetWord}
                      </span>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ============================================================== */}
      {/* 4. MODAL: KRUTIDEV ALT CODES & EXAM GUIDELINES (F1 TRIGGERED)  */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showAltCodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-s0/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-bg-s2 border border-border rounded-3xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-border flex items-center justify-between bg-bg-s3/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-saffron-dim/25 border border-saffron-border/40 flex items-center justify-center text-saffron">
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-black text-text uppercase">
                      Hindi Typing Codebook (F1 Shortcut)
                    </h3>
                    <p className="text-[10px] text-text-muted">
                      Official Reference for KrutiDev 010 (Alt Codes) & CG High Court Vedmata m17n
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAltCodeModal(false)}
                  className="p-1.5 rounded-xl hover:bg-bg-s3 text-text-muted hover:text-text cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Layout Switcher Tabs */}
              <div className="px-5 pt-3 pb-2 border-b border-border/60 bg-bg-s2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 bg-bg-s3/50 p-1 rounded-xl border border-border">
                  <button
                    type="button"
                    onClick={() => { setAltCodeModalTab('krutidev'); setAltCodeCategory('all'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      altCodeModalTab === 'krutidev'
                        ? 'bg-saffron text-bg-s0 shadow-sm'
                        : 'text-text-muted hover:text-text'
                    }`}
                  >
                    <span>KrutiDev 010 (Alt Codes)</span>
                    <span className="text-[9px] opacity-80">({KRUTIDEV_ALT_CODES.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAltCodeModalTab('vedmata'); setAltCodeCategory('all'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      altCodeModalTab === 'vedmata'
                        ? 'bg-saffron text-bg-s0 shadow-sm'
                        : 'text-text-muted hover:text-text'
                    }`}
                  >
                    <span>Vedmata m17n Linux</span>
                    <span className="text-[9px] opacity-80">({VEDMATA_CODES.length})</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[220px] flex-1 sm:flex-initial">
                  <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={altCodeSearch}
                    onChange={(e) => setAltCodeSearch(e.target.value)}
                    placeholder={altCodeModalTab === 'krutidev' ? "Search code (0216, क्र, द्ध)..." : "Search key (Shift+J, श्र, त्र)..."}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-bg-s3/50 border border-border rounded-xl focus:border-saffron focus:outline-none text-text"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="px-5 py-2 border-b border-border/40 bg-bg-s3/10 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                <span className="text-[10px] font-bold text-text-muted uppercase shrink-0 mr-1">Category:</span>
                <button
                  type="button"
                  onClick={() => setAltCodeCategory('all')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                    altCodeCategory === 'all' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                  }`}
                >
                  All
                </button>
                {altCodeModalTab === 'krutidev' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setAltCodeCategory('conjunct')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                        altCodeCategory === 'conjunct' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                      }`}
                    >
                      संयुक्त अक्षर (द्व, द्ध, क्र...)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAltCodeCategory('half')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                        altCodeCategory === 'half' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                      }`}
                    >
                      आधे अक्षर (च्, फ्, ध्...)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAltCodeCategory('matra')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                        altCodeCategory === 'matra' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                      }`}
                    >
                      मात्राएं / स्वर (ऋ, र्, ॅ)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAltCodeCategory('symbol')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                        altCodeCategory === 'symbol' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                      }`}
                    >
                      विराम व कोष्ठक ((, ), :, “)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAltCodeCategory('number')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                        altCodeCategory === 'number' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                      }`}
                    >
                      हिंदी अंक (१, २, ३...)
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setAltCodeCategory('special')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                        altCodeCategory === 'special' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                      }`}
                    >
                      विशेष संयुक्त (त्र, क्ष, श्र, ज्ञ, द्घ, द्व...)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAltCodeCategory('matra')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                        altCodeCategory === 'matra' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                      }`}
                    >
                      मात्राएं व स्वर (ि, ी, ु, ू, े, ै, ो, ौ)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAltCodeCategory('consonant')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                        altCodeCategory === 'consonant' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                      }`}
                    >
                      व्यंजन व आधे वर्ण (क्, ख्, च्...)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAltCodeCategory('number')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors shrink-0 cursor-pointer ${
                        altCodeCategory === 'number' ? 'bg-saffron text-bg-s0' : 'bg-bg-s3/40 text-text-muted hover:text-text'
                      }`}
                    >
                      हिंदी अंक (१, २, ३...)
                    </button>
                  </>
                )}
              </div>

              {/* Codes Grid / List */}
              <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-4">
                {altCodeModalTab === 'krutidev' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {KRUTIDEV_ALT_CODES.filter(item => {
                      const matchesCategory = altCodeCategory === 'all' || item.category === altCodeCategory;
                      const q = altCodeSearch.toLowerCase().trim();
                      const matchesSearch = !q || 
                        item.code.toLowerCase().includes(q) ||
                        item.symbol.includes(q) ||
                        item.charName.toLowerCase().includes(q) ||
                        item.example.toLowerCase().includes(q);
                      return matchesCategory && matchesSearch;
                    }).map((item, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-bg-s3/30 hover:bg-bg-s3/50 border border-border/70 flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className="text-2xl font-black text-saffron w-10 text-center shrink-0"
                            style={{ fontFamily: 'KrutiDev010, serif' }}
                          >
                            {item.symbol}
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[11px] font-mono font-black text-text bg-bg-s0/70 px-2 py-0.5 rounded border border-border/50 self-start">
                              {item.code}
                            </span>
                            <span className="text-[10px] font-bold text-text mt-1 truncate">
                              {item.charName}
                            </span>
                            <span className="text-[9px] text-text-muted mt-0.5 truncate">
                              उदा: {item.example}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {VEDMATA_CODES.filter(item => {
                      const matchesCategory = altCodeCategory === 'all' || item.category === altCodeCategory;
                      const q = altCodeSearch.toLowerCase().trim();
                      const matchesSearch = !q || 
                        item.key.toLowerCase().includes(q) ||
                        item.hindiChar.includes(q) ||
                        item.charType.toLowerCase().includes(q) ||
                        item.example.toLowerCase().includes(q);
                      return matchesCategory && matchesSearch;
                    }).map((item, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-bg-s3/30 hover:bg-bg-s3/50 border border-border/70 flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className="text-2xl font-black text-saffron w-10 text-center shrink-0"
                            style={{ fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif" }}
                          >
                            {item.hindiChar}
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[11px] font-mono font-black text-text bg-bg-s0/70 px-2 py-0.5 rounded border border-border/50 self-start">
                              {item.key}
                            </span>
                            <span className="text-[10px] font-bold text-text mt-1 truncate">
                              {item.charType}
                            </span>
                            <span className="text-[9px] text-text-muted mt-0.5 truncate">
                              उदा: {item.example}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Practical Notes & Guidelines */}
                <div className="p-4 rounded-2xl bg-saffron-dim/15 border border-saffron-border/40 flex flex-col gap-1.5 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-saffron uppercase flex items-center gap-1.5">
                      <Scale className="w-4 h-4" />
                      <span>
                        {altCodeModalTab === 'krutidev' 
                          ? 'KrutiDev 010 (Remington Gail) Exam Rules' 
                          : 'CG High Court (Ubuntu Linux Vedmata m17n) Rules'}
                      </span>
                    </span>
                    <span className="text-[9px] font-mono font-bold text-text-muted">Press F1 anytime to toggle</span>
                  </div>
                  {altCodeModalTab === 'krutidev' ? (
                    <ul className="text-[11px] text-text-muted leading-relaxed list-disc list-inside flex flex-col gap-1 mt-1">
                      <li><strong>Alt Code Usage:</strong> NumPad ऑन करके <code>Alt</code> की दबाकर रखें और 4 अंकों का कोड टाइप करें।</li>
                      <li><strong>CPCT & State Exams:</strong> MP CPCT, Rajasthan High Court, UPSSSC और CG व्यापम में KrutiDev 010 / Remington अनिवार्य होता है।</li>
                      <li><strong>छोटा ब्रैकेट & कोष्ठक:</strong> Alt+0188 से <code>(</code> और Alt+0189 से <code>)</code> बनता है।</li>
                    </ul>
                  ) : (
                    <ul className="text-[11px] text-text-muted leading-relaxed list-disc list-inside flex flex-col gap-1 mt-1">
                      <li><strong>CG High Court OS:</strong> छत्तीसगढ़ उच्च न्यायालय (बिलासपुर) सहायक ग्रेड-3 एवं डाटा एंट्री ऑपरेटर परीक्षा Ubuntu Linux पर Vedmata m17n में होती है।</li>
                      <li><strong>छोटी इ (ि) का नियम:</strong> Vedmata में <code>f</code> की पहले दबाएं, फिर वह वर्ण दबाएं जिस पर मात्रा लगानी है (जैसे <code>f + n = दि</code>)।</li>
                      <li><strong>आधा अक्षर बनाना:</strong> पहले पूरा वर्ण दबाएं, फिर हलंत के लिए <code>`</code> (Tilde key) दबाएं या सीधे <code>Shift</code> के साथ वर्ण दबाएं।</li>
                    </ul>
                  )}
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border bg-bg-s3/20 flex items-center justify-between">
                <span className="text-[10px] text-text-muted">
                  Showing {altCodeModalTab === 'krutidev' ? KRUTIDEV_ALT_CODES.length : VEDMATA_CODES.length} verified typing codes
                </span>
                <button
                  type="button"
                  onClick={() => setShowAltCodeModal(false)}
                  className="px-5 py-2 bg-saffron hover:bg-orange-500 text-bg-s0 rounded-xl text-xs font-black uppercase cursor-pointer"
                >
                  Close Reference (Esc / F1)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
