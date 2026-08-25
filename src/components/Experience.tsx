import { ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { NUS_CREDENTIALS_URL } from "@/lib/site";

const experiences = [
  {
    meta: "JUL 2026 — AUG 2026 · REMOTE · 8 WEEKS",
    role: "Machine Learning Engineering Intern",
    company: "FlyRank AI (FlyRank Corp.)",
    body: "Got into FlyRank AI's ML Engineering internship program — eight weeks, July 1 to August 26, of real ML engineering. Experimentation, workflows, and pipelines built to actually run, not to sit in a notebook.",
    tags: ["Machine Learning", "ML Engineering", "FlyRank AI"],
    links: [] as { label: string; href: string }[],
  },
  {
    meta: "JUN 2025 · SINGAPORE",
    role: "Academic Intern",
    company: "National University of Singapore (NUS)",
    body: "Spent June doing exploratory data analysis on large-scale user activity and system log data, looking for the behavioral patterns that turn out to be insider threats. Built and evaluated a detection model using big data analytics and deep learning, then presented the findings under faculty supervision.",
    tags: ["EDA", "Insider Threat Detection", "Deep Learning", "Research"],
    links: [
      { label: "NUS Digital Certificate", href: NUS_CREDENTIALS_URL },
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className="hairline" />
      <div className="section-container section-spacing">
        <Reveal>
          <SectionEyebrow index="02">EXPERIENCE</SectionEyebrow>
          <h2
            id="experience-heading"
            style={{
              fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#F2F0ED",
              marginBottom: "0.75rem",
            }}
          >
            Where I've shown up.
          </h2>
          <p style={{ color: "#8B8A87", fontSize: "1rem", marginBottom: "3.5rem" }}>
            Two so far. Both taught me more than the syllabus did.
          </p>
        </Reveal>

        {/* Timeline */}
        <div className="relative" style={{ maxWidth: "720px" }}>
          {/* Left rail hairline */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "11px",
              top: "24px",
              bottom: "24px",
              width: "1px",
              background: "rgba(242,240,237,0.10)",
            }}
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 60}>
                <div className="flex gap-6">
                  {/* Node dot */}
                  <div
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      marginTop: "22px",
                      width: "23px",
                      height: "23px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(212,162,76,0.45)",
                      background: "#0A0A0B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "9999px",
                        background: "#D4A24C",
                        opacity: 0.7,
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Card */}
                  <article className="card-bordered p-6 flex-1">
                    {/* Meta */}
                    <p
                      style={{
                        fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#D4A24C",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {exp.meta}
                    </p>

                    {/* Role */}
                    <h3
                      style={{
                        fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
                        fontWeight: 600,
                        fontSize: "1.125rem",
                        letterSpacing: "-0.02em",
                        color: "#F2F0ED",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {exp.role}
                    </h3>

                    {/* Company */}
                    <p
                      style={{
                        color: "#D4A24C",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        marginBottom: "0.875rem",
                      }}
                    >
                      {exp.company}
                    </p>

                    {/* Body */}
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#8B8A87", marginBottom: "1rem" }}>
                      {exp.body}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                            fontSize: "11px",
                            letterSpacing: "0.05em",
                            padding: "3px 10px",
                            border: "1px solid rgba(242,240,237,0.10)",
                            borderRadius: "4px",
                            color: "#8B8A87",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    {exp.links.length > 0 && (
                      <div
                        style={{
                          paddingTop: "0.875rem",
                          borderTop: "1px solid rgba(242,240,237,0.08)",
                        }}
                      >
                        {exp.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                            style={{ color: "#D4A24C" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}
                          >
                            <ExternalLink size={13} aria-hidden="true" />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
