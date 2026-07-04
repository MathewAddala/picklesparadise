"use client";

import { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface Product {
  id: string;
  name: string;
  price: number; // Base price for 250g
  image: string;
  description: string;
  category: 'Non-Veg' | 'Veg';
}

interface BuyNowModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function BuyNowModal({ product, onClose }: BuyNowModalProps) {
  const [weight, setWeight] = useState<250 | 500 | 1000>(250);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  if (!product) return null;

  // Calculate pricing factor: 250g is base price, 500g is 1.8x, 1kg is 3.4x (discounts for bulk)
  const getMultiplier = (w: number) => {
    if (w === 500) return 1.8;
    if (w === 1000) return 3.4;
    return 1;
  };

  const unitPrice = Math.round(product.price * getMultiplier(weight));
  const totalPrice = unitPrice * quantity;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = '919876543210'; // Traditional Andhra store mock WhatsApp number
    const message = `Hello Pickles Paradise! 🌶️✨\n\nI would like to order:\n*Product*: ${product.name}\n*Quantity*: ${quantity} x ${weight >= 1000 ? '1 kg' : `${weight}g`}\n*Total Price*: ₹${totalPrice}\n\n*Customer Name*: ${name}\n*Delivery Address*: ${address}\n\nThank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-text-dark/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-y-auto max-h-[90vh] border border-beige/30 z-10 scrollbar-thin"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-text-light hover:text-text-dark hover:bg-beige/40 transition-colors z-20 focus:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Product Header Visual */}
          <div className="flex flex-col sm:flex-row gap-4 p-6 bg-cream border-b border-beige/40">
            <Image
              src={product.image}
              alt={product.name}
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-xl border border-beige/60 shadow-sm"
            />
            <div className="text-left flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-3.5 h-3.5 border border-red-600 flex items-center justify-center p-[2px] rounded-sm bg-white">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                </span>
                <span className="text-[9px] font-bold text-red-600 tracking-wider uppercase">Non-Veg</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-dark">{product.name}</h3>
              <p className="text-xs text-text-light mt-1 line-clamp-2">{product.description}</p>
            </div>
          </div>

          {/* Order Configuration Form */}
          <form onSubmit={handleOrderSubmit} className="p-6 space-y-5 text-left">
            {/* Weight selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                Select Package Weight
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[250, 500, 1000].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeight(w as 250 | 500 | 1000)}
                    className={`py-2 px-3 text-center rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ${
                      weight === w
                        ? 'border-terracotta bg-terracotta/5 text-terracotta font-semibold'
                        : 'border-beige hover:border-terracotta/50 text-text-light'
                    }`}
                  >
                    {w >= 1000 ? '1 kg' : `${w}g`}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity select */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-dark uppercase tracking-wider">Quantity</span>
              <div className="flex items-center border border-beige rounded-full p-1 bg-cream/40">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-text-light hover:bg-beige/40 active:scale-90 cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-text-light hover:bg-beige/40 active:scale-90 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total price box */}
            <div className="bg-cream/60 rounded-xl p-4 flex items-center justify-between border border-beige/30">
              <span className="text-sm font-medium text-text-light">Subtotal Amount</span>
              <span className="text-xl font-bold text-terracotta">₹{totalPrice}</span>
            </div>

            {/* Shipping details */}
            <div className="space-y-3">
              <div>
                <label htmlFor="modal-name" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all"
                />
              </div>
              <div>
                <label htmlFor="modal-address" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                  Delivery Address & Pin
                </label>
                <textarea
                  id="modal-address"
                  required
                  rows={2}
                  placeholder="Enter complete shipping address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all resize-none"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 border border-beige hover:bg-cream text-text-dark text-sm font-semibold rounded-full transition-all text-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white text-terracotta" />
                Order via WhatsApp
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
