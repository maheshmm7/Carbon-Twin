// src/components/quiz/QuestionCard.tsx
'use client';
// @ts-expect-error - experimental_useEffectEvent is not in @types/react by default
import { useEffect, experimental_useEffectEvent as useEffectEvent } from 'react';
import { m } from 'framer-motion';
import { QuizQuestion, QuizOption } from './questions';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptionValue?: string | number;
  onSelect: (option: QuizOption) => void;
}

/**
 * QuestionCard displays the active query alongside a list of large cards for selection.
 * Listens for key events (1-6) to support accessibility shortcuts.
 */
export default function QuestionCard({
  question,
  selectedOptionValue,
  onSelect
}: QuestionCardProps) {
  const onSelectEvent = useEffectEvent(onSelect);

  // Listen for keyboard number shortcuts (1-6) to make selections
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const num = parseInt(event.key, 10);
      if (!isNaN(num) && num >= 1 && num <= question.options.length) {
        const option = question.options[num - 1];
        if (option) {
          onSelectEvent(option);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      {/* Question Title */}
      <h3 className="text-xl md:text-2xl font-heading font-bold text-center text-text-primary leading-snug">
        {question.text}
      </h3>

      {/* Options Stack */}
      <m.div
        variants={{
          animate: { transition: { staggerChildren: 0.06 } }
        }}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-3"
      >
        {question.options.map((option, index) => {
          const isSelected = option.value === selectedOptionValue;

          return (
            <m.button
              key={option.value}
              variants={{
                initial: { opacity: 0, y: 15 },
                animate: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(option)}
              className={`w-full text-left p-4 rounded-xl flex items-center gap-4 border text-base outline-none cursor-pointer focus:ring-2 focus:ring-accent-sapphire transition-all duration-200 relative group ${
                isSelected
                  ? 'bg-accent-sapphire/20 border-accent-sapphire shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'bg-bg-surface/50 border-border-glass hover:bg-bg-surface/80 hover:border-white/15'
              }`}
              aria-checked={isSelected}
              role="radio"
            >
              {/* Keyboard Index Badge */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-text-secondary/40 group-hover:text-text-secondary/80 transition-colors hidden md:block">
                Press {index + 1}
              </span>

              {/* Option Icon */}
              <div 
                className="text-3xl w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5"
                aria-hidden="true"
              >
                {option.icon}
              </div>

              {/* Label & Description */}
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-text-primary text-sm md:text-base leading-tight">
                  {option.label}
                </span>
                <span className="text-xs md:text-sm text-text-secondary leading-snug">
                  {option.description}
                </span>
              </div>
            </m.button>
          );
        })}
      </m.div>
    </div>
  );
}
