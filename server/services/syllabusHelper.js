const { db } = require('../firebase-admin');
const { getTrainingData, getRelevantTrainingData } = require('./trainingData');

/**
 * Fetch official syllabus document and verified textbook training facts
 * for a specific examId and subject.
 */
async function fetchExamSyllabusContext(examId, subjectName = 'all') {
  if (!examId) return null;
  try {
    const doc = await db.collection('syllabi').doc(examId).get();
    let syllabusData = null;
    if (doc.exists) {
      syllabusData = doc.data();
    }

    let scopeLines = [];
    let matchedSubjects = [];

    if (syllabusData && Array.isArray(syllabusData.subjects)) {
      syllabusData.subjects.forEach(sub => {
        const sName = sub.name || sub.nameHi || '';
        const topicNames = [];
        if (Array.isArray(sub.chapters)) {
          sub.chapters.forEach(chap => {
            if (Array.isArray(chap.topics)) {
              chap.topics.forEach(top => {
                if (top.name || top.nameHi) {
                  topicNames.push(top.nameHi || top.name);
                }
              });
            }
          });
        }

        const isSubjectMatch = subjectName === 'all' || 
          subjectName === 'mixed' ||
          sName.toLowerCase().includes(subjectName.toLowerCase()) || 
          subjectName.toLowerCase().includes(sName.toLowerCase());

        if (isSubjectMatch && topicNames.length > 0) {
          matchedSubjects.push(sName);
          scopeLines.push(`• SUBJECT: [${sName}]\n  Official Topics: ${topicNames.slice(0, 30).join(', ')}`);
        }
      });
    }

    // Fetch verified textbook reference facts from trainingData
    let verifiedKnowledge = '';
    try {
      const allTraining = await getTrainingData();
      if (allTraining && allTraining.length > 0) {
        const queryText = `${examId} ${matchedSubjects.join(' ')} ${subjectName !== 'all' ? subjectName : ''}`;
        verifiedKnowledge = getRelevantTrainingData(queryText, allTraining);
      }
    } catch (tErr) {
      console.warn('[SyllabusHelper Training Fetch Warning]:', tErr.message);
    }

    return {
      examId,
      examName: syllabusData?.name || syllabusData?.nameHi || examId,
      matchedSubjects,
      scopeText: scopeLines.length > 0 ? scopeLines.join('\n') : '',
      verifiedKnowledge
    };
  } catch (err) {
    console.error(`[fetchExamSyllabusContext Error for ${examId}]:`, err.message);
    return null;
  }
}

module.exports = { fetchExamSyllabusContext };
