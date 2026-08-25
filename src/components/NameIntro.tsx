"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { prepareHomeIntro } from "@/lib/intro";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * SK curtain preloader.
 *
 * Timeline (~2.3s):
 *   0–150ms    solid panel, "SK" at 90% scale / 0 opacity
 *   150–650ms  letters scale + fade in, letter-spacing pulls from 0.15em to tight
 *   650–1400ms one conic light sweep rotates behind the letters; glow intensifies
 *   1400–1750ms hold at full glow
 *   1750–2300ms whole panel lifts up (translateY -100%), uncovering the hero
 *
 * Reduced motion: panel simply fades out. A safety timeout guarantees
 * onComplete always fires.
 */

type Phase = "enter" | "letters" | "glow" | "hold" | "lift";

const LETTERS_AT = 150;
const GLOW_AT = 650;
const HOLD_AT = 1400;
const LIFT_AT = 1750;
const DONE_AT = 2300;
const SAFETY_AT = 4500;

type NameIntroProps = {
  onComplete: () => void;
};

export const NameIntro = ({ onComplete }: NameIntroProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("enter");
  const finishedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete();
  }, [onComplete]);

  useLayoutEffect(() => {
    prepareHomeIntro();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const safety = setTimeout(finishIntro, SAFETY_AT);
    return () => clearTimeout(safety);
  }, [finishIntro]);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip the choreography — fade the panel out and finish quickly.
      setPhase("lift");
      const t = setTimeout(finishIntro, 350);
      return () => clearTimeout(t);
    }

    const timers = [
      setTimeout(() => setPhase("letters"), LETTERS_AT),
      setTimeout(() => setPhase("glow"), GLOW_AT),
      setTimeout(() => setPhase("hold"), HOLD_AT),
      setTimeout(() => setPhase("lift"), LIFT_AT),
      setTimeout(finishIntro, DONE_AT),
    ];
    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion, finishIntro]);

  const lettersIn = phase !== "enter";
  const glowing = phase === "glow" || phase === "hold" || phase === "lift";

  return (
    <div
      className={`sk-intro ${phase === "lift" ? "sk-intro--lift" : ""}`}
      aria-hidden="true"
    >
      <div className="sk-intro__stage">
        {glowing && <div className="sk-intro__light" />}
        <div
          className={`sk-intro__mark ${lettersIn ? "sk-intro__mark--in" : ""} ${
            glowing ? "sk-intro__mark--glow" : ""
          }`}
        >
          <span>S</span>
          <span>K</span>
        </div>
      </div>
    </div>
  );
};
