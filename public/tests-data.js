const PRELOADED_TESTS = [
  {
    question: "Chhattisgarh State was formed on which date?",
    options: ["1st November 2000", "15th November 2000", "1st January 2001", "26th January 2000"],
    correctIndex: 0,
    explanation: "Chhattisgarh was carved out of Madhya Pradesh and came into existence on 1st November 2000."
  },
  {
    question: "Which of the following is known as the 'Shimla of Chhattisgarh'?",
    options: ["Mainpat", "Chirmiri", "Bastar", "Kawardha"],
    correctIndex: 0,
    explanation: "Mainpat, located in Surguja district, is a hill station known as the 'Shimla of Chhattisgarh'."
  },
  {
    question: "Which river is known as the 'Lifeline of Chhattisgarh'?",
    options: ["Mahanadi", "Indravati", "Hasdeo", "Shivnath"],
    correctIndex: 0,
    explanation: "Mahanadi is widely regarded as the lifeline of Chhattisgarh due to its extensive basin and agricultural importance."
  },
  {
    question: "Indravati National Park is located in which district of Chhattisgarh?",
    options: ["Bijapur", "Dantewada", "Bastar", "Narayanpur"],
    correctIndex: 0,
    explanation: "Indravati National Park is situated in the Bijapur district of Chhattisgarh."
  },
  {
    question: "What is the official state animal of Chhattisgarh?",
    options: ["Wild Water Buffalo", "Swamp Deer", "Asian Elephant", "Leopard"],
    correctIndex: 0,
    explanation: "The Wild Water Buffalo (Van Bhaisa) is the official state animal of Chhattisgarh."
  },
  {
    question: "Bhitarkanika National Park is famous for which of the following animals? (Common PYQ context)",
    options: ["Saltwater Crocodiles", "Tiger", "Rhinoceros", "Elephants"],
    correctIndex: 0,
    explanation: "Though mainly in Odisha, it often appears in national exams. It's famous for Saltwater Crocodiles."
  },
  {
    question: "Which tribe in Chhattisgarh celebrates the 'Madai' festival with great enthusiasm?",
    options: ["Gond", "Baiga", "Muria", "Oraon"],
    correctIndex: 0,
    explanation: "The Madai festival is primarily a major celebration of the Gond tribe and its subtribes."
  },
  {
    question: "Kanger Valley National Park was established in which year?",
    options: ["1982", "1990", "1975", "1988"],
    correctIndex: 0,
    explanation: "Kanger Valley National Park, famous for Kutumsar Caves, was established in 1982."
  },
  {
    question: "Chhattisgarh shares its longest border with which state?",
    options: ["Odisha", "Madhya Pradesh", "Maharashtra", "Jharkhand"],
    correctIndex: 0,
    explanation: "Chhattisgarh shares its longest boundary with the state of Odisha."
  },
  {
    question: "Which famous folk dance of Chhattisgarh is performed exclusively by women?",
    options: ["Sua Dance", "Panthi Dance", "Raut Nacha", "Karma Dance"],
    correctIndex: 0,
    explanation: "Sua Dance (Parrot Dance) is performed by women, typically during the Diwali festival."
  },
  {
    question: "The first Chief Minister of Chhattisgarh was?",
    options: ["Ajit Jogi", "Raman Singh", "Bhupesh Baghel", "Motilal Vora"],
    correctIndex: 0,
    explanation: "Ajit Jogi served as the first Chief Minister of Chhattisgarh from 2000 to 2003."
  },
  {
    question: "Bhilai Steel Plant was established with the assistance of which country?",
    options: ["Soviet Union (USSR)", "Germany", "United Kingdom", "USA"],
    correctIndex: 0,
    explanation: "The Bhilai Steel Plant was set up in 1959 with the technical and financial support of the Soviet Union."
  },
  {
    question: "What is the primary crop grown in the Chhattisgarh plains?",
    options: ["Rice", "Wheat", "Maize", "Sugarcane"],
    correctIndex: 0,
    explanation: "Chhattisgarh is famously known as the 'Rice Bowl of India' (Dhan ka Katora) due to extensive rice cultivation."
  },
  {
    question: "Which of the following is the highest peak in Chhattisgarh?",
    options: ["Gaurlata", "Badargarh", "Mainpat", "Palma"],
    correctIndex: 0,
    explanation: "Gaurlata, located in the Samri Pat region of Balrampur district, is the highest peak in Chhattisgarh."
  },
  {
    question: "Chitrakote Falls, often called the 'Niagara of India', is formed by which river?",
    options: ["Indravati", "Mahanadi", "Hasdeo", "Arpa"],
    correctIndex: 0,
    explanation: "Chitrakote Falls is a beautiful waterfall on the Indravati river in the Bastar district."
  },
  {
    question: "When did the famous Bhumkal Rebellion take place in Bastar?",
    options: ["1910", "1876", "1857", "1920"],
    correctIndex: 0,
    explanation: "The Bhumkal Rebellion, led by Gundadhur, occurred in 1910 against British forest policies."
  },
  {
    question: "Raut Nacha is traditionally performed right after which major Indian festival?",
    options: ["Diwali", "Holi", "Navratri", "Makar Sankranti"],
    correctIndex: 0,
    explanation: "Raut Nacha is a traditional dance of the Yadav community, performed immediately after Diwali."
  },
  {
    question: "Which city is known as the 'Power Capital' of Chhattisgarh?",
    options: ["Korba", "Raigarh", "Bhilai", "Bilaspur"],
    correctIndex: 0,
    explanation: "Korba is known as the power capital due to the large number of coal reserves and thermal power plants."
  },
  {
    question: "Who among the following was the founder of the Kalchuri Dynasty in Chhattisgarh?",
    options: ["Kalingraja", "Jajalladeva I", "Prithvideva", "Ratnadeva"],
    correctIndex: 0,
    explanation: "Kalingraja established the Kalchuri dynasty's rule in the Dakshin Kosala (Chhattisgarh) region around 1000 AD."
  },
  {
    question: "The famous ' लक्ष्मण मंदिर ' (Lakshman Temple) made of red bricks is located in?",
    options: ["Sirpur", "Rajim", "Ratanpur", "Dantewada"],
    correctIndex: 0,
    explanation: "The Lakshman Temple in Sirpur is a classic example of 7th-century brick architecture."
  },
  {
    question: "What is 'Kosa' in the context of Chhattisgarh?",
    options: ["A type of Silk", "A folk song", "A tribal dish", "A musical instrument"],
    correctIndex: 0,
    explanation: "Kosa involves the production of traditional high-quality silk, mainly produced in the Champa and Raigarh regions."
  },
  {
    question: "In computer terminology, what does 'HTTP' stand for? (CG Vyapam common PYQ)",
    options: ["HyperText Transfer Protocol", "HighText Transfer Protocol", "Hyper Transfer Text Protocol", "High Transfer Technology Protocol"],
    correctIndex: 0,
    explanation: "HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the World Wide Web."
  },
  {
    question: "Which shortcut key is used to Undo an action in Windows?",
    options: ["Ctrl + Z", "Ctrl + Y", "Ctrl + U", "Ctrl + X"],
    correctIndex: 0,
    explanation: "Ctrl + Z is the standard shortcut key used to undo the last action."
  },
  {
    question: "Identify the antonym of the English word 'ABUNDANT':",
    options: ["Scarce", "Plentiful", "Copious", "Generous"],
    correctIndex: 0,
    explanation: "Abundant means present in great quantity. Its antonym is 'Scarce'."
  },
  {
    question: "'A bird in the hand is worth two in the bush' means:",
    options: ["What you have is worth more than what you might get", "It is better to catch birds than hunt them", "One should rely on luck", "Always focus on the future"],
    correctIndex: 0,
    explanation: "The idiom emphasizes that it's better to hold onto what you have than to risk it for something better but uncertain."
  }
];
