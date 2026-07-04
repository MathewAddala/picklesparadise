"use client";

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';
import type { CartItem } from '@/app/page';
import type { Product } from './BuyNowModal';

interface ContactProps {
  cart: CartItem[];
  updateQuantity: (product: Product, weight: 500 | 1000, delta: number) => void;
}

export default function Contact({ cart, updateQuantity }: ContactProps) {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formEmail, setFormEmail] = useState(''); // Only used for fallback enquiry
  const [submitted, setSubmitted] = useState(false);

  const cartTotal = cart.reduce((acc, item) => {
    const getMultiplier = (w: number) => {
      if (w === 1000) return 1.9;
      return 1.0;
    };
    const unitPrice = Math.round(item.product.price * getMultiplier(item.weight));
    return acc + unitPrice * item.quantity;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length > 0) {
      // WhatsApp Order Flow
      const orderItemsText = cart.map(item => {
        const getMultiplier = (w: number) => {
          if (w === 1000) return 1.9;
          return 1.0;
        };
        const unitPrice = Math.round(item.product.price * getMultiplier(item.weight));
        const totalItemPrice = unitPrice * item.quantity;
        const weightText = item.weight === 1000 ? '1 kg' : `${item.weight}g`;
        return `• *${item.product.name}* (${weightText}) x ${item.quantity} - ₹${totalItemPrice}`;
      }).join('\n');

      const messageText = `*PICKLES PARADISE ORDER REQUEST*\n` +
        `=========================\n` +
        `*Name:* ${formName}\n` +
        `*Phone:* ${formPhone}\n` +
        `*Delivery Address:* ${formAddress}\n` +
        (formMessage ? `*Special Request:* ${formMessage}\n` : '') +
        `=========================\n` +
        `*ITEMS ORDERED:*\n${orderItemsText}\n` +
        `=========================\n` +
        `*TOTAL AMOUNT:* ₹${cartTotal}\n\n` +
        `Please confirm my order and share payment details. Thank you!`;

      const whatsAppNumber = '918401134904';
      window.open(`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(messageText)}`, '_blank');
    } else {
      // Enquiry Flow
      setSubmitted(true);
      setTimeout(() => {
        setFormName('');
        setFormEmail('');
        setFormMessage('');
        setSubmitted(false);
        alert('Thank you for your enquiry! We will get back to you shortly.');
      }, 1000);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 bg-white/75 backdrop-blur-md border border-beige/45 rounded-3xl p-6 sm:p-8 shadow-sm">
          <span className="text-terracotta font-semibold text-sm tracking-wider uppercase">
            Connect
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">
            {cart.length > 0 ? "Review Your Order" : "We'd Love to Hear From You"}
          </h2>
          <p className="text-text-light text-sm sm:text-base leading-relaxed">
            {cart.length > 0 
              ? "Review the items in your cart, enter your delivery details, and place your order directly via WhatsApp for instant processing and cash/UPI delivery."
              : "Have questions about bulk orders, custom spice levels, or delivery? Reach out to us or drop us a message directly via WhatsApp!"
            }
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          
          {/* Left: Contact Form / Checkout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/85 backdrop-blur-md border border-beige/45 p-6 sm:p-8 rounded-2xl text-left shadow-sm flex flex-col justify-between"
          >
            <div>
              <h3 className="font-serif text-xl font-bold text-text-dark mb-6 flex items-center gap-2">
                {cart.length > 0 ? (
                  <>
                    <ShoppingBag className="w-5 h-5 text-terracotta" />
                    <span>Your Cart Summary</span>
                  </>
                ) : (
                  <span>Send us an Enquiry</span>
                )}
              </h3>

              {/* Shopping Cart List */}
              {cart.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-cream/70 border border-beige/60 space-y-3">
                  <div className="divide-y divide-beige/30 space-y-3 pb-2">
                    {cart.map((item) => {
                      const getMultiplier = (w: number) => {
                        if (w === 1000) return 1.9;
                        return 1.0;
                      };
                      const unitPrice = Math.round(item.product.price * getMultiplier(item.weight));
                      const totalItemPrice = unitPrice * item.quantity;
                      const weightText = item.weight === 1000 ? '1 kg' : `${item.weight}g`;

                      return (
                        <div key={item.id} className="flex items-center justify-between pt-2 text-xs">
                          <div className="flex flex-col text-left space-y-0.5 max-w-[55%]">
                            <span className="font-bold text-text-dark">{item.product.name}</span>
                            <span className="text-text-light text-[10px]">{weightText} · ₹{unitPrice}/unit</span>
                          </div>
                          <div className="flex items-center gap-4">
                            {/* Mini Quantity Controls */}
                            <div className="flex items-center justify-between bg-white border border-beige-dark/50 rounded-lg overflow-hidden h-7 w-20">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product, item.weight, -1)}
                                className="w-6 h-full flex items-center justify-center hover:bg-beige/20 text-text-dark font-bold active:scale-90 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-[11px] font-bold text-text-dark">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product, item.weight, 1)}
                                className="w-6 h-full flex items-center justify-center hover:bg-beige/20 text-text-dark font-bold active:scale-90 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-text-dark w-12 text-right">₹{totalItemPrice}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-beige/60 font-bold text-sm text-text-dark">
                    <span>Grand Total</span>
                    <span className="text-terracotta text-base">₹{cartTotal}</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all"
                  />
                </div>

                {cart.length > 0 ? (
                  <>
                    <div>
                      <label htmlFor="checkout-phone" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        required
                        placeholder="Enter 10-digit mobile number"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="checkout-address" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                        Delivery Address
                      </label>
                      <textarea
                        id="checkout-address"
                        required
                        rows={3}
                        placeholder="House No, Street, Landmark, Area, City"
                        value={formAddress}
                        onChange={(e) => setFormAddress(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                    {cart.length > 0 ? "Special Instructions (Optional)" : "Message"}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    required={cart.length === 0}
                    placeholder={cart.length > 0 
                      ? "Custom spice level preference, delivery time instructions, etc." 
                      : "How can we help you? (Ask about bulk custom orders, shipping, etc.)"
                    }
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-beige bg-white focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {cart.length > 0 ? (
                    <>
                      <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                      <span>Place Order via WhatsApp</span>
                    </>
                  ) : submitted ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right: Direct Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/85 backdrop-blur-md border border-beige/45 p-6 sm:p-8 rounded-2xl text-left shadow-sm flex flex-col justify-between h-full"
          >
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-text-dark border-b border-beige/45 pb-3">
                Direct Contact Details
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-cream/40 border border-beige/25 hover:bg-cream/70 transition-colors shadow-sm">
                  <div className="w-9 h-9 bg-white border border-beige rounded-lg flex items-center justify-center text-terracotta shrink-0 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-text-light uppercase tracking-wider">Phone</h4>
                    <a href="tel:+919876543210" className="text-sm font-bold text-text-dark hover:text-terracotta transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-cream/40 border border-beige/25 hover:bg-cream/70 transition-colors shadow-sm">
                  <div className="w-9 h-9 bg-white border border-beige rounded-lg flex items-center justify-center text-terracotta shrink-0 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-text-light uppercase tracking-wider">Email</h4>
                    <a href="mailto:hello@picklesparadise.com" className="text-sm font-bold text-text-dark hover:text-terracotta transition-colors">
                      hello@picklesparadise.com
                    </a>
                  </div>
                </div>

                {/* Kitchen Address */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-cream/40 border border-beige/25 hover:bg-cream/70 transition-colors shadow-sm">
                  <div className="w-9 h-9 bg-white border border-beige rounded-lg flex items-center justify-center text-terracotta shrink-0 shadow-sm mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-text-light uppercase tracking-wider">Kitchen Address</h4>
                    <p className="text-xs font-bold text-text-dark leading-relaxed">
                      D.No: 42D-440, Block D, Vambay Colony, <br />
                      Near Government School, Ajith Singh Nagar, <br />
                      Vijayawada, Andhra Pradesh - 520015
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-cream/40 border border-beige/25 hover:bg-cream/70 transition-colors shadow-sm">
                  <div className="w-9 h-9 bg-white border border-beige rounded-lg flex items-center justify-center text-terracotta shrink-0 shadow-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-text-light uppercase tracking-wider">Operating Hours</h4>
                    <p className="text-xs font-bold text-text-dark">
                      Mon - Sun: Open 24 Hours (24/7 Service)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-beige/40 text-center">
              <p className="text-[11px] text-text-light italic">
                Need wholesale or catering quotes? Call us directly!
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
