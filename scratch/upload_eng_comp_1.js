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
  id: "cgv_master_eng_comp_1",
  topicId: "eng_comp_1",
  chapterId: "cgv_master_sub_6_ch_9",
  subjectId: "cgv_master_sub_6",
  title: "Passage Comprehension",
  subtitle: "Master Guide to Reading Comprehension, Skimming & Scanning, Tone Analysis & Vyapam Archives",
  overview: {
    introduction: "Reading Comprehension (RC) evaluates a candidate's cognitive capacity to read an unseen English passage, process its syntactical and semantic architecture, extract explicit factual details, deduce implicit underlying inferences, evaluate the author's tone and purpose, and determine contextual vocabulary meanings. In CG Vyapam examinations, reading comprehension passages typically consist of 200 to 450 words drawn from diverse domains such as Indian environmental conservation, socio-economic developments in Chhattisgarh, scientific innovations, cultural heritage, historical events, or ethical philosophical narratives. The passage is followed by 4 to 5 multiple-choice questions testing six distinct analytical capabilities: (1) Direct factual recall; (2) Inferential reasoning; (3) Main idea or central theme identification; (4) Most appropriate title; (5) Contextual vocabulary (synonyms and antonyms as used in the passage); and (6) The author's tone or attitude.",
    importance: "Passage Comprehension holds substantial weightage in all major CG Vyapam recruitment examinations, including Hostel Warden, Revenue Inspector (RI), Patwari, Sub Inspector (SI), ADEO, and Assistant Teacher exams. It serves as an integrated test of vocabulary, grammar, and critical reading speed. Candidates who master targeted comprehension techniques—such as the 'Questions-First' scan, skimming for gist, scanning for dates/proper nouns, and eliminating extreme distractors—can score 100% accuracy within minimal time.",
    examRelevance: "Key areas tested in CG Vyapam exams include: (1) Locating direct factual answers without succumbing to paraphrased traps; (2) Inferring conclusions that are logically necessitated by the text without introducing outside personal knowledge; (3) Answering vocabulary questions based on contextual usage rather than general dictionary definitions; (4) Recognizing tonal indicators (e.g., *critical, analytical, laudatory, satirical, objective, cautious*); (5) Identifying distractor options containing extreme qualifiers (*always, never, only, all*).",
    quickFacts: [
      { label: "Core Question Format", value: "Unseen prose passage (200-450 words) followed by 4 to 5 multiple-choice questions" },
      { label: "Golden Exam Technique", value: "The 'Questions-First' Approach: Read questions first to identify anchor keywords before reading the text" },
      { label: "Skimming vs Scanning", value: "Skimming = Rapid reading for central idea; Scanning = Targeted search for specific facts/dates/numbers" },
      { label: "Extreme Word Trap", value: "Options containing absolute words ('always', 'never', 'solely', 'completely') are rarely correct" },
      { label: "Contextual Vocabulary Law", value: "A word's meaning in RC must be judged strictly by its context in that specific paragraph" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Strategic 4-Step 'Questions-First' Comprehension Protocol",
      content: `### 1. Why the Traditional Method Fails in Competitive Exams
Many aspirants read the entire passage slowly from start to finish, read the questions, and then re-read the passage multiple times. This approach consumes excessive time and induces cognitive fatigue.

---

### 2. The 4-Step 'Questions-First' Method (Optimal Exam Strategy)
1. **Step 1: Rapid 30-Second Scan of the Questions (NOT the options)**:
   - Read only the question stems before touching the passage.
   - Underline or mentally note **Anchor Keywords** (e.g., *proper nouns, dates, scientific terms, causes of events*).
   - This programs your brain to act like a search radar while reading the passage.

2. **Step 2: Active Skimming of the Passage (1.5 to 2 minutes)**:
   - Read the passage at a brisk pace to grasp the **Macro-Structure**:
     - *Paragraph 1:* Introduces the core subject / problem.
     - *Paragraph 2 & 3:* Provides arguments, historical data, or contrasting viewpoints.
     - *Final Paragraph:* Offers conclusion, author's final verdict, or solution.
   - Pay special attention to the **first and last sentences** of each paragraph, where central topic ideas reside.

3. **Step 3: Targeted Scanning for Direct Factual Answers**:
   - When answering factual questions, scan directly for your anchor keywords.
   - Read the sentence containing the keyword plus one sentence before and after it to establish full context.

4. **Step 4: Careful Elimination of Distractor Options**:
   - Compare the candidate options against the exact textual evidence.
   - Beware of options that use words lifted directly from the text to state a distorted or reversed fact!`
    },
    {
      id: "ch_2",
      title: "Chapter 2: The Six Major RC Question Types Decoded",
      content: `### 1. Direct Factual Questions
- **Nature:** Asks for information explicitly stated in the passage (e.g., *'According to the passage, why did the project fail?'*).
- **Strategy:** Locate the exact sentence in the text; match the meaning (not just verbatim words) with the correct option.

---

### 2. Inferential (Deductive) Questions
- **Nature:** Asks for conclusions that are not explicitly stated, but are logically necessitated by the text (e.g., *'It can be inferred from the second paragraph that...'*).
- **Strategy:** Look for subtle implications, cause-and-effect relationships, and modal qualifiers.
- **Rule:** An inference must be 100% substantiated by the text. Never introduce outside general knowledge!

---

### 3. Main Idea / Central Theme Questions
- **Nature:** Asks for the primary message or overarching purpose of the passage (e.g., *'The central theme of the passage is...'*).
- **Strategy:** The correct answer must encompass the **entire passage**, not just a single supporting paragraph.
- **Elimination:** Discard options that are **too narrow** (focusing on one minor sub-point) or **too broad** (encompassing things outside the text).

---

### 4. Title of the Passage Questions
- **Nature:** Asks to select the most appropriate heading or title.
- **Criteria for a Good Title:**
  1. It must be directly connected to the central subject.
  2. It must reflect the author's primary focus.
  3. It must neither be overly restrictive nor sweeping and vague.

---

### 5. Contextual Vocabulary Questions
- **Nature:** Asks for the synonym or antonym of a word *'as used in the passage'* (e.g., *'In line 12, the word sound most nearly means...'*).
- **Strategy:** Substitute the candidate options back into the sentence to see which one makes coherent sense.
- **Rule:** Words often have multiple dictionary meanings. Do not pick the most common meaning; pick the meaning demanded by that specific context!

---

### 6. Author's Tone and Attitude Questions
- **Nature:** Evaluates the author's emotional disposition or perspective towards the subject (e.g., *'The author's attitude towards traditional farming is...'*).`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Decoding the Author's Tone, Style & Register",
      content: `### 1. What is Author's Tone?
Tone represents the author's voice, attitude, or mood toward the subject matter. It is identified by analyzing the **adjectives, adverbs, verbs, and rhetorical questions** the author employs.

---

### 2. High-Yield Tones Tested in Competitive Exams
1. **Objective / Neutral / Informative**:
   - The author presents facts, empirical data, historical events, or scientific explanations without personal bias, emotional language, or moral judgment.
   - *Clues:* Impartial third-person reportage; statistics; balanced presentation.
2. **Critical / Skeptical / Disapproving**:
   - The author challenges, questions, or points out flaws, deficiencies, and dangers in an institution, policy, or theory.
   - *Clues:* Words like *questionable, flawed, unconvincing, alarming, hazardous*.
3. **Laudatory / Eulogistic / Admiring**:
   - The author praises, glorifies, or expresses deep appreciation for an individual, cultural heritage, or achievement.
   - *Clues:* Words like *magnificent, exemplary, visionary, admirable, heroic*.
4. **Analytical**:
   - The author breaks down a complex problem into its component causes and effects, examining pros and cons systematically.
   - *Clues:* Phrases like *on one hand, conversely, root causes, secondary consequences*.
5. **Cynical / Pessimistic**:
   - The author distrusts human motives, believes people act purely out of self-interest, or predicts inevitable gloom and failure.
   - *Clues:* Words like *hopeless, inevitable decay, self-serving, futile*.
6. **Didactic / Moralizing**:
   - The author's primary intention is to teach a moral lesson, instruct in ethical conduct, or preach societal values.
   - *Clues:* Words like *ought to, should, moral duty, righteous conduct*.
7. **Satirical / Sarcastic**:
   - The author uses irony, ridicule, or mockery to expose folly, corruption, or hypocrisy.
   - *Clues:* Overstated praise masking ridicule; sharp ironic contrast.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: The Four Classic Trap Options & Distractor Elimination",
      content: `### 1. Trap Type 1: The Extreme Word Distractor (Absolute Generalization)
- Options containing words like **all, always, never, none, solely, completely, entirely, unquestionably** are almost always incorrect in standard competitive RC questions.
- Authors in academic and administrative texts typically qualify their arguments with measured words like *often, usually, some, many, tends to, appears to*.
  - *Text:* 'Many tribal communities rely on forest produce.'
  - *Trap Option:* 'All tribal families depend solely on forest produce.' (INCORRECT: Extreme words 'all' and 'solely').

---

### 2. Trap Type 2: Out of Scope / External Knowledge Trap
- An option that states a fact that is true in real life, but is **nowhere mentioned or supported in the passage**.
- *Golden Rule:* For the duration of reading comprehension, your universe is restricted strictly to the 300 words on the printed page. If the text does not state it, it is wrong!

---

### 3. Trap Type 3: The Verbatim Word Distortion (Half-Truth)
- Examiners frequently lift exact phrases from the passage into an option, but subtly reverse a relationship, change a cause, or swap an object.
- Hasty students see the familiar vocabulary and choose the option without noticing the altered meaning!

---

### 4. Trap Type 4: Too Narrow vs Too Broad Options
- In Main Idea or Title questions:
  - **Too Narrow:** An option that accurately reflects only one single paragraph or supporting example, but fails to cover the whole passage.
  - **Too Broad:** An option that expands the topic into sweeping global generalities far beyond the passage scope.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Model Vyapam-Level Passage & Complete Analytical Walkthrough",
      content: `### Model Examination Passage:
*'The unique cultural fabric of Bastar in southern Chhattisgarh is intrinsically intertwined with its indigenous ecology. For centuries, the tribal communities—primarily the Gond, Maria, and Muria—have developed a profound, symbiotic relationship with the sal and teak forests. Unlike modern industrial extraction which views nature as an expendable commodity, indigenous environmental philosophy treats the forest as a sacred, living entity governed by ancestral guardian deities. This worldview is brilliantly reflected in their indigenous crafts, notably Dhokra (lost-wax bell-metal casting) and iron craft. These artifacts are not merely decorative commodities manufactured for urban commerce; they are tactile manifestations of their spiritual reverence for flora and fauna.*

*However, this time-tested harmony faces unprecedented contemporary strains. Rapid urban industrialization, deforestation, and the commodification of tribal art by commercial middlemen have begun to sever the indigenous artisan from the sacred roots of his raw materials. When brass and beeswax are replaced by synthetic scrap and industrial alloys, the art risks losing its soul. To preserve this invaluable cultural heritage, policy interventions must not simply inject financial subsidies into urban showrooms; they must empower the forest-dwelling communities as sovereign custodians of their ancestral habitats. Only when the forest survives in its pristine sanctity will the Dhokra artisan truly thrive.'*

---

### Questions & Step-by-Step Strategic Analysis:

1. **According to the passage, how does indigenous environmental philosophy differ from modern industrial extraction?**
   - *A) It emphasizes large-scale cash crop cultivation.*
   - *B) It views nature as a sacred, living entity rather than an expendable commodity.*
   - *C) It completely rejects the use of all metals and wood.*
   - *D) It relies solely on government subsidies.*
   - *Analysis:* Direct factual question. Paragraph 1 explicitly states: *'Unlike modern industrial extraction which views nature as an expendable commodity, indigenous environmental philosophy treats the forest as a sacred, living entity'*. **Correct Answer: B**.

2. **The author's tone towards indigenous tribal craft and ecology can best be described as:**
   - *A) Cynical and dismissive*
   - *B) Highly appreciative and concerned*
   - *C) Sarcastic and ironic*
   - *D) Purely detached and statistical*
   - *Analysis:* The author praises the craft (*'brilliantly reflected', 'sacred roots'*) and shows deep concern about modern threats. **Correct Answer: B**.

3. **In the passage, the word 'symbiotic' most nearly means:**
   - *A) Parasitic and destructive*
   - *B) Mutually beneficial and cooperative*
   - *C) Unstable and fragile*
   - *D) Artificial and commercial*
   - *Analysis:* Contextual vocabulary. The relationship between tribal communities and forests is mutually sustaining. **Correct Answer: B**.

4. **Which of the following is the most suitable title for the passage?**
   - *A) Mineral Extraction in Modern India*
   - *B) Bastar: The Sacred Ecology of Tribal Art and Its Modern Dilemma*
   - *C) Commercial Marketing of Metal Alloys*
   - *D) The Disappearance of Indian Forests*
   - *Analysis:* The passage focuses specifically on Bastar's tribal art, its connection with forest ecology, and modern threats. **Correct Answer: B**.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "RC Question Typology: Objectives, Clues & Elimination Strategies",
      headers: ["Question Category", "Primary Objective", "Textual Scanning Clues", "Recommended Elimination Strategy"],
      rows: [
        ["Direct Factual", "Verify explicit textual detail", "Proper nouns, dates, technical terms", "Eliminate options with altered numbers or reversed causes."],
        ["Inferential", "Deduce unstated logical consequence", "Qualifiers, cause-and-effect transitions", "Eliminate options requiring unsupported external knowledge."],
        ["Main Theme", "Identify core message of entire text", "First & last sentences of all paragraphs", "Eliminate options that are too narrow (single sub-point) or too broad."],
        ["Appropriate Title", "Select overarching headline", "Central subject + primary thesis", "Eliminate overly sensationalized or restrictive options."],
        ["Contextual Vocab", "Define word in specific sentence", "Immediate sentence grammar and syntax", "Eliminate standard dictionary meanings that clash contextually."],
        ["Author's Tone", "Determine author's emotional perspective", "Adjectives, adverbs, stylistic contrast", "Eliminate extreme emotional tones if text is balanced."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Author's Tone Diagnostic Reference Matrix",
      headers: ["Tone Classification", "Author's Primary Mindset", "Key Vocabulary / Rhetorical Indicators", "Model Sentence Example"],
      rows: [
        ["Objective / Neutral", "Unbiased reportage of facts", "Presents data, statistics, verifiable facts", "The census recorded a 14% rise in population."],
        ["Critical / Skeptical", "Questioning, pointing out defects", "Flawed, untenable, dubious, questionable", "The assumptions of the policy remain deeply flawed."],
        ["Laudatory / Eulogistic", "Praising, admiring, honoring", "Exemplary, visionary, heroic, magnificent", "Her visionary leadership revitalized the cooperative movement."],
        ["Analytical", "Systematic breakdown of causes/effects", "Consequently, root causes, variables, factors", "To understand inflation, we must dissect supply bottlenecks."],
        ["Didactic", "Preaching or teaching moral duties", "Must, ought, ethical obligation, civic duty", "Every citizen must uphold the sacred duty of conservation."],
        ["Cynical", "Distrusting human integrity/motives", "Self-serving, hypocritical, futile, sham", "Political promises are mere ploys to garner gullible votes."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Skimming vs Scanning vs Close Reading Comparative Matrix",
      headers: ["Reading Technique", "Reading Speed", "Primary Cognitive Purpose", "When to Apply in Examination"],
      rows: [
        ["Skimming", "Very Rapid (300-400 wpm)", "Grasp general layout, tone, and main thesis", "Step 2: Initial read-through of passage."],
        ["Scanning", "Rapid Eye Movement", "Locate specific anchor words, dates, names", "Step 3: Searching for factual question targets."],
        ["Close Reading", "Moderate / Deliberate (150 wpm)", "Extract deep logical nuance and sentence syntax", "Step 4: Analyzing context around vocabulary/inferences."]
      ]
    }
  ],
  pyqs: [
    {
      question: "Read the excerpt: 'The Green Revolution undeniably increased agricultural productivity, but its excessive reliance on chemical fertilizers has degraded soil fertility in many regions.' What is the author's tone towards the Green Revolution? [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) Purely uncritical and celebratory",
        "B) Balanced and critical of its long-term ecological impact",
        "C) Completely dismissive of all its achievements",
        "D) Sarcastic and humorous"
      ],
      correctAnswer: "B) Balanced and critical of its long-term ecological impact",
      explanation: "The author acknowledges the achievement ('undeniably increased agricultural productivity') while critically pointing out the major environmental flaw ('excessive reliance on chemical fertilizers has degraded soil fertility'). This reflects a balanced and critical tone."
    },
    {
      question: "In reading comprehension, what is the best strategy for a vocabulary-in-context question? [CG Vyapam Patwari Exam]",
      options: [
        "A) Choose the most common dictionary definition without reading the passage.",
        "B) Substitute the candidate options into the specific sentence to verify contextual fit.",
        "C) Always select the longest and most complex word.",
        "D) Skip the question because vocabulary is subjective."
      ],
      correctAnswer: "B) Substitute the candidate options into the specific sentence to verify contextual fit.",
      explanation: "Words in English frequently possess multiple meanings. The only dependable technique is substituting candidate options directly into the sentence in which the target word appears to determine which word preserves coherent grammatical and contextual sense."
    },
    {
      question: "Read the sentence: 'Unlike ephemeral fashion fads that vanish within weeks, classical folk traditions endure across generations.' In this context, 'ephemeral' means: [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) Permanent and eternal",
        "B) Short-lived and fleeting",
        "C) Very expensive",
        "D) Traditional and ancient"
      ],
      correctAnswer: "B) Short-lived and fleeting",
      explanation: "The contrast word 'Unlike' sets up an opposition between 'ephemeral fashion fads that vanish within weeks' and 'classical folk traditions that endure across generations'. Therefore, 'ephemeral' contextually means short-lived, transient, or fleeting."
    },
    {
      question: "Which of the following is an 'extreme word distractor' to be avoided in main idea questions? [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Some communities tend to adopt modern methods.",
        "B) All traditional artisans have completely abandoned their ancestral crafts.",
        "C) Many factors contribute to deforestation.",
        "D) Economic policies often influence employment."
      ],
      correctAnswer: "B) All traditional artisans have completely abandoned their ancestral crafts.",
      explanation: "Option B contains absolute extreme words ('All' and 'completely') making a sweeping, unverifiable generalization. In standard academic passages, such extreme claims are almost invariably incorrect distractors."
    },
    {
      question: "What is the primary objective of 'scanning' a comprehension passage? [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) To understand the deep philosophical meaning of the text",
        "B) To quickly locate specific factual keywords, numbers, or proper nouns",
        "C) To evaluate the grammatical correctness of the author's style",
        "D) To memorize every sentence in the passage"
      ],
      correctAnswer: "B) To quickly locate specific factual keywords, numbers, or proper nouns",
      explanation: "Scanning is a targeted reading technique where the reader rapidly moves their eyes across the page to locate specific pieces of information, such as dates, names, or key terms, without reading every word."
    },
    {
      question: "When a passage author's primary intent is to provide guidance on moral virtues and societal ethics, the tone is classified as: [CG Vyapam ADEO Exam]",
      options: [
        "A) Didactic",
        "B) Satirical",
        "C) Cynical",
        "D) Objective"
      ],
      correctAnswer: "A) Didactic",
      explanation: "A 'Didactic' tone is one intended to instruct, lecture, or teach moral lessons and ethical principles."
    }
  ],
  mcqs: [
    {
      question: "The 'Questions-First' technique in reading comprehension recommends:",
      options: [
        "A) Reading all answer options before reading the text.",
        "B) Skimming question stems to identify anchor keywords before reading the text.",
        "C) Guessing answers without referring to the passage.",
        "D) Reading only the last paragraph of the passage."
      ],
      correctAnswer: "B) Skimming question stems to identify anchor keywords before reading the text.",
      explanation: "Scanning question stems allows candidates to identify anchor keywords, establishing a clear mental target while reading the passage."
    },
    {
      question: "An option in a reading comprehension test that is factually true in the real world but not mentioned in the passage is:",
      options: [
        "A) The correct answer",
        "B) An Out-of-Scope distractor",
        "C) An implicit inference",
        "D) The main theme"
      ],
      correctAnswer: "B) An Out-of-Scope distractor",
      explanation: "In reading comprehension, all answers must be derived strictly from the passage text. External real-world facts not supported by the passage are 'Out-of-Scope' distractors."
    },
    {
      question: "Read the excerpt: 'The collector was renowned for his probity and fair decisions.' The word 'probity' most nearly means:",
      options: [
        "A) Harshness",
        "B) Integrity and honesty",
        "C) Wealth",
        "D) Tardiness"
      ],
      correctAnswer: "B) Integrity and honesty",
      explanation: "Paired with 'fair decisions', 'probity' contextually denotes moral integrity, uprightness, and honesty."
    },
    {
      question: "A good title for a reading comprehension passage must be:",
      options: [
        "A) Long, detailed, and containing full sentences",
        "B) Catchy, relevant, and covering the overarching central theme",
        "C) Focused exclusively on an example from the first paragraph",
        "D) A sweeping generalization about world history"
      ],
      correctAnswer: "B) Catchy, relevant, and covering the overarching central theme",
      explanation: "A title must accurately summarize the main thesis while remaining concise and representative of the entire passage."
    },
    {
      question: "When an author describes a politician's lofty promises as 'a spectacular feast of empty words', the tone is:",
      options: [
        "A) Eulogistic",
        "B) Sarcastic / Ironic",
        "C) Objective",
        "D) Didactic"
      ],
      correctAnswer: "B) Sarcastic / Ironic",
      explanation: "Using paradoxical, mocking phrasing ('spectacular feast of empty words') to expose insincerity is a hallmark of a sarcastic or satirical tone."
    },
    {
      question: "An inference in reading comprehension is defined as:",
      options: [
        "A) An explicit fact stated word-for-word in the text",
        "B) A logical deduction derived from textual evidence without being explicitly stated",
        "C) A personal opinion formed by the candidate",
        "D) A summary of the first paragraph"
      ],
      correctAnswer: "B) A logical deduction derived from textual evidence without being explicitly stated",
      explanation: "An inference is a logical conclusion derived from premises established in the text, even though it is not stated verbatim."
    },
    {
      question: "Where are the central thesis statements most commonly located in standard prose passages?",
      options: [
        "A) Randomly in the middle of sentences",
        "B) In the opening sentences of the first paragraph and closing sentences of the final paragraph",
        "C) Only in footnotes",
        "D) Exclusively in the second paragraph"
      ],
      correctAnswer: "B) In the opening sentences of the first paragraph and closing sentences of the final paragraph",
      explanation: "Classical expository writing presents the primary topic in the introduction and reinforces it with a synthesis in the conclusion."
    },
    {
      question: "If an option accurately describes only paragraph 2 of a 4-paragraph passage, it is:",
      options: [
        "A) Too Broad",
        "B) Too Narrow",
        "C) The Central Theme",
        "D) An Extreme Generalization"
      ],
      correctAnswer: "B) Too Narrow",
      explanation: "An option that captures only a local sub-point rather than the entire passage is 'Too Narrow' and cannot be the main idea."
    }
  ],
  keyTerminology: [
    {
      term: "Reading Comprehension",
      definition: "The cognitive process of simultaneously extracting and constructing meaning through interaction and involvement with written text."
    },
    {
      term: "Skimming",
      definition: "A rapid reading technique employed to identify the main ideas and overall structure of a text quickly."
    },
    {
      term: "Scanning",
      definition: "A targeted reading technique where the eyes move rapidly across a text to locate specific information, names, or keywords."
    },
    {
      term: "Inference",
      definition: "A conclusion reached on the basis of evidence and reasoning provided in the text, rather than from explicit statement."
    },
    {
      term: "Author's Tone",
      definition: "The writer's attitude toward the subject matter, expressed through word choice, sentence structure, and rhetorical devices."
    },
    {
      term: "Macro-Structure",
      definition: "The overarching organizational layout of a passage (introduction, problem exposition, evidence, counter-arguments, conclusion)."
    },
    {
      term: "Anchor Keyword",
      definition: "A distinctive word (proper noun, date, technical term) from a question stem used to locate the relevant target sentence in the passage."
    },
    {
      term: "Contextual Vocabulary",
      definition: "Determining the precise meaning of a word based on its unique syntactic and semantic relationship with surrounding sentences."
    }
  ],
  sources: [
    {
      title: "How to Read a Book",
      author: "Mortimer J. Adler & Charles Van Doren",
      details: "Analytical reading methodologies, levels of reading, and techniques for syntopical understanding."
    },
    {
      title: "Word Power Made Easy",
      author: "Norman Lewis",
      details: "Chapters on expanding reading speed, contextual deduction, and eliminating verbal traps."
    },
    {
      title: "Proficiency in Reading Comprehension",
      author: "Ajay Singh (Arihant Publications)",
      details: "Taxonomy of RC question formats, distractor elimination methods, and civil service passage drills."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Compilation of reading comprehension passages and questions from Vyapam recruitment exams between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Real-World Fact vs Textual Evidence",
      confusion: "Choosing an option because it is scientifically or historically true in real life, even though the passage never mentioned it.",
      clarity: "In reading comprehension, the text is the sole authority. If a statement is true in reality but absent from the text, it is an Out-of-Scope trap! Select only what is verified by the text."
    },
    {
      concept: "Skimming vs Scanning",
      confusion: "Treating skimming and scanning as the same activity.",
      clarity: "**Skimming** is reading quickly to get the **overall gist/main idea**. **Scanning** is searching for a **specific keyword, date, or name** without reading the rest."
    },
    {
      concept: "Main Theme vs Sub-Point",
      confusion: "Selecting an option as the main idea because it is mentioned prominently in paragraph 2.",
      clarity: "A true Main Theme must summarize the **entire passage**. If an option describes only one paragraph, it is 'Too Narrow' and should be eliminated."
    },
    {
      concept: "Extreme Words in Options",
      confusion: "Believing that definitive options with 'always' or 'all' show strong academic confidence.",
      clarity: "Academic authors qualify statements with words like 'many', 'often', and 'tends to'. Options containing 'all', 'never', 'solely', or 'completely' are almost always incorrect distractors."
    },
    {
      concept: "Dictionary Meaning vs Contextual Meaning",
      confusion: "Selecting the most common dictionary definition of a vocabulary word.",
      clarity: "Always substitute the options into the passage sentence. Words like 'sound', 'light', and 'tender' have multiple meanings; only the context determines the correct synonym."
    }
  ],
  faqList: [
    {
      question: "Should I read the passage first or the questions first?",
      answer: "The 'Questions-First' scan (reading the question stems to identify anchor keywords for 30-45 seconds) is far superior in competitive exams. It directs your focus while reading the text, dramatically cutting down the time spent re-reading paragraphs."
    },
    {
      question: "How do I identify the author's tone if there are no obvious emotional words?",
      answer: "If the passage consists purely of factual reporting, empirical statistics, and balanced exposition without approving or disapproving adjectives, the tone is 'Objective', 'Neutral', or 'Informative'."
    },
    {
      question: "What should I do if two options seem equally plausible?",
      answer: "Reread the exact target sentence in the passage. Check for qualifying words: does the passage say 'often' (making an option with 'always' wrong), or does one option introduce an external assumption not stated in the text?"
    },
    {
      question: "How can I improve my reading speed without losing comprehension?",
      answer: "Practice 'chunking' (reading groups of 3 to 4 words together rather than word-by-word) and eliminate subvocalization (pronouncing words in your head). Daily reading of editorial columns helps condition rapid comprehension."
    },
    {
      question: "How many questions on Reading Comprehension appear in CG Vyapam?",
      answer: "Typically, one unseen comprehension passage is followed by 4 to 5 multiple-choice questions in exams like Hostel Warden, Patwari, Sub Inspector, and Assistant Teacher."
    }
  ],
  oneLinerRevision: [
    "Read question stems first to identify anchor keywords before diving into the passage.",
    "The text is your sole universe: never choose an option based on unmentioned outside knowledge.",
    "Eliminate extreme options containing words like 'always', 'never', 'solely', and 'completely'.",
    "Skimming captures the general layout; scanning pinpoints specific names, numbers, and dates.",
    "Vocabulary-in-context questions must be verified by substituting options into the passage sentence.",
    "A Main Idea option must cover the whole passage, not merely a single sub-paragraph.",
    "An Objective tone presents facts and statistics without emotional bias or moralizing commentary.",
    "A Didactic tone aims to teach a moral lesson or preach ethical duties.",
    "Verbatim word traps use exact passage phrasing to state a distorted or reversed relationship.",
    "Pay special attention to the first and last sentences of each paragraph for topic sentences."
  ],
  rapidRevision: {
    points: [
      "Protocol: Questions Scan -> Active Skim -> Keyword Scan -> Option Elimination.",
      "Question Types: Factual (explicit), Inferential (logical deduction), Main Idea (macro-scope), Title, Vocab, Tone.",
      "Tones: Objective (neutral data), Critical (finding fault), Laudatory (praising), Analytical (pros/cons), Didactic (moralizing).",
      "Traps: Extreme words (all/never), Out-of-scope (external facts), Half-truths (verbatim distortion), Too narrow.",
      "Vocab Rule: Context rules supreme; substitute candidate options into the sentence."
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
