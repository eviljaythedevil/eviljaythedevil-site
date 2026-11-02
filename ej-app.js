/* EvilJayTheDevil Show app: makes the site installable on Android (and Add to Home Screen on iPhone).
   Chrome on Android offers "Install app" by itself; the "Get the app" links below open the install prompt or show how. */
(function(){'use strict';
if('serviceWorker' in navigator)addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});
var deferred=null,app=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
addEventListener('beforeinstallprompt',function(e){deferred=e;});
addEventListener('appinstalled',function(){deferred=null;try{localStorage.setItem('ej_app','1');}catch(e){}});
function how(){var ios=/iP(hone|ad|od)/.test(navigator.userAgent),d=document.createElement('div');
 d.setAttribute('role','dialog');d.style.cssText='position:fixed;inset:0;z-index:95;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.65)';
 d.innerHTML='<div style="width:min(100%,380px);padding:20px;border:2px solid #c1121f;border-radius:18px;background:#0b0506;color:#f2efe9;font:400 1rem/1.5 Barlow,system-ui,sans-serif;text-align:center"><img src="/icon-192.png" alt="" width="72" height="72" style="border-radius:16px"><h3 style="margin:10px 0 6px;font-size:1.3rem">Get the EvilJay app</h3><p style="margin:0 0 14px;color:#ddd0cc">'+
  (ios?'Tap the Share button in Safari, then <b>Add to Home Screen</b>.':'Open the browser menu <b>⋮</b> and tap <b>Install app</b> (or <b>Add to Home screen</b>).')+'</p><button type="button" style="min-height:48px;padding:10px 22px;border:0;border-radius:12px;background:#c1121f;color:#fff;font-weight:800;cursor:pointer">GOT IT</button></div>';
 d.addEventListener('click',function(e){if(e.target===d||e.target.tagName==='BUTTON')d.remove();});document.body.appendChild(d);}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-ej-app]');if(!a)return;e.preventDefault();
 if(deferred){deferred.prompt();deferred.userChoice.finally(function(){deferred=null;});}else how();});
if(app)document.addEventListener('DOMContentLoaded',function(){[].forEach.call(document.querySelectorAll('[data-ej-app]'),function(a){a.style.display='none';});});
window.EJAPP={install:function(){if(deferred)deferred.prompt();else how();}};
})();
