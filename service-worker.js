
"use strict";

const CACHE_NAME = "atlantis-pocket-guide-v1";

const BASE = new URL("./", self.registration.scope);

const CORE_FILES = [
  new URL("features/pocket-guide.html", BASE).href,
  new URL("manifest.webmanifest", BASE).href,
  new URL("pocket-guide-icon.svg", BASE).href
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const guideURL = new URL("features/pocket-guide.html", BASE).href;

  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, copy);
            });
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;

          const guide = await caches.match(guideURL);
          if (guide) return guide;

          return new Response("You are offline. Please reconnect and open the guide once.", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" }
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
