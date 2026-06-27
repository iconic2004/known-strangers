'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const productRows = [
  {
    id: 'known-by-fashion-tee',
    name: 'KNOWN BY FASHION TEE',
    price: 'INR 999',
    image: '/images/black-fashion-tee.png',
    bgClass: 'product-card-light',
  },
  {
    id: 'trapped-in-her-eyes-tee',
    name: 'TRAPPED IN HER EYES TEE',
    price: 'INR 1,200',
    image: '/images/grey-eyes-tee.png',
    bgClass: 'product-card-light',
  },
];

export default function ProductListing() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="product-listing-section"
      id="product-listing"
    >
      <div className="product-listing-container">
        {/* Filter Icon */}
        <div className="product-listing-filter">
          <button className="filter-icon-btn" aria-label="Filter products">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </button>
        </div>
        {/* Row 1: Black oversized tees */}
        <ProductRow
          product={productRows[0]}
          isInView={sectionInView}
          delayOffset={0}
        />

        {/* Row 2: Grey graphic tees */}
        <ProductRow
          product={productRows[1]}
          isInView={sectionInView}
          delayOffset={0.15}
        />

        {/* CTA Button */}
        <motion.div
          className="product-listing-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="#chapters" className="view-all-btn" data-cursor="SHOP">
            <span>VIEW ALL PRODUCTS</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProductRow({ product, isInView, delayOffset }) {
  return (
    <div className="product-row">
      {[0, 1, 2, 3].map((colIndex) => (
        <motion.div
          key={`${product.id}-${colIndex}`}
          className="product-card"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: delayOffset + colIndex * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          data-cursor="VIEW"
        >
          <Link href={`/product/${product.id}`} className="product-card-link">
            {/* Product Image */}
            <div className="product-card-image-wrapper">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="product-card-image"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
              />
            </div>

            {/* Product Info */}
            <div className="product-card-info">
              <h3 className="product-card-name">{product.name}</h3>
              <p className="product-card-price">{product.price}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
