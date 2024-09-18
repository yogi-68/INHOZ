import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo1.png'; // Update this path to match your logo file location
import '../styles/LogoSplash.css';

const LogoSplash = ({ onFinished }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinished();
    }, 5000); // 5 seconds duration

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <motion.div
      className="logo-splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <div className="logo-content">
        <motion.div
          className="logo-container"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        >
          <img src={logo} alt="Company Logo" className="logo-image" />
        </motion.div>
        <motion.p
          className="logo-subtext"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Intelligent Hospitalization
        </motion.p>
        <motion.div
          className="quote-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="quote">
            "The best way to find yourself is to lose yourself in the service of others."
          </p>
          <p className="quote-author">- Mahatma Gandhi</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LogoSplash;
