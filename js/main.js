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

  // Fill bar smoothly over the animation duration
  if (preloaderFill) {
    setTimeout(() => { preloaderFill.style.width = '40%'; }, 300);
    setTimeout(() => { preloaderFill.style.width = '75%'; }, 1000);
    setTimeout(() => { preloaderFill.style.width = '95%'; }, 2000);
  }

  // Hide when Lottie animation completes one play
  const lottie = document.getElementById('preloader-lottie');
  if (lottie) {
    lottie.addEventListener('complete', hidePreloader, { once: true });
  }

  // Force-hide after 5 seconds as fallback
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      hidePreloader();
    }
  }, 5000);
});
