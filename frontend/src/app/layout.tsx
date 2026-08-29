import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";

import { Providers } from "@/components/Providers";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const DEFAULT_SITE_URL = "https://sriramkancherla.pages.dev";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");

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
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
      style={{ backgroundColor: "#08111C" }}
    >
      <body style={{ backgroundColor: "#08111C", color: "#E8EEF5" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
