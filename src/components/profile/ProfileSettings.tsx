// src/components/profile/ProfileSettings.tsx
'use client';

import { useCarbonStore } from '@/store/carbon-store';
import { getAuraDefinition, getAuraColorWithAlpha } from '@/lib/aura-definitions';
import { QUIZ_QUESTIONS } from '../quiz/questions';
import { UserCheck, AlertCircle } from 'lucide-react';

export default function ProfileSettings() {
  const twin = useCarbonStore((state) => state.twin);
  const quizAnswers = useCarbonStore((state) => state.quizAnswers);
  const updateTwinAnswers = useCarbonStore((state) => state.updateTwinAnswers);

  if (!twin) return null;

  const auraDef = getAuraDefinition(twin.aura);

  return (
    <div className="w-full space-y-6">
      
      {/* Header Info */}
      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Baseline Twin Settings
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[9px] font-extrabold text-emerald-400 uppercase tracking-wider">
                Editable
              </span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Refine your baseline settings inline. Any changes will instantly recalculate your footprint, Aura, and projections.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs text-neutral-400 leading-normal">
          <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p>
            Adjusting these answers updates your <span className="font-semibold text-white">baseline lifestyle</span>. 
            If you want to simulate temporary habit shifts (like a sandbox test), use the <span className="font-semibold text-white">Habit Sandbox</span> tab instead.
          </p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((question, qIdx) => {
          const currentAnswer = quizAnswers.find((a) => a.category === question.category)?.value;

          return (
            <div 
              key={question.id}
              className="p-6 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl space-y-4"
            >
              <div>
                <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest">
                  Category 0{qIdx + 1} | {question.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  {question.text}
                </h4>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((option) => {
                  const isSelected = currentAnswer === option.value;
                  return (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => updateTwinAnswers(question.category, option.value)}
                      aria-pressed={isSelected}
                      className="w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500/50 hover:scale-[1.01]"
                      style={{
                        borderColor: isSelected 
                          ? getAuraColorWithAlpha(auraDef.glowColor, 0.4) 
                          : 'rgba(255,255,255,0.05)',
                        backgroundColor: isSelected 
                          ? getAuraColorWithAlpha(auraDef.glowColor, 0.1) 
                          : 'rgba(255,255,255,0.02)'
                      }}
                    >
                      <span className="text-2xl mt-0.5 shrink-0" role="img" aria-hidden="true">
                        {option.icon}
                      </span>
                      
                      <div className="flex-1 min-w-0">
                        <span className={`font-bold text-xs ${isSelected ? 'text-white font-extrabold' : 'text-neutral-300'}`}>
                          {option.label}
                        </span>
                        <p className="text-[10px] text-neutral-500 mt-0.5 leading-relaxed truncate">
                          {option.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div 
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{
                            backgroundColor: auraDef.glowColor,
                            color: '#000000'
                          }}
                        >
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
