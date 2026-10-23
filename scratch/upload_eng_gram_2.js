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
  topicId: 'eng_gram_2',
  title: 'Articles (A, An, The & Zero Article) - Phonetic Rules, Usage & Omission',
  subjectName: 'English Language',
  chapterName: 'Grammar Fundamentals',
  overview: {
    introduction: 'In English grammar, Articles are determiners placed before nouns to specify whether the noun is general or definite. There are two primary types of articles: Indefinite Articles ("A" and "An") and the Definite Article ("The"). The choice between "A" and "An" is determined exclusively by the initial phonetic sound (vowel sound vs consonant sound) of the following spoken word, rather than its orthographic spelling. "The" specifies a particular entity known to both speaker and listener. Equally critical is "Zero Article" (Omission of Articles), where no article is used before certain proper nouns, abstract qualities, sports, meals, languages, and places visited for their primary purpose. In CG Vyapam examinations, Articles are tested heavily in sentence completion, error spotting, and cloze tests with 2 to 4 mandatory questions.',
    importance: 'Article usage is notoriously tricky for bilingual Hindi-speaking students because Hindi does not have direct morphological equivalents for "a/an/the". Mastering the phonetic sound test (Hindi vowels: अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ) guarantees 100% accuracy in choosing between "A" and "An".',
    examRelevance: 'Recurring Vyapam patterns include words starting with silent "H" (an honest man, an hour), words starting with vowel letters but consonant sounds (a university, a European, a one-rupee note), abbreviations (an MLA, an FIR, an SP, an MP), parallel comparatives ("The higher you go, the cooler it is"), and primary vs secondary purpose omissions (school, hospital, prison).',
    quickFacts: [
      'Articles are demonstrative adjectives functioning as determiners.',
      'Indefinite Articles = "A" (before consonant sounds) and "An" (before vowel sounds). Used ONLY with singular countable nouns.',
      'Definite Article = "The" (used with singular, plural, countable, and uncountable nouns when specific).',
      'The phonetic test: If the initial sound falls in Hindi vowel range (अ to औ), use "An"; otherwise use "A".',
      '"A European", "A University", "A Union" take "A" because initial sound is consonant /j/ (य).',
      '"An Honest", "An Hour", "An Heir" take "An" because "h" is silent and initial sound is vowel /ɒ/ (अ/आ).',
      'Abbreviations: "An MLA" (em-el-ay), "An FIR" (ef-ai-ar), "An SP" (es-pee), "An MP", "A BDO".',
      'Zero Article: No article before proper names, sports, languages, meals, and diseases (with few exceptions like the measles).'
    ]
  },
  chapters: [
    {
      id: 'ch_1',
      title: '1. Indefinite Articles (A / An) - The Absolute Phonetic Sound Rule',
      content: '**The Fundamental Rule of A and An**:\n- The choice between **A** and **An** depends entirely on the **initial sound (ध्वनि)** of the word immediately following it, NOT its written letter!\n\n**1. Use of "AN" (Before Vowel Sound / स्वर ध्वनि)**:\n- Used before singular countable nouns beginning with a vowel sound (Hindi vowels: **अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ**):\n  - *an apple, an elephant, an inkpot, an orange, an umbrella*.\n- **Silent "H" Words (Top Vyapam Trap)**:\n  - In these words, "h" is silent, and the pronunciation starts with a vowel sound:\n    - **an hour** (उच्चारण: आउअर)\n    - **an honest man** (उच्चारण: ऑनेस्ट)\n    - **an heir** (उच्चारण: एअर - उत्तराधिकारी) | **an heiress**\n    - **an honor / an honourable person** (उच्चारण: ऑनरेबल)\n- **Abbreviations starting with consonant letters having vowel sounds**:\n  - Say the first letter in English. If it begins with a vowel sound (e.g., F, H, L, M, N, R, S, X):\n    - **an MLA** (एम. एल. ए. $\\rightarrow$ initial sound "ए")\n    - **an MP** (एम. पी.) | **an SP** (एस. पी.)\n    - **an FIR** (एफ. आई. आर.) | **an SDM** (एस. डी. एम.)\n    - **an NCC cadet** (एन. सी. सी.) | **an X-ray technician**\n    - **an LLB student** | **an IAS officer** | **an IPS officer**\n\n**2. Use of "A" (Before Consonant Sound / व्यंजन ध्वनि)**:\n- Used before singular countable nouns beginning with a consonant sound (Hindi consonants: **क से ज्ञ**):\n  - *a boy, a pen, a dog, a horse, a book*.\n- **Vowel Letters with Consonant Sounds (Super Hot Trap)**:\n  - **Words starting with "U" or "EU" sounding like "Yu" (य)**:\n    - **a university** (यूनिवर्सिटी $\\rightarrow$ initial sound "य")\n    - **a European** (यूरोपियन $\\rightarrow$ initial sound "य")\n    - **a union** | **a unit** | **a unique opportunity**\n    - **a utensil** | **a uniform** | **a universal truth**\n    - **a eulogy** | **a ewe** (मादा भेड़)\n  - **Words starting with "O" sounding like "Wa" (व)**:\n    - **a one-rupee note** (वन $\\rightarrow$ initial sound "व")\n    - **a one-eyed man** | **a one-way ticket**'
    },
    {
      id: 'ch_2',
      title: '2. The Definite Article (The) - Standard Geographical & Institutional Usages',
      content: '**"The" is used to refer to a specific, unique, or previously mentioned entity**:\n\n**1. Geographical Names where "The" is MANDATORY**:\n- **Oceans, Seas, and Gulfs**: *the Pacific Ocean, the Atlantic Ocean, the Arabian Sea, the Red Sea, the Persian Gulf, the Bay of Bengal*.\n- **Rivers and Canals**: *the Ganga, the Mahanadi, the Nile, the Amazon, the Thames, the Suez Canal, the Panama Canal*.\n- **Mountain Ranges (श्रृंखलाएं)**: *the Himalayas, the Alps, the Vindhyas, the Andes*.\n  - *TRAP ALERT*: Do NOT use "the" before **individual mountain peaks (शिखर)**: *Mount Everest* (NOT the Mount Everest), *Mount Abu, K2, Nanda Devi*.\n- **Groups of Islands (द्वीप समूह)**: *the Andaman and Nicobar Islands, the West Indies, the Bahamas*.\n  - *TRAP ALERT*: Do NOT use "the" before a **single island**: *Java, Sumatra, Sri Lanka, Sicily*.\n- **Deserts**: *the Sahara Desert, the Thar Desert, the Gobi Desert*.\n- **Countries with plural names or words like Republic, Kingdom, States, Union**:\n  - *the USA, the UK, the UAE, the Netherlands, the Philippines, the Republic of India*.\n  - (Regular country names do NOT take "the": *India, France, Japan, Germany*).\n\n**2. Unique Entities, Heavenly Bodies & Directions**:\n- Entities that are one of a kind: *the Sun, the Moon, the Earth, the sky, the universe, the equator*.\n- Directions (when preceded by a preposition): *in the east, to the north, from the west*.\n  - (Note: Do NOT use "the" if combined with a proper noun or directly after a verb: *Northern India, head west*).\n\n**3. Holy Scriptures, Historical Monuments & Newspapers**:\n- Holy Books: *the Ramayana, the Gita, the Quran, the Bible, the Guru Granth Sahib*.\n  - (Exception: If author\'s name precedes: *Valmiki\'s Ramayana* - NO "the"!).\n- Historical Buildings: *the Taj Mahal, the Red Fort, the Qutub Minar*.\n- Famous Newspapers: *the Hitavada, the Times of India, the Hindu*.'
    },
    {
      id: 'ch_3',
      title: '3. Special & Advanced Usages of "The" (Superlatives, Comparatives & Adjectives as Nouns)',
      content: '**1. With Superlative Degrees & Ordinal Numbers**:\n- **Superlative Degree**: Always takes "the" $\\rightarrow$ *the best, the tallest, the most beautiful, the highest peak*.\n- **Ordinal Numbers**: *the first, the second, the third, the ninth, the last, the next*.\n  - (Cardinal numbers do not take "the": *Chapter one*, but *The first chapter*).\n\n**2. The Parallel Comparative Construction (व्यापाम पेटेंट प्रश्न)**:\n- When two comparative degrees are used in parallel to express proportion (as one increases, the other increases/decreases), BOTH comparatives must be preceded by **"the"**:\n  - *"The higher you go, the cooler you feel."*\n  - *"The more you earn, the more you spend."*\n  - *"The sooner, the better."*\n\n**3. Comparative Degree of Choice (Selection between Two)**:\n- When a comparative degree is followed by **"of the two"**, it takes **"the"**:\n  - *"She is the taller of the two sisters."* (NOT "She is taller of the two sisters")\n  - *"Which is the better of these two pens?"*\n\n**4. Adjectives functioning as Plural Nouns**:\n- When "the" is placed before an adjective, it represents the entire class of people as a plural collective noun (and takes a plural verb!):\n  - **The rich** (= rich people) *should help* **the poor** (= poor people).\n  - *"The brave are respected everywhere."*\n  - *"The injured were taken to hospital."*\n\n**5. Musical Instruments & Inventions**:\n- With musical instruments (when playing/learning): *He plays the flute / the guitar / the harmonium*.\n- Inventions: *the telephone, the television, the wheel* (when referring to the invention as a concept).'
    },
    {
      id: 'ch_4',
      title: '4. Omission of Articles (Zero Article / No Article) - Strict Rules',
      content: 'Using an article where none is required is the most frequent error in Vyapam exams:\n\n**1. Primary Purpose vs Secondary Purpose (The Classic School/Hospital Trap)**:\n- Words like **school, college, university, church, temple, mosque, hospital, prison, jail, market, bed**:\n  - **Primary Purpose (No Article)**: When visited for their fundamental purpose:\n    - *"Children go to school to learn."* (Primary purpose $\\rightarrow$ No article)\n    - *"The injured man was taken to hospital."* (For treatment $\\rightarrow$ No article)\n    - *"He was sent to prison for murder."* (As a prisoner $\\rightarrow$ No article)\n  - **Secondary Purpose (Use "The")**: When visited for an incidental reason or meeting:\n    - *"His father went to the school to meet the principal."* (Secondary $\\rightarrow$ "the" required!)\n    - *"I went to the hospital to visit my sick friend."* (Secondary $\\rightarrow$ "the" required!)\n\n**2. Other Mandatory Omissions of Articles**:\n- **Proper Nouns**: *Raipur, Delhi, Rohan, Shakespeare* (Never "the Raipur").\n- **Abstract & Material Nouns (in general sense)**:\n  - *"Gold is a precious metal."* (General $\\rightarrow$ No article)\n  - *"Honesty is the best policy."* (General $\\rightarrow$ No article)\n  - *Exception (Specific reference)*: *"The gold of Kolar is famous."* | *"The honesty of Rohan was praised."*\n- **Names of Languages, Subjects, Sports & Meals**:\n  - Languages: *English, Hindi, French* (Note: *The English* means the English people!).\n  - Sports: *football, cricket, chess* (*"He plays cricket"*).\n  - Meals: *breakfast, lunch, dinner* (*"We take dinner at 8 PM"*; Exception: *"The dinner given by the Chief Minister was grand"*).\n- **Diseases**: *cancer, cholera, malaria, tuberculosis* (Exceptions: *the measles, the mumps, the flu*).\n- **Titles used in Apposition or before names**: *President Murmu, Prime Minister Modi* (No "the" when direct name follows; but *"The President of India"*).'
    },
    {
      id: 'ch_5',
      title: '5. CG Vyapam Exam Traps, Error Spotting Rules & Rapid Formulas',
      content: '**1. Man / Woman in General Sense**:\n- When "man", "woman", "mankind" are used in a universal sense representing all human beings, NO article is used:\n  - *"Man is mortal."* (NOT "A man is mortal" or "The man is mortal").\n  - *"Mankind should preserve nature."*\n\n**2. "Kind of / Sort of / Type of" Construction**:\n- Nouns following "kind of", "sort of", "type of", "post of", "title of" do NOT take an article:\n  - *"What kind of man is he?"* (NOT "What kind of a man").\n  - *"He was selected for the post of Principal."* (NOT "post of a Principal").\n\n**3. Two Nouns referring to One Person vs Two Different Persons**:\n- If the article is used before the FIRST noun only $\\rightarrow$ One single person (Singular Verb):\n  - *"The Director and Principal has arrived."* (One person holding both posts)\n- If the article is used before BOTH nouns $\\rightarrow$ Two separate individuals (Plural Verb):\n  - *"The Director and the Principal have arrived."* (Two different persons)\n\n**4. A few / Few and A little / Little**:\n- **Few / Little** (without "a") = Almost none (negative sense).\n- **A few / A little** = Some at least (positive sense).\n- **The few / The little** = All of what is available (specific sense).'
    }
  ],
  comparativeTables: [
    {
      title: 'A vs An vs The vs Zero Article - Comprehensive Decision Matrix',
      headers: ['Article', 'Noun Requirement', 'Phonetic / Syntactic Condition', 'When to Use', 'Standard Sentence Example'],
      rows: [
        ['A', 'Singular Countable', 'Consonant initial sound (/k/ to /gy/)', 'Indefinite, general mention', 'He bought a book yesterday.'],
        ['An', 'Singular Countable', 'Vowel initial sound (/a/ to /au/)', 'Indefinite, general mention', 'She is an honest police officer.'],
        ['The', 'Singular/Plural, Countable/Uncountable', 'Specific or previously mentioned entity', 'Definite reference, unique things, superlatives', 'The book you gave me is fascinating.'],
        ['Zero Article', 'Plural, Uncountable, Proper, Material', 'General sense, primary purpose, languages', 'Abstract/material concepts, proper names, meals', 'Gold is expensive, but health is wealth.']
      ]
    },
    {
      title: 'Geographical Names: Mandatory "The" vs Strict "Zero Article"',
      headers: ['Geographical Feature', 'With "The" (Correct)', 'Without "The" (Zero Article - Correct)', 'Reason / Distinction'],
      rows: [
        ['Mountains', 'The Himalayas, the Alps, the Andes', 'Mount Everest, K2, Mount Abu', 'Mountain ranges take "the"; individual peaks do not.'],
        ['Islands', 'The Andamans, the West Indies', 'Java, Sumatra, Sri Lanka, Sicily', 'Islands in a chain/group take "the"; single islands do not.'],
        ['Countries', 'The USA, the UK, the UAE, the Netherlands', 'India, England, France, Japan, Russia', 'Countries with plural names or political words take "the".'],
        ['Water Bodies', 'The Ganga, the Indian Ocean, the Arabian Sea', 'Lake Baikal, Lake Victoria, Dal Lake', 'Rivers, seas, oceans take "the"; individual lakes do not.'],
        ['Cities / States', 'The Punjab (historical land of 5 rivers)', 'Chhattisgarh, Raipur, Mumbai, London', 'Cities and states generally take no article.']
      ]
    },
    {
      title: 'Primary Purpose (No Article) vs Secondary Purpose (Use "The")',
      headers: ['Institution / Place', 'Primary Purpose (Zero Article)', 'Secondary Purpose (Use "The")', 'Syntactic Explanation'],
      rows: [
        ['School / College', 'He goes to school at 8 AM (to study).', 'My father visited the school (to pay fees).', 'Study = primary; visit/meeting = secondary.'],
        ['Hospital', 'The patient was admitted to hospital (treatment).', 'I went to the hospital to see my friend (visitor).', 'Treatment = primary; visiting someone = secondary.'],
        ['Temple / Church', 'She goes to temple every morning (worship).', 'We met near the temple (landmark/meeting point).', 'Prayer = primary; meeting point = secondary.'],
        ['Prison / Jail', 'The thief was sent to prison (inmate).', 'The lawyer went to the prison to meet his client.', 'Imprisonment = primary; legal visit = secondary.'],
        ['Bed', 'It is time to go to bed (to sleep).', 'He sat on the bed to tie his shoes (as furniture).', 'Sleep = primary; physical furniture = secondary.']
      ]
    }
  ],
  pyqs: [
    {
      question: 'Fill in the blank with the appropriate article: "He is _______ European."',
      options: [
        'a',
        'an',
        'the',
        'no article'
      ],
      answer: 'a',
      explanation: 'Although "European" begins with the vowel letter "E", its pronunciation starts with the consonant sound /j/ ("य" as in "यु"). Therefore, it takes the indefinite article "a" (a European).',
      year: '2023',
      exam: 'CG Vyapam संयुक्त भर्ती परीक्षा'
    },
    {
      question: 'Choose the correct article: "Copper is _______ useful metal."',
      options: [
        'a',
        'an',
        'the',
        'no article'
      ],
      answer: 'a',
      explanation: 'The word "useful" begins with the phonetic consonant sound /j/ (sound of "य"), hence it takes "a" (a useful metal).',
      year: '2022',
      exam: 'CG Vyapam पटवारी भर्ती'
    },
    {
      question: 'Fill in the blank: "He lodged _______ FIR at the police station."',
      options: [
        'a',
        'an',
        'the',
        'no article'
      ],
      answer: 'an',
      explanation: 'The abbreviation "FIR" begins with the letter "F", pronounced as "eff" (initial sound is vowel /e/ or "ए"). Thus it takes "an" (an FIR).',
      year: '2021',
      exam: 'CG Vyapam खाद्य निरीक्षक'
    },
    {
      question: 'Select the correct sentence:',
      options: [
        'The higher you go, cooler you feel.',
        'Higher you go, the cooler you feel.',
        'The higher you go, the cooler you feel.',
        'A higher you go, a cooler you feel.'
      ],
      answer: 'The higher you go, the cooler you feel.',
      explanation: 'In parallel comparative structures expressing direct proportion, the definite article "the" must precede both comparative adjectives: "The + comparative..., the + comparative...".',
      year: '2019',
      exam: 'CG Vyapam DEO'
    },
    {
      question: 'Fill in the blank: "He is _______ honest officer."',
      options: [
        'a',
        'an',
        'the',
        'no article'
      ],
      answer: 'an',
      explanation: 'In "honest", the letter "h" is completely silent. The word begins with the vowel sound /ɒ/ (ऑ). Therefore, it takes "an".',
      year: '2018',
      exam: 'CG Vyapam शिक्षक पात्रता परीक्षा (TET)'
    },
    {
      question: 'Fill in the blank: "_______ Mount Everest is the highest peak in the world."',
      options: [
        'A',
        'An',
        'The',
        'No article'
      ],
      answer: 'No article',
      explanation: 'Individual mountain peaks (Mount Everest, Mount Abu, K2) never take the article "the". "The" is used only before mountain ranges (the Himalayas, the Alps).',
      year: '2017',
      exam: 'CG Vyapam छात्रावास अधीक्षक'
    }
  ],
  mcqs: [
    {
      question: 'Which of the following phrases uses the article INCORRECTLY?',
      options: ['An MLA', 'A university', 'An one-rupee note', 'An hour'],
      answer: 'An one-rupee note',
      explanation: '"One" begins with the consonant sound /w/ ("व"), so it takes "a" (a one-rupee note), not "an".',
      year: '2020',
      exam: 'CG Vyapam RI'
    },
    {
      question: 'Fill in the blank: "She is _______ taller of the two sisters."',
      options: ['a', 'an', 'the', 'no article'],
      answer: 'the',
      explanation: 'When a comparative degree is followed by "of the two" indicating a specific choice between two, it must be preceded by "the".',
      year: '2019',
      exam: 'CG Vyapam AG-3'
    },
    {
      question: '"The rich should help the poor." Here, "The rich" means:',
      options: ['Rich person', 'Rich people in general', 'Wealth', 'A specific wealthy man'],
      answer: 'Rich people in general',
      explanation: 'When "the" is placed before an adjective, it functions as a plural common noun representing all people of that class.',
      year: '2021',
      exam: 'CG Vyapam Mandi Inspector'
    },
    {
      question: 'Fill in the blank: "Man is _______ mortal."',
      options: ['a', 'an', 'the', 'no article'],
      answer: 'no article',
      explanation: '"Man" used in a universal sense representing all humanity takes no article: "Man is mortal."',
      year: '2022',
      exam: 'CG Vyapam Sub-Engineer'
    },
    {
      question: 'Which of the following abbreviations takes "A" instead of "An"?',
      options: ['SP', 'MLA', 'BDO', 'SDM'],
      answer: 'BDO',
      explanation: '"BDO" begins with the consonant sound /b/ ("ब"), hence it takes "a BDO". The others (SP = /es/, MLA = /em/, SDM = /es/) take "an".',
      year: '2018',
      exam: 'CG Vyapam Lab Assistant'
    },
    {
      question: 'Fill in the blank: "He plays _______ guitar very well."',
      options: ['a', 'an', 'the', 'no article'],
      answer: 'the',
      explanation: 'Musical instruments take the definite article "the" when playing or learning them: "plays the guitar".',
      year: '2017',
      exam: 'CG Vyapam VDO'
    },
    {
      question: 'Choose the correct sentence:',
      options: [
        'He goes to the school by bus to study.',
        'He goes to school by bus to study.',
        'He goes to a school by bus to study.',
        'He goes to an school by bus to study.'
      ],
      answer: 'He goes to school by bus to study.',
      explanation: 'When school is visited for its primary purpose (study), no article is used before "school".',
      year: '2023',
      exam: 'CG Vyapam Mahila Supervisor'
    },
    {
      question: 'Fill in the blank: "I have _______ little money left, so I cannot buy food."',
      options: ['a', 'an', 'the', 'little (no article)'],
      answer: 'little (no article)',
      explanation: '"Little" without an article conveys a negative meaning ("almost none"), which fits the consequence "I cannot buy food".',
      year: '2019',
      exam: 'CG Vyapam Assistant Gr-3'
    }
  ],
  keyTerminology: [
    {
      term: 'Indefinite Article',
      definition: 'The articles "a" and "an", which refer to non-specific singular countable nouns whose identity is unknown to the listener.'
    },
    {
      term: 'Definite Article',
      definition: 'The article "the", which points out a specific person, place, or thing already identified or unique in context.'
    },
    {
      term: 'Zero Article',
      definition: 'The deliberate absence or omission of an article before nouns in specific grammatical contexts (e.g., proper nouns, languages).'
    },
    {
      term: 'Phonetic Sound Test',
      definition: 'The grammatical principle that selects "a" or "an" strictly based on the spoken vowel or consonant sound of the subsequent word.'
    },
    {
      term: 'Primary Purpose',
      definition: 'The core institutional function for which a facility exists (e.g., treatment in a hospital, learning in a school), requiring zero article.'
    },
    {
      term: 'Secondary Purpose',
      definition: 'An incidental or non-routine reason for visiting an institution (e.g., visiting a patient in a hospital), requiring the article "the".'
    },
    {
      term: 'Parallel Comparative',
      definition: 'A syntactic construction (The + comparative..., the + comparative...) expressing proportional change.'
    },
    {
      term: 'Nominalized Adjective',
      definition: 'An adjective preceded by "the" that functions as a plural collective noun (e.g., the blind, the poor, the rich).'
    }
  ],
  sources: [
    {
      name: 'High School English Grammar & Composition',
      author: 'Wren & Martin (Revised Edition)',
      relevance: 'Comprehensive rules on Articles (A, An, The) and detailed omission guidelines.'
    },
    {
      name: 'Practical English Usage',
      author: 'Michael Swan (Oxford University Press)',
      relevance: 'Nuanced phonetic sound principles, geographical usages, and zero article contexts.'
    },
    {
      name: 'A Practical English Grammar',
      author: 'Thomson and Martinet',
      relevance: 'Primary vs secondary purpose distinctions for schools, prisons, and hospitals.'
    },
    {
      name: 'CG Vyapam English Previous Years Solved Papers',
      author: 'Vyapam Exam Directorate (2012-2024)',
      relevance: 'Collection of 80+ past article questions from Patwari, RI, and Combined exams.'
    }
  ],
  confusionBuster: [
    {
      doubt: 'Why is it "a university" and not "an university" when U is a vowel?',
      clarification: 'Because articles depend on SOUND, not spelling! "University" begins with the consonant sound /j/ (the sound of "य" in Hindi: यू). Since "य" is a consonant sound, it takes "a" (a university, a unit, a European). "An" is used only when the sound is an actual vowel (an umbrella, an uncle).'
    },
    {
      doubt: 'Why do we say "an MLA" when M is a consonant letter?',
      clarification: 'When pronouncing the abbreviation "M.L.A.", the letter M is pronounced as "em" (initial sound is the vowel "ए"). Since it begins with a vowel sound, it takes "an" (an MLA, an MP, an SP, an FIR).'
    },
    {
      doubt: 'When do we use "the" with mountain names?',
      clarification: 'Use "the" ONLY with mountain ranges (the Himalayas, the Alps, the Rockies). Do NOT use "the" with individual peaks or summits (Mount Everest, Mount Abu, K2, Annapurna).'
    },
    {
      doubt: 'What is the difference between "He went to church" and "He went to the church"?',
      clarification: '"He went to church" means he went there for the primary purpose of worship or prayer. "He went to the church" means he went there for a secondary purpose, such as repairing a window or meeting an architect.'
    },
    {
      doubt: 'Why is it "the USA" but just "India"?',
      clarification: 'Country names that contain descriptive words like "United", "States", "Kingdom", "Republic", or that have plural names take "the" (the USA, the UK, the Netherlands). Regular singular country names do not take any article (India, France, Japan).'
    }
  ],
  faqList: [
    {
      question: 'What are the two types of articles in English?',
      answer: 'Indefinite Articles ("A" and "An") and the Definite Article ("The").'
    },
    {
      question: 'What determines whether to use "A" or "An"?',
      answer: 'The initial sound of the word that immediately follows. Use "an" before a vowel sound (अ to औ), and "a" before a consonant sound (क to ज्ञ).'
    },
    {
      question: 'When is no article (Zero Article) used before nouns?',
      answer: 'Before proper nouns, languages, sports, meals, abstract nouns in general sense, and institutions (school, hospital) when visited for their primary purpose.'
    },
    {
      question: 'Why do abbreviations like "FIR" take "an"?',
      answer: 'Because the letter F is pronounced "eff", which starts with the vowel sound "ए".'
    },
    {
      question: 'How does CG Vyapam test articles?',
      answer: 'Through fill-in-the-blanks with confusing vowel/consonant words (university, European, honest, MLA), error spotting with parallel comparatives, and zero article omissions.'
    }
  ],
  oneLinerRevision: [
    'The choice between A and An is determined strictly by the initial phonetic sound, not spelling.',
    'Words starting with "U" or "Eu" pronounced as "Yu" take "a" (a university, a European).',
    'Words with silent "h" take "an" (an honest man, an hour, an heir).',
    'Consonant abbreviations pronounced with an initial vowel sound take "an" (an MLA, an FIR, an SP).',
    'Mountain ranges take "the" (the Himalayas), but individual peaks take no article (Mount Everest).',
    'Countries with "States", "Kingdom", or plural names take "the" (the USA, the Netherlands).',
    'In parallel comparative structures, both clauses take "the" (The higher you go, the cooler you feel).',
    'Adjectives preceded by "the" represent the entire plural class (The rich = rich people).',
    'Institutions take no article for primary purpose (to hospital for treatment), but take "the" for secondary purpose.',
    'Universal nouns like "Man" take no article (Man is mortal).'
  ],
  rapidRevision: {
    points: [
      'An hour, an honest man, an heir, an honor | A university, a European, a one-eyed man',
      'An MLA, an MP, an SP, an FIR, an SDM, an NCC | A BDO, a BA, a DSP',
      'The Ganga, the Himalayas, the Pacific Ocean, the USA, the Times of India',
      'Mount Everest ❌ (No "the") | Sri Lanka ❌ (No "the") | India ❌ (No "the")',
      'The higher..., the cooler... | She is the taller of the two sisters',
      'The rich (plural verb) | The poor (plural verb)',
      'Go to hospital (treatment) vs Go to the hospital (visitor)'
    ],
    formula: 'Vowel Sound (अ to औ) = AN | Consonant Sound (क to ज्ञ) = A | Specific / Unique = THE | General Concept = ZERO',
    examTips: [
      'Vyapam Shortcut: Look at the letter sound in Hindi! European = य $\\rightarrow$ A; University = य $\\rightarrow$ A; MLA = ए $\\rightarrow$ AN; FIR = ए $\\rightarrow$ AN; Honest = ऑ $\\rightarrow$ AN!',
      'Watch out for "Mount Everest" — never put "The" before it! "The Himalayas" is correct, but "Mount Everest" stands without any article.'
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = 'cgv_master_eng_gram_2';
    const sanitized = sanitizeForFirestore(noteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    await markTopicCompleted('cgv_master_sub_6', 'cgv_master_sub_6_ch_1', 'eng_gram_2');
    console.log('Topic eng_gram_2 (Articles) completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
