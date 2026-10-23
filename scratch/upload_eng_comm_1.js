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
      return obj.map(row => ({ cells: row.map(c => (c === undefined ? null : c)) }));
    }
    return obj.map(sanitizeForFirestore);
  }
  if (obj !== null && typeof obj === 'object') {
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

const studyNoteData = {
  topicId: 'eng_comm_1',
  topicName: 'Official Communication',
  subjectId: 'cgv_master_sub_6',
  subjectName: 'English Language',
  chapterId: 'cgv_master_sub_6_ch_12',
  chapterName: 'Communication English',
  lastUpdated: new Date().toISOString(),

  overview: {
    introduction: "Official Communication encompasses the formal, structured, and legally recognized correspondence used in government administration, public sector undertakings, and corporate governance. In competitive examinations like CG Vyapam (Hostel Warden, RI, Patwari, Sub-Engineer, ADEO) and CGPSC, official communication covers the precise drafting formats, salutations, complimentary closes, structural layouts, and standard administrative terminologies of Formal Letters, Official Notices, Circulars, Memorandums, and Professional Email etiquette.",
    importance: "Government officials communicate through written records that carry legal validity and administrative accountability. Questions in CG Vyapam directly test letter formats (e.g., placement of sender's address, date style, difference between 'Yours faithfully' and 'Yours sincerely'), notice drafting rules (passive voice, word limits, box layout), and contemporary email protocol (CC vs. BCC, professional subject lines). Mastering these conventions guarantees full marks in the communication section.",
    examRelevance: "CG Vyapam frequently includes 2 to 4 questions from Official Communication, especially focusing on: (1) Correct complimentary close based on salutation, (2) Mandatory elements of an official notice (issuing authority, date, designation), (3) Distinction between Official Letter, Demi-Official (D.O.) Letter, and Office Memorandum (OM), and (4) Email protocols such as 'Blind Carbon Copy' (BCC) confidentiality and attachment etiquette.",
    quickFacts: [
      "Standard salutation 'Dear Sir/Madam' formally requires 'Yours faithfully' as complimentary close.",
      "Salutation mentioning recipient's surname ('Dear Mr. Sharma') takes 'Yours sincerely'.",
      "A formal Notice is always enclosed within a neat rectangular box and written in objective third person.",
      "In modern British and Indian official correspondence, the Full-Block style (everything aligned to the left margin) is widely adopted.",
      "BCC (Blind Carbon Copy) conceals recipient email addresses from other recipients, ensuring privacy in bulk circulars.",
      "Demi-Official (D.O.) letters are written in first person ('I') between officers of equal status to invite personal attention."
    ]
  },

  chapters: [
    {
      chapterNumber: 1,
      title: "Formal Letter Writing: Structure, Hierarchy, and Block Format",
      content: "Formal letters in official and business settings follow rigid structural conventions. Modern official correspondence overwhelmingly prefers the 'Full Block Format' where every element—from sender's address to signature block—begins flush with the left margin, without indentations. The sequential components of a formal letter include: (1) Sender's Address / Letterhead, (2) Date (written formally as '24th October 2026' or 'October 24, 2026', never '24/10/26'), (3) Inside Address (Designation, Department, Address of Recipient), (4) Subject Heading (concise, underlined or bold, summarizing the core matter), (5) Salutation ('Sir/Madam' or 'Dear Sir/Madam'), (6) Body of the Letter (structured into Introductory paragraph, Main detailed paragraph, and Concluding actionable paragraph), (7) Complimentary Close ('Yours faithfully' / 'Yours truly'), (8) Signature and Designation of the Sender, and (9) Enclosures (Encl.) if annexures are attached.",
      keyPoints: [
        "Full Block Format: All components align flush to the left margin without paragraph indentation.",
        "Formal Date Style: Must avoid purely numerical slash formats (e.g., use '15 August 2026' or 'August 15, 2026').",
        "Subject Line: Should be brief, specific, and placed immediately above or below the salutation.",
        "Salutation Pairing Rule: 'Sir/Madam' pairs with 'Yours faithfully'; 'Dear Mr. [Name]' pairs with 'Yours sincerely'.",
        "Sign-off capitalization: Only the first word in the complimentary close is capitalized ('Yours faithfully', 'Y' capital, 'f' lowercase)."
      ],
      examples: [
        "Correct Address Block: The Municipal Commissioner, Municipal Corporation Raipur, Raipur (C.G.) - 492001.",
        "Correct Date: 12th November 2026 (Incorrect: 12-11-26 or 12/11/2026 in formal drafts).",
        "Correct Sign-off: 'Yours faithfully,' followed by signature and '(R. K. Verma), Executive Engineer'."
      ],
      subtopics: [
        "Components of a Formal Business/Official Letter",
        "Block Format vs. Semi-Block Format",
        "Salutation and Complimentary Close Concordance"
      ]
    },
    {
      chapterNumber: 2,
      title: "Notice Drafting: Format, Tone, and Essential Elements",
      content: "A Notice is a formal written or printed announcement meant for a targeted group of people to impart vital information about an upcoming event, decision, meeting, instruction, or lost/found item. In administrative examinations, the structural format of a notice follows strict rules: (1) The entire notice MUST be enclosed within a rectangular bounding box, (2) Name of the Issuing Organization / Authority centered at the very top in capital letters, (3) The word 'NOTICE' printed boldly and prominently in capital letters below the organization name, (4) Date of issuance aligned usually to the left (or right margin), (5) A concise, descriptive Heading / Title stating the subject matter, (6) Body of the Notice detailing the 5 Ws: What (event/issue), When (date and time), Where (venue), Who (target audience/participants), and Whom to contact, (7) Impersonal passive voice without first-person pronouns ('I', 'We'), (8) Standard word limit (traditionally capped at 50 words), and (9) Signature, Name (in block letters), and Designation of the issuing authority at the bottom left.",
      keyPoints: [
        "Box Enclosure: A notice must always be framed within a closed box.",
        "Issuing Organization & 'NOTICE': Must be centered and capitalized at the top.",
        "Voice & Tone: Impersonal, formal, precise, and passive (e.g., 'It is hereby informed that...' rather than 'I want to inform you').",
        "Essential Details (5 Ws): What, Where, When, Who is eligible, and Whom to approach.",
        "Sign-off Elements: Signature, Full Name in parentheses/block letters, and Official Designation."
      ],
      examples: [
        "Standard Opening: 'This is to inform all departmental employees that the annual audit will commence from 1st November 2026.'",
        "Contact Directive: 'For further details or clarification, the undersigned may be contacted during office hours.'",
        "Lost & Found Notice: 'A black leather folder containing property documents was found in the secretariat corridor on 10th October 2026. The rightful owner may claim it from Room No. 204 after providing proper identification.'"
      ],
      subtopics: [
        "Structural Layout and 50-word Economy",
        "Passive Voice Syntax in Administrative Notices",
        "Types of Notices: Public, Meeting, Tender, Lost/Found"
      ]
    },
    {
      chapterNumber: 3,
      title: "Official Correspondence Types: Circulars, Office Memorandums, and D.O. Letters",
      content: "Government communication relies on distinct correspondence instruments tailored to specific administrative channels: (1) Official Letter: Used for external communication with other governments, subordinate departments, or private citizens. Employs formal tone, third-person perspective, and standard letter format. (2) Office Memorandum (O.M.): Used for internal horizontal and vertical communication between departments or ministries. Written in third person, does NOT carry a salutation ('Dear Sir') or a complimentary close ('Yours faithfully'); it concludes simply with the signature and designation of the issuing officer. (3) Circular: An official letter or memo intended for mass internal dissemination conveying policy decisions, rules, or general instructions to multiple subordinate offices simultaneously. (4) Demi-Official (D.O.) Letter: An informal/semi-formal correspondence written by one government officer to another of similar or slightly higher rank to draw immediate personal attention to a pressing official matter. Unlike other official letters, a D.O. letter is written in the first person ('I should be grateful if...'), begins with a personalized salutation ('Dear Shri Gupta'), and closes with 'Yours sincerely'.",
      keyPoints: [
        "Office Memorandum (OM): Internal correspondence without salutation ('Sir') or complimentary close ('Yours faithfully').",
        "Demi-Official (D.O.) Letter: First-person voice ('I'), personal salutation ('Dear Shri...'), personal close ('Yours sincerely').",
        "Circular: Broad distribution instrument transmitting common orders or notifications across several divisions.",
        "Notification (Rajpatra / Gazette): Statutory instrument published in the official gazette to proclaim laws, rules, or appointments.",
        "Endorsement (Prishtankan): A brief noting forwarding a copy of a communication to other departments for information or action."
      ],
      examples: [
        "Office Memorandum Opening: 'The undersigned is directed to convey the sanction of the Governor for the creation of 50 new posts of Assistant Engineers.'",
        "D.O. Letter Salutation: 'Dear Shri Ramanathan,' ... Close: 'Yours sincerely, (Amitabh Kant)'.",
        "Endorsement Formula: 'Copy forwarded to the Director of Agriculture for information and necessary compliance.'"
      ],
      subtopics: [
        "Office Memorandum vs. Official Letter",
        "Demi-Official (D.O.) Letter Conventions",
        "Circulars, Notifications, and Endorsements"
      ]
    },
    {
      chapterNumber: 4,
      title: "Professional Email Etiquette and Digital Communication",
      content: "Modern administration and public governance heavily utilize electronic mail (email). Professional email drafting requires adherence to strict etiquette: (1) Subject Line: Must be specific, concise, actionable, and informative (e.g., 'Submission of Quarterly Financial Report - Q2 2026' rather than 'Report' or 'Urgent!'). (2) CC vs. BCC: 'Carbon Copy' (CC) is used to keep stakeholders informed who do not need to take immediate action; all recipients can see CC addresses. 'Blind Carbon Copy' (BCC) hides recipient addresses, preventing data leakage and spam when sending announcements to large external groups. (3) Salutation: Use professional greetings ('Dear Mr. Sharma,', 'Dear Dr. Patel,', 'Good morning Ms. Roy,'); avoid overly casual greetings like 'Hey!' or 'Yo!'. (4) Body: Concise paragraphs, bulleted action items, bold keywords for readability, and professional sign-offs ('Warm regards', 'Best regards', 'Sincerely'). (5) Attachment Rules: Always mention attachments in the body ('Please find attached the signed approval document in PDF format'), ensure files are properly compressed and clearly named.",
      keyPoints: [
        "Subject Line Precision: A vague subject line often results in overlooked or unread emails.",
        "BCC for Privacy: Essential when emailing multiple citizens or external vendors to safeguard email privacy.",
        "'Reply All' Caution: Never use 'Reply All' unless every single person on the thread genuinely requires the update.",
        "Tone and Formatting: Avoid ALL CAPS (perceived as shouting), colored or decorative fonts, and excessive punctuation (!!!).",
        "Professional Signature: Includes Full Name, Job Title, Organization, Phone Extension, and Official Website/Portal link."
      ],
      examples: [
        "Effective Subject Line: 'Request for Approval: Revised Hostel Warden Recruitment Roster 2026'.",
        "Ineffective Subject Line: 'Check this' or 'Important query' or 'URGENT PLEASE READ'.",
        "Attachment Mention: 'Attached herewith is the revised draft syllabus (File: CGV_Syllabus_2026.pdf) for your review.'"
      ],
      subtopics: [
        "Anatomy of a Professional Email",
        "Difference between To, CC, and BCC",
        "Netiquette: Tone, Capitalization, and Attachment Protocol"
      ]
    },
    {
      chapterNumber: 5,
      title: "Administrative Terminology, Standard Phrases, and Translation",
      content: "Official communication in bilingual states like Chhattisgarh demands fluency in standardized administrative phrases and official register. Government files and letters frequently feature fixed administrative formulas: (1) 'In continuation of this office letter of even number...' (कार्यालयीन समसंख्यक पत्र के अनुक्रम में), (2) 'The matter is under active consideration' (मामला सक्रिय विचाराधीन है), (3) 'Sanction is hereby accorded' (एतद्द्वारा स्वीकृति प्रदान की जाती है), (4) 'Action may be taken as deemed fit' (यथोचित कार्रवाई की जाए), (5) 'Prima facie' (प्रथम दृष्टया - at first sight), (6) 'Ex-officio' (पदेन - by virtue of one's office), (7) 'Ad-hoc' (तदर्थ - arranged for a particular purpose only), (8) 'Inter alia' (अन्य बातों के साथ-साथ - among other things), and (9) 'Sine qua non' (अपरिहार्य शर्त - an indispensable condition). Questions in Vyapam frequently ask candidates to choose the accurate English equivalent of administrative terms or correct ungrammatical administrative phrasing.",
      keyPoints: [
        "Administrative Formulae: Fixed expressions that convey precise legal and bureaucratic authority.",
        "Latin Terms in Administration: 'Ad hoc', 'Ex-officio', 'Prima facie', 'De facto', 'De jure', 'Ipso facto'.",
        "Hierarchy of File Movement: 'Put up for approval', 'Perused and returned', 'Recommended for sanction'.",
        "Standard English-Hindi Concordance: Gazetted Officer (राजपत्रित अधिकारी), Competent Authority (सक्षम प्राधिकारी), Model Code of Conduct (आदर्श आचार संहिता).",
        "Clarity and Conciseness: Avoiding archaic 'bureaucratese' (e.g., replace 'we are in receipt of your letter' with 'we have received your letter')."
      ],
      examples: [
        "'Sanction is hereby accorded by the Competent Authority for expenditure of \\$50,000 / Rs. 50,000.'",
        "'The committee met on an ad-hoc basis to resolve border disputes.'",
        "'The Collector is the ex-officio Chairman of the District Disaster Management Authority.'"
      ],
      subtopics: [
        "Standard Administrative Idioms and Collocations",
        "Common Latin Terms Used in Official Documents",
        "English to Hindi Administrative Register Equivalents"
      ]
    }
  ],

  comparativeTables: [
    {
      title: "Comparison of Formal Letter, Office Memorandum (OM), and Demi-Official (D.O.) Letter",
      headers: ["Parameter", "Official Letter", "Office Memorandum (OM)", "Demi-Official (D.O.) Letter"],
      rows: [
        ["Primary Purpose", "External communication with other departments/public", "Internal inter-departmental communication", "Personal communication between officers of equal status"],
        ["Grammatical Person", "Third person / Formal first person", "Third person strictly ('The undersigned is directed...')", "First person singular ('I am writing to bring...')"],
        ["Salutation Used", "Formal ('Sir / Madam')", "None (No salutation whatsoever)", "Personal ('Dear Shri / Dear Dr. [Name]')"],
        ["Complimentary Close", "'Yours faithfully' / 'Yours truly'", "None (Directly signed with designation)", "'Yours sincerely'"],
        ["Tone", "Highly formal, impersonal, statutory", "Impersonal, passive, bureaucratic", "Semi-formal, personal yet official"]
      ]
    },
    {
      title: "Notice vs. Circular: Key Distinctions",
      headers: ["Feature", "Notice (सूचना)", "Circular (परिपत्र)"],
      rows: [
        ["Format", "Enclosed in a rectangular box with bold 'NOTICE'", "Standard official letter or memorandum format"],
        ["Target Audience", "General public, students, or institutional staff at large", "Internal employees or subordinate branch offices"],
        ["Display / Transmission", "Displayed on physical/digital notice boards", "Circulated via internal dispatch, postal mail, or email list"],
        ["Word Count", "Strictly concise (typically capped at 50 words)", "Comprehensive, can span multiple paragraphs or pages"],
        ["Tone & Voice", "Passive voice, impersonal directives", "Instructional, procedural, and regulatory"]
      ]
    },
    {
      title: "Email Fields: To, CC, and BCC Comparison",
      headers: ["Field", "Full Name", "Visibility to Other Recipients", "Primary Usage"],
      rows: [
        ["To", "Primary Addressee", "Fully visible to all recipients (To, CC, BCC)", "Direct action is expected from these individuals"],
        ["CC", "Carbon Copy", "Fully visible to all recipients (To, CC, BCC)", "For information/awareness; no direct action required"],
        ["BCC", "Blind Carbon Copy", "Completely hidden from 'To' and 'CC' recipients", "Mass notification to external lists to preserve email privacy"]
      ]
    }
  ],

  pyqs: [
    {
      question: "Which of the following complimentary closes is correctly paired when a formal letter begins with the salutation 'Dear Sir'?",
      options: [
        "A) Yours affectionate",
        "B) Yours faithfully",
        "C) Yours sincerely",
        "D) Yours lovingly"
      ],
      answer: "B) Yours faithfully",
      explanation: "According to standard British and Indian formal letter writing conventions, when the letter begins with the impersonal salutation 'Dear Sir' or 'Sir/Madam', the correct complimentary close is 'Yours faithfully'. 'Yours sincerely' is used when the recipient is addressed by personal surname (e.g., 'Dear Mr. Verma').",
      examTag: "CG Vyapam Sub-Engineer",
      year: "2023"
    },
    {
      question: "In the drafting of an official Notice, which of the following elements is strictly MANDATORY regarding its presentation?",
      options: [
        "A) It must be printed in red ink",
        "B) It must be enclosed within a rectangular box",
        "C) It must include photographs of all committee members",
        "D) It must end with 'Yours obediently'"
      ],
      answer: "B) It must be enclosed within a rectangular box",
      explanation: "A standard structural rule of notice writing is that the entire notice must be framed inside a closed rectangular box. It never uses 'Yours obediently' (an archaic school student close) and does not require colored ink or photos.",
      examTag: "CG Vyapam ADEO",
      year: "2022"
    },
    {
      question: "What is the primary characteristic that distinguishes an Office Memorandum (OM) from an Official Letter?",
      options: [
        "A) An OM has neither a salutation nor a complimentary close",
        "B) An OM is always written in verse",
        "C) An OM must be signed by the President of India directly",
        "D) An OM cannot be stored in government archives"
      ],
      answer: "A) An OM has neither a salutation nor a complimentary close",
      explanation: "An Office Memorandum (OM) is an internal administrative instrument written in the third person (typically opening with 'The undersigned is directed to...'). It does not feature any salutation (like 'Sir') or complimentary close (like 'Yours faithfully').",
      examTag: "CGPSC State Service Exam (Language Paper)",
      year: "2021"
    },
    {
      question: "In professional email communication, what does 'BCC' stand for and what is its primary function?",
      options: [
        "A) Business Carbon Copy; used to charge billing fees to the recipient",
        "B) Blind Carbon Copy; conceals recipient email addresses from other recipients",
        "C) Backup Central Channel; sends a copy to the server hard drive",
        "D) Basic Communication Code; encrypts message attachments"
      ],
      answer: "B) Blind Carbon Copy; conceals recipient email addresses from other recipients",
      explanation: "BCC stands for 'Blind Carbon Copy'. Recipients added in the BCC field receive the email without their addresses being visible to anyone in the 'To' or 'CC' fields, ensuring privacy and preventing spam.",
      examTag: "CG Vyapam Hostel Warden",
      year: "2024"
    },
    {
      question: "Choose the correct administrative English equivalent for the official Hindi term 'सक्षम प्राधिकारी':",
      options: [
        "A) Capable Officer",
        "B) Competent Authority",
        "C) Effective Management",
        "D) Powerful Master"
      ],
      answer: "B) Competent Authority",
      explanation: "In official government terminology, 'सक्षम प्राधिकारी' is standardized as 'Competent Authority'—the legally designated officer empowered to sanction or execute specific administrative actions.",
      examTag: "CG Vyapam Revenue Inspector (RI)",
      year: "2020"
    },
    {
      question: "Which of the following correspondence types is written in the FIRST PERSON ('I') between officers of equal status for urgent attention?",
      options: [
        "A) Office Memorandum",
        "B) Gazette Notification",
        "C) Demi-Official (D.O.) Letter",
        "D) Public Notice"
      ],
      answer: "C) Demi-Official (D.O.) Letter",
      explanation: "A Demi-Official (D.O.) letter is exchanged between officers of equal or nearly equal rank to expedite urgent official matters. It adopts a personal first-person voice ('I request your personal intervention...'), begins with 'Dear Shri [Surname]', and closes with 'Yours sincerely'.",
      examTag: "CG Vyapam Patwari Exam",
      year: "2022"
    }
  ],

  mcqs: [
    {
      id: "eng_comm_1_m1",
      question: "Which punctuation mark or capitalization is correct in the complimentary close of a formal letter?",
      options: [
        "A) Yours Faithfully,",
        "B) Yours faithfully,",
        "C) Your's faithfully,",
        "D) Yours faithfully."
      ],
      answer: "B) Yours faithfully,",
      explanation: "In standard formal letter writing, only the first word is capitalized ('Yours'), the second word begins with a lowercase letter ('faithfully'), there is never an apostrophe in the possessive pronoun 'Yours', and it is followed by a comma.",
      difficulty: "easy"
    },
    {
      id: "eng_comm_1_m2",
      question: "What is the standard recommended word limit for writing an official Notice in professional drafting examinations?",
      options: [
        "A) 20 words",
        "B) 50 words",
        "C) 150 words",
        "D) 250 words"
      ],
      answer: "B) 50 words",
      explanation: "Standard notice drafting conventions strictly prescribe a concise word limit of around 50 words to communicate all essential details (What, When, Where, Whom) without unnecessary elaboration.",
      difficulty: "easy"
    },
    {
      id: "eng_comm_1_m3",
      question: "In the Full Block format of official letters, where are all components (such as date, salutation, body paragraphs, and sign-off) aligned?",
      options: [
        "A) Right margin",
        "B) Centered on the page",
        "C) Flush with the left margin",
        "D) Indented five spaces from the left"
      ],
      answer: "C) Flush with the left margin",
      explanation: "In Full Block format, every single component starts flush against the left margin without any indentations. Paragraphs are separated by a blank line.",
      difficulty: "easy"
    },
    {
      id: "eng_comm_1_m4",
      question: "Which Latin term is used in official correspondence to denote an appointment or committee created 'for a specific purpose only'?",
      options: [
        "A) De facto",
        "B) Ad hoc",
        "C) Ex officio",
        "D) Sine qua non"
      ],
      answer: "B) Ad hoc",
      explanation: "'Ad hoc' is a Latin phrase meaning 'for this purpose'—it refers to bodies, committees, or posts created temporarily for a specific assignment or immediate requirement.",
      difficulty: "medium"
    },
    {
      id: "eng_comm_1_m5",
      question: "Which of the following is considered BAD etiquette in professional email writing?",
      options: [
        "A) Writing the entire message in ALL CAPITAL LETTERS",
        "B) Mentioning attached file names in the body text",
        "C) Using a concise and specific subject line",
        "D) Proofreading the email before clicking 'Send'"
      ],
      answer: "A) Writing the entire message in ALL CAPITAL LETTERS",
      explanation: "In digital communication netiquette, typing words or entire sentences in ALL CAPITAL LETTERS is equivalent to shouting aggressively and is strictly considered unprofessional.",
      difficulty: "medium"
    },
    {
      id: "eng_comm_1_m6",
      question: "Where should the word 'NOTICE' and the name of the issuing institution appear in a standard notice?",
      options: [
        "A) At the bottom right corner",
        "B) Centered at the top of the box",
        "C) In the footnote below the signature",
        "D) Attached as an appendix"
      ],
      answer: "B) Centered at the top of the box",
      explanation: "The name of the issuing organization followed by the word 'NOTICE' must be prominently centered at the top within the bounding box to immediately signal the nature of the document.",
      difficulty: "medium"
    },
    {
      id: "eng_comm_1_m7",
      question: "Identify the sentence that represents the correct administrative register:",
      options: [
        "A) We got your letter and we are thinking about it.",
        "B) The undersigned is directed to acknowledge the receipt of your communication.",
        "C) I am boss here so do the work quickly.",
        "D) Your letter came yesterday and looks okay."
      ],
      answer: "B) The undersigned is directed to acknowledge the receipt of your communication.",
      explanation: "Option B uses the objective, formal, and authoritative administrative register ('The undersigned is directed to acknowledge...'), which is standard in government communication.",
      difficulty: "hard"
    },
    {
      id: "eng_comm_1_m8",
      question: "What does the Latin phrase 'Ex-officio' signify in government administrative bodies?",
      options: [
        "A) Fired or dismissed from office",
        "B) Holding a post by virtue of another office held",
        "C) An officer working from home without salary",
        "D) A retired judge serving as an advocate"
      ],
      answer: "B) Holding a post by virtue of another office held",
      explanation: "'Ex-officio' means 'by virtue of one's office' (e.g., The Vice President of India is the ex-officio Chairman of the Rajya Sabha; the District Collector is ex-officio head of several district committees).",
      difficulty: "hard"
    }
  ],

  keyTerminology: [
    {
      term: "Full Block Format",
      definition: "A contemporary letter layout style where every structural element begins flush with the left margin without paragraph indentation.",
      examContext: "Standard format tested in modern English drafting questions in CGPSC/Vyapam."
    },
    {
      term: "Complimentary Close",
      definition: "The polite sign-off phrase preceding the sender's signature at the end of a formal letter (e.g., 'Yours faithfully', 'Yours sincerely').",
      examContext: "Frequently tested for correct concord with salutation and proper lowercase lettering."
    },
    {
      term: "Office Memorandum (O.M.)",
      definition: "An internal executive communication tool exchanged between government ministries/departments without formal salutations or sign-offs.",
      examContext: "Tested in questions contrasting formal external letters with internal civil service memos."
    },
    {
      term: "Demi-Official (D.O.) Letter",
      definition: "A personalized official letter written in first person ('I') by one officer to an equal-ranking colleague to solicit personal attention.",
      examContext: "High-frequency question in administrative correspondence formats."
    },
    {
      term: "Blind Carbon Copy (BCC)",
      definition: "An email dispatch feature that conceals the addresses of listed recipients from all other recipients of the message.",
      examContext: "Frequent computer and communication question in Hostel Warden and Patwari exams."
    },
    {
      term: "Endorsement (पृष्ठांकन)",
      definition: "A concluding administrative note forwarding an official communication to relevant branches or officials for information and necessary action.",
      examContext: "Core procedural drafting terminology in state secretariat functioning."
    },
    {
      term: "Ad hoc (तदर्थ)",
      definition: "A Latin phrase meaning formed or arranged for a particular special purpose only, without general application.",
      examContext: "Regularly featured in administrative vocabulary and official terminology MCQs."
    },
    {
      term: "Prima facie (प्रथम दृष्टया)",
      definition: "A legal and administrative Latin phrase denoting based on the first impression; accepted as correct until proven otherwise.",
      examContext: "Common in judicial and administrative inquiry terminology questions."
    }
  ],

  sources: [
    {
      name: "Manual of Office Procedure (MOP) - Ministry of Personnel, Public Grievances and Pensions",
      author: "Department of Administrative Reforms and Public Grievances (DARPG), GoI",
      relevance: "Authoritative handbook establishing the format, drafting standards, and hierarchy of official communication."
    },
    {
      name: "High School English Grammar and Composition",
      author: "Wren & Martin (Revised by N.D.V. Prasada Rao)",
      relevance: "Definitive guide for formal letter structure, notice drafting rules, and salutation conventions."
    },
    {
      name: "Administrative Glossary (प्रशासनिक शब्दावली)",
      author: "Commission for Scientific and Technical Terminology (CSTT), Government of India",
      relevance: "Standardized reference for English-Hindi official administrative terms and designations."
    },
    {
      name: "Business Communication: Principles and Practices",
      author: "Meenakshi Raman and Sangeeta Sharma (Oxford University Press)",
      relevance: "Comprehensive coverage of digital communication etiquette, email protocols, and memo formats."
    }
  ],

  confusionBuster: [
    {
      concept: "'Yours faithfully' vs. 'Yours sincerely'",
      confusion: "Aspirants often confuse when to use 'faithfully' versus 'sincerely'.",
      clarity: "Use 'Yours faithfully' when you DO NOT know the recipient's name (salutation is 'Dear Sir / Madam'). Use 'Yours sincerely' when you address the recipient by name (salutation is 'Dear Mr. Sharma' or 'Dear Dr. Verma').",
      memoryHook: "Unknown = Faithful; Known Name = Sincere."
    },
    {
      concept: "'Yours' vs. 'Your's'",
      confusion: "Many candidates mistakenly add an apostrophe to 'Yours' ('Your's faithfully').",
      clarity: "'Yours' is a possessive pronoun and already indicates possession. Writing 'Your's' is a serious grammatical error because possessive pronouns (hers, its, ours, yours, theirs) never take an apostrophe.",
      memoryHook: "No apostrophe in 'Yours' ever!"
    },
    {
      concept: "CC vs. BCC in Email",
      confusion: "Misunderstanding whether CC or BCC hides email addresses.",
      clarity: "CC (Carbon Copy) reveals all addresses to every recipient. BCC (Blind Carbon Copy) keeps addresses 'Blind' (invisible) to everyone else.",
      memoryHook: "'B' in BCC stands for 'Blind' — others cannot see."
    },
    {
      concept: "Notice vs. Circular",
      confusion: "Treating notices and circulars as identical instruments.",
      clarity: "A notice is a public announcement placed inside a box on a display board for anyone to view. A circular is a dispatched internal memo distributed to specific individuals or branch offices.",
      memoryHook: "Notice = Nailed to the board (in a Box); Circular = Circulates from desk to desk."
    },
    {
      concept: "Capitalization in Complimentary Close",
      confusion: "Capitalizing both words in the sign-off ('Yours Faithfully').",
      clarity: "Only the FIRST letter of the initial word is capitalized: 'Yours faithfully' or 'Yours sincerely'. The second word must be in lowercase.",
      memoryHook: "First word Capital, Second word small: 'Yours faithfully'."
    }
  ],

  faqList: [
    {
      question: "What date format is strictly avoided in formal letters and official notices?",
      answer: "Numerical formats separated by slashes or hyphens (such as '24/10/2026' or '24-10-26') should be strictly avoided. Instead, write the month out in words: '24th October 2026' or 'October 24, 2026'."
    },
    {
      question: "Can an official notice use first-person pronouns like 'I' or 'We'?",
      answer: "No. Notices must be drafted in an impersonal tone using passive voice (e.g., 'It is hereby notified that...' or 'All students are requested to...'), avoiding 'I' and 'We'."
    },
    {
      question: "Why does an Office Memorandum not include a salutation like 'Dear Sir'?",
      answer: "An Office Memorandum is an internal administrative document between departments or offices of the government. By bureaucratic protocol, it is impersonal and non-honorific, hence omitting salutations and complimentary closes."
    },
    {
      question: "What is an 'Endorsement' in government secretariat drafting?",
      answer: "An endorsement is a brief formal addendum at the foot of an official communication indicating that a copy of the communication is forwarded to other designated offices or individuals for information, record, or compliance."
    },
    {
      question: "What is the recommended email subject line format for official requests?",
      answer: "The subject line must be concise, descriptive, and actionable—for example, '[Action Required] Submission of Quarterly Expenditure Report - Q3'. Vague labels like 'Hello' or 'Urgent' should never be used."
    }
  ],

  oneLinerRevision: [
    "Full Block format aligns all letter components strictly to the left margin without indentation.",
    "When the salutation is 'Dear Sir/Madam', the complimentary close is 'Yours faithfully'.",
    "When addressing the recipient by surname ('Dear Mr. Rao'), the close is 'Yours sincerely'.",
    "A formal Notice is always drafted within a neat rectangular bounding box.",
    "The standard length limit for a formal notice in exam drafting is 50 words.",
    "An Office Memorandum (OM) features neither a salutation ('Sir') nor a complimentary close ('Yours faithfully').",
    "Demi-Official (D.O.) letters use first person ('I') and are written to invite urgent personal attention between officers.",
    "BCC (Blind Carbon Copy) conceals recipient email addresses from other recipients on the thread.",
    "'Ad hoc' means arranged for a particular special purpose only; 'Ex-officio' means by virtue of one's office.",
    "Possessive pronoun 'Yours' NEVER takes an apostrophe ('Yours faithfully' is correct; 'Your's' is wrong)."
  ],

  rapidRevision: {
    summary: "Official communication comprises structured written correspondence in government and professional administration. Mastery requires knowledge of formal letter block formats, salutation-to-close pairings ('Dear Sir' -> 'Yours faithfully'; 'Dear Mr. X' -> 'Yours sincerely'), notice drafting within bounding boxes using passive voice, differences between OM and D.O. letters, BCC email confidentiality, and precise administrative vocabulary.",
    keyTakeaways: [
      "Full Block Format: Everything flush left; blank line between sections.",
      "Salutation Concord: Unknown name -> 'Yours faithfully'; Known surname -> 'Yours sincerely'.",
      "Notice Rules: Rectangular box, organization at top center, bold 'NOTICE', 50 words, passive voice.",
      "Office Memorandum: Internal, 3rd person, no salutation, no complimentary close.",
      "D.O. Letter: 1st person ('I'), personal salutation ('Dear Shri...'), personal close ('Yours sincerely').",
      "Email Etiquette: Clear subject line, BCC for external privacy, avoid ALL CAPS."
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = `cgv_master_${studyNoteData.topicId}`;
    const sanitized = sanitizeForFirestore(studyNoteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    // Sync syllabus
    const syllabusRef = db.collection('syllabi').doc('cgv_master');
    const syllabusDoc = await syllabusRef.get();
    if (syllabusDoc.exists) {
      const sylData = syllabusDoc.data();
      let updated = false;
      if (sylData.subjects) {
        for (const sub of sylData.subjects) {
          if (sub.chapters) {
            for (const ch of sub.chapters) {
              if (ch.topics) {
                for (const top of ch.topics) {
                  if (top.id === studyNoteData.topicId) {
                    top.hasStudyNotes = true;
                    updated = true;
                  }
                }
              }
            }
          }
        }
      }
      if (updated) {
        await syllabusRef.set(sylData);
        console.log(`[Syllabus Synced] hasStudyNotes: true for ${studyNoteData.topicId}`);
      } else {
        console.log(`[Syllabus Sync Warning] Topic ${studyNoteData.topicId} not found in syllabus.`);
      }
    }
    console.log(`Topic ${studyNoteData.topicId} (${studyNoteData.topicName}) completed successfully!`);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
