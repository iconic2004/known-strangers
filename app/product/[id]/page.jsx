'use client';

import { useParams } from 'next/navigation';
import { products } from '../../data/products';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const detailsSections = [
  { title: "Fabric Details", content: "100% Premium Heavyweight Cotton. 320 GSM for a structured, draped fit." },
  { title: "Care Instructions", content: "Machine wash cold inside out. Do not tumble dry. Do not iron directly on print." },
  { title: "Size Guide", content: "Fits true to size. For an intentionally oversized look, we recommend sizing up." },
  { title: "Shipping Information", content: "Free express shipping on all orders. Dispatched within 24-48 hours. Arrives in 3-5 business days." },
  { title: "Return Policy", content: "Free 14-day returns, no questions asked. Item must be unworn with original tags attached." }
];

const trustBadges = [
  "Free Shipping",
  "Secure Payments",
  "Premium Quality",
  "Easy Returns",
  "Made in India"
];

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-border)] py-4">
      <button 
        className="w-full flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[0.7rem] uppercase tracking-[0.15em] font-medium group-hover:text-[var(--color-muted)] transition-colors" style={{ fontFamily: 'var(--font-ui)' }}>
          {title}
        </span>
        <span className="text-[1rem] font-light transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-[0.8rem] font-light leading-relaxed text-[var(--color-muted)]" style={{ fontFamily: 'var(--font-body)' }}>
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <h1 className="text-[var(--color-text)] text-2xl" style={{ fontFamily: 'var(--font-display)' }}>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-32 pb-24 px-6 md:px-10 lg:px-16" data-cursor="VIEW">
      <Link href="/" className="inline-flex items-center mb-12 text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-300" style={{ fontFamily: 'var(--font-ui)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Home
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-[1400px] mx-auto">
        {/* Images Column */}
        <motion.div 
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[3/4] bg-transparent overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover grayscale-[10%] transition-all duration-[1.2s] ease-[var(--ease-expo)] hover:scale-[1.05] hover:grayscale-0"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.hoverImage && (
             <div className="relative aspect-[3/4] bg-transparent overflow-hidden">
              <Image
                src={product.hoverImage}
                alt={`${product.name} lifestyle`}
                fill
                className="object-cover grayscale-[10%] transition-all duration-[1.2s] ease-[var(--ease-expo)] hover:scale-[1.05] hover:grayscale-0"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </motion.div>
        
        {/* Info Column */}
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light uppercase tracking-[0.05em] mb-2 leading-tight" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
            {product.name}
          </h1>
          <p className="text-[0.75rem] uppercase tracking-[0.15em] mb-6" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-ui)' }}>
            {product.type}
          </p>
          
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[1.2rem] font-medium tracking-[0.05em]" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-ui)' }}>
              {product.price}
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] px-2 py-1 bg-[var(--color-text)] text-[var(--color-bg)] font-bold">
              In Stock
            </span>
          </div>
          
          <div className="h-px w-full bg-[var(--color-border)] mb-8" />
          
          <p className="text-[1.1rem] md:text-[1.2rem] font-light italic leading-[1.6] mb-12" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}>
            &quot;{product.description}&quot;
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button className="flex-1 bg-[var(--color-text)] text-[var(--color-bg)] border border-[var(--color-text)] px-8 py-5 text-[0.7rem] font-bold tracking-[0.3em] uppercase hover:bg-transparent hover:text-[var(--color-text)] transition-colors duration-500" style={{ fontFamily: 'var(--font-ui)' }} data-cursor="ADD">
              Add to Cart
            </button>
            <button className="sm:w-auto w-full border border-[var(--color-border)] px-8 py-5 flex items-center justify-center hover:border-[var(--color-text)] transition-colors duration-500 text-[var(--color-text)]" aria-label="Add to Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* Details Accordion */}
          <div className="mb-16">
            {detailsSections.map((section, idx) => (
              <Accordion key={idx} title={section.title} content={section.content} />
            ))}
          </div>

          {/* Trust Indicators */}
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] font-medium text-[var(--color-dim)] mb-6" style={{ fontFamily: 'var(--font-ui)' }}>Why Known Strangers</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {trustBadges.map((badge, idx) => (
                <li key={idx} className="flex items-center text-[0.65rem] uppercase tracking-[0.1em] text-[var(--color-muted)]" style={{ fontFamily: 'var(--font-ui)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 text-[var(--color-text)]">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
