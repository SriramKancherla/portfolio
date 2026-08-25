"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { RESUME_PDF_URL } from "@/lib/site";

const RESUME_DOWNLOAD_NAME = "Sriram-Kancherla-Resume.pdf";

export function ResumeView() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#0A0A0B",
        color: "#F2F0ED",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(242,240,237,0.10)",
          padding: "1rem clamp(20px, 5vw, 64px)",
          flexShrink: 0,
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm min-h-[44px] transition-colors duration-200"
            style={{ color: "#8B8A87" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F2F0ED"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B8A87"; }}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back
          </Link>

          <div className="flex items-center gap-3">
            <h1
              style={{
                fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "1.125rem",
                letterSpacing: "-0.02em",
                color: "#F2F0ED",
              }}
            >
              Résumé
            </h1>
            <a
              href={RESUME_PDF_URL}
              download={RESUME_DOWNLOAD_NAME}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm min-h-[44px] transition-colors duration-200"
              style={{
                border: "1px solid #D4A24C",
                color: "#D4A24C",
                borderRadius: "6px",
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,162,76,0.10)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              <Download size={14} aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </div>
      </header>

      {/* PDF viewer — desktop */}
      <main
        style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1.5rem clamp(20px, 5vw, 64px)", paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>

          {/* Desktop: embedded PDF */}
          <div
            className="hidden md:flex"
            style={{
              flex: 1,
              flexDirection: "column",
              border: "1px solid rgba(242,240,237,0.10)",
              borderRadius: "12px",
              overflow: "hidden",
              minHeight: "75vh",
            }}
          >
            <iframe
              src={`${RESUME_PDF_URL}#view=FitH&toolbar=1&navpanes=0`}
              title="Sriram Kancherla Résumé"
              style={{ width: "100%", height: "100%", minHeight: "75vh", border: "none" }}
            />
          </div>

          {/* Mobile: open button */}
          <div
            className="flex md:hidden"
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              padding: "3rem 0",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(242,240,237,0.10)",
                borderRadius: "12px",
                padding: "2.5rem 2rem",
                textAlign: "center",
                maxWidth: "400px",
                width: "100%",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#D4A24C",
                  marginBottom: "1rem",
                }}
              >
                PDF
              </p>
              <p
                style={{
                  color: "#8B8A87",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  marginBottom: "1.75rem",
                }}
              >
                Inline PDF embedding is unreliable on mobile. Open it directly for the best experience.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href={RESUME_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 text-sm min-h-[44px] w-full transition-colors duration-200"
                  style={{
                    background: "rgba(212,162,76,0.10)",
                    border: "1px solid #D4A24C",
                    borderRadius: "8px",
                    color: "#D4A24C",
                    fontWeight: 500,
                  }}
                >
                  Open PDF
                </a>
                <a
                  href={RESUME_PDF_URL}
                  download={RESUME_DOWNLOAD_NAME}
                  className="inline-flex items-center justify-center gap-2 py-3 text-sm min-h-[44px] w-full transition-colors duration-200"
                  style={{
                    border: "1px solid rgba(242,240,237,0.10)",
                    borderRadius: "8px",
                    color: "#8B8A87",
                  }}
                >
                  <Download size={15} aria-hidden="true" />
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
