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
  subjectId: 'cgv_master_sub_5',
  chapterId: 'cgv_master_sub_5_ch_12',
  topicId: 'hin_adv_2',
  title: 'प्रशासनिक एवं पारिभाषिक शब्दावली (Administrative & Technical Terminology)',
  subjectName: 'हिंदी भाषा',
  chapterName: 'उन्नत हिंदी',
  overview: {
    introduction: 'प्रशासनिक एवं पारिभाषिक शब्दावली (Administrative & Technical Terminology) भाषा का वह विशिष्ट एवं सुव्यवस्थित अंग है जिसका प्रयोग शासन, प्रशासन, विधि, वित्त, न्यायालय और विज्ञान के क्षेत्र में एक निश्चित, सुस्पष्ट और एकार्थी अर्थ में किया जाता है। सामान्य बोलचाल के शब्दों में जहाँ अर्थ का लचीलापन और विस्तार होता है, वहीं पारिभाषिक शब्द "परिभाषा से बँधे" (Well-defined) होते हैं जिनका केवल एक ही आधिकारिक विधिक अर्थ होता है। भारत सरकार द्वारा 1961 में "वैज्ञानिक तथा तकनीकी शब्दावली आयोग" (CSTT) की स्थापना की गई। छत्तीसगढ़ व्यापाम, सीजी पीएससी, पटवारी, सब-इंस्पेक्टर और सहायक ग्रेड-3 परीक्षाओं में अंग्रेजी प्रशासनिक शब्दों के हिंदी पर्याय और हिंदी शब्दों के अंग्रेजी पर्याय से 3 से 4 प्रश्न अनिवार्यतः पूछे जाते हैं।',
    importance: 'प्रशासनिक तंत्र में कार्यरत अधिकारियों और कर्मचारियों के लिए अंग्रेजी और हिंदी दोनों में पारिभाषिक शब्दों का शुद्ध ज्ञान अनिवार्य है। गलत अनुवाद या भ्रामक शब्दावली से प्रशासनिक आदेशों का विधिक प्रभाव बदल सकता है।',
    examRelevance: 'Notification (अधिसूचना), Quorum (गणपूर्ति), Affidavit (शपथ-पत्र), Indemnity (क्षतिपूर्ति), Discrepancy (विसंगति), Appropriation (विनियोग), Gazetted (राजपत्रित), Autonomy (स्वायत्तता), आदि व्यापाम के सर्वाधिक बार पूछे गए शब्द हैं।',
    quickFacts: [
      'पारिभाषिक शब्द = वे शब्द जो किसी विशिष्ट ज्ञान-क्षेत्र (प्रशासन, विधि, विज्ञान) में एक निश्चित अर्थ में प्रयुक्त होते हैं।',
      'वैज्ञानिक तथा तकनीकी शब्दावली आयोग (CSTT) की स्थापना = 1 अक्टूबर 1961 (शिक्षा मंत्रालय, भारत सरकार)।',
      'Affidavit का हिंदी पर्याय = शपथ-पत्र (या हलफनामा)।',
      'Quorum का हिंदी पर्याय = गणपूर्ति (बैठक के लिए आवश्यक न्यूनतम संख्या)।',
      'Notification का हिंदी पर्याय = अधिसूचना (राजपत्र में प्रकाशित)।',
      'Gazette का हिंदी पर्याय = राजपत्र। Gazetted Officer = राजपत्रित अधिकारी।',
      'Appropriation का हिंदी पर्याय = विनियोग। Embezzlement = गबन (अपचलन)।',
      'Indemnity Bond का हिंदी पर्याय = क्षतिपूर्ति बंधपत्र।'
    ]
  },
  chapters: [
    {
      id: 'ch_1',
      title: '1. पारिभाषिक शब्दावली की संकल्पना, लक्षण एवं निर्माण के सिद्धांत',
      content: '**पारिभाषिक शब्द की परिभाषा**:\nडॉ. भोलानाथ तिवारी के अनुसार: *"पारिभाषिक शब्द वे हैं जिनकी सीमाएँ परिभाषा द्वारा निश्चित कर दी जाती हैं। ये शब्द किसी विशिष्ट शास्त्र या ज्ञान की शाखा में एक निश्चित अवधारणा को प्रकट करते हैं।"*\n\n**सामान्य शब्द बनाम पारिभाषिक शब्द का अंतर**:\n- **सामान्य शब्द (Common Words)**: जो दैनिक जीवन में प्रयुक्त होते हैं और प्रसंगानुसार जिनके अर्थ बदलते रहते हैं (जैसे— पानी, रोटी, घर, हवा)।\n- **पारिभाषिक शब्द (Technical Words)**: जिनका अर्थ किसी विषय-विशेष (विधि, प्रशासन, भौतिकी) में सर्वथा निश्चित, सुनिश्चित और असंदिग्ध होता है (जैसे— अधिनियम, अध्यादेश, संज्ञान, याचिका, अवमानना)।\n- **अर्ध-पारिभाषिक शब्द**: जो सामान्य जीवन में भी बोले जाते हैं और विशेष संदर्भ में पारिभाषिक भी होते हैं (जैसे— दावा, मांग, गति, शक्ति)।\n\n**शब्दावली निर्माण के 3 प्रमुख संप्रदाय (CSTT के सिद्धांत)**:\n1. **राष्ट्रीयतावादी (आदर्शवादी)**: जो केवल संस्कृत धातु-प्रत्ययों से शब्द गढ़ते हैं (जैसे रघुवीर मत)।\n2. **अंतर्राष्ट्रीयतावादी**: जो विदेशी/अंग्रेजी शब्दों को ज्यों-का-त्यों देवनागरी में स्वीकार करते हैं (जैसे ऑक्सीजन, मीटर, रडार, टेलीफोन)।\n3. **समन्वयवादी (सर्वमान्य CSTT नीति)**: जो यथासंभव अपनी भाषा के सरल तत्सम/तद्भव शब्दों को अपनाते हैं और जहाँ आवश्यक हो अंतर्राष्ट्रीय शब्दों को भी लेते हैं।'
    },
    {
      id: 'ch_2',
      title: '2. प्रमुख प्रशासनिक पदनाम एवं कार्यालयीन पद (Administrative Designations)',
      content: 'व्यापाम परीक्षाओं में प्रायः पूछे जाने वाले प्रशासनिक पदों के मानक हिंदी-अंग्रेजी युग्म:\n\n1. **Accountant General** $\\rightarrow$ महालेखाकार\n2. **Administrator** $\\rightarrow$ प्रशासक\n3. **Appellate Authority** $\\rightarrow$ अपीलीय प्राधिकारी\n4. **Cabinet Secretary** $\\rightarrow$ मंत्रिमंडल सचिव\n5. **Chief Electoral Officer** $\\rightarrow$ मुख्य निर्वाचन अधिकारी\n6. **Chief Executive Officer (CEO)** $\\rightarrow$ मुख्य कार्यपालन अधिकारी\n7. **Chief Secretary** $\\rightarrow$ मुख्य सचिव (राज्य का सर्वोच्च प्रशासनिक पद)\n8. **Collector / District Magistrate** $\\rightarrow$ कलेक्टर / जिला दंडाधिकारी\n9. **Commissioner** $\\rightarrow$ आयुक्त (संभागायुक्त)\n10. **Comptroller & Auditor General (CAG)** $\\rightarrow$ नियंत्रक एवं महालेखापरीक्षक\n11. **Controlling Officer** $\\rightarrow$ नियंत्रक अधिकारी\n12. **Custodian** $\\rightarrow$ अभिरक्षक\n13. **Drawing and Disbursing Officer (DDO)** $\\rightarrow$ आहरण एवं संवितरण अधिकारी\n14. **Head of Department (HOD)** $\\rightarrow$ विभागाध्यक्ष\n15. **Head of Office** $\\rightarrow$ कार्यालयाध्यक्ष\n16. **In-Charge** $\\rightarrow$ प्रभारी\n17. **Liaison Officer** $\\rightarrow$ संपर्क अधिकारी\n18. **Nodal Officer** $\\rightarrow$ नोडल अधिकारी\n19. **Returning Officer** $\\rightarrow$ रिटर्निंग अधिकारी (निर्वाचन अधिकारी)\n20. **Section Officer** $\\rightarrow$ अनुभाग अधिकारी\n21. **Under Secretary** $\\rightarrow$ अवर सचिव\n22. **Vigilance Officer** $\\rightarrow$ सतर्कता अधिकारी'
    },
    {
      id: 'ch_3',
      title: '3. सचिवालयीन एवं विधिक प्रशासनिक शब्दावली (Secretariat & Legal Terms)',
      content: 'मंत्रालयों एवं सचिवालय में प्रयुक्त होने वाले कोर प्रशासनिक शब्द:\n\n1. **Ad hoc** $\\rightarrow$ तदर्थ (विशिष्ट उद्देश्य हेतु अस्थायी)\n2. **Affidavit** $\\rightarrow$ शपथ-पत्र / हलफनामा\n3. **Allegation** $\\rightarrow$ आरोप / अभिकथन\n4. **Appraisal** $\\rightarrow$ मूल्यांकन / निर्धारण\n5. **Autonomy** $\\rightarrow$ स्वायत्तता\n6. **Bail** $\\rightarrow$ जमानत\n7. **Breach of Contract** $\\rightarrow$ संविदा भंग (अनुबंध भंग)\n8. **Censure** $\\rightarrow$ परिनिंदा (शासकीय दंड का एक रूप)\n9. **Competent Authority** $\\rightarrow$ सक्षम प्राधिकारी\n10. **Concurrence** $\\rightarrow$ सहमति / सहमती\n11. **Discrepancy** $\\rightarrow$ विसंगति / अंतर\n12. **Gazette** $\\rightarrow$ राजपत्र\n13. **Gazetted Officer** $\\rightarrow$ राजपत्रित अधिकारी\n14. **Grievance** $\\rightarrow$ शिकायत / व्यथा\n15. **Indemnity** $\\rightarrow$ क्षतिपूर्ति\n16. **Interim** $\\rightarrow$ अंतरिम (अस्थायी/मध्यवर्ती)\n17. **Jurisdiction** $\\rightarrow$ क्षेत्राधिकार / अधिकार क्षेत्र\n18. **Locus Standi** $\\rightarrow$ वाद हेतुक / सुनवाई का अधिकार\n19. **Memorandum** $\\rightarrow$ ज्ञापन\n20. **Misconduct** $\\rightarrow$ कदाचार / दुराचरण\n21. **Null and Void** $\\rightarrow$ अकृत और शून्य (निष्प्रभाव)\n22. **Ordinance** $\\rightarrow$ अध्यादेश (राज्यपाल या राष्ट्रपति द्वारा जारी)\n23. **Protocol** $\\rightarrow$ नयाचार / शिष्टाचार\n24. **Quorum** $\\rightarrow$ गणपूर्ति (कोरम)\n25. **Quo-Warranto** $\\rightarrow$ अधिकार-पृच्छा (संवैधानिक रिट)\n26. **Ratification** $\\rightarrow$ अनुसमर्थन / पुष्टि\n27. **Sanction** $\\rightarrow$ संस्वीकृति / मंजूरी\n28. **Sub judice** $\\rightarrow$ न्यायाधीन / न्यायालय में विचाराधीन\n29. **Supersede** $\\rightarrow$ अधिक्रमण करना\n30. **Vested Interests** $\\rightarrow$ निहित स्वार्थ'
    },
    {
      id: 'ch_4',
      title: '4. वित्तीय एवं लेखा संबंधी पारिभाषिक शब्दावली (Financial & Accounts Terms)',
      content: 'वित्त विभाग, कोषालय और लेखा परीक्षा से संबंधित मानक शब्द:\n\n1. **Appropriation** $\\rightarrow$ विनियोग (बजटीय आवंटन)\n2. **Audit** $\\rightarrow$ लेखापरीक्षा / अंकेक्षण\n3. **Balance Sheet** $\\rightarrow$ तुलन पत्र / स्थिति विवरण\n4. **Budget Estimates** $\\rightarrow$ बजट अनुमान\n5. **Consolidated Fund** $\\rightarrow$ समेकित निधि / संचित निधि\n6. **Contingency Fund** $\\rightarrow$ आकस्मिकता निधि\n7. **Deficit Financing** $\\rightarrow$ घाटे की वित्त-व्यवस्था (हीनार्थ प्रबंधन)\n8. **Devaluation** $\\rightarrow$ अवमूल्यन (मुद्रा का मूल्य घटाना)\n9. **Disinvestment** $\\rightarrow$ विनिवेश\n10. **Embezzlement** $\\rightarrow$ गबन / अपचलन (धन का अवैध हरण)\n11. **Exchequer** $\\rightarrow$ राजकोष / खजाना\n12. **Fiscal Deficit** $\\rightarrow$ राजकोषीय घाटा\n13. **Grant-in-aid** $\\rightarrow$ सहायता अनुदान\n14. **Honorarium** $\\rightarrow$ मानदेय\n15. **Inflation** $\\rightarrow$ मुद्रास्फीति (महँगाई)\n16. **Insolvency** $\\rightarrow$ दिवालियापन / शोधन अक्षमता\n17. **Liability** $\\rightarrow$ देयता / दायित्व\n18. **Overdraft** $\\rightarrow$ अधिविकर्ष\n19. **Per Diem / Daily Allowance** $\\rightarrow$ दैनिक भत्ता (डीए)\n20. **Reimbursement** $\\rightarrow$ प्रतिपूर्ति (खर्च की वापसी)\n21. **Revenue** $\\rightarrow$ राजस्व\n22. **Stipend** $\\rightarrow$ नियत छात्रवृत्ति / वृत्तिका\n23. **Treasury** $\\rightarrow$ कोषालय / खजाना\n24. **Voucher** $\\rightarrow$ वाउचर / प्रमाणक (खर्च का विधिक साक्ष्य)'
    },
    {
      id: 'ch_5',
      title: '5. व्यापाम परीक्षा में सर्वाधिक पूछे गए 50+ प्रशासनिक शब्दों का मास्टर शब्दकोश',
      content: 'छत्तीसगढ़ व्यापाम एवं पीएससी की परीक्षाओं में बार-बार दोहराए जाने वाले प्रामाणिक प्रशासनिक शब्दों का वर्णमाला क्रम (A to Z) संकलन:\n\n- **A**: Abstract = संक्षेप / सार; Acknowledgment = पावती / अभिस्वीकृति; Act = अधिनियम; Admissible = स्वीकार्य; Advance = अग्रिम; Allowance = भत्ता; Amendment = संशोधन; Annexure = अनुलग्नक; Appeal = अपील; Appendix = परिशिष्ट; Arrears = बकाया।\n- **B**: Ban = प्रतिबंध; Beneficiary = लाभार्थी; Bill = विधेयक (संसद में) / विपत्र (खर्च का); Bond = बंधपत्र; By-laws = उपनियम।\n- **C**: Casual Leave (CL) = आकस्मिक अवकाश; Circular = परिपत्र; Clarification = स्पष्टीकरण; Clause = खंड / उपधारा; Code = संहिता; Compensation = मुआवजा / क्षतिपूर्ति; Confidential = गोपनीय; Constitution = संविधान; Corruption = भ्रष्टाचार।\n- **D**: Dearness Allowance (DA) = महंगाई भत्ता; Demurrage = विलंब शुल्क; Deputation = प्रतिनियुक्ति; Disciplinary Action = अनुशासनिक कार्रवाई; Dismissal = पदच्युति / बर्खास्तगी; Duplicate = दूसरी प्रति।\n- **E**: Earned Leave (EL) = अर्जित अवकाश; Embargo = व्यापार प्रतिबंध; Enclosure = संलग्नक; Endorsement = पृष्ठांकन; Ex-officio = पदेन।\n- **F**: Feasibility = साध्यता / व्यवहार्यता; Forfeiture = जब्ती / जब्तीकरण।\n- **G**: Gazette = राजपत्र; Guidelines = दिशानिर्देश।\n- **H**: Hearing = सुनवाई; Hierarchy = पदसोपान।\n- **I**: Immunity = उन्मुक्ति; Increment = वेतन वृद्धि; Inspection = निरीक्षण; Interim = अंतरिम।\n- **J**: Judicial = न्यायिक; Jurisdiction = क्षेत्राधिकार।\n- **L**: Leave Encashment = अवकाश नकदीकरण; Lien = धारणाधिकार।\n- **M**: Maintenance = अनुरक्षण / भरण-पोषण; Majority = बहुमत; Minutes = कार्यवृत्त।\n- **N**: Negligence = उपेक्षा / लापरवाही; Nominee = नामिती / नामित व्यक्ति; Non-Cognizable = असंज्ञेय।\n- **O**: Oath = शपथ; Offence = अपराध; Overrule = अस्वीकार करना / रद्द करना।\n- **P**: Probation = परिवीक्षा; Prosecution = अभियोजन; Provisional = अनंतिम।\n- **Q**: Quorum = गणपूर्ति।\n- **R**: Re-appropriation = पुनर्विनियोग; Resolution = संकल्प; Revocation = प्रतिसंहरण / निरसन।\n- **S**: Seniority = वरिष्ठता; Show-cause Notice = कारण बताओ नोटिस; Subordinate = अधीनस्थ; Suspension = निलंबन।\n- **T**: Tender = निविदा; Termination = सेवा समाप्ति; Transfer = स्थानांतरण।\n- **U**: Unanimous = सर्वसम्मत; Undertaking = वचनपत्र / उपक्रम।\n- **V**: Validity = वैधता; Verification = सत्यापन; Veto = वीटो / निषेधाधिकार।'
    }
  ],
  comparativeTables: [
    {
      title: 'समान लगने वाले भ्रामक प्रशासनिक शब्दों का सूक्ष्म अंतर (मास्टर चार्ट)',
      headers: ['अंग्रेजी शब्द 1', 'हिंदी पर्याय 1', 'अंग्रेजी शब्द 2', 'हिंदी पर्याय 2', 'व्याकरणिक एवं विधिक अंतर'],
      rows: [
        ['Act', 'अधिनियम (संसद द्वारा पारित)', 'Bill', 'विधेयक (पारित होने से पूर्व का मसौदा)', 'Bill राष्ट्रपति की स्वीकृति के बाद Act बनता है'],
        ['Rules', 'नियम (सरकार द्वारा निर्मित)', 'Regulations', 'विनियम (निकाय/प्राधिकरण द्वारा निर्मित)', 'Rules व्यापक होते हैं, Regulations आंतरिक कार्य संचालन हेतु'],
        ['Suspension', 'निलंबन (जाँच तक पद से अस्थायी रोक)', 'Dismissal', 'पदच्युति / बर्खास्तगी (स्थायी निष्कासन)', 'निलंबन दंड नहीं बल्कि प्रक्रिया है; बर्खास्तगी अंतिम दंड है'],
        ['Gazette', 'राजपत्र (सरकारी समाचार पत्र)', 'Notification', 'अधिसूचना (राजपत्र में प्रकाशित आदेश)', 'Gazette वह माध्यम है जिसमें Notification छपती है'],
        ['Autonomy', 'स्वायत्तता (आंतरिक स्वतंत्रता)', 'Sovereignty', 'संप्रभुता (सर्वोच्च बाह्य व आंतरिक शक्ति)', 'Autonomy किसी संस्था की होती है, Sovereignty राष्ट्र की'],
        ['Compensation', 'मुआवजा / प्रतिकर', 'Indemnity', 'क्षतिपूर्ति (संभावित हानि से सुरक्षा)', 'Compensation हानि के बाद; Indemnity पूर्व अनुबंध द्वारा']
      ]
    },
    {
      title: 'अवकाश (Leave) संबंधी प्रमुख पारिभाषिक शब्दों की तालिका',
      headers: ['अंग्रेजी शब्द', 'संक्षिप्त रूप', 'मानक हिंदी पर्याय', 'अवकाश का स्वरूप'],
      rows: [
        ['Casual Leave', 'CL', 'आकस्मिक अवकाश', 'अचानक उत्पन्न कार्य हेतु अल्पकालिक अवकाश'],
        ['Earned Leave', 'EL', 'अर्जित अवकाश', 'कार्य अवधि के आधार पर अर्जित लंबी छुट्टी'],
        ['Medical Leave', 'ML', 'चिकित्सा अवकाश', 'बीमारी के आधार पर लिया जाने वाला अवकाश'],
        ['Maternity Leave', '-', 'मातृत्व अवकाश', 'महिला कर्मचारियों को प्रसव हेतु देय अवकाश'],
        ['Paternity Leave', '-', 'पितृत्व अवकाश', 'पुरुष कर्मचारियों को संतान देखभाल हेतु देय अवकाश'],
        ['Study Leave', '-', 'अध्ययन अवकाश', 'उच्च शिक्षा या विशिष्ट शोध हेतु देय अवकाश'],
        ['Extraordinary Leave', 'EOL', 'असाधारण अवकाश', 'विशेष परिस्थितियों में बिना वेतन अवकाश']
      ]
    },
    {
      title: 'वित्तीय एवं लेखा प्रशासनिक शब्दों का त्वरित शब्दकोश',
      headers: ['अंग्रेजी शब्द', 'मानक हिंदी पर्याय', 'अंग्रेजी शब्द', 'मानक हिंदी पर्याय'],
      rows: [
        ['Appropriation', 'विनियोग', 'Audit', 'लेखापरीक्षा / अंकेक्षण'],
        ['Consolidated Fund', 'संचित निधि', 'Contingency Fund', 'आकस्मिकता निधि'],
        ['Embezzlement', 'गबन / अपचलन', 'Fiscal Deficit', 'राजकोषीय घाटा'],
        ['Grant-in-aid', 'सहायता अनुदान', 'Honorarium', 'मानदेय'],
        ['Overdraft', 'अधिविकर्ष', 'Reimbursement', 'प्रतिपूर्ति'],
        ['Voucher', 'प्रमाणक', 'Disinvestment', 'विनिवेश']
      ]
    }
  ],
  pyqs: [
    {
      question: '"Affidavit" का मानक हिंदी पारिभाषिक शब्द क्या है?',
      options: [
        'अभ्यावेदन',
        'शपथ-पत्र (हलफनामा)',
        'अधिसूचना',
        'वचन-पत्र'
      ],
      answer: 'शपथ-पत्र (हलफनामा)',
      explanation: 'न्यायालय या प्रशासनिक प्रक्रियाओं में शपथपूर्वक दिए जाने वाले लिखित बयान (Affidavit) का मानक हिंदी पर्याय "शपथ-पत्र" होता है।',
      year: '2023',
      exam: 'CG Vyapam संयुक्त भर्ती परीक्षा'
    },
    {
      question: '"Quorum" शब्द का सही हिंदी पारिभाषिक रूप क्या है?',
      options: [
        'कोरम',
        'गणपूर्ति',
        'कार्यसूची',
        'कार्यवृत्त'
      ],
      answer: 'गणपूर्ति',
      explanation: 'किसी सभा या बैठक की कार्यवाही को वैध बनाने के लिए आवश्यक न्यूनतम सदस्यों की संख्या को "Quorum" अर्थात् "गणपूर्ति" कहते हैं।',
      year: '2022',
      exam: 'CG Vyapam पटवारी भर्ती'
    },
    {
      question: '"Notification" का सही प्रशासनिक हिंदी अनुवाद क्या है?',
      options: [
        'परिपत्र',
        'कार्यालय ज्ञापन',
        'अधिसूचना',
        'निविदा'
      ],
      answer: 'अधिसूचना',
      explanation: 'राजपत्र में प्रकाशित होने वाली सरकारी विज्ञप्ति/घोषणा को "अधिसूचना" (Notification) कहा जाता है।',
      year: '2021',
      exam: 'CG Vyapam खाद्य निरीक्षक'
    },
    {
      question: '"Indemnity Bond" का हिंदी पारिभाषिक शब्द क्या होगा?',
      options: [
        'मुआवजा पत्र',
        'क्षतिपूर्ति बंधपत्र',
        'जमानत पत्र',
        'शपथ पत्र'
      ],
      answer: 'क्षतिपूर्ति बंधपत्र',
      explanation: 'Indemnity का अर्थ "क्षतिपूर्ति" और Bond का अर्थ "बंधपत्र" होता है, अतः Indemnity Bond का मानक हिंदी पर्याय "क्षतिपूर्ति बंधपत्र" है।',
      year: '2019',
      exam: 'CG Vyapam DEO'
    },
    {
      question: '"Discrepancy" का सही हिंदी पर्याय क्या है?',
      options: [
        'विसंगति / अंतर',
        'समानता',
        'विविधता',
        'विवाद'
      ],
      answer: 'विसंगति / अंतर',
      explanation: 'लेखा या विवरणों में पाए जाने वाले बेमेल अंतर या त्रुटि को अंग्रेजी में Discrepancy तथा हिंदी में "विसंगति" कहा जाता है।',
      year: '2018',
      exam: 'CG Vyapam शिक्षक पात्रता परीक्षा (TET)'
    },
    {
      question: '"Gazetted Officer" का सही हिंदी रूप क्या है?',
      options: [
        'सरकारी अधिकारी',
        'राजपत्रित अधिकारी',
        'मान्यता प्राप्त अधिकारी',
        'प्रथम श्रेणी अधिकारी'
      ],
      answer: 'राजपत्रित अधिकारी',
      explanation: 'जिन अधिकारियों की नियुक्ति, पदोन्नति आदि की सूचना शासकीय राजपत्र (Gazette) में प्रकाशित होती है, उन्हें "राजपत्रित अधिकारी" (Gazetted Officer) कहते हैं।',
      year: '2017',
      exam: 'CG Vyapam छात्रावास अधीक्षक'
    }
  ],
  mcqs: [
    {
      question: '"Appropriation" शब्द का प्रशासनिक हिंदी पर्याय क्या है?',
      options: ['विनियोग', 'आहरण', 'निक्षेप', 'अधिविकर्ष'],
      answer: 'विनियोग',
      explanation: 'बजट में किसी विशिष्ट मद हेतु धनराशि स्वीकृत करने की प्रक्रिया को "विनियोग" (Appropriation) कहते हैं।'
    },
    {
      question: '"Autonomy" शब्द का सही हिंदी पारिभाषिक रूप कौन-सा है?',
      options: ['स्वतंत्रता', 'स्वायत्तता', 'संप्रभुता', 'प्रजातंत्र'],
      answer: 'स्वायत्तता',
      explanation: 'किसी संस्था को आंतरिक निर्णय लेने की दी गई कानूनी स्वतंत्रता को "स्वायत्तता" (Autonomy) कहते हैं।'
    },
    {
      question: '"Embezzlement" का हिंदी पारिभाषिक शब्द क्या है?',
      options: ['चोरी', 'डकैती', 'गबन (अपचलन)', 'रिश्वत'],
      answer: 'गबन (अपचलन)',
      explanation: 'शासकीय या सार्वजनिक धन के अनाधिकृत व कपटपूर्ण दुरुपयोग को "गबन" (Embezzlement) कहा जाता है।'
    },
    {
      question: 'वैज्ञानिक तथा तकनीकी शब्दावली आयोग (CSTT) की स्थापना किस वर्ष हुई थी?',
      options: ['1950', '1955', '1961', '1976'],
      answer: '1961',
      explanation: 'भारत सरकार द्वारा मानक पारिभाषिक शब्दावली के निर्माण हेतु 1 अक्टूबर 1961 को CSTT की स्थापना की गई थी।'
    },
    {
      question: '"De-facto" का हिंदी विधिक पर्याय क्या होता है?',
      options: ['विधि सम्मत (De-jure)', 'वस्तुतः / वास्तव में', 'काल्पनिक', 'अवैध'],
      answer: 'वस्तुतः / वास्तव में',
      explanation: 'De-facto का अर्थ है "वस्तुतः" या "तथ्यतः" (वास्तविक स्थिति में)। जबकि De-jure का अर्थ "विधि सम्मत" (कानूनी रूप से) होता है।'
    },
    {
      question: '"Tender" का प्रशासनिक हिंदी शब्द क्या है?',
      options: ['विपत्र', 'निविदा', 'प्रस्ताव', 'प्रतिवेदन'],
      answer: 'निविदा',
      explanation: 'शासकीय निर्माण या आपूर्ति कार्यों हेतु दरें आमंत्रित करने वाले प्रपत्र को "निविदा" (Tender) कहा जाता है।'
    },
    {
      question: '"Null and Void" का सही हिंदी पर्याय क्या है?',
      options: ['अमान्य और असत्य', 'अकृत और शून्य', 'निरस्त और समाप्त', 'अनुचित और अवैध'],
      answer: 'अकृत और शून्य',
      explanation: 'विधि और प्रशासन में Null and Void का मानक तकनीकी पर्याय "अकृत और शून्य" होता है।'
    },
    {
      question: '"Honorarium" का हिंदी पारिभाषिक शब्द क्या है?',
      options: ['वेतन', 'मजदूरी', 'मानदेय', 'पेंशन'],
      answer: 'मानदेय',
      explanation: 'किसी विशिष्ट विशेषज्ञ सेवा या पद के सम्मान स्वरूप दी जाने वाली राशि को "मानदेय" (Honorarium) कहते हैं।'
    }
  ],
  keyTerminology: [
    {
      term: 'पारिभाषिक शब्द (Technical Term)',
      definition: 'वह शब्द जो किसी विशेष विद्या, शास्त्र या प्रशासनिक क्षेत्र में एक सुनिश्चित और सुपरिभाषित अर्थ में प्रयुक्त होता है।'
    },
    {
      term: 'अधिसूचना (Notification)',
      definition: 'राजपत्र (Gazette) में प्रकाशित आधिकारिक शासकीय आदेश जो सार्वजनिक विधि का रूप धारण करता है।'
    },
    {
      term: 'गणपूर्ति (Quorum)',
      definition: 'किसी सदन, सभा या समिति की वैधानिक बैठक संपन्न करने हेतु उपस्थित रहने वाले सदस्यों की न्यूनतम अनिवार्य संख्या।'
    },
    {
      term: 'शपथ-पत्र (Affidavit)',
      definition: 'शपथ आयुक्त या नोटरी के समक्ष सत्यनिष्ठापूर्वक किया गया लिखित एवं प्रमाणित विधिक अभिकथन।'
    },
    {
      term: 'विनियोग (Appropriation)',
      definition: 'संसद या विधानमंडल द्वारा कानून बनाकर सरकारी संचित निधि से व्यय हेतु धन निकालने की स्वीकृति।'
    },
    {
      term: 'क्षतिपूर्ति (Indemnity)',
      definition: 'किसी अनुबंध या कार्य के दौरान संभावित वित्तीय या भौतिक हानि की भरपाई करने का विधिक वचन।'
    },
    {
      term: 'तदर्थ (Ad hoc)',
      definition: 'किसी विशिष्ट तात्कालिक कार्य या सीमित अवधि के लिए अस्थायी रूप से किया गया प्रबंध।'
    },
    {
      term: 'अध्यादेश (Ordinance)',
      definition: 'सदन के सत्र में न होने पर संविधान के तहत राष्ट्रपति या राज्यपाल द्वारा जारी किया जाने वाला आपात वैधानिक आदेश।'
    }
  ],
  sources: [
    {
      name: 'वृहद् प्रशासन शब्दावली (Comprehensive Glossary of Administrative Terms)',
      author: 'वैज्ञानिक तथा तकनीकी शब्दावली आयोग (CSTT), भारत सरकार',
      relevance: 'प्रशासनिक एवं विधिक शब्दों के आधिकारिक और मानक हिंदी पर्याय।'
    },
    {
      name: 'प्रयोजनमूलक एवं प्रशासनिक हिंदी',
      author: 'डॉ. वासुदेवनंदन प्रसाद एवं डॉ. हरदेव बाहरी',
      relevance: 'सचिवालयीन कार्यपद्धति और पारिभाषिक शब्दावली के मानक नियम।'
    },
    {
      name: 'राजभाषा हैंडबुक',
      author: 'राजभाषा विभाग, गृह मंत्रालय, भारत सरकार',
      relevance: 'कार्यालयीन पदनाम, पद और प्रशासनिक शब्दावली का आधिकारिक संकलन।'
    },
    {
      name: 'छत्तीसगढ़ व्यापाम परीक्षा प्रश्न संकलन',
      author: 'व्यापाम प्रश्न बैंक (2012-2024)',
      relevance: 'विगत 12 वर्षों में पूछे गए 150+ अंग्रेजी-हिंदी प्रशासनिक पारिभाषिक प्रश्न।'
    }
  ],
  confusionBuster: [
    {
      doubt: 'Act और Bill में क्या अंतर है?',
      clarification: 'संसद या विधानसभा में जब कोई नया कानून बनने के लिए पेश किया जाता है, तो उसे "विधेयक" (Bill) कहते हैं। जब वह दोनों सदनों से पारित होकर राष्ट्रपति/राज्यपाल के हस्ताक्षर प्राप्त कर लेता है, तब वह "अधिनियम" (Act) बन जाता है।'
    },
    {
      doubt: 'Suspension और Termination/Dismissal में क्या अंतर है?',
      clarification: 'Suspension (निलंबन) एक अस्थायी प्रशासनिक व्यवस्था है जिसमें जाँच लंबित रहने तक कर्मचारी को कार्य करने से रोका जाता है (उसे निर्वाह भत्ता मिलता है)। Dismissal (पदच्युति/बर्खास्तगी) एक अंतिम दंड है जिससे कर्मचारी की सेवा सदा के लिए समाप्त हो जाती है।'
    },
    {
      doubt: 'Quorum और Agenda में क्या अंतर है?',
      clarification: 'Quorum (गणपूर्ति) बैठक के लिए अनिवार्य न्यूनतम सदस्यों की संख्या है। जबकि Agenda (कार्यसूची) बैठक में विचार किए जाने वाले विषयों की क्रमबद्ध सूची होती है।'
    },
    {
      doubt: 'De-jure और De-facto में क्या अंतर है?',
      clarification: 'De-jure का अर्थ है "विधि सम्मत" (कानून के अनुसार, जैसे राष्ट्रपति देश के विधिक प्रमुख हैं)। De-facto का अर्थ है "वास्तविक" (तथ्य के अनुसार, जैसे प्रधानमंत्री देश के वास्तविक कार्यकारी प्रमुख हैं)।'
    },
    {
      doubt: 'Gazette और Gazetted Officer में क्या संबंध है?',
      clarification: 'Gazette (राजपत्र) सरकार की आधिकारिक पत्रिका है। जिस अधिकारी की नियुक्ति का आदेश राजपत्र में छपता है, उसे "राजपत्रित अधिकारी" (Gazetted Officer) कहते हैं (जैसे डिप्टी कलेक्टर, तहसीलदार)।'
    }
  ],
  faqList: [
    {
      question: 'पारिभाषिक शब्दावली किसे कहते हैं?',
      answer: 'वे शब्द जिनका प्रयोग किसी विशिष्ट विषय (प्रशासन, विधि, विज्ञान) में एक निश्चित, सुपरिभाषित और असंदिग्ध अर्थ में किया जाता है, पारिभाषिक शब्द कहलाते हैं।'
    },
    {
      question: 'वैज्ञानिक तथा तकनीकी शब्दावली आयोग का मुख्य कार्य क्या है?',
      answer: 'भारत सरकार के अधीन विभिन्न ज्ञान-विज्ञान और प्रशासनिक क्षेत्रों के लिए प्रामाणिक एवं मानक हिंदी शब्दावली का निर्माण, मानकीकरण और प्रचार-प्रसार करना।'
    },
    {
      question: 'Notification, Circular और Order में क्या अंतर है?',
      answer: 'Notification (अधिसूचना) राजपत्र में प्रकाशित होती है; Circular (परिपत्र) एक साथ कई विभागों को भेजी जाने वाली सामान्य सूचना है; और Order (कार्यालय आदेश) किसी विशिष्ट कर्मचारी या मामले पर लागू होता है।'
    },
    {
      question: 'Affidavit, Bond और Undertaking में क्या अंतर है?',
      answer: 'Affidavit (शपथ-पत्र) सत्यता की विधिक घोषणा है; Bond (बंधपत्र) वित्तीय या दायित्व की विधिक गारंटी है; और Undertaking (वचनपत्र) किसी कार्य को करने या न करने का लिखित संकल्प है।'
    },
    {
      question: 'व्यापाम में पारिभाषिक शब्दावली से कैसे प्रश्न आते हैं?',
      answer: 'अंग्रेजी प्रशासनिक शब्द देकर उसका शुद्ध हिंदी पर्याय पूछना, हिंदी शब्द देकर अंग्रेजी शब्द पूछना, तथा सही सुमेलित युग्म की पहचान पर प्रश्न आते हैं।'
    }
  ],
  oneLinerRevision: [
    'पारिभाषिक शब्द वे होते हैं जो किसी विशेष ज्ञान-क्षेत्र में सुनिश्चित परिभाषा से बँधे होते हैं।',
    'वैज्ञानिक तथा तकनीकी शब्दावली आयोग (CSTT) की स्थापना 1961 में हुई थी।',
    'Affidavit का मानक हिंदी पर्याय "शपथ-पत्र" (हलफनामा) है।',
    'Quorum का मानक हिंदी पर्याय "गणपूर्ति" है।',
    'Notification का मानक हिंदी पर्याय "अधिसूचना" है (राजपत्र में प्रकाशित)।',
    'Appropriation का अर्थ "विनियोग" तथा Embezzlement का अर्थ "गबन" है।',
    'Gazetted Officer को हिंदी में "राजपत्रित अधिकारी" कहते हैं।',
    'Indemnity Bond को हिंदी में "क्षतिपूर्ति बंधपत्र" कहा जाता है।',
    'Null and Void का मानक विधिक पर्याय "अकृत और शून्य" है।',
    'Chief Secretary को हिंदी में "मुख्य सचिव" कहा जाता है।'
  ],
  rapidRevision: {
    points: [
      'Affidavit = शपथ-पत्र | Quorum = गणपूर्ति | Notification = अधिसूचना | Gazette = राजपत्र',
      'Appropriation = विनियोग | Embezzlement = गबन | Indemnity = क्षतिपूर्ति | Autonomy = स्वायत्तता',
      'Discrepancy = विसंगति | Tender = निविदा | Honorarium = मानदेय | Voucher = प्रमाणक',
      'Null and Void = अकृत और शून्य | Ad hoc = तदर्थ | Interim = अंतरिम | Ordinance = अध्यादेश',
      'Suspension = निलंबन | Dismissal = पदच्युति / बर्खास्तगी | Deputation = प्रतिनियुक्ति'
    ],
    formula: 'Affidavit (शपथ-पत्र) | Quorum (गणपूर्ति) | Notification (अधिसूचना) | Appropriation (विनियोग)',
    examTips: [
      'व्यापाम की हॉट लिस्ट: 1. Affidavit = शपथ-पत्र। 2. Quorum = गणपूर्ति। 3. Notification = अधिसूचना। 4. Indemnity = क्षतिपूर्ति। 5. Discrepancy = विसंगति — ये 5 शब्द कंठस्थ कर लें!',
      'विकल्प चुनते समय ध्यान रखें कि पारिभाषिक शब्द का उत्तर केवल अधिकृत प्रशासनिक शब्द ही हो सकता है, कोई अनौपचारिक या बोलचाल का शब्द नहीं!'
    ]
  }
};

async function uploadTopic() {
  try {
    const docId = 'cgv_master_hin_adv_2';
    const sanitized = sanitizeForFirestore(noteData);
    await db.collection('topic_study_notes').doc(docId).set(sanitized);
    console.log(`[Uploaded] topic_study_notes/${docId} successfully written.`);

    await markTopicCompleted('cgv_master_sub_5', 'cgv_master_sub_5_ch_12', 'hin_adv_2');
    console.log('Topic hin_adv_2 (Administrative & Technical Terminology) completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error uploading topic:', err);
    process.exit(1);
  }
}

uploadTopic();
