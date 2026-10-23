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
  id: "cgv_master_eng_vocab_3",
  topicId: "eng_vocab_3",
  chapterId: "cgv_master_sub_6_ch_6",
  subjectId: "cgv_master_sub_6",
  title: "One Word Substitution",
  subtitle: "Comprehensive Guide to Thematic Substitutions, Morpheme Roots & Exam Archives for CG Vyapam",
  overview: {
    introduction: "One Word Substitution (OWS) is the linguistic practice of replacing a detailed phrase, description, or descriptive clause with a single, precise, and concise term. It represents one of the most effective tools for achieving verbal brevity, clarity, and stylistic elegance in written English. In competitive exams, One Word Substitution questions test a candidate's depth of vocabulary, cultural literacy, and morphological understanding. Most substitutions in English originate from Greek and Latin roots, which can be grouped thematically into distinct categories: (1) Human traits, habits, and professions; (2) Forms of governance and rule; (3) Killings and homicides; (4) Phobias, obsessions, and manias; (5) Fields of scientific and academic study; and (6) Specialized locations, habitats, and institutions.",
    importance: "One Word Substitution is among the most predictable and high-scoring sections of General English in CG Vyapam exams (Hostel Warden, Revenue Inspector, Patwari, Sub Inspector, ADEO, Teacher, and Lab Assistant). Examination papers consistently dedicate 2 to 4 direct questions to OWS. Because these terms follow well-defined root systems (such as -cide, -cracy, -phobia, -mania, and -logy), mastering them guarantees candidates rapid, error-free marks.",
    examRelevance: "CG Vyapam questions on One Word Substitution focus on: (1) Medical and scientific specialists (e.g., *dermatologist, ornithologist, numismatist, philatelist*); (2) Types of governance (e.g., *oligarchy, plutocracy, autocracy, theocracy*); (3) Homicides and killings (e.g., *regicide, patricide, genocide, infanticide*); (4) Phobias and manias (e.g., *claustrophobia, hydrophobia, bibliomania*); (5) Specialized places and repositories (e.g., *aviary, apiary, mortuary, archive, arsenal*); (6) Descriptive personal qualities (e.g., *somnambulist, teetotaler, altruist, misanthrope, polyglot*).",
    quickFacts: [
      { label: "Core Benefit", value: "Replaces wordy, circumlocutory expressions with single, precise academic terms" },
      { label: "Morpheme Clues", value: "Roots: '-cide' (killing), '-cracy' (governance), '-phobia' (fear), '-logy' (study)" },
      { label: "Classic Bee vs Bird Trap", value: "Apiary = Place where bees are kept; Aviary = Place where birds are kept" },
      { label: "Vyapam Exam Weightage", value: "2 to 4 direct questions per examination; highly reliable and scoring" },
      { label: "Core Categories (6)", value: "Persons & Traits, Governments, Killings, Phobias/Manias, Sciences, Places" }
    ]
  },
  chapters: [
    {
      id: "ch_1",
      title: "Chapter 1: Morphological Root Systems for One Word Substitutions",
      content: `### 1. The Root Word Decoding Strategy
The overwhelming majority of English substitutions are compound formations derived from Greek and Latin morphemes. Memorizing a few key roots unlocks hundreds of substitutions:

#### A. Roots of Rule and Government:
- **-cracy / -archy** (Rule, power, government):
  - *Demo-* (People) + *-cracy* = **Democracy** (Government by the people).
  - *Pluto-* (Wealth) + *-cracy* = **Plutocracy** (Government by the wealthy).
  - *Aristo-* (Nobility) + *-cracy* = **Aristocracy** (Government by the noble / elite class).
  - *Theo-* (God/Religion) + *-cracy* = **Theocracy** (Government by religious leaders/laws).
  - *Oligo-* (Few) + *-archy* = **Oligarchy** (Government by a small group of powerful people).
  - *Auto-* (Self) + *-cracy* = **Autocracy** (Government by a single ruler with absolute power).
  - *Bureau-* (Office/Desk) + *-cracy* = **Bureaucracy** (Government by official civil servants).
  - *An-* (Without) + *-archy* = **Anarchy** (Absence of any government or law; lawlessness).

---

#### B. Roots of Killing and Murder:
- **-cide** (To kill, murder, or slaughter):
  - *Patri-* (Father) + *-cide* = **Patricide** (The killing of one's father).
  - *Matri-* (Mother) + *-cide* = **Matricide** (The killing of one's mother).
  - *Fratri-* (Brother) + *-cide* = **Fratricide** (The killing of one's brother).
  - *Sorori-* (Sister) + *-cide* = **Sororicide** (The killing of one's sister).
  - *Uxori-* (Wife) + *-cide* = **Uxoricide** (The killing of one's wife).
  - *Regi-* (King/Monarch) + *-cide* = **Regicide** (The killing of a king or queen).
  - *Infanti-* (Infant) + *-cide* = **Infanticide** (The killing of an infant or newborn child).
  - *Geno-* (Race/Tribe) + *-cide* = **Genocide** (The deliberate extermination of an entire race or ethnic group).
  - *Sui-* (Self) + *-cide* = **Suicide** (The intentional killing of oneself).

---

#### C. Roots of Fear and Obsession:
- **-phobia** (Morbid, irrational fear or aversion):
  - *Acro-* (Height) + *-phobia* = **Acrophobia** (Morbid fear of heights).
  - *Claustro-* (Enclosed space) + *-phobia* = **Claustrophobia** (Fear of confined or enclosed places).
  - *Hydro-* (Water) + *-phobia* = **Hydrophobia** (Extreme fear of water, symptomatic of rabies).
  - *Xeno-* (Foreigner/Stranger) + *-phobia* = **Xenophobia** (Dislike or fear of people from other countries).
  - *Nycto-* (Night/Darkness) + *-phobia* = **Nyctophobia** (Morbid fear of darkness).
- **-mania** (Compulsive obsession or craze):
  - *Biblio-* (Book) + *-mania* = **Bibliomania** (Obsessive passion for collecting books).
  - *Klepto-* (Steal) + *-mania* = **Kleptomania** (Irresistible impulse to steal items of little value).
  - *Pyro-* (Fire) + *-mania* = **Pyromania** (Obsessive compulsion to deliberately set fires).`
    },
    {
      id: "ch_2",
      title: "Chapter 2: High-Yield Substitutions: Persons, Habits & Personality Traits",
      content: `### 1. Personal Qualities & Lifestyle Choices
1. **Altruist**: A person who cares selflessly for the welfare and happiness of others; philanthropic.
2. **Ascetic**: A person who practices severe self-discipline and abstains from all worldly pleasures for spiritual purposes; hermit, monk.
3. **Egoist**: A self-centered person who thinks only of their own interest and self-advancement.
4. **Egotist**: An excessively conceited person who constantly talks about themselves and their achievements.
   - *Memory Trick:* Eg**o**ist = self-centered; Eg**ot**ist = talks about self (contains 't' for talk).
5. **Fatalist**: A person who believes that all events are predetermined by fate and inevitable.
6. **Hedonist**: A person who believes that the pursuit of pleasure is the most important goal in life.
7. **Hypocrite**: A person who pretends to possess moral virtues, principles, or beliefs that they do not actually hold.
8. **Misanthrope**: A person who dislikes humankind and avoids human society.
9. **Misogynist**: A person who dislikes, despises, or is strongly prejudiced against women.
10. **Misogamist**: A person who hates or opposes the institution of marriage.
11. **Philanthropist**: A person who seeks to promote the welfare of others, especially by generous financial donations.
12. **Polyglot**: A person who knows and is able to speak, read, or write several languages fluently.
13. **Somnambulist**: A person who walks while asleep; sleepwalker.
14. **Somniloquist**: A person who talks while asleep.
15. **Teetotaler**: A person who completely abstains from drinking alcoholic beverages.
16. **Veteran**: A person who has had long experience in a particular field, profession, or military service.
17. **Connoisseur**: An expert judge in matters of taste and fine arts (e.g., painting, food, wine).
18. **Mercenary**: A soldier or individual who fights or works purely for monetary reward.
19. **Omnivorous**: An animal or person that eats food of both plant and animal origin.
20. **Recluse**: A person who lives a solitary life and tends to avoid other people.`
    },
    {
      id: "ch_3",
      title: "Chapter 3: Types of Governments, Political Systems & Murders/Killings",
      content: `### 1. Political Systems & Forms of Governance
1. **Anarchy**: A state of lawlessness and disorder resulting from the total absence or non-recognition of authority or government.
2. **Aristocracy**: A form of government in which power is held by the nobility, hereditary elite, or privileged upper class.
3. **Autocracy**: A system of government by one person with absolute, unrestricted power; despotism.
4. **Bureaucracy**: A system of government in which most of the important decisions are taken by state officials rather than by elected representatives.
5. **Democracy**: A system of government by the whole population or all eligible members of a state, typically through elected representatives.
6. **Gerontocracy**: A state, society, or government governed by elderly people.
7. **Monarchy**: A form of government with a monarch (king or queen) at the head.
8. **Oligarchy**: A small group of people having control of a country, organization, or institution.
9. **Plutocracy**: A government or state ruled and controlled exclusively by the wealthy class.
10. **Theocracy**: A system of government in which priests or religious authorities rule in the name of God or a divine being.

---

### 2. The Complete Family of Killings and Murders (-Cide)
1. **Patricide**: The act of killing one's father.
2. **Matricide**: The act of killing one's mother.
3. **Fratricide**: The act of killing one's brother.
4. **Sororicide**: The act of killing one's sister.
5. **Uxoricide**: The act of murdering one's wife.
6. **Mariticide**: The act of murdering one's husband.
7. **Filicide**: The killing of one's own child or son/daughter.
8. **Infanticide**: The practice or crime of killing an infant or newborn child.
9. **Regicide**: The murder or execution of a king, queen, or sovereign monarch.
10. **Genocide**: The deliberate, systematic extermination of an entire national, racial, political, or cultural group.
11. **Homicide**: The killing of one human being by another.
12. **Parricide**: The murder of one's parent or other close relative.`
    },
    {
      id: "ch_4",
      title: "Chapter 4: Phobias, Manias, Sciences & Fields of Study",
      content: `### 1. High-Yield Phobias (Irrational Fears)
1. **Acrophobia**: Extreme or irrational fear of heights.
2. **Agoraphobia**: Extreme fear of crowded, open public spaces from which escape seems difficult.
3. **Claustrophobia**: Extreme or irrational fear of confined, tight, or enclosed spaces (like elevators).
4. **Hydrophobia**: Extreme fear of water (specifically associated with rabies in humans).
5. **Ophidiophobia**: Morbid, irrational fear of snakes.
6. **Thanatophobia**: Extreme or irrational fear of death or dying.
7. **Xenophobia**: Dislike of, contempt for, or prejudice against people from other countries.
8. **Zoophobia**: Morbid or abnormal fear of animals.

---

### 2. High-Yield Sciences & Academic Disciplines
1. **Anthropology**: The scientific study of human societies, cultures, and their physical and biological development.
2. **Archaeology**: The scientific study of human history and prehistory through the excavation of sites and the analysis of physical artifacts.
3. **Astronomy**: The branch of science that deals with celestial objects, space, and the physical universe.
4. **Calligraphy**: The visual art of beautiful decorative handwriting or lettering with a pen or brush.
5. **Cartography**: The science, art, or practice of drawing and compiling geographical maps.
6. **Entomology**: The branch of zoology concerned with the scientific study of insects.
   - *Caution:* Do not confuse **Entomology** (study of insects) with **Etymology** (study of word origins)!
7. **Etymology**: The study of the origins, historical development, and evolution of words and their meanings.
8. **Numismatics**: The collection or scientific study of coins, bank notes, tokens, and paper money.
9. **Ornithology**: The branch of zoology that deals with the scientific study of birds.
10. **Philately**: The collection and study of postage stamps and postal history.
11. **Philology**: The scientific study of language, literary texts, historical linguistics, and grammar.
12. **Seismology**: The branch of science concerned with earthquakes and related phenomena.`
    },
    {
      id: "ch_5",
      title: "Chapter 5: Specialized Places, Institutional Terms & Literary Substitutions",
      content: `### 1. Specialized Habitats, Enclosures & Places (Vyapam Classics!)
1. **Apiary**: A place where bees are kept, especially a collection of beehives.
2. **Aviary**: A large cage, building, or enclosure for keeping and rearing birds.
   - *Memory Trick:* **Ap**iary = **B**ees (both have 'b'/'p' lip sounds); **Av**iary = **A**ves/Birds.
3. **Aquarium**: A transparent tank of water in which live fish and other water creatures and plants are kept.
4. **Archive**: A collection of historical documents, government records, or primary source materials.
5. **Arsenal**: A collection or storage facility for weapons, ammunition, and military equipment.
6. **Cemetery**: A burial ground where deceased people are interred.
7. **Cloakroom**: A room in a railway station, theatre, or airport where coats, luggage, and personal bags may be temporarily left.
8. **Granary**: A storehouse for threshed grain, cereals, or animal feed.
9. **Mortuary / Morgue**: A room or building where dead bodies are kept before burial, cremation, or autopsy.
10. **Orchard**: A piece of land planted with fruit trees.
11. **Sanatorium**: An establishment providing medical treatment and rest for people who are convalescing or have long-term chronic illness.

---

### 2. Miscellaneous Literary & Academic Substitutions
1. **Anonymous**: Having no known name or authorship; written or produced by an unidentified person.
2. **Incorrigible**: A person or habit that cannot be reformed, improved, or corrected.
3. **Infallible**: Incapable of making mistakes or being wrong; never failing.
4. **Inevitable**: Certain to happen; unavoidable.
5. **Omnipotent**: Having unlimited, absolute, and universal power (said of God).
6. **Omnipresent**: Present everywhere at the same time; ubiquitous.
7. **Omniscient**: Knowing everything; infinitely wise and all-knowing.
8. **Panacea**: A remedy, medicine, or cure for all diseases, problems, or difficulties; an elixir.
9. **Posthumous**: Occurring, awarded, or published after the death of the person involved (e.g., *a posthumous award, a posthumous child*).
10. **Unanimous**: In complete agreement; held or arrived at by the consensus of all people involved.`
    }
  ],
  comparativeTables: [
    {
      tableId: "tab_1",
      title: "Master High-Frequency Vyapam One Word Substitutions Matrix",
      headers: ["Descriptive Definition / Phrase", "One Word Substitution", "Grammatical Class", "Key Root / Origin"],
      rows: [
        ["A person who looks at the bright side of things", "Optimist", "Noun", "Latin: optimus (best)"],
        ["A person who looks at the dark side of things", "Pessimist", "Noun", "Latin: pessimus (worst)"],
        ["One who eats human flesh", "Cannibal", "Noun", "Spanish: Canibales"],
        ["One who completely abstains from alcoholic drinks", "Teetotaler", "Noun", "Colloquial reduplication of 'T' in total"],
        ["One who cannot be corrected or reformed", "Incorrigible", "Adjective", "Latin: in- (not) + corrigere (correct)"],
        ["A cure or remedy for all diseases", "Panacea", "Noun", "Greek: pan (all) + akos (cure)"],
        ["One who knows everything", "Omniscient", "Adjective", "Latin: omni (all) + scire (know)"],
        ["One who walks in sleep", "Somnambulist", "Noun", "Latin: somnus (sleep) + ambulare (walk)"],
        ["One who collects postage stamps", "Philatelist", "Noun", "Greek: philos (loving) + ateleia (tax-free)"],
        ["One who collects or studies coins", "Numismatist", "Noun", "Greek: nomisma (coin/currency)"],
        ["The scientific study of birds", "Ornithology", "Noun", "Greek: ornithos (bird) + logos (study)"],
        ["The scientific study of insects", "Entomology", "Noun", "Greek: entomon (insect) + logos (study)"]
      ]
    },
    {
      tableId: "tab_2",
      title: "The Complete System of Homicides (-Cide) and Governments (-Cracy)",
      headers: ["Target Concept / Entity", "Specific Morphemic Word", "Root Morphemes", "Exact Defining Meaning"],
      rows: [
        ["Killing of a Father", "Patricide", "patri- + -cide", "Murder or killing of one's own father"],
        ["Killing of a Mother", "Matricide", "matri- + -cide", "Murder or killing of one's own mother"],
        ["Killing of a Brother", "Fratricide", "fratri- + -cide", "Murder or killing of one's own brother"],
        ["Killing of a King", "Regicide", "regi- + -cide", "Murder or execution of a reigning monarch"],
        ["Killing of an Entire Race", "Genocide", "geno- + -cide", "Deliberate mass slaughter of an ethnic group"],
        ["Rule by the Wealthy", "Plutocracy", "pluto- + -cracy", "Government controlled exclusively by the rich"],
        ["Rule by Nobility / Elite", "Aristocracy", "aristo- + -cracy", "Government by the highest hereditary class"],
        ["Rule by Religious Leaders", "Theocracy", "theo- + -cracy", "Government by divine guidance or priesthood"],
        ["Rule by a Small Faction", "Oligarchy", "oligo- + -archy", "Government by a small dominant cartel"],
        ["Absence of Government", "Anarchy", "an- + -archy", "Complete state of lawlessness without rule"]
      ]
    },
    {
      tableId: "tab_3",
      title: "Specialized Enclosures & Habitats Reference Chart",
      headers: ["Entity / Animal Kept", "Specialized Facility / Term", "Incorrect Exam Trap", "Precise Distinguishing Feature"],
      rows: [
        ["Bees", "Apiary", "Aviary (INCORRECT)", "Collection of beehives for apiculture"],
        ["Birds", "Aviary", "Apiary (INCORRECT)", "Large flight enclosure for rearing birds"],
        ["Historical Documents", "Archive", "Museum", "Repository of official records and charters"],
        ["Weapons & Ammunition", "Arsenal", "Armory / Granary", "Government facility storing military armaments"],
        ["Grain / Harvested Crop", "Granary", "Barn / Silo", "Specially designed storehouse for threshed grain"],
        ["Dead bodies before autopsy", "Mortuary / Morgue", "Cemetery", "Refrigerated room holding corpses for identification"],
        ["Coats and Luggage", "Cloakroom", "Waiting room", "Temporary baggage deposit room at public venues"]
      ]
    }
  ],
  pyqs: [
    {
      question: "A person who completely abstains from alcohol is called a/an: [CG Vyapam Hostel Warden Exam]",
      options: [
        "A) Teetotaler",
        "B) Alcoholic",
        "C) Ascetic",
        "D) Hedonist"
      ],
      correctAnswer: "A) Teetotaler",
      explanation: "A 'Teetotaler' is defined as someone who practices total abstinence from intoxicating alcoholic beverages. 'Alcoholic' is the opposite; 'Ascetic' is a person leading a severely disciplined, austere life."
    },
    {
      question: "A place where bees are kept is called: [CG Vyapam Patwari Exam]",
      options: [
        "A) Aviary",
        "B) Apiary",
        "C) Aquarium",
        "D) Archive"
      ],
      correctAnswer: "B) Apiary",
      explanation: "An 'Apiary' (from Latin 'apis' meaning bee) is a place where beehives of honeybees are kept. An 'Aviary' (from Latin 'avis' meaning bird) is a large enclosure for keeping birds."
    },
    {
      question: "One who collects or studies coins and medals is a/an: [CG Vyapam Revenue Inspector (RI) Exam]",
      options: [
        "A) Philatelist",
        "B) Numismatist",
        "C) Archaeologist",
        "D) Anthropologist"
      ],
      correctAnswer: "B) Numismatist",
      explanation: "A 'Numismatist' is a specialist who collects or studies currency, including coins, tokens, paper money, and related objects. A 'Philatelist' collects postage stamps."
    },
    {
      question: "A remedy or cure for all diseases is known as: [CG Vyapam Sub Inspector (SI) Exam]",
      options: [
        "A) Antidote",
        "B) Panacea",
        "C) Antibiotic",
        "D) Laxative"
      ],
      correctAnswer: "B) Panacea",
      explanation: "'Panacea' (from Greek 'pan' meaning all, and 'akos' meaning remedy) is a universal medicine or cure for all diseases, problems, or difficulties. An 'Antidote' neutralizes a specific poison."
    },
    {
      question: "The murder of a king or queen is called: [CG Vyapam Assistant Teacher Exam]",
      options: [
        "A) Patricide",
        "B) Regicide",
        "C) Genocide",
        "D) Fratricide"
      ],
      correctAnswer: "B) Regicide",
      explanation: "'Regicide' (from Latin 'rex/regis' meaning king, and '-cide' meaning killing) is the deliberate killing of a monarch. 'Patricide' is killing one's father; 'Genocide' is mass extermination of a race."
    },
    {
      question: "Government by the wealthy class is called: [CG Vyapam ADEO Exam]",
      options: [
        "A) Aristocracy",
        "B) Democracy",
        "C) Plutocracy",
        "D) Oligarchy"
      ],
      correctAnswer: "C) Plutocracy",
      explanation: "'Plutocracy' (from Greek 'ploutos' meaning wealth, and 'kratos' meaning power) is a government or political system ruled exclusively by wealthy citizens."
    }
  ],
  mcqs: [
    {
      question: "The scientific study of insects is called:",
      options: [
        "A) Etymology",
        "B) Entomology",
        "C) Ornithology",
        "D) Ecology"
      ],
      correctAnswer: "B) Entomology",
      explanation: "'Entomology' is the branch of zoology that deals with insects. 'Etymology' is the study of word origins and history."
    },
    {
      question: "A person who walks in sleep is known as a:",
      options: [
        "A) Somniloquist",
        "B) Somnambulist",
        "C) Philanthropist",
        "D) Polyglot"
      ],
      correctAnswer: "B) Somnambulist",
      explanation: "'Somnambulist' (from Latin 'somnus' sleep + 'ambulare' to walk) is someone who walks in their sleep. 'Somniloquist' is someone who talks in their sleep."
    },
    {
      question: "One who knows many foreign languages fluently is a:",
      options: [
        "A) Polyglot",
        "B) Philologist",
        "C) Linguist",
        "D) Calligrapher"
      ],
      correctAnswer: "A) Polyglot",
      explanation: "A 'Polyglot' is a person who speaks, reads, or writes several different languages fluently."
    },
    {
      question: "A person who cannot be corrected or reformed is:",
      options: [
        "A) Infallible",
        "B) Incorrigible",
        "C) Invulnerable",
        "D) Inaudible"
      ],
      correctAnswer: "B) Incorrigible",
      explanation: "'Incorrigible' describes a person or their bad behavior that is not capable of being corrected, reformed, or improved."
    },
    {
      question: "An irrational fear of confined or enclosed spaces is called:",
      options: [
        "A) Acrophobia",
        "B) Claustrophobia",
        "C) Hydrophobia",
        "D) Agoraphobia"
      ],
      correctAnswer: "B) Claustrophobia",
      explanation: "'Claustrophobia' is the extreme or irrational fear of confined or small enclosed spaces."
    },
    {
      question: "A collection of historical documents or public records is stored in a/an:",
      options: [
        "A) Arsenal",
        "B) Archive",
        "C) Museum",
        "D) Aviary"
      ],
      correctAnswer: "B) Archive",
      explanation: "An 'Archive' is a designated repository where historical records, government charters, and public documents are permanently preserved."
    },
    {
      question: "A person who hates or dislikes humankind is a:",
      options: [
        "A) Philanthropist",
        "B) Misanthrope",
        "C) Misogynist",
        "D) Cannibal"
      ],
      correctAnswer: "B) Misanthrope",
      explanation: "A 'Misanthrope' (from Greek 'miso' hate + 'anthropos' human) is a person who dislikes humanity. A 'Philanthropist' loves and helps humankind."
    },
    {
      question: "Something that occurs, is published, or is awarded after a person's death is:",
      options: [
        "A) Premature",
        "B) Posthumous",
        "C) Belated",
        "D) Postponed"
      ],
      correctAnswer: "B) Posthumous",
      explanation: "'Posthumous' refers to events, children born, or awards conferred after the death of the father or creator."
    }
  ],
  keyTerminology: [
    {
      term: "One Word Substitution",
      definition: "The replacement of a wordy sentence or phrase with a single, precise, and concise word conveying the exact same meaning."
    },
    {
      term: "Morpheme",
      definition: "The smallest meaningful morphological unit in a language that cannot be further divided (e.g., in-, -cide, -cracy)."
    },
    {
      term: "Root Word",
      definition: "The fundamental base unit of a word, typically of Greek or Latin origin, that carries the primary semantic significance."
    },
    {
      term: "Circumlocution",
      definition: "The use of many words where fewer would do, especially in a deliberate attempt to be vague; the exact opposite of One Word Substitution."
    },
    {
      term: "Phobia",
      definition: "An extreme, persistent, and irrational fear of a particular object, situation, activity, or person."
    },
    {
      term: "Mania",
      definition: "An excessive, uncontrollable enthusiasm, obsession, or craving for a particular thing or activity."
    },
    {
      term: "Homicide",
      definition: "The legal umbrella term for the killing of one human being by another, encompassing specific killings like patricide and regicide."
    },
    {
      term: "Connoisseur",
      definition: "A person with extensive, critical, and expert knowledge in the fine arts, gastronomy, or aesthetic matters."
    }
  ],
  sources: [
    {
      title: "Word Power Made Easy",
      author: "Norman Lewis",
      details: "Seminal chapters on personality types, medical practitioners, sciences, and systems of government."
    },
    {
      title: "High School English Grammar and Composition",
      author: "P. C. Wren & H. Martin",
      details: "Chapter on 'One Word Substitutions' and thematic vocabulary compilation."
    },
    {
      title: "Objective General English",
      author: "S. P. Bakshi (Arihant Publications)",
      details: "Comprehensive compilation of high-frequency one-word substitutions for state recruitment tests."
    },
    {
      title: "CG Vyapam General English Official Question Repository",
      author: "Chhattisgarh Professional Examination Board (CGPEB), Raipur",
      details: "Official previous year question papers from Patwari, RI, Hostel Warden, and Teacher recruitment exams."
    }
  ],
  confusionBuster: [
    {
      concept: "Apiary vs Aviary",
      confusion: "Swapping bee enclosures with bird enclosures.",
      clarity: "An **Apiary** is for **Bees** (Apiculture). An **Aviary** is for **Birds** (Avian). Remember: 'Ap' = Apis (bee); 'Av' = Aves (birds)."
    },
    {
      concept: "Egoist vs Egotist",
      confusion: "Treating egoist and egotist as identical.",
      clarity: "An **Egoist** is selfish and centered on self-interest. An **Egotist** is boastful and constantly talks about their own achievements ('t' for talk)."
    },
    {
      concept: "Entomology vs Etymology",
      confusion: "Confusing insect science with word origins.",
      clarity: "**Entomology** is the study of **Insects**. **Etymology** is the study of **Words and their historical origins**."
    },
    {
      concept: "Misanthrope vs Misogynist",
      confusion: "Confusing hatred of humanity with hatred of women.",
      clarity: "A **Misanthrope** hates all humankind ('anthropos'). A **Misogynist** hates or despises women specifically ('gyne')."
    },
    {
      concept: "Plutocracy vs Oligarchy",
      confusion: "Confusing government by the rich with government by a small group.",
      clarity: "**Plutocracy** is strictly rule by the **Wealthy class**. **Oligarchy** is rule by a **Small group or cartel**, regardless of whether their power stems from wealth, military, or royalty."
    }
  ],
  faqList: [
    {
      question: "How does learning root words assist in solving One Word Substitutions?",
      answer: "Roots function like master keys. For example, knowing that '-cide' means killing, 'theo-' means religion, and '-phobia' means fear enables you to deduce the meaning of hundreds of unfamiliar words instantaneously."
    },
    {
      question: "What is the difference between an 'Antidote' and a 'Panacea'?",
      answer: "An 'Antidote' is a medicine or chemical that counteracts a specific poison. A 'Panacea' is a universal remedy or cure-all for all diseases or problems."
    },
    {
      question: "What is the substitution for a doctor who specializes in skin diseases?",
      answer: "A 'Dermatologist' (from Greek 'derma' meaning skin, and '-logist' meaning one who studies/practices)."
    },
    {
      question: "What is the term for a handwriting expert or someone skilled in beautiful lettering?",
      answer: "A 'Calligrapher' (from Greek 'kallos' beauty + 'graphein' to write); the art itself is 'Calligraphy'."
    },
    {
      question: "What do we call a post or office for which no salary is paid?",
      answer: "An 'Honorary' post (working without receiving payment). Conversely, a post with high salary but no work is a 'Sinecure'."
    }
  ],
  oneLinerRevision: [
    "An Apiary is where bees are kept; an Aviary is where birds are kept.",
    "A Teetotaler is a person who completely abstains from drinking alcohol.",
    "A Panacea is a universal remedy or cure for all diseases and difficulties.",
    "A Numismatist collects coins; a Philatelist collects postage stamps.",
    "Entomology is the study of insects; Etymology is the study of word origins.",
    "Regicide is the murder of a king; Genocide is the extermination of a race.",
    "A Plutocracy is government by the rich; an Aristocracy is government by nobility.",
    "A Somnambulist walks in sleep; a Somniloquist talks in sleep.",
    "Claustrophobia is the fear of enclosed spaces; Acrophobia is the fear of heights.",
    "Incorrigible means incapable of being corrected, reformed, or improved."
  ],
  rapidRevision: {
    points: [
      "Killings (-cide): Patricide (father), Matricide (mother), Fratricide (brother), Regicide (king), Genocide (race).",
      "Governments (-cracy/-archy): Plutocracy (rich), Aristocracy (nobles), Theocracy (priests), Oligarchy (few), Anarchy (no rule).",
      "Phobias: Claustrophobia (closed spaces), Acrophobia (heights), Hydrophobia (water), Xenophobia (foreigners).",
      "Habits: Teetotaler (no alcohol), Somnambulist (sleepwalker), Polyglot (many languages), Incorrigible (cannot be reformed).",
      "Places: Apiary (bees), Aviary (birds), Archive (records), Arsenal (weapons), Mortuary (corpses).",
      "Sciences: Ornithology (birds), Entomology (insects), Etymology (word roots), Numismatics (coins)."
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
