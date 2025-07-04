import "./styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ScrollReset from "../components/ScrollReset";
import { PreferencesProvider } from "../context/PreferencesContext";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Image from "next/image";
import ResourcePreloader from "../components/ResourcePreloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://emiliofunes-portfolio.vercel.app'),
  title: {
    default: "Emilio Funes | Fullstack Engineer, Cloud & DevOps | Soluciones Escalables",
    template: "%s | Emilio Funes - Fullstack Engineer, Cloud & DevOps"
  },
  description: "Portfolio profesional de Emilio Funes, ingeniero fullstack especializado en cloud, DevOps y arquitectura escalable. Proyectos, experiencia y contacto.",
  keywords: [
    "fullstack engineer",
    "cloud engineer",
    "devops",
    "arquitectura escalable",
    "next.js",
    "react",
    "typescript",
    "java",
    "spring boot",
    "python",
    "django",
    "php",
    "laravel",
    "fastapi",
    "docker",
    "aws",
    "portfolio profesional",
    "ingeniero software",
    "proyectos tech",
    "open source",
    "consultoría tech",
    "desarrollo web",
    "emilio funes"
  ],
  authors: [{ name: "Emilio Funes", url: "https://emiliofunes-portfolio.vercel.app" }],
  creator: "Emilio Funes",
  publisher: "Emilio Funes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Emilio Funes | Fullstack Engineer, Cloud & DevOps | Scalable Solutions",
    description: "Professional portfolio of Emilio Funes, fullstack engineer specialized in cloud, DevOps, and scalable architecture. Projects, experience, and contact.",
    url: "https://emiliofunes-portfolio.vercel.app/",
    siteName: "Emilio Funes Portfolio",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Emilio Funes - Fullstack Engineer, Cloud & DevOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emilio Funes | Fullstack Engineer, Cloud & DevOps | Scalable Solutions",
    description: "Professional portfolio of Emilio Funes, fullstack engineer specialized in cloud, DevOps, and scalable architecture. Projects, experience, and contact.",
    creator: "@emiliofunesdev",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "tu-codigo-de-verificacion-google",
  },
  alternates: {
    canonical: "https://emiliofunes-portfolio.vercel.app/",
    languages: {
      'es-ES': 'https://emiliofunes-portfolio.vercel.app/',
      'en-US': 'https://emiliofunes-portfolio.vercel.app/?lang=en',
    },
  },
};

// Estructura de datos JSON-LD para mejor SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Emilio Funes",
  "jobTitle": "Backend Developer",
  "description": "Desarrollador Backend especializado en Java Spring Boot, PHP Laravel y desarrollo de APIs RESTful",
  "url": "https://emiliofunes-portfolio.vercel.app",
  "sameAs": [
    "https://github.com/EmiFunes91",
    "https://www.linkedin.com/in/emilio-funes-8b140b21a/"
  ],
  "knowsAbout": [
    "Java",
    "Spring Boot", 
    "PHP",
    "Laravel",
    "PostgreSQL",
    "MySQL",
    "REST APIs",
    "JWT Authentication",
    "Docker",
    "Git"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AR"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen">
      <head>
        {/* Estructura de datos JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Favicon y manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7RQ5532SW4"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7RQ5532SW4');
          `}
        </Script>

        {/* Hreflang para SEO internacional */}
        <link rel="alternate" href="https://emiliofunes-portfolio.vercel.app/" hrefLang="es" />
        <link rel="alternate" href="https://emiliofunes-portfolio.vercel.app/?lang=en" hrefLang="en" />
      </head>
      <body>
        <PreferencesProvider>
          <ResourcePreloader 
            fonts={[
              'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
            ]}
          />
          <ScrollReset />
          {children}
          <Analytics />
        </PreferencesProvider>
      </body>
    </html>
  );
}
