"use client";

import Image from 'next/image';

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#FAF4EC]/95 backdrop-blur-md border-t border-beige/60 py-12 text-left relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Upper grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-2 text-center sm:text-left flex flex-col items-center sm:items-start">
            <Image 
              src="/logo.png" 
              alt="Pickles Paradise Logo" 
              width={120}
              height={64}
              className="h-16 w-auto object-contain"
            />
            <p className="text-xs sm:text-sm text-text-dark/80 max-w-sm leading-relaxed">
              Bringing you standard home-cooked Andhra pickle recipes, prepared using natural ingredients, clean processing, and heritage spice blends.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <a
                href="https://www.instagram.com/picklesparadise2023/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-white border border-beige hover:border-terracotta hover:text-terracotta rounded-full flex items-center justify-center text-text-dark/70 transition-all cursor-pointer"
                aria-label="Instagram Link"
              >
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-xs font-semibold text-text-dark uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                href="#home"
                onClick={(e) => handleScrollTo(e, 'home')}
                className="text-sm text-text-dark/80 hover:text-terracotta transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleScrollTo(e, 'about')}
                className="text-sm text-text-dark/80 hover:text-terracotta transition-colors"
              >
                About Us
              </a>
              <a
                href="#products"
                onClick={(e) => handleScrollTo(e, 'products')}
                className="text-sm text-text-dark/80 hover:text-terracotta transition-colors"
              >
                Our Products
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="text-sm text-text-dark/80 hover:text-terracotta transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Slogan Col */}
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-xs font-semibold text-text-dark uppercase tracking-wider">
              Our Promise
            </h4>
            <p className="text-xs text-text-dark/80 leading-relaxed">
              We pledge to use only premium farm-fresh meats, coastal seafood, standard spices, and zero preservatives. Relish the rich homemade flavor.
            </p>
          </div>

        </div>

        {/* Footer Bottom copyright banner */}
        <div className="border-t border-beige/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-dark/80 text-center sm:text-left">
          <p>
            Copyright &copy; 2026 Pickles Paradise. All rights reserved.
          </p>
          <p className="mt-2 sm:mt-0 flex gap-4 justify-center sm:justify-end">
            <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:underline">Privacy Policy</a>
            <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:underline">Terms of Service</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
