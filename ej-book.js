/* BOOK EVILJAY: step-by-step booking request (1 Package, 2 Event, 3 Contact, 4 Review) with live price estimate.
   Sends to EvilJay's booking email through FormSubmit; "Text it instead" opens a pre-written text. No payment is taken on the site. */
(function(){'use strict';
var root=document.getElementById('ejBook');if(!root)return;
var MAIL='eviljaythedevil@yahoo.com',PHONE='+16124575417';
var T={comedy:{n:'Live comedy show',ic:'🎤',p:[[30,1500],[60,3000],[90,4500]]},podcast:{n:'Podcast appearance',ic:'🎙️',p:[[60,2000],[90,3000],[120,4000]]},custom:{n:'Custom appearance',ic:'🎬',p:[]}};
var CUSTOM=['Festival','Private event','Hosting','Music performance','Celebrity collaboration','Special project','Other'];
var S={step:1,type:'',mins:0,price:0,kind:''};
var money=function(n){return '$'+n.toLocaleString('en-US')};
var len=function(m){return m<60?m+' minutes':m%60?Math.floor(m/60)+' hr '+(m%60)+' min':(m/60)+(m===60?' hour':' hours')};
var CSS='#ejBook{max-width:760px}#ejBook .stp{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:0 0 14px;padding:0;list-style:none}'+
'#ejBook .stp li{padding:8px 4px 0;border-top:4px solid #3a1015;color:#9a8a87;font:800 .72rem/1.2 Barlow,sans-serif;letter-spacing:.12em;text-transform:uppercase;text-align:center}#ejBook .stp li.on{border-color:var(--blood,#c1121f);color:#fff}#ejBook .stp li.done{border-color:#7a0b13;color:#e8d8d4}'+
'#ejBook .bx{padding:18px;border:2px solid var(--blood,#c1121f);border-radius:18px;background:#0b0506}#ejBook h3{margin:0 0 4px;font:800 1.25rem/1.25 Barlow,sans-serif}#ejBook .hint{margin:0 0 14px;color:#cdbcb8;font-size:.98rem}'+
'#ejBook .opts{display:grid;gap:8px;margin:0 0 14px}#ejBook .opts.c3{grid-template-columns:repeat(3,1fr)}#ejBook .opts.c2{grid-template-columns:repeat(2,1fr)}'+
'#ejBook .op{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:2px;min-height:60px;padding:12px;border:1px solid #5a1a22;border-radius:14px;background:#120709;color:#f2efe9;text-align:left;cursor:pointer;font:700 1rem/1.25 Barlow,sans-serif}'+
'#ejBook .op b{font-size:1.02rem}#ejBook .op small{color:#cdbcb8;font-weight:600;font-size:.86rem}#ejBook .op .pr{color:var(--ember,#ff6a00);font-weight:900;font-size:1.15rem}#ejBook .op.on{border:2px solid var(--gold,#f4d58d);background:#1d0b06;box-shadow:0 0 0 3px #f4d58d22}'+
'#ejBook label{display:grid;gap:6px;margin:0 0 12px;font:800 .8rem/1.2 Barlow,sans-serif;letter-spacing:.06em;color:#e8d8d4}#ejBook input,#ejBook select,#ejBook textarea{width:100%;padding:13px;border-radius:12px;border:1px solid #444;background:#000;color:#fff;font:600 16px Barlow,system-ui}#ejBook textarea{min-height:96px;resize:vertical}'+
'#ejBook .row2{display:grid;gap:0 12px}@media(min-width:640px){#ejBook .row2{grid-template-columns:1fr 1fr}}#ejBook .nav{display:flex;gap:10px;margin-top:6px}#ejBook .nav .btn{flex:1;justify-content:center}'+
'#ejBook .err{min-height:1.2em;margin:4px 0 0;color:#ff8a80;font-weight:700}#ejBook .sum{display:grid;grid-template-columns:minmax(110px,38%) 1fr;border:1px solid #3a1015;border-radius:14px;overflow:hidden;margin:0 0 12px}#ejBook .sum div{padding:9px 12px;border-bottom:1px solid #2a1013;font-size:.98rem}#ejBook .sum div:nth-child(odd){color:#fff;font-weight:800;background:#ffffff08}'+
'#ejBook .est{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin:0 0 10px;padding:14px;border-radius:14px;background:linear-gradient(135deg,#2a0a0d,#140607);border:1px solid #f4d58d55}#ejBook .est b{font:800 1.6rem/1 Barlow,sans-serif;color:var(--gold,#f4d58d)}#ejBook .est span{color:#e8d8d4;font-weight:700}'+
'#ejBook .chk{display:flex;align-items:flex-start;gap:10px;font:600 .95rem/1.4 Barlow,sans-serif;letter-spacing:0;color:#e8d8d4}#ejBook .chk input{width:22px;height:22px;flex:none;margin:2px 0 0}#ejBook .small{color:#a99e9b;font-size:.88rem;margin:8px 0 0}'+
'#ejBook .ok{text-align:center}#ejBook .ok .big{font-size:2.6rem}#ejBook .ok p{color:#e8d8d4}#ejBook .mgr{margin:14px 0;padding:14px;border-left:4px solid var(--gold,#f4d58d);border-radius:10px;background:#140a05;text-align:left;color:#f2e6d0}';
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
function esc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function v(id){var e=root.querySelector('#'+id);return e?e.value.trim():'';}
function keep(){['bn','bph','bem','bco','bdate','btime','bcity','bppl','bbud','btrav','bnote','bkind'].forEach(function(id){var e=root.querySelector('#'+id);if(e)S[id]=e.value;});}
function val(id){return esc(S[id]||'');}
function steps(){var L=['Package','Event','Contact','Review'];return '<ol class="stp" aria-label="Booking steps">'+L.map(function(l,i){var n=i+1;return '<li class="'+(n===S.step?'on':n<S.step?'done':'')+'">'+n+'. '+l+'</li>';}).join('')+'</ol>';}
function draw(){var h=steps()+'<div class="bx">';
 if(S.step===1){h+='<h3>What are you booking?</h3><p class="hint">Pick a type and a length. Prices update as you go.</p><div class="opts c3">'+
   ['comedy','podcast','custom'].map(function(k){return '<button type="button" class="op'+(S.type===k?' on':'')+'" data-t="'+k+'"><b>'+T[k].ic+' '+({comedy:'Comedy show',podcast:'Podcast',custom:'Custom'})[k]+'</b><small>'+(k==='comedy'?'$1,500 per 30 min':k==='podcast'?'$2,000 per hour':'Custom quote')+'</small></button>';}).join('')+'</div>';
  if(S.type&&S.type!=='custom'){h+='<p class="hint" style="margin-top:4px">'+T[S.type].n+': choose the length</p><div class="opts c3">'+T[S.type].p.map(function(x){return '<button type="button" class="op'+(S.mins===x[0]?' on':'')+'" data-m="'+x[0]+'" data-p="'+x[1]+'"><small>'+len(x[0])+'</small><span class="pr">'+money(x[1])+'</span></button>';}).join('')+'</div>';}
  if(S.type==='custom'){h+='<label>What kind of appearance?<select id="bkind">'+CUSTOM.map(function(c){return '<option'+(S.bkind===c?' selected':'')+'>'+c+'</option>';}).join('')+'</select></label><p class="hint">Festivals, private events, celebrity collaborations, hosting, music performances and special projects get a custom quote.</p>';}
 }
 if(S.step===2){h+='<h3>Your event</h3><p class="hint">'+summaryLine()+'</p><label>Company, podcast or event name *<input id="bco" value="'+val('bco')+'" autocomplete="organization"></label>'+
  '<div class="row2"><label>What date do you want EvilJay? *<input id="bdate" type="date" value="'+val('bdate')+'"></label><label>What time? *<input id="btime" type="time" value="'+val('btime')+'"></label></div>'+
  '<label>City, state and venue *<input id="bcity" value="'+val('bcity')+'" placeholder="Las Vegas, NV · The venue name"></label>'+
  '<div class="row2"><label>How many people are expected?<input id="bppl" inputmode="numeric" value="'+val('bppl')+'" placeholder="e.g. 250"></label><label>Your budget<input id="bbud" inputmode="decimal" value="'+val('bbud')+'" placeholder="$"></label></div>'+
  '<label>Will you cover travel and hotel expenses? *<select id="btrav"><option value="">Choose one</option>'+['Yes, travel and hotel are covered','Local event, no travel needed','No','Let\'s discuss'].map(function(o){return '<option'+(S.btrav===o?' selected':'')+'>'+o+'</option>';}).join('')+'</select></label>';}
 if(S.step===3){h+='<h3>Your contact details</h3><p class="hint">EvilJay\'s booking manager will reach you here.</p><label>Full name *<input id="bn" value="'+val('bn')+'" autocomplete="name"></label>'+
  '<div class="row2"><label>Phone number *<input id="bph" type="tel" value="'+val('bph')+'" autocomplete="tel"></label><label>Email address *<input id="bem" type="email" value="'+val('bem')+'" autocomplete="email"></label></div>'+
  '<label>Special requests or additional details<textarea id="bnote" placeholder="Set length, theme, content level, sound and stage, anything we should know">'+val('bnote')+'</textarea></label>';}
 if(S.step===4){var est=S.type==='custom'?'Custom quote':money(S.price);
  h+='<h3>Review your request</h3><p class="hint">Check everything, then send it to EvilJay\'s booking manager.</p><div class="est"><span>Estimated performance fee</span><b>'+est+'</b></div><div class="sum">'+rows().map(function(r){return '<div>'+r[0]+'</div><div>'+esc(r[1])+'</div>';}).join('')+'</div>'+
  '<p class="small">Travel, lodging and additional production expenses are separate unless otherwise agreed upon. All appearances are subject to availability and booking confirmation. A deposit secures your date after confirmation; nothing is charged on this website.</p>'+
  '<label class="chk"><input type="checkbox" id="bok"> This is a serious business inquiry and the details above are correct.</label><input type="text" id="bhoney" tabindex="-1" autocomplete="off" style="display:none">';}
 if(S.step<5){h+='<p class="err" role="alert"></p><div class="nav">'+(S.step>1?'<button type="button" class="btn alt" data-back>← BACK</button>':'')+(S.step<4?'<button type="button" class="btn" data-next>CONTINUE →</button>':'<button type="button" class="btn gold" data-send>🔥 SUBMIT BOOKING REQUEST</button>')+'</div>';
  if(S.step===4)h+='<div class="nav" style="margin-top:10px"><a class="btn alt" href="'+smsLink()+'">💬 TEXT IT INSTEAD</a><a class="btn alt" href="tel:'+PHONE+'">📞 CALL</a></div>';}
 if(S.step===5){h+='<div class="ok"><div class="big">😈</div><h3>Thank you for your interest in booking EvilJay!</h3><p>Our booking manager will review your request and contact you with availability and next steps.</p></div>'+
  '<div class="mgr"><b>From EvilJay\'s booking manager:</b><br>Hello, this is EvilJay\'s booking manager. Thank you for your interest in booking EvilJay! We received your request. Can you confirm your event date, location, performance length, and whether travel and hotel expenses are covered? Once confirmed, we\'ll discuss availability, pricing, and the deposit required to secure your date.</div>'+
  '<div class="nav"><a class="btn alt" href="'+smsLink()+'">💬 TEXT THE BOOKING MANAGER</a><button type="button" class="btn" data-new>NEW REQUEST</button></div>';}
 h+='</div>';root.innerHTML=h;}
function summaryLine(){return S.type==='custom'?'Custom appearance: '+(S.bkind||CUSTOM[0])+' · custom quote':T[S.type].n+' · '+len(S.mins)+' · '+money(S.price);}
function rows(){return [['Booking',S.type==='custom'?'Custom appearance: '+(S.bkind||CUSTOM[0]):T[S.type].n],['Length',S.type==='custom'?'To be discussed':len(S.mins)],['Company / event',S.bco],['Date',S.bdate],['Time',S.btime],['City, state, venue',S.bcity],['People expected',S.bppl||'-'],['Budget',S.bbud?(/^[\d,.]+$/.test(S.bbud)?'$'+(+S.bbud.replace(/,/g,'')).toLocaleString('en-US'):S.bbud):'-'],['Travel and hotel',S.btrav],['Name',S.bn],['Phone',S.bph],['Email',S.bem],['Details',S.bnote||'-']];}
function text(){return 'EVILJAY BOOKING REQUEST\n'+rows().map(function(r){return r[0]+': '+(r[1]||'-');}).join('\n')+(S.type!=='custom'?'\nEstimated fee: '+money(S.price):'');}
function smsLink(){var ios=/iP(hone|ad|od)/.test(navigator.userAgent);return 'sms:'+PHONE+(ios?'&':'?')+'body='+encodeURIComponent(S.type?text():'Hi! I want to book EvilJay.');}
function err(t){var e=root.querySelector('.err');if(e)e.textContent=t;}
function check(){keep();
 if(S.step===1){if(!S.type)return err('Pick what you are booking.');if(S.type!=='custom'&&!S.mins)return err('Pick a length.');if(S.type==='custom')S.bkind=S.bkind||CUSTOM[0];}
 if(S.step===2){if(!S.bco||!S.bdate||!S.btime||!S.bcity||!S.btrav)return err('Please fill in the event name, date, time, city and venue, and travel.');}
 if(S.step===3){if(!S.bn||!S.bph||!S.bem)return err('Please add your full name, phone number and email.');if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(S.bem))return err('That email address does not look right.');}
 return true;}
function go(n){S.step=n;draw();var t=document.getElementById('booking');if(t&&n>1)root.scrollIntoView({behavior:'smooth',block:'start'});var f=root.querySelector('input,select,textarea');if(f&&n>1&&n<4&&matchMedia('(min-width:700px)').matches)f.focus({preventScroll:true});}
function send(){if(!root.querySelector('#bok').checked)return err('Please confirm this is a serious business inquiry.');if(root.querySelector('#bhoney').value)return;
 var b=root.querySelector('[data-send]');b.disabled=true;b.textContent='SENDING…';
 var data={_subject:'EvilJay booking request: '+(S.type==='custom'?S.bkind:T[S.type].n)+' · '+S.bdate+' · '+S.bco,_template:'table',_captcha:'false',_replyto:S.bem};rows().forEach(function(r){data[r[0]]=r[1]||'-';});data['Estimated fee']=S.type==='custom'?'Custom quote':money(S.price);
 fetch('https://formsubmit.co/ajax/'+MAIL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)}).then(function(r){return r.json().catch(function(){return{};}).then(function(j){return r.ok&&String(j.success)==='true';});}).catch(function(){return false;}).then(function(ok){
  if(ok){go(5);}else{b.disabled=false;b.textContent='🔥 SUBMIT BOOKING REQUEST';err('The form could not send right now. Tap TEXT IT INSTEAD: your request is already written out.');}});}
root.addEventListener('click',function(e){var x=e.target.closest('button');if(!x)return;
 if(x.dataset.t){keep();S.type=x.dataset.t;S.mins=0;S.price=0;draw();return;}
 if(x.dataset.m){S.mins=+x.dataset.m;S.price=+x.dataset.p;draw();return;}
 if(x.hasAttribute('data-next')){if(check()===true)go(S.step+1);return;}
 if(x.hasAttribute('data-back')){keep();go(S.step-1);return;}
 if(x.hasAttribute('data-send')){send();return;}
 if(x.hasAttribute('data-new')){S={step:1,type:'',mins:0,price:0};go(1);}});
root.addEventListener('change',function(e){if(e.target.id==='bkind')S.bkind=e.target.value;});
/* the price cards above the form start the request with that package picked */
document.addEventListener('click',function(e){var a=e.target.closest('[data-book]');if(!a)return;e.preventDefault();var p=a.getAttribute('data-book').split(':');S={step:1,type:p[0],mins:+(p[1]||0),price:+(p[2]||0)};
 if(S.type==='custom'){S.bkind=CUSTOM[0];}if(S.type!=='custom'&&S.mins){S.step=2;}draw();root.scrollIntoView({behavior:'smooth',block:'start'});});
draw();
window.EJBOOK={start:function(t){S={step:1,type:t||'',mins:0,price:0};draw();}};
})();
