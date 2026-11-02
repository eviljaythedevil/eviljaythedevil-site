/* EvilJayTheDevil Show pop-ups: one at a time, never more than a few a day, always easy to close.
   1. MERCH SPOT: a mid-page "commercial" for the Devilishly Heavenly drop (once per visit, when you reach the middle of the page).
   2. DEVIL FAN CARD: tracks your fan progress on this phone (visits, day streak, sections explored, socials followed)
      and turns it into a picture to share with friends. Also opens from the menu and footer ("My fan card").
   3. SUPPORT EVILJAY: no payments on the site, so support = follow, share, merch and booking, with all official links. */
(function(){'use strict';if(window.EJPOP)return;
var SITE='https://www.eviljaythedevilshow.com',COVER='/images/eviljaythedevil-show-cover.jpg';
var LINKS=[["Facebook", "https://www.facebook.com/share/1CmsY8QurG/", "👍"], ["Instagram", "https://www.instagram.com/eviljaythedevilshow/", "📸"], ["TikTok", "https://www.tiktok.com/@mrwize", "🎵"], ["X", "https://x.com/evilsinstv", "✖️"], ["LinkedIn", "https://www.linkedin.com/in/jimmy-frazier-95256634a", "💼"], ["Snapchat", "https://snapchat.com/t/wGL9YkZZ", "👻"], ["Apple Podcasts", "https://podcasts.apple.com/us/podcast/evilsinstv-podcast-savage-comedy-chaos-and-real-talk/id1836839891", "🎙️"], ["YouTube", "https://youtube.com/@eviljaythedevil", "▶️"], ["Apple Music", "https://music.apple.com/us/artist/eviljay/1525461812", "🎶"], ["Spotify", "https://open.spotify.com/artist/1MR461cKZAEASGAFPbsrpy", "🎧"], ["Kick", "https://kick.com/evilsinstv", "🟩"], ["Twitch", "https://www.twitch.tv/evilsinstv", "🟪"], ["Reddit", "https://www.reddit.com/u/MrLuciferandevil/s/NbZdU4HoLq", "👽"], ["Threads", "https://www.threads.com/@eviljaythedevilshow", "🧵"], ["OnlyFans", "https://onlyfans.com/eviljaythedevil", "🔞"]];
function L(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}}function S(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function day(){return new Date().toISOString().slice(0,10);}
/* ---------- fan progress ---------- */
var F=L('ej_fan',null)||{first:day(),visits:0,days:[],seen:{},soc:{},chat:0,name:''};F.seen=F.seen||{};F.soc=F.soc||{};F.days=F.days||[];
if(F.days[F.days.length-1]!==day()){F.days.push(day());F.days=F.days.slice(-60);}F.visits++;S('ej_fan',F);
var SECT=[['music','Music'],['podcast','Podcast'],['merch','Merch'],['theater','Theater'],['follow','Follow'],['booking','Booking']];
function streak(){var n=0,d=new Date();for(var i=F.days.length-1;i>=0;i--){var want=new Date(d.getTime()-n*864e5).toISOString().slice(0,10);if(F.days[i]===want)n++;else break;}return Math.max(1,n);}
function pts(){return F.days.length*10+Object.keys(F.seen).length*15+Object.keys(F.soc).length*12+(F.chat?10:0);}
var LV=[[0,'LOST SOUL'],[40,'IMP'],[90,'DEMON'],[160,'HELL RAISER'],[250,"DEVIL'S ADVOCATE"],[380,"EVILJAY'S RIGHT HAND"]];
function level(){var p=pts(),l=LV[0];LV.forEach(function(x){if(p>=x[0])l=x;});return l[1];}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!F.seen[e.target.id]){F.seen[e.target.id]=1;S('ej_fan',F);if(Object.keys(F.seen).length===3)later(function(){show('fan');},4000);}});},{threshold:.35});
 SECT.forEach(function(s){var el=document.getElementById(s[0]);if(el)io.observe(el);});}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(a){var h=a.getAttribute('href');LINKS.forEach(function(l){if(h&&h.indexOf(l[1].replace(/\/$/,''))===0){F.soc[l[0]]=1;S('ej_fan',F);}});}
 if(e.target.closest&&e.target.closest('#ejcB'))F.chat=1,S('ej_fan',F);},true);
/* ---------- one pop-up at a time ---------- */
var CSS='#ejpop{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.6);opacity:0;transition:opacity .25s}#ejpop.ejp-on{opacity:1}'+
'#ejpop .ejp-c{position:relative;width:min(100%,420px);max-height:88vh;overflow:auto;padding:20px 18px 18px;border:2px solid #c1121f;border-radius:20px;background:radial-gradient(ellipse at 50% -20%,#3a0509,#0b0506 70%);color:#f2efe9;font:400 1rem/1.5 Barlow,system-ui,sans-serif;box-shadow:0 0 60px rgba(193,18,31,.45),0 30px 80px #000;transform:scale(.92);transition:transform .25s cubic-bezier(.2,1.3,.4,1)}#ejpop.ejp-on .ejp-c{transform:none}'+
'#ejpop .ejp-x{position:absolute;right:8px;top:6px;width:44px;height:44px;border:0;background:none;color:#f2efe9;font-size:28px;line-height:1;cursor:pointer}'+
'#ejpop h3{margin:0 0 6px;font:400 2rem/1 "Permanent Marker",cursive;color:#c1121f;text-shadow:2px 2px 0 #000;padding-right:36px}#ejpop .ejp-k{display:inline-block;max-width:calc(100% - 44px);margin-bottom:8px;padding:3px 10px;border:1px solid #f4d58d;border-radius:999px;color:#f4d58d;font:800 .68rem/1.4 Barlow,sans-serif;letter-spacing:.2em}'+
'#ejpop p{margin:0 0 12px;color:#ddd0cc}#ejpop .ejp-img{display:block;width:100%;aspect-ratio:4/3;max-height:36vh;object-fit:cover;object-position:50% 30%;border-radius:14px;background:#d9d2c8;margin:0 0 12px}'+
'#ejpop .ejp-row{display:flex;flex-wrap:wrap;gap:8px}#ejpop .ejp-b{flex:1 1 140px;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:48px;padding:10px 14px;border:2px solid #000;background:#c1121f;color:#f2efe9;font-weight:800;text-decoration:none;cursor:pointer;box-shadow:4px 4px 0 #f2efe9}#ejpop .ejp-b.ejp-g{background:#f4d58d;color:#1a0d06;box-shadow:4px 4px 0 #c1121f}#ejpop .ejp-b.ejp-o{background:#000;border-color:#f2efe9;box-shadow:4px 4px 0 #c1121f}'+
'#ejpop .ejp-soc{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:0 0 12px}#ejpop .ejp-soc a{display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 4px;border:1px solid #5a1a22;border-radius:12px;background:#0006;color:#f2efe9;text-decoration:none;font:700 .8rem/1.2 Barlow,sans-serif}#ejpop .ejp-soc a span{font-size:1.3rem}#ejpop .ejp-soc a.ejp-on{border-color:#f4d58d}'+
'#ejpop input{width:100%;margin:0 0 10px;padding:12px;border-radius:12px;border:1px solid #444;background:#000;color:#fff;font:600 16px Barlow,system-ui}#ejpop canvas{display:block;width:100%;height:auto;border-radius:14px;margin:0 0 12px;border:1px solid #5a1a22}'+
'#ejpop .ejp-st{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:0 0 12px;text-align:center}#ejpop .ejp-st div{padding:8px 4px;border:1px solid #3a1015;border-radius:10px;background:#0006;font:800 .72rem/1.2 Barlow,sans-serif;color:#cdbcb8}#ejpop .ejp-st b{display:block;font:400 1.4rem/1 "Permanent Marker",cursive;color:#ff6a00}';
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
var cur=null,lastAt=0;
function canShow(kind,force){if(force)return true;if(cur||document.getElementById('appSheet'))return false;var t=Date.now();if(t-lastAt<60000)return false;var c=L('ej_pop_day',{d:'',n:0});if(c.d!==day())c={d:day(),n:0};if(c.n>=3)return false;
 if(document.activeElement&&/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return false;if(document.getElementById('ejcP')&&document.getElementById('ejcP').classList.contains('on'))return false;return true;}
function count(){var c=L('ej_pop_day',{d:'',n:0});if(c.d!==day())c={d:day(),n:0};c.n++;S('ej_pop_day',c);}
function open(html,kind){close();var o=document.createElement('div');o.id='ejpop';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.innerHTML='<div class="ejp-c"><button class="ejp-x" type="button" aria-label="Close">×</button>'+html+'</div>';
 document.body.appendChild(o);requestAnimationFrame(function(){o.classList.add('ejp-on');});cur=kind;lastAt=Date.now();
 o.addEventListener('click',function(e){if(e.target===o||e.target.closest('.ejp-x')||e.target.closest('[data-close]'))close();});return o;}
function close(){var o=document.getElementById('ejpop');if(o){o.remove();}cur=null;}
addEventListener('keydown',function(e){if(e.key==='Escape')close();});
function later(f,ms){setTimeout(f,ms);}
/* ---------- 1. merch spot ---------- */
function merch(){var img=Math.random()<.5?'tee-black':'tee-cream';
 var o=open('<span class="ejp-k">EXCLUSIVE DROP · SOLD ONLY THROUGH EVILJAY</span><h3>Devilishly Heavenly</h3><img class="ejp-img" src="/vault/'+img+'.webp" alt="Devilishly Heavenly tee" width="900" height="900"><p>Half devil, half angel. The tee is <b>$5,000</b>, the exclusive hat <b>$1,500</b>, the full set <b>$6,500</b>. No checkout: send the order form and EvilJay confirms it personally.</p>'+
  '<div class="ejp-row"><a class="ejp-b ejp-g" href="/#merch" data-close>🛒 SEE THE VAULT</a><a class="ejp-b" href="/#order" data-close>📝 ORDER FORM</a></div>','merch');}
/* ---------- 3. support EvilJay ---------- */
function support(){var o=open('<span class="ejp-k">SUPPORT THE SHOW</span><h3>Support EvilJay</h3><p>The best way to back EvilJay: follow everywhere, share the site, grab the merch and book him. Tap a few:</p>'+
  '<div class="ejp-soc">'+LINKS.map(function(l){return '<a href="'+l[1]+'" target="_blank" rel="me noopener" class="'+(F.soc[l[0]]?'ejp-on':'')+'"><span>'+l[2]+'</span>'+l[0]+'</a>';}).join('')+'</div>'+
  '<div class="ejp-row"><button class="ejp-b ejp-g" type="button" data-share>📤 SHARE THE SITE</button><a class="ejp-b" href="/#merch" data-close>🛒 MERCH</a><a class="ejp-b ejp-o" href="/#booking" data-close>📞 BOOK EVILJAY</a></div>','support');
 o.querySelector('[data-share]').onclick=function(){var t='EvilJayTheDevil: music, comedy and the EvilSinsTV Podcast 😈';if(navigator.share)navigator.share({title:'EvilJayTheDevil Show',text:t,url:SITE}).catch(function(){});else{try{navigator.clipboard.writeText(SITE);this.textContent='✅ LINK COPIED';}catch(e){}}};}
/* ---------- 2. devil fan card ---------- */
var coverImg=new Image();coverImg.src=COVER;
function drawCard(cv,name){var x=cv.getContext('2d'),W=cv.width=1080,H=cv.height=1350;
 var g=x.createRadialGradient(W/2,-200,100,W/2,H/2,1100);g.addColorStop(0,'#5a0a12');g.addColorStop(1,'#050203');x.fillStyle=g;x.fillRect(0,0,W,H);
 for(var i=0;i<90;i++){x.globalAlpha=.25+Math.random()*.5;x.fillStyle=Math.random()<.5?'#ff6a00':'#c1121f';x.beginPath();x.arc(Math.random()*W,Math.random()*H,1+Math.random()*4,0,7);x.fill();}x.globalAlpha=1;
 x.fillStyle='#c1121f';x.font='72px "Permanent Marker",cursive';x.textAlign='center';x.fillText('DEVIL FAN CARD',W/2,120);
 if(coverImg.complete&&coverImg.naturalWidth){x.save();x.translate(W/2,450);x.rotate(-.03);x.fillStyle='#c1121f';x.fillRect(-280,-280,560,560);x.drawImage(coverImg,-270,-270,540,540);x.restore();}
 x.fillStyle='#f2efe9';x.font='64px "Permanent Marker",cursive';x.fillText((name||'A TRUE FAN').toUpperCase().slice(0,18),W/2,840);
 x.fillStyle='#f4d58d';x.font='800 46px Barlow,Arial,sans-serif';x.fillText(level(),W/2,910);
 var stats=[[F.days.length,'DAYS'],[streak(),'DAY STREAK'],[Object.keys(F.seen).length+'/'+SECT.length,'EXPLORED'],[Object.keys(F.soc).length+'/'+LINKS.length,'FOLLOWING']];
 stats.forEach(function(s,i){var cx=170+i*247;x.fillStyle='rgba(0,0,0,.45)';x.fillRect(cx-110,960,220,150);x.strokeStyle='#5a1a22';x.lineWidth=3;x.strokeRect(cx-110,960,220,150);x.fillStyle='#ff6a00';x.font='64px "Permanent Marker",cursive';x.fillText(String(s[0]),cx,1045);x.fillStyle='#cdbcb8';x.font='800 24px Barlow,Arial,sans-serif';x.fillText(s[1],cx,1088);});
 x.fillStyle='#f2efe9';x.font='800 34px Barlow,Arial,sans-serif';x.fillText('Fan since '+new Date(F.first+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})+'  ·  '+pts()+' devil points',W/2,1180);
 x.fillStyle='#c1121f';x.fillRect(0,H-110,W,110);x.fillStyle='#fff';x.font='800 44px Barlow,Arial,sans-serif';x.fillText('eviljaythedevilshow.com',W/2,H-42);}
function fan(){var o=open('<span class="ejp-k">YOUR PROGRESS · '+level()+'</span><h3>Your Devil Fan Card</h3><div class="ejp-st"><div><b>'+F.days.length+'</b>DAYS</div><div><b>'+Object.keys(F.seen).length+'/'+SECT.length+'</b>EXPLORED</div><div><b>'+Object.keys(F.soc).length+'/'+LINKS.length+'</b>FOLLOWING</div></div>'+
  '<input id="ejfn" maxlength="18" placeholder="Your name on the card" autocomplete="nickname" value="'+String(F.name||'').replace(/"/g,'')+'"><div class="ejp-row" style="margin-bottom:12px"><button class="ejp-b ejp-g" type="button" data-sh>📤 SHARE MY CARD</button><button class="ejp-b ejp-o" type="button" data-sv>💾 SAVE</button></div><canvas id="ejfc" width="1080" height="1350" aria-label="Your Devil Fan Card"></canvas>'+
  '<p>Explore every section and follow EvilJay to level up your card, then send it to your friends.</p>','fan');
 var cv=o.querySelector('#ejfc'),inp=o.querySelector('#ejfn');var redraw=function(){drawCard(cv,inp.value.trim());};redraw();coverImg.onload=redraw;if(document.fonts&&document.fonts.load)document.fonts.load('64px "Permanent Marker"').then(redraw,function(){});
 inp.oninput=function(){F.name=inp.value.trim();S('ej_fan',F);redraw();};
 function blob(cb){cv.toBlob(function(b){cb(b);},'image/png');}
 o.querySelector('[data-sh]').onclick=function(){blob(function(b){if(!b)return;var file=new File([b],'eviljay-fan-card.png',{type:'image/png'});var t='I\'m a '+level()+' in the EvilJay army 😈 '+SITE;
  if(navigator.canShare&&navigator.canShare({files:[file]}))navigator.share({files:[file],text:t,title:'My Devil Fan Card'}).catch(function(){});else if(navigator.share)navigator.share({text:t,url:SITE}).catch(function(){});else dl(b);});};
 o.querySelector('[data-sv]').onclick=function(){blob(function(b){if(b)dl(b);});};
 function dl(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='eviljay-fan-card.png';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},800);}}
/* ---------- scheduling ---------- */
function show(kind,force){if(!canShow(kind,force))return;if(!force){var seen=L('ej_pop_seen',{});var k=kind+day();if(kind!=='fan'&&seen[k])return;seen[k]=1;S('ej_pop_seen',seen);count();}
 if(kind==='merch')merch();else if(kind==='support')support();else fan();}
/* merch spot: when you reach the middle part of the page (once a day), never on top of the Vault itself */
var merchDone=false;addEventListener('scroll',function(){if(merchDone)return;var max=document.documentElement.scrollHeight-innerHeight;if(max<=0)return;var p=scrollY/max;
 var m=document.getElementById('merch'),r=m&&m.getBoundingClientRect(),inStore=r&&r.top<innerHeight&&r.bottom>0;if(p>.22&&p<.9&&!inStore){merchDone=true;later(function(){show('merch');},600);}},{passive:true});
/* support: after about 80 seconds on the page */
var on=0;setInterval(function(){if(!document.hidden)on++;if(on===80)show('support');if(on===200&&F.visits>1)show('fan');},1000);
/* entry points: menu and footer links, or any element with data-ej-fancard / data-ej-support */
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-ej-fancard],[data-ej-support]');if(!a)return;e.preventDefault();var d=document.getElementById('drop');if(d)d.classList.remove('on');var mb=document.getElementById('menuB');if(mb){mb.textContent='☰';mb.setAttribute('aria-expanded','false');}show(a.hasAttribute('data-ej-fancard')?'fan':'support',true);});
window.EJPOP={fan:function(){show('fan',true);},support:function(){show('support',true);},merch:function(){show('merch',true);},level:level};
})();
