/* ============================================
   🍕 PIZZA SCRIPT — Form Handling
   Client-side validation and submit animation.
   ============================================ */

function initForm() {
  const form = document.getElementById('order-form');
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');
  const budgetSlider = document.getElementById('budget');
  const budgetDisplay = document.getElementById('budget-display');

  if (!form) return;

  // ---- Budget slider live update ----
  function updateBudgetDisplay() {
    const value = parseInt(budgetSlider.value);
    budgetDisplay.textContent = '$' + value.toLocaleString();
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

  // ---- Form submit ----
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    const nameValid = validateField('name');
    const emailValid = validateField('email');
    const projectValid = validateField('project');

    if (!nameValid || !emailValid || !projectValid) {
      // Focus first invalid field
      if (!nameValid) document.getElementById('customer-name').focus();
      else if (!emailValid) document.getElementById('customer-email').focus();
      else if (!projectValid) document.getElementById('project-type').focus();
      return;
    }

    // Simulate submission
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '🔥 Firing up the oven...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formMessage.className = 'form-message success';
      formMessage.textContent = '🍕 Order received! I\'ll start preheating your project and get back to you within 24 hours.';
      formMessage.style.display = 'block';
      submitBtn.textContent = '✅ Order Placed!';

      // Reset after delay
      setTimeout(() => {
        form.reset();
        updateBudgetDisplay();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        formMessage.style.display = 'none';

        // Remove validation classes
        document.querySelectorAll('.form-group').forEach(g => {
          g.classList.remove('error', 'valid');
        });
      }, 4000);
    }, 2000);
  });
}
