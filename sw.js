// ParcView Service Worker v1
const CACHE = 'parcview-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Gérer les notifications push reçues
self.addEventListener('push', e => {
  let data = { title: 'ParcView', body: 'Nouvelle alerte' };
  try { data = e.data.json(); } catch {}
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: data.tag || 'parcview',
      requireInteraction: false,
      vibrate: [200, 100, 200]
    })
  );
});

// Clic sur la notification → ouvrir l'appli
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cls => {
      if (cls.length > 0) return cls[0].focus();
      return clients.openWindow('/');
    })
  );
});
