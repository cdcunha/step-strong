'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for the fade-out animation to complete before unmounting
      setTimeout(() => setIsMounted(false), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            transition: { duration: 0.3 }
          }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.05, 1],
              opacity: 1,
              transition: { 
                duration: 0.6,
                ease: "easeOut"
              }
            }}
          >
            <motion.div 
              className="relative w-32 h-32 mb-4"
              animate={{
                scale: [1, 1.05, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              <Image
                src="/logo.png"
                alt="Step Strong Logo"
                fill
                className="object-contain dark:invert"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
