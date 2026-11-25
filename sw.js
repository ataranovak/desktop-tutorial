// network first, so a new version shows up right away; cached copy when offline
const C='noa-v3';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','noa-192.png','noa-512.png'])))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  e.respondWith(fetch(r,{cache:r.mode==='navigate'||/index\.html|manifest|sw\.js/.test(r.url)?'no-cache':'default'}).then(res=>{if(res.ok&&(new URL(r.url).origin===location.origin||/jsdelivr/.test(r.url))){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
