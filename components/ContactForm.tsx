"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { usePreferences } from "../context/PreferencesContext";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaYoutube } from "react-icons/fa";
import ActionButton from "./ui/ActionButton";

export default function ContactForm() {
  const { language } = usePreferences();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
  const recaptchaKey = "6Lc9cR0rAAAAAHcHg_aUYz09Wyf65eg_PgHWq-Zm";

  const t = {
    es: {
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado con éxito! Gracias por contactarme.",
      error: "Ocurrió un error. Intenta nuevamente.",
      required: "Este campo es obligatorio.",
      privacy: "Nunca comparto tus datos. Solo los uso para responder tu mensaje.",
      youtube: "Ver video"
    },
    en: {
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully! Thank you for reaching out.",
      error: "Something went wrong. Please try again.",
      required: "This field is required.",
      privacy: "I never share your data. I only use it to reply to your message.",
      youtube: "Watch video"
    }
  };

  const tLang = t[language];

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const timer = setTimeout(() => setShowRecaptcha(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError(tLang.error);
      return;
    }
    if (!validateEmail(formData.email)) {
      setError(tLang.error);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();

      if (!token) {
        setError(tLang.error);
        setLoading(false);
        return;
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          "g-recaptcha-response": token,
        },
        publicKey
      );

      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setSuccess(true);
      } else {
        setError(tLang.error);
      }
    } catch {
      setError(tLang.error);
    } finally {
      setLoading(false);
    }
  };

  // Validación simple
  const isEmpty = (field: string) => !formData[field].trim();

  return (
    <form className="w-full max-w-lg mx-auto bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col gap-7 border border-gray-100 dark:border-gray-800 backdrop-blur-md"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {tLang.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all placeholder-gray-400 text-base shadow-sm"
          placeholder={tLang.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {tLang.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all placeholder-gray-400 text-base shadow-sm"
          placeholder={tLang.email}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {tLang.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all placeholder-gray-400 text-base shadow-sm resize-none"
          placeholder={tLang.message}
        />
      </div>
      <ActionButton
        type="submit"
        disabled={loading}
        className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        variant="demo"
        title={tLang.send}
      >
        <FaPaperPlane className="w-5 h-5" />
        {loading ? tLang.sending : tLang.send}
      </ActionButton>
      {success && (
        <div className="text-green-600 dark:text-green-400 text-center text-base mt-2 animate-fade-in font-semibold">
          {tLang.success}
        </div>
      )}
      {error && (
        <div className="text-red-600 dark:text-red-400 text-center text-base mt-2 animate-fade-in font-semibold">
          {tLang.error}
        </div>
      )}
      <div className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2 select-none">
        {tLang.privacy}
      </div>
    </form>
  );
}

