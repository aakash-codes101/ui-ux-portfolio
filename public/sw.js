self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A simple fetch handler is enough to pass the PWA criteria
  // We can just let the browser handle the fetch normally
  event.respondWith(fetch(event.request));
});
