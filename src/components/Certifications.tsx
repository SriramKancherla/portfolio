import { Award, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    title: "Professional Certificate in Data Analytics and Generative AI",
    issuer: "E&ICT Academy, IIT Kanpur",
    date: "Dec 2025",
    url: "/documents/iitk-dg-professional-certificate.pdf",
  },
  {
    title: "Business Analytics with Excel",
    issuer: "E&ICT Academy, IIT Kanpur",
    date: "2025",
    url: "/documents/iitk-dg-business-analytics-excel.pdf",
  },
  {
    title: "ETL (Extract, Transform, Load)",
    issuer: "E&ICT Academy, IIT Kanpur",
    date: "2025",
    url: "/documents/iitk-dg-etl.pdf",
  },
  {
    title: "Oracle Cloud Infrastructure Generative AI Professional",
    issuer: "Oracle",
    date: "Jul 2025",
    url: "/documents/oci-genai-professional.pdf",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI · Coursera",
    date: "May 2025",
    url: "/documents/supervised-ml-coursera.pdf",
  },
  {
    title: "NumPy",
    issuer: "CodeChef",
    date: "Mar 2025",
    url: "https://codechef.com/certificates/public/508d224",
  },
  {
    title: "Pandas",
    issuer: "CodeChef",
    date: "Mar 2025",
    url: "https://codechef.com/certificates/public/84eb5d2",
  },
  {
    title: "AWS AI Practitioner Challenge",
    issuer: "Amazon Web Services",
    date: "Jun 2025",
    url: "/documents/aws-ai-practitioner.pdf",
  },
  {
    title: "Docker Foundations Professional",
    issuer: "Docker",
    date: "Mar 2025",
    url: "/documents/docker-foundations.pdf",
  },
  {
    title: "Foundations of GenAI",
    issuer: "Udacity",
    date: "Dec 2024",
    url: "/documents/foundations-genai-udacity.pdf",
  },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="section-fluid relative py-28">
      <div className="container">
        <Reveal>
          <div className="mb-14 max-w-3xl">
            <p className="mono text-xs text-primary mb-3">// 05 — credentials</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications & achievements.</h2>
            <p className="text-lg text-muted-foreground">
              Verified credentials from IIT Kanpur, Oracle, AWS, and more — with downloadable certificates from my personal records.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 60}>
              <div className="glass rounded-2xl p-6 h-full hover-lift fluid-glow relative overflow-hidden group">
                <div className="absolute top-0 right-0 mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-bl-lg bg-primary/10 text-primary border-l border-b border-primary/30">
                  {it.date}
                </div>
                <Award className="text-primary mb-4 group-hover:scale-110 transition-transform duration-500" size={28} />
                <h3 className="font-semibold mb-2 leading-snug pr-8">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{it.issuer}</p>
                <a
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline transition-all duration-300"
                >
                  <ExternalLink size={12} /> View Certificate
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
