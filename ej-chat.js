/* AI EVIL J: the chat on EvilJayTheDevilShow.com. Answers with its built-in brain (ej-brain.js): no API key, no quota.
   Action tags in replies become buttons: [GO:/path] [BOOK] [FOLLOW]. Conversation is kept for this visit only. */
(function(){'use strict';if(window.__ejChat)return;window.__ejChat=1;
var PHONE='+16124575417',PHONE_TXT='(612) 457-5417',MAIL='eviljaythedevil@yahoo.com';
/* brain tags -> places on this site */
var MAP={'/store':'#merch','/store#order':'#order','/#ejListen':'#music','/#ejPod':'#podcast','/#ejFollow':'#follow','/#book':'#booking','/cinema':'/youtube.html','/':'#top'};
var LINKS=[['Instagram','https://www.instagram.com/eviljaythedevilshow/'],['TikTok','https://www.tiktok.com/@mrwize'],['YouTube','https://www.youtube.com/@eviljaythedevil'],['Facebook','https://www.facebook.com/share/1CmsY8QurG/'],['X','https://x.com/evilsinstv'],['Snapchat','https://snapchat.com/t/wGL9YkZZ'],['LinkedIn','https://www.linkedin.com/in/jimmy-frazier-95256634a'],['Apple Podcasts','https://podcasts.apple.com/us/podcast/evilsinstv-podcast-savage-comedy-chaos-and-real-talk/id1836839891'],['Spotify','https://open.spotify.com/artist/1MR461cKZAEASGAFPbsrpy']];
/* No API key on this site: the built-in brain (ej-brain.js) answers. Set USE_API=true only if a server AI is added later. */
var USE_API=false,BST={};try{BST=JSON.parse(sessionStorage.getItem('ej_brain')||'{}')||{};}catch(e){}
var GO_OK=Object.keys(MAP);
var CSS='#ejcB{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:70;display:flex;align-items:center;gap:8px;padding:12px 16px 12px 12px;border-radius:999px;border:0;background:linear-gradient(135deg,#ff3b4e,#7a0816);color:#fff;font:900 12px/1 system-ui,sans-serif;letter-spacing:.1em;box-shadow:0 12px 30px #000a,0 0 0 1px #ff3b4e99;cursor:pointer}#ejcB i{font-style:normal;font-size:22px;line-height:1}#ejcB.hide{display:none}'+
'#ejcB.pulse:after{content:"";position:absolute;inset:-4px;border-radius:999px;border:2px solid #ff3b4e;animation:ejcP 1.6s ease-out infinite}@keyframes ejcP{to{inset:-14px;opacity:0}}'+
'#ejcP{position:fixed;inset:0;z-index:80;display:none;align-items:flex-end;justify-content:flex-end;background:#0008}#ejcP.on{display:flex}#ejcP .w{display:flex;flex-direction:column;width:min(100%,430px);height:min(86vh,680px);margin:0 0 0 auto;border-radius:24px 24px 0 0;background:linear-gradient(170deg,#1f0a10,#0b0507);border:1px solid #ff3b4e55;overflow:hidden;color:#f6eee8;font:15px/1.5 system-ui,sans-serif}'+
'@media(min-width:700px){#ejcP .w{margin:0 18px 18px auto;border-radius:24px}}'+
'#ejcP .hd{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #ffffff1a}#ejcP .hd b{display:block;font:900 15px/1.1 system-ui;letter-spacing:.06em}#ejcP .hd small{color:#c6b4b0;font-size:12px}#ejcP .av{width:40px;height:40px;border-radius:50%;background:#300 url(/images/eviljaythedevil-show-cover.jpg) center/cover;border:2px solid #ff3b4e}#ejcP .x{margin-left:auto;border:0;background:none;color:#fff;font-size:28px;line-height:1;cursor:pointer}'+
'#ejcP .m{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;-webkit-overflow-scrolling:touch}#ejcP .b{max-width:86%;padding:10px 13px;border-radius:16px;white-space:pre-wrap;word-wrap:break-word}#ejcP .b.u{align-self:flex-end;background:#ff3b4e;color:#fff;border-bottom-right-radius:4px}#ejcP .b.a{align-self:flex-start;background:#ffffff12;border:1px solid #ffffff1a;border-bottom-left-radius:4px}'+
'#ejcP .act{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start;max-width:92%}#ejcP .act a{padding:8px 12px;border-radius:999px;background:#f4d58d;color:#1a0d06;font:800 12px/1 system-ui;text-decoration:none}#ejcP .act a.o{background:#ffffff14;color:#fff;border:1px solid #ffffff33}'+
'#ejcP .ty{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;border-radius:16px;background:#ffffff12}#ejcP .ty s{width:7px;height:7px;border-radius:50%;background:#ff3b4e;animation:ejcT 1s infinite}#ejcP .ty s:nth-child(2){animation-delay:.15s}#ejcP .ty s:nth-child(3){animation-delay:.3s}@keyframes ejcT{50%{transform:translateY(-5px);opacity:.5}}'+
'#ejcP .q{display:flex;gap:6px;overflow-x:auto;padding:0 14px 8px;scrollbar-width:none}#ejcP .q button{flex:none;padding:8px 12px;border-radius:999px;border:1px solid #ff3b4e77;background:#ff3b4e1a;color:#ffd6da;font:800 12px/1 system-ui;cursor:pointer}'+
'#ejcP form{display:flex;gap:8px;padding:10px 12px calc(12px + env(safe-area-inset-bottom));border-top:1px solid #ffffff1a}#ejcP input{flex:1;min-width:0;padding:12px 14px;border-radius:999px;border:1px solid #ffffff33;background:#ffffff0d;color:#fff;font:600 16px system-ui}#ejcP form button{border:0;border-radius:999px;padding:0 18px;background:linear-gradient(135deg,#ff3b4e,#9e0b1d);color:#fff;font:900 13px system-ui;cursor:pointer}'+
'#ejcP .ft{padding:0 14px 6px;color:#9d8a86;font-size:11px;text-align:center}';
var H=[];try{H=JSON.parse(sessionStorage.getItem('ej_chat')||'[]');}catch(e){}
function save(){try{sessionStorage.setItem('ej_chat',JSON.stringify(H.slice(-24)));}catch(e){}}
var el={},busy=false;
function esc(t){return String(t).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
function clean(t){return String(t).replace(/\[(GO:[^\]]*|BOOK|FOLLOW)\]/g,'').replace(/\*\*(.*?)\*\*/g,'$1').replace(/^#+\s*/gm,'').trim();}
function bubble(role,text){var d=document.createElement('div');d.className='b '+(role==='user'?'u':'a');d.textContent=role==='user'?text:clean(text);el.m.appendChild(d);if(role!=='user')actions(text);el.m.scrollTop=1e6;}
function actions(t){var box=document.createElement('div'),any=false;box.className='act';
 var g=String(t).match(/\[GO:([^\]]+)\]/g)||[];g.forEach(function(x){var p=x.slice(4,-1).trim();if(GO_OK.indexOf(p)<0)return;any=true;var a=document.createElement('a');a.href=MAP[p];a.textContent={'/store':'🛒 THE VAULT','/store#order':'📝 ORDER FORM','/cinema':'🎬 THEATER','/space':'🚀 FIGHTER JET','/boxing':'🥊 BOXING','/snowboard':'🏂 SNOWBOARD','/#ejListen':'🎵 MUSIC','/#ejPod':'🎙️ PODCAST','/#ejFollow':'❤️ FOLLOW','/#book':'📞 BOOK','/':'🏠 HOME'}[p]||'GO';a.onclick=function(){if(MAP[p].charAt(0)==='#')close();};box.appendChild(a);});
 if(/\[BOOK\]/.test(t)){any=true;[['📞 CALL','tel:'+PHONE],['💬 TEXT','sms:'+PHONE],['✉️ EMAIL','mailto:'+MAIL+'?subject='+encodeURIComponent('Booking EvilJay')]].forEach(function(b,i){var a=document.createElement('a');a.href=b[1];a.textContent=b[0];if(i)a.className='o';box.appendChild(a);});}
 if(/\[FOLLOW\]/.test(t)){any=true;LINKS.forEach(function(l){var a=document.createElement('a');a.href=l[1];a.target='_blank';a.rel='noopener';a.className='o';a.textContent=l[0];box.appendChild(a);});}
 if(any)el.m.appendChild(box);}
/* ---------- built-in answers when the AI is offline ---------- */
function local(q){q=q.toLowerCase();
 if(/\b(hi|hey|hello|yo|wassup|what'?s up|sup)\b/.test(q)&&q.length<25)return 'What up! I\'m AI Evil J, the devil on this website 😈 Ask me about the music, the EvilSinsTV Podcast, the Devilishly Heavenly merch or booking Evil J.';
 if(/(price|cost|how much|merch|shirt|tee|hat|cap|buy|order|store|vault|devilishly)/.test(q))return 'The Devil\'s Vault is private: the Devilishly Heavenly Tee is $5,000, the exclusive matching Hat is $1,500, and the Full Set is $6,500, in cream or black. No card checkout: send the order form or text Evil J and he confirms it personally. [GO:/store] [GO:/store#order]';
 if(/(book|booking|hire|show|feature|collab|contact|phone|email|call|text him)/.test(q))return 'Book Evil J for shows, features, podcast guest spots or comedy: call or text '+PHONE_TXT+' or email '+MAIL+'. [BOOK]';
 if(/(podcast|evilsins|episode|apple)/.test(q))return 'The EvilSinsTV Podcast: savage comedy, chaos and real talk. Catch it on Apple Podcasts and on YouTube @eviljaythedevil. [GO:/#ejPod]';
 if(/(music|song|spotify|bubblegum|listen|album|track|rap)/.test(q))return 'Evil J\'s music is on Spotify, Bubblegum included (it\'s playing on the front page). Tap MUSIC to listen. [GO:/#ejListen]';
 if(/(insta|tiktok|youtube|facebook|twitter|\bx\b|snap|linkedin|social|follow)/.test(q))return 'Follow Evil J everywhere: Instagram @eviljaythedevilshow, TikTok @mrwize, YouTube @eviljaythedevil, X @evilsinstv and Snapchat @eviljaythedevil. [FOLLOW]';
 if(/(interview|digital social hour|video|watch|cinema)/.test(q))return 'The newest Evil J videos play in the video theater. [GO:/cinema]';
 if(/(who|about|evil j|jay frazier|from)/.test(q))return 'EvilJay TheDevil, real name Jay Frazier: music, comedy and the EvilSinsTV Podcast. Minneapolis-born, Las Vegas-based. I\'m the AI version on his site.';
 if(/(website|built|made|zane)/.test(q))return 'This site was designed and built by Zane Deep, the Las Vegas producer and developer behind zanedeepworld.com.';
 return 'My big brain is taking a quick break, but I can still help with the music, the podcast, the merch, booking and the games. For anything else, hit up Evil J directly. [BOOK]';}
function typing(on){if(on){var t=document.createElement('div');t.className='ty';t.id='ejcTy';t.innerHTML='<s></s><s></s><s></s>';el.m.appendChild(t);el.m.scrollTop=1e6;}else{var x=document.getElementById('ejcTy');if(x)x.remove();}}
function ask(q){q=String(q||'').trim();if(!q||busy)return;busy=true;H.push({role:'user',content:q.slice(0,1200)});save();bubble('user',q);el.i.value='';typing(true);
 var nm='';try{nm=localStorage.getItem('ej_name')||'';}catch(e){}
 var ctl=('AbortController' in window)?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort();},40000);
 var done=function(a){clearTimeout(tm);typing(false);H.push({role:'assistant',content:a});save();bubble('assistant',a);busy=false;};
 var brain=function(){var a='';try{a=window.EJBrain?EJBrain.answer(q,BST):local(q);}catch(e){a=local(q);}try{sessionStorage.setItem('ej_brain',JSON.stringify(BST));}catch(e){}return a;};
 if(!USE_API){setTimeout(function(){done(brain());},420+Math.min(900,q.length*12));return;}
 fetch('/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({messages:H.slice(-12),page:location.pathname+location.hash,name:nm}),signal:ctl&&ctl.signal})
 .then(function(r){return r.ok?r.json():null;}).catch(function(){return null;}).then(function(j){done((j&&j.reply)||brain());});}
function open(){build();el.p.classList.add('on');el.b.classList.remove('pulse');try{localStorage.setItem('ej_chat_seen','1');}catch(e){}if(!el.m.children.length){if(H.length)H.forEach(function(m){bubble(m.role,m.content);});else bubble('assistant','What up, I\'m AI Evil J 😈 Ask me anything: the music, the EvilSinsTV Podcast, the Devilishly Heavenly drop, booking, or literally whatever is on your mind.');}setTimeout(function(){if(matchMedia('(min-width:700px)').matches)el.i.focus();},60);}
function close(){if(el.p)el.p.classList.remove('on');}
var built=false;function build(){if(built)return;built=true;var p=document.createElement('div');p.id='ejcP';p.setAttribute('role','dialog');p.setAttribute('aria-label','Chat with AI Evil J');
 p.innerHTML='<div class="w"><div class="hd"><div class="av"></div><div><b>AI EVIL J</b><small>Built-in AI · not the real Evil J</small></div><button class="x" aria-label="Close chat">×</button></div><div class="m" aria-live="polite"></div>'+
  '<div class="q"><button>Shop the merch</button><button>Book Evil J</button><button>The podcast</button><button>Play the music</button><button>Follow Evil J</button><button>Tell me a joke</button></div>'+
  '<form><input type="text" placeholder="Ask AI Evil J anything…" aria-label="Your message" maxlength="1200" enterkeyhint="send"><button type="submit">SEND</button></form><div class="ft">AI answers can be wrong. Orders and bookings are confirmed by the real Evil J.</div></div>';
 document.body.appendChild(p);el.p=p;el.m=p.querySelector('.m');el.i=p.querySelector('input');
 ['touchstart','pointerdown','mousedown','keydown','wheel'].forEach(function(n){p.addEventListener(n,function(e){e.stopPropagation();},{passive:true});});
 p.addEventListener('click',function(e){if(e.target===p||e.target.closest('.x'))close();var q=e.target.closest('.q button');if(q)ask(q.textContent);});
 p.querySelector('form').addEventListener('submit',function(e){e.preventDefault();ask(el.i.value);});}
function init(){if(!window.EJBrain&&!document.querySelector('script[data-ejb]')){var sb=document.createElement('script');sb.src='/ej-brain.js';sb.dataset.ejb='1';document.head.appendChild(sb);}var s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);var b=document.createElement('button');b.id='ejcB';b.type='button';b.setAttribute('aria-label','Chat with AI Evil J');b.innerHTML='<i>😈</i>ASK EVIL J';
 b.onclick=open;document.body.appendChild(b);el.b=b;var seen=null;try{seen=localStorage.getItem('ej_chat_seen');}catch(e){}if(!seen)b.classList.add('pulse');
 /* the store's request button sits bottom-right too: lift the chat button above it */
 /* the order button sits above the chat button on this site */
 document.querySelectorAll('[data-ej-chat]').forEach(function(x){x.addEventListener('click',function(e){e.preventDefault();open();});});
 window.EJChat={open:open,ask:function(q){open();ask(q);}};}
if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
