'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { label: 'Shop', href: '#chapters' },
  { label: 'Chapters', href: '#chapters' },
  { label: 'The Strangers', href: '#strangers' },
  { label: 'Journal', href: '#journal' },
  { label: 'About', href: '#about' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > lastScroll.current && y > 400);
      lastScroll.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.03]' 
            : 'bg-transparent'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between h-20 px-6 md:px-10 lg:px-16 max-w-[1800px] mx-auto">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative z-[101]"
            data-cursor="HOME"
          >
            <div className="font-[var(--font-display)]" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="block text-[0.75rem] md:text-[0.85rem] font-normal tracking-[0.4em] uppercase leading-tight text-[var(--color-text)]">
                Known
              </span>
              <span className="block text-[0.75rem] md:text-[0.85rem] font-light tracking-[0.4em] uppercase leading-tight text-[var(--color-text)]">
                Strangers
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group relative text-[0.65rem] font-medium tracking-[0.25em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-500"
                style={{ fontFamily: 'var(--font-ui)' }}
                data-cursor="EXPLORE"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-text)] group-hover:w-full transition-all duration-500 ease-[var(--ease-expo)]" />
              </a>
            ))}

            {/* Cart */}
            <a
              href="#"
              className="relative text-[0.65rem] font-medium tracking-[0.25em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-500"
              style={{ fontFamily: 'var(--font-ui)' }}
              data-cursor="SHOP"
            >
              Cart
              <span className="absolute -top-2 -right-4 w-4 h-4 bg-[var(--color-text)] text-[var(--color-bg)] rounded-full text-[0.5rem] flex items-center justify-center font-semibold tracking-normal">
                0
              </span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-[101] w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px bg-[var(--color-text)] transition-all duration-500 origin-center ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-6 h-px bg-[var(--color-text)] transition-all duration-500 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-6 h-px bg-[var(--color-text)] transition-all duration-500 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-[var(--color-bg)] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[clamp(2rem,6vw,3.5rem)] font-light tracking-[0.15em] uppercase"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#"
              className="text-[1.2rem] font-light tracking-[0.3em] uppercase mt-8"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-muted)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
            >
              Cart (0)
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
