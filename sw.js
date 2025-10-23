const CACHE_NAME = 'kaloudasdev-links-v4';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    './assets/logo.webp',
    './assets/logo.webp',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.url.includes('kaloudasdev.gr') || 
        event.request.url.includes('github.com') ||
        event.request.url.includes('discord.com') ||
        event.request.url.includes('ko-fi.com') ||
        event.request.url.includes('kaloudasdev.github.io')) {
        return fetch(event.request);
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});
