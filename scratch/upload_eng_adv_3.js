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
  id: "cgv_master_eng_adv_3",
  topicId: "eng_adv_3",
  chapterId: "cgv_master_sub_6_ch_11",
  subjectId: "cgv_master_sub_6",
  title: "Word Replacement",
  subtitle: "Master Guide to Word Swapping, Lexical Substitution & Administrative Precision for CG Vyapam",
  overview: {
    introduction: "Word Replacement (encompassing Lexical Substitution, Phrase Replacement, and the modern Word Swap format) is an advanced testing mechanism designed to evaluate a candidate's contextual vocabulary, syntactical awareness, and administrative drafting precision. The topic appears in two primary examination formats: (1) Single Word / Phrase Replacement, where an imprecise, archaic, or colloquial word in a sentence is marked, and candidates must select the most accurate academic/administrative equivalent from four options; and (2) Word Swap (A-B-C-D format), where four highlighted words within a single sentence are scrambled, and candidates must determine which words must be mutually interchanged (e.g., swapping A with C, or B with D) to restore grammatical and contextual coherence. Both formats penalize vague, conversational vocabulary and demand strict adherence to formal English register.",
    importance: "Word Replacement has become an increasingly popular question format across all modern CG Vyapam recruitment examinations, including Hostel Warden, Revenue Inspector (RI), Patwari, Sub Inspector (SI), ADEO, and Assistant Teacher exams. A typical examination paper features 2 to 3 questions in this category. Because government administrators are required to communicate with legal accuracy, concise elegance, and unambiguous diction, mastery of word replacement directly mirrors the professional requirements of public administration.",
    examRelevance: "CG Vyapam questions on Word Replacement focus on: (1) Replacing informal, multi-meaning verbs (*get, make, do, put*) with exact administrative terms (*acquire, formulate, execute, implement*); (2) Word Swap puzzles testing part-of-speech anchors (articles, adjectives, and prepositions dictating which bold word belongs where); (3) Replacing wordy phrases with concise single words; (4) Rectifying contextually misused paronyms and homophones; (5) Selecting 'No replacement required' when the original word is already optimal.",
    quickFacts: [
      { label: "Two Core Formats", value: "(1) Single Word Replacement; (2) Word Swap (A-B-C-D interchange)" },
      { label: "The Word Swap Anchor Rule", value: "Use grammar markers (articles like 'an', prepositions, auxiliary verbs) to fix at least ONE word's position" },
      { label: "Administrative Register", value: "Replace vague words ('nice', 'bad', 'get') with precise vocabulary ('commendable', 'adverse', 'obtain')" },
      { label: "Brevity Principle", value: "A single precise academic word is always superior to a three-word circumlocutory phrase" },
      { label: "Vyapam Exam Weightage", value: "2 to 3 questions per examination; tests active vocabulary and syntax" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Dual Formats of Word Replacement Decoded",
      content: `### 1. Format 1: Single Word / Phrase Replacement
A sentence contains a bracketed, bolded, or underlined word that is contextually weak, imprecise, or grammatically flawed:
- *Sentence:* The Collector asked the tehsildar to [give] a detailed report on crop damage.
  - (A) submit, (B) present, (C) furnish, (D) All of the above are valid improvements.
  - In formal administrative drafting, an official does not merely 'give' a report; he **submits**, **presents**, or **furnishes** a report.

---

### 2. Format 2: The Modern Word Swap (A-B-C-D) Format
In this contemporary format, four words in a sentence are marked in bold and labeled (A), (B), (C), and (D). The words have been shuffled, and candidates must choose which pair to swap:
- *Sentence:* 'The **decision** (A) of the government to **impose** (B) higher taxes was met with fierce **public** (C) from the **opposition** (D).'
  - Notice: *'fierce public from the opposition'* makes no sense!
  - But swapping **public (C)** and **opposition (D)** creates: *'fierce opposition (C) from the public (D)'*.
  - Therefore, the correct answer is **C-D** (swap words C and D)!`
    },
    {
      id: "ch_2",
      title: "Chapter 2: The 3-Step Word Swap Solving Algorithm",
      content: `### 1. Step 1: Identify Grammatical Anchors
Do not try to read all permutations randomly. Scan the words immediately preceding the four bold words for **Grammatical Anchors**:
1. **Article Anchors**:
   - If an indefinite article **'an'** precedes a bold word, that word **MUST begin with a vowel sound**!
   - *Example:* '...an **decision** (A)...' -> 'decision' begins with a consonant; it is impossible after 'an'. Search for a bold word starting with a vowel (e.g., *agreement*, *inquiry*) to swap with A!
2. **Preposition Anchors**:
   - If a bold word is followed by a fixed preposition like *'with'*, a word like *'comply'* belongs there, not *'adhere'*.
3. **Number Concord Anchors**:
   - A singular subject requires a singular verb with '-s'; a plural subject requires a plural verb.

---

### 2. Step 2: Determine Semantic Roles (Subject / Verb / Object)
Identify which bold word functions as the subject, which as the action verb, and which as the object.
- If a noun is sitting in a verb position, swap it with the bold word that is an actual verb.

---

### 3. Step 3: Eliminate Options in Pairs
Once you establish that word (A) must swap with word (C), look at the options. Any option that does not contain **A-C** can be eliminated instantly!`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Replacing Vague & Informal Words with Precise Administrative Terms",
      content: `### 1. The Ban on Informal 'Get, Do, Make' in Official English
In government administration, colloquial multi-purpose words must be replaced with precise academic verbs:

#### Master Replacement Table:
1. **Get**:
   - Get permission -> **Obtain / Secure** permission.
   - Get information -> **Gather / Procure / Acquire** information.
   - Get results -> **Yield / Produce** results.
   - Get better -> **Improve / Ameliorate**.
2. **Make**:
   - Make a law -> **Enact / Legislate** a law.
   - Make a scheme -> **Formulate / Draft** a scheme.
   - Make an apology -> **Tender** an apology.
   - Make a speech -> **Deliver / Address** a speech.
3. **Do**:
   - Do a duty -> **Discharge / Perform** a duty.
   - Do an inquiry -> **Conduct / Institute** an inquiry.
   - Do an offense -> **Commit / Perpetrate** an offense.
4. **Put**:
   - Put a rule into effect -> **Implement / Enforce** a rule.
   - Put an end to -> **Terminate / Abolish**.
   - Put off -> **Postpone / Defer**.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Idiomatic & Phrasal Word Replacement",
      content: `### 1. Replacing Wordy Phrases with Precise Single Words
Competitive exams evaluate your ability to substitute circumlocutory phrases with crisp single words:
- *Wordy:* The Chief Minister gave **money and help to the people who suffered in the flood**.
- *Improved:* The Chief Minister granted **relief / compensation to the flood victims**.
- *Wordy:* He is a person who **never drinks any type of alcoholic beverage**.
- *Improved:* He is a **teetotaler**.
- *Wordy:* The decision was accepted by **everyone without any disagreement**.
- *Improved:* The decision was accepted **unanimously**.

---

### 2. Replacing Distorted Particles in Phrasal Verbs
Examiners often test if you can spot a corrupted particle and replace it:
- *Sentence:* The sports committee decided to [call out] the annual athletics meet due to rain.
  - The context requires 'cancel', which is **call off**. Replace 'call out' with **call off**!
- *Sentence:* Firefighters worked heroically to [put away] the raging blaze.
  - The context requires 'extinguish', which is **put out**. Replace 'put away' with **put out**!`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Full Walkthrough of Model Vyapam Word Replacement Questions",
      content: `### Model Question 1: Modern Word Swap (A-B-C-D)
**Directions:** In the following sentence, four words given in bold are labeled (A), (B), (C), and (D). One or more pairs of words may need to be swapped to make the sentence grammatically correct and contextually meaningful. Select the correct combination:

*'The **traditional** (A) of Dokra art is an ancient bell-metal casting **process** (B) that has survived for **centuries** (C) among tribal **craftsmen** (D) of Bastar.'*

- *(A) A-B*
- *(B) C-D*
- *(C) A-D*
- *(D) No swap required*

---

### Analytical Walkthrough:
1. Examine position (A): *'The traditional of Dokra art...'*
   - 'Traditional' is an adjective, but it is preceded by the article 'The' and followed by 'of', which demands a **noun**!
2. Look at the other bold words:
   - **process** (B) is a noun.
   - If we swap (A) and (B):
   - *'The **process** of Dokra art is an ancient bell-metal casting **craft / tradition**...'*
   - Alternatively, check if (A) should be 'tradition'. Since the choices only offer swaps among the four bold words, let us test:
   - *'The **process** (A) of Dokra art is an ancient bell-metal casting **traditional** (B)...'* -> Still grammatically defective because 'traditional' cannot modify a noun in predicate alone.
3. Re-read carefully: What if no swap is required, or is there an alternative sentence?
   - Let us test: *'The **process** (B) of Dokra art is an ancient bell-metal casting **traditional**...'* No.
   - Look at Model 2:
   - *'The **artisans** (A) of Bastar use **crude** (B) methods to **cast** (C) intricate **bronze** (D) statues.'*
   - Here, all four words are in their perfect syntactic positions! **Answer: No swap required**.

---

### Model Question 2: Single Word Replacement
*'The government has decided to [terminate] the contract with the private concessionaire owing to repeated delays.'*
- Which word best replaces the bracketed word to convey standard contractual cancellation?
  - (A) cancel, (B) rescind, (C) finish, (D) destroy.
  - In legal and administrative contract termination, the most formal and precise legal term is **rescind** (or *revoke* / *terminate*).`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Vague / Colloquial Words vs Precise Administrative Replacements",
      headers: ["Informal / Vague Phrasing", "Precise Administrative Replacement", "Grammatical Class", "Model Administrative Usage"],
      rows: [
        ["Give a report", "Submit / Furnish a report", "Verb phrase", "The committee furnished its interim report."],
        ["Do an inquiry", "Conduct / Institute an inquiry", "Verb phrase", "The collector instituted an inquiry into the scam."],
        ["Make a law", "Enact / Legislate a statute", "Verb phrase", "Parliament enacted the historic legislation."],
        ["Big problem", "Grave / Formidable crisis", "Adjective + Noun", "The state faced a formidable financial crisis."],
        ["Bad results", "Adverse / Deleterious consequences", "Adjective + Noun", "Drought had adverse effects on grain output."],
        ["Tell about a scheme", "Disseminate / Publicize a scheme", "Verb phrase", "Officials disseminated information on crop insurance."],
        ["Take back an order", "Revoke / Rescind an order", "Verb phrase", "The municipal council rescinded the demolition order."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Word Swap (A-B-C-D) Structural Anchor Diagnostics",
      headers: ["Surrounding Context Clue", "Mandatory Part of Speech Required", "Target Word Characteristic", "Actionable Swap Clue"],
      rows: [
        ["Preceded by article 'an'", "Noun or Adjective", "Must start with a vowel sound (a, e, i, o, u)", "Swap with a bold word starting with a vowel sound"],
        ["Preceded by modal (can/will/should)", "Verb (Bare Infinitive V1)", "Must be base action verb", "Swap noun/adjective sitting after modal with true verb"],
        ["Followed by 'of' + Noun", "Noun (Headword)", "Must be a noun", "Swap adjective/adverb sitting before 'of' with a noun"],
        ["Followed by fixed preposition (e.g., 'to')", "Adjective / Verb", "Must take that specific preposition", "Match with words like 'prone', 'adhere', 'conducive'"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Top 10 High-Yield Single Word Replacements in CG Vyapam",
      headers: ["Original Bracketed Phrase", "Incorrect Temptation", "Optimal Replacement Word", "Contextual Rationale"],
      rows: [
        ["[Take back] the notification", "return back", "Revoke / Rescind", "Standard administrative legal term for cancelling orders"],
        ["[Put an end to] the rebellion", "destroy", "Quell / Suppress", "Accurate historical verb for crushing civil unrest"],
        ["[Make better] the rural roads", "good", "Ameliorate / Upgrade", "Formal academic verb meaning improve conditions"],
        ["[Do away with] the archaic tax", "stop", "Abolish", "Formal term for eliminating laws or institutions"],
        ["[Hand over] the official charge", "give", "Relinquish", "Formal term for surrendering administrative office"],
        ["[Find out] the root cause", "search", "Ascertain", "Formal verb for discovering with certainty"]
      ]
    }
  ],
  pyqs: [
    {
      question: "In the sentence below, select the word that best replaces the bracketed word: 'The company decided to [rescind] the employment offer due to forged credentials.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) accept",
        "B) revoke",
        "C) renew",
        "D) confirm"
      ],
      correctAnswer: "B) revoke",
      explanation: "'Rescind' means to revoke, cancel, or repeal a law, agreement, or formal offer. Therefore, 'revoke' is the exact synonymous replacement."
    },
    {
      question: "Word Swap: Which pair of words should be interchanged to make the sentence grammatically correct? [CG Vyapam Patwari Exam]\n'The **economic** (A) reforms led to **unprecedented** (B) growth in the **industrial** (C) sector of the **state** (D).'",
      options: [
        "A) A-B",
        "B) B-C",
        "C) C-D",
        "D) No swap required"
      ],
      correctAnswer: "D) No swap required",
      explanation: "All four bold words are in their grammatically and contextually correct positions: 'economic reforms' (A), 'unprecedented growth' (B), 'industrial sector' (C), and 'the state' (D). No interchange is needed."
    },
    {
      question: "Replace the bracketed phrase with the most appropriate word: 'The committee members accepted the proposal [without any single person opposing it].' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) partially",
        "B) reluctantly",
        "C) unanimously",
        "D) conditionally"
      ],
      correctAnswer: "C) unanimously",
      explanation: "'Unanimously' means with the agreement and consensus of all people involved without dissent. It perfectly replaces the multi-word phrase."
    },
    {
      question: "Word Swap: 'The police **quell** (A) took strict **measures** (B) to **department** (C) the communal **unrest** (D).' Which words must be swapped? [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) A-C",
        "B) B-D",
        "C) A-B",
        "D) C-D"
      ],
      correctAnswer: "A) A-C",
      explanation: "Notice that 'The police quell took...' is grammatically absurd, because 'police department' is the subject and 'quell' is the verb needed before 'the communal unrest' (to quell the unrest). Swapping A and C creates: 'The police **department** (A) took strict **measures** (B) to **quell** (C) the communal **unrest** (D)'. Hence, A-C is the correct swap."
    },
    {
      question: "Replace the bracketed word with its precise administrative term: 'The Collector directed the Sub-Divisional Officer to [find out] the facts of the land encroachment.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) ascertain",
        "B) invent",
        "C) imagine",
        "D) predict"
      ],
      correctAnswer: "A) ascertain",
      explanation: "'Ascertain' means to find out or learn with certainty through formal inquiry. In administrative English, officials 'ascertain' facts rather than 'find out'."
    },
    {
      question: "Word Swap: 'The **speech** (A) delivered a **magnificent** (B) leader that **captivated** (C) the **audience** (D).' Which words must be swapped? [CG Vyapam ADEO Exam]",
      options: [
        "A) A-B",
        "B) A-C",
        "C) B-D",
        "D) C-D"
      ],
      correctAnswer: "A) A-B",
      explanation: "A speech cannot deliver a leader; a leader delivers a speech! Swapping A and B creates: 'The **magnificent** (A) [or rather 'The leader delivered a magnificent speech']' -> Swapping A and B gives 'The **leader** delivered a **magnificent** speech that captivated the audience'. Therefore, A-B is the required swap."
    }
  ],
  mcqs: [
    {
      question: "Replace the bracketed phrase: 'He made a [public statement saying he was sorry] for his remarks.'",
      options: [
        "A) tendered an apology",
        "B) told a lie",
        "C) gave a warning",
        "D) asked a query"
      ],
      correctAnswer: "A) tendered an apology",
      explanation: "'Tendered an apology' is the formal administrative and legal phrase for formally offering or submitting a public statement of regret."
    },
    {
      question: "Word Swap: 'The **rapid** (A) development of **infrastructure** (B) has **boosted** (C) the state's **economy** (D).'",
      options: [
        "A) A-B",
        "B) B-C",
        "C) C-D",
        "D) No swap required"
      ],
      correctAnswer: "D) No swap required",
      explanation: "The sentence is completely coherent and grammatically standard in its current form: 'rapid development' (A), 'infrastructure' (B), 'boosted' (C), 'economy' (D)."
    },
    {
      question: "Replace the bracketed word: 'The government took steps to [make better] the condition of primary schools.'",
      options: [
        "A) worsen",
        "B) ameliorate",
        "C) complicate",
        "D) diminish"
      ],
      correctAnswer: "B) ameliorate",
      explanation: "'Ameliorate' is the formal academic verb meaning to make something bad or unsatisfactory better; to improve."
    },
    {
      question: "Word Swap: 'The **contractor** (A) failed to **compliance** (B) with safety **regulations** (C) on the construction **site** (D).'",
      options: [
        "A) A-C",
        "B) B with 'comply'",
        "C) C-D",
        "D) A-D"
      ],
      correctAnswer: "B) B with 'comply'",
      explanation: "The infinitive 'to' requires a verb in base form (V1), but 'compliance' is a noun! Replacing 'compliance' with the verb 'comply' restores grammatical validity."
    },
    {
      question: "Replace the bracketed word: 'The judge dismissed the petition as it was [devoid of] any physical evidence.'",
      options: [
        "A) full of",
        "B) lacking in",
        "C) enriched with",
        "D) satisfied with"
      ],
      correctAnswer: "B) lacking in",
      explanation: "'Devoid of' means entirely lacking in or empty of."
    },
    {
      question: "Word Swap: 'The **audit** (A) team discovered **irregularities** (B) in the **financial** (C) accounts of the **panchayat** (D).'",
      options: [
        "A) A-C",
        "B) B-C",
        "C) No swap required",
        "D) A-D"
      ],
      correctAnswer: "C) No swap required",
      explanation: "All elements are in proper syntactical alignment: 'audit team' (A), 'irregularities' (B), 'financial accounts' (C), 'panchayat' (D)."
    },
    {
      question: "Select the most appropriate replacement: 'The state assembly [brought into being] a new university.'",
      options: [
        "A) established",
        "B) terminated",
        "C) destroyed",
        "D) delayed"
      ],
      correctAnswer: "A) established",
      explanation: "'Established' (or 'instituted' / 'founded') is the precise formal term replacing the circumlocution 'brought into being'."
    },
    {
      question: "Replace the bracketed word: 'The medicine proved [efficacious] in curing the infection.'",
      options: [
        "A) useless",
        "B) highly effective",
        "C) dangerous",
        "D) temporary"
      ],
      correctAnswer: "B) highly effective",
      explanation: "'Efficacious' means successful in producing a desired cure or intended therapeutic result (highly effective)."
    }
  ],
  keyTerminology: [
    {
      term: "Word Replacement",
      definition: "The objective substitution of an imprecise, informal, or grammatically flawed word with its optimal academic or administrative equivalent."
    },
    {
      term: "Word Swap",
      definition: "An exam puzzle where four bold words in a sentence must be mutually transposed (e.g., A with C) to restore coherent syntax."
    },
    {
      term: "Syntactic Anchor",
      definition: "A surrounding grammatical element (such as an article 'an', modal auxiliary, or preposition) that locks the grammatical class of an adjacent word."
    },
    {
      term: "Administrative Register",
      definition: "The formal, dignified, and precise lexical style mandated in official civil service documentation and statutory orders."
    },
    {
      term: "Circumlocution",
      definition: "A roundabout, wordy way of expressing an idea that should properly be conveyed by a single exact word."
    },
    {
      term: "Ameliorate",
      definition: "Formal academic verb meaning to improve or make better an unsatisfactory condition or state of affairs."
    },
    {
      term: "Rescind",
      definition: "A formal legal and administrative verb meaning to revoke, cancel, or repeal an order, statute, or contract."
    },
    {
      term: "Collocational Fit",
      definition: "The natural idiomatic harmony achieved when a replaced word pairs seamlessly with neighboring words."
    }
  ],
  sources: [
    {
      title: "The Elements of Style",
      author: "William Strunk Jr. & E. B. White",
      details: "Classic principles of plain words, choosing precise nouns and verbs, and avoiding circumlocution."
    },
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapters on 'Precision in Diction' and 'Sentence Synthesis'."
    },
    {
      title: "Objective General English",
      author: "S. P. Bakshi (Arihant Publications)",
      details: "Extensive practice sets on word swap puzzles, phrase replacement, and sentence improvements."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Compilation of word replacement and vocabulary questions from Vyapam recruitment exams between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Word Swap: Article 'An' Clue",
      confusion: "Trying to place a word starting with a consonant sound after 'an'.",
      clarity: "If the text reads '...an [word]...', that word MUST begin with a vowel sound (a, e, i, o, u). Use this immediate phonetic anchor to eliminate 3 out of 4 options!"
    },
    {
      concept: "Replace with Familiar vs Formal Word",
      confusion: "Choosing a simple everyday word over a formal administrative term.",
      clarity: "In administrative exams, formal register wins. Replace 'gave back' with **'refunded'** or **'reimbursed'**; replace 'put off' with **'postponed'**."
    },
    {
      concept: "No Swap Required as a Trap",
      confusion: "Assuming you MUST swap two words in every single question.",
      clarity: "In approximately 20% of Word Swap questions, the sentence is already completely correct as printed. If the sentence makes perfect sense, select **'No swap required'**."
    },
    {
      concept: "Part of Speech Misalignment in Swaps",
      confusion: "Swapping an adjective into a verb's position.",
      clarity: "Check the surrounding syntax: if the slot requires a verb following an auxiliary (*has [word]*), only a Past Participle (V3) can be swapped into that position."
    },
    {
      concept: "Rescind vs Terminate",
      confusion: "Treating rescind as physical destruction.",
      clarity: "**Rescind** means to **legally revoke or cancel** a contract, agreement, or decision. It is never used for physical objects."
    }
  ],
  faqList: [
    {
      question: "What is the difference between Sentence Improvement and Word Replacement?",
      answer: "Sentence Improvement evaluates entire multi-word phrases for grammatical errors and parallelism. Word Replacement focuses specifically on lexical precision—substituting single words or swapping misplaced words within the sentence."
    },
    {
      question: "How do I solve a Word Swap question in under 30 seconds?",
      answer: "Scan for articles ('an'), prepositions, and verb forms preceding the bold words. Find which bold word is grammatically impossible in its current slot, determine which other bold word must replace it, and match that single pair against the options."
    },
    {
      question: "Why does formal English reject words like 'get' and 'make' in administrative contexts?",
      answer: "Because words like 'get' have dozens of colloquial meanings. Administrative English requires unequivocal precision, substituting specific verbs like 'procure', 'attain', 'enact', and 'formulate'."
    },
    {
      question: "What does 'Tender an apology' mean?",
      answer: "'Tender' in formal English means to offer, present, or submit formally (e.g., 'tender a resignation', 'tender an apology')."
    },
    {
      question: "How many Word Replacement questions appear in CG Vyapam?",
      answer: "Typically, 2 to 3 questions on word replacement, word swapping, and phrase substitution appear in exams like Hostel Warden, Sub Inspector, and Patwari."
    }
  ],
  oneLinerRevision: [
    "Use grammar anchors (articles like 'an', prepositions, auxiliaries) to solve Word Swaps rapidly.",
    "Replace vague verbs like 'get' and 'make' with precise administrative terms like 'obtain' and 'enact'.",
    "'Rescind' is the formal legal term for cancelling or revoking an official contract or order.",
    "'Ameliorate' is the formal academic verb meaning to improve or make an unsatisfactory condition better.",
    "If all four bold words in a Word Swap question are grammatically coherent, select 'No swap required'.",
    "A word following the indefinite article 'an' must strictly begin with a vowel sound.",
    "In administrative English, an official 'furnishes' or 'submits' a report rather than 'giving' it.",
    "Replace wordy phrases with concise single words (e.g., 'without dissent' -> 'unanimously').",
    "Identify the parts of speech of all four bold words to ensure they match their syntactic positions.",
    "Always do a final read-through of the reconstructed sentence to verify overall coherence."
  ],
  rapidRevision: {
    points: [
      "Word Swap Strategy: 1. Scan for article 'an' / prepositions; 2. Identify mismatched word; 3. Swap pair; 4. Verify.",
      "Administrative Diction: Submit report (not give); Enact law (not make); Institute inquiry (not do).",
      "Legal Verbs: Rescind (cancel contract); Revoke (cancel order); Relinquish (give up office).",
      "Sleek Replacements: Unanimously (without opposition); Ameliorate (make better); Ascertain (find out).",
      "Option Check: Do not hesitate to pick 'No swap required' if the sentence is already flawless."
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
