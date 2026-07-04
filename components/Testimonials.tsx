"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Avinash',
    location: 'Vijayawada',
    rating: 5,
    comment: 'Healthy and Hygienic food with awesome taste. The wide varieties of pickles attracted me more and the service they did is appreciable. The Quality and Quantity is quite awesome. There are multiple varieties which u can try with reasonable pricing and good taste.',
  },
  {
    name: 'L Eshwar',
    location: 'Vijayawada',
    rating: 5,
    comment: 'Just loved this Pickle Paradise 🤩🤩🤩. I went there for a non-veg pickle. They provide various homemade non-veg pickles with super tasty. I got Chicken pickle and it\'s super tasty. They maintaining great quality and offering good quantity aswell with reasonable prices in the market.',
  },
  {
    name: 'Ramesh',
    location: 'Vijayawada',
    rating: 5,
    comment: 'Pickles Paradise is a fantastic brand with excellent quality products and a wide variety of pickles to choose from. The quantity is great, and the flavors are amazing. I highly recommend trying out their delicious pickles for a tasty addition to any meal.',
  },
  {
    name: 'Mohammad Enus',
    location: 'Vijayawada',
    rating: 5,
    comment: 'Excellent yummy taste with export quality non-veg pickles. Real Andhra style spices and properly sealed packaging.',
  },
  {
    name: 'SK. Hafsa Firdous',
    location: 'Vijayawada',
    rating: 5,
    comment: 'Mouth watering and Yummy pickles. It tastes delicious 😍. Very authentic and fresh spices, makes every meal so much better.',
  },
  {
    name: 'Shaik Nagur',
    location: 'Vijayawada',
    rating: 5,
    comment: 'Mashaallah, superb quality and delicious home-style pickles. Recommended for everyone who loves spicy Andhra chicken and mutton pickles.',
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const grid = scrollRef.current;
    if (!grid) return;

    let intervalId: NodeJS.Timeout | null = null;
    const slideDelay = 4000;

    const startAutoPlay = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        if (isInteracting) return;

        const firstCard = grid.firstElementChild as HTMLElement;
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth;
        const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
        const step = cardWidth + gap;

        if (step <= 0) return;

        const currentScroll = grid.scrollLeft;
        const maxScroll = grid.scrollWidth - grid.clientWidth;

        if (currentScroll >= maxScroll - 10) {
          grid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const nextTarget = Math.round((currentScroll + step) / step) * step;
          grid.scrollTo({ left: Math.min(nextTarget, maxScroll), behavior: 'smooth' });
        }
      }, slideDelay);
    };

    const stopAutoPlay = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    startAutoPlay();

    return () => {
      stopAutoPlay();
    };
  }, [isInteracting]);

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
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsInteracting(false), 1500);
          }}
          className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar w-full snap-x snap-mandatory scroll-smooth"
        >
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[280px] max-w-[280px] w-[280px] shrink-0 snap-center bg-white/85 backdrop-blur-md p-4 rounded-xl shadow-sm border border-beige/35 flex flex-col justify-between relative group hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote Mark Decoration */}
              <Quote className="absolute top-3.5 right-3.5 w-5 h-5 text-beige/40 -z-0" />
              
              <div className="space-y-2.5 relative z-10 text-left">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                
                <p className="text-[10.5px] text-text-light leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Customer Author Info */}
              <div className="pt-3 border-t border-beige/40 mt-3 flex items-center justify-between text-left">
                <div>
                  <h4 className="font-serif font-bold text-text-dark text-[11px]">
                    {review.name}
                  </h4>
                  <p className="text-[9px] text-terracotta">
                    {review.location}
                  </p>
                </div>
                <span className="text-[9px] text-text-light/60 font-semibold uppercase tracking-wider bg-cream px-1.5 py-0.5 rounded">
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
