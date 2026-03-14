import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import JarvisChatbot from "@/components/JarvisChatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aniket Verma | Senior Software Engineer",
  description: "Senior Software Engineer Portfolio - AI/ML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} font-sans antialiased selection:bg-slate-900 selection:text-white`}
      >
        {children}
        <JarvisChatbot />
      </body>
    </html>
  );
}
