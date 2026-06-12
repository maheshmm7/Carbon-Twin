// src/components/aura/AuraReveal.tsx
'use client';
import { useEffect } from 'react';
import { m } from 'framer-motion';
import { useCarbonStore } from '@/store/carbon-store';
import { getAuraDefinition } from '@/lib/aura-definitions';
import AuraOrb from './AuraOrb';

/**
 * Cinematic 2-second visual reveal of the user's deterministic Carbon Aura.
 * Automatically advances to the 'life-replay' phase.
 */
export default function AuraReveal() {
  const twin = useCarbonStore((state) => state.twin);
  const advanceToLifeReplay = useCarbonStore((state) => state.advanceToLifeReplay);

  useEffect(() => {
    // Auto-advance to next phase after 2 seconds
    const timer = setTimeout(() => {
      advanceToLifeReplay();
    }, 2000);

    return () => clearTimeout(timer);
  }, [advanceToLifeReplay]);

  if (!twin) return null;

  const definition = getAuraDefinition(twin.aura);

  return (
    <div className="fixed inset-0 z-40 bg-bg-primary flex flex-col items-center justify-center overflow-hidden">
      {/* Background bleed gradient */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{
          background: `radial-gradient(circle, ${definition.glowColor} 0%, transparent 70%)`
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Scaling core orb */}
        <m.div
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 14,
            delay: 0.3
          }}
        >
          <AuraOrb aura={twin.aura} size="lg" />
        </m.div>

        {/* Aura Name Display */}
        <m.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-display font-extrabold tracking-wider mt-4"
          style={{
            background: `linear-gradient(135deg, ${definition.gradient[0]}, ${definition.gradient[1]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {definition.name.toUpperCase()}
        </m.h2>

        {/* Tagline */}
        <m.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.3, ease: 'easeOut' }}
          className="text-text-secondary text-lg md:text-xl font-medium"
        >
          &ldquo;{definition.tagline}&rdquo;
        </m.p>
      </div>
    </div>
  );
}
