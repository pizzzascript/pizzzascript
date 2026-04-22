/* ============================================
   🍕 PIZZA SCRIPT — Hero Animation
   Scroll-driven image sequence — DESKTOP ONLY.
   On mobile, a Lottie animation is used instead
   (handled entirely via CSS display + HTML).
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Exit immediately on mobile — CSS handles hiding/showing elements
  if (window.matchMedia("(max-width: 768px)").matches) return;

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
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
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
      if (loadedCount === 1) setCanvasSize();
    });
    images.push(img);
  }

  let currentImageIndex = 0;

  function render() {
    if (!images[currentImageIndex]) return;
    const img = images[currentImageIndex];
    if (img.complete && img.naturalWidth > 0) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;

      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }

  window.addEventListener('resize', setCanvasSize);

  // Scroll-driven animation (desktop only)
  window.addEventListener('scroll', () => {
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
