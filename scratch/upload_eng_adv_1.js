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
  id: "cgv_master_eng_adv_1",
  topicId: "eng_adv_1",
  chapterId: "cgv_master_sub_6_ch_11",
  subjectId: "cgv_master_sub_6",
  title: "Para Jumbles",
  subtitle: "Master Guide to Sentence Rearrangement, Mandatory Pairs, Discourse Links & Vyapam Archives",
  overview: {
    introduction: "Para Jumbles (also termed Sentence Rearrangement or the PQRS format) is an advanced verbal reasoning and linguistic testing mechanism wherein a coherent, well-structured paragraph is segmented into four to six disordered sentences (typically labeled P, Q, R, S or A, B, C, D). Candidates are tasked with identifying the intrinsic logical, chronological, and grammatical coherence of the passage and selecting the correct sequence from four given options. Rather than reading sentences in isolated fragments, Para Jumbles evaluate a candidate's holistic comprehension of text flow: (1) Recognizing an independent opening sentence that introduces the primary theme; (2) Establishing 'Mandatory Pairs' (sentences that must logically occur consecutively, such as Noun-to-Pronoun links or Cause-and-Effect pairs); (3) Utilizing discourse markers (e.g., 'however', 'consequently', 'furthermore'); and (4) Identifying the terminal concluding sentence.",
    importance: "In CG Vyapam competitive examinations (Hostel Warden, Revenue Inspector, Patwari, Sub Inspector, ADEO, Assistant Teacher, and Secretariat Clerk exams), Para Jumbles constitute an essential testing area, appearing consistently as 2 to 3 questions per paper. A solid strategic approach eliminates subjective guesswork and enables candidates to solve complex rearrangements in less than 45 seconds with 100% mathematical accuracy through option elimination.",
    examRelevance: "Key areas tested in CG Vyapam exams include: (1) Standard 4-sentence rearrangement (P-Q-R-S); (2) Fixed First and Last Sentence format (S1 - P Q R S - S6); (3) Identifying mandatory pairs using pronoun references (*he, she, it, they, this, these*); (4) Chronological progression in historical or narrative texts; (5) Transition word connectors signaling shifts in argument or final conclusions.",
    quickFacts: [
      { label: "Core Objective", value: "Reconstruct a scrambled group of sentences into a coherent, logical, and grammatical paragraph" },
      { label: "Golden Solving Technique", value: "Find the Opening Sentence + Identify at least ONE Mandatory Pair -> Eliminate non-matching options" },
      { label: "Opening Sentence Rule", value: "Must be an independent statement introducing a proper noun/subject; cannot start with pronouns or transition conjunctions" },
      { label: "Pronoun-Antecedent Clue", value: "A sentence containing 'He', 'They', or 'This' must follow the sentence that introduced the specific noun" },
      { label: "Vyapam Exam Weightage", value: "2 to 3 questions per examination; high yield when solved via option elimination" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The 4-Step Scientific Solving Protocol for Para Jumbles",
      content: `### 1. The Fallacy of Trial-and-Error Reading
Untrained candidates frequently read Option A in full, then Option B in full, then Option C, and Option D. This approach is disorienting, creates cognitive confusion, and wastes 3 to 4 minutes per question.

---

### 2. The 4-Step Scientific Solving Protocol
1. **Step 1: Inspect the Options for Opening Sentences (10 Seconds)**:
   - Look at the first letters of the four options:
     - *(A) QPRS, (B) PQRS, (C) RQPS, (D) QSRP*
   - Notice that 'Q' appears twice, 'P' once, and 'R' once. 'S' does not appear as an opening letter!
   - This narrows your search: test only sentences **P, Q, and R** as potential openers.

2. **Step 2: Identify the Independent Opening Sentence**:
   - The opening sentence must be **syntactically independent**.
   - It introduces the primary subject, full name, or central concept.
   - It **CANNOT** begin with dependent pronouns (*he, they, it, this, these*) or transition conjunctions (*however, therefore, moreover, but, also, consequently*).

3. **Step 3: Establish at least ONE 'Mandatory Pair'**:
   - Find two sentences that are inextricably linked by grammar or logic (e.g., *Sentence R mentions a problem; Sentence P provides its consequence -> RP is a mandatory pair*).
   - Search the options: eliminate any option where the pair **RP** is separated or inverted!

4. **Step 4: Verify the Complete Sequence**:
   - Read the single surviving option from start to finish to confirm logical narrative flow.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Identifying the Opening & Concluding Sentences",
      content: `### 1. Anatomy of an Ideal Opening Sentence
The opening sentence of a paragraph possesses distinct linguistic hallmarks:
1. **Introduction of Full Names and Proper Nouns**:
   - The opening sentence will introduce the full formal name: *'Swami Vivekananda was born in Kolkata in 1863.'*
   - Subsequent sentences will use pronouns: *'He traveled extensively...', 'His teachings...'*
2. **Universal Definitions & Thematic Statements**:
   - Statements that define a phenomenon or pose a broad thesis: *'Solar energy is rapidly emerging as the cleanest alternative to fossil fuels.'*
3. **Absence of Backward-Looking Connectors**:
   - Any sentence starting with *Therefore, Consequently, In addition, On the other hand, Yet, However, Meanwhile, Similarly* **CANNOT** be the opening sentence!

---

### 2. Anatomy of an Ideal Concluding Sentence
The terminal sentence brings resolution, summary, or an ultimate evaluation:
1. **Signals of Conclusion**:
   - Introduced by transition adverbs like **Finally, Thus, Therefore, Consequently, Ultimately, In conclusion, As a result**.
2. **Forward-Looking or Summary Statement**:
   - Summarizes the findings or projects future consequences: *'Unless urgent steps are taken, groundwater depletion will become irreversible.'*`
    },
    {
      id: "ch_3",
      title: "Chapter 3: The Art of Finding Mandatory Pairs",
      content: `### 1. What is a Mandatory Pair?
A Mandatory Pair consists of two sentences that **MUST occur consecutively in exact order (e.g., PQ or RS)** due to grammatical or logical necessity.

---

### 2. Five Dependable Ways to Spot Mandatory Pairs
1. **The Noun-to-Pronoun Link**:
   - **Sentence 1 (Noun):** *'Dr. APJ Abdul Kalam spearheaded India's missile development program.'*
   - **Sentence 2 (Pronoun):** *'He firmly believed that technological self-reliance was indispensable for national security.'*
   - Sentence 1 **MUST precede** Sentence 2.

2. **The Full Form to Abbreviation Link**:
   - A sentence introducing an organization by its full name must precede the sentence using its acronym:
     - *Full Name:* 'The Professional Examination Board (**CGPEB**)...'
     - *Acronym:* 'The **Board** conducted the tests across 33 districts...'

3. **General Principle to Specific Example Link**:
   - A general rule precedes an illustrative case study:
     - *General:* 'Traditional handicraft sectors in Chhattisgarh are reviving.'
     - *Example:* 'For instance, Bell-metal Dhokra artisans in Kondagaon recorded record sales.'

4. **Cause and Effect Link**:
   - The action (cause) must precede its outcome (effect):
     - *Cause:* 'Continuous heavy rainfall triggered severe landslides along the ghats.'
     - *Effect:* 'Consequently, vehicular movement between Raipur and Jagdalpur was suspended.'

5. **Question and Answer Link**:
   - A rhetorical question is immediately followed by its analytical explanation:
     - *Question:* 'Why do developing nations struggle with renewable energy transitions?'
     - *Answer:* 'The primary bottleneck lies in the immense upfront capital required for infrastructure.'`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Connective Signposts & Chronological Sequencing",
      content: `### 1. Chronological Sequencing in Historical & Narrative Texts
When a passage narrates historical events, life biographies, or technological developments:
- **Order of Time:** Past -> Intermediate -> Present -> Future.
  - Look for dates and years: *In 1947 ... by 1971 ... in the 1990s ... today*.
  - Look for sequence words: *Initially ... subsequently ... later ... eventually*.

---

### 2. Connective Signposts as Sequencing Anchors
- **Contrast Markers (Reversing the Argument)**:
  - If Sentence A states a positive fact, and Sentence B begins with *'However'*, *'On the other hand'*, or *'Nevertheless'*, Sentence B must follow Sentence A.
- **Addition Markers (Reinforcing the Argument)**:
  - *'Furthermore'*, *'Moreover'*, *'In addition'* signal that Sentence B adds an extra point to the argument initiated in Sentence A.
- **Demonstrative Pronoun Links (*This, That, These, Those*)**:
  - If a sentence starts with *'This policy...'*, *'These challenges...'*, or *'Such measures...'*, it **MUST immediately follow** the sentence that described that policy, challenge, or measure!`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Full Walkthrough of Model Vyapam Para Jumbles",
      content: `### Model Question 1: Standard 4-Sentence Rearrangement (PQRS)
**Directions:** Rearrange the following four sentences (P, Q, R, S) in proper logical order:

- **P:** He traveled across America and Europe, delivering lectures on Vedanta and universal brotherhood.
- **Q:** Swami Vivekananda was one of the greatest spiritual leaders of modern India.
- **R:** In 1893, he represented Hinduism at the Parliament of the World's Religions in Chicago.
- **S:** His historic speech began with the famous words, 'Sisters and brothers of America', captivating the entire audience.

**Options:**
- *(A) QPRS*
- *(B) Q R S P*
- *(C) P Q R S*
- *(D) R S P Q*

---

### Step-by-Step Option Elimination:
1. **Find the Opening Sentence**:
   - Sentence **P** starts with pronoun 'He' (cannot open).
   - Sentence **R** mentions 'In 1893, he represented...' (pronoun 'he'; cannot open).
   - Sentence **S** starts with 'His historic speech...' (pronoun 'his'; cannot open).
   - Sentence **Q** introduces the full proper noun: *'Swami Vivekananda was one of the greatest spiritual leaders...'* -> **Q is the opening sentence!**
   - Eliminate Options (C) and (D) immediately!
2. **Find the Mandatory Pair**:
   - Sentence **R** mentions his representation at the Chicago Parliament in 1893.
   - Sentence **S** mentions his speech at that parliament starting with 'Sisters and brothers of America'.
   - Therefore, **RS** is a mandatory pair!
   - Sentence **P** describes his broader travels following that historic event.
3. **Check Surviving Options (A) QPRS vs (B) QRSP**:
   - In Option (B), we have **Q -> R -> S -> P**, which maintains perfect chronological and logical flow.
   - **Correct Answer: (B) QRSP**.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Mandatory Pair Typology & Diagnostic Linking Signals",
      headers: ["Pair Type", "Preceding Element (Sentence 1)", "Succeeding Element (Sentence 2)", "Diagnostic Linking Signal"],
      rows: [
        ["Noun -> Pronoun", "Introduces proper noun (e.g., 'Raman Singh')", "Uses personal pronoun ('He / His')", "Pronoun must strictly succeed its noun antecedent"],
        ["Concept -> Demonstrative", "Describes an idea/event ('economic inflation')", "Refers back ('This phenomenon / These crises')", "Demonstrative ('this/these') points back to concept"],
        ["Cause -> Effect", "States the initiating action ('Dam gates opened')", "States the result ('Consequently, low-lying areas flooded')", "Signal words: consequently, as a result, therefore"],
        ["General -> Specific", "States broad truth ('Forests protect ecology')", "Provides localized example ('For instance, sal forests in Bastar')", "Signal words: for instance, for example, specifically"],
        ["Problem -> Solution", "Articulates difficulty ('Groundwater is depleting')", "Proposes remedy ('Water harvesting must be made mandatory')", "Logical problem-resolution progression"]
      ]
    },
    {
      tableId: "tab_2",
      title: "Transition Words as Sequencing Signposts",
      headers: ["Transition Word Category", "Common Connective Words", "Position in Paragraph", "Sequencing Function"],
      rows: [
        ["Opening / Initiative", "Initially, First and foremost, In the beginning", "Paragraph Opening", "Introduces the primary topic or first stage"],
        ["Additive / Continuing", "Moreover, Furthermore, In addition, Besides", "Middle of Paragraph", "Adds extra supporting data to an ongoing point"],
        ["Contrasting / Reversing", "However, Nevertheless, On the contrary, Yet", "Middle / Shift point", "Reverses the direction or limitations of previous sentence"],
        ["Concluding / Consequence", "Therefore, Consequently, Ultimately, Thus", "Paragraph Conclusion", "Brings the passage to its logical culmination"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Diagnostic Comparison: Opening Sentence vs Concluding Sentence",
      headers: ["Linguistic Feature", "Opening Sentence Characteristics", "Concluding Sentence Characteristics"],
      rows: [
        ["Syntactic Independence", "100% independent; stands alone clearly", "Dependent on preceding arguments"],
        ["Subject Identification", "Introduces proper noun, definition, or primary topic", "Refers back to established concepts"],
        ["Pronoun Usage", "Free from unexplained pronouns (he, it, they)", "Often summarizes using pronouns or collective terms"],
        ["Typical Connectives", "None (or broad temporal markers like 'Long ago')", "Thus, therefore, ultimately, finally, in conclusion"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Rearrange the sentences into a meaningful paragraph: [CG Vyapam Hostel Warden Exam]\n(P) He was awarded the Nobel Prize for Literature in 1913.\n(Q) Rabindranath Tagore was a multifaceted genius of modern India.\n(R) This prestigious award was conferred for his collection of poems titled Gitanjali.\n(S) He was the first Asian to achieve this international distinction.",
      options: [
        "A) Q P R S",
        "B) Q P S R",
        "C) P Q R S",
        "D) Q R P S"
      ],
      correctAnswer: "A) Q P R S",
      explanation: "Sentence Q introduces Rabindranath Tagore (independent opening sentence). Sentence P states that he was awarded the Nobel Prize in 1913. Sentence R explains: 'This prestigious award (Nobel Prize) was conferred for Gitanjali', making PR a mandatory pair. Sentence S summarizes his historical significance. Thus, Q-P-R-S is the correct sequence."
    },
    {
      question: "Rearrange the sentences: [CG Vyapam Patwari Exam]\n(P) Consequently, vehicular movement on the national highway was paralyzed.\n(Q) Incessant heavy rainfall lashed the northern districts for three continuous days.\n(R) Bridges over several swelling rivers were submerged in floodwaters.\n(S) The administration deployed disaster response teams to rescue stranded travelers.",
      options: [
        "A) Q R P S",
        "B) P Q R S",
        "C) Q P R S",
        "D) R Q P S"
      ],
      correctAnswer: "A) Q R P S",
      explanation: "Sentence Q establishes the primary cause: incessant rainfall. Sentence R describes the immediate physical effect: bridges being submerged. Sentence P describes the consequence: highway paralysis ('Consequently...'). Sentence S describes the administrative rescue response. Hence, Q-R-P-S represents the perfect cause-effect chain."
    },
    {
      question: "Identify the correct sequence: [CG Vyapam Revenue Inspector (RI) Exam]\n(P) However, rapid urban growth is threatening this delicate ecosystem.\n(Q) The wetlands of Chhattisgarh are home to hundreds of species of migratory birds.\n(R) Urgent conservation measures are needed to preserve these natural habitats.\n(S) They provide essential feeding grounds during the harsh winter months.",
      options: [
        "A) Q S P R",
        "B) P Q R S",
        "C) Q P S R",
        "D) S Q P R"
      ],
      correctAnswer: "A) Q S P R",
      explanation: "Sentence Q introduces the wetlands and migratory birds. Sentence S uses the pronoun 'They' to explain their role as feeding grounds (QS mandatory pair). Sentence P introduces the contrast ('However, rapid urban growth...'). Sentence R provides the concluding remedy. Sequence is Q-S-P-R."
    },
    {
      question: "Which sentence CANNOT serve as the opening sentence of a paragraph? [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Renewable energy is crucial for combating global climate change.",
        "B) Consequently, the company suffered massive financial losses.",
        "C) Forests provide clean water and protect biodiversity.",
        "D) Agriculture remains the primary livelihood in rural Chhattisgarh."
      ],
      correctAnswer: "B) Consequently, the company suffered massive financial losses.",
      explanation: "Sentence B begins with the transition adverb 'Consequently', which denotes a result following an unstated prior cause. An opening sentence cannot begin with a resultative conjunction."
    },
    {
      question: "Rearrange the parts: [CG Vyapam Assistant Teacher Exam]\n(P) but also improves cardiovascular health\n(Q) regular physical exercise\n(R) not only reduces mental stress\n(S) and boosts overall stamina",
      options: [
        "A) Q R P S",
        "B) R Q P S",
        "C) Q P R S",
        "D) P Q R S"
      ],
      correctAnswer: "A) Q R P S",
      explanation: "Sentence Q provides the subject 'regular physical exercise'. Sentence R continues with the verb 'not only reduces mental stress'. Sentence P continues the correlative 'but also improves cardiovascular health'. Sentence S completes the predicate. Sequence: Q-R-P-S."
    },
    {
      question: "Rearrange the sentences: [CG Vyapam ADEO Exam]\n(P) Therefore, water harvesting has become mandatory for all new buildings.\n(Q) Groundwater levels in major urban centers have depleted alarmingly.\n(R) Borewells in many localities have dried up completely.\n(S) This crisis has created an acute drinking water shortage during summer.",
      options: [
        "A) Q R S P",
        "B) P Q R S",
        "C) Q P R S",
        "D) R S Q P"
      ],
      correctAnswer: "A) Q R S P",
      explanation: "Sentence Q introduces the problem: depletion of groundwater. Sentence R provides concrete evidence: borewells drying up. Sentence S describes the consequence ('This crisis...'). Sentence P offers the policy solution introduced by 'Therefore...'. The correct order is Q-R-S-P."
    }
  ],
  mcqs: [
    {
      question: "In a para jumble question, if sentence A mentions 'Dr. APJ Abdul Kalam' and sentence B mentions 'He wrote Wings of Fire', which rule applies?",
      options: [
        "A) Sentence B must precede Sentence A.",
        "B) Sentence A must precede Sentence B because nouns precede pronouns.",
        "C) Both sentences must be placed at the very end.",
        "D) Pronouns always come in the opening sentence."
      ],
      correctAnswer: "B) Sentence A must precede Sentence B because nouns precede pronouns.",
      explanation: "In standard English grammar, the full noun antecedent ('Dr. APJ Abdul Kalam') must be established before personal pronouns ('He') can refer back to it."
    },
    {
      question: "Rearrange the sentences:\n(P) For instance, Dokra bell-metal art has gained international acclaim.\n(Q) Chhattisgarh boasts a rich tradition of indigenous tribal handicrafts.\n(R) These traditional crafts provide sustainable livelihood to thousands of rural artisans.\n(S) The state government has set up craft emporiums to promote their marketing.",
      options: [
        "A) Q P R S",
        "B) P Q R S",
        "C) Q R P S",
        "D) R S Q P"
      ],
      correctAnswer: "A) Q P R S",
      explanation: "Sentence Q opens with the general topic: rich tradition of handicrafts. Sentence P provides a concrete example ('For instance, Dokra...'). Sentence R describes the livelihood benefits. Sentence S outlines marketing support. Sequence: Q-P-R-S."
    },
    {
      question: "Which of the following transition markers indicates that the sentence is likely the concluding sentence?",
      options: [
        "A) Initially",
        "B) First of all",
        "C) Ultimately",
        "D) Furthermore"
      ],
      correctAnswer: "C) Ultimately",
      explanation: "'Ultimately' (or 'In conclusion', 'Thus', 'Finally') signals the final resolution, consequence, or conclusion of an argument."
    },
    {
      question: "Rearrange the sentences:\n(P) He decided to dedicate his life to the service of the poor.\n(Q) Siddhartha was deeply moved by the sight of an old man, a sick man, and a corpse.\n(R) This realization led him to renounce his royal luxuries and palace.\n(S) Eventually, through deep meditation under the Bodhi tree, he attained enlightenment.",
      options: [
        "A) Q R P S",
        "B) P Q R S",
        "C) Q P R S",
        "D) S R Q P"
      ],
      correctAnswer: "A) Q R P S",
      explanation: "Sentence Q introduces Siddhartha witnessing the four sights. Sentence R states that 'This realization' caused his renunciation (QR pair). Sentence P describes his resolve to serve. Sentence S describes his eventual enlightenment. Sequence: Q-R-P-S."
    },
    {
      question: "What is the primary function of a 'Demonstrative Pronoun Link' (this/these) in Para Jumbles?",
      options: [
        "A) It signals the opening of a new unrelated topic.",
        "B) It connects a sentence directly to the concept explained in the immediately preceding sentence.",
        "C) It indicates a question tag.",
        "D) It shows that the sentence must be placed in parentheses."
      ],
      correctAnswer: "B) It connects a sentence directly to the concept explained in the immediately preceding sentence.",
      explanation: "Words like 'This policy' or 'These measures' must immediately follow the sentence that defined or described the policy or measures."
    },
    {
      question: "Rearrange the parts:\n(P) is essential for\n(Q) consistent daily revision\n(R) clearing competitive examinations\n(S) of grammar rules",
      options: [
        "A) Q S P R",
        "B) P Q R S",
        "C) Q P S R",
        "D) R S Q P"
      ],
      correctAnswer: "A) Q S P R",
      explanation: "'Consistent daily revision' (Q) + 'of grammar rules' (S) = Complete Subject. 'is essential for' (P) + 'clearing competitive examinations' (R) = Complete Predicate. Sequence: Q-S-P-R."
    },
    {
      question: "If option choices start with (A) RSQP, (B) PQRS, (C) RQSP, and (D) PRSQ, how many possible opening sentences exist?",
      options: [
        "A) Four",
        "B) Two (only P and R)",
        "C) Three",
        "D) One"
      ],
      correctAnswer: "B) Two (only P and R)",
      explanation: "The first letters of the options are only P and R. This immediately eliminates sentences Q and S from consideration as opening sentences."
    },
    {
      question: "Rearrange the sentences:\n(P) It prevents soil erosion and helps regulate atmospheric temperature.\n(Q) Afforestation is vital for maintaining ecological balance.\n(R) In addition, it provides a natural habitat for diverse wildlife species.\n(S) Governments across the world must therefore prioritize mass tree-plantation drives.",
      options: [
        "A) Q P R S",
        "B) P Q R S",
        "C) Q R P S",
        "D) S Q P R"
      ],
      correctAnswer: "A) Q P R S",
      explanation: "Sentence Q opens defining afforestation. Sentence P describes primary benefits ('It prevents...'). Sentence R adds secondary benefits ('In addition...'). Sentence S concludes with a policy recommendation ('...must therefore prioritize'). Sequence: Q-P-R-S."
    }
  ],
  keyTerminology: [
    {
      term: "Para Jumble",
      definition: "An objective verbal test where sentences of a paragraph are presented out of sequence, requiring candidates to reconstruct the original logical flow."
    },
    {
      term: "Mandatory Pair",
      definition: "Two sentences in a jumbled paragraph that must occur consecutively in exact order due to grammatical, chronological, or logical dependencies."
    },
    {
      term: "Antecedent Link",
      definition: "The syntactic connection where a pronoun in one sentence refers back to a specific noun introduced in a preceding sentence."
    },
    {
      term: "Discourse Marker",
      definition: "A transition word or phrase (e.g., however, consequently, moreover) that indicates how one sentence logically connects to another."
    },
    {
      term: "Chronological Sequence",
      definition: "Arranging events in the order of their occurrence in time (past -> intermediate -> present -> future)."
    },
    {
      term: "Syntactic Independence",
      definition: "The quality of an opening sentence being grammatically self-contained without needing prior explanatory sentences."
    },
    {
      term: "Option Elimination",
      definition: "The test-taking strategy of rejecting multiple-choice options that violate identified mandatory pairs or opening sentence constraints."
    },
    {
      term: "Cohesive Ties",
      definition: "Lexical and grammatical links (pronouns, conjunctions, repeated keywords) that bind independent sentences into a unified paragraph."
    }
  ],
  sources: [
    {
      title: "How to Prepare for Verbal Ability and Reading Comprehension",
      author: "Arun Sharma & Meenakshi Upadhyay",
      details: "Comprehensive chapters on Para Jumbles, mandatory pair identification, and elimination algorithms."
    },
    {
      title: "Objective General English",
      author: "S. P. Bakshi (Arihant Publications)",
      details: "Extensive drills on sentence rearrangement and PQRS patterns for competitive examinations."
    },
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Principles of coherent paragraph construction, sentence order, and discourse unity."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Official sentence rearrangement questions from Patwari, RI, Hostel Warden, and Teacher exams between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Reading Options Verbatim vs Finding Pairs",
      confusion: "Reading all 4 options completely, hoping one 'sounds' right.",
      clarity: "Never read all options one by one! Find the opening sentence, identify ONE mandatory pair (e.g., QR), and eliminate every option that doesn't have QR."
    },
    {
      concept: "Pronoun as Opening Sentence",
      confusion: "Choosing a sentence starting with 'He' or 'They' as the opening sentence.",
      clarity: "A sentence starting with a personal pronoun cannot open a paragraph unless the noun was introduced earlier. Find the sentence containing the full proper noun."
    },
    {
      concept: "However / Therefore at the Start",
      confusion: "Assuming a dramatic sentence starting with 'However' can begin a story.",
      clarity: "'However' is a contrast marker that requires a preceding statement to contrast with. It cannot be the opening sentence of a standard expository paragraph."
    },
    {
      concept: "Acronym vs Full Form Order",
      confusion: "Placing the short acronym before the expanded name.",
      clarity: "In standard English writing, the full organizational name must be introduced first (*'United Nations'*), followed later by its abbreviation (*'UN'*)."
    },
    {
      concept: "Ignoring the Ending Sentence",
      confusion: "Focusing solely on the beginning and neglecting how the paragraph concludes.",
      clarity: "The concluding sentence often contains conclusive words (*thus, therefore, ultimately*) or summarizes the passage; verifying it confirms your choice."
    }
  ],
  faqList: [
    {
      question: "What is the quickest way to solve a 4-sentence Para Jumble?",
      answer: "Look at the first letters of the options to see which sentences can be openers. Identify the true independent opening sentence (eliminating 2 options). Then spot a single mandatory pair (e.g., Noun-Pronoun or Cause-Effect) to eliminate the remaining wrong option."
    },
    {
      question: "What is an S1-PQRS-S6 question format?",
      answer: "In this format, Sentence 1 (S1) and Sentence 6 (S6) are fixed in their correct opening and closing positions. You are only required to rearrange the middle four sentences (P, Q, R, S) to connect S1 smoothly to S6."
    },
    {
      question: "Can an opening sentence ever begin with a time marker like 'In 1947'?",
      answer: "Yes, provided it is an independent historical statement (e.g., 'In 1947, India gained independence after centuries of colonial rule')."
    },
    {
      question: "How do demonstrative pronouns ('this', 'these') help in solving Para Jumbles?",
      answer: "Demonstrative pronouns always refer back to a concept mentioned in the immediately preceding sentence. For example, if Sentence R mentions 'rampant inflation' and Sentence P begins with 'This economic crisis...', RP is a mandatory pair."
    },
    {
      question: "How much time should an aspirant take to solve a Para Jumble in CG Vyapam?",
      answer: "Using the mandatory pair and option elimination protocol, a student should solve each Para Jumble question accurately in 30 to 45 seconds."
    }
  ],
  oneLinerRevision: [
    "Never read all options one by one: find the opening sentence and at least one mandatory pair.",
    "The opening sentence must be an independent proposition introducing the subject or proper noun.",
    "Sentences starting with 'However', 'Therefore', 'Moreover', or 'He' cannot open a paragraph.",
    "Noun antecedents must strictly precede their corresponding personal pronouns.",
    "Full organizational names must be introduced before their shortened acronyms or abbreviations.",
    "Cause-and-effect relationships form mandatory pairs: cause precedes effect.",
    "Demonstrative words ('this', 'these', 'such') connect directly to the concept in the preceding sentence.",
    "Chronological sequencing in biographies and history proceeds from past to present.",
    "Concluding sentences often begin with conclusive adverbs like 'Thus', 'Therefore', or 'Ultimately'.",
    "Option elimination is the fastest, most dependable strategy for 100% accuracy in Para Jumbles."
  ],
  rapidRevision: {
    points: [
      "Solving Protocol: 1. Inspect option opening letters; 2. Find independent opener; 3. Form mandatory pair; 4. Eliminate.",
      "Mandatory Pairs: Noun -> Pronoun; Full Name -> Acronym; Cause -> Effect; Problem -> Solution.",
      "Signposts: Opening (Initially); Continuing (Moreover, Furthermore); Contrasting (However); Concluding (Therefore).",
      "Demonstratives: 'This / These / Such' must immediately follow the noun they describe.",
      "Chronology: Arrange historical events in temporal order (past -> intermediate -> present)."
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
