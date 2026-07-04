"use client";

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check active section
      const sections = ['home', 'about', 'products', 'contact'];
      const scrollPosition = window.scrollY + 140; // offset for detection

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // 80px header height + 24px top gap + safety margin
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'contact', label: 'Contact' }
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile: always solid cream. On desktop: transparent at top, solid when scrolled.
  const navBg = isMobile
    ? 'bg-[#FAF4EC] border border-[#e8d9c5] shadow-[0_4px_16px_rgba(62,43,31,0.10)]'
    : isScrolled
      ? 'bg-[#FAF4EC]/90 backdrop-blur-[18px] border border-[#FAF4EC]/30 shadow-[0_8px_32px_rgba(62,43,31,0.12)]'
      : 'bg-white/[0.08] backdrop-blur-[18px] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.06)]';

  return (
    <header
      className={`fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[1280px] z-[100] transition-all duration-300 rounded-[18px] h-16 md:h-20 ${navBg}`}
    >
      <div className="w-full h-full max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between relative">
        {/* LOGO (Left) */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center focus:outline-none relative z-10"
        >
          {/* Circular logo container */}
          <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] lg:w-[90px] lg:h-[90px] rounded-full bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex items-center justify-center transition-transform duration-[350ms] hover:scale-[1.05] relative -bottom-[2px] lg:-bottom-[4px]">
            <Image
              src="/logo.png"
              alt="Pickles Paradise Logo"
              width={90}
              height={90}
              priority
              quality={100}
              className="w-full h-full object-contain"
            />
          </div>
        </a>

        {/* Desktop Navigation (Center) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`font-sans font-medium text-sm tracking-[0.3px] transition-colors relative py-2 group ${
                  isActive ? 'text-terracotta' : 'text-text-dark/80 hover:text-terracotta'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-terracotta transition-transform duration-300 origin-left ${
                    isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA (Right) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={(e) => handleNavClick(e, 'products')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-[#D36B53] hover:from-orange-500 hover:to-[#B55039] text-white font-sans font-semibold text-sm h-12 px-7 rounded-full shadow-[0_4px_14px_rgba(211,107,83,0.25)] hover:shadow-[0_6px_20px_rgba(211,107,83,0.35)] hover:-translate-y-[2px] active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop Now
          </button>
        </div>

        {/* Mobile menu button (Right) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl text-text-dark bg-beige/50 hover:bg-beige/80 transition-colors focus:outline-none shadow-sm"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (full-screen slide-in from the right) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-text-dark/45 backdrop-blur-[4px] z-[150] md:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md h-full z-[160] p-6 flex flex-col justify-between md:hidden border-l border-[#e8d9c5] shadow-2xl"
              style={{ backgroundColor: '#FAF4EC' }}
            >
              <div className="space-y-8">
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between pb-6 border-b border-beige/40">
                  <div className="w-12 h-12 rounded-full bg-white p-1.5 shadow-sm flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="Pickles Paradise Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 rounded-full text-text-dark hover:bg-beige/45 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Touch-friendly navigation links */}
                <nav className="flex flex-col gap-5 text-left">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => handleNavClick(e, link.id)}
                        className={`block py-3 px-4 rounded-xl text-lg font-bold tracking-wide transition-all ${
                          isActive
                            ? 'bg-terracotta/10 text-terracotta'
                            : 'text-text-dark/95 hover:bg-beige/40 hover:text-terracotta'
                        }`}
                        style={{ minHeight: '48px' }}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Action Button inside drawer */}
              <div className="pt-6 border-t border-beige/40">
                <button
                  onClick={(e) => handleNavClick(e, 'products')}
                  className="w-full h-12 sm:h-14 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-[#D36B53] hover:from-orange-500 hover:to-[#B55039] text-white font-semibold rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
