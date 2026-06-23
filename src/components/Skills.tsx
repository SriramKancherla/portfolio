import { Brain, BarChart3, Cloud, Code2, LineChart } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

const groups = [
  {
    icon: Brain,
    title: "Machine Learning & AI",
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "XGBoost",
      "LightGBM",
      "scikit-learn",
      "NLP",
      "Computer Vision",
      "OpenCV",
      "Joblib",
      "Generative AI",
      "FAISS",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    skills: [
      "Pandas",
      "NumPy",
      "SQL",
      "Tableau",
      "EDA",
      "Excel",
      "ETL",
      "Data Modeling",
      "Statistics",
      "Sentiment Analysis",
      "Anomaly Detection",
    ],
  },
  {
    icon: LineChart,
    title: "Finance & Applications",
    skills: [
      "Financial Analysis",
      "Stock Analytics",
      "Risk Modeling",
      "Healthcare Analytics",
      "Cybersecurity Analytics",
      "UBA",
      "Time Series",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Tools",
    skills: ["AWS", "OCI", "AWS Glue", "Amazon S3", "Docker", "Git", "GitHub", "Postman API", "REST APIs"],
  },
  {
    icon: Code2,
    title: "Software Development",
    skills: [
      "FastAPI",
      "Streamlit",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
      "C",
      "C++",
      "Java",
      "MATLAB",
    ],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="section-fluid relative">
      <div className="container">
        <Reveal>
          <div className="mb-14 max-w-3xl">
            <SectionEyebrow>Skills</SectionEyebrow>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & technologies.</h2>
            <p className="text-lg text-muted-foreground">
              Tools and technologies I use regularly — aligned with my LinkedIn profile and project work.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="glass rounded-2xl p-6 h-full hover-lift fluid-glow group">
                <div className="inline-grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-5 group-hover:scale-110 transition-transform duration-500">
                  <g.icon className="text-primary" size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-4">{g.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="mono text-[11px] px-2 py-1 rounded-md bg-secondary/60 border border-border text-foreground/85 hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                    >
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
