import { translations } from '../../lib/translations'

describe('Translations', () => {
  it('should have Spanish translations', () => {
    expect(translations.es).toBeDefined()
    expect(typeof translations.es).toBe('object')
  })

  it('should have English translations', () => {
    expect(translations.en).toBeDefined()
    expect(typeof translations.en).toBe('object')
  })

  it('should have consistent structure between languages', () => {
    const spanishKeys = Object.keys(translations.es)
    const englishKeys = Object.keys(translations.en)

    expect(spanishKeys).toEqual(englishKeys)
  })

  it('should have required translation keys', () => {
    const requiredKeys = ['hero', 'about', 'stack', 'projects', 'contact', 'testimonials']
    
    requiredKeys.forEach(key => {
      expect(translations.es).toHaveProperty(key)
      expect(translations.en).toHaveProperty(key)
    })
  })

  it('should have non-empty translation values', () => {
    Object.values(translations.es).forEach(value => {
      expect(value).toBeTruthy()
    })

    Object.values(translations.en).forEach(value => {
      expect(value).toBeTruthy()
    })
  })
}) 