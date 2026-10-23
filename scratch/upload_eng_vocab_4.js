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
  id: "cgv_master_eng_vocab_4",
  topicId: "eng_vocab_4",
  chapterId: "cgv_master_sub_6_ch_6",
  subjectId: "cgv_master_sub_6",
  title: "Homophones",
  subtitle: "Comprehensive Notes on Homophones, Homonyms, Confusing Word Pairs & Mnemonics for CG Vyapam",
  overview: {
    introduction: "A Homophone (derived from the Greek 'homos' meaning same, and 'phone' meaning sound or voice) is a word that is pronounced identically to another word but differs in spelling, origin, and meaning (e.g., 'stationary' vs 'stationery', 'principal' vs 'principle', 'compliment' vs 'complement'). Homophones must be distinguished from Homographs (words sharing the same spelling but differing in meaning and often pronunciation, such as 'lead' /li:d/ metal vs 'lead' /led/ to guide) and Homonyms (words that share both pronunciation and spelling but possess unrelated meanings, such as 'bank' of a river vs financial 'bank'). In competitive examinations, homophones represent one of the most deceptive question formats, deliberately engineered to test whether a candidate possesses orthographic accuracy and contextual awareness.",
    importance: "Homophones are consistently tested across all CG Vyapam examinations, including Hostel Warden, Patwari, Revenue Inspector (RI), Sub Inspector (SI), ADEO, and Assistant Teacher exams. Questions are presented as fill-in-the-blanks, sentence improvement items, error detection queries, and vocabulary pair matching. A single misspelled or swapped homophone can alter the entire meaning of an official administrative sentence, making this topic a primary testing ground for government recruiters.",
    examRelevance: "CG Vyapam questions on Homophones focus on: (1) Classic administrative pairs (e.g., *council vs counsel, official vs officious, judicial vs judicious*); (2) Academic homophones (e.g., *principal vs principle, stationary vs stationery, coarse vs course*); (3) Action vs Result pairs (e.g., *affect vs effect*); (4) Three-way homophones (e.g., *cite, sight, and site*); (5) Applying smart mnemonics to guarantee zero spelling confusion under examination pressure.",
    quickFacts: [
      { label: "Linguistic Definition", value: "Same Pronunciation (Sound) + Different Spelling + Different Meaning" },
      { label: "Homophone vs Homograph", value: "Homophone = Same Sound; Homograph = Same Spelling; Homonym = Both" },
      { label: "Mnemonic: StationEry", value: "StationEry has 'E' for Envelope, Eraser, and pEn; StationAry has 'A' for At rest" },
      { label: "Mnemonic: PrincipLE", value: "PrincipLE ends in 'LE', just like ruLE; PrincipAL is your school pAL" },
      { label: "Vyapam Exam Weightage", value: "2 to 3 direct questions per examination; highly prone to hasty errors" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Linguistic Spectrum: Homophones, Homographs & Homonyms",
      content: `### 1. Conceptual Classification of Sound and Spelling Pairs
To master this topic, candidates must clearly differentiate three often-confused linguistic concepts:

1. **Homophones (Same Sound, Different Spelling, Different Meaning)**:
   - Words that sound identical when spoken aloud, but have different spellings and completely distinct meanings.
   - *Examples:*
     - **Altar** (a sacred table in a temple/church) vs **Alter** (to modify or change).
     - **Coarse** (rough, crude) vs **Course** (direction, syllabus).
     - **Brake** (device to stop a vehicle) vs **Break** (to smash or fracture).

2. **Homographs (Same Spelling, Different Sound/Meaning)**:
   - Words that share identical spelling, but have different origins, meanings, and often different pronunciations.
   - *Examples:*
     - **Lead** (/li:d/ - verb: to guide) vs **Lead** (/led/ - noun: a heavy grey metal).
     - **Wind** (/wɪnd/ - noun: moving air) vs **Wind** (/waɪnd/ - verb: to twist or coil).
     - **Tear** (/tɪər/ - noun: drop of water from eye) vs **Tear** (/tɛər/ - verb: to rip paper).

3. **Homonyms (Same Sound AND Same Spelling, Different Meaning)**:
   - Words that sound the same and look the same, but have completely independent meanings.
   - *Examples:*
     - **Bank** (financial institution) vs **Bank** (the sloping side of a river).
     - **Bat** (a flying nocturnal mammal) vs **Bat** (a wooden cricket implement).
     - **Bark** (the outer covering of a tree) vs **Bark** (the sharp cry of a dog).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: High-Frequency CG Vyapam Homophone Pairs: Group A to D",
      content: `### 1. High-Frequency Pairs (A to B)
1. **Accept vs Except**:
   - **Accept** *(Verb)*: To receive willingly or agree to something.
     - *Example:* The Collector did not accept the contractor's delayed tender.
   - **Except** *(Preposition / Conjunction)*: Not including; excluding.
     - *Example:* All employees were present except the head clerk.

2. **Adapt vs Adopt vs Adept** (Super High-Yield Triad!):
   - **Adapt** *(Verb)*: To adjust to new conditions or environment.
     - *Example:* Living organisms must adapt to changing climates to survive.
   - **Adopt** *(Verb)*: To take legally as one's own child; or to embrace a policy/method.
     - *Example:* The government decided to adopt modern digital accounting.
   - **Adept** *(Adjective)*: Highly skilled, proficient, or expert at something.
     - *Example:* She is adept at solving complex mathematical reasoning problems.

3. **Affect vs Effect**:
   - **Affect** *(Verb)*: To influence or produce a change in something.
     - *Example:* Excessive rainfall will adversely affect crop production.
   - **Effect** *(Noun / Verb)*: As a noun, the result or consequence of an action.
     - *Example:* The new industrial policy had an immediate positive effect on employment.
     - *(Note: 'Effect' as a verb means to bring about or accomplish: 'to effect reforms').*

4. **Altar vs Alter**:
   - **Altar** *(Noun)*: A sacred raised structure or table used for religious offerings.
     - *Example:* The priest placed fresh marigold flowers upon the altar.
   - **Alter** *(Verb)*: To change or modify in character or appearance.
     - *Example:* You cannot alter the terms of the signed agreement.

5. **Ascent vs Assent**:
   - **Ascent** *(Noun)*: The act of climbing or ascending upwards; an upward slope.
     - *Example:* The steep ascent to the mountain shrine was exhausting.
   - **Assent** *(Noun / Verb)*: Official agreement, concurrence, or approval.
     - *Example:* The Governor gave his assent to the new legislative bill.

6. **Brake vs Break**:
   - **Brake** *(Noun / Verb)*: A mechanical device for slowing or stopping a moving vehicle.
     - *Example:* The bus driver applied the emergency brake just in time.
   - **Break** *(Verb / Noun)*: To separate into pieces; fracture; or a pause/interval.
     - *Example:* Handle the glass beaker with care, lest it should break.

---

### 2. High-Frequency Pairs (C to D)
7. **Canvas vs Canvass**:
   - **Canvas** *(Noun)*: A strong, coarse unbleached cloth used for tents, sails, and oil paintings.
     - *Example:* The relief team erected canvas tents for the flood victims.
   - **Canvass** *(Verb)*: To solicit votes, support, or opinions during an election campaign.
     - *Example:* Political volunteers went door to door to canvass for their candidate.

8. **Cast vs Caste**:
   - **Cast** *(Verb / Noun)*: To throw, fling; or the actors in a play.
     - *Example:* Every eligible adult has the constitutional right to cast their vote.
   - **Caste** *(Noun)*: A hereditary social class system in traditional society.
     - *Example:* Our constitution strictly prohibits discrimination based on caste.

9. **Cite vs Sight vs Site** (High Frequency!):
   - **Cite** *(Verb)*: To quote a passage, book, or author as evidence or authority.
     - *Example:* The advocate cited several landmark Supreme Court judgments.
   - **Sight** *(Noun)*: The faculty of seeing; vision; a view or spectacle.
     - *Example:* The Chitrakote waterfall is a magnificent sight during the monsoon.
   - **Site** *(Noun)*: An area of ground on which a construction project or event is located.
     - *Example:* Engineers inspected the construction site for the new bridge.

10. **Coarse vs Course**:
    - **Coarse** *(Adjective)*: Rough or loose in texture; or rude and vulgar.
      - *Example:* Khadi is a coarse, hand-woven cotton fabric.
    - **Course** *(Noun)*: Direction of movement; a syllabus or program of study.
      - *Example:* She enrolled in a computer diploma course in Raipur.

11. **Compliment vs Complement** (Very Common Vyapam Trap!):
    - **Compliment** *(Noun / Verb)*: A polite expression of praise, admiration, or congratulation.
      - *Example:* The Collector complimented the staff on their prompt disaster relief.
    - **Complement** *(Noun / Verb)*: A thing that contributes the extra features to make something complete.
      - *Example:* Rice and dal complement each other to form a balanced diet.

12. **Council vs Counsel**:
    - **Council** *(Noun)*: An advisory, deliberative, or administrative body of people.
      - *Example:* The Municipal Council approved the annual sanitation budget.
    - **Counsel** *(Noun / Verb)*: Advice, especially given formally; or a legal barrister/advocate.
      - *Example:* The accused was represented in court by experienced legal counsel.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: High-Frequency CG Vyapam Homophone Pairs: Group E to P",
      content: `### 1. High-Frequency Pairs (E to H)
13. **Desert vs Dessert**:
    - **Desert** *(Noun: /ˈdɛz.ərt/)*: A dry, barren area of land with little water and vegetation.
      - *Example:* The Thar is the largest desert in the Indian subcontinent.
      - *(As a verb: /dɪˈzɜːrt/ meaning to abandon: 'He deserted his regiment').*
    - **Dessert** *(Noun: /dɪˈzɜːrt/)*: The sweet course eaten at the end of a meal.
      - *Example:* We were served sweet mango kheer for dessert.

14. **Discrete vs Discreet**:
    - **Discrete** *(Adjective)*: Individually separate, distinct, and unconnected.
      - *Example:* The syllabus is broken down into twelve discrete modules.
    - **Discreet** *(Adjective)*: Careful and prudent in one's speech or actions, especially to maintain secrecy.
      - *Example:* An intelligence officer must remain completely discreet at all times.

15. **Eligible vs Illegible**:
    - **Eligible** *(Adjective)*: Having the right qualifications or satisfying the conditions to be chosen.
      - *Example:* Only graduates are eligible to apply for the Revenue Inspector exam.
    - **Illegible** *(Adjective)*: Not clear enough to be read; undecipherable handwriting.
      - *Example:* His doctor's prescription was completely illegible.

16. **Eminent vs Imminent**:
    - **Eminent** *(Adjective)*: Famous, respected, and distinguished within a particular profession.
      - *Example:* Dr. APJ Abdul Kalam was an eminent scientist and visionary leader.
    - **Imminent** *(Adjective)*: About to happen very soon; impending.
      - *Example:* Dark storm clouds gathered, indicating that heavy rain was imminent.

17. **Fair vs Fare**:
    - **Fair** *(Adjective / Noun)*: Just, unbiased; pale; or a festival/exhibition (Mela).
      - *Example:* The referee ensured that the match was conducted in a fair manner.
    - **Fare** *(Noun)*: The money a passenger pays to travel on a bus, train, or flight.
      - *Example:* Railway fare has been discounted for senior citizens.

18. **Gate vs Gait**:
    - **Gate** *(Noun)*: A movable barrier or entrance in a fence or wall.
      - *Example:* Please close the main gate behind you.
    - **Gait** *(Noun)*: A person's manner of walking.
      - *Example:* The old man walked with a slow, unsteady gait.

19. **Hoard vs Horde**:
    - **Hoard** *(Noun / Verb)*: A stock of money or valued objects amassed in secret; to store secretly.
      - *Example:* Corrupt traders attempted to hoard essential food grains during the crisis.
    - **Horde** *(Noun)*: A large group or crowd of people or invaders.
      - *Example:* A horde of excited tourists visited Bastar during the Dussehra festival.

---

### 2. High-Frequency Pairs (J to P)
20. **Judicial vs Judicious**:
    - **Judicial** *(Adjective)*: Relating to a court of law, judges, or the administration of justice.
      - *Example:* The High Court ordered a judicial inquiry into the incident.
    - **Judicious** *(Adjective)*: Having or showing good judgment; wise, sensible, and prudent.
      - *Example:* A judicious allocation of study hours is essential for exam success.

21. **Loose vs Lose**:
    - **Loose** *(Adjective)*: Not firmly held or fixed in place; not tight (e.g., loose clothes).
      - *Example:* He lost weight, so his shirt has become very loose.
    - **Lose** *(Verb)*: To be deprived of, fail to retain, or suffer a defeat.
      - *Example:* Work diligently so that you do not lose this valuable opportunity.

22. **Medal vs Meddle**:
    - **Medal** *(Noun)*: A metal disc awarded as a prize for bravery or athletic achievement.
      - *Example:* Neeraj Chopra won a gold medal in the javelin throw.
    - **Meddle** *(Verb)*: To interfere in something that is not one's concern.
      - *Example:* You should mind your own business and not meddle in my affairs.

23. **Peace vs Piece**:
    - **Peace** *(Noun)*: Freedom from disturbance; tranquility; absence of war.
      - *Example:* Mahatma Gandhi dedicated his entire life to the ideals of truth and peace.
    - **Piece** *(Noun)*: A portion, part, or fragment of an object.
      - *Example:* He wrote his phone number on a small piece of paper.

24. **Principal vs Principle**:
    - **Principal** *(Noun / Adjective)*: The head of a school/college; or the primary/main amount of money.
      - *Example:* The Principal addressed the students at the morning assembly.
    - **Principle** *(Noun)*: A fundamental truth, moral rule, or scientific law.
      - *Example:* He refused to compromise on his principles of honesty and integrity.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: High-Frequency CG Vyapam Homophone Pairs: Group R to Z",
      content: `### 1. High-Frequency Pairs (R to S)
25. **Right vs Rite vs Write**:
    - **Right** *(Adjective / Noun)*: Correct, morally good, or an entitlement.
      - *Example:* Freedom of speech is a fundamental right.
    - **Rite** *(Noun)*: A religious or other solemn ceremony or act.
      - *Example:* The funeral rites were performed according to Vedic traditions.
    - **Write** *(Verb)*: To mark letters or words on paper with a pen.
      - *Example:* Candidates must write their answers in blue or black ink.

26. **Root vs Route**:
    - **Root** *(Noun)*: The underground part of a plant that absorbs water and nutrients.
      - *Example:* The roots of the banyan tree spread deep into the soil.
    - **Route** *(Noun)*: A way or course taken in getting from a starting point to a destination.
      - *Example:* The state transport bus took a scenic route through Kanker.

27. **Sore vs Soar**:
    - **Sore** *(Adjective / Noun)*: Painful, aching, or a raw infected spot on the body.
      - *Example:* He had a sore throat and could not speak at the meeting.
    - **Soar** *(Verb)*: To fly or rise high in the air; or to increase rapidly.
      - *Example:* During the summer months, temperatures soar above 44 degrees Celsius.

28. **Stationary vs Stationery** (All-Time Exam Favorite!):
    - **Stationary** *(Adjective)*: Not moving; staying in one place; motionless.
      - *Example:* The car collided with a stationary truck parked on the highway.
    - **Stationery** *(Noun)*: Writing materials such as paper, envelopes, pens, and office files.
      - *Example:* We purchased notebooks and stationery from the college store.

29. **Story vs Storey**:
    - **Story** *(Noun)*: An account of imaginary or real people and events told for entertainment.
      - *Example:* The grandmother narrated an enchanting folk story to the children.
    - **Storey** *(Noun)*: A floor or level of a building.
      - *Example:* The administrative secretariat is housed in a multi-storey building.

---

### 2. High-Frequency Pairs (T to Z)
30. **Tail vs Tale**:
    - **Tail** *(Noun)*: The hindmost part of an animal.
      - *Example:* The dog wagged its tail affectionately.
    - **Tale** *(Noun)*: A fictitious story or narrative.
      - *Example:* 'The Tale of Two Cities' is a famous historical novel by Charles Dickens.

31. **Vain vs Vane vs Vein**:
    - **Vain** *(Adjective)*: Excessively proud of one's appearance; or producing no result (in vain = useless).
      - *Example:* All our frantic efforts to catch the train were in vain.
    - **Vane** *(Noun)*: A revolving pointer showing the direction of the wind (weather vane).
      - *Example:* The weather vane on the church tower pointed north.
    - **Vein** *(Noun)*: A blood vessel that carries deoxygenated blood back toward the heart.
      - *Example:* Veins possess valves to prevent the backward flow of blood.

32. **Waste vs Waist**:
    - **Waste** *(Verb / Noun)*: To use carelessly or squander; or unwanted residue.
      - *Example:* Do not waste your valuable preparation time on idle pursuits.
    - **Waist** *(Noun)*: The part of the human body below the ribs and above the hips.
      - *Example:* He fastened a genuine leather belt around his waist.

33. **Weather vs Whether**:
    - **Weather** *(Noun)*: The atmospheric conditions at a specific time and place.
      - *Example:* The cricket match was postponed due to inclement weather.
    - **Whether** *(Conjunction)*: Expressing a doubt or choice between alternatives (if).
      - *Example:* I do not know whether he will attend the examination tomorrow.

34. **Yoke vs Yolk**:
    - **Yoke** *(Noun)*: A wooden crossbar fastened over the necks of two animals to pull a plow or cart.
      - *Example:* India broke free from the colonial yoke in 1947.
    - **Yolk** *(Noun)*: The yellow, nutrient-rich inner part of a bird's egg.
      - *Example:* Egg yolk is rich in proteins, vitamins, and healthy fats.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Memory Mnemonics & Exam Accuracy Techniques",
      content: `### 1. High-Yield Mnemonics for Tricky Homophones
To avoid confusion in the exam hall, commit these intuitive memory associations to memory:

1. **StationAry vs StationEry**:
   - Station**E**ry contains an **'E'** -> Think of **E**nvelope, **E**raser, and p**E**n.
   - Station**A**ry contains an **'A'** -> Think of **A**t rest (motionless, fixed).

2. **PrincipAL vs PrincipLE**:
   - Princip**LE** ends in **'LE'** -> Think of ru**LE** (moral law or scientific principle).
   - Princip**AL** ends in **'AL'** -> The school Principal is your p**AL** (person / head).

3. **ComplIment vs ComplEment**:
   - Compl**I**ment has an **'I'** -> **I** like to give or receive praise (*I praise you*).
   - Compl**E**ment has an **'E'** -> Think of compl**E**te (it compl**e**tes the whole).

4. **DesErt vs DesSErt**:
   - Des**s**ert has **double 'S'** -> Think of **S**weet **S**tuff (you always want a **s**econd helping of **s**weets).
   - De**s**ert has **single 'S'** -> Think of **S**ahara or **S**and (only one 'S').

5. **DiscrEEt vs DiscrETe**:
   - Discr**ee**t has two **'e's huddled together** -> Keeping secrets quietly.
   - Discr**e-t-e** has the **'t' separating the two 'e's** -> 'T' divides them into separate, distinct parts.

---

### 2. Systematic Strategy for Homophone Fill-in-the-Blanks
1. **Identify the Required Part of Speech**:
   - Check whether the blank requires a noun, a verb, or an adjective.
   - *Example:* 'The medicine had an immediate ________ on the patient.'
   - The article 'an' requires a **noun**. Choose **Effect** (Noun), NOT **Affect** (Verb)!
2. **Read the Full Sentence Context**:
   - Never pick an option based on rapid phonetics alone.
   - Read the surrounding words to confirm the semantic context (e.g., voting = *canvass*; fabric = *canvas*).`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master Homophone Discrimination Matrix for CG Vyapam",
      headers: ["Homophone Pair", "Word A: Meaning & Part of Speech", "Word B: Meaning & Part of Speech", "Contrasting Sentence Demonstration"],
      rows: [
        ["Stationary vs Stationery", "Stationary (Adj): Not moving, static", "Stationery (Noun): Paper, pens, office goods", "The stationary delivery van was loaded with office stationery."],
        ["Principal vs Principle", "Principal (Noun/Adj): Head of school; main", "Principle (Noun): Moral rule, fundamental truth", "Our Principal is a man of strict moral principles."],
        ["Compliment vs Complement", "Compliment (Noun/Verb): Praise, admiration", "Complement (Noun/Verb): Complete, enhance", "She paid him a compliment on how his tie complemented his suit."],
        ["Affect vs Effect", "Affect (Verb): Influence, produce change", "Effect (Noun): Result, consequence", "Smoking affects health, and its harmful effects appear over time."],
        ["Council vs Counsel", "Council (Noun): An administrative committee", "Counsel (Noun/Verb): Legal advice; lawyer", "The village council sought legal counsel before passing the resolution."],
        ["Canvas vs Canvass", "Canvas (Noun): Heavy coarse cloth for tents", "Canvass (Verb): Solicit votes or support", "Volunteers in canvas jackets went door to door to canvass votes."],
        ["Eminent vs Imminent", "Eminent (Adj): Famous, distinguished", "Imminent (Adj): Impending, about to happen", "The eminent scientist warned that a severe drought was imminent."],
        ["Altar vs Alter", "Altar (Noun): Sacred platform for sacrifice", "Alter (Verb): Change, modify", "He refused to alter his vows made before the holy altar."],
        ["Coarse vs Course", "Coarse (Adj): Rough, unpolished", "Course (Noun): Direction, path, syllabus", "The ship altered its course because of coarse, rough seas."],
        ["Loose vs Lose", "Loose (Adj): Not tight, free", "Lose (Verb): Suffer loss, misplace", "Fasten that loose screw before you lose it completely."]
      ]
    },
    {
      tableId: "tab_2",
      title: "The Definitive Triad: Homophone vs Homograph vs Homonym",
      headers: ["Term Category", "Pronunciation (Sound)", "Spelling (Orthography)", "Word Meaning (Semantics)", "Textbook Example"],
      rows: [
        ["Homophone", "IDENTICAL", "DIFFERENT", "DIFFERENT", "Right (correct) vs Write (mark paper)"],
        ["Homograph", "CAN BE DIFFERENT", "IDENTICAL", "DIFFERENT", "Tear (/tɪər/ eye drop) vs Tear (/tɛər/ rip)"],
        ["Homonym", "IDENTICAL", "IDENTICAL", "DIFFERENT", "Bank (financial) vs Bank (river bank)"],
        ["Heteronym", "DIFFERENT", "IDENTICAL", "DIFFERENT", "Bass (/beɪs/ instrument) vs Bass (/bæs/ fish)"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Three-Way Confusing Homophones Matrix",
      headers: ["Target Trio", "Form 1: Meaning & Example", "Form 2: Meaning & Example", "Form 3: Meaning & Example"],
      rows: [
        ["Cite / Sight / Site", "Cite (Verb): Quote as evidence ('He cited a law')", "Sight (Noun): Faculty of vision ('a grand sight')", "Site (Noun): Location of land ('construction site')"],
        ["Right / Rite / Write", "Right (Adj/Noun): Correct, entitlement ('my right')", "Rite (Noun): Sacred ceremony ('funeral rites')", "Write (Verb): Pen down words ('write an essay')"],
        ["Rain / Reign / Rein", "Rain (Noun): Water from clouds ('heavy rain')", "Reign (Noun/Verb): Rule of monarch ('in his reign')", "Rein (Noun): Leather strap for horse ('tighten reined')"],
        ["Vain / Vane / Vein", "Vain (Adj): Conceited; useless ('in vain')", "Vane (Noun): Wind direction pointer ('weather vane')", "Vein (Noun): Blood vessel in body ('jugular vein')"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Fill in the blank with the correct word: 'The bus collided with a ________ truck parked on the road.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) stationery",
        "B) stationary",
        "C) stationer",
        "D) stationar"
      ],
      correctAnswer: "B) stationary",
      explanation: "'Stationary' (with an 'a') is an adjective meaning not moving, motionless, or at rest. 'Stationery' (with an 'e') refers to writing materials like envelopes, paper, and pens. A parked truck is motionless, so 'stationary' is correct."
    },
    {
      question: "Choose the correct word to complete the sentence: 'The heavy flood will adversely ________ the kharif crops.' [CG Vyapam Patwari Exam]",
      options: [
        "A) effect",
        "B) affect",
        "C) infect",
        "D) defect"
      ],
      correctAnswer: "B) affect",
      explanation: "The modal auxiliary 'will' followed by the adverb 'adversely' requires a base verb (V1). 'Affect' is the verb meaning to influence or produce a harmful change. 'Effect' is primarily a noun meaning the result or consequence."
    },
    {
      question: "Fill in the blank: 'Our college ________ addressed the annual function.' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) principle",
        "B) principal",
        "C) princepal",
        "D) principel"
      ],
      correctAnswer: "B) principal",
      explanation: "'Principal' (ending in -pal) refers to the head of an educational institution. 'Principle' (ending in -ple) refers to a fundamental moral rule, law, or doctrine."
    },
    {
      question: "Select the correct word: 'The party workers went door-to-door to ________ for votes.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) canvas",
        "B) canvass",
        "C) converse",
        "D) confess"
      ],
      correctAnswer: "B) canvass",
      explanation: "'Canvass' (spelled with double 's') is a verb meaning to solicit votes, orders, or opinions from people. 'Canvas' (with single 's') is a heavy coarse cloth used for tents and paintings."
    },
    {
      question: "Fill in the blank: 'Dark clouds gather in the sky; rain seems ________.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) eminent",
        "B) imminent",
        "C) prominent",
        "D) permanent"
      ],
      correctAnswer: "B) imminent",
      explanation: "'Imminent' means about to happen very soon or impending (such as an approaching storm). 'Eminent' means distinguished, famous, and respected (like an eminent doctor)."
    },
    {
      question: "Choose the correct sentence: [CG Vyapam ADEO Exam]",
      options: [
        "A) She gave me a nice complement on my presentation.",
        "B) She gave me a nice compliment on my presentation.",
        "C) She gave me a nice complimant on my presentation.",
        "D) She gave me a nice complemant on my presentation."
      ],
      correctAnswer: "B) She gave me a nice compliment on my presentation.",
      explanation: "A 'compliment' (with 'i') is an expression of praise, admiration, or congratulation. A 'complement' (with 'e') is something that completes or brings to perfection."
    }
  ],
  mcqs: [
    {
      question: "Fill in the blank: 'The doctor advised him to take a five-day ________ of antibiotics.'",
      options: [
        "A) coarse",
        "B) course",
        "C) corse",
        "D) curse"
      ],
      correctAnswer: "B) course",
      explanation: "A 'course' of medicine refers to a prescribed duration or regimen of treatment. 'Coarse' means rough or crude in texture."
    },
    {
      question: "Complete the sentence: 'The lawyer cited an old ________ from the Supreme Court.'",
      options: [
        "A) site",
        "B) sight",
        "C) cite",
        "D) precedent"
      ],
      correctAnswer: "D) precedent",
      explanation: "The verb 'cited' requires a noun object. A legal case cited as an authority is a 'precedent'. (Note: If testing cite/sight/site, 'The lawyer inspected the building site')."
    },
    {
      question: "Fill in the blank: 'He was so tired that he could barely keep his eyes ________.'",
      options: [
        "A) open",
        "B) bare",
        "C) bear",
        "D) beer"
      ],
      correctAnswer: "A) open",
      explanation: "Contextually, keeping eyes 'open' is standard English. Between 'bare' (naked/uncovered) and 'bear' (endure/animal), 'bare feet' uses 'bare'."
    },
    {
      question: "Choose the correct homophone: 'I need to buy some notebooks and envelopes from the ________ shop.'",
      options: [
        "A) stationary",
        "B) stationery",
        "C) stationer",
        "D) station"
      ],
      correctAnswer: "B) stationery",
      explanation: "Writing materials, notebooks, and envelopes are called 'stationery' (with 'e' for envelope and pen)."
    },
    {
      question: "Fill in the blank: 'A disciplined soldier must ________ the command of his superior.'",
      options: [
        "A) adopt",
        "B) adapt",
        "C) obey",
        "D) adept"
      ],
      correctAnswer: "C) obey",
      explanation: "A soldier must 'obey' commands. In the triad adapt/adopt/adept: 'adapt' = adjust; 'adopt' = choose/embrace; 'adept' = expert."
    },
    {
      question: "Select the correct word: 'After a sumptuous dinner, we were served chocolate ice-cream for ________.'",
      options: [
        "A) desert",
        "B) dessert",
        "C) desertion",
        "D) decert"
      ],
      correctAnswer: "B) dessert",
      explanation: "The sweet dish eaten at the end of a meal is 'dessert' (double 's'). A dry arid land with sand is a 'desert' (single 's')."
    },
    {
      question: "Fill in the blank: 'Be careful not to ________ your admit card before the exam.'",
      options: [
        "A) loose",
        "B) lose",
        "C) loss",
        "D) lost"
      ],
      correctAnswer: "B) lose",
      explanation: "'Lose' is a verb meaning to misplace or be deprived of. 'Loose' is an adjective meaning not tight or unfastened."
    },
    {
      question: "Choose the appropriate word: 'The Governor has given his ________ to the Panchayat Bill.'",
      options: [
        "A) ascent",
        "B) assent",
        "C) accent",
        "D) account"
      ],
      correctAnswer: "B) assent",
      explanation: "'Assent' means official agreement or sanction. 'Ascent' means a climb or upward movement. 'Accent' refers to a mode of pronunciation."
    }
  ],
  keyTerminology: [
    {
      term: "Homophone",
      definition: "A word that has the same sound and pronunciation as another word, but differs in spelling, origin, and meaning."
    },
    {
      term: "Homograph",
      definition: "A word of identical written form (spelling) as another, but possessing a different origin, meaning, and often pronunciation."
    },
    {
      term: "Homonym",
      definition: "A word that shares both identical pronunciation and identical spelling with another word, but has an unrelated meaning."
    },
    {
      term: "Heteronym",
      definition: "A homograph that is pronounced differently from another word with the same spelling (e.g., tear /tɪər/ vs tear /tɛər/)."
    },
    {
      term: "Orthography",
      definition: "The conventional spelling system of a language, mastery of which is required to differentiate homophones."
    },
    {
      term: "Contextual Clue",
      definition: "Information in the surrounding sentence or passage that enables the reader to deduce which specific homophone is appropriate."
    },
    {
      term: "Mnemonic",
      definition: "A memory device or verbal association trick designed to assist in retaining difficult spellings and semantic distinctions."
    },
    {
      term: "Collocational Compatibility",
      definition: "The natural grammatical tendency of certain words to occur together (e.g., 'stationary vehicle', 'stationery shop')."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapter on 'Words Often Confused' detailing homophone distinctions and paired exercise sentences."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Comprehensive analysis of confusing pairs like affect/effect, alternate/alternative, and classic spelling traps."
    },
    {
      title: "Word Power Made Easy",
      author: "Norman Lewis",
      details: "Techniques for distinguishing homophonic roots and improving orthographic precision."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Analysis of confusing words and homophone questions from 2014 to 2024 Vyapam examinations."
    }
  ],
  confusionBuster: [
    {
      concept: "Stationary vs Stationery",
      confusion: "Confusing writing materials with motionless vehicles.",
      clarity: "Remember: Station**E**ry has **E** for **E**nvelopes and p**E**ns. Station**A**ry has **A** for **A**t rest (standing still)."
    },
    {
      concept: "Principal vs Principle",
      confusion: "Writing 'the principle of our college' or 'scientific principals'.",
      clarity: "Princip**LE** ends in **LE** like ru**LE** (scientific or moral rule). Princip**AL** is the **AL**l-powerful head of the school or the main sum."
    },
    {
      concept: "Affect vs Effect",
      confusion: "Swapping the verb with the noun in sentences.",
      clarity: "**A**ffect is the **A**ction (Verb: 'Climate change affects crops'). **E**ffect is the **E**nd result (Noun: 'The greenhouse effect')."
    },
    {
      concept: "Compliment vs Complement",
      confusion: "Using 'compliment' for items that complete each other.",
      clarity: "Compl**I**ment with an **I** is for **I** admiring you (praise). Compl**E**ment with an **E** is for compl**E**ting the set."
    },
    {
      concept: "Loose vs Lose",
      confusion: "Writing 'Do not loose your admit card'.",
      clarity: "**Loose** (rhymes with goose) is an adjective meaning not tight (*loose shirt*). **Lose** (rhymes with choose) is a verb meaning to misplace or suffer defeat."
    }
  ],
  faqList: [
    {
      question: "Why does the English language have so many homophones?",
      answer: "English borrowed heavily from Old English, Norman French, Latin, and Greek. Over centuries, vowels and consonants underwent historical sound shifts (such as the Great Vowel Shift), resulting in words from different roots acquiring identical pronunciations while retaining original spellings."
    },
    {
      question: "Can 'Effect' ever be used as a verb?",
      answer: "Yes, but only in formal English meaning 'to bring about' or 'to cause to happen' (e.g., 'The new commissioner effected sweeping administrative reforms'). In 95% of Vyapam questions, 'Affect' is the verb and 'Effect' is the noun."
    },
    {
      question: "What is the difference between 'Desert' and 'Dessert'?",
      answer: "'Desert' (one 's') is an arid barren sandy land (e.g., Sahara), or as a verb means to abandon. 'Dessert' (double 's') is the sweet treat eaten after dinner."
    },
    {
      question: "How can I remember the difference between 'Eminent' and 'Imminent'?",
      answer: "'Eminent' starts with 'E' like **E**steemed or **E**xcellent (a famous person). 'Imminent' starts with 'Im' like **Im**pending (an event arriving immediately)."
    },
    {
      question: "What is the difference between 'Judicial' and 'Judicious'?",
      answer: "'Judicial' relates strictly to the judiciary and courts of law (e.g., 'judicial inquiry'). 'Judicious' means wise, sensible, and having good judgment (e.g., 'a judicious decision')."
    }
  ],
  oneLinerRevision: [
    "Homophones share identical pronunciation but differ completely in spelling and meaning.",
    "StationEry (with E) = Writing materials; StationAry (with A) = Not moving (At rest).",
    "PrincipLE (with LE) = Rule or moral doctrine; PrincipAL = Head of an institution.",
    "Affect is a Verb (to influence); Effect is a Noun (the result or consequence).",
    "ComplIment (with I) = Expression of praise; ComplEment (with E) = Completes the set.",
    "Canvass (double s) = Solicit votes; Canvas (single s) = Heavy cloth for tents and sails.",
    "Imminent = Impending / about to happen; Eminent = Famous and distinguished.",
    "Loose = Not tight (loose pants); Lose = To misplace or suffer defeat.",
    "Council = Administrative committee; Counsel = Legal advice or lawyer.",
    "Dessert (double s) = Sweet course after a meal; Desert (single s) = Arid sandy land."
  ],
  rapidRevision: {
    points: [
      "Definition: Same Sound + Different Spelling + Different Meaning.",
      "Mnemonics: StationEry (Envelope/Eraser); PrincipLE (ruLE); DesSErt (Sweet Stuff).",
      "Action vs Result: Affect = Verb (influence); Effect = Noun (outcome).",
      "Praise vs Complete: Compliment (praise); Complement (complete).",
      "Politics vs Fabric: Canvass (solicit votes); Canvas (heavy cloth).",
      "Legal vs Wise: Judicial (court-related); Judicious (wise/sensible).",
      "Motionless vs Goods: Stationary (at rest); Stationery (office supplies)."
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
