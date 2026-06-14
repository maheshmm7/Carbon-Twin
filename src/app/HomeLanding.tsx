// src/app/HomeLanding.tsx
'use client';
import { useEffect } from 'react';
import { LazyMotion, domMax, MotionConfig } from 'framer-motion';
import Hero from '@/components/landing/Hero';

export default function HomeLanding() {
  useEffect(() => {
    const cleanup = () => {
      const links = document.querySelectorAll('link');
      links.forEach((link) => {
        const href = link.href || '';
        if (href.includes('fonts.googleapis.com') || href.includes('fonts.gstatic.com')) {
          link.remove();
        }
      });
    };

    cleanup();

    // Set up MutationObserver to intercept late environment-injected tags
    const observer = new MutationObserver(() => {
      cleanup();
    });

    observer.observe(document.head, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <main className="min-h-screen relative bg-bg-primary overflow-x-hidden">
          <Hero />
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}
