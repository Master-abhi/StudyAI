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
  topicId: 'eng_tense_1',
  title: 'Present Tense - Simple, Continuous, Perfect & Perfect Continuous',
  subjectName: 'English Language',
  chapterName: 'Tenses',
  overview: {
    introduction: 'In English grammar, Tense refers to the form taken by a verb to indicate the time of an action or event, along with its state of completion. The Present Tense denotes an action happening now, habitual routines, universal truths, or ongoing states connected to the present moment. It is subdivided into four distinct aspects: Simple Present (Present Indefinite), Present Continuous (Present Progressive), Present Perfect, and Present Perfect Continuous. Mastering the Present Tense is pivotal for subject-verb agreement, conditional clauses (Type 0 and Type 1), and sentence correction. In CG Vyapam exams (Patwari, RI, Sub-Inspector, Hostel Warden, Teacher Eligibility Test), tense identification, correct verb form selection, and spotting stative verb errors are tested in 2 to 3 questions per paper.',
    importance: 'The present tense is the most widely tested tense in competitive exams because of subtle rules like stative verbs (verbs of perception and emotion that do not take -ing), signal adverbs (already, yet, since, for, usually), and first conditional clauses where the subordinate "if-clause" takes simple present while the main clause takes simple future.',
    examRelevance: 'Recurring CG Vyapam focal areas include: stative verbs used in continuous form (e.g., "I am knowing him" ❌ vs "I know him" ✔️), since vs for in Present Perfect Continuous, already/yet with Present Perfect, and universal truths remaining in Simple Present even in indirect narration.',
    quickFacts: [
      'Simple Present Structure = Subject + V1 (s/es with 3rd person singular: he, she, it).',
      'Present Continuous Structure = Subject + is/am/are + V1-ing.',
      'Present Perfect Structure = Subject + has/have + V3 (Past Participle).',
      'Present Perfect Continuous Structure = Subject + has/have + been + V1-ing + since/for.',
      'Stative verbs (verbs of thinking, feeling, perception: believe, know, understand, like, love, smell, taste, possess) are NOT normally used in continuous forms.',
      '"Since" denotes a specific Point of Time (since Monday, since 2010, since morning).',
      '"For" denotes a Period or Duration of Time (for two hours, for five days, for three years).',
      'In First Conditional: If + Simple Present, Subject + will/shall + V1 (e.g., "If it rains, we will stay home").'
    ]
  },
  chapters: [
    {
      id: 'ch_1',
      title: '1. Simple Present Tense (Present Indefinite) - Structures, Usages & Signal Words',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + V1 (s/es with He, She, It, Singular Noun) + Object.\n  - *"He reads a book."* | *"They play cricket."*\n- **Negative**: Subject + do/does + not + V1 + Object.\n  - *"He does not read a book."* | *"They do not play cricket."*\n- **Interrogative**: Do/Does + Subject + V1 + Object + ?\n  - *"Does he read a book?"* | *"Do they play cricket?"*\n\n**Core Usages (व्यापाम परीक्षा नियम)**:\n1. **Habitual, Routine or Repeated Actions**:\n   - *"She wakes up at 6 AM every day."* | *"He drinks coffee in the morning."*\n2. **Universal, Scientific or General Truths**:\n   - *"The Sun rises in the east."* (Universal)\n   - *"Water boils at 100 degrees Celsius."* (Scientific)\n   - *"Honesty is the best policy."* (General proverb)\n3. **Fixed Official Timetables or Scheduled Future Events**:\n   - *"The train leaves at 5:30 PM tomorrow."* | *"The college reopens next Monday."*\n4. **In Conditional Clauses of First Type (If, When, Unless, As soon as)**:\n   - Rule: The subordinate conditional clause takes Simple Present, while the main clause takes Simple Future:\n   - *"If it rains (Simple Present), we will cancel the match (Simple Future)."*\n   - Correct: *"Unless you work hard, you will not succeed."* (Never use "will" in both clauses!).\n5. **In Dramatic Narratives & Live Commentaries**:\n   - *"Kohli hits the ball and takes two runs."*\n\n**Signal Words (Key Adverbs of Frequency)**:\n- *always, usually, generally, frequently, often, sometimes, rarely, seldom, hardly, never, everyday, daily, once a week*.'
    },
    {
      id: 'ch_2',
      title: '2. Present Continuous Tense & The Stative Verb Rule (Non-Continuous Verbs)',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + is/am/are + V1-ing + Object.\n  - *"She is writing a letter."* | *"They are watching TV."*\n- **Negative**: Subject + is/am/are + not + V1-ing.\n- **Interrogative**: Is/Am/Are + Subject + V1-ing + ?\n\n**Core Usages**:\n1. **Action in Progress at the Time of Speaking**:\n   - *"The children are playing outside right now."* | *"Look! The bus is coming."*\n2. **Temporary Situations (around the present moment)**:\n   - *"I am preparing for CG Vyapam exams these days."*\n3. **Near Planned Future Arrangements**:\n   - *"My uncle is arriving from Delhi tonight."*\n\n**THE STATIVE VERBS RULE (The Biggest Vyapam Trap)**:\nCertain verbs describe states, feelings, or mental conditions rather than dynamic physical actions. These verbs are **NOT** normally used in the continuous (-ing) aspect:\n\n1. **Verbs of Perception / Sensation**: *see, hear, smell, notice, recognize, taste*.\n   - Incorrect: *"I am smelling something burning."* ❌\n   - Correct: *"I smell something burning."* ✔️\n2. **Verbs of Thinking & Mental State**: *know, understand, believe, think (opinion), remember, forget, imagine, suppose, doubt*.\n   - Incorrect: *"I am knowing him for years."* ❌\n   - Correct: *"I know him."* ✔️\n3. **Verbs of Emotion & Desire**: *love, like, hate, dislike, want, wish, desire, prefer, forgive*.\n   - Incorrect: *"She is loving chocolates."* ❌\n   - Correct: *"She loves chocolates."* ✔️\n4. **Verbs of Possession**: *have, own, possess, belong to, contain, consist of*.\n   - Incorrect: *"This book is belonging to me."* ❌\n   - Correct: *"This book belongs to me."* ✔️\n   - Incorrect: *"I am having a car."* ❌\n   - Correct: *"I have a car."* ✔️ (Note: "having" is correct only when eating/enjoying: *"I am having lunch / having fun"*).'
    },
    {
      id: 'ch_3',
      title: '3. Present Perfect Tense - Structures, Signal Adverbs & The Resultative Aspect',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + has/have + V3 (Past Participle) + Object.\n  - He / She / It / Singular Noun $\\rightarrow$ **has** + V3 (*"He has finished his work"*).\n  - I / We / You / They / Plural Noun $\\rightarrow$ **have** + V3 (*"They have completed the project"*).\n- **Negative**: Subject + has/have + not + V3.\n- **Interrogative**: Has/Have + Subject + V3 + ?\n\n**Core Usages & The "Present Result" Rule**:\n1. **Action Completed in the Past, but with Visible Connection/Result in the Present**:\n   - *"I have cut my finger."* (The cutting happened in the past, but the finger is bleeding/hurting right now).\n   - *"The train has arrived on platform 2."* (It arrived moments ago and is standing there now).\n2. **Life Experiences (Up to the Present)**:\n   - *"Have you ever been to Bastar?"* | *"I have never seen such a magnificent waterfall."*\n3. **Actions Completed in an Unfinished Time Period**:\n   - *"I have had three cups of tea this morning."* (It is still morning).\n\n**Signal Words for Present Perfect**:\n- **Already** (affirmative): *"He has already left the office."*\n- **Yet** (negative and interrogative, placed at the end): *"She has not submitted the form yet."* | *"Has the postman arrived yet?"*\n- **Just / Just now**: *"The doctor has just stepped out."*\n- **Recently / Lately**: *"They have recently moved to Raipur."*\n- **So far / Up to now**: *"We have solved ten questions so far."*\n\n**THE PAST TIME EXPRESSION TRAP (Critical Vyapam Rule)**:\n- Never use Present Perfect with **Past Time Adverbs** (yesterday, last night, in 1947, two days ago, then)! Always use **Simple Past**:\n  - Incorrect: *"India has gained independence in 1947."* ❌\n  - Correct: *"India gained independence in 1947."* ✔️\n  - Incorrect: *"He has met me yesterday."* ❌\n  - Correct: *"He met me yesterday."* ✔️'
    },
    {
      id: 'ch_4',
      title: '4. Present Perfect Continuous Tense & Since vs For Master Rules',
      content: '**Basic Structures**:\n- **Affirmative**: Subject + has/have + been + V1-ing + Object + since/for + Time.\n  - *"She has been studying since morning."*\n  - *"They have been playing for two hours."*\n- **Negative**: Subject + has/have + not + been + V1-ing.\n- **Interrogative**: Has/Have + Subject + been + V1-ing + ?\n\n**Core Usage**:\n- Used for an action that started at some point in the past, has continued without interruption up to the present, and is still in progress (or has just ended with visible ongoing effects).\n\n**SINCE vs FOR MASTER RULES (100% Vyapam Tested)**:\n\n1. **SINCE (Point of Time - निश्चित समय)**:\n   - Refers to a specific starting point in the past:\n   - Days of the week: *since Monday, since Friday*.\n   - Months & Years: *since January, since 1995, since 2020*.\n   - Clock Time & Parts of Day: *since 8 AM, since morning, since noon, since dusk*.\n   - Life Stages & Events: *since childhood, since his arrival, since birth*.\n   - Specific Occasions: *since Diwali, since last week*.\n   - Formula: **Since + Specific Starting Point**.\n\n2. **FOR (Period of Time / Duration - अनिश्चित समय / समयावधि)**:\n   - Refers to the duration, length, or quantity of time (answers "How long?"): \n   - Number of seconds/minutes/hours: *for 30 minutes, for two hours*.\n   - Number of days/weeks/months/years: *for five days, for six months, for ten years*.\n   - Vague periods: *for a long time, for several weeks, for ages, for centuries*.\n   - Formula: **For + Number + Time Unit** (Count of time units).\n\n**Special Trap: Stative Verbs with Since / For**:\n- If a sentence has "since" or "for", but the verb is a **stative verb** (e.g., know, believe, be, have), you CANNOT use Present Perfect Continuous! You MUST use **Present Perfect**:\n  - Incorrect: *"I have been knowing him for ten years."* ❌\n  - Correct: *"I have known him for ten years."* ✔️\n  - Incorrect: *"She has been being sick since Monday."* ❌\n  - Correct: *"She has been sick since Monday."* ✔️'
    },
    {
      id: 'ch_5',
      title: '5. CG Vyapam Traps, First Conditional Concord & Rapid Formulas',
      content: '**1. The First Conditional Structure (If + Present Simple, will + V1)**:\n- Condition clause: If / When / As soon as / Unless / In case $\\rightarrow$ **Simple Present**.\n- Result clause: Subject $\\rightarrow$ **will / shall / can / may + V1**.\n  - Example: *"If she studies hard, she will clear the CG Vyapam exam."*\n  - *Vyapam Error Trap*: Examiners write *"If she will study hard, she will clear..."* ❌ (Double future is strictly prohibited in English!).\n\n**2. "It is high time / It is time" Construction**:\n- When followed by a subject, it takes **Simple Past (V2)**, NOT Present Tense:\n  - *"It is time we started our preparation."* (NOT "we start").\n- When followed by an infinitive, it takes "to + V1":\n  - *"It is time to start."*\n\n**3. Present Perfect with "This is the first time"**:\n- When beginning with "This is the first/second time", use **Present Perfect**:\n  - *"This is the first time I have seen a tiger in Kanger Ghati National Park."*\n\n**4. Summary Tense Decision Tree for Vyapam**:\n- Habit / Universal Truth / Fixed Routine $\\rightarrow$ **Simple Present (V1/V1-s)**.\n- Happening right now / Look! / Listen! $\\rightarrow$ **Present Continuous (is/am/are + V1-ing)**.\n- Just / Already / Yet / So far / Recent completion $\\rightarrow$ **Present Perfect (has/have + V3)**.\n- Started in past + Still continuing + Since/For $\\rightarrow$ **Present Perfect Continuous (has/have + been + V1-ing)**.'
    }
  ],
  comparativeTables: [
    {
      title: 'The 4 Present Tense Aspects - Master Comparative Matrix',
      headers: ['Tense Aspect', 'Auxiliary + Verb Form', 'Key Focus / Meaning', 'Typical Signal Words', 'Standard Sentence Example'],
      rows: [
        ['Simple Present', 'Subject + V1 (s/es with singular)', 'Habit, routine, universal truth, schedule', 'always, usually, daily, seldom, every year', 'The Earth revolves around the Sun.'],
        ['Present Continuous', 'is / am / are + V1-ing', 'Action in progress now, temporary state', 'now, right now, at present, look!, listen!', 'Look! The children are crossing the street.'],
        ['Present Perfect', 'has / have + V3', 'Past action with present result, life experience', 'already, yet, just, recently, so far, ever', 'She has already submitted her application.'],
        ['Present Perfect Cont.', 'has / have + been + V1-ing', 'Past origin + ongoing continuation + duration', 'since (point), for (period), how long', 'It has been raining continuously since morning.']
      ]
    },
    {
      title: 'Since vs For - Complete Classification & Examination Guide',
      headers: ['Parameter', 'Since (Point of Time / निश्चित समय)', 'For (Period of Time / समयावधि)'],
      rows: [
        ['Core Nature', 'A specific calendar date, clock hour, or named event', 'A counted duration, interval, or span of time'],
        ['Question Answered', 'Answers "Since when?" (कब से?)', 'Answers "How long?" (कितनी देर से?)'],
        ['Days & Dates', 'since Monday, since 15th August, since yesterday', 'for two days, for three weeks'],
        ['Months & Years', 'since January, since 2018, since childhood', 'for five months, for twelve years, for a decade'],
        ['Clock & Time Units', 'since 7:00 AM, since midnight, since dawn', 'for 45 minutes, for four hours'],
        ['Vague Durations', 'since then, since last week, since time immemorial', 'for a long time, for ages, for several hours'],
        ['Sentence Example', 'He has been teaching in Raipur since 2015.', 'He has been teaching in Raipur for eight years.']
      ]
    },
    {
      title: 'Stative Verbs (Simple Present) vs Dynamic Verbs (Present Continuous)',
      headers: ['Verb Category', 'Stative Verb (Correct Simple Present)', 'Incorrect Continuous Form', 'Dynamic Exception (Contextual)'],
      rows: [
        ['Possession', 'He has a luxury bungalow in Bilaspur.', 'He is having a luxury bungalow. ❌', 'He is having breakfast right now. ✔️ (having = eating)'],
        ['Perception', 'This rose smells sweet.', 'This rose is smelling sweet. ❌', 'She is smelling the perfume. ✔️ (deliberate active smelling)'],
        ['Mental State', 'I understand the mathematical concept.', 'I am understanding the concept. ❌', 'No dynamic usage (always stative)'],
        ['Emotion', 'She loves classical Indian music.', 'She is loving classical music. ❌', 'No dynamic usage (always stative)'],
        ['Opinion / Belief', 'I think he is honest.', 'I am thinking he is honest. ❌', 'I am thinking about my future plans. ✔️ (thinking = mental process)']
      ]
    }
  ],
  pyqs: [
    {
      question: 'Fill in the blank with the correct verb form: "Water _______ at 100 degrees Celsius."',
      options: [
        'boils',
        'is boiling',
        'boiled',
        'has boiled'
      ],
      answer: 'boils',
      explanation: 'Scientific facts and universal truths are always expressed in the Simple Present Tense. Water (uncountable singular noun) takes the singular verb "boils".',
      year: '2023',
      exam: 'CG Vyapam संयुक्त भर्ती परीक्षा'
    },
    {
      question: 'Choose the correct option: "He _______ in this school since 2018."',
      options: [
        'is teaching',
        'teaches',
        'has been teaching',
        'taught'
      ],
      answer: 'has been teaching',
      explanation: 'The sentence indicates an action that started in the past (2018) and is still continuing in the present, signaled by "since 2018". This requires the Present Perfect Continuous Tense ("has been teaching").',
      year: '2022',
      exam: 'CG Vyapam पटवारी भर्ती'
    },
    {
      question: 'Identify the grammatically correct sentence:',
      options: [
        'I am knowing him very well.',
        'I know him very well.',
        'I have been knowing him very well.',
        'I am know him very well.'
      ],
      answer: 'I know him very well.',
      explanation: '"Know" is a stative verb representing mental cognition and is not used in continuous (-ing) forms. The correct sentence is "I know him very well."',
      year: '2021',
      exam: 'CG Vyapam खाद्य निरीक्षक'
    },
    {
      question: 'Fill in the blank: "If it rains, we _______ the picnic."',
      options: [
        'will cancel',
        'cancelled',
        'would cancel',
        'cancel'
      ],
      answer: 'will cancel',
      explanation: 'In a First Conditional sentence, the "if-clause" takes Simple Present ("if it rains") and the main clause takes Simple Future ("we will cancel").',
      year: '2019',
      exam: 'CG Vyapam DEO'
    },
    {
      question: 'Select the correct option to fill the blank: "She has not received the official letter _______."',
      options: [
        'already',
        'still',
        'yet',
        'just'
      ],
      answer: 'yet',
      explanation: '"Yet" is used at the end of negative sentences and questions in the Present Perfect Tense to indicate that something expected has not happened so far.',
      year: '2018',
      exam: 'CG Vyapam शिक्षक पात्रता परीक्षा (TET)'
    },
    {
      question: 'Fill in the blank: "The train had left before he _______ the station."',
      options: [
        'reaches',
        'reached',
        'is reaching',
        'has reached'
      ],
      answer: 'reached',
      explanation: 'When two past actions are related by "before", the earlier action takes Past Perfect ("had left") and the later action takes Simple Past ("reached").',
      year: '2017',
      exam: 'CG Vyapam छात्रावास अधीक्षक'
    }
  ],
  mcqs: [
    {
      question: 'Which of the following sentences represents a universal truth?',
      options: [
        'The Sun rises in the east.',
        'I am playing chess.',
        'She has sung a song.',
        'They were running fast.'
      ],
      answer: 'The Sun rises in the east.',
      explanation: '"The Sun rises in the east" is a universal scientific fact and is structured in the Simple Present Tense.'
    },
    {
      question: 'Fill in the blank: "Look! A black snake _______ across the path."',
      options: ['crawls', 'is crawling', 'crawled', 'has crawled'],
      answer: 'is crawling',
      explanation: 'The imperative word "Look!" indicates an action occurring right now in front of the speaker, requiring the Present Continuous Tense ("is crawling").'
    },
    {
      question: 'Choose the correct preposition: "She has been waiting for the bus _______ two hours."',
      options: ['since', 'for', 'from', 'in'],
      answer: 'for',
      explanation: '"Two hours" is a period/duration of time, which requires the preposition "for".'
    },
    {
      question: 'Fill in the blank: "I _______ him for ten years."',
      options: ['am knowing', 'have known', 'have been knowing', 'knows'],
      answer: 'have known',
      explanation: 'Because "know" is a stative verb, it cannot take the continuous form with "for ten years". It must be expressed in the Present Perfect Tense ("have known").'
    },
    {
      question: 'Identify the sentence with an error:',
      options: [
        'He drinks coffee every morning.',
        'She is having three expensive cars.',
        'The train leaves at 9 PM tonight.',
        'I have already seen this movie.'
      ],
      answer: 'She is having three expensive cars.',
      explanation: '"Have" denoting possession is a stative verb and cannot be used in the continuous form. The correct sentence is "She has three expensive cars."'
    },
    {
      question: 'Fill in the blank: "Unless you _______ hard, you will not pass."',
      options: ['work', 'will work', 'worked', 'are working'],
      answer: 'work',
      explanation: 'The conditional clause introduced by "unless" takes the Simple Present Tense ("work"), not future.'
    },
    {
      question: '"The doctor has just _______ the operating theater."',
      options: ['enter', 'entered', 'entering', 'enters'],
      answer: 'entered',
      explanation: 'The adverb "just" in the Present Perfect Tense takes the past participle V3 ("has just entered").'
    },
    {
      question: 'Choose the correct sentence:',
      options: [
        'I am living in Raipur since 2010.',
        'I have been living in Raipur since 2010.',
        'I live in Raipur since 2010.',
        'I lived in Raipur since 2010.'
      ],
      answer: 'I have been living in Raipur since 2010.',
      explanation: 'An action started in 2010 and continuing up to the present with "since 2010" requires Present Perfect Continuous ("have been living").'
    }
  ],
  keyTerminology: [
    {
      term: 'Tense',
      definition: 'The grammatical inflection of a verb that indicates the time of an action (Past, Present, Future) and its aspect of completion.'
    },
    {
      term: 'Aspect',
      definition: 'The dimension of time in grammar that indicates whether an action is ongoing (Continuous), completed (Perfect), or habitual (Simple).'
    },
    {
      term: 'Stative Verb',
      definition: 'A verb describing a state, cognitive process, emotion, or possession (e.g., know, believe, belong) rather than a physical action, resisting continuous aspect.'
    },
    {
      term: 'Dynamic Verb',
      definition: 'A verb that describes an active, physical action or event (e.g., run, write, build), which freely takes continuous (-ing) forms.'
    },
    {
      term: 'First Conditional',
      definition: 'A predictive conditional structure expressing a realistic future possibility: If + Simple Present, will/shall + V1.'
    },
    {
      term: 'Resultative Aspect',
      definition: 'The function of the Present Perfect tense where a completed past event creates an active result state in the present moment.'
    },
    {
      term: 'Point of Time (Since)',
      definition: 'A specific historical or temporal reference moment marking the commencement of an unbroken ongoing action.'
    },
    {
      term: 'Period of Time (For)',
      definition: 'A calculated duration or total length of time through which an action persists.'
    }
  ],
  sources: [
    {
      name: 'High School English Grammar & Composition',
      author: 'Wren & Martin (Revised by N.D.V. Prasada Rao)',
      relevance: 'Comprehensive chapter on Tenses, Present Indefinite uses, and First Conditional rules.'
    },
    {
      name: 'Practical English Usage',
      author: 'Michael Swan (Oxford University Press)',
      relevance: 'Authoritative treatment of Stative Verbs, Since vs For, and Present Perfect resultative nuances.'
    },
    {
      name: 'A Practical English Grammar',
      author: 'A. J. Thomson and A. V. Martinet',
      relevance: 'Detailed breakdown of signal adverbs (already, yet, recently) and conditional clause concord.'
    },
    {
      name: 'CG Vyapam General English Question Bank',
      author: 'Vyapam Examination Directorate (2012-2024)',
      relevance: 'Compilation of 120+ past year questions on present tense structures and error spotting.'
    }
  ],
  confusionBuster: [
    {
      doubt: 'Why is "I am knowing him" wrong in English when in Hindi we say "मैं उसे जान रहा हूँ"?',
      clarification: 'Because "know" is a stative verb in English. Knowing is a state of mental recognition, not an action with a physical start and stop. Stative verbs cannot take "-ing". Always say: "I know him" (or "I have known him for years").'
    },
    {
      doubt: 'Can "have" ever be used in the continuous form ("having")?',
      clarification: 'Yes, but ONLY when it denotes an active experience or consumption (eating/drinking/enjoying). E.g., "I am having dinner" ✔️, "We are having a great time" ✔️. But when "have" denotes ownership/possession, it is stative and cannot take -ing: "I have a car" ✔️ (NOT "I am having a car" ❌).'
    },
    {
      doubt: 'What is the exact difference between "Since" and "For"?',
      clarification: 'Use "Since" when you can name the exact starting clock time, calendar day, month, year, or life event (since 9 AM, since Monday, since 2015, since childhood). Use "For" when you count the number of time units (for 10 minutes, for 4 days, for 5 years).'
    },
    {
      doubt: 'Why can we not say "If it will rain, I will stay home"?',
      clarification: 'English grammar strictly prohibits double future in conditional sentences. The conditional clause introduced by "if", "when", or "unless" must always remain in the Simple Present: "If it rains, I will stay home".'
    },
    {
      doubt: 'Why is "India has won independence in 1947" grammatically incorrect?',
      clarification: 'The Present Perfect ("has won") connects the past to the present. Whenever a specific past time expression is mentioned (in 1947, yesterday, two days ago), you MUST use Simple Past ("India won independence in 1947").'
    }
  ],
  faqList: [
    {
      question: 'What are the four forms of Present Tense in English?',
      answer: '1. Simple Present (Present Indefinite), 2. Present Continuous (Present Progressive), 3. Present Perfect, and 4. Present Perfect Continuous.'
    },
    {
      question: 'When is "s" or "es" added to a verb in Simple Present?',
      answer: 'Only in affirmative sentences when the subject is third-person singular (He, She, It, or a singular noun like Ram, boy).'
    },
    {
      question: 'What is the role of "yet" in the Present Perfect tense?',
      answer: '"Yet" is used at the end of negative statements and questions to show that an anticipated event has not occurred up to the present moment.'
    },
    {
      question: 'Can Present Continuous express future time?',
      answer: 'Yes. Present Continuous is commonly used to express a planned or pre-arranged personal event in the near future (e.g., "I am leaving for Bilaspur tomorrow").'
    },
    {
      question: 'How does CG Vyapam test the Present Tense?',
      answer: 'Vyapam heavily tests stative verbs (know, believe, belong), conditional clauses (If + Simple Present, will + V1), and fill-in-the-blanks with "since" vs "for".'
    }
  ],
  oneLinerRevision: [
    'Simple Present expresses habits, routines, universal truths, and scheduled timetables.',
    'Universal truths remain in the Simple Present even in reported speech (The teacher said that the Earth is round).',
    'Stative verbs (see, hear, know, believe, belong, love) do not take continuous forms.',
    '"Since" denotes a specific point in time; "For" denotes a calculated period or duration.',
    'If a stative verb occurs with since/for, use Present Perfect (I have known him for years).',
    'The First Conditional follows: If + Simple Present, will + V1 (If you run, you will catch the bus).',
    'Do not use Present Perfect with past time markers like "yesterday" or "in 1947" (use Simple Past).',
    'The adverbs "already", "just", and "recently" are signature markers of the Present Perfect tense.',
    '"Yet" is placed at the end of negative sentences and questions in the Present Perfect.',
    'In "It is high time we started", "started" takes the Simple Past tense.'
  ],
  rapidRevision: {
    points: [
      'Simple Present = S + V1(s/es) | Universal Truths, Habits, Timetables',
      'Present Continuous = S + is/am/are + V1-ing | Actions happening right now',
      'Present Perfect = S + has/have + V3 | Past action with present result (already, yet)',
      'Present Perfect Cont. = S + has/have + been + V1-ing + since/for | Past to present ongoing',
      'Stative Verbs ❌ Continuous: know, understand, love, belong, smell, possess',
      'Since = Point of Time (since 2012, since morning) | For = Period of Time (for 5 days)',
      'Conditional: If + Simple Present $\\rightarrow$ will + V1'
    ],
    formula: 'Habit/Truth = V1/V1(s) | Right Now = is/am/are + V1-ing | Since/For = has/have been + V1-ing',
    examTips: [
      'Vyapam Shortcut: Look for "since" or "for"! If followed by time, answer is "has/have been + V1-ing" (unless it is a stative verb like know, then "have known")!',
      'Watch out for "If... will": NEVER put "will" after "If"! The "If" part must be Simple Present ("If you come", NOT "If you will come").'
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = 'cgv_master_eng_tense_1';
    const sanitized = sanitizeForFirestore(noteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    await markTopicCompleted('cgv_master_sub_6', 'cgv_master_sub_6_ch_2', 'eng_tense_1');
    console.log('Topic eng_tense_1 (Present Tense) completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
