"use client";

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Product } from './BuyNowModal';
import type { CartItem } from '@/app/page';

const PRODUCTS: Product[] = [
  {
    id: 'chicken-boneless',
    name: 'Boneless Chicken Pickle (Halaal)',
    price: 299,
    image: '/chickenboneless.jpeg',
    description: 'Tender chunks of boneless farm-fresh chicken marinated in premium ground spices, ginger-garlic paste, and sesame oil. Prepared in absolute traditional Andhra style.',
    category: 'Non-Veg',
  },
  {
    id: 'chicken-bone',
    name: 'Chicken Pickle with Bone (Halaal)',
    price: 269,
    image: '/chickenbonepickle.jpeg',
    description: 'Traditional bone-in chicken pickle infused with authentic spice mixes. Super flavorful and rich in traditional taste.',
    category: 'Non-Veg',
  },
  {
    id: 'naatu-kodi',
    name: 'Naatu Kodi Country Chicken Pickle',
    price: 349,
    image: '/natukodipickle.jpeg',
    description: 'Rustic Andhra country chicken pickle featuring intense native heat levels and premium spices. Crafted using heritage recipes.',
    category: 'Non-Veg',
  },
  {
    id: 'mutton-pickle',
    name: 'Royal Mutton Pickle (Halaal)',
    price: 399,
    image: '/muttonpickleitem.jpeg',
    description: 'Succulent boneless mutton slow-cooked with heritage spices, mustard seed powder, and cold-pressed oil.',
    category: 'Non-Veg',
  },
  {
    id: 'prawn-pickle',
    name: 'Tangy Prawns Pickle',
    price: 349,
    image: '/prawnsitem.jpeg',
    description: 'Coastal-fresh prawns fried crispy and marinated in a rich, tangy spice mix with fresh curry leaves and lemon juice.',
    category: 'Non-Veg',
  },
  {
    id: 'fish-pickle',
    name: 'Premium Fish Pickle',
    price: 299,
    image: '/fishpickleitem.jpeg',
    description: 'Fresh boneless fish cubes marinated in a traditional Andhra pickle masala, giving a perfect aromatic spice blend.',
    category: 'Non-Veg',
  },
  {
    id: 'kormeenu-pickle',
    name: 'Kormeenu Boneless Fish Pickle',
    price: 449,
    image: '/kormeenupickle.jpeg',
    description: 'Elite specialty pickle made from premium boneless Murrel (snakehead fish) prepared with grandmother\'s traditional recipe.',
    category: 'Non-Veg',
  },
];

interface ProductsProps {
  cart: CartItem[];
  addToCart: (product: Product, weight: 250 | 500 | 1000) => void;
  updateQuantity: (product: Product, weight: 250 | 500 | 1000, delta: number) => void;
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
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
