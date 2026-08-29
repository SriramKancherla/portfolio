"use client";

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
import { hasIntroCompleted } from "@/lib/intro";

function isIntroDoneInitially() {
  if (hasIntroCompleted()) return true;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)")?.matches) {
    return true;
  }
  return false;
}

export default function HomePage() {
  const [introDone, setIntroDone] = useState(() => isIntroDoneInitially());

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="relative z-10">
        <Navbar visible={introDone} />
        <main>
          <Hero onIntroComplete={() => setIntroDone(true)} />
          <div className={introDone ? undefined : "hidden"} aria-hidden={!introDone}>
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Certifications />
            <Contact />
          </div>
        </main>
        <div className={introDone ? undefined : "hidden"} aria-hidden={!introDone}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
