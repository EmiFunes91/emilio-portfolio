import ContactForm from './ContactForm'

export default function Contact({
  title,
  description,
  buttonText,
  language
}: {
  title: string
  description: string
  buttonText: string
  language: 'es' | 'en'
}) {
  return (
    <section className="mt-20 px-4" id="contacto">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">{description}</p>
      </div>

      <div className="max-w-xl mx-auto mt-6">
        <ContactForm language={language} />
      </div>
    </section>
  )
}



  