const { db } = require('../firebase-admin');

/**
 * Parses date string (e.g. "2026-08-08", "08-08-2026", "2026-08-08T12:00:00Z") into standard YYYY-MM-DD string
 */
function parseToIsoDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const clean = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;
  
  // Try ISO parse
  const d = new Date(clean);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0];
  }
  
  // Try DD-MM-YYYY format
  const parts = clean.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (parts) {
    const day = parts[1].padStart(2, '0');
    const month = parts[2].padStart(2, '0');
    const year = parts[3];
    return `${year}-${month}-${day}`;
  }

  return null;
}

/**
 * Gets today's date in YYYY-MM-DD format (IST timezone aware)
 */
function getTodayIsoDate() {
  const now = new Date();
  // Adjust for IST UTC+5:30
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);
  return istDate.toISOString().split('T')[0];
}

/**
 * Runs the automated job deadline alert scan & expired notification cleanup
 */
async function runJobDeadlineScheduler() {
  console.log('[Job Deadline Scheduler] Running job deadline alert scan & expired notification cleanup...');
  const todayStr = getTodayIsoDate();
  console.log(`[Job Deadline Scheduler] Today IST Date: ${todayStr}`);

  let createdAlertsCount = 0;
  let deletedExpiredCount = 0;

  try {
    // 1. AUTO CLEANUP EXPIRED NOTIFICATIONS (date < today)
    const notifsSnap = await db.collection('notifications').get();
    const batchDelete = db.batch();
    let hasDeleteOps = false;

    notifsSnap.docs.forEach(doc => {
      const data = doc.data();
      const lastDate = parseToIsoDate(data.lastDate || data.deadline || data.expiryDate || data.expiresAt);

      // If notification has a last date / expiry date and it is in the past (< todayStr)
      if (lastDate && lastDate < todayStr) {
        console.log(`[Job Deadline Scheduler] Deleting expired notification: "${data.title}" (Expired on ${lastDate})`);
        batchDelete.delete(doc.ref);
        deletedExpiredCount++;
        hasDeleteOps = true;
      }
    });

    if (hasDeleteOps) {
      await batchDelete.commit();
      console.log(`[Job Deadline Scheduler] Successfully deleted ${deletedExpiredCount} expired notifications from Firestore ✅`);
    }

    // 2. FETCH ALL JOBS & SCAN FOR DEADLINES EXPIRING TODAY OR SOON
    let articles = [];
    try {
      const cacheDoc = await db.collection('news').doc('cache').get();
      if (cacheDoc.exists && Array.isArray(cacheDoc.data()?.articles)) {
        articles = cacheDoc.data().articles;
      }
    } catch (e) {
      console.warn('[Job Deadline Scheduler] Error reading news cache from Firestore:', e.message);
    }

    // Also fetch from news_articles collection if available
    try {
      const articlesSnap = await db.collection('news_articles')
        .where('category', 'in', ['jobs', 'job', 'job_alert', 'recruitment'])
        .get();
      
      const firestoreJobs = articlesSnap.docs.map(d => d.data());
      articles = [...articles, ...firestoreJobs];
    } catch (e) {
      // Ignore if query fails
    }

    // Deduplicate jobs by title
    const seenTitles = new Set();
    const uniqueJobs = articles.filter(art => {
      const title = (art.title || art.title_hi || '').trim();
      if (!title || seenTitles.has(title.toLowerCase())) return false;
      seenTitles.add(title.toLowerCase());
      return true;
    });

    // Check deadlines for each job
    const notifBatch = db.batch();
    let hasNotifOps = false;

    // Get existing notifications to avoid duplicate alerts
    const existingNotifSnap = await db.collection('notifications').get();
    const existingTitlesSet = new Set(existingNotifSnap.docs.map(d => (d.data().title || '').toLowerCase()));
    const existingJobIdsSet = new Set(existingNotifSnap.docs.map(d => d.data().jobId || ''));

    for (const job of uniqueJobs) {
      const lastDate = parseToIsoDate(job.lastDate || job.last_date || job.deadline);
      if (!lastDate) continue;

      const title = job.title_hi || job.title;
      const dept = job.department || job.dept || job.organization || job.board || 'सरकारी विभाग';
      const posts = job.totalPosts || job.posts || job.vacancies || '';

      // Check if job deadline is TODAY
      if (lastDate === todayStr) {
        const notifTitle = `⚠️ LAST DATE ALERT: ${title}`;
        const jobIdKey = job.id || job.url || title;

        // Check if alert already sent for this job today
        if (existingTitlesSet.has(notifTitle.toLowerCase()) || existingJobIdsSet.has(jobIdKey)) {
          continue;
        }

        const notifId = `deadline_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const notifDocRef = db.collection('notifications').doc(notifId);

        const newNotif = {
          id: notifId,
          jobId: jobIdKey,
          title: notifTitle,
          message: `🚨 आज (${lastDate}) फॉर्म भरने की अंतिम तिथि है! [${dept}] ${posts ? `(${posts})` : ''} के लिए तुरंत आवेदन करें ताकि मौका न छूटे!`,
          type: 'job_deadline',
          actionUrl: job.url || '/jobs',
          actionText: 'Apply Now',
          lastDate: lastDate,
          expiresAt: lastDate,
          pinned: true,
          targetExam: 'all',
          createdAt: new Date().toISOString(),
          createdBy: 'Auto Job Deadline Bot'
        };

        notifBatch.set(notifDocRef, newNotif);
        createdAlertsCount++;
        hasNotifOps = true;
        console.log(`[Job Deadline Scheduler] Created LAST DATE alert for: "${title}" (Deadline: ${lastDate})`);
      }
    }

    if (hasNotifOps) {
      await notifBatch.commit();
      console.log(`[Job Deadline Scheduler] Published ${createdAlertsCount} new job deadline alerts to Firestore ✅`);
    }

    return {
      success: true,
      createdAlertsCount,
      deletedExpiredCount,
      scannedTodayDate: todayStr
    };
  } catch (err) {
    console.error('[Job Deadline Scheduler Error]:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Initializes background interval trigger (runs every 1 hour)
 */
function initJobAlertScheduler() {
  console.log('[Job Deadline Scheduler] Initializing automated job deadline scheduler (hourly interval)...');
  
  // Run once immediately on startup after 5 seconds delay
  setTimeout(() => {
    runJobDeadlineScheduler().catch(err => console.error('[Job Deadline Scheduler Startup Run Error]:', err));
  }, 5000);

  // Run every 1 hour (3600000 ms)
  setInterval(() => {
    runJobDeadlineScheduler().catch(err => console.error('[Job Deadline Scheduler Periodic Run Error]:', err));
  }, 3600000);
}

module.exports = {
  runJobDeadlineScheduler,
  initJobAlertScheduler,
  getTodayIsoDate,
  parseToIsoDate
};
