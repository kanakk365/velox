'use client';

import { useEffect, useRef, useState } from 'react';

const faqs = [
  {
    q: 'How does the AI know what to write?',
    a: 'You provide keywords, your brand voice, and target audience once. Our models then scrape trending topics in your niche and generate on-brand drafts tailored to each platform — blog, LinkedIn, Twitter, and more.',
  },
  {
    q: 'Which platforms do you support?',
    a: 'We currently support WordPress, Ghost, Twitter/X, LinkedIn, Instagram (captions), and any RSS-compatible blog. More platforms ship every month.',
  },
  {
    q: 'Do I have to approve every post before it goes live?',
    a: 'Your choice. Review mode queues every draft for your approval. Full-auto mode publishes on your defined schedule without any manual step. You can switch between modes at any time.',
  },
  {
    q: 'How is this different from ChatGPT or Jasper?',
    a: 'Those tools require you to prompt, copy, format, and publish manually for every piece. We handle the entire pipeline — research, drafting, scheduling, and distribution — automatically, end to end.',
  },
  {
    q: 'Is the content original and SEO-safe?',
    a: 'Yes. Every draft is generated fresh, never copy-pasted from sources. Our models follow your keyword strategy and structure content for search intent, readability, and entity coverage.',
  },
  {
    q: 'What happens if I don\'t like a draft?',
    a: 'Regenerate with one click, edit inline, or provide feedback and the model will adjust future drafts to match. Over time the output gets sharper as it learns your preferences.',
  },
  {
    q: 'Can I bring my existing content as a style reference?',
    a: 'Absolutely. Drop in a few sample posts during onboarding and the AI will extract your tone, vocabulary, and structure to use as a baseline for all future content.',
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.05]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between text-left gap-4"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3">
          <span className="font-cabin text-[10px] uppercase tracking-widest text-violet-400/50 shrink-0 mt-1">
            {String(index).padStart(2, '0')}
          </span>
          <h3 className="font-instrument text-lg text-white/90 leading-snug tracking-[-0.01em]">
            {q}
          </h3>
        </div>
        <span
          className={`shrink-0 flex items-center justify-center size-6 rounded-full border border-white/10 text-white/40 transition-all duration-300 group-hover:border-violet-500/40 group-hover:text-violet-300 ${
            open ? 'rotate-45 border-violet-500/40 text-violet-300' : ''
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          open ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pl-9 pr-2">
            <div className="h-px w-full bg-gradient-to-r from-violet-500/20 to-transparent mb-4" />
            <p className="font-inter text-sm leading-relaxed text-white/40">{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpiralBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const SIZE = 560;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = 600;
    const DOT = 1.6;
    const CENTER = SIZE / 2;
    const MAX_R = CENTER - 8;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', String(SIZE));
    svg.setAttribute('height', String(SIZE));
    svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);

    const defs = document.createElementNS(svgNS, 'defs');
    const grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', 'faqSpiral');
    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    grad.setAttribute('x1', '0%');
    grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y2', '100%');
    [['0%', '#a78bfa'], ['50%', '#7c3aed'], ['100%', '#c4b5fd']].forEach(([offset, color]) => {
      const stop = document.createElementNS(svgNS, 'stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-color', color);
      grad.appendChild(stop);
    });
    defs.appendChild(grad);
    svg.appendChild(defs);

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('cx', x.toFixed(3));
      c.setAttribute('cy', y.toFixed(3));
      c.setAttribute('r', String(DOT));
      c.setAttribute('fill', 'url(#faqSpiral)');
      c.setAttribute('opacity', '0.6');

      const animR = document.createElementNS(svgNS, 'animate');
      animR.setAttribute('attributeName', 'r');
      animR.setAttribute('values', `${DOT * 0.5};${DOT * 1.4};${DOT * 0.5}`);
      animR.setAttribute('dur', '3s');
      animR.setAttribute('begin', `${(frac * 3).toFixed(3)}s`);
      animR.setAttribute('repeatCount', 'indefinite');
      animR.setAttribute('calcMode', 'spline');
      animR.setAttribute('keySplines', '0.4 0 0.6 1;0.4 0 0.6 1');
      c.appendChild(animR);

      const animO = document.createElementNS(svgNS, 'animate');
      animO.setAttribute('attributeName', 'opacity');
      animO.setAttribute('values', '0.2;0.8;0.2');
      animO.setAttribute('dur', '3s');
      animO.setAttribute('begin', `${(frac * 3).toFixed(3)}s`);
      animO.setAttribute('repeatCount', 'indefinite');
      animO.setAttribute('calcMode', 'spline');
      animO.setAttribute('keySplines', '0.4 0 0.6 1;0.4 0 0.6 1');
      c.appendChild(animO);

      svg.appendChild(c);
    }

    ref.current.innerHTML = '';
    ref.current.appendChild(svg);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20"
      style={{
        maskImage: 'radial-gradient(circle at center, white 0%, rgba(255,255,255,0.15) 55%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(circle at center, white 0%, rgba(255,255,255,0.15) 55%, transparent 72%)',
      }}
    >
      <div ref={ref} />
    </div>
  );
}

export function FAQSection() {
  const [query, setQuery] = useState('');
  const filtered = query
    ? faqs.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase()))
    : faqs;

  return (
    <section
      id="faq"
      className="relative w-full bg-[#07040f] px-4 pb-24 lg:pb-30"
    >
      <div className="pointer-events-none absolute top-0 inset-x-0 z-10 h-32 bg-gradient-to-b from-[#07040f] via-[#07040f]/50 to-transparent" />

      <SpiralBackground />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-600/[0.05] blur-[130px]" />

      <div className="relative mx-auto max-w-3xl pt-20 lg:pt-28">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.08] px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
            <span className="font-cabin text-xs font-semibold uppercase tracking-widest text-violet-300/80">
              FAQ
            </span>
          </div>

          <h2 className="font-instrument text-4xl leading-[1.08] tracking-[-0.02em] text-white/90 lg:text-[56px]">
            Questions,{' '}
            <em className="italic text-violet-300/80">answered</em>
          </h2>

          <p className="mt-4 font-inter text-sm leading-relaxed text-white/40 max-w-sm">
            Everything you need to know about putting your content on autopilot.
          </p>

          <div className="mt-6 relative w-full max-w-xs">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 pr-9 font-inter text-sm text-white/70 placeholder:text-white/20 outline-none transition focus:border-violet-500/40 focus:bg-white/[0.05]"
            />
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/20"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i + 1} />
            ))
          ) : (
            <p className="text-center font-inter text-sm text-white/30 py-12">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 text-center">
          <p className="font-inter text-sm text-white/30">Still have questions?</p>
          <a
            href="mailto:hello@hubts.io"
            className="font-cabin text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
          >
            hello@hubts.io →
          </a>
        </div>
      </div>
    </section>
  );
}
