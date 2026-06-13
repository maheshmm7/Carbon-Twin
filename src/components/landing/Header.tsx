// src/components/landing/Header.tsx
'use client';
import Link from 'next/link';
import { useCarbonStore } from '@/store/carbon-store';

export default function Header() {
  const twin = useCarbonStore((state) => state.twin);

  return (
    <header className="w-full max-w-5xl px-6 py-5 flex items-center justify-between z-20">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-lg font-black bg-gradient-to-r from-accent-green via-accent-sapphire to-accent-emerald bg-clip-text text-transparent uppercase tracking-wider cursor-pointer">
          Carbon Twin AI<sup className="text-[10px] font-black ml-0.5 select-none text-accent-emerald align-super tracking-normal">TM</sup>
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-text-secondary">
        <Link href="/about" className="hover:text-white transition-colors cursor-pointer">About</Link>
        <Link href="/science" className="hover:text-white transition-colors cursor-pointer">Science</Link>
      </nav>
      <Link
        href="/app"
        className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 text-xs font-bold transition-all border border-white/5 cursor-pointer"
      >
        {twin ? 'Go to Dashboard' : 'Launch Twin'}
      </Link>
    </header>
  );
}
