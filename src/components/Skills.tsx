import { Brain, BarChart3, Cloud, Code2 } from "lucide-react";
import { Reveal } from "./Reveal";

const groups = [
  {
    icon: Brain,
    title: "Machine Learning & AI",
    skills: ["Python", "PyTorch", "TensorFlow", "XGBoost", "LightGBM", "scikit-learn", "NLP", "Joblib"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    skills: ["Pandas", "NumPy", "SQL", "Tableau", "EDA", "Excel", "ETL", "Data Modeling"],
  },
  {
    icon: Cloud,
    title: "Cloud & Tools",
    skills: ["AWS", "OCI", "AWS Glue", "Amazon S3", "Docker", "Git", "GitHub", "Postman API"],
  },
  {
    icon: Code2,
    title: "Software Development",
    skills: ["FastAPI", "Streamlit", "MySQL", "C", "C++", "Java", "JavaScript", "MATLAB"],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="section-fluid relative py-28">
      <div className="container">
        <Reveal>
          <div className="mb-14 max-w-3xl">
            <p className="mono text-xs text-primary mb-3">// 04 — toolbox</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & technologies.</h2>
            <p className="text-lg text-muted-foreground">
              The stack I use to ship ML pipelines, analytics dashboards, and full-stack AI applications.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <div className="glass rounded-2xl p-6 h-full hover-lift fluid-glow group">
                <div className="inline-grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-5 group-hover:scale-110 transition-transform duration-500">
                  <g.icon className="text-primary" size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-4">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span key={s} className="mono text-xs px-2.5 py-1 rounded-md bg-secondary/60 border border-border text-foreground/85 hover:border-primary/50 hover:text-primary hover:scale-105 transition-all duration-300 cursor-default">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
