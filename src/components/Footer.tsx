import { Github, Linkedin, Mail } from "lucide-react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, ROLE_LINE } from "@/lib/site";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 mt-12 sm:mt-20 py-10 sm:py-12 z-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="font-display font-semibold">Sriram Kancherla</div>
            <div className="text-xs text-muted-foreground mono">{ROLE_LINE} · VIT Vellore</div>
          </div>

          <div className="flex items-center gap-5">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={18} />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={18} />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Sriram Kancherla. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
