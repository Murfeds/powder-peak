// Powder Peak service worker: plays offline from the saved copy; a new version installs in the background
var V='pp-c20592f942';
var FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES);}));});
self.addEventListener('message',function(e){if(e.data==='skip')self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(hit){return hit||fetch(r).then(function(res){
    if(res&&(res.ok||res.type==='opaque')&&(r.url.indexOf(self.location.origin)===0||r.url.indexOf('fonts.g')>0)){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp);});}
    return res;}).catch(function(){return caches.match('index.html');});}));});
