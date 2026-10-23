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
  id: "cgv_master_eng_idiom_1",
  topicId: "eng_idiom_1",
  chapterId: "cgv_master_sub_6_ch_7",
  subjectId: "cgv_master_sub_6",
  title: "Idioms",
  subtitle: "Master Collection of Figurative Expressions, Thematic Idiom Clusters & Exam Archives for CG Vyapam",
  overview: {
    introduction: "An Idiom (derived from the Greek 'idioma' meaning a peculiarity or private property) is a phrase or fixed expression whose figurative meaning cannot be understood or deduced from the literal definitions of its individual constituent words. For instance, the idiom 'to spill the beans' has nothing to do with food or legumes; it figuratively signifies to reveal a secret prematurely. Idioms possess frozen or rigid grammatical syntax—their wording, prepositions, and word order cannot be arbitrarily altered or substituted without corrupting the idiom (e.g., you can say 'a dark horse', but never 'a black horse' with the same meaning). In competitive exams, idioms evaluate a candidate's stylistic fluency, cultural comprehension, and ability to separate figurative intent from literal distractors.",
    importance: "Idioms form a high-yield, indispensable component of the General English section across all CG Vyapam examinations, including Hostel Warden, Patwari, Revenue Inspector (RI), Sub Inspector (SI), ADEO, and Assistant Teacher exams. A typical CG Vyapam question paper features between 2 to 4 direct questions on idioms in the form of multiple-choice meaning identification, sentence substitution, and contextual fill-in-the-blanks. Candidates who master these idiomatic expressions can secure full marks within seconds.",
    examRelevance: "CG Vyapam questions on Idioms test: (1) Classic high-frequency thematic idioms based on animals (*dark horse, wild goose chase, smell a rat, lion's share*); (2) Body parts (*Achilles' heel, bite the bullet, see eye to eye, keep an ear to the ground*); (3) Colors (*red letter day, once in a blue moon, caught red-handed*); (4) Classical and mythological expressions (*apple of discord, Pandora's box, sword of Damocles*); (5) Eliminating trap options containing literal physical interpretations.",
    quickFacts: [
      { label: "Core Feature", value: "Figurative non-literal meaning; fixed and unalterable word arrangement" },
      { label: "Classic Literal Trap", value: "Examiners always place a literal meaning as Option A (e.g., 'Spill the beans' -> 'To drop vegetables')" },
      { label: "Common Themes (5)", value: "Animals, Human Anatomy, Colors, Mythology, Food & Weather" },
      { label: "Vyapam Exam Weightage", value: "2 to 4 direct questions per examination; swift and highly scoring" },
      { label: "High-Frequency Classics", value: "Achilles' heel, Red letter day, Dark horse, Wild goose chase, Apple of discord" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Nature of Idioms & The Cardinal Rule of Figurative Meaning",
      content: `### 1. What is an Idiom?
An idiom is a phrase where the words together have a meaning that is different from the dictionary definitions of the individual words:
- *Literal phrase:* He washed his hands with soap and water.
- *Idiomatic phrase:* The minister **washed his hands of** the scandal. (Meaning: refused to accept any responsibility for it).

---

### 2. The Three Fundamental Properties of Idioms
1. **Figurative Integrity (Non-Compositionality)**:
   - The overall meaning cannot be deduced word-by-word.
   - *Example:* **'A piece of cake'** does not refer to bakery food; it means a task that is exceptionally easy to accomplish.
2. **Syntactical Invariance (Frozen Form)**:
   - Idioms cannot be paraphrased, grammatically altered, or made plural arbitrarily:
     - *Correct:* Spill the **beans**. (NOT *spill the peas* or *spill the grain*).
     - *Correct:* Bite the **bullet**. (NOT *bite the gun*).
     - *Correct:* In the **twinkling of an eye**. (NOT *in the blinking of an eye*).
3. **The Elimination Rule in Exams**:
   - In 95% of competitive exam multiple-choice questions, any option that offers a **literal, physical translation** of the words in the idiom is a **deliberate distractor trap** and should be eliminated immediately!
   - *Question:* 'To cry over spilt milk'
     - Option A: To drop a glass of cow's milk (TRAP!).
     - Option B: To complain about an unalterable past loss (CORRECT!).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Master Thematic Idioms: Animal & Human Anatomy Clusters",
      content: `### 1. High-Frequency Animal Idioms
1. **A dark horse**: A candidate or competitor about whom little is known, but who unexpectedly wins or succeeds.
   - *Example:* No one expected Ramesh to top the CG Vyapam exam; he proved to be a real dark horse.
2. **A wild goose chase**: A foolish, hopeless, or futile search for something that cannot be found or achieved.
   - *Example:* Looking for a private firm without a proper address turned out to be a wild goose chase.
3. **Smell a rat**: To suspect that something is dishonest, deceitful, or foul.
   - *Example:* When the contractor refused to show the invoice, the auditor smelled a rat.
4. **Lion's share**: The largest, major, or disproportionate portion of something.
   - *Example:* Education received the lion's share of the annual state budget.
5. **Crocodile tears**: An insincere, hypocritical display of sorrow or grief.
   - *Example:* The corrupt official shed crocodile tears after being caught by the anti-corruption bureau.
6. **Black sheep**: A member of a family or group who is regarded as a disgrace, failure, or disreputable.
   - *Example:* All his brothers became civil servants, but he became the black sheep of the family.
7. **Cock and bull story**: An absurd, ridiculous, and completely unbelievable excuse or tale.
   - *Example:* The student invented a cock and bull story about why he failed to submit the project.
8. **At a snail's pace**: Extremely slowly; with agonizing sluggishness.
   - *Example:* Administrative file clearances were moving at a snail's pace.

---

### 2. High-Frequency Anatomy (Body Part) Idioms
1. **Achilles' heel**: A small, vulnerable, or fatal weakness in an otherwise strong person or system.
   - *Example:* General English was his Achilles' heel in the competitive examination.
2. **Bite the bullet**: To face an inevitable, difficult, or unpleasant situation with courage and fortitude.
   - *Example:* With medical bills piling up, he had to bite the bullet and sell his ancestral property.
3. **Cold feet (get cold feet)**: To suddenly become nervous, fearful, or hesitant about completing an action.
   - *Example:* The athlete got cold feet just before stepping onto the national stadium track.
4. **See eye to eye**: To agree completely with someone on a matter; have identical views.
   - *Example:* The two coalition partners do not see eye to eye on the land reform policy.
5. **Keep an ear to the ground**: To stay well-informed about public opinion, trends, and rumors.
   - *Example:* A successful political leader always keeps an ear to the ground in rural constituencies.
6. **Turn a deaf ear**: To refuse obstinately to listen to advice, warnings, or pleas.
   - *Example:* The administration turned a deaf ear to the repeated warnings of flood control experts.
7. **Cost an arm and a leg**: To be exorbitantly expensive; cost an enormous amount of money.
   - *Example:* Buying an apartment in the heart of Raipur costs an arm and a leg nowadays.
8. **To wash one's hands of**: To refuse to take any further responsibility or interest in a matter.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Master Thematic Idioms: Colors, Food & Weather",
      content: `### 1. High-Frequency Color Idioms
1. **A red-letter day**: A memorable, joyful, and historically momentous day or milestone.
   - *Example:* First November is a red-letter day for the citizens of Chhattisgarh, marking Statehood Day.
2. **Once in a blue moon**: Very rarely; occurring at extremely long intervals.
   - *Example:* Living abroad, he visits his village in Bastar only once in a blue moon.
3. **Caught red-handed**: Apprehended in the exact act of committing a crime or doing something wrong.
   - *Example:* The revenue clerk was caught red-handed accepting a bribe by vigilance officers.
4. **Out of the blue**: Completely unexpected; arriving suddenly without any prior warning.
   - *Example:* The transfer order came out of the blue, shocking the entire department.
5. **In black and white**: In writing; clearly printed on paper (making it official and binding).
   - *Example:* The landlord demanded the agreement in black and white before handing over the keys.
6. **A white elephant**: A possession that is useless, cumbersome, and extremely expensive to maintain.
   - *Example:* The poorly planned municipal shopping complex has become a white elephant for the city council.
7. **Show the white feather**: To show cowardice; act like a coward in the face of danger.
   - *Example:* The soldier stood his ground and refused to show the white feather.

---

### 2. High-Frequency Food & Weather Idioms
1. **Spill the beans**: To reveal a secret or confidential information prematurely or indiscreetly.
   - *Example:* Do not spill the beans about our surprise party before tomorrow evening.
2. **A piece of cake**: A task or assignment that is remarkably easy and simple to perform.
   - *Example:* After months of rigorous practice, the mathematics paper felt like a piece of cake.
3. **Take with a grain (pinch) of salt**: To accept a statement with skepticism or reservation; not fully believe it.
   - *Example:* Political campaign promises should always be taken with a grain of salt.
4. **In a nutshell**: In summary; expressed in very few, concise words.
   - *Example:* The secretary explained the entire development blueprint in a nutshell.
5. **Under the weather**: Feeling slightly unwell, sick, fatigued, or indisposed.
   - *Example:* She could not attend the office yesterday because she was feeling under the weather.
6. **A storm in a teacup**: Great excitement, anger, or worry over a trivial and unimportant matter.
   - *Example:* The media debate over the seating arrangement was merely a storm in a teacup.
7. **Blow hot and cold**: To vacillate; constantly change one's opinions or enthusiasm about something.
   - *Example:* The management blew hot and cold about the proposal, delaying the final decision.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Classical, Mythological & Historical Idioms",
      content: `### 1. Classical & Mythological Allusions (Vyapam Favorites!)
1. **Apple of discord**: A cause or subject of bitter dispute, rivalry, or contention.
   - *Origin:* Greek myth of the Golden Apple thrown by Eris inscribed 'to the fairest', causing the Trojan War.
   - *Example:* Ancestral land became an apple of discord between the two estranged brothers.
2. **Open a Pandora's box**: To initiate an action that unexpectedly unleashes a multitude of uncontrollable problems.
   - *Example:* The controversial audit opened a Pandora's box of corruption allegations across departments.
3. **Sword of Damocles**: A constant, imminent danger or impending disaster threatening someone in authority.
   - *Example:* The threat of immediate termination hung over the contractual employees like the sword of Damocles.
4. **Cross the Rubicon**: To take an irrevocable step or make a decisive commitment from which there is no return.
   - *Origin:* Julius Caesar crossing the Rubicon river in 49 BC, committing himself to civil war.
   - *Example:* By submitting his resignation to the Speaker, the leader crossed the Rubicon.
5. **Burn the midnight oil**: To stay awake late into the night working or studying diligently.
   - *Example:* Aspirants must burn the midnight oil to cover the comprehensive CG Vyapam syllabus.
6. **Burn the candle at both ends**: To exhaust oneself physically and mentally by working too hard without rest.
   - *Example:* By working two jobs and studying at night, he is burning the candle at both ends.
7. **Leave no stone unturned**: To use every possible means or make every conceivable effort to achieve an objective.
   - *Example:* The police left no stone unturned in their search for the missing child.
8. **At sixes and sevens**: In a state of total confusion, disarray, disorder, or disagreement.
   - *Example:* When the new software crashed, the entire accounting department was at sixes and sevens.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Idioms in Sentential Context & Error Spotting Traps",
      content: `### 1. Recognizing Idiomatic Distortions in Error Spotting
Examiners frequently alter a single preposition or article in an idiom to test whether candidates notice the error:

#### Common Exam Corruptions:
1. *Corrupted:* He left no stones unturned.
   - *Correct:* He left **no stone unturned**. (Singular 'stone', NOT 'stones').
2. *Corrupted:* The brothers are at daggers drawn with each other.
   - *Correct:* The brothers are **at daggers drawn**. (Fixed idiom meaning bitter enmity).
3. *Corrupted:* She made a castle in the air.
   - *Correct:* She built **castles in the air**. (Plural 'castles' + 'build').
4. *Corrupted:* He achieved success by leap and bound.
   - *Correct:* He achieved success **by leaps and bounds**. (Plural 'leaps and bounds' = rapid progress).
5. *Corrupted:* At the eleventh hours, he changed his mind.
   - *Correct:* At the **eleventh hour**, he changed his mind. (Singular 'hour' = at the very last moment).

---

### 2. Contextual Deduction Strategy
When confronted with an unknown idiom in a reading comprehension passage or sentence:
1. **Analyze the Sentence Mood**:
   - Determine whether the surrounding sentence conveys a positive, neutral, or negative outcome.
   - *Example:* 'Despite fierce competition, the dark horse clinched the medal.'
   - The contrast word 'despite' and positive verb 'clinched' indicate that 'dark horse' represents an **unexpected victor**.
2. **Filter Out Literal Distractors**:
   - Immediately discard options that reference animals, food, or anatomy literally.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master High-Frequency CG Vyapam Idioms Matrix",
      headers: ["Idiomatic Expression", "Literal Theme", "True Figurative Meaning", "Contextual Illustrative Sentence"],
      rows: [
        ["A dark horse", "Animal", "An unexpected or unforeseen winner", "He was a dark horse in the civil services exam."],
        ["A red-letter day", "Color", "A memorable, joyous, and important day", "Independence Day is a red-letter day for India."],
        ["Achilles' heel", "Anatomy", "A fatal vulnerable weakness", "Mathematics proved to be his Achilles' heel."],
        ["Apple of discord", "Mythology", "A subject of dispute or bone of contention", "The boundary wall was an apple of discord between neighbors."],
        ["At sixes and sevens", "Number", "In complete confusion and disorder", "After the burglary, the office was at sixes and sevens."],
        ["Bite the bullet", "Action", "Face a difficult situation with courage", "He bit the bullet and accepted the challenging post."],
        ["By leaps and bounds", "Movement", "Very rapidly and substantially", "The industrial sector in Chhattisgarh grew by leaps and bounds."],
        ["Call a spade a spade", "Tools", "Speak plainly and frankly without sugarcoating", "He is respected because he always calls a spade a spade."],
        ["Crocodile tears", "Animal", "False and insincere display of sorrow", "Do not be deceived by his crocodile tears."],
        ["Leave no stone unturned", "Action", "Make every conceivable effort", "The administration left no stone unturned to control the flood."],
        ["Once in a blue moon", "Color", "Extremely rarely; almost never", "He visits his ancestral home once in a blue moon."],
        ["Spill the beans", "Food", "Disclose a secret prematurely", "His careless remark spilled the beans about the operation."],
        ["Under the weather", "Weather", "Slightly ill, sick, or indisposed", "She was feeling under the weather, so she took leave."],
        ["Wild goose chase", "Animal", "A foolish, fruitless, and futile search", "Chasing that unverified rumor was a wild goose chase."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Thematic Classification of Common Vyapam Idioms",
      headers: ["Thematic Category", "Common Idioms", "Core Expressed Sentiment", "Key Keyword Clue"],
      rows: [
        ["Animal Idioms", "Smell a rat, Black sheep, Lion's share, Dark horse", "Deception, disgrace, dominance, surprise", "Rat = suspicion; Lion = major part; Sheep = outcast"],
        ["Color Idioms", "Red letter day, White elephant, Out of the blue", "Celebration, costly burden, sudden surprise", "Red = joy; White = costly; Blue = rare/sudden"],
        ["Body Anatomy", "See eye to eye, Cold feet, Turn a deaf ear", "Agreement, sudden hesitation, willful refusal", "Eye = agreement; Feet = fear; Ear = refusal"],
        ["Food & Eating", "Piece of cake, Take with a pinch of salt, Spill the beans", "Extreme ease, healthy skepticism, revealing secrets", "Cake = easy; Salt = skepticism; Beans = secret"],
        ["Mythology & War", "Sword of Damocles, Pandora's box, Cross the Rubicon", "Impending danger, multiple troubles, irrevocable decision", "Sword = danger; Box = trouble; River = no return"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Frequently Distorted Idioms in Vyapam Error Spotting",
      headers: ["Incorrect / Distorted Exam Phrase", "Correct Standard Idiom", "Nature of Error", "Correct Meaning"],
      rows: [
        ["At the eleventh hours", "At the eleventh hour", "Erroneous pluralization of 'hour'", "At the very last possible moment"],
        ["Leave no stones unturned", "Leave no stone unturned", "Erroneous pluralization of 'stone'", "Make all possible efforts"],
        ["By leap and bound", "By leaps and bounds", "Missing plural markers on nouns", "Very rapidly and swiftly"],
        ["A dark horse animal", "A dark horse", "Redundant addition of 'animal'", "An unexpected winner"],
        ["In the nutshell", "In a nutshell", "Wrong article ('the' instead of 'a')", "Briefly and concisely"],
        ["Build castle in the air", "Build castles in the air", "Missing plural 'castles'", "Indulge in daydreaming / wild plans"]
      ]
    }
  ],
  pyqs: [
    {
      question: "What is the meaning of the idiom 'A DARK HORSE'? [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) A black-colored racehorse",
        "B) An unexpected winner or secret talent",
        "C) A notorious criminal",
        "D) A horse that runs in the dark"
      ],
      correctAnswer: "B) An unexpected winner or secret talent",
      explanation: "'A dark horse' is a figurative idiom referring to a person or competitor who was previously little known but unexpectedly achieves great success or wins. Options A and D are literal traps."
    },
    {
      question: "The idiom 'A RED-LETTER DAY' means: [CG Vyapam Patwari Exam]",
      options: [
        "A) A day written in red ink",
        "B) A very memorable and important day",
        "C) A day full of danger and strife",
        "D) A day on which an official letter arrives"
      ],
      correctAnswer: "B) A very memorable and important day",
      explanation: "'A red-letter day' originates from classical calendars where important religious feasts and national holidays were printed in red ink. Figuratively, it denotes an especially momentous, joyful, and memorable day."
    },
    {
      question: "Identify the meaning of 'TO SMELL A RAT': [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) To detect a bad smell in the house",
        "B) To suspect foul dealings or deceit",
        "C) To chase mice in the warehouse",
        "D) To see a dead rat"
      ],
      correctAnswer: "B) To suspect foul dealings or deceit",
      explanation: "'To smell a rat' means to suspect that something is wrong, dishonest, or deceitful in a given situation."
    },
    {
      question: "What does the idiom 'TO LEAVE NO STONE UNTURNED' mean? [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) To search for precious gems under rocks",
        "B) To make every possible effort to achieve something",
        "C) To destroy construction material",
        "D) To work as a laborer"
      ],
      correctAnswer: "B) To make every possible effort to achieve something",
      explanation: "'To leave no stone unturned' means to use every possible means, explore every avenue, and spare no effort to accomplish an objective."
    },
    {
      question: "Choose the correct meaning of 'ACHILLES' HEEL': [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) A fast runner's foot",
        "B) A fatal or vulnerable weakness",
        "C) A medical disease of the leg",
        "D) A warrior's shield"
      ],
      correctAnswer: "B) A fatal or vulnerable weakness",
      explanation: "From Greek mythology, the hero Achilles was invulnerable in all of his body except for his heel. Hence, an 'Achilles' heel' denotes a vulnerable spot or fatal weakness in someone otherwise strong."
    },
    {
      question: "What does the idiom 'ONCE IN A BLUE MOON' signify? [CG Vyapam ADEO Exam]",
      options: [
        "A) On an astronomical eclipse",
        "B) Very rarely",
        "C) Every full moon night",
        "D) On cloudy nights"
      ],
      correctAnswer: "B) Very rarely",
      explanation: "A 'blue moon' (a second full moon in a single calendar month) occurs only roughly once every 2.7 years. Figuratively, 'once in a blue moon' means something that happens exceptionally rarely."
    }
  ],
  mcqs: [
    {
      question: "The idiom 'A WILD GOOSE CHASE' means:",
      options: [
        "A) Hunting migratory birds in winter",
        "B) A foolish, futile, and hopeless search",
        "C) Running after domestic animals",
        "D) A very profitable venture"
      ],
      correctAnswer: "B) A foolish, futile, and hopeless search",
      explanation: "'A wild goose chase' refers to a search or pursuit that is completely pointless, foolish, and certain to fail."
    },
    {
      question: "Select the meaning of 'TO BITE THE BULLET':",
      options: [
        "A) To accidentally swallow ammunition",
        "B) To endure an inevitable painful situation with courage",
        "C) To fight aggressively in battle",
        "D) To purchase military weapons"
      ],
      correctAnswer: "B) To endure an inevitable painful situation with courage",
      explanation: "Historically, wounded soldiers were given a lead bullet to bite on during surgery without anesthesia. Hence, 'to bite the bullet' means to face a harsh, unavoidable hardship bravely."
    },
    {
      question: "What does 'APPLE OF DISCORD' signify?",
      options: [
        "A) A delicious variety of sweet apple",
        "B) A subject or cause of bitter quarrel",
        "C) An apple that has gone rotten",
        "D) A gift presented to an enemy"
      ],
      correctAnswer: "B) A subject or cause of bitter quarrel",
      explanation: "'Apple of discord' means the core root or bone of contention that creates disputes between parties."
    },
    {
      question: "Choose the correct meaning of 'TO SPILL THE BEANS':",
      options: [
        "A) To drop kitchen ingredients on the floor",
        "B) To reveal a secret indiscreetly",
        "C) To cook a nutritious vegetable dish",
        "D) To create a mess in the kitchen"
      ],
      correctAnswer: "B) To reveal a secret indiscreetly",
      explanation: "'To spill the beans' means to disclose confidential information prematurely or carelessly."
    },
    {
      question: "What does 'A WHITE ELEPHANT' represent?",
      options: [
        "A) A rare albino animal in an Asian zoo",
        "B) A costly possession that is useless and burdensome to maintain",
        "C) A highly profitable investment",
        "D) A sacred religious emblem"
      ],
      correctAnswer: "B) A costly possession that is useless and burdensome to maintain",
      explanation: "'A white elephant' denotes a possession whose maintenance costs far exceed its practical usefulness."
    },
    {
      question: "Select the meaning of 'AT SIXES AND SEVENS':",
      options: [
        "A) In a state of total confusion and disarray",
        "B) Arriving between 6:00 and 7:00 PM",
        "C) Winning thirteen points in a game",
        "D) Working systematically"
      ],
      correctAnswer: "A) In a state of total confusion and disarray",
      explanation: "'At sixes and sevens' describes a situation, room, or person in utter confusion, disorder, or disagreement."
    },
    {
      question: "What does 'TO CALL A SPADE A SPADE' mean?",
      options: [
        "A) To dig gardens with tools",
        "B) To speak plainly and frankly without hesitation",
        "C) To play cards expertly",
        "D) To insult an opponent rudely"
      ],
      correctAnswer: "B) To speak plainly and frankly without hesitation",
      explanation: "'To call a spade a spade' means to state the truth directly and bluntly, without euphemism or evasion."
    },
    {
      question: "What does 'UNDER THE WEATHER' signify?",
      options: [
        "A) Standing outside in heavy rain",
        "B) Feeling slightly unwell or indisposed",
        "C) Traveling in a tropical country",
        "D) Working in the meteorology department"
      ],
      correctAnswer: "B) Feeling slightly unwell or indisposed",
      explanation: "'Under the weather' is an idiom meaning feeling sick, indisposed, or lacking energy."
    }
  ],
  keyTerminology: [
    {
      term: "Idiom",
      definition: "A group of words established by usage as having a figurative meaning not deducible from those of the individual words."
    },
    {
      term: "Non-Compositionality",
      definition: "The principle that the meaning of a complex expression is not determined by the meanings of its parts."
    },
    {
      term: "Frozen Syntax",
      definition: "The rigid structural characteristic of idioms that prohibits swapping words, altering tenses, or changing numbers."
    },
    {
      term: "Literal Distractor",
      definition: "An exam multiple-choice option that translates the literal, physical meaning of an idiom to trick careless candidates."
    },
    {
      term: "Allusion",
      definition: "An expression designed to call something to mind without mentioning it explicitly, common in mythological idioms (e.g., Achilles' heel)."
    },
    {
      term: "Bone of Contention",
      definition: "A synonym idiom for 'Apple of discord', signifying a central issue over which parties argue bitterly."
    },
    {
      term: "Proverb vs Idiom",
      definition: "An idiom is a phrase serving as a sentence element; a proverb is a complete sentence offering moral wisdom."
    },
    {
      term: "Colloquialism",
      definition: "An informal word or phrase characteristic of conversational speech, often incorporating idioms."
    }
  ],
  sources: [
    {
      title: "Oxford Dictionary of Idioms",
      author: "John Ayto (Oxford University Press)",
      details: "Comprehensive etymological origins, historical backgrounds, and standard usages of classical idioms."
    },
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapter on 'Idioms and Idiomatic Expressions' with classic exercise passages."
    },
    {
      title: "Word Power Made Easy",
      author: "Norman Lewis",
      details: "Sections on figurative language, allusions, and vocabulary expansion."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Analysis of idiom and vocabulary questions from Vyapam recruitment exams between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Literal Meaning Trap",
      confusion: "Choosing an option that describes literal animals, vegetables, or physical objects.",
      clarity: "Never select the literal meaning! If the idiom mentions 'milk' or 'horse', the answer is NEVER about dairy farming or horse riding. Idioms are 100% figurative."
    },
    {
      concept: "Achilles' Heel vs Achilles' Shield",
      confusion: "Confusing strength with vulnerability.",
      clarity: "Achilles' heel represents the **only vulnerable spot or fatal weakness**; it does NOT mean an area of strength."
    },
    {
      concept: "Apple of Discord vs Apple of One's Eye",
      confusion: "Confusing cause of fight with person dearly loved.",
      clarity: "**Apple of discord** = cause of quarrel/dispute. **Apple of one's eye** = someone deeply loved and cherished (*e.g., his daughter is the apple of his eye*)."
    },
    {
      concept: "Once in a Blue Moon vs Out of the Blue",
      confusion: "Confusing rarity with suddenness.",
      clarity: "**Once in a blue moon** = happens very **rarely**. **Out of the blue** = happens very **suddenly/unexpectedly**."
    },
    {
      concept: "Leave no stone unturned vs Turn over a new leaf",
      confusion: "Swapping efforts with self-reformation.",
      clarity: "**Leave no stone unturned** = make **every possible effort**. **Turn over a new leaf** = change one's behavior for the better."
    }
  ],
  faqList: [
    {
      question: "Can we modify the words inside an idiom?",
      answer: "No. Idioms have fixed or frozen syntax. Substituting synonyms (e.g., saying 'spill the peas' instead of 'spill the beans') destroys the idiomatic meaning and constitutes an error."
    },
    {
      question: "What is the origin of 'Achilles' Heel'?",
      answer: "In Greek mythology, the nymph Thetis dipped her baby son Achilles into the magical River Styx to make him invulnerable, holding him by his heel. His heel remained dry and untouched by the water, becoming his only fatal, vulnerable spot."
    },
    {
      question: "What does 'To burn the midnight oil' mean in academic contexts?",
      answer: "It means to work or study late into the night, originating from the era when students and scholars studied beside oil lamps before electricity existed."
    },
    {
      question: "What is the difference between an Idiom and a Phrasal Verb?",
      answer: "A phrasal verb is specifically a combination of a verb and preposition/adverb (e.g., 'put off', 'look after'). An idiom is a broader figurative phrase that can consist of nouns, adjectives, and prepositional phrases (e.g., 'a red-letter day', 'in a nutshell')."
    },
    {
      question: "How should an aspirant tackle an unfamiliar idiom in the exam?",
      answer: "Read the entire sentence context carefully. Identify the tone (positive, negative, or skeptical), and immediately eliminate all options that offer literal interpretations of the words in the idiom."
    }
  ],
  oneLinerRevision: [
    "Idioms are figurative expressions whose meanings cannot be deduced from individual words.",
    "'A dark horse' refers to an unexpected winner or unforeseen competitor.",
    "'A red-letter day' signifies a momentous, joyful, and memorable milestone.",
    "'Achilles' heel' represents a single fatal or vulnerable weakness.",
    "'Apple of discord' means a bone of contention or cause of bitter dispute.",
    "'Once in a blue moon' means occurring very rarely; 'Out of the blue' means completely unexpected.",
    "'To smell a rat' means to suspect foul play, dishonesty, or deception.",
    "'To leave no stone unturned' means to use every conceivable effort to achieve an aim.",
    "'Bite the bullet' means to face an inevitable painful ordeal with fortitude.",
    "Literal interpretations of idiom components are virtually always incorrect distractor options."
  ],
  rapidRevision: {
    points: [
      "Cardinal Rule: Figurative meaning only; reject literal traps immediately.",
      "Animal Idioms: Dark horse (unexpected winner), Wild goose chase (futile search), Smell a rat (suspect deceit).",
      "Color Idioms: Red letter day (memorable day), Blue moon (very rare), White elephant (costly burden).",
      "Anatomy: Achilles' heel (fatal weakness), Cold feet (nervous hesitation), Bite bullet (brave ordeal).",
      "Food: Spill beans (reveal secret), Piece of cake (very easy), Pinch of salt (skeptical).",
      "Mythology: Apple of discord (cause of quarrel), Sword of Damocles (constant danger)."
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
