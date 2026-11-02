/* App install prompt for EvilJayTheDevil Show. Registers the app worker, then on phones offers "Download the app" at the start. */
(function(){'use strict';var C={"name": "EvilJayTheDevil Show", "key": "ej_appprompt", "sw": "/sw.js", "icon": "/icon-192.png", "title": "Download the EvilJay app", "sub": "Free \u00b7 on your home screen \u00b7 opens full screen, like any app", "cta": "DOWNLOAD APP", "accent": "#e01b2b", "accent2": "#6a0b2a", "bg": "linear-gradient(180deg,#1a0609,#0b0506)", "border": "#c1121f88", "font": "Barlow,system-ui,sans-serif", "link": "[data-ej-app],[data-app]", "delay": 1200, "pages": null};if(window.__appPrompt)return;window.__appPrompt=1;
if('serviceWorker' in navigator)addEventListener('load',function(){navigator.serviceWorker.register(C.sw).catch(function(){});});
var deferred=null,standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;});
addEventListener('appinstalled',function(){deferred=null;S('i',1);close();});
function L(k){try{return JSON.parse(localStorage.getItem(C.key)||'{}')[k];}catch(e){return null;}}
function S(k,v){try{var o=JSON.parse(localStorage.getItem(C.key)||'{}');o[k]=v;localStorage.setItem(C.key,JSON.stringify(o));}catch(e){}}
var ios=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
var ua=navigator.userAgent,inapp=/Instagram|FBAN|FBAV|FB_IAB|Snapchat|TikTok|musical_ly|Line\/|Twitter|LinkedInApp|GSA\//.test(ua);
var phone=(matchMedia('(pointer:coarse)').matches&&Math.min(screen.width,screen.height)<900)||/Android|iPhone|iPod/.test(navigator.userAgent);
var A=C.accent,B=C.accent2;
var CSS='#appSheet{position:fixed;left:0;right:0;bottom:0;z-index:2147483600;display:flex;justify-content:center;padding:0 12px calc(12px + env(safe-area-inset-bottom));pointer-events:none;font-family:'+C.font+'}'+
'#appSheet .s{pointer-events:auto;width:min(100%,440px);padding:16px;border-radius:20px;background:'+C.bg+';border:1px solid '+C.border+';box-shadow:0 24px 70px rgba(0,0,0,.75);color:#fff;transform:translateY(130%);transition:transform .45s cubic-bezier(.2,1.1,.3,1)}'+
'#appSheet.on .s{transform:none}#appSheet .t{display:flex;gap:14px;align-items:center}#appSheet img{width:62px;height:62px;border-radius:16px;flex:none;box-shadow:0 8px 20px rgba(0,0,0,.6)}'+
'#appSheet b{display:block;font-size:17px;font-weight:800;line-height:1.25}#appSheet small{display:block;margin-top:3px;font-size:13.5px;line-height:1.4;color:#d6d3dc}'+
'#appSheet .r{display:flex;gap:10px;margin-top:14px}#appSheet button{flex:1;min-height:48px;border-radius:12px;font:inherit;font-weight:800;font-size:15px;letter-spacing:.06em;cursor:pointer}'+
'#appSheet .go{border:0;color:#fff;background:linear-gradient(135deg,'+A+','+B+');box-shadow:0 10px 26px '+A+'55}#appSheet .no{flex:.55;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);color:#fff}'+
'#appSheet .how{margin-top:12px;padding:12px;border-radius:12px;background:rgba(255,255,255,.07);font-size:14px;line-height:1.5;color:#eee}#appSheet .how b{display:inline;font-size:14px}';
function close(){var s=document.getElementById('appSheet');if(!s)return;s.classList.remove('on');setTimeout(function(){s.remove();},450);}
function how(box){var h=box.querySelector('.how');if(!h){h=document.createElement('div');h.className='how';box.appendChild(h);}
 if(inapp){h.innerHTML='<b>This app\'s built-in browser can\'t install apps.</b><br><b>1.</b> Tap <b>•••</b> or <b>⋮</b> (top or bottom corner).<br><b>2.</b> Tap <b>'+(ios?'Open in Safari':'Open in Chrome')+'</b> (or Open in browser). The install steps appear there.';return;}
 h.innerHTML=ios?'<b>1.</b> Tap the <b>Share</b> button <span aria-hidden="true">⬆️</span> (bottom of Safari, or top right in Chrome).<br><b>2.</b> Scroll down and tap <b>Add to Home Screen</b>.<br><b>3.</b> Tap <b>Add</b>. The app icon appears on your home screen.':'<b>1.</b> Tap the browser menu <b>⋮</b> (top right).<br><b>2.</b> Tap <b>Install app</b> or <b>Add to Home screen</b>.';}
function install(box){if(deferred){var d=deferred;deferred=null;d.prompt();d.userChoice.then(function(r){if(r&&r.outcome==='accepted'){S('i',1);close();}else if(box)how(box);}).catch(function(){if(box)how(box);});}else if(box)how(box);else sheet(true);}
function sheet(force){if(document.getElementById('appSheet'))return;var st=document.getElementById('appSheetCss');if(!st){st=document.createElement('style');st.id='appSheetCss';st.textContent=CSS;document.head.appendChild(st);}
 var w=document.createElement('div');w.id='appSheet';w.setAttribute('role','dialog');w.setAttribute('aria-label','Download the app');
 w.innerHTML='<div class="s"><div class="t"><img src="'+C.icon+'" alt=""><div><b>'+C.title+'</b><small>'+C.sub+'</small></div></div><div class="r"><button type="button" class="go">'+C.cta+'</button><button type="button" class="no">Not now</button></div></div>';
 document.body.appendChild(w);requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('on');});});
 var box=w.querySelector('.s'),g=w.querySelector('.go');if(ios||inapp){how(box);g.textContent='GOT IT';g.onclick=function(){S('d',Date.now());close();};}else g.onclick=function(){install(box);};w.querySelector('.no').onclick=function(){S('d',Date.now());close();};}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest(C.link);if(!a)return;e.preventDefault();var s=document.getElementById('appSheet');if(s)install(s.querySelector('.s'));else{sheet(true);}});
function okPage(){if(!C.pages)return true;var p=location.pathname.replace(/\.html$/,'').replace(/\/$/,'')||'/';return C.pages.indexOf(p)>=0;}
if(!standalone&&phone&&okPage()&&!L('i')&&!(L('d')&&Date.now()-L('d')<7*864e5)){var go=function(){setTimeout(function(){sheet(false);},C.delay);};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();}
if(standalone)document.addEventListener('DOMContentLoaded',function(){[].forEach.call(document.querySelectorAll(C.link),function(a){a.style.display='none';});});
window.APPPROMPT={open:function(){sheet(true);},install:function(){install(null);}};
})();
