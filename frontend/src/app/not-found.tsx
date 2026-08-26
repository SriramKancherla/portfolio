import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0A0A0B",
        padding: "clamp(20px, 5vw, 64px)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#D4A24C",
            marginBottom: "1.5rem",
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#F2F0ED",
            marginBottom: "1rem",
          }}
        >
          Nothing here.
        </h1>
        <p
          style={{
            color: "#8B8A87",
            fontSize: "1rem",
            lineHeight: 1.65,
            marginBottom: "2rem",
          }}
        >
          That page doesn't exist. Here's the way back.
        </p>
        <Link
          href="/"
          style={{
            color: "#D4A24C",
            fontSize: "0.9375rem",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          ← Home
        </Link>
      </div>
    </div>
  );
}
