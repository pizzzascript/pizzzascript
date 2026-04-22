/* ============================================
   🍕 PIZZA SCRIPT — Hero Animation
   Scroll-driven image sequence for both
   desktop and mobile views.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');

  const frameCount = 96;
  const currentFrame = index => `assets/images/hero/frame (${index}).jpg`;

  const images = [];
  const heroSection = document.getElementById('kitchen');
  if (!heroSection) return;

  function setCanvasSize() {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || canvas.offsetWidth;
    const h = canvas.clientHeight || canvas.offsetHeight;
    if (w === 0 || h === 0) return; // not laid out yet

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    render();
  }

  // Preload images
  let loadedCount = 0;

  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.addEventListener('load', () => {
      loadedCount++;
      if (loadedCount === 1) {
        requestAnimationFrame(() => setCanvasSize());
      }
    });
    images.push(img);
  }

  let currentImageIndex = 0;

  function render() {
    // Dynamically abort and clear on mobile
    if (window.innerWidth <= 768) {
      if (canvas.style.display !== 'none') canvas.style.display = 'none';
      return;
    } else {
      if (canvas.style.display === 'none') {
        canvas.style.display = 'block';
        setCanvasSize();
      }
    }

    if (!images[currentImageIndex]) return;
    const img = images[currentImageIndex];
    if (img.complete && img.naturalWidth > 0) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Cover the canvas (like background-size: cover)
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      requestAnimationFrame(setCanvasSize);
    } else {
      canvas.style.display = 'none';
    }
  });

  /* ============================================
     Scroll-driven animation (both desktop & mobile)
     ============================================ */
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) return; // Completely disable scroll functionality on mobile

    const rect = heroSection.getBoundingClientRect();
    const maxScroll = heroSection.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const scrolled = -rect.top;
    let progress = scrolled / maxScroll;
    progress = Math.max(0, Math.min(1, progress));

    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(progress * frameCount)
    );

    if (frameIndex !== currentImageIndex) {
      currentImageIndex = frameIndex;
      requestAnimationFrame(render);
    }
  }, { passive: true });
});
