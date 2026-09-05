/* Service Worker for CG Guru Web Push & Background Notifications */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle Background Push Notifications
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: '🔔 CG Guru Alert', message: event.data.text() };
    }
  }

  const title = data.title || '🔔 CG Guru Notification';
  const options = {
    body: data.message || data.body || 'New announcement available!',
    icon: data.icon || '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.actionUrl || data.url || '/'
    },
    tag: data.id || `cgguru_${Date.now()}`
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Periodic Background Sync (Check for new notifications when browser wakes up)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-notifications') {
    event.waitUntil(checkBackgroundNotifications());
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'check-notifications-sync') {
    event.waitUntil(checkBackgroundNotifications());
  }
});

async function checkBackgroundNotifications() {
  try {
    const res = await fetch('/api/notifications');
    if (!res.ok) return;
    const data = await res.json();
    const notifs = data.notifications || [];
    if (notifs.length > 0) {
      const latest = notifs[0];
      await self.registration.showNotification(latest.title || '🔔 CG Guru Notification', {
        body: latest.message || 'New announcement available!',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        data: { url: latest.actionUrl || '/tests' },
        tag: latest.id
      });
    }
  } catch (err) {
    console.warn('[SW Background Sync Warning]:', err);
  }
}

// Handle Client Messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, icon, url, id } = event.data;
    self.registration.showNotification(title, {
      body,
      icon: icon || '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: url || '/' },
      tag: id || `cgguru_${Date.now()}`
    });
  }
});

// Handle Notification Click Action (Open App & Navigate to Target)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          if ('navigate' in client) {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
