const CACHE = 'atlantis-site-phase4-cairo-v1';
const scope = new URL(self.registration.scope);
const offline = ['index.html','hurghada-price-guide.html','features/pocket-guide.html','atlantis-price-guide.webmanifest','features/atlantis-guide-icon.svg'];
self.addEventListener('install', event => event.waitUntil((async()=>{
 const c=await caches.open(CACHE);
 await Promise.allSettled(offline.map(async p=>{const u=new URL(p,scope);const r=await fetch(u,{cache:'reload'});if(r.ok)await c.put(u,r);}));
 await self.skipWaiting();
})()));
self.addEventListener('activate', event=>event.waitUntil((async()=>{
 for(const k of await caches.keys())if(k==='atlantis-price-guide-v1'||(k.startsWith('atlantis-site-')&&k!==CACHE))await caches.delete(k);
 await self.clients.claim();
})()));
self.addEventListener('fetch', event=>{
 const r=event.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==scope.origin||!u.pathname.startsWith(scope.pathname)||r.headers.has('Range')||/\.(mp4|webm|mov)$/i.test(u.pathname)||u.pathname.includes('/atlantis-assistant/'))return;
 if(!['document','script','style','image','manifest'].includes(r.destination)&&! /\.(html|js|css|webmanifest)$/i.test(u.pathname))return;
 event.respondWith((async()=>{
 const c=await caches.open(CACHE);
 try{const res=await fetch(r,{cache:'no-cache'});if(res.ok&&res.status===200){try{await c.put(r,res.clone());}catch(_){}}return res;}
 catch(_){const hit=await c.match(r);if(hit)return hit;if(r.mode==='navigate')return new Response('Atlantis: This page is not available offline. Please reconnect.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});return Response.error();}
 })());
});
