import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const VipPass = () => {
  const cardRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full flex justify-center items-center py-10" style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d"
        }}
        className="w-full max-w-sm aspect-[1/1.5] rounded-3xl relative cursor-pointer group"
      >
        <div 
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-between p-8 overflow-hidden"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Holographic Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>

          <div className="w-full text-center mt-4">
            <h3 className="font-sans text-xs tracking-[0.3em] text-white/50 uppercase mb-2">Exclusive Access</h3>
            <h2 className="font-cursive text-5xl text-roseGold text-shadow-glow">VIP Bestie</h2>
          </div>

          <div className="w-full space-y-5 text-sm font-medium text-white/90">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50">Level</span>
              <span>Maximum</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50">Loyalty</span>
              <span>100%</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50">Inside Jokes</span>
              <span>Countless</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/50">Brain Cells Shared</span>
              <span>Just 1</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-white/50">Status</span>
              <span className="text-roseGold font-bold">Unbreakable</span>
            </div>
          </div>

          <div className="w-full mb-4">
            <div className="h-12 w-full bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
               <span className="font-mono text-xs tracking-widest text-white/30">LIFETIME VALIDITY</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VipPass;
