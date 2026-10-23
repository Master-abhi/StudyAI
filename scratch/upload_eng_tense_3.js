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
      return obj.map(row => ({ cells: row.map(cell => (cell === undefined ? null : cell)) }));
    }
    return obj.map(item => sanitizeForFirestore(item));
  }
  if (obj !== null && typeof obj === 'object') {
    const cleanObj = {};
    for (const key of Object.keys(obj)) {
      cleanObj[key] = sanitizeForFirestore(obj[key]);
    }
    return cleanObj;
  }
  return obj === undefined ? null : obj;
}

async function markTopicCompleted(subjectId, chapterId, topicId) {
  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (!doc.exists) return;
  const data = doc.data();
  const sub = data.subjects?.find(s => s.id === subjectId);
  if (!sub) return;
  const ch = sub.chapters?.find(c => c.id === chapterId);
  if (!ch) return;
  const top = ch.topics?.find(t => t.id === topicId);
  if (!top) return;

  top.hasStudyNotes = true;
  await syllabusRef.update({ subjects: data.subjects });
  console.log(`[Syllabus Synced] hasStudyNotes: true for ${topicId}`);
}

const noteData = {
  subjectId: 'cgv_master_sub_6',
  chapterId: 'cgv_master_sub_6_ch_2',
  topicId: 'eng_tense_3',
  title: 'Future Tense - Simple, Continuous, Perfect & Perfect Continuous',
  subjectName: 'English Language',
  chapterName: 'Tenses',
  overview: {
    introduction: 'In English grammar, Future Tense refers to the verb forms and modal constructions used to express actions, events, or states expected to occur after the present moment of speaking. Unlike past and present, English has no inflected morphological future verb form; future time is expressed through modal auxiliaries ("will" and "shall"), semi-modals ("be going to"), and present tenses with future time markers. It is categorized into four aspects: Simple Future (Future Indefinite), Future Continuous (Future Progressive), Future Perfect, and Future Perfect Continuous. In CG Vyapam exams, Future Tense is a major source of questions, particularly the "By + Future Time" trigger for Future Perfect ("By next year, he will have graduated") and the strict prohibition of "will" in conditional and temporal subordinate clauses.',
    importance: 'Understanding the distinction between spontaneous decisions ("will"), prior intentions ("going to"), and fixed official schedules (Simple Present) is essential for precision in English sentence completion and cloze tests.',
    examRelevance: 'Examiners heavily test: Future Perfect with "By the end of this month / By 2026", the rule prohibiting double future in "when / if / as soon as" clauses, traditional "shall" with 1st person vs determination/command "shall" with 2nd/3rd person, and the replacement of "since" with "from" in Future Perfect Continuous.',
    quickFacts: [
      'Simple Future Structure = Subject + will/shall + V1.',
      'Future Continuous Structure = Subject + will/shall + be + V1-ing.',
      'Future Perfect Structure = Subject + will/shall + have + V3.',
      'Future Perfect Continuous Structure = Subject + will/shall + have + been + V1-ing + for/from.',
      '"By + Future Time" is the universal trigger for Future Perfect: "By 2027, the bridge will have been constructed".',
      'Double Future is prohibited: "When you will come, I will help you" ❌ $\\rightarrow$ "When you come, I will help you" ✔️.',
      'In modern English, "will" is used with all persons, but in official legal drafting and commands, "shall" is used with 2nd/3rd person.',
      'In Future Perfect Continuous, "since" is NOT used to mark the starting point; "FROM" is used instead (e.g., "from next Monday").'
    ]
  },
  chapters: [
    {
      id: 'ch_1',
      title: '1. Simple Future Tense - Shall vs Will, Be Going To & Instant Decisions',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + will / shall + V1 (Base form) + Object.\n  - *"I shall go to Raipur tomorrow."* | *"He will buy a new laptop."*\n- **Negative**: Subject + will / shall + not (won\'t / shan\'t) + V1.\n  - *"They will not attend the seminar."*\n- **Interrogative**: Will / Shall + Subject + V1 + ?\n  - *"Shall we start the discussion?"*\n\n**Traditional vs Modal Rules of Shall and Will (व्यापाम परीक्षा नियम)**:\n1. **Pure Future (सामान्य भविष्य)**:\n   - 1st Person (I, We) $\\rightarrow$ **shall** (*"I shall be twenty next week"*).\n   - 2nd & 3rd Person (You, He, She, It, They) $\\rightarrow$ **will** (*"He will arrive on Sunday"*).\n2. **Modal Meaning: Determination, Promise, Threat, Command, Official Regulation**:\n   - The roles reverse! When expressing strong determination, compulsion, or legal mandate:\n   - 1st Person (I, We) $\\rightarrow$ **will** (*"I will fight for justice"* - determination).\n   - 2nd & 3rd Person (You, He, She, They) $\\rightarrow$ **shall** (*"You shall not enter without permission"* - command / legal mandate; *"He shall be rewarded"* - promise).\n\n**"Will" vs "Be Going To" vs "Present Continuous" for Future**:\n- **Will**: Spontaneous, instant decision made at the moment of speaking:\n  - *"The phone is ringing. - I will answer it."*\n- **Be going to (is/am/are going to + V1)**: Prior intention, plan, or strong physical evidence:\n  - *"Look at those dark clouds! It is going to rain."* (Physical evidence).\n  - *"I am going to buy a car next month."* (Pre-planned intention).\n- **Simple Present**: Fixed official timetable or public schedule:\n  - *"The Prime Minister arrives in Raipur tomorrow."*'
    },
    {
      id: 'ch_2',
      title: '2. Future Continuous Tense - Ongoing Future Actions & Inevitable Routines',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + will / shall + be + V1-ing + Object.\n  - *"At 10 AM tomorrow, she will be taking her examination."*\n  - *"We shall be travelling to Bastar this weekend."*\n- **Negative**: Subject + will / shall + not + be + V1-ing.\n- **Interrogative**: Will / Shall + Subject + be + V1-ing + ?\n\n**Core Usages**:\n1. **Action in Progress at a Specific Given Time in the Future**:\n   - When an action is expected to be underway at a specified future moment:\n   - *"Don\'t call me at 2 PM; I will be sleeping."*\n   - *"This time next year, I will be working as a Government Officer."*\n2. **Routine Events Occurring in the Normal Course of Things**:\n   - Used to politely inquire or state something that will happen naturally as part of a fixed routine:\n   - *"I will be seeing the doctor tomorrow anyway, so I can collect your report."*\n   - *"Will you be using your typewriter this afternoon?"* (Polite inquiry without putting pressure).'
    },
    {
      id: 'ch_3',
      title: '3. Future Perfect Tense - The "BY" Formula & Time Sequences',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + will / shall + have + V3 (Past Participle) + Object.\n  - *"She will have finished her degree by next June."*\n  - *"They will have built the highway by 2027."*\n- **Negative**: Subject + will / shall + not + have + V3.\n- **Interrogative**: Will / Shall + Subject + have + V3 + ?\n\n**The Universal "BY" Formula (व्यापाम का सबसे प्रिय प्रश्न)**:\n- The Future Perfect tense expresses an action that will be completed **before or by a specific deadline** in the future.\n- Whenever a sentence contains **"By + Future Time"** or **"By the time + Simple Present"**, the main verb MUST be in the **Future Perfect (will have + V3)**:\n\n$$\\text{BY} + \\text{Future Time Point} \\longrightarrow \\text{Subject} + \\text{will have} + \\text{V3}$$\n\n- Examples:\n  - *"By next month, we will have completed this project."*\n  - *"By the end of this year, he will have retired."*\n  - *"By 2030, scientists will have discovered a cure for this disease."*\n\n**Sequence with "By the time"**:\n$$\\text{By the time} + \\text{Subject} + \\text{V1 (Simple Present)}, \\text{Subject} + \\text{will have} + \\text{V3}$$\n- *"By the time you reach the station, the train will have departed."*\n- *"By the time the doctor arrives, the patient will have recovered."*\n- *Vyapam Trap*: Do NOT use "will reach" in the "By the time" clause!'
    },
    {
      id: 'ch_4',
      title: '4. Future Perfect Continuous Tense & The "FROM" Replacement Rule',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + will / shall + have + been + V1-ing + Object + for / from + Time.\n  - *"By 5 PM, he will have been driving for eight hours."*\n  - *"Next month, she will have been working in this department for ten years."*\n- **Negative**: Subject + will / shall + not + have + been + V1-ing.\n- **Interrogative**: Will / Shall + Subject + have + been + V1-ing + ?\n\n**Core Usage**:\n- Used to emphasize the duration of an action that will continue up to a designated point in future time.\n\n**THE "FROM" vs "SINCE" REPLACEMENT RULE (Crucial Vyapam Rule)**:\n- In Present Perfect Continuous and Past Perfect Continuous, "since" is used for a point of time.\n- But in the **Future Perfect Continuous**, **"SINCE" CANNOT BE USED**! It is replaced by **"FROM"**:\n  - Incorrect: *"He will have been studying since next Monday."* ❌\n  - Correct: *"He will have been studying from next Monday."* ✔️\n  - Correct with duration: *"By next year, I will have been living here for twenty years."* ✔️'
    },
    {
      id: 'ch_5',
      title: '5. CG Vyapam Traps, Double Future Prohibition & Elimination Formulas',
      content: '**1. The Double Future Prohibition (Top Vyapam Error Spotting Trap)**:\n- When two clauses refer to future actions linked by temporal or conditional conjunctions (**if, when, as soon as, before, after, until, unless, in case, as long as**):\n  - The subordinate clause containing the conjunction takes **Simple Present (V1)**.\n  - The main clause takes **Simple Future (will + V1)**.\n  - **NEVER use "will" in both clauses!**\n  - Incorrect: *"When you will arrive, we will go for shopping."* ❌\n  - Correct: *"When you arrive, we will go for shopping."* ✔️\n  - Incorrect: *"As soon as the bell will ring, the students will run out."* ❌\n  - Correct: *"As soon as the bell rings, the students will run out."* ✔️\n  - Incorrect: *"If it will rain, the match will be abandoned."* ❌\n  - Correct: *"If it rains, the match will be abandoned."* ✔️\n\n**2. Future Perfect vs Simple Future with "By"**:\n- Without "By" (point in time) $\\rightarrow$ Simple Future: *"He will return in June."*\n- With "By" (deadline) $\\rightarrow$ Future Perfect: *"He will have returned by June."*\n\n**3. Master Tense Summary for Vyapam**:\n- Spontaneous decision / General future $\\rightarrow$ **will + V1**.\n- Ongoing at future time $\\rightarrow$ **will be + V1-ing**.\n- Completed by a deadline (By...) $\\rightarrow$ **will have + V3**.\n- Subordinate time/if clause $\\rightarrow$ **Simple Present (V1)**.'
    }
  ],
  comparativeTables: [
    {
      title: 'The 4 Future Tense Aspects - Master Structural Matrix',
      headers: ['Tense Aspect', 'Auxiliary + Verb Form', 'Key Syntactic Function', 'Signal Words / Triggers', 'Standard Sentence Example'],
      rows: [
        ['Simple Future', 'will / shall + V1', 'Prediction, promise, spontaneous decision', 'tomorrow, next week, soon, in a few days', 'He will join the state civil service soon.'],
        ['Future Continuous', 'will / shall + be + V1-ing', 'Ongoing action at a designated future moment', 'at this time tomorrow, this time next month', 'At 11 AM tomorrow, she will be giving an interview.'],
        ['Future Perfect', 'will / shall + have + V3', 'Action completed by a future deadline', 'by next year, by then, by the end of...', 'By 2026, the construction will have finished.'],
        ['Future Perfect Cont.', 'will / shall + have been + V1-ing', 'Duration continuing up to a future point', 'by... for, from (point of time)', 'By next July, he will have been teaching for 10 years.']
      ]
    },
    {
      title: 'Ways of Expressing the Future in English (Semantic Comparison)',
      headers: ['Structure / Tense', 'Communicative Function', 'Level of Certainty / Plan', 'Standard Example'],
      rows: [
        ['Will + V1', 'Spontaneous decision, prediction, promise', 'Decided at the moment of speech', 'I will open the door for you.'],
        ['Be going to + V1', 'Pre-existing intention, visual evidence', 'Decided prior to speech, impending event', 'Look at the sky; it is going to rain.'],
        ['Present Continuous', 'Personal arrangement, agreed appointment', 'Very high; logistics arranged', 'I am meeting the Collector tomorrow at 4 PM.'],
        ['Simple Present', 'Fixed public timetable, official schedule', 'Definite calendar / official schedule', 'The train departs at 6:45 AM tomorrow.'],
        ['Be about to + V1', 'Immediate future (on the verge of happening)', 'Imminent within minutes', 'The ceremony is about to begin.']
      ]
    },
    {
      title: 'Conditional & Time Conjunctions: Subordinate vs Main Clause Concord',
      headers: ['Conjunction', 'Subordinate Clause (Mandatory Tense)', 'Main Clause (Future)', 'Exam Sentence Example'],
      rows: [
        ['If / Unless', 'Simple Present (V1/V1-s)', 'will / shall + V1', 'Unless he works hard, he will fail.'],
        ['When / As soon as', 'Simple Present (V1/V1-s)', 'will / shall + V1', 'As soon as the chief guest arrives, we will start.'],
        ['Before / Until', 'Simple Present (V1/V1-s)', 'will / shall + V1', 'Wait here until the manager calls you.'],
        ['By the time', 'Simple Present (V1/V1-s)', 'will have + V3 (Future Perfect)', 'By the time you reach, the shop will have closed.']
      ]
    }
  ],
  pyqs: [
    {
      question: 'Fill in the blank with the correct verb form: "By next month, we _______ this syllabus."',
      options: [
        'will complete',
        'will have completed',
        'have completed',
        'completed'
      ],
      answer: 'will have completed',
      explanation: 'The time marker "By next month" indicates a deadline by which the action will be accomplished in the future. This strictly requires the Future Perfect Tense: "will have completed".',
      year: '2023',
      exam: 'CG Vyapam संयुक्त भर्ती परीक्षा'
    },
    {
      question: 'Identify the grammatically correct sentence:',
      options: [
        'When you will come, we will go to the market.',
        'When you come, we will go to the market.',
        'When you came, we will go to the market.',
        'When you will come, we go to the market.'
      ],
      answer: 'When you come, we will go to the market.',
      explanation: 'In conditional or time clauses introduced by "when", the verb must be in the Simple Present Tense ("when you come"), while the main clause takes Simple Future ("we will go"). Double future ("will come... will go") is incorrect.',
      year: '2022',
      exam: 'CG Vyapam पटवारी भर्ती'
    },
    {
      question: 'Fill in the blank: "By the time the police arrive, the thieves _______."',
      options: [
        'will escape',
        'will have escaped',
        'escaped',
        'have escaped'
      ],
      answer: 'will have escaped',
      explanation: 'When "By the time" introduces a clause in Simple Present ("arrive"), the main clause takes the Future Perfect Tense ("will have escaped").',
      year: '2021',
      exam: 'CG Vyapam खाद्य निरीक्षक'
    },
    {
      question: '"Look at those dark clouds! It _______ rain."',
      options: [
        'will',
        'is going to',
        'shall',
        'would'
      ],
      answer: 'is going to',
      explanation: 'When a future event is predicted based on present, visible evidence (dark clouds), "be going to" is preferred over "will": "It is going to rain".',
      year: '2019',
      exam: 'CG Vyapam DEO'
    },
    {
      question: 'Fill in the blank: "At this time tomorrow, she _______ her flight to London."',
      options: [
        'will board',
        'will be boarding',
        'boards',
        'boarded'
      ],
      answer: 'will be boarding',
      explanation: '"At this time tomorrow" points to an action that will be in active progress at that specific future moment, requiring the Future Continuous Tense ("will be boarding").',
      year: '2018',
      exam: 'CG Vyapam शिक्षक पात्रता परीक्षा (TET)'
    },
    {
      question: '"As soon as he _______, I will give him the message."',
      options: [
        'arrives',
        'will arrive',
        'arrived',
        'is arriving'
      ],
      answer: 'arrives',
      explanation: 'In a time clause introduced by "As soon as", the verb must be in Simple Present ("arrives"), not future ("will arrive").',
      year: '2017',
      exam: 'CG Vyapam छात्रावास अधीक्षक'
    }
  ],
  mcqs: [
    {
      question: 'Which preposition is used instead of "since" in Future Perfect Continuous Tense for a point of time?',
      options: ['at', 'from', 'by', 'in'],
      answer: 'from',
      explanation: 'In the Future Perfect Continuous Tense, "from" replaces "since" when denoting the starting point of an action (e.g., "from next Monday").'
    },
    {
      question: 'Fill in the blank: "The Chief Minister _______ the new hospital next Monday."',
      options: ['inaugurates', 'will be inaugurated', 'inaugurated', 'has inaugurated'],
      answer: 'inaugurates',
      explanation: 'Official, fixed governmental schedules can be expressed in the Simple Present Tense ("inaugurates next Monday").'
    },
    {
      question: '"By the year 2030, scientists _______ a cure for cancer."',
      options: ['will discover', 'will have discovered', 'discovered', 'have discovered'],
      answer: 'will have discovered',
      explanation: '"By the year 2030" indicates a future deadline, requiring the Future Perfect Tense ("will have discovered").'
    },
    {
      question: 'Choose the sentence with the correct use of "shall" to express a promise/command:',
      options: [
        'You will not steal.',
        'You shall not steal.',
        'You should not stealing.',
        'You shall stealing.'
      ],
      answer: 'You shall not steal.',
      explanation: 'When used with second-person "you" or third-person, "shall" expresses a strict command, legal obligation, or prohibition.'
    },
    {
      question: 'Fill in the blank: "If you _______ carefully, you will understand the lecture."',
      options: ['will listen', 'listen', 'listened', 'listening'],
      answer: 'listen',
      explanation: 'The conditional "if-clause" must take Simple Present ("listen"), not "will listen".'
    },
    {
      question: '"By next July, he _______ in this university for twenty years."',
      options: [
        'will be teaching',
        'will have been teaching',
        'teaches',
        'has been teaching'
      ],
      answer: 'will have been teaching',
      explanation: 'A future deadline ("By next July") combined with a duration ("for twenty years") requires Future Perfect Continuous ("will have been teaching").'
    },
    {
      question: 'Identify the sentence with an error:',
      options: [
        'I will call you when I reach Raipur.',
        'I will call you when I will reach Raipur.',
        'She will help you if you ask her.',
        'Unless you run fast, you will miss the train.'
      ],
      answer: 'I will call you when I will reach Raipur.',
      explanation: 'The time clause "when I will reach" incorrectly uses "will". It must be "when I reach Raipur".'
    },
    {
      question: 'Fill in the blank: "I _______ to attend the marriage ceremony tomorrow."',
      options: ['am going', 'went', 'have gone', 'gone'],
      answer: 'am going',
      explanation: '"Am going" (Present Continuous) is used to express a pre-arranged personal commitment in the near future.'
    }
  ],
  keyTerminology: [
    {
      term: 'Future Tense',
      definition: 'A verb category indicating an action, state, or event projected to take place after the present speech time.'
    },
    {
      term: 'Double Future Prohibition',
      definition: 'The grammatical rule prohibiting modal "will" in both the condition/time clause and the main clause.'
    },
    {
      term: 'Future Perfect',
      definition: 'The verb aspect (will have + V3) denoting an action anticipated to be completed prior to a designated future deadline.'
    },
    {
      term: 'Temporal Clause',
      definition: 'A subordinate clause introduced by time conjunctions (when, as soon as, before, until) functioning in the Simple Present.'
    },
    {
      term: 'Spontaneous Decision',
      definition: 'A future intention formulated at the immediate moment of speaking, expressed by modal "will".'
    },
    {
      term: 'Pre-planned Intention',
      definition: 'A future event planned prior to the moment of speaking, expressed by "be going to" or Present Continuous.'
    },
    {
      term: 'Subordinate Clause of Condition',
      definition: 'An if-clause that governs the premise under which the main clause future event will occur.'
    },
    {
      term: 'From (Temporal)',
      definition: 'The preposition used in future perfect continuous contexts to mark the starting point of an ongoing activity.'
    }
  ],
  sources: [
    {
      name: 'High School English Grammar & Composition',
      author: 'Wren & Martin (Revised by N.D.V. Prasada Rao)',
      relevance: 'Comprehensive chapter on Future Time expressions, Shall vs Will, and Future Perfect.'
    },
    {
      name: 'Practical English Usage',
      author: 'Michael Swan (Oxford University Press)',
      relevance: 'Nuanced distinctions between Will, Going to, and Present Continuous for future plans.'
    },
    {
      name: 'A Practical English Grammar',
      author: 'A. J. Thomson and A. V. Martinet',
      relevance: 'Formulas for time clauses (when/as soon as + present) and Future Perfect deadlines.'
    },
    {
      name: 'CG Vyapam General English Question Bank',
      author: 'Vyapam Examination Directorate (2012-2024)',
      relevance: 'Collection of 80+ past year questions on future tense structures and error spotting.'
    }
  ],
  confusionBuster: [
    {
      doubt: 'What is the most tested future tense rule in CG Vyapam?',
      clarification: 'The "Double Future Prohibition"! In sentences with "if", "when", "as soon as", or "unless", examiners write "will" in both clauses (e.g., "If you will study, you will pass" ❌). The rule is: remove "will" from the "if/when" clause $\\rightarrow$ "If you study, you will pass" ✔️.'
    },
    {
      doubt: 'Why does "By next year" take Future Perfect instead of Simple Future?',
      clarification: '"In next year" means at some point during the year (Simple Future: "I will visit Bastar in 2027"). But "BY next year" sets a deadline meaning "at or before that point" (Future Perfect: "I will have completed the book BY 2027").'
    },
    {
      doubt: 'Why can we NOT use "since" in Future Perfect Continuous?',
      clarification: '"Since" in English strictly relates a past point to the present. For an action starting at a future point, "FROM" must be used (e.g., "from tomorrow", NOT "since tomorrow").'
    },
    {
      doubt: 'When do we use "shall" with "he" or "you"?',
      clarification: 'In modern English, "will" is used for general future with all persons. "Shall" is used with 2nd and 3rd person (you, he, they) ONLY when expressing an official decree, legal regulation, promise, or threat (e.g., "The defendant shall appear before the court").'
    },
    {
      doubt: 'What is the difference between "He will buy a car" and "He is going to buy a car"?',
      clarification: '"He will buy a car" is a general prediction or a decision made just now. "He is going to buy a car" means he has already thought about it, saved money, and intends to execute the plan.'
    }
  ],
  faqList: [
    {
      question: 'What are the four forms of Future Tense in English?',
      answer: '1. Simple Future (Future Indefinite), 2. Future Continuous (Future Progressive), 3. Future Perfect, and 4. Future Perfect Continuous.'
    },
    {
      question: 'What is the formula for the Future Perfect tense?',
      answer: 'Subject + will/shall + have + V3 (e.g., "He will have finished his work").'
    },
    {
      question: 'Can Simple Present express future time?',
      answer: 'Yes. Fixed official schedules and public timetables use Simple Present (e.g., "The train leaves at 6 AM tomorrow").'
    },
    {
      question: 'Why is "When you will come" incorrect?',
      answer: 'Because subordinate time clauses introduced by "when", "before", or "as soon as" must take Simple Present, never "will".'
    },
    {
      question: 'How does CG Vyapam test the Future Tense?',
      answer: 'Through "By + future time" requiring "will have + V3", and error detection questions testing double future in conditional sentences.'
    }
  ],
  oneLinerRevision: [
    'Simple Future (will + V1) expresses predictions, promises, and spontaneous decisions.',
    'Subordinate clauses with "if", "when", or "as soon as" take Simple Present, never "will".',
    '"By + future time" is the signature marker of the Future Perfect tense (will have + V3).',
    'In "By the time you arrive, the train will have departed", "arrive" is Simple Present.',
    '"Be going to" expresses pre-planned intentions or predictions based on visible evidence.',
    'In Future Perfect Continuous, "from" replaces "since" to denote a future starting point.',
    'Future Continuous (will be + V1-ing) expresses an action in progress at a specific future time.',
    'Official timetables and public events can be expressed in Simple Present (The match starts at 7 PM).',
    'With 2nd and 3rd person, "shall" expresses a command, promise, or legal compulsion.',
    'Double future ("will... will") in condition-result sentences is strictly prohibited.'
  ],
  rapidRevision: {
    points: [
      'Simple Future = will/shall + V1 | Spontaneous decision / Prediction',
      'Future Continuous = will/shall be + V1-ing | Ongoing at a specific future moment',
      'Future Perfect = will/shall have + V3 | Completed BY a future deadline',
      'Future Perfect Cont. = will/shall have been + V1-ing + for/from',
      'BY next year / BY 2027 $\\rightarrow$ will have + V3',
      'If / When / As soon as + Simple Present $\\rightarrow$ will + V1 (NO double future!)',
      'Since ❌ in future $\\rightarrow$ FROM ✔️ in future'
    ],
    formula: 'By + Future Time = will have + V3 | When/If (V1) $\\rightarrow$ Main Clause (will + V1)',
    examTips: [
      'Vyapam Shortcut: Look for "BY" followed by future time (e.g., "by next month", "by 2028") $\\rightarrow$ Immediately select "will have + V3"!',
      'Check conditional sentences: If you see "If... will" or "When... will", that clause is 100% grammatically wrong!'
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = 'cgv_master_eng_tense_3';
    const sanitized = sanitizeForFirestore(noteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    await markTopicCompleted('cgv_master_sub_6', 'cgv_master_sub_6_ch_2', 'eng_tense_3');
    console.log('Topic eng_tense_3 (Future Tense) completed successfully! Chapter 2 of English is now 100% complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
