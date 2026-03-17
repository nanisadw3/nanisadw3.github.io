import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Background from "@/components/ui/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iñaki Sobera - Software Developer",
  description: "Portafolio profesional de Iñaki Sobera, apasionado por la programación, IA y ciberseguridad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Background />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
