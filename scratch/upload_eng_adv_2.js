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
  id: "cgv_master_eng_adv_2",
  topicId: "eng_adv_2",
  chapterId: "cgv_master_sub_6_ch_11",
  subjectId: "cgv_master_sub_6",
  title: "Fill in the Blanks",
  subtitle: "Master Guide to Single & Double Fillers, Prepositional Pairings & Sentence Completion for CG Vyapam",
  overview: {
    introduction: "Fill in the Blanks (Sentence Completion) is an essential objective testing format in English language examinations. A sentence is presented with one or two missing words (Single Fillers or Double Fillers), and candidates must select the option that best completes the sentence grammatically, syntactically, and collocationally. Sentence completion assesses both structural mastery (correct verb tenses, prepositions, determiners, and conjunctions) and lexical range (precise vocabulary, collocations, and idiomatic phrasing). Unlike isolated grammar questions, fill-in-the-blanks requires candidates to analyze the internal logical valence of the sentence—deciding whether the missing word reinforces an established thought, introduces a sharp contrast, or denotes a causal consequence.",
    importance: "Fill in the Blanks is one of the highest-weightage question types in all CG Vyapam examinations, including Hostel Warden, Patwari, Revenue Inspector (RI), Sub Inspector (SI), ADEO, and Assistant Teacher exams. A typical examination paper features between 3 to 5 questions in this category. Because these questions directly test functional English used in administrative documentation, candidates who master systematic elimination techniques can secure rapid, full marks.",
    examRelevance: "Key testing dimensions in CG Vyapam exams include: (1) Fixed prepositional dependencies following verbs and adjectives (e.g., *comply with, devoid of, prone to, adhere to, conducive to*); (2) Tense concord and conditional clause completion; (3) Modal auxiliary selection based on degrees of obligation or probability; (4) Double fillers where candidates must test both words to eliminate partial matches; (5) Contrast and transition markers (*although, despite, however, because*).",
    quickFacts: [
      { label: "Core Types (2)", value: "Single Fillers (one blank) and Double Fillers (two interrelated blanks)" },
      { label: "The Preposition Pivot", value: "The word immediately following the blank often dictates the only grammatically valid choice" },
      { label: "Double Filler Elimination", value: "Test the second blank first; eliminating 2-3 options on one blank instantly solves the question" },
      { label: "Logical Valence Clues", value: "Look for contrast words ('although', 'but') or cause words ('since', 'therefore') to determine tone" },
      { label: "Vyapam Exam Weightage", value: "3 to 5 questions per examination; high yield across grammar and vocabulary" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Art of Sentence Completion: Single vs Double Fillers",
      content: `### 1. Types of Fillers in Competitive Exams
1. **Single Fillers**:
   - A sentence containing a single blank.
   - Typically tests a fixed preposition, tense form, phrasal verb particle, or single vocabulary choice:
     - *Example:* 'The student was accused ________ cheating in the examination.' (Requires fixed preposition: **of**).
2. **Double Fillers**:
   - A sentence containing two separate blanks.
   - Evaluates complex contextual relationships (e.g., a cause and an effect, or two contrasting adjectives):
     - *Example:* 'Although he was ________ in public speaking, his stage performance was ________.'
     - Requires words of contrasting sentiment (e.g., *inexperienced ... outstanding*).

---

### 2. The 4-Step Strategic Solving Method
1. **Step 1: Read the Incomplete Sentence for Overall Logical Direction**:
   - Identify whether the sentence conveys a **positive (+) or negative (-)** tone.
   - Note the presence of **Transition Trigger Words**:
     - *Contrast triggers:* *although, though, but, however, despite, yet, whereas*.
     - *Support triggers:* *and, furthermore, moreover, because, since, therefore*.
2. **Step 2: Predict the Missing Word Mentally Before Looking at Options**:
   - Formulate your own rough synonym or part of speech for the blank.
3. **Step 3: Analyze Prepositional & Grammatical Constraints**:
   - Inspect the words immediately preceding and following the blank.
   - If the blank is followed by *'with'*, an option like *'comply'* fits, whereas *'adhere'* (which requires *'to'*) is impossible!
4. **Step 4: The Double-Blank Elimination Trick**:
   - In double fillers, examine whichever blank appears easier first (often the preposition or grammar blank).
   - Eliminate all options where that single word fails, leaving only 1 or 2 options to evaluate.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Grammar-Based Fillers: Prepositions, Tenses & Conditionals",
      content: `### 1. Prepositional Dependencies (The Highest-Yield Category!)
The vast majority of single fillers in CG Vyapam test fixed prepositions following specific adjectives and verbs:
- **With**: *comply with, coincide with, infested with, endowed with, cope with, pleased with*.
- **To**: *adhere to, prone to, conducive to, indifferent to, hostile to, junior/senior to, prefer to*.
- **Of**: *devoid of, accused of, aware of, capable of, guilty of, jealous of, fond of*.
- **From**: *abstain from, refrain from, prohibit from, prevent from, deviate from*.
- **At**: *aim at, stare at, surprised at, good at, glance at*.
- **For**: *eligible for, qualified for, thirst for, yearn for, substitute for*.

---

### 2. Tense Sequence & Conditionals
- **Conditional Type 1:** *If + Simple Present -> will/can + V1*.
  - *Sentence:* If the train ________ on time, we will reach Raipur before noon. (Choice: **arrives**).
- **Conditional Type 2:** *If + Simple Past / were -> would + V1*.
  - *Sentence:* If I ________ a bird, I would fly across the clouds. (Choice: **were**).
- **Conditional Type 3:** *If + Past Perfect -> would have + V3*.
  - *Sentence:* If he had prepared diligently, he ________ the examination. (Choice: **would have cleared**).

---

### 3. Subjunctive & Special Connectives
- **Lest:** Always followed by **should** (without 'not'):
  - *Sentence:* Work hard lest you ________ fail. (Choice: **should**).
- **It is high time:** Followed by **Simple Past (V2)**:
  - *Sentence:* It is high time we ________ our ancestral village. (Choice: **visited**).`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Vocabulary & Collocation-Based Fillers",
      content: `### 1. Collocational Precision
When options appear to have identical dictionary definitions, the correct word is chosen based on established English **collocations**:
- *Blank:* 'The heavy rain caused ________ damage to the standing paddy crop.'
  - Options: (A) comprehensive, (B) extensive, (C) intensive, (D) expansive.
  - *Analysis:* Physical crop destruction over a wide geographical area is idiomatically described as **extensive damage**.
- *Blank:* 'The chief guest ________ the foundation stone of the new community hall.'
  - *Analysis:* The fixed historical collocation for starting construction is **laid the foundation stone** (from verb *lay* -> *laid*).

---

### 2. Distinguishing Subtle Synonyms in Sentence Completion
- **Aesthetic vs Artistic**:
  - *Aesthetic* pertains to beauty and taste; *Artistic* pertains to skill in creating art.
- **Continual vs Continuous**:
  - Unbroken non-stop downpour = **continuous rain**.
  - Recurring interruptions = **continual interruptions**.
- **Economic vs Economical**:
  - State financial reforms = **economic policy**.
  - Thrifty low-cost vehicle = **economical car**.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Double Fillers Strategy & Option Elimination",
      content: `### 1. Mastering the Double Filler Format
Double filler questions contain two blanks, demanding a pair of words (e.g., *Word 1 ... Word 2*).

#### The Logical Consistency Rule:
1. **Coordinated / Additive Sentence Structure**:
   - If two clauses are joined by *and, moreover, furthermore*, both words must have the **SAME VALENCE (+ and +) or (- and -)**:
   - *Example:* 'The teacher was ________ and ________ by all her students.'
     - Positive pair required: *respected ... admired*.
2. **Contrasted Sentence Structure**:
   - If joined by *although, but, however, despite*, the words must have **OPPOSITE VALENCE (+ and -)**:
   - *Example:* 'Although the novel was exceptionally ________, the movie adaptation proved completely ________.'
     - Contrasting pair required: *brilliant ... disappointing*.

---

### 2. The Two-Stage Elimination Walkthrough
- *Question:* 'The government was criticized for being ________ to the plight of flood victims, as emergency aid was ________ delayed.'
  - Blank 1 describes the government's attitude (negative: *callous, indifferent*).
  - Blank 2 describes the nature of the delay (adverb: *inexplicably, severely*).
  - Test Option (A): *friendly ... slightly* (Incoherent: criticism does not occur for being friendly).
  - Test Option (B): *indifferent ... inexplicably* (Coherent and grammatically flawless).
  - **Eliminate with surgical precision!**`
    },
    {
      id: "ch_5",
      title: "Chapter 5: High-Frequency Prepositional Fillers Bank for Vyapam",
      content: `### Comprehensive Master Repository of 30 Mandatory Prepositional Fillers:
1. **Abstain from**: To voluntarily refrain from consuming something (*abstain from alcohol*).
2. **Accused of**: Charged with a crime (*accused of theft*).
3. **Acquainted with**: Familiar with someone or something (*acquainted with the facts*).
4. **Adhere to**: Stick firmly to a rule, contract, or belief (*adhere to safety norms*).
5. **Adjacent to**: Next to or adjoining a building/land (*adjacent to the collectorate*).
6. **Averse to**: Having a strong dislike or disinclination (*averse to hard work*).
7. **Aware of**: Having knowledge or perception of (*aware of the dangers*).
8. **Capable of**: Having the ability or potential (*capable of clearing the exam*).
9. **Comply with**: Act in accordance with a rule or request (*comply with regulations*).
10. **Conducive to**: Making a certain situation or outcome likely or possible (*conducive to health*).
11. **Congratulate on**: Express praise for an achievement (*congratulated him on his victory*).
12. **Cope with**: Deal effectively with something difficult (*cope with exam pressure*).
13. **Devoid of**: Entirely lacking or free from (*devoid of common sense*).
14. **Different from**: Not the same as (*different from his brother*).
15. **Eligible for**: Qualified or entitled to be chosen (*eligible for the post*).
16. **Endowed with**: Naturally provided with a quality (*endowed with musical talent*).
17. **Guilty of**: Responsible for a specified wrongdoing (*guilty of murder*).
18. **Infested with**: Overrun in large numbers (*infested with termites*).
19. **Jealous of**: Feeling envy of someone's achievements (*jealous of his success*).
20. **Partake of**: Take part in or consume a portion of (*partake of food*).
21. **Pleased with**: Feeling satisfied with someone's action (*pleased with his performance*).
22. **Prefer to**: Like one thing better than another (*prefer tea to coffee*).
23. **Prevent from**: Keep from happening (*prevented him from leaving*).
24. **Prohibit from**: Formally forbid someone (*prohibited from entering*).
25. **Prone to**: Likely to suffer from (*prone to seasonal allergies*).
26. **Reckon on / upon**: Rely or depend on something happening (*reckon on your support*).
27. **Refrain from**: Stop oneself from doing something (*refrain from shouting*).
28. **Senior to**: Higher in standing (*senior to all officers*).
29. **Subsist on**: Maintain life on meager food/income (*subsist on wild tubers*).
30. **Yield to**: Surrender or submit to pressure (*refused to yield to threats*).`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master Prepositional Fillers Reference Matrix",
      headers: ["Target Verb / Adjective", "Mandatory Fixed Preposition", "Core Idiomatic Meaning", "Complete Sentence Model"],
      rows: [
        ["Adhere", "to", "Stick firmly to rules/agreements", "All candidates must adhere to examination instructions."],
        ["Abstain", "from", "Refrain voluntarily from an action", "He promised to abstain from smoking."],
        ["Conducive", "to", "Favorable or beneficial for an outcome", "A quiet environment is conducive to deep study."],
        ["Comply", "with", "Obey or conform to official rules", "The factory failed to comply with pollution norms."],
        ["Devoid", "of", "Completely empty or lacking in", "His argument was completely devoid of logical reasoning."],
        ["Cope", "with", "Manage or handle a difficult situation", "It is difficult to cope with such intense work stress."],
        ["Prone", "to", "Susceptible or vulnerable to illness/harm", "Low-lying areas are prone to monsoon flooding."],
        ["Congratulate", "on", "Praise someone for an achievement", "I congratulated her on securing the first rank."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Single vs Double Filler Solving Strategies Comparison",
      headers: ["Dimension", "Single Filler Question", "Double Filler Question"],
      rows: [
        ["Primary Cognitive Focus", "Local syntax and fixed prepositional pairings", "Macro-sentence logic, contrast, and thematic consistency"],
        ["Elimination Technique", "Check words before/after blank for grammatical fit", "Eliminate options where either Word 1 OR Word 2 fails"],
        ["Common Pitfall", "Choosing a synonym that violates preposition concord", "Choosing a pair where Word 1 fits but Word 2 contradicts tone"],
        ["Average Solving Time", "10 to 15 seconds", "25 to 35 seconds"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Logical Valence in Fill-in-the-Blanks",
      headers: ["Sentence Connective Trigger", "Logical Relationship", "Valence Pattern", "Model Example Formulation"],
      rows: [
        ["Although / Even though", "Contrast / Concession", "[+] clause contrasts with [-] clause", "Although he was poor (+), he remained honest (+)."],
        ["Because / Since", "Direct Cause and Effect", "Same direction ([+] causes [+] / [-] causes [-])", "Since he was hardworking (+), he succeeded (+)."],
        ["Moreover / Furthermore", "Reinforcement / Addition", "Same direction ([+] adds to [+])", "He is intelligent (+); moreover, he is humble (+)."],
        ["Unless", "Negative Condition", "Condition must occur to avoid negative outcome", "Unless you work hard (-), you will fail (-)."]
      ]
    }
  ],
  pyqs: [
    {
      question: "Fill in the blank with the appropriate preposition: 'He is completely devoid ________ common sense.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) from",
        "B) of",
        "C) with",
        "D) in"
      ],
      correctAnswer: "B) of",
      explanation: "The adjective 'devoid' (meaning entirely lacking or empty of) is idiomatically and strictly followed by the preposition 'of'."
    },
    {
      question: "Complete the sentence: 'Regular morning exercise is very conducive ________ good physical health.' [CG Vyapam Patwari Exam]",
      options: [
        "A) for",
        "B) to",
        "C) with",
        "D) in"
      ],
      correctAnswer: "B) to",
      explanation: "The adjective 'conducive' (meaning making a certain situation or outcome likely or favorable) is invariably followed by the preposition 'to'."
    },
    {
      question: "Fill in the blank: 'The corrupt officer was caught red-handed and accused ________ taking a bribe.' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) for",
        "B) with",
        "C) of",
        "D) on"
      ],
      correctAnswer: "C) of",
      explanation: "The verb 'accuse' takes the preposition 'of' (*accused of a crime*). 'Charged' takes 'with' (*charged with murder*)."
    },
    {
      question: "Complete the sentence: 'The patient has been suffering from fever ________ last Monday.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) for",
        "B) since",
        "C) from",
        "D) in"
      ],
      correctAnswer: "B) since",
      explanation: "'Last Monday' is a specific point of time in the past. In Present Perfect Continuous tense, 'since' is used for a point of time, whereas 'for' is used for a duration/period of time."
    },
    {
      question: "Fill in the blank: 'Work hard lest you ________ fail in the examination.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) may",
        "B) should",
        "C) can",
        "D) will"
      ],
      correctAnswer: "B) should",
      explanation: "The conjunction 'lest' is strictly and exclusively paired with the modal auxiliary 'should'. Using 'may' or 'will' after 'lest' is a common grammatical error."
    },
    {
      question: "Complete the double filler: 'Although the terrain was ________, the soldiers marched ________ to reach the camp.' [CG Vyapam ADEO Exam]",
      options: [
        "A) smooth ... slowly",
        "B) rugged ... relentlessly",
        "C) plain ... tiredly",
        "D) easy ... lazily"
      ],
      correctAnswer: "B) rugged ... relentlessly",
      explanation: "The conjunction 'Although' introduces a contrast. The terrain was harsh and difficult ('rugged'), yet the soldiers marched with determined persistence ('relentlessly')."
    }
  ],
  mcqs: [
    {
      question: "Fill in the blank: 'All institutions must comply ________ the newly enacted environmental norms.'",
      options: [
        "A) to",
        "B) with",
        "C) by",
        "D) for"
      ],
      correctAnswer: "B) with",
      explanation: "The verb 'comply' is idiomatically followed by the preposition 'with': 'comply with norms'."
    },
    {
      question: "Complete the sentence: 'The doctor advised the patient to abstain ________ consuming spicy food.'",
      options: [
        "A) of",
        "B) from",
        "C) with",
        "D) at"
      ],
      correctAnswer: "B) from",
      explanation: "Both 'abstain' and 'refrain' take the preposition 'from' followed by a gerund or noun."
    },
    {
      question: "Fill in the blank: 'The new employee found it extremely difficult to cope ________ the heavy workload.'",
      options: [
        "A) up with",
        "B) with",
        "C) down with",
        "D) for"
      ],
      correctAnswer: "B) with",
      explanation: "The standard English idiom is 'cope with', meaning to deal with or manage. Writing 'cope up with' is an erroneous colloquial Indian English blunder."
    },
    {
      question: "Complete the sentence: 'If he ________ harder, he would have cleared the selection interview.'",
      options: [
        "A) worked",
        "B) had worked",
        "C) has worked",
        "D) works"
      ],
      correctAnswer: "B) had worked",
      explanation: "The main clause contains 'would have cleared' (Conditional Type 3). The subordinate 'if' clause must be in the Past Perfect: 'had worked'."
    },
    {
      question: "Fill in the blank: 'The tribal artisan was endowed ________ a remarkable natural talent for wood carving.'",
      options: [
        "A) with",
        "B) by",
        "C) of",
        "D) in"
      ],
      correctAnswer: "A) with",
      explanation: "'Endowed' (meaning provided or equipped with a natural quality or gift) takes the preposition 'with'."
    },
    {
      question: "Complete the double filler: 'The speaker's lecture was so ________ that the audience listened with ________ attention.'",
      options: [
        "A) boring ... rapt",
        "B) captivating ... rapt",
        "C) dull ... keen",
        "D) lengthy ... distracted"
      ],
      correctAnswer: "B) captivating ... rapt",
      explanation: "'Captivating' (fascinating) logically leads to the audience listening with 'rapt' (completely absorbed) attention."
    },
    {
      question: "Fill in the blank: 'The forest was so dense that daylight could ________ penetrate the thick canopy.'",
      options: [
        "A) easily",
        "B) scarcely",
        "C) deeply",
        "D) brightly"
      ],
      correctAnswer: "B) scarcely",
      explanation: "A 'dense' forest prevents light from entering, so daylight could 'scarcely' (barely, almost not at all) penetrate."
    },
    {
      question: "Complete the sentence: 'He preferred tea ________ coffee throughout his life.'",
      options: [
        "A) than",
        "B) over",
        "C) to",
        "D) against"
      ],
      correctAnswer: "C) to",
      explanation: "The verb 'prefer' takes the preposition 'to' when comparing two items."
    }
  ],
  keyTerminology: [
    {
      term: "Sentence Completion",
      definition: "An objective verbal test where missing words in a sentence must be supplied to restore grammatical and contextual completeness."
    },
    {
      term: "Collocational Binding",
      definition: "The linguistic dependency where two words are habitually paired together by native convention (e.g., cope with, pay attention)."
    },
    {
      term: "Logical Valence",
      definition: "The positive or negative semantic tone established in a sentence that determines whether the blank requires a supporting or contrasting word."
    },
    {
      term: "Double Filler",
      definition: "A sentence completion item featuring two interrelated blanks, requiring simultaneous evaluation of both words."
    },
    {
      term: "Prepositional Dependency",
      definition: "The strict grammatical requirement where certain verbs, nouns, and adjectives must be followed by a designated preposition."
    },
    {
      term: "Gestalt Closure",
      definition: "The psychological ability to deduce missing structural components based on the coherence of the surrounding verbal whole."
    },
    {
      term: "Subjunctive Marker",
      definition: "A structural indicator (such as 'lest' or 'it is high time') that mandates specific non-indicative verb forms."
    },
    {
      term: "Distractor Elimination",
      definition: "The process of systematically discarding options that violate grammar, preposition concord, or logical tone."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Comprehensive chapters on 'Prepositions following particular words' and 'Sentence Completion'."
    },
    {
      title: "Objective General English",
      author: "S. P. Bakshi (Arihant Publications)",
      details: "Detailed single and double filler drills, prepositional lists, and competitive exam exercises."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Analysis of fixed prepositions, conditional clauses, and collocations."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Compilation of fill-in-the-blank questions from Vyapam recruitment exams between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Cope with vs Cope up with",
      confusion: "Writing 'cope up with'.",
      clarity: "'Cope up with' is an ungrammatical Indian English blunder. The standard English idiom is strictly **'cope with'** (*cope with pressure*)."
    },
    {
      concept: "Comprise of vs Comply with",
      confusion: "Adding 'of' to comprise.",
      clarity: "'Comprise' takes NO preposition (*the team comprises ten players*). 'Comply' takes **'with'** (*comply with rules*)."
    },
    {
      concept: "Since vs For in Tense Fillers",
      confusion: "Using 'for' with days or dates.",
      clarity: "Use **'Since'** for a specific **Point of Time** (*since Monday, since 2015*). Use **'For'** for a **Duration or Period of Time** (*for three hours, for five days*)."
    },
    {
      concept: "Accused of vs Charged with",
      confusion: "Swapping prepositions between accused and charged.",
      clarity: "He was **accused OF** the theft. He was **charged WITH** the crime."
    },
    {
      concept: "Prefer to vs Prefer than",
      confusion: "Using 'than' with prefer.",
      clarity: "The verb 'prefer' always takes **'to'** (*prefer tea to coffee*), never 'than'."
    }
  ],
  faqList: [
    {
      question: "What is the best way to tackle Double Fillers quickly?",
      answer: "Scan both blanks and find which blank has a clearer constraint (e.g., a fixed preposition or a strict contrast). Test options for that single blank first to eliminate 2 or 3 wrong choices, then test the remaining option(s) on the second blank."
    },
    {
      question: "Why is 'conducive' always followed by 'to'?",
      answer: "'Conducive' derives from Latin 'conducere' (to lead together toward). In English syntax, it takes the preposition 'to' to indicate the direction or outcome being encouraged (e.g., 'conducive to study')."
    },
    {
      question: "Can 'lest' ever be followed by 'might' or 'would'?",
      answer: "No. In formal standard English, 'lest' must strictly be followed by 'should' (or a bare subjunctive verb). Never use 'might', 'would', or 'will' with 'lest'."
    },
    {
      question: "What preposition follows 'differ'?",
      answer: "'Differ' takes 'from' when denoting difference in quality (*his opinion differs from mine*), and 'with' when denoting disagreement with a person (*I differ with you on this issue*)."
    },
    {
      question: "How many fill-in-the-blank questions appear in CG Vyapam English?",
      answer: "Typically, 3 to 5 questions appear as fill-in-the-blanks, testing prepositions, tenses, vocabulary, and conjunctions in exams like Hostel Warden, Patwari, and Assistant Teacher."
    }
  ],
  oneLinerRevision: [
    "'Devoid' is always followed by the preposition 'of' (*devoid of common sense*).",
    "'Conducive' is always followed by the preposition 'to' (*conducive to health*).",
    "'Comply' takes the preposition 'with' (*comply with regulations*).",
    "'Abstain' and 'Refrain' are followed by 'from + V-ing'.",
    "Never write 'cope up with'; the correct standard idiom is strictly 'cope with'.",
    "'Lest' is invariably followed by the modal auxiliary 'should'.",
    "'Since' marks a point in time; 'For' marks a duration or period of time.",
    "'Accused' takes 'of'; 'Charged' takes 'with'.",
    "'Prefer' takes the preposition 'to', never 'than'.",
    "In double fillers, eliminate options on the easier blank first before verifying the second blank."
  ],
  rapidRevision: {
    points: [
      "Fixed Prepositions: Devoid of; Conducive to; Comply with; Abstain from; Prone to; Accused of.",
      "Cope Rule: Cope with (NEVER cope up with).",
      "Time Rule: Since + Point in time; For + Duration.",
      "Conditionals: Type 1 (If + V1 ... will); Type 2 (If + were ... would); Type 3 (If + had + V3 ... would have + V3).",
      "Lest Rule: Lest + Subject + should (no negative).",
      "Double Fillers: Check valence (+ vs -) using transition words (although, because)."
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
