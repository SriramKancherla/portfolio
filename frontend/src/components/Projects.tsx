"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
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
  detail: { problem: string; approach: string; status: string };
};

const projects: Project[] = [
  {
    title: "Image Based Wafer Map Pattern Intelligence",
    period: "Feb 2026 — Apr 2026",
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
    detail: {
      problem:
        "Wafer maps come off different lines at different die counts, and the public datasets sit in a legacy format. Every map has to be normalised onto a common grid before a model sees it — without flattening the spatial signature that identifies the defect in the first place.",
      approach:
        "A CNN over normalised die maps across 8+ labelled defect classes, split 80/20 for train and test. OpenCV handles resizing and augmentation. Evaluation is a per-class confusion matrix rather than one accuracy number, because the classes are badly imbalanced and the rare defects are exactly the ones that cost yield.",
      status: "Built February to April 2026. Code on GitHub.",
    },
  },
  {
    title: "AInvestify — AI Stock Screener",
    period: "Dec 2025 — Present",
    categories: ["ML", "Full-Stack", "Analytics"],
    description:
      "An AI stock screener that reads the fundamentals and the news at the same time, then calls a stock strong or weak. A Random Forest classifier rates the fundamentals good or bad, an XGBoost regressor turns that into a 0–1 strength score, and VADER handles sentiment across whatever the news is saying that day. Data comes in through yFinance and Google News RSS, models ship out via joblib. The hosted demo is offline while the pipeline is being reworked — the code is on GitHub.",
    metrics: [
      { value: "4+", label: "ML Models" },
      { value: "5", label: "API Endpoints" },
      { value: "Rebuilding", label: "Hosted Demo" },
    ],
    tech: ["Python", "FastAPI", "XGBoost", "Random Forest", "VADER NLP", "yFinance", "REST APIs", "Docker"],
    codeUrl: "https://github.com/SriramKancherla/AInvestify",
    detail: {
      problem:
        "Fundamentals and sentiment normally get analysed separately, so a screener can call a company cheap on the same day the news says otherwise. Putting both on one scale is the whole problem.",
      approach:
        "A Random Forest classifies fundamentals as good or bad; an XGBoost regressor turns that into a 0–1 strength score. VADER scores sentiment over headlines pulled from Google News RSS, fundamentals come in through yFinance, and trained models ship as joblib artefacts behind FastAPI endpoints.",
      status: "Hosted demo is offline while the pipeline is reworked. Code on GitHub.",
    },
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
    detail: {
      problem:
        "Most ed-tech assumes reliable internet and a cloud LLM. Schools without either get nothing at all — which is most of the ones that would benefit the most.",
      approach:
        "Everything runs on local infrastructure: a self-hosted LLM, FAISS for semantic search across uploaded material, MySQL for records, JWT for auth. Firebase is a backup target rather than a dependency. Teachers upload material and get worksheets and assessments back; students query a tutor that has actually read it.",
      status: "Built September to November 2025. Code on GitHub.",
    },
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
    detail: {
      problem:
        "Readmission inside 30 days is expensive and often preventable, but the risk is spread thin across demographics, medical history, admission details, procedures and discharge outcomes. No single field predicts it.",
      approach:
        "Feature engineering across 6+ data sources into one patient-level view, then supervised classification against a 30-day readmission label — so the output is a ranked risk list a hospital can act on rather than a score in isolation.",
      status: "Capstone for the IIT Kanpur E&ICT programme. Code and certificate linked above.",
    },
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
    detail: {
      problem:
        "Insider threats look like ordinary activity in any single log. The signal only shows up when logon, email, HTTP, file and USB activity are read as one behavioural timeline per user.",
      approach:
        "Five CERT log sources fused into a unified per-user dataset, then 120+ behavioural features engineered on top — late-night USB usage, off-hours logins, non-HTTPS browsing, suspicious attachments. Three models stacked: an autoencoder for reconstruction error, Isolation Forest for density-based outliers, and LightGBM for supervised ranking.",
      status: "Done during the NUS academic internship. Certificate linked above.",
    },
    certLabel: "NUS Certificate",
  },
];

const filters: Category[] = ["All", "ML", "AI", "Analytics", "Full-Stack"];

// Parse leading integer from a metric value string
function parseLeadingInt(val: string): { prefix: string; num: number; suffix: string } | null {
  const match = val.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { prefix: "", num: parseInt(match[1], 10), suffix: match[2] };
}

// Animated metric counter
function MetricCounter({ value, label, animate }: { value: string; label: string; animate: boolean }) {
  const parsed = parseLeadingInt(value);
  const [displayed, setDisplayed] = useState(parsed ? 0 : null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animate || !parsed) return;
    const duration = 900;
    const target = parsed.num;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [animate, parsed?.num]);

  const shown = parsed
    ? `${parsed.prefix}${animate ? displayed : parsed.num}${parsed.suffix}`
    : value;

  return (
    <div>
      <div className="metric-value" style={{ color: "#E8EEF5", fontSize: "1.0625rem", lineHeight: 1.2 }}>
        {shown}
      </div>
      {label && (
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            fontSize: "10.5px",
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            color: "#8697AD",
            marginTop: "2px",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

/** One accent link with an icon — used for Code / Live / Certificate. */
function CardLink({ href, icon: Icon, children }: { href: string; icon: typeof Github; children: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 text-sm hover:underline transition-colors duration-200"
      style={{ color: "#4DA3FF" }}
    >
      <Icon size={14} aria-hidden="true" />
      {children}
    </a>
  );
}

// Project card with cursor spotlight
function ProjectCard({ p }: { p: Project; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const cardRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      el.classList.add("spotlight-active");
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    cardRef.current?.classList.remove("spotlight-active");
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: "2rem 2.5rem",
        marginBottom: "1.5rem",
        border: "1px solid rgba(232,238,245,0.10)",
        borderRadius: "20px",
        background: "#0F1B2A",
        boxShadow: "inset 0 1px 0 rgba(232,238,245,0.07)",
        transition: "border-color 250ms cubic-bezier(0.16, 1, 0.3, 1), background-color 250ms cubic-bezier(0.16, 1, 0.3, 1), transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(77,163,255,0.45)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "#16293D";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseOut={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,238,245,0.10)";
          (e.currentTarget as HTMLElement).style.backgroundColor = "#0F1B2A";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }
      }}
    >
      {/* Cursor spotlight pseudo-element via inline style */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: "radial-gradient(400px circle at var(--mx, -400px) var(--my, -400px), rgba(77,163,255,0.08), transparent 40%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Two columns: prose left, figures right — the old single column left
          roughly 40% of every card empty at desktop widths. */}
      <div
        className="relative grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_230px]"
        style={{ zIndex: 1 }}
      >
        <div>
          {/* Meta line */}
          <p
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8697AD",
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
                fontSize: "1.3125rem",
                letterSpacing: "-0.02em",
                color: "#E8EEF5",
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
              lineHeight: 1.7,
              color: "#8697AD",
              marginBottom: "1.25rem",
            }}
          >
            {p.description}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-5">
            {p.codeUrl && <CardLink href={p.codeUrl} icon={Github}>Code</CardLink>}
            {p.liveUrl && <CardLink href={p.liveUrl} icon={ExternalLink}>Live</CardLink>}
            {p.certUrl && (
              <CardLink href={p.certUrl} icon={ExternalLink}>{p.certLabel ?? "Certificate"}</CardLink>
            )}
          </div>

          {/* Expand in place — the card holds a second, deeper layer. */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={`${slug}-detail`}
            className="mt-5 inline-flex items-center gap-1.5 min-h-[44px]"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: expanded ? "#4DA3FF" : "#8697AD",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 200ms ease",
            }}
          >
            {expanded ? "Close" : "How it works"}
            <ChevronDown
              size={13}
              aria-hidden="true"
              style={{
                transform: expanded ? "rotate(180deg)" : "none",
                transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </button>

          {/* 0fr -> 1fr animates height with no JS measurement. */}
          <div
            id={`${slug}-detail`}
            style={{
              display: "grid",
              gridTemplateRows: expanded ? "1fr" : "0fr",
              transition: "grid-template-rows 380ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <div
                className="mt-4 pt-5 flex flex-col gap-4"
                style={{ borderTop: "1px solid rgba(232,238,245,0.10)" }}
              >
                {([
                  ["The problem", p.detail.problem],
                  ["How it works", p.detail.approach],
                  ["Where it stands", p.detail.status],
                ] as const).map(([heading, body]) => (
                  <div key={heading}>
                    <p
                      style={{
                        fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                        fontSize: "10.5px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#4DA3FF",
                        marginBottom: "5px",
                      }}
                    >
                      {heading}
                    </p>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#8697AD" }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right rail — figures and stack */}
        <div
          className="lg:border-l lg:pl-8"
          style={{ borderColor: "rgba(232,238,245,0.10)" }}
        >
          <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 lg:flex-col lg:gap-4">
            {p.metrics.map((m, mi) => (
              <MetricCounter key={mi} value={m.value} label={m.label} animate={inView} />
            ))}
          </div>

          <div
            className="mt-5 pt-5 flex flex-wrap gap-1.5"
            style={{ borderTop: "1px solid rgba(232,238,245,0.10)" }}
          >
            {p.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  fontSize: "10.5px",
                  letterSpacing: "0.03em",
                  color: "#8697AD",
                  border: "1px solid rgba(232,238,245,0.10)",
                  borderRadius: "5px",
                  padding: "3px 7px",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export const Projects = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.categories.includes(active as Exclude<Category, "All">));

  return (
    <section id="projects" aria-labelledby="projects-heading">
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
                  fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "#E8EEF5",
                  marginBottom: "0.5rem",
                }}
              >
                Things I've built.
              </h2>
              <p style={{ color: "#8697AD", fontSize: "1rem" }}>Five worth showing. Code for every one of them is on GitHub.</p>
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
                    color: active === f ? "#4DA3FF" : "#8697AD",
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    letterSpacing: "0.05em",
                    borderBottom: active === f ? "2px solid #4DA3FF" : "2px solid transparent",
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
            <p style={{ color: "#8697AD", fontSize: "1rem", padding: "3rem 0" }}>
              Nothing under that one yet. Try another.
            </p>
          </Reveal>
        ) : (
          <div>
            {filtered.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <ProjectCard p={p} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
