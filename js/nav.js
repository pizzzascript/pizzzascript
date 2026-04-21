/* ============================================
   🍕 PIZZA SCRIPT — Navigation
   Sticky nav, mobile menu, scroll progress,
   active section highlight, back-to-top.
   ============================================ */

function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.navbar-link');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');
  const allNavLinks = document.querySelectorAll('.navbar-link, .mobile-menu-link, .navbar-cta, .mobile-menu .btn-primary');
  const sections = document.querySelectorAll('main .section');

  // ---- Sticky navbar on scroll ----
  function handleScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class after 100px
    if (scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > window.innerHeight) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Scroll progress bar
    const percent = getScrollPercent() * 100;
    scrollProgress.style.width = percent + '%';
    scrollProgress.setAttribute('aria-valuenow', Math.round(percent));
  }

  window.addEventListener('scroll', throttle(handleScroll, 16));
  handleScroll(); // Initial call

  // ---- Mobile hamburger toggle ----
  hamburger.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('mobile-menu-open');
    hamburger.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
      // Focus first link in mobile menu
      const firstLink = mobileMenu.querySelector('.mobile-menu-link');
      if (firstLink) firstLink.focus();
    }
  });

  // Close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
      document.body.classList.remove('mobile-menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });

  // ---- Smooth scroll for all nav links ----
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // Close mobile menu first
          document.body.classList.remove('mobile-menu-open');
          hamburger.setAttribute('aria-expanded', 'false');

          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ---- Active section highlighting ----
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        navLinks.forEach(link => {
          if (link.dataset.section === sectionId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  // ---- Back to top button ----
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// Play navbar logo animation on hover
const navLottie = document.getElementById('nav-lottie');
if (navLottie) {
  navLottie.addEventListener('mouseenter', () => {
    navLottie.seek(0);
    navLottie.play();
  });
  navLottie.addEventListener('mouseleave', () => {
    navLottie.stop();
  });
}