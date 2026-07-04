/**
 * main.ts — Application entry point
 *
 * Imports styles, initializes all modules,
 * and sets up the navbar scroll behavior.
 */

import './style.css';
import { initHero } from './hero';
import { initCatalog } from './catalog';
import { initOutro } from './outro';
import { initContact } from './contact';
import { initReviews } from './reviews';
import { initCart } from './cart';

/** Navbar scroll styling + mobile toggle */
function initNavbar(): void {
  const navbar = document.getElementById('navbar')!;
  const toggle = document.getElementById('navbar-toggle')!;
  const menu = document.getElementById('navbar-menu')!;
  
  // Scroll-based navbar background
  const handleNavScroll = () => {
    const scrolled = window.scrollY > 80;
    navbar.classList.toggle('navbar--scrolled', scrolled);
  };
  
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check
  
  // Mobile hamburger toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });
  
  // Close mobile menu on link click
  menu.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    });
  });
}

/** Smooth scroll for anchor links */
function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/** Boot everything up */
function init(): void {
  initNavbar();
  initSmoothScroll();
  initHero();
  initCatalog();
  initCart();
  initOutro();
  initReviews();
  initContact();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
