"use client";

import { motion } from "framer-motion";
import { Utensils } from "lucide-react";

const PAIRINGS = [
  {
    title: "Chicken Pickle Biryani",
    pickle: "Boneless Chicken Pickle (Halaal)",
    description: "Mix a spoonful of our fiery, spiced Boneless Chicken Pickle into hot, aromatic basmati chicken biryani. The deep heat of custom Andhra spices cuts through the rich ghee and meat flavors.",
    prep: "Best with hot chicken biryani or warm ghee rice.",
  },
  {
    title: "Mutton Pulao Comfort",
    pickle: "Royal Mutton Pickle (Halaal)",
    description: "Pair our succulent, slow-cooked Royal Mutton Pickle alongside mild, creamy coconut milk vegetable pulao or hot layered parottas for a rich culinary contrast.",
    prep: "Best with coconut rice or hot flaky parottas.",
  },
  {
    title: "Prawn Pickle Rice Pairing",
    pickle: "Tangy Prawns Pickle",
    description: "Enjoy our coastal-fresh, crispy Tangy Prawns Pickle served alongside a comforting plate of simple steamed rice and hot ghee for an authentic coastal Andhra household experience.",
    prep: "Best with simple white rice and ghee.",
  },
];

export default function Recipes() {
  return (
    <section id="recipes" className="py-12 md:py-16 lg:py-24 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-terracotta font-semibold text-sm tracking-wider uppercase">
            Culinary Pairings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">
            Traditional Andhra Pairings
          </h2>
          <p className="text-text-light text-sm sm:text-base leading-relaxed">
            Pickles are not just side dishes; they are the heart of Andhra dining. Experience these standard local pairings for the ultimate home-cooked experience.
          </p>
        </div>

        {/* Pairings Grid / Swipe Carousel */}
        <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-6 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-x-visible md:pb-0">
          {PAIRINGS.map((pair, index) => (
            <motion.div
              key={pair.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center md:last:col-span-2 lg:last:col-span-1 bg-white/80 backdrop-blur-md border border-beige/40 rounded-2xl p-6 text-left hover:bg-white hover:shadow-xl hover:border-terracotta/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 bg-terracotta-light text-terracotta rounded-xl flex items-center justify-center">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-text-dark">
                    {pair.title}
                  </h3>
                  <span className="text-[10px] text-terracotta font-bold uppercase tracking-wider">
                    Featuring: {pair.pickle}
                  </span>
                </div>
                <p className="text-xs text-text-light leading-relaxed">
                  {pair.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-beige/30 text-xs font-semibold text-text-dark italic">
                {pair.prep}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
