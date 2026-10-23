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
  id: "cgv_master_eng_voice_1",
  topicId: "eng_voice_1",
  chapterId: "cgv_master_sub_6_ch_4",
  subjectId: "cgv_master_sub_6",
  title: "Active and Passive Voice",
  subtitle: "Comprehensive Study Notes on Voice Transformation, Rules, Tense Charts & Exceptions for CG Vyapam",
  overview: {
    introduction: "Voice is the grammatical form of a transitive verb that indicates whether the subject of the sentence performs the action (Active Voice) or receives the action (Passive Voice). In the Active Voice, the focus is on the doer or agent ('Ramesh repaired the car'). In the Passive Voice, the focus shifts to the object, action, or receiver ('The car was repaired by Ramesh'). Only transitive verbs (verbs possessing a direct or indirect object) can be transformed into the passive voice. The fundamental conversion rule requires: (1) Transposing the active object into the passive subject; (2) Using an appropriate conjugated form of the auxiliary verb 'be' matching the tense and number of the new subject; (3) Converting the principal verb into its Past Participle form (V3); and (4) Placing the original subject after the preposition 'by' (or other specific prepositions) as the agent.",
    importance: "Active and Passive Voice is one of the highest-yielding topics in CG Vyapam English sections. Examinations such as Hostel Warden, Patwari, Revenue Inspector (RI), Sub Inspector (SI), ADEO, and Teacher consistently feature 2 to 4 direct questions on voice transformation. Questions test students on tricky areas like imperative sentences ('Let it be done'), interrogatives ('Who wrote this?' -> 'By whom was this written?'), verbs taking prepositions other than 'by' ('known to', 'surprised at'), and non-convertible continuous tenses.",
    examRelevance: "CG Vyapam tests: (1) Direct transformation from Active to Passive and vice-versa; (2) Four tenses that have no standard passive voice (Present Perfect Continuous, Past Perfect Continuous, Future Continuous, and Future Perfect Continuous); (3) Imperative sentences expressing command, order, suggestion, and request; (4) Sentences with two objects (Direct and Indirect objects); (5) Quasi-passive verbs ('Honey tastes sweet'); (6) Correct prepositions accompanying specific verbs in the passive voice.",
    quickFacts: [
      { label: "Core Transformation Formula", value: "Subject (Object of Active) + Form of 'be' + V3 + by/prep + Object (Subject of Active)" },
      { label: "Convertible Tenses", value: "8 out of 12 tenses can be converted into passive voice" },
      { label: "Non-Convertible Tenses (4)", value: "Present/Past/Future Perfect Continuous, and Future Continuous" },
      { label: "Imperative Voice Formula", value: "Let + Subject/Object + be + Past Participle (V3)" },
      { label: "Interrogative 'Who' Conversion", value: "'Who' changes to 'By whom' at the start of the passive clause" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Foundations of Voice & Core Conversion Principles",
      content: `### 1. What is Voice?
Voice describes the relationship between the action (verb) and the participants (subject and object) in a sentence:
- **Active Voice**: The subject is the **doer** (agent) of the action.
  - *Example:* The police **caught** the thief. (Subject 'The police' actively performs the action).
- **Passive Voice**: The subject is the **receiver** (patient) of the action.
  - *Example:* The thief **was caught** by the police. (Subject 'The thief' receives the action).

---

### 2. Four Golden Steps for Active to Passive Conversion
1. **Identify the Components**: Locate the Subject (S), Verb (V), and Object (O) in the active sentence.
2. **Swap Positions**: Make the active object the subject of the passive sentence. Make the active subject the object preceded by the preposition 'by' (or other required preposition).
3. **Conjugate Auxiliary 'Be'**: Insert the correct form of the auxiliary verb **'be'** (*am, is, are, was, were, be, being, been*) matching the tense of the active verb and the number/person of the new passive subject.
4. **Use Past Participle (V3)**: Change the main verb invariably into its **Past Participle (V3)** form.

---

### 3. Subject-Object Pronoun Shift Table
When pronouns move between subject and object positions, their grammatical cases change:
- **Active Subject (Nominative)** -> **Passive Object (Objective)**:
  - *I* -> *me*
  - *We* -> *us*
  - *You* -> *you*
  - *He* -> *him*
  - *She* -> *her*
  - *It* -> *it*
  - *They* -> *them*
  - *Who* -> *whom*

---

### 4. Transitive vs Intransitive Verbs: The Prerequisite for Voice
- Only **Transitive Verbs** (verbs that require an object to complete their meaning) have passive forms.
  - *Transitive:* She wrote a letter. -> A letter was written by her. (Object 'a letter' exists).
- **Intransitive Verbs** (verbs that do not take an object, such as *die, sleep, laugh, weep, go, come, sit, arrive*) **CANNOT** be converted into passive voice.
  - *Incorrect:* 'He slept soundly' cannot be turned into 'Soundly was slept by him'.
  - *Exception:* If an intransitive verb is followed by a preposition to form a prepositional phrase acting transitively, it can take passive form:
    - *Active:* The boys **laughed at** the beggar.
    - *Passive:* The beggar **was laughed at** by the boys. (The preposition 'at' must not be dropped!).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Tense-by-Tense Passive Voice Transformation",
      content: `### 1. The 8 Convertible Tenses
English has 12 tenses, but only 8 have standard passive voice constructions:

#### A. Simple (Indefinite) Tenses
1. **Simple Present Tense**:
   - Active: S + V1 / V1(+s/es) + O
   - Passive: O + **am / is / are + V3** + by + S
   - *Active:* She cleans the room every day.
   - *Passive:* The room **is cleaned** by her every day.
2. **Simple Past Tense**:
   - Active: S + V2 + O
   - Passive: O + **was / were + V3** + by + S
   - *Active:* The carpenter made this chair.
   - *Passive:* This chair **was made** by the carpenter.
3. **Simple Future Tense**:
   - Active: S + will / shall + V1 + O
   - Passive: O + **will / shall + be + V3** + by + S
   - *Active:* They will announce the result tomorrow.
   - *Passive:* The result **will be announced** tomorrow.

---

#### B. Continuous (Progressive) Tenses
1. **Present Continuous Tense**:
   - Active: S + am / is / are + V1-ing + O
   - Passive: O + **am / is / are + being + V3** + by + S
   - *Active:* The gardener is watering the plants.
   - *Passive:* The plants **are being watered** by the gardener.
2. **Past Continuous Tense**:
   - Active: S + was / were + V1-ing + O
   - Passive: O + **was / were + being + V3** + by + S
   - *Active:* He was repairing the motorcycle.
   - *Passive:* The motorcycle **was being repaired** by him.
3. **Future Continuous Tense**:
   - **No standard passive form!**
   - Active: *He will be watching a movie.* -> No passive conversion used in standard examination English.

---

#### C. Perfect Tenses
1. **Present Perfect Tense**:
   - Active: S + has / have + V3 + O
   - Passive: O + **has / have + been + V3** + by + S
   - *Active:* Someone has stolen my mobile phone.
   - *Passive:* My mobile phone **has been stolen**. (Agent 'by someone' omitted).
2. **Past Perfect Tense**:
   - Active: S + had + V3 + O
   - Passive: O + **had + been + V3** + by + S
   - *Active:* The doctor had checked the patient before 9 AM.
   - *Passive:* The patient **had been checked** by the doctor before 9 AM.
3. **Future Perfect Tense**:
   - Active: S + will / shall + have + V3 + O
   - Passive: O + **will / shall + have + been + V3** + by + S
   - *Active:* We shall have completed the project by June.
   - *Passive:* The project **will have been completed** by us by June.

---

#### D. The 4 Non-Convertible Tenses
Standard English grammar rules forbid passive conversion for:
1. Present Perfect Continuous (e.g., *has been doing*)
2. Past Perfect Continuous (e.g., *had been doing*)
3. Future Continuous (e.g., *will be doing*)
4. Future Perfect Continuous (e.g., *will have been doing*)`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Passive of Interrogative Sentences",
      content: `### 1. Yes/No Interrogatives (Starting with Auxiliary Verbs)
To convert a Yes/No question into passive, follow the three-step mental trick:
1. Turn the question into an affirmative statement: *Did he write the letter?* -> *He wrote the letter.*
2. Convert the statement to passive: *The letter was written by him.*
3. Invert the auxiliary verb to the front to restore question form: ***Was the letter written by him?***

#### Key Formulas:
- **Do / Does + S + V1 + O?** -> **Am / Is / Are + O + V3 + by + S?**
  - *Active:* Do you play cricket?
  - *Passive:* **Is cricket played** by you?
- **Did + S + V1 + O?** -> **Was / Were + O + V3 + by + S?**
  - *Active:* Did the peon ring the bell?
  - *Passive:* **Was the bell rung** by the peon?
- **Has / Have + S + V3 + O?** -> **Has / Have + O + been + V3 + by + S?**
  - *Active:* Have you completed your homework?
  - *Passive:* **Has your homework been completed** by you?

---

### 2. Wh- Questions (Why, Where, When, How, What, Who, Whom)
For questions beginning with *Why, When, Where, How, What*, retain the Wh-word at the beginning and follow the regular interrogative passive word order:
- **Wh-word + auxiliary + S + V + O?** -> **Wh-word + conjugated 'be' + O + V3 + by + S?**
  - *Active:* Why did you break the glass?
  - *Passive:* Why **was the glass broken** by you?
  - *Active:* Where will you celebrate the anniversary?
  - *Passive:* Where **will the anniversary be celebrated** by you?

---

### 3. The Crucial 'Who' and 'Whom' Rules (High Exam Frequency!)
- **Active with 'Who' (Subject)**:
  - 'Who' functions as the subject, so in the passive it becomes the object governed by 'by', transforming into **'By whom'**:
    - **Formula 1 (Formal & Standard):** **By whom + auxiliary verb + O + V3?**
    - **Formula 2 (Informal/Modern):** **Who + auxiliary verb + O + V3 + by?**
    - *Active:* Who wrote the Mahabharata?
    - *Passive:* **By whom was the Mahabharata written?** (OR *Who was the Mahabharata written by?*)
    - *Active:* Who has broken this precious vase?
    - *Passive:* **By whom has this precious vase been broken?**

- **Active with 'Whom' (Object)**:
  - 'Whom' functions as the object in active voice, so it becomes the subject in passive voice, transforming into **'Who'**:
    - **Formula:** **Who + auxiliary verb + V3 + by + S?**
    - *Active:* Whom did you invite to the party?
    - *Passive:* **Who was invited** to the party by you?
    - *Active:* Whom has the board selected for the post?
    - *Passive:* **Who has been selected** for the post by the board?`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Imperative Sentences & Quasi-Passive Constructions",
      content: `### 1. Passive of Imperative Sentences
Imperative sentences express orders, commands, requests, advice, or suggestions, where the subject 'You' is implied:

#### A. Orders and Commands (Containing a Direct Object):
- **Formula:** **Let + Object + be + V3**
  - *Active:* Shut the door.
  - *Passive:* **Let the door be shut.**
  - *Active:* Post this letter immediately.
  - *Passive:* **Let this letter be posted** immediately.
  - *Negative:* Do not open the window.
  - *Passive:* **Let the window not be opened.** (OR *Let not the window be opened.*)

#### B. Moral Advice and Suggestions:
- When the imperative conveys moral duty or practical advice, using **'should be + V3'** is grammatically preferred over 'Let':
  - **Formula:** **Object + should be + V3**
  - *Active:* Help the poor and needy.
  - *Passive:* **The poor and needy should be helped.**
  - *Active:* Respect your teachers and elders.
  - *Passive:* **Your teachers and elders should be respected.**
  - *Active:* Never tell a lie.
  - *Passive:* **A lie should never be told.**

#### C. Requests (Containing 'Please' or 'Kindly'):
- Drop 'please' or 'kindly' and introduce the clause **'You are requested to + V1'**:
  - *Active:* Please lend me your notebook.
  - *Passive:* **You are requested to lend** me your notebook.
  - *Active:* Kindly grant me three days leave.
  - *Passive:* **You are requested to grant** me three days leave.

#### D. Intransitive Imperatives (Without an Object):
- Sentences like 'Go away', 'Work hard', 'Sit down' have no object. Transform them using introductory phrases:
  - *Active:* Stand up immediately.
  - *Passive:* **You are ordered to stand up** immediately.
  - *Active:* Work hard to pass the examination.
  - *Passive:* **You are advised to work hard** to pass the examination.

---

### 2. Quasi-Passive Verbs (Active in Form, Passive in Meaning)
Certain verbs appear active in form, but convey a passive sense when qualified by an adjective:
- **Formula:** **Subject + be-verb + Adjective + when + it/they + be-verb + V3**
  - *Active:* Honey tastes sweet.
  - *Passive:* **Honey is sweet when it is tasted.**
  - *Active:* This fabric feels rough.
  - *Passive:* **This fabric is rough when it is felt.**
  - *Active:* These mangoes smell delicious.
  - *Passive:* **These mangoes are delicious when they are smelt.**
  - *Active:* This house requires painting.
  - *Passive:* **This house needs to be painted.**`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Advanced Voice Transformations & Exam Exceptions",
      content: `### 1. Passive of Modal Auxiliaries
When a sentence contains a modal auxiliary verb (can, could, may, might, shall, should, will, would, must, ought to):
- **Simple Modal:** **Subject + Modal + be + V3 + by + Object**
  - *Active:* You must obey the traffic rules.
  - *Passive:* The traffic rules **must be obeyed** by you.
  - *Active:* She can solve any reasoning puzzle.
  - *Passive:* Any reasoning puzzle **can be solved** by her.
- **Modal Perfect:** **Subject + Modal + have been + V3 + by + Object**
  - *Active:* You should have helped your friend.
  - *Passive:* Your friend **should have been helped** by you.
  - *Active:* Someone must have stolen the jewellery.
  - *Passive:* The jewellery **must have been stolen**.

---

### 2. Verbs Followed by Prepositions Other Than 'By' (CRITICAL FOR VYAPAM!)
Certain verbs take specific prepositions in the passive voice instead of the default 'by':
1. **To**:
   - *Known to:* I know him. -> He is **known to** me. (NOT *known by me*).
   - *Married to:* Rama married Sita. -> Sita was **married to** Rama.
2. **At**:
   - *Surprised / Astonished / Shocked / Alarmed / Amazed at:*
   - *Active:* His sudden demise shocked everyone.
   - *Passive:* Everyone was **shocked at** his sudden demise. (NOT *shocked by*).
   - *Active:* Her bad behavior annoyed the teacher.
   - *Passive:* The teacher was **annoyed at** her behavior.
3. **With**:
   - *Pleased / Satisfied / Disgusted / Crowded / Filled with:*
   - *Active:* Your brilliant performance pleased the committee.
   - *Passive:* The committee was **pleased with** your brilliant performance.
   - *Active:* Smoke filled the room.
   - *Passive:* The room was **filled with** smoke.
4. **In**:
   - *Contained / Interested / Engulfed in:*
   - *Active:* This box contains twenty packets.
   - *Passive:* Twenty packets are **contained in** this box.
   - *Active:* This job interests him.
   - *Passive:* He is **interested in** this job.

---

### 3. Sentences with Two Objects (Ditransitive Verbs)
When an active verb has both an **Indirect Object** (person) and a **Direct Object** (thing), two passive forms are possible. However, making the indirect object (person) the subject is more natural and preferred in exams:
- *Active:* Mr. Sharma taught us English.
  - *Passive 1 (Preferred):* **We were taught English** by Mr. Sharma.
  - *Passive 2:* **English was taught to us** by Mr. Sharma.
- *Active:* The manager gave him a bonus.
  - *Passive 1 (Preferred):* **He was given a bonus** by the manager.
  - *Passive 2:* **A bonus was given to him** by the manager.

---

### 4. Omission of Unspecified or Obvious Agents
In standard English passive voice, the agent ('by + agent') is omitted when the agent is unknown, vague, or obvious from the context:
- Indefinite pronouns: *someone, somebody, anyone, anybody, people, they, one*.
- Obvious agents: *police (for arresting), doctor (for treating), court (for sentencing)*.
  - *Active:* Someone has stolen my bicycle.
  - *Passive:* My bicycle **has been stolen**. (NOT *by someone*).
  - *Active:* The police arrested the burglar.
  - *Passive:* The burglar **was arrested**. (NOT *by the police*, as it is obvious).
  - *Active:* People speak Hindi all over North India.
  - *Passive:* Hindi **is spoken** all over North India.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master Tense Conversion Matrix: Active to Passive",
      headers: ["Tense Name", "Active Voice Structure", "Passive Voice Structure", "Illustrative Transformation"],
      rows: [
        ["Simple Present", "Subject + V1 / V1(+s/es) + Object", "Object + am/is/are + V3 + by + Subject", "Active: She writes poems. / Passive: Poems are written by her."],
        ["Present Continuous", "Subject + am/is/are + V-ing + Object", "Object + am/is/are + being + V3 + by + Subject", "Active: He is painting the wall. / Passive: The wall is being painted by him."],
        ["Present Perfect", "Subject + has/have + V3 + Object", "Object + has/have + been + V3 + by + Subject", "Active: They have built a bridge. / Passive: A bridge has been built by them."],
        ["Simple Past", "Subject + V2 + Object", "Object + was/were + V3 + by + Subject", "Active: Newton discovered gravity. / Passive: Gravity was discovered by Newton."],
        ["Past Continuous", "Subject + was/were + V-ing + Object", "Object + was/were + being + V3 + by + Subject", "Active: She was singing a song. / Passive: A song was being sung by her."],
        ["Past Perfect", "Subject + had + V3 + Object", "Object + had + been + V3 + by + Subject", "Active: Fire had destroyed the shop. / Passive: The shop had been destroyed by fire."],
        ["Simple Future", "Subject + will/shall + V1 + Object", "Object + will/shall + be + V3 + by + Subject", "Active: We shall celebrate the win. / Passive: The win will be celebrated by us."],
        ["Future Perfect", "Subject + will/shall + have + V3 + Object", "Object + will/shall + have been + V3 + by + Subject", "Active: He will have solved it. / Passive: It will have been solved by him."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Verbs Taking Fixed Prepositions (Other Than 'By') in Passive Voice",
      headers: ["Verb & Meaning", "Mandatory Preposition", "Incorrect Exam Trap", "Correct Passive Construction"],
      rows: [
        ["Know (be acquainted)", "to", "He is known by me. (INCORRECT)", "He is known to me."],
        ["Marry (wed)", "to", "She was married by him. (INCORRECT)", "She was married to him."],
        ["Surprise / Astonish", "at", "I was surprised by his score. (INCORRECT)", "I was surprised at his score."],
        ["Shock / Alarm", "at", "We were shocked by the accident. (INCORRECT)", "We were shocked at the accident."],
        ["Please / Satisfy", "with", "The teacher was pleased by him. (INCORRECT)", "The teacher was pleased with him."],
        ["Disgust / Impress", "with", "I am impressed by your speech. (Acceptable, but 'with' preferred)", "I am impressed with your dedication."],
        ["Contain (hold inside)", "in", "Ten liters are contained by the jug. (INCORRECT)", "Ten liters are contained in the jug."],
        ["Interest (engage)", "in", "He is interested by novels. (INCORRECT)", "He is interested in novels."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Imperative Sentence Types & Corresponding Passive Templates",
      headers: ["Imperative Category", "Context / Tone", "Recommended Passive Formula", "Transformation Example"],
      rows: [
        ["Order / Command (with Object)", "Direct instruction / authority", "Let + Object + be + V3", "Active: Open the gate. -> Passive: Let the gate be opened."],
        ["Negative Order / Prohibition", "Forbidding an action", "Let + Object + not + be + V3", "Active: Do not insult him. -> Passive: Let him not be insulted."],
        ["Moral Advice / Suggestion", "Ethical recommendation", "Object + should be + V3", "Active: Respect your elders. -> Passive: Your elders should be respected."],
        ["Polite Request", "Contains 'Please' / 'Kindly'", "You are requested to + V1", "Active: Please help me. -> Passive: You are requested to help me."],
        ["Intransitive Command", "No direct object present", "You are ordered/told to + V1", "Active: March forward! -> Passive: You are ordered to march forward."]
      ]
    }
  ],
  pyqs: [
    {
      question: "Change the voice from active to passive: 'Who wrote this famous novel?' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) By whom this famous novel was written?",
        "B) By whom was this famous novel written?",
        "C) Who was written this famous novel?",
        "D) By whom this famous novel is written?"
      ],
      correctAnswer: "B) By whom was this famous novel written?",
      explanation: "In interrogative sentences starting with 'Who', 'Who' changes to 'By whom'. Since 'wrote' is Simple Past (V2), the auxiliary verb required is 'was'. In interrogative syntax, the auxiliary verb must precede the subject: 'By whom + was + this famous novel (subject) + written (V3)?'. Option A has incorrect assertive word order."
    },
    {
      question: "Convert to passive voice: 'Shut the window.' [CG Vyapam Patwari Exam]",
      options: [
        "A) Let the window be shut.",
        "B) You should shut the window.",
        "C) Let the window shut.",
        "D) The window should be shut by you."
      ],
      correctAnswer: "A) Let the window be shut.",
      explanation: "For imperative sentences expressing an order or command with a direct object, the standard grammatical rule is 'Let + Object + be + V3'. The past participle of 'shut' is 'shut' (shut-shut-shut). Therefore, 'Let the window be shut' is the exact passive form."
    },
    {
      question: "Choose the correct passive voice: 'I know him very well.' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) He is known by me very well.",
        "B) He was known to me very well.",
        "C) He is known to me very well.",
        "D) He has been known with me very well."
      ],
      correctAnswer: "C) He is known to me very well.",
      explanation: "The verb 'know' takes the preposition 'to' in the passive voice, never 'by'. Since the active sentence is in the Simple Present tense ('know'), the passive requires 'is + known (V3)'. Thus, 'He is known to me very well' is correct."
    },
    {
      question: "Identify the passive form: 'The police arrested the notorious criminal yesterday.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) The notorious criminal was arrested yesterday by the police.",
        "B) The notorious criminal was arrested yesterday.",
        "C) The notorious criminal had been arrested yesterday.",
        "D) The notorious criminal is arrested yesterday."
      ],
      correctAnswer: "B) The notorious criminal was arrested yesterday.",
      explanation: "Arresting criminals is the specific institutional duty of the police; hence, the agent 'by the police' is redundant and standardly omitted in concise examination English. Furthermore, Simple Past ('arrested') converts to 'was arrested'. Therefore, Option B is the best answer."
    },
    {
      question: "Change into active voice: 'The bridge is being repaired by the workers.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) The workers repaired the bridge.",
        "B) The workers are repairing the bridge.",
        "C) The workers were repairing the bridge.",
        "D) The workers have repaired the bridge."
      ],
      correctAnswer: "B) The workers are repairing the bridge.",
      explanation: "The passive verb contains 'is being repaired', which is the Present Continuous passive form (am/is/are + being + V3). Transforming this back to the active voice with plural subject 'The workers' requires 'are + repairing (V1-ing)'. Hence, Option B is correct."
    },
    {
      question: "Passive form of: 'Honey tastes sweet.' [CG Vyapam ADEO Exam]",
      options: [
        "A) Honey is sweet when it is tasted.",
        "B) Honey was sweet when tasted.",
        "C) Honey is tasted sweet.",
        "D) Let honey be tasted sweet."
      ],
      correctAnswer: "A) Honey is sweet when it is tasted.",
      explanation: "'Honey tastes sweet' is a classic quasi-passive sentence (active in form, passive in meaning). The standard grammatical rule for transforming quasi-passive verbs of sensation followed by an adjective is: 'Subject + be + Adjective + when it is + V3'. Thus, 'Honey is sweet when it is tasted' is correct."
    }
  ],
  mcqs: [
    {
      question: "Convert to passive: 'Someone has picked my pocket in the crowded bus.'",
      options: [
        "A) My pocket had been picked by someone in the crowded bus.",
        "B) My pocket has been picked in the crowded bus.",
        "C) My pocket was picked by someone in the crowded bus.",
        "D) My pocket is picked in the crowded bus."
      ],
      correctAnswer: "B) My pocket has been picked in the crowded bus.",
      explanation: "Present Perfect tense ('has picked') converts to 'has been picked'. The vague indefinite pronoun 'someone' is omitted in the passive voice. Hence, Option B is correct."
    },
    {
      question: "Choose the correct passive voice: 'The news surprised all of us.'",
      options: [
        "A) All of us were surprised by the news.",
        "B) All of us was surprised at the news.",
        "C) All of us were surprised at the news.",
        "D) All of us had been surprised with the news."
      ],
      correctAnswer: "C) All of us were surprised at the news.",
      explanation: "The verb 'surprise' takes the preposition 'at' rather than 'by'. 'All of us' is a plural subject requiring 'were'. Therefore, 'All of us were surprised at the news' is correct."
    },
    {
      question: "Which of the following tenses CANNOT be converted into passive voice?",
      options: [
        "A) Simple Past Tense",
        "B) Past Continuous Tense",
        "C) Future Continuous Tense",
        "D) Future Perfect Tense"
      ],
      correctAnswer: "C) Future Continuous Tense",
      explanation: "In standard English grammar, four tenses cannot be converted into passive voice: Future Continuous, Present Perfect Continuous, Past Perfect Continuous, and Future Perfect Continuous."
    },
    {
      question: "Convert the imperative to passive: 'Please maintain silence in the library.'",
      options: [
        "A) Let silence be maintained in the library.",
        "B) You are requested to maintain silence in the library.",
        "C) Silence should maintain in the library.",
        "D) You must maintain silence in the library."
      ],
      correctAnswer: "B) You are requested to maintain silence in the library.",
      explanation: "Imperative sentences beginning with or containing 'Please' are converted into passive by replacing 'Please' with the standard clause 'You are requested to + V1'."
    },
    {
      question: "Transform into passive: 'The boys were playing cricket.'",
      options: [
        "A) Cricket was played by the boys.",
        "B) Cricket was being played by the boys.",
        "C) Cricket had been played by the boys.",
        "D) Cricket is being played by the boys."
      ],
      correctAnswer: "B) Cricket was being played by the boys.",
      explanation: "Past Continuous tense ('were playing') converts into 'was/were + being + V3'. Since the singular object 'Cricket' becomes the new subject, 'was being played' is correct."
    },
    {
      question: "Identify the correct passive sentence for: 'Did she recognize you?'",
      options: [
        "A) Was you recognized by her?",
        "B) Were you recognized by her?",
        "C) Did you recognized by her?",
        "D) Have you recognized by her?"
      ],
      correctAnswer: "B) Were you recognized by her?",
      explanation: "Simple Past interrogative with 'Did' transforms to 'Was/Were + Subject + V3 + by + Object?'. Since the new subject is 'you', the plural auxiliary 'Were' is mandatory ('Were you recognized by her?')."
    },
    {
      question: "Active to passive: 'They laughed at the clown.'",
      options: [
        "A) The clown was laughed by them.",
        "B) The clown was laughed at by them.",
        "C) The clown laughed at them.",
        "D) The clown had been laughed at."
      ],
      correctAnswer: "B) The clown was laughed at by them.",
      explanation: "When a preposition is attached to a verb forming a phrasal unit ('laughed at'), the preposition must never be dropped in the passive voice. Thus, 'The clown was laughed at by them' is correct."
    },
    {
      question: "Convert to passive: 'One should keep one's promises.'",
      options: [
        "A) One's promises should be kept by one.",
        "B) Promises should be kept.",
        "C) One's promises should kept.",
        "D) Promises should be kept by everyone."
      ],
      correctAnswer: "B) Promises should be kept.",
      explanation: "When 'one' is used as an indefinite subject with 'one's', both are omitted in the passive voice to form a universal aphorism: 'Promises should be kept'."
    }
  ],
  keyTerminology: [
    {
      term: "Active Voice",
      definition: "A grammatical voice in which the grammatical subject is the doer or performer of the action expressed by the verb."
    },
    {
      term: "Passive Voice",
      definition: "A grammatical voice in which the grammatical subject is the receiver or patient of the action expressed by the verb."
    },
    {
      term: "Transitive Verb",
      definition: "A verb that requires one or more objects to complete its action; only transitive verbs can form passive sentences."
    },
    {
      term: "Intransitive Verb",
      definition: "A verb that does not take a direct object (e.g., sleep, sit, die); it cannot be changed into passive voice."
    },
    {
      term: "Agent",
      definition: "The entity that performs the action in a passive sentence, typically introduced by the preposition 'by'."
    },
    {
      term: "Ditransitive Verb",
      definition: "A verb that takes two objects—a direct object (thing) and an indirect object (person)—yielding two possible passive constructions."
    },
    {
      term: "Quasi-Passive Verb",
      definition: "A verb that is active in grammatical structure but inherently passive in sense (e.g., 'The stone feels smooth')."
    },
    {
      term: "Prepositional Passive",
      definition: "A passive construction derived from a prepositional verb where the preposition is retained directly adjacent to the V3 participle (e.g., 'laughed at')."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapters 12 & 13 on 'Active and Passive Voice', detailing comprehensive rules and classic exam conversions."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Sections on Passive structures, agent dropping, and verbs followed by non-'by' prepositions."
    },
    {
      title: "English Grammar in Use",
      author: "Raymond Murphy (Cambridge University Press)",
      details: "Units 42 to 46 covering Passive tenses, modal passives, and 'have something done'."
    },
    {
      title: "CG Vyapam Official Exam Compendium",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Analysis of voice transformation questions asked in Vyapam exams between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Dropping Fixed Prepositions in Phrasal Verbs",
      confusion: "Students often delete the original preposition attached to the verb when converting to passive.",
      clarity: "Never omit the preposition attached to the verb. 'She looked after the orphan' becomes 'The orphan was looked after by her' (NOT 'was looked by her')."
    },
    {
      concept: "Who vs Whom in Interrogative Passive",
      confusion: "Confusing whether 'Who' becomes 'By who' or 'By whom'.",
      clarity: "Since prepositions require the objective case of a pronoun, 'by' must be followed by 'whom' ('By whom was this done?'). You cannot write 'By who was this done?' in formal grammar."
    },
    {
      concept: "Retaining Unnecessary Agents ('by someone', 'by people')",
      confusion: "Writing 'by someone' or 'by people' at the end of every passive sentence.",
      clarity: "Vague indefinite pronouns (*someone, somebody, people, they, one*) are omitted in the passive voice. Write 'The purse was stolen', NOT 'The purse was stolen by someone'."
    },
    {
      concept: "Passive of Intransitive Verbs",
      confusion: "Attempting to change sentences like 'He went to school' or 'The baby slept' into passive.",
      clarity: "Verbs of movement and state (*go, come, sleep, arrive, fall*) are intransitive and cannot take a passive form because there is no direct object receiving the action."
    },
    {
      concept: "Two Objects: Direct vs Indirect Object Priority",
      confusion: "Wondering which object to make the subject when both are present.",
      clarity: "Both are correct, but making the living person (indirect object) the subject is more idiomatic and preferred in Vyapam answer keys ('I was given a pen' > 'A pen was given to me')."
    }
  ],
  faqList: [
    {
      question: "Why do four tenses have no passive voice?",
      answer: "The three Perfect Continuous tenses and the Future Continuous tense already contain forms of 'be' (*been*, *be*). Adding another 'being' would create unwieldy, awkward phrases like 'will be being done' or 'has been being done', which standard English avoids."
    },
    {
      question: "When should we use 'Let' vs 'Should' in imperative sentences?",
      answer: "Use 'Let + Object + be + V3' for commands, orders, or formal instructions (e.g., 'Let the door be shut'). Use 'Object + should be + V3' for moral advice, ethical suggestions, or duties (e.g., 'The poor should be helped')."
    },
    {
      question: "Can an active sentence in the present tense become past in the passive?",
      answer: "Never! Changing voice NEVER changes the tense of the sentence. Present remains present, past remains past, and future remains future. Tense only changes in Direct/Indirect Narration, not in Voice."
    },
    {
      question: "What is the passive form of 'It is time to close the shop'?",
      answer: "The standard transformation formula for 'It is time to + V1 + Object' is: 'It is time for + Object + to be + V3'. Thus, it becomes: 'It is time for the shop to be closed.'"
    },
    {
      question: "Is 'by' compulsory in every passive voice sentence?",
      answer: "No. 'By' is omitted when the agent is unknown or irrelevant, and replaced by other prepositions (*to, at, with, in*) with specific stative verbs like *known to, surprised at, pleased with, contained in*."
    }
  ],
  oneLinerRevision: [
    "Voice transformation NEVER changes the tense of the sentence; only the aspect and auxiliary change.",
    "The main verb in the passive voice is INVARIABLY in the Past Participle (V3) form.",
    "Four tenses have NO passive voice: Present/Past/Future Perfect Continuous, and Future Continuous.",
    "Only transitive verbs (verbs having an object) can be transformed into the passive voice.",
    "In imperative commands: 'Let + Object + be + V3' (e.g., 'Let the door be closed').",
    "In imperative advice: 'Object + should be + V3' (e.g., 'The needy should be helped').",
    "'Who' in active voice becomes 'By whom + auxiliary + subject + V3?' in passive voice.",
    "The verb 'know' takes 'to' in passive ('known to me'), never 'by me'.",
    "The verbs 'surprise', 'astonish', 'shock', and 'alarm' take the preposition 'at' in passive.",
    "Indefinite agents like 'someone', 'somebody', 'people', and 'they' are omitted in the passive voice."
  ],
  rapidRevision: {
    points: [
      "Voice Core: Active = Doer focus (S + V + O); Passive = Receiver focus (O + be + V3 + by S).",
      "Convertible Tenses: 8 convertible; 4 non-convertible (Future Continuous & all 3 Perfect Continuous).",
      "Continuous Passive Rule: Always insert 'being' between auxiliary and V3 (e.g., 'is being repaired').",
      "Perfect Passive Rule: Always insert 'been' between has/have/had and V3 (e.g., 'has been completed').",
      "Modal Passive Rule: Modal + be + V3 (e.g., 'can be done', 'must be solved').",
      "Imperatives: Order -> 'Let + O + be + V3'; Advice -> 'O + should be + V3'; Request -> 'You are requested to + V1'.",
      "Fixed Prepositions: known to, married to, surprised at, shocked at, pleased with, satisfied with, contained in, interested in."
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
