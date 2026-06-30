import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Keyboard, 
  Clock, 
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
  EyeOff
} from 'lucide-react';

export interface Topic {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  englishText: string;
  hindiUnicodeText: string;
  hindiKrutidevText: string;
}

export const TYPING_TOPICS: Topic[] = [
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

export const TypingTest: React.FC<TypingTestProps> = ({ currentUser: _currentUser, onSaveResults }) => {
  // Config States
  const [language, setLanguage] = useState<'english' | 'krutidev'>('english');
  const [duration, setDuration] = useState<number>(60); // seconds
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [allowBackspace, setAllowBackspace] = useState<boolean>(true);
  
  // Custom Topics State
  const [topics, setTopics] = useState<Topic[]>(TYPING_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(TYPING_TOPICS[0]);

  // Load custom topics from Firestore on mount
  useEffect(() => {
    const fetchCustomTopics = async () => {
      const firebase = (window as any).firebase;
      if (!firebase) {
        return;
      }
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
            hindiKrutidevText: data.hindiKrutidevText || ''
          });
        });
        if (loaded.length > 0) {
          // Sort topics so they are consistently ordered
          loaded.sort((a: Topic, b: Topic) => a.title.localeCompare(b.title));
          setTopics(loaded);
        } else {
          setTopics(TYPING_TOPICS);
        }
      } catch (err) {
        console.warn('Failed to fetch custom typing topics from Firestore:', err);
        setTopics(TYPING_TOPICS);
      }
    };

    fetchCustomTopics();
  }, []);

  // Update selected topic if topics change
  useEffect(() => {
    if (topics.length > 0) {
      const match = topics.find(t => t.id === selectedTopic.id) || topics[0];
      setSelectedTopic(match);
    }
  }, [topics]);

  // Test Runner States
  const [status, setStatus] = useState<'config' | 'running' | 'finished'>('config');
  const [targetText, setTargetText] = useState<string>('');
  const [typedText, setTypedText] = useState<string>('');
  
  // Stats
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [grossWpm, setGrossWpm] = useState<number>(0);
  const [netWpm, setNetWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [incorrectChars, setIncorrectChars] = useState<number>(0);
  
  // UX Helper States
  const [showUnicodePreview, setShowUnicodePreview] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Filter topics based on selected difficulty
  const filteredTopics = topics.filter(t => t.difficulty === difficulty);

  // Update selected topic if difficulty changes and current topic is not in filtered list
  useEffect(() => {
    if (filteredTopics.length > 0 && !filteredTopics.some(t => t.id === selectedTopic.id)) {
      setSelectedTopic(filteredTopics[0]);
    }
  }, [difficulty, topics]);

  // Set target text based on configuration
  const setupTestText = () => {
    if (language === 'english') {
      setTargetText(selectedTopic.englishText);
    } else {
      setTargetText(selectedTopic.hindiKrutidevText);
    }
  };

  useEffect(() => {
    setupTestText();
  }, [language, selectedTopic]);

  // Start typing test handler
  const handleStartTest = () => {
    setupTestText();
    setTypedText('');
    setTimeLeft(duration);
    setGrossWpm(0);
    setNetWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setIncorrectChars(0);
    setStatus('running');

    // Focus input area
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // Timer Effect
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  // Calculations Effect
  useEffect(() => {
    if (status !== 'running' || typedText.length === 0) return;

    const timeSpentSec = duration - timeLeft;
    const timeSpentMin = timeSpentSec > 0 ? timeSpentSec / 60 : 1 / 60; // avoid divide by zero

    let correct = 0;
    let incorrect = 0;

    // Compare characters
    for (let i = 0; i < typedText.length; i++) {
      if (i < targetText.length) {
        if (typedText[i] === targetText[i]) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        incorrect++;
      }
    }

    setCorrectChars(correct);
    setIncorrectChars(incorrect);

    // Accuracy
    const totalTyped = typedText.length;
    const currentAccuracy = totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 100;
    setAccuracy(currentAccuracy);

    // WPM
    // Standard WPM: (Total typed chars / 5) / minutes
    const gross = Math.round((totalTyped / 5) / timeSpentMin);
    const net = Math.round((correct / 5) / timeSpentMin);
    
    setGrossWpm(gross);
    setNetWpm(net < 0 ? 0 : net);

    // Auto-finish if text is fully completed
    if (typedText.length >= targetText.length) {
      handleFinishTest();
    }
  }, [typedText, timeLeft, status, targetText, duration]);

  const handleFinishTest = () => {
    setStatus('finished');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Trigger onSaveResults once test is finished and final state values are set
  useEffect(() => {
    if (status === 'finished') {
      if (onSaveResults) {
        onSaveResults(
          netWpm,
          grossWpm,
          accuracy,
          correctChars,
          incorrectChars,
          language,
          duration,
          selectedTopic.id,
          selectedTopic.title
        );
      }
    }
  }, [status]);

  const handleBackToConfig = () => {
    setStatus('config');
    setTypedText('');
  };

  // Focus utility
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Helper to get speed evaluation feedback
  const getSpeedFeedback = (wpm: number) => {
    if (language === 'english') {
      if (wpm >= 60) return { title: 'Typing Wizard! ⚡', desc: 'Outstanding speed and control! Keep up the brilliant work.' };
      if (wpm >= 40) return { title: 'Professional Keyboardist! 🚀', desc: 'Very good typing speed! You are above average.' };
      if (wpm >= 25) return { title: 'Competent Typer! 👍', desc: 'Good typing pace. Regular practice will make you even faster.' };
      return { title: 'Developing Speed! 🌱', desc: 'Take your time. Focus on accuracy first, speed will naturally follow!' };
    } else {
      // Krutidev standards are usually slightly lower due to complexity
      if (wpm >= 45) return { title: 'Remington Maestro! ⚡', desc: 'Incredible Krutidev speed! Your muscle memory is top-tier.' };
      if (wpm >= 30) return { title: 'Advanced Clerk! 🚀', desc: 'Excellent speed for state government typing standards.' };
      if (wpm >= 20) return { title: 'Eligible Candidate! 👍', desc: 'Satisfactory typing speed. Great for standard exams.' };
      return { title: 'Beginner Hindi Typist! 🌱', desc: 'Krutidev takes time to master. Keep practicing characters regularly.' };
    }
  };

  const feedback = getSpeedFeedback(netWpm);

  return (
    <div className="w-full max-w-4xl mx-auto pb-6 font-sans text-text">
      <AnimatePresence mode="wait">
        
        {/* ============================================================== */}
        {/* 1. SETUP / CONFIG SCREEN                                       */}
        {/* ============================================================== */}
        {status === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            {/* Setup Card Header */}
            <div className="bg-bg-s2 border border-border rounded-xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-saffron-dim/20 rounded-xl flex items-center justify-center text-saffron shrink-0 border border-saffron-border/30">
                  <Keyboard className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-black text-text uppercase tracking-wide">Typing Speed Test</h3>
                  <p className="text-xs text-text-muted">Test and improve your typing speed & accuracy in English or Hindi (Krutidev)</p>
                </div>
              </div>
            </div>

            {/* Config Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Column - Setup Form */}
              <div className="md:col-span-1 bg-bg-s2 border border-border rounded-xl p-5 flex flex-col gap-4.5">
                <h4 className="text-xs font-black uppercase text-text border-b border-border/60 pb-2 flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-saffron" />
                  <span>Test Parameters</span>
                </h4>

                {/* 1. Language Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Layout Language / भाषा</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLanguage('english')}
                      className={`py-2 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                        language === 'english'
                          ? 'bg-saffron-dim/20 border-saffron text-saffron'
                          : 'bg-bg-s3/40 border-border hover:bg-bg-s3/70 text-text-muted'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('krutidev')}
                      className={`py-2 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                        language === 'krutidev'
                          ? 'bg-saffron-dim/20 border-saffron text-saffron'
                          : 'bg-bg-s3/40 border-border hover:bg-bg-s3/70 text-text-muted'
                      }`}
                    >
                      कृत्तिदेव 010
                    </button>
                  </div>
                </div>

                {/* 2. Duration Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Test Duration / समय</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { label: '1 Min', val: 60 },
                      { label: '2 Min', val: 120 },
                      { label: '5 Min', val: 300 },
                      { label: '10 Min', val: 600 }
                    ].map(d => (
                      <button
                        key={d.val}
                        type="button"
                        onClick={() => setDuration(d.val)}
                        className={`py-1.5 text-[10px] font-black rounded-md border transition-all cursor-pointer ${
                          duration === d.val
                            ? 'bg-saffron-dim/20 border-saffron text-saffron'
                            : 'bg-bg-s3/40 border-border hover:bg-bg-s3/70 text-text-muted'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Difficulty Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Difficulty / कठिनाई स्तर</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['easy', 'medium', 'hard'] as const).map(diff => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setDifficulty(diff)}
                        className={`py-1.5 text-[10px] font-black rounded-md border uppercase transition-all cursor-pointer ${
                          difficulty === diff
                            ? 'bg-saffron-dim/20 border-saffron text-saffron'
                            : 'bg-bg-s3/40 border-border hover:bg-bg-s3/70 text-text-muted'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Backspace Setting */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Backspace / बैकस्पेस</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAllowBackspace(true)}
                      className={`py-1.5 text-[10px] font-black rounded-md border transition-all cursor-pointer ${
                        allowBackspace
                          ? 'bg-saffron-dim/20 border-saffron text-saffron'
                          : 'bg-bg-s3/40 border-border hover:bg-bg-s3/70 text-text-muted'
                      }`}
                    >
                      ON (Allowed)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllowBackspace(false)}
                      className={`py-1.5 text-[10px] font-black rounded-md border transition-all cursor-pointer ${
                        !allowBackspace
                          ? 'bg-saffron-dim/20 border-saffron text-saffron'
                          : 'bg-bg-s3/40 border-border hover:bg-bg-s3/70 text-text-muted'
                      }`}
                    >
                      OFF (Blocked)
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Topic Selection */}
              <div className="md:col-span-2 bg-bg-s2 border border-border rounded-xl p-5 flex flex-col gap-4">
                <h4 className="text-xs font-black uppercase text-text border-b border-border/60 pb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-saffron" />
                  <span>Choose Practice Topic</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                  {filteredTopics.map(topic => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-3 text-left border rounded-xl transition-all cursor-pointer flex flex-col gap-1 ${
                        selectedTopic.id === topic.id
                          ? 'bg-saffron-dim/15 border-saffron/80 text-saffron shadow-sm'
                          : 'bg-bg-s3/30 border-border hover:border-border/80 hover:bg-bg-s3/60 text-text-muted'
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight line-clamp-1">{topic.title}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-bg-s3 self-start border border-border/60 mt-1">
                        {topic.difficulty}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Preview Box */}
                <div className="mt-2 p-3 bg-bg-s3/40 border border-border/80 rounded-lg flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase text-text-muted tracking-wider">Preview Text:</span>
                  <p 
                    className="text-xs text-text/80 line-clamp-2 leading-relaxed"
                    style={language === 'krutidev' ? { fontFamily: 'KrutiDev010', fontSize: '1.15rem', lineHeight: '1.5' } : undefined}
                  >
                    {language === 'krutidev' ? selectedTopic.hindiKrutidevText : selectedTopic.englishText}
                  </p>
                  
                  {language === 'krutidev' && (
                    <div className="border-t border-border/30 pt-1.5 mt-0.5">
                      <span className="text-[8px] font-black uppercase text-text-muted tracking-wider">Hindi Unicode (Readable Preview):</span>
                      <p className="text-[11px] text-text-muted/80 line-clamp-1 italic mt-0.5">{selectedTopic.hindiUnicodeText}</p>
                    </div>
                  )}
                </div>

                {/* Big Start Button */}
                <button
                  type="button"
                  onClick={handleStartTest}
                  className="w-full mt-2 py-3.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] shadow shadow-saffron-dim/20"
                >
                  <Play className="w-4 h-4 fill-bg-s1 text-bg-s1" />
                  <span>Start Typing Test</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* 2. ACTIVE TYPING TEST SCREEN                                   */}
        {/* ============================================================== */}
        {status === 'running' && (
          <motion.div
            key="running"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-5"
          >
            {/* Active Test Header (Live Stats Panel) */}
            <div className="bg-bg-s2 border border-border rounded-xl p-4 flex items-center justify-between shadow-sm">
              <button
                type="button"
                onClick={handleBackToConfig}
                className="px-3 py-2 bg-bg-s3/40 border border-border hover:bg-bg-s3/80 hover:text-text text-text-muted rounded-lg text-[10px] font-black uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Exit Test</span>
              </button>

              <div className="flex items-center gap-6 md:gap-10 shrink-0">
                {/* Stat 1: Time Left */}
                <div className="flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-saffron shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-text-muted uppercase leading-tight">Time Left</span>
                    <span className={`text-base font-black tabular-nums leading-tight ${timeLeft <= 10 ? 'text-redL animate-pulse' : 'text-text'}`}>
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Stat 2: Real-time WPM */}
                <div className="flex items-center gap-2">
                  <Activity className="w-4.5 h-4.5 text-greenL shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-text-muted uppercase leading-tight">Net WPM</span>
                    <span className="text-base font-black text-greenL leading-tight">{netWpm}</span>
                  </div>
                </div>

                {/* Stat 3: Accuracy */}
                <div className="flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-purpleL shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-text-muted uppercase leading-tight">Accuracy</span>
                    <span className="text-base font-black text-purpleL leading-tight">{accuracy}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Unicode Preview Toggle for Hindi */}
            {language === 'krutidev' && (
              <div className="bg-bg-s2 border border-border rounded-xl overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setShowUnicodePreview(!showUnicodePreview)}
                  className="w-full px-4 py-3 bg-bg-s3/20 border-b border-border/40 hover:bg-bg-s3/40 transition-colors flex justify-between items-center text-xs font-bold text-text-muted cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-saffron" />
                    <span>Hindi Unicode Translation (मददगार अनुवाद)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    {showUnicodePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span className="text-[9px] font-black uppercase">{showUnicodePreview ? 'Hide' : 'Show'}</span>
                  </span>
                </button>
                <AnimatePresence>
                  {showUnicodePreview && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-4 text-xs md:text-sm text-text-muted/90 bg-bg-s2 leading-relaxed">
                        {selectedTopic.hindiUnicodeText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Target & Typing Area */}
            <div 
              onClick={handleContainerClick}
              className={`bg-bg-s2 border rounded-xl p-5 md:p-6 shadow-sm flex flex-col gap-6 cursor-text transition-all min-h-[240px] relative ${
                isFocused ? 'border-saffron/40 ring-1 ring-saffron/15 bg-bg-s2/95' : 'border-border'
              }`}
            >
              {/* Unfocused overlay */}
              {!isFocused && (
                <div className="absolute inset-0 bg-bg-s2/65 backdrop-blur-[1.5px] rounded-xl flex items-center justify-center z-10 transition-all">
                  <div className="px-4 py-2 bg-bg-s0/90 border border-saffron-border/30 rounded-lg text-[10px] font-black text-saffron uppercase tracking-widest flex items-center gap-2 shadow animate-bounce">
                    <Keyboard className="w-3.5 h-3.5 text-saffron" />
                    <span>Click here to type / टाइप करने के लिए क्लिक करें</span>
                  </div>
                </div>
              )}

              {/* Text rendering block */}
              <div 
                ref={textContainerRef}
                className="text-sm md:text-base leading-relaxed tracking-wide select-none"
                style={language === 'krutidev' ? { fontFamily: 'KrutiDev010', fontSize: '1.35rem', lineHeight: '1.6', letterSpacing: '0.01em' } : undefined}
              >
                {targetText.split('').map((char, index) => {
                  let charClass = '';
                  
                  if (index < typedText.length) {
                    if (typedText[index] === char) {
                      charClass = 'text-greenL font-semibold';
                    } else {
                      // Mark incorrect with red and underline
                      charClass = 'text-redL border-b-2 border-redL bg-red-500/10 font-bold';
                    }
                  } else if (index === typedText.length) {
                    charClass = 'bg-saffron/30 text-saffron font-semibold border-l-2 border-saffron/90 animate-[pulse_1s_infinite]';
                  } else {
                    charClass = 'text-text-muted/65';
                  }

                  return (
                    <span key={index} className={`transition-all duration-75 ${charClass}`}>
                      {char}
                    </span>
                  );
                })}
              </div>

              {/* Hidden text area to capture keys */}
              <textarea
                ref={inputRef}
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                onKeyDown={(e) => {
                  if (!allowBackspace && (e.key === 'Backspace' || e.key === 'Delete')) {
                    e.preventDefault();
                  }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute w-1 h-1 opacity-0 pointer-events-none select-none outline-none"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
            </div>

            {/* Footer tips */}
            <div className="flex justify-between items-center px-2">
              <span className="text-[9px] text-text-muted flex items-center gap-1 font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-saffron/80" />
                <span>Tip: The test will complete automatically when you finish typing the paragraph.</span>
              </span>
              <button
                type="button"
                onClick={handleStartTest}
                className="px-3 py-1.5 hover:text-saffron text-text-muted rounded text-[10px] font-black uppercase flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restart</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* 3. TEST RESULTS SCREEN                                         */}
        {/* ============================================================== */}
        {status === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex flex-col gap-6"
          >
            {/* Header Result card */}
            <div className="bg-bg-s2 border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />

              {/* Badge/Cup Icon */}
              <div className="w-20 h-20 bg-saffron-dim/20 rounded-2xl border border-saffron-border/30 flex items-center justify-center text-saffron shrink-0 shadow-inner">
                <Award className="w-10 h-10 animate-bounce" />
              </div>

              {/* Message */}
              <div className="flex-1 flex flex-col gap-1 text-center md:text-left">
                <span className="text-[9px] font-black uppercase text-saffron tracking-widest leading-none">Typing Performance</span>
                <h3 className="text-lg font-black text-text mt-1 leading-tight">{feedback.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed mt-0.5">{feedback.desc}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleStartTest}
                  className="px-4 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow shadow-saffron-dim"
                >
                  <RefreshCw className="w-3.5 h-3.5 fill-bg-s1" />
                  <span>Retry Test</span>
                </button>
                <button
                  type="button"
                  onClick={handleBackToConfig}
                  className="px-4 py-3 bg-bg-s3/40 border border-border hover:bg-bg-s3 hover:text-text text-text-muted text-xs font-black uppercase rounded-lg transition-colors cursor-pointer"
                >
                  <span>New Setup</span>
                </button>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Stat Card 1: Net WPM */}
              <div className="bg-bg-s2 border border-border rounded-xl p-4 flex flex-col justify-between min-h-[96px]">
                <span className="text-[9px] font-black uppercase text-text-muted leading-none">Net Speed</span>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-3xl font-black text-greenL tabular-nums leading-none">{netWpm}</span>
                  <span className="text-[10px] font-bold text-text-muted">WPM</span>
                </div>
                <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">Adjusted for errors</span>
              </div>

              {/* Stat Card 2: Gross WPM */}
              <div className="bg-bg-s2 border border-border rounded-xl p-4 flex flex-col justify-between min-h-[96px]">
                <span className="text-[9px] font-black uppercase text-text-muted leading-none">Gross Speed</span>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-3xl font-black text-text tabular-nums leading-none">{grossWpm}</span>
                  <span className="text-[10px] font-bold text-text-muted">WPM</span>
                </div>
                <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">Raw keystroke speed</span>
              </div>

              {/* Stat Card 3: Accuracy */}
              <div className="bg-bg-s2 border border-border rounded-xl p-4 flex flex-col justify-between min-h-[96px]">
                <span className="text-[9px] font-black uppercase text-text-muted leading-none">Accuracy</span>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-3xl font-black text-purpleL tabular-nums leading-none">{accuracy}%</span>
                </div>
                <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">Target matching correctness</span>
              </div>

              {/* Stat Card 4: Character breakdown */}
              <div className="bg-bg-s2 border border-border rounded-xl p-4 flex flex-col justify-between min-h-[96px]">
                <span className="text-[9px] font-black uppercase text-text-muted leading-none">Keystrokes</span>
                <div className="flex flex-col gap-1 mt-2.5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-greenL">Correct:</span>
                    <span className="tabular-nums font-black text-text">{correctChars}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-redL">Incorrect:</span>
                    <span className="tabular-nums font-black text-text">{incorrectChars}</span>
                  </div>
                </div>
                <span className="text-[8px] text-text-muted/80 font-bold border-t border-border/30 pt-1.5 mt-2">
                  Total: {typedText.length} keys
                </span>
              </div>

            </div>

            {/* Text Comparison Review Box */}
            <div className="bg-bg-s2 border border-border rounded-xl p-5 flex flex-col gap-4">
              <h4 className="text-xs font-black uppercase text-text border-b border-border/60 pb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-saffron" />
                <span>Text Accuracy Review</span>
              </h4>

              <div className="flex flex-col gap-3">
                {/* 1. Target Text */}
                <div className="p-3 bg-bg-s3/20 border border-border/80 rounded-lg flex flex-col gap-1">
                  <span className="text-[8px] font-black uppercase text-text-muted tracking-wider">Target Text (संदर्भ पाठ):</span>
                  <p 
                    className="text-xs md:text-sm text-text/80 leading-relaxed"
                    style={language === 'krutidev' ? { fontFamily: 'KrutiDev010', fontSize: '1.15rem', lineHeight: '1.5' } : undefined}
                  >
                    {targetText}
                  </p>
                </div>

                {/* 2. User typed text */}
                <div className="p-3 bg-bg-s3/20 border border-border/80 rounded-lg flex flex-col gap-1">
                  <span className="text-[8px] font-black uppercase text-text-muted tracking-wider">Your Typed Text (आपका टाइप किया गया):</span>
                  <p 
                    className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap"
                    style={language === 'krutidev' ? { fontFamily: 'KrutiDev010', fontSize: '1.15rem', lineHeight: '1.5' } : undefined}
                  >
                    {typedText || <span className="italic text-text-muted/65">No text was typed.</span>}
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
