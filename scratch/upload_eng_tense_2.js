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
  chapterId: 'cgv_master_sub_6_ch_2',
  topicId: 'eng_tense_2',
  title: 'Past Tense - Simple, Continuous, Perfect & Perfect Continuous',
  subjectName: 'English Language',
  chapterName: 'Tenses',
  overview: {
    introduction: 'The Past Tense indicates actions, events, or states that began and were concluded prior to the present moment of speaking. In English, it is subdivided into four aspects: Simple Past (Past Indefinite), Past Continuous (Past Progressive), Past Perfect, and Past Perfect Continuous. A clear mastery of the past tense is essential for narrative writing, reported speech, and error detection. In CG Vyapam examinations (Patwari, RI, Hostel Warden, Sub-Inspector, Shikshak Bharti, and AG-3), questions based on two sequential past events ("The patient had died before the doctor arrived"), conditional unreal past ("If I had worked hard, I would have passed"), and past time markers (yesterday, ago, last year) are asked consistently.',
    importance: 'The Past Perfect tense cannot normally exist in isolation; it functions strictly as the "Past of the Past" to show that one past event occurred before another past event. Misinterpreting this sequence is one of the most common grammatical errors in competitive exams.',
    examRelevance: 'Examiners frequently test: Past Perfect vs Simple Past with "before/after", "No sooner had... than", "Hardly/Scarcely had... when", unreal hypothetical past with "wish / If only / as if / as though", and the subjunctive "were" with all subjects in imaginary conditions ("If I were a bird").',
    quickFacts: [
      'Simple Past Structure = Subject + V2 (Past form) in affirmative; Subject + did not + V1 in negative.',
      'Past Continuous Structure = Subject + was/were + V1-ing.',
      'Past Perfect Structure = Subject + had + V3 (Past Participle).',
      'Past Perfect Continuous Structure = Subject + had + been + V1-ing + since/for.',
      'Two Past Events Rule: Earlier action = Past Perfect (had + V3); Later action = Simple Past (V2).',
      '"Before" formula: Subject + had + V3 + BEFORE + Subject + V2.',
      '"After" formula: Subject + V2 + AFTER + Subject + had + V3.',
      'Imaginary / Hypothetical Condition: "If I were the Prime Minister, I would eradicate poverty" ("were" is used with I, he, she, it in subjunctive mood).'
    ]
  },
  chapters: [
    {
      id: 'ch_1',
      title: '1. Simple Past Tense (Past Indefinite) - Structures, Past Time Adverbs & Habitual Past',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + V2 (Past form of verb) + Object.\n  - *"India gained independence in 1947."* | *"He wrote an essay yesterday."*\n- **Negative**: Subject + did not + V1 + Object (Notice: "did" is followed by base form V1, NOT V2!).\n  - *"He did not go to school yesterday."* (NOT "did not went" ❌).\n- **Interrogative**: Did + Subject + V1 + Object + ?\n  - *"Did you attend the lecture?"*\n\n**Core Usages (व्यापाम परीक्षा नियम)**:\n1. **Actions Completed at a Definite Point in the Past**:\n   - Accompanied by **Past Time Adverbs**: *yesterday, the day before yesterday, ago, last night, last week, last year, in 1990, in ancient times*.\n   - *Vyapam Golden Rule*: If any past time marker appears, NEVER use Present Perfect; always use **Simple Past (V2)**:\n     - Incorrect: *"I have seen him yesterday."* ❌\n     - Correct: *"I saw him yesterday."* ✔️\n     - Incorrect: *"He has died two days ago."* ❌\n     - Correct: *"He died two days ago."* ✔️\n2. **Past Habits & Routines**:\n   - Expressed using **V2** with frequency adverbs, or with **"used to" / "would"**:\n   - *"In his youth, he exercised daily."*\n   - *"Gandhiji used to spin yarn every morning."*\n3. **"It is high time / It is time" Construction (Super Hot Vyapam Trap)**:\n   - When "It is time" or "It is high time" is followed by a subject, the verb MUST be in the **Simple Past (V2)**:\n   - *"It is high time you started working seriously."* (NOT "you start" or "you should start").\n   - *"It is time we left for the station."*'
    },
    {
      id: 'ch_2',
      title: '2. Past Continuous Tense - Interrupted Actions & Parallel Past Events',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + was/were + V1-ing + Object.\n  - Singular subjects (I, He, She, It, Singular Noun) $\\rightarrow$ **was** + V1-ing.\n  - Plural subjects (We, You, They, Plural Noun) $\\rightarrow$ **were** + V1-ing.\n- **Negative**: Subject + was/were + not + V1-ing.\n- **Interrogative**: Was/Were + Subject + V1-ing + ?\n\n**Core Usages**:\n1. **Action in Progress at a Specific Time in the Past**:\n   - *"At 8 PM yesterday, I was watching the cricket match."*\n   - *"The students were taking their test all morning."*\n2. **Interrupted Past Action (Combination of Past Continuous + Simple Past)**:\n   - When a long ongoing action in the past was interrupted by a shorter, sudden event:\n     - Longer ongoing action = **Past Continuous (was/were + V1-ing)**.\n     - Shorter interrupting action = **Simple Past (V2)**.\n   - *"While I was crossing the road, I saw an accident."*\n   - *"She was cooking dinner when the phone rang."*\n   - Key Conjunctions: **While** is usually followed by Past Continuous; **When** is usually followed by Simple Past.\n3. **Two Parallel Actions Happening Simultaneously in the Past**:\n   - When two actions were taking place at the exact same time without interrupting each other:\n   - *"While mother was cooking, father was reading the newspaper."*\n   - *"The boys were singing while the girls were dancing."*'
    },
    {
      id: 'ch_3',
      title: '3. Past Perfect Tense - The "Past of the Past" & Sequential Event Formulas',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + had + V3 (Past Participle) + Object.\n  - *"The train had departed."* | *"She had finished her assignment."*\n- **Negative**: Subject + had + not + V3.\n- **Interrogative**: Had + Subject + V3 + ?\n\n**The Fundamental "Past of the Past" Principle**:\n- The Past Perfect is NEVER used for a standalone past action (for a single past event, Simple Past is used).\n- It is used when **two actions happened in the past**, and it is necessary to show which one happened **FIRST** (earlier in time).\n  - **Earlier Action (1st action)** $\\rightarrow$ **Past Perfect (had + V3)**\n  - **Later Action (2nd action)** $\\rightarrow$ **Simple Past (V2)**\n\n**THE MASTER SEQUENTIAL FORMULAS (100% Tested in Vyapam)**:\n\n1. **With "BEFORE"**:\n   $$\\text{Subject} + \\text{had} + \\text{V3} + \\text{BEFORE} + \\text{Subject} + \\text{V2}$$\n   - *"The patient had died before the doctor arrived."* (Patient died first = had died; doctor arrived later = arrived).\n   - *"The train had left before we reached the platform."*\n\n2. **With "AFTER"**:\n   $$\\text{Subject} + \\text{V2} + \\text{AFTER} + \\text{Subject} + \\text{had} + \\text{V3}$$\n   - *"The doctor arrived after the patient had died."*\n   - *"I reached the examination hall after the bell had rung."*\n\n3. **With "BY THE TIME"**:\n   - *"By the time the police arrived, the thieves had fled."*\n\n4. **Inversion Structures with "Hardly / Scarcely" & "No sooner"**:\n   - **Hardly / Scarcely had + Subject + V3 ... WHEN + Subject + V2**:\n     - *"Hardly had I stepped out when it started raining."*\n   - **No sooner had + Subject + V3 ... THAN + Subject + V2**:\n     - *"No sooner had the teacher entered the classroom than the students stood up."*'
    },
    {
      id: 'ch_4',
      title: '4. Past Perfect Continuous Tense - Duration Before Another Past Event',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + had + been + V1-ing + Object + since/for + Time.\n  - *"He had been playing cricket for two hours when it began to rain."*\n  - *"She had been preparing for the CGPSC exam since 2019 before she finally succeeded."*\n- **Negative**: Subject + had + not + been + V1-ing.\n- **Interrogative**: Had + Subject + been + V1-ing + ?\n\n**Core Usage & Contextual Differentiation**:\n- Used for an action that started in the past, continued for a duration of time, and was still in progress immediately before another past event took place:\n  - Compare with Past Continuous: *"When I saw him, he was playing."* (No duration mentioned).\n  - Compare with Past Perfect Continuous: *"When I saw him, he had been playing for three hours."* (Duration with "for" explicitly mentioned).\n\n**Contrast Between the Three Continuous Tenses**:\n1. **Present Perfect Continuous**: *"I have been teaching for five years."* (Action started 5 years ago and continues TODAY).\n2. **Past Continuous**: *"I was teaching yesterday at 4 PM."* (Action was in progress at a specific past point).\n3. **Past Perfect Continuous**: *"I had been teaching for five years when I was promoted."* (The 5-year teaching period was concluded or ongoing up to a specific point in the past).'
    },
    {
      id: 'ch_5',
      title: '5. CG Vyapam Traps, Unreal Past Conditionals & Subjunctive Mood',
      content: '**1. Third Conditional (Unfulfilled Past Condition - व्यापाम पेटेंट प्रश्न)**:\n- Structure:\n  $$\\text{If} + \\text{Past Perfect (had + V3)}, \\text{Subject} + \\text{would have / could have / might have} + \\text{V3}$$\n  - *"If you had worked hard, you would have passed the examination."*\n  - Meaning: You did not work hard, so you did not pass (an unfulfilled past regret).\n  - Inversion (without "If"): *"Had you worked hard, you would have passed the examination."*\n  - *Vyapam Trap*: Never write *"If you would have worked hard, you would have passed..."* ❌ (The "If" clause must take "had + V3", NOT "would have").\n\n**2. Second Conditional & Subjunctive "WERE" (Unreal / Imaginary Present-Past)**:\n- Used for impossible, imaginary, or contrary-to-fact situations:\n  $$\\text{If} + \\text{Subject} + \\text{WERE}, \\text{Subject} + \\text{would} + \\text{V1}$$\n  - *"If I were a bird, I would fly in the sky."* (NOT "If I was a bird").\n  - *"If he were the Chief Minister, he would build more schools."* (Always "were" regardless of whether the subject is I, he, she, or it!).\n\n**3. Wishes & As If / As Though**:\n- After **I wish / If only / as if / as though**, use past subjunctive "were" or Past Perfect for past regrets:\n  - *"I wish I were rich."* (Present unfulfilled wish).\n  - *"I wish I had studied harder for the test."* (Past regret).\n  - *"He behaves as if he were the boss."* (He is not the boss).'
    }
  ],
  comparativeTables: [
    {
      title: 'The 4 Past Tense Aspects - Master Structural Matrix',
      headers: ['Tense Aspect', 'Auxiliary + Verb Form', 'Key Syntactic Role', 'Signal Words / Conjunctions', 'Standard Sentence Example'],
      rows: [
        ['Simple Past', 'Subject + V2 (did not + V1)', 'Action completed at definite past time, past habit', 'yesterday, ago, last year, in 1947, used to', 'India won the cricket World Cup in 2011.'],
        ['Past Continuous', 'was / were + V1-ing', 'Ongoing past action, interrupted action', 'while, when, at that time, all evening', 'While she was cooking, the electricity went out.'],
        ['Past Perfect', 'had + V3', 'Earlier of two past events (Past of the Past)', 'before, after, by the time, hardly...when', 'The train had left before we reached the station.'],
        ['Past Perfect Cont.', 'had + been + V1-ing', 'Past duration continuing up to another past event', 'since, for, when (with duration)', 'He had been working for three hours when I called.']
      ]
    },
    {
      title: 'Sequential Past Events: Before vs After vs By the Time Formulas',
      headers: ['Conjunction', 'Earlier Event (First in Time)', 'Later Event (Second in Time)', 'Standard Examination Sentence'],
      rows: [
        ['Before', 'had + V3 (comes before "before")', 'V2 (comes after "before")', 'The patient had died before the doctor arrived.'],
        ['After', 'had + V3 (comes after "after")', 'V2 (comes before "after")', 'The doctor arrived after the patient had died.'],
        ['By the time', 'had + V3 (main clause)', 'V2 (clause with "by the time")', 'By the time the fire brigade arrived, the house had burnt down.'],
        ['Hardly / Scarcely', 'had + Sub + V3 (inverted)', 'V2 (clause introduced by "when")', 'Hardly had he entered the room when the lights went out.'],
        ['No sooner', 'had + Sub + V3 (inverted)', 'V2 (clause introduced by "than")', 'No sooner had the bell rung than the students rushed out.']
      ]
    },
    {
      title: 'Conditionals Involving the Past Tense (Vyapam Comparison)',
      headers: ['Conditional Type', 'If-Clause Structure', 'Main Clause Structure', 'Meaning / Reality', 'Standard Example'],
      rows: [
        ['Second Conditional (Unreal Present)', 'If + Subject + were / V2', 'Subject + would / could + V1', 'Imaginary, contrary to present reality', 'If I were you, I would accept the job.'],
        ['Third Conditional (Unfulfilled Past)', 'If + Subject + had + V3', 'Subject + would have + V3', 'Past regret; could not happen', 'If you had informed me, I would have helped you.'],
        ['Inverted Third Conditional', 'Had + Subject + V3 (no "If")', 'Subject + would have + V3', 'Formal unfulfilled past condition', 'Had she studied, she would have cleared the exam.']
      ]
    }
  ],
  pyqs: [
    {
      question: 'Fill in the blank with the correct verb form: "The train _______ before we reached the station."',
      options: [
        'left',
        'had left',
        'has left',
        'was leaving'
      ],
      answer: 'had left',
      explanation: 'When two actions occurred in the past, the earlier action is expressed in the Past Perfect Tense ("had left") and the subsequent action in the Simple Past ("reached"). Structure: Subject + had + V3 + before + Subject + V2.',
      year: '2023',
      exam: 'CG Vyapam संयुक्त भर्ती परीक्षा'
    },
    {
      question: 'Choose the correct sentence:',
      options: [
        'If I was a bird, I would fly in the sky.',
        'If I were a bird, I would fly in the sky.',
        'If I had been a bird, I would fly in the sky.',
        'If I am a bird, I will fly in the sky.'
      ],
      answer: 'If I were a bird, I would fly in the sky.',
      explanation: 'In purely imaginary, hypothetical conditions (unreal present), the subjunctive past "were" is used with all subjects, including "I", "he", and "she": "If I were a bird, I would fly...".',
      year: '2022',
      exam: 'CG Vyapam पटवारी भर्ती'
    },
    {
      question: '"It is high time we _______ our preparation for the examination."',
      options: [
        'start',
        'started',
        'have started',
        'will start'
      ],
      answer: 'started',
      explanation: 'The phrase "It is high time / It is time" followed by a subject takes the Simple Past (V2) tense. Therefore, "started" is the correct form.',
      year: '2021',
      exam: 'CG Vyapam खाद्य निरीक्षक'
    },
    {
      question: 'Fill in the blank: "No sooner had the bell rung _______ the children ran out of the classroom."',
      options: [
        'when',
        'then',
        'than',
        'after'
      ],
      answer: 'than',
      explanation: '"No sooner" is a comparative form and is strictly paired with "than" (NOT when or then): "No sooner had... than...".',
      year: '2019',
      exam: 'CG Vyapam DEO'
    },
    {
      question: 'Choose the correct form of the verb: "If you had worked hard, you _______ the exam."',
      options: [
        'will pass',
        'would pass',
        'would have passed',
        'had passed'
      ],
      answer: 'would have passed',
      explanation: 'In the Third Conditional (unfulfilled past condition), the "if-clause" with "had + V3" requires "would have + V3" in the main clause: "If you had worked hard, you would have passed...".',
      year: '2018',
      exam: 'CG Vyapam शिक्षक पात्रता परीक्षा (TET)'
    },
    {
      question: '"I _______ him two days ago." Fill in the blank:',
      options: [
        'have met',
        'met',
        'had met',
        'was meeting'
      ],
      answer: 'met',
      explanation: 'The adverb "ago" indicates a specific past time. With past time markers (ago, yesterday, last week), only Simple Past (V2) is used: "I met him two days ago".',
      year: '2017',
      exam: 'CG Vyapam छात्रावास अधीक्षक'
    }
  ],
  mcqs: [
    {
      question: 'Fill in the blank: "While my mother was cooking, I _______ my homework."',
      options: ['am doing', 'was doing', 'did', 'had done'],
      answer: 'was doing',
      explanation: 'Two continuous past actions happening simultaneously are both expressed in the Past Continuous Tense: "was doing".'
    },
    {
      question: '"Hardly had the teacher entered the class _______ the students stood up."',
      options: ['than', 'when', 'then', 'before'],
      answer: 'when',
      explanation: '"Hardly" and "Scarcely" are correlatively paired with "when": "Hardly had... when...".'
    },
    {
      question: 'Fill in the blank: "The patient died after the doctor _______."',
      options: ['arrived', 'had arrived', 'has arrived', 'was arriving'],
      answer: 'had arrived',
      explanation: 'Following the "after" rule (Subject + V2 + after + had + V3): the doctor arrived first, so it takes Past Perfect ("had arrived").'
    },
    {
      question: 'Identify the sentence with an error:',
      options: [
        'He did not went to school yesterday.',
        'Did she write a letter?',
        'They did not play football.',
        'We reached on time.'
      ],
      answer: 'He did not went to school yesterday.',
      explanation: 'The auxiliary "did" is always followed by the base form V1 ("go"), not the past form V2 ("went"). Correct: "He did not go...".'
    },
    {
      question: '"He behaved as if he _______ the king."',
      options: ['is', 'was', 'were', 'had been'],
      answer: 'were',
      explanation: 'After "as if" and "as though" expressing an unreal supposition, the past subjunctive "were" is used.'
    },
    {
      question: 'Fill in the blank: "When I reached his house, he _______ for two hours."',
      options: ['slept', 'was sleeping', 'had been sleeping', 'has been sleeping'],
      answer: 'had been sleeping',
      explanation: 'An action ongoing for a duration ("for two hours") up to a specific past moment ("when I reached") requires the Past Perfect Continuous Tense ("had been sleeping").'
    },
    {
      question: 'Choose the correct sentence:',
      options: [
        'India has gained freedom in 1947.',
        'India gained freedom in 1947.',
        'India had gained freedom in 1947.',
        'India was gaining freedom in 1947.'
      ],
      answer: 'India gained freedom in 1947.',
      explanation: 'Historical past dates (in 1947) strictly take the Simple Past (V2), not Present Perfect or isolated Past Perfect.'
    },
    {
      question: 'Fill in the blank: "Had you informed me earlier, I _______ you."',
      options: ['would help', 'will help', 'would have helped', 'had helped'],
      answer: 'would have helped',
      explanation: 'Inverted third conditional ("Had you informed") takes "would have + V3" ("would have helped") in the result clause.'
    }
  ],
  keyTerminology: [
    {
      term: 'Past Tense',
      definition: 'The grammatical tense used to locate an event or action in time prior to the present moment.'
    },
    {
      term: 'Past of the Past',
      definition: 'The Past Perfect tense, used to indicate an action completed prior to another past event or point of time.'
    },
    {
      term: 'Subjunctive Mood (Past Were)',
      definition: 'The verb form used to express hypothetical, counter-factual, or imaginary wishes (e.g., "If I were a bird").'
    },
    {
      term: 'Third Conditional',
      definition: 'An unreal past conditional structure expressing hypothetical events that did not happen: If + had + V3, would have + V3.'
    },
    {
      term: 'Inversion',
      definition: 'Reversing the normal subject-verb order after negative adverbs (e.g., "Hardly had I...", "No sooner had he...").'
    },
    {
      term: 'Interrupted Past Action',
      definition: 'A syntactic construction pairing a background continuous action (Past Continuous) with an interrupting sudden event (Simple Past).'
    },
    {
      term: 'Definite Past Time Adverb',
      definition: 'Temporal adverbs (yesterday, ago, last year, in 1990) that mandate the use of the Simple Past tense.'
    },
    {
      term: 'Habitual Past',
      definition: 'A past routine or repeated action expressed via V2, "used to", or "would".'
    }
  ],
  sources: [
    {
      name: 'High School English Grammar & Composition',
      author: 'Wren & Martin (Revised by N.D.V. Prasada Rao)',
      relevance: 'Standard rules for Past Indefinite, Past Perfect sequential events, and Conditionals.'
    },
    {
      name: 'Practical English Usage',
      author: 'Michael Swan (Oxford University Press)',
      relevance: 'Authoritative treatment of Subjunctive "were", "It is high time", and No sooner... than inversions.'
    },
    {
      name: 'A Practical English Grammar',
      author: 'A. J. Thomson and A. V. Martinet',
      relevance: 'Detailed formulas for before/after sequential actions and Past Continuous combinations.'
    },
    {
      name: 'CG Vyapam General English Question Bank',
      author: 'Vyapam Examination Directorate (2012-2024)',
      relevance: 'Compilation of 100+ past year questions on past tense structures and error spotting.'
    }
  ],
  confusionBuster: [
    {
      doubt: 'Can I use Past Perfect ("had + V3") for a single standalone past action?',
      clarification: 'No! You cannot say "I had visited Delhi yesterday" ❌. A single standalone past action must always be in Simple Past: "I visited Delhi yesterday" ✔️. Past Perfect is used ONLY when comparing two past events to show which one happened first.'
    },
    {
      doubt: 'Why is "No sooner had... when" incorrect?',
      clarification: '"No sooner" is a comparative structure (sooner = comparative of soon). Comparatives are strictly followed by "than", never "when"! The pair is "No sooner... than", whereas "Hardly/Scarcely" is paired with "when".'
    },
    {
      doubt: 'Why do we use "were" with "I" in "If I were you"?',
      clarification: 'This is the Subjunctive Mood, used for counter-factual, impossible, or imaginary situations. In the subjunctive, "were" is used for all persons and numbers (If I were, if he were, if she were).'
    },
    {
      doubt: 'What verb follows "did not"?',
      clarification: '"Did" is already in the past tense (past form of do). Therefore, it is always followed by the base form V1 ("He did not go", NOT "He did not went").'
    },
    {
      doubt: 'What is the difference between "The train left before I arrived" and "The train had left before I arrived"?',
      clarification: 'While conversational English occasionally uses Simple Past for both, standard formal grammar tested in Vyapam requires Past Perfect for the earlier action: "The train had left before I arrived".'
    }
  ],
  faqList: [
    {
      question: 'What are the four forms of Past Tense in English?',
      answer: '1. Simple Past (Past Indefinite), 2. Past Continuous (Past Progressive), 3. Past Perfect, and 4. Past Perfect Continuous.'
    },
    {
      question: 'How do you structure two past events using "before"?',
      answer: 'Subject + had + V3 + before + Subject + V2 (e.g., "The bell had rung before I reached school").'
    },
    {
      question: 'What is the structure of the Third Conditional?',
      answer: 'If + Subject + had + V3, Subject + would have + V3 (e.g., "If she had invited me, I would have attended the party").'
    },
    {
      question: 'Why does "It is high time" take a past tense verb?',
      answer: 'It expresses an unreal past suggestion, indicating that the action is already delayed and should have been done earlier.'
    },
    {
      question: 'How does CG Vyapam test the Past Tense?',
      answer: 'Through sequential past actions (had left before reached), subjunctive "were", "No sooner... than", and error spotting involving "did not + V1".'
    }
  ],
  oneLinerRevision: [
    'Simple Past (V2) expresses actions completed at a definite time in the past.',
    'Auxiliary "did" in negative and interrogative sentences is strictly followed by V1 (did not go).',
    'Past time markers (yesterday, ago, last year, in 1947) strictly take the Simple Past tense.',
    '"It is high time" followed by a subject requires Simple Past V2 (It is high time we started).',
    'Earlier past action takes Past Perfect (had + V3); later past action takes Simple Past (V2).',
    'Before Formula: had + V3 before V2 | After Formula: V2 after had + V3.',
    '"No sooner had" is paired with "than"; "Hardly/Scarcely had" is paired with "when".',
    'In imaginary/counter-factual conditions, the subjunctive "were" is used with all subjects (If I were a bird).',
    'Third Conditional structure: If + had + V3, would have + V3.',
    'While is typically followed by Past Continuous (was/were + V1-ing).'
  ],
  rapidRevision: {
    points: [
      'Simple Past = S + V2 | Did not + V1 (yesterday, ago, in 1947)',
      'Past Continuous = S + was/were + V1-ing (while, when interrupted)',
      'Past Perfect = S + had + V3 (earlier past action)',
      'Past Perfect Cont. = S + had + been + V1-ing + since/for',
      'The patient had died before the doctor arrived',
      'The doctor arrived after the patient had died',
      'No sooner had... THAN... | Hardly had... WHEN...',
      'If I were... I would... | If I had + V3... I would have + V3'
    ],
    formula: 'Earlier Action = had + V3 | Later Action = V2 | No sooner... than | Hardly... when | If I were',
    examTips: [
      'Vyapam Shortcut: Look for "yesterday" or "ago" $\\rightarrow$ Answer is V2 (Simple Past)! Never choose "has/have + V3" with past markers.',
      'Check the pair: "No sooner" MUST have "THAN" (not then or when); "Hardly" MUST have "WHEN" (not than)!'
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = 'cgv_master_eng_tense_2';
    const sanitized = sanitizeForFirestore(noteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    await markTopicCompleted('cgv_master_sub_6', 'cgv_master_sub_6_ch_2', 'eng_tense_2');
    console.log('Topic eng_tense_2 (Past Tense) completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
