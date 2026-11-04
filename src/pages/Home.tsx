import { Hero } from "@/sections/Hero";
import { SelectedWork } from "@/sections/SelectedWork";
import { Capabilities } from "@/sections/Capabilities";
import { Experience } from "@/sections/Experience";
import { Achievements } from "@/sections/Achievements";
import { EngineeringLab } from "@/sections/EngineeringLab";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Marquee } from "@/components/brutalist/Marquee";
import { marqueeRows } from "@/data/navigation";
import { homeMeta } from "@/data/site";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function Home() {
  useDocumentMeta(homeMeta);
  return (
    <>
      <Hero />
      <section aria-label="Disciplines" className="border-b-2 border-ink bg-lime py-4 md:py-6">
        <Marquee
          items={marqueeRows[0] ?? []}
          duration={32}
          className="font-display text-[clamp(2.75rem,8vw,7rem)] font-bold uppercase leading-[1.05] tracking-[-0.05em]"
        />
        <Marquee
          items={marqueeRows[1] ?? []}
          reverse
          duration={46}
          className="font-mono text-[clamp(1rem,2vw,1.5rem)] font-medium uppercase tracking-[0.04em]"
          separator="✳"
        />
      </section>
      <SelectedWork />
      <Capabilities />
      <Experience />
      <Achievements />
      <EngineeringLab />
      <About />
      <Contact />
    </>
  );
}
