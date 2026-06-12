// src/components/simulator/PurificationQuests.tsx
'use client';

import { useState } from 'react';
import { useCarbonStore } from '@/store/carbon-store';
import { m, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, CheckCircle, RefreshCw } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
}

export default function PurificationQuests() {
  const quests = useCarbonStore((state) => state.quests);
  const totalCarbonSavedKg = useCarbonStore((state) => state.totalCarbonSavedKg);
  const completeQuest = useCarbonStore((state) => state.completeQuest);
  const resetQuests = useCarbonStore((state) => state.resetQuests);

  const [particles, setParticles] = useState<Particle[]>([]);

  if (quests.length === 0) return null;

  const handleQuestToggle = (questId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger the store toggle
    completeQuest(questId);

    // Find the quest to check if it's being completed (not uncompleted)
    const quest = quests.find((q) => q.id === questId);
    if (quest && !quest.completed) {
      // Trigger particle explosion at the click coordinates
      const rect = event.currentTarget.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      const colors = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#60A5FA', '#F59E0B'];
      const newParticles = Array.from({ length: 24 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 160,
        y: (Math.random() - 0.5) * 160,
        originX,
        originY,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));

      setParticles((prev) => [...prev, ...newParticles]);
      // Clean up particles
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      }, 1000);
    }
  };

  const completedCount = quests.filter((q) => q.completed).length;
  const allCompleted = completedCount === quests.length;

  return (
    <section 
      id="purification-quests"
      className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12"
      aria-label="Aura Purification Quests"
    >
      {/* Particle Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((p) => (
          <m.div
            key={p.id}
            initial={{ opacity: 1, scale: 1.5, x: 0, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 0.2, 
              x: p.x, 
              y: p.y,
              rotate: 360
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ 
              position: 'fixed',
              left: `${p.originX}px`,
              top: `${p.originY}px`,
              backgroundColor: p.color,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              boxShadow: `0 0 10px ${p.color}`
            }}
          />
        ))}
      </div>

      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-400" />
              Aura Purification Quests
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Gamified daily challenges based on your footprint. Check off items you commit to or completed today to directly purify your digital twin.
            </p>
          </div>

          {completedCount > 0 && (
            <button
              type="button"
              onClick={resetQuests}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Quests
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Quests List */}
          <div className="lg:col-span-7 space-y-4">
            {quests.map((quest) => (
              <button
                type="button"
                key={quest.id}
                onClick={(e) => handleQuestToggle(quest.id, e)}
                aria-pressed={quest.completed}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                  quest.completed 
                    ? 'bg-green-500/10 border-green-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="text-3xl p-2 rounded-xl bg-white/5 shrink-0" role="img" aria-hidden="true">
                  {quest.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm truncate">
                      {quest.label}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-[9px] font-bold text-green-400 uppercase tracking-wider shrink-0">
                      -{quest.co2SavedKg.toFixed(1)} kg CO₂
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    {quest.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    quest.completed 
                      ? 'border-green-500 bg-green-500 text-white' 
                      : 'border-white/20'
                  }`}>
                    {quest.completed && <CheckCircle className="w-4 h-4" />}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Quest Progress Tracker Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl relative overflow-hidden">
            
            {/* Header / Icon */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  Purification Status
                </p>
                <h4 className="text-lg font-bold text-white mt-1">
                  Daily Progress
                </h4>
              </div>
              <Trophy className={`w-8 h-8 ${allCompleted ? 'text-yellow-400 animate-bounce' : 'text-neutral-600'}`} />
            </div>

            {/* Total score / percentage saved */}
            <div className="my-8 space-y-3">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">
                  {totalCarbonSavedKg.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-neutral-400">kg CO₂e saved</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${(completedCount / quests.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500">
                  <span>{completedCount} of {quests.length} completed</span>
                  <span>{Math.round((completedCount / quests.length) * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Quest Completion Alert */}
            <AnimatePresence mode="wait">
              {allCompleted ? (
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center"
                >
                  <p className="text-xs font-bold text-yellow-400">
                    🏆 Daily Quests Completed!
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Your digital twin is purer. Keep up these habits tomorrow!
                  </p>
                </m.div>
              ) : (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-neutral-400 text-center italic"
                >
                  Complete all 3 quests today to purify your Aura!
                </m.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
