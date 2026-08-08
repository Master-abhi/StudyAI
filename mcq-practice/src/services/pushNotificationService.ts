import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';

export const isCapacitorNative = (): boolean => {
  return typeof window !== 'undefined' && 
         (window as any).Capacitor !== undefined && 
         typeof (window as any).Capacitor.isNativePlatform === 'function' &&
         (window as any).Capacitor.isNativePlatform();
};

/**
 * Request notification permissions for both Web Browsers and Native Capacitor App
 */
export const requestPushNotificationPermission = async (): Promise<boolean> => {
  try {
    if (isCapacitorNative()) {
      // Capacitor Native Platform (Android / iOS)
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
      // Web Browser Notification API
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
  icon: string = '/pwa-192x192.png',
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
      // Trigger Native Android Status Bar Notification via Capacitor
      const hasPerm = await LocalNotifications.checkPermissions();
      if (hasPerm.display === 'granted') {
        const idNum = Math.floor(Math.abs(hashString(notifHash)) % 2147483647);
        await LocalNotifications.schedule({
          notifications: [
            {
              id: idNum,
              title: title,
              body: body,
              schedule: { at: new Date(Date.now() + 100) },
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
