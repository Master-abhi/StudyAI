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
  id: "cgv_master_eng_vocab_5",
  topicId: "eng_vocab_5",
  chapterId: "cgv_master_sub_6_ch_6",
  subjectId: "cgv_master_sub_6",
  title: "Phrasal Verbs",
  subtitle: "Master Guide to Idiomatic Verb-Particle Combinations, Syntax Rules & Archives for CG Vyapam",
  overview: {
    introduction: "A Phrasal Verb is an idiomatic grammatical phrase consisting of a base verb combined with an adverbial particle, a preposition, or both. The resulting combination acquires a completely new, non-literal meaning that cannot be deduced from the literal definitions of the individual component words (e.g., 'give up' does not mean to hand something upwards, but to surrender or discontinue a habit; 'put off' means to postpone). Phrasal verbs in English fall into four structural categories: (1) Intransitive verbs (cannot take a direct object, e.g., 'break down', 'pass out'); (2) Transitive Separable verbs (the object can be positioned either after the particle or between the verb and the particle, but pronouns MUST go in the middle, e.g., 'turn off the light' / 'turn it off'); (3) Transitive Inseparable verbs (the object must always follow the particle, e.g., 'look after someone'); and (4) Three-Part Phrasal Verbs (combining a verb + adverbial particle + preposition, e.g., 'put up with', 'look forward to').",
    importance: "Phrasal verbs are universally recognized as one of the most heavily tested and challenging areas of the English section in CG Vyapam exams (Hostel Warden, Revenue Inspector, Patwari, Sub Inspector, ADEO, Teacher, and Lab Assistant). Vyapam question papers feature between 2 to 4 direct questions on phrasal verbs in the form of fill-in-the-blanks, cloze tests, error detection, and sentence improvement. Mastery of phrasal verbs is vital because subtle differences between particles (e.g., 'call off' vs 'call on') completely transform sentence semantics.",
    examRelevance: "Key areas tested in CG Vyapam exams include: (1) Classic root verb clusters (*Break, Bring, Call, Come, Get, Give, Look, Pass, Put, Run, Turn*); (2) High-frequency confusing pairs (e.g., *put off* [postpone] vs *put out* [extinguish]; *call off* [cancel] vs *call on* [visit]; *pass away* [die] vs *pass out* [faint]); (3) Strict pronoun placement in separable phrasal verbs ('throw it away', NOT 'throw away it'); (4) Fixed three-word phrasal combinations (*look forward to + V-ing*, *put up with*).",
    quickFacts: [
      { label: "Core Linguistic Nature", value: "Verb + Particle (Preposition/Adverb) producing a non-literal, idiomatic meaning" },
      { label: "Pronoun Placement Rule", value: "Pronoun objects must ALWAYS be placed between the verb and particle (e.g., 'Turn it off', NOT 'Turn off it')" },
      { label: "Extinguish vs Postpone", value: "'Put out' = extinguish a fire/light; 'Put off' = postpone a meeting/event" },
      { label: "Cancel vs Visit", value: "'Call off' = cancel an event; 'Call on' = visit a person; 'Call at' = visit a place" },
      { label: "Three-Part Structure", value: "Verb + Adverb + Preposition (e.g., 'put up with', 'look forward to + V-ing')" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Anatomy, Syntax & The Four Types of Phrasal Verbs",
      content: `### 1. What Makes a Phrasal Verb Unique?
A phrasal verb functions as a single semantic unit:
- *Literal Verb:* He looked up at the tall minaret. ('Looked up' = physical direction of eyes).
- *Phrasal Verb:* He **looked up** the difficult word in the dictionary. ('Look up' = search for information).

---

### 2. The Four Grammatical Types of Phrasal Verbs
1. **Type 1: Intransitive (No Direct Object)**:
   - These verbs express a complete action and cannot take an object.
   - *Example:* The car **broke down** on the highway. (No object possible).
   - *Example:* When she heard the tragic news, she **passed out** (fainted).

2. **Type 2: Transitive & Separable**:
   - These verbs take an object, and the particle can be placed before or after a noun object.
   - *With Noun:* You can say:
     - *Turn off* the radio. (Verb + Particle + Object)
     - *Turn* the radio *off*. (Verb + Object + Particle)
   - **The Golden Pronoun Separation Rule (Critical Exam Law!)**:
     - When the object is a **personal pronoun** (*it, him, her, them, us, me*), the pronoun **MUST be placed in the middle**! Placing it at the end is an outright grammatical error.
     - *Correct:* Turn **it** off. / Throw **them** away. / Fill **it** up.
     - *Incorrect:* Turn off it. / Throw away them. / Fill up it.

3. **Type 3: Transitive & Inseparable**:
   - The verb takes an object, but the particle must stay welded to the verb. The object always follows the particle, even if it is a pronoun.
   - *Example:* The nurse **looked after** the elderly patient. / She **looked after** him. (NOT *looked him after*).
   - *Example:* I **ran into** an old classmate yesterday. / I **ran into** him. (NOT *ran him into*).

4. **Type 4: Three-Part (Prepositional Phrasal Verbs)**:
   - Verb + Adverbial Particle + Preposition. These are always transitive and always **inseparable**:
   - *Example:* I cannot **put up with** (tolerate) his arrogant behavior any longer.
   - *Example:* We are **looking forward to** meeting our new collector.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Master Phrasal Verbs: Break, Bring, Call & Carry",
      content: `### 1. Verb: BREAK
- **Break down**: (1) Stop functioning due to mechanical fault (machine/car); (2) Lose control of emotions and weep.
  - *Example:* The municipal water pump **broke down** yesterday.
  - *Example:* The widow **broke down** during the interrogation.
- **Break into**: Enter a building forcibly or illegally (by burglary).
  - *Example:* Thieves **broke into** the jeweler's shop at midnight.
- **Break out**: (1) Start suddenly (war, epidemic, fire, riots); (2) Escape from prison.
  - *Example:* Dengue fever **broke out** in several wards of Raipur.
- **Break up**: (1) Terminate a relationship or marriage; (2) Disperse (a meeting).
  - *Example:* The college union meeting **broke up** in chaos.
- **Break through**: Make a sudden significant discovery or breakthrough.
  - *Example:* Scientists finally **broke through** in cancer research.

---

### 2. Verb: BRING
- **Bring about**: Cause something to happen; effect a change.
  - *Example:* The green revolution **brought about** a dramatic rise in crop yield.
- **Bring up**: (1) Rear and educate a child; (2) Mention a topic in discussion.
  - *Example:* He was **brought up** by his maternal grandparents in Bastar.
- **Bring out**: Publish a book or reveal a latent quality.
  - *Example:* The Chhattisgarh Granth Academy has **brought out** a new encyclopedia.
- **Bring round**: Persuade someone to agree; or restore to consciousness after fainting.
  - *Example:* Splashing cold water on his face finally **brought him round**.

---

### 3. Verb: CALL
- **Call off**: Cancel an arranged event, strike, or sporting match.
  - *Example:* Trade unions decided to **call off** their nationwide strike.
- **Call on**: Visit a person briefly.
  - *Example:* Yesterday, the Chief Minister **called on** the Governor at Raj Bhavan.
- **Call at**: Visit a place or house briefly.
  - *Example:* The mail train **calls at** all district railway stations.
- **Call for**: Demand, require, or necessitate publicly.
  - *Example:* The serious financial irregularities **call for** an immediate audit.
- **Call in**: Summon someone for help or consultation (e.g., doctor, police).
  - *Example:* The patient's condition worsened, so the family **called in** a specialist.

---

### 4. Verb: CARRY
- **Carry out**: Execute, fulfill, or perform an order, duty, or experiment.
  - *Example:* Soldiers must **carry out** the orders of their commanding officer.
- **Carry on**: Continue an activity or work.
  - *Example:* Please **carry on** with your revision while I prepare the question paper.
- **Carry away**: Lose self-control due to overwhelming emotion or excitement.
  - *Example:* He was **carried away** by excessive enthusiasm and made empty promises.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Master Phrasal Verbs: Come, Get & Give",
      content: `### 1. Verb: COME
- **Come across**: Meet or find someone or something unexpectedly by chance.
  - *Example:* While cleaning the bookshelf, I **came across** my grandfather's diary.
  - *Note on Exam Error:* Never use 'suddenly' with 'come across', because 'come across' already denotes suddenness!
- **Come by**: Obtain or acquire something, especially with difficulty.
  - *Example:* Rare manuscripts on ancient Chhattisgarh history are hard to **come by**.
- **Come off**: Take place successfully according to plan.
  - *Example:* The administrative seminar **came off** without any technical hitch.
- **Come round**: Agree to an opinion after initial disagreement; or regain consciousness.
  - *Example:* After hours of patient explanation, father **came round** to our proposal.
- **Come of**: Belong to a family by birth or origin.
  - *Example:* She **comes of** a noble and respected tribal family of Surguja.

---

### 2. Verb: GET
- **Get over**: Overcome a difficulty, illness, grief, or emotional shock.
  - *Example:* It took him several months to **get over** the financial loss.
- **Get through**: (1) Succeed in an examination; (2) Connect by telephone.
  - *Example:* With consistent study, you will easily **get through** the CG Vyapam exam.
- **Get along with**: Have a friendly, harmonious relationship with someone.
  - *Example:* The new employee **gets along well with** all his colleagues.
- **Get rid of**: Dispose of, discard, or free oneself from an unwanted nuisance.
  - *Example:* It is difficult for an addict to **get rid of** bad habits.
- **Get away with**: Escape blame, punishment, or retribution for a wrongful act.
  - *Example:* The corrupt official thought he could **get away with** accepting bribes.

---

### 3. Verb: GIVE
- **Give up**: Abandon, discontinue, surrender, or cease a habit or effort.
  - *Example:* The doctor advised him to **give up** smoking immediately.
- **Give in**: Yield, surrender, or submit under pressure or resistance.
  - *Example:* The rebels finally **gave in** to the security forces.
- **Give away**: (1) Distribute prizes/gifts free of charge; (2) Reveal a secret.
  - *Example:* The Governor **gave away** the state sports awards.
  - *Example:* His trembling hands **gave away** his nervousness.
- **Give out**: (1) Emit light, heat, or smell; (2) Become exhausted or fail.
  - *Example:* After ten hours of continuous trekking, their stamina **gave out**.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Master Phrasal Verbs: Look, Pass, Put, Run & Turn",
      content: `### 1. Verb: LOOK
- **Look after**: Take care of, attend to, or protect someone.
  - *Example:* The elder sister **looked after** the children while their parents were away.
- **Look into**: Investigate, examine, or inquire into a matter or complaint.
  - *Example:* The Sub-Divisional Magistrate promised to **look into** the land grievance.
- **Look for**: Search for or seek a lost person or item.
  - *Example:* He spent the entire morning **looking for** his misplaced keys.
- **Look down upon**: Regard someone with contempt or feelings of superiority.
  - *Example:* One should never **look down upon** the poor or underprivileged.
- **Look forward to**: Await an upcoming event with eager anticipation.
  - *Rule:* **Always followed by a Gerund (V-ing)**, never V1!
  - *Correct:* I **look forward to hearing** from you soon. (NOT *to hear*).

---

### 2. Verb: PASS
- **Pass away**: Die (a respectful, polite euphemism for death).
  - *Example:* The renowned freedom fighter **passed away** peacefully at the age of ninety.
- **Pass out**: (1) Lose consciousness / faint; (2) Graduate from a military academy or college.
  - *Example:* Several students **passed out** due to dehydration during the parade.
- **Pass for**: Be accepted or mistaken as someone or something.
  - *Example:* He speaks English so fluently that he could **pass for** a native speaker.

---

### 3. Verb: PUT
- **Put off**: Postpone, delay, or defer an event to a later date.
  - *Example:* The board decided to **put off** the interview until next month.
- **Put out**: Extinguish a fire, candle, cigarette, or lamp.
  - *Example:* Firefighters worked courageously to **put out** the blaze.
- **Put up with**: Tolerate, endure, or bear an unpleasant situation or person patiently.
  - *Example:* I cannot **put up with** such insolent insolence from a subordinate.
- **Put on**: (1) Wear clothes, spectacles, or shoes; (2) Assume an artificial attitude.
  - *Example:* **Put on** your sweater; it is freezing outside.
- **Put down**: Suppress by force (a rebellion); or write down notes.
  - *Example:* The police swiftly **put down** the prison riot.

---

### 4. Verb: RUN & TURN
- **Run into**: Meet someone by accident; or collide with.
  - *Example:* I **ran into** an old schoolmate at the Raipur airport.
- **Run over**: Knock down and drive over a person or animal (by vehicle).
  - *Example:* The stray cow was **run over** by a speeding truck.
- **Run out of**: Exhaust the supply of an essential commodity (food, fuel, patience).
  - *Example:* We have **run out of** petrol; we must find a fuel station immediately.
- **Turn down**: Reject, refuse, or decline an offer, proposal, or application.
  - *Example:* The bank **turned down** his request for an unsecured loan.
- **Turn off**: Stop the operation or flow of water, gas, or electricity.
  - *Example:* Remember to **turn off** the tap after washing your hands.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Three-Part Phrasal Verbs & Exam-Solving Strategies",
      content: `### 1. Three-Part Phrasal Verbs (Verb + Adverb + Preposition)
These complex idioms are exceptionally popular in CG Vyapam cloze tests and fill-in-the-blank questions:

1. **Catch up with**: Reach the same level or standard as someone ahead of you.
   - *Example:* If you miss classes, you will have to work overtime to **catch up with** your classmates.
2. **Cut down on**: Reduce the consumption or quantity of something.
   - *Example:* The doctor advised the diabetic patient to **cut down on** sugar and carbohydrates.
3. **Face up to**: Accept, confront, and deal bravely with an unpleasant truth or reality.
   - *Example:* Candidates must **face up to** the fact that competitive exams demand rigorous hard work.
4. **Make up for**: Compensate for a loss, deficiency, or mistake.
   - *Example:* His remarkable dedication **made up for** his initial lack of technical experience.
5. **Stand up for**: Defend, support, or champion a person, right, or principle.
   - *Example:* Citizens must courageously **stand up for** their constitutional freedoms.
6. **Look up to**: Respect, admire, and revere someone as a role model.
   - *Example:* Young athletes **look up to** Olympic champions for inspiration.

---

### 2. Strategy for Solving Phrasal Verb Questions in the Exam Hall
1. **Never Translate Literally**:
   - Phrasal verbs lose their literal meaning. 'Call off' does not mean to shout away; it means to cancel.
2. **Distinguish 'Put out' vs 'Put off'**:
   - Flames / Fires / Candles -> **Put out** (extinguish).
   - Meetings / Dates / Exams -> **Put off** (postpone).
3. **The 'Look forward to' Trap**:
   - In 90% of exam questions featuring 'look forward to', examiners test whether you know it is followed by a **gerund (V-ing)**:
     - *Incorrect:* I look forward to meet you.
     - *Correct:* I look forward to **meeting** you.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master High-Frequency CG Vyapam Phrasal Verbs Matrix",
      headers: ["Phrasal Verb", "Grammatical Class", "Core Idiomatic Meaning", "Illustrative Contextual Sentence"],
      rows: [
        ["Break down", "Intransitive", "Fail mechanically; weep bitterly", "The generator broke down during the examination."],
        ["Break into", "Transitive (Insep)", "Enter by force / burglary", "Thieves broke into the cooperative bank."],
        ["Break out", "Intransitive", "Erupt suddenly (war, fire, disease)", "Cholera broke out in the flooded areas."],
        ["Bring about", "Transitive (Sep)", "Cause something to occur", "Honest governance brought about prosperity."],
        ["Bring up", "Transitive (Sep)", "Rear a child; raise a topic", "She was brought up in a traditional joint family."],
        ["Call off", "Transitive (Sep)", "Cancel an event or strike", "Workers agreed to call off the proposed agitation."],
        ["Call on", "Transitive (Insep)", "Visit a person briefly", "We called on our retired professor yesterday."],
        ["Carry out", "Transitive (Sep)", "Execute or perform an order", "The police carried out the court's eviction order."],
        ["Come across", "Transitive (Insep)", "Find or meet by chance", "I came across an ancient coin in the field."],
        ["Give in", "Intransitive", "Surrender, yield to pressure", "Never give in to injustice or extortion."],
        ["Give up", "Transitive (Sep)", "Abandon an effort or habit", "He gave up smoking after his heart surgery."],
        ["Look after", "Transitive (Insep)", "Care for, attend to", "Who will look after the cattle during the fair?"],
        ["Look into", "Transitive (Insep)", "Investigate or inquire into", "The committee is looking into the tender scam."],
        ["Pass away", "Intransitive", "Die peacefully (euphemism)", "The respected tribal leader passed away last night."],
        ["Put off", "Transitive (Sep)", "Postpone or defer an event", "The sports meet was put off due to heavy rain."],
        ["Put out", "Transitive (Sep)", "Extinguish fire or light", "Please put out the candle before sleeping."],
        ["Put up with", "Three-part (Insep)", "Tolerate or endure patiently", "I cannot put up with your insolent behavior."],
        ["Turn down", "Transitive (Sep)", "Reject an offer or plea", "The manager turned down his loan application."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Crucial Contrasting Pairs: The Most Deceptive Vyapam Traps",
      headers: ["Confusing Phrasal Pair", "Verb A: Meaning & Usage", "Verb B: Meaning & Usage", "Contrasting Sentence Demonstration"],
      rows: [
        ["Put out vs Put off", "Put out: Extinguish a fire or lamp.", "Put off: Postpone an appointment or event.", "Firemen put out the fire, but the sports match was put off."],
        ["Call on vs Call at", "Call on: Visit a person.", "Call at: Visit a place or railway station.", "I called on the Collector, who was calling at the tehsil office."],
        ["Break into vs Break out", "Break into: Forcible entry by thieves.", "Break out: Sudden start of epidemic/war.", "A fire broke out after the burglar broke into the house."],
        ["Pass out vs Pass away", "Pass out: Faint / lose consciousness.", "Pass away: Die permanently.", "She passed out from heat exhaustion, but her uncle passed away."],
        ["Look after vs Look into", "Look after: Care for someone.", "Look into: Investigate a crime/complaint.", "He looked after the victim, while police looked into the crime."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Separable vs Inseparable Phrasal Verbs Behavior Chart",
      headers: ["Category", "Structural Rule", "Noun Object Behavior", "Pronoun Object Behavior (Exam Trap)"],
      rows: [
        ["Transitive Separable", "Particle can be separated from the verb", "Both valid: 'Turn off the tap' OR 'Turn the tap off'", "MANDATORY IN MIDDLE: 'Turn it off' (NOT 'Turn off it')"],
        ["Transitive Inseparable", "Particle cannot be separated from verb", "Must follow particle: 'Look after the child'", "Must follow particle: 'Look after him' (NOT 'Look him after')"],
        ["Three-Part Verbs", "Fixed triplet: Verb + Particle + Preposition", "Must follow preposition: 'Put up with the noise'", "Must follow preposition: 'Put up with it'"],
        ["Intransitive", "Takes NO direct object whatsoever", "Cannot take a noun object ('The car broke down')", "Cannot take a pronoun object"]
      ]
    }
  ],
  pyqs: [
    {
      question: "The firemen managed to ________ the blaze before it spread to nearby houses. [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) put off",
        "B) put out",
        "C) put up",
        "D) put down"
      ],
      correctAnswer: "B) put out",
      explanation: "'Put out' is the phrasal verb meaning to extinguish a fire, candle, or light. 'Put off' means to postpone or delay an event."
    },
    {
      question: "The trade union decided to ________ their proposed strike after successful negotiations. [CG Vyapam Patwari Exam]",
      options: [
        "A) call off",
        "B) call on",
        "C) call in",
        "D) call out"
      ],
      correctAnswer: "A) call off",
      explanation: "'Call off' means to cancel an event, strike, or arranged engagement. 'Call on' means to pay a brief visit to a person."
    },
    {
      question: "While cleaning the old wooden trunk, I ________ my grandfather's handwritten diary. [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) came across",
        "B) came by",
        "C) came round",
        "D) came through"
      ],
      correctAnswer: "A) came across",
      explanation: "'Come across' means to find or meet someone or something unexpectedly by chance. 'Come by' means to acquire or obtain with effort."
    },
    {
      question: "The Sub-Divisional Magistrate promised to ________ the public complaint against the ration dealer. [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) look for",
        "B) look after",
        "C) look into",
        "D) look at"
      ],
      correctAnswer: "C) look into",
      explanation: "'Look into' means to investigate, inquire into, or examine the facts of a matter or grievance. 'Look after' means to care for someone."
    },
    {
      question: "I cannot ________ his insolent and arrogant behavior any longer. [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) put up with",
        "B) put on",
        "C) put out",
        "D) put off"
      ],
      correctAnswer: "A) put up with",
      explanation: "'Put up with' is a three-part phrasal verb meaning to tolerate, endure, or bear an unpleasant person or situation patiently."
    },
    {
      question: "The car ________ on the desolate highway in the middle of the night. [CG Vyapam ADEO Exam]",
      options: [
        "A) broke into",
        "B) broke down",
        "C) broke out",
        "D) broke through"
      ],
      correctAnswer: "B) broke down",
      explanation: "'Break down' is an intransitive phrasal verb meaning to cease functioning because of a mechanical or electrical failure."
    }
  ],
  mcqs: [
    {
      question: "Fill in the blank: 'Cholera ________ in the flood-affected villages of the district.'",
      options: [
        "A) broke in",
        "B) broke out",
        "C) broke up",
        "D) broke down"
      ],
      correctAnswer: "B) broke out",
      explanation: "'Break out' means to start suddenly or erupt, used specifically for diseases, epidemics, wars, and fires."
    },
    {
      question: "Select the sentence with the correct pronoun placement:",
      options: [
        "A) Please throw away it into the dustbin.",
        "B) Please throw it away into the dustbin.",
        "C) Please throw to it away into the dustbin.",
        "D) Please away throw it into the dustbin."
      ],
      correctAnswer: "B) Please throw it away into the dustbin.",
      explanation: "In separable phrasal verbs like 'throw away', a pronoun object ('it') MUST be placed between the verb and the particle: 'throw it away'."
    },
    {
      question: "Fill in the blank: 'We are looking forward to ________ you at the annual convention.'",
      options: [
        "A) meet",
        "B) meeting",
        "C) met",
        "D) have met"
      ],
      correctAnswer: "B) meeting",
      explanation: "The phrasal verb 'look forward to' is strictly followed by a gerund (V-ing) because 'to' functions here as a preposition, not an infinitive marker. Therefore, 'meeting' is correct."
    },
    {
      question: "The bank manager ________ his application for an educational loan.",
      options: [
        "A) turned down",
        "B) turned up",
        "C) turned off",
        "D) turned over"
      ],
      correctAnswer: "A) turned down",
      explanation: "'Turn down' means to reject, decline, or refuse a request, proposal, or application."
    },
    {
      question: "Due to illness, the committee had to ________ the scheduled meeting until next week.",
      options: [
        "A) put out",
        "B) put off",
        "C) put on",
        "D) put in"
      ],
      correctAnswer: "B) put off",
      explanation: "'Put off' means to postpone or reschedule an event to a future time."
    },
    {
      question: "The doctor advised the patient to ________ smoking immediately.",
      options: [
        "A) give in",
        "B) give up",
        "C) give away",
        "D) give out"
      ],
      correctAnswer: "B) give up",
      explanation: "'Give up' means to discontinue, renounce, or quit a habit."
    },
    {
      question: "The elderly freedom fighter ________ peacefully at his ancestral home.",
      options: [
        "A) passed out",
        "B) passed away",
        "C) passed off",
        "D) passed by"
      ],
      correctAnswer: "B) passed away",
      explanation: "'Passed away' is the standard polite euphemism for death. 'Passed out' means fainted."
    },
    {
      question: "Thieves ________ the locked house and looted ornaments worth lakhs.",
      options: [
        "A) broke into",
        "B) broke down",
        "C) broke out",
        "D) broke through"
      ],
      correctAnswer: "A) broke into",
      explanation: "'Broke into' means to enter a building illegally and forcibly, especially for committing theft or burglary."
    }
  ],
  keyTerminology: [
    {
      term: "Phrasal Verb",
      definition: "An idiomatic phrase consisting of a verb combined with a preposition or adverbial particle, yielding a unique composite meaning."
    },
    {
      term: "Particle",
      definition: "A function word (such as off, up, down, out, away) paired with a verb to create a phrasal verb."
    },
    {
      term: "Separable Phrasal Verb",
      definition: "A transitive phrasal verb whose object can be placed either between the verb and the particle or after the particle."
    },
    {
      term: "Inseparable Phrasal Verb",
      definition: "A transitive phrasal verb whose particle cannot be separated from the verb, requiring the object to follow the particle."
    },
    {
      term: "Three-Part Phrasal Verb",
      definition: "A complex phrasal verb consisting of a verb, an adverbial particle, and a preposition (e.g., look forward to, put up with)."
    },
    {
      term: "Intransitive Phrasal Verb",
      definition: "A phrasal verb that does not require and cannot take a direct object (e.g., break down, pass out)."
    },
    {
      term: "Pronoun Infixation",
      definition: "The mandatory grammatical rule in English requiring pronoun objects to be placed between the verb and particle in separable verbs."
    },
    {
      term: "Idiomatic Non-Compositionality",
      definition: "The linguistic property wherein the meaning of the phrasal verb cannot be determined from the literal meanings of its constituent parts."
    }
  ],
  sources: [
    {
      title: "Oxford Dictionary of Phrasal Verbs",
      author: "A. P. Cowie & R. Mackin (Oxford University Press)",
      details: "Comprehensive analysis of transitive, intransitive, separable, and inseparable phrasal structures."
    },
    {
      title: "English Grammar in Use",
      author: "Raymond Murphy (Cambridge University Press)",
      details: "Units 137 to 145 dedicated to phrasal verbs and particle placement rules."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Sections on phrasal verbs, pronoun positioning, and three-part prepositional combinations."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Compilation of phrasal verb questions from Vyapam recruitment examinations between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Put out vs Put off",
      confusion: "Swapping 'put out' and 'put off' in sentences involving fire and meetings.",
      clarity: "**Put out** means to **extinguish** a fire or light. **Put off** means to **postpone** a meeting or examination."
    },
    {
      concept: "Call off vs Call on",
      confusion: "Confusing cancellation with visiting.",
      clarity: "**Call off** means to **cancel** (a strike, a match). **Call on** means to **visit a person** briefly."
    },
    {
      concept: "Pass out vs Pass away",
      confusion: "Treating 'passed out' as death.",
      clarity: "**Pass out** means to **faint / lose consciousness temporarily**. **Pass away** is a polite term for **death**."
    },
    {
      concept: "Look after vs Look into",
      confusion: "Using 'look after' for criminal investigations.",
      clarity: "**Look after** means to **take care of** (children, cattle, health). **Look into** means to **investigate** a complaint or crime."
    },
    {
      concept: "Pronoun Placement in Separable Verbs",
      confusion: "Writing 'Turn off it' or 'Throw away it'.",
      clarity: "When the object is a pronoun (*it, them, him, her*), it MUST go between the verb and particle: **'Turn it off'**, **'Throw it away'**."
    }
  ],
  faqList: [
    {
      question: "Why is 'look forward to' followed by 'meeting' instead of 'meet'?",
      answer: "In 'look forward to', the word 'to' is a true preposition, NOT the infinitive marker. Prepositions in English are always followed by nouns or gerunds (V-ing). Therefore, 'I look forward to meeting you' is grammatically correct."
    },
    {
      question: "Can 'Break down' apply to humans as well as machines?",
      answer: "Yes! When applied to a vehicle or machine, 'break down' means to stop functioning mechanically. When applied to a person, it means to lose emotional control and weep or collapse from sorrow."
    },
    {
      question: "What is the difference between 'Give up' and 'Give in'?",
      answer: "'Give up' means to voluntarily abandon a habit, project, or effort (e.g., 'give up smoking'). 'Give in' means to yield or surrender under external pressure (e.g., 'the enemy gave in')."
    },
    {
      question: "Why can't we say 'I came across him suddenly'?",
      answer: "Because 'came across' already carries the inherent meaning of meeting someone suddenly and by chance. Adding 'suddenly' creates an unnecessary and ungrammatical redundancy."
    },
    {
      question: "What is the meaning of 'Call at' vs 'Call on'?",
      answer: "'Call on' means to visit a person (e.g., 'I called on the Doctor'). 'Call at' means to visit a place or stop at a station (e.g., 'The train calls at Bilaspur')."
    }
  ],
  oneLinerRevision: [
    "'Put out' means to extinguish a fire/light; 'Put off' means to postpone an event.",
    "'Call off' means to cancel an event; 'Call on' means to visit a person.",
    "'Look into' means to investigate; 'Look after' means to take care of someone.",
    "'Look forward to' is always followed by a Gerund (V-ing), e.g., 'look forward to seeing you'.",
    "'Break down' means to fail mechanically or weep emotionally; 'Break into' means to enter by force.",
    "'Break out' means to erupt suddenly (used for wars, fires, and epidemics).",
    "'Pass away' means to die; 'Pass out' means to faint or lose consciousness.",
    "In separable phrasal verbs, pronoun objects must be placed in the middle (e.g., 'turn it off').",
    "'Come across' means to meet or find by chance; never use 'suddenly' with 'come across'.",
    "'Put up with' means to tolerate or endure an unpleasant situation patiently."
  ],
  rapidRevision: {
    points: [
      "Definition: Verb + Particle = New idiomatic meaning.",
      "Pronoun Rule: Pronoun objects must go in the middle (Turn it off, Throw it away).",
      "Put Verbs: Put out (extinguish), Put off (postpone), Put up with (tolerate), Put on (wear).",
      "Call Verbs: Call off (cancel), Call on (visit person), Call at (visit place), Call for (demand).",
      "Break Verbs: Break down (fail/weep), Break into (burglary), Break out (epidemic/war/fire).",
      "Look Verbs: Look into (investigate), Look after (care for), Look forward to + V-ing (eagerly await).",
      "Pass Verbs: Pass away (die), Pass out (faint)."
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
