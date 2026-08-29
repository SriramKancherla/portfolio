import { ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { LINKEDIN_URL, NUS_CREDENTIALS_URL } from "@/lib/site";

const experiences = [
  {
    meta: "JUL 2026 — AUG 2026 · REMOTE · 8 WEEKS",
    role: "Machine Learning Engineering Intern",
    company: "FlyRank AI (FlyRank Corp.)",
    body: "Eight weeks on FlyRank AI's ML Engineering internship, July through August. Real ML engineering the whole way — experimentation, workflow design, and pipelines built to run in production rather than sit in a notebook.",
    tags: ["Machine Learning", "ML Engineering", "FlyRank AI"],
    links: [{ label: "LinkedIn", href: LINKEDIN_URL }],
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
      <div className="section-container section-spacing">
        <Reveal>
          <SectionEyebrow index="02">EXPERIENCE</SectionEyebrow>
          <h2
            id="experience-heading"
            style={{
              fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#E8EEF5",
              marginBottom: "0.75rem",
            }}
          >
            Where I've shown up.
          </h2>
          <p style={{ color: "#8697AD", fontSize: "1rem", marginBottom: "3.5rem" }}>
            Two so far — a June in Singapore and a remote summer. Both beat the syllabus.
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
              background: "rgba(232,238,245,0.10)",
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
                      border: "1px solid rgba(77,163,255,0.45)",
                      background: "#08111C",
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
                        background: "#4DA3FF",
                        opacity: 0.7,
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Card */}
                  <article className="card-bordered p-8 flex-1">
                    {/* Prose left, tags and verification right — same two-column
                        treatment as the project cards. */}
                    <div className="grid gap-6 lg:gap-9 lg:grid-cols-[minmax(0,1fr)_224px]">
                      <div>
                        {/* Meta */}
                        <p
                          style={{
                            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                            fontSize: "11px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#4DA3FF",
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
                            fontSize: "1.1875rem",
                            letterSpacing: "-0.02em",
                            color: "#E8EEF5",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {exp.role}
                        </h3>

                        {/* Company */}
                        <p style={{ color: "#4DA3FF", fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.875rem" }}>
                          {exp.company}
                        </p>

                        {/* Body */}
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#8697AD" }}>
                          {exp.body}
                        </p>
                      </div>

                      {/* Right rail */}
                      <div className="lg:border-l lg:pl-7" style={{ borderColor: "rgba(232,238,245,0.10)" }}>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                                fontSize: "10.5px",
                                letterSpacing: "0.03em",
                                padding: "3px 7px",
                                border: "1px solid rgba(232,238,245,0.10)",
                                borderRadius: "5px",
                                color: "#8697AD",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {exp.links.length > 0 && (
                          <div
                            className="mt-5 pt-5 flex flex-col gap-2"
                            style={{ borderTop: "1px solid rgba(232,238,245,0.10)" }}
                          >
                            {exp.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-start gap-1.5 text-sm hover:underline transition-colors duration-200"
                                style={{ color: "#4DA3FF", lineHeight: 1.45 }}
                              >
                                <ExternalLink size={13} aria-hidden="true" style={{ marginTop: "3px", flexShrink: 0 }} />
                                <span>{link.label}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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
