'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;
    let raf;

    const init = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      const animate = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(animate);
      };

      raf = requestAnimationFrame(animate);
    };

    init();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
