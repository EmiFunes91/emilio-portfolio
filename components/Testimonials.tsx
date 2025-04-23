'use client';

import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const testimonials = {
  es: [
    {
      quote: 'Emilio demostró compromiso, proactividad y capacidad técnica. Recomendado 100%.',
      client: 'Cliente en Fiverr',
    },
    {
      quote: 'Un desarrollador confiable que entrega código limpio y mantiene una excelente comunicación.',
      client: 'Startup de software',
    },
    {
      quote: 'Excelente experiencia trabajando con Emilio. Siempre va más allá para que todo funcione perfecto.',
      client: 'Emprendedor independiente',
    },
  ],
  en: [
    {
      quote: 'Emilio showed commitment, proactivity, and technical skills. Highly recommended.',
      client: 'Client on Fiverr',
    },
    {
      quote: 'A reliable developer who delivers clean code and maintains excellent communication.',
      client: 'Software startup',
    },
    {
      quote: 'Great experience working with Emilio. He always goes the extra mile to ensure everything works perfectly.',
      client: 'Independent entrepreneur',
    },
  ],
};

export default function Testimonials({
  title,
  language,
}: {
  title: string;
  language: 'es' | 'en';
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials[language].length);
    }, 5000);
    return () => clearInterval(interval);
  }, [language]);

  const { quote, client } = testimonials[language][index];

  return (
    <section className="mt-10 max-w-4xl mx-auto" id="testimonios">
      <h2 className="text-3xl font-semibold mb-6 text-center">{title}</h2>
      <div className="p-6 md:p-8 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center transition-all duration-500">
        <Quote className="mx-auto mb-3 text-blue-600 dark:text-blue-400 w-6 h-6" />
        <p className="italic text-gray-700 dark:text-gray-300 text-lg transition-opacity duration-500">
          “{quote}”
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium">– {client}</p>
      </div>
    </section>
  );
}

