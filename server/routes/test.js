const express = require('express');
const router = express.Router();
const { db } = require('../firebase-admin');
const ai = require('../services/aiManager');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');
const { aiRateLimiter } = require('../middleware/rateLimiter');

const { safeFirestoreQuery, invalidateCache } = require('../services/firestoreCache');

function getCanonicalSubject(rawSubject) {
  if (!rawSubject || typeof rawSubject !== 'string') return 'General Knowledge';
  let trimmed = rawSubject.trim().replace(/\s+/g, ' ');
  if (!trimmed) return 'General Knowledge';
  
  const lower = trimmed.toLowerCase();
  
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

const EXAM_DEFAULT_SYLLABUS_MAP = {
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

async function getExamSyllabusCategories(examId, explicitExamSubjects) {
  const categories = new Set();
  if (!examId) return categories;

  // 1. From passed explicitExamSubjects (comma-separated or array)
  if (explicitExamSubjects) {
    const list = Array.isArray(explicitExamSubjects) ? explicitExamSubjects : String(explicitExamSubjects).split(',');
    list.forEach(s => {
      const sName = (s || '').trim();
      if (!sName) return;
      const canonical = getCanonicalSubject(sName);
      categories.add(canonical);
      const sLower = sName.toLowerCase();
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
      if (sLower.includes('गणित') || sLower.includes('math') || sLower.includes('numeracy')) categories.add('Aptitude & Maths');
      if (sLower.includes('रीजनिंग') || sLower.includes('तर्क') || sLower.includes('मानसिक योग्यता')) categories.add('Reasoning');
      if (sLower.includes('कंप्यूटर') || sLower.includes('computer')) categories.add('Computer Knowledge');
      if (sLower.includes('हिंदी') || sLower.includes('hindi')) categories.add('Hindi Language');
      if (sLower.includes('english') || sLower.includes('अंग्रेजी')) categories.add('English Language');
      if (sLower.includes('छत्तीसगढ़ी') || sLower.includes('chhattisgarhi')) categories.add('Chhattisgarhi Language');
      if (sLower.includes('विज्ञान') || sLower.includes('science')) categories.add('General Science');
      if (sLower.includes('समसामयिक') || sLower.includes('current')) categories.add('Current Affairs');
      if (sLower.includes('बाल विकास') || sLower.includes('cdp') || sLower.includes('शिक्षाशास्त्र')) categories.add('Child Development & Pedagogy');
      if (sLower.includes('पर्यावरण') || sLower.includes('evs')) categories.add('Environment & Ecology');
    });
  }

  // 2. From Firestore syllabi doc (if custom exam or stored in Firestore)
  try {
    const docSnap = await safeFirestoreQuery(`syllabus_doc_${examId}`, async () => {
      const d = await db.collection('syllabi').doc(examId).get();
      return d.exists ? d.data() : null;
    }, null, 60 * 60 * 1000);

    if (docSnap && Array.isArray(docSnap.subjects)) {
      docSnap.subjects.forEach(s => {
        const sName = (s?.name || s?.nameHi || '').trim();
        if (!sName) return;
        const canonical = getCanonicalSubject(sName);
        categories.add(canonical);
        const sLower = sName.toLowerCase();
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
        if (sLower.includes('गणित') || sLower.includes('math')) categories.add('Aptitude & Maths');
        if (sLower.includes('रीजनिंग') || sLower.includes('तर्क')) categories.add('Reasoning');
        if (sLower.includes('कंप्यूटर') || sLower.includes('computer')) categories.add('Computer Knowledge');
        if (sLower.includes('हिंदी') || sLower.includes('hindi')) categories.add('Hindi Language');
        if (sLower.includes('english') || sLower.includes('अंग्रेजी')) categories.add('English Language');
        if (sLower.includes('छत्तीसगढ़ी') || sLower.includes('chhattisgarhi')) categories.add('Chhattisgarhi Language');
        if (sLower.includes('विज्ञान') || sLower.includes('science')) categories.add('General Science');
        if (sLower.includes('समसामयिक') || sLower.includes('current')) categories.add('Current Affairs');
        if (sLower.includes('बाल विकास') || sLower.includes('cdp')) categories.add('Child Development & Pedagogy');
        if (sLower.includes('पर्यावरण') || sLower.includes('evs')) categories.add('Environment & Ecology');
      });
    }
  } catch (_) {}

  // 3. From default built-in syllabus map
  if (EXAM_DEFAULT_SYLLABUS_MAP[examId]) {
    EXAM_DEFAULT_SYLLABUS_MAP[examId].forEach(cat => categories.add(cat));
  }

  return categories;
}

function isTestMatchingExam(test, examId, syllabusCategories) {
  if (!test) return false;
  if (!examId || examId === 'all' || examId === 'cgv_master') return true;

  // Direct exam assignment match
  if (test.examId === examId) return true;
  if (Array.isArray(test.examIds) && test.examIds.includes(examId)) return true;

  // If test is from CG VYAPAM BASICS pool (cgv_master)
  const isFromVyapamBasics = 
    test.examId === 'cgv_master' || 
    test.examName === 'CG VYAPAM BASICS' || 
    (Array.isArray(test.examIds) && test.examIds.includes('cgv_master'));

  if (isFromVyapamBasics) {
    const testSubCanon = getCanonicalSubject(test.subject || '');

    // Full syllabus / mixed mock tests match general competitive exams
    if (testSubCanon === 'Full Syllabus / All Subjects') {
      return true;
    }

    if (!syllabusCategories || syllabusCategories.size === 0) return true;

    // Direct category match
    if (syllabusCategories.has(testSubCanon)) return true;

    // Subcategory matches for CG GK
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

// GET /api/tests/subjects - list subject folders and test counts (lightweight for fast tab load)
router.get('/subjects', async (req, res) => {
  try {
    const { examId, mode, examSubjects } = req.query;
    const cacheKey = `test_subjects_${examId || 'all'}_${mode || 'all'}_v2`;

    const subjects = await safeFirestoreQuery(cacheKey, async () => {
      // 1. Load full base tests list
      const testsCacheKey = `tests_base_all_v2`;
      const allTests = await safeFirestoreQuery(testsCacheKey, async () => {
        const snapshot = await db.collection('tests').get();
        return snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: d.id,
            title: d.title || '',
            examId: d.examId,
            examIds: d.examIds || (d.examId ? [d.examId] : []),
            examName: d.examName,
            examNames: d.examNames || (d.examName ? [d.examName] : []),
            subject: d.subject || 'General Knowledge',
            mode: d.mode || 'quiz',
            language: d.language || 'hindi',
            totalQuestions: d.questions ? d.questions.length : (d.totalQuestions || 0),
            createdAt: d.createdAt
          };
        });
      }, []);

      // 2. Resolve exam syllabus categories
      const syllabusCategories = await getExamSyllabusCategories(examId, examSubjects);

      // 3. Filter tests matching this exam directly or via syllabus alignment
      let list = allTests;
      if (examId && examId !== 'all') {
        list = list.filter(t => isTestMatchingExam(t, examId, syllabusCategories));
      }

      const counts = {};
      list.forEach(t => {
        if (mode && t.mode !== mode) return;
        const sub = getCanonicalSubject(t.subject || 'General Knowledge');
        if (!counts[sub]) {
          counts[sub] = { subject: sub, count: 0, totalQuestions: 0, modes: new Set() };
        }
        counts[sub].count += 1;
        counts[sub].totalQuestions += (t.totalQuestions || 0);
        counts[sub].modes.add(t.mode);
      });

      return Object.values(counts).map(c => ({
        ...c,
        modes: Array.from(c.modes)
      })).sort((a, b) => b.count - a.count);
    }, []);

    res.json(subjects || []);
  } catch (err) {
    console.error('[Get Test Subjects Error]:', err.message);
    res.json([]);
  }
});

// GET /api/tests - list generated tests for current exam / subject
router.get('/', async (req, res) => {
  try {
    const { examId, subject, mode, examSubjects } = req.query;
    const cacheKey = `tests_${examId || 'all'}_${encodeURIComponent(subject || 'all')}_${mode || 'all'}_v2`;

    const tests = await safeFirestoreQuery(cacheKey, async () => {
      const testsCacheKey = `tests_base_all_v2`;
      let allTests = await safeFirestoreQuery(testsCacheKey, async () => {
        const snapshot = await db.collection('tests').get();
        return snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: d.id,
            title: d.title || '',
            examId: d.examId,
            examIds: d.examIds || (d.examId ? [d.examId] : []),
            examName: d.examName,
            examNames: d.examNames || (d.examName ? [d.examName] : []),
            subject: d.subject || 'General Knowledge',
            mode: d.mode || 'quiz',
            language: d.language || 'hindi',
            totalQuestions: d.questions ? d.questions.length : (d.totalQuestions || 0),
            createdAt: d.createdAt
          };
        });
      }, []);

      const syllabusCategories = await getExamSyllabusCategories(examId, examSubjects);

      let list = allTests;
      if (examId && examId !== 'all') {
        list = list.filter(t => isTestMatchingExam(t, examId, syllabusCategories));
      }

      if (mode) {
        list = list.filter(t => t.mode === mode);
      }

      if (subject && subject !== 'All') {
        const canonicalTarget = getCanonicalSubject(subject).toLowerCase();
        const subLower = subject.toLowerCase();
        list = list.filter(t => {
          const testSub = (t.subject || '').toLowerCase();
          const testCanonical = getCanonicalSubject(t.subject || '').toLowerCase();
          if (testSub === subLower || testCanonical === canonicalTarget || testCanonical === subLower || testSub === canonicalTarget) {
            return true;
          }
          // Subcategory inclusion: If user selects "CG GK", include subtopics like CG History, Geography, Culture, etc.
          if (canonicalTarget === 'cg gk' && (
            testCanonical === 'cg history' ||
            testCanonical === 'cg geography' ||
            testCanonical === 'cg culture & tribes' ||
            testCanonical === 'cg polity & governance' ||
            testCanonical === 'cg economy' ||
            testCanonical === 'cg government schemes'
          )) {
            return true;
          }
          // Subcategory inclusion: If user selects "General Knowledge", include Indian History, Polity, Geography, Economy, Science
          if (canonicalTarget === 'general knowledge' && (
            testCanonical === 'indian history' ||
            testCanonical === 'indian polity' ||
            testCanonical === 'indian geography' ||
            testCanonical === 'indian economy' ||
            testCanonical === 'general science'
          )) {
            return true;
          }
          return false;
        });
      }

      // Sort in-memory to avoid requiring a Firestore composite index
      list.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : 0;
        const dateB = b.createdAt ? new Date(b.createdAt) : 0;
        return dateB - dateA;
      });

      return list;
    }, []);

    res.json(tests || []);
  } catch (err) {
    console.error('[Get Tests Error]:', err.message);
    res.json([]);
  }
});

// GET /api/tests/:id - get questions of a specific test (cached)
router.get('/:id', async (req, res) => {
  try {
    const testId = req.params.id;
    const testData = await safeFirestoreQuery(`test_detail_${testId}`, async () => {
      const doc = await db.collection('tests').doc(testId).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    }, null, 60 * 60 * 1000); // 1 hour TTL for immutable test questions

    if (!testData) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.json(testData);
  } catch (err) {
    console.error('[Get Test Details Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch test details.' });
  }
});

const { fetchExamSyllabusContext } = require('../services/syllabusHelper');

// POST /api/tests/generate - generate a test for a user on-demand
router.post('/generate', verifyFirebaseToken, aiRateLimiter, async (req, res) => {
  try {
    const { examId, examName, subject, mode, language, subjects } = req.body;

    if (!examId || !examName) {
      return res.status(400).json({ error: 'examId and examName are required' });
    }

    const testMode = mode || 'quiz';
    const questionCount = testMode === 'mock' ? 25 : 5;
    const subjectName = subject || 'all';
    const lang = language || 'english';
    const examSubjects = subjects || [];

    console.log(`[User Test Gen] Generating ${testMode} (${questionCount} Qs) for ${examName} - ${subjectName}`);

    const syllabusContext = await fetchExamSyllabusContext(examId, subjectName);
    const result = await ai.generateTest(examId, examName, subjectName, testMode, questionCount, lang, examSubjects, syllabusContext);

    const timestamp = new Date().toISOString();
    const enrichedQuestions = result.questions.map((q, index) => {
      return {
        ...q,
        timestamp,
        subject: q.subject || subjectName || 'General Knowledge'
      };
    });

    const testId = `test_${Date.now()}`;
    const newTest = {
      id: testId,
      examId,
      examName,
      examIds: [examId],
      examNames: [examName],
      subject: subjectName,
      mode: testMode,
      language: lang,
      questions: enrichedQuestions,
      pattern: {
        totalQuestions: enrichedQuestions.length,
        totalMarks: enrichedQuestions.length * ((testMode === 'mock' || testMode === 'pyq') ? 2 : 1),
        durationMinutes: (testMode === 'mock' || testMode === 'pyq') ? 120 : 10,
        markingScheme: (testMode === 'mock' || testMode === 'pyq') ? '+2 for correct, -0.66 for incorrect' : '+1 for correct, 0 for incorrect'
      },
      createdAt: timestamp
    };

    // Save test to Firestore 'tests' collection
    await db.collection('tests').doc(testId).set(newTest);
    console.log(`[User Test Gen] Generated and saved test ${testId} ✅`);

    // Invalidate tests caches
    invalidateCache('tests_base_all_v2');
    invalidateCache('test_subjects_');
    invalidateCache('tests_');

    // Continuously save all generated questions to the 'questions' collection on the server
    const batch = db.batch();
    enrichedQuestions.forEach((q, index) => {
      const questionId = `q_${testId}_${index}`;
      const qRef = db.collection('questions').doc(questionId);
      batch.set(qRef, {
        id: questionId,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        subject: q.subject,
        timestamp: q.timestamp,
        examId,
        examName,
        examIds: [examId],
        examNames: [examName],
        testId,
        mode: testMode,
        language: lang
      });
    });
    await batch.commit();
    console.log(`[User Test Gen] Saved ${enrichedQuestions.length} individual questions to questions collection ✅`);

    res.json({
      success: true,
      test: newTest
    });
  } catch (err) {
    console.error('[User Test Gen Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to generate test questions. Please try again.' });
  }
});

module.exports = router;
