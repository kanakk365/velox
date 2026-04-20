'use client';

import type { ReactNode } from 'react';
import { PlugZap, KeyRound, BrainCircuit, Rocket } from 'lucide-react';

interface StepCardProps {
  icon: ReactNode;
  number: number;
  title: string;
  description: string;
  stickyTop: string;
}

function StepCard({ icon, number, title, description, stickyTop }: StepCardProps) {
  return (
    <div
      className="group relative lg:sticky rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
      style={{ top: stickyTop }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-violet-500/10 p-2 ring-8 ring-violet-500/5">
            {icon}
          </div>
        </div>
        <span className="font-instrument text-7xl leading-none text-white/5 transition-colors duration-300 group-hover:text-white/10 select-none">
          {number < 10 ? `0${number}` : number}
        </span>
      </div>

      <div className="relative">
        <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/10 to-transparent" />
        <h3 className="font-instrument text-2xl text-white/90 leading-snug tracking-[-0.01em] mb-2">
          {title}
        </h3>
        <p className="font-inter text-sm leading-relaxed text-white/40">
          {description}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
        <span className="font-cabin text-[10px] uppercase tracking-widest text-violet-400/50">
          Step {number}
        </span>
      </div>
    </div>
  );
}

const steps = [
  {
    icon: <PlugZap className="text-violet-400" width={20} height={20} />,
    title: 'Connect Your Channels',
    description:
      'Link your blog, Twitter, LinkedIn, and other platforms in minutes with OAuth. No developer setup required.',
    stickyTop: '13rem',
  },
  {
    icon: <KeyRound className="text-violet-400" width={20} height={20} />,
    title: 'Drop In Your Keywords',
    description:
      'Tell us your topics, brand voice, and target audience. That\'s all the input we need to get started.',
    stickyTop: '14rem',
  },
  {
    icon: <BrainCircuit className="text-violet-400" width={20} height={20} />,
    title: 'AI Drafts Your Content',
    description:
      'Our models scrape trending data, write on-brand posts and articles, and queue them for review.',
    stickyTop: '15rem',
  },
  {
    icon: <Rocket className="text-violet-400" width={20} height={20} />,
    title: 'Publish on Autopilot',
    description:
      'Approve with one click or let full-auto mode handle it. Content goes live on schedule, every time.',
    stickyTop: '16rem',
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#07040f] px-4 pb-24 lg:pb-40"
    >
      <div className="pointer-events-none absolute top-0 inset-x-0 z-10 h-32 bg-gradient-to-b from-[#07040f] via-[#07040f]/50 to-transparent" />
      <div
        className="pointer-events-none absolute top-0 inset-x-0 z-10 h-24 backdrop-blur-[4px]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)',
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl pt-10 lg:pt-14">
        <div className="grid lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="lg:sticky lg:top-52 flex flex-col items-start text-center lg:text-left mb-12 lg:mb-0 pl-20 ">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.08] px-3.5 py-1.5">
                <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
                <span className="font-cabin text-xs font-semibold uppercase tracking-widest text-violet-300/80">
                  How It Works
                </span>
              </div>

              <h2 className="font-instrument text-5xl leading-[1.06] tracking-[-0.02em] text-white/90 lg:text-[68px] max-w-sm">
                From idea to{' '}
                <em className="italic text-violet-300/80">published</em>
              </h2>

              <p className="mt-5 font-inter text-sm leading-relaxed text-white/40 max-w-xs">
                No content team. No scheduling headaches. Just set it up once and
                watch your channels stay active, always.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:gap-[14rem]">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                icon={step.icon}
                number={index + 1}
                title={step.title}
                description={step.description}
                stickyTop={step.stickyTop}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
