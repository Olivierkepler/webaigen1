import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import CustomCursor from "./components/CustomCursor";
import CookieConsent from "./components/CookieConsent";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
  variable: "--font-montserrat",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

/* --- WebAiGen SEO + Branding --- */
export const metadata: Metadata = {
  title: {
    default: "WebAiGen | AI-Powered Web Creation",
    template: "%s | WebAiGen",
  },
  description:
    "WebAiGen is an AI-powered platform that designs, builds, and launches modern websites, products, and digital experiences in seconds. Faster development. Smarter design. Infinite possibilities.",
  keywords: [
    "AI website builder",
    "AI web development",
    "WebAiGen",
    "AI design platform",
    "automated web creation",
    "Next.js AI tools",
    "AI product generation",
  ],
  authors: [{ name: "WebAiGen Team" }],
  creator: "WebAiGen",
  metadataBase: new URL("https://webaigen.com"),
  openGraph: {
    title: "WebAiGen | Build the Future with AI",
    description:
      "Create powerful websites and digital products instantly using AI. WebAiGen transforms ideas into production-ready experiences.",
    url: "https://webaigen.com",
    siteName: "WebAiGen",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/favicon_black_multi.ico" },
      { url: "/images/favicon_32_black.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/images/favicon_black_multi.ico",
    apple: "/images/favicon_32_black.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${cormorant.variable}`}
    >
      <body
        className="min-h-screen bg-white text-black antialiased cursor-none selection:bg-[#d4af37] selection:text-black dark:bg-[#050505] dark:text-white"
      >
        <Providers>
          <CustomCursor />

          <main className="min-h-screen">
            {children}
          </main>

          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}