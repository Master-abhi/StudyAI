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
  chapterId: 'cgv_master_sub_6_ch_3',
  topicId: 'eng_verb_1',
  title: 'Subject-Verb Agreement (Concord) - Rules, Exceptions & Vyapam Formulas',
  subjectName: 'English Language',
  chapterName: 'Verb Forms',
  overview: {
    introduction: 'Subject-Verb Agreement (also called Subject-Verb Concord) is the golden grammatical rule stating that the finite verb in a sentence must always agree with its real grammatical subject in both Person (1st, 2nd, 3rd) and Number (Singular or Plural). A singular subject requires a singular verb (e.g., "The boy plays"), while a plural subject requires a plural verb (e.g., "The boys play"). While this foundational rule appears elementary, complex sentence patterns—such as compound subjects joined by "and", intervening prepositional phrases ("as well as", "along with"), correlative conjunctions ("neither... nor"), collective nouns, and nouns that appear plural but are singular in meaning—create significant traps. In CG Vyapam examinations, Subject-Verb Agreement is the single most heavily tested grammar topic, appearing in 3 to 5 questions in error detection, sentence correction, and fill-in-the-blanks.',
    importance: 'Subject-verb agreement is the backbone of English syntax. Almost 40% of all error-spotting questions in competitive exams hinge on locating the true subject and matching it with the correct auxiliary or main verb.',
    examRelevance: 'Examiners consistently target: "Bread and butter" / "Rice and curry" taking singular verbs, "Neither he nor his friends were" (proximity rule), "The captain along with his soldiers was" (first subject rule), "A number of" (plural) vs "The number of" (singular), and nouns like "Cattle", "Police", "Mathematics", and "News".',
    quickFacts: [
      'Basic Rule: Singular Subject $\\rightarrow$ Singular Verb (with -s/es in present tense); Plural Subject $\\rightarrow$ Plural Verb (base form without -s/es).',
      'Two nouns joined by "and" expressing a single unified idea/dish take a SINGULAR verb (e.g., "Bread and butter is his favorite breakfast").',
      'If two singular nouns are joined by "and" and preceded by an article on the FIRST noun only $\\rightarrow$ One person $\\rightarrow$ Singular Verb.',
      'If both nouns take an article $\\rightarrow$ Two different persons $\\rightarrow$ Plural Verb.',
      'With "as well as, along with, together with, in addition to, accompanied by, with, like, unlike" $\\rightarrow$ Verb agrees strictly with the FIRST Subject.',
      'With "either...or, neither...nor, not only...but also" $\\rightarrow$ Verb agrees with the NEAREST (closest) Subject.',
      '"A number of + plural noun" takes a PLURAL verb; "The number of + plural noun" takes a SINGULAR verb.',
      '"Cattle", "People", "Police", "Gentry", "Poultry" are always plural and take a PLURAL verb.'
    ]
  },
  chapters: [
    {
      id: 'ch_1',
      title: '1. The Core Concord Principle & Compound Subjects Joined by "And"',
      content: '**The Golden Rule of Concord**:\n$$\\text{Singular Subject} \\longrightarrow \\text{Singular Verb (is, was, has, does, V1-s/es)}$$\n$$\\text{Plural Subject} \\longrightarrow \\text{Plural Verb (are, were, have, do, V1)}$$\n- Singular: *"The dog barks."* | *"She has a pen."*\n- Plural: *"The dogs bark."* | *"They have pens."*\n\n**Compound Subjects Joined by "AND" - The 3 Key Scenarios**:\n\n1. **Standard Plural Rule**: Two or more singular nouns joined by "and" normally take a **PLURAL** verb:\n   - *"Rohan and Sohan are brothers."*\n   - *"Fire and water do not agree."*\n\n2. **The "Single Idea / Meal" Exception (Vyapam Core Question)**:\n   - When two nouns joined by "and" express a single collective concept, dish, or pair considered as a unit, they take a **SINGULAR** verb:\n   - *"Bread and butter is my daily breakfast."*\n   - *"Rice and curry is a popular dish in Chhattisgarh."*\n   - *"Slow and steady wins the race."*\n   - *"The horse and carriage is at the door."*\n   - *"Hammer and sickle is the emblem."*\n   - *"Time and tide waits for no man."* (Traditional proverb takes singular)\n\n3. **The "One Person vs Two Persons" Article Rule**:\n   - **One Article = One Person = Singular Verb**:\n     - *"The Director and Principal has arrived."* (The same individual holds both posts)\n     - *"The poet and philosopher is dead."*\n   - **Two Articles = Two Persons = Plural Verb**:\n     - *"The Director and the Principal have arrived."* (Two different individuals)\n     - *"The poet and the philosopher are dead."*'
    },
    {
      id: 'ch_2',
      title: '2. The Intervening Phrases Rule: First Subject Governs the Verb',
      content: '**The Prepositional & Parenthetical Phrase Rule (व्यापाम पेटेंट नियम)**:\nWhen two subjects are joined by phrases such as:\n- **as well as**\n- **along with / together with**\n- **with / accompanied by**\n- **in addition to**\n- **besides / except**\n- **like / unlike**\n- **rather than / and not**\n- **guided by / led by**\n\nThe verb agrees strictly with the **FIRST SUBJECT** (the real subject), completely ignoring the second subject and all intervening words!\n\n**Classic Examination Examples**:\n1. *"The captain (Singular), along with his sailors (Plural), was drowned."*\n   - The real subject is "The captain" (singular), so the verb must be **was**, NOT were!\n2. *"The teacher (Singular), as well as the students (Plural), was present at the meeting."*\n   - Verb agrees with "The teacher" $\\rightarrow$ **was**.\n3. *"The students (Plural), as well as the teacher (Singular), were present."*\n   - First subject is "The students" (plural) $\\rightarrow$ **were**.\n4. *"Silver (Singular), as well as gold, has fallen in price."*\n   - First subject is "Silver" $\\rightarrow$ **has**.\n5. *"He (Singular), and not his brothers, is responsible for this loss."*\n   - First subject is "He" $\\rightarrow$ **is**.\n6. *"The Prime Minister (Singular), accompanied by his ministers, has arrived."*\n   - First subject is "The Prime Minister" $\\rightarrow$ **has**.'
    },
    {
      id: 'ch_3',
      title: '3. The Proximity Rule: Correlative Conjunctions (Either-Or, Neither-Nor)',
      content: '**The Proximity (Nearness) Rule**:\nWhen two subjects are connected by:\n- **either ... or**\n- **neither ... nor**\n- **not only ... but also**\n- **or / nor**\n\nThe verb agrees in person and number with the **NEAREST SUBJECT** (the subject immediately preceding the verb):\n\n$$\\text{Subject 1} + \\text{neither/either} + \\text{Subject 2} + \\text{Verb (agrees with Subject 2)}$$\n\n**Exam Analysis & Standard Examples**:\n1. *"Neither the teacher nor the students were present."*\n   - Closest subject to the verb is "the students" (plural) $\\rightarrow$ **were**.\n2. *"Neither the students nor the teacher was present."*\n   - Closest subject to the verb is "the teacher" (singular) $\\rightarrow$ **was**.\n3. *"Either he or I am mistaken."*\n   - Closest subject is "I" $\\rightarrow$ **am** (agrees in person).\n4. *"Not only the principal but also the teachers were felicitated."*\n   - Closest subject is "the teachers" (plural) $\\rightarrow$ **were**.\n5. *"No boy or girl was late."*\n   - Both singular $\\rightarrow$ **was**.\n\n*Examiner Trap*: When constructing sentences with one singular and one plural subject, it is standard stylistic practice to place the plural subject second, so that the plural verb follows naturally (*"Neither the teacher nor the students were..."*).'
    },
    {
      id: 'ch_4',
      title: '4. Indefinite Pronouns, Distributives & Quantity Phrases',
      content: '**1. Always Singular Indefinite Pronouns (Take Singular Verbs)**:\n- Words ending in **-body, -one, -thing**:\n  - *everyone, everybody, everything, someone, somebody, something, no one, nobody, nothing, anyone, anybody, anything*.\n  - *"Everybody knows the answer."* (NOT "know").\n  - *"Nobody was present."*\n- **Each, Every, Either, Neither**:\n  - *"Each of the girls has a textbook."* (NOT "have").\n  - *"Neither of the two candidates was selected."* (NOT "were").\n  - *"Every boy and girl is required to attend."*\n\n**2. "A Number of" vs "The Number of" (The Classic Vyapam Question)**:\n- **A number of + Plural Noun $\\rightarrow$ PLURAL Verb** (means "many"):\n  - *"A number of students were absent yesterday."*\n- **The number of + Plural Noun $\\rightarrow$ SINGULAR Verb** (means a specific mathematical figure):\n  - *"The number of students in the class is fifty."*\n\n**3. Fractions, Percentages & Quantifiers with "Of" (The Noun-Governed Concord)**:\n- With words like **some of, all of, most of, half of, two-thirds of, percent of**:\n  - If followed by an **Uncountable Noun** $\\rightarrow$ **SINGULAR Verb**:\n    - *"Some of the milk is spoiled."*\n    - *"Two-thirds of the work was completed."*\n  - If followed by a **Plural Countable Noun** $\\rightarrow$ **PLURAL Verb**:\n    - *"Some of the students are absent."*\n    - *"Two-thirds of the books were sold."*\n\n**4. Collective Nouns (Unanimous vs Divided)**:\n- **United / Unanimous $\\rightarrow$ Singular Verb**:\n  - *"The jury was unanimous in its verdict."*\n  - *"The committee has submitted its report."*\n- **Divided in Opinion $\\rightarrow$ Plural Verb**:\n  - *"The jury were divided in their opinions."*\n  - *"The committee have taken their seats."*'
    },
    {
      id: 'ch_5',
      title: '5. Nouns Plural in Form but Singular in Meaning & Plural-Only Nouns',
      content: '**1. Plural in Form, but Singular in Meaning (Take Singular Verbs)**:\n- **Academic Disciplines / Subjects**: *Mathematics, Physics, Economics, Politics, Ethics, Linguistics, Statistics (as a subject)*.\n  - *"Mathematics is a challenging subject."* (NOT "are").\n  - *"Economics is taught by Dr. Sharma."*\n  - *Special Exception*: When preceded by a possessive pronoun ("my, his, their"), words like "Mathematics" refer to calculation abilities, and "Statistics" refers to data $\\rightarrow$ they take a **Plural Verb**:\n    - *"My mathematics are weak."* (My calculation skills are weak).\n- **Diseases**: *Measles, Mumps, Rickets, Shingles* $\\rightarrow$ Singular verb (*"Measles is an infectious disease"*).\n- **Games & Sports**: *Billiards, Darts, Chess, Athletics* $\\rightarrow$ Singular verb (*"Billiards is played worldwide"*).\n- **Titles of Books, Films, Countries**: *The Arabian Nights, Gulliver\'s Travels, The United States* $\\rightarrow$ Singular verb:\n  - *"The Arabian Nights is an entertaining book."*\n  - *"The United States has a powerful economy."*\n- **News**: *"The news is true."* (Never plural!).\n\n**2. Nouns Without Singular Form (Always Plural $\\rightarrow$ Take Plural Verbs)**:\n- **Instruments of Two Parts**: *scissors, shears, tongs, pliers, pincers, binoculars, spectacles, glasses*.\n  - *"My scissors are sharp."* (Note: *"A pair of scissors is on the table"* $\\rightarrow$ "pair" is singular).\n- **Articles of Dress**: *trousers, pants, jeans, shorts, pyjamas* $\\rightarrow$ *"His trousers were torn."*\n- **Collective People & Animals (No -s, but Plural)**: *cattle, police, people, gentry, poultry, clergy, folk*:\n  - *"The cattle are grazing in the meadow."* (NOT "is").\n  - *"The police have arrested the culprit."* (NOT "has").\n\n**3. Units of Measurement, Money, Distance, Time (Treated as a Single Whole)**:\n- When a plural noun denotes a specific quantity, distance, or sum of money considered as a single unit, the verb is **SINGULAR**:\n  - *"Ten thousand rupees is a large sum."* (NOT "are").\n  - *"Five kilometers is a long distance to walk."*\n  - *"Fifty years is a long time."*'
    }
  ],
  comparativeTables: [
    {
      title: 'Subject-Verb Agreement: Master Rules Matrix',
      headers: ['Rule / Connecting Element', 'Governing Subject for Verb Concord', 'Verb Type', 'Standard Sentence Example'],
      rows: [
        ['Compound with "And" (Distinct)', 'Both Subjects together', 'Plural Verb', 'Rohan and Sohan are studying.'],
        ['Compound with "And" (Single Unit/Dish)', 'The unified concept', 'Singular Verb', 'Bread and butter is wholesome food.'],
        ['One Article with Two Nouns', 'The single person holding two roles', 'Singular Verb', 'The President and Chairman has arrived.'],
        ['Two Articles with Two Nouns', 'Two separate individuals', 'Plural Verb', 'The President and the Chairman have arrived.'],
        ['As well as, along with, together with', 'The FIRST Subject', 'Agrees with Subject 1', 'The captain, with his crew, was lost.'],
        ['Either...or, neither...nor, or', 'The NEAREST Subject', 'Agrees with Subject 2', 'Neither the boys nor the master was present.'],
        ['Each of, Either of, Neither of', 'The singular indefinite pronoun', 'Singular Verb', 'Each of the players was rewarded.'],
        ['A number of + Plural Noun', 'A number of (= many)', 'Plural Verb', 'A number of applicants were rejected.'],
        ['The number of + Plural Noun', 'The number (= specific count)', 'Singular Verb', 'The number of applicants was small.'],
        ['Nouns ending in -s (Maths, News)', 'The singular concept/discipline', 'Singular Verb', 'No news is good news.']
      ]
    },
    {
      title: 'Plural-Looking Singular Nouns vs Singular-Looking Plural Nouns',
      headers: ['Category', 'Nouns in This Group', 'Grammatical Concord', 'Sentence Example'],
      rows: [
        ['Academic Subjects', 'Mathematics, Physics, Politics, Economics, Ethics', 'Always SINGULAR', 'Physics is an intriguing branch of science.'],
        ['Diseases & Games', 'Measles, Mumps, Rickets, Billiards, Darts', 'Always SINGULAR', 'Mumps is an uncomfortable disease.'],
        ['Proper Titles & Books', 'The Arabian Nights, Gulliver\'s Travels, The USA', 'Always SINGULAR', 'Gulliver\'s Travels was written by Swift.'],
        ['People & Animals (No -s)', 'Cattle, Police, People, Gentry, Poultry, Clergy', 'Always PLURAL', 'The police are investigating the robbery.'],
        ['Tools & Clothes (Two Parts)', 'Scissors, Trousers, Spectacles, Binoculars, Tongs', 'Always PLURAL', 'Where are my spectacles?'],
        ['Fixed Units (Money/Distance)', 'Ten miles, Fifty thousand rupees, Five hours', 'Always SINGULAR', 'Ten miles is not a long distance by car.']
      ]
    },
    {
      title: 'Quantifier Concord: "A Number of" vs "The Number of" vs Fractions',
      headers: ['Structure', 'Meaning / Interpretation', 'Verb Required', 'Examination Example'],
      rows: [
        ['A number of + Plural Noun', 'Indefinite large quantity (= many)', 'PLURAL Verb', 'A number of students have passed the test.'],
        ['The number of + Plural Noun', 'A specific definite numerical count', 'SINGULAR Verb', 'The number of accidents has decreased.'],
        ['Some of / Most of + Uncountable', 'A portion of a continuous mass', 'SINGULAR Verb', 'Most of the milk was consumed.'],
        ['Some of / Most of + Plural Noun', 'A portion of countable entities', 'PLURAL Verb', 'Most of the teachers are dedicated.'],
        ['Half of / One-third of + Uncountable', 'A fraction of a mass/whole', 'SINGULAR Verb', 'Half of the land is barren.'],
        ['Half of / One-third of + Plural Noun', 'A fraction of counted members', 'PLURAL Verb', 'Half of the apples were rotten.']
      ]
    }
  ],
  pyqs: [
    {
      question: 'Fill in the blank with the correct verb: "Bread and butter _______ his daily breakfast."',
      options: [
        'is',
        'are',
        'were',
        'have been'
      ],
      answer: 'is',
      explanation: 'When two nouns joined by "and" express a single collective concept or unified dish ("Bread and butter"), they take a singular verb. Therefore, "is" is the correct answer.',
      year: '2023',
      exam: 'CG Vyapam संयुक्त भर्ती परीक्षा'
    },
    {
      question: 'Choose the correct form of the verb: "The captain, along with his soldiers, _______ killed in the battle."',
      options: [
        'were',
        'was',
        'are',
        'have been'
      ],
      answer: 'was',
      explanation: 'When two subjects are joined by "along with", "as well as", or "together with", the verb agrees strictly with the first subject ("The captain" - singular). Hence, "was" is correct.',
      year: '2022',
      exam: 'CG Vyapam पटवारी भर्ती'
    },
    {
      question: 'Fill in the blank: "Neither of the two books _______ interesting."',
      options: [
        'are',
        'were',
        'is',
        'have been'
      ],
      answer: 'is',
      explanation: '"Neither of + plural noun" takes a singular verb because "neither" refers to each item individually (not one and not the other). Thus, "is" is correct.',
      year: '2021',
      exam: 'CG Vyapam खाद्य निरीक्षक'
    },
    {
      question: '"The number of students in our college _______ increasing rapidly."',
      options: [
        'is',
        'are',
        'were',
        'have been'
      ],
      answer: 'is',
      explanation: '"The number of" denotes a specific singular collective figure and strictly takes a singular verb ("is"), unlike "A number of" which takes a plural verb.',
      year: '2019',
      exam: 'CG Vyapam DEO'
    },
    {
      question: 'Identify the grammatically correct sentence:',
      options: [
        'The cattle is grazing in the field.',
        'The cattles are grazing in the field.',
        'The cattle are grazing in the field.',
        'The cattles is grazing in the field.'
      ],
      answer: 'The cattle are grazing in the field.',
      explanation: '"Cattle" is a plural noun that does not take an "s", and it always takes a plural verb ("are grazing").',
      year: '2018',
      exam: 'CG Vyapam शिक्षक पात्रता परीक्षा (TET)'
    },
    {
      question: 'Fill in the blank: "Mathematics _______ a difficult subject for many students."',
      options: [
        'is',
        'are',
        'were',
        'have been'
      ],
      answer: 'is',
      explanation: 'Names of academic subjects ending in "-s" (Mathematics, Physics, Economics) are singular in meaning and take a singular verb ("is").',
      year: '2017',
      exam: 'CG Vyapam छात्रावास अधीक्षक'
    }
  ],
  mcqs: [
    {
      question: '"Neither the teacher nor the students _______ present in the hall."',
      options: ['was', 'were', 'is', 'has been'],
      answer: 'were',
      explanation: 'In "neither... nor", the verb agrees with the nearest subject. Here, "the students" is plural, so the verb must be plural ("were").'
    },
    {
      question: 'Fill in the blank: "Ten thousand rupees _______ a handsome salary for a beginner."',
      options: ['is', 'are', 'were', 'have been'],
      answer: 'is',
      explanation: 'A specific sum of money considered as a single unit or package takes a singular verb ("is").'
    },
    {
      question: '"The jury _______ divided in their opinion regarding the case."',
      options: ['was', 'were', 'is', 'has been'],
      answer: 'were',
      explanation: 'When members of a collective noun (jury, committee) are divided in their opinion or act individually, the collective noun takes a plural verb ("were").'
    },
    {
      question: 'Fill in the blank: "The police _______ patrolling the streets at night."',
      options: ['is', 'was', 'are', 'has been'],
      answer: 'are',
      explanation: '"Police" is a plural noun and always takes a plural verb ("are patrolling").'
    },
    {
      question: '"Each and every student _______ rewarded by the Governor."',
      options: ['was', 'were', 'are', 'have been'],
      answer: 'was',
      explanation: '"Each and every" emphasizes individuality and always takes a singular noun and a singular verb ("was").'
    },
    {
      question: 'Identify the sentence with an error:',
      options: [
        'Slow and steady wins the race.',
        'The poet and the singer are arriving.',
        'A large number of people was gathered there.',
        'Every man and woman was happy.'
      ],
      answer: 'A large number of people was gathered there.',
      explanation: '"A large number of people" functions as a plural subject and requires a plural verb ("were gathered", NOT "was gathered").'
    },
    {
      question: 'Fill in the blank: "Not only the father but also his sons _______ involved in the business."',
      options: ['is', 'was', 'are', 'has been'],
      answer: 'are',
      explanation: 'In "not only... but also", the verb agrees with the closest subject ("his sons" - plural), hence "are" is correct.'
    },
    {
      question: '"A pair of scissors _______ kept in the top drawer."',
      options: ['is', 'are', 'were', 'have been'],
      answer: 'is',
      explanation: 'Although "scissors" is plural, the subject here is "A pair" (singular), which takes a singular verb ("is").'
    }
  ],
  keyTerminology: [
    {
      term: 'Subject-Verb Concord',
      definition: 'The grammatical requirement that a finite verb must match its subject in both number (singular/plural) and person (1st/2nd/3rd).'
    },
    {
      term: 'Proximity Rule',
      definition: 'The principle in correlative structures (either...or, neither...nor) where the verb agrees with the subject closest to it.'
    },
    {
      term: 'Intervening Phrase',
      definition: 'A parenthetical phrase (e.g., as well as, along with) inserted between the subject and verb that has no effect on verb concord.'
    },
    {
      term: 'Pluralia Tantum',
      definition: 'Nouns that exist only in plural form and have no singular equivalent (e.g., scissors, trousers, cattle, police).'
    },
    {
      term: 'Noun of Multitude',
      definition: 'A collective noun viewed as individual distinct members rather than a single unit, requiring a plural verb.'
    },
    {
      term: 'Compound Subject',
      definition: 'A subject composed of two or more nouns or pronouns linked by a conjunction such as "and", "or", or "nor".'
    },
    {
      term: 'Dummy Pronoun (There)',
      definition: 'An introductory "there" where verb concord is governed by the subsequent real subject (e.g., "There is a book", "There are books").'
    },
    {
      term: 'Singular Mass Quantity',
      definition: 'A plural measurement of money, time, distance, or weight viewed as a single consolidated amount, taking a singular verb.'
    }
  ],
  sources: [
    {
      name: 'High School English Grammar & Composition',
      author: 'Wren & Martin (Revised by N.D.V. Prasada Rao)',
      relevance: 'The foundational reference for Subject-Verb Agreement rules and classical exceptions.'
    },
    {
      name: 'Practical English Usage',
      author: 'Michael Swan (Oxford University Press)',
      relevance: 'Authoritative explanations on proximity rules, neither...nor, and collective nouns.'
    },
    {
      name: 'A Practical English Grammar',
      author: 'A. J. Thomson and A. V. Martinet',
      relevance: 'Detailed breakdown of fractions, "a number of" vs "the number of", and as well as structures.'
    },
    {
      name: 'CG Vyapam General English Question Bank',
      author: 'Vyapam Examination Directorate (2012-2024)',
      relevance: 'Compilation of 150+ past year questions on subject-verb agreement and error detection.'
    }
  ],
  confusionBuster: [
    {
      doubt: 'Why is "Bread and butter is my breakfast" correct, while "Rohan and Sohan is my friends" is wrong?',
      clarification: '"Rohan and Sohan" are two separate human beings, so they take a plural verb ("are"). "Bread and butter" is treated as a single unified food item/dish eaten together as one breakfast, so it takes a singular verb ("is").'
    },
    {
      doubt: 'What is the trick for "as well as" and "along with"?',
      clarification: 'Put imaginary parentheses around the phrase starting with "as well as" or "along with" up to the verb! Look ONLY at the first word before the phrase. E.g., "The teacher (as well as the boys) WAS present". Since "The teacher" is singular, the verb is "was"!'
    },
    {
      doubt: 'How can I easily remember "A number of" vs "The number of"?',
      clarification: '"A number of" starts with indefinite article "A" and means "many" (A lot of) $\\rightarrow$ takes PLURAL verb ("A number of boys ARE absent"). "The number of" starts with "The" and refers to ONE specific mathematical number $\\rightarrow$ takes SINGULAR verb ("The number of boys IS fifty").'
    },
    {
      doubt: 'Why does "Neither he nor I am" use "am"?',
      clarification: 'Because with "neither... nor", the verb agrees with the subject closest to it. "I" is the closest subject to the verb, and "I" takes "am", so the verb is "am"!'
    },
    {
      doubt: 'Is "Police" singular or plural?',
      clarification: '"Police" is ALWAYS plural in English grammar and takes a plural verb: "The police have arrested the thief" (NOT "The police has"). If you want a singular noun, use "a police officer" or "a policeman".'
    }
  ],
  faqList: [
    {
      question: 'What is Subject-Verb Agreement?',
      answer: 'It is the grammatical rule that the verb in a sentence must match the subject in number (singular/plural) and person (1st/2nd/3rd).'
    },
    {
      question: 'Which subject determines the verb with "either... or"?',
      answer: 'The subject that is closest (nearest) to the verb determines its number and person.'
    },
    {
      question: 'Why do words like "Mathematics" and "Physics" take singular verbs?',
      answer: 'Because although they end in "-s", they are the names of single academic disciplines and represent a singular concept.'
    },
    {
      question: 'When do collective nouns take a plural verb?',
      answer: 'When the individual members of the group are divided in opinion or are acting separately as individuals (e.g., "The committee were divided in their opinions").'
    },
    {
      question: 'How is Subject-Verb Agreement tested in CG Vyapam?',
      answer: 'Heavily tested in error detection sentences with intervening phrases (as well as, along with), neither...nor, and "a number of" vs "the number of".'
    }
  ],
  oneLinerRevision: [
    'A singular subject takes a singular verb; a plural subject takes a plural verb.',
    'Nouns joined by "and" expressing a single unified concept/dish take a singular verb (Bread and butter is wholesome).',
    'One article with two nouns = one person (singular verb); two articles = two persons (plural verb).',
    'With "as well as", "along with", and "together with", the verb agrees strictly with the FIRST subject.',
    'With "either...or" and "neither...nor", the verb agrees with the NEAREST subject.',
    '"Each of", "Either of", and "Neither of" are strictly followed by a singular verb.',
    '"A number of + plural noun" takes a plural verb; "The number of + plural noun" takes a singular verb.',
    '"Cattle", "Police", "People", and "Gentry" are plural nouns that take plural verbs.',
    'Nouns like Mathematics, Physics, News, and Measles are singular in meaning and take singular verbs.',
    'Specific measurements of money, time, and distance treated as a whole take a singular verb (Ten miles is a long walk).'
  ],
  rapidRevision: {
    points: [
      'Bread and butter IS | Rice and curry IS | Slow and steady WINS',
      'The Director and Principal IS (1 person) | The Director and the Principal ARE (2 persons)',
      'Sub 1 + as well as / along with + Sub 2 $\\rightarrow$ Verb agrees with SUB 1',
      'Either/Neither Sub 1 + or/nor + Sub 2 $\\rightarrow$ Verb agrees with SUB 2 (closest)',
      'A number of $\\rightarrow$ PLURAL verb | The number of $\\rightarrow$ SINGULAR verb',
      'Each / Every / Everyone / Nobody $\\rightarrow$ SINGULAR verb',
      'Police / Cattle / People $\\rightarrow$ PLURAL verb',
      'Mathematics / Physics / News $\\rightarrow$ SINGULAR verb'
    ],
    formula: 'Sub 1 + along with/as well as + Sub 2 = Verb(Sub 1) | Either/Neither + or/nor = Verb(Nearest Sub) | A number of = Plural | The number of = Singular',
    examTips: [
      'Vyapam Shortcut: In sentences with "along with" or "as well as", ignore everything from the phrase to the verb! Look only at the first word to decide singular vs plural!',
      'Watch out for "Neither of the boys": remember that "Neither of" ALWAYS takes a singular verb ("is/was/has"), no matter how many boys there are!'
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = 'cgv_master_eng_verb_1';
    const sanitized = sanitizeForFirestore(noteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    await markTopicCompleted('cgv_master_sub_6', 'cgv_master_sub_6_ch_3', 'eng_verb_1');
    console.log('Topic eng_verb_1 (Subject Verb Agreement) completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
