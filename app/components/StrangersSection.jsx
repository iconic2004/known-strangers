'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const strangers = [
  {
    image: '/images/editorial-walk.png',
    message: 'Platform 3. Every morning. Never spoke.',
    location: 'Mumbai CST',
    isLarge: true,
  },
  {
    image: '/images/hero-editorial.png',
    message: 'Same café. Different tables.',
    location: 'Bandra West',
    isLarge: false,
  },
  {
    image: '/images/product-commuter.png',
    message: 'We bought the same coffee.',
    location: 'Andheri',
    isLarge: false,
    id: 'the-commuter',
  },
  {
    image: '/images/product-ghost.png',
    message: 'Known. Yet unknown.',
    location: 'Lower Parel',
    isLarge: true,
    id: 'the-ghost',
  },
  {
    image: '/images/product-listener.png',
    message: 'Our eyes met for a second.',
    location: 'Colaba',
    isLarge: false,
    id: 'the-listener',
  },
  {
    image: '/images/product-outsider.png',
    message: 'Always on the last train.',
    location: 'Dadar',
    isLarge: false,
    id: 'the-outsider',
  },
];

export default function StrangersSection() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-40 px-6 md:px-10 lg:px-16 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-secondary) 50%, var(--color-bg) 100%)',
      }}
      id="strangers"
    >
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16 md:mb-24">
        <motion.span
          className="block text-[0.55rem] md:text-[0.6rem] font-medium tracking-[0.5em] uppercase mb-4"
          style={{ color: 'var(--color-dim)', fontFamily: 'var(--font-ui)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Community
        </motion.span>
        
        <motion.h2
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-[0.15em] uppercase"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          The Strangers
        </motion.h2>
        
        <motion.p
          className="mt-6 text-[0.85rem] font-light tracking-[0.2em]"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Moments between the unknown.
        </motion.p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8 mt-12 md:mt-0">
          <StrangerCard data={strangers[0]} index={0} />
          <StrangerCard data={strangers[1]} index={1} />
        </motion.div>
        
        {/* Column 2 */}
        <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-8 mt-24 md:mt-32">
          <StrangerCard data={strangers[2]} index={2} />
          <StrangerCard data={strangers[3]} index={3} />
        </motion.div>
        
        {/* Column 3 */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8 mt-12 md:mt-16">
          <StrangerCard data={strangers[4]} index={4} />
          <StrangerCard data={strangers[5]} index={5} />
        </motion.div>
      </div>
    </section>
  );
}

function StrangerCard({ data, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const CardContent = (
    <>
      <Image
        src={data.image}
        alt="Stranger moment"
        fill
        className="object-cover transition-transform duration-[1.5s] ease-[var(--ease-expo)] grayscale-[40%] contrast-[1.1] brightness-[0.8] group-hover:scale-[1.08] group-hover:grayscale-[10%] group-hover:brightness-[0.9]"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[var(--ease-expo)]">
        <p 
          className="text-[0.95rem] md:text-[1.1rem] font-light italic leading-[1.5] text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          &quot;{data.message}&quot;
        </p>
        <span 
          className="block mt-3 text-[0.55rem] tracking-[0.3em] uppercase"
          style={{ color: 'var(--color-dim)', fontFamily: 'var(--font-ui)' }}
        >
          {data.location}
        </span>
      </div>
    </>
  );

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden bg-[var(--color-pure-black)] ${
        data.isLarge ? 'aspect-[3/4]' : 'aspect-square'
      }`}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="VIEW"
    >
      {data.id ? (
        <Link href={`/product/${data.id}`} className="block w-full h-full">
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </motion.div>
  );
}
