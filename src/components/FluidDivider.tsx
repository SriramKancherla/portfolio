export const FluidDivider = ({ flip = false }: { flip?: boolean }) => (
  <div className={`relative h-24 -my-4 overflow-hidden ${flip ? "rotate-180" : ""}`} aria-hidden="true">
    <svg
      className="absolute bottom-0 w-[200%] h-full animate-fluid-wave"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="hsl(var(--primary) / 0.04)"
        d="M0,64 C240,120 480,0 720,48 C960,96 1200,24 1440,64 L1440,120 L0,120 Z"
      />
      <path
        fill="hsl(var(--accent) / 0.03)"
        className="animate-fluid-wave-reverse"
        d="M0,80 C360,20 720,100 1080,56 C1260,36 1380,72 1440,80 L1440,120 L0,120 Z"
      />
    </svg>
  </div>
);
