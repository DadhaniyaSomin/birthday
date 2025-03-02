import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music, Cake as CakeIcon } from 'lucide-react';
import Banner from './images/banner.png';
import Musicc from './birthdaysong.mp3';
import CatCake from './images/cat-face-cake.jpg'
const Surprise = () => {
  const [stage, setStage] = useState(0);
  const [isLit, setIsLit] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const buttonLabels = [
    "Lights On",
    "Play Music",
    "Decorate",
    "Fly the Balloons",
    "Let's Cut the Cake Madam Ji",
    "Well, I Have a Message for You Madam Ji"
  ];

  const handleClick = () => {
    if (stage === 0) {
      setIsLit(true);
    } else if (stage === 1 && audioRef.current) {
      audioRef.current.play();
    } else if (stage === 5) {
      navigate('/message');
      return;
    }
    setStage((prev) => prev + 1);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${isLit ? 'bg-gradient-to-br from-pink-100 to-purple-100' : 'bg-gray-900'
        }`}
    >
      {/* Decorative Bulbs */}
      {isLit && (
        <div className="absolute top-4 left-0 right-0 flex justify-around">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full animate-pulse"
              style={{
                backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'][i % 4],
                animation: `pulse 1s ease-in-out infinite ${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Happy Birthday Message */}
      {stage >= 3 && (
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: -20, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 flex justify-center items-start mt-40"
        >
          <img
            src={Banner}
            className="w-full max-w-xs md:max-w-md h-auto mt-10 pt-10"
            alt="Happy Birthday"
          />
        </motion.h1>
      )}

      {/* Flying Balloons */}
      {stage >= 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ bottom: '-10vh', left: `${Math.random() * 100}vw` }}
              animate={{
                bottom: '120vh',
                left: `${Math.random() * 100}vw`,
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <div
                className="w-6 md:w-8 h-8 md:h-12 rounded-t-full"
                style={{
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][i % 4],
                }}
              />
              <div className="w-0.5 h-12 md:h-16 bg-gray-400 mx-auto" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Cake */}
      {stage >= 5 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute flex justify-center items-center w-full"
          style={{ top: '50%' }}
        >
          <img
            src={CatCake}
            className="w-full max-w-xs md:max-w-md h-auto mt-10 pt-10"
            alt="Cat Cake"
          />
        </motion.div>
      )}

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src={Musicc} type="audio/mpeg" />
      </audio>

      {/* Music Icon */}
      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4"
        >
          <Music className="w-6 h-6 md:w-8 md:h-8 text-pink-500" />
        </motion.div>
      )}

      {/* Control Button Container */}
      <div className="absolute inset-x-0 flex justify-center items-center px-4 mt-20 py-4">
        <motion.button
          onClick={handleClick}
          className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base text-white font-semibold shadow-lg w-full max-w-sm ${isLit
              ? 'bg-pink-500 hover:bg-pink-600'
              : 'bg-blue-500 hover:bg-blue-600'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ transformOrigin: 'center' }}
        >
          {buttonLabels[stage]}
        </motion.button>
      </div>

    </div>
  );
};

export default Surprise;
