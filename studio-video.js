(function () {
  var SRC = 'https://www.youtube-nocookie.com/embed/videoseries?list=UUb93fPn7yL9V68jntdSG_ZQ&rel=0&playsinline=1';
  function fill() {
    var f = document.querySelector('iframe');
    if (!f) {
      var host = document.querySelector('[class*="monitor"],[id*="monitor"]');
      if (!host) return;
      f = document.createElement('iframe');
      f.style.cssText = 'width:100%;height:100%;min-height:300px;border:0';
      host.appendChild(f);
    }
    if (f.src === SRC) return;
    f.removeAttribute('srcdoc');
    f.src = SRC;
    f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    f.style.border = '0';
  }
  if (document.readyState === 'complete') fill();
  else window.addEventListener('load', fill);
  setTimeout(fill, 2000);
})();
