"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { prepareHomeIntro } from "@/lib/intro";
import { StrawHat } from "./StrawHat";

const NAME = "SRIRAM KANCHERLA";
const LETTERS = NAME.split("");

// Indices of "KANCHERLA" (starts at index 7, after "SRIRAM ")
const KANCHERLA_START = 7; // "SRIRAM " = 7 chars

type Phase = "idle" | "letters" | "hold" | "shrink" | "done";

type NameIntroProps = {
  onComplete: () => void;
};

export const NameIntro = ({ onComplete }: NameIntroProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [letterVisible, setLetterVisible] = useState<boolean[]>(new Array(LETTERS.length).fill(false));
  const [hatVisible, setHatVisible] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    document.body.style.overflow = "";
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    prepareHomeIntro();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Skip on click, scroll, or Esc
  useEffect(() => {
    const skip = () => finish();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") finish(); };
    window.addEventListener("click", skip, { once: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", skip, { once: true, passive: true });
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", skip);
    };
  }, [finish]);

  // 6s failsafe
  useEffect(() => {
    const t = setTimeout(finish, 6000);
    return () => clearTimeout(t);
  }, [finish]);

  useEffect(() => {
    if (prefersReducedMotion) {
      finish();
      return;
    }

    setPhase("letters");

    // Stagger letters: 40ms each
    const timers: ReturnType<typeof setTimeout>[] = [];
    LETTERS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setLetterVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 40));
    });

    // After all letters visible (~1.6s), hold 400ms
    const holdAt = LETTERS.length * 40 + 400;
    timers.push(setTimeout(() => setPhase("hold"), LETTERS.length * 40));

    // Drop hat at end of letter animation
    timers.push(setTimeout(() => setHatVisible(true), LETTERS.length * 40 + 200));

    // Shrink + fade out at holdAt
    timers.push(setTimeout(() => setPhase("shrink"), holdAt));

    // Done at ~2.6s
    timers.push(setTimeout(finish, holdAt + 600));

    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion, finish]);

  if (phase === "done") return null;

  const isShrinking = phase === "shrink";

  return (
    <div
      className="intro-overlay"
      aria-hidden="true"
      style={{
        opacity: isShrinking ? 0 : 1,
        transition: isShrinking ? "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
      }}
    >
      <div
        style={{
          transform: isShrinking ? "scale(0.85)" : "scale(1)",
          transition: isShrinking ? "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display), 'Inter Tight', 'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(2rem, 7vw, 5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#F2F0ED",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 0.02em",
            position: "relative",
          }}
        >
          {LETTERS.map((letter, i) => {
            const isKancherla = i >= KANCHERLA_START;
            const isSpace = letter === " ";
            const isLastLetter = i === LETTERS.length - 1;
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  color: isKancherla && !isSpace ? "#D4A24C" : "#F2F0ED",
                  opacity: letterVisible[i] ? 1 : 0,
                  transform: letterVisible[i] ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
                  width: isSpace ? "0.35em" : undefined,
                  position: isLastLetter ? "relative" : undefined,
                }}
              >
                {isSpace ? "\u00A0" : letter}
                {isLastLetter && hatVisible && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-0.55em",
                      right: "-0.1em",
                      transform: "rotate(-8deg)",
                      display: "inline-block",
                      animation: "hat-drop-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    }}
                  >
                    <StrawHat className="w-8 h-6" style={{}} />
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes hat-drop-in {
          from { opacity: 0; transform: rotate(-8deg) translateY(-30px); }
          to { opacity: 1; transform: rotate(-8deg) translateY(0); }
        }
      `}</style>
    </div>
  );
};
