// Garigliano 1944 · Vue terrain — fonctionnement hors ligne.
// Fichiers de l'appli : réseau d'abord, sans cache HTTP (GitHub Pages garde les pages 10 min), avec repli sur la copie locale après 4 s ou sans réseau.
// Tuiles et polices : copie locale d'abord. Ne touche qu'aux caches de cette appli (préfixe), pour cohabiter avec les autres applis du même site.
const P='garigliano44-', C=P+'app-v1', TILES=P+'tuiles-v1';
const FILES=['./','index.html','data.js','manifest.json','icon.svg','garigliano-1944.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith(P)&&x!==C&&x!==TILES).map(x=>caches.delete(x)))));self.clients.claim();});
const net=(r,ms)=>new Promise((ok,ko)=>{const t=setTimeout(()=>ko(new Error('délai')),ms);fetch(r,{cache:'no-cache'}).then(x=>{clearTimeout(t);ok(x);},x=>{clearTimeout(t);ko(x);});});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(u.hostname.endsWith('open-meteo.com')) return; // altitudes : toujours en ligne
  if(u.origin===location.origin){
    e.respondWith(net(r,4000).then(res=>{ if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));} return res; })
      .catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||(r.mode==='navigate'?caches.match('index.html'):Response.error()))));
    return;
  }
  const tile=u.hostname.endsWith('tile.opentopomap.org'), font=u.hostname.includes('fonts.g');
  if(!tile&&!font) return;
  e.respondWith(caches.match(r.url).then(hit=>{
    if(hit) return hit; // requête CORS pour obtenir une réponse lisible et stockable (pas de réponse opaque)
    return fetch(r.url,{mode:'cors'}).then(res=>{ if(res.ok){const cp=res.clone();caches.open(tile?TILES:C).then(c=>c.put(r.url,cp));} return res; }).catch(()=>fetch(r));
  }));
});
