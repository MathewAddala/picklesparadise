"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-24 bg-transparent relative overflow-hidden">
      {/* Decorative background graphics */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cream/30 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-beige/20 rounded-full blur-3xl -z-10 translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Image with borders (Order 1 on mobile and desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-1 flex justify-center w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="absolute top-4 left-4 w-full h-full border-2 border-terracotta/20 rounded-2xl -z-10 translate-x-2 translate-y-2" />
            <div className="bg-cream p-3 rounded-2xl shadow-md border border-beige w-full">
              <Image
                src="/about_nonveg_prep.png"
                alt="Traditional Andhra Non-Veg Pickle Preparation"
                width={600}
                height={450}
                className="rounded-xl w-full h-auto object-cover aspect-[4/3] shadow-sm hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative Content (Order 2 on mobile and desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6 order-2 lg:order-2 bg-white/75 backdrop-blur-md border border-beige/40 p-6 sm:p-10 rounded-3xl shadow-lg"
          >
            <div className="space-y-2">
              <span className="text-terracotta font-semibold text-sm tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">
                Preserving Heritage, One Jar at a Time
              </h2>
            </div>
            
            <div className="space-y-4 text-text-light text-[15px] md:text-[16px] lg:text-[18px] leading-relaxed">
              <p>
                At <strong>Pickles Paradise</strong>, we are committed to keeping the rich, fiery culinary traditions of Andhra Pradesh alive. Established with a passion for authentic home-cooked flavors, we make pickles using time-honored recipes passed down through generations.
              </p>
              <p>
                We do not compromise on quality. Our hand-selected raw materials—from premium cuts of meat and fresh coastal seafood to cold-pressed mustard oil and sun-dried spices—are carefully sourced and blended in small batches. This ensures that every bite takes you back to standard grandma-style pickle preparations.
              </p>
              <p className="font-serif italic text-text-dark font-medium border-l-4 border-terracotta pl-4 text-left">
                &ldquo;No artificial preservatives, no artificial colors&mdash;just pure, authentic pickles crafted with absolute tradition and care.&rdquo;
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
