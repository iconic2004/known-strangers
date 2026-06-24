'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function StorySection() {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const imgInView = useInView(imgRef, { once: true, margin: '-100px' });

  const lines = [
    'We know each other.',
    'We never met.',
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-24 md:py-40 px-6 md:px-10 lg:px-16 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
      id="story"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text Side */}
          <div className="order-2 lg:order-1">
            <h2
              className="mb-8 md:mb-12"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.15] text-[var(--color-text)]"
                    initial={{ y: '110%' }}
                    animate={isInView ? { y: '0%' } : { y: '110%' }}
                    transition={{
                      duration: 1,
                      delay: i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Divider */}
            <motion.div
              className="w-16 h-px mb-8"
              style={{ background: 'var(--color-faint)' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left', background: 'var(--color-faint)' }}
            />

            <motion.p
              className="text-[0.85rem] md:text-[0.95rem] font-light leading-[1.9] max-w-[420px]"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Every day you pass them. On the platform. In the train. At the café. 
              Faces you remember but names you never knew. Known Strangers is for 
              every connection that exists between the anonymous and the intimate.
            </motion.p>

            <motion.p
              className="text-[0.85rem] md:text-[0.95rem] font-light leading-[1.9] max-w-[420px] mt-6"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              We don&apos;t make clothes for everyone. We make clothes for those who 
              understand the poetry of crowded solitude.
            </motion.p>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2" ref={imgRef}>
            <motion.div
              className="relative aspect-[3/4] overflow-hidden"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={imgInView ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ scale: 1.3 }}
                animate={imgInView ? { scale: 1 } : { scale: 1.3 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <Image
                  src="/images/hero-editorial.png"
                  alt="Editorial streetwear photography"
                  fill
                  className="object-cover grayscale-[20%] contrast-[1.05] brightness-[0.95]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-40" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
