try{importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js')}catch(e){}
const V='rpm-v5',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
if(r.method!=='GET')return;
if(u.hostname==='script.google.com'||u.hostname.endsWith('googleusercontent.com'))return;
e.respondWith(fetch(r).then(res=>{if(res&&res.ok&&(u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error()))))});
