import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import GlobalProviders from "@/components/providers/GlobalProviders";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pratibha Agrawal | AI & ML Student",
  description: "AI/ML student portfolio with computer vision hand control — navigate with gestures via webcam. Projects, skills, certificates & contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full font-sans bg-plum text-[#FAF7F2]">
        <GlobalProviders>
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
