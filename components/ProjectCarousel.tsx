"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreferences } from "../context/PreferencesContext";

export default function ProjectCarousel({
  images,
  title,
}: {
  images: (string | { src: string; alt?: { es: string; en: string } })[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const { language: contextLanguage } = usePreferences();
  const language = contextLanguage || "es";

  // Normalizar imágenes para aceptar ambos formatos
  const normalizedImages = images.map((img) =>
    typeof img === "string"
      ? { src: img, alt: { es: title, en: title } }
      : { src: img.src, alt: img.alt || { es: title, en: title } }
  );

  const next = () => setCurrent((prev) => (prev + 1) % normalizedImages.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImg(null);
    };

    document.addEventListener("keydown", handleEsc);

    if (modalImg) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalImg]);

  const mobileSrc = normalizedImages[current].src.replace(/\.png$/, '-mobile.webp');
  const isWebp = mobileSrc !== normalizedImages[current].src;

  return (
    <div className="relative overflow-hidden rounded-xl mb-4 group bg-white dark:bg-gray-900 transition-colors duration-300">
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "16 / 9", height: "auto" }}
      >
        <motion.div
          key={normalizedImages[current].src}
          initial={{ opacity: 0.4, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full"
        >
          <Image
            src={isWebp ? mobileSrc : normalizedImages[current].src}
            alt={
              normalizedImages[current].alt && normalizedImages[current].alt[language]
                ? normalizedImages[current].alt[language]
                : title
            }
            fill
            role="button"
            tabIndex={0}
            title={
              normalizedImages[current].alt && normalizedImages[current].alt[language]
                ? normalizedImages[current].alt[language]
                : title
            }
            className="object-cover object-top rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setModalImg(normalizedImages[current].src)}
            onKeyDown={(e) => e.key === "Enter" && setModalImg(normalizedImages[current].src)}
            sizes="(max-width: 480px) 340px, (max-width: 768px) 360px, (max-width: 1280px) 700px, 900px"
            priority={current === 0}
            loading={current === 0 ? undefined : 'lazy'}
          />
        </motion.div>

        {/* Dots de navegación */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {normalizedImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
              className={`h-1.5 w-5 rounded-full transition-all ${
                i === current
                  ? "bg-blue-500 dark:bg-blue-400"
                  : "bg-gray-400/50 dark:bg-gray-600/40"
              }`}
            />
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-3 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Modal de imagen ampliada */}
      <AnimatePresence>
        {modalImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
            role="dialog"
            aria-modal="true"
            onClick={() => setModalImg(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalImg(null)}
                aria-label="Cerrar imagen"
                className="absolute top-2 right-3 p-[6px] text-white bg-gray-800/80 hover:bg-red-500 transition text-xs w-7 h-7 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              <Image
                src={modalImg}
                alt={
                  normalizedImages[current].alt && normalizedImages[current].alt[language]
                    ? normalizedImages[current].alt[language]
                    : title
                }
                width={1280}
                height={720}
                className="rounded-xl object-contain w-full max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
