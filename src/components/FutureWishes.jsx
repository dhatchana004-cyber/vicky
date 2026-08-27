import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const FutureWishes = ({ wishes }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <p className="text-center text-white/70 text-lg mb-12 max-w-2xl mx-auto font-light">
        I can't wait to see what the future holds for us. Here is what I wish for...
      </p>
      
      <div className="flex flex-wrap justify-center gap-6">
        {wishes.map((wish, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass px-8 py-6 rounded-2xl flex items-center gap-4 group cursor-pointer border border-white/5 hover:border-roseGold/50 transition-colors"
          >
            <Sparkles className="text-roseGold group-hover:text-neonPink transition-colors" size={24} />
            <span className="text-white text-lg font-medium">{wish}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FutureWishes;
