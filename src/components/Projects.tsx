"use client";

import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { NUS_CREDENTIALS_URL } from "@/lib/site";

type Category = "All" | "ML" | "AI" | "Analytics" | "Full-Stack";

type Project = {
  title: string;
  period: string;
  categories: Exclude<Category, "All">[];
  description: string;
  metrics: { value: string; label: string }[];
  tech: string[];
  codeUrl?: string;
  liveUrl?: string;
  liveDomain?: string;
  certUrl?: string;
  certLabel?: string;
};

const projects: Project[] = [
  {
    title: "Image Based Wafer Map Pattern Intelligence",
    period: "Feb 2026 — Present",
    categories: ["ML", "AI"],
    description:
      "A CNN that looks at silicon wafer maps and tells you what went wrong on the fab floor. The hard part isn't the model — it's wafers arriving at wildly different sizes and a dataset format from another decade. Evaluated properly with confusion matrices, not vibes.",
    metrics: [
      { value: "8+", label: "Defect Classes" },
      { value: "80/20", label: "Train/Test Split" },
      { value: "Semiconductor", label: "Domain" },
    ],
    tech: ["Python", "PyTorch", "OpenCV", "NumPy", "Pandas", "scikit-learn"],
    codeUrl: "https://github.com/SriramKancherla/Image-based-Wafer-Map-Pattern-intelligence",
  },
  {
    title: "AInvestify — AI Stock Screener",
    period: "Dec 2025 — Present",
    categories: ["ML", "Full-Stack", "Analytics"],
    description:
      "An AI stock screener that reads the fundamentals and the news at the same time, then calls a stock strong or weak. A Random Forest classifier rates the fundamentals good or bad, an XGBoost regressor turns that into a 0–1 strength score, and VADER handles sentiment across whatever the news is saying that day. Data comes in through yFinance and Google News RSS, models ship out via joblib. It's deployed — go break it.",
    metrics: [
      { value: "4+", label: "ML Models" },
      { value: "5", label: "API Endpoints" },
      { value: "Deployed on Render", label: "" },
    ],
    tech: ["Python", "FastAPI", "XGBoost", "Random Forest", "VADER NLP", "yFinance", "REST APIs", "Docker"],
    codeUrl: "https://github.com/SriramKancherla/AInvestify",
    liveUrl: "https://ainvestify.onrender.com",
    liveDomain: "ainvestify.onrender.com",
  },
  {
    title: "Shiksha Sahayak — Offline-First Education Management Console",
    period: "Sep 2025 — Nov 2025",
    categories: ["AI", "Full-Stack"],
    description:
      "An education management platform built for schools where the internet isn't a given. Everything runs locally, including the LLM. Teachers upload material and get worksheets and assessments back; students get a tutor that has actually read the material, thanks to FAISS semantic search. MySQL locally, Firebase for backup, JWT holding the doors.",
    metrics: [
      { value: "JWT Auth", label: "" },
      { value: "FAISS Search", label: "" },
      { value: "Local LLM Privacy", label: "" },
    ],
    tech: ["FastAPI", "Streamlit", "MySQL", "FAISS", "JWT", "Firebase"],
    codeUrl: "https://github.com/SriramKancherla/Shiksha-Sahayak",
  },
  {
    title: "Healthcare Analytics — IITK D&G Capstone",
    period: "Sep 2025 — Nov 2025",
    categories: ["ML", "Analytics"],
    description:
      "Predicts whether a patient is coming back within 30 days, using demographics, medical history, admission details, procedures, and discharge outcomes. The point is catching the high-risk cases before the readmission — and the cost — happens. Capstone for the IIT Kanpur E&ICT program.",
    metrics: [
      { value: "30-day", label: "Risk Window" },
      { value: "6+", label: "Data Sources" },
      { value: "IITK D&G", label: "Partner" },
    ],
    tech: ["Python", "scikit-learn", "Machine Learning", "Data Analytics"],
    codeUrl: "https://github.com/SriramKancherla/Healthcare-Management---IITK-D-G-Capstone-Project",
    certUrl: "/documents/iitk-dg-professional-certificate.pdf",
    certLabel: "Certificate",
  },
  {
    title: "Insider Threat Detection",
    period: "Aug 2025 — Oct 2025",
    categories: ["ML", "AI"],
    description:
      "User Behavior Analytics on the CERT Insider Threat dataset. Fused five log sources — logon, email, HTTP, file, and USB — into one view, then engineered features for the things people do when they're up to something: late-night USB usage, off-hours logins, non-HTTPS browsing, suspicious email attachments. Autoencoders, Isolation Forest, and LightGBM stacked into one hybrid anomaly pipeline.",
    metrics: [
      { value: "5", label: "Log Sources" },
      { value: "3", label: "Models" },
      { value: "120+", label: "Features" },
    ],
    tech: ["Python", "LightGBM", "Autoencoders", "Isolation Forest", "UBA"],
    certUrl: NUS_CREDENTIALS_URL,
    certLabel: "NUS Certificate",
  },
];

const filters: Category[] = ["All", "ML", "AI", "Analytics", "Full-Stack"];

export const Projects = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.categories.includes(active as Exclude<Category, "All">));

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="hairline" />
      <div className="section-container section-spacing">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div>
              <SectionEyebrow index="03">PROJECTS</SectionEyebrow>
              <h2
                id="projects-heading"
                style={{
                  fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "#F2F0ED",
                  marginBottom: "0.5rem",
                }}
              >
                Things I've built.
              </h2>
              <p style={{ color: "#8B8A87", fontSize: "1rem" }}>Five that were worth finishing.</p>
            </div>

            {/* Filter row */}
            <div className="flex flex-wrap gap-5" role="group" aria-label="Filter projects by category">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className="text-sm min-h-[44px] px-1 transition-colors duration-200 relative"
                  style={{
                    color: active === f ? "#D4A24C" : "#8B8A87",
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    letterSpacing: "0.05em",
                    borderBottom: active === f ? "2px solid #D4A24C" : "2px solid transparent",
                  }}
                  aria-pressed={active === f}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Project list */}
        {filtered.length === 0 ? (
          <Reveal>
            <p style={{ color: "#8B8A87", fontSize: "1rem", padding: "3rem 0" }}>
              Nothing under that one yet. Try another.
            </p>
          </Reveal>
        ) : (
          <div style={{ borderTop: "1px solid rgba(242,240,237,0.10)" }}>
            {filtered.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article
                  style={{
                    padding: "2.5rem 0",
                    borderBottom: "1px solid rgba(242,240,237,0.10)",
                  }}
                >
                  {/* Meta line */}
                  <p
                    style={{
                      fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#8B8A87",
                      marginBottom: "0.625rem",
                    }}
                  >
                    {p.period} · {p.categories.join(", ")}
                  </p>

                  {/* Title + live badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3
                      style={{
                        fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                        letterSpacing: "-0.02em",
                        color: "#F2F0ED",
                      }}
                    >
                      {p.title}
                    </h3>
                    {p.liveUrl && p.liveDomain && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="live-badge"
                        aria-label={`${p.title} — live at ${p.liveDomain}`}
                      >
                        <span className="live-dot" aria-hidden="true" />
                        LIVE
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "#8B8A87",
                      maxWidth: "68ch",
                      marginBottom: "1rem",
                    }}
                  >
                    {p.description}
                  </p>

                  {/* Metrics */}
                  <p
                    style={{
                      fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: "12px",
                      letterSpacing: "0.05em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {p.metrics.map((m, mi) => (
                      <span key={mi}>
                        {mi > 0 && <span style={{ color: "#8B8A87", margin: "0 0.5em" }}>·</span>}
                        <span style={{ color: "#F2F0ED" }}>{m.value}</span>
                        {m.label && <span style={{ color: "#8B8A87" }}> {m.label}</span>}
                      </span>
                    ))}
                  </p>

                  {/* Tech stack */}
                  <p
                    style={{
                      fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: "12px",
                      letterSpacing: "0.04em",
                      color: "#8B8A87",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {p.tech.join(" · ")}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap gap-5">
                    {p.codeUrl && (
                      <a
                        href={p.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                        style={{ color: "#D4A24C" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}
                      >
                        <Github size={14} aria-hidden="true" />
                        Code
                      </a>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                        style={{ color: "#D4A24C" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}
                      >
                        <ExternalLink size={14} aria-hidden="true" />
                        Live
                      </a>
                    )}
                    {p.certUrl && (
                      <a
                        href={p.certUrl}
                        target={p.certUrl.startsWith("http") ? "_blank" : undefined}
                        rel={p.certUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                        style={{ color: "#D4A24C" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}
                      >
                        <ExternalLink size={14} aria-hidden="true" />
                        {p.certLabel ?? "Certificate"}
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
