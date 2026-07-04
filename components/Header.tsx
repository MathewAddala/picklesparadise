"use client";

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'products', 'contact'];
      const scrollPosition = window.scrollY + 140;
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'contact', label: 'Contact' }
  ];

  // Mobile: always solid. Desktop: transparent at top, solid on scroll.
  const navBg = isMobile
    ? 'border border-[#e8d9c5] shadow-[0_4px_16px_rgba(62,43,31,0.10)]'
    : isScrolled
      ? 'bg-[#FAF4EC]/90 backdrop-blur-[18px] border border-[#FAF4EC]/30 shadow-[0_8px_32px_rgba(62,43,31,0.12)]'
      : 'bg-white/[0.08] backdrop-blur-[18px] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.06)]';

  const navStyle = isMobile ? { backgroundColor: '#FAF4EC' } : {};

  return (
    <>
      <header
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[1280px] z-[100] transition-all duration-300 rounded-[18px] h-16 md:h-20 ${navBg}`}
        style={navStyle}
      >
        <div className="w-full h-full mx-auto px-4 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center focus:outline-none">
            <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] lg:w-[68px] lg:h-[68px] rounded-full overflow-hidden bg-white p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center justify-center transition-transform duration-[350ms] hover:scale-[1.05] relative">
              <Image src="/logo.png" alt="Pickles Paradise Logo" width={90} height={90} priority quality={100} className="w-full h-full object-contain" />
            </div>
          </a>

          {/* Desktop Nav */}
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
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-terracotta transition-transform duration-300 origin-left ${isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`} />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={(e) => handleNavClick(e, 'products')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-[#D36B53] hover:from-orange-500 hover:to-[#B55039] text-white font-sans font-semibold text-sm h-12 px-7 rounded-full shadow-[0_4px_14px_rgba(211,107,83,0.25)] hover:shadow-[0_6px_20px_rgba(211,107,83,0.35)] hover:-translate-y-[2px] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-[#3A322F] bg-[#F5EDE3] hover:bg-[#EADECF] transition-colors focus:outline-none shadow-sm"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer — outside <header> to avoid stacking context bleed ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[200]"
              style={{ backgroundColor: 'rgba(58,50,47,0.6)', backdropFilter: 'blur(3px)' }}
            />

            {/* Drawer panel — guaranteed solid background via inline style */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-xs z-[210] flex flex-col justify-between shadow-2xl"
              style={{ backgroundColor: '#FAF4EC' }}
            >
              <div className="p-6 space-y-8">
                {/* Logo + close */}
                <div className="flex items-center justify-between pb-6 border-b border-[#e8d9c5]">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-white p-1.5 shadow-sm flex items-center justify-center">
                    <Image src="/logo.png" alt="Pickles Paradise" width={44} height={44} className="w-full h-full object-contain" />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-full text-[#3A322F] hover:bg-[#F5EDE3] transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => handleNavClick(e, link.id)}
                        style={{ minHeight: '48px' }}
                        className={`flex items-center px-4 rounded-xl text-base font-bold tracking-wide transition-all ${
                          isActive
                            ? 'bg-[#D36B53]/10 text-[#D36B53]'
                            : 'text-[#3A322F] hover:bg-[#F5EDE3] hover:text-[#D36B53]'
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Shop Now at bottom */}
              <div className="p-6 border-t border-[#e8d9c5]">
                <button
                  onClick={(e) => handleNavClick(e, 'products')}
                  className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-[#D36B53] text-white font-semibold rounded-full shadow-md active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
