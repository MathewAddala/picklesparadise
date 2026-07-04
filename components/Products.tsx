"use client";

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Product } from './BuyNowModal';
import type { CartItem } from '@/app/page';

const PRODUCTS: Product[] = [
  {
    id: 'chicken-pickle',
    name: 'Andhra Chicken Pickle (Halaal)',
    price: 550,
    image: '/chickenbonepickle.jpeg',
    description: 'Tender farm-fresh chicken pieces slow-cooked in a rich, fiery Andhra masala blend with authentic home-ground spices and premium oil.',
    category: 'Non-Veg',
  },
  {
    id: 'mutton-pickle',
    name: 'Royal Mutton Pickle (Halaal)',
    price: 800,
    image: '/muttonpickleitem.jpeg',
    description: 'Succulent boneless mutton slow-cooked to perfection with heritage spices, mustard seed powder, and cold-pressed oil.',
    category: 'Non-Veg',
  },
  {
    id: 'prawn-pickle',
    name: 'Tangy Prawns Pickle',
    price: 650,
    image: '/prawnsitem.jpeg',
    description: 'Succulent coastal prawns fried crispy and marinated in a rich, tangy Andhra spice mix with fresh curry leaves and lemon juice.',
    category: 'Non-Veg',
  },
];

interface ProductsProps {
  cart: CartItem[];
  addToCart: (product: Product, weight: 500 | 1000) => void;
  updateQuantity: (product: Product, weight: 500 | 1000, delta: number) => void;
}

export default function Products({ cart, addToCart, updateQuantity }: ProductsProps) {
  return (
    <section id="products" className="py-12 md:py-16 lg:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 bg-white/75 backdrop-blur-md border border-beige/45 rounded-3xl p-6 sm:p-8 shadow-sm">
          <span className="text-terracotta font-semibold text-sm tracking-wider uppercase">
            Our Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2B1F]">
            Taste the Authentic Spices of Andhra
          </h2>
          <p className="text-[#6E5A4B] text-sm sm:text-base leading-relaxed">
            Explore our curated selection of authentic, homemade premium non-vegetarian pickles. Prepared with fresh meats, standard spices, and zero preservatives for the ultimate local flavor.
          </p>
        </div>

        {/* Products Grid */}
        <motion.div 
          layout
          className="flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center md:items-stretch md:gap-8 w-full"
        >
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
            />
          ))}
        </motion.div>

        {/* Empty state (safety) */}
        {PRODUCTS.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6E5A4B]">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
