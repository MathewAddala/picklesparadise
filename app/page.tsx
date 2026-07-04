"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import PickleCanvas from "@/components/PickleCanvas";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Products from "@/components/Products";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Product } from "@/components/BuyNowModal";

export interface CartItem {
  id: string; // product.id + '-' + weight
  product: Product;
  quantity: number;
  weight: 250 | 500 | 1000;
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, weight: 250 | 500 | 1000) => {
    const cartItemId = `${product.id}-${weight}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: cartItemId, product, quantity: 1, weight }];
    });
  };

  const updateQuantity = (product: Product, weight: 250 | 500 | 1000, delta: number) => {
    const cartItemId = `${product.id}-${weight}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (!existing) return prev;
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((item) => item.id !== cartItemId);
      }
      return prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      );
    });
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => {
    const getMultiplier = (w: number) => {
      if (w === 500) return 1.8;
      if (w === 1000) return 3.4;
      return 1;
    };
    const unitPrice = Math.round(item.product.price * getMultiplier(item.weight));
    return acc + unitPrice * item.quantity;
  }, 0);

  return (
    <div className="relative min-h-screen bg-[#FAF4EC] text-text-dark font-sans overflow-x-hidden antialiased">
      {/* 1. Global Fullscreen Fixed Canvas Background */}
      <PickleCanvas />

      {/* 2. Fixed Header Navigation */}
      <Header />

      {/* 3. Content Layer floating above Canvas */}
      <div className="relative z-20 bg-transparent">
        {/* Hero Section */}
        <Hero />

        {/* About Pickles Paradise */}
        <AboutUs />

        {/* Featured Products List */}
        <Products 
          cart={cart}
          addToCart={addToCart}
          updateQuantity={updateQuantity}
        />

        {/* Brand Value Propositions */}
        <WhyChooseUs />

        {/* Customer Testimonial Grid */}
        <Testimonials />

        {/* Contact details & Checkout form */}
        <Contact 
          cart={cart}
          updateQuantity={updateQuantity}
        />

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Zomato/Swiggy-style Bottom Cart Bar */}
      <AnimatePresence>
        {cartItemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#D36B53] text-white rounded-2xl shadow-xl px-5 py-3 flex items-center justify-between z-[90] border border-white/10"
          >
            <div className="flex flex-col text-left">
              <span className="text-xs opacity-90 font-medium tracking-wide">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} added
              </span>
              <span className="text-lg font-bold">
                ₹{cartTotal}
              </span>
            </div>
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="bg-white text-[#D36B53] font-bold text-sm px-5 py-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-md hover:bg-white/95"
            >
              View Cart & Order
              <span className="text-lg">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
