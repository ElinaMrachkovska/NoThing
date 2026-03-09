'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.querySelector('.contacts__name');
  const emailInput = document.querySelector('.contacts__email');
  const messageInput = document.querySelector('.contacts__message');
  const sendButton = document.querySelector('.contacts__button');

  function showError(input, message) {
    input.classList.add('contacts__input-error');

    let errorEl = input.nextElementSibling;

    if (!errorEl || !errorEl.classList.contains('contacts__error-message')) {
      errorEl = document.createElement('span');
      errorEl.classList.add('contacts__error-message');
      input.insertAdjacentElement('afterend', errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('contacts__input-error');

    const errorEl = input.nextElementSibling;

    if (errorEl && errorEl.classList.contains('contacts__error-message')) {
      errorEl.remove();
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showToast(message) {
    const style = document.createElement('style');

    style.textContent = `
      @keyframes toastPulse {
        0%   { transform: translate(-50%, -50%) scale(1); }
        25%  { transform: translate(-50%, -50%) scale(1.06); }
        50%  { transform: translate(-50%, -50%) scale(1); }
        75%  { transform: translate(-50%, -50%) scale(1.06); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }
    `;
    document.head.appendChild(style);

    const toast = document.createElement('div');

    toast.textContent = message;

    toast.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #c9a227, #f0d070);
      color: #1a1a1a;
      padding: 20px 32px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 700;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
      white-space: nowrap;
      box-shadow: 0 8px 24px rgba(201, 162, 39, 0.4);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
    }, 10);

    setTimeout(() => {
      toast.style.animation = 'toastPulse 0.8s ease 2';
    }, 410);

    setTimeout(() => {
      toast.style.opacity = '0';

      toast.addEventListener('transitionend', () => {
        toast.remove();
        style.remove();
      });
    }, 3200);
  }

  sendButton.addEventListener('click', (e) => {
    e.preventDefault();

    let isValid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Enter a valid email');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, 'Message is required');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
      showToast('Message sent successfully!');
    }
  });

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });
});
