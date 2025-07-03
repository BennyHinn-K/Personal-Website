import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "BENNYHINN - Full Stack Developer | Android Engineer | Creative Designer",
  description: "Futuristic portfolio of BENNYHINN - Expert in Full Stack Development, Android Engineering, Web Design, Graphic Design, and AI Integration. Available for hire in Nairobi, Kenya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("🚀 BENNYHINN Portfolio - Beast Mode Activated!");
  
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="theme-color" content="#00FFFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-cyber-dark text-cyber-silver antialiased`}>
        {children}
      </body>
    </html>
  );
}