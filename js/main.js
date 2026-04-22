/* ============================================
   🍕 PIZZA SCRIPT — Main Entry Point
   Initializes all modules on DOM ready.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNav();
  initAnimations();
  initForm();

  // ---- Initialize Lottie Animations ----
  // Animation data is loaded via <script> tag as a global variable
  // (avoids fetch/XHR which Chrome blocks on file:// protocol)
  if (typeof lottie !== 'undefined' && typeof pizzaGlitchAnimationData !== 'undefined') {
    // Preloader animation
    const preloaderContainer = document.getElementById('preloader-lottie');
    if (preloaderContainer) {
      lottie.loadAnimation({
        container: preloaderContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: pizzaGlitchAnimationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      });
    }

    // Navbar logo animation
    const navContainer = document.getElementById('nav-lottie');
    if (navContainer) {
      lottie.loadAnimation({
        container: navContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: pizzaGlitchAnimationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      });
    }
  }

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
    setTimeout(() => { preloaderFill.style.width = '40%'; }, 800);
    setTimeout(() => { preloaderFill.style.width = '75%'; }, 2500);
    setTimeout(() => { preloaderFill.style.width = '95%'; }, 4500);
  }

  // Preloader stays on screen for exactly 5 seconds, whilst the lottie continuously loops
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      hidePreloader();
    }
  }, 5000);
});
