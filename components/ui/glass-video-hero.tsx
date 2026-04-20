"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Maximize2, Minimize2 } from "lucide-react";

const ColorBends = dynamic(() => import("@/components/ui/color-bends"), {
  ssr: false,
});

const HeroSection = () => {
  const [fullBleed, setFullBleed] = useState(true);

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#0a0612] transition-all duration-500 ease-in-out ${
        fullBleed ? "min-h-screen" : "py-32 lg:py-40"
      }`}
    >
      {/* ColorBends Background */}
      <div className="absolute inset-0 z-0">
        <ColorBends
          colors={["#A855F7"]}
          rotation={115}
          autoRotate={0}
          speed={0.18}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0.6}
          parallax={0.35}
          noise={0.1}
          iterations={2}
          intensity={1.5}
          bandWidth={6}
          transparent={false}
        />
      </div>
      {/* Bottom blur + fade transition into next section */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 z-[2] h-48 bg-gradient-to-t from-[#07040f] via-[#07040f]/70 to-transparent" />
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 z-[2] h-36 backdrop-blur-[6px]"
        style={{
          maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2.5 h-[38px] px-3.5 rounded-[10px] backdrop-blur-xl border border-[rgba(164,132,215,0.5)] bg-[rgba(85,80,110,0.4)] shadow-[0_0_20px_rgba(123,57,252,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <span className="bg-primary text-primary-foreground font-cabin font-medium text-xs px-2.5 py-1 rounded-[6px] shadow-[0_0_8px_rgba(123,57,252,0.4)]">
            New
          </span>
          <span className="font-cabin font-medium text-sm text-foreground tracking-wide">
            AI Autopilot for social & blogs
          </span>
        </div>

        <h1 className="font-instrument text-foreground text-5xl lg:text-[96px] leading-[1.05] tracking-[-0.02em] mt-8 max-w-5xl">
          Put your content
          <br className="hidden lg:block" />
          on autopilot{" "}
          <em
            className="italic mx-[0.08em] relative inline-block"
            style={{ fontStyle: "italic" }}
          >
            with
          </em>{" "}
          AI
        </h1>

        {/* Subtext */}
        <p className="font-inter font-normal text-lg text-muted-foreground mt-6 max-w-[662px]">
          Drop in your keywords and channel credentials. We scrape the web,
          draft on-brand blogs and social posts, and publish them to your site
          and feeds — automatically.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <button className="px-8 py-3.5 rounded-[10px] bg-primary text-primary-foreground font-cabin font-medium text-base hover:brightness-110 transition-all shadow-lg shadow-primary/25">
            Start Free Trial
          </button>
          <button className="px-8 py-3.5 rounded-[10px] bg-secondary text-secondary-foreground font-cabin font-medium text-base hover:brightness-125 transition-all">
            See It In Action
          </button>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
