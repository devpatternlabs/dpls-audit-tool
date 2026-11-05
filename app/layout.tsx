import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "PatternAudit | Dev Pattern Labs - Comparative Architecture Teardown",
  description:
    "Complete technical teardown, bottleneck diagnosis, and custom Next.js 15 architecture roadmap. See your website's real-time metrics vs. after Dev Pattern Labs re-engineers it.",
  keywords: [
    "Next.js audit",
    "Core Web Vitals teardown",
    "website performance audit",
    "architecture blueprint",
    "Dev Pattern Labs",
    "14-day development sprint",
    "Next.js 15 optimization",
  ],
  authors: [{ name: "Dev Pattern Labs", url: "https://devpatternlabs.com" }],
  openGraph: {
    type: "website",
    title: "PatternAudit | Dev Pattern Labs - Comparative Architecture Teardown",
    description:
      "See your current performance, UX bottlenecks, and manual leaks vs. the exact state after Dev Pattern Labs re-engineers it into a 100/100 Core Web Vitals Next.js 15 platform.",
    url: "https://audit.devpatternlabs.com",
    siteName: "PatternAudit by Dev Pattern Labs",
    images: [
      {
        url: "https://devpatternlabs.com/images/dev-pattern-labs-web-development-agency.webp",
        alt: "Dev Pattern Labs Comparative Architecture Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PatternAudit | Comparative Architecture Teardown by Dev Pattern Labs",
    description:
      "Complete technical teardown and custom Next.js 15 architecture roadmap for your product or workflow.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b13",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#070b13] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
