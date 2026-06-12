// src/components/landing/Hero.tsx
'use client';
import { m } from 'framer-motion';
import { useCarbonStore } from '@/store/carbon-store';
import DemoModeToggle from './DemoModeToggle';
import { 
  ChevronDown, 
  ShieldCheck, 
  Cpu, 
  BookOpen, 
  Scale, 
  CheckCircle2, 
  TrendingDown 
} from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Baseline Quiz',
    desc: 'Answer 5 high-impact questions covering diet, travel, and home energy. No complex spreadsheets needed.'
  },
  {
    num: '02',
    title: 'Aura Identity',
    desc: 'Meet your digital twin and see your Carbon Aura rating (Green to Crimson) based on Paris climate targets.'
  },
  {
    num: '03',
    title: 'Habit Sandbox',
    desc: 'Toggle commuting, diet, and flight habits. Witness simulated impacts instantly on your Twin.'
  },
  {
    num: '04',
    title: 'AI Carbon Coach',
    desc: 'Chat with your AI advisor to get custom action plans, localized suggestions, and tips.'
  }
];

const FACTORS = {
  transport: [
    { label: 'Petrol Car', factor: '0.17 kg / km', source: 'UK Defra 2024 avg petrol car' },
    { label: 'Electric Car', factor: '0.05 kg / km', source: 'UK Defra 2024 battery electric vehicle' },
    { label: 'Public Transit', factor: '0.07 kg / km', source: 'UK Defra 2024 national rail & bus average' },
    { label: 'Bike / Walk', factor: '0.00 kg / km', source: 'Zero direct combustion emissions' }
  ],
  diet: [
    { label: 'Beef / Lamb Meal', factor: '6.60 kg / meal', source: 'Poore & Nemecek 2018, ruminant meat LCA' },
    { label: 'Poultry / Pork Meal', factor: '1.80 kg / meal', source: 'Poore & Nemecek 2018, poultry serving' },
    { label: 'Vegetarian Meal', factor: '0.90 kg / meal', source: 'Poore & Nemecek 2018, vegetarian serving' },
    { label: 'Vegan Meal', factor: '0.70 kg / meal', source: 'Poore & Nemecek 2018, vegan serving' }
  ]
};

const PRINCIPLES = [
  {
    title: 'Deterministic Core',
    desc: 'All emissions calculations and simulator outputs use pure, unit-tested functions. The AI layer only narrates—it never invents figures.',
    icon: Cpu
  },
  {
    title: 'Privacy by Design',
    desc: 'Your quiz choices and simulation states are stored locally in your browser. No accounts, no analytics, no third-party tracking.',
    icon: ShieldCheck
  },
  {
    title: 'Aura Boundaries',
    desc: 'Footprints are color-themed from Green to Crimson based on scientific limits, anchored to the Paris Agreement 1.5°C threshold.',
    icon: Scale
  },
  {
    title: 'Educational Scope',
    desc: 'Calculations represent educational estimates using public averages, providing actionable feedback rather than a certified audit.',
    icon: BookOpen
  }
];

export default function Hero() {
  const setPhase = useCarbonStore((state) => state.setPhase);
  const twin = useCarbonStore((state) => state.twin);

  return (
    <div className="w-full flex flex-col items-center bg-mesh">
      
      {/* Top Floating Header */}
      <header className="w-full max-w-5xl px-6 py-5 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black bg-gradient-to-r from-accent-green via-accent-sapphire to-accent-emerald bg-clip-text text-transparent uppercase tracking-wider">
            Carbon Twin AI™
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-text-secondary">
          <a href="#why-twin" className="hover:text-white transition-colors">Why Twin?</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
          <a href="#principles" className="hover:text-white transition-colors">Principles</a>
        </nav>
        <button
          type="button"
          onClick={() => setPhase(twin ? 'results' : 'quiz')}
          className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 text-xs font-bold transition-all border border-white/5 cursor-pointer"
        >
          {twin ? 'Go to Dashboard' : 'Launch Twin'}
        </button>
      </header>

      {/* Main Hero Fold */}
      <div className="w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative">
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
            className="flex flex-col gap-4 items-center mt-4 w-full"
          >
            {twin ? (
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                <button
                  type="button"
                  onClick={() => setPhase('results')}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-green to-accent-sapphire hover:brightness-110 text-white font-semibold text-lg cursor-pointer outline-none focus:ring-2 focus:ring-accent-sapphire active:scale-98 transition-all shadow-[0_0_20px_rgba(34,197,94,0.25)] border border-white/10"
                >
                  Return to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setPhase('quiz')}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base cursor-pointer outline-none border border-white/10"
                >
                  Retake Quiz
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPhase('quiz')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-green to-accent-sapphire hover:brightness-110 text-white font-semibold text-lg cursor-pointer outline-none focus:ring-2 focus:ring-accent-sapphire active:scale-98 transition-all shadow-[0_0_20px_rgba(34,197,94,0.25)] border border-white/10"
              >
                Begin Your Journey
              </button>
            )}

            {/* Demo Link for Judges */}
            <DemoModeToggle />
          </m.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 flex flex-col items-center gap-1.5 animate-smooth-bounce">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </div>
      </div>

      <WhyTwin />
      <HowItWorks />
      <Methodology />
      <Principles />
      <Footer />

    </div>
  );
}

function WhyTwin() {
  return (
    <section id="why-twin" className="w-full max-w-5xl py-24 px-6 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <m.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="p-2.5 w-fit rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            What is a <span className="bg-gradient-to-r from-accent-green to-accent-emerald bg-clip-text text-transparent">Carbon Twin</span>?
          </h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            Just as engineers use <strong>digital twins</strong> to monitor, analyze, and optimize jet engines, building systems, or whole cities, <strong>Carbon Twin AI</strong> creates a digital clone of your environmental footprint.
          </p>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            By mapping your daily choices—how you commute, your dietary mix, your flight patterns, and utility bills—into this virtual twin model, you receive a dynamic visual counterpart representing your planetary consumption. You can then run safe "what-if" simulations in our Sandbox before making adjustments in real life.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl flex flex-col justify-center gap-6 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full filter blur-3xl -z-10" />
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs md:text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-white font-semibold">Interactive Habit Simulator Sandbox</span>
            </div>
            <div className="flex items-center gap-3 text-xs md:text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-white font-semibold">Dynamic Carbon Aura Theme Engine</span>
            </div>
            <div className="flex items-center gap-3 text-xs md:text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-white font-semibold">Auditable, Documented Greenhouse Gas Metrics</span>
            </div>
            <div className="flex items-center gap-3 text-xs md:text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-white font-semibold">Context-Aware AI Sustainability Guidance</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-indigo-200 leading-relaxed">
            💡 <strong>Paris Agreement Alignment:</strong> An average global citizen emits 4.7 tonnes of CO₂e per year, while the Paris climate target requires us to reach a sustainable threshold of 2.3 tonnes or less.
          </div>
        </m.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full max-w-5xl py-24 px-6 border-t border-white/5">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          How Your Journey Unfolds
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Carbon Twin AI translates basic inputs into highly optimized simulation profiles in four easy steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {STEPS.map((step, idx) => (
          <m.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-neutral-900/30 border border-white/5 backdrop-blur-md flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-4xl font-black bg-gradient-to-r from-accent-green to-accent-sapphire bg-clip-text text-transparent">
                {step.num}
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">{step.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section id="methodology" className="w-full max-w-5xl py-24 px-6 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="p-2.5 w-fit rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Deterministic, Legit Methodology
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            We believe footprint modeling must be audit-ready and fully transparent. Every figure generated by Carbon Twin AI is calculated using reproducible math mapped directly to public science datasets.
          </p>
          
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
            <span>emissions (t CO₂e) = quantity × factor[activity]</span>
          </div>

          <div className="space-y-4 text-xs text-text-secondary">
            <div className="flex gap-3 items-start">
              <span className="text-emerald-400 font-bold">✓</span>
              <p><strong>UK Defra (2024):</strong> Official commuter emission factors covering average petrol, hybrid, EV vehicles, and rail passes.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-emerald-400 font-bold">✓</span>
              <p><strong>Poore & Nemecek (2018):</strong> Comprehensive food Life Cycle Assessment (LCA) published in <em>Science</em> covering ruminant meats, poultry, dairy, and crops.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-emerald-400 font-bold">✓</span>
              <p><strong>IEA (2024) & EPA:</strong> Grid intensity metrics for electricity consumption and heating fuels.</p>
            </div>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              Key Emission Factors Used
            </h3>
            
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold text-neutral-400 mb-2">Transportation</h4>
                <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden text-xs bg-black/20">
                  {FACTORS.transport.map((f) => (
                    <div key={f.label} className="p-3.5 flex justify-between gap-4 items-center">
                      <span className="text-white font-semibold">{f.label}</span>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold font-mono">{f.factor}</span>
                        <p className="text-[10px] text-neutral-500 mt-0.5">{f.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-neutral-400 mb-2">Dietary (per meal serving)</h4>
                <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden text-xs bg-black/20">
                  {FACTORS.diet.map((f) => (
                    <div key={f.label} className="p-3.5 flex justify-between gap-4 items-center">
                      <span className="text-white font-semibold">{f.label}</span>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold font-mono">{f.factor}</span>
                        <p className="text-[10px] text-neutral-500 mt-0.5">{f.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </m.div>

      </div>
    </section>
  );
}

function Principles() {
  return (
    <section id="principles" className="w-full max-w-5xl py-24 px-6 border-t border-white/5">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Our Core Principles
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Carbon Twin AI is designed for privacy, auditability, accessibility, and science.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRINCIPLES.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="p-6 rounded-3xl bg-neutral-900/30 border border-white/5 backdrop-blur-md flex gap-4 items-start">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full max-w-5xl py-12 px-6 border-t border-white/5 text-center space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <span>© 2026 Carbon Twin AI™. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#why-twin" className="hover:text-white transition-colors">Why Twin?</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
        </div>
      </div>
      <p className="text-[10px] text-neutral-600 max-w-xl mx-auto leading-relaxed">
        Disclaimer: Carbon Twin AI provides educational estimates based on regional and global emission averages. It does not constitute a certified environmental audit. All user data remains locally inside the browser.
      </p>
    </footer>
  );
}
