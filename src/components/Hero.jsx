import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Hero = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center relative z-10 px-4">
      {/* Floating Moon */}
      <motion.div
        className="absolute top-10 right-10 md:right-32 w-32 h-32 rounded-full bg-[#fdf6e3] shadow-[0_0_80px_#fdf6e3,inset_-10px_-10px_20px_rgba(0,0,0,0.2)] opacity-80 z-[-1]"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <h1 className="font-cursive text-6xl md:text-8xl lg:text-9xl text-white mb-6 text-shadow-glow leading-tight">
          {data.heroTitle.replace("❤️", "")} 
          <span className="text-neonPink animate-pulse inline-block ml-2">❤️</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-light leading-relaxed mb-12">
          {data.heroSubtitle}
        </p>

        <motion.button
          onClick={() => document.querySelector('#story').scrollIntoView({ behavior: 'smooth' })}
          className="glass-btn flex items-center gap-3 mx-auto text-white group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Our Story 
          <motion.span 
            className="group-hover:translate-x-2 transition-transform"
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;
