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
  if (Array.isArray(obj)) {
    if (obj.length > 0 && Array.isArray(obj[0])) {
      return obj.map(row => ({ cells: row.map(c => (c === undefined ? null : c)) }));
    }
    return obj.map(sanitizeForFirestore);
  }
  if (obj !== null && typeof obj === 'object') {
    const res = {};
    for (const key of Object.keys(obj)) {
      if (obj[key] !== undefined) {
        res[key] = sanitizeForFirestore(obj[key]);
      }
    }
    return res;
  }
  return obj;
}

const studyNoteData = {
  topicId: 'eng_comm_2',
  topicName: 'Common Expressions',
  subjectId: 'cgv_master_sub_6',
  subjectName: 'English Language',
  chapterId: 'cgv_master_sub_6_ch_12',
  chapterName: 'Communication English',
  lastUpdated: new Date().toISOString(),

  overview: {
    introduction: "Common Expressions in English encompass the standardized spoken and written functional phrases used for greetings, polite requests, formal introductions, administrative proceedings, workplace negotiations, apologies, and professional courtesies. In competitive examinations like CG Vyapam and CGPSC, functional English tests an aspirant's ability to select the contextually appropriate expression matching formal registers, hierarchical protocols, and situational diplomacy.",
    importance: "Government officials routinely interact with superiors, elected representatives, judicial authorities, and the general public. Appropriate functional expressions preserve administrative decorum and prevent misunderstanding. Examination questions frequently evaluate correct responses to conversational cues (e.g., how to respond to 'How do you do?'), polite modal verbs for making requests ('Would you mind...', 'Could you please...'), and diplomatic phrasing for expressing disagreement or decline.",
    examRelevance: "CG Vyapam exams (including Hostel Warden, Revenue Inspector, Patwari, Sub-Engineer, and ADEO) test: (1) Correct conversational responses to standard greetings and introductions, (2) Polite modal auxiliary collocations ('Would you mind + V-ing'), (3) Meeting and conference expressions (e.g., 'table a motion', 'adjourn the meeting', 'call the meeting to order'), and (4) Idiomatic administrative expressions used in formal correspondence.",
    quickFacts: [
      "The formal response to the greeting 'How do you do?' is formally 'How do you do?' (or 'Pleased to meet you'), NOT 'I am fine'.",
      "Phrases starting with 'Would you mind...' are grammatically followed by a gerund ('Would you mind closing the door?').",
      "An affirmative answer to 'Would you mind...' meaning 'Yes, I will do it' is politely phrased as 'Not at all' or 'Certainly not'.",
      "In formal meetings, 'to table a proposal' in British/Indian English means to present it for discussion (in US English it can mean to postpone).",
      "Expressions of condolence always take singular 'condolence' or plural 'condolences' ('Offer my deepest condolences').",
      "'With reference to...' and 'In accordance with...' are indispensable prepositions of formal administrative correspondence."
    ]
  },

  chapters: [
    {
      chapterNumber: 1,
      title: "Formal Greetings, Introductions, and Social Courtesy",
      content: "Greetings and introductions establish professional rapport and respect administrative hierarchy. Formal greetings depend strictly on the time of day and the relationship between speakers: (1) Time-bound greetings: 'Good morning' (until 12:00 PM / noon), 'Good afternoon' (from 12:00 PM to approximately 5:00 PM), and 'Good evening' (from 5:00 PM onward, regardless of how late it is when arriving). Crucially, 'Good night' is NEVER a greeting; it is exclusively a parting phrase when leaving or going to sleep. (2) 'How do you do?': This is a formal inquiry upon being introduced to someone for the first time; it is not a medical query about one's health, and the standard traditional British/Indian response is 'How do you do?' or 'Pleased to meet you'. (3) Introducing Others: In formal protocol, the person of lower status or younger age is introduced to the person of higher status or senior age ('May I introduce Mr. Sharma, our new accountant, to you, Sir?'). (4) Parting Expressions: 'I look forward to meeting you again', 'Have a productive day', 'Good day'.",
      keyPoints: [
        "Good evening vs. Good night: 'Good evening' is used when meeting after 5:00 PM; 'Good night' is used strictly when parting.",
        "Response to 'How do you do?': Formally answered with 'How do you do?' or 'I am pleased to meet you' (never 'I am fine, thank you').",
        "Introducing Protocol: Introduce lower rank/younger person to the senior person.",
        "Formal Courtesy Titles: Use 'Sir', 'Madam', or professional honorifics (Dr., Justice, Professor) with surnames.",
        "Conversational Pleasantry: 'Pleased to make your acquaintance' is formal when meeting for the first time."
      ],
      examples: [
        "Greeting an officer at 8:00 PM: 'Good evening, Sir' (Incorrect: 'Good night, Sir').",
        "Response to first introduction: Speaker A: 'How do you do, Mr. Patel?' -> Speaker B: 'How do you do, Dr. Rao? Pleased to meet you.'",
        "Formal Introduction: 'Sir, may I introduce Ms. Ananya Sen, our newly appointed Deputy Collector?'"
      ],
      subtopics: [
        "Time-bound Formal Greetings and Partings",
        "Formal Introductions and Response Protocols",
        "Social Etiquette in Civil Service Register"
      ]
    },
    {
      chapterNumber: 2,
      title: "Polite Requests, Modals of Diplomacy, and Refusals",
      content: "In administrative and professional contexts, direct imperative commands ('Give me the file!', 'Shut up!') are unacceptable. Politeness is engineered through modal verbs and subjunctive framing: (1) 'Could' and 'Would': More polite than 'Can' or 'Will' (e.g., 'Could you please verify these records?' is far more courteous than 'Can you verify these records?'). (2) 'Would you mind / Do you mind': Followed strictly by the gerund (V-ing). An agreement to comply is expressed negatively: 'No, not at all' or 'I would be happy to', because responding 'Yes' literally means 'Yes, I mind / I object'. (3) Diplomatic Disagreement: Expressing disagreement without giving offense requires softening phrases: 'I see your point, however...', 'With due respect, I beg to differ', or 'I am afraid I have a slightly different perspective on this matter'. (4) Declining Requests: State regret followed by the reason: 'I regret that we are unable to entertain late submissions as per government guidelines.'",
      keyPoints: [
        "'Would you mind' + Gerund: 'Would you mind waiting (not to wait) for five minutes?'",
        "Answering 'Would you mind': 'Not at all' or 'Certainly not' indicates willing compliance.",
        "Softening Direct Orders: Transform imperatives into polite inquiries ('Please submit the report' -> 'Could you kindly ensure the report is submitted by noon?').",
        "Diplomatic Refusal: Use 'I am afraid that...' to soften bad news or negative responses.",
        "'With due respect': Used to introduce a polite contradiction or counter-argument to a senior authority."
      ],
      examples: [
        "Correct: 'Would you mind sharing the file with the committee?' - 'Not at all, I shall send it immediately.'",
        "Incorrect: 'Would you mind to share the file?' (Wrong infinitive after 'mind').",
        "Diplomatic disagreement: 'While I appreciate your suggestion, the statutory rules do not permit this deviation.'"
      ],
      subtopics: [
        "Grammar of Polite Inquiries ('Would you mind + V-ing')",
        "Degrees of Politeness with Modal Verbs (Can, Could, Would, May)",
        "Diplomatic Disagreement and Softened Refusals"
      ]
    },
    {
      chapterNumber: 3,
      title: "Meeting Etiquette, Discussion Formulas, and Resolutions",
      content: "Formal meetings, conferences, and legislative committees follow parliamentary and administrative procedures with codified expressions: (1) Opening a Meeting: 'I call the meeting to order', 'Let us get down to business', 'Thank you all for being present today'. (2) Stating the Purpose / Agenda: 'The main item on today's agenda is...', 'We are assembled here to deliberate on the drought relief measures'. (3) Yielding the Floor / Inviting Remarks: 'The floor is now open for discussion', 'I would now invite the Chief Engineer to present his findings'. (4) Proposing and Seconding Motions: 'I move that the proposal be approved as drafted' (Motion); 'I second the motion' (Support). (5) Tabling vs. Deferring: In Indian administrative parlance, 'to table a report' means to formally submit or lay it before the house/committee for consideration. (6) Adjourning: 'The meeting stands adjourned until 10:00 AM tomorrow', 'With the permission of the Chair, we shall conclude today's proceedings.'",
      keyPoints: [
        "'Call the meeting to order': The formal opening statement made by the Chairperson to begin official proceedings.",
        "'The floor is open': The invitation indicating participants may now ask questions or make remarks.",
        "'Move a motion' & 'Second a motion': The parliamentary procedure to propose and endorse a formal decision.",
        "'Table a report': To formally submit a document for official examination.",
        "'Adjourn': To temporarily suspend or officially conclude a meeting to a future date or indefinitely (sine die)."
      ],
      examples: [
        "Chairperson: 'The quorum being complete, I call this meeting to order.'",
        "Committee Member: 'I move that the proposed infrastructure budget be sanctioned without amendment.'",
        "Secretary: 'The meeting was adjourned sine die due to unavoidable circumstances.'"
      ],
      subtopics: [
        "Parliamentary Terminology in Meetings",
        "Proposing, Debating, and Adopting Resolutions",
        "Chairing and Adjourning Formal Assemblies"
      ]
    },
    {
      chapterNumber: 4,
      title: "Telephone, Virtual Meeting, and Digital Interaction Expressions",
      content: "Telephone conversations and video conferencing require distinct formulaic expressions to ensure smooth communication: (1) Answering and Identifying: 'Good morning, Directorate of Technical Education, Suresh speaking. How may I assist you?' (2) Asking for the Caller's Identity: 'May I know who is calling, please?' (Never 'Who are you?'). (3) Connecting and Holding: 'Please hold the line while I transfer your call to the Director', 'Allow me a moment to pull up your case file.' (4) Managing Audio/Video Glitches in Virtual Meetings: 'You are on mute, could you unmute your microphone?', 'Your voice is breaking up / cracking; could you repeat the last point?', 'Is my screen visible to everyone on the call?' (5) Taking Messages: 'I am afraid Mr. Sharma is currently in a meeting. Would you like to leave a message?' (6) Concluding Calls: 'Thank you for calling. Have a pleasant day.'",
      keyPoints: [
        "Polite Identification: 'Suresh speaking' or 'This is Suresh' (never 'I am Suresh' over the phone).",
        "Polite Caller Inquiry: 'May I ask who is calling, please?' instead of blunt 'Who are you?'.",
        "Hold Etiquette: 'Hold the line, please' or 'Hang on a moment' (informal).",
        "Virtual Meeting Phrasing: 'You are audible', 'You are on mute', 'Your screen is frozen'.",
        "Taking Action on Behalf: 'I will ensure he receives your message as soon as he returns.'"
      ],
      examples: [
        "Phone Call Identification: 'Good afternoon, Secretariat Helpdesk, Anjali speaking. How may I direct your call?'",
        "Polite Transfer: 'Allow me to put you through to the Accounts Branch. Kindly hold the line.'",
        "Virtual Meeting: 'Sir, your audio is echoing slightly; could you please check your microphone settings?'"
      ],
      subtopics: [
        "Telephone Register and Switchboard Etiquette",
        "Virtual Conference and Video Call Formulas",
        "Message Taking and Call Transfer Protocol"
      ]
    },
    {
      chapterNumber: 5,
      title: "Expressions of Gratitude, Apology, Congratulations, and Condolences",
      content: "Formal social obligations require exact lexical choices: (1) Gratitude: 'We are deeply grateful for your invaluable guidance', 'Thank you for your prompt cooperation'. Responding to gratitude: 'You are most welcome', 'The pleasure is entirely mine', 'Don't mention it' (semi-formal). (2) Apologies: 'We sincerely regret any inconvenience caused', 'Please accept our apologies for the clerical delay'. Responding to apologies: 'That is quite all right', 'No harm done', 'Please do not worry about it'. (3) Congratulations: 'Heartiest congratulations on your well-deserved promotion', 'We applaud your outstanding achievement'. (4) Condolences: 'Please accept my heartfelt condolences on the sad demise of your father', 'Our thoughts and prayers are with the bereaved family during this difficult time'. Note that the word 'condolences' is almost universally used in the plural.",
      keyPoints: [
        "Formal Gratitude: 'Much obliged', 'Deeply indebted', 'Sincere gratitude'.",
        "Apology in Official Capacity: 'We tender our unreserved apologies for the oversight.'",
        "Demise / Bereavement: Formal terms used instead of blunt words like 'death' ('sad demise', 'bereaved family').",
        "Plural Form of Condolence: Always use 'Heartfelt condolences' (not 'condolence' as an interjection).",
        "Congratulations Preposition: 'Congratulations ON your success' (NEVER 'congratulations for')."
      ],
      examples: [
        "Correct: 'Heartiest congratulations ON your selection as Assistant Collector!' (Incorrect: 'congratulations for your selection').",
        "Formal Condolence: 'Please accept our deepest condolences on your irreparable loss.'",
        "Official Apology: 'The department regrets the inconvenience caused due to the technical disruption.'"
      ],
      subtopics: [
        "Formal Expressions of Gratitude and Responses",
        "Bureaucratic Apology and Rectification Phrasing",
        "Felicitations, Commendations, and Condolences"
      ]
    }
  ],

  comparativeTables: [
    {
      title: "Informal vs. Formal Communication Expressions",
      headers: ["Context / Function", "Informal / Casual Expression", "Formal / Administrative Expression"],
      rows: [
        ["Greeting someone after 6 PM", "'Hey! What's up?'", "'Good evening, Sir/Madam.'"],
        ["Making a request", "'Give me that file now.'", "'Could you please provide the requisite file at your earliest convenience?'"],
        ["Asking someone to wait", "'Hang on a sec.'", "'Would you mind holding the line for a moment, please?'"],
        ["Inquiring caller's name", "'Who is this?' / 'Who are you?'", "'May I know who is calling, please?'"],
        ["Expressing disagreement", "'You are completely wrong.'", "'With due respect, I am afraid I have a different perspective on this matter.'"],
        ["Congratulating a colleague", "'Congrats for the win!'", "'Heartiest congratulations on your well-deserved achievement.'"]
      ]
    },
    {
      title: "Common Prepositions in Administrative Collocations",
      headers: ["Administrative Phrase", "Correct Preposition", "Incorrect Usage (Common Error)"],
      rows: [
        ["Congratulations", "ON (Congratulations on your promotion)", "FOR (Congratulations for your promotion)"],
        ["In accordance", "WITH (In accordance with rules)", "TO / BY (In accordance to rules)"],
        ["With reference", "TO (With reference to your memo)", "WITH (With reference with your memo)"],
        ["Comply", "WITH (Comply with the directives)", "TO (Comply to the directives)"],
        ["Adhere", "TO (Adhere to the deadline)", "WITH (Adhere with the deadline)"]
      ]
    },
    {
      title: "Meeting Expressions: Procedural Terms and Meanings",
      headers: ["Term / Formula", "Procedural Meaning", "Typical Context"],
      rows: [
        ["Call to order", "Officially commence the formal proceedings", "Chairperson opening the session"],
        ["The floor is yours / open", "Inviting an attendee or all participants to speak", "Opening discussion after presentation"],
        ["Table a motion", "Formally submit a resolution for debate", "Committee member proposing official action"],
        ["Adjourn sine die", "Conclude a sitting without fixing a day for next meeting", "Legislative or judicial assembly ending"],
        ["Point of order", "Objection regarding breach of parliamentary rules", "Member intervening during a debate"]
      ]
    }
  ],

  pyqs: [
    {
      question: "Which of the following is the most appropriate and polite response when introduced to someone with the greeting 'How do you do?'",
      options: [
        "A) I am totally fine, thank you.",
        "B) How do you do?",
        "C) Why do you ask this?",
        "D) What do you mean?"
      ],
      answer: "B) How do you do?",
      explanation: "In traditional formal British and Indian English etiquette, 'How do you do?' is not a question about physical health; it is a formal salutation upon initial introduction. The customary polite response is 'How do you do?' or 'Pleased to meet you'.",
      examTag: "CG Vyapam Hostel Warden",
      year: "2023"
    },
    {
      question: "Fill in the blank with the grammatically correct verb form: 'Would you mind ________ the door, please?'",
      options: [
        "A) close",
        "B) to close",
        "C) closing",
        "D) closed"
      ],
      answer: "C) closing",
      explanation: "The polite expression 'Would you mind...' is strictly followed by a gerund (-ing form of the verb). Therefore, 'closing' is the only grammatically correct completion.",
      examTag: "CG Vyapam Patwari Exam",
      year: "2022"
    },
    {
      question: "What is the appropriate preposition to use with 'congratulations' in formal correspondence?",
      options: [
        "A) for",
        "B) on",
        "C) at",
        "D) about"
      ],
      answer: "B) on",
      explanation: "The noun 'congratulations' and verb 'congratulate' standardly take the preposition 'on' (e.g., 'Heartiest congratulations ON your grand success'). Using 'for' is a frequent colloquial error.",
      examTag: "CG Vyapam Revenue Inspector (RI)",
      year: "2021"
    },
    {
      question: "If someone asks you on the telephone: 'Would you mind holding the line for a moment?', what is the polite affirmative reply if you are willing to wait?",
      options: [
        "A) Yes, I mind very much.",
        "B) Not at all.",
        "C) Yes, hold it.",
        "D) No, I will not wait."
      ],
      answer: "B) Not at all.",
      explanation: "Since the question literally asks 'Do you mind?' (Does it cause you trouble?), responding 'Not at all' means 'No, it causes me no trouble at all; I will gladly wait.' Responding 'Yes' would signify an objection.",
      examTag: "CGPSC State Engineering Services",
      year: "2020"
    },
    {
      question: "In parliamentary and committee meetings, what does it mean to adjourn a meeting 'sine die'?",
      options: [
        "A) To adjourn without appointing a day on which to appear or assemble again",
        "B) To adjourn until the following morning at 9:00 AM",
        "C) To cancel all resolutions passed during the session",
        "D) To conduct the meeting in total darkness"
      ],
      answer: "A) To adjourn without appointing a day on which to appear or assemble again",
      explanation: "The Latin phrase 'sine die' literally translates to 'without a day'. Adjourning sine die means concluding the session indefinitely without assigning a specific date for resumption.",
      examTag: "CG Vyapam ADEO",
      year: "2022"
    },
    {
      question: "Choose the correct expression to identify oneself professionally over the telephone:",
      options: [
        "A) I am Mr. Verma from Public Works Department.",
        "B) This is Mr. Verma from Public Works Department.",
        "C) Myself Verma speaking here.",
        "D) The person talking is Verma."
      ],
      answer: "B) This is Mr. Verma from Public Works Department.",
      explanation: "In standard telephone etiquette, one identifies oneself using 'This is [Name]' or '[Name] speaking'. Using 'Myself [Name]' is ungrammatical (reflexive pronoun without an antecedent), and 'I am [Name]' is considered improper on the telephone.",
      examTag: "CG Vyapam Sub-Engineer Exam",
      year: "2023"
    }
  ],

  mcqs: [
    {
      id: "eng_comm_2_m1",
      question: "At 7:30 PM, you arrive at an official banquet to greet the Chief Guest. Which greeting is correct?",
      options: [
        "A) Good night, Sir",
        "B) Good evening, Sir",
        "C) Sweet dreams, Sir",
        "D) Goodbye, Sir"
      ],
      answer: "B) Good evening, Sir",
      explanation: "'Good evening' is the formal greeting used when meeting someone after approximately 5:00 PM. 'Good night' is strictly a parting phrase when leaving or heading to sleep.",
      difficulty: "easy"
    },
    {
      id: "eng_comm_2_m2",
      question: "Which of the following phrases is grammatically incorrect due to an erroneous preposition?",
      options: [
        "A) In accordance with the provisions",
        "B) With reference to your application",
        "C) In compliance to the order",
        "D) In view of the prevailing conditions"
      ],
      answer: "C) In compliance to the order",
      explanation: "The correct idiom is 'in compliance WITH' (not 'in compliance to'). 'In accordance with', 'with reference to', and 'in view of' are all standard correct expressions.",
      difficulty: "medium"
    },
    {
      id: "eng_comm_2_m3",
      question: "When a colleague conveys sad news regarding the demise of a family member, what is the appropriate expression to offer?",
      options: [
        "A) Better luck next time",
        "B) My heartfelt condolences to you and your family",
        "C) Congratulations on the event",
        "D) Take it easy and enjoy"
      ],
      answer: "B) My heartfelt condolences to you and your family",
      explanation: "'Heartfelt condolences' is the standard dignified expression of sympathy and mourning offered to someone who has suffered a bereavement.",
      difficulty: "easy"
    },
    {
      id: "eng_comm_2_m4",
      question: "Identify the most polite sentence among the following when asking a superior for authorization:",
      options: [
        "A) Sign this document right now.",
        "B) I want your signature on this paper.",
        "C) Could you please perusal and sign this document at your earliest convenience?",
        "D) You must sign this or else work will stop."
      ],
      answer: "C) Could you please perusal and sign this document at your earliest convenience?",
      explanation: "Option C uses the polite modal 'Could you please...', courteous phrasing, and diplomatic closing ('at your earliest convenience'), perfectly suited for official communication.",
      difficulty: "easy"
    },
    {
      id: "eng_comm_2_m5",
      question: "In a formal committee, when the Chairman says 'I call the meeting to order', what does it signify?",
      options: [
        "A) He is ordering food and tea for everyone",
        "B) He is officially declaring the meeting open and in progress",
        "C) He is threatening to suspend noisy members",
        "D) He is closing the proceedings for the day"
      ],
      answer: "B) He is officially declaring the meeting open and in progress",
      explanation: "'To call a meeting to order' is the standard parliamentary formula used by the presiding officer to signal the formal start of the meeting.",
      difficulty: "medium"
    },
    {
      id: "eng_comm_2_m6",
      question: "Which response is most suitable when an officer thanks you by saying: 'Thank you very much for your timely assistance'?",
      options: [
        "A) It doesn't matter at all.",
        "B) You are most welcome, Sir.",
        "C) Why are you thanking me?",
        "D) Forget it."
      ],
      answer: "B) You are most welcome, Sir.",
      explanation: "'You are most welcome, Sir' or 'The pleasure was entirely mine, Sir' are standard, polite, and respectful responses to expressions of gratitude in official settings.",
      difficulty: "easy"
    },
    {
      id: "eng_comm_2_m7",
      question: "What is the meaning of the formal phrase 'to take the floor' in an assembly or conference?",
      options: [
        "A) To clean the carpet in the hall",
        "B) To fall down due to fatigue",
        "C) To stand up and speak or make an official address",
        "D) To sit on the ground in protest"
      ],
      answer: "C) To stand up and speak or make an official address",
      explanation: "In conference and parliamentary register, 'to take the floor' means to begin speaking to the audience or assembly after being granted permission by the Chair.",
      difficulty: "medium"
    },
    {
      id: "eng_comm_2_m8",
      question: "Identify the sentence that commits an error in functional English usage:",
      options: [
        "A) I am looking forward to hearing from you.",
        "B) With due respect, I beg to differ from your conclusion.",
        "C) Myself Dr. Ramesh, how can I help you?",
        "D) I should be grateful if you could look into the matter."
      ],
      answer: "C) Myself Dr. Ramesh, how can I help you?",
      explanation: "Introducing oneself with 'Myself [Name]' is grammatically incorrect in English. Reflexive pronouns ('myself') cannot serve as the subject of a clause without a preceding noun/pronoun. The correct phrasing is 'I am Dr. Ramesh' or 'This is Dr. Ramesh'.",
      difficulty: "hard"
    }
  ],

  keyTerminology: [
    {
      term: "Salutation",
      definition: "A standard polite word or phrase of greeting used at the start of a conversation, letter, or speech (e.g., 'Good morning', 'Dear Sir').",
      examContext: "Tested regarding time-appropriateness and formal register."
    },
    {
      term: "Gerund Collocation with 'Mind'",
      definition: "The syntactic rule dictating that the polite formula 'Would you mind' requires an -ing verb form rather than an infinitive.",
      examContext: "High-frequency grammar and error detection question in CG Vyapam."
    },
    {
      term: "Call to Order",
      definition: "A formal declaration by the presiding officer or chairperson that a meeting has officially begun.",
      examContext: "Tested in administrative procedures and meeting etiquette questions."
    },
    {
      term: "Adjourn Sine Die",
      definition: "To bring a meeting, legislative session, or judicial proceeding to a close without appointing a future date for reconvening.",
      examContext: "Frequent legal/administrative Latin expression in CGPSC and Vyapam."
    },
    {
      term: "Complimentary Close",
      definition: "The formulaic polite closing phrase before the signature in written correspondence (e.g., 'Yours sincerely', 'With regards').",
      examContext: "Tested for punctuation, capitalization, and salutation match."
    },
    {
      term: "Floor (in assemblies)",
      definition: "The right or turn to address the audience or assembly formally ('The floor is now open for questions').",
      examContext: "Tested in conference terminology and reading comprehension."
    },
    {
      term: "Condolence",
      definition: "An expression of deep sympathy, compassion, and sorrow offered to someone grieving a recent bereavement.",
      examContext: "Tested for plural grammatical form ('condolences') and appropriate solemn register."
    },
    {
      term: "Bureaucratic Softener",
      definition: "A polite modifying phrase (e.g., 'I am afraid that...', 'With due respect...') used to soften the impact of a refusal or disagreement.",
      examContext: "Examined in functional diplomacy and administrative communication questions."
    }
  ],

  sources: [
    {
      name: "Oxford Guide to Effective Writing and Speaking",
      author: "John Seely (Oxford University Press)",
      relevance: "Authoritative reference for conversational registers, telephone protocol, and meeting conventions."
    },
    {
      name: "English at the Workplace",
      author: "Department of English, University of Delhi (Macmillan)",
      relevance: "Comprehensive coverage of workplace interaction, soft skills, polite requests, and functional formulas."
    },
    {
      name: "High School English Grammar and Composition",
      author: "Wren & Martin (Revised by N.D.V. Prasada Rao)",
      relevance: "Standardized rules for modal auxiliaries, gerund constructions after 'mind', and prepositional collocations."
    },
    {
      name: "Administrative Glossary and Office Procedures",
      author: "Lal Bahadur Shastri National Academy of Administration (LBSNAA)",
      relevance: "Definitive handbook for administrative terminology, parliamentary phrasing, and civil service decorum."
    }
  ],

  confusionBuster: [
    {
      concept: "'Good evening' vs. 'Good night'",
      confusion: "Aspirants often say 'Good night' when arriving at a meeting or function after 7 PM.",
      clarity: "'Good evening' is a salutation (greeting upon arrival) anytime after 5 PM. 'Good night' is a valediction (parting phrase upon leaving or sleeping). You can never greet an arriving guest with 'Good night'.",
      memoryHook: "Arriving = Good Evening; Departing = Good Night."
    },
    {
      concept: "Answering 'Would you mind...?'",
      confusion: "Replying 'Yes' when meaning 'I am happy to do it'.",
      clarity: "'Would you mind' literally asks 'Do you object?' Responding 'Yes' means 'Yes, I object!'. If you agree to help, answer 'No, not at all' or 'Certainly not'.",
      memoryHook: "'No' means 'Yes, I will happily do it!'."
    },
    {
      concept: "'Myself [Name]' Introduction Error",
      confusion: "Introducing oneself with 'Myself Rajiv Sharma'.",
      clarity: "'Myself' is a reflexive pronoun and cannot stand as a grammatical subject without a preceding noun/pronoun. Say 'I am Rajiv Sharma' or 'My name is Rajiv Sharma'.",
      memoryHook: "Never start an introduction with 'Myself'!"
    },
    {
      concept: "'Congratulations on' vs. 'Congratulations for'",
      confusion: "Writing 'Congratulations for your new job'.",
      clarity: "The standard English collocation is 'congratulations ON'. 'For' is grammatically incorrect in standard formal English.",
      memoryHook: "Congratulate ON an occasion/achievement."
    },
    {
      concept: "'How do you do?' response",
      confusion: "Answering 'How do you do?' with 'I am fine, thank you'.",
      clarity: "'How do you do?' is not a question about health; it is a formal formulaic introduction phrase. The correct polite reply is 'How do you do?' or 'Pleased to meet you'.",
      memoryHook: "Echo back: 'How do you do?' -> 'How do you do?'."
    }
  ],

  faqList: [
    {
      question: "Why is 'Myself [Name]' considered a serious grammatical error in introductions?",
      answer: "In English grammar, 'myself' is a reflexive or emphatic pronoun. A reflexive pronoun requires an antecedent in the same clause (e.g., 'I hurt myself'). It can never function as the independent subject of a sentence."
    },
    {
      question: "What is the difference between 'Can you help me?' and 'Could you help me?'",
      answer: "'Can' asks about physical capability or informal possibility, whereas 'Could' is a polite modal past form that expresses higher deference, courtesy, and formality, making it ideal for professional contexts."
    },
    {
      question: "How do you politely decline an invitation in official correspondence?",
      answer: "Express appreciation first, state your inability with an expression of regret, and offer good wishes: e.g., 'Thank you for your kind invitation. Due to a prior official commitment, I regret that I will be unable to attend. I wish the conference every success.'"
    },
    {
      question: "What is the difference between 'adjourn' and 'prorogue' in official proceedings?",
      answer: "'Adjourn' suspends the sitting of a meeting or house to a specific future time or sine die, but does not end the session. 'Prorogue' terminates the entire official legislative session by executive order."
    },
    {
      question: "Which expression is appropriate when an audio connection breaks during a video call?",
      answer: "Politely inform the speaker using standard digital etiquette: 'Pardon me, your audio is cutting out / breaking up. Could you kindly repeat the last sentence?'"
    }
  ],

  oneLinerRevision: [
    "'Good evening' is a greeting used upon arrival after 5 PM; 'Good night' is exclusively a parting phrase.",
    "The formal traditional response to the initial greeting 'How do you do?' is 'How do you do?'.",
    "Expressions beginning with 'Would you mind' must be followed by a gerund ('-ing' form).",
    "To agree politely to a 'Would you mind...' request, say 'Not at all' or 'Certainly not'.",
    "Introductions should never begin with the reflexive pronoun 'Myself' ('This is...' or 'I am...' is correct).",
    "The noun 'congratulations' is followed by the preposition 'on', never 'for'.",
    "On the telephone, identify yourself with 'This is [Name]' or '[Name] speaking', not 'I am [Name]'.",
    "'To call a meeting to order' means to officially begin the formal assembly proceedings.",
    "'Adjourn sine die' means to conclude or postpone a meeting without setting a specific date for reconvening.",
    "Expressions of condolence always take the plural form: 'Please accept my heartfelt condolences'."
  ],

  rapidRevision: {
    summary: "Common expressions constitute the polite formulas, modal auxiliary etiquette, meeting protocols, and standard phrases essential for professional and administrative English. Key rules include using 'Good evening' as a greeting and 'Good night' only for parting, pairing 'Would you mind' with gerunds and answering with 'Not at all', introducing oneself without 'Myself', congratulating 'on' achievements, and mastering meeting formulas like 'call to order' and 'adjourn sine die'.",
    keyTakeaways: [
      "Greetings: 'Good evening' = arrival; 'Good night' = departure; 'How do you do?' = replied with 'How do you do?'.",
      "Grammar Rules: 'Would you mind + V-ing'; 'Congratulations ON'; never 'Myself [Name]'.",
      "Telephone Register: 'This is [Name] speaking'; 'May I ask who is calling?'; 'Hold the line, please'.",
      "Meeting Formulas: 'Call to order' (start); 'Table a motion' (propose); 'Adjourn sine die' (end without fixed date).",
      "Diplomacy: Soften disagreements with 'With due respect' or 'I am afraid I have a different perspective'."
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = `cgv_master_${studyNoteData.topicId}`;
    const sanitized = sanitizeForFirestore(studyNoteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    // Sync syllabus
    const syllabusRef = db.collection('syllabi').doc('cgv_master');
    const syllabusDoc = await syllabusRef.get();
    if (syllabusDoc.exists) {
      const sylData = syllabusDoc.data();
      let updated = false;
      if (sylData.subjects) {
        for (const sub of sylData.subjects) {
          if (sub.chapters) {
            for (const ch of sub.chapters) {
              if (ch.topics) {
                for (const top of ch.topics) {
                  if (top.id === studyNoteData.topicId) {
                    top.hasStudyNotes = true;
                    updated = true;
                  }
                }
              }
            }
          }
        }
      }
      if (updated) {
        await syllabusRef.set(sylData);
        console.log(`[Syllabus Synced] hasStudyNotes: true for ${studyNoteData.topicId}`);
      } else {
        console.log(`[Syllabus Sync Warning] Topic ${studyNoteData.topicId} not found in syllabus.`);
      }
    }
    console.log(`Topic ${studyNoteData.topicId} (${studyNoteData.topicName}) completed successfully!`);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
