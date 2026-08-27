import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CakeMoment = () => {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlow = () => {
    setIsBlown(true);
  };

  return (
    <div className="w-full flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative w-64 h-64 md:w-96 md:h-96 flex flex-col items-center justify-end"
      >
        {/* Simple CSS Cake */}
        <div className="relative w-48 md:w-64">
          {/* Candles */}
          <div className="absolute -top-16 left-0 w-full flex justify-center gap-6 z-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-3 h-16 bg-white/80 rounded-t-sm relative">
                {/* Stripes */}
                <div className="absolute top-2 w-full h-2 bg-neonPink/50 transform -skew-y-12"></div>
                <div className="absolute top-6 w-full h-2 bg-neonPink/50 transform -skew-y-12"></div>
                <div className="absolute top-10 w-full h-2 bg-neonPink/50 transform -skew-y-12"></div>
                
                {/* Flame */}
                <AnimatePresence>
                  {!isBlown && (
                    <motion.div 
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-400 rounded-b-full rounded-t-[50%] blur-[1px] shadow-[0_0_20px_#facc15,0_0_40px_#f97316]"
                      animate={{ 
                        scale: [1, 1.1, 0.9, 1],
                        rotate: [0, -5, 5, 0]
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Smoke */}
                {isBlown && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.5, 0], y: -50, scale: 2 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full blur-md"
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Cake Tiers */}
          <div className="w-full h-20 bg-roseGold rounded-xl border-b-8 border-neonPink relative z-20 shadow-[0_10px_30px_rgba(255,42,109,0.3)]">
            {/* Drips */}
            <div className="absolute top-0 left-4 w-4 h-8 bg-[#fdf6e3] rounded-b-full"></div>
            <div className="absolute top-0 left-12 w-3 h-12 bg-[#fdf6e3] rounded-b-full"></div>
            <div className="absolute top-0 left-24 w-5 h-6 bg-[#fdf6e3] rounded-b-full"></div>
            <div className="absolute top-0 left-36 w-4 h-10 bg-[#fdf6e3] rounded-b-full"></div>
            <div className="absolute top-0 right-8 w-4 h-7 bg-[#fdf6e3] rounded-b-full"></div>
          </div>
          <div className="w-[110%] -ml-[5%] h-24 bg-[#2a1b3d] rounded-xl border-b-8 border-black/50 relative z-10 shadow-xl mt-[-5px]"></div>
          
          {/* Plate */}
          <div className="w-[130%] -ml-[15%] h-6 bg-white/20 rounded-[100%] mt-2 blur-sm"></div>
        </div>

        {/* Confetti Explosion behind cake */}
        {isBlown && (
          <div className="absolute inset-0 pointer-events-none z-0">
             {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                  animate={{ 
                    opacity: 0,
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400 - 200,
                    scale: Math.random() * 2 + 1,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-sm"
                  style={{ backgroundColor: ['#ff2a6d', '#b76e79', '#ffffff', '#facc15'][Math.floor(Math.random() * 4)] }}
                />
             ))}
          </div>
        )}
      </motion.div>

      <div className="mt-16 h-32 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isBlown ? (
            <motion.div
              key="wish"
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-cursive text-5xl text-white mb-8 text-shadow-glow">Make a wish...</h2>
              <button 
                onClick={handleBlow}
                className="glass-btn text-white text-lg"
              >
                Blow The Candles 🕯️
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="yay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-cursive text-6xl text-neonPink animate-pulse-glow mb-4">Yay! Happy Birthday! 🎉</h2>
              <p className="text-white/70">May all your wishes come true.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CakeMoment;
