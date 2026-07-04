"use client";

import { motion } from "framer-motion";
import { ShoppingBag, MessageSquare } from "lucide-react";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen flex items-center pt-36 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-12 xl:px-20 bg-transparent z-20 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Glassmorphism text card (legible contrast, does not cover center jar on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-xl mx-auto md:ml-0 md:mr-auto space-y-6 pointer-events-auto bg-white/75 backdrop-blur-md border border-white/40 p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col items-center md:items-start text-center md:text-left"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta bg-terracotta/5 border border-terracotta/10 px-3 py-1.5 rounded-full inline-block animate-pulse">
            Authentic Andhra Flavors
          </span>
          <h1 className="font-serif text-[36px] sm:text-[42px] md:text-[52px] xl:text-[64px] 2xl:text-[72px] font-extrabold text-[#3E2B1F] tracking-tight leading-tight md:leading-[1.1]">
            Pickles Paradise
          </h1>
          <p className="font-sans text-[15px] md:text-[16px] lg:text-[18px] text-[#6E5A4B] leading-relaxed">
            Experience the rich, fiery taste of homemade traditional Andhra pickles made with premium ingredients and time-honored recipes.
          </p>
 
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row w-full justify-center md:justify-start items-center gap-4 pt-4">
            <button
              onClick={() => handleScrollTo("products")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm h-12 lg:h-14 px-6 lg:px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Explore Collection
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white border-2 border-beige-dark/50 hover:border-terracotta text-text-dark hover:text-terracotta font-semibold text-sm h-12 lg:h-14 px-6 lg:px-8 rounded-full transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Us
            </button>
          </div>
        </motion.div>

        {/* Right Column: Empty (leaves the jar fully visible in the center-right of the viewport) */}
        <div className="hidden md:block w-full h-full" />
      </div>
    </section>
  );
}
