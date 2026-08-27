import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';

const Letters = ({ letters }) => {
  const [activeLetter, setActiveLetter] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
      {letters.map((letter, index) => (
        <motion.div
          key={letter.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative w-64 h-48 cursor-pointer group"
          onClick={() => setActiveLetter(letter)}
          whileHover={{ y: -10 }}
        >
          {/* Envelope Back */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20"></div>
          
          {/* Envelope Flap */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 backdrop-blur-md origin-top border-b border-white/20 transition-transform duration-500 group-hover:rotate-x-[180deg]" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}></div>
          
          {/* Label */}
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center z-10 pointer-events-none">
            <span className="font-cursive text-2xl text-white text-shadow-glow drop-shadow-md">
              {letter.title}
            </span>
          </div>

          {/* Seal */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-neonPink drop-shadow-[0_0_5px_rgba(255,42,109,0.8)]">
            <Mail size={32} />
          </div>
        </motion.div>
      ))}

      {/* Opened Letter Modal */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: '100vh', rotateZ: -10 }}
              animate={{ scale: 1, y: 0, rotateZ: 0 }}
              exit={{ scale: 0.9, y: '100vh', rotateZ: 10 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-[#fdf6e3] text-gray-800 p-8 md:p-12 rounded-lg max-w-2xl w-full shadow-2xl relative min-h-[50vh] flex flex-col"
              style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ccc 31px, #ccc 32px)', backgroundAttachment: 'local' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveLetter(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
              
              <h3 className="font-cursive text-3xl mb-8 text-roseGold border-b-2 border-roseGold/20 pb-2 inline-block self-start">
                {activeLetter.title}...
              </h3>
              
              <p className="font-sans text-lg leading-[32px] tracking-wide whitespace-pre-line">
                {activeLetter.content}
              </p>
              
              <div className="mt-auto pt-12 flex justify-end">
                <span className="font-cursive text-2xl text-gray-600">Yours Always ❤️</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Letters;
