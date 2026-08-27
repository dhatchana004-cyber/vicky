import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, Unlock } from 'lucide-react';

const SecretEntry = ({ targetName, onUnlock }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const [isMidnight, setIsMidnight] = useState(false);

  useEffect(() => {
    // Target time: midnight tonight
    const target = new Date();
    target.setHours(24, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        setIsMidnight(true);
        clearInterval(timer);
      } else {
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const m = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0');
        const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
        setTimeLeft({ hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().toLowerCase() === targetName.toLowerCase()) {
      setError(false);
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-midnight z-50 overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Floating Background Hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-roseGold/20"
          initial={{ 
            y: "110vh", 
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 1.5 + 0.5
          }}
          animate={{ 
            y: "-10vh",
            rotate: 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Heart fill="currentColor" size={24} />
        </motion.div>
      ))}

      <motion.div 
        className="glass p-10 rounded-3xl flex flex-col items-center max-w-md w-full mx-4 text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          animate={{ scale: isUnlocking ? 1.2 : 1 }}
          className="mb-6 text-neonPink"
        >
          {isUnlocking ? <Unlock size={48} /> : <Lock size={48} />}
        </motion.div>

        {/* Countdown Timer */}
        {!isMidnight && (
          <div className="flex gap-4 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white text-shadow-glow">{timeLeft.hours}</span>
              <span className="text-xs text-white/50 uppercase tracking-widest mt-1">Hours</span>
            </div>
            <span className="text-2xl text-neonPink font-bold mt-1">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white text-shadow-glow">{timeLeft.minutes}</span>
              <span className="text-xs text-white/50 uppercase tracking-widest mt-1">Mins</span>
            </div>
            <span className="text-2xl text-neonPink font-bold mt-1">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white text-shadow-glow">{timeLeft.seconds}</span>
              <span className="text-xs text-white/50 uppercase tracking-widest mt-1">Secs</span>
            </div>
          </div>
        )}

        {isMidnight && (
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-cursive text-neonPink text-shadow-glow mb-6 animate-pulse-glow"
          >
            It's Time! 🎉
          </motion.h2>
        )}

        <h1 className="text-2xl font-light mb-2 text-white/90">Someone special made something for you...</h1>
        <p className="text-sm text-white/50 mb-8">Enter your name to unlock the universe.</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Your Name"
            className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-neonPink transition-colors backdrop-blur-sm`}
            disabled={isUnlocking}
          />
          
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-roseGold to-neonPink text-white font-medium py-3 rounded-xl shadow-[0_0_20px_rgba(255,42,109,0.4)] hover:shadow-[0_0_30px_rgba(255,42,109,0.6)] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isUnlocking}
          >
            {isUnlocking ? 'Unlocking...' : 'Unlock My Surprise'} <Heart size={18} />
          </motion.button>
        </form>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-4"
          >
            That's not the right name! Try again.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SecretEntry;
