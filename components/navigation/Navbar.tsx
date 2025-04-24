'use client';

import Link from 'next/link';
import {
  Menu, X, Home, User, Layers, Folder, MessageCircle, Send
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import LanguageToggle from './LanguageToggle';
import { usePreferences } from '../../context/PreferencesContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language } = usePreferences();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      const yOffset = -80; // Ajuste para navbar fijo
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { label: language === 'es' ? 'Inicio' : 'Home', href: '#inicio', icon: <Home className="w-4 h-4" /> },
    { label: language === 'es' ? 'Sobre mí' : 'About', href: '#sobre-mi', icon: <User className="w-4 h-4" /> },
    { label: language === 'es' ? 'Stack' : 'Tech', href: '#stack', icon: <Layers className="w-4 h-4" /> },
    { label: language === 'es' ? 'Proyectos' : 'Projects', href: '#proyectos', icon: <Folder className="w-4 h-4" /> },
    { label: language === 'es' ? 'Testimonios' : 'Testimonials', href: '#testimonios', icon: <MessageCircle className="w-4 h-4" /> },
    { label: language === 'es' ? 'Contacto' : 'Contact', href: '#contacto', icon: <Send className="w-4 h-4" /> }
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md border-b border-gray-200 dark:border-gray-700'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <FaCode className="w-5 h-5" />
          <span className="tracking-wider">Portfolio</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 min-w-0">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition flex items-center gap-2"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
          <DarkModeToggle />
          <LanguageToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <LanguageToggle />
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block text-sm text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
}


