// src/components/AnimatedBackground.tsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const numberOfBubbles = 15; // Increased number of bubbles for more visual presence

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Subtle animated gradient background - now includes light green */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-emerald-50"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Animated subtle circles (larger, very transparent elements) - now with light green */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`subtle-circle-${i}`} // Unique key for this set of circles
          className="absolute rounded-full bg-green-100/30" // Light green with transparency
          style={{
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05], // Even more subtle opacity
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}

      {/* Floating Bubble Animation (now includes light green bubbles) */}
      {[...Array(numberOfBubbles)].map((_, i) => {
        const size = Math.random() * 60 + 30; // Increased size range (30px to 90px)
        const startX = Math.random() * 100; // Starting X position (0-100vw)
        const startY = Math.random() * 100; // Starting Y position (0-100vh)
        const floatSpeed = Math.random() * 6 + 6; // Animation duration (6 to 12 seconds)
        const driftAmountX = (Math.random() - 0.5) * 120; // Horizontal drift (-60vw to 60vw)
        const floatAmountY = Math.random() * 60 + 60; // Vertical float distance (60vh to 120vh)

        // Now includes light green as one of the three colors
        const bubbleColorClass = 
          i % 3 === 0 ? 'bg-yellow-300/60' : 
          i % 3 === 1 ? 'bg-blue-300/60' : 
          'bg-green-300/60'; // Light green bubbles

        return (
          <motion.div
            key={`floating-bubble-${i}`} // Unique key for each floating bubble
            className={`absolute rounded-full ${bubbleColorClass} blur-md`} // Apply color, rounded shape, and moderate blur
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${startX}vw`, // Use vw for responsive positioning
              top: `${startY}vh`, // Use vh for responsive positioning
              zIndex: 3, // Ensure these bubbles are on top of other background elements (but below main content)
            }}
            animate={{
              y: [startY + 'vh', `${startY - floatAmountY}vh`, startY + 'vh'], // Float up and down relative to startY
              x: [startX + 'vw', `${startX + driftAmountX}vw`, startX + 'vw'], // Drift left/right relative to startX
              scale: [1, 1.1, 1], // Gentle pulsing scale effect
              opacity: [0.6, 0.9, 0.6], // Fade in and out, making them consistently more opaque
            }}
            transition={{
              duration: floatSpeed,
              repeat: Infinity,
              repeatType: 'reverse', // Ensures smooth back and forth animation
              ease: 'easeInOut', // Smooth acceleration and deceleration
              delay: Math.random() * 5, // Random start delay for staggered effect
            }}
          />
        );
      })}

      {/* Subtle overlay - now with light green tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-green-50/50 to-emerald-50/50" />
    </div>
  );
};

export default AnimatedBackground;
