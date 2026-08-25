"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 } as const;
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "1px solid rgba(232,238,245,0.10)",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "#E8EEF5",
  fontSize: "0.9375rem",
  outline: "none",
  transition: "border-color 200ms ease",
  fontFamily: "var(--font-sans), 'Inter', sans-serif",
};

export const Contact = () => {
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getFocusStyle = (fieldName: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focusedField === fieldName ? "#4DA3FF" : "rgba(232,238,245,0.10)",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string).trim();
    const email = (data.get("email") as string).trim();
    const subject = (data.get("subject") as string).trim();
    const message = (data.get("message") as string).trim();
    const botcheck = (data.get("botcheck") as string).trim();

    // Honeypot
    if (botcheck) return;

    if (!email) { setEmailError("Email is required."); return; }
    if (!isValidEmail(email)) { setEmailError("Please enter a valid email address."); return; }
    setEmailError("");

    if (name.length > LIMITS.name || email.length > LIMITS.email || subject.length > LIMITS.subject || message.length > LIMITS.message) {
      toast.error("That didn't send. Email me directly instead.", { description: "One of the fields is too long." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, subject: subject || "Portfolio contact", message, botcheck }),
      });

      const result = await res.json().catch(() => ({} as { success?: boolean; message?: string }));

      if (!res.ok || !result.success) {
        if (res.status === 503) {
          window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject || "Portfolio contact")}&body=${encodeURIComponent(message)}`;
          return;
        }
        throw new Error(result.message || "Failed to send.");
      }

      toast.success("Sent. I'll get back to you.");
      form.reset();
    } catch {
      toast.error("That didn't send. Email me directly instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="hairline" />
      <div className="section-container section-spacing">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl">

          {/* Left: pitch + links */}
          <Reveal>
            <div>
              <SectionEyebrow index="06">CONTACT</SectionEyebrow>
              <h2
                id="contact-heading"
                style={{
                  fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "#E8EEF5",
                  marginBottom: "1.25rem",
                }}
              >
                Let's build something.
              </h2>
              <p
                style={{
                  maxWidth: "52ch",
                  lineHeight: 1.65,
                  color: "#8697AD",
                  fontSize: "1rem",
                  marginBottom: "2rem",
                }}
              >
                Open to full-time roles, research collaborations, or a project that just sounds fun. Based in Vellore, and I reply faster than you'd expect.
              </p>

              {/* Direct links */}
              <div className="flex flex-col gap-4">
                {[
                  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}`, ariaLabel: "Send email" },
                  { icon: Linkedin, label: "LinkedIn", href: LINKEDIN_URL, ariaLabel: "LinkedIn profile" },
                  { icon: Github, label: "github.com/sriramkancherla", href: GITHUB_URL, ariaLabel: "GitHub profile" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-3 text-sm min-h-[44px] transition-colors duration-200"
                    style={{ color: "#E8EEF5" }}
                    aria-label={link.ariaLabel}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#4DA3FF"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#E8EEF5"; }}
                  >
                    <link.icon size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: contact form */}
          <Reveal delay={120}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="card-bordered p-6 md:p-8"
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {/* Honeypot */}
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    style={{ display: "block", fontSize: "0.8125rem", color: "#8697AD", marginBottom: "6px" }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={LIMITS.name}
                    placeholder="Your name"
                    style={getFocusStyle("name")}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{ display: "block", fontSize: "0.8125rem", color: "#8697AD", marginBottom: "6px" }}
                  >
                    Email <span style={{ color: "#4DA3FF" }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={LIMITS.email}
                    autoComplete="email"
                    placeholder="you@email.com"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                    onChange={() => emailError && setEmailError("")}
                    style={{
                      ...getFocusStyle("email"),
                      borderColor: emailError ? "#ef4444" : focusedField === "email" ? "#4DA3FF" : "rgba(232,238,245,0.10)",
                    }}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {emailError && (
                    <p id="email-error" style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "4px" }}>
                      {emailError}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  style={{ display: "block", fontSize: "0.8125rem", color: "#8697AD", marginBottom: "6px" }}
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  maxLength={LIMITS.subject}
                  placeholder="What's this about?"
                  style={getFocusStyle("subject")}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{ display: "block", fontSize: "0.8125rem", color: "#8697AD", marginBottom: "6px" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={LIMITS.message}
                  placeholder="Tell me a bit more..."
                  style={{
                    ...getFocusStyle("message"),
                    resize: "none",
                    borderColor: focusedField === "message" ? "#4DA3FF" : "rgba(232,238,245,0.10)",
                  }}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-medium min-h-[44px] transition-all duration-200"
                style={{
                  background: sending ? "rgba(77,163,255,0.15)" : "rgba(77,163,255,0.10)",
                  border: "1px solid #4DA3FF",
                  borderRadius: "8px",
                  color: "#4DA3FF",
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.7 : 1,
                }}
              >
                {sending ? (
                  <>
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        border: "2px solid rgba(77,163,255,0.3)",
                        borderTopColor: "#4DA3FF",
                        borderRadius: "9999px",
                        animation: "spin 0.7s linear infinite",
                        display: "inline-block",
                      }}
                      aria-hidden="true"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} aria-hidden="true" />
                    Send
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};
