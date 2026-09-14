# -*- coding: utf-8 -*-
import json
import os

with open('scratch/master_topics.json', 'r', encoding='utf-8') as mf:
    master_list = json.load(mf)

master_by_id = {t['id']: t for t in master_list}

def M(tid):
    if tid not in master_by_id:
        raise ValueError(f'Master topic not found: {tid}')
    t = master_by_id[tid]
    return {
        'id': t['id'],
        'name': t['name'],
        'nameHi': t['nameHi'],
        'subtopics': list(t.get('subtopics', [])),
        'importanceScore': t.get('importanceScore', 8)
    }

def C(tid, name_en, name_hi, subtopics, score=8):
    return {
        'id': tid,
        'name': name_en,
        'nameHi': name_hi,
        'subtopics': subtopics,
        'importanceScore': score
    }

def make_sub(sub_id, name, weightage, importance, pyq, is_cg, chapters):
    processed_chaps = []
    all_topics = []
    for c_idx, (c_name, c_topics) in enumerate(chapters):
        ch_id = f'{sub_id}_ch_{c_idx+1}'
        processed_chaps.append({
            'id': ch_id,
            'name': c_name,
            'topics': c_topics
        })
        all_topics.extend(c_topics)
    return {
        'id': sub_id,
        'name': name,
        'weightage': weightage,
        'importance': importance,
        'pyqFrequency': pyq,
        'isCgSpecific': is_cg,
        'chapters': processed_chaps,
        'topics': all_topics
    }

print('Step 1: Setup completed.')
