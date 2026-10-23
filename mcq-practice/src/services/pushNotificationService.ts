import { LocalNotifications } from '@capacitor/local-notifications';

export const isCapacitorNative = (): boolean => {
  return typeof window !== 'undefined' && 
         (window as any).Capacitor !== undefined && 
         typeof (window as any).Capacitor.isNativePlatform === 'function' &&
         (window as any).Capacitor.isNativePlatform();
};

/**
 * Ensure Android Notification Channel exists with High Importance (Android 8.0+)
 */
export const ensureNotificationChannel = async () => {
  if (isCapacitorNative()) {
    try {
      await LocalNotifications.createChannel({
        id: 'cgguru_alerts',
        name: 'CG Guru Alerts & Study Reminders',
        description: 'Notifications for tests, practice streaks, exams and job alerts',
        importance: 5, // IMPORTANCE_HIGH (makes sound and shows banner)
        visibility: 1, // VISIBILITY_PUBLIC (visible on lockscreen)
        vibration: true,
        sound: 'default'
      });
      console.log('[Native Push] Notification channel cgguru_alerts verified ✅');
    } catch (e) {
      console.warn('[Native Push] createChannel error:', e);
    }
  }
};

/**
 * Request notification permissions for both Web Browsers and Native Capacitor App
 */
export const requestPushNotificationPermission = async (): Promise<boolean> => {
  try {
    if (isCapacitorNative()) {
      await ensureNotificationChannel();
      let granted = false;
      try {
        const localPerm = await LocalNotifications.requestPermissions();
        if (localPerm.display === 'granted') granted = true;
      } catch (permErr) {
        console.warn('[LocalNotifications requestPermissions Warning]:', permErr);
      }

      return granted;
    } else if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        return true;
      }
      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
    }
  } catch (err) {
    console.error('[Push Permission Request Error]:', err);
  }
  return false;
};

let pushListenersInitialized = false;

/**
 * Initializes Native Local Notification click listeners and deep links
 */
export const initNativePushNotifications = async (_apiUrl?: string) => {
  if (!isCapacitorNative() || pushListenersInitialized) return;
  pushListenersInitialized = true;

  try {
    await ensureNotificationChannel();

    // Setup Local Notification Action Listener (deep link navigation when user taps banner)
    try {
      await LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
        const targetUrl = action.notification.extra?.url;
        console.log('[Local Notification Clicked]:', targetUrl);
        if (targetUrl && typeof window !== 'undefined') {
          window.location.href = targetUrl;
        }
      });
    } catch (err) {
      console.warn('[LocalNotification Click Listener Error]:', err);
    }
  } catch (err) {
    console.warn('[initNativePushNotifications Error]:', err);
  }
};

/**
 * Motivational Notification templates for rolling background alarms
 */
const MOTIVATIONAL_MORNING_MESSAGES = [
  {
    title: '☀️ CG Guru: आज का Daily MCQ Test तैयार है!',
    body: '10 मिनट अभ्यास करें और अपनी तैयारी जांचें। आपकी मेहनत ही आपकी रैंक तय करेगी! 🎯',
    url: '/tests'
  },
  {
    title: '🏆 Target CG Exams: रोज़ 15 मिनट अभ्यास',
    body: 'नियमित अभ्यास करने वाले छात्र ही मेरिट लिस्ट में आते हैं। आज का टेस्ट अभी शुरू करें!',
    url: '/tests'
  },
  {
    title: '📚 CG GK & Current Affairs Live',
    body: 'नए महत्वपूर्ण प्रश्न अपडेट हो चुके हैं। 5 सवाल हल करके अपनी तैयारी परखें ⚡',
    url: '/tests'
  },
  {
    title: '🔥 Daily Practice Streak जारी रखें!',
    body: 'आज का क्विज़ हल करें और अपनी लगातार पढ़ाई की स्ट्रीक को आगे बढ़ाएं 🚀',
    url: '/tests'
  },
  {
    title: '💡 Exam Preparation Booster',
    body: 'सिलेबस के अनुसार महत्वपूर्ण MCQs उपलब्ध हैं। अपनी कमज़ोरियों को मज़बूती में बदलें!',
    url: '/syllabus'
  },
  {
    title: '⚡ Quick 5-Minute Challenge',
    body: 'क्या आप आज 5 में से 5 सही उत्तर दे सकते हैं? टेस्ट शुरू करें और खुद को चुनौती दें!',
    url: '/tests'
  },
  {
    title: '📝 Weekly Practice & Revision',
    body: 'सप्ताह भर की तैयारी का आंकलन करें। CG Guru पर नया फुल लेंथ मॉक टेस्ट दें 🌟',
    url: '/tests'
  }
];

const MOTIVATIONAL_EVENING_MESSAGES = [
  {
    title: '🔥 Streak Alert: आज का अभ्यास बाकी है!',
    body: 'सोने से पहले 5 मिनट में आज का टेस्ट पूरा करें और अपनी डेली स्ट्रीक टूटने न दें ⏳',
    url: '/tests'
  },
  {
    title: '🧠 Evening Revision: दिनभर की पढ़ाई का टेस्ट लें',
    body: 'आज जो भी पढ़ा, उसके 10 प्रश्न हल करके देखें कितना याद रहा! 🎯',
    url: '/tests'
  },
  {
    title: '⚡ 5-Minute Quick Quiz Break',
    body: 'दिनभर की थकान के बाद 5 आसान सवालों का जवाब देकर अपना स्कोर और रैंक सुधारें 🏆',
    url: '/tests'
  },
  {
    title: '🎯 CG Guru Mock Test Series',
    body: 'हज़ारों छात्र अभ्यास कर रहे हैं। अपनी राज्य स्तरीय रैंक देखने के लिए टेस्ट दें!',
    url: '/tests'
  },
  {
    title: '📖 सोने से पहले 1 छोटा टेस्ट',
    body: 'हर रोज़ का छोटा प्रयास ही परीक्षा के दिन बड़ी रैंक दिलाता है। शुभ रात्रि अभ्यास करें ✨',
    url: '/tests'
  },
  {
    title: '🔥 Daily Practice: Streak Protection',
    body: 'सिर्फ 5 मिनट निकालें, सवाल हल करें और अपनी तैयारी को सबसे आगे रखें 🚀',
    url: '/tests'
  },
  {
    title: '📊 अपनी रैंक और प्रगति देखें',
    body: 'सप्ताह की तैयारी का विश्लेषण करें और कल के लिए नया टारगेट सेट करें!',
    url: '/tests'
  }
];

/**
 * Schedules a rolling 7-day queue of background motivational notifications
 * directly into Android's AlarmManager.
 * These notifications ring and show banners EVEN WHEN THE APP IS COMPLETELY CLOSED!
 */
export const setupBackgroundMotivationalNotifications = async () => {
  if (!isCapacitorNative()) return;

  try {
    await ensureNotificationChannel();
    const hasPerm = await LocalNotifications.checkPermissions();
    if (hasPerm.display !== 'granted') return;

    const pending = await LocalNotifications.getPending();
    const pendingIds = new Set(pending.notifications.map(n => n.id));

    const scheduledList: any[] = [];
    const now = new Date();

    // Schedule 7 days of morning (8:30 AM) and evening (7:30 PM) reminders
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      // 1. Morning Reminder (8:30 AM)
      const morningDate = new Date(now);
      morningDate.setDate(morningDate.getDate() + dayOffset);
      morningDate.setHours(8, 30, 0, 0);

      const morningId = 81000 + (dayOffset * 2) + 1;
      if (morningDate.getTime() > now.getTime() + 60000 && !pendingIds.has(morningId)) {
        const morningTemplate = MOTIVATIONAL_MORNING_MESSAGES[dayOffset % MOTIVATIONAL_MORNING_MESSAGES.length];
        scheduledList.push({
          id: morningId,
          title: morningTemplate.title,
          body: morningTemplate.body,
          channelId: 'cgguru_alerts',
          schedule: { 
            at: morningDate,
            allowWhileIdle: true
          },
          sound: 'default',
          extra: { url: morningTemplate.url }
        });
      }

      // 2. Evening Reminder (7:30 PM)
      const eveningDate = new Date(now);
      eveningDate.setDate(eveningDate.getDate() + dayOffset);
      eveningDate.setHours(19, 30, 0, 0);

      const eveningId = 81000 + (dayOffset * 2) + 2;
      if (eveningDate.getTime() > now.getTime() + 60000 && !pendingIds.has(eveningId)) {
        const eveningTemplate = MOTIVATIONAL_EVENING_MESSAGES[dayOffset % MOTIVATIONAL_EVENING_MESSAGES.length];
        scheduledList.push({
          id: eveningId,
          title: eveningTemplate.title,
          body: eveningTemplate.body,
          channelId: 'cgguru_alerts',
          schedule: { 
            at: eveningDate,
            allowWhileIdle: true
          },
          sound: 'default',
          extra: { url: eveningTemplate.url }
        });
      }
    }

    if (scheduledList.length > 0) {
      await LocalNotifications.schedule({ notifications: scheduledList });
      console.log(`[Native Push] Queued ${scheduledList.length} motivational reminders in Android AlarmManager for next 7 days ✅`);
    }
  } catch (err) {
    console.warn('[Setup Background Notifications Error]:', err);
  }
};

/**
 * Backward compatibility alias
 */
export const scheduleRecurringReminders = setupBackgroundMotivationalNotifications;

/**
 * Schedules future job deadline alerts into Android's AlarmManager
 * so user gets alerted before and on the deadline day even if the app is closed!
 */
export const scheduleJobDeadlineNotifications = async (notifs: any[]) => {
  if (!isCapacitorNative() || !Array.isArray(notifs)) return;

  try {
    await ensureNotificationChannel();
    const hasPerm = await LocalNotifications.checkPermissions();
    if (hasPerm.display !== 'granted') return;

    const pending = await LocalNotifications.getPending();
    const pendingIds = new Set(pending.notifications.map(n => n.id));

    const scheduledAlerts: any[] = [];
    const nowMs = Date.now();

    for (const notif of notifs) {
      const deadlineStr = notif.lastDate || notif.deadline || notif.expiresAt;
      if (!deadlineStr) continue;

      // 1. Day of deadline at 9:00 AM
      const deadlineDate = new Date(deadlineStr);
      deadlineDate.setHours(9, 0, 0, 0);
      const alertId = Math.floor(Math.abs(hashString(`deadline_${notif.id}`)) % 2147483647);

      if (deadlineDate.getTime() > nowMs && !pendingIds.has(alertId)) {
        scheduledAlerts.push({
          id: alertId,
          title: `⚠️ Last Date Today: ${notif.title}`,
          body: notif.message || 'Today is the last date to apply. Check details now!',
          channelId: 'cgguru_alerts',
          schedule: { 
            at: deadlineDate,
            allowWhileIdle: true
          },
          sound: 'default',
          extra: { url: notif.actionUrl || '/jobs' }
        });
      }

      // 2. 2 Days before deadline at 11:00 AM
      const twoDaysBefore = new Date(deadlineDate);
      twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);
      twoDaysBefore.setHours(11, 0, 0, 0);
      const alert2DaysId = Math.floor(Math.abs(hashString(`deadline_2d_${notif.id}`)) % 2147483647);

      if (twoDaysBefore.getTime() > nowMs && !pendingIds.has(alert2DaysId)) {
        scheduledAlerts.push({
          id: alert2DaysId,
          title: `⏳ सिर्फ 2 दिन शेष: ${notif.title}`,
          body: 'अंतिम तिथि नज़दीक है। जल्द आवेदन करें और विवरण देखें!',
          channelId: 'cgguru_alerts',
          schedule: { 
            at: twoDaysBefore,
            allowWhileIdle: true
          },
          sound: 'default',
          extra: { url: notif.actionUrl || '/jobs' }
        });
      }
    }

    if (scheduledAlerts.length > 0) {
      await LocalNotifications.schedule({ notifications: scheduledAlerts });
      console.log(`[Native Push] Scheduled ${scheduledAlerts.length} future deadline alerts in Android AlarmManager ✅`);
    }
  } catch (err) {
    console.warn('[Schedule Job Deadlines Error]:', err);
  }
};

/**
 * Register Service Worker for Web Push & Background Status Bar Notifications
 */
export const registerServiceWorker = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && !isCapacitorNative()) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      console.log('[Service Worker] Successfully registered:', reg.scope);

      // Register Periodic Background Sync if supported (for background notifications when closed)
      if ('periodicSync' in reg) {
        try {
          const status = await (navigator as any).permissions.query({
            name: 'periodic-background-sync' as any
          });
          if (status.state === 'granted') {
            await (reg as any).periodicSync.register('check-notifications', {
              minInterval: 6 * 60 * 60 * 1000 // Every 6 hours
            });
            console.log('[Service Worker] Periodic background sync registered ✅');
          }
        } catch (e) {}
      }

      return reg;
    } catch (err) {
      console.warn('[Service Worker Registration Fail]:', err);
    }
  }
  return null;
};

/**
 * Triggers a System Push Notification directly to the Device Status Bar / Notification Center
 * (Used for immediate alerts when desired)
 */
export const sendSystemPushNotification = async (
  title: string,
  body: string,
  icon: string = '/icon-192.png',
  url: string = '/jobs',
  notifIdStr?: string
) => {
  const notifHash = notifIdStr || `push_${title.replace(/\s+/g, '_')}_${body.substring(0, 15)}`;

  // Prevent duplicate push notifications for the same alert
  if (typeof window !== 'undefined') {
    const pushedAlerts = JSON.parse(localStorage.getItem('examprep_pushed_alerts') || '[]');
    if (pushedAlerts.includes(notifHash)) {
      return;
    }
    pushedAlerts.push(notifHash);
    if (pushedAlerts.length > 100) pushedAlerts.shift();
    localStorage.setItem('examprep_pushed_alerts', JSON.stringify(pushedAlerts));
  }

  try {
    if (isCapacitorNative()) {
      await ensureNotificationChannel();

      let hasPerm = await LocalNotifications.checkPermissions();
      if (hasPerm.display !== 'granted') {
        hasPerm = await LocalNotifications.requestPermissions();
      }

      if (hasPerm.display === 'granted') {
        const idNum = Math.floor(Math.abs(hashString(notifHash)) % 2147483647);
        await LocalNotifications.schedule({
          notifications: [
            {
              id: idNum,
              title: title,
              body: body,
              channelId: 'cgguru_alerts',
              schedule: { at: new Date(Date.now() + 200) },
              sound: 'default',
              attachments: [],
              actionTypeId: '',
              extra: { url }
            }
          ]
        });
        console.log('[Native Push] Triggered native status bar notification:', title);
        return;
      }
    }

    // Web Browser Push Notification
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.ready;
            if (registration && typeof registration.showNotification === 'function') {
              await registration.showNotification(title, {
                body,
                icon,
                badge: icon,
                vibrate: [200, 100, 200],
                data: { url },
                tag: notifHash
              } as any);
              return;
            }
          } catch (swErr) {
            console.warn('[Service Worker showNotification error]:', swErr);
          }
        }

        // Direct Browser Notification Fallback
        const n = new Notification(title, {
          body,
          icon,
          tag: notifHash
        });
        n.onclick = () => {
          window.focus();
          if (url) window.location.href = url;
          n.close();
        };
      }
    }
  } catch (err) {
    console.error('[Send Push Notification Error]:', err);
  }
};

/**
 * Helper string hashing function for numerical ID generation
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Plays a short, pleasant notification chime using Web Audio API (Zero asset dependencies)
 */
export const playNotificationChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    
    // First note (pleasant bell chime: G5 -> C6)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(783.99, now); // G5
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.2, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // Second higher note (C6)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1046.50, now + 0.12); // C6
    gain2.gain.setValueAtTime(0, now + 0.12);
    gain2.gain.linearRampToValueAtTime(0.25, now + 0.14);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.5);
  } catch (e) {
    // Audio context not allowed or failed, silently catch
  }
};
