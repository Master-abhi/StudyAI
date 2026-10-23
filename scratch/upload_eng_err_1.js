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
  id: "cgv_master_eng_err_1",
  topicId: "eng_err_1",
  chapterId: "cgv_master_sub_6_ch_8",
  subjectId: "cgv_master_sub_6",
  title: "Grammatical Errors",
  subtitle: "Comprehensive Guide to Error Spotting Rules, Common Traps & High-Yield Checklists for CG Vyapam",
  overview: {
    introduction: "Error Detection (commonly termed 'Spotting the Error') is the quintessential testing format in competitive English examinations. A sentence is divided into three or four slash-delimited segments—labeled (A), (B), (C), and (D) for 'No Error'—and candidates must identify the segment that violates standard English grammar, syntax, idiom, or vocabulary. Error spotting tests the synthesized application of all grammatical rules across eight core domains: (1) Subject-Verb Agreement; (2) Tense consistency and sequence; (3) Noun and Pronoun case and concord; (4) Prepositional usage and non-prepositional transitive verbs; (5) Correlative conjunction pairs and inverted syntax; (6) Adjective and Adverb degree errors; (7) Redundancy and superfluous expressions; and (8) Dangling modifiers and unparallel constructions.",
    importance: "In CG Vyapam competitive examinations—including Hostel Warden, Revenue Inspector (RI), Patwari, Sub Inspector, ADEO, Teacher, and Lab Assistant exams—Error Detection constitutes a high-weightage, mandatory topic. Between 2 to 4 questions per paper test spotting errors. Because questions simulate real-world editing of administrative correspondence, mastery of error detection ensures high accuracy and boosts scores across the entire English section.",
    examRelevance: "CG Vyapam questions on Grammatical Errors focus on: (1) Uncountable nouns incorrectly pluralized (*sceneries, furnitures, informations, advices*); (2) Redundant expressions (*revert back, enter into, return back, cousin sister*); (3) Faulty correlative pairs (*hardly...than* instead of *hardly...when*); (4) Transitive verbs wrongly accompanied by prepositions (*discuss about, ordered for*); (5) Subject-verb concord when subjects are separated by parenthetical phrases (*as well as, along with, with*); (6) Conditional sentence tense errors (*If he will come, I will help him*).",
    quickFacts: [
      { label: "Core Question Format", value: "Sentence divided into segments (A), (B), (C) with (D) as 'No Error'" },
      { label: "Eight-Point Checklist", value: "Subject-Verb -> Tense -> Pronouns -> Conjunctions -> Prepositions -> Adjectives -> Redundancy" },
      { label: "Redundancy Law", value: "Expressions like 'revert back', 'return back', and 'enter into' (for places) are severe grammatical errors" },
      { label: "Correlative Conjunctions", value: "Hardly/Scarcely takes 'when'; No sooner takes 'than'; Lest takes 'should'" },
      { label: "Uncountable Noun Rule", value: "Nouns like 'information', 'furniture', 'advice', and 'scenery' have NO plural form" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Systematic 8-Step Protocol for Spotting Errors",
      content: `### 1. The Methodical Error-Spotting Strategy
Rather than reading a sentence haphazardly or relying on vague 'instinct', follow this systematic 8-step diagnostic protocol:

1. **Step 1: Check Subject-Verb Concord**:
   - Locate the true subject and its finite verb.
   - Ignore intervening prepositional phrases (e.g., *'The quality of these mangoes is good', NOT 'are good'*).
2. **Step 2: Check Tense Consistency & Sequence**:
   - Verify if past time markers (*yesterday, in 2020, ago*) are wrongly paired with Present Perfect (*has/have + V3*).
   - In conditional sentences, check that 'will/shall' is not placed inside the 'if' clause.
3. **Step 3: Check Nouns & Uncountable Quantifiers**:
   - Check if uncountable abstract/mass nouns (*furniture, advice, information, scenery*) have been illegally pluralized with '-s'.
4. **Step 4: Check Pronoun Case & Agreement**:
   - Verify subjective vs objective case (*'between you and me', NOT 'between you and I'*).
   - Ensure singular indefinite pronouns (*everybody, someone*) agree with singular pronouns in assertive sentences (*'Everyone must do his duty'*).
5. **Step 5: Check Correlative Conjunction Pairing**:
   - Verify correct pairs: *No sooner ... than*, *Hardly ... when*, *Scarcely ... when*, *Not only ... but also*, *Neither ... nor*, *Lest ... should*.
6. **Step 6: Check Transitive Verbs & Prepositions**:
   - Look for verbs that take NO preposition (*discuss, describe, reach, attack, order, enter*).
7. **Step 7: Check Modifiers & Degrees of Comparison**:
   - Eliminate double comparatives (*more better*) or double superlatives (*most highest*).
   - Check *few vs little* and *elder vs older*.
8. **Step 8: Check for Redundancy & Superfluous Words**:
   - Spot duplicate meaning phrases (*revert back, repeat again, cousin brother*).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Noun, Pronoun & Subject-Verb Agreement Errors",
      content: `### 1. High-Yield Noun Errors
1. **Uncountable Nouns Erroneously Pluralized**:
   - The following nouns are uncountable in standard English; they **never take an indefinite article ('a/an') and never take '-s/-es'**:
     - *Advice, Information, Furniture, Scenery, Poetry, Luggage, Baggage, Machinery, Work, Paper, Bread, Hair*.
     - *Incorrect:* The sceneries of Bastar are enchanting.
     - *Correct:* The **scenery of Bastar is** enchanting.
     - *Incorrect:* He gave me many valuable advices.
     - *Correct:* He gave me **much valuable advice** (OR *many pieces of advice*).
2. **Nouns Plural in Form but Singular in Meaning**:
   - *News, Mathematics, Physics, Economics, Civics, Politics, Ethics, Measles, Mumps, Rickets, Innings, Billiards*.
   - *Incorrect:* Politics are a dirty game.
   - *Correct:* Politics **is** a dirty game.
   - *Exception:* When 'Mathematics' or 'Statistics' denotes calculations/data, it takes a plural verb (*'His mathematics are weak'*).

---

### 2. High-Yield Pronoun Errors
1. **Pronoun Case After Prepositions**:
   - Prepositions take the **objective case** of pronouns (*me, us, him, her, them*), NEVER the subjective case (*I, we, he, she, they*):
     - *Incorrect:* There is a secret between you and I.
     - *Correct:* There is a secret between you and **me**.
     - *Incorrect:* Let he do the work.
     - *Correct:* Let **him** do the work.
2. **Pronoun Case After 'Than' and 'As'**:
   - When comparing subjects, use the subjective case:
     - *Correct:* She is taller than **I** (am). (NOT *than me* in formal grammar).
3. **Relative Pronoun 'Who' vs 'Whom'**:
   - 'Who' functions as the subject; 'Whom' functions as the object:
     - *Incorrect:* The man whom came yesterday is my uncle.
     - *Correct:* The man **who came** yesterday is my uncle.

---

### 3. Subject-Verb Agreement Traps
1. **Parenthetical Connectives**:
   - When subjects are joined by *as well as, along with, together with, with, in addition to, accompanied by, like, unlike, besides, except*:
   - The verb agrees with the **FIRST SUBJECT**:
     - *Incorrect:* The Collector, along with his officers, were present.
     - *Correct:* The Collector, along with his officers, **was** present.
2. **Proximity Rule with Either...or / Neither...nor**:
   - When subjects are connected by *either...or, neither...nor, not only...but also, or, nor*:
   - The verb agrees with the **NEAREST SUBJECT**:
     - *Correct:* Neither the teacher nor the **students were** present.
     - *Correct:* Neither the students nor the **teacher was** present.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Tense & Conditional Sentence Errors",
      content: `### 1. Tense Sequence with Past Time Markers (Super High-Yield!)
- When a sentence contains a specific past time adverb (*yesterday, last night, two years ago, in 1947, in ancient times*), the verb MUST be in the **Simple Past (V2)**, NEVER in the Present Perfect (*has/have + V3*):
  - *Incorrect:* India has won freedom in 1947.
  - *Correct:* India **won** freedom in 1947.
  - *Incorrect:* I have seen him yesterday at the bus stand.
  - *Correct:* I **saw** him yesterday at the bus stand.

---

### 2. The Three Conditional Sentence Formulas (Tested Repeatedly!)
Examiners frequently place modal verbs ('will', 'would') inside the conditional 'if' clause:

1. **Type 1: Open / Real Present Condition**:
   - **Formula:** **If + Simple Present (V1) ... will / shall / can + V1**
   - *Incorrect:* If it will rain, we will postpone the match.
   - *Correct:* **If it rains**, we will postpone the match.
2. **Type 2: Hypothetical / Unreal Present Condition**:
   - **Formula:** **If + Simple Past (V2 / were) ... would / could + V1**
   - *Incorrect:* If I will be a king, I would help the poor.
   - *Correct:* **If I were** a king, I **would help** the poor.
3. **Type 3: Unfulfilled Past Condition**:
   - **Formula:** **If + Past Perfect (had + V3) ... would have / could have + V3**
   - *Incorrect:* If you worked hard, you would have passed the exam.
   - *Correct:* **If you had worked hard**, you **would have passed** the exam.
   - *Incorrect:* If you had informed me, I would inform the police.
   - *Correct:* If you had informed me, I **would have informed** the police.

---

### 3. 'Since' as a Time Conjunction
- When 'since' connects two clauses indicating a starting point in time:
  - **Main Clause: Present Perfect (has/have + V3) + since + Subordinate Clause: Simple Past (V2)**:
  - *Incorrect:* Five years have passed since my brother has left for Delhi.
  - *Correct:* Five years have passed since my brother **left** for Delhi.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Adjective, Adverb & Modifier Errors",
      content: `### 1. Double Comparatives and Superlatives
- In English grammar, double comparative or double superlative forms are strictly prohibited:
  - *Incorrect:* He is **more taller** than his brother.
  - *Correct:* He is **taller** than his brother.
  - *Incorrect:* She is the **most cleverest** girl in the class.
  - *Correct:* She is the **cleverest** girl in the class.

---

### 2. Absolute Adjectives (Non-Gradable)
- Certain adjectives denote absolute, ungradable qualities. They **CANNOT be preceded by 'more', 'most', 'very', 'less'**:
  - *Unique, Perfect, Universal, Complete, Dead, Entire, Eternal, Round, Square, Supreme, Paramount*.
  - *Incorrect:* This is the most unique architectural temple in Chhattisgarh.
  - *Correct:* This is a **unique** architectural temple in Chhattisgarh.

---

### 3. Confusing Adjective Pairs
1. **Elder / Eldest vs Older / Oldest**:
   - **Elder / Eldest**: Used exclusively for members of the **same immediate family**; never followed by 'than'.
     - *Correct:* Ramesh is my **elder brother**. (NOT *older brother*).
   - **Older / Oldest**: Used for persons outside the family and inanimate objects; followed by 'than'.
     - *Correct:* Suresh is **older than** Mohan. / This is the **oldest** banyan tree.
2. **Farther vs Further**:
   - **Farther**: Refers to physical distance.
     - *Correct:* Raipur is **farther** from Delhi than Nagpur is.
   - **Further**: Refers to additional, extra, or subsequent development.
     - *Correct:* We await **further** instructions from the directorate.
3. **Few / A few vs Little / A little**:
   - *Few* modifies countable plural nouns (*few books*).
   - *Little* modifies uncountable nouns (*little water*).

---

### 4. Position of the Adverb 'Only'
- The adverb 'only' must be placed immediately before the word it modifies:
  - *Ambiguous:* She only ate an apple. (Implies she did nothing else, didn't wash it).
  - *Precise:* She ate **only an apple**. (She ate nothing else).`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Preposition, Conjunction & Redundancy Traps",
      content: `### 1. Transitive Verbs That Take NO Preposition (CRITICAL FOR VYAPAM!)
Certain transitive verbs govern their objects directly. Adding a preposition after them is a classic examination error:
1. **Discuss / Describe**:
   - *Incorrect:* We discussed about the examination pattern.
   - *Correct:* We **discussed the examination pattern**.
2. **Order**:
   - *Incorrect:* He ordered for a cup of tea.
   - *Correct:* He **ordered a cup of tea**.
3. **Enter**:
   - *Incorrect:* The Collector entered into the meeting room.
   - *Correct:* The Collector **entered the meeting room**.
   - *(Note: 'Enter into' is valid only for figurative agreements: 'entered into a contract').*
4. **Resemble**:
   - *Incorrect:* She resembles with her mother.
   - *Correct:* She **resembles her mother**.
5. **Attack / Approach / Reach / Marry**:
   - *Incorrect:* The enemy attacked on the fort.
   - *Correct:* The enemy **attacked the fort**.
   - *Incorrect:* The train reached at the platform.
   - *Correct:* The train **reached the platform**.

---

### 2. Correlative Conjunction Pairing Traps
- **Hardly / Scarcely** is paired with **WHEN** (or *before*), NEVER with *than* or *then*:
  - *Incorrect:* Hardly had he arrived than the rain started.
  - *Correct:* Hardly had he arrived **when** the rain started.
- **No sooner** is paired with **THAN**, NEVER with *when* or *then*:
  - *Incorrect:* No sooner did the bell ring when students left.
  - *Correct:* No sooner did the bell ring **than** students left.
- **Lest** is paired with **SHOULD** (and never takes a negative word):
  - *Incorrect:* Run fast lest you will miss the train.
  - *Correct:* Run fast **lest you should miss** the train.

---

### 3. Redundancy & Superfluous Expressions (Vocabulary Glitches)
Examiners deliberately plant words that repeat meanings redundantly:
1. *Incorrect:* Please **revert back** to my email.
   - *Correct:* Please **revert** to my email. (Revert already means reply back).
2. *Incorrect:* He **returned back** to Raipur yesterday.
   - *Correct:* He **returned** to Raipur yesterday.
3. *Incorrect:* She is my **cousin sister**.
   - *Correct:* She is my **cousin**. (Use 'cousin' alone for both male and female relatives).
4. *Incorrect:* I met him **at 8:00 AM in the morning**.
   - *Correct:* I met him **at 8:00 AM** (OR *at eight in the morning*).
5. *Incorrect:* He did not pay the **passing marks**.
   - *Correct:* He did not secure the **pass marks**.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master Checklist of Top 20 Error Patterns in CG Vyapam",
      headers: ["Grammar Category", "Common Erroneous Construction", "Grammatically Correct Standard", "Underlying Rule"],
      rows: [
        ["Uncountable Nouns", "He provided all the informations.", "He provided all the information.", "Uncountable nouns take no plural '-s'"],
        ["Subject-Verb Concord", "The quality of the mangoes are good.", "The quality of the mangoes is good.", "Verb agrees with head noun 'quality'"],
        ["Parenthetical Subjects", "The teacher as well as students are happy.", "The teacher as well as students is happy.", "Verb agrees with first subject 'teacher'"],
        ["Correlative Conjunction", "Hardly had I left than it rained.", "Hardly had I left when it rained.", "'Hardly' must be paired with 'when'"],
        ["Negative Conjunction", "No sooner did he come when they cheered.", "No sooner did he come than they cheered.", "'No sooner' must be paired with 'than'"],
        ["Past Time Markers", "I have passed the exam in 2021.", "I passed the exam in 2021.", "Definite past year requires Simple Past V2"],
        ["Conditional Sentences", "If it will rain, we will not come.", "If it rains, we will not come.", "No 'will' inside conditional 'if' clause"],
        ["Transitive Verbs", "We discussed about the problem.", "We discussed the problem.", "'Discuss' takes no preposition 'about'"],
        ["Transitive Verbs", "He ordered for three cups of tea.", "He ordered three cups of tea.", "'Order' takes direct noun object without 'for'"],
        ["Prepositional Pairs", "Despite of his poverty, he is honest.", "In spite of his poverty, he is honest.", "Never use 'of' after 'despite'"],
        ["Adjective Comparison", "Ramesh is elder than his cousin.", "Ramesh is older than his cousin.", "'Elder' cannot be followed by 'than'"],
        ["Absolute Adjectives", "This is the most unique artifact.", "This is a unique artifact.", "'Unique' is ungradable; cannot take 'most'"],
        ["Pronoun Case", "Between you and I, there are no secrets.", "Between you and me, there are no secrets.", "Prepositions require objective pronoun case"],
        ["Superfluous Words", "Kindly revert back with the file.", "Kindly revert with the file.", "'Revert' already means turn/send back"],
        ["Family Relations", "She is my cousin sister from Durg.", "She is my cousin from Durg.", "Never attach 'brother' or 'sister' to 'cousin'"]
      ]
    },
    {
      tableId: "tab_2",
      title: "Redundant / Superfluous Expressions vs Correct English Equivalents",
      headers: ["Erroneous Redundant Phrase", "Correct Standard Equivalent", "Explanation of Inherent Duplication"],
      rows: [
        ["Revert back", "Revert / Reply", "'Re-' prefix already denotes back/again."],
        ["Return back", "Return", "'Return' already signifies coming back."],
        ["Repeat again", "Repeat", "'Repeat' already means saying something again."],
        ["Cousin brother / sister", "Cousin", "English gender is inferred via name or pronoun."],
        ["Blend together", "Blend", "Blending inherently means combining together."],
        ["Consensus of opinion", "Consensus", "'Consensus' inherently means collective opinion."],
        ["Period of three months", "Three months", "'Three months' is already a time period."],
        ["Past history", "History", "All history is inherently of the past."],
        ["Passing marks", "Pass marks", "The standard examination noun is 'pass marks'."],
        ["Link together", "Link", "Linking inherently connects two entities."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Transitive Verbs Requiring NO Preposition Reference Table",
      headers: ["Transitive Verb", "Incorrect Usage (With Preposition)", "Correct Standard Usage", "Contextual Example"],
      rows: [
        ["Discuss", "Discuss about the bill (INCORRECT)", "Discuss the bill", "The Assembly discussed the bill for three hours."],
        ["Describe", "Describe about the incident (INCORRECT)", "Describe the incident", "The witness described the incident clearly."],
        ["Order", "Order for dinner (INCORRECT)", "Order dinner", "They ordered dinner at the restaurant."],
        ["Enter", "Enter into the chamber (INCORRECT)", "Enter the chamber", "The judge entered the chamber."],
        ["Reach", "Reach at Raipur (INCORRECT)", "Reach Raipur", "The train reached Raipur on schedule."],
        ["Resemble", "Resemble with father (INCORRECT)", "Resemble father", "The boy resembles his father closely."],
        ["Attack", "Attack on the enemy (INCORRECT)", "Attack the enemy", "The army attacked the enemy post."]
      ]
    }
  ],
  pyqs: [
    {
      question: "Find the part of the sentence containing an error: 'The sceneries of Kashmir (A) / are more beautiful (B) / than that of Shimla (C) / No error (D)' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "A) Part A",
      explanation: "'Scenery' is an uncountable noun in English and has no plural form. Writing 'sceneries' is grammatically incorrect. Part A must be corrected to 'The scenery of Kashmir'. Consequently, Part B should also use the singular verb 'is'."
    },
    {
      question: "Identify the error segment: 'Hardly had I (A) / reached the station (B) / than the train departed (C) / No error (D)' [CG Vyapam Patwari Exam]",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "C) Part C",
      explanation: "The correlative adverb 'Hardly' is always paired with 'when' (or 'before'), never with 'than'. 'Than' is used only with 'No sooner'. Part C is erroneous and must be corrected to 'when the train departed'."
    },
    {
      question: "Spot the error: 'The Chairman, as well as (A) / the committee members, (B) / were present at the meeting (C) / No error (D)' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "C) Part C",
      explanation: "When two subjects are joined by 'as well as', the verb must agree with the first subject. Since 'The Chairman' (first subject) is singular, Part C must use the singular verb 'was present' instead of 'were present'."
    },
    {
      question: "Find the error: 'He has passed (A) / the examination (B) / two years ago (C) / No error (D)' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "A) Part A",
      explanation: "The time expression 'two years ago' denotes a completed past time, which requires the Simple Past tense (V2). The Present Perfect 'has passed' in Part A is incorrect and must be replaced by 'passed'."
    },
    {
      question: "Identify the erroneous part: 'We discussed about (A) / the development schemes (B) / with the district collector (C) / No error (D)' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "A) Part A",
      explanation: "'Discuss' is a transitive verb that directly takes its object without the preposition 'about'. Part A must be corrected to 'We discussed the development schemes'."
    },
    {
      question: "Find the error: 'Unless you do not (A) / work hard, (B) / you will not succeed (C) / No error (D)' [CG Vyapam ADEO Exam]",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "A) Part A",
      explanation: "'Unless' inherently means 'if not' and contains negative meaning. Adding 'do not' creates an ungrammatical double negative. Part A must be corrected to 'Unless you work hard'."
    }
  ],
  mcqs: [
    {
      question: "Spot the error in the sentence: 'She is (A) / more taller than (B) / her elder sister (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "B) Part B",
      explanation: "'More taller' is an incorrect double comparative. Part B should read simply 'taller than'."
    },
    {
      question: "Find the error segment: 'The police arrived (A) / and ordered for (B) / the dispersal of the crowd (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "B) Part B",
      explanation: "The verb 'ordered' takes a direct object without the preposition 'for'. Part B should read 'and ordered the dispersal'."
    },
    {
      question: "Identify the error: 'Between you and I (A) / he is not (B) / an honest person (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "A) Part A",
      explanation: "Prepositions govern the objective case of pronouns. Part A must be corrected to 'Between you and me'."
    },
    {
      question: "Find the error: 'If he will study diligently, (A) / he will score (B) / excellent marks (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "A) Part A",
      explanation: "In conditional sentences of Type 1, the subordinate 'if' clause must be in the Simple Present tense, not future with 'will'. Part A must read 'If he studies diligently'."
    },
    {
      question: "Spot the error: 'He gave me (A) / all the necessary (B) / furnitures for my room (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "C) Part C",
      explanation: "'Furniture' is an uncountable noun and cannot be pluralized with '-s'. Part C must be corrected to 'furniture for my room'."
    },
    {
      question: "Identify the error segment: 'Kindly revert back (A) / with the certified copies (B) / of your documents (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "A) Part A",
      explanation: "'Revert back' is redundant because 'revert' already contains the meaning of replying back. Part A should read 'Kindly revert'."
    },
    {
      question: "Find the error: 'Walking along the highway, (A) / a speeding motorcycle (B) / knocked him down (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "A) Part A",
      explanation: "This sentence contains a dangling participle error. The participial phrase 'Walking along the highway' incorrectly attaches to 'motorcycle'. Part A must be corrected to 'While he was walking along the highway'."
    },
    {
      question: "Spot the error: 'Neither of the two plans (A) / were approved (B) / by the cabinet (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "B) Part B",
      explanation: "'Neither' when used as a pronoun is singular and requires a singular verb. Part B must be corrected to 'was approved by the cabinet'."
    }
  ],
  keyTerminology: [
    {
      term: "Error Spotting",
      definition: "A standardized examination format where a sentence is divided into sections to identify grammatical, lexical, or syntactical violations."
    },
    {
      term: "Concord (Agreement)",
      definition: "The grammatical correspondence between two parts of a sentence, especially between subject and verb in number and person."
    },
    {
      term: "Dangling Modifier",
      definition: "A modifying word or phrase (often a participle) that lacks a clear or logical syntactic connection to the subject of the clause."
    },
    {
      term: "Redundancy (Pleonasm)",
      definition: "The use of superfluous, unnecessary words that repeat a meaning already expressed by another word in the phrase (e.g., revert back)."
    },
    {
      term: "Uncountable Noun",
      definition: "A noun that cannot be counted or divided into individual units (e.g., furniture, advice) and lacks a plural form in '-s'."
    },
    {
      term: "Correlative Pair",
      definition: "Paired conjunctions (hardly...when, no sooner...than) whose components must be matched according to fixed grammatical rules."
    },
    {
      term: "Proximity Concord",
      definition: "A grammatical rule where the verb agrees with the subject closest to it (applicable in either...or and neither...nor constructions)."
    },
    {
      term: "Transitive Directness",
      definition: "The grammatical rule wherein pure transitive verbs act upon their direct objects without intervening prepositions."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapters on 'Common Errors in English', Noun and Pronoun concord, and Preposition violations."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Comprehensive catalog of common learner errors, redundancy patterns, and non-prepositional verbs."
    },
    {
      title: "Objective General English",
      author: "S. P. Bakshi (Arihant Publications)",
      details: "Exhaustive error-spotting rules, subject-verb concord tables, and competitive exam exercises."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Compilation of error-spotting and sentence-correction questions from Vyapam exams between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Hardly ... than vs Hardly ... when",
      confusion: "Using 'than' with 'hardly' or 'scarcely'.",
      clarity: "**Hardly** and **Scarcely** must ALWAYS be paired with **WHEN**. **No sooner** is paired with **THAN**."
    },
    {
      concept: "Discuss about vs Discuss",
      confusion: "Adding 'about' after 'discuss' or 'describe'.",
      clarity: "'Discuss' is a transitive verb meaning 'talk about'. Adding 'about' is redundant. Say: **'discuss the matter'**, NOT 'discuss about the matter'."
    },
    {
      concept: "As well as: Subject Agreement",
      confusion: "Making the verb plural because two people are mentioned.",
      clarity: "With 'as well as', 'along with', and 'with', the verb agrees ONLY with the **FIRST subject**. In *'The father, as well as his sons, was present'*, 'was' is correct."
    },
    {
      concept: "Since + Simple Past",
      confusion: "Using Present Perfect after 'since' when indicating a point in time.",
      clarity: "The clause following 'since' MUST be in the **Simple Past (V2)**: *'Two weeks have passed since he arrived'* (NOT *since he has arrived*)."
    },
    {
      concept: "Cousin brother / sister",
      confusion: "Using 'cousin brother' or 'cousin sister' in formal English.",
      clarity: "In standard English, 'cousin brother' and 'cousin sister' are ungrammatical. Use **'cousin'** alone for all cousins."
    }
  ],
  faqList: [
    {
      question: "Why can't we say 'The furnitures are broken'?",
      answer: "In English, 'furniture' is an uncountable mass noun representing all wooden items as a collective substance. It has no plural form with '-s'. To express plural items, say: 'The pieces of furniture are broken'."
    },
    {
      question: "When is 'enter into' grammatically correct?",
      answer: "'Enter into' is correct only in figurative, non-physical contexts, such as 'to enter into an agreement/alliance' or 'to enter into discussions'. For entering a physical building or room, never use 'into' ('He entered the room')."
    },
    {
      question: "Why is 'If it will rain' considered an error?",
      answer: "In conditional clauses of Type 1, future actions are already indicated by the modal verb in the main clause ('we will cancel'). The 'if' clause must take the Simple Present tense to denote the condition."
    },
    {
      question: "Can 'information' ever be pluralized as 'informations'?",
      answer: "No. 'Information' is strictly an uncountable abstract noun. If you need to indicate multiple items, use 'pieces of information'."
    },
    {
      question: "What is the difference between 'Elder' and 'Older' in error detection?",
      answer: "'Elder' is used exclusively for biological family members and cannot be followed by 'than'. 'Older' is used for persons outside the family and inanimate objects, and can be followed by 'than'."
    }
  ],
  oneLinerRevision: [
    "Uncountable nouns (furniture, advice, information, scenery) never take '-s' or the article 'a/an'.",
    "'Hardly' and 'Scarcely' must be paired with 'when'; 'No sooner' must be paired with 'than'.",
    "Definite past time markers (yesterday, ago, in 1947) strictly take Simple Past (V2), not Present Perfect.",
    "Never place 'will' or 'would' inside a conditional 'if' clause.",
    "Transitive verbs like discuss, describe, order, enter, and resemble take no prepositions.",
    "Subjects connected by 'as well as' or 'along with' require the verb to agree with the first subject.",
    "Subjects connected by 'either...or' or 'neither...nor' follow the proximity rule (agree with nearest subject).",
    "Prepositions are followed by the objective case of pronouns (e.g., 'between you and me').",
    "Eliminate redundancies: never write 'revert back', 'return back', or 'cousin sister'.",
    "Dangling participles must be resolved by explicitly providing the logical subject."
  ],
  rapidRevision: {
    points: [
      "Checklist: Concord -> Tense -> Pronouns -> Conjunctions -> Prepositions -> Modifiers -> Redundancy.",
      "Uncountables: Scenery, Furniture, Advice, Information (No '-s', singular verb).",
      "Conjunctions: Hardly/Scarcely...when; No sooner...than; Lest...should.",
      "No Preposition: Discuss, Describe, Order, Enter, Resemble, Reach, Attack.",
      "Parenthetical Concord: As well as / along with -> agrees with 1st subject.",
      "Conditionals: If + V1 ... will + V1; If + V2 ... would + V1; If + had + V3 ... would have + V3.",
      "Redundancy: Revert back -> Revert; Cousin brother -> Cousin."
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
