type SectionEyebrowProps = {
  children: React.ReactNode;
  index?: string;
  className?: string;
};

export const SectionEyebrow = ({ children, index, className = "" }: SectionEyebrowProps) => (
  <p className={`section-eyebrow ${className}`.trim()}>
    {index && <span className="text-muted-foreground/80 mr-3">({index})</span>}
    {children}
  </p>
);
