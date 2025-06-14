import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/formuse');
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/Land.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Centered Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container max-w-screen-xl mx-auto">
          <motion.h1
            className="text-white text-4xl md:text-6xl font-bold mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Chantez sans limites.
          </motion.h1>

          <motion.p
            className="text-white text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Accédez à l'entièreté de notre catalogue et à toutes nos fonctionnalités.
          </motion.p>

          {/* <motion.button
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300 text-black font-semibold rounded-full shadow-lg text-lg"
          >
            Get Started
          </motion.button> */}
          {/* <button onClick={handleGetStarted} className="special-button text-white font-bold">
  Get Started
</button> */}
<div className="button-container">
  <button onClick={handleGetStarted} className="fly-button">
    <div className="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="white">
        <path d="M2 21 23 12 2 3v7l15 2-15 2Z" />
      </svg>
    </div>
    <span>Explorer</span>
  </button>
</div>


        </div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
