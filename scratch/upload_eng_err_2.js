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
  if (obj === null || obj === undefined) return null;
  if (Array.isArray(obj)) {
    if (obj.length > 0 && Array.isArray(obj[0])) {
      return obj.map(row => ({ cells: row.map(cell => (cell === undefined ? null : cell)) }));
    }
    return obj.map(item => sanitizeForFirestore(item));
  }
  if (typeof obj === 'object') {
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

const topicData = {
  id: "cgv_master_eng_err_2",
  topicId: "eng_err_2",
  chapterId: "cgv_master_sub_6_ch_8",
  subjectId: "cgv_master_sub_6",
  title: "Sentence Improvement",
  subtitle: "Comprehensive Guide to Sentence Correction, Parallelism, Stylistic Refinement & Vyapam Archives",
  overview: {
    introduction: "Sentence Improvement (often designated as Sentence Correction or Phrase Replacement) is an advanced testing format in competitive English examinations. A sentence is presented with a specific bracketed, bolded, or underlined section, accompanied by three alternative phrasing options alongside a fourth option: 'No Improvement' (or 'No correction required'). Unlike basic error spotting—which merely requires identifying where an error exists—Sentence Improvement evaluates a candidate's capacity to select the most grammatically accurate, concise, idiomatic, and stylistically refined replacement. Key areas tested include: (1) Faulty parallelism in compound and comparative structures; (2) Tense alignment and the Subjunctive mood; (3) Prepositional and phrasal verb corrections; (4) Eliminating wordiness, circumlocution, and redundancies; and (5) Modifier placement and subject-verb concord.",
    importance: "In CG Vyapam competitive examinations (Hostel Warden, Revenue Inspector, Patwari, Sub Inspector, ADEO, Assistant Teacher, and Secretariat Clerk exams), Sentence Improvement represents a high-weightage topic, typically accounting for 2 to 4 questions per paper. It assesses practical editorial precision—an essential skill for civil servants drafting government orders, executive summaries, and legal memoranda.",
    examRelevance: "CG Vyapam questions on Sentence Improvement focus on: (1) Parallelism in series connected by 'and/or' and correlative conjunctions (*not only...but also*); (2) Present Subjunctive structures (*It is high time we started studying*, NOT *we start*); (3) Replacing clumsy clauses with concise participial or infinitive phrases; (4) Rectifying erroneous prepositions and phrasal verbs; (5) Knowing with certainty when the original sentence is flawless and selecting 'No Improvement'.",
    quickFacts: [
      { label: "Core Question Format", value: "Underlined/Bracketed phrase with 3 alternative improvements + 'No Improvement'" },
      { label: "The Subjunctive Rule", value: "'It is high time / It is time' + Subject is strictly followed by Simple Past (V2)" },
      { label: "Law of Parallelism", value: "Elements joined by coordinating conjunctions must share identical grammatical forms (all gerunds, all infinitives, etc.)" },
      { label: "Brevity Principle", value: "When two options are grammatically correct, the more concise and direct option is preferred" },
      { label: "Vyapam Exam Weightage", value: "2 to 4 questions per examination; tests active editorial proficiency" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The 5-Step Strategic Protocol for Sentence Improvement",
      content: `### 1. How Sentence Improvement Differs from Error Spotting
In Error Spotting, you merely identify an error segment without rectifying it. In Sentence Improvement, you must:
1. Diagnose the exact nature of the grammatical, syntactical, or idiomatic defect.
2. Evaluate which option eliminates the defect without introducing new errors or altering the intended meaning.

---

### 2. The 5-Step Evaluation Method
1. **Step 1: Read the Entire Sentence Without Stopping at the Bracket**:
   - Understand the complete propositional meaning before analyzing the bracketed portion.
2. **Step 2: Check for Immediate Grammatical Flaws**:
   - Check Subject-Verb Concord, Tense sequence, and Preposition pairing.
3. **Step 3: Test for 'No Improvement'**:
   - If the original bracketed phrase is completely grammatical, natural, and concise, choose 'No Improvement'. Never change a sentence just for the sake of changing it!
4. **Step 4: Apply the Principle of Parallelism**:
   - If the sentence contains a list or comparison, ensure grammatical symmetry across all items.
5. **Step 5: Apply the Principle of Economy (Brevity)**:
   - Given two grammatically valid options, standard examination conventions always prefer the shorter, crisper, and less wordy phrasing.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: The Law of Faulty Parallelism & Correlative Alignment",
      content: `### 1. What is Parallelism?
Parallelism (or parallel structure) requires that elements of equal grammatical rank in a sentence must be expressed in identical grammatical forms. If one element is a noun, all must be nouns; if one is a gerund (-ing), all must be gerunds; if one is an infinitive (to + V1), all must be infinitives.

---

### 2. Common Parallelism Violations in Examinations
1. **Items in a Series**:
   - *Faulty:* He enjoys reading novels, swimming in the pool, and **to play** tennis.
   - *Improved:* He enjoys reading novels, swimming in the pool, and **playing** tennis.
   - *Faulty:* The training program taught him discipline, patience, and **how to manage time**.
   - *Improved:* The training program taught him discipline, patience, and **time management**.

2. **Correlative Conjunctions (*Not only ... but also*, *Either ... or*, *Neither ... nor*)**:
   - The element following the first correlative must grammatically match the element following the second correlative:
   - *Faulty:* He **not only lost** his wallet, but also his watch.
     - (Here, 'not only' precedes a verb 'lost', while 'but also' precedes a noun phrase 'his watch').
   - *Improved:* He lost **not only his wallet**, but also his watch.
   - *Faulty:* She either must apologize or pay a fine.
   - *Improved:* She must **either apologize or pay** a fine.

3. **Comparative Structures (*than*, *as ... as*)**:
   - *Faulty:* Driving a car is more dangerous than **to travel by train**.
   - *Improved:* Driving a car is more dangerous than **traveling by train**.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Tense, Mood & The 'It is high time' Subjunctive Formula",
      content: `### 1. The 'It is time / It is high time' Rule (Super High-Yield in Vyapam!)
When a sentence begins with **'It is time'**, **'It is high time'**, or **'It is about time'** followed by a subject, the verb MUST be in the **Simple Past (V2)** form (Past Subjunctive) to express urgent necessity:
- *Formula:* **It is high time + Subject + Simple Past (V2)**
  - *Faulty:* It is high time we **start** preparing for the examination.
  - *Improved:* It is high time we **started** preparing for the examination.
  - *Faulty:* It is time you **should go** home.
  - *Improved:* It is time you **went** home.
- *Note:* If NO subject follows 'It is time', use an infinitive: **'It is time to go home'**.

---

### 2. The Unreal Past / Wish Subjunctive
When expressing hypothetical, contrary-to-fact wishes or imaginary conditions with *I wish, as if, as though, would that*:
- Use **'were'** for all subjects, even singular *I, he, she, it*:
  - *Faulty:* I wish I **was** the Chief Minister of Chhattisgarh.
  - *Improved:* I wish I **were** the Chief Minister of Chhattisgarh.
  - *Faulty:* He behaves as if he **knows** everything.
  - *Improved:* He behaves as if he **knew** everything.

---

### 3. 'Lest' Clause Alignment
- *Faulty:* Walk carefully lest you **may fall**.
- *Improved:* Walk carefully lest you **should fall**.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Precision in Word Choice & Prepositional Refinements",
      content: `### 1. Replacing Clumsy Phrases with Concise Participles
Examiners frequently test whether candidates can replace wordy clauses with clean participial phrases:
- *Clumsy:* **Because he was ill**, he could not attend the office.
- *Improved:* **Being ill**, he could not attend the office.
- *Clumsy:* **After he had finished his dinner**, he went out for a walk.
- *Improved:* **Having finished his dinner**, he went out for a walk.

---

### 2. Correcting Misplaced Prepositions
Certain verbs and adjectives require specific fixed prepositions in standard administrative English:
1. **Prefer**: Followed by **'to'**, NEVER by 'than':
   - *Faulty:* I prefer tea **than** coffee.
   - *Improved:* I prefer tea **to** coffee.
   - *Faulty:* She prefers reading books than watching television.
   - *Improved:* She prefers reading books **to watching** television.
2. **Senior / Junior / Superior / Inferior**: Followed by **'to'**, NEVER 'than':
   - *Faulty:* He is senior **than** me by three years.
   - *Improved:* He is senior **to** me by three years.
3. **Congratulate**: Followed by **'on'**, NEVER 'for':
   - *Faulty:* I congratulated him **for** his success.
   - *Improved:* I congratulated him **on** his success.
4. **Prevent / Prohibit / Abstain**: Followed by **'from + V-ing'**:
   - *Faulty:* He prevented me **to enter** the hall.
   - *Improved:* He prevented me **from entering** the hall.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Conciseness & Redundancy Elimination in Sentence Improvement",
      content: `### 1. Eliminating Redundant Expressions in Underlined Phrases
Examiners deliberately plant words that repeat meanings already present in the verb:
1. *Faulty:* The manager requested the applicant to **repeat the sentence again**.
   - *Improved:* The manager requested the applicant to **repeat the sentence**.
2. *Faulty:* The train arrived at **7:00 PM in the evening**.
   - *Improved:* The train arrived at **7:00 PM** (OR *at seven in the evening*).
3. *Faulty:* The project was **blended together** seamlessly.
   - *Improved:* The project was **blended** seamlessly.
4. *Faulty:* The committee reached a **consensus of opinion**.
   - *Improved:* The committee reached a **consensus**.

---

### 2. Active Voice Preferred for Editorial Punch
Whenever passive voice creates an awkward, wordy sentence without a clear rationale, convert it to active voice:
- *Clumsy Passive:* A decision **was arrived at by the committee** after extensive deliberation.
- *Improved Active:* **The committee decided** after extensive deliberation.
- *Clumsy:* The work was completed by him in an efficient manner.
- *Improved:* He completed the work efficiently.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master Parallelism Correction Matrix",
      headers: ["Faulty Sentence Construction", "Defect in Parallelism", "Improved Standard Phrasing", "Grammatical Rationale"],
      rows: [
        ["He likes singing, dancing, and to swim.", "Mixed gerunds with infinitive", "He likes singing, dancing, and swimming.", "All items in series must be gerunds"],
        ["She not only sings well but also dances.", "Misplaced correlative conjunction", "She not only sings well, but she also dances.", "Correlatives must precede parallel verbs"],
        ["He is smart, honest, and has diligence.", "Mixed adjectives with verb phrase", "He is smart, honest, and diligent.", "All descriptors must be adjectives"],
        ["To run fast is harder than to walk slowly.", "Clumsy infinitive comparison", "Running fast is harder than walking slowly.", "Gerunds provide smoother comparative balance"],
        ["He was praised for his honesty and because he worked hard.", "Noun mixed with dependent clause", "He was praised for his honesty and hard work.", "Conjoined elements must both be nouns"]
      ]
    },
    {
      tableId: "tab_2",
      title: "Clumsy / Wordy Sentences vs Sleek Improved Equivalents",
      headers: ["Original Wordy / Clumsy Sentence", "Underlying Stylistic Flaw", "Improved Concise Sentence", "Efficiency Gain"],
      rows: [
        ["In the event that it rains, we will stay indoors.", "Wordy conditional phrase", "If it rains, we will stay indoors.", "Replaced four words with 'If'"],
        ["Owing to the fact that he was sick, he was absent.", "Circumlocutory causal phrase", "Because he was sick, he was absent.", "Replaced six words with 'Because'"],
        ["He spoke in a very confident manner.", "Clumsy prepositional adverb", "He spoke very confidently.", "Converted phrase into single adverb"],
        ["It is necessary that everyone should participate.", "Unwieldy subjunctive clause", "Everyone must participate.", "Used strong modal auxiliary"],
        ["There are many students who are preparing.", "Expletive 'There are' bloat", "Many students are preparing.", "Eliminated empty dummy subject"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Top 10 High-Frequency Sentence Improvement Replacements in CG Vyapam",
      headers: ["Target Underlined Phrase", "Common Erroneous Temptation", "Correct Improvement Option", "Grammatical Rule"],
      rows: [
        ["It is high time we (start) working.", "start / should start", "started", "'It is high time' requires Simple Past V2"],
        ["He is senior (than) me.", "than / more than", "to", "Latin comparatives take 'to', not 'than'"],
        ["I prefer tea (than) coffee.", "than / over", "to", "'Prefer' takes preposition 'to'"],
        ["He prevented me (to go) there.", "to go / from to go", "from going", "'Prevent' takes 'from + V-ing'"],
        ["He congratulated me (for) my success.", "for / about", "on", "'Congratulate' takes preposition 'on'"],
        ["Walk fast lest you (will) miss the bus.", "will / may", "should", "'Lest' is invariably paired with 'should'"],
        ["We look forward to (meet) you.", "to meet / for meeting", "to meeting", "'Look forward to' takes a Gerund (V-ing)"],
        ["He is addicted to (gamble).", "to gamble / for gambling", "to gambling", "'Addicted to' takes a Gerund (V-ing)"],
        ["She resembles (with) her mother.", "with / to", "No improvement / resembles her mother", "'Resemble' takes no preposition"],
        ["Despite (of) his illness, he passed.", "of / with", "Despite his illness (drop 'of')", "'Despite' takes no 'of'"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Improve the bracketed part of the sentence: 'It is high time we [start] preparing for the competitive exams.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) should start",
        "B) started",
        "C) have started",
        "D) No improvement"
      ],
      correctAnswer: "B) started",
      explanation: "The construction 'It is high time' followed by a subject requires the verb to be in the Simple Past (V2) form to express urgency. Therefore, 'started' is the correct improvement."
    },
    {
      question: "Improve the underlined portion: 'I prefer walking [than] riding a bicycle.' [CG Vyapam Patwari Exam]",
      options: [
        "A) over",
        "B) to",
        "C) rather than",
        "D) No improvement"
      ],
      correctAnswer: "B) to",
      explanation: "The verb 'prefer' takes the preposition 'to' when comparing two nouns or gerunds, never 'than'. Hence, 'walking to riding' is the correct formulation."
    },
    {
      question: "Improve the bracketed phrase: 'He was [senior than] me in the administrative service.' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) senior to",
        "B) senior over",
        "C) more senior than",
        "D) No improvement"
      ],
      correctAnswer: "A) senior to",
      explanation: "Adjectives of Latin origin ending in '-ior' (senior, junior, superior, inferior, prior) are followed by the preposition 'to', never 'than'. Therefore, 'senior to' is correct."
    },
    {
      question: "Improve the sentence: 'He prevented me [to enter] the examination hall.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) from entering",
        "B) from to enter",
        "C) not to enter",
        "D) No improvement"
      ],
      correctAnswer: "A) from entering",
      explanation: "The verb 'prevent' requires the preposition 'from' followed by a gerund (V-ing): 'prevented me from entering'."
    },
    {
      question: "Improve the bracketed part: 'The teacher [congratulated him for] his outstanding performance.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) congratulated him on",
        "B) congratulated him with",
        "C) congratulated him about",
        "D) No improvement"
      ],
      correctAnswer: "A) congratulated him on",
      explanation: "The verb 'congratulate' is idiomatically followed by the preposition 'on', never 'for'. The correct phrasing is 'congratulated him on his performance'."
    },
    {
      question: "Improve the underlined segment: 'Walk carefully [lest you will stumble] on the rocky path.' [CG Vyapam ADEO Exam]",
      options: [
        "A) lest you should stumble",
        "B) lest you may stumble",
        "C) lest you will not stumble",
        "D) No improvement"
      ],
      correctAnswer: "A) lest you should stumble",
      explanation: "The conjunction 'lest' is strictly paired with the modal auxiliary 'should'. Using 'will' or 'may' after 'lest' is an error. Furthermore, 'lest' inherently means 'for fear that not', so no negative word is permitted."
    }
  ],
  mcqs: [
    {
      question: "Improve the bracketed part: 'We are looking forward [to meet] the Chief Minister.'",
      options: [
        "A) to meeting",
        "B) for meeting",
        "C) to be meeting",
        "D) No improvement"
      ],
      correctAnswer: "A) to meeting",
      explanation: "'Look forward to' is followed by a gerund (V-ing) because 'to' is a preposition. Thus, 'to meeting' is the correct improvement."
    },
    {
      question: "Select the best improvement: 'He is addicted to [smoke] cigarettes.'",
      options: [
        "A) smoking",
        "B) be smoking",
        "C) smoke of",
        "D) No improvement"
      ],
      correctAnswer: "A) smoking",
      explanation: "Phrases like 'addicted to', 'accustomed to', and 'used to' take a gerund (V-ing). 'Addicted to smoking' is the correct form."
    },
    {
      question: "Improve the underlined phrase: 'She [not only lost her purse but also] her mobile phone.'",
      options: [
        "A) lost not only her purse but also",
        "B) not only lost her purse also",
        "C) lost either her purse or",
        "D) No improvement"
      ],
      correctAnswer: "A) lost not only her purse but also",
      explanation: "To maintain parallel structure, 'lost' should precede 'not only' so that both correlative parts precede noun phrases: 'lost not only her purse but also her mobile phone'."
    },
    {
      question: "Improve the bracketed words: 'I wish I [was] a bird so that I could fly.'",
      options: [
        "A) am",
        "B) were",
        "C) have been",
        "D) No improvement"
      ],
      correctAnswer: "B) were",
      explanation: "In an unreal, hypothetical wish introduced by 'I wish', the past subjunctive 'were' must be used for all subjects."
    },
    {
      question: "Improve the sentence: 'He [resembled with] his grandfather in his youth.'",
      options: [
        "A) resembled to",
        "B) resembled",
        "C) was resembling with",
        "D) No improvement"
      ],
      correctAnswer: "B) resembled",
      explanation: "'Resemble' is a transitive verb that requires no preposition. The correct phrasing is 'resembled his grandfather'."
    },
    {
      question: "Improve the underlined portion: 'He is [more better] than his rival.'",
      options: [
        "A) better",
        "B) much better",
        "C) far better",
        "D) Both A, B and C are valid improvements"
      ],
      correctAnswer: "D) Both A, B and C are valid improvements",
      explanation: "'More better' is an incorrect double comparative. Eliminating 'more' leaves 'better', or adding intensifiers like 'much' or 'far' ('much better', 'far better') are all grammatically valid improvements."
    },
    {
      question: "Improve the bracketed phrase: '[Despite of his illness], he completed the marathon.'",
      options: [
        "A) In spite his illness",
        "B) Despite his illness",
        "C) Despite with his illness",
        "D) No improvement"
      ],
      correctAnswer: "B) Despite his illness",
      explanation: "'Despite' does not take the preposition 'of'. The correct phrase is 'Despite his illness' (or 'In spite of his illness')."
    },
    {
      question: "Improve the sentence: 'The book was [so interesting as] I couldn't put it down.'",
      options: [
        "A) so interesting that",
        "B) very interesting that",
        "C) too interesting that",
        "D) No improvement"
      ],
      correctAnswer: "A) so interesting that",
      explanation: "The cause-and-result correlative conjunction is 'so + adjective + that', indicating a consequence. 'So interesting that I couldn't put it down' is correct."
    }
  ],
  keyTerminology: [
    {
      term: "Sentence Improvement",
      definition: "An objective examination exercise requiring candidates to select the most grammatically accurate, concise, and stylistically superior phrasing for a marked section of a sentence."
    },
    {
      term: "Faulty Parallelism",
      definition: "The ungrammatical juxtaposition of non-matching grammatical structures in compound, coordinated, or comparative sentences."
    },
    {
      term: "Past Subjunctive",
      definition: "A verb mood used to express hypothetical situations, wishes, or urgent necessity (e.g., 'If I were', 'It is high time we went')."
    },
    {
      term: "Brevity (Economy of Words)",
      definition: "The stylistic virtue of expressing ideas clearly using the minimum number of words without sacrificing meaning."
    },
    {
      term: "Circumlocution",
      definition: "The unnecessary use of many words where a simple, direct expression exists; an editorial flaw targeted in sentence improvement."
    },
    {
      term: "Gerundial Complement",
      definition: "A verb in '-ing' form functioning as the grammatical object of a preposition (e.g., 'object to going', 'look forward to seeing')."
    },
    {
      term: "Latin Comparative",
      definition: "Adjectives borrowed from Latin ending in '-ior' (senior, junior, superior) that take 'to' instead of 'than'."
    },
    {
      term: "Active Voice Preference",
      definition: "The stylistic standard of preferring direct active sentences over clumsy, convoluted passive constructions."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapters on 'Sentence Correction', 'Subjunctive Mood', and 'Parallelism'."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Sections on 'It is high time', 'prefer to', and participial sentence reductions."
    },
    {
      title: "The Elements of Style",
      author: "William Strunk Jr. & E. B. White",
      details: "Fundamental principles of composition: expressing parallel ideas in parallel forms and omitting needless words."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Analysis of sentence improvement and phrase replacement questions from 2014 to 2024 Vyapam exams."
    }
  ],
  confusionBuster: [
    {
      concept: "It is high time + V1 vs V2",
      confusion: "Using present tense after 'It is high time'.",
      clarity: "'It is high time we **started**' (Simple Past V2) is mandatory when a subject follows. If no subject follows, use infinitive: 'It is high time **to start**'."
    },
    {
      concept: "Prefer than vs Prefer to",
      confusion: "Writing 'I prefer coffee than tea'.",
      clarity: "The verb 'prefer' ALWAYS takes **'to'** (*prefer coffee to tea*), never 'than'."
    },
    {
      concept: "Senior than vs Senior to",
      confusion: "Using 'than' after Latin comparatives.",
      clarity: "Words ending in '-ior' (*senior, junior, superior, inferior, prior*) take **'to'**, never 'than'."
    },
    {
      concept: "Look forward to meet vs meeting",
      confusion: "Treating 'to' as an infinitive marker in 'look forward to'.",
      clarity: "'To' is a preposition here; prepositions take a gerund: **'look forward to meeting'**."
    },
    {
      concept: "When 'No Improvement' is the Answer",
      confusion: "Assuming the original sentence must always have an error.",
      clarity: "In approximately 15-20% of examination questions, the original sentence is completely standard and error-free. Do not hesitate to select 'No Improvement'."
    }
  ],
  faqList: [
    {
      question: "Why does 'It is high time we went' use a past tense for a present/future action?",
      answer: "This is an instance of the English Past Subjunctive mood. The past form 'went' does not denote past time; rather, it denotes psychological distance and urgent unreality, signaling that the action should already have been completed."
    },
    {
      question: "What is the difference between 'Error Spotting' and 'Sentence Improvement'?",
      answer: "Error spotting requires you only to identify the segment containing a mistake (A, B, or C). Sentence improvement presents specific replacements, testing your ability to choose the most grammatically elegant and concise correction."
    },
    {
      question: "Can 'much' be used before a comparative adjective?",
      answer: "Yes! While 'more' cannot be paired with a comparative ('more taller' is wrong), intensifiers like 'much', 'far', or 'a lot' are grammatically valid ('much better', 'far taller')."
    },
    {
      question: "Why is 'congratulated for' considered an error?",
      answer: "In English idiomatic syntax, the fixed preposition for congratulating someone on an achievement is 'on' (e.g., 'I congratulated him on his success')."
    },
    {
      question: "How should an aspirant decide between two grammatically correct improvement options?",
      answer: "Choose the option that is more concise, direct, active, and free from unnecessary wordiness or passive bloat."
    }
  ],
  oneLinerRevision: [
    "'It is high time' followed by a subject strictly requires the Simple Past (V2), e.g., 'It is high time we started'.",
    "Items in a series or comparison must maintain parallel grammatical structures.",
    "'Prefer' is always followed by the preposition 'to', never 'than'.",
    "Latin comparatives (senior, junior, superior, inferior) are followed by 'to', never 'than'.",
    "'Look forward to' is followed by a Gerund (V-ing), e.g., 'look forward to meeting'.",
    "'Congratulate' takes the preposition 'on', never 'for'.",
    "'Lest' is invariably paired with 'should', e.g., 'lest you should fail'.",
    "'Prevent' is followed by 'from + V-ing', e.g., 'prevented him from entering'.",
    "Eliminate redundancies: remove 'again' after 'repeat', and 'back' after 'revert'.",
    "If the original sentence is grammatically standard and concise, select 'No Improvement'."
  ],
  rapidRevision: {
    points: [
      "Subjunctive: It is high time + Subject + V2 (started, went).",
      "Parallelism: Keep all listed verbs/nouns in identical grammatical forms.",
      "Preposition 'To': Prefer...to; Senior...to; Junior...to; Superior...to.",
      "Gerund Pairs: Look forward to + V-ing; Addicted to + V-ing; Accustomed to + V-ing.",
      "Fixed Prepositions: Congratulate on; Prevent from + V-ing; Resemble (NO preposition).",
      "Lest Rule: Lest + Subject + should (No negative allowed)."
    ]
  }
};

async function uploadStudyNote() {
  const docId = topicData.id;
  const sanitized = sanitizeForFirestore(topicData);
  
  await db.collection('topic_study_notes').doc(docId).set(sanitized, { merge: true });
  console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

  // Mark topic completed in syllabi/cgv_master
  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const syllabusDoc = await syllabusRef.get();
  if (syllabusDoc.exists) {
    const data = syllabusDoc.data();
    let updated = false;
    for (const sub of data.subjects || []) {
      if (sub.id === topicData.subjectId) {
        for (const ch of sub.chapters || []) {
          if (ch.id === topicData.chapterId) {
            for (const top of ch.topics || []) {
              if (top.id === topicData.topicId) {
                top.hasStudyNotes = true;
                updated = true;
              }
            }
          }
        }
      }
    }
    if (updated) {
      await syllabusRef.update({ subjects: data.subjects });
      console.log(`[Syllabus Synced] hasStudyNotes: true for ${topicData.topicId}`);
    }
  }
  console.log(`Topic ${topicData.topicId} (${topicData.title}) completed successfully!`);
}

uploadStudyNote().then(() => process.exit(0)).catch(err => {
  console.error("Upload error:", err);
  process.exit(1);
});
