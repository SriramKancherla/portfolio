import { GraduationCap, Target, Code2, Languages } from "lucide-react";
import { Reveal } from "./Reveal";

export const About = () => {
  return (
    <section id="about" className="section-fluid relative py-28">
      <div className="container">
        <Reveal>
          <div className="max-w-3xl mb-16">
            <p className="mono text-xs text-primary mb-3">// 01 — about</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Curious by nature.<br />
              <span className="text-gradient">Engineer by craft.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a Computer Science undergraduate at VIT Vellore (2023–2027), passionate about
              machine learning, data analytics, and building production-ready AI systems. From
              insider threat detection to semiconductor wafer classification, I turn complex
              datasets into actionable insights.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: GraduationCap,
              title: "Education",
              body: "B.Tech in Computer Science & Engineering at VIT Vellore (Aug 2023 – Aug 2027). Coursework in DSA, OOP, NLP, and AI/ML.",
            },
            {
              icon: Code2,
              title: "Focus Areas",
              body: "Computer vision, anomaly detection, NLP & sentiment analysis, full-stack ML apps with FastAPI and Docker.",
            },
            {
              icon: Target,
              title: "Goal",
              body: "Ship impactful AI products in industry — combining rigorous ML engineering with clean, scalable software design.",
            },
            {
              icon: Languages,
              title: "Languages",
              body: "English, Telugu & Tamil (native). Hindi & French (elementary).",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <div className="glass rounded-2xl p-7 h-full hover-lift fluid-glow group">
                <div className="inline-grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-5 group-hover:scale-110 transition-transform duration-500">
                  <card.icon className="text-primary" size={22} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
