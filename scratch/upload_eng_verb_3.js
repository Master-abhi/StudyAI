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
  id: "cgv_master_eng_verb_3",
  topicId: "eng_verb_3",
  chapterId: "cgv_master_sub_6_ch_3",
  subjectId: "cgv_master_sub_6",
  title: "Modal Verbs",
  subtitle: "Complete Study Notes on Modal Auxiliaries, Semi-Modals, and Modal Perfects for CG Vyapam Exams",
  overview: {
    introduction: "Modal verbs (or modal auxiliary verbs) are a special category of auxiliary verbs used to express the speaker's attitude, mode, or manner towards the action represented by the main verb. They convey meanings such as ability, permission, possibility, necessity, obligation, duty, advice, prohibition, willingness, and logical deduction. The primary modal verbs in English are Can, Could, May, Might, Shall, Should, Will, Would, Must, and Ought to. In addition, Need, Dare, and Used to function as semi-modals (marginal modals). Modals possess distinct grammatical properties: they do not change form with the subject (no '-s' or '-es' in 3rd person singular), they lack infinitive ('to can') and participle forms ('canning' / 'canned'), and they are invariably followed by a bare infinitive (the base form of the verb, V1), except 'ought' and 'used' which take 'to + V1'.",
    importance: "In CG Vyapam examinations—including Hostel Warden, Revenue Inspector (RI), Patwari, ADEO, Sub Inspector, and Assistant Teacher exams—Modal Verbs constitute one of the most frequently tested grammatical topics. Examiners routinely design fill-in-the-blank questions, error spotting items, and sentence transformation tasks centered around subtle distinctions between 'can' and 'may', 'must' and 'should', 'need not' and 'must not', and complex modal perfects ('could have', 'should have', 'must have', 'needn't have'). Mastering modals ensures students easily secure full marks in the English language section.",
    examRelevance: "CG Vyapam questions on Modal Verbs primarily test: (1) Correct choice of modal based on context (permission vs ability vs possibility); (2) Modal verb followed strictly by V1 (base form) rather than V2/V3/V-ing; (3) Semi-modals 'Need' and 'Dare' behaving as auxiliaries in negative/interrogative sentences (taking bare infinitive without 'to'); (4) Past deduction and unfulfilled past obligation using Modal + have + V3; (5) Polite requests and conditional clauses using 'Would' and 'Could'.",
    quickFacts: [
      { label: "Core Modals (9)", value: "Can, Could, May, Might, Shall, Should, Will, Would, Must" },
      { label: "Marginal / Semi-Modals (3)", value: "Need, Dare, Used to (plus Ought to which requires 'to')" },
      { label: "Golden Rule of Modals", value: "Modal + Base Form of Verb (V1) (e.g., 'He can drive', NOT 'He can drives')" },
      { label: "Modal Perfect Structure", value: "Modal + have + Past Participle (V3) (e.g., 'You should have informed us')" },
      { label: "Negative of Semi-Modals", value: "'Need not' and 'Dare not' take bare infinitive without 'to' (e.g., 'He need not go', NOT 'needs not' or 'need not to go')" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Nature, Characteristics & Core Rules of Modal Verbs",
      content: `### 1. What are Modal Auxiliaries?
A modal verb is an auxiliary verb used alongside a principal verb to indicate modality—that is, likelihood, ability, permission, request, capacity, suggestions, order, obligation, or advice.

Unlike primary auxiliary verbs ('be', 'do', 'have'), modal verbs cannot stand alone as the main verb (except when elided in answers) and have fixed structural characteristics.

---

### 2. Distinctive Grammatical Features of Modals
1. **No Third-Person '-s' / '-es'**:
   - Modals never take '-s' in the third-person singular present tense.
   - *Correct:* She **can** swim. / He **must** leave.
   - *Incorrect:* She cans swim. / He musts leave.

2. **Followed by Bare Infinitive (V1 without 'to')**:
   - All pure modals are directly followed by the base form of the main verb (V1).
   - *Correct:* They **may come** tomorrow. / You **should study** regularly.
   - *Incorrect:* They may to come. / You should studying.
   - *Exceptions:* **Ought to** and **Used to** inherently contain the particle 'to'.

3. **No Non-Finite Forms (No Infinitives or Participles)**:
   - Modals have no infinitive form (there is no 'to can', 'to must'), no present participle ('canning', 'musting'), and no past participle ('coulded', 'musted').
   - To express these concepts in other tenses, substitute phrases are used:
     - 'Can' is replaced by **'be able to'** (e.g., *I will be able to help you*).
     - 'Must' is replaced by **'have to'** (e.g., *I will have to go tomorrow*).

4. **Direct Negation & Inversion**:
   - Negatives are formed simply by adding 'not' directly after the modal verb (often contracted: *can't, couldn't, won't, wouldn't, shouldn't, needn't*).
   - Note spelling: **Cannot** is written as a single word in formal English.
   - Questions are formed by direct subject-auxiliary inversion without 'do/does/did':
     - *Can you help me?* (NOT *Do you can help me?*).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Modals of Ability, Possibility & Permission (Can, Could, May, Might)",
      content: `### 1. Can vs Could
#### A. Ability and Capability:
- **Can**: Expresses general physical or mental ability in the **present** or **future**.
  - *Example:* She **can** speak five languages fluently.
  - *Example:* Can you lift this heavy box?
- **Could**: Expresses general ability in the **past**.
  - *Example:* In my school days, I **could** run ten kilometers without stopping.
  - *Note on specific past achievement:* If someone succeeded in doing something in a specific past situation, use **'was/were able to'** or **'managed to'**, NOT 'could':
    - *Correct:* The fire spread quickly, but everyone **was able to** escape. (NOT *could escape*).

#### B. Permission:
- **Can**: Informal permission (used with friends, peers, family).
  - *Example:* **Can** I borrow your pen? / You **can** sit here.
- **Could**: More polite and formal request for permission than 'can'.
  - *Example:* **Could** I speak to the Manager, please? (Present time, polite tone).

---

### 2. May vs Might
#### A. Permission:
- **May**: Formal and respectful permission (standard in administrative and classroom contexts).
  - *Example:* **May** I come in, Sir? (Formal request).
  - *Example:* Candidates **may** leave the hall after two hours. (Official grant of permission).
- **Might**: Extremely hesitant, tentative, or formal request (rare in everyday speech).
  - *Example:* **Might** I make a suggestion?

#### B. Possibility:
- **May**: Good, realistic possibility (50% chance).
  - *Example:* Take an umbrella; it **may** rain tonight.
  - *Example:* The Chief Minister **may** visit Raipur next week.
- **Might**: Remote, weak possibility (20-30% chance).
  - *Example:* If you work hard, you **might** still clear the exam. (Weak probability).
  - *Example:* He **might** be at home, but I really doubt it.

#### C. Purpose (Subordinate Clauses):
- In complex sentences expressing purpose, **'may'** is used after present main clauses, and **'might'** after past main clauses:
  - *Present:* We eat that we **may** live. (Conjunction 'that' / 'so that' + may).
  - *Past:* He worked hard so that he **might** win the scholarship.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Modals of Obligation, Duty, Advice & Necessity (Must, Have to, Should, Ought to, Shall)",
      content: `### 1. Must vs Have to
Both 'must' and 'have to' express necessity or obligation, but CG Vyapam frequently tests their subtle contextual difference:
- **Must**: Internal obligation imposed by the speaker themselves, strong personal conviction, or official written rules.
  - *Internal conviction:* I **must** finish this syllabus before November; I cannot afford to waste time.
  - *Strong advice:* You **must** see a doctor immediately; you look terribly ill.
  - *Logical certainty (deduction):* His lights are on; he **must** be studying inside.
- **Have to**: External obligation imposed by external authority, law, circumstances, or institutional regulations.
  - *External rule:* In government offices, employees **have to** mark attendance biometricly.
  - *Past & Future necessity:* 'Must' has no past tense form. Therefore, **'had to'** is mandatory for past obligations:
    - *Present:* I must go. / I have to go.
    - *Past:* Yesterday, I **had to** walk three miles because the bus broke down. (NOT *I must walk*).
    - *Future:* You **will have to** submit the documents on Monday.

#### Distinction in Negatives (Crucial Exam Rule!):
- **Must not (Mustn't)**: Indicates **Prohibition** (it is forbidden / illegal / dangerous).
  - *Example:* You **must not** carry electronic gadgets inside the CG Vyapam examination hall.
- **Do not have to / Need not**: Indicates **Absence of Obligation** (it is optional; not necessary).
  - *Example:* Tomorrow is Sunday, so you **do not have to** go to work. (You can if you want, but no compulsion).

---

### 2. Should vs Ought to
- **Should**: Used for general advice, recommendation, mild obligation, or expectation.
  - *Example:* You **should** exercise daily for good health.
  - *Example:* Candidates **should** reach the exam venue 30 minutes before the reporting time.
- **Ought to**: Specifically indicates **moral duty**, ethical obligation, or constitutional righteousness.
  - *Example:* We **ought to** respect our national flag and constitution.
  - *Example:* You **ought to** take care of your elderly parents.
  - *Grammatical note:* 'Ought' must always be followed by the infinitive marker **'to'**:
    - *Correct:* You **ought to help** the poor.
    - *Negative:* You **ought not to** speak rudely. (NOT *ought to not*).

---

### 3. Shall vs Will (Traditional & Legal Usage)
- **Traditional First-Person Rule**:
  - 'Shall' with First Person (I, We) expresses simple future or polite inquiry (*Shall I open the window?*).
- **Rule of Colored Future (Command, Promise, Threat, Determination)**:
  - When expressing **command, promise, threat, determination, or legal compulsion**, the traditional usage reverses:
    - **Shall** is used with **Second and Third Person (You, He, She, They)**:
      - *Command/Rule:* Every citizen **shall** obey the law. / Trespassers **shall** be prosecuted.
      - *Promise:* You **shall** receive your certificate tomorrow.
      - *Threat:* He **shall** be punished for this misconduct.
    - **Will** is used with **First Person (I, We)**:
      - *Determination:* I **will** crack the CG Vyapam exam this year at all costs.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Modals of Willingness, Habit, Request & Condition (Will, Would, Used to)",
      content: `### 1. Would: Versatile Functions
1. **Polite Requests and Offers**:
   - 'Would' is the most formal and courteous modal for requests and invitations:
     - *Example:* **Would** you please pass the salt?
     - *Example:* **Would** you like a cup of tea?
     - *Idiomatic phrase:* **'Would you mind + V-ing'**:
       - *Correct:* Would you mind **opening** the window? (NOT *to open*).

2. **Past Habits & Repeated Past Actions**:
   - 'Would' denotes characteristic past actions that occurred repeatedly:
     - *Example:* During summer vacations, grandmother **would** tell us enchanting folktales every evening.

3. **Preference ('Would rather')**:
   - 'Would rather' means 'prefer' and is followed by a **bare infinitive (V1)**:
     - *Rule:* Subject + would rather + V1 + than + V1.
     - *Example:* I **would rather starve than beg**.
     - *Example:* She **would rather read** a book than watch television.

4. **Wish or Strong Desire**:
   - *Example:* **Would that** I were a bird! (= I wish I were a bird).

5. **Past form of 'Will' in Indirect Speech**:
   - *Direct:* He said, 'I will help you.'
   - *Indirect:* He said that he **would** help me.

---

### 2. Used to: Past Habit vs Past State
- **'Used to'** expresses a discontinued past habit, recurring action, or past state of affairs that was true in the past but is no longer true in the present.
  - *Past Habit:* He **used to smoke**, but he quit five years ago.
  - *Past State:* There **used to be** a massive banyan tree in front of our village school.

#### Critical Distinction: 'Would' vs 'Used to'
- Both 'used to' and 'would' describe repeated past actions (habits).
- **However, 'would' CANNOT be used to describe past states or conditions** (stative verbs like *be, have, live, belong, know*):
  - *Correct:* He **used to live** in Bilaspur.
  - *Incorrect:* He **would live** in Bilaspur. (Grammatically wrong for past permanent state).
  - *Correct:* She **used to have** long hair. (NOT *would have*).

#### 'Be / Get used to + V-ing' (Idiom of Familiarity):
- When preceded by a form of 'be' or 'get', 'used to' functions as an adjective meaning 'accustomed to', and is followed by a **gerund (V-ing)** or noun:
  - *Pattern:* Subject + is/am/are/was/were/get + **used to + V-ing**.
  - *Example:* He is **used to waking up** at 5:00 AM every morning. (Accustomed to).
  - *Contrast:* He **used to wake up** at 5:00 AM. (Past habit, now discontinued).`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Semi-Modals (Need, Dare) & Modal Perfect Constructions",
      content: `### 1. Semi-Modals: Need and Dare
'Need' (necessity) and 'Dare' (courage/boldness) are termed **marginal auxiliaries** or **semi-modals** because they can function both as **modal auxiliary verbs** and as **ordinary main verbs**.

#### A. When Used as Modal Auxiliaries:
- Occurs almost exclusively in **negative** and **interrogative** sentences.
- They take **no '-s'** in the third person singular.
- They do **not take 'do/does/did'**.
- They are followed by a **bare infinitive (V1 without 'to')**.
  - *Negative:* He **need not go** there. (NOT *needs not* and NOT *need not to go*).
  - *Negative:* She **dare not tell** a lie. (NOT *dares not*).
  - *Question:* **Need** I attend the meeting? (NOT *Do I need attend*).
  - *Question:* How **dare** you speak like that?

#### B. When Used as Ordinary Main Verbs:
- Take regular third person '-s' in the present singular.
- Require 'do / does / did' for negatives and questions.
- Followed by a **full infinitive ('to + V1')**.
  - *Affirmative:* He **needs to work** hard. (Main verb: 'needs' + 'to work').
  - *Negative:* He **does not need to go** there. (Main verb: 'does not need' + 'to go').
  - *Affirmative:* He **dares to challenge** the champion.
  - *Negative:* She **did not dare to answer** back.

---

### 2. Modal Perfects (Modal + have + V3)
Modal perfect constructions refer to past actions, speculations, unfulfilled duties, or logical deductions about past events:

1. **Should have + V3**:
   - Meaning: An action was desirable or obligatory in the past, but **was not performed** (criticism / regret).
   - *Example:* You **should have studied** harder for the exam. (Meaning: You didn't study hard).
   - *Negative:* You **should not have insulted** your teacher. (Meaning: You insulted them, which was wrong).

2. **Could have + V3**:
   - Meaning: Past ability or opportunity existed to perform an action, but **the action was not performed**.
   - *Example:* He **could have passed** the test easily, but he did not study.

3. **Must have + V3**:
   - Meaning: Strong logical deduction or certainty about a past event.
   - *Example:* The ground is wet; it **must have rained** last night.
   - *Example:* He scored 98% marks; he **must have worked** exceptionally hard.

4. **Might have / May have + V3**:
   - Meaning: Weak or moderate possibility that something happened in the past.
   - *Example:* He was absent; he **may have missed** the train.

5. **Needn't have + V3 vs Didn't need to + V1** (Very High Frequency in CG Vyapam!):
   - **Needn't have + V3**: An action was completed in the past, but it was **unnecessary in hindsight** (wasted effort).
     - *Example:* You **needn't have brought** an umbrella; it hasn't rained at all. (You brought it, but it wasn't needed).
   - **Didn't need to + V1**: It was not necessary to do something, so the person **did not do it** (or didn't have to).
     - *Example:* It was a national holiday, so I **didn't need to go** to school.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Core Modal Verbs: Primary Meanings, Forms & Standard Usage",
      headers: ["Modal Verb", "Primary Expressed Modalities", "Past Equivalent / Form", "Illustrative Example Sentence"],
      rows: [
        ["Can", "Ability, informal permission, theoretical possibility", "Could / was able to", "She can solve this problem in two minutes."],
        ["Could", "Past ability, polite present request, remote possibility", "Could have + V3 (unfulfilled)", "Could you please explain this question again?"],
        ["May", "Formal permission, factual possibility (50%), wish/prayer", "Might", "May God bless you with prosperity and health!"],
        ["Might", "Remote possibility (20-30%), hesitant suggestion", "Might have + V3", "He might attend the conference, but he is unwell."],
        ["Must", "Compulsion, strong moral duty, logical certainty", "Had to (past obligation)", "All candidates must carry their valid admit card."],
        ["Shall", "Offer (1st person), legal rule / command (2nd/3rd person)", "Should", "The borrower shall repay the loan within six months."],
        ["Should", "Advice, recommendation, logical expectation, duty", "Should have + V3", "You should revise the formulas daily."],
        ["Will", "Simple future (2nd/3rd person), determination/promise (1st)", "Would", "We will achieve our goal no matter how tough it is."],
        ["Would", "Polite request, preference (would rather), past habit", "Would have + V3", "I would rather have coffee than tea."],
        ["Ought to", "Moral obligation, civic duty, natural righteousness", "Ought to have + V3", "We ought to protect public property from damage."],
        ["Need", "Necessity (auxiliary in negative/questions without 'to')", "Needn't have + V3", "You need not attend tomorrow's orientation session."],
        ["Dare", "Courage / boldness (auxiliary in negative/questions)", "Dared not + V1", "How dare you open my confidential mail?"]
      ]
    },
    {
      tableId: "tab_2",
      title: "Critical Exam Distinctions: Confusing Modal Pairs",
      headers: ["Grammar Pair", "Key Distinctive Feature", "Common Exam Trap / Error", "Correct Pattern & Explanation"],
      rows: [
        ["Can vs May", "Can denotes physical/mental capability; May denotes formal permission or likelihood.", "Using 'can' in formal classroom/exam permission contexts.", "Say 'May I enter?' (formal); 'Can you run fast?' (ability)."],
        ["Must vs Have to", "Must denotes internal personal urge or official rule; Have to denotes external circumstance.", "Confusing past tense: 'Must' cannot be used for past completed obligations.", "Use 'had to' for past obligation: 'Yesterday I had to take a taxi' (NOT 'must take')."],
        ["Must not vs Don't have to", "Must not = strict prohibition (prohibited); Don't have to = lack of obligation (optional).", "Treating 'don't have to' as a ban.", "'You mustn't smoke' (banned) vs 'You don't have to bring lunch' (canteen is free)."],
        ["Should have vs Could have", "Should have + V3 = moral duty missed; Could have + V3 = past ability not utilized.", "Swapping regret of duty with past capability.", "'You should have helped him' (duty neglected); 'He could have won' (talent wasted)."],
        ["Needn't have vs Didn't need to", "Needn't have + V3 = action done needlessly; Didn't need to = not required, so not done.", "Using 'needn't to have' or confusing whether action happened.", "'I needn't have baked the cake' (cake baked unnecessarily)."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Semi-Modals Dual Behavior: Auxiliary Verb vs Main Verb Matrix",
      headers: ["Form & Structure", "Auxiliary Modal Behavior (Need / Dare)", "Ordinary Main Verb Behavior (Need / Dare)"],
      rows: [
        ["Third-Person Singular Present", "No '-s': 'He need not leave.' / 'He dare not speak.'", "Takes '-s': 'He needs to leave.' / 'He dares to speak.'"],
        ["Negative Formation", "Direct 'not' without do-support: 'She need not worry.'", "Requires do/does/did: 'She does not need to worry.'"],
        ["Interrogative Formation", "Direct inversion: 'Need we stay here?'", "Requires do/does/did: 'Do we need to stay here?'"],
        ["Infinitive Structure Following Verb", "Bare infinitive (V1 without 'to'): 'Dare she jump?'", "Full infinitive with 'to': 'Does she dare to jump?'"],
        ["Affirmative Declarative Usage", "Rare / generally avoided in modern standard English.", "Standard: 'He needs fresh water.' / 'She dared to speak.'"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Select the correct modal auxiliary to complete the sentence: 'Work hard lest you ________ fail.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) may",
        "B) should",
        "C) might",
        "D) can"
      ],
      correctAnswer: "B) should",
      explanation: "In English grammar, the conjunction 'lest' (meaning 'for fear that' or 'so that ... not') is invariably paired with the modal auxiliary 'should'. Using 'may', 'might', or 'will' after 'lest' is an extremely common grammatical error. Therefore, 'Work hard lest you should fail' is the only correct structure."
    },
    {
      question: "Identify the sentence that expresses prohibition: [CG Vyapam Patwari Exam]",
      options: [
        "A) You do not have to park here.",
        "B) You need not park here.",
        "C) You must not park here.",
        "D) You cannot have parked here."
      ],
      correctAnswer: "C) You must not park here.",
      explanation: "'Must not' (or 'mustn't') expresses strict prohibition, indicating that an action is illegal, forbidden, or against regulations. 'Do not have to' and 'need not' express lack of obligation (permission to choose), while 'cannot have parked' expresses negative deduction in the past."
    },
    {
      question: "Fill in the blank with the appropriate modal: 'He ________ swim across the river when he was young.' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) can",
        "B) could",
        "C) may",
        "D) might"
      ],
      correctAnswer: "B) could",
      explanation: "The clause 'when he was young' clearly establishes past time. To express general physical ability in the past, the modal 'could' (the past form of 'can') must be used. 'Can' is present, and 'may/might' denote possibility or permission rather than physical capability."
    },
    {
      question: "Choose the correct sentence: [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) He needs not to come here today.",
        "B) He need not to come here today.",
        "C) He need not come here today.",
        "D) He does not need come here today."
      ],
      correctAnswer: "C) He need not come here today.",
      explanation: "When 'need' functions as a modal auxiliary in a negative sentence, it takes no third-person '-s' (it remains 'need', NOT 'needs') and is strictly followed by a bare infinitive without 'to'. Thus, 'He need not come' is correct. If used as a main verb, it would require 'does not need to come'."
    },
    {
      question: "Fill in the blank: 'I ________ rather stay at home than go out in this heavy downpour.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) should",
        "B) could",
        "C) would",
        "D) must"
      ],
      correctAnswer: "C) would",
      explanation: "The idiomatic construction expressing preference is 'would rather + V1 + than + V1'. 'Would rather' functions as a fixed modal idiom meaning 'prefer'. Therefore, 'would' is the only grammatically valid choice."
    },
    {
      question: "The ground is completely soaked with water; it ________ heavily last night. [CG Vyapam ADEO Exam]",
      options: [
        "A) should have rained",
        "B) must have rained",
        "C) could have rained",
        "D) ought to have rained"
      ],
      correctAnswer: "B) must have rained",
      explanation: "The speaker is making a strong logical deduction or inference based on clear physical evidence ('the ground is completely soaked'). For logical certainty about a past event, 'must have + V3' (must have rained) is required. 'Should have rained' would imply unfulfilled duty or expectation, which is illogical here."
    }
  ],
  mcqs: [
    {
      question: "Fill in the blank: 'We ________ respect our national flag and abide by our constitutional values.'",
      options: [
        "A) can",
        "B) might",
        "C) ought to",
        "D) would"
      ],
      correctAnswer: "C) ought to",
      explanation: "'Ought to' is the standard modal auxiliary used to express moral obligation, civic duty, and ethical responsibility. Respecting the national flag and constitution is a fundamental civic duty."
    },
    {
      question: "Find the error in the sentence: 'She cannot (A) / to play the piano (B) / as well as her sister (C) / No error (D)'",
      options: [
        "A) Part A",
        "B) Part B",
        "C) Part C",
        "D) Part D (No error)"
      ],
      correctAnswer: "B) Part B",
      explanation: "Modal auxiliaries ('can', 'could', 'may', etc.) are followed strictly by a bare infinitive (the base verb form without 'to'). Hence, 'to play' in Part B is erroneous and must be replaced by 'play'."
    },
    {
      question: "'You needn't have bought the vegetables because I had already purchased them.' What does 'needn't have bought' imply?",
      options: [
        "A) The vegetables were not bought at all.",
        "B) The vegetables were bought, but it was an unnecessary action.",
        "C) The vegetables were required urgently.",
        "D) The buyer refused to buy the vegetables."
      ],
      correctAnswer: "B) The vegetables were bought, but it was an unnecessary action.",
      explanation: "The construction 'needn't have + past participle' indicates that an action was actually carried out in the past, but it turned out to be completely unnecessary in hindsight."
    },
    {
      question: "Choose the correct modal for a polite request: '________ you mind closing the door, please?'",
      options: [
        "A) Should",
        "B) Would",
        "C) Must",
        "D) Shall"
      ],
      correctAnswer: "B) Would",
      explanation: "'Would you mind + gerund (V-ing)' is the standard, highly polite idiom for making requests in English. Therefore, 'Would' is the correct answer."
    },
    {
      question: "Select the sentence with correct modal usage:",
      options: [
        "A) He dare to disobey his commander.",
        "B) How dare you to enter my cabin without permission?",
        "C) He dare not touch the high-voltage wire.",
        "D) She dares not ask any question in class."
      ],
      correctAnswer: "C) He dare not touch the high-voltage wire.",
      explanation: "In Option C, 'dare' is correctly used as a modal auxiliary in a negative sentence: it takes no third-person '-s' ('dare not', not 'dares not') and takes a bare infinitive ('touch', not 'to touch'). Option B incorrectly adds 'to enter'; Option D incorrectly adds '-s' in 'dares not'."
    },
    {
      question: "Fill in the blank: 'He worked day and night so that his family ________ live comfortably.'",
      options: [
        "A) may",
        "B) might",
        "C) can",
        "D) shall"
      ],
      correctAnswer: "B) might",
      explanation: "In purpose clauses introduced by 'so that', 'may' is used when the principal clause is in the present tense, and 'might' is used when the principal clause is in the past tense ('worked' is past, so 'might' is required)."
    },
    {
      question: "Which modal verb best conveys 'weak or remote possibility'?",
      options: [
        "A) Can",
        "B) Must",
        "C) Might",
        "D) Should"
      ],
      correctAnswer: "C) Might",
      explanation: "'Might' indicates the lowest degree of likelihood or remote possibility (approx. 20-30% probability), whereas 'may' expresses a realistic possibility (50%) and 'must' expresses strong logical certainty (95%+)."
    },
    {
      question: "Complete the sentence: 'When I lived in Ambikapur, there ________ be a dense forest behind our house.'",
      options: [
        "A) would",
        "B) used to",
        "C) should",
        "D) ought to"
      ],
      correctAnswer: "B) used to",
      explanation: "'Used to' can describe past permanent states as well as past habits. 'Would' cannot be used with stative verbs (like 'be', 'exist', 'live', 'have') to describe a past state. Hence, 'there used to be' is the only correct choice."
    }
  ],
  keyTerminology: [
    {
      term: "Modal Auxiliary Verb",
      definition: "A helper verb (can, may, must, should, etc.) that expresses the speaker's attitude towards the action, denoting ability, obligation, probability, or permission."
    },
    {
      term: "Bare Infinitive",
      definition: "The base form of a verb (V1) without the particle 'to' (e.g., 'go' instead of 'to go'), which is strictly required after all primary modal auxiliaries."
    },
    {
      term: "Semi-Modal (Marginal Modal)",
      definition: "A verb such as 'need', 'dare', or 'used to' that can function either as a modal auxiliary or as an ordinary main verb depending on sentence structure."
    },
    {
      term: "Modal Perfect",
      definition: "A grammatical structure formed by 'Modal + have + V3' (e.g., 'should have known', 'must have left') used to refer to past possibilities, unfulfilled obligations, or past deductions."
    },
    {
      term: "Epistemic Modality",
      definition: "Modality concerned with the degree of certainty, possibility, or probability of a proposition (e.g., 'It may rain', 'He must be tired')."
    },
    {
      term: "Deontic Modality",
      definition: "Modality concerned with duty, permission, obligation, or social necessity (e.g., 'You must obey rules', 'You may leave')."
    },
    {
      term: "Lest ... Should Construction",
      definition: "A classic subordinate clause pattern expressing purpose or prevention, where 'lest' is grammatically accompanied by 'should' and never 'may' or 'will'."
    },
    {
      term: "Discontinued Past Habit",
      definition: "An action or condition that was regularly performed in the past but has ceased entirely in the present, expressed specifically by 'used to + V1'."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapter on 'Auxiliary and Defective Verbs' covering core rules of Modals and Semi-Modals."
    },
    {
      title: "English Grammar in Use",
      author: "Raymond Murphy (Cambridge University Press)",
      details: "Units 26-41 detailing Modals of Ability, Obligation, Deduction, and Modal Perfect structures."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Comprehensive analysis of 'Needn't have vs Didn't need to', 'Would vs Used to', and 'Can vs May'."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Authentic previous year question papers from Hostel Warden, Patwari, RI, and Teacher recruitment exams."
    }
  ],
  confusionBuster: [
    {
      concept: "Can vs May",
      confusion: "Students often use 'Can I come in?' in formal interviews or official correspondence.",
      clarity: "'Can' denotes physical or mental capability/power ('Can you solve this puzzle?'). 'May' is required for formal, polite permission ('May I come in, Sir?') and factual possibility ('It may rain today')."
    },
    {
      concept: "Must vs Have to",
      confusion: "Treating 'must' and 'have to' as identical in all tenses and negative sentences.",
      clarity: "'Must' denotes speaker's internal conviction or official decree, whereas 'have to' denotes external obligation from law or rules. Furthermore, for past obligations, you MUST use 'had to' because 'must' has no past form."
    },
    {
      concept: "Must not vs Don't have to",
      confusion: "Thinking that 'don't have to' means prohibition.",
      clarity: "'Must not' means prohibited/banned (zero freedom: 'You mustn't enter'). 'Don't have to' means not required/optional (full freedom: 'You don't have to pay today; you can pay later')."
    },
    {
      concept: "Needn't have done vs Didn't need to do",
      confusion: "Confusing whether the past action actually occurred or not.",
      clarity: "'Needn't have + V3' means the person DID the action, but it turned out to be useless/unnecessary. 'Didn't need to + V1' means it was not necessary, so the person generally did NOT do the action."
    },
    {
      concept: "Would vs Used to for Past Habits",
      confusion: "Using 'would' to describe past states or permanent situations.",
      clarity: "Both can express past repeated actions ('He would/used to visit every Sunday'). But only 'used to' can describe past states ('There used to be a temple here', NOT 'There would be a temple here')."
    }
  ],
  faqList: [
    {
      question: "Why can't we say 'He cans do it' or 'She musts go'?",
      answer: "Modal verbs are defective verbs that have no third-person singular '-s' or '-es' inflection. They remain identical in form regardless of whether the subject is singular or plural ('I can', 'He can', 'They can')."
    },
    {
      question: "What is the difference between 'Shall I' and 'Will I'?",
      answer: "In modern English questions, 'Shall I / Shall we' is used to make polite offers, suggestions, or ask for guidance ('Shall we start?'). 'Will I' is rarely used because you cannot ask another person about your own future willingness."
    },
    {
      question: "Can two modal verbs be used together in a single clause?",
      answer: "No. In standard English, two modal verbs cannot be placed consecutively (e.g., 'He will can come' is grammatically incorrect). Instead, replace the second modal with its equivalent non-modal phrase: 'He will be able to come'."
    },
    {
      question: "How do we make 'ought to' negative and interrogative?",
      answer: "In the negative, 'not' is placed between 'ought' and 'to': 'You ought not to smoke' (contracted: 'oughtn't to'). In questions: 'Ought we to invite him?'"
    },
    {
      question: "Is 'dare' followed by 'to' or without 'to'?",
      answer: "When 'dare' is a modal auxiliary (in negatives/questions), it takes a bare infinitive without 'to': 'He dare not go.' When it is an ordinary main verb, it takes a full infinitive with 'to': 'He does not dare to go.'"
    }
  ],
  oneLinerRevision: [
    "Modal verbs are always directly followed by a Bare Infinitive (V1 without 'to'), except 'ought to' and 'used to'.",
    "Modals never change form: no '-s', '-es', '-ing', or '-ed' can ever be attached to a modal verb.",
    "'Cannot' is always written as a single compound word in formal English, not two separate words.",
    "Use 'could' for general past ability, but 'was/were able to' for managing a single specific task in the past.",
    "'May' indicates realistic 50% probability; 'might' indicates remote or weak 20-30% probability.",
    "After the conjunction 'lest', the only permissible modal auxiliary is 'should'.",
    "'Must not' signifies absolute prohibition; 'need not' signifies absence of obligation (optionality).",
    "'Would rather' expresses preference and is followed by a bare infinitive (V1) and 'than'.",
    "'Needn't have + V3' means an action was completed unnecessarily; 'didn't need to' means it was not required.",
    "'Used to' expresses discontinued past habits and past states; 'would' can express past habits but NEVER past states."
  ],
  rapidRevision: {
    points: [
      "Core Modals: Can, Could, May, Might, Shall, Should, Will, Would, Must (+ Ought to, Used to, Need, Dare).",
      "Rule 1: Modal + V1 (Base Form). Two modals can never occur together (*will must* is WRONG -> use *will have to*).",
      "Rule 2 (Permission): May (Formal/Polite), Can (Informal/Friendly), Could (Polite Request).",
      "Rule 3 (Deduction): Must (95%+ certainty), May (50%), Might (20%), Can't / Couldn't (Negative impossibility).",
      "Rule 4 (Obligation): Must (Internal conviction / Law), Have to (External circumstance), Should (General advice), Ought to (Moral duty).",
      "Rule 5 (Semi-Modals): 'Need not' and 'Dare not' take bare infinitive V1 (no 'to', no '-s').",
      "Rule 6 (Modal Perfects): Should have + V3 (missed duty), Must have + V3 (past deduction), Needn't have + V3 (wasted effort)."
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
