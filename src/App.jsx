import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveData } from './data/loveData';

// Placeholder Imports for Components (we will build these)
import SecretEntry from './components/SecretEntry';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import MemoryUniverse from './components/MemoryUniverse';
import Letters from './components/Letters';
import MagicCards from './components/MagicCards';
import CakeMoment from './components/CakeMoment';
import FinalSurprise from './components/FinalSurprise';
import FutureWishes from './components/FutureWishes';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="relative min-h-screen font-sans selection:bg-neonPink selection:text-white">
      
      {/* Starry Background (Static for now, can be a canvas or CSS) */}
      <div className="fixed inset-0 z-[-1] bg-midnight">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      <AnimatePresence>
        {!isUnlocked ? (
          <SecretEntry 
            key="secret-entry"
            targetName={loveData.targetName} 
            onUnlock={() => setIsUnlocked(true)} 
          />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full flex flex-col items-center"
          >
            <Navbar />
            
            <main className="w-full max-w-7xl px-4 flex flex-col items-center gap-32 pb-32">
              <section id="home" className="w-full min-h-screen flex items-center justify-center pt-20">
                <Hero data={loveData} />
              </section>

              <section id="story" className="w-full min-h-screen flex flex-col items-center pt-20">
                <h2 className="font-cursive text-5xl md:text-7xl text-roseGold mb-16 text-shadow-glow">How It All Started</h2>
                <Timeline events={loveData.timeline} />
              </section>

              <section id="memories" className="w-full min-h-screen flex flex-col items-center pt-20">
                <h2 className="font-cursive text-5xl md:text-7xl text-roseGold mb-16 text-shadow-glow">Memory Universe</h2>
                <MemoryUniverse memories={loveData.memories} />
              </section>

              <section id="letters" className="w-full min-h-[80vh] flex flex-col items-center pt-20">
                <h2 className="font-cursive text-5xl md:text-7xl text-roseGold mb-16 text-shadow-glow">Open When...</h2>
                <Letters letters={loveData.letters} />
              </section>

              <section id="vip" className="w-full min-h-screen flex flex-col items-center justify-center pt-20">
                <h2 className="font-cursive text-5xl md:text-7xl text-roseGold mb-16 text-shadow-glow text-center">Why You're The Best</h2>
                <MagicCards reasons={loveData.reasons} />
              </section>

              <section id="cake" className="w-full min-h-screen flex flex-col items-center justify-center pt-20">
                <CakeMoment />
              </section>

              <section id="future" className="w-full min-h-[80vh] flex flex-col items-center pt-20">
                <h2 className="font-cursive text-5xl md:text-7xl text-roseGold mb-16 text-shadow-glow">Our Future</h2>
                <FutureWishes wishes={loveData.futureWishes} />
              </section>

              <section id="surprise" className="w-full min-h-screen flex flex-col items-center justify-center pt-20">
                <FinalSurprise message={loveData.finalMessage} />
              </section>
            </main>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
