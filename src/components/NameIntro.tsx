import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { FluidBackground } from "./FluidBackground";
import { prepareHomeIntro } from "@/lib/intro";

const FIRST_NAME = "Sriram ";
const LAST_NAME = "Kancherla";
const FULL_NAME = FIRST_NAME + LAST_NAME;

type Phase = "typing" | "hold" | "morph" | "exit";

type NameIntroProps = {
  targetRef: React.RefObject<HTMLHeadingElement>;
  onComplete: () => void;
};

export const NameIntro = ({ targetRef, onComplete }: NameIntroProps) => {
  const introRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("typing");
  const [visibleCount, setVisibleCount] = useState(0);
  const [morphStyle, setMorphStyle] = useState<React.CSSProperties>({});
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  const chars = FULL_NAME.split("");

  useLayoutEffect(() => {
    prepareHomeIntro();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;

    if (visibleCount >= chars.length) {
      const holdTimer = setTimeout(() => setPhase("hold"), 550);
      return () => clearTimeout(holdTimer);
    }

    const delay = chars[visibleCount] === " " ? 120 : 95;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [phase, visibleCount, chars]);

  useEffect(() => {
    if (phase !== "hold") return;
    const timer = setTimeout(() => setPhase("morph"), 750);
    return () => clearTimeout(timer);
  }, [phase]);

  const runMorph = useCallback(() => {
    const intro = introRef.current;
    const target = targetRef.current;
    if (!intro || !target) {
      onComplete();
      return;
    }

    const iRect = intro.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();

    const scale = tRect.height / iRect.height;
    const dx = tRect.left + tRect.width / 2 - (iRect.left + iRect.width / 2);
    const dy = tRect.top + tRect.height / 2 - (iRect.top + iRect.height / 2);

    setMorphStyle({
      transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
      transition: "transform 1.35s cubic-bezier(0.22, 1, 0.36, 1)",
    });
  }, [targetRef, onComplete]);

  useEffect(() => {
    if (phase !== "morph") return;

    const frame = requestAnimationFrame(() => runMorph());

    const completeTimer = setTimeout(() => {
      onComplete();
      setPhase("exit");
      setOverlayOpacity(0);
    }, 1380);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(completeTimer);
    };
  }, [phase, runMorph, onComplete]);

  const renderLetters = () =>
    chars.map((char, i) => {
      const isLastName = i >= FIRST_NAME.length;
      const visible = i < visibleCount;
      const wave = Math.sin(i * 0.45) * 3;

      return (
        <span
          key={`${char}-${i}`}
          className={`name-script text-7xl sm:text-8xl md:text-9xl lg:text-[7rem] inline-block ${isLastName ? "text-gradient" : "text-foreground"}`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) rotate(0deg)"
              : `translateY(0.35em) rotate(${-8 + wave}deg)`,
            transition: "opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          aria-hidden={!visible}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
      style={{
        opacity: overlayOpacity,
        transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      aria-hidden={phase === "exit"}
    >
      <div className="absolute inset-0 bg-background">
        <FluidBackground />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(190 95% 55% / 0.1), transparent 70%)",
          }}
        />
      </div>

      <div
        ref={introRef}
        className="relative z-10 text-center will-change-transform px-4"
        style={morphStyle}
      >
        <h1 className="whitespace-nowrap leading-none">{renderLetters()}</h1>
        {phase === "typing" && visibleCount < chars.length && (
          <span
            className="inline-block w-px h-[0.75em] bg-primary/70 ml-0.5 align-middle"
            style={{ animation: "cursor-blink 1s ease-in-out infinite" }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};
