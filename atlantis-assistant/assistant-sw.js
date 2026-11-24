/* ATLANTIS INTELLIGENCE V5 — Offline & versioned updates */
'use strict';
const APP_CACHE = 'atlantis-concierge-v5';
const LIB_CACHE = 'atlantis-ai-libraries-v1';
const SCOPE = self.registration.scope;
const FILES = ['assistant.html','assistant-knowledge.js','assistant-ai.js','assistant.webmanifest','assistant-192.png','assistant-512.png'].map(f => new URL(f,SCOPE).href);
const LIBRARY_HOSTS = new Set(['esm.run','cdn.jsdelivr.net']);

// Install a complete application snapshot before activating it.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(APP_CACHE);
    await cache.addAll(FILES.map(url => new Request(url,{cache:'reload'})));
    // Let existing tabs finish before switching versions.
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const libraryCache = await caches.open(LIB_CACHE);
    for (const key of await caches.keys()) {
      if (!key.startsWith('atlantis-concierge-') || key === APP_CACHE) continue;
      const old = await caches.open(key);
      for (const request of await old.keys()) {
        if (!LIBRARY_HOSTS.has(new URL(request.url).hostname)) continue;
        const response = await old.match(request);
        if (response && !(await libraryCache.match(request))) {
          try { await libraryCache.put(request,response); }
          catch (error) { console.warn('Atlantis: retaining previous cache',error); }
        }
      }
      // Keep older snapshots for recovery; never delete model caches or IndexedDB.
    }
    await self.clients.claim();
  })());
});

async function appSnapshot(request, canonicalURL) {
  const cache = await caches.open(APP_CACHE);
  const cached = await cache.match(canonicalURL);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      try { await cache.put(canonicalURL,response.clone()); } catch (_) {}
    }
    return response;
  } catch (_) {
    return new Response('Atlantis offline file unavailable.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }
}

async function libraryCacheFirst(request) {
  const cache = await caches.open(LIB_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  // Recover libraries from older Atlantis caches if necessary.
  for (const key of await caches.keys()) {
    if (!key.startsWith('atlantis-concierge-') || key === APP_CACHE) continue;
    const old = await caches.open(key);
    const previous = await old.match(request);
    if (previous) return previous;
  }
  const response = await fetch(request);
  if (response.ok && response.status !== 206) {
    try { await cache.put(request,response.clone()); } catch (_) {}
  }
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('Range')) return;
  const url = new URL(request.url);
  const canonicalURL = url.origin + url.pathname;
  if (FILES.includes(canonicalURL)) {
    event.respondWith(appSnapshot(request,canonicalURL));
  } else if (LIBRARY_HOSTS.has(url.hostname)) {
    event.respondWith(libraryCacheFirst(request));
  }
  // WebLLM model downloads and all unrelated requests remain untouched.
});
