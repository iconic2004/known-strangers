'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function FeaturedCampaign() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[90vh] md:h-screen overflow-hidden"
      id="campaign"
    >
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/editorial-walk.png"
          alt="Campaign Editorial"
          fill
          className="object-cover grayscale-[20%] contrast-[1.05] brightness-[0.7]"
          sizes="100vw"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div
        ref={textRef}
        className="absolute bottom-0 left-0 w-full px-6 md:px-10 lg:px-16 pb-20 md:pb-32"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            className="text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] uppercase mb-4 md:mb-6"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-ui)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            FW26 Collection
          </motion.p>

          <motion.h2
            className="text-[clamp(2.5rem,6vw,6rem)] font-light tracking-[0.05em] leading-[1.1] text-white"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            The City Listens.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-12"
          >
            <a
              href="#shop"
              className="magnetic-btn border-b border-white/40 pb-1 text-[0.65rem] font-medium tracking-[0.3em] uppercase text-white hover:border-white transition-colors duration-300"
              style={{ fontFamily: 'var(--font-ui)' }}
              data-cursor="EXPLORE"
            >
              <span>View Campaign</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
