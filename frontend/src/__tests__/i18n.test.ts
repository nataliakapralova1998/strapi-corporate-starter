import '@jest/globals'
import { i18n } from '../../i18n-config'

describe('i18n Configuration', () => {
  it('should have a default locale', () => {
    expect(i18n.defaultLocale).toBeDefined()
    expect(typeof i18n.defaultLocale).toBe('string')
  })

  it('should have an array of supported locales', () => {
    expect(Array.isArray(i18n.locales)).toBe(true)
    expect(i18n.locales.length).toBeGreaterThan(0)
  })

  it('should include the default locale in the supported locales', () => {
    expect(i18n.locales).toContain(i18n.defaultLocale)
  })

  it('should have valid locale codes', () => {
    const validLocaleRegex = /^[a-z]{2}(-[A-Z]{2})?$/
    i18n.locales.forEach(locale => {
      expect(validLocaleRegex.test(locale)).toBe(true)
    })
  })
}) 