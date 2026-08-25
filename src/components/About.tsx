import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

const cards = [
  {
    kicker: "EDUCATION",
    body: "B.Tech in Computer Science & Engineering, VIT Vellore — Aug 2023 to Aug 2027, currently final year. Coursework in DSA, OOP, NLP, and AI/ML. CGPA 7.29/10.",
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
                  fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "#E8EEF5",
                  marginBottom: "1.25rem",
                }}
              >
                The short version.
              </h2>
              <p
                style={{
                  maxWidth: "68ch",
                  lineHeight: 1.65,
                  color: "#8697AD",
                  fontSize: "1rem",
                }}
              >
                CS at VIT Vellore, now in my final year. I like the unglamorous half of machine learning — the pipelines, the feature engineering, the evaluation, the part where the model has to work for someone who isn't me. Most of what I've built has landed in finance, healthcare, and security, which wasn't the plan so much as what kept turning out to be interesting.
              </p>
            </div>
          </Reveal>

          {/* Right column — 2×2 cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {cards?.map((card, i) => (
              <Reveal key={card?.kicker} delay={i * 60}>
                <article
                  className="card-bordered p-8 h-full"
                  style={{ minHeight: "140px" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#4DA3FF",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {card?.kicker}
                  </p>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#8697AD" }}>
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
