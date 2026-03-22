/* ============================================
   🍕 PIZZA SCRIPT — Main Entry Point
   Initializes all modules on DOM ready.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNav();
  initTypewriter();
  initAnimations();
  initForm();

  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloader-fill');

  // Animate preloader bar
  if (preloaderFill) {
    setTimeout(() => { preloaderFill.style.width = '30%'; }, 100);
    setTimeout(() => { preloaderFill.style.width = '60%'; }, 300);
    setTimeout(() => { preloaderFill.style.width = '90%'; }, 600);
  }

  function hidePreloader() {
    if (preloaderFill) preloaderFill.style.width = '100%';

    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
        document.body.classList.remove('loading');

        setTimeout(() => {
          preloader.remove();
        }, 500);
      }
    }, 300);
  }

  // Hide preloader when page is fully loaded
  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
  }

  // Force-hide after 3 seconds in case of slow assets
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      hidePreloader();
    }
  }, 3000);
});
