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
  topicId: 'eng_gram_1',
  title: 'Parts of Speech - Comprehensive Classification, Identification & Rules',
  subjectName: 'English Language',
  chapterName: 'Grammar Fundamentals',
  overview: {
    introduction: 'In English grammar, words are categorized into eight fundamental classes known as "Parts of Speech" based on their syntactic function, meaning, and behavior in a sentence. These eight parts of speech are: Noun, Pronoun, Adjective, Verb, Adverb, Preposition, Conjunction, and Interjection. Understanding parts of speech is the absolute foundation for sentence structure, error spotting, fill in the blanks, and voice/narration transformations. In CG Vyapam exams (Patwari, RI, Hostel Warden, Sub-Inspector, Shikshak Bharti, and Combined Assistant Grade exams), identifying the correct part of speech of an underlined word and spotting word-class confusion errors are recurring questions.',
    importance: 'A single word can function as multiple parts of speech depending entirely on its context and position in a sentence (e.g., "fast" can be an Adjective, Adverb, Noun, or Verb). Mastering parts of speech eliminates common confusion and secures 2 to 3 direct marks in the English section.',
    examRelevance: 'Questions in CG Vyapam directly ask: "Identify the part of speech of the underlined word", differentiate Adjectives from Adverbs (e.g., lovely vs quickly), understand Gerunds vs Participles, and recognize Prepositions versus Conjunctions.',
    quickFacts: [
      'Total primary Parts of Speech in English = 8 (Noun, Pronoun, Adjective, Verb, Adverb, Preposition, Conjunction, Interjection).',
      'The part of speech of any word is determined strictly by its function in a sentence, not by its isolated dictionary appearance.',
      'Nouns act as subjects, objects, or complements (Naming words).',
      'Pronouns substitute nouns to prevent repetitive monotony.',
      'Adjectives modify or describe Nouns and Pronouns.',
      'Verbs express action, state of being, or occurrence (the heart of a sentence).',
      'Adverbs modify Verbs, Adjectives, or another Adverb (answer How, When, Where, Why).',
      'Prepositions establish spatial, temporal, or logical relations between a noun/pronoun and other elements.'
    ]
  },
  chapters: [
    {
      id: 'ch_1',
      title: '1. Noun & Pronoun - Types, Functions and Core Identification Rules',
      content: '**1. Noun (संज्ञा - Naming Word)**:\n- **Definition**: A noun is a word used as the name of a person, place, animal, thing, quality, concept, or action.\n- **Types of Nouns**:\n  1. **Proper Noun** (व्यक्तिवाचक): Specific name (always capitalized) $\\rightarrow$ *Raipur, Mahanadi, Shakespeare*.\n  2. **Common Noun** (जातिवाचक): General name for a class $\\rightarrow$ *city, river, poet, student*.\n  3. **Collective Noun** (समूहवाचक): Group of individuals taken as a single whole $\\rightarrow$ *flock, jury, committee, herd, fleet*.\n  4. **Material Noun** (द्रव्यवाचक): Matter or substance $\\rightarrow$ *gold, iron, milk, water, cotton* (uncountable, no "a/an").\n  5. **Abstract Noun** (भाववाचक): Quality, state, emotion, or concept $\\rightarrow$ *honesty, bravery, childhood, love, poverty*.\n- **Countable vs Uncountable**:\n  - Countable: books, pens (can take a/an, plural form).\n  - Uncountable: advice, information, luggage, furniture, hair, news (always singular verb, no "a/an", no plural suffix -s).\n\n**2. Pronoun (सर्वनाम - Substitute Word)**:\n- **Definition**: A word used in place of a noun to avoid awkward repetition.\n- **Major Types**:\n  1. **Personal**: Subjective (*I, we, you, he, she, it, they*), Objective (*me, us, him, her, them*).\n  2. **Possessive**: *mine, ours, yours, his, hers, theirs* (Note: *my, our, your, his, her, their* are Possessive Adjectives!).\n  3. **Reflexive / Emphatic**: *myself, yourself, himself, herself, themselves* (Reflexive: action reflects back on subject; Emphatic: adds emphasis, e.g., *"I myself did it"*).\n  4. **Demonstrative**: *this, that, these, those*.\n  5. **Relative**: *who, whom, whose, which, that* (joins clauses and refers to antecedent).\n  6. **Indefinite**: *someone, anybody, nobody, few, many, all, none*.\n  7. **Interrogative**: *who, what, which, whom* (used in questions).'
    },
    {
      id: 'ch_2',
      title: '2. Adjective & Verb - Modification, Types and Functional Shifts',
      content: '**1. Adjective (विशेषण - Describing Word)**:\n- **Definition**: A word that qualifies, restricts, or describes a noun or a pronoun (answers: Which one? What kind? How many?).\n- **Classification**:\n  1. **Adjective of Quality**: *brave, honest, large, hot*.\n  2. **Adjective of Quantity**: *some, much, little, enough, whole* (used with uncountable nouns).\n  3. **Adjective of Number**: *five, many, several, first, second* (Cardinals & Ordinals; Ordinals take "the").\n  4. **Demonstrative Adjective**: *this book, that boy* (directly followed by a noun).\n  5. **Distributive Adjective**: *each, every, either, neither*.\n- **Degrees of Comparison**: Positive (*tall*), Comparative (*taller* - with "than"), Superlative (*tallest* - preceded by "the").\n\n**2. Verb (क्रिया - Action / State Word)**:\n- **Definition**: A word that denotes an action, state, occurrence, or possession. Every complete sentence must have a finite verb.\n- **Transitive vs Intransitive**:\n  - **Transitive Verb**: Requires an object to complete its meaning $\\rightarrow$ *"She wrote a letter."* (Object = a letter).\n  - **Intransitive Verb**: Does not require an object $\\rightarrow$ *"Birds fly."* | *"He laughed loudly."*\n- **Finite vs Non-Finite Verbs (CG Vyapam Core Trap)**:\n  - **Finite**: Changes with tense, person, and number (*He walks / They walked*).\n  - **Non-Finite**: Does not change with tense or subject:\n    1. **Infinitive**: *to + V1* (*to study, to dance*).\n    2. **Gerund**: *V1 + ing* functioning as a **Noun** (*"Swimming is good exercise"*).\n    3. **Participle**: *V1 + ing* (Present) or *V3* (Past) functioning as an **Adjective** (*"a barking dog", "a broken chair"*).'
    },
    {
      id: 'ch_3',
      title: '3. Adverb, Preposition, Conjunction & Interjection',
      content: '**1. Adverb (क्रियाविशेषण)**:\n- **Definition**: A word that modifies a **Verb**, an **Adjective**, or **another Adverb** (sometimes a whole sentence).\n  - Modifying Verb: *"She walked slowly."*\n  - Modifying Adjective: *"This tea is very hot."*\n  - Modifying another Adverb: *"He ran quite fast."*\n- **Types**: Manner (*politely, quickly*), Time (*now, yesterday, soon*), Place (*here, there, outside*), Frequency (*always, never, seldom*), Degree (*extremely, quite, almost*).\n- **Warning**: Not all words ending in "-ly" are adverbs! *Friendly, lovely, cowardly, silly, brotherly* are **Adjectives**!\n\n**2. Preposition (संबंधसूचक अव्यय)**:\n- **Definition**: A word placed before a noun or pronoun to show its relationship with another word in the sentence.\n- Examples: *in, on, at, by, for, from, into, onto, between, among, under, beside, besides*.\n- Rule: A preposition is always followed by a noun, pronoun, or gerund in the objective case (*"between you and me"*, not *"between you and I"*).\n\n**3. Conjunction (समुच्चयबोधक - Joining Word)**:\n- **Definition**: A word used to connect words, phrases, clauses, or sentences.\n  - **Coordinating**: *FANBOYS* (For, And, Nor, But, Or, Yet, So).\n  - **Subordinating**: *because, although, if, unless, since, while, after*.\n  - **Correlative**: *either...or, neither...nor, not only...but also, both...and, hardly...when*.\n\n**4. Interjection (विस्मयादिबोधक)**:\n- **Definition**: A word that expresses sudden, strong feelings or emotions (followed by exclamation mark !).\n- Examples: *Alas!* (grief), *Hurrah!* (joy), *Bravo!* (applause), *Ouch!* (pain), *Hush!* (silence).'
    },
    {
      id: 'ch_4',
      title: '4. Contextual Functional Shifts - Same Word, Different Parts of Speech',
      content: 'In English, grammatical category is determined strictly by syntax, not spelling. Examine how identical words change their part of speech:\n\n1. **FAST**:\n   - Adjective: *"He is a fast runner."* (Modifies noun "runner")\n   - Adverb: *"He runs fast."* (Modifies verb "runs")\n   - Noun: *"She broke her fast at sunset."* (Naming a ritual starvation)\n   - Verb: *"Muslims fast during Ramadan."* (Action of observing fast)\n\n2. **AFTER**:\n   - Preposition: *"He arrived after six o\'clock."* (Precedes noun phrase)\n   - Conjunction: *"He arrived after the train had left."* (Connects two clauses)\n   - Adverb: *"He arrived shortly after."* (Modifies verb "arrived")\n\n3. **ROUND**:\n   - Adjective: *"A round table."*\n   - Noun: *"The policeman went on his daily round."*\n   - Verb: *"The car rounded the corner."*\n   - Preposition: *"He traveled round the world."*\n   - Adverb: *"Come round to my office."*\n\n4. **BETTER**:\n   - Adjective: *"This is a better pen."*\n   - Adverb: *"She sings better than her sister."*\n   - Noun: *"Give place to your betters."*\n   - Verb: *"He tried to better his condition."*\n\n5. **STILL**:\n   - Adjective: *"Still waters run deep."*\n   - Adverb: *"He is still sleeping."*\n   - Verb: *"Mother stilled the crying baby."*\n   - Noun: *"In the still of the night."*'
    },
    {
      id: 'ch_5',
      title: '5. CG Vyapam Traps, Identification Formulas & Elimination Tricks',
      content: '**1. Suffix-Based Quick Identification Formula**:\n- **Noun Suffixes**: *-tion, -sion, -ment, -ness, -ity, -ance, -ence, -hood, -ship, -dom, -er, -or, -ist* (e.g., creation, darkness, management, ability, freedom).\n- **Adjective Suffixes**: *-ful, -less, -able, -ible, -al, -ous, -ic, -ive, -ish, -y, -en* (e.g., careful, hopeless, valuable, glorious, attractive).\n- **Adverb Suffixes**: *-ly, -ward, -wise* (e.g., smoothly, clockwise, forward).\n- **Verb Suffixes**: *-ize, -ise, -ify, -ate, -en* (e.g., realize, purify, activate, lengthen).\n\n**2. Gerund vs Present Participle (The Classic Vyapam Question)**:\n- Both end in **-ing**:\n  - **Gerund = Noun** (answers "What?"): *"Walking is good for health."* | *"I enjoy reading."*\n  - **Present Participle = Adjective** (modifies a noun, answers "Which?"): *"I saw a running train."* | *"Barking dogs seldom bite."*\n\n**3. Preposition vs Conjunction Test**:\n- If followed by a **Noun / Pronoun / Noun Phrase** $\\rightarrow$ **Preposition** (*"We waited till evening"*).\n- If followed by a **Clause (Subject + Finite Verb)** $\\rightarrow$ **Conjunction** (*"We waited till the sun set"*).\n\n**4. Possessive Pronoun vs Possessive Adjective**:\n- *My, our, your, his, her, their* must be followed by a noun $\\rightarrow$ **Possessive Adjectives** (*"This is my book"*).\n- *Mine, ours, yours, hers, theirs* stand alone without a noun $\\rightarrow$ **Possessive Pronouns** (*"This book is mine"*).'
    }
  ],
  comparativeTables: [
    {
      title: 'The 8 Parts of Speech - Master Summary Table',
      headers: ['Part of Speech', 'Primary Function', 'Key Question Answered', 'Typical Suffixes / Clues', 'Standard Sentence Example'],
      rows: [
        ['Noun', 'Names a person, place, thing, or concept', 'Who? What?', '-tion, -ment, -ness, -ity', 'Honesty is the best policy.'],
        ['Pronoun', 'Replaces a noun to avoid repetition', 'Who? Whom? Which one?', 'I, you, he, she, who, which', 'She solved the puzzle easily.'],
        ['Adjective', 'Modifies/qualifies a noun or pronoun', 'Which one? What kind? How many?', '-ful, -ous, -able, -ive, -al', 'The brave soldier won a medal.'],
        ['Verb', 'Denotes an action, state, or occurrence', 'What does it do? What is it?', '-ize, -ate, -ify, -en', 'The river flows towards the sea.'],
        ['Adverb', 'Modifies a verb, adjective, or adverb', 'How? When? Where? How much?', '-ly, -ward, -wise, very, quite', 'He speaks English very fluently.'],
        ['Preposition', 'Shows spatial, temporal, or logical relationship', 'Where? When? In what direction?', 'in, on, at, by, with, into', 'The cat jumped into the well.'],
        ['Conjunction', 'Connects words, phrases, or clauses', 'How are ideas linked?', 'and, but, because, although', 'He was tired but he continued working.'],
        ['Interjection', 'Expresses sudden, intense emotion', 'Spontaneous emotion/reaction', 'Ah!, Alas!, Hurrah!, Wow!', 'Alas! We lost our great leader.']
      ]
    },
    {
      title: 'Gerund vs Present Participle vs Verbal Noun Comparison',
      headers: ['Feature', 'Gerund (V1 + ing)', 'Present Participle (V1 + ing)', 'Verbal Noun (The + V1-ing + of)'],
      rows: [
        ['Grammatical Role', 'Noun (Subject/Object of verb)', 'Adjective (Modifies a noun)', 'Pure Abstract Noun'],
        ['Verbal Characteristics', 'Can take an active direct object', 'Shows ongoing active modification', 'Cannot take an object directly'],
        ['Test / Substitution', 'Can be replaced by "it" / "something"', 'Can be replaced by relative clause', 'Accompanied by article and "of"'],
        ['Sentence Example 1', 'Reading books improves knowledge.', 'I saw a crying child in the street.', 'The reading of books is beneficial.'],
        ['Sentence Example 2', 'He is fond of swimming.', 'Boiling water creates steam.', 'The killing of the tiger was condemned.']
      ]
    },
    {
      title: 'Common Words Operating as Multiple Parts of Speech',
      headers: ['Word', 'As Part of Speech 1 (Sentence)', 'As Part of Speech 2 (Sentence)', 'As Part of Speech 3 (Sentence)'],
      rows: [
        ['Fast', 'Adjective: He took a fast train.', 'Adverb: He ran very fast.', 'Noun: He broke his religious fast.'],
        ['Like', 'Verb: Children like chocolates.', 'Preposition: She sings like an angel.', 'Adjective: They have like minds.'],
        ['Before', 'Preposition: He stood before the judge.', 'Conjunction: Look before you leap.', 'Adverb: I have seen this place before.'],
        ['Right', 'Noun: Know your legal rights.', 'Adjective: Choose the right path.', 'Adverb: He stood right in front of me.'],
        ['Down', 'Preposition: He walked down the hill.', 'Adverb: Sit down quietly.', 'Verb: The boxer downed his opponent.'],
        ['Well', 'Noun: Water is drawn from the well.', 'Adverb: She speaks well.', 'Adjective: I am quite well now.']
      ]
    }
  ],
  pyqs: [
    {
      question: 'Identify the part of speech of the underlined word: "He runs very fast."',
      options: [
        'Adjective',
        'Adverb',
        'Noun',
        'Verb'
      ],
      answer: 'Adverb',
      explanation: 'In this sentence, "fast" answers "How does he run?" and directly modifies the action verb "runs". Therefore, it functions as an Adverb of Manner. (If it were "He is a fast runner", it would be an Adjective).',
      year: '2023',
      exam: 'CG Vyapam संयुक्त भर्ती परीक्षा'
    },
    {
      question: '"Swimming is a good exercise." In this sentence, the word "Swimming" is a/an:',
      options: [
        'Present Participle',
        'Gerund',
        'Infinitive',
        'Past Participle'
      ],
      answer: 'Gerund',
      explanation: 'Here "Swimming" (V1 + ing) acts as the Subject of the sentence and functions as a Noun. A verb-form ending in -ing that functions as a noun is called a Gerund.',
      year: '2022',
      exam: 'CG Vyapam पटवारी भर्ती'
    },
    {
      question: 'What is the part of speech of the word "friendly" in "He gave me a friendly smile"?',
      options: [
        'Adverb',
        'Adjective',
        'Noun',
        'Pronoun'
      ],
      answer: 'Adjective',
      explanation: 'Although it ends in "-ly", "friendly" describes the noun "smile" (Noun + ly = Adjective, e.g., friend + ly = friendly, love + ly = lovely, brother + ly = brotherly). Therefore, it is an Adjective.',
      year: '2021',
      exam: 'CG Vyapam खाद्य निरीक्षक'
    },
    {
      question: '"Look before you leap." What part of speech is the word "before" in this sentence?',
      options: [
        'Preposition',
        'Conjunction',
        'Adverb',
        'Noun'
      ],
      answer: 'Conjunction',
      explanation: '"Before" connects two clauses: the independent imperative clause "Look" and the subordinate clause "you leap" (Subject + Verb). Words joining two clauses are Conjunctions.',
      year: '2019',
      exam: 'CG Vyapam DEO'
    },
    {
      question: 'Which of the following nouns is an "Abstract Noun"?',
      options: [
        'Gold',
        'Fleet',
        'Wisdom',
        'City'
      ],
      answer: 'Wisdom',
      explanation: '"Wisdom" denotes a quality of being wise and cannot be touched or seen physically; it is an Abstract Noun. (Gold = Material Noun, Fleet = Collective Noun, City = Common Noun).',
      year: '2018',
      exam: 'CG Vyapam शिक्षक पात्रता परीक्षा (TET)'
    },
    {
      question: '"I have seen him before." In this sentence, "before" functions as a/an:',
      options: [
        'Preposition',
        'Adverb',
        'Conjunction',
        'Adjective'
      ],
      answer: 'Adverb',
      explanation: 'Here "before" is not followed by any noun or clause; it modifies the verb "have seen" indicating time (answering "When?"). Hence it is an Adverb of Time.',
      year: '2017',
      exam: 'CG Vyapam छात्रावास अधीक्षक'
    }
  ],
  mcqs: [
    {
      question: 'How many primary Parts of Speech are recognized in traditional English grammar?',
      options: ['Six', 'Seven', 'Eight', 'Ten'],
      answer: 'Eight',
      explanation: 'The eight primary parts of speech are Noun, Pronoun, Adjective, Verb, Adverb, Preposition, Conjunction, and Interjection.'
    },
    {
      question: '"The jury was unanimous in its decision." The word "jury" is a/an:',
      options: ['Proper Noun', 'Collective Noun', 'Abstract Noun', 'Material Noun'],
      answer: 'Collective Noun',
      explanation: '"Jury" represents a group of jurors acting as a single unit, hence it is a Collective Noun.'
    },
    {
      question: 'In "This is my book and that is yours", the word "yours" is a:',
      options: ['Possessive Adjective', 'Possessive Pronoun', 'Demonstrative Pronoun', 'Relative Pronoun'],
      answer: 'Possessive Pronoun',
      explanation: '"Yours" replaces the noun phrase "your book" without taking any accompanying noun; therefore it is a Possessive Pronoun. ("My" in "my book" is a Possessive Adjective).'
    },
    {
      question: '"A barking dog seldom bites." What is the grammatical identity of "barking"?',
      options: ['Gerund', 'Present Participle', 'Finite Verb', 'Adverb'],
      answer: 'Present Participle',
      explanation: '"Barking" (V1 + ing) qualifies and describes the noun "dog", functioning as a Verbal Adjective (Present Participle).'
    },
    {
      question: 'Identify the part of speech of "still" in: "Still waters run deep."',
      options: ['Adverb', 'Adjective', 'Noun', 'Verb'],
      answer: 'Adjective',
      explanation: '"Still" directly describes the noun "waters" (meaning calm, unmoving waters); hence it functions as an Adjective.'
    },
    {
      question: '"She sat beside her mother." What is the part of speech of "beside"?',
      options: ['Preposition', 'Adverb', 'Conjunction', 'Adjective'],
      answer: 'Preposition',
      explanation: '"Beside" is placed before the noun phrase "her mother" to denote position (by the side of); thus it is a Preposition.'
    },
    {
      question: 'Which of the following is NOT an Adverb?',
      options: ['Carefully', 'Hardly', 'Cowardly', 'Quickly'],
      answer: 'Cowardly',
      explanation: 'Noun + ly forms an Adjective: coward (noun) + ly = cowardly (adjective). The adverb form is "in a cowardly manner".'
    },
    {
      question: '"Hurrah! We won the championship." What part of speech is "Hurrah!"?',
      options: ['Conjunction', 'Interjection', 'Adverb', 'Preposition'],
      answer: 'Interjection',
      explanation: '"Hurrah!" expresses sudden spontaneous joy and stands grammatically independent of the sentence; hence it is an Interjection.'
    }
  ],
  keyTerminology: [
    {
      term: 'Part of Speech',
      definition: 'A syntactic category to which a word is assigned based on its grammatical and structural function in a sentence.'
    },
    {
      term: 'Gerund',
      definition: 'A non-finite verb form ending in -ing that functions syntactically as a noun (e.g., "Reading is relaxing").'
    },
    {
      term: 'Participle',
      definition: 'A non-finite verb form (Present -ing or Past -ed/-en) that functions as an adjective modifying a noun.'
    },
    {
      term: 'Infinitive',
      definition: 'The base form of a verb, typically preceded by "to" (to + V1), functioning as a noun, adjective, or adverb.'
    },
    {
      term: 'Transitive Verb',
      definition: 'A verb that requires one or more objects to complete its action and syntactic meaning.'
    },
    {
      term: 'Collective Noun',
      definition: 'A noun denoting a collection or group of individuals or things considered as a single collective entity.'
    },
    {
      term: 'Correlative Conjunction',
      definition: 'Paired conjunctions that connect grammatically equal elements (e.g., neither...nor, not only...but also).'
    },
    {
      term: 'Functional Shift (Conversion)',
      definition: 'The linguistic process by which an existing word is used as a different part of speech without altering its spelling.'
    }
  ],
  sources: [
    {
      name: 'High School English Grammar & Composition',
      author: 'Wren & Martin (Revised by N.D.V. Prasada Rao)',
      relevance: 'Standard definitions, eight parts of speech, and comprehensive functional analysis.'
    },
    {
      name: 'A Practical English Grammar',
      author: 'A. J. Thomson and A. V. Martinet',
      relevance: 'Prepositions, non-finite verbs (gerunds vs participles), and word order rules.'
    },
    {
      name: 'Oxford Modern English Grammar',
      author: 'Bas Aarts',
      relevance: 'Modern structural classification and syntactic category tests.'
    },
    {
      name: 'CG Vyapam General English Question Bank',
      author: 'Vyapam Examination Board (2012-2024)',
      relevance: 'Compilation of 100+ past year questions on parts of speech identification.'
    }
  ],
  confusionBuster: [
    {
      doubt: 'How can I easily distinguish between a Preposition and a Conjunction?',
      clarification: 'Look at what follows the word! If it is followed merely by a Noun, Pronoun, or Noun Phrase (without a finite verb), it is a Preposition (e.g., "Wait till morning"). If it is followed by a full clause with its own subject and finite verb, it is a Conjunction (e.g., "Wait till I arrive").'
    },
    {
      doubt: 'Do all words ending in "-ly" function as Adverbs?',
      clarification: 'No! When "-ly" is added to an Adjective, it becomes an Adverb (quick + ly = quickly). But when "-ly" is added to a Noun, it becomes an Adjective! Examples: friend + ly = friendly, love + ly = lovely, coward + ly = cowardly, brother + ly = brotherly.'
    },
    {
      doubt: 'What is the practical test to distinguish a Gerund from a Present Participle?',
      clarification: 'Replace the "-ing" word with the pronoun "it" or "something". If the sentence still makes sense, it is a Gerund/Noun (e.g., "I love swimming" $\\rightarrow$ "I love it" ✔️ = Gerund). If it is describing a noun and cannot be replaced by "it", it is a Participle/Adjective (e.g., "I saw a swimming duck" $\\rightarrow$ "swimming" describes the duck = Participle).'
    },
    {
      doubt: 'What is the difference between "my" and "mine"?',
      clarification: '"My" is a Possessive Adjective and must always be followed by a noun ("This is my house"). "Mine" is a Possessive Pronoun and stands independently without any following noun ("This house is mine").'
    },
    {
      doubt: 'Can an Adverb modify another Adverb?',
      clarification: 'Yes! In the sentence "He runs very quickly", "quickly" is an Adverb modifying the verb "runs", and "very" is another Adverb modifying the adverb "quickly".'
    }
  ],
  faqList: [
    {
      question: 'What are the 8 parts of speech in English?',
      answer: 'The eight parts of speech are: Noun, Pronoun, Adjective, Verb, Adverb, Preposition, Conjunction, and Interjection.'
    },
    {
      question: 'Can the same word be more than one part of speech?',
      answer: 'Yes. English words frequently undergo functional shifts. For example, "fast" can be an Adjective ("fast train"), an Adverb ("runs fast"), a Noun ("break a fast"), or a Verb ("they fast today").'
    },
    {
      question: 'What is the difference between a Transitive and an Intransitive Verb?',
      answer: 'A Transitive verb requires a direct object to complete its meaning (e.g., "He kicked the ball"), whereas an Intransitive verb does not take a direct object (e.g., "She slept peacefully").'
    },
    {
      question: 'Why are determiners sometimes considered a separate part of speech?',
      answer: 'Modern linguistics often separates determiners (articles, demonstratives, quantifiers) from descriptive adjectives because determiners specify reference rather than describing inherent physical qualities.'
    },
    {
      question: 'How does CG Vyapam test Parts of Speech?',
      answer: 'Vyapam typically provides a sentence with an underlined word and gives four parts of speech as options, or asks candidates to spot errors caused by confusing adjectives with adverbs.'
    }
  ],
  oneLinerRevision: [
    'The part of speech of any word is determined solely by its syntactic function in a given sentence.',
    'There are eight primary parts of speech recognized in traditional English grammar.',
    'A Gerund is a verb form ending in -ing that functions as a Noun (answers "What?").',
    'A Present Participle is a verb form ending in -ing that functions as an Adjective.',
    'Words formed as Noun + ly (e.g., friendly, lovely, cowardly) are Adjectives, not Adverbs.',
    'Prepositions connect nouns/pronouns to other words and govern the objective case.',
    'Conjunctions link words, phrases, or clauses (Coordinating: FANBOYS).',
    'Interjections express sudden bursts of emotion and are followed by an exclamation mark (!).',
    'In "Still waters run deep", "still" functions as an Adjective modifying "waters".',
    'English follows SVO (Subject + Verb + Object), whereas Hindi follows SOV word order.'
  ],
  rapidRevision: {
    points: [
      'Noun = Person, place, thing, concept | Pronoun = Noun substitute (I, they, mine)',
      'Adjective = Modifies Noun/Pronoun | Verb = Action/State (Finite vs Non-finite)',
      'Adverb = Modifies Verb, Adjective, or Adverb (How, When, Where, Why)',
      'Preposition = Precedes Noun/Pronoun | Conjunction = Joins clauses (FANBOYS)',
      'Interjection = Emotional outburst (Alas!, Hurrah!)',
      'Gerund = V1-ing as Noun | Participle = V1-ing/V3 as Adjective'
    ],
    formula: 'Noun + ly = Adjective (friendly) | Adjective + ly = Adverb (quickly) | V1-ing (Noun) = Gerund',
    examTips: [
      'Vyapam Tip: Underlined word ending in -ly? Check if it modifies a noun (Adjective) or a verb (Adverb)! E.g., "friendly person" = Adjective; "walked slowly" = Adverb.',
      'If an underlined word connects two complete clauses with subjects and verbs, choose Conjunction; if followed only by a noun/pronoun, choose Preposition!'
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = 'cgv_master_eng_gram_1';
    const sanitized = sanitizeForFirestore(noteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    await markTopicCompleted('cgv_master_sub_6', 'cgv_master_sub_6_ch_1', 'eng_gram_1');
    console.log('Topic eng_gram_1 (Parts of Speech) completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
