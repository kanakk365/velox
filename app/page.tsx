import { Header } from "@/components/ui/header-2";
import { HeroSection } from "@/components/ui/glass-video-hero";
import { BentoSection } from "@/components/sections/bento-section";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <BentoSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
