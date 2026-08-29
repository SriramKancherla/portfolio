"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

type CategoryId = "ml-data" | "analytics" | "backend" | "databases" | "cloud" | "devops" | "frontend-other";

type Category = {
  id: CategoryId;
  label: string;
  skills: string[];
};

const categories: Category[] = [
  {
    id: "ml-data",
    label: "ML & Data",
    skills: [
      "Python", "Machine Learning", "Deep Learning", "Computer Vision", "NLP",
      "TensorFlow", "PyTorch", "scikit-learn", "XGBoost", "LightGBM",
      "Random Forest", "OpenCV", "Pandas", "NumPy", "EDA", "ETL", "Big Data", "Joblib",
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    skills: ["Data Analytics", "Data Acquisition", "Data Manipulation", "Data Modeling", "Tableau", "Excel", "SQL"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Python", "FastAPI", "Streamlit", "Node.js", "JavaScript", "REST APIs", "Postman API", "JWT", "Firebase"],
  },
  {
    id: "databases",
    label: "Databases",
    skills: ["MySQL", "SQL", "FAISS"],
  },
  {
    id: "cloud",
    label: "Cloud",
    skills: ["AWS", "Azure", "Oracle Cloud Infrastructure (OCI)", "AWS Glue", "Amazon S3"],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: ["Docker", "Git", "GitHub", "CI/CD"],
  },
  {
    id: "frontend-other",
    label: "Frontend & Other",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "React Native", "Java", "C", "C++", "MATLAB"],
  },
];

type SkillEntry = { name: string; categories: CategoryId[] };

/**
 * One tag per skill, in first-seen order, carrying every category it belongs to
 * so a skill in two categories lights up for both.
 */
/**
 * Deterministic PRNG. The order MUST be identical on the server and the client,
 * so this cannot use Math.random() — that would desync hydration and reshuffle
 * the grid on every re-render, including every hover.
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Chosen by scoring seeds for the most even spread of every category's tags. */
const SHUFFLE_SEED = 394;

const skillPool: SkillEntry[] = (() => {
  const map = new Map<string, CategoryId[]>();
  for (const cat of categories) {
    for (const skill of cat.skills) {
      const cats = map.get(skill) ?? [];
      if (!cats.includes(cat.id)) cats.push(cat.id);
      map.set(skill, cats);
    }
  }

  // Category order would light up one solid block on hover. Scatter it once,
  // at module scope, so the highlight reads as a constellation across the grid.
  const pool = Array.from(map, ([name, cats]) => ({ name, categories: cats }));
  const random = mulberry32(SHUFFLE_SEED);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
})();

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="section-container section-spacing">
        <Reveal>
          <SectionEyebrow index="04">SKILLS</SectionEyebrow>
          <h2
            id="skills-heading"
            style={{
              fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#E8EEF5",
              marginBottom: "3rem",
            }}
          >
            The stack.
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Left: category list */}
            <div className="flex flex-col gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = cat.skills.length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className="text-left p-4 transition-all duration-200 min-h-[44px]"
                    style={{
                      border: isActive ? "1px solid #4DA3FF" : "1px solid rgba(232,238,245,0.10)",
                      background: isActive ? "rgba(77,163,255,0.08)" : "#0F1B2A",
                      boxShadow: "inset 0 1px 0 rgba(232,238,245,0.07)",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setActiveCategory(cat.id)}
                    onMouseLeave={() => setActiveCategory(null)}
                    onFocus={() => setActiveCategory(cat.id)}
                    onBlur={() => setActiveCategory(null)}
                    // Tap toggles on touch, where there is no hover.
                    onClick={() => setActiveCategory((current) => (current === cat.id ? null : cat.id))}
                    aria-pressed={isActive}
                  >
                    <p
                      style={{
                        color: isActive ? "#E8EEF5" : "#8697AD",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        transition: "color 200ms ease",
                        marginBottom: "2px",
                      }}
                    >
                      {cat.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                        fontSize: "11px",
                        letterSpacing: "0.06em",
                        color: isActive ? "#4DA3FF" : "rgba(134,151,173,0.6)",
                        transition: "color 200ms ease",
                      }}
                    >
                      {count} {count === 1 ? "tool" : "tools"}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: the full pool, always visible — nothing scrolls out of reach */}
            <div
              style={{
                border: "1px solid rgba(232,238,245,0.10)",
                borderRadius: "20px",
                background: "#0F1B2A",
                boxShadow: "inset 0 1px 0 rgba(232,238,245,0.07)",
                padding: "1.75rem",
              }}
            >
              <div className="flex flex-wrap gap-2">
                {skillPool.map((skill) => {
                  const matches = activeCategory !== null && skill.categories.includes(activeCategory);
                  const dimmed = activeCategory !== null && !matches;
                  return (
                    <span
                      key={skill.name}
                      style={{
                        fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                        fontSize: "12px",
                        letterSpacing: "0.04em",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: matches ? "1px solid #4DA3FF" : "1px solid rgba(232,238,245,0.10)",
                        color: matches ? "#4DA3FF" : "#E8EEF5",
                        opacity: dimmed ? 0.28 : 1,
                        transform: matches ? "translateY(-1px)" : "none",
                        transition: "opacity 200ms ease, border-color 200ms ease, color 200ms ease, transform 200ms ease",
                        cursor: "default",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
