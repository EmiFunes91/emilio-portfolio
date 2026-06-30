// components/ui/ActionButton.tsx
"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

// Utilidad para detectar móvil de forma más robusta
function isMobile() {
  if (typeof window === 'undefined') return false;
  if (typeof navigator === 'undefined') return false;
  
  // Detectar por user agent
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  // Detectar por tamaño de pantalla como fallback
  const isMobileBySize = window.innerWidth <= 768;
  
  return mobileRegex.test(userAgent) || isMobileBySize;
}

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "demo" | "video";
  className?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
};

export default function ActionButton({ children, href, onClick, variant = "default", className, title, type, disabled, style }: Props) {
  const base =
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition";

  const variants = {
    default: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
    demo: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700",
    video: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-100 dark:hover:bg-indigo-700",
  };

  const styles = twMerge(base, variants[variant], className);

  // Si no hay href, renderizar botón
  if (!href) {
    return (
      <button onClick={onClick} className={styles} title={title} type={type} disabled={disabled} style={style}>
        {children}
      </button>
    );
  }

  // Si es enlace interno (comienza con #)
  if (href.startsWith('#')) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      console.log('ActionButton: Internal link clicked', href);
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement && typeof targetElement.scrollIntoView === 'function') {
        console.log('ActionButton: Found target element, scrolling...');
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        console.error('ActionButton: Target element not found or scrollIntoView not available:', targetId);
      }
    };

    return (
      <a 
        href={href} 
        className={styles} 
        title={title} 
        style={style}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  // Si es enlace externo
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles} 
      title={title} 
      style={style}
    >
      {children}
    </a>
  );
}
