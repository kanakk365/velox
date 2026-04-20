'use client';

import { WavePath } from '@/components/ui/wave-path';

export function CTASection() {
  return (
    <section
      id="cta"
      className="relative w-full bg-[#07040f] px-4 pb-32 lg:pb-48 overflow-hidden"
    >
      {/* Top fade from FAQ */}
      <div className="pointer-events-none absolute top-0 inset-x-0 z-10 h-32 bg-gradient-to-b from-[#07040f] via-[#07040f]/50 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/4 w-[900px] h-[400px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-500/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-5xl pt-24 lg:pt-32 flex flex-col items-center text-center">



        {/* Headline */}
        <h2 className="font-instrument text-5xl leading-[1.05] tracking-[-0.02em] text-white/90 lg:text-[80px] max-w-3xl">
          Your content,{' '}
          <em className="italic text-violet-300/80">always on.</em>
        </h2>

        {/* Subtext */}
        <p className="mt-6 font-inter text-base leading-relaxed text-white/40 max-w-md">
          Set it up in ten minutes. No content team, no scheduling headaches.
          Just fresh, on-brand posts across every channel — automatically.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button className="px-8 py-2 rounded-[10px] bg-primary text-primary-foreground font-cabin font-medium text-base hover:brightness-110 transition-all shadow-lg shadow-primary/25">
            Start Free Trial
          </button>
          <button className="px-8 py-2 rounded-[10px] border border-white/[0.08] bg-white/[0.03] text-white/70 font-cabin font-medium text-base hover:bg-white/[0.06] hover:border-violet-500/30 hover:text-white/90 transition-all">
            See It In Action
          </button>
        </div>

        {/* Wave divider */}
        <div className="mt-20 w-full flex flex-col items-center">
          <WavePath color="rgba(139,92,246,0.35)" />
        </div>
      </div>
    </section>
  );
}
