"use client";

import { usePreferences } from "../context/PreferencesContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    serviceType: { es: "Stripe Payment Links para Agencia de Servicios Financieros", en: "Stripe Payment Links for a Financial Services Agency" },
    review: {
      en: `Thank you so much for your help setting up Stripe! Your guidance was essential to fix the issue with the payment gateway. It's clear you know what you're doing, and your patience made all the difference. Highly recommended!`,
      es: `¡Muchas gracias por tu ayuda configurando Stripe! Tu orientación fue esencial para solucionar el problema con la pasarela de pagos. Está claro que sabes lo que haces, y tu paciencia marcó toda la diferencia. ¡Altamente recomendado!`
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
  {
    name: "Estefany",
    country: "US",
    countryLabel: { es: "Estados Unidos", en: "USA" },
    platform: "Fiverr",
    date: "Jul 2025",
    rating: 5,
    project: "Stripe Integration",
    projectIcon: "/icons/stripe.svg",
    image: "/images/testimonials-two/estefany.png",
    serviceType: { es: "Stripe Payment Links para Agencia de Servicios Financieros", en: "Stripe Payment Links for a Financial Services Agency" },
    review: {
      en: `Emilio is an exceptional developer who delivered exactly what I needed. His communication was excellent throughout the project, and he went above and beyond to ensure everything worked perfectly. Highly recommended!`,
      es: `Emilio es un desarrollador excepcional que entregó exactamente lo que necesitaba. Su comunicación fue excelente durante todo el proyecto y se esforzó más allá de lo esperado para asegurar que todo funcionara perfectamente. ¡Altamente recomendado!`
    },
    related: "Stripe Integration",
    repeat: false,
    screenshots: [
      "/images/testimonials-two/review1-min.png",
      "/images/testimonials-two/review2-min.png.png"
    ]
  },
];

const countryFlags: Record<string, string> = {
  US: "/icons/us.svg",
  CA: "/icons/ca.svg",
  ES: "/icons/es.svg",
  GB: "/icons/gb.svg",
};

function EliteStar({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="w-4 h-4 sm:w-5 sm:h-5"
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
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const t = {
    es: {
      section: "Testimonios",
      subtitle: "Clientes reales, resultados reales.",
      badge: "Integración de Stripe",
      webDevBadge: "Desarrollo Web",
      platform: "Fiverr",
      repeat: "Cliente recurrente",
      newClient: "Nuevo cliente",
      close: "Cerrar imagen",
      previous: "Imagen anterior",
      next: "Imagen siguiente",
      viewReview: "Ver reseña",
      prevTestimonial: "Testimonio anterior",
      nextTestimonial: "Siguiente testimonio",
    },
    en: {
      section: "Client Reviews",
      subtitle: "Real clients, real results.",
      badge: "Stripe Integration",
      webDevBadge: "Web Development",
      platform: "Fiverr",
      repeat: "Repeat client",
      newClient: "New client",
      close: "Close image",
      previous: "Previous image",
      next: "Next image",
      viewReview: "View review",
      prevTestimonial: "Previous testimonial",
      nextTestimonial: "Next testimonial",
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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
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
    <section id="testimonios" className="max-w-4xl mx-auto py-16 sm:py-20 px-4">
      <h2 className="section-title text-center mb-2">{tLang.section}</h2>
      <h3 className="section-subtitle text-center mb-6 sm:mb-8">{tLang.subtitle}</h3>
      {/* Carrusel de Testimonios */}
      <div className="relative max-w-4xl mx-auto">
        {/* Testimonio Principal */}
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto"
        >
          <article
            itemScope
            itemType="https://schema.org/Review"
            className="text-center"
          >
                         {/* Header del Testimonio */}
             <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5">
                               <div className="flex flex-row items-center gap-1 sm:gap-2 lg:gap-1 flex-1">
                 <span className="font-semibold text-lg sm:text-xl text-gray-900 dark:text-white leading-none text-center sm:text-left" itemProp="author">
                   {testimonials[currentTestimonial].name}
                 </span>
                                   <Image
                    src={countryFlags[testimonials[currentTestimonial].country]}
                    alt={typeof testimonials[currentTestimonial].countryLabel === 'string' ? testimonials[currentTestimonial].countryLabel : testimonials[currentTestimonial].countryLabel[language]}
                    width={16}
                    height={12}
                    className="rounded-sm shadow-sm sm:w-5 sm:h-4 ml-1 sm:ml-1 lg:ml-1"
                  />
                 <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-none ml-0.5 sm:ml-0 lg:ml-0">
                   {typeof testimonials[currentTestimonial].countryLabel === 'string' ? testimonials[currentTestimonial].countryLabel : testimonials[currentTestimonial].countryLabel[language]}
                 </span>
               </div>
               
               {/* Rating */}
               <div className="flex items-center justify-center sm:justify-end gap-1 flex-shrink-0" aria-label={`${testimonials[currentTestimonial].rating} stars`}>
                 {[...Array(5)].map((_, j) => <EliteStar key={j} filled={j < testimonials[currentTestimonial].rating} />)}
               </div>
             </div>
             
                                         {/* Badges y Plataforma */}
              <div className="flex flex-col xs:flex-row items-center justify-center sm:justify-start gap-2 mb-5 sm:mb-6">
               <div className="flex items-center gap-1.5">
                 {testimonials[currentTestimonial].repeat ? (
                   <span className="px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold border border-green-200 dark:border-green-700 animate-pulse whitespace-nowrap">
                     {tLang.repeat}
                   </span>
                                ) : (
                   <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold border border-blue-200 dark:border-blue-700 animate-pulse whitespace-nowrap">
                     {tLang.newClient}
                   </span>
                 )}
                 <span className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.02 508.02" width="12" height="12" className="inline align-middle" fill="none">
                     <circle cx="254.01" cy="254.01" r="254.01" fill="#1dbf73" />
                     <circle fill="#fff" cx="315.97" cy="162.19" r="26.87"/>
                     <path fill="#111" d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" transform="translate(-1.83 -0.98)"/>
                   </svg>
                   {tLang.platform} · {testimonials[currentTestimonial].date}
                 </span>
               </div>
               <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs font-medium whitespace-nowrap">
                 <Image src={testimonials[currentTestimonial].projectIcon} alt={testimonials[currentTestimonial].project} width={12} height={12} className="inline" />
                 {tLang.badge}
               </span>
             </div>
            
                         {/* Contenido del Testimonio */}
             <blockquote className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-5 italic" itemProp="reviewBody">
               &ldquo;{testimonials[currentTestimonial].review[language]}&rdquo;
             </blockquote>
             
             {testimonials[currentTestimonial].serviceType && (
               <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic mb-5 sm:mb-6">
                 {testimonials[currentTestimonial].serviceType[language]}
               </p>
             )}
            
            <meta itemProp="itemReviewed" content={testimonials[currentTestimonial].related} />
            <span itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content={String(testimonials[currentTestimonial].rating)} />
            </span>
            
                         {/* Galería de capturas de reseñas */}
             {testimonials[currentTestimonial].screenshots && testimonials[currentTestimonial].screenshots.length > 0 && (
               <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-5">
                {testimonials[currentTestimonial].screenshots.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => openModal(testimonials[currentTestimonial].screenshots!, idx)}
                    className="block rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md hover:scale-105 hover:border-blue-200 dark:hover:border-blue-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    title={`${tLang.viewReview} ${idx + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${tLang.viewReview} ${idx + 1}`}
                      width={100}
                      height={70}
                      className="object-cover w-[100px] h-[70px] sm:w-[120px] sm:h-[80px] bg-white dark:bg-gray-900"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </article>
        </motion.div>
        
        {/* Navegación */}
        <div className="flex items-center justify-center mt-6 gap-3">
          <button
            onClick={prevTestimonial}
            aria-label={tLang.prevTestimonial}
            className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Indicadores */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial
                    ? 'bg-blue-600 dark:bg-blue-400 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            aria-label={tLang.nextTestimonial}
            className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* CTA para plataformas freelance */}
      <div className="mt-8 sm:mt-12 text-center">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
            {language === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://es.fiverr.com/emiliofunesdev?public_mode=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.02 508.02" width="16" height="16" className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none">
                <circle cx="254.01" cy="254.01" r="254.01" fill="#1dbf73" />
                <circle fill="#fff" cx="315.97" cy="162.19" r="26.87"/>
                <path fill="#111" d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" transform="translate(-1.83 -0.98)"/>
              </svg>
              <span className="text-sm">Fiverr</span>
              <svg className="w-3 h-3 text-gray-400 group-hover:text-green-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a
              href="https://www.upwork.com/freelancers/emiliofunes"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md hover:-translate-y-0.5"
            >
              <Image 
                src="/icons/upwork.svg" 
                alt="Upwork" 
                width={16} 
                height={16} 
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-sm">Upwork</span>
              <svg className="w-3 h-3 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
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
