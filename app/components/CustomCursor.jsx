'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [label, setLabel] = useState('');
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      // Dot follows immediately
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);
      cursor.style.left = `${pos.current.x}px`;
      cursor.style.top = `${pos.current.y}px`;
      requestAnimationFrame(animate);
    };

    const onEnter = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setHovering(true);
        setLabel(el.getAttribute('data-cursor') || '');
      }
    };

    const onLeave = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setHovering(false);
        setLabel('');
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    
    const raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor desktop-only ${hovering ? 'hovering' : ''}`}
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
      <div ref={dotRef} className="cursor-dot desktop-only" />
    </>
  );
}
