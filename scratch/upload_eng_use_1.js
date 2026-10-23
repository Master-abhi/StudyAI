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
  id: "cgv_master_eng_use_1",
  topicId: "eng_use_1",
  chapterId: "cgv_master_sub_6_ch_10",
  subjectId: "cgv_master_sub_6",
  title: "Confusing Words",
  subtitle: "Master Guide to Paronyms, Subtle Word Distinctions & Contextual Usage for CG Vyapam",
  overview: {
    introduction: "Confusing Words (also known linguistically as Paronyms or Words Often Confused) comprise pairs, triplets, or clusters of English words that are easily confused and erroneously interchanged due to slight resemblances in spelling, identical or close phonetic pronunciation, shared morphological roots, or overlapping semantic spheres. Unlike exact homophones (which sound 100% identical, such as 'right' and 'write'), confusing words often possess slight pronunciation differences or share the same root but diverge sharply in meaning and usage through distinct suffixes (e.g., 'sensible' vs 'sensitive', 'economic' vs 'economical', 'historic' vs 'historical', 'continual' vs 'continuous', 'disinterested' vs 'uninterested'). In competitive examinations, examiners utilize confusing words to evaluate whether a candidate possesses lexical refinement, semantic precision, and the critical ability to choose the exact word required in professional and administrative governance.",
    importance: "Confusing words are a perennial highlight of the General English syllabus in all CG Vyapam recruitment exams, including Hostel Warden, Patwari, Revenue Inspector (RI), Sub Inspector (SI), ADEO, and Assistant Teacher exams. A typical CG Vyapam question paper features between 2 to 4 questions involving confusing word pairs in the form of fill-in-the-blanks, sentence improvement, cloze passages, and error detection. Mastering these nuanced distinctions prevents severe loss of marks caused by hasty guesswork.",
    examRelevance: "CG Vyapam questions on Confusing Words focus on: (1) Classic high-frequency pairs with crucial administrative implications (e.g., *disinterested* [impartial/unbiased] vs *uninterested* [bored/indifferent]; *official* vs *officious*; *judicial* vs *judicious*); (2) Time-aspect pairs (*continual* [recurring with pauses] vs *continuous* [unbroken without pause]); (3) Historical importance pairs (*historic* [momentous/famous in history] vs *historical* [pertaining to history]); (4) Finance and thrift pairs (*economic* [relating to economy] vs *economical* [thrifty/saving money]); (5) Triplet clusters (*credible, creditable, credulous*).",
    quickFacts: [
      { label: "Core Nature", value: "Words differing slightly in spelling, sound, or suffixes that convey distinct meanings" },
      { label: "Disinterested vs Uninterested", value: "Disinterested = Impartial and unbiased (like a judge); Uninterested = Bored and not interested" },
      { label: "Continual vs Continuous", value: "Continual = Happening repeatedly with intervals; Continuous = Non-stop without any break" },
      { label: "Historic vs Historical", value: "Historic = Famous or momentous in history; Historical = Dealing with the past / history" },
      { label: "Economic vs Economical", value: "Economic = Related to the economy or trade; Economical = Thrifty and avoiding waste" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Anatomy of Confusing Words & The Four Causes of Lexical Confusion",
      content: `### 1. What Are Confusing Words (Paronyms)?
Paronyms are words that are derived from the same root word, but have taken on distinct suffixes that radically change their meanings:
- *Root: Sense*
  - **Sensible**: Having or showing good judgment; practical, wise.
  - **Sensitive**: Easily hurt, delicate, or responsive to external stimuli.
  - **Sensual**: Pertaining to physical or carnal gratification of the senses.

---

### 2. The Four Primary Causes of Lexical Confusion
1. **Suffix Divergence from a Common Root**:
   - Two adjectives formed from the same noun often develop specialized meanings:
     - *Industry* -> **Industrial** (relating to manufacturing) vs **Industrious** (hardworking, diligent).
     - *History* -> **Historic** (momentous, landmark) vs **Historical** (belonging to past history).
2. **Deceptive Negative Prefixes**:
   - The prefixes *dis-* and *un-* create entirely different meanings:
     - **Disinterested**: Free from personal self-interest; objective, neutral, impartial.
     - **Uninterested**: Lacking interest; bored, indifferent, unconcerned.
3. **Temporal Frequency vs Continuity**:
   - Distinguishing whether an action occurs repeatedly with pauses or non-stop:
     - **Continual**: Repeated frequently with interruptions (*continual phone calls*).
     - **Continuous**: Flowing without any interruption whatsoever (*continuous rain for 12 hours*).
4. **Subtle Connotational Shifts**:
   - **Childlike** (pure, trusting, innocent — positive) vs **Childish** (immature, silly, petulant — negative).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: High-Yield Confusing Words Bank: Group A to D",
      content: `### 1. High-Frequency Pairs (A to C)
1. **Alternate vs Alternative**:
   - **Alternate** *(Adjective / Verb)*: Every other; happening by turns (e.g., Monday, Wednesday, Friday).
     - *Example:* The doctor visits the rural clinic on **alternate** days.
   - **Alternative** *(Noun / Adjective)*: Another choice or course of action available among options.
     - *Example:* Renewable energy is a sustainable **alternative** to fossil fuels.

2. **Amiable vs Amicable**:
   - **Amiable** *(Adjective)*: Having or displaying a friendly, pleasant, and lovable manner (said of **persons**).
     - *Example:* Our new colleague is an **amiable** gentleman who gets along with everyone.
   - **Amicable** *(Adjective)*: Characterized by friendliness and absence of discord (said of **relations, agreements, settlements**).
     - *Example:* The boundary dispute between the two villages was settled in an **amicable** manner.

3. **Childish vs Childlike**:
   - **Childish** *(Adjective - Negative)*: Immature, silly, petulant, and inappropriate for an adult.
     - *Example:* Throwing tantrums when decisions go against you is thoroughly **childish** behavior.
   - **Childlike** *(Adjective - Positive)*: Having the innocent, pure, trusting, and simple qualities of a child.
     - *Example:* The old poet retained a **childlike** wonder for nature throughout his life.

4. **Comprehensive vs Comprehensible**:
   - **Comprehensive** *(Adjective)*: Including or dealing with all or nearly all elements or aspects of something; wide-ranging, exhaustive.
     - *Example:* This portal provides a **comprehensive** syllabus for CG Vyapam exams.
   - **Comprehensible** *(Adjective)*: Able to be understood; intelligible, clear.
     - *Example:* His English lecture was clear and easily **comprehensible** to all students.

5. **Continual vs Continuous**:
   - **Continual** *(Adjective)*: Recurring frequently with brief interruptions or pauses.
     - *Example:* His speech was interrupted by **continual** bursts of applause.
   - **Continuous** *(Adjective)*: Unbroken, uninterrupted, and ongoing without any pause or cessation.
     - *Example:* The city witnessed twenty-four hours of **continuous** downpour.

6. **Credible vs Creditable vs Credulous** (Super High-Yield Triplet!):
   - **Credible** *(Adjective)*: Able to be believed; convincing, trustworthy.
     - *Example:* The witness provided a highly **credible** account of the accident.
   - **Creditable** *(Adjective)*: Deserving public praise, honor, or commendation.
     - *Example:* The young athlete put up a **creditable** performance in the national finals.
   - **Credulous** *(Adjective)*: Too ready to believe things; gullible, easily deceived.
     - *Example:* A **credulous** person easily falls prey to online financial frauds.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: High-Yield Confusing Words Bank: Group E to J",
      content: `### 1. High-Frequency Pairs (E to H)
7. **Economic vs Economical**:
   - **Economic** *(Adjective)*: Relating to the economy, finance, trade, or industry of a country.
     - *Example:* The government announced major **economic** reforms to stimulate investment.
   - **Economical** *(Adjective)*: Giving good value or return in relation to money, time, or effort; thrifty, avoiding waste.
     - *Example:* Small electric vehicles are remarkably **economical** for daily urban commuting.

8. **Effective vs Efficacious vs Efficient**:
   - **Effective** *(Adjective)*: Successful in producing a desired or intended result.
     - *Example:* Strict police patrolling proved **effective** in curbing street crime.
   - **Efficacious** *(Adjective)*: Typically applied to medicines, treatments, or remedies: producing the desired cure.
     - *Example:* Ayurvedic herbs are highly **efficacious** in treating chronic digestive disorders.
   - **Efficient** *(Adjective)*: Achieving maximum productivity with minimum wasted effort, time, or resources.
     - *Example:* An **efficient** civil servant manages administrative files promptly.

9. **Historic vs Historical**:
   - **Historic** *(Adjective)*: Famous or important in history; having a momentous impact on history.
     - *Example:* The signing of the Indian Constitution in 1950 was a **historic** occasion.
   - **Historical** *(Adjective)*: Belonging to the past; based on real events in history; dealing with history.
     - *Example:* The professor conducted extensive **historical** research on the Kalachuri dynasty.

10. **Human vs Humane**:
    - **Human** *(Adjective / Noun)*: Relating to or characteristic of humankind.
      - *Example:* To err is **human**, to forgive divine.
    - **Humane** *(Adjective)*: Having or showing compassion, kindness, and benevolence towards people or animals.
      - *Example:* Captive zoo animals must be treated in a **humane** manner.

---

### 2. High-Frequency Pairs (I to J)
11. **Industrial vs Industrious**:
    - **Industrial** *(Adjective)*: Relating to manufacturing, industry, or factories.
      - *Example:* Bhilai is the primary **industrial** and steel hub of Chhattisgarh.
    - **Industrious** *(Adjective)*: Diligent, hardworking, and conscientious in work.
      - *Example:* An **industrious** student will always overcome academic hurdles.

12. **Ingenious vs Ingenuous**:
    - **Ingenious** *(Adjective)*: Clever, original, inventive, and resourceful (said of ideas, inventions, minds).
      - *Example:* The village mechanic designed an **ingenious** device to pump irrigation water.
    - **Ingenuous** *(Adjective)*: Innocent, unsuspecting, artless, naive, and candid.
      - *Example:* The child asked an **ingenuous** question that made the audience smile.

13. **Judicial vs Judicious**:
    - **Judicial** *(Adjective)*: Relating to the administration of justice, courts of law, or judges.
      - *Example:* The High Court ordered a **judicial** inquiry into the custodial incident.
    - **Judicious** *(Adjective)*: Having, showing, or done with good sense and wisdom; prudent, sensible.
      - *Example:* A **judicious** allocation of revision time guarantees high scores.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: High-Yield Confusing Words Bank: Group L to Z",
      content: `### 1. High-Frequency Pairs (L to O)
14. **Luxuriant vs Luxurious**:
    - **Luxuriant** *(Adjective)*: Growing thickly and strongly; rich, lush, and abundant in growth (said of vegetation, hair).
      - *Example:* Bastar is endowed with **luxuriant** sal and teak forests.
      - *Example:* She has long, **luxuriant** black hair.
    - **Luxurious** *(Adjective)*: Extremely comfortable, elegant, or expensive; marked by luxury.
      - *Example:* The delegates stayed at a **luxurious** five-star hotel in Naya Raipur.

15. **Official vs Officious**:
    - **Official** *(Adjective / Noun)*: Relating to an authority or public duty; formal, authorized.
      - *Example:* The district magistrate issued an **official** notification regarding the holiday.
    - **Officious** *(Adjective)*: Asserting authority in an annoyingly domineering or meddlesome way; intrusive.
      - *Example:* The **officious** peon unnecessarily harassed citizens waiting in the queue.

---

### 2. High-Frequency Pairs (S to Z)
16. **Sensible vs Sensitive vs Sensual**:
    - **Sensible** *(Adjective)*: Possessing good practical sense and sound judgment; reasonable, wise.
      - *Example:* It is **sensible** to carry an umbrella during the monsoon season.
    - **Sensitive** *(Adjective)*: Quick to detect or respond to slight changes, signals, or emotions; delicate, touchy.
      - *Example:* Photographic film is extremely **sensitive** to light.
      - *Example:* Do not mention his past failure; he is very **sensitive** about it.
    - **Sensual** *(Adjective)*: Relating to physical or sexual gratification; bodily pleasure.

17. **Temporal vs Temporary**:
    - **Temporal** *(Adjective)*: Relating to worldly or earthly affairs as opposed to spiritual affairs; or relating to time.
      - *Example:* Religious monks renounce **temporal** power in pursuit of spiritual liberation.
    - **Temporary** *(Adjective)*: Lasting for only a limited period of time; not permanent.
      - *Example:* He was appointed as a **temporary** administrative assistant.

18. **Tolerable vs Tolerant**:
    - **Tolerable** *(Adjective)*: Able to be endured; fairly good, passable, mediocre.
      - *Example:* The pain was severe, but with analgesics it became **tolerable**.
    - **Tolerant** *(Adjective)*: Showing willingness to allow the existence of opinions or behavior one does not necessarily agree with; open-minded.
      - *Example:* Indian civilizational ethos is inherently **tolerant** of diverse religious paths.

19. **Veracity vs Voracity**:
    - **Veracity** *(Noun)*: Conformity to facts; truthfulness, accuracy.
      - *Example:* Officials questioned the **veracity** of the contractor's claims.
    - **Voracity** *(Noun)*: Extreme hunger; ravenousness; insatiable greed for food or reading.
      - *Example:* The young scholar read encyclopedias with remarkable **voracity**.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Deep Dive: Disinterested vs Uninterested & The 'Impartiality' Rule",
      content: `### 1. The Classic 'Disinterested' vs 'Uninterested' Trap
This is undoubtedly the most celebrated vocabulary distinction in competitive examinations:

#### A. Disinterested (The Impartial Judge):
- **Meaning:** Having no personal stake, financial interest, or private bias in the outcome; completely neutral, objective, and impartial.
- *Etymology:* 'Dis-' (apart / free from) + 'interested' (having a vested financial or personal interest).
- *Ideal Collocations:* **a disinterested judge, a disinterested observer, disinterested advice, a disinterested arbitrator**.
  - *Example:* A judge must be completely **disinterested** in the trial over which he presides. (Meaning: he must not have a personal or financial interest in who wins).
  - *Example:* We sought **disinterested** advice from an independent financial auditor.

#### B. Uninterested (The Bored Spectator):
- **Meaning:** Having or showing no interest, concern, or enthusiasm; bored, indifferent, apathetic.
- *Ideal Collocations:* **uninterested in sports, uninterested in studies, totally uninterested**.
  - *Example:* The child was completely **uninterested** in classical music and wanted to play video games.
  - *Example:* He seemed **uninterested** in the lecture and kept staring out of the window.

---

### 2. Diagnostic Substitution Test for the Exam Hall
When choosing between *disinterested* and *uninterested* in a sentence:
1. Replace the word with **'impartial / unbiased'**. If the sentence makes sense, the answer is **DISINTERESTED**.
   - *Test:* 'We need an (impartial) mediator.' -> Correct! Use **disinterested**.
2. Replace the word with **'bored / not interested'**. If the sentence makes sense, the answer is **UNINTERESTED**.
   - *Test:* 'He was (bored) by the movie.' -> Correct! Use **uninterested**.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master Discrimination Matrix of Top Confusing Word Pairs",
      headers: ["Confusing Word Pair", "Word A: Meaning & Usage", "Word B: Meaning & Usage", "Contrasting Sentence Demonstration"],
      rows: [
        ["Disinterested vs Uninterested", "Disinterested (Adj): Impartial, unbiased", "Uninterested (Adj): Bored, indifferent", "A disinterested judge decided the case, while the uninterested public slept."],
        ["Economic vs Economical", "Economic (Adj): Pertaining to the economy", "Economical (Adj): Thrifty, avoiding waste", "Sound economic policy encourages economical manufacturing practices."],
        ["Historic vs Historical", "Historic (Adj): Momentous, famous in history", "Historical (Adj): Pertaining to past history", "India won a historic victory in 1971, recorded in historical archives."],
        ["Continual vs Continuous", "Continual (Adj): Recurring with pauses", "Continuous (Adj): Unbroken without any pause", "Continual telephone rings disturbed his eight hours of continuous sleep."],
        ["Childlike vs Childish", "Childlike (Adj): Innocent, trusting (Positive)", "Childish (Adj): Immature, silly (Negative)", "Her childlike innocence stood in contrast to his childish anger."],
        ["Amiable vs Amicable", "Amiable (Adj): Friendly person (Person)", "Amicable (Adj): Peaceful settlement (Relation)", "The amiable collector facilitated an amicable border settlement."],
        ["Industrial vs Industrious", "Industrial (Adj): Related to factories/industry", "Industrious (Adj): Diligent, hardworking", "Bhilai's industrial boom was driven by industrious local workers."],
        ["Ingenious vs Ingenuous", "Ingenious (Adj): Clever, inventive, brilliant", "Ingenuous (Adj): Innocent, naive, artless", "The ingenious engineer solved the problem, pleasing the ingenuous villagers."],
        ["Judicial vs Judicious", "Judicial (Adj): Court/justice related", "Judicious (Adj): Wise, prudent, sensible", "The judge made a judicious decision during the judicial proceedings."],
        ["Luxuriant vs Luxurious", "Luxuriant (Adj): Lush, abundant vegetation", "Luxurious (Adj): Expensive, comfortable", "The luxurious resort was built amidst luxuriant green forests."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Confusing Suffix Triplet Formations Cheat Sheet",
      headers: ["Root / Base", "Form 1: Meaning & Part of Speech", "Form 2: Meaning & Part of Speech", "Form 3: Meaning & Part of Speech"],
      rows: [
        ["Cred- (Belief)", "Credible: Believable / convincing", "Creditable: Deserving praise / honorable", "Credulous: Gullible / too ready to believe"],
        ["Sens- (Feel/Sense)", "Sensible: Wise / practical judgment", "Sensitive: Delicate / easily affected", "Sensual: Pertaining to bodily pleasures"],
        ["Effect- (Outcome)", "Effective: Producing desired result", "Efficacious: Curing illness (medicine)", "Efficient: Working with zero waste"],
        ["Alter- (Other)", "Alternate: Every second one in turn", "Alternative: A choice between two", "Alteration: A physical change or modification"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Historic vs Historical Contextual Usage Matrix",
      headers: ["Context / Collocation", "Mandatory Correct Word", "Incorrect Exam Temptation", "Underlying Linguistic Rationale"],
      rows: [
        ["A landmark national event (e.g., 15 August 1947)", "Historic day", "Historical day (INCORRECT)", "Momentous, famous event creating history"],
        ["A scholarly book about ancient India", "Historical novel / book", "Historic novel (INCORRECT)", "Deals with the past/history as subject matter"],
        ["A monument preserved by archaeology", "Historical monument", "Historic monument", "Belongs to past history (both accepted, historical preferred)"],
        ["A watershed treaty ending a world war", "Historic treaty", "Historical treaty (INCORRECT)", "Monumental agreement that transformed history"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Choose the correct word: 'A judge must decide a case with a ________ mind.' [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) uninterested",
        "B) disinterested",
        "C) interesting",
        "D) disinterest"
      ],
      correctAnswer: "B) disinterested",
      explanation: "'Disinterested' means impartial, unbiased, and having no personal or financial stake in the outcome. A judge must always be 'disinterested'. 'Uninterested' means bored or apathetic."
    },
    {
      question: "Fill in the blank: 'Small cars are more ________ than large luxury sports utility vehicles.' [CG Vyapam Patwari Exam]",
      options: [
        "A) economic",
        "B) economical",
        "C) economics",
        "D) economize"
      ],
      correctAnswer: "B) economical",
      explanation: "'Economical' means thrifty, giving good value for money, and inexpensive to operate. 'Economic' relates to the economy or financial system of a country."
    },
    {
      question: "Select the correct word: 'The launch of Chandrayaan-3 was a ________ event for Indian science.' [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) historical",
        "B) historic",
        "C) historian",
        "D) historicity"
      ],
      correctAnswer: "B) historic",
      explanation: "'Historic' means momentous, memorable, and having a lasting impact on history. 'Historical' merely means belonging to the past."
    },
    {
      question: "Choose the appropriate word: 'The heavy rain was ________; it poured without a break for twelve hours.' [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) continual",
        "B) continuous",
        "C) continuing",
        "D) continuity"
      ],
      correctAnswer: "B) continuous",
      explanation: "'Continuous' means unbroken and continuing without any interruption or pause. 'Continual' means occurring repeatedly with intervals."
    },
    {
      question: "Fill in the blank: 'Her ________ innocence won the affection of all villagers.' [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) childish",
        "B) childlike",
        "C) childly",
        "D) childhood"
      ],
      correctAnswer: "B) childlike",
      explanation: "'Childlike' has a positive connotation, describing innocent, pure, and trusting qualities. 'Childish' has a negative connotation meaning immature or petulant."
    },
    {
      question: "Choose the correct word: 'The Bastar plateau is covered with ________ sal and bamboo forests.' [CG Vyapam ADEO Exam]",
      options: [
        "A) luxurious",
        "B) luxuriant",
        "C) luxury",
        "D) luxuriance"
      ],
      correctAnswer: "B) luxuriant",
      explanation: "'Luxuriant' refers to rich, lush, and abundant plant growth or hair. 'Luxurious' refers to expensive comfort and lavish lifestyle."
    }
  ],
  mcqs: [
    {
      question: "Fill in the blank: 'The dispute was settled in an ________ manner through mutual discussions.'",
      options: [
        "A) amiable",
        "B) amicable",
        "C) amenity",
        "D) amity"
      ],
      correctAnswer: "B) amicable",
      explanation: "'Amicable' describes peaceful and friendly agreements, treaties, or relationships. 'Amiable' describes a pleasant, warm person."
    },
    {
      question: "Select the word for someone who is too ready to believe anything without proof:",
      options: [
        "A) Credible",
        "B) Creditable",
        "C) Credulous",
        "D) Incredible"
      ],
      correctAnswer: "C) Credulous",
      explanation: "'Credulous' means gullible and too willing to believe things. 'Credible' means believable; 'Creditable' means deserving praise."
    },
    {
      question: "Complete the sentence: 'The peon's ________ behavior annoyed everyone in the waiting room.'",
      options: [
        "A) official",
        "B) officious",
        "C) officer",
        "D) officiate"
      ],
      correctAnswer: "B) officious",
      explanation: "'Officious' means domineering, meddlesome, and intrusively self-important. 'Official' relates to authorized public duty."
    },
    {
      question: "Choose the correct word: 'A ________ allocation of state funds prevented financial deficit.'",
      options: [
        "A) judicial",
        "B) judicious",
        "C) judiciary",
        "D) judgment"
      ],
      correctAnswer: "B) judicious",
      explanation: "'Judicious' means wise, sensible, and showing good judgment. 'Judicial' relates to courts of law."
    },
    {
      question: "Fill in the blank: 'The student was completely ________ in the subject and failed to attend lectures.'",
      options: [
        "A) disinterested",
        "B) uninterested",
        "C) interested",
        "D) uninteresting"
      ],
      correctAnswer: "B) uninterested",
      explanation: "'Uninterested' means having no interest, feeling bored, or apathetic toward a subject."
    },
    {
      question: "Select the appropriate word: 'The young mechanic devised an ________ method to purify river water.'",
      options: [
        "A) ingenuous",
        "B) ingenious",
        "C) genuine",
        "D) ingenuity"
      ],
      correctAnswer: "B) ingenious",
      explanation: "'Ingenious' means clever, original, and inventive. 'Ingenuous' means innocent, naive, and simple."
    },
    {
      question: "Fill in the blank: 'The doctor advised him to adopt a ________ diet to maintain health.'",
      options: [
        "A) sensible",
        "B) sensitive",
        "C) sensational",
        "D) sensory"
      ],
      correctAnswer: "A) sensible",
      explanation: "'Sensible' means reasonable, wise, and practical. 'Sensitive' means delicate or easily hurt."
    },
    {
      question: "Choose the correct word: 'Since the main highway was blocked, we took an ________ route through the hills.'",
      options: [
        "A) alternate",
        "B) alternative",
        "C) alternation",
        "D) alternating"
      ],
      correctAnswer: "B) alternative",
      explanation: "'Alternative' means another available choice or route. 'Alternate' means every second one in sequence."
    }
  ],
  keyTerminology: [
    {
      term: "Paronym",
      definition: "A word that is a derivative of another and has a related form, but a distinct meaning (e.g., sensible / sensitive)."
    },
    {
      term: "Semantic Differentiation",
      definition: "The linguistic process through which words derived from the same base root acquire divergent, specialized meanings over time."
    },
    {
      term: "Disinterestedness",
      definition: "The ethical state of having no personal interest, bias, or financial stake in an issue; complete impartiality."
    },
    {
      term: "Connotative Divergence",
      definition: "When two near-words acquire sharply contrasting emotional overtones (e.g., childish [negative] vs childlike [positive])."
    },
    {
      term: "Temporal Aspect",
      definition: "The grammatical feature indicating how an action unfolds in time (e.g., continual [repeated with pauses] vs continuous [unbroken])."
    },
    {
      term: "Collocational Restriction",
      definition: "The established rule that certain words can only partner with specific nouns (e.g., luxuriant vegetation vs luxurious hotel)."
    },
    {
      term: "Lexical Register",
      definition: "The level of formality and academic appropriateness associated with a specific word in official administrative contexts."
    },
    {
      term: "Polysemic Paronym",
      definition: "A confusing word that carries multiple contextual definitions depending on whether it modifies persons or abstract concepts."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Comprehensive chapter on 'Words Often Confused' detailing paronyms and nuanced usage pairs."
    },
    {
      title: "Practical English Usage",
      author: "Michael Swan (Oxford University Press)",
      details: "Exhaustive discrimination between historic/historical, economic/economical, and disinterested/uninterested."
    },
    {
      title: "The King's English",
      author: "H. W. Fowler & F. G. Fowler",
      details: "Classical analysis of lexical misuse, officialese, and paronymic errors in formal writing."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Compilation of confusing words and vocabulary questions from Vyapam recruitment exams between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Disinterested vs Uninterested",
      confusion: "Treating 'disinterested' as meaning bored or not interested.",
      clarity: "**Disinterested** means **impartial and unbiased** (like a fair referee or judge). **Uninterested** means **bored and not caring** about something."
    },
    {
      concept: "Economic vs Economical",
      confusion: "Writing 'an economical policy' when referring to state finance.",
      clarity: "**Economic** relates to the **economy / finance** (*economic development*). **Economical** means **thrifty / saving money** (*an economical car*)."
    },
    {
      concept: "Historic vs Historical",
      confusion: "Calling any old book a 'historic book'.",
      clarity: "**Historic** means **famous and momentous in history** (*a historic speech*). **Historical** means **belonging to or dealing with the past** (*historical records*)."
    },
    {
      concept: "Continual vs Continuous",
      confusion: "Assuming continual and continuous are 100% interchangeable.",
      clarity: "**Continual** happens **repeatedly with interruptions** (*continual telephone calls*). **Continuous** happens **without any break whatsoever** (*continuous flow of water*)."
    },
    {
      concept: "Amiable vs Amicable",
      confusion: "Using amiable for legal agreements.",
      clarity: "**Amiable** describes a **pleasant person** (*an amiable neighbor*). **Amicable** describes a **peaceful relationship or settlement** (*an amicable divorce*)."
    }
  ],
  faqList: [
    {
      question: "Why do competitive exams focus so heavily on 'Disinterested' vs 'Uninterested'?",
      answer: "Because in modern colloquial speech, many people incorrectly use 'disinterested' to mean 'uninterested'. Competitive exams like CG Vyapam strictly enforce formal academic grammar, where 'disinterested' means unbiased and impartial."
    },
    {
      question: "What is the difference between 'Credible', 'Creditable', and 'Credulous'?",
      answer: "'Credible' means believable (a credible story). 'Creditable' means praiseworthy (a creditable effort). 'Credulous' means gullible or easily fooled (a credulous person)."
    },
    {
      question: "When should we use 'Alternate' instead of 'Alternative'?",
      answer: "Use 'Alternate' when referring to every second item in a rotational sequence (e.g., 'he works on alternate days: Mon, Wed, Fri'). Use 'Alternative' when referring to another available option or choice."
    },
    {
      question: "Can 'Sensible' ever mean 'sensitive to touch'?",
      answer: "No. 'Sensible' relates strictly to having good sense, wisdom, and practical judgment. The ability to feel or respond to physical or emotional stimuli belongs to 'Sensitive'."
    },
    {
      question: "What is the difference between 'Veracity' and 'Voracity'?",
      answer: "'Veracity' means truthfulness and accuracy (from Latin 'verus' true). 'Voracity' means ravenous hunger or insatiable greed (from Latin 'vorare' to devour)."
    }
  ],
  oneLinerRevision: [
    "'Disinterested' means impartial and unbiased; 'Uninterested' means bored and indifferent.",
    "'Economic' relates to national finance/trade; 'Economical' means thrifty and saving money.",
    "'Historic' refers to a momentous landmark event; 'Historical' refers to past history.",
    "'Continuous' means unbroken without pause; 'Continual' means occurring repeatedly with intervals.",
    "'Childlike' describes innocent purity (positive); 'Childish' describes immature behavior (negative).",
    "'Amiable' describes a friendly person; 'Amicable' describes a peaceful agreement.",
    "'Industrial' relates to factories; 'Industrious' means hardworking and diligent.",
    "'Ingenious' means clever and inventive; 'Ingenuous' means simple, naive, and candid.",
    "'Judicious' means wise and prudent; 'Judicial' relates to courts of law.",
    "'Luxuriant' describes thick, lush growth; 'Luxurious' describes lavish comfort and wealth."
  ],
  rapidRevision: {
    points: [
      "Definition: Paronyms share common roots but have distinct suffix meanings.",
      "The Big Pair: Disinterested (impartial judge) vs Uninterested (bored spectator).",
      "Time: Continuous (unbroken non-stop) vs Continual (recurring with pauses).",
      "History: Historic (momentous landmark) vs Historical (pertaining to past history).",
      "Finance: Economic (state economy) vs Economical (thrifty/cost-effective).",
      "Roots: Ingenious (clever) vs Ingenuous (naive); Judicious (wise) vs Judicial (court)."
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
