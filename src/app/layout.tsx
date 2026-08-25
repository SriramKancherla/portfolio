import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Providers } from "@/components/Providers";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio7967.builtwithrocket.new").replace(/\/$/, "");

const description =
  "I build machine learning systems that have to survive contact with production — mostly in finance, healthcare, and security. A couple of them are live right now.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sriram Kancherla — ML Engineer & Data Analyst",
  description,
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sriram Kancherla — ML Engineer & Data Analyst",
    description,
    type: "website",
    siteName: "Sriram Kancherla",
    locale: "en_IN",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sriram Kancherla — ML Engineer & Data Analyst",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sriram Kancherla — ML Engineer & Data Analyst",
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sriram Kancherla",
  jobTitle: "ML Engineer & Data Analyst",
  worksFor: {
    "@type": "Organization",
    name: "FlyRank AI",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Vellore Institute of Technology",
  },
  url: siteUrl,
  sameAs: [GITHUB_URL, LINKEDIN_URL, `mailto:${EMAIL}`],
  knowsAbout: ["Machine Learning", "Data Analytics", "Computer Vision", "NLP", "Full-Stack AI", "Python", "FastAPI", "Docker"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} style={{ backgroundColor: "#0A0A0B" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fportfolio7967back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></head>
      <body style={{ backgroundColor: "#0A0A0B", color: "#F2F0ED" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
