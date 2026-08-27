import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MemoryUniverse = ({ memories }) => {
  const [selectedMemory, setSelectedMemory] = useState(null);

  // Random positions for the "planets"
  const getPlanetStyles = (index) => {
    const sizes = [120, 150, 180, 140, 160];
    const size = sizes[index % sizes.length];
    
    // Spread them around nicely
    const lefts = ['10%', '60%', '20%', '70%', '40%'];
    const tops = ['10%', '20%', '50%', '60%', '30%'];
    
    return {
      width: size,
      height: size,
      left: lefts[index % lefts.length],
      top: tops[index % tops.length],
    };
  };

  return (
    <div className="relative w-full h-[600px] md:h-[800px] rounded-3xl border border-white/5 overflow-hidden bg-black/20 backdrop-blur-sm">
      {memories.map((memory, index) => (
        <motion.div
          key={memory.id}
          className="absolute rounded-full overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(255,42,109,0.3)] border-2 border-white/10 hover:border-neonPink transition-colors z-10"
          style={getPlanetStyles(index)}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          onClick={() => setSelectedMemory(memory)}
          whileHover={{ scale: 1.1, zIndex: 20 }}
        >
          <div className="w-full h-full relative group">
            <img 
              src={memory.image} 
              alt={memory.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
              <span className="text-white font-semibold text-center drop-shadow-md">{memory.title}</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass max-w-2xl w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,42,109,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-96 w-full">
                <img src={selectedMemory.image} alt={selectedMemory.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedMemory(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-neonPink transition-colors backdrop-blur-md"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 text-center">
                <p className="text-roseGold font-medium mb-2">{selectedMemory.date}</p>
                <h3 className="text-3xl font-cursive text-white mb-4">{selectedMemory.title}</h3>
                <p className="text-white/80 text-lg font-light leading-relaxed">"{selectedMemory.caption}"</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryUniverse;
