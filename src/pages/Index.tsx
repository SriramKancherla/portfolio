import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SiteBackground } from "@/components/SiteBackground";
import { FluidDivider } from "@/components/FluidDivider";

import { hasIntroCompleted } from "@/lib/intro";

const Index = () => {
  const [introDone, setIntroDone] = useState(() => hasIntroCompleted());

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteBackground />
      <div className="relative z-10">
        <Navbar visible={introDone} />
        <main>
          <Hero onIntroComplete={() => setIntroDone(true)} />
          <div className={introDone ? undefined : "hidden"} aria-hidden={!introDone}>
            <FluidDivider />
            <About />
            <FluidDivider flip />
            <Experience />
            <FluidDivider />
            <Projects />
            <FluidDivider flip />
            <Skills />
            <FluidDivider />
            <Certifications />
            <FluidDivider flip />
            <Contact />
          </div>
        </main>
        <div className={introDone ? undefined : "hidden"} aria-hidden={!introDone}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
