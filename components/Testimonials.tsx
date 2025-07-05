"use client";

import { usePreferences } from "../context/PreferencesContext";
import Image from "next/image";
import { useState, useEffect } from "react";

// Estructura de testimonios para fácil escalabilidad
const testimonials = [
  {
    name: "Shantell Sweeney",
    country: "US",
    countryLabel: { es: "Estados Unidos", en: "USA" },
    platform: "Fiverr",
    date: "Jun 2025",
    rating: 5,
    project: "Stripe Integration",
    projectIcon: "/icons/stripe.svg",
    image: "/images/testimonials/shantell.png",
    review: {
      en: `I have done a few projects with Emilio, and I am always pleased with the results. What I appreciate most is his transparency, attention to detail, and the way he documents his work. I highly recommend his services.`,
      es: `He realizado varios proyectos con Emilio y siempre quedo muy satisfecha con los resultados. Lo que más valoro es su transparencia, atención al detalle y la forma en que documenta su trabajo. Recomiendo altamente sus servicios.`
    },
    related: "Stripe Integration",
    repeat: true,
    screenshots: [
      "/images/testimonials/review1-min.png",
      "/images/testimonials/review2-min.png",
      "/images/testimonials/review3-min.png",
      "/images/testimonials/review4-min.png",
      "/images/testimonials/review5-min.png"
    ]
  },
];

const countryFlags: Record<string, string> = {
  US: "/icons/us.svg",
  CA: "/icons/ca.svg",
  ES: "/icons/es.svg",
};

function EliteStar({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill={filled ? "url(#ultra-realistic-gold)" : "none"}
      stroke="#8B6914"
      strokeWidth="1.4"
    >
      <defs>
        <radialGradient id="ultra-realistic-gold" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="15%" stopColor="#FFF8DC" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="70%" stopColor="#FF8C00" />
          <stop offset="85%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
        <filter id="star-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur"/>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="star-depth" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0.8" dy="0.8" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.3"/>
          <feDropShadow dx="0.3" dy="0.3" stdDeviation="0.2" floodColor="#8B6914" floodOpacity="0.4"/>
        </filter>
      </defs>
      <polygon
        points="10,2 12.4,7.5 18.2,7.8 13.6,12 15,17.5 10,14.5 5,17.5 6.4,12 1.8,7.8 7.6,7.5"
        strokeLinejoin="round"
        filter={filled ? "url(#star-glow) url(#star-depth)" : "none"}
      />
    </svg>
  );
}

export default function Testimonials() {
  const { language } = usePreferences();
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [modalIdx, setModalIdx] = useState<number>(0);
  const [currentScreenshots, setCurrentScreenshots] = useState<string[]>([]);

  const t = {
    es: {
      section: "Testimonios",
      subtitle: "Clientes reales, resultados reales.",
      badge: "Integración de Stripe",
      platform: "Fiverr",
      repeat: "Cliente recurrente",
      close: "Cerrar imagen",
      previous: "Imagen anterior",
      next: "Imagen siguiente",
      viewReview: "Ver reseña",
    },
    en: {
      section: "Client Reviews",
      subtitle: "Real clients, real results.",
      badge: "Stripe Integration",
      platform: "Fiverr",
      repeat: "Repeat client",
      close: "Close image",
      previous: "Previous image",
      next: "Next image",
      viewReview: "View review",
    },
  };
  const tLang = t[language];

  const openModal = (screenshots: string[], index: number) => {
    setCurrentScreenshots(screenshots);
    setModalImg(screenshots[index]);
    setModalIdx(index);
  };

  const closeModal = () => {
    setModalImg(null);
    setModalIdx(0);
    setCurrentScreenshots([]);
  };

  const goToPrevious = () => {
    if (currentScreenshots.length > 0) {
      const newIndex = modalIdx === 0 ? currentScreenshots.length - 1 : modalIdx - 1;
      setModalIdx(newIndex);
      setModalImg(currentScreenshots[newIndex]);
    }
  };

  const goToNext = () => {
    if (currentScreenshots.length > 0) {
      const newIndex = modalIdx === currentScreenshots.length - 1 ? 0 : modalIdx + 1;
      setModalIdx(newIndex);
      setModalImg(currentScreenshots[newIndex]);
    }
  };

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

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalImg, modalIdx, currentScreenshots]);

  return (
    <section id="testimonios" className="max-w-3xl mx-auto py-16 sm:py-20 px-4">
      <h2 className="section-title text-center mb-2">{tLang.section}</h2>
      <h3 className="section-subtitle text-center mb-6 sm:mb-8">{tLang.subtitle}</h3>
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        {testimonials.map((testi, i) => (
          <article
            key={testi.name + i}
            itemScope
            itemType="https://schema.org/Review"
            className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 items-center border border-gray-100 dark:border-gray-800 w-full"
          >
            <div className="flex flex-col items-center sm:flex-row sm:items-start w-full gap-4 sm:gap-6">
              <figure className="flex-shrink-0">
                <Image
                  src={testi.image}
                  alt={`Photo of ${testi.name}`}
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700 shadow"
                  itemProp="image"
                  priority={i === 0}
                />
              </figure>
              <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 min-w-0">
                    <span className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white truncate" itemProp="author">{testi.name}</span>
                    <span className="flex items-center gap-1">
                      <Image
                        src={countryFlags[testi.country]}
                        alt={typeof testi.countryLabel === 'string' ? testi.countryLabel : testi.countryLabel[language]}
                        width={28}
                        height={18}
                        className="inline align-middle border border-gray-300 dark:border-gray-700 shadow-sm"
                        style={{ borderRadius: 4 }}
                      />
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 ml-1">{typeof testi.countryLabel === 'string' ? testi.countryLabel : testi.countryLabel[language]}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:ml-auto" aria-label={`${testi.rating} stars`}>
                    {[...Array(5)].map((_, j) => <EliteStar key={j} filled={j < testi.rating} />)}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 sm:mt-2">
                  {testi.repeat && (
                    <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold border border-green-200 dark:border-green-700 animate-pulse">
                      {tLang.repeat}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Image src="/icons/fiverr.svg" alt="Fiverr" width={14} height={14} className="inline align-middle" />
                    {tLang.platform} · {testi.date}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs font-medium">
                    <Image src={testi.projectIcon} alt="Stripe" width={14} height={14} className="inline" />
                    {tLang.badge}
                  </span>
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mt-4 text-center sm:text-left" itemProp="reviewBody">
                  {testi.review[language]}
                </blockquote>
                <meta itemProp="itemReviewed" content={testi.related} />
                <span itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content={String(testi.rating)} />
                </span>
                {/* Galería de capturas de reseñas */}
                {testi.screenshots && testi.screenshots.length > 0 && (
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                    {testi.screenshots.map((src, idx) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => openModal(testi.screenshots!, idx)}
                        className="block rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md hover:scale-105 hover:border-blue-200 dark:hover:border-blue-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                        title={`${tLang.viewReview} ${idx + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${tLang.viewReview} ${idx + 1}`}
                          width={80}
                          height={54}
                          className="object-cover w-[80px] h-[54px] sm:w-[90px] sm:h-[60px] bg-white dark:bg-gray-900"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      {/* Modal con carrusel */}
      {modalImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
          tabIndex={-1}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-4xl w-full p-2 sm:p-4"
          >
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              aria-label={tLang.close}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-gray-800/80 hover:bg-red-500 text-white rounded-full shadow-lg transition-colors duration-200 z-10"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Botón anterior */}
            {currentScreenshots.length > 1 && (
              <button
                onClick={goToPrevious}
                aria-label={tLang.previous}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full shadow-lg transition-colors duration-200 z-10"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Botón siguiente */}
            {currentScreenshots.length > 1 && (
              <button
                onClick={goToNext}
                aria-label={tLang.next}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full shadow-lg transition-colors duration-200 z-10"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Imagen principal */}
            <Image
              src={modalImg}
              alt="Captura de reseña ampliada"
              width={1200}
              height={800}
              className="w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg sm:rounded-xl bg-white dark:bg-gray-900 shadow-2xl"
              loading="eager"
            />

            {/* Indicadores de posición */}
            {currentScreenshots.length > 1 && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                {currentScreenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setModalIdx(idx);
                      setModalImg(currentScreenshots[idx]);
                    }}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
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
            {currentScreenshots.length > 1 && (
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-1 bg-gray-800/80 text-white text-xs sm:text-sm rounded-full">
                {modalIdx + 1} / {currentScreenshots.length}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
