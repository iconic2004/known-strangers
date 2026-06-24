'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoaded(true), 400);
          return 100;
        }
        // Accelerating progress
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Grain in loader */}
          <div className="grain-overlay" style={{ opacity: 0.05 }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="loader-brand">
              <span className="block">Known</span>
              <span className="block">Strangers</span>
            </div>

            <motion.p
              className="loader-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              You probably know us already.
            </motion.p>

            <div className="loader-bar-track">
              <div
                className="loader-bar"
                style={{ width: `${progress}%` }}
              />
            </div>

            <motion.span
              className="text-[0.6rem] tracking-[0.3em] uppercase"
              style={{ color: 'var(--color-dim)', fontFamily: 'var(--font-ui)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4 }}
            >
              {progress}%
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
