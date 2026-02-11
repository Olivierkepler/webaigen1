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
    icon: "/images/webaigen_cropped.png",
    shortcut: "/images/webaigen_cropped.png",
    apple: "/images/webaigen_cropped.png"}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body
        className={`bg-[#050505] text-white antialiased cursor-none selection:bg-[#d4af37] selection:text-black`}
      >
        {/* Global Components: These stay active across all routes */}
        <CustomCursor />
        <Navbar />
        
        {/* Page Content: Injected from app/page.tsx or subfolders */}
        {children}
      </body>
    </html>
  );
}