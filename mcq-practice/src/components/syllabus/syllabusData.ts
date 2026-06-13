export interface SubTopic {
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  nameHi: string;
  subtopics: string[];
  importanceScore: number; // 1 to 10
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

const mapOldExamToNew = (oldId: string, oldExam: any): Exam => {
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
      if (sub.chapters) {
        chapters = sub.chapters;
      } else {
        const topics = (sub.topics || []).map((t: any, tIdx: number) => ({
          id: t.id || `${oldId}-${subIdx}-${tIdx}`,
          name: t.name,
          nameHi: t.nameHi || t.name,
          subtopics: t.subtopics || [],
          importanceScore: t.importanceScore || 7
        }));
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
  const cgpscData = (window as any).CGPSC_EXAM_DATA || {};
  const vyapamData = (window as any).SYLLABUS_DATA || {};
  
  const merged = { ...cgpscData, ...vyapamData };
  
  Object.entries(merged).forEach(([examId, oldExam]: [string, any]) => {
    try {
      list.push(mapOldExamToNew(examId, oldExam));
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
  
  exam.subjects.forEach(subject => {
    subject.chapters.forEach(chapter => {
      chapter.topics.forEach(topic => {
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
