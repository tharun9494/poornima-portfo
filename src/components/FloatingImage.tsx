import React from 'react';
import { motion } from 'framer-motion';

interface FloatingImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  duration?: number;
  floatDistance?: number;
}

const FloatingImage: React.FC<FloatingImageProps> = ({
  src,
  alt,
  className = '',
  delay = 0,
  duration = 3,
  floatDistance = 20
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: [0, -floatDistance, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }
      }}
      whileHover={{
        scale: 1.05,
        rotate: [0, -1, 1, -1, 0],
        transition: { duration: 0.5 }
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default FloatingImage;
