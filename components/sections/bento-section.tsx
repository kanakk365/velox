'use client';
import dynamic from 'next/dynamic';

const MagicBento = dynamic(() => import('@/components/ui/magic-bento'), { ssr: false });

export function BentoSection() {
  return (
    <section className="relative w-full bg-[#07040f] py-24 lg:py-32 px-4 overflow-hidden">
      <div className="pointer-events-none absolute top-0 inset-x-0 z-10 h-32 bg-gradient-to-b from-[#07040f] via-[#07040f]/50 to-transparent" />
      <div
        className="pointer-events-none absolute top-0 inset-x-0 z-10 h-24 backdrop-blur-[4px]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)',
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-violet-600/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.08] px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
            <span className="font-cabin text-xs font-semibold uppercase tracking-widest text-violet-300/80">
              Features
            </span>
          </div>

          {/* Title */}
          <h2 className="font-instrument max-w-3xl text-4xl leading-[1.08] tracking-[-0.02em] text-white/90 lg:text-[64px]">
            Your entire content strategy,{' '}
            <em className="italic text-violet-300/80">on autopilot</em>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl font-inter text-base leading-relaxed text-white/40">
            From keyword to published post — AI handles the research, writing,
            and distribution while you focus on growing.
          </p>
        </div>

        {/* Bento grid */}
        <MagicBento
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={320}
          particleCount={10}
          glowColor="139, 92, 246"
        />
      </div>
    </section>
  );
}
