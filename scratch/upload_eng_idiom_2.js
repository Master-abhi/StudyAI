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
  id: "cgv_master_eng_idiom_2",
  topicId: "eng_idiom_2",
  chapterId: "cgv_master_sub_6_ch_7",
  subjectId: "cgv_master_sub_6",
  title: "Phrases",
  subtitle: "Comprehensive Notes on Phrase Types, Prepositional Phrases & Foreign Administrative Phrases for CG Vyapam",
  overview: {
    introduction: "A Phrase is a group of two or more grammatically linked words that acts as a unified conceptual element within a sentence, but does NOT contain both a subject and a finite predicate (verb). Because it lacks a finite verb, a phrase cannot express a complete proposition or stand alone as an independent sentence. Phrases are classified according to their headword or grammatical function into eight primary categories: (1) Noun Phrase; (2) Prepositional Phrase; (3) Adjective Phrase; (4) Adverb Phrase; (5) Participial Phrase; (6) Gerund Phrase; (7) Infinitive Phrase; and (8) Absolute Phrase. In competitive exams, candidates are evaluated on their command of idiomatic prepositional phrases (e.g., 'in spite of', 'with a view to', 'by dint of', 'in lieu of') and Latin/foreign phrases commonly utilized in administrative, legal, and official communications (e.g., 'status quo', 'prima facie', 'de facto', 'bona fide').",
    importance: "Phrases are a fundamental testing area across all CG Vyapam recruitment examinations, including Hostel Warden, Revenue Inspector (RI), Patwari, Sub Inspector, ADEO, Assistant Teacher, and Secretariat Clerk exams. Questions evaluate candidate proficiency in selecting correct prepositional linkers, spotting errors involving dangling participles, identifying phrase types in sentence analysis, and understanding formal administrative terms.",
    examRelevance: "Key testing dimensions in CG Vyapam exams include: (1) Fixed prepositional phrase structures (e.g., *in spite of* vs *despite*, *on account of*, *by virtue of*); (2) Phrases ending in prepositions requiring a gerund (*with a view to + V-ing*, *prone to + V-ing*); (3) Differentiating between phrases and clauses; (4) Spotting dangling/unattached participles; (5) Latin administrative legal phrases frequently appearing in official notification passages and vocabulary items.",
    quickFacts: [
      { label: "Core Definition", value: "A group of related words lacking a subject-verb combination that functions as a single part of speech" },
      { label: "Phrase vs Clause", value: "A phrase contains NO finite verb; a clause ALWAYS contains a subject and a finite verb" },
      { label: "High-Frequency Rule", value: "'With a view to' and 'Looking forward to' are strictly followed by a Gerund (V-ing), never base V1" },
      { label: "Despite vs In spite of", value: "Write 'Despite' (WITHOUT of) OR 'In spite of' (WITH of); 'Despite of' is an outright exam blunder" },
      { label: "Top Foreign Phrases", value: "Prima facie (at first sight), Status quo (existing state), De facto (in reality/actual), Bona fide (in good faith)" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Nature of Phrases & Phrase vs Clause Differentiation",
      content: `### 1. What is a Phrase?
A phrase is a cluster of words functioning as a single unit in syntax, lacking a subject and a finite verb:
- *Phrase:* **in the morning**, **with great enthusiasm**, **having finished dinner**, **to become a collector**.
- None of these express a complete thought on their own.

---

### 2. Phrase vs Clause vs Sentence (The Foundational Matrix)
1. **Phrase**:
   - Has no Subject + Finite Verb combination.
   - Cannot stand alone.
   - Functions as a single part of speech (noun, adjective, adverb).
   - *Example:* **Under the ancient banyan tree**.
2. **Clause**:
   - Contains BOTH a Subject and a Finite Verb.
   - Can be Independent (stands alone) or Dependent (subordinate).
   - *Example:* **While the students were studying in the library**.
3. **Sentence**:
   - Contains at least one independent clause expressing a complete, standalone thought.
   - *Example:* The students were studying in the library under the ancient banyan tree.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: The Eight Core Types of Phrases in English Grammar",
      content: `### 1. Noun Phrase (NP)
- A phrase that includes a noun or pronoun as its headword, along with all its modifiers, functioning as a subject, object, or complement:
  - *As Subject:* **The young civil engineer from Bilaspur** won the design award.
  - *As Object:* She bought **a stunning handmade Bastar bell-metal artifact**.

---

### 2. Prepositional Phrase (PP)
- Begins with a preposition and ends with a noun, pronoun, or noun phrase (the object of the preposition).
- Functions either as an **Adjective Phrase** (modifying a noun) or an **Adverb Phrase** (modifying a verb):
  - *Adjectival function:* The book **on the top shelf** belongs to the library. (Describes noun 'book').
  - *Adverbial function:* He solved the entire question paper **with remarkable ease**. (Modifies verb 'solved').

---

### 3. Adjective Phrase & Adverb Phrase
- **Adjective Phrase**: A group of words headed by an adjective or a prepositional phrase modifying a noun.
  - *Example:* A lady **of great noble character** addressed the assembly.
- **Adverb Phrase**: A group of words performing the work of an adverb, answering *When? Where? How?* or *Why?*.
  - *Example:* The security personnel stood guard **at the main entrance** (Place) **throughout the night** (Time).

---

### 4. Verbal Phrases (Participial, Gerund & Infinitive Phrases)
1. **Participial Phrase**:
   - Begins with a Present Participle (V-ing) or Past Participle (V3) and functions as an **adjective** modifying a noun:
   - *Example:* **Having passed the preliminary examination**, the candidates prepared for the mains.
   - *Example:* The car **damaged in the accident** was towed away.
2. **Gerund Phrase**:
   - Begins with a Gerund (V-ing) and functions strictly as a **noun** (subject or object):
   - *Example:* **Reading historical biographies** is his favorite pastime. (Subject of 'is').
3. **Infinitive Phrase**:
   - Begins with 'to + V1' plus its objects/modifiers, functioning as a noun, adjective, or adverb:
   - *Example:* He worked overtime **to support his younger brother's education**. (Adverb of purpose).

---

### 5. Absolute Phrase
- A phrase consisting of a noun or pronoun followed by a participle, grammatically independent from the main clause:
  - *Example:* **The sun having risen**, the dense fog dissipated over the plains.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: High-Yield Prepositional Phrases Bank for CG Vyapam",
      content: `### 1. Essential Prepositional Phrases in Examinations
1. **In spite of**: Regardless of; notwithstanding. (MUST take 'of').
   - *Example:* **In spite of** heavy rain, the candidates reached the examination hall on time.
   - *Crucial Rule:* **Despite = In spite of**. Never write *'Despite of'*!
2. **On account of**: Because of; owing to; due to.
   - *Example:* The educational institutions were closed **on account of** a severe cold wave.
3. **By dint of**: By means of; through the force or effort of.
   - *Example:* He rose to the rank of Deputy Collector **by dint of** sheer hard work and perseverance.
4. **In lieu of**: In place of; as an alternative or substitute for.
   - *Example:* The government offered residential plots **in lieu of** cash compensation to project-affected families.
5. **By virtue of**: Because of; by reason of one's official position, authority, or merits.
   - *Example:* **By virtue of** his office, the Governor is the Chancellor of state universities.
6. **On the verge of / On the brink of**: At the point where something significant or dangerous is about to happen.
   - *Example:* The critically endangered bird species is **on the brink of** extinction.
7. **At the behest of**: At the order, request, or urgent command of someone in authority.
   - *Example:* An administrative inquiry was instituted **at the behest of** the Chief Minister.
8. **In accordance with**: In agreement, conformity, or compliance with a rule, law, or directive.
   - *Example:* The recruitment process was conducted strictly **in accordance with** state service rules.
9. **On behalf of**: In the interests of; as the representative or agent of someone.
   - *Example:* The lawyer signed the settlement papers **on behalf of** his client.
10. **In the light of**: Taking into account; considering recent information or circumstances.
    - *Example:* Rules were amended **in the light of** the High Court judgment.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Special Verbal Phrases & The Dangling Participle Trap",
      content: `### 1. Phrases Followed by Gerund (V-ing)
In standard English, the particle 'to' is usually followed by a base verb (infinitive V1). However, in specific idiomatic prepositional phrases, **'to' is a true preposition**, and therefore MUST be followed by a **Gerund (V-ing)**:

#### High-Yield 'Prepositional To + V-ing' Phrases:
- **With a view to + V-ing**: (Intention or purpose).
  - *Correct:* He went to Delhi **with a view to preparing** for the UPSC exam.
  - *Incorrect:* He went to Delhi with a view to prepare...
- **Look forward to + V-ing**: (Eager anticipation).
  - *Correct:* We **look forward to meeting** our new Director.
- **Accustomed to / Used to + V-ing**: (Habituated).
  - *Correct:* He is **accustomed to waking up** early.
- **Prone to / Averse to + V-ing**: (Tendency or dislike).
  - *Correct:* She is strongly **averse to taking** unnecessary financial risks.
- **In addition to + V-ing**: (Besides).
  - *Correct:* **In addition to managing** the school, he writes textbooks.

---

### 2. The Dangling (Unattached) Participle Error
A participial phrase modifying a noun must be logically and grammatically attached to the correct subject. When the intended subject is omitted, the phrase 'dangles' errantly onto the nearest noun:

#### Classic Exam Traps:
- *Error:* **Walking along the forest trail, a poisonous snake bit him.**
  - *Literal absurdity:* The sentence grammatically states that the *snake* was walking along the forest trail!
  - *Correction:* **While he was walking along the forest trail, a poisonous snake bit him.**
- *Error:* **Being a stormy night, I could not go out.**
  - *Literal absurdity:* 'I' was not a stormy night!
  - *Correction:* **It being a stormy night, I could not go out.**
- *Error:* **Entering the library, the books looked fascinating.**
  - *Correction:* **When I entered the library, the books looked fascinating.**`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Foreign & Latin Phrases in Official Administrative English",
      content: `### 1. Latin & French Phrases Used in Government & Law
Government notifications, court rulings, and competitive comprehension passages frequently employ foreign loan phrases:

1. **Ad hoc** *(Latin)*: Formed, arranged, or created for a particular purpose or task only; temporary.
   - *Example:* An **ad hoc** committee was constituted to investigate the pipeline leak.
2. **De facto** *(Latin)*: Existing in actual fact or reality, whether legally recognized or not.
   - *Example:* The Prime Minister is the **de facto** executive head of the Indian government.
3. **De jure** *(Latin)*: According to rightful entitlement or established law; legal.
   - *Example:* The President of India is the **de jure** constitutional head of state.
4. **Status quo** *(Latin)*: The existing state of affairs, especially regarding social or political issues.
   - *Example:* The Supreme Court ordered both parties to maintain the **status quo** on the disputed land.
5. **Prima facie** *(Latin)*: Based on first impression; accepted as correct until proven otherwise; at first sight.
   - *Example:* There is **prima facie** evidence of financial embezzlement against the cashier.
6. **Bona fide** *(Latin)*: Genuine, real, or undertaken in good faith without fraud or deceit.
   - *Example:* Only **bona fide** residents of Chhattisgarh are eligible for local quota benefits.
7. **Mala fide** *(Latin)*: In bad faith; with intent to deceive or commit fraud.
   - *Example:* The cancellation was challenged on the grounds of **mala fide** administrative intent.
8. **Modus operandi** *(Latin)*: A particular method or characteristic way of operating or committing a crime.
   - *Example:* The police identified the burglar by his distinctive **modus operandi**.
9. **Vis-a-vis** *(French)*: In relation to; compared with; face-to-face.
   - *Example:* We must evaluate our state's revenue growth **vis-a-vis** the national average.
10. **Pro rata** *(Latin)*: Proportional; allocated in proportion to an established rate or share.
    - *Example:* The dividend was distributed to shareholders on a **pro rata** basis.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master High-Frequency Prepositional Phrases Matrix for CG Vyapam",
      headers: ["Prepositional Phrase", "Core Grammatical Meaning", "Common Exam Misuse Trap", "Correct Model Sentence"],
      rows: [
        ["In spite of", "Notwithstanding, despite", "Writing 'Despite of' (INCORRECT)", "In spite of his poverty, he educated his children."],
        ["With a view to", "With the purpose/aim of", "Using V1 instead of V-ing", "He visited Raipur with a view to buying a tractor."],
        ["By dint of", "By means of, through force of", "Confusing with 'in dint of'", "He won the gold medal by dint of hard practice."],
        ["In lieu of", "Instead of, in substitution for", "Confusing with 'in view of'", "Cash was granted in lieu of government quarters."],
        ["By virtue of", "On the grounds of authority", "Dropping 'of'", "By virtue of his rank, he presided over the meeting."],
        ["On behalf of", "As the representative of", "Writing 'in behalf of'", "She received the award on behalf of her deceased father."],
        ["In accordance with", "In conformity/compliance with", "Writing 'in accordance to'", "The tender was awarded in accordance with rules."],
        ["On the verge of", "At the very brink or edge of", "Writing 'on the verge to'", "The negotiations were on the verge of breakdown."]
      ]
    },
    {
      tableId: "tab_2",
      title: "The Eight Core Phrase Types Diagnostic Matrix",
      headers: ["Phrase Type", "Primary Structural Feature", "Syntactic Function in Sentence", "Diagnostic Example"],
      rows: [
        ["Noun Phrase", "Headed by a noun/pronoun + modifiers", "Subject, Object, or Complement", "The clever young boy solved the riddle."],
        ["Prepositional Phrase", "Preposition + Object of preposition", "Acts as an Adjective or Adverb", "The temple on the mountain peak is sacred."],
        ["Adjective Phrase", "Cluster modifying a noun/pronoun", "Qualifies an antecedent noun", "He is a statesman of rare wisdom."],
        ["Adverb Phrase", "Cluster answering When/Where/How", "Modifies a verb, adjective, adverb", "She answered all questions in a polite tone."],
        ["Participial Phrase", "Starts with participle (V-ing / V3)", "Functions as an Adjective", "Barking loudly, the dog chased the intruder."],
        ["Gerund Phrase", "Starts with gerund (V-ing)", "Functions as a Noun", "Swimming across the river is perilous."],
        ["Infinitive Phrase", "Starts with 'to + V1'", "Functions as Noun, Adj, or Adverb", "His ambition is to serve the nation."],
        ["Absolute Phrase", "Noun + participle (grammatically free)", "Modifies the entire clause", "Weather permitting, the flight will depart."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Foreign Administrative & Legal Phrases Reference Matrix",
      headers: ["Foreign Phrase", "Language of Origin", "Literal / Technical Definition", "Administrative Sentence Example"],
      rows: [
        ["Prima facie", "Latin", "At first sight / Based on first impression", "The magistrate found a prima facie case against the accused."],
        ["Status quo", "Latin", "The existing, unchanged state of affairs", "The high court ordered the parties to maintain the status quo."],
        ["De facto", "Latin", "In actual practice or reality (regardless of law)", "General Ne Win was the de facto ruler of the country."],
        ["De jure", "Latin", "According to established law / rightful by law", "The Queen remains the de jure sovereign head of state."],
        ["Bona fide", "Latin", "In good faith / genuine and authentic", "Only bona fide candidates were permitted into the hall."],
        ["Ad hoc", "Latin", "For a specific immediate purpose only; temporary", "An ad hoc committee was appointed to draft the syllabus."],
        ["Vis-a-vis", "French", "In relation to / compared with / face-to-face", "Consider our budget allocation vis-a-vis neighboring states."],
        ["Modus operandi", "Latin", "A characteristic method or manner of working", "The gang's modus operandi involved falsifying land deeds."]
      ]
    }
  ],
  pyqs: [
    {
      question: "Fill in the blank with the appropriate phrase: '________ heavy rain, the students attended the parade.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) Despite of",
        "B) In spite of",
        "C) In spite",
        "D) Despite to"
      ],
      correctAnswer: "B) In spite of",
      explanation: "'In spite of' is the correct three-word prepositional phrase meaning notwithstanding or regardless of. 'Despite' does not take 'of'. Option A ('Despite of') is a classic grammatical error."
    },
    {
      question: "Choose the correct phrase: 'He visited Raipur with a view to ________ a residential plot.' [CG Vyapam Patwari Exam]",
      options: [
        "A) buy",
        "B) buying",
        "C) bought",
        "D) have bought"
      ],
      correctAnswer: "B) buying",
      explanation: "In the idiomatic prepositional phrase 'with a view to', 'to' is a true preposition. In English grammar, prepositions are strictly followed by a gerund (V-ing), NOT an infinitive. Hence, 'buying' is the only correct form."
    },
    {
      question: "What is the meaning of the Latin phrase 'PRIMA FACIE'? [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) By the law",
        "B) At first sight / On the face of it",
        "C) In bad faith",
        "D) For the time being"
      ],
      correctAnswer: "B) At first sight / On the face of it",
      explanation: "'Prima facie' is a Latin legal phrase meaning 'at first sight' or 'based on the first impression', accepted as correct until proven otherwise."
    },
    {
      question: "Identify the underlined phrase type in: 'The boy [with curly hair] is my brother.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Noun Phrase",
        "B) Adjective Phrase",
        "C) Adverb Phrase",
        "D) Absolute Phrase"
      ],
      correctAnswer: "B) Adjective Phrase",
      explanation: "The prepositional phrase 'with curly hair' directly qualifies and describes the noun 'boy'. A phrase that performs the work of an adjective by describing a noun is an Adjective Phrase."
    },
    {
      question: "What does the phrase 'STATUS QUO' mean? [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) High social status",
        "B) The existing state of affairs",
        "C) A changing situation",
        "D) A legal notice"
      ],
      correctAnswer: "B) The existing state of affairs",
      explanation: "'Status quo' is a Latin phrase meaning the state of affairs that existed previously or exists currently, especially in political or territorial matters."
    },
    {
      question: "Select the sentence free from dangling participle error: [CG Vyapam ADEO Exam]",
      options: [
        "A) Walking along the road, a speeding truck hit him.",
        "B) While he was walking along the road, a speeding truck hit him.",
        "C) Being a rainy day, he stayed at home.",
        "D) Having eaten his dinner, the movie was watched."
      ],
      correctAnswer: "B) While he was walking along the road, a speeding truck hit him.",
      explanation: "In Option A, the participial phrase 'Walking along the road' erroneously attaches to 'truck' (as if the truck were walking). Option B correctly provides a full subordinate clause ('While he was walking'), eliminating the dangling participle."
    }
  ],
  mcqs: [
    {
      question: "He succeeded in securing the top rank ________ sheer hard work and determination.",
      options: [
        "A) by dint of",
        "B) on dint of",
        "C) in dint of",
        "D) with dint of"
      ],
      correctAnswer: "A) by dint of",
      explanation: "The fixed idiomatic prepositional phrase is 'by dint of', meaning 'by means of' or 'through the force of'."
    },
    {
      question: "The company gave the employee extra shares ________ cash bonus.",
      options: [
        "A) in lieu of",
        "B) in view of",
        "C) by virtue of",
        "D) on account of"
      ],
      correctAnswer: "A) in lieu of",
      explanation: "'In lieu of' is a prepositional phrase meaning 'in place of' or 'as a substitute for'."
    },
    {
      question: "What is the meaning of 'DE FACTO'?",
      options: [
        "A) By legal right",
        "B) In actual fact or reality",
        "C) According to decree",
        "D) Without any purpose"
      ],
      correctAnswer: "B) In actual fact or reality",
      explanation: "'De facto' describes practices or states of affairs that exist in reality, whether or not officially ordained by law."
    },
    {
      question: "Identify the Gerund Phrase in: 'Collecting rare postage stamps requires patience.'",
      options: [
        "A) requires patience",
        "B) Collecting rare postage stamps",
        "C) rare postage stamps",
        "D) postage stamps requires"
      ],
      correctAnswer: "B) Collecting rare postage stamps",
      explanation: "'Collecting rare postage stamps' is headed by the gerund 'Collecting' and functions as the complete subject of the verb 'requires'. Hence, it is a Gerund Phrase."
    },
    {
      question: "Complete the sentence: 'The Governor acts ________ the advice of the Council of Ministers.'",
      options: [
        "A) in accordance with",
        "B) in accordance to",
        "C) according with",
        "D) in accord of"
      ],
      correctAnswer: "A) in accordance with",
      explanation: "The standard idiomatic phrase is 'in accordance with', meaning in conformity or agreement with."
    },
    {
      question: "What does 'BONA FIDE' mean?",
      options: [
        "A) Illegal",
        "B) Genuine / In good faith",
        "C) Fraudulent",
        "D) Temporary"
      ],
      correctAnswer: "B) Genuine / In good faith",
      explanation: "'Bona fide' is a Latin phrase meaning genuine, real, or undertaken honestly without fraud."
    },
    {
      question: "Correct the sentence: 'Being a hot afternoon, we rested under a tree.'",
      options: [
        "A) It being a hot afternoon, we rested under a tree.",
        "B) As being a hot afternoon, we rested under a tree.",
        "C) Having been a hot afternoon, we rested under a tree.",
        "D) The sentence is already correct."
      ],
      correctAnswer: "A) It being a hot afternoon, we rested under a tree.",
      explanation: "An impersonal subject 'It' must be supplied to the absolute participial phrase ('It being a hot afternoon') to prevent 'being hot' from incorrectly modifying 'we'."
    },
    {
      question: "Fill in the blank: 'The bridge was ________ collapse when the engineers closed it to traffic.'",
      options: [
        "A) on the verge of",
        "B) on the view of",
        "C) on the lieu of",
        "D) by the verge of"
      ],
      correctAnswer: "A) on the verge of",
      explanation: "'On the verge of' means on the brink or very edge of something about to happen."
    }
  ],
  keyTerminology: [
    {
      term: "Phrase",
      definition: "A group of words without a subject-predicate combination, functioning as a single constituent in sentence syntax."
    },
    {
      term: "Prepositional Phrase",
      definition: "A phrase beginning with a preposition and ending with a noun/pronoun object, modifying either a noun or verb."
    },
    {
      term: "Dangling Participle",
      definition: "A grammatical error where a participial phrase lacks a clear, logical subject to modify in the main clause."
    },
    {
      term: "Absolute Phrase",
      definition: "A modifier consisting of a noun and a participle that modifies an entire independent clause rather than a single word."
    },
    {
      term: "Gerund Phrase",
      definition: "A verbal phrase beginning with a gerund (V-ing) that functions syntactically as a noun."
    },
    {
      term: "Prima Facie",
      definition: "Latin expression meaning 'at first sight', denoting sufficient evidence to establish a fact unless rebutted."
    },
    {
      term: "Status Quo",
      definition: "Latin term referring to the current, existing state of political, social, or administrative affairs."
    },
    {
      term: "In Lieu Of",
      definition: "A formal prepositional phrase derived from French meaning 'in the place of' or 'instead of'."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapters 3 & 4 on 'Phrases and Clauses', detailing Adjective, Adverb, and Noun Phrases, and participial construction."
    },
    {
      title: "A Comprehensive Grammar of the English Language",
      author: "Randolph Quirk et al.",
      details: "In-depth treatment of prepositional idioms, absolute phrases, and structural non-finites."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Analysis of 'with a view to + V-ing', dangling participles, and administrative Latin phrases."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Compilation of phrase identification, error detection, and prepositional idiom questions from 2014 to 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Phrase vs Clause",
      confusion: "Treating any word cluster as a clause.",
      clarity: "A phrase contains NO finite verb (*in the morning*). A clause MUST have a subject and a finite verb (*when morning came*)."
    },
    {
      concept: "Despite vs In spite of",
      confusion: "Writing 'Despite of the rain'.",
      clarity: "**'Despite'** never takes 'of' (*Despite the rain*). **'In spite of'** always requires 'of' (*In spite of the rain*). Both have the exact same meaning."
    },
    {
      concept: "With a view to: V1 vs V-ing",
      confusion: "Writing 'with a view to purchase'.",
      clarity: "The phrase 'with a view to' ends in a preposition and MUST be followed by a gerund: **'with a view to purchasing'**."
    },
    {
      concept: "In lieu of vs In view of",
      confusion: "Swapping 'lieu' (instead of) with 'view' (considering).",
      clarity: "**In lieu of** = **Instead of** (*cash in lieu of food*). **In view of** = **Considering / because of** (*in view of the rain, match was cancelled*)."
    },
    {
      concept: "Dangling Participle in Exam Questions",
      confusion: "Failing to check whether the participle logically describes the subject.",
      clarity: "Always ask *'Who is doing the action of the participle?'*. In 'Walking in the garden, a flower was plucked', the flower wasn't walking! Write: 'While I was walking in the garden, I plucked a flower'."
    }
  ],
  faqList: [
    {
      question: "Can a Prepositional Phrase act as the subject of a sentence?",
      answer: "In rare locative inversions, a prepositional phrase may appear at the start (e.g., 'Under the tree stood an old hermit'), but the true grammatical subject is 'an old hermit', not the phrase."
    },
    {
      question: "What is an Absolute Phrase?",
      answer: "An Absolute Phrase (e.g., 'The weather being pleasant, we went for a picnic') has its own noun ('weather') and participle ('being pleasant') but no finite verb, and is separated from the main sentence by a comma."
    },
    {
      question: "Why is 'Despite of' considered a grammatical error in Vyapam exams?",
      answer: "'Despite' is a single preposition that takes a noun directly (e.g., 'despite difficulties'). Adding 'of' is an erroneous hybridization with 'in spite of'."
    },
    {
      question: "What does 'De jure' mean in Indian constitutional law?",
      answer: "'De jure' means lawful or by legal right. Under the Indian Constitution, the President is the de jure (constitutional) executive head, while the Prime Minister is the de facto (practical) executive head."
    },
    {
      question: "How do we identify an Adjective Phrase in a sentence?",
      answer: "An Adjective Phrase immediately follows the noun or pronoun it modifies and answers the questions 'Which one?' or 'What kind of?' (e.g., 'The man with the red turban')."
    }
  ],
  oneLinerRevision: [
    "A phrase contains no finite verb and cannot express a complete thought on its own.",
    "A clause contains both a subject and a finite verb.",
    "Write 'Despite' (without of) OR 'In spite of' (with of); never write 'Despite of'.",
    "'With a view to' is strictly followed by a Gerund (V-ing), e.g., 'with a view to passing'.",
    "'By dint of' means through the force or effort of.",
    "'In lieu of' means in place of or as a substitute for.",
    "'Prima facie' is a Latin legal phrase meaning at first sight.",
    "'Status quo' means the existing state of political or social affairs.",
    "Dangling participles occur when the opening verbal phrase lacks a logical subject in the main clause.",
    "De facto means in actual reality; De jure means by legal constitutional right."
  ],
  rapidRevision: {
    points: [
      "Definition: Phrase = Group of words without Subject + Finite Verb.",
      "Types: Noun Phrase, Prepositional, Adjective, Adverb, Participial, Gerund, Infinitive, Absolute.",
      "Prepositional: In spite of (despite), By dint of (effort), In lieu of (instead of), By virtue of (authority).",
      "Gerund Phrasals: With a view to + V-ing; Looking forward to + V-ing; Accustomed to + V-ing.",
      "Dangling Participles: Ensure the subject matches the participle action (*It being a rainy day*).",
      "Latin Terms: Prima facie (at first sight), Status quo (existing state), De facto (actual), Bona fide (genuine)."
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
