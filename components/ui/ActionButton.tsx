// components/ui/ActionButton.tsx
"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "demo" | "video";
  className?: string;
};

export default function ActionButton({ children, href, onClick, variant = "default", className }: Props) {
  const base =
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition";

  const variants = {
    default: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
    demo: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700",
    video: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-100 dark:hover:bg-indigo-700",
  };

  const styles = twMerge(base, variants[variant], className);

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
