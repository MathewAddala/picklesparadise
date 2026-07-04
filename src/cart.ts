import { type Product, PRODUCTS } from './catalog';

// Cart State: productId -> quantity
const cart: Map<string, number> = new Map();

/** Get details of a product by ID */
function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** Get all items currently in the cart */
export function getCartItems() {
  const items: { product: Product; quantity: number }[] = [];
  cart.forEach((quantity, id) => {
    const product = getProductById(id);
    if (product && quantity > 0) {
      items.push({ product, quantity });
    }
  });
  return items;
}

/** Get total price of all items in cart */
export function getCartTotal(): number {
  let total = 0;
  getCartItems().forEach(({ product, quantity }) => {
    const priceNum = parseInt(product.price.replace(/[^\d]/g, ''), 10);
    total += priceNum * quantity;
  });
  return total;
}

/** Get total count of items in cart */
export function getCartCount(): number {
  let count = 0;
  cart.forEach((quantity) => {
    count += quantity;
  });
  return count;
}

/** Add an item to the cart */
export function addToCart(id: string): void {
  const current = cart.get(id) || 0;
  cart.set(id, current + 1);
  syncCartUI();
}

/** Decrease quantity or remove from cart */
export function removeFromCart(id: string): void {
  const current = cart.get(id) || 0;
  if (current <= 1) {
    cart.delete(id);
  } else {
    cart.set(id, current - 1);
  }
  syncCartUI();
}

/** Clear all items from the cart */
export function clearCart(): void {
  cart.clear();
  syncCartUI();
}

/** Sync all cart elements on the page */
export function syncCartUI(): void {
  // 1. Sync Catalog Card Buttons (Quantity Selectors / ADD buttons)
  const wrappers = document.querySelectorAll('.catalog__action-wrapper');
  wrappers.forEach((wrapper) => {
    const el = wrapper as HTMLElement;
    const productId = el.dataset.productId || '';
    const quantity = cart.get(productId) || 0;
    const isMobile = el.classList.contains('catalog__action-wrapper--mobile');
    
    if (quantity === 0) {
      // Render ADD button
      if (isMobile) {
        el.innerHTML = `<button class="catalog__card-cta catalog__card-cta--mobile cart-add-btn" data-product="${productId}">ADD</button>`;
      } else {
        el.innerHTML = `<button class="catalog__card-cta catalog__card-cta--desktop cart-add-btn" data-product="${productId}">ADD</button>`;
      }
    } else {
      // Render quantity selector [ - ] [ qty ] [ + ]
      const selectorClass = isMobile ? 'cart-qty-selector cart-qty-selector--mobile' : 'cart-qty-selector cart-qty-selector--desktop';
      el.innerHTML = `
        <div class="${selectorClass}">
          <button class="cart-qty-btn cart-qty-btn--minus" data-product="${productId}">-</button>
          <span class="cart-qty-value">${quantity}</span>
          <button class="cart-qty-btn cart-qty-btn--plus" data-product="${productId}">+</button>
        </div>
      `;
    }
  });

  // 2. Sync Floating Cart Bar
  const floatingBar = document.getElementById('cart-floating-bar');
  const countEl = document.getElementById('cart-floating-count');
  const totalEl = document.getElementById('cart-floating-total');
  const count = getCartCount();
  
  if (floatingBar && countEl && totalEl) {
    if (count > 0) {
      countEl.textContent = `${count} Item${count > 1 ? 's' : ''}`;
      totalEl.textContent = `₹${getCartTotal()}`;
      floatingBar.classList.add('cart-floating-bar--active');
    } else {
      floatingBar.classList.remove('cart-floating-bar--active');
    }
  }

  // 3. Sync Order Summary in Contact Form
  const summaryEl = document.getElementById('cart-summary');
  if (summaryEl) {
    const items = getCartItems();
    if (items.length === 0) {
      summaryEl.innerHTML = `
        <div class="cart-summary__empty">
          <p>Your cart is empty.</p>
          <button type="button" class="cart-summary__empty-btn" id="empty-shop-btn">Shop Pickles</button>
        </div>
      `;
      // Bind smooth scroll on empty state button click
      const shopBtn = document.getElementById('empty-shop-btn');
      if (shopBtn) {
        shopBtn.addEventListener('click', () => {
          const catalogSection = document.getElementById('catalog');
          if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    } else {
      let itemsHtml = '';
      items.forEach(({ product, quantity }) => {
        const priceNum = parseInt(product.price.replace(/[^\d]/g, ''), 10);
        const subtotal = priceNum * quantity;
        
        itemsHtml += `
          <div class="cart-summary__item">
            <div class="cart-summary__item-info">
              <span class="cart-summary__item-name">${product.name}</span>
              <span class="cart-summary__item-weight">${product.weight}</span>
            </div>
            <div class="cart-summary__item-actions">
              <div class="cart-summary__item-qty-selector">
                <button type="button" class="cart-summary__item-qty-btn cart-qty-btn--minus" data-product="${product.id}">-</button>
                <span class="cart-summary__item-qty-value">${quantity}</span>
                <button type="button" class="cart-summary__item-qty-btn cart-qty-btn--plus" data-product="${product.id}">+</button>
              </div>
              <span class="cart-summary__item-price">₹${subtotal}</span>
            </div>
          </div>
        `;
      });

      summaryEl.innerHTML = `
        <div class="cart-summary__list">
          ${itemsHtml}
          <div class="cart-summary__totals">
            <span class="cart-summary__total-label">Grand Total</span>
            <span class="cart-summary__total-price">₹${getCartTotal()}</span>
          </div>
        </div>
      `;
    }
  }
}

/** Format order message and generate WhatsApp link */
export function getWhatsAppUrl(name: string, phone: string, message: string): string {
  const items = getCartItems();
  let orderDetails = '';
  
  items.forEach(({ product, quantity }) => {
    const priceNum = parseInt(product.price.replace(/[^\d]/g, ''), 10);
    orderDetails += `- ${quantity} x ${product.name} (${product.weight}) - ₹${priceNum * quantity}\n`;
  });
  
  const textMessage = `Hello Pickles Paradise! 🌶️\n\n` +
    `I would like to place an order:\n\n` +
    `--------------------------------------\n` +
    `🛒 ORDER SUMMARY:\n` +
    `${orderDetails}` +
    `--------------------------------------\n` +
    `💵 GRAND TOTAL: ₹${getCartTotal()}\n\n` +
    `👤 CUSTOMER DETAILS:\n` +
    `- Name: ${name}\n` +
    `- Phone: ${phone}\n` +
    (message.trim() ? `- Message: ${message.trim()}\n` : '') +
    `\nThank you!`;

  return `https://wa.me/918401134904?text=${encodeURIComponent(textMessage)}`;
}

/** Initialize Cart module and listeners */
export function initCart(): void {
  // Bind global click listeners for cart actions
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    // Add Button Click
    if (target.classList.contains('cart-add-btn')) {
      e.preventDefault();
      const productId = target.dataset.product || '';
      addToCart(productId);
    }
    
    // Plus Button Click
    if (target.classList.contains('cart-qty-btn--plus')) {
      e.preventDefault();
      const productId = target.dataset.product || '';
      addToCart(productId);
    }
    
    // Minus Button Click
    if (target.classList.contains('cart-qty-btn--minus')) {
      e.preventDefault();
      const productId = target.dataset.product || '';
      removeFromCart(productId);
    }

    // Scroll to contact when clicking view order in floating bar
    if (target.id === 'cart-floating-action' || target.closest('#cart-floating-action')) {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        // Let anchor tag navigate with smooth scroll override
        const anchor = document.getElementById('cart-floating-action') as HTMLAnchorElement;
        if (anchor) {
          e.preventDefault();
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });

  // Initial UI Render
  syncCartUI();
}
