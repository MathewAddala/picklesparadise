/**
 * catalog.ts — Product catalog with glassmorphic cards
 *
 * Renders product cards into the grid, handles tab switching,
 * card entrance animations via IntersectionObserver, and CTA
 * click routing to the contact form with product pre-fill.
 */

interface Product {
  id: string;
  name: string;
  description: string;
  emoji: string;
  weight: string;
  price: string;
  halaal: boolean;
  image?: string; // optional — will use placeholder if absent
}

const PRODUCTS: Product[] = [
  {
    id: 'prawns',
    name: 'Prawns Pickle',
    description: 'Succulent prawns marinated in fiery Andhra spices with a tangy kick that lingers on your palate.',
    emoji: '🦐',
    weight: '250g',
    price: '₹350',
    halaal: false,
    image: '/prawnsitem.jpeg',
  },
  {
    id: 'chicken-boneless',
    name: 'Chicken Boneless Pickle',
    description: 'Tender boneless chicken pieces slow-cooked in a rich masala blend of traditional spices.',
    emoji: '🍗',
    weight: '250g',
    price: '₹300',
    halaal: false,
  },
  {
    id: 'chicken-bone',
    name: 'Chicken Bone Pickle',
    description: 'Classic bone-in chicken pickle with robust flavors, prepared with Halaal-certified meat.',
    emoji: '🍗',
    weight: '250g',
    price: '₹280',
    halaal: true,
  },
  {
    id: 'naatu-kodi',
    name: 'Naatu Kodi Pickle',
    description: 'Authentic country chicken pickle with rustic, earthy flavors from free-range poultry.',
    emoji: '🐓',
    weight: '250g',
    price: '₹380',
    halaal: false,
  },
  {
    id: 'mutton',
    name: 'Mutton Pickle',
    description: 'Premium mutton slow-cooked with aromatic whole spices, Halaal certified for your trust.',
    emoji: '🥩',
    weight: '250g',
    price: '₹450',
    halaal: true,
  },
  {
    id: 'fish',
    name: 'Fish Pickle',
    description: 'Traditional Andhra-style fish pickle with the perfect balance of tangy, spicy, and savory.',
    emoji: '🐟',
    weight: '250g',
    price: '₹320',
    halaal: false,
  },
  {
    id: 'kormeenu',
    name: 'Kormeenu Boneless Pickle',
    description: 'Boneless Kormeenu fish in a tangy spice mix — a coastal delicacy you won\'t forget.',
    emoji: '🐠',
    weight: '250g',
    price: '₹340',
    halaal: false,
  },
];

/** Helper to generate a professional vector jar placeholder with content symbol */
function getPlaceholderSvg(product: Product): string {
  return `
    <div class="jar-placeholder">
      <svg class="jar-placeholder__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 3h6v2H9V3z" />
        <path d="M6 7v12a3 3 0 003 3h6a3 3 0 003-3V7c0-1.5-1.5-2-3-2H9C7.5 5 6 5.5 6 7z" />
        <path d="M8 11h8" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <path d="M8 15h8" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <circle cx="12" cy="13" r="3.5" fill="rgba(218, 165, 32, 0.05)" stroke="var(--color-primary)" stroke-width="1"/>
      </svg>
      <span class="jar-placeholder__emoji">${product.emoji}</span>
    </div>
  `;
}

/** Create a single product card element */
function createCard(product: Product, index: number): HTMLElement {
  const card = document.createElement('div');
  card.className = 'catalog__card reveal';
  card.style.setProperty('--card-index', String(index));
  
  const imageContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" loading="lazy" />`
    : getPlaceholderSvg(product);
  
  const halaalBadge = product.halaal
    ? `<span class="catalog__card-halaal">☪ Halaal</span>`
    : '';

  const halaalTag = product.halaal
    ? `<span class="catalog__card-tag halaal-tag">☪ Halaal</span>`
    : '';
  
  card.innerHTML = `
    <div class="catalog__card-image">
      ${imageContent}
      <span class="catalog__card-badge">${product.weight}</span>
      ${halaalBadge}
      <!-- Mobile Swiggy-style overlapping action button -->
      <a href="#contact" class="catalog__card-cta catalog__card-cta--mobile" data-product="${product.id}">ADD</a>
    </div>
    <div class="catalog__card-body">
      ${halaalTag ? `<div class="catalog__card-tags">${halaalTag}</div>` : ''}
      <h3 class="catalog__card-name">
        <span class="nonveg-indicator" title="Non-Veg"></span>
        ${product.name}
      </h3>
      <p class="catalog__card-desc">${product.description}</p>
      <div class="catalog__card-footer">
        <div class="catalog__card-price-group">
          <span class="catalog__card-price">${product.price}</span>
          <span class="catalog__card-weight">/ ${product.weight}</span>
        </div>
        <a href="#contact" class="catalog__card-cta catalog__card-cta--desktop" data-product="${product.id}">Order Now</a>
      </div>
    </div>
  `;
  
  return card;
}

/** Setup IntersectionObserver for staggered reveal */
function setupCardReveal(): void {
  const elements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  
  elements.forEach((el) => observer.observe(el));
}

/** Handle tab switching */
function setupTabs(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.catalog__tab');
  const nonvegGrid = document.getElementById('catalog-grid')!;
  const comingGrid = document.getElementById('catalog-coming')!;
  
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach((t) => t.classList.remove('catalog__tab--active'));
      tab.classList.add('catalog__tab--active');
      
      const target = tab.dataset.tab;
      if (target === 'nonveg') {
        nonvegGrid.style.display = '';
        comingGrid.style.display = 'none';
      } else {
        nonvegGrid.style.display = 'none';
        comingGrid.style.display = '';
      }
    });
  });
}

/** Handle CTA clicks — scroll to contact and pre-fill product */
function setupCtaLinks(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('catalog__card-cta')) {
      e.preventDefault();
      const productId = target.dataset.product || '';
      
      // Find the product select in contact form and pre-select
      const select = document.getElementById('contact-product') as HTMLSelectElement | null;
      if (select) {
        select.value = productId;
      }
      
      // Smooth scroll to contact
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

/** Reveal catalog header on scroll */
function setupHeaderReveal(): void {
  const header = document.querySelector('.catalog__header');
  if (!header) return;
  
  header.classList.add('reveal');
  
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        header.classList.add('revealed');
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  
  observer.observe(header);
}

/** Initialize the catalog module */
export function initCatalog(): void {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  
  // Render product cards
  PRODUCTS.forEach((product, index) => {
    const card = createCard(product, index);
    grid.appendChild(card);
  });
  
  // Setup interactions
  setupCardReveal();
  setupTabs();
  setupCtaLinks();
  setupHeaderReveal();
}
