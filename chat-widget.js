window.addEventListener('load', function () {
  var old = document.getElementById('chat-input'), msgs = document.getElementById('chat-msgs');
  if (!old || !msgs) return;
  var inp = old.cloneNode(true); old.parentNode.replaceChild(inp, old);
  var SP = 'https://open.spotify.com/artist/1MR461cKZAEASGAFPbsrpy';
  var SPS = 'https://open.spotify.com/show/6wzC2CHWjSsa4dVh2cIAWD';
  var YT = 'https://youtube.com/@eviljaythedevil';
  function go(h, t) { return '<a href="' + h + '" onclick="document.getElementById(\'chat-box\').style.display=\'none\'" style="color:#ff6a00;font-weight:700">' + t + '</a>'; }
  function ext(h, t) { return '<a href="' + h + '" target="_blank" rel="noopener" style="color:#ff6a00;font-weight:700">' + t + '</a>'; }
  var intents = [
    { k: 'book|hire|gig|booking|bookings|private event|festival|club|appear|availab|rate|rates|price|cost|how much|feature|residency',
      a: 'Jay takes comedy shows, podcast guest spots, interviews, features, clubs, festivals and private events. Rates depend on the event, so put the date, venue and budget in the form. It texts Jay directly. ' + go('#booking', 'Open the booking form') },
    { k: 'next show|upcoming|tour|ticket|tickets|schedule|dates|when is|where is he|where does he perform|performing',
      a: "I don't have show dates. For the latest, check Instagram " + ext('https://www.instagram.com/eviljaythedevilshow/', '@eviljaythedevilshow') + ' or ask Jay through the ' + go('#booking', 'booking form') + '.' },
    { k: 'music|song|songs|track|tracks|spotify|album|listen|rap|release|bubblegum|nasty|new music',
      a: 'Jay is a music artist and his profile lists recent songs like BUBBLEGUM and Nastyyyy. Listen on ' + ext(SP, 'Spotify') + ' or open the ' + go('/spotify.html', 'Music Studio') + ' page.' },
    { k: 'podcast|episode|episodes|kaia|host|show',
      a: 'The EvilJayTheDevil Show is Jay\'s podcast: interviews, live streams and unfiltered conversation. Listen on ' + ext(SPS, 'Spotify') + ' or watch on ' + ext(YT, 'YouTube') + '.' },
    { k: 'video|videos|watch|youtube|clip|clips|theater|theatre',
      a: 'Watch the latest in the ' + go('/youtube.html', 'Theater') + ', or go to the ' + ext(YT, 'YouTube channel') + '.' },
    { k: 'instagram|tiktok|facebook|snap|snapchat|social|follow|linkedin|links',
      a: 'All of his links are in the Watch and follow section of this page. He is on Instagram as ' + ext('https://www.instagram.com/eviljaythedevilshow/', '@eviljaythedevilshow') + ' and YouTube as ' + ext(YT, '@eviljaythedevil') + '.' },
    { k: 'join|army|list|newsletter|updates|sign up|signup|subscribe|first dibs',
      a: 'Join the Evil Army to get first dibs on shows and new music. ' + '<a href="#" id="chat-join" style="color:#ff6a00;font-weight:700">Tap here to join</a>. It opens a text to Jay. Press Send to finish.' },
    { k: 'contact|email|phone|reach|text him|number|dm|message jay|talk to jay',
      a: 'The fastest way is the ' + go('#booking', 'booking form') + ', which texts Jay directly. You can also email eviljaythedevil@yahoo.com.' },
    { k: 'who|about|bio|from|minneapolis|vegas|las vegas|jay frazier|comedian|evil jay',
      a: 'EvilJayTheDevil, also known as EvilJay and Jay Frazier, is a comedian, podcast host and music artist. Born in Minneapolis, based in Las Vegas.' },
    { k: 'are you a bot|are you real|are you ai|robot|human|bot',
      a: "I'm an automated assistant for this site, not a person. For a real reply from Jay, use the " + go('#booking', 'booking form') + '.' },
    { k: 'thanks|thank you|thx|appreciate',
      a: 'Anytime. Let me know if you need anything else.' },
    { k: '^(hi|hey|yo|hello|sup|whats up|what\'s up|howdy)\\b',
      a: 'Yo! I can help with booking, music, the podcast, videos or contact info. What do you need?' }
  ];
  var fallback = "Not sure about that one. I can help with booking, music, the podcast, videos or contact. Or ask Jay directly through the " + go('#booking', 'booking form') + '.';
  function esc(t) { return String(t).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function answer(q) {
    q = q.toLowerCase().replace(/[?!.,]/g, ' ');
    var best = null, bs = 0;
    intents.forEach(function (it) {
      var m = q.match(new RegExp('\\b(' + it.k + ')\\b', 'g')) || q.match(new RegExp(it.k, 'g'));
      var s = m ? m.length : 0;
      if (s > bs) { bs = s; best = it; }
    });
    return best ? best.a : fallback;
  }
  function wireJoin() {
    var j = document.getElementById('chat-join');
    if (j) { j.id = ''; j.onclick = function (e) { e.preventDefault(); document.getElementById('chat-box').style.display = 'none'; var f = document.getElementById('fan-modal'); if (f) f.style.display = 'grid'; }; }
  }
  function ask(v) {
    msgs.innerHTML += '<br><br><b>You:</b> ' + esc(v) + '<br><b>Evil J:</b> <span class="bot-new">...</span>';
    var spans = msgs.querySelectorAll('.bot-new'), sp = spans[spans.length - 1];
    setTimeout(function () { sp.innerHTML = answer(v); sp.className = ''; wireJoin(); var box = document.getElementById('chat-box'); box.scrollTop = box.scrollHeight; }, 450);
  }
  inp.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || !inp.value.trim()) return;
    var v = inp.value.trim().slice(0, 200); inp.value = ''; ask(v);
  });
  var chips = ['Book Jay', 'Music', 'Podcast', 'Videos', 'Contact'], row = document.createElement('div');
  row.style.cssText = 'margin-top:10px;display:flex;flex-wrap:wrap;gap:6px';
  chips.forEach(function (c) {
    var b = document.createElement('button'); b.textContent = c;
    b.style.cssText = 'background:#c1121f;color:#fff;border:none;border-radius:14px;padding:6px 10px;font-size:12px;cursor:pointer';
    b.onclick = function () { ask(c === 'Book Jay' ? 'book jay' : c); };
    row.appendChild(b);
  });
  msgs.parentNode.insertBefore(row, msgs.nextSibling);
});
