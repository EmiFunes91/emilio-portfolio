"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectCarousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);
  const [modalImg, setModalImg] = useState<string | null>(null);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImg(null);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden rounded-lg mb-4 group">
        {/* Carrusel */}
        <div className="relative w-full aspect-video overflow-hidden rounded-lg">
          <motion.div
            key={images[current]}
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[current]}
              alt={`Imagen ${current + 1} de ${title}`}
              width={800}
              height={450}
              className="rounded-lg w-full h-auto object-cover"
              onClick={() => setModalImg(images[current])}
            />
          </motion.div>

          {/* Dots finos y centrados */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden sm:flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
                className={`h-[2px] w-5 transition-all rounded-full ${
                  i === current
                    ? "bg-blue-500 dark:bg-blue-400"
                    : "bg-gray-400/50 dark:bg-gray-600/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Flechas */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition hidden group-hover:flex"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-3 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition hidden group-hover:flex"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Modal fullscreen */}
      <AnimatePresence>
        {modalImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl p-4"
            >
              <button
                onClick={() => setModalImg(null)}
                aria-label="Cerrar imagen"
                className="absolute top-2 right-3 p-[6px] text-white bg-gray-800/80 hover:bg-red-500 transition text-xs w-7 h-7 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
              <Image
                src={modalImg}
                alt="Vista ampliada"
                width={1280}
                height={720}
                className="rounded-lg object-contain w-full max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
