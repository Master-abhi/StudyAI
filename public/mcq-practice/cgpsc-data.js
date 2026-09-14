/* ═══════════════════════════════════════════════════════════════
   CG Guru — CGPSC & State Exams Syllabus Data (Official & Verified)
   Chhattisgarh Public Service Commission & State Recruitment Exams
   ═══════════════════════════════════════════════════════════════ */

const CGPSC_EXAM_DATA = {
  "cgpsc_sse": {
    "name": "CGPSC SSE",
    "fullName": "Chhattisgarh Public Service Commission — State Service Exam (Prelims)",
    "icon": "🏛️",
    "category": "cgpsc",
    "description": "छत्तीसगढ़ राज्य सेवा परीक्षा (प्रारंभिक) — आधिकारिक 400 अंकों का विस्तृत पाठ्यक्रम (Paper-1 GS & Paper-2 CSAT)",
    "eligibility": "Graduate in Any Discipline",
    "pattern": {
      "totalMarks": 400,
      "time": "Paper 1: 2 Hours | Paper 2: 2 Hours",
      "type": "Objective MCQ (100 Questions each, 200 Marks each, 1/3rd Negative Marking)",
      "papers": [
        {
          "paper": "Paper 1 — Part A: General Studies of India",
          "marks": 100
        },
        {
          "paper": "Paper 1 — Part B: General Knowledge of Chhattisgarh",
          "marks": 100
        },
        {
          "paper": "Paper 2 — CSAT / Aptitude Test (Qualifying 33%)",
          "marks": 200
        }
      ]
    },
    "subjects": [
      {
        "id": "cgpsc_cg_gk",
        "name": "छत्तीसगढ़ सामान्य ज्ञान (CG GK — Paper 1 Part B)",
        "weightage": 100,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (50 Qs, 100 Marks)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "cgpsc_cg_gk_ch_1",
            "name": "छत्तीसगढ़ का इतिहास एवं स्वतंत्रता आंदोलन",
            "topics": [
              {
                "id": "cg_hist_1",
                "name": "Prehistoric Chhattisgarh",
                "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
                "subtopics": [
                  "शैलचित्र",
                  "पुरातात्विक साक्ष्य",
                  "प्रमुख स्थल"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_hist_2",
                "name": "Ancient Chhattisgarh",
                "nameHi": "प्राचीन छत्तीसगढ़",
                "subtopics": [
                  "दक्षिण कोसल",
                  "प्राचीन राजवंश",
                  "सांस्कृतिक विकास"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_3",
                "name": "Nanda & Maurya Period",
                "nameHi": "नंद एवं मौर्य काल",
                "subtopics": [
                  "मौर्य प्रशासन",
                  "अशोक",
                  "अभिलेख"
                ],
                "importanceScore": 8
              },
              {
                "id": "cg_hist_4",
                "name": "Satavahana Period",
                "nameHi": "सातवाहन काल",
                "subtopics": [
                  "शासन व्यवस्था",
                  "सांस्कृतिक प्रभाव"
                ],
                "importanceScore": 7
              },
              {
                "id": "cg_hist_5",
                "name": "Panduvanshi Dynasty",
                "nameHi": "पाण्डुवंश",
                "subtopics": [
                  "शासक",
                  "सिरपुर",
                  "धार्मिक योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_6",
                "name": "Somvanshi Dynasty",
                "nameHi": "सोमवंश",
                "subtopics": [
                  "राजनीतिक विस्तार",
                  "प्रमुख शासक"
                ],
                "importanceScore": 8
              },
              {
                "id": "cg_hist_7",
                "name": "Kalchuri Dynasty",
                "nameHi": "कलचुरी वंश",
                "subtopics": [
                  "रत्नपुर शाखा",
                  "रायपुर शाखा",
                  "सांस्कृतिक योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_8",
                "name": "Medieval Chhattisgarh",
                "nameHi": "मध्यकालीन छत्तीसगढ़",
                "subtopics": [
                  "क्षेत्रीय शासन",
                  "सामाजिक स्थिति"
                ],
                "importanceScore": 8
              },
              {
                "id": "cg_hist_9",
                "name": "Maratha Rule",
                "nameHi": "मराठा शासन",
                "subtopics": [
                  "भोंसले शासन",
                  "प्रशासन",
                  "राजस्व व्यवस्था"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_10",
                "name": "British Rule in Chhattisgarh",
                "nameHi": "छत्तीसगढ़ में ब्रिटिश शासन",
                "subtopics": [
                  "ब्रिटिश प्रशासन",
                  "राजनीतिक परिवर्तन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_11",
                "name": "1857 Revolt in Chhattisgarh",
                "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
                "subtopics": [
                  "वीर नारायण सिंह",
                  "स्थानीय आंदोलन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_12",
                "name": "Freedom Movement",
                "nameHi": "स्वतंत्रता आंदोलन",
                "subtopics": [
                  "असहयोग आंदोलन",
                  "भारत छोड़ो आंदोलन",
                  "स्थानीय योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_13",
                "name": "Formation of Chhattisgarh State",
                "nameHi": "छत्तीसगढ़ राज्य का गठन",
                "subtopics": [
                  "राज्य आंदोलन",
                  "1 नवम्बर 2000",
                  "प्रमुख व्यक्तित्व"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgpsc_cg_gk_ch_2",
            "name": "छत्तीसगढ़ का भूगोल, जलवायु, नदियां व वन संपदा",
            "topics": [
              {
                "id": "cg_geo_1",
                "name": "Location and Boundaries",
                "nameHi": "स्थिति एवं सीमाएँ",
                "subtopics": [
                  "अक्षांश",
                  "देशांतर",
                  "पड़ोसी राज्य"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_2",
                "name": "Physiographic Divisions",
                "nameHi": "भौतिक विभाजन",
                "subtopics": [
                  "मैदानी क्षेत्र",
                  "पठारी क्षेत्र",
                  "पर्वतीय क्षेत्र"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_3",
                "name": "Major Rivers",
                "nameHi": "प्रमुख नदियाँ",
                "subtopics": [
                  "महानदी",
                  "शिवनाथ",
                  "इंद्रावती",
                  "हसदेव",
                  "अरपा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_4",
                "name": "River Projects",
                "nameHi": "नदी घाटी परियोजनाएँ",
                "subtopics": [
                  "हसदेव बांगो",
                  "गंगरेल",
                  "मिनीमाता परियोजना"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_geo_5",
                "name": "Climate",
                "nameHi": "जलवायु",
                "subtopics": [
                  "मानसून",
                  "तापमान",
                  "वर्षा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_6",
                "name": "Soil Types",
                "nameHi": "मिट्टी के प्रकार",
                "subtopics": [
                  "काली मिट्टी",
                  "लाल मिट्टी",
                  "दोमट मिट्टी"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_7",
                "name": "Forest Resources",
                "nameHi": "वन संसाधन",
                "subtopics": [
                  "वन क्षेत्र",
                  "प्रमुख वृक्ष",
                  "लघु वनोपज"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_8",
                "name": "National Parks",
                "nameHi": "राष्ट्रीय उद्यान",
                "subtopics": [
                  "इंद्रावती",
                  "कांगेर घाटी",
                  "गुरु घासीदास"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_9",
                "name": "Wildlife Sanctuaries",
                "nameHi": "वन्यजीव अभयारण्य",
                "subtopics": [
                  "बारनवापारा",
                  "अचनकमार",
                  "सीतानदी"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_geo_10",
                "name": "Mineral Resources",
                "nameHi": "खनिज संसाधन",
                "subtopics": [
                  "कोयला",
                  "लौह अयस्क",
                  "बॉक्साइट",
                  "डोलोमाइट"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgpsc_cg_gk_ch_3",
            "name": "छत्तीसगढ़ की जनजातियाँ, कला, साहित्य एवं संस्कृति",
            "topics": [
              {
                "id": "cg_cul_1",
                "name": "Major Tribes",
                "nameHi": "प्रमुख जनजातियाँ",
                "subtopics": [
                  "गोंड",
                  "बैगा",
                  "हल्बा",
                  "उरांव",
                  "कंवर"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_2",
                "name": "Special Tribal Groups",
                "nameHi": "विशेष पिछड़ी जनजातियाँ",
                "subtopics": [
                  "अबूझमाड़िया",
                  "कमार",
                  "पहाड़ी कोरवा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_3",
                "name": "Folk Dances",
                "nameHi": "लोकनृत्य",
                "subtopics": [
                  "पंथी",
                  "राऊत नाचा",
                  "सुआ",
                  "करमा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_4",
                "name": "Folk Songs",
                "nameHi": "लोकगीत",
                "subtopics": [
                  "ददरिया",
                  "सुआ गीत",
                  "करमा गीत"
                ],
                "importanceScore": 8
              },
              {
                "id": "cg_cul_5",
                "name": "Festivals",
                "nameHi": "त्यौहार",
                "subtopics": [
                  "हरेली",
                  "पोला",
                  "तीजा",
                  "छेरछेरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_6",
                "name": "Fairs",
                "nameHi": "मेले",
                "subtopics": [
                  "राजिम कुंभ",
                  "बस्तर दशहरा",
                  "मड़ई"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_7",
                "name": "Handicrafts",
                "nameHi": "हस्तशिल्प",
                "subtopics": [
                  "ढोकरा कला",
                  "बेलमेटल",
                  "बाँस शिल्प"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_cul_8",
                "name": "Important Temples",
                "nameHi": "प्रमुख मंदिर",
                "subtopics": [
                  "बम्लेश्वरी",
                  "लक्ष्मण मंदिर",
                  "भोरमदेव"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_adv_1",
                "name": "Archaeological Sites",
                "nameHi": "पुरातात्विक स्थल",
                "subtopics": [
                  "सिरपुर",
                  "मल्हार",
                  "ताला",
                  "रतनपुर",
                  "राजिम"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_adv_2",
                "name": "Ancient Temples",
                "nameHi": "प्राचीन मंदिर",
                "subtopics": [
                  "लक्ष्मण मंदिर",
                  "भोरमदेव मंदिर",
                  "राजीव लोचन मंदिर",
                  "दंतेश्वरी मंदिर"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_adv_3",
                "name": "Tourist Places",
                "nameHi": "प्रमुख पर्यटन स्थल",
                "subtopics": [
                  "चित्रकोट",
                  "तीरथगढ़",
                  "चित्रधारा",
                  "मैत्री बाग",
                  "कुटुमसर गुफा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_adv_4",
                "name": "Waterfalls",
                "nameHi": "प्रमुख जलप्रपात",
                "subtopics": [
                  "चित्रकोट",
                  "तीरथगढ़",
                  "अमृतधारा",
                  "रामझरना",
                  "मंडवा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_adv_5",
                "name": "Caves",
                "nameHi": "गुफाएँ",
                "subtopics": [
                  "कुटुमसर",
                  "कैलाश गुफा",
                  "दंडक गुफा"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgpsc_cg_gk_ch_4",
            "name": "छत्तीसगढ़ का प्रशासनिक ढांचा, पंचायती राज एवं अर्थव्यवस्था",
            "topics": [
              {
                "id": "cg_eco_1",
                "name": "Agriculture",
                "nameHi": "कृषि",
                "subtopics": [
                  "धान उत्पादन",
                  "फसलें",
                  "कृषि योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_2",
                "name": "Industries",
                "nameHi": "उद्योग",
                "subtopics": [
                  "इस्पात उद्योग",
                  "सीमेंट उद्योग",
                  "विद्युत उद्योग"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_3",
                "name": "Energy Resources",
                "nameHi": "ऊर्जा संसाधन",
                "subtopics": [
                  "ताप विद्युत",
                  "जल विद्युत",
                  "सौर ऊर्जा"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_eco_4",
                "name": "Districts and Divisions",
                "nameHi": "जिले एवं संभाग",
                "subtopics": [
                  "सभी जिले",
                  "सभी संभाग"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_5",
                "name": "Panchayati Raj",
                "nameHi": "पंचायती राज",
                "subtopics": [
                  "त्रिस्तरीय व्यवस्था",
                  "ग्राम पंचायत",
                  "जनपद पंचायत",
                  "जिला पंचायत"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_6",
                "name": "Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन",
                  "कृषि योजनाएँ",
                  "शिक्षा योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_7",
                "name": "Important Personalities",
                "nameHi": "प्रमुख व्यक्तित्व",
                "subtopics": [
                  "वीर नारायण सिंह",
                  "मिनीमाता",
                  "पंडित सुंदरलाल शर्मा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_8",
                "name": "Current Affairs of Chhattisgarh",
                "nameHi": "छत्तीसगढ़ समसामयिकी",
                "subtopics": [
                  "नवीन योजनाएँ",
                  "नियुक्तियाँ",
                  "राज्य पुरस्कार",
                  "खेल"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_cg_1",
                "name": "State Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन योजना",
                  "कृषि योजनाएँ",
                  "युवा योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_cg_2",
                "name": "State Budget",
                "nameHi": "छत्तीसगढ़ बजट",
                "subtopics": [
                  "मुख्य घोषणाएँ",
                  "राजस्व",
                  "व्यय"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_cg_3",
                "name": "State Appointments",
                "nameHi": "राज्य स्तरीय नियुक्तियाँ",
                "subtopics": [
                  "मुख्य सचिव",
                  "DGP",
                  "राज्य आयोग"
                ],
                "importanceScore": 9
              },
              {
                "id": "ca_cg_4",
                "name": "Chhattisgarh Current Events",
                "nameHi": "छत्तीसगढ़ की वर्तमान घटनाएँ",
                "subtopics": [
                  "नई परियोजनाएँ",
                  "उद्योग",
                  "पुरस्कार",
                  "खेल"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "cg_hist_1",
            "name": "Prehistoric Chhattisgarh",
            "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
            "subtopics": [
              "शैलचित्र",
              "पुरातात्विक साक्ष्य",
              "प्रमुख स्थल"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_hist_2",
            "name": "Ancient Chhattisgarh",
            "nameHi": "प्राचीन छत्तीसगढ़",
            "subtopics": [
              "दक्षिण कोसल",
              "प्राचीन राजवंश",
              "सांस्कृतिक विकास"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_3",
            "name": "Nanda & Maurya Period",
            "nameHi": "नंद एवं मौर्य काल",
            "subtopics": [
              "मौर्य प्रशासन",
              "अशोक",
              "अभिलेख"
            ],
            "importanceScore": 8
          },
          {
            "id": "cg_hist_4",
            "name": "Satavahana Period",
            "nameHi": "सातवाहन काल",
            "subtopics": [
              "शासन व्यवस्था",
              "सांस्कृतिक प्रभाव"
            ],
            "importanceScore": 7
          },
          {
            "id": "cg_hist_5",
            "name": "Panduvanshi Dynasty",
            "nameHi": "पाण्डुवंश",
            "subtopics": [
              "शासक",
              "सिरपुर",
              "धार्मिक योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_6",
            "name": "Somvanshi Dynasty",
            "nameHi": "सोमवंश",
            "subtopics": [
              "राजनीतिक विस्तार",
              "प्रमुख शासक"
            ],
            "importanceScore": 8
          },
          {
            "id": "cg_hist_7",
            "name": "Kalchuri Dynasty",
            "nameHi": "कलचुरी वंश",
            "subtopics": [
              "रत्नपुर शाखा",
              "रायपुर शाखा",
              "सांस्कृतिक योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_8",
            "name": "Medieval Chhattisgarh",
            "nameHi": "मध्यकालीन छत्तीसगढ़",
            "subtopics": [
              "क्षेत्रीय शासन",
              "सामाजिक स्थिति"
            ],
            "importanceScore": 8
          },
          {
            "id": "cg_hist_9",
            "name": "Maratha Rule",
            "nameHi": "मराठा शासन",
            "subtopics": [
              "भोंसले शासन",
              "प्रशासन",
              "राजस्व व्यवस्था"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_10",
            "name": "British Rule in Chhattisgarh",
            "nameHi": "छत्तीसगढ़ में ब्रिटिश शासन",
            "subtopics": [
              "ब्रिटिश प्रशासन",
              "राजनीतिक परिवर्तन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_11",
            "name": "1857 Revolt in Chhattisgarh",
            "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
            "subtopics": [
              "वीर नारायण सिंह",
              "स्थानीय आंदोलन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_12",
            "name": "Freedom Movement",
            "nameHi": "स्वतंत्रता आंदोलन",
            "subtopics": [
              "असहयोग आंदोलन",
              "भारत छोड़ो आंदोलन",
              "स्थानीय योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_13",
            "name": "Formation of Chhattisgarh State",
            "nameHi": "छत्तीसगढ़ राज्य का गठन",
            "subtopics": [
              "राज्य आंदोलन",
              "1 नवम्बर 2000",
              "प्रमुख व्यक्तित्व"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_1",
            "name": "Location and Boundaries",
            "nameHi": "स्थिति एवं सीमाएँ",
            "subtopics": [
              "अक्षांश",
              "देशांतर",
              "पड़ोसी राज्य"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_2",
            "name": "Physiographic Divisions",
            "nameHi": "भौतिक विभाजन",
            "subtopics": [
              "मैदानी क्षेत्र",
              "पठारी क्षेत्र",
              "पर्वतीय क्षेत्र"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_3",
            "name": "Major Rivers",
            "nameHi": "प्रमुख नदियाँ",
            "subtopics": [
              "महानदी",
              "शिवनाथ",
              "इंद्रावती",
              "हसदेव",
              "अरपा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_4",
            "name": "River Projects",
            "nameHi": "नदी घाटी परियोजनाएँ",
            "subtopics": [
              "हसदेव बांगो",
              "गंगरेल",
              "मिनीमाता परियोजना"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_geo_5",
            "name": "Climate",
            "nameHi": "जलवायु",
            "subtopics": [
              "मानसून",
              "तापमान",
              "वर्षा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_6",
            "name": "Soil Types",
            "nameHi": "मिट्टी के प्रकार",
            "subtopics": [
              "काली मिट्टी",
              "लाल मिट्टी",
              "दोमट मिट्टी"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_7",
            "name": "Forest Resources",
            "nameHi": "वन संसाधन",
            "subtopics": [
              "वन क्षेत्र",
              "प्रमुख वृक्ष",
              "लघु वनोपज"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_8",
            "name": "National Parks",
            "nameHi": "राष्ट्रीय उद्यान",
            "subtopics": [
              "इंद्रावती",
              "कांगेर घाटी",
              "गुरु घासीदास"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_9",
            "name": "Wildlife Sanctuaries",
            "nameHi": "वन्यजीव अभयारण्य",
            "subtopics": [
              "बारनवापारा",
              "अचनकमार",
              "सीतानदी"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_geo_10",
            "name": "Mineral Resources",
            "nameHi": "खनिज संसाधन",
            "subtopics": [
              "कोयला",
              "लौह अयस्क",
              "बॉक्साइट",
              "डोलोमाइट"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_1",
            "name": "Major Tribes",
            "nameHi": "प्रमुख जनजातियाँ",
            "subtopics": [
              "गोंड",
              "बैगा",
              "हल्बा",
              "उरांव",
              "कंवर"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_2",
            "name": "Special Tribal Groups",
            "nameHi": "विशेष पिछड़ी जनजातियाँ",
            "subtopics": [
              "अबूझमाड़िया",
              "कमार",
              "पहाड़ी कोरवा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_3",
            "name": "Folk Dances",
            "nameHi": "लोकनृत्य",
            "subtopics": [
              "पंथी",
              "राऊत नाचा",
              "सुआ",
              "करमा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_4",
            "name": "Folk Songs",
            "nameHi": "लोकगीत",
            "subtopics": [
              "ददरिया",
              "सुआ गीत",
              "करमा गीत"
            ],
            "importanceScore": 8
          },
          {
            "id": "cg_cul_5",
            "name": "Festivals",
            "nameHi": "त्यौहार",
            "subtopics": [
              "हरेली",
              "पोला",
              "तीजा",
              "छेरछेरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_6",
            "name": "Fairs",
            "nameHi": "मेले",
            "subtopics": [
              "राजिम कुंभ",
              "बस्तर दशहरा",
              "मड़ई"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_7",
            "name": "Handicrafts",
            "nameHi": "हस्तशिल्प",
            "subtopics": [
              "ढोकरा कला",
              "बेलमेटल",
              "बाँस शिल्प"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_cul_8",
            "name": "Important Temples",
            "nameHi": "प्रमुख मंदिर",
            "subtopics": [
              "बम्लेश्वरी",
              "लक्ष्मण मंदिर",
              "भोरमदेव"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_adv_1",
            "name": "Archaeological Sites",
            "nameHi": "पुरातात्विक स्थल",
            "subtopics": [
              "सिरपुर",
              "मल्हार",
              "ताला",
              "रतनपुर",
              "राजिम"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_adv_2",
            "name": "Ancient Temples",
            "nameHi": "प्राचीन मंदिर",
            "subtopics": [
              "लक्ष्मण मंदिर",
              "भोरमदेव मंदिर",
              "राजीव लोचन मंदिर",
              "दंतेश्वरी मंदिर"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_adv_3",
            "name": "Tourist Places",
            "nameHi": "प्रमुख पर्यटन स्थल",
            "subtopics": [
              "चित्रकोट",
              "तीरथगढ़",
              "चित्रधारा",
              "मैत्री बाग",
              "कुटुमसर गुफा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_adv_4",
            "name": "Waterfalls",
            "nameHi": "प्रमुख जलप्रपात",
            "subtopics": [
              "चित्रकोट",
              "तीरथगढ़",
              "अमृतधारा",
              "रामझरना",
              "मंडवा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_adv_5",
            "name": "Caves",
            "nameHi": "गुफाएँ",
            "subtopics": [
              "कुटुमसर",
              "कैलाश गुफा",
              "दंडक गुफा"
            ],
            "importanceScore": 8
          },
          {
            "id": "cg_eco_1",
            "name": "Agriculture",
            "nameHi": "कृषि",
            "subtopics": [
              "धान उत्पादन",
              "फसलें",
              "कृषि योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_2",
            "name": "Industries",
            "nameHi": "उद्योग",
            "subtopics": [
              "इस्पात उद्योग",
              "सीमेंट उद्योग",
              "विद्युत उद्योग"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_3",
            "name": "Energy Resources",
            "nameHi": "ऊर्जा संसाधन",
            "subtopics": [
              "ताप विद्युत",
              "जल विद्युत",
              "सौर ऊर्जा"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_eco_4",
            "name": "Districts and Divisions",
            "nameHi": "जिले एवं संभाग",
            "subtopics": [
              "सभी जिले",
              "सभी संभाग"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_5",
            "name": "Panchayati Raj",
            "nameHi": "पंचायती राज",
            "subtopics": [
              "त्रिस्तरीय व्यवस्था",
              "ग्राम पंचायत",
              "जनपद पंचायत",
              "जिला पंचायत"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_6",
            "name": "Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन",
              "कृषि योजनाएँ",
              "शिक्षा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_7",
            "name": "Important Personalities",
            "nameHi": "प्रमुख व्यक्तित्व",
            "subtopics": [
              "वीर नारायण सिंह",
              "मिनीमाता",
              "पंडित सुंदरलाल शर्मा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_8",
            "name": "Current Affairs of Chhattisgarh",
            "nameHi": "छत्तीसगढ़ समसामयिकी",
            "subtopics": [
              "नवीन योजनाएँ",
              "नियुक्तियाँ",
              "राज्य पुरस्कार",
              "खेल"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_cg_1",
            "name": "State Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन योजना",
              "कृषि योजनाएँ",
              "युवा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_cg_2",
            "name": "State Budget",
            "nameHi": "छत्तीसगढ़ बजट",
            "subtopics": [
              "मुख्य घोषणाएँ",
              "राजस्व",
              "व्यय"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_cg_3",
            "name": "State Appointments",
            "nameHi": "राज्य स्तरीय नियुक्तियाँ",
            "subtopics": [
              "मुख्य सचिव",
              "DGP",
              "राज्य आयोग"
            ],
            "importanceScore": 9
          },
          {
            "id": "ca_cg_4",
            "name": "Chhattisgarh Current Events",
            "nameHi": "छत्तीसगढ़ की वर्तमान घटनाएँ",
            "subtopics": [
              "नई परियोजनाएँ",
              "उद्योग",
              "पुरस्कार",
              "खेल"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "cgpsc_india_gs",
        "name": "भारत का सामान्य अध्ययन (India GS — Paper 1 Part A)",
        "weightage": 100,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (50 Qs, 100 Marks)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgpsc_india_gs_ch_1",
            "name": "भारतीय इतिहास एवं राष्ट्रीय आंदोलन",
            "topics": [
              {
                "id": "ind_hist_1",
                "name": "Indus Valley Civilization",
                "nameHi": "सिंधु घाटी सभ्यता",
                "subtopics": [
                  "हड़प्पा",
                  "मोहनजोदड़ो",
                  "लोथल",
                  "कालीबंगन",
                  "धौलावीरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_hist_2",
                "name": "Vedic Civilization",
                "nameHi": "वैदिक सभ्यता",
                "subtopics": [
                  "ऋग्वैदिक काल",
                  "उत्तर वैदिक काल",
                  "वैदिक समाज",
                  "वैदिक अर्थव्यवस्था"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_hist_3",
                "name": "Mahajanapadas",
                "nameHi": "महाजनपद",
                "subtopics": [
                  "16 महाजनपद",
                  "मगध का उदय"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_hist_4",
                "name": "Buddhism",
                "nameHi": "बौद्ध धर्म",
                "subtopics": [
                  "गौतम बुद्ध",
                  "चार आर्य सत्य",
                  "बौद्ध संगीति"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_hist_5",
                "name": "Jainism",
                "nameHi": "जैन धर्म",
                "subtopics": [
                  "महावीर स्वामी",
                  "त्रिरत्न",
                  "जैन संगीति"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_hist_6",
                "name": "Maurya Empire",
                "nameHi": "मौर्य साम्राज्य",
                "subtopics": [
                  "चंद्रगुप्त मौर्य",
                  "अशोक",
                  "मेगस्थनीज"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_hist_7",
                "name": "Gupta Empire",
                "nameHi": "गुप्त साम्राज्य",
                "subtopics": [
                  "समुद्रगुप्त",
                  "चंद्रगुप्त द्वितीय",
                  "स्वर्ण युग"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_hist_8",
                "name": "Sangam Age",
                "nameHi": "संगम काल",
                "subtopics": [
                  "चोल",
                  "चेर",
                  "पांड्य"
                ],
                "importanceScore": 7
              },
              {
                "id": "ind_med_1",
                "name": "Delhi Sultanate",
                "nameHi": "दिल्ली सल्तनत",
                "subtopics": [
                  "गुलाम वंश",
                  "खिलजी वंश",
                  "तुगलक वंश",
                  "लोदी वंश"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_med_2",
                "name": "Mughal Empire",
                "nameHi": "मुगल साम्राज्य",
                "subtopics": [
                  "बाबर",
                  "अकबर",
                  "जहाँगीर",
                  "शाहजहाँ",
                  "औरंगजेब"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_med_3",
                "name": "Bhakti Movement",
                "nameHi": "भक्ति आंदोलन",
                "subtopics": [
                  "कबीर",
                  "तुलसीदास",
                  "रामानंद",
                  "चैतन्य"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_med_4",
                "name": "Sufi Movement",
                "nameHi": "सूफी आंदोलन",
                "subtopics": [
                  "चिश्ती संप्रदाय",
                  "सुहरावर्दी संप्रदाय"
                ],
                "importanceScore": 8
              },
              {
                "id": "ind_mod_1",
                "name": "Arrival of Europeans",
                "nameHi": "यूरोपियों का आगमन",
                "subtopics": [
                  "पुर्तगाली",
                  "डच",
                  "फ्रांसीसी",
                  "अंग्रेज"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_2",
                "name": "British Expansion",
                "nameHi": "ब्रिटिश साम्राज्य का विस्तार",
                "subtopics": [
                  "प्लासी का युद्ध",
                  "बक्सर का युद्ध",
                  "सहायक संधि"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_3",
                "name": "Revolt of 1857",
                "nameHi": "1857 का विद्रोह",
                "subtopics": [
                  "कारण",
                  "नेता",
                  "परिणाम"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_4",
                "name": "Indian National Congress",
                "nameHi": "भारतीय राष्ट्रीय कांग्रेस",
                "subtopics": [
                  "स्थापना",
                  "उदारवादी",
                  "उग्रवादी"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_5",
                "name": "Gandhian Movements",
                "nameHi": "गांधीवादी आंदोलन",
                "subtopics": [
                  "असहयोग",
                  "सविनय अवज्ञा",
                  "भारत छोड़ो"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_6",
                "name": "Revolutionary Movement",
                "nameHi": "क्रांतिकारी आंदोलन",
                "subtopics": [
                  "भगत सिंह",
                  "चंद्रशेखर आजाद",
                  "सुभाषचंद्र बोस"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_mod_7",
                "name": "Constitution Making",
                "nameHi": "संविधान निर्माण",
                "subtopics": [
                  "संविधान सभा",
                  "प्रारूप समिति",
                  "डॉ. बी.आर. अंबेडकर"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgpsc_india_gs_ch_2",
            "name": "भारत एवं विश्व का भूगोल",
            "topics": [
              {
                "id": "ind_geo_1",
                "name": "Physical Geography of India",
                "nameHi": "भारत का भौतिक भूगोल",
                "subtopics": [
                  "हिमालय",
                  "उत्तरी मैदान",
                  "दक्कन का पठार",
                  "तटीय मैदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_2",
                "name": "Rivers of India",
                "nameHi": "भारत की नदियाँ",
                "subtopics": [
                  "गंगा",
                  "यमुना",
                  "ब्रह्मपुत्र",
                  "गोदावरी",
                  "नर्मदा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_3",
                "name": "Climate",
                "nameHi": "भारत की जलवायु",
                "subtopics": [
                  "मानसून",
                  "वर्षा",
                  "ऋतुएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_4",
                "name": "Soils",
                "nameHi": "भारत की मिट्टियाँ",
                "subtopics": [
                  "जलोढ़",
                  "काली",
                  "लाल",
                  "लेटराइट"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_geo_5",
                "name": "National Parks and Biosphere Reserves",
                "nameHi": "राष्ट्रीय उद्यान एवं जैवमंडल",
                "subtopics": [
                  "जिम कॉर्बेट",
                  "काजीरंगा",
                  "सुंदरवन"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_adv_geo_1",
                "name": "Earth and Solar System",
                "nameHi": "पृथ्वी एवं सौरमंडल",
                "subtopics": [
                  "ग्रह",
                  "उपग्रह",
                  "ग्रहण",
                  "ऋतुएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_adv_geo_2",
                "name": "Latitudes and Longitudes",
                "nameHi": "अक्षांश एवं देशांतर",
                "subtopics": [
                  "कर्क रेखा",
                  "भूमध्य रेखा",
                  "ग्रीनविच रेखा"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_adv_geo_3",
                "name": "Continents and Oceans",
                "nameHi": "महाद्वीप एवं महासागर",
                "subtopics": [
                  "सात महाद्वीप",
                  "पाँच महासागर"
                ],
                "importanceScore": 8
              },
              {
                "id": "ind_adv_geo_4",
                "name": "Major Deserts and Grasslands",
                "nameHi": "प्रमुख मरुस्थल एवं घासभूमियाँ",
                "subtopics": [
                  "सहारा",
                  "गोबी",
                  "प्रेयरी",
                  "स्टेपी"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgpsc_india_gs_ch_3",
            "name": "भारतीय संविधान एवं राजव्यवस्था",
            "topics": [
              {
                "id": "ind_pol_1",
                "name": "Constitution",
                "nameHi": "भारतीय संविधान",
                "subtopics": [
                  "विशेषताएँ",
                  "प्रस्तावना",
                  "संशोधन"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_2",
                "name": "Fundamental Rights",
                "nameHi": "मौलिक अधिकार",
                "subtopics": [
                  "अनुच्छेद 12-35"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_3",
                "name": "Directive Principles",
                "nameHi": "राज्य नीति के निदेशक तत्व",
                "subtopics": [
                  "भाग-4"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_pol_4",
                "name": "Fundamental Duties",
                "nameHi": "मौलिक कर्तव्य",
                "subtopics": [
                  "42वाँ संशोधन"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_pol_5",
                "name": "Parliament",
                "nameHi": "संसद",
                "subtopics": [
                  "लोकसभा",
                  "राज्यसभा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_6",
                "name": "President and Vice President",
                "nameHi": "राष्ट्रपति एवं उपराष्ट्रपति",
                "subtopics": [
                  "चुनाव",
                  "शक्तियाँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_7",
                "name": "Prime Minister and Council of Ministers",
                "nameHi": "प्रधानमंत्री एवं मंत्रिपरिषद",
                "subtopics": [
                  "कार्य",
                  "उत्तरदायित्व"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_8",
                "name": "Supreme Court",
                "nameHi": "सर्वोच्च न्यायालय",
                "subtopics": [
                  "संरचना",
                  "अधिकार क्षेत्र"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgpsc_india_gs_ch_4",
            "name": "भारतीय अर्थव्यवस्था एवं नियोजन",
            "topics": [
              {
                "id": "ind_eco_1",
                "name": "Basic Economics",
                "nameHi": "अर्थशास्त्र की मूल अवधारणाएँ",
                "subtopics": [
                  "GDP",
                  "GNP",
                  "NNP",
                  "NITI Aayog"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_eco_2",
                "name": "Banking System",
                "nameHi": "बैंकिंग प्रणाली",
                "subtopics": [
                  "RBI",
                  "मौद्रिक नीति",
                  "वाणिज्यिक बैंक"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_eco_3",
                "name": "Budget and Taxation",
                "nameHi": "बजट एवं कराधान",
                "subtopics": [
                  "GST",
                  "प्रत्यक्ष कर",
                  "अप्रत्यक्ष कर"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_eco_4",
                "name": "Inflation",
                "nameHi": "मुद्रास्फीति",
                "subtopics": [
                  "WPI",
                  "CPI"
                ],
                "importanceScore": 9
              },
              {
                "id": "ca_eco_1",
                "name": "Union Budget",
                "nameHi": "केंद्रीय बजट",
                "subtopics": [
                  "Budget Highlights",
                  "Tax Reforms"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_eco_2",
                "name": "RBI and Monetary Policy",
                "nameHi": "RBI एवं मौद्रिक नीति",
                "subtopics": [
                  "Repo Rate",
                  "Reverse Repo Rate",
                  "CRR",
                  "SLR"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgpsc_india_gs_ch_5",
            "name": "सामान्य विज्ञान एवं प्रौद्योगिकी",
            "topics": [
              {
                "id": "phy_1",
                "name": "Physical Quantities and Units",
                "nameHi": "भौतिक राशियाँ एवं मात्रक",
                "subtopics": [
                  "SI Units",
                  "Derived Units",
                  "Measurement"
                ],
                "importanceScore": 10
              },
              {
                "id": "phy_4",
                "name": "Work, Power and Energy",
                "nameHi": "कार्य, शक्ति एवं ऊर्जा",
                "subtopics": [
                  "Kinetic Energy",
                  "Potential Energy",
                  "Power"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_1",
                "name": "Matter and Its Nature",
                "nameHi": "पदार्थ एवं उसकी प्रकृति",
                "subtopics": [
                  "States of Matter",
                  "Properties"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_5",
                "name": "Acids, Bases and Salts",
                "nameHi": "अम्ल, क्षार एवं लवण",
                "subtopics": [
                  "pH Scale",
                  "Indicators"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_1",
                "name": "Cell",
                "nameHi": "कोशिका",
                "subtopics": [
                  "Cell Structure",
                  "Cell Organelles"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_9",
                "name": "Nutrition",
                "nameHi": "पोषण",
                "subtopics": [
                  "Vitamins",
                  "Minerals",
                  "Balanced Diet"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_10",
                "name": "Diseases",
                "nameHi": "रोग",
                "subtopics": [
                  "Bacterial",
                  "Viral",
                  "Deficiency Diseases"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_sci_1",
                "name": "Space Missions",
                "nameHi": "अंतरिक्ष मिशन",
                "subtopics": [
                  "ISRO",
                  "Chandrayaan",
                  "Gaganyaan",
                  "Aditya L1"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_sci_2",
                "name": "Defence Technology",
                "nameHi": "रक्षा प्रौद्योगिकी",
                "subtopics": [
                  "Missiles",
                  "Defence Exercises"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgpsc_india_gs_ch_6",
            "name": "पर्यावरण, जैव विविधता एवं समसामयिकी",
            "topics": [
              {
                "id": "env_1",
                "name": "Ecosystem",
                "nameHi": "पारिस्थितिकी तंत्र",
                "subtopics": [
                  "Food Chain",
                  "Food Web"
                ],
                "importanceScore": 10
              },
              {
                "id": "env_2",
                "name": "Biodiversity",
                "nameHi": "जैव विविधता",
                "subtopics": [
                  "Conservation",
                  "Hotspots"
                ],
                "importanceScore": 10
              },
              {
                "id": "env_3",
                "name": "Environmental Pollution",
                "nameHi": "पर्यावरण प्रदूषण",
                "subtopics": [
                  "Air",
                  "Water",
                  "Soil",
                  "Noise"
                ],
                "importanceScore": 10
              },
              {
                "id": "env_4",
                "name": "Climate Change",
                "nameHi": "जलवायु परिवर्तन",
                "subtopics": [
                  "Global Warming",
                  "Greenhouse Effect"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_nat_1",
                "name": "Government Schemes",
                "nameHi": "केंद्र सरकार की योजनाएँ",
                "subtopics": [
                  "PM Kisan",
                  "PM Awas Yojana",
                  "Ayushman Bharat",
                  "Jal Jeevan Mission",
                  "PM Vishwakarma"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_nat_3",
                "name": "Appointments",
                "nameHi": "महत्वपूर्ण नियुक्तियाँ",
                "subtopics": [
                  "राष्ट्रपति",
                  "राज्यपाल",
                  "मुख्य न्यायाधीश",
                  "सेना प्रमुख"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_nat_4",
                "name": "Reports and Indexes",
                "nameHi": "रिपोर्ट एवं सूचकांक",
                "subtopics": [
                  "HDI",
                  "Global Hunger Index",
                  "World Happiness Report"
                ],
                "importanceScore": 9
              },
              {
                "id": "ca_int_1",
                "name": "International Organizations",
                "nameHi": "अंतरराष्ट्रीय संगठन",
                "subtopics": [
                  "UNO",
                  "WHO",
                  "IMF",
                  "World Bank",
                  "WTO"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_sports_1",
                "name": "National Sports Events",
                "nameHi": "राष्ट्रीय खेल आयोजन",
                "subtopics": [
                  "Khelo India",
                  "National Games"
                ],
                "importanceScore": 8
              },
              {
                "id": "ca_award_1",
                "name": "National Awards",
                "nameHi": "राष्ट्रीय पुरस्कार",
                "subtopics": [
                  "Bharat Ratna",
                  "Padma Awards"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "ind_hist_1",
            "name": "Indus Valley Civilization",
            "nameHi": "सिंधु घाटी सभ्यता",
            "subtopics": [
              "हड़प्पा",
              "मोहनजोदड़ो",
              "लोथल",
              "कालीबंगन",
              "धौलावीरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_2",
            "name": "Vedic Civilization",
            "nameHi": "वैदिक सभ्यता",
            "subtopics": [
              "ऋग्वैदिक काल",
              "उत्तर वैदिक काल",
              "वैदिक समाज",
              "वैदिक अर्थव्यवस्था"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_3",
            "name": "Mahajanapadas",
            "nameHi": "महाजनपद",
            "subtopics": [
              "16 महाजनपद",
              "मगध का उदय"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_hist_4",
            "name": "Buddhism",
            "nameHi": "बौद्ध धर्म",
            "subtopics": [
              "गौतम बुद्ध",
              "चार आर्य सत्य",
              "बौद्ध संगीति"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_5",
            "name": "Jainism",
            "nameHi": "जैन धर्म",
            "subtopics": [
              "महावीर स्वामी",
              "त्रिरत्न",
              "जैन संगीति"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_hist_6",
            "name": "Maurya Empire",
            "nameHi": "मौर्य साम्राज्य",
            "subtopics": [
              "चंद्रगुप्त मौर्य",
              "अशोक",
              "मेगस्थनीज"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_7",
            "name": "Gupta Empire",
            "nameHi": "गुप्त साम्राज्य",
            "subtopics": [
              "समुद्रगुप्त",
              "चंद्रगुप्त द्वितीय",
              "स्वर्ण युग"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_8",
            "name": "Sangam Age",
            "nameHi": "संगम काल",
            "subtopics": [
              "चोल",
              "चेर",
              "पांड्य"
            ],
            "importanceScore": 7
          },
          {
            "id": "ind_med_1",
            "name": "Delhi Sultanate",
            "nameHi": "दिल्ली सल्तनत",
            "subtopics": [
              "गुलाम वंश",
              "खिलजी वंश",
              "तुगलक वंश",
              "लोदी वंश"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_med_2",
            "name": "Mughal Empire",
            "nameHi": "मुगल साम्राज्य",
            "subtopics": [
              "बाबर",
              "अकबर",
              "जहाँगीर",
              "शाहजहाँ",
              "औरंगजेब"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_med_3",
            "name": "Bhakti Movement",
            "nameHi": "भक्ति आंदोलन",
            "subtopics": [
              "कबीर",
              "तुलसीदास",
              "रामानंद",
              "चैतन्य"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_med_4",
            "name": "Sufi Movement",
            "nameHi": "सूफी आंदोलन",
            "subtopics": [
              "चिश्ती संप्रदाय",
              "सुहरावर्दी संप्रदाय"
            ],
            "importanceScore": 8
          },
          {
            "id": "ind_mod_1",
            "name": "Arrival of Europeans",
            "nameHi": "यूरोपियों का आगमन",
            "subtopics": [
              "पुर्तगाली",
              "डच",
              "फ्रांसीसी",
              "अंग्रेज"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_2",
            "name": "British Expansion",
            "nameHi": "ब्रिटिश साम्राज्य का विस्तार",
            "subtopics": [
              "प्लासी का युद्ध",
              "बक्सर का युद्ध",
              "सहायक संधि"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_3",
            "name": "Revolt of 1857",
            "nameHi": "1857 का विद्रोह",
            "subtopics": [
              "कारण",
              "नेता",
              "परिणाम"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_4",
            "name": "Indian National Congress",
            "nameHi": "भारतीय राष्ट्रीय कांग्रेस",
            "subtopics": [
              "स्थापना",
              "उदारवादी",
              "उग्रवादी"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_5",
            "name": "Gandhian Movements",
            "nameHi": "गांधीवादी आंदोलन",
            "subtopics": [
              "असहयोग",
              "सविनय अवज्ञा",
              "भारत छोड़ो"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_6",
            "name": "Revolutionary Movement",
            "nameHi": "क्रांतिकारी आंदोलन",
            "subtopics": [
              "भगत सिंह",
              "चंद्रशेखर आजाद",
              "सुभाषचंद्र बोस"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_mod_7",
            "name": "Constitution Making",
            "nameHi": "संविधान निर्माण",
            "subtopics": [
              "संविधान सभा",
              "प्रारूप समिति",
              "डॉ. बी.आर. अंबेडकर"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_1",
            "name": "Physical Geography of India",
            "nameHi": "भारत का भौतिक भूगोल",
            "subtopics": [
              "हिमालय",
              "उत्तरी मैदान",
              "दक्कन का पठार",
              "तटीय मैदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_2",
            "name": "Rivers of India",
            "nameHi": "भारत की नदियाँ",
            "subtopics": [
              "गंगा",
              "यमुना",
              "ब्रह्मपुत्र",
              "गोदावरी",
              "नर्मदा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_3",
            "name": "Climate",
            "nameHi": "भारत की जलवायु",
            "subtopics": [
              "मानसून",
              "वर्षा",
              "ऋतुएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_4",
            "name": "Soils",
            "nameHi": "भारत की मिट्टियाँ",
            "subtopics": [
              "जलोढ़",
              "काली",
              "लाल",
              "लेटराइट"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_geo_5",
            "name": "National Parks and Biosphere Reserves",
            "nameHi": "राष्ट्रीय उद्यान एवं जैवमंडल",
            "subtopics": [
              "जिम कॉर्बेट",
              "काजीरंगा",
              "सुंदरवन"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_adv_geo_1",
            "name": "Earth and Solar System",
            "nameHi": "पृथ्वी एवं सौरमंडल",
            "subtopics": [
              "ग्रह",
              "उपग्रह",
              "ग्रहण",
              "ऋतुएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_adv_geo_2",
            "name": "Latitudes and Longitudes",
            "nameHi": "अक्षांश एवं देशांतर",
            "subtopics": [
              "कर्क रेखा",
              "भूमध्य रेखा",
              "ग्रीनविच रेखा"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_adv_geo_3",
            "name": "Continents and Oceans",
            "nameHi": "महाद्वीप एवं महासागर",
            "subtopics": [
              "सात महाद्वीप",
              "पाँच महासागर"
            ],
            "importanceScore": 8
          },
          {
            "id": "ind_adv_geo_4",
            "name": "Major Deserts and Grasslands",
            "nameHi": "प्रमुख मरुस्थल एवं घासभूमियाँ",
            "subtopics": [
              "सहारा",
              "गोबी",
              "प्रेयरी",
              "स्टेपी"
            ],
            "importanceScore": 8
          },
          {
            "id": "ind_pol_1",
            "name": "Constitution",
            "nameHi": "भारतीय संविधान",
            "subtopics": [
              "विशेषताएँ",
              "प्रस्तावना",
              "संशोधन"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_2",
            "name": "Fundamental Rights",
            "nameHi": "मौलिक अधिकार",
            "subtopics": [
              "अनुच्छेद 12-35"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_3",
            "name": "Directive Principles",
            "nameHi": "राज्य नीति के निदेशक तत्व",
            "subtopics": [
              "भाग-4"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_pol_4",
            "name": "Fundamental Duties",
            "nameHi": "मौलिक कर्तव्य",
            "subtopics": [
              "42वाँ संशोधन"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_pol_5",
            "name": "Parliament",
            "nameHi": "संसद",
            "subtopics": [
              "लोकसभा",
              "राज्यसभा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_6",
            "name": "President and Vice President",
            "nameHi": "राष्ट्रपति एवं उपराष्ट्रपति",
            "subtopics": [
              "चुनाव",
              "शक्तियाँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_7",
            "name": "Prime Minister and Council of Ministers",
            "nameHi": "प्रधानमंत्री एवं मंत्रिपरिषद",
            "subtopics": [
              "कार्य",
              "उत्तरदायित्व"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_8",
            "name": "Supreme Court",
            "nameHi": "सर्वोच्च न्यायालय",
            "subtopics": [
              "संरचना",
              "अधिकार क्षेत्र"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_eco_1",
            "name": "Basic Economics",
            "nameHi": "अर्थशास्त्र की मूल अवधारणाएँ",
            "subtopics": [
              "GDP",
              "GNP",
              "NNP",
              "NITI Aayog"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_eco_2",
            "name": "Banking System",
            "nameHi": "बैंकिंग प्रणाली",
            "subtopics": [
              "RBI",
              "मौद्रिक नीति",
              "वाणिज्यिक बैंक"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_eco_3",
            "name": "Budget and Taxation",
            "nameHi": "बजट एवं कराधान",
            "subtopics": [
              "GST",
              "प्रत्यक्ष कर",
              "अप्रत्यक्ष कर"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_eco_4",
            "name": "Inflation",
            "nameHi": "मुद्रास्फीति",
            "subtopics": [
              "WPI",
              "CPI"
            ],
            "importanceScore": 9
          },
          {
            "id": "ca_eco_1",
            "name": "Union Budget",
            "nameHi": "केंद्रीय बजट",
            "subtopics": [
              "Budget Highlights",
              "Tax Reforms"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_eco_2",
            "name": "RBI and Monetary Policy",
            "nameHi": "RBI एवं मौद्रिक नीति",
            "subtopics": [
              "Repo Rate",
              "Reverse Repo Rate",
              "CRR",
              "SLR"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_1",
            "name": "Physical Quantities and Units",
            "nameHi": "भौतिक राशियाँ एवं मात्रक",
            "subtopics": [
              "SI Units",
              "Derived Units",
              "Measurement"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_4",
            "name": "Work, Power and Energy",
            "nameHi": "कार्य, शक्ति एवं ऊर्जा",
            "subtopics": [
              "Kinetic Energy",
              "Potential Energy",
              "Power"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_1",
            "name": "Matter and Its Nature",
            "nameHi": "पदार्थ एवं उसकी प्रकृति",
            "subtopics": [
              "States of Matter",
              "Properties"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_5",
            "name": "Acids, Bases and Salts",
            "nameHi": "अम्ल, क्षार एवं लवण",
            "subtopics": [
              "pH Scale",
              "Indicators"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_1",
            "name": "Cell",
            "nameHi": "कोशिका",
            "subtopics": [
              "Cell Structure",
              "Cell Organelles"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_9",
            "name": "Nutrition",
            "nameHi": "पोषण",
            "subtopics": [
              "Vitamins",
              "Minerals",
              "Balanced Diet"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_10",
            "name": "Diseases",
            "nameHi": "रोग",
            "subtopics": [
              "Bacterial",
              "Viral",
              "Deficiency Diseases"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_sci_1",
            "name": "Space Missions",
            "nameHi": "अंतरिक्ष मिशन",
            "subtopics": [
              "ISRO",
              "Chandrayaan",
              "Gaganyaan",
              "Aditya L1"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_sci_2",
            "name": "Defence Technology",
            "nameHi": "रक्षा प्रौद्योगिकी",
            "subtopics": [
              "Missiles",
              "Defence Exercises"
            ],
            "importanceScore": 9
          },
          {
            "id": "env_1",
            "name": "Ecosystem",
            "nameHi": "पारिस्थितिकी तंत्र",
            "subtopics": [
              "Food Chain",
              "Food Web"
            ],
            "importanceScore": 10
          },
          {
            "id": "env_2",
            "name": "Biodiversity",
            "nameHi": "जैव विविधता",
            "subtopics": [
              "Conservation",
              "Hotspots"
            ],
            "importanceScore": 10
          },
          {
            "id": "env_3",
            "name": "Environmental Pollution",
            "nameHi": "पर्यावरण प्रदूषण",
            "subtopics": [
              "Air",
              "Water",
              "Soil",
              "Noise"
            ],
            "importanceScore": 10
          },
          {
            "id": "env_4",
            "name": "Climate Change",
            "nameHi": "जलवायु परिवर्तन",
            "subtopics": [
              "Global Warming",
              "Greenhouse Effect"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_1",
            "name": "Government Schemes",
            "nameHi": "केंद्र सरकार की योजनाएँ",
            "subtopics": [
              "PM Kisan",
              "PM Awas Yojana",
              "Ayushman Bharat",
              "Jal Jeevan Mission",
              "PM Vishwakarma"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_3",
            "name": "Appointments",
            "nameHi": "महत्वपूर्ण नियुक्तियाँ",
            "subtopics": [
              "राष्ट्रपति",
              "राज्यपाल",
              "मुख्य न्यायाधीश",
              "सेना प्रमुख"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_4",
            "name": "Reports and Indexes",
            "nameHi": "रिपोर्ट एवं सूचकांक",
            "subtopics": [
              "HDI",
              "Global Hunger Index",
              "World Happiness Report"
            ],
            "importanceScore": 9
          },
          {
            "id": "ca_int_1",
            "name": "International Organizations",
            "nameHi": "अंतरराष्ट्रीय संगठन",
            "subtopics": [
              "UNO",
              "WHO",
              "IMF",
              "World Bank",
              "WTO"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_sports_1",
            "name": "National Sports Events",
            "nameHi": "राष्ट्रीय खेल आयोजन",
            "subtopics": [
              "Khelo India",
              "National Games"
            ],
            "importanceScore": 8
          },
          {
            "id": "ca_award_1",
            "name": "National Awards",
            "nameHi": "राष्ट्रीय पुरस्कार",
            "subtopics": [
              "Bharat Ratna",
              "Padma Awards"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "cgpsc_csat_reasoning",
        "name": "तार्किक योग्यता एवं मानसिक क्षमता (CSAT Reasoning)",
        "weightage": 70,
        "importance": "High",
        "pyqFrequency": "High (35 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgpsc_csat_reasoning_ch_1",
            "name": "तार्किक एवं विश्लेषणात्मक योग्यता",
            "topics": [
              {
                "id": "reas_ser_1",
                "name": "Number Series",
                "nameHi": "संख्या श्रेणी",
                "subtopics": [
                  "Missing Number",
                  "Wrong Number",
                  "Pattern Based Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ser_2",
                "name": "Alphabet Series",
                "nameHi": "अक्षर श्रेणी",
                "subtopics": [
                  "Letter Pattern",
                  "Mixed Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ana_1",
                "name": "Analogy",
                "nameHi": "समानता",
                "subtopics": [
                  "Word Analogy",
                  "Number Analogy",
                  "Letter Analogy"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ana_2",
                "name": "Classification",
                "nameHi": "वर्गीकरण",
                "subtopics": [
                  "Odd One Out",
                  "Group Identification"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_cd_1",
                "name": "Letter Coding",
                "nameHi": "अक्षर कोडिंग",
                "subtopics": [
                  "Direct Coding",
                  "Reverse Coding"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_br_1",
                "name": "Blood Relations",
                "nameHi": "रक्त संबंध",
                "subtopics": [
                  "Family Tree",
                  "Generation Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_dir_1",
                "name": "Direction Sense",
                "nameHi": "दिशा ज्ञान",
                "subtopics": [
                  "North-South-East-West",
                  "Turning Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_syl_1",
                "name": "Syllogism",
                "nameHi": "न्याय निगमन",
                "subtopics": [
                  "Venn Method",
                  "Logical Conclusions"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_syl_2",
                "name": "Statement and Conclusion",
                "nameHi": "कथन एवं निष्कर्ष",
                "subtopics": [
                  "Assumption",
                  "Inference"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_syl_3",
                "name": "Statement and Argument",
                "nameHi": "कथन एवं तर्क",
                "subtopics": [
                  "Strong Argument",
                  "Weak Argument"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgpsc_csat_reasoning_ch_2",
            "name": "निर्णय निर्माण एवं गैर-शाब्दिक तर्कशक्ति",
            "topics": [
              {
                "id": "reas_dm_1",
                "name": "Decision Making",
                "nameHi": "निर्णय क्षमता",
                "subtopics": [
                  "Situational Judgement",
                  "Administrative Decisions"
                ],
                "importanceScore": 9
              },
              {
                "id": "reas_dm_2",
                "name": "Cause and Effect",
                "nameHi": "कारण एवं प्रभाव",
                "subtopics": [
                  "Reason Analysis"
                ],
                "importanceScore": 8
              },
              {
                "id": "reas_dm_3",
                "name": "Course of Action",
                "nameHi": "कार्यवाही का मार्ग",
                "subtopics": [
                  "Best Action Selection"
                ],
                "importanceScore": 8
              },
              {
                "id": "reas_ana_4",
                "name": "Puzzle Test",
                "nameHi": "पहेली परीक्षण",
                "subtopics": [
                  "Floor Puzzle",
                  "Box Puzzle",
                  "Scheduling Puzzle"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ana_6",
                "name": "Data Sufficiency",
                "nameHi": "डेटा पर्याप्तता",
                "subtopics": [
                  "Single Statement",
                  "Double Statement"
                ],
                "importanceScore": 8
              },
              {
                "id": "reas_nv_1",
                "name": "Mirror Image",
                "nameHi": "दर्पण प्रतिबिंब",
                "subtopics": [
                  "Vertical Mirror",
                  "Horizontal Mirror"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_nv_2",
                "name": "Water Image",
                "nameHi": "जल प्रतिबिंब",
                "subtopics": [
                  "Reflection Based"
                ],
                "importanceScore": 9
              },
              {
                "id": "reas_nv_5",
                "name": "Embedded Figures",
                "nameHi": "अंतर्निहित आकृतियाँ",
                "subtopics": [
                  "Shape Detection"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "reas_ser_1",
            "name": "Number Series",
            "nameHi": "संख्या श्रेणी",
            "subtopics": [
              "Missing Number",
              "Wrong Number",
              "Pattern Based Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ser_2",
            "name": "Alphabet Series",
            "nameHi": "अक्षर श्रेणी",
            "subtopics": [
              "Letter Pattern",
              "Mixed Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ana_1",
            "name": "Analogy",
            "nameHi": "समानता",
            "subtopics": [
              "Word Analogy",
              "Number Analogy",
              "Letter Analogy"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ana_2",
            "name": "Classification",
            "nameHi": "वर्गीकरण",
            "subtopics": [
              "Odd One Out",
              "Group Identification"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_cd_1",
            "name": "Letter Coding",
            "nameHi": "अक्षर कोडिंग",
            "subtopics": [
              "Direct Coding",
              "Reverse Coding"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_br_1",
            "name": "Blood Relations",
            "nameHi": "रक्त संबंध",
            "subtopics": [
              "Family Tree",
              "Generation Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_dir_1",
            "name": "Direction Sense",
            "nameHi": "दिशा ज्ञान",
            "subtopics": [
              "North-South-East-West",
              "Turning Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_syl_1",
            "name": "Syllogism",
            "nameHi": "न्याय निगमन",
            "subtopics": [
              "Venn Method",
              "Logical Conclusions"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_syl_2",
            "name": "Statement and Conclusion",
            "nameHi": "कथन एवं निष्कर्ष",
            "subtopics": [
              "Assumption",
              "Inference"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_syl_3",
            "name": "Statement and Argument",
            "nameHi": "कथन एवं तर्क",
            "subtopics": [
              "Strong Argument",
              "Weak Argument"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_dm_1",
            "name": "Decision Making",
            "nameHi": "निर्णय क्षमता",
            "subtopics": [
              "Situational Judgement",
              "Administrative Decisions"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_dm_2",
            "name": "Cause and Effect",
            "nameHi": "कारण एवं प्रभाव",
            "subtopics": [
              "Reason Analysis"
            ],
            "importanceScore": 8
          },
          {
            "id": "reas_dm_3",
            "name": "Course of Action",
            "nameHi": "कार्यवाही का मार्ग",
            "subtopics": [
              "Best Action Selection"
            ],
            "importanceScore": 8
          },
          {
            "id": "reas_ana_4",
            "name": "Puzzle Test",
            "nameHi": "पहेली परीक्षण",
            "subtopics": [
              "Floor Puzzle",
              "Box Puzzle",
              "Scheduling Puzzle"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ana_6",
            "name": "Data Sufficiency",
            "nameHi": "डेटा पर्याप्तता",
            "subtopics": [
              "Single Statement",
              "Double Statement"
            ],
            "importanceScore": 8
          },
          {
            "id": "reas_nv_1",
            "name": "Mirror Image",
            "nameHi": "दर्पण प्रतिबिंब",
            "subtopics": [
              "Vertical Mirror",
              "Horizontal Mirror"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_nv_2",
            "name": "Water Image",
            "nameHi": "जल प्रतिबिंब",
            "subtopics": [
              "Reflection Based"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_nv_5",
            "name": "Embedded Figures",
            "nameHi": "अंतर्निहित आकृतियाँ",
            "subtopics": [
              "Shape Detection"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "cgpsc_csat_maths",
        "name": "मूल संख्यात्मक गणित एवं डेटा व्याख्या (CSAT Numeracy)",
        "weightage": 70,
        "importance": "High",
        "pyqFrequency": "High (35 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgpsc_csat_maths_ch_1",
            "name": "संख्या पद्धति एवं अंकगणित",
            "topics": [
              {
                "id": "math_ns_1",
                "name": "Number System Basics",
                "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
                "subtopics": [
                  "प्राकृतिक संख्या",
                  "पूर्ण संख्या",
                  "पूर्णांक",
                  "परिमेय संख्या",
                  "अपरिमेय संख्या"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_2",
                "name": "Divisibility Rules",
                "nameHi": "विभाज्यता के नियम",
                "subtopics": [
                  "2,3,4,5,6,8,9,11 के नियम"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_3",
                "name": "LCM and HCF",
                "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
                "subtopics": [
                  "LCM",
                  "HCF",
                  "प्रयोग आधारित प्रश्न"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_5",
                "name": "Simplification",
                "nameHi": "सरलीकरण",
                "subtopics": [
                  "BODMAS",
                  "Fraction",
                  "Decimal"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_3",
                "name": "Average",
                "nameHi": "औसत",
                "subtopics": [
                  "Simple Average",
                  "Weighted Average"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_1",
                "name": "Percentage",
                "nameHi": "प्रतिशत",
                "subtopics": [
                  "Percentage Conversion",
                  "Increase & Decrease"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_2",
                "name": "Profit and Loss",
                "nameHi": "लाभ एवं हानि",
                "subtopics": [
                  "Cost Price",
                  "Selling Price",
                  "Profit Percentage"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_1",
                "name": "Ratio",
                "nameHi": "अनुपात",
                "subtopics": [
                  "Simple Ratio",
                  "Compound Ratio"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_1",
                "name": "Simple Interest",
                "nameHi": "साधारण ब्याज",
                "subtopics": [
                  "Principal",
                  "Rate",
                  "Time"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_2",
                "name": "Compound Interest",
                "nameHi": "चक्रवृद्धि ब्याज",
                "subtopics": [
                  "Annual CI",
                  "Half Yearly CI"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_3",
                "name": "Time and Work",
                "nameHi": "समय एवं कार्य",
                "subtopics": [
                  "Efficiency",
                  "Work Distribution"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_tsd_1",
                "name": "Speed Time Distance",
                "nameHi": "समय, चाल एवं दूरी",
                "subtopics": [
                  "Average Speed",
                  "Relative Speed"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgpsc_csat_maths_ch_2",
            "name": "क्षेत्रमिति एवं बीजगणित",
            "topics": [
              {
                "id": "math_alg_1",
                "name": "Algebraic Identities",
                "nameHi": "बीजीय सर्वसमिकाएँ",
                "subtopics": [
                  "(a+b)²",
                  "(a-b)²",
                  "a²-b²"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_geo_1",
                "name": "Lines and Angles",
                "nameHi": "रेखाएँ एवं कोण",
                "subtopics": [
                  "Types of Angles",
                  "Parallel Lines"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_1",
                "name": "2D Mensuration",
                "nameHi": "समतल क्षेत्रमिति",
                "subtopics": [
                  "Square",
                  "Rectangle",
                  "Triangle",
                  "Circle"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_2",
                "name": "3D Mensuration",
                "nameHi": "ठोस क्षेत्रमिति",
                "subtopics": [
                  "Cube",
                  "Cuboid",
                  "Cylinder",
                  "Cone",
                  "Sphere"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgpsc_csat_maths_ch_3",
            "name": "डेटा व्याख्या (Data Interpretation)",
            "topics": [
              {
                "id": "math_di_1",
                "name": "Statistics",
                "nameHi": "सांख्यिकी",
                "subtopics": [
                  "Mean",
                  "Median",
                  "Mode"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_di_2",
                "name": "Data Interpretation",
                "nameHi": "डेटा व्याख्या",
                "subtopics": [
                  "Table DI",
                  "Bar Graph",
                  "Pie Chart",
                  "Line Graph"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_di_3",
                "name": "Probability",
                "nameHi": "प्रायिकता",
                "subtopics": [
                  "Basic Probability",
                  "Events"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "math_ns_1",
            "name": "Number System Basics",
            "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
            "subtopics": [
              "प्राकृतिक संख्या",
              "पूर्ण संख्या",
              "पूर्णांक",
              "परिमेय संख्या",
              "अपरिमेय संख्या"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_2",
            "name": "Divisibility Rules",
            "nameHi": "विभाज्यता के नियम",
            "subtopics": [
              "2,3,4,5,6,8,9,11 के नियम"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_3",
            "name": "LCM and HCF",
            "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
            "subtopics": [
              "LCM",
              "HCF",
              "प्रयोग आधारित प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_5",
            "name": "Simplification",
            "nameHi": "सरलीकरण",
            "subtopics": [
              "BODMAS",
              "Fraction",
              "Decimal"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_3",
            "name": "Average",
            "nameHi": "औसत",
            "subtopics": [
              "Simple Average",
              "Weighted Average"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_1",
            "name": "Percentage",
            "nameHi": "प्रतिशत",
            "subtopics": [
              "Percentage Conversion",
              "Increase & Decrease"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_2",
            "name": "Profit and Loss",
            "nameHi": "लाभ एवं हानि",
            "subtopics": [
              "Cost Price",
              "Selling Price",
              "Profit Percentage"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_1",
            "name": "Ratio",
            "nameHi": "अनुपात",
            "subtopics": [
              "Simple Ratio",
              "Compound Ratio"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_1",
            "name": "Simple Interest",
            "nameHi": "साधारण ब्याज",
            "subtopics": [
              "Principal",
              "Rate",
              "Time"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_2",
            "name": "Compound Interest",
            "nameHi": "चक्रवृद्धि ब्याज",
            "subtopics": [
              "Annual CI",
              "Half Yearly CI"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_3",
            "name": "Time and Work",
            "nameHi": "समय एवं कार्य",
            "subtopics": [
              "Efficiency",
              "Work Distribution"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_tsd_1",
            "name": "Speed Time Distance",
            "nameHi": "समय, चाल एवं दूरी",
            "subtopics": [
              "Average Speed",
              "Relative Speed"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_alg_1",
            "name": "Algebraic Identities",
            "nameHi": "बीजीय सर्वसमिकाएँ",
            "subtopics": [
              "(a+b)²",
              "(a-b)²",
              "a²-b²"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_geo_1",
            "name": "Lines and Angles",
            "nameHi": "रेखाएँ एवं कोण",
            "subtopics": [
              "Types of Angles",
              "Parallel Lines"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_1",
            "name": "2D Mensuration",
            "nameHi": "समतल क्षेत्रमिति",
            "subtopics": [
              "Square",
              "Rectangle",
              "Triangle",
              "Circle"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_2",
            "name": "3D Mensuration",
            "nameHi": "ठोस क्षेत्रमिति",
            "subtopics": [
              "Cube",
              "Cuboid",
              "Cylinder",
              "Cone",
              "Sphere"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_di_1",
            "name": "Statistics",
            "nameHi": "सांख्यिकी",
            "subtopics": [
              "Mean",
              "Median",
              "Mode"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_di_2",
            "name": "Data Interpretation",
            "nameHi": "डेटा व्याख्या",
            "subtopics": [
              "Table DI",
              "Bar Graph",
              "Pie Chart",
              "Line Graph"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_di_3",
            "name": "Probability",
            "nameHi": "प्रायिकता",
            "subtopics": [
              "Basic Probability",
              "Events"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "cgpsc_csat_lang",
        "name": "हिंदी एवं छत्तीसगढ़ी भाषा बोध (CSAT Language)",
        "weightage": 60,
        "importance": "High",
        "pyqFrequency": "High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "cgpsc_csat_lang_ch_1",
            "name": "सामान्य हिंदी व्याकरण एवं अपठित गद्यांश",
            "topics": [
              {
                "id": "hin_varn_1",
                "name": "Hindi Alphabet",
                "nameHi": "हिंदी वर्णमाला",
                "subtopics": [
                  "स्वर",
                  "व्यंजन",
                  "अयोगवाह"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sandhi_1",
                "name": "Swar Sandhi",
                "nameHi": "स्वर संधि",
                "subtopics": [
                  "दीर्घ",
                  "गुण",
                  "वृद्धि",
                  "यण"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_samas_1",
                "name": "Tatpurush Samas",
                "nameHi": "तत्पुरुष समास",
                "subtopics": [
                  "कर्म",
                  "करण",
                  "सम्प्रदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_shabd_1",
                "name": "Tatsam and Tadbhav",
                "nameHi": "तत्सम एवं तद्भव",
                "subtopics": [
                  "शब्द पहचान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_gram_1",
                "name": "Noun",
                "nameHi": "संज्ञा",
                "subtopics": [
                  "भेद",
                  "उपयोग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_1",
                "name": "Synonyms",
                "nameHi": "पर्यायवाची शब्द",
                "subtopics": [
                  "एकार्थी",
                  "अनेकार्थी पर्याय"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_2",
                "name": "Antonyms",
                "nameHi": "विलोम शब्द",
                "subtopics": [
                  "तत्सम विलोम",
                  "प्रचलित विलोम"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_idiom_1",
                "name": "Idioms",
                "nameHi": "मुहावरे",
                "subtopics": [
                  "अर्थ",
                  "प्रयोग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sent_1",
                "name": "Sentence Correction",
                "nameHi": "वाक्य शुद्धि",
                "subtopics": [
                  "व्याकरणिक त्रुटि",
                  "अर्थगत त्रुटि"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_comp_1",
                "name": "Reading Comprehension",
                "nameHi": "अपठित गद्यांश",
                "subtopics": [
                  "तथ्यात्मक प्रश्न",
                  "विश्लेषणात्मक प्रश्न"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgpsc_csat_lang_ch_2",
            "name": "छत्तीसगढ़ी भाषा ज्ञान एवं साहित्य",
            "topics": [
              {
                "id": "cgpsc_chhatt_1",
                "name": "Chhattisgarhi Grammar & Vocabulary",
                "nameHi": "छत्तीसगढ़ी व्याकरण, शब्दकोश एवं मानक रूप",
                "subtopics": [
                  "छत्तीसगढ़ी संज्ञा, सर्वनाम, विशेषण एवं क्रिया रूप",
                  "छत्तीसगढ़ी काल, वाच्य एवं लिंग-वचन निर्धारण",
                  "छत्तीसगढ़ी तत्सम, तद्भव एवं देशज शब्दावली"
                ],
                "importanceScore": 8
              },
              {
                "id": "cgpsc_chhatt_2",
                "name": "Chhattisgarhi Idioms, Hana & Janula",
                "nameHi": "छत्तीसगढ़ी मुहावरे, हाना एवं जनउला (पहेलियां)",
                "subtopics": [
                  "लोकप्रिय छत्तीसगढ़ी हाना (लोकोक्तियां) एवं उनके अर्थ",
                  "जनउला (पहेलियां) एवं पहेली बुझौवल",
                  "दैनिक बोलचाल के छत्तीसगढ़ी विशिष्ट मुहावरे"
                ],
                "importanceScore": 8
              },
              {
                "id": "cgpsc_chhatt_3",
                "name": "Chhattisgarhi Literature & Authors",
                "nameHi": "छत्तीसगढ़ी साहित्य, साहित्यकार एवं प्रसिद्ध कृतियाँ",
                "subtopics": [
                  "पंडित सुंदरलाल शर्मा, मुकुटधर पांडेय, लोचनप्रसाद पांडेय",
                  "डॉ. खूबचंद बघेल, हरि ठाकुर एवं प्रमुख रचनाएं",
                  "छत्तीसगढ़ी लोकनाट्य एवं पंडवानी परंपरा"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "hin_varn_1",
            "name": "Hindi Alphabet",
            "nameHi": "हिंदी वर्णमाला",
            "subtopics": [
              "स्वर",
              "व्यंजन",
              "अयोगवाह"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sandhi_1",
            "name": "Swar Sandhi",
            "nameHi": "स्वर संधि",
            "subtopics": [
              "दीर्घ",
              "गुण",
              "वृद्धि",
              "यण"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_samas_1",
            "name": "Tatpurush Samas",
            "nameHi": "तत्पुरुष समास",
            "subtopics": [
              "कर्म",
              "करण",
              "सम्प्रदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_shabd_1",
            "name": "Tatsam and Tadbhav",
            "nameHi": "तत्सम एवं तद्भव",
            "subtopics": [
              "शब्द पहचान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_gram_1",
            "name": "Noun",
            "nameHi": "संज्ञा",
            "subtopics": [
              "भेद",
              "उपयोग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_1",
            "name": "Synonyms",
            "nameHi": "पर्यायवाची शब्द",
            "subtopics": [
              "एकार्थी",
              "अनेकार्थी पर्याय"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_2",
            "name": "Antonyms",
            "nameHi": "विलोम शब्द",
            "subtopics": [
              "तत्सम विलोम",
              "प्रचलित विलोम"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_idiom_1",
            "name": "Idioms",
            "nameHi": "मुहावरे",
            "subtopics": [
              "अर्थ",
              "प्रयोग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sent_1",
            "name": "Sentence Correction",
            "nameHi": "वाक्य शुद्धि",
            "subtopics": [
              "व्याकरणिक त्रुटि",
              "अर्थगत त्रुटि"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_comp_1",
            "name": "Reading Comprehension",
            "nameHi": "अपठित गद्यांश",
            "subtopics": [
              "तथ्यात्मक प्रश्न",
              "विश्लेषणात्मक प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "cgpsc_chhatt_1",
            "name": "Chhattisgarhi Grammar & Vocabulary",
            "nameHi": "छत्तीसगढ़ी व्याकरण, शब्दकोश एवं मानक रूप",
            "subtopics": [
              "छत्तीसगढ़ी संज्ञा, सर्वनाम, विशेषण एवं क्रिया रूप",
              "छत्तीसगढ़ी काल, वाच्य एवं लिंग-वचन निर्धारण",
              "छत्तीसगढ़ी तत्सम, तद्भव एवं देशज शब्दावली"
            ],
            "importanceScore": 8
          },
          {
            "id": "cgpsc_chhatt_2",
            "name": "Chhattisgarhi Idioms, Hana & Janula",
            "nameHi": "छत्तीसगढ़ी मुहावरे, हाना एवं जनउला (पहेलियां)",
            "subtopics": [
              "लोकप्रिय छत्तीसगढ़ी हाना (लोकोक्तियां) एवं उनके अर्थ",
              "जनउला (पहेलियां) एवं पहेली बुझौवल",
              "दैनिक बोलचाल के छत्तीसगढ़ी विशिष्ट मुहावरे"
            ],
            "importanceScore": 8
          },
          {
            "id": "cgpsc_chhatt_3",
            "name": "Chhattisgarhi Literature & Authors",
            "nameHi": "छत्तीसगढ़ी साहित्य, साहित्यकार एवं प्रसिद्ध कृतियाँ",
            "subtopics": [
              "पंडित सुंदरलाल शर्मा, मुकुटधर पांडेय, लोचनप्रसाद पांडेय",
              "डॉ. खूबचंद बघेल, हरि ठाकुर एवं प्रमुख रचनाएं",
              "छत्तीसगढ़ी लोकनाट्य एवं पंडवानी परंपरा"
            ],
            "importanceScore": 8
          }
        ]
      }
    ]
  },
  "cg_police_si": {
    "name": "CG Police SI",
    "fullName": "CG Police Sub Inspector / Platoon Commander / Subedar (Mains)",
    "icon": "⭐",
    "category": "police",
    "description": "छत्तीसगढ़ पुलिस उप-निरीक्षक / सूबेदार मुख्य लिखित परीक्षा — 600 अंक",
    "eligibility": "Graduate in Any Discipline",
    "pattern": {
      "totalMarks": 600,
      "time": "Paper 1: 2 hrs | Paper 2: 3 hrs | Paper 3: 2 hrs",
      "type": "Objective MCQ (3 Papers, 200 Marks each)",
      "papers": [
        {
          "paper": "Paper 1: भाषा ज्ञान (Hindi 125 Marks + English 75 Marks)",
          "marks": 200
        },
        {
          "paper": "Paper 2: सामान्य ज्ञान एवं सामान्य अध्ययन (CG GK + GS + Police)",
          "marks": 200
        },
        {
          "paper": "Paper 3: एप्टीट्यूड टेस्ट / गणित एवं तार्किक क्षमता",
          "marks": 200
        }
      ]
    },
    "subjects": [
      {
        "id": "si_lang",
        "name": "भाषा ज्ञान (Hindi & English — Paper 1)",
        "weightage": 200,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (200 Marks)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "si_lang_ch_1",
            "name": "सामान्य हिंदी व्याकरण (125 Marks)",
            "topics": [
              {
                "id": "hin_varn_1",
                "name": "Hindi Alphabet",
                "nameHi": "हिंदी वर्णमाला",
                "subtopics": [
                  "स्वर",
                  "व्यंजन",
                  "अयोगवाह"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sandhi_1",
                "name": "Swar Sandhi",
                "nameHi": "स्वर संधि",
                "subtopics": [
                  "दीर्घ",
                  "गुण",
                  "वृद्धि",
                  "यण"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sandhi_2",
                "name": "Vyanjan Sandhi",
                "nameHi": "व्यंजन संधि",
                "subtopics": [
                  "व्यंजन परिवर्तन"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_samas_1",
                "name": "Tatpurush Samas",
                "nameHi": "तत्पुरुष समास",
                "subtopics": [
                  "कर्म",
                  "करण",
                  "सम्प्रदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_samas_2",
                "name": "Dwandwa Samas",
                "nameHi": "द्वंद्व समास",
                "subtopics": [
                  "समाहार",
                  "इतरेतर"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_up_1",
                "name": "Prefixes",
                "nameHi": "उपसर्ग",
                "subtopics": [
                  "संस्कृत उपसर्ग",
                  "हिंदी उपसर्ग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_up_2",
                "name": "Suffixes",
                "nameHi": "प्रत्यय",
                "subtopics": [
                  "कृत प्रत्यय",
                  "तद्धित प्रत्यय"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_shabd_1",
                "name": "Tatsam and Tadbhav",
                "nameHi": "तत्सम एवं तद्भव",
                "subtopics": [
                  "शब्द पहचान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_gram_1",
                "name": "Noun",
                "nameHi": "संज्ञा",
                "subtopics": [
                  "भेद",
                  "उपयोग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_gram_2",
                "name": "Pronoun",
                "nameHi": "सर्वनाम",
                "subtopics": [
                  "भेद"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_gram_3",
                "name": "Adjective",
                "nameHi": "विशेषण",
                "subtopics": [
                  "भेद"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_gram_4",
                "name": "Verb",
                "nameHi": "क्रिया",
                "subtopics": [
                  "सकर्मक",
                  "अकर्मक"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_1",
                "name": "Synonyms",
                "nameHi": "पर्यायवाची शब्द",
                "subtopics": [
                  "एकार्थी",
                  "अनेकार्थी पर्याय"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_2",
                "name": "Antonyms",
                "nameHi": "विलोम शब्द",
                "subtopics": [
                  "तत्सम विलोम",
                  "प्रचलित विलोम"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_3",
                "name": "One Word Substitution",
                "nameHi": "अनेक शब्दों के लिए एक शब्द",
                "subtopics": [
                  "प्रशासनिक",
                  "साहित्यिक"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_idiom_1",
                "name": "Idioms",
                "nameHi": "मुहावरे",
                "subtopics": [
                  "अर्थ",
                  "प्रयोग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_idiom_2",
                "name": "Proverbs",
                "nameHi": "लोकोक्तियाँ",
                "subtopics": [
                  "अर्थ",
                  "संदर्भ"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_lit_1",
                "name": "Ras",
                "nameHi": "रस",
                "subtopics": [
                  "नवरस"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_lit_2",
                "name": "Alankar",
                "nameHi": "अलंकार",
                "subtopics": [
                  "शब्दालंकार",
                  "अर्थालंकार"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_lit_3",
                "name": "Chhand",
                "nameHi": "छंद",
                "subtopics": [
                  "मात्रिक",
                  "वर्णिक"
                ],
                "importanceScore": 8
              },
              {
                "id": "hin_sent_1",
                "name": "Sentence Correction",
                "nameHi": "वाक्य शुद्धि",
                "subtopics": [
                  "व्याकरणिक त्रुटि",
                  "अर्थगत त्रुटि"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_comp_1",
                "name": "Reading Comprehension",
                "nameHi": "अपठित गद्यांश",
                "subtopics": [
                  "तथ्यात्मक प्रश्न",
                  "विश्लेषणात्मक प्रश्न"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "si_lang_ch_2",
            "name": "General English (75 Marks)",
            "topics": [
              {
                "id": "eng_gram_1",
                "name": "Parts of Speech",
                "nameHi": "शब्द भेद",
                "subtopics": [
                  "Noun",
                  "Pronoun",
                  "Verb",
                  "Adjective",
                  "Adverb",
                  "Preposition",
                  "Conjunction",
                  "Interjection"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_gram_2",
                "name": "Articles",
                "nameHi": "Articles",
                "subtopics": [
                  "A",
                  "An",
                  "The"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_tense_1",
                "name": "Present Tense",
                "nameHi": "वर्तमान काल",
                "subtopics": [
                  "Simple",
                  "Continuous",
                  "Perfect",
                  "Perfect Continuous"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_tense_2",
                "name": "Past Tense",
                "nameHi": "भूतकाल",
                "subtopics": [
                  "Simple",
                  "Continuous",
                  "Perfect",
                  "Perfect Continuous"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_voice_1",
                "name": "Active and Passive Voice",
                "nameHi": "कर्तृवाच्य एवं कर्मवाच्य",
                "subtopics": [
                  "Tense Based Voice",
                  "Modal Voice"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_voice_2",
                "name": "Direct and Indirect Speech",
                "nameHi": "प्रत्यक्ष एवं अप्रत्यक्ष कथन",
                "subtopics": [
                  "Statements",
                  "Questions",
                  "Commands",
                  "Exclamations"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_vocab_1",
                "name": "Synonyms",
                "nameHi": "समानार्थी शब्द",
                "subtopics": [
                  "Word Meaning"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_vocab_2",
                "name": "Antonyms",
                "nameHi": "विलोम शब्द",
                "subtopics": [
                  "Opposite Words"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_idiom_1",
                "name": "Idioms",
                "nameHi": "मुहावरे",
                "subtopics": [
                  "Meaning",
                  "Usage"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_comp_1",
                "name": "Passage Comprehension",
                "nameHi": "गद्यांश आधारित प्रश्न",
                "subtopics": [
                  "Factual Questions",
                  "Inference Questions",
                  "Vocabulary Questions"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_err_1",
                "name": "Grammatical Errors",
                "nameHi": "व्याकरण संबंधी त्रुटियाँ",
                "subtopics": [
                  "Tense Error",
                  "Agreement Error",
                  "Article Error"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_err_2",
                "name": "Sentence Improvement",
                "nameHi": "वाक्य सुधार",
                "subtopics": [
                  "Best Alternative"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "hin_varn_1",
            "name": "Hindi Alphabet",
            "nameHi": "हिंदी वर्णमाला",
            "subtopics": [
              "स्वर",
              "व्यंजन",
              "अयोगवाह"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sandhi_1",
            "name": "Swar Sandhi",
            "nameHi": "स्वर संधि",
            "subtopics": [
              "दीर्घ",
              "गुण",
              "वृद्धि",
              "यण"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sandhi_2",
            "name": "Vyanjan Sandhi",
            "nameHi": "व्यंजन संधि",
            "subtopics": [
              "व्यंजन परिवर्तन"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_samas_1",
            "name": "Tatpurush Samas",
            "nameHi": "तत्पुरुष समास",
            "subtopics": [
              "कर्म",
              "करण",
              "सम्प्रदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_samas_2",
            "name": "Dwandwa Samas",
            "nameHi": "द्वंद्व समास",
            "subtopics": [
              "समाहार",
              "इतरेतर"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_up_1",
            "name": "Prefixes",
            "nameHi": "उपसर्ग",
            "subtopics": [
              "संस्कृत उपसर्ग",
              "हिंदी उपसर्ग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_up_2",
            "name": "Suffixes",
            "nameHi": "प्रत्यय",
            "subtopics": [
              "कृत प्रत्यय",
              "तद्धित प्रत्यय"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_shabd_1",
            "name": "Tatsam and Tadbhav",
            "nameHi": "तत्सम एवं तद्भव",
            "subtopics": [
              "शब्द पहचान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_gram_1",
            "name": "Noun",
            "nameHi": "संज्ञा",
            "subtopics": [
              "भेद",
              "उपयोग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_gram_2",
            "name": "Pronoun",
            "nameHi": "सर्वनाम",
            "subtopics": [
              "भेद"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_gram_3",
            "name": "Adjective",
            "nameHi": "विशेषण",
            "subtopics": [
              "भेद"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_gram_4",
            "name": "Verb",
            "nameHi": "क्रिया",
            "subtopics": [
              "सकर्मक",
              "अकर्मक"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_1",
            "name": "Synonyms",
            "nameHi": "पर्यायवाची शब्द",
            "subtopics": [
              "एकार्थी",
              "अनेकार्थी पर्याय"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_2",
            "name": "Antonyms",
            "nameHi": "विलोम शब्द",
            "subtopics": [
              "तत्सम विलोम",
              "प्रचलित विलोम"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_3",
            "name": "One Word Substitution",
            "nameHi": "अनेक शब्दों के लिए एक शब्द",
            "subtopics": [
              "प्रशासनिक",
              "साहित्यिक"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_idiom_1",
            "name": "Idioms",
            "nameHi": "मुहावरे",
            "subtopics": [
              "अर्थ",
              "प्रयोग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_idiom_2",
            "name": "Proverbs",
            "nameHi": "लोकोक्तियाँ",
            "subtopics": [
              "अर्थ",
              "संदर्भ"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_lit_1",
            "name": "Ras",
            "nameHi": "रस",
            "subtopics": [
              "नवरस"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_lit_2",
            "name": "Alankar",
            "nameHi": "अलंकार",
            "subtopics": [
              "शब्दालंकार",
              "अर्थालंकार"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_lit_3",
            "name": "Chhand",
            "nameHi": "छंद",
            "subtopics": [
              "मात्रिक",
              "वर्णिक"
            ],
            "importanceScore": 8
          },
          {
            "id": "hin_sent_1",
            "name": "Sentence Correction",
            "nameHi": "वाक्य शुद्धि",
            "subtopics": [
              "व्याकरणिक त्रुटि",
              "अर्थगत त्रुटि"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_comp_1",
            "name": "Reading Comprehension",
            "nameHi": "अपठित गद्यांश",
            "subtopics": [
              "तथ्यात्मक प्रश्न",
              "विश्लेषणात्मक प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_gram_1",
            "name": "Parts of Speech",
            "nameHi": "शब्द भेद",
            "subtopics": [
              "Noun",
              "Pronoun",
              "Verb",
              "Adjective",
              "Adverb",
              "Preposition",
              "Conjunction",
              "Interjection"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_gram_2",
            "name": "Articles",
            "nameHi": "Articles",
            "subtopics": [
              "A",
              "An",
              "The"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_tense_1",
            "name": "Present Tense",
            "nameHi": "वर्तमान काल",
            "subtopics": [
              "Simple",
              "Continuous",
              "Perfect",
              "Perfect Continuous"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_tense_2",
            "name": "Past Tense",
            "nameHi": "भूतकाल",
            "subtopics": [
              "Simple",
              "Continuous",
              "Perfect",
              "Perfect Continuous"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_voice_1",
            "name": "Active and Passive Voice",
            "nameHi": "कर्तृवाच्य एवं कर्मवाच्य",
            "subtopics": [
              "Tense Based Voice",
              "Modal Voice"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_voice_2",
            "name": "Direct and Indirect Speech",
            "nameHi": "प्रत्यक्ष एवं अप्रत्यक्ष कथन",
            "subtopics": [
              "Statements",
              "Questions",
              "Commands",
              "Exclamations"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_vocab_1",
            "name": "Synonyms",
            "nameHi": "समानार्थी शब्द",
            "subtopics": [
              "Word Meaning"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_vocab_2",
            "name": "Antonyms",
            "nameHi": "विलोम शब्द",
            "subtopics": [
              "Opposite Words"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_idiom_1",
            "name": "Idioms",
            "nameHi": "मुहावरे",
            "subtopics": [
              "Meaning",
              "Usage"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_comp_1",
            "name": "Passage Comprehension",
            "nameHi": "गद्यांश आधारित प्रश्न",
            "subtopics": [
              "Factual Questions",
              "Inference Questions",
              "Vocabulary Questions"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_err_1",
            "name": "Grammatical Errors",
            "nameHi": "व्याकरण संबंधी त्रुटियाँ",
            "subtopics": [
              "Tense Error",
              "Agreement Error",
              "Article Error"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_err_2",
            "name": "Sentence Improvement",
            "nameHi": "वाक्य सुधार",
            "subtopics": [
              "Best Alternative"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "si_gs",
        "name": "सामान्य ज्ञान एवं सामान्य अध्ययन (GS & CG GK — Paper 2)",
        "weightage": 200,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (200 Marks)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "si_gs_ch_1",
            "name": "छत्तीसगढ़ का इतिहास, भूगोल, संस्कृति एवं योजनाएं",
            "topics": [
              {
                "id": "cg_hist_1",
                "name": "Prehistoric Chhattisgarh",
                "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
                "subtopics": [
                  "शैलचित्र",
                  "पुरातात्विक साक्ष्य",
                  "प्रमुख स्थल"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_hist_2",
                "name": "Ancient Chhattisgarh",
                "nameHi": "प्राचीन छत्तीसगढ़",
                "subtopics": [
                  "दक्षिण कोसल",
                  "प्राचीन राजवंश",
                  "सांस्कृतिक विकास"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_7",
                "name": "Kalchuri Dynasty",
                "nameHi": "कलचुरी वंश",
                "subtopics": [
                  "रत्नपुर शाखा",
                  "रायपुर शाखा",
                  "सांस्कृतिक योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_9",
                "name": "Maratha Rule",
                "nameHi": "मराठा शासन",
                "subtopics": [
                  "भोंसले शासन",
                  "प्रशासन",
                  "राजस्व व्यवस्था"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_10",
                "name": "British Rule in Chhattisgarh",
                "nameHi": "छत्तीसगढ़ में ब्रिटिश शासन",
                "subtopics": [
                  "ब्रिटिश प्रशासन",
                  "राजनीतिक परिवर्तन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_11",
                "name": "1857 Revolt in Chhattisgarh",
                "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
                "subtopics": [
                  "वीर नारायण सिंह",
                  "स्थानीय आंदोलन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_12",
                "name": "Freedom Movement",
                "nameHi": "स्वतंत्रता आंदोलन",
                "subtopics": [
                  "असहयोग आंदोलन",
                  "भारत छोड़ो आंदोलन",
                  "स्थानीय योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_13",
                "name": "Formation of Chhattisgarh State",
                "nameHi": "छत्तीसगढ़ राज्य का गठन",
                "subtopics": [
                  "राज्य आंदोलन",
                  "1 नवम्बर 2000",
                  "प्रमुख व्यक्तित्व"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_1",
                "name": "Location and Boundaries",
                "nameHi": "स्थिति एवं सीमाएँ",
                "subtopics": [
                  "अक्षांश",
                  "देशांतर",
                  "पड़ोसी राज्य"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_2",
                "name": "Physiographic Divisions",
                "nameHi": "भौतिक विभाजन",
                "subtopics": [
                  "मैदानी क्षेत्र",
                  "पठारी क्षेत्र",
                  "पर्वतीय क्षेत्र"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_3",
                "name": "Major Rivers",
                "nameHi": "प्रमुख नदियाँ",
                "subtopics": [
                  "महानदी",
                  "शिवनाथ",
                  "इंद्रावती",
                  "हसदेव",
                  "अरपा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_7",
                "name": "Forest Resources",
                "nameHi": "वन संसाधन",
                "subtopics": [
                  "वन क्षेत्र",
                  "प्रमुख वृक्ष",
                  "लघु वनोपज"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_10",
                "name": "Mineral Resources",
                "nameHi": "खनिज संसाधन",
                "subtopics": [
                  "कोयला",
                  "लौह अयस्क",
                  "बॉक्साइट",
                  "डोलोमाइट"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_1",
                "name": "Major Tribes",
                "nameHi": "प्रमुख जनजातियाँ",
                "subtopics": [
                  "गोंड",
                  "बैगा",
                  "हल्बा",
                  "उरांव",
                  "कंवर"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_2",
                "name": "Special Tribal Groups",
                "nameHi": "विशेष पिछड़ी जनजातियाँ",
                "subtopics": [
                  "अबूझमाड़िया",
                  "कमार",
                  "पहाड़ी कोरवा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_5",
                "name": "Festivals",
                "nameHi": "त्यौहार",
                "subtopics": [
                  "हरेली",
                  "पोला",
                  "तीजा",
                  "छेरछेरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_4",
                "name": "Districts and Divisions",
                "nameHi": "जिले एवं संभाग",
                "subtopics": [
                  "सभी जिले",
                  "सभी संभाग"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_6",
                "name": "Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन",
                  "कृषि योजनाएँ",
                  "शिक्षा योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_cg_1",
                "name": "State Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन योजना",
                  "कृषि योजनाएँ",
                  "युवा योजनाएँ"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "si_gs_ch_2",
            "name": "भारतीय इतिहास, संविधान एवं राजव्यवस्था",
            "topics": [
              {
                "id": "ind_hist_1",
                "name": "Indus Valley Civilization",
                "nameHi": "सिंधु घाटी सभ्यता",
                "subtopics": [
                  "हड़प्पा",
                  "मोहनजोदड़ो",
                  "लोथल",
                  "कालीबंगन",
                  "धौलावीरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_hist_6",
                "name": "Maurya Empire",
                "nameHi": "मौर्य साम्राज्य",
                "subtopics": [
                  "चंद्रगुप्त मौर्य",
                  "अशोक",
                  "मेगस्थनीज"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_med_2",
                "name": "Mughal Empire",
                "nameHi": "मुगल साम्राज्य",
                "subtopics": [
                  "बाबर",
                  "अकबर",
                  "जहाँगीर",
                  "शाहजहाँ",
                  "औरंगजेब"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_3",
                "name": "Revolt of 1857",
                "nameHi": "1857 का विद्रोह",
                "subtopics": [
                  "कारण",
                  "नेता",
                  "परिणाम"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_5",
                "name": "Gandhian Movements",
                "nameHi": "गांधीवादी आंदोलन",
                "subtopics": [
                  "असहयोग",
                  "सविनय अवज्ञा",
                  "भारत छोड़ो"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_1",
                "name": "Constitution",
                "nameHi": "भारतीय संविधान",
                "subtopics": [
                  "विशेषताएँ",
                  "प्रस्तावना",
                  "संशोधन"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_2",
                "name": "Fundamental Rights",
                "nameHi": "मौलिक अधिकार",
                "subtopics": [
                  "अनुच्छेद 12-35"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_3",
                "name": "Directive Principles",
                "nameHi": "राज्य नीति के निदेशक तत्व",
                "subtopics": [
                  "भाग-4"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_pol_5",
                "name": "Parliament",
                "nameHi": "संसद",
                "subtopics": [
                  "लोकसभा",
                  "राज्यसभा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_6",
                "name": "President and Vice President",
                "nameHi": "राष्ट्रपति एवं उपराष्ट्रपति",
                "subtopics": [
                  "चुनाव",
                  "शक्तियाँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_7",
                "name": "Prime Minister and Council of Ministers",
                "nameHi": "प्रधानमंत्री एवं मंत्रिपरिषद",
                "subtopics": [
                  "कार्य",
                  "उत्तरदायित्व"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_8",
                "name": "Supreme Court",
                "nameHi": "सर्वोच्च न्यायालय",
                "subtopics": [
                  "संरचना",
                  "अधिकार क्षेत्र"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "si_gs_ch_3",
            "name": "भारत का भूगोल, अर्थव्यवस्था एवं सामान्य विज्ञान",
            "topics": [
              {
                "id": "ind_geo_1",
                "name": "Physical Geography of India",
                "nameHi": "भारत का भौतिक भूगोल",
                "subtopics": [
                  "हिमालय",
                  "उत्तरी मैदान",
                  "दक्कन का पठार",
                  "तटीय मैदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_2",
                "name": "Rivers of India",
                "nameHi": "भारत की नदियाँ",
                "subtopics": [
                  "गंगा",
                  "यमुना",
                  "ब्रह्मपुत्र",
                  "गोदावरी",
                  "नर्मदा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_3",
                "name": "Climate",
                "nameHi": "भारत की जलवायु",
                "subtopics": [
                  "मानसून",
                  "वर्षा",
                  "ऋतुएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_eco_1",
                "name": "Basic Economics",
                "nameHi": "अर्थशास्त्र की मूल अवधारणाएँ",
                "subtopics": [
                  "GDP",
                  "GNP",
                  "NNP",
                  "NITI Aayog"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_eco_2",
                "name": "Banking System",
                "nameHi": "बैंकिंग प्रणाली",
                "subtopics": [
                  "RBI",
                  "मौद्रिक नीति",
                  "वाणिज्यिक बैंक"
                ],
                "importanceScore": 10
              },
              {
                "id": "phy_1",
                "name": "Physical Quantities and Units",
                "nameHi": "भौतिक राशियाँ एवं मात्रक",
                "subtopics": [
                  "SI Units",
                  "Derived Units",
                  "Measurement"
                ],
                "importanceScore": 10
              },
              {
                "id": "phy_4",
                "name": "Work, Power and Energy",
                "nameHi": "कार्य, शक्ति एवं ऊर्जा",
                "subtopics": [
                  "Kinetic Energy",
                  "Potential Energy",
                  "Power"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_1",
                "name": "Matter and Its Nature",
                "nameHi": "पदार्थ एवं उसकी प्रकृति",
                "subtopics": [
                  "States of Matter",
                  "Properties"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_1",
                "name": "Cell",
                "nameHi": "कोशिका",
                "subtopics": [
                  "Cell Structure",
                  "Cell Organelles"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_9",
                "name": "Nutrition",
                "nameHi": "पोषण",
                "subtopics": [
                  "Vitamins",
                  "Minerals",
                  "Balanced Diet"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_10",
                "name": "Diseases",
                "nameHi": "रोग",
                "subtopics": [
                  "Bacterial",
                  "Viral",
                  "Deficiency Diseases"
                ],
                "importanceScore": 10
              },
              {
                "id": "env_1",
                "name": "Ecosystem",
                "nameHi": "पारिस्थितिकी तंत्र",
                "subtopics": [
                  "Food Chain",
                  "Food Web"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "si_gs_ch_4",
            "name": "पुलिस प्रशासन, कानून एवं आंतरिक सुरक्षा",
            "topics": [
              {
                "id": "si_law_1",
                "name": "CG Police Structure & Hierarchy",
                "nameHi": "छत्तीसगढ़ पुलिस संगठन, संरचना, रेंज एवं पद सोपान",
                "subtopics": [
                  "पुलिस महानिदेशक (DGP) से आरक्षक तक पद सोपान",
                  "पुलिस रेंज, जिला पुलिस बल, सशस्त्र पुलिस बल (CAF)",
                  "थाना स्तर का प्रशासनिक ढांचा एवं रोजनामचा"
                ],
                "importanceScore": 8
              },
              {
                "id": "si_law_2",
                "name": "Basic Criminal Laws (BNS, BNSS)",
                "nameHi": "भारतीय न्याय संहिता (BNS) एवं नागरिक सुरक्षा संहिता मूल तत्व",
                "subtopics": [
                  "अपराध की परिभाषा, संज्ञेय एवं असंज्ञेय अपराध",
                  "प्राथमिकी (FIR) दर्ज करने की कानूनी प्रक्रिया",
                  "गिरफ्तारी, तलाशी, जब्ती एवं जमानत संबंधी अधिकार",
                  "मानवाधिकार आयोग एवं पुलिस आचरण संहिता"
                ],
                "importanceScore": 8
              },
              {
                "id": "si_law_3",
                "name": "Cyber Crime & Forensic Basics",
                "nameHi": "साइबर अपराध, डिजिटल साक्ष्य एवं फोरेंसिक विज्ञान की मूल बातें",
                "subtopics": [
                  "साइबर अपराध के प्रकार (फिशिंग, हैकिंग, वित्तीय धोखाधड़ी)",
                  "आईटी अधिनियम 2000 की मुख्य धाराएं",
                  "फोरेंसिक साक्ष्य संग्रह, फिंगरप्रिंट एवं डीएनए परीक्षण"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "si_gs_ch_5",
            "name": "समसामयिक घटनाएं एवं खेल",
            "topics": [
              {
                "id": "ca_nat_1",
                "name": "Government Schemes",
                "nameHi": "केंद्र सरकार की योजनाएँ",
                "subtopics": [
                  "PM Kisan",
                  "PM Awas Yojana",
                  "Ayushman Bharat",
                  "Jal Jeevan Mission",
                  "PM Vishwakarma"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_nat_3",
                "name": "Appointments",
                "nameHi": "महत्वपूर्ण नियुक्तियाँ",
                "subtopics": [
                  "राष्ट्रपति",
                  "राज्यपाल",
                  "मुख्य न्यायाधीश",
                  "सेना प्रमुख"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_sports_1",
                "name": "National Sports Events",
                "nameHi": "राष्ट्रीय खेल आयोजन",
                "subtopics": [
                  "Khelo India",
                  "National Games"
                ],
                "importanceScore": 8
              },
              {
                "id": "ca_award_1",
                "name": "National Awards",
                "nameHi": "राष्ट्रीय पुरस्कार",
                "subtopics": [
                  "Bharat Ratna",
                  "Padma Awards"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "cg_hist_1",
            "name": "Prehistoric Chhattisgarh",
            "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
            "subtopics": [
              "शैलचित्र",
              "पुरातात्विक साक्ष्य",
              "प्रमुख स्थल"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_hist_2",
            "name": "Ancient Chhattisgarh",
            "nameHi": "प्राचीन छत्तीसगढ़",
            "subtopics": [
              "दक्षिण कोसल",
              "प्राचीन राजवंश",
              "सांस्कृतिक विकास"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_7",
            "name": "Kalchuri Dynasty",
            "nameHi": "कलचुरी वंश",
            "subtopics": [
              "रत्नपुर शाखा",
              "रायपुर शाखा",
              "सांस्कृतिक योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_9",
            "name": "Maratha Rule",
            "nameHi": "मराठा शासन",
            "subtopics": [
              "भोंसले शासन",
              "प्रशासन",
              "राजस्व व्यवस्था"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_10",
            "name": "British Rule in Chhattisgarh",
            "nameHi": "छत्तीसगढ़ में ब्रिटिश शासन",
            "subtopics": [
              "ब्रिटिश प्रशासन",
              "राजनीतिक परिवर्तन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_11",
            "name": "1857 Revolt in Chhattisgarh",
            "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
            "subtopics": [
              "वीर नारायण सिंह",
              "स्थानीय आंदोलन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_12",
            "name": "Freedom Movement",
            "nameHi": "स्वतंत्रता आंदोलन",
            "subtopics": [
              "असहयोग आंदोलन",
              "भारत छोड़ो आंदोलन",
              "स्थानीय योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_13",
            "name": "Formation of Chhattisgarh State",
            "nameHi": "छत्तीसगढ़ राज्य का गठन",
            "subtopics": [
              "राज्य आंदोलन",
              "1 नवम्बर 2000",
              "प्रमुख व्यक्तित्व"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_1",
            "name": "Location and Boundaries",
            "nameHi": "स्थिति एवं सीमाएँ",
            "subtopics": [
              "अक्षांश",
              "देशांतर",
              "पड़ोसी राज्य"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_2",
            "name": "Physiographic Divisions",
            "nameHi": "भौतिक विभाजन",
            "subtopics": [
              "मैदानी क्षेत्र",
              "पठारी क्षेत्र",
              "पर्वतीय क्षेत्र"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_3",
            "name": "Major Rivers",
            "nameHi": "प्रमुख नदियाँ",
            "subtopics": [
              "महानदी",
              "शिवनाथ",
              "इंद्रावती",
              "हसदेव",
              "अरपा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_7",
            "name": "Forest Resources",
            "nameHi": "वन संसाधन",
            "subtopics": [
              "वन क्षेत्र",
              "प्रमुख वृक्ष",
              "लघु वनोपज"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_10",
            "name": "Mineral Resources",
            "nameHi": "खनिज संसाधन",
            "subtopics": [
              "कोयला",
              "लौह अयस्क",
              "बॉक्साइट",
              "डोलोमाइट"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_1",
            "name": "Major Tribes",
            "nameHi": "प्रमुख जनजातियाँ",
            "subtopics": [
              "गोंड",
              "बैगा",
              "हल्बा",
              "उरांव",
              "कंवर"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_2",
            "name": "Special Tribal Groups",
            "nameHi": "विशेष पिछड़ी जनजातियाँ",
            "subtopics": [
              "अबूझमाड़िया",
              "कमार",
              "पहाड़ी कोरवा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_5",
            "name": "Festivals",
            "nameHi": "त्यौहार",
            "subtopics": [
              "हरेली",
              "पोला",
              "तीजा",
              "छेरछेरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_4",
            "name": "Districts and Divisions",
            "nameHi": "जिले एवं संभाग",
            "subtopics": [
              "सभी जिले",
              "सभी संभाग"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_6",
            "name": "Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन",
              "कृषि योजनाएँ",
              "शिक्षा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_cg_1",
            "name": "State Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन योजना",
              "कृषि योजनाएँ",
              "युवा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_1",
            "name": "Indus Valley Civilization",
            "nameHi": "सिंधु घाटी सभ्यता",
            "subtopics": [
              "हड़प्पा",
              "मोहनजोदड़ो",
              "लोथल",
              "कालीबंगन",
              "धौलावीरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_6",
            "name": "Maurya Empire",
            "nameHi": "मौर्य साम्राज्य",
            "subtopics": [
              "चंद्रगुप्त मौर्य",
              "अशोक",
              "मेगस्थनीज"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_med_2",
            "name": "Mughal Empire",
            "nameHi": "मुगल साम्राज्य",
            "subtopics": [
              "बाबर",
              "अकबर",
              "जहाँगीर",
              "शाहजहाँ",
              "औरंगजेब"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_3",
            "name": "Revolt of 1857",
            "nameHi": "1857 का विद्रोह",
            "subtopics": [
              "कारण",
              "नेता",
              "परिणाम"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_5",
            "name": "Gandhian Movements",
            "nameHi": "गांधीवादी आंदोलन",
            "subtopics": [
              "असहयोग",
              "सविनय अवज्ञा",
              "भारत छोड़ो"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_1",
            "name": "Constitution",
            "nameHi": "भारतीय संविधान",
            "subtopics": [
              "विशेषताएँ",
              "प्रस्तावना",
              "संशोधन"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_2",
            "name": "Fundamental Rights",
            "nameHi": "मौलिक अधिकार",
            "subtopics": [
              "अनुच्छेद 12-35"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_3",
            "name": "Directive Principles",
            "nameHi": "राज्य नीति के निदेशक तत्व",
            "subtopics": [
              "भाग-4"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_pol_5",
            "name": "Parliament",
            "nameHi": "संसद",
            "subtopics": [
              "लोकसभा",
              "राज्यसभा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_6",
            "name": "President and Vice President",
            "nameHi": "राष्ट्रपति एवं उपराष्ट्रपति",
            "subtopics": [
              "चुनाव",
              "शक्तियाँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_7",
            "name": "Prime Minister and Council of Ministers",
            "nameHi": "प्रधानमंत्री एवं मंत्रिपरिषद",
            "subtopics": [
              "कार्य",
              "उत्तरदायित्व"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_8",
            "name": "Supreme Court",
            "nameHi": "सर्वोच्च न्यायालय",
            "subtopics": [
              "संरचना",
              "अधिकार क्षेत्र"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_1",
            "name": "Physical Geography of India",
            "nameHi": "भारत का भौतिक भूगोल",
            "subtopics": [
              "हिमालय",
              "उत्तरी मैदान",
              "दक्कन का पठार",
              "तटीय मैदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_2",
            "name": "Rivers of India",
            "nameHi": "भारत की नदियाँ",
            "subtopics": [
              "गंगा",
              "यमुना",
              "ब्रह्मपुत्र",
              "गोदावरी",
              "नर्मदा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_3",
            "name": "Climate",
            "nameHi": "भारत की जलवायु",
            "subtopics": [
              "मानसून",
              "वर्षा",
              "ऋतुएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_eco_1",
            "name": "Basic Economics",
            "nameHi": "अर्थशास्त्र की मूल अवधारणाएँ",
            "subtopics": [
              "GDP",
              "GNP",
              "NNP",
              "NITI Aayog"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_eco_2",
            "name": "Banking System",
            "nameHi": "बैंकिंग प्रणाली",
            "subtopics": [
              "RBI",
              "मौद्रिक नीति",
              "वाणिज्यिक बैंक"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_1",
            "name": "Physical Quantities and Units",
            "nameHi": "भौतिक राशियाँ एवं मात्रक",
            "subtopics": [
              "SI Units",
              "Derived Units",
              "Measurement"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_4",
            "name": "Work, Power and Energy",
            "nameHi": "कार्य, शक्ति एवं ऊर्जा",
            "subtopics": [
              "Kinetic Energy",
              "Potential Energy",
              "Power"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_1",
            "name": "Matter and Its Nature",
            "nameHi": "पदार्थ एवं उसकी प्रकृति",
            "subtopics": [
              "States of Matter",
              "Properties"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_1",
            "name": "Cell",
            "nameHi": "कोशिका",
            "subtopics": [
              "Cell Structure",
              "Cell Organelles"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_9",
            "name": "Nutrition",
            "nameHi": "पोषण",
            "subtopics": [
              "Vitamins",
              "Minerals",
              "Balanced Diet"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_10",
            "name": "Diseases",
            "nameHi": "रोग",
            "subtopics": [
              "Bacterial",
              "Viral",
              "Deficiency Diseases"
            ],
            "importanceScore": 10
          },
          {
            "id": "env_1",
            "name": "Ecosystem",
            "nameHi": "पारिस्थितिकी तंत्र",
            "subtopics": [
              "Food Chain",
              "Food Web"
            ],
            "importanceScore": 10
          },
          {
            "id": "si_law_1",
            "name": "CG Police Structure & Hierarchy",
            "nameHi": "छत्तीसगढ़ पुलिस संगठन, संरचना, रेंज एवं पद सोपान",
            "subtopics": [
              "पुलिस महानिदेशक (DGP) से आरक्षक तक पद सोपान",
              "पुलिस रेंज, जिला पुलिस बल, सशस्त्र पुलिस बल (CAF)",
              "थाना स्तर का प्रशासनिक ढांचा एवं रोजनामचा"
            ],
            "importanceScore": 8
          },
          {
            "id": "si_law_2",
            "name": "Basic Criminal Laws (BNS, BNSS)",
            "nameHi": "भारतीय न्याय संहिता (BNS) एवं नागरिक सुरक्षा संहिता मूल तत्व",
            "subtopics": [
              "अपराध की परिभाषा, संज्ञेय एवं असंज्ञेय अपराध",
              "प्राथमिकी (FIR) दर्ज करने की कानूनी प्रक्रिया",
              "गिरफ्तारी, तलाशी, जब्ती एवं जमानत संबंधी अधिकार",
              "मानवाधिकार आयोग एवं पुलिस आचरण संहिता"
            ],
            "importanceScore": 8
          },
          {
            "id": "si_law_3",
            "name": "Cyber Crime & Forensic Basics",
            "nameHi": "साइबर अपराध, डिजिटल साक्ष्य एवं फोरेंसिक विज्ञान की मूल बातें",
            "subtopics": [
              "साइबर अपराध के प्रकार (फिशिंग, हैकिंग, वित्तीय धोखाधड़ी)",
              "आईटी अधिनियम 2000 की मुख्य धाराएं",
              "फोरेंसिक साक्ष्य संग्रह, फिंगरप्रिंट एवं डीएनए परीक्षण"
            ],
            "importanceScore": 8
          },
          {
            "id": "ca_nat_1",
            "name": "Government Schemes",
            "nameHi": "केंद्र सरकार की योजनाएँ",
            "subtopics": [
              "PM Kisan",
              "PM Awas Yojana",
              "Ayushman Bharat",
              "Jal Jeevan Mission",
              "PM Vishwakarma"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_3",
            "name": "Appointments",
            "nameHi": "महत्वपूर्ण नियुक्तियाँ",
            "subtopics": [
              "राष्ट्रपति",
              "राज्यपाल",
              "मुख्य न्यायाधीश",
              "सेना प्रमुख"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_sports_1",
            "name": "National Sports Events",
            "nameHi": "राष्ट्रीय खेल आयोजन",
            "subtopics": [
              "Khelo India",
              "National Games"
            ],
            "importanceScore": 8
          },
          {
            "id": "ca_award_1",
            "name": "National Awards",
            "nameHi": "राष्ट्रीय पुरस्कार",
            "subtopics": [
              "Bharat Ratna",
              "Padma Awards"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "si_aptitude",
        "name": "एप्टीट्यूड टेस्ट / गणित एवं तार्किक क्षमता (Paper 3)",
        "weightage": 200,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (200 Marks)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "si_aptitude_ch_1",
            "name": "संख्या पद्धति एवं व्यावसायिक अंकगणित",
            "topics": [
              {
                "id": "math_ns_1",
                "name": "Number System Basics",
                "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
                "subtopics": [
                  "प्राकृतिक संख्या",
                  "पूर्ण संख्या",
                  "पूर्णांक",
                  "परिमेय संख्या",
                  "अपरिमेय संख्या"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_2",
                "name": "Divisibility Rules",
                "nameHi": "विभाज्यता के नियम",
                "subtopics": [
                  "2,3,4,5,6,8,9,11 के नियम"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_3",
                "name": "LCM and HCF",
                "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
                "subtopics": [
                  "LCM",
                  "HCF",
                  "प्रयोग आधारित प्रश्न"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_5",
                "name": "Simplification",
                "nameHi": "सरलीकरण",
                "subtopics": [
                  "BODMAS",
                  "Fraction",
                  "Decimal"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_3",
                "name": "Average",
                "nameHi": "औसत",
                "subtopics": [
                  "Simple Average",
                  "Weighted Average"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_1",
                "name": "Percentage",
                "nameHi": "प्रतिशत",
                "subtopics": [
                  "Percentage Conversion",
                  "Increase & Decrease"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_2",
                "name": "Profit and Loss",
                "nameHi": "लाभ एवं हानि",
                "subtopics": [
                  "Cost Price",
                  "Selling Price",
                  "Profit Percentage"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_1",
                "name": "Ratio",
                "nameHi": "अनुपात",
                "subtopics": [
                  "Simple Ratio",
                  "Compound Ratio"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_1",
                "name": "Simple Interest",
                "nameHi": "साधारण ब्याज",
                "subtopics": [
                  "Principal",
                  "Rate",
                  "Time"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_2",
                "name": "Compound Interest",
                "nameHi": "चक्रवृद्धि ब्याज",
                "subtopics": [
                  "Annual CI",
                  "Half Yearly CI"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_3",
                "name": "Time and Work",
                "nameHi": "समय एवं कार्य",
                "subtopics": [
                  "Efficiency",
                  "Work Distribution"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_tsd_1",
                "name": "Speed Time Distance",
                "nameHi": "समय, चाल एवं दूरी",
                "subtopics": [
                  "Average Speed",
                  "Relative Speed"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "si_aptitude_ch_2",
            "name": "बीजगणित, ज्यामिति एवं क्षेत्रमिति",
            "topics": [
              {
                "id": "math_alg_1",
                "name": "Algebraic Identities",
                "nameHi": "बीजीय सर्वसमिकाएँ",
                "subtopics": [
                  "(a+b)²",
                  "(a-b)²",
                  "a²-b²"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_geo_1",
                "name": "Lines and Angles",
                "nameHi": "रेखाएँ एवं कोण",
                "subtopics": [
                  "Types of Angles",
                  "Parallel Lines"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_1",
                "name": "2D Mensuration",
                "nameHi": "समतल क्षेत्रमिति",
                "subtopics": [
                  "Square",
                  "Rectangle",
                  "Triangle",
                  "Circle"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_2",
                "name": "3D Mensuration",
                "nameHi": "ठोस क्षेत्रमिति",
                "subtopics": [
                  "Cube",
                  "Cuboid",
                  "Cylinder",
                  "Cone",
                  "Sphere"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "si_aptitude_ch_3",
            "name": "तार्किक एवं विश्लेषणात्मक योग्यता",
            "topics": [
              {
                "id": "reas_ser_1",
                "name": "Number Series",
                "nameHi": "संख्या श्रेणी",
                "subtopics": [
                  "Missing Number",
                  "Wrong Number",
                  "Pattern Based Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ser_2",
                "name": "Alphabet Series",
                "nameHi": "अक्षर श्रेणी",
                "subtopics": [
                  "Letter Pattern",
                  "Mixed Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ana_1",
                "name": "Analogy",
                "nameHi": "समानता",
                "subtopics": [
                  "Word Analogy",
                  "Number Analogy",
                  "Letter Analogy"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_cd_1",
                "name": "Letter Coding",
                "nameHi": "अक्षर कोडिंग",
                "subtopics": [
                  "Direct Coding",
                  "Reverse Coding"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_br_1",
                "name": "Blood Relations",
                "nameHi": "रक्त संबंध",
                "subtopics": [
                  "Family Tree",
                  "Generation Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_dir_1",
                "name": "Direction Sense",
                "nameHi": "दिशा ज्ञान",
                "subtopics": [
                  "North-South-East-West",
                  "Turning Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_syl_1",
                "name": "Syllogism",
                "nameHi": "न्याय निगमन",
                "subtopics": [
                  "Venn Method",
                  "Logical Conclusions"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ana_4",
                "name": "Puzzle Test",
                "nameHi": "पहेली परीक्षण",
                "subtopics": [
                  "Floor Puzzle",
                  "Box Puzzle",
                  "Scheduling Puzzle"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_nv_1",
                "name": "Mirror Image",
                "nameHi": "दर्पण प्रतिबिंब",
                "subtopics": [
                  "Vertical Mirror",
                  "Horizontal Mirror"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_nv_2",
                "name": "Water Image",
                "nameHi": "जल प्रतिबिंब",
                "subtopics": [
                  "Reflection Based"
                ],
                "importanceScore": 9
              },
              {
                "id": "reas_dm_1",
                "name": "Decision Making",
                "nameHi": "निर्णय क्षमता",
                "subtopics": [
                  "Situational Judgement",
                  "Administrative Decisions"
                ],
                "importanceScore": 9
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "math_ns_1",
            "name": "Number System Basics",
            "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
            "subtopics": [
              "प्राकृतिक संख्या",
              "पूर्ण संख्या",
              "पूर्णांक",
              "परिमेय संख्या",
              "अपरिमेय संख्या"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_2",
            "name": "Divisibility Rules",
            "nameHi": "विभाज्यता के नियम",
            "subtopics": [
              "2,3,4,5,6,8,9,11 के नियम"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_3",
            "name": "LCM and HCF",
            "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
            "subtopics": [
              "LCM",
              "HCF",
              "प्रयोग आधारित प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_5",
            "name": "Simplification",
            "nameHi": "सरलीकरण",
            "subtopics": [
              "BODMAS",
              "Fraction",
              "Decimal"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_3",
            "name": "Average",
            "nameHi": "औसत",
            "subtopics": [
              "Simple Average",
              "Weighted Average"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_1",
            "name": "Percentage",
            "nameHi": "प्रतिशत",
            "subtopics": [
              "Percentage Conversion",
              "Increase & Decrease"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_2",
            "name": "Profit and Loss",
            "nameHi": "लाभ एवं हानि",
            "subtopics": [
              "Cost Price",
              "Selling Price",
              "Profit Percentage"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_1",
            "name": "Ratio",
            "nameHi": "अनुपात",
            "subtopics": [
              "Simple Ratio",
              "Compound Ratio"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_1",
            "name": "Simple Interest",
            "nameHi": "साधारण ब्याज",
            "subtopics": [
              "Principal",
              "Rate",
              "Time"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_2",
            "name": "Compound Interest",
            "nameHi": "चक्रवृद्धि ब्याज",
            "subtopics": [
              "Annual CI",
              "Half Yearly CI"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_3",
            "name": "Time and Work",
            "nameHi": "समय एवं कार्य",
            "subtopics": [
              "Efficiency",
              "Work Distribution"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_tsd_1",
            "name": "Speed Time Distance",
            "nameHi": "समय, चाल एवं दूरी",
            "subtopics": [
              "Average Speed",
              "Relative Speed"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_alg_1",
            "name": "Algebraic Identities",
            "nameHi": "बीजीय सर्वसमिकाएँ",
            "subtopics": [
              "(a+b)²",
              "(a-b)²",
              "a²-b²"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_geo_1",
            "name": "Lines and Angles",
            "nameHi": "रेखाएँ एवं कोण",
            "subtopics": [
              "Types of Angles",
              "Parallel Lines"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_1",
            "name": "2D Mensuration",
            "nameHi": "समतल क्षेत्रमिति",
            "subtopics": [
              "Square",
              "Rectangle",
              "Triangle",
              "Circle"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_2",
            "name": "3D Mensuration",
            "nameHi": "ठोस क्षेत्रमिति",
            "subtopics": [
              "Cube",
              "Cuboid",
              "Cylinder",
              "Cone",
              "Sphere"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ser_1",
            "name": "Number Series",
            "nameHi": "संख्या श्रेणी",
            "subtopics": [
              "Missing Number",
              "Wrong Number",
              "Pattern Based Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ser_2",
            "name": "Alphabet Series",
            "nameHi": "अक्षर श्रेणी",
            "subtopics": [
              "Letter Pattern",
              "Mixed Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ana_1",
            "name": "Analogy",
            "nameHi": "समानता",
            "subtopics": [
              "Word Analogy",
              "Number Analogy",
              "Letter Analogy"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_cd_1",
            "name": "Letter Coding",
            "nameHi": "अक्षर कोडिंग",
            "subtopics": [
              "Direct Coding",
              "Reverse Coding"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_br_1",
            "name": "Blood Relations",
            "nameHi": "रक्त संबंध",
            "subtopics": [
              "Family Tree",
              "Generation Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_dir_1",
            "name": "Direction Sense",
            "nameHi": "दिशा ज्ञान",
            "subtopics": [
              "North-South-East-West",
              "Turning Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_syl_1",
            "name": "Syllogism",
            "nameHi": "न्याय निगमन",
            "subtopics": [
              "Venn Method",
              "Logical Conclusions"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ana_4",
            "name": "Puzzle Test",
            "nameHi": "पहेली परीक्षण",
            "subtopics": [
              "Floor Puzzle",
              "Box Puzzle",
              "Scheduling Puzzle"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_nv_1",
            "name": "Mirror Image",
            "nameHi": "दर्पण प्रतिबिंब",
            "subtopics": [
              "Vertical Mirror",
              "Horizontal Mirror"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_nv_2",
            "name": "Water Image",
            "nameHi": "जल प्रतिबिंब",
            "subtopics": [
              "Reflection Based"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_dm_1",
            "name": "Decision Making",
            "nameHi": "निर्णय क्षमता",
            "subtopics": [
              "Situational Judgement",
              "Administrative Decisions"
            ],
            "importanceScore": 9
          }
        ]
      }
    ]
  },
  "cg_constable": {
    "name": "CG Police Constable",
    "fullName": "Chhattisgarh Police Constable (GD / Driver / Tradesman) Exam",
    "icon": "🛡️",
    "category": "police",
    "description": "छत्तीसगढ़ पुलिस आरक्षक भर्ती परीक्षा — 100 अंक",
    "eligibility": "10th / 12th Pass",
    "pattern": {
      "totalMarks": 100,
      "time": "2 Hours",
      "type": "Objective MCQ (100 Questions, 100 Marks)",
      "papers": [
        {
          "paper": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
          "marks": 50
        },
        {
          "paper": "सामान्य मानसिक योग्यता (रीजनिंग)",
          "marks": 25
        },
        {
          "paper": "अंकगणित (Arithmetic)",
          "marks": 25
        }
      ]
    },
    "subjects": [
      {
        "id": "cgc_gk",
        "name": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
        "weightage": 50,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (50 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "cgc_gk_ch_1",
            "name": "छत्तीसगढ़ का इतिहास, भूगोल व संस्कृति",
            "topics": [
              {
                "id": "cg_hist_1",
                "name": "Prehistoric Chhattisgarh",
                "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
                "subtopics": [
                  "शैलचित्र",
                  "पुरातात्विक साक्ष्य",
                  "प्रमुख स्थल"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_hist_7",
                "name": "Kalchuri Dynasty",
                "nameHi": "कलचुरी वंश",
                "subtopics": [
                  "रत्नपुर शाखा",
                  "रायपुर शाखा",
                  "सांस्कृतिक योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_11",
                "name": "1857 Revolt in Chhattisgarh",
                "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
                "subtopics": [
                  "वीर नारायण सिंह",
                  "स्थानीय आंदोलन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_12",
                "name": "Freedom Movement",
                "nameHi": "स्वतंत्रता आंदोलन",
                "subtopics": [
                  "असहयोग आंदोलन",
                  "भारत छोड़ो आंदोलन",
                  "स्थानीय योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_1",
                "name": "Location and Boundaries",
                "nameHi": "स्थिति एवं सीमाएँ",
                "subtopics": [
                  "अक्षांश",
                  "देशांतर",
                  "पड़ोसी राज्य"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_2",
                "name": "Physiographic Divisions",
                "nameHi": "भौतिक विभाजन",
                "subtopics": [
                  "मैदानी क्षेत्र",
                  "पठारी क्षेत्र",
                  "पर्वतीय क्षेत्र"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_3",
                "name": "Major Rivers",
                "nameHi": "प्रमुख नदियाँ",
                "subtopics": [
                  "महानदी",
                  "शिवनाथ",
                  "इंद्रावती",
                  "हसदेव",
                  "अरपा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_7",
                "name": "Forest Resources",
                "nameHi": "वन संसाधन",
                "subtopics": [
                  "वन क्षेत्र",
                  "प्रमुख वृक्ष",
                  "लघु वनोपज"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_1",
                "name": "Major Tribes",
                "nameHi": "प्रमुख जनजातियाँ",
                "subtopics": [
                  "गोंड",
                  "बैगा",
                  "हल्बा",
                  "उरांव",
                  "कंवर"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_5",
                "name": "Festivals",
                "nameHi": "त्यौहार",
                "subtopics": [
                  "हरेली",
                  "पोला",
                  "तीजा",
                  "छेरछेरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_4",
                "name": "Districts and Divisions",
                "nameHi": "जिले एवं संभाग",
                "subtopics": [
                  "सभी जिले",
                  "सभी संभाग"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_6",
                "name": "Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन",
                  "कृषि योजनाएँ",
                  "शिक्षा योजनाएँ"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgc_gk_ch_2",
            "name": "भारत का इतिहास, भूगोल एवं संविधान",
            "topics": [
              {
                "id": "ind_hist_1",
                "name": "Indus Valley Civilization",
                "nameHi": "सिंधु घाटी सभ्यता",
                "subtopics": [
                  "हड़प्पा",
                  "मोहनजोदड़ो",
                  "लोथल",
                  "कालीबंगन",
                  "धौलावीरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_5",
                "name": "Gandhian Movements",
                "nameHi": "गांधीवादी आंदोलन",
                "subtopics": [
                  "असहयोग",
                  "सविनय अवज्ञा",
                  "भारत छोड़ो"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_1",
                "name": "Physical Geography of India",
                "nameHi": "भारत का भौतिक भूगोल",
                "subtopics": [
                  "हिमालय",
                  "उत्तरी मैदान",
                  "दक्कन का पठार",
                  "तटीय मैदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_1",
                "name": "Constitution",
                "nameHi": "भारतीय संविधान",
                "subtopics": [
                  "विशेषताएँ",
                  "प्रस्तावना",
                  "संशोधन"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_2",
                "name": "Fundamental Rights",
                "nameHi": "मौलिक अधिकार",
                "subtopics": [
                  "अनुच्छेद 12-35"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_5",
                "name": "Parliament",
                "nameHi": "संसद",
                "subtopics": [
                  "लोकसभा",
                  "राज्यसभा"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgc_gk_ch_3",
            "name": "सामान्य विज्ञान एवं समसामयिकी",
            "topics": [
              {
                "id": "phy_1",
                "name": "Physical Quantities and Units",
                "nameHi": "भौतिक राशियाँ एवं मात्रक",
                "subtopics": [
                  "SI Units",
                  "Derived Units",
                  "Measurement"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_1",
                "name": "Matter and Its Nature",
                "nameHi": "पदार्थ एवं उसकी प्रकृति",
                "subtopics": [
                  "States of Matter",
                  "Properties"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_9",
                "name": "Nutrition",
                "nameHi": "पोषण",
                "subtopics": [
                  "Vitamins",
                  "Minerals",
                  "Balanced Diet"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_10",
                "name": "Diseases",
                "nameHi": "रोग",
                "subtopics": [
                  "Bacterial",
                  "Viral",
                  "Deficiency Diseases"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_nat_1",
                "name": "Government Schemes",
                "nameHi": "केंद्र सरकार की योजनाएँ",
                "subtopics": [
                  "PM Kisan",
                  "PM Awas Yojana",
                  "Ayushman Bharat",
                  "Jal Jeevan Mission",
                  "PM Vishwakarma"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_cg_1",
                "name": "State Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन योजना",
                  "कृषि योजनाएँ",
                  "युवा योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_sports_1",
                "name": "National Sports Events",
                "nameHi": "राष्ट्रीय खेल आयोजन",
                "subtopics": [
                  "Khelo India",
                  "National Games"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "cg_hist_1",
            "name": "Prehistoric Chhattisgarh",
            "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
            "subtopics": [
              "शैलचित्र",
              "पुरातात्विक साक्ष्य",
              "प्रमुख स्थल"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_hist_7",
            "name": "Kalchuri Dynasty",
            "nameHi": "कलचुरी वंश",
            "subtopics": [
              "रत्नपुर शाखा",
              "रायपुर शाखा",
              "सांस्कृतिक योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_11",
            "name": "1857 Revolt in Chhattisgarh",
            "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
            "subtopics": [
              "वीर नारायण सिंह",
              "स्थानीय आंदोलन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_12",
            "name": "Freedom Movement",
            "nameHi": "स्वतंत्रता आंदोलन",
            "subtopics": [
              "असहयोग आंदोलन",
              "भारत छोड़ो आंदोलन",
              "स्थानीय योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_1",
            "name": "Location and Boundaries",
            "nameHi": "स्थिति एवं सीमाएँ",
            "subtopics": [
              "अक्षांश",
              "देशांतर",
              "पड़ोसी राज्य"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_2",
            "name": "Physiographic Divisions",
            "nameHi": "भौतिक विभाजन",
            "subtopics": [
              "मैदानी क्षेत्र",
              "पठारी क्षेत्र",
              "पर्वतीय क्षेत्र"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_3",
            "name": "Major Rivers",
            "nameHi": "प्रमुख नदियाँ",
            "subtopics": [
              "महानदी",
              "शिवनाथ",
              "इंद्रावती",
              "हसदेव",
              "अरपा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_7",
            "name": "Forest Resources",
            "nameHi": "वन संसाधन",
            "subtopics": [
              "वन क्षेत्र",
              "प्रमुख वृक्ष",
              "लघु वनोपज"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_1",
            "name": "Major Tribes",
            "nameHi": "प्रमुख जनजातियाँ",
            "subtopics": [
              "गोंड",
              "बैगा",
              "हल्बा",
              "उरांव",
              "कंवर"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_5",
            "name": "Festivals",
            "nameHi": "त्यौहार",
            "subtopics": [
              "हरेली",
              "पोला",
              "तीजा",
              "छेरछेरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_4",
            "name": "Districts and Divisions",
            "nameHi": "जिले एवं संभाग",
            "subtopics": [
              "सभी जिले",
              "सभी संभाग"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_6",
            "name": "Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन",
              "कृषि योजनाएँ",
              "शिक्षा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_1",
            "name": "Indus Valley Civilization",
            "nameHi": "सिंधु घाटी सभ्यता",
            "subtopics": [
              "हड़प्पा",
              "मोहनजोदड़ो",
              "लोथल",
              "कालीबंगन",
              "धौलावीरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_5",
            "name": "Gandhian Movements",
            "nameHi": "गांधीवादी आंदोलन",
            "subtopics": [
              "असहयोग",
              "सविनय अवज्ञा",
              "भारत छोड़ो"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_1",
            "name": "Physical Geography of India",
            "nameHi": "भारत का भौतिक भूगोल",
            "subtopics": [
              "हिमालय",
              "उत्तरी मैदान",
              "दक्कन का पठार",
              "तटीय मैदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_1",
            "name": "Constitution",
            "nameHi": "भारतीय संविधान",
            "subtopics": [
              "विशेषताएँ",
              "प्रस्तावना",
              "संशोधन"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_2",
            "name": "Fundamental Rights",
            "nameHi": "मौलिक अधिकार",
            "subtopics": [
              "अनुच्छेद 12-35"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_5",
            "name": "Parliament",
            "nameHi": "संसद",
            "subtopics": [
              "लोकसभा",
              "राज्यसभा"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_1",
            "name": "Physical Quantities and Units",
            "nameHi": "भौतिक राशियाँ एवं मात्रक",
            "subtopics": [
              "SI Units",
              "Derived Units",
              "Measurement"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_1",
            "name": "Matter and Its Nature",
            "nameHi": "पदार्थ एवं उसकी प्रकृति",
            "subtopics": [
              "States of Matter",
              "Properties"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_9",
            "name": "Nutrition",
            "nameHi": "पोषण",
            "subtopics": [
              "Vitamins",
              "Minerals",
              "Balanced Diet"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_10",
            "name": "Diseases",
            "nameHi": "रोग",
            "subtopics": [
              "Bacterial",
              "Viral",
              "Deficiency Diseases"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_1",
            "name": "Government Schemes",
            "nameHi": "केंद्र सरकार की योजनाएँ",
            "subtopics": [
              "PM Kisan",
              "PM Awas Yojana",
              "Ayushman Bharat",
              "Jal Jeevan Mission",
              "PM Vishwakarma"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_cg_1",
            "name": "State Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन योजना",
              "कृषि योजनाएँ",
              "युवा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_sports_1",
            "name": "National Sports Events",
            "nameHi": "राष्ट्रीय खेल आयोजन",
            "subtopics": [
              "Khelo India",
              "National Games"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "cgc_reasoning",
        "name": "सामान्य मानसिक योग्यता (रीजनिंग)",
        "weightage": 25,
        "importance": "High",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgc_reasoning_ch_1",
            "name": "तार्किक श्रेणी एवं सादृश्यता",
            "topics": [
              {
                "id": "reas_ser_1",
                "name": "Number Series",
                "nameHi": "संख्या श्रेणी",
                "subtopics": [
                  "Missing Number",
                  "Wrong Number",
                  "Pattern Based Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ser_2",
                "name": "Alphabet Series",
                "nameHi": "अक्षर श्रेणी",
                "subtopics": [
                  "Letter Pattern",
                  "Mixed Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ana_1",
                "name": "Analogy",
                "nameHi": "समानता",
                "subtopics": [
                  "Word Analogy",
                  "Number Analogy",
                  "Letter Analogy"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgc_reasoning_ch_2",
            "name": "कोडिंग, रक्त संबंध व दिशा",
            "topics": [
              {
                "id": "reas_cd_1",
                "name": "Letter Coding",
                "nameHi": "अक्षर कोडिंग",
                "subtopics": [
                  "Direct Coding",
                  "Reverse Coding"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_br_1",
                "name": "Blood Relations",
                "nameHi": "रक्त संबंध",
                "subtopics": [
                  "Family Tree",
                  "Generation Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_dir_1",
                "name": "Direction Sense",
                "nameHi": "दिशा ज्ञान",
                "subtopics": [
                  "North-South-East-West",
                  "Turning Problems"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgc_reasoning_ch_3",
            "name": "वेन आरेख एवं अशाब्दिक रीजनिंग",
            "topics": [
              {
                "id": "reas_nv_1",
                "name": "Mirror Image",
                "nameHi": "दर्पण प्रतिबिंब",
                "subtopics": [
                  "Vertical Mirror",
                  "Horizontal Mirror"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_nv_2",
                "name": "Water Image",
                "nameHi": "जल प्रतिबिंब",
                "subtopics": [
                  "Reflection Based"
                ],
                "importanceScore": 9
              },
              {
                "id": "reas_nv_5",
                "name": "Embedded Figures",
                "nameHi": "अंतर्निहित आकृतियाँ",
                "subtopics": [
                  "Shape Detection"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "reas_ser_1",
            "name": "Number Series",
            "nameHi": "संख्या श्रेणी",
            "subtopics": [
              "Missing Number",
              "Wrong Number",
              "Pattern Based Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ser_2",
            "name": "Alphabet Series",
            "nameHi": "अक्षर श्रेणी",
            "subtopics": [
              "Letter Pattern",
              "Mixed Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ana_1",
            "name": "Analogy",
            "nameHi": "समानता",
            "subtopics": [
              "Word Analogy",
              "Number Analogy",
              "Letter Analogy"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_cd_1",
            "name": "Letter Coding",
            "nameHi": "अक्षर कोडिंग",
            "subtopics": [
              "Direct Coding",
              "Reverse Coding"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_br_1",
            "name": "Blood Relations",
            "nameHi": "रक्त संबंध",
            "subtopics": [
              "Family Tree",
              "Generation Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_dir_1",
            "name": "Direction Sense",
            "nameHi": "दिशा ज्ञान",
            "subtopics": [
              "North-South-East-West",
              "Turning Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_nv_1",
            "name": "Mirror Image",
            "nameHi": "दर्पण प्रतिबिंब",
            "subtopics": [
              "Vertical Mirror",
              "Horizontal Mirror"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_nv_2",
            "name": "Water Image",
            "nameHi": "जल प्रतिबिंब",
            "subtopics": [
              "Reflection Based"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_nv_5",
            "name": "Embedded Figures",
            "nameHi": "अंतर्निहित आकृतियाँ",
            "subtopics": [
              "Shape Detection"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "cgc_maths",
        "name": "अंकगणित (Arithmetic)",
        "weightage": 25,
        "importance": "High",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgc_maths_ch_1",
            "name": "संख्या पद्धति एवं सरलीकरण",
            "topics": [
              {
                "id": "math_ns_1",
                "name": "Number System Basics",
                "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
                "subtopics": [
                  "प्राकृतिक संख्या",
                  "पूर्ण संख्या",
                  "पूर्णांक",
                  "परिमेय संख्या",
                  "अपरिमेय संख्या"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_2",
                "name": "Divisibility Rules",
                "nameHi": "विभाज्यता के नियम",
                "subtopics": [
                  "2,3,4,5,6,8,9,11 के नियम"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_3",
                "name": "LCM and HCF",
                "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
                "subtopics": [
                  "LCM",
                  "HCF",
                  "प्रयोग आधारित प्रश्न"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_5",
                "name": "Simplification",
                "nameHi": "सरलीकरण",
                "subtopics": [
                  "BODMAS",
                  "Fraction",
                  "Decimal"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgc_maths_ch_2",
            "name": "औसत, प्रतिशत एवं लाभ-हानि",
            "topics": [
              {
                "id": "math_ratio_3",
                "name": "Average",
                "nameHi": "औसत",
                "subtopics": [
                  "Simple Average",
                  "Weighted Average"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_1",
                "name": "Percentage",
                "nameHi": "प्रतिशत",
                "subtopics": [
                  "Percentage Conversion",
                  "Increase & Decrease"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_2",
                "name": "Profit and Loss",
                "nameHi": "लाभ एवं हानि",
                "subtopics": [
                  "Cost Price",
                  "Selling Price",
                  "Profit Percentage"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgc_maths_ch_3",
            "name": "ब्याज, अनुपात एवं समय-दूरी",
            "topics": [
              {
                "id": "math_si_1",
                "name": "Simple Interest",
                "nameHi": "साधारण ब्याज",
                "subtopics": [
                  "Principal",
                  "Rate",
                  "Time"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_2",
                "name": "Compound Interest",
                "nameHi": "चक्रवृद्धि ब्याज",
                "subtopics": [
                  "Annual CI",
                  "Half Yearly CI"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_1",
                "name": "Ratio",
                "nameHi": "अनुपात",
                "subtopics": [
                  "Simple Ratio",
                  "Compound Ratio"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_3",
                "name": "Time and Work",
                "nameHi": "समय एवं कार्य",
                "subtopics": [
                  "Efficiency",
                  "Work Distribution"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_tsd_1",
                "name": "Speed Time Distance",
                "nameHi": "समय, चाल एवं दूरी",
                "subtopics": [
                  "Average Speed",
                  "Relative Speed"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgc_maths_ch_4",
            "name": "क्षेत्रमिति",
            "topics": [
              {
                "id": "math_men_1",
                "name": "2D Mensuration",
                "nameHi": "समतल क्षेत्रमिति",
                "subtopics": [
                  "Square",
                  "Rectangle",
                  "Triangle",
                  "Circle"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_2",
                "name": "3D Mensuration",
                "nameHi": "ठोस क्षेत्रमिति",
                "subtopics": [
                  "Cube",
                  "Cuboid",
                  "Cylinder",
                  "Cone",
                  "Sphere"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "math_ns_1",
            "name": "Number System Basics",
            "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
            "subtopics": [
              "प्राकृतिक संख्या",
              "पूर्ण संख्या",
              "पूर्णांक",
              "परिमेय संख्या",
              "अपरिमेय संख्या"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_2",
            "name": "Divisibility Rules",
            "nameHi": "विभाज्यता के नियम",
            "subtopics": [
              "2,3,4,5,6,8,9,11 के नियम"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_3",
            "name": "LCM and HCF",
            "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
            "subtopics": [
              "LCM",
              "HCF",
              "प्रयोग आधारित प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_5",
            "name": "Simplification",
            "nameHi": "सरलीकरण",
            "subtopics": [
              "BODMAS",
              "Fraction",
              "Decimal"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_3",
            "name": "Average",
            "nameHi": "औसत",
            "subtopics": [
              "Simple Average",
              "Weighted Average"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_1",
            "name": "Percentage",
            "nameHi": "प्रतिशत",
            "subtopics": [
              "Percentage Conversion",
              "Increase & Decrease"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_2",
            "name": "Profit and Loss",
            "nameHi": "लाभ एवं हानि",
            "subtopics": [
              "Cost Price",
              "Selling Price",
              "Profit Percentage"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_1",
            "name": "Simple Interest",
            "nameHi": "साधारण ब्याज",
            "subtopics": [
              "Principal",
              "Rate",
              "Time"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_2",
            "name": "Compound Interest",
            "nameHi": "चक्रवृद्धि ब्याज",
            "subtopics": [
              "Annual CI",
              "Half Yearly CI"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_1",
            "name": "Ratio",
            "nameHi": "अनुपात",
            "subtopics": [
              "Simple Ratio",
              "Compound Ratio"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_3",
            "name": "Time and Work",
            "nameHi": "समय एवं कार्य",
            "subtopics": [
              "Efficiency",
              "Work Distribution"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_tsd_1",
            "name": "Speed Time Distance",
            "nameHi": "समय, चाल एवं दूरी",
            "subtopics": [
              "Average Speed",
              "Relative Speed"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_1",
            "name": "2D Mensuration",
            "nameHi": "समतल क्षेत्रमिति",
            "subtopics": [
              "Square",
              "Rectangle",
              "Triangle",
              "Circle"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_2",
            "name": "3D Mensuration",
            "nameHi": "ठोस क्षेत्रमिति",
            "subtopics": [
              "Cube",
              "Cuboid",
              "Cylinder",
              "Cone",
              "Sphere"
            ],
            "importanceScore": 10
          }
        ]
      }
    ]
  },
  "excise_constable": {
    "name": "Excise Constable",
    "fullName": "Chhattisgarh Excise Constable (आबकारी आरक्षक) Recruitment Exam",
    "icon": "🍷",
    "category": "police",
    "description": "छत्तीसगढ़ आबकारी आरक्षक सीधी भर्ती परीक्षा — 100 अंक",
    "eligibility": "12th Pass",
    "pattern": {
      "totalMarks": 100,
      "time": "2 Hours",
      "type": "Objective MCQ (100 Questions, 100 Marks)",
      "papers": [
        {
          "paper": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
          "marks": 50
        },
        {
          "paper": "सामान्य मानसिक योग्यता (रीजनिंग)",
          "marks": 25
        },
        {
          "paper": "सामान्य गणित (Mathematics)",
          "marks": 25
        }
      ]
    },
    "subjects": [
      {
        "id": "excise_gk",
        "name": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
        "weightage": 50,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (50 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "excise_gk_ch_1",
            "name": "छत्तीसगढ़ का इतिहास, भूगोल व संस्कृति",
            "topics": [
              {
                "id": "cg_hist_1",
                "name": "Prehistoric Chhattisgarh",
                "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
                "subtopics": [
                  "शैलचित्र",
                  "पुरातात्विक साक्ष्य",
                  "प्रमुख स्थल"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_hist_7",
                "name": "Kalchuri Dynasty",
                "nameHi": "कलचुरी वंश",
                "subtopics": [
                  "रत्नपुर शाखा",
                  "रायपुर शाखा",
                  "सांस्कृतिक योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_11",
                "name": "1857 Revolt in Chhattisgarh",
                "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
                "subtopics": [
                  "वीर नारायण सिंह",
                  "स्थानीय आंदोलन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_12",
                "name": "Freedom Movement",
                "nameHi": "स्वतंत्रता आंदोलन",
                "subtopics": [
                  "असहयोग आंदोलन",
                  "भारत छोड़ो आंदोलन",
                  "स्थानीय योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_1",
                "name": "Location and Boundaries",
                "nameHi": "स्थिति एवं सीमाएँ",
                "subtopics": [
                  "अक्षांश",
                  "देशांतर",
                  "पड़ोसी राज्य"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_3",
                "name": "Major Rivers",
                "nameHi": "प्रमुख नदियाँ",
                "subtopics": [
                  "महानदी",
                  "शिवनाथ",
                  "इंद्रावती",
                  "हसदेव",
                  "अरपा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_1",
                "name": "Major Tribes",
                "nameHi": "प्रमुख जनजातियाँ",
                "subtopics": [
                  "गोंड",
                  "बैगा",
                  "हल्बा",
                  "उरांव",
                  "कंवर"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_5",
                "name": "Festivals",
                "nameHi": "त्यौहार",
                "subtopics": [
                  "हरेली",
                  "पोला",
                  "तीजा",
                  "छेरछेरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_4",
                "name": "Districts and Divisions",
                "nameHi": "जिले एवं संभाग",
                "subtopics": [
                  "सभी जिले",
                  "सभी संभाग"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_6",
                "name": "Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन",
                  "कृषि योजनाएँ",
                  "शिक्षा योजनाएँ"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "excise_gk_ch_2",
            "name": "भारत का इतिहास, भूगोल एवं संविधान",
            "topics": [
              {
                "id": "ind_hist_1",
                "name": "Indus Valley Civilization",
                "nameHi": "सिंधु घाटी सभ्यता",
                "subtopics": [
                  "हड़प्पा",
                  "मोहनजोदड़ो",
                  "लोथल",
                  "कालीबंगन",
                  "धौलावीरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_5",
                "name": "Gandhian Movements",
                "nameHi": "गांधीवादी आंदोलन",
                "subtopics": [
                  "असहयोग",
                  "सविनय अवज्ञा",
                  "भारत छोड़ो"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_1",
                "name": "Physical Geography of India",
                "nameHi": "भारत का भौतिक भूगोल",
                "subtopics": [
                  "हिमालय",
                  "उत्तरी मैदान",
                  "दक्कन का पठार",
                  "तटीय मैदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_1",
                "name": "Constitution",
                "nameHi": "भारतीय संविधान",
                "subtopics": [
                  "विशेषताएँ",
                  "प्रस्तावना",
                  "संशोधन"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_2",
                "name": "Fundamental Rights",
                "nameHi": "मौलिक अधिकार",
                "subtopics": [
                  "अनुच्छेद 12-35"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_5",
                "name": "Parliament",
                "nameHi": "संसद",
                "subtopics": [
                  "लोकसभा",
                  "राज्यसभा"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "excise_gk_ch_3",
            "name": "सामान्य विज्ञान एवं समसामयिकी",
            "topics": [
              {
                "id": "phy_1",
                "name": "Physical Quantities and Units",
                "nameHi": "भौतिक राशियाँ एवं मात्रक",
                "subtopics": [
                  "SI Units",
                  "Derived Units",
                  "Measurement"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_1",
                "name": "Matter and Its Nature",
                "nameHi": "पदार्थ एवं उसकी प्रकृति",
                "subtopics": [
                  "States of Matter",
                  "Properties"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_5",
                "name": "Acids, Bases and Salts",
                "nameHi": "अम्ल, क्षार एवं लवण",
                "subtopics": [
                  "pH Scale",
                  "Indicators"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_1",
                "name": "Cell",
                "nameHi": "कोशिका",
                "subtopics": [
                  "Cell Structure",
                  "Cell Organelles"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_10",
                "name": "Diseases",
                "nameHi": "रोग",
                "subtopics": [
                  "Bacterial",
                  "Viral",
                  "Deficiency Diseases"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_nat_1",
                "name": "Government Schemes",
                "nameHi": "केंद्र सरकार की योजनाएँ",
                "subtopics": [
                  "PM Kisan",
                  "PM Awas Yojana",
                  "Ayushman Bharat",
                  "Jal Jeevan Mission",
                  "PM Vishwakarma"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_cg_1",
                "name": "State Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन योजना",
                  "कृषि योजनाएँ",
                  "युवा योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_sports_1",
                "name": "National Sports Events",
                "nameHi": "राष्ट्रीय खेल आयोजन",
                "subtopics": [
                  "Khelo India",
                  "National Games"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "cg_hist_1",
            "name": "Prehistoric Chhattisgarh",
            "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
            "subtopics": [
              "शैलचित्र",
              "पुरातात्विक साक्ष्य",
              "प्रमुख स्थल"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_hist_7",
            "name": "Kalchuri Dynasty",
            "nameHi": "कलचुरी वंश",
            "subtopics": [
              "रत्नपुर शाखा",
              "रायपुर शाखा",
              "सांस्कृतिक योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_11",
            "name": "1857 Revolt in Chhattisgarh",
            "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
            "subtopics": [
              "वीर नारायण सिंह",
              "स्थानीय आंदोलन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_12",
            "name": "Freedom Movement",
            "nameHi": "स्वतंत्रता आंदोलन",
            "subtopics": [
              "असहयोग आंदोलन",
              "भारत छोड़ो आंदोलन",
              "स्थानीय योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_1",
            "name": "Location and Boundaries",
            "nameHi": "स्थिति एवं सीमाएँ",
            "subtopics": [
              "अक्षांश",
              "देशांतर",
              "पड़ोसी राज्य"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_3",
            "name": "Major Rivers",
            "nameHi": "प्रमुख नदियाँ",
            "subtopics": [
              "महानदी",
              "शिवनाथ",
              "इंद्रावती",
              "हसदेव",
              "अरपा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_1",
            "name": "Major Tribes",
            "nameHi": "प्रमुख जनजातियाँ",
            "subtopics": [
              "गोंड",
              "बैगा",
              "हल्बा",
              "उरांव",
              "कंवर"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_5",
            "name": "Festivals",
            "nameHi": "त्यौहार",
            "subtopics": [
              "हरेली",
              "पोला",
              "तीजा",
              "छेरछेरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_4",
            "name": "Districts and Divisions",
            "nameHi": "जिले एवं संभाग",
            "subtopics": [
              "सभी जिले",
              "सभी संभाग"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_6",
            "name": "Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन",
              "कृषि योजनाएँ",
              "शिक्षा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_1",
            "name": "Indus Valley Civilization",
            "nameHi": "सिंधु घाटी सभ्यता",
            "subtopics": [
              "हड़प्पा",
              "मोहनजोदड़ो",
              "लोथल",
              "कालीबंगन",
              "धौलावीरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_5",
            "name": "Gandhian Movements",
            "nameHi": "गांधीवादी आंदोलन",
            "subtopics": [
              "असहयोग",
              "सविनय अवज्ञा",
              "भारत छोड़ो"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_1",
            "name": "Physical Geography of India",
            "nameHi": "भारत का भौतिक भूगोल",
            "subtopics": [
              "हिमालय",
              "उत्तरी मैदान",
              "दक्कन का पठार",
              "तटीय मैदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_1",
            "name": "Constitution",
            "nameHi": "भारतीय संविधान",
            "subtopics": [
              "विशेषताएँ",
              "प्रस्तावना",
              "संशोधन"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_2",
            "name": "Fundamental Rights",
            "nameHi": "मौलिक अधिकार",
            "subtopics": [
              "अनुच्छेद 12-35"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_5",
            "name": "Parliament",
            "nameHi": "संसद",
            "subtopics": [
              "लोकसभा",
              "राज्यसभा"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_1",
            "name": "Physical Quantities and Units",
            "nameHi": "भौतिक राशियाँ एवं मात्रक",
            "subtopics": [
              "SI Units",
              "Derived Units",
              "Measurement"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_1",
            "name": "Matter and Its Nature",
            "nameHi": "पदार्थ एवं उसकी प्रकृति",
            "subtopics": [
              "States of Matter",
              "Properties"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_5",
            "name": "Acids, Bases and Salts",
            "nameHi": "अम्ल, क्षार एवं लवण",
            "subtopics": [
              "pH Scale",
              "Indicators"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_1",
            "name": "Cell",
            "nameHi": "कोशिका",
            "subtopics": [
              "Cell Structure",
              "Cell Organelles"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_10",
            "name": "Diseases",
            "nameHi": "रोग",
            "subtopics": [
              "Bacterial",
              "Viral",
              "Deficiency Diseases"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_1",
            "name": "Government Schemes",
            "nameHi": "केंद्र सरकार की योजनाएँ",
            "subtopics": [
              "PM Kisan",
              "PM Awas Yojana",
              "Ayushman Bharat",
              "Jal Jeevan Mission",
              "PM Vishwakarma"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_cg_1",
            "name": "State Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन योजना",
              "कृषि योजनाएँ",
              "युवा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_sports_1",
            "name": "National Sports Events",
            "nameHi": "राष्ट्रीय खेल आयोजन",
            "subtopics": [
              "Khelo India",
              "National Games"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "excise_reasoning",
        "name": "सामान्य मानसिक योग्यता (रीजनिंग)",
        "weightage": 25,
        "importance": "High",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "excise_reasoning_ch_1",
            "name": "श्रेणी, सादृश्यता एवं वर्गीकरण",
            "topics": [
              {
                "id": "reas_ser_1",
                "name": "Number Series",
                "nameHi": "संख्या श्रेणी",
                "subtopics": [
                  "Missing Number",
                  "Wrong Number",
                  "Pattern Based Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ser_2",
                "name": "Alphabet Series",
                "nameHi": "अक्षर श्रेणी",
                "subtopics": [
                  "Letter Pattern",
                  "Mixed Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ana_1",
                "name": "Analogy",
                "nameHi": "समानता",
                "subtopics": [
                  "Word Analogy",
                  "Number Analogy",
                  "Letter Analogy"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "excise_reasoning_ch_2",
            "name": "कोडिंग-डिकोडिंग, रक्त संबंध व दिशा",
            "topics": [
              {
                "id": "reas_cd_1",
                "name": "Letter Coding",
                "nameHi": "अक्षर कोडिंग",
                "subtopics": [
                  "Direct Coding",
                  "Reverse Coding"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_br_1",
                "name": "Blood Relations",
                "nameHi": "रक्त संबंध",
                "subtopics": [
                  "Family Tree",
                  "Generation Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_dir_1",
                "name": "Direction Sense",
                "nameHi": "दिशा ज्ञान",
                "subtopics": [
                  "North-South-East-West",
                  "Turning Problems"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "excise_reasoning_ch_3",
            "name": "अशाब्दिक तर्कशक्ति",
            "topics": [
              {
                "id": "reas_nv_1",
                "name": "Mirror Image",
                "nameHi": "दर्पण प्रतिबिंब",
                "subtopics": [
                  "Vertical Mirror",
                  "Horizontal Mirror"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_nv_2",
                "name": "Water Image",
                "nameHi": "जल प्रतिबिंब",
                "subtopics": [
                  "Reflection Based"
                ],
                "importanceScore": 9
              },
              {
                "id": "reas_nv_5",
                "name": "Embedded Figures",
                "nameHi": "अंतर्निहित आकृतियाँ",
                "subtopics": [
                  "Shape Detection"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "reas_ser_1",
            "name": "Number Series",
            "nameHi": "संख्या श्रेणी",
            "subtopics": [
              "Missing Number",
              "Wrong Number",
              "Pattern Based Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ser_2",
            "name": "Alphabet Series",
            "nameHi": "अक्षर श्रेणी",
            "subtopics": [
              "Letter Pattern",
              "Mixed Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ana_1",
            "name": "Analogy",
            "nameHi": "समानता",
            "subtopics": [
              "Word Analogy",
              "Number Analogy",
              "Letter Analogy"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_cd_1",
            "name": "Letter Coding",
            "nameHi": "अक्षर कोडिंग",
            "subtopics": [
              "Direct Coding",
              "Reverse Coding"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_br_1",
            "name": "Blood Relations",
            "nameHi": "रक्त संबंध",
            "subtopics": [
              "Family Tree",
              "Generation Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_dir_1",
            "name": "Direction Sense",
            "nameHi": "दिशा ज्ञान",
            "subtopics": [
              "North-South-East-West",
              "Turning Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_nv_1",
            "name": "Mirror Image",
            "nameHi": "दर्पण प्रतिबिंब",
            "subtopics": [
              "Vertical Mirror",
              "Horizontal Mirror"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_nv_2",
            "name": "Water Image",
            "nameHi": "जल प्रतिबिंब",
            "subtopics": [
              "Reflection Based"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_nv_5",
            "name": "Embedded Figures",
            "nameHi": "अंतर्निहित आकृतियाँ",
            "subtopics": [
              "Shape Detection"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "excise_maths",
        "name": "सामान्य गणित (Mathematics)",
        "weightage": 25,
        "importance": "High",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "excise_maths_ch_1",
            "name": "संख्या पद्धति एवं सरलीकरण",
            "topics": [
              {
                "id": "math_ns_1",
                "name": "Number System Basics",
                "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
                "subtopics": [
                  "प्राकृतिक संख्या",
                  "पूर्ण संख्या",
                  "पूर्णांक",
                  "परिमेय संख्या",
                  "अपरिमेय संख्या"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_2",
                "name": "Divisibility Rules",
                "nameHi": "विभाज्यता के नियम",
                "subtopics": [
                  "2,3,4,5,6,8,9,11 के नियम"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_3",
                "name": "LCM and HCF",
                "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
                "subtopics": [
                  "LCM",
                  "HCF",
                  "प्रयोग आधारित प्रश्न"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_5",
                "name": "Simplification",
                "nameHi": "सरलीकरण",
                "subtopics": [
                  "BODMAS",
                  "Fraction",
                  "Decimal"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "excise_maths_ch_2",
            "name": "औसत, प्रतिशत एवं लाभ-हानि",
            "topics": [
              {
                "id": "math_ratio_3",
                "name": "Average",
                "nameHi": "औसत",
                "subtopics": [
                  "Simple Average",
                  "Weighted Average"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_1",
                "name": "Percentage",
                "nameHi": "प्रतिशत",
                "subtopics": [
                  "Percentage Conversion",
                  "Increase & Decrease"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_2",
                "name": "Profit and Loss",
                "nameHi": "लाभ एवं हानि",
                "subtopics": [
                  "Cost Price",
                  "Selling Price",
                  "Profit Percentage"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "excise_maths_ch_3",
            "name": "ब्याज, अनुपात एवं समय-दूरी",
            "topics": [
              {
                "id": "math_si_1",
                "name": "Simple Interest",
                "nameHi": "साधारण ब्याज",
                "subtopics": [
                  "Principal",
                  "Rate",
                  "Time"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_2",
                "name": "Compound Interest",
                "nameHi": "चक्रवृद्धि ब्याज",
                "subtopics": [
                  "Annual CI",
                  "Half Yearly CI"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_1",
                "name": "Ratio",
                "nameHi": "अनुपात",
                "subtopics": [
                  "Simple Ratio",
                  "Compound Ratio"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_3",
                "name": "Time and Work",
                "nameHi": "समय एवं कार्य",
                "subtopics": [
                  "Efficiency",
                  "Work Distribution"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_tsd_1",
                "name": "Speed Time Distance",
                "nameHi": "समय, चाल एवं दूरी",
                "subtopics": [
                  "Average Speed",
                  "Relative Speed"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "excise_maths_ch_4",
            "name": "क्षेत्रमिति",
            "topics": [
              {
                "id": "math_men_1",
                "name": "2D Mensuration",
                "nameHi": "समतल क्षेत्रमिति",
                "subtopics": [
                  "Square",
                  "Rectangle",
                  "Triangle",
                  "Circle"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_2",
                "name": "3D Mensuration",
                "nameHi": "ठोस क्षेत्रमिति",
                "subtopics": [
                  "Cube",
                  "Cuboid",
                  "Cylinder",
                  "Cone",
                  "Sphere"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "math_ns_1",
            "name": "Number System Basics",
            "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
            "subtopics": [
              "प्राकृतिक संख्या",
              "पूर्ण संख्या",
              "पूर्णांक",
              "परिमेय संख्या",
              "अपरिमेय संख्या"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_2",
            "name": "Divisibility Rules",
            "nameHi": "विभाज्यता के नियम",
            "subtopics": [
              "2,3,4,5,6,8,9,11 के नियम"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_3",
            "name": "LCM and HCF",
            "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
            "subtopics": [
              "LCM",
              "HCF",
              "प्रयोग आधारित प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_5",
            "name": "Simplification",
            "nameHi": "सरलीकरण",
            "subtopics": [
              "BODMAS",
              "Fraction",
              "Decimal"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_3",
            "name": "Average",
            "nameHi": "औसत",
            "subtopics": [
              "Simple Average",
              "Weighted Average"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_1",
            "name": "Percentage",
            "nameHi": "प्रतिशत",
            "subtopics": [
              "Percentage Conversion",
              "Increase & Decrease"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_2",
            "name": "Profit and Loss",
            "nameHi": "लाभ एवं हानि",
            "subtopics": [
              "Cost Price",
              "Selling Price",
              "Profit Percentage"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_1",
            "name": "Simple Interest",
            "nameHi": "साधारण ब्याज",
            "subtopics": [
              "Principal",
              "Rate",
              "Time"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_2",
            "name": "Compound Interest",
            "nameHi": "चक्रवृद्धि ब्याज",
            "subtopics": [
              "Annual CI",
              "Half Yearly CI"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_1",
            "name": "Ratio",
            "nameHi": "अनुपात",
            "subtopics": [
              "Simple Ratio",
              "Compound Ratio"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_3",
            "name": "Time and Work",
            "nameHi": "समय एवं कार्य",
            "subtopics": [
              "Efficiency",
              "Work Distribution"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_tsd_1",
            "name": "Speed Time Distance",
            "nameHi": "समय, चाल एवं दूरी",
            "subtopics": [
              "Average Speed",
              "Relative Speed"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_1",
            "name": "2D Mensuration",
            "nameHi": "समतल क्षेत्रमिति",
            "subtopics": [
              "Square",
              "Rectangle",
              "Triangle",
              "Circle"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_2",
            "name": "3D Mensuration",
            "nameHi": "ठोस क्षेत्रमिति",
            "subtopics": [
              "Cube",
              "Cuboid",
              "Cylinder",
              "Cone",
              "Sphere"
            ],
            "importanceScore": 10
          }
        ]
      }
    ]
  },
  "mandi_nirikshak": {
    "name": "Mandi Nirikshak",
    "fullName": "CG Vyapam Mandi Nirikshak & Sub-Inspector Recruitment Exam",
    "icon": "🏬",
    "category": "administrative",
    "description": "कृषि उपज मंडी निरीक्षक एवं उप-निरीक्षक सीधी भर्ती परीक्षा — आधिकारिक 150 अंकों का विस्तृत पाठ्यक्रम",
    "eligibility": "Graduate in Any Discipline",
    "pattern": {
      "totalMarks": 150,
      "time": "3 Hours",
      "type": "Objective MCQ (150 Questions, 150 Marks)",
      "papers": [
        {
          "paper": "कृषि उपज मंडी अधिनियम एवं मंडी प्रशासन",
          "marks": 30
        },
        {
          "paper": "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
          "marks": 25
        },
        {
          "paper": "सामान्य ज्ञान (India GK)",
          "marks": 30
        },
        {
          "paper": "गणित (Mathematics)",
          "marks": 25
        },
        {
          "paper": "सामान्य मानसिक योग्यता (Reasoning)",
          "marks": 15
        },
        {
          "paper": "सामान्य हिंदी भाषा",
          "marks": 10
        },
        {
          "paper": "General English",
          "marks": 5
        },
        {
          "paper": "कंप्यूटर ज्ञान",
          "marks": 10
        }
      ]
    },
    "subjects": [
      {
        "id": "mandi_act_sub",
        "name": "कृषि उपज मंडी अधिनियम एवं मंडी प्रशासन",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "mandi_act_sub_ch_1",
            "name": "मंडी अधिनियम संरचना एवं समितियां",
            "topics": [
              {
                "id": "mandi_act_1",
                "name": "CG Krishi Upaj Mandi Act 1972",
                "nameHi": "छत्तीसगढ़ कृषि उपज मंडी अधिनियम 1972 की मुख्य धाराएं एवं परिभाषाएं",
                "subtopics": [
                  "अधिनियम का इतिहास, विस्तार एवं महत्वपूर्ण परिभाषाएं",
                  "मंडी क्षेत्र, मुख्य बाजार एवं उप-बाजार की घोषणा",
                  "मंडी समिति का गठन, संरचना, चुनाव एवं विघटन",
                  "मंडी समिति की शक्तियां, कर्तव्य एवं कार्यप्रणाली"
                ],
                "importanceScore": 8
              },
              {
                "id": "mandi_act_2",
                "name": "Mandi Fees, Licensing & Penalties",
                "nameHi": "मंडी शुल्क (Mandi Fees), व्यापारी लाइसेंसिंग एवं दंड प्रावधान",
                "subtopics": [
                  "मंडी शुल्क एवं उपकर (Cess) संग्रहण प्रक्रिया",
                  "व्यापारी, आढ़तिया एवं दलाल लाइसेंसिंग नियम",
                  "मंडी नियमों के उल्लंघन पर जब्ती, जांच एवं दंड"
                ],
                "importanceScore": 8
              },
              {
                "id": "mandi_act_3",
                "name": "e-NAM, MSP & Agri-Marketing",
                "nameHi": "राष्ट्रीय कृषि बाजार (e-NAM), डिजिटल ट्रेडिंग एवं न्यूनतम समर्थन मूल्य (MSP)",
                "subtopics": [
                  "e-NAM पोर्टल का संचालन एवं इलेक्ट्रॉनिक ऑक्शन (ई-नीलामी)",
                  "न्यूनतम समर्थन मूल्य (MSP) निर्धारण एवं समर्थन मूल्य पर धान उपार्जन",
                  "कृषि विपणन सुधार, वेयरहाउसिंग एवं इलेक्ट्रॉनिक नेगोशिएबल वेयरहाउस रसीद (e-NWR)"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "mandi_act_1",
            "name": "CG Krishi Upaj Mandi Act 1972",
            "nameHi": "छत्तीसगढ़ कृषि उपज मंडी अधिनियम 1972 की मुख्य धाराएं एवं परिभाषाएं",
            "subtopics": [
              "अधिनियम का इतिहास, विस्तार एवं महत्वपूर्ण परिभाषाएं",
              "मंडी क्षेत्र, मुख्य बाजार एवं उप-बाजार की घोषणा",
              "मंडी समिति का गठन, संरचना, चुनाव एवं विघटन",
              "मंडी समिति की शक्तियां, कर्तव्य एवं कार्यप्रणाली"
            ],
            "importanceScore": 8
          },
          {
            "id": "mandi_act_2",
            "name": "Mandi Fees, Licensing & Penalties",
            "nameHi": "मंडी शुल्क (Mandi Fees), व्यापारी लाइसेंसिंग एवं दंड प्रावधान",
            "subtopics": [
              "मंडी शुल्क एवं उपकर (Cess) संग्रहण प्रक्रिया",
              "व्यापारी, आढ़तिया एवं दलाल लाइसेंसिंग नियम",
              "मंडी नियमों के उल्लंघन पर जब्ती, जांच एवं दंड"
            ],
            "importanceScore": 8
          },
          {
            "id": "mandi_act_3",
            "name": "e-NAM, MSP & Agri-Marketing",
            "nameHi": "राष्ट्रीय कृषि बाजार (e-NAM), डिजिटल ट्रेडिंग एवं न्यूनतम समर्थन मूल्य (MSP)",
            "subtopics": [
              "e-NAM पोर्टल का संचालन एवं इलेक्ट्रॉनिक ऑक्शन (ई-नीलामी)",
              "न्यूनतम समर्थन मूल्य (MSP) निर्धारण एवं समर्थन मूल्य पर धान उपार्जन",
              "कृषि विपणन सुधार, वेयरहाउसिंग एवं इलेक्ट्रॉनिक नेगोशिएबल वेयरहाउस रसीद (e-NWR)"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "mandi_cg_gk",
        "name": "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        "weightage": 25,
        "importance": "Highest",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "mandi_cg_gk_ch_1",
            "name": "छत्तीसगढ़ इतिहास, भूगोल, नदियां एवं कृषि",
            "topics": [
              {
                "id": "cg_hist_1",
                "name": "Prehistoric Chhattisgarh",
                "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
                "subtopics": [
                  "शैलचित्र",
                  "पुरातात्विक साक्ष्य",
                  "प्रमुख स्थल"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_hist_7",
                "name": "Kalchuri Dynasty",
                "nameHi": "कलचुरी वंश",
                "subtopics": [
                  "रत्नपुर शाखा",
                  "रायपुर शाखा",
                  "सांस्कृतिक योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_11",
                "name": "1857 Revolt in Chhattisgarh",
                "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
                "subtopics": [
                  "वीर नारायण सिंह",
                  "स्थानीय आंदोलन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_12",
                "name": "Freedom Movement",
                "nameHi": "स्वतंत्रता आंदोलन",
                "subtopics": [
                  "असहयोग आंदोलन",
                  "भारत छोड़ो आंदोलन",
                  "स्थानीय योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_1",
                "name": "Location and Boundaries",
                "nameHi": "स्थिति एवं सीमाएँ",
                "subtopics": [
                  "अक्षांश",
                  "देशांतर",
                  "पड़ोसी राज्य"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_2",
                "name": "Physiographic Divisions",
                "nameHi": "भौतिक विभाजन",
                "subtopics": [
                  "मैदानी क्षेत्र",
                  "पठारी क्षेत्र",
                  "पर्वतीय क्षेत्र"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_3",
                "name": "Major Rivers",
                "nameHi": "प्रमुख नदियाँ",
                "subtopics": [
                  "महानदी",
                  "शिवनाथ",
                  "इंद्रावती",
                  "हसदेव",
                  "अरपा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_7",
                "name": "Forest Resources",
                "nameHi": "वन संसाधन",
                "subtopics": [
                  "वन क्षेत्र",
                  "प्रमुख वृक्ष",
                  "लघु वनोपज"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_1",
                "name": "Agriculture",
                "nameHi": "कृषि",
                "subtopics": [
                  "धान उत्पादन",
                  "फसलें",
                  "कृषि योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_2",
                "name": "Industries",
                "nameHi": "उद्योग",
                "subtopics": [
                  "इस्पात उद्योग",
                  "सीमेंट उद्योग",
                  "विद्युत उद्योग"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_6",
                "name": "Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन",
                  "कृषि योजनाएँ",
                  "शिक्षा योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_cg_1",
                "name": "State Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन योजना",
                  "कृषि योजनाएँ",
                  "युवा योजनाएँ"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "mandi_cg_gk_ch_2",
            "name": "छत्तीसगढ़ जनजातियां, कला एवं संस्कृति",
            "topics": [
              {
                "id": "cg_cul_1",
                "name": "Major Tribes",
                "nameHi": "प्रमुख जनजातियाँ",
                "subtopics": [
                  "गोंड",
                  "बैगा",
                  "हल्बा",
                  "उरांव",
                  "कंवर"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_2",
                "name": "Special Tribal Groups",
                "nameHi": "विशेष पिछड़ी जनजातियाँ",
                "subtopics": [
                  "अबूझमाड़िया",
                  "कमार",
                  "पहाड़ी कोरवा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_3",
                "name": "Folk Dances",
                "nameHi": "लोकनृत्य",
                "subtopics": [
                  "पंथी",
                  "राऊत नाचा",
                  "सुआ",
                  "करमा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_5",
                "name": "Festivals",
                "nameHi": "त्यौहार",
                "subtopics": [
                  "हरेली",
                  "पोला",
                  "तीजा",
                  "छेरछेरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_4",
                "name": "Districts and Divisions",
                "nameHi": "जिले एवं संभाग",
                "subtopics": [
                  "सभी जिले",
                  "सभी संभाग"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_5",
                "name": "Panchayati Raj",
                "nameHi": "पंचायती राज",
                "subtopics": [
                  "त्रिस्तरीय व्यवस्था",
                  "ग्राम पंचायत",
                  "जनपद पंचायत",
                  "जिला पंचायत"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "cg_hist_1",
            "name": "Prehistoric Chhattisgarh",
            "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
            "subtopics": [
              "शैलचित्र",
              "पुरातात्विक साक्ष्य",
              "प्रमुख स्थल"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_hist_7",
            "name": "Kalchuri Dynasty",
            "nameHi": "कलचुरी वंश",
            "subtopics": [
              "रत्नपुर शाखा",
              "रायपुर शाखा",
              "सांस्कृतिक योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_11",
            "name": "1857 Revolt in Chhattisgarh",
            "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
            "subtopics": [
              "वीर नारायण सिंह",
              "स्थानीय आंदोलन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_12",
            "name": "Freedom Movement",
            "nameHi": "स्वतंत्रता आंदोलन",
            "subtopics": [
              "असहयोग आंदोलन",
              "भारत छोड़ो आंदोलन",
              "स्थानीय योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_1",
            "name": "Location and Boundaries",
            "nameHi": "स्थिति एवं सीमाएँ",
            "subtopics": [
              "अक्षांश",
              "देशांतर",
              "पड़ोसी राज्य"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_2",
            "name": "Physiographic Divisions",
            "nameHi": "भौतिक विभाजन",
            "subtopics": [
              "मैदानी क्षेत्र",
              "पठारी क्षेत्र",
              "पर्वतीय क्षेत्र"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_3",
            "name": "Major Rivers",
            "nameHi": "प्रमुख नदियाँ",
            "subtopics": [
              "महानदी",
              "शिवनाथ",
              "इंद्रावती",
              "हसदेव",
              "अरपा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_7",
            "name": "Forest Resources",
            "nameHi": "वन संसाधन",
            "subtopics": [
              "वन क्षेत्र",
              "प्रमुख वृक्ष",
              "लघु वनोपज"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_1",
            "name": "Agriculture",
            "nameHi": "कृषि",
            "subtopics": [
              "धान उत्पादन",
              "फसलें",
              "कृषि योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_2",
            "name": "Industries",
            "nameHi": "उद्योग",
            "subtopics": [
              "इस्पात उद्योग",
              "सीमेंट उद्योग",
              "विद्युत उद्योग"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_6",
            "name": "Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन",
              "कृषि योजनाएँ",
              "शिक्षा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_cg_1",
            "name": "State Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन योजना",
              "कृषि योजनाएँ",
              "युवा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_1",
            "name": "Major Tribes",
            "nameHi": "प्रमुख जनजातियाँ",
            "subtopics": [
              "गोंड",
              "बैगा",
              "हल्बा",
              "उरांव",
              "कंवर"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_2",
            "name": "Special Tribal Groups",
            "nameHi": "विशेष पिछड़ी जनजातियाँ",
            "subtopics": [
              "अबूझमाड़िया",
              "कमार",
              "पहाड़ी कोरवा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_3",
            "name": "Folk Dances",
            "nameHi": "लोकनृत्य",
            "subtopics": [
              "पंथी",
              "राऊत नाचा",
              "सुआ",
              "करमा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_5",
            "name": "Festivals",
            "nameHi": "त्यौहार",
            "subtopics": [
              "हरेली",
              "पोला",
              "तीजा",
              "छेरछेरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_4",
            "name": "Districts and Divisions",
            "nameHi": "जिले एवं संभाग",
            "subtopics": [
              "सभी जिले",
              "सभी संभाग"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_5",
            "name": "Panchayati Raj",
            "nameHi": "पंचायती राज",
            "subtopics": [
              "त्रिस्तरीय व्यवस्था",
              "ग्राम पंचायत",
              "जनपद पंचायत",
              "जिला पंचायत"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "mandi_india_gk",
        "name": "सामान्य ज्ञान (India GK)",
        "weightage": 30,
        "importance": "High",
        "pyqFrequency": "High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "mandi_india_gk_ch_1",
            "name": "भारतीय इतिहास, संविधान एवं राजव्यवस्था",
            "topics": [
              {
                "id": "ind_hist_1",
                "name": "Indus Valley Civilization",
                "nameHi": "सिंधु घाटी सभ्यता",
                "subtopics": [
                  "हड़प्पा",
                  "मोहनजोदड़ो",
                  "लोथल",
                  "कालीबंगन",
                  "धौलावीरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_hist_6",
                "name": "Maurya Empire",
                "nameHi": "मौर्य साम्राज्य",
                "subtopics": [
                  "चंद्रगुप्त मौर्य",
                  "अशोक",
                  "मेगस्थनीज"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_3",
                "name": "Revolt of 1857",
                "nameHi": "1857 का विद्रोह",
                "subtopics": [
                  "कारण",
                  "नेता",
                  "परिणाम"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_5",
                "name": "Gandhian Movements",
                "nameHi": "गांधीवादी आंदोलन",
                "subtopics": [
                  "असहयोग",
                  "सविनय अवज्ञा",
                  "भारत छोड़ो"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_1",
                "name": "Constitution",
                "nameHi": "भारतीय संविधान",
                "subtopics": [
                  "विशेषताएँ",
                  "प्रस्तावना",
                  "संशोधन"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_2",
                "name": "Fundamental Rights",
                "nameHi": "मौलिक अधिकार",
                "subtopics": [
                  "अनुच्छेद 12-35"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_5",
                "name": "Parliament",
                "nameHi": "संसद",
                "subtopics": [
                  "लोकसभा",
                  "राज्यसभा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_6",
                "name": "President and Vice President",
                "nameHi": "राष्ट्रपति एवं उपराष्ट्रपति",
                "subtopics": [
                  "चुनाव",
                  "शक्तियाँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_7",
                "name": "Prime Minister and Council of Ministers",
                "nameHi": "प्रधानमंत्री एवं मंत्रिपरिषद",
                "subtopics": [
                  "कार्य",
                  "उत्तरदायित्व"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "mandi_india_gk_ch_2",
            "name": "भारत का भूगोल, अर्थव्यवस्था एवं सामान्य विज्ञान",
            "topics": [
              {
                "id": "ind_geo_1",
                "name": "Physical Geography of India",
                "nameHi": "भारत का भौतिक भूगोल",
                "subtopics": [
                  "हिमालय",
                  "उत्तरी मैदान",
                  "दक्कन का पठार",
                  "तटीय मैदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_2",
                "name": "Rivers of India",
                "nameHi": "भारत की नदियाँ",
                "subtopics": [
                  "गंगा",
                  "यमुना",
                  "ब्रह्मपुत्र",
                  "गोदावरी",
                  "नर्मदा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_3",
                "name": "Climate",
                "nameHi": "भारत की जलवायु",
                "subtopics": [
                  "मानसून",
                  "वर्षा",
                  "ऋतुएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_eco_1",
                "name": "Basic Economics",
                "nameHi": "अर्थशास्त्र की मूल अवधारणाएँ",
                "subtopics": [
                  "GDP",
                  "GNP",
                  "NNP",
                  "NITI Aayog"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_eco_2",
                "name": "Banking System",
                "nameHi": "बैंकिंग प्रणाली",
                "subtopics": [
                  "RBI",
                  "मौद्रिक नीति",
                  "वाणिज्यिक बैंक"
                ],
                "importanceScore": 10
              },
              {
                "id": "phy_1",
                "name": "Physical Quantities and Units",
                "nameHi": "भौतिक राशियाँ एवं मात्रक",
                "subtopics": [
                  "SI Units",
                  "Derived Units",
                  "Measurement"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_1",
                "name": "Matter and Its Nature",
                "nameHi": "पदार्थ एवं उसकी प्रकृति",
                "subtopics": [
                  "States of Matter",
                  "Properties"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_1",
                "name": "Cell",
                "nameHi": "कोशिका",
                "subtopics": [
                  "Cell Structure",
                  "Cell Organelles"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_9",
                "name": "Nutrition",
                "nameHi": "पोषण",
                "subtopics": [
                  "Vitamins",
                  "Minerals",
                  "Balanced Diet"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_10",
                "name": "Diseases",
                "nameHi": "रोग",
                "subtopics": [
                  "Bacterial",
                  "Viral",
                  "Deficiency Diseases"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_nat_1",
                "name": "Government Schemes",
                "nameHi": "केंद्र सरकार की योजनाएँ",
                "subtopics": [
                  "PM Kisan",
                  "PM Awas Yojana",
                  "Ayushman Bharat",
                  "Jal Jeevan Mission",
                  "PM Vishwakarma"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "ind_hist_1",
            "name": "Indus Valley Civilization",
            "nameHi": "सिंधु घाटी सभ्यता",
            "subtopics": [
              "हड़प्पा",
              "मोहनजोदड़ो",
              "लोथल",
              "कालीबंगन",
              "धौलावीरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_6",
            "name": "Maurya Empire",
            "nameHi": "मौर्य साम्राज्य",
            "subtopics": [
              "चंद्रगुप्त मौर्य",
              "अशोक",
              "मेगस्थनीज"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_3",
            "name": "Revolt of 1857",
            "nameHi": "1857 का विद्रोह",
            "subtopics": [
              "कारण",
              "नेता",
              "परिणाम"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_5",
            "name": "Gandhian Movements",
            "nameHi": "गांधीवादी आंदोलन",
            "subtopics": [
              "असहयोग",
              "सविनय अवज्ञा",
              "भारत छोड़ो"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_1",
            "name": "Constitution",
            "nameHi": "भारतीय संविधान",
            "subtopics": [
              "विशेषताएँ",
              "प्रस्तावना",
              "संशोधन"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_2",
            "name": "Fundamental Rights",
            "nameHi": "मौलिक अधिकार",
            "subtopics": [
              "अनुच्छेद 12-35"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_5",
            "name": "Parliament",
            "nameHi": "संसद",
            "subtopics": [
              "लोकसभा",
              "राज्यसभा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_6",
            "name": "President and Vice President",
            "nameHi": "राष्ट्रपति एवं उपराष्ट्रपति",
            "subtopics": [
              "चुनाव",
              "शक्तियाँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_7",
            "name": "Prime Minister and Council of Ministers",
            "nameHi": "प्रधानमंत्री एवं मंत्रिपरिषद",
            "subtopics": [
              "कार्य",
              "उत्तरदायित्व"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_1",
            "name": "Physical Geography of India",
            "nameHi": "भारत का भौतिक भूगोल",
            "subtopics": [
              "हिमालय",
              "उत्तरी मैदान",
              "दक्कन का पठार",
              "तटीय मैदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_2",
            "name": "Rivers of India",
            "nameHi": "भारत की नदियाँ",
            "subtopics": [
              "गंगा",
              "यमुना",
              "ब्रह्मपुत्र",
              "गोदावरी",
              "नर्मदा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_3",
            "name": "Climate",
            "nameHi": "भारत की जलवायु",
            "subtopics": [
              "मानसून",
              "वर्षा",
              "ऋतुएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_eco_1",
            "name": "Basic Economics",
            "nameHi": "अर्थशास्त्र की मूल अवधारणाएँ",
            "subtopics": [
              "GDP",
              "GNP",
              "NNP",
              "NITI Aayog"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_eco_2",
            "name": "Banking System",
            "nameHi": "बैंकिंग प्रणाली",
            "subtopics": [
              "RBI",
              "मौद्रिक नीति",
              "वाणिज्यिक बैंक"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_1",
            "name": "Physical Quantities and Units",
            "nameHi": "भौतिक राशियाँ एवं मात्रक",
            "subtopics": [
              "SI Units",
              "Derived Units",
              "Measurement"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_1",
            "name": "Matter and Its Nature",
            "nameHi": "पदार्थ एवं उसकी प्रकृति",
            "subtopics": [
              "States of Matter",
              "Properties"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_1",
            "name": "Cell",
            "nameHi": "कोशिका",
            "subtopics": [
              "Cell Structure",
              "Cell Organelles"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_9",
            "name": "Nutrition",
            "nameHi": "पोषण",
            "subtopics": [
              "Vitamins",
              "Minerals",
              "Balanced Diet"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_10",
            "name": "Diseases",
            "nameHi": "रोग",
            "subtopics": [
              "Bacterial",
              "Viral",
              "Deficiency Diseases"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_1",
            "name": "Government Schemes",
            "nameHi": "केंद्र सरकार की योजनाएँ",
            "subtopics": [
              "PM Kisan",
              "PM Awas Yojana",
              "Ayushman Bharat",
              "Jal Jeevan Mission",
              "PM Vishwakarma"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "mandi_maths",
        "name": "गणित (Mathematics)",
        "weightage": 25,
        "importance": "Highest",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "mandi_maths_ch_1",
            "name": "संख्या पद्धति एवं व्यावसायिक गणित",
            "topics": [
              {
                "id": "math_ns_1",
                "name": "Number System Basics",
                "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
                "subtopics": [
                  "प्राकृतिक संख्या",
                  "पूर्ण संख्या",
                  "पूर्णांक",
                  "परिमेय संख्या",
                  "अपरिमेय संख्या"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_2",
                "name": "Divisibility Rules",
                "nameHi": "विभाज्यता के नियम",
                "subtopics": [
                  "2,3,4,5,6,8,9,11 के नियम"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_3",
                "name": "LCM and HCF",
                "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
                "subtopics": [
                  "LCM",
                  "HCF",
                  "प्रयोग आधारित प्रश्न"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_5",
                "name": "Simplification",
                "nameHi": "सरलीकरण",
                "subtopics": [
                  "BODMAS",
                  "Fraction",
                  "Decimal"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_3",
                "name": "Average",
                "nameHi": "औसत",
                "subtopics": [
                  "Simple Average",
                  "Weighted Average"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_1",
                "name": "Percentage",
                "nameHi": "प्रतिशत",
                "subtopics": [
                  "Percentage Conversion",
                  "Increase & Decrease"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_2",
                "name": "Profit and Loss",
                "nameHi": "लाभ एवं हानि",
                "subtopics": [
                  "Cost Price",
                  "Selling Price",
                  "Profit Percentage"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_1",
                "name": "Ratio",
                "nameHi": "अनुपात",
                "subtopics": [
                  "Simple Ratio",
                  "Compound Ratio"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_1",
                "name": "Simple Interest",
                "nameHi": "साधारण ब्याज",
                "subtopics": [
                  "Principal",
                  "Rate",
                  "Time"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_2",
                "name": "Compound Interest",
                "nameHi": "चक्रवृद्धि ब्याज",
                "subtopics": [
                  "Annual CI",
                  "Half Yearly CI"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_3",
                "name": "Time and Work",
                "nameHi": "समय एवं कार्य",
                "subtopics": [
                  "Efficiency",
                  "Work Distribution"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_tsd_1",
                "name": "Speed Time Distance",
                "nameHi": "समय, चाल एवं दूरी",
                "subtopics": [
                  "Average Speed",
                  "Relative Speed"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "mandi_maths_ch_2",
            "name": "क्षेत्रमिति एवं बीजगणित",
            "topics": [
              {
                "id": "math_alg_1",
                "name": "Algebraic Identities",
                "nameHi": "बीजीय सर्वसमिकाएँ",
                "subtopics": [
                  "(a+b)²",
                  "(a-b)²",
                  "a²-b²"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_1",
                "name": "2D Mensuration",
                "nameHi": "समतल क्षेत्रमिति",
                "subtopics": [
                  "Square",
                  "Rectangle",
                  "Triangle",
                  "Circle"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_2",
                "name": "3D Mensuration",
                "nameHi": "ठोस क्षेत्रमिति",
                "subtopics": [
                  "Cube",
                  "Cuboid",
                  "Cylinder",
                  "Cone",
                  "Sphere"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "math_ns_1",
            "name": "Number System Basics",
            "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
            "subtopics": [
              "प्राकृतिक संख्या",
              "पूर्ण संख्या",
              "पूर्णांक",
              "परिमेय संख्या",
              "अपरिमेय संख्या"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_2",
            "name": "Divisibility Rules",
            "nameHi": "विभाज्यता के नियम",
            "subtopics": [
              "2,3,4,5,6,8,9,11 के नियम"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_3",
            "name": "LCM and HCF",
            "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
            "subtopics": [
              "LCM",
              "HCF",
              "प्रयोग आधारित प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_5",
            "name": "Simplification",
            "nameHi": "सरलीकरण",
            "subtopics": [
              "BODMAS",
              "Fraction",
              "Decimal"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_3",
            "name": "Average",
            "nameHi": "औसत",
            "subtopics": [
              "Simple Average",
              "Weighted Average"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_1",
            "name": "Percentage",
            "nameHi": "प्रतिशत",
            "subtopics": [
              "Percentage Conversion",
              "Increase & Decrease"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_2",
            "name": "Profit and Loss",
            "nameHi": "लाभ एवं हानि",
            "subtopics": [
              "Cost Price",
              "Selling Price",
              "Profit Percentage"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_1",
            "name": "Ratio",
            "nameHi": "अनुपात",
            "subtopics": [
              "Simple Ratio",
              "Compound Ratio"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_1",
            "name": "Simple Interest",
            "nameHi": "साधारण ब्याज",
            "subtopics": [
              "Principal",
              "Rate",
              "Time"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_2",
            "name": "Compound Interest",
            "nameHi": "चक्रवृद्धि ब्याज",
            "subtopics": [
              "Annual CI",
              "Half Yearly CI"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_3",
            "name": "Time and Work",
            "nameHi": "समय एवं कार्य",
            "subtopics": [
              "Efficiency",
              "Work Distribution"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_tsd_1",
            "name": "Speed Time Distance",
            "nameHi": "समय, चाल एवं दूरी",
            "subtopics": [
              "Average Speed",
              "Relative Speed"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_alg_1",
            "name": "Algebraic Identities",
            "nameHi": "बीजीय सर्वसमिकाएँ",
            "subtopics": [
              "(a+b)²",
              "(a-b)²",
              "a²-b²"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_1",
            "name": "2D Mensuration",
            "nameHi": "समतल क्षेत्रमिति",
            "subtopics": [
              "Square",
              "Rectangle",
              "Triangle",
              "Circle"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_2",
            "name": "3D Mensuration",
            "nameHi": "ठोस क्षेत्रमिति",
            "subtopics": [
              "Cube",
              "Cuboid",
              "Cylinder",
              "Cone",
              "Sphere"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "mandi_reasoning",
        "name": "सामान्य मानसिक योग्यता (Reasoning)",
        "weightage": 15,
        "importance": "High",
        "pyqFrequency": "High (15 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "mandi_reasoning_ch_1",
            "name": "तार्किक एवं मानसिक योग्यता",
            "topics": [
              {
                "id": "reas_ser_1",
                "name": "Number Series",
                "nameHi": "संख्या श्रेणी",
                "subtopics": [
                  "Missing Number",
                  "Wrong Number",
                  "Pattern Based Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ser_2",
                "name": "Alphabet Series",
                "nameHi": "अक्षर श्रेणी",
                "subtopics": [
                  "Letter Pattern",
                  "Mixed Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ana_1",
                "name": "Analogy",
                "nameHi": "समानता",
                "subtopics": [
                  "Word Analogy",
                  "Number Analogy",
                  "Letter Analogy"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_cd_1",
                "name": "Letter Coding",
                "nameHi": "अक्षर कोडिंग",
                "subtopics": [
                  "Direct Coding",
                  "Reverse Coding"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_br_1",
                "name": "Blood Relations",
                "nameHi": "रक्त संबंध",
                "subtopics": [
                  "Family Tree",
                  "Generation Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_dir_1",
                "name": "Direction Sense",
                "nameHi": "दिशा ज्ञान",
                "subtopics": [
                  "North-South-East-West",
                  "Turning Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_syl_1",
                "name": "Syllogism",
                "nameHi": "न्याय निगमन",
                "subtopics": [
                  "Venn Method",
                  "Logical Conclusions"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_nv_1",
                "name": "Mirror Image",
                "nameHi": "दर्पण प्रतिबिंब",
                "subtopics": [
                  "Vertical Mirror",
                  "Horizontal Mirror"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "reas_ser_1",
            "name": "Number Series",
            "nameHi": "संख्या श्रेणी",
            "subtopics": [
              "Missing Number",
              "Wrong Number",
              "Pattern Based Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ser_2",
            "name": "Alphabet Series",
            "nameHi": "अक्षर श्रेणी",
            "subtopics": [
              "Letter Pattern",
              "Mixed Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ana_1",
            "name": "Analogy",
            "nameHi": "समानता",
            "subtopics": [
              "Word Analogy",
              "Number Analogy",
              "Letter Analogy"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_cd_1",
            "name": "Letter Coding",
            "nameHi": "अक्षर कोडिंग",
            "subtopics": [
              "Direct Coding",
              "Reverse Coding"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_br_1",
            "name": "Blood Relations",
            "nameHi": "रक्त संबंध",
            "subtopics": [
              "Family Tree",
              "Generation Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_dir_1",
            "name": "Direction Sense",
            "nameHi": "दिशा ज्ञान",
            "subtopics": [
              "North-South-East-West",
              "Turning Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_syl_1",
            "name": "Syllogism",
            "nameHi": "न्याय निगमन",
            "subtopics": [
              "Venn Method",
              "Logical Conclusions"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_nv_1",
            "name": "Mirror Image",
            "nameHi": "दर्पण प्रतिबिंब",
            "subtopics": [
              "Vertical Mirror",
              "Horizontal Mirror"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "mandi_hindi",
        "name": "सामान्य हिंदी भाषा",
        "weightage": 10,
        "importance": "Medium",
        "pyqFrequency": "Medium (10 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "mandi_hindi_ch_1",
            "name": "हिंदी व्याकरण एवं शब्द भंडार",
            "topics": [
              {
                "id": "hin_varn_1",
                "name": "Hindi Alphabet",
                "nameHi": "हिंदी वर्णमाला",
                "subtopics": [
                  "स्वर",
                  "व्यंजन",
                  "अयोगवाह"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sandhi_1",
                "name": "Swar Sandhi",
                "nameHi": "स्वर संधि",
                "subtopics": [
                  "दीर्घ",
                  "गुण",
                  "वृद्धि",
                  "यण"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_samas_1",
                "name": "Tatpurush Samas",
                "nameHi": "तत्पुरुष समास",
                "subtopics": [
                  "कर्म",
                  "करण",
                  "सम्प्रदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_shabd_1",
                "name": "Tatsam and Tadbhav",
                "nameHi": "तत्सम एवं तद्भव",
                "subtopics": [
                  "शब्द पहचान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_1",
                "name": "Synonyms",
                "nameHi": "पर्यायवाची शब्द",
                "subtopics": [
                  "एकार्थी",
                  "अनेकार्थी पर्याय"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_2",
                "name": "Antonyms",
                "nameHi": "विलोम शब्द",
                "subtopics": [
                  "तत्सम विलोम",
                  "प्रचलित विलोम"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_idiom_1",
                "name": "Idioms",
                "nameHi": "मुहावरे",
                "subtopics": [
                  "अर्थ",
                  "प्रयोग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sent_1",
                "name": "Sentence Correction",
                "nameHi": "वाक्य शुद्धि",
                "subtopics": [
                  "व्याकरणिक त्रुटि",
                  "अर्थगत त्रुटि"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "hin_varn_1",
            "name": "Hindi Alphabet",
            "nameHi": "हिंदी वर्णमाला",
            "subtopics": [
              "स्वर",
              "व्यंजन",
              "अयोगवाह"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sandhi_1",
            "name": "Swar Sandhi",
            "nameHi": "स्वर संधि",
            "subtopics": [
              "दीर्घ",
              "गुण",
              "वृद्धि",
              "यण"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_samas_1",
            "name": "Tatpurush Samas",
            "nameHi": "तत्पुरुष समास",
            "subtopics": [
              "कर्म",
              "करण",
              "सम्प्रदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_shabd_1",
            "name": "Tatsam and Tadbhav",
            "nameHi": "तत्सम एवं तद्भव",
            "subtopics": [
              "शब्द पहचान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_1",
            "name": "Synonyms",
            "nameHi": "पर्यायवाची शब्द",
            "subtopics": [
              "एकार्थी",
              "अनेकार्थी पर्याय"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_2",
            "name": "Antonyms",
            "nameHi": "विलोम शब्द",
            "subtopics": [
              "तत्सम विलोम",
              "प्रचलित विलोम"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_idiom_1",
            "name": "Idioms",
            "nameHi": "मुहावरे",
            "subtopics": [
              "अर्थ",
              "प्रयोग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sent_1",
            "name": "Sentence Correction",
            "nameHi": "वाक्य शुद्धि",
            "subtopics": [
              "व्याकरणिक त्रुटि",
              "अर्थगत त्रुटि"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "mandi_english",
        "name": "General English",
        "weightage": 5,
        "importance": "Low",
        "pyqFrequency": "Low (5 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "mandi_english_ch_1",
            "name": "English Grammar & Vocabulary",
            "topics": [
              {
                "id": "eng_gram_1",
                "name": "Parts of Speech",
                "nameHi": "शब्द भेद",
                "subtopics": [
                  "Noun",
                  "Pronoun",
                  "Verb",
                  "Adjective",
                  "Adverb",
                  "Preposition",
                  "Conjunction",
                  "Interjection"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_gram_2",
                "name": "Articles",
                "nameHi": "Articles",
                "subtopics": [
                  "A",
                  "An",
                  "The"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_tense_1",
                "name": "Present Tense",
                "nameHi": "वर्तमान काल",
                "subtopics": [
                  "Simple",
                  "Continuous",
                  "Perfect",
                  "Perfect Continuous"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_vocab_1",
                "name": "Synonyms",
                "nameHi": "समानार्थी शब्द",
                "subtopics": [
                  "Word Meaning"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_comp_1",
                "name": "Passage Comprehension",
                "nameHi": "गद्यांश आधारित प्रश्न",
                "subtopics": [
                  "Factual Questions",
                  "Inference Questions",
                  "Vocabulary Questions"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "eng_gram_1",
            "name": "Parts of Speech",
            "nameHi": "शब्द भेद",
            "subtopics": [
              "Noun",
              "Pronoun",
              "Verb",
              "Adjective",
              "Adverb",
              "Preposition",
              "Conjunction",
              "Interjection"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_gram_2",
            "name": "Articles",
            "nameHi": "Articles",
            "subtopics": [
              "A",
              "An",
              "The"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_tense_1",
            "name": "Present Tense",
            "nameHi": "वर्तमान काल",
            "subtopics": [
              "Simple",
              "Continuous",
              "Perfect",
              "Perfect Continuous"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_vocab_1",
            "name": "Synonyms",
            "nameHi": "समानार्थी शब्द",
            "subtopics": [
              "Word Meaning"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_comp_1",
            "name": "Passage Comprehension",
            "nameHi": "गद्यांश आधारित प्रश्न",
            "subtopics": [
              "Factual Questions",
              "Inference Questions",
              "Vocabulary Questions"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "mandi_comp",
        "name": "कंप्यूटर ज्ञान",
        "weightage": 10,
        "importance": "Medium",
        "pyqFrequency": "Medium (10 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "mandi_comp_ch_1",
            "name": "कंप्यूटर मूल बातें एवं एमएस ऑफिस",
            "topics": [
              {
                "id": "comp_basic_1",
                "name": "Introduction to Computers",
                "nameHi": "कंप्यूटर का परिचय",
                "subtopics": [
                  "Definition",
                  "Characteristics",
                  "Applications"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_hw_1",
                "name": "Input Devices",
                "nameHi": "इनपुट डिवाइस",
                "subtopics": [
                  "Keyboard",
                  "Mouse",
                  "Scanner",
                  "MICR",
                  "OCR",
                  "OMR"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_sw_1",
                "name": "Software Fundamentals",
                "nameHi": "सॉफ्टवेयर की मूल बातें",
                "subtopics": [
                  "System Software",
                  "Application Software"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_office_1",
                "name": "MS Word",
                "nameHi": "एमएस वर्ड",
                "subtopics": [
                  "Formatting",
                  "Tables",
                  "Mail Merge"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_office_2",
                "name": "MS Excel",
                "nameHi": "एमएस एक्सेल",
                "subtopics": [
                  "Formulas",
                  "Functions",
                  "Charts",
                  "Sorting"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_net_1",
                "name": "Internet Basics",
                "nameHi": "इंटरनेट की मूल बातें",
                "subtopics": [
                  "WWW",
                  "Web Browser",
                  "Search Engine"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "comp_basic_1",
            "name": "Introduction to Computers",
            "nameHi": "कंप्यूटर का परिचय",
            "subtopics": [
              "Definition",
              "Characteristics",
              "Applications"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_hw_1",
            "name": "Input Devices",
            "nameHi": "इनपुट डिवाइस",
            "subtopics": [
              "Keyboard",
              "Mouse",
              "Scanner",
              "MICR",
              "OCR",
              "OMR"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_sw_1",
            "name": "Software Fundamentals",
            "nameHi": "सॉफ्टवेयर की मूल बातें",
            "subtopics": [
              "System Software",
              "Application Software"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_office_1",
            "name": "MS Word",
            "nameHi": "एमएस वर्ड",
            "subtopics": [
              "Formatting",
              "Tables",
              "Mail Merge"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_office_2",
            "name": "MS Excel",
            "nameHi": "एमएस एक्सेल",
            "subtopics": [
              "Formulas",
              "Functions",
              "Charts",
              "Sorting"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_net_1",
            "name": "Internet Basics",
            "nameHi": "इंटरनेट की मूल बातें",
            "subtopics": [
              "WWW",
              "Web Browser",
              "Search Engine"
            ],
            "importanceScore": 10
          }
        ]
      }
    ]
  },
  "cg_tet": {
    "name": "CG TET",
    "fullName": "Chhattisgarh Teacher Eligibility Test (Primary & Upper Primary)",
    "icon": "🎓",
    "category": "education",
    "description": "छत्तीसगढ़ शिक्षक पात्रता परीक्षा (CG TET) — आधिकारिक 150 अंकों का विस्तृत पाठ्यक्रम",
    "eligibility": "D.El.Ed / B.Ed Pursuing or Passed",
    "pattern": {
      "totalMarks": 150,
      "time": "2.5 Hours",
      "type": "Objective MCQ (150 Questions, 150 Marks, No Negative Marking)",
      "papers": [
        {
          "paper": "बाल विकास एवं शिक्षाशास्त्र (CDP)",
          "marks": 30
        },
        {
          "paper": "भाषा 1: हिंदी एवं भाषा शिक्षण शास्त्र",
          "marks": 30
        },
        {
          "paper": "भाषा 2: English Language & Pedagogy",
          "marks": 30
        },
        {
          "paper": "गणित एवं गणित शिक्षण शास्त्र",
          "marks": 30
        },
        {
          "paper": "पर्यावरण अध्ययन (EVS) / सामाजिक अध्ययन / विज्ञान",
          "marks": 30
        }
      ]
    },
    "subjects": [
      {
        "id": "tet_cdp",
        "name": "बाल विकास एवं शिक्षाशास्त्र (CDP)",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "tet_cdp_ch_1",
            "name": "बाल विकास के सिद्धांत एवं रचनावादी विचारक",
            "topics": [
              {
                "id": "tet_cdp_1",
                "name": "Child Development & Heredity",
                "nameHi": "बाल विकास की अवधारणा, विकास के चरण, वंशानुक्रम एवं वातावरण",
                "subtopics": [
                  "वृद्धि एवं विकास के सामान्य सिद्धांत",
                  "शैशवावस्था, बाल्यावस्था एवं किशोरावस्था की विशेषताएं",
                  "वंशानुक्रम एवं सामाजिक वातावरण की भूमिका"
                ],
                "importanceScore": 8
              },
              {
                "id": "tet_cdp_2",
                "name": "Piaget, Kohlberg, Vygotsky Theories",
                "nameHi": "पियाजे, कोहलबर्ग एवं वाइगोत्स्की के सिद्धांत",
                "subtopics": [
                  "जीन पियाजे की चार संज्ञानात्मक अवस्थाएं",
                  "लॉरेंस कोहलबर्ग का नैतिक विकास सिद्धांत",
                  "लेव वाइगोत्स्की का सामाजिक सांस्कृतिक सिद्धांत, पाड़ (Scaffolding) एवं ZPD"
                ],
                "importanceScore": 8
              },
              {
                "id": "tet_cdp_3",
                "name": "Inclusive Education & CWSN",
                "nameHi": "समावेशी शिक्षा की अवधारणा एवं विशेष आवश्यकता वाले बच्चे (CWSN)",
                "subtopics": [
                  "विशेष आवश्यकता वाले बच्चों की पहचान एवं शिक्षा",
                  "अधिगम अक्षमताएं (Dyslexia, Dysgraphia, Dyscalculia)",
                  "सृजनात्मक एवं पिछड़े बालकों का मार्गदर्शन"
                ],
                "importanceScore": 8
              },
              {
                "id": "tet_cdp_4",
                "name": "Learning Theories, Motivation & CCE",
                "nameHi": "अधिगम के सिद्धांत, प्रेरणा एवं सतत समग्र मूल्यांकन (CCE)",
                "subtopics": [
                  "थार्नडाइक का प्रयास एवं त्रुटि सिद्धांत, पावलव व स्किनर के प्रयोग",
                  "अधिगम में अभिप्रेरणा की भूमिका (Intrinsic & Extrinsic Motivation)",
                  "सतत एवं व्यापक मूल्यांकन (CCE), रचनात्मक एवं योगात्मक आकलन",
                  "उपचारात्मक एवं निदानात्मक शिक्षण"
                ],
                "importanceScore": 8
              },
              {
                "id": "tet_cdp_5",
                "name": "NEP 2020 & RTE Act 2009",
                "nameHi": "राष्ट्रीय शिक्षा नीति 2020 एवं बाल अधिकार अधिनियम (RTE 2009)",
                "subtopics": [
                  "निःशुल्क एवं अनिवार्य बाल शिक्षा अधिकार अधिनियम 2009 की धाराएं",
                  "NEP 2020 मूलभूत साक्षरता एवं संख्यात्मकता (FLN)",
                  "स्कूली शिक्षा का नया ढांचा 5+3+3+4"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "tet_cdp_1",
            "name": "Child Development & Heredity",
            "nameHi": "बाल विकास की अवधारणा, विकास के चरण, वंशानुक्रम एवं वातावरण",
            "subtopics": [
              "वृद्धि एवं विकास के सामान्य सिद्धांत",
              "शैशवावस्था, बाल्यावस्था एवं किशोरावस्था की विशेषताएं",
              "वंशानुक्रम एवं सामाजिक वातावरण की भूमिका"
            ],
            "importanceScore": 8
          },
          {
            "id": "tet_cdp_2",
            "name": "Piaget, Kohlberg, Vygotsky Theories",
            "nameHi": "पियाजे, कोहलबर्ग एवं वाइगोत्स्की के सिद्धांत",
            "subtopics": [
              "जीन पियाजे की चार संज्ञानात्मक अवस्थाएं",
              "लॉरेंस कोहलबर्ग का नैतिक विकास सिद्धांत",
              "लेव वाइगोत्स्की का सामाजिक सांस्कृतिक सिद्धांत, पाड़ (Scaffolding) एवं ZPD"
            ],
            "importanceScore": 8
          },
          {
            "id": "tet_cdp_3",
            "name": "Inclusive Education & CWSN",
            "nameHi": "समावेशी शिक्षा की अवधारणा एवं विशेष आवश्यकता वाले बच्चे (CWSN)",
            "subtopics": [
              "विशेष आवश्यकता वाले बच्चों की पहचान एवं शिक्षा",
              "अधिगम अक्षमताएं (Dyslexia, Dysgraphia, Dyscalculia)",
              "सृजनात्मक एवं पिछड़े बालकों का मार्गदर्शन"
            ],
            "importanceScore": 8
          },
          {
            "id": "tet_cdp_4",
            "name": "Learning Theories, Motivation & CCE",
            "nameHi": "अधिगम के सिद्धांत, प्रेरणा एवं सतत समग्र मूल्यांकन (CCE)",
            "subtopics": [
              "थार्नडाइक का प्रयास एवं त्रुटि सिद्धांत, पावलव व स्किनर के प्रयोग",
              "अधिगम में अभिप्रेरणा की भूमिका (Intrinsic & Extrinsic Motivation)",
              "सतत एवं व्यापक मूल्यांकन (CCE), रचनात्मक एवं योगात्मक आकलन",
              "उपचारात्मक एवं निदानात्मक शिक्षण"
            ],
            "importanceScore": 8
          },
          {
            "id": "tet_cdp_5",
            "name": "NEP 2020 & RTE Act 2009",
            "nameHi": "राष्ट्रीय शिक्षा नीति 2020 एवं बाल अधिकार अधिनियम (RTE 2009)",
            "subtopics": [
              "निःशुल्क एवं अनिवार्य बाल शिक्षा अधिकार अधिनियम 2009 की धाराएं",
              "NEP 2020 मूलभूत साक्षरता एवं संख्यात्मकता (FLN)",
              "स्कूली शिक्षा का नया ढांचा 5+3+3+4"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "tet_hindi",
        "name": "भाषा 1: हिंदी एवं भाषा शिक्षण शास्त्र",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "tet_hindi_ch_1",
            "name": "अपठित गद्यांश एवं पद्यांश बोध",
            "topics": [
              {
                "id": "hin_comp_1",
                "name": "Reading Comprehension",
                "nameHi": "अपठित गद्यांश",
                "subtopics": [
                  "तथ्यात्मक प्रश्न",
                  "विश्लेषणात्मक प्रश्न"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "tet_hindi_ch_2",
            "name": "हिंदी व्याकरण एवं शब्द विचार",
            "topics": [
              {
                "id": "hin_varn_1",
                "name": "Hindi Alphabet",
                "nameHi": "हिंदी वर्णमाला",
                "subtopics": [
                  "स्वर",
                  "व्यंजन",
                  "अयोगवाह"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_varn_2",
                "name": "Vowel and Consonant Classification",
                "nameHi": "स्वर एवं व्यंजन वर्गीकरण",
                "subtopics": [
                  "ह्रस्व",
                  "दीर्घ",
                  "स्पर्श",
                  "ऊष्म"
                ],
                "importanceScore": 8
              },
              {
                "id": "hin_sandhi_1",
                "name": "Swar Sandhi",
                "nameHi": "स्वर संधि",
                "subtopics": [
                  "दीर्घ",
                  "गुण",
                  "वृद्धि",
                  "यण"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sandhi_2",
                "name": "Vyanjan Sandhi",
                "nameHi": "व्यंजन संधि",
                "subtopics": [
                  "व्यंजन परिवर्तन"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_samas_1",
                "name": "Tatpurush Samas",
                "nameHi": "तत्पुरुष समास",
                "subtopics": [
                  "कर्म",
                  "करण",
                  "सम्प्रदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_samas_2",
                "name": "Dwandwa Samas",
                "nameHi": "द्वंद्व समास",
                "subtopics": [
                  "समाहार",
                  "इतरेतर"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_shabd_1",
                "name": "Tatsam and Tadbhav",
                "nameHi": "तत्सम एवं तद्भव",
                "subtopics": [
                  "शब्द पहचान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_gram_1",
                "name": "Noun",
                "nameHi": "संज्ञा",
                "subtopics": [
                  "भेद",
                  "उपयोग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_gram_2",
                "name": "Pronoun",
                "nameHi": "सर्वनाम",
                "subtopics": [
                  "भेद"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_gram_3",
                "name": "Adjective",
                "nameHi": "विशेषण",
                "subtopics": [
                  "भेद"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_vocab_1",
                "name": "Synonyms",
                "nameHi": "पर्यायवाची शब्द",
                "subtopics": [
                  "एकार्थी",
                  "अनेकार्थी पर्याय"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_2",
                "name": "Antonyms",
                "nameHi": "विलोम शब्द",
                "subtopics": [
                  "तत्सम विलोम",
                  "प्रचलित विलोम"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_idiom_1",
                "name": "Idioms",
                "nameHi": "मुहावरे",
                "subtopics": [
                  "अर्थ",
                  "प्रयोग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sent_1",
                "name": "Sentence Correction",
                "nameHi": "वाक्य शुद्धि",
                "subtopics": [
                  "व्याकरणिक त्रुटि",
                  "अर्थगत त्रुटि"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "tet_hindi_ch_3",
            "name": "हिंदी भाषा शिक्षण शास्त्र (Pedagogy)",
            "topics": [
              {
                "id": "tet_hin_ped",
                "name": "Hindi Language Pedagogy",
                "nameHi": "हिंदी भाषा शिक्षण शास्त्र एवं भाषाई कौशल",
                "subtopics": [
                  "भाषा अर्जन एवं भाषा अधिगम की संकल्पना",
                  "भाषा शिक्षण के चार बुनियादी कौशल (सुनना, बोलना, पढ़ना, लिखना - LSRW)",
                  "भाषा शिक्षण की प्रमुख विधियां एवं चुनौतियां",
                  "शिक्षण अधिगम सामग्री (TLM) एवं उपचारात्मक शिक्षण"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "hin_comp_1",
            "name": "Reading Comprehension",
            "nameHi": "अपठित गद्यांश",
            "subtopics": [
              "तथ्यात्मक प्रश्न",
              "विश्लेषणात्मक प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_varn_1",
            "name": "Hindi Alphabet",
            "nameHi": "हिंदी वर्णमाला",
            "subtopics": [
              "स्वर",
              "व्यंजन",
              "अयोगवाह"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_varn_2",
            "name": "Vowel and Consonant Classification",
            "nameHi": "स्वर एवं व्यंजन वर्गीकरण",
            "subtopics": [
              "ह्रस्व",
              "दीर्घ",
              "स्पर्श",
              "ऊष्म"
            ],
            "importanceScore": 8
          },
          {
            "id": "hin_sandhi_1",
            "name": "Swar Sandhi",
            "nameHi": "स्वर संधि",
            "subtopics": [
              "दीर्घ",
              "गुण",
              "वृद्धि",
              "यण"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sandhi_2",
            "name": "Vyanjan Sandhi",
            "nameHi": "व्यंजन संधि",
            "subtopics": [
              "व्यंजन परिवर्तन"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_samas_1",
            "name": "Tatpurush Samas",
            "nameHi": "तत्पुरुष समास",
            "subtopics": [
              "कर्म",
              "करण",
              "सम्प्रदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_samas_2",
            "name": "Dwandwa Samas",
            "nameHi": "द्वंद्व समास",
            "subtopics": [
              "समाहार",
              "इतरेतर"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_shabd_1",
            "name": "Tatsam and Tadbhav",
            "nameHi": "तत्सम एवं तद्भव",
            "subtopics": [
              "शब्द पहचान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_gram_1",
            "name": "Noun",
            "nameHi": "संज्ञा",
            "subtopics": [
              "भेद",
              "उपयोग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_gram_2",
            "name": "Pronoun",
            "nameHi": "सर्वनाम",
            "subtopics": [
              "भेद"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_gram_3",
            "name": "Adjective",
            "nameHi": "विशेषण",
            "subtopics": [
              "भेद"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_vocab_1",
            "name": "Synonyms",
            "nameHi": "पर्यायवाची शब्द",
            "subtopics": [
              "एकार्थी",
              "अनेकार्थी पर्याय"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_2",
            "name": "Antonyms",
            "nameHi": "विलोम शब्द",
            "subtopics": [
              "तत्सम विलोम",
              "प्रचलित विलोम"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_idiom_1",
            "name": "Idioms",
            "nameHi": "मुहावरे",
            "subtopics": [
              "अर्थ",
              "प्रयोग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sent_1",
            "name": "Sentence Correction",
            "nameHi": "वाक्य शुद्धि",
            "subtopics": [
              "व्याकरणिक त्रुटि",
              "अर्थगत त्रुटि"
            ],
            "importanceScore": 10
          },
          {
            "id": "tet_hin_ped",
            "name": "Hindi Language Pedagogy",
            "nameHi": "हिंदी भाषा शिक्षण शास्त्र एवं भाषाई कौशल",
            "subtopics": [
              "भाषा अर्जन एवं भाषा अधिगम की संकल्पना",
              "भाषा शिक्षण के चार बुनियादी कौशल (सुनना, बोलना, पढ़ना, लिखना - LSRW)",
              "भाषा शिक्षण की प्रमुख विधियां एवं चुनौतियां",
              "शिक्षण अधिगम सामग्री (TLM) एवं उपचारात्मक शिक्षण"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "tet_english",
        "name": "भाषा 2: English Language & Pedagogy",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "tet_english_ch_1",
            "name": "Reading Comprehension Passages",
            "topics": [
              {
                "id": "eng_comp_1",
                "name": "Passage Comprehension",
                "nameHi": "गद्यांश आधारित प्रश्न",
                "subtopics": [
                  "Factual Questions",
                  "Inference Questions",
                  "Vocabulary Questions"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "tet_english_ch_2",
            "name": "English Grammar & Vocabulary",
            "topics": [
              {
                "id": "eng_gram_1",
                "name": "Parts of Speech",
                "nameHi": "शब्द भेद",
                "subtopics": [
                  "Noun",
                  "Pronoun",
                  "Verb",
                  "Adjective",
                  "Adverb",
                  "Preposition",
                  "Conjunction",
                  "Interjection"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_gram_2",
                "name": "Articles",
                "nameHi": "Articles",
                "subtopics": [
                  "A",
                  "An",
                  "The"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_tense_1",
                "name": "Present Tense",
                "nameHi": "वर्तमान काल",
                "subtopics": [
                  "Simple",
                  "Continuous",
                  "Perfect",
                  "Perfect Continuous"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_tense_2",
                "name": "Past Tense",
                "nameHi": "भूतकाल",
                "subtopics": [
                  "Simple",
                  "Continuous",
                  "Perfect",
                  "Perfect Continuous"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_voice_1",
                "name": "Active and Passive Voice",
                "nameHi": "कर्तृवाच्य एवं कर्मवाच्य",
                "subtopics": [
                  "Tense Based Voice",
                  "Modal Voice"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_vocab_1",
                "name": "Synonyms",
                "nameHi": "समानार्थी शब्द",
                "subtopics": [
                  "Word Meaning"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_vocab_2",
                "name": "Antonyms",
                "nameHi": "विलोम शब्द",
                "subtopics": [
                  "Opposite Words"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_idiom_1",
                "name": "Idioms",
                "nameHi": "मुहावरे",
                "subtopics": [
                  "Meaning",
                  "Usage"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "tet_english_ch_3",
            "name": "English Language Pedagogy",
            "topics": [
              {
                "id": "tet_eng_ped",
                "name": "English Language Pedagogy",
                "nameHi": "English Language Teaching & Pedagogy",
                "subtopics": [
                  "Principles of Language Teaching in English",
                  "Acquisition and Learning Differences",
                  "Challenges of Teaching English in Multilingual Context",
                  "Remedial Teaching and Continuous Evaluation in English"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "eng_comp_1",
            "name": "Passage Comprehension",
            "nameHi": "गद्यांश आधारित प्रश्न",
            "subtopics": [
              "Factual Questions",
              "Inference Questions",
              "Vocabulary Questions"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_gram_1",
            "name": "Parts of Speech",
            "nameHi": "शब्द भेद",
            "subtopics": [
              "Noun",
              "Pronoun",
              "Verb",
              "Adjective",
              "Adverb",
              "Preposition",
              "Conjunction",
              "Interjection"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_gram_2",
            "name": "Articles",
            "nameHi": "Articles",
            "subtopics": [
              "A",
              "An",
              "The"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_tense_1",
            "name": "Present Tense",
            "nameHi": "वर्तमान काल",
            "subtopics": [
              "Simple",
              "Continuous",
              "Perfect",
              "Perfect Continuous"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_tense_2",
            "name": "Past Tense",
            "nameHi": "भूतकाल",
            "subtopics": [
              "Simple",
              "Continuous",
              "Perfect",
              "Perfect Continuous"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_voice_1",
            "name": "Active and Passive Voice",
            "nameHi": "कर्तृवाच्य एवं कर्मवाच्य",
            "subtopics": [
              "Tense Based Voice",
              "Modal Voice"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_vocab_1",
            "name": "Synonyms",
            "nameHi": "समानार्थी शब्द",
            "subtopics": [
              "Word Meaning"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_vocab_2",
            "name": "Antonyms",
            "nameHi": "विलोम शब्द",
            "subtopics": [
              "Opposite Words"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_idiom_1",
            "name": "Idioms",
            "nameHi": "मुहावरे",
            "subtopics": [
              "Meaning",
              "Usage"
            ],
            "importanceScore": 10
          },
          {
            "id": "tet_eng_ped",
            "name": "English Language Pedagogy",
            "nameHi": "English Language Teaching & Pedagogy",
            "subtopics": [
              "Principles of Language Teaching in English",
              "Acquisition and Learning Differences",
              "Challenges of Teaching English in Multilingual Context",
              "Remedial Teaching and Continuous Evaluation in English"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "tet_maths",
        "name": "गणित एवं गणित शिक्षण शास्त्र",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "tet_maths_ch_1",
            "name": "संख्या पद्धति, संक्रियाएँ एवं भिन्न",
            "topics": [
              {
                "id": "math_ns_1",
                "name": "Number System Basics",
                "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
                "subtopics": [
                  "प्राकृतिक संख्या",
                  "पूर्ण संख्या",
                  "पूर्णांक",
                  "परिमेय संख्या",
                  "अपरिमेय संख्या"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_2",
                "name": "Divisibility Rules",
                "nameHi": "विभाज्यता के नियम",
                "subtopics": [
                  "2,3,4,5,6,8,9,11 के नियम"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_3",
                "name": "LCM and HCF",
                "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
                "subtopics": [
                  "LCM",
                  "HCF",
                  "प्रयोग आधारित प्रश्न"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ns_5",
                "name": "Simplification",
                "nameHi": "सरलीकरण",
                "subtopics": [
                  "BODMAS",
                  "Fraction",
                  "Decimal"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "tet_maths_ch_2",
            "name": "व्यावसायिक अंकगणित एवं मापन",
            "topics": [
              {
                "id": "math_ratio_3",
                "name": "Average",
                "nameHi": "औसत",
                "subtopics": [
                  "Simple Average",
                  "Weighted Average"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_1",
                "name": "Percentage",
                "nameHi": "प्रतिशत",
                "subtopics": [
                  "Percentage Conversion",
                  "Increase & Decrease"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_2",
                "name": "Profit and Loss",
                "nameHi": "लाभ एवं हानि",
                "subtopics": [
                  "Cost Price",
                  "Selling Price",
                  "Profit Percentage"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_1",
                "name": "Ratio",
                "nameHi": "अनुपात",
                "subtopics": [
                  "Simple Ratio",
                  "Compound Ratio"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_1",
                "name": "Simple Interest",
                "nameHi": "साधारण ब्याज",
                "subtopics": [
                  "Principal",
                  "Rate",
                  "Time"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_3",
                "name": "Time and Work",
                "nameHi": "समय एवं कार्य",
                "subtopics": [
                  "Efficiency",
                  "Work Distribution"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "tet_maths_ch_3",
            "name": "ज्यामिति एवं क्षेत्रमिति",
            "topics": [
              {
                "id": "math_geo_1",
                "name": "Lines and Angles",
                "nameHi": "रेखाएँ एवं कोण",
                "subtopics": [
                  "Types of Angles",
                  "Parallel Lines"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_geo_2",
                "name": "Triangles",
                "nameHi": "त्रिभुज",
                "subtopics": [
                  "Congruence",
                  "Similarity"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_1",
                "name": "2D Mensuration",
                "nameHi": "समतल क्षेत्रमिति",
                "subtopics": [
                  "Square",
                  "Rectangle",
                  "Triangle",
                  "Circle"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_2",
                "name": "3D Mensuration",
                "nameHi": "ठोस क्षेत्रमिति",
                "subtopics": [
                  "Cube",
                  "Cuboid",
                  "Cylinder",
                  "Cone",
                  "Sphere"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "tet_maths_ch_4",
            "name": "गणित शिक्षण शास्त्र (Mathematics Pedagogy)",
            "topics": [
              {
                "id": "tet_math_ped",
                "name": "Mathematics Pedagogy",
                "nameHi": "गणित शिक्षण शास्त्र, गणितीय सोच एवं त्रुटि विश्लेषण",
                "subtopics": [
                  "गणित की प्रकृति, संरचना एवं तार्किक चिंतन",
                  "पाठ्यचर्या में गणित का स्थान एवं उद्देश्य",
                  "गणित शिक्षण की विधियां (आगमन, निगमन, विश्लेषण, संश्लेषण)",
                  "त्रुटि विश्लेषण एवं अधिगम कठिनाइयों का निदान"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "math_ns_1",
            "name": "Number System Basics",
            "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
            "subtopics": [
              "प्राकृतिक संख्या",
              "पूर्ण संख्या",
              "पूर्णांक",
              "परिमेय संख्या",
              "अपरिमेय संख्या"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_2",
            "name": "Divisibility Rules",
            "nameHi": "विभाज्यता के नियम",
            "subtopics": [
              "2,3,4,5,6,8,9,11 के नियम"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_3",
            "name": "LCM and HCF",
            "nameHi": "लघुत्तम समापवर्त्य एवं महत्तम समापवर्तक",
            "subtopics": [
              "LCM",
              "HCF",
              "प्रयोग आधारित प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ns_5",
            "name": "Simplification",
            "nameHi": "सरलीकरण",
            "subtopics": [
              "BODMAS",
              "Fraction",
              "Decimal"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_3",
            "name": "Average",
            "nameHi": "औसत",
            "subtopics": [
              "Simple Average",
              "Weighted Average"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_1",
            "name": "Percentage",
            "nameHi": "प्रतिशत",
            "subtopics": [
              "Percentage Conversion",
              "Increase & Decrease"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_2",
            "name": "Profit and Loss",
            "nameHi": "लाभ एवं हानि",
            "subtopics": [
              "Cost Price",
              "Selling Price",
              "Profit Percentage"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_1",
            "name": "Ratio",
            "nameHi": "अनुपात",
            "subtopics": [
              "Simple Ratio",
              "Compound Ratio"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_1",
            "name": "Simple Interest",
            "nameHi": "साधारण ब्याज",
            "subtopics": [
              "Principal",
              "Rate",
              "Time"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_3",
            "name": "Time and Work",
            "nameHi": "समय एवं कार्य",
            "subtopics": [
              "Efficiency",
              "Work Distribution"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_geo_1",
            "name": "Lines and Angles",
            "nameHi": "रेखाएँ एवं कोण",
            "subtopics": [
              "Types of Angles",
              "Parallel Lines"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_geo_2",
            "name": "Triangles",
            "nameHi": "त्रिभुज",
            "subtopics": [
              "Congruence",
              "Similarity"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_1",
            "name": "2D Mensuration",
            "nameHi": "समतल क्षेत्रमिति",
            "subtopics": [
              "Square",
              "Rectangle",
              "Triangle",
              "Circle"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_2",
            "name": "3D Mensuration",
            "nameHi": "ठोस क्षेत्रमिति",
            "subtopics": [
              "Cube",
              "Cuboid",
              "Cylinder",
              "Cone",
              "Sphere"
            ],
            "importanceScore": 10
          },
          {
            "id": "tet_math_ped",
            "name": "Mathematics Pedagogy",
            "nameHi": "गणित शिक्षण शास्त्र, गणितीय सोच एवं त्रुटि विश्लेषण",
            "subtopics": [
              "गणित की प्रकृति, संरचना एवं तार्किक चिंतन",
              "पाठ्यचर्या में गणित का स्थान एवं उद्देश्य",
              "गणित शिक्षण की विधियां (आगमन, निगमन, विश्लेषण, संश्लेषण)",
              "त्रुटि विश्लेषण एवं अधिगम कठिनाइयों का निदान"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "tet_evs",
        "name": "पर्यावरण अध्ययन एवं शिक्षण शास्त्र (EVS)",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "tet_evs_ch_1",
            "name": "परिवार, आवास, भोजन, पोषण एवं स्वास्थ्य",
            "topics": [
              {
                "id": "tet_evs_1",
                "name": "Family, Food, Nutrition & Health",
                "nameHi": "परिवार, समाज, आवास, भोजन, पोषण एवं स्वच्छता",
                "subtopics": [
                  "परिवार के प्रकार (एकल एवं संयुक्त), सामाजिक बुराइयां",
                  "आवास के प्रकार एवं स्वच्छता",
                  "भोजन के प्रमुख पोषक तत्व, संतुलित आहार",
                  "संक्रामक एवं कुपोषण जनित रोग"
                ],
                "importanceScore": 8
              },
              {
                "id": "tet_evs_2",
                "name": "Water, Air, Ecosystem & Pollution",
                "nameHi": "जल, वायु, ऋतु चक्र, पारिस्थितिकी तंत्र एवं प्रदूषण",
                "subtopics": [
                  "जल के स्रोत, जल संरक्षण एवं प्रदूषण",
                  "वायुमंडल की संरचना एवं वायु प्रदूषण",
                  "पारिस्थितिकी तंत्र (Ecosystem) के घटक एवं खाद्य श्रृंखला",
                  "अपशिष्ट प्रबंधन एवं 3R (Reduce, Reuse, Recycle)"
                ],
                "importanceScore": 8
              },
              {
                "id": "tet_evs_3",
                "name": "Chhattisgarh Environment & Wildlife",
                "nameHi": "छत्तीसगढ़ का प्राकृतिक परिवेश, वन एवं जैव विविधता",
                "subtopics": [
                  "छत्तीसगढ़ की प्रमुख नदियां, जलप्रपात एवं पर्वत",
                  "छत्तीसगढ़ की वन संपदा एवं औषधीय पौधे",
                  "छत्तीसगढ़ के राष्ट्रीय उद्यान एवं अभयारण्य",
                  "पारंपरिक जल संरक्षण विधियां"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "tet_evs_ch_2",
            "name": "पर्यावरण अध्ययन शिक्षण शास्त्र (EVS Pedagogy)",
            "topics": [
              {
                "id": "tet_evs_ped",
                "name": "EVS Pedagogy & Practical",
                "nameHi": "पर्यावरण अध्ययन की संकल्पना, दृष्टिकोण एवं शिक्षण विधियां",
                "subtopics": [
                  "पर्यावरण अध्ययन का महत्व, एकीकृत पर्यावरण अध्ययन",
                  "विज्ञान एवं सामाजिक विज्ञान से पर्यावरण का संबंध",
                  "क्रियाकलाप, प्रयोग, प्रायोजना कार्य एवं क्षेत्र भ्रमण",
                  "पर्यावरण शिक्षण में सहायक सामग्री एवं मूल्यांकन"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "tet_evs_1",
            "name": "Family, Food, Nutrition & Health",
            "nameHi": "परिवार, समाज, आवास, भोजन, पोषण एवं स्वच्छता",
            "subtopics": [
              "परिवार के प्रकार (एकल एवं संयुक्त), सामाजिक बुराइयां",
              "आवास के प्रकार एवं स्वच्छता",
              "भोजन के प्रमुख पोषक तत्व, संतुलित आहार",
              "संक्रामक एवं कुपोषण जनित रोग"
            ],
            "importanceScore": 8
          },
          {
            "id": "tet_evs_2",
            "name": "Water, Air, Ecosystem & Pollution",
            "nameHi": "जल, वायु, ऋतु चक्र, पारिस्थितिकी तंत्र एवं प्रदूषण",
            "subtopics": [
              "जल के स्रोत, जल संरक्षण एवं प्रदूषण",
              "वायुमंडल की संरचना एवं वायु प्रदूषण",
              "पारिस्थितिकी तंत्र (Ecosystem) के घटक एवं खाद्य श्रृंखला",
              "अपशिष्ट प्रबंधन एवं 3R (Reduce, Reuse, Recycle)"
            ],
            "importanceScore": 8
          },
          {
            "id": "tet_evs_3",
            "name": "Chhattisgarh Environment & Wildlife",
            "nameHi": "छत्तीसगढ़ का प्राकृतिक परिवेश, वन एवं जैव विविधता",
            "subtopics": [
              "छत्तीसगढ़ की प्रमुख नदियां, जलप्रपात एवं पर्वत",
              "छत्तीसगढ़ की वन संपदा एवं औषधीय पौधे",
              "छत्तीसगढ़ के राष्ट्रीय उद्यान एवं अभयारण्य",
              "पारंपरिक जल संरक्षण विधियां"
            ],
            "importanceScore": 8
          },
          {
            "id": "tet_evs_ped",
            "name": "EVS Pedagogy & Practical",
            "nameHi": "पर्यावरण अध्ययन की संकल्पना, दृष्टिकोण एवं शिक्षण विधियां",
            "subtopics": [
              "पर्यावरण अध्ययन का महत्व, एकीकृत पर्यावरण अध्ययन",
              "विज्ञान एवं सामाजिक विज्ञान से पर्यावरण का संबंध",
              "क्रियाकलाप, प्रयोग, प्रायोजना कार्य एवं क्षेत्र भ्रमण",
              "पर्यावरण शिक्षण में सहायक सामग्री एवं मूल्यांकन"
            ],
            "importanceScore": 8
          }
        ]
      }
    ]
  },
  "transport_constable": {
    "name": "Transport Constable",
    "fullName": "CG Transport Department Constable (परिवहन आरक्षक) Recruitment Exam",
    "icon": "🚌",
    "category": "police",
    "description": "छत्तीसगढ़ परिवहन आरक्षक भर्ती परीक्षा — 100 अंक",
    "eligibility": "10th / 12th Pass + Valid Driving License",
    "pattern": {
      "totalMarks": 100,
      "time": "2 Hours",
      "type": "Objective MCQ (100 Questions, 100 Marks)",
      "papers": [
        {
          "paper": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
          "marks": 40
        },
        {
          "paper": "तार्किक क्षमता एवं मानसिक योग्यता (Reasoning)",
          "marks": 20
        },
        {
          "paper": "सामान्य अंकगणित (Mathematics)",
          "marks": 20
        },
        {
          "paper": "मोटर वाहन अधिनियम एवं सड़क सुरक्षा नियम",
          "marks": 20
        }
      ]
    },
    "subjects": [
      {
        "id": "trans_gk",
        "name": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
        "weightage": 40,
        "importance": "Highest",
        "pyqFrequency": "Very High (40 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "trans_gk_ch_1",
            "name": "छत्तीसगढ़ का इतिहास, भूगोल व संस्कृति",
            "topics": [
              {
                "id": "cg_hist_1",
                "name": "Prehistoric Chhattisgarh",
                "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
                "subtopics": [
                  "शैलचित्र",
                  "पुरातात्विक साक्ष्य",
                  "प्रमुख स्थल"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_hist_7",
                "name": "Kalchuri Dynasty",
                "nameHi": "कलचुरी वंश",
                "subtopics": [
                  "रत्नपुर शाखा",
                  "रायपुर शाखा",
                  "सांस्कृतिक योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_11",
                "name": "1857 Revolt in Chhattisgarh",
                "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
                "subtopics": [
                  "वीर नारायण सिंह",
                  "स्थानीय आंदोलन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_1",
                "name": "Location and Boundaries",
                "nameHi": "स्थिति एवं सीमाएँ",
                "subtopics": [
                  "अक्षांश",
                  "देशांतर",
                  "पड़ोसी राज्य"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_3",
                "name": "Major Rivers",
                "nameHi": "प्रमुख नदियाँ",
                "subtopics": [
                  "महानदी",
                  "शिवनाथ",
                  "इंद्रावती",
                  "हसदेव",
                  "अरपा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_1",
                "name": "Major Tribes",
                "nameHi": "प्रमुख जनजातियाँ",
                "subtopics": [
                  "गोंड",
                  "बैगा",
                  "हल्बा",
                  "उरांव",
                  "कंवर"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_4",
                "name": "Districts and Divisions",
                "nameHi": "जिले एवं संभाग",
                "subtopics": [
                  "सभी जिले",
                  "सभी संभाग"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_6",
                "name": "Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन",
                  "कृषि योजनाएँ",
                  "शिक्षा योजनाएँ"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "trans_gk_ch_2",
            "name": "भारत सामान्य ज्ञान व संविधान",
            "topics": [
              {
                "id": "ind_hist_1",
                "name": "Indus Valley Civilization",
                "nameHi": "सिंधु घाटी सभ्यता",
                "subtopics": [
                  "हड़प्पा",
                  "मोहनजोदड़ो",
                  "लोथल",
                  "कालीबंगन",
                  "धौलावीरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_mod_5",
                "name": "Gandhian Movements",
                "nameHi": "गांधीवादी आंदोलन",
                "subtopics": [
                  "असहयोग",
                  "सविनय अवज्ञा",
                  "भारत छोड़ो"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_1",
                "name": "Physical Geography of India",
                "nameHi": "भारत का भौतिक भूगोल",
                "subtopics": [
                  "हिमालय",
                  "उत्तरी मैदान",
                  "दक्कन का पठार",
                  "तटीय मैदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_1",
                "name": "Constitution",
                "nameHi": "भारतीय संविधान",
                "subtopics": [
                  "विशेषताएँ",
                  "प्रस्तावना",
                  "संशोधन"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_2",
                "name": "Fundamental Rights",
                "nameHi": "मौलिक अधिकार",
                "subtopics": [
                  "अनुच्छेद 12-35"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_5",
                "name": "Parliament",
                "nameHi": "संसद",
                "subtopics": [
                  "लोकसभा",
                  "राज्यसभा"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "trans_gk_ch_3",
            "name": "समसामयिक घटनाएं एवं खेल",
            "topics": [
              {
                "id": "ca_nat_1",
                "name": "Government Schemes",
                "nameHi": "केंद्र सरकार की योजनाएँ",
                "subtopics": [
                  "PM Kisan",
                  "PM Awas Yojana",
                  "Ayushman Bharat",
                  "Jal Jeevan Mission",
                  "PM Vishwakarma"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_cg_1",
                "name": "State Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन योजना",
                  "कृषि योजनाएँ",
                  "युवा योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_sports_1",
                "name": "National Sports Events",
                "nameHi": "राष्ट्रीय खेल आयोजन",
                "subtopics": [
                  "Khelo India",
                  "National Games"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "cg_hist_1",
            "name": "Prehistoric Chhattisgarh",
            "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
            "subtopics": [
              "शैलचित्र",
              "पुरातात्विक साक्ष्य",
              "प्रमुख स्थल"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_hist_7",
            "name": "Kalchuri Dynasty",
            "nameHi": "कलचुरी वंश",
            "subtopics": [
              "रत्नपुर शाखा",
              "रायपुर शाखा",
              "सांस्कृतिक योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_11",
            "name": "1857 Revolt in Chhattisgarh",
            "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
            "subtopics": [
              "वीर नारायण सिंह",
              "स्थानीय आंदोलन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_1",
            "name": "Location and Boundaries",
            "nameHi": "स्थिति एवं सीमाएँ",
            "subtopics": [
              "अक्षांश",
              "देशांतर",
              "पड़ोसी राज्य"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_3",
            "name": "Major Rivers",
            "nameHi": "प्रमुख नदियाँ",
            "subtopics": [
              "महानदी",
              "शिवनाथ",
              "इंद्रावती",
              "हसदेव",
              "अरपा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_1",
            "name": "Major Tribes",
            "nameHi": "प्रमुख जनजातियाँ",
            "subtopics": [
              "गोंड",
              "बैगा",
              "हल्बा",
              "उरांव",
              "कंवर"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_4",
            "name": "Districts and Divisions",
            "nameHi": "जिले एवं संभाग",
            "subtopics": [
              "सभी जिले",
              "सभी संभाग"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_6",
            "name": "Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन",
              "कृषि योजनाएँ",
              "शिक्षा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_hist_1",
            "name": "Indus Valley Civilization",
            "nameHi": "सिंधु घाटी सभ्यता",
            "subtopics": [
              "हड़प्पा",
              "मोहनजोदड़ो",
              "लोथल",
              "कालीबंगन",
              "धौलावीरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_mod_5",
            "name": "Gandhian Movements",
            "nameHi": "गांधीवादी आंदोलन",
            "subtopics": [
              "असहयोग",
              "सविनय अवज्ञा",
              "भारत छोड़ो"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_1",
            "name": "Physical Geography of India",
            "nameHi": "भारत का भौतिक भूगोल",
            "subtopics": [
              "हिमालय",
              "उत्तरी मैदान",
              "दक्कन का पठार",
              "तटीय मैदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_1",
            "name": "Constitution",
            "nameHi": "भारतीय संविधान",
            "subtopics": [
              "विशेषताएँ",
              "प्रस्तावना",
              "संशोधन"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_2",
            "name": "Fundamental Rights",
            "nameHi": "मौलिक अधिकार",
            "subtopics": [
              "अनुच्छेद 12-35"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_5",
            "name": "Parliament",
            "nameHi": "संसद",
            "subtopics": [
              "लोकसभा",
              "राज्यसभा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_1",
            "name": "Government Schemes",
            "nameHi": "केंद्र सरकार की योजनाएँ",
            "subtopics": [
              "PM Kisan",
              "PM Awas Yojana",
              "Ayushman Bharat",
              "Jal Jeevan Mission",
              "PM Vishwakarma"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_cg_1",
            "name": "State Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन योजना",
              "कृषि योजनाएँ",
              "युवा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_sports_1",
            "name": "National Sports Events",
            "nameHi": "राष्ट्रीय खेल आयोजन",
            "subtopics": [
              "Khelo India",
              "National Games"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "trans_reasoning",
        "name": "तार्किक क्षमता एवं मानसिक योग्यता (Reasoning)",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "trans_reasoning_ch_1",
            "name": "श्रेणी, सादृश्यता एवं कोडिंग",
            "topics": [
              {
                "id": "reas_ser_1",
                "name": "Number Series",
                "nameHi": "संख्या श्रेणी",
                "subtopics": [
                  "Missing Number",
                  "Wrong Number",
                  "Pattern Based Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ser_2",
                "name": "Alphabet Series",
                "nameHi": "अक्षर श्रेणी",
                "subtopics": [
                  "Letter Pattern",
                  "Mixed Series"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_ana_1",
                "name": "Analogy",
                "nameHi": "समानता",
                "subtopics": [
                  "Word Analogy",
                  "Number Analogy",
                  "Letter Analogy"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_cd_1",
                "name": "Letter Coding",
                "nameHi": "अक्षर कोडिंग",
                "subtopics": [
                  "Direct Coding",
                  "Reverse Coding"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_br_1",
                "name": "Blood Relations",
                "nameHi": "रक्त संबंध",
                "subtopics": [
                  "Family Tree",
                  "Generation Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_dir_1",
                "name": "Direction Sense",
                "nameHi": "दिशा ज्ञान",
                "subtopics": [
                  "North-South-East-West",
                  "Turning Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_nv_1",
                "name": "Mirror Image",
                "nameHi": "दर्पण प्रतिबिंब",
                "subtopics": [
                  "Vertical Mirror",
                  "Horizontal Mirror"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "reas_ser_1",
            "name": "Number Series",
            "nameHi": "संख्या श्रेणी",
            "subtopics": [
              "Missing Number",
              "Wrong Number",
              "Pattern Based Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ser_2",
            "name": "Alphabet Series",
            "nameHi": "अक्षर श्रेणी",
            "subtopics": [
              "Letter Pattern",
              "Mixed Series"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_ana_1",
            "name": "Analogy",
            "nameHi": "समानता",
            "subtopics": [
              "Word Analogy",
              "Number Analogy",
              "Letter Analogy"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_cd_1",
            "name": "Letter Coding",
            "nameHi": "अक्षर कोडिंग",
            "subtopics": [
              "Direct Coding",
              "Reverse Coding"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_br_1",
            "name": "Blood Relations",
            "nameHi": "रक्त संबंध",
            "subtopics": [
              "Family Tree",
              "Generation Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_dir_1",
            "name": "Direction Sense",
            "nameHi": "दिशा ज्ञान",
            "subtopics": [
              "North-South-East-West",
              "Turning Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_nv_1",
            "name": "Mirror Image",
            "nameHi": "दर्पण प्रतिबिंब",
            "subtopics": [
              "Vertical Mirror",
              "Horizontal Mirror"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "trans_maths",
        "name": "सामान्य अंकगणित (Mathematics)",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "trans_maths_ch_1",
            "name": "संख्या पद्धति एवं व्यावसायिक गणित",
            "topics": [
              {
                "id": "math_ns_1",
                "name": "Number System Basics",
                "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
                "subtopics": [
                  "प्राकृतिक संख्या",
                  "पूर्ण संख्या",
                  "पूर्णांक",
                  "परिमेय संख्या",
                  "अपरिमेय संख्या"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_3",
                "name": "Average",
                "nameHi": "औसत",
                "subtopics": [
                  "Simple Average",
                  "Weighted Average"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_1",
                "name": "Percentage",
                "nameHi": "प्रतिशत",
                "subtopics": [
                  "Percentage Conversion",
                  "Increase & Decrease"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_2",
                "name": "Profit and Loss",
                "nameHi": "लाभ एवं हानि",
                "subtopics": [
                  "Cost Price",
                  "Selling Price",
                  "Profit Percentage"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ratio_1",
                "name": "Ratio",
                "nameHi": "अनुपात",
                "subtopics": [
                  "Simple Ratio",
                  "Compound Ratio"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_si_1",
                "name": "Simple Interest",
                "nameHi": "साधारण ब्याज",
                "subtopics": [
                  "Principal",
                  "Rate",
                  "Time"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_tsd_1",
                "name": "Speed Time Distance",
                "nameHi": "समय, चाल एवं दूरी",
                "subtopics": [
                  "Average Speed",
                  "Relative Speed"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_men_1",
                "name": "2D Mensuration",
                "nameHi": "समतल क्षेत्रमिति",
                "subtopics": [
                  "Square",
                  "Rectangle",
                  "Triangle",
                  "Circle"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "math_ns_1",
            "name": "Number System Basics",
            "nameHi": "संख्या पद्धति की मूल अवधारणाएँ",
            "subtopics": [
              "प्राकृतिक संख्या",
              "पूर्ण संख्या",
              "पूर्णांक",
              "परिमेय संख्या",
              "अपरिमेय संख्या"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_3",
            "name": "Average",
            "nameHi": "औसत",
            "subtopics": [
              "Simple Average",
              "Weighted Average"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_1",
            "name": "Percentage",
            "nameHi": "प्रतिशत",
            "subtopics": [
              "Percentage Conversion",
              "Increase & Decrease"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_2",
            "name": "Profit and Loss",
            "nameHi": "लाभ एवं हानि",
            "subtopics": [
              "Cost Price",
              "Selling Price",
              "Profit Percentage"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ratio_1",
            "name": "Ratio",
            "nameHi": "अनुपात",
            "subtopics": [
              "Simple Ratio",
              "Compound Ratio"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_si_1",
            "name": "Simple Interest",
            "nameHi": "साधारण ब्याज",
            "subtopics": [
              "Principal",
              "Rate",
              "Time"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_tsd_1",
            "name": "Speed Time Distance",
            "nameHi": "समय, चाल एवं दूरी",
            "subtopics": [
              "Average Speed",
              "Relative Speed"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_men_1",
            "name": "2D Mensuration",
            "nameHi": "समतल क्षेत्रमिति",
            "subtopics": [
              "Square",
              "Rectangle",
              "Triangle",
              "Circle"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "trans_mva",
        "name": "मोटर वाहन अधिनियम एवं सड़क सुरक्षा नियम",
        "weightage": 20,
        "importance": "Highest",
        "pyqFrequency": "Very High (20 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "trans_mva_ch_1",
            "name": "मोटर वाहन अधिनियम एवं सड़क सुरक्षा",
            "topics": [
              {
                "id": "trans_act_1",
                "name": "Motor Vehicles Act 1988 & 2019 Amendments",
                "nameHi": "मोटर वाहन अधिनियम 1988 एवं संशोधन अधिनियम 2019 के मुख्य प्रावधान",
                "subtopics": [
                  "अधिनियम के उद्देश्य एवं प्रमुख परिभाषाएं",
                  "ड्राइविंग लाइसेंस श्रेणियां (LMV, HMV) एवं नवीनीकरण",
                  "वाहन पंजीकरण, फिटनेस प्रमाण पत्र एवं प्रदूषण नियंत्रण (PUC)",
                  "ओवरलोडिंग, शराब पीकर गाड़ी चलाना एवं नए दंड प्रावधान"
                ],
                "importanceScore": 8
              },
              {
                "id": "trans_act_2",
                "name": "Traffic Signs, Road Safety & First Aid",
                "nameHi": "यातायात संकेत, सड़क सुरक्षा नियम एवं दुर्घटना आपातकालीन सहायता",
                "subtopics": [
                  "अनिवार्य, चेतावनी एवं सूचनात्मक यातायात संकेत (Traffic Signs)",
                  "लेन अनुशासन, ओवरटेकिंग नियम एवं गति सीमाएं",
                  "सड़क दुर्घटना में गुड सेमेरिटन (Good Samaritan) गाइडलाइंस",
                  "ई-चालान प्रणाली एवं वाहन ट्रैकिंग सिस्टम"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "trans_act_1",
            "name": "Motor Vehicles Act 1988 & 2019 Amendments",
            "nameHi": "मोटर वाहन अधिनियम 1988 एवं संशोधन अधिनियम 2019 के मुख्य प्रावधान",
            "subtopics": [
              "अधिनियम के उद्देश्य एवं प्रमुख परिभाषाएं",
              "ड्राइविंग लाइसेंस श्रेणियां (LMV, HMV) एवं नवीनीकरण",
              "वाहन पंजीकरण, फिटनेस प्रमाण पत्र एवं प्रदूषण नियंत्रण (PUC)",
              "ओवरलोडिंग, शराब पीकर गाड़ी चलाना एवं नए दंड प्रावधान"
            ],
            "importanceScore": 8
          },
          {
            "id": "trans_act_2",
            "name": "Traffic Signs, Road Safety & First Aid",
            "nameHi": "यातायात संकेत, सड़क सुरक्षा नियम एवं दुर्घटना आपातकालीन सहायता",
            "subtopics": [
              "अनिवार्य, चेतावनी एवं सूचनात्मक यातायात संकेत (Traffic Signs)",
              "लेन अनुशासन, ओवरटेकिंग नियम एवं गति सीमाएं",
              "सड़क दुर्घटना में गुड सेमेरिटन (Good Samaritan) गाइडलाइंस",
              "ई-चालान प्रणाली एवं वाहन ट्रैकिंग सिस्टम"
            ],
            "importanceScore": 8
          }
        ]
      }
    ]
  },
  "adeo": {
    "name": "ADEO",
    "fullName": "CG Vyapam Assistant Development Extension Officer (सहायक विकास विस्तार अधिकारी)",
    "icon": "🌾",
    "category": "administrative",
    "description": "पंचायत एवं ग्रामीण विकास विभाग — सहायक विकास विस्तार अधिकारी भर्ती परीक्षा — आधिकारिक 150 अंकों का विस्तृत पाठ्यक्रम",
    "eligibility": "Graduate in Any Discipline",
    "pattern": {
      "totalMarks": 150,
      "time": "3 Hours",
      "type": "Objective MCQ (150 Questions, 150 Marks)",
      "papers": [
        {
          "paper": "सामान्य ज्ञान (General Knowledge)",
          "marks": 30
        },
        {
          "paper": "आजीविका संबंधित योजनाओं की जानकारी (Livelihood)",
          "marks": 30
        },
        {
          "paper": "पंचायती राज की जानकारी (Panchayati Raj)",
          "marks": 30
        },
        {
          "paper": "ग्रामीण विकास की प्रमुख योजनाएं (Rural Development)",
          "marks": 30
        },
        {
          "paper": "सामान्य हिंदी (General Hindi)",
          "marks": 30
        }
      ]
    },
    "subjects": [
      {
        "id": "adeo_gk",
        "name": "सामान्य ज्ञान (General Knowledge)",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "adeo_gk_ch_1",
            "name": "छत्तीसगढ़ सामान्य ज्ञान",
            "topics": [
              {
                "id": "cg_hist_1",
                "name": "Prehistoric Chhattisgarh",
                "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
                "subtopics": [
                  "शैलचित्र",
                  "पुरातात्विक साक्ष्य",
                  "प्रमुख स्थल"
                ],
                "importanceScore": 9
              },
              {
                "id": "cg_hist_7",
                "name": "Kalchuri Dynasty",
                "nameHi": "कलचुरी वंश",
                "subtopics": [
                  "रत्नपुर शाखा",
                  "रायपुर शाखा",
                  "सांस्कृतिक योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_10",
                "name": "British Rule in Chhattisgarh",
                "nameHi": "छत्तीसगढ़ में ब्रिटिश शासन",
                "subtopics": [
                  "ब्रिटिश प्रशासन",
                  "राजनीतिक परिवर्तन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_11",
                "name": "1857 Revolt in Chhattisgarh",
                "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
                "subtopics": [
                  "वीर नारायण सिंह",
                  "स्थानीय आंदोलन"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_12",
                "name": "Freedom Movement",
                "nameHi": "स्वतंत्रता आंदोलन",
                "subtopics": [
                  "असहयोग आंदोलन",
                  "भारत छोड़ो आंदोलन",
                  "स्थानीय योगदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_hist_13",
                "name": "Formation of Chhattisgarh State",
                "nameHi": "छत्तीसगढ़ राज्य का गठन",
                "subtopics": [
                  "राज्य आंदोलन",
                  "1 नवम्बर 2000",
                  "प्रमुख व्यक्तित्व"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_1",
                "name": "Location and Boundaries",
                "nameHi": "स्थिति एवं सीमाएँ",
                "subtopics": [
                  "अक्षांश",
                  "देशांतर",
                  "पड़ोसी राज्य"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_2",
                "name": "Physiographic Divisions",
                "nameHi": "भौतिक विभाजन",
                "subtopics": [
                  "मैदानी क्षेत्र",
                  "पठारी क्षेत्र",
                  "पर्वतीय क्षेत्र"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_3",
                "name": "Major Rivers",
                "nameHi": "प्रमुख नदियाँ",
                "subtopics": [
                  "महानदी",
                  "शिवनाथ",
                  "इंद्रावती",
                  "हसदेव",
                  "अरपा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_geo_7",
                "name": "Forest Resources",
                "nameHi": "वन संसाधन",
                "subtopics": [
                  "वन क्षेत्र",
                  "प्रमुख वृक्ष",
                  "लघु वनोपज"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_1",
                "name": "Major Tribes",
                "nameHi": "प्रमुख जनजातियाँ",
                "subtopics": [
                  "गोंड",
                  "बैगा",
                  "हल्बा",
                  "उरांव",
                  "कंवर"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_2",
                "name": "Special Tribal Groups",
                "nameHi": "विशेष पिछड़ी जनजातियाँ",
                "subtopics": [
                  "अबूझमाड़िया",
                  "कमार",
                  "पहाड़ी कोरवा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_cul_5",
                "name": "Festivals",
                "nameHi": "त्यौहार",
                "subtopics": [
                  "हरेली",
                  "पोला",
                  "तीजा",
                  "छेरछेरा"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_1",
                "name": "Agriculture",
                "nameHi": "कृषि",
                "subtopics": [
                  "धान उत्पादन",
                  "फसलें",
                  "कृषि योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_4",
                "name": "Districts and Divisions",
                "nameHi": "जिले एवं संभाग",
                "subtopics": [
                  "सभी जिले",
                  "सभी संभाग"
                ],
                "importanceScore": 10
              },
              {
                "id": "cg_eco_6",
                "name": "Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन",
                  "कृषि योजनाएँ",
                  "शिक्षा योजनाएँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_cg_1",
                "name": "State Government Schemes",
                "nameHi": "राज्य सरकार की योजनाएँ",
                "subtopics": [
                  "महतारी वंदन योजना",
                  "कृषि योजनाएँ",
                  "युवा योजनाएँ"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "adeo_gk_ch_2",
            "name": "भारतीय संविधान, राजव्यवस्था एवं समसामयिकी",
            "topics": [
              {
                "id": "ind_pol_1",
                "name": "Constitution",
                "nameHi": "भारतीय संविधान",
                "subtopics": [
                  "विशेषताएँ",
                  "प्रस्तावना",
                  "संशोधन"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_2",
                "name": "Fundamental Rights",
                "nameHi": "मौलिक अधिकार",
                "subtopics": [
                  "अनुच्छेद 12-35"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_3",
                "name": "Directive Principles",
                "nameHi": "राज्य नीति के निदेशक तत्व",
                "subtopics": [
                  "भाग-4"
                ],
                "importanceScore": 9
              },
              {
                "id": "ind_pol_5",
                "name": "Parliament",
                "nameHi": "संसद",
                "subtopics": [
                  "लोकसभा",
                  "राज्यसभा"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_6",
                "name": "President and Vice President",
                "nameHi": "राष्ट्रपति एवं उपराष्ट्रपति",
                "subtopics": [
                  "चुनाव",
                  "शक्तियाँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_pol_7",
                "name": "Prime Minister and Council of Ministers",
                "nameHi": "प्रधानमंत्री एवं मंत्रिपरिषद",
                "subtopics": [
                  "कार्य",
                  "उत्तरदायित्व"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_geo_1",
                "name": "Physical Geography of India",
                "nameHi": "भारत का भौतिक भूगोल",
                "subtopics": [
                  "हिमालय",
                  "उत्तरी मैदान",
                  "दक्कन का पठार",
                  "तटीय मैदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_nat_1",
                "name": "Government Schemes",
                "nameHi": "केंद्र सरकार की योजनाएँ",
                "subtopics": [
                  "PM Kisan",
                  "PM Awas Yojana",
                  "Ayushman Bharat",
                  "Jal Jeevan Mission",
                  "PM Vishwakarma"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_nat_3",
                "name": "Appointments",
                "nameHi": "महत्वपूर्ण नियुक्तियाँ",
                "subtopics": [
                  "राष्ट्रपति",
                  "राज्यपाल",
                  "मुख्य न्यायाधीश",
                  "सेना प्रमुख"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_sports_1",
                "name": "National Sports Events",
                "nameHi": "राष्ट्रीय खेल आयोजन",
                "subtopics": [
                  "Khelo India",
                  "National Games"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "cg_hist_1",
            "name": "Prehistoric Chhattisgarh",
            "nameHi": "प्रागैतिहासिक छत्तीसगढ़",
            "subtopics": [
              "शैलचित्र",
              "पुरातात्विक साक्ष्य",
              "प्रमुख स्थल"
            ],
            "importanceScore": 9
          },
          {
            "id": "cg_hist_7",
            "name": "Kalchuri Dynasty",
            "nameHi": "कलचुरी वंश",
            "subtopics": [
              "रत्नपुर शाखा",
              "रायपुर शाखा",
              "सांस्कृतिक योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_10",
            "name": "British Rule in Chhattisgarh",
            "nameHi": "छत्तीसगढ़ में ब्रिटिश शासन",
            "subtopics": [
              "ब्रिटिश प्रशासन",
              "राजनीतिक परिवर्तन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_11",
            "name": "1857 Revolt in Chhattisgarh",
            "nameHi": "1857 का विद्रोह एवं छत्तीसगढ़",
            "subtopics": [
              "वीर नारायण सिंह",
              "स्थानीय आंदोलन"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_12",
            "name": "Freedom Movement",
            "nameHi": "स्वतंत्रता आंदोलन",
            "subtopics": [
              "असहयोग आंदोलन",
              "भारत छोड़ो आंदोलन",
              "स्थानीय योगदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_hist_13",
            "name": "Formation of Chhattisgarh State",
            "nameHi": "छत्तीसगढ़ राज्य का गठन",
            "subtopics": [
              "राज्य आंदोलन",
              "1 नवम्बर 2000",
              "प्रमुख व्यक्तित्व"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_1",
            "name": "Location and Boundaries",
            "nameHi": "स्थिति एवं सीमाएँ",
            "subtopics": [
              "अक्षांश",
              "देशांतर",
              "पड़ोसी राज्य"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_2",
            "name": "Physiographic Divisions",
            "nameHi": "भौतिक विभाजन",
            "subtopics": [
              "मैदानी क्षेत्र",
              "पठारी क्षेत्र",
              "पर्वतीय क्षेत्र"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_3",
            "name": "Major Rivers",
            "nameHi": "प्रमुख नदियाँ",
            "subtopics": [
              "महानदी",
              "शिवनाथ",
              "इंद्रावती",
              "हसदेव",
              "अरपा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_geo_7",
            "name": "Forest Resources",
            "nameHi": "वन संसाधन",
            "subtopics": [
              "वन क्षेत्र",
              "प्रमुख वृक्ष",
              "लघु वनोपज"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_1",
            "name": "Major Tribes",
            "nameHi": "प्रमुख जनजातियाँ",
            "subtopics": [
              "गोंड",
              "बैगा",
              "हल्बा",
              "उरांव",
              "कंवर"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_2",
            "name": "Special Tribal Groups",
            "nameHi": "विशेष पिछड़ी जनजातियाँ",
            "subtopics": [
              "अबूझमाड़िया",
              "कमार",
              "पहाड़ी कोरवा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_cul_5",
            "name": "Festivals",
            "nameHi": "त्यौहार",
            "subtopics": [
              "हरेली",
              "पोला",
              "तीजा",
              "छेरछेरा"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_1",
            "name": "Agriculture",
            "nameHi": "कृषि",
            "subtopics": [
              "धान उत्पादन",
              "फसलें",
              "कृषि योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_4",
            "name": "Districts and Divisions",
            "nameHi": "जिले एवं संभाग",
            "subtopics": [
              "सभी जिले",
              "सभी संभाग"
            ],
            "importanceScore": 10
          },
          {
            "id": "cg_eco_6",
            "name": "Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन",
              "कृषि योजनाएँ",
              "शिक्षा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_cg_1",
            "name": "State Government Schemes",
            "nameHi": "राज्य सरकार की योजनाएँ",
            "subtopics": [
              "महतारी वंदन योजना",
              "कृषि योजनाएँ",
              "युवा योजनाएँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_1",
            "name": "Constitution",
            "nameHi": "भारतीय संविधान",
            "subtopics": [
              "विशेषताएँ",
              "प्रस्तावना",
              "संशोधन"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_2",
            "name": "Fundamental Rights",
            "nameHi": "मौलिक अधिकार",
            "subtopics": [
              "अनुच्छेद 12-35"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_3",
            "name": "Directive Principles",
            "nameHi": "राज्य नीति के निदेशक तत्व",
            "subtopics": [
              "भाग-4"
            ],
            "importanceScore": 9
          },
          {
            "id": "ind_pol_5",
            "name": "Parliament",
            "nameHi": "संसद",
            "subtopics": [
              "लोकसभा",
              "राज्यसभा"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_6",
            "name": "President and Vice President",
            "nameHi": "राष्ट्रपति एवं उपराष्ट्रपति",
            "subtopics": [
              "चुनाव",
              "शक्तियाँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_pol_7",
            "name": "Prime Minister and Council of Ministers",
            "nameHi": "प्रधानमंत्री एवं मंत्रिपरिषद",
            "subtopics": [
              "कार्य",
              "उत्तरदायित्व"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_geo_1",
            "name": "Physical Geography of India",
            "nameHi": "भारत का भौतिक भूगोल",
            "subtopics": [
              "हिमालय",
              "उत्तरी मैदान",
              "दक्कन का पठार",
              "तटीय मैदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_1",
            "name": "Government Schemes",
            "nameHi": "केंद्र सरकार की योजनाएँ",
            "subtopics": [
              "PM Kisan",
              "PM Awas Yojana",
              "Ayushman Bharat",
              "Jal Jeevan Mission",
              "PM Vishwakarma"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_nat_3",
            "name": "Appointments",
            "nameHi": "महत्वपूर्ण नियुक्तियाँ",
            "subtopics": [
              "राष्ट्रपति",
              "राज्यपाल",
              "मुख्य न्यायाधीश",
              "सेना प्रमुख"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_sports_1",
            "name": "National Sports Events",
            "nameHi": "राष्ट्रीय खेल आयोजन",
            "subtopics": [
              "Khelo India",
              "National Games"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "adeo_livelihood",
        "name": "आजीविका संबंधित योजनाओं की जानकारी (Livelihood)",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "adeo_livelihood_ch_1",
            "name": "राष्ट्रीय ग्रामीण आजीविका मिशन (DAY-NRLM)",
            "topics": [
              {
                "id": "adeo_liv_1",
                "name": "DAY-NRLM Overview & Structure",
                "nameHi": "राष्ट्रीय ग्रामीण आजीविका मिशन (DAY-NRLM) - उद्देश्य, घटक एवं संगठन संरचना",
                "subtopics": [
                  "मिशन की पृष्ठभूमि (SGSY से NRLM पुनर्गठन)",
                  "DAY-NRLM के प्रमुख उद्देश्य एवं बुनियादी सिद्धांत",
                  "राज्य (SRLM), जिला (DMMU) एवं विकासखंड (BMMU) प्रबंधन संरचना",
                  "समावेशी विकास एवं निर्धनतम परिवारों की पहचान (PIP)"
                ],
                "importanceScore": 8
              },
              {
                "id": "adeo_liv_2",
                "name": "Self Help Groups (SHG) & Panchasutra",
                "nameHi": "स्व-सहायता समूह (SHG) गठन, पंचसूत्र एवं आंतरिक ऋण",
                "subtopics": [
                  "स्व-सहायता समूह की संकल्पना एवं गठन के नियम",
                  "पंचसूत्र के पांच नियम (नियमित बैठक, बचत, आंतरिक ऋण, पुनर्भुगतान, लेखांकन)",
                  "समूह के खाता संचालन, नियम एवं प्रस्ताव रजिस्टर",
                  "ग्राम संगठन (VO) एवं संकुल स्तरीय संघ (CLF) की भूमिका"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "adeo_livelihood_ch_2",
            "name": "आजीविका संवर्धन घटक, कृषि एवं सूक्ष्म वित्त",
            "topics": [
              {
                "id": "adeo_liv_3",
                "name": "Livelihood Promotion (Agri & Allied)",
                "nameHi": "कृषि एवं संबद्ध गतिविधियां - पशुपालन, मत्स्य एवं गैर-कृषि आजीविका",
                "subtopics": [
                  "सतत कृषि प्रथाएं, महिला किसान सशक्तिकरण परियोजना (MKSP)",
                  "पशु सखी, पशुपालन, बकरी पालन एवं कुक्कुट पालन संवर्धन",
                  "गैर-कृषि सूक्ष्म उद्यम एवं कारीगर आजीविका क्लस्टर"
                ],
                "importanceScore": 8
              },
              {
                "id": "adeo_liv_4",
                "name": "Microfinance, Funds & Bank Linkage",
                "nameHi": "सूक्ष्म वित्त, चक्रीय निधि (RF), सामुदायिक निवेश कोष (CIF) एवं बैंक लिंकेज",
                "subtopics": [
                  "चक्रीय निधि (Revolving Fund - RF) पात्रता एवं नियम",
                  "सामुदायिक निवेश कोष (Community Investment Fund - CIF) प्रबंधन",
                  "बैंक ऋण लिंकेज (Bank Credit Linkage) एवं ब्याज अनुदान योजना",
                  "सामुदायिक संसाधन व्यक्ति (CRP), बैंक सखी एवं आजीविका मित्र की भूमिका"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "adeo_liv_1",
            "name": "DAY-NRLM Overview & Structure",
            "nameHi": "राष्ट्रीय ग्रामीण आजीविका मिशन (DAY-NRLM) - उद्देश्य, घटक एवं संगठन संरचना",
            "subtopics": [
              "मिशन की पृष्ठभूमि (SGSY से NRLM पुनर्गठन)",
              "DAY-NRLM के प्रमुख उद्देश्य एवं बुनियादी सिद्धांत",
              "राज्य (SRLM), जिला (DMMU) एवं विकासखंड (BMMU) प्रबंधन संरचना",
              "समावेशी विकास एवं निर्धनतम परिवारों की पहचान (PIP)"
            ],
            "importanceScore": 8
          },
          {
            "id": "adeo_liv_2",
            "name": "Self Help Groups (SHG) & Panchasutra",
            "nameHi": "स्व-सहायता समूह (SHG) गठन, पंचसूत्र एवं आंतरिक ऋण",
            "subtopics": [
              "स्व-सहायता समूह की संकल्पना एवं गठन के नियम",
              "पंचसूत्र के पांच नियम (नियमित बैठक, बचत, आंतरिक ऋण, पुनर्भुगतान, लेखांकन)",
              "समूह के खाता संचालन, नियम एवं प्रस्ताव रजिस्टर",
              "ग्राम संगठन (VO) एवं संकुल स्तरीय संघ (CLF) की भूमिका"
            ],
            "importanceScore": 8
          },
          {
            "id": "adeo_liv_3",
            "name": "Livelihood Promotion (Agri & Allied)",
            "nameHi": "कृषि एवं संबद्ध गतिविधियां - पशुपालन, मत्स्य एवं गैर-कृषि आजीविका",
            "subtopics": [
              "सतत कृषि प्रथाएं, महिला किसान सशक्तिकरण परियोजना (MKSP)",
              "पशु सखी, पशुपालन, बकरी पालन एवं कुक्कुट पालन संवर्धन",
              "गैर-कृषि सूक्ष्म उद्यम एवं कारीगर आजीविका क्लस्टर"
            ],
            "importanceScore": 8
          },
          {
            "id": "adeo_liv_4",
            "name": "Microfinance, Funds & Bank Linkage",
            "nameHi": "सूक्ष्म वित्त, चक्रीय निधि (RF), सामुदायिक निवेश कोष (CIF) एवं बैंक लिंकेज",
            "subtopics": [
              "चक्रीय निधि (Revolving Fund - RF) पात्रता एवं नियम",
              "सामुदायिक निवेश कोष (Community Investment Fund - CIF) प्रबंधन",
              "बैंक ऋण लिंकेज (Bank Credit Linkage) एवं ब्याज अनुदान योजना",
              "सामुदायिक संसाधन व्यक्ति (CRP), बैंक सखी एवं आजीविका मित्र की भूमिका"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "adeo_panchayat",
        "name": "पंचायती राज की जानकारी (Panchayati Raj System)",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "adeo_panchayat_ch_1",
            "name": "संवैधानिक प्रावधान एवं छत्तीसगढ़ पंचायती राज अधिनियम 1993",
            "topics": [
              {
                "id": "adeo_panch_1",
                "name": "73rd Constitutional Amendment & Schedule 11",
                "nameHi": "73वां संविधान संशोधन अधिनियम एवं 11वीं अनुसूची के 29 विषय",
                "subtopics": [
                  "73वें संविधान संशोधन की ऐतिहासिक पृष्ठभूमि एवं प्रमुख अनुच्छेद (243 से 243O)",
                  "11वीं अनुसूची में पंचायतों को सौंपे गए 29 विषय",
                  "राज्य वित्त आयोग (Article 243I) एवं राज्य निर्वाचन आयोग (Article 243K)"
                ],
                "importanceScore": 8
              },
              {
                "id": "adeo_panch_2",
                "name": "CG Panchayati Raj Act 1993 Core Sections",
                "nameHi": "छत्तीसगढ़ पंचायती राज अधिनियम 1993 की मुख्य धाराएं एवं अध्याय",
                "subtopics": [
                  "अधिनियम का लागू होना एवं महत्वपूर्ण परिभाषाएं",
                  "त्रिस्तरीय पंचायत प्रणाली (ग्राम, जनपद एवं जिला पंचायत) का गठन",
                  "सीटों का आरक्षण (महिला, अनुसूचित जाति, जनजाति, अन्य पिछड़ा वर्ग)",
                  "पंचायतों का कार्यकाल, विघटन एवं अविश्वास प्रस्ताव संबंधी नियम"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "adeo_panchayat_ch_2",
            "name": "पंचायत संरचना, ग्राम सभा एवं शक्तियां",
            "topics": [
              {
                "id": "adeo_panch_3",
                "name": "Gram Sabha Structure, Quorum & PESA Rules",
                "nameHi": "ग्राम सभा - संरचना, बैठकें, गणपूर्ति (Quorum) एवं पेसा (PESA) नियम",
                "subtopics": [
                  "ग्राम सभा की सदस्यता एवं वार्षिक अनिवार्य बैठकें",
                  "ग्राम सभा की गणपूर्ति (Quorum) एवं महिला उपस्थिति अनिवार्यता",
                  "ग्राम सभा के कार्य, अधिकार एवं निगरानी शक्तियां",
                  "पेसा अधिनियम 1996 (PESA) एवं छत्तीसगढ़ पेसा नियम 2022 के तहत ग्राम सभा के विशेष अधिकार"
                ],
                "importanceScore": 8
              },
              {
                "id": "adeo_panch_4",
                "name": "Standing Committees & Panchayat Finances",
                "nameHi": "पंचायतों की स्थायी समितियां, वित्तीय स्रोत एवं करारोपण",
                "subtopics": [
                  "ग्राम पंचायत, जनपद एवं जिला पंचायत की स्थायी समितियां (सामान्य प्रशासन, निर्माण, शिक्षा, स्वास्थ्य)",
                  "सरपंच, उपसरपंच, सचिव एवं मुख्य कार्यपालन अधिकारी (CEO) के अधिकार व दायित्व",
                  "पंचायतों के करारोपण अधिकार एवं आंतरिक आय के स्रोत",
                  "केंद्रीय एवं राज्य वित्त आयोग अनुदान"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "adeo_panch_1",
            "name": "73rd Constitutional Amendment & Schedule 11",
            "nameHi": "73वां संविधान संशोधन अधिनियम एवं 11वीं अनुसूची के 29 विषय",
            "subtopics": [
              "73वें संविधान संशोधन की ऐतिहासिक पृष्ठभूमि एवं प्रमुख अनुच्छेद (243 से 243O)",
              "11वीं अनुसूची में पंचायतों को सौंपे गए 29 विषय",
              "राज्य वित्त आयोग (Article 243I) एवं राज्य निर्वाचन आयोग (Article 243K)"
            ],
            "importanceScore": 8
          },
          {
            "id": "adeo_panch_2",
            "name": "CG Panchayati Raj Act 1993 Core Sections",
            "nameHi": "छत्तीसगढ़ पंचायती राज अधिनियम 1993 की मुख्य धाराएं एवं अध्याय",
            "subtopics": [
              "अधिनियम का लागू होना एवं महत्वपूर्ण परिभाषाएं",
              "त्रिस्तरीय पंचायत प्रणाली (ग्राम, जनपद एवं जिला पंचायत) का गठन",
              "सीटों का आरक्षण (महिला, अनुसूचित जाति, जनजाति, अन्य पिछड़ा वर्ग)",
              "पंचायतों का कार्यकाल, विघटन एवं अविश्वास प्रस्ताव संबंधी नियम"
            ],
            "importanceScore": 8
          },
          {
            "id": "adeo_panch_3",
            "name": "Gram Sabha Structure, Quorum & PESA Rules",
            "nameHi": "ग्राम सभा - संरचना, बैठकें, गणपूर्ति (Quorum) एवं पेसा (PESA) नियम",
            "subtopics": [
              "ग्राम सभा की सदस्यता एवं वार्षिक अनिवार्य बैठकें",
              "ग्राम सभा की गणपूर्ति (Quorum) एवं महिला उपस्थिति अनिवार्यता",
              "ग्राम सभा के कार्य, अधिकार एवं निगरानी शक्तियां",
              "पेसा अधिनियम 1996 (PESA) एवं छत्तीसगढ़ पेसा नियम 2022 के तहत ग्राम सभा के विशेष अधिकार"
            ],
            "importanceScore": 8
          },
          {
            "id": "adeo_panch_4",
            "name": "Standing Committees & Panchayat Finances",
            "nameHi": "पंचायतों की स्थायी समितियां, वित्तीय स्रोत एवं करारोपण",
            "subtopics": [
              "ग्राम पंचायत, जनपद एवं जिला पंचायत की स्थायी समितियां (सामान्य प्रशासन, निर्माण, शिक्षा, स्वास्थ्य)",
              "सरपंच, उपसरपंच, सचिव एवं मुख्य कार्यपालन अधिकारी (CEO) के अधिकार व दायित्व",
              "पंचायतों के करारोपण अधिकार एवं आंतरिक आय के स्रोत",
              "केंद्रीय एवं राज्य वित्त आयोग अनुदान"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "adeo_rural_dev",
        "name": "ग्रामीण विकास की प्रमुख योजनाएं (Rural Development Schemes)",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "adeo_rural_dev_ch_1",
            "name": "मनरेगा (MGNREGA) विस्तृत अध्ययन",
            "topics": [
              {
                "id": "adeo_rd_1",
                "name": "MGNREGA Scheme Objectives & Provisions",
                "nameHi": "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (MGNREGA) के प्रावधान",
                "subtopics": [
                  "अधिनियम के मूल उद्देश्य एवं 100 दिवस गारंटीशुदा अकुशल रोजगार",
                  "जॉब कार्ड पंजीकरण एवं 15 दिवस में रोजगार अधिकार",
                  "बेरोजगारी भत्ता नियम एवं समय पर मजदूरी भुगतान (15 दिवस) प्रावधान",
                  "सामग्री एवं मजदूरी अनुपात (60:40) एवं स्वीकार्य कार्य सूची"
                ],
                "importanceScore": 8
              },
              {
                "id": "adeo_rd_2",
                "name": "MGNREGA Planning & Social Audit",
                "nameHi": "मनरेगा कार्य योजना, ग्राम सभा स्वीकृति एवं सामाजिक अंकेक्षण (Social Audit)",
                "subtopics": [
                  "वार्षिक कार्य योजना (Labour Budget) तैयार करने में ग्राम सभा की भूमिका",
                  "सामाजिक अंकेक्षण (Social Audit) की प्रक्रिया एवं सामाजिक अंकेक्षक के कर्तव्य",
                  "मनरेगा लोकपाल (Ombudsman) एवं शिकायत निवारण प्रणाली"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "adeo_rural_dev_ch_2",
            "name": "प्रमुख ग्रामीण आवास, सड़क एवं स्वच्छता योजनाएं",
            "topics": [
              {
                "id": "adeo_rd_3",
                "name": "PMAY-G, PMGSY & SBM-G Schemes",
                "nameHi": "प्रधानमंत्री आवास योजना-ग्रामीण, ग्राम सड़क योजना एवं स्वच्छ भारत मिशन",
                "subtopics": [
                  "प्रधानमंत्री आवास योजना-ग्रामीण (PMAY-G) - SECC 2011/आवास प्लस, चयन व वित्तीय सहायता",
                  "प्रधानमंत्री ग्राम सड़क योजना (PMGSY) - बारहमासी सड़क संपर्क मानक",
                  "स्वच्छ भारत मिशन-ग्रामीण (SBM-G) - ओडीएफ प्लस, ठोस एवं तरल अपशिष्ट प्रबंधन (SLWM)",
                  "जल जीवन मिशन (हर घर जल) एवं ग्रामीण पेयजल प्रबंधन"
                ],
                "importanceScore": 8
              },
              {
                "id": "adeo_rd_4",
                "name": "SAGY & Rurban Mission",
                "nameHi": "सांसद आदर्श ग्राम योजना एवं श्यामा प्रसाद मुखर्जी रूर्बन मिशन (SPMRM)",
                "subtopics": [
                  "सांसद आदर्श ग्राम योजना (SAGY) के उद्देश्य एवं ग्राम विकास योजना",
                  "श्यामा प्रसाद मुखर्जी रूर्बन मिशन (SPMRM) के तहत ग्रामीण क्लस्टर विकास"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "adeo_rd_1",
            "name": "MGNREGA Scheme Objectives & Provisions",
            "nameHi": "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (MGNREGA) के प्रावधान",
            "subtopics": [
              "अधिनियम के मूल उद्देश्य एवं 100 दिवस गारंटीशुदा अकुशल रोजगार",
              "जॉब कार्ड पंजीकरण एवं 15 दिवस में रोजगार अधिकार",
              "बेरोजगारी भत्ता नियम एवं समय पर मजदूरी भुगतान (15 दिवस) प्रावधान",
              "सामग्री एवं मजदूरी अनुपात (60:40) एवं स्वीकार्य कार्य सूची"
            ],
            "importanceScore": 8
          },
          {
            "id": "adeo_rd_2",
            "name": "MGNREGA Planning & Social Audit",
            "nameHi": "मनरेगा कार्य योजना, ग्राम सभा स्वीकृति एवं सामाजिक अंकेक्षण (Social Audit)",
            "subtopics": [
              "वार्षिक कार्य योजना (Labour Budget) तैयार करने में ग्राम सभा की भूमिका",
              "सामाजिक अंकेक्षण (Social Audit) की प्रक्रिया एवं सामाजिक अंकेक्षक के कर्तव्य",
              "मनरेगा लोकपाल (Ombudsman) एवं शिकायत निवारण प्रणाली"
            ],
            "importanceScore": 8
          },
          {
            "id": "adeo_rd_3",
            "name": "PMAY-G, PMGSY & SBM-G Schemes",
            "nameHi": "प्रधानमंत्री आवास योजना-ग्रामीण, ग्राम सड़क योजना एवं स्वच्छ भारत मिशन",
            "subtopics": [
              "प्रधानमंत्री आवास योजना-ग्रामीण (PMAY-G) - SECC 2011/आवास प्लस, चयन व वित्तीय सहायता",
              "प्रधानमंत्री ग्राम सड़क योजना (PMGSY) - बारहमासी सड़क संपर्क मानक",
              "स्वच्छ भारत मिशन-ग्रामीण (SBM-G) - ओडीएफ प्लस, ठोस एवं तरल अपशिष्ट प्रबंधन (SLWM)",
              "जल जीवन मिशन (हर घर जल) एवं ग्रामीण पेयजल प्रबंधन"
            ],
            "importanceScore": 8
          },
          {
            "id": "adeo_rd_4",
            "name": "SAGY & Rurban Mission",
            "nameHi": "सांसद आदर्श ग्राम योजना एवं श्यामा प्रसाद मुखर्जी रूर्बन मिशन (SPMRM)",
            "subtopics": [
              "सांसद आदर्श ग्राम योजना (SAGY) के उद्देश्य एवं ग्राम विकास योजना",
              "श्यामा प्रसाद मुखर्जी रूर्बन मिशन (SPMRM) के तहत ग्रामीण क्लस्टर विकास"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "adeo_hindi",
        "name": "सामान्य हिंदी (General Hindi)",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "adeo_hindi_ch_1",
            "name": "वर्णमाला, वर्तनी एवं संधि-समास",
            "topics": [
              {
                "id": "hin_varn_1",
                "name": "Hindi Alphabet",
                "nameHi": "हिंदी वर्णमाला",
                "subtopics": [
                  "स्वर",
                  "व्यंजन",
                  "अयोगवाह"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_varn_2",
                "name": "Vowel and Consonant Classification",
                "nameHi": "स्वर एवं व्यंजन वर्गीकरण",
                "subtopics": [
                  "ह्रस्व",
                  "दीर्घ",
                  "स्पर्श",
                  "ऊष्म"
                ],
                "importanceScore": 8
              },
              {
                "id": "hin_varn_3",
                "name": "Pronunciation and Phonetics",
                "nameHi": "उच्चारण एवं ध्वनि",
                "subtopics": [
                  "उच्चारण नियम",
                  "ध्वनि परिवर्तन"
                ],
                "importanceScore": 7
              },
              {
                "id": "hin_sandhi_1",
                "name": "Swar Sandhi",
                "nameHi": "स्वर संधि",
                "subtopics": [
                  "दीर्घ",
                  "गुण",
                  "वृद्धि",
                  "यण"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sandhi_2",
                "name": "Vyanjan Sandhi",
                "nameHi": "व्यंजन संधि",
                "subtopics": [
                  "व्यंजन परिवर्तन"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_samas_1",
                "name": "Tatpurush Samas",
                "nameHi": "तत्पुरुष समास",
                "subtopics": [
                  "कर्म",
                  "करण",
                  "सम्प्रदान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_samas_2",
                "name": "Dwandwa Samas",
                "nameHi": "द्वंद्व समास",
                "subtopics": [
                  "समाहार",
                  "इतरेतर"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "adeo_hindi_ch_2",
            "name": "शब्द विचार, रचना एवं व्याकरण",
            "topics": [
              {
                "id": "hin_up_1",
                "name": "Prefixes",
                "nameHi": "उपसर्ग",
                "subtopics": [
                  "संस्कृत उपसर्ग",
                  "हिंदी उपसर्ग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_up_2",
                "name": "Suffixes",
                "nameHi": "प्रत्यय",
                "subtopics": [
                  "कृत प्रत्यय",
                  "तद्धित प्रत्यय"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_shabd_1",
                "name": "Tatsam and Tadbhav",
                "nameHi": "तत्सम एवं तद्भव",
                "subtopics": [
                  "शब्द पहचान"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_shabd_2",
                "name": "Deshaj and Videshaj Words",
                "nameHi": "देशज एवं विदेशी शब्द",
                "subtopics": [
                  "अरबी",
                  "फारसी",
                  "अंग्रेजी मूल"
                ],
                "importanceScore": 8
              },
              {
                "id": "hin_gram_1",
                "name": "Noun",
                "nameHi": "संज्ञा",
                "subtopics": [
                  "भेद",
                  "उपयोग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_gram_2",
                "name": "Pronoun",
                "nameHi": "सर्वनाम",
                "subtopics": [
                  "भेद"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_gram_3",
                "name": "Adjective",
                "nameHi": "विशेषण",
                "subtopics": [
                  "भेद"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_gram_4",
                "name": "Verb",
                "nameHi": "क्रिया",
                "subtopics": [
                  "सकर्मक",
                  "अकर्मक"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "adeo_hindi_ch_3",
            "name": "शब्द भंडार, मुहावरे एवं वाक्य शुद्धि",
            "topics": [
              {
                "id": "hin_vocab_1",
                "name": "Synonyms",
                "nameHi": "पर्यायवाची शब्द",
                "subtopics": [
                  "एकार्थी",
                  "अनेकार्थी पर्याय"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_2",
                "name": "Antonyms",
                "nameHi": "विलोम शब्द",
                "subtopics": [
                  "तत्सम विलोम",
                  "प्रचलित विलोम"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_3",
                "name": "One Word Substitution",
                "nameHi": "अनेक शब्दों के लिए एक शब्द",
                "subtopics": [
                  "प्रशासनिक",
                  "साहित्यिक"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_vocab_4",
                "name": "Homonyms",
                "nameHi": "अनेकार्थी शब्द",
                "subtopics": [
                  "अर्थ भेद"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_idiom_1",
                "name": "Idioms",
                "nameHi": "मुहावरे",
                "subtopics": [
                  "अर्थ",
                  "प्रयोग"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_idiom_2",
                "name": "Proverbs",
                "nameHi": "लोकोक्तियाँ",
                "subtopics": [
                  "अर्थ",
                  "संदर्भ"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sent_1",
                "name": "Sentence Correction",
                "nameHi": "वाक्य शुद्धि",
                "subtopics": [
                  "व्याकरणिक त्रुटि",
                  "अर्थगत त्रुटि"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_sent_2",
                "name": "Spelling Correction",
                "nameHi": "वर्तनी शुद्धि",
                "subtopics": [
                  "सामान्य त्रुटियाँ"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_comp_1",
                "name": "Reading Comprehension",
                "nameHi": "अपठित गद्यांश",
                "subtopics": [
                  "तथ्यात्मक प्रश्न",
                  "विश्लेषणात्मक प्रश्न"
                ],
                "importanceScore": 10
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "hin_varn_1",
            "name": "Hindi Alphabet",
            "nameHi": "हिंदी वर्णमाला",
            "subtopics": [
              "स्वर",
              "व्यंजन",
              "अयोगवाह"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_varn_2",
            "name": "Vowel and Consonant Classification",
            "nameHi": "स्वर एवं व्यंजन वर्गीकरण",
            "subtopics": [
              "ह्रस्व",
              "दीर्घ",
              "स्पर्श",
              "ऊष्म"
            ],
            "importanceScore": 8
          },
          {
            "id": "hin_varn_3",
            "name": "Pronunciation and Phonetics",
            "nameHi": "उच्चारण एवं ध्वनि",
            "subtopics": [
              "उच्चारण नियम",
              "ध्वनि परिवर्तन"
            ],
            "importanceScore": 7
          },
          {
            "id": "hin_sandhi_1",
            "name": "Swar Sandhi",
            "nameHi": "स्वर संधि",
            "subtopics": [
              "दीर्घ",
              "गुण",
              "वृद्धि",
              "यण"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sandhi_2",
            "name": "Vyanjan Sandhi",
            "nameHi": "व्यंजन संधि",
            "subtopics": [
              "व्यंजन परिवर्तन"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_samas_1",
            "name": "Tatpurush Samas",
            "nameHi": "तत्पुरुष समास",
            "subtopics": [
              "कर्म",
              "करण",
              "सम्प्रदान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_samas_2",
            "name": "Dwandwa Samas",
            "nameHi": "द्वंद्व समास",
            "subtopics": [
              "समाहार",
              "इतरेतर"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_up_1",
            "name": "Prefixes",
            "nameHi": "उपसर्ग",
            "subtopics": [
              "संस्कृत उपसर्ग",
              "हिंदी उपसर्ग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_up_2",
            "name": "Suffixes",
            "nameHi": "प्रत्यय",
            "subtopics": [
              "कृत प्रत्यय",
              "तद्धित प्रत्यय"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_shabd_1",
            "name": "Tatsam and Tadbhav",
            "nameHi": "तत्सम एवं तद्भव",
            "subtopics": [
              "शब्द पहचान"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_shabd_2",
            "name": "Deshaj and Videshaj Words",
            "nameHi": "देशज एवं विदेशी शब्द",
            "subtopics": [
              "अरबी",
              "फारसी",
              "अंग्रेजी मूल"
            ],
            "importanceScore": 8
          },
          {
            "id": "hin_gram_1",
            "name": "Noun",
            "nameHi": "संज्ञा",
            "subtopics": [
              "भेद",
              "उपयोग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_gram_2",
            "name": "Pronoun",
            "nameHi": "सर्वनाम",
            "subtopics": [
              "भेद"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_gram_3",
            "name": "Adjective",
            "nameHi": "विशेषण",
            "subtopics": [
              "भेद"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_gram_4",
            "name": "Verb",
            "nameHi": "क्रिया",
            "subtopics": [
              "सकर्मक",
              "अकर्मक"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_1",
            "name": "Synonyms",
            "nameHi": "पर्यायवाची शब्द",
            "subtopics": [
              "एकार्थी",
              "अनेकार्थी पर्याय"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_2",
            "name": "Antonyms",
            "nameHi": "विलोम शब्द",
            "subtopics": [
              "तत्सम विलोम",
              "प्रचलित विलोम"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_3",
            "name": "One Word Substitution",
            "nameHi": "अनेक शब्दों के लिए एक शब्द",
            "subtopics": [
              "प्रशासनिक",
              "साहित्यिक"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_vocab_4",
            "name": "Homonyms",
            "nameHi": "अनेकार्थी शब्द",
            "subtopics": [
              "अर्थ भेद"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_idiom_1",
            "name": "Idioms",
            "nameHi": "मुहावरे",
            "subtopics": [
              "अर्थ",
              "प्रयोग"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_idiom_2",
            "name": "Proverbs",
            "nameHi": "लोकोक्तियाँ",
            "subtopics": [
              "अर्थ",
              "संदर्भ"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sent_1",
            "name": "Sentence Correction",
            "nameHi": "वाक्य शुद्धि",
            "subtopics": [
              "व्याकरणिक त्रुटि",
              "अर्थगत त्रुटि"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sent_2",
            "name": "Spelling Correction",
            "nameHi": "वर्तनी शुद्धि",
            "subtopics": [
              "सामान्य त्रुटियाँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_comp_1",
            "name": "Reading Comprehension",
            "nameHi": "अपठित गद्यांश",
            "subtopics": [
              "तथ्यात्मक प्रश्न",
              "विश्लेषणात्मक प्रश्न"
            ],
            "importanceScore": 10
          }
        ]
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.CGPSC_EXAM_DATA = CGPSC_EXAM_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CGPSC_EXAM_DATA };
}
