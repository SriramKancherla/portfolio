export const FluidDivider = ({ flip = false }: { flip?: boolean }) => (
  <div className={`fluid-divider relative h-28 md:h-36 -my-2 overflow-hidden ${flip ? "rotate-180" : ""}`} aria-hidden="true">
    <svg
      className="absolute bottom-0 w-[200%] h-full animate-fluid-wave"
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="hsl(var(--primary) / 0.07)"
        d="M0,72 C200,128 420,24 720,64 C980,98 1180,36 1440,72 L1440,140 L0,140 Z"
      />
      <path
        fill="hsl(var(--accent) / 0.05)"
        className="animate-fluid-wave-reverse"
        d="M0,96 C320,32 640,112 960,68 C1140,48 1320,88 1440,96 L1440,140 L0,140 Z"
      />
      <path
        fill="hsl(var(--card) / 0.35)"
        d="M0,110 C360,80 720,120 1080,90 C1260,76 1360,100 1440,110 L1440,140 L0,140 Z"
      />
    </svg>
  </div>
);
