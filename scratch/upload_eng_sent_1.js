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
  id: "cgv_master_eng_sent_1",
  topicId: "eng_sent_1",
  chapterId: "cgv_master_sub_6_ch_5",
  subjectId: "cgv_master_sub_6",
  title: "Sentence Formation",
  subtitle: "Comprehensive Notes on Sentence Structure, Classification, Clauses & Patterns for CG Vyapam",
  overview: {
    introduction: "A sentence is a group of words arranged in a meaningful, grammatically complete order that conveys a complete thought, statement, question, command, or exclamation. Every complete sentence must possess at least two foundational elements: a Subject (the person, place, thing, or concept being spoken about) and a Predicate (what is asserted about the subject, invariably containing a finite verb). Sentences in English are classified along two dimensions: (1) By Function or Purpose (Assertive/Declarative, Interrogative, Imperative, Exclamatory, and Optative); and (2) By Grammatical Structure (Simple, Compound, Complex, and Compound-Complex). Furthermore, mastering sentence formation requires a thorough grasp of clauses (Independent vs Dependent—Noun Clauses, Adjective Clauses, and Adverb Clauses) and standard English sentence patterns (such as S-V, S-V-O, S-V-C, and S-V-O-C).",
    importance: "Sentence Formation is an essential core topic in the English syllabus for CG Vyapam competitive exams (Hostel Warden, Revenue Inspector, Patwari, Sub Inspector, ADEO, Teacher, and Lab Assistant). Questions directly evaluate candidate proficiency in identifying sentence types (Simple vs Compound vs Complex), recognizing subordinate clauses, distinguishing between objects and complements, and identifying correct syntactical patterns.",
    examRelevance: "In CG Vyapam examinations, students encounter questions demanding: (1) Classification of sentences as Simple, Compound, or Complex; (2) Identification of underlined clauses (e.g., 'Tell me where you live' -> Noun Clause); (3) Differentiating between coordinating conjunctions (FANBOYS) and subordinating conjunctions; (4) Identifying the syntactic pattern of a given sentence (e.g., 'They elected him President' -> S-V-O-C); (5) Correcting faulty word order and fragmented clauses.",
    quickFacts: [
      { label: "Two Core Sentence Parts", value: "Subject (naming part) + Predicate (asserting part containing the verb)" },
      { label: "Structural Classes (4)", value: "Simple, Compound, Complex, and Compound-Complex" },
      { label: "Coordinating Conjunctions (FANBOYS)", value: "For, And, Nor, But, Or, Yet, So (used in Compound Sentences)" },
      { label: "Subordinate Clause Types (3)", value: "Noun Clause, Adjective (Relative) Clause, and Adverb Clause" },
      { label: "Core Sentence Patterns (5)", value: "S-V, S-V-O, S-V-IO-DO, S-V-C, and S-V-O-C" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Subject, Predicate & Constituent Elements of a Sentence",
      content: `### 1. The Two Basic Parts of a Sentence
Every grammatical sentence can be bifurcated into two primary components:
1. **The Subject**:
   - The person, animal, place, thing, or abstract idea that performs the action or about which something is asserted.
   - *Example:* **The young athlete from Raipur** won a gold medal. (Complete Subject).
2. **The Predicate**:
   - The part of the sentence that tells something about the subject. It always contains the finite verb, along with any objects, complements, or modifiers.
   - *Example:* The young athlete from Raipur **won a gold medal**. (Complete Predicate).

---

### 2. Five Key Syntactic Elements of the Predicate
Within the predicate, grammatical elements serve distinct syntactic functions:
1. **Verb (V)**: The essential anchor expressing action, state, or occurrence (*runs, is, appears, bought*).
2. **Direct Object (DO / O)**: The person or entity directly receiving the action of a transitive verb. (Answers *'What?'* or *'Whom?'* after the verb).
   - *Example:* She wrote **a letter** (DO).
3. **Indirect Object (IO)**: The person to or for whom the action is performed. (Answers *'To whom?'* or *'For whom?'*).
   - *Example:* The teacher gave **us** (IO) **an assignment** (DO).
4. **Complement (C)**: A word or phrase that completes the meaning of the subject or object.
   - **Subject Complement (SC)**: Follows a linking/stative verb (*be, seem, look, become*) and renames or describes the subject.
     - *Example:* Dr. Raman is **a physician** (Noun complement). / She looks **cheerful** (Adjective complement).
   - **Object Complement (OC)**: Follows a direct object and completes its meaning.
     - *Example:* The committee elected him **Chairman** (OC). / They painted the wall **green** (OC).
5. **Adjunct / Adverbial (A)**: An optional adverb, prepositional phrase, or adverbial clause that adds circumstantial information regarding time, place, manner, or reason.
   - *Example:* She sang melodiously **in the auditorium** (Place) **yesterday** (Time).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Classification of Sentences by Function / Purpose",
      content: `### 1. The Five Functional Types
Sentences are traditionally classified into five functional categories based on their communicative intent:

#### A. Assertive / Declarative Sentences:
- Makes a statement, asserts a fact, or shares information. Always ends with a **full stop (.)**.
- Can be **Affirmative** (positive) or **Negative**:
  - *Affirmative:* Bilaspur is the High Court seat of Chhattisgarh.
  - *Negative:* He does not consume junk food.

#### B. Interrogative Sentences:
- Asks a question to elicit information. Always ends with a **question mark (?)**.
- **Yes/No Questions**: Begin with an auxiliary verb (*Is, are, do, have, can, will*).
  - *Example:* Have you submitted your examination form?
- **Wh- Questions**: Begin with interrogative pronouns/adverbs (*Who, What, Where, When, Why, How*).
  - *Example:* Where is the Chitrakote waterfall located?

#### C. Imperative Sentences:
- Expresses a command, an order, an instruction, a polite request, advice, or prohibition.
- The grammatical subject **'You' is usually omitted (implied)**. Ends with a **full stop (.)** or exclamation mark.
  - *Order:* Stand in a straight line.
  - *Request:* Please lend me your dictionary.
  - *Advice:* Revise your notes daily.
  - *Prohibition:* Do not walk on the grass.

#### D. Exclamatory Sentences:
- Expresses strong, sudden feelings of surprise, joy, sorrow, shock, or admiration.
- Often begins with **'What'** or **'How'** and ends with an **exclamation mark (!)**.
  - *Example:* What a magnificent temple this is!
  - *Example:* How bravely our soldiers fought!

#### E. Optative Sentences:
- Expresses a prayer, wish, blessing, or curse. Often begins with **'May'** or **'Wish'** and ends with an **exclamation mark (!)** or full stop.
  - *Blessing:* May God bless you with abundant success!
  - *Wish:* Wish you a very happy journey!`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Classification by Grammatical Structure (Simple, Compound, Complex)",
      content: `### 1. Simple Sentences
- A Simple Sentence contains **only ONE independent clause** (one subject and one finite verb) and expresses a complete, standalone thought.
- It may contain compound subjects, compound verbs, prepositional phrases, or participle phrases, but it contains **no subordinate clauses**.
  - *Example:* The sun rises in the east.
  - *Example with compound subject:* Rohan and Sohan **went** to Raipur. (Still Simple: one finite verb).
  - *Example with phrase:* **Having finished his homework**, Amit went to play. (Still Simple: 'having finished' is a participle phrase, not a finite clause).

---

### 2. Compound Sentences
- A Compound Sentence contains **TWO OR MORE independent (main) clauses** joined together by a **Coordinating Conjunction** or a semicolon (;).
- Both clauses are of equal grammatical rank; neither depends on the other for its core meaning.
- **Coordinating Conjunctions Mnemonic — FANBOYS**:
  - **F** - For (reason: *He was tired, for he had walked all day.*)
  - **A** - And (addition: *The wind blew, and the leaves danced.*)
  - **N** - Nor (negative choice: *He does not drink, nor does he smoke.*)
  - **B** - But (contrast: *She worked diligently, but she failed the exam.*)
  - **O** - Or (alternative: *Study hard, or you will regret it.*)
  - **Y** - Yet (contrast/concession: *It was raining heavily, yet they continued playing.*)
  - **S** - So (result: *The train was cancelled, so we returned home.*)
- **Correlative Conjunctions in Compound Sentences**:
  - *Either ... or*, *Neither ... nor*, *Not only ... but also*, *Both ... and*.
  - *Example:* **Not only** did he help the poor, **but he also** provided them shelter.

---

### 3. Complex Sentences
- A Complex Sentence contains **ONE independent (main) clause** and **AT LEAST ONE dependent (subordinate) clause**.
- The subordinate clause cannot stand alone as a complete sentence and is connected to the main clause by a **Subordinating Conjunction** or a **Relative Pronoun/Adverb**.
- **Common Subordinating Conjunctions**: *because, although, though, since, unless, until, while, as, if, after, before, that, lest, provided that*.
- **Relative Words**: *who, whom, whose, which, that, where, when, why, how*.
  - *Example:* **Although he was poor** (Dependent), **he was thoroughly honest** (Independent).
  - *Example:* The student **who worked hard** (Dependent) won the gold medal (Independent).

---

### 4. Compound-Complex Sentences
- Contains **at least two independent clauses** and **at least one dependent clause**.
  - *Example:* **Though he was exhausted** (Dependent), **he completed the report** (Independent 1), **and his manager praised his dedication** (Independent 2).`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Clauses & Their Types (Noun, Adjective, Adverb Clauses)",
      content: `### 1. What is a Clause?
A clause is a group of related words containing both a **subject** and a **finite verb**.
- **Independent (Principal / Main) Clause**: Expresses a complete thought and can stand alone as a sentence.
- **Dependent (Subordinate) Clause**: Cannot stand alone; depends on the main clause for complete meaning.

---

### 2. Three Types of Subordinate Clauses (Frequently Tested!)

#### A. Noun Clause:
- A subordinate clause that performs the function of a **noun** in the sentence.
- Functions as: (1) Subject of a verb; (2) Object of a transitive verb; (3) Complement of a verb; (4) Object of a preposition; or (5) In apposition to a noun.
- **Identification Test**: Replace the entire clause with the pronoun **'it'** or ask the question **'What?'** after the main verb.
  - *As Object:* I know **that he is honest**. (Ask: *I know what?* -> *that he is honest* = Noun Clause).
  - *As Subject:* **What he said** surprised everyone. (*It* surprised everyone = Noun Clause).
  - *As Object of Preposition:* Pay careful attention to **what your teacher says**.

#### B. Adjective (Relative) Clause:
- A subordinate clause that qualifies or describes a **noun or pronoun** in the main clause, performing the work of an adjective.
- Introduced by **Relative Pronouns** (*who, whom, whose, which, that*) or **Relative Adverbs** (*where, when, why*).
- **Identification Test**: It directly follows an **Antecedent** (the noun it describes) and answers *'Which one?'* or *'What kind of?'*.
  - *Example:* The boy **who won the prize** is my cousin. (Describes noun 'boy' -> Adjective Clause).
  - *Example:* This is the house **where Mahatma Gandhi lived**. (Describes noun 'house' -> Adjective Clause).
  - *Crucial Distinction:*
    - *Tell me **where you live**.* -> Noun Clause (Object of 'tell').
    - *Tell me the place **where you live**.* -> Adjective Clause (Qualifies antecedent 'place').

#### C. Adverb Clause:
- A subordinate clause that modifies a **verb, adjective, or another adverb** in the main clause.
- Classified by the meaning it expresses:
  1. **Time**: introduced by *when, whenever, while, before, after, since, until, as soon as*.
     - *Example:* Strike the iron **while it is hot**.
  2. **Place**: introduced by *where, wherever*.
     - *Example:* You may sit **wherever you please**.
  3. **Reason / Cause**: introduced by *because, since, as*.
     - *Example:* He could not attend the class **because he was unwell**.
  4. **Condition**: introduced by *if, unless, provided that*.
     - *Example:* You will not pass **unless you work diligently**.
  5. **Purpose**: introduced by *so that, in order that, lest*.
     - *Example:* Walk carefully **lest you should stumble**.
  6. **Contrast / Concession**: introduced by *though, although, even if*.
     - *Example:* **Although it was raining**, they continued their journey.
  7. **Result / Consequence**: introduced by *so ... that, such ... that*.
     - *Example:* He ran so fast **that he was completely out of breath**.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Standard English Sentence Patterns & Syntactical Word Order",
      content: `### 1. The Fundamental S-V-O Word Order
Standard English is an **SVO (Subject-Verb-Object)** language. Any variation in this order creates stylistic emphasis, inversion, or grammatical errors.

---

### 2. The Five Standard Sentence Patterns (Tested in Vyapam)
1. **Pattern 1: S + V (Subject + Intransitive Verb)**:
   - The verb requires no object to complete the sense.
   - *Birds* (S) *fly* (V).
   - *The baby* (S) *was crying loudly* (V + Adjunct).

2. **Pattern 2: S + V + O (Subject + Transitive Verb + Direct Object)**:
   - The verb acts directly upon a recipient object.
   - *Rohan* (S) *purchased* (V) *a new laptop* (DO).
   - *The cat* (S) *killed* (V) *the mouse* (DO).

3. **Pattern 3: S + V + IO + DO (Subject + Ditransitive Verb + Indirect Object + Direct Object)**:
   - The verb takes two objects: person (IO) and thing (DO).
   - *My uncle* (S) *sent* (V) *me* (IO) *a wrist watch* (DO).
   - *The Principal* (S) *granted* (V) *him* (IO) *a scholarship* (DO).
   - *Transformation:* S + V + DO + preposition (to/for) + IO: *My uncle sent a wrist watch **to me**.*

4. **Pattern 4: S + V + C (Subject + Linking Verb + Subject Complement)**:
   - The verb is stative or linking (*is, am, are, was, were, become, seem, look, taste*); the complement describes the subject.
   - *Her father* (S) *is* (V) *a renowned surgeon* (Subject Complement - Noun).
   - *The climate of Bastar* (S) *remains* (V) *pleasant* (Subject Complement - Adjective).

5. **Pattern 5: S + V + O + C (Subject + Transitive Verb + Object + Object Complement)**:
   - The complement completes the meaning of the direct object.
   - *The committee* (S) *appointed* (V) *him* (O) *Secretary* (Object Complement).
   - *The news* (S) *made* (V) *her* (O) *extremely sorrowful* (Object Complement).
   - *They* (S) *painted* (V) *the car* (O) *black* (Object Complement).

---

### 3. Inversion of Sentence Word Order
In certain emphatic structures, the verb or auxiliary verb precedes the subject (**VS or Aux + S + V**):
1. **Negative Adverbs at the Beginning**:
   - *Hardly / Scarcely / Seldom / Rarely / Little / Never / No sooner*:
   - *Incorrect:* Seldom I have seen such courage.
   - *Correct:* **Seldom have I seen** such courage.
2. **Conditional Clauses without 'If'**:
   - *Had I known the truth*, I would have informed you.
3. **Sentences Beginning with 'Here' or 'There'**:
   - *Here comes the bus!* (Verb 'comes' precedes Subject 'the bus').`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Structural Classification: Simple vs Compound vs Complex Sentences",
      headers: ["Feature / Dimension", "Simple Sentence", "Compound Sentence", "Complex Sentence"],
      rows: [
        ["Number of Independent Clauses", "Exactly ONE independent clause", "TWO or more independent clauses", "ONE independent clause"],
        ["Number of Dependent Clauses", "ZERO dependent clauses", "ZERO dependent clauses", "ONE or more dependent clauses"],
        ["Connecting Conjunctions", "None (may have prepositions/participles)", "Coordinating (FANBOYS) or Correlative", "Subordinating conjunctions or Relative words"],
        ["Relative Grammatical Rank", "Single standalone proposition", "Clauses of equal grammatical rank", "Subordinate clause dependent on main clause"],
        ["Illustrative Example", "Inspite of his poverty, he is honest.", "He is poor, but he is honest.", "Although he is poor, he is honest."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Subordinate Clauses Matrix: Noun vs Adjective vs Adverb Clauses",
      headers: ["Clause Type", "Grammatical Function", "Standard Introductory Connectives", "Identification Question / Test"],
      rows: [
        ["Noun Clause", "Acts as subject, object, or complement of a verb", "that, what, whether, if, who, why, how", "Replace clause with 'it' or ask 'What?' after main verb."],
        ["Adjective (Relative) Clause", "Modifies an immediately preceding noun/pronoun (antecedent)", "who, whom, whose, which, that, where, when", "Directly follows a noun and answers 'Which one?' or 'What kind of?'."],
        ["Adverb Clause", "Modifies a verb, adjective, or adverb in the main clause", "because, since, although, unless, when, where, so that", "Answers 'When?', 'Where?', 'Why?', 'Under what condition?', or 'How?'."]
      ]
    },
    {
      tableId: "tab_3",
      title: "The Five Core Sentence Patterns: Diagnostic Matrix",
      headers: ["Pattern Code", "Full Expansion", "Verb Category", "Syntactic Example Analysis"],
      rows: [
        ["S + V", "Subject + Verb", "Intransitive (no object required)", "The stars (S) shine (V)."],
        ["S + V + O", "Subject + Verb + Direct Object", "Monotransitive (one object)", "The hunter (S) shot (V) the tiger (O)."],
        ["S + V + IO + DO", "Subject + Verb + Indirect Obj + Direct Obj", "Ditransitive (two objects)", "The teacher (S) taught (V) us (IO) English (DO)."],
        ["S + V + C", "Subject + Linking Verb + Complement", "Incomplete Predication / Linking", "She (S) looks (V) exhausted (C)."],
        ["S + V + O + C", "Subject + Verb + Object + Object Complement", "Complex Transitive", "They (S) named (V) the child (O) Aarav (C)."]
      ]
    }
  ],
  pyqs: [
    {
      question: "Identify the type of sentence: 'Although he worked very hard, he could not clear the examination.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) Simple Sentence",
        "B) Compound Sentence",
        "C) Complex Sentence",
        "D) Optative Sentence"
      ],
      correctAnswer: "C) Complex Sentence",
      explanation: "The sentence contains one subordinating conjunction ('Although') introducing a dependent clause ('Although he worked very hard') and one main independent clause ('he could not clear the examination'). A sentence comprising one independent clause and at least one dependent clause is defined as a Complex Sentence."
    },
    {
      question: "In the sentence 'Tell me where you live', the underlined clause 'where you live' is a/an: [CG Vyapam Patwari Exam]",
      options: [
        "A) Adjective Clause",
        "B) Noun Clause",
        "C) Adverb Clause",
        "D) Prepositional Clause"
      ],
      correctAnswer: "B) Noun Clause",
      explanation: "Ask the question: 'Tell me what?' -> 'where you live'. The clause acts directly as the object of the transitive verb 'tell'. A clause functioning as the object of a verb is a Noun Clause. (Note: It is NOT an adjective clause because there is no antecedent noun like 'the place' before 'where')."
    },
    {
      question: "Identify the sentence pattern of: 'The committee appointed him Chairman.' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) S + V + IO + DO",
        "B) S + V + O + C",
        "C) S + V + C",
        "D) S + V + A"
      ],
      correctAnswer: "B) S + V + O + C",
      explanation: "In this sentence: 'The committee' = Subject (S); 'appointed' = Transitive Verb (V); 'him' = Direct Object (O); 'Chairman' = Object Complement (C), because 'Chairman' describes and completes the identity of the object 'him' (him = Chairman). Thus, the pattern is S-V-O-C."
    },
    {
      question: "Transform the compound sentence into a simple sentence: 'He was ill, so he could not attend the office.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Because he was ill, he could not attend the office.",
        "B) Being ill, he could not attend the office.",
        "C) He was ill and could not attend the office.",
        "D) As he was ill, he could not attend the office."
      ],
      correctAnswer: "B) Being ill, he could not attend the office.",
      explanation: "A simple sentence must have only ONE finite verb and no subordinate clauses. In Option B, 'Being ill' is a participial phrase (non-finite), leaving 'could attend' as the single finite verb. Options A and D are complex sentences, while Option C is still a compound sentence."
    },
    {
      question: "Which of the following is a Compound Sentence? [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) Seeing the police, the thief ran away.",
        "B) When the thief saw the police, he ran away.",
        "C) The thief saw the police, and he ran away.",
        "D) The thief ran away to escape the police."
      ],
      correctAnswer: "C) The thief saw the police, and he ran away.",
      explanation: "Option C consists of two independent clauses ('The thief saw the police' and 'he ran away') joined by the coordinating conjunction 'and'. Hence, it is a Compound Sentence. Option A and D are Simple sentences; Option B is a Complex sentence."
    },
    {
      question: "Identify the clause type: 'This is the school where my father studied.' [CG Vyapam ADEO Exam]",
      options: [
        "A) Noun Clause",
        "B) Adjective Clause",
        "C) Adverb Clause of Place",
        "D) Coordinate Clause"
      ],
      correctAnswer: "B) Adjective Clause",
      explanation: "The clause 'where my father studied' directly follows and modifies the antecedent noun 'school'. A clause that qualifies or describes a noun is an Adjective (or Relative) Clause."
    }
  ],
  mcqs: [
    {
      question: "Which of the following coordinating conjunctions indicates 'contrast' in a compound sentence?",
      options: [
        "A) So",
        "B) And",
        "C) But",
        "D) For"
      ],
      correctAnswer: "C) But",
      explanation: "In the FANBOYS coordinating conjunctions, 'But' and 'Yet' express contrast between two independent clauses."
    },
    {
      question: "Identify the Subject Complement in: 'The milk turned sour after being left outside.'",
      options: [
        "A) milk",
        "B) turned",
        "C) sour",
        "D) outside"
      ],
      correctAnswer: "C) sour",
      explanation: "The verb 'turned' functions here as a linking verb. The adjective 'sour' describes the subject 'milk' and acts as the Subject Complement (S + V + C)."
    },
    {
      question: "Choose the complex sentence from the following:",
      options: [
        "A) Walk fast, or you will miss the train.",
        "B) In case of missing the train, take a taxi.",
        "C) If you do not walk fast, you will miss the train.",
        "D) Walk fast and catch the train."
      ],
      correctAnswer: "C) If you do not walk fast, you will miss the train.",
      explanation: "Option C begins with the subordinating conjunction 'If', introducing the conditional dependent clause 'If you do not walk fast', attached to the main clause 'you will miss the train'. Hence, it is a Complex Sentence."
    },
    {
      question: "In the sentence 'I will meet you when the meeting ends', the clause 'when the meeting ends' is a/an:",
      options: [
        "A) Adjective Clause",
        "B) Noun Clause",
        "C) Adverb Clause of Time",
        "D) Independent Clause"
      ],
      correctAnswer: "C) Adverb Clause of Time",
      explanation: "The clause answers the question 'When will I meet you?' and modifies the verb 'will meet'. A clause modifying a verb regarding time is an Adverb Clause of Time."
    },
    {
      question: "What is the sentence pattern of: 'The teacher gave Mohan a novel'?",
      options: [
        "A) S + V + O",
        "B) S + V + IO + DO",
        "C) S + V + O + C",
        "D) S + V + C"
      ],
      correctAnswer: "B) S + V + IO + DO",
      explanation: "'The teacher' = S; 'gave' = V; 'Mohan' = Indirect Object (person receiving); 'a novel' = Direct Object (thing given). Thus, the pattern is S + V + IO + DO."
    },
    {
      question: "Identify the sentence with inverted word order:",
      options: [
        "A) He rarely goes to the theatre.",
        "B) Rarely does he go to the theatre.",
        "C) He has rarely seen such a movie.",
        "D) He does go to the theatre rarely."
      ],
      correctAnswer: "B) Rarely does he go to the theatre.",
      explanation: "When a negative or restrictive adverb like 'Rarely' is placed at the very beginning of a sentence for emphasis, subject-auxiliary inversion is triggered: 'Rarely + does (aux) + he (sub) + go (verb)'."
    },
    {
      question: "A sentence containing one independent clause and no dependent clauses is called a:",
      options: [
        "A) Compound Sentence",
        "B) Simple Sentence",
        "C) Complex Sentence",
        "D) Compound-Complex Sentence"
      ],
      correctAnswer: "B) Simple Sentence",
      explanation: "By definition, a Simple Sentence consists of a single independent clause with one finite verb and expresses a complete thought without any subordinate clauses."
    },
    {
      question: "Identify the type of the following sentence: 'May you achieve all your aspirations!'",
      options: [
        "A) Imperative Sentence",
        "B) Exclamatory Sentence",
        "C) Optative Sentence",
        "D) Declarative Sentence"
      ],
      correctAnswer: "C) Optative Sentence",
      explanation: "Sentences that express a prayer, blessing, or wish (typically starting with 'May' and ending with an exclamation mark) are classified as Optative Sentences."
    }
  ],
  keyTerminology: [
    {
      term: "Sentence",
      definition: "A set of words that is complete in itself, typically containing a subject and predicate, conveying a statement, question, exclamation, or command."
    },
    {
      term: "Predicate",
      definition: "The part of a sentence or clause containing a verb and stating something about the subject."
    },
    {
      term: "Independent (Main) Clause",
      definition: "A clause that can stand alone as a complete grammatical sentence because it expresses a complete thought."
    },
    {
      term: "Dependent (Subordinate) Clause",
      definition: "A clause that provides additional information but cannot stand alone as a sentence; it depends on an independent clause."
    },
    {
      term: "Coordinating Conjunction",
      definition: "A conjunction (FANBOYS: for, and, nor, but, or, yet, so) that connects words, phrases, or clauses of equal grammatical rank."
    },
    {
      term: "Subordinating Conjunction",
      definition: "A conjunction (such as because, although, since, unless, while) that introduces a dependent clause and connects it to a main clause."
    },
    {
      term: "Subject Complement",
      definition: "A noun or adjective that follows a linking verb to rename or describe the subject of the sentence."
    },
    {
      term: "Object Complement",
      definition: "A word or phrase that follows a direct object to describe, identify, or complete its meaning."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapters 1 to 4 on 'The Sentence', 'Subject and Predicate', 'The Phrase and the Clause', and Chapter 24 on 'Analysis of Simple Sentences'."
    },
    {
      title: "A Comprehensive Grammar of the English Language",
      author: "Randolph Quirk, Sidney Greenbaum, Geoffrey Leech, Jan Svartvik",
      details: "Chapter on Clause structure, Complex and Compound sentences, and functional syntactical elements."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Sections on Clause types, Relatives, Inversion after negative adverbs, and sentence building rules."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Analysis of sentence classification and clause identification questions from 2015 to 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Direct Object vs Subject Complement",
      confusion: "Treating 'doctor' in 'He became a doctor' as an object.",
      clarity: "An object receives an action from a transitive verb ('He saw a doctor' -> 'doctor' is an object). A complement follows a linking/stative verb and describes the same entity as the subject ('He is/became a doctor' -> 'doctor' = 'he', so it is a Subject Complement)."
    },
    {
      concept: "Noun Clause vs Adjective Clause starting with 'Where' / 'When'",
      confusion: "Confusing 'Tell me where you live' with an adjective clause.",
      clarity: "If there is a preceding noun antecedent (*the place where you live*), it is an Adjective Clause. If there is NO antecedent and the clause answers 'What?' directly after the verb (*Tell me where you live*), it is a Noun Clause."
    },
    {
      concept: "Compound vs Complex Sentences",
      confusion: "Confusing clauses joined by 'so' or 'for' with complex sentences.",
      clarity: "Clauses joined by FANBOYS (*for, and, nor, but, or, yet, so*) form COMPOUND sentences. Clauses joined by words like *because, since, although, unless, if, after* form COMPLEX sentences."
    },
    {
      concept: "Phrase vs Clause",
      confusion: "Thinking a long group of words is automatically a clause.",
      clarity: "A phrase is a group of words WITHOUT a subject-verb combination (e.g., 'in the morning', 'having finished the work'). A clause MUST contain both a subject and a finite verb."
    },
    {
      concept: "Imperative vs Optative Sentences",
      confusion: "Confusing a moral prayer with an imperative command.",
      clarity: "Imperatives give orders or advice addressed to 'You' ('Help the poor'). Optatives express blessings, wishes, or prayers often with 'May' ('May God help you!')."
    }
  ],
  faqList: [
    {
      question: "Can a Simple Sentence have more than one subject?",
      answer: "Yes! A simple sentence can have a compound subject (e.g., 'Rohan and Sohan play cricket') or a compound verb (e.g., 'He sang and danced'), provided there is only one independent finite clause structure."
    },
    {
      question: "What is an Antecedent in an Adjective Clause?",
      answer: "An antecedent is the noun or pronoun occurring immediately before a relative pronoun/adverb that the relative clause describes (e.g., in 'The book which you gave me is interesting', 'book' is the antecedent)."
    },
    {
      question: "Why is 'Having finished his dinner, he slept' a simple sentence?",
      answer: "Because 'Having finished his dinner' is a participial phrase, not a clause (it contains no finite verb and no subject). The sentence contains only one finite verb ('slept') and one independent clause."
    },
    {
      question: "What is the difference between an Indirect Object and a Prepositional Object?",
      answer: "In 'He gave me a pen', 'me' is an Indirect Object. In 'He gave a pen to me', 'me' is the object of the preposition 'to', making 'to me' a prepositional phrase rather than an indirect object."
    },
    {
      question: "What happens when a sentence starts with 'No sooner' or 'Hardly'?",
      answer: "Subject-auxiliary inversion occurs: the auxiliary verb comes before the subject (e.g., 'No sooner did he arrive than the bell rang', NOT 'No sooner he arrived')."
    }
  ],
  oneLinerRevision: [
    "A Simple Sentence contains exactly one independent clause and zero dependent clauses.",
    "A Compound Sentence contains two or more independent clauses joined by coordinating conjunctions (FANBOYS).",
    "A Complex Sentence contains one main clause and at least one subordinate (dependent) clause.",
    "FANBOYS: For, And, Nor, But, Or, Yet, So (the seven coordinating conjunctions).",
    "A Noun Clause functions as a subject, object, or complement and answers the question 'What?'.",
    "An Adjective (Relative) Clause immediately follows and modifies its antecedent noun or pronoun.",
    "Adverb Clauses modify verbs, adjectives, or adverbs and express time, place, reason, condition, or concession.",
    "The pattern S-V-O-C features an object complement that renames or qualifies the direct object (e.g., 'They made him King').",
    "Linking verbs (is, seem, become, feel) take Subject Complements (S-V-C), not direct objects.",
    "Beginning a sentence with negative adverbs (seldom, hardly, never) forces subject-auxiliary inversion."
  ],
  rapidRevision: {
    points: [
      "Components: Subject (who/what) + Predicate (verb + objects/complements/adjuncts).",
      "Functional Types: Assertive (.), Interrogative (?), Imperative (command/request), Exclamatory (!), Optative (prayer/wish).",
      "Structural Types: Simple (1 main clause), Compound (2+ main clauses with FANBOYS), Complex (1 main + 1+ subordinate clauses).",
      "Clauses: Noun Clause (replaces noun, answers 'What?'), Adjective Clause (modifies antecedent), Adverb Clause (modifies verb).",
      "Patterns: S-V, S-V-O, S-V-IO-DO, S-V-C (linking verb), S-V-O-C (object complement).",
      "Inversion: Negative adverbs at front -> Auxiliary + Subject + Main Verb."
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
