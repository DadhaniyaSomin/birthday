import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';
import Musicc from './kudinu1.mp3';

// You'll need to import your image
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
      setIsPlaying(false);
    } else {
      audioRef.current?.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Failed to play audio:', error);
        });
    }
  };

  // Add a click listener to the entire document for mobile users
  useEffect(() => {
    const handleDocumentClick = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Ignore errors - user may need to click the specific button
          });
      }
    };

    // Add the event listener only once when the component mounts
    document.addEventListener('click', handleDocumentClick, { once: true });

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isPlaying]);

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
    floatingMusicButton: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 1.0, duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src={Musicc} type="audio/mpeg" />
      </audio>

      {/* Desktop Music Control Button (hidden on mobile) */}
      <motion.button
        className="absolute top-4 right-4 p-2 rounded-full bg-pink-500 text-white flex items-center gap-2 hidden md:flex"
        onClick={toggleMusic}
        {...animations.musicIcon}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Music className="w-6 h-6" />
        <span>{isPlaying ? 'Pause Music' : 'Play Music'}</span>
      </motion.button>

      {/* Mobile-friendly floating music button (only visible on mobile) */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 rounded-full bg-pink-500 text-white shadow-lg md:hidden z-50"
        onClick={toggleMusic}
        {...animations.floatingMusicButton}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ 
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px'
        }}
      >
        {isPlaying ? <Pause className="w-8 h-8" /> : <Music className="w-8 h-8" />}
      </motion.button>

      <div className="relative">
        {/* Top Image */}
        <motion.div 
          className="absolute transform -translate-x-1/2 z-10" 
          style={{ top: "-1.5rem", left: "44%" }}
          {...animations.topImage}
        >
          <div className="relative">
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
            You deserve all the love, warmth, and blessings in the world! Stay the <strong>pataka</strong> you are, keep shining <strong>jaise ek chamakta sitara</strong>, and keep <strong>levitating</strong> through life—effortless, fearless, and full of magic! ✨.No matter where life takes us or how far the distance may be, our dosti will always stay strong. Miles can never change the bond we share, because some connections are meant to last forever. You're not just a friend—you're someone who truly matters, a part of my journey that I'll always cherish. 💞 Hope your day is as beautiful as your heart 💞.
          </p>
          <span className="text-3xl">🎂 ✨ 🎁</span>
        </motion.div>
      </div>

      {/* Initial music play prompt - visible only on mobile */}
      {!isPlaying && (
        <div className="fixed top-0 left-0 right-0 bg-pink-500 text-white py-2 text-center md:hidden">
          Tap anywhere to play music! 🎵
        </div>
      )}
    </div>
  );
};

export default Message;