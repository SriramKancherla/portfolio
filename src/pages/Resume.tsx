import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FluidBackground } from "@/components/FluidBackground";
import { RESUME_PDF_URL } from "@/lib/site";

const Resume = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <FluidBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="container py-6">
          <div className="flex items-center justify-between gap-4">
            <Button asChild variant="ghost" className="hover:bg-card/60">
              <Link to="/">
                <ArrowLeft size={16} className="mr-2" />
                Back to Portfolio
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText size={16} className="text-primary" />
              <span className="font-display font-semibold text-foreground">Sriram Kancherla</span>
              <span className="hidden sm:inline">· Resume</span>
            </div>
          </div>
        </header>

        <main className="container flex-1 pb-8">
          <div className="glass-strong rounded-2xl overflow-hidden h-[calc(100vh-8rem)] min-h-[500px]">
            <iframe
              src={`${RESUME_PDF_URL}#view=FitH`}
              title="Sriram Kancherla Resume"
              className="w-full h-full border-0 bg-card/20"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resume;
