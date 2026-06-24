'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '../data/products';


export default function ChaptersSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      className="relative py-24 md:py-40 px-4 md:px-10 lg:px-16 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
      id="chapters"
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-16 md:mb-24 max-w-[800px] mx-auto">
        <motion.span
          className="block text-[0.55rem] md:text-[0.6rem] font-medium tracking-[0.5em] uppercase mb-4"
          style={{ color: 'var(--color-dim)', fontFamily: 'var(--font-ui)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Chapter 01
        </motion.span>

        <motion.h2
          className="text-[clamp(1.6rem,3.5vw,3rem)] font-light tracking-[0.12em] uppercase leading-[1.3]"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          The People You Pass<br />Every Day
        </motion.h2>

        <motion.div
          className="w-12 h-px mx-auto mt-8"
          style={{ background: 'var(--color-faint)' }}
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 max-w-[1400px] mx-auto">
        {products.map((product, i) => (
          <ProductCard key={product.name} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-cursor="VIEW"
    >
      <Link href={`/product/${product.id}`} className="block w-full h-full">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-transparent mb-3 md:mb-4">
        {/* Primary Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 ease-[var(--ease-expo)] grayscale-[10%] brightness-[0.95] group-hover:opacity-0"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
        />

        {/* Secondary Hover Image */}
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} lifestyle`}
            fill
            className="object-cover transition-all duration-[1.2s] ease-[var(--ease-expo)] opacity-0 group-hover:opacity-100 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
          />
        )}

        {/* Quick Add (Desktop) */}
        <button
          className="hidden md:flex absolute top-3 right-3 w-9 h-9 border border-white/30 items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-[var(--ease-expo)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] text-[var(--color-text)]"
          aria-label={`Add ${product.name} to cart`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-4">
        <div className="flex items-center justify-between w-full md:w-auto md:block">
          <h3
            className="text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] font-medium md:font-medium tracking-[0.05em] uppercase text-left"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {product.name}
          </h3>
          
          {/* Quick Add (Mobile) */}
          <button
            className="md:hidden flex items-center justify-center text-[var(--color-text)] active:scale-95 transition-transform p-1"
            aria-label={`Add ${product.name} to cart`}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        <span
          className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] tracking-[0.05em] md:tracking-[0.1em] font-light text-left md:text-right mt-0.5 md:mt-0"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-ui)' }}
        >
          {product.price}
        </span>
      </div>
      </Link>
    </motion.div>
  );
}
