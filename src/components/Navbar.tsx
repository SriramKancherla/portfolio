"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { RESUME_PAGE_PATH } from "@/lib/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = ["about", "experience", "projects", "skills", "certifications", "contact"];

export const Navbar = ({ visible = true }: { visible?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const entries = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (obs) => {
        obs.forEach((entry) => {
          entries.set(entry.target.id, entry.intersectionRatio);
        });
        let best = "";
        let bestRatio = 0;
        entries.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActiveSection(best);
      },
      { threshold: [0, 0.1, 0.25, 0.5], rootMargin: "-10% 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [visible]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)]"
      style={{
        opacity: mounted ? (visible ? 1 : 0) : 1,
        transform: mounted ? (visible ? "translateY(0)" : "translateY(-12px)") : "translateY(0)",
        pointerEvents: mounted ? (visible ? "auto" : "none") : "auto",
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="transition-all duration-400"
        style={{
          backdropFilter: scrolled ? "blur(12px)" : "none",
          backgroundColor: scrolled ? "rgba(10,10,11,0.72)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(242,240,237,0.10)" : "1px solid transparent",
          transition: "backdrop-filter 400ms ease, background-color 400ms ease, border-color 400ms ease",
        }}
      >
        <div className="section-container">
          <nav
            className="flex items-center justify-between py-4"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] rounded-sm"
              aria-label="Sriram Kancherla — home"
            >
              <span
                className="grid h-8 w-8 place-items-center text-xs font-semibold"
                style={{
                  border: "1px solid #D4A24C",
                  color: "#D4A24C",
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  letterSpacing: "0.05em",
                  borderRadius: "4px",
                }}
              >
                SK
              </span>
              <span
                className="hidden sm:inline text-sm font-medium"
                style={{ color: "#F2F0ED", fontFamily: "var(--font-display), 'Inter Tight', sans-serif" }}
              >
                Sriram Kancherla
              </span>
            </a>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-7" role="list">
              {links.map((l) => {
                const sectionId = l.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`nav-link${isActive ? " active" : ""}`}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Résumé button */}
            <div className="hidden md:block">
              <Link
                href={RESUME_PAGE_PATH}
                className="text-sm px-4 py-2 rounded-sm transition-colors duration-200"
                style={{
                  border: "1px solid #D4A24C",
                  color: "#D4A24C",
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,162,76,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                Résumé
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              style={{ color: "#F2F0ED" }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div
          className="md:hidden fixed inset-0 top-[57px] z-40"
          style={{ backgroundColor: "#0A0A0B", borderTop: "1px solid rgba(242,240,237,0.10)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="section-container py-8">
            <ul className="flex flex-col gap-1" role="list">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-base min-h-[44px] flex items-center transition-colors duration-200"
                    style={{
                      color: "#8B8A87",
                      borderBottom: "1px solid rgba(242,240,237,0.06)",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F2F0ED"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B8A87"; }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-6">
                <Link
                  href={RESUME_PAGE_PATH}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center px-5 py-3 text-sm min-h-[44px]"
                  style={{
                    border: "1px solid #D4A24C",
                    color: "#D4A24C",
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    letterSpacing: "0.05em",
                    borderRadius: "4px",
                  }}
                >
                  Résumé
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};
