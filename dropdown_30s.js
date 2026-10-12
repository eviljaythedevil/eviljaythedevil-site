// 30 sec dropdown - up then down, stays down
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('header, #topBanner, nav, .banner');
  if (!banner) return;
  
  banner.style.transition = 'transform 0.7s cubic-bezier(.34,1.56,.64,1)';
  banner.style.willChange = 'transform';
  
  // 1. go UP after 1 sec (hide)
  setTimeout(() => {
    banner.style.transform = 'translateY(-110%)';
  }, 1000);
  
  // 2. go DOWN after 30 sec total, stays down
  setTimeout(() => {
    banner.style.transform = 'translateY(0)';
  }, 30000);
});
