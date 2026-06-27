'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Inline SVG Icons ─── */
const ReturnsIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="24" cy="24" r="20" />
    <path d="M24 14v10l6 4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 10l-3 4 4 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneSupportIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M36 30.6v3.6a2.4 2.4 0 01-2.616 2.4A23.76 23.76 0 0120.4 31.8a23.4 23.4 0 01-7.2-7.2A23.76 23.76 0 018.4 11.616 2.4 2.4 0 0110.788 9.2h3.6a2.4 2.4 0 012.4 2.064 15.408 15.408 0 00.84 3.372 2.4 2.4 0 01-.54 2.532l-1.524 1.524a19.2 19.2 0 007.2 7.2l1.524-1.524a2.4 2.4 0 012.532-.54 15.408 15.408 0 003.372.84 2.4 2.4 0 012.064 2.436z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShippingIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M8 28V16a2 2 0 012-2h18a2 2 0 012 2v12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 20h5.2a2 2 0 011.6.8l3.8 5.067V28a2 2 0 01-2 2h-1" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="14" cy="32" r="3" />
    <circle cx="34" cy="32" r="3" />
    <path d="M17 30h13M8 30h3" strokeLinecap="round" />
  </svg>
);

const YouTubeSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const EmailSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  const ease = [0.16, 1, 0.3, 1];

  return (
    <footer
      ref={footerRef}
      className="ks-footer"
    >
      {/* ══════ Top Info Bar ══════ */}
      <div className="ks-footer-info-bar">
        <div className="ks-footer-info-grid">
          {/* Returns */}
          <motion.div
            className="ks-footer-info-col"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div className="ks-footer-info-icon">
              <ReturnsIcon />
            </div>
            <h4 className="ks-footer-info-title">Returns</h4>
            <p className="ks-footer-info-text">
              Please read our{' '}
              <a href="#" className="ks-footer-link">Return &amp; Exchange Policy</a>{' '}
              before purchasing.
            </p>
          </motion.div>

          {/* Customer Support */}
          <motion.div
            className="ks-footer-info-col"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <div className="ks-footer-info-icon">
              <PhoneSupportIcon />
            </div>
            <h4 className="ks-footer-info-title">Customer Support</h4>
            <p className="ks-footer-info-text">
              Support hours: 12 PM – 6 PM<br />
              Monday to Saturday<br />
              +91 836-995-0066
            </p>
          </motion.div>

          {/* Shipping */}
          <motion.div
            className="ks-footer-info-col"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <div className="ks-footer-info-icon">
              <ShippingIcon />
            </div>
            <h4 className="ks-footer-info-title">Shipping</h4>
            <p className="ks-footer-info-text">
              Please review our{' '}
              <a href="#" className="ks-footer-link">Shipping Policy</a>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ══════ Footer Bottom ══════ */}
      <div className="ks-footer-bottom">
        <div className="ks-footer-bottom-grid">

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            <h5 className="ks-footer-col-title">Quick links</h5>
            <ul className="ks-footer-list">
              {['Contact Us', 'Returns and Refunds', 'Policies', 'Delivery', 'Press'].map((label) => (
                <li key={label}>
                  <a href="#" className="ks-footer-list-link">{label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <h5 className="ks-footer-col-title">Follow us</h5>
            <ul className="ks-footer-list">
              {[
                { icon: <YouTubeSmall />, label: 'YouTube' },
                { icon: <InstagramSmall />, label: 'Instagram' },
                { icon: <EmailSmall />, label: 'Email' },
                { icon: <PhoneSmall />, label: 'Phone' },
              ].map((item) => (
                <li key={item.label}>
                  <a href="#" className="ks-footer-social-link">
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Brand Logo — right column, right-aligned */}
          <motion.div
            className="ks-footer-brand-col"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease }}
          >
            <div className="ks-footer-brand-logo">
              <img
                src="/images/Black-logo.svg"
                alt="KNOWN STRANGERS"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Tagline */}
      <motion.div
        className="ks-footer-tagline"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p>Here every piece is made with love for loved ones</p>
      </motion.div>
    </footer>
  );
}
