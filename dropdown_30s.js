// YO-YO dropdown - 30s down, 15s readable, then back up - hero stays
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.dropdown-menu, #dropdownMenu, .dropdown, .nav-dropdown, [data-dropdown]');
  if (!menu) return;

  // clean setup - only menu moves
  menu.style.transition = 'transform 0.6s cubic-bezier(.34,1.56,.64,1), opacity 0.5s ease';
  menu.style.transformOrigin = 'top';
  menu.style.transform = 'translateY(-130%)';
  menu.style.opacity = '0';
  menu.style.pointerEvents = 'none';

  // after 30 seconds - DROP DOWN
  setTimeout(() => {
    menu.style.transform = 'translateY(0)';
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'auto';

    // stay 15 seconds, then GO BACK UP
    setTimeout(() => {
      menu.style.transform = 'translateY(-130%)';
      menu.style.opacity = '0';
      menu.style.pointerEvents = 'none';
    }, 15000);

  }, 30000);
});
