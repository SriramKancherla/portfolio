import { ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services",
    date: "Aug 2026",
    url: "https://cp.certmetrics.com/amazon/en/public/verify/credential/4b4952d39ea84a0981cc3f9784f87c4b",
  },
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "Jul 2026",
    url: "https://learn.microsoft.com/en-us/users/sriramkancherla-7782/credentials/dfc1c2459573f240",
  },
  {
    title: "Docker Foundations Professional",
    issuer: "Docker",
    date: "Mar 2026",
    url: "/documents/docker-foundations.pdf",
  },
  {
    title: "Professional Certificate in Data Analytics and Generative AI",
    issuer: "E&ICT Academy, IIT Kanpur",
    date: "Dec 2025",
    url: "/documents/iitk-dg-professional-certificate.pdf",
  },
  {
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "Aug 2025",
    // Verifies without the identity__email query param, so the address stays private.
    url: "https://badges.parchment.com/public/assertions/oLU0Ia-kQOqkxFDZW5DYHQ",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    date: "Jul 2025",
    url: "/documents/oci-genai-professional.pdf",
  },
  {
    title: "AWS AI Practitioner Challenge",
    issuer: "Amazon Web Services",
    date: "Jun 2025",
    url: "/documents/aws-ai-practitioner.pdf",
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
    title: "Foundations of GenAI",
    issuer: "Udacity",
    date: "Dec 2024",
    url: "/documents/foundations-genai-udacity.pdf",
  },
];

export const Certifications = () => {
  return (
    <section id="certifications" aria-labelledby="certifications-heading">
      <div className="section-container section-spacing">
        <Reveal>
          <SectionEyebrow index="05">CERTIFICATIONS</SectionEyebrow>
          <h2
            id="certifications-heading"
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
            Certifications.
          </h2>
          <p style={{ color: "#8697AD", fontSize: "1rem", marginBottom: "2.5rem" }}>
            The receipts. Newest first.
          </p>
        </Reveal>

        {/* Divided list */}
        <ul
          style={{ borderTop: "1px solid rgba(232,238,245,0.10)" }}
          aria-label="Certifications list"
        >
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 40}>
              <li
                style={{
                  borderBottom: "1px solid rgba(232,238,245,0.10)",
                  transition: "background-color 200ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#0F1B2A"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                <div
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  style={{ padding: "1.25rem 0.75rem" }}
                >
                  {/* Left: title + issuer */}
                  <div className="min-w-0">
                    <p
                      style={{
                        color: "#E8EEF5",
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        lineHeight: 1.4,
                        marginBottom: "2px",
                      }}
                    >
                      {cert.title}
                    </p>
                    <p
                      style={{
                        color: "#8697AD",
                        fontSize: "0.8125rem",
                      }}
                    >
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Right: date + link */}
                  <div className="flex items-center gap-5 shrink-0">
                    <span
                      style={{
                        fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                        fontSize: "11px",
                        letterSpacing: "0.06em",
                        color: "#8697AD",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cert.date}
                    </span>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm transition-colors duration-200 min-h-[44px]"
                      style={{ color: "#4DA3FF" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}
                      aria-label={`View certificate: ${cert.title}`}
                    >
                      View <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
