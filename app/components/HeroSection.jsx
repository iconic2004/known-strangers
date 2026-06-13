'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Dust particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.15 - 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.01;

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const flicker = Math.sin(p.pulse) * 0.15 + 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 195, 188, ${p.opacity * flicker})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
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
      <div className="absolute inset-0 z-[0] opacity-30 pointer-events-none">
        <Image
          src="/images/editorial-walk.png"
          alt="Campaign Editorial"
          fill
          className="object-cover object-center grayscale-[20%] blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-[#0a0a0a]" />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
      />

      {/* Radial Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, #000 75%)',
        }}
      />

      {/* Ambient Light Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[1] transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(200,195,188,0.03) 0%, transparent 70%)',
          left: `calc(50% + ${mousePos.x * 80}px)`,
          top: `calc(50% + ${mousePos.y * 80}px)`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-[3] text-center"
        style={{
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
        }}
      >
        {/* Logo */}
        <h1 className="mb-6 md:mb-8" style={{ fontFamily: 'var(--font-display)' }}>
          {/* KNOWN */}
          <span className="block overflow-hidden">
            <span className="flex justify-center">
              {known.map((letter, i) => (
                <motion.span
                  key={`k-${i}`}
                  className="inline-block text-[clamp(3.5rem,11vw,10rem)] font-light tracking-[0.25em] md:tracking-[0.3em] leading-[0.9] text-[var(--color-text)]"
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
                  className="inline-block text-[clamp(3.5rem,11vw,10rem)] font-extralight tracking-[0.25em] md:tracking-[0.3em] leading-[0.9] text-[var(--color-text)]"
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
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
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
            className="magnetic-btn border border-white/20 px-10 py-4 md:px-14 md:py-5 text-[0.6rem] md:text-[0.65rem] font-medium tracking-[0.4em] uppercase text-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors duration-500 inline-flex"
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
          className="text-[0.5rem] tracking-[0.3em] uppercase"
          style={{ color: 'var(--color-dim)', fontFamily: 'var(--font-ui)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[var(--color-muted)] to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
