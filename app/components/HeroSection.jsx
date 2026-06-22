'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);
  // Store mouse position in a ref — no re-renders
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Mouse parallax via direct DOM manipulation (no useState re-renders)
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mousePosRef.current = { x, y };

      if (glowRef.current) {
        glowRef.current.style.left = `calc(50% + ${x * 80}px)`;
        glowRef.current.style.top = `calc(50% + ${y * 80}px)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    
    // Theme switching observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          document.body.classList.add('light-theme');
        } else {
          document.body.classList.remove('light-theme');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      observer.disconnect();
    };
  }, []);

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 1.5 + i * 0.04,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const known = 'KNOWN'.split('');
  const strangers = 'STRANGERS'.split('');

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
      id="hero"
    >
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-[0] opacity-50 pointer-events-none">
        <Image
          src="/images/heroSection-bg.png"
          alt="Campaign Editorial"
          fill
          className="object-cover object-center grayscale-[20%] blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-[#0a0a0a]" />
      </div>


      {/* Radial Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, #000 75%)',
        }}
      />

      {/* Ambient Light Glow */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(200,195,188,0.03) 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
        }}
      />

      {/* Hero Content */}
      <motion.div
        ref={contentRef}
        className="relative z-[3] text-center"
        style={{ willChange: 'transform' }}
      >
        {/* Logo */}
        <h1 className="mb-6 md:mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
          {/* KNOWN */}
          <span className="block overflow-hidden">
            <span className="flex justify-center">
              {known.map((letter, i) => (
                <motion.span
                  key={`k-${i}`}
                  className="inline-block text-[clamp(1.5rem,8.5vw,10rem)] font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.25em] leading-[0.9] text-[#F5F5F5]"
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </span>

          {/* STRANGERS */}
          <span className="block overflow-hidden -mt-3 sm:-mt-5 md:-mt-8 lg:-mt-12">
            <span className="flex justify-center">
              {strangers.map((letter, i) => (
                <motion.span
                  key={`s-${i}`}
                  className="inline-block text-[clamp(1.5rem,8.5vw,10rem)] font-extralight tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.25em] leading-[0.9] text-[#F5F5F5]"
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i + known.length}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-[clamp(0.6rem,1.1vw,0.8rem)] font-light tracking-[0.35em] uppercase mb-10 md:mb-14"
          style={{ color: '#A1A1AA', fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        >
          For those who belong nowhere and everywhere.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#chapters"
            className="magnetic-btn border border-white/20 px-10 py-4 md:px-14 md:py-5 text-[0.6rem] md:text-[0.65rem] font-medium tracking-[0.4em] uppercase text-[#F5F5F5] hover:text-black transition-colors duration-500 inline-flex"
            style={{ fontFamily: 'var(--font-ui)' }}
            data-cursor="ENTER"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#chapters')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Enter the Chapter</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span
          className="text-[0.5rem] tracking-[0.3em] uppercase text-[#71717a]"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#A1A1AA] to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
