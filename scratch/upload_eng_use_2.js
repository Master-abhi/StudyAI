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
  id: "cgv_master_eng_use_2",
  topicId: "eng_use_2",
  chapterId: "cgv_master_sub_6_ch_10",
  subjectId: "cgv_master_sub_6",
  title: "Spellings",
  subtitle: "Master Guide to English Orthography, Suffix Rules, Double Consonants & Vyapam Spelling Archives",
  overview: {
    introduction: "English Orthography (the conventional spelling system of the English language) is notoriously complex and irregular due to its historical borrowing from Anglo-Saxon, Old Norse, Norman French, Latin, and Classical Greek. Words frequently contain silent letters, irregular vowel digraphs, assimilation shifts, and unpredictable consonant doubling. In competitive examinations, Spelling questions typically appear in two standardized formats: (1) 'Find the correctly spelt word' (where three options contain deliberate typographical traps and only one is correct); or (2) 'Find the incorrectly / wrongly spelt word' (where three words are spelled accurately and one contains a subtle orthographic error). Success in spelling questions relies on understanding six universal morphological spelling rules, mastering double-consonant combinations, and recognizing phonetic pitfalls.",
    importance: "In CG Vyapam competitive examinations—including Hostel Warden, Revenue Inspector (RI), Patwari, Sub Inspector (SI), ADEO, and Assistant Teacher exams—Spelling questions represent a mandatory, high-scoring section. Between 2 to 3 direct questions appear in every general English paper. Because these questions can be solved within 5 to 10 seconds, solid preparation guarantees quick, flawless marks that provide a decisive competitive edge.",
    examRelevance: "CG Vyapam questions on Spellings focus on: (1) Words with tricky double consonants (e.g., *Accommodation [2 c's, 2 m's], Embarrassment [2 r's, 2 s's], Harassment [1 r, 2 s's], Committee [2 m's, 2 t's, 2 e's]*); (2) The 'I before E except after C' rule and its famous exceptions (*receive, ceiling, foreign, seize, weird*); (3) Verbs ending in '-cede', '-ceed', and '-sede' (e.g., *supersede* [the only word ending in -sede!]); (4) Silent letter words (*lieutenant, queue, subtle, pseudonym, sovereignty*); (5) Suffix addition rules (*maintenance, occurrence, privilege*).",
    quickFacts: [
      { label: "Two Primary Question Formats", value: "(1) 'Find the correctly spelt word'; (2) 'Find the incorrectly spelt word'" },
      { label: "The Unique -Sede Rule", value: "'SUPERSEDE' is the ONLY word in the English language ending in '-sede'" },
      { label: "The -Ceed Trio (Only 3)", value: "Only three common verbs end in '-ceed': EXCEED, PROCEED, and SUCCEED (all others use '-cede')" },
      { label: "Double Letter Mnemonics", value: "ACCOMMODATION = 2 C's + 2 M's; EMBARRASSMENT = 2 R's + 2 S's; HARASSMENT = 1 R + 2 S's" },
      { label: "Cover-and-Write Strategy", value: "Cover the printed options, write the word down on scratch paper from memory, then match" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: The Six Core Morphological Spelling Rules",
      content: `### 1. Rule 1: 'I before E except after C' (And Its Exceptions)
- When the sound is a long 'ee' (/iː/):
  - Place **'I' before 'E'** in general words: *achieve, believe, relief, grief, niece, piece, siege*.
  - Place **'E' before 'I'** immediately after the letter **'C'**: *receive, deceive, perceive, conceit, ceiling, receipt*.
- **The Famous Exam Exceptions (Must Memorize!)**:
  - Sound not 'ee' (sounds like 'ay' /eɪ/ or 'eye' /aɪ/): *neighbor, weigh, weight, freight, reign, feign, height*.
  - Classic irregular words: **weird**, **seize**, **neither**, **foreign**, **sovereign**, **forfeit**, **leisure**.

---

### 2. Rule 2: Consonant Doubling Before Suffixes
- When adding a vowel suffix (*-ed, -ing, -er, -ence, -able*) to a word ending in a single vowel + single consonant:
  - **Double the final consonant** if the stress falls on the **final syllable**:
    - *occur* (stress on 'cur') -> **occurred**, **occurrence**.
    - *refer* (stress on 'fer') -> **referred**, **referral**.
    - *begin* (stress on 'gin') -> **beginning**, **beginner**.
  - **Do NOT double** if the stress is on the **first syllable**:
    - *benefit* (stress on 'ben') -> **benefited**, **benefiting** (NOT *benefitted*).
    - *differ* (stress on 'dif') -> **differed**, **difference**.

---

### 3. Rule 3: Words Ending in '-cede', '-ceed', and '-sede' (High Vyapam Yield!)
This is one of the most reliable and systematic rules in English orthography:
1. **Only ONE word ends in '-sede'**:
   - **SUPERSEDE** (meaning to take the place of; replace). Writing *supercede* is an extremely common blunder!
2. **Only THREE words end in '-ceed'**:
   - **EXCEED**, **PROCEED**, **SUCCEED**.
3. **All other words end in '-cede'**:
   - **Precede**, **Recede**, **Concede**, **Intercede**, **Accede**, **Secede**.

---

### 4. Rule 4: Dropping Final Silent 'E'
- Drop the final silent '-e' when adding a vowel suffix:
  - *write* + *-ing* -> **writing** (NOT *writeing*).
  - *hope* + *-ing* -> **hoping** (NOT *hopeing*).
  - *argue* + *-ment* -> **argument** (Notice: drop 'e' before '-ment' in *argument*, but retain in *judgement / judgment*).
  - *true* + *-ly* -> **truly** (NOT *truely*).
- **Retention of 'e' after 'c' and 'g'**:
  - Keep 'e' before '-able' or '-ous' to preserve the soft sound of 'c' (/s/) and 'g' (/dʒ/):
    - *courage* + *-ous* -> **courageous** (NOT *couragous*).
    - *change* + *-able* -> **changeable** (NOT *changable*).
    - *notice* + *-able* -> **noticeable** (NOT *noticable*).

---

### 5. Rule 5: Changing 'Y' to 'I'
- A final 'y' preceded by a consonant changes to 'i' before any suffix (except *-ing*):
  - *beauty* + *-ful* -> **beautiful**.
  - *carry* + *-ed* -> **carried** (but *carrying* keeps 'y' to prevent double 'i').

---

### 6. Rule 6: Suffix '-ful' Takes Only ONE 'L'
- When the word 'full' is added as a suffix, it loses one 'l':
  - *hope* + *full* -> **hopeful** (NOT *hopefull*).
  - *faith* + *full* -> **faithful**.
  - *skill* + *full* -> **skilful** (American: *skillful*).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: Master Double-Consonant Traps",
      content: `### 1. The Double-Consonant Hall of Fame
The vast majority of errors in CG Vyapam spelling tests involve candidates guessing whether a consonant is doubled or single. Commit these exact letters to memory:

1. **Accommodation**:
   - Contains **double 'C' AND double 'M'**: **A-C-C-O-M-M-O-D-A-T-I-O-N**.
   - *Trap:* *Acommodation* (1 'c') or *Accomodation* (1 'm') are both wrong!

2. **Embarrassment**:
   - Contains **double 'R' AND double 'S'**: **E-M-B-A-R-R-A-S-S-M-E-N-T**.
   - *Trap:* *Embarassment* (single 's') is the most common error.

3. **Harassment**:
   - Contains **SINGLE 'R' and DOUBLE 'S'**: **H-A-R-A-S-S-M-E-N-T**.
   - *Trap:* Writing double 'r' (*harrassment*) by false analogy with *embarrass*.

4. **Committee**:
   - Contains **three double letters: double 'M', double 'T', and double 'E'**:
   - **C-O-M-M-I-T-T-E-E**.

5. **Millennium**:
   - Contains **double 'L' AND double 'N'**: **M-I-L-L-E-N-N-I-U-M**.
   - *Trap:* *Millenium* (single 'n') is an extremely frequent trap.

6. **Questionnaire**:
   - Contains **double 'N'**: **Q-U-E-S-T-I-O-N-N-A-I-R-E**.

7. **Occurrence**:
   - Contains **double 'C' AND double 'R'**: **O-C-C-U-R-R-E-N-C-E**.

8. **Possession**:
   - Contains **two pairs of double 'S' (four s's in total!)**: **P-O-S-S-E-S-S-I-O-N**.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Silent Letters & Phonetic Deceptions",
      content: `### 1. The Trap of Silent Letters
In English, words inherited from French, Greek, or Old Norse contain silent consonants that cannot be heard when spoken aloud:

1. **Silent 'L'**:
   - **Colonel** (pronounced /ˈkɜːr.nəl/ like *kernel*).
   - **Salmon** (pronounced /ˈsæm.ən/ - the 'l' is completely silent).
2. **Silent 'P'**:
   - **Pneumonia**, **Psychology**, **Pseudonym**, **Receipt** (pronounced /rɪˈsiːt/).
3. **Silent 'B'**:
   - **Subtle** (pronounced /ˈsʌt.əl/), **Doubt**, **Debt**, **Comb**, **Tomb**, **Numb**.
4. **Silent 'G'**:
   - **Foreign**, **Sovereignty**, **Campaign**, **Feign**, **Reign**.
5. **The French Military Spelling: Lieutenant**:
   - Pronounced in British/Indian English as /lɛfˈtɛn.ənt/ (with an 'f' sound!), but spelled:
   - **L-I-E-U-T-E-N-A-N-T**.
   - *Memory Mnemonic:* **LIE - U - TEN - ANT** (A *lie* + *u* + *ten* + *ant*).
6. **Queue**:
   - Spelled **Q-U-E-U-E** (five letters, but pronounced simply like the single letter 'Q').
7. **Vacuum**:
   - Spelled with **one 'C' and DOUBLE 'U'**: **V-A-C-U-U-M**.
   - *Trap:* Writing *vaccuum* (double 'c') is wrong; it has double 'u'!`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Top 50 Perennial CG Vyapam Spelling Bank",
      content: `### Alphabetical Master Repository of the 50 Most-Tested Words:
1. **Absence**: A-B-S-E-N-C-E (Not *-ense*).
2. **Accommodation**: A-C-C-O-M-M-O-D-A-T-I-O-N (2 c's, 2 m's).
3. **Acquaintance**: A-C-Q-U-A-I-N-T-A-N-C-E (Contains silent 'c').
4. **Ammunition**: A-M-M-U-N-I-T-I-O-N (Double 'm').
5. **Anonymous**: A-N-O-N-Y-M-O-U-S.
6. **Auxiliary**: A-U-X-I-L-I-A-R-Y (Single 'l', ends in *-iary*).
7. **Bouquet**: B-O-U-Q-U-E-T (Silent 't').
8. **Bureaucracy**: B-U-R-E-A-U-C-R-A-C-Y (Contains *eau*).
9. **Chauffeur**: C-H-A-U-F-F-E-U-R (Double 'f', ends in *-eur*).
10. **Colleague**: C-O-L-L-E-A-G-U-E (Double 'l', ends in *-gue*).
11. **Commission**: C-O-M-M-I-S-S-I-O-N (2 m's, 2 s's).
12. **Committee**: C-O-M-M-I-T-T-E-E (2 m's, 2 t's, 2 e's).
13. **Conscientious**: C-O-N-S-C-I-E-N-T-I-O-U-S.
14. **Consensus**: C-O-N-S-E-N-S-U-S (Not *concensus*).
15. **Continuous**: C-O-N-T-I-N-U-O-U-S.
16. **Definite**: D-E-F-I-N-I-T-E (Not *-ate*).
17. **Diarrhea / Diarrhoea**: D-I-A-R-R-H-O-E-A (Double 'r').
18. **Dilemma**: D-I-L-E-M-M-A (Double 'm').
19. **Discipline**: D-I-S-C-I-P-L-I-N-E.
20. **Embarrassment**: E-M-B-A-R-R-A-S-S-M-E-N-T (2 r's, 2 s's).
21. **Entrepreneur**: E-N-T-R-E-P-R-E-N-E-U-R.
22. **Exaggerate**: E-X-A-G-G-E-R-A-T-E (Double 'g').
23. **Fascinate**: F-A-S-C-I-N-A-T-E.
24. **Fluorescent**: F-L-U-O-R-E-S-C-E-N-T (Starts with *fluo-*).
25. **Garrulous**: G-A-R-R-U-L-O-U-S (Double 'r').
26. **Grammar**: G-R-A-M-M-A-R (Ends in *-ar*, NOT *-er*!).
27. **Grievance**: G-R-I-E-V-A-N-C-E (Contains *ie*).
28. **Guarantee**: G-U-A-R-A-N-T-E-E (Starts with *gua-*).
29. **Harassment**: H-A-R-A-S-S-M-E-N-T (1 'r', 2 's's).
30. **Hygienic**: H-Y-G-I-E-N-I-C (Contains *ie*).
31. **Inconvenience**: I-N-C-O-N-V-E-N-I-E-N-C-E.
32. **Indispensable**: I-N-D-I-S-P-E-N-S-A-B-L-E (Ends in *-able*, NOT *-ible*).
33. **Lieutenant**: L-I-E-U-T-E-N-A-N-T.
34. **Maintenance**: M-A-I-N-T-E-N-A-N-C-E (Notice: *maintain* changes to *mainten-*).
35. **Maneuver / Manoeuvre**: M-A-N-O-E-U-V-R-E.
36. **Millennium**: M-I-L-L-E-N-N-I-U-M (2 l's, 2 n's).
37. **Mischievous**: M-I-S-C-H-I-E-V-O-U-S (Three syllables, NOT *mischievious*).
38. **Noticeable**: N-O-T-I-C-E-A-B-L-E (Retains 'e').
39. **Occurrence**: O-C-C-U-R-R-E-N-C-E (2 c's, 2 r's).
40. **Possession**: P-O-S-S-E-S-S-I-O-N (Four 's's).
41. **Privilege**: P-R-I-V-I-L-E-G-E (Contains *i-l-e-g-e*, no 'd').
42. **Psychology**: P-S-Y-C-H-O-L-O-G-Y.
43. **Questionnaire**: Q-U-E-S-T-I-O-N-N-A-I-R-E (Double 'n').
44. **Restaurant**: R-E-S-T-A-U-R-A-N-T (Contains *tau*).
45. **Separate**: S-E-P-A-R-A-T-E (Contains *par*, NOT *per*!).
46. **Sovereignty**: S-O-V-E-R-E-I-G-N-T-Y (Silent 'g').
47. **Supersede**: S-U-P-E-R-S-E-D-E (Ends in *-sede*).
48. **Surveillance**: S-U-R-V-E-I-L-L-A-N-C-E (Double 'l').
49. **Tomorrow**: T-O-M-O-R-R-O-W (1 'm', 2 'r's).
50. **Vacuum**: V-A-C-U-U-M (1 'c', 2 'u's).`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Proven Examination Solving Techniques",
      content: `### 1. The 'Cover-and-Write' Method (Crucial Exam Hack!)
When you look at four similar spellings on a computer screen or exam paper:
- (A) Accomodation
- (B) Acommodation
- (C) Accommodation
- (D) Accomadation

Your brain experiences **optical interference** and becomes confused by the deliberate typographical errors.
- **The Solution:** Cover the four options with your hand or hall ticket.
- Pronounce the word mentally.
- Write down the word naturally on your scratch paper using muscle memory.
- Uncover the options and match your handwritten word against the choices!`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Top 30 Perennial Vyapam Spelling Traps Matrix",
      headers: ["Target Word", "Correct Standard Spelling", "Common Examination Trap Misspelling", "Orthographic Rule / Memory Trick"],
      rows: [
        ["Accommodation", "ACCOMMODATION", "Accomodation / Acommodation", "Contains double 'C' AND double 'M'"],
        ["Embarrassment", "EMBARRASSMENT", "Embarassment / Embarment", "Contains double 'R' AND double 'S'"],
        ["Harassment", "HARASSMENT", "Harrassment (double r)", "Contains SINGLE 'R' and double 'S'"],
        ["Supersede", "SUPERSEDE", "Supercede (ending in cede)", "The only English word ending in '-sede'"],
        ["Vacuum", "VACUUM", "Vaccuum (double c)", "Contains SINGLE 'C' and double 'U'"],
        ["Separate", "SEPARATE", "Seperate (with an 'e')", "Remember: there is 'A RAT' in sep-A-RAT-e"],
        ["Grammar", "GRAMMAR", "Grammer (ending in -er)", "Ends in '-AR', never '-er'"],
        ["Lieutenant", "LIEUTENANT", "Leftenant / Leutenant", "Mnemonic: LIE - U - TEN - ANT"],
        ["Maintenance", "MAINTENANCE", "Maintainance", "Base 'maintain' changes to 'mainten-' before -ance"],
        ["Privilege", "PRIVILEGE", "Privelege / Priviledge", "No 'd' inside; spelled p-r-i-v-i-l-e-g-e"],
        ["Millennium", "MILLENNIUM", "Millenium (single n)", "Contains double 'L' AND double 'N'"],
        ["Questionnaire", "QUESTIONNAIRE", "Questionaire (single n)", "Contains double 'N' before -aire"],
        ["Occurrence", "OCCURRENCE", "Occurence (single r)", "Double 'C' and double 'R' before -ence"],
        ["Mischievous", "MISCHIEVOUS", "Mischievious", "Three syllables only: mis-chie-vous"],
        ["Tomorrow", "TOMORROW", "Tommorrow (double m)", "SINGLE 'M' and double 'R'"]
      ]
    },
    {
      tableId: "tab_2",
      title: "The '-Cede' vs '-Ceed' vs '-Sede' Definitive Classification",
      headers: ["Spelling Category", "Permissible Words", "Count", "Core Meaning"],
      rows: [
        ["Ends in -SEDE", "SUPERSEDE", "ONLY ONE WORD", "To take the place of; replace"],
        ["Ends in -CEED", "EXCEED, PROCEED, SUCCEED", "ONLY THREE WORDS", "To surpass, go forward, accomplish aim"],
        ["Ends in -CEDE", "Precede, Recede, Concede, Accede, Intercede, Secede", "ALL OTHER WORDS", "To yield, surrender, withdraw, go"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Single vs Double Consonants Contrast Table",
      headers: ["Base Concept", "Word with SINGLE Consonant", "Word with DOUBLE Consonant", "Critical Distinction"],
      rows: [
        ["R-sound", "Harassment (1 'r')", "Embarrassment (2 'r's)", "Harass has 1 'r'; Embarrass has 2 'r's"],
        ["M-sound", "Tomorrow (1 'm')", "Committee (2 'm's)", "Tomorrow has single 'm'; Committee has double 'm'"],
        ["C-sound", "Vacuum (1 'c')", "Occurrence (2 'c's)", "Vacuum has single 'c' and double 'u'"],
        ["L-sound", "Auxiliary (1 'l')", "Millennium (2 'l's)", "Auxiliary has single 'l'; Millennium has double 'l'"],
        ["F-sound", "Benefited (1 't')", "Permitted (2 't's)", "Benefited has 1 't' (stress on first syllable)"]
      ]
    }
  ],
  pyqs: [
    {
      question: "Select the correctly spelt word: [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) Accomodation",
        "B) Accommodation",
        "C) Acommodation",
        "D) Accomadation"
      ],
      correctAnswer: "B) Accommodation",
      explanation: "The word 'Accommodation' contains both double 'c' and double 'm' (A-C-C-O-M-M-O-D-A-T-I-O-N)."
    },
    {
      question: "Choose the correctly spelt word: [CG Vyapam Patwari Exam]",
      options: [
        "A) Embarasment",
        "B) Embarassment",
        "C) Embarrassment",
        "D) Embarrasmant"
      ],
      correctAnswer: "C) Embarrassment",
      explanation: "'Embarrassment' is spelled with double 'r' and double 's' (E-M-B-A-R-R-A-S-S-M-E-N-T)."
    },
    {
      question: "Select the incorrectly spelt word from the following: [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) Privilege",
        "B) Separate",
        "C) Grammer",
        "D) Maintenance"
      ],
      correctAnswer: "C) Grammer",
      explanation: "'Grammer' is incorrectly spelled. The correct standard spelling is 'Grammar' (ending in -ar, not -er). Privilege, Separate, and Maintenance are all spelled correctly."
    },
    {
      question: "Choose the correctly spelt word: [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Supercede",
        "B) Supersede",
        "C) Superceed",
        "D) Supersead"
      ],
      correctAnswer: "B) Supersede",
      explanation: "'Supersede' is the ONLY word in the English language ending in '-sede'. Spelled with an 's' in the suffix (S-U-P-E-R-S-E-D-E), derived from Latin 'supersedere'."
    },
    {
      question: "Find the correctly spelt word: [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) Leutenant",
        "B) Lieutenant",
        "C) Lieutanant",
        "D) Lietenant"
      ],
      correctAnswer: "B) Lieutenant",
      explanation: "'Lieutenant' is spelled L-I-E-U-T-E-N-A-N-T (remember the mnemonic: LIE - U - TEN - ANT)."
    },
    {
      question: "Select the correctly spelt word: [CG Vyapam ADEO Exam]",
      options: [
        "A) Vacume",
        "B) Vaccuum",
        "C) Vacuum",
        "D) Vacum"
      ],
      correctAnswer: "C) Vacuum",
      explanation: "'Vacuum' is spelled with a single 'c' and double 'u' (V-A-C-U-U-M)."
    }
  ],
  mcqs: [
    {
      question: "Choose the correctly spelt word:",
      options: [
        "A) Harassment",
        "B) Harrassment",
        "C) Harasment",
        "D) Harrasment"
      ],
      correctAnswer: "A) Harassment",
      explanation: "'Harassment' contains a SINGLE 'r' and DOUBLE 's' (H-A-R-A-S-S-M-E-N-T)."
    },
    {
      question: "Select the correctly spelt word:",
      options: [
        "A) Millenium",
        "B) Millennium",
        "C) Milenium",
        "D) Millenniam"
      ],
      correctAnswer: "B) Millennium",
      explanation: "'Millennium' contains double 'l' and double 'n' (M-I-L-L-E-N-N-I-U-M)."
    },
    {
      question: "Find the incorrectly spelt word:",
      options: [
        "A) Committee",
        "B) Questionnaire",
        "C) Occurence",
        "D) Bureaucracy"
      ],
      correctAnswer: "C) Occurence",
      explanation: "'Occurence' is incorrect; it must have double 'r': 'Occurrence' (O-C-C-U-R-R-E-N-C-E)."
    },
    {
      question: "Choose the correctly spelt word:",
      options: [
        "A) Seperate",
        "B) Separate",
        "C) Seperete",
        "D) Saparate"
      ],
      correctAnswer: "B) Separate",
      explanation: "'Separate' is spelled S-E-P-A-R-A-T-E (remember: 'there is a rat in separate')."
    },
    {
      question: "Select the correctly spelt word:",
      options: [
        "A) Maintainance",
        "B) Maintenance",
        "C) Maintanance",
        "D) Maintenence"
      ],
      correctAnswer: "B) Maintenance",
      explanation: "'Maintenance' is spelled M-A-I-N-T-E-N-A-N-C-E (the diphthong 'ai' in 'maintain' drops to 'e')."
    },
    {
      question: "Choose the correctly spelt word:",
      options: [
        "A) Conscientious",
        "B) Conscienctious",
        "C) Conscientous",
        "D) Consientious"
      ],
      correctAnswer: "A) Conscientious",
      explanation: "'Conscientious' is spelled C-O-N-S-C-I-E-N-T-I-O-U-S."
    },
    {
      question: "Select the correctly spelt word:",
      options: [
        "A) Mischievious",
        "B) Mischievous",
        "C) Mischevous",
        "D) Mischivous"
      ],
      correctAnswer: "B) Mischievous",
      explanation: "'Mischievous' has three syllables and ends in '-vous', NOT '-vious'."
    },
    {
      question: "Choose the correctly spelt word:",
      options: [
        "A) Questionaire",
        "B) Questionnaire",
        "C) Questionarrie",
        "D) Questionnair"
      ],
      correctAnswer: "B) Questionnaire",
      explanation: "'Questionnaire' has double 'n' before '-aire' (Q-U-E-S-T-I-O-N-N-A-I-R-E)."
    }
  ],
  keyTerminology: [
    {
      term: "Orthography",
      definition: "The conventional spelling system of a language, representing phonetic speech through established written symbols."
    },
    {
      term: "Digraph",
      definition: "A combination of two letters representing one single sound, such as 'ph' for /f/ or 'ea' for /iː/."
    },
    {
      term: "Assimilation",
      definition: "The process whereby a sound or consonant changes to become more like a nearby sound, influencing spelling prefixes (e.g., in- + mature = immature)."
    },
    {
      term: "Silent Letter",
      definition: "A letter that is written in the spelling of a word but is completely unpronounced in spoken articulation (e.g., 'b' in doubt)."
    },
    {
      term: "Mnemonic",
      definition: "A verbal memory device designed to remember complex spellings (e.g., 'LIE-U-TEN-ANT' for lieutenant)."
    },
    {
      term: "Optical Interference",
      definition: "The visual confusion caused when an examinee stares at four similarly misspelled options on a screen."
    },
    {
      term: "Diphthong",
      definition: "A sound formed by the combination of two vowels in a single syllable, whose spelling often deviates from standard rules."
    },
    {
      term: "Syllabification",
      definition: "The division of words into individual syllables, used as a technique to check spelling accuracy."
    }
  ],
  sources: [
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Comprehensive chapter on 'Spelling Rules' covering consonant doubling, silent 'e', and '-ful' suffixation."
    },
    {
      title: "Word Power Made Easy",
      author: "Norman Lewis",
      details: "Spelling chapters covering Latin and Greek roots, tricky medical terms, and foreign loan spellings."
    },
    {
      title: "The Oxford Dictionary of Spelling",
      author: "Oxford University Press",
      details: "Standard authority on British and Indian English spelling conventions."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Official question bank of spelling questions from Vyapam recruitment tests between 2014 and 2024."
    }
  ],
  confusionBuster: [
    {
      concept: "Harassment vs Embarrassment",
      confusion: "Writing double 'r' in harassment, or single 's' in embarrassment.",
      clarity: "**Harassment** has **1 'R' and 2 'S's** (H-A-R-A-S-S-M-E-N-T). **Embarrassment** has **2 'R's and 2 'S's** (E-M-B-A-R-R-A-S-S-M-E-N-T)."
    },
    {
      concept: "Supersede vs Supercede",
      confusion: "Ending supersede in '-cede' by analogy with precede.",
      clarity: "**SUPERSEDE** is the **ONLY** word in the English language ending in **-SEDE**. Never write 'supercede'."
    },
    {
      concept: "Separate vs Seperate",
      confusion: "Writing 'seperate' with an 'e'.",
      clarity: "Remember: there is **A RAT** in sep-**A-RAT**-e. It is spelled S-E-P-A-R-A-T-E."
    },
    {
      concept: "Grammar vs Grammer",
      confusion: "Ending grammar in '-er'.",
      clarity: "It is **GRAMMAR** ending in **-AR**, never '-er'."
    },
    {
      concept: "Vacuum vs Vaccuum",
      confusion: "Doubling the 'c' instead of the 'u'.",
      clarity: "**VACUUM** has **ONE 'C' and TWO 'U's** (V-A-C-U-U-M). Do not double the 'c'."
    }
  ],
  faqList: [
    {
      question: "What is the best technique to avoid confusion during spelling questions in the exam?",
      answer: "The 'Cover-and-Write' technique: immediately cover the 4 options on the screen, write the word down naturally from memory on your scratch pad, and then match your written word with the options."
    },
    {
      question: "Which words in English end in '-ceed'?",
      answer: "Only three words: **EXCEED**, **PROCEED**, and **SUCCEED**. All other similar verbs end in '-cede' (e.g., precede, recede, concede), except **SUPERSEDE** which ends in '-sede'."
    },
    {
      question: "Why is 'Lieutenant' spelled with 'lieu' when it sounds like 'lef'?",
      answer: "It is a Norman French loan word (lieu = place + tenant = holding; literally 'holding the place of a superior'). British and Commonwealth English preserved the traditional spelling while developing the /lɛf-/ pronunciation."
    },
    {
      question: "Why does 'benefited' have only one 't' while 'permitted' has double 't'?",
      answer: "In 'benefit', the stress is on the first syllable ('BEN-e-fit'), so the final consonant is not doubled. In 'permit', the stress is on the second syllable ('per-MIT'), so the final 't' is doubled ('permitted')."
    },
    {
      question: "Is 'Mischievous' spelled with four syllables?",
      answer: "No. 'Mischievous' is a three-syllable word (MIS-chiv-us) and is spelled M-I-S-C-H-I-E-V-O-U-S. Writing 'mischievious' with an extra 'i' is an illiterate misspelling."
    }
  ],
  oneLinerRevision: [
    "Accommodation contains double 'C' AND double 'M' (A-C-C-O-M-M-O-D-A-T-I-O-N).",
    "Embarrassment has double 'R' and double 'S'; Harassment has single 'R' and double 'S'.",
    "SUPERSEDE is the ONLY word in English ending in '-sede'.",
    "Only three words end in '-ceed': EXCEED, PROCEED, and SUCCEED.",
    "VACUUM has a single 'C' and double 'U' (V-A-C-U-U-M).",
    "SEPARATE contains 'A RAT' in the middle (S-E-P-A-R-A-T-E).",
    "GRAMMAR ends in '-AR', never '-er'.",
    "LIEUTENANT is spelled: LIE - U - TEN - ANT.",
    "COMMITTEE has three pairs of double letters: 2 m's, 2 t's, 2 e's.",
    "Always apply the Cover-and-Write technique to bypass optical interference from wrong options."
  ],
  rapidRevision: {
    points: [
      "Top Traps: Accommodation (2 c's, 2 m's); Embarrassment (2 r's, 2 s's); Harassment (1 r, 2 s's).",
      "Sede Rule: Supersede (only one with -sede); Exceed, Proceed, Succeed (only three with -ceed).",
      "Spellings: Vacuum (1 c, 2 u's); Separate (sep-a-rat-e); Grammar (-ar); Millennium (2 l's, 2 n's).",
      "Silent Letters: Lieutenant (Lie-u-ten-ant); Queue; Sovereignty; Subtle; Colonel.",
      "Strategy: Cover options immediately -> write from muscle memory -> match with choices."
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
