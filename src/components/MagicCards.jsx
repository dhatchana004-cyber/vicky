import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

const MagicCards = ({ reasons }) => {
  const [cards, setCards] = useState(reasons);

  const handleDragEnd = (e, info, index) => {
    // If dragged far enough to left or right, remove the card
    if (Math.abs(info.offset.x) > 100) {
      setCards(prev => prev.filter((_, i) => i !== index));
    }
  };

  const resetCards = () => {
    setCards(reasons);
  };

  if (cards.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-10 glass rounded-3xl"
      >
        <Sparkles className="text-neonPink mb-4" size={48} />
        <h3 className="text-2xl text-white font-cursive mb-6">You've seen all the reasons!</h3>
        <button 
          onClick={resetCards}
          className="glass-btn flex items-center gap-2 text-roseGold border-roseGold/50"
        >
          Read Again <Heart size={16} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md h-[400px] relative flex justify-center items-center">
      
      {/* Background hint */}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-30 pointer-events-none">
        <div className="flex flex-col items-center text-white gap-2">
          <ArrowLeft />
          <span className="text-xs tracking-widest uppercase">Swipe</span>
        </div>
        <div className="flex flex-col items-center text-white gap-2">
          <ArrowRight />
          <span className="text-xs tracking-widest uppercase">Swipe</span>
        </div>
      </div>

      <AnimatePresence>
        {cards.map((reason, index) => {
          // Only render the top 3 cards for performance and visual stack effect
          const isTop = index === cards.length - 1;
          const offset = cards.length - 1 - index;
          
          if (offset > 2) return null;

          return (
            <motion.div
              key={reason}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1 - offset * 0.05, 
                y: offset * 20,
                opacity: 1 - offset * 0.2,
                rotate: offset === 0 ? 0 : (offset % 2 === 0 ? 3 : -3)
              }}
              exit={{ x: 300, opacity: 0, scale: 0.5, rotate: 20 }}
              transition={{ duration: 0.3 }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => handleDragEnd(e, info, index)}
              whileDrag={{ scale: 1.05, rotate: 5, cursor: "grabbing" }}
              className={`absolute w-full h-64 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-grab ${isTop ? 'z-30' : 'z-10'}`}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
              
              <div className="text-3xl mb-4 opacity-50">✨</div>
              <p className="text-xl md:text-2xl text-white font-medium drop-shadow-md">
                "{reason}"
              </p>
              
              {isTop && (
                <div className="absolute bottom-4 text-xs text-white/40 tracking-widest uppercase animate-pulse">
                  Swipe Card
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default MagicCards;
