export interface SubTopic {
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  nameHi: string;
  subtopics: string[];
  importanceScore: number; // 1 to 10
  pdfPath?: string;
  pdfName?: string;
  pdfSize?: number;
  pdfUpdatedAt?: string;
  studyNotes?: any;
  hasStudyNotes?: boolean;
  notesUpdatedAt?: string;
}

export interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  weightage: number; // estimated marks contribution out of total or percentage
  importance: 'Highest' | 'High' | 'Medium' | 'Low';
  pyqFrequency: string; // e.g. "Very High (15+ Qs/yr)"
  chapters: Chapter[];
  isCgSpecific?: boolean;
}

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  icon: string;
  stage: 'Prelims' | 'Mains' | 'Written Exam';
  daysRemaining: number;
  totalMarks: number;
  subjects: Subject[];
}

export interface TopicProgress {
  topicId: string;
  status: 'Not Started' | 'In Progress' | 'Revised' | 'Completed' | 'Weak Area';
  notesRead: boolean;
  mcqCompleted: boolean;
  videoWatched: boolean;
  accuracy: number; // 0 to 100
  revisionCount: number;
  lastStudied: string; // ISO Date
  nextRevisionDate: string; // ISO Date (spaced repetition logic)
}

export interface ExamProgressState {
  examId: string;
  streak: number;
  lastActive: string; // ISO Date
  topicProgress: Record<string, TopicProgress>;
}

// Highly detailed exam structures targeting CGPSC & Vyapam
const DETAILED_EXAMS_DATA: Exam[] = [
  {
    id: 'cgpsc_sse',
    name: 'CGPSC SSE',
    fullName: 'Chhattisgarh State Service Exam (Prelims)',
    icon: '🏛️',
    stage: 'Prelims',
    daysRemaining: 365,
    totalMarks: 200,
    subjects: [
      {
        id: 'cgpsc_cg_gk',
        name: 'Chhattisgarh General Knowledge (CG GK)',
        weightage: 100, // 50 Questions, 100 Marks
        importance: 'Highest',
        pyqFrequency: 'Extremely High (50 Qs/yr)',
        isCgSpecific: true,
        chapters: [
          {
            id: 'cg_history',
            name: 'छत्तीसगढ़ का इतिहास एवं स्वतंत्रता आंदोलन (CG History)',
            topics: [
              {
                id: 'cg-hist-1',
                name: 'Ancient History & Local Dynasties',
                nameHi: 'प्राचीन इतिहास एवं स्थानीय राजवंश (नल, शरभपुरीय, पाण्डुवंश)',
                subtopics: ['रामायण व महाभारत काल', 'सातवाहन व गुप्त काल', 'नल वंश व शरभपुरीय राजवंश', 'शिरपुर के पाण्डुवंश'],
                importanceScore: 9
              },
              {
                id: 'cg-hist-2',
                name: 'Kalachuri & Maratha Administration',
                nameHi: 'कलचुरी एवं मराठा शासन व्यवस्था',
                subtopics: ['कलचुरी राजवंश की शाखाएं (रतनपुर व रायपुर)', 'कल्चुरी कालीन प्रशासन व राजस्व', 'मराठा आक्रमण व सूबा शासन', 'ब्रिटिश संरक्षण काल (1818-1830)'],
                importanceScore: 10
              },
              {
                id: 'cg-hist-3',
                name: 'Modern Uprisings & British Rule',
                nameHi: 'आधुनिक जन-विद्रोह एवं ब्रिटिश कालीन छत्तीसगढ़',
                subtopics: ['हलबा व परलकोट विद्रोह (वीर गुंडाधुर)', 'बस्तर के प्रमुख आदिवासी विद्रोह', '1857 की क्रांति व वीर नारायण सिंह', 'राष्ट्रीय चेतना का विकास'],
                importanceScore: 8
              },
              {
                id: 'cg-hist-4',
                name: 'Freedom Movement in CG',
                nameHi: 'छत्तीसगढ़ में स्वतंत्रता आंदोलन',
                subtopics: ['कंडेल नहर सत्याग्रह (1920)', 'महात्मा गांधी की छत्तीसगढ़ यात्राएं', 'जंगल सत्याग्रह (धमतरी, तमोरा)', 'सविनय अवज्ञा व भारत छोड़ो आंदोलन में योगदान'],
                importanceScore: 10
              }
            ]
          },
          {
            id: 'cg_geography',
            name: 'छत्तीसगढ़ का भूगोल एवं पर्यावरण (CG Geography)',
            topics: [
              {
                id: 'cg-geo-1',
                name: 'Physical Boundaries & Landforms',
                nameHi: 'भौगोलिक स्थिति, सीमाएं एवं भौतिक विभाजन',
                subtopics: ['छत्तीसगढ़ का अक्षांशीय-देशान्तरीय विस्तार', 'पड़ोसी राज्य व सीमावर्ती जिले', 'चार प्राकृतिक विभाग (जशपुर सामरी पाट, महानदी बेसिन)', 'प्रमुख पर्वत व चोटियाँ (गौरलाटा)'],
                importanceScore: 7
              },
              {
                id: 'cg-geo-2',
                name: 'River Systems & Waterfalls',
                nameHi: 'अपवाह तंत्र, नदियाँ एवं जलप्रपात',
                subtopics: ['महानदी अपवाह तंत्र (शिवनाथ, हसदेव, अरपा)', 'गोदावरी अपवाह तंत्र (इंद्रावती, शबरी)', 'गंगा, सोन व नर्मदा अपवाह तंत्र', 'प्रमुख जलप्रपात (चित्रकोट, तीरथगढ़)'],
                importanceScore: 9
              },
              {
                id: 'cg-geo-3',
                name: 'Forests, Soil & Climate',
                nameHi: 'वन संपदा, मिट्टी एवं जलवायु',
                subtopics: ['आरक्षित, संरक्षित व अवर्गीकृत वन', 'साल व सागौन वनों का वितरण', 'छत्तीसगढ़ की मिट्टियाँ (लाल-पीली, कन्हार, मटासी)', 'ऋतु चक्र व वर्षा वितरण'],
                importanceScore: 8
              }
            ]
          },
          {
            id: 'cg_culture',
            name: 'छत्तीसगढ़ की जनजातियाँ, कला एवं संस्कृति (Tribes & Culture)',
            topics: [
              {
                id: 'cg-cul-1',
                name: 'CG Tribes & Social Traditions',
                nameHi: 'छत्तीसगढ़ की जनजातियाँ एवं सामाजिक परंपराएं',
                subtopics: ['गोंड, बैगा, उरांव, मड़िया, मुरिया जनजाति', 'विशेष पिछड़ी जनजातियाँ (PVTG)', 'घोटुल प्रथा व जनजातीय विवाह प्रकार', 'जनजातीय तीज-त्योहार (सरहुल, करमा)'],
                importanceScore: 10
              },
              {
                id: 'cg-cul-2',
                name: 'Art, Dance, Music & Festivals',
                nameHi: 'लोक कला, नृत्य, नाट्य एवं संगीत',
                subtopics: ['पंडवानी (तीजन बाई)', 'पंथ नृत्य, राउत नाचा, सूआ व कर्मा नृत्य', 'रहस्य व नाचा (लोकनाट्य)', 'बस्तर दशहरा (75 दिन) व भोरमदेव महोत्सव'],
                importanceScore: 9
              }
            ]
          },
          {
            id: 'cg_admin',
            name: 'छत्तीसगढ़ की प्रशासनिक व्यवस्था व पंचायती राज (Admin & Panchayati Raj)',
            topics: [
              {
                id: 'cg-adm-1',
                name: 'State Government & Local Admin',
                nameHi: 'राज्य शासन, विधानसभा एवं प्रशासनिक ढांचा',
                subtopics: ['राज्यपाल, मुख्यमंत्री व मंत्रिपरिषद', 'विधानसभा सचिवालय व प्रमुख समितियां', 'सचिवालय, संभाग, जिला व तहसील प्रशासन', 'छत्तीसगढ़ पुलिस व्यवस्था व कमिश्नर प्रणाली'],
                importanceScore: 7
              },
              {
                id: 'cg-adm-2',
                name: 'Panchayati Raj & Urban Bodies',
                nameHi: 'छत्तीसगढ़ में पंचायती राज एवं नगरीय निकाय',
                subtopics: ['छत्तीसगढ़ पंचायती राज अधिनियम 1993', 'त्रि-स्तरीय पंचायत ढांचा (ग्राम, जनपद, जिला)', 'नगरीय निकाय (निगम, पालिका, नगर पंचायत)', '73वां व 74वां संविधान संशोधन क्रियान्वयन'],
                importanceScore: 9
              }
            ]
          }
        ]
      },
      {
        id: 'cgpsc_polity',
        name: 'Indian Constitution & Polity (भारतीय राजव्यवस्था)',
        weightage: 24, // ~12 Qs, 24 Marks
        importance: 'High',
        pyqFrequency: 'High (10-12 Qs/yr)',
        chapters: [
          {
            id: 'polity_fundamentals',
            name: 'Constitutional Framework & Rights',
            topics: [
              {
                id: 'pol-fund-1',
                name: 'Making of Constitution & Preamble',
                nameHi: 'संविधान सभा का गठन, विशेषताएं एवं उद्देशिका',
                subtopics: ['कैबिनेट मिशन योजना व संविधान निर्माण', 'संविधान के विदेशी स्रोत व अनुसूचियां', 'प्रस्तावना के मुख्य शब्द (संप्रभुता, समाजवाद)', 'संविधान का संशोधन (अनुच्छेद 368)'],
                importanceScore: 8
              },
              {
                id: 'pol-fund-2',
                name: 'Fundamental Rights & DPSP',
                nameHi: 'मूल अधिकार, राज्य के नीति निदेशक तत्व व मूल कर्तव्य',
                subtopics: ['समानता व स्वतंत्रता का अधिकार (Art 14-22)', 'शोषण के विरुद्ध व धार्मिक स्वतंत्रता अधिकार', 'नीति निदेशक तत्व (Art 36-51) व महत्व', 'मूल कर्तव्य (Art 51A) व स्वर्ण सिंह समिति'],
                importanceScore: 10
              }
            ]
          },
          {
            id: 'polity_organs',
            name: 'Union & State Executive, Judiciary',
            topics: [
              {
                id: 'pol-org-1',
                name: 'Union Executive & Parliament',
                nameHi: 'संघीय कार्यपालिका एवं संसद',
                subtopics: ['राष्ट्रपति की वीटो व अध्यादेश शक्तियां (Art 72, 123)', 'प्रधानमंत्री व मंत्रिपरिषद', 'लोकसभा व राज्यसभा की संरचना व तुलना', 'संसदीय प्रस्ताव (अविश्वास, ध्यानाकर्षण) व समितियां'],
                importanceScore: 9
              },
              {
                id: 'pol-org-2',
                name: 'Judiciary & Local Self-Govt',
                nameHi: 'सर्वोच्च न्यायालय, उच्च न्यायालय एवं स्थानीय स्वशासन',
                subtopics: ['सुप्रीम कोर्ट का क्षेत्राधिकार व कॉलेजियम सिस्टम', 'न्यायिक पुनरावलोकन व जनहित याचिका (PIL)', 'उच्च न्यायालय व अधीनस्थ न्यायालय', '73वां व 74वां संशोधन मूल सिद्धांत'],
                importanceScore: 8
              }
            ]
          }
        ]
      },
      {
        id: 'cgpsc_history',
        name: 'Indian History (भारत का इतिहास)',
        weightage: 20, // ~10 Qs, 20 Marks
        importance: 'High',
        pyqFrequency: 'High (8-10 Qs/yr)',
        chapters: [
          {
            id: 'hist_ancient',
            name: 'Ancient & Medieval India',
            topics: [
              {
                id: 'hist-anc-1',
                name: 'Indus Valley & Vedic Period',
                nameHi: 'सिंधु घाटी सभ्यता एवं वैदिक काल',
                subtopics: ['हड़प्पा कालीन प्रमुख स्थल व नगर नियोजन', 'धार्मिक व आर्थिक जीवन (सिंधु सभ्यता)', 'ऋग्वैदिक व उत्तर वैदिक काल की तुलना', 'वैदिक साहित्य (वेद, उपनिषद)'],
                importanceScore: 6
              },
              {
                id: 'hist-anc-2',
                name: 'Buddhism, Jainism & Maurya Empire',
                nameHi: 'बौद्ध, जैन धर्म एवं मौर्य व गुप्त साम्राज्य',
                subtopics: ['महात्मा बुद्ध व महावीर स्वामी की शिक्षाएं', 'मौर्य कालीन प्रशासन व अशोक के अभिलेख', 'गुप्त काल (स्वर्ण युग) - कला, साहित्य व विज्ञान', 'हर्षवर्धन व दक्षिण भारतीय राजवंश (चोल, चालुक्य)'],
                importanceScore: 8
              },
              {
                id: 'hist-med-1',
                name: 'Delhi Sultanate & Mughal Empire',
                nameHi: 'दिल्ली सल्तनत एवं मुगल साम्राज्य',
                subtopics: ['गुलाम, खिलजी (अलाउद्दीन सुधार) व तुगलक वंश', 'सल्तनत कालीन कला व वास्तुकला', 'मुगल साम्राज्य (अकबर की धार्मिक व भू-राजस्व नीति)', 'भक्ति व सूफी आंदोलन'],
                importanceScore: 7
              }
            ]
          },
          {
            id: 'hist_modern',
            name: 'Modern India & Freedom Struggle',
            topics: [
              {
                id: 'hist-mod-1',
                name: 'European Penetration & 1857 Revolt',
                nameHi: 'यूरोपीय कंपनियों का आगमन एवं 1857 का विद्रोह',
                subtopics: ['प्लासी व बक्सर का युद्ध (अंग्रेजी सत्ता स्थापना)', 'लार्ड डलहौजी (हड़प नीति) व वेलेजली (सहायक संधि)', '1857 के विद्रोह के कारण, विस्तार व असफलता', 'सामाजिक-धार्मिक सुधार (राजा राममोहन राय, स्वामी विवेकानंद)'],
                importanceScore: 8
              },
              {
                id: 'hist-mod-2',
                name: 'Indian National Movement (1885-1947)',
                nameHi: 'भारतीय राष्ट्रीय आंदोलन एवं स्वतंत्रता',
                subtopics: ['कांग्रेस की स्थापना व उदारवादी/उग्रवादी चरण (1885-1915)', 'गांधीवादी युग (असहयोग, सविनय अवज्ञा, भारत छोड़ो)', 'क्रांतिकारी आंदोलन (भगत सिंह, आज़ाद, सुभाष चंद्र बोस)', 'माउंटबेटन योजना व भारत का विभाजन (1947)'],
                importanceScore: 10
              }
            ]
          }
        ]
      },
      {
        id: 'cgpsc_geography',
        name: 'Geography of India & World (भूगोल)',
        weightage: 18, // ~9 Qs, 18 Marks
        importance: 'Medium',
        pyqFrequency: 'Medium (7-9 Qs/yr)',
        chapters: [
          {
            id: 'geo_india',
            name: 'Physical & Economic Geography of India',
            topics: [
              {
                id: 'geo-ind-3d-map',
                name: '3D Interactive India Map (Survey of India 2020)',
                nameHi: 'भारत का 3D राजनीतिक एवं भौतिक मानचित्र (Survey of India 2020)',
                subtopics: [
                  'सर्वे ऑफ इंडिया 2020 आधिकारिक सीमाएं (लद्दाख व जम्मू-कश्मीर UT, दादरा-दमन विलय)',
                  '28 राज्य व 8 केंद्र शासित प्रदेश: राजधानियां, क्षेत्रफल व जनसंख्या',
                  'भारत के 4 सुदूरतम बिंदु (इंदिरा कॉल, इंदिरा पॉइंट, किबिथू, गुहार मोती)',
                  'कर्क रेखा (23.5°N) 8 राज्य व भारतीय मानक समय रेखा (82.5°E) 5 राज्य',
                  '12 प्रमुख नदियां एवं 8 प्रमुख पर्वत श्रृंखलाएं (3D रिलीफ)',
                  'छत्तीसगढ़ 33 जिले: 5 संभाग, स्थापना वर्ष एवं विशेष भौगोलिक तथ्य'
                ],
                importanceScore: 10,
                hasStudyNotes: true,
                studyNotes: {
                  overview: {
                    introduction: "यह अध्याय भारत के आधिकारिक राजनीतिक एवं भौतिक भूगोल (Survey of India 2020 Edition) पर आधारित है। 31 अक्टूबर 2019 को जम्मू-कश्मीर एवं लद्दाख केंद्र शासित प्रदेशों के गठन तथा 26 जनवरी 2020 को दादरा-नगर हवेली एवं दमन-दीव के विलय के पश्चात भारत में कुल **28 राज्य एवं 8 केंद्र शासित प्रदेश** हैं। छत्तीसगढ़ राज्य सेवा (CGPSC) एवं व्यापम परीक्षाओं की दृष्टि से भारत की सीमाएं, मानक समय रेखा, कर्क रेखा, प्रमुख नदियां, पर्वतमालाएं तथा छत्तीसगढ़ के सभी 33 जिलों की प्रशासनिक स्थिति अत्यंत महत्वपूर्ण हैं।",
                    quickFacts: [
                      "कुल राज्य: 28 | कुल केंद्र शासित प्रदेश: 8",
                      "सबसे बड़ा राज्य (क्षेत्रफल): राजस्थान (3,42,239 km²) | सबसे छोटा राज्य: गोवा (3,702 km²)",
                      "सबसे बड़ा UT (क्षेत्रफल): लद्दाख (1,66,698 km²) | सबसे छोटा UT: लक्षद्वीप (32 km²)",
                      "सर्वाधिक जनसंख्या: उत्तर प्रदेश (~23.5 करोड़) | न्यूनतम जनसंख्या: सिक्किम (~6.9 लाख)",
                      "मुख्य भूमि तटरेखा: 6,100 km | द्वीपों सहित कुल तटरेखा: 7,516.6 km",
                      "कर्क रेखा 8 राज्यों से व भारतीय मानक समय रेखा (IST 82.5°E) 5 राज्यों से गुजरती है।"
                    ]
                  },
                  keyTerminology: [
                    {
                      term: "सर्वे ऑफ इंडिया 2020 (Survey of India)",
                      definition: "भारत की राष्ट्रीय सर्वेक्षण एवं मानचित्रण संस्था द्वारा जारी आधिकारिक मानचित्र जिसमें लद्दाख UT में गिलगित-बाल्टिस्तान व अक्साई चिन तथा उत्तराखंड में कालापानी-लिपुलेख क्षेत्र को भारत का अभिन्न अंग दर्शाया गया है।",
                      importance: "Exam Critical"
                    },
                    {
                      term: "भारतीय मानक समय रेखा (IST 82.5°E)",
                      definition: "82°30' पूर्वी देशांतर रेखा जो प्रयागराज (मिर्जापुर) से गुजरती है और ग्रीनविच मीन टाइम (GMT) से 5 घंटे 30 मिनट आगे (+5:30) है। यह UP, MP, छत्तीसगढ़, ओडिशा एवं आंध्र प्रदेश (5 राज्यों) से होकर गुजरती है।",
                      importance: "Very High"
                    },
                    {
                      term: "कर्क रेखा (Tropic of Cancer 23.5°N)",
                      definition: "23°30' उत्तरी अक्षांश रेखा जो भारत के 8 राज्यों (गुजरात, राजस्थान, MP, छत्तीसगढ़, झारखंड, पश्चिम बंगाल, त्रिपुरा, मिजोरम) से गुजरती है। माही नदी इसे दो बार काटती है।",
                      importance: "Very High"
                    },
                    {
                      term: "चार सुदूरतम बिंदु (Extreme Points)",
                      definition: "उत्तर: इंदिरा कॉल (सियाचिन 37°6'N) | दक्षिण (मुख्य भूमि): कन्याकुमारी (8°4'N) | दक्षिण (संपूर्ण भारत): इंदिरा पॉइंट (ग्रेट निकोबार 6°45'N) | पूर्व: किबिथू (अरुणाचल 97°25'E) | पश्चिम: गुहार मोती (कच्छ, गुजरात 68°7'E)।",
                      importance: "High"
                    }
                  ],
                  chapters: [
                    {
                      chapterNumber: "01",
                      chapterTitle: "भारतीय सीमाएं, मानक रेखाएं एवं सुदूरतम बिंदु",
                      sections: [
                        {
                          title: "भारत की भौगोलिक स्थिति एवं विस्तार",
                          content: "- **अक्षांशीय विस्तार:** 8°4' N से 37°6' N (मुख्य भूमि) तथा 6°45' N (इंदिरा पॉइंट, निकोबार)।\n- **देशांतरीय विस्तार:** 68°7' E से 97°25' E।\n- **उत्तर से दक्षिण लंबाई:** 3,214 किमी।\n- **पूर्व से पश्चिम चौड़ाई:** 2,933 किमी।\n- **स्थलीय सीमा की कुल लंबाई:** 15,200 किमी (7 पड़ोसी देशों से सीमा)।\n- **समुद्री तटरेखा:** 7,516.6 किमी (मुख्य भूमि 6,100 किमी)।",
                          examTip: "CGPSC प्रीलिम्स में उत्तर-दक्षिण और पूर्व-पश्चिम विस्तार का अंतर अक्सर पूछा जाता है: 3214 - 2933 = 281 किमी का अंतर है।"
                        },
                        {
                          title: "कर्क रेखा एवं मानक समय रेखा का छत्तीसगढ़ में संगम",
                          content: "- **कर्क रेखा (23.5° N):** 8 राज्यों से गुजरती है - गुजरात, राजस्थान, मध्य प्रदेश, छत्तीसगढ़, झारखंड, पश्चिम बंगाल, त्रिपुरा और मिजोरम।\n- **मानक समय रेखा (82.5° E):** 5 राज्यों से गुजरती है - उत्तर प्रदेश, मध्य प्रदेश, छत्तीसगढ़, ओडिशा, आंध्र प्रदेश।\n- **कटान स्थल (Intersection):** छत्तीसगढ़ के **कोरिया / सूरजपुर** जिले में कर्क रेखा और 82.5° E देशांतर रेखा परस्पर एक-दूसरे को समकोण पर काटती हैं।",
                          examTip: "CGPSC एवं CG व्यापम में कई बार पूछा गया प्रश्न: कर्क रेखा और IST रेखा किस राज्य में एक दूसरे को काटती हैं? उत्तर: छत्तीसगढ़।"
                        }
                      ]
                    },
                    {
                      chapterNumber: "02",
                      chapterTitle: "28 राज्य, 8 UT एवं नवीनतम प्रशासनिक पुनर्गठन",
                      sections: [
                        {
                          title: "लद्दाख एवं जम्मू-कश्मीर केंद्र शासित प्रदेश (2019)",
                          content: "- **गठन तिथि:** 31 अक्टूबर 2019 (सरदार वल्लभभाई पटेल जयंती - राष्ट्रीय एकता दिवस)।\n- **लद्दाख UT:** इसमें लेह और कारगिल 2 जिले शामिल हैं। साथ ही गिलगित, बाल्टिस्तान, गिलगित वजारत, चिल्हास, ट्राइबल टेरिटरी और अक्साई चिन शामिल हैं।\n- **जम्मू-कश्मीर UT:** 20 जिले। राजधानी श्रीनगर (ग्रीष्मकालीन) एवं जम्मू (शीतकालीन)।\n- **दादरा-नगर हवेली एवं दमन-दीव:** 26 जनवरी 2020 को दोनों का औपचारिक विलय हुआ। राजधानी: **दमन**।",
                          examTip: "वर्तमान में भारत में 28 राज्य और 8 केंद्र शासित प्रदेश हैं। 9 UT नहीं हैं क्योंकि दादरा-नगर हवेली व दमन-दीव एक हो चुके हैं।"
                        }
                      ]
                    },
                    {
                      chapterNumber: "03",
                      chapterTitle: "भारतीय नदी अपवाह तंत्र एवं प्रमुख पर्वतमालाएं",
                      sections: [
                        {
                          title: "हिमालयी एवं प्रायद्वीपीय नदियां",
                          content: "- **गंगा नदी:** 2525 किमी, भारत की सबसे लंबी नदी। देवप्रयाग में भागीरथी व अलकनंदा का संगम।\n- **सिंधु नदी:** मानसरोवर झील के पास से उद्गम, लद्दाख-जांस्कर श्रेणियों के बीच बहती है।\n- **ब्रह्मपुत्र नदी:** तिब्बत में त्सांगपो, अरुणाचल में दिहांग, असम में ब्रह्मपुत्र (माजुली नदी द्वीप)।\n- **महानदी:** सिहावा पर्वत (धमतरी, छत्तीसगढ़) से उद्गम (858 किमी), ओडिशा में हीराकुंड बांध।\n- **नर्मदा व ताप्ती:** भ्रंश घाटी (Rift Valley) में पश्चिम की ओर बहकर खंभात की खाड़ी में ज्वारनदमुख (Estuary) बनाती हैं।\n- **गोदावरी:** 1465 किमी, प्रायद्वीपीय भारत की सबसे लंबी नदी (दक्षिण गंगा)।",
                          examTip: "पश्चिम की ओर बहने वाली नदियां डेल्टा नहीं बनातीं बल्कि एश्चुअरी (ज्वारनदमुख) बनाती हैं।"
                        },
                        {
                          title: "पर्वत श्रेणियां एवं सर्वोच्च शिखर",
                          content: "- **K2 (गॉडविन ऑस्टिन):** 8611 मी, काराकोरम श्रेणी (लद्दाख UT) - भारत की सर्वोच्च चोटी।\n- **कंचनजंगा:** 8586 मी, सिक्किम - भारतीय सीमा में निर्विवाद सर्वोच्च हिमालयी चोटी।\n- **नंदा देवी:** 7816 मी, उत्तराखंड।\n- **गुरु शिखर:** 1722 मी, अरावली पर्वत (माउंट आबू, राजस्थान) - सबसे प्राचीन अवशिष्ट पर्वत।\n- **धूपगढ़:** 1350 मी, सतपुड़ा श्रेणी (पचमढ़ी, MP)।\n- **अनाईमुडी:** 2695 मी, अन्नामलाई पहाड़ी (केरल) - दक्षिण भारत की सर्वोच्च चोटी।\n- **डोड्डाबेट्टा:** 2637 मी, नीलगिरि पहाड़ी (तमिलनाडु)।\n- **गौरलाटा:** 1225 मी, सामरीपाट (बलरामपुर) - छत्तीसगढ़ की सर्वोच्च चोटी।",
                          examTip: "दक्षिण भारत की सबसे ऊंची चोटी 'अनाईमुडी' (2695m) है, न कि डोड्डाबेट्टा। डोड्डाबेट्टा दूसरी सबसे ऊंची चोटी है।"
                        }
                      ]
                    },
                    {
                      chapterNumber: "04",
                      chapterTitle: "छत्तीसगढ़ के 33 जिले एवं प्रशासनिक संभाग",
                      sections: [
                        {
                          title: "5 संभाग एवं 33 जिलों की संरचना",
                          content: "- **सरगुजा संभाग (6 जिले):** कोरिया, सूरजपुर, बलरामपुर, सरगुजा, जशपुर, मनेंद्रगढ़-चिरमिरी-भरतपुर (MCB)।\n- **बिलासपुर संभाग (8 जिले):** बिलासपुर, मुंगेली, कोरबा, जांजगीर-चांपा, रायगढ़, गौरेला-पेंड्रा-मरवाही, सक्ती, सारंगढ़-बिलाईगढ़।\n- **दुर्ग संभाग (7 जिले):** दुर्ग, बेमेतरा, बालोद, राजनांदगांव, कबीरधाम, मोहला-मानपुर-अंबागढ़ चौकी, खैरागढ़-छुईखदान-गंडई।\n- **रायपुर संभाग (5 जिले):** रायपुर, बलौदाबाजार-भाटापारा, गरियाबंद, महासमुंद, धमतरी।\n- **बस्तर संभाग (7 जिले):** बस्तर, कोंडागांव, उत्तर बस्तर कांकेर, दंतेवाड़ा, सुकमा, बीजापुर, नारायणपुर।",
                          examTip: "सर्वाधिक जिलों वाला संभाग 'बिलासपुर संभाग' (8 जिले) है। सबसे कम जिलों वाला संभाग 'रायपुर संभाग' (5 जिले) है।"
                        }
                      ]
                    }
                  ],
                  tables: [
                    {
                      title: "भारत के 4 सुदूरतम बिंदु (Extreme Points of India)",
                      headers: ["दिशा (Direction)", "स्थान का नाम", "राज्य / UT", "अक्षांश / देशांतर"],
                      rows: [
                        ["उत्तरी बिंदु (North)", "इंदिरा कॉल (सियाचिन)", "लद्दाख UT", "37°6' N"],
                        ["दक्षिणी बिंदु (मुख्य भूमि)", "केप कोमोरिन (कन्याकुमारी)", "तमिलनाडु", "8°4' N"],
                        ["दक्षिणतम बिंदु (संपूर्ण)", "इंदिरा पॉइंट (पिग्मेलियन)", "ग्रेट निकोबार (A&N)", "6°45' N"],
                        ["पूर्वी बिंदु (East)", "किबिथू (अंजाव जिला)", "अरुणाचल प्रदेश", "97°25' E"],
                        ["पश्चिमी बिंदु (West)", "गुहार मोती (कच्छ जिला)", "गुजरात", "68°7' E"]
                      ]
                    },
                    {
                      title: "कर्क रेखा (23.5° N) से गुजरने वाले 8 राज्य (पश्चिम से पूर्व क्रम)",
                      headers: ["क्रम", "राज्य का नाम", "राजधानी", "विशेष तथ्य"],
                      rows: [
                        ["1", "गुजरात", "गांधीनगर", "माही नदी कर्क रेखा को दो बार काटती है"],
                        ["2", "राजस्थान", "जयपुर", "बांसवाड़ा व डूंगरपुर जिले से गुजरती है"],
                        ["3", "मध्य प्रदेश", "भोपाल", "सर्वाधिक 14 जिलों से होकर गुजरती है"],
                        ["4", "छत्तीसगढ़", "रायपुर", "कोरिया, सूरजपुर, बलरामपुर, MCB से गुजरती है"],
                        ["5", "झारखंड", "रांची", "रांची शहर कर्क रेखा के बिल्कुल निकट स्थित है"],
                        ["6", "पश्चिम बंगाल", "कोलकाता", "पुरुलिया, बांकुरा, बर्धमान, नदिया जिले"],
                        ["7", "त्रिपुरा", "अगरतला", "उदयपुर शहर से होकर गुजरती है"],
                        ["8", "मिजोरम", "आइजोल", "चंफाई जिले से होकर गुजरती है"]
                      ]
                    }
                  ],
                  oneLinerRevision: [
                    "Survey of India 2020 के अनुसार भारत में 28 राज्य और 8 केंद्र शासित प्रदेश हैं।",
                    "लद्दाख UT का गठन 31 अक्टूबर 2019 को हुआ (लेह, कारगिल, गिलगित-बाल्टिस्तान व अक्साई चिन सहित)।",
                    "दादरा-नगर हवेली और दमन-दीव का विलय 26 जनवरी 2020 को हुआ (राजधानी: दमन)।",
                    "भारतीय मानक समय रेखा (82.5° E) ग्रीनविच मीन टाइम (GMT) से 5 घंटे 30 मिनट आगे है।",
                    "कर्क रेखा (23.5° N) और IST (82.5° E) छत्तीसगढ़ के कोरिया/सूरजपुर में परस्पर काटती हैं।",
                    "भारत की स्थलीय सीमा 15,200 किमी और कुल समुद्री तटरेखा 7,516.6 किमी है।",
                    "क्षेत्रफल में सबसे बड़ा राज्य राजस्थान (3.42 लाख km²) और सबसे छोटा गोवा (3702 km²) है।",
                    "क्षेत्रफल में सबसे बड़ा UT लद्दाख (1.66 लाख km²) और सबसे छोटा लक्षद्वीप (32 km²) है।",
                    "भारत की सबसे लंबी नदी गंगा (2525 km) और प्रायद्वीपीय भारत की सबसे लंबी गोदावरी (1465 km) है।",
                    "भारत की सर्वोच्च चोटी K2 (8611m, लद्दाख UT) और निर्विवाद भारतीय हिमालयी चोटी कंचनजंगा (8586m, सिक्किम) है।",
                    "दक्षिण भारत की सर्वोच्च चोटी अनाईमुडी (2695m, अन्नामलाई पहाड़ी, केरल) है।",
                    "छत्तीसगढ़ की सर्वोच्च चोटी गौरलाटा (1225m, सामरीपाट, बलरामपुर) है।",
                    "छत्तीसगढ़ में वर्तमान में 5 संभाग और 33 जिले हैं (सर्वाधिक जिले बिलासपुर संभाग में 8)।"
                  ],
                  mcqs: [
                    {
                      question: "कर्क रेखा (23.5° N) एवं भारतीय मानक समय रेखा (82.5° E) भारत के किस राज्य में एक दूसरे को काटती हैं?",
                      options: {
                        A: "मध्य प्रदेश",
                        B: "छत्तीसगढ़",
                        C: "झारखंड",
                        D: "ओडिशा"
                      },
                      answer: "B",
                      explanation: "कर्क रेखा (23°30' N) और भारतीय मानक समय रेखा (82°30' E) छत्तीसगढ़ के कोरिया / सूरजपुर जिले में एक-दूसरे को परस्पर काटती हैं।"
                    },
                    {
                      question: "Survey of India 2020 आधिकारिक राजनीतिक मानचित्र के अनुसार K2 (गॉडविन ऑस्टिन 8611m) किस राज्य/UT में स्थित है?",
                      options: {
                        A: "जम्मू और कश्मीर UT",
                        B: "लद्दाख UT",
                        C: "हिमाचल प्रदेश",
                        D: "उत्तराखंड"
                      },
                      answer: "B",
                      explanation: "31 अक्टूबर 2019 के पुनर्गठन और सर्वे ऑफ इंडिया 2020 मानचित्र के अनुसार काराकोरम श्रेणी एवं K2 शिखर लद्दाख केंद्र शासित प्रदेश के अधिकार क्षेत्र में स्थित है।"
                    },
                    {
                      question: "दक्षिण भारत एवं प्रायद्वीपीय भारत की सर्वोच्च पर्वत चोटी कौन सी है?",
                      options: {
                        A: "डोड्डाबेट्टा (2637m)",
                        B: "अनाईमुडी (2695m)",
                        C: "गुरु शिखर (1722m)",
                        D: "महेंद्रगिरि (1501m)"
                      },
                      answer: "B",
                      explanation: "दक्षिण भारत की सबसे ऊंची पर्वत चोटी 'अनाईमुडी' (2,695 मीटर) है, जो केरल में अन्नामलाई पहाड़ियों पर स्थित है। डोड्डाबेट्टा (2,637 मीटर) नीलगिरि की सबसे ऊंची चोटी है।"
                    },
                    {
                      question: "भारत का सुदूरतम दक्षिणी बिंदु 'इंदिरा पॉइंट' किस अक्षांश पर स्थित है?",
                      options: {
                        A: "8°4' N",
                        B: "6°45' N",
                        C: "37°6' N",
                        D: "97°25' E"
                      },
                      answer: "B",
                      explanation: "भारत का दक्षिणतम बिंदु इंदिरा पॉइंट (ग्रेट निकोबार द्वीप) 6°45' उत्तरी अक्षांश पर स्थित है। 8°4' N भारत की मुख्य भूमि (कन्याकुमारी) का अक्षांश है।"
                    },
                    {
                      question: "छत्तीसगढ़ राज्य की सर्वोच्च पर्वत चोटी 'गौरलाटा' किस जिले एवं पाट प्रदेश में स्थित है?",
                      options: {
                        A: "मैनपाट, सरगुजा",
                        B: "सामरीपाट, बलरामपुर",
                        C: "जशपुर पाट, जशपुर",
                        D: "बैलाडीला, दंतेवाड़ा"
                      },
                      answer: "B",
                      explanation: "छत्तीसगढ़ राज्य की सबसे ऊंची चोटी 'गौरलाटा' (1,225 मीटर) सामरीपाट क्षेत्र, बलरामपुर-रामानुजगंज जिले में स्थित है।"
                    }
                  ]
                }
              },
              {
                id: 'geo-ind-1',
                name: 'Physiography & River Systems',
                nameHi: 'भारत का भौतिक विभाजन एवं नदियाँ',
                subtopics: ['हिमालय पर्वत श्रृंखला, उत्तर का विशाल मैदान', 'प्रायद्वीपीय पठार व तटीय मैदान', 'सिंधु, गंगा व ब्रह्मपुत्र नदी तंत्र', 'प्रायद्वीपीय नदियाँ (नर्मदा, गोदावरी, कृष्णा)'],
                importanceScore: 7
              },
              {
                id: 'geo-ind-2',
                name: 'Climate, Natural Vegetation & Agriculture',
                nameHi: 'जलवायु, प्राकृतिक वनस्पति एवं कृषि संसाधन',
                subtopics: ['भारतीय मानसून की उत्पत्ति व वर्षा वितरण', 'वनों के प्रकार व राष्ट्रीय उद्यान/बायोस्फीयर रिजर्व', 'प्रमुख फसलें (धान, गेहूं, कपास) व हरित क्रांति', 'खनिज संसाधन (कोयला, लौह अयस्क) वितरण'],
                importanceScore: 8
              }
            ]
          }
        ]
      },
      {
        id: 'cgpsc_science',
        name: 'General Science & Technology (विज्ञान व प्रौद्योगिकी)',
        weightage: 20, // ~10 Qs, 20 Marks
        importance: 'Medium',
        pyqFrequency: 'Medium (9-10 Qs/yr)',
        chapters: [
          {
            id: 'sci_physics_chemistry',
            name: 'Basic Science & Space Technology',
            topics: [
              {
                id: 'sci-basic-1',
                name: 'Physics & Chemistry Concepts',
                nameHi: 'भौतिकी एवं रसायन विज्ञान के मूलभूत सिद्धांत',
                subtopics: ['प्रकाश (परावर्तन, अपवर्तन, लेंस)', 'विद्युत धारा, चुंबकत्व व ध्वनि', 'अम्ल, क्षार, लवण व पीएच मान', 'धातु, अधातु व दैनिक जीवन में रसायन'],
                importanceScore: 6
              },
              {
                id: 'sci-bio-1',
                name: 'Biology, Nutrition & Diseases',
                nameHi: 'जीव विज्ञान, मानव शरीर, पोषण एवं रोग',
                subtopics: ['कोशिका संरचना व पादप/जंतु वर्गीकरण', 'मानव पाचन, श्वसन व परिसंचरण तंत्र', 'विटामिन, कार्बोहाइड्रेट, प्रोटीन व पोषण', 'बैक्टीरिया, वायरस व प्रोटोजोआ जनित रोग व उपचार'],
                importanceScore: 8
              },
              {
                id: 'sci-tech-1',
                name: 'Space, Defence & IT Developments',
                nameHi: 'अंतरिक्ष, रक्षा एवं सूचना प्रौद्योगिकी',
                subtopics: ['ISRO के प्रमुख मिशन (चंद्रयान, गगनयान)', 'DRDO मिसाइल कार्यक्रम (अग्नि, पृथ्वी)', 'परमाणु ऊर्जा कार्यक्रम व रिएक्टर', 'AI, साइबर सुरक्षा व 5G तकनीक'],
                importanceScore: 9
              }
            ]
          }
        ]
      },
      {
        id: 'cgpsc_economy',
        name: 'Indian Economy (भारतीय अर्थव्यवस्था)',
        weightage: 12, // ~6 Qs, 12 Marks
        importance: 'Low',
        pyqFrequency: 'Medium (5-6 Qs/yr)',
        chapters: [
          {
            id: 'econ_finance',
            name: 'Macroeconomics & Budgeting',
            topics: [
              {
                id: 'econ-fin-1',
                name: 'National Income & Inflation',
                nameHi: 'राष्ट्रीय आय, मुद्रास्फीति एवं बैंकिंग प्रणाली',
                subtopics: ['GDP, GNP, NNP व प्रति व्यक्ति आय आकलन', 'मुद्रास्फीति के प्रकार, कारण व नियंत्रण', 'RBI की मौद्रिक नीति (Repo Rate, CRR)', 'व्यावसायिक बैंकों का विलय व NPA समस्या'],
                importanceScore: 6
              },
              {
                id: 'econ-fin-2',
                name: 'Public Finance & Union Budget',
                nameHi: 'सार्वजनिक वित्त, राजकोषीय नीति एवं केंद्रीय बजट',
                subtopics: ['प्रत्यक्ष व अप्रत्यक्ष कर (GST ढांचा)', 'राजकोषीय घाटा, राजस्व घाटा व बजट घाटा', '15वां वित्त आयोग सिफारिशें', 'आर्थिक सर्वेक्षण व वर्तमान बजट हाइलाइट्स'],
                importanceScore: 7
              }
            ]
          }
        ]
      },
      {
        id: 'cgpsc_current',
        name: 'Current Affairs & Sports (समसामयिकी)',
        weightage: 18, // ~9 Qs, 18 Marks
        importance: 'High',
        pyqFrequency: 'High (8-10 Qs/yr)',
        chapters: [
          {
            id: 'current_events',
            name: 'National & State Current Events',
            topics: [
              {
                id: 'cur-nat-1',
                name: 'National & International Appointments',
                nameHi: 'राष्ट्रीय-अंतरराष्ट्रीय नियुक्तियां, शिखर सम्मेलन व सूचकांक',
                subtopics: ['महत्वपूर्ण संवैधानिक नियुक्तियां', 'G20, SCO, BRICS शिखर सम्मेलन', 'वैश्विक सूचकांक (हंगर, हैप्पीनेस, प्रेस फ्रीडम) में भारत की रैंक', 'प्रमुख द्विपक्षीय सैन्य अभ्यास'],
                importanceScore: 8
              },
              {
                id: 'cur-cg-1',
                name: 'CG Flagship Schemes & Events',
                nameHi: 'छत्तीसगढ़ शासन की योजनाएं एवं समसामयिक घटनाएं',
                subtopics: ['महतारी वंदन योजना व कृषक उन्नति योजना', 'छत्तीसगढ़ बजट व औद्योगिक नीति परिवर्तन', 'छत्तीसगढ़ के चर्चित व्यक्ति व स्थान', 'राम वन गमन पर्यटन परिपथ अपडेट'],
                importanceScore: 10
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cgv_patwari',
    name: 'CG Vyapam Patwari',
    fullName: 'CG Vyapam Patwari Recruitment Exam',
    icon: '🏘️',
    stage: 'Written Exam',
    daysRemaining: 365,
    totalMarks: 150,
    subjects: [
      {
        id: 'pat_cg_gk',
        name: 'Chhattisgarh GK',
        weightage: 15,
        importance: 'High',
        pyqFrequency: 'High (15 Qs/yr)',
        isCgSpecific: true,
        chapters: [
          {
            id: 'pat_cg_history',
            name: 'CG History & Culture',
            topics: [
              {
                id: 'pat-cg-h1',
                name: 'Major Dynasties & Freedom Fighters',
                nameHi: 'CG के प्रमुख राजवंश एवं स्वतंत्रता संग्राम सेनानी',
                subtopics: ['कल्चुरी वंश', 'वीर नारायण सिंह', 'पंडित सुंदरलाल शर्मा'],
                importanceScore: 9
              }
            ]
          }
        ]
      },
      {
        id: 'pat_maths',
        name: 'Mathematics & Reasoning',
        weightage: 30,
        importance: 'Highest',
        pyqFrequency: 'Extremely High (30 Qs/yr)',
        chapters: [
          {
            id: 'pat_quant',
            name: 'Quantitative Aptitude',
            topics: [
              {
                id: 'pat-quant-1',
                name: 'Number System, Average, Percentage',
                nameHi: 'संख्या पद्धति, औसत एवं प्रतिशत',
                subtopics: ['दशमलव भिन्न', 'प्रतिशत आकलन', 'औसत प्रश्न'],
                importanceScore: 10
              },
              {
                id: 'pat-quant-2',
                name: 'Profit & Loss, Simple/Compound Interest',
                nameHi: 'लाभ-हानि एवं साधारण/चक्रवृद्धि ब्याज',
                subtopics: ['क्रय-विक्रय मूल्य', 'साधारण ब्याज दर', 'चक्रवृद्धि ब्याज गणना'],
                importanceScore: 10
              }
            ]
          }
        ]
      },
      {
        id: 'pat_computer',
        name: 'Computer Knowledge',
        weightage: 20,
        importance: 'High',
        pyqFrequency: 'High (20 Qs/yr)',
        chapters: [
          {
            id: 'pat_comp_basics',
            name: 'Computer Fundamentals & MS Office',
            topics: [
              {
                id: 'pat-comp-1',
                name: 'Internet, Antivirus & Office tools',
                nameHi: 'इंटरनेट, एंटीवायरस एवं ऑफिस टूल्स (Word, Excel)',
                subtopics: ['MS Excel शॉर्टकट', 'ईमेल व ब्राउज़र', 'कंप्यूटर वायरस व सुरक्षा'],
                importanceScore: 9
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cg_police_si',
    name: 'CG Police SI',
    fullName: 'CG Police Sub Inspector Exam (Mains)',
    icon: '👮',
    stage: 'Mains',
    daysRemaining: 365,
    totalMarks: 300,
    subjects: [
      {
        id: 'si_gs',
        name: 'General Studies & GK',
        weightage: 100,
        importance: 'Highest',
        pyqFrequency: 'Extremely High',
        chapters: [
          {
            id: 'si_gs_cg',
            name: 'Chhattisgarh GS',
            topics: [
              {
                id: 'si-cg-1',
                name: 'CG Administrative & Police Structure',
                nameHi: 'CG प्रशासनिक एवं पुलिस संगठन संरचना',
                subtopics: ['छत्तीसगढ़ पुलिस रेंज व जिला संगठन', 'पुलिस प्रशिक्षण संस्थान', 'आईपीएस कैडर व पद सोपान'],
                importanceScore: 10
              }
            ]
          }
        ]
      }
    ]
  }
];

const buildMasterTopicsMap = (merged: Record<string, any>): Map<string, any> => {
  const map = new Map<string, any>();
  const masterExam = merged['cgv_master'];
  if (!masterExam || !Array.isArray(masterExam.subjects)) return map;

  masterExam.subjects.forEach((sub: any) => {
    if (Array.isArray(sub.chapters)) {
      sub.chapters.forEach((ch: any) => {
        if (Array.isArray(ch.topics)) {
          ch.topics.forEach((t: any) => {
            if (!t) return;
            if (t.id) map.set(t.id, t);
            if (t.name) map.set(t.name.toLowerCase().trim(), t);
            if (t.nameHi) map.set(t.nameHi.trim(), t);
          });
        }
      });
    }
    if (Array.isArray(sub.topics)) {
      sub.topics.forEach((t: any) => {
        if (!t) return;
        if (t.id && !map.has(t.id)) map.set(t.id, t);
        if (t.name && !map.has(t.name.toLowerCase().trim())) map.set(t.name.toLowerCase().trim(), t);
        if (t.nameHi && !map.has(t.nameHi.trim())) map.set(t.nameHi.trim(), t);
      });
    }
  });

  return map;
};

const mapTopicWithMaster = (t: any, defaultId: string, masterMap: Map<string, any>): Topic => {
  const master = masterMap.get(t.id) || 
                 (t.name ? masterMap.get(t.name.toLowerCase().trim()) : null) || 
                 (t.nameHi ? masterMap.get(t.nameHi.trim()) : null);

  const hasStudyNotes = Boolean(
    t.hasStudyNotes || 
    t.studyNotes || 
    master?.hasStudyNotes || 
    master?.studyNotes
  );

  return {
    id: t.id || master?.id || defaultId,
    name: t.name || master?.name || '',
    nameHi: t.nameHi || master?.nameHi || t.name || '',
    subtopics: (Array.isArray(t.subtopics) && t.subtopics.length > 0) ? t.subtopics : (master?.subtopics || []),
    importanceScore: t.importanceScore || master?.importanceScore || 7,
    pdfPath: t.pdfPath || master?.pdfPath,
    pdfName: t.pdfName || master?.pdfName,
    pdfSize: t.pdfSize || master?.pdfSize,
    pdfUpdatedAt: t.pdfUpdatedAt || master?.pdfUpdatedAt,
    studyNotes: t.studyNotes || master?.studyNotes,
    hasStudyNotes,
    notesUpdatedAt: t.notesUpdatedAt || master?.notesUpdatedAt
  };
};

const mapOldExamToNew = (oldId: string, oldExam: any, masterMap: Map<string, any>): Exam => {
  return {
    id: oldId,
    name: oldExam.name,
    fullName: oldExam.fullName || oldExam.name,
    icon: oldExam.icon || '🏛️',
    stage: oldExam.stage || (oldExam.pattern?.type?.includes('Mains') ? 'Mains' : 'Prelims'),
    daysRemaining: oldExam.daysRemaining || 365,
    totalMarks: oldExam.pattern?.totalMarks || 100,
    subjects: (oldExam.subjects || []).map((sub: any, subIdx: number) => {
      let chapters: Chapter[] = [];
      if (sub.chapters && Array.isArray(sub.chapters) && sub.chapters.length > 0) {
        chapters = sub.chapters.map((ch: any) => ({
          id: ch.id || `${oldId}_ch_${subIdx}`,
          name: ch.name,
          topics: (ch.topics || []).map((t: any, tIdx: number) => 
            mapTopicWithMaster(t, `${oldId}-${subIdx}-${ch.id}-${tIdx}`, masterMap)
          )
        }));
      } else {
        const topics = (sub.topics || []).map((t: any, tIdx: number) => 
          mapTopicWithMaster(t, `${oldId}-${subIdx}-${tIdx}`, masterMap)
        );
        chapters = [
          {
            id: `${oldId}_sub_${subIdx}_default`,
            name: `${sub.name} Topics / विषय सूची`,
            topics
          }
        ];
      }

      return {
        id: sub.id || `${oldId}_sub_${subIdx}`,
        name: sub.name,
        weightage: sub.weightage || 15,
        importance: sub.importance || 'Medium',
        pyqFrequency: sub.pyqFrequency || 'Medium',
        isCgSpecific: sub.isCgSpecific || sub.name?.toLowerCase().includes('chhattisgarh') || sub.name?.toLowerCase().includes('cg'),
        chapters
      };
    })
  };
};

const getDynamicExams = (): Exam[] => {
  const list: Exam[] = [];
  const cgpscData = (typeof window !== 'undefined' && (window as any).CGPSC_EXAM_DATA) || {};
  const vyapamData = (typeof window !== 'undefined' && (window as any).SYLLABUS_DATA) || {};
  
  const merged = { ...cgpscData, ...vyapamData };
  const masterMap = buildMasterTopicsMap(merged);
  
  Object.entries(merged).forEach(([examId, oldExam]: [string, any]) => {
    try {
      list.push(mapOldExamToNew(examId, oldExam, masterMap));
    } catch (e) {
      console.error('Failed to map old exam:', examId, e);
    }
  });
  
  return list;
};

export const EXAMS_DATA: Exam[] = (() => {
  const dynamic = getDynamicExams();
  return dynamic.length > 0 ? dynamic : DETAILED_EXAMS_DATA;
})();

// Seed initial progress state for a beautiful dashboard out of the box
export const getInitialProgress = (examId: string): ExamProgressState => {
  const exam = EXAMS_DATA.find(e => e.id === examId) || EXAMS_DATA[0];
  const topicProgress: Record<string, TopicProgress> = {};

  const today = new Date();
  
  // Seed status with a realistic distribution: some completed, some weak, some in progress
  let topicIndex = 0;
  
  const subjects = Array.isArray(exam?.subjects) ? exam.subjects : [];
  subjects.forEach(subject => {
    const chapters = Array.isArray(subject?.chapters) ? subject.chapters : [];
    chapters.forEach(chapter => {
      const topics = Array.isArray(chapter?.topics) ? chapter.topics : [];
      topics.forEach(topic => {
        if (!topic) return;
        let status: TopicProgress['status'] = 'Not Started';
        let notesRead = false;
        let mcqCompleted = false;
        let videoWatched = false;
        let accuracy = 0;
        let lastStudied = '';
        let nextRevisionDate = '';
        let revisionCount = 0;

        // Distribute progress states
        if (topicIndex % 5 === 0) {
          status = 'Completed';
          notesRead = true;
          mcqCompleted = true;
          videoWatched = true;
          accuracy = 75 + (topicIndex % 20); // 75% to 95%
          const lastStudiedDate = new Date();
          lastStudiedDate.setDate(today.getDate() - (topicIndex % 10) - 2);
          lastStudied = lastStudiedDate.toISOString();
          
          const revDate = new Date();
          revDate.setDate(today.getDate() + (topicIndex % 7) + 1); // future revision
          nextRevisionDate = revDate.toISOString();
          revisionCount = 2;
        } else if (topicIndex % 5 === 1) {
          status = 'Weak Area';
          notesRead = true;
          mcqCompleted = true;
          videoWatched = false;
          accuracy = 35 + (topicIndex % 15); // 35% to 50%
          const lastStudiedDate = new Date();
          lastStudiedDate.setDate(today.getDate() - 1);
          lastStudied = lastStudiedDate.toISOString();
          
          // Overdue revision (scheduled in the past or today)
          const revDate = new Date();
          revDate.setDate(today.getDate() - (topicIndex % 3)); 
          nextRevisionDate = revDate.toISOString();
          revisionCount = 1;
        } else if (topicIndex % 5 === 2) {
          status = 'Revised';
          notesRead = true;
          mcqCompleted = true;
          videoWatched = true;
          accuracy = 80 + (topicIndex % 15);
          const lastStudiedDate = new Date();
          lastStudiedDate.setDate(today.getDate() - (topicIndex % 14) - 5);
          lastStudied = lastStudiedDate.toISOString();
          
          const revDate = new Date();
          revDate.setDate(today.getDate() + 10);
          nextRevisionDate = revDate.toISOString();
          revisionCount = 4;
        } else if (topicIndex % 5 === 3) {
          status = 'In Progress';
          notesRead = true;
          mcqCompleted = false;
          videoWatched = true;
          accuracy = 55 + (topicIndex % 15);
          const lastStudiedDate = new Date();
          lastStudiedDate.setDate(today.getDate());
          lastStudied = lastStudiedDate.toISOString();
          
          const revDate = new Date();
          revDate.setDate(today.getDate() + 1);
          nextRevisionDate = revDate.toISOString();
          revisionCount = 0;
        } else {
          status = 'Not Started';
        }

        topicProgress[topic.id] = {
          topicId: topic.id,
          status,
          notesRead,
          mcqCompleted,
          videoWatched,
          accuracy,
          revisionCount,
          lastStudied,
          nextRevisionDate
        };

        topicIndex++;
      });
    });
  });

  return {
    examId: exam.id,
    streak: 5, // initial streak
    lastActive: today.toISOString(),
    topicProgress
  };
};

export const getProgressFromLocalStorage = (examId: string): ExamProgressState => {
  const key = `cg_syllabus_progress_${examId}`;
  const stored = localStorage.getItem(key);
  let state: ExamProgressState;
  
  if (stored) {
    try {
      state = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored syllabus progress", e);
      state = getInitialProgress(examId);
    }
  } else {
    state = getInitialProgress(examId);
  }
  
  // Merge from legacy local storage key 'examprep_progress_' + examId
  const legacyKey = `examprep_progress_${examId}`;
  const legacyStored = localStorage.getItem(legacyKey);
  if (legacyStored) {
    try {
      const legacyMap = JSON.parse(legacyStored); // e.g. { "topicId": true }
      Object.entries(legacyMap).forEach(([topicId, completed]) => {
        if (completed === true) {
          const current = state.topicProgress[topicId];
          if (!current || (current.status !== 'Completed' && current.status !== 'Revised')) {
            state.topicProgress[topicId] = {
              topicId,
              status: 'Completed',
              notesRead: true,
              mcqCompleted: true,
              videoWatched: true,
              accuracy: 80,
              revisionCount: 1,
              lastStudied: new Date().toISOString(),
              nextRevisionDate: new Date().toISOString()
            };
          }
        }
      });
    } catch (e) {
      console.error("Failed to merge legacy progress", e);
    }
  }
  
  localStorage.setItem(key, JSON.stringify(state));
  return state;
};

export const saveProgressToLocalStorage = (progress: ExamProgressState) => {
  const key = `cg_syllabus_progress_${progress.examId}`;
  localStorage.setItem(key, JSON.stringify(progress));
  
  // Also save simplified version to legacy local storage key 'examprep_progress_' + examId
  const legacyKey = `examprep_progress_${progress.examId}`;
  const legacyMap: Record<string, boolean> = {};
  Object.entries(progress.topicProgress).forEach(([topicId, tp]) => {
    if (tp.status === 'Completed' || tp.status === 'Revised') {
      legacyMap[topicId] = true;
    }
  });
  localStorage.setItem(legacyKey, JSON.stringify(legacyMap));
};
