// src/components/landing/Hero.tsx
'use client';
import { m } from 'framer-motion';
import { useCarbonStore } from '@/store/carbon-store';
import DemoModeToggle from './DemoModeToggle';

/**
 * Landing page hero component. Provides the primary entry point to the quiz.
 */
export default function Hero() {
  const setPhase = useCarbonStore((state) => state.setPhase);

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative bg-mesh">
      
      <div className="max-w-3xl flex flex-col gap-6 items-center z-10">
        
        {/* Main Title */}
        <m.h1
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-none"
        >
          Meet Your{' '}
          <span className="bg-gradient-to-r from-accent-green via-accent-sapphire to-accent-emerald bg-clip-text text-transparent">
            Carbon Twin
          </span>
        </m.h1>

        {/* Subtitle */}
        <m.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
        >
          Discover your environmental identity, witness your timeline, and test habit shifts in a live sandbox.
        </m.p>

        {/* Action Button & Demo Link */}
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col gap-4 items-center mt-4"
        >
          {/* Main CTA */}
          <button
            type="button"
            onClick={() => setPhase('quiz')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-green to-accent-sapphire hover:brightness-110 text-white font-semibold text-lg cursor-pointer outline-none focus:ring-2 focus:ring-accent-sapphire active:scale-98 transition-all shadow-[0_0_20px_rgba(34,197,94,0.25)] border border-white/10"
          >
            Begin Your Journey
          </button>

          {/* Demo Link for Judges */}
          <DemoModeToggle />
        </m.div>

      </div>
      
    </div>
  );
}
