"use client";

import { useEffect, useState } from "react";
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
    skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "NLP", "EDA", "ETL", "Big Data", "Joblib"],
  },
  {
    id: "analytics",
    label: "Analytics",
    skills: ["Data Analytics", "Data Acquisition", "Data Manipulation", "Data Modeling", "Tableau", "Excel", "SQL"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Python", "FastAPI", "Node.js", "JavaScript", "REST APIs", "Postman API", "Firebase"],
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

// Build deduplicated skill pool with category memberships
type SkillEntry = { name: string; categories: CategoryId[] };

const buildSkillPool = (): SkillEntry[] => {
  const map = new Map<string, CategoryId[]>();
  for (const cat of categories) {
    for (const skill of cat.skills) {
      if (!map.has(skill)) map.set(skill, []);
      const cats = map.get(skill)!;
      if (!cats.includes(cat.id)) cats.push(cat.id);
    }
  }
  return Array.from(map.entries()).map(([name, cats]) => ({ name, categories: cats }));
};

const skillPool = buildSkillPool();

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="hairline" />
      <div className="section-container section-spacing">
        <Reveal>
          <SectionEyebrow index="04">SKILLS</SectionEyebrow>
          <h2
            id="skills-heading"
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
            The stack.
          </h2>
          <p style={{ color: "#8B8A87", fontSize: "1rem", marginBottom: "3rem" }}>
            Hover a category. Everything else gets out of the way.
          </p>
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
                    className="text-left p-4 rounded-xl transition-all duration-200 min-h-[44px]"
                    style={{
                      border: isActive
                        ? "1px solid #D4A24C" :"1px solid rgba(242,240,237,0.10)",
                      background: isActive ? "rgba(212,162,76,0.08)" : "transparent",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setActiveCategory(cat.id)}
                    onMouseLeave={() => setActiveCategory(null)}
                    onFocus={() => setActiveCategory(cat.id)}
                    onBlur={() => setActiveCategory(null)}
                    aria-pressed={isActive}
                  >
                    <p
                      style={{
                        color: isActive ? "#F2F0ED" : "#8B8A87",
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
                        color: isActive ? "#D4A24C" : "rgba(139,138,135,0.6)",
                        transition: "color 200ms ease",
                      }}
                    >
                      {count} {count === 1 ? "tool" : "tools"}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: skill tags panel */}
            <div
              className="card-bordered p-6"
              style={{ minHeight: "320px" }}
            >
              <div className="flex flex-wrap gap-2">
                {mounted && skillPool.map((skill) => {
                  const isHighlighted = activeCategory === null || skill.categories.includes(activeCategory);
                  const isActive = activeCategory !== null && skill.categories.includes(activeCategory);
                  return (
                    <span
                      key={skill.name}
                      style={{
                        fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                        fontSize: "12px",
                        letterSpacing: "0.04em",
                        padding: "5px 12px",
                        borderRadius: "6px",
                        border: isActive
                          ? "1px solid #D4A24C" :"1px solid rgba(242,240,237,0.10)",
                        color: isHighlighted ? "#F2F0ED" : "rgba(139,138,135,0.30)",
                        opacity: isHighlighted ? 1 : 0.3,
                        transform: isActive ? "translateY(-1px)" : "none",
                        transition: "all 200ms ease",
                        cursor: "default",
                      }}
                    >
                      {skill.name}
                    </span>
                  );
                })}
                {!mounted && skillPool.map((skill) => (
                  <span
                    key={skill.name}
                    style={{
                      fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: "12px",
                      letterSpacing: "0.04em",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(242,240,237,0.10)",
                      color: "#F2F0ED",
                      cursor: "default",
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
