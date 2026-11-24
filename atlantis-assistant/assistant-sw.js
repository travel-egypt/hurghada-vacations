
/* =====================================================
   ATLANTIS INTELLIGENCE V4
   Offline Service Worker
   Smart Updates & Model Cache Protection
   ===================================================== */

const VERSION = "v4";

const APP_CACHE = "atlantis-concierge-" + VERSION;
const LIB_CACHE = "atlantis-ai-libraries-v1";

const SCOPE = self.registration.scope;

const FILES = [
    "assistant.html",
    "assistant-knowledge.js",
    "assistant-ai.js",
    "assistant.webmanifest",
    "assistant-192.png",
    "assistant-512.png"
].map(file => new URL(file, SCOPE).href);

const LIBRARY_HOSTS = [
    "esm.run",
    "cdn.jsdelivr.net"
];

/* INSTALL */

self.addEventListener("install", event => {

    event.waitUntil((async () => {

        const cache = await caches.open(APP_CACHE);

        await cache.addAll(
            FILES.map(url =>
                new Request(url, {
                    cache: "reload"
                })
            )
        );

        await self.skipWaiting();

    })());

});

/* ACTIVATE */

self.addEventListener("activate", event => {

    event.waitUntil((async () => {

        const keys = await caches.keys();
        const libraryCache = await caches.open(LIB_CACHE);

        for (const key of keys) {

            if (
                key.startsWith("atlantis-concierge-") &&
                key !== APP_CACHE
            ) {

                const oldCache = await caches.open(key);
                const requests = await oldCache.keys();

                // Preserve previously downloaded libraries.
                for (const request of requests) {

                    const url = new URL(request.url);

                    if (LIBRARY_HOSTS.includes(url.hostname)) {

                        const response = await oldCache.match(request);

                        if (response) {
                            await libraryCache.put(
                                request,
                                response
                            );
                        }

                    }

                }

                // Remove outdated application files only.
                await caches.delete(key);

            }

        }

        // Do not delete WebLLM model caches or IndexedDB.

        await self.clients.claim();

    })());

});

/* APPLICATION FILES */

async function networkFirst(request, canonicalURL) {

    const cache = await caches.open(APP_CACHE);

    try {

        const response = await fetch(request, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Network response unavailable");
        }

        await cache.put(
            canonicalURL,
            response.clone()
        );

        return response;

    } catch (error) {

        const cached = await cache.match(canonicalURL);

        if (cached) {
            return cached;
        }

        return new Response(
            "Atlantis offline file unavailable.",
            {
                status: 503,
                headers: {
                    "Content-Type": "text/plain"
                }
            }
        );

    }

}

/* AI LIBRARIES */

async function libraryCacheFirst(request) {

    const cache = await caches.open(LIB_CACHE);

    const cached = await cache.match(request);

    if (cached) {
        return cached;
    }

    const response = await fetch(request);

    if (response.ok) {
        await cache.put(
            request,
            response.clone()
        );
    }

    return response;

}

/* FETCH ROUTER */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    const canonicalURL = url.origin + url.pathname;

    // Always prefer the latest Atlantis application files.
    if (FILES.includes(canonicalURL)) {

        event.respondWith(
            networkFirst(
                event.request,
                canonicalURL
            )
        );

        return;

    }

    // Preserve AI library resources for offline use.
    if (LIBRARY_HOSTS.includes(url.hostname)) {

        event.respondWith(
            libraryCacheFirst(event.request)
        );

        return;

    }

    // Leave model downloads and other requests untouched.

});

/* END — ATLANTIS INTELLIGENCE V4 */
