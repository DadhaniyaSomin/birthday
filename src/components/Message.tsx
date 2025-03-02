import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import Musicc from './kudinu1.mp3';

// You'll need to import your image
// Replace 'path/to/your/image.jpg' with your actual image path
import TopImage from './images/top.jpg';

const Message = () => {
  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Using useRef to maintain a reference to the audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Cleanup function to pause music when component unmounts
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Toggle music play/pause
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Animation variants object for motion elements
  const animations = {
    container: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 }
    },
    musicIcon: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: 0.5, duration: 0.4 }
    },
    topImage: {
      initial: { opacity: 0, scale: 0.5, y: -10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { delay: 0.8, duration: 0.5, type: "spring" }
    },
    crown: {
      initial: { opacity: 0, y: -10, scale: 0.5 },
      animate: { opacity: 1, y: -5, scale: 1 },
      transition: { delay: 1.2, duration: 0.5, type: "spring", bounce: 0.4 }
    },
    clown: {
      initial: { opacity: 0, x: 15, rotate: 20 },
      animate: { opacity: 1, x: 0, rotate: 0 },
      transition: { delay: 1.3, duration: 0.6, type: "spring", bounce: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src={Musicc} type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <motion.button
        className="absolute top-4 right-4 p-2 rounded-full bg-pink-500 text-white flex items-center gap-2"
        onClick={toggleMusic}
        {...animations.musicIcon}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Music className="w-6 h-6" />
        <span className="hidden md:inline">{isPlaying ? 'Pause Music' : 'Play Music'}</span>
      </motion.button>

      <div className="relative">
        {/* Top Image with Crown and Clown */}
        <motion.div 
          className="absolute left-1/2 -top-14 transform -translate-x-1/2 z-10" style={{ top: "-1.5rem" , left: "44%" }}
          {...animations.topImage}
        >
          {/* The base image with decorations */}
          <div className="relative">
            
            {/* Main image */}
            <img 
              src={TopImage} 
              alt="Decorative" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
        </motion.div>

        <motion.div
          {...animations.container}
          className="max-w-2xl bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center mt-12"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Dear Madam Ji,
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Happiest Birthday, my precious Kudi! 🎉🎂💕

          Wishing you a lifetime of laughter, love, and endless joy! You are truly sabse khaas, and I hope this year brings you everything your dil desires and more. May your days be filled with happiness, success, and countless sundar moments with the brightest muskurahat on your face! 🎈.
          You deserve all the love, warmth, and blessings in the world! Stay the **pataka** you are, keep shining **jaise ek chamakta sitara**, and keep **levitating** through life—effortless, fearless, and full of magic! ✨.No matter where life takes us or how far the distance may be, our dosti will always stay strong. Miles can never change the bond we share, because some connections are meant to last forever. You’re not just a friend—you’re someone who truly matters, a part of my journey that I’ll always cherish. 💞 Hope your day is as beautiful as your heart 💞.
          </p>
          <span className="text-3xl">🎂 ✨ 🎁</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Message;