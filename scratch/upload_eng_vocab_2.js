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
  id: "cgv_master_eng_vocab_2",
  topicId: "eng_vocab_2",
  chapterId: "cgv_master_sub_6_ch_6",
  subjectId: "cgv_master_sub_6",
  title: "Antonyms",
  subtitle: "High-Yield Antonyms Bank, Negative Prefixes, Contextual Opposites & Exam Traps for CG Vyapam",
  overview: {
    introduction: "An Antonym (derived from the Greek 'anti' meaning against or opposite, and 'onoma' meaning name) is a word that expresses a meaning directly opposite or contrary to that of another word in the same language. Antonyms are broadly categorized into three types: (1) Complementary or Binary Antonyms (absolute mutually exclusive pairs with no intermediate middle ground, such as alive/dead, present/absent, pass/fail); (2) Gradable Antonyms (pairs that operate on a continuous scale of intensity, admitting intermediate degrees, such as hot/cold, rich/poor, young/old); and (3) Relational or Converse Antonyms (pairs that represent opposite perspectives in a reciprocal relationship, such as buy/sell, teacher/student, above/below). In addition, many antonyms are created derivationally through morphological negative prefixes (un-, in-, im-, il-, ir-, dis-, non-, mis-). As with synonyms, a true antonym must strictly belong to the same Part of Speech as the question word.",
    importance: "Antonyms constitute a prominent, high-scoring section in the General English syllabus of all CG Vyapam examinations, including Hostel Warden, Revenue Inspector (RI), Patwari, Sub Inspector, ADEO, and Assistant Teacher exams. A typical CG Vyapam question paper features 2 to 4 direct antonym questions. Mastering antonyms develops precise verbal reasoning, sharpens semantic comprehension, and eliminates common confusion between contrasting words.",
    examRelevance: "CG Vyapam questions on Antonyms focus on: (1) Classic high-frequency vocabulary words (e.g., *paucity <-> abundance*, *mitigate <-> aggravate*, *zenith <-> nadir*, *candid <-> secretive*, *diligent <-> indolent*); (2) Identifying the correct negative prefix for a root word (e.g., *literate -> illiterate*, *patient -> impatient*, *reverent -> irreverent*); (3) Discarding trap options containing synonyms or words from different grammatical categories; (4) Contextual antonyms for polysemous words where the opposite changes based on sentence context.",
    quickFacts: [
      { label: "Part of Speech Rule", value: "The target word and its antonym must share the exact same grammatical category (Verb <-> Verb, Noun <-> Noun)" },
      { label: "Types of Antonyms (3)", value: "Complementary (binary), Gradable (scale-based), and Relational (converse)" },
      { label: "Prefix Phonetic Shifts", value: "'in-' becomes 'im-' before m/p, 'il-' before l, and 'ir-' before r" },
      { label: "Exam Trap Alert", value: "Examiners frequently place the SYNONYM as Option A to trap students who misread the question heading" },
      { label: "Classic Vyapam Opposites", value: "Zenith <-> Nadir, Paucity <-> Abundance, Mitigate <-> Aggravate, Candid <-> Deceitful" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Types of Antonyms & Morphological Negative Prefix Rules",
      content: `### 1. The Three Linguistic Categories of Antonyms
1. **Complementary (Binary) Antonyms**:
   - Mutually exclusive pairs. If one is true, the other is impossible; there is no middle state.
   - *Examples:* alive <-> dead, present <-> absent, true <-> false, pass <-> fail, mortal <-> immortal.
2. **Gradable Antonyms**:
   - Words at opposite ends of a spectrum that allow for intermediate degrees (comparison is possible: *hot, warm, lukewarm, cool, cold*).
   - *Examples:* hot <-> cold, rich <-> poor, huge <-> tiny, brilliant <-> foolish.
3. **Relational (Converse) Antonyms**:
   - Words that express a relationship from opposite perspectives. One cannot exist without the other.
   - *Examples:* borrow <-> lend, doctor <-> patient, parent <-> child, employer <-> employee, before <-> after.

---

### 2. Derivational Antonyms Formed by Negative Prefixes
A vast number of English antonyms are created by attaching a negative or reversing prefix to a root word:

#### A. The 'In-' Family (Phonetic Variations):
- **In-**: Used before most consonants and vowels (*direct -> indirect, capable -> incapable, active -> inactive, justice -> injustice*).
- **Im- (Before 'm' or 'p')**: *mortal -> immortal, mature -> immature, partial -> impartial, polite -> impolite, possible -> impossible*.
- **Il- (Before 'l')**: *legal -> illegal, literate -> illiterate, legible -> illegible, legitimate -> illegitimate*.
- **Ir- (Before 'r')**: *regular -> irregular, rational -> irrational, relevant -> irrelevant, responsible -> irresponsible*.

#### B. Other Common Opposing Prefixes:
- **Un-** (Not / Reverse): *happy -> unhappy, natural -> unnatural, common -> uncommon, professional -> unprofessional*.
- **Dis-** (Not / Opposite): *honest -> dishonest, order -> disorder, approve -> disapprove, respect -> disrespect, obey -> disobey*.
- **Mis-** (Wrongly / Badly): *understand -> misunderstand, lead -> mislead, conduct -> misconduct, interpret -> misinterpret*.
- **Non-** (Absence of): *violent -> non-violent, sense -> nonsense, essential -> non-essential, entity -> non-entity*.
- **Mal-** (Bad / Faulty): *function -> malfunction, practice -> malpractice, nutrition -> malnutrition*.
- **De-** (Reverse / Remove): *escalate -> de-escalate, centralize -> decentralize, activate -> deactivate*.
- **Anti- / Counter-** (Against / In response): *clockwise -> anticlockwise, attack -> counter-attack, productive -> counter-productive*.`
    },
    {
      id: "ch_2",
      title: "Chapter 2: High-Yield CG Vyapam Antonyms Bank: Group A to G",
      content: `### 1. High-Frequency Words (A to C)
1. **Acquit** *(Verb: clear of charge)* <-> **Convict / Condemn** *(Verb: declare guilty)*.
   - *Example:* The High Court acquitted the accused, overturning the lower court's decision to convict him.
2. **Affluent** *(Adjective: wealthy, rich)* <-> **Destitute / Impoverished / Poor** *(Adjective: lacking necessities)*.
   - *Example:* Scheme benefits are targeted not at the affluent, but at destitute rural households.
3. **Altruistic** *(Adjective: selfless, charitable)* <-> **Selfish / Egoistic** *(Adjective: self-centered)*.
4. **Amicable** *(Adjective: friendly, peaceful)* <-> **Hostile / Belligerent / Antagonistic** *(Adjective: unfriendly, aggressive)*.
5. **Arduous** *(Adjective: difficult, strenuous)* <-> **Easy / Effortless / Facile** *(Adjective: simple to achieve)*.
6. **Audacious** *(Adjective: bold, daring)* <-> **Timid / Cowardly / Meek** *(Adjective: fearful, hesitant)*.
7. **Authentic** *(Adjective: genuine, real)* <-> **Spurious / Counterfeit / Fake** *(Adjective: bogus, forged)*.
8. **Benevolent** *(Adjective: kind, well-wishing)* <-> **Malevolent / Spiteful / Malicious** *(Adjective: wishing evil)*.
9. **Candid** *(Adjective: frank, outspoken)* <-> **Secretive / Deceitful / Evasive / Insincere** *(Adjective: guarded, dishonest)*.
10. **Capricious** *(Adjective: fickle, unpredictable)* <-> **Consistent / Steadfast / Reliable / Constant** *(Adjective: unchanging)*.
11. **Censure** *(Verb: criticize, condemn)* <-> **Praise / Applaud / Commend** *(Verb: express approval)*.
12. **Chivalrous** *(Adjective: courteous, gallant)* <-> **Rude / Boorish / Ungallant** *(Adjective: ill-mannered)*.

---

### 2. High-Frequency Words (D to G)
13. **Dearth** *(Noun: scarcity, lack)* <-> **Abundance / Surplus / Plethora / Glut** *(Noun: plentiful supply)*.
    - *Example:* A dearth of rainfall caused drought, whereas the southern districts had an abundance of water.
14. **Deleterious** *(Adjective: harmful, injurious)* <-> **Beneficial / Wholesome / Salubrious** *(Adjective: healthy, advantageous)*.
15. **Diligent** *(Adjective: hardworking, industrious)* <-> **Indolent / Lazy / Slothful / Lethargic** *(Adjective: inactive, idle)*.
16. **Disparage** *(Verb: belittle, denigrate)* <-> **Praise / Extol / Compliment / Laud** *(Verb: speak highly of)*.
17. **Dormant** *(Adjective: inactive, asleep)* <-> **Active / Operational / Awake** *(Adjective: lively, functioning)*.
18. **Eloquent** *(Adjective: fluent, articulate)* <-> **Inarticulate / Halting / Hesitant** *(Adjective: unable to express ideas)*.
19. **Ephemeral** *(Adjective: short-lived, transient)* <-> **Eternal / Permanent / Perennial / Everlasting** *(Adjective: lasting forever)*.
20. **Equivocal** *(Adjective: ambiguous, unclear)* <-> **Unequivocal / Clear / Lucid / Plain** *(Adjective: definite, unambiguous)*.
21. **Fastidious** *(Adjective: fussy, hard to please)* <-> **Easygoing / Careless / Sloppy / Uncritical** *(Adjective: relaxed, not strict)*.
22. **Frugal** *(Adjective: thrifty, economical)* <-> **Extravagant / Wasteful / Prodigal / Spendthrift** *(Adjective: lavish with money)*.
23. **Gregarious** *(Adjective: sociable, outgoing)* <-> **Solitary / Reclusive / Introverted / Aloof** *(Adjective: preferring loneliness)*.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: High-Yield CG Vyapam Antonyms Bank: Group H to P",
      content: `### 1. High-Frequency Words (H to M)
24. **Haughty** *(Adjective: arrogant, snobbish)* <-> **Humble / Modest / Meek / Submissive** *(Adjective: unassuming, unpretentious)*.
25. **Harmony** *(Noun: peace, agreement)* <-> **Discord / Conflict / Strife / Friction** *(Noun: disagreement, dispute)*.
26. **Hostile** *(Adjective: aggressive, unfriendly)* <-> **Friendly / Amiable / Cordial / Hospitable** *(Adjective: welcoming)*.
27. **Immaculate** *(Adjective: spotless, pure)* <-> **Tarnished / Dirty / Defiled / Sullied** *(Adjective: stained, unclean)*.
28. **Impetuous** *(Adjective: rash, impulsive)* <-> **Cautious / Prudent / Deliberate / Circumspect** *(Adjective: careful, thoughtful)*.
29. **Indolent** *(Adjective: lazy, slothful)* <-> **Energetic / Industrious / Active / Diligent** *(Adjective: hardworking)*.
30. **Judicious** *(Adjective: wise, prudent)* <-> **Indiscreet / Foolish / Rash / Injudicious** *(Adjective: lacking good judgment)*.
31. **Laconic** *(Adjective: brief, using few words)* <-> **Verbose / Loquacious / Garrulous / Wordy** *(Adjective: excessively talkative)*.
32. **Lucid** *(Adjective: clear, intelligible)* <-> **Obscure / Vague / Confusing / Ambiguous** *(Adjective: hard to understand)*.
33. **Magnanimous** *(Adjective: generous, noble)* <-> **Petty / Vindicative / Spiteful / Mean** *(Adjective: small-minded, vengeful)*.
34. **Meticulous** *(Adjective: precise, painstaking)* <-> **Careless / Sloppy / Negligent / Slapdash** *(Adjective: lacking care)*.
35. **Mitigate** *(Verb: lessen, ease)* <-> **Aggravate / Exacerbate / Intensify / Worsen** *(Verb: make worse, provoke)*.
    - *Example:* Instead of mitigating the dispute, his inflammatory remarks aggravated the situation.

---

### 2. High-Frequency Words (N to P)
36. **Nadir** *(Noun: lowest point, bottom)* <-> **Zenith / Pinnacle / Apex / Acme / Summit** *(Noun: highest point)*.
    - *Example:* His political career sank to its nadir before rising again to the zenith of authority.
37. **Nefarious** *(Adjective: wicked, criminal)* <-> **Virtuous / Noble / Exemplary / Righteous** *(Adjective: morally upright)*.
38. **Novice** *(Noun: beginner, inexperienced)* <-> **Veteran / Expert / Professional / Maestro** *(Noun: highly experienced person)*.
39. **Obsolete** *(Adjective: outdated, archaic)* <-> **Modern / Contemporary / Current / Novel** *(Adjective: up-to-date)*.
40. **Onerous** *(Adjective: burdensome, heavy)* <-> **Easy / Light / Effortless / Facile** *(Adjective: simple, non-taxing)*.
41. **Paucity** *(Noun: scarcity, dearth)* <-> **Abundance / Surplus / Plethora / Opulence** *(Noun: plenty, excess)*.
42. **Pernicious** *(Adjective: deadly, harmful)* <-> **Beneficial / Wholesome / Harmless / Benign** *(Adjective: constructive, safe)*.
43. **Pragmatic** *(Adjective: practical, realistic)* <-> **Idealistic / Quixotic / Theoretical / Impractical** *(Adjective: visionary, unreal)*.
44. **Prolific** *(Adjective: productive, fertile)* <-> **Barren / Unproductive / Sterile / Infecund** *(Adjective: incapable of producing)*.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: High-Yield CG Vyapam Antonyms Bank: Group Q to Z",
      content: `### 1. High-Frequency Words (Q to S)
45. **Quell** *(Verb: suppress, crush)* <-> **Incite / Foment / Instigate / Provoke** *(Verb: stir up, encourage)*.
    - *Example:* While authorities sought to quell the riot, miscreants attempted to incite further violence.
46. **Relinquish** *(Verb: surrender, give up)* <-> **Retain / Cling to / Hold / Maintain** *(Verb: keep in possession)*.
47. **Resilient** *(Adjective: tough, adaptable)* <-> **Fragile / Vulnerable / Rigid / Brittle** *(Adjective: easily broken or damaged)*.
48. **Reticent** *(Adjective: reserved, quiet)* <-> **Frank / Outspoken / Communicative / Voluble** *(Adjective: open, talkative)*.
49. **Sagacious** *(Adjective: wise, perceptive)* <-> **Foolish / Ignorant / Injudicious / Naive** *(Adjective: lacking wisdom)*.
50. **Scrupulous** *(Adjective: principled, precise)* <-> **Unscrupulous / Dishonest / Careless / Immoral** *(Adjective: unprincipled)*.
51. **Spurious** *(Adjective: fake, counterfeit)* <-> **Genuine / Authentic / Real / Legitimate** *(Adjective: valid, true)*.
52. **Stolid** *(Adjective: calm, unexcitable)* <-> **Emotional / Sensitive / Expressive / Excitable** *(Adjective: easily moved)*.

---

### 2. High-Frequency Words (T to Z)
53. **Taciturn** *(Adjective: saying little, reserved)* <-> **Loquacious / Garrulous / Talkative / Voluble** *(Adjective: speaking excessively)*.
54. **Tenacious** *(Adjective: persistent, firm)* <-> **Yielding / Irresolute / Wavering / Surrendering** *(Adjective: giving up easily)*.
55. **Transient** *(Adjective: fleeting, impermanent)* <-> **Permanent / Perpetual / Constant / Enduring** *(Adjective: continuing forever)*.
56. **Ubiquitous** *(Adjective: present everywhere)* <-> **Rare / Scarce / Seldom / Isolated** *(Adjective: hard to find)*.
57. **Venerable** *(Adjective: respected, revered)* <-> **Disreputable / Despicable / Contemptible** *(Adjective: dishonorable, disgraced)*.
58. **Versatile** *(Adjective: multifaceted, adaptable)* <-> **Rigid / Inflexible / Limited / One-dimensional** *(Adjective: narrow, restricted)*.
59. **Vindicate** *(Verb: exonerate, acquit)* <-> **Blame / Accuse / Condemn / Incriminate** *(Verb: declare guilty, fault)*.
60. **Wary** *(Adjective: cautious, watchful)* <-> **Reckless / Careless / Rash / Incautious / Heedless** *(Adjective: heedless of danger)*.
61. **Zenith** *(Noun: peak, highest point)* <-> **Nadir / Bottom / Abyss / Depths** *(Noun: absolute lowest point)*.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Contextual Antonyms & Multiple Meaning Traps",
      content: `### 1. Polysemy: When One Word Has Multiple Antonyms
Many common English words possess several distinct meanings (**polysemy**). Consequently, the correct antonym varies depending on the specific sentence context:

#### Notable Examples of Contextual Antonyms:
1. **Light**:
   - Meaning 'Weight' (*a light load*) <-> **Heavy** (*a heavy load*).
   - Meaning 'Brightness' (*a light room*) <-> **Dark** (*a dark room*).
   - Meaning 'Color tone' (*light blue*) <-> **Deep / Dark** (*dark blue*).
2. **Fresh**:
   - Referring to Food (*fresh bread*) <-> **Stale** (*stale bread*).
   - Referring to Energy (*feeling fresh*) <-> **Tired / Exhausted**.
   - Referring to Water (*fresh water*) <-> **Saline / Salty water**.
3. **Sharp**:
   - Referring to an Edge (*a sharp knife*) <-> **Blunt** (*a blunt knife*).
   - Referring to Mind/Intellect (*a sharp mind*) <-> **Dull / Dim**.
   - Referring to Rise (*a sharp increase*) <-> **Gradual** (*a gradual increase*).
4. **Soft**:
   - Referring to Texture (*a soft pillow*) <-> **Hard / Firm**.
   - Referring to Voice/Sound (*a soft voice*) <-> **Loud / Harsh**.
   - Referring to Punishment (*a soft penalty*) <-> **Severe / Harsh / Strict**.
5. **Raw**:
   - Referring to Food (*raw vegetables*) <-> **Cooked / Boiled**.
   - Referring to Experience (*a raw recruit*) <-> **Experienced / Seasoned / Veteran**.
   - Referring to Materials (*raw silk*) <-> **Refined / Processed**.

---

### 2. Strategy for Eliminating Exam Traps
1. **Never Confuse Synonyms with Antonyms**:
   - Under exam pressure, candidates often recognize the word family and quickly choose a synonym instead of an antonym.
   - *Example:* Word is **Mitigate**. Option A is **Alleviate** (Synonym). Option B is **Aggravate** (Antonym). Rushing leads to choosing Option A by mistake!
2. **Maintain Grammatical Agreement**:
   - If the target word ends in *-tion* (Noun), its opposite must be a Noun.
   - If the target word ends in *-ly* (Adverb), its opposite must be an Adverb.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master High-Frequency CG Vyapam Antonyms Reference Matrix",
      headers: ["Target Word", "Part of Speech", "Primary Antonym", "Secondary / Advanced Antonyms", "Illustrative Contextual Sentence"],
      rows: [
        ["Affluent", "Adjective", "Destitute", "Impoverished, Poor, Indigent", "He transformed from an affluent landlord into a destitute wanderer."],
        ["Candid", "Adjective", "Secretive", "Deceitful, Evasive, Dishonest", "Her candid remarks exposed their secretive dealings."],
        ["Diligent", "Adjective", "Indolent", "Lazy, Slothful, Lethargic", "The diligent student was rewarded, while the indolent was warned."],
        ["Ephemeral", "Adjective", "Eternal", "Permanent, Perennial, Everlasting", "Fame is ephemeral, but virtue is eternal."],
        ["Frugal", "Adjective", "Extravagant", "Spendthrift, Prodigal, Lavish", "A frugal manager avoids extravagant expenditures."],
        ["Gregarious", "Adjective", "Reclusive", "Solitary, Aloof, Introverted", "The gregarious boy hated living in a reclusive mountain cabin."],
        ["Lucid", "Adjective", "Obscure", "Vague, Confusing, Unintelligible", "His explanation was lucid, whereas the circular was obscure."],
        ["Mitigate", "Verb", "Aggravate", "Exacerbate, Intensify, Worsen", "Calm dialogue mitigates conflict, while insults aggravate it."],
        ["Obsolete", "Adjective", "Contemporary", "Modern, Novel, Current", "Discard obsolete laws in favor of contemporary statutes."],
        ["Paucity", "Noun", "Abundance", "Surplus, Plethora, Glut", "The drought led to a paucity of grain, but next year brought an abundance."],
        ["Pragmatic", "Adjective", "Idealistic", "Quixotic, Theoretical, Impractical", "We need pragmatic solutions, not merely idealistic slogans."],
        ["Zenith", "Noun", "Nadir", "Bottom, Abyss, Base", "He witnessed the zenith of triumph and the nadir of despair."]
      ]
    },
    {
      tableId: "tab_2",
      title: "Negative Prefixes & Phonetic Rules Cheat Sheet",
      headers: ["Negative Prefix", "Phonetic / Morphological Rule", "Base Root Word", "Derived Antonym Form"],
      rows: [
        ["in-", "Default prefix before most letters", "capable / human / sincere", "incapable / inhuman / insincere"],
        ["im-", "Strictly used before letters 'm' and 'p'", "mature / mortal / patient / polite", "immature / immortal / impatient / impolite"],
        ["il-", "Strictly used before root letter 'l'", "legal / legible / literate / logical", "illegal / illegible / illiterate / illogical"],
        ["ir-", "Strictly used before root letter 'r'", "rational / regular / relevant / resolute", "irrational / irregular / irrelevant / irresolute"],
        ["un-", "Attached to native English roots and participles", "equal / predictable / tied / conscious", "unequal / unpredictable / untied / unconscious"],
        ["dis-", "Attached to Latin roots, nouns, verbs, and adjectives", "advantage / agree / honest / obedient", "disadvantage / disagree / dishonest / disobedient"],
        ["mis-", "Denotes wrongful or mistaken action", "fortune / interpret / lead / understand", "misfortune / misinterpret / mislead / misunderstand"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Context-Dependent Antonyms for Polysemous Words",
      headers: ["Target Word", "Specific Context / Collocation", "Core Meaning in Context", "Exact Contextual Antonym"],
      rows: [
        ["Light", "a light suitcase", "Low in physical weight", "Heavy (a heavy suitcase)"],
        ["Light", "a light room", "Bright, illuminated", "Dark (a dark room)"],
        ["Fresh", "fresh vegetables", "Newly harvested, not decaying", "Stale / Rotten (stale bread)"],
        ["Fresh", "fresh water", "Pure, unsalted water", "Saline / Salted (saline water)"],
        ["Sharp", "a sharp knife", "Keen cutting edge", "Blunt (a blunt knife)"],
        ["Sharp", "a sharp drop in temperature", "Sudden, steep", "Gradual (a gradual drop)"],
        ["Raw", "raw material", "Unprocessed, in natural state", "Refined / Processed (refined goods)"],
        ["Tender", "tender meat", "Soft, easily chewed", "Tough / Hard (tough meat)"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Choose the correct antonym of 'DILIGENT': [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) Industrious",
        "B) Indolent",
        "C) Intelligent",
        "D) Hardworking"
      ],
      correctAnswer: "B) Indolent",
      explanation: "'Diligent' means hardworking, conscientious, and industrious. Its direct opposite is 'Indolent' (lazy, wanting to avoid activity or exertion). 'Industrious' and 'Hardworking' are synonyms."
    },
    {
      question: "What is the antonym of 'ZENITH'? [CG Vyapam Patwari Exam]",
      options: [
        "A) Peak",
        "B) Apex",
        "C) Nadir",
        "D) Pinnacle"
      ],
      correctAnswer: "C) Nadir",
      explanation: "'Zenith' denotes the highest point, summit, or climax. 'Nadir' is the celestial and metaphorical opposite, signifying the lowest possible point or absolute bottom. 'Peak', 'Apex', and 'Pinnacle' are synonyms."
    },
    {
      question: "Select the word that is opposite in meaning to 'MITIGATE': [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) Alleviate",
        "B) Lessen",
        "C) Aggravate",
        "D) Relieve"
      ],
      correctAnswer: "C) Aggravate",
      explanation: "'Mitigate' means to make something less severe, painful, or serious (alleviate, ease). Its opposite is 'Aggravate' (or 'Exacerbate'), which means to make something worse, more serious, or more severe."
    },
    {
      question: "Choose the antonym of 'PAUCITY': [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Scarcity",
        "B) Dearth",
        "C) Abundance",
        "D) Shortage"
      ],
      correctAnswer: "C) Abundance",
      explanation: "'Paucity' means scarcity, dearth, or deficiency. Its antonym is 'Abundance' (plenty, surplus, plethora). Options A, B, and D are synonyms of paucity."
    },
    {
      question: "Select the correct antonym of 'CANDID': [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) Frank",
        "B) Secretive",
        "C) Honest",
        "D) Outspoken"
      ],
      correctAnswer: "B) Secretive",
      explanation: "'Candid' means frank, open, straightforward, and sincere. Its opposite is 'Secretive' (guarded, uncommunicative, evasive, or deceitful)."
    },
    {
      question: "Identify the antonym of the word 'EPHEMERAL': [CG Vyapam ADEO Exam]",
      options: [
        "A) Transient",
        "B) Fleeting",
        "C) Eternal",
        "D) Short-lived"
      ],
      correctAnswer: "C) Eternal",
      explanation: "'Ephemeral' means lasting for a very brief duration (fleeting, short-lived). Its antonym is 'Eternal' (everlasting, permanent, perennial)."
    }
  ],
  mcqs: [
    {
      question: "Choose the correct antonym of 'FRUGAL':",
      options: [
        "A) Economical",
        "B) Thrifty",
        "C) Extravagant",
        "D) Prudent"
      ],
      correctAnswer: "C) Extravagant",
      explanation: "'Frugal' means careful and economical in the spending of money. Its antonym is 'Extravagant' (wasteful, lavish, spendthrift)."
    },
    {
      question: "What is the antonym of 'LUCID'?",
      options: [
        "A) Clear",
        "B) Obscure",
        "C) Distinct",
        "D) Bright"
      ],
      correctAnswer: "B) Obscure",
      explanation: "'Lucid' means easily understood, clear, and articulate. Its antonym is 'Obscure' (vague, confusing, hard to understand)."
    },
    {
      question: "Select the opposite of 'GREGARIOUS':",
      options: [
        "A) Sociable",
        "B) Companionable",
        "C) Reclusive",
        "D) Talkative"
      ],
      correctAnswer: "C) Reclusive",
      explanation: "'Gregarious' describes a person or animal fond of company and sociable. 'Reclusive' (solitary, preferring to live alone) is the direct opposite."
    },
    {
      question: "Choose the correct antonym of 'OBSOLETE':",
      options: [
        "A) Archaic",
        "B) Outdated",
        "C) Ancient",
        "D) Contemporary"
      ],
      correctAnswer: "D) Contemporary",
      explanation: "'Obsolete' means no longer produced or used; archaic. 'Contemporary' (modern, current, up-to-date) is its direct antonym."
    },
    {
      question: "Which prefix must be attached to the word 'LEGIBLE' to form its antonym?",
      options: [
        "A) un-",
        "B) in-",
        "C) il-",
        "D) dis-"
      ],
      correctAnswer: "C) il-",
      explanation: "By phonetic rule in English, Latin root words beginning with the letter 'l' take the negative prefix 'il-'. Thus, the antonym of 'legible' is 'illegible'."
    },
    {
      question: "What is the antonym of 'BENEVOLENT'?",
      options: [
        "A) Altruistic",
        "B) Generous",
        "C) Malevolent",
        "D) Compassionate"
      ],
      correctAnswer: "C) Malevolent",
      explanation: "'Benevolent' (wishing good, kind) has the root 'bene-' (good). Its opposite is formed with the root 'mal-' (evil/bad): 'Malevolent' (wishing evil to others)."
    },
    {
      question: "Select the antonym of 'PRAGMATIC':",
      options: [
        "A) Realistic",
        "B) Idealistic",
        "C) Practical",
        "D) Down-to-earth"
      ],
      correctAnswer: "B) Idealistic",
      explanation: "'Pragmatic' means guided by practical considerations. 'Idealistic' (guided by abstract ideals or visionary theories) is its antonym."
    },
    {
      question: "What is the antonym of 'AFFLUENT'?",
      options: [
        "A) Wealthy",
        "B) Prosperous",
        "C) Destitute",
        "D) Rich"
      ],
      correctAnswer: "C) Destitute",
      explanation: "'Affluent' means possessing great wealth and abundance. 'Destitute' means lacking even the basic necessities of life (extremely poor)."
    }
  ],
  keyTerminology: [
    {
      term: "Antonym",
      definition: "A word that expresses a meaning directly contrary to or opposite that of another word in the same language."
    },
    {
      term: "Complementary Antonyms",
      definition: "Mutually exclusive word pairs with no middle ground (binary opposites), such as alive/dead or pass/fail."
    },
    {
      term: "Gradable Antonyms",
      definition: "Word pairs situated at opposing ends of a continuous scale that admit intermediate degrees (e.g., hot, warm, cool, cold)."
    },
    {
      term: "Relational (Converse) Antonyms",
      definition: "Word pairs that express reciprocal or opposing perspectives in a relationship, such as buy/sell or teacher/student."
    },
    {
      term: "Derivational Antonym",
      definition: "An antonym formed by attaching a negative prefix (un-, in-, dis-, non-) to an existing base word."
    },
    {
      term: "Assimilation (Phonetic)",
      definition: "The phonetic adaptation of the prefix 'in-' into 'im-' before bilabials (m, p), 'il-' before 'l', and 'ir-' before 'r'."
    },
    {
      term: "Polysemic Opposites",
      definition: "The phenomenon where a single multi-meaning word has completely different antonyms depending on contextual usage."
    },
    {
      term: "Semantic Concord",
      definition: "The grammatical and stylistic compatibility required between a target word and its selected opposite."
    }
  ],
  sources: [
    {
      title: "Word Power Made Easy",
      author: "Norman Lewis",
      details: "Comprehensive sections on etymology, roots, prefixes, and high-frequency opposing word pairs."
    },
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapter on 'Antonyms and Synonyms', outlining prefix formation rules and lexical contrast."
    },
    {
      title: "Oxford Dictionary of Synonyms and Antonyms",
      author: "Oxford University Press",
      details: "Standard lexical reference for gradable, complementary, and converse antonym categorizations."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Compilation of antonym and vocabulary questions from Vyapam recruitment exams from 2014 to 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Synonym Trap in Antonym Questions",
      confusion: "Marking a synonym because it is the most readily recalled association of the word.",
      clarity: "Examiners purposely place the synonym as Option A or B. Always double-check that you are choosing the OPPOSITE, not the similar meaning."
    },
    {
      concept: "Prefix Selection Errors (in- vs un- vs dis-)",
      confusion: "Confusing prefixes, e.g., writing 'unlegal' or 'disliterate'.",
      clarity: "Learn root rules: words in 'l' take 'il-' (*illegal, illiterate*); words in 'm/p' take 'im-' (*immature, impossible*); words in 'r' take 'ir-' (*irregular, irrational*)."
    },
    {
      concept: "Paucity vs Zenith Confusion",
      confusion: "Confusing abstract noun opposites.",
      clarity: "'Paucity' (scarcity) pairs with 'Abundance' (surplus). 'Zenith' (highest peak) pairs strictly with 'Nadir' (lowest point)."
    },
    {
      concept: "Contextual Antonym Swapping",
      confusion: "Using 'dark' as the antonym of 'light' when describing physical weight.",
      clarity: "A 'light' package has a 'heavy' package as its antonym, NOT a 'dark' package. Always inspect the context before selecting the opposite."
    },
    {
      concept: "Part of Speech Mismatch",
      confusion: "Selecting an adverb or noun as the antonym for an adjective.",
      clarity: "The antonym of 'Meticulous' (Adjective) is 'Careless' (Adjective), NOT 'Carelessly' (Adverb) or 'Carelessness' (Noun)."
    }
  ],
  faqList: [
    {
      question: "What is the difference between complementary and gradable antonyms?",
      answer: "Complementary antonyms have no middle ground (e.g., you cannot be 'partly dead' or 'partly alive'—you are one or the other). Gradable antonyms represent points on a scale (e.g., between 'hot' and 'cold' there is 'warm', 'tepid', and 'cool')."
    },
    {
      question: "Why does 'possible' take 'im-' while 'tolerable' takes 'in-'?",
      answer: "Due to phonetic ease of pronunciation (assimilation). English phonology prefers using the bilabial prefix 'im-' before bilabial consonants like 'p' and 'm' (impossible, immature). Before other consonants like 't', 'in-' is retained (intolerable)."
    },
    {
      question: "What is the antonym of 'Mitigate' in exam papers?",
      answer: "The standard and most frequent antonym of 'Mitigate' (to lessen/alleviate) in CG Vyapam answer keys is 'Aggravate' or 'Exacerbate' (to worsen or intensify pain/conflict)."
    },
    {
      question: "Can an antonym be formed simply by adding 'un-' to any word?",
      answer: "No. Negative prefixes are fixed by linguistic convention and etymology. For instance, 'honest' takes 'dis-' (dishonest), 'legitimate' takes 'il-' (illegitimate), 'responsible' takes 'ir-' (irresponsible), and 'grateful' takes 'un-' (ungrateful)."
    },
    {
      question: "What is the antonym of 'Nadir'?",
      answer: "'Nadir' means the lowest point; its exact antonym is 'Zenith' (or 'Pinnacle', 'Apex', 'Acme', 'Summit')."
    }
  ],
  oneLinerRevision: [
    "An antonym must belong to the exact same grammatical Part of Speech as the question word.",
    "'Zenith' (highest peak) and 'Nadir' (lowest point) are classic, perennial Vyapam antonyms.",
    "'Mitigate' (lessen) has 'Aggravate' or 'Exacerbate' (worsen) as its primary antonym.",
    "'Paucity' (dearth/scarcity) pairs with 'Abundance' or 'Surplus' as its opposite.",
    "'Diligent' (industrious) contrasts with 'Indolent' or 'Lazy'.",
    "'Candid' (frank/forthright) is the opposite of 'Secretive' or 'Deceitful'.",
    "'Ephemeral' (fleeting) is the direct antonym of 'Eternal' or 'Permanent'.",
    "Roots beginning with 'l' take 'il-' (*illiterate*); 'r' take 'ir-' (*irregular*); 'm/p' take 'im-' (*impatient*).",
    "'Frugal' (thrifty) contrasts with 'Extravagant' or 'Prodigal'.",
    "Beware of the synonym trap: examiners often place the synonym as Option A in antonym questions."
  ],
  rapidRevision: {
    points: [
      "Rule 1: Same Part of Speech mandatory (Noun <-> Noun, Adj <-> Adj).",
      "Rule 2: Complementary (binary) vs Gradable (scale) vs Relational (converse).",
      "Prefix Rules: 'il-' before l; 'im-' before m/p; 'ir-' before r; 'in-' elsewhere.",
      "Key Pairs: Zenith <-> Nadir; Mitigate <-> Aggravate; Paucity <-> Abundance.",
      "Key Pairs: Diligent <-> Indolent; Candid <-> Secretive; Ephemeral <-> Eternal.",
      "Key Pairs: Frugal <-> Extravagant; Gregarious <-> Reclusive; Obsolete <-> Contemporary.",
      "Key Pairs: Affluent <-> Destitute; Spurious <-> Genuine; Pragmatic <-> Idealistic."
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
