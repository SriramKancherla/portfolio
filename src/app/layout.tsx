import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import { ROLE_LINE } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://sriramkancherla.pages.dev").replace(
  /\/$/,
  "",
);

const description = `${ROLE_LINE} — Portfolio of Sriram Kancherla, CS undergrad at VIT Vellore. ML, data analytics, and full-stack AI projects.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sriram Kancherla :D",
  description,
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Sriram Kancherla — ${ROLE_LINE}`,
    description: `${ROLE_LINE} — Portfolio of Sriram Kancherla, CS undergrad at VIT Vellore.`,
    type: "website",
    siteName: "Sriram Kancherla",
    locale: "en_IN",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Sriram Kancherla — ${ROLE_LINE}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sriram Kancherla — ${ROLE_LINE}`,
    description: `${ROLE_LINE} — Portfolio of Sriram Kancherla, CS undergrad at VIT Vellore.`,
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
  jobTitle: "ML Intern",
  worksFor: {
    "@type": "Organization",
    name: "FlyRank AI",
  },
  url: "https://www.linkedin.com/in/sriram-kancherla-80a7b028a/",
  alumniOf: "Vellore Institute of Technology",
  knowsAbout: ["Machine Learning", "Data Analytics", "Computer Vision", "Full-Stack AI", "Python"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fportfolio7967back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}
