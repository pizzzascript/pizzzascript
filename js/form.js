/* ============================================
   🍕 PIZZA SCRIPT — Form Handling
   Client-side validation + Formspree submission.
   ============================================ */

function initForm() {
  const form = document.getElementById('order-form');
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');
  const budgetSlider = document.getElementById('budget');
  const budgetDisplay = document.getElementById('budget-display');

  if (!form) return;

  // ---- Budget slider live update (INR) ----
  function updateBudgetDisplay() {
    const value = parseInt(budgetSlider.value);
    budgetDisplay.textContent = '₹' + value.toLocaleString('en-IN');
  }

  budgetSlider.addEventListener('input', updateBudgetDisplay);
  updateBudgetDisplay();

  // ---- Validation ----
  function validateField(name) {
    const group = document.getElementById('field-' + name);
    if (!group) return true;

    let isValid = true;

    switch (name) {
      case 'name': {
        const input = document.getElementById('customer-name');
        isValid = input.value.trim().length >= 2;
        break;
      }
      case 'email': {
        const input = document.getElementById('customer-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(input.value.trim());
        break;
      }
      case 'project': {
        const select = document.getElementById('project-type');
        isValid = select.value !== '';
        break;
      }
      default:
        isValid = true;
    }

    group.classList.toggle('error', !isValid);
    group.classList.toggle('valid', isValid);
    return isValid;
  }

  // Validate on blur
  ['customer-name', 'customer-email', 'project-type'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', () => {
        const name = id === 'customer-name' ? 'name' :
                     id === 'customer-email' ? 'email' : 'project';
        validateField(name);
      });
    }
  });

  // ---- Form submit → Formspree ----
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameValid    = validateField('name');
    const emailValid   = validateField('email');
    const projectValid = validateField('project');

    if (!nameValid || !emailValid || !projectValid) {
      if (!nameValid)       document.getElementById('customer-name').focus();
      else if (!emailValid) document.getElementById('customer-email').focus();
      else                  document.getElementById('project-type').focus();
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.textContent = '🔥 Firing up the oven...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMessage.className = 'form-message success';
        formMessage.textContent = '🍕 Order received! I\'ll start preheating your project and get back to you within 24 hours.';
        form.reset();
        updateBudgetDisplay();
        document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error', 'valid'));
      } else {
        throw new Error('Server error');
      }
    } catch {
      formMessage.className = 'form-message error';
      formMessage.textContent = '⚠️ Something went wrong. Please email me directly at pizzzascript@gmail.com';
    }

    formMessage.style.display = 'block';
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    setTimeout(() => { formMessage.style.display = 'none'; }, 6000);
  });
}
