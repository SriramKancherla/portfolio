import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const Contact = () => {
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string).trim();
    const email = (data.get("email") as string).trim();
    const subject = (data.get("subject") as string).trim();
    const message = (data.get("message") as string).trim();

    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error("Contact form is not configured yet.", {
        description: `Please email me directly at ${EMAIL}`,
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject: subject || "Portfolio contact",
          message,
          replyto: email,
          from_name: "Portfolio — Sriram Kancherla",
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to send message.");
      }

      toast.success("Message sent!", {
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
      form.reset();
    } catch {
      toast.error("Couldn't send your message.", {
        description: `Try again or email me at ${EMAIL}`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-fluid relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <Reveal>
            <div>
              <SectionEyebrow>Contact</SectionEyebrow>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's build something <span className="text-gradient">together.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I'm open to internships, full-time roles, research collaborations, and interesting projects
                in machine learning, data analytics, and AI engineering. Based in Vellore, Tamil Nadu.
              </p>

              <div className="space-y-3">
                {[
                  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
                  { icon: Linkedin, label: "linkedin.com/in/sriram-kancherla", href: LINKEDIN_URL },
                  { icon: Github, label: "github.com/sriramkancherla", href: GITHUB_URL },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={c.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-4 glass rounded-xl p-4 hover-lift fluid-glow group"
                  >
                    <div className="grid place-items-center h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:scale-110 transition-transform duration-500">
                      <c.icon size={18} className="text-primary" />
                    </div>
                    <span className="text-sm text-foreground/90 group-hover:text-primary transition-colors duration-300">{c.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 md:p-8 space-y-5 fluid-glow" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="bg-card/40 border-border transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                    onChange={() => emailError && setEmailError("")}
                    className={`bg-card/40 border-border transition-all duration-300 focus:scale-[1.02] ${
                      emailError ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                  />
                  {emailError && (
                    <p id="email-error" className="text-xs text-destructive">
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  placeholder="What's this about?"
                  className="bg-card/40 border-border transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me a bit more..."
                  className="bg-card/40 border-border resize-none transition-all duration-300 focus:scale-[1.01]"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Your email is required so I can reply to you directly.
              </p>
              <Button
                type="submit"
                disabled={sending}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 glow transition-all duration-500 hover:scale-[1.02]"
              >
                {sending ? "Sending..." : (<><Send size={16} className="mr-2" /> Send Message</>)}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
