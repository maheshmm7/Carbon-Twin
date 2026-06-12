// src/components/comparison/GreenFuture.tsx
'use client';

import { useCarbonStore } from '@/store/carbon-store';
import { useShiftSimulator } from '@/hooks/useShiftSimulator';
import { m } from 'framer-motion';
import { TrendingDown, Heart, DollarSign, Leaf } from 'lucide-react';

export default function GreenFuture() {
  const twin = useCarbonStore((state) => state.twin);
  const { simulatedScore, baselineScore } = useShiftSimulator();

  if (!twin) return null;

  const gf = twin.greenFuture;

  // Let's estimate the dynamic savings from the simulator shifts!
  // If the simulator is active, let's show how closer they get to the Improved Future.
  const co2Difference = Math.max(0, baselineScore - simulatedScore);
  const percentageReduced = Math.round((co2Difference / Math.max(0.1, baselineScore)) * 100);

  // Financial savings proxy: let's say they save $400/year for every tonne of CO2 reduced
  const annualSavings = co2Difference * 400;
  const simulated5YrSavings = annualSavings * 5;

  return (
    <section 
      id="green-future"
      className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12"
      aria-label="Green Future Comparison"
    >
      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
              Green Future Projection
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Comparing your baseline trajectory against a realistic sustainable shift over 5 years.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Current Trajectory Card */}
          <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-6">
            <h4 className="text-lg font-bold text-red-400 flex items-center gap-2">
              <AlertDot /> Current Trajectory
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm text-neutral-400 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-red-400" /> 5-Year Carbon Outflow
                </span>
                <span className="text-lg font-bold text-white">{gf.currentFuture.co2_5yr.toFixed(1)} t</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm text-neutral-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-red-400" /> 5-Year Lifestyle Cost
                </span>
                <span className="text-lg font-bold text-white">${gf.currentFuture.cost_5yr.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" /> Health & Vitality Rating
                </span>
                <span className="text-lg font-bold text-white">{gf.currentFuture.healthScore}/100</span>
              </div>
            </div>
          </div>

          {/* Improved Trajectory Card */}
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-6">
            <h4 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <Leaf className="w-5 h-5" /> Optimized Target Path
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm text-neutral-400 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-400" /> 5-Year Carbon Outflow
                </span>
                <span className="text-lg font-bold text-white">{gf.improvedFuture.co2_5yr.toFixed(1)} t</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm text-neutral-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> 5-Year Lifestyle Cost
                </span>
                <span className="text-lg font-bold text-white">${gf.improvedFuture.cost_5yr.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-emerald-400" /> Health & Vitality Rating
                </span>
                <span className="text-lg font-bold text-white">{gf.improvedFuture.healthScore}/100</span>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Recalculated Saving from Simulator */}
        {percentageReduced > 0 && (
          <m.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
          >
            <div>
              <p className="text-sm font-semibold text-emerald-400">Your Simulator Habit Shift Results:</p>
              <p className="text-xs text-neutral-400 mt-1">
                By making these changes, you reduce your footprint by {percentageReduced}% and save money.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2 rounded-xl bg-white/5 text-center">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">5-Year Savings</p>
                <p className="text-lg font-extrabold text-white">${Math.round(simulated5YrSavings).toLocaleString()}</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 text-center">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">CO₂ Prevented</p>
                <p className="text-lg font-extrabold text-white">{(co2Difference * 5).toFixed(1)} t</p>
              </div>
            </div>
          </m.div>
        )}

      </div>
    </section>
  );
}

function AlertDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </span>
  );
}
