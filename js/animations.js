/* ============================================
   🍕 PIZZA SCRIPT — Scroll Animations
   Intersection Observer for scroll-triggered
   reveal animations.
   ============================================ */

function initAnimations() {
  if (isReducedMotion()) return;

  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // ---- Neon flicker random delay ----
  const neonElements = document.querySelectorAll('.neon-flicker, .neon-flicker--slow, .neon-flicker--fast');
  neonElements.forEach(el => {
    el.style.animationDelay = (Math.random() * 2).toFixed(2) + 's';
  });
}
