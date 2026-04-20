'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  Sparkles, Globe, Zap, BarChart2, Fingerprint, SendHorizonal,
  type LucideIcon
} from 'lucide-react';
import { GridCanvas } from '@/components/ui/grid-canvas';

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  icon?: LucideIcon;
  accent?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  large?: boolean;
  visual?: React.ReactNode;
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '139, 92, 246';
const MOBILE_BREAKPOINT = 768;

const cardData: BentoCardProps[] = [
  {
    color: '#0e0b16',
    label: 'AI Engine',
    title: 'Generate Content Instantly',
    description: 'Enter keywords. Our AI reads the web and writes scroll-stopping posts and blogs in seconds — no prompting needed.',
    icon: Sparkles,
    accent: 'violet',
  },
  {
    color: '#0e0b16',
    label: 'Multi-Platform',
    title: 'One Click, Every Channel',
    description: 'Publish simultaneously to Twitter, LinkedIn, Instagram, and your website blog from one dashboard.',
    icon: SendHorizonal,
    accent: 'purple',
  },
  {
    color: '#0c0916',
    label: 'Web Intelligence',
    title: 'Always Fresh.\nAlways Trending.',
    description: 'We continuously scrape thousands of sources in your niche — so every piece of content is rooted in what\'s happening right now. No stale takes, ever.',
    icon: Globe,
    accent: 'violet',
    large: true,
  },
  {
    color: '#0c0916',
    label: 'Zero Effort',
    title: 'Set It and\nForget It.',
    description: 'Connect your accounts once. Drop in your keywords and brand voice. Sit back while AI writes, schedules, and publishes your entire content calendar — automatically.',
    icon: Zap,
    accent: 'purple',
    large: true,
  },
  {
    color: '#0e0b16',
    label: 'Analytics',
    title: 'Know What Works',
    description: 'Real-time engagement data. AI doubles down on what drives growth.',
    icon: BarChart2,
    accent: 'violet',
  },
  {
    color: '#0e0b16',
    label: 'Brand Voice',
    title: 'Sounds Just Like You',
    description: 'Train the AI on your content. Every post feels authentically yours.',
    icon: Fingerprint,
    accent: 'purple',
  },
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 0.9);
    box-shadow: 0 0 6px rgba(${color}, 0.5);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--glow-x', `${((mouseX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty('--glow-y', `${((mouseY - rect.top) / rect.height) * 100}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
        onComplete: () => particle.parentNode?.removeChild(particle),
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) gsap.to(element, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      if (enableMagnetism) gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2, cy = rect.height / 2;
      if (enableTilt) gsap.to(element, { rotateX: ((y - cy) / cy) * -10, rotateY: ((x - cx) / cx) * 10, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      if (enableMagnetism) {
        magnetismAnimationRef.current = gsap.to(element, { x: (x - cx) * 0.05, y: (y - cy) * 0.05, duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const maxD = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);left:${x - maxD}px;top:${y - maxD}px;pointer-events:none;z-index:1000;`;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement('div');
    spotlight.style.cssText = `position:fixed;width:700px;height:700px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.12) 0%,rgba(${glowColor},0.06) 20%,rgba(${glowColor},0.03) 35%,transparent 65%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll('.card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        cards.forEach(c => (c as HTMLElement).style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;
      cards.forEach(card => {
        const el = card as HTMLElement;
        const cr = el.getBoundingClientRect();
        const dist = Math.max(0, Math.hypot(e.clientX - (cr.left + cr.width / 2), e.clientY - (cr.top + cr.height / 2)) - Math.max(cr.width, cr.height) / 2);
        minDistance = Math.min(minDistance, dist);
        const glow = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0;
        updateCardGlowProperties(el, e.clientX, e.clientY, glow, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const CardContent: React.FC<{ card: BentoCardProps; textAutoHide: boolean }> = ({ card, textAutoHide }) => {
  const Icon = card.icon;
  const isLarge = card.large;

  return (
    <>
      {/* Animated grid canvas — centered in card, fades out top and bottom */}
      <div
        className="pointer-events-none absolute inset-x-0"
        style={{
          top: '15%',
          height: '70%',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
        }}
      >
        <GridCanvas />
      </div>

      {/* Top edge accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />

      {/* All card content — sits above canvas */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Label + icon pinned to top */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-violet-300/80">
            {card.label}
          </span>
          {Icon && (
            <div className="flex size-8 items-center justify-center rounded-xl border border-violet-500/20 bg-black/30 backdrop-blur-sm">
              <Icon className="size-4 text-violet-400" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Text pinned to bottom */}
        <div className="mt-auto">
          <h3
            className={`font-cabin font-semibold tracking-tight text-white/90 mb-1.5 ${
              isLarge ? 'text-2xl leading-[1.15] whitespace-pre-line' : 'text-[15px] leading-snug'
            }`}
          >
            {card.title}
          </h3>
          <p
            className={`font-inter leading-relaxed text-white/38 ${
              isLarge ? 'text-sm' : 'text-xs line-clamp-2'
            }`}
          >
            {card.description}
          </p>
        </div>
      </div>
    </>
  );
};

const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisable = disableAnimations || isMobile;

  return (
    <>
      <style>{`
        .bento-section {
          --glow-x: 50%; --glow-y: 50%; --glow-intensity: 0;
          --glow-radius: 200px; --glow-color: ${glowColor};
        }
        .bento-grid {
          display: grid;
          gap: 10px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 210px;
          }
          .bento-grid .card:nth-child(3) { grid-column: 3 / span 2; grid-row: 1 / span 2; }
          .bento-grid .card:nth-child(4) { grid-column: 1 / span 2; grid-row: 2 / span 2; }
          .bento-grid .card:nth-child(5) { grid-column: 3; grid-row: 3; }
          .bento-grid .card:nth-child(6) { grid-column: 4; grid-row: 3; }
        }
        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.9)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 35%,
            transparent 65%);
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .card--border-glow:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(${glowColor}, 0.12);
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisable} enabled={enableSpotlight} spotlightRadius={spotlightRadius} glowColor={glowColor} />
      )}

      <div
        ref={gridRef}
        className="bento-section bento-grid w-full select-none"
      >
        {cardData.map((card, index) => {
          const baseClass = `card flex flex-col relative w-full p-5 rounded-2xl border overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 ${
            enableBorderGlow ? 'card--border-glow' : ''
          }`;

          const cardStyle: React.CSSProperties = {
            backgroundColor: card.color ?? '#0e0b16',
            borderColor: 'rgba(139,92,246,0.12)',
            '--glow-x': '50%', '--glow-y': '50%', '--glow-intensity': '0', '--glow-radius': '200px',
          } as React.CSSProperties;

          if (enableStars) {
            return (
              <ParticleCard key={index} className={baseClass} style={cardStyle} disableAnimations={shouldDisable} particleCount={particleCount} glowColor={glowColor} enableTilt={enableTilt} clickEffect={clickEffect} enableMagnetism={enableMagnetism}>
                <CardContent card={card} textAutoHide={textAutoHide} />
              </ParticleCard>
            );
          }

          return (
            <div key={index} className={baseClass} style={cardStyle}>
              <CardContent card={card} textAutoHide={textAutoHide} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MagicBento;
