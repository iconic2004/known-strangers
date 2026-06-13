'use client';

import { useParams } from 'next/navigation';
import { products } from '../../data/products';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
        <motion.div 
          className="relative aspect-[3/4] bg-[var(--color-card)] overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover grayscale-[15%] transition-all duration-[1.2s] ease-[var(--ease-expo)] hover:scale-[1.05] hover:grayscale-0"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
        
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[0.65rem] tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--color-dim)', fontFamily: 'var(--font-ui)' }}>
            {product.character}
          </span>
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-light uppercase tracking-[0.05em] mb-4 leading-tight" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
            {product.name}
          </h1>
          <p className="text-[0.75rem] uppercase tracking-[0.15em] mb-8" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-ui)' }}>
            {product.type}
          </p>
          
          <div className="h-px w-full bg-[var(--color-border-light)] mb-8" />
          
          <p className="text-[1.2rem] md:text-[1.5rem] font-light italic leading-[1.6] mb-12" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}>
            &quot;{product.description}&quot;
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-auto">
            <span className="text-[1.2rem] font-light tracking-[0.1em]" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-ui)' }}>
              {product.price}
            </span>
            <button className="magnetic-btn border border-white/20 px-10 py-5 text-[0.65rem] font-medium tracking-[0.4em] uppercase hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-500" style={{ fontFamily: 'var(--font-ui)' }} data-cursor="ADD">
              <span>Add to Cart</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
