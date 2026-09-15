const express = require('express');
const router = express.Router();
const { db } = require('../firebase-admin');
const { verifyStaffOrAdmin } = require('../middleware/verifyFirebaseToken');

const fs = require('fs');
const path = require('path');
const { runJobDeadlineScheduler, parseToIsoDate, getTodayIsoDate } = require('../services/jobAlertScheduler');

// Cache configuration to protect Firestore daily read quota
const NOTIFS_CACHE_PATH = path.join(__dirname, '../cache/notifications-cache.json');
let inMemoryNotifsCache = null;
let lastCacheFetchTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

function loadDiskCache() {
  try {
    if (fs.existsSync(NOTIFS_CACHE_PATH)) {
      const raw = fs.readFileSync(NOTIFS_CACHE_PATH, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.warn('[Notifications Disk Cache Read Warn]:', err.message);
  }
  return [];
}

function saveDiskCache(data) {
  try {
    const dir = path.dirname(NOTIFS_CACHE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(NOTIFS_CACHE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[Notifications Disk Cache Write Warn]:', err.message);
  }
}

// GET /api/notifications - Fetch public broadcast notifications (cached)
router.get('/', async (req, res) => {
  try {
    const todayStr = getTodayIsoDate();
    const now = Date.now();

    // Check in-memory cache first to avoid burning Firestore daily read quota
    if (!inMemoryNotifsCache || (now - lastCacheFetchTime > CACHE_TTL_MS)) {
      try {
        const snap = await db.collection('notifications')
          .orderBy('createdAt', 'desc')
          .limit(50)
          .get();
          
        inMemoryNotifsCache = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        lastCacheFetchTime = now;
        saveDiskCache(inMemoryNotifsCache);
      } catch (fsErr) {
        if (fsErr.code === 8 || (fsErr.message && fsErr.message.includes('RESOURCE_EXHAUSTED'))) {
          console.warn('[Notifications GET Firestore Warn]: Firestore daily quota exceeded. Falling back to cached notifications.');
        } else {
          console.warn('[Notifications GET Firestore Warn]:', fsErr.message);
        }
        
        // If in-memory cache is empty, load from disk cache
        if (!inMemoryNotifsCache || inMemoryNotifsCache.length === 0) {
          inMemoryNotifsCache = loadDiskCache();
        }
      }
    }

    const rawList = inMemoryNotifsCache || loadDiskCache() || [];
    const notifications = rawList.filter(notif => {
      // Filter out expired job deadline notifications (date < today)
      const lastDate = parseToIsoDate(notif.lastDate || notif.deadline || notif.expiryDate || notif.expiresAt);
      if (lastDate && lastDate < todayStr) {
        return false;
      }
      return true;
    });

    res.json({ success: true, notifications });
  } catch (err) {
    console.error('[Notifications GET Error]:', err.message);
    const fallback = loadDiskCache();
    res.json({ success: true, notifications: fallback });
  }
});

// POST /api/notifications/job-alerts/scan - Manually trigger job deadline scan & cleanup
router.post('/job-alerts/scan', async (req, res) => {
  try {
    const result = await runJobDeadlineScheduler();
    res.json(result);
  } catch (err) {
    console.error('[Job Deadline Scan Error]:', err.message);
    res.status(500).json({ error: 'Failed to scan job deadlines' });
  }
});

// POST /api/notifications/admin - Create a new notification broadcast (Admin/Staff)
router.post('/admin', verifyStaffOrAdmin('news'), async (req, res) => {
  try {
    const { title, message, type, actionUrl, actionText, pinned, targetExam, lastDate } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required.' });
    }

    const notifId = `notif_${Date.now()}`;
    const newNotif = {
      id: notifId,
      title: title.trim(),
      message: message.trim(),
      type: type || 'announcement', // notice | offer | announcement | update | job_deadline
      actionUrl: actionUrl || '',
      actionText: actionText || '',
      pinned: !!pinned,
      targetExam: targetExam || 'all',
      lastDate: lastDate || null,
      createdAt: new Date().toISOString(),
      createdBy: req.user.email || req.user.uid || 'Admin'
    };

    await db.collection('notifications').doc(notifId).set(newNotif);

    // Keep cache updated immediately
    if (!inMemoryNotifsCache) inMemoryNotifsCache = loadDiskCache();
    inMemoryNotifsCache.unshift(newNotif);
    lastCacheFetchTime = Date.now();
    saveDiskCache(inMemoryNotifsCache);

    res.json({ success: true, notification: newNotif, message: 'Notification broadcast published successfully!' });
  } catch (err) {
    console.error('[Admin Notification POST Error]:', err.message);
    res.status(500).json({ error: err.message || 'Failed to publish notification' });
  }
});

// DELETE /api/notifications/admin/:id - Delete notification broadcast (Admin/Staff)
router.delete('/admin/:id', verifyStaffOrAdmin('news'), async (req, res) => {
  try {
    const notifId = req.params.id;
    if (!notifId) return res.status(400).json({ error: 'Notification ID required' });

    await db.collection('notifications').doc(notifId).delete();

    // Keep cache updated immediately
    if (!inMemoryNotifsCache) inMemoryNotifsCache = loadDiskCache();
    inMemoryNotifsCache = inMemoryNotifsCache.filter(n => n.id !== notifId);
    saveDiskCache(inMemoryNotifsCache);

    res.json({ success: true, message: 'Notification deleted successfully.' });
  } catch (err) {
    console.error('[Admin Notification DELETE Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

module.exports = router;
