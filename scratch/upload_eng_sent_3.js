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
  id: "cgv_master_eng_sent_3",
  topicId: "eng_sent_3",
  chapterId: "cgv_master_sub_6_ch_5",
  subjectId: "cgv_master_sub_6",
  title: "Question Tags",
  subtitle: "Comprehensive Notes on Question Tag Rules, Exceptions & Special Patterns for CG Vyapam",
  overview: {
    introduction: "A Question Tag (or Tag Question) is a short interrogative phrase attached to the end of a declarative or imperative statement, primarily used to seek confirmation, agreement, or reassurance from the listener (e.g., 'You are a student, aren't you?'). Grammatically, a question tag consists of only two words: an appropriate Auxiliary Verb followed by a Personal Pronoun matching the subject of the statement, punctuated by a comma before the tag and a question mark at the end. The two cardinal principles of question tags are: (1) A Positive Statement requires a Negative Tag; and (2) A Negative Statement requires a Positive Tag. The subject in a tag is strictly a personal pronoun (never a proper or common noun), and negative tags must always use contracted forms (e.g., 'isn't', 'haven't', 'didn't', never 'is not').",
    importance: "In CG Vyapam competitive examinations (Hostel Warden, Revenue Inspector, Patwari, Sub Inspector, ADEO, and Teacher recruitment exams), Question Tags are among the most frequently tested and highest-scoring grammar topics. Questions regularly test tricky edge cases such as 'I am' (which takes 'aren't I?'), statements containing semi-negative words ('seldom', 'hardly', 'barely', 'few', 'little'), indefinite pronouns referring to persons ('everybody', 'someone', which take 'they' in the tag), and imperative suggestions ('Let's', which takes 'shall we?').",
    examRelevance: "CG Vyapam questions on Question Tags focus on: (1) Contracted negative auxiliary forms ('aren't I?', 'won't you?', 'shan't we?'); (2) Selecting the correct auxiliary verb when none is present in simple present/past statements (do/does/did); (3) Recognizing inherently negative words that demand a positive tag; (4) Agreement between plural pronoun 'they' and the tag auxiliary verb (e.g., 'Everyone is ready, aren't they?'); (5) Imperative sentences and 'Let us' proposals.",
    quickFacts: [
      { label: "Core Structural Rule", value: "Statement, + Auxiliary Verb + (n't) + Personal Pronoun?" },
      { label: "Polarity Rule", value: "Positive Statement -> Negative Tag; Negative Statement -> Positive Tag" },
      { label: "The 'I am' Exception", value: "'I am a teacher, aren't I?' (NOT 'amn't I?'); 'I am not late, am I?'" },
      { label: "The 'Let's' Rule", value: "'Let's go for a walk, shall we?'" },
      { label: "Subject Pronoun for Persons", value: "'Everybody', 'Nobody', 'Someone' take 'they' as tag subject (with plural verb)" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Anatomy of Question Tags & Fundamental Rules",
      content: `### 1. What is a Question Tag?
A question tag turns a statement into a question to invite agreement or verify facts:
- *Statement:* It is a pleasant morning.
- *With Tag:* It is a pleasant morning, **isn't it?**

---

### 2. Four Golden Rules of Question Tags
1. **Rule of Opposites (Polarity)**:
   - **Positive Statement -> Negative Tag**:
     - *He is working diligently, **isn't he?***
   - **Negative Statement -> Positive Tag**:
     - *She cannot drive a car, **can she?***

2. **Mandatory Contracted Forms in Negative Tags**:
   - In negative tags, the full form 'not' is **strictly forbidden**. Only contracted forms (*n't*) are permissible.
   - *Correct:* She sings well, **doesn't she?**
   - *Incorrect:* She sings well, **does not she?**
   - *Special Contractions to remember:*
     - will + not = **won't**
     - shall + not = **shan't**
     - can + not = **can't**
     - am + not = **aren't** (when used as a negative tag for 'I am')

3. **Subject of the Tag Must Be a Personal Pronoun**:
   - The tag subject is NEVER a noun. It must be a corresponding personal pronoun (*I, we, you, he, she, it, they*) or the introductory dummy subject **'there'**.
   - *Direct:* **Ramesh** passed the examination, **didn't he?** (NOT *didn't Ramesh?*).
   - *Direct:* **The girls** were dancing, **weren't they?** (NOT *weren't the girls?*).
   - *With 'There':* **There** is a problem, **isn't there?**

4. **Tense Consistency**:
   - The tense of the tag must strictly match the tense of the main statement.
   - If the main sentence contains an auxiliary verb (*is, are, was, were, has, have, had, will, would, can, could*), reuse that same auxiliary in the tag.
   - If the main sentence has **no auxiliary verb** (Simple Present or Simple Past):
     - Use **do / don't** (for 1st/2nd person & plural present: *I, we, you, they*).
     - Use **does / doesn't** (for 3rd person singular present: *he, she, it*).
     - Use **did / didn't** (for Simple Past: *V2*).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Auxiliary Selection Across Tenses & The 'Do/Does/Did' Mechanism",
      content: `### 1. When an Auxiliary Verb is Present
Simply mirror the auxiliary verb, reversing its polarity:
- *Present Continuous:* Rohan is playing football, **isn't he?**
- *Past Continuous:* They were enjoying the show, **weren't they?**
- *Present Perfect:* We have achieved our target, **haven't we?**
- *Past Perfect:* She had informed you earlier, **hadn't she?**
- *Future Simple:* You will help me in this project, **won't you?**
- *Modal Auxiliary:* Candidates can apply online, **can't they?**
- *Negative Statement:* We should not waste drinking water, **should we?**

---

### 2. When No Auxiliary Verb is Present (Simple Tenses)
In simple tenses where no helping verb appears in affirmative statements, introduce the appropriate form of **'do'**:

#### A. Simple Present Tense:
- With Plural Subject / I / We / You / They -> use **don't**:
  - *Example:* You speak Chhattisgarhi fluently, **don't you?**
  - *Example:* They live in Bilaspur, **don't they?**
- With Singular 3rd Person Subject (He, She, It, Singular Noun) -> use **doesn't**:
  - *Example:* She works in a government hospital, **doesn't she?**
  - *Example:* The sun shines brightly, **doesn't it?**

#### B. Simple Past Tense:
- With all subjects in the past tense (V2) -> use **didn't**:
  - *Example:* India won the cricket match, **didn't it?**
  - *Example:* She told you the entire truth, **didn't she?**
  - *Example:* They came by the night bus, **didn't they?**

---

### 3. The Special Case of 'Have' (Main Verb vs Auxiliary)
- When 'have / has / had' indicates **possession** or action (as a main verb):
  - In modern and examination English, forms of 'do' are preferred:
    - *Example:* He has a magnificent car, **doesn't he?** (Also accepted: *hasn't he?*, but *doesn't he?* is preferred).
    - *Example:* You had your breakfast, **didn't you?** (NOT *hadn't you?* because 'had' means 'ate').
- When 'have / has / had' acts as an **auxiliary** (followed by V3):
  - *Example:* You have eaten your breakfast, **haven't you?**`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Inherent Negatives & Semi-Negative Words",
      content: `### 1. Inherent Negatives (Demanding Positive Tags)
Certain words in English contain negative force even though the sentence structure looks affirmative. When a statement contains any of these words, the statement is classified as **grammatically negative**, and therefore **MUST take a POSITIVE question tag**!

#### List of Inherently Negative Words:
- **Adverbs:** *seldom, rarely, hardly, scarcely, barely, never, neither*.
- **Pronouns:** *nobody, no one, none, nothing, neither*.
- **Determiners:** *few, little* (without article 'a').

---

### 2. Illustrative Exam Examples:
- *Seldom / Rarely:*
  - Barking dogs **seldom** bite, **do they?** (NOT *don't they?*).
  - She **rarely** visits her ancestral village, **does she?**
- *Hardly / Scarcely / Barely:*
  - He **hardly** knows anyone in Raipur, **does he?**
  - They **scarcely** have enough food, **do they?**
- *Never / Neither:*
  - My uncle **never** drinks alcohol, **does he?**
  - **Neither** of the two plans worked, **did they?**
- *Nothing / Nobody:*
  - **Nothing** was delivered yesterday, **was it?**
  - **Nobody** called me today, **did they?**

---

### 3. The Critical Difference: 'Few / Little' vs 'A Few / A Little'
This is one of CG Vyapam's most celebrated trick questions:
1. **'Few' and 'Little' (Negative in meaning = almost none)**:
   - Convey a negative sense; therefore, they take a **POSITIVE tag**.
   - *Example:* There are **few** buses on this route after 8 PM, **are there?**
   - *Example:* He has **little** knowledge of computers, **does he?** (OR *has he?*).
2. **'A few' and 'A little' (Positive in meaning = some / a small quantity)**:
   - Convey a positive, affirmative sense; therefore, they take a **NEGATIVE tag**.
   - *Example:* There are **a few** students in the library, **aren't there?**
   - *Example:* He has **a little** hope of recovery, **doesn't he?**`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Indefinite Pronouns as Subjects (Person vs Thing Rules)",
      content: `### 1. Indefinite Pronouns Referring to Persons
When the subject of the statement is an indefinite pronoun referring to people:
- *Everyone, Everybody, Someone, Somebody, Anyone, Anybody, No one, Nobody, None, Neither, Either*.

#### Two Vital Rules for Person Indefinite Pronouns:
1. The pronoun used in the question tag is **strictly 'THEY'**.
2. **Plural Verb Concord**: Even though these pronouns take singular verbs in the main statement, the tag verb **must be PLURAL** to agree with 'they'!

#### Exam-Focused Examples:
- *Everyone has submitted the form:*
  - Singular verb in statement: 'has'.
  - Tag subject: 'they'.
  - Plural verb matching 'they': 'have'.
  - Positive statement -> Negative tag: **haven't they?**
  - *Correct:* Everyone has submitted the form, **haven't they?** (NOT *hasn't they?* or *hasn't he?*).
- *Everybody was present in the meeting:*
  - Statement has 'was' (singular).
  - Tag subject 'they' requires 'were' (plural).
  - *Correct:* Everybody was present, **weren't they?** (NOT *wasn't they?*).
- *Nobody was aware of the incident:*
  - 'Nobody' is negative -> tag must be positive.
  - Tag subject 'they' requires plural 'were'.
  - *Correct:* Nobody was aware of the incident, **were they?** (NOT *was they?*).
- *Someone stole my wallet:*
  - Simple Past -> 'did'.
  - *Correct:* Someone stole my wallet, **didn't they?**

---

### 2. Indefinite Pronouns Referring to Things
When the subject refers to non-living things or abstractions:
- *Everything, Something, Anything, Nothing*.

#### Rules for Thing Indefinite Pronouns:
1. The pronoun used in the question tag is **strictly 'IT'**.
2. The verb in the tag remains **singular** (matching 'it').

#### Exam-Focused Examples:
- *Everything is fine,* **isn't it?**
- *Something was burning in the kitchen,* **wasn't it?**
- *Nothing is impossible in this world:*
  - 'Nothing' is negative -> tag is positive.
  - *Correct:* Nothing is impossible, **is it?**
- *Nothing happened during our absence,* **did it?**`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Special Exceptions (I am, Imperatives, Let's, Used to)",
      content: `### 1. The 'I am' Exception
- In affirmative statements beginning with **'I am'**, there is no grammatical contraction 'amn't I' in standard English.
- Therefore, the negative tag used is **'aren't I?'**:
  - *Statement:* I am right.
  - *Tag:* I am right, **aren't I?** (NOT *amn't I?*).
  - *Statement:* I am a registered voter in Raipur.
  - *Tag:* I am a registered voter in Raipur, **aren't I?**
- **However, in negative statements with 'I am not'**, the regular positive tag is **'am I?'**:
  - *Statement:* I am not late today.
  - *Tag:* I am not late today, **am I?**

---

### 2. Imperative Sentences (Commands, Orders, Requests)
In imperative sentences where the subject 'You' is implied:
1. **Affirmative Imperative (Command / Instruction / Request)**:
   - Tag can be **'will you?'** or **'won't you?'** ('won't you?' is more polite and invites acceptance):
     - *Example:* Please close the window, **will you?** (OR **won't you?**).
     - *Example:* Give me a hand with this trunk, **will you?**
2. **Negative Imperative (Prohibition / 'Don't...')**:
   - Strictly takes the positive tag **'will you?'**:
     - *Example:* Don't make a noise in class, **will you?**
     - *Example:* Don't forget to lock the door, **will you?**
3. **Impatient / Stern Order**:
   - Can take **'can't you?'**:
     - *Example:* Shut your mouth, **can't you?**

---

### 3. Proposals with 'Let's' vs Requests with 'Let us / Let me'
1. **'Let's' (or 'Let us') expressing a suggestion or joint proposal**:
   - The tag is ALWAYS **'shall we?'**:
     - *Example:* Let's play cricket, **shall we?**
     - *Example:* Let's help the flood victims, **shall we?**
2. **'Let us' or 'Let me' expressing a request for permission**:
   - The tag is **'will you?'**:
     - *Example:* Let us go home now, Sir, **will you?**
     - *Example:* Let me speak without interruption, **will you?**

---

### 4. Other Notable Special Tags
- **Used to**: Takes **'didn't + pronoun?'**:
  - *Example:* He used to live in Jagdalpur, **didn't he?**
- **Ought to**: Takes **'oughtn't + pronoun?'** (or *shouldn't*):
  - *Example:* We ought to follow traffic laws, **oughtn't we?**
- **Introductory 'This / That'**: Changes to **'it'** in the tag:
  - *Example:* This is your bicycle, **isn't it?**
- **Introductory 'These / Those'**: Changes to **'they'** in the tag:
  - *Example:* Those are your books, **aren't they?**`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master Question Tag Formation Chart: Tenses & Auxiliaries",
      headers: ["Sentence Tense / Category", "Affirmative Example with Tag", "Negative Example with Tag"],
      rows: [
        ["Simple Present (be-verb)", "He is clever, isn't he?", "He is not clever, is he?"],
        ["Simple Present (Action verb)", "She reads novels, doesn't she?", "She does not read novels, does she?"],
        ["Simple Past (Action verb)", "They arrived late, didn't they?", "They did not arrive late, did they?"],
        ["Present Continuous", "We are learning English, aren't we?", "We are not learning English, are we?"],
        ["Past Continuous", "The train was running fast, wasn't it?", "The train was not running fast, was it?"],
        ["Present Perfect", "You have finished dinner, haven't you?", "You have not finished dinner, have you?"],
        ["Past Perfect", "She had called earlier, hadn't she?", "She had not called earlier, had she?"],
        ["Simple Future (will)", "He will join us tomorrow, won't he?", "He will not join us tomorrow, will he?"],
        ["Modal Auxiliary (can/could)", "You can solve this puzzle, can't you?", "You cannot solve this puzzle, can you?"],
        ["Special: 'I am'", "I am your friend, aren't I?", "I am not your friend, am I?"]
      ]
    },
    {
      tableId: "tab_2",
      title: "Indefinite Pronouns & Subject-Verb Agreement in Tags",
      headers: ["Statement Subject Category", "Pronoun in Tag", "Tag Verb Number", "Representative Example Sentence"],
      rows: [
        ["Everybody / Everyone", "they", "PLURAL", "Everybody has submitted their fees, haven't they?"],
        ["Somebody / Someone", "they", "PLURAL", "Someone was knocking at the door, weren't they?"],
        ["Nobody / No one", "they", "PLURAL (Positive)", "Nobody has solved this question, have they?"],
        ["Anybody / Anyone", "they", "PLURAL", "Anyone can do this, can't they?"],
        ["Everything", "it", "SINGULAR", "Everything looks splendid, doesn't it?"],
        ["Something", "it", "SINGULAR", "Something went wrong, didn't it?"],
        ["Nothing", "it", "SINGULAR (Positive)", "Nothing was found in his bag, was it?"],
        ["This / That", "it", "SINGULAR", "This is an ancient monument, isn't it?"],
        ["These / Those", "they", "PLURAL", "These are fresh mangoes, aren't they?"],
        ["There (dummy subject)", "there", "MATCHES VERB", "There were forty students, weren't there?"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Special & Imperative Question Tag Formulas",
      headers: ["Statement Type / Trigger", "Tag Polarity & Verb", "Mandatory Tag Pronoun", "Complete Model Example"],
      rows: [
        ["I am (Affirmative)", "Negative: aren't", "I", "I am fortunate, aren't I?"],
        ["I am not (Negative)", "Positive: am", "I", "I am not guilty, am I?"],
        ["Let's / Let us (Proposal)", "Positive: shall", "we", "Let's begin the test, shall we?"],
        ["Let me / Let us (Request)", "Positive: will", "you", "Let me examine the paper, will you?"],
        ["Affirmative Imperative", "will / won't", "you", "Please pass the salt, will you / won't you?"],
        ["Negative Imperative ('Don't')", "Positive: will", "you", "Don't drive carelessly, will you?"],
        ["Semi-Negative (seldom/hardly)", "Positive: do/does/did", "Matching subject", "He seldom visits Raipur, does he?"],
        ["Used to (Past habit)", "Negative: didn't", "Matching subject", "He used to smoke, didn't he?"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Choose the correct question tag: 'I am a teacher, ________?' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) amn't I?",
        "B) aren't I?",
        "C) isn't I?",
        "D) don't I?"
      ],
      correctAnswer: "B) aren't I?",
      explanation: "In standard English grammar, there is no contracted form 'amn't I'. When an affirmative statement begins with 'I am', the mandatory negative question tag is 'aren't I?'. If the statement were negative ('I am not a teacher'), the tag would be 'am I?'."
    },
    {
      question: "Fill in the blank with the appropriate question tag: 'Barking dogs seldom bite, ________?' [CG Vyapam Patwari Exam]",
      options: [
        "A) don't they?",
        "B) do they?",
        "C) isn't it?",
        "D) doesn't it?"
      ],
      correctAnswer: "B) do they?",
      explanation: "The adverb 'seldom' is inherently negative in meaning, making the statement grammatically negative. Therefore, it requires a POSITIVE question tag. 'Dogs' is plural (pronoun 'they') and the tense is Simple Present ('bite'), so the positive tag is 'do they?'."
    },
    {
      question: "Select the correct tag: 'Let us go for a morning walk, ________?' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) will you?",
        "B) shan't we?",
        "C) shall we?",
        "D) can we?"
      ],
      correctAnswer: "C) shall we?",
      explanation: "When a sentence begins with 'Let us' or 'Let's' to express a mutual suggestion or proposal, the fixed question tag is invariably 'shall we?'."
    },
    {
      question: "Choose the correct tag: 'Everybody has finished the test, ________?' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) hasn't he?",
        "B) haven't they?",
        "C) hasn't they?",
        "D) don't they?"
      ],
      correctAnswer: "B) haven't they?",
      explanation: "Indefinite pronouns denoting persons ('Everybody', 'Everyone') take the personal pronoun 'they' as the tag subject. Since 'they' is plural, the auxiliary verb must also be plural: 'haven't they?'. (Writing 'hasn't they' violates subject-verb concord)."
    },
    {
      question: "Complete the sentence with the correct question tag: 'Don't make a noise, ________?' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) will you?",
        "B) won't you?",
        "C) shall you?",
        "D) do you?"
      ],
      correctAnswer: "A) will you?",
      explanation: "For a negative imperative sentence beginning with 'Don't', the standard question tag is always positive: 'will you?'."
    },
    {
      question: "Add a question tag: 'There are forty students in the classroom, ________?' [CG Vyapam ADEO Exam]",
      options: [
        "A) aren't they?",
        "B) aren't there?",
        "C) are there?",
        "D) isn't it?"
      ],
      correctAnswer: "B) aren't there?",
      explanation: "When a sentence begins with the introductory dummy subject 'there', 'there' is retained as the subject in the question tag. Since the statement is positive and uses plural 'are', the negative tag is 'aren't there?'."
    }
  ],
  mcqs: [
    {
      question: "Fill in the blank: 'He hardly ever tells the truth, ________?'",
      options: [
        "A) doesn't he?",
        "B) does he?",
        "C) is he?",
        "D) isn't he?"
      ],
      correctAnswer: "B) does he?",
      explanation: "'Hardly' conveys a negative meaning, which makes the statement negative. A negative statement requires a positive question tag in the simple present: 'does he?'."
    },
    {
      question: "Choose the correct question tag: 'Nothing was damaged in the storm, ________?'",
      options: [
        "A) wasn't it?",
        "B) were they?",
        "C) was it?",
        "D) didn't it?"
      ],
      correctAnswer: "C) was it?",
      explanation: "'Nothing' is an indefinite pronoun for things (takes pronoun 'it') and carries an inherently negative meaning. Hence, the tag must be positive: 'was it?'."
    },
    {
      question: "Select the correct tag: 'He used to play badminton during his college days, ________?'",
      options: [
        "A) usedn't he?",
        "B) didn't he?",
        "C) wouldn't he?",
        "D) did he?"
      ],
      correctAnswer: "B) didn't he?",
      explanation: "In modern English grammar, 'used to' in affirmative statements takes the question tag 'didn't he?'."
    },
    {
      question: "Fill in the blank: 'There is little hope of his survival, ________?'",
      options: [
        "A) is there?",
        "B) isn't there?",
        "C) is it?",
        "D) isn't it?"
      ],
      correctAnswer: "A) is there?",
      explanation: "'Little' (without 'a') means 'almost none' and makes the sentence negative. With introductory 'there', the positive question tag is 'is there?'."
    },
    {
      question: "Choose the correct question tag: 'He has a few friends in Bilaspur, ________?'",
      options: [
        "A) has he?",
        "B) doesn't he?",
        "C) does he?",
        "D) hasn't they?"
      ],
      correctAnswer: "B) doesn't he?",
      explanation: "'A few' has a positive meaning (some friends), making the statement affirmative. Therefore, it requires a negative tag. 'Has' functions here as a main verb (possession), taking 'doesn't he?'."
    },
    {
      question: "Identify the correct tag: 'Close the door behind you, ________?'",
      options: [
        "A) will you?",
        "B) do you?",
        "C) don't you?",
        "D) shall you?"
      ],
      correctAnswer: "A) will you?",
      explanation: "For an affirmative imperative command or instruction, the conventional question tag is 'will you?' (or 'won't you?')."
    },
    {
      question: "Fill in the blank: 'Neither of them was invited to the party, ________?'",
      options: [
        "A) was he?",
        "B) was they?",
        "C) were they?",
        "D) weren't they?"
      ],
      correctAnswer: "C) were they?",
      explanation: "'Neither' is inherently negative, demanding a positive tag. Furthermore, 'neither of them' refers to people, requiring the pronoun 'they' in the tag, which takes the plural past verb 'were': 'were they?'."
    },
    {
      question: "Select the correct tag: 'You won't tell anyone our secret, ________?'",
      options: [
        "A) will you?",
        "B) won't you?",
        "C) would you?",
        "D) can you?"
      ],
      correctAnswer: "A) will you?",
      explanation: "The statement is negative ('won't' = will not); therefore, the tag must be positive: 'will you?'."
    }
  ],
  keyTerminology: [
    {
      term: "Question Tag",
      definition: "A miniature question appended to the end of a statement to seek confirmation or agreement from the listener."
    },
    {
      term: "Polarity",
      definition: "The positive (affirmative) or negative grammatical status of a clause; question tags operate under reversed polarity relative to the statement."
    },
    {
      term: "Contracted Negative",
      definition: "A shortened negative auxiliary form (e.g., isn't, haven't, won't, aren't) strictly required in all negative question tags."
    },
    {
      term: "Dummy Subject 'There'",
      definition: "The expletive word 'there' used to introduce a sentence, which is uniquely retained as the subject of the question tag."
    },
    {
      term: "Semi-Negative Words",
      definition: "Adverbs and determiners (seldom, hardly, scarcely, few, little) that impart negative meaning to an ostensibly affirmative clause."
    },
    {
      term: "Tag Concord",
      definition: "Subject-verb agreement within the question tag, particularly requiring plural verbs with the tag pronoun 'they' (e.g., 'haven't they')."
    },
    {
      term: "Imperative Tag",
      definition: "A question tag attached to a command, request, or prohibition, predominantly formulated with 'will you?' or 'shall we?'."
    },
    {
      term: "Intonation",
      definition: "The pitch modulation of the voice: a falling intonation indicates expecting agreement; a rising intonation indicates a genuine question."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapter on 'Question Tags' detailing auxiliary verb selection, 'I am' rule, and imperative tags."
    },
    {
      title: "English Grammar in Use",
      author: "Raymond Murphy (Cambridge University Press)",
      details: "Unit 52 covering question tags, intonation patterns, and common conversational usages."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Sections on question tag rules, semi-negatives, and pronoun concord for 'everyone' and 'nobody'."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Official previous year question papers from Patwari, Hostel Warden, RI, and Teacher recruitment examinations."
    }
  ],
  confusionBuster: [
    {
      concept: "I am -> aren't I vs amn't I",
      confusion: "Writing 'I am right, amn't I?' or 'am not I?'.",
      clarity: "'Amn't I' does not exist in standard English. The only correct negative question tag for 'I am' is 'aren't I?'. However, for 'I am not', use 'am I?'."
    },
    {
      concept: "Everybody has -> hasn't they vs haven't they",
      confusion: "Writing 'Everybody has come, hasn't they?'.",
      clarity: "The tag subject for 'everybody' is 'they'. A plural subject requires a plural verb. Therefore, 'has' must change to 'have': 'haven't they?'."
    },
    {
      concept: "Few vs A few / Little vs A little",
      confusion: "Treating 'few' and 'a few' as identical in question tags.",
      clarity: "'Few' and 'Little' are NEGATIVE (almost none) -> take POSITIVE tags ('do they?', 'is there?'). 'A few' and 'A little' are POSITIVE (some) -> take NEGATIVE tags ('don't they?', 'isn't there?')."
    },
    {
      concept: "Let's vs Let us / Let me",
      confusion: "Using 'shall we?' for all sentences starting with 'Let'.",
      clarity: "Use 'shall we?' ONLY when 'Let's / Let us' means a joint suggestion ('Let's go'). When 'Let me' or 'Let us' means asking permission ('Let me go home'), use 'will you?'."
    },
    {
      concept: "Noun in Tag Subject",
      confusion: "Writing 'Rohan is smart, isn't Rohan?'.",
      clarity: "The subject of a question tag can NEVER be a noun. Always substitute the appropriate personal pronoun: 'Rohan is smart, isn't he?'."
    }
  ],
  faqList: [
    {
      question: "Why do we use 'aren't I?' instead of 'amn't I?'",
      answer: "In historical English, 'ain't I' evolved phonetically into 'aren't I'. Because 'amn't' proved difficult to pronounce, standard modern English grammar officially adopted 'aren't I?' as the grammatical question tag for 'I am'."
    },
    {
      question: "Can we use 'is it?' or 'isn't it?' as a universal question tag?",
      answer: "No! Using 'isn't it?' indiscriminately for all statements is a common colloquial Indian English error. The auxiliary verb and pronoun in the tag must strictly agree with the verb and subject of the sentence."
    },
    {
      question: "What is the question tag for 'None of the food was wasted'?",
      answer: "'None of the food' refers to an uncountable substance ('food' = 'it'). 'None' is negative. Therefore, the tag is positive: 'was it?'."
    },
    {
      question: "What tag is used for 'Open the window'?",
      answer: "For affirmative imperatives, both 'will you?' (casual) and 'won't you?' (polite invitation) are correct, with 'will you?' being standard in Vyapam answer keys."
    },
    {
      question: "What is the tag for 'He has to leave now'?",
      answer: "In 'He has to leave', 'has' is followed by an infinitive ('to leave') expressing obligation. Its tag is 'doesn't he?' (NOT 'hasn't he?')."
    }
  ],
  oneLinerRevision: [
    "A question tag consists strictly of an Auxiliary Verb + Personal Pronoun.",
    "Positive Statement takes a Negative Tag; Negative Statement takes a Positive Tag.",
    "The negative question tag for 'I am' is strictly 'aren't I?'.",
    "Sentences with 'Let's / Let us' expressing a proposal take 'shall we?'.",
    "Words like 'seldom', 'hardly', 'barely', 'rarely', 'scarcely', 'few', and 'little' take positive tags.",
    "'Few' takes a positive tag; 'A few' takes a negative tag.",
    "Indefinite pronouns for persons (everybody, someone, nobody) take 'they' as tag subject with plural verb.",
    "Indefinite pronouns for things (everything, something, nothing) take 'it' as tag subject.",
    "Negative imperatives starting with 'Don't' strictly take 'will you?'.",
    "The dummy subject 'there' is retained as the subject in the question tag (e.g., 'isn't there?')."
  ],
  rapidRevision: {
    points: [
      "Cardinal Rule: Polarity flips (+ to -; - to +); Contracted form mandatory for negative tag (n't).",
      "I am Rule: 'I am' -> aren't I?; 'I am not' -> am I?.",
      "Proposals: 'Let's...' -> shall we?; Imperatives: 'Don't...' -> will you?.",
      "Inherent Negatives: seldom, hardly, scarcely, rarely, few, little -> Positive Tag.",
      "Persons: Everyone/Somebody/Nobody -> they (with plural verb, e.g., haven't they?).",
      "Things: Everything/Something/Nothing -> it (with singular verb, e.g., isn't it?).",
      "No Auxiliary: Simple Present -> don't/doesn't; Simple Past -> didn't."
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
