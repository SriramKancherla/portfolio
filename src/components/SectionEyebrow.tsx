type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export const SectionEyebrow = ({ children, className = "" }: SectionEyebrowProps) => (
  <div className={`section-eyebrow ${className}`.trim()}>
    <span className="section-eyebrow__glow" aria-hidden="true" />
    <span className="section-eyebrow__line" aria-hidden="true" />
    <span className="section-eyebrow__label">{children}</span>
  </div>
);
