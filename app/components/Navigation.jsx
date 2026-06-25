'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Custom outline SVGs
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[26px] h-[26px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[26px] h-[26px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[26px] h-[26px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const HamburgerIcon = () => (
  <div className="w-[28px] h-[18px] flex flex-col justify-between items-end">
    <span className="w-full h-[1.5px] bg-white transition-all duration-300 ease-out group-hover:w-3/4" />
    <span className="w-3/4 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover:w-full" />
    <span className="w-full h-[1.5px] bg-white transition-all duration-300 ease-out group-hover:w-1/2" />
  </div>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[20px] h-[20px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[20px] h-[20px]">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[20px] h-[20px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[20px] h-[20px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const navLinks = [
  { label: 'Shop', href: '#chapters' },
  { label: 'Chapters', href: '#chapters' },
  { label: 'The Strangers', href: '#strangers' },
  { label: 'About', href: '#about' },
];

const categories = [
  { label: 'TOPWEAR', isDropdown: true },
  { label: 'BASICS', href: '#chapters' },
  { label: 'BOTTOMWEAR', href: '#chapters' },
  { label: 'SALE', href: '#chapters' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('SHOP ALL');
  const [topwearExpanded, setTopwearExpanded] = useState(false);

  // Mock cart items matching existing repository assets
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'GHOST HOODIE (HEAVYWEIGHT)',
      price: 180.00,
      size: 'L',
      image: '/images/product-ghost.png',
      qty: 1
    },
    {
      id: 2,
      name: 'OUTSIDER OVERSIZED TEE',
      price: 85.00,
      size: 'XL',
      image: '/images/product-outsider.png',
      qty: 1
    }
  ]);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      setMenuOpen(false);
    }
  };

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] h-[88px] flex items-center justify-between px-6 md:px-12 border-b border-white/30 transition-colors duration-500 ${scrolled ? 'bg-black' : 'bg-transparent'
          }`}
        style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
      >
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center " data-cursor="HOME">
          <img
            src="/images/White-logo.svg"
            alt="Known Strangers Logo"
            className="h-40 w-auto transition-transform duration-300"
          />
        </Link>

        {/* Right: Actions / Icons Group */}
        <div className="flex gap-10  items-center justify-end space-x-6 md:space-x-8">
          {/* User Account Button */}
          <button
            onClick={() => setAccountOpen(true)}
            className="text-white hover:scale-110 hover:opacity-80 transition-all duration-300"
            aria-label="Account"
          >
            <UserIcon />
          </button>

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="text-white hover:scale-110 hover:opacity-80 transition-all duration-300"
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white hover:scale-110 hover:opacity-80 transition-all duration-300 flex items-center"
            aria-label="Shopping Cart"
          >
            <ShoppingBagIcon />
            {totalQty > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-white text-black text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="group text-white hover:scale-110 hover:opacity-80 transition-all duration-300 flex items-center"
            aria-label="Menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      {/* Slide-out Menu Panel (Hamburger menu) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop with dark blur and subtle black overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            {/* White Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-[50%] xl:w-[45%] bg-white text-black z-[201] p-8 md:p-12 flex flex-col justify-between rounded-none border-l border-black/10 overflow-y-auto"
              style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-12">
                  <span className=" text-[0.75rem] font-bold tracking-[0.3em] text-black uppercase" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>MENU</span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-black hover:opacity-60 transition-opacity"
                    aria-label="Close menu"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Vertical Navigation Links */}
                <div className="flex flex-col gap-y-[10px] text-left my-8">
                  {categories.map((category, idx) => {
                    const isTopwear = category.label === 'TOPWEAR';
                    const isActive = activeCategory === category.label;

                    return (
                      <motion.div
                        key={category.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex flex-col"
                      >
                        <div className="flex items-center justify-between py-2 group">
                          {isTopwear ? (
                            <button
                              onClick={() => setTopwearExpanded(!topwearExpanded)}
                              className="flex items-center space-x-3 text-left text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-black hover:text-black/60 transition-colors"
                              style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                            >
                              <span>{category.label}</span>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                className={`w-4 h-4 transition-transform duration-300 ${topwearExpanded ? 'rotate-180' : ''}`}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                              </svg>
                            </button>
                          ) : (
                            <a
                              href={category.href}
                              onClick={(e) => {
                                setActiveCategory(category.label);
                                handleLinkClick(e, category.href);
                              }}
                              className="flex items-center space-x-2 text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-black hover:text-black/60 transition-colors"
                              style={{ fontFamily: 'var(--font-heading), sans-serif' }}
                            >
                              <span>{category.label}</span>
                              {isActive && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 text-black inline ml-2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                              )}
                            </a>
                          )}
                        </div>

                        {/* Expandable Submenu for TOPWEAR */}
                        {isTopwear && (
                          <AnimatePresence>
                            {topwearExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden pl-4 flex flex-col space-y-2 mt-4 border-l border-black/10"
                              >
                                {[
                                  { name: 'HOODIES & SWEATSHIRTS', href: '#chapters' },
                                  { name: 'T-SHIRTS & TEES', href: '#chapters' },
                                  { name: 'JACKETS & OUTERWEAR', href: '#chapters' },
                                  { name: 'SHIRTS', href: '#chapters' },
                                ].map((sub) => (
                                  <a
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={(e) => {
                                      setActiveCategory('TOPWEAR');
                                      handleLinkClick(e, sub.href);
                                    }}
                                    className="text-xs md:text-sm font-bold tracking-widest text-black/60 hover:text-black transition-colors uppercase"
                                  >
                                    {sub.name}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Icons — stacked vertically below categories */}
                <div className="flex flex-col space-y-[40px] mt-16">

                  <a href="#" className="flex items-center space-x-3 text-black/60 hover:text-black transition-colors duration-300" aria-label="Instagram">
                    <InstagramIcon />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Instagram</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-black/60 hover:text-black transition-colors duration-300" aria-label="Email">
                    <EmailIcon />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Email</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-black/60 hover:text-black transition-colors duration-300" aria-label="Phone">
                    <PhoneIcon />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Phone</span>
                  </a>
                  <div className="bg-black/20 flex w-35 pt-6 mt-20 ">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setAccountOpen(true);
                      }}
                      className="text-[0.7rem] font-bold tracking-[0.2em] text-black hover:opacity-60 transition-opacity uppercase"
                    >
                      LOG IN / REGISTER
                    </button>
                  </div>

                </div>
              </div>

              {/* Login / Register at the very bottom, centered */}


            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-[200]"
            />
            {/* Cart Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#0A0A0A] border-l border-white/10 z-[201] p-8 flex flex-col justify-between"
              style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-white">YOUR BAG ({totalQty})</span>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="text-white hover:opacity-75 transition-opacity"
                    aria-label="Close cart"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Items List */}
                {cartItems.length > 0 ? (
                  <div className="space-y-6 mt-8 max-h-[60vh] overflow-y-auto pr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex space-x-4 border-b border-white/5 pb-6">
                        <div className="w-20 h-24 bg-neutral-900 border border-white/10 relative overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-[0.7rem] font-bold tracking-wider text-white">{item.name}</h4>
                            <p className="text-[0.6rem] text-white/50 tracking-widest mt-1">SIZE: {item.size}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-white/20 rounded">
                              <button
                                onClick={() => updateQty(item.id, -1)}
                                className="px-2 py-0.5 text-white/50 hover:text-white transition-colors text-sm"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs text-white">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.id, 1)}
                                className="px-2 py-0.5 text-white/50 hover:text-white transition-colors text-sm"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-[0.75rem] font-bold text-white">${(item.price * item.qty).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[40vh] text-center">
                    <p className="text-sm tracking-widest text-white/50">YOUR BAG IS EMPTY</p>
                    <button
                      onClick={() => { setCartOpen(false); document.querySelector('#chapters')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="mt-6 text-xs font-bold uppercase tracking-widest border-b border-white pb-1 text-white hover:text-white/70 transition-colors"
                    >
                      SHOP THE COLLECTION
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-white/10 pt-6">
                  <div className="flex justify-between text-xs tracking-widest uppercase mb-4 text-white">
                    <span>Subtotal</span>
                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="text-[0.6rem] text-white/40 tracking-wider uppercase mb-6">
                    Shipping & taxes calculated at checkout. Free worldwide shipping.
                  </div>
                  <button className="w-full bg-white text-black font-bold uppercase text-[0.8rem] tracking-wider py-4 rounded-[8px] hover:bg-neutral-200 transition-colors">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Account Overlay */}
      <AnimatePresence>
        {accountOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setAccountOpen(false)}
              className="fixed inset-0 bg-black/85 z-[200]"
            />
            {/* Account Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] bg-[#0A0A0A] border border-white/15 p-8 z-[201] text-center rounded-[8px]"
              style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <span className="text-[0.65rem] tracking-[0.3em] font-bold text-white">MEMBER PORTAL</span>
                <button
                  onClick={() => setAccountOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>

              <h3 className="text-lg font-bold tracking-wider mb-6 text-white uppercase">SIGN IN</h3>

              <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[0.55rem] uppercase tracking-widest text-white/50 mb-2">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border border-white/20 rounded-[8px] py-3 px-4 text-sm text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-[0.55rem] uppercase tracking-widest text-white/50 mb-2">PASSWORD</label>
                  <input
                    type="password"
                    className="w-full bg-transparent border border-white/20 rounded-[8px] py-3 px-4 text-sm text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black font-bold uppercase text-xs tracking-widest py-3.5 rounded-[8px] hover:bg-neutral-200 transition-colors mt-4"
                >
                  SIGN IN
                </button>
              </form>

              <div className="mt-6 flex flex-col space-y-3">
                <a href="#" className="text-[0.6rem] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                  FORGOT PASSWORD?
                </a>
                <span className="text-[0.65rem] text-white/30">
                  NEW CUSTOMER?{' '}
                  <a href="#" className="text-white hover:underline transition-colors ml-1">
                    CREATE AN ACCOUNT
                  </a>
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A0A0A] z-[300] p-6 md:p-12 flex flex-col justify-between"
            style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-[0.65rem] tracking-[0.3em] text-white/50 uppercase">SEARCH ENGINE</span>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-white hover:opacity-75 transition-opacity"
                aria-label="Close search"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Input Container */}
            <div className="max-w-[800px] w-full mx-auto my-auto text-center px-4">
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/30 py-4 text-2xl md:text-5xl font-light uppercase tracking-wider text-white text-center focus:outline-none focus:border-white transition-colors placeholder-white/20"
                placeholder="SEARCH FOR A STRANGER..."
                autoFocus
              />
              <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.25em] text-white/40 uppercase mt-4">
                Press Enter to search, or Esc to cancel
              </p>

              {/* Suggestions */}
              <div className="mt-12 text-left max-w-[500px] mx-auto">
                <h5 className="text-[0.55rem] uppercase tracking-widest text-white/50 mb-4 font-bold">POPULAR SEARCHES</h5>
                <div className="flex flex-wrap gap-3">
                  {['GHOST HOODIE', 'COMMUTER CAPE', 'OUTSIDER OVERSIZED TEE', 'CHAPTER 1'].map((term) => (
                    <button
                      key={term}
                      onClick={() => { }}
                      className="text-xs border border-white/10 hover:border-white/40 text-white/70 hover:text-white px-3 py-1.5 rounded-full transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer space */}
            <div className="h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

