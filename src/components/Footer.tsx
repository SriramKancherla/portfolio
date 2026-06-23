import { Github, Linkedin, Mail } from "lucide-react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, ROLE_LINE } from "@/lib/site";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 mt-12 sm:mt-20 py-10 sm:py-12 z-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
              SK
            </span>
            <div>
              <div className="font-display font-semibold">Sriram Kancherla</div>
              <div className="text-xs text-muted-foreground mono">{ROLE_LINE} · VIT Vellore</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid place-items-center h-10 w-10 rounded-lg glass hover:text-primary hover:border-primary/40 hover:scale-110 transition-all duration-300">
              <Github size={18} />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid place-items-center h-10 w-10 rounded-lg glass hover:text-primary hover:border-primary/40 hover:scale-110 transition-all duration-300">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="grid place-items-center h-10 w-10 rounded-lg glass hover:text-primary hover:border-primary/40 hover:scale-110 transition-all duration-300">
              <Mail size={18} />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Sriram Kancherla. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
