import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import MotionProvider from "@/components/providers/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import BackToTop from "@/components/ui/back-to-top";
import ScrollProgress from "@/components/ui/scroll-progress";
import AmbientBackground from "@/components/ui/ambient-background";
import ScrollBird from "@/components/ui/scroll-bird";
import { profile, seo, site } from "@/content/site";
import { DEFAULT_THEME, themeInitScript } from "@/lib/themes";

import "./globals.css";

/**
 * Three faces, three jobs, no overlap:
 *   Fraunces          — display. A variable serif with real character, so the
 *                       headings carry the identity instead of a gradient.
 *   Instrument Sans   — body. Modern neo-grotesque, deliberately unlike the
 *                       serif so the pairing reads.
 *   JetBrains Mono    — code. Used only where the content *is* code.
 */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s | ${profile.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: seo.title,
    description: seo.description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f2f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e12" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-ink">
        {/* Applies the saved theme before first paint to avoid a colour flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        <ThemeProvider>
          <MotionProvider>
            <AmbientBackground />
            <ScrollBird />
            <ScrollProgress />

            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
            >
              Skip to content
            </a>

            <Navbar />

            <main id="main" className="flex-1">
              {children}
            </main>

            <Footer />
            <BackToTop />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
