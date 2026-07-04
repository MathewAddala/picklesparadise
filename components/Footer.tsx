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
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-white border border-beige hover:border-terracotta hover:text-terracotta rounded-full flex items-center justify-center text-text-dark/70 transition-all cursor-pointer"
                aria-label="Facebook Link"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
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
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-white border border-beige hover:border-terracotta hover:text-terracotta rounded-full flex items-center justify-center text-text-dark/70 transition-all cursor-pointer"
                aria-label="Twitter Link"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
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
