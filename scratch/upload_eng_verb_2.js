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
  chapterId: 'cgv_master_sub_6_ch_3',
  topicId: 'eng_verb_2',
  title: 'Auxiliary Verbs - Primary Auxiliaries (Be, Do, Have) & Functional Mechanics',
  subjectName: 'English Language',
  chapterName: 'Verb Forms',
  overview: {
    introduction: 'In English grammar, Auxiliary Verbs (also known as Helping Verbs) are verbs used alongside a principal (main) verb to express tense, aspect, modality, voice, emphasis, or to formulate questions and negative statements. Auxiliary verbs are classified into two broad categories: Primary Auxiliaries ("be", "do", and "have") and Modal Auxiliaries ("can", "could", "may", "might", "shall", "should", "will", "would", "must", "ought to"). Unlike modal auxiliaries, primary auxiliaries can function both as helping verbs and as independent main verbs in a sentence. In CG Vyapam examinations (Patwari, RI, Sub-Inspector, Hostel Warden, and Teacher Eligibility Test), distinguishing between primary auxiliaries as main vs helping verbs, forming emphatic structures, causative constructions ("have something done"), and auxiliary alignment in question tags are tested in 2 to 3 questions per paper.',
    importance: 'Without auxiliary verbs, forming negative statements, interrogatives, continuous tenses, perfect tenses, and passive voice is syntactically impossible in English. They form the foundational operational engine of the English verbal system.',
    examRelevance: 'Examiners frequently test: the dual role of "do" (main verb vs dummy auxiliary for negation/inversion), the dual role of "have" (possession vs perfect auxiliary), causative uses of "have/get", emphatic "do" ("I do believe you"), and auxiliary inversion in negative sentences.',
    quickFacts: [
      'The three Primary Auxiliary Verbs in English are: BE, DO, and HAVE.',
      'Primary auxiliaries change their forms according to the number and person of the subject (inflected).',
      'The verb "BE" has 8 forms: be, am, is, are, was, were, being, been (the most irregular verb in English).',
      '"BE" is used to form Continuous Tenses (is/was + V1-ing) and the Passive Voice (be + V3).',
      '"DO" (do, does, did) is used to form Negatives and Questions in Simple Present and Simple Past.',
      '"DO" can be used affirmatively for EMPHASIS: "I do understand your problem" (emphasizes the truth).',
      '"HAVE" (have, has, had) forms all Perfect Tenses (have + V3) and expresses possession as a main verb.',
      'Causative "Have": Subject + have + Object + V3 (e.g., "I had my watch repaired").'
    ]
  },
  chapters: [
    {
      id: 'ch_1',
      title: '1. Concept & Classification of Auxiliary Verbs (Primary vs Modal Auxiliaries)',
      content: '**What is an Auxiliary Verb?**:\n- The word "auxiliary" originates from the Latin "auxilium", meaning "help" or "aid".\n- An auxiliary verb assists the main verb in conveying grammatical meaning (time, aspect, voice, mood) without carrying full lexical semantic meaning by itself.\n\n**Two Fundamental Classes of Auxiliaries**:\n\n1. **Primary Auxiliaries (BE, DO, HAVE)**:\n   - They can function as **Helping Verbs** (assisting another verb) OR as **Main Verbs** (standing alone):\n     - As Helping Verb: *"He is reading a novel."* ("is" = auxiliary; "reading" = main verb).\n     - As Main Verb: *"He is a doctor."* ("is" = main linking verb).\n     - As Helping Verb: *"I do not know him."* ("do" = auxiliary; "know" = main verb).\n     - As Main Verb: *"I did my homework."* ("did" = main action verb).\n     - As Helping Verb: *"She has finished dinner."* ("has" = auxiliary; "finished" = main verb).\n     - As Main Verb: *"She has a luxury car."* ("has" = main verb expressing possession).\n   - They inflect for person, number, and tense (e.g., has/have, is/am/are, does/did).\n\n2. **Modal Auxiliaries (CAN, COULD, MAY, MIGHT, MUST, SHALL, SHOULD, WILL, WOULD, OUGHT TO)**:\n   - They express modalities like ability, permission, possibility, necessity, or duty.\n   - They NEVER change form with subject person or number (no -s or -ed suffixes).\n   - They CANNOT stand alone as main verbs (always followed by base form V1).'
    },
    {
      id: 'ch_2',
      title: '2. The Verb "BE" - Continuous Aspect, Passive Voice & Linking Functions',
      content: '**The 8 Forms of the Verb "BE"**:\n- Base form: **be**\n- Present tense: **am** (1st person), **is** (3rd person singular), **are** (plural & 2nd person)\n- Past tense: **was** (singular), **were** (plural & subjunctive)\n- Present participle: **being**\n- Past participle: **been**\n\n**Major Grammatical Functions of "BE"**:\n1. **Formation of Continuous / Progressive Tenses**:\n   - Present Continuous: *"She is singing a song."*\n   - Past Continuous: *"They were playing football."*\n   - Future Continuous: *"He will be travelling tomorrow."*\n2. **Formation of the Passive Voice (MANDATORY Auxiliary)**:\n   - Passive structure is always: **Form of BE + V3 (Past Participle)**:\n     - *"The letter is written by Rohan."* (is + written)\n     - *"The tiger was killed by the hunter."* (was + killed)\n     - *"The road is being repaired."* (is being + repaired)\n     - *"The bridge has been constructed."* (has been + constructed)\n3. **As a Linking Verb (Copula) expressing State, Identity, or Quality**:\n   - When "be" connects a subject to a subject complement (noun or adjective):\n     - *"Gold is yellow."* (Linking verb + Adjective)\n     - *"Dr. Raman Singh is a politician."* (Linking verb + Noun)\n4. **"Be + to-infinitive" to express Official Plans, Commands, or Destiny**:\n   - *"The President is to visit Raipur next week."* (Planned official event)\n   - *"You are to remain here until further orders."* (Official command)\n   - *"He was never to see his homeland again."* (Destiny).'
    },
    {
      id: 'ch_3',
      title: '3. The Verb "DO" - Negatives, Questions, Emphasis & Inversion',
      content: '**The 5 Forms of "DO"**:\n- Base form: **do** | Present: **do** (plural), **does** (singular) | Past: **did** | Participles: **doing, done**.\n\n**Key Operational Functions of "DO" (व्यापाम परीक्षा नियम)**:\n\n1. **Dummy Operator in Negatives & Interrogatives (Do-Support)**:\n   - In Simple Present and Simple Past, there is no auxiliary verb in affirmative sentences (*"He eats"*, *"He ate"*). To make them negative or interrogative, English uses the dummy auxiliary "do/does/did":\n   - Affirmative: *"She likes ice cream."* $\\rightarrow$ Negative: *"She does not like ice cream."*\n   - Affirmative: *"They visited Delhi."* $\\rightarrow$ Interrogative: *"Did they visit Delhi?"*\n   - *Vyapam Trap*: "Do/does/did" is always followed by **V1 (Base form)**, NEVER V2 or -s form! (*"Did he went"* ❌ $\\rightarrow$ *"Did he go"* ✔️).\n\n2. **Emphatic Use of "DO" (जोर देने के लिए प्रयोग)**:\n   - "Do/does/did" can be placed before a main verb in affirmative sentences to express strong conviction, reassurance, or contrast:\n   - *"I do believe you."* (I really believe you; reassurance).\n   - *"She does look beautiful today."* (Emphatic admiration).\n   - *"He did attend the meeting yesterday, contrary to what you said."* (Refuting a doubt).\n   - In Imperatives: *"Do sit down, please."* (Polite, urgent invitation).\n\n3. **Avoiding Repetition (Code Function)**:\n   - *"Do you speak Chhattisgarhi? - Yes, I do."* (Avoids repeating "Yes, I speak Chhattisgarhi").\n   - *"Rohan ran fast, and so did Sohan."*\n\n4. **Inversion after Negative Adverbs (Hardly, Seldom, Never)**:\n   - When a sentence begins with a negative adverb, "do/did" is placed before the subject:\n   - *"Seldom does he visit his native village."*\n   - *"Never did I expect such an outcome."*'
    },
    {
      id: 'ch_4',
      title: '4. The Verb "HAVE" - Perfect Tenses, Causative Constructions & Obligation',
      content: '**The 4 Forms of "HAVE"**:\n- Base form: **have** | Present: **have** (plural), **has** (singular) | Past: **had** | Participle: **having, had**.\n\n**Key Functions of "HAVE"**:\n1. **Formation of Perfect Tenses (Primary Auxiliary)**:\n   - Present Perfect: *"I have completed my syllabus."*\n   - Past Perfect: *"The train had left before we arrived."*\n   - Future Perfect: *"She will have graduated by 2026."*\n2. **Expressing Possession / Ownership (Main Verb)**:\n   - *"They have a spacious garden."* | *"He has a headache."*\n   - In modern grammar, negative of possession can be formed with do-support: *"I don\'t have a car"* (preferred) or *"I have no car"*.\n3. **Causative Verb Construction (Get someone to do something - Vyapam Trap)**:\n   - When the subject causes someone else to perform an action for them:\n     $$\\text{Subject} + \\text{HAVE / HAD} + \\text{Object (Thing)} + \\text{V3 (Past Participle)}$$\n     - *"I had my hair cut yesterday."* (I did not cut it myself; a barber cut it).\n     - *"She had her car washed."* (A worker washed it).\n     - *"The manager had the documents signed."*\n4. **Expressing External Obligation / Compulsion ("Have to")**:\n   - "Have to + V1" expresses an external necessity or legal/official compulsion:\n   - *"I have to submit my assignment tomorrow."* (Rules compel me).\n   - *"He had to pay a fine for breaking the traffic signal."*'
    },
    {
      id: 'ch_5',
      title: '5. CG Vyapam Traps, Tag Questions Support & Rapid Elimination Formulas',
      content: '**1. Question Tags and Auxiliary Verb Alignment (व्यापाम का पेटेंट प्रश्न)**:\n- A question tag always repeats the **AUXILIARY VERB** of the main sentence:\n  - Positive Sentence $\\rightarrow$ Negative Tag (*Auxiliary + not + Pronoun*).\n  - Negative Sentence $\\rightarrow$ Positive Tag (*Auxiliary + Pronoun*).\n  - Examples:\n    - *"She is writing, isn\'t she?"* (Auxiliary = is).\n    - *"They have finished, haven\'t they?"* (Auxiliary = have).\n    - *"He cannot swim, can he?"* (Modal = can).\n- **The "Do-Support" Trap in Tags**:\n  - When there is NO auxiliary verb in the sentence (Simple Present / Simple Past), you MUST use **do / does / did** in the tag:\n    - *"She sings well, doesn\'t she?"* (NOT "singsn\'t she" ❌).\n    - *"They played cricket, didn\'t they?"* (NOT "playedn\'t they" ❌).\n    - *"You like tea, don\'t you?"*\n\n**2. "Am I not" vs "Aren\'t I" (The Classic Vyapam Trap)**:\n- There is no contraction "amn\'t" in standard English.\n- In negative question tags with "I am", the correct tag is **"aren\'t I?"**:\n  - *"I am right, aren\'t I?"* (NOT "amn\'t I" ❌).\n  - (In non-contracted form: *"Am I not right?"*).\n\n**3. "Had had" and "Have had" (Double Verb Clarity)**:\n- Students often think "had had" or "have had" is an error. It is completely correct!\n  - First "had/have" = Auxiliary verb; Second "had" = Past participle (V3) of main verb "have" (meaning eat, experience, possess):\n  - *"I have had my breakfast."* (have = auxiliary; had = eaten).\n  - *"If I had had enough money, I would have bought that house."* (had = auxiliary; had = possessed).'
    }
  ],
  comparativeTables: [
    {
      title: 'Primary Auxiliaries: Comprehensive Functions Matrix',
      headers: ['Auxiliary Verb', 'Primary Forms', 'Used as Auxiliary Verb To Form', 'Used as Main Verb To Express', 'Standard Sentence Example'],
      rows: [
        ['BE', 'am, is, are, was, were, being, been', 'Continuous Tenses, Passive Voice, Official Plans', 'State of being, identity, physical quality', 'Aux: The work is being done. | Main: He is a teacher.'],
        ['DO', 'do, does, did, doing, done', 'Negatives, Questions, Emphasis, Question Tags', 'Performance of an action, deed, or task', 'Aux: Do you know him? | Main: She does her work well.'],
        ['HAVE', 'have, has, had, having', 'Perfect Tenses, Perfect Continuous, Causative', 'Possession, ownership, eating, experience', 'Aux: He has left. | Main: I have a laptop.']
      ]
    },
    {
      title: 'Primary Auxiliaries vs Modal Auxiliaries Comparison',
      headers: ['Feature', 'Primary Auxiliaries (Be, Do, Have)', 'Modal Auxiliaries (Can, May, Must, etc.)'],
      rows: [
        ['Number of Verbs', 'Exactly 3 verbs (Be, Do, Have)', '10 primary modals (Can, Could, May, Might, etc.)'],
        ['Ability to Stand Alone', 'Can function as independent MAIN verbs', 'CANNOT stand alone as main verbs (always helping)'],
        ['Inflection (Subject-Verb Agreement)', 'Change form with subject (he is, they are, he has)', 'Never change form (He can, They can - no suffix -s)'],
        ['Followed By', 'V1-ing (Continuous), V3 (Passive/Perfect), V1 (Do)', 'Base form V1 without "to" (except ought to, used to)'],
        ['Negative Formation', 'Takes "not" directly (is not, has not, does not)', 'Takes "not" directly (cannot, must not, should not)']
      ]
    },
    {
      title: 'Question Tag Auxiliary Alignment (Vyapam Cheat Sheet)',
      headers: ['Sentence Structure / Tense', 'Main Clause Example', 'Correct Question Tag', 'Examiner Trap / Error Option'],
      rows: [
        ['With "BE" Auxiliary', 'She is a talented singer,', 'isn\'t she?', 'is she? ❌'],
        ['With "I am" Statement', 'I am your best friend,', 'aren\'t I?', 'amn\'t I? ❌'],
        ['With "HAVE" as Auxiliary', 'They have visited Bastar,', 'haven\'t they?', 'don\'t they? ❌'],
        ['With "HAVE" as Main Verb', 'He has a luxury car,', 'doesn\'t he? (or hasn\'t he?)', 'has he? ❌'],
        ['Simple Present (No Aux)', 'Rohan loves classical music,', 'doesn\'t he?', 'lovesn\'t he? ❌'],
        ['Simple Past (No Aux)', 'The students passed the test,', 'didn\'t they?', 'passedn\'t they? ❌'],
        ['Imperative Sentence', 'Open the window,', 'will you?', 'don\'t you? ❌'],
        ['Let\'s Proposal', 'Let us play cricket,', 'shall we?', 'will we? ❌']
      ]
    }
  ],
  pyqs: [
    {
      question: 'Choose the correct question tag: "She sings beautifully, _______?"',
      options: [
        'singsn\'t she',
        'doesn\'t she',
        'isn\'t she',
        'does she'
      ],
      answer: 'doesn\'t she',
      explanation: 'In the Simple Present Tense without an auxiliary verb, the dummy auxiliary "do/does" is used in the question tag. Since the subject "she" is third-person singular and the main sentence is affirmative, the negative tag is "doesn\'t she?".',
      year: '2023',
      exam: 'CG Vyapam संयुक्त भर्ती परीक्षा'
    },
    {
      question: 'Fill in the blank with the appropriate question tag: "I am right, _______?"',
      options: [
        'amn\'t I',
        'am I',
        'aren\'t I',
        'isn\'t I'
      ],
      answer: 'aren\'t I',
      explanation: 'In standard English grammar, there is no contracted form "amn\'t I". The accepted negative tag for "I am" is "aren\'t I?".',
      year: '2022',
      exam: 'CG Vyapam पटवारी भर्ती'
    },
    {
      question: 'Identify the sentence where the auxiliary verb "DO" is used for emphasis:',
      options: [
        'Do you speak English?',
        'He does not like sweets.',
        'I do want to help you.',
        'What did she say?'
      ],
      answer: 'I do want to help you.',
      explanation: 'In "I do want to help you", the auxiliary "do" is placed before the main verb "want" in an affirmative statement to add emotional emphasis and conviction.',
      year: '2021',
      exam: 'CG Vyapam खाद्य निरीक्षक'
    },
    {
      question: 'Choose the correct causative sentence:',
      options: [
        'I cut my hair yesterday at the salon.',
        'I had my hair cut yesterday at the salon.',
        'I have cut my hair yesterday at the salon.',
        'I had cut my hair yesterday at the salon.'
      ],
      answer: 'I had my hair cut yesterday at the salon.',
      explanation: 'In causative constructions where someone else performs a service, the formula is: Subject + had + Object + V3 ("I had my hair cut").',
      year: '2019',
      exam: 'CG Vyapam DEO'
    },
    {
      question: 'In the sentence "He is reading a book", the word "is" functions as a/an:',
      options: [
        'Main Verb',
        'Auxiliary Verb',
        'Modal Verb',
        'Transitive Verb'
      ],
      answer: 'Auxiliary Verb',
      explanation: 'Here "reading" is the principal lexical main verb, and "is" serves as the primary auxiliary verb to construct the Present Continuous Tense.',
      year: '2018',
      exam: 'CG Vyapam शिक्षक पात्रता परीक्षा (TET)'
    },
    {
      question: 'Fill in the blank with the correct tag: "Let us go for a walk, _______?"',
      options: [
        'will you',
        'shall we',
        'don\'t we',
        'can we'
      ],
      answer: 'shall we',
      explanation: 'Imperative sentences beginning with "Let\'s" or "Let us" (expressing a joint proposal or suggestion) always take the question tag "shall we?".',
      year: '2017',
      exam: 'CG Vyapam छात्रावास अधीक्षक'
    }
  ],
  mcqs: [
    {
      question: 'Which of the following is NOT a primary auxiliary verb in English?',
      options: ['Be', 'Do', 'Have', 'Can'],
      answer: 'Can',
      explanation: 'The three primary auxiliaries are Be, Do, and Have. "Can" is a modal auxiliary verb.'
    },
    {
      question: 'Fill in the blank: "Neither of them _______ attended the party."',
      options: ['have', 'has', 'were', 'are'],
      answer: 'has',
      explanation: '"Neither of them" is grammatically singular and requires the singular auxiliary "has" in the Present Perfect tense.'
    },
    {
      question: '"He did not _______ his homework yesterday."',
      options: ['do', 'did', 'done', 'doing'],
      answer: 'do',
      explanation: 'The auxiliary "did" must always be followed by the base form V1 of the main verb ("do").'
    },
    {
      question: 'Choose the correct sentence featuring "have" both as an auxiliary and a main verb:',
      options: [
        'I have had my lunch.',
        'I had have my lunch.',
        'I have have my lunch.',
        'I had having my lunch.'
      ],
      answer: 'I have had my lunch.',
      explanation: 'In "I have had my lunch", "have" is the auxiliary verb of the Present Perfect, and "had" is the past participle (V3) of the main verb "have" (meaning eaten).'
    },
    {
      question: 'Fill in the blank: "The bridge _______ inaugurated by the Governor tomorrow."',
      options: ['is to be', 'was to be', 'has been', 'had been'],
      answer: 'is to be',
      explanation: '"Is to be + V3" expresses an official, scheduled future plan in the passive voice.'
    },
    {
      question: '"You have never been to Delhi, _______?" Choose the correct tag:',
      options: ['haven\'t you', 'have you', 'did you', 'had you'],
      answer: 'have you',
      explanation: 'Since "never" makes the sentence negative, it takes an affirmative question tag using the auxiliary "have" $\\rightarrow$ "have you?".'
    },
    {
      question: 'What is the passive auxiliary formula for all passive voice sentences?',
      options: ['Have + V3', 'Do + V1', 'Form of BE + V3', 'Will + V1'],
      answer: 'Form of BE + V3',
      explanation: 'Every passive voice construction in English requires an appropriate form of the auxiliary "BE" followed by the past participle (V3).'
    },
    {
      question: 'Fill in the blank: "Hardly _______ the station when the train pulled out."',
      options: [
        'I had reached',
        'had I reached',
        'did I reached',
        'I reached'
      ],
      answer: 'had I reached',
      explanation: 'Negative introductory adverbs like "Hardly" trigger subject-auxiliary inversion: "Hardly had I reached...".'
    }
  ],
  keyTerminology: [
    {
      term: 'Auxiliary Verb',
      definition: 'A helping verb used alongside a lexical main verb to construct tenses, moods, aspects, voice, and interrogative/negative forms.'
    },
    {
      term: 'Primary Auxiliary',
      definition: 'One of the three versatile verbs (Be, Do, Have) capable of functioning as either an auxiliary or an independent main verb.'
    },
    {
      term: 'Modal Auxiliary',
      definition: 'A defective helping verb (can, must, should) that expresses semantic modality and cannot function as a full main verb.'
    },
    {
      term: 'Do-Support (Do-Insertion)',
      definition: 'The syntactic mechanism in English where the dummy auxiliary "do" is introduced to form questions and negatives in simple tenses.'
    },
    {
      term: 'Emphatic Do',
      definition: 'The use of do/does/did in an affirmative declarative clause to intensify the truth value or emotional sincerity of an assertion.'
    },
    {
      term: 'Causative Have',
      definition: 'A construction (have + object + V3) indicating that the grammatical subject arranged for someone else to perform a service.'
    },
    {
      term: 'Question Tag',
      definition: 'A mini-question added to the end of a statement consisting of an auxiliary verb matching the sentence and a subject pronoun.'
    },
    {
      term: 'Copula (Linking Verb)',
      definition: 'A verb, most commonly "be", that links the subject of a sentence with a predicate adjective or predicate noun.'
    }
  ],
  sources: [
    {
      name: 'High School English Grammar & Composition',
      author: 'Wren & Martin (Revised by N.D.V. Prasada Rao)',
      relevance: 'Comprehensive chapters on Auxiliary and Modal Verbs, Question Tags, and Inversion.'
    },
    {
      name: 'Practical English Usage',
      author: 'Michael Swan (Oxford University Press)',
      relevance: 'Authoritative rules on Causative Have, Emphatic Do, and Aren\'t I question tags.'
    },
    {
      name: 'A Practical English Grammar',
      author: 'A. J. Thomson and A. V. Martinet',
      relevance: 'Detailed breakdown of Primary Auxiliaries Be, Do, Have and passive transformations.'
    },
    {
      name: 'CG Vyapam General English Question Bank',
      author: 'Vyapam Examination Directorate (2012-2024)',
      relevance: 'Compilation of 90+ past year questions on auxiliary verbs, question tags, and causative forms.'
    }
  ],
  confusionBuster: [
    {
      doubt: 'How can I identify whether "has/have" is a main verb or an auxiliary verb in a sentence?',
      clarification: 'Look for another verb! If "has/have" is followed by a past participle (V3) like "written", "eaten", or "gone", it is an AUXILIARY verb (e.g., "He has eaten"). If "has/have" is followed directly by a noun or object without any other verb, it is the MAIN verb expressing possession (e.g., "He has a car").'
    },
    {
      doubt: 'Why is the question tag for "I am right" "aren\'t I" instead of "amn\'t I"?',
      clarification: 'Because the contraction "amn\'t" became obsolete in standard English. Historical phonetic development replaced it with "aren\'t I?" in colloquial and standard formal tags. Both CG Vyapam and UPSC accept ONLY "aren\'t I?".'
    },
    {
      doubt: 'What is the difference between "I cut my hair" and "I had my hair cut"?',
      clarification: '"I cut my hair" means you took scissors and cut your own hair physically. "I had my hair cut" is a causative sentence meaning you went to a barber shop and the barber cut your hair for you.'
    },
    {
      doubt: 'Why do we need "do" in questions like "Do you know him?"',
      clarification: 'English requires an auxiliary verb before the subject to form questions. Because Simple Present affirmative sentences have no auxiliary ("You know him"), the dummy auxiliary "do" is inserted to carry the question.'
    },
    {
      doubt: 'Can "do" be used in an affirmative sentence without emphasis?',
      clarification: 'No. In affirmative declarative sentences, "do/does/did" is used ONLY when you wish to emphasize, contradict, or stress the truth of the action (e.g., "I do love you").'
    }
  ],
  faqList: [
    {
      question: 'What are the three primary auxiliary verbs in English?',
      answer: 'Be, Do, and Have.'
    },
    {
      question: 'How do primary auxiliaries differ from modal auxiliaries?',
      answer: 'Primary auxiliaries can function as both helping verbs and main verbs, and they change forms with subjects. Modals can never be main verbs and never change forms.'
    },
    {
      question: 'What is the role of the auxiliary "BE" in the passive voice?',
      answer: 'An appropriate form of "BE" (is, are, was, were, being, been) is mandatory before the past participle (V3) in every passive sentence.'
    },
    {
      question: 'What question tag is used for imperative sentences starting with "Let\'s"?',
      answer: 'The standard question tag is "shall we?".'
    },
    {
      question: 'How does CG Vyapam test auxiliary verbs?',
      answer: 'Through question tag alignment, identifying main vs auxiliary verbs, causative have constructions, and dummy do-support in error spotting.'
    }
  ],
  oneLinerRevision: [
    'The three primary auxiliary verbs in English are Be, Do, and Have.',
    'Primary auxiliaries can function both as helping verbs and as independent main verbs.',
    'Every passive voice sentence requires a form of "BE" followed by V3 (Past Participle).',
    '"Do/does/did" is always followed by the base form V1 of the main verb.',
    '"Do" is used in affirmative sentences to express strong emotional emphasis (I do believe you).',
    'Causative construction formula: Subject + have/had + Object + V3 (I had my car repaired).',
    'A question tag repeats the auxiliary verb of the main clause with inverted polarity.',
    'The correct negative question tag for "I am" is "aren\'t I?".',
    'In "I have had my lunch", the first "have" is an auxiliary and the second "had" is a main verb.',
    'Imperatives starting with "Let\'s" take the question tag "shall we?".'
  ],
  rapidRevision: {
    points: [
      'Primary Auxiliaries = BE (continuous & passive), DO (negatives & questions), HAVE (perfect & causative)',
      'BE + V1-ing = Continuous | BE + V3 = Passive Voice',
      'Did + V1 (NOT V2!) | Did he go? (NOT Did he went?)',
      'Emphatic Do = I do want to help | Do sit down!',
      'Causative Have = S + had + Object + V3 (I had my hair cut)',
      'Question Tag = Auxiliary + Pronoun (Positive sentence $\\rightarrow$ Negative tag)',
      'I am right $\\rightarrow$ aren\'t I? | Let\'s go $\\rightarrow$ shall we?'
    ],
    formula: 'Passive = BE + V3 | Perfect = HAVE + V3 | Causative = HAD + Obj + V3 | Tag = Aux + Pronoun',
    examTips: [
      'Vyapam Shortcut: Question tag with "I am"? Answer is ALWAYS "aren\'t I?" — NEVER pick "amn\'t I"!',
      'In error detection, look for "did" + past form (e.g., "did not went"): flag it immediately as an error $\\rightarrow$ it must be "did not go"!'
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = 'cgv_master_eng_verb_2';
    const sanitized = sanitizeForFirestore(noteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    await markTopicCompleted('cgv_master_sub_6', 'cgv_master_sub_6_ch_3', 'eng_verb_2');
    console.log('Topic eng_verb_2 (Auxiliary Verbs) completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
