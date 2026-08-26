type FluidMarqueeProps = {
  items: string[];
  className?: string;
  speed?: "slow" | "normal";
};

export const FluidMarquee = ({ items, className = "", speed = "normal" }: FluidMarqueeProps) => {
  const track = [...items, ...items];

  return (
    <div
      className={`fluid-marquee overflow-hidden border-y border-border/40 bg-card/20 backdrop-blur-sm ${className}`.trim()}
      aria-hidden="true"
    >
      <div className={`fluid-marquee__track ${speed === "slow" ? "fluid-marquee__track--slow" : ""}`}>
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="fluid-marquee__item">
            {item}
            <span className="fluid-marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
};
