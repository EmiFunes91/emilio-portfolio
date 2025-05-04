"use client";

import { motion } from "framer-motion";

export default function About({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section
      id="sobre-mi"
      className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed tracking-wide"
      >
        {text}
      </motion.p>
    </section>
  );
}


  