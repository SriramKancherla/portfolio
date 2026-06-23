import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_PAGE_PATH } from "@/lib/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = ({ visible = true }: { visible?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 pt-[env(safe-area-inset-top)] ${
        scrolled ? "py-3" : "py-4 sm:py-5"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="container">
        <nav
          className={`flex items-center justify-between rounded-2xl px-3 sm:px-5 py-3 transition-all ${
            scrolled ? "glass-strong" : "bg-transparent"
          }`}
        >
          <a href="#hero" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
              SK
            </span>
            <span className="hidden sm:inline">Sriram Kancherla</span>
          </a>

          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="story-link hover:text-foreground transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button asChild size="sm" variant="default" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
              <Link to={RESUME_PAGE_PATH}>Resume</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-5 animate-fade-in max-h-[calc(100dvh-6rem)] overflow-y-auto">
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-muted-foreground hover:text-foreground py-1"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to={RESUME_PAGE_PATH}
                  onClick={() => setOpen(false)}
                  className="block text-primary font-medium py-1"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
