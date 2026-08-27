import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const Reasons = ({ reasons }) => {
  const [shownIndices, setShownIndices] = useState([]);
  const [currentReason, setCurrentReason] = useState("Click the heart to find out why...");

  const handleClick = () => {
    if (shownIndices.length === reasons.length) {
      setCurrentReason("I could go on forever. You are my everything.");
      return;
    }

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * reasons.length);
    } while (shownIndices.includes(nextIndex));

    setShownIndices([...shownIndices, nextIndex]);
    setCurrentReason(reasons[nextIndex]);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[500px]">
      <div className="relative">
        {/* Pulsing Background Glow */}
        <motion.div 
          className="absolute inset-0 bg-neonPink rounded-full blur-3xl opacity-30"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* The Heart */}
        <motion.button
          onClick={handleClick}
          className="relative text-neonPink hover:text-soft-pink transition-colors z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={150} fill="currentColor" className="drop-shadow-[0_0_30px_rgba(255,42,109,0.8)]" />
          
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl pointer-events-none">
            {shownIndices.length}/{reasons.length}
          </div>
        </motion.button>
      </div>

      <div className="mt-16 h-32 flex items-center justify-center px-4 max-w-2xl text-center">
        <AnimatePresence mode="wait">
          <motion.h3
            key={currentReason}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl md:text-4xl font-cursive text-white leading-relaxed text-shadow-glow"
          >
            {currentReason}
          </motion.h3>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reasons;
