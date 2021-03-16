const cacheName = "PWA-Covid19";
const staticAssets = [
  "/",
  "/about",
  "/contact",
  "./css/styles.css",
  "./app.js",
];

self.addEventListener("install", function (event) {
  console.log("Service Worker: Installing....");

  event.waitUntil(
    // Open the Cache
    caches.open(cacheName).then(function (cache) {
      console.log("Service Worker: Caching App Shell at the moment......");

      // Add Files to the Cache
      return cache.addAll(staticAssets);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("Service Worker: Activating....");

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (key) {
          if (key !== cacheName) {
            console.log("Service Worker: Removing Old Cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.clients.claim();

self.addEventListener("fetch", function (event) {
  console.log("Service Worker: Fetch", event.request.url);

  console.log("Url", event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
