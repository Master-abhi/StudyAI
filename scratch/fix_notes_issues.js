const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

async function fixNotes() {
  console.log('Fixing notes issues...\n');

  // 1. Fix cgv_master_chem_9 (Chapters 3 and 4)
  const chem9Ref = db.collection('topic_study_notes').doc('cgv_master_chem_9');
  const chem9Doc = await chem9Ref.get();
  if (chem9Doc.exists) {
    const data = chem9Doc.data();
    let updated = false;

    // Chapter 3: Biogas matrix
    if (data.studyNotes?.chapters?.[2]) {
      let c3 = data.studyNotes.chapters[2].content;
      const oldBioMatrix = `$$\\begin{matrix}
\\mathbf{मीथेन\\;(CH_4)} & : & \\mathbf{55\\% - 75\\%} & \\text{(मुख्य ज्वलनशील घटक)} \\\\
\\text{कार्बन डाइऑक्साइड } (CO_2) & : & 25\\% - 40\\% & \\\\
\\text{नाइट्रोजन, हाइड्रोजन व } H_2S & : & 1\\% - 5\\% &
\\end{matrix}$$`;
      
      const newBioList = `* **मीथेन ($CH_4$):** $55\\% - 75\\%$ (मुख्य ज्वलनशील घटक)
* **कार्बन डाइऑक्साइड ($CO_2$):** $25\\% - 40\\%$
* **नाइट्रोजन, हाइड्रोजन व $H_2S$:** $1\\% - 5\\%$`;

      if (c3.includes('\\begin{matrix}')) {
        c3 = c3.replace(oldBioMatrix, newBioList);
        // Also fallback replace if exact whitespace differed
        c3 = c3.replace(/\$\$\\begin\{matrix\}[\s\S]*?\\mathbf\{मीथेन[\s\S]*?\\end\{matrix\}\$\$/g, newBioList);
        data.studyNotes.chapters[2].content = c3;
        updated = true;
        console.log('Fixed cgv_master_chem_9 Chapter 3 Biogas matrix! ✅');
      }
    }

    // Chapter 4: Candle flame matrix
    if (data.studyNotes?.chapters?.[3]) {
      let c4 = data.studyNotes.chapters[3].content;
      const oldFlameMatrix = `$$\\begin{matrix}
\\mathbf{1.\\;बाह्य\\;अदीप्त\\;क्षेत्र\\;(नीला)} & : & \\mathbf{सबसे\\;गर्म\\;क्षेत्र\\;(\\approx 1400^\\circ C)} & [\\text{पूर्ण दहन}] \\\\
\\mathbf{2.\\;मध्य\\;दीप्त\\;क्षेत्र\\;(पीला)} & : & \\text{मध्यम गर्म } (\\approx 1000^\\circ C) & [\\text{अपूर्ण दहन - कालिख}] \\\\
\\mathbf{3.\\;आंतरिक\\;अदीप्त\\;क्षेत्र\\;(काला)} & : & \\text{सबसे ठंडा क्षेत्र } (\\approx 600^\\circ C) & [\\text{अदग्ध मोमवाष्प}]
\\end{matrix}$$`;

      const newFlameList = `1. **बाह्य अदीप्त क्षेत्र (नीला):** सबसे गर्म क्षेत्र (लगभग $1400^\\circ\\text{C}$) — *पूर्ण दहन*
2. **मध्य दीप्त क्षेत्र (पीला):** मध्यम गर्म क्षेत्र (लगभग $1000^\\circ\\text{C}$) — *अपूर्ण दहन (कालिख युक्त)*
3. **आंतरिक अदीप्त क्षेत्र (काला):** सबसे ठंडा क्षेत्र (लगभग $600^\\circ\\text{C}$) — *अदग्ध मोमवाष्प*`;

      if (c4.includes('\\begin{matrix}')) {
        c4 = c4.replace(oldFlameMatrix, newFlameList);
        c4 = c4.replace(/\$\$\\begin\{matrix\}[\s\S]*?\\mathbf\{1\.\\;बाह्य[\s\S]*?\\end\{matrix\}\$\$/g, newFlameList);
        data.studyNotes.chapters[3].content = c4;
        updated = true;
        console.log('Fixed cgv_master_chem_9 Chapter 4 Candle flame matrix! ✅');
      }
    }

    if (updated) {
      await chem9Ref.set(data);
      console.log('Saved cgv_master_chem_9 to Firestore! ✅\n');
    }
  }

  // 2. Fix cgv_master_chem_6 (Chapter 2 Reactivity Series)
  const chem6Ref = db.collection('topic_study_notes').doc('cgv_master_chem_6');
  const chem6Doc = await chem6Ref.get();
  if (chem6Doc.exists) {
    const data = chem6Doc.data();
    if (data.studyNotes?.chapters?.[1]) {
      let c2 = data.studyNotes.chapters[1].content;
      if (c2.includes('\\begin{matrix}')) {
        const newSeriesTable = `| धातु एवं प्रतीक | नाम | सक्रियता स्तर |
| :---: | :--- | :--- |
| **K** | पोटेशियम | **सर्वोच्च क्रियाशील (शीर्ष)** |
| **Na** | सोडियम | अति उच्च सक्रिय |
| **Ca** | कैल्शियम | उच्च सक्रिय |
| **Mg** | मैग्नीशियम | मध्यम-उच्च सक्रिय |
| **Al** | एल्युमिनियम | मध्यम सक्रिय |
| **Zn** | जिंक | मध्यम सक्रिय |
| **Fe** | आयरन (लोहा) | मध्यम-निम्न सक्रिय |
| **Pb** | लेड (सीसा) | निम्न सक्रिय |
| **[H]** | हाइड्रोजन | *(मानक संदर्भ अधातु)* |
| **Cu** | कॉपर (तांबा) | कम सक्रिय |
| **Hg** | मर्करी (पारा) | अति निम्न सक्रिय |
| **Ag** | सिल्वर (चांदी) | अक्रिय धातु |
| **Au** | गोल्ड (सोना) | **न्यूनतम क्रियाशील / उत्कृष्ट धातु** |`;

        c2 = c2.replace(/\$\$\\begin\{matrix\}[\s\S]*?\\mathbf\{K\}[\s\S]*?\\end\{matrix\}\$\$/g, newSeriesTable);
        data.studyNotes.chapters[1].content = c2;
        await chem6Ref.set(data);
        console.log('Fixed cgv_master_chem_6 Chapter 2 Reactivity Series! ✅\n');
      }
    }
  }

  // 3. Fix cgv_master_chem_10 (Chapter 4 Gunpowder composition)
  const chem10Ref = db.collection('topic_study_notes').doc('cgv_master_chem_10');
  const chem10Doc = await chem10Ref.get();
  if (chem10Doc.exists) {
    const data = chem10Doc.data();
    if (data.studyNotes?.chapters?.[3]) {
      let c4 = data.studyNotes.chapters[3].content;
      if (c4.includes('\\begin{matrix}')) {
        const newGunpowderList = `* **पोटेशियम नाइट्रेट ($KNO_3$ / शोरा):** $\\approx 75\\%$ (ऑक्सीकारक)
* **चारकोल (कार्बन $C$):** $\\approx 15\\%$ (ईंधन)
* **गंधक (सल्फर $S$):** $\\approx 10\\%$ (ज्वलनशीलता बढ़ाने हेतु)`;

        c4 = c4.replace(/\$\$\\begin\{matrix\}[\s\S]*?\\mathbf\{पोटेशियम[\s\S]*?\\end\{matrix\}\$\$/g, newGunpowderList);
        data.studyNotes.chapters[3].content = c4;
        await chem10Ref.set(data);
        console.log('Fixed cgv_master_chem_10 Chapter 4 Gunpowder! ✅\n');
      }
    }
  }

  // 4. Fix cgv_master_chem_11 (Chapter 4 Vulcanization diagram)
  const chem11Ref = db.collection('topic_study_notes').doc('cgv_master_chem_11');
  const chem11Doc = await chem11Ref.get();
  if (chem11Doc.exists) {
    const data = chem11Doc.data();
    if (data.studyNotes?.chapters?.[3]) {
      let c4 = data.studyNotes.chapters[3].content;
      if (c4.includes('\\begin{matrix}')) {
        const newVulcDiagram = `\`\`\`text
~ CH₂ - C(CH₃) = CH - CH₂ ~
           |              |
         - S -          - S -
           |              |
~ CH₂ - C(CH₃) = CH - CH₂ ~
\`\`\``;

        c4 = c4.replace(/\$\$\\begin\{matrix\}[\s\S]*?\\sim CH_2[\s\S]*?\\end\{matrix\}\$\$/g, newVulcDiagram);
        data.studyNotes.chapters[3].content = c4;
        await chem11Ref.set(data);
        console.log('Fixed cgv_master_chem_11 Chapter 4 Vulcanization diagram! ✅\n');
      }
    }
  }

  // 5. Fix cgv_master_ind_eco_1 (Chapter 5 unclosed $)
  const eco1Ref = db.collection('topic_study_notes').doc('cgv_master_ind_eco_1');
  const eco1Doc = await eco1Ref.get();
  if (eco1Doc.exists) {
    const data = eco1Doc.data();
    if (data.studyNotes?.chapters?.[4]) {
      let c5 = data.studyNotes.chapters[4].content;
      // Find line with unclosed $
      const lines = c5.split('\n');
      let changed = false;
      for (let i = 0; i < lines.length; i++) {
        const withoutD = lines[i].replace(/\$\$[\s\S]*?\$\$/g, '');
        const matches = withoutD.match(/\$/g);
        if (matches && matches.length % 2 !== 0) {
          console.log(`Fixing ind_eco_1 Chapter 5 line ${i + 1}: ${lines[i]}`);
          // Replace stray literal $ with \$ or remove if dollar symbol e.g. $100 -> \$100
          lines[i] = lines[i].replace(/(?<!\\)\$(\d+)/g, '\\$$$1');
          changed = true;
        }
      }
      if (changed) {
        data.studyNotes.chapters[4].content = lines.join('\n');
        await eco1Ref.set(data);
        console.log('Fixed cgv_master_ind_eco_1 Chapter 5 unclosed $! ✅\n');
      }
    }
  }

  console.log('All notes issues fixed successfully!');
}

fixNotes().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
