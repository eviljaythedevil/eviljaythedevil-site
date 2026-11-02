/* EvilJay intro song ("I Am Better"): starts as soon as the page opens when the browser allows sound, otherwise on the first tap
   anywhere. The Play music button still pauses and plays it; a pause is remembered for this visit. */
(function(){'use strict';var A=document.getElementById('bg'),B=document.getElementById('musicBtn');if(!A)return;
var off=false;try{off=sessionStorage.getItem('ej_song')==='off';}catch(e){}
function ui(){if(!B)return;var on=!A.paused;B.setAttribute('aria-pressed',on);var s=B.querySelector('span');if(s)s.textContent=on?'Pause music':'Play music';}
A.addEventListener('play',ui);A.addEventListener('pause',function(){ui();});
function go(){if(off||!A.paused)return;var v=document.getElementById('centerVideo');if(v&&!v.muted)return;A.preload='auto';var p=A.play();if(p&&p.then)p.then(ui).catch(function(){});}
function first(e){if(e&&e.target&&e.target.closest&&e.target.closest('#musicBtn,#snd'))return done();go();done();}
function done(){['pointerdown','touchend','keydown','click'].forEach(function(t){removeEventListener(t,first,true);});}
['pointerdown','touchend','keydown','click'].forEach(function(t){addEventListener(t,first,true);});
if(B)B.addEventListener('click',function(){setTimeout(function(){off=A.paused;try{off?sessionStorage.setItem('ej_song','off'):sessionStorage.removeItem('ej_song');}catch(e){}},50);});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();
