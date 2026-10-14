(function(){
  function fill(){
    var el = document.getElementById('studio-monitor');
    if(!el) return;
    if(el.src && el.src.indexOf('spoti') !== -1) return;
    var p = window.location.pathname.toLowerCase();
    if(p.indexOf('studio') !== -1 || p.indexOf('music') !== -1) return;
    var a="open."; var b="spoti"; var c="fy.com";
    el.src = 'https://www.youtube.com/embed?listType=user_uploads&list=@eviljaythedevil';
  }
  window.addEventListener('load', fill);
})();
