// src/components/AnimatedBackground.tsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const numberOfBubbles = 15; // Increased number of bubbles for more visual presence

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Subtle animated gradient background - provides the base white/light gray */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"
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

      {/* Animated subtle circles (larger, very transparent elements) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`subtle-circle-${i}`} // Unique key for this set of circles
          className="absolute rounded-full bg-gray-100/30" // Light gray with more transparency
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

      {/* Floating Bubble Animation (more prominent, colored, and thicker) */}
      {[...Array(numberOfBubbles)].map((_, i) => {
        const size = Math.random() * 60 + 30; // Increased size range (30px to 90px)
        const startX = Math.random() * 100; // Starting X position (0-100vw)
        const startY = Math.random() * 100; // Starting Y position (0-100vh)
        const floatSpeed = Math.random() * 6 + 6; // Animation duration (6 to 12 seconds)
        const driftAmountX = (Math.random() - 0.5) * 120; // Horizontal drift (-60vw to 60vw)
        const floatAmountY = Math.random() * 60 + 60; // Vertical float distance (60vh to 120vh)

        // Alternate between light yellow and light blue colors, with moderate transparency
        const bubbleColorClass =
          i % 2 === 0 ? 'bg-yellow-300/60' : 'bg-blue-300/60';

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

      {/* Subtle white overlay (unchanged) - helps to unify the background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-gray-50/50 to-white/50" />
    </div>
  );
};

export default AnimatedBackground;
