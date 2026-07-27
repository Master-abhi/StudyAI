const express = require('express');
const router = express.Router();
const { db } = require('../firebase-admin');
const { verifyStaffOrAdmin } = require('../middleware/verifyFirebaseToken');

// GET /api/notifications - Fetch public broadcast notifications
router.get('/', async (req, res) => {
  try {
    let notifications = [];
    
    try {
      const snap = await db.collection('notifications')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
        
      notifications = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (fsErr) {
      console.warn('[Notifications GET Firestore Warn]:', fsErr.message);
    }

    res.json({ success: true, notifications });
  } catch (err) {
    console.error('[Notifications GET Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// POST /api/notifications/admin - Create a new notification broadcast (Admin/Staff)
router.post('/admin', verifyStaffOrAdmin('news'), async (req, res) => {
  try {
    const { title, message, type, actionUrl, actionText, pinned, targetExam } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required.' });
    }

    const notifId = `notif_${Date.now()}`;
    const newNotif = {
      id: notifId,
      title: title.trim(),
      message: message.trim(),
      type: type || 'announcement', // notice | offer | announcement | update
      actionUrl: actionUrl || '',
      actionText: actionText || '',
      pinned: !!pinned,
      targetExam: targetExam || 'all',
      createdAt: new Date().toISOString(),
      createdBy: req.user.email || req.user.uid || 'Admin'
    };

    await db.collection('notifications').doc(notifId).set(newNotif);

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
    res.json({ success: true, message: 'Notification deleted successfully.' });
  } catch (err) {
    console.error('[Admin Notification DELETE Error]:', err.message);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

module.exports = router;
