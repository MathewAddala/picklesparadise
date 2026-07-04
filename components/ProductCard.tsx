"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from './BuyNowModal';
import type { CartItem } from '@/app/page';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  cart: CartItem[];
  addToCart: (product: Product, weight: 250 | 500 | 1000) => void;
  updateQuantity: (product: Product, weight: 250 | 500 | 1000, delta: number) => void;
}

export default function ProductCard({ product, cart, addToCart, updateQuantity }: ProductCardProps) {
  const [weight, setWeight] = useState<250 | 500 | 1000>(250);

  const getMultiplier = (w: number) => {
    if (w === 500) return 1.8;
    if (w === 1000) return 3.4;
    return 1;
  };

  const unitPrice = Math.round(product.price * getMultiplier(weight));
  const cartItemId = `${product.id}-${weight}`;
  const cartItem = cart.find((item) => item.id === cartItemId);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white/85 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-beige/35 transition-all duration-300 flex flex-col h-full"
    >
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-cream/35">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Swiggy/Zomato style Non-Veg Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg border border-beige/40 flex items-center gap-1.5 shadow-sm z-10">
          <span className="w-3.5 h-3.5 border border-red-600 flex items-center justify-center p-[2px] rounded-sm bg-white">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
          </span>
          <span className="text-[9px] font-bold text-red-600 tracking-wider uppercase">Non-Veg</span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col flex-grow text-left space-y-3">
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-text-dark group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-text-light line-clamp-2 min-h-[2rem]">
            {product.description}
          </p>
        </div>

        {/* Price, Size, and Order Actions */}
        <div className="pt-2 border-t border-beige/40 flex flex-col space-y-3 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-text-light uppercase tracking-wider font-semibold">Price</span>
              <span className="text-lg font-bold text-text-dark">₹{unitPrice}</span>
            </div>
            
            {/* Weight Dropdown selector */}
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-text-light uppercase tracking-wider mb-0.5 font-semibold">Size</span>
              <select
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) as 250 | 500 | 1000)}
                className="bg-cream/60 hover:bg-cream border border-beige-dark/40 text-text-dark text-xs font-bold py-1 px-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta cursor-pointer transition-colors"
              >
                <option value={250}>250g</option>
                <option value={500}>500g</option>
                <option value={1000}>1 kg</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-text-light/70 italic">Traditional recipe</span>
            
            {/* Swiggy-style Add/Quantity selector */}
            {quantity === 0 ? (
              <button
                onClick={() => addToCart(product, weight)}
                className="bg-white border border-terracotta text-terracotta hover:bg-terracotta hover:text-white font-bold text-sm px-6 h-9 rounded-xl transition-all duration-300 active:scale-95 shadow-sm hover:shadow flex items-center justify-center min-w-[100px] cursor-pointer"
              >
                ADD
              </button>
            ) : (
              <div className="flex items-center justify-between bg-terracotta text-white font-bold text-sm h-9 rounded-xl border border-terracotta min-w-[100px] overflow-hidden shadow-sm">
                <button
                  onClick={() => updateQuantity(product, weight, -1)}
                  className="w-8 h-full flex items-center justify-center hover:bg-terracotta-dark active:scale-90 cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product, weight, 1)}
                  className="w-8 h-full flex items-center justify-center hover:bg-terracotta-dark active:scale-90 cursor-pointer"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
