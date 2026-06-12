// src/components/twin/TwinProfile.tsx
'use client';

import { useEffect, useState } from 'react';
import { useCarbonStore } from '@/store/carbon-store';
import { getAuraDefinition, getAuraColorWithAlpha } from '@/lib/aura-definitions';
import AuraOrb from '../aura/AuraOrb';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';

const BreakdownChart = dynamic(() => import('./BreakdownChart'), { ssr: false });
import { Leaf, Info, Settings, Trash2, ChevronDown } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion, QuizOption } from '../quiz/questions';

export default function TwinProfile() {
  const twin = useCarbonStore((state) => state.twin);
  const simulatedScore = useCarbonStore((state) => state.simulator.simulatedScore);
  const simulatedAura = useCarbonStore((state) => state.simulator.simulatedAura);
  const quizAnswers = useCarbonStore((state) => state.quizAnswers);
  const updateTwinAnswers = useCarbonStore((state) => state.updateTwinAnswers);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!twin) return null;

  const currentScore = simulatedScore > 0 ? simulatedScore : twin.score;
  const currentAura = simulatedScore > 0 ? simulatedAura : twin.aura;
  const auraDef = getAuraDefinition(currentAura);

  // Map breakdown data for Recharts
  const breakdownData = [
    { name: 'Transport', value: twin.breakdown.transport, color: '#3B82F6', icon: '🚗' },
    { name: 'Diet', value: twin.breakdown.diet, color: '#10B981', icon: '🥗' },
    { name: 'Energy', value: twin.breakdown.energy, color: '#F59E0B', icon: '⚡' },
    { name: 'Travel', value: twin.breakdown.travel, color: '#8B5CF6', icon: '✈️' },
    { name: 'Shopping', value: twin.breakdown.consumption, color: '#EC4899', icon: '🛍️' }
  ];

  // Benchmarks comparisons
  const benchmarks = [
    { label: 'Paris Target', value: 2.3, desc: 'Target for 1.5°C warming' },
    { label: 'Global Average', value: 4.7, desc: 'Per capita global emissions' },
    { label: 'Your Twin', value: currentScore, desc: 'Your current footprint', active: true },
    { label: 'US Average', value: 14.0, desc: 'Per capita US emissions' }
  ].sort((a, b) => a.value - b.value);

  return (
    <div 
      id="twin-profile"
      className="w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Aura Orb & Identity */}
        <div className="lg:col-span-5 flex flex-col items-center text-center p-6 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl">
          <div className="mb-6 relative">
            <AuraOrb aura={currentAura} size="lg" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-4xl" aria-hidden="true">
                {auraDef.emoji}
              </span>
            </div>
          </div>

          <m.div
            key={currentAura}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <span 
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border"
              style={{ 
                color: auraDef.glowColor, 
                borderColor: getAuraColorWithAlpha(auraDef.glowColor, 0.4),
                backgroundColor: getAuraColorWithAlpha(auraDef.glowColor, 0.1)
              }}
            >
              {auraDef.name}
            </span>

            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">
              &ldquo;{auraDef.tagline}&rdquo;
            </h2>

            <p className="text-sm text-neutral-400 max-w-sm">
              {twin.auraExplanation || auraDef.description}
            </p>
          </m.div>

          <div className="mt-8 pt-6 border-t border-white/5 w-full grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Annual Footprint</p>
              <p className="text-3xl font-black text-white mt-1">
                {currentScore.toFixed(1)}
                <span className="text-sm font-normal text-neutral-400 ml-1">t</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Rating</p>
              <p className="text-3xl font-black text-green-400 mt-1">
                {Math.round(Math.max(5, 100 - (currentScore * 5)))}
                <span className="text-sm font-normal text-neutral-400 ml-0.5">/100</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Breakdown Chart & Benchmarking */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Categorical Breakdown */}
          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-400" />
                Carbon Twin Breakdown
              </h3>
              <p className="text-xs text-neutral-400">Values in tonnes CO₂e/year</p>
            </div>

            <div className="relative h-64 w-full" style={{ minWidth: 0 }}>
              {mounted ? (
                <BreakdownChart data={breakdownData} />
              ) : (
                <div className="h-full flex items-center justify-center text-neutral-500">
                  Loading breakdown chart...
                </div>
              )}
            </div>

            {/* Custom Interactive Legend */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
              {breakdownData.map((item) => (
                <div 
                  key={item.name} 
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5"
                >
                  <span className="text-sm">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider truncate">{item.name}</p>
                    <p className="text-sm font-bold text-white">{item.value.toFixed(1)}t</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Benchmarks */}
          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              How You Compare
            </h3>

            <div className="space-y-4">
              {benchmarks.map((bench) => (
                <div key={bench.label} className="relative">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className={`font-semibold ${bench.active ? 'text-green-400 font-bold' : 'text-neutral-400'}`}>
                      {bench.label} {bench.active && '(You)'}
                    </span>
                    <span className={`font-bold ${bench.active ? 'text-green-400' : 'text-white'}`}>
                      {bench.value.toFixed(1)} t CO₂e
                    </span>
                  </div>
                  
                  {/* Progress bar line */}
                  <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        bench.active 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                          : bench.value <= 2.3 
                            ? 'bg-emerald-500/70' 
                            : bench.value <= 4.7 
                              ? 'bg-blue-500/70' 
                              : 'bg-red-500/70'
                      }`}
                      style={{ width: `${Math.min(100, (bench.value / 18) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{bench.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Baseline Twin Settings Inline Editor */}
          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" />
                Refine Baseline Twin
              </h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[9px] font-extrabold text-emerald-400 uppercase tracking-wider">
                Interactive
              </span>
            </div>
            
            <p className="text-xs text-neutral-400">
              Refine your baseline answers inline, or reset any category. Updates propagate instantly.
            </p>

            <div className="space-y-3 mt-2">
              {QUIZ_QUESTIONS.map((question) => {
                const currentAns = quizAnswers.find((a) => a.category === question.category);
                const currentVal = currentAns?.value;
                const currentOption = question.options.find((o) => o.value === currentVal);
                
                return (
                  <BaselineRow 
                    key={question.id} 
                    question={question} 
                    currentOption={currentOption}
                    onUpdate={(val) => updateTwinAnswers(question.category, val)}
                  />
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function BaselineRow({ question, currentOption, onUpdate }: {
  question: QuizQuestion;
  currentOption: QuizOption | undefined;
  onUpdate: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const cleanDefaults: Record<string, string> = {
    transport: 'remote',
    diet: 'vegan',
    energy: 'shared_low',
    travel: 'never',
    consumption: 'minimalist'
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultValue = cleanDefaults[question.category] || question.options[question.options.length - 1].value;
    onUpdate(defaultValue);
  };

  return (
    <div className="border border-white/5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] transition-all overflow-hidden">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl shrink-0" aria-hidden="true">
            {currentOption?.icon || '❓'}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
              {question.category}
            </p>
            <p className="text-xs font-bold text-white truncate">
              {currentOption?.label || 'Not answered'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {currentOption && currentOption.value !== cleanDefaults[question.category] && (
            <button
              type="button"
              onClick={handleReset}
              title="Reset category to lowest footprint"
              className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-neutral-400 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            className={`p-1.5 rounded-lg border border-white/5 bg-white/5 text-neutral-400 hover:text-white transition-all cursor-pointer ${
              isOpen ? 'rotate-180 text-white bg-white/10' : ''
            }`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-white/5 bg-black/20 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.options.map((option: QuizOption) => {
            const isSelected = option.value === currentOption?.value;
            return (
              <button
                type="button"
                key={option.value}
                onClick={() => {
                  onUpdate(option.value);
                  setIsOpen(false);
                }}
                className={`text-left p-3 rounded-xl border transition-all text-xs flex items-start gap-2.5 cursor-pointer ${
                  isSelected 
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-white font-bold' 
                    : 'border-white/5 bg-white/[0.01] hover:bg-white/5 text-neutral-300'
                }`}
              >
                <span className="text-lg shrink-0">{option.icon}</span>
                <div className="min-w-0">
                  <p className="font-bold text-[11px] truncate">{option.label}</p>
                  <p className="text-[9px] text-neutral-500 truncate mt-0.5">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
