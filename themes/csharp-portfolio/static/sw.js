// Service Worker for C# Portfolio Theme
// Provides offline caching and performance optimization

const CACHE_NAME = "csharp-portfolio-v1";
const STATIC_CACHE_URLS = [
	"/",
	"/css/main.css",
	"/js/bundle.js",
	"/offline.html",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(STATIC_CACHE_URLS);
			})
			.then(() => {
				return self.skipWaiting();
			})
	);
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames
						.filter((cacheName) => cacheName !== CACHE_NAME)
						.map((cacheName) => caches.delete(cacheName))
				);
			})
			.then(() => {
				return self.clients.claim();
			})
	);
});

// Fetch event - serve from cache with network fallback
self.addEventListener("fetch", (event) => {
	// Skip non-GET requests
	if (event.request.method !== "GET") {
		return;
	}

	// Skip external requests
	if (!event.request.url.startsWith(self.location.origin)) {
		return;
	}

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse;
			}

			return fetch(event.request)
				.then((response) => {
					// Don't cache non-successful responses
					if (
						!response ||
						response.status !== 200 ||
						response.type !== "basic"
					) {
						return response;
					}

					// Clone the response for caching
					const responseToCache = response.clone();

					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, responseToCache);
					});

					return response;
				})
				.catch(() => {
					// Return offline page for navigation requests
					if (event.request.mode === "navigate") {
						return caches.match("/offline.html");
					}
				});
		})
	);
});
