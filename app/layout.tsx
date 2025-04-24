import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ScrollReset from '../components/ScrollReset';
import { PreferencesProvider } from '../context/PreferencesContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Portfolio Emilio Funes',
  description: 'Desarrollador Backend | Java, Spring Boot, PHP, Laravel',
  openGraph: {
    title: 'Portfolio Emilio Funes',
    description: 'Demostración profesional de proyectos backend con Java, Spring Boot, PHP y Laravel.',
    url: 'https://emiliofunes-portfolio.vercel.app/',
    siteName: 'Emilio Funes Portfolio',
    images: [
      {
        url: 'https://emiliofunes-portfolio.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Emilio Funes Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Emilio Funes',
    description: 'Proyectos backend con Java, Spring Boot, PHP, Laravel y más.',
    images: ['https://emiliofunes-portfolio.vercel.app/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`
          ${inter.variable}
          font-sans antialiased
          transition-colors duration-500
          overflow-x-hidden max-w-full
          bg-white text-gray-900 dark:bg-gray-950 dark:text-white
        `}
      >
        <PreferencesProvider>
          <ScrollReset />
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}


