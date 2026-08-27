import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CalendarHeart } from 'lucide-react';

const Timeline = ({ events }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-roseGold via-neonPink to-transparent transform -translate-x-1/2 rounded-full hidden md:block"></div>
      
      {/* Mobile Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-roseGold via-neonPink to-transparent rounded-full md:hidden"></div>

      <div className="flex flex-col gap-8 md:gap-16 relative z-10">
        {events.map((event, index) => {
          const isExpanded = expandedId === event.id;
          const isLeft = index % 2 === 0;

          return (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-start ${isLeft ? 'md:flex-row-reverse' : ''} w-full relative pl-16 md:pl-0`}
            >
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-midnight border-2 border-roseGold rounded-full transform -translate-x-1/2 mt-1 shadow-[0_0_15px_rgba(183,110,121,0.6)] cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : event.id)}></div>
              
              {/* Content Box */}
              <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                <div 
                  className="glass p-6 rounded-2xl cursor-pointer hover:border-roseGold/50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : event.id)}
                >
                  <h3 className="text-2xl text-white font-semibold mb-2">{event.title}</h3>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/80 mt-4 leading-relaxed font-light">
                          {event.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`mt-4 flex ${isLeft ? 'md:justify-end' : 'justify-start'} text-white/30`}>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
