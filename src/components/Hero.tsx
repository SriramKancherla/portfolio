"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import Link from "next/link";
import { NameIntro } from "./NameIntro";
import { LINKEDIN_URL, RESUME_PAGE_PATH, ROLES_LINE } from "@/lib/site";
import { prepareHomeIntro, hasIntroCompleted, markIntroCompleted } from "@/lib/intro";

function shouldPlayIntro() {
  if (hasIntroCompleted()) return false;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  return true;
}

export const Hero = ({ onIntroComplete }: { onIntroComplete?: () => void }) => {
  const [introDone, setIntroDone] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = useCallback(() => {
    markIntroCompleted();
    prepareHomeIntro();
    setIntroDone(true);
    onIntroComplete?.();
    setShowIntro(false);
  }, [onIntroComplete]);

  useEffect(() => {
    const play = shouldPlayIntro();
    if (play) {
      setIntroDone(false);
      setShowIntro(true);
    } else {
      markIntroCompleted();
      onIntroComplete?.();
    }
  }, [onIntroComplete]);

  useEffect(() => {
    if (introDone) return;
    const fallback = setTimeout(handleIntroComplete, 6000);
    return () => clearTimeout(fallback);
  }, [introDone, handleIntroComplete]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Magnetic button effect
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 40;
    if (dist < radius) {
      const strength = (1 - dist / radius) * 6;
      el.style.transform = `translate(${(dx / dist) * strength}px, ${(dy / dist) * strength}px)`;
    }
  };
  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 200ms ease, border-color 200ms ease, color 200ms ease";
    el.style.transform = "translate(0, 0)";
  };

  return (
    <section
      id="hero"
      className="relative z-10 flex flex-col justify-center"
      style={{ minHeight: "100dvh", paddingTop: "80px", paddingBottom: "0" }}
    >
      {/* Ambient hero glow — fixed, behind everything */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(77,163,255,0.13), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Film grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.035,
          mixBlendMode: "overlay",
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {showIntro && <NameIntro onComplete={handleIntroComplete} />}

      <div className="section-container flex-1 flex items-center py-16" style={{ position: "relative", zIndex: 2 }}>
        <div className="w-full max-w-3xl mx-auto text-center">

          {/* Mono eyebrow */}
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8697AD",
            }}
          >
            CS @ VIT Vellore · 2023–2027
          </p>

          {/* H1 name — bigger, more dramatic */}
          <h1
            className="mb-5"
            style={{
              fontFamily: "var(--font-display), 'Inter Tight', 'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(3.5rem, 13vw, 10rem)",
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
            }}
          >
            <span style={{ color: "#E8EEF5" }}>Sriram</span>{" "}
            <span style={{ color: "#4DA3FF" }}>Kancherla</span>
          </h1>

          {/* Role line */}
          <p
            className="mb-4"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: "13px",
              letterSpacing: "0.08em",
              color: "#8697AD",
              textTransform: "uppercase",
            }}
          >
            {ROLES_LINE}
          </p>

          {/* Credential line — replaces status pill */}
          <p
            className="mb-5 mx-auto"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: "13px",
              letterSpacing: "0.04em",
              maxWidth: "52ch",
              lineHeight: 1.7,
            }}
          >
            <span style={{ color: "#8697AD" }}>Final year </span>
            <span style={{ color: "#8697AD" }}>at </span>
            <span style={{ color: "#E8EEF5" }}>VIT Vellore</span>
            <span style={{ color: "#8697AD" }}> · </span>
            <span style={{ color: "#8697AD" }}>ex-ML Intern </span>
            <span style={{ color: "#8697AD" }}>@ </span>
            <span style={{ color: "#E8EEF5" }}>FlyRank AI</span>
            <span style={{ color: "#8697AD" }}> · </span>
            <span style={{ color: "#8697AD" }}>ex-Academic Intern </span>
            <span style={{ color: "#8697AD" }}>@ </span>
            <span style={{ color: "#E8EEF5" }}>NUS Singapore</span>
          </p>

          {/* Location */}
          <div
            className="flex items-center justify-center gap-1.5 mb-7"
            style={{ color: "#8697AD", fontSize: "14px" }}
          >
            <MapPin size={13} style={{ color: "#4DA3FF" }} aria-hidden="true" />
            <span>Vellore, Tamil Nadu, India</span>
          </div>

          {/* Tagline */}
          <p
            className="mx-auto mb-10"
            style={{
              maxWidth: "62ch",
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "#8697AD",
            }}
          >
            I build machine learning systems that have to hold up outside a notebook — wafer defects, market signals, and the log entries nobody wants to find. One of them is live right now.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 px-2 sm:px-0">
            {/* See the work — magnetic primary */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm min-h-[44px]"
              style={{
                border: "1px solid #4DA3FF",
                color: "#4DA3FF",
                borderRadius: "6px",
                fontFamily: "var(--font-sans), 'Inter', sans-serif",
                transition: "background-color 200ms ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseMove={handleMagneticMove}
              onMouseLeave={(e) => {
                handleMagneticLeave(e);
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(77,163,255,0.10)"; }}
            >
              See the work <ArrowRight size={15} aria-hidden="true" />
            </a>

            {/* Résumé */}
            <Link
              href={RESUME_PAGE_PATH}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm min-h-[44px] transition-colors duration-200"
              style={{
                border: "1px solid rgba(134,151,173,0.45)",
                color: "#8697AD",
                borderRadius: "6px",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#E8EEF5"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,238,245,0.35)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8697AD"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(134,151,173,0.45)"; }}
            >
              <FileText size={15} aria-hidden="true" /> Résumé
            </Link>

            {/* LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm min-h-[44px] transition-colors duration-200"
              style={{ color: "#8697AD" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#E8EEF5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8697AD"; }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="flex justify-center pb-10 transition-opacity duration-500"
        style={{ opacity: mounted ? (scrolled ? 0 : 1) : 1, position: "relative", zIndex: 2 }}
        aria-hidden="true"
      >
        <div className="scroll-cue">
          <div className="scroll-cue__line" />
        </div>
      </div>
    </section>
  );
};
