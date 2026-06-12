// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useCarbonStore } from '@/store/carbon-store';
import Hero from '@/components/landing/Hero';
import QuizContainer from '@/components/quiz/QuizContainer';
import LoadingState from '@/components/ui/LoadingState';
import AuraReveal from '@/components/aura/AuraReveal';
import LifeReplay from '@/components/replay/LifeReplay';
import SkipIntroButton from '@/components/intro/SkipIntroButton';
import { AnimatePresence, LazyMotion, domMax, MotionConfig, m } from 'framer-motion';
import { LayoutDashboard, Sliders, MessageSquare, Globe, Share2, RefreshCw, Settings } from 'lucide-react';
import ProfileSettings from '@/components/profile/ProfileSettings';

// Phase 2 Dashboard Sections
import HeroSummaryZone from '@/components/dashboard/HeroSummaryZone';
import TwinProfile from '@/components/twin/TwinProfile';
import TimelineEngine from '@/components/timeline/TimelineEngine';
import EarthConsequence from '@/components/consequence/EarthConsequence';
import ActionCenter from '@/components/simulator/ActionCenter';
import AICoach from '@/components/coach/AICoach';
import ShareCard from '@/components/share/ShareCard';

/**
 * Single-Page Application Entry point for Carbon Twin AI™.
 * Switches viewport components dynamically according to useCarbonStore.phase.
 */
export default function Home() {
  const phase = useCarbonStore((state) => state.phase);
  const reset = useCarbonStore((state) => state.reset);
  const [activeTab, setActiveTab] = useState<'overview' | 'sandbox' | 'coach' | 'impacts' | 'share' | 'profile'>('overview');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      // Trigger hydration re-render
      useCarbonStore.persist.rehydrate();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    // Avoid SSR hydration warning, render black screen while hydrating store
    return <main className="min-h-screen bg-bg-primary" />;
  }

  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <main className="min-h-screen relative bg-bg-primary overflow-x-hidden flex flex-col justify-between">
          {/* Global Skip Intro overlay button */}
          <SkipIntroButton />

          <div className="flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {phase === 'landing' && (
                <m.div
                  key="landing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Hero />
                </m.div>
              )}

              {phase === 'quiz' && (
                <m.div
                  key="quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <QuizContainer />
                </m.div>
              )}

              {phase === 'generating' && (
                <m.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <LoadingState />
                </m.div>
              )}

              {phase === 'aura-reveal' && (
                <m.div
                  key="aura-reveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <AuraReveal />
                </m.div>
              )}

              {phase === 'life-replay' && (
                <m.div
                  key="life-replay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <LifeReplay />
                </m.div>
              )}

              {phase === 'results' && (
                <m.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full min-h-screen flex flex-col md:flex-row text-white bg-bg-primary"
                >
                  {/* Left Sidebar Navigation */}
                  <aside className="w-64 bg-neutral-950 border-r border-white/5 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
                    <div className="space-y-8">
                      {/* Logo / Title */}
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-indigo-400 bg-clip-text text-transparent">
                          Carbon Twin AI™
                        </span>
                      </div>

                      {/* Nav Links */}
                      <nav className="flex flex-col gap-2">
                        {[
                          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                          { id: 'sandbox', label: 'Habit Sandbox', icon: Sliders },
                          { id: 'coach', label: 'AI Coach', icon: MessageSquare },
                          { id: 'impacts', label: 'Earth Impact', icon: Globe },
                          { id: 'share', label: 'Print ID Card', icon: Share2 },
                          { id: 'profile', label: 'Twin Settings', icon: Settings }
                        ].map((tab) => {
                          const Icon = tab.icon;
                          const isActive = activeTab === tab.id;
                          return (
                            <button
                              type="button"
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id as 'overview' | 'sandbox' | 'coach' | 'impacts' | 'share' | 'profile')}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-white/10 text-white border border-white/10'
                                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                              }`}
                            >
                              <Icon className={`w-4 h-4 ${isActive ? 'text-green-400' : 'text-neutral-500'}`} />
                              {tab.label}
                            </button>
                          );
                        })}
                      </nav>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-6 border-t border-white/5">
                      <button
                        type="button"
                        onClick={reset}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Restart Journey
                      </button>
                    </div>
                  </aside>

                  {/* Mobile Header and Floating Mobile Menu */}
                  <div className="flex-grow flex flex-col min-w-0">
                    {/* Mobile top bar */}
                    <header className="md:hidden w-full bg-neutral-950 border-b border-white/5 py-4 px-6 flex items-center justify-between z-30">
                      <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-indigo-400 bg-clip-text text-transparent">
                        Carbon Twin AI™
                      </span>
                      <button
                        type="button"
                        onClick={reset}
                        className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-bold transition-all cursor-pointer"
                      >
                        Restart
                      </button>
                    </header>

                    {/* Mobile tabs row */}
                    <nav className="md:hidden flex overflow-x-auto border-b border-white/5 bg-neutral-950/60 backdrop-blur-md sticky top-0 z-20">
                      {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'sandbox', label: 'Sandbox', icon: Sliders },
                        { id: 'coach', label: 'Coach', icon: MessageSquare },
                        { id: 'impacts', label: 'Impacts', icon: Globe },
                        { id: 'share', label: 'Print ID', icon: Share2 },
                        { id: 'profile', label: 'Settings', icon: Settings }
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            type="button"
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'overview' | 'sandbox' | 'coach' | 'impacts' | 'share' | 'profile')}
                            className={`flex-1 min-w-[70px] flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-all cursor-pointer ${
                              isActive ? 'text-green-400 border-b-2 border-green-500 bg-white/5' : 'text-neutral-400'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </nav>

                    {/* Content Area */}
                    <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-6xl w-full mx-auto space-y-6">
                      
                      {activeTab === 'overview' && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          <HeroSummaryZone />
                          <div className="space-y-6">
                            <TwinProfile />
                            <TimelineEngine />
                          </div>
                        </m.div>
                      )}

                      {activeTab === 'sandbox' && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-2xl mx-auto w-full"
                        >
                          <ActionCenter />
                        </m.div>
                      )}

                      {activeTab === 'coach' && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-4xl mx-auto w-full"
                        >
                          <AICoach />
                        </m.div>
                      )}

                      {activeTab === 'impacts' && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-4xl mx-auto w-full"
                        >
                          <EarthConsequence />
                        </m.div>
                      )}

                      {activeTab === 'share' && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-2xl mx-auto w-full"
                        >
                          <ShareCard />
                        </m.div>
                      )}

                      {activeTab === 'profile' && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-4xl mx-auto w-full"
                        >
                          <ProfileSettings />
                        </m.div>
                      )}

                    </main>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}
