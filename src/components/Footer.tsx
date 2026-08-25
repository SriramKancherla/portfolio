"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { StrawHat } from "./StrawHat";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, ROLE_LINE } from "@/lib/site";

export const Footer = () => {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className="relative z-10"
      style={{
        borderTop: "1px solid rgba(242,240,237,0.10)",
        paddingTop: "2.5rem",
        paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

          {/* Left: name + role */}
          <div>
            <div
              className="inline-flex items-center gap-2 mb-1"
              style={{
                fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#F2F0ED",
              }}
            >
              Sriram Kancherla
              <span
                className="footer-hat"
                title="One Piece is real"
                aria-label="One Piece is real"
              >
                <StrawHat className="w-5 h-4" style={{}} />
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.06em",
                color: "#8B8A87",
              }}
            >
              {ROLE_LINE} · VIT Vellore
            </p>
          </div>

          {/* Center: social icons */}
          <div className="flex items-center gap-5">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: "#8B8A87" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#D4A24C"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B8A87"; }}
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: "#8B8A87" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#D4A24C"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B8A87"; }}
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: "#8B8A87" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#D4A24C"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B8A87"; }}
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>

          {/* Right: copyright */}
          <p
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.05em",
              color: "#8B8A87",
            }}
          >
            © {year} Sriram Kancherla
          </p>
        </div>
      </div>
    </footer>
  );
};
