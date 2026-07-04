import { getWhatsAppUrl, getCartCount, clearCart } from './cart';

interface ContactState {
  form: HTMLFormElement;
  submitBtn: HTMLButtonElement;
  submitText: HTMLElement;
  submitLoader: HTMLElement;
  toast: HTMLElement;
}

let contactState: ContactState;

/** Show the success toast */
function showToast(messageHtml?: string): void {
  const toastText = contactState.toast.querySelector('p');
  if (toastText && messageHtml) {
    toastText.innerHTML = messageHtml;
  }
  contactState.toast.style.display = '';
  
  // Auto-hide after 4 seconds
  setTimeout(() => {
    contactState.toast.style.display = 'none';
  }, 4000);
}

/** Handle form submission */
function handleSubmit(e: Event): void {
  e.preventDefault();
  
  // 1. Validate Cart count
  const cartCount = getCartCount();
  if (cartCount === 0) {
    showToast('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right: 6px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Please add at least one pickle to your order above!');
    return;
  }

  // 2. Validate Inputs
  const nameInput = document.getElementById('contact-name') as HTMLInputElement;
  const phoneInput = document.getElementById('contact-phone') as HTMLInputElement;
  const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput ? messageInput.value.trim() : '';
  
  if (!name || !phone) {
    return;
  }
  
  // Show loading state
  contactState.submitText.style.display = 'none';
  contactState.submitLoader.style.display = '';
  contactState.submitBtn.disabled = true;
  
  // Redirect to WhatsApp with formatted order
  const whatsappUrl = getWhatsAppUrl(name, phone, message);
  
  setTimeout(() => {
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset Form
    contactState.form.reset();
    
    // Clear the cart state and UI
    clearCart();
    
    // Reset button state
    contactState.submitText.style.display = '';
    contactState.submitLoader.style.display = 'none';
    contactState.submitBtn.disabled = false;
    
    // Show success toast
    showToast('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right: 6px;"><polyline points="20 6 9 17 4 12"/></svg> Redirecting to WhatsApp to complete your order!');
  }, 800);
}

/** Reveal the contact section elements */
function setupContactReveal(): void {
  const info = document.querySelector('.contact__info');
  const formWrap = document.querySelector('.contact__form-wrap');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  
  if (info) {
    info.classList.add('reveal');
    observer.observe(info);
  }
  if (formWrap) {
    formWrap.classList.add('reveal');
    formWrap.setAttribute('style', 'transition-delay: 0.15s;');
    observer.observe(formWrap);
  }
}

/** Initialize the contact module */
export function initContact(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  if (!form) return;
  
  contactState = {
    form,
    submitBtn: document.getElementById('contact-submit') as HTMLButtonElement,
    submitText: form.querySelector('.contact__submit-text') as HTMLElement,
    submitLoader: form.querySelector('.contact__submit-loader') as HTMLElement,
    toast: document.getElementById('contact-toast') as HTMLElement,
  };
  
  form.addEventListener('submit', handleSubmit);
  setupContactReveal();

  // Make the anchor Order via WhatsApp button trigger form submission (with validation)
  const whatsappBtn = form.querySelector('.contact__whatsapp-btn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // HTML5 Form validation check
      if (form.reportValidity()) {
        form.requestSubmit();
      }
    });
  }
}
