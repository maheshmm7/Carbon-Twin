// src/components/ui/LoadingState.tsx
'use client';
import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const STATUS_MESSAGES = [
  'Initializing your digital twin...',
  'Calculating deterministic carbon footprints...',
  'Analyzing transport and diet factors...',
  'Consulting regional benchmarks...',
  'Composing your personalized Life Replay...',
  'Drafting recommendations from our coach...'
];

/**
 * A full-screen overlay that displays a premium glassmorphic loader.
 * Cycles through status updates while the twin is generating.
 */
export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-bg-primary flex flex-col items-center justify-center p-4">
      {/* Mesh Background Overlay */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />

      <div className="glass-card max-w-sm w-full p-8 flex flex-col items-center gap-6 relative z-10">
        
        {/* Animated Spin Ring */}
        <div className="relative w-16 h-16">
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full rounded-full border-4 border-white/5 border-t-accent-sapphire"
          />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-accent-green animate-[spin_3s_linear_infinite]" />
        </div>

        {/* Header Text */}
        <div className="text-center flex flex-col gap-1.5 w-full">
          <h3 className="text-lg font-bold text-text-primary tracking-wide">
            Generating Carbon Twin
          </h3>
          
          {/* Cycling messages */}
          <div className="h-6 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <m.span
                key={msgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-text-secondary"
              >
                {STATUS_MESSAGES[msgIndex]}
              </m.span>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
