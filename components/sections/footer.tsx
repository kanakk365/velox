const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Get Started', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#07040f] px-4 pb-8">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full backdrop-blur-md " />

      <div className="relative mx-auto max-w-5xl">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl px-6 py-6 shadow-[0_-1px_0_0_rgba(139,92,246,0.15),0_0_40px_rgba(139,92,246,0.04)]">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                <span className="font-instrument text-xl text-white/90">Velox</span>
              </div>
              <p className="font-inter text-xs text-white/30">
                Put your content on autopilot with AI.
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-cabin text-xs text-white/40 transition-colors hover:text-white/80"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          <div className="flex items-center justify-between">
            <p className="font-inter text-xs text-white/20">
              © 2026 Velox · All rights reserved
            </p>

            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="X (Twitter)"
                className="flex size-7 items-center justify-center rounded-full border border-white/[0.08] text-white/40 transition-colors hover:border-violet-500/30 hover:text-violet-300"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex size-7 items-center justify-center rounded-full border border-white/[0.08] text-white/40 transition-colors hover:border-violet-500/30 hover:text-violet-300"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
