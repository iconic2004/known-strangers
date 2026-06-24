'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  return (
    <footer 
      ref={footerRef}
      className="relative pt-24 md:pt-32 pb-10 px-6 md:px-10 lg:px-16"
      style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-pure-black) 100%)' }}
    >
      <div className="max-w-[1400px] mx-auto border-t border-[var(--color-border-light)] pt-16 md:pt-24 hover:border-white transition-colors duration-1000">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-20 md:mb-32">
          {/* Brand Info */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="font-[var(--font-display)] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="block text-[1rem] md:text-[1.2rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)] leading-tight">
                Known
              </span>
              <span className="block text-[1rem] md:text-[1.2rem] font-light tracking-[0.25em] uppercase text-[var(--color-text)] leading-tight">
                Strangers
              </span>
            </div>
            <p 
              className="text-[0.75rem] font-light leading-[1.8] max-w-[280px]"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
            >
              A premium streetwear label exploring the poetry of urban loneliness and anonymous connections. Based in Mumbai.
            </p>
          </motion.div>

          {/* Links 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="text-[0.6rem] font-medium tracking-[0.3em] uppercase mb-6 text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-ui)' }}>
              Shop
            </h4>
            <ul className="flex flex-col gap-4">
              {['All Products', 'T-Shirts', 'Hoodies & Outerwear', 'Bottoms', 'Accessories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[0.75rem] font-light text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-[0.6rem] font-medium tracking-[0.3em] uppercase mb-6 text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-ui)' }}>
              Explore
            </h4>
            <ul className="flex flex-col gap-4">
              {['The Strangers', 'Journal', 'Campaigns', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[0.75rem] font-light text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-[0.6rem] font-medium tracking-[0.3em] uppercase mb-6 text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-ui)' }}>
              The Archive
            </h4>
            <p className="text-[0.75rem] font-light text-[var(--color-muted)] mb-6">
              Subscribe to receive exclusive access to the next chapter.
            </p>
            <form className="flex border-b border-[var(--color-border-light)] pb-2 focus-within:border-white transition-colors duration-300">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent w-full outline-none text-[0.8rem] font-light text-white placeholder-zinc-600"
              />
              <button 
                type="submit"
                className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-text)] hover:text-[var(--color-muted)] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Join
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[var(--color-border-light)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-[0.6rem] tracking-[0.2em] text-[var(--color-dim)]" style={{ fontFamily: 'var(--font-ui)' }}>
            &copy; {new Date().getFullYear()} KNOWN STRANGERS STUDIOS
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Twitter', 'Spotify'].map((social) => (
              <a 
                key={social}
                href="#" 
                className="text-[0.6rem] tracking-[0.15em] uppercase text-[var(--color-dim)] hover:text-white transition-colors duration-300"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {social}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
