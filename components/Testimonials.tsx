"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'L Eshwar',
    location: 'Vijayawada',
    rating: 5,
    comment: 'Just loved Pickles Paradise! I went there for a non-veg pickle. They are providing various homemade non-veg pickles with super tasty flavors. I got the chicken pickle and it is outstanding. Great quality and quantity at reasonable prices.',
  },
  {
    name: 'Avinash',
    location: 'Vijayawada',
    rating: 5,
    comment: 'Healthy and hygienic food with awesome taste. The wide varieties of non-veg pickles attracted me, and the service they did is highly appreciable. The quality and quantity is quite awesome with reasonable pricing.',
  },
  {
    name: 'Ramesh',
    location: 'Vijayawada',
    rating: 5,
    comment: 'Pickles Paradise is a fantastic brand with excellent quality products. The quantity is great and the flavors are amazing. I highly recommend trying out their delicious non-veg pickles for any meal.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 bg-white/75 backdrop-blur-md border border-beige/45 rounded-3xl p-6 sm:p-8 shadow-sm">
          <span className="text-terracotta font-semibold text-sm tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">
            Loved by Pickle Connoisseurs
          </h2>
          <p className="text-text-light text-sm sm:text-base leading-relaxed">
            Hear from our wonderful community of customers who have experienced the authentic homemade taste of Pickles Paradise.
          </p>
        </div>

        {/* Reviews Grid / Swipe Carousel */}
        <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-6 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-x-visible md:pb-0">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center md:last:col-span-2 lg:last:col-span-1 bg-white/85 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-beige/35 flex flex-col justify-between relative group hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote Mark Decoration */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-beige/40 -z-0" />
              
              <div className="space-y-4 relative z-10 text-left">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                
                <p className="text-sm text-text-light leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Customer Author Info */}
              <div className="pt-6 border-t border-beige/40 mt-6 flex items-center justify-between text-left">
                <div>
                  <h4 className="font-serif font-bold text-text-dark text-sm sm:text-base">
                    {review.name}
                  </h4>
                  <p className="text-xs text-terracotta">
                    {review.location}
                  </p>
                </div>
                <span className="text-xs text-text-light/60 font-semibold uppercase tracking-widest bg-cream px-2.5 py-1 rounded">
                  Verified Buyer
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
