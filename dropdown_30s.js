// 30 sec - ONLY dropdown menu moves, hero stays still
document.addEventListener('DOMContentLoaded', () => {
  // only the dropdown, never header/hero/banner
  const menu = document.querySelector('.dropdown-menu, #dropdownMenu, .dropdown, .nav-dropdown, [data-dropdown]');
  if (!menu) return;

  menu.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
  menu.style.transformOrigin = 'top';
  menu.style.willChange = 'transform';

  // start hidden UP
  menu.style.transform = 'translateY(-120%)';
  menu.style.opacity = '0';
  menu.style.pointerEvents = 'none';

  // stay UP
  setTimeout(() => {
    menu.style.transform = 'translateY(-120%)';
  }, 1000);

  // after 30 sec go DOWN and stay down
  setTimeout(() => {
    menu.style.transform = 'translateY(0)';
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'auto';
  }, 30000);
});

// make sure hero/header never moves
document.querySelectorAll('header, .hero, #hero, .banner, #topBanner').forEach(el=>{
  el.style.transform='none';
});
