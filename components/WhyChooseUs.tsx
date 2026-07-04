"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Leaf, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: Award,
    title: 'Homemade Quality',
    description: 'Each pickle is lovingly made in small batches in a home kitchen environment, ensuring individual attention and premium quality in every jar.',
  },
  {
    icon: Flame,
    title: 'Traditional Recipes',
    description: 'We follow traditional Andhra pickling recipes handed down through generations, retaining the standard authentic taste.',
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'We source premium quality farm-fresh meats, coastal seafood, organic spices, and high-quality cold-pressed oils. No artificial colors or flavors.',
  },
  {
    icon: ShieldCheck,
    title: 'Hygienic Preparation',
    description: 'Our kitchens adhere to strict guidelines. Every jar is thoroughly sterilized and packed with absolute care for your health and safety.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 bg-white/75 backdrop-blur-md border border-beige/45 rounded-3xl p-6 sm:p-8 shadow-sm">
          <span className="text-terracotta font-semibold text-sm tracking-wider uppercase">
            Our Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">
            Why Choose Pickles Paradise?
          </h2>
          <p className="text-text-light text-sm sm:text-base leading-relaxed">
            We take pride in bringing you the most authentic taste with uncompromised quality, using clean sourcing and traditional expertise.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-md border border-beige/40 rounded-2xl p-6 text-left hover:bg-white hover:shadow-xl hover:border-terracotta/20 transition-all duration-300 group"
              >
                {/* Icon wrapper */}
                <div className="w-12 h-12 bg-terracotta-light text-terracotta rounded-xl flex items-center justify-center mb-6 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <h3 className="font-serif text-lg font-bold text-text-dark mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-text-light leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
