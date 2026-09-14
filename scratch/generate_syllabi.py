# -*- coding: utf-8 -*-
import json
import os

with open('scratch/master_topics.json', 'r', encoding='utf-8') as f:
    master_topics_list = json.load(f)

master_by_id = {t['id']: t for t in master_topics_list}

def M(topic_id):
    if topic_id not in master_by_id:
        raise ValueError(f'Unknown master topic ID: {topic_id}')
    t = master_by_id[topic_id]
    return {
        'id': t['id'],
        'name': t['name'],
        'nameHi': t['nameHi'],
        'subtopics': list(t.get('subtopics', [])),
        'importanceScore': t.get('importanceScore', 8)
    }

def C(topic_id, name_en, name_hi, subtopics, importance=8):
    return {
        'id': topic_id,
        'name': name_en,
        'nameHi': name_hi,
        'subtopics': subtopics,
        'importanceScore': importance
    }

def make_subject(sub_id, name, weightage, importance, pyq_freq, is_cg, chapters):
    all_topics = []
    processed_chapters = []
    for ch_idx, (ch_name, ch_topics) in enumerate(chapters):
        ch_id = f'{sub_id}_ch_{ch_idx+1}'
        processed_chapters.append({
            'id': ch_id,
            'name': ch_name,
            'topics': ch_topics
        })
        all_topics.extend(ch_topics)
    return {
        'id': sub_id,
        'name': name,
        'weightage': weightage,
        'importance': importance,
        'pyqFrequency': pyq_freq,
        'isCgSpecific': is_cg,
        'chapters': processed_chapters,
        'topics': all_topics
    }

print('Base generator initialized.')

# ----------------------------------------------------
# 1. PATWARI / REVENUE INSPECTOR
# ----------------------------------------------------
cgv_patwari = {
    'id': 'cgv_patwari',
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
        make_subject('pat_comp', 'कंप्यूटर संबंधी सामान्य ज्ञान', 20, 'Highest', 'Very High (20 Qs)', False, [
            ('कंप्यूटर की मूल अवधारणाएँ', [M('comp_basic_1'), M('comp_basic_2'), M('comp_basic_3'), M('comp_basic_4')]),
            ('हार्डवेयर एवं मेमोरी', [M('comp_hw_1'), M('comp_hw_2'), M('comp_hw_3'), M('comp_hw_4')]),
            ('सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम', [M('comp_sw_1'), M('comp_sw_2'), M('comp_sw_3')]),
            ('MS Office टूल्स', [M('comp_office_1'), M('comp_office_2'), M('comp_office_3')]),
            ('इंटरनेट, ईमेल एवं नेटवर्किंग', [M('comp_net_1'), M('comp_net_4')]),
            ('साइबर सुरक्षा एवं एंटीवायरस', [M('comp_cyber_1'), M('comp_cyber_2'), M('comp_cyber_3')])
        ]),
        make_subject('pat_hindi', 'सामान्य हिंदी भाषा', 10, 'High', 'High (10 Qs)', False, [
            ('वर्णमाला एवं वर्तनी', [M('hin_varn_1'), M('hin_varn_2'), M('hin_varn_3')]),
            ('संधि एवं समास', [M('hin_sandhi_1'), M('hin_sandhi_2'), M('hin_sam_1')]),
            ('शब्द विचार एवं व्याकरण', [M('hin_shabd_1'), M('hin_sang_1'), M('hin_sarv_1'), M('hin_karak_1')]),
            ('शब्द भंडार एवं मुहावरे', [M('hin_vilom_1'), M('hin_pary_1'), M('hin_anek_1'), M('hin_muh_1'), M('hin_lok_1')])
        ]),
        make_subject('pat_english', 'General English', 10, 'High', 'High (10 Qs)', False, [
            ('English Grammar', [M('eng_gram_1'), M('eng_gram_2'), M('eng_tense_1'), M('eng_tense_2'), M('eng_voice_1')]),
            ('Vocabulary & Usage', [M('eng_syn_1'), M('eng_ant_1'), M('eng_idiom_1'), M('eng_comp_1')])
        ]),
        make_subject('pat_maths', 'गणित (Mathematics)', 30, 'Highest', 'Extremely High (30 Qs)', False, [
            ('संख्या पद्धति एवं सरलीकरण', [M('math_ns_1'), M('math_ns_2'), M('math_ns_3'), M('math_ns_5')]),
            ('व्यावसायिक अंकगणित', [M('math_avg_1'), M('math_pct_1'), M('math_pl_1'), M('math_ratio_1'), M('math_si_1'), M('math_ci_1'), M('math_tw_1'), M('math_spd_1')]),
            ('बीजगणित', [M('math_alg_1'), M('math_poly_1')]),
            ('रेखागणित एवं क्षेत्रमिति', [M('math_geo_1'), M('math_geo_2'), M('math_mens_1'), M('math_mens_2')])
        ]),
        make_subject('pat_reasoning', 'सामान्य मानसिक योग्यता (Reasoning)', 15, 'High', 'High (15 Qs)', False, [
            ('शाब्दिक तर्कशक्ति', [M('reas_ser_1'), M('reas_ser_2'), M('reas_ana_1'), M('reas_class_1'), M('reas_cod_1'), M('reas_blood_1'), M('reas_dir_1')]),
            ('अशाब्दिक एवं विश्लेषणात्मक योग्यता', [M('reas_syl_1'), M('reas_venn_1'), M('reas_time_1'), M('reas_nonv_1'), M('reas_nonv_2')])
        ]),
        make_subject('pat_gk_india', 'सामान्य ज्ञान (India GK)', 35, 'Highest', 'Extremely High (35 Qs)', False, [
            ('भारतीय इतिहास एवं स्वतंत्रता आंदोलन', [M('ind_hist_1'), M('ind_hist_2'), M('ind_hist_4'), M('ind_hist_6'), M('ind_hist_8'), M('ind_hist_10'), M('ind_hist_11'), M('ind_hist_12')]),
            ('भारतीय राजव्यवस्था एवं संविधान', [M('ind_pol_1'), M('ind_pol_2'), M('ind_pol_3'), M('ind_pol_4'), M('ind_pol_5'), M('ind_pol_7'), M('ind_pol_8')]),
            ('भारत का भूगोल', [M('ind_geo_1'), M('ind_geo_2'), M('ind_geo_3'), M('ind_geo_4'), M('ind_geo_5'), M('ind_geo_7')]),
            ('भारतीय अर्थव्यवस्था', [M('ind_eco_1'), M('ind_eco_2'), M('ind_eco_3'), M('ind_eco_4')]),
            ('सामान्य विज्ञान', [M('phy_1'), M('phy_2'), M('chem_1'), M('chem_2'), M('bio_cell_1'), M('bio_nutr_1'), M('bio_dis_1')])
        ]),
        make_subject('pat_current', 'समसामयिक घटनाएं एवं खेलकूद', 15, 'High', 'High (15 Qs)', False, [
            ('राष्ट्रीय एवं अंतर्राष्ट्रीय समसामयिकी', [M('ca_nat_1'), M('ca_nat_3'), M('ca_int_1'), M('ca_eco_1'), M('ca_sci_1')]),
            ('खेलकूद, पुरस्कार एवं महत्वपूर्ण दिवस', [M('ca_sports_1'), M('ca_sports_3'), M('ca_award_1'), M('ca_day_1')])
        ]),
        make_subject('pat_cg_gk', 'छत्तीसगढ़ सामान्य ज्ञान (CG GK)', 15, 'High', 'High (15 Qs)', True, [
            ('छत्तीसगढ़ का इतिहास', [M('cg_hist_1'), M('cg_hist_2'), M('cg_hist_7'), M('cg_hist_9'), M('cg_hist_10'), M('cg_hist_11'), M('cg_hist_12'), M('cg_hist_13')]),
            ('छत्तीसगढ़ का भूगोल एवं नदियां', [M('cg_geo_1'), M('cg_geo_2'), M('cg_geo_3'), M('cg_geo_5'), M('cg_geo_7'), M('cg_geo_10')]),
            ('जनजातियां, कला एवं संस्कृति', [M('cg_cul_1'), M('cg_cul_2'), M('cg_cul_3'), M('cg_cul_4'), M('cg_cul_5'), M('cg_cul_8')]),
            ('अर्थव्यवस्था, प्रशासन एवं योजनाएं', [M('cg_eco_1'), M('cg_eco_2'), M('cg_eco_4'), M('cg_eco_5'), M('cg_eco_6'), M('cg_eco_8')])
        ])
    ]
}
print('Patwari configured.')
