"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { usePreferences } from "../context/PreferencesContext";

export default function ContactForm() {
  const { language } = usePreferences();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      placeholderName: "Tu nombre",
      placeholderEmail: "tucorreo@ejemplo.com",
      placeholderMessage: "¿En qué puedo ayudarte?",
      submit: "Enviar mensaje",
      error: "Todos los campos son obligatorios.",
      invalidEmail: "El correo electrónico no es válido.",
      success: "¡Gracias! Tu mensaje fue enviado correctamente.",
      errorSend: "Hubo un problema al enviar el mensaje.",
      errorNetwork: "Error de red al enviar el formulario.",
      errorCaptcha: "Completa la verificación reCAPTCHA.",
    },
    en: {
      name: "Name",
      email: "Email",
      message: "Message",
      placeholderName: "Your name",
      placeholderEmail: "you@example.com",
      placeholderMessage: "How can I help you?",
      submit: "Send message",
      error: "All fields are required.",
      invalidEmail: "Invalid email address.",
      success: "Thank you! Your message has been sent successfully.",
      errorSend: "There was an issue sending the message.",
      errorNetwork: "Network error while submitting the form.",
      errorCaptcha: "Please complete the reCAPTCHA.",
    },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError(tLang.error);
      return;
    }
    if (!validateEmail(formData.email)) {
      setError(tLang.invalidEmail);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();

      if (!token) {
        setError(tLang.errorCaptcha);
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
      } else {
        setError(tLang.errorSend);
      }
    } catch {
      setError(tLang.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="card-glow max-w-xl mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {submitted && <p className="text-green-500 text-sm">{tLang.success}</p>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">{tLang.name}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          placeholder={tLang.placeholderName}
          className="input"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">{tLang.email}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          placeholder={tLang.placeholderEmail}
          className="input"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">{tLang.message}</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          disabled={loading}
          placeholder={tLang.placeholderMessage}
          className="input"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`btn btn-md btn-primary rounded-xl ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full" />
        ) : (
          tLang.submit
        )}
      </button>

      {showRecaptcha && (
        <div style={{ display: "none" }}>
          <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} size="invisible" />
        </div>
      )}
    </motion.form>
  );
}

