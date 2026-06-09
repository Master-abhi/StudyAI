const express = require('express');
const router = express.Router();
const multer = require('multer');
const { admin, db, bucket } = require('../firebase-admin');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// --- Public OTP routes (for Fallback Sign Up verification) ---
router.post('/send-otp', async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile || !/^\d{10}$/.test(mobile.trim())) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number' });
    }
    const cleanMobile = mobile.trim();
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await db.collection('otps').doc(cleanMobile).set({
      otp: otpCode,
      expiresAt: admin.firestore.Timestamp.fromDate(expiresAt),
      verified: false,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`[OTP SIGNUP] Generated OTP for mobile: ${cleanMobile} -> Code: ${otpCode}`);

    res.json({
      success: true,
      demoOtp: otpCode
    });
  } catch (err) {
    console.error('[Send OTP] Error:', err.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) {
      return res.status(400).json({ error: 'Mobile number and OTP are required' });
    }
    const cleanMobile = mobile.trim();
    const cleanOtp = otp.trim();

    const otpDoc = await db.collection('otps').doc(cleanMobile).get();
    if (!otpDoc.exists) {
      return res.status(400).json({ error: 'No OTP requested for this mobile number' });
    }

    const data = otpDoc.data();
    const now = new Date();
    const expiresAt = data.expiresAt.toDate();

    if (now > expiresAt) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    if (data.otp !== cleanOtp) {
      return res.status(400).json({ error: 'Invalid OTP code. Please try again.' });
    }

    await db.collection('otps').doc(cleanMobile).update({
      verified: true,
      verifiedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ success: true });
  } catch (err) {
    console.error('[Verify OTP] Error:', err.message);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');
router.use(verifyFirebaseToken);

const MAX_TEST_RESULTS = 50;
const MAX_POINTS = 1000000;
const MAX_MCQS_SOLVED = 1000000;
const MAX_STREAK = 5000;
const MAX_EXAMS = 100;
const MAX_ITEMS_PER_EXAM = 2000;

function clampInteger(value, min, max) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.min(Math.max(Math.trunc(value), min), max);
}

function cleanString(value, maxLength) {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  if (!cleaned) return null;
  return cleaned.slice(0, maxLength);
}

function cleanExamId(value) {
  const cleaned = cleanString(value, 80);
  if (!cleaned || !/^[a-zA-Z0-9_-]+$/.test(cleaned)) return null;
  return cleaned;
}

function cleanStreak(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const count = clampInteger(value.count, 0, MAX_STREAK);
  const lastDate = cleanString(value.lastDate, 10);
  if (count === null) return null;
  return {
    count,
    lastDate: lastDate && /^\d{4}-\d{2}-\d{2}$/.test(lastDate) ? lastDate : ''
  };
}

function cleanQuestions(questions) {
  if (!Array.isArray(questions)) return [];
  return questions.map((q) => {
    if (!q || typeof q !== 'object' || Array.isArray(q)) return null;
    return {
      id: cleanString(q.id, 80) || '',
      question: cleanString(q.question, 1000) || '',
      options: Array.isArray(q.options) ? q.options.map(o => cleanString(o, 500)).filter(Boolean) : [],
      correctIndex: clampInteger(q.correctIndex, 0, 10) ?? 0,
      explanation: cleanString(q.explanation, 2000) || '',
      subject: cleanString(q.subject, 120) || '',
      difficulty: cleanString(q.difficulty, 20) || 'medium',
      weightage: cleanString(q.weightage, 20) || 'medium',
      isCgSpecific: typeof q.isCgSpecific === 'boolean' ? q.isCgSpecific : false,
      examRelevance: cleanString(q.examRelevance, 200) || ''
    };
  }).filter(Boolean);
}

function cleanTestResults(value) {
  if (!Array.isArray(value)) return null;
  return value.slice(-MAX_TEST_RESULTS).map((result) => {
    if (!result || typeof result !== 'object' || Array.isArray(result)) return null;
    const correct = clampInteger(result.correct, 0, 1000);
    const wrong = clampInteger(result.wrong, 0, 1000);
    const skipped = clampInteger(result.skipped, 0, 1000);
    const percent = clampInteger(result.percent, 0, 100);
    
    // calculate total and score defaults if missing
    let total = clampInteger(result.total, 0, 1000);
    if (total === null && correct !== null && wrong !== null) {
      total = correct + wrong + (skipped ?? 0);
    }
    let score = clampInteger(result.score, 0, total ?? 1000);
    if (score === null && correct !== null) {
      score = correct;
    }

    const dateStr = cleanString(result.date, 50) || cleanString(result.timestamp, 50) || new Date().toISOString();
    const examId = cleanString(result.exam, 100) || '';
    const subjectName = cleanString(result.subject, 100) || '';
    const studyMode = cleanString(result.mode, 30) || 'quiz';

    const cleanQuestionsList = cleanQuestions(result.questions);
    const cleanUserAnswers = Array.isArray(result.userAnswers)
      ? result.userAnswers.map(ans => clampInteger(ans, 0, 10)).filter((ans) => ans !== null)
      : [];

    return {
      date: dateStr,
      timestamp: dateStr,
      exam: examId,
      subject: subjectName,
      mode: studyMode,
      score: score ?? 0,
      correct: correct ?? score ?? 0,
      wrong: wrong ?? 0,
      skipped: skipped ?? 0,
      total: total ?? 0,
      percent: percent ?? 0,
      questions: cleanQuestionsList,
      userAnswers: cleanUserAnswers
    };
  }).filter(Boolean);
}

function cleanNestedObject(value, leafCleaner) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;

  const output = {};
  for (const [examId, examValue] of Object.entries(value).slice(0, MAX_EXAMS)) {
    const cleanId = cleanExamId(examId);
    if (!cleanId || !examValue || typeof examValue !== 'object' || Array.isArray(examValue)) continue;

    const cleanExamValue = {};
    for (const [key, itemValue] of Object.entries(examValue).slice(0, MAX_ITEMS_PER_EXAM)) {
      const cleanKey = cleanString(key, 120);
      if (!cleanKey) continue;
      const cleanedItem = leafCleaner(itemValue);
      if (cleanedItem !== null) cleanExamValue[cleanKey] = cleanedItem;
    }

    output[cleanId] = cleanExamValue;
  }

  return output;
}

function cleanSubjectScore(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const count = clampInteger(value.count, 0, 10000) ?? 0;
  const totalScore = clampInteger(value.totalScore, 0, count * 100) ?? 0;
  const lastScore = clampInteger(value.lastScore, 0, 100) ?? 0;
  const bestScore = clampInteger(value.bestScore, 0, 100) ?? 0;
  const worstScore = clampInteger(value.worstScore, 0, 100) ?? 0;
  const recentScores = Array.isArray(value.recentScores)
    ? value.recentScores
      .map((score) => clampInteger(score, 0, 100))
      .filter((score) => score !== null)
      .slice(-5)
    : [];

  return {
    totalScore,
    count,
    lastScore,
    bestScore,
    worstScore,
    recentScores
  };
}

router.get('/data', async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.user.uid).get();
    res.json(doc.exists ? doc.data() : {});
  } catch (err) {
    console.error('[User Data] Read error:', err.message);
    res.status(500).json({ error: 'Failed to load user data' });
  }
});

router.post('/sync', async (req, res) => {
  try {
    // Enforce email verification check disabled to allow sync before verification
    // const signInProvider = req.user.firebase && req.user.firebase.sign_in_provider;
    // if (signInProvider === 'password' && req.user.email_verified !== true) {
    //   return res.status(403).json({ error: 'Please verify your email address before syncing data.' });
    // }

    const { testResults, points, mcqsSolved, streak, subjects, progress, selectedExam, mobile, displayName, email, username, photoURL } = req.body;

    const update = {};
    const cleanResults = cleanTestResults(testResults);
    const cleanPoints = clampInteger(points, 0, MAX_POINTS);
    const cleanMcqsSolved = clampInteger(mcqsSolved, 0, MAX_MCQS_SOLVED);
    const cleanStreakValue = cleanStreak(streak);
    const cleanSubjects = cleanNestedObject(subjects, cleanSubjectScore);
    const cleanProgress = cleanNestedObject(progress, (value) => value === true ? true : null);
    const cleanSelectedExam = cleanExamId(selectedExam);
    const cleanMobile = cleanString(mobile, 20);
    const cleanDisplayName = cleanString(displayName, 80);
    const cleanEmail = cleanString(email, 120);
    const cleanUsername = cleanString(username, 50);
    const cleanPhotoURL = cleanString(photoURL, 2083);

    if (cleanResults) update.testResults = cleanResults;
    if (cleanPoints !== null) update.points = cleanPoints;
    if (cleanMcqsSolved !== null) update.mcqsSolved = cleanMcqsSolved;
    if (cleanStreakValue) update.streak = cleanStreakValue;
    if (cleanSubjects) update.subjects = cleanSubjects;
    if (cleanProgress) update.progress = cleanProgress;
    if (cleanSelectedExam) update.selectedExam = cleanSelectedExam;
    if (cleanPhotoURL) update.photoURL = cleanPhotoURL;
    if (cleanMobile) {
      const userDoc = await db.collection('users').doc(req.user.uid).get();
      const currentMobile = userDoc.exists ? userDoc.data().mobile : null;

      if (cleanMobile !== currentMobile) {
        let verified = false;

        // Check 1: Check if verified in Firebase Auth token claims
        const firebasePhone = req.user.phone_number;
        let normalizedMobile = cleanMobile;
        if (!normalizedMobile.startsWith('+')) {
          normalizedMobile = `+91${normalizedMobile}`;
        }
        if (firebasePhone === normalizedMobile) {
          verified = true;
        }

        // Check 2: Check fallback internal OTP verification in Firestore
        if (!verified) {
          const otpDoc = await db.collection('otps').doc(cleanMobile).get();
          if (otpDoc.exists && otpDoc.data().verified === true) {
            verified = true;
          }
        }

        update.mobileVerified = verified;
      }
      update.mobile = cleanMobile;
    }
    if (cleanDisplayName) update.displayName = cleanDisplayName;
    if (cleanEmail) update.email = cleanEmail;
    if (cleanUsername) update.username = cleanUsername;

    update.updatedAt = admin.firestore.FieldValue.serverTimestamp();

    if (Object.keys(update).length <= 1) {
      return res.json({ success: true, skipped: true });
    }

    await db.collection('users').doc(req.user.uid).set(update, { merge: true });
    res.json({ success: true });
  } catch (err) {
    console.error('[User Sync] Error:', err.message);
    res.status(500).json({ error: 'Sync failed' });
  }
});

router.get('/ranking', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const userScores = [];
    const currentUid = req.user.uid;
    let currentUserIncluded = false;

    usersSnapshot.forEach(doc => {
      const data = doc.data();
      const points = data.points !== undefined ? data.points : 0;
      const displayName = data.displayName || data.email?.split('@')[0] || 'Aspirant';
      
      if (doc.id === currentUid) {
        currentUserIncluded = true;
      }

      userScores.push({
        uid: doc.id,
        displayName: displayName,
        points: points,
        photoURL: data.photoURL || ''
      });
    });

    if (!currentUserIncluded) {
      const displayName = req.user.name || req.user.email?.split('@')[0] || 'Aspirant';
      userScores.push({
        uid: currentUid,
        displayName: displayName,
        points: 0,
        photoURL: ''
      });
    }

    // Sort users by points descending
    userScores.sort((a, b) => b.points - a.points);

    // Find the rank of the current user
    const userIndex = userScores.findIndex(u => u.uid === currentUid);
    const rank = userIndex !== -1 ? userIndex + 1 : userScores.length + 1;
    const totalUsers = Math.max(userScores.length, 1);

    // Count following for current user
    const currentUserDoc = await db.collection('users').doc(currentUid).get();
    const followingCount = currentUserDoc.exists && Array.isArray(currentUserDoc.data().following) 
      ? currentUserDoc.data().following.length 
      : 0;

    // Count followers for current user
    const followersSnapshot = await db.collection('users').where('following', 'array-contains', currentUid).get();
    const followersCount = followersSnapshot.size;

    res.json({
      rank: rank,
      totalUsers: totalUsers,
      leaderboard: userScores.slice(0, 5), // return top 5
      followersCount,
      followingCount
    });
  } catch (err) {
    console.error('[User Ranking] Error:', err.message);
    res.status(500).json({ error: 'Failed to calculate rankings' });
  }
});

// GET /api/user/profile/:uid - Fetch public profile of a user
router.get('/profile/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const data = userDoc.data();
    
    // Check if the current user is following this user
    const currentUserDoc = await db.collection('users').doc(req.user.uid).get();
    const followingList = currentUserDoc.exists ? (currentUserDoc.data().following || []) : [];
    const isFollowing = followingList.includes(uid);

    // Count followers
    const followersSnapshot = await db.collection('users').where('following', 'array-contains', uid).get();
    const followersCount = followersSnapshot.size;
    const followingCount = Array.isArray(data.following) ? data.following.length : 0;

    res.json({
      uid,
      displayName: data.displayName || 'Aspirant',
      photoURL: data.photoURL || '',
      points: data.points || 0,
      streak: data.streak?.count || 0,
      mcqsSolved: data.mcqsSolved || 0,
      testsCount: Array.isArray(data.testResults) ? data.testResults.length : 0,
      isFollowing,
      followersCount,
      followingCount,
      plan: data.plan || 'free'
    });
  } catch (err) {
    console.error('[Public Profile] Error:', err.message);
    res.status(500).json({ error: 'Failed to load public profile' });
  }
});

// POST /api/user/follow - Toggle follow/unfollow a user
router.post('/follow', async (req, res) => {
  try {
    const { targetUid } = req.body;
    if (!targetUid || targetUid === req.user.uid) {
      return res.status(400).json({ error: 'Invalid target user' });
    }

    const currentUserRef = db.collection('users').doc(req.user.uid);
    const currentUserDoc = await currentUserRef.get();
    if (!currentUserDoc.exists) {
      return res.status(404).json({ error: 'Current user not found' });
    }

    const following = currentUserDoc.data().following || [];
    let isFollowingNow = false;

    if (following.includes(targetUid)) {
      // Unfollow
      await currentUserRef.update({
        following: admin.firestore.FieldValue.arrayRemove(targetUid)
      });
      isFollowingNow = false;
    } else {
      // Follow
      await currentUserRef.update({
        following: admin.firestore.FieldValue.arrayUnion(targetUid)
      });
      isFollowingNow = true;
    }

    res.json({ success: true, isFollowing: isFollowingNow });
  } catch (err) {
    console.error('[Follow Toggle] Error:', err.message);
    res.status(500).json({ error: 'Failed to update follow status' });
  }
});

// POST /api/user/upload-avatar - Upload user avatar to Firebase Storage
router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file.' });
    }

    const fileExtension = req.file.originalname.split('.').pop() || 'png';
    const storageFileName = `avatars/avatar-${req.user.uid}-${Date.now()}.${fileExtension}`;
    const fileRef = bucket.file(storageFileName);

    await fileRef.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
        userId: req.user.uid
      }
    });

    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '01-01-2099'
    });

    // Update the user's document in Firestore with this photoURL
    await db.collection('users').doc(req.user.uid).set({
      photoURL: url,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    res.json({
      success: true,
      photoURL: url
    });
  } catch (err) {
    console.error('[Upload Avatar Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to upload profile image.' });
  }
});

// POST /api/user/feedback - User submits app feedback
router.post('/feedback', async (req, res) => {
  try {
    const { feedback } = req.body;
    if (!feedback || typeof feedback !== 'string' || !feedback.trim()) {
      return res.status(400).json({ error: 'Feedback message is required' });
    }

    const cleanFeedback = feedback.trim().slice(0, 2000);
    const feedbackId = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await db.collection('feedbacks').doc(feedbackId).set({
      id: feedbackId,
      uid: req.user.uid,
      email: req.user.email || '',
      displayName: req.user.name || req.user.displayName || 'Aspirant',
      feedback: cleanFeedback,
      createdAt: new Date().toISOString()
    });

    res.json({ success: true, message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('[Feedback Submit] Error:', err.message);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// GET /api/user/badges - Fetch all configured badges/achievements
router.get('/badges', async (req, res) => {
  try {
    const snapshot = await db.collection('badges').orderBy('createdAt', 'asc').get();
    
    // If the badges collection is empty, seed it with default achievements
    if (snapshot.empty) {
      console.log('[Badges] Collection is empty. Seeding default achievements...');
      const defaultBadges = [
        {
          id: 'first_step',
          name: 'First Step',
          desc: 'Complete your first practice test.',
          criteriaType: 'tests',
          criteriaValue: 1,
          icon: 'Rocket',
          emoji: '🚀',
          color: 'from-blue-500/15 to-indigo-500/15 border-blue-500/25 text-blue-400',
          createdAt: new Date().toISOString()
        },
        {
          id: 'streak_3',
          name: 'Consistency King',
          desc: 'Maintain a study streak of 3+ days.',
          criteriaType: 'streak',
          criteriaValue: 3,
          icon: 'Flame',
          emoji: '🔥',
          color: 'from-orange-500/15 to-red-500/15 border-orange-500/25 text-orange-400',
          createdAt: new Date(Date.now() + 1000).toISOString()
        },
        {
          id: 'mcq_50',
          name: 'Practice Guru',
          desc: 'Solve 50 or more practice questions.',
          criteriaType: 'mcqs',
          criteriaValue: 50,
          icon: 'BookOpen',
          emoji: '📖',
          color: 'from-amber-500/15 to-yellow-500/15 border-amber-500/25 text-yellow-400',
          createdAt: new Date(Date.now() + 2000).toISOString()
        },
        {
          id: 'accuracy_75',
          name: 'Accuracy Master',
          desc: 'Achieve over 75% average test accuracy.',
          criteriaType: 'accuracy',
          criteriaValue: 75,
          icon: 'Target',
          emoji: '🎯',
          color: 'from-emerald-500/15 to-teal-500/15 border-emerald-500/25 text-emerald-400',
          createdAt: new Date(Date.now() + 3000).toISOString()
        },
        {
          id: 'syllabus_50',
          name: 'Scholar',
          desc: 'Acquire 500+ XP points in study sessions.',
          criteriaType: 'xp',
          criteriaValue: 500,
          icon: 'Award',
          emoji: '🏅',
          color: 'from-purple-500/15 to-pink-500/15 border-purple-500/25 text-purple-400',
          createdAt: new Date(Date.now() + 4000).toISOString()
        }
      ];

      const batch = db.batch();
      defaultBadges.forEach(badge => {
        const docRef = db.collection('badges').doc(badge.id);
        batch.set(docRef, badge);
      });
      await batch.commit();

      return res.json(defaultBadges);
    }

    const badges = snapshot.docs.map(doc => doc.data());
    res.json(badges);
  } catch (err) {
    console.error('[Get Badges Error]:', err.message);
    res.status(500).json({ error: 'Failed to retrieve achievements.' });
  }
});

module.exports = router;

