import { generateMetadata, generateStructuredData, seoConfig } from '../../lib/seo'

describe('SEO Utilities', () => {
  describe('seoConfig', () => {
    it('has correct Spanish configuration', () => {
      const spanishConfig = seoConfig.es
      
      expect(spanishConfig.title).toContain('Emilio Funes')
      expect(spanishConfig.title).toContain('Desarrollador Backend')
      expect(spanishConfig.description).toContain('Java Spring Boot')
      expect(spanishConfig.description).toContain('PHP Laravel')
      expect(spanishConfig.keywords).toContain('desarrollador backend')
      expect(spanishConfig.keywords).toContain('java developer')
    })

    it('has correct English configuration', () => {
      const englishConfig = seoConfig.en
      
      expect(englishConfig.title).toContain('Emilio Funes')
      expect(englishConfig.title).toContain('Backend Developer')
      expect(englishConfig.description).toContain('Java Spring Boot')
      expect(englishConfig.description).toContain('PHP Laravel')
      expect(englishConfig.keywords).toContain('backend developer')
      expect(englishConfig.keywords).toContain('java developer')
    })

    it('has different titles for different languages', () => {
      expect(seoConfig.es.title).not.toBe(seoConfig.en.title)
      expect(seoConfig.es.description).not.toBe(seoConfig.en.description)
    })
  })

  describe('generateMetadata', () => {
    it('generates Spanish metadata by default', () => {
      const metadata = generateMetadata()
      
      expect(metadata.title).toBe(seoConfig.es.title)
      expect(metadata.description).toBe(seoConfig.es.description)
      expect(metadata.keywords).toEqual(seoConfig.es.keywords)
    })

    it('generates Spanish metadata when language is es', () => {
      const metadata = generateMetadata('es')
      
      expect(metadata.title).toBe(seoConfig.es.title)
      expect(metadata.description).toBe(seoConfig.es.description)
      expect(metadata.keywords).toEqual(seoConfig.es.keywords)
    })

    it('generates English metadata when language is en', () => {
      const metadata = generateMetadata('en')
      
      expect(metadata.title).toBe(seoConfig.en.title)
      expect(metadata.description).toBe(seoConfig.en.description)
      expect(metadata.keywords).toEqual(seoConfig.en.keywords)
    })

    it('includes OpenGraph configuration', () => {
      const metadata = generateMetadata('es')
      
      expect(metadata.openGraph).toBeDefined()
      expect(metadata.openGraph?.title).toBe(seoConfig.es.ogTitle || seoConfig.es.title)
      expect(metadata.openGraph?.description).toBe(seoConfig.es.ogDescription || seoConfig.es.description)
      expect(metadata.openGraph?.locale).toBe('es_ES')
    })

    it('includes Twitter configuration', () => {
      const metadata = generateMetadata('en')
      
      expect(metadata.twitter).toBeDefined()
      expect(metadata.twitter?.title).toBe(seoConfig.en.twitterTitle || seoConfig.en.title)
      expect(metadata.twitter?.description).toBe(seoConfig.en.twitterDescription || seoConfig.en.description)
    })

    it('includes language alternates', () => {
      const metadata = generateMetadata()
      
      expect(metadata.alternates).toBeDefined()
      expect(metadata.alternates?.languages).toBeDefined()
      expect(metadata.alternates?.languages?.['es-ES']).toBe('https://emiliofunes-portfolio.vercel.app/')
      expect(metadata.alternates?.languages?.['en-US']).toBe('https://emiliofunes-portfolio.vercel.app/?lang=en')
    })
  })

  describe('generateStructuredData', () => {
    it('generates Spanish structured data by default', () => {
      const structuredData = generateStructuredData()
      
      expect(structuredData['@context']).toBe('https://schema.org')
      expect(structuredData['@type']).toBe('Person')
      expect(structuredData.name).toBe('Emilio Funes')
      expect(structuredData.jobTitle).toBe('Desarrollador Backend')
      expect(structuredData.url).toBe('https://emiliofunes-portfolio.vercel.app')
    })

    it('generates Spanish structured data when language is es', () => {
      const structuredData = generateStructuredData('es')
      
      expect(structuredData.jobTitle).toBe('Desarrollador Backend')
      expect(structuredData.description).toContain('Desarrollador Backend')
    })

    it('generates English structured data when language is en', () => {
      const structuredData = generateStructuredData('en')
      
      expect(structuredData.jobTitle).toBe('Backend Developer')
      expect(structuredData.description).toContain('Backend Developer')
    })

    it('includes social media links', () => {
      const structuredData = generateStructuredData()
      
      expect(structuredData.sameAs).toContain('https://github.com/EmiFunes91')
      expect(structuredData.sameAs).toContain('https://www.linkedin.com/in/emilio-funes-8b140b21a/')
    })

    it('includes technical skills', () => {
      const structuredData = generateStructuredData()
      
      expect(structuredData.knowsAbout).toContain('Java')
      expect(structuredData.knowsAbout).toContain('Spring Boot')
      expect(structuredData.knowsAbout).toContain('PHP')
      expect(structuredData.knowsAbout).toContain('Laravel')
      expect(structuredData.knowsAbout).toContain('PostgreSQL')
      expect(structuredData.knowsAbout).toContain('MySQL')
    })

    it('includes work information', () => {
      const structuredData = generateStructuredData()
      
      expect(structuredData.worksFor).toBeDefined()
      expect(structuredData.worksFor['@type']).toBe('Organization')
      expect(structuredData.worksFor.name).toBe('Freelance')
    })

    it('includes address information', () => {
      const structuredData = generateStructuredData()
      
      expect(structuredData.address).toBeDefined()
      expect(structuredData.address['@type']).toBe('PostalAddress')
      expect(structuredData.address.addressCountry).toBe('AR')
    })

    it('includes language skills', () => {
      const structuredData = generateStructuredData()
      
      expect(structuredData.knowsLanguage).toContain('Spanish')
      expect(structuredData.knowsLanguage).toContain('English')
    })
  })
}) 