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
  id: "cgv_master_eng_vocab_1",
  topicId: "eng_vocab_1",
  chapterId: "cgv_master_sub_6_ch_6",
  subjectId: "cgv_master_sub_6",
  title: "Synonyms",
  subtitle: "High-Yield Synonyms Bank, Root Words, Contextual Nuances & Exam Strategies for CG Vyapam",
  overview: {
    introduction: "A Synonym (derived from Greek 'syn' meaning together, and 'onoma' meaning name) is a word, morpheme, or phrase that means exactly or nearly the same as another word or phrase in a given language. In standard English, absolute synonyms (words completely interchangeable in all contexts without any shift in meaning or tone) are exceptionally rare. Instead, most words are relative or contextual synonyms that share a core denotative meaning but differ in connotation (emotional nuance), register (formal vs informal), intensity, or collocation (words that naturally pair together). The golden rule of synonym questions in competitive examinations is that a synonym MUST always belong to the same grammatical Part of Speech as the target word—a noun must be matched with a noun, an adjective with an adjective, and a verb with a verb.",
    importance: "Synonyms represent one of the heaviest-scoring and most predictable components of the English section across all CG Vyapam recruitment exams, including Hostel Warden, Patwari, Revenue Inspector (RI), Sub Inspector (SI), ADEO, and Assistant Teacher exams. Vyapam question papers feature between 2 to 4 direct synonym questions. In addition, an extensive vocabulary is indispensable for solving Reading Comprehension passages, Cloze Tests, and Sentence Improvement questions.",
    examRelevance: "CG Vyapam tests: (1) Direct identification of synonyms for classic academic and administrative words (e.g., *diligent, pragmatic, candid, meticulous, obsolete*); (2) Contextual synonyms within a sentence where words carry metaphorical or secondary meanings; (3) Elimination of trap options containing words from different parts of speech or antonyms; (4) Applying morphological root words, prefixes, and suffixes (etymology) to deduce the meaning of unfamiliar vocabulary.",
    quickFacts: [
      { label: "Part of Speech Rule", value: "Target word and its correct synonym MUST share the same part of speech (Noun <-> Noun, Adj <-> Adj)" },
      { label: "Denotation vs Connotation", value: "Denotation is literal definition; Connotation is the positive, neutral, or negative emotional coloring" },
      { label: "Collocation Constraint", value: "Synonyms may not be interchangeable if collocations clash (e.g., 'strong tea', NOT 'powerful tea')" },
      { label: "Etymology Technique", value: "Analyzing Greek/Latin prefixes (e.g., 'bene-', 'mal-', 'omni-') enables deduction of unknown words" },
      { label: "Vyapam Exam Weightage", value: "2 to 4 direct questions per paper; high multiplier effect across reading comprehension" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Nature of Synonyms, Connotations & Core Rules",
      content: `### 1. What is a Synonym?
A synonym is a word having the same or nearly the same meaning as another in the same language.
- *Target Word:* **Candid** (Adjective: frank, outspoken, sincere).
- *Synonyms:* Frank, honest, forthright, straightforward, open.

---

### 2. The Four Golden Rules for Solving Synonym Questions
1. **The Part of Speech Match Rule**:
   - The correct synonym of an **adjective** must be an **adjective**.
   - The correct synonym of a **noun** must be a **noun**.
   - The correct synonym of a **verb** must be a **verb**.
   - *Example:* The word is **Vigilance** (Noun).
     - Options: (A) Alert (Adj), (B) Watchfulness (Noun), (C) Vigilant (Adj), (D) Watchfully (Adv).
     - *Correct Answer:* **Watchfulness** (Noun matches Noun).

2. **Denotation vs Connotation**:
   - Two words may share the same primary dictionary meaning (**denotation**) but have sharply contrasting emotional tones (**connotation**):
     - *Positive Connotation:* Thrifty, economical, prudent.
     - *Negative Connotation:* Miserly, stingy, parsimonious, close-fisted.
   - If the original context is complimentary, pick the positive synonym!

3. **Contextual & Collocational Nuance**:
   - In English, words have natural partnerships (**collocations**):
     - We say *'high probability'*, not *'tall probability'*.
     - We say *'handsome salary'*, not *'pretty salary'*.
     - We say *'quick meal'*, not *'fast meal'*.
   - When words are tested in sentences, always choose the synonym that fits the contextual syntax naturally.

4. **Elimination of Antonyms**:
   - Examiners deliberately place the exact **antonym** among the options to trap hasty students who recognize the word association but misread the question heading.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: High-Yield CG Vyapam Synonyms Bank: Group A to G",
      content: `### 1. High-Frequency Words (A to C)
1. **Aberration** *(Noun)*: A departure from what is normal, usual, or expected; anomaly, irregularity, deviation, eccentricity.
   - *Example:* His sudden outburst of anger was a temporary aberration from his usual calm demeanor.
2. **Abundant** *(Adjective)*: Existing or available in large quantities; plentiful, copious, ample, profuse, lavish, bountiful.
   - *Example:* Chhattisgarh is blessed with abundant mineral and natural resources.
3. **Acumen** *(Noun)*: The ability to make good judgments and take quick decisions; shrewdness, astuteness, sharpness, perspicacity.
   - *Example:* His business acumen helped the cooperative society grow exponentially.
4. **Adulterate** *(Verb)*: Render something poorer in quality by adding another substance; contaminate, pollute, taint, debase, corrupt.
5. **Alacrity** *(Noun)*: Brisk and cheerful readiness; eagerness, willingness, enthusiasm, promptness, zeal.
   - *Example:* The clerk accepted the administrative assignment with remarkable alacrity.
6. **Amicable** *(Adjective)*: Characterized by friendliness and absence of discord; cordial, friendly, harmonious, neighborly.
7. **Anomaly** *(Noun)*: Something that deviates from standard rule or normal form; oddity, peculiarity, abnormality, inconsistency.
8. **Audacious** *(Adjective)*: Showing a willingness to take surprisingly bold risks; daring, fearless, intrepid, courageous, insolent.
9. **Benevolent** *(Adjective)*: Well-meaning and kindly; generous, charitable, altruistic, compassionate, magnanimous.
10. **Candid** *(Adjective)*: Truthful, straightforward, and frank; outspoken, forthright, sincere, blunt.
    - *Example:* The collector gave a candid appraisal of the drought situation.
11. **Capricious** *(Adjective)*: Given to sudden and unaccountable changes of mood or behavior; fickle, unpredictable, whimsical, volatile.
12. **Censure** *(Verb / Noun)*: Express severe disapproval; criticize, condemn, reprimand, rebuke, castigate, reproach.

---

### 2. High-Frequency Words (D to G)
13. **Dearth** *(Noun)*: A scarcity or lack of something; shortage, deficiency, paucity, insufficiency, famine.
    - *Example:* There is no dearth of talent among tribal youth in Bastar.
14. **Deleterious** *(Adjective)*: Causing harm or damage; harmful, detrimental, injurious, pernicious, destructive.
15. **Diligent** *(Adjective)*: Having or showing care and conscientiousness in one's work; hardworking, industrious, assiduous, painstaking, sedulous.
    - *Example:* Only diligent candidates succeed in competitive exams.
16. **Disparate** *(Adjective)*: Essentially different in kind; dissimilar, distinct, divergent, contrasting, heterogeneous.
17. **Emulate** *(Verb)*: Match or surpass a person or achievement, typically by imitation; imitate, copy, follow, mirror.
18. **Ephemeral** *(Adjective)*: Lasting for a very short time; transient, fleeting, momentary, short-lived, evanescent.
    - *Example:* Worldly fame is often ephemeral.
19. **Equivocal** *(Adjective)*: Open to more than one interpretation; ambiguous, vague, cryptic, unclear, misleading.
20. **Fastidious** *(Adjective)*: Very attentive to and concerned about accuracy and detail; meticulous, fussy, painstaking, finicky, hypercritical.
21. **Frugal** *(Adjective)*: Sparing or economical with regard to money or food; thrifty, economical, prudent, parsimonious.
22. **Garrulous** *(Adjective)*: Excessively talkative, especially on trivial matters; loquacious, voluble, chatty, verbose.
23. **Gregarious** *(Adjective)*: Fond of company; sociable, companionable, outgoing, convivial.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: High-Yield CG Vyapam Synonyms Bank: Group H to P",
      content: `### 1. High-Frequency Words (H to M)
24. **Haughty** *(Adjective)*: Arrogantly superior and disdainful; proud, conceited, vain, snobbish, supercilious.
25. **Hostile** *(Adjective)*: Unfriendly, antagonistic, or aggressive; inimical, belligerent, combative, malicious.
26. **Immaculate** *(Adjective)*: Perfectly clean, neat, or tidy; spotless, pristine, flawless, unblemished, pure.
    - *Example:* The collector had an immaculate reputation for honesty and integrity.
27. **Impetuous** *(Adjective)*: Acting or done quickly and without thought or care; rash, hasty, reckless, impulsive, precipitate.
28. **Indolent** *(Adjective)*: Wanting to avoid activity or exertion; lazy, idle, slothful, sluggish, lethargic.
29. **Inevitable** *(Adjective)*: Certain to happen; unavoidable, inescapable, inexorable, fated.
30. **Judicious** *(Adjective)*: Having, showing, or done with good sense or judgment; wise, prudent, sensible, sagacious, discerning.
31. **Laconic** *(Adjective)*: Using very few words; brief, concise, terse, succinct, pithy, curt.
    - *Example:* His laconic reply spoke volumes about his displeasure.
32. **Lucid** *(Adjective)*: Expressed clearly; easy to understand; clear, coherent, articulate, intelligible, luminous.
33. **Magnanimous** *(Adjective)*: Generous or forgiving, especially towards a rival or less powerful person; generous, noble, chivalrous, benevolent.
34. **Meticulous** *(Adjective)*: Showing great attention to detail; very careful and precise; diligent, thorough, scrupulous, conscientious.
35. **Mitigate** *(Verb)*: Make less severe, serious, or painful; alleviate, reduce, lessen, ease, assuage, mollify.
    - *Example:* Steps were taken to mitigate the impact of floods in the Mahanadi basin.

---

### 2. High-Frequency Words (N to P)
36. **Nefarious** *(Adjective)*: Wicked or criminal; villainous, evil, heinous, atrocious, iniquitous.
37. **Novice** *(Noun)*: A person new to and inexperienced in a job or situation; beginner, neophyte, tyro, apprentice, greenhorn.
38. **Obsolete** *(Adjective)*: No longer produced or used; out of date; archaic, outdated, ancient, superannuated, defunct.
    - *Example:* Typewriters have become virtually obsolete in modern offices.
39. **Ominous** *(Adjective)*: Giving the worrying impression that something bad is going to happen; threatening, foreboding, sinister, menacing.
40. **Paucity** *(Noun)*: The presence of something only in small or insufficient quantities; scarcity, dearth, shortage, deficiency.
41. **Pernicious** *(Adjective)*: Having a harmful effect, especially in a gradual or subtle way; deadly, destructive, injurious, noxious.
42. **Pragmatic** *(Adjective)*: Dealing with things sensibly and realistically; practical, realistic, hard-headed, utilitarian.
    - *Example:* We need a pragmatic approach rather than theoretical idealism.
43. **Prolific** *(Adjective)*: Producing much fruit, foliage, or many works; productive, fruitful, fertile, copious.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: High-Yield CG Vyapam Synonyms Bank: Group Q to Z",
      content: `### 1. High-Frequency Words (Q to S)
44. **Quell** *(Verb)*: Put an end to a rebellion or other disorder, typically by the use of force; suppress, crush, extinguish, subdue, stifle.
    - *Example:* The police arrived swiftly to quell the unrest.
45. **Redundant** *(Adjective)*: Not or no longer needed or useful; superfluous, surplus, excessive, unnecessary, inessential.
46. **Resilient** *(Adjective)*: Able to withstand or recover quickly from difficult conditions; tough, hardy, robust, adaptable, buoyant.
    - *Example:* The farming community proved exceptionally resilient despite the monsoon failure.
47. **Reticent** *(Adjective)*: Not revealing one's thoughts or feelings readily; reserved, uncommunicative, introverted, silent, taciturn.
48. **Sagacious** *(Adjective)*: Having or showing keen mental discernment and good judgment; wise, intelligent, shrewd, perceptive, insightful.
49. **Scrupulous** *(Adjective)*: Diligent, thorough, and extremely attentive to details; meticulous, honorable, conscientious, principled.
50. **Spurious** *(Adjective)*: Not being what it purports to be; false or fake; bogus, counterfeit, fraudulent, sham, deceptive.
    - *Example:* Spurious medicines were seized during the administrative raids.
51. **Stolid** *(Adjective)*: Calm, dependable, and showing little emotion or animation; phlegmatic, impassive, unexcitable, stoical.

---

### 2. High-Frequency Words (T to Z)
52. **Taciturn** *(Adjective)*: Reserved or uncommunicative in speech; saying little; reticent, untalkative, silent, uncommunicative.
53. **Tenacious** *(Adjective)*: Tending to keep a firm hold of something; clinging; persistent, resolute, determined, stubborn, steadfast.
54. **Transient** *(Adjective)*: Lasting only for a short time; impermanent, fleeting, temporary, ephemeral, passing.
55. **Ubiquitous** *(Adjective)*: Present, appearing, or found everywhere; omnipresent, pervasive, universal, all-pervading.
    - *Example:* Smartphones have become ubiquitous even in rural India.
56. **Venerable** *(Adjective)*: Accorded a great deal of respect, especially because of age, wisdom, or character; respected, revered, esteemed, honored.
57. **Versatile** *(Adjective)*: Able to adapt or be adapted to many different functions or activities; adaptable, flexible, all-round, multifaceted.
58. **Vindicate** *(Verb)*: Clear someone of blame or suspicion; exonerate, absolve, acquit, justify, defend.
59. **Wary** *(Adjective)*: Feeling or showing caution about possible dangers; cautious, careful, alert, circumspect, vigilant.
60. **Zenith** *(Noun)*: The time at which something is most powerful or successful; peak, pinnacle, summit, apex, climax, culmination.
    - *Example:* At the zenith of his administrative career, he reformed the public distribution system.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Etymological Roots, Prefixes & Suffixes Strategy",
      content: `### 1. Decoding Synonyms through Etymology (Root Words)
When faced with an unfamiliar word in the examination hall, breaking it down into its constituent **Prefix + Root + Suffix** often reveals its meaning immediately:

#### A. Key Latin & Greek Prefixes:
- **Bene-** (Good, well): *Benevolent* (kind), *Beneficial* (advantageous), *Benefactor* (helper), *Benign* (harmless).
- **Mal- / Male-** (Bad, evil): *Malevolent* (spiteful), *Malicious* (harmful), *Malady* (illness), *Malign* (speak ill of).
- **Omni-** (All, everywhere): *Omnipresent* (ubiquitous), *Omniscient* (all-knowing), *Omnipotent* (all-powerful).
- **Ambi- / Amphi-** (Both, around): *Ambiguous* (unclear, two meanings), *Ambivalent* (mixed feelings), *Ambidextrous* (using both hands).
- **Anti- / Contra-** (Against, opposite): *Antipathy* (hostility), *Contradict* (oppose), *Contravene* (violate).
- **Chron-** (Time): *Chronological* (in time order), *Chronic* (long-lasting), *Anachronistic* (out of time).

---

### 2. High-Yield Roots Indicating Behavioral & Mental Qualities
- **Loqu / Loc-** (To speak):
  - *Loquacious* -> Garrulous, talkative.
  - *Eloquent* -> Articulate, expressive.
  - *Colloquial* -> Conversational, informal.
  - *Circumlocution* -> Verbosity, round-about speaking.
- **Greg-** (Flock, herd, group):
  - *Gregarious* -> Sociable, outgoing.
  - *Congregate* -> Assemble, gather.
  - *Egregious* -> Standing out offensively, shockingly bad.
- **Luc / Lum-** (Light, clear):
  - *Lucid* -> Clear, intelligible.
  - *Elucidate* -> Clarify, explain.
  - *Luminous* -> Shining, bright.
- **Plac / Plais-** (To please, soothe):
  - *Placate* -> Pacify, appease, calm.
  - *Complacent* -> Self-satisfied, smug.
  - *Implacable* -> Unforgiving, relentless.

---

### 3. Suffixes Revealing Parts of Speech
Recognizing the suffix ensures you never pick an option from the wrong grammatical category:
- **Noun Suffixes**: *-tion, -sion, -ity, -ment, -ness, -ance, -ence, -itude, -or, -er*.
  - *Example:* *Paucity* (-ity = Noun) -> Must be matched with *Scarcity* (-ity = Noun).
- **Adjective Suffixes**: *-ous, -ive, -ful, -less, -able, -ible, -ic, -al, -ent, -ant*.
  - *Example:* *Meticulous* (-ous = Adjective) -> Must be matched with *Painstaking* (Adjective).
- **Verb Suffixes**: *-ate, -ify, -ise / -ize, -en*.
  - *Example:* *Mitigate* (-ate = Verb) -> Must be matched with *Alleviate* (-ate = Verb).`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Core High-Frequency CG Vyapam Synonyms Reference Matrix",
      headers: ["Target Word", "Part of Speech", "Primary Synonym", "Secondary / Advanced Synonyms", "Contextual Example Sentence"],
      rows: [
        ["Abundant", "Adjective", "Plentiful", "Copious, Ample, Bountiful", "The state has abundant water bodies."],
        ["Candid", "Adjective", "Frank", "Forthright, Outspoken, Sincere", "She gave a candid confession to the court."],
        ["Diligent", "Adjective", "Hardworking", "Industrious, Assiduous, Sedulous", "Diligent efforts yield lasting success."],
        ["Ephemeral", "Adjective", "Short-lived", "Transient, Fleeting, Evanescent", "Fashion trends are ephemeral in nature."],
        ["Frugal", "Adjective", "Economical", "Thrifty, Prudent, Sparing", "He lived a frugal life in a small village."],
        ["Gregarious", "Adjective", "Sociable", "Companionable, Outgoing, Convivial", "Elephants are gregarious animals."],
        ["Lucid", "Adjective", "Clear", "Articulate, Intelligible, Coherent", "The judge wrote a lucid judgment."],
        ["Meticulous", "Adjective", "Precise", "Scrupulous, Thorough, Diligent", "She maintained meticulous financial accounts."],
        ["Mitigate", "Verb", "Lessen", "Alleviate, Assuage, Ease, Reduce", "Nothing could mitigate his grief."],
        ["Obsolete", "Adjective", "Outdated", "Archaic, Defunct, Superannuated", "Old regulations have become obsolete."],
        ["Paucity", "Noun", "Scarcity", "Dearth, Shortage, Deficiency", "There is a severe paucity of doctors."],
        ["Pragmatic", "Adjective", "Practical", "Realistic, Down-to-earth, Feasible", "We must adopt a pragmatic policy."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Confusing Near-Synonyms: Subtle Nuances & Connotations",
      headers: ["Near-Synonym Pair", "Word A: Meaning & Tone", "Word B: Meaning & Tone", "Crucial Distinction in Exams"],
      rows: [
        ["Economical vs Stingy", "Economical: Wise, careful spending (Positive).", "Stingy: Unwilling to spend even when needed (Negative).", "'Frugal' aligns with 'Economical', NOT 'Stingy' in neutral contexts."],
        ["Famous vs Notorious", "Famous: Renowned for honorable deeds (Positive).", "Notorious: Widely known for bad/criminal deeds (Negative).", "A saint is 'famous'; a dacoit is 'notorious'."],
        ["Childlike vs Childish", "Childlike: Having innocence, purity, simplicity (Positive).", "Childish: Immature, silly, petulant (Negative).", "'His childlike wonder' vs 'His childish tantrums'."],
        ["Proud vs Haughty", "Proud: Having legitimate self-respect (Neutral/Positive).", "Haughty: Disdainful, arrogantly superior (Negative).", "'Haughty' conveys snobbish arrogance; 'proud' can be noble."],
        ["Courageous vs Reckless", "Courageous: Facing danger with wisdom (Positive).", "Reckless: Acting without caring about danger (Negative).", "'Intrepid' matches 'Courageous'; 'Rash' matches 'Reckless'."]
      ]
    },
    {
      tableId: "tab_3",
      title: "Greek & Latin Root Words Cheat Sheet for Deducing Synonyms",
      headers: ["Root / Morpheme", "Core Meaning", "Illustrative Vocabulary Words", "Direct Synonyms"],
      rows: [
        ["Bene-", "Good, well", "Beneficent, Benevolent, Benign", "Kind, charitable, favorable, harmless"],
        ["Mal-", "Bad, ill, wrongful", "Malevolent, Malicious, Malign", "Spiteful, hostile, slanderous, harmful"],
        ["Loqu / Loc-", "Speech, talk", "Loquacious, Eloquent, Verbose", "Talkative, articulate, wordy"],
        ["Plac-", "Please, calm", "Placate, Implacable, Complacent", "Pacify, unappeasable, self-satisfied"],
        ["Omni-", "All, universal", "Omnipresent, Omnipotent, Omniscient", "Ubiquitous, almighty, all-knowing"],
        ["Vor-", "Eat, swallow", "Voracious, Carnivorous, Herbivorous", "Ravenous, gluttonous, insatiable"],
        ["Path-", "Feeling, emotion, disease", "Apathy, Empathy, Sympathy, Antipathy", "Indifference, compassion, affinity, hostility"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Choose the correct synonym of the word 'DILIGENT': [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) Lazy",
        "B) Industrious",
        "C) Proud",
        "D) Intelligent"
      ],
      correctAnswer: "B) Industrious",
      explanation: "'Diligent' means having or showing care and conscientiousness in one's work or duties (hardworking, assiduous, painstaking). Therefore, 'Industrious' is the exact synonym. 'Lazy' is its direct antonym."
    },
    {
      question: "What is the synonym of 'CANDID'? [CG Vyapam Patwari Exam]",
      options: [
        "A) Secretive",
        "B) Frank",
        "C) Cruel",
        "D) Arrogant"
      ],
      correctAnswer: "B) Frank",
      explanation: "'Candid' means truthful, straightforward, and sincere in speech (outspoken, forthright). Hence, 'Frank' is the exact synonym. 'Secretive' is an antonym."
    },
    {
      question: "Select the word that is nearest in meaning to 'OBSOLETE': [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) Modern",
        "B) Outdated",
        "C) Expensive",
        "D) Essential"
      ],
      correctAnswer: "B) Outdated",
      explanation: "'Obsolete' refers to something no longer produced or used, typically because something newer has replaced it (archaic, out of date). Therefore, 'Outdated' is the correct synonym."
    },
    {
      question: "Choose the synonym of 'PAUCITY': [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Scarcity",
        "B) Abundance",
        "C) Surplus",
        "D) Wealth"
      ],
      correctAnswer: "A) Scarcity",
      explanation: "'Paucity' means the presence of something only in small or insufficient quantities or amounts (dearth, shortage, deficiency). Hence, 'Scarcity' is the exact synonym. 'Abundance' and 'Surplus' are antonyms."
    },
    {
      question: "Identify the synonym of 'MITIGATE': [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) Increase",
        "B) Alleviate",
        "C) Intensify",
        "D) Complicate"
      ],
      correctAnswer: "B) Alleviate",
      explanation: "'Mitigate' means to make something bad or painful less severe, serious, or harsh (ease, reduce, lessen, assuage). 'Alleviate' has the identical meaning. 'Intensify' and 'Increase' are antonyms."
    },
    {
      question: "Choose the word most similar in meaning to 'PRAGMATIC': [CG Vyapam ADEO Exam]",
      options: [
        "A) Idealistic",
        "B) Theoretical",
        "C) Practical",
        "D) Imaginative"
      ],
      correctAnswer: "C) Practical",
      explanation: "'Pragmatic' means dealing with things sensibly and realistically based on practical rather than theoretical considerations. Therefore, 'Practical' is the correct synonym."
    }
  ],
  mcqs: [
    {
      question: "Select the synonym of 'EPHEMERAL':",
      options: [
        "A) Permanent",
        "B) Transient",
        "C) Eternal",
        "D) Enduring"
      ],
      correctAnswer: "B) Transient",
      explanation: "'Ephemeral' means lasting for a very short time (fleeting, momentary, short-lived). 'Transient' means lasting only for a short time, making it the precise synonym. 'Permanent' and 'Eternal' are antonyms."
    },
    {
      question: "What is the synonym of 'LUCID'?",
      options: [
        "A) Obscure",
        "B) Clear",
        "C) Confusing",
        "D) Dim"
      ],
      correctAnswer: "B) Clear",
      explanation: "'Lucid' means expressed clearly and easy to understand (intelligible, articulate, coherent). Therefore, 'Clear' is the correct synonym. 'Obscure' is its antonym."
    },
    {
      question: "Choose the synonym of 'UBIQUITOUS':",
      options: [
        "A) Rare",
        "B) Omnipresent",
        "C) Scarce",
        "D) Unique"
      ],
      correctAnswer: "B) Omnipresent",
      explanation: "'Ubiquitous' means present, appearing, or found everywhere at once. 'Omnipresent' carries the exact same meaning."
    },
    {
      question: "Select the nearest meaning of 'METICULOUS':",
      options: [
        "A) Careless",
        "B) Thorough",
        "C) Hasty",
        "D) Casual"
      ],
      correctAnswer: "B) Thorough",
      explanation: "'Meticulous' means showing great attention to detail; very careful and precise. 'Thorough' and 'scrupulous' are its closest synonyms."
    },
    {
      question: "Choose the synonym of 'GREGARIOUS':",
      options: [
        "A) Reclusive",
        "B) Sociable",
        "C) Solitary",
        "D) Aloof"
      ],
      correctAnswer: "B) Sociable",
      explanation: "'Gregarious' comes from the Latin root 'greg-' (flock/herd) and describes someone fond of company and outgoing. 'Sociable' is the correct synonym. 'Solitary' and 'Reclusive' are antonyms."
    },
    {
      question: "What is the synonym of 'FRUGAL'?",
      options: [
        "A) Extravagant",
        "B) Thrifty",
        "C) Generous",
        "D) Wasteful"
      ],
      correctAnswer: "B) Thrifty",
      explanation: "'Frugal' means sparing or economical with regard to money or resources. 'Thrifty' is its exact positive synonym."
    },
    {
      question: "Select the synonym of 'ZENITH':",
      options: [
        "A) Nadir",
        "B) Pinnacle",
        "C) Bottom",
        "D) Base"
      ],
      correctAnswer: "B) Pinnacle",
      explanation: "'Zenith' means the highest point reached by a celestial or other object, or the time of highest success/power (peak, apex, summit). 'Pinnacle' is the synonym. 'Nadir' is its exact opposite (lowest point)."
    },
    {
      question: "Choose the synonym of 'SPURIOUS':",
      options: [
        "A) Authentic",
        "B) Counterfeit",
        "C) Genuine",
        "D) Original"
      ],
      correctAnswer: "B) Counterfeit",
      explanation: "'Spurious' means not being what it purports to be; false, bogus, or fake. Therefore, 'Counterfeit' is the correct synonym."
    }
  ],
  keyTerminology: [
    {
      term: "Synonym",
      definition: "A word or phrase that has the same or nearly the same meaning as another word in the same language."
    },
    {
      term: "Denotation",
      definition: "The objective, literal dictionary definition of a word, devoid of emotional overtones or secondary associations."
    },
    {
      term: "Connotation",
      definition: "The cultural, emotional, or evaluative association that a word carries beyond its literal definition (e.g., positive, neutral, negative)."
    },
    {
      term: "Collocation",
      definition: "The customary, habitual juxtaposition of a particular word with another word or words with a frequency greater than chance."
    },
    {
      term: "Register",
      definition: "The level of formality in language that is appropriate to a specific social context (e.g., formal administrative English vs colloquial speech)."
    },
    {
      term: "Etymology",
      definition: "The study of the historical origin and linguistic development of words through their roots, prefixes, and suffixes."
    },
    {
      term: "Polysemy",
      definition: "The coexistence of many possible meanings for a single word, requiring contextual evaluation to select the appropriate synonym."
    },
    {
      term: "Near-Synonym",
      definition: "Words that are close in meaning but cannot be substituted for one another in all contexts due to semantic nuances."
    }
  ],
  sources: [
    {
      title: "Word Power Made Easy",
      author: "Norman Lewis",
      details: "Comprehensive etymological approach to vocabulary building, root words, and semantic nuances."
    },
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapter on 'Synonyms and Antonyms', explaining word formation and grammatical agreement."
    },
    {
      title: "Merriam-Webster's Collegiate Dictionary / Oxford Advanced Learner's",
      author: "Lexicographical Staff",
      details: "Standard reference for denotations, connotations, and register-based usage labels."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Analysis of vocabulary and synonym questions from 2014 to 2024 Vyapam exams."
    }
  ],
  confusionBuster: [
    {
      concept: "Part of Speech Mismatch Trap",
      confusion: "Choosing an adjective when the question asks for the synonym of a noun.",
      clarity: "Always verify the part of speech! The synonym of 'Diligent' (Adjective) is 'Industrious' (Adjective), NOT 'Industry' (Noun) or 'Industriously' (Adverb)."
    },
    {
      concept: "Antonym Disguised as an Option",
      confusion: "Marking the opposite word because it is familiar and strongly associated in memory.",
      clarity: "Examiners routinely place the exact antonym as Option A or B (e.g., for 'Paucity', providing 'Abundance'). Read the question carefully: confirm you are selecting the SYNONYM, not the antonym."
    },
    {
      concept: "Connotation Clashes in Near-Synonyms",
      confusion: "Equating 'Frugal' with 'Miserly' or 'Proud' with 'Haughty'.",
      clarity: "'Frugal' is positive/praiseworthy (spending wisely); 'Miserly' is negative (hoarding greedily). Match the positive or negative tone of the target word."
    },
    {
      concept: "Confusing Near-Homophones with Synonyms",
      confusion: "Mixing up words that look similar, such as 'Censure' (criticism) and 'Censor' (suppress).",
      clarity: "Watch out for deceptive spellings. 'Censure' means condemn/criticize; 'Censor' means examine and cut objectionable content."
    },
    {
      concept: "Absolute vs Contextual Meaning",
      confusion: "Assuming a word has only one fixed synonym regardless of sentence context.",
      clarity: "A word like 'Sound' can mean 'Noise' (Noun), 'Healthy/Robust' (Adjective: *a sound mind*), or 'Deep' (*a sound sleep*). Always check the sentence context."
    }
  ],
  faqList: [
    {
      question: "Are any two words in English 100% interchangeable in all contexts?",
      answer: "Virtually never. True or absolute synonyms do not exist because words differ by historical origin, register (formal vs informal), intensity, or collocation. For example, 'begin' and 'commence' mean the same, but 'commence' is formal and legal."
    },
    {
      question: "How can root words help in guessing an unknown synonym during the exam?",
      answer: "Recognizing common roots (e.g., 'mal-' = bad, 'bene-' = good, 'loqu-' = speak, 'greg-' = herd) allows you to determine whether the target word has a positive or negative tone, instantly eliminating 2 to 3 irrelevant options."
    },
    {
      question: "What is the difference between 'Diligent' and 'Intelligent'?",
      answer: "'Diligent' refers to hard work, perseverance, and conscientiousness (industrious, sedulous). 'Intelligent' refers to mental capacity and brainpower (shrewd, smart). Hard work and intellect are distinct qualities."
    },
    {
      question: "Why is 'Zenith' paired with 'Pinnacle' rather than 'Nadir'?",
      answer: "'Zenith' and 'Pinnacle' both mean the highest point or summit. 'Nadir' is the lowest possible point, which makes it the antonym of zenith, not its synonym."
    },
    {
      question: "How many synonym questions typically appear in CG Vyapam exams?",
      answer: "Typically, 2 to 4 direct synonym questions appear in the General English section of exams like Hostel Warden, Patwari, RI, and Teacher recruitment tests, with additional vocabulary tested in comprehension passages."
    }
  ],
  oneLinerRevision: [
    "A synonym must invariably belong to the same Part of Speech as the question word.",
    "Root 'bene-' indicates good/kind (*benevolent*); root 'mal-' indicates bad/evil (*malevolent*).",
    "'Diligent' means hardworking/industrious; 'Indolent' is its direct antonym (lazy).",
    "'Ephemeral' and 'Transient' mean short-lived or fleeting; 'Eternal' is their opposite.",
    "'Paucity' and 'Dearth' denote scarcity or lack; 'Abundance' and 'Surplus' are antonyms.",
    "'Mitigate' and 'Alleviate' mean to lessen pain or severity; 'Intensify' is the antonym.",
    "'Candid' means frank, sincere, and forthright; 'Secretive' is the opposite.",
    "'Ubiquitous' and 'Omnipresent' denote being present everywhere at once.",
    "'Zenith', 'Pinnacle', and 'Apex' denote the highest peak; 'Nadir' denotes the lowest point.",
    "'Pragmatic' means practical and realistic, contrasting with 'Idealistic' and 'Theoretical'."
  ],
  rapidRevision: {
    points: [
      "Rule 1: Noun matches Noun, Adjective matches Adjective, Verb matches Verb.",
      "Rule 2: Check tone/connotation (+ve vs -ve) before selecting among near-synonyms.",
      "Rule 3: Beware of antonyms deliberately placed in options.",
      "High-Frequency: Abundant = Plentiful; Candid = Frank; Diligent = Industrious.",
      "High-Frequency: Ephemeral = Transient; Frugal = Thrifty; Gregarious = Sociable.",
      "High-Frequency: Lucid = Clear; Meticulous = Thorough; Mitigate = Alleviate.",
      "High-Frequency: Obsolete = Outdated; Paucity = Scarcity; Pragmatic = Practical."
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
