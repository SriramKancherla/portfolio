import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

const cards = [
  {
    kicker: "EDUCATION",
    body: "B.Tech in Computer Science & Engineering, VIT Vellore — Aug 2023 to Aug 2027. Coursework in DSA, OOP, NLP, and AI/ML. CGPA 7.29/10.",
  },
  {
    kicker: "FOCUS",
    body: "ML engineering, data analytics, and finance — with detours into NLP, computer vision, anomaly detection, and full-stack ML apps built on FastAPI and Docker.",
  },
  {
    kicker: "GOAL",
    body: "Build AI products people actually use — ideally ones that don't quietly fall over in production.",
  },
  {
    kicker: "LANGUAGES",
    body: "English, Telugu, and Tamil natively. Hindi and French are a work in progress.",
  },
];

export const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="hairline" />
      <div className="section-container section-spacing">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-12 lg:gap-16 items-start">

          {/* Left column — sticky */}
          <Reveal>
            <div className="lg:sticky" style={{ top: "7rem" }}>
              <SectionEyebrow index="01">ABOUT</SectionEyebrow>
              <h2
                id="about-heading"
                style={{
                  fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "#F2F0ED",
                  marginBottom: "1.25rem",
                }}
              >
                Short version.
              </h2>
              <p
                style={{
                  maxWidth: "68ch",
                  lineHeight: 1.65,
                  color: "#8B8A87",
                  fontSize: "1rem",
                }}
              >
                I'm a CS undergrad at VIT Vellore. I like the unglamorous half of machine learning — the pipelines, the feature engineering, the evaluation, the part where the thing actually has to run for someone other than me. Most of my work has landed in finance, healthcare, and cybersecurity, which was not really the plan.
              </p>
            </div>
          </Reveal>

          {/* Right column — 2×2 cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {cards?.map((card, i) => (
              <Reveal key={card?.kicker} delay={i * 60}>
                <article
                  className="card-bordered p-6 h-full"
                  style={{ minHeight: "140px" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#D4A24C",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {card?.kicker}
                  </p>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#8B8A87" }}>
                    {card?.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
