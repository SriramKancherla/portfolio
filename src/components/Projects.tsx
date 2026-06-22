import { useState } from "react";
import { Github, ExternalLink, TrendingUp, Shield, Activity, Cpu, BookOpen } from "lucide-react";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";

type Category = "All" | "ML" | "Analytics" | "AI" | "Full-Stack";

const projects = [
  {
    title: "Image Based Wafer Map Pattern Intelligence",
    period: "Feb 2026 — Present",
    category: ["ML", "AI"] as Category[],
    icon: Cpu,
    description:
      "End-to-end computer vision pipeline classifying silicon semiconductor wafer defect patterns using a CNN. Handles variable wafer sizes, legacy dataset formats, and evaluates performance with confusion matrices — tackling real ML engineering challenges in semiconductor yield analysis.",
    tech: ["Python", "PyTorch", "OpenCV", "NumPy", "Pandas", "scikit-learn"],
    metrics: [
      { label: "Defect Classes", value: "8+" },
      { label: "Train/Test Split", value: "80/20" },
      { label: "Domain", value: "Semiconductor" },
    ],
    accent: "from-violet-500/20 to-cyan-500/20",
  },
  {
    title: "Ainvestify — Stock Insights",
    period: "Dec 2025 — Present",
    category: ["ML", "Full-Stack", "Analytics"] as Category[],
    icon: TrendingUp,
    description:
      "Full-stack stock analysis web app combining ML, sentiment analysis, and real-time visualization. Multi-model scoring with Random Forest, XGBoost, and Neural Networks for fundamentals; Logistic Regression + TF-IDF for news sentiment. Containerized with Docker and deployed on Render.",
    tech: ["Python", "FastAPI", "XGBoost", "TensorFlow", "Docker", "REST APIs"],
    metrics: [
      { label: "ML Models", value: "4+" },
      { label: "API Endpoints", value: "5" },
      { label: "Deployed", value: "Render" },
    ],
    accent: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "Shiksha Sahayak",
    period: "Feb 2026",
    category: ["AI", "Full-Stack"] as Category[],
    icon: BookOpen,
    description:
      "Full-stack learning platform running entirely on local infrastructure with a locally hosted LLM. Teachers upload study material to auto-generate worksheets and assessments; students interact with a context-aware AI tutor powered by FAISS semantic search and embeddings.",
    tech: ["FastAPI", "Streamlit", "MySQL", "FAISS", "JWT", "Firebase"],
    metrics: [
      { label: "Auth", value: "JWT" },
      { label: "Search", value: "FAISS" },
      { label: "Privacy", value: "Local LLM" },
    ],
    accent: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Healthcare Analytics — IITK D&G Capstone",
    period: "Sep 2025 — Nov 2025",
    category: ["ML", "Analytics"] as Category[],
    icon: Activity,
    description:
      "Healthcare analytics project predicting 30-day hospital readmission risk using patient demographics, medical history, admission details, procedures, and discharge outcomes — helping hospitals identify high-risk patients and reduce avoidable costs.",
    tech: ["Machine Learning", "Data Analytics", "Python", "scikit-learn"],
    metrics: [
      { label: "Risk Window", value: "30 days" },
      { label: "Data Sources", value: "6+" },
      { label: "Partner", value: "IITK D&G" },
    ],
    accent: "from-rose-500/20 to-violet-500/20",
  },
  {
    title: "Insider Threat Detection",
    period: "Aug 2025 — Oct 2025",
    category: ["ML", "AI"] as Category[],
    icon: Shield,
    description:
      "User Behavior Analytics (UBA) system using the CERT Insider Threat dataset. Fused logon, email, HTTP, file, and USB logs into a unified dataset, engineered behavioral features, and built a hybrid anomaly pipeline with Autoencoders, Isolation Forest, and LightGBM.",
    tech: ["Python", "LightGBM", "Autoencoders", "Isolation Forest", "UBA"],
    metrics: [
      { label: "Log Sources", value: "5" },
      { label: "Models", value: "3" },
      { label: "Features", value: "120+" },
    ],
    accent: "from-cyan-500/20 to-blue-500/20",
  },
];

const filters: Category[] = ["All", "ML", "AI", "Analytics", "Full-Stack"];

export const Projects = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <section id="projects" className="section-fluid relative py-28">
      <div className="container">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 max-w-5xl">
            <div>
              <p className="mono text-xs text-primary mb-3">// 03 — featured projects</p>
              <h2 className="text-4xl md:text-5xl font-bold">Things I've built.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-500 border ${
                    active === f
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-transparent glow scale-105"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-105"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="group relative glass rounded-3xl p-6 md:p-8 hover-lift fluid-glow overflow-hidden">
                <div className={`absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-50 group-hover:opacity-90 transition-opacity duration-700`} aria-hidden="true" />
                <div className="relative grid md:grid-cols-[1fr,auto] gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:scale-110 transition-transform duration-500">
                        <p.icon className="text-primary" size={20} />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.category.map((c) => (
                          <span key={c} className="mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-secondary/60 text-muted-foreground border border-border">
                            {c}
                          </span>
                        ))}
                        <span className="mono text-[10px] px-2 py-1 rounded text-primary/80">{p.period}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3 group-hover:text-gradient transition-all duration-500">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tech.map((t) => (
                        <span key={t} className="mono text-xs px-2.5 py-1 rounded-md bg-card/60 border border-border text-foreground/80 hover:border-primary/40 transition-colors duration-300">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button asChild size="sm" variant="outline" className="border-border bg-card/40 transition-all duration-300 hover:scale-105">
                        <a href="https://github.com/sriramkancherla" target="_blank" rel="noopener noreferrer" aria-label={`${p.title} GitHub`}>
                          <Github size={14} className="mr-1" /> Code
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="ghost" className="transition-all duration-300 hover:scale-105">
                        <a href="https://www.linkedin.com/in/sriram-kancherla-80a7b028a/" target="_blank" rel="noopener noreferrer" aria-label={`${p.title} details`}>
                          <ExternalLink size={14} className="mr-1" /> Details
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:min-w-[180px]">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="glass-strong rounded-xl p-3 text-center md:text-left transition-all duration-500 hover:scale-105">
                        <div className="text-xl md:text-2xl font-bold text-gradient font-display">{m.value}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
