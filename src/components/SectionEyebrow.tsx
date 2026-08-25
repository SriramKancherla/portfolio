type SectionEyebrowProps = {
  children: React.ReactNode;
  index?: string;
  className?: string;
};

export const SectionEyebrow = ({ children, index, className = "" }: SectionEyebrowProps) => (
  <p
    className={`section-eyebrow ${className}`.trim()}
    aria-label={index ? `Section ${index}: ${children}` : String(children)}
  >
    {index && (
      <span style={{ color: "#D4A24C", fontWeight: 500 }}>{index}</span>
    )}
    {index && (
      <span style={{ color: "rgba(242,240,237,0.25)", margin: "0 0.4em" }}>——</span>
    )}
    <span style={{ color: "#8B8A87" }}>{children}</span>
  </p>
);
