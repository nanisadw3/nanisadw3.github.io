import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://inakisobera.me"),
  title: "Iñaki Sobera Sotomayor | Software Developer Portfolio",
  description: "Portafolio profesional de Iñaki Sobera Sotomayor, Desarrollador de Software especializado en Backend, IA y Ciberseguridad. Graduado en Ingeniería en Sistemas Computacionales.",
  keywords: ["Iñaki Sobera Sotomayor", "Software Developer", "Backend Developer", "Java", "Python", "IA", "Ciberseguridad", "Portafolio"],
  authors: [{ name: "Iñaki Sobera Sotomayor" }],
  openGraph: {
    title: "Iñaki Sobera Sotomayor | Software Developer",
    description: "Desarrollador de Software apasionado por la innovación y la resolución de problemas complejos.",
    url: "https://inakisobera.me",
    siteName: "Iñaki Sobera Portfolio",
    images: [
      {
        url: "/portfolio-2.jpg",
        width: 800,
        height: 800,
        alt: "Iñaki Sobera Sotomayor",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iñaki Sobera Sotomayor | Software Developer",
    description: "Desarrollador de Software apasionado por la innovación.",
    images: ["/portfolio-2.jpg"],
  },
  alternates: {
    canonical: "https://inakisobera.me",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Iñaki Sobera Sotomayor",
  "jobTitle": "Software Developer",
  "url": "https://inakisobera.me",
  "sameAs": [
    "https://www.linkedin.com/in/inakisobera/",
    "https://github.com/nanisadw3",
    "https://x.com/InakiSobera"
  ],
  "knowsAbout": ["Software Development", "Backend Development", "Artificial Intelligence", "Cybersecurity", "Java", "Python", "Linux"],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "UNITEC Campus Atizapán"
  }
};

export const viewport: Viewport = {
  themeColor: "#020202",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth bg-[#020202]">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} text-white antialiased bg-[#020202]`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
