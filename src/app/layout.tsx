import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono, Geist } from "next/font/google";
import { Footer } from "@/components/Footer";
import { CursorDot } from "@/components/CursorDot";
import { BackToTopButton } from "@/components/BackToTopButton";
import { Header } from "@/components/Header";
import SplashCursor from "@/components/SplashCursor";
import { siteConfig } from "@/lib/data";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "CODELOGIX Solutions | Premium Tech Training & Digital Solutions",
    template: "%s | CODELOGIX Solutions",
  },
  description: siteConfig.description,
  keywords: ["CODELOGIX Solutions", "online courses Pakistan", "web development course", "AI solutions", "tech training", "internship", "Azadi Sale courses"],
  authors: [{ name: "CODELOGIX Solutions", url: siteConfig.url }],
  creator: "CODELOGIX Solutions",
  publisher: "CODELOGIX Solutions",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "CODELOGIX Solutions",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "CODELOGIX Solutions",
    locale: "en_US",
    images: [{ url: "/og-codelogix.svg", width: 1200, height: 630, alt: "CODELOGIX Solutions" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CODELOGIX Solutions",
    description: siteConfig.description,
    images: ["/og-codelogix.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/codelogix-logo.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: [
      siteConfig.socials.linkedin,
      siteConfig.socials.instagram,
      siteConfig.socials.tiktok,
      siteConfig.socials.github,
      siteConfig.socials.facebook,
    ],
  };

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", manrope.variable, ibmPlexMono.variable, "font-sans", geist.variable)}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8127671738814319"
          crossOrigin="anonymous"
        />

        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#1268f4"
        />
        <CursorDot />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
