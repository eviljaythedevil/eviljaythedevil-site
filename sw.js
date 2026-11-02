/* EvilJayTheDevil Show app: lets the site install as an app on Android and shows a friendly page when offline.
   Pages always load fresh from the network; only the offline page and the app icons are kept on the phone. */
var V='ej-app-v1',KEEP=['/offline.html','/icon-192.png','/icon-512.png','/apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(KEEP);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V;}).map(function(n){return caches.delete(n);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){if(e.request.mode!=='navigate')return;
 e.respondWith(fetch(e.request).catch(function(){return caches.match('/offline.html');}));});
