# -*- coding: utf-8 -*-
from build_complete_syllabi import M, C, make_sub

def get_vyapam_exams():
    exams = {}

    # 1. PATWARI / REVENUE INSPECTOR
    exams['cgv_patwari'] = {
        'name': 'Patwari / RI',
        'fullName': 'CGVYAPAM — Patwari & Revenue Inspector Exam',
        'icon': '🏘️',
        'category': 'administrative',
        'description': 'राजस्व निरीक्षक (RI) एवं पटवारी भर्ती परीक्षा — आधिकारिक 150 अंकों का विस्तृत पाठ्यक्रम',
        'eligibility': '12th Pass + DCA / PGDCA / Computer Diploma',
        'pattern': {
            'totalMarks': 150,
            'time': '3 Hours',
            'type': 'Objective MCQ (150 Questions, Negative Marking 1/4th)',
            'papers': [
                { 'paper': 'कंप्यूटर संबंधी सामान्य ज्ञान', 'marks': 20 },
                { 'paper': 'सामान्य हिंदी', 'marks': 10 },
                { 'paper': 'General English', 'marks': 10 },
                { 'paper': 'गणित (Mathematics)', 'marks': 30 },
                { 'paper': 'सामान्य मानसिक योग्यता (Reasoning)', 'marks': 15 },
                { 'paper': 'सामान्य ज्ञान (India GK)', 'marks': 35 },
                { 'paper': 'समसामयिक घटनाएं, खेलकूद एवं देश-विदेश', 'marks': 15 },
                { 'paper': 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)', 'marks': 15 }
            ]
        },
        'subjects': [
            make_sub('pat_comp', 'कंप्यूटर संबंधी सामान्य ज्ञान', 20, 'Highest', 'Very High (20 Qs)', False, [
                ('कंप्यूटर की मूल अवधारणाएँ', [M('comp_basic_1'), M('comp_basic_2'), M('comp_basic_3'), M('comp_basic_4')]),
                ('हार्डवेयर एवं मेमोरी', [M('comp_hw_1'), M('comp_hw_2'), M('comp_hw_3'), M('comp_hw_4')]),
                ('सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम', [M('comp_sw_1'), M('comp_sw_2'), M('comp_sw_3')]),
                ('MS Office टूल्स', [M('comp_office_1'), M('comp_office_2'), M('comp_office_3')]),
                ('इंटरनेट, ईमेल एवं नेटवर्किंग', [M('comp_net_1'), M('comp_net_4')]),
                ('साइबर सुरक्षा एवं एंटीवायरस', [M('comp_cyber_1'), M('comp_cyber_2'), M('comp_cyber_3')])
            ]),
            make_sub('pat_hindi', 'सामान्य हिंदी भाषा', 10, 'High', 'High (10 Qs)', False, [
                ('वर्णमाला एवं वर्तनी', [M('hin_varn_1'), M('hin_varn_2'), M('hin_varn_3')]),
                ('संधि एवं समास', [M('hin_sandhi_1'), M('hin_sandhi_2'), M('hin_samas_1'), M('hin_samas_2')]),
                ('शब्द विचार एवं व्याकरण', [M('hin_shabd_1'), M('hin_gram_1'), M('hin_gram_2'), M('hin_gram_3'), M('hin_gram_4')]),
                ('शब्द भंडार एवं मुहावरे', [M('hin_vocab_1'), M('hin_vocab_2'), M('hin_vocab_3'), M('hin_idiom_1'), M('hin_idiom_2'), M('hin_sent_1')])
            ]),
            make_sub('pat_english', 'General English', 10, 'High', 'High (10 Qs)', False, [
                ('English Grammar', [M('eng_gram_1'), M('eng_gram_2'), M('eng_tense_1'), M('eng_tense_2'), M('eng_voice_1')]),
                ('Vocabulary & Usage', [M('eng_vocab_1'), M('eng_vocab_2'), M('eng_idiom_1'), M('eng_comp_1')])
            ]),
            make_sub('pat_maths', 'गणित (Mathematics)', 30, 'Highest', 'Extremely High (30 Qs)', False, [
                ('संख्या पद्धति एवं सरलीकरण', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5')]),
                ('व्यावसायिक अंकगणित', [M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_ratio_1'), M('math_si_1'), M('math_si_2'), M('math_si_3'), M('math_tsd_1')]),
                ('बीजगणित', [M('math_alg_1'), M('math_alg_2')]),
                ('रेखागणित एवं क्षेत्रमिति', [M('math_geo_1'), M('math_geo_2'), M('math_men_1'), M('math_men_2')])
            ]),
            make_sub('pat_reasoning', 'सामान्य मानसिक योग्यता (Reasoning)', 15, 'High', 'High (15 Qs)', False, [
                ('शाब्दिक तर्कशक्ति', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1'), M('reas_ana_2'), M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1')]),
                ('अशाब्दिक एवं विश्लेषणात्मक योग्यता', [M('reas_syl_1'), M('reas_ana_4'), M('reas_nv_1'), M('reas_nv_2'), M('reas_dm_1')])
            ]),
            make_sub('pat_gk_india', 'सामान्य ज्ञान (India GK)', 35, 'Highest', 'Extremely High (35 Qs)', False, [
                ('भारतीय इतिहास एवं राष्ट्रीय आंदोलन', [M('ind_hist_1'), M('ind_hist_2'), M('ind_hist_4'), M('ind_hist_6'), M('ind_hist_7'), M('ind_med_1'), M('ind_med_2'), M('ind_mod_3'), M('ind_mod_4'), M('ind_mod_5')]),
                ('भारतीय राजव्यवस्था एवं संविधान', [M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_3'), M('ind_pol_4'), M('ind_pol_5'), M('ind_pol_6'), M('ind_pol_7'), M('ind_pol_8')]),
                ('भारत का भूगोल', [M('ind_geo_1'), M('ind_geo_2'), M('ind_geo_3'), M('ind_geo_4'), M('ind_geo_5')]),
                ('भारतीय अर्थव्यवस्था', [M('ind_eco_1'), M('ind_eco_2'), M('ind_eco_3'), M('ind_eco_4')]),
                ('सामान्य विज्ञान', [M('phy_1'), M('phy_2'), M('phy_4'), M('chem_1'), M('chem_5'), M('bio_1'), M('bio_9'), M('bio_10')])
            ]),
            make_sub('pat_current', 'समसामयिक घटनाएं एवं खेलकूद', 15, 'High', 'High (15 Qs)', False, [
                ('राष्ट्रीय एवं अंतर्राष्ट्रीय समसामयिकी', [M('ca_nat_1'), M('ca_nat_3'), M('ca_int_1'), M('ca_eco_1'), M('ca_sci_1')]),
                ('खेलकूद, पुरस्कार एवं महत्वपूर्ण दिवस', [M('ca_sports_1'), M('ca_sports_3'), M('ca_award_1'), M('ca_day_1')])
            ]),
            make_sub('pat_cg_gk', 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)', 15, 'High', 'High (15 Qs)', True, [
                ('छत्तीसगढ़ का इतिहास', [M('cg_hist_1'), M('cg_hist_2'), M('cg_hist_7'), M('cg_hist_9'), M('cg_hist_10'), M('cg_hist_11'), M('cg_hist_12'), M('cg_hist_13')]),
                ('छत्तीसगढ़ का भूगोल एवं नदियां', [M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_5'), M('cg_geo_7'), M('cg_geo_10')]),
                ('जनजातियां, कला एवं संस्कृति', [M('cg_cul_1'), M('cg_cul_2'), M('cg_cul_3'), M('cg_cul_4'), M('cg_cul_5'), M('cg_cul_8')]),
                ('अर्थव्यवस्था, प्रशासन एवं योजनाएं', [M('cg_eco_1'), M('cg_eco_2'), M('cg_eco_4'), M('cg_eco_5'), M('cg_eco_6'), M('cg_eco_8')])
            ])
        ]
    }

    # 2. CG POLICE CONSTABLE (CG VYAPAM / PHQ)
    exams['cgv_police'] = {
        'name': 'Police Constable / GD',
        'fullName': 'CG Police Constable (GD / Trade / Driver) Recruitment Exam',
        'icon': '👮',
        'category': 'police',
        'description': 'छत्तीसगढ़ पुलिस आरक्षक (GD/ट्रेड/चालक) लिखित परीक्षा — 100 अंक',
        'eligibility': '10th / 12th Pass (8th Pass for ST)',
        'pattern': {
            'totalMarks': 100,
            'time': '2 Hours',
            'type': 'Objective MCQ (100 Questions, 100 Marks)',
            'papers': [
                { 'paper': 'सामान्य ज्ञान एवं छत्तीसगढ़ सामान्य ज्ञान', 'marks': 50 },
                { 'paper': 'सामान्य मानसिक योग्यता (रीजनिंग)', 'marks': 25 },
                { 'paper': 'अंकगणित (Numerical Ability)', 'marks': 25 }
            ]
        },
        'subjects': [
            make_sub('pol_gk', 'सामान्य ज्ञान एवं छत्तीसगढ़ सामान्य ज्ञान', 50, 'Highest', 'Extremely High (50 Qs)', True, [
                ('छत्तीसगढ़ का इतिहास एवं स्वतंत्रता आंदोलन', [M('cg_hist_1'), M('cg_hist_7'), M('cg_hist_9'), M('cg_hist_11'), M('cg_hist_12'), M('cg_hist_13')]),
                ('छत्तीसगढ़ का भूगोल, नदियां व वन संपदा', [M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_7'), M('cg_geo_10')]),
                ('छत्तीसगढ़ की जनजातियां, तीज-त्योहार व संस्कृति', [M('cg_cul_1'), M('cg_cul_2'), M('cg_cul_3'), M('cg_cul_5')]),
                ('छत्तीसगढ़ प्रशासन, जिले व योजनाएं', [M('cg_eco_4'), M('cg_eco_5'), M('cg_eco_6'), M('cg_eco_8')]),
                ('भारत का इतिहास एवं संविधान', [M('ind_hist_1'), M('ind_hist_6'), M('ind_mod_3'), M('ind_mod_5'), M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_5')]),
                ('भारत का भूगोल एवं सामान्य विज्ञान', [M('ind_geo_1'), M('ind_geo_2'), M('phy_1'), M('chem_1'), M('bio_9'), M('bio_10')]),
                ('समसामयिक घटनाएं एवं खेलकूद', [M('ca_nat_1'), M('ca_cg_1'), M('ca_sports_1'), M('ca_sports_3')])
            ]),
            make_sub('pol_reasoning', 'सामान्य मानसिक योग्यता एवं रीजनिंग', 25, 'High', 'High (25 Qs)', False, [
                ('श्रृंखला एवं सादृश्यता परीक्षण', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1'), M('reas_ana_2')]),
                ('कोडिंग-डिकोडिंग एवं रक्त संबंध', [M('reas_cd_1'), M('reas_cd_2'), M('reas_br_1')]),
                ('दिशा परीक्षण एवं रैंकिंग', [M('reas_dir_1'), M('reas_rank_1')]),
                ('वेन आरेख एवं अशाब्दिक तर्कशक्ति', [M('reas_nv_1'), M('reas_nv_2'), M('reas_nv_5')])
            ]),
            make_sub('pol_maths', 'अंकगणित (Numerical Ability)', 25, 'High', 'High (25 Qs)', False, [
                ('संख्या पद्धति एवं सरलीकरण', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5')]),
                ('औसत, प्रतिशत एवं लाभ-हानि', [M('math_ratio_3'), M('math_ar_1'), M('math_ar_2')]),
                ('साधारण एवं चक्रवृद्धि ब्याज', [M('math_si_1'), M('math_si_2')]),
                ('अनुपात, समय, कार्य एवं चाल-दूरी', [M('math_ratio_1'), M('math_si_3'), M('math_tsd_1')]),
                ('क्षेत्रमिति की मूल अवधारणाएं', [M('math_men_1'), M('math_men_2')])
            ])
        ]
    }

    # 3. CG FOREST GUARD (वनरक्षक)
    exams['cgv_forest'] = {
        'name': 'Forest Guard (वनरक्षक)',
        'fullName': 'Chhattisgarh Forest Guard Recruitment Examination',
        'icon': '🌲',
        'category': 'forest',
        'description': 'छत्तीसगढ़ वनरक्षक सीधी भर्ती परीक्षा — 100 अंक',
        'eligibility': '12th Pass',
        'pattern': {
            'totalMarks': 100,
            'time': '2 Hours',
            'type': 'Objective MCQ (100 Questions, 100 Marks)',
            'papers': [
                { 'paper': 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 'marks': 30 },
                { 'paper': 'सामान्य विज्ञान, वन संपदा एवं पर्यावरण', 'marks': 30 },
                { 'paper': 'अंकगणित (Mathematics)', 'marks': 20 },
                { 'paper': 'बुद्धि क्षमता एवं तार्किक योग्यता', 'marks': 20 }
            ]
        },
        'subjects': [
            make_sub('forest_gk', 'सामान्य ज्ञान एवं छत्तीसगढ़ GK', 30, 'Highest', 'High (30 Qs)', True, [
                ('छत्तीसगढ़ सामान्य ज्ञान', [M('cg_hist_1'), M('cg_hist_7'), M('cg_hist_11'), M('cg_hist_12'), M('cg_geo_1'), M('cg_geo_3'), M('cg_cul_1'), M('cg_eco_4'), M('cg_eco_6')]),
                ('भारत सामान्य ज्ञान व संविधान', [M('ind_hist_1'), M('ind_mod_5'), M('ind_pol_1'), M('ind_pol_2'), M('ind_geo_1')]),
                ('समसामयिक घटनाएं एवं खेल', [M('ca_nat_1'), M('ca_cg_1'), M('ca_sports_1')])
            ]),
            make_sub('forest_sci', 'सामान्य विज्ञान, वन संपदा एवं पर्यावरण', 30, 'Highest', 'Extremely High (30 Qs)', True, [
                ('सामान्य विज्ञान मूल सिद्धांत', [M('phy_1'), M('phy_4'), M('chem_1'), M('chem_5'), M('bio_1'), M('bio_13')]),
                ('पर्यावरण, पारिस्थितिकी एवं जैव विविधता', [M('env_1'), M('env_2'), M('env_3'), M('env_4'), M('env_6')]),
                ('छत्तीसगढ़ की वन संपदा एवं वन्यजीव', [
                    M('cg_geo_7'), M('cg_geo_8'), M('cg_geo_9'),
                    C('forest_law_1', 'Forestry Laws & Tendu Patta Policy', 'वन संरक्षण कानून, तेन्दूपत्ता एवं लघु वनोपज नीति', ['वन्यजीव संरक्षण अधिनियम 1972', 'वन संरक्षण अधिनियम 1980', 'तेन्दूपत्ता संग्रहण एवं बोनस वितरण', 'लघु वनोपज न्यूनतम समर्थन मूल्य']),
                    C('forest_law_2', 'National Parks & Wildlife Sanctuaries of CG', 'छत्तीसगढ़ के राष्ट्रीय उद्यान, टाइगर रिजर्व एवं अभयारण्य', ['इंद्रावती राष्ट्रीय उद्यान', 'कांगेर घाटी राष्ट्रीय उद्यान', 'गुरु घासीदास राष्ट्रीय उद्यान', 'अचानकमार एवं उदंती-सीतानदी टाइगर रिजर्व'])
                ])
            ]),
            make_sub('forest_maths', 'अंकगणित (Mathematics)', 20, 'High', 'High (20 Qs)', False, [
                ('संख्या पद्धति एवं सरलीकरण', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5')]),
                ('व्यावसायिक गणित', [M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_ratio_1'), M('math_si_1'), M('math_si_3'), M('math_tsd_1')]),
                ('क्षेत्रमिति', [M('math_men_1'), M('math_men_2')])
            ]),
            make_sub('forest_reasoning', 'बुद्धि क्षमता एवं तार्किक योग्यता', 20, 'High', 'High (20 Qs)', False, [
                ('तार्किक श्रृंखला एवं सादृश्यता', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1')]),
                ('कोडिंग-डिकोडिंग, रक्त संबंध व दिशा', [M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1')]),
                ('अशाब्दिक तर्कशक्ति', [M('reas_nv_1'), M('reas_nv_2'), M('reas_nv_5')])
            ])
        ]
    }

    # 4. CG TEACHER (शिक्षक / सहायक शिक्षक भर्ती परीक्षा)
    exams['cgv_teacher'] = {
        'name': 'Shikshak / Teacher',
        'fullName': 'CG Vyapam Teacher (शिक्षक / सहायक शिक्षक) Recruitment Exam',
        'icon': '📚',
        'category': 'education',
        'description': 'छत्तीसगढ़ शिक्षक एवं सहायक शिक्षक भर्ती परीक्षा — आधिकारिक 150 अंकों का पाठ्यक्रम',
        'eligibility': 'D.El.Ed / B.Ed + CG TET / CTET Pass',
        'pattern': {
            'totalMarks': 150,
            'time': '2.5 Hours',
            'type': 'Objective MCQ (150 Questions, 150 Marks)',
            'papers': [
                { 'paper': 'बाल विकास एवं शिक्षाशास्त्र (CDP)', 'marks': 30 },
                { 'paper': 'सामान्य हिंदी', 'marks': 25 },
                { 'paper': 'General English', 'marks': 25 },
                { 'paper': 'गणित (Mathematics)', 'marks': 30 },
                { 'paper': 'पर्यावरण अध्ययन / सामाजिक अध्ययन / विज्ञान', 'marks': 20 },
                { 'paper': 'कंप्यूटर एवं सामान्य ज्ञान', 'marks': 20 }
            ]
        },
        'subjects': [
            make_sub('tch_cdp', 'बाल विकास एवं शिक्षाशास्त्र (CDP)', 30, 'Highest', 'Extremely High (30 Qs)', False, [
                ('बाल विकास की अवधारणा एवं सिद्धांत', [
                    C('tch_cdp_1', 'Child Development Concepts', 'बाल विकास की अवधारणा, विकास के आयाम एवं प्रभावक कारक', ['वृद्धि एवं विकास का अंतर', 'वंशानुक्रम एवं वातावरण का प्रभाव', 'शारीरिक, मानसिक एवं संवेगात्मक विकास']),
                    C('tch_cdp_2', 'Piaget, Kohlberg & Vygotsky', 'पियाजे, कोहलबर्ग एवं वाइगोत्स्की के रचनावादी सिद्धांत', ['पियाजे का संज्ञानात्मक विकास सिद्धांत', 'कोहलबर्ग का नैतिक विकास', 'वाइगोत्स्की का सामाजिक-सांस्कृतिक सिद्धांत एवं ZPD']),
                    C('tch_cdp_3', 'Inclusive Education & CWSN', 'समावेशी शिक्षा एवं विशेष आवश्यकता वाले बच्चे', ['वंचित एवं पिछड़े बच्चों की शिक्षा', 'अधिगम अक्षमताएं (Dyslexia, Dyscalculia)', 'प्रतिभाशाली एवं सृजनात्मक बालकों की पहचान']),
                    C('tch_cdp_4', 'Learning Theories & Evaluation', 'अधिगम सिद्धांत, प्रेरणा एवं मूल्यांकन (CCE)', ['थार्नडाइक, पावलव व स्किनर के सिद्धांत', 'अधिगम स्थानांतरण', 'सतत एवं समग्र मूल्यांकन (CCE)', 'उपचारात्मक शिक्षण']),
                    C('tch_cdp_5', 'NEP 2020 & RTE Act 2009', 'राष्ट्रीय शिक्षा नीति 2020 एवं बाल अधिकार कानून', ['RTE Act 2009 के प्रमुख प्रावधान', 'NEP 2020 स्कूली शिक्षा संरचना (5+3+3+4)', 'FLN निपुण भारत मिशन'])
                ])
            ]),
            make_sub('tch_hindi', 'सामान्य हिंदी भाषा एवं शिक्षाशास्त्र', 25, 'High', 'High (25 Qs)', False, [
                ('वर्णमाला, वर्तनी एवं संधि-समास', [M('hin_varn_1'), M('hin_varn_2'), M('hin_sandhi_1'), M('hin_sandhi_2'), M('hin_samas_1'), M('hin_samas_2')]),
                ('व्याकरण एवं शब्द भंडार', [M('hin_shabd_1'), M('hin_gram_1'), M('hin_gram_2'), M('hin_gram_3'), M('hin_vocab_1'), M('hin_vocab_2'), M('hin_vocab_3'), M('hin_idiom_1')]),
                ('अपठित गद्यांश एवं भाषा शिक्षण', [
                    M('hin_comp_1'),
                    C('tch_hin_ped', 'Hindi Language Pedagogy', 'हिंदी भाषा शिक्षण शास्त्र', ['भाषा अर्जन एवं अधिगम', 'भाषा शिक्षण के चार कौशल (LSRW)', 'भाषा शिक्षण में टीएलएम (TLM) एवं उपचारात्मक शिक्षण'])
                ])
            ]),
            make_sub('tch_english', 'General English & Pedagogy', 25, 'High', 'High (25 Qs)', False, [
                ('English Grammar', [M('eng_gram_1'), M('eng_gram_2'), M('eng_tense_1'), M('eng_tense_2'), M('eng_voice_1')]),
                ('Vocabulary & Comprehension', [M('eng_vocab_1'), M('eng_vocab_2'), M('eng_comp_1')]),
                ('English Pedagogy', [
                    C('tch_eng_ped', 'English Language Pedagogy', 'English Language Teaching & Pedagogy', ['Principles of Language Teaching', 'Role of Listening and Speaking', 'Remedial Teaching and TLM in English'])
                ])
            ]),
            make_sub('tch_maths', 'गणित एवं गणित शिक्षण शास्त्र', 30, 'Highest', 'Very High (30 Qs)', False, [
                ('संख्या पद्धति एवं बुनियादी गणित', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5')]),
                ('व्यावसायिक गणित एवं क्षेत्रमिति', [M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_si_1'), M('math_men_1'), M('math_men_2')]),
                ('ज्यामिति एवं आंकड़े', [M('math_geo_1'), M('math_geo_2'), M('math_di_1')]),
                ('गणित शिक्षण शास्त्र', [
                    C('tch_math_ped', 'Mathematics Pedagogy', 'गणित शिक्षण शास्त्र (Pedagogy)', ['गणित की प्रकृति एवं तार्किक सोच', 'पाठ्यचर्या में गणित का स्थान', 'गणित शिक्षण की विधियाँ एवं त्रुटि विश्लेषण'])
                ])
            ]),
            make_sub('tch_evs', 'पर्यावरण अध्ययन एवं सामाजिक अध्ययन', 20, 'High', 'High (20 Qs)', True, [
                ('पर्यावरण, पारिस्थितिकी एवं स्वास्थ्य', [M('env_1'), M('env_2'), M('bio_9'), M('bio_10')]),
                ('हमारा परिवेश एवं छत्तीसगढ़ संदर्भ', [
                    M('cg_geo_1'), M('cg_geo_7'), M('cg_cul_1'),
                    C('tch_evs_ped', 'EVS Pedagogy & Practical', 'पर्यावरण अध्ययन शिक्षण शास्त्र', ['पर्यावरण अध्ययन का महत्व एवं उद्देश्य', 'क्रियाकलाप, प्रयोग एवं प्रायोजना कार्य', 'पर्यावरण शिक्षण में सहायक सामग्री'])
                ])
            ]),
            make_sub('tch_comp_gk', 'कंप्यूटर एवं सामान्य ज्ञान', 20, 'Medium', 'Medium (20 Qs)', False, [
                ('कंप्यूटर ज्ञान', [M('comp_basic_1'), M('comp_hw_1'), M('comp_sw_1'), M('comp_office_1'), M('comp_net_1')]),
                ('सामान्य ज्ञान एवं छत्तीसगढ़ GK', [M('cg_hist_11'), M('cg_eco_6'), M('ind_pol_1'), M('ca_nat_1'), M('ca_cg_1')])
            ])
        ]
    }

    # 5. CG FOOD INSPECTOR (खाद्य नागरिक आपूर्ति निरीक्षक)
    exams['cgv_food'] = {
        'name': 'Food Inspector (खाद्य निरीक्षक)',
        'fullName': 'CG Vyapam Food Civil Supplies Inspector Recruitment Exam',
        'icon': '🌾',
        'category': 'technical',
        'description': 'खाद्य नागरिक आपूर्ति निरीक्षक भर्ती परीक्षा — आधिकारिक 200 अंकों का विस्तृत पाठ्यक्रम',
        'eligibility': 'Graduate in Any Discipline',
        'pattern': {
            'totalMarks': 200,
            'time': '3 Hours',
            'type': 'Objective MCQ (200 Questions, 200 Marks)',
            'papers': [
                { 'paper': 'आवश्यक वस्तु अधिनियम एवं खाद्य सुरक्षा कानून', 'marks': 50 },
                { 'paper': 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)', 'marks': 50 },
                { 'paper': 'सामान्य ज्ञान (India GK & Science)', 'marks': 50 },
                { 'paper': 'गणित एवं मानसिक योग्यता (Maths & Reasoning)', 'marks': 30 },
                { 'paper': 'कंप्यूटर ज्ञान एवं सामान्य हिंदी', 'marks': 20 }
            ]
        },
        'subjects': [
            make_sub('food_acts', 'आवश्यक वस्तु अधिनियम एवं खाद्य सुरक्षा कानून', 50, 'Highest', 'Extremely High (50 Qs)', True, [
                ('आवश्यक वस्तु अधिनियम एवं खाद्य कानून', [
                    C('food_act_1', 'Essential Commodities Act 1955', 'आवश्यक वस्तु अधिनियम 1955 - उद्देश्य, नियंत्रण आदेश एवं दंड प्रावधान', ['अधिनियम के उद्देश्य एवं परिभाषाएं', 'आवश्यक वस्तुओं की घोषणा एवं मूल्य नियंत्रण', 'तलाशी, जब्ती एवं अधिग्रहण प्रक्रिया', 'धारा 3 के तहत नियंत्रण आदेश एवं उल्लंघन पर दंड']),
                    C('food_act_2', 'National Food Security Act 2013', 'राष्ट्रीय खाद्य सुरक्षा अधिनियम 2013 (NFSA) - प्रावधान एवं पात्रताएं', ['अधिनियम की उद्देशिका एवं कानूनी अधिकार', 'अंत्योदय एवं प्राथमिकता परिवार पात्रताएं', 'गर्भवती महिलाओं एवं बच्चों हेतु पोषण सहायता', 'राज्य खाद्य आयोग एवं शिकायत निवारण तंत्र']),
                    C('food_act_3', 'CG Food & Nutrition Security Act 2012', 'छत्तीसगढ़ खाद्य एवं पोषण सुरक्षा अधिनियम 2012', ['छत्तीसगढ़ कानून के विशेष प्रावधान', 'विभिन्न श्रेणियों के राशन कार्ड (अंत्योदय, प्राथमिकता, निराश्रित)', 'पौष्टिक भोजन एवं दाल, चना, आयोडाइज्ड नमक वितरण', 'महिला सशक्तिकरण (मुखिया के रूप में महिला)']),
                    C('food_act_4', 'CG PDS & Rationing System', 'छत्तीसगढ़ सार्वजनिक वितरण प्रणाली (PDS) नियंत्रण आदेश', ['सार्वजनिक वितरण प्रणाली (PDS) का कंप्यूटरीकरण', 'उचित मूल्य दुकान आवंटन नियम', 'खाद्यान्न भंडारण, उठाव एवं बारदाना प्रबंधन', 'विकेंद्रीकृत धान उपार्जन प्रणाली एवं कस्टम मिलिंग'])
                ]),
                ('उपभोक्ता संरक्षण एवं खाद्य मानक', [
                    C('food_act_5', 'Consumer Protection Act 2019', 'उपभोक्ता संरक्षण अधिनियम 2019 - उपभोक्ता अधिकार व आयोग', ['उपभोक्ता के छह बुनियादी अधिकार', 'जिला, राज्य एवं राष्ट्रीय उपभोक्ता आयोग का क्षेत्राधिकार', 'भ्रामक विज्ञापन एवं उत्पाद दायित्व (Product Liability)', 'ई-कॉमर्स नियम एवं ई-दाखिल पोर्टल']),
                    C('food_act_6', 'Food Safety and Standards Act 2006 (FSSAI)', 'खाद्य सुरक्षा एवं मानक अधिनियम 2006 (FSSAI)', ['FSSAI की स्थापना एवं खाद्य मानक', 'खाद्य अपमिश्रण (Food Adulteration) निवारण', 'खाद्य लाइसेंसिंग एवं रजिस्ट्रेशन', 'खाद्य सुरक्षा अधिकारी के कर्तव्य एवं नमूना जांच'])
                ])
            ]),
            make_sub('food_cg', 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)', 50, 'Highest', 'Extremely High (50 Qs)', True, [
                ('छत्तीसगढ़ का इतिहास एवं स्वतंत्रता संग्राम', [M('cg_hist_1'), M('cg_hist_2'), M('cg_hist_7'), M('cg_hist_9'), M('cg_hist_10'), M('cg_hist_11'), M('cg_hist_12'), M('cg_hist_13')]),
                ('छत्तीसगढ़ का भूगोल, नदियां व वन', [M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_5'), M('cg_geo_7'), M('cg_geo_10')]),
                ('छत्तीसगढ़ की जनजातियां, कला व संस्कृति', [M('cg_cul_1'), M('cg_cul_2'), M('cg_cul_3'), M('cg_cul_4'), M('cg_cul_5'), M('cg_cul_8')]),
                ('छत्तीसगढ़ अर्थव्यवस्था, कृषि एवं योजनाएं', [M('cg_eco_1'), M('cg_eco_2'), M('cg_eco_4'), M('cg_eco_5'), M('cg_eco_6'), M('cg_eco_8')])
            ]),
            make_sub('food_gk', 'सामान्य ज्ञान (India GK & Science)', 50, 'Highest', 'Extremely High (50 Qs)', False, [
                ('भारतीय इतिहास एवं राष्ट्रीय आंदोलन', [M('ind_hist_1'), M('ind_hist_6'), M('ind_med_2'), M('ind_mod_3'), M('ind_mod_4'), M('ind_mod_5')]),
                ('भारतीय संविधान एवं राजव्यवस्था', [M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_3'), M('ind_pol_5'), M('ind_pol_6'), M('ind_pol_7'), M('ind_pol_8')]),
                ('भारत का भूगोल एवं अर्थव्यवस्था', [M('ind_geo_1'), M('ind_geo_2'), M('ind_geo_3'), M('ind_eco_1'), M('ind_eco_2'), M('ind_eco_3')]),
                ('सामान्य विज्ञान एवं पोषण', [M('phy_1'), M('phy_4'), M('chem_1'), M('chem_5'), M('bio_1'), M('bio_9'), M('bio_10')]),
                ('समसामयिक घटनाएं', [M('ca_nat_1'), M('ca_nat_3'), M('ca_cg_1'), M('ca_eco_1')])
            ]),
            make_sub('food_quant', 'गणित एवं मानसिक योग्यता (Maths & Reasoning)', 30, 'High', 'High (30 Qs)', False, [
                ('अंकगणित एवं संख्या पद्धति', [M('math_ns_1'), M('math_ns_3'), M('math_ns_5'), M('math_ratio_3'), M('math_ar_1'), M('math_ar_2'), M('math_ratio_1'), M('math_si_1'), M('math_si_2'), M('math_si_3'), M('math_tsd_1')]),
                ('क्षेत्रमिति', [M('math_men_1'), M('math_men_2')]),
                ('तार्किक एवं मानसिक योग्यता', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1'), M('reas_cd_1'), M('reas_br_1'), M('reas_dir_1'), M('reas_syl_1'), M('reas_nv_1')])
            ]),
            make_sub('food_comp_hin', 'कंप्यूटर ज्ञान एवं सामान्य हिंदी', 20, 'High', 'High (20 Qs)', False, [
                ('कंप्यूटर ज्ञान', [M('comp_basic_1'), M('comp_hw_1'), M('comp_sw_1'), M('comp_office_1'), M('comp_office_2'), M('comp_net_1'), M('comp_cyber_1')]),
                ('सामान्य हिंदी व्याकरण', [M('hin_varn_1'), M('hin_sandhi_1'), M('hin_samas_1'), M('hin_shabd_1'), M('hin_vocab_1'), M('hin_vocab_2'), M('hin_idiom_1'), M('hin_sent_1')])
            ])
        ]
    }

    print('Patwari, Police, Forest, Teacher, Food ready.')
    return exams
