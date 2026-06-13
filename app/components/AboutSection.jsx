'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const panels = [
  {
    num: '01',
    title: 'The Origin',
    text: 'We didn\'t start in a studio. We started on the platforms of Dadar, in the midnight cafes of Bandra, in the endless flow of people where everyone is together but completely alone.',
  },
  {
    num: '02',
    title: 'The Philosophy',
    text: 'Every garment is a tribute to the stranger. Designed not to scream for attention, but to be recognized by those who know. High quality, heavy weight, silent presence.',
  },
  {
    num: '03',
    title: 'The Community',
    text: 'We are a collective of outsiders. The creatives, the night-shifters, the observers. We don\'t need to know your name to know you belong here.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const panelsRef = useRef(null);
  
  const headlineInView = useInView(headlineRef, { once: true, margin: '-100px' });
  const panelsInView = useInView(panelsRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6 md:px-10 lg:px-16"
      style={{ background: 'var(--color-bg)' }}
      id="about"
    >
      <div className="max-w-[1400px] mx-auto">
        <div ref={headlineRef} className="max-w-[900px] mb-20 md:mb-32">
          {['Born among millions.', 'Made for individuals.'].map((line, i) => (
            <span key={i} className="block overflow-hidden mb-2">
              <motion.span
                className="block text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.1] text-[var(--color-text)] tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
                initial={{ y: '110%' }}
                animate={headlineInView ? { y: '0%' } : {}}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </div>

        <div ref={panelsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {panels.map((panel, i) => (
            <motion.div
              key={panel.num}
              className="relative border-t border-[var(--color-border)] pt-8 md:pt-10"
              initial={{ opacity: 0, y: 40 }}
              animate={panelsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div 
                className="text-[2rem] md:text-[2.5rem] font-light mb-6 opacity-30"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                {panel.num}
              </div>
              <h3 
                className="text-[1.2rem] md:text-[1.3rem] font-medium tracking-[0.05em] mb-4 text-[var(--color-text)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {panel.title}
              </h3>
              <p 
                className="text-[0.8rem] md:text-[0.85rem] font-light leading-[1.8] max-w-[320px]"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
              >
                {panel.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
