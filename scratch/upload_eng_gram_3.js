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
  if (Array.isArray(obj)) {
    if (obj.length > 0 && Array.isArray(obj[0])) {
      return obj.map(row => ({ cells: row.map(cell => (cell === undefined ? null : cell)) }));
    }
    return obj.map(item => sanitizeForFirestore(item));
  }
  if (obj !== null && typeof obj === 'object') {
    const cleanObj = {};
    for (const key of Object.keys(obj)) {
      cleanObj[key] = sanitizeForFirestore(obj[key]);
    }
    return cleanObj;
  }
  return obj === undefined ? null : obj;
}

async function markTopicCompleted(subjectId, chapterId, topicId) {
  const syllabusRef = db.collection('syllabi').doc('cgv_master');
  const doc = await syllabusRef.get();
  if (!doc.exists) return;
  const data = doc.data();
  const sub = data.subjects?.find(s => s.id === subjectId);
  if (!sub) return;
  const ch = sub.chapters?.find(c => c.id === chapterId);
  if (!ch) return;
  const top = ch.topics?.find(t => t.id === topicId);
  if (!top) return;

  top.hasStudyNotes = true;
  await syllabusRef.update({ subjects: data.subjects });
  console.log(`[Syllabus Synced] hasStudyNotes: true for ${topicId}`);
}

const noteData = {
  subjectId: 'cgv_master_sub_6',
  chapterId: 'cgv_master_sub_6_ch_1',
  topicId: 'eng_gram_3',
  title: 'Determiners - Quantifiers, Distributives, Demonstratives & Usage Rules',
  subjectName: 'English Language',
  chapterName: 'Grammar Fundamentals',
  overview: {
    introduction: 'A Determiner is a modifying word placed immediately before a noun or noun phrase to specify its reference, quantity, possession, or definiteness. Unlike descriptive adjectives (which describe qualities like color or size), determiners determine "which one", "whose", or "how much/many". In modern English grammar, determiners encompass six broad categories: Articles (a, an, the), Demonstratives (this, that, these, those), Possessives (my, your, his, her, its, our, their), Quantifiers (some, any, much, many, few, little), Distributives (each, every, either, neither), and Interrogatives (which, what, whose). In CG Vyapam examinations, determiners constitute a vital part of sentence completion, cloze tests, and error spotting with 2 to 3 questions asked consistently.',
    importance: 'The distinction between countable and uncountable determiners (e.g., few vs little, many vs much) and subtle pragmatic contrasts (e.g., some in polite questions vs any in negative sentences) are high-yield scoring topics that trap unprepared candidates.',
    examRelevance: 'Key Vyapam focal points include: "few / a few / the few" vs "little / a little / the little", "each" vs "every", "some" vs "any", "either / neither" with singular verbs, and "another" vs "other".',
    quickFacts: [
      'Determiners always precede the noun and any descriptive adjectives (e.g., "all the brave soldiers").',
      'Quantifiers with Uncountable Nouns = much, little, a little, the little, a great deal of.',
      'Quantifiers with Countable Nouns = many, few, a few, the few, a number of, several.',
      '"Little" and "Few" (without article) have a negative meaning (= almost none / hardly any).',
      '"A little" and "A few" have a positive meaning (= some at least).',
      '"The little" and "The few" mean "not much/many, but all that is available".',
      '"Some" is used in affirmative sentences and polite requests (e.g., "Would you like some tea?").',
      '"Any" is used in negative sentences and general questions (e.g., "I do not have any money").'
    ]
  },
  chapters: [
    {
      id: 'ch_1',
      title: '1. Definition, Syntactic Role & Classification of Determiners',
      content: '**What is a Determiner?**:\n- A determiner is a word that introduces a noun and provides contextual information regarding quantity, possession, or specificity.\n- Key Characteristic: A noun cannot normally be preceded by two central determiners of the same type (we cannot say *"the my car"* or *"this a book"*).\n\n**The 6 Major Classes of Determiners**:\n1. **Articles**: *a, an, the*.\n2. **Demonstratives**: *this, that* (singular); *these, those* (plural).\n   - *This/These* point to near entities; *That/Those* point to distant entities.\n3. **Possessives**: *my, your, his, her, its, our, their* (must be followed by a noun; distinct from possessive pronouns like mine, yours).\n4. **Quantifiers (मात्रा एवं संख्या वाचक)**:\n   - *some, any, much, many, all, no, little, few, several, enough, more, less*.\n5. **Distributives (वितरणवाचक)**:\n   - *each, every, either, neither*.\n6. **Interrogatives & Relatives**:\n   - *what, which, whose* (e.g., *"Which book do you want?"*).'
    },
    {
      id: 'ch_2',
      title: '2. Countable vs Uncountable Quantifiers: Much vs Many & Little vs Few',
      content: '**1. Much vs Many (व्यापाम कोर नियम)**:\n- **Much**: Used exclusively with **Uncountable Nouns** to denote quantity (answers "How much?"):\n  - *"How much milk is left?"* | *"He does not have much patience."* | *"Much damage was caused."*\n- **Many**: Used exclusively with **Plural Countable Nouns** to denote number (answers "How many?"):\n  - *"Many students were present."* | *"How many pens do you have?"*\n- **Rule on "Many a" (Super Trap)**:\n  - *"Many a"* is followed by a **Singular Noun** and takes a **Singular Verb**!\n  - Correct: *"Many a soldier was killed in the war."* (NOT "Many a soldiers were killed").\n\n**2. The Triad: Little / A Little / The Little (With Uncountable Nouns)**:\n- **Little** (= Hardly any / Almost nil / न के बराबर):\n  - Negative sense: *"He has little knowledge of computers, so he cannot do this job."*\n- **A Little** (= Some quantity / थोड़ा-बहुत):\n  - Positive sense: *"A little knowledge is a dangerous thing."* | *"There is a little milk in the fridge, enough for tea."*\n- **The Little** (= Not much, but all that there is / जो थोड़ा-बहुत सब):\n  - Specific sense: *"He spent the little money he had."* (Whatever small amount he had, he spent all of it).\n\n**3. The Triad: Few / A Few / The Few (With Plural Countable Nouns)**:\n- **Few** (= Almost none / नगण्य):\n  - Negative sense: *"He has few friends, so he feels lonely."*\n- **A Few** (= A small number / कुछ):\n  - Positive sense: *"A few students passed the examination."*\n- **The Few** (= Not many, but all of them / जो कुछ थोड़े-बहुत सब):\n  - Specific sense: *"The few books he had were stolen."*'
    },
    {
      id: 'ch_3',
      title: '3. Indefinite Determiners: Some vs Any & Each vs Every',
      content: '**1. Some vs Any (व्यापाम पेटेंट कन्फ्यूजन)**:\n- **General Rule**:\n  - **Some** is used in **Affirmative (Positive)** sentences:\n    - *"I have some good news for you."* | *"There is some water in the glass."*\n  - **Any** is used in **Negative** sentences and **General Questions**:\n    - *"I do not have any money."* | *"Did you buy any apples?"*\n- **Crucial Exception: Offers and Polite Requests**:\n  - When a question is an offer, invitation, or polite request expecting a "Yes" answer, use **SOME**, not ANY:\n    - *"Would you like some tea?"* (Offer $\\rightarrow$ Correct)\n    - *"Could you lend me some money?"* (Polite request $\\rightarrow$ Correct)\n- **Exception: "Any" in Affirmative Sentences**:\n  - "Any" can be used in an affirmative sentence when it means "it does not matter which / anyone you choose":\n    - *"You can take any bus from this stand; all go to the station."*\n\n**2. Each vs Every (Individual vs Collective Distinction)**:\n- **Each**:\n  - Refers to two or more individuals considered **one by one (individually)**.\n  - Can be used for **two** or more than two: *"Each of the two boys won a prize."*\n  - Focuses on individual members of a group.\n- **Every**:\n  - Refers to a group of **more than two** considered collectively (all members without exception).\n  - Cannot be used for only two: *"Every boy in the class passed."* (Class has more than 2 boys).\n- Both "Each" and "Every" are followed by a **Singular Countable Noun** and take a **Singular Verb**:\n  - *"Each student has a pen."* | *"Every citizen must obey the law."*'
    },
    {
      id: 'ch_4',
      title: '4. Distributive & Dual Determiners: Either, Neither, Both & Another vs Other',
      content: '**1. Either & Neither (Dual Determiners - For Exactly Two Entities)**:\n- **Either** = One or the other of two (दो में से कोई एक):\n  - *"You can park on either side of the road."* (On one side or the other)\n- **Neither** = Not one and not the other of two (दो में से कोई भी नहीं):\n  - *"Neither statement is true."* (Both are false)\n- **Rule on Number**: Both "Either" and "Neither" take a **Singular Noun** and **Singular Verb**:\n  - *"Neither book was interesting."* (NOT "Neither books were")\n- *Note*: For more than two entities, use "Any / Anyone" instead of Either, and "None" instead of Neither:\n  - Two candidates $\\rightarrow$ *"Neither of the two candidates was selected."*\n  - Five candidates $\\rightarrow$ *"None of the five candidates was selected."*\n\n**2. Both vs All**:\n- **Both**: Refers to two entities together (takes plural verb: *"Both boys are smart"*).\n- **All**: Refers to three or more entities (or uncountable mass: *"All the water was wasted"*).\n\n**3. Another vs Other**:\n- **Another** (= An + other): Used with **Singular Countable Nouns** (means "one more" or "an additional one"):\n  - *"Would you like another cup of tea?"* | *"He bought another car."*\n- **Other**: Used with **Plural Countable Nouns** or **Uncountable Nouns**:\n  - *"Other students are waiting outside."* | *"Do you have any other information?"*\n- **The other**: Refers to the remaining one of two, or remaining ones of a group:\n  - *"One of his eyes was injured; the other was fine."*'
    },
    {
      id: 'ch_5',
      title: '5. CG Vyapam Traps, Subject-Verb Concord & Master Formulas',
      content: '**1. "Less" vs "Fewer" (Very Common Error Spotting Question)**:\n- **Less**: Used with **Uncountable Nouns** (amount/quantity):\n  - *"He consumes less sugar now."* | *"Less water was available."*\n- **Fewer**: Used with **Plural Countable Nouns** (number):\n  - *"Fewer students attended the lecture today."* (NOT "Less students attended").\n\n**2. Determiners followed by "of" (Pronoun Usage)**:\n- When a determiner is followed by "of the + plural noun", check the verb:\n  - *Each of the boys* $\\rightarrow$ **Singular Verb** (*has* won a prize).\n  - *One of the teachers* $\\rightarrow$ **Singular Verb** (*is* absent).\n  - *None of the food* $\\rightarrow$ **Singular Verb** (*was* fresh).\n  - *Many of the players* $\\rightarrow$ **Plural Verb** (*were* injured).\n\n**3. "All" and "Whole" Placement Rules**:\n- **All** is placed **BEFORE** the article: *"All the money was lost."*\n- **Whole** is placed **AFTER** the article: *"The whole country rejoiced."*\n\n**4. Quick Vyapam Elimination Shortcut**:\n- If noun is singular countable $\\rightarrow$ look for *each, every, another, a/an*.\n- If noun is plural countable $\\rightarrow$ look for *many, few, several, other, both*.\n- If noun is uncountable $\\rightarrow$ look for *much, little, less, a great deal of*.'
    }
  ],
  comparativeTables: [
    {
      title: 'Quantifier Determiners: Countable vs Uncountable Matrix',
      headers: ['Determiner Category', 'Used With Countable Nouns (Plural)', 'Used With Uncountable Nouns (Mass)', 'Used With Both Countable & Uncountable'],
      rows: [
        ['Large Quantity / Number', 'Many, a large number of, several', 'Much, a great deal of, a large amount of', 'A lot of, lots of, plenty of'],
        ['Small / Nil Quantity', 'Few, a few, the few, fewer', 'Little, a little, the little, less', 'No, none'],
        ['Indefinite Quantity', 'Some, any, enough', 'Some, any, enough', 'Some, any, enough'],
        ['Total / Dual', 'All, both, each, every', 'All, the whole', 'All'],
        ['Standard Example', 'Many students, few mistakes', 'Much patience, little water', 'Some pens, some ink']
      ]
    },
    {
      title: 'The Little vs The Few Triad: Definitive Comparison',
      headers: ['Form', 'Meaning / Polarity', 'Noun Type Required', 'Standard Sentence Example'],
      rows: [
        ['Little', 'Almost none (Negative)', 'Uncountable Noun', 'He has little hope of recovery (almost hopeless).'],
        ['A Little', 'Some, small amount (Positive)', 'Uncountable Noun', 'A little patience will solve the problem.'],
        ['The Little', 'Not much, but all of it (Specific)', 'Uncountable Noun', 'The cat drank the little milk left in the bowl.'],
        ['Few', 'Almost none (Negative)', 'Plural Countable Noun', 'He has few friends in this new city (lonely).'],
        ['A Few', 'Some, small number (Positive)', 'Plural Countable Noun', 'A few friends visited him in the hospital.'],
        ['The Few', 'Not many, but all of them (Specific)', 'Plural Countable Noun', 'The few friends he had deserted him in trouble.']
      ]
    },
    {
      title: 'Each vs Every vs Either vs Neither Quick Summary',
      headers: ['Determiner', 'Entities Involved', 'Syntactic Number', 'Verb Concord', 'Standard Exam Example'],
      rows: [
        ['Each', 'Two or more (individual focus)', 'Singular Noun', 'Singular Verb', 'Each of the two contestants has a chance.'],
        ['Every', 'Three or more (collective focus)', 'Singular Noun', 'Singular Verb', 'Every student was awarded a certificate.'],
        ['Either', 'Exactly two (one or the other)', 'Singular Noun', 'Singular Verb', 'You can take either road to reach the airport.'],
        ['Neither', 'Exactly two (not one, not the other)', 'Singular Noun', 'Singular Verb', 'Neither candidate was found suitable for the post.']
      ]
    }
  ],
  pyqs: [
    {
      question: 'Fill in the blank with the correct determiner: "There is _______ hope of his recovery as his condition is extremely critical."',
      options: [
        'little',
        'a little',
        'the little',
        'few'
      ],
      answer: 'little',
      explanation: 'Since his condition is "extremely critical", there is almost no hope (negative meaning). With the uncountable noun "hope", the negative quantifier is "little" (without an article).',
      year: '2023',
      exam: 'CG Vyapam संयुक्त भर्ती परीक्षा'
    },
    {
      question: '"Would you like _______ more coffee?" Choose the appropriate determiner:',
      options: [
        'any',
        'some',
        'much',
        'little'
      ],
      answer: 'some',
      explanation: 'Although this sentence is interrogative, it represents an offer/polite request where an affirmative response is expected. In polite offers, "some" is used instead of "any".',
      year: '2022',
      exam: 'CG Vyapam पटवारी भर्ती'
    },
    {
      question: 'Fill in the blank: "He has _______ friends because he is very rude to people."',
      options: [
        'a few',
        'few',
        'the few',
        'little'
      ],
      answer: 'few',
      explanation: '"Friends" is a plural countable noun. Since he is rude, he has almost no friends (negative polarity). The quantifier for "almost no" with countable nouns is "few".',
      year: '2021',
      exam: 'CG Vyapam खाद्य निरीक्षक'
    },
    {
      question: 'Identify the grammatically correct sentence:',
      options: [
        'Many a soldiers was killed in the battle.',
        'Many a soldier were killed in the battle.',
        'Many a soldier was killed in the battle.',
        'Many soldiers was killed in the battle.'
      ],
      answer: 'Many a soldier was killed in the battle.',
      explanation: 'The structure "Many a + Singular Countable Noun" takes a **Singular Verb**: "Many a soldier was killed...".',
      year: '2019',
      exam: 'CG Vyapam DEO'
    },
    {
      question: 'Fill in the blank: "There are _______ books on the table than yesterday."',
      options: [
        'less',
        'fewer',
        'little',
        'least'
      ],
      answer: 'fewer',
      explanation: '"Books" is a plural countable noun. The comparative degree for countable nouns is "fewer" (NOT "less", which is reserved for uncountable nouns).',
      year: '2018',
      exam: 'CG Vyapam शिक्षक पात्रता परीक्षा (TET)'
    },
    {
      question: '"Neither of the two boys _______ selected for the school team."',
      options: [
        'was',
        'were',
        'have been',
        'are'
      ],
      answer: 'was',
      explanation: '"Neither of" refers to two entities taken individually and always takes a singular verb: "Neither of the two boys was selected".',
      year: '2017',
      exam: 'CG Vyapam छात्रावास अधीक्षक'
    }
  ],
  mcqs: [
    {
      question: 'Fill in the blank: "_______ knowledge is a dangerous thing."',
      options: ['Little', 'A little', 'The little', 'Few'],
      answer: 'A little',
      explanation: 'The famous proverb is "A little knowledge is a dangerous thing" (meaning inadequate/partial knowledge without depth leads to mistakes).',
      year: '2020',
      exam: 'CG Vyapam RI'
    },
    {
      question: '"I have not got _______ money left in my bank account."',
      options: ['some', 'any', 'many', 'few'],
      answer: 'any',
      explanation: 'In negative sentences with uncountable nouns, "any" is the standard determiner: "have not got any money".',
      year: '2019',
      exam: 'CG Vyapam AG-3'
    },
    {
      question: 'Fill in the blank: "Each of the participants _______ presented with a memento."',
      options: ['was', 'were', 'have been', 'are'],
      answer: 'was',
      explanation: '"Each of + plural noun" takes a singular verb ("was presented").',
      year: '2021',
      exam: 'CG Vyapam Mandi Inspector'
    },
    {
      question: '"Can I have _______ slice of bread, please?"',
      options: ['other', 'another', 'others', 'more'],
      answer: 'another',
      explanation: '"Another" is used with singular countable nouns to mean "one more" or "an additional one".',
      year: '2022',
      exam: 'CG Vyapam Sub-Engineer'
    },
    {
      question: 'Fill in the blank: "_______ the money he inherited was wasted on gambling."',
      options: ['All', 'Whole', 'Both', 'Every'],
      answer: 'All',
      explanation: '"All" is placed before "the" ("All the money"); whereas "whole" is placed after "the" ("The whole amount").',
      year: '2018',
      exam: 'CG Vyapam Lab Assistant'
    },
    {
      question: 'Which determiner is used for two entities to mean "one or the other"?',
      options: ['Neither', 'Either', 'Every', 'All'],
      answer: 'Either',
      explanation: '"Either" refers to one or the other of exactly two entities.',
      year: '2017',
      exam: 'CG Vyapam VDO'
    },
    {
      question: '"He drank _______ water that remained in the flask."',
      options: ['little', 'a little', 'the little', 'few'],
      answer: 'the little',
      explanation: '"The little" means "not much, but all that was available" (referring specifically to the water that remained in the flask).',
      year: '2023',
      exam: 'CG Vyapam Mahila Supervisor'
    },
    {
      question: 'Identify the sentence with an error in the use of determiners:',
      options: [
        'There were fewer cars on the road today.',
        'He has less friends than his brother.',
        'Would you like some coffee?',
        'Neither road leads to the station.'
      ],
      answer: 'He has less friends than his brother.',
      explanation: '"Friends" is a plural countable noun, so it must take "fewer", not "less" (Correct: "fewer friends than his brother").',
      year: '2019',
      exam: 'CG Vyapam Assistant Gr-3'
    }
  ],
  keyTerminology: [
    {
      term: 'Determiner',
      definition: 'A closed-class word preceding a noun or noun phrase that establishes reference, quantity, possession, or definiteness.'
    },
    {
      term: 'Quantifier',
      definition: 'A determiner that expresses quantity, volume, or number (e.g., much, many, some, few, little).'
    },
    {
      term: 'Distributive Determiner',
      definition: 'A determiner referring to members of a group individually rather than collectively (e.g., each, every, either, neither).'
    },
    {
      term: 'Negative Polarity Item',
      definition: 'A word like "any" or "ever" that is syntactically restricted to negative clauses, questions, or conditional contexts.'
    },
    {
      term: 'Countable Determiner',
      definition: 'A determiner that can only modify countable nouns (e.g., many, several, few, fewer).'
    },
    {
      term: 'Uncountable Determiner',
      definition: 'A determiner that can only modify mass/uncountable nouns (e.g., much, little, less).'
    },
    {
      term: 'Dual Determiner',
      definition: 'A determiner that refers specifically to two persons or items (e.g., both, either, neither).'
    },
    {
      term: 'Concord',
      definition: 'The grammatical agreement between a determiner, the following noun, and the main finite verb in number and person.'
    }
  ],
  sources: [
    {
      name: 'High School English Grammar & Composition',
      author: 'Wren & Martin (Revised by N.D.V. Prasada Rao)',
      relevance: 'Standard rules for adjectives of quantity and number, each/every, some/any, few/little.'
    },
    {
      name: 'Practical English Usage',
      author: 'Michael Swan (Oxford University Press)',
      relevance: 'Nuanced distinctions between another vs other, much vs many, and some in questions.'
    },
    {
      name: 'A Practical English Grammar',
      author: 'Thomson and Martinet',
      relevance: 'Detailed syntax of determiners followed by "of the" and distributive pronouns.'
    },
    {
      name: 'CG Vyapam General English Question Bank',
      author: 'Vyapam Examination Board (2012-2024)',
      relevance: 'Compilation of 70+ past questions on determiners, quantifiers, and error detection.'
    }
  ],
  confusionBuster: [
    {
      doubt: 'What is the exact difference between "Few" and "A few"?',
      clarification: '"Few" without an article has a negative meaning: it means "almost none" or "hardly any" (e.g., "He has few friends" = he is lonely). "A few" has a positive meaning: it means "some" (e.g., "He has a few friends" = he has some friends, enough to socialize).'
    },
    {
      doubt: 'Can "Some" ever be used in questions?',
      clarification: 'Yes! While "any" is used in general questions seeking information ("Do you have any books?"), "some" is used when offering something or making a polite request where the answer is expected to be "Yes" (e.g., "Would you like some tea?", "Can you give me some advice?").'
    },
    {
      doubt: 'When should I use "Each" vs "Every"?',
      clarification: '"Each" is used for two or more items when focusing on individual items one by one (e.g., "Each of the two boys"). "Every" is used ONLY for more than two items when viewing the group collectively (e.g., "Every child needs love"). You can never say "Every of the two"!'
    },
    {
      doubt: 'Why is "less students" considered grammatically incorrect?',
      clarification: '"Students" is a plural countable noun. "Less" is used strictly for uncountable quantities (less milk, less sugar). The correct comparative determiner for countable nouns is "fewer" ("fewer students").'
    },
    {
      doubt: 'What verb follows "Many a soldier"?',
      clarification: 'Even though "many" means many, the construction "Many a + singular noun" requires a SINGULAR verb: "Many a soldier was killed" (NOT were killed).'
    }
  ],
  faqList: [
    {
      question: 'What is a determiner in English grammar?',
      answer: 'A determiner is a word placed before a noun to clarify what the noun refers to, how much or how many of it is being discussed, or who owns it.'
    },
    {
      question: 'What are the main types of determiners?',
      answer: 'The six types are: Articles (a, an, the), Demonstratives (this, that), Possessives (my, your), Quantifiers (some, any, much, many), Distributives (each, every, either, neither), and Interrogatives (which, whose).'
    },
    {
      question: 'What is the difference between "Little" and "A little"?',
      answer: '"Little" means practically none (negative sense), whereas "A little" means a small quantity or some (positive sense).'
    },
    {
      question: 'Why do "Each" and "Every" take singular verbs?',
      answer: 'Because both words distribute the action to individual members of a group one at a time, making the grammatical subject singular.'
    },
    {
      question: 'How are determiners tested in CG Vyapam?',
      answer: 'In fill-in-the-blanks with "few/a few/the few", "little/a little/the little", "some/any", and error spotting questions involving "fewer vs less" and "many a".'
    }
  ],
  oneLinerRevision: [
    'Determiners introduce nouns and clarify their quantity, reference, or definiteness.',
    '"Much" and "Little" modify uncountable nouns; "Many" and "Few" modify plural countable nouns.',
    '"Few" and "Little" convey a negative sense (= almost none).',
    '"A few" and "A little" convey a positive sense (= some).',
    '"The few" and "The little" mean not many/much, but all that is available.',
    '"Some" is used in positive statements and polite offers; "Any" in negative statements and questions.',
    '"Many a + singular noun" strictly takes a singular verb (Many a man has failed).',
    '"Fewer" is used for countable nouns; "Less" is used for uncountable nouns.',
    '"Each" can be used for two or more; "Every" is used only for more than two.',
    '"Either" and "Neither" apply to exactly two entities and take a singular verb.'
  ],
  rapidRevision: {
    points: [
      'Uncountable = much, little, a little, the little, less',
      'Countable = many, few, a few, the few, fewer, several',
      'Few / Little = Almost none (-) | A few / A little = Some (+)',
      'The few / The little = All that is available',
      'Some = Affirmative & Polite Offers | Any = Negative & General Questions',
      'Each (2+) vs Every (3+) | Either / Neither (exactly 2, singular verb)',
      'Many a + Singular Noun + Singular Verb'
    ],
    formula: 'Uncountable $\\rightarrow$ Much/Little/Less | Countable $\\rightarrow$ Many/Few/Fewer | Many a + N(Sing) + V(Sing)',
    examTips: [
      'Vyapam Trap: Check if the noun has an "s" (countable)! E.g., "less cars" is WRONG $\\rightarrow$ use "fewer cars"!',
      'Watch out for "Would you like..." questions: always select "some" (offer), not "any"!'
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = 'cgv_master_eng_gram_3';
    const sanitized = sanitizeForFirestore(noteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    await markTopicCompleted('cgv_master_sub_6', 'cgv_master_sub_6_ch_1', 'eng_gram_3');
    console.log('Topic eng_gram_3 (Determiners) completed successfully! Chapter 1 of English is now 100% complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
