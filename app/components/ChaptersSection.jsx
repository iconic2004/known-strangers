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
      className="relative py-24 md:py-40 px-6 md:px-10 lg:px-16 overflow-hidden"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto">
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
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-card)] mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-[1.2s] ease-[var(--ease-expo)] grayscale-[15%] brightness-[0.95] group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:brightness-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Info */}
        <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[var(--ease-expo)]">
          <p
            className="text-[0.6rem] tracking-[0.3em] uppercase mb-1"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-ui)' }}
          >
            {product.character}
          </p>
          <p
            className="text-[0.78rem] font-light italic leading-[1.6]"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}
          >
            &quot;{product.description}&quot;
          </p>
        </div>

        {/* Quick Add */}
        <button
          className="absolute top-3 right-3 w-9 h-9 border border-white/30 flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-[var(--ease-expo)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] text-[var(--color-text)]"
          aria-label={`Add ${product.name} to cart`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="text-[1rem] md:text-[1.1rem] font-light tracking-[0.05em]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            {product.name}
          </h3>
          <p
            className="text-[0.65rem] tracking-[0.15em] uppercase mt-1"
            style={{ color: 'var(--color-dim)', fontFamily: 'var(--font-ui)' }}
          >
            {product.type}
          </p>
        </div>

        <span
          className="text-[0.75rem] tracking-[0.1em] font-light"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-ui)' }}
        >
          {product.price}
        </span>
      </div>
      </Link>
    </motion.div>
  );
}
