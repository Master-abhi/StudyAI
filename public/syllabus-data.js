const SYLLABUS_DATA = {
  "upsc": {
    name: "UPSC CSE",
    fullName: "Union Public Service Commission - Civil Services Examination",
    icon: "🏛️",
    description: "India's most prestigious competitive exam for IAS, IPS, IFS and other Central Services",
    subjects: [
      {
        name: "Prelims - General Studies Paper I",
        topics: [
          { id: "upsc-pre-gs1-1", name: "Current Events of National Importance" },
          { id: "upsc-pre-gs1-2", name: "Current Events of International Importance" },
          { id: "upsc-pre-gs1-3", name: "History of India - Ancient India" },
          { id: "upsc-pre-gs1-4", name: "History of India - Medieval India" },
          { id: "upsc-pre-gs1-5", name: "History of India - Modern India" },
          { id: "upsc-pre-gs1-6", name: "Indian National Movement" },
          { id: "upsc-pre-gs1-7", name: "Physical Geography of India" },
          { id: "upsc-pre-gs1-8", name: "Social Geography of India" },
          { id: "upsc-pre-gs1-9", name: "Economic Geography of India" },
          { id: "upsc-pre-gs1-10", name: "World Geography" },
          { id: "upsc-pre-gs1-11", name: "Indian Polity - Constitution" },
          { id: "upsc-pre-gs1-12", name: "Indian Polity - Political System & Governance" },
          { id: "upsc-pre-gs1-13", name: "Panchayati Raj & Public Policy" },
          { id: "upsc-pre-gs1-14", name: "Rights Issues & Welfare Schemes" },
          { id: "upsc-pre-gs1-15", name: "Economic & Social Development" },
          { id: "upsc-pre-gs1-16", name: "Sustainable Development & Poverty" },
          { id: "upsc-pre-gs1-17", name: "Demographics & Social Sector Initiatives" },
          { id: "upsc-pre-gs1-18", name: "Environmental Ecology & Biodiversity" },
          { id: "upsc-pre-gs1-19", name: "Climate Change & Environmental Issues" },
          { id: "upsc-pre-gs1-20", name: "General Science - Physics" },
          { id: "upsc-pre-gs1-21", name: "General Science - Chemistry" },
          { id: "upsc-pre-gs1-22", name: "General Science - Biology" }
        ]
      },
      {
        name: "Prelims - CSAT (Paper II)",
        topics: [
          { id: "upsc-pre-csat-1", name: "Reading Comprehension" },
          { id: "upsc-pre-csat-2", name: "Interpersonal & Communication Skills" },
          { id: "upsc-pre-csat-3", name: "Logical Reasoning" },
          { id: "upsc-pre-csat-4", name: "Analytical Ability" },
          { id: "upsc-pre-csat-5", name: "Decision Making & Problem Solving" },
          { id: "upsc-pre-csat-6", name: "General Mental Ability" },
          { id: "upsc-pre-csat-7", name: "Basic Numeracy (Class X)" },
          { id: "upsc-pre-csat-8", name: "Data Interpretation - Charts & Graphs" },
          { id: "upsc-pre-csat-9", name: "Data Interpretation - Tables" },
          { id: "upsc-pre-csat-10", name: "Data Sufficiency" }
        ]
      },
      {
        name: "Mains - GS Paper I (Heritage & Culture)",
        topics: [
          { id: "upsc-main-gs1-1", name: "Indian Culture - Art Forms" },
          { id: "upsc-main-gs1-2", name: "Indian Culture - Literature & Architecture" },
          { id: "upsc-main-gs1-3", name: "Modern Indian History (1757-1947)" },
          { id: "upsc-main-gs1-4", name: "Freedom Struggle & Leaders" },
          { id: "upsc-main-gs1-5", name: "Post-Independence Consolidation" },
          { id: "upsc-main-gs1-6", name: "World History - Events & Impact" },
          { id: "upsc-main-gs1-7", name: "World History - Industrial Revolution" },
          { id: "upsc-main-gs1-8", name: "World History - World Wars & Colonization" },
          { id: "upsc-main-gs1-9", name: "Indian Society - Features & Diversity" },
          { id: "upsc-main-gs1-10", name: "Role of Women & Women's Organizations" },
          { id: "upsc-main-gs1-11", name: "Population & Urbanization Issues" },
          { id: "upsc-main-gs1-12", name: "Globalization & Indian Society" },
          { id: "upsc-main-gs1-13", name: "Social Empowerment & Communalism" },
          { id: "upsc-main-gs1-14", name: "Salient Features of Physical Geography" },
          { id: "upsc-main-gs1-15", name: "Distribution of Resources Worldwide" }
        ]
      },
      {
        name: "Mains - GS Paper II (Governance & IR)",
        topics: [
          { id: "upsc-main-gs2-1", name: "Indian Constitution - Historical Underpinnings & Evolution" },
          { id: "upsc-main-gs2-2", name: "Features, Amendments & Basic Structure" },
          { id: "upsc-main-gs2-3", name: "Functions & Responsibilities of Union & States" },
          { id: "upsc-main-gs2-4", name: "Federal Structure & Devolution of Powers" },
          { id: "upsc-main-gs2-5", name: "Separation of Powers & Dispute Redressal" },
          { id: "upsc-main-gs2-6", name: "Parliament & State Legislatures" },
          { id: "upsc-main-gs2-7", name: "Executive & Judiciary Structure" },
          { id: "upsc-main-gs2-8", name: "Statutory & Regulatory Bodies" },
          { id: "upsc-main-gs2-9", name: "Government Policies & Interventions" },
          { id: "upsc-main-gs2-10", name: "Welfare Schemes for Vulnerable Sections" },
          { id: "upsc-main-gs2-11", name: "Healthcare, Education & Human Resources" },
          { id: "upsc-main-gs2-12", name: "Governance - Transparency & Accountability" },
          { id: "upsc-main-gs2-13", name: "India & Neighbors - Relations" },
          { id: "upsc-main-gs2-14", name: "Bilateral, Regional & Global Groupings" },
          { id: "upsc-main-gs2-15", name: "International Organizations - UN, WTO, etc." }
        ]
      },
      {
        name: "Mains - GS Paper III (Economy & Environment)",
        topics: [
          { id: "upsc-main-gs3-1", name: "Indian Economy - Planning & Growth" },
          { id: "upsc-main-gs3-2", name: "Government Budgeting & Fiscal Policy" },
          { id: "upsc-main-gs3-3", name: "Inclusive Growth & Issues" },
          { id: "upsc-main-gs3-4", name: "Major Crops & Agricultural Issues" },
          { id: "upsc-main-gs3-5", name: "Food Processing & Related Industries" },
          { id: "upsc-main-gs3-6", name: "MSP, PDS & Food Security" },
          { id: "upsc-main-gs3-7", name: "Land Reforms & Liberalization" },
          { id: "upsc-main-gs3-8", name: "Infrastructure - Energy, Ports, Roads" },
          { id: "upsc-main-gs3-9", name: "Investment & External Debt" },
          { id: "upsc-main-gs3-10", name: "Science & Technology Developments" },
          { id: "upsc-main-gs3-11", name: "Indigenization of Technology" },
          { id: "upsc-main-gs3-12", name: "Space Technology & IT" },
          { id: "upsc-main-gs3-13", name: "Environment - Conservation & Pollution" },
          { id: "upsc-main-gs3-14", name: "Environmental Impact Assessment" },
          { id: "upsc-main-gs3-15", name: "Disaster Management & NDMA" },
          { id: "upsc-main-gs3-16", name: "Internal Security Challenges" },
          { id: "upsc-main-gs3-17", name: "Cyber Security & Money Laundering" },
          { id: "upsc-main-gs3-18", name: "Border Area Security & Terrorism" }
        ]
      },
      {
        name: "Mains - GS Paper IV (Ethics)",
        topics: [
          { id: "upsc-main-gs4-1", name: "Ethics & Human Interface" },
          { id: "upsc-main-gs4-2", name: "Attitude - Content, Structure & Function" },
          { id: "upsc-main-gs4-3", name: "Aptitude & Foundational Values" },
          { id: "upsc-main-gs4-4", name: "Emotional Intelligence & Its Utilities" },
          { id: "upsc-main-gs4-5", name: "Contributions of Moral Thinkers (Indian)" },
          { id: "upsc-main-gs4-6", name: "Contributions of Moral Thinkers (Western)" },
          { id: "upsc-main-gs4-7", name: "Public/Civil Service Values & Ethics" },
          { id: "upsc-main-gs4-8", name: "Governance & Integrity Issues" },
          { id: "upsc-main-gs4-9", name: "Corporate Governance" },
          { id: "upsc-main-gs4-10", name: "Probity in Governance" },
          { id: "upsc-main-gs4-11", name: "Philosophical Basis of Governance" },
          { id: "upsc-main-gs4-12", name: "Case Studies on Ethics (Practice)" }
        ]
      },
      {
        name: "Mains - Essay",
        topics: [
          { id: "upsc-main-essay-1", name: "Essay Writing Techniques & Structure" },
          { id: "upsc-main-essay-2", name: "Philosophical & Abstract Topics" },
          { id: "upsc-main-essay-3", name: "Socio-Economic Topics" },
          { id: "upsc-main-essay-4", name: "Political & Governance Topics" },
          { id: "upsc-main-essay-5", name: "Science & Technology Topics" },
          { id: "upsc-main-essay-6", name: "Environment & Ecology Topics" }
        ]
      }
    ]
  },

  "ssc": {
    name: "SSC CGL",
    fullName: "Staff Selection Commission - Combined Graduate Level",
    icon: "📋",
    description: "For Group B & C posts in various Government Ministries and Departments",
    subjects: [
      {
        name: "General Intelligence & Reasoning",
        topics: [
          { id: "ssc-reason-1", name: "Semantic Analogies" },
          { id: "ssc-reason-2", name: "Symbolic & Number Analogies" },
          { id: "ssc-reason-3", name: "Figural Analogies" },
          { id: "ssc-reason-4", name: "Classification - Semantic & Figural" },
          { id: "ssc-reason-5", name: "Number & Letter Series" },
          { id: "ssc-reason-6", name: "Figural Series & Patterns" },
          { id: "ssc-reason-7", name: "Coding-Decoding" },
          { id: "ssc-reason-8", name: "Syllogism" },
          { id: "ssc-reason-9", name: "Blood Relations" },
          { id: "ssc-reason-10", name: "Direction & Distance" },
          { id: "ssc-reason-11", name: "Venn Diagrams" },
          { id: "ssc-reason-12", name: "Statement & Conclusion" },
          { id: "ssc-reason-13", name: "Decision Making" },
          { id: "ssc-reason-14", name: "Word Building & Arrangement" },
          { id: "ssc-reason-15", name: "Missing Numbers & Patterns" },
          { id: "ssc-reason-16", name: "Mirror & Water Image" },
          { id: "ssc-reason-17", name: "Embedded Figures" },
          { id: "ssc-reason-18", name: "Paper Folding & Punching" },
          { id: "ssc-reason-19", name: "Space Visualization" },
          { id: "ssc-reason-20", name: "Seating Arrangement & Puzzles" }
        ]
      },
      {
        name: "Quantitative Aptitude",
        topics: [
          { id: "ssc-math-1", name: "Number System & HCF/LCM" },
          { id: "ssc-math-2", name: "Decimals & Fractions" },
          { id: "ssc-math-3", name: "Percentage" },
          { id: "ssc-math-4", name: "Ratio & Proportion" },
          { id: "ssc-math-5", name: "Averages" },
          { id: "ssc-math-6", name: "Simple & Compound Interest" },
          { id: "ssc-math-7", name: "Profit, Loss & Discount" },
          { id: "ssc-math-8", name: "Partnership Business" },
          { id: "ssc-math-9", name: "Mixture & Alligation" },
          { id: "ssc-math-10", name: "Time & Work" },
          { id: "ssc-math-11", name: "Time, Speed & Distance" },
          { id: "ssc-math-12", name: "Pipes & Cisterns" },
          { id: "ssc-math-13", name: "Basic Algebra & Surds" },
          { id: "ssc-math-14", name: "Linear Equations" },
          { id: "ssc-math-15", name: "Geometry - Triangles" },
          { id: "ssc-math-16", name: "Geometry - Circles & Quadrilaterals" },
          { id: "ssc-math-17", name: "Mensuration - 2D (Area & Perimeter)" },
          { id: "ssc-math-18", name: "Mensuration - 3D (Volume & Surface Area)" },
          { id: "ssc-math-19", name: "Trigonometry - Ratios & Identities" },
          { id: "ssc-math-20", name: "Trigonometry - Heights & Distances" },
          { id: "ssc-math-21", name: "Statistics - Mean, Median, Mode" },
          { id: "ssc-math-22", name: "Data Interpretation - Bar & Pie Charts" },
          { id: "ssc-math-23", name: "Probability" },
          { id: "ssc-math-24", name: "Square Root & Cube Root" },
          { id: "ssc-math-25", name: "Age Problems" }
        ]
      },
      {
        name: "English Comprehension",
        topics: [
          { id: "ssc-eng-1", name: "Reading Comprehension" },
          { id: "ssc-eng-2", name: "Cloze Test" },
          { id: "ssc-eng-3", name: "Error Spotting (Grammar)" },
          { id: "ssc-eng-4", name: "Sentence Correction" },
          { id: "ssc-eng-5", name: "Fill in the Blanks" },
          { id: "ssc-eng-6", name: "Synonyms & Antonyms" },
          { id: "ssc-eng-7", name: "One Word Substitution" },
          { id: "ssc-eng-8", name: "Idioms & Phrases" },
          { id: "ssc-eng-9", name: "Spelling Errors" },
          { id: "ssc-eng-10", name: "Active & Passive Voice" },
          { id: "ssc-eng-11", name: "Direct & Indirect Speech" },
          { id: "ssc-eng-12", name: "Para Jumbles & Sentence Rearrangement" },
          { id: "ssc-eng-13", name: "Vocabulary in Context" },
          { id: "ssc-eng-14", name: "Sentence Improvement" },
          { id: "ssc-eng-15", name: "Parts of Speech & Tenses" }
        ]
      },
      {
        name: "General Awareness",
        topics: [
          { id: "ssc-ga-1", name: "Indian History - Ancient" },
          { id: "ssc-ga-2", name: "Indian History - Medieval" },
          { id: "ssc-ga-3", name: "Indian History - Modern & Freedom Struggle" },
          { id: "ssc-ga-4", name: "Indian Geography - Physical" },
          { id: "ssc-ga-5", name: "Indian Geography - Economic" },
          { id: "ssc-ga-6", name: "World Geography" },
          { id: "ssc-ga-7", name: "Indian Polity & Constitution" },
          { id: "ssc-ga-8", name: "Indian Economy - Basics" },
          { id: "ssc-ga-9", name: "Indian Economy - Banking & Finance" },
          { id: "ssc-ga-10", name: "General Science - Physics" },
          { id: "ssc-ga-11", name: "General Science - Chemistry" },
          { id: "ssc-ga-12", name: "General Science - Biology" },
          { id: "ssc-ga-13", name: "Current Affairs - National" },
          { id: "ssc-ga-14", name: "Current Affairs - International" },
          { id: "ssc-ga-15", name: "Awards, Sports & Important Dates" },
          { id: "ssc-ga-16", name: "Books, Authors & Cultural Events" },
          { id: "ssc-ga-17", name: "Scientific Research & Discoveries" },
          { id: "ssc-ga-18", name: "Computer Awareness Basics" },
          { id: "ssc-ga-19", name: "Government Schemes & Programs" },
          { id: "ssc-ga-20", name: "Environment & Ecology Basics" }
        ]
      }
    ]
  },

  "cgpsc": {
    name: "CGPSC",
    fullName: "Chhattisgarh Public Service Commission - State Service Exam",
    icon: "🏢",
    description: "State civil services exam for administrative positions in Chhattisgarh",
    subjects: [
      {
        name: "Prelims - General Studies",
        topics: [
          { id: "cgpsc-pre-1", name: "History of India - Ancient & Medieval" },
          { id: "cgpsc-pre-2", name: "History of India - Modern Period" },
          { id: "cgpsc-pre-3", name: "Indian National Movement" },
          { id: "cgpsc-pre-4", name: "History of Chhattisgarh" },
          { id: "cgpsc-pre-5", name: "CG's Contribution to Freedom Movement" },
          { id: "cgpsc-pre-6", name: "Physical Geography of India" },
          { id: "cgpsc-pre-7", name: "Geography of Chhattisgarh" },
          { id: "cgpsc-pre-8", name: "Constitution of India & Governance" },
          { id: "cgpsc-pre-9", name: "Administrative Structure of CG" },
          { id: "cgpsc-pre-10", name: "Local Government & Panchayati Raj in CG" },
          { id: "cgpsc-pre-11", name: "Indian Economy - Basics" },
          { id: "cgpsc-pre-12", name: "Economy of Chhattisgarh" },
          { id: "cgpsc-pre-13", name: "Forest & Agriculture of CG" },
          { id: "cgpsc-pre-14", name: "General Science & Technology" },
          { id: "cgpsc-pre-15", name: "Indian Art, Culture & Philosophy" },
          { id: "cgpsc-pre-16", name: "Tribes of Chhattisgarh" },
          { id: "cgpsc-pre-17", name: "CG Traditions, Festivals & Folk Culture" },
          { id: "cgpsc-pre-18", name: "CG Energy, Water & Mineral Resources" },
          { id: "cgpsc-pre-19", name: "Environment & Ecology" },
          { id: "cgpsc-pre-20", name: "Current Affairs - National & State" },
          { id: "cgpsc-pre-21", name: "Sports & Important Events" }
        ]
      },
      {
        name: "Prelims - Aptitude Test (CSAT)",
        topics: [
          { id: "cgpsc-csat-1", name: "Logical Reasoning" },
          { id: "cgpsc-csat-2", name: "Analytical Ability" },
          { id: "cgpsc-csat-3", name: "Decision Making & Problem Solving" },
          { id: "cgpsc-csat-4", name: "General Mental Ability" },
          { id: "cgpsc-csat-5", name: "Basic Numeracy (Class 10)" },
          { id: "cgpsc-csat-6", name: "Data Interpretation" },
          { id: "cgpsc-csat-7", name: "Communication Skills" },
          { id: "cgpsc-csat-8", name: "Hindi Language Knowledge" },
          { id: "cgpsc-csat-9", name: "Chhattisgarhi Language Basics" },
          { id: "cgpsc-csat-10", name: "Reading Comprehension" }
        ]
      },
      {
        name: "Mains - Paper I (Language)",
        topics: [
          { id: "cgpsc-main1-1", name: "Hindi Essay Writing" },
          { id: "cgpsc-main1-2", name: "Hindi Grammar" },
          { id: "cgpsc-main1-3", name: "Hindi Comprehension" },
          { id: "cgpsc-main1-4", name: "English Essay Writing" },
          { id: "cgpsc-main1-5", name: "English Grammar" },
          { id: "cgpsc-main1-6", name: "English Comprehension" },
          { id: "cgpsc-main1-7", name: "Chhattisgarhi Language & Literature" }
        ]
      },
      {
        name: "Mains - Paper II (Essay)",
        topics: [
          { id: "cgpsc-main2-1", name: "National Issues Essay Writing" },
          { id: "cgpsc-main2-2", name: "International Issues Essay Writing" },
          { id: "cgpsc-main2-3", name: "Chhattisgarh State Issues Essay" },
          { id: "cgpsc-main2-4", name: "Social & Cultural Topics" },
          { id: "cgpsc-main2-5", name: "Science & Technology Topics" }
        ]
      },
      {
        name: "Mains - Paper III (History & Constitution)",
        topics: [
          { id: "cgpsc-main3-1", name: "Indian History - Freedom Struggle Details" },
          { id: "cgpsc-main3-2", name: "Post-Independence India" },
          { id: "cgpsc-main3-3", name: "History of Chhattisgarh (Detailed)" },
          { id: "cgpsc-main3-4", name: "Indian Constitution - Features & Amendments" },
          { id: "cgpsc-main3-5", name: "Fundamental Rights & DPSP" },
          { id: "cgpsc-main3-6", name: "Public Administration - Union & State" },
          { id: "cgpsc-main3-7", name: "Judiciary System" },
          { id: "cgpsc-main3-8", name: "District & Revenue Administration in CG" }
        ]
      },
      {
        name: "Mains - Paper IV (Science & Technology)",
        topics: [
          { id: "cgpsc-main4-1", name: "General Science (Physics)" },
          { id: "cgpsc-main4-2", name: "General Science (Chemistry)" },
          { id: "cgpsc-main4-3", name: "General Science (Biology)" },
          { id: "cgpsc-main4-4", name: "Information Technology & Computers" },
          { id: "cgpsc-main4-5", name: "Space Technology & ISRO" },
          { id: "cgpsc-main4-6", name: "Biotechnology & Nanotechnology" },
          { id: "cgpsc-main4-7", name: "Energy Resources & Renewable Energy" },
          { id: "cgpsc-main4-8", name: "Environmental Science & Conservation" },
          { id: "cgpsc-main4-9", name: "Biodiversity & Wildlife" },
          { id: "cgpsc-main4-10", name: "Pollution & Waste Management" }
        ]
      },
      {
        name: "Mains - Paper V (Economics & Geography)",
        topics: [
          { id: "cgpsc-main5-1", name: "Indian Economy - Planning & Reforms" },
          { id: "cgpsc-main5-2", name: "Economic Development Indicators" },
          { id: "cgpsc-main5-3", name: "Banking & Financial Institutions" },
          { id: "cgpsc-main5-4", name: "CG Economy & Budget" },
          { id: "cgpsc-main5-5", name: "CG Agriculture & Industry" },
          { id: "cgpsc-main5-6", name: "Physical Geography of India" },
          { id: "cgpsc-main5-7", name: "CG Geography - Rivers, Soil, Climate" },
          { id: "cgpsc-main5-8", name: "Natural Resources of CG" },
          { id: "cgpsc-main5-9", name: "International Trade & WTO" }
        ]
      },
      {
        name: "Mains - Paper VI (Philosophy & Sociology)",
        topics: [
          { id: "cgpsc-main6-1", name: "Indian Philosophy - Schools of Thought" },
          { id: "cgpsc-main6-2", name: "Western Philosophy - Key Thinkers" },
          { id: "cgpsc-main6-3", name: "Ethics & Values in Administration" },
          { id: "cgpsc-main6-4", name: "Indian Society - Structure & Change" },
          { id: "cgpsc-main6-5", name: "Chhattisgarh Society - Tribes & Communities" },
          { id: "cgpsc-main6-6", name: "Social Problems & Solutions" },
          { id: "cgpsc-main6-7", name: "Women Empowerment & Gender Issues" },
          { id: "cgpsc-main6-8", name: "Rural Sociology & Community Development" }
        ]
      }
    ]
  },

  "cgvyapam": {
    name: "CG Vyapam",
    fullName: "Chhattisgarh Professional Examination Board",
    icon: "📝",
    description: "Various state-level recruitment exams for Chhattisgarh government posts",
    subjects: [
      {
        name: "General Knowledge (India)",
        topics: [
          { id: "cgv-gk-1", name: "Indian History - Major Events & Dynasties" },
          { id: "cgv-gk-2", name: "Modern India & Freedom Struggle" },
          { id: "cgv-gk-3", name: "Indian Geography - Physical Features" },
          { id: "cgv-gk-4", name: "Indian Geography - Agriculture & Resources" },
          { id: "cgv-gk-5", name: "Indian Polity - Constitution Basics" },
          { id: "cgv-gk-6", name: "Indian Economy - Fundamentals" },
          { id: "cgv-gk-7", name: "General Science - Physics Basics" },
          { id: "cgv-gk-8", name: "General Science - Chemistry Basics" },
          { id: "cgv-gk-9", name: "General Science - Biology & Health" },
          { id: "cgv-gk-10", name: "Current Affairs & Government Schemes" }
        ]
      },
      {
        name: "Chhattisgarh Specific GK",
        topics: [
          { id: "cgv-cg-1", name: "History of Chhattisgarh" },
          { id: "cgv-cg-2", name: "Geography of CG - Rivers & Mountains" },
          { id: "cgv-cg-3", name: "CG Economy & Industries" },
          { id: "cgv-cg-4", name: "Tribes of Chhattisgarh" },
          { id: "cgv-cg-5", name: "CG Art, Dance & Music" },
          { id: "cgv-cg-6", name: "CG Literature & Language" },
          { id: "cgv-cg-7", name: "CG Festivals & Traditions" },
          { id: "cgv-cg-8", name: "CG Government Schemes & Programs" },
          { id: "cgv-cg-9", name: "CG Current Affairs" },
          { id: "cgv-cg-10", name: "CG Famous Personalities" },
          { id: "cgv-cg-11", name: "CG Forest & Wildlife" },
          { id: "cgv-cg-12", name: "CG Administrative Structure" }
        ]
      },
      {
        name: "Hindi Language",
        topics: [
          { id: "cgv-hindi-1", name: "Hindi Grammar - Sandhi & Samas" },
          { id: "cgv-hindi-2", name: "Hindi Grammar - Vakya Shuddhi" },
          { id: "cgv-hindi-3", name: "Muhavare & Lokoktiyan" },
          { id: "cgv-hindi-4", name: "Anekarthi Shabd & Vilom Shabd" },
          { id: "cgv-hindi-5", name: "Paryayvachi Shabd" },
          { id: "cgv-hindi-6", name: "Comprehension (Apathit Gadyansh)" },
          { id: "cgv-hindi-7", name: "Hindi Literature Basics" }
        ]
      },
      {
        name: "English Language",
        topics: [
          { id: "cgv-eng-1", name: "English Grammar - Tenses" },
          { id: "cgv-eng-2", name: "English Grammar - Articles & Prepositions" },
          { id: "cgv-eng-3", name: "Vocabulary - Synonyms & Antonyms" },
          { id: "cgv-eng-4", name: "Sentence Correction" },
          { id: "cgv-eng-5", name: "Reading Comprehension" },
          { id: "cgv-eng-6", name: "Fill in the Blanks" }
        ]
      },
      {
        name: "Mathematics",
        topics: [
          { id: "cgv-math-1", name: "Number System" },
          { id: "cgv-math-2", name: "Simplification & Approximation" },
          { id: "cgv-math-3", name: "Percentage & Ratio" },
          { id: "cgv-math-4", name: "Profit, Loss & Discount" },
          { id: "cgv-math-5", name: "Simple & Compound Interest" },
          { id: "cgv-math-6", name: "Time & Work" },
          { id: "cgv-math-7", name: "Time, Speed & Distance" },
          { id: "cgv-math-8", name: "Average & Allegation" },
          { id: "cgv-math-9", name: "Geometry & Mensuration" },
          { id: "cgv-math-10", name: "Basic Algebra" },
          { id: "cgv-math-11", name: "Data Interpretation" },
          { id: "cgv-math-12", name: "Trigonometry Basics" }
        ]
      },
      {
        name: "Reasoning & Mental Ability",
        topics: [
          { id: "cgv-reason-1", name: "Number & Letter Series" },
          { id: "cgv-reason-2", name: "Coding-Decoding" },
          { id: "cgv-reason-3", name: "Analogy" },
          { id: "cgv-reason-4", name: "Classification" },
          { id: "cgv-reason-5", name: "Blood Relations" },
          { id: "cgv-reason-6", name: "Direction & Ranking" },
          { id: "cgv-reason-7", name: "Syllogism" },
          { id: "cgv-reason-8", name: "Puzzles & Seating Arrangement" },
          { id: "cgv-reason-9", name: "Mirror & Water Image" },
          { id: "cgv-reason-10", name: "Venn Diagram" },
          { id: "cgv-reason-11", name: "Calendar & Clock" },
          { id: "cgv-reason-12", name: "Figure Counting" }
        ]
      },
      {
        name: "Computer Knowledge",
        topics: [
          { id: "cgv-comp-1", name: "Computer Fundamentals & History" },
          { id: "cgv-comp-2", name: "Hardware & Software Basics" },
          { id: "cgv-comp-3", name: "Operating System Concepts" },
          { id: "cgv-comp-4", name: "MS Office - Word, Excel, PowerPoint" },
          { id: "cgv-comp-5", name: "Internet & Email Basics" },
          { id: "cgv-comp-6", name: "Networking & Cyber Security Basics" }
        ]
      }
    ]
  },

  "railway": {
    name: "Railway Exams",
    fullName: "RRB NTPC & Group D - Indian Railway Recruitment",
    icon: "🚂",
    description: "Railway recruitment exams for Non-Technical Popular Categories & Group D posts",
    subjects: [
      {
        name: "Mathematics",
        topics: [
          { id: "rr-math-1", name: "Number System & BODMAS" },
          { id: "rr-math-2", name: "Decimals & Fractions" },
          { id: "rr-math-3", name: "LCM & HCF" },
          { id: "rr-math-4", name: "Percentage" },
          { id: "rr-math-5", name: "Ratio & Proportion" },
          { id: "rr-math-6", name: "Average" },
          { id: "rr-math-7", name: "Simple & Compound Interest" },
          { id: "rr-math-8", name: "Profit, Loss & Discount" },
          { id: "rr-math-9", name: "Time & Work" },
          { id: "rr-math-10", name: "Time, Speed & Distance" },
          { id: "rr-math-11", name: "Pipes & Cisterns" },
          { id: "rr-math-12", name: "Age Problems" },
          { id: "rr-math-13", name: "Square Root & Cube Root" },
          { id: "rr-math-14", name: "Mensuration (2D & 3D)" },
          { id: "rr-math-15", name: "Elementary Algebra" },
          { id: "rr-math-16", name: "Geometry - Triangles & Circles" },
          { id: "rr-math-17", name: "Trigonometry - Basics" },
          { id: "rr-math-18", name: "Elementary Statistics" },
          { id: "rr-math-19", name: "Calendar & Clock" },
          { id: "rr-math-20", name: "Data Interpretation" }
        ]
      },
      {
        name: "General Intelligence & Reasoning",
        topics: [
          { id: "rr-reason-1", name: "Analogies (Verbal & Non-Verbal)" },
          { id: "rr-reason-2", name: "Number & Letter Series" },
          { id: "rr-reason-3", name: "Coding & Decoding" },
          { id: "rr-reason-4", name: "Mathematical Operations" },
          { id: "rr-reason-5", name: "Similarities & Differences" },
          { id: "rr-reason-6", name: "Blood Relations" },
          { id: "rr-reason-7", name: "Syllogism" },
          { id: "rr-reason-8", name: "Jumbling & Arrangement" },
          { id: "rr-reason-9", name: "Venn Diagrams" },
          { id: "rr-reason-10", name: "Puzzles & Seating Arrangement" },
          { id: "rr-reason-11", name: "Data Sufficiency" },
          { id: "rr-reason-12", name: "Statement & Conclusion" },
          { id: "rr-reason-13", name: "Decision Making" },
          { id: "rr-reason-14", name: "Direction & Distance" },
          { id: "rr-reason-15", name: "Classification" },
          { id: "rr-reason-16", name: "Map & Graph Interpretation" },
          { id: "rr-reason-17", name: "Mirror & Water Image" },
          { id: "rr-reason-18", name: "Embedded & Complete Figures" }
        ]
      },
      {
        name: "General Awareness",
        topics: [
          { id: "rr-ga-1", name: "Current Events - National" },
          { id: "rr-ga-2", name: "Current Events - International" },
          { id: "rr-ga-3", name: "Indian History & Freedom Struggle" },
          { id: "rr-ga-4", name: "Indian Geography" },
          { id: "rr-ga-5", name: "World Geography" },
          { id: "rr-ga-6", name: "Indian Polity & Constitution" },
          { id: "rr-ga-7", name: "Indian Economy & Budget" },
          { id: "rr-ga-8", name: "Art, Culture & Heritage of India" },
          { id: "rr-ga-9", name: "Games & Sports" },
          { id: "rr-ga-10", name: "Indian Literature & Monuments" },
          { id: "rr-ga-11", name: "General Science - Physics (Class 10)" },
          { id: "rr-ga-12", name: "General Science - Chemistry (Class 10)" },
          { id: "rr-ga-13", name: "General Science - Biology (Class 10)" },
          { id: "rr-ga-14", name: "Space Technology & Nuclear Programs" },
          { id: "rr-ga-15", name: "UN & International Organizations" },
          { id: "rr-ga-16", name: "Environmental Issues" },
          { id: "rr-ga-17", name: "Computer & IT Basics" },
          { id: "rr-ga-18", name: "Government Schemes & Programs" },
          { id: "rr-ga-19", name: "Famous Personalities & Awards" },
          { id: "rr-ga-20", name: "Indian Railways - History & Facts" },
          { id: "rr-ga-21", name: "Books, Authors & Important Days" },
          { id: "rr-ga-22", name: "Scientific Discoveries & Inventions" }
        ]
      },
      {
        name: "General Science (Group D Specific)",
        topics: [
          { id: "rr-sci-1", name: "Physics - Motion & Laws of Motion" },
          { id: "rr-sci-2", name: "Physics - Work, Energy & Power" },
          { id: "rr-sci-3", name: "Physics - Light & Sound" },
          { id: "rr-sci-4", name: "Physics - Electricity & Magnetism" },
          { id: "rr-sci-5", name: "Physics - Heat & Thermodynamics" },
          { id: "rr-sci-6", name: "Chemistry - Atoms & Molecules" },
          { id: "rr-sci-7", name: "Chemistry - Chemical Reactions" },
          { id: "rr-sci-8", name: "Chemistry - Acids, Bases & Salts" },
          { id: "rr-sci-9", name: "Chemistry - Metals & Non-Metals" },
          { id: "rr-sci-10", name: "Chemistry - Carbon Compounds" },
          { id: "rr-sci-11", name: "Chemistry - Periodic Table" },
          { id: "rr-sci-12", name: "Biology - Cell Structure & Function" },
          { id: "rr-sci-13", name: "Biology - Human Body Systems" },
          { id: "rr-sci-14", name: "Biology - Diseases & Nutrition" },
          { id: "rr-sci-15", name: "Biology - Plant Kingdom & Reproduction" },
          { id: "rr-sci-16", name: "Biology - Genetics & Evolution" },
          { id: "rr-sci-17", name: "Biology - Ecology & Environment" },
          { id: "rr-sci-18", name: "Science & Technology in Daily Life" }
        ]
      }
    ]
  }
};
