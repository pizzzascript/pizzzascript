/* ============================================
   🍕 PIZZA SCRIPT — Typewriter Effect
   Terminal-style typing animation for the hero.
   ============================================ */

function initTypewriter() {
  const container = document.getElementById('typewriter-output');
  const lines = container.querySelectorAll('.typewriter-line');
  const heroCTAs = document.getElementById('hero-ctas');

  if (isReducedMotion()) {
    // Show everything immediately
    lines.forEach(line => {
      line.textContent = line.dataset.text;
      line.classList.add('visible');
    });
    if (heroCTAs) heroCTAs.classList.add('visible');
    return;
  }

  let currentLine = 0;

  function typeLine(lineEl, text, callback) {
    lineEl.classList.add('visible', 'typing');
    let charIndex = 0;

    function typeChar() {
      if (charIndex < text.length) {
        lineEl.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeChar, 45 + Math.random() * 30);
      } else {
        lineEl.classList.remove('typing');
        setTimeout(callback, 400);
      }
    }

    typeChar();
  }

  function typeNextLine() {
    if (currentLine < lines.length) {
      const line = lines[currentLine];
      const text = line.dataset.text;
      currentLine++;
      typeLine(line, text, typeNextLine);
    } else {
      // All lines typed — show CTAs
      if (heroCTAs) {
        heroCTAs.classList.add('visible');
      }
    }
  }

  // Start after a brief delay
  setTimeout(typeNextLine, 800);
}
