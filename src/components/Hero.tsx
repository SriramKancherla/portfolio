"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import Link from "next/link";
import { NameIntro } from "./NameIntro";
import { LINKEDIN_URL, RESUME_PAGE_PATH, ROLE_LINE, ROLES_LINE } from "@/lib/site";
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

  return (
    <section
      id="hero"
      className="relative z-10 flex flex-col justify-center"
      style={{ minHeight: "100dvh", paddingTop: "80px", paddingBottom: "0" }}
    >
      {showIntro && <NameIntro onComplete={handleIntroComplete} />}

      <div className="section-container flex-1 flex items-center py-16">
        <div className="w-full max-w-3xl mx-auto text-center">

          {/* Mono eyebrow */}
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8B8A87",
            }}
          >
            CS @ VIT Vellore · 2023–2027
          </p>

          {/* H1 name */}
          <h1
            className="mb-5"
            style={{
              fontFamily: "var(--font-display), 'Inter Tight', 'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(3rem, 9vw, 7rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "#F2F0ED" }}>Sriram</span>{" "}
            <span style={{ color: "#D4A24C" }}>Kancherla</span>
          </h1>

          {/* Role line */}
          <p
            className="mb-5"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: "13px",
              letterSpacing: "0.08em",
              color: "#8B8A87",
              textTransform: "uppercase",
            }}
          >
            {ROLES_LINE}
          </p>

          {/* Status pill */}
          <div className="flex justify-center mb-4">
            <span className="status-pill">
              <span className="live-dot" />
              {ROLE_LINE}
            </span>
          </div>

          {/* Location */}
          <div
            className="flex items-center justify-center gap-1.5 mb-7"
            style={{ color: "#8B8A87", fontSize: "14px" }}
          >
            <MapPin size={13} style={{ color: "#D4A24C" }} aria-hidden="true" />
            <span>Vellore, Tamil Nadu, India</span>
          </div>

          {/* Tagline */}
          <p
            className="mx-auto mb-10"
            style={{
              maxWidth: "62ch",
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "#8B8A87",
            }}
          >
            I build machine learning systems that have to survive contact with production — mostly in finance, healthcare, and security. A couple of them are live right now.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 px-2 sm:px-0">
            {/* See the work */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm min-h-[44px] transition-colors duration-200"
              style={{
                border: "1px solid #D4A24C",
                color: "#D4A24C",
                borderRadius: "6px",
                fontFamily: "var(--font-sans), 'Inter', sans-serif",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,162,76,0.10)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              See the work <ArrowRight size={15} aria-hidden="true" />
            </a>

            {/* Résumé */}
            <Link
              href={RESUME_PAGE_PATH}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm min-h-[44px] transition-colors duration-200"
              style={{
                border: "1px solid rgba(139,138,135,0.45)",
                color: "#8B8A87",
                borderRadius: "6px",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F2F0ED"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(242,240,237,0.35)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B8A87"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,138,135,0.45)"; }}
            >
              <FileText size={15} aria-hidden="true" /> Résumé
            </Link>

            {/* LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm min-h-[44px] transition-colors duration-200"
              style={{ color: "#8B8A87" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F2F0ED"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B8A87"; }}
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
        style={{ opacity: mounted ? (scrolled ? 0 : 1) : 1 }}
        aria-hidden="true"
      >
        <div className="scroll-cue">
          <div className="scroll-cue__line" />
        </div>
      </div>
    </section>
  );
};
