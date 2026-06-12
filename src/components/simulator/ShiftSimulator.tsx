// src/components/simulator/ShiftSimulator.tsx
'use client';

import { useCarbonStore } from '@/store/carbon-store';
import { getAvailableShifts } from '@/lib/simulator-options';
import { getAuraDefinition } from '@/lib/aura-definitions';
import AuraOrb from '../aura/AuraOrb';
import { m } from 'framer-motion';
import { Sliders, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ShiftSimulator() {
  const twin = useCarbonStore((state) => state.twin);
  const quizAnswers = useCarbonStore((state) => state.quizAnswers);
  const simulator = useCarbonStore((state) => state.simulator);
  const toggleShift = useCarbonStore((state) => state.toggleShift);
  const resetSimulator = useCarbonStore((state) => state.resetSimulator);

  if (!twin) return null;

  // Generate available shifts for the user based on baseline
  const availableShifts = getAvailableShifts(quizAnswers, twin.breakdown);

  const activeAuraDef = getAuraDefinition(simulator.simulatedAura);
  const baselineAuraDef = getAuraDefinition(simulator.baselineAura);

  return (
    <section 
      id="shift-simulator"
      className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12"
      aria-label="Carbon Shift Simulator"
    >
      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              Carbon Shift Simulator
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Toggle sustainable habits to see your score, Aura, and trajectory shift instantly in real-time.
            </p>
          </div>
          
          {simulator.activeShifts.length > 0 && (
            <button
              type="button"
              onClick={resetSimulator}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Sandbox
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Shifts List */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Select Shifts to Try
            </h4>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {availableShifts.map((shift) => {
                const isEnabled = simulator.activeShifts.includes(shift.id);
                return (
                  <button
                    type="button"
                    key={shift.id}
                    onClick={() => toggleShift(shift.id)}
                    aria-pressed={isEnabled}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      isEnabled 
                        ? 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.05)]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl mt-1 shrink-0" role="img" aria-hidden="true">
                      {shift.icon}
                    </span>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-white text-sm truncate">
                          {shift.label}
                        </span>
                        
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                          shift.difficulty === 'hard' 
                            ? 'bg-red-500/10 text-red-400' 
                            : shift.difficulty === 'moderate' 
                              ? 'bg-yellow-500/10 text-yellow-400' 
                              : 'bg-green-500/10 text-green-400'
                        }`}>
                          {shift.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {shift.description}
                      </p>
                      
                      <p className="text-xs font-semibold text-emerald-400 mt-2">
                        -{shift.co2Reduction.toFixed(1)} t CO₂e/year
                      </p>
                    </div>

                    <div className="shrink-0 self-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isEnabled 
                          ? 'border-indigo-500 bg-indigo-500 text-white' 
                          : 'border-white/20'
                      }`}>
                        {isEnabled && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Live Preview Panel */}
          <div className="lg:col-span-5 flex flex-col items-center text-center p-6 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl relative overflow-hidden">
            
            {/* Live Aura Orb */}
            <div className="my-6 relative">
              <AuraOrb aura={simulator.simulatedAura} size="md" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-3xl" role="img" aria-label={simulator.simulatedAura}>
                  {activeAuraDef.emoji}
                </span>
              </div>
            </div>

            {/* Simulated Score */}
            <div className="space-y-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                Simulated Footprint
              </p>
              
              <div className="flex items-baseline justify-center gap-1">
                <m.span
                  key={simulator.simulatedScore}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl font-black text-white"
                >
                  {simulator.simulatedScore.toFixed(1)}
                </m.span>
                <span className="text-sm font-semibold text-neutral-400">tonnes/yr</span>
              </div>

              {simulator.totalReduction > 0 && (
                <m.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-semibold text-emerald-400"
                >
                  Saving -{simulator.totalReduction.toFixed(1)} t CO₂e per year!
                </m.div>
              )}
            </div>

            {/* Aura State Progression */}
            <div className="mt-8 pt-6 border-t border-white/5 w-full space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">Baseline Aura:</span>
                <span className="font-semibold text-white flex items-center gap-1">
                  {baselineAuraDef.emoji} {baselineAuraDef.name}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">Simulated Aura:</span>
                <span 
                  className="font-bold flex items-center gap-1 transition-colors duration-300"
                  style={{ color: activeAuraDef.glowColor }}
                >
                  {activeAuraDef.emoji} {activeAuraDef.name}
                </span>
              </div>

              {simulator.simulatedAura !== simulator.baselineAura && (
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs font-bold text-green-400 mt-2"
                >
                  🎉 Aura purified successfully!
                </m.div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
