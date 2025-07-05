"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
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
  const [modalIdx, setModalIdx] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const { language: contextLanguage } = usePreferences();
  const language = contextLanguage || "es";

  // Normalizar imágenes para aceptar ambos formatos
  const normalizedImages = useMemo(() => images.map((img) =>
    typeof img === "string"
      ? { src: img, alt: { es: title, en: title } }
      : { src: img.src, alt: img.alt || { es: title, en: title } }
  ), [images, title]);

  const next = () => setCurrent((prev) => (prev + 1) % normalizedImages.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);

  const openModal = (index: number) => {
    setModalImg(normalizedImages[index].src);
    setModalIdx(index);
  };

  const closeModal = () => {
    setModalImg(null);
    setModalIdx(0);
  };

  const goToPrevious = () => {
    const newIndex = modalIdx === 0 ? normalizedImages.length - 1 : modalIdx - 1;
    setModalIdx(newIndex);
    setModalImg(normalizedImages[newIndex].src);
  };

  const goToNext = () => {
    const newIndex = modalIdx === normalizedImages.length - 1 ? 0 : modalIdx + 1;
    setModalIdx(newIndex);
    setModalImg(normalizedImages[newIndex].src);
  };

  const goToImage = (index: number) => {
    setModalIdx(index);
    setModalImg(normalizedImages[index].src);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalImg) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (modalImg) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalImg, modalIdx, normalizedImages.length]);

  const mobileSrc = normalizedImages[current].src.replace(/\.png$/, '-mobile.webp');
  const isWebp = mobileSrc !== normalizedImages[current].src;

  const ModalContent = useMemo(() => {
    if (!modalImg) return null;
    
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        onClick={closeModal}
      >
        <div
          className="relative w-full max-w-4xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={closeModal}
            aria-label="Cerrar imagen"
            className="absolute top-4 right-4 p-2 bg-gray-800/80 hover:bg-red-500 text-white rounded-full shadow-lg transition-colors duration-200 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Botón anterior */}
          {normalizedImages.length > 1 && (
            <button
              onClick={goToPrevious}
              aria-label="Imagen anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full shadow-lg transition-colors duration-200 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Botón siguiente */}
          {normalizedImages.length > 1 && (
            <button
              onClick={goToNext}
              aria-label="Imagen siguiente"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full shadow-lg transition-colors duration-200 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Imagen principal */}
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <Image
              src={modalImg}
              alt={
                normalizedImages[modalIdx].alt && normalizedImages[modalIdx].alt[language]
                  ? normalizedImages[modalIdx].alt[language]
                  : title
              }
              width={1200}
              height={800}
              className="rounded-xl object-contain max-w-full max-h-full bg-white dark:bg-gray-900 shadow-2xl"
              loading="eager"
              priority
            />
          </div>

          {/* Indicadores de posición */}
          {normalizedImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {normalizedImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToImage(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === modalIdx 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Ir a imagen ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Contador de imágenes */}
          {normalizedImages.length > 1 && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-gray-800/80 text-white text-sm rounded-full">
              {modalIdx + 1} / {normalizedImages.length}
            </div>
          )}
        </div>
      </div>
    );
  }, [modalImg, modalIdx, normalizedImages, language, title, closeModal, goToPrevious, goToNext, goToImage]);

  return (
    <>
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
              onClick={() => openModal(current)}
              onKeyDown={(e) => e.key === "Enter" && openModal(current)}
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
      </div>

      {/* Modal renderizado fuera del contenedor usando Portal */}
      {mounted && createPortal(ModalContent, document.body)}
    </>
  );
}
