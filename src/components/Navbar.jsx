import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Story', href: '#story' },
    { name: 'Memories', href: '#memories' },
    { name: 'Letters', href: '#letters' },
    { name: 'Reasons', href: '#vip' },
    { name: 'Cake', href: '#cake' },
    { name: 'Surprise', href: '#surprise' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-midnight/80 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent py-4'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-roseGold font-cursive text-2xl font-bold cursor-pointer" onClick={() => scrollTo('#home')}>
              Our Universe <Heart size={20} fill="currentColor" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => scrollTo(link.href)}
                  className="text-white/70 hover:text-white hover:text-shadow-glow text-sm uppercase tracking-wider transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-midnight/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 pt-16"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-light text-white hover:text-neonPink tracking-widest transition-colors"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
