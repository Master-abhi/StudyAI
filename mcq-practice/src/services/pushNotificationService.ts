import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';

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
        name: 'CG Guru Alerts & Job Updates',
        description: 'Notifications for tests, new job alerts, exams and announcements',
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
      const localPerm = await LocalNotifications.requestPermissions();
      if (localPerm.display === 'granted') {
        try {
          await PushNotifications.requestPermissions();
          await PushNotifications.register();
        } catch (e) {
          console.warn('[Capacitor Push Register Warning]:', e);
        }
        return true;
      }
      return false;
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

      // Trigger Native Android Status Bar Notification via Capacitor
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
              console.log('[Web Push] Displayed system status bar notification via Service Worker');
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
        console.log('[Web Push] Displayed direct browser notification');
      }
    }
  } catch (err) {
    console.error('[Send Push Notification Error]:', err);
  }
};

/**
 * Schedules recurring daily background notifications in Android's AlarmManager
 * so that notifications arrive even when the app is completely closed!
 */
export const scheduleRecurringReminders = async () => {
  if (!isCapacitorNative()) return;

  try {
    await ensureNotificationChannel();
    const hasPerm = await LocalNotifications.checkPermissions();
    if (hasPerm.display !== 'granted') return;

    // Check if daily reminder is already scheduled
    const pending = await LocalNotifications.getPending();
    const hasDaily = pending.notifications.some(n => n.id === 99901);

    if (!hasDaily) {
      const nextMorning = new Date();
      nextMorning.setHours(9, 0, 0, 0);
      if (nextMorning.getTime() <= Date.now()) {
        nextMorning.setDate(nextMorning.getDate() + 1);
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 99901,
            title: '🎯 CG Guru: Daily Practice Alert',
            body: 'Naye tests aur current affairs updates live hain. Apni daily study complete karein!',
            channelId: 'cgguru_alerts',
            schedule: {
              at: nextMorning,
              repeats: true,
              every: 'day'
            },
            extra: { url: '/tests' }
          }
        ]
      });
      console.log('[Native Push] Daily 9 AM reminder scheduled in Android AlarmManager ✅');
    }
  } catch (err) {
    console.warn('[Schedule Recurring Reminder Error]:', err);
  }
};

/**
 * Schedules future job deadline alerts into Android's AlarmManager
 * so user gets alerted on the deadline day even if the app is closed!
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

      // Calculate 9:00 AM on deadline date
      const deadlineDate = new Date(deadlineStr);
      deadlineDate.setHours(9, 0, 0, 0);

      const alertId = Math.floor(Math.abs(hashString(`deadline_${notif.id}`)) % 2147483647);

      if (deadlineDate.getTime() > nowMs && !pendingIds.has(alertId)) {
        scheduledAlerts.push({
          id: alertId,
          title: `⚠️ Last Date Today: ${notif.title}`,
          body: notif.message || 'Today is the last date to apply. Check details now!',
          channelId: 'cgguru_alerts',
          schedule: { at: deadlineDate },
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
