import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "600"],
  variable: "--font-montserrat",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "MONOLITH | Global Architectural Archive",
  description: "A cinematic digital archive of global brutalist and modern architecture.",
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
    /* Added bg-black to html to fix mobile overscroll "white flash" */
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable} bg-[#050505]`}>
      <body
        className={`bg-[#050505] text-white antialiased cursor-none selection:bg-[#d4af37] selection:text-black min-h-screen`}
      >
        <CustomCursor />
        <Navbar />
        
        {/* main tag ensures the content area at least fills the mobile viewport */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}