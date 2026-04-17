'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(20);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Fixed floating pill wrapper */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex justify-center px-5 transition-all duration-500 ease-out',
          scrolled ? 'pt-3' : 'pt-5',
        )}
      >
        <header
          className={cn(
            'w-full max-w-5xl rounded-2xl transition-all duration-500 ease-out',
            'border border-white/[0.07] bg-white/[0.04] backdrop-blur-2xl',
            'shadow-[0_2px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]',
            scrolled &&
              'max-w-4xl border-violet-400/[0.15] bg-black/30 shadow-[0_4px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,92,246,0.1),inset_0_1px_0_rgba(255,255,255,0.07)]',
          )}
        >
          <nav
            className={cn(
              'flex items-center justify-between px-5 transition-all duration-500',
              scrolled ? 'h-11' : 'h-14',
            )}
          >
            <BrandLogo />

            {/* Desktop nav links */}
            <div className="hidden items-center gap-0.5 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-white/55 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/90"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-2.5 md:flex">
              <a
                href="#signin"
                className="px-4 py-2 text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white/90"
              >
                Sign In
              </a>
              <a
                href="#get-started"
                className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-600/75 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(124,58,237,0.35)] transition-all duration-200 hover:bg-violet-600 hover:shadow-[0_0_28px_rgba(124,58,237,0.55)]"
              >
                Get Started
                <ArrowRight />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white md:hidden"
            >
              <MenuToggleIcon open={open} className="size-[18px]" duration={300} />
            </button>
          </nav>
        </header>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 transition-all duration-300 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {/* Tap-outside-to-close backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={cn(
            'absolute inset-x-4 top-[76px] overflow-hidden rounded-2xl border border-white/10 bg-[rgba(10,6,20,0.85)] shadow-2xl backdrop-blur-2xl transition-all duration-300',
            open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
          )}
        >
          {/* Subtle purple ambient */}
          <div className="pointer-events-none absolute inset-0 bg-violet-900/[0.12]" />

          {/* Links */}
          <div className="relative flex flex-col gap-0.5 p-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white/65 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/90"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Divider + CTAs */}
          <div className="relative px-3 pb-3">
            <div className="mb-3 h-px bg-white/[0.06]" />
            <div className="flex flex-col gap-2">
              <a
                href="#signin"
                className="flex items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/65 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/90"
              >
                Sign In
              </a>
              <a
                href="#get-started"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-600/80 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_18px_rgba(124,58,237,0.4)] transition-all duration-200 hover:bg-violet-600"
              >
                Get Started
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BrandLogo() {
  return (
    <div className="flex select-none items-center gap-2">
      <div className="flex size-[26px] items-center justify-center rounded-[7px] border border-violet-500/40 bg-violet-600/75 shadow-[0_0_12px_rgba(124,58,237,0.5)]">
        <svg className="size-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
        </svg>
      </div>
      <span className="font-cabin text-[15px] font-semibold tracking-tight text-white">
        HubTech
      </span>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg className="size-3.5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
