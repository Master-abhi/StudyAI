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
  id: "cgv_master_eng_comp_2",
  topicId: "eng_comp_2",
  chapterId: "cgv_master_sub_6_ch_9",
  subjectId: "cgv_master_sub_6",
  title: "Cloze Test",
  subtitle: "Master Guide to Cloze Passage Solving, Collocation Analysis, Discourse Markers & Vyapam Archives",
  overview: {
    introduction: "A Cloze Test (derived from the psychological concept of 'closure' in Gestalt psychology) is an integrative language examination exercise consisting of an unseen prose passage from which specific words have been systematically excised at regular intervals. Candidates are required to evaluate the linguistic environment and select the most grammatically, collocationally, and contextually appropriate word from four provided alternatives to restore the text. The cloze test is widely recognized by linguistic testing authorities as the most complete diagnostic tool of language proficiency because it evaluates multiple linguistic layers simultaneously: (1) Syntactic structure (determining whether the blank requires a noun, verb, adjective, preposition, or conjunction); (2) Lexical collocation (natural habitual word partnerships); (3) Discourse cohesion (logical connective markers such as 'however', 'consequently', 'moreover'); and (4) Contextual semantic tone.",
    importance: "In CG Vyapam competitive examinations—including Hostel Warden, Revenue Inspector (RI), Patwari, Sub Inspector (SI), ADEO, and Assistant Teacher exams—Cloze Tests are frequently featured as 5-blank or 10-blank continuous passages. A single cloze passage provides a cluster of 5 high-scoring marks. Unlike isolated multiple-choice questions, errors in a cloze test can cascade if a candidate misjudges the passage's overall theme, making a systematic, multi-pass methodology essential.",
    examRelevance: "CG Vyapam questions on Cloze Tests evaluate: (1) Distinguishing between grammar-based blanks (requiring prepositions, pronouns, determiners, or auxiliaries) and vocabulary-based blanks (requiring precise synonyms, collocations, or idioms); (2) Forward and backward reading clues where the missing word is suggested by a hint two sentences later; (3) Discourse connectors indicating contrast, consequence, or addition; (4) Idiomatic prepositional partnerships (*prone to, interested in, accompanied by*).",
    quickFacts: [
      { label: "Core Linguistic Test", value: "A continuous passage with 5 to 10 blanks testing grammar, vocabulary, and context simultaneously" },
      { label: "The 3-Pass Rule", value: "Pass 1: Read without filling; Pass 2: Select options using clues; Pass 3: Reread to verify flow" },
      { label: "Forward Clue Strategy", value: "The clue for a blank often resides in the sentence immediately following it" },
      { label: "Collocation Principle", value: "Choose words that naturally pair together (e.g., 'pay attention', 'heavy rain', 'commit a crime')" },
      { label: "Discourse Markers", value: "Contrast: However/Although; Cause/Effect: Therefore/Consequently; Addition: Moreover" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Anatomy of a Cloze Test & The Strategic 3-Pass Protocol",
      content: `### 1. The Psychology Behind the Cloze Test
The cloze test evaluates 'closure'—the human brain's natural ability to complete an incomplete pattern based on surrounding contextual clues:
- *Incomplete:* 'Water is vital for the ________ of all living organisms.'
- *Mental Closure:* The brain instantly predicts words like *survival, sustenance, existence*.

---

### 2. The 3-Pass Strategic Solving Method (Guaranteed High Accuracy)
1. **Pass 1: The Initial Uninterrupted Read-Through (60 Seconds)**:
   - Read the entire passage from start to finish **without looking at the options and without attempting to fill any blanks**.
   - **Objectives:**
     - Identify the **Central Topic** (e.g., environmental degradation, rural economy of Chhattisgarh, digital literacy).
     - Determine the **Tense Frame** (is the passage written in the past historical narrative, or present general facts?).
     - Gauge the **Tone** (is the author enthusiastic, critical, or objective?).

2. **Pass 2: Targeted Selection Using Syntactic & Lexical Clues**:
   - Tackle each blank individually.
   - **Step A:** Determine the required **Part of Speech** (Noun, Verb, Adjective, Adverb, Preposition, Conjunction).
   - **Step B:** Look for **Preposition Clues** immediately after the blank (e.g., if followed by *'on'*, words like *'depend'* or *'rely'* fit, while *'require'* does not).
   - **Step C:** Eliminate grammatically mismatched options and pick the best fit.

3. **Pass 3: Final Verification Read-Through (30 Seconds)**:
   - Read the completed passage with your selected words inserted.
   - Verify that the text reads smoothly, makes coherent logical sense, and maintains grammatical consistency throughout.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Grammar-Based Blanks: Prepositions, Pronouns & Auxiliaries",
      content: `### 1. Prepositional Dependency Blanks
A massive proportion of cloze test blanks in CG Vyapam are determined entirely by the **preposition that follows the blank**:
- *Blank:* 'The committee was ________ of eminent scientists.'
  - If followed by **'of'**, the word is **composed** (composed of) or **consisted** (consisted of).
  - Words like *'comprise'* take NO preposition (*'comprised eminent scientists'*).
- *Blank:* 'He is thoroughly ________ in classical music.'
  - Followed by **'in'** -> **interested** / **versed**.
- *Blank:* 'The local community was ________ to seasonal malaria.'
  - Followed by **'to'** -> **prone** / **susceptible** / **vulnerable**.

---

### 2. Determiners & Pronoun Concord Blanks
- Check whether the noun following the blank is countable or uncountable, singular or plural:
  - Countable Plural (*books, problems*) -> requires **many, few, several, these**.
  - Uncountable Mass (*water, advice, progress*) -> requires **much, little, less, this**.
- Relative Pronouns:
  - Referring to persons as subject -> **who**.
  - Referring to persons as object -> **whom**.
  - Referring to animals or non-living things -> **which / that**.
  - Indicating possession -> **whose**.

---

### 3. Subject-Verb Concord & Auxiliary Selection
- Look at the subject preceding the blank:
  - If the subject is singular (e.g., *'The development of these rural tribal sectors'*), the verb must agree with **development** (singular: *is, has, was*), NOT *sectors*!
  - If the sentence already contains an auxiliary (*has/have/had*), the main verb must be in **Past Participle (V3)**.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Vocabulary & Collocation Clues in Cloze Passages",
      content: `### 1. The Power of Collocations (Natural Word Partnerships)
In English, words do not combine randomly; they form habitual partnerships (**collocations**). In vocabulary blanks, the correct option is often the one that creates an established collocation:

#### Essential Exam Collocations:
- **Verb + Noun**:
  - *Pay* + attention / a visit / compliments / heed.
  - *Make* + an effort / a mistake / a decision / progress.
  - *Do* + business / homework / a favor / damage.
  - *Cast* + a vote / shadow.
  - *Commit* + a crime / suicide / a blunder.
  - *Fulfill* + an obligation / ambition / promise.
- **Adjective + Noun**:
  - *Heavy* + rain / traffic / smoker / loss (NOT *strong rain*).
  - *Strong* + coffee / wind / tea / evidence.
  - *Sound* + sleep / advice / judgment / health.
  - *Keen* + interest / competition / observer.
  - *Vigorous* + exercise / campaign / defense.

---

### 2. Connotation Consistency
- Ensure that the blank matches the emotional tone of the sentence:
  - *Sentence:* 'The criminal was notorious for his ________ schemes.'
    - Options: (A) ingenious, (B) nefarious, (C) famous, (D) benevolent.
    - Since the context involves a *'criminal'* who is *'notorious'*, the negative word **nefarious** (wicked) is the only option with matching negative connotation.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Cohesive Devices & Discourse Connectors",
      content: `### 1. The Logical Function of Connectors
Discourse markers act as signposts guiding the reader through the logical progression of the passage. Choosing the correct conjunction or transition adverb depends entirely on the relationship between preceding and succeeding clauses:

#### A. Contrast / Concession (Reversing Direction):
- Used when the second clause contradicts or limits the first clause:
- *Connectors:* **However, although, though, yet, nevertheless, on the other hand, whereas, despite, in spite of**.
  - *Example:* The terrain was rugged and hazardous; **however**, the rescue team persevered.
  - *Example:* **Although** rainfall was scarce, the farmers produced a decent harvest.

#### B. Cause and Effect / Result (Logical Consequence):
- Used when the second clause is a direct outcome of the first:
- *Connectors:* **Therefore, consequently, as a result, thus, hence, because, since**.
  - *Example:* The groundwater level had depleted drastically; **consequently**, tubewells dried up.

#### C. Addition / Reinforcement (Adding Information):
- Used to add another supporting argument or fact:
- *Connectors:* **Moreover, furthermore, in addition, besides, also, not only...but also**.
  - *Example:* The scheme provides free medical care; **moreover**, it reimburses travel costs.

#### D. Condition / Prerequisite:
- *Connectors:* **If, unless, provided that, in case**.
  - *Example:* Industrial growth cannot be sustained **unless** environmental safeguards are enforced.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Full Walkthrough of a Model Vyapam Cloze Test",
      content: `### Model Examination Cloze Passage:
*Forests play a pivotal role in maintaining ecological balance on Earth. They act as the Earth's green lungs, absorbing vast quantities of carbon dioxide and ...(1)... life-giving oxygen. In addition, forest cover protects the soil from erosion and helps in ...(2)... groundwater aquifers. However, rapid commercial exploitation and deforestation have ...(3)... this natural equilibrium in recent decades. Unless decisive conservation measures are ...(4)... immediately, future generations will face catastrophic climatic crises. It is therefore imperative that both governments and citizens work in ...(5)... to preserve our pristine wilderness.*

---

### Step-by-Step Analysis & Solution:

1. **Blank (1)**:
   - *Options:* (A) consuming, (B) releasing, (C) destroying, (D) inhaling.
   - *Analysis:* Parallelism and biology! Forests *'absorb'* carbon dioxide and *'release'* oxygen. 'Inhaling' and 'consuming' apply to animals.
   - *Correct Choice:* **(B) releasing**.

2. **Blank (2)**:
   - *Options:* (A) depleting, (B) exhausting, (C) replenishing, (D) evaporating.
   - *Analysis:* The context is the beneficial role of forests ('protects soil... and helps in...'). 'Depleting' and 'exhausting' are negative. Forests recharge or restore groundwater.
   - *Correct Choice:* **(C) replenishing**.

3. **Blank (3)**:
   - *Options:* (A) stabilized, (B) disrupted, (C) strengthened, (D) maintained.
   - *Analysis:* The transition word *'However'* introduces a negative contrast ('deforestation have... this natural equilibrium'). Deforestation damages or breaks balance.
   - *Correct Choice:* **(B) disrupted**.

4. **Blank (4)**:
   - *Options:* (A) taken, (B) made, (C) done, (D) put.
   - *Analysis:* Collocation! The standard English collocation with *'measures'* is **take measures** (*measures are taken*). We do not say 'measures are made' or 'done'.
   - *Correct Choice:* **(A) taken**.

5. **Blank (5)**:
   - *Options:* (A) isolation, (B) tandem, (C) conflict, (D) dispute.
   - *Analysis:* The sentence advocates collective cooperation ('both governments and citizens work in...'). The fixed idiomatic phrase meaning acting together in partnership is **in tandem** (or *in unison*).
   - *Correct Choice:* **(B) tandem**.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Common English Collocations in Cloze Test Passages",
      headers: ["Base Verb / Word", "Mandatory Natural Collocations", "Unnatural / Incorrect Combinations", "Model Usage in Cloze Test"],
      rows: [
        ["Pay", "Pay attention, pay heed, pay tribute, pay a visit", "Give attention (clumsy), do attention", "Students must pay attention to grammatical concord."],
        ["Take", "Take measures, take steps, take care, take advantage", "Do measures, make measures", "The government took strict measures to curb inflation."],
        ["Commit", "Commit a blunder, commit a crime, commit suicide", "Make a crime, do a blunder", "He committed a grave blunder in the audit."],
        ["Heavy", "Heavy rain, heavy traffic, heavy smoker, heavy loss", "Strong rain, powerful traffic", "Heavy rain disrupted train traffic between Durg and Raipur."],
        ["Make", "Make progress, make an effort, make a decision", "Do an effort, take a decision", "She made continuous efforts to improve her vocabulary."],
        ["Cast", "Cast a vote, cast a shadow, cast aspersions", "Throw a vote, give a vote", "Citizens assembled early to cast their votes."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Cohesive Connectors & Discourse Markers Reference Chart",
      headers: ["Discourse Function", "Standard Connectors / Markers", "Relationship Expressed", "Sentence Example"],
      rows: [
        ["Contrast / Concession", "However, Although, Nevertheless, Yet, Despite", "Introduces unexpected contrasting fact", "He was exhausted; however, he finished the race."],
        ["Causal / Result", "Consequently, Therefore, Thus, Hence, As a result", "Denotes logical outcome or consequence", "The river flooded; consequently, bridges were closed."],
        ["Additive / Reinforcing", "Moreover, Furthermore, In addition, Besides", "Adds an extra supporting argument", "The policy cuts taxes; moreover, it creates jobs."],
        ["Alternative / Choice", "Otherwise, Or, Alternatively, Either...or", "Presents an alternative condition", "Work hard, otherwise you will regret it."],
        ["Exemplifying", "For instance, For example, Namely, Specifically", "Introduces a concrete illustration", "Many minerals, namely iron ore and bauxite, abound in CG."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Grammar-Based vs Vocabulary-Based Blank Diagnostic Matrix",
      headers: ["Blank Dimension", "Grammar-Based Blank", "Vocabulary-Based Blank"],
      rows: [
        ["Nature of Missing Word", "Prepositions, Conjunctions, Articles, Auxiliary Verbs", "Nouns, Action Verbs, Descriptive Adjectives, Idiomatic phrases"],
        ["Primary Decision Factor", "Syntactical rules, fixed prepositions, subject-verb concord", "Collocations, thematic tone, precise contextual meaning"],
        ["Options Characteristic", "Small structural words (at, in, who, which, since, although)", "Rich lexical words (disrupted, mitigated, pristine, fragile)"],
        ["Solving Strategy", "Look at immediate words before and after the blank", "Look at the overall sentence message and paragraph context"]
      ]
    }
  ],
  pyqs: [
    {
      question: "In a cloze test, if a blank is followed by the preposition 'OF', which of the following words correctly fits: 'The delegation ________ of five senior civil servants.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) comprised",
        "B) consisted",
        "C) contained",
        "D) included"
      ],
      correctAnswer: "B) consisted",
      explanation: "'Consisted' is the only verb among the choices that takes the preposition 'of' (*consisted of*). 'Comprised', 'contained', and 'included' are transitive verbs that take their object directly without 'of'."
    },
    {
      question: "Complete the blank in the sentence: 'The administration decided to take immediate ________ to control the epidemic.' [CG Vyapam Patwari Exam]",
      options: [
        "A) steps",
        "B) actions",
        "C) measures",
        "D) Both A and C are standard collocations"
      ],
      correctAnswer: "D) Both A and C are standard collocations",
      explanation: "In English idiomatic usage, both 'take steps' and 'take measures' are established standard collocations meaning to initiate actions toward solving a problem."
    },
    {
      question: "Choose the appropriate discourse connector: 'The student prepared rigorously for the exam; ________, he secured the top rank in the state.' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) however",
        "B) consequently",
        "C) although",
        "D) nevertheless"
      ],
      correctAnswer: "B) consequently",
      explanation: "Securing the top rank is the direct, logical result of rigorous preparation. The cause-and-effect transition connector 'consequently' (or 'therefore') is required. 'However' and 'nevertheless' express contrast."
    },
    {
      question: "Fill in the blank in the passage: 'He was deeply interested ________ learning Chhattisgarhi folk dance traditions.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) on",
        "B) with",
        "C) in",
        "D) for"
      ],
      correctAnswer: "C) in",
      explanation: "The adjective 'interested' is idiomatically followed by the preposition 'in': 'interested in learning'."
    },
    {
      question: "Complete the collocation: 'The defense attorney requested the jury to ________ attention to the physical evidence.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) give",
        "B) pay",
        "C) do",
        "D) make"
      ],
      correctAnswer: "B) pay",
      explanation: "The standard English collocation with 'attention' is 'pay attention'."
    },
    {
      question: "Fill in the blank: 'The scheme was hailed as a success; ________, its high cost was heavily criticized by economists.' [CG Vyapam ADEO Exam]",
      options: [
        "A) moreover",
        "B) however",
        "C) therefore",
        "D) because"
      ],
      correctAnswer: "B) however",
      explanation: "The first clause notes success (positive), while the second notes criticism of high cost (negative). To transition between opposing sentiments, the contrast connector 'however' is required."
    }
  ],
  mcqs: [
    {
      question: "The first step in solving a cloze test passage should be:",
      options: [
        "A) Filling in blank 1 immediately.",
        "B) Reading the entire passage quickly without filling blanks to grasp the main theme.",
        "C) Memorizing all the options.",
        "D) Translating each word into Hindi."
      ],
      correctAnswer: "B) Reading the entire passage quickly without filling blanks to grasp the main theme.",
      explanation: "An initial uninterrupted read-through provides the overall theme, tone, and tense framework, preventing local misjudgments in individual blanks."
    },
    {
      question: "Select the correct collocation: 'He made a grave ________ in calculating the tax return.'",
      options: [
        "A) crime",
        "B) blunder",
        "C) guilt",
        "D) sin"
      ],
      correctAnswer: "B) blunder",
      explanation: "In standard English, one 'makes a blunder' (or 'commits a blunder') in calculation or judgment. 'Crime' is paired with 'commit'."
    },
    {
      question: "Fill in the blank: 'The flood victims were prone ________ water-borne diseases.'",
      options: [
        "A) with",
        "B) to",
        "C) for",
        "D) from"
      ],
      correctAnswer: "B) to",
      explanation: "The adjective 'prone' (meaning susceptible or vulnerable to) is invariably followed by the preposition 'to'."
    },
    {
      question: "Choose the correct connector: '________ he was severely injured, he managed to save the drowning child.'",
      options: [
        "A) Because",
        "B) Since",
        "C) Although",
        "D) Therefore"
      ],
      correctAnswer: "C) Although",
      explanation: "'Although' introduces a concessive clause of contrast between severe injury and the heroic act of saving the child."
    },
    {
      question: "Fill in the blank: 'The industrial expansion will ________ create thousands of employment opportunities.'",
      options: [
        "A) doubtfully",
        "B) undoubtedly",
        "C) scarcely",
        "D) rarely"
      ],
      correctAnswer: "B) undoubtedly",
      explanation: "In positive economic exposition, 'undoubtedly' (certainly, without doubt) fits the affirming tone of employment creation."
    },
    {
      question: "Complete the blank: 'The new regulations are in accordance ________ state statutory guidelines.'",
      options: [
        "A) with",
        "B) to",
        "C) for",
        "D) by"
      ],
      correctAnswer: "A) with",
      explanation: "The fixed prepositional phrase is 'in accordance with'."
    },
    {
      question: "Select the correct collocation for severe atmospheric precipitation: 'The match was called off due to ________ rain.'",
      options: [
        "A) strong",
        "B) powerful",
        "C) heavy",
        "D) high"
      ],
      correctAnswer: "C) heavy",
      explanation: "In English collocations, rain is described as 'heavy', 'torrential', or 'light', never 'strong' or 'powerful'."
    },
    {
      question: "Fill in the blank: 'He could not get admission ________ he had scored less than the cutoff marks.'",
      options: [
        "A) although",
        "B) because",
        "C) however",
        "D) despite"
      ],
      correctAnswer: "B) because",
      explanation: "Scoring less than the cutoff is the direct cause of not getting admission. 'Because' introduces the causal reason."
    }
  ],
  keyTerminology: [
    {
      term: "Cloze Test",
      definition: "An exercise consisting of a portion of text with certain words removed, where the participant is asked to replace the missing words."
    },
    {
      term: "Closure (Gestalt)",
      definition: "The psychological tendency of the human mind to perceive an incomplete pattern as a whole by supplying missing elements from context."
    },
    {
      term: "Collocation",
      definition: "The habitual juxtaposition of a particular word with another word or words with a frequency greater than random chance."
    },
    {
      term: "Discourse Marker",
      definition: "A word or phrase (such as however, furthermore, consequently) that connects and indicates relationships between sentences or ideas."
    },
    {
      term: "Forward Clue",
      definition: "A contextual hint located in a sentence following a blank that reveals the appropriate word needed in an earlier blank."
    },
    {
      term: "Concession",
      definition: "A linguistic device yielding a point or admitting a contrasting fact, introduced by words like 'although' or 'in spite of'."
    },
    {
      term: "Register Consistency",
      definition: "Maintaining an appropriate level of formality, tone, and academic vocabulary throughout the cloze passage."
    },
    {
      term: "Semantic Harmony",
      definition: "The coherence of meaning that results when selected words logically harmonize with the overall proposition of the text."
    }
  ],
  sources: [
    {
      title: "Proficiency in Reading Comprehension & Cloze Test",
      author: "Ajay Singh (Arihant Publications)",
      details: "Systematic 3-pass methodology, collocation lists, and competitive exam passage drills."
    },
    {
      title: "English Grammar in Use",
      author: "Raymond Murphy (Cambridge University Press)",
      details: "Units on discourse markers, prepositions following adjectives, and linking words."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Comprehensive analysis of discourse markers, conjunctions, and collocations."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Compilation of cloze tests from Vyapam recruitment exams between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Filling on the First Read",
      confusion: "Attempting to select options for blank 1 before reading the rest of the paragraph.",
      clarity: "Never fill blanks on your first read! Read the entire passage first. The clue for blank 1 often resides in the third or fourth sentence."
    },
    {
      concept: "Comprise of vs Consist of",
      confusion: "Choosing 'comprised' when followed by 'of'.",
      clarity: "**'Consist'** takes 'of' (*consists of*). **'Comprise'** takes NO 'of' in active voice (*the team comprises ten members*)."
    },
    {
      concept: "However vs Therefore",
      confusion: "Using 'however' when cause-and-effect is intended.",
      clarity: "**However** indicates **contrast/opposition** (*It was dark; however, we walked*). **Therefore** indicates **result/conclusion** (*It was dark; therefore, we took a torch*)."
    },
    {
      concept: "Heavy rain vs Strong rain",
      confusion: "Translating directly from regional languages into English.",
      clarity: "In English, rainfall is collocated with **'heavy'** (*heavy rain*), while wind is collocated with **'strong'** (*strong wind*)."
    },
    {
      concept: "Although vs Despite",
      confusion: "Using 'despite' with a subject + verb clause.",
      clarity: "**'Although'** is a conjunction followed by a full clause (*Although he was ill*). **'Despite'** is a preposition followed by a noun/gerund (*Despite his illness*)."
    }
  ],
  faqList: [
    {
      question: "Why is a cloze test considered harder than standalone fill-in-the-blanks?",
      answer: "Because all 5 or 10 blanks in a cloze test are interconnected within a single continuous narrative. A mistake in understanding the passage theme can lead to selecting the wrong register or tone for multiple blanks."
    },
    {
      question: "How can I identify whether a blank needs a grammar word or a vocabulary word?",
      answer: "Look at the options. If the options consist of prepositions (to, on, in), conjunctions (although, because), or pronouns (who, which), it is a grammar blank. If the options consist of nouns, verbs, or adjectives, it is a vocabulary blank."
    },
    {
      question: "What is a 'Forward Clue' in a cloze test?",
      answer: "A forward clue occurs when an author introduces a concept in blank 2, but repeats the exact synonym or clarifying noun phrase in the next sentence, revealing the answer in hindsight."
    },
    {
      question: "Can two words both be grammatically correct for a blank?",
      answer: "Yes, but only one will be collocationally and contextually superior. For example, both 'make' and 'commit' are verbs, but you 'commit a crime' and 'make a mistake'."
    },
    {
      question: "How much time should an aspirant spend on a 5-blank cloze test in CG Vyapam?",
      answer: "Ideally, 3 to 4 minutes: 1 minute for the initial read, 2 minutes for targeted filling, and 30 to 45 seconds for final verification."
    }
  ],
  oneLinerRevision: [
    "Always read the full passage once before attempting to fill any cloze test blanks.",
    "Look immediately after the blank for prepositions that dictate the correct verb or adjective.",
    "Collocations govern vocabulary: we say 'heavy rain', 'take measures', and 'pay attention'.",
    "'Consist' takes 'of' (*consists of*); 'Comprise' takes no preposition (*comprises*).",
    "'However' and 'Although' signal contrast; 'Therefore' and 'Consequently' signal result.",
    "'Moreover' and 'Furthermore' add reinforcing information to an existing point.",
    "Check subject-verb concord: match the verb with the true head noun, not parenthetical words.",
    "Countable plural nouns take 'many' or 'few'; uncountable mass nouns take 'much' or 'little'.",
    "A forward clue in a later sentence often reveals the word needed in an earlier blank.",
    "Always do a third pass: read the completed passage to verify smooth logical flow."
  ],
  rapidRevision: {
    points: [
      "The 3-Pass Rule: 1. Read for theme; 2. Fill using grammar/collocations; 3. Verify flow.",
      "Preposition Keys: Prone to, interested in, consisted of, in accordance with.",
      "Collocations: Pay attention, take measures, commit a crime, heavy rain, make an effort.",
      "Transitions: However (contrast), Therefore (result), Moreover (addition), Unless (condition).",
      "Concord: Match verbs to true subject, verify countable vs uncountable determiners."
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
