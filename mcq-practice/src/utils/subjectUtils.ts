let customSubjectRenames: Record<string, string> = {};

export function setCustomSubjectRenames(map: Record<string, string>) {
  if (map && typeof map === 'object') {
    customSubjectRenames = map;
  }
}

export function getCanonicalSubject(rawSubject?: string): string {
  if (!rawSubject || typeof rawSubject !== 'string') return 'General Knowledge';
  let trimmed = rawSubject.trim().replace(/\s+/g, ' ');
  if (!trimmed) return 'General Knowledge';
  
  const lower = trimmed.toLowerCase();
  if (customSubjectRenames[lower]) {
    return customSubjectRenames[lower];
  }
  
  if (lower === 'all' || lower === 'all subjects' || lower === 'mixed' || lower === 'full syllabus' || lower === 'mixed subjects') {
    return 'Full Syllabus / All Subjects';
  }
  
  // CG GK & State Specializations
  if (lower.includes('cg history') || lower.includes('chhattisgarh history') || (lower.includes('इतिहास') && lower.includes('छत्तीसगढ़'))) return 'CG History';
  if (lower.includes('cg geography') || lower.includes('chhattisgarh geography') || (lower.includes('भूगोल') && lower.includes('छत्तीसगढ़'))) return 'CG Geography';
  if (lower.includes('cg polity') || lower.includes('cg admin') || lower.includes('chhattisgarh polity') || (lower.includes('शासन') && lower.includes('छत्तीसगढ़'))) return 'CG Polity & Governance';
  if (lower.includes('cg economy') || lower.includes('chhattisgarh economy') || (lower.includes('अर्थव्यवस्था') && lower.includes('छत्तीसगढ़'))) return 'CG Economy';
  if (lower.includes('cg culture') || lower.includes('cg tribe') || lower.includes('chhattisgarh culture') || (lower.includes('संस्कृति') && lower.includes('छत्तीसगढ़'))) return 'CG Culture & Tribes';
  if (lower.includes('scheme') || lower.includes('योजना')) return 'CG Government Schemes';
  if (lower === 'cg gk' || lower === 'cggk' || lower === 'cg general knowledge' || lower === 'chhattisgarh gk' || lower === 'chhattisgarh general knowledge' || lower.includes('छत्तीसगढ़ सामान्य ज्ञान') || lower.includes('छत्तीसगढ़ gk')) return 'CG GK';

  // Indian History / Polity / Geography / Economy
  if (lower === 'indian history' || lower === 'history of india' || lower === 'history' || lower.includes('भारतीय इतिहास')) return 'Indian History';
  if (lower === 'indian polity' || lower === 'indian constitution' || lower === 'polity' || lower.includes('भारतीय संविधान') || lower.includes('राजव्यवस्था')) return 'Indian Polity';
  if (lower === 'indian geography' || lower === 'geography' || lower.includes('भारत का भूगोल')) return 'Indian Geography';
  if (lower === 'indian economy' || lower === 'economy' || lower.includes('भारतीय अर्थव्यवस्था')) return 'Indian Economy';
  
  // Science
  if (lower === 'general science' || lower === 'science' || lower.includes('सामान्य विज्ञान') || lower.includes('science')) return 'General Science';
  
  // General Knowledge / India GK / GS
  if (lower === 'general knowledge' || lower === 'gk' || lower === 'general studies' || lower === 'gs' || lower === 'india gs' || lower.includes('भारत सामान्य ज्ञान') || lower.includes('सामान्य ज्ञान') || lower.includes('india gk') || lower.includes('सामान्य अध्ययन')) return 'General Knowledge';
  
  // Maths & Aptitude
  if (lower === 'aptitude' || lower === 'maths' || lower === 'mathematics' || lower === 'mathemetics' || lower === 'quant' || lower.includes('गणित') || lower.includes('अंकगणित') || lower.includes('aptitude') || lower.includes('numeracy')) return 'Aptitude & Maths';
  
  // Reasoning
  if (lower === 'reasoning' || lower === 'logical reasoning' || lower.includes('तर्कशक्ति') || lower.includes('मानसिक योग्यता') || lower.includes('reasoning')) return 'Reasoning';
  
  // Computer
  if (lower.includes('computer') || lower.includes('कंप्यूटर')) return 'Computer Knowledge';
  
  // Languages
  if (lower.includes('hindi') || lower.includes('हिंदी')) return 'Hindi Language';
  if (lower.includes('chhattisgarhi') || lower.includes('छत्तीसगढ़ी')) return 'Chhattisgarhi Language';
  if (lower.includes('english') || lower.includes('अंग्रेजी')) return 'English Language';
  
  // Current Affairs
  if (lower.includes('current affairs') || lower === 'ca' || lower.includes('समसामयिक') || lower.includes('समसामयिकी') || lower.includes('खेलकूद')) return 'Current Affairs';

  // CDP
  if (lower.includes('cdp') || lower.includes('बाल विकास') || lower.includes('pedagogy') || lower.includes('शिक्षाशास्त्र')) return 'Child Development & Pedagogy';

  // EVS
  if (lower.includes('पर्यावरण') || lower.includes('evs') || lower.includes('environment')) return 'Environment & Ecology';

  if (trimmed === trimmed.toLowerCase() || trimmed === trimmed.toUpperCase()) {
    return trimmed.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }
  
  return trimmed;
}

export interface SubjectOption {
  label: string;
  value: string;
  count?: number;
}

export function getUniqueSubjectOptions(
  activeExamSubjects?: { name: string }[],
  poolStatsSubjects?: { [key: string]: number } | null
): SubjectOption[] {
  const map = new Map<string, SubjectOption>();

  if (activeExamSubjects && Array.isArray(activeExamSubjects)) {
    activeExamSubjects.forEach(s => {
      if (s && s.name) {
        const canonical = getCanonicalSubject(s.name);
        const key = canonical.toLowerCase();
        if (!map.has(key)) {
          map.set(key, { label: canonical, value: canonical });
        }
      }
    });
  }

  if (poolStatsSubjects && typeof poolStatsSubjects === 'object') {
    Object.entries(poolStatsSubjects).forEach(([sub, count]) => {
      const canonical = getCanonicalSubject(sub);
      const key = canonical.toLowerCase();
      if (!map.has(key)) {
        map.set(key, { label: canonical, value: canonical, count });
      } else {
        const existing = map.get(key)!;
        existing.count = (existing.count || 0) + count;
      }
    });
  }

  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
}

// Built-in Exam Syllabus Categories lookup (for fallback when exam subjects are minimal or loading)
const EXAM_DEFAULT_SYLLABUS_MAP: Record<string, string[]> = {
  cgv_patwari: [
    'Computer Knowledge', 'Hindi Language', 'English Language', 'Aptitude & Maths', 
    'Reasoning', 'General Knowledge', 'Current Affairs', 'CG GK', 'CG History', 
    'CG Geography', 'CG Culture & Tribes', 'CG Polity & Governance', 'CG Economy', 
    'CG Government Schemes', 'General Science'
  ],
  cgpsc_sse: [
    'CG GK', 'CG History', 'CG Geography', 'CG Polity & Governance', 'CG Economy', 
    'CG Culture & Tribes', 'CG Government Schemes', 'Indian History', 'Indian Polity', 
    'Indian Geography', 'Indian Economy', 'General Science', 'Aptitude & Maths', 
    'Reasoning', 'Hindi Language', 'Chhattisgarhi Language', 'English Language', 
    'Current Affairs', 'General Knowledge'
  ],
  cg_police_si: [
    'Hindi Language', 'English Language', 'General Knowledge', 'CG GK', 'CG History', 
    'CG Geography', 'CG Polity & Governance', 'CG Economy', 'CG Culture & Tribes', 
    'Aptitude & Maths', 'Reasoning', 'Current Affairs', 'General Science'
  ],
  cg_constable: [
    'General Knowledge', 'CG GK', 'CG History', 'CG Geography', 'CG Polity & Governance', 
    'CG Economy', 'CG Culture & Tribes', 'Reasoning', 'Aptitude & Maths', 'Current Affairs'
  ],
  cg_tet: [
    'Child Development & Pedagogy', 'Hindi Language', 'English Language', 
    'Aptitude & Maths', 'Environment & Ecology'
  ],
  hostel_warden: [
    'Computer Knowledge', 'Hindi Language', 'English Language', 'Aptitude & Maths', 
    'General Knowledge', 'CG GK', 'CG History', 'CG Geography', 'CG Culture & Tribes', 
    'CG Polity & Governance', 'CG Economy', 'Current Affairs', 'Child Development & Pedagogy'
  ],
  mandi_nirikshak: [
    'CG GK', 'CG History', 'CG Geography', 'CG Culture & Tribes', 'General Knowledge', 
    'Aptitude & Maths', 'Reasoning', 'Hindi Language', 'English Language', 
    'Computer Knowledge', 'Current Affairs'
  ],
  adeo: [
    'General Knowledge', 'CG GK', 'CG History', 'CG Geography', 'CG Culture & Tribes', 
    'Hindi Language', 'Current Affairs'
  ],
  cgv_teacher: [
    'Child Development & Pedagogy', 'Hindi Language', 'English Language', 
    'Aptitude & Maths', 'Environment & Ecology', 'Computer Knowledge', 
    'General Knowledge', 'CG GK'
  ],
  cgv_forest: [
    'General Knowledge', 'CG GK', 'General Science', 'Environment & Ecology', 
    'Aptitude & Maths', 'Reasoning'
  ],
  cgv_food: [
    'General Knowledge', 'CG GK', 'CG History', 'CG Geography', 'Aptitude & Maths', 
    'Reasoning', 'Computer Knowledge', 'Hindi Language', 'Current Affairs', 'General Science'
  ],
  cgv_naib: [
    'CG GK', 'CG History', 'CG Geography', 'General Knowledge', 'Indian Polity', 
    'Reasoning', 'Aptitude & Maths', 'Hindi Language', 'Chhattisgarhi Language', 'Current Affairs'
  ],
  cgv_steno_deo: [
    'Computer Knowledge', 'General Knowledge', 'CG GK', 'Hindi Language', 
    'English Language', 'Reasoning', 'Aptitude & Maths'
  ],
  cgv_accountant: [
    'General Knowledge', 'CG GK', 'Computer Knowledge', 'Hindi Language', 
    'English Language', 'Aptitude & Maths'
  ],
  cgv_health: [
    'General Knowledge', 'CG GK', 'Hindi Language', 'General Science'
  ],
  cgv_lab_tech: [
    'General Knowledge', 'General Science'
  ],
  cgv_police: [
    'General Knowledge', 'CG GK', 'Reasoning', 'Aptitude & Maths'
  ],
  cgv_sub_eng: [
    'General Knowledge', 'Reasoning', 'Aptitude & Maths', 'Computer Knowledge'
  ],
  excise_constable: [
    'General Knowledge', 'CG GK', 'Reasoning', 'Aptitude & Maths'
  ],
  transport_constable: [
    'General Knowledge', 'CG GK', 'Reasoning', 'Aptitude & Maths'
  ]
};

/**
 * Returns the set of canonical subject categories associated with an exam's syllabus.
 */
export function getExamSyllabusCategories(activeExam: any): Set<string> {
  const categories = new Set<string>();
  if (!activeExam) return categories;

  // 1. If explicit subjects are defined on the activeExam object
  if (Array.isArray(activeExam.subjects) && activeExam.subjects.length > 0) {
    activeExam.subjects.forEach((s: any) => {
      const sName = (s?.name || s?.nameHi || '').trim();
      if (!sName) return;
      const canonical = getCanonicalSubject(sName);
      categories.add(canonical);

      const sLower = sName.toLowerCase();
      // Handle broad/composite subject titles in syllabi
      if (sLower.includes('छत्तीसगढ़') || sLower.includes('cg')) {
        categories.add('CG GK');
        categories.add('CG History');
        categories.add('CG Geography');
        categories.add('CG Culture & Tribes');
        categories.add('CG Polity & Governance');
        categories.add('CG Economy');
        categories.add('CG Government Schemes');
      }
      if (sLower.includes('सामान्य ज्ञान') || sLower.includes('general studies') || sLower.includes('india gk') || sLower.includes('india gs')) {
        categories.add('General Knowledge');
        categories.add('Indian History');
        categories.add('Indian Polity');
        categories.add('Indian Geography');
        categories.add('Indian Economy');
      }
      if (sLower.includes('गणित') || sLower.includes('math') || sLower.includes('numeracy')) {
        categories.add('Aptitude & Maths');
      }
      if (sLower.includes('रीजनिंग') || sLower.includes('तर्क') || sLower.includes('मानसिक योग्यता')) {
        categories.add('Reasoning');
      }
      if (sLower.includes('कंप्यूटर') || sLower.includes('computer')) {
        categories.add('Computer Knowledge');
      }
      if (sLower.includes('हिंदी') || sLower.includes('hindi')) {
        categories.add('Hindi Language');
      }
      if (sLower.includes('english') || sLower.includes('अंग्रेजी')) {
        categories.add('English Language');
      }
      if (sLower.includes('छत्तीसगढ़ी') || sLower.includes('chhattisgarhi')) {
        categories.add('Chhattisgarhi Language');
      }
      if (sLower.includes('विज्ञान') || sLower.includes('science')) {
        categories.add('General Science');
      }
      if (sLower.includes('समसामयिक') || sLower.includes('current')) {
        categories.add('Current Affairs');
      }
      if (sLower.includes('बाल विकास') || sLower.includes('cdp') || sLower.includes('शिक्षाशास्त्र')) {
        categories.add('Child Development & Pedagogy');
      }
      if (sLower.includes('पर्यावरण') || sLower.includes('evs')) {
        categories.add('Environment & Ecology');
      }
    });
  }

  // 2. Fallback / Merge with built-in default syllabus categories for known exams
  if (activeExam.id && EXAM_DEFAULT_SYLLABUS_MAP[activeExam.id]) {
    EXAM_DEFAULT_SYLLABUS_MAP[activeExam.id].forEach(cat => categories.add(cat));
  }

  return categories;
}

/**
 * Checks whether a test matches the active exam directly or through syllabus matching for cgv_master tests.
 */
export function isTestMatchingExamSyllabus(test: any, activeExam: any): boolean {
  if (!test) return false;
  if (!activeExam || activeExam.id === 'all' || activeExam.id === 'cgv_master') return true;

  // Direct exam assignment match
  if (test.examId === activeExam.id) return true;
  if (Array.isArray(test.examIds) && test.examIds.includes(activeExam.id)) return true;

  // If test is from CG VYAPAM BASICS pool (cgv_master)
  const isFromVyapamBasics = 
    test.examId === 'cgv_master' || 
    test.examName === 'CG VYAPAM BASICS' || 
    (Array.isArray(test.examIds) && test.examIds.includes('cgv_master'));

  if (isFromVyapamBasics) {
    const testSubCanon = getCanonicalSubject(test.subject || '');

    // Full syllabus / mixed mock tests match any general competitive exam
    if (testSubCanon === 'Full Syllabus / All Subjects') {
      return true;
    }

    const syllabusCategories = getExamSyllabusCategories(activeExam);

    // If activeExam has no syllabus defined, allow tests by default
    if (syllabusCategories.size === 0) return true;

    // Direct category match
    if (syllabusCategories.has(testSubCanon)) return true;

    // Subcategory matches (e.g. syllabus includes "CG GK", test is "CG History" or "CG Geography")
    if (syllabusCategories.has('CG GK') && (
      testSubCanon === 'CG History' || 
      testSubCanon === 'CG Geography' || 
      testSubCanon === 'CG Culture & Tribes' || 
      testSubCanon === 'CG Polity & Governance' || 
      testSubCanon === 'CG Economy' || 
      testSubCanon === 'CG Government Schemes'
    )) {
      return true;
    }

    // Subcategory matches for General Knowledge / India GS
    if (syllabusCategories.has('General Knowledge') && (
      testSubCanon === 'Indian History' || 
      testSubCanon === 'Indian Polity' || 
      testSubCanon === 'Indian Geography' || 
      testSubCanon === 'Indian Economy' ||
      testSubCanon === 'General Science'
    )) {
      return true;
    }
  }

  return false;
}
