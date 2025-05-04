import "./styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ScrollReset from "../components/ScrollReset";
import { PreferencesProvider } from "../context/PreferencesContext";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Portfolio Emilio Funes",
  description: "Desarrollador Backend | Java, Spring Boot, PHP, Laravel",
  openGraph: {
    title: "Portfolio Emilio Funes",
    description:
      "Demostración profesional de proyectos backend con Java, Spring Boot, PHP y Laravel.",
    url: "https://emiliofunes-portfolio.vercel.app/",
    siteName: "Emilio Funes Portfolio",
    images: [
      {
        url: "https://emiliofunes-portfolio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Emilio Funes Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Emilio Funes",
    description: "Proyectos backend con Java, Spring Boot, PHP, Laravel y más.",
    images: ["https://emiliofunes-portfolio.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth h-full">
      <head>
        {/* Favicon y manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-180x180.png" />
        <link rel="icon" href="/icons/icon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/icons/icon-16x16.png" sizes="16x16" />
        <meta name="theme-color" content="#0f172a" />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7RQ5532SW4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7RQ5532SW4');
          `}
        </Script>
        <noscript>
          <img
            src="https://www.googletagmanager.com/ns.html?id=G-7RQ5532SW4"
            alt=""
            style={{ display: "none" }}
          />
        </noscript>
      </head>
      <body
        className={`
          ${inter.variable}
          font-sans antialiased
          transition-colors duration-500
          overflow-x-hidden max-w-full h-full
          bg-white text-gray-900 dark:bg-gray-950 dark:text-white
        `}
      >
        <PreferencesProvider>
          <ScrollReset />
          {children}
          <Analytics />
        </PreferencesProvider>
      </body>
    </html>
  );
}
