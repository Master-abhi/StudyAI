# -*- coding: utf-8 -*-
from build_complete_syllabi import M, C, make_sub

def get_vyapam_part2_exams():
    exams = {}

    # 6. CG VYAPAM SUB ENGINEER (उप अभियंता - सिविल)
    exams['cgv_sub_eng'] = {
        'name': 'Sub Engineer (Civil)',
        'fullName': 'CG Vyapam Sub Engineer (Civil / WRD / PWD / PHE) Recruitment Exam',
        'icon': '📐',
        'category': 'technical',
        'description': 'उप अभियंता (सिविल) सीधी भर्ती परीक्षा — आधिकारिक 150 अंकों का पाठ्यक्रम (50 Non-Tech + 100 Technical)',
        'eligibility': 'Diploma or Degree in Civil Engineering',
        'pattern': {
            'totalMarks': 150,
            'time': '3 Hours',
            'type': 'Objective MCQ (150 Questions, 150 Marks)',
            'papers': [
                { 'paper': 'Part 1: Non-Technical (GK, Reasoning, Maths, Computer)', 'marks': 50 },
                { 'paper': 'Part 2: Technical Civil Engineering Core', 'marks': 100 }
            ]
        },
        'subjects': [
            make_sub('se_non_tech', 'Non-Technical (सामान्य ज्ञान, रीजनिंग, गणित, कंप्यूटर)', 50, 'High', 'High (50 Qs)', True, [
                ('सामान्य ज्ञान एवं छत्तीसगढ़ GK', [M('cg_hist_1'), M('cg_geo_1'), M('cg_geo_3'), M('cg_geo_10'), M('cg_cul_1'), M('cg_eco_6'), M('ind_pol_1'), M('ind_geo_1'), M('ca_nat_1'), M('ca_cg_1')]),
                ('मानसिक योग्यता एवं रीजनिंग', [M('reas_ser_1'), M('reas_ana_1'), M('reas_cd_1'), M('reas_dir_1'), M('reas_nv_1')]),
                ('अंकगणित एवं क्षेत्रमिति', [M('math_ns_1'), M('math_ratio_3'), M('math_ar_1'), M('math_ratio_1'), M('math_men_1'), M('math_men_2')]),
                ('कंप्यूटर की मूल बातें', [M('comp_basic_1'), M('comp_hw_1'), M('comp_sw_1'), M('comp_office_1'), M('comp_office_2')])
            ]),
            make_sub('se_civil_core', 'Civil Engineering Core (सिविल इंजीनियरिंग)', 100, 'Highest', 'Extremely High (100 Qs)', False, [
                ('Building Materials & Construction', [
                    C('se_civ_1', 'Building Materials (Cement, Concrete, Bricks)', 'भवन निर्माण सामग्री (सीमेंट, कंक्रीट, ईंट, पत्थर, टिम्बर एवं पेंट्स)', ['सीमेंट के प्रकार, संरचना एवं फील्ड टेस्ट', 'कंक्रीट मिक्स डिजाइन, वर्केबिलिटी एवं संपीडन सामर्थ्य', 'ईंटों का वर्गीकरण एवं परीक्षण', 'टिम्बर, पेंट्स, वार्निश एवं फेरस/नॉन-फेरस धातुएँ']),
                    C('se_civ_2', 'Building Construction & Foundations', 'भवन निर्माण तकनीक एवं नींव (Foundations)', ['चिनाई कार्य (Brick & Stone Masonry)', 'उथली एवं गहरी नींव (Shallow & Deep Foundations)', 'डैम्प प्रूफ कोर्स (DPC) एवं प्लास्टरिंग', 'दरवाजे, खिड़कियां, सीढ़ियां एवं छतें'])
                ]),
                ('Structural Analysis & Design (RCC & Steel)', [
                    C('se_civ_3', 'Strength of Materials & Structural Analysis', 'पदार्थों की सामर्थ्य एवं संरचनात्मक विश्लेषण', ['प्रतिबल एवं विकृति (Stress & Strain), हुक का नियम', 'कतरनी बल एवं बंकन आघूर्ण (SFD & BMD)', 'ढलान एवं विक्षेपण (Slope & Deflection)', 'कॉलम एवं स्ट्रट्स (यूलर सूत्र)']),
                    C('se_civ_4', 'Design of Reinforced Concrete Structures (IS 456)', 'आरसीसी संरचनाओं का डिजाइन (IS 456:2000)', ['सीमा अवस्था विधि (Limit State Method) सिद्धांत', 'एकल एवं दोहरे प्रबलित बीम का डिजाइन', 'टी-बीम एवं एल-बीम विश्लेषण', 'स्लैब (One-way & Two-way), कॉलम एवं फुटिंग्स डिजाइन']),
                    C('se_civ_5', 'Design of Steel Structures (IS 800)', 'स्टील संरचनाओं का डिजाइन (IS 800:2007)', ['बोल्टेड एवं वेल्डेड जोड़ (Bolted & Welded Connections)', 'तनाव एवं संपीडन सदस्य डिजाइन (Tension & Compression Members)', 'प्लेट गर्डर एवं रूफ ट्रस (Roof Trusses)'])
                ]),
                ('Geotechnical & Surveying', [
                    C('se_civ_6', 'Soil Mechanics & Geotechnical Engineering', 'सॉइल मैकेनिक्स एवं भू-तकनीकी इंजीनियरिंग', ['मृदा के तीन प्रावस्था संबंध (Phase Relations)', 'वर्गीकरण (IS Soil Classification)', 'पारगम्यता (Permeability) एवं सीपेज', 'मृदा संपीडन एवं कतरनी सामर्थ्य (Shear Strength)', 'धारण क्षमता (Bearing Capacity of Soils)']),
                    C('se_civ_7', 'Surveying, Levelling & Modern Tools', 'सर्वेइंग, लेवलिंग एवं आधुनिक उपकरण (Total Station, GPS)', ['चेन एवं कंपास सर्वेइंग (Prismatic Compass)', 'लेवलिंग एवं कंटूरिंग (Levelling & Contouring)', 'थोडोलाइट एवं टैकोमेट्रिक सर्वेइंग', 'टोटल स्टेशन, जीपीएस (GPS) एवं जीआईएस (GIS) मूल बातें'])
                ]),
                ('Water Resources, Transportation & Environmental', [
                    C('se_civ_8', 'Fluid Mechanics & Hydraulics', 'फ्लूइड मैकेनिक्स, हाइड्रोलिक्स एवं खुला चैनल प्रवाह', ['द्रव के गुण, हाइड्रोस्टैटिक दाब', 'बरनौली प्रमेय एवं वेंच्युरीमीटर', 'पाइपों में घर्षण हानि (Darcy-Weisbach)', 'ओपन चैनल फ्लो (Manning एवं Chezy सूत्र)']),
                    C('se_civ_9', 'Highway, Traffic & Transportation', 'हाईवे एवं ट्रांसपोर्टेशन इंजीनियरिंग', ['हाईवे ज्यामितीय डिजाइन (Camber, Super-elevation, Sight Distance)', 'पेवमेंट डिजाइन (Flexible & Rigid Pavements)', 'ट्रैफिक इंजीनियरिंग एवं सड़क संकेत']),
                    C('se_civ_10', 'Environmental Engineering & Water Supply', 'जल आपूर्ति एवं सीवरेज इंजीनियरिंग', ['जल मांग आकलन एवं गुणवत्ता मानक', 'जल शोधन प्रक्रियाएं (Sedimentation, Filtration, Chlorination)', 'सीवरेज प्रणाली एवं सीवेज उपचार (BOD/COD)']),
                    C('se_civ_11', 'Estimation, Costing & Project Management', 'एस्टिमेशन, कॉस्टिंग, वैल्यूएशन एवं सीपीएम/पर्ट', ['विस्तृत आकलन विधियाँ (Detailed Estimates)', 'दर विश्लेषण (Rate Analysis) एवं पीडब्ल्यूडी दर अनुसूची', 'मूल्यांकन (Valuation Methods)', 'नेटवर्क विश्लेषण (CPM एवं PERT)'])
                ])
            ])
        ]
    }

    # 7. CG NAIB TEHSILDAR / REVENUE
    exams['cgv_naib'] = {
        'name': 'Naib Tehsildar',
        'fullName': 'CG Naib Tehsildar / Revenue Administration Exam',
        'icon': '⚖️',
        'category': 'administrative',
        'description': 'नायब तहसीलदार / राजस्व प्रशासन भर्ती परीक्षा — 150 अंक',
        'eligibility': 'Graduate in Any Discipline',
        'pattern': {
            'totalMarks': 150,
            'time': '3 Hours',
            'type': 'Objective MCQ (150 Questions, 150 Marks)',
            'papers': [
                { 'paper': 'छत्तीसगढ़ भू-राजस्व संहिता एवं राजस्व प्रशासन', 'marks': 40 },
                { 'paper': 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)', 'marks': 40 },
                { 'paper': 'भारत सामान्य ज्ञान एवं संविधान', 'marks': 30 },
                { 'paper': 'मानसिक योग्यता एवं अंकगणित', 'marks': 20 },
                { 'paper': 'सामान्य हिंदी एवं छत्तीसगढ़ी भाषा', 'marks': 20 }
            ]
        },
        'subjects': [
            make_sub('naib_rev_code', 'छत्तीसगढ़ भू-राजस्व संहिता एवं राजस्व प्रशासन', 40, 'Highest', 'Extremely High (40 Qs)', True, [
                ('भू-राजस्व संहिता संरचना एवं परिभाषाएं', [
                    C('naib_rc_1', 'CG Land Revenue Code 1959 Overview', 'छत्तीसगढ़ भू-राजस्व संहिता 1959 की संरचना, अध्याय एवं प्रमुख परिभाषाएं', ['संहिता की ऐतिहासिक पृष्ठभूमि एवं विस्तार', 'कृषि वर्ष, भूमि, भूमिधारी, लगान एवं राजस्व वर्ष परिभाषाएं', 'राजस्व मंडल (Board of Revenue) का गठन एवं शक्तियां', 'राजस्व न्यायालयों की अधिकारिता एवं कार्यप्रणाली']),
                    C('naib_rc_2', 'Revenue Officers & Hierarchy', 'राजस्व अधिकारियों के पदक्रम, अधिकारिता एवं शक्तियां', ['कलेक्टर, अपर कलेक्टर, अनुविभागीय अधिकारी (SDO-R)', 'तहसीलदार, नायब तहसीलदार एवं उनके न्यायालय', 'राजस्व निरीक्षक (RI) एवं पटवारी के कर्तव्य व हलका प्रबंधन', 'तलाशी, समन एवं अभिलेख तलब करने की शक्तियां'])
                ]),
                ('भू-अभिलेख एवं नामांतरण प्रक्रिया', [
                    C('naib_rc_3', 'Land Records & Bhuiyan Portal', 'भू-अभिलेख, खसरा, खतौनी, बी-1, नक्शा एवं भूइयां (Bhuiyan) डिजिटल पोर्टल', ['अधिकार अभिलेख (Record of Rights) एवं वार्षिक खतौनी', 'खसरा एवं भू-नक्शा अद्यतनीकरण', 'भुइयां पोर्टल, डिजिटल सिग्नेचर एवं किसान किताब']),
                    C('naib_rc_4', 'Mutation, Demarcation & Partition', 'नामांतरण (Mutation), सीमांकन (Demarcation), बंटवारा एवं हक-त्याग', ['फौती एवं पंजीकृत विक्रय नामांतरण प्रक्रिया', 'विवादित एवं निर्विवाद नामांतरण', 'भूमि का सीमांकन एवं पंचनामा', 'सह-खातेदारों के मध्य खाता बंटवारा']),
                    C('naib_rc_5', 'Land Acquisition & Revenue Appeals', 'भू-अर्जन, पट्टा वितरण, नजूल प्रबंधन, अपील एवं पुनरीक्षण', ['शासकीय पट्टा आवंटन नियम एवं नजूल भूमि प्रबंधन', 'कृषि भूमि का व्यपवर्तन (Diversion)', 'राजस्व मामलों में प्रथम अपील, द्वितीय अपील एवं पुनरीक्षण (Revision)', 'उचित मुआवजा एवं पारदर्शिता भू-अर्जन अधिनियम 2013'])
                ])
            ]),
            make_sub('naib_cg', 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)', 40, 'Highest', 'Very High (40 Qs)', True, [
                ('छत्तीसगढ़ का इतिहास एवं स्वतंत्रता संग्राम', [M('cg_hist_1'), M('cg_hist_2'), M('cg_hist_7'), M('cg_hist_9'), M('cg_hist_10'), M('cg_hist_11'), M('cg_hist_12'), M('cg_hist_13')]),
                ('छत्तीसगढ़ भूगोल, वन, नदियां व खनिज', [M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_5'), M('cg_geo_7'), M('cg_geo_10')]),
                ('जनजातियां, लोककला एवं संस्कृति', [M('cg_cul_1'), M('cg_cul_2'), M('cg_cul_3'), M('cg_cul_4'), M('cg_cul_5'), M('cg_cul_8')]),
                ('प्रशासन, पंचायती राज व अर्थव्यवस्था', [M('cg_eco_1'), M('cg_eco_2'), M('cg_eco_4'), M('cg_eco_5'), M('cg_eco_6'), M('cg_eco_8')])
            ]),
            make_sub('naib_india', 'भारत सामान्य ज्ञान एवं संविधान', 30, 'High', 'High (30 Qs)', False, [
                ('भारतीय संविधान, राजव्यवस्था व शासन प्रणाली', [M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_3'), M('ind_pol_5'), M('ind_pol_6'), M('ind_pol_7'), M('ind_pol_8')]),
                ('भारतीय इतिहास, भूगोल एवं अर्थव्यवस्था', [M('ind_hist_1'), M('ind_hist_6'), M('ind_mod_3'), M('ind_mod_5'), M('ind_geo_1'), M('ind_geo_2'), M('ind_eco_1'), M('ind_eco_3')]),
                ('समसामयिक घटनाएं', [M('ca_nat_1'), M('ca_nat_3'), M('ca_cg_1'), M('ca_sports_1')])
            ]),
            make_sub('naib_aptitude', 'मानसिक योग्यता एवं अंकगणित', 20, 'High', 'High (20 Qs)', False, [
                ('संख्या पद्धति एवं अंकगणित', [M('math_ns_1'), M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_ratio_1'), M('math_si_1'), M('math_men_1')]),
                ('तार्किक एवं मानसिक योग्यता', [M('reas_ser_1'), M('reas_ana_1'), M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1'), M('reas_syl_1')])
            ]),
            make_sub('naib_lang', 'सामान्य हिंदी एवं छत्तीसगढ़ी भाषा', 20, 'High', 'High (20 Qs)', True, [
                ('सामान्य हिंदी व्याकरण', [M('hin_varn_1'), M('hin_sandhi_1'), M('hin_samas_1'), M('hin_gram_1'), M('hin_vocab_1'), M('hin_vocab_2'), M('hin_idiom_1'), M('hin_sent_1')]),
                ('छत्तीसगढ़ी भाषा एवं मुहावरे', [
                    C('naib_chhatt_1', 'Chhattisgarhi Grammar & Idioms', 'छत्तीसगढ़ी व्याकरण, शब्दकोश एवं हाना/लोकोक्तियां', ['छत्तीसगढ़ी संज्ञा, सर्वनाम, विशेषण एवं क्रिया', 'छत्तीसगढ़ी मुहावरे, हाना एवं जनउला', 'प्रशासनिक छत्तीसगढ़ी शब्दावली'])
                ])
            ])
        ]
    }

    # 8. CG HEALTH (Staff Nurse / ANM / MPW)
    exams['cgv_health'] = {
        'name': 'Staff Nurse / ANM / Health',
        'fullName': 'CG Health Department Staff Nurse & Auxiliary Nurse Midwife Recruitment Exam',
        'icon': '🩺',
        'category': 'health',
        'description': 'स्वास्थ्य विभाग स्टाफ नर्स, एएनएम एवं स्वास्थ्य कार्यकर्ता भर्ती परीक्षा — 100 अंक',
        'eligibility': 'B.Sc Nursing / GNM / ANM Course with CG Nursing Council Registration',
        'pattern': {
            'totalMarks': 100,
            'time': '2 Hours',
            'type': 'Objective MCQ (100 Questions, 100 Marks)',
            'papers': [
                { 'paper': 'Part 1: सामान्य ज्ञान, छत्तीसगढ़ GK एवं हिंदी', 'marks': 20 },
                { 'paper': 'Part 2: नर्सिंग एवं बुनियादी स्वास्थ्य विज्ञान', 'marks': 80 }
            ]
        },
        'subjects': [
            make_sub('hlth_non_tech', 'सामान्य ज्ञान, छत्तीसगढ़ GK एवं हिंदी', 20, 'Medium', 'Medium (20 Qs)', True, [
                ('छत्तीसगढ़ सामान्य ज्ञान एवं स्वास्थ्य योजनाएं', [M('cg_hist_11'), M('cg_geo_1'), M('cg_cul_1'), M('cg_eco_6'), M('ca_cg_1')]),
                ('भारत सामान्य ज्ञान व सामान्य विज्ञान', [M('ind_pol_1'), M('bio_1'), M('bio_9'), M('bio_10'), M('bio_11')]),
                ('सामान्य हिंदी', [M('hin_varn_1'), M('hin_sandhi_1'), M('hin_vocab_1'), M('hin_sent_1')])
            ]),
            make_sub('hlth_nursing_core', 'नर्सिंग एवं स्वास्थ्य विज्ञान (Nursing Sciences)', 80, 'Highest', 'Extremely High (80 Qs)', False, [
                ('Human Anatomy & Fundamentals of Nursing', [
                    C('hlth_nur_1', 'Human Anatomy & Physiology', 'मानव शरीर रचना एवं शरीर क्रिया विज्ञान (Anatomy & Physiology)', ['कोशिका, ऊतक एवं कंकाल तंत्र', 'पाचन, श्वसन एवं परिसंचरण तंत्र कार्यप्रणाली', 'तंत्रिका तंत्र एवं अंतःस्रावी ग्रंथियां', 'संवेदी अंग एवं उत्सर्जन तंत्र']),
                    C('hlth_nur_2', 'Fundamentals of Nursing & First Aid', 'नर्सिंग के मूल सिद्धांत, प्राथमिक चिकित्सा एवं सीपीआर (CPR)', ['रोगी देखभाल की बुनियादी अवधारणाएं एवं नैतिकता', 'वाइटल साइन्स (तापमान, नाड़ी, श्वसन, रक्तचाप) मापन', 'घाव की देखभाल, ड्रेसिंग एवं बाँझपन (Sterilization)', 'आपातकालीन प्राथमिक चिकित्सा एवं सीपीआर (CPR) तकनीक', 'दवा प्रशासन के अधिकार (Rights of Drug Administration)'])
                ]),
                ('Community Health, Maternal & Child Nursing', [
                    C('hlth_nur_3', 'Community Health Nursing & Immunization', 'कम्युनिटी हेल्थ नर्सिंग एवं राष्ट्रीय टीकाकरण कार्यक्रम', ['प्राथमिक स्वास्थ्य केंद्र (PHC), CHC एवं उपकेंद्र संरचना', 'राष्ट्रीय स्वास्थ्य मिशन (NHM) एवं प्रमुख स्वास्थ्य कार्यक्रम', 'सार्वभौमिक टीकाकरण कार्यक्रम (UIP) एवं कोल्ड चेन प्रबंधन', 'संचारी रोग नियंत्रण (मलेरिया, टीबी, कुष्ठ, एड्स)']),
                    C('hlth_nur_4', 'Midwifery & Obstetrical Nursing', 'मिडवाइफरी एवं प्रसूति नर्सिंग (Maternal Care)', ['गर्भावस्था के लक्षण एवं प्रसव पूर्व (ANC) देखभाल', 'सामान्य प्रसव प्रक्रिया एवं विभिन्न चरण', 'प्रसव पश्चात (PNC) देखभाल एवं स्तनपान', 'उच्च जोखिम गर्भावस्था एवं आपातकालीन प्रसूति देखभाल']),
                    C('hlth_nur_5', 'Pediatric Nursing & Child Nutrition', 'बाल स्वास्थ्य नर्सिंग (Pediatric Nursing) एवं बाल पोषण', ['नवजात शिशु देखभाल (KMC एवं APGAR स्कोर)', 'शिशु पोषण, कुपोषण (PEM, Marasmus, Kwashiorkor) प्रबंधन', 'बाल्यावस्था के सामान्य रोग (दस्त, निमोनिया, खसरा)', 'आईएमएनसीआई (IMNCI) दिशानिर्देश'])
                ]),
                ('Medical-Surgical Nursing & Pharmacology', [
                    C('hlth_nur_6', 'Medical-Surgical Nursing & Infection Control', 'मेडिकल-सर्जिकल नर्सिंग एवं अस्पताल संक्रमण नियंत्रण', ['श्वसन, हृदय एवं जठरांत्र विकारों की नर्सिंग देखभाल', 'प्री-ऑपरेटिव एवं पोस्ट-ऑपरेटिव नर्सिंग देखभाल', 'अस्पताल संक्रमण नियंत्रण एवं बायोमेडिकल वेस्ट (BMW)', 'व्यक्तिगत सुरक्षा उपकरण (PPE) एवं हाथ स्वच्छता']),
                    C('hlth_nur_7', 'Pharmacology, Microbiology & Mental Health', 'फार्माकोलॉजी, माइक्रोबायोलॉजी एवं मानसिक स्वास्थ्य नर्सिंग', ['आपातकालीन एवं सामान्य दवाओं का वर्गीकरण व खुराक', 'जीवाणु, विषाणु, कवक एवं संक्रामक एजेंट', 'मानसिक स्वास्थ्य के मूल सिद्धांत एवं मनोरोग नर्सिंग'])
                ])
            ])
        ]
    }

    # 9. CG ACCOUNTANT / AUDITOR (सहायक लेखापाल / संपरीक्षक)
    exams['cgv_accountant'] = {
        'name': 'Accountant / Auditor',
        'fullName': 'CG Vyapam Accountant, Junior Accountant & Auditor Recruitment Exam',
        'icon': '📊',
        'category': 'commerce',
        'description': 'सहायक लेखापाल, कनिष्ठ लेखापाल एवं संपरीक्षक भर्ती परीक्षा — 150 अंक',
        'eligibility': 'B.Com / M.Com / Commerce Graduate',
        'pattern': {
            'totalMarks': 150,
            'time': '3 Hours',
            'type': 'Objective MCQ (150 Questions, 150 Marks)',
            'papers': [
                { 'paper': 'बहीखाता एवं वित्तीय लेखांकन (Financial Accounting)', 'marks': 50 },
                { 'paper': 'अंकेक्षण, कराधान एवं वित्तीय प्रबंधन', 'marks': 30 },
                { 'paper': 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 'marks': 30 },
                { 'paper': 'कंप्यूटर ज्ञान (Tally, Excel एवं एकाउंटिंग सॉफ्टवेयर)', 'marks': 20 },
                { 'paper': 'सामान्य हिंदी एवं English Language', 'marks': 20 }
            ]
        },
        'subjects': [
            make_sub('acc_fin_core', 'बहीखाता एवं वित्तीय लेखांकन (Financial Accounting)', 50, 'Highest', 'Extremely High (50 Qs)', False, [
                ('Book Keeping & Accounting Principles', [
                    C('acc_b_1', 'Book Keeping Principles & Double Entry', 'पुस्तपालन के मूल सिद्धांत एवं दोहरा लेखा प्रणाली (Double Entry System)', ['लेखांकन की अवधारणाएँ एवं परंपराएँ (Accounting Concepts)', 'खातों के प्रकार (व्यक्तिगत, वास्तविक, नाममात्र) एवं स्वर्ण नियम', 'मूल प्रविष्टि की पुस्तकें एवं रोजनामचा (Journal Entries)', 'सहायक पुस्तकें (Cash Book, Purchase, Sales Book)']),
                    C('acc_b_2', 'Ledger, Trial Balance & Error Rectification', 'खाता बही (Ledger), तलपट (Trial Balance) एवं अशुद्धि शोधन', ['खाता बही खतौनी एवं शेष निकालना', 'तलपट तैयार करना एवं उद्देश्य', 'लेखांकन अशुद्धियों के प्रकार (Errors of Omission, Commission, Principle)', 'उचंत खाता (Suspense Account) एवं सुधार प्रविष्टियां']),
                    C('acc_b_3', 'Bank Reconciliation & Depreciation', 'बैंक समाधान विवरण (BRS), मूल्यह्रास एवं संचय', ['बैंक समाधान विवरण (BRS) के कारण एवं तैयारी', 'मूल्यह्रास (Depreciation) - सरल रेखा एवं क्रमागत ह्रास पद्धति', 'प्रावधान एवं संचय (Provisions & Reserves)'])
                ]),
                ('Final Accounts & Corporate Accounting', [
                    C('acc_b_4', 'Final Accounts of Sole Trader & Firms', 'अंतिम खाते (व्यापार खाता, लाभ-हानि खाता, स्थिति विवरण) एवं समायोजन', ['व्यापार खाता (Trading Account) एवं सकल लाभ', 'लाभ-हानि खाता (P&L Account) एवं शुद्ध लाभ', 'स्थिति विवरण (Balance Sheet) वर्गीकरण', 'समायोजन प्रविष्टियां (Adustment Entries - Closing Stock, Outstanding, Prepaid)']),
                    C('acc_b_5', 'Partnership & Company Accounts', 'साझेदारी खाते एवं कंपनी लेखांकन (Shares & Debentures)', ['साझेदारी संलेख, लाभ-हानि नियोजन खाता', 'साझेदार का प्रवेश, अवकाश ग्रहण एवं फर्म का विघटन', 'अंश पूंजी के प्रकार, अंशों का निर्गमन, आवंटन एवं हरण (Forfeiture)', 'ऋणपत्रों का निर्गमन एवं शोधन'])
                ])
            ]),
            make_sub('acc_audit_tax', 'अंकेक्षण, कराधान एवं वित्तीय प्रबंधन', 30, 'Highest', 'High (30 Qs)', False, [
                ('Auditing & Taxation', [
                    C('acc_t_1', 'Auditing Principles & Vouching', 'अंकेक्षण के सिद्धांत, प्रकार, प्रमाणन (Vouching) एवं आंतरिक नियंत्रण', ['अंकेक्षण का अर्थ, उद्देश्य एवं लाभ', 'अंकेक्षण के प्रकार (सतत, वार्षिक, आंतरिक)', 'प्रमाणन (Vouching) - अंकेक्षण की रीढ़', 'अंकेक्षण प्रतिवेदन (Audit Report - Clean, Qualified)']),
                    C('acc_t_2', 'Income Tax & GST Basics', 'आयकर (Income Tax) एवं वस्तु व सेवा कर (GST) रूपरेखा', ['आयकर के मूल सिद्धांत, कर निर्धारण वर्ष व गत वर्ष', 'आय के पांच शीर्ष (वेतन, गृह संपत्ति, व्यवसाय, पूंजीगत लाभ, अन्य)', 'आयकर की प्रमुख कटौतियां (80C से 80U) एवं टीडीएस (TDS)', 'GST का ढांचा (CGST, SGST, IGST), इनपुट टैक्स क्रेडिट (ITC) एवं ई-वे बिल']),
                    C('acc_t_3', 'Financial Management & Ratio Analysis', 'वित्तीय प्रबंधन, अनुपात विश्लेषण एवं बजटरी नियंत्रण', ['वित्तीय प्रबंधन के उद्देश्य एवं कार्य', 'अनुपात विश्लेषण (Liquidity, Profitability, Solvency Ratios)', 'बजटरी नियंत्रण एवं रोकड़ प्रवाह विवरण (Cash Flow Statement)'])
                ])
            ]),
            make_sub('acc_gk', 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 30, 'High', 'High (30 Qs)', True, [
                ('छत्तीसगढ़ सामान्य ज्ञान', [M('cg_hist_1'), M('cg_hist_7'), M('cg_geo_1'), M('cg_geo_3'), M('cg_cul_1'), M('cg_eco_1'), M('cg_eco_6'), M('ca_cg_1')]),
                ('भारत का सामान्य ज्ञान व अर्थव्यवस्था', [M('ind_hist_1'), M('ind_pol_1'), M('ind_pol_5'), M('ind_eco_1'), M('ind_eco_2'), M('ind_eco_3'), M('ca_nat_1'), M('ca_eco_1')])
            ]),
            make_sub('acc_comp', 'कंप्यूटर ज्ञान (Tally & Excel)', 20, 'High', 'High (20 Qs)', False, [
                ('कंप्यूटर मूल बातें एवं सॉफ्टवेयर', [M('comp_basic_1'), M('comp_hw_1'), M('comp_sw_1'), M('comp_office_1')]),
                ('MS Excel एवं टैली एकाउंटिंग', [
                    M('comp_office_2'),
                    C('acc_tally_1', 'Computerized Accounting & Tally ERP', 'कम्प्यूटरीकृत लेखांकन - टैली (Tally Prime/ERP) एवं वित्तीय रिपोर्ट्स', ['कम्प्यूटरीकृत लेखांकन प्रणाली के लाभ एवं सुरक्षा', 'टैली में कंपनी निर्माण, लेजर एवं ग्रुप बनाना', 'वाउचर प्रविष्टि (Receipt, Payment, Contra, Journal, Sales, Purchase)', 'टैली में ट्रायल बैलेंस, P&L, बैलेंस शीट एवं GST रिटर्न'])
                ])
            ]),
            make_sub('acc_lang', 'सामान्य हिंदी एवं English Language', 20, 'High', 'High (20 Qs)', False, [
                ('सामान्य हिंदी व्याकरण', [M('hin_varn_1'), M('hin_sandhi_1'), M('hin_samas_1'), M('hin_shabd_1'), M('hin_vocab_1'), M('hin_idiom_1'), M('hin_sent_1')]),
                ('General English Grammar & Vocab', [M('eng_gram_1'), M('eng_gram_2'), M('eng_tense_1'), M('eng_vocab_1'), M('eng_comp_1')])
            ])
        ]
    }

    # 10. CG STENO / DATA ENTRY OPERATOR (DEO)
    exams['cgv_steno_deo'] = {
        'name': 'Steno / DEO',
        'fullName': 'CG Vyapam Stenographer & Data Entry Operator (DEO) Recruitment Exam',
        'icon': '⌨️',
        'category': 'clerical',
        'description': 'शीघ्रलेखक (Stenographer) एवं डाटा एंट्री ऑपरेटर सीधी भर्ती परीक्षा — 100 अंक',
        'eligibility': '12th Pass / Graduate + DCA / PGDCA + Typing / Shorthand Certificate',
        'pattern': {
            'totalMarks': 100,
            'time': '2 Hours',
            'type': 'Objective MCQ (100 Questions, 100 Marks) + Skill Test (Typing/Steno)',
            'papers': [
                { 'paper': 'कंप्यूटर ज्ञान एवं ऑफिस ऑटोमेशन', 'marks': 40 },
                { 'paper': 'सामान्य ज्ञान एवं छत्तीसगढ़ सामान्य ज्ञान', 'marks': 30 },
                { 'paper': 'सामान्य हिंदी एवं English Language', 'marks': 20 },
                { 'paper': 'सामान्य मानसिक योग्यता एवं अंकगणित', 'marks': 10 }
            ]
        },
        'subjects': [
            make_sub('deo_comp', 'कंप्यूटर ज्ञान एवं ऑफिस ऑटोमेशन', 40, 'Highest', 'Extremely High (40 Qs)', False, [
                ('कंप्यूटर बुनियादी सिद्धांत एवं हार्डवेयर', [M('comp_basic_1'), M('comp_basic_2'), M('comp_basic_4'), M('comp_hw_1'), M('comp_hw_2'), M('comp_hw_3'), M('comp_hw_4')]),
                ('ऑपरेटिंग सिस्टम एवं शॉर्टकट कीज़', [M('comp_sw_1'), M('comp_sw_2'), M('comp_exam_1'), M('comp_exam_2')]),
                ('MS Office टूल्स एवं डॉक्यूमेंटेशन', [M('comp_office_1'), M('comp_office_2'), M('comp_office_3')]),
                ('इंटरनेट, ईमेल एवं टाइपिंग फॉन्ट्स', [
                    M('comp_net_1'), M('comp_net_4'), M('comp_cyber_1'),
                    C('deo_typ_1', 'Typing Fonts & Office Documentation', 'टाइपिंग फॉन्ट, इनस्क्रिप्ट, कृति देव एवं कार्यालयी ड्राफ्टिंग', ['हिंदी यूनिकोड एवं इनस्क्रिप्ट (InScript) की-बोर्ड लेआउट', 'रेमिंगटन गेल एवं कृति देव फॉन्ट की विशेषताएं', 'कार्यालयी पत्र प्रारूप, टिप्पण एवं संक्षेपण प्रारूपण'])
                ])
            ]),
            make_sub('deo_gk', 'सामान्य ज्ञान एवं छत्तीसगढ़ सामान्य ज्ञान', 30, 'High', 'High (30 Qs)', True, [
                ('छत्तीसगढ़ सामान्य ज्ञान', [M('cg_hist_1'), M('cg_hist_7'), M('cg_hist_11'), M('cg_geo_1'), M('cg_geo_3'), M('cg_cul_1'), M('cg_eco_4'), M('cg_eco_6'), M('ca_cg_1')]),
                ('भारत का सामान्य ज्ञान व समसामयिकी', [M('ind_hist_1'), M('ind_pol_1'), M('ind_pol_5'), M('ind_geo_1'), M('ca_nat_1'), M('ca_sports_1')])
            ]),
            make_sub('deo_lang', 'सामान्य हिंदी एवं English Language', 20, 'High', 'High (20 Qs)', False, [
                ('सामान्य हिंदी व्याकरण', [M('hin_varn_1'), M('hin_sandhi_1'), M('hin_samas_1'), M('hin_shabd_1'), M('hin_vocab_1'), M('hin_vocab_2'), M('hin_idiom_1'), M('hin_sent_1')]),
                ('General English Grammar', [M('eng_gram_1'), M('eng_gram_2'), M('eng_tense_1'), M('eng_vocab_1'), M('eng_comp_1'), M('eng_use_2')])
            ]),
            make_sub('deo_aptitude', 'सामान्य मानसिक योग्यता एवं अंकगणित', 10, 'Medium', 'Medium (10 Qs)', False, [
                ('रीजनिंग एवं अंकगणित मूल बातें', [M('reas_ser_1'), M('reas_ana_1'), M('reas_cd_1'), M('reas_dir_1'), M('math_ns_1'), M('math_ratio_3'), M('math_ar_1'), M('math_ratio_1')])
            ])
        ]
    }

    # 11. CG LAB TECHNICIAN / RADIOGRAPHER
    exams['cgv_lab_tech'] = {
        'name': 'Lab Technician / Radiographer',
        'fullName': 'CG Vyapam Lab Technician & Medical Technologist Recruitment Exam',
        'icon': '🔬',
        'category': 'technical',
        'description': 'प्रयोगशाला तकनीशियन एवं रेडियोग्राफर सीधी भर्ती परीक्षा — 100 अंक',
        'eligibility': 'DMLT / BMLT / Radiography Diploma with CG Paramedical Council Registration',
        'pattern': {
            'totalMarks': 100,
            'time': '2 Hours',
            'type': 'Objective MCQ (100 Questions, 100 Marks)',
            'papers': [
                { 'paper': 'Part 1: सामान्य ज्ञान, छत्तीसगढ़ GK एवं सामान्य विज्ञान', 'marks': 20 },
                { 'paper': 'Part 2: क्लिनिकल पैथोलॉजी एवं मेडिकल लैब टेक्नोलॉजी', 'marks': 80 }
            ]
        },
        'subjects': [
            make_sub('lab_non_tech', 'सामान्य ज्ञान एवं सामान्य विज्ञान', 20, 'Medium', 'Medium (20 Qs)', True, [
                ('छत्तीसगढ़ सामान्य ज्ञान एवं समसामयिकी', [M('cg_hist_11'), M('cg_geo_1'), M('cg_cul_1'), M('cg_eco_6'), M('ca_cg_1')]),
                ('भारत सामान्य ज्ञान व विज्ञान मूल बातें', [M('ind_pol_1'), M('phy_1'), M('chem_1'), M('chem_5'), M('bio_1')])
            ]),
            make_sub('lab_tech_core', 'क्लिनिकल पैथोलॉजी एवं लैब टेक्नोलॉजी (Clinical Lab Sciences)', 80, 'Highest', 'Extremely High (80 Qs)', False, [
                ('Clinical Hematology & Blood Banking', [
                    C('lab_c_1', 'Hematology & Blood Cell Counts', 'क्लिनिकल हेमेटोलॉजी - रक्त गणना (CBC), हीमोग्लोबिन एवं स्कंदन', ['रक्त की संरचना, कार्य एवं कोशिकाएं', 'हीमोग्लोबिन अनुमान विधियाँ (Sahli एवं Cyanmethemoglobin)', 'कुल एवं विभेदक ल्यूकोसाइट गणना (TLC/DLC)', 'ईएसआर (ESR), पीसीवी (PCV) एवं रक्त सूचकांक (MCV, MCH, MCHC)', 'रक्त स्कंदन समय (BT, CT, PT, APTT)']),
                    C('lab_c_2', 'Blood Banking & Transfusion', 'ब्लड बैंकिंग, रक्त समूह निर्धारण (ABO & Rh) एवं आधान सुरक्षा', ['ABO एवं Rh रक्त समूह प्रणाली', 'क्रॉस-मैचिंग (Major & Minor Cross-match)', 'कूम्ब्स टेस्ट (Direct & Indirect Coombs Test)', 'रक्त आधान जनित संक्रमण (TTI - HIV, Hepatitis B/C, Syphilis, Malaria) जांच', 'रक्त घटक पृथक्करण (PRBC, FFP, Platelets)'])
                ]),
                ('Biochemistry, Microbiology & Histopathology', [
                    C('lab_c_3', 'Clinical Biochemistry & Organ Profiles', 'क्लिनिकल बायोकेमिस्ट्री - अंग कार्य परीक्षण एवं एंजाइमोलॉजी', ['रक्त शर्करा (Fasting, PP, HbA1c) आकलन', 'यकृत कार्य परीक्षण (LFT - Bilirubin, SGOT, SGPT, ALP)', 'गुर्दा कार्य परीक्षण (KFT - Urea, Creatinine, Uric Acid)', 'लिपिड प्रोफाइल (Cholesterol, Triglycerides, HDL, LDL)', 'सीरम इलेक्ट्रोलाइट्स (Sodium, Potassium, Chloride)']),
                    C('lab_c_4', 'Microbiology, Serology & Parasitology', 'मेडिकल माइक्रोबायोलॉजी, सीरोलॉजी एवं परजीवी विज्ञान', ['जीवाणु वर्गीकरण एवं ग्राम स्टेनिंग (Gram Staining)', 'एसिड फास्ट स्टेनिंग (AFB Staining for TB)', 'कल्चर मीडिया एवं एंटीबायोटिक संवेदनशीलता परीक्षण (AST)', 'सीरोलॉजिकल टेस्ट (Widal, VDRL, ELISA, Rapid Card Tests)', 'मल परीक्षण एवं परजीवी (Amoeba, Giardia, Helminths)']),
                    C('lab_c_5', 'Histopathology & Cytology Techniques', 'हिस्टोपैथोलॉजी एवं साइटोलॉजी तकनीक', ['ऊतक निर्धारण (Fixation) एवं फिक्सेटिव्स', 'टिश्यू प्रोसेसिंग, डिहाइड्रेशन, क्लीयरिंग एवं पैराफिन एम्बेडिंग', 'माइक्रोटोम एवं सेक्शन कटिंग', 'हेमाटोक्सिलिन एवं इओसिन (H&E) स्टेनिंग', 'पेप स्मीयर (Pap Smear) एवं एफएनएसी (FNAC) मूल बातें'])
                ]),
                ('Body Fluids, Lab Safety & Biomedical Waste', [
                    C('lab_c_6', 'Urinalysis & Body Fluid Examination', 'मूत्र एवं अन्य शारीरिक तरल विश्लेषण (Body Fluids Analysis)', ['मूत्र का भौतिक, रासायनिक एवं सूक्ष्मदर्शी परीक्षण (Routine & Microscopic)', 'मूत्र में प्रोटीन, ग्लूकोज, कीटोन बॉडीज एवं पित्त लवण परीक्षण', 'सीएसएफ (CSF), प्लूरल, एसाइटिक एवं श्लेष द्रव (Synovial Fluid) विश्लेषण', 'वीर्य विश्लेषण (Semen Analysis)']),
                    C('lab_c_7', 'Lab Safety, Quality Control & Biomedical Waste', 'प्रयोगशाला सुरक्षा, बायोमेडिकल कचरा प्रबंधन (BMW) एवं गुणवत्ता नियंत्रण', ['प्रयोगशाला उपकरण रखरखाव (Microscope, Centrifuge, Colorimeter, Autoclave)', 'बायोमेडिकल कचरा पृथक्करण (रंग कोडित डिब्बे - पीला, लाल, नीला, काला)', 'गुणवत्ता नियंत्रण (Internal & External Quality Control)', 'प्रयोगशाला रासायनिक एवं जैविक सुरक्षा नियम'])
                ])
            ])
        ]
    }

    print('Sub Eng, Naib, Health, Accountant, Steno DEO, Lab Tech ready.')
    return exams
