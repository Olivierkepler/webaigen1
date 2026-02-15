import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import CookieConsent from "./components/CookieConsent"; // <--- 1. IMPORT ADDED

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
  metadataBase: new URL("https://webaigen.com"), // update if different
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
    /* Dark futuristic base to prevent mobile white flash */
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorant.variable} bg-[#050505]`}
    >
      <body
        className="bg-[#050505] text-white antialiased cursor-none selection:bg-[#d4af37] selection:text-black min-h-screen"
      >
        <CustomCursor />
        <Navbar />

        {/* Main ensures full viewport coverage */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* 2. COMPONENT ADDED HERE */}
        <CookieConsent />
      </body>
    </html>
  );
}