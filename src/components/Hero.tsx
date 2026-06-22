import { useRef, useState, useCallback } from "react";
import { ArrowRight, FileText, Mail, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TechBackground } from "./TechBackground";
import { NameIntro } from "./NameIntro";
import { LINKEDIN_URL, RESUME_PAGE_PATH } from "@/lib/site";
import { prepareHomeIntro } from "@/lib/intro";

export const Hero = ({ onIntroComplete }: { onIntroComplete?: () => void }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    prepareHomeIntro();
    setIntroDone(true);
    onIntroComplete?.();
    setTimeout(() => setShowIntro(false), 400);
  }, [onIntroComplete]);

  return (
    <section id="hero" className="section-fluid relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {showIntro && (
        <NameIntro targetRef={titleRef} onComplete={handleIntroComplete} />
      )}

      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="absolute inset-0 opacity-70">
        <TechBackground />
      </div>
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-40 animate-fluid-morph animate-glow-pulse"
        style={{ background: "radial-gradient(circle, hsl(190 95% 55% / 0.35), hsl(220 90% 60% / 0.15), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-25 animate-fluid-morph"
        style={{ background: "radial-gradient(circle, hsl(220 90% 60% / 0.3), transparent 70%)", animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full glass text-xs text-muted-foreground"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span>ML Intern @ FlyRank AI · Ex-Academic Intern @ NUS</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          <h1
            ref={titleRef}
            className="name-script text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] leading-none mb-6"
            style={{
              opacity: introDone ? 1 : 0,
            }}
          >
            Sriram <span className="text-gradient">Kancherla</span>
          </h1>

          <p
            className="mono text-sm md:text-base text-primary mb-4"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            Machine Learning · Data Analytics · Full-Stack AI
          </p>

          <div
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.28s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.28s",
            }}
          >
            <MapPin size={14} className="text-primary" />
            <span>Vellore, Tamil Nadu, India</span>
          </div>

          <p
            className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.36s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.36s",
            }}
          >
            Computer Science student focused on Data Analytics and Machine Learning — building
            real-world systems with Python, SQL, NLP, and cloud platforms across cybersecurity,
            healthcare, and finance.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-3"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.44s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.44s",
            }}
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 glow transition-all duration-500 hover:scale-105">
              <a href="#projects">
                View Projects <ArrowRight size={16} className="ml-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-card/40 backdrop-blur hover:bg-card transition-all duration-500 hover:scale-105">
              <Link to={RESUME_PAGE_PATH}>
                <FileText size={16} className="mr-1" /> View Resume
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="hover:bg-card/60 transition-all duration-500 hover:scale-105">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Mail size={16} className="mr-1" /> Connect on LinkedIn
              </a>
            </Button>
          </div>

          <div
            className="mt-20 grid grid-cols-3 max-w-xl mx-auto gap-4"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.52s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.52s",
            }}
          >
            {[
              { v: "5", l: "Featured Projects" },
              { v: "2", l: "Internships" },
              { v: "10+", l: "Certifications" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4 fluid-glow hover-lift">
                <div className="text-2xl md:text-3xl font-bold text-gradient font-display">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
