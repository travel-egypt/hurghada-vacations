
const CACHE = 'atlantis-site-v20261127-09';
const scope = new URL(self.registration.scope);

const offline = [
  'index.html',
  'hurghada.html',
  'hurghada-price-guide.html',
  'features/pocket-guide.html',
  'atlantis-price-guide.webmanifest',
  'features/atlantis-guide-icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);

    await Promise.allSettled(
      offline.map(async path => {
        const url = new URL(path, scope);

        const response = await fetch(url, {
          cache: 'no-store'
        });

        if (response.ok) {
          await cache.put(url, response);
        }
      })
    );

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key =>
          key === 'atlantis-price-guide-v1' ||
          (
            key.startsWith('atlantis-site-') &&
            key !== CACHE
          )
        )
        .map(key => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== 'GET' ||
    url.origin !== scope.origin ||
    !url.pathname.startsWith(scope.pathname) ||
    request.headers.has('Range') ||
    /\.(mp4|webm|mov)$/i.test(url.pathname) ||
    url.pathname.includes('/atlantis-assistant/')
  ) {
    return;
  }

  const isPage = request.mode === 'navigate' ||
    /\.(html|js|css|webmanifest)$/i.test(url.pathname);

  const isAsset = [
    'document',
    'script',
    'style',
    'image',
    'manifest'
  ].includes(request.destination);

  if (!isPage && !isAsset) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);

    try {
      const response = await fetch(request, {
        cache: isPage ? 'no-store' : 'no-cache'
      });

      if (response.ok && response.status === 200) {
        try {
          await cache.put(request, response.clone());
        } catch (_) {}
      }

      return response;

    } catch (_) {
      const cached = await cache.match(request);

      if (cached) return cached;

      if (request.mode === 'navigate') {
        return new Response(
          'Atlantis: Please reconnect to the internet.',
          {
            status: 503,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8'
            }
          }
        );
      }

      return Response.error();
    }
  })());
});
