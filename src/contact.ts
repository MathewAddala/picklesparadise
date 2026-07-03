/**
 * contact.ts — Contact form handler
 *
 * Handles form submission with a "thank you" toast,
 * field validation, and pre-filled product selection
 * from catalog CTA clicks.
 */

interface ContactState {
  form: HTMLFormElement;
  submitBtn: HTMLButtonElement;
  submitText: HTMLElement;
  submitLoader: HTMLElement;
  toast: HTMLElement;
  productSelect: HTMLSelectElement;
}

let contactState: ContactState;

/** Show the success toast */
function showToast(): void {
  contactState.toast.style.display = '';
  
  // Auto-hide after 4 seconds
  setTimeout(() => {
    contactState.toast.style.display = 'none';
  }, 4000);
}

/** Handle form submission */
function handleSubmit(e: Event): void {
  e.preventDefault();
  
  // Basic validation
  const name = (document.getElementById('contact-name') as HTMLInputElement).value.trim();
  const phone = (document.getElementById('contact-phone') as HTMLInputElement).value.trim();
  
  if (!name || !phone) {
    return;
  }
  
  // Show loading state
  contactState.submitText.style.display = 'none';
  contactState.submitLoader.style.display = '';
  contactState.submitBtn.disabled = true;
  
  // Simulate submission (no backend)
  setTimeout(() => {
    // Reset form
    contactState.form.reset();
    
    // Reset button
    contactState.submitText.style.display = '';
    contactState.submitLoader.style.display = 'none';
    contactState.submitBtn.disabled = false;
    
    // Show success toast
    showToast();
  }, 1200);
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
    productSelect: document.getElementById('contact-product') as HTMLSelectElement,
  };
  
  form.addEventListener('submit', handleSubmit);
  setupContactReveal();
}
