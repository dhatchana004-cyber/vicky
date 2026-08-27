import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const FinalSurprise = ({ message }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[70vh]">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="closed"
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <h2 className="text-2xl md:text-3xl text-white/80 font-light mb-12 leading-relaxed">
              One last surprise is waiting for you...
            </h2>
            
            <motion.button
              onClick={() => setIsOpened(true)}
              className="bg-gradient-to-r from-roseGold to-neonPink text-white font-medium px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,42,109,0.5)] hover:shadow-[0_0_50px_rgba(255,42,109,0.8)] transition-all flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Open My Heart <Heart size={24} fill="currentColor" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            {/* Cinematic Background effect just for this section */}
            <motion.div 
              className="absolute inset-0 z-[-1] overflow-hidden rounded-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonPink/20 via-midnight to-midnight blur-2xl"></div>
            </motion.div>

            <div className="glass p-8 md:p-16 rounded-3xl border border-roseGold/30 relative shadow-[0_0_50px_rgba(183,110,121,0.2)]">
              {/* Decorative Quotes */}
              <span className="absolute top-4 left-6 text-6xl text-roseGold/20 font-cursive">"</span>
              <span className="absolute bottom-[-20px] right-8 text-6xl text-roseGold/20 font-cursive">"</span>
              
              <div className="font-cursive text-2xl md:text-4xl text-white leading-[2] tracking-wide whitespace-pre-line text-shadow-glow">
                {message}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 2 }}
              className="mt-16 text-center"
            >
              <p className="text-white/50 text-sm tracking-widest uppercase">The End of the Page, but just the beginning for us.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalSurprise;
