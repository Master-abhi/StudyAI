/* ═══════════════════════════════════════════════════════════════
   CG Guru — CG VYAPAM Syllabus Data (Official & Verified)
   All major Chhattisgarh Professional Examination Board exams
   ═══════════════════════════════════════════════════════════════ */

const SYLLABUS_DATA = {
  "cgv_patwari": {
    "name": "Patwari / RI",
    "fullName": "CGVYAPAM — Patwari & Revenue Inspector Exam",
    "icon": "🏘️",
    "category": "administrative",
    "description": "राजस्व निरीक्षक (RI) एवं पटवारी भर्ती परीक्षा — आधिकारिक 150 अंकों का विस्तृत पाठ्यक्रम",
    "eligibility": "12th Pass + DCA / PGDCA / Computer Diploma",
    "pattern": {
      "totalMarks": 150,
      "time": "3 Hours",
      "type": "Objective MCQ (150 Questions, Negative Marking 1/4th)",
      "papers": [
        {
          "paper": "कंप्यूटर संबंधी सामान्य ज्ञान",
          "marks": 20
        },
        {
          "paper": "सामान्य हिंदी",
          "marks": 10
        },
        {
          "paper": "General English",
          "marks": 10
        },
        {
          "paper": "गणित (Mathematics)",
          "marks": 30
        },
        {
          "paper": "सामान्य मानसिक योग्यता (Reasoning)",
          "marks": 15
        },
        {
          "paper": "सामान्य ज्ञान (India GK)",
          "marks": 35
        },
        {
          "paper": "समसामयिक घटनाएं, खेलकूद एवं देश-विदेश",
          "marks": 15
        },
        {
          "paper": "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
          "marks": 15
        }
      ]
    },
    "subjects": [
      {
        "id": "pat_comp",
        "name": "कंप्यूटर संबंधी सामान्य ज्ञान",
        "weightage": 20,
        "importance": "Highest",
        "pyqFrequency": "Very High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "pat_comp_ch_1",
            "name": "कंप्यूटर की मूल अवधारणाएँ",
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
                "id": "comp_basic_2",
                "name": "History of Computers",
                "nameHi": "कंप्यूटर का इतिहास",
                "subtopics": [
                  "Abacus",
                  "Charles Babbage",
                  "ENIAC"
                ],
                "importanceScore": 8
              },
              {
                "id": "comp_basic_3",
                "name": "Generations of Computers",
                "nameHi": "कंप्यूटर की पीढ़ियाँ",
                "subtopics": [
                  "First Generation",
                  "Second Generation",
                  "Third Generation",
                  "Fourth Generation",
                  "Fifth Generation"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_basic_4",
                "name": "Types of Computers",
                "nameHi": "कंप्यूटर के प्रकार",
                "subtopics": [
                  "Micro Computer",
                  "Mini Computer",
                  "Mainframe",
                  "Super Computer"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "pat_comp_ch_2",
            "name": "हार्डवेयर एवं मेमोरी",
            "topics": [
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
                "id": "comp_hw_2",
                "name": "Output Devices",
                "nameHi": "आउटपुट डिवाइस",
                "subtopics": [
                  "Monitor",
                  "Printer",
                  "Plotter",
                  "Speaker"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_hw_3",
                "name": "CPU and Memory",
                "nameHi": "CPU एवं मेमोरी",
                "subtopics": [
                  "ALU",
                  "CU",
                  "Registers",
                  "Cache Memory"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_hw_4",
                "name": "Storage Devices",
                "nameHi": "संग्रहण उपकरण",
                "subtopics": [
                  "Hard Disk",
                  "SSD",
                  "CD/DVD",
                  "Pen Drive"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "pat_comp_ch_3",
            "name": "सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम",
            "topics": [
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
                "id": "comp_sw_2",
                "name": "Operating System",
                "nameHi": "ऑपरेटिंग सिस्टम",
                "subtopics": [
                  "Windows",
                  "Linux",
                  "Android"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_sw_3",
                "name": "Functions of Operating System",
                "nameHi": "ऑपरेटिंग सिस्टम के कार्य",
                "subtopics": [
                  "Memory Management",
                  "Process Management",
                  "File Management"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "pat_comp_ch_4",
            "name": "MS Office टूल्स",
            "topics": [
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
                "id": "comp_office_3",
                "name": "MS PowerPoint",
                "nameHi": "एमएस पावरपॉइंट",
                "subtopics": [
                  "Slides",
                  "Animations",
                  "Presentation"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "pat_comp_ch_5",
            "name": "इंटरनेट, ईमेल एवं नेटवर्किंग",
            "topics": [
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
              },
              {
                "id": "comp_net_4",
                "name": "Email",
                "nameHi": "ई-मेल",
                "subtopics": [
                  "Email Structure",
                  "CC",
                  "BCC",
                  "Attachments"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "pat_comp_ch_6",
            "name": "साइबर सुरक्षा एवं एंटीवायरस",
            "topics": [
              {
                "id": "comp_cyber_1",
                "name": "Cyber Security Basics",
                "nameHi": "साइबर सुरक्षा की मूल बातें",
                "subtopics": [
                  "Cyber Threats",
                  "Cyber Attacks"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_cyber_2",
                "name": "Malware",
                "nameHi": "मैलवेयर",
                "subtopics": [
                  "Virus",
                  "Worm",
                  "Trojan",
                  "Ransomware"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_cyber_3",
                "name": "Cyber Crimes",
                "nameHi": "साइबर अपराध",
                "subtopics": [
                  "Phishing",
                  "Identity Theft",
                  "Online Fraud"
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
            "id": "comp_basic_2",
            "name": "History of Computers",
            "nameHi": "कंप्यूटर का इतिहास",
            "subtopics": [
              "Abacus",
              "Charles Babbage",
              "ENIAC"
            ],
            "importanceScore": 8
          },
          {
            "id": "comp_basic_3",
            "name": "Generations of Computers",
            "nameHi": "कंप्यूटर की पीढ़ियाँ",
            "subtopics": [
              "First Generation",
              "Second Generation",
              "Third Generation",
              "Fourth Generation",
              "Fifth Generation"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_basic_4",
            "name": "Types of Computers",
            "nameHi": "कंप्यूटर के प्रकार",
            "subtopics": [
              "Micro Computer",
              "Mini Computer",
              "Mainframe",
              "Super Computer"
            ],
            "importanceScore": 9
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
            "id": "comp_hw_2",
            "name": "Output Devices",
            "nameHi": "आउटपुट डिवाइस",
            "subtopics": [
              "Monitor",
              "Printer",
              "Plotter",
              "Speaker"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_hw_3",
            "name": "CPU and Memory",
            "nameHi": "CPU एवं मेमोरी",
            "subtopics": [
              "ALU",
              "CU",
              "Registers",
              "Cache Memory"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_hw_4",
            "name": "Storage Devices",
            "nameHi": "संग्रहण उपकरण",
            "subtopics": [
              "Hard Disk",
              "SSD",
              "CD/DVD",
              "Pen Drive"
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
            "id": "comp_sw_2",
            "name": "Operating System",
            "nameHi": "ऑपरेटिंग सिस्टम",
            "subtopics": [
              "Windows",
              "Linux",
              "Android"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_sw_3",
            "name": "Functions of Operating System",
            "nameHi": "ऑपरेटिंग सिस्टम के कार्य",
            "subtopics": [
              "Memory Management",
              "Process Management",
              "File Management"
            ],
            "importanceScore": 9
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
            "id": "comp_office_3",
            "name": "MS PowerPoint",
            "nameHi": "एमएस पावरपॉइंट",
            "subtopics": [
              "Slides",
              "Animations",
              "Presentation"
            ],
            "importanceScore": 9
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
          },
          {
            "id": "comp_net_4",
            "name": "Email",
            "nameHi": "ई-मेल",
            "subtopics": [
              "Email Structure",
              "CC",
              "BCC",
              "Attachments"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_cyber_1",
            "name": "Cyber Security Basics",
            "nameHi": "साइबर सुरक्षा की मूल बातें",
            "subtopics": [
              "Cyber Threats",
              "Cyber Attacks"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_cyber_2",
            "name": "Malware",
            "nameHi": "मैलवेयर",
            "subtopics": [
              "Virus",
              "Worm",
              "Trojan",
              "Ransomware"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_cyber_3",
            "name": "Cyber Crimes",
            "nameHi": "साइबर अपराध",
            "subtopics": [
              "Phishing",
              "Identity Theft",
              "Online Fraud"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "pat_hindi",
        "name": "सामान्य हिंदी भाषा",
        "weightage": 10,
        "importance": "High",
        "pyqFrequency": "High (10 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "pat_hindi_ch_1",
            "name": "वर्णमाला एवं वर्तनी",
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
              }
            ]
          },
          {
            "id": "pat_hindi_ch_2",
            "name": "संधि एवं समास",
            "topics": [
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
            "id": "pat_hindi_ch_3",
            "name": "शब्द विचार एवं व्याकरण",
            "topics": [
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
              }
            ]
          },
          {
            "id": "pat_hindi_ch_4",
            "name": "शब्द भंडार एवं मुहावरे",
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
        "id": "pat_english",
        "name": "General English",
        "weightage": 10,
        "importance": "High",
        "pyqFrequency": "High (10 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "pat_english_ch_1",
            "name": "English Grammar",
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
              }
            ]
          },
          {
            "id": "pat_english_ch_2",
            "name": "Vocabulary & Usage",
            "topics": [
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
        "id": "pat_maths",
        "name": "गणित (Mathematics)",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "pat_maths_ch_1",
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
            "id": "pat_maths_ch_2",
            "name": "व्यावसायिक अंकगणित",
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
            "id": "pat_maths_ch_3",
            "name": "बीजगणित",
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
                "id": "math_alg_2",
                "name": "Linear Equations",
                "nameHi": "रैखिक समीकरण",
                "subtopics": [
                  "One Variable",
                  "Two Variables"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "pat_maths_ch_4",
            "name": "रेखागणित एवं क्षेत्रमिति",
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
            "id": "math_alg_2",
            "name": "Linear Equations",
            "nameHi": "रैखिक समीकरण",
            "subtopics": [
              "One Variable",
              "Two Variables"
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
          }
        ]
      },
      {
        "id": "pat_reasoning",
        "name": "सामान्य मानसिक योग्यता (Reasoning)",
        "weightage": 15,
        "importance": "High",
        "pyqFrequency": "High (15 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "pat_reasoning_ch_1",
            "name": "शाब्दिक तर्कशक्ति",
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
              }
            ]
          },
          {
            "id": "pat_reasoning_ch_2",
            "name": "अशाब्दिक एवं विश्लेषणात्मक योग्यता",
            "topics": [
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
      },
      {
        "id": "pat_gk_india",
        "name": "सामान्य ज्ञान (India GK)",
        "weightage": 35,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (35 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "pat_gk_india_ch_1",
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
              }
            ]
          },
          {
            "id": "pat_gk_india_ch_2",
            "name": "भारतीय राजव्यवस्था एवं संविधान",
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
            "id": "pat_gk_india_ch_3",
            "name": "भारत का भूगोल",
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
              }
            ]
          },
          {
            "id": "pat_gk_india_ch_4",
            "name": "भारतीय अर्थव्यवस्था",
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
              }
            ]
          },
          {
            "id": "pat_gk_india_ch_5",
            "name": "सामान्य विज्ञान",
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
                "id": "phy_2",
                "name": "Motion",
                "nameHi": "गति",
                "subtopics": [
                  "Speed",
                  "Velocity",
                  "Acceleration"
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
            "id": "phy_2",
            "name": "Motion",
            "nameHi": "गति",
            "subtopics": [
              "Speed",
              "Velocity",
              "Acceleration"
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
          }
        ]
      },
      {
        "id": "pat_current",
        "name": "समसामयिक घटनाएं एवं खेलकूद",
        "weightage": 15,
        "importance": "High",
        "pyqFrequency": "High (15 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "pat_current_ch_1",
            "name": "राष्ट्रीय एवं अंतर्राष्ट्रीय समसामयिकी",
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
              }
            ]
          },
          {
            "id": "pat_current_ch_2",
            "name": "खेलकूद, पुरस्कार एवं महत्वपूर्ण दिवस",
            "topics": [
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
                "id": "ca_sports_3",
                "name": "Sports Awards",
                "nameHi": "खेल पुरस्कार",
                "subtopics": [
                  "Major Dhyan Chand Award",
                  "Arjuna Award",
                  "Dronacharya Award"
                ],
                "importanceScore": 9
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
              },
              {
                "id": "ca_day_1",
                "name": "National Important Days",
                "nameHi": "राष्ट्रीय महत्वपूर्ण दिवस",
                "subtopics": [
                  "National Youth Day",
                  "Constitution Day"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
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
            "id": "ca_sports_3",
            "name": "Sports Awards",
            "nameHi": "खेल पुरस्कार",
            "subtopics": [
              "Major Dhyan Chand Award",
              "Arjuna Award",
              "Dronacharya Award"
            ],
            "importanceScore": 9
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
          },
          {
            "id": "ca_day_1",
            "name": "National Important Days",
            "nameHi": "राष्ट्रीय महत्वपूर्ण दिवस",
            "subtopics": [
              "National Youth Day",
              "Constitution Day"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "pat_cg_gk",
        "name": "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        "weightage": 15,
        "importance": "High",
        "pyqFrequency": "High (15 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "pat_cg_gk_ch_1",
            "name": "छत्तीसगढ़ का इतिहास",
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
              }
            ]
          },
          {
            "id": "pat_cg_gk_ch_2",
            "name": "छत्तीसगढ़ का भूगोल एवं नदियां",
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
              }
            ]
          },
          {
            "id": "pat_cg_gk_ch_3",
            "name": "जनजातियां, कला एवं संस्कृति",
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
                "id": "cg_cul_8",
                "name": "Important Temples",
                "nameHi": "प्रमुख मंदिर",
                "subtopics": [
                  "बम्लेश्वरी",
                  "लक्ष्मण मंदिर",
                  "भोरमदेव"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "pat_cg_gk_ch_4",
            "name": "अर्थव्यवस्था, प्रशासन एवं योजनाएं",
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
          }
        ]
      }
    ]
  },
  "cgv_police": {
    "name": "Police Constable / GD",
    "fullName": "CG Police Constable (GD / Trade / Driver) Recruitment Exam",
    "icon": "👮",
    "category": "police",
    "description": "छत्तीसगढ़ पुलिस आरक्षक (GD/ट्रेड/चालक) लिखित परीक्षा — 100 अंक",
    "eligibility": "10th / 12th Pass (8th Pass for ST)",
    "pattern": {
      "totalMarks": 100,
      "time": "2 Hours",
      "type": "Objective MCQ (100 Questions, 100 Marks)",
      "papers": [
        {
          "paper": "सामान्य ज्ञान एवं छत्तीसगढ़ सामान्य ज्ञान",
          "marks": 50
        },
        {
          "paper": "सामान्य मानसिक योग्यता (रीजनिंग)",
          "marks": 25
        },
        {
          "paper": "अंकगणित (Numerical Ability)",
          "marks": 25
        }
      ]
    },
    "subjects": [
      {
        "id": "pol_gk",
        "name": "सामान्य ज्ञान एवं छत्तीसगढ़ सामान्य ज्ञान",
        "weightage": 50,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (50 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "pol_gk_ch_1",
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
            "id": "pol_gk_ch_2",
            "name": "छत्तीसगढ़ का भूगोल, नदियां व वन संपदा",
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
              }
            ]
          },
          {
            "id": "pol_gk_ch_3",
            "name": "छत्तीसगढ़ की जनजातियां, तीज-त्योहार व संस्कृति",
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
              }
            ]
          },
          {
            "id": "pol_gk_ch_4",
            "name": "छत्तीसगढ़ प्रशासन, जिले व योजनाएं",
            "topics": [
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
              }
            ]
          },
          {
            "id": "pol_gk_ch_5",
            "name": "भारत का इतिहास एवं संविधान",
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
              }
            ]
          },
          {
            "id": "pol_gk_ch_6",
            "name": "भारत का भूगोल एवं सामान्य विज्ञान",
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
              }
            ]
          },
          {
            "id": "pol_gk_ch_7",
            "name": "समसामयिक घटनाएं एवं खेलकूद",
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
              },
              {
                "id": "ca_sports_3",
                "name": "Sports Awards",
                "nameHi": "खेल पुरस्कार",
                "subtopics": [
                  "Major Dhyan Chand Award",
                  "Arjuna Award",
                  "Dronacharya Award"
                ],
                "importanceScore": 9
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
          },
          {
            "id": "ca_sports_3",
            "name": "Sports Awards",
            "nameHi": "खेल पुरस्कार",
            "subtopics": [
              "Major Dhyan Chand Award",
              "Arjuna Award",
              "Dronacharya Award"
            ],
            "importanceScore": 9
          }
        ]
      },
      {
        "id": "pol_reasoning",
        "name": "सामान्य मानसिक योग्यता एवं रीजनिंग",
        "weightage": 25,
        "importance": "High",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "pol_reasoning_ch_1",
            "name": "श्रृंखला एवं सादृश्यता परीक्षण",
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
              }
            ]
          },
          {
            "id": "pol_reasoning_ch_2",
            "name": "कोडिंग-डिकोडिंग एवं रक्त संबंध",
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
                "id": "reas_cd_2",
                "name": "Number Coding",
                "nameHi": "संख्या कोडिंग",
                "subtopics": [
                  "Mathematical Coding"
                ],
                "importanceScore": 9
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
              }
            ]
          },
          {
            "id": "pol_reasoning_ch_3",
            "name": "दिशा परीक्षण एवं रैंकिंग",
            "topics": [
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
                "id": "reas_rank_1",
                "name": "Ranking Test",
                "nameHi": "रैंकिंग परीक्षण",
                "subtopics": [
                  "Left-Right Ranking",
                  "Top-Bottom Ranking"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "pol_reasoning_ch_4",
            "name": "वेन आरेख एवं अशाब्दिक तर्कशक्ति",
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
            "id": "reas_cd_2",
            "name": "Number Coding",
            "nameHi": "संख्या कोडिंग",
            "subtopics": [
              "Mathematical Coding"
            ],
            "importanceScore": 9
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
            "id": "reas_rank_1",
            "name": "Ranking Test",
            "nameHi": "रैंकिंग परीक्षण",
            "subtopics": [
              "Left-Right Ranking",
              "Top-Bottom Ranking"
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
        "id": "pol_maths",
        "name": "अंकगणित (Numerical Ability)",
        "weightage": 25,
        "importance": "High",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "pol_maths_ch_1",
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
            "id": "pol_maths_ch_2",
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
            "id": "pol_maths_ch_3",
            "name": "साधारण एवं चक्रवृद्धि ब्याज",
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
              }
            ]
          },
          {
            "id": "pol_maths_ch_4",
            "name": "अनुपात, समय, कार्य एवं चाल-दूरी",
            "topics": [
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
            "id": "pol_maths_ch_5",
            "name": "क्षेत्रमिति की मूल अवधारणाएं",
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
  "cgv_forest": {
    "name": "Forest Guard (वनरक्षक)",
    "fullName": "Chhattisgarh Forest Guard Recruitment Examination",
    "icon": "🌲",
    "category": "forest",
    "description": "छत्तीसगढ़ वनरक्षक सीधी भर्ती परीक्षा — 100 अंक",
    "eligibility": "12th Pass",
    "pattern": {
      "totalMarks": 100,
      "time": "2 Hours",
      "type": "Objective MCQ (100 Questions, 100 Marks)",
      "papers": [
        {
          "paper": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
          "marks": 30
        },
        {
          "paper": "सामान्य विज्ञान, वन संपदा एवं पर्यावरण",
          "marks": 30
        },
        {
          "paper": "अंकगणित (Mathematics)",
          "marks": 20
        },
        {
          "paper": "बुद्धि क्षमता एवं तार्किक योग्यता",
          "marks": 20
        }
      ]
    },
    "subjects": [
      {
        "id": "forest_gk",
        "name": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "forest_gk_ch_1",
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
            "id": "forest_gk_ch_2",
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
              }
            ]
          },
          {
            "id": "forest_gk_ch_3",
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
        "id": "forest_sci",
        "name": "सामान्य विज्ञान, वन संपदा एवं पर्यावरण",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "forest_sci_ch_1",
            "name": "सामान्य विज्ञान मूल सिद्धांत",
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
                "id": "bio_13",
                "name": "Plant Physiology",
                "nameHi": "पादप शरीर क्रिया विज्ञान",
                "subtopics": [
                  "Photosynthesis",
                  "Transpiration"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "forest_sci_ch_2",
            "name": "पर्यावरण, पारिस्थितिकी एवं जैव विविधता",
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
                "id": "env_6",
                "name": "Environmental Acts and Organizations",
                "nameHi": "पर्यावरणीय अधिनियम एवं संगठन",
                "subtopics": [
                  "UNEP",
                  "IPCC",
                  "Wildlife Protection Act"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "forest_sci_ch_3",
            "name": "छत्तीसगढ़ की वन संपदा एवं वन्यजीव",
            "topics": [
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
                "id": "forest_law_1",
                "name": "Forestry Laws & Tendu Patta Policy",
                "nameHi": "वन संरक्षण कानून, तेन्दूपत्ता एवं लघु वनोपज नीति",
                "subtopics": [
                  "वन्यजीव संरक्षण अधिनियम 1972",
                  "वन संरक्षण अधिनियम 1980",
                  "तेन्दूपत्ता संग्रहण एवं बोनस वितरण",
                  "लघु वनोपज न्यूनतम समर्थन मूल्य"
                ],
                "importanceScore": 8
              },
              {
                "id": "forest_law_2",
                "name": "National Parks & Wildlife Sanctuaries of CG",
                "nameHi": "छत्तीसगढ़ के राष्ट्रीय उद्यान, टाइगर रिजर्व एवं अभयारण्य",
                "subtopics": [
                  "इंद्रावती राष्ट्रीय उद्यान",
                  "कांगेर घाटी राष्ट्रीय उद्यान",
                  "गुरु घासीदास राष्ट्रीय उद्यान",
                  "अचानकमार एवं उदंती-सीतानदी टाइगर रिजर्व"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
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
            "id": "bio_13",
            "name": "Plant Physiology",
            "nameHi": "पादप शरीर क्रिया विज्ञान",
            "subtopics": [
              "Photosynthesis",
              "Transpiration"
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
            "id": "env_6",
            "name": "Environmental Acts and Organizations",
            "nameHi": "पर्यावरणीय अधिनियम एवं संगठन",
            "subtopics": [
              "UNEP",
              "IPCC",
              "Wildlife Protection Act"
            ],
            "importanceScore": 8
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
            "id": "forest_law_1",
            "name": "Forestry Laws & Tendu Patta Policy",
            "nameHi": "वन संरक्षण कानून, तेन्दूपत्ता एवं लघु वनोपज नीति",
            "subtopics": [
              "वन्यजीव संरक्षण अधिनियम 1972",
              "वन संरक्षण अधिनियम 1980",
              "तेन्दूपत्ता संग्रहण एवं बोनस वितरण",
              "लघु वनोपज न्यूनतम समर्थन मूल्य"
            ],
            "importanceScore": 8
          },
          {
            "id": "forest_law_2",
            "name": "National Parks & Wildlife Sanctuaries of CG",
            "nameHi": "छत्तीसगढ़ के राष्ट्रीय उद्यान, टाइगर रिजर्व एवं अभयारण्य",
            "subtopics": [
              "इंद्रावती राष्ट्रीय उद्यान",
              "कांगेर घाटी राष्ट्रीय उद्यान",
              "गुरु घासीदास राष्ट्रीय उद्यान",
              "अचानकमार एवं उदंती-सीतानदी टाइगर रिजर्व"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "forest_maths",
        "name": "अंकगणित (Mathematics)",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "forest_maths_ch_1",
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
            "id": "forest_maths_ch_2",
            "name": "व्यावसायिक गणित",
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
            "id": "forest_maths_ch_3",
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
      },
      {
        "id": "forest_reasoning",
        "name": "बुद्धि क्षमता एवं तार्किक योग्यता",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "forest_reasoning_ch_1",
            "name": "तार्किक श्रृंखला एवं सादृश्यता",
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
            "id": "forest_reasoning_ch_2",
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
            "id": "forest_reasoning_ch_3",
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
      }
    ]
  },
  "cgv_teacher": {
    "name": "Shikshak / Teacher",
    "fullName": "CG Vyapam Teacher (शिक्षक / सहायक शिक्षक) Recruitment Exam",
    "icon": "📚",
    "category": "education",
    "description": "छत्तीसगढ़ शिक्षक एवं सहायक शिक्षक भर्ती परीक्षा — आधिकारिक 150 अंकों का पाठ्यक्रम",
    "eligibility": "D.El.Ed / B.Ed + CG TET / CTET Pass",
    "pattern": {
      "totalMarks": 150,
      "time": "2.5 Hours",
      "type": "Objective MCQ (150 Questions, 150 Marks)",
      "papers": [
        {
          "paper": "बाल विकास एवं शिक्षाशास्त्र (CDP)",
          "marks": 30
        },
        {
          "paper": "सामान्य हिंदी",
          "marks": 25
        },
        {
          "paper": "General English",
          "marks": 25
        },
        {
          "paper": "गणित (Mathematics)",
          "marks": 30
        },
        {
          "paper": "पर्यावरण अध्ययन / सामाजिक अध्ययन / विज्ञान",
          "marks": 20
        },
        {
          "paper": "कंप्यूटर एवं सामान्य ज्ञान",
          "marks": 20
        }
      ]
    },
    "subjects": [
      {
        "id": "tch_cdp",
        "name": "बाल विकास एवं शिक्षाशास्त्र (CDP)",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "tch_cdp_ch_1",
            "name": "बाल विकास की अवधारणा एवं सिद्धांत",
            "topics": [
              {
                "id": "tch_cdp_1",
                "name": "Child Development Concepts",
                "nameHi": "बाल विकास की अवधारणा, विकास के आयाम एवं प्रभावक कारक",
                "subtopics": [
                  "वृद्धि एवं विकास का अंतर",
                  "वंशानुक्रम एवं वातावरण का प्रभाव",
                  "शारीरिक, मानसिक एवं संवेगात्मक विकास"
                ],
                "importanceScore": 8
              },
              {
                "id": "tch_cdp_2",
                "name": "Piaget, Kohlberg & Vygotsky",
                "nameHi": "पियाजे, कोहलबर्ग एवं वाइगोत्स्की के रचनावादी सिद्धांत",
                "subtopics": [
                  "पियाजे का संज्ञानात्मक विकास सिद्धांत",
                  "कोहलबर्ग का नैतिक विकास",
                  "वाइगोत्स्की का सामाजिक-सांस्कृतिक सिद्धांत एवं ZPD"
                ],
                "importanceScore": 8
              },
              {
                "id": "tch_cdp_3",
                "name": "Inclusive Education & CWSN",
                "nameHi": "समावेशी शिक्षा एवं विशेष आवश्यकता वाले बच्चे",
                "subtopics": [
                  "वंचित एवं पिछड़े बच्चों की शिक्षा",
                  "अधिगम अक्षमताएं (Dyslexia, Dyscalculia)",
                  "प्रतिभाशाली एवं सृजनात्मक बालकों की पहचान"
                ],
                "importanceScore": 8
              },
              {
                "id": "tch_cdp_4",
                "name": "Learning Theories & Evaluation",
                "nameHi": "अधिगम सिद्धांत, प्रेरणा एवं मूल्यांकन (CCE)",
                "subtopics": [
                  "थार्नडाइक, पावलव व स्किनर के सिद्धांत",
                  "अधिगम स्थानांतरण",
                  "सतत एवं समग्र मूल्यांकन (CCE)",
                  "उपचारात्मक शिक्षण"
                ],
                "importanceScore": 8
              },
              {
                "id": "tch_cdp_5",
                "name": "NEP 2020 & RTE Act 2009",
                "nameHi": "राष्ट्रीय शिक्षा नीति 2020 एवं बाल अधिकार कानून",
                "subtopics": [
                  "RTE Act 2009 के प्रमुख प्रावधान",
                  "NEP 2020 स्कूली शिक्षा संरचना (5+3+3+4)",
                  "FLN निपुण भारत मिशन"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "tch_cdp_1",
            "name": "Child Development Concepts",
            "nameHi": "बाल विकास की अवधारणा, विकास के आयाम एवं प्रभावक कारक",
            "subtopics": [
              "वृद्धि एवं विकास का अंतर",
              "वंशानुक्रम एवं वातावरण का प्रभाव",
              "शारीरिक, मानसिक एवं संवेगात्मक विकास"
            ],
            "importanceScore": 8
          },
          {
            "id": "tch_cdp_2",
            "name": "Piaget, Kohlberg & Vygotsky",
            "nameHi": "पियाजे, कोहलबर्ग एवं वाइगोत्स्की के रचनावादी सिद्धांत",
            "subtopics": [
              "पियाजे का संज्ञानात्मक विकास सिद्धांत",
              "कोहलबर्ग का नैतिक विकास",
              "वाइगोत्स्की का सामाजिक-सांस्कृतिक सिद्धांत एवं ZPD"
            ],
            "importanceScore": 8
          },
          {
            "id": "tch_cdp_3",
            "name": "Inclusive Education & CWSN",
            "nameHi": "समावेशी शिक्षा एवं विशेष आवश्यकता वाले बच्चे",
            "subtopics": [
              "वंचित एवं पिछड़े बच्चों की शिक्षा",
              "अधिगम अक्षमताएं (Dyslexia, Dyscalculia)",
              "प्रतिभाशाली एवं सृजनात्मक बालकों की पहचान"
            ],
            "importanceScore": 8
          },
          {
            "id": "tch_cdp_4",
            "name": "Learning Theories & Evaluation",
            "nameHi": "अधिगम सिद्धांत, प्रेरणा एवं मूल्यांकन (CCE)",
            "subtopics": [
              "थार्नडाइक, पावलव व स्किनर के सिद्धांत",
              "अधिगम स्थानांतरण",
              "सतत एवं समग्र मूल्यांकन (CCE)",
              "उपचारात्मक शिक्षण"
            ],
            "importanceScore": 8
          },
          {
            "id": "tch_cdp_5",
            "name": "NEP 2020 & RTE Act 2009",
            "nameHi": "राष्ट्रीय शिक्षा नीति 2020 एवं बाल अधिकार कानून",
            "subtopics": [
              "RTE Act 2009 के प्रमुख प्रावधान",
              "NEP 2020 स्कूली शिक्षा संरचना (5+3+3+4)",
              "FLN निपुण भारत मिशन"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "tch_hindi",
        "name": "सामान्य हिंदी भाषा एवं शिक्षाशास्त्र",
        "weightage": 25,
        "importance": "High",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "tch_hindi_ch_1",
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
            "id": "tch_hindi_ch_2",
            "name": "व्याकरण एवं शब्द भंडार",
            "topics": [
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
              }
            ]
          },
          {
            "id": "tch_hindi_ch_3",
            "name": "अपठित गद्यांश एवं भाषा शिक्षण",
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
                "id": "tch_hin_ped",
                "name": "Hindi Language Pedagogy",
                "nameHi": "हिंदी भाषा शिक्षण शास्त्र",
                "subtopics": [
                  "भाषा अर्जन एवं अधिगम",
                  "भाषा शिक्षण के चार कौशल (LSRW)",
                  "भाषा शिक्षण में टीएलएम (TLM) एवं उपचारात्मक शिक्षण"
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
            "id": "tch_hin_ped",
            "name": "Hindi Language Pedagogy",
            "nameHi": "हिंदी भाषा शिक्षण शास्त्र",
            "subtopics": [
              "भाषा अर्जन एवं अधिगम",
              "भाषा शिक्षण के चार कौशल (LSRW)",
              "भाषा शिक्षण में टीएलएम (TLM) एवं उपचारात्मक शिक्षण"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "tch_english",
        "name": "General English & Pedagogy",
        "weightage": 25,
        "importance": "High",
        "pyqFrequency": "High (25 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "tch_english_ch_1",
            "name": "English Grammar",
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
              }
            ]
          },
          {
            "id": "tch_english_ch_2",
            "name": "Vocabulary & Comprehension",
            "topics": [
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
            "id": "tch_english_ch_3",
            "name": "English Pedagogy",
            "topics": [
              {
                "id": "tch_eng_ped",
                "name": "English Language Pedagogy",
                "nameHi": "English Language Teaching & Pedagogy",
                "subtopics": [
                  "Principles of Language Teaching",
                  "Role of Listening and Speaking",
                  "Remedial Teaching and TLM in English"
                ],
                "importanceScore": 8
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
            "id": "tch_eng_ped",
            "name": "English Language Pedagogy",
            "nameHi": "English Language Teaching & Pedagogy",
            "subtopics": [
              "Principles of Language Teaching",
              "Role of Listening and Speaking",
              "Remedial Teaching and TLM in English"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "tch_maths",
        "name": "गणित एवं गणित शिक्षण शास्त्र",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "Very High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "tch_maths_ch_1",
            "name": "संख्या पद्धति एवं बुनियादी गणित",
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
            "id": "tch_maths_ch_2",
            "name": "व्यावसायिक गणित एवं क्षेत्रमिति",
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
            "id": "tch_maths_ch_3",
            "name": "ज्यामिति एवं आंकड़े",
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
                "id": "math_di_1",
                "name": "Statistics",
                "nameHi": "सांख्यिकी",
                "subtopics": [
                  "Mean",
                  "Median",
                  "Mode"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "tch_maths_ch_4",
            "name": "गणित शिक्षण शास्त्र",
            "topics": [
              {
                "id": "tch_math_ped",
                "name": "Mathematics Pedagogy",
                "nameHi": "गणित शिक्षण शास्त्र (Pedagogy)",
                "subtopics": [
                  "गणित की प्रकृति एवं तार्किक सोच",
                  "पाठ्यचर्या में गणित का स्थान",
                  "गणित शिक्षण की विधियाँ एवं त्रुटि विश्लेषण"
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
            "id": "tch_math_ped",
            "name": "Mathematics Pedagogy",
            "nameHi": "गणित शिक्षण शास्त्र (Pedagogy)",
            "subtopics": [
              "गणित की प्रकृति एवं तार्किक सोच",
              "पाठ्यचर्या में गणित का स्थान",
              "गणित शिक्षण की विधियाँ एवं त्रुटि विश्लेषण"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "tch_evs",
        "name": "पर्यावरण अध्ययन एवं सामाजिक अध्ययन",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "tch_evs_ch_1",
            "name": "पर्यावरण, पारिस्थितिकी एवं स्वास्थ्य",
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
              }
            ]
          },
          {
            "id": "tch_evs_ch_2",
            "name": "हमारा परिवेश एवं छत्तीसगढ़ संदर्भ",
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
                "id": "tch_evs_ped",
                "name": "EVS Pedagogy & Practical",
                "nameHi": "पर्यावरण अध्ययन शिक्षण शास्त्र",
                "subtopics": [
                  "पर्यावरण अध्ययन का महत्व एवं उद्देश्य",
                  "क्रियाकलाप, प्रयोग एवं प्रायोजना कार्य",
                  "पर्यावरण शिक्षण में सहायक सामग्री"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
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
            "id": "tch_evs_ped",
            "name": "EVS Pedagogy & Practical",
            "nameHi": "पर्यावरण अध्ययन शिक्षण शास्त्र",
            "subtopics": [
              "पर्यावरण अध्ययन का महत्व एवं उद्देश्य",
              "क्रियाकलाप, प्रयोग एवं प्रायोजना कार्य",
              "पर्यावरण शिक्षण में सहायक सामग्री"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "tch_comp_gk",
        "name": "कंप्यूटर एवं सामान्य ज्ञान",
        "weightage": 20,
        "importance": "Medium",
        "pyqFrequency": "Medium (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "tch_comp_gk_ch_1",
            "name": "कंप्यूटर ज्ञान",
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
          },
          {
            "id": "tch_comp_gk_ch_2",
            "name": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
            "topics": [
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
            "id": "comp_net_1",
            "name": "Internet Basics",
            "nameHi": "इंटरनेट की मूल बातें",
            "subtopics": [
              "WWW",
              "Web Browser",
              "Search Engine"
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
          }
        ]
      }
    ]
  },
  "cgv_food": {
    "name": "Food Inspector (खाद्य निरीक्षक)",
    "fullName": "CG Vyapam Food Civil Supplies Inspector Recruitment Exam",
    "icon": "🌾",
    "category": "technical",
    "description": "खाद्य नागरिक आपूर्ति निरीक्षक भर्ती परीक्षा — आधिकारिक 200 अंकों का विस्तृत पाठ्यक्रम",
    "eligibility": "Graduate in Any Discipline",
    "pattern": {
      "totalMarks": 200,
      "time": "3 Hours",
      "type": "Objective MCQ (200 Questions, 200 Marks)",
      "papers": [
        {
          "paper": "आवश्यक वस्तु अधिनियम एवं खाद्य सुरक्षा कानून",
          "marks": 50
        },
        {
          "paper": "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
          "marks": 50
        },
        {
          "paper": "सामान्य ज्ञान (India GK & Science)",
          "marks": 50
        },
        {
          "paper": "गणित एवं मानसिक योग्यता (Maths & Reasoning)",
          "marks": 30
        },
        {
          "paper": "कंप्यूटर ज्ञान एवं सामान्य हिंदी",
          "marks": 20
        }
      ]
    },
    "subjects": [
      {
        "id": "food_acts",
        "name": "आवश्यक वस्तु अधिनियम एवं खाद्य सुरक्षा कानून",
        "weightage": 50,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (50 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "food_acts_ch_1",
            "name": "आवश्यक वस्तु अधिनियम एवं खाद्य कानून",
            "topics": [
              {
                "id": "food_act_1",
                "name": "Essential Commodities Act 1955",
                "nameHi": "आवश्यक वस्तु अधिनियम 1955 - उद्देश्य, नियंत्रण आदेश एवं दंड प्रावधान",
                "subtopics": [
                  "अधिनियम के उद्देश्य एवं परिभाषाएं",
                  "आवश्यक वस्तुओं की घोषणा एवं मूल्य नियंत्रण",
                  "तलाशी, जब्ती एवं अधिग्रहण प्रक्रिया",
                  "धारा 3 के तहत नियंत्रण आदेश एवं उल्लंघन पर दंड"
                ],
                "importanceScore": 8
              },
              {
                "id": "food_act_2",
                "name": "National Food Security Act 2013",
                "nameHi": "राष्ट्रीय खाद्य सुरक्षा अधिनियम 2013 (NFSA) - प्रावधान एवं पात्रताएं",
                "subtopics": [
                  "अधिनियम की उद्देशिका एवं कानूनी अधिकार",
                  "अंत्योदय एवं प्राथमिकता परिवार पात्रताएं",
                  "गर्भवती महिलाओं एवं बच्चों हेतु पोषण सहायता",
                  "राज्य खाद्य आयोग एवं शिकायत निवारण तंत्र"
                ],
                "importanceScore": 8
              },
              {
                "id": "food_act_3",
                "name": "CG Food & Nutrition Security Act 2012",
                "nameHi": "छत्तीसगढ़ खाद्य एवं पोषण सुरक्षा अधिनियम 2012",
                "subtopics": [
                  "छत्तीसगढ़ कानून के विशेष प्रावधान",
                  "विभिन्न श्रेणियों के राशन कार्ड (अंत्योदय, प्राथमिकता, निराश्रित)",
                  "पौष्टिक भोजन एवं दाल, चना, आयोडाइज्ड नमक वितरण",
                  "महिला सशक्तिकरण (मुखिया के रूप में महिला)"
                ],
                "importanceScore": 8
              },
              {
                "id": "food_act_4",
                "name": "CG PDS & Rationing System",
                "nameHi": "छत्तीसगढ़ सार्वजनिक वितरण प्रणाली (PDS) नियंत्रण आदेश",
                "subtopics": [
                  "सार्वजनिक वितरण प्रणाली (PDS) का कंप्यूटरीकरण",
                  "उचित मूल्य दुकान आवंटन नियम",
                  "खाद्यान्न भंडारण, उठाव एवं बारदाना प्रबंधन",
                  "विकेंद्रीकृत धान उपार्जन प्रणाली एवं कस्टम मिलिंग"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "food_acts_ch_2",
            "name": "उपभोक्ता संरक्षण एवं खाद्य मानक",
            "topics": [
              {
                "id": "food_act_5",
                "name": "Consumer Protection Act 2019",
                "nameHi": "उपभोक्ता संरक्षण अधिनियम 2019 - उपभोक्ता अधिकार व आयोग",
                "subtopics": [
                  "उपभोक्ता के छह बुनियादी अधिकार",
                  "जिला, राज्य एवं राष्ट्रीय उपभोक्ता आयोग का क्षेत्राधिकार",
                  "भ्रामक विज्ञापन एवं उत्पाद दायित्व (Product Liability)",
                  "ई-कॉमर्स नियम एवं ई-दाखिल पोर्टल"
                ],
                "importanceScore": 8
              },
              {
                "id": "food_act_6",
                "name": "Food Safety and Standards Act 2006 (FSSAI)",
                "nameHi": "खाद्य सुरक्षा एवं मानक अधिनियम 2006 (FSSAI)",
                "subtopics": [
                  "FSSAI की स्थापना एवं खाद्य मानक",
                  "खाद्य अपमिश्रण (Food Adulteration) निवारण",
                  "खाद्य लाइसेंसिंग एवं रजिस्ट्रेशन",
                  "खाद्य सुरक्षा अधिकारी के कर्तव्य एवं नमूना जांच"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "food_act_1",
            "name": "Essential Commodities Act 1955",
            "nameHi": "आवश्यक वस्तु अधिनियम 1955 - उद्देश्य, नियंत्रण आदेश एवं दंड प्रावधान",
            "subtopics": [
              "अधिनियम के उद्देश्य एवं परिभाषाएं",
              "आवश्यक वस्तुओं की घोषणा एवं मूल्य नियंत्रण",
              "तलाशी, जब्ती एवं अधिग्रहण प्रक्रिया",
              "धारा 3 के तहत नियंत्रण आदेश एवं उल्लंघन पर दंड"
            ],
            "importanceScore": 8
          },
          {
            "id": "food_act_2",
            "name": "National Food Security Act 2013",
            "nameHi": "राष्ट्रीय खाद्य सुरक्षा अधिनियम 2013 (NFSA) - प्रावधान एवं पात्रताएं",
            "subtopics": [
              "अधिनियम की उद्देशिका एवं कानूनी अधिकार",
              "अंत्योदय एवं प्राथमिकता परिवार पात्रताएं",
              "गर्भवती महिलाओं एवं बच्चों हेतु पोषण सहायता",
              "राज्य खाद्य आयोग एवं शिकायत निवारण तंत्र"
            ],
            "importanceScore": 8
          },
          {
            "id": "food_act_3",
            "name": "CG Food & Nutrition Security Act 2012",
            "nameHi": "छत्तीसगढ़ खाद्य एवं पोषण सुरक्षा अधिनियम 2012",
            "subtopics": [
              "छत्तीसगढ़ कानून के विशेष प्रावधान",
              "विभिन्न श्रेणियों के राशन कार्ड (अंत्योदय, प्राथमिकता, निराश्रित)",
              "पौष्टिक भोजन एवं दाल, चना, आयोडाइज्ड नमक वितरण",
              "महिला सशक्तिकरण (मुखिया के रूप में महिला)"
            ],
            "importanceScore": 8
          },
          {
            "id": "food_act_4",
            "name": "CG PDS & Rationing System",
            "nameHi": "छत्तीसगढ़ सार्वजनिक वितरण प्रणाली (PDS) नियंत्रण आदेश",
            "subtopics": [
              "सार्वजनिक वितरण प्रणाली (PDS) का कंप्यूटरीकरण",
              "उचित मूल्य दुकान आवंटन नियम",
              "खाद्यान्न भंडारण, उठाव एवं बारदाना प्रबंधन",
              "विकेंद्रीकृत धान उपार्जन प्रणाली एवं कस्टम मिलिंग"
            ],
            "importanceScore": 8
          },
          {
            "id": "food_act_5",
            "name": "Consumer Protection Act 2019",
            "nameHi": "उपभोक्ता संरक्षण अधिनियम 2019 - उपभोक्ता अधिकार व आयोग",
            "subtopics": [
              "उपभोक्ता के छह बुनियादी अधिकार",
              "जिला, राज्य एवं राष्ट्रीय उपभोक्ता आयोग का क्षेत्राधिकार",
              "भ्रामक विज्ञापन एवं उत्पाद दायित्व (Product Liability)",
              "ई-कॉमर्स नियम एवं ई-दाखिल पोर्टल"
            ],
            "importanceScore": 8
          },
          {
            "id": "food_act_6",
            "name": "Food Safety and Standards Act 2006 (FSSAI)",
            "nameHi": "खाद्य सुरक्षा एवं मानक अधिनियम 2006 (FSSAI)",
            "subtopics": [
              "FSSAI की स्थापना एवं खाद्य मानक",
              "खाद्य अपमिश्रण (Food Adulteration) निवारण",
              "खाद्य लाइसेंसिंग एवं रजिस्ट्रेशन",
              "खाद्य सुरक्षा अधिकारी के कर्तव्य एवं नमूना जांच"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "food_cg",
        "name": "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        "weightage": 50,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (50 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "food_cg_ch_1",
            "name": "छत्तीसगढ़ का इतिहास एवं स्वतंत्रता संग्राम",
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
              }
            ]
          },
          {
            "id": "food_cg_ch_2",
            "name": "छत्तीसगढ़ का भूगोल, नदियां व वन",
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
              }
            ]
          },
          {
            "id": "food_cg_ch_3",
            "name": "छत्तीसगढ़ की जनजातियां, कला व संस्कृति",
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
                "id": "cg_cul_8",
                "name": "Important Temples",
                "nameHi": "प्रमुख मंदिर",
                "subtopics": [
                  "बम्लेश्वरी",
                  "लक्ष्मण मंदिर",
                  "भोरमदेव"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "food_cg_ch_4",
            "name": "छत्तीसगढ़ अर्थव्यवस्था, कृषि एवं योजनाएं",
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
          }
        ]
      },
      {
        "id": "food_gk",
        "name": "सामान्य ज्ञान (India GK & Science)",
        "weightage": 50,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (50 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "food_gk_ch_1",
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
              }
            ]
          },
          {
            "id": "food_gk_ch_2",
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
            "id": "food_gk_ch_3",
            "name": "भारत का भूगोल एवं अर्थव्यवस्था",
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
                "id": "ind_eco_3",
                "name": "Budget and Taxation",
                "nameHi": "बजट एवं कराधान",
                "subtopics": [
                  "GST",
                  "प्रत्यक्ष कर",
                  "अप्रत्यक्ष कर"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "food_gk_ch_4",
            "name": "सामान्य विज्ञान एवं पोषण",
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
              }
            ]
          },
          {
            "id": "food_gk_ch_5",
            "name": "समसामयिक घटनाएं",
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
                "id": "ca_eco_1",
                "name": "Union Budget",
                "nameHi": "केंद्रीय बजट",
                "subtopics": [
                  "Budget Highlights",
                  "Tax Reforms"
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
            "id": "ca_eco_1",
            "name": "Union Budget",
            "nameHi": "केंद्रीय बजट",
            "subtopics": [
              "Budget Highlights",
              "Tax Reforms"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "food_quant",
        "name": "गणित एवं मानसिक योग्यता (Maths & Reasoning)",
        "weightage": 30,
        "importance": "High",
        "pyqFrequency": "High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "food_quant_ch_1",
            "name": "अंकगणित एवं संख्या पद्धति",
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
            "id": "food_quant_ch_2",
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
          },
          {
            "id": "food_quant_ch_3",
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
        "id": "food_comp_hin",
        "name": "कंप्यूटर ज्ञान एवं सामान्य हिंदी",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "food_comp_hin_ch_1",
            "name": "कंप्यूटर ज्ञान",
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
              },
              {
                "id": "comp_cyber_1",
                "name": "Cyber Security Basics",
                "nameHi": "साइबर सुरक्षा की मूल बातें",
                "subtopics": [
                  "Cyber Threats",
                  "Cyber Attacks"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "food_comp_hin_ch_2",
            "name": "सामान्य हिंदी व्याकरण",
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
          },
          {
            "id": "comp_cyber_1",
            "name": "Cyber Security Basics",
            "nameHi": "साइबर सुरक्षा की मूल बातें",
            "subtopics": [
              "Cyber Threats",
              "Cyber Attacks"
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
    ]
  },
  "cgv_sub_eng": {
    "name": "Sub Engineer (Civil)",
    "fullName": "CG Vyapam Sub Engineer (Civil / WRD / PWD / PHE) Recruitment Exam",
    "icon": "📐",
    "category": "technical",
    "description": "उप अभियंता (सिविल) सीधी भर्ती परीक्षा — आधिकारिक 150 अंकों का पाठ्यक्रम (50 Non-Tech + 100 Technical)",
    "eligibility": "Diploma or Degree in Civil Engineering",
    "pattern": {
      "totalMarks": 150,
      "time": "3 Hours",
      "type": "Objective MCQ (150 Questions, 150 Marks)",
      "papers": [
        {
          "paper": "Part 1: Non-Technical (GK, Reasoning, Maths, Computer)",
          "marks": 50
        },
        {
          "paper": "Part 2: Technical Civil Engineering Core",
          "marks": 100
        }
      ]
    },
    "subjects": [
      {
        "id": "se_non_tech",
        "name": "Non-Technical (सामान्य ज्ञान, रीजनिंग, गणित, कंप्यूटर)",
        "weightage": 50,
        "importance": "High",
        "pyqFrequency": "High (50 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "se_non_tech_ch_1",
            "name": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
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
            "id": "se_non_tech_ch_2",
            "name": "मानसिक योग्यता एवं रीजनिंग",
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
            "id": "se_non_tech_ch_3",
            "name": "अंकगणित एवं क्षेत्रमिति",
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
            "id": "se_non_tech_ch_4",
            "name": "कंप्यूटर की मूल बातें",
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
          }
        ]
      },
      {
        "id": "se_civil_core",
        "name": "Civil Engineering Core (सिविल इंजीनियरिंग)",
        "weightage": 100,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (100 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "se_civil_core_ch_1",
            "name": "Building Materials & Construction",
            "topics": [
              {
                "id": "se_civ_1",
                "name": "Building Materials (Cement, Concrete, Bricks)",
                "nameHi": "भवन निर्माण सामग्री (सीमेंट, कंक्रीट, ईंट, पत्थर, टिम्बर एवं पेंट्स)",
                "subtopics": [
                  "सीमेंट के प्रकार, संरचना एवं फील्ड टेस्ट",
                  "कंक्रीट मिक्स डिजाइन, वर्केबिलिटी एवं संपीडन सामर्थ्य",
                  "ईंटों का वर्गीकरण एवं परीक्षण",
                  "टिम्बर, पेंट्स, वार्निश एवं फेरस/नॉन-फेरस धातुएँ"
                ],
                "importanceScore": 8
              },
              {
                "id": "se_civ_2",
                "name": "Building Construction & Foundations",
                "nameHi": "भवन निर्माण तकनीक एवं नींव (Foundations)",
                "subtopics": [
                  "चिनाई कार्य (Brick & Stone Masonry)",
                  "उथली एवं गहरी नींव (Shallow & Deep Foundations)",
                  "डैम्प प्रूफ कोर्स (DPC) एवं प्लास्टरिंग",
                  "दरवाजे, खिड़कियां, सीढ़ियां एवं छतें"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "se_civil_core_ch_2",
            "name": "Structural Analysis & Design (RCC & Steel)",
            "topics": [
              {
                "id": "se_civ_3",
                "name": "Strength of Materials & Structural Analysis",
                "nameHi": "पदार्थों की सामर्थ्य एवं संरचनात्मक विश्लेषण",
                "subtopics": [
                  "प्रतिबल एवं विकृति (Stress & Strain), हुक का नियम",
                  "कतरनी बल एवं बंकन आघूर्ण (SFD & BMD)",
                  "ढलान एवं विक्षेपण (Slope & Deflection)",
                  "कॉलम एवं स्ट्रट्स (यूलर सूत्र)"
                ],
                "importanceScore": 8
              },
              {
                "id": "se_civ_4",
                "name": "Design of Reinforced Concrete Structures (IS 456)",
                "nameHi": "आरसीसी संरचनाओं का डिजाइन (IS 456:2000)",
                "subtopics": [
                  "सीमा अवस्था विधि (Limit State Method) सिद्धांत",
                  "एकल एवं दोहरे प्रबलित बीम का डिजाइन",
                  "टी-बीम एवं एल-बीम विश्लेषण",
                  "स्लैब (One-way & Two-way), कॉलम एवं फुटिंग्स डिजाइन"
                ],
                "importanceScore": 8
              },
              {
                "id": "se_civ_5",
                "name": "Design of Steel Structures (IS 800)",
                "nameHi": "स्टील संरचनाओं का डिजाइन (IS 800:2007)",
                "subtopics": [
                  "बोल्टेड एवं वेल्डेड जोड़ (Bolted & Welded Connections)",
                  "तनाव एवं संपीडन सदस्य डिजाइन (Tension & Compression Members)",
                  "प्लेट गर्डर एवं रूफ ट्रस (Roof Trusses)"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "se_civil_core_ch_3",
            "name": "Geotechnical & Surveying",
            "topics": [
              {
                "id": "se_civ_6",
                "name": "Soil Mechanics & Geotechnical Engineering",
                "nameHi": "सॉइल मैकेनिक्स एवं भू-तकनीकी इंजीनियरिंग",
                "subtopics": [
                  "मृदा के तीन प्रावस्था संबंध (Phase Relations)",
                  "वर्गीकरण (IS Soil Classification)",
                  "पारगम्यता (Permeability) एवं सीपेज",
                  "मृदा संपीडन एवं कतरनी सामर्थ्य (Shear Strength)",
                  "धारण क्षमता (Bearing Capacity of Soils)"
                ],
                "importanceScore": 8
              },
              {
                "id": "se_civ_7",
                "name": "Surveying, Levelling & Modern Tools",
                "nameHi": "सर्वेइंग, लेवलिंग एवं आधुनिक उपकरण (Total Station, GPS)",
                "subtopics": [
                  "चेन एवं कंपास सर्वेइंग (Prismatic Compass)",
                  "लेवलिंग एवं कंटूरिंग (Levelling & Contouring)",
                  "थोडोलाइट एवं टैकोमेट्रिक सर्वेइंग",
                  "टोटल स्टेशन, जीपीएस (GPS) एवं जीआईएस (GIS) मूल बातें"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "se_civil_core_ch_4",
            "name": "Water Resources, Transportation & Environmental",
            "topics": [
              {
                "id": "se_civ_8",
                "name": "Fluid Mechanics & Hydraulics",
                "nameHi": "फ्लूइड मैकेनिक्स, हाइड्रोलिक्स एवं खुला चैनल प्रवाह",
                "subtopics": [
                  "द्रव के गुण, हाइड्रोस्टैटिक दाब",
                  "बरनौली प्रमेय एवं वेंच्युरीमीटर",
                  "पाइपों में घर्षण हानि (Darcy-Weisbach)",
                  "ओपन चैनल फ्लो (Manning एवं Chezy सूत्र)"
                ],
                "importanceScore": 8
              },
              {
                "id": "se_civ_9",
                "name": "Highway, Traffic & Transportation",
                "nameHi": "हाईवे एवं ट्रांसपोर्टेशन इंजीनियरिंग",
                "subtopics": [
                  "हाईवे ज्यामितीय डिजाइन (Camber, Super-elevation, Sight Distance)",
                  "पेवमेंट डिजाइन (Flexible & Rigid Pavements)",
                  "ट्रैफिक इंजीनियरिंग एवं सड़क संकेत"
                ],
                "importanceScore": 8
              },
              {
                "id": "se_civ_10",
                "name": "Environmental Engineering & Water Supply",
                "nameHi": "जल आपूर्ति एवं सीवरेज इंजीनियरिंग",
                "subtopics": [
                  "जल मांग आकलन एवं गुणवत्ता मानक",
                  "जल शोधन प्रक्रियाएं (Sedimentation, Filtration, Chlorination)",
                  "सीवरेज प्रणाली एवं सीवेज उपचार (BOD/COD)"
                ],
                "importanceScore": 8
              },
              {
                "id": "se_civ_11",
                "name": "Estimation, Costing & Project Management",
                "nameHi": "एस्टिमेशन, कॉस्टिंग, वैल्यूएशन एवं सीपीएम/पर्ट",
                "subtopics": [
                  "विस्तृत आकलन विधियाँ (Detailed Estimates)",
                  "दर विश्लेषण (Rate Analysis) एवं पीडब्ल्यूडी दर अनुसूची",
                  "मूल्यांकन (Valuation Methods)",
                  "नेटवर्क विश्लेषण (CPM एवं PERT)"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "se_civ_1",
            "name": "Building Materials (Cement, Concrete, Bricks)",
            "nameHi": "भवन निर्माण सामग्री (सीमेंट, कंक्रीट, ईंट, पत्थर, टिम्बर एवं पेंट्स)",
            "subtopics": [
              "सीमेंट के प्रकार, संरचना एवं फील्ड टेस्ट",
              "कंक्रीट मिक्स डिजाइन, वर्केबिलिटी एवं संपीडन सामर्थ्य",
              "ईंटों का वर्गीकरण एवं परीक्षण",
              "टिम्बर, पेंट्स, वार्निश एवं फेरस/नॉन-फेरस धातुएँ"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_2",
            "name": "Building Construction & Foundations",
            "nameHi": "भवन निर्माण तकनीक एवं नींव (Foundations)",
            "subtopics": [
              "चिनाई कार्य (Brick & Stone Masonry)",
              "उथली एवं गहरी नींव (Shallow & Deep Foundations)",
              "डैम्प प्रूफ कोर्स (DPC) एवं प्लास्टरिंग",
              "दरवाजे, खिड़कियां, सीढ़ियां एवं छतें"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_3",
            "name": "Strength of Materials & Structural Analysis",
            "nameHi": "पदार्थों की सामर्थ्य एवं संरचनात्मक विश्लेषण",
            "subtopics": [
              "प्रतिबल एवं विकृति (Stress & Strain), हुक का नियम",
              "कतरनी बल एवं बंकन आघूर्ण (SFD & BMD)",
              "ढलान एवं विक्षेपण (Slope & Deflection)",
              "कॉलम एवं स्ट्रट्स (यूलर सूत्र)"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_4",
            "name": "Design of Reinforced Concrete Structures (IS 456)",
            "nameHi": "आरसीसी संरचनाओं का डिजाइन (IS 456:2000)",
            "subtopics": [
              "सीमा अवस्था विधि (Limit State Method) सिद्धांत",
              "एकल एवं दोहरे प्रबलित बीम का डिजाइन",
              "टी-बीम एवं एल-बीम विश्लेषण",
              "स्लैब (One-way & Two-way), कॉलम एवं फुटिंग्स डिजाइन"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_5",
            "name": "Design of Steel Structures (IS 800)",
            "nameHi": "स्टील संरचनाओं का डिजाइन (IS 800:2007)",
            "subtopics": [
              "बोल्टेड एवं वेल्डेड जोड़ (Bolted & Welded Connections)",
              "तनाव एवं संपीडन सदस्य डिजाइन (Tension & Compression Members)",
              "प्लेट गर्डर एवं रूफ ट्रस (Roof Trusses)"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_6",
            "name": "Soil Mechanics & Geotechnical Engineering",
            "nameHi": "सॉइल मैकेनिक्स एवं भू-तकनीकी इंजीनियरिंग",
            "subtopics": [
              "मृदा के तीन प्रावस्था संबंध (Phase Relations)",
              "वर्गीकरण (IS Soil Classification)",
              "पारगम्यता (Permeability) एवं सीपेज",
              "मृदा संपीडन एवं कतरनी सामर्थ्य (Shear Strength)",
              "धारण क्षमता (Bearing Capacity of Soils)"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_7",
            "name": "Surveying, Levelling & Modern Tools",
            "nameHi": "सर्वेइंग, लेवलिंग एवं आधुनिक उपकरण (Total Station, GPS)",
            "subtopics": [
              "चेन एवं कंपास सर्वेइंग (Prismatic Compass)",
              "लेवलिंग एवं कंटूरिंग (Levelling & Contouring)",
              "थोडोलाइट एवं टैकोमेट्रिक सर्वेइंग",
              "टोटल स्टेशन, जीपीएस (GPS) एवं जीआईएस (GIS) मूल बातें"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_8",
            "name": "Fluid Mechanics & Hydraulics",
            "nameHi": "फ्लूइड मैकेनिक्स, हाइड्रोलिक्स एवं खुला चैनल प्रवाह",
            "subtopics": [
              "द्रव के गुण, हाइड्रोस्टैटिक दाब",
              "बरनौली प्रमेय एवं वेंच्युरीमीटर",
              "पाइपों में घर्षण हानि (Darcy-Weisbach)",
              "ओपन चैनल फ्लो (Manning एवं Chezy सूत्र)"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_9",
            "name": "Highway, Traffic & Transportation",
            "nameHi": "हाईवे एवं ट्रांसपोर्टेशन इंजीनियरिंग",
            "subtopics": [
              "हाईवे ज्यामितीय डिजाइन (Camber, Super-elevation, Sight Distance)",
              "पेवमेंट डिजाइन (Flexible & Rigid Pavements)",
              "ट्रैफिक इंजीनियरिंग एवं सड़क संकेत"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_10",
            "name": "Environmental Engineering & Water Supply",
            "nameHi": "जल आपूर्ति एवं सीवरेज इंजीनियरिंग",
            "subtopics": [
              "जल मांग आकलन एवं गुणवत्ता मानक",
              "जल शोधन प्रक्रियाएं (Sedimentation, Filtration, Chlorination)",
              "सीवरेज प्रणाली एवं सीवेज उपचार (BOD/COD)"
            ],
            "importanceScore": 8
          },
          {
            "id": "se_civ_11",
            "name": "Estimation, Costing & Project Management",
            "nameHi": "एस्टिमेशन, कॉस्टिंग, वैल्यूएशन एवं सीपीएम/पर्ट",
            "subtopics": [
              "विस्तृत आकलन विधियाँ (Detailed Estimates)",
              "दर विश्लेषण (Rate Analysis) एवं पीडब्ल्यूडी दर अनुसूची",
              "मूल्यांकन (Valuation Methods)",
              "नेटवर्क विश्लेषण (CPM एवं PERT)"
            ],
            "importanceScore": 8
          }
        ]
      }
    ]
  },
  "cgv_naib": {
    "name": "Naib Tehsildar",
    "fullName": "CG Naib Tehsildar / Revenue Administration Exam",
    "icon": "⚖️",
    "category": "administrative",
    "description": "नायब तहसीलदार / राजस्व प्रशासन भर्ती परीक्षा — 150 अंक",
    "eligibility": "Graduate in Any Discipline",
    "pattern": {
      "totalMarks": 150,
      "time": "3 Hours",
      "type": "Objective MCQ (150 Questions, 150 Marks)",
      "papers": [
        {
          "paper": "छत्तीसगढ़ भू-राजस्व संहिता एवं राजस्व प्रशासन",
          "marks": 40
        },
        {
          "paper": "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
          "marks": 40
        },
        {
          "paper": "भारत सामान्य ज्ञान एवं संविधान",
          "marks": 30
        },
        {
          "paper": "मानसिक योग्यता एवं अंकगणित",
          "marks": 20
        },
        {
          "paper": "सामान्य हिंदी एवं छत्तीसगढ़ी भाषा",
          "marks": 20
        }
      ]
    },
    "subjects": [
      {
        "id": "naib_rev_code",
        "name": "छत्तीसगढ़ भू-राजस्व संहिता एवं राजस्व प्रशासन",
        "weightage": 40,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (40 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "naib_rev_code_ch_1",
            "name": "भू-राजस्व संहिता संरचना एवं परिभाषाएं",
            "topics": [
              {
                "id": "naib_rc_1",
                "name": "CG Land Revenue Code 1959 Overview",
                "nameHi": "छत्तीसगढ़ भू-राजस्व संहिता 1959 की संरचना, अध्याय एवं प्रमुख परिभाषाएं",
                "subtopics": [
                  "संहिता की ऐतिहासिक पृष्ठभूमि एवं विस्तार",
                  "कृषि वर्ष, भूमि, भूमिधारी, लगान एवं राजस्व वर्ष परिभाषाएं",
                  "राजस्व मंडल (Board of Revenue) का गठन एवं शक्तियां",
                  "राजस्व न्यायालयों की अधिकारिता एवं कार्यप्रणाली"
                ],
                "importanceScore": 8
              },
              {
                "id": "naib_rc_2",
                "name": "Revenue Officers & Hierarchy",
                "nameHi": "राजस्व अधिकारियों के पदक्रम, अधिकारिता एवं शक्तियां",
                "subtopics": [
                  "कलेक्टर, अपर कलेक्टर, अनुविभागीय अधिकारी (SDO-R)",
                  "तहसीलदार, नायब तहसीलदार एवं उनके न्यायालय",
                  "राजस्व निरीक्षक (RI) एवं पटवारी के कर्तव्य व हलका प्रबंधन",
                  "तलाशी, समन एवं अभिलेख तलब करने की शक्तियां"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "naib_rev_code_ch_2",
            "name": "भू-अभिलेख एवं नामांतरण प्रक्रिया",
            "topics": [
              {
                "id": "naib_rc_3",
                "name": "Land Records & Bhuiyan Portal",
                "nameHi": "भू-अभिलेख, खसरा, खतौनी, बी-1, नक्शा एवं भूइयां (Bhuiyan) डिजिटल पोर्टल",
                "subtopics": [
                  "अधिकार अभिलेख (Record of Rights) एवं वार्षिक खतौनी",
                  "खसरा एवं भू-नक्शा अद्यतनीकरण",
                  "भुइयां पोर्टल, डिजिटल सिग्नेचर एवं किसान किताब"
                ],
                "importanceScore": 8
              },
              {
                "id": "naib_rc_4",
                "name": "Mutation, Demarcation & Partition",
                "nameHi": "नामांतरण (Mutation), सीमांकन (Demarcation), बंटवारा एवं हक-त्याग",
                "subtopics": [
                  "फौती एवं पंजीकृत विक्रय नामांतरण प्रक्रिया",
                  "विवादित एवं निर्विवाद नामांतरण",
                  "भूमि का सीमांकन एवं पंचनामा",
                  "सह-खातेदारों के मध्य खाता बंटवारा"
                ],
                "importanceScore": 8
              },
              {
                "id": "naib_rc_5",
                "name": "Land Acquisition & Revenue Appeals",
                "nameHi": "भू-अर्जन, पट्टा वितरण, नजूल प्रबंधन, अपील एवं पुनरीक्षण",
                "subtopics": [
                  "शासकीय पट्टा आवंटन नियम एवं नजूल भूमि प्रबंधन",
                  "कृषि भूमि का व्यपवर्तन (Diversion)",
                  "राजस्व मामलों में प्रथम अपील, द्वितीय अपील एवं पुनरीक्षण (Revision)",
                  "उचित मुआवजा एवं पारदर्शिता भू-अर्जन अधिनियम 2013"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "naib_rc_1",
            "name": "CG Land Revenue Code 1959 Overview",
            "nameHi": "छत्तीसगढ़ भू-राजस्व संहिता 1959 की संरचना, अध्याय एवं प्रमुख परिभाषाएं",
            "subtopics": [
              "संहिता की ऐतिहासिक पृष्ठभूमि एवं विस्तार",
              "कृषि वर्ष, भूमि, भूमिधारी, लगान एवं राजस्व वर्ष परिभाषाएं",
              "राजस्व मंडल (Board of Revenue) का गठन एवं शक्तियां",
              "राजस्व न्यायालयों की अधिकारिता एवं कार्यप्रणाली"
            ],
            "importanceScore": 8
          },
          {
            "id": "naib_rc_2",
            "name": "Revenue Officers & Hierarchy",
            "nameHi": "राजस्व अधिकारियों के पदक्रम, अधिकारिता एवं शक्तियां",
            "subtopics": [
              "कलेक्टर, अपर कलेक्टर, अनुविभागीय अधिकारी (SDO-R)",
              "तहसीलदार, नायब तहसीलदार एवं उनके न्यायालय",
              "राजस्व निरीक्षक (RI) एवं पटवारी के कर्तव्य व हलका प्रबंधन",
              "तलाशी, समन एवं अभिलेख तलब करने की शक्तियां"
            ],
            "importanceScore": 8
          },
          {
            "id": "naib_rc_3",
            "name": "Land Records & Bhuiyan Portal",
            "nameHi": "भू-अभिलेख, खसरा, खतौनी, बी-1, नक्शा एवं भूइयां (Bhuiyan) डिजिटल पोर्टल",
            "subtopics": [
              "अधिकार अभिलेख (Record of Rights) एवं वार्षिक खतौनी",
              "खसरा एवं भू-नक्शा अद्यतनीकरण",
              "भुइयां पोर्टल, डिजिटल सिग्नेचर एवं किसान किताब"
            ],
            "importanceScore": 8
          },
          {
            "id": "naib_rc_4",
            "name": "Mutation, Demarcation & Partition",
            "nameHi": "नामांतरण (Mutation), सीमांकन (Demarcation), बंटवारा एवं हक-त्याग",
            "subtopics": [
              "फौती एवं पंजीकृत विक्रय नामांतरण प्रक्रिया",
              "विवादित एवं निर्विवाद नामांतरण",
              "भूमि का सीमांकन एवं पंचनामा",
              "सह-खातेदारों के मध्य खाता बंटवारा"
            ],
            "importanceScore": 8
          },
          {
            "id": "naib_rc_5",
            "name": "Land Acquisition & Revenue Appeals",
            "nameHi": "भू-अर्जन, पट्टा वितरण, नजूल प्रबंधन, अपील एवं पुनरीक्षण",
            "subtopics": [
              "शासकीय पट्टा आवंटन नियम एवं नजूल भूमि प्रबंधन",
              "कृषि भूमि का व्यपवर्तन (Diversion)",
              "राजस्व मामलों में प्रथम अपील, द्वितीय अपील एवं पुनरीक्षण (Revision)",
              "उचित मुआवजा एवं पारदर्शिता भू-अर्जन अधिनियम 2013"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "naib_cg",
        "name": "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        "weightage": 40,
        "importance": "Highest",
        "pyqFrequency": "Very High (40 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "naib_cg_ch_1",
            "name": "छत्तीसगढ़ का इतिहास एवं स्वतंत्रता संग्राम",
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
              }
            ]
          },
          {
            "id": "naib_cg_ch_2",
            "name": "छत्तीसगढ़ भूगोल, वन, नदियां व खनिज",
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
              }
            ]
          },
          {
            "id": "naib_cg_ch_3",
            "name": "जनजातियां, लोककला एवं संस्कृति",
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
                "id": "cg_cul_8",
                "name": "Important Temples",
                "nameHi": "प्रमुख मंदिर",
                "subtopics": [
                  "बम्लेश्वरी",
                  "लक्ष्मण मंदिर",
                  "भोरमदेव"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "naib_cg_ch_4",
            "name": "प्रशासन, पंचायती राज व अर्थव्यवस्था",
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
          }
        ]
      },
      {
        "id": "naib_india",
        "name": "भारत सामान्य ज्ञान एवं संविधान",
        "weightage": 30,
        "importance": "High",
        "pyqFrequency": "High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "naib_india_ch_1",
            "name": "भारतीय संविधान, राजव्यवस्था व शासन प्रणाली",
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
            "id": "naib_india_ch_2",
            "name": "भारतीय इतिहास, भूगोल एवं अर्थव्यवस्था",
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
                "id": "ind_eco_3",
                "name": "Budget and Taxation",
                "nameHi": "बजट एवं कराधान",
                "subtopics": [
                  "GST",
                  "प्रत्यक्ष कर",
                  "अप्रत्यक्ष कर"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "naib_india_ch_3",
            "name": "समसामयिक घटनाएं",
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
        "id": "naib_aptitude",
        "name": "मानसिक योग्यता एवं अंकगणित",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "naib_aptitude_ch_1",
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
            "id": "naib_aptitude_ch_2",
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
          }
        ]
      },
      {
        "id": "naib_lang",
        "name": "सामान्य हिंदी एवं छत्तीसगढ़ी भाषा",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "naib_lang_ch_1",
            "name": "सामान्य हिंदी व्याकरण",
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
              }
            ]
          },
          {
            "id": "naib_lang_ch_2",
            "name": "छत्तीसगढ़ी भाषा एवं मुहावरे",
            "topics": [
              {
                "id": "naib_chhatt_1",
                "name": "Chhattisgarhi Grammar & Idioms",
                "nameHi": "छत्तीसगढ़ी व्याकरण, शब्दकोश एवं हाना/लोकोक्तियां",
                "subtopics": [
                  "छत्तीसगढ़ी संज्ञा, सर्वनाम, विशेषण एवं क्रिया",
                  "छत्तीसगढ़ी मुहावरे, हाना एवं जनउला",
                  "प्रशासनिक छत्तीसगढ़ी शब्दावली"
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
            "id": "naib_chhatt_1",
            "name": "Chhattisgarhi Grammar & Idioms",
            "nameHi": "छत्तीसगढ़ी व्याकरण, शब्दकोश एवं हाना/लोकोक्तियां",
            "subtopics": [
              "छत्तीसगढ़ी संज्ञा, सर्वनाम, विशेषण एवं क्रिया",
              "छत्तीसगढ़ी मुहावरे, हाना एवं जनउला",
              "प्रशासनिक छत्तीसगढ़ी शब्दावली"
            ],
            "importanceScore": 8
          }
        ]
      }
    ]
  },
  "cgv_health": {
    "name": "Staff Nurse / ANM / Health",
    "fullName": "CG Health Department Staff Nurse & Auxiliary Nurse Midwife Recruitment Exam",
    "icon": "🩺",
    "category": "health",
    "description": "स्वास्थ्य विभाग स्टाफ नर्स, एएनएम एवं स्वास्थ्य कार्यकर्ता भर्ती परीक्षा — 100 अंक",
    "eligibility": "B.Sc Nursing / GNM / ANM Course with CG Nursing Council Registration",
    "pattern": {
      "totalMarks": 100,
      "time": "2 Hours",
      "type": "Objective MCQ (100 Questions, 100 Marks)",
      "papers": [
        {
          "paper": "Part 1: सामान्य ज्ञान, छत्तीसगढ़ GK एवं हिंदी",
          "marks": 20
        },
        {
          "paper": "Part 2: नर्सिंग एवं बुनियादी स्वास्थ्य विज्ञान",
          "marks": 80
        }
      ]
    },
    "subjects": [
      {
        "id": "hlth_non_tech",
        "name": "सामान्य ज्ञान, छत्तीसगढ़ GK एवं हिंदी",
        "weightage": 20,
        "importance": "Medium",
        "pyqFrequency": "Medium (20 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "hlth_non_tech_ch_1",
            "name": "छत्तीसगढ़ सामान्य ज्ञान एवं स्वास्थ्य योजनाएं",
            "topics": [
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
            "id": "hlth_non_tech_ch_2",
            "name": "भारत सामान्य ज्ञान व सामान्य विज्ञान",
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
                "id": "bio_11",
                "name": "Immunity and Vaccines",
                "nameHi": "प्रतिरक्षा एवं टीके",
                "subtopics": [
                  "Antibodies",
                  "Vaccination"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "hlth_non_tech_ch_3",
            "name": "सामान्य हिंदी",
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
            "id": "bio_11",
            "name": "Immunity and Vaccines",
            "nameHi": "प्रतिरक्षा एवं टीके",
            "subtopics": [
              "Antibodies",
              "Vaccination"
            ],
            "importanceScore": 9
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
        "id": "hlth_nursing_core",
        "name": "नर्सिंग एवं स्वास्थ्य विज्ञान (Nursing Sciences)",
        "weightage": 80,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (80 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "hlth_nursing_core_ch_1",
            "name": "Human Anatomy & Fundamentals of Nursing",
            "topics": [
              {
                "id": "hlth_nur_1",
                "name": "Human Anatomy & Physiology",
                "nameHi": "मानव शरीर रचना एवं शरीर क्रिया विज्ञान (Anatomy & Physiology)",
                "subtopics": [
                  "कोशिका, ऊतक एवं कंकाल तंत्र",
                  "पाचन, श्वसन एवं परिसंचरण तंत्र कार्यप्रणाली",
                  "तंत्रिका तंत्र एवं अंतःस्रावी ग्रंथियां",
                  "संवेदी अंग एवं उत्सर्जन तंत्र"
                ],
                "importanceScore": 8
              },
              {
                "id": "hlth_nur_2",
                "name": "Fundamentals of Nursing & First Aid",
                "nameHi": "नर्सिंग के मूल सिद्धांत, प्राथमिक चिकित्सा एवं सीपीआर (CPR)",
                "subtopics": [
                  "रोगी देखभाल की बुनियादी अवधारणाएं एवं नैतिकता",
                  "वाइटल साइन्स (तापमान, नाड़ी, श्वसन, रक्तचाप) मापन",
                  "घाव की देखभाल, ड्रेसिंग एवं बाँझपन (Sterilization)",
                  "आपातकालीन प्राथमिक चिकित्सा एवं सीपीआर (CPR) तकनीक",
                  "दवा प्रशासन के अधिकार (Rights of Drug Administration)"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "hlth_nursing_core_ch_2",
            "name": "Community Health, Maternal & Child Nursing",
            "topics": [
              {
                "id": "hlth_nur_3",
                "name": "Community Health Nursing & Immunization",
                "nameHi": "कम्युनिटी हेल्थ नर्सिंग एवं राष्ट्रीय टीकाकरण कार्यक्रम",
                "subtopics": [
                  "प्राथमिक स्वास्थ्य केंद्र (PHC), CHC एवं उपकेंद्र संरचना",
                  "राष्ट्रीय स्वास्थ्य मिशन (NHM) एवं प्रमुख स्वास्थ्य कार्यक्रम",
                  "सार्वभौमिक टीकाकरण कार्यक्रम (UIP) एवं कोल्ड चेन प्रबंधन",
                  "संचारी रोग नियंत्रण (मलेरिया, टीबी, कुष्ठ, एड्स)"
                ],
                "importanceScore": 8
              },
              {
                "id": "hlth_nur_4",
                "name": "Midwifery & Obstetrical Nursing",
                "nameHi": "मिडवाइफरी एवं प्रसूति नर्सिंग (Maternal Care)",
                "subtopics": [
                  "गर्भावस्था के लक्षण एवं प्रसव पूर्व (ANC) देखभाल",
                  "सामान्य प्रसव प्रक्रिया एवं विभिन्न चरण",
                  "प्रसव पश्चात (PNC) देखभाल एवं स्तनपान",
                  "उच्च जोखिम गर्भावस्था एवं आपातकालीन प्रसूति देखभाल"
                ],
                "importanceScore": 8
              },
              {
                "id": "hlth_nur_5",
                "name": "Pediatric Nursing & Child Nutrition",
                "nameHi": "बाल स्वास्थ्य नर्सिंग (Pediatric Nursing) एवं बाल पोषण",
                "subtopics": [
                  "नवजात शिशु देखभाल (KMC एवं APGAR स्कोर)",
                  "शिशु पोषण, कुपोषण (PEM, Marasmus, Kwashiorkor) प्रबंधन",
                  "बाल्यावस्था के सामान्य रोग (दस्त, निमोनिया, खसरा)",
                  "आईएमएनसीआई (IMNCI) दिशानिर्देश"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "hlth_nursing_core_ch_3",
            "name": "Medical-Surgical Nursing & Pharmacology",
            "topics": [
              {
                "id": "hlth_nur_6",
                "name": "Medical-Surgical Nursing & Infection Control",
                "nameHi": "मेडिकल-सर्जिकल नर्सिंग एवं अस्पताल संक्रमण नियंत्रण",
                "subtopics": [
                  "श्वसन, हृदय एवं जठरांत्र विकारों की नर्सिंग देखभाल",
                  "प्री-ऑपरेटिव एवं पोस्ट-ऑपरेटिव नर्सिंग देखभाल",
                  "अस्पताल संक्रमण नियंत्रण एवं बायोमेडिकल वेस्ट (BMW)",
                  "व्यक्तिगत सुरक्षा उपकरण (PPE) एवं हाथ स्वच्छता"
                ],
                "importanceScore": 8
              },
              {
                "id": "hlth_nur_7",
                "name": "Pharmacology, Microbiology & Mental Health",
                "nameHi": "फार्माकोलॉजी, माइक्रोबायोलॉजी एवं मानसिक स्वास्थ्य नर्सिंग",
                "subtopics": [
                  "आपातकालीन एवं सामान्य दवाओं का वर्गीकरण व खुराक",
                  "जीवाणु, विषाणु, कवक एवं संक्रामक एजेंट",
                  "मानसिक स्वास्थ्य के मूल सिद्धांत एवं मनोरोग नर्सिंग"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "hlth_nur_1",
            "name": "Human Anatomy & Physiology",
            "nameHi": "मानव शरीर रचना एवं शरीर क्रिया विज्ञान (Anatomy & Physiology)",
            "subtopics": [
              "कोशिका, ऊतक एवं कंकाल तंत्र",
              "पाचन, श्वसन एवं परिसंचरण तंत्र कार्यप्रणाली",
              "तंत्रिका तंत्र एवं अंतःस्रावी ग्रंथियां",
              "संवेदी अंग एवं उत्सर्जन तंत्र"
            ],
            "importanceScore": 8
          },
          {
            "id": "hlth_nur_2",
            "name": "Fundamentals of Nursing & First Aid",
            "nameHi": "नर्सिंग के मूल सिद्धांत, प्राथमिक चिकित्सा एवं सीपीआर (CPR)",
            "subtopics": [
              "रोगी देखभाल की बुनियादी अवधारणाएं एवं नैतिकता",
              "वाइटल साइन्स (तापमान, नाड़ी, श्वसन, रक्तचाप) मापन",
              "घाव की देखभाल, ड्रेसिंग एवं बाँझपन (Sterilization)",
              "आपातकालीन प्राथमिक चिकित्सा एवं सीपीआर (CPR) तकनीक",
              "दवा प्रशासन के अधिकार (Rights of Drug Administration)"
            ],
            "importanceScore": 8
          },
          {
            "id": "hlth_nur_3",
            "name": "Community Health Nursing & Immunization",
            "nameHi": "कम्युनिटी हेल्थ नर्सिंग एवं राष्ट्रीय टीकाकरण कार्यक्रम",
            "subtopics": [
              "प्राथमिक स्वास्थ्य केंद्र (PHC), CHC एवं उपकेंद्र संरचना",
              "राष्ट्रीय स्वास्थ्य मिशन (NHM) एवं प्रमुख स्वास्थ्य कार्यक्रम",
              "सार्वभौमिक टीकाकरण कार्यक्रम (UIP) एवं कोल्ड चेन प्रबंधन",
              "संचारी रोग नियंत्रण (मलेरिया, टीबी, कुष्ठ, एड्स)"
            ],
            "importanceScore": 8
          },
          {
            "id": "hlth_nur_4",
            "name": "Midwifery & Obstetrical Nursing",
            "nameHi": "मिडवाइफरी एवं प्रसूति नर्सिंग (Maternal Care)",
            "subtopics": [
              "गर्भावस्था के लक्षण एवं प्रसव पूर्व (ANC) देखभाल",
              "सामान्य प्रसव प्रक्रिया एवं विभिन्न चरण",
              "प्रसव पश्चात (PNC) देखभाल एवं स्तनपान",
              "उच्च जोखिम गर्भावस्था एवं आपातकालीन प्रसूति देखभाल"
            ],
            "importanceScore": 8
          },
          {
            "id": "hlth_nur_5",
            "name": "Pediatric Nursing & Child Nutrition",
            "nameHi": "बाल स्वास्थ्य नर्सिंग (Pediatric Nursing) एवं बाल पोषण",
            "subtopics": [
              "नवजात शिशु देखभाल (KMC एवं APGAR स्कोर)",
              "शिशु पोषण, कुपोषण (PEM, Marasmus, Kwashiorkor) प्रबंधन",
              "बाल्यावस्था के सामान्य रोग (दस्त, निमोनिया, खसरा)",
              "आईएमएनसीआई (IMNCI) दिशानिर्देश"
            ],
            "importanceScore": 8
          },
          {
            "id": "hlth_nur_6",
            "name": "Medical-Surgical Nursing & Infection Control",
            "nameHi": "मेडिकल-सर्जिकल नर्सिंग एवं अस्पताल संक्रमण नियंत्रण",
            "subtopics": [
              "श्वसन, हृदय एवं जठरांत्र विकारों की नर्सिंग देखभाल",
              "प्री-ऑपरेटिव एवं पोस्ट-ऑपरेटिव नर्सिंग देखभाल",
              "अस्पताल संक्रमण नियंत्रण एवं बायोमेडिकल वेस्ट (BMW)",
              "व्यक्तिगत सुरक्षा उपकरण (PPE) एवं हाथ स्वच्छता"
            ],
            "importanceScore": 8
          },
          {
            "id": "hlth_nur_7",
            "name": "Pharmacology, Microbiology & Mental Health",
            "nameHi": "फार्माकोलॉजी, माइक्रोबायोलॉजी एवं मानसिक स्वास्थ्य नर्सिंग",
            "subtopics": [
              "आपातकालीन एवं सामान्य दवाओं का वर्गीकरण व खुराक",
              "जीवाणु, विषाणु, कवक एवं संक्रामक एजेंट",
              "मानसिक स्वास्थ्य के मूल सिद्धांत एवं मनोरोग नर्सिंग"
            ],
            "importanceScore": 8
          }
        ]
      }
    ]
  },
  "cgv_accountant": {
    "name": "Accountant / Auditor",
    "fullName": "CG Vyapam Accountant, Junior Accountant & Auditor Recruitment Exam",
    "icon": "📊",
    "category": "commerce",
    "description": "सहायक लेखापाल, कनिष्ठ लेखापाल एवं संपरीक्षक भर्ती परीक्षा — 150 अंक",
    "eligibility": "B.Com / M.Com / Commerce Graduate",
    "pattern": {
      "totalMarks": 150,
      "time": "3 Hours",
      "type": "Objective MCQ (150 Questions, 150 Marks)",
      "papers": [
        {
          "paper": "बहीखाता एवं वित्तीय लेखांकन (Financial Accounting)",
          "marks": 50
        },
        {
          "paper": "अंकेक्षण, कराधान एवं वित्तीय प्रबंधन",
          "marks": 30
        },
        {
          "paper": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
          "marks": 30
        },
        {
          "paper": "कंप्यूटर ज्ञान (Tally, Excel एवं एकाउंटिंग सॉफ्टवेयर)",
          "marks": 20
        },
        {
          "paper": "सामान्य हिंदी एवं English Language",
          "marks": 20
        }
      ]
    },
    "subjects": [
      {
        "id": "acc_fin_core",
        "name": "बहीखाता एवं वित्तीय लेखांकन (Financial Accounting)",
        "weightage": 50,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (50 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "acc_fin_core_ch_1",
            "name": "Book Keeping & Accounting Principles",
            "topics": [
              {
                "id": "acc_b_1",
                "name": "Book Keeping Principles & Double Entry",
                "nameHi": "पुस्तपालन के मूल सिद्धांत एवं दोहरा लेखा प्रणाली (Double Entry System)",
                "subtopics": [
                  "लेखांकन की अवधारणाएँ एवं परंपराएँ (Accounting Concepts)",
                  "खातों के प्रकार (व्यक्तिगत, वास्तविक, नाममात्र) एवं स्वर्ण नियम",
                  "मूल प्रविष्टि की पुस्तकें एवं रोजनामचा (Journal Entries)",
                  "सहायक पुस्तकें (Cash Book, Purchase, Sales Book)"
                ],
                "importanceScore": 8
              },
              {
                "id": "acc_b_2",
                "name": "Ledger, Trial Balance & Error Rectification",
                "nameHi": "खाता बही (Ledger), तलपट (Trial Balance) एवं अशुद्धि शोधन",
                "subtopics": [
                  "खाता बही खतौनी एवं शेष निकालना",
                  "तलपट तैयार करना एवं उद्देश्य",
                  "लेखांकन अशुद्धियों के प्रकार (Errors of Omission, Commission, Principle)",
                  "उचंत खाता (Suspense Account) एवं सुधार प्रविष्टियां"
                ],
                "importanceScore": 8
              },
              {
                "id": "acc_b_3",
                "name": "Bank Reconciliation & Depreciation",
                "nameHi": "बैंक समाधान विवरण (BRS), मूल्यह्रास एवं संचय",
                "subtopics": [
                  "बैंक समाधान विवरण (BRS) के कारण एवं तैयारी",
                  "मूल्यह्रास (Depreciation) - सरल रेखा एवं क्रमागत ह्रास पद्धति",
                  "प्रावधान एवं संचय (Provisions & Reserves)"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "acc_fin_core_ch_2",
            "name": "Final Accounts & Corporate Accounting",
            "topics": [
              {
                "id": "acc_b_4",
                "name": "Final Accounts of Sole Trader & Firms",
                "nameHi": "अंतिम खाते (व्यापार खाता, लाभ-हानि खाता, स्थिति विवरण) एवं समायोजन",
                "subtopics": [
                  "व्यापार खाता (Trading Account) एवं सकल लाभ",
                  "लाभ-हानि खाता (P&L Account) एवं शुद्ध लाभ",
                  "स्थिति विवरण (Balance Sheet) वर्गीकरण",
                  "समायोजन प्रविष्टियां (Adustment Entries - Closing Stock, Outstanding, Prepaid)"
                ],
                "importanceScore": 8
              },
              {
                "id": "acc_b_5",
                "name": "Partnership & Company Accounts",
                "nameHi": "साझेदारी खाते एवं कंपनी लेखांकन (Shares & Debentures)",
                "subtopics": [
                  "साझेदारी संलेख, लाभ-हानि नियोजन खाता",
                  "साझेदार का प्रवेश, अवकाश ग्रहण एवं फर्म का विघटन",
                  "अंश पूंजी के प्रकार, अंशों का निर्गमन, आवंटन एवं हरण (Forfeiture)",
                  "ऋणपत्रों का निर्गमन एवं शोधन"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "acc_b_1",
            "name": "Book Keeping Principles & Double Entry",
            "nameHi": "पुस्तपालन के मूल सिद्धांत एवं दोहरा लेखा प्रणाली (Double Entry System)",
            "subtopics": [
              "लेखांकन की अवधारणाएँ एवं परंपराएँ (Accounting Concepts)",
              "खातों के प्रकार (व्यक्तिगत, वास्तविक, नाममात्र) एवं स्वर्ण नियम",
              "मूल प्रविष्टि की पुस्तकें एवं रोजनामचा (Journal Entries)",
              "सहायक पुस्तकें (Cash Book, Purchase, Sales Book)"
            ],
            "importanceScore": 8
          },
          {
            "id": "acc_b_2",
            "name": "Ledger, Trial Balance & Error Rectification",
            "nameHi": "खाता बही (Ledger), तलपट (Trial Balance) एवं अशुद्धि शोधन",
            "subtopics": [
              "खाता बही खतौनी एवं शेष निकालना",
              "तलपट तैयार करना एवं उद्देश्य",
              "लेखांकन अशुद्धियों के प्रकार (Errors of Omission, Commission, Principle)",
              "उचंत खाता (Suspense Account) एवं सुधार प्रविष्टियां"
            ],
            "importanceScore": 8
          },
          {
            "id": "acc_b_3",
            "name": "Bank Reconciliation & Depreciation",
            "nameHi": "बैंक समाधान विवरण (BRS), मूल्यह्रास एवं संचय",
            "subtopics": [
              "बैंक समाधान विवरण (BRS) के कारण एवं तैयारी",
              "मूल्यह्रास (Depreciation) - सरल रेखा एवं क्रमागत ह्रास पद्धति",
              "प्रावधान एवं संचय (Provisions & Reserves)"
            ],
            "importanceScore": 8
          },
          {
            "id": "acc_b_4",
            "name": "Final Accounts of Sole Trader & Firms",
            "nameHi": "अंतिम खाते (व्यापार खाता, लाभ-हानि खाता, स्थिति विवरण) एवं समायोजन",
            "subtopics": [
              "व्यापार खाता (Trading Account) एवं सकल लाभ",
              "लाभ-हानि खाता (P&L Account) एवं शुद्ध लाभ",
              "स्थिति विवरण (Balance Sheet) वर्गीकरण",
              "समायोजन प्रविष्टियां (Adustment Entries - Closing Stock, Outstanding, Prepaid)"
            ],
            "importanceScore": 8
          },
          {
            "id": "acc_b_5",
            "name": "Partnership & Company Accounts",
            "nameHi": "साझेदारी खाते एवं कंपनी लेखांकन (Shares & Debentures)",
            "subtopics": [
              "साझेदारी संलेख, लाभ-हानि नियोजन खाता",
              "साझेदार का प्रवेश, अवकाश ग्रहण एवं फर्म का विघटन",
              "अंश पूंजी के प्रकार, अंशों का निर्गमन, आवंटन एवं हरण (Forfeiture)",
              "ऋणपत्रों का निर्गमन एवं शोधन"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "acc_audit_tax",
        "name": "अंकेक्षण, कराधान एवं वित्तीय प्रबंधन",
        "weightage": 30,
        "importance": "Highest",
        "pyqFrequency": "High (30 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "acc_audit_tax_ch_1",
            "name": "Auditing & Taxation",
            "topics": [
              {
                "id": "acc_t_1",
                "name": "Auditing Principles & Vouching",
                "nameHi": "अंकेक्षण के सिद्धांत, प्रकार, प्रमाणन (Vouching) एवं आंतरिक नियंत्रण",
                "subtopics": [
                  "अंकेक्षण का अर्थ, उद्देश्य एवं लाभ",
                  "अंकेक्षण के प्रकार (सतत, वार्षिक, आंतरिक)",
                  "प्रमाणन (Vouching) - अंकेक्षण की रीढ़",
                  "अंकेक्षण प्रतिवेदन (Audit Report - Clean, Qualified)"
                ],
                "importanceScore": 8
              },
              {
                "id": "acc_t_2",
                "name": "Income Tax & GST Basics",
                "nameHi": "आयकर (Income Tax) एवं वस्तु व सेवा कर (GST) रूपरेखा",
                "subtopics": [
                  "आयकर के मूल सिद्धांत, कर निर्धारण वर्ष व गत वर्ष",
                  "आय के पांच शीर्ष (वेतन, गृह संपत्ति, व्यवसाय, पूंजीगत लाभ, अन्य)",
                  "आयकर की प्रमुख कटौतियां (80C से 80U) एवं टीडीएस (TDS)",
                  "GST का ढांचा (CGST, SGST, IGST), इनपुट टैक्स क्रेडिट (ITC) एवं ई-वे बिल"
                ],
                "importanceScore": 8
              },
              {
                "id": "acc_t_3",
                "name": "Financial Management & Ratio Analysis",
                "nameHi": "वित्तीय प्रबंधन, अनुपात विश्लेषण एवं बजटरी नियंत्रण",
                "subtopics": [
                  "वित्तीय प्रबंधन के उद्देश्य एवं कार्य",
                  "अनुपात विश्लेषण (Liquidity, Profitability, Solvency Ratios)",
                  "बजटरी नियंत्रण एवं रोकड़ प्रवाह विवरण (Cash Flow Statement)"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "acc_t_1",
            "name": "Auditing Principles & Vouching",
            "nameHi": "अंकेक्षण के सिद्धांत, प्रकार, प्रमाणन (Vouching) एवं आंतरिक नियंत्रण",
            "subtopics": [
              "अंकेक्षण का अर्थ, उद्देश्य एवं लाभ",
              "अंकेक्षण के प्रकार (सतत, वार्षिक, आंतरिक)",
              "प्रमाणन (Vouching) - अंकेक्षण की रीढ़",
              "अंकेक्षण प्रतिवेदन (Audit Report - Clean, Qualified)"
            ],
            "importanceScore": 8
          },
          {
            "id": "acc_t_2",
            "name": "Income Tax & GST Basics",
            "nameHi": "आयकर (Income Tax) एवं वस्तु व सेवा कर (GST) रूपरेखा",
            "subtopics": [
              "आयकर के मूल सिद्धांत, कर निर्धारण वर्ष व गत वर्ष",
              "आय के पांच शीर्ष (वेतन, गृह संपत्ति, व्यवसाय, पूंजीगत लाभ, अन्य)",
              "आयकर की प्रमुख कटौतियां (80C से 80U) एवं टीडीएस (TDS)",
              "GST का ढांचा (CGST, SGST, IGST), इनपुट टैक्स क्रेडिट (ITC) एवं ई-वे बिल"
            ],
            "importanceScore": 8
          },
          {
            "id": "acc_t_3",
            "name": "Financial Management & Ratio Analysis",
            "nameHi": "वित्तीय प्रबंधन, अनुपात विश्लेषण एवं बजटरी नियंत्रण",
            "subtopics": [
              "वित्तीय प्रबंधन के उद्देश्य एवं कार्य",
              "अनुपात विश्लेषण (Liquidity, Profitability, Solvency Ratios)",
              "बजटरी नियंत्रण एवं रोकड़ प्रवाह विवरण (Cash Flow Statement)"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "acc_gk",
        "name": "सामान्य ज्ञान एवं छत्तीसगढ़ GK",
        "weightage": 30,
        "importance": "High",
        "pyqFrequency": "High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "acc_gk_ch_1",
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
            "id": "acc_gk_ch_2",
            "name": "भारत का सामान्य ज्ञान व अर्थव्यवस्था",
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
                "id": "ca_eco_1",
                "name": "Union Budget",
                "nameHi": "केंद्रीय बजट",
                "subtopics": [
                  "Budget Highlights",
                  "Tax Reforms"
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
            "id": "ca_eco_1",
            "name": "Union Budget",
            "nameHi": "केंद्रीय बजट",
            "subtopics": [
              "Budget Highlights",
              "Tax Reforms"
            ],
            "importanceScore": 10
          }
        ]
      },
      {
        "id": "acc_comp",
        "name": "कंप्यूटर ज्ञान (Tally & Excel)",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "acc_comp_ch_1",
            "name": "कंप्यूटर मूल बातें एवं सॉफ्टवेयर",
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
              }
            ]
          },
          {
            "id": "acc_comp_ch_2",
            "name": "MS Excel एवं टैली एकाउंटिंग",
            "topics": [
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
                "id": "acc_tally_1",
                "name": "Computerized Accounting & Tally ERP",
                "nameHi": "कम्प्यूटरीकृत लेखांकन - टैली (Tally Prime/ERP) एवं वित्तीय रिपोर्ट्स",
                "subtopics": [
                  "कम्प्यूटरीकृत लेखांकन प्रणाली के लाभ एवं सुरक्षा",
                  "टैली में कंपनी निर्माण, लेजर एवं ग्रुप बनाना",
                  "वाउचर प्रविष्टि (Receipt, Payment, Contra, Journal, Sales, Purchase)",
                  "टैली में ट्रायल बैलेंस, P&L, बैलेंस शीट एवं GST रिटर्न"
                ],
                "importanceScore": 8
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
            "id": "acc_tally_1",
            "name": "Computerized Accounting & Tally ERP",
            "nameHi": "कम्प्यूटरीकृत लेखांकन - टैली (Tally Prime/ERP) एवं वित्तीय रिपोर्ट्स",
            "subtopics": [
              "कम्प्यूटरीकृत लेखांकन प्रणाली के लाभ एवं सुरक्षा",
              "टैली में कंपनी निर्माण, लेजर एवं ग्रुप बनाना",
              "वाउचर प्रविष्टि (Receipt, Payment, Contra, Journal, Sales, Purchase)",
              "टैली में ट्रायल बैलेंस, P&L, बैलेंस शीट एवं GST रिटर्न"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "acc_lang",
        "name": "सामान्य हिंदी एवं English Language",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "acc_lang_ch_1",
            "name": "सामान्य हिंदी व्याकरण",
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
            "id": "acc_lang_ch_2",
            "name": "General English Grammar & Vocab",
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
    ]
  },
  "cgv_steno_deo": {
    "name": "Steno / DEO",
    "fullName": "CG Vyapam Stenographer & Data Entry Operator (DEO) Recruitment Exam",
    "icon": "⌨️",
    "category": "clerical",
    "description": "शीघ्रलेखक (Stenographer) एवं डाटा एंट्री ऑपरेटर सीधी भर्ती परीक्षा — 100 अंक",
    "eligibility": "12th Pass / Graduate + DCA / PGDCA + Typing / Shorthand Certificate",
    "pattern": {
      "totalMarks": 100,
      "time": "2 Hours",
      "type": "Objective MCQ (100 Questions, 100 Marks) + Skill Test (Typing/Steno)",
      "papers": [
        {
          "paper": "कंप्यूटर ज्ञान एवं ऑफिस ऑटोमेशन",
          "marks": 40
        },
        {
          "paper": "सामान्य ज्ञान एवं छत्तीसगढ़ सामान्य ज्ञान",
          "marks": 30
        },
        {
          "paper": "सामान्य हिंदी एवं English Language",
          "marks": 20
        },
        {
          "paper": "सामान्य मानसिक योग्यता एवं अंकगणित",
          "marks": 10
        }
      ]
    },
    "subjects": [
      {
        "id": "deo_comp",
        "name": "कंप्यूटर ज्ञान एवं ऑफिस ऑटोमेशन",
        "weightage": 40,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (40 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "deo_comp_ch_1",
            "name": "कंप्यूटर बुनियादी सिद्धांत एवं हार्डवेयर",
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
                "id": "comp_basic_2",
                "name": "History of Computers",
                "nameHi": "कंप्यूटर का इतिहास",
                "subtopics": [
                  "Abacus",
                  "Charles Babbage",
                  "ENIAC"
                ],
                "importanceScore": 8
              },
              {
                "id": "comp_basic_4",
                "name": "Types of Computers",
                "nameHi": "कंप्यूटर के प्रकार",
                "subtopics": [
                  "Micro Computer",
                  "Mini Computer",
                  "Mainframe",
                  "Super Computer"
                ],
                "importanceScore": 9
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
                "id": "comp_hw_2",
                "name": "Output Devices",
                "nameHi": "आउटपुट डिवाइस",
                "subtopics": [
                  "Monitor",
                  "Printer",
                  "Plotter",
                  "Speaker"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_hw_3",
                "name": "CPU and Memory",
                "nameHi": "CPU एवं मेमोरी",
                "subtopics": [
                  "ALU",
                  "CU",
                  "Registers",
                  "Cache Memory"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_hw_4",
                "name": "Storage Devices",
                "nameHi": "संग्रहण उपकरण",
                "subtopics": [
                  "Hard Disk",
                  "SSD",
                  "CD/DVD",
                  "Pen Drive"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "deo_comp_ch_2",
            "name": "ऑपरेटिंग सिस्टम एवं शॉर्टकट कीज़",
            "topics": [
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
                "id": "comp_sw_2",
                "name": "Operating System",
                "nameHi": "ऑपरेटिंग सिस्टम",
                "subtopics": [
                  "Windows",
                  "Linux",
                  "Android"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_exam_1",
                "name": "Computer Abbreviations",
                "nameHi": "कंप्यूटर संक्षिप्त रूप",
                "subtopics": [
                  "CPU",
                  "RAM",
                  "ROM",
                  "USB",
                  "URL"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_exam_2",
                "name": "Important Full Forms",
                "nameHi": "महत्वपूर्ण फुल फॉर्म",
                "subtopics": [
                  "WWW",
                  "HTTP",
                  "SMTP",
                  "HTML"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "deo_comp_ch_3",
            "name": "MS Office टूल्स एवं डॉक्यूमेंटेशन",
            "topics": [
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
                "id": "comp_office_3",
                "name": "MS PowerPoint",
                "nameHi": "एमएस पावरपॉइंट",
                "subtopics": [
                  "Slides",
                  "Animations",
                  "Presentation"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "deo_comp_ch_4",
            "name": "इंटरनेट, ईमेल एवं टाइपिंग फॉन्ट्स",
            "topics": [
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
              },
              {
                "id": "comp_net_4",
                "name": "Email",
                "nameHi": "ई-मेल",
                "subtopics": [
                  "Email Structure",
                  "CC",
                  "BCC",
                  "Attachments"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_cyber_1",
                "name": "Cyber Security Basics",
                "nameHi": "साइबर सुरक्षा की मूल बातें",
                "subtopics": [
                  "Cyber Threats",
                  "Cyber Attacks"
                ],
                "importanceScore": 10
              },
              {
                "id": "deo_typ_1",
                "name": "Typing Fonts & Office Documentation",
                "nameHi": "टाइपिंग फॉन्ट, इनस्क्रिप्ट, कृति देव एवं कार्यालयी ड्राफ्टिंग",
                "subtopics": [
                  "हिंदी यूनिकोड एवं इनस्क्रिप्ट (InScript) की-बोर्ड लेआउट",
                  "रेमिंगटन गेल एवं कृति देव फॉन्ट की विशेषताएं",
                  "कार्यालयी पत्र प्रारूप, टिप्पण एवं संक्षेपण प्रारूपण"
                ],
                "importanceScore": 8
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
            "id": "comp_basic_2",
            "name": "History of Computers",
            "nameHi": "कंप्यूटर का इतिहास",
            "subtopics": [
              "Abacus",
              "Charles Babbage",
              "ENIAC"
            ],
            "importanceScore": 8
          },
          {
            "id": "comp_basic_4",
            "name": "Types of Computers",
            "nameHi": "कंप्यूटर के प्रकार",
            "subtopics": [
              "Micro Computer",
              "Mini Computer",
              "Mainframe",
              "Super Computer"
            ],
            "importanceScore": 9
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
            "id": "comp_hw_2",
            "name": "Output Devices",
            "nameHi": "आउटपुट डिवाइस",
            "subtopics": [
              "Monitor",
              "Printer",
              "Plotter",
              "Speaker"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_hw_3",
            "name": "CPU and Memory",
            "nameHi": "CPU एवं मेमोरी",
            "subtopics": [
              "ALU",
              "CU",
              "Registers",
              "Cache Memory"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_hw_4",
            "name": "Storage Devices",
            "nameHi": "संग्रहण उपकरण",
            "subtopics": [
              "Hard Disk",
              "SSD",
              "CD/DVD",
              "Pen Drive"
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
            "id": "comp_sw_2",
            "name": "Operating System",
            "nameHi": "ऑपरेटिंग सिस्टम",
            "subtopics": [
              "Windows",
              "Linux",
              "Android"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_exam_1",
            "name": "Computer Abbreviations",
            "nameHi": "कंप्यूटर संक्षिप्त रूप",
            "subtopics": [
              "CPU",
              "RAM",
              "ROM",
              "USB",
              "URL"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_exam_2",
            "name": "Important Full Forms",
            "nameHi": "महत्वपूर्ण फुल फॉर्म",
            "subtopics": [
              "WWW",
              "HTTP",
              "SMTP",
              "HTML"
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
            "id": "comp_office_3",
            "name": "MS PowerPoint",
            "nameHi": "एमएस पावरपॉइंट",
            "subtopics": [
              "Slides",
              "Animations",
              "Presentation"
            ],
            "importanceScore": 9
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
          },
          {
            "id": "comp_net_4",
            "name": "Email",
            "nameHi": "ई-मेल",
            "subtopics": [
              "Email Structure",
              "CC",
              "BCC",
              "Attachments"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_cyber_1",
            "name": "Cyber Security Basics",
            "nameHi": "साइबर सुरक्षा की मूल बातें",
            "subtopics": [
              "Cyber Threats",
              "Cyber Attacks"
            ],
            "importanceScore": 10
          },
          {
            "id": "deo_typ_1",
            "name": "Typing Fonts & Office Documentation",
            "nameHi": "टाइपिंग फॉन्ट, इनस्क्रिप्ट, कृति देव एवं कार्यालयी ड्राफ्टिंग",
            "subtopics": [
              "हिंदी यूनिकोड एवं इनस्क्रिप्ट (InScript) की-बोर्ड लेआउट",
              "रेमिंगटन गेल एवं कृति देव फॉन्ट की विशेषताएं",
              "कार्यालयी पत्र प्रारूप, टिप्पण एवं संक्षेपण प्रारूपण"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "deo_gk",
        "name": "सामान्य ज्ञान एवं छत्तीसगढ़ सामान्य ज्ञान",
        "weightage": 30,
        "importance": "High",
        "pyqFrequency": "High (30 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "deo_gk_ch_1",
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
            "id": "deo_gk_ch_2",
            "name": "भारत का सामान्य ज्ञान व समसामयिकी",
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
        "id": "deo_lang",
        "name": "सामान्य हिंदी एवं English Language",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High (20 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "deo_lang_ch_1",
            "name": "सामान्य हिंदी व्याकरण",
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
            "id": "deo_lang_ch_2",
            "name": "General English Grammar",
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
              },
              {
                "id": "eng_use_2",
                "name": "Spellings",
                "nameHi": "वर्तनी",
                "subtopics": [
                  "Frequently Asked Words"
                ],
                "importanceScore": 9
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
          },
          {
            "id": "eng_use_2",
            "name": "Spellings",
            "nameHi": "वर्तनी",
            "subtopics": [
              "Frequently Asked Words"
            ],
            "importanceScore": 9
          }
        ]
      },
      {
        "id": "deo_aptitude",
        "name": "सामान्य मानसिक योग्यता एवं अंकगणित",
        "weightage": 10,
        "importance": "Medium",
        "pyqFrequency": "Medium (10 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "deo_aptitude_ch_1",
            "name": "रीजनिंग एवं अंकगणित मूल बातें",
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
                "id": "math_ratio_1",
                "name": "Ratio",
                "nameHi": "अनुपात",
                "subtopics": [
                  "Simple Ratio",
                  "Compound Ratio"
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
            "id": "math_ratio_1",
            "name": "Ratio",
            "nameHi": "अनुपात",
            "subtopics": [
              "Simple Ratio",
              "Compound Ratio"
            ],
            "importanceScore": 10
          }
        ]
      }
    ]
  },
  "cgv_lab_tech": {
    "name": "Lab Technician / Radiographer",
    "fullName": "CG Vyapam Lab Technician & Medical Technologist Recruitment Exam",
    "icon": "🔬",
    "category": "technical",
    "description": "प्रयोगशाला तकनीशियन एवं रेडियोग्राफर सीधी भर्ती परीक्षा — 100 अंक",
    "eligibility": "DMLT / BMLT / Radiography Diploma with CG Paramedical Council Registration",
    "pattern": {
      "totalMarks": 100,
      "time": "2 Hours",
      "type": "Objective MCQ (100 Questions, 100 Marks)",
      "papers": [
        {
          "paper": "Part 1: सामान्य ज्ञान, छत्तीसगढ़ GK एवं सामान्य विज्ञान",
          "marks": 20
        },
        {
          "paper": "Part 2: क्लिनिकल पैथोलॉजी एवं मेडिकल लैब टेक्नोलॉजी",
          "marks": 80
        }
      ]
    },
    "subjects": [
      {
        "id": "lab_non_tech",
        "name": "सामान्य ज्ञान एवं सामान्य विज्ञान",
        "weightage": 20,
        "importance": "Medium",
        "pyqFrequency": "Medium (20 Qs)",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "lab_non_tech_ch_1",
            "name": "छत्तीसगढ़ सामान्य ज्ञान एवं समसामयिकी",
            "topics": [
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
            "id": "lab_non_tech_ch_2",
            "name": "भारत सामान्य ज्ञान व विज्ञान मूल बातें",
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
              }
            ]
          }
        ],
        "topics": [
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
          }
        ]
      },
      {
        "id": "lab_tech_core",
        "name": "क्लिनिकल पैथोलॉजी एवं लैब टेक्नोलॉजी (Clinical Lab Sciences)",
        "weightage": 80,
        "importance": "Highest",
        "pyqFrequency": "Extremely High (80 Qs)",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "lab_tech_core_ch_1",
            "name": "Clinical Hematology & Blood Banking",
            "topics": [
              {
                "id": "lab_c_1",
                "name": "Hematology & Blood Cell Counts",
                "nameHi": "क्लिनिकल हेमेटोलॉजी - रक्त गणना (CBC), हीमोग्लोबिन एवं स्कंदन",
                "subtopics": [
                  "रक्त की संरचना, कार्य एवं कोशिकाएं",
                  "हीमोग्लोबिन अनुमान विधियाँ (Sahli एवं Cyanmethemoglobin)",
                  "कुल एवं विभेदक ल्यूकोसाइट गणना (TLC/DLC)",
                  "ईएसआर (ESR), पीसीवी (PCV) एवं रक्त सूचकांक (MCV, MCH, MCHC)",
                  "रक्त स्कंदन समय (BT, CT, PT, APTT)"
                ],
                "importanceScore": 8
              },
              {
                "id": "lab_c_2",
                "name": "Blood Banking & Transfusion",
                "nameHi": "ब्लड बैंकिंग, रक्त समूह निर्धारण (ABO & Rh) एवं आधान सुरक्षा",
                "subtopics": [
                  "ABO एवं Rh रक्त समूह प्रणाली",
                  "क्रॉस-मैचिंग (Major & Minor Cross-match)",
                  "कूम्ब्स टेस्ट (Direct & Indirect Coombs Test)",
                  "रक्त आधान जनित संक्रमण (TTI - HIV, Hepatitis B/C, Syphilis, Malaria) जांच",
                  "रक्त घटक पृथक्करण (PRBC, FFP, Platelets)"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "lab_tech_core_ch_2",
            "name": "Biochemistry, Microbiology & Histopathology",
            "topics": [
              {
                "id": "lab_c_3",
                "name": "Clinical Biochemistry & Organ Profiles",
                "nameHi": "क्लिनिकल बायोकेमिस्ट्री - अंग कार्य परीक्षण एवं एंजाइमोलॉजी",
                "subtopics": [
                  "रक्त शर्करा (Fasting, PP, HbA1c) आकलन",
                  "यकृत कार्य परीक्षण (LFT - Bilirubin, SGOT, SGPT, ALP)",
                  "गुर्दा कार्य परीक्षण (KFT - Urea, Creatinine, Uric Acid)",
                  "लिपिड प्रोफाइल (Cholesterol, Triglycerides, HDL, LDL)",
                  "सीरम इलेक्ट्रोलाइट्स (Sodium, Potassium, Chloride)"
                ],
                "importanceScore": 8
              },
              {
                "id": "lab_c_4",
                "name": "Microbiology, Serology & Parasitology",
                "nameHi": "मेडिकल माइक्रोबायोलॉजी, सीरोलॉजी एवं परजीवी विज्ञान",
                "subtopics": [
                  "जीवाणु वर्गीकरण एवं ग्राम स्टेनिंग (Gram Staining)",
                  "एसिड फास्ट स्टेनिंग (AFB Staining for TB)",
                  "कल्चर मीडिया एवं एंटीबायोटिक संवेदनशीलता परीक्षण (AST)",
                  "सीरोलॉजिकल टेस्ट (Widal, VDRL, ELISA, Rapid Card Tests)",
                  "मल परीक्षण एवं परजीवी (Amoeba, Giardia, Helminths)"
                ],
                "importanceScore": 8
              },
              {
                "id": "lab_c_5",
                "name": "Histopathology & Cytology Techniques",
                "nameHi": "हिस्टोपैथोलॉजी एवं साइटोलॉजी तकनीक",
                "subtopics": [
                  "ऊतक निर्धारण (Fixation) एवं फिक्सेटिव्स",
                  "टिश्यू प्रोसेसिंग, डिहाइड्रेशन, क्लीयरिंग एवं पैराफिन एम्बेडिंग",
                  "माइक्रोटोम एवं सेक्शन कटिंग",
                  "हेमाटोक्सिलिन एवं इओसिन (H&E) स्टेनिंग",
                  "पेप स्मीयर (Pap Smear) एवं एफएनएसी (FNAC) मूल बातें"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "lab_tech_core_ch_3",
            "name": "Body Fluids, Lab Safety & Biomedical Waste",
            "topics": [
              {
                "id": "lab_c_6",
                "name": "Urinalysis & Body Fluid Examination",
                "nameHi": "मूत्र एवं अन्य शारीरिक तरल विश्लेषण (Body Fluids Analysis)",
                "subtopics": [
                  "मूत्र का भौतिक, रासायनिक एवं सूक्ष्मदर्शी परीक्षण (Routine & Microscopic)",
                  "मूत्र में प्रोटीन, ग्लूकोज, कीटोन बॉडीज एवं पित्त लवण परीक्षण",
                  "सीएसएफ (CSF), प्लूरल, एसाइटिक एवं श्लेष द्रव (Synovial Fluid) विश्लेषण",
                  "वीर्य विश्लेषण (Semen Analysis)"
                ],
                "importanceScore": 8
              },
              {
                "id": "lab_c_7",
                "name": "Lab Safety, Quality Control & Biomedical Waste",
                "nameHi": "प्रयोगशाला सुरक्षा, बायोमेडिकल कचरा प्रबंधन (BMW) एवं गुणवत्ता नियंत्रण",
                "subtopics": [
                  "प्रयोगशाला उपकरण रखरखाव (Microscope, Centrifuge, Colorimeter, Autoclave)",
                  "बायोमेडिकल कचरा पृथक्करण (रंग कोडित डिब्बे - पीला, लाल, नीला, काला)",
                  "गुणवत्ता नियंत्रण (Internal & External Quality Control)",
                  "प्रयोगशाला रासायनिक एवं जैविक सुरक्षा नियम"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
        "topics": [
          {
            "id": "lab_c_1",
            "name": "Hematology & Blood Cell Counts",
            "nameHi": "क्लिनिकल हेमेटोलॉजी - रक्त गणना (CBC), हीमोग्लोबिन एवं स्कंदन",
            "subtopics": [
              "रक्त की संरचना, कार्य एवं कोशिकाएं",
              "हीमोग्लोबिन अनुमान विधियाँ (Sahli एवं Cyanmethemoglobin)",
              "कुल एवं विभेदक ल्यूकोसाइट गणना (TLC/DLC)",
              "ईएसआर (ESR), पीसीवी (PCV) एवं रक्त सूचकांक (MCV, MCH, MCHC)",
              "रक्त स्कंदन समय (BT, CT, PT, APTT)"
            ],
            "importanceScore": 8
          },
          {
            "id": "lab_c_2",
            "name": "Blood Banking & Transfusion",
            "nameHi": "ब्लड बैंकिंग, रक्त समूह निर्धारण (ABO & Rh) एवं आधान सुरक्षा",
            "subtopics": [
              "ABO एवं Rh रक्त समूह प्रणाली",
              "क्रॉस-मैचिंग (Major & Minor Cross-match)",
              "कूम्ब्स टेस्ट (Direct & Indirect Coombs Test)",
              "रक्त आधान जनित संक्रमण (TTI - HIV, Hepatitis B/C, Syphilis, Malaria) जांच",
              "रक्त घटक पृथक्करण (PRBC, FFP, Platelets)"
            ],
            "importanceScore": 8
          },
          {
            "id": "lab_c_3",
            "name": "Clinical Biochemistry & Organ Profiles",
            "nameHi": "क्लिनिकल बायोकेमिस्ट्री - अंग कार्य परीक्षण एवं एंजाइमोलॉजी",
            "subtopics": [
              "रक्त शर्करा (Fasting, PP, HbA1c) आकलन",
              "यकृत कार्य परीक्षण (LFT - Bilirubin, SGOT, SGPT, ALP)",
              "गुर्दा कार्य परीक्षण (KFT - Urea, Creatinine, Uric Acid)",
              "लिपिड प्रोफाइल (Cholesterol, Triglycerides, HDL, LDL)",
              "सीरम इलेक्ट्रोलाइट्स (Sodium, Potassium, Chloride)"
            ],
            "importanceScore": 8
          },
          {
            "id": "lab_c_4",
            "name": "Microbiology, Serology & Parasitology",
            "nameHi": "मेडिकल माइक्रोबायोलॉजी, सीरोलॉजी एवं परजीवी विज्ञान",
            "subtopics": [
              "जीवाणु वर्गीकरण एवं ग्राम स्टेनिंग (Gram Staining)",
              "एसिड फास्ट स्टेनिंग (AFB Staining for TB)",
              "कल्चर मीडिया एवं एंटीबायोटिक संवेदनशीलता परीक्षण (AST)",
              "सीरोलॉजिकल टेस्ट (Widal, VDRL, ELISA, Rapid Card Tests)",
              "मल परीक्षण एवं परजीवी (Amoeba, Giardia, Helminths)"
            ],
            "importanceScore": 8
          },
          {
            "id": "lab_c_5",
            "name": "Histopathology & Cytology Techniques",
            "nameHi": "हिस्टोपैथोलॉजी एवं साइटोलॉजी तकनीक",
            "subtopics": [
              "ऊतक निर्धारण (Fixation) एवं फिक्सेटिव्स",
              "टिश्यू प्रोसेसिंग, डिहाइड्रेशन, क्लीयरिंग एवं पैराफिन एम्बेडिंग",
              "माइक्रोटोम एवं सेक्शन कटिंग",
              "हेमाटोक्सिलिन एवं इओसिन (H&E) स्टेनिंग",
              "पेप स्मीयर (Pap Smear) एवं एफएनएसी (FNAC) मूल बातें"
            ],
            "importanceScore": 8
          },
          {
            "id": "lab_c_6",
            "name": "Urinalysis & Body Fluid Examination",
            "nameHi": "मूत्र एवं अन्य शारीरिक तरल विश्लेषण (Body Fluids Analysis)",
            "subtopics": [
              "मूत्र का भौतिक, रासायनिक एवं सूक्ष्मदर्शी परीक्षण (Routine & Microscopic)",
              "मूत्र में प्रोटीन, ग्लूकोज, कीटोन बॉडीज एवं पित्त लवण परीक्षण",
              "सीएसएफ (CSF), प्लूरल, एसाइटिक एवं श्लेष द्रव (Synovial Fluid) विश्लेषण",
              "वीर्य विश्लेषण (Semen Analysis)"
            ],
            "importanceScore": 8
          },
          {
            "id": "lab_c_7",
            "name": "Lab Safety, Quality Control & Biomedical Waste",
            "nameHi": "प्रयोगशाला सुरक्षा, बायोमेडिकल कचरा प्रबंधन (BMW) एवं गुणवत्ता नियंत्रण",
            "subtopics": [
              "प्रयोगशाला उपकरण रखरखाव (Microscope, Centrifuge, Colorimeter, Autoclave)",
              "बायोमेडिकल कचरा पृथक्करण (रंग कोडित डिब्बे - पीला, लाल, नीला, काला)",
              "गुणवत्ता नियंत्रण (Internal & External Quality Control)",
              "प्रयोगशाला रासायनिक एवं जैविक सुरक्षा नियम"
            ],
            "importanceScore": 8
          }
        ]
      }
    ]
  },
  "cgv_master": {
    "name": "CG VYAPAM BASICS",
    "fullName": "Chhattisgarh Vyapam All subjects",
    "icon": "🏛️",
    "stage": "Prelims",
    "daysRemaining": 365,
    "totalMarks": 100,
    "subjects": [
      {
        "id": "cgv_master_sub_0",
        "name": "छत्तीसगढ़ सामान्य ज्ञान (CG GK)",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High",
        "isCgSpecific": true,
        "chapters": [
          {
            "id": "cgv_master_sub_0_ch_1",
            "name": "छत्तीसगढ़ का इतिहास",
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
            "id": "cgv_master_sub_0_ch_2",
            "name": "छत्तीसगढ़ का भूगोल",
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
            "id": "cgv_master_sub_0_ch_3",
            "name": "जनजाति एवं संस्कृति",
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_0_ch_4",
            "name": "अर्थव्यवस्था एवं प्रशासन",
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_0_ch_5",
            "name": "छत्तीसगढ़ पर्यटन, पुरातत्व एवं धरोहर",
            "topics": [
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
        "id": "cgv_master_sub_1",
        "name": "भारत सामान्य ज्ञान (India GK)",
        "weightage": 20,
        "importance": "High",
        "pyqFrequency": "High",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgv_master_sub_1_ch_1",
            "name": "प्राचीन भारत का इतिहास",
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_1_ch_2",
            "name": "मध्यकालीन भारत का इतिहास",
            "topics": [
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_1_ch_3",
            "name": "आधुनिक भारत का इतिहास",
            "topics": [
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
            "id": "cgv_master_sub_1_ch_4",
            "name": "भारतीय भूगोल",
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_1_ch_5",
            "name": "भारतीय राजव्यवस्था",
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
            "id": "cgv_master_sub_1_ch_6",
            "name": "भारतीय अर्थव्यवस्था",
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_1_ch_7",
            "name": "भारत एवं विश्व",
            "topics": [
              {
                "id": "ind_misc_1",
                "name": "International Organizations",
                "nameHi": "अंतरराष्ट्रीय संगठन",
                "subtopics": [
                  "UNO",
                  "IMF",
                  "World Bank",
                  "WTO",
                  "WHO"
                ],
                "importanceScore": 10
              },
              {
                "id": "ind_misc_2",
                "name": "Important Reports and Indexes",
                "nameHi": "महत्वपूर्ण रिपोर्ट एवं सूचकांक",
                "subtopics": [
                  "HDI",
                  "GHI",
                  "SDG"
                ],
                "importanceScore": 8
              },
              {
                "id": "ind_misc_3",
                "name": "Sports and Awards",
                "nameHi": "खेल एवं पुरस्कार",
                "subtopics": [
                  "खेल पुरस्कार",
                  "राष्ट्रीय पुरस्कार",
                  "अंतरराष्ट्रीय पुरस्कार"
                ],
                "importanceScore": 8
              },
              {
                "id": "ind_misc_4",
                "name": "Important Days and Themes",
                "nameHi": "महत्वपूर्ण दिवस",
                "subtopics": [
                  "राष्ट्रीय दिवस",
                  "अंतरराष्ट्रीय दिवस"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_1_ch_8",
            "name": "विश्व भूगोल",
            "topics": [
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
            "id": "ind_misc_1",
            "name": "International Organizations",
            "nameHi": "अंतरराष्ट्रीय संगठन",
            "subtopics": [
              "UNO",
              "IMF",
              "World Bank",
              "WTO",
              "WHO"
            ],
            "importanceScore": 10
          },
          {
            "id": "ind_misc_2",
            "name": "Important Reports and Indexes",
            "nameHi": "महत्वपूर्ण रिपोर्ट एवं सूचकांक",
            "subtopics": [
              "HDI",
              "GHI",
              "SDG"
            ],
            "importanceScore": 8
          },
          {
            "id": "ind_misc_3",
            "name": "Sports and Awards",
            "nameHi": "खेल एवं पुरस्कार",
            "subtopics": [
              "खेल पुरस्कार",
              "राष्ट्रीय पुरस्कार",
              "अंतरराष्ट्रीय पुरस्कार"
            ],
            "importanceScore": 8
          },
          {
            "id": "ind_misc_4",
            "name": "Important Days and Themes",
            "nameHi": "महत्वपूर्ण दिवस",
            "subtopics": [
              "राष्ट्रीय दिवस",
              "अंतरराष्ट्रीय दिवस"
            ],
            "importanceScore": 8
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
        "id": "cgv_master_sub_2",
        "name": "सामान्य विज्ञान (General Science)",
        "weightage": 15,
        "importance": "High",
        "pyqFrequency": "High",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgv_master_sub_2_ch_1",
            "name": "भौतिक विज्ञान (Physics)",
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
                "id": "phy_2",
                "name": "Motion",
                "nameHi": "गति",
                "subtopics": [
                  "Speed",
                  "Velocity",
                  "Acceleration"
                ],
                "importanceScore": 10
              },
              {
                "id": "phy_3",
                "name": "Newton's Laws of Motion",
                "nameHi": "न्यूटन के गति नियम",
                "subtopics": [
                  "First Law",
                  "Second Law",
                  "Third Law"
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
                "id": "phy_5",
                "name": "Gravitation",
                "nameHi": "गुरुत्वाकर्षण",
                "subtopics": [
                  "Gravity",
                  "Weight",
                  "Mass"
                ],
                "importanceScore": 10
              },
              {
                "id": "phy_6",
                "name": "Pressure",
                "nameHi": "दाब",
                "subtopics": [
                  "Atmospheric Pressure",
                  "Fluid Pressure"
                ],
                "importanceScore": 8
              },
              {
                "id": "phy_7",
                "name": "Heat and Temperature",
                "nameHi": "ऊष्मा एवं तापमान",
                "subtopics": [
                  "Thermometer",
                  "Heat Transfer"
                ],
                "importanceScore": 10
              },
              {
                "id": "phy_8",
                "name": "Sound",
                "nameHi": "ध्वनि",
                "subtopics": [
                  "Echo",
                  "Frequency",
                  "Ultrasound"
                ],
                "importanceScore": 9
              },
              {
                "id": "phy_9",
                "name": "Light",
                "nameHi": "प्रकाश",
                "subtopics": [
                  "Reflection",
                  "Refraction",
                  "Lens"
                ],
                "importanceScore": 10
              },
              {
                "id": "phy_10",
                "name": "Human Eye",
                "nameHi": "मानव नेत्र",
                "subtopics": [
                  "Vision Defects",
                  "Eye Structure"
                ],
                "importanceScore": 8
              },
              {
                "id": "phy_11",
                "name": "Electricity",
                "nameHi": "विद्युत",
                "subtopics": [
                  "Current",
                  "Voltage",
                  "Resistance"
                ],
                "importanceScore": 10
              },
              {
                "id": "phy_12",
                "name": "Magnetism",
                "nameHi": "चुंबकत्व",
                "subtopics": [
                  "Magnetic Field",
                  "Electromagnet"
                ],
                "importanceScore": 9
              },
              {
                "id": "phy_13",
                "name": "Modern Physics",
                "nameHi": "आधुनिक भौतिकी",
                "subtopics": [
                  "X-Ray",
                  "Radioactivity",
                  "Laser"
                ],
                "importanceScore": 8
              },
              {
                "id": "phy_14",
                "name": "Semiconductors",
                "nameHi": "अर्धचालक",
                "subtopics": [
                  "Diode",
                  "Transistor"
                ],
                "importanceScore": 7
              },
              {
                "id": "phy_15",
                "name": "Nuclear Energy",
                "nameHi": "नाभिकीय ऊर्जा",
                "subtopics": [
                  "Fission",
                  "Fusion"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_2_ch_2",
            "name": "रसायन विज्ञान (Chemistry)",
            "topics": [
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
                "id": "chem_2",
                "name": "Atoms and Molecules",
                "nameHi": "परमाणु एवं अणु",
                "subtopics": [
                  "Atomic Structure",
                  "Molecules"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_3",
                "name": "Periodic Table",
                "nameHi": "आवर्त सारणी",
                "subtopics": [
                  "Groups",
                  "Periods"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_4",
                "name": "Chemical Bonding",
                "nameHi": "रासायनिक बंध",
                "subtopics": [
                  "Ionic Bond",
                  "Covalent Bond"
                ],
                "importanceScore": 8
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
                "id": "chem_6",
                "name": "Metals and Non-Metals",
                "nameHi": "धातु एवं अधातु",
                "subtopics": [
                  "Properties",
                  "Uses"
                ],
                "importanceScore": 10
              },
              {
                "id": "chem_7",
                "name": "Chemical Reactions",
                "nameHi": "रासायनिक अभिक्रियाएँ",
                "subtopics": [
                  "Oxidation",
                  "Reduction"
                ],
                "importanceScore": 9
              },
              {
                "id": "chem_8",
                "name": "Carbon and Compounds",
                "nameHi": "कार्बन एवं उसके यौगिक",
                "subtopics": [
                  "Hydrocarbons",
                  "Organic Chemistry Basics"
                ],
                "importanceScore": 9
              },
              {
                "id": "chem_9",
                "name": "Fuels",
                "nameHi": "ईंधन",
                "subtopics": [
                  "Coal",
                  "Petroleum",
                  "LPG"
                ],
                "importanceScore": 8
              },
              {
                "id": "chem_10",
                "name": "Everyday Chemistry",
                "nameHi": "दैनिक जीवन में रसायन",
                "subtopics": [
                  "Soap",
                  "Detergent",
                  "Cement"
                ],
                "importanceScore": 8
              },
              {
                "id": "chem_11",
                "name": "Polymers",
                "nameHi": "बहुलक",
                "subtopics": [
                  "Plastic",
                  "Synthetic Fibers"
                ],
                "importanceScore": 7
              },
              {
                "id": "chem_12",
                "name": "Fertilizers and Pesticides",
                "nameHi": "उर्वरक एवं कीटनाशक",
                "subtopics": [
                  "NPK",
                  "Insecticides"
                ],
                "importanceScore": 8
              },
              {
                "id": "chem_13",
                "name": "Environmental Chemistry",
                "nameHi": "पर्यावरण रसायन",
                "subtopics": [
                  "Acid Rain",
                  "Ozone Layer"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_2_ch_3",
            "name": "जीव विज्ञान (Biology)",
            "topics": [
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
                "id": "bio_2",
                "name": "Tissues",
                "nameHi": "ऊतक",
                "subtopics": [
                  "Plant Tissue",
                  "Animal Tissue"
                ],
                "importanceScore": 8
              },
              {
                "id": "bio_3",
                "name": "Human Digestive System",
                "nameHi": "पाचन तंत्र",
                "subtopics": [
                  "Digestive Organs",
                  "Enzymes"
                ],
                "importanceScore": 9
              },
              {
                "id": "bio_4",
                "name": "Respiratory System",
                "nameHi": "श्वसन तंत्र",
                "subtopics": [
                  "Lungs",
                  "Respiration"
                ],
                "importanceScore": 9
              },
              {
                "id": "bio_5",
                "name": "Circulatory System",
                "nameHi": "परिसंचरण तंत्र",
                "subtopics": [
                  "Heart",
                  "Blood"
                ],
                "importanceScore": 10
              },
              {
                "id": "bio_6",
                "name": "Nervous System",
                "nameHi": "तंत्रिका तंत्र",
                "subtopics": [
                  "Brain",
                  "Neuron"
                ],
                "importanceScore": 9
              },
              {
                "id": "bio_7",
                "name": "Endocrine System",
                "nameHi": "अंतःस्रावी तंत्र",
                "subtopics": [
                  "Hormones",
                  "Glands"
                ],
                "importanceScore": 8
              },
              {
                "id": "bio_8",
                "name": "Reproductive System",
                "nameHi": "प्रजनन तंत्र",
                "subtopics": [
                  "Human Reproduction",
                  "Health"
                ],
                "importanceScore": 8
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
                "id": "bio_11",
                "name": "Immunity and Vaccines",
                "nameHi": "प्रतिरक्षा एवं टीके",
                "subtopics": [
                  "Antibodies",
                  "Vaccination"
                ],
                "importanceScore": 9
              },
              {
                "id": "bio_12",
                "name": "Genetics",
                "nameHi": "आनुवंशिकी",
                "subtopics": [
                  "DNA",
                  "Genes",
                  "Mendel"
                ],
                "importanceScore": 8
              },
              {
                "id": "bio_13",
                "name": "Plant Physiology",
                "nameHi": "पादप शरीर क्रिया विज्ञान",
                "subtopics": [
                  "Photosynthesis",
                  "Transpiration"
                ],
                "importanceScore": 9
              },
              {
                "id": "bio_14",
                "name": "Classification of Living Organisms",
                "nameHi": "जीवों का वर्गीकरण",
                "subtopics": [
                  "Five Kingdom",
                  "Taxonomy"
                ],
                "importanceScore": 8
              },
              {
                "id": "bio_15",
                "name": "Biotechnology",
                "nameHi": "जैव प्रौद्योगिकी",
                "subtopics": [
                  "GM Crops",
                  "Cloning"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_2_ch_4",
            "name": "पर्यावरण एवं पारिस्थितिकी",
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
                "id": "env_5",
                "name": "Renewable Energy",
                "nameHi": "नवीकरणीय ऊर्जा",
                "subtopics": [
                  "Solar",
                  "Wind",
                  "Biogas"
                ],
                "importanceScore": 8
              },
              {
                "id": "env_6",
                "name": "Environmental Acts and Organizations",
                "nameHi": "पर्यावरणीय अधिनियम एवं संगठन",
                "subtopics": [
                  "UNEP",
                  "IPCC",
                  "Wildlife Protection Act"
                ],
                "importanceScore": 8
              },
              {
                "id": "env_7",
                "name": "National Parks and Sanctuaries",
                "nameHi": "राष्ट्रीय उद्यान एवं अभयारण्य",
                "subtopics": [
                  "Tiger Reserves",
                  "Biosphere Reserves"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_2_ch_5",
            "name": "अंतरिक्ष विज्ञान एवं खगोल विज्ञान",
            "topics": [
              {
                "id": "adv_sci_1",
                "name": "Solar System Advanced",
                "nameHi": "सौरमंडल (उन्नत)",
                "subtopics": [
                  "ग्रहों की विशेषताएँ",
                  "बौने ग्रह",
                  "क्षुद्रग्रह",
                  "धूमकेतु"
                ],
                "importanceScore": 10
              },
              {
                "id": "adv_sci_2",
                "name": "Stars and Galaxies",
                "nameHi": "तारे एवं आकाशगंगाएँ",
                "subtopics": [
                  "मिल्की वे",
                  "नक्षत्र",
                  "ब्लैक होल"
                ],
                "importanceScore": 8
              },
              {
                "id": "adv_sci_3",
                "name": "Space Missions",
                "nameHi": "अंतरिक्ष मिशन",
                "subtopics": [
                  "चंद्रयान",
                  "मंगलयान",
                  "गगनयान",
                  "आदित्य-L1"
                ],
                "importanceScore": 10
              },
              {
                "id": "adv_sci_4",
                "name": "Space Organizations",
                "nameHi": "अंतरिक्ष संस्थाएँ",
                "subtopics": [
                  "ISRO",
                  "NASA",
                  "ESA",
                  "Roscosmos"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_2_ch_6",
            "name": "आविष्कार एवं वैज्ञानिक",
            "topics": [
              {
                "id": "adv_sci_5",
                "name": "Important Scientists",
                "nameHi": "महत्वपूर्ण वैज्ञानिक",
                "subtopics": [
                  "न्यूटन",
                  "आइंस्टीन",
                  "सी.वी. रमन",
                  "जगदीश चंद्र बोस"
                ],
                "importanceScore": 10
              },
              {
                "id": "adv_sci_6",
                "name": "Important Inventions",
                "nameHi": "महत्वपूर्ण आविष्कार",
                "subtopics": [
                  "टेलीफोन",
                  "रेडियो",
                  "बल्ब",
                  "कंप्यूटर"
                ],
                "importanceScore": 10
              },
              {
                "id": "adv_sci_7",
                "name": "Nobel Prize Discoveries",
                "nameHi": "नोबेल पुरस्कार से संबंधित खोजें",
                "subtopics": [
                  "भौतिकी",
                  "रसायन",
                  "चिकित्सा"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_2_ch_7",
            "name": "वैज्ञानिक उपकरण",
            "topics": [
              {
                "id": "adv_sci_8",
                "name": "Scientific Instruments",
                "nameHi": "वैज्ञानिक उपकरण",
                "subtopics": [
                  "प्रमुख वैज्ञानिक उपकरण",
                  "उपयोग एवं मापन इकाइयाँ",
                  "दैनिक जीवन में अनुप्रयोग"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
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
            "id": "phy_2",
            "name": "Motion",
            "nameHi": "गति",
            "subtopics": [
              "Speed",
              "Velocity",
              "Acceleration"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_3",
            "name": "Newton's Laws of Motion",
            "nameHi": "न्यूटन के गति नियम",
            "subtopics": [
              "First Law",
              "Second Law",
              "Third Law"
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
            "id": "phy_5",
            "name": "Gravitation",
            "nameHi": "गुरुत्वाकर्षण",
            "subtopics": [
              "Gravity",
              "Weight",
              "Mass"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_6",
            "name": "Pressure",
            "nameHi": "दाब",
            "subtopics": [
              "Atmospheric Pressure",
              "Fluid Pressure"
            ],
            "importanceScore": 8
          },
          {
            "id": "phy_7",
            "name": "Heat and Temperature",
            "nameHi": "ऊष्मा एवं तापमान",
            "subtopics": [
              "Thermometer",
              "Heat Transfer"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_8",
            "name": "Sound",
            "nameHi": "ध्वनि",
            "subtopics": [
              "Echo",
              "Frequency",
              "Ultrasound"
            ],
            "importanceScore": 9
          },
          {
            "id": "phy_9",
            "name": "Light",
            "nameHi": "प्रकाश",
            "subtopics": [
              "Reflection",
              "Refraction",
              "Lens"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_10",
            "name": "Human Eye",
            "nameHi": "मानव नेत्र",
            "subtopics": [
              "Vision Defects",
              "Eye Structure"
            ],
            "importanceScore": 8
          },
          {
            "id": "phy_11",
            "name": "Electricity",
            "nameHi": "विद्युत",
            "subtopics": [
              "Current",
              "Voltage",
              "Resistance"
            ],
            "importanceScore": 10
          },
          {
            "id": "phy_12",
            "name": "Magnetism",
            "nameHi": "चुंबकत्व",
            "subtopics": [
              "Magnetic Field",
              "Electromagnet"
            ],
            "importanceScore": 9
          },
          {
            "id": "phy_13",
            "name": "Modern Physics",
            "nameHi": "आधुनिक भौतिकी",
            "subtopics": [
              "X-Ray",
              "Radioactivity",
              "Laser"
            ],
            "importanceScore": 8
          },
          {
            "id": "phy_14",
            "name": "Semiconductors",
            "nameHi": "अर्धचालक",
            "subtopics": [
              "Diode",
              "Transistor"
            ],
            "importanceScore": 7
          },
          {
            "id": "phy_15",
            "name": "Nuclear Energy",
            "nameHi": "नाभिकीय ऊर्जा",
            "subtopics": [
              "Fission",
              "Fusion"
            ],
            "importanceScore": 8
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
            "id": "chem_2",
            "name": "Atoms and Molecules",
            "nameHi": "परमाणु एवं अणु",
            "subtopics": [
              "Atomic Structure",
              "Molecules"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_3",
            "name": "Periodic Table",
            "nameHi": "आवर्त सारणी",
            "subtopics": [
              "Groups",
              "Periods"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_4",
            "name": "Chemical Bonding",
            "nameHi": "रासायनिक बंध",
            "subtopics": [
              "Ionic Bond",
              "Covalent Bond"
            ],
            "importanceScore": 8
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
            "id": "chem_6",
            "name": "Metals and Non-Metals",
            "nameHi": "धातु एवं अधातु",
            "subtopics": [
              "Properties",
              "Uses"
            ],
            "importanceScore": 10
          },
          {
            "id": "chem_7",
            "name": "Chemical Reactions",
            "nameHi": "रासायनिक अभिक्रियाएँ",
            "subtopics": [
              "Oxidation",
              "Reduction"
            ],
            "importanceScore": 9
          },
          {
            "id": "chem_8",
            "name": "Carbon and Compounds",
            "nameHi": "कार्बन एवं उसके यौगिक",
            "subtopics": [
              "Hydrocarbons",
              "Organic Chemistry Basics"
            ],
            "importanceScore": 9
          },
          {
            "id": "chem_9",
            "name": "Fuels",
            "nameHi": "ईंधन",
            "subtopics": [
              "Coal",
              "Petroleum",
              "LPG"
            ],
            "importanceScore": 8
          },
          {
            "id": "chem_10",
            "name": "Everyday Chemistry",
            "nameHi": "दैनिक जीवन में रसायन",
            "subtopics": [
              "Soap",
              "Detergent",
              "Cement"
            ],
            "importanceScore": 8
          },
          {
            "id": "chem_11",
            "name": "Polymers",
            "nameHi": "बहुलक",
            "subtopics": [
              "Plastic",
              "Synthetic Fibers"
            ],
            "importanceScore": 7
          },
          {
            "id": "chem_12",
            "name": "Fertilizers and Pesticides",
            "nameHi": "उर्वरक एवं कीटनाशक",
            "subtopics": [
              "NPK",
              "Insecticides"
            ],
            "importanceScore": 8
          },
          {
            "id": "chem_13",
            "name": "Environmental Chemistry",
            "nameHi": "पर्यावरण रसायन",
            "subtopics": [
              "Acid Rain",
              "Ozone Layer"
            ],
            "importanceScore": 8
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
            "id": "bio_2",
            "name": "Tissues",
            "nameHi": "ऊतक",
            "subtopics": [
              "Plant Tissue",
              "Animal Tissue"
            ],
            "importanceScore": 8
          },
          {
            "id": "bio_3",
            "name": "Human Digestive System",
            "nameHi": "पाचन तंत्र",
            "subtopics": [
              "Digestive Organs",
              "Enzymes"
            ],
            "importanceScore": 9
          },
          {
            "id": "bio_4",
            "name": "Respiratory System",
            "nameHi": "श्वसन तंत्र",
            "subtopics": [
              "Lungs",
              "Respiration"
            ],
            "importanceScore": 9
          },
          {
            "id": "bio_5",
            "name": "Circulatory System",
            "nameHi": "परिसंचरण तंत्र",
            "subtopics": [
              "Heart",
              "Blood"
            ],
            "importanceScore": 10
          },
          {
            "id": "bio_6",
            "name": "Nervous System",
            "nameHi": "तंत्रिका तंत्र",
            "subtopics": [
              "Brain",
              "Neuron"
            ],
            "importanceScore": 9
          },
          {
            "id": "bio_7",
            "name": "Endocrine System",
            "nameHi": "अंतःस्रावी तंत्र",
            "subtopics": [
              "Hormones",
              "Glands"
            ],
            "importanceScore": 8
          },
          {
            "id": "bio_8",
            "name": "Reproductive System",
            "nameHi": "प्रजनन तंत्र",
            "subtopics": [
              "Human Reproduction",
              "Health"
            ],
            "importanceScore": 8
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
            "id": "bio_11",
            "name": "Immunity and Vaccines",
            "nameHi": "प्रतिरक्षा एवं टीके",
            "subtopics": [
              "Antibodies",
              "Vaccination"
            ],
            "importanceScore": 9
          },
          {
            "id": "bio_12",
            "name": "Genetics",
            "nameHi": "आनुवंशिकी",
            "subtopics": [
              "DNA",
              "Genes",
              "Mendel"
            ],
            "importanceScore": 8
          },
          {
            "id": "bio_13",
            "name": "Plant Physiology",
            "nameHi": "पादप शरीर क्रिया विज्ञान",
            "subtopics": [
              "Photosynthesis",
              "Transpiration"
            ],
            "importanceScore": 9
          },
          {
            "id": "bio_14",
            "name": "Classification of Living Organisms",
            "nameHi": "जीवों का वर्गीकरण",
            "subtopics": [
              "Five Kingdom",
              "Taxonomy"
            ],
            "importanceScore": 8
          },
          {
            "id": "bio_15",
            "name": "Biotechnology",
            "nameHi": "जैव प्रौद्योगिकी",
            "subtopics": [
              "GM Crops",
              "Cloning"
            ],
            "importanceScore": 7
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
            "id": "env_5",
            "name": "Renewable Energy",
            "nameHi": "नवीकरणीय ऊर्जा",
            "subtopics": [
              "Solar",
              "Wind",
              "Biogas"
            ],
            "importanceScore": 8
          },
          {
            "id": "env_6",
            "name": "Environmental Acts and Organizations",
            "nameHi": "पर्यावरणीय अधिनियम एवं संगठन",
            "subtopics": [
              "UNEP",
              "IPCC",
              "Wildlife Protection Act"
            ],
            "importanceScore": 8
          },
          {
            "id": "env_7",
            "name": "National Parks and Sanctuaries",
            "nameHi": "राष्ट्रीय उद्यान एवं अभयारण्य",
            "subtopics": [
              "Tiger Reserves",
              "Biosphere Reserves"
            ],
            "importanceScore": 9
          },
          {
            "id": "adv_sci_1",
            "name": "Solar System Advanced",
            "nameHi": "सौरमंडल (उन्नत)",
            "subtopics": [
              "ग्रहों की विशेषताएँ",
              "बौने ग्रह",
              "क्षुद्रग्रह",
              "धूमकेतु"
            ],
            "importanceScore": 10
          },
          {
            "id": "adv_sci_2",
            "name": "Stars and Galaxies",
            "nameHi": "तारे एवं आकाशगंगाएँ",
            "subtopics": [
              "मिल्की वे",
              "नक्षत्र",
              "ब्लैक होल"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_sci_3",
            "name": "Space Missions",
            "nameHi": "अंतरिक्ष मिशन",
            "subtopics": [
              "चंद्रयान",
              "मंगलयान",
              "गगनयान",
              "आदित्य-L1"
            ],
            "importanceScore": 10
          },
          {
            "id": "adv_sci_4",
            "name": "Space Organizations",
            "nameHi": "अंतरिक्ष संस्थाएँ",
            "subtopics": [
              "ISRO",
              "NASA",
              "ESA",
              "Roscosmos"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_sci_5",
            "name": "Important Scientists",
            "nameHi": "महत्वपूर्ण वैज्ञानिक",
            "subtopics": [
              "न्यूटन",
              "आइंस्टीन",
              "सी.वी. रमन",
              "जगदीश चंद्र बोस"
            ],
            "importanceScore": 10
          },
          {
            "id": "adv_sci_6",
            "name": "Important Inventions",
            "nameHi": "महत्वपूर्ण आविष्कार",
            "subtopics": [
              "टेलीफोन",
              "रेडियो",
              "बल्ब",
              "कंप्यूटर"
            ],
            "importanceScore": 10
          },
          {
            "id": "adv_sci_7",
            "name": "Nobel Prize Discoveries",
            "nameHi": "नोबेल पुरस्कार से संबंधित खोजें",
            "subtopics": [
              "भौतिकी",
              "रसायन",
              "चिकित्सा"
            ],
            "importanceScore": 7
          },
          {
            "id": "adv_sci_8",
            "name": "Scientific Instruments",
            "nameHi": "वैज्ञानिक उपकरण",
            "subtopics": [
              "प्रमुख वैज्ञानिक उपकरण",
              "उपयोग एवं मापन इकाइयाँ",
              "दैनिक जीवन में अनुप्रयोग"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "cgv_master_sub_3",
        "name": "गणित (Mathematics)",
        "weightage": 15,
        "importance": "High",
        "pyqFrequency": "High",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgv_master_sub_3_ch_1",
            "name": "संख्या पद्धति (Number System)",
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
                "id": "math_ns_4",
                "name": "Surds and Indices",
                "nameHi": "करणी एवं घातांक",
                "subtopics": [
                  "Square Root",
                  "Cube Root",
                  "Indices Laws"
                ],
                "importanceScore": 8
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
            "id": "cgv_master_sub_3_ch_2",
            "name": "प्रतिशत, लाभ-हानि एवं व्यापारिक गणित",
            "topics": [
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
                "id": "math_ar_3",
                "name": "Discount",
                "nameHi": "बट्टा",
                "subtopics": [
                  "Marked Price",
                  "Successive Discount"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_ar_4",
                "name": "Partnership",
                "nameHi": "साझेदारी",
                "subtopics": [
                  "Profit Sharing",
                  "Investment Ratio"
                ],
                "importanceScore": 8
              },
              {
                "id": "math_ar_5",
                "name": "Commission and Brokerage",
                "nameHi": "कमीशन एवं दलाली",
                "subtopics": [
                  "Brokerage",
                  "Commission Calculation"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_3",
            "name": "अनुपात एवं औसत",
            "topics": [
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
                "id": "math_ratio_2",
                "name": "Proportion",
                "nameHi": "समानुपात",
                "subtopics": [
                  "Direct Proportion",
                  "Inverse Proportion"
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
                "id": "math_ratio_4",
                "name": "Mixture and Alligation",
                "nameHi": "मिश्रण एवं आरोपण",
                "subtopics": [
                  "Milk-Water",
                  "Alligation Rule"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_4",
            "name": "ब्याज एवं समय आधारित गणित",
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
                "id": "math_si_4",
                "name": "Pipes and Cisterns",
                "nameHi": "पाइप एवं टंकी",
                "subtopics": [
                  "Inlet",
                  "Outlet"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_5",
            "name": "समय, चाल एवं दूरी",
            "topics": [
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
                "id": "math_tsd_2",
                "name": "Trains",
                "nameHi": "रेलगाड़ी",
                "subtopics": [
                  "Crossing Problems",
                  "Platform Problems"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_tsd_3",
                "name": "Boats and Streams",
                "nameHi": "नाव एवं धारा",
                "subtopics": [
                  "Upstream",
                  "Downstream"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_6",
            "name": "बीजगणित",
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
                "id": "math_alg_2",
                "name": "Linear Equations",
                "nameHi": "रैखिक समीकरण",
                "subtopics": [
                  "One Variable",
                  "Two Variables"
                ],
                "importanceScore": 10
              },
              {
                "id": "math_alg_3",
                "name": "Quadratic Equations",
                "nameHi": "द्विघात समीकरण",
                "subtopics": [
                  "Roots",
                  "Factorization"
                ],
                "importanceScore": 8
              },
              {
                "id": "math_alg_4",
                "name": "Logarithm",
                "nameHi": "लघुगणक",
                "subtopics": [
                  "Log Rules",
                  "Applications"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_7",
            "name": "ज्यामिति",
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
                "id": "math_geo_3",
                "name": "Quadrilaterals",
                "nameHi": "चतुर्भुज",
                "subtopics": [
                  "Rectangle",
                  "Square",
                  "Rhombus"
                ],
                "importanceScore": 8
              },
              {
                "id": "math_geo_4",
                "name": "Circles",
                "nameHi": "वृत्त",
                "subtopics": [
                  "Chord",
                  "Tangent",
                  "Arc"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_8",
            "name": "क्षेत्रमिति (Mensuration)",
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
          },
          {
            "id": "cgv_master_sub_3_ch_9",
            "name": "त्रिकोणमिति",
            "topics": [
              {
                "id": "math_tri_1",
                "name": "Trigonometric Ratios",
                "nameHi": "त्रिकोणमितीय अनुपात",
                "subtopics": [
                  "Sin",
                  "Cos",
                  "Tan"
                ],
                "importanceScore": 8
              },
              {
                "id": "math_tri_2",
                "name": "Heights and Distances",
                "nameHi": "ऊँचाई एवं दूरी",
                "subtopics": [
                  "Angle of Elevation",
                  "Angle of Depression"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_10",
            "name": "सांख्यिकी एवं डेटा व्याख्या",
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
          },
          {
            "id": "cgv_master_sub_3_ch_11",
            "name": "उन्नत संख्या पद्धति",
            "topics": [
              {
                "id": "adv_math_1",
                "name": "Remainder Theorem",
                "nameHi": "शेषफल प्रमेय",
                "subtopics": [
                  "शेषफल आधारित प्रश्न",
                  "भाज्यता"
                ],
                "importanceScore": 8
              },
              {
                "id": "adv_math_2",
                "name": "Cyclicity and Last Digit",
                "nameHi": "अंतिम अंक एवं चक्रीयता",
                "subtopics": [
                  "Unit Digit",
                  "Last Two Digits"
                ],
                "importanceScore": 8
              },
              {
                "id": "adv_math_3",
                "name": "Factor and Multiple Problems",
                "nameHi": "गुणनखंड एवं गुणज",
                "subtopics": [
                  "Factors",
                  "Multiples"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_12",
            "name": "क्रमचय-संचय एवं प्रायिकता",
            "topics": [
              {
                "id": "adv_math_4",
                "name": "Permutation",
                "nameHi": "क्रमचय",
                "subtopics": [
                  "Linear Arrangement",
                  "Circular Arrangement"
                ],
                "importanceScore": 7
              },
              {
                "id": "adv_math_5",
                "name": "Combination",
                "nameHi": "संचय",
                "subtopics": [
                  "Selection Problems",
                  "Grouping Problems"
                ],
                "importanceScore": 7
              },
              {
                "id": "adv_math_6",
                "name": "Advanced Probability",
                "nameHi": "उन्नत प्रायिकता",
                "subtopics": [
                  "Conditional Probability",
                  "Independent Events"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_13",
            "name": "समुच्चय एवं वेन आरेख",
            "topics": [
              {
                "id": "adv_math_7",
                "name": "Set Theory",
                "nameHi": "समुच्चय सिद्धांत",
                "subtopics": [
                  "Union",
                  "Intersection",
                  "Complement"
                ],
                "importanceScore": 8
              },
              {
                "id": "adv_math_8",
                "name": "Venn Diagram",
                "nameHi": "वेन आरेख",
                "subtopics": [
                  "Two Sets",
                  "Three Sets"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_14",
            "name": "अनुक्रम एवं श्रेणी",
            "topics": [
              {
                "id": "adv_math_9",
                "name": "Arithmetic Progression",
                "nameHi": "समांतर श्रेणी (AP)",
                "subtopics": [
                  "Nth Term",
                  "Sum of Terms"
                ],
                "importanceScore": 8
              },
              {
                "id": "adv_math_10",
                "name": "Geometric Progression",
                "nameHi": "गुणोत्तर श्रेणी (GP)",
                "subtopics": [
                  "Common Ratio",
                  "Sum of GP"
                ],
                "importanceScore": 7
              },
              {
                "id": "adv_math_11",
                "name": "Number Series",
                "nameHi": "संख्या श्रेणी",
                "subtopics": [
                  "Pattern Recognition",
                  "Missing Term"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_15",
            "name": "निर्देशांक ज्यामिति",
            "topics": [
              {
                "id": "adv_math_12",
                "name": "Coordinate Geometry Basics",
                "nameHi": "निर्देशांक ज्यामिति की मूल बातें",
                "subtopics": [
                  "Cartesian Plane",
                  "Coordinates"
                ],
                "importanceScore": 7
              },
              {
                "id": "adv_math_13",
                "name": "Distance Formula",
                "nameHi": "दूरी सूत्र",
                "subtopics": [
                  "Distance Between Points"
                ],
                "importanceScore": 7
              },
              {
                "id": "adv_math_14",
                "name": "Section Formula",
                "nameHi": "विभाजन सूत्र",
                "subtopics": [
                  "Internal Division",
                  "External Division"
                ],
                "importanceScore": 6
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_16",
            "name": "उन्नत क्षेत्रमिति",
            "topics": [
              {
                "id": "adv_math_15",
                "name": "Frustum",
                "nameHi": "छिन्न शंकु",
                "subtopics": [
                  "Volume",
                  "Surface Area"
                ],
                "importanceScore": 6
              },
              {
                "id": "adv_math_16",
                "name": "Combination of Solids",
                "nameHi": "ठोस आकृतियों का संयोजन",
                "subtopics": [
                  "Composite Solids"
                ],
                "importanceScore": 6
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_17",
            "name": "डेटा इंटरप्रिटेशन (Advanced)",
            "topics": [
              {
                "id": "adv_math_17",
                "name": "Caselet DI",
                "nameHi": "केसलेट डेटा व्याख्या",
                "subtopics": [
                  "Paragraph Based DI"
                ],
                "importanceScore": 8
              },
              {
                "id": "adv_math_18",
                "name": "Missing Data DI",
                "nameHi": "मिसिंग डेटा DI",
                "subtopics": [
                  "Inference Based Questions"
                ],
                "importanceScore": 7
              },
              {
                "id": "adv_math_19",
                "name": "Mixed Graph DI",
                "nameHi": "मिश्रित ग्राफ DI",
                "subtopics": [
                  "Bar + Pie",
                  "Table + Line Graph"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_18",
            "name": "गणितीय तर्क",
            "topics": [
              {
                "id": "adv_math_20",
                "name": "Mathematical Reasoning",
                "nameHi": "गणितीय तर्क",
                "subtopics": [
                  "Statements",
                  "Logical Conclusions"
                ],
                "importanceScore": 8
              },
              {
                "id": "adv_math_21",
                "name": "Quantitative Comparison",
                "nameHi": "मात्रात्मक तुलना",
                "subtopics": [
                  "Quantity I vs Quantity II"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_3_ch_19",
            "name": "प्रतियोगी परीक्षा विशेष गणित",
            "topics": [
              {
                "id": "adv_math_22",
                "name": "Age Problems",
                "nameHi": "आयु आधारित प्रश्न",
                "subtopics": [
                  "Present Age",
                  "Past/Future Age"
                ],
                "importanceScore": 10
              },
              {
                "id": "adv_math_23",
                "name": "Clock Problems",
                "nameHi": "घड़ी आधारित प्रश्न",
                "subtopics": [
                  "Angle Between Hands"
                ],
                "importanceScore": 8
              },
              {
                "id": "adv_math_24",
                "name": "Calendar Problems",
                "nameHi": "कैलेंडर आधारित प्रश्न",
                "subtopics": [
                  "Odd Days",
                  "Leap Year"
                ],
                "importanceScore": 8
              },
              {
                "id": "adv_math_25",
                "name": "Race Problems",
                "nameHi": "दौड़ आधारित प्रश्न",
                "subtopics": [
                  "Relative Speed",
                  "Winning Margin"
                ],
                "importanceScore": 7
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
            "id": "math_ns_4",
            "name": "Surds and Indices",
            "nameHi": "करणी एवं घातांक",
            "subtopics": [
              "Square Root",
              "Cube Root",
              "Indices Laws"
            ],
            "importanceScore": 8
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
            "id": "math_ar_3",
            "name": "Discount",
            "nameHi": "बट्टा",
            "subtopics": [
              "Marked Price",
              "Successive Discount"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_ar_4",
            "name": "Partnership",
            "nameHi": "साझेदारी",
            "subtopics": [
              "Profit Sharing",
              "Investment Ratio"
            ],
            "importanceScore": 8
          },
          {
            "id": "math_ar_5",
            "name": "Commission and Brokerage",
            "nameHi": "कमीशन एवं दलाली",
            "subtopics": [
              "Brokerage",
              "Commission Calculation"
            ],
            "importanceScore": 7
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
            "id": "math_ratio_2",
            "name": "Proportion",
            "nameHi": "समानुपात",
            "subtopics": [
              "Direct Proportion",
              "Inverse Proportion"
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
            "id": "math_ratio_4",
            "name": "Mixture and Alligation",
            "nameHi": "मिश्रण एवं आरोपण",
            "subtopics": [
              "Milk-Water",
              "Alligation Rule"
            ],
            "importanceScore": 9
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
            "id": "math_si_4",
            "name": "Pipes and Cisterns",
            "nameHi": "पाइप एवं टंकी",
            "subtopics": [
              "Inlet",
              "Outlet"
            ],
            "importanceScore": 9
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
            "id": "math_tsd_2",
            "name": "Trains",
            "nameHi": "रेलगाड़ी",
            "subtopics": [
              "Crossing Problems",
              "Platform Problems"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_tsd_3",
            "name": "Boats and Streams",
            "nameHi": "नाव एवं धारा",
            "subtopics": [
              "Upstream",
              "Downstream"
            ],
            "importanceScore": 9
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
            "id": "math_alg_2",
            "name": "Linear Equations",
            "nameHi": "रैखिक समीकरण",
            "subtopics": [
              "One Variable",
              "Two Variables"
            ],
            "importanceScore": 10
          },
          {
            "id": "math_alg_3",
            "name": "Quadratic Equations",
            "nameHi": "द्विघात समीकरण",
            "subtopics": [
              "Roots",
              "Factorization"
            ],
            "importanceScore": 8
          },
          {
            "id": "math_alg_4",
            "name": "Logarithm",
            "nameHi": "लघुगणक",
            "subtopics": [
              "Log Rules",
              "Applications"
            ],
            "importanceScore": 7
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
            "id": "math_geo_3",
            "name": "Quadrilaterals",
            "nameHi": "चतुर्भुज",
            "subtopics": [
              "Rectangle",
              "Square",
              "Rhombus"
            ],
            "importanceScore": 8
          },
          {
            "id": "math_geo_4",
            "name": "Circles",
            "nameHi": "वृत्त",
            "subtopics": [
              "Chord",
              "Tangent",
              "Arc"
            ],
            "importanceScore": 9
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
            "id": "math_tri_1",
            "name": "Trigonometric Ratios",
            "nameHi": "त्रिकोणमितीय अनुपात",
            "subtopics": [
              "Sin",
              "Cos",
              "Tan"
            ],
            "importanceScore": 8
          },
          {
            "id": "math_tri_2",
            "name": "Heights and Distances",
            "nameHi": "ऊँचाई एवं दूरी",
            "subtopics": [
              "Angle of Elevation",
              "Angle of Depression"
            ],
            "importanceScore": 8
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
          },
          {
            "id": "adv_math_1",
            "name": "Remainder Theorem",
            "nameHi": "शेषफल प्रमेय",
            "subtopics": [
              "शेषफल आधारित प्रश्न",
              "भाज्यता"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_2",
            "name": "Cyclicity and Last Digit",
            "nameHi": "अंतिम अंक एवं चक्रीयता",
            "subtopics": [
              "Unit Digit",
              "Last Two Digits"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_3",
            "name": "Factor and Multiple Problems",
            "nameHi": "गुणनखंड एवं गुणज",
            "subtopics": [
              "Factors",
              "Multiples"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_4",
            "name": "Permutation",
            "nameHi": "क्रमचय",
            "subtopics": [
              "Linear Arrangement",
              "Circular Arrangement"
            ],
            "importanceScore": 7
          },
          {
            "id": "adv_math_5",
            "name": "Combination",
            "nameHi": "संचय",
            "subtopics": [
              "Selection Problems",
              "Grouping Problems"
            ],
            "importanceScore": 7
          },
          {
            "id": "adv_math_6",
            "name": "Advanced Probability",
            "nameHi": "उन्नत प्रायिकता",
            "subtopics": [
              "Conditional Probability",
              "Independent Events"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_7",
            "name": "Set Theory",
            "nameHi": "समुच्चय सिद्धांत",
            "subtopics": [
              "Union",
              "Intersection",
              "Complement"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_8",
            "name": "Venn Diagram",
            "nameHi": "वेन आरेख",
            "subtopics": [
              "Two Sets",
              "Three Sets"
            ],
            "importanceScore": 10
          },
          {
            "id": "adv_math_9",
            "name": "Arithmetic Progression",
            "nameHi": "समांतर श्रेणी (AP)",
            "subtopics": [
              "Nth Term",
              "Sum of Terms"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_10",
            "name": "Geometric Progression",
            "nameHi": "गुणोत्तर श्रेणी (GP)",
            "subtopics": [
              "Common Ratio",
              "Sum of GP"
            ],
            "importanceScore": 7
          },
          {
            "id": "adv_math_11",
            "name": "Number Series",
            "nameHi": "संख्या श्रेणी",
            "subtopics": [
              "Pattern Recognition",
              "Missing Term"
            ],
            "importanceScore": 10
          },
          {
            "id": "adv_math_12",
            "name": "Coordinate Geometry Basics",
            "nameHi": "निर्देशांक ज्यामिति की मूल बातें",
            "subtopics": [
              "Cartesian Plane",
              "Coordinates"
            ],
            "importanceScore": 7
          },
          {
            "id": "adv_math_13",
            "name": "Distance Formula",
            "nameHi": "दूरी सूत्र",
            "subtopics": [
              "Distance Between Points"
            ],
            "importanceScore": 7
          },
          {
            "id": "adv_math_14",
            "name": "Section Formula",
            "nameHi": "विभाजन सूत्र",
            "subtopics": [
              "Internal Division",
              "External Division"
            ],
            "importanceScore": 6
          },
          {
            "id": "adv_math_15",
            "name": "Frustum",
            "nameHi": "छिन्न शंकु",
            "subtopics": [
              "Volume",
              "Surface Area"
            ],
            "importanceScore": 6
          },
          {
            "id": "adv_math_16",
            "name": "Combination of Solids",
            "nameHi": "ठोस आकृतियों का संयोजन",
            "subtopics": [
              "Composite Solids"
            ],
            "importanceScore": 6
          },
          {
            "id": "adv_math_17",
            "name": "Caselet DI",
            "nameHi": "केसलेट डेटा व्याख्या",
            "subtopics": [
              "Paragraph Based DI"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_18",
            "name": "Missing Data DI",
            "nameHi": "मिसिंग डेटा DI",
            "subtopics": [
              "Inference Based Questions"
            ],
            "importanceScore": 7
          },
          {
            "id": "adv_math_19",
            "name": "Mixed Graph DI",
            "nameHi": "मिश्रित ग्राफ DI",
            "subtopics": [
              "Bar + Pie",
              "Table + Line Graph"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_20",
            "name": "Mathematical Reasoning",
            "nameHi": "गणितीय तर्क",
            "subtopics": [
              "Statements",
              "Logical Conclusions"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_21",
            "name": "Quantitative Comparison",
            "nameHi": "मात्रात्मक तुलना",
            "subtopics": [
              "Quantity I vs Quantity II"
            ],
            "importanceScore": 7
          },
          {
            "id": "adv_math_22",
            "name": "Age Problems",
            "nameHi": "आयु आधारित प्रश्न",
            "subtopics": [
              "Present Age",
              "Past/Future Age"
            ],
            "importanceScore": 10
          },
          {
            "id": "adv_math_23",
            "name": "Clock Problems",
            "nameHi": "घड़ी आधारित प्रश्न",
            "subtopics": [
              "Angle Between Hands"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_24",
            "name": "Calendar Problems",
            "nameHi": "कैलेंडर आधारित प्रश्न",
            "subtopics": [
              "Odd Days",
              "Leap Year"
            ],
            "importanceScore": 8
          },
          {
            "id": "adv_math_25",
            "name": "Race Problems",
            "nameHi": "दौड़ आधारित प्रश्न",
            "subtopics": [
              "Relative Speed",
              "Winning Margin"
            ],
            "importanceScore": 7
          }
        ]
      },
      {
        "id": "cgv_master_sub_4",
        "name": "तर्कशक्ति एवं मानसिक योग्यता (Reasoning)",
        "weightage": 15,
        "importance": "High",
        "pyqFrequency": "High",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgv_master_sub_4_ch_1",
            "name": "श्रेणी (Series)",
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
                "id": "reas_ser_3",
                "name": "Alphanumeric Series",
                "nameHi": "अल्फान्यूमेरिक श्रेणी",
                "subtopics": [
                  "Number-Letter Combination",
                  "Position Analysis"
                ],
                "importanceScore": 9
              },
              {
                "id": "reas_ser_4",
                "name": "Symbol Series",
                "nameHi": "प्रतीक श्रेणी",
                "subtopics": [
                  "Pattern Recognition"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_2",
            "name": "समानता एवं वर्गीकरण",
            "topics": [
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
                "id": "reas_ana_3",
                "name": "Logical Classification",
                "nameHi": "तार्किक वर्गीकरण",
                "subtopics": [
                  "Concept Based"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_3",
            "name": "कोडिंग-डिकोडिंग",
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
                "id": "reas_cd_2",
                "name": "Number Coding",
                "nameHi": "संख्या कोडिंग",
                "subtopics": [
                  "Mathematical Coding"
                ],
                "importanceScore": 9
              },
              {
                "id": "reas_cd_3",
                "name": "Matrix Coding",
                "nameHi": "मैट्रिक्स कोडिंग",
                "subtopics": [
                  "Grid Based Coding"
                ],
                "importanceScore": 7
              },
              {
                "id": "reas_cd_4",
                "name": "Artificial Language",
                "nameHi": "कृत्रिम भाषा",
                "subtopics": [
                  "Symbol Coding"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_4",
            "name": "रक्त संबंध एवं परिवार",
            "topics": [
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
                "id": "reas_br_2",
                "name": "Coded Blood Relations",
                "nameHi": "कूटित रक्त संबंध",
                "subtopics": [
                  "Symbol Based Relations"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_5",
            "name": "दिशा ज्ञान",
            "topics": [
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
                "id": "reas_dir_2",
                "name": "Distance and Direction",
                "nameHi": "दूरी एवं दिशा",
                "subtopics": [
                  "Shortest Distance",
                  "Final Position"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_6",
            "name": "क्रम एवं रैंकिंग",
            "topics": [
              {
                "id": "reas_rank_1",
                "name": "Ranking Test",
                "nameHi": "रैंकिंग परीक्षण",
                "subtopics": [
                  "Left-Right Ranking",
                  "Top-Bottom Ranking"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_rank_2",
                "name": "Order and Position",
                "nameHi": "क्रम एवं स्थिति",
                "subtopics": [
                  "Seating Position"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_7",
            "name": "बैठक व्यवस्था",
            "topics": [
              {
                "id": "reas_seat_1",
                "name": "Linear Seating Arrangement",
                "nameHi": "रेखीय बैठक व्यवस्था",
                "subtopics": [
                  "Single Row",
                  "Double Row"
                ],
                "importanceScore": 10
              },
              {
                "id": "reas_seat_2",
                "name": "Circular Arrangement",
                "nameHi": "वृत्तीय बैठक व्यवस्था",
                "subtopics": [
                  "Clockwise",
                  "Anti-Clockwise"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_8",
            "name": "न्याय निगमन एवं कथन",
            "topics": [
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
            "id": "cgv_master_sub_4_ch_9",
            "name": "विश्लेषणात्मक तर्क",
            "topics": [
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
                "id": "reas_ana_5",
                "name": "Input Output",
                "nameHi": "इनपुट आउटपुट",
                "subtopics": [
                  "Pattern Based"
                ],
                "importanceScore": 7
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_10",
            "name": "गैर-शाब्दिक तर्क (Non-Verbal)",
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
                "id": "reas_nv_3",
                "name": "Paper Folding",
                "nameHi": "कागज मोड़ना",
                "subtopics": [
                  "Punching Patterns"
                ],
                "importanceScore": 8
              },
              {
                "id": "reas_nv_4",
                "name": "Paper Cutting",
                "nameHi": "कागज काटना",
                "subtopics": [
                  "Symmetry Based Questions"
                ],
                "importanceScore": 8
              },
              {
                "id": "reas_nv_5",
                "name": "Embedded Figures",
                "nameHi": "अंतर्निहित आकृतियाँ",
                "subtopics": [
                  "Shape Detection"
                ],
                "importanceScore": 8
              },
              {
                "id": "reas_nv_6",
                "name": "Figure Completion",
                "nameHi": "आकृति पूर्ण करना",
                "subtopics": [
                  "Pattern Matching"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_11",
            "name": "निर्णय क्षमता एवं तार्किक योग्यता",
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_4_ch_12",
            "name": "उन्नत तार्किक तर्क",
            "topics": [
              {
                "id": "reas_adv_1",
                "name": "Logical Reasoning",
                "nameHi": "तार्किक तर्क",
                "subtopics": [
                  "Deductive Reasoning",
                  "Inductive Reasoning"
                ],
                "importanceScore": 9
              },
              {
                "id": "reas_adv_2",
                "name": "Critical Reasoning",
                "nameHi": "आलोचनात्मक तर्क",
                "subtopics": [
                  "Strengthen Argument",
                  "Weaken Argument"
                ],
                "importanceScore": 7
              },
              {
                "id": "reas_adv_3",
                "name": "Assertion and Reason",
                "nameHi": "अभिकथन एवं कारण",
                "subtopics": [
                  "Statement Analysis"
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
            "id": "reas_ser_3",
            "name": "Alphanumeric Series",
            "nameHi": "अल्फान्यूमेरिक श्रेणी",
            "subtopics": [
              "Number-Letter Combination",
              "Position Analysis"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_ser_4",
            "name": "Symbol Series",
            "nameHi": "प्रतीक श्रेणी",
            "subtopics": [
              "Pattern Recognition"
            ],
            "importanceScore": 7
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
            "id": "reas_ana_3",
            "name": "Logical Classification",
            "nameHi": "तार्किक वर्गीकरण",
            "subtopics": [
              "Concept Based"
            ],
            "importanceScore": 8
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
            "id": "reas_cd_2",
            "name": "Number Coding",
            "nameHi": "संख्या कोडिंग",
            "subtopics": [
              "Mathematical Coding"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_cd_3",
            "name": "Matrix Coding",
            "nameHi": "मैट्रिक्स कोडिंग",
            "subtopics": [
              "Grid Based Coding"
            ],
            "importanceScore": 7
          },
          {
            "id": "reas_cd_4",
            "name": "Artificial Language",
            "nameHi": "कृत्रिम भाषा",
            "subtopics": [
              "Symbol Coding"
            ],
            "importanceScore": 8
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
            "id": "reas_br_2",
            "name": "Coded Blood Relations",
            "nameHi": "कूटित रक्त संबंध",
            "subtopics": [
              "Symbol Based Relations"
            ],
            "importanceScore": 9
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
            "id": "reas_dir_2",
            "name": "Distance and Direction",
            "nameHi": "दूरी एवं दिशा",
            "subtopics": [
              "Shortest Distance",
              "Final Position"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_rank_1",
            "name": "Ranking Test",
            "nameHi": "रैंकिंग परीक्षण",
            "subtopics": [
              "Left-Right Ranking",
              "Top-Bottom Ranking"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_rank_2",
            "name": "Order and Position",
            "nameHi": "क्रम एवं स्थिति",
            "subtopics": [
              "Seating Position"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_seat_1",
            "name": "Linear Seating Arrangement",
            "nameHi": "रेखीय बैठक व्यवस्था",
            "subtopics": [
              "Single Row",
              "Double Row"
            ],
            "importanceScore": 10
          },
          {
            "id": "reas_seat_2",
            "name": "Circular Arrangement",
            "nameHi": "वृत्तीय बैठक व्यवस्था",
            "subtopics": [
              "Clockwise",
              "Anti-Clockwise"
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
            "id": "reas_ana_5",
            "name": "Input Output",
            "nameHi": "इनपुट आउटपुट",
            "subtopics": [
              "Pattern Based"
            ],
            "importanceScore": 7
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
            "id": "reas_nv_3",
            "name": "Paper Folding",
            "nameHi": "कागज मोड़ना",
            "subtopics": [
              "Punching Patterns"
            ],
            "importanceScore": 8
          },
          {
            "id": "reas_nv_4",
            "name": "Paper Cutting",
            "nameHi": "कागज काटना",
            "subtopics": [
              "Symmetry Based Questions"
            ],
            "importanceScore": 8
          },
          {
            "id": "reas_nv_5",
            "name": "Embedded Figures",
            "nameHi": "अंतर्निहित आकृतियाँ",
            "subtopics": [
              "Shape Detection"
            ],
            "importanceScore": 8
          },
          {
            "id": "reas_nv_6",
            "name": "Figure Completion",
            "nameHi": "आकृति पूर्ण करना",
            "subtopics": [
              "Pattern Matching"
            ],
            "importanceScore": 8
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
            "id": "reas_adv_1",
            "name": "Logical Reasoning",
            "nameHi": "तार्किक तर्क",
            "subtopics": [
              "Deductive Reasoning",
              "Inductive Reasoning"
            ],
            "importanceScore": 9
          },
          {
            "id": "reas_adv_2",
            "name": "Critical Reasoning",
            "nameHi": "आलोचनात्मक तर्क",
            "subtopics": [
              "Strengthen Argument",
              "Weaken Argument"
            ],
            "importanceScore": 7
          },
          {
            "id": "reas_adv_3",
            "name": "Assertion and Reason",
            "nameHi": "अभिकथन एवं कारण",
            "subtopics": [
              "Statement Analysis"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "cgv_master_sub_5",
        "name": "हिंदी भाषा",
        "weightage": 15,
        "importance": "High",
        "pyqFrequency": "High",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgv_master_sub_5_ch_1",
            "name": "वर्ण विचार",
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_2",
            "name": "संधि",
            "topics": [
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
                "id": "hin_sandhi_3",
                "name": "Visarga Sandhi",
                "nameHi": "विसर्ग संधि",
                "subtopics": [
                  "विसर्ग परिवर्तन"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_3",
            "name": "समास",
            "topics": [
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
                "id": "hin_samas_3",
                "name": "Bahuvrihi Samas",
                "nameHi": "बहुव्रीहि समास",
                "subtopics": [
                  "उदाहरण आधारित प्रश्न"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_samas_4",
                "name": "Avyayibhav Samas",
                "nameHi": "अव्ययीभाव समास",
                "subtopics": [
                  "रचना",
                  "पहचान"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_4",
            "name": "उपसर्ग एवं प्रत्यय",
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_5",
            "name": "शब्द विचार",
            "topics": [
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
                "id": "hin_shabd_3",
                "name": "Rudh, Yogik and Yogarudh",
                "nameHi": "रूढ़, यौगिक एवं योगरूढ़",
                "subtopics": [
                  "शब्द वर्गीकरण"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_6",
            "name": "शब्द भंडार",
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_7",
            "name": "मुहावरे एवं लोकोक्तियाँ",
            "topics": [
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_8",
            "name": "व्याकरण",
            "topics": [
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
                "id": "hin_gram_5",
                "name": "Tense",
                "nameHi": "काल",
                "subtopics": [
                  "वर्तमान",
                  "भूत",
                  "भविष्य"
                ],
                "importanceScore": 10
              },
              {
                "id": "hin_gram_6",
                "name": "Voice",
                "nameHi": "वाच्य",
                "subtopics": [
                  "कर्तृवाच्य",
                  "कर्मवाच्य"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_9",
            "name": "वाक्य एवं अशुद्धि शोधन",
            "topics": [
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
                "id": "hin_sent_3",
                "name": "Sentence Transformation",
                "nameHi": "वाक्य रूपांतरण",
                "subtopics": [
                  "सरल",
                  "संयुक्त",
                  "मिश्र"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_10",
            "name": "हिंदी साहित्य",
            "topics": [
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
                "id": "hin_lit_4",
                "name": "Hindi Literary Periods",
                "nameHi": "हिंदी साहित्य के काल",
                "subtopics": [
                  "आदिकाल",
                  "भक्तिकाल",
                  "रीतिकाल",
                  "आधुनिक काल"
                ],
                "importanceScore": 9
              },
              {
                "id": "hin_lit_5",
                "name": "Major Authors",
                "nameHi": "प्रमुख साहित्यकार",
                "subtopics": [
                  "कबीर",
                  "तुलसीदास",
                  "सूरदास",
                  "प्रेमचंद",
                  "महादेवी वर्मा"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_11",
            "name": "गद्यांश एवं बोध",
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
                "id": "hin_comp_2",
                "name": "Passage Based Vocabulary",
                "nameHi": "गद्यांश आधारित शब्दार्थ",
                "subtopics": [
                  "संदर्भानुसार अर्थ"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_5_ch_12",
            "name": "उन्नत हिंदी",
            "topics": [
              {
                "id": "hin_adv_1",
                "name": "Official Hindi",
                "nameHi": "राजभाषा हिंदी",
                "subtopics": [
                  "राजभाषा नियम",
                  "संवैधानिक प्रावधान"
                ],
                "importanceScore": 7
              },
              {
                "id": "hin_adv_2",
                "name": "Administrative Hindi",
                "nameHi": "प्रशासनिक हिंदी",
                "subtopics": [
                  "कार्यालयी शब्दावली"
                ],
                "importanceScore": 8
              },
              {
                "id": "hin_adv_3",
                "name": "Translation Basics",
                "nameHi": "अनुवाद",
                "subtopics": [
                  "अंग्रेजी से हिंदी",
                  "हिंदी से अंग्रेजी"
                ],
                "importanceScore": 7
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
            "id": "hin_sandhi_3",
            "name": "Visarga Sandhi",
            "nameHi": "विसर्ग संधि",
            "subtopics": [
              "विसर्ग परिवर्तन"
            ],
            "importanceScore": 8
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
            "id": "hin_samas_3",
            "name": "Bahuvrihi Samas",
            "nameHi": "बहुव्रीहि समास",
            "subtopics": [
              "उदाहरण आधारित प्रश्न"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_samas_4",
            "name": "Avyayibhav Samas",
            "nameHi": "अव्ययीभाव समास",
            "subtopics": [
              "रचना",
              "पहचान"
            ],
            "importanceScore": 8
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
            "id": "hin_shabd_3",
            "name": "Rudh, Yogik and Yogarudh",
            "nameHi": "रूढ़, यौगिक एवं योगरूढ़",
            "subtopics": [
              "शब्द वर्गीकरण"
            ],
            "importanceScore": 8
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
            "id": "hin_gram_5",
            "name": "Tense",
            "nameHi": "काल",
            "subtopics": [
              "वर्तमान",
              "भूत",
              "भविष्य"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_gram_6",
            "name": "Voice",
            "nameHi": "वाच्य",
            "subtopics": [
              "कर्तृवाच्य",
              "कर्मवाच्य"
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
            "id": "hin_sent_2",
            "name": "Spelling Correction",
            "nameHi": "वर्तनी शुद्धि",
            "subtopics": [
              "सामान्य त्रुटियाँ"
            ],
            "importanceScore": 10
          },
          {
            "id": "hin_sent_3",
            "name": "Sentence Transformation",
            "nameHi": "वाक्य रूपांतरण",
            "subtopics": [
              "सरल",
              "संयुक्त",
              "मिश्र"
            ],
            "importanceScore": 8
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
            "id": "hin_lit_4",
            "name": "Hindi Literary Periods",
            "nameHi": "हिंदी साहित्य के काल",
            "subtopics": [
              "आदिकाल",
              "भक्तिकाल",
              "रीतिकाल",
              "आधुनिक काल"
            ],
            "importanceScore": 9
          },
          {
            "id": "hin_lit_5",
            "name": "Major Authors",
            "nameHi": "प्रमुख साहित्यकार",
            "subtopics": [
              "कबीर",
              "तुलसीदास",
              "सूरदास",
              "प्रेमचंद",
              "महादेवी वर्मा"
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
            "id": "hin_comp_2",
            "name": "Passage Based Vocabulary",
            "nameHi": "गद्यांश आधारित शब्दार्थ",
            "subtopics": [
              "संदर्भानुसार अर्थ"
            ],
            "importanceScore": 8
          },
          {
            "id": "hin_adv_1",
            "name": "Official Hindi",
            "nameHi": "राजभाषा हिंदी",
            "subtopics": [
              "राजभाषा नियम",
              "संवैधानिक प्रावधान"
            ],
            "importanceScore": 7
          },
          {
            "id": "hin_adv_2",
            "name": "Administrative Hindi",
            "nameHi": "प्रशासनिक हिंदी",
            "subtopics": [
              "कार्यालयी शब्दावली"
            ],
            "importanceScore": 8
          },
          {
            "id": "hin_adv_3",
            "name": "Translation Basics",
            "nameHi": "अनुवाद",
            "subtopics": [
              "अंग्रेजी से हिंदी",
              "हिंदी से अंग्रेजी"
            ],
            "importanceScore": 7
          }
        ]
      },
      {
        "id": "cgv_master_sub_6",
        "name": "English Language",
        "weightage": 10,
        "importance": "Medium",
        "pyqFrequency": "Medium",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgv_master_sub_6_ch_1",
            "name": "Grammar Fundamentals",
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
                "id": "eng_gram_3",
                "name": "Determiners",
                "nameHi": "निर्धारक",
                "subtopics": [
                  "Some",
                  "Any",
                  "Much",
                  "Many"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_2",
            "name": "Tenses",
            "topics": [
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
                "id": "eng_tense_3",
                "name": "Future Tense",
                "nameHi": "भविष्य काल",
                "subtopics": [
                  "Simple",
                  "Continuous",
                  "Perfect",
                  "Perfect Continuous"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_3",
            "name": "Verb Forms",
            "topics": [
              {
                "id": "eng_verb_1",
                "name": "Subject Verb Agreement",
                "nameHi": "कर्ता-क्रिया सामंजस्य",
                "subtopics": [
                  "Singular Subjects",
                  "Plural Subjects"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_verb_2",
                "name": "Auxiliary Verbs",
                "nameHi": "सहायक क्रियाएँ",
                "subtopics": [
                  "Be",
                  "Have",
                  "Do"
                ],
                "importanceScore": 8
              },
              {
                "id": "eng_verb_3",
                "name": "Modal Verbs",
                "nameHi": "Modal Verbs",
                "subtopics": [
                  "Can",
                  "Could",
                  "May",
                  "Must",
                  "Should"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_4",
            "name": "Voice and Narration",
            "topics": [
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_5",
            "name": "Sentence Structure",
            "topics": [
              {
                "id": "eng_sent_1",
                "name": "Sentence Formation",
                "nameHi": "वाक्य निर्माण",
                "subtopics": [
                  "Simple Sentence",
                  "Compound Sentence",
                  "Complex Sentence"
                ],
                "importanceScore": 9
              },
              {
                "id": "eng_sent_2",
                "name": "Transformation of Sentences",
                "nameHi": "वाक्य परिवर्तन",
                "subtopics": [
                  "Assertive",
                  "Interrogative",
                  "Exclamatory",
                  "Imperative"
                ],
                "importanceScore": 8
              },
              {
                "id": "eng_sent_3",
                "name": "Question Tags",
                "nameHi": "Question Tags",
                "subtopics": [
                  "Positive Tag",
                  "Negative Tag"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_6",
            "name": "Vocabulary",
            "topics": [
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
                "id": "eng_vocab_3",
                "name": "One Word Substitution",
                "nameHi": "अनेक शब्दों के लिए एक शब्द",
                "subtopics": [
                  "Common Exam Words"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_vocab_4",
                "name": "Homophones",
                "nameHi": "समोच्चारित शब्द",
                "subtopics": [
                  "Common Homophones"
                ],
                "importanceScore": 8
              },
              {
                "id": "eng_vocab_5",
                "name": "Phrasal Verbs",
                "nameHi": "Phrasal Verbs",
                "subtopics": [
                  "Common Usage"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_7",
            "name": "Idioms and Phrases",
            "topics": [
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
                "id": "eng_idiom_2",
                "name": "Phrases",
                "nameHi": "वाक्यांश",
                "subtopics": [
                  "Common Expressions"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_8",
            "name": "Error Detection",
            "topics": [
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
            "id": "cgv_master_sub_6_ch_9",
            "name": "Reading Comprehension",
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
                "id": "eng_comp_2",
                "name": "Cloze Test",
                "nameHi": "रिक्त स्थान पूर्ति गद्यांश",
                "subtopics": [
                  "Grammar Based",
                  "Vocabulary Based"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_10",
            "name": "Word Usage",
            "topics": [
              {
                "id": "eng_use_1",
                "name": "Confusing Words",
                "nameHi": "भ्रमित करने वाले शब्द",
                "subtopics": [
                  "Accept/Except",
                  "Affect/Effect"
                ],
                "importanceScore": 8
              },
              {
                "id": "eng_use_2",
                "name": "Spellings",
                "nameHi": "वर्तनी",
                "subtopics": [
                  "Frequently Asked Words"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_11",
            "name": "Advanced English",
            "topics": [
              {
                "id": "eng_adv_1",
                "name": "Para Jumbles",
                "nameHi": "वाक्य क्रम व्यवस्था",
                "subtopics": [
                  "Sentence Arrangement"
                ],
                "importanceScore": 8
              },
              {
                "id": "eng_adv_2",
                "name": "Fill in the Blanks",
                "nameHi": "रिक्त स्थान पूर्ति",
                "subtopics": [
                  "Single Blank",
                  "Double Blank"
                ],
                "importanceScore": 10
              },
              {
                "id": "eng_adv_3",
                "name": "Word Replacement",
                "nameHi": "शब्द प्रतिस्थापन",
                "subtopics": [
                  "Context Based Usage"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_6_ch_12",
            "name": "Communication English",
            "topics": [
              {
                "id": "eng_comm_1",
                "name": "Official Communication",
                "nameHi": "औपचारिक संचार",
                "subtopics": [
                  "Notice",
                  "Letter",
                  "Email Basics"
                ],
                "importanceScore": 7
              },
              {
                "id": "eng_comm_2",
                "name": "Common Expressions",
                "nameHi": "सामान्य अभिव्यक्तियाँ",
                "subtopics": [
                  "Greetings",
                  "Formal Usage"
                ],
                "importanceScore": 6
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
            "id": "eng_gram_3",
            "name": "Determiners",
            "nameHi": "निर्धारक",
            "subtopics": [
              "Some",
              "Any",
              "Much",
              "Many"
            ],
            "importanceScore": 8
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
            "id": "eng_tense_3",
            "name": "Future Tense",
            "nameHi": "भविष्य काल",
            "subtopics": [
              "Simple",
              "Continuous",
              "Perfect",
              "Perfect Continuous"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_verb_1",
            "name": "Subject Verb Agreement",
            "nameHi": "कर्ता-क्रिया सामंजस्य",
            "subtopics": [
              "Singular Subjects",
              "Plural Subjects"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_verb_2",
            "name": "Auxiliary Verbs",
            "nameHi": "सहायक क्रियाएँ",
            "subtopics": [
              "Be",
              "Have",
              "Do"
            ],
            "importanceScore": 8
          },
          {
            "id": "eng_verb_3",
            "name": "Modal Verbs",
            "nameHi": "Modal Verbs",
            "subtopics": [
              "Can",
              "Could",
              "May",
              "Must",
              "Should"
            ],
            "importanceScore": 9
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
            "id": "eng_sent_1",
            "name": "Sentence Formation",
            "nameHi": "वाक्य निर्माण",
            "subtopics": [
              "Simple Sentence",
              "Compound Sentence",
              "Complex Sentence"
            ],
            "importanceScore": 9
          },
          {
            "id": "eng_sent_2",
            "name": "Transformation of Sentences",
            "nameHi": "वाक्य परिवर्तन",
            "subtopics": [
              "Assertive",
              "Interrogative",
              "Exclamatory",
              "Imperative"
            ],
            "importanceScore": 8
          },
          {
            "id": "eng_sent_3",
            "name": "Question Tags",
            "nameHi": "Question Tags",
            "subtopics": [
              "Positive Tag",
              "Negative Tag"
            ],
            "importanceScore": 7
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
            "id": "eng_vocab_3",
            "name": "One Word Substitution",
            "nameHi": "अनेक शब्दों के लिए एक शब्द",
            "subtopics": [
              "Common Exam Words"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_vocab_4",
            "name": "Homophones",
            "nameHi": "समोच्चारित शब्द",
            "subtopics": [
              "Common Homophones"
            ],
            "importanceScore": 8
          },
          {
            "id": "eng_vocab_5",
            "name": "Phrasal Verbs",
            "nameHi": "Phrasal Verbs",
            "subtopics": [
              "Common Usage"
            ],
            "importanceScore": 8
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
            "id": "eng_idiom_2",
            "name": "Phrases",
            "nameHi": "वाक्यांश",
            "subtopics": [
              "Common Expressions"
            ],
            "importanceScore": 8
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
            "id": "eng_comp_2",
            "name": "Cloze Test",
            "nameHi": "रिक्त स्थान पूर्ति गद्यांश",
            "subtopics": [
              "Grammar Based",
              "Vocabulary Based"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_use_1",
            "name": "Confusing Words",
            "nameHi": "भ्रमित करने वाले शब्द",
            "subtopics": [
              "Accept/Except",
              "Affect/Effect"
            ],
            "importanceScore": 8
          },
          {
            "id": "eng_use_2",
            "name": "Spellings",
            "nameHi": "वर्तनी",
            "subtopics": [
              "Frequently Asked Words"
            ],
            "importanceScore": 9
          },
          {
            "id": "eng_adv_1",
            "name": "Para Jumbles",
            "nameHi": "वाक्य क्रम व्यवस्था",
            "subtopics": [
              "Sentence Arrangement"
            ],
            "importanceScore": 8
          },
          {
            "id": "eng_adv_2",
            "name": "Fill in the Blanks",
            "nameHi": "रिक्त स्थान पूर्ति",
            "subtopics": [
              "Single Blank",
              "Double Blank"
            ],
            "importanceScore": 10
          },
          {
            "id": "eng_adv_3",
            "name": "Word Replacement",
            "nameHi": "शब्द प्रतिस्थापन",
            "subtopics": [
              "Context Based Usage"
            ],
            "importanceScore": 8
          },
          {
            "id": "eng_comm_1",
            "name": "Official Communication",
            "nameHi": "औपचारिक संचार",
            "subtopics": [
              "Notice",
              "Letter",
              "Email Basics"
            ],
            "importanceScore": 7
          },
          {
            "id": "eng_comm_2",
            "name": "Common Expressions",
            "nameHi": "सामान्य अभिव्यक्तियाँ",
            "subtopics": [
              "Greetings",
              "Formal Usage"
            ],
            "importanceScore": 6
          }
        ]
      },
      {
        "id": "cgv_master_sub_7",
        "name": "कंप्यूटर ज्ञान (Computer Knowledge)",
        "weightage": 10,
        "importance": "High",
        "pyqFrequency": "Medium",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgv_master_sub_7_ch_1",
            "name": "कंप्यूटर की मूल अवधारणाएँ",
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
                "id": "comp_basic_2",
                "name": "History of Computers",
                "nameHi": "कंप्यूटर का इतिहास",
                "subtopics": [
                  "Abacus",
                  "Charles Babbage",
                  "ENIAC"
                ],
                "importanceScore": 8
              },
              {
                "id": "comp_basic_3",
                "name": "Generations of Computers",
                "nameHi": "कंप्यूटर की पीढ़ियाँ",
                "subtopics": [
                  "First Generation",
                  "Second Generation",
                  "Third Generation",
                  "Fourth Generation",
                  "Fifth Generation"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_basic_4",
                "name": "Types of Computers",
                "nameHi": "कंप्यूटर के प्रकार",
                "subtopics": [
                  "Micro Computer",
                  "Mini Computer",
                  "Mainframe",
                  "Super Computer"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_7_ch_2",
            "name": "कंप्यूटर हार्डवेयर",
            "topics": [
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
                "id": "comp_hw_2",
                "name": "Output Devices",
                "nameHi": "आउटपुट डिवाइस",
                "subtopics": [
                  "Monitor",
                  "Printer",
                  "Plotter",
                  "Speaker"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_hw_3",
                "name": "CPU and Memory",
                "nameHi": "CPU एवं मेमोरी",
                "subtopics": [
                  "ALU",
                  "CU",
                  "Registers",
                  "Cache Memory"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_hw_4",
                "name": "Storage Devices",
                "nameHi": "संग्रहण उपकरण",
                "subtopics": [
                  "Hard Disk",
                  "SSD",
                  "CD/DVD",
                  "Pen Drive"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgv_master_sub_7_ch_3",
            "name": "सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम",
            "topics": [
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
                "id": "comp_sw_2",
                "name": "Operating System",
                "nameHi": "ऑपरेटिंग सिस्टम",
                "subtopics": [
                  "Windows",
                  "Linux",
                  "Android"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_sw_3",
                "name": "Functions of Operating System",
                "nameHi": "ऑपरेटिंग सिस्टम के कार्य",
                "subtopics": [
                  "Memory Management",
                  "Process Management",
                  "File Management"
                ],
                "importanceScore": 9
              },
              {
                "id": "comp_sw_4",
                "name": "Programming Languages",
                "nameHi": "प्रोग्रामिंग भाषाएँ",
                "subtopics": [
                  "Machine Language",
                  "Assembly Language",
                  "High Level Language"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_7_ch_4",
            "name": "MS Office",
            "topics": [
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
                "id": "comp_office_3",
                "name": "MS PowerPoint",
                "nameHi": "एमएस पावरपॉइंट",
                "subtopics": [
                  "Slides",
                  "Animations",
                  "Presentation"
                ],
                "importanceScore": 9
              },
              {
                "id": "comp_office_4",
                "name": "MS Access",
                "nameHi": "एमएस एक्सेस",
                "subtopics": [
                  "Database",
                  "Tables",
                  "Queries"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_7_ch_5",
            "name": "डेटाबेस प्रबंधन",
            "topics": [
              {
                "id": "comp_db_1",
                "name": "Database Concepts",
                "nameHi": "डेटाबेस की अवधारणाएँ",
                "subtopics": [
                  "Data",
                  "Information",
                  "Database"
                ],
                "importanceScore": 9
              },
              {
                "id": "comp_db_2",
                "name": "DBMS",
                "nameHi": "DBMS",
                "subtopics": [
                  "Advantages",
                  "Applications"
                ],
                "importanceScore": 9
              },
              {
                "id": "comp_db_3",
                "name": "RDBMS",
                "nameHi": "RDBMS",
                "subtopics": [
                  "Tables",
                  "Relations",
                  "Keys"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_7_ch_6",
            "name": "इंटरनेट एवं नेटवर्किंग",
            "topics": [
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
              },
              {
                "id": "comp_net_2",
                "name": "Networking",
                "nameHi": "नेटवर्किंग",
                "subtopics": [
                  "LAN",
                  "MAN",
                  "WAN"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_net_3",
                "name": "Internet Protocols",
                "nameHi": "इंटरनेट प्रोटोकॉल",
                "subtopics": [
                  "HTTP",
                  "HTTPS",
                  "FTP",
                  "TCP/IP"
                ],
                "importanceScore": 8
              },
              {
                "id": "comp_net_4",
                "name": "Email",
                "nameHi": "ई-मेल",
                "subtopics": [
                  "Email Structure",
                  "CC",
                  "BCC",
                  "Attachments"
                ],
                "importanceScore": 10
              }
            ]
          },
          {
            "id": "cgv_master_sub_7_ch_7",
            "name": "साइबर सुरक्षा",
            "topics": [
              {
                "id": "comp_cyber_1",
                "name": "Cyber Security Basics",
                "nameHi": "साइबर सुरक्षा की मूल बातें",
                "subtopics": [
                  "Cyber Threats",
                  "Cyber Attacks"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_cyber_2",
                "name": "Malware",
                "nameHi": "मैलवेयर",
                "subtopics": [
                  "Virus",
                  "Worm",
                  "Trojan",
                  "Ransomware"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_cyber_3",
                "name": "Cyber Crimes",
                "nameHi": "साइबर अपराध",
                "subtopics": [
                  "Phishing",
                  "Identity Theft",
                  "Online Fraud"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_cyber_4",
                "name": "Security Tools",
                "nameHi": "सुरक्षा उपकरण",
                "subtopics": [
                  "Antivirus",
                  "Firewall",
                  "Encryption"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_7_ch_8",
            "name": "डिजिटल इंडिया एवं ई-गवर्नेंस",
            "topics": [
              {
                "id": "comp_digi_1",
                "name": "Digital India Mission",
                "nameHi": "डिजिटल इंडिया मिशन",
                "subtopics": [
                  "Objectives",
                  "Pillars"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_digi_2",
                "name": "E-Governance",
                "nameHi": "ई-गवर्नेंस",
                "subtopics": [
                  "G2C",
                  "G2B",
                  "G2G"
                ],
                "importanceScore": 9
              },
              {
                "id": "comp_digi_3",
                "name": "Digital Payments",
                "nameHi": "डिजिटल भुगतान",
                "subtopics": [
                  "UPI",
                  "BHIM",
                  "NEFT",
                  "RTGS",
                  "IMPS"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_digi_4",
                "name": "Aadhaar and DigiLocker",
                "nameHi": "आधार एवं डिजिलॉकर",
                "subtopics": [
                  "UIDAI",
                  "Digital Documents"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_7_ch_9",
            "name": "क्लाउड एवं उभरती तकनीक",
            "topics": [
              {
                "id": "comp_new_1",
                "name": "Cloud Computing",
                "nameHi": "क्लाउड कंप्यूटिंग",
                "subtopics": [
                  "IaaS",
                  "PaaS",
                  "SaaS"
                ],
                "importanceScore": 8
              },
              {
                "id": "comp_new_2",
                "name": "Artificial Intelligence",
                "nameHi": "कृत्रिम बुद्धिमत्ता",
                "subtopics": [
                  "AI",
                  "Machine Learning",
                  "Deep Learning"
                ],
                "importanceScore": 9
              },
              {
                "id": "comp_new_3",
                "name": "Blockchain Technology",
                "nameHi": "ब्लॉकचेन तकनीक",
                "subtopics": [
                  "Cryptography",
                  "Distributed Ledger"
                ],
                "importanceScore": 7
              },
              {
                "id": "comp_new_4",
                "name": "Internet of Things",
                "nameHi": "इंटरनेट ऑफ थिंग्स",
                "subtopics": [
                  "Smart Devices",
                  "Applications"
                ],
                "importanceScore": 7
              }
            ]
          },
          {
            "id": "cgv_master_sub_7_ch_10",
            "name": "प्रतियोगी परीक्षा विशेष",
            "topics": [
              {
                "id": "comp_exam_1",
                "name": "Computer Abbreviations",
                "nameHi": "कंप्यूटर संक्षिप्त रूप",
                "subtopics": [
                  "CPU",
                  "RAM",
                  "ROM",
                  "USB",
                  "URL"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_exam_2",
                "name": "Important Full Forms",
                "nameHi": "महत्वपूर्ण फुल फॉर्म",
                "subtopics": [
                  "WWW",
                  "HTTP",
                  "SMTP",
                  "HTML"
                ],
                "importanceScore": 10
              },
              {
                "id": "comp_exam_3",
                "name": "Computer Current Affairs",
                "nameHi": "कंप्यूटर समसामयिकी",
                "subtopics": [
                  "Latest Technologies",
                  "Government Initiatives"
                ],
                "importanceScore": 8
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
            "id": "comp_basic_2",
            "name": "History of Computers",
            "nameHi": "कंप्यूटर का इतिहास",
            "subtopics": [
              "Abacus",
              "Charles Babbage",
              "ENIAC"
            ],
            "importanceScore": 8
          },
          {
            "id": "comp_basic_3",
            "name": "Generations of Computers",
            "nameHi": "कंप्यूटर की पीढ़ियाँ",
            "subtopics": [
              "First Generation",
              "Second Generation",
              "Third Generation",
              "Fourth Generation",
              "Fifth Generation"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_basic_4",
            "name": "Types of Computers",
            "nameHi": "कंप्यूटर के प्रकार",
            "subtopics": [
              "Micro Computer",
              "Mini Computer",
              "Mainframe",
              "Super Computer"
            ],
            "importanceScore": 9
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
            "id": "comp_hw_2",
            "name": "Output Devices",
            "nameHi": "आउटपुट डिवाइस",
            "subtopics": [
              "Monitor",
              "Printer",
              "Plotter",
              "Speaker"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_hw_3",
            "name": "CPU and Memory",
            "nameHi": "CPU एवं मेमोरी",
            "subtopics": [
              "ALU",
              "CU",
              "Registers",
              "Cache Memory"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_hw_4",
            "name": "Storage Devices",
            "nameHi": "संग्रहण उपकरण",
            "subtopics": [
              "Hard Disk",
              "SSD",
              "CD/DVD",
              "Pen Drive"
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
            "id": "comp_sw_2",
            "name": "Operating System",
            "nameHi": "ऑपरेटिंग सिस्टम",
            "subtopics": [
              "Windows",
              "Linux",
              "Android"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_sw_3",
            "name": "Functions of Operating System",
            "nameHi": "ऑपरेटिंग सिस्टम के कार्य",
            "subtopics": [
              "Memory Management",
              "Process Management",
              "File Management"
            ],
            "importanceScore": 9
          },
          {
            "id": "comp_sw_4",
            "name": "Programming Languages",
            "nameHi": "प्रोग्रामिंग भाषाएँ",
            "subtopics": [
              "Machine Language",
              "Assembly Language",
              "High Level Language"
            ],
            "importanceScore": 7
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
            "id": "comp_office_3",
            "name": "MS PowerPoint",
            "nameHi": "एमएस पावरपॉइंट",
            "subtopics": [
              "Slides",
              "Animations",
              "Presentation"
            ],
            "importanceScore": 9
          },
          {
            "id": "comp_office_4",
            "name": "MS Access",
            "nameHi": "एमएस एक्सेस",
            "subtopics": [
              "Database",
              "Tables",
              "Queries"
            ],
            "importanceScore": 7
          },
          {
            "id": "comp_db_1",
            "name": "Database Concepts",
            "nameHi": "डेटाबेस की अवधारणाएँ",
            "subtopics": [
              "Data",
              "Information",
              "Database"
            ],
            "importanceScore": 9
          },
          {
            "id": "comp_db_2",
            "name": "DBMS",
            "nameHi": "DBMS",
            "subtopics": [
              "Advantages",
              "Applications"
            ],
            "importanceScore": 9
          },
          {
            "id": "comp_db_3",
            "name": "RDBMS",
            "nameHi": "RDBMS",
            "subtopics": [
              "Tables",
              "Relations",
              "Keys"
            ],
            "importanceScore": 8
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
          },
          {
            "id": "comp_net_2",
            "name": "Networking",
            "nameHi": "नेटवर्किंग",
            "subtopics": [
              "LAN",
              "MAN",
              "WAN"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_net_3",
            "name": "Internet Protocols",
            "nameHi": "इंटरनेट प्रोटोकॉल",
            "subtopics": [
              "HTTP",
              "HTTPS",
              "FTP",
              "TCP/IP"
            ],
            "importanceScore": 8
          },
          {
            "id": "comp_net_4",
            "name": "Email",
            "nameHi": "ई-मेल",
            "subtopics": [
              "Email Structure",
              "CC",
              "BCC",
              "Attachments"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_cyber_1",
            "name": "Cyber Security Basics",
            "nameHi": "साइबर सुरक्षा की मूल बातें",
            "subtopics": [
              "Cyber Threats",
              "Cyber Attacks"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_cyber_2",
            "name": "Malware",
            "nameHi": "मैलवेयर",
            "subtopics": [
              "Virus",
              "Worm",
              "Trojan",
              "Ransomware"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_cyber_3",
            "name": "Cyber Crimes",
            "nameHi": "साइबर अपराध",
            "subtopics": [
              "Phishing",
              "Identity Theft",
              "Online Fraud"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_cyber_4",
            "name": "Security Tools",
            "nameHi": "सुरक्षा उपकरण",
            "subtopics": [
              "Antivirus",
              "Firewall",
              "Encryption"
            ],
            "importanceScore": 9
          },
          {
            "id": "comp_digi_1",
            "name": "Digital India Mission",
            "nameHi": "डिजिटल इंडिया मिशन",
            "subtopics": [
              "Objectives",
              "Pillars"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_digi_2",
            "name": "E-Governance",
            "nameHi": "ई-गवर्नेंस",
            "subtopics": [
              "G2C",
              "G2B",
              "G2G"
            ],
            "importanceScore": 9
          },
          {
            "id": "comp_digi_3",
            "name": "Digital Payments",
            "nameHi": "डिजिटल भुगतान",
            "subtopics": [
              "UPI",
              "BHIM",
              "NEFT",
              "RTGS",
              "IMPS"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_digi_4",
            "name": "Aadhaar and DigiLocker",
            "nameHi": "आधार एवं डिजिलॉकर",
            "subtopics": [
              "UIDAI",
              "Digital Documents"
            ],
            "importanceScore": 8
          },
          {
            "id": "comp_new_1",
            "name": "Cloud Computing",
            "nameHi": "क्लाउड कंप्यूटिंग",
            "subtopics": [
              "IaaS",
              "PaaS",
              "SaaS"
            ],
            "importanceScore": 8
          },
          {
            "id": "comp_new_2",
            "name": "Artificial Intelligence",
            "nameHi": "कृत्रिम बुद्धिमत्ता",
            "subtopics": [
              "AI",
              "Machine Learning",
              "Deep Learning"
            ],
            "importanceScore": 9
          },
          {
            "id": "comp_new_3",
            "name": "Blockchain Technology",
            "nameHi": "ब्लॉकचेन तकनीक",
            "subtopics": [
              "Cryptography",
              "Distributed Ledger"
            ],
            "importanceScore": 7
          },
          {
            "id": "comp_new_4",
            "name": "Internet of Things",
            "nameHi": "इंटरनेट ऑफ थिंग्स",
            "subtopics": [
              "Smart Devices",
              "Applications"
            ],
            "importanceScore": 7
          },
          {
            "id": "comp_exam_1",
            "name": "Computer Abbreviations",
            "nameHi": "कंप्यूटर संक्षिप्त रूप",
            "subtopics": [
              "CPU",
              "RAM",
              "ROM",
              "USB",
              "URL"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_exam_2",
            "name": "Important Full Forms",
            "nameHi": "महत्वपूर्ण फुल फॉर्म",
            "subtopics": [
              "WWW",
              "HTTP",
              "SMTP",
              "HTML"
            ],
            "importanceScore": 10
          },
          {
            "id": "comp_exam_3",
            "name": "Computer Current Affairs",
            "nameHi": "कंप्यूटर समसामयिकी",
            "subtopics": [
              "Latest Technologies",
              "Government Initiatives"
            ],
            "importanceScore": 8
          }
        ]
      },
      {
        "id": "cgv_master_sub_8",
        "name": "Current Affairs",
        "weightage": 15,
        "importance": "Very High",
        "pyqFrequency": "Very High",
        "isCgSpecific": false,
        "chapters": [
          {
            "id": "cgv_master_sub_8_ch_1",
            "name": "राष्ट्रीय समसामयिकी",
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
                "id": "ca_nat_2",
                "name": "Parliament and Bills",
                "nameHi": "संसद एवं विधेयक",
                "subtopics": [
                  "महत्वपूर्ण विधेयक",
                  "संविधान संशोधन",
                  "संसदीय घटनाएँ"
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
              }
            ]
          },
          {
            "id": "cgv_master_sub_8_ch_2",
            "name": "छत्तीसगढ़ समसामयिकी",
            "topics": [
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
            "id": "cgv_master_sub_8_ch_3",
            "name": "अंतरराष्ट्रीय समसामयिकी",
            "topics": [
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
                "id": "ca_int_2",
                "name": "International Summits",
                "nameHi": "अंतरराष्ट्रीय सम्मेलन",
                "subtopics": [
                  "G20",
                  "BRICS",
                  "SCO",
                  "ASEAN"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_int_3",
                "name": "International Relations",
                "nameHi": "अंतरराष्ट्रीय संबंध",
                "subtopics": [
                  "भारत-अमेरिका",
                  "भारत-रूस",
                  "भारत-जापान"
                ],
                "importanceScore": 8
              },
              {
                "id": "ca_int_4",
                "name": "Global Events",
                "nameHi": "वैश्विक घटनाएँ",
                "subtopics": [
                  "युद्ध",
                  "संधियाँ",
                  "वैश्विक संकट"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_8_ch_4",
            "name": "अर्थव्यवस्था एवं बैंकिंग",
            "topics": [
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
                "id": "ca_eco_3",
                "name": "Economic Survey",
                "nameHi": "आर्थिक सर्वेक्षण",
                "subtopics": [
                  "GDP",
                  "Growth Rate",
                  "Inflation"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_eco_4",
                "name": "Banking and Finance",
                "nameHi": "बैंकिंग एवं वित्त",
                "subtopics": [
                  "Digital Banking",
                  "UPI",
                  "Financial Inclusion"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_8_ch_5",
            "name": "विज्ञान एवं प्रौद्योगिकी",
            "topics": [
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
                "id": "ca_sci_3",
                "name": "Emerging Technologies",
                "nameHi": "उभरती तकनीक",
                "subtopics": [
                  "AI",
                  "Quantum Computing",
                  "Blockchain"
                ],
                "importanceScore": 9
              },
              {
                "id": "ca_sci_4",
                "name": "Scientific Discoveries",
                "nameHi": "वैज्ञानिक खोजें",
                "subtopics": [
                  "Research",
                  "Innovations"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_8_ch_6",
            "name": "पर्यावरण एवं जलवायु",
            "topics": [
              {
                "id": "ca_env_1",
                "name": "Climate Change",
                "nameHi": "जलवायु परिवर्तन",
                "subtopics": [
                  "COP Summit",
                  "Global Warming"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_env_2",
                "name": "Environmental Reports",
                "nameHi": "पर्यावरण रिपोर्ट",
                "subtopics": [
                  "IPCC",
                  "UNEP Reports"
                ],
                "importanceScore": 8
              },
              {
                "id": "ca_env_3",
                "name": "Conservation Initiatives",
                "nameHi": "संरक्षण पहल",
                "subtopics": [
                  "Tiger Conservation",
                  "Project Elephant"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_8_ch_7",
            "name": "खेल",
            "topics": [
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
                "id": "ca_sports_2",
                "name": "International Sports",
                "nameHi": "अंतरराष्ट्रीय खेल",
                "subtopics": [
                  "Olympics",
                  "Asian Games",
                  "Commonwealth Games"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_sports_3",
                "name": "Sports Awards",
                "nameHi": "खेल पुरस्कार",
                "subtopics": [
                  "Major Dhyan Chand Award",
                  "Arjuna Award",
                  "Dronacharya Award"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_8_ch_8",
            "name": "पुरस्कार एवं सम्मान",
            "topics": [
              {
                "id": "ca_award_1",
                "name": "National Awards",
                "nameHi": "राष्ट्रीय पुरस्कार",
                "subtopics": [
                  "Bharat Ratna",
                  "Padma Awards"
                ],
                "importanceScore": 10
              },
              {
                "id": "ca_award_2",
                "name": "International Awards",
                "nameHi": "अंतरराष्ट्रीय पुरस्कार",
                "subtopics": [
                  "Nobel Prize",
                  "Booker Prize",
                  "Oscar Awards"
                ],
                "importanceScore": 9
              }
            ]
          },
          {
            "id": "cgv_master_sub_8_ch_9",
            "name": "पुस्तकें एवं लेखक",
            "topics": [
              {
                "id": "ca_book_1",
                "name": "Books and Authors",
                "nameHi": "पुस्तकें एवं लेखक",
                "subtopics": [
                  "Recent Books",
                  "Important Authors"
                ],
                "importanceScore": 8
              }
            ]
          },
          {
            "id": "cgv_master_sub_8_ch_10",
            "name": "महत्वपूर्ण दिवस",
            "topics": [
              {
                "id": "ca_day_1",
                "name": "National Important Days",
                "nameHi": "राष्ट्रीय महत्वपूर्ण दिवस",
                "subtopics": [
                  "National Youth Day",
                  "Constitution Day"
                ],
                "importanceScore": 8
              },
              {
                "id": "ca_day_2",
                "name": "International Important Days",
                "nameHi": "अंतरराष्ट्रीय महत्वपूर्ण दिवस",
                "subtopics": [
                  "Earth Day",
                  "Environment Day",
                  "Yoga Day"
                ],
                "importanceScore": 8
              }
            ]
          }
        ],
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
            "id": "ca_nat_2",
            "name": "Parliament and Bills",
            "nameHi": "संसद एवं विधेयक",
            "subtopics": [
              "महत्वपूर्ण विधेयक",
              "संविधान संशोधन",
              "संसदीय घटनाएँ"
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
            "id": "ca_int_2",
            "name": "International Summits",
            "nameHi": "अंतरराष्ट्रीय सम्मेलन",
            "subtopics": [
              "G20",
              "BRICS",
              "SCO",
              "ASEAN"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_int_3",
            "name": "International Relations",
            "nameHi": "अंतरराष्ट्रीय संबंध",
            "subtopics": [
              "भारत-अमेरिका",
              "भारत-रूस",
              "भारत-जापान"
            ],
            "importanceScore": 8
          },
          {
            "id": "ca_int_4",
            "name": "Global Events",
            "nameHi": "वैश्विक घटनाएँ",
            "subtopics": [
              "युद्ध",
              "संधियाँ",
              "वैश्विक संकट"
            ],
            "importanceScore": 8
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
            "id": "ca_eco_3",
            "name": "Economic Survey",
            "nameHi": "आर्थिक सर्वेक्षण",
            "subtopics": [
              "GDP",
              "Growth Rate",
              "Inflation"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_eco_4",
            "name": "Banking and Finance",
            "nameHi": "बैंकिंग एवं वित्त",
            "subtopics": [
              "Digital Banking",
              "UPI",
              "Financial Inclusion"
            ],
            "importanceScore": 9
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
            "id": "ca_sci_3",
            "name": "Emerging Technologies",
            "nameHi": "उभरती तकनीक",
            "subtopics": [
              "AI",
              "Quantum Computing",
              "Blockchain"
            ],
            "importanceScore": 9
          },
          {
            "id": "ca_sci_4",
            "name": "Scientific Discoveries",
            "nameHi": "वैज्ञानिक खोजें",
            "subtopics": [
              "Research",
              "Innovations"
            ],
            "importanceScore": 8
          },
          {
            "id": "ca_env_1",
            "name": "Climate Change",
            "nameHi": "जलवायु परिवर्तन",
            "subtopics": [
              "COP Summit",
              "Global Warming"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_env_2",
            "name": "Environmental Reports",
            "nameHi": "पर्यावरण रिपोर्ट",
            "subtopics": [
              "IPCC",
              "UNEP Reports"
            ],
            "importanceScore": 8
          },
          {
            "id": "ca_env_3",
            "name": "Conservation Initiatives",
            "nameHi": "संरक्षण पहल",
            "subtopics": [
              "Tiger Conservation",
              "Project Elephant"
            ],
            "importanceScore": 8
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
            "id": "ca_sports_2",
            "name": "International Sports",
            "nameHi": "अंतरराष्ट्रीय खेल",
            "subtopics": [
              "Olympics",
              "Asian Games",
              "Commonwealth Games"
            ],
            "importanceScore": 10
          },
          {
            "id": "ca_sports_3",
            "name": "Sports Awards",
            "nameHi": "खेल पुरस्कार",
            "subtopics": [
              "Major Dhyan Chand Award",
              "Arjuna Award",
              "Dronacharya Award"
            ],
            "importanceScore": 9
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
          },
          {
            "id": "ca_award_2",
            "name": "International Awards",
            "nameHi": "अंतरराष्ट्रीय पुरस्कार",
            "subtopics": [
              "Nobel Prize",
              "Booker Prize",
              "Oscar Awards"
            ],
            "importanceScore": 9
          },
          {
            "id": "ca_book_1",
            "name": "Books and Authors",
            "nameHi": "पुस्तकें एवं लेखक",
            "subtopics": [
              "Recent Books",
              "Important Authors"
            ],
            "importanceScore": 8
          },
          {
            "id": "ca_day_1",
            "name": "National Important Days",
            "nameHi": "राष्ट्रीय महत्वपूर्ण दिवस",
            "subtopics": [
              "National Youth Day",
              "Constitution Day"
            ],
            "importanceScore": 8
          },
          {
            "id": "ca_day_2",
            "name": "International Important Days",
            "nameHi": "अंतरराष्ट्रीय महत्वपूर्ण दिवस",
            "subtopics": [
              "Earth Day",
              "Environment Day",
              "Yoga Day"
            ],
            "importanceScore": 8
          }
        ]
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.SYLLABUS_DATA = SYLLABUS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SYLLABUS_DATA };
}
