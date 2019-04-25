const cacheName = "v4",
      whiteList = [
        "./",
        "./css/style.css"
      ];

console.log("sw.js");


self.addEventListener("install", event => {
  // it won't wait for tabs to stop using the old version before it takes over.
  // If you refresh the page now, the new version should activate immediately.
  if (self.skipWaiting) { self.skipWaiting(); }

  console.log("installing");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(whiteList);
    })
  )
});

self.addEventListener("activate", event => {
  console.log("activate....");
})

// next phase
self.addEventListener("fetch", event => {
  //console.log("fetching...", event.request.url, cacheName);

  event.respondWith(
    caches.match(event.request).then(response => {
      if(response) {
        console.log("using cache for ", event.request.url);
        return response;
      }

      console.log("fetching ", event.request.url, cacheName);
      return fetch(event.request);
    })
  )
})
