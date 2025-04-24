"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
    <div className="relative overflow-hidden rounded-xl mb-4 group bg-white dark:bg-gray-900 transition-colors duration-300">
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "16 / 9", height: "auto" }}
      >
        <motion.div
          key={images[current]}
          initial={{ opacity: 0.4, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full" // ✅ esto es CLAVE para fill
        >
          <Image
            src={images[current]}
            alt={`Imagen ${current + 1} de ${title}`}
            fill
            className="object-cover object-top rounded-xl cursor-pointer"
            onClick={() => setModalImg(images[current])}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority
          />
        </motion.div>

        {/* Dots finos */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
              className={`h-1.5 w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                i === current
                  ? "bg-blue-500 dark:bg-blue-400"
                  : "bg-gray-400/50 dark:bg-gray-600/40"
              }`}
            />
          ))}
        </div>

        {/* Flechas visiblemente accesibles */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition flex sm:group-hover:flex"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-3 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition flex sm:group-hover:flex"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
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
                <X className="w-5 h-5" />
              </button>
              <Image
                src={modalImg}
                alt="Vista ampliada"
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
