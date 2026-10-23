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
  id: "cgv_master_eng_sent_2",
  topicId: "eng_sent_2",
  chapterId: "cgv_master_sub_6_ch_5",
  subjectId: "cgv_master_sub_6",
  title: "Transformation of Sentences",
  subtitle: "Complete Notes on Sentential Transformation, Conversion Rules, Degrees & Negation for CG Vyapam",
  overview: {
    introduction: "Transformation of Sentences is the grammatical process of changing the form or structural syntax of a sentence from one type to another WITHOUT altering its original sense or meaning. Unlike simple grammatical changes, the cardinal principle of transformation is that the semantic meaning must remain completely intact. The major types of transformation tested in competitive examinations include: (1) Removal and insertion of the adverb 'too' ('too ... to' into 'so ... that ... cannot'); (2) Interchange of Affirmative and Negative sentences; (3) Interchange of Interrogative and Assertive sentences (rhetorical questions); (4) Interchange of Exclamatory and Assertive sentences; (5) Interchange of Degrees of Comparison (Positive, Comparative, and Superlative); and (6) Mutual conversion among Simple, Compound, and Complex sentences.",
    importance: "In CG Vyapam examinations—including Hostel Warden, Revenue Inspector (RI), Patwari, Sub Inspector, ADEO, and Assistant Teacher exams—Transformation of Sentences constitutes a high-yield grammatical topic. The exam papers regularly feature multiple-choice questions requiring candidates to select the exact semantic equivalent of a given sentence. Mastery of these transformation techniques prevents common exam pitfalls, such as mistakenly altering tense or inadvertently shifting meaning.",
    examRelevance: "CG Vyapam tests: (1) Conversion of 'too + adjective + to + V1' into 'so + adjective + that + subject + cannot/could not + V1'; (2) Transforming 'As soon as' into 'No sooner did/had ... than'; (3) Transforming 'Only/Alone' into 'None but' (for persons) or 'Nothing but' (for things); (4) Transforming degrees of comparison while maintaining original meaning; (5) Converting rhetorical questions into emphatic assertions; (6) Interchanging simple, compound, and complex sentences using participles, infinitive phrases, and conjunctions.",
    quickFacts: [
      { label: "Cardinal Law of Transformation", value: "The grammatical form changes, but the core meaning remains 100% invariant" },
      { label: "Removal of 'Too'", value: "'too + adj + to + V1' -> 'so + adj + that + S + cannot/could not + V1'" },
      { label: "As soon as -> No sooner", value: "'As soon as ...' -> 'No sooner did + S + V1 / had + S + V3 ... than'" },
      { label: "Only / Alone Transformation", value: "'Only' for person -> 'None but'; for thing -> 'Nothing but'; for number/age -> 'Not more than'" },
      { label: "Rhetorical Question Rule", value: "Positive question -> Negative assertion; Negative question -> Positive assertion" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Removal and Insertion of Adverb 'Too' (Too ... To)",
      content: `### 1. The Structure of 'Too ... To'
The adverb 'too' before an adjective or adverb followed by an infinitive ('to + V1') inherently carries a negative implication meaning 'more than enough' or 'excessively':
- **Formula:** **Subject + Verb + too + Adjective/Adverb + to + V1**
- **Transformation Formula:** **Subject + Verb + so + Adjective/Adverb + that + Subject + cannot / could not + V1**

---

### 2. Tense-Matching Rules
1. **Present Tense (is, am, are)** -> use **cannot (can't)**:
   - *Direct:* The old man is **too weak to walk**.
   - *Transformed:* The old man is **so weak that he cannot walk**.
2. **Past Tense (was, were)** -> use **could not (couldn't)**:
   - *Direct:* He was **too late to catch** the train.
   - *Transformed:* He was **so late that he could not catch** the train.

---

### 3. Special Variations of 'Too ... To'
#### A. When the Subject is Inanimate (Passive Meaning):
- When an inanimate object or abstract noun is the subject, the infinitive expresses a passive sense, requiring **'for + pronoun'** or passive voice:
  - *Example:* The tea is **too hot for me to drink**.
  - *Transformed:* The tea is **so hot that I cannot drink it**.
  - *Example:* The box is **too heavy to lift**.
  - *Transformed:* The box is **so heavy that it cannot be lifted** (OR *that one cannot lift it*).

#### B. When 'Too' Occurs Without an Infinitive:
- When 'too' stands alone before an adjective without 'to + V1', it means 'more than desirable' or 'immoderately'. Replace 'too' with **'over'**, **'extremely'**, or **'beyond the proper limit'**:
  - *Direct:* He is **too eager** for praise.
  - *Transformed:* He is **over-eager** for praise. (OR *He is eager for praise beyond the proper limit*).
  - *Direct:* The weather is **too cold**.
  - *Transformed:* The weather is **extremely cold** / **colder than it should be**.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Interchange of Affirmative and Negative Sentences",
      content: `### 1. Fundamental Principle
To turn an Affirmative sentence into a Negative sentence (or vice versa) without altering the meaning, the negative particle ('not', 'no', 'never') must be balanced by using an **antonym (opposite word)** or a **double negative construction**.

---

### 2. Standard Conversion Methods

#### Method 1: By Using the Antonym of Key Words + 'Not':
- *Affirmative:* Man is mortal.
- *Negative:* Man is **not immortal**.
- *Affirmative:* Everyone was present in the meeting.
- *Negative:* No one was **absent** from the meeting.
- *Affirmative:* She is a wise woman.
- *Negative:* She is **not a foolish** woman.
- *Affirmative:* I shall always remember your kindness.
- *Negative:* I shall **never forget** your kindness.

#### Method 2: Transforming 'Only' or 'Alone':
- **For Persons**: Replace 'Only / Alone' with **'None but'**:
  - *Affirmative:* **Only** a brave soldier can face such danger.
  - *Negative:* **None but** a brave soldier can face such danger.
  - *Affirmative:* God **alone** can save us now.
  - *Negative:* **None but** God can save us now.
- **For Inanimate Things**: Replace 'Only' with **'Nothing but'**:
  - *Affirmative:* He drank **only** water during his fast.
  - *Negative:* He drank **nothing but** water during his fast.
- **For Numbers, Age, or Quantity**: Replace 'Only' with **'Not more than'** or **'Not less than'**:
  - *Affirmative:* He has **only** five thousand rupees left.
  - *Negative:* He has **not more than** five thousand rupees left.

#### Method 3: Transforming 'As soon as' into 'No sooner ... than':
- **Formula:** **No sooner did + Subject + V1 ... than** OR **No sooner had + Subject + V3 ... than**
  - *Affirmative:* **As soon as** the teacher entered the classroom, the students stood up.
  - *Negative:* **No sooner did** the teacher **enter** the classroom **than** the students stood up.
  - *Alternative:* **No sooner had** the teacher **entered** the classroom **than** the students stood up.
  - *Warning:* Always use **'than'** with 'No sooner', NEVER 'when' or 'then'!

#### Method 4: Transforming 'Every' or 'All':
- Replace 'Every / All' with **'There is no ... but'** or **'No ... without'**:
  - *Affirmative:* **Every** rose has a thorn.
  - *Negative:* **There is no** rose **without** a thorn. (OR *There is no rose but has a thorn*).
  - *Affirmative:* Where there is smoke, there is fire.
  - *Negative:* There is **no smoke without fire**.

#### Method 5: By Using 'Fail to':
- *Affirmative:* I saw the Taj Mahal when I visited Agra.
- *Negative:* I **did not fail to see** the Taj Mahal when I visited Agra.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Interchange of Interrogative and Assertive Sentences",
      content: `### 1. The Nature of Rhetorical Questions
Questions transformed into assertive statements are typically **Rhetorical Questions**—questions asked not to obtain information, but to assert an obvious truth emphatically.

---

### 2. The Core Conversion Rule
- **Positive Interrogative Question** transforms into a **Negative Assertive Statement**.
- **Negative Interrogative Question** transforms into a **Positive (Affirmative) Assertive Statement**.

---

### 3. Key Patterns & Examples
#### Pattern 1: Auxiliary Question to Statement:
- *Question (Positive):* Can a leopard change its spots?
- *Assertive (Negative):* **A leopard cannot change its spots.**
- *Question (Negative):* Is not health more important than wealth?
- *Assertive (Positive):* **Health is more important than wealth.**
- *Question:* Was he not a great patriot?
- *Assertive:* **He was indeed a great patriot.**

#### Pattern 2: Questions Beginning with 'Who':
- **Who + Positive Verb?** -> converts to **Nobody / No one / None + Positive Verb**:
  - *Question:* **Who can touch** the sky with their hands?
  - *Assertive:* **Nobody can touch** the sky with their hands.
  - *Question:* **Who wants** to live in eternal misery?
  - *Assertive:* **No one wants** to live in eternal misery.
- **Who + Negative Verb (Who does not ...)?** -> converts to **Everyone / Everybody + Affirmative Verb**:
  - *Question:* **Who does not know** the name of Swami Vivekananda?
  - *Assertive:* **Everyone knows** the name of Swami Vivekananda.
  - *Question:* **Who does not wish** to be prosperous and happy?
  - *Assertive:* **Everybody wishes** to be prosperous and happy.

#### Pattern 3: Questions Beginning with 'What though' / 'Why':
- *Question:* **Why waste** precious time in idle gossip?
- *Assertive:* **It is foolish to waste** precious time in idle gossip. (OR *There is no point in wasting...*)
- *Question:* **What though** the field be lost?
- *Assertive:* **It matters little though** the field be lost.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Interchange of Exclamatory and Assertive Sentences",
      content: `### 1. General Principles
Exclamatory sentences express intense emotion or surprise, whereas Assertive sentences convey a calm, straightforward statement of fact:
1. Words expressing exclamation (*What a, How, Alas, Hurrah, O that, Would that*) are removed.
2. Intensive words like **'very', 'extremely', 'great', 'terrible', 'wonderful'** are introduced to preserve the emotional intensity.
3. The exclamation mark (!) is replaced by a full stop (.).

---

### 2. Standard Conversion Patterns
#### Pattern 1: 'What a / an' + Noun:
- When followed by a noun, 'What a' usually converts to **'a very / great / wonderful'**:
  - *Exclamatory:* **What a beautiful flower** this is!
  - *Assertive:* This is **a very beautiful flower**.
  - *Exclamatory:* **What a fool** you are!
  - *Assertive:* You are **a great fool**.
  - *Exclamatory:* **What a horrible sight** it was!
  - *Assertive:* It was **a terrible / very horrible sight**.

#### Pattern 2: 'How' + Adjective / Adverb:
- 'How' converts directly to **'very'** or **'extremely'**:
  - *Exclamatory:* **How melodiously** Lata Mangeshkar sings!
  - *Assertive:* Lata Mangeshkar sings **very melodiously**.
  - *Exclamatory:* **How fast** time flies!
  - *Assertive:* Time flies **very fast**.
  - *Exclamatory:* **How kind** of you to help us!
  - *Assertive:* It is **very kind** of you to help us.

#### Pattern 3: Unfulfilled Wishes ('O that', 'Would that', 'If only'):
- 'O that' or 'Would that' converts into **'I strongly wish that...'**:
  - *Exclamatory:* **O that** I were a bird!
  - *Assertive:* **I wish that** I were a bird.
  - *Exclamatory:* **Would that** I had listened to my parents' advice!
  - *Assertive:* **I earnestly wish that** I had listened to my parents' advice.

#### Pattern 4: Interjections of Joy/Grief ('Alas', 'Hurrah'):
- *Exclamatory:* **Alas!** We have lost our true guide.
- *Assertive:* **It is extremely sad that** we have lost our true guide.
- *Exclamatory:* **Hurrah!** We won the championship!
- *Assertive:* **It is a matter of great joy that** we won the championship.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Interchange of Degrees of Comparison & Simple/Compound/Complex",
      content: `### 1. Transformation of Degrees of Comparison
Adjectives and adverbs have three degrees: **Positive**, **Comparative**, and **Superlative**. We can express the same comparative relationship in all three forms:

#### Type A: Superlative with 'The + Superlative' (Unique Best):
- **Superlative:** Mount Everest is **the highest** peak in the world.
- **Comparative:** Mount Everest is **higher than any other** peak in the world.
  - *Formula:* Subject + Verb + Comparative + **than any other + Singular Noun**.
- **Positive:** **No other** peak in the world is **as high as** Mount Everest.
  - *Formula:* **No other + Singular Noun ... as/so + Positive + as + Subject**.

#### Type B: Superlative with 'One of the + Superlative' (Among the Best):
- **Superlative:** Raipur is **one of the cleanest** cities in Chhattisgarh.
- **Comparative:** Raipur is **cleaner than most other** cities in Chhattisgarh.
  - *Formula:* Subject + Verb + Comparative + **than most other / many other + Plural Noun**.
- **Positive:** **Very few** cities in Chhattisgarh are **as clean as** Raipur.
  - *Formula:* **Very few + Plural Noun ... are as + Positive + as + Subject**.

#### Type C: Comparison Between Exactly Two Entities:
- When only two entities are compared, **no superlative exists**; they interchange only between Positive and Comparative:
  - *Positive:* She is **as tall as** her brother.
  - *Comparative:* Her brother is **not taller than** her.
  - *Comparative:* Iron is **more useful than** gold.
  - *Positive:* Gold is **not so useful as** iron.

---

### 2. Mutual Conversion: Simple, Compound, and Complex
- **Simple to Compound**: Expand a phrase (participle/prepositional) into an independent clause with FANBOYS:
  - *Simple:* **Hearing the alarm**, the security guard woke up.
  - *Compound:* The security guard **heard the alarm, and** he woke up immediately.
- **Simple to Complex**: Expand a phrase into a subordinate clause:
  - *Simple:* He confessed **his crime**.
  - *Complex:* He confessed **that he had committed a crime**. (Noun clause).
  - *Simple:* I saw a **wounded soldier**.
  - *Complex:* I saw a soldier **who was wounded**. (Adjective clause).
- **Compound to Complex**: Replace coordinating conjunctions with subordinating conjunctions:
  - *Compound:* Work hard, **or** you will fail.
  - *Complex:* **If** you do not work hard, you will fail. (OR *Unless you work hard...*)
  - *Compound:* He was poor, **yet** he remained contented.
  - *Complex:* **Although** he was poor, he remained contented.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Degrees of Comparison Transformation Reference Chart",
      headers: ["Comparison Category", "Positive Degree Format", "Comparative Degree Format", "Superlative Degree Format"],
      rows: [
        ["Unique Superlative ('The best')", "No other + Singular Noun ... as + adj + as", "Comparative + than any other + Singular Noun", "The + Superlative + Singular Noun"],
        ["Example (Unique)", "No other river in India is as sacred as the Ganga.", "The Ganga is more sacred than any other river in India.", "The Ganga is the most sacred river in India."],
        ["Shared Superlative ('One of the best')", "Very few + Plural Noun ... are as + adj + as", "Comparative + than most other + Plural Noun", "One of the + Superlative + Plural Noun"],
        ["Example (Shared)", "Very few leaders were as visionary as Nehru.", "Nehru was more visionary than most other leaders.", "Nehru was one of the most visionary leaders."],
        ["Two Entities Compared", "Not as/so + adj + as (if comparative is affirmative)", "Comparative + than (if positive is negative)", "No Superlative Degree Possible"]
      ]
    },
    {
      tableId: "tab_2",
      title: "Affirmative to Negative Transformation Patterns",
      headers: ["Affirmative Construct", "Mandatory Negative Transformation Template", "Affirmative Example", "Transformed Negative Example"],
      rows: [
        ["Too + adj + to + V1", "So + adj + that + S + cannot / could not + V1", "He is too weak to run.", "He is so weak that he cannot run."],
        ["As soon as", "No sooner did ... than / No sooner had ... than", "As soon as he saw us, he fled.", "No sooner did he see us than he fled."],
        ["Only / Alone (Person)", "None but + Person", "Only Ramesh can do this.", "None but Ramesh can do this."],
        ["Only (Thing / Inanimate)", "Nothing but + Thing", "He ate only fruits.", "He ate nothing but fruits."],
        ["Every + Noun", "There is no + Noun + without / but", "Every mother loves her child.", "There is no mother who does not love her child."],
        ["Always + V1", "Never + opposite V1 / antonym", "He always speaks the truth.", "He never tells a lie."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Interchange Between Simple, Compound, and Complex Forms",
      headers: ["Grammatical Relationship", "Simple Sentence Form", "Compound Sentence Form", "Complex Sentence Form"],
      rows: [
        ["Condition (Positive)", "In case of working hard, you will succeed.", "Work hard, and you will succeed.", "If you work hard, you will succeed."],
        ["Condition (Negative)", "Without working hard, you cannot pass.", "Work hard, or you will fail.", "Unless you work hard, you will fail."],
        ["Contrast / Concession", "In spite of being poor, he is honest.", "He is poor, yet he is honest.", "Although he is poor, he is honest."],
        ["Time Sequence", "On hearing the whistle, the train started.", "The driver heard the whistle, and the train started.", "When the driver heard the whistle, the train started."],
        ["Cause and Effect", "Owing to illness, he was absent.", "He was ill, so he was absent.", "As he was ill, he was absent."]
      ]
    }
  ],
  pyqs: [
    {
      question: "Transform the sentence by removing 'too': 'He is too poor to pay his admission fees.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) He is so poor that he can pay his admission fees.",
        "B) He is so poor that he cannot pay his admission fees.",
        "C) He was so poor that he could not pay his admission fees.",
        "D) He is very poor and cannot pay his fees."
      ],
      correctAnswer: "B) He is so poor that he cannot pay his admission fees.",
      explanation: "The verb 'is' is in the Present Tense, so 'too ... to' transforms into 'so ... that + subject + cannot + V1'. Option C incorrectly changes the tense to 'could not'; Option A omits 'not'."
    },
    {
      question: "Change into negative without changing the meaning: 'As soon as the bell rang, the students left the classroom.' [CG Vyapam Patwari Exam]",
      options: [
        "A) No sooner did the bell ring when the students left the classroom.",
        "B) No sooner did the bell ring than the students left the classroom.",
        "C) No sooner had the bell rung then the students left the classroom.",
        "D) As soon as the bell did not ring, the students left."
      ],
      correctAnswer: "B) No sooner did the bell ring than the students left the classroom.",
      explanation: "'As soon as' transforms into 'No sooner did + Subject + V1 ... than'. The correlative pair is strictly 'No sooner ... than'. Option A wrongly uses 'when', and Option C wrongly uses 'then'."
    },
    {
      question: "Transform into assertive sentence: 'Who can touch the sky?' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) Everyone can touch the sky.",
        "B) Someone can touch the sky.",
        "C) Nobody can touch the sky.",
        "D) Can anyone touch the sky?"
      ],
      correctAnswer: "C) Nobody can touch the sky.",
      explanation: "A positive rhetorical question beginning with 'Who' transforms into a negative assertive statement using 'Nobody' or 'No one'. Thus, 'Nobody can touch the sky' is the exact equivalent."
    },
    {
      question: "Change the degree of comparison into Positive: 'Iron is more useful than any other metal.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Very few metals are as useful as iron.",
        "B) No other metal is as useful as iron.",
        "C) Iron is the most useful of all metals.",
        "D) Some metals are as useful as iron."
      ],
      correctAnswer: "B) No other metal is as useful as iron.",
      explanation: "The comparative format 'Comparative + than any other + Singular Noun' transforms into the positive format 'No other + Singular Noun + is as + Positive + as + Subject'. Therefore, 'No other metal is as useful as iron' is the correct transformation."
    },
    {
      question: "Transform the simple sentence into a complex sentence: 'I saw a wounded bird in the garden.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) I saw a bird, and it was wounded in the garden.",
        "B) I saw a bird which was wounded in the garden.",
        "C) A wounded bird was seen by me in the garden.",
        "D) Being wounded, I saw a bird in the garden."
      ],
      correctAnswer: "B) I saw a bird which was wounded in the garden.",
      explanation: "To turn a simple sentence into a complex sentence, the adjective 'wounded' qualifying 'bird' is expanded into an adjective (relative) clause: 'which was wounded'. Option A is compound; Option C is passive voice (still simple)."
    },
    {
      question: "Change into affirmative: 'None but the brave deserve the fair.' [CG Vyapam ADEO Exam]",
      options: [
        "A) Only the brave deserve the fair.",
        "B) Everyone deserves the fair.",
        "C) The brave do not deserve the fair.",
        "D) Nobody deserves the fair."
      ],
      correctAnswer: "A) Only the brave deserve the fair.",
      explanation: "'None but' is the negative equivalent of 'Only' or 'Alone' when referring to persons. Therefore, the affirmative transformation is 'Only the brave deserve the fair'."
    }
  ],
  mcqs: [
    {
      question: "Transform into negative: 'Every rose has a thorn.'",
      options: [
        "A) No rose has a thorn.",
        "B) There is no rose without a thorn.",
        "C) Roses do not have thorns.",
        "D) All roses have thorns."
      ],
      correctAnswer: "B) There is no rose without a thorn.",
      explanation: "The standard transformation for 'Every + Noun' is 'There is no + Noun + without'. This preserves the exact meaning while using the negative word 'no'."
    },
    {
      question: "Transform into exclamatory: 'It is a very lovely sunset.'",
      options: [
        "A) What a lovely sunset it is!",
        "B) How lovely sunset is it!",
        "C) What lovely sunset!",
        "D) Is it not a lovely sunset!"
      ],
      correctAnswer: "A) What a lovely sunset it is!",
      explanation: "The assertive pattern 'It is a very + adjective + noun' transforms into 'What a + adjective + noun + Subject + Verb!': 'What a lovely sunset it is!'."
    },
    {
      question: "Transform by removing 'too': 'The news was too good to be true.'",
      options: [
        "A) The news was so good that it cannot be true.",
        "B) The news was so good that it could not be true.",
        "C) The news was so good that it might be true.",
        "D) The news is so good that it could not be true."
      ],
      correctAnswer: "B) The news was so good that it could not be true.",
      explanation: "Since the main verb 'was' is in the Past Tense, the subordinate clause requires 'could not': 'The news was so good that it could not be true'."
    },
    {
      question: "Change into comparative degree: 'Very few poets of Chhattisgarh were as famous as Mukutdhar Pandey.'",
      options: [
        "A) Mukutdhar Pandey was more famous than any other poet of Chhattisgarh.",
        "B) Mukutdhar Pandey was more famous than most other poets of Chhattisgarh.",
        "C) Mukutdhar Pandey was the most famous poet of Chhattisgarh.",
        "D) No other poet of Chhattisgarh was as famous as Mukutdhar Pandey."
      ],
      correctAnswer: "B) Mukutdhar Pandey was more famous than most other poets of Chhattisgarh.",
      explanation: "'Very few + plural noun ... as ... as' indicates a shared superlative ('one of the most famous'), which transforms into the comparative using 'than most other + plural noun'."
    },
    {
      question: "Transform the compound sentence into a complex sentence: 'Spare the rod and spoil the child.'",
      options: [
        "A) If you spare the rod, you will spoil the child.",
        "B) By sparing the rod, the child is spoiled.",
        "C) Sparing the rod spoils the child.",
        "D) Either spare the rod or spoil the child."
      ],
      correctAnswer: "A) If you spare the rod, you will spoil the child.",
      explanation: "The compound proverb joined by 'and' expresses a conditional relationship, which converts into a complex sentence using the subordinating conjunction 'If'."
    },
    {
      question: "Convert the assertive into interrogative: 'Nobody can escape destiny.'",
      options: [
        "A) Can somebody escape destiny?",
        "B) Who can escape destiny?",
        "C) Can anybody not escape destiny?",
        "D) Why can nobody escape destiny?"
      ],
      correctAnswer: "B) Who can escape destiny?",
      explanation: "A negative statement beginning with 'Nobody' or 'No one' transforms into a rhetorical question beginning with 'Who': 'Who can escape destiny?'."
    },
    {
      question: "Transform into negative: 'I was doubtful whether he would attend the party.'",
      options: [
        "A) I was not sure that he would attend the party.",
        "B) I was not doubtful if he would attend the party.",
        "C) I did not know whether he would attend the party.",
        "D) He did not attend the party."
      ],
      correctAnswer: "A) I was not sure that he would attend the party.",
      explanation: "'Doubtful' is the antonym of 'sure / certain'. Replacing 'doubtful' with 'not sure' creates a perfect negative transformation while retaining the original meaning."
    },
    {
      question: "Transform the simple sentence into compound: 'Besides being punished, he was fined.'",
      options: [
        "A) He was not only punished but also fined.",
        "B) When he was punished, he was fined.",
        "C) Although he was punished, he was fined.",
        "D) Because he was punished, he was fined."
      ],
      correctAnswer: "A) He was not only punished but also fined.",
      explanation: "'Besides being...' expresses cumulative addition, which converts into a compound sentence using the correlative coordinating conjunction 'not only ... but also'."
    }
  ],
  keyTerminology: [
    {
      term: "Transformation of Sentences",
      definition: "Changing the grammatical structure of a sentence from one form to another without modifying its underlying meaning or message."
    },
    {
      term: "Rhetorical Question",
      definition: "A question asked to make an emphatic assertion or rhetorical point rather than to elicit factual information."
    },
    {
      term: "Correlative Pair",
      definition: "Paired conjunctions used together to connect grammatically equal elements (e.g., 'No sooner ... than', 'Not only ... but also')."
    },
    {
      term: "Inversion",
      definition: "The syntactical placement of the auxiliary verb before the subject, mandatory in constructions like 'No sooner did he arrive...'"
    },
    {
      term: "Double Negative",
      definition: "A grammatical device where two negative elements cancel each other out to produce an affirmative meaning (e.g., 'not impossible' = 'possible')."
    },
    {
      term: "Positive Degree",
      definition: "The base form of an adjective or adverb describing a quality without direct comparison, framed as 'as ... as' or 'so ... as'."
    },
    {
      term: "Comparative Degree",
      definition: "The form of an adjective or adverb used to compare two entities, typically framed with '-er / more' and followed by 'than'."
    },
    {
      term: "Superlative Degree",
      definition: "The form of an adjective or adverb expressing the highest degree of a quality among three or more entities, preceded by 'the'."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapters 14 to 18 on 'Transformation of Sentences', covering 'too ... to', Degrees of Comparison, Affirmative-Negative, and Interrogative-Assertive."
    },
    {
      title: "English Grammar in Use",
      author: "Raymond Murphy (Cambridge University Press)",
      details: "Units on comparative structures, conjunctions, and sentence rephrasing."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Sections on inversion after 'no sooner', degrees of comparison, and rhetorical questions."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Official previous year question papers from Patwari, RI, Hostel Warden, and Teacher examinations."
    }
  ],
  confusionBuster: [
    {
      concept: "No sooner ... than vs when",
      confusion: "Using 'when' or 'then' with 'No sooner'.",
      clarity: "'No sooner' is a comparative adverb and MUST strictly take 'than' ('No sooner did he leave than it rained'). 'Scarcely' and 'Hardly' take 'when' ('Hardly had he left when it rained')."
    },
    {
      concept: "Too ... to: Present vs Past Tense",
      confusion: "Using 'could not' for present tense or 'cannot' for past tense.",
      clarity: "Match the auxiliary to the main tense! If the original has 'is/are', use 'cannot' ('is so weak that he cannot'). If it has 'was/were', use 'could not' ('was so weak that he could not')."
    },
    {
      concept: "Any other vs Most other in Comparative Degree",
      confusion: "Using 'any other' when superlative has 'one of the'.",
      clarity: "'The + Superlative' transforms to 'than ANY OTHER + singular noun'. 'One of the + Superlative' transforms to 'than MOST OTHER + plural noun'."
    },
    {
      concept: "Only: Person vs Inanimate Thing",
      confusion: "Using 'None but' for things or 'Nothing but' for people.",
      clarity: "Use 'None but' exclusively for people/God ('None but the brave'). Use 'Nothing but' for non-living objects/things ('He ate nothing but bread')."
    },
    {
      concept: "Meaning Preservation in Transformation",
      confusion: "Confusing sentence transformation with changing voice or narration.",
      clarity: "Transformation must never change the tense or original statement of fact. If an affirmative sentence is true, its transformed negative version must assert the exact same truth."
    }
  ],
  faqList: [
    {
      question: "Can two people be compared using the Superlative Degree?",
      answer: "No. The Superlative Degree is used only when comparing three or more entities. When comparing exactly two entities, only Positive and Comparative degrees are grammatically possible."
    },
    {
      question: "Why does 'No sooner did he enter...' have 'enter' instead of 'entered'?",
      answer: "Because 'did' is already the past tense auxiliary of 'do'. In standard English, 'did' is always followed by the base form of the verb (V1), hence 'did he enter', NOT 'did he entered'."
    },
    {
      question: "What is the negative transformation of 'I love you'?",
      answer: "Using an antonym: 'I am not without love for you' or 'I do not hate you' (though contextually, 'I do not fail to love you' or 'I am not devoid of love for you' preserves intensity)."
    },
    {
      question: "How do we remove 'too' when there is no infinitive?",
      answer: "Replace 'too' with words like 'extremely', 'excessively', 'over', or the phrase 'beyond the proper limit' (e.g., 'He is too hot-tempered' -> 'He is excessively hot-tempered')."
    },
    {
      question: "Why does 'Unless you work hard, you will fail' have no 'not' in the unless clause?",
      answer: "'Unless' inherently means 'if ... not'. Adding 'not' inside an 'unless' clause creates an incorrect double negative. The correct form is 'Unless you work hard...' (meaning 'If you do not work hard...')."
    }
  ],
  oneLinerRevision: [
    "Transformation of a sentence changes its syntactical form without altering its core meaning.",
    "'Too + adj + to + V1' transforms to 'so + adj + that + S + cannot / could not + V1'.",
    "'No sooner' is always paired with 'than', never with 'when' or 'then'.",
    "After 'No sooner did', the subject is followed by the base verb form V1 (bare infinitive).",
    "Replace 'Only / Alone' with 'None but' for persons, and with 'Nothing but' for things.",
    "A positive rhetorical question converts into a negative assertive statement and vice-versa.",
    "'The + Superlative' transforms to 'Comparative + than any other + Singular Noun'.",
    "'One of the + Superlative' transforms to 'Comparative + than most other + Plural Noun'.",
    "When comparing only two entities, no superlative degree can be formed.",
    "'Unless' contains negative meaning ('if not'); never place 'not' inside an 'unless' clause."
  ],
  rapidRevision: {
    points: [
      "Cardinal Rule: Form changes, meaning remains identical.",
      "Too...to: is too -> is so...that cannot; was too -> was so...that could not.",
      "As soon as: As soon as -> No sooner did + S + V1 ... than.",
      "Only/Alone: Person -> None but; Thing -> Nothing but; Number -> Not more than.",
      "Questions: Positive Question -> Negative Assertion; Negative Question -> Positive Assertion.",
      "Degrees (Unique): The best = better than any other = no other is as good as.",
      "Degrees (Shared): One of the best = better than most other = very few are as good as."
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
