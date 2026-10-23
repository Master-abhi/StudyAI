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
  id: "cgv_master_eng_voice_2",
  topicId: "eng_voice_2",
  chapterId: "cgv_master_sub_6_ch_4",
  subjectId: "cgv_master_sub_6",
  title: "Direct and Indirect Speech",
  subtitle: "Complete Notes on Narration, Reporting Verbs, Tense Shifts, Pronoun Rules & Exceptions for CG Vyapam",
  overview: {
    introduction: "Direct and Indirect Speech (also known as Narration or Reported Speech) deals with the grammatical mechanisms used to convey words spoken by another person. In Direct Speech, the speaker's exact words are reproduced verbatim inside quotation marks (inverted commas) preceded by a comma and a reporting verb (e.g., He said, 'I am writing a letter.'). In Indirect (Reported) Speech, the meaning or substance of the speaker's words is conveyed without quoting the exact words, without quotation marks, and usually introduced by a conjunction like 'that', 'if/whether', or 'to' (e.g., He said that he was writing a letter). Converting direct speech into indirect speech involves five fundamental systematic transformations: (1) Changing the reporting verb (e.g., 'said to' becomes 'told'); (2) Removing inverted commas and inserting the correct connective; (3) Shifting pronouns according to the SON formula; (4) Backshifting tenses (if the reporting verb is in the past tense); and (5) Converting words indicating time, place, and proximity into words of distance.",
    importance: "Direct and Indirect Speech holds immense importance in CG Vyapam examinations, including Hostel Warden, Revenue Inspector (RI), Patwari, Sub Inspector, ADEO, and Assistant Teacher exams. Vyapam papers consistently allocate 2 to 4 questions to Narration. The board frequently tests intricate edge cases such as universal truths (where tenses do not backshift), interrogative questions (prohibiting the use of 'that'), imperative commands involving 'forbade' (which avoids double negatives), and optative sentences expressing wishes or prayers.",
    examRelevance: "Key areas tested in CG Vyapam exams include: (1) Correct application of the SON pronoun rule; (2) Tense backshift rules and the 5 critical exceptions (universal truths, scientific laws, habitual actions, historical facts, and proverbs); (3) Interrogatives: converting question syntax into assertive syntax (Subject + Verb) and eliminating question marks; (4) Imperatives: replacing reporting verbs with ordered, advised, requested, forbade, proposed; (5) Converting 'Let's' constructions into 'suggested/proposed that we/they should'.",
    quickFacts: [
      { label: "The SON Pronoun Rule", value: "1st Person -> Subject; 2nd Person -> Object; 3rd Person -> No Change (S-O-N / 1-2-3)" },
      { label: "Reporting Verb Rule", value: "'Said' remains 'said'; 'Said to' becomes 'told' (never write 'told to')" },
      { label: "Past Tense Shift Rule", value: "Simple Past (V2) changes to Past Perfect (had + V3); Past Continuous changes to Past Perfect Continuous (had been + V-ing)" },
      { label: "Universal Truth Immunity", value: "Tense NEVER changes if the reported speech states a universal truth, scientific fact, proverb, or habitual fact" },
      { label: "Interrogative Connectives", value: "Yes/No questions take 'if' or 'whether'; Wh- questions take the Wh-word itself (NEVER use 'that')" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Anatomy of Narration & The Fundamental Rules",
      content: `### 1. Two Components of a Direct Speech Sentence
A direct speech sentence consists of two distinct grammatical sections:
1. **Reporting Speech (Containing the Reporting Verb)**:
   - The part outside the quotation marks indicating who is speaking to whom.
   - *Example:* **Rohan said to Priya**, 'I have bought a new car.' (Here, 'said to' is the **Reporting Verb**, 'Rohan' is the reporting subject, and 'Priya' is the reporting object).
2. **Reported Speech**:
   - The actual words spoken by the speaker, enclosed within quotation marks (inverted commas).
   - *Example:* Rohan said to Priya, **'I have bought a new car.'**

---

### 2. Five Golden Conversion Rules from Direct to Indirect
1. **Reporting Verb Transformation**:
   - In Assertive sentences: 'said' -> 'said'; 'said to' -> **'told'**.
   - *Golden Rule:* **'Told' is a transitive verb and is NEVER followed by 'to'**. Writing *'He told to me'* is a serious exam error! Always write *'He told me'*.
2. **Removal of Punctuation & Connective Insertion**:
   - Remove the comma and quotation marks ('...').
   - Insert the appropriate conjunction:
     - Assertive sentences: **'that'**
     - Yes/No Interrogatives: **'if'** or **'whether'**
     - Wh- Interrogatives: **the Wh-word itself** (No 'that')
     - Imperative sentences: **'to + V1'**
     - Exclamatory / Optative sentences: **'that'**
3. **Change of Pronouns (The SON Formula)**:
   - **S (1st Person)**: First-person pronouns (*I, me, my, mine, we, us, our, ours*) change according to the **Subject** of the reporting verb.
   - **O (2nd Person)**: Second-person pronouns (*you, your, yours*) change according to the **Object** of the reporting verb.
   - **N (3rd Person)**: Third-person pronouns (*he, him, his, she, her, hers, it, its, they, them, their, theirs*) undergo **No change**.
   - *Memory Mnemonic:* **S - O - N / 1 - 2 - 3**
4. **Change of Tense (Backshift)**:
   - If the reporting verb is in the **Past Tense** (*said, told, remarked*), the tense of the reported speech shifts one step back into the past.
   - If the reporting verb is in the **Present Tense** (*says, tells*) or **Future Tense** (*will say*), the **tense does NOT change**!
5. **Change of Words Expressing Closeness (Time and Place)**:
   - Words denoting nearness in time or place change into words denoting distance.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Detailed Tense Shift (Backshift) & The Five Immunity Exceptions",
      content: `### 1. Tense Shift Table (When Reporting Verb is in Past Tense)
When the reporting verb is in the past (e.g., *said*):
1. **Simple Present -> Simple Past**:
   - V1 / V1(+s/es) -> **V2** (do/does -> did)
   - *Direct:* He said, 'I work in Bilaspur.'
   - *Indirect:* He said that he **worked** in Bilaspur.
2. **Present Continuous -> Past Continuous**:
   - is/am/are + V-ing -> **was/were + V-ing**
   - *Direct:* She said, 'I am reading a novel.'
   - *Indirect:* She said that she **was reading** a novel.
3. **Present Perfect -> Past Perfect**:
   - has/have + V3 -> **had + V3**
   - *Direct:* Amit said, 'I have finished my project.'
   - *Indirect:* Amit said that he **had finished** his project.
4. **Present Perfect Continuous -> Past Perfect Continuous**:
   - has/have been + V-ing -> **had been + V-ing**
   - *Direct:* He said, 'It has been raining since morning.'
   - *Indirect:* He said that it **had been raining** since morning.
5. **Simple Past -> Past Perfect** (CRUCIAL EXAM RULE!):
   - V2 / did -> **had + V3**
   - *Direct:* She said, 'I visited Raipur yesterday.'
   - *Indirect:* She said that she **had visited** Raipur the previous day.
6. **Past Continuous -> Past Perfect Continuous**:
   - was/were + V-ing -> **had been + V-ing**
   - *Direct:* They said, 'We were playing football.'
   - *Indirect:* They said that they **had been playing** football.
7. **Past Perfect & Past Perfect Continuous -> NO CHANGE**:
   - had + V3 remains **had + V3**.
   - had been + V-ing remains **had been + V-ing**.
8. **Modals Shift**:
   - will -> **would**, shall -> **should** (or *would* depending on subject)
   - can -> **could**, may -> **might**
   - must -> **had to** (for immediate necessity) or remains **must** (for permanent obligation/moral law)
   - *could, would, should, might, ought to* -> **Remain Unchanged**.

---

### 2. The Five Immunity Exceptions (Tense Does NOT Change!)
Even if the reporting verb is in the past tense (*said*), the tense of the reported speech **MUST NOT be changed** in the following 5 cases:
1. **Universal Truths & Scientific Laws**:
   - *Direct:* The teacher said, 'The Earth revolves around the Sun.'
   - *Indirect:* The teacher said that the Earth **revolves** around the Sun. (NOT *revolved*).
   - *Direct:* He said, 'Water boils at 100 degrees Celsius.'
   - *Indirect:* He said that water **boils** at 100 degrees Celsius.
2. **Habitual Actions & Regular Customs**:
   - *Direct:* Suresh said, 'I wake up at 5 AM every morning.'
   - *Indirect:* Suresh said that he **wakes up** at 5 AM every morning.
3. **Historical Truths & Facts**:
   - *Direct:* The professor said, 'Kalidasa was the Shakespeare of India.'
   - *Indirect:* The professor said that Kalidasa **was** the Shakespeare of India. (Simple past remains simple past).
   - *Direct:* He said, 'India became independent in 1947.'
   - *Indirect:* He said that India **became** independent in 1947. (NOT *had become*).
4. **Proverbs & Aphorisms**:
   - *Direct:* My father said, 'Honesty is the best policy.'
   - *Indirect:* My father said that honesty **is** the best policy.
5. **Two Simultaneous Past Actions**:
   - When two actions happened simultaneously in the past connected with *while* or *as*, the past continuous is retained:
   - *Direct:* She said, 'While I was cooking, my sister was reading.'
   - *Indirect:* She said that while she **was cooking**, her sister **was reading**.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Narration of Interrogative Sentences",
      content: `### 1. Fundamental Rules for Interrogative Sentences
1. **Reporting Verb Shift**:
   - 'Said' / 'Said to' changes to **'asked'**, **'inquired of'**, or **'demanded'**.
2. **Conjunction Rules**:
   - **For Yes/No Questions** (starting with auxiliary verbs *is, are, was, were, do, did, have, can, will*):
     - Connective used is **'if'** or **'whether'**.
     - *Preference:* Use **'whether'** when there is a choice or condition followed by 'or not' (e.g., *whether he will come or not*).
   - **For Wh- Questions** (starting with *What, When, Where, Why, Who, Whom, Whose, Which, How*):
     - **No external conjunction** is used. **NEVER use 'that'**!
     - The Wh-word itself acts as the connective.
3. **Structural Transformation: Interrogative to Assertive**:
   - The sentence syntax **MUST** change from question order (Auxiliary + Subject + Verb) to statement order (**Subject + Auxiliary/Verb**).
   - The question mark (?) is replaced by a **full stop (.)**.
   - 'Do/Does/Did' used in affirmative questions are removed and the verb is converted into the corresponding past form.

---

### 2. Examples of Yes/No Questions
- *Direct:* He said to me, 'Are you preparing for CG Vyapam?'
  - *Analysis:* 'Said to' -> 'asked me'; Yes/No question -> use 'if'; 'you' (2nd person) -> matches object 'me' -> 'I'; 'are preparing' (present cont.) -> 'was preparing'.
  - *Indirect:* **He asked me if I was preparing for CG Vyapam.**
- *Direct:* The teacher said to the student, 'Did you complete the assignment?'
  - *Analysis:* Simple Past 'Did you complete' -> Past Perfect 'had completed'; word order becomes assertive.
  - *Indirect:* **The teacher asked the student if he had completed the assignment.**
- *Direct:* She said to him, 'Can you speak Chhattisgarhi?'
  - *Indirect:* **She asked him if he could speak Chhattisgarhi.**

---

### 3. Examples of Wh- Questions
- *Direct:* The police officer said to the stranger, 'Where do you live?'
  - *Analysis:* Wh-word 'Where' remains connective (no 'that'); 'do you live' (simple present) -> 'he lived' (simple past).
  - *Indirect:* **The police officer asked the stranger where he lived.** (NOT *where did he live*).
- *Direct:* She said to me, 'What are you doing here today?'
  - *Analysis:* 'here' -> 'there'; 'today' -> 'that day'; 'are you doing' -> 'I was doing'.
  - *Indirect:* **She asked me what I was doing there that day.**
- *Direct:* He said, 'Who has broken the glass window?'
  - *Indirect:* **He asked who had broken the glass window.**`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Narration of Imperative Sentences & 'Let' Constructions",
      content: `### 1. General Imperative Sentences (Orders, Requests, Advice)
In imperative sentences, the reporting verb is replaced based on the tone, and the reported verb is converted into a **full infinitive ('to + V1')**:
- **Reporting Verb Replacements**:
  - Command / Order: **ordered**, **commanded**
  - Advice / Suggestion: **advised**, **urged**
  - Polite Request: **requested**, **begged**, **implored**, **entreated**
  - Prohibition / Ban: **forbade** (or *ordered not to*)
- **Connecting Particle**: Use **'to + V1'** for affirmative imperatives, and **'not to + V1'** for negative imperatives.
- **Words of politeness** like *please, kindly, sir, madam* are **dropped** completely.

#### Illustrative Examples:
- *Command:* The commander said to the soldiers, 'Attack the enemy post!'
  - *Indirect:* **The commander ordered the soldiers to attack the enemy post.**
- *Request:* She said to me, 'Please lend me your book for two days.'
  - *Indirect:* **She requested me to lend her her book for two days.**
- *Advice:* The doctor said to the patient, 'Do not eat oily food.'
  - *Method 1 (Advised):* **The doctor advised the patient not to eat oily food.**
  - *Method 2 (Forbade - High Exam Trap!):* **The doctor forbade the patient to eat oily food.**
  - *Caution with 'Forbade':* 'Forbade' is already negative. Writing *'The doctor forbade not to eat'* creates an erroneous double negative!

---

### 2. Narration of 'Let' Constructions
Sentences beginning with 'Let' have three distinct communicative functions:

#### A. 'Let us' (Let's) Expressing Proposal or Suggestion:
- Change reporting verb to **'proposed'** or **'suggested'** (often with 'to' if object follows: *suggested to me*).
- Connective used is **'that'**.
- 'Let us' changes to **'we should'** (if reporting subject is 1st person) or **'they should'** (if reporting subject is 3rd person).
  - *Direct:* He said to his friends, 'Let us go for a picnic.'
  - *Indirect:* **He suggested to his friends that they should go for a picnic.**
  - *Direct:* I said to my brother, 'Let us help the accident victim.'
  - *Indirect:* **I proposed to my brother that we should help the accident victim.**

#### B. 'Let me / Let him' Expressing Request or Permission:
- Change reporting verb to **'requested'** or **'asked'**.
- Convert to **'to let + pronoun + V1'** or **'that + subject + might be allowed to + V1'**.
  - *Direct:* The peon said to the officer, 'Let me go home early today.'
  - *Indirect:* **The peon requested the officer to let him go home early that day.** (OR *...that he might be allowed to go home...*)

#### C. 'Let' Expressing Order / Decree:
- *Direct:* The King said, 'Let the prisoner be set free.'
  - *Indirect:* **The King ordered that the prisoner should be set free.**`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Exclamatory & Optative Sentences",
      content: `### 1. Exclamatory Sentences (Expressing Sudden Emotion)
Exclamatory sentences express strong sudden joy, sorrow, surprise, admiration, contempt, or regret:
1. **Reporting Verb Replacement**:
   - Change 'said' to **'exclaimed with + emotion'**:
     - *Hurrah! / Ha!* -> **exclaimed with joy / delight**
     - *Alas! / Ah!* -> **exclaimed with sorrow / grief**
     - *What! / How!* -> **exclaimed with wonder / surprise**
     - *Bravo!* -> **applauded + Object + saying that...**
     - *Pooh! / Fie!* -> **exclaimed with contempt / disgust**
2. **Conjunction**: Always use **'that'**.
3. **Exclamatory Punctuation**: Drop the exclamation mark (!), exclamatory interjections (*Alas, Hurrah, Bravo*), and convert the sentence into an **assertive statement**:
   - 'What a...' or 'How...' is converted into **'a very...'** or **'a great...'**:
     - *What a beautiful scene!* -> *It was a very beautiful scene.*
     - *What a fool I am!* -> *He was a great fool.*

#### Illustrative Examples:
- *Direct:* The captain said, 'Hurrah! We have won the championship!'
  - *Indirect:* **The captain exclaimed with joy that they had won the championship.**
- *Direct:* The old woman said, 'Alas! My only son is dead.'
  - *Indirect:* **The old woman exclaimed with sorrow that her only son was dead.**
- *Direct:* She said, 'What a magnificent waterfall it is!'
  - *Indirect:* **She exclaimed with wonder that it was a very magnificent waterfall.**
- *Direct:* The teacher said to Rohan, 'Bravo! You have scored the highest marks.'
  - *Indirect:* **The teacher applauded Rohan, saying that he had scored the highest marks.**

---

### 2. Optative Sentences (Expressing Wish, Prayer, or Curse)
Optative sentences express a wish, blessing, prayer, or curse, often introduced by 'May':
1. **Reporting Verb Replacement**:
   - Blessing / Prayer: **prayed**, **blessed**
   - General Wish: **wished**
   - Curse: **cursed**
2. **Conjunction**: Use **'that'**.
3. **Structure Shift**:
   - 'May + Subject + V1' becomes **'Subject + might + V1'**.
   - Greetings (*Good morning, Good evening*) take **'wished'**; Farewells (*Good night, Goodbye, Farewell*) take **'bade'**.

#### Illustrative Examples:
- *Prayer:* The priest said to the devotee, 'May God bless you with a long life!'
  - *Indirect:* **The priest prayed that God might bless the devotee with a long life.**
- *Curse:* The hermit said to the wicked king, 'May you perish in ruin!'
  - *Indirect:* **The hermit cursed the wicked king that he might perish in ruin.**
- *Greeting:* She said to me, 'Good morning, Sir!'
  - *Indirect:* **She respectfully wished me good morning.**
- *Farewell:* Ravi said to his classmates, 'Goodbye, my dear friends!'
  - *Indirect:* **Ravi bade goodbye to his dear friends.**`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master Tense Shift (Backshift) Reference Matrix",
      headers: ["Direct Speech Tense", "Indirect Speech Tense", "Direct Sentence Example", "Indirect Converted Sentence"],
      rows: [
        ["Simple Present (V1)", "Simple Past (V2)", "He said, 'I live in Durg.'", "He said that he lived in Durg."],
        ["Present Continuous (is/am/are + V-ing)", "Past Continuous (was/were + V-ing)", "She said, 'I am reading.'", "She said that she was reading."],
        ["Present Perfect (has/have + V3)", "Past Perfect (had + V3)", "He said, 'I have eaten.'", "He said that he had eaten."],
        ["Present Perfect Continuous", "Past Perfect Continuous", "They said, 'We have been waiting.'", "They said that they had been waiting."],
        ["Simple Past (V2 / did)", "Past Perfect (had + V3)", "She said, 'I passed the exam.'", "She said that she had passed the exam."],
        ["Past Continuous (was/were + V-ing)", "Past Perfect Continuous (had been + V-ing)", "He said, 'It was snowing.'", "He said that it had been snowing."],
        ["Past Perfect (had + V3)", "NO CHANGE (had + V3)", "He said, 'I had won already.'", "He said that he had won already."],
        ["Simple Future (will/shall + V1)", "Conditional (would + V1)", "She said, 'I will write.'", "She said that she would write."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Time, Place & Proximity Adverb Shifts in Reported Speech",
      headers: ["Direct Speech Word (Nearness)", "Indirect Speech Word (Distance)", "Illustrative Direct Usage", "Converted Indirect Usage"],
      rows: [
        ["Now", "Then", "'I am leaving now.'", "He said he was leaving then."],
        ["Today", "That day", "'I will meet you today.'", "She said she would meet him that day."],
        ["Tonight", "That night", "'It will rain tonight.'", "He said it would rain that night."],
        ["Yesterday", "The previous day / The day before", "'He came yesterday.'", "She said he had come the previous day."],
        ["Tomorrow", "The next day / The following day", "'I will call tomorrow.'", "He said he would call the following day."],
        ["Last night / Last week", "The previous night / The previous week", "'We visited last week.'", "They said they had visited the previous week."],
        ["Next week / Next year", "The following week / The following year", "'I will return next year.'", "He said he would return the following year."],
        ["Here", "There", "'Keep it here.'", "She told him to keep it there."],
        ["This / These", "That / Those", "'I want this book.'", "He said that he wanted that book."],
        ["Ago", "Before", "'He left two days ago.'", "She said he had left two days before."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Sentence Types, Reporting Verbs & Conjunction Mapping",
      headers: ["Sentence Category", "Direct Reporting Verb", "Converted Reporting Verb", "Mandatory Conjunction / Linker"],
      rows: [
        ["Assertive (Statements)", "said / said to", "said / told (never 'told to')", "that"],
        ["Interrogative (Yes/No)", "said / said to", "asked / inquired of", "if / whether"],
        ["Interrogative (Wh- questions)", "said / said to", "asked / inquired of", "Wh-word itself (NEVER 'that')"],
        ["Imperative (Command/Order)", "said to", "ordered / commanded", "to + V1 (Negative: not to + V1)"],
        ["Imperative (Advice)", "said to", "advised / urged", "to + V1"],
        ["Imperative (Request)", "said to ('please')", "requested / begged", "to + V1"],
        ["Imperative (Prohibition)", "said to ('do not')", "forbade", "to + V1 (NO 'not' allowed with forbade)"],
        ["Imperative ('Let us')", "said to", "proposed to / suggested to", "that + we/they + should + V1"],
        ["Exclamatory", "said", "exclaimed with joy/sorrow/wonder", "that"],
        ["Optative (Wish/Prayer)", "said", "prayed / wished / blessed", "that + Subject + might + V1"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Choose the correct indirect speech: The teacher said, 'The Sun rises in the East.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) The teacher said that the Sun rose in the East.",
        "B) The teacher said that the Sun rises in the East.",
        "C) The teacher told that the Sun rises in the East.",
        "D) The teacher says that the Sun has risen in the East."
      ],
      correctAnswer: "B) The teacher said that the Sun rises in the East.",
      explanation: "Even though the reporting verb 'said' is in the past tense, 'The Sun rises in the East' is an eternal universal truth. Universal truths, scientific facts, and proverbs do not undergo any tense backshift. Option A incorrectly changes 'rises' to 'rose'; Option C incorrectly uses 'told' without an object."
    },
    {
      question: "Convert to indirect speech: He said to me, 'Where are you going?' [CG Vyapam Patwari Exam]",
      options: [
        "A) He asked me where was I going.",
        "B) He asked me that where I was going.",
        "C) He asked me where I was going.",
        "D) He told me where I was going."
      ],
      correctAnswer: "C) He asked me where I was going.",
      explanation: "In Wh- interrogatives: (1) 'said to' becomes 'asked'; (2) No 'that' is used; (3) The question order changes into assertive word order (Subject 'I' + Verb 'was going'). Option A has interrogative order ('where was I going'), and Option B incorrectly inserts 'that'."
    },
    {
      question: "Change into indirect speech: The doctor said to the patient, 'Do not smoke cigarettes.' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) The doctor forbade the patient not to smoke cigarettes.",
        "B) The doctor advised the patient not to smoke cigarettes.",
        "C) The doctor told the patient to not smoke cigarettes.",
        "D) The doctor ordered the patient that do not smoke cigarettes."
      ],
      correctAnswer: "B) The doctor advised the patient not to smoke cigarettes.",
      explanation: "The doctor provides professional medical advice; hence 'advised + object + not to + V1' is the most accurate transformation. Option A is grammatically incorrect because 'forbade' already contains a negative meaning, making 'forbade ... not to' an erroneous double negative."
    },
    {
      question: "Identify the correct indirect narration: She said, 'Alas! I have lost my purse.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) She exclaimed with sorrow that she had lost her purse.",
        "B) She exclaimed with joy that she had lost her purse.",
        "C) She cried that she lost her purse.",
        "D) She exclaimed with sorrow that she has lost her purse."
      ],
      correctAnswer: "A) She exclaimed with sorrow that she had lost her purse.",
      explanation: "The interjection 'Alas!' expresses grief or sorrow, transforming 'said' into 'exclaimed with sorrow'. The Present Perfect 'have lost' backshifts to Past Perfect 'had lost', and 1st person 'my' changes to 'her' (matching subject 'She'). Hence, Option A is correct."
    },
    {
      question: "Convert to indirect speech: Ravi said to his friends, 'Let us go to the cinema tonight.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) Ravi told his friends that they should go to the cinema tonight.",
        "B) Ravi proposed to his friends that they should go to the cinema that night.",
        "C) Ravi requested his friends to go to the cinema that night.",
        "D) Ravi suggested his friends that let us go to the cinema that night."
      ],
      correctAnswer: "B) Ravi proposed to his friends that they should go to the cinema that night.",
      explanation: "'Let us' expressing a proposal transforms into 'proposed to / suggested to + object + that they should + V1'. In addition, the time word 'tonight' must be converted into 'that night'. Therefore, Option B is correct."
    },
    {
      question: "Change into direct speech: He asked me if I had seen the movie. [CG Vyapam ADEO Exam]",
      options: [
        "A) He said to me, 'Did you see the movie?'",
        "B) He said to me, 'Have you seen the movie?'",
        "C) Both A and B are possible in reverse translation",
        "D) He said to me, 'Had you seen the movie?'"
      ],
      correctAnswer: "C) Both A and B are possible in reverse translation",
      explanation: "Past Perfect ('had seen') in reported speech can originate either from the Simple Past ('Did you see') or the Present Perfect ('Have you seen') in direct speech, because both backshift to Past Perfect. In standard exam questions, both forms are valid equivalents."
    }
  ],
  mcqs: [
    {
      question: "Select the sentence with correct indirect speech: He said, 'I bought a laptop yesterday.'",
      options: [
        "A) He said that he had bought a laptop the previous day.",
        "B) He said that he bought a laptop yesterday.",
        "C) He told that he had bought a laptop the previous day.",
        "D) He said that he has bought a laptop the day before."
      ],
      correctAnswer: "A) He said that he had bought a laptop the previous day.",
      explanation: "Simple Past ('bought') backshifts to Past Perfect ('had bought'). The time adverb 'yesterday' changes to 'the previous day'. Option C incorrectly uses 'told' without a direct personal object."
    },
    {
      question: "Convert to indirect speech: The commander said to the soldiers, 'March forward!'",
      options: [
        "A) The commander requested the soldiers to march forward.",
        "B) The commander ordered the soldiers to march forward.",
        "C) The commander said the soldiers to march forward.",
        "D) The commander told to the soldiers to march forward."
      ],
      correctAnswer: "B) The commander ordered the soldiers to march forward.",
      explanation: "A military officer issues commands/orders to soldiers; hence 'ordered + object + to + V1' is the appropriate form. 'Told to' in Option D is an outright grammatical blunder."
    },
    {
      question: "Change into indirect speech: My mother said to me, 'May you succeed in life!'",
      options: [
        "A) My mother wished that I may succeed in life.",
        "B) My mother prayed that I might succeed in life.",
        "C) My mother told that I might succeed in life.",
        "D) My mother said that might I succeed in life."
      ],
      correctAnswer: "B) My mother prayed that I might succeed in life.",
      explanation: "For an optative sentence expressing a blessing or prayer: 'said to' -> 'prayed/wished', connective is 'that', and 'May you succeed' converts into assertive order: 'I might succeed in life'."
    },
    {
      question: "Find the error in indirect speech: 'She told to me (A) / that she was preparing (B) / for the competitive examination (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "A) Part A",
      explanation: "'Told' is a transitive verb that takes an indirect object directly without the preposition 'to'. The phrase 'told to me' is incorrect and must be written as 'told me'."
    },
    {
      question: "Convert to indirect speech: He said, 'What a great tragedy!'",
      options: [
        "A) He exclaimed with sorrow that it was a great tragedy.",
        "B) He said that what a tragedy it was.",
        "C) He exclaimed that what a great tragedy.",
        "D) He cried that it had been a tragedy."
      ],
      correctAnswer: "A) He exclaimed with sorrow that it was a great tragedy.",
      explanation: "The exclamatory phrase 'What a great tragedy!' denotes grief. It transforms into 'He exclaimed with sorrow that it was a great tragedy'."
    },
    {
      question: "Direct to indirect: She said to him, 'Do you know my brother?'",
      options: [
        "A) She asked him that if he knew her brother.",
        "B) She asked him if he knows her brother.",
        "C) She asked him if he knew her brother.",
        "D) She asked him did he know her brother."
      ],
      correctAnswer: "C) She asked him if he knew her brother.",
      explanation: "In Yes/No questions, use 'if'. The Simple Present ('Do you know') backshifts to Simple Past ('knew'). Never place 'that' before 'if' (as in Option A)."
    },
    {
      question: "Convert to indirect speech: Father said, 'Honesty is always rewarded.'",
      options: [
        "A) Father said that honesty was always rewarded.",
        "B) Father said that honesty is always rewarded.",
        "C) Father told that honesty is always rewarded.",
        "D) Father said that honesty had been always rewarded."
      ],
      correctAnswer: "B) Father said that honesty is always rewarded.",
      explanation: "'Honesty is always rewarded' is a timeless moral truth/proverb. Therefore, its present tense remains unaffected by the past reporting verb."
    },
    {
      question: "Which of the following sentences correctly handles the verb 'forbade'?",
      options: [
        "A) The teacher forbade the students not to make noise.",
        "B) The teacher forbade the students to make noise.",
        "C) The teacher forbade to the students to make noise.",
        "D) The teacher forbade that students should not make noise."
      ],
      correctAnswer: "B) The teacher forbade the students to make noise.",
      explanation: "'Forbade' means 'ordered not to'. Therefore, it takes an object followed directly by 'to + V1' without adding 'not'. Writing 'forbade ... not to' creates an incorrect double negative."
    }
  ],
  keyTerminology: [
    {
      term: "Direct Speech",
      definition: "The exact words spoken by a person, enclosed within quotation marks and set off by a comma."
    },
    {
      term: "Indirect (Reported) Speech",
      definition: "The report of what someone has said without quoting their exact words and without quotation marks."
    },
    {
      term: "Reporting Verb",
      definition: "The introductory verb (such as say, tell, ask, order, exclaim) located in the reporting clause that specifies who is communicating."
    },
    {
      term: "Reported Speech",
      definition: "The content or message conveyed by the original speaker, enclosed in quotation marks in direct speech."
    },
    {
      term: "Tense Backshift",
      definition: "The systematic shifting of verbs one step back into the past when transforming direct speech into indirect speech under a past reporting verb."
    },
    {
      term: "SON Formula",
      definition: "The standard rule governing pronoun changes: 1st person pronouns change according to the Subject; 2nd person according to the Object; 3rd person undergoes No change."
    },
    {
      term: "Optative Sentence",
      definition: "A sentence expressing a wish, prayer, blessing, or curse (e.g., 'May God bless you!'), converted using 'prayed' or 'wished'."
    },
    {
      term: "Double Negative Trap",
      definition: "The grammatical error of pairing inherently negative reporting verbs like 'forbade' or 'denied' with 'not'."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapters 37 & 38 on 'Direct and Indirect Speech', covering reporting verb types and tense backshift rules."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Comprehensive sections on Reported Speech, pronoun shifting, free indirect style, and modal conversions."
    },
    {
      title: "English Grammar in Use",
      author: "Raymond Murphy (Cambridge University Press)",
      details: "Units 47 & 48 covering reported statements, reporting questions, and reporting verbs with infinitives."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Official previous year question papers from Patwari, Hostel Warden, Sub Inspector, and ADEO examinations."
    }
  ],
  confusionBuster: [
    {
      concept: "Said vs Told",
      confusion: "Writing 'He told that...' or 'He told to me that...'.",
      clarity: "'Said' can be used without a direct personal object ('He said that...'). 'Told' is transitive and MUST have an object without 'to' ('He told me that...', NOT 'told to me')."
    },
    {
      concept: "Interrogative Word Order in Reported Speech",
      confusion: "Retaining question word order (e.g., writing 'He asked where was I going').",
      clarity: "Indirect speech is always a declarative statement ending in a full stop. The word order MUST be assertive: Subject + Verb ('He asked where I was going')."
    },
    {
      concept: "Combining 'That' with Wh- words or 'If'",
      confusion: "Writing 'He asked that where I was going' or 'He asked that if I was ready'.",
      clarity: "'That' must NEVER be used before Wh-words (*where, what, why*) or interrogative connectives (*if, whether*)."
    },
    {
      concept: "Forbade with 'Not'",
      confusion: "Writing 'Father forbade me not to go out in the rain.'",
      clarity: "'Forbade' already contains negative force (forbade = ordered not to). Adding 'not' is an erroneous double negative. Write: 'Father forbade me to go out' OR 'Father advised me not to go out'."
    },
    {
      concept: "Tense Shift with Present Reporting Verb",
      confusion: "Changing tenses when the reporting verb is 'says' or 'will say'.",
      clarity: "If the reporting verb is in the Present (*says, tells*) or Future (*will say*), the tense of the reported speech NEVER changes! 'He says, 'I am ill'' becomes 'He says that he is ill', NOT 'was ill'."
    }
  ],
  faqList: [
    {
      question: "When does the tense of the reported speech NOT change?",
      answer: "Tense does not change in two primary scenarios: (1) When the reporting verb is in the Present or Future tense (*says, will say*); (2) When the reported speech expresses a universal truth, scientific law, historical fact, regular habitual action, or proverb."
    },
    {
      question: "What is the difference between 'if' and 'whether' in reported questions?",
      answer: "Both can introduce Yes/No questions. However, 'whether' is preferred when there is an explicit choice between two alternatives or when followed by 'or not' (e.g., 'He asked whether I would accept the offer or not')."
    },
    {
      question: "How do we report 'must' in indirect speech?",
      answer: "When 'must' denotes immediate necessity or obligation in the past, it changes to 'had to' (e.g., 'He said, 'I must go now'' -> 'He said that he had to go then'). But when 'must' expresses a permanent rule, prohibition, or universal moral duty, it remains 'must'."
    },
    {
      question: "How are greetings like 'Good morning' and farewells like 'Good night' reported?",
      answer: "Greetings use the verb 'wished': 'She wished me good morning.' Farewells use the verb 'bade': 'He bade his friends good night / goodbye.'"
    },
    {
      question: "Why is 'that' omitted in imperative sentences?",
      answer: "Imperative sentences report actions through an infinitive phrase ('to + V1') rather than a finite clause. Therefore, 'to' serves as the connective and 'that' is not used."
    }
  ],
  oneLinerRevision: [
    "SON Formula: 1st person changes with Subject; 2nd person with Object; 3rd person undergoes No change.",
    "'Told' must be followed directly by an object without 'to' (e.g., 'He told me', never 'He told to me').",
    "If the reporting verb is in the Present or Future tense, the tense in reported speech never changes.",
    "Universal truths, scientific facts, proverbs, and historical events NEVER undergo tense backshift.",
    "Simple Past (V2) backshifts to Past Perfect (had + V3); Past Continuous backshifts to Past Perfect Continuous.",
    "Past Perfect and Past Perfect Continuous undergo NO change in indirect speech.",
    "In reported questions, syntax must change from interrogative to assertive (Subject + Verb) ending with a full stop.",
    "Never use 'that' before Wh-words ('where', 'what') or before 'if' / 'whether'.",
    "The reporting verb 'forbade' is already negative; never use 'not' with 'forbade'.",
    "'Let us' expressing a proposal transforms into 'proposed/suggested that we/they should + V1'."
  ],
  rapidRevision: {
    points: [
      "Pronoun Rule: S-O-N / 1-2-3 (1st -> Subject, 2nd -> Object, 3rd -> No change).",
      "Tense Backshift: V1 -> V2; is/am/are -> was/were; has/have -> had; V2 -> had + V3; was/were -> had been.",
      "Tense Immunity: Universal truths, scientific laws, proverbs, habitual facts, present/future reporting verbs.",
      "Assertive: said to -> told + that; Interrogative: said to -> asked + if/whether (or Wh-word) + assertive syntax.",
      "Imperative: said to -> ordered / advised / requested + to + V1; forbade + to + V1 (NO 'not').",
      "Exclamatory: exclaimed with joy/sorrow/wonder + that + assertive clause.",
      "Optative: prayed / wished + that + Subject + might + V1."
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
