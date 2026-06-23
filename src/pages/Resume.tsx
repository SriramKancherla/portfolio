import { Link } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/AuroraBackground";
import { RESUME_PDF_URL } from "@/lib/site";

const RESUME_DOWNLOAD_NAME = "Sriram-Kancherla-Resume.pdf";
const PDF_EMBED_SRC = `${RESUME_PDF_URL}#view=FitH&toolbar=1&navpanes=0`;

const Resume = () => {
  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground overflow-x-hidden flex flex-col">
      <AuroraBackground />
      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        <header className="shrink-0 container px-4 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:pb-4">
          <div className="max-w-6xl mx-auto flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button asChild variant="ghost" size="sm" className="w-fit hover:bg-card/60 -ml-2 sm:ml-0">
                <Link to="/">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Portfolio
                </Link>
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0 order-3 w-full sm:order-none sm:w-auto sm:flex-1 sm:justify-center">
                <FileText size={16} className="text-primary shrink-0" />
                <span className="font-display font-semibold text-foreground truncate">Sriram Kancherla</span>
                <span className="shrink-0">· Resume</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button asChild size="sm" variant="outline" className="border-border bg-card/40 hidden sm:inline-flex">
                  <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} className="mr-1.5" />
                    <span className="hidden sm:inline">Open</span>
                    <span className="sm:hidden">Open PDF</span>
                  </a>
                </Button>
                <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
                  <a href={RESUME_PDF_URL} download={RESUME_DOWNLOAD_NAME}>
                    <Download size={14} className="mr-1.5" />
                    <span className="hidden sm:inline">Download</span>
                    <span className="sm:hidden">Save</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col min-h-0 container px-4 sm:px-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex-1 flex flex-col min-h-0 w-full max-w-6xl mx-auto">
            {/* Desktop / tablet: inline PDF viewer */}
            <div className="hidden md:flex flex-1 min-h-0 flex-col">
              <div className="flex-1 min-h-0 glass-strong rounded-2xl overflow-hidden border border-border/60">
                <iframe
                  src={PDF_EMBED_SRC}
                  title="Sriram Kancherla Resume"
                  className="w-full h-full min-h-[480px] border-0 bg-card/20"
                />
              </div>
            </div>

            {/* Phone: native viewer works more reliably than a small iframe */}
            <div className="flex md:hidden flex-1 flex-col justify-center gap-6 py-4 min-h-0">
              <div className="glass-strong rounded-2xl border border-border/60 p-6 sm:p-8 text-center">
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                  <FileText size={32} className="text-primary" />
                </div>
                <h1 className="text-xl font-display font-bold mb-2">Sriram Kancherla</h1>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  View the full resume in your browser&apos;s PDF reader for the best experience on mobile.
                </p>
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
                    <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2" />
                      Open Resume
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full border-border bg-card/40">
                    <a href={RESUME_PDF_URL} download={RESUME_DOWNLOAD_NAME}>
                      <Download size={16} className="mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground px-2">
                Tip: On iPhone, use <span className="text-foreground/80">Open Resume</span> to view full-screen with pinch-to-zoom.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resume;
