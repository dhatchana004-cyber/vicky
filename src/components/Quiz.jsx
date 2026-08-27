import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Quiz = ({ questions }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (index) => {
    if (showFeedback) return;
    
    if (index === questions[currentQ].answer) {
      setScore(score + 1);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setIsFinished(true);
      }
    }, 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex gap-1 mb-8">
              {questions.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 w-8 rounded-full transition-colors ${i <= currentQ ? 'bg-neonPink' : 'bg-white/20'}`}
                />
              ))}
            </div>

            <h3 className="text-2xl md:text-3xl text-white font-medium mb-10 leading-snug">
              {questions[currentQ].question}
            </h3>

            <div className="w-full flex flex-col gap-4">
              {questions[currentQ].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showFeedback}
                  className={`w-full py-4 px-6 rounded-xl border text-lg transition-all
                    ${showFeedback 
                      ? i === questions[currentQ].answer 
                        ? 'bg-roseGold/30 border-roseGold text-white shadow-[0_0_15px_rgba(183,110,121,0.5)]' 
                        : 'bg-white/5 border-white/10 text-white/50'
                      : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:-translate-y-1'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-roseGold font-cursive text-2xl flex items-center gap-2"
                >
                  <Sparkles size={20} />
                  {questions[currentQ].feedback}
                  <Sparkles size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-10"
          >
            <Heart size={64} className="text-neonPink mb-6 animate-pulse" />
            <h3 className="text-4xl font-cursive text-white mb-4">You know our story pretty well ❤️</h3>
            <p className="text-white/70 text-lg">
              You scored {score} out of {questions.length}. But who's counting? Every moment with you is a win.
            </p>
            <button 
              onClick={() => {
                setCurrentQ(0);
                setScore(0);
                setIsFinished(false);
              }}
              className="mt-10 glass-btn text-white text-sm"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
