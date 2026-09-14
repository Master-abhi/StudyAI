# -*- coding: utf-8 -*-
from build_complete_syllabi import M, C, make_sub

def get_cgpsc_exams():
    exams = {}

    # 1. CGPSC SSE (State Service Examination - Prelims)
    exams['cgpsc_sse'] = {
        'name': 'CGPSC SSE',
        'fullName': 'Chhattisgarh Public Service Commission — State Service Exam (Prelims)',
        'icon': '🏛️',
        'category': 'cgpsc',
        'description': 'छत्तीसगढ़ राज्य सेवा परीक्षा (प्रारंभिक) — आधिकारिक 400 अंकों का विस्तृत पाठ्यक्रम (Paper-1 GS & Paper-2 CSAT)',
        'eligibility': 'Graduate in Any Discipline',
        'pattern': {
            'totalMarks': 400,
            'time': 'Paper 1: 2 Hours | Paper 2: 2 Hours',
            'type': 'Objective MCQ (100 Questions each, 200 Marks each, 1/3rd Negative Marking)',
            'papers': [
                { 'paper': 'Paper 1 — Part A: General Studies of India', 'marks': 100 },
                { 'paper': 'Paper 1 — Part B: General Knowledge of Chhattisgarh', 'marks': 100 },
                { 'paper': 'Paper 2 — CSAT / Aptitude Test (Qualifying 33%)', 'marks': 200 }
            ]
        },
        'subjects': [
            make_sub('cgpsc_cg_gk', 'छत्तीसगढ़ सामान्य ज्ञान (CG GK — Paper 1 Part B)', 100, 'Highest', 'Extremely High (50 Qs, 100 Marks)', True, [
                ('छत्तीसगढ़ का इतिहास एवं स्वतंत्रता आंदोलन', [M('cg_hist_1'), M('cg_hist_2'), M('cg_hist_3'), M('cg_hist_4'), M('cg_hist_5'), M('cg_hist_6'), M('cg_hist_7'), M('cg_hist_8'), M('cg_hist_9'), M('cg_hist_10'), M('cg_hist_11'), M('cg_hist_12'), M('cg_hist_13')]),
                ('छत्तीसगढ़ का भूगोल, जलवायु, नदियां व वन संपदा', [M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_4'), M('cg_geo_5'), M('cg_geo_6'), M('cg_geo_7'), M('cg_geo_8'), M('cg_geo_9'), M('cg_geo_10')]),
                ('छत्तीसगढ़ की जनजातियाँ, कला, साहित्य एवं संस्कृति', [M('cg_cul_1'), M('cg_cul_2'), M('cg_cul_3'), M('cg_cul_4'), M('cg_cul_5'), M('cg_cul_6'), M('cg_cul_7'), M('cg_cul_8'), M('cg_adv_1'), M('cg_adv_2'), M('cg_adv_3'), M('cg_adv_4'), M('cg_adv_5')]),
                ('छत्तीसगढ़ का प्रशासनिक ढांचा, पंचायती राज एवं अर्थव्यवस्था', [M('cg_eco_1'), M('cg_eco_2'), M('cg_eco_3'), M('cg_eco_4'), M('cg_eco_5'), M('cg_eco_6'), M('cg_eco_7'), M('cg_eco_8'), M('ca_cg_1'), M('ca_cg_2'), M('ca_cg_3'), M('ca_cg_4')])
            ]),
            make_sub('cgpsc_india_gs', 'भारत का सामान्य अध्ययन (India GS — Paper 1 Part A)', 100, 'Highest', 'Extremely High (50 Qs, 100 Marks)', False, [
                ('भारतीय इतिहास एवं राष्ट्रीय आंदोलन', [M('ind_hist_1'), M('ind_hist_2'), M('ind_hist_3'), M('ind_hist_4'), M('ind_hist_5'), M('ind_hist_6'), M('ind_hist_7'), M('ind_hist_8'), M('ind_med_1'), M('ind_med_2'), M('ind_med_3'), M('ind_med_4'), M('ind_mod_1'), M('ind_mod_2'), M('ind_mod_3'), M('ind_mod_4'), M('ind_mod_5'), M('ind_mod_6'), M('ind_mod_7')]),
                ('भारत एवं विश्व का भूगोल', [M('ind_geo_1'), M('ind_geo_2'), M('ind_geo_3'), M('ind_geo_4'), M('ind_geo_5'), M('ind_adv_geo_1'), M('ind_adv_geo_2'), M('ind_adv_geo_3'), M('ind_adv_geo_4')]),
                ('भारतीय संविधान एवं राजव्यवस्था', [M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_3'), M('ind_pol_4'), M('ind_pol_5'), M('ind_pol_6'), M('ind_pol_7'), M('ind_pol_8')]),
                ('भारतीय अर्थव्यवस्था एवं नियोजन', [M('ind_eco_1'), M('ind_eco_2'), M('ind_eco_3'), M('ind_eco_4'), M('ca_eco_1'), M('ca_eco_2')]),
                ('सामान्य विज्ञान एवं प्रौद्योगिकी', [M('phy_1'), M('phy_4'), M('chem_1'), M('chem_5'), M('bio_1'), M('bio_9'), M('bio_10'), M('ca_sci_1'), M('ca_sci_2')]),
                ('पर्यावरण, जैव विविधता एवं समसामयिकी', [M('env_1'), M('env_2'), M('env_3'), M('env_4'), M('ca_nat_1'), M('ca_nat_3'), M('ca_nat_4'), M('ca_int_1'), M('ca_sports_1'), M('ca_award_1')])
            ]),
            make_sub('cgpsc_csat_reasoning', 'तार्किक योग्यता एवं मानसिक क्षमता (CSAT Reasoning)', 70, 'High', 'High (35 Qs)', False, [
                ('तार्किक एवं विश्लेषणात्मक योग्यता', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1'), M('reas_ana_2'), M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1'), M('reas_syl_1'), M('reas_syl_2'), M('reas_syl_3')]),
                ('निर्णय निर्माण एवं गैर-शाब्दिक तर्कशक्ति', [M('reas_dm_1'), M('reas_dm_2'), M('reas_dm_3'), M('reas_ana_4'), M('reas_ana_6'), M('reas_nv_1'), M('reas_nv_2'), M('reas_nv_5')])
            ]),
            make_sub('cgpsc_csat_maths', 'मूल संख्यात्मक गणित एवं डेटा व्याख्या (CSAT Numeracy)', 70, 'High', 'High (35 Qs)', False, [
                ('संख्या पद्धति एवं अंकगणित', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5'), M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_ratio_1'), M('math_si_1'), M('math_si_2'), M('math_si_3'), M('math_tsd_1')]),
                ('क्षेत्रमिति एवं बीजगणित', [M('math_alg_1'), M('math_geo_1'), M('math_men_1'), M('math_men_2')]),
                ('डेटा व्याख्या (Data Interpretation)', [M('math_di_1'), M('math_di_2'), M('math_di_3')])
            ]),
            make_sub('cgpsc_csat_lang', 'हिंदी एवं छत्तीसगढ़ी भाषा बोध (CSAT Language)', 60, 'High', 'High (30 Qs)', True, [
                ('सामान्य हिंदी व्याकरण एवं अपठित गद्यांश', [M('hin_varn_1'), M('hin_sandhi_1'), M('hin_samas_1'), M('hin_shabd_1'), M('hin_gram_1'), M('hin_vocab_1'), M('hin_vocab_2'), M('hin_idiom_1'), M('hin_sent_1'), M('hin_comp_1')]),
                ('छत्तीसगढ़ी भाषा ज्ञान एवं साहित्य', [
                    C('cgpsc_chhatt_1', 'Chhattisgarhi Grammar & Vocabulary', 'छत्तीसगढ़ी व्याकरण, शब्दकोश एवं मानक रूप', ['छत्तीसगढ़ी संज्ञा, सर्वनाम, विशेषण एवं क्रिया रूप', 'छत्तीसगढ़ी काल, वाच्य एवं लिंग-वचन निर्धारण', 'छत्तीसगढ़ी तत्सम, तद्भव एवं देशज शब्दावली']),
                    C('cgpsc_chhatt_2', 'Chhattisgarhi Idioms, Hana & Janula', 'छत्तीसगढ़ी मुहावरे, हाना एवं जनउला (पहेलियां)', ['लोकप्रिय छत्तीसगढ़ी हाना (लोकोक्तियां) एवं उनके अर्थ', 'जनउला (पहेलियां) एवं पहेली बुझौवल', 'दैनिक बोलचाल के छत्तीसगढ़ी विशिष्ट मुहावरे']),
                    C('cgpsc_chhatt_3', 'Chhattisgarhi Literature & Authors', 'छत्तीसगढ़ी साहित्य, साहित्यकार एवं प्रसिद्ध कृतियाँ', ['पंडित सुंदरलाल शर्मा, मुकुटधर पांडेय, लोचनप्रसाद पांडेय', 'डॉ. खूबचंद बघेल, हरि ठाकुर एवं प्रमुख रचनाएं', 'छत्तीसगढ़ी लोकनाट्य एवं पंडवानी परंपरा'])
                ])
            ])
        ]
    }

    # 2. CG POLICE SUB INSPECTOR (CG POLICE SI MAINS)
    exams['cg_police_si'] = {
        'name': 'CG Police SI',
        'fullName': 'CG Police Sub Inspector / Platoon Commander / Subedar (Mains)',
        'icon': '⭐',
        'category': 'police',
        'description': 'छत्तीसगढ़ पुलिस उप-निरीक्षक / सूबेदार मुख्य लिखित परीक्षा — 600 अंक',
        'eligibility': 'Graduate in Any Discipline',
        'pattern': {
            'totalMarks': 600,
            'time': 'Paper 1: 2 hrs | Paper 2: 3 hrs | Paper 3: 2 hrs',
            'type': 'Objective MCQ (3 Papers, 200 Marks each)',
            'papers': [
                { 'paper': 'Paper 1: भाषा ज्ञान (Hindi 125 Marks + English 75 Marks)', 'marks': 200 },
                { 'paper': 'Paper 2: सामान्य ज्ञान एवं सामान्य अध्ययन (CG GK + GS + Police)', 'marks': 200 },
                { 'paper': 'Paper 3: एप्टीट्यूड टेस्ट / गणित एवं तार्किक क्षमता', 'marks': 200 }
            ]
        },
        'subjects': [
            make_sub('si_lang', 'भाषा ज्ञान (Hindi & English — Paper 1)', 200, 'Highest', 'Extremely High (200 Marks)', False, [
                ('सामान्य हिंदी व्याकरण (125 Marks)', [M('hin_varn_1'), M('hin_sandhi_1'), M('hin_sandhi_2'), M('hin_samas_1'), M('hin_samas_2'), M('hin_up_1'), M('hin_up_2'), M('hin_shabd_1'), M('hin_gram_1'), M('hin_gram_2'), M('hin_gram_3'), M('hin_gram_4'), M('hin_vocab_1'), M('hin_vocab_2'), M('hin_vocab_3'), M('hin_idiom_1'), M('hin_idiom_2'), M('hin_lit_1'), M('hin_lit_2'), M('hin_lit_3'), M('hin_sent_1'), M('hin_comp_1')]),
                ('General English (75 Marks)', [M('eng_gram_1'), M('eng_gram_2'), M('eng_tense_1'), M('eng_tense_2'), M('eng_voice_1'), M('eng_voice_2'), M('eng_vocab_1'), M('eng_vocab_2'), M('eng_idiom_1'), M('eng_comp_1'), M('eng_err_1'), M('eng_err_2')])
            ]),
            make_sub('si_gs', 'सामान्य ज्ञान एवं सामान्य अध्ययन (GS & CG GK — Paper 2)', 200, 'Highest', 'Extremely High (200 Marks)', True, [
                ('छत्तीसगढ़ का इतिहास, भूगोल, संस्कृति एवं योजनाएं', [M('cg_hist_1'), M('cg_hist_2'), M('cg_hist_7'), M('cg_hist_9'), M('cg_hist_10'), M('cg_hist_11'), M('cg_hist_12'), M('cg_hist_13'), M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_7'), M('cg_geo_10'), M('cg_cul_1'), M('cg_cul_2'), M('cg_cul_5'), M('cg_eco_4'), M('cg_eco_6'), M('ca_cg_1')]),
                ('भारतीय इतिहास, संविधान एवं राजव्यवस्था', [M('ind_hist_1'), M('ind_hist_6'), M('ind_med_2'), M('ind_mod_3'), M('ind_mod_5'), M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_3'), M('ind_pol_5'), M('ind_pol_6'), M('ind_pol_7'), M('ind_pol_8')]),
                ('भारत का भूगोल, अर्थव्यवस्था एवं सामान्य विज्ञान', [M('ind_geo_1'), M('ind_geo_2'), M('ind_geo_3'), M('ind_eco_1'), M('ind_eco_2'), M('phy_1'), M('phy_4'), M('chem_1'), M('bio_1'), M('bio_9'), M('bio_10'), M('env_1')]),
                ('पुलिस प्रशासन, कानून एवं आंतरिक सुरक्षा', [
                    C('si_law_1', 'CG Police Structure & Hierarchy', 'छत्तीसगढ़ पुलिस संगठन, संरचना, रेंज एवं पद सोपान', ['पुलिस महानिदेशक (DGP) से आरक्षक तक पद सोपान', 'पुलिस रेंज, जिला पुलिस बल, सशस्त्र पुलिस बल (CAF)', 'थाना स्तर का प्रशासनिक ढांचा एवं रोजनामचा']),
                    C('si_law_2', 'Basic Criminal Laws (BNS, BNSS)', 'भारतीय न्याय संहिता (BNS) एवं नागरिक सुरक्षा संहिता मूल तत्व', ['अपराध की परिभाषा, संज्ञेय एवं असंज्ञेय अपराध', 'प्राथमिकी (FIR) दर्ज करने की कानूनी प्रक्रिया', 'गिरफ्तारी, तलाशी, जब्ती एवं जमानत संबंधी अधिकार', 'मानवाधिकार आयोग एवं पुलिस आचरण संहिता']),
                    C('si_law_3', 'Cyber Crime & Forensic Basics', 'साइबर अपराध, डिजिटल साक्ष्य एवं फोरेंसिक विज्ञान की मूल बातें', ['साइबर अपराध के प्रकार (फिशिंग, हैकिंग, वित्तीय धोखाधड़ी)', 'आईटी अधिनियम 2000 की मुख्य धाराएं', 'फोरेंसिक साक्ष्य संग्रह, फिंगरप्रिंट एवं डीएनए परीक्षण'])
                ]),
                ('समसामयिक घटनाएं एवं खेल', [M('ca_nat_1'), M('ca_nat_3'), M('ca_sports_1'), M('ca_award_1')])
            ]),
            make_sub('si_aptitude', 'एप्टीट्यूड टेस्ट / गणित एवं तार्किक क्षमता (Paper 3)', 200, 'Highest', 'Extremely High (200 Marks)', False, [
                ('संख्या पद्धति एवं व्यावसायिक अंकगणित', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5'), M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_ratio_1'), M('math_si_1'), M('math_si_2'), M('math_si_3'), M('math_tsd_1')]),
                ('बीजगणित, ज्यामिति एवं क्षेत्रमिति', [M('math_alg_1'), M('math_geo_1'), M('math_men_1'), M('math_men_2')]),
                ('तार्किक एवं विश्लेषणात्मक योग्यता', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1'), M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1'), M('reas_syl_1'), M('reas_ana_4'), M('reas_nv_1'), M('reas_nv_2'), M('reas_dm_1')])
            ])
        ]
    }

    # 3. CG POLICE CONSTABLE (CGPSC / POLICE HQ)
    exams['cg_constable'] = {
        'name': 'CG Police Constable',
        'fullName': 'Chhattisgarh Police Constable (GD / Driver / Tradesman) Exam',
        'icon': '🛡️',
        'category': 'police',
        'description': 'छत्तीसगढ़ पुलिस आरक्षक भर्ती परीक्षा — 100 अंक',
        'eligibility': '10th / 12th Pass',
        'pattern': {
            'totalMarks': 100,
            'time': '2 Hours',
            'type': 'Objective MCQ (100 Questions, 100 Marks)',
            'papers': [
                { 'paper': 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 'marks': 50 },
                { 'paper': 'सामान्य मानसिक योग्यता (रीजनिंग)', 'marks': 25 },
                { 'paper': 'अंकगणित (Arithmetic)', 'marks': 25 }
            ]
        },
        'subjects': [
            make_sub('cgc_gk', 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 50, 'Highest', 'Extremely High (50 Qs)', True, [
                ('छत्तीसगढ़ का इतिहास, भूगोल व संस्कृति', [M('cg_hist_1'), M('cg_hist_7'), M('cg_hist_11'), M('cg_hist_12'), M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_7'), M('cg_cul_1'), M('cg_cul_5'), M('cg_eco_4'), M('cg_eco_6')]),
                ('भारत का इतिहास, भूगोल एवं संविधान', [M('ind_hist_1'), M('ind_mod_5'), M('ind_geo_1'), M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_5')]),
                ('सामान्य विज्ञान एवं समसामयिकी', [M('phy_1'), M('chem_1'), M('bio_9'), M('bio_10'), M('ca_nat_1'), M('ca_cg_1'), M('ca_sports_1')])
            ]),
            make_sub('cgc_reasoning', 'सामान्य मानसिक योग्यता (रीजनिंग)', 25, 'High', 'High (25 Qs)', False, [
                ('तार्किक श्रेणी एवं सादृश्यता', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1')]),
                ('कोडिंग, रक्त संबंध व दिशा', [M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1')]),
                ('वेन आरेख एवं अशाब्दिक रीजनिंग', [M('reas_nv_1'), M('reas_nv_2'), M('reas_nv_5')])
            ]),
            make_sub('cgc_maths', 'अंकगणित (Arithmetic)', 25, 'High', 'High (25 Qs)', False, [
                ('संख्या पद्धति एवं सरलीकरण', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5')]),
                ('औसत, प्रतिशत एवं लाभ-हानि', [M('math_ratio_3'), M('math_ar_1'), M('math_ar_2')]),
                ('ब्याज, अनुपात एवं समय-दूरी', [M('math_si_1'), M('math_si_2'), M('math_ratio_1'), M('math_si_3'), M('math_tsd_1')]),
                ('क्षेत्रमिति', [M('math_men_1'), M('math_men_2')])
            ])
        ]
    }

    # 4. EXCISE CONSTABLE (आबकारी आरक्षक)
    exams['excise_constable'] = {
        'name': 'Excise Constable',
        'fullName': 'Chhattisgarh Excise Constable (आबकारी आरक्षक) Recruitment Exam',
        'icon': '🍷',
        'category': 'police',
        'description': 'छत्तीसगढ़ आबकारी आरक्षक सीधी भर्ती परीक्षा — 100 अंक',
        'eligibility': '12th Pass',
        'pattern': {
            'totalMarks': 100,
            'time': '2 Hours',
            'type': 'Objective MCQ (100 Questions, 100 Marks)',
            'papers': [
                { 'paper': 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 'marks': 50 },
                { 'paper': 'सामान्य मानसिक योग्यता (रीजनिंग)', 'marks': 25 },
                { 'paper': 'सामान्य गणित (Mathematics)', 'marks': 25 }
            ]
        },
        'subjects': [
            make_sub('excise_gk', 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 50, 'Highest', 'Extremely High (50 Qs)', True, [
                ('छत्तीसगढ़ का इतिहास, भूगोल व संस्कृति', [M('cg_hist_1'), M('cg_hist_7'), M('cg_hist_11'), M('cg_hist_12'), M('cg_geo_1'), M('cg_geo_3'), M('cg_cul_1'), M('cg_cul_5'), M('cg_eco_4'), M('cg_eco_6')]),
                ('भारत का इतिहास, भूगोल एवं संविधान', [M('ind_hist_1'), M('ind_mod_5'), M('ind_geo_1'), M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_5')]),
                ('सामान्य विज्ञान एवं समसामयिकी', [M('phy_1'), M('chem_1'), M('chem_5'), M('bio_1'), M('bio_10'), M('ca_nat_1'), M('ca_cg_1'), M('ca_sports_1')])
            ]),
            make_sub('excise_reasoning', 'सामान्य मानसिक योग्यता (रीजनिंग)', 25, 'High', 'High (25 Qs)', False, [
                ('श्रेणी, सादृश्यता एवं वर्गीकरण', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1')]),
                ('कोडिंग-डिकोडिंग, रक्त संबंध व दिशा', [M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1')]),
                ('अशाब्दिक तर्कशक्ति', [M('reas_nv_1'), M('reas_nv_2'), M('reas_nv_5')])
            ]),
            make_sub('excise_maths', 'सामान्य गणित (Mathematics)', 25, 'High', 'High (25 Qs)', False, [
                ('संख्या पद्धति एवं सरलीकरण', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5')]),
                ('औसत, प्रतिशत एवं लाभ-हानि', [M('math_ratio_3'), M('math_ar_1'), M('math_ar_2')]),
                ('ब्याज, अनुपात एवं समय-दूरी', [M('math_si_1'), M('math_si_2'), M('math_ratio_1'), M('math_si_3'), M('math_tsd_1')]),
                ('क्षेत्रमिति', [M('math_men_1'), M('math_men_2')])
            ])
        ]
    }

    # 5. MANDI NIRIKSHAK (मंडी निरीक्षक एवं उप-निरीक्षक)
    exams['mandi_nirikshak'] = {
        'name': 'Mandi Nirikshak',
        'fullName': 'CG Vyapam Mandi Nirikshak & Sub-Inspector Recruitment Exam',
        'icon': '🏬',
        'category': 'administrative',
        'description': 'कृषि उपज मंडी निरीक्षक एवं उप-निरीक्षक सीधी भर्ती परीक्षा — आधिकारिक 150 अंकों का विस्तृत पाठ्यक्रम',
        'eligibility': 'Graduate in Any Discipline',
        'pattern': {
            'totalMarks': 150,
            'time': '3 Hours',
            'type': 'Objective MCQ (150 Questions, 150 Marks)',
            'papers': [
                { 'paper': 'कृषि उपज मंडी अधिनियम एवं मंडी प्रशासन', 'marks': 30 },
                { 'paper': 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)', 'marks': 25 },
                { 'paper': 'सामान्य ज्ञान (India GK)', 'marks': 30 },
                { 'paper': 'गणित (Mathematics)', 'marks': 25 },
                { 'paper': 'सामान्य मानसिक योग्यता (Reasoning)', 'marks': 15 },
                { 'paper': 'सामान्य हिंदी भाषा', 'marks': 10 },
                { 'paper': 'General English', 'marks': 5 },
                { 'paper': 'कंप्यूटर ज्ञान', 'marks': 10 }
            ]
        },
        'subjects': [
            make_sub('mandi_act_sub', 'कृषि उपज मंडी अधिनियम एवं मंडी प्रशासन', 30, 'Highest', 'Extremely High (30 Qs)', True, [
                ('मंडी अधिनियम संरचना एवं समितियां', [
                    C('mandi_act_1', 'CG Krishi Upaj Mandi Act 1972', 'छत्तीसगढ़ कृषि उपज मंडी अधिनियम 1972 की मुख्य धाराएं एवं परिभाषाएं', ['अधिनियम का इतिहास, विस्तार एवं महत्वपूर्ण परिभाषाएं', 'मंडी क्षेत्र, मुख्य बाजार एवं उप-बाजार की घोषणा', 'मंडी समिति का गठन, संरचना, चुनाव एवं विघटन', 'मंडी समिति की शक्तियां, कर्तव्य एवं कार्यप्रणाली']),
                    C('mandi_act_2', 'Mandi Fees, Licensing & Penalties', 'मंडी शुल्क (Mandi Fees), व्यापारी लाइसेंसिंग एवं दंड प्रावधान', ['मंडी शुल्क एवं उपकर (Cess) संग्रहण प्रक्रिया', 'व्यापारी, आढ़तिया एवं दलाल लाइसेंसिंग नियम', 'मंडी नियमों के उल्लंघन पर जब्ती, जांच एवं दंड']),
                    C('mandi_act_3', 'e-NAM, MSP & Agri-Marketing', 'राष्ट्रीय कृषि बाजार (e-NAM), डिजिटल ट्रेडिंग एवं न्यूनतम समर्थन मूल्य (MSP)', ['e-NAM पोर्टल का संचालन एवं इलेक्ट्रॉनिक ऑक्शन (ई-नीलामी)', 'न्यूनतम समर्थन मूल्य (MSP) निर्धारण एवं समर्थन मूल्य पर धान उपार्जन', 'कृषि विपणन सुधार, वेयरहाउसिंग एवं इलेक्ट्रॉनिक नेगोशिएबल वेयरहाउस रसीद (e-NWR)'])
                ])
            ]),
            make_sub('mandi_cg_gk', 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)', 25, 'Highest', 'High (25 Qs)', True, [
                ('छत्तीसगढ़ इतिहास, भूगोल, नदियां एवं कृषि', [M('cg_hist_1'), M('cg_hist_7'), M('cg_hist_11'), M('cg_hist_12'), M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_7'), M('cg_eco_1'), M('cg_eco_2'), M('cg_eco_6'), M('ca_cg_1')]),
                ('छत्तीसगढ़ जनजातियां, कला एवं संस्कृति', [M('cg_cul_1'), M('cg_cul_2'), M('cg_cul_3'), M('cg_cul_5'), M('cg_eco_4'), M('cg_eco_5')])
            ]),
            make_sub('mandi_india_gk', 'सामान्य ज्ञान (India GK)', 30, 'High', 'High (30 Qs)', False, [
                ('भारतीय इतिहास, संविधान एवं राजव्यवस्था', [M('ind_hist_1'), M('ind_hist_6'), M('ind_mod_3'), M('ind_mod_5'), M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_5'), M('ind_pol_6'), M('ind_pol_7')]),
                ('भारत का भूगोल, अर्थव्यवस्था एवं सामान्य विज्ञान', [M('ind_geo_1'), M('ind_geo_2'), M('ind_geo_3'), M('ind_eco_1'), M('ind_eco_2'), M('phy_1'), M('chem_1'), M('bio_1'), M('bio_9'), M('bio_10'), M('ca_nat_1')])
            ]),
            make_sub('mandi_maths', 'गणित (Mathematics)', 25, 'Highest', 'High (25 Qs)', False, [
                ('संख्या पद्धति एवं व्यावसायिक गणित', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5'), M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_ratio_1'), M('math_si_1'), M('math_si_2'), M('math_si_3'), M('math_tsd_1')]),
                ('क्षेत्रमिति एवं बीजगणित', [M('math_alg_1'), M('math_men_1'), M('math_men_2')])
            ]),
            make_sub('mandi_reasoning', 'सामान्य मानसिक योग्यता (Reasoning)', 15, 'High', 'High (15 Qs)', False, [
                ('तार्किक एवं मानसिक योग्यता', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1'), M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1'), M('reas_syl_1'), M('reas_nv_1')])
            ]),
            make_sub('mandi_hindi', 'सामान्य हिंदी भाषा', 10, 'Medium', 'Medium (10 Qs)', False, [
                ('हिंदी व्याकरण एवं शब्द भंडार', [M('hin_varn_1'), M('hin_sandhi_1'), M('hin_samas_1'), M('hin_shabd_1'), M('hin_vocab_1'), M('hin_vocab_2'), M('hin_idiom_1'), M('hin_sent_1')])
            ]),
            make_sub('mandi_english', 'General English', 5, 'Low', 'Low (5 Qs)', False, [
                ('English Grammar & Vocabulary', [M('eng_gram_1'), M('eng_gram_2'), M('eng_tense_1'), M('eng_vocab_1'), M('eng_comp_1')])
            ]),
            make_sub('mandi_comp', 'कंप्यूटर ज्ञान', 10, 'Medium', 'Medium (10 Qs)', False, [
                ('कंप्यूटर मूल बातें एवं एमएस ऑफिस', [M('comp_basic_1'), M('comp_hw_1'), M('comp_sw_1'), M('comp_office_1'), M('comp_office_2'), M('comp_net_1')])
            ])
        ]
    }

    # 6. CG TET (छत्तीसगढ़ शिक्षक पात्रता परीक्षा - Paper I & II)
    exams['cg_tet'] = {
        'name': 'CG TET',
        'fullName': 'Chhattisgarh Teacher Eligibility Test (Primary & Upper Primary)',
        'icon': '🎓',
        'category': 'education',
        'description': 'छत्तीसगढ़ शिक्षक पात्रता परीक्षा (CG TET) — आधिकारिक 150 अंकों का विस्तृत पाठ्यक्रम',
        'eligibility': 'D.El.Ed / B.Ed Pursuing or Passed',
        'pattern': {
            'totalMarks': 150,
            'time': '2.5 Hours',
            'type': 'Objective MCQ (150 Questions, 150 Marks, No Negative Marking)',
            'papers': [
                { 'paper': 'बाल विकास एवं शिक्षाशास्त्र (CDP)', 'marks': 30 },
                { 'paper': 'भाषा 1: हिंदी एवं भाषा शिक्षण शास्त्र', 'marks': 30 },
                { 'paper': 'भाषा 2: English Language & Pedagogy', 'marks': 30 },
                { 'paper': 'गणित एवं गणित शिक्षण शास्त्र', 'marks': 30 },
                { 'paper': 'पर्यावरण अध्ययन (EVS) / सामाजिक अध्ययन / विज्ञान', 'marks': 30 }
            ]
        },
        'subjects': [
            make_sub('tet_cdp', 'बाल विकास एवं शिक्षाशास्त्र (CDP)', 30, 'Highest', 'Extremely High (30 Qs)', False, [
                ('बाल विकास के सिद्धांत एवं रचनावादी विचारक', [
                    C('tet_cdp_1', 'Child Development & Heredity', 'बाल विकास की अवधारणा, विकास के चरण, वंशानुक्रम एवं वातावरण', ['वृद्धि एवं विकास के सामान्य सिद्धांत', 'शैशवावस्था, बाल्यावस्था एवं किशोरावस्था की विशेषताएं', 'वंशानुक्रम एवं सामाजिक वातावरण की भूमिका']),
                    C('tet_cdp_2', 'Piaget, Kohlberg, Vygotsky Theories', 'पियाजे, कोहलबर्ग एवं वाइगोत्स्की के सिद्धांत', ['जीन पियाजे की चार संज्ञानात्मक अवस्थाएं', 'लॉरेंस कोहलबर्ग का नैतिक विकास सिद्धांत', 'लेव वाइगोत्स्की का सामाजिक सांस्कृतिक सिद्धांत, पाड़ (Scaffolding) एवं ZPD']),
                    C('tet_cdp_3', 'Inclusive Education & CWSN', 'समावेशी शिक्षा की अवधारणा एवं विशेष आवश्यकता वाले बच्चे (CWSN)', ['विशेष आवश्यकता वाले बच्चों की पहचान एवं शिक्षा', 'अधिगम अक्षमताएं (Dyslexia, Dysgraphia, Dyscalculia)', 'सृजनात्मक एवं पिछड़े बालकों का मार्गदर्शन']),
                    C('tet_cdp_4', 'Learning Theories, Motivation & CCE', 'अधिगम के सिद्धांत, प्रेरणा एवं सतत समग्र मूल्यांकन (CCE)', ['थार्नडाइक का प्रयास एवं त्रुटि सिद्धांत, पावलव व स्किनर के प्रयोग', 'अधिगम में अभिप्रेरणा की भूमिका (Intrinsic & Extrinsic Motivation)', 'सतत एवं व्यापक मूल्यांकन (CCE), रचनात्मक एवं योगात्मक आकलन', 'उपचारात्मक एवं निदानात्मक शिक्षण']),
                    C('tet_cdp_5', 'NEP 2020 & RTE Act 2009', 'राष्ट्रीय शिक्षा नीति 2020 एवं बाल अधिकार अधिनियम (RTE 2009)', ['निःशुल्क एवं अनिवार्य बाल शिक्षा अधिकार अधिनियम 2009 की धाराएं', 'NEP 2020 मूलभूत साक्षरता एवं संख्यात्मकता (FLN)', 'स्कूली शिक्षा का नया ढांचा 5+3+3+4'])
                ])
            ]),
            make_sub('tet_hindi', 'भाषा 1: हिंदी एवं भाषा शिक्षण शास्त्र', 30, 'Highest', 'Extremely High (30 Qs)', False, [
                ('अपठित गद्यांश एवं पद्यांश बोध', [M('hin_comp_1')]),
                ('हिंदी व्याकरण एवं शब्द विचार', [M('hin_varn_1'), M('hin_varn_2'), M('hin_sandhi_1'), M('hin_sandhi_2'), M('hin_samas_1'), M('hin_samas_2'), M('hin_shabd_1'), M('hin_gram_1'), M('hin_gram_2'), M('hin_gram_3'), M('hin_vocab_1'), M('hin_vocab_2'), M('hin_idiom_1'), M('hin_sent_1')]),
                ('हिंदी भाषा शिक्षण शास्त्र (Pedagogy)', [
                    C('tet_hin_ped', 'Hindi Language Pedagogy', 'हिंदी भाषा शिक्षण शास्त्र एवं भाषाई कौशल', ['भाषा अर्जन एवं भाषा अधिगम की संकल्पना', 'भाषा शिक्षण के चार बुनियादी कौशल (सुनना, बोलना, पढ़ना, लिखना - LSRW)', 'भाषा शिक्षण की प्रमुख विधियां एवं चुनौतियां', 'शिक्षण अधिगम सामग्री (TLM) एवं उपचारात्मक शिक्षण'])
                ])
            ]),
            make_sub('tet_english', 'भाषा 2: English Language & Pedagogy', 30, 'Highest', 'Extremely High (30 Qs)', False, [
                ('Reading Comprehension Passages', [M('eng_comp_1')]),
                ('English Grammar & Vocabulary', [M('eng_gram_1'), M('eng_gram_2'), M('eng_tense_1'), M('eng_tense_2'), M('eng_voice_1'), M('eng_vocab_1'), M('eng_vocab_2'), M('eng_idiom_1')]),
                ('English Language Pedagogy', [
                    C('tet_eng_ped', 'English Language Pedagogy', 'English Language Teaching & Pedagogy', ['Principles of Language Teaching in English', 'Acquisition and Learning Differences', 'Challenges of Teaching English in Multilingual Context', 'Remedial Teaching and Continuous Evaluation in English'])
                ])
            ]),
            make_sub('tet_maths', 'गणित एवं गणित शिक्षण शास्त्र', 30, 'Highest', 'Extremely High (30 Qs)', False, [
                ('संख्या पद्धति, संक्रियाएँ एवं भिन्न', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5')]),
                ('व्यावसायिक अंकगणित एवं मापन', [M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_ratio_1'), M('math_si_1'), M('math_si_3')]),
                ('ज्यामिति एवं क्षेत्रमिति', [M('math_geo_1'), M('math_geo_2'), M('math_men_1'), M('math_men_2')]),
                ('गणित शिक्षण शास्त्र (Mathematics Pedagogy)', [
                    C('tet_math_ped', 'Mathematics Pedagogy', 'गणित शिक्षण शास्त्र, गणितीय सोच एवं त्रुटि विश्लेषण', ['गणित की प्रकृति, संरचना एवं तार्किक चिंतन', 'पाठ्यचर्या में गणित का स्थान एवं उद्देश्य', 'गणित शिक्षण की विधियां (आगमन, निगमन, विश्लेषण, संश्लेषण)', 'त्रुटि विश्लेषण एवं अधिगम कठिनाइयों का निदान'])
                ])
            ]),
            make_sub('tet_evs', 'पर्यावरण अध्ययन एवं शिक्षण शास्त्र (EVS)', 30, 'Highest', 'Extremely High (30 Qs)', True, [
                ('परिवार, आवास, भोजन, पोषण एवं स्वास्थ्य', [
                    C('tet_evs_1', 'Family, Food, Nutrition & Health', 'परिवार, समाज, आवास, भोजन, पोषण एवं स्वच्छता', ['परिवार के प्रकार (एकल एवं संयुक्त), सामाजिक बुराइयां', 'आवास के प्रकार एवं स्वच्छता', 'भोजन के प्रमुख पोषक तत्व, संतुलित आहार', 'संक्रामक एवं कुपोषण जनित रोग']),
                    C('tet_evs_2', 'Water, Air, Ecosystem & Pollution', 'जल, वायु, ऋतु चक्र, पारिस्थितिकी तंत्र एवं प्रदूषण', ['जल के स्रोत, जल संरक्षण एवं प्रदूषण', 'वायुमंडल की संरचना एवं वायु प्रदूषण', 'पारिस्थितिकी तंत्र (Ecosystem) के घटक एवं खाद्य श्रृंखला', 'अपशिष्ट प्रबंधन एवं 3R (Reduce, Reuse, Recycle)']),
                    C('tet_evs_3', 'Chhattisgarh Environment & Wildlife', 'छत्तीसगढ़ का प्राकृतिक परिवेश, वन एवं जैव विविधता', ['छत्तीसगढ़ की प्रमुख नदियां, जलप्रपात एवं पर्वत', 'छत्तीसगढ़ की वन संपदा एवं औषधीय पौधे', 'छत्तीसगढ़ के राष्ट्रीय उद्यान एवं अभयारण्य', 'पारंपरिक जल संरक्षण विधियां'])
                ]),
                ('पर्यावरण अध्ययन शिक्षण शास्त्र (EVS Pedagogy)', [
                    C('tet_evs_ped', 'EVS Pedagogy & Practical', 'पर्यावरण अध्ययन की संकल्पना, दृष्टिकोण एवं शिक्षण विधियां', ['पर्यावरण अध्ययन का महत्व, एकीकृत पर्यावरण अध्ययन', 'विज्ञान एवं सामाजिक विज्ञान से पर्यावरण का संबंध', 'क्रियाकलाप, प्रयोग, प्रायोजना कार्य एवं क्षेत्र भ्रमण', 'पर्यावरण शिक्षण में सहायक सामग्री एवं मूल्यांकन'])
                ])
            ])
        ]
    }

    # 7. TRANSPORT CONSTABLE (परिवहन आरक्षक)
    exams['transport_constable'] = {
        'name': 'Transport Constable',
        'fullName': 'CG Transport Department Constable (परिवहन आरक्षक) Recruitment Exam',
        'icon': '🚌',
        'category': 'police',
        'description': 'छत्तीसगढ़ परिवहन आरक्षक भर्ती परीक्षा — 100 अंक',
        'eligibility': '10th / 12th Pass + Valid Driving License',
        'pattern': {
            'totalMarks': 100,
            'time': '2 Hours',
            'type': 'Objective MCQ (100 Questions, 100 Marks)',
            'papers': [
                { 'paper': 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 'marks': 40 },
                { 'paper': 'तार्किक क्षमता एवं मानसिक योग्यता (Reasoning)', 'marks': 20 },
                { 'paper': 'सामान्य अंकगणित (Mathematics)', 'marks': 20 },
                { 'paper': 'मोटर वाहन अधिनियम एवं सड़क सुरक्षा नियम', 'marks': 20 }
            ]
        },
        'subjects': [
            make_sub('trans_gk', 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 40, 'Highest', 'Very High (40 Qs)', True, [
                ('छत्तीसगढ़ का इतिहास, भूगोल व संस्कृति', [M('cg_hist_1'), M('cg_hist_7'), M('cg_hist_11'), M('cg_geo_1'), M('cg_geo_3'), M('cg_cul_1'), M('cg_eco_4'), M('cg_eco_6')]),
                ('भारत सामान्य ज्ञान व संविधान', [M('ind_hist_1'), M('ind_mod_5'), M('ind_geo_1'), M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_5')]),
                ('समसामयिक घटनाएं एवं खेल', [M('ca_nat_1'), M('ca_cg_1'), M('ca_sports_1')])
            ]),
            make_sub('trans_reasoning', 'तार्किक क्षमता एवं मानसिक योग्यता (Reasoning)', 20, 'High', 'High (20 Qs)', False, [
                ('श्रेणी, सादृश्यता एवं कोडिंग', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1'), M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1'), M('reas_nv_1')])
            ]),
            make_sub('trans_maths', 'सामान्य अंकगणित (Mathematics)', 20, 'High', 'High (20 Qs)', False, [
                ('संख्या पद्धति एवं व्यावसायिक गणित', [M('math_ns_1'), M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_ratio_1'), M('math_si_1'), M('math_tsd_1'), M('math_men_1')])
            ]),
            make_sub('trans_mva', 'मोटर वाहन अधिनियम एवं सड़क सुरक्षा नियम', 20, 'Highest', 'Very High (20 Qs)', True, [
                ('मोटर वाहन अधिनियम एवं सड़क सुरक्षा', [
                    C('trans_act_1', 'Motor Vehicles Act 1988 & 2019 Amendments', 'मोटर वाहन अधिनियम 1988 एवं संशोधन अधिनियम 2019 के मुख्य प्रावधान', ['अधिनियम के उद्देश्य एवं प्रमुख परिभाषाएं', 'ड्राइविंग लाइसेंस श्रेणियां (LMV, HMV) एवं नवीनीकरण', 'वाहन पंजीकरण, फिटनेस प्रमाण पत्र एवं प्रदूषण नियंत्रण (PUC)', 'ओवरलोडिंग, शराब पीकर गाड़ी चलाना एवं नए दंड प्रावधान']),
                    C('trans_act_2', 'Traffic Signs, Road Safety & First Aid', 'यातायात संकेत, सड़क सुरक्षा नियम एवं दुर्घटना आपातकालीन सहायता', ['अनिवार्य, चेतावनी एवं सूचनात्मक यातायात संकेत (Traffic Signs)', 'लेन अनुशासन, ओवरटेकिंग नियम एवं गति सीमाएं', 'सड़क दुर्घटना में गुड सेमेरिटन (Good Samaritan) गाइडलाइंस', 'ई-चालान प्रणाली एवं वाहन ट्रैकिंग सिस्टम'])
                ])
            ])
        ]
    }

    # 8. ADEO (Assistant Development Extension Officer - सहायक विकास विस्तार अधिकारी)
    exams['adeo'] = {
        'name': 'ADEO',
        'fullName': 'CG Vyapam Assistant Development Extension Officer (सहायक विकास विस्तार अधिकारी)',
        'icon': '🌾',
        'category': 'administrative',
        'description': 'पंचायत एवं ग्रामीण विकास विभाग — सहायक विकास विस्तार अधिकारी भर्ती परीक्षा — आधिकारिक 150 अंकों का विस्तृत पाठ्यक्रम',
        'eligibility': 'Graduate in Any Discipline',
        'pattern': {
            'totalMarks': 150,
            'time': '3 Hours',
            'type': 'Objective MCQ (150 Questions, 150 Marks)',
            'papers': [
                { 'paper': 'सामान्य ज्ञान (General Knowledge)', 'marks': 30 },
                { 'paper': 'आजीविका संबंधित योजनाओं की जानकारी (Livelihood)', 'marks': 30 },
                { 'paper': 'पंचायती राज की जानकारी (Panchayati Raj)', 'marks': 30 },
                { 'paper': 'ग्रामीण विकास की प्रमुख योजनाएं (Rural Development)', 'marks': 30 },
                { 'paper': 'सामान्य हिंदी (General Hindi)', 'marks': 30 }
            ]
        },
        'subjects': [
            make_sub('adeo_gk', 'सामान्य ज्ञान (General Knowledge)', 30, 'Highest', 'Extremely High (30 Qs)', True, [
                ('छत्तीसगढ़ सामान्य ज्ञान', [M('cg_hist_1'), M('cg_hist_7'), M('cg_hist_10'), M('cg_hist_11'), M('cg_hist_12'), M('cg_hist_13'), M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_7'), M('cg_cul_1'), M('cg_cul_2'), M('cg_cul_5'), M('cg_eco_1'), M('cg_eco_4'), M('cg_eco_6'), M('ca_cg_1')]),
                ('भारतीय संविधान, राजव्यवस्था एवं समसामयिकी', [M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_3'), M('ind_pol_5'), M('ind_pol_6'), M('ind_pol_7'), M('ind_geo_1'), M('ca_nat_1'), M('ca_nat_3'), M('ca_sports_1')])
            ]),
            make_sub('adeo_livelihood', 'आजीविका संबंधित योजनाओं की जानकारी (Livelihood)', 30, 'Highest', 'Extremely High (30 Qs)', True, [
                ('राष्ट्रीय ग्रामीण आजीविका मिशन (DAY-NRLM)', [
                    C('adeo_liv_1', 'DAY-NRLM Overview & Structure', 'राष्ट्रीय ग्रामीण आजीविका मिशन (DAY-NRLM) - उद्देश्य, घटक एवं संगठन संरचना', ['मिशन की पृष्ठभूमि (SGSY से NRLM पुनर्गठन)', 'DAY-NRLM के प्रमुख उद्देश्य एवं बुनियादी सिद्धांत', 'राज्य (SRLM), जिला (DMMU) एवं विकासखंड (BMMU) प्रबंधन संरचना', 'समावेशी विकास एवं निर्धनतम परिवारों की पहचान (PIP)']),
                    C('adeo_liv_2', 'Self Help Groups (SHG) & Panchasutra', 'स्व-सहायता समूह (SHG) गठन, पंचसूत्र एवं आंतरिक ऋण', ['स्व-सहायता समूह की संकल्पना एवं गठन के नियम', 'पंचसूत्र के पांच नियम (नियमित बैठक, बचत, आंतरिक ऋण, पुनर्भुगतान, लेखांकन)', 'समूह के खाता संचालन, नियम एवं प्रस्ताव रजिस्टर', 'ग्राम संगठन (VO) एवं संकुल स्तरीय संघ (CLF) की भूमिका'])
                ]),
                ('आजीविका संवर्धन घटक, कृषि एवं सूक्ष्म वित्त', [
                    C('adeo_liv_3', 'Livelihood Promotion (Agri & Allied)', 'कृषि एवं संबद्ध गतिविधियां - पशुपालन, मत्स्य एवं गैर-कृषि आजीविका', ['सतत कृषि प्रथाएं, महिला किसान सशक्तिकरण परियोजना (MKSP)', 'पशु सखी, पशुपालन, बकरी पालन एवं कुक्कुट पालन संवर्धन', 'गैर-कृषि सूक्ष्म उद्यम एवं कारीगर आजीविका क्लस्टर']),
                    C('adeo_liv_4', 'Microfinance, Funds & Bank Linkage', 'सूक्ष्म वित्त, चक्रीय निधि (RF), सामुदायिक निवेश कोष (CIF) एवं बैंक लिंकेज', ['चक्रीय निधि (Revolving Fund - RF) पात्रता एवं नियम', 'सामुदायिक निवेश कोष (Community Investment Fund - CIF) प्रबंधन', 'बैंक ऋण लिंकेज (Bank Credit Linkage) एवं ब्याज अनुदान योजना', 'सामुदायिक संसाधन व्यक्ति (CRP), बैंक सखी एवं आजीविका मित्र की भूमिका'])
                ])
            ]),
            make_sub('adeo_panchayat', 'पंचायती राज की जानकारी (Panchayati Raj System)', 30, 'Highest', 'Extremely High (30 Qs)', True, [
                ('संवैधानिक प्रावधान एवं छत्तीसगढ़ पंचायती राज अधिनियम 1993', [
                    C('adeo_panch_1', '73rd Constitutional Amendment & Schedule 11', '73वां संविधान संशोधन अधिनियम एवं 11वीं अनुसूची के 29 विषय', ['73वें संविधान संशोधन की ऐतिहासिक पृष्ठभूमि एवं प्रमुख अनुच्छेद (243 से 243O)', '11वीं अनुसूची में पंचायतों को सौंपे गए 29 विषय', 'राज्य वित्त आयोग (Article 243I) एवं राज्य निर्वाचन आयोग (Article 243K)']),
                    C('adeo_panch_2', 'CG Panchayati Raj Act 1993 Core Sections', 'छत्तीसगढ़ पंचायती राज अधिनियम 1993 की मुख्य धाराएं एवं अध्याय', ['अधिनियम का लागू होना एवं महत्वपूर्ण परिभाषाएं', 'त्रिस्तरीय पंचायत प्रणाली (ग्राम, जनपद एवं जिला पंचायत) का गठन', 'सीटों का आरक्षण (महिला, अनुसूचित जाति, जनजाति, अन्य पिछड़ा वर्ग)', 'पंचायतों का कार्यकाल, विघटन एवं अविश्वास प्रस्ताव संबंधी नियम'])
                ]),
                ('पंचायत संरचना, ग्राम सभा एवं शक्तियां', [
                    C('adeo_panch_3', 'Gram Sabha Structure, Quorum & PESA Rules', 'ग्राम सभा - संरचना, बैठकें, गणपूर्ति (Quorum) एवं पेसा (PESA) नियम', ['ग्राम सभा की सदस्यता एवं वार्षिक अनिवार्य बैठकें', 'ग्राम सभा की गणपूर्ति (Quorum) एवं महिला उपस्थिति अनिवार्यता', 'ग्राम सभा के कार्य, अधिकार एवं निगरानी शक्तियां', 'पेसा अधिनियम 1996 (PESA) एवं छत्तीसगढ़ पेसा नियम 2022 के तहत ग्राम सभा के विशेष अधिकार']),
                    C('adeo_panch_4', 'Standing Committees & Panchayat Finances', 'पंचायतों की स्थायी समितियां, वित्तीय स्रोत एवं करारोपण', ['ग्राम पंचायत, जनपद एवं जिला पंचायत की स्थायी समितियां (सामान्य प्रशासन, निर्माण, शिक्षा, स्वास्थ्य)', 'सरपंच, उपसरपंच, सचिव एवं मुख्य कार्यपालन अधिकारी (CEO) के अधिकार व दायित्व', 'पंचायतों के करारोपण अधिकार एवं आंतरिक आय के स्रोत', 'केंद्रीय एवं राज्य वित्त आयोग अनुदान'])
                ])
            ]),
            make_sub('adeo_rural_dev', 'ग्रामीण विकास की प्रमुख योजनाएं (Rural Development Schemes)', 30, 'Highest', 'Extremely High (30 Qs)', True, [
                ('मनरेगा (MGNREGA) विस्तृत अध्ययन', [
                    C('adeo_rd_1', 'MGNREGA Scheme Objectives & Provisions', 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (MGNREGA) के प्रावधान', ['अधिनियम के मूल उद्देश्य एवं 100 दिवस गारंटीशुदा अकुशल रोजगार', 'जॉब कार्ड पंजीकरण एवं 15 दिवस में रोजगार अधिकार', 'बेरोजगारी भत्ता नियम एवं समय पर मजदूरी भुगतान (15 दिवस) प्रावधान', 'सामग्री एवं मजदूरी अनुपात (60:40) एवं स्वीकार्य कार्य सूची']),
                    C('adeo_rd_2', 'MGNREGA Planning & Social Audit', 'मनरेगा कार्य योजना, ग्राम सभा स्वीकृति एवं सामाजिक अंकेक्षण (Social Audit)', ['वार्षिक कार्य योजना (Labour Budget) तैयार करने में ग्राम सभा की भूमिका', 'सामाजिक अंकेक्षण (Social Audit) की प्रक्रिया एवं सामाजिक अंकेक्षक के कर्तव्य', 'मनरेगा लोकपाल (Ombudsman) एवं शिकायत निवारण प्रणाली'])
                ]),
                ('प्रमुख ग्रामीण आवास, सड़क एवं स्वच्छता योजनाएं', [
                    C('adeo_rd_3', 'PMAY-G, PMGSY & SBM-G Schemes', 'प्रधानमंत्री आवास योजना-ग्रामीण, ग्राम सड़क योजना एवं स्वच्छ भारत मिशन', ['प्रधानमंत्री आवास योजना-ग्रामीण (PMAY-G) - SECC 2011/आवास प्लस, चयन व वित्तीय सहायता', 'प्रधानमंत्री ग्राम सड़क योजना (PMGSY) - बारहमासी सड़क संपर्क मानक', 'स्वच्छ भारत मिशन-ग्रामीण (SBM-G) - ओडीएफ प्लस, ठोस एवं तरल अपशिष्ट प्रबंधन (SLWM)', 'जल जीवन मिशन (हर घर जल) एवं ग्रामीण पेयजल प्रबंधन']),
                    C('adeo_rd_4', 'SAGY & Rurban Mission', 'सांसद आदर्श ग्राम योजना एवं श्यामा प्रसाद मुखर्जी रूर्बन मिशन (SPMRM)', ['सांसद आदर्श ग्राम योजना (SAGY) के उद्देश्य एवं ग्राम विकास योजना', 'श्यामा प्रसाद मुखर्जी रूर्बन मिशन (SPMRM) के तहत ग्रामीण क्लस्टर विकास'])
                ])
            ]),
            make_sub('adeo_hindi', 'सामान्य हिंदी (General Hindi)', 30, 'Highest', 'Extremely High (30 Qs)', False, [
                ('वर्णमाला, वर्तनी एवं संधि-समास', [M('hin_varn_1'), M('hin_varn_2'), M('hin_varn_3'), M('hin_sandhi_1'), M('hin_sandhi_2'), M('hin_samas_1'), M('hin_samas_2')]),
                ('शब्द विचार, रचना एवं व्याकरण', [M('hin_up_1'), M('hin_up_2'), M('hin_shabd_1'), M('hin_shabd_2'), M('hin_gram_1'), M('hin_gram_2'), M('hin_gram_3'), M('hin_gram_4')]),
                ('शब्द भंडार, मुहावरे एवं वाक्य शुद्धि', [M('hin_vocab_1'), M('hin_vocab_2'), M('hin_vocab_3'), M('hin_vocab_4'), M('hin_idiom_1'), M('hin_idiom_2'), M('hin_sent_1'), M('hin_sent_2'), M('hin_comp_1')])
            ])
        ]
    }

    print('CGPSC Exams loaded successfully.')
    return exams
