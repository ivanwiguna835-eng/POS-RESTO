const CACHE = 'bintang-shell-v2'
const APP_SHELL = ['/', '/index.html', '/manifest.json', '/icon.svg']
self.addEventListener('install', (event) => { event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL))); self.skipWaiting() })
self.addEventListener('activate', (event) => { event.waitUntil(self.clients.claim()) })
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.hostname === 'localhost' && url.port === '5173') return
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(event.request, copy)); return response }).catch(() => caches.match('/'))))
})