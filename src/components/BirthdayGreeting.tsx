import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';

const messages = [
  "Hello Madam Jiiii",
  "It's Your Special Day Yeyey!",
  "So, i had to make something special for you cause you are special to me!",
  "Do you wanna see what I made??"
];

const BirthdayGreeting = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        if (currentMessageIndex === messages.length - 1) {
          setShowButtons(true);
        } else {
          setCurrentMessageIndex((prev) => prev + 1);
        }
      }, 5000); // Display each message for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);


  const handleButtonClick = () => {
    setShowButtons(false);
    setShowFinalMessage(true);
    setTimeout(() => {
      navigate('/surprise');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ y: '100vh', x: Math.random() * 100 + 'vw' }}
            animate={{
              y: '-10vh',
              x: Math.random() * 100 + 'vw',
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <Heart className="text-pink-300" size={24} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full mx-4">
        <AnimatePresence mode="wait">
          {!showFinalMessage ? (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center"
            >
              <Sparkles className="inline-block text-yellow-400 mb-4" size={32} />
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="text-2xl font-semibold text-gray-800 mb-6"
                >
                  {messages[currentMessageIndex]}
                </motion.p>
              </AnimatePresence>

              {showButtons && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="space-x-4"
                >
                  <button
                    onClick={handleButtonClick}
                    className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all"
                  >
                    Yes!
                  </button>
                  <button
                    onClick={handleButtonClick}
                    className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transform hover:scale-105 transition-all"
                  >
                    No
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center"
            >
              <p className="text-2xl font-semibold text-gray-800">
                Have a look at it, Madam Jiii
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BirthdayGreeting;
